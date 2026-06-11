#!/usr/bin/env node
// One-shot /hi/ position spot-check for the 2026-06-11 audit (action item #4).
// Audit context: Hindi pages hold 0 of the top-10 queries/pages across two
// fresh windows. Compare the fresh 6/2-6/8 window vs the prior 5/26-6/1
// window for the top /hi/ pages + /hi/ aggregate, looking for position loss.
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
const client = JSON.parse(readFileSync(oauthClientPath, "utf8")).installed
  || JSON.parse(readFileSync(oauthClientPath, "utf8")).web;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN
  || readFileSync(tokenPath, "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const siteUrl = process.env.GSC_SITE_URL;

const CUR = { s: "2026-06-02", e: "2026-06-08" };   // today's fresh audit window
const PRI = { s: "2026-05-26", e: "2026-06-01" };   // prior 7d (the 06-04 audit window)

const hiFilter = {
  dimensionFilterGroups: [{
    filters: [{ dimension: "page", operator: "contains", expression: "/hi/" }],
  }],
};

async function hiTotals(w) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: w.s, endDate: w.e, dimensions: [], ...hiFilter },
  });
  return r.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

async function hiTopPages(w, n = 15) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: w.s, endDate: w.e, dimensions: ["page"], rowLimit: n, ...hiFilter },
  });
  return r.data.rows || [];
}

const [curTot, priTot, curPages, priPages] = await Promise.all([
  hiTotals(CUR), hiTotals(PRI), hiTopPages(CUR), hiTopPages(PRI),
]);

const fmt = (t) =>
  `clicks ${t.clicks}  imp ${t.impressions}  ctr ${(t.ctr * 100).toFixed(2)}%  pos ${t.position?.toFixed(1)}`;

console.log(`/hi/ AGGREGATE  ${CUR.s}..${CUR.e}: ${fmt(curTot)}`);
console.log(`/hi/ AGGREGATE  ${PRI.s}..${PRI.e}: ${fmt(priTot)}`);
console.log("");

const priByUrl = new Map(priPages.map((r) => [r.keys[0], r]));
console.log(`TOP /hi/ PAGES (${CUR.s}..${CUR.e}) — vs prior window position`);
for (const r of curPages) {
  const url = r.keys[0].replace("https://www.nakshiq.com", "");
  const p = priByUrl.get(r.keys[0]);
  const delta = p ? (r.position - p.position).toFixed(1) : "new";
  console.log(
    `  ${url}\n    cur: ${r.clicks}c/${r.impressions}i pos ${r.position.toFixed(1)}  | prior: ${
      p ? `${p.clicks}c/${p.impressions}i pos ${p.position.toFixed(1)}` : "—"
    }  Δpos ${delta}`
  );
}
console.log("");
console.log(`TOP /hi/ PAGES prior window that DROPPED OUT of current top ${curPages.length}:`);
const curUrls = new Set(curPages.map((r) => r.keys[0]));
for (const r of priPages.filter((r) => !curUrls.has(r.keys[0])).slice(0, 8)) {
  console.log(`  ${r.keys[0].replace("https://www.nakshiq.com", "")}  was ${r.clicks}c/${r.impressions}i pos ${r.position.toFixed(1)}`);
}
