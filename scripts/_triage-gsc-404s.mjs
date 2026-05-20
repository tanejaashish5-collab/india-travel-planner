#!/usr/bin/env node
/* eslint-disable no-console */
// Triage GSC's "Not found (404)" validation list.
//
// Reads URLs (one per line, or a GSC Table.csv with a header row), classifies
// each into a recommended action, and writes a markdown triage report.
//
// Inputs (first that exists wins):
//   - scripts/_triage-gsc-404s.urls.txt  (one URL per line, # comments OK)
//   - data/research/gsc-404-validation-urls.txt
//   - argv -- one URL per arg: node scripts/_triage-gsc-404s.mjs https://... https://...
//
// Output:
//   - stdout: triage table
//   - data/research/gsc-404-triage-{YYYY-MM-DD}.md  (when --write)
//
// Action buckets (per URL):
//   ✅ LIVE-OK       — URL exists in current sitemap; false 404 (revalidate)
//   ↪️  REDIRECT-MAP — middleware already redirects this URL (revalidate)
//   🔁 NEEDS-REDIRECT— old slug, real destination intent → add to middleware
//   ⛔ TYPO-OR-GONE  — garbage/scrape/typo → keep as 404, mark "Validate fix"
//                       (so GSC stops tracking) or use Removals tool
//   ❓ UNKNOWN       — needs human eyes

import path from "node:path";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const shouldWrite = args.includes("--write");

// ── Load reference data ─────────────────────────────────────────
const slugsPath = path.join(ROOT, "apps/web/data/known-destination-slugs.json");
const knownSlugs = new Set(JSON.parse(readFileSync(slugsPath, "utf8")).slugs);

const STATE_SLUGS = new Set([
  "himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh", "rajasthan",
  "punjab", "uttar-pradesh", "sikkim", "west-bengal", "madhya-pradesh",
  "delhi", "chandigarh", "arunachal-pradesh", "assam", "bihar", "chhattisgarh",
  "haryana", "jharkhand", "manipur", "meghalaya", "mizoram", "nagaland",
  "tripura", "gujarat", "maharashtra", "goa", "karnataka", "kerala",
  "tamil-nadu", "andhra-pradesh", "telangana", "odisha", "andaman-nicobar",
  "lakshadweep", "puducherry", "daman-diu",
]);

const STATE_AND_DESTINATION = new Set(["delhi", "chandigarh", "puducherry"]);

const VALID_MONTHS = new Set([
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
]);

// Middleware-handled patterns (already 301-redirected → revalidation will pass).
// Mirror the rules in apps/web/src/middleware.ts so the classifier knows what's
// fixed without an HTTP fetch.
const middlewareRules = [
  { name: "skip-list-index",  test: (u) => /^\/(en|hi)\/skip-list\/?$/.test(u),
    target: "/{locale}/tourist-traps" },
  { name: "kasol-parvati-vs", test: (u) => /^\/(en|hi)\/vs\/kasol-parvati-valley-vs-manikaran\/?$/.test(u),
    target: "/{locale}/vs/kasol-vs-manikaran" },
  { name: "regions-index",    test: (u) => /^\/(en|hi)\/regions\/?$/.test(u),
    target: "/{locale}/states" },
  { name: "region-northeast", test: (u) => /^\/(en|hi)\/region\/northeast(?:\/.*)?$/.test(u),
    target: "/{locale}/india/northeast" },
  { name: "region-to-state",  test: (u) => {
      const m = u.match(/^\/(en|hi)\/region\/([^/]+)\/?$/);
      return m && STATE_SLUGS.has(m[2]);
    }, target: "/{locale}/state/{state}" },
  { name: "dest-state-redirect", test: (u) => {
      const m = u.match(/^\/(en|hi)\/destination\/([^/]+)\/?$/);
      return m && STATE_SLUGS.has(m[2]) && !STATE_AND_DESTINATION.has(m[2]);
    }, target: "/{locale}/state/{state}" },
  { name: "bare-dest-state-redirect", test: (u) => {
      const m = u.match(/^\/destination\/([^/]+)\/?$/);
      return m && STATE_SLUGS.has(m[1]) && !STATE_AND_DESTINATION.has(m[1]);
    }, target: "/en/state/{state}" },
];

// ── Helpers ──────────────────────────────────────────────────────
function parsePath(rawUrl) {
  try {
    const u = new URL(rawUrl);
    return u.pathname.replace(/\/+$/, "") || "/";
  } catch {
    // Could be a path-only entry
    return rawUrl.startsWith("/") ? rawUrl.replace(/\/+$/, "") || "/" : null;
  }
}

