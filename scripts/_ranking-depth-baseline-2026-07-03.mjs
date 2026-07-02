#!/usr/bin/env node
// Ranking-depth cycle 2026-07-03 — BASELINE snapshot (read-only, searchanalytics.query only).
// Pulls the striking-distance set (pos 5-15, imp>=100, 14d) so we can pick 5 target pages
// + 5 controls, and resolves which pages rank for the audit-flagged queries.
// Day-14 re-measure compares targets vs controls from the JSON this writes.
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
config({ path: path.join(ROOT, ".env.local") });

const { google } = await import("googleapis");

const oauthClientPath = path.join(ROOT, ".secrets", "gsc-oauth-client.json");
const tokenPath = path.join(ROOT, ".secrets", "gsc-refresh-token.txt");
const client = JSON.parse(readFileSync(oauthClientPath, "utf8")).installed
  || JSON.parse(readFileSync(oauthClientPath, "utf8")).web;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN
  || readFileSync(tokenPath, "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const siteUrl = process.env.GSC_SITE_URL;

// 14d window ending at the freshest full day per the 07-02 audit (data through 6/30)
const WIN = { s: "2026-06-17", e: "2026-06-30" };

async function topPages(w, n = 500) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: w.s, endDate: w.e, dimensions: ["page"], rowLimit: n },
  });
  return r.data.rows || [];
}

async function pagesForQuery(w, query) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: w.s, endDate: w.e, dimensions: ["page"], rowLimit: 5,
      dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "equals", expression: query }] }],
    },
  });
  return r.data.rows || [];
}

const pages = await topPages(WIN);
const striking = pages
  .filter((r) => r.position >= 5 && r.position <= 15 && r.impressions >= 100)
  .sort((a, b) => b.impressions - a.impressions);

console.log(`Striking-distance set (pos 5-15, imp>=100, ${WIN.s}..${WIN.e}): ${striking.length} pages\n`);
for (const r of striking.slice(0, 30)) {
  console.log(
    `${r.keys[0].replace("https://www.nakshiq.com", "")}  imp ${r.impressions}  clicks ${r.clicks}  ctr ${(r.ctr * 100).toFixed(2)}%  pos ${r.position.toFixed(1)}`
  );
}

const FLAGGED_QUERIES = ["shrikhand mahadev weather", "festivals in july"];
const queryPages = {};
for (const q of FLAGGED_QUERIES) {
  const rows = await pagesForQuery(WIN, q);
  queryPages[q] = rows.map((r) => ({
    page: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1),
  }));
  console.log(`\nQuery "${q}" ranks via:`);
  for (const r of queryPages[q]) console.log(`  ${r.page.replace("https://www.nakshiq.com", "")}  imp ${r.impressions}  pos ${r.position}`);
}

const out = {
  generated_at: new Date().toISOString(),
  window: WIN,
  striking: striking.map((r) => ({
    page: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(2), position: +r.position.toFixed(1),
  })),
  flagged_query_pages: queryPages,
};
const outPath = path.join(ROOT, "data", "ranking-depth-cycle", "baseline-2026-07-03.json");
const { mkdirSync } = await import("node:fs");
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`\nBaseline written: ${outPath}`);
