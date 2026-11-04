# Documentation

Every document in this repository is listed here. Read in this order if you are new.

## Start here

1. [Project README](../README.md): what the glossary is, its status and the quick start.
2. [Project brief](product/brief.md): the problem, the users, the decisions and the plan.
3. [Agent guide](../AGENTS.md): the layout, the commands and the hard rules. Written for AI coding agents, useful to everyone.
4. [Contributing](../CONTRIBUTING.md): how to propose a term or a better translation, the entry format and the review.

## Reference

- [Data model](architecture/data-model.md): the shape of a term file, the slug rules, the datasets the build produces, and the rendering contract a consumer (the website) follows.
- [Translation policy](translation-policy.md): how a preferred Persian translation is chosen, and how alternatives are flagged.
- [AI opportunity map](product/ai-opportunities.md): each part of the product, what AI could do for it, and the decision.
- [Decision records](decisions/README.md): decisions that are expensive to reverse, and their status.
- [Configuration](configuration.md): environment variables (there are none).
- [Security](../SECURITY.md): how to report a vulnerability in the tooling.
- [Changelog](../CHANGELOG.md): what changed in each release.
- [Handbook sync record](handbook-sync.md): the last handbook version read, and where this repository deviates from handbook policy.
- [Lessons learned](lessons-learned.md): what building the glossary has taught, newest first.

## Layout

| Path | Contents |
| --- | --- |
| `docs/product/brief.md` | The project brief. |
| `docs/product/ai-opportunities.md` | The AI opportunity map. |
| `docs/architecture/data-model.md` | The term format, the datasets and the rendering contract. |
| `docs/translation-policy.md` | How translations are chosen. |
| `docs/decisions/` | Decision records and their index. |

- File names are lowercase with hyphens.
- A generated file (anything in `dist/`) is never edited by hand; the build regenerates it.
- A change that alters the data shape, a decision or a behaviour updates the document that describes it in the same commit.

The HafezSecure-wide rules this project follows are in the [HafezSecure handbook](https://github.com/HafezSecure/hafez-handbook/blob/main/README.md).
