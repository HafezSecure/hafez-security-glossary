# Security

The Hafez Security Glossary is built by HafezSecure, a security company, so it is held to the standard the company would flag in an assessment of someone else's project. This repository is **public** and holds only openly-licensed reference content and a small build; it has no server, no database and no secrets.

## Reporting a vulnerability

Email **security@hafezsecure.ir**.

- A vulnerability here means a problem in the tooling (for example, the build or a script mishandling input in a way that could harm someone who runs it) — not a disputed translation. Propose a content fix the normal way; see [CONTRIBUTING.md](CONTRIBUTING.md).
- Do not open a public issue or pull request for a security vulnerability, and do not report it to a personal address.

### What to include

- What you found and why it matters.
- How to reproduce it: the steps and the input.
- Your contact details, and whether you would like to be credited.

### Scope

**In scope:** the build and validation scripts (`scripts/`), the schema, and the integrity of the published datasets.

**Out of scope:** disputed or incorrect translations (these are handled as content contributions), denial-of-service and load testing, and scanner output without a demonstrated impact.

### What to expect

We acknowledge reports and keep you informed while we fix them. HafezSecure runs no bug bounty; no payment is offered. Reporters are credited publicly only with their consent.

## Data

This repository contains **no** personal data, client data, secrets, internal hostnames or IP addresses, and must never. It is world-readable.

## Controls implemented

- No secrets in the repository; the secret scan runs in the local gate.
- Every term file is validated against a schema before it can be built or merged.
- Commits by the HafezSecure team are signed (SSH signing).

## Verified

- `pnpm run validate` fails the gate on any malformed or inconsistent term file.
- `scripts/check-docs.mjs` fails on a broken link, a bad decision-record status or a secret-looking value in `.env.example`.

## Deferred (named, not forgotten)

- Vendoring the full CC BY 4.0 legal text into `LICENSE-CONTENT` before the first tagged release (tracked in [docs/decisions/0002](docs/decisions/0002-public-repository-and-open-licence.md)).
