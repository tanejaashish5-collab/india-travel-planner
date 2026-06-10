#!/usr/bin/env node
// verify-touched-pages.mjs — post-write rendered-page check (prevention layer 1).
//
// Born 2026-06-10: a 34-row confidence_cards backfill verified the DATA but
// never opened the PAGES — honest-scarcity NULLs crashed the card renderer and
// 14 destination pages served 500s until a founder report. Rule: after any DB
// write that changes rendered pages, run this against every touched page.
//
// Usage:
//   node scripts/verify-touched-pages.mjs --dest katra,tirumala
//   node scripts/verify-touched-pages.mjs --url /en/explore --marker "places,"
//   node scripts/verify-touched-pages.mjs --file touched-urls.txt
//   node --env-file=apps/web/.env.local scripts/verify-touched-pages.mjs --dest katra --revalidate
//
// Flags:
//   --dest a,b,c     destination slugs → checks /en/destination/<slug> + /hi/…
//   --url <p>        path or absolute URL (repeatable, comma-separated ok)
//   --file <f>       newline-separated list of paths/URLs
//   --marker <s>     string that must appear in every checked body
//   --min-bytes <n>  body-size floor (default 20000 — Next error shells are ~10KB)
//   --base <u>       default https://www.nakshiq.com
//   --locales <l>    for --dest expansion (default en,hi)
//   --revalidate     POST /api/admin/revalidate per path first (needs
//                    NEWSLETTER_SEND_SECRET in env) so you check a FRESH render
//
// ISR caveat (the sneaky part of the 2026-06-10 incident): a green check on a
// CACHED page proves nothing about post-write renders — katra only 500'd when
// its cache expired hours later. The AGE column shows seconds since the page
// was rendered; if age predates your write, pass --revalidate or treat the
// result as unproven. The canary-probe cron catches the delayed class ≤30min.
//
// Exit code: 0 all pass, 1 any failure.

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? null : (args[i + 1] ?? null);
};
const has = (name) => args.includes(`--${name}`);
const multi = (name) =>
  args
    .flatMap((a, i) => (a === `--${name}` ? [args[i + 1]] : []))
    .filter(Boolean)
    .flatMap((v) => v.split(","))
    .map((s) => s.trim())
    .filter(Boolean);

const BASE = (flag("base") ?? "https://www.nakshiq.com").replace(/\/$/, "");
const MARKER = flag("marker");
const MIN_BYTES = Number(flag("min-bytes") ?? 20000);
const LOCALES = (flag("locales") ?? "en,hi").split(",").map((s) => s.trim());
const REVALIDATE = has("revalidate");

const paths = [];
for (const slug of multi("dest")) {
  for (const loc of LOCALES) paths.push(`/${loc}/destination/${slug}`);
}
for (const u of multi("url")) paths.push(u);
const file = flag("file");
if (file) {
  const { readFileSync } = await import("node:fs");
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#")) paths.push(t);
  }
}
if (paths.length === 0) {
  console.error("Nothing to check. Use --dest, --url or --file (see header).");
  process.exit(1);
}

const toUrl = (p) => (p.startsWith("http") ? p : `${BASE}${p.startsWith("/") ? "" : "/"}${p}`);
const toPath = (p) => (p.startsWith("http") ? new URL(p).pathname : p);

async function revalidate(path) {
  const secret = (process.env.NEWSLETTER_SEND_SECRET ?? "").trim();
  if (!secret) return "no-secret";
  try {
    const r = await fetch(`${BASE}/api/admin/revalidate?path=${encodeURIComponent(path)}`, {
      method: "POST",
      headers: { authorization: `Bearer ${secret}` },
    });
    return r.ok ? "ok" : `http ${r.status}`;
  } catch (e) {
    return `error ${e?.message ?? e}`;
  }
}

async function check(path) {
  const url = toUrl(path);
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 30000);
    const r = await fetch(url, {
      headers: { "user-agent": "NakshIQ-VerifyTouchedPages/1.0" },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    const body = await r.text();
    const bytes = Buffer.byteLength(body);
    const age = r.headers.get("age") ?? "0";
    const vc = r.headers.get("x-vercel-cache") ?? "";
    const problems = [];
    if (r.status !== 200) problems.push(`status ${r.status}`);
    if (bytes < MIN_BYTES) problems.push(`only ${bytes}B (< ${MIN_BYTES})`);
    if (body.includes("__next_error__")) problems.push("Next error shell");
    if (MARKER && !body.includes(MARKER)) problems.push(`marker "${MARKER}" missing`);
    return { path, status: r.status, bytes, age, vc, problems };
  } catch (e) {
    return { path, status: 0, bytes: 0, age: "-", vc: "-", problems: [`fetch failed: ${e?.message ?? e}`] };
  }
}

if (REVALIDATE) {
  console.log("Revalidating touched paths first…");
  for (const p of paths) {
    const res = await revalidate(toPath(p));
    console.log(`  revalidate ${toPath(p)} → ${res}`);
    if (res === "no-secret") {
      console.log("  (NEWSLETTER_SEND_SECRET not in env — skipping the rest; checks run against possibly-stale cache)");
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 2000));
}

const results = [];
const queue = [...paths];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const p = queue.shift();
      results.push(await check(p));
    }
  }),
);

results.sort((a, b) => paths.indexOf(a.path) - paths.indexOf(b.path));
let failed = 0;
console.log("");
for (const r of results) {
  const ok = r.problems.length === 0;
  if (!ok) failed++;
  const ageNote = Number(r.age) > 0 ? `age=${r.age}s` : "fresh";
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${String(r.status).padEnd(3)}  ${String(r.bytes).padStart(7)}B  ${ageNote.padEnd(10)} ${r.vc.padEnd(10)} ${r.path}${ok ? "" : "  ← " + r.problems.join("; ")}`,
  );
}
console.log(`\n${results.length - failed}/${results.length} passed${failed ? ` — ${failed} FAILED` : ""}`);
if (failed && !REVALIDATE) {
  console.log("Tip: cached pages may predate your write — re-run with --revalidate (needs NEWSLETTER_SEND_SECRET).");
}
process.exit(failed ? 1 : 0);
