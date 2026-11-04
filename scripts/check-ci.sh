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

# 5. Every scripts/*.sh is committed executable.
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
