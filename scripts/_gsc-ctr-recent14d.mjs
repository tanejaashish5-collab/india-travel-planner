#!/usr/bin/env node
/* eslint-disable no-console */
// Recent-14d CTR for the destination-month pages whose non-prefixed URLs
// were submitted for canonical consolidation today (and a few neighbours).
// Run from project root via `node --env-file=apps/web/.env.local`.

import path from "node:path";
import { readFileSync } from "node:fs";
import { google } from "googleapis";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = process.env.GSC_SITE_URL;
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
  { label: "PRE   (Mar 30 – Apr 26)", startDate: "2026-03-30", endDate: "2026-04-26" },
  { label: "EARLY (Apr 28 – May 17)", startDate: "2026-04-28", endDate: "2026-05-17" },
  { label: "RECENT(May 18 – Jun 14)", startDate: "2026-05-18", endDate: "2026-06-14" },
];

async function queryPage(page, w) {
  const { data } = await gsc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: w.startDate,
      endDate: w.endDate,
      dimensions: ["page"],
      rowLimit: 1,
      dimensionFilterGroups: [
        { filters: [{ dimension: "page", operator: "equals", expression: page }] },
      ],
    },
  });
  return data.rows?.[0] ?? null;
}

// Also pull non-prefixed counterpart so we can see consolidation traffic transfer.
function unprefix(u) {
  return u.replace("/en/", "/");
}

console.log(`GSC page-level CTR — /en/ canonical pages and their non-prefixed sources\n`);

for (const p of PAGES) {
  console.log(`■ ${p}`);
  for (const w of WINDOWS) {
    const en = await queryPage(p, w);
    const np = await queryPage(unprefix(p), w);
    const enImp = en?.impressions ?? 0;
    const enClk = en?.clicks ?? 0;
    const enCtr = en?.ctr ?? 0;
    const enPos = en?.position ?? null;
    const npImp = np?.impressions ?? 0;
    const npClk = np?.clicks ?? 0;
    const totalImp = enImp + npImp;
    const totalClk = enClk + npClk;
    const totalCtr = totalImp > 0 ? totalClk / totalImp : 0;
    console.log(
      `    ${w.label}:  /en impr=${String(enImp).padStart(5)} clk=${String(enClk).padStart(3)}  +  non-prefix impr=${String(npImp).padStart(5)} clk=${String(npClk).padStart(3)}  ⇒ total CTR=${(totalCtr * 100).toFixed(2)}%  pos=${enPos != null ? enPos.toFixed(1) : "—"}`,
    );
  }
  console.log("");
}
