#!/usr/bin/env node
/**
 * gsc-ranking-push-candidates.mjs — pages worth pushing from page-1-bottom to page-1-top
 *
 *   node --env-file=apps/web/.env.local scripts/gsc-ranking-push-candidates.mjs [--days 28] [--min-imp 100]
 *
 * Diagnosis behind it (2026-09-13): 66.7K weekly impressions, 456 clicks, avg
 * position ~10. Google already shows the site; nobody clicks because it sits at
 * the bottom of page 1. The cheapest ranking lever with no authority is to
 * concentrate internal links on the pages that are ALREADY close: positions
 * 6-12 with real impressions. This script lists them; it writes nothing.
 *
 * Auth: same OAuth refresh-token pattern as scripts/data-pull.mjs.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const DAYS = Number(arg("days", 28));
const MIN_IMP = Number(arg("min-imp", 100));
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }

const secretsDir = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const clientJson = JSON.parse(readFileSync(path.join(secretsDir, "gsc-oauth-client.json"), "utf8"));
const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN ??
  readFileSync(path.join(secretsDir, "gsc-refresh-token.txt"), "utf8").trim();
const { google } = await import("googleapis");
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);        // GSC lags ~2 days
const start = new Date(end); start.setDate(start.getDate() - DAYS);

const { data } = await gsc.searchanalytics.query({
  siteUrl: SITE_URL,
  requestBody: { startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 5000 },
});
const rows = (data.rows ?? []).map((r) => ({
  page: r.keys[0], clicks: r.clicks, impressions: r.impressions,
  ctr: r.ctr, position: r.position,
}));

const total = rows.reduce((a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions }), { c: 0, i: 0 });
const withClicks = rows.filter((r) => r.clicks > 0).length;

// The push set: already on page 1's lower half or just off it, with demand.
const push = rows
  .filter((r) => r.position >= 6 && r.position <= 12 && r.impressions >= MIN_IMP)
  .sort((a, b) => b.impressions - a.impressions);

// Context buckets, so the shape of the problem is visible in one glance.
const bucket = (lo, hi) => rows.filter((r) => r.position >= lo && r.position < hi)
  .reduce((a, r) => ({ n: a.n + 1, c: a.c + r.clicks, i: a.i + r.impressions }), { n: 0, c: 0, i: 0 });
const buckets = [["1-3", 1, 4], ["4-6", 4, 7], ["6-12", 6, 13], ["13-20", 13, 21], ["21+", 21, 999]];

console.log(`\nWindow ${iso(start)} → ${iso(end)} (${DAYS}d) · ${rows.length} pages with impressions · ${withClicks} with ≥1 click`);
console.log(`Totals: ${total.c} clicks / ${total.i.toLocaleString()} impressions · CTR ${(100 * total.c / total.i).toFixed(2)}%\n`);
console.log("Position bucket   pages   clicks   impressions   CTR");
for (const [label, lo, hi] of buckets) {
  const b = bucket(lo, hi);
  console.log(`${label.padEnd(17)} ${String(b.n).padStart(5)}   ${String(b.c).padStart(6)}   ${String(b.i).padStart(11)}   ${b.i ? (100 * b.c / b.i).toFixed(2) : "0.00"}%`);
}
console.log(`\nPUSH SET — position 6-12, ≥${MIN_IMP} impressions: ${push.length} pages`);
console.log("pos    imp   clicks  page");
for (const r of push.slice(0, 40)) {
  console.log(`${r.position.toFixed(1).padStart(4)}  ${String(r.impressions).padStart(5)}  ${String(r.clicks).padStart(6)}  ${r.page.replace(/^https?:\/\/[^/]+/, "")}`);
}

mkdirSync("gsc-audits", { recursive: true });
const out = `gsc-audits/ranking-push-candidates-${iso(new Date())}.json`;
// Donors = pages that already rank well with real clicks; their internal links carry weight.
const donors = rows.filter((r) => r.position < 6 && r.clicks >= 3).sort((a, b) => b.clicks - a.clicks);
writeFileSync(out, JSON.stringify({ window: { start: iso(start), end: iso(end) }, totals: total, push, donors, all: rows }, null, 1));
console.log(`donors (pos<6, ≥3 clicks): ${donors.length}`);
console.log(`\nwrote ${out}`);
