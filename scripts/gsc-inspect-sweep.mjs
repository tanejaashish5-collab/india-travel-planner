#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/gsc-inspect-sweep.mjs — automates the two manual GSC rituals via
// the URL Inspection API (replaces the founder's dashboard reads).
//
// ┌─────────────────────────────────────────────────────────────────────┐
// │ WEEKLY CADENCE: run Mode A every Monday as part of the GSC audit    │
// │ session (same cadence the old "Coverage paste" had):                │
// │   node scripts/gsc-inspect-sweep.mjs --patch                        │
// │ This refreshes the M2 indexed-pages monitor without anyone opening  │
// │ the GSC Coverage dashboard. Registered in CLAUDE.md → "Pending      │
// │ user-action items" → GSC Coverage/Indexing weekly item.             │
// └─────────────────────────────────────────────────────────────────────┘
//
// Mode A (default) — indexing-coverage estimate:
//   1. Pulls sitemap.xml + all chunk sitemaps (live, from the site).
//   2. Stratified sample of ~120 URLs, proportional across route families
//      (destination, vs, festival, cost, blog, ...), seeded + reproducible.
//   3. URL Inspection API per sampled URL (verdict PASS = "URL is on Google").
//   4. Prints Indexed/Not-indexed estimate with a 95% Wilson CI scaled to
//      the full sitemap population.
//   5. --patch: writes the estimate into today's gsc-audits/gsc-audit-*.md
//      via scripts/patch-gsc-indexing.mjs (--source inspection-sample, so the
//      block is flagged as estimated) and rebuilds audit-snapshots.json so
//      the M2 cron monitor sees fresh data. Creates a stub audit md if none
//      exists for today.
//
// Mode B (--url) — per-URL canonical/coverage verdict (replaces the manual
// hemkund-sahib "Request Indexing" ritual check):
//   node scripts/gsc-inspect-sweep.mjs \
//     --url https://www.nakshiq.com/destination/hemkund-sahib/june \
//     --url https://www.nakshiq.com/en/destination/hemkund-sahib/june
//
// Auth: same OAuth refresh-token pattern as scripts/data-pull.mjs (GSC's
// "Add User" UI rejects service accounts). Secrets live in .secrets/
// (gitignored); override the directory with GSC_SECRETS_DIR when running
// from a worktree, or supply GSC_OAUTH_REFRESH_TOKEN directly.
// Needs GSC_SITE_URL in the env (loaded from apps/web/.env.local like
// data-pull.mjs).
//
// API hygiene:
//   - URL Inspection quota is ~2,000 inspections/day + 600/min per property.
//     Default sample 120, hard cap 150/run (--cap, ceiling 600) keeps every
//     run well under 10% of the daily quota.
//   - Exponential backoff + jitter on 429/RESOURCE_EXHAUSTED (5 attempts).
//   - Never logs token values.
//
// Usage:
//   node scripts/gsc-inspect-sweep.mjs                 # Mode A, print only
//   node scripts/gsc-inspect-sweep.mjs --patch         # Mode A + refresh M2
//   node scripts/gsc-inspect-sweep.mjs --sample 100 --seed 7
//   node scripts/gsc-inspect-sweep.mjs --url <url> [--url <url> ...]

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");

try {
  const { config: dotenvConfig } = await import("dotenv");
  dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });
  dotenvConfig({ path: path.join(ROOT, ".env.local") });
} catch {
  /* dotenv optional — env vars may already be set */
}

const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) {
  console.error("ERR: GSC_SITE_URL not set (apps/web/.env.local or env)");
  process.exit(1);
}

// Derive the public sitemap index from the property (sc-domain:example.com →
// https://www.example.com/sitemap.xml); GSC_SITEMAP_INDEX overrides.
function defaultSitemapIndex(siteUrl) {
  if (siteUrl.startsWith("sc-domain:")) {
    return `https://www.${siteUrl.slice("sc-domain:".length)}/sitemap.xml`;
  }
  return new URL("/sitemap.xml", siteUrl).href;
}
const SITEMAP_INDEX = process.env.GSC_SITEMAP_INDEX ?? defaultSitemapIndex(SITE_URL);

const HARD_CEILING = 600; // never allow a single run past this, whatever --cap says

// ─── Args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function arg(name, dflt) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
}
function flag(name) {
  return args.includes(`--${name}`);
}
function argAll(name) {
  const out = [];
  for (let i = 0; i < args.length - 1; i++) {
    if (args[i] === `--${name}`) out.push(args[i + 1]);
  }
  return out;
}

