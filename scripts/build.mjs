#!/usr/bin/env node
/**
 * Build the distribution datasets from the term files into dist/. Run with `pnpm run build`.
 * Refuses to build an invalid set: it runs the full validation first. Node 22+.
 *
 * Outputs (see docs/architecture/data-model.md):
 *   dist/glossary.json          the full dataset
 *   dist/index.json             a compact search index
 *   dist/by-domain/<key>.json   the terms of one domain
 *   dist/domains.json           the vocabulary with counts
 *   dist/meta.json              version, timestamp and total count
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, readDomains } from "./lib/terms.mjs";
import { validateAll } from "./validate.mjs";

const { entries, errors } = validateAll();
if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\nbuild: refusing to build — ${errors.length} validation problem(s). Run \`pnpm run validate\`.`);
  process.exit(1);
}

const version = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;
const domains = readDomains();

const SNIPPET = (s) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= 140 ? t : t.slice(0, 139).replace(/\s+\S*$/, "") + "…";
};

const terms = entries
  .map(({ slug, data, body }) => {
    const out = { slug };
    for (const k of ["en", "fa", "domains", "status", "reviewed_by", "alternatives",
      "definition_fa", "definition_en", "example_fa", "see_also", "aliases", "sources", "added", "updated"]) {
      if (data[k] != null) out[k] = data[k];
    }
    if (body) out.notes = body;
    return out;
  })
  .sort((a, b) => a.en.localeCompare(b.en, "en"));

const meta = { name: "hafez-security-glossary", version, generated: new Date().toISOString(), count: terms.length };

const index = terms.map((t) => ({
  slug: t.slug, en: t.en, fa: t.fa, domains: t.domains, status: t.status, snippet: SNIPPET(t.definition_fa),
}));

const dist = join(ROOT, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "by-domain"), { recursive: true });

const write = (rel, obj) => writeFileSync(join(dist, rel), JSON.stringify(obj, null, 2) + "\n");

write("glossary.json", { ...meta, terms });
write("index.json", { ...meta, terms: index });
write("meta.json", meta);

const domainsOut = {};
for (const key of Object.keys(domains)) {
  const forDomain = terms.filter((t) => t.domains.includes(key));
  domainsOut[key] = { ...domains[key], count: forDomain.length };
  write(join("by-domain", `${key}.json`), { domain: key, ...domains[key], count: forDomain.length, terms: forDomain });
}
write("domains.json", { version, domains: domainsOut });

console.log(`build: ${terms.length} term(s) → dist/ (version ${version})`);
for (const key of Object.keys(domains)) console.log(`  ${key}: ${domainsOut[key].count}`);
