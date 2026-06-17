#!/usr/bin/env node
/* eslint-disable no-console */
// One-off: did the Apr 27 snippet rewrite move CTR on the target queries?
// Compares pre-deploy window (Mar 30 – Apr 26, 28d before Apr 27) vs the most
// recent stable post-deploy window (May 18 – Jun 14, 28d ending yesterday).
// Run from project root via `node --env-file=apps/web/.env.local`.

import path from "node:path";
import { readFileSync } from "node:fs";
import { google } from "googleapis";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) {
  console.error("ERR: GSC_SITE_URL not set");
  process.exit(1);
}

const oauthClientPath = path.join(ROOT, ".secrets", "gsc-oauth-client.json");
const tokenPath = path.join(ROOT, ".secrets", "gsc-refresh-token.txt");
const clientJson = JSON.parse(readFileSync(oauthClientPath, "utf8"));
const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
const refreshToken =
  process.env.GSC_OAUTH_REFRESH_TOKEN || readFileSync(tokenPath, "utf8").trim();
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });

// The 6 target queries cited in the scheduled task.
const QUERIES = [
  "vrindavan temperature in may",
  "yercaud weather in may",
  "chakrata temperature in may",
  "kanatal in may",
  "pondicherry weather in may",
  "darjeeling june weather",
];

// Pre-deploy: 28 days before Apr 27 (Mar 30 – Apr 26).
// Post-deploy: most-recent 28 days ending today-1 (May 18 – Jun 14, today=Jun 15).
const WINDOWS = [
  { label: "PRE  (Mar 30 – Apr 26)", startDate: "2026-03-30", endDate: "2026-04-26" },
  { label: "POST (May 18 – Jun 14)", startDate: "2026-05-18", endDate: "2026-06-14" },
];

async function queryRow(q, w) {
  const { data } = await gsc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: w.startDate,
      endDate: w.endDate,
      dimensions: ["query"],
      rowLimit: 1,
      dimensionFilterGroups: [
        {
          filters: [
            { dimension: "query", operator: "equals", expression: q },
          ],
        },
      ],
    },
  });
  return data.rows?.[0] ?? null;
}

function fmtPct(n) {
  return (n * 100).toFixed(2) + "%";
}
function fmtPos(n) {
  return n == null ? "—" : n.toFixed(1);
}
function delta(a, b, asPct = false) {
  if (a == null) return "—";
  const d = b - a;
  const sign = d > 0 ? "+" : "";
  if (asPct) return `${sign}${(d * 100).toFixed(2)}pp`;
  return `${sign}${d.toFixed(1)}`;
}

console.log(`GSC CTR check — Apr 27 snippet rewrite\n`);
console.log(`Property: ${SITE_URL}`);
console.log(`Compare: PRE (Mar 30 – Apr 26, before deploy) vs POST (May 18 – Jun 14)\n`);

for (const q of QUERIES) {
  console.log(`■ "${q}"`);
  const pre = await queryRow(q, WINDOWS[0]);
  const post = await queryRow(q, WINDOWS[1]);
  if (!pre && !post) {
    console.log(`    no GSC data in either window (very low impressions / not surfaced)\n`);
    continue;
  }
  const preCtr = pre ? pre.ctr : null;
  const postCtr = post ? post.ctr : null;
  const preImp = pre?.impressions ?? 0;
  const postImp = post?.impressions ?? 0;
  const preClk = pre?.clicks ?? 0;
  const postClk = post?.clicks ?? 0;
  const prePos = pre?.position ?? null;
  const postPos = post?.position ?? null;
  console.log(`    PRE:   impr=${String(preImp).padStart(5)}  clk=${String(preClk).padStart(4)}  CTR=${preCtr != null ? fmtPct(preCtr) : "—"}    pos=${fmtPos(prePos)}`);
  console.log(`    POST:  impr=${String(postImp).padStart(5)}  clk=${String(postClk).padStart(4)}  CTR=${postCtr != null ? fmtPct(postCtr) : "—"}    pos=${fmtPos(postPos)}`);
  if (preCtr != null && postCtr != null) {
    console.log(`    Δ CTR: ${delta(preCtr, postCtr, true)}   Δ pos: ${delta(prePos, postPos)}   Δ impr: ${(postImp - preImp >= 0 ? "+" : "") + (postImp - preImp)}`);
  }
  console.log("");
}

console.log(`Note: pp = percentage points. Position improvement is a DROP (lower number = higher rank).`);
