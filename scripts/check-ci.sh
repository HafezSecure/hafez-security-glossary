#!/usr/bin/env bash
# The local gate for the Hafez Security Glossary, as one command: `pnpm check:ci`.
#
# GitHub CI is not used (HafezSecure founder decision, 2026-10-17). .github/workflows/ci.yml is the
# written definition of the gate, and this script runs every one of its steps, in the same order,
# on the commit that is checked out. Keep the two in step: a step added to one is added to the other
# in the same commit.
#
# Each step ends PASS, FAIL or SKIP. A SKIP is printed with its reason; the run then says "passed
# with skips", never "all passed". The run exits non-zero on any FAIL. Paste the summary into the
# pull request's Verification section.
#
#   --full-history   scan the whole git history for secrets (as a manual workflow run does)
set -uo pipefail

cd "$(git rev-parse --show-toplevel)"

GITLEAKS_VERSION="8.30.1"   # the same pin as the workflow's secrets job
OPENGREP_VERSION="1.30.2"   # the same pin as the workflow's sast job

full_history=false
[ "${1:-}" = "--full-history" ] && full_history=true

results=()
failed=0
skipped=0
dirty_at_start=""
git diff --quiet && git diff --cached --quiet || dirty_at_start=" (the tree had uncommitted changes when the run started: commit, then run again)"

run() { local name="$1"; shift; echo "== ${name} =="; if "$@"; then results+=("PASS  ${name}"); else results+=("FAIL  ${name}"); failed=1; fi; }
skip() { echo "== $1 == SKIP: $2"; results+=("SKIP  $1 ($2)"); skipped=1; }

# 1. Install from the lockfile.
run "Install from the lockfile" pnpm install --frozen-lockfile

# 2. Validate every term file, build the datasets, and check the docs.
run "Validate terms" pnpm run validate
run "Build datasets" pnpm run build
run "Docs check" pnpm run check:docs

# 3. Dependency audit: the full report informs, high and critical in production deps block.
echo "== Dependency audit (report, does not block) =="
pnpm audit --audit-level low || true
run "Dependency audit (prod, high and critical)" pnpm audit --prod --audit-level high

# 4. Secret scan with the pinned gitleaks. This repository is public, so this matters.
secret_scan() {
  local bin
  bin="$(command -v gitleaks || true)"
  [ -z "$bin" ] && [ -x "$HOME/.local/bin/gitleaks" ] && bin="$HOME/.local/bin/gitleaks"
  if [ -z "$bin" ]; then echo "gitleaks ${GITLEAKS_VERSION} is not installed"; return 1; fi
  if ! "$bin" version 2>/dev/null | grep -q "${GITLEAKS_VERSION}"; then
    echo "gitleaks is $("$bin" version 2>/dev/null), the gate pins ${GITLEAKS_VERSION}"; return 1
  fi
  local range=""
  if [ "$full_history" = false ]; then
    git fetch -q origin 2>/dev/null || true
    if git rev-parse -q --verify origin/main >/dev/null && [ "$(git rev-list --count origin/main..HEAD)" -gt 0 ]; then
      range="origin/main..HEAD"
    else
      range="-1 HEAD"
    fi
  fi
  "$bin" git --redact --no-banner --log-opts="${range}" .
}
run "Secret scan (gitleaks ${GITLEAKS_VERSION})" secret_scan

# 5. Static analysis with the company rules in .opengrep/: the rules' test cases, then every finding
# as a report, then ERROR findings block. On a branch only the ERROR findings introduced since it
# left origin/main block, as on a pull request; on main itself every ERROR finding blocks. Opengrep
# is pinned; when it is absent this is an honest SKIP with install guidance, never a faked pass.
opengrep_bin() {
  local bin
  bin="$(command -v opengrep || true)"
  [ -z "$bin" ] && [ -x "$HOME/.local/bin/opengrep" ] && bin="$HOME/.local/bin/opengrep"
  printf '%s' "$bin"
}
static_analysis() {
  local bin base=()
  bin="$(opengrep_bin)"
  if [ "$("$bin" --version 2>/dev/null)" != "${OPENGREP_VERSION}" ]; then
    echo "opengrep is $("$bin" --version 2>/dev/null), the gate pins ${OPENGREP_VERSION}"; return 1
  fi
  "$bin" test .opengrep || return 1
  echo "-- every finding (report, does not block) --"
  "$bin" scan --config .opengrep --quiet . || true
  if git rev-parse -q --verify origin/main >/dev/null && [ "$(git rev-list --count origin/main..HEAD)" -gt 0 ]; then
    base=(--baseline-commit "$(git merge-base origin/main HEAD)")
  fi
  echo "-- ERROR findings (block) --"
  "$bin" scan --config .opengrep --severity ERROR --error --quiet ${base[@]+"${base[@]}"} .
}
if [ -z "$(opengrep_bin)" ]; then
  skip "Static analysis (Opengrep ${OPENGREP_VERSION})" "opengrep ${OPENGREP_VERSION} is not installed — download opengrep_manylinux_x86 from https://github.com/opengrep/opengrep/releases/tag/v${OPENGREP_VERSION} to \$HOME/.local/bin/opengrep (verify the checksum, then chmod +x), as the workflow's sast job does"
else
  run "Static analysis (Opengrep ${OPENGREP_VERSION})" static_analysis
fi

# 6. Every scripts/*.sh is committed executable.
exec_bits() {
  local status=0 line mode path
  while IFS= read -r line; do
    mode="${line%% *}"; path="${line#*$'\t'}"
    if [ "$mode" != "100755" ] || ! test -x "$path"; then
      echo "$path is not executable. Fix with: git update-index --chmod=+x $path"; status=1
    fi
  done < <(git ls-files -s -- 'scripts/*.sh')
  return "$status"
}
run "Scripts are executable" exec_bits

echo
echo "== Summary =="
printf '%s\n' "${results[@]}"
echo "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo '(no commit yet)')${dirty_at_start}"
if [ "$failed" -ne 0 ]; then echo "Local gate: FAILED"; exit 1; fi
if [ "$skipped" -ne 0 ]; then echo "Local gate: passed with skips (each SKIP above is a gate that did not run)"; exit 0; fi
echo "Local gate: all steps passed"
