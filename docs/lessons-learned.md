# Lessons learned

What this project has learned while building and running the Hafez Security Glossary, newest first, in the standard form of the handbook's [Lessons learned](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/lessons-learned.md) page. Write a lesson while it is fresh.

A lesson whose scope reaches beyond this repository is raised to the handbook in the same week, and its **Scope** line says where it went. Write without blame, and keep secrets, client names, personal data and internal addresses out.

## LL-2026-11-04-01 — The new-project template assumes a deployed web service

- **Phase:** development
- **Context:** scaffolding this repository, a public data-and-build project with no server, from the handbook's `templates/new-project`.
- **What happened:** the template's required files, gate and configuration all assume a deployed web service with a database (CSP, `SESSION_SECRET`, `DATABASE_URL`, a Docker image scan, `verify-live.sh`, a `security.txt`). A data repository had to strip or neutralise most of these and explain the gaps.
- **Root cause:** there is one new-project template, shaped for the common case (a Persian web app or a security-sensitive web product). A data, library or content repository has no variant.
- **The lesson:** a data/content repository is a distinct project type. Its brief ticks "Other", its gate is validate + build + docs, and it has no runtime configuration.
- **Action taken:** recorded here; to be raised to the handbook as a suggested "data/content repository" note or template variant, and reflected in decision record 0003.
- **Scope:** reaches the handbook (`templates/new-project`, `engineering/repository-standards.md`). To be raised this week.
- **Links:** docs/decisions/0003-data-architecture-one-file-per-term.md
