#!/usr/bin/env node
// One-shot: top queries per July-cohort candidate page (read-only, searchanalytics.query).
// Anchors in high-impression-pages.ts must mirror the GSC query verbatim.
import path from "node:path";
import { readFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const { google } = await import("googleapis");
const client = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8")).installed
  || JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8")).web;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN
  || readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const siteUrl = process.env.GSC_SITE_URL;

const WIN = { s: "2026-06-17", e: "2026-06-30" };
const PAGES = [
  "/en/destination/wayanad/july",
  "/en/destination/landour/july",
  "/en/destination/mussoorie/july",
  "/en/destination/jaipur/july",
  "/en/destination/dwarka/july",
  "/en/destination/trimbakeshwar/july",
  "/hi/destination/chandratal",
  "/en/destination/shrikhand-mahadev",
];

for (const p of PAGES) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: WIN.s, endDate: WIN.e, dimensions: ["query"], rowLimit: 3,
      dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "equals", expression: `https://www.nakshiq.com${p}` }] }],
    },
  });
  console.log(`\n${p}`);
  for (const row of r.data.rows ?? []) {
    console.log(`  "${row.keys[0]}"  imp ${row.impressions}  pos ${row.position.toFixed(1)}`);
  }
}
