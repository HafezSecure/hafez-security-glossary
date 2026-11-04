# 0001 — Record architecture decisions, and follow the HafezSecure handbook as the baseline

**Status:** accepted

**Date:** 2026-11-04

**Decided by:** Founder

## Context

The Hafez Security Glossary starts from the HafezSecure new-project template. Much of the work will be done by AI coding agents, often several at once, and people and agents will join later without having been present when its shape was decided. Without a written record, a decision that is expensive to reverse looks arbitrary, gets reopened, or is quietly contradicted by a later change.

HafezSecure keeps company-wide rules in its handbook: the default stack, repository standards, git workflow, CI gates, hosting and deployment, the security baseline, policies and the design system. A project that re-decides each of these from scratch drifts from the other products and loses the controls they already enforce.

## Decision

1. Record every decision that is expensive to reverse as a short decision record in `docs/decisions/NNNN-kebab-title.md`, with a status line, Context, Decision, Consequences and, where there were real options, Alternatives considered. [The index](README.md) lists every record with its status. Records are never deleted: a changed decision is superseded by a new record.
2. Follow the [HafezSecure handbook](https://github.com/HafezSecure/hafez-handbook/blob/main/README.md) as this project's baseline. Where this repository needs to deviate from an Adopted or Observed handbook rule, record the deviation and its reason as a decision record before writing the code that depends on it.
3. Where a rule in this repository is stricter than the handbook, the repository rule applies here. Where it is looser, the handbook applies.

## Consequences

- Newcomers and agents can find why the project has its shape, and which decisions still stand.
- The project inherits working gates and conventions instead of rebuilding them.
- Writing a record costs a few minutes per significant decision, and superseding one means editing two records and the index in the same commit.
- When the handbook changes a rule, this project either adopts the change or records why it does not.

## Alternatives considered

- **No decision records, rely on commit messages and pull requests.** Rejected: the reasoning is scattered across history and the current status of a decision cannot be seen at a glance.
- **A single decisions document.** Rejected for new projects: supersession and status are harder to track, and the handbook sets one file per decision as the standard.
- **Choose tools and rules per project.** Rejected: it discards the controls already proven in other HafezSecure products and makes moving between projects harder.
