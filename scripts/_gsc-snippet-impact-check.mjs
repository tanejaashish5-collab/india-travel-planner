#!/usr/bin/env node
/* eslint-disable no-console */
// One-off: compare CTR/impressions/clicks/position for the snippet-rewrite
// target queries — POST-rewrite window vs PRE-rewrite window.
//
// Snippet rewrites shipped: 2026-04-27
// Today: 2026-06-22 (56d post-deploy)
// Pre-window:  2026-03-30 → 2026-04-26 (28d before deploy)
// Post-window: 2026-05-25 → 2026-06-22 (most recent 28d)
//
// Borrows the OAuth refresh-token client from data-pull.mjs's pattern.

import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });
dotenvConfig({ path: path.join(ROOT, ".env.local") });

const GSC_SITE_URL = process.env.GSC_SITE_URL;
if (!GSC_SITE_URL) {
  console.error("ERR: GSC_SITE_URL not set");
  process.exit(1);
}

const clientJson = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
const refreshToken =
  process.env.GSC_OAUTH_REFRESH_TOKEN ||
  readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();

const { google } = await import("googleapis");
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

const TARGETS = [
  "vrindavan temperature in may",
  "yercaud weather in may",
  "chakrata temperature in may",
  "kanatal in may",
  "pondicherry weather in may",
  "darjeeling june weather",
];

async function pullForQuery(q, startDate, endDate) {
  const { data } = await gsc.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 1,
      dimensionFilterGroups: [
        {
          filters: [{ dimension: "query", operator: "equals", expression: q }],
        },
      ],
    },
  });
  const r = data.rows?.[0];
  return r
    ? {
        impressions: r.impressions ?? 0,
        clicks: r.clicks ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      }
    : { impressions: 0, clicks: 0, ctr: 0, position: 0 };
}

const PRE_START = "2026-03-30";
const PRE_END = "2026-04-26";
const POST_START = "2026-05-25";
const POST_END = "2026-06-22";

console.log(`GSC snippet-rewrite impact check — deploy 2026-04-27`);
console.log(`PRE  window: ${PRE_START} → ${PRE_END}`);
console.log(`POST window: ${POST_START} → ${POST_END}\n`);

const cols = [
  "Query".padEnd(38),
  "Impr pre".padStart(9),
  "Impr post".padStart(10),
  "Clk pre".padStart(8),
  "Clk post".padStart(9),
  "CTR pre".padStart(8),
  "CTR post".padStart(9),
  "Pos pre".padStart(8),
  "Pos post".padStart(9),
];
console.log(cols.join(" | "));
console.log("-".repeat(cols.join(" | ").length));

for (const q of TARGETS) {
  const pre = await pullForQuery(q, PRE_START, PRE_END);
  const post = await pullForQuery(q, POST_START, POST_END);
  const row = [
    q.padEnd(38),
    String(pre.impressions).padStart(9),
    String(post.impressions).padStart(10),
    String(pre.clicks).padStart(8),
    String(post.clicks).padStart(9),
    (pre.ctr * 100).toFixed(2).padStart(7) + "%",
    (post.ctr * 100).toFixed(2).padStart(8) + "%",
    pre.position.toFixed(1).padStart(8),
    post.position.toFixed(1).padStart(9),
  ];
  console.log(row.join(" | "));
}
