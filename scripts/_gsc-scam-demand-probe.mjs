#!/usr/bin/env node
/* eslint-disable no-console */
// READ-ONLY probe: does NakshIQ's existing trust/scam content get any search demand?
// Run from project root via `node --env-file=apps/web/.env.local`.

import path from "node:path";
import { readFileSync } from "node:fs";
import { google } from "googleapis";

const ROOT = "/Users/ashishtaneja/Desktop/India Travel Planner";
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

const end = new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10);
const start = new Date(Date.now() - 31 * 864e5).toISOString().slice(0, 10);
console.log(`SITE=${SITE_URL}  window=${start}..${end}\n`);

async function q(body) {
  const res = await gsc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate: start, endDate: end, rowLimit: 25, ...body },
  });
  return res.data.rows ?? [];
}

// 1. Our trust pages — do they get impressions at all?
console.log("=== 1. PAGE PERFORMANCE: our existing trust pages ===");
for (const p of ["/en/guide/scams", "/en/tourist-traps"]) {
  const rows = await q({
    dimensions: ["page"],
    dimensionFilterGroups: [
      { filters: [{ dimension: "page", operator: "contains", expression: p }] },
    ],
  });
  if (!rows.length) console.log(`${p}: ZERO impressions in window`);
  for (const r of rows) {
    console.log(
      `${r.keys[0]}\n   clicks=${r.clicks} impressions=${r.impressions} ctr=${(r.ctr * 100).toFixed(2)}% pos=${r.position.toFixed(1)}`,
    );
  }
}

// 2. Top queries landing on those pages
console.log("\n=== 2. QUERIES reaching /guide/scams ===");
const sq = await q({
  dimensions: ["query"],
  dimensionFilterGroups: [
    { filters: [{ dimension: "page", operator: "contains", expression: "/guide/scams" }] },
  ],
});
if (!sq.length) console.log("(none)");
for (const r of sq)
  console.log(
    `  ${r.keys[0]} — clicks=${r.clicks} impr=${r.impressions} pos=${r.position.toFixed(1)}`,
  );

// 3. Site-wide: ANY query containing "scam" — is there demand we're visible for?
console.log("\n=== 3. SITE-WIDE queries containing 'scam' ===");
const scamQ = await q({
  dimensions: ["query", "page"],
  dimensionFilterGroups: [
    { filters: [{ dimension: "query", operator: "contains", expression: "scam" }] },
  ],
});
if (!scamQ.length) console.log("(none — we surface for NO scam query)");
for (const r of scamQ)
  console.log(
    `  "${r.keys[0]}" → ${r.keys[1]}\n     clicks=${r.clicks} impr=${r.impressions} pos=${r.position.toFixed(1)}`,
  );

// 4. Trust-adjacent vocabulary
console.log("\n=== 4. SITE-WIDE trust-adjacent queries (safe/safety/tout/fake/cheat) ===");
for (const term of ["safe", "safety", "tout", "fake", "cheat", "fraud"]) {
  const rows = await q({
    dimensions: ["query"],
    rowLimit: 5,
    dimensionFilterGroups: [
      { filters: [{ dimension: "query", operator: "contains", expression: term }] },
    ],
  });
  const tot = rows.reduce((a, r) => a + r.impressions, 0);
  const clicks = rows.reduce((a, r) => a + r.clicks, 0);
  console.log(
    `  "${term}": ${rows.length} queries, ${tot} impressions, ${clicks} clicks` +
      (rows[0] ? `  top="${rows[0].keys[0]}" (impr ${rows[0].impressions}, pos ${rows[0].position.toFixed(1)})` : ""),
  );
}
