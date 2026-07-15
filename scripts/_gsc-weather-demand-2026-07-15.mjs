#!/usr/bin/env node
// One-shot: pull the full "weather" search-demand surface from GSC so the
// weather-content editorial pass works from real data (not the top-10 sample).
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

// 1) all queries containing "weather", 28d, WITH the page each serves
console.log(`\n## QUERY+PAGE containing "weather" (28d, ${startBack(28)}..${end})`);
const rows = await q({
  startDate: startBack(28), endDate: end, dimensions: ["query", "page"], rowLimit: 25000,
  dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "contains", expression: "weather" }] }],
});
rows.sort((a, b) => b.impressions - a.impressions);
console.log("impr\tclicks\tpos\tquery\tpage");
for (const r of rows.slice(0, 80))
  console.log(`${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}\t${r.keys[0]}\t${r.keys[1].replace(siteUrl || "", "")}`);
console.log(`(total weather query+page rows: ${rows.length}, sum impr ${rows.reduce((s, r) => s + r.impressions, 0)}, sum clicks ${rows.reduce((s, r) => s + r.clicks, 0)})`);

// 2) wayanad/july + girnar pages: their full query sets (title/snippet work)
for (const expr of ["/destination/wayanad/july", "girnar"]) {
  console.log(`\n## ${expr} — top queries (28d)`);
  const body = expr.startsWith("/")
    ? { startDate: startBack(28), endDate: end, dimensions: ["query"], rowLimit: 100,
        dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: expr }] }] }
    : { startDate: startBack(28), endDate: end, dimensions: ["query", "page"], rowLimit: 100,
        dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "contains", expression: expr }] }] };
  const rs = await q(body);
  rs.sort((a, b) => b.impressions - a.impressions);
  for (const r of rs.slice(0, 20))
    console.log(`${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}\t${r.keys.join("\t").replace(siteUrl || "", "")}`);
}
