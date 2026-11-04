# 0004 — The HafezSecure Academy is the primary feeder of terms

**Status:** accepted

**Date:** 2026-11-04

**Decided by:** Founder

## Context

The glossary needs a steady, high-quality source of terms and of the contexts that give them meaning. The HafezSecure Academy teaches security from zero with many worked examples, and it continuously produces and needs vocabulary: every lesson introduces terms that a learner must understand. That makes the Academy the natural, highest-quality source of what the glossary should contain — richer and more systematic than scattered articles. The website, CTF write-ups and the wider community are real but secondary sources.

## Decision

1. **The Academy is the primary feeder.** As lessons are written or revised, the terms they introduce are proposed to the glossary — AI-assisted extraction plus human curation — and each enters here as a `draft` term.
2. **The glossary is the single vocabulary the Academy links to.** Lessons reference a glossary term rather than redefining it, and the Academy consumes the built dataset (for tooltips and links) pinned to a dataset version.
3. **The website, CTF and community remain secondary feeders**, through the same contribution path.
4. **Authority still comes from the review gate here.** Whatever the source, a term becomes authoritative only when a maintainer reviews it and sets `status: reviewed`. The feeder decides *coverage*, not *authority*.

## Consequences

- A virtuous loop: teaching drives the glossary's coverage, and the glossary gives the Academy one consistent, authoritative vocabulary instead of each lesson coining its own.
- A lightweight extraction-and-curation step must be added to the Academy's authoring workflow — a cross-project touchpoint to set up (raised to the Academy as a request).
- The Academy pins a glossary dataset version and bumps it deliberately, so a change here never silently alters a lesson.
- The glossary must keep coverage ahead of the lessons that depend on it; the roadmap tracks this.

## Alternatives considered

- **No designated feeder.** Rejected: coverage would grow ad hoc and lag behind where it is needed.
- **The website as the primary source.** Rejected: article output is less systematic than a curriculum that deliberately walks the field.
- **A separate glossary inside the Academy.** Rejected: it would drift from this one and defeat the single-vocabulary goal.

## Related

- [docs/product/brief.md](../product/brief.md)
- [docs/product/ai-opportunities.md](../product/ai-opportunities.md)
- [docs/plans/roadmap.md](../plans/roadmap.md)
