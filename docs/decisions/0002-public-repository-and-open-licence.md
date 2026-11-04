# 0002 — Publish the glossary as a public repository under an open licence

**Status:** accepted

**Date:** 2026-11-04

**Decided by:** Founder

## Context

Every other HafezSecure repository is private and carries the proprietary `LICENSE` (all rights reserved), and [Repository standards](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/repository-standards.md) states that all repositories are private. The handbook itself may be shared only with contracted integrators.

The glossary is different in kind. Its purpose is a cultural contribution to the Persian security community, and its value depends on being citable, forkable and contributable by anyone — a commons, not a product. A private repository, or a dataset published only as a rendered page, would keep none of that: no outside contributions, no reuse with attribution flowing back to HafezSecure, no open version history per term. The founder has decided the repository is public, accepts community pull requests under maintainer review, and uses a permissive content licence. This deviates from an Adopted handbook rule, so it is recorded here, and nothing is pushed public until this record is accepted.

## Decision

1. The repository is **public** under the `HafezSecure` GitHub organisation.
2. It is **dual-licensed**: the dictionary content (everything under `terms/`, and the datasets built from it) under **Creative Commons Attribution 4.0 International (CC BY 4.0)**; the tooling (scripts, schema) under **MIT**.
3. The repository holds **no** secrets, personal data, client data, internal hostnames or IP addresses — ever. Everything in it is treated as world-readable, and the secret scan runs in the gate.
4. Outside contributions arrive as public pull requests, released under those licences by the act of contributing, and are merged by a HafezSecure maintainer only after review (the review gate; see [0003](0003-data-architecture-one-file-per-term.md) and `AGENTS.md`).
5. GitHub Actions stays unused even though the repository is public: the gate runs locally, per the company rule. (Whether a public repository should have a validating CI for outside contributors is an open question for the owner.)

## Consequences

- This is HafezSecure's first public, open-source/open-data repository: it carries the brand into the open and must be kept impeccably clean of anything sensitive.
- The commons goals are met: reuse with attribution, community contribution, per-term history, and discoverability that points back to `hafezsecure.ir`.
- It departs from the "all repositories are private and proprietary" standard; the handbook's new-project proprietary `LICENSE` is replaced here and the deviation is tracked in `docs/handbook-sync.md`.
- Follow-up: vendor the full CC BY 4.0 legal text into `LICENSE-CONTENT` before the first tagged release (the canonical URL governs until then).

## Alternatives considered

- **Private repository, publish only the rendered site.** Rejected: loses the commons entirely — no citation, no forking, no community contribution.
- **Public content, but no outside pull requests.** Rejected: keeps the openness but discards the community the mission is for.
- **A copyleft content licence (CC BY-SA).** Rejected for now: share-alike discourages reuse in mixed works; CC BY maximises spread while still requiring attribution. Can be revisited.

## Related

- [docs/product/brief.md](../product/brief.md)
- [docs/decisions/0003-data-architecture-one-file-per-term.md](0003-data-architecture-one-file-per-term.md)
