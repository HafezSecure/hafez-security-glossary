# Project brief — Hafez Security Glossary

> **Status:** Accepted (owner approved the public-repository and licence decision on 2026-11-04)\
> **Owner:** Founder\
> **Date:** 2026-11-04

Filled from the handbook's [project brief template](https://github.com/HafezSecure/hafez-handbook/blob/main/templates/project-brief.md). It records the decisions behind the repository and is the plan the work follows.

## 1. Summary

| Field | Answer |
| --- | --- |
| Project name | Hafez Security Glossary — «واژه‌نامهٔ امنیت حافظ» |
| Repository name | `HafezSecure/hafez-security-glossary` |
| One-line purpose | An open, bilingual English–Persian dictionary of information-security terms, as a HafezSecure contribution to the Persian-speaking security community. |
| Owner | Founder |
| Date of this brief | 2026-11-04 |

## 2. Problem and users

- **Problem:** Persian security terminology is fragmented. Many terms are half-transliterated, several have competing translations, and there is no authoritative, citable reference. Writers, translators, teachers and learners each improvise, so the same concept appears under different Persian words and communication suffers.
- **Users:**
  - Persian-speaking security practitioners, students and translators who need a trusted Persian rendering of an English term (the largest group).
  - Content authors across HafezSecure (Academy, website, reports) who need one consistent vocabulary.
  - The international reader who finds a term through search and wants its Persian equivalent and a short definition.
  - Downstream tools (the website glossary, Academy tooltips) that consume the dataset.
- **Why now:** HafezSecure already produces a large security corpus (Academy, CTF, website) and a shared vocabulary is needed anyway; publishing it as a commons turns a necessity into a cultural contribution and a brand and discoverability asset.
- **Where terms come from:** the HafezSecure Academy is the **primary feeder** — its lessons generate and need vocabulary continuously; the website, CTF and community are secondary sources. See [decision record 0004](../decisions/0004-academy-primary-term-feeder.md).

## 3. Product type

- [x] **Other:** a public, openly-licensed **data and build repository** — term files plus a build that produces datasets. It has no server of its own; the website renders it. A decision record explains the stack: [0003](../decisions/0003-data-architecture-one-file-per-term.md).

## 4. Locales and direction

| Field | Answer |
| --- | --- |
| Locales | `fa`, `en` |
| Default locale | `fa` |
| Default direction | `rtl` |
| Launch locale | `fa` first, with English headwords and definitions present from the start |
| Calendar and digits | Persian digits in Persian text; ISO dates in metadata |

Arabic (`ar`) is a possible later locale; it is a non-goal for the first release.

## 5. Data

| Field | Answer |
| --- | --- |
| Highest classification handled | **Public (عادی).** Everything here is world-readable by design. |
| Personal data | None. |
| Client or engagement data | None, ever. |
| Retention | Permanent and versioned; the git history is the record. A term is deprecated with a tombstone, never deleted. |
| Tenancy | Not applicable — one public dataset. |

## 6. Hosting target

- [x] **Iran-based datacentre** — the rendered glossary is served from `hafezsecure.ir` on HafezSecure infrastructure. The **source** is public on GitHub, like the company's other repositories, and carries no sensitive data. No runtime foreign-cloud dependency.

## 7. Integrations and runtime external calls

None at runtime: the dataset is static. The website and other consumers read a built dataset at **build time**; that is a dependency of theirs, not a runtime call of this project. The goal state — no runtime integration — is met.

## 8. Authentication and authorisation

None in this repository. It is public and read-only to the world; contributions arrive as GitHub pull requests under GitHub identity and are merged by a maintainer after review (the review gate). No sign-in, roles or sessions.

## 9. Brand

- [x] **HafezSecure brand.** The rendered glossary on the website uses the design-system tokens and the brand rules: Arghavani as the accent only, Persian in Peyda and Morabba, English in Bricolage Grotesque and IBM Plex, all self-hosted.

## 10. AI-first

| Field | Answer |
| --- | --- |
| What AI does | **Draft** candidate translations, definitions and examples for a human to review (AI-assisted); **extract** candidate terms the glossary is missing from the Academy/CTF/website corpus (AI-assisted); **check** the set for duplicates and inconsistent renderings (AI-assisted); on the website, power **semantic search** over the dataset (AI-driven, later). Gain: coverage and speed in drafting and gap-finding, and a better find experience. |
| Where AI is not used | The final choice of a preferred translation and the move to `status: reviewed` — a person decides, because authority is the product. |
| Shared capabilities | Drafting uses Claude on the founder's subscription (per the translation standard), not paid APIs or Fabric. Website semantic search could later use a Hafez Fabric capability (a cross-project request if so). |
| Data the model sees | Public only. Nothing here is above Public, so there is no classification concern. |
| Model hosting | External (Claude) for authoring aid; any website search capability would be self-hosted or via Fabric. |
| Human approval | Every term is reviewed by a person before `status: reviewed`. AI output is never published unreviewed. |
| Kill switch and fallback | AI is only an authoring aid; the dataset and the build stand entirely without it. |
| Measure | Share of AI-drafted terms accepted with no edit; number of real gaps AI surfaced; search success on the site. |

## 11. Success criteria

- A reviewed seed spanning **all eight domains** is live on `hafezsecure.ir`, searchable, one page per term, by the first release.
- The dataset is consumed by at least one other HafezSecure surface (Academy tooltips or the website) from the single source.
- The repository accepts and merges at least one external community contribution.
- Persian searches for seeded terms surface the glossary (a discoverability/SEO signal), tracked after launch.

## 12. Non-goals

- Not the company's product-and-service naming glossary (that stays in the handbook).
- Not an encyclopedia or a set of tutorials — definitions are short; depth belongs to the Academy, which may link here.
- Not machine translation: every entry is human-reviewed.
- Not Arabic in the first release.

## 13. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Translation disputes ("that's not the right Persian word") | High | Medium | One preferred rendering plus recorded, flagged alternatives; a written translation policy; the review gate | Founder |
| Low-quality or spam contributions | Medium | Low | The review gate — nothing is authoritative until a maintainer reviews it | Maintainers |
| Scope creep into tutorials/encyclopedia | Medium | Medium | Non-goals above; short definitions by design | Founder |
| Something sensitive committed to a public repo | Low | High | No personal/client data by policy; the secret scan in the gate; public-by-design review | Maintainers |
| Maintenance burden as it grows | Medium | Low | One file per term keeps diffs and reviews small; seed in batches | Maintainers |

## 14. Owner and approval

| Field | Answer |
| --- | --- |
| Owner | Founder |
| Approved by | Founder |
| Approval date | 2026-11-04 |
| Open questions | Whether a public repository should have a validating CI despite the no-GitHub-CI rule — Founder. How deep the first seed should go beyond one representative batch per domain — Founder. |

## Sources

- `Founder decision (2026-11-04)`: build the glossary as a public, community-contributable repository synced to the website; seed broad across all domains; repository name `hafez-security-glossary`.
- HafezSecure handbook: `templates/project-brief.md`, `engineering/repository-standards.md`, `company/ai-first.md`.
