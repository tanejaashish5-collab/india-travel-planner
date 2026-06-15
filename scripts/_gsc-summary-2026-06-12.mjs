#!/usr/bin/env node
// One-shot GSC summary pull for the 2026-06-12 daily audit.
// Pulls: freshest available date, current 7d totals + top queries/pages,
// like-for-like deltas vs 6/2-6/8 (06-11 run) and 5/26-6/1 (WoW),
// plus watch items: /hi/ aggregate, jabalpur/june, varkala/june.
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

async function q(body) {
  const r = await gsc.searchanalytics.query({ siteUrl, requestBody: body });
  return r.data.rows || [];
}

// 1. Freshest date with data (last 12 days by date)
const dEnd = new Date().toISOString().slice(0, 10);
const dStart = new Date(Date.now() - 12 * 864e5).toISOString().slice(0, 10);
const byDate = await q({ startDate: dStart, endDate: dEnd, dimensions: ["date"] });
const dates = byDate.map(r => r.keys[0]).sort();
const maxDate = dates[dates.length - 1];
console.log(`# Dates with data: ${dates.join(", ")}`);
console.log(`# Freshest date: ${maxDate}`);

// current 7d window ends at maxDate
const end = new Date(maxDate + "T00:00:00Z");
const start = new Date(end.getTime() - 6 * 864e5);
const CUR = { s: start.toISOString().slice(0, 10), e: maxDate };
const PREV = { s: "2026-06-02", e: "2026-06-08" }; // 06-11 run window
const WOW = { s: "2026-05-26", e: "2026-06-01" };  // 06-04/06-05 run window

const totals = async (w) =>
  (await q({ startDate: w.s, endDate: w.e, dimensions: [] }))[0]
  || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

const fmtT = (t) =>
  `clicks=${t.clicks}  imp=${t.impressions}  ctr=${(t.ctr * 100).toFixed(2)}%  pos=${t.position.toFixed(2)}`;

const [curT, prevT, wowT] = await Promise.all([totals(CUR), totals(PREV), totals(WOW)]);
console.log(`\n# Totals`);
console.log(`CUR  ${CUR.s}..${CUR.e}  ${fmtT(curT)}`);
console.log(`PREV ${PREV.s}..${PREV.e}  ${fmtT(prevT)}`);
console.log(`WOW  ${WOW.s}..${WOW.e}  ${fmtT(wowT)}`);

// daily series for the trend table
console.log(`\n# Daily series (last 12 days)`);
for (const r of byDate.sort((a, b) => a.keys[0].localeCompare(b.keys[0])))
  console.log(`${r.keys[0]}  clk=${String(r.clicks).padStart(3)}  imp=${String(r.impressions).padStart(6)}  pos=${r.position.toFixed(1)}`);

const top = async (dim, w, n = 10) =>
  q({ startDate: w.s, endDate: w.e, dimensions: [dim], rowLimit: n });

const printRows = (rows, strip = false) => {
  for (const r of rows)
    console.log(`${(strip ? r.keys[0].replace(siteUrl.replace(/\/$/, ""), "") : r.keys[0]).padEnd(52)}  clk=${String(r.clicks).padStart(3)}  imp=${String(r.impressions).padStart(5)}  ctr=${(r.ctr * 100).toFixed(1)}%  pos=${r.position.toFixed(1)}`);
};

console.log(`\n# Top 10 queries (CUR window)`);
printRows(await top("query", CUR));
console.log(`\n# Top 10 pages (CUR window)`);
printRows(await top("page", CUR), true);

// Watch items
const pageFilter = (expr) => ({
  dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: expr }] }],
});
const filteredTotals = async (expr, w) =>
  (await q({ startDate: w.s, endDate: w.e, dimensions: [], ...pageFilter(expr) }))[0]
  || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

console.log(`\n# Watch items (CUR vs PREV window)`);
for (const [label, expr] of [
  ["/hi/ aggregate", "/hi/"],
  ["hi jabalpur/june", "/hi/destination/jabalpur/june"],
  ["en varkala/june", "/en/destination/varkala/june"],
  ["en mahabaleshwar/june", "/en/destination/mahabaleshwar/june"],
]) {
  const [c, p] = await Promise.all([filteredTotals(expr, CUR), filteredTotals(expr, PREV)]);
  console.log(`${label.padEnd(24)}  CUR ${fmtT(c)}`);
  console.log(`${"".padEnd(24)}  PRV ${fmtT(p)}`);
}