const urls = argAll("url");
const sampleSize = parseInt(arg("sample", "120"), 10);
const cap = Math.min(parseInt(arg("cap", "150"), 10), HARD_CEILING);
const seed = parseInt(arg("seed", String(new Date().getUTCDate() + 31 * (new Date().getUTCMonth() + 1))), 10);
const doPatch = flag("patch");

// ─── GSC client (OAuth refresh token — same pattern as data-pull.mjs) ────
let _gsc;
async function gsc() {
  if (_gsc) return _gsc;
  const secretsDir = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
  const oauthClientPath = path.join(secretsDir, "gsc-oauth-client.json");
  const tokenPath = path.join(secretsDir, "gsc-refresh-token.txt");
  const clientJson = JSON.parse(readFileSync(oauthClientPath, "utf8"));
  const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
  const refreshToken =
    process.env.GSC_OAUTH_REFRESH_TOKEN ?? readFileSync(tokenPath, "utf8").trim();
  const { google } = await import("googleapis");
  const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  _gsc = google.searchconsole({ version: "v1", auth: oauth2 });
  return _gsc;
}

// ─── Backoff-wrapped single inspection ────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isRetryable(e) {
  const code = e?.code ?? e?.response?.status;
  const msg = String(e?.message ?? "");
  return code === 429 || code === 503 || /RESOURCE_EXHAUSTED|rateLimitExceeded|quota/i.test(msg);
}

async function inspectUrl(inspectionUrl) {
  const client = await gsc();
  const MAX_ATTEMPTS = 5;
  for (let attempt = 1; ; attempt++) {
    try {
      const { data } = await client.urlInspection.index.inspect({
        requestBody: { inspectionUrl, siteUrl: SITE_URL, languageCode: "en-US" },
      });
      return data.inspectionResult ?? {};
    } catch (e) {
      if (attempt >= MAX_ATTEMPTS || !isRetryable(e)) throw e;
      const delay = Math.round(1500 * 2 ** (attempt - 1) * (1 + Math.random() * 0.4));
      console.warn(`  ⏳ 429/quota on attempt ${attempt} — backing off ${delay}ms`);
      await sleep(delay);
    }
  }
}

// ─── Sitemap pull + route-family classifier ───────────────────────────────
async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": "nakshiq-gsc-sweep/1.0" } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

async function pullSitemapUrls() {
  const indexXml = await fetchText(SITEMAP_INDEX);
  const chunkUrls = extractLocs(indexXml);
  // A flat sitemap (no <sitemap> children) returns page URLs directly.
  const isIndex = /<sitemapindex/i.test(indexXml);
  if (!isIndex) return chunkUrls;
  const all = [];
  for (const chunk of chunkUrls) {
    const xml = await fetchText(chunk);
    all.push(...extractLocs(xml));
  }
  return all;
}

// Family = first path segment after the optional locale prefix.
function routeFamily(url) {
  let p;
  try {
    p = new URL(url).pathname;
  } catch {
    return "(bad-url)";
  }
  const segs = p.split("/").filter(Boolean);
  if (segs[0] === "en" || segs[0] === "hi") segs.shift();
  return segs.length === 0 ? "(home)" : segs[0];
}

// ─── Seeded PRNG (mulberry32) — reproducible samples ─────────────────────
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Proportional allocation (largest remainder), then random sample per family.
function stratifiedSample(allUrls, n, rand) {
  const byFamily = new Map();
  for (const u of allUrls) {
    const f = routeFamily(u);
    if (!byFamily.has(f)) byFamily.set(f, []);
    byFamily.get(f).push(u);
  }
  const families = [...byFamily.entries()].sort((a, b) => b[1].length - a[1].length);
  const total = allUrls.length;
  // Largest-remainder proportional allocation.
  const quotas = families.map(([f, list]) => {
    const exact = (list.length / total) * n;
    return { family: f, list, floor: Math.floor(exact), frac: exact - Math.floor(exact) };
  });
  let assigned = quotas.reduce((s, q) => s + q.floor, 0);
  quotas.sort((a, b) => b.frac - a.frac);
  for (const q of quotas) {
    if (assigned >= n) break;
    q.floor += 1;
    assigned += 1;
  }
  const picks = [];
  for (const q of quotas) {
    const pool = [...q.list];
    const take = Math.min(q.floor, pool.length);
    for (let i = 0; i < take; i++) {
      const idx = Math.floor(rand() * pool.length);
      picks.push({ url: pool[idx], family: q.family });
      pool.splice(idx, 1);
    }
  }
  return { picks, byFamily };
}

