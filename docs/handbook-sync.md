# Handbook sync record

This repository's record of keeping up with the [HafezSecure handbook](https://github.com/HafezSecure/hafez-handbook), as [Keeping up with the handbook](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/keeping-up-with-the-handbook.md) requires.

**Every working day,** at the first session on this repository: read the handbook [CHANGELOG](https://github.com/HafezSecure/hafez-handbook/blob/main/CHANGELOG.md) entries newer than the handbook version below, record each one under observed changes, apply what is small and clear or open a row in the register, and then move the sync point.

## 1. Last read

**Handbook sync point:** `2026.11.16.3` (reconciled 2026-11-16)

That one line is the sync point: the handbook version of the newest CHANGELOG entry read and the date it was reconciled. Edit it in place at every sync and never add a second one; the handbook's daily check reads it from the default branch.

The handbook is private and this repository is public, so the rows below name each entry by its version and say only what it means here. Nothing from the handbook is quoted.

## 2. Observed changes

Newest first. One row per CHANGELOG entry read.

| Handbook version and entry | What it means here | Outcome |
| --- | --- | --- |
| `2026.11.16.3` | The daily sync check writes a short tracking issue in a public repository: counts and the sync point only | Already satisfied: nothing to change here |
| `2026.11.16.2` | The sync point is one standard, machine-readable line that a daily check reads from the default branch | Applied now: the line in section 1 |
| `2026.11.16.1` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.10.1` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.8` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.7` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.6` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.5` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.4` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.3` | A change to this project is a pull request here; a change to a shared company rule is made in the handbook | Applied now: stated in CONTRIBUTING.md |
| `2026.11.09.2` | An internal company rule or record with no bearing on a public data repository | Not applicable |
| `2026.11.09.1` | Every pull request states its owning effort, status and what it supersedes and carries area, status and kind labels; the repository keeps an open-work register and an owners file | Applied now: template, labels, `docs/open-work.md` and `.github/CODEOWNERS` |
| `2026.11.04.1` | This repository was registered in the company's repository inventory | Already satisfied |
| `2026.10.30.7` — products register assets and hold a scoped platform credential | Applies to products that reach the HafezSecure platform. This repository has no runtime and no platform credential, so it does not apply. | Already satisfied (not applicable) |
| Baseline at creation | Repository created from the new-project template at this handbook version. | Applied now |

## 3. Follow-ups and drift

| Policy | How this repository deviates | Plan to close | Status | Target |
| --- | --- | --- | --- | --- |
| [Repository standards](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/repository-standards.md) — "all repositories are private" and carry the proprietary `LICENSE` | This repository is public and dual-licensed (MIT tooling, CC BY 4.0 content) | Accepted with a decision record | `accepted (ADR 0002)` | — |
| New-project template assumes a deployed web service (CSP, DB, image scan, `security.txt`) | This is a data/content repository with no runtime; those controls do not apply | Raise a data-repository note to the handbook | `planned` | 2026-11-30 |
| Static analysis in the gate (company delivery pipeline rule) | The gate validates the data, checks the docs and scans for secrets, but runs no static analysis of the build and validation scripts; the tool is not installed on the gate machine | Copy the rule files from the company template, run the first scan of `scripts/`, triage it, then add the step to the gate. The deploy and live-check parts do not apply: nothing is deployed | `planned` | 2026-11-30 |
| Weekly source-code security audit | No audit report has been written yet | Run the first audit with `pnpm check:ci` and the checklist, and file the report under `docs/security/audits/` | `planned` | 2026-11-23 |
| Daily handbook sync | No sync ran between 2026-11-04 and 2026-11-16 | Caught up on 2026-11-16; a daily check now reports when this record falls behind | `closed` (2026-11-16) | Done |
