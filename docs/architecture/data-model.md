# Data model

How a term is stored, the rules a term file must satisfy, the datasets the build produces, and the contract a consumer (the website) follows. The machine contract is [`schema/term.schema.json`](../../schema/term.schema.json); this page is its prose. The decision behind it is [0003](../decisions/0003-data-architecture-one-file-per-term.md).

## A term is one file

Each term is one file at `terms/<primary-domain>/<slug>.md`:

- **YAML front matter** holds the structured fields (below).
- An optional **Markdown body** after the front matter holds extended notes — history, caveats, a worked example — for the rare term that needs more than the definition. Most terms have none.

### The slug

- The **file name without `.md` is the slug**. It is not repeated in the front matter.
- It is lowercase ASCII, words joined by single hyphens: `^[a-z0-9]+(-[a-z0-9]+)*$` (for example `cross-site-scripting`).
- It is the term's **public URL** and its **permanent identity**. Never rename a file. To change the headword, keep the slug; to retire a slug, record it in another term's `aliases`.

### The primary domain is the folder

The folder under `terms/` is the term's **primary domain**, and it must be the first entry in `domains`. Further domains are tags. Domains come from [`schema/domains.json`](../../schema/domains.json); nothing outside that list is valid.

## Front-matter fields

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `en` | yes | string | The English headword, in its canonical form; an abbreviation may follow in parentheses, e.g. `Cross-Site Scripting (XSS)`. |
| `fa` | yes | string | The **preferred** Persian rendering — exactly one. |
| `domains` | yes | array of domain keys | At least one. The first is the primary and equals the folder. Each key is in `schema/domains.json`. |
| `status` | yes | `draft` or `reviewed` | A new term is `draft`. `reviewed` is set only by a maintainer. |
| `reviewed_by` | if `reviewed` | string | The reviewer's name. Required when `status` is `reviewed`; absent or empty otherwise. |
| `alternatives` | no | array | Other renderings in use. Each: `term` (string, required), `script` (`fa` or `latin`, default `fa`), `status` (`accepted`, `discouraged` or `deprecated`, required), `note` (short Persian note, optional). |
| `definition_fa` | yes | string | A short Persian definition (one or two sentences). |
| `definition_en` | no | string | The English definition. Recommended. |
| `example_fa` | no | string | One sentence using the term in context, in Persian. |
| `see_also` | no | array of slugs | Related terms; each must resolve to an existing term. |
| `aliases` | no | array of slugs | Former or equivalent slugs that should resolve here. Unique across all slugs and aliases. |
| `sources` | no | array | Each: `title` (string) and `url` (https). Prefer primary references (OWASP, NIST, MITRE, RFCs). |
| `added` | no | date `YYYY-MM-DD` | When the term was added. |
| `updated` | no | date `YYYY-MM-DD` | When it last changed. |

### Rules the validator enforces

- The file name is a valid slug and is unique; no slug collides with any `alias`.
- The parent folder equals `domains[0]`, and every domain is in the vocabulary.
- `en`, `fa`, `domains` and `definition_fa` are present and non-empty.
- `reviewed` ⇒ a non-empty `reviewed_by`; `draft` ⇒ no `reviewed_by`.
- Every `see_also` slug and every `alias` points at a term that exists.
- Persian fields (`fa`, `definition_fa`, `example_fa`, and any `alternatives.note`/`fa`-script `term`) use Persian ‪ی‬ (U+06CC) and ‪ک‬ (U+06A9), never the Arabic ‪ي‬ (U+064A) or ‪ك‬ (U+0643).
- `sources[].url` is an `https` URL.

## The datasets the build produces

`pnpm run build` reads every term file and writes to `dist/` (generated; never hand-edited). Consumers read **these**, never the term tree.

| File | Contents |
| --- | --- |
| `dist/glossary.json` | The full dataset: metadata plus every term as a complete object (slug included). |
| `dist/index.json` | A compact search index: `slug`, `en`, `fa`, `domains`, `status`, and a short `snippet`. Small enough to ship to the browser for instant client-side search. |
| `dist/by-domain/<domain>.json` | The terms of one domain, so a consumer loads only what a page needs. |
| `dist/domains.json` | The domain vocabulary with a term count each. |
| `dist/meta.json` | Dataset `version`, build timestamp and total count. |

The dataset is **semver-versioned** (the `version` in `package.json`). A consumer **pins a version**, so editing the glossary never silently changes a consuming site; the consumer bumps its pin deliberately.

## Rendering contract (for the website and other consumers)

Set by decision record [0003](../decisions/0003-data-architecture-one-file-per-term.md). A consuming site:

- Pre-renders **one static page per term** and a browsable index (by domain and alphabetical) that work with **no JavaScript**, under the handbook's strict CSP, with self-hosted fonts (Peyda, Morabba) and Arghavani used **only** as the accent.
- Treats client-side search over `dist/index.json` as a progressive enhancement, never the only way to reach a term.
- Uses each term's slug as its URL path, and honours `aliases` as redirects to it.

This repository guarantees the dataset shape and its version; a consumer implements the contract in its own repository.
