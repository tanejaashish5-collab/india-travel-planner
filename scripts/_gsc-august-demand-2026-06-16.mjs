#!/usr/bin/env node
// One-shot: pull the AUGUST search-demand set from GSC so we can build the
// August cohort in lib/high-impression-pages.ts from real data (not guesses).
// Read-only — searchanalytics.query only.
import path from "node:path";
import { readFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
config({ path: path.join(ROOT, ".env.local") });

const { google } = await import("googleapis");
const oauthClientPath = path.join(ROOT, ".secrets", "gsc-oauth-client.json");
const tokenPath = path.join(ROOT, ".secrets", "gsc-refresh-token.txt");
const raw = JSON.parse(readFileSync(oauthClientPath, "utf8"));
const client = raw.installed || raw.web;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN || readFileSync(tokenPath, "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const siteUrl = process.env.GSC_SITE_URL;
console.log("# siteUrl:", siteUrl);

async function q(body) {
  const r = await gsc.searchanalytics.query({ siteUrl, requestBody: body });
  return r.data.rows || [];
}

const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10); // GSC lags ~2d
function startBack(days) { return new Date(Date.now() - (days + 2) * 864e5).toISOString().slice(0, 10); }

for (const win of [28, 7]) {
  const startDate = startBack(win);
  console.log(`\n## QUERIES containing "august"  (${startDate}..${end}, ${win}d)`);
  const rows = await q({
    startDate, endDate: end, dimensions: ["query"], rowLimit: 25000,
    dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "contains", expression: "august" }] }],
  });
  rows.sort((a, b) => b.impressions - a.impressions);
  console.log("impr\tclicks\tpos\tquery");
  for (const r of rows.slice(0, 60))
    console.log(`${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}\t${r.keys[0]}`);
  console.log(`(total august queries: ${rows.length}, sum impr ${rows.reduce((s, r) => s + r.impressions, 0)})`);
}

// PAGE dimension — which /august dest×month URLs already get impressions
console.log(`\n## PAGES matching "/august"  (28d)`);
const pages = await q({
  startDate: startBack(28), endDate: end, dimensions: ["page"], rowLimit: 25000,
  dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: "/august" }] }],
});
pages.sort((a, b) => b.impressions - a.impressions);
console.log("impr\tclicks\tpos\tpage");
for (const r of pages.slice(0, 50))
  console.log(`${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}\t${r.keys[0].replace(siteUrl || "", "")}`);
console.log(`(total /august pages: ${pages.length})`);