// ─── Wilson 95% CI for a proportion ───────────────────────────────────────
function wilson95(k, n) {
  if (n === 0) return { p: 0, lo: 0, hi: 0 };
  const z = 1.959964;
  const p = k / n;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const centre = (p + z2 / (2 * n)) / denom;
  const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;
  return { p, lo: Math.max(0, centre - half), hi: Math.min(1, centre + half) };
}

// ─── Output helpers ───────────────────────────────────────────────────────
function pad(s, n) {
  return String(s).padEnd(n);
}
function lpad(s, n) {
  return String(s).padStart(n);
}

function summariseInspection(url, r) {
  const idx = r.indexStatusResult ?? {};
  return {
    url,
    verdict: idx.verdict ?? "UNKNOWN",
    coverageState: idx.coverageState ?? "(none)",
    indexingState: idx.indexingState ?? "(none)",
    robotsTxtState: idx.robotsTxtState ?? "(none)",
    lastCrawlTime: idx.lastCrawlTime ?? "(never)",
    userCanonical: idx.userCanonical ?? "(none)",
    googleCanonical: idx.googleCanonical ?? "(none)",
    sitemaps: idx.sitemap ?? [],
  };
}

// ─── Mode B — inspect specific URLs ───────────────────────────────────────
async function modeB(targets) {
  if (targets.length > cap) {
    console.error(`ERR: ${targets.length} URLs exceeds per-run cap ${cap}`);
    process.exit(1);
  }
  console.log(`GSC URL Inspection — property ${SITE_URL} — ${targets.length} URL(s)\n`);
  let hadError = false;
  for (const url of targets) {
    try {
      const r = await inspectUrl(url);
      const s = summariseInspection(url, r);
      const onGoogle = s.verdict === "PASS" ? "✅ INDEXED (URL is on Google)" : `❌ NOT indexed (verdict ${s.verdict})`;
      console.log(`■ ${url}`);
      console.log(`    ${onGoogle}`);
      console.log(`    coverageState:    ${s.coverageState}`);
      console.log(`    indexingState:    ${s.indexingState}`);
      console.log(`    robotsTxtState:   ${s.robotsTxtState}`);
      console.log(`    lastCrawlTime:    ${s.lastCrawlTime}`);
      console.log(`    userCanonical:    ${s.userCanonical}`);
      console.log(`    googleCanonical:  ${s.googleCanonical}`);
      if (s.sitemaps.length) console.log(`    in sitemaps:      ${s.sitemaps.join(", ")}`);
      console.log("");
    } catch (e) {
      hadError = true;
      console.error(`■ ${url}\n    ERR: ${e?.message ?? e}\n`);
    }
  }
  process.exit(hadError ? 2 : 0);
}

// ─── Mode A — stratified sweep ────────────────────────────────────────────
function latestAuditDate() {
  const dir = path.join(ROOT, "gsc-audits");
  if (!existsSync(dir)) return null;
  const dates = readdirSync(dir)
    .map((f) => f.match(/^gsc-audit-(\d{4}-\d{2}-\d{2})\.md$/)?.[1])
    .filter(Boolean)
    .sort();
  return dates.at(-1) ?? null;
}

