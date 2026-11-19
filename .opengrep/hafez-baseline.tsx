// Test cases for hafez-baseline.yml (run by `opengrep test .opengrep`). Never imported or built:
// a line marked ruleid must be matched by the rule it names, a line marked ok must not.
import { exec, execFile } from "node:child_process";
import crypto from "node:crypto";

declare const el: HTMLElement;
declare const db: any;
declare const prisma: any;
declare const jwt: any;
declare const userInput: string;
declare const id: string;

// ruleid: hafez-raw-html-sink
el.innerHTML = userInput;
// ok: hafez-raw-html-sink
el.innerHTML = "";
// ruleid: hafez-raw-html-sink
el.insertAdjacentHTML("beforeend", userInput);
// ok: hafez-raw-html-sink
el.textContent = userInput;

// ruleid: hafez-dynamic-code
eval(userInput);
// ruleid: hafez-dynamic-code
const fn = new Function("a", userInput);

// ruleid: hafez-sql-from-string
db.query(`SELECT * FROM users WHERE id = ${id}`);
// ruleid: hafez-sql-from-string
db.query("SELECT * FROM users WHERE id = " + id);
// ruleid: hafez-sql-from-string
prisma.$queryRawUnsafe(userInput);
// ok: hafez-sql-from-string
db.query("SELECT * FROM users WHERE id = $1", [id]);
// ok: hafez-sql-from-string
prisma.$queryRaw`SELECT * FROM users WHERE id = ${id}`;

// ruleid: hafez-shell-string
exec(`git log ${userInput}`);
// ok: hafez-shell-string
exec("git status");
// ok: hafez-shell-string
execFile("git", ["log", userInput]);

const agent = {
  // ruleid: hafez-tls-verification-off
  options: { rejectUnauthorized: false },
};
// ruleid: hafez-tls-verification-off
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// ruleid: hafez-jwt-decode-without-verify
const claims = jwt.decode(userInput);

declare const sessionToken: string;
declare const providedToken: string;
// ruleid: hafez-secret-equality
if (providedToken === sessionToken) {
}
// ok: hafez-secret-equality
if (providedToken === undefined) {
}
// ok: hafez-secret-equality
if (typeof providedToken === "string") {
}

declare const req: { headers: Record<string, string> };
// ruleid: hafez-forwarded-for-identity
const ip = req.headers["x-forwarded-for"];

// ruleid: hafez-weak-hash
crypto.createHash("md5");
// ok: hafez-weak-hash
crypto.createHash("sha256");

// ruleid: hafez-insecure-random-secret
const resetToken = Math.random().toString(36);
// ok: hafez-insecure-random-secret
const jitter = Math.random() * 100;

// ruleid: hafez-csp-unsafe-source
const csp = "script-src 'self' 'unsafe-inline'";

// ok: hafez-raw-html-sink
const a = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(x) }} />;
// ruleid: hafez-jsonld-unescaped
const b = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />;
// ruleid: hafez-raw-html-sink
const c = <div dangerouslySetInnerHTML={{ __html: html }} />;
declare const t: any;
declare const admin: any;
declare const pg: any;
// ok: hafez-sql-from-string
t.raw(`${userInput}.details`);
// ok: hafez-sql-from-string
admin.query(`CREATE DATABASE ${pg.escapeIdentifier(userInput)}`);
