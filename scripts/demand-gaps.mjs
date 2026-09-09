#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * demand-gaps — queries India travellers are ALREADY showing you, that you serve badly.
 *
 * Built 2026-09-09 from the Zapier pattern "Turn support tickets into expansion signals":
 * treat the complaint surface as demand data. The intended NakshIQ analogue was zero-result
 * SITE searches, but those are unbuildable today — search runs client-side against a cached
 * index and nothing is logged (no search table in Supabase, verified 2026-09-09). GSC answers
 * the same question from data already being pulled: queries where Google shows the site to
 * real people who then don't click, or where the site ranks on page 2+.
 *
 * That is demand you are visible for and not capturing — the content gap, stated in
 * impressions rather than guesses.
 *
 * Run: node --env-file=apps/web/.env.local scripts/demand-gaps.mjs
 * Cron-safe: cron has Full Disk Access on this machine (the GA4 audit cron proves it);
 * launchd does NOT — do not port this to a LaunchAgent without re-testing TCC.
 */
import path from "node:path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { google } from "googleapis";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("demand-gaps: GSC_SITE_URL not set"); process.exit(1); }

const clientJson = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN
  || readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const end = new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10); // GSC lags ~3d
const start = new Date(Date.now() - 31 * 864e5).toISOString().slice(0, 10);

const res = await gsc.searchanalytics.query({
  siteUrl: SITE_URL,
  requestBody: {
    startDate: start, endDate: end,
    dimensions: ["query"],
    rowLimit: 25000,
    type: "web",
  },
});
const rows = res.data.rows ?? [];
if (!rows.length) { console.error("demand-gaps: GSC returned zero rows — check site/creds"); process.exit(1); }

const MIN_IMPR = 30;
// Two distinct gap shapes, deliberately separated — they need different fixes.
const page2 = [];   // real demand, we rank 11-40: a RANKING problem (links/depth)
const noClick = []; // real demand, we rank well, nobody clicks: a SNIPPET/INTENT problem
for (const r of rows) {
  const [q] = r.keys; const { impressions: i, clicks: c, position: p, ctr } = r;
  if (i < MIN_IMPR) continue;
  if (p >= 11 && p <= 40) page2.push({ q, i, c, p, ctr });
  else if (p < 11 && c === 0) noClick.push({ q, i, c, p, ctr });
}
page2.sort((a, b) => b.i - a.i);
noClick.sort((a, b) => b.i - a.i);

const lines = [];
lines.push(`# Demand gaps — ${end}`);
lines.push(`\nWindow ${start} → ${end}. ${rows.length} queries with data; threshold ≥${MIN_IMPR} impressions.\n`);
lines.push(`## Page-2 demand (position 11-40) — a RANKING problem, not a content problem`);
lines.push(`These already have a page. Google shows it, just not high enough. Lever: internal links + depth.\n`);
lines.push(`| query | impr | clicks | pos |`);
lines.push(`|---|---:|---:|---:|`);
for (const r of page2.slice(0, 25)) lines.push(`| ${r.q} | ${r.i} | ${r.c} | ${r.p.toFixed(1)} |`);
if (!page2.length) lines.push(`| _none above threshold_ | | | |`);
lines.push(`\n## Shown but never clicked (position <11, 0 clicks) — a SNIPPET/INTENT problem`);
lines.push(`You rank. They don't click. Either the title/snippet misses, or the intent isn't what you serve.\n`);
lines.push(`| query | impr | pos |`);
lines.push(`|---|---:|---:|`);
for (const r of noClick.slice(0, 25)) lines.push(`| ${r.q} | ${r.i} | ${r.p.toFixed(1)} |`);
if (!noClick.length) lines.push(`| _none above threshold_ | | |`);
lines.push(`\n---`);
lines.push(`Totals: ${page2.length} page-2 queries (${page2.reduce((s, r) => s + r.i, 0)} impressions),`);
lines.push(`${noClick.length} shown-never-clicked (${noClick.reduce((s, r) => s + r.i, 0)} impressions).`);

const outDir = path.join(ROOT, "gsc-audits");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `demand-gaps-${end}.md`);
writeFileSync(out, lines.join("\n") + "\n");
console.log(`✓ wrote ${path.relative(ROOT, out)}`);
console.log(`  page-2: ${page2.length} queries / ${page2.reduce((s, r) => s + r.i, 0)} impr`);
console.log(`  shown-never-clicked: ${noClick.length} queries / ${noClick.reduce((s, r) => s + r.i, 0)} impr`);
if (page2[0]) console.log(`  biggest page-2 gap: "${page2[0].q}" (${page2[0].i} impr, pos ${page2[0].p.toFixed(1)})`);