function istToday() {
  const d = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

async function modeA() {
  const n = Math.min(sampleSize, cap);
  if (sampleSize > cap) {
    console.warn(`WARN: --sample ${sampleSize} clamped to per-run cap ${cap}`);
  }
  console.log(`GSC inspection sweep — property ${SITE_URL}`);
  console.log(`Pulling sitemaps from ${SITEMAP_INDEX} ...`);
  const allUrls = await pullSitemapUrls();
  console.log(`  ${allUrls.length} URLs across the sitemap chunks`);

  const rand = mulberry32(seed);
  const { picks, byFamily } = stratifiedSample(allUrls, n, rand);
  console.log(`  stratified sample n=${picks.length} (seed ${seed}, proportional across ${byFamily.size} route families)`);
  console.log(`  quota math: ${picks.length} inspections ≈ ${((picks.length / 2000) * 100).toFixed(1)}% of the ~2,000/day URL Inspection quota\n`);

  // Inspect with small concurrency (well under the 600/min quota).
  const CONCURRENCY = 4;
  const results = [];
  let done = 0;
  let cursor = 0;
  async function worker() {
    while (cursor < picks.length) {
      const i = cursor++;
      const { url, family } = picks[i];
      try {
        const r = await inspectUrl(url);
        const s = summariseInspection(url, r);
        results.push({ ...s, family, ok: true });
      } catch (e) {
        results.push({ url, family, ok: false, error: String(e?.message ?? e) });
      }
      done++;
      if (done % 20 === 0) console.log(`  ...${done}/${picks.length} inspected`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const okResults = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);
  const indexed = okResults.filter((r) => r.verdict === "PASS");

  // Per-family table.
  console.log(`\nPer-family sample results:`);
  const famRows = [...byFamily.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([f, list]) => {
      const fam = okResults.filter((r) => r.family === f);
      const famIdx = fam.filter((r) => r.verdict === "PASS").length;
      return { f, total: list.length, sampled: fam.length, indexed: famIdx };
    });
  console.log(`  ${pad("family", 16)}${lpad("urls", 8)}${lpad("sampled", 9)}${lpad("indexed", 9)}${lpad("rate", 7)}`);
  for (const r of famRows) {
    const rate = r.sampled ? `${((r.indexed / r.sampled) * 100).toFixed(0)}%` : "—";
    console.log(`  ${pad(r.f, 16)}${lpad(r.total, 8)}${lpad(r.sampled, 9)}${lpad(r.indexed, 9)}${lpad(rate, 7)}`);
  }

  // coverageState breakdown.
  const byState = new Map();
  for (const r of okResults) byState.set(r.coverageState, (byState.get(r.coverageState) ?? 0) + 1);
  console.log(`\ncoverageState breakdown (sample):`);
  for (const [state, count] of [...byState.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${lpad(count, 4)}  ${state}`);
  }
  if (failed.length) {
    console.log(`\n  ${failed.length} inspection(s) errored (excluded from estimate):`);
    for (const f of failed.slice(0, 5)) console.log(`    ${f.url} → ${f.error}`);
  }

  // Estimate with 95% Wilson CI, scaled to the sitemap population.
  const { p, lo, hi } = wilson95(indexed.length, okResults.length);
  const N = allUrls.length;
  const est = Math.round(p * N);
  const estLo = Math.round(lo * N);
  const estHi = Math.round(hi * N);
  const notEst = N - est;

  console.log(`\n──────────────────────────────────────────────────────`);
  console.log(`ESTIMATE (sitemap population N=${N}, sample n=${okResults.length}):`);
  console.log(`  Indexed rate:    ${(p * 100).toFixed(1)}%  (95% CI ${(lo * 100).toFixed(1)}–${(hi * 100).toFixed(1)}%)`);
  console.log(`  Indexed:         ~${est.toLocaleString()}  (95% CI ${estLo.toLocaleString()}–${estHi.toLocaleString()})`);
  console.log(`  Not indexed:     ~${notEst.toLocaleString()}`);
  console.log(`  NOTE: estimates cover sitemap-submitted URLs only. The GSC`);
  console.log(`  dashboard's "Not indexed" also counts discovered non-sitemap`);
  console.log(`  URLs (old non-prefixed variants etc), so its Not-indexed`);
  console.log(`  figure runs higher than this one. Trend the Indexed number.`);
  console.log(`──────────────────────────────────────────────────────`);

  if (!doPatch) {
    console.log(`\n(print-only — pass --patch to write this into the audit md + refresh M2)`);
    return;
  }

  // ── Patch path: same write path the manual ritual used ──
  const date = arg("date", istToday());
  const mdPath = path.join(ROOT, "gsc-audits", `gsc-audit-${date}.md`);
  if (!existsSync(mdPath)) {
    // No audit yet today — create a stub so patch-gsc-indexing.mjs can append.
    const latest = latestAuditDate();
    console.log(`\nNo audit md for ${date} (latest on disk: ${latest ?? "none"}) — writing stub ${path.relative(ROOT, mdPath)}`);
    const stub = `# GSC Audit — ${date}\n\n**Property:** ${SITE_URL}\n\n_Auto-created by scripts/gsc-inspect-sweep.mjs (URL Inspection sample sweep) so the M2 indexed-pages monitor has a fresh datapoint. The full audit session may extend this file._\n`;
    writeFileSync(mdPath, stub, "utf8");
  }
  console.log(`\n→ invoking patch-gsc-indexing.mjs (flagged --source inspection-sample) ...`);
  const res = spawnSync(
    "node",
    [
      path.join(ROOT, "scripts", "patch-gsc-indexing.mjs"),
      "--date", date,
      "--indexed", String(est),
      "--not-indexed", String(notEst),
      "--source", "inspection-sample",
      "--note", `n=${okResults.length} stratified sample, 95% CI ${estLo.toLocaleString()}–${estHi.toLocaleString()} indexed, seed ${seed}`,
    ],
    { cwd: ROOT, stdio: "inherit" },
  );
  process.exit(res.status ?? 0);
}

// ─── Entry ────────────────────────────────────────────────────────────────
if (urls.length > 0) {
  await modeB(urls);
} else {
  await modeA();
}
