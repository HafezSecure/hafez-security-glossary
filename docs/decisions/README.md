# Decision records

Short records of decisions that are expensive to reverse: stack, tenancy model, runtime target, security architecture, public contracts. One file per decision, numbered.

The status column is the point of this index. A superseded record stays, and points at the record that replaced it, so the reasoning survives without being mistaken for the current design.

| # | Decision | Status |
| --- | --- | --- |
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions, and follow the HafezSecure handbook as the baseline | accepted |
| [0002](0002-public-repository-and-open-licence.md) | Publish the glossary as a public repository under an open licence | accepted |
| [0003](0003-data-architecture-one-file-per-term.md) | One file per term, built into versioned datasets a consumer reads | accepted |
| [0004](0004-academy-primary-term-feeder.md) | The HafezSecure Academy is the primary feeder of terms | accepted |

## Writing one

1. Take the next free number on `main` **and** in the open pull requests. Numbers start at `0001` and are never reused. Reserve a number with a row here if the pull request will stay open for more than a day.
2. Copy the shape of [0001](0001-record-architecture-decisions.md), or the handbook's [ADR template](https://github.com/HafezSecure/hafez-handbook/blob/main/templates/adr.md), into `docs/decisions/NNNN-kebab-title.md`.
3. Write the title as the decision, stated as a sentence.
4. Set the status: `proposed`, `accepted`, `rejected`, or `superseded by NNNN`.
5. Fill in Context, Decision, Consequences and, where there were real options, Alternatives considered. Keep it short.
6. Add a row to the table above in the same commit.

To supersede a decision, write the new record, then edit the old record's status to `superseded by NNNN` with a note of what changed, and update both rows here. Never delete a record.
