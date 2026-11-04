# AI opportunity map

Every part of the Hafez Security Glossary, what AI could do for it, and what was decided, in the form set by the handbook's [AI-first products](https://github.com/HafezSecure/hafez-handbook/blob/main/company/ai-first.md#the-ai-opportunity-map) page. HafezSecure builds AI-first: each design starts with what AI can do, driven or assisted, and AI is used wherever it adds value.

This map is internal roadmap: keep it out of public material, and keep client names, personal data and internal addresses out of it. (The repository is public, so this file stays free of anything sensitive by nature.)

## How to fill a row

See the handbook page. Mode is AI-driven (the model works, a person or check approves) or AI-assisted (a person works, the model helps). Decision is Built, Now, Next, Later or Not.

## Map

Last reviewed: 2026-11-04

| Part (user and job) | Pattern | Mode | Value and measure | Data and classification | Main risk | Decision | Link |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A curator drafts a new term's definition and example | Draft | Assisted | Time: a reviewable draft in seconds; measured by share accepted without edit | The English term and public references; Public | A confident but wrong definition slips through | Now | brief §10 |
| A curator proposes candidate Persian translations and their trade-offs | Draft / recommend | Assisted | Quality: surfaces the real options so the preferred one is a choice, not a guess | The term and existing Persian usage; Public | Over-trusting a fluent-sounding but wrong calque | Now | translation-policy.md |
| Finding terms the glossary is missing — the **Academy** is the primary feeder | Extract | Assisted | Coverage: mines Academy lessons first (then website/CTF) for terms not yet in the set | HafezSecure's own public-level corpus; Public | Noise; a person picks the real terms | Now | ADR 0004 |
| Checking the set for duplicates and inconsistent renderings | Check and review | Assisted | Quality: flags two files that mean the same thing, or the same English term rendered two ways | The built dataset; Public | False flags waste review time | Next | — |
| A reader searches the glossary on the website | — (semantic search) | Driven | Reach: meaning-based search finds a term from a paraphrase | The public dataset and the query; Public | A wrong top hit; mitigated by exact-match first | Later (website) | data-model.md (rendering contract) |
| Choosing the preferred translation; marking a term reviewed | — | — | — | — | Authority is the product; a person must own the call | Not (human decision) | AGENTS.md rule 8 |

AI output is never published unreviewed: every term a person reviews before `status: reviewed`. Drafting uses Claude on the founder's subscription, not paid APIs or Fabric.
