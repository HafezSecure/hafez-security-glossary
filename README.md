# Hafez Security Glossary — واژه‌نامهٔ امنیت حافظ

An open, bilingual English–Persian dictionary of information-security terms, curated by HafezSecure as a contribution to the Persian-speaking security community.

A HafezSecure project. It follows the [HafezSecure handbook](https://github.com/HafezSecure/hafez-handbook/blob/main/README.md) unless a decision record in [docs/decisions](docs/decisions/README.md) says otherwise. Unlike other HafezSecure repositories, this one is **public and openly licensed** — see [decision record 0002](docs/decisions/0002-public-repository-and-open-licence.md).

## What this is

Persian security terminology is fragmented: many terms are half-transliterated, others have several competing translations, and there is no authoritative reference. This repository is that reference — each term gets one page with a preferred Persian rendering, the accepted alternatives, short definitions in both languages, a usage example and cross-links.

It is **data first**: the terms live as one small file each, and a build turns them into the datasets a website, an app or a learner's tool consumes. The website at `hafezsecure.ir` renders them as a searchable glossary.

This is **not** the company's own product-and-service naming glossary (that lives in the handbook). It is general security terminology for everyone.

## Status

| Field | Value |
| --- | --- |
| Status | Concept → In development |
| Version | 0.1.0 |
| Owner | Founder |
| Highest data classification | Public (عادی) |
| Hosting | GitHub (source); rendered on hafezsecure.ir |
| Locales | `fa` (default, RTL), `en` |

## Quick start

You need Node.js 22 (see `.nvmrc`) and pnpm 11.5.0 (pinned by `packageManager` in `package.json`).

```sh
pnpm install
pnpm run validate     # every term file is well-formed and consistent
pnpm run build        # generate the datasets in dist/
pnpm run check:ci     # the full local gate
```

This project reads no environment variables and runs no server; see [docs/configuration.md](docs/configuration.md).

## Repository layout

| Path | Contents |
| --- | --- |
| `terms/<domain>/<slug>.md` | One file per term: YAML front matter plus optional notes. The source of truth. |
| `schema/term.schema.json` | The contract every term file must satisfy. |
| `schema/domains.json` | The controlled list of domains and their bilingual labels. |
| `scripts/validate.mjs` | Validates every term file, `pnpm run validate`. |
| `scripts/build.mjs` | Builds the distribution datasets into `dist/`, `pnpm run build`. |
| `dist/` | Generated datasets (git-ignored): combined, per-domain and a compact search index. |
| `docs/` | Documentation. Start at [docs/README.md](docs/README.md). The plan is [docs/product/brief.md](docs/product/brief.md). |

## Contributing

Anyone may propose a term or a better translation. How translations are chosen, the entry format and the review that gates a term to "reviewed" are in [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/translation-policy.md](docs/translation-policy.md).

## Licence

Dual-licensed so it is a true commons:

- **Dictionary content** (everything under `terms/`, and the datasets built from it): [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT) — reuse it anywhere with attribution to HafezSecure.
- **Tooling** (scripts, schema): [MIT](LICENSE).

See [decision record 0002](docs/decisions/0002-public-repository-and-open-licence.md) for why.

## Security

Report a vulnerability in the tooling to **security@hafezsecure.ir**; do not open a public issue for it. [SECURITY.md](SECURITY.md) has the detail. A wrong or disputed translation is not a vulnerability — propose a fix the normal way.
