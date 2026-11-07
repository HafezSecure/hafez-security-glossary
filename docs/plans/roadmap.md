# Roadmap and operating model

How the Hafez Security Glossary is built and run. Status lives here only; keep it in step as work lands.

## Phases

| Phase | What | Status |
| --- | --- | --- |
| 1. Foundation | Repository, term schema, domain vocabulary, translation policy, data model, validate/build tooling and the local gate; a seed across all eight domains. | **Done** |
| 2. Publish and render | Public repository on GitHub; a searchable glossary section on `hafezsecure.ir` that renders the dataset (the no-JavaScript, strict-CSP, self-hosted-font rendering contract), in `fa` and `en`, with per-term pages, domain and alphabetical browse, and SEO. | **Now** |
| 3. Academy feeder | Wire the Academy as the primary feeder (decision [0004](../decisions/0004-academy-primary-term-feeder.md)): extract candidate terms from lessons, and have lessons link to glossary terms (tooltips) from the pinned dataset. Grow coverage. | Next |
| 4. Open and release | Open community contributions in earnest; add the `ar` locale; cut the first tagged release and vendor the full CC BY 4.0 legal text. | Later |

## How we run it

- **Adding a term.** Anyone opens an issue (a proposal) or a pull request (one file per term). A term enters as `status: draft`. The Academy is the primary source of new terms; the website, CTF and community are secondary.
- **Review and ratify.** A maintainer reviews a draft against the [translation policy](../translation-policy.md) — the preferred rendering, the definitions, the Persian, the sources — and sets `status: reviewed` with their name. This review is what makes a term authoritative. Work the draft queue on a regular cadence so it never stalls.
- **Build and consume.** `pnpm run build` produces the datasets in `dist/`. Consumers (the website, the Academy) read the built dataset, never the term tree, and **pin a dataset version**; they bump the pin deliberately.
- **Versioning and releases.** The dataset is versioned with the repository (semver). Record notable changes in the changelog; cut a tagged release before a consumer bumps to a new version.
- **Governance.** The review gate, the translation policy and the immutable-slug rule are the guardrails. Nothing sensitive ever enters this public repository.

## Cross-project touchpoints

- **Academy** (primary feeder): an extraction-and-curation step in lesson authoring, and tooltips/links that consume the pinned dataset. Raised to the Academy as handbook cross-project request **XR-12** (decision [0004](../decisions/0004-academy-primary-term-feeder.md)).
- **Website**: implements the rendering contract and the indexing policy (below), and hosts the glossary; pins a dataset version.

## SEO and indexing

The glossary is an SEO asset, not a liability — a page per term is the proven definition-library model, and the number of pages is not the risk. The discipline is to offer search engines only pages worth landing on. Set by decision [0005](../decisions/0005-index-only-review-worthy-terms.md):

- **Index a term only when it is reviewed, substantive and maps to real search demand.** Everything else is `noindex` and out of the sitemap, but still viewable. Reviewing a term is what makes it indexable.
- **Multilingual = variants, not duplicates:** per-language self-canonical plus hreflang; Arabic term pages canonicalise to English and stay out of the sitemap until translated.
- **Metadata targets the real query** per language (Persian «معنی/چیست/معادل فارسی»، English "meaning/definition"); `BreadcrumbList` alongside the `DefinedTerm` structured data.
- **At scale:** per-domain hub pages, an A–Z index and internal linking keep crawl shallow; the glossary stays a subpath of the main site to consolidate topical authority.

## Content growth

Coverage grows on two tracks:

1. **Proactive, phased mining of the existing Academy corpus (primary).** The Academy already covers the high-demand domains; its lessons are a ready source of real, searched-for terminology. AI-assisted extraction drafts candidate terms from lesson content; a maintainer reviews each (the gate). This front-loads a substantial, indexable library without waiting on new lessons. Phases are demand-first:
   - **Phase C1 — Web / AppSec** (highest search demand, deepest Academy content, overlaps the services pages).
   - **Phase C2 — Network, Cryptography.**
   - **Phase C3 — Forensics, Malware, Cloud, OSINT.**
   Each phase seeds a batch of reviewed, substantive terms; only those meeting the indexing bar (decision [0005](../decisions/0005-index-only-review-worthy-terms.md)) enter the sitemap.
2. **Steady-state feeder (ongoing).** As new lessons are written, the Academy proposes their terms via XR-12 (decision [0004](../decisions/0004-academy-primary-term-feeder.md)), keeping the glossary current.

The website, CTF and community remain secondary sources through the same contribution path.
