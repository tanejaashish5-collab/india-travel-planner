#!/usr/bin/env node
// One-shot GSC property-level summary pull for 2026-06-02 audit.
// Pulls 7d totals (current + prior), top 10 queries, top 10 pages.
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

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

// GSC has ~2 day lag — go from -9 to -2 for a 7d window
const endDate = daysAgo(2);
const startDate = daysAgo(9);
const priorEndDate = daysAgo(10);
const priorStartDate = daysAgo(17);

async function totals(s, e) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: s, endDate: e, dimensions: [] },
  });
  return r.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

async function topBy(dim, s, e, n = 10) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: s, endDate: e, dimensions: [dim], rowLimit: n },
  });
  return r.data.rows || [];
}

const cur = await totals(startDate, endDate);
const prior = await totals(priorStartDate, priorEndDate);
const queries = await topBy("query", startDate, endDate, 10);
const pages = await topBy("page", startDate, endDate, 10);

console.log(`SITE ${siteUrl}`);
console.log(`# GSC property summary — current ${startDate} → ${endDate} | prior ${priorStartDate} → ${priorEndDate}`);
console.log(`Clicks       cur=${cur.clicks}        prior=${prior.clicks}      Δ=${cur.clicks - prior.clicks}`);
console.log(`Impressions  cur=${cur.impressions}   prior=${prior.impressions} Δ=${cur.impressions - prior.impressions}`);
console.log(`CTR          cur=${(cur.ctr * 100).toFixed(2)}%   prior=${(prior.ctr * 100).toFixed(2)}%`);
console.log(`Position     cur=${cur.position.toFixed(1)}        prior=${prior.position.toFixed(1)}`);
console.log("");
console.log(`# Top 10 queries`);
for (const r of queries) {
  console.log(`${(r.keys[0] || "").padEnd(46)}  clk=${String(r.clicks).padStart(3)}  imp=${String(r.impressions).padStart(5)}  ctr=${(r.ctr*100).toFixed(1)}%  pos=${r.position.toFixed(1)}`);
}
console.log("");
console.log(`# Top 10 pages`);
for (const r of pages) {
  console.log(`${(r.keys[0] || "").replace(siteUrl, "/").padEnd(52)}  clk=${String(r.clicks).padStart(3)}  imp=${String(r.impressions).padStart(5)}  ctr=${(r.ctr*100).toFixed(1)}%  pos=${r.position.toFixed(1)}`);
}
