# 0005 — Index a term page only when it is reviewed, substantive and worth landing on

**Status:** accepted

**Date:** 2026-11-07

**Decided by:** Founder

## Context

The glossary will grow to thousands of terms. A page per term is the proven "definition library" model (Investopedia, Cloudflare Learning Center, MDN, TechTarget), and the number of pages is not itself an SEO risk: a few thousand URLs is small for crawl budget, and a deep, high-quality security glossary builds topical authority that helps the rest of the site rank. Multilingual pages are language variants, not duplicates, when each self-canonicals and declares the others through hreflang.

The real risk at scale is **index bloat**: offering Google pages that are thin, that target no real search demand, or that are not yet reviewed. A large share of low-value pages drags the whole site's quality signal. So the question is not "how many pages" but "which pages do we let search engines index".

## Decision

1. **A term page is in the sitemap and left indexable only when it is all of:** `status: reviewed`, **substantive** (a real definition with enough context to answer the query), and **mapped to real search demand**. Every other term page is `noindex` and excluded from the sitemap, while staying fully viewable in the glossary. Reviewing a term is therefore what makes it indexable — indexing is tied to the review gate.
2. **Multilingual stays variants, not duplicates:** each language version self-canonicals and lists the others via hreflang. Arabic term pages are canonicalised to the English URL and kept out of the sitemap until Arabic translations exist.
3. **Metadata targets the real query** per language — the Persian «معنی/چیست/معادل فارسی …» and the English "… meaning/definition" intent — and each term page carries `BreadcrumbList` structured data alongside the existing `DefinedTerm`.
4. **Keep crawl shallow at scale** with per-domain hub pages, an A–Z index and tight internal linking, and keep the glossary a **subpath** of the main site (`/glossary`) so its topical authority consolidates rather than splitting to a subdomain.

## Consequences

- Growth to thousands of terms is an asset, not bloat: Google only sees authoritative, demand-worthy pages, and the brand never ranks for a translation it has not vetted.
- The website implements the rule from each term's `status` plus a substance/demand check: viewable ≠ indexable. The dataset already carries `status`; a substance/demand signal is added where the rendering lives.
- As the set grows, hub and A–Z pages and internal links must grow with it so no page is thin, orphaned or deep.
- **Rendering note:** the website renders the glossary **server-side per request** (not statically pre-rendered as [0003](0003-data-architecture-one-file-per-term.md)'s contract first stated), to match the site's architecture; the no-JavaScript and strict-CSP requirements of that contract still hold. This refines 0003's wording, it does not change its intent.

## Alternatives rejected

- **Index every term.** Rejected: exposes unreviewed translations and risks thin-content signals across the site.
- **Index nothing, or cap the number of pages.** Rejected: forfeits the central SEO opportunity; the glossary/definition-library model wins precisely by having one good page per real query.
- **Put the glossary on a separate subdomain.** Rejected: splits link equity and topical authority away from the main site.

## Related

- [docs/architecture/data-model.md](../architecture/data-model.md)
- [docs/plans/roadmap.md](../plans/roadmap.md)
