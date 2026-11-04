# Translation policy

Persian security terminology is contested, so the glossary is opinionated by design: **one preferred Persian rendering per term, with the alternatives recorded and flagged.** This page says how the preferred one is chosen and how the alternatives are marked. It is the part of the project that makes a term authoritative rather than just present.

## Choosing the preferred rendering

Work down this order and stop at the first that gives a clear, correct Persian term:

1. **An established standard or widely-accepted Persian term.** If a national standards body, a respected textbook or settled community usage already has a term, use it.
2. **Consistent existing HafezSecure usage.** If the Academy, the website or the company's reports already use a term consistently and well, keep it — the glossary should make the house vocabulary coherent.
3. **A faithful calque (loan-translation)** that is clear to a practitioner, e.g. «ارتقای سطح دسترسی» for *privilege escalation*.
4. **A short descriptive phrase**, when no single word carries the meaning.
5. **Transliteration**, only when nothing else communicates, or when the Latin term *is* what Persian practitioners actually say.

Guiding principles:

- **Meaning over sound.** Prefer a Persian term that conveys the concept to a transliteration that merely spells the English, unless the transliteration is genuinely the term in use.
- **Keep Latin where Latin is the term.** Acronyms, protocol names and product names stay in Latin script (set `script: latin` on the alternative, and the `en` headword carries them). Do not force a Persian spelling of `TLS` or `SQL`.
- **Serve the reader, not purity.** The goal is communication among Persian-speaking security people, not maximal Persianisation.

## Flagging alternatives

Record the renderings a reader will actually meet, each with a status:

| Status | Meaning |
| --- | --- |
| `accepted` | A valid alternative in real use; not preferred here, but not wrong. |
| `discouraged` | Understood, but imprecise, clumsy or likely to mislead — steer away from it. |
| `deprecated` | Wrong or outdated; recorded only so a reader who meets it is sent to the right term. |

A common transliteration that people use is usually `accepted` (e.g. «هَش» beside «درهم‌ساز»); a literal mistranslation is `discouraged` or `deprecated`.

## Persian writing conventions

Follow the handbook's [voice and tone](https://github.com/HafezSecure/hafez-handbook/blob/main/brand/voice-and-tone.md#persian-writing-conventions):

- Persian letters ‪ی‬ (U+06CC) and ‪ک‬ (U+06A9), never the Arabic ‪ي‬/‪ك‬ (the validator enforces this).
- «» for quotation; no em/en dashes in Persian prose.
- نیم‌فاصله (ZWNJ) where it belongs (e.g. «اسکریپت‌نویسی»).
- Persian digits in Persian prose; do not end a Persian sentence with a Latin word or identifier.

## Sources

Prefer primary, citable references for the English definition and, where possible, the term: OWASP, NIST, MITRE ATT&CK, RFCs, vendor security documentation. Put them in `sources`.

## The review

A term is a **proposal** until a HafezSecure maintainer reviews it and sets `status: reviewed` with their name in `reviewed_by`. Review checks the preferred rendering against this policy, the definitions for accuracy, the Persian for correctness, and the sources. Disagreement is welcome: open an issue, and the recorded alternatives capture the dissent even when a single preferred form is chosen.
