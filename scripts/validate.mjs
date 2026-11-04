#!/usr/bin/env node
/**
 * Validate every term file against the data model (docs/architecture/data-model.md) and the
 * schema (schema/term.schema.json). Run with `pnpm run validate`. Exits non-zero on any problem.
 *
 * Exports validateAll() so build.mjs can refuse to build an invalid set.
 * Node 22+, one dependency (yaml).
 */
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readDomains, listTermFiles, parseTermFile, SLUG_RE } from "./lib/terms.mjs";

const KNOWN = new Set([
  "en", "fa", "domains", "status", "reviewed_by", "alternatives",
  "definition_fa", "definition_en", "example_fa", "see_also", "aliases",
  "sources", "added", "updated",
]);
const ALT_KEYS = new Set(["term", "script", "status", "note"]);
const SRC_KEYS = new Set(["title", "url"]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ARABIC = /[يك]/; // Arabic ي / ك — Persian text must use ی (U+06CC) / ک (U+06A9)

const isStr = (x) => typeof x === "string" && x.trim().length > 0;
const isArr = (x) => Array.isArray(x);

export function validateAll() {
  const domains = readDomains();
  const domainKeys = new Set(Object.keys(domains));
  const errors = [];
  const entries = [];
  const slugs = new Map(); // slug -> rel
  const aliasClaims = []; // { alias, rel }

  for (const abs of listTermFiles()) {
    let t;
    try {
      t = parseTermFile(abs);
    } catch (e) {
      errors.push(e.message);
      continue;
    }
    const { rel, slug, domainDir, data } = t;
    const err = (m) => errors.push(`${rel}: ${m}`);

    if (!SLUG_RE.test(slug)) err(`file name "${slug}" is not a valid slug (lowercase letters, digits and single hyphens)`);
    if (slugs.has(slug)) err(`slug "${slug}" is already used by ${slugs.get(slug)}`);
    else slugs.set(slug, rel);

    for (const k of Object.keys(data)) if (!KNOWN.has(k)) err(`unknown field "${k}"`);

    if (!isStr(data.en)) err(`"en" is required and must be a non-empty string`);
    if (!isStr(data.fa)) err(`"fa" is required and must be a non-empty string`);
    if (!isStr(data.definition_fa)) err(`"definition_fa" is required and must be a non-empty string`);

    if (!domainKeys.has(domainDir)) err(`folder "${domainDir}" is not a known domain (see schema/domains.json)`);
    if (!isArr(data.domains) || data.domains.length < 1) {
      err(`"domains" is required and must list at least one domain`);
    } else {
      const seen = new Set();
      data.domains.forEach((d) => {
        if (!domainKeys.has(d)) err(`domain "${d}" is not in schema/domains.json`);
        if (seen.has(d)) err(`domain "${d}" is listed twice`);
        seen.add(d);
      });
      if (domainKeys.has(domainDir) && data.domains[0] !== domainDir)
        err(`the first domain must be the folder ("${domainDir}"), but it is "${data.domains[0]}"`);
    }

    if (data.status !== "draft" && data.status !== "reviewed") err(`"status" must be "draft" or "reviewed"`);
    if (data.status === "reviewed" && !isStr(data.reviewed_by)) err(`a reviewed term must name a "reviewed_by"`);
    if (data.status === "draft" && data.reviewed_by != null && String(data.reviewed_by).trim() !== "")
      err(`a draft term must not set "reviewed_by"`);

    if (data.alternatives != null) {
      if (!isArr(data.alternatives)) err(`"alternatives" must be a list`);
      else data.alternatives.forEach((a, i) => {
        const at = `alternatives[${i}]`;
        if (a === null || typeof a !== "object" || Array.isArray(a)) { err(`${at} must be a mapping`); return; }
        for (const k of Object.keys(a)) if (!ALT_KEYS.has(k)) err(`${at} has unknown field "${k}"`);
        if (!isStr(a.term)) err(`${at}.term is required`);
        if (!["accepted", "discouraged", "deprecated"].includes(a.status)) err(`${at}.status must be accepted, discouraged or deprecated`);
        if (a.script != null && a.script !== "fa" && a.script !== "latin") err(`${at}.script must be "fa" or "latin"`);
        if (a.script !== "latin" && isStr(a.term) && ARABIC.test(a.term)) err(`${at}.term uses an Arabic ي/ك; use Persian ی/ک`);
        if (a.note != null && ARABIC.test(String(a.note))) err(`${at}.note uses an Arabic ي/ك; use Persian ی/ک`);
      });
    }

    if (data.definition_en != null && !isStr(data.definition_en)) err(`"definition_en" must be a non-empty string when present`);
    if (data.example_fa != null && !isStr(data.example_fa)) err(`"example_fa" must be a non-empty string when present`);

    for (const field of ["see_also", "aliases"]) {
      if (data[field] == null) continue;
      if (!isArr(data[field])) { err(`"${field}" must be a list of slugs`); continue; }
      data[field].forEach((s) => { if (!SLUG_RE.test(String(s))) err(`"${field}" entry "${s}" is not a valid slug`); });
    }
    if (isArr(data.aliases)) data.aliases.forEach((a) => aliasClaims.push({ alias: String(a), rel }));

    if (data.sources != null) {
      if (!isArr(data.sources)) err(`"sources" must be a list`);
      else data.sources.forEach((s, i) => {
        const at = `sources[${i}]`;
        if (s === null || typeof s !== "object" || Array.isArray(s)) { err(`${at} must be a mapping`); return; }
        for (const k of Object.keys(s)) if (!SRC_KEYS.has(k)) err(`${at} has unknown field "${k}"`);
        if (!isStr(s.title)) err(`${at}.title is required`);
        if (!isStr(s.url) || !/^https:\/\//.test(s.url)) err(`${at}.url must be an https URL`);
      });
    }

    for (const field of ["added", "updated"]) {
      if (data[field] != null && !DATE_RE.test(String(data[field]))) err(`"${field}" must be a date YYYY-MM-DD`);
    }

    for (const [field, val] of [["fa", data.fa], ["definition_fa", data.definition_fa], ["example_fa", data.example_fa]]) {
      if (isStr(val) && ARABIC.test(val)) err(`"${field}" uses an Arabic ي/ك; use Persian ی/ک (U+06CC / U+06A9)`);
    }

    entries.push({ ...t });
  }

  // Cross-file checks.
  for (const { alias, rel } of aliasClaims) {
    if (slugs.has(alias)) errors.push(`${rel}: alias "${alias}" collides with an existing term slug`);
  }
  const aliasSeen = new Map();
  for (const { alias, rel } of aliasClaims) {
    if (aliasSeen.has(alias)) errors.push(`${rel}: alias "${alias}" is also claimed by ${aliasSeen.get(alias)}`);
    else aliasSeen.set(alias, rel);
  }
  for (const { rel, data } of entries) {
    if (isArr(data.see_also)) data.see_also.forEach((s) => {
      if (!slugs.has(String(s))) errors.push(`${rel}: see_also "${s}" points at a term that does not exist`);
    });
  }

  return { entries, errors };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const { entries, errors } = validateAll();
  if (errors.length) {
    console.error(errors.join("\n"));
    console.error(`\nvalidate: ${errors.length} problem${errors.length === 1 ? "" : "s"} in ${entries.length} term file(s) read`);
    process.exit(1);
  }
  console.log(`validate: ${entries.length} term file(s), no problems`);
}
