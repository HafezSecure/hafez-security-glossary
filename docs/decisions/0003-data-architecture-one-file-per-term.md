# 0003 — One file per term, built into versioned datasets a consumer reads

**Status:** accepted

**Date:** 2026-11-04

**Decided by:** Founder

## Context

The glossary must grow to thousands of terms, be edited by many contributors at once, serve several consumers (the website, Academy tooltips, outside tools), and render on the website with no JavaScript under a strict Content Security Policy. Persian renderings are contested, so a term must show one preferred form and its alternatives. These forces shape how the data is stored and delivered, and the choice is expensive to reverse once URLs are public and consumers depend on the shape.

## Decision

1. **One file per term**, at `terms/<primary-domain>/<slug>.md`: YAML front matter for the structured fields, an optional Markdown body for extended notes. This keeps pull-request diffs small, gives each term its own history, and avoids a single file that every contributor conflicts on.
2. **The slug is the file name and the public URL, and it is immutable.** A rename keeps the slug; a former slug goes in `aliases` so a URL never breaks. A removed or merged term leaves a tombstone, never a 404.
3. **Domains are a controlled vocabulary** in `schema/domains.json`. A term's first domain is its primary (and its folder); further domains are tags, so a term belongs to several domains without duplicating the file.
4. **Authoring is separate from distribution.** The build (`pnpm run build`) turns the term files into versioned datasets in `dist/`: a combined dataset, per-domain slices, and a compact search index. **Consumers read only the built datasets, never the term tree.** The datasets are semver-versioned and a consumer pins a version, so editing the glossary never silently changes a consuming site.
5. **Rendering contract (for consumers such as the website).** Pre-render one static page per term and a browsable index (by domain and alphabetical) that work with **no JavaScript**, under the handbook's strict CSP, with self-hosted fonts (Peyda, Morabba) and Arghavani used only as the accent. Client-side search over the compact index is a progressive enhancement, never the only path to a term.

## Consequences

- Clean diffs and history; no file grows unwieldy; the running site reads a small built index and static pages, so page loads stay light regardless of term count.
- A build step, a schema and a small amount of tooling must be maintained, and `dist/` is generated — never hand-edited.
- Reclassifying a term's primary domain moves its file; this is rare and git records it. The slug does not change, so URLs survive.
- The website implements the rendering contract in its own repository (a later phase); this repository only guarantees the dataset shape and its version.

## Alternatives rejected

- **One big file for all terms.** Rejected: every contributor conflicts on it, reviews are huge, and it grows unbounded.
- **One file per domain.** Rejected: files still grow large, two contributors to a domain conflict, and multi-domain terms have no natural home.
- **Store the data only in the website's database.** Rejected: loses the open, portable, forkable commons and ties the data to one consumer.
- **Client-side search as the only way to reach a term.** Rejected: it fails the no-JavaScript and strict-CSP requirement; search must be an enhancement over pre-rendered pages.

## Related

- [docs/architecture/data-model.md](../architecture/data-model.md)
- [docs/product/brief.md](../product/brief.md)
