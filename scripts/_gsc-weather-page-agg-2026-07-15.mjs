#!/usr/bin/env node
// Aggregate 28d weather-query demand BY PAGE → top targets for the
// title/meta override pass. Writes JSON for the override generator.
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const { google } = await import("googleapis");
const raw = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const client = raw.installed || raw.web;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN || readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const siteUrl = process.env.GSC_SITE_URL;

const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
const r = await gsc.searchanalytics.query({ siteUrl, requestBody: {
  startDate: start, endDate: end, dimensions: ["query", "page"], rowLimit: 25000,
  dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "contains", expression: "weather" }] }],
}});
const rows = r.data.rows || [];

const byPage = new Map();
for (const row of rows) {
  const page = row.keys[1].replace("https://www.nakshiq.com", "");
  const a = byPage.get(page) || { page, impressions: 0, clicks: 0, posW: 0, queries: [] };
  a.impressions += row.impressions; a.clicks += row.clicks;
  a.posW += row.position * row.impressions;
  a.queries.push({ q: row.keys[0], imp: row.impressions, clicks: row.clicks, pos: +row.position.toFixed(1) });
  byPage.set(page, a);
}
const agg = [...byPage.values()].map(a => ({
  ...a, avgPos: +(a.posW / a.impressions).toFixed(1),
  queries: a.queries.sort((x, y) => y.imp - x.imp).slice(0, 5),
})).sort((a, b) => b.impressions - a.impressions);

// dest×month pages only (the override system lives on destination_months)
const dm = agg.filter(a => /^\/(en|hi)\/destination\/[^/]+\/[a-z]+$/.test(a.page));
writeFileSync(path.join(ROOT, "data", "seo", "weather-demand-pages-2026-07-15.json"),
  JSON.stringify({ generated: "2026-07-15", window: `${start}..${end}`,
    totals: { rows: rows.length, impressions: rows.reduce((s, x) => s + x.impressions, 0), clicks: rows.reduce((s, x) => s + x.clicks, 0) },
    all_pages_top60: agg.slice(0, 60), dest_month_top50: dm.slice(0, 50) }, null, 2));

console.log(`pages total=${agg.length}, dest×month=${dm.length}`);
console.log("top 45 dest×month by weather impressions:");
for (const a of dm.slice(0, 45))
  console.log(`${String(a.impressions).padStart(5)} imp  ${String(a.clicks).padStart(2)} cl  pos ${a.avgPos}  ${a.page}`);
