# Contributing

The Hafez Security Glossary is an open commons. Anyone may propose a new term, a better Persian translation, a clearer definition or a fix — from the HafezSecure team, from the wider security community, and the AI coding agents working for them. Thank you for helping build an authoritative Persian security vocabulary.

Content is licensed under [CC BY 4.0](LICENSE-CONTENT) and tooling under [MIT](LICENSE). By contributing, you agree your contribution is released under those licences. Everyone follows this page and the [HafezSecure handbook](https://github.com/HafezSecure/hafez-handbook/blob/main/README.md); agents also read [AGENTS.md](AGENTS.md).

## Two ways to contribute

1. **Open an issue** proposing a term or a change — the quickest way if you are not comfortable with Git. Say the English term, the Persian you suggest, and why.
2. **Open a pull request** adding or editing a term file. Each term is one file, so a change is a small, reviewable diff.

## What a term looks like

Each term is one file at `terms/<primary-domain>/<slug>.md`, with YAML front matter and an optional notes body. The fields, their meaning and the rules are specified in [docs/architecture/data-model.md](docs/architecture/data-model.md); the machine contract is [`schema/term.schema.json`](schema/term.schema.json). In short, a term carries its English headword, the preferred Persian rendering, the accepted alternatives (each flagged), short definitions in both languages, an example, cross-links, its domains and its sources.

- The **file name is the slug** and the public URL. It is lowercase ASCII with hyphens, and it is **permanent** — never rename it.
- A term starts as `status: draft`. It becomes `status: reviewed`, with a named reviewer, only when a HafezSecure maintainer has checked it. **This review is the point of the project**: an unreviewed term is a proposal, a reviewed one is authoritative.

## Choosing a translation

Persian security terms are contested, so the glossary is opinionated by design: one preferred rendering, with the alternatives recorded and flagged. How the preferred one is chosen is set out in [docs/translation-policy.md](docs/translation-policy.md). Read it before proposing a translation, and follow the [Persian writing conventions](https://github.com/HafezSecure/hafez-handbook/blob/main/brand/voice-and-tone.md#persian-writing-conventions): Persian letters (‪ی‬، ‪ک‬), «» quotation marks, and نیم‌فاصله.

## Before you open a pull request

```sh
pnpm install
pnpm run validate
pnpm run build
```

`pnpm run validate` checks that every term file matches the schema, that slugs are unique and match their file, that cross-links resolve, that reviewed terms name a reviewer, and that Persian fields use Persian letters.

## Commits and pull requests

- Conventional Commits: `type(scope): subject`, imperative, the why in the body. Types include `feat`, `fix`, `docs`, `chore`.
- Stage explicit paths only; never `git add -A` or `git commit -a`. One topic per branch, branched from fresh `main`.
- **HafezSecure team members sign every commit** (SSH signing) and never force-push. External contributions need not be signed; a maintainer reviews and merges them.
- A commit substantially written by an AI agent carries a `Co-Authored-By` trailer naming the tool and model.
- Open the pull request against `main`, fill in the template, and keep it to one topic.

## The local gate

`.github/workflows/ci.yml` is the written definition of the gate; GitHub does not run it (a HafezSecure founder decision). **`pnpm check:ci`** (`scripts/check-ci.sh`) runs every step — install, validate, build, the docs check, the dependency audit, the secret scan and the script-permission check — on the commit you have checked out. A maintainer runs it on the exact commit before merging. A red gate is fixed before anything else.

## Security

Do not open a public issue or pull request for a vulnerability in the tooling. [SECURITY.md](SECURITY.md) has the reporting path. Never put secrets, personal data, client names or internal addresses in the repository — it is public.
