# Handbook sync record

This repository's record of keeping up with the [HafezSecure handbook](https://github.com/HafezSecure/hafez-handbook), as [Keeping up with the handbook](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/keeping-up-with-the-handbook.md) requires.

**Every working day,** at the first session on this repository: read the handbook [CHANGELOG](https://github.com/HafezSecure/hafez-handbook/blob/main/CHANGELOG.md) entries newer than the handbook version below, record each one under observed changes, apply what is small and clear or open a row in the register, and then move the sync point.

## 1. Last read

Last read **2026-11-04**, reconciled through handbook version **`2026.10.30.7`** (Products register their assets and hold a scoped platform credential).

## 2. Observed changes

Newest first. One row per CHANGELOG entry read.

| Handbook version and entry | What it means here | Outcome |
| --- | --- | --- |
| `2026.10.30.7` — products register assets and hold a scoped platform credential | Applies to products that reach the HafezSecure platform. This repository has no runtime and no platform credential, so it does not apply. | Already satisfied (not applicable) |
| Baseline at creation | Repository created from the new-project template at this handbook version. | Applied now |

## 3. Follow-ups and drift

| Policy | How this repository deviates | Plan to close | Status | Target |
| --- | --- | --- | --- | --- |
| [Repository standards](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/repository-standards.md) — "all repositories are private" and carry the proprietary `LICENSE` | This repository is public and dual-licensed (MIT tooling, CC BY 4.0 content) | Accepted with a decision record | `accepted (ADR 0002)` | — |
| New-project template assumes a deployed web service (CSP, DB, image scan, `security.txt`) | This is a data/content repository with no runtime; those controls do not apply | Raise a data-repository note to the handbook | `planned` | 2026-11 |
