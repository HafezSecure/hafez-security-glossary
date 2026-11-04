# Configuration

The Hafez Security Glossary is a data repository with a build step. It **reads no environment variables**, opens no network connection, and runs no server. [`.env.example`](../.env.example) therefore lists nothing.

If a future tool needs a setting (for example, a path to write the datasets to), add a row here and to `.env.example` in the same commit as the code that reads it, following the handbook's [repository standards](https://github.com/HafezSecure/hafez-handbook/blob/main/engineering/repository-standards.md#environment-variables).

| Variable | Default | Effect | Required | Secret |
| --- | --- | --- | --- | --- |
| _none_ | | | | |
