#!/usr/bin/env node
/* eslint-disable no-console */
// One-off (gen 2026-07-06 by scheduled gsc-canonical-consolidation task):
// third re-run of the Apr 27 snippet-rewrite CTR check. Prior runs
// (2026-06-22, 2026-06-29) used partial-June post-windows (through Jun 20 /
// Jun 27) and flagged "darjeeling june weather" going to 0 impressions as an
// unresolved anomaly worth a clean look once June fully closed out.
// Today (Jul 6) June is fully closed, so this run uses a complete calendar
// month (Jun 1-30) as the primary post-window specifically to resolve that
// anomaly, plus a most-recent-28d window for general freshness.
// Pre-window unchanged: Mar 30 - Apr 26 (28d before Apr 27 deploy).

import path from "node:path";
import { readFileSync } from "node:fs";
import { google } from "googleapis";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) {
  console.error("ERR: GSC_SITE_URL not set");
  process.exit(1);
}

const oauthClientPath = path.join(ROOT, ".secrets", "gsc-oauth-client.json");
const tokenPath = path.join(ROOT, ".secrets", "gsc-refresh-token.txt");
const clientJson = JSON.parse(readFileSync(oauthClientPath, "utf8"));
const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
const refreshToken =
  process.env.GSC_OAUTH_REFRESH_TOKEN || readFileSync(tokenPath, "utf8").trim();
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const QUERIES = [
  "vrindavan temperature in may",
  "yercaud weather in may",
  "chakrata temperature in may",
  "kanatal in may",
  "pondicherry weather in may",
  "darjeeling june weather",
];

const PAGES = [
  "https://www.nakshiq.com/en/destination/kumbhalgarh/may",
  "https://www.nakshiq.com/en/destination/vrindavan/may",
  "https://www.nakshiq.com/en/destination/yercaud/may",
  "https://www.nakshiq.com/en/destination/chakrata/may",
  "https://www.nakshiq.com/en/destination/pondicherry/may",
  "https://www.nakshiq.com/en/destination/darjeeling/june",
];

const WINDOWS = [
  { key: "pre", label: "PRE       (Mar 30 - Apr 26)", startDate: "2026-03-30", endDate: "2026-04-26" },
  { key: "june", label: "JUNE-FULL (Jun 01 - Jun 30)", startDate: "2026-06-01", endDate: "2026-06-30" },
  { key: "recent", label: "RECENT28d (Jun 09 - Jul 06)", startDate: "2026-06-09", endDate: "2026-07-06" },
];

async function queryRow(q, w) {
  const { data } = await gsc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: w.startDate,
      endDate: w.endDate,
      dimensions: ["query"],
      rowLimit: 1,
      dimensionFilterGroups: [
        { filters: [{ dimension: "query", operator: "equals", expression: q }] },
      ],
    },
  });
  return data.rows?.[0] ?? null;
}

async function pageRow(p, w) {
  const { data } = await gsc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: w.startDate,
      endDate: w.endDate,
      dimensions: ["page"],
      rowLimit: 1,
      dimensionFilterGroups: [
        { filters: [{ dimension: "page", operator: "equals", expression: p }] },
      ],
    },
  });
  return data.rows?.[0] ?? null;
}

function fmtPct(n) { return n == null ? "—" : (n * 100).toFixed(2) + "%"; }
function fmtPos(n) { return n == null ? "—" : n.toFixed(1); }

console.log(`GSC CTR check — Apr 27 snippet rewrite (3rd re-run, clean closed-June window)\n`);
console.log(`Property: ${SITE_URL}`);
console.log(`Windows: PRE (Mar 30-Apr 26) vs JUNE-FULL (Jun 1-30) vs RECENT28d (Jun 9-Jul 6)\n`);

console.log(`=== Query level (6 target queries) ===\n`);
for (const q of QUERIES) {
  console.log(`■ "${q}"`);
  const rows = {};
  for (const w of WINDOWS) {
    rows[w.key] = await queryRow(q, w);
    const r = rows[w.key];
    if (r) {
      console.log(`    ${w.label}:  impr=${String(r.impressions).padStart(5)}  clk=${String(r.clicks).padStart(4)}  CTR=${fmtPct(r.ctr).padStart(7)}  pos=${fmtPos(r.position)}`);
    } else {
      console.log(`    ${w.label}:  (no impressions)`);
    }
  }
  console.log("");
}

console.log(`\n=== Page level (6 pages incl. darjeeling/june) ===\n`);
for (const p of PAGES) {
  console.log(`■ ${p}`);
  for (const w of WINDOWS) {
    const r = await pageRow(p, w);
    if (r) {
      console.log(`    ${w.label}:  impr=${String(r.impressions).padStart(5)}  clk=${String(r.clicks).padStart(4)}  CTR=${fmtPct(r.ctr).padStart(7)}  pos=${fmtPos(r.position)}`);
    } else {
      console.log(`    ${w.label}:  (no impressions)`);
    }
  }
  console.log("");
}

console.log("Note: pp = percentage points. Position improvement is a DROP (lower number = higher rank).");
