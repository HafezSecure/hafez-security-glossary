/**
 * Shared loading for the Hafez Security Glossary tooling: find the term files, read the domain
 * vocabulary, and split a term file into its front matter and body. Used by validate.mjs and
 * build.mjs. Node 22+, one dependency (yaml).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

export const ROOT = resolve(fileURLToPath(new URL("../../", import.meta.url)));
export const TERMS_DIR = join(ROOT, "terms");
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** The domain vocabulary, `{ key: { fa, en } }`, from schema/domains.json. */
export function readDomains() {
  return JSON.parse(readFileSync(join(ROOT, "schema", "domains.json"), "utf8"));
}

/** Every term file as an absolute path, sorted. */
export function listTermFiles() {
  const out = [];
  if (!existsSync(TERMS_DIR)) return out;
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) walk(abs);
      else out.push(abs);
    }
  };
  walk(TERMS_DIR);
  return out.sort();
}

/**
 * Split a term file into `{ slug, domainDir, rel, data, body }`.
 * Throws with a readable message when the front matter is missing or not valid YAML.
 */
export function parseTermFile(abs) {
  const rel = relative(ROOT, abs);
  if (!abs.endsWith(".md")) throw new Error(`${rel}: term files must end in .md`);
  const slug = basename(abs, ".md");
  const domainDir = basename(dirname(abs));
  const raw = readFileSync(abs, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n([\s\S]*))?$/);
  if (!m) throw new Error(`${rel}: missing YAML front matter (a file must start with a --- ... --- block)`);
  let data;
  try {
    data = parseYaml(m[1]);
  } catch (e) {
    throw new Error(`${rel}: front matter is not valid YAML — ${e.message}`);
  }
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${rel}: front matter must be a mapping of fields`);
  }
  return { abs, rel, slug, domainDir, data, body: (m[2] ?? "").trim() };
}