function looksLikeGarbage(p) {
  // Slug heuristics: doubled hyphens, query-string fragments left in path,
  // random char strings, dev-only prefixes, .php/.html extensions, tracking
  // params.
  if (/\.\w{2,5}$/.test(p)) return true;                  // .php / .html / .axd / .json
  if (/--/.test(p)) return true;                          // double hyphen
  if (/[^a-z0-9\-/.]/i.test(p) && !/^\/(en|hi)\//.test(p)) return true; // mixed case / underscores outside locale prefix
  if (/(wp-admin|wp-login|wordpress|\/cgi-bin|\/feed)/i.test(p)) return true;
  if (/^\/_next|\/api\/_|\/admin/i.test(p)) return true;
  if (p.length > 120) return true;
  return false;
}

function classify(rawUrl) {
  const p = parsePath(rawUrl);
  if (!p) return { bucket: "❓ UNKNOWN", reason: "Could not parse URL", action: "Inspect manually" };

  // Strip query/fragment from path (Google sometimes drops them but cache may keep)
  const pPure = p.split("?")[0].split("#")[0];

  // 1) Direct live page?
  // dest×month
  const destMonth = pPure.match(/^\/(en|hi)\/destination\/([^/]+)\/([^/]+)\/?$/);
  if (destMonth) {
    const [, , slug, month] = destMonth;
    if (knownSlugs.has(slug) && VALID_MONTHS.has(month)) {
      return { bucket: "✅ LIVE-OK", reason: `Known destination + valid month — page exists at ${pPure}`, action: "Re-validate in GSC; if still 404, check sitemap inclusion" };
    }
    if (knownSlugs.has(slug) && !VALID_MONTHS.has(month)) {
      return { bucket: "⛔ TYPO-OR-GONE", reason: `Known dest "${slug}" but invalid month "${month}" — middleware 404s by design`, action: 'Use GSC "Validate Fix" — the 404 is intentional; URL will fall out' };
    }
    if (!knownSlugs.has(slug)) {
      return { bucket: "❓ UNKNOWN", reason: `Slug "${slug}" not in known-destination-slugs.json`, action: `Check if "${slug}" is a renamed destination. If yes, add middleware redirect; if no, ⛔ TYPO-OR-GONE` };
    }
  }

  // dest top-level
  const destTop = pPure.match(/^\/(en|hi)\/destination\/([^/]+)\/?$/);
  if (destTop) {
    const [, , slug] = destTop;
    if (knownSlugs.has(slug)) {
      return { bucket: "✅ LIVE-OK", reason: `Known destination — page exists`, action: "Re-validate in GSC" };
    }
    if (STATE_SLUGS.has(slug) && !STATE_AND_DESTINATION.has(slug)) {
      return { bucket: "↪️ REDIRECT-MAP", reason: `State slug — middleware 301s to /state/${slug}`, action: "Re-validate; if still 404 in GSC, the redirect needs a header sniff (Vercel edge cache?)" };
    }
    return { bucket: "❓ UNKNOWN", reason: `Slug "${slug}" not in known slugs, not in STATE_MAP`, action: `Decide: renamed dest → add middleware redirect; garbage → ⛔` };
  }

  // 2) Check middleware-handled patterns
  for (const rule of middlewareRules) {
    if (rule.test(pPure)) {
      return { bucket: "↪️ REDIRECT-MAP", reason: `Middleware rule "${rule.name}" → ${rule.target}`, action: "Re-validate in GSC (redirect already live; possibly cached as 404 by GSC)" };
    }
  }

  // 3) /state/{slug} → must be a known state
  const stateTop = pPure.match(/^\/(en|hi)\/state\/([^/]+)\/?$/);
  if (stateTop && STATE_SLUGS.has(stateTop[2])) {
    return { bucket: "✅ LIVE-OK", reason: `Valid state page`, action: "Re-validate" };
  }
  if (stateTop && !STATE_SLUGS.has(stateTop[2])) {
    return { bucket: "❓ UNKNOWN", reason: `/state/${stateTop[2]} — not a known state`, action: "Decide: typo (⛔) or renamed (redirect)" };
  }

  // 4) Common static surfaces — assume live if path matches our app's known prefixes
  if (/^\/(en|hi)\/(explore|collections|routes|treks|festivals|stays|camping|blog|guide|plan|trip|saved|membership|about|methodology|newsletter|press|transparency|where-to-go|with-kids|family|for|build-route|compare|cost-index|permits|risk-quiz|gap-year|arrival|vs|india-vs|states|india|region|destination|sos|nakshiq-100|tourist-traps|hidden-gems|superlatives|corrections|editorial-policy|why-we-say-no-data|ask|social|more)(\/.*)?$/.test(pPure)) {
    return { bucket: "❓ UNKNOWN", reason: `Looks like a real app path but I can't validate without a fetch`, action: "Curl the URL — if 200, ✅ revalidate. If 404, identify the canonical path + add redirect." };
  }

  // 5) Garbage / scraped
  if (looksLikeGarbage(pPure)) {
    return { bucket: "⛔ TYPO-OR-GONE", reason: "Looks like scraped/typo/dev-only URL", action: "Leave as 404. Click \"Validate Fix\" in GSC so it stops tracking. Optionally use Removals tool." };
  }

  return { bucket: "❓ UNKNOWN", reason: "Could not classify", action: "Inspect manually" };
}

// ── Load input URLs ─────────────────────────────────────────────
function loadUrls() {
  const argUrls = args.filter((a) => a.startsWith("http") || a.startsWith("/"));
  if (argUrls.length > 0) return argUrls;

  const candidatePaths = [
    path.join(ROOT, "scripts/_triage-gsc-404s.urls.txt"),
    path.join(ROOT, "data/research/gsc-404-validation-urls.txt"),
  ];
  // Auto-discover CSV exports
  candidatePaths.push(path.join(ROOT, "GSC non indexing"));

  for (const p of candidatePaths) {
    if (!existsSync(p)) continue;
    if (p.endsWith(".txt")) {
      const lines = readFileSync(p, "utf8").split(/\r?\n/);
      const urls = lines.map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
      if (urls.length > 0) return urls;
    }
  }
  return [];
}

const urls = loadUrls();

if (urls.length === 0) {
  console.error(`
No URLs to triage.

Provide them ONE of these ways:
  1. Paste into:  scripts/_triage-gsc-404s.urls.txt    (one URL or path per line)
  2. Or save to:  data/research/gsc-404-validation-urls.txt
  3. Or argv:     node scripts/_triage-gsc-404s.mjs https://nakshiq.com/foo /en/bar ...

Export from GSC: search.google.com/search-console → Pages →
  "Why pages aren't indexed" → click "Not found (404)" → click "Export" (top right)
  → "Table.csv" → save the URL column into one of the paths above.
`);
  process.exit(1);
}

// ── Classify + report ───────────────────────────────────────────
const results = urls.map((u) => ({ url: u, ...classify(u) }));

const buckets = new Map();
for (const r of results) {
  if (!buckets.has(r.bucket)) buckets.set(r.bucket, []);
  buckets.get(r.bucket).push(r);
}

const today = new Date().toISOString().slice(0, 10);
const out = [];
const log = (s = "") => out.push(s);

log(`# GSC 404 Triage — ${today}\n`);
log(`**Input:** ${urls.length} URLs\n`);
log(`## Summary\n`);
log(`| Bucket | Count | Action |`);
log(`|---|---:|---|`);
const order = ["✅ LIVE-OK", "↪️ REDIRECT-MAP", "🔁 NEEDS-REDIRECT", "⛔ TYPO-OR-GONE", "❓ UNKNOWN"];
const actionByBucket = {
  "✅ LIVE-OK": 'Click "Validate Fix" in GSC',
  "↪️ REDIRECT-MAP": 'Click "Validate Fix" in GSC (redirect already live)',
  "🔁 NEEDS-REDIRECT": "Add to middleware.ts THEN Validate Fix",
  "⛔ TYPO-OR-GONE": 'Validate Fix (let it fall out) OR use Removals tool',
  "❓ UNKNOWN": "Inspect manually (curl URL + decide)",
};
for (const b of order) {
  const rows = buckets.get(b) ?? [];
  if (rows.length > 0) log(`| ${b} | ${rows.length} | ${actionByBucket[b]} |`);
}
log();

log(`## Per-URL triage\n`);
for (const b of order) {
  const rows = buckets.get(b) ?? [];
  if (rows.length === 0) continue;
  log(`### ${b} (${rows.length})\n`);
  log(`| URL | Reason | Action |`);
  log(`|---|---|---|`);
  for (const r of rows) {
    const urlDisplay = r.url.length > 70 ? r.url.slice(0, 67) + "..." : r.url;
    log(`| \`${urlDisplay}\` | ${r.reason} | ${r.action} |`);
  }
  log();
}

log(`---\n_Generated ${new Date().toISOString()} by \`node scripts/_triage-gsc-404s.mjs\`._`);

const output = out.join("\n");

if (shouldWrite) {
  const outDir = path.join(ROOT, "data", "research");
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `gsc-404-triage-${today}.md`);
  writeFileSync(outPath, output);
  console.log(`→ wrote ${outPath}`);
  console.log();
}
console.log(output);
