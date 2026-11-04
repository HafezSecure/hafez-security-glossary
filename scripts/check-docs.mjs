#!/usr/bin/env node
/**
 * Docs consistency check for {{PROJECT_NAME}}: `pnpm check:docs`. Zero dependencies, Node 22+.
 *
 * It fails when the documents and the code disagree in a way a machine can see:
 *
 *   links     a relative Markdown link points to a file that does not exist
 *   adr       a decision record has no valid status line, two records share a number, or the
 *             index (docs/decisions/README.md) and the directory disagree
 *   env       the code reads an environment variable that docs/configuration.md does not list,
 *             or one that .env.example lacks
 *   secrets   .env.example gives a value to a variable whose name looks like a secret
 *
 * Extend it as the project grows (generated documents regenerated and compared, for example),
 * and keep it dependency-free so it runs on an offline machine.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] ?? ".");
// .opengrep holds the static-analysis rules' test cases: deliberately bad code, never run.
const SKIP = new Set([".git", "node_modules", "dist", "build", ".next", "coverage", ".opengrep"]);
const errors = [];
const fail = (file, msg) => errors.push(`${relative(root, file) || file}: ${msg}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else out.push(abs);
  }
  return out;
}
const files = walk(root);
const read = (f) => readFileSync(f, "utf8");

// links: relative Markdown links, ignoring code blocks, URLs and pure anchors.
for (const file of files.filter((f) => extname(f) === ".md")) {
  const text = read(file).replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const [, target] of text.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
    if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
    const path = decodeURIComponent(target.split("#")[0]);
    if (path && !existsSync(resolve(dirname(file), path))) fail(file, `link to ${target} does not resolve`);
  }
}

// adr: status lines, unique numbers, index matches the directory.
const adrDir = join(root, "docs", "decisions");
if (existsSync(adrDir)) {
  const records = readdirSync(adrDir).filter((f) => /^\d{4}-.+\.md$/.test(f));
  const seen = new Map();
  for (const name of records) {
    const num = name.slice(0, 4);
    if (seen.has(num)) fail(join(adrDir, name), `decision number ${num} is also used by ${seen.get(num)}`);
    seen.set(num, name);
    const status = read(join(adrDir, name)).match(/^\*\*Status:\*\*\s*(.+)$/m);
    if (!status || !/^(proposed|accepted|rejected|superseded by \d{4})\b/i.test(status[1].trim()))
      fail(join(adrDir, name), "needs a status line: **Status:** proposed, accepted, rejected or superseded by NNNN");
  }
  const indexFile = join(adrDir, "README.md");
  const index = existsSync(indexFile) ? read(indexFile) : "";
  for (const num of seen.keys()) if (!index.includes(num)) fail(indexFile, `the index does not list decision ${num}`);
  // A row may reserve a number for an open pull request: "| 0007 | Reserved — claimed by draft PR #12 |".
  for (const [, num] of index.matchAll(/^\|\s*\[?(\d{4})\]?(?:\([^)]*\))?\s*\|(?!\s*Reserved)/gim))
    if (!seen.has(num)) fail(indexFile, `the index lists decision ${num}, which has no file (reserve it explicitly if a pull request holds it)`);
}

// env: variables the code reads are documented and in .env.example; secrets are empty there.
const code = files.filter((f) => /\.(?:[cm]?[jt]sx?)$/.test(f) && !/(?:^|\/)(?:test|tests|__tests__)\//.test(relative(root, f)) && !/\.test\.[cm]?[jt]sx?$/.test(f) && !f.endsWith("check-docs.mjs"));
const read_vars = new Set();
for (const f of code) for (const [, dotted, bracketed] of read(f).matchAll(/process\.env(?:\.([A-Z][A-Z0-9_]*)|\[\s*["']([A-Z][A-Z0-9_]*)["']\s*\])/g)) read_vars.add(dotted ?? bracketed);
const IGNORED = new Set(["NODE_ENV", "CI", "PORT"]);
const configDoc = join(root, "docs", "configuration.md");
const envExample = join(root, ".env.example");
const documented = existsSync(configDoc) ? read(configDoc) : "";
const example = existsSync(envExample) ? read(envExample) : "";
// A value is what precedes an inline comment: `NAME=   # what it does` is an empty value.
const exampleVars = new Map([...example.matchAll(/^\s*([A-Z][A-Z0-9_]*)\s*=(.*)$/gm)].map(([, k, v]) => [k, v.replace(/(^|\s)#.*$/, "").trim()]));
for (const v of [...read_vars].sort()) {
  if (IGNORED.has(v)) continue;
  if (!documented.includes(v)) fail(configDoc, `the code reads ${v}, which this document does not list`);
  if (!exampleVars.has(v)) fail(envExample, `the code reads ${v}, which .env.example does not list`);
}
for (const [k, v] of exampleVars) {
  if (/(SECRET|TOKEN|PASSWORD|PASSWD|PRIVATE|API_KEY|_KEY$)/.test(k) && v !== "" && v !== '""' && v !== "''")
    fail(envExample, `${k} looks like a secret and must be empty here`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`docs check: ${errors.length} problem${errors.length === 1 ? "" : "s"}`);
  process.exit(1);
}
console.log(`docs check: ${files.filter((f) => extname(f) === ".md").length} documents, ${read_vars.size} environment variables read, no problems`);
