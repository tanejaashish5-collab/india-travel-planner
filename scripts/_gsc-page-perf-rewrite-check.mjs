#!/usr/bin/env node
/* eslint-disable no-console */
// One-off (gen 2026-06-29 by scheduled gsc-canonical-consolidation task):
// page-level CTR/position pre vs post Apr 27 snippet rewrite for the 5
// rewritten pages. More robust than the query-level check for seasonal
// "may" queries that naturally lost impressions after May.

import path from "node:path";
import { readFileSync } from "node:fs";
import { google } from "googleapis";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }

const oauthClientPath = path.join(ROOT, ".secrets", "gsc-oauth-client.json");
const tokenPath = path.join(ROOT, ".secrets", "gsc-refresh-token.txt");
const clientJson = JSON.parse(readFileSync(oauthClientPath, "utf8"));
const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
const refreshToken =
  process.env.GSC_OAUTH_REFRESH_TOKEN || readFileSync(tokenPath, "utf8").trim();
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const PAGES = [
  "https://www.nakshiq.com/en/destination/kumbhalgarh/may",
  "https://www.nakshiq.com/en/destination/vrindavan/may",
  "https://www.nakshiq.com/en/destination/yercaud/may",
  "https://www.nakshiq.com/en/destination/chakrata/may",
  "https://www.nakshiq.com/en/destination/pondicherry/may",
];

const WINDOWS = [
  { label: "PRE  (Mar 30 – Apr 26)", startDate: "2026-03-30", endDate: "2026-04-26" },
  { label: "POST (May 31 – Jun 27)", startDate: "2026-05-31", endDate: "2026-06-27" },
];

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

const fmtPct = n => (n * 100).toFixed(2) + "%";
const fmtPos = n => n == null ? "—" : n.toFixed(1);

console.log("GSC page-level perf — Apr 27 snippet rewrite (5 target pages)\n");
console.log(`Property: ${SITE_URL}\n`);

for (const p of PAGES) {
  const slug = p.replace("https://www.nakshiq.com", "");
  console.log(`■ ${slug}`);
  for (const w of WINDOWS) {
    const r = await pageRow(p, w);
    if (r) {
      console.log(`    ${w.label}: impr=${String(r.impressions).padStart(5)}  clk=${String(r.clicks).padStart(4)}  CTR=${fmtPct(r.ctr).padStart(6)}  pos=${fmtPos(r.position)}`);
    } else {
      console.log(`    ${w.label}: (no impressions)`);
    }
  }
  console.log("");
}
