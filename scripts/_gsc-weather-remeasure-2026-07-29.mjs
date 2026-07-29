#!/usr/bin/env node
// Re-measure the 2026-07-15 weather-SEO pass (23 title/meta overrides + the
// MonthWeather body section) against a matched pre/post window.
// Read-only — searchanalytics.query only.
//
// Deploy landed 2026-07-15. GSC lags ~2 days.
//   POST = 2026-07-16 .. 2026-07-27 (12d, after)
//   PRE  = 2026-07-03 .. 2026-07-14 (12d, before, same length)
// Caveat baked into the report: Google re-crawls titles on its own schedule,
// so a 12-day post window UNDERSTATES a title change that hasn't propagated
// to every page yet. Positions are the honest control.
import path from "node:path";
import { readFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
config({ path: path.join(ROOT, ".env.local") });

const { google } = await import("googleapis");
const raw = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const client = raw.installed || raw.web;
const refreshToken =
  process.env.GSC_OAUTH_REFRESH_TOKEN ||
  readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const siteUrl = process.env.GSC_SITE_URL;

const PRE = { startDate: "2026-07-03", endDate: "2026-07-14" };
const POST = { startDate: "2026-07-16", endDate: "2026-07-27" };

// The 23 dest×month pages overridden on 07-15 (content_reviewed_at = 2026-07-15).
const MONTHS = ["", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"];
const TARGETS = [
  ["chandigarh", 7], ["coonoor", 7], ["darjeeling", 8], ["dhauli", 1], ["hampi", 8],
  ["kedarnath", 9], ["kolkata", 8], ["kukke-subramanya", 7], ["landour", 7], ["landour", 8],
  ["mahabaleshwar", 7], ["manali", 10], ["matheran", 7], ["mussoorie", 7], ["nashik", 8],
  ["pawapuri", 6], ["siliguri", 7], ["somnath", 7], ["somnath", 8], ["vagamon", 7],
  ["varanasi", 10], ["varkala", 7], ["wayanad", 7],
].map(([id, m]) => `/destination/${id}/${MONTHS[m]}`);

async function q(body) {
  const r = await gsc.searchanalytics.query({ siteUrl, requestBody: body });
  return r.data.rows || [];
}

function agg(rows) {
  let imp = 0, clicks = 0, posW = 0;
  for (const r of rows) { imp += r.impressions; clicks += r.clicks; posW += r.position * r.impressions; }
  return { imp, clicks, ctr: imp ? (clicks / imp) * 100 : 0, pos: imp ? posW / imp : 0, rows: rows.length };
}

const fmt = (a) =>
  `imp ${a.imp.toLocaleString()} · clicks ${a.clicks} · CTR ${a.ctr.toFixed(2)}% · pos ${a.pos.toFixed(1)} · rows ${a.rows}`;

// ── 1. Whole "weather" query cluster, site-wide ──────────────────────────
const weatherFilter = {
  dimensionFilterGroups: [
    { filters: [{ dimension: "query", operator: "contains", expression: "weather" }] },
  ],
};
const [preW, postW] = await Promise.all([
  q({ ...PRE, dimensions: ["query", "page"], rowLimit: 25000, ...weatherFilter }),
  q({ ...POST, dimensions: ["query", "page"], rowLimit: 25000, ...weatherFilter }),
]);
console.log("## 1. Site-wide 'weather' query cluster (matched 12-day windows)");
console.log("PRE  07-03..07-14:", fmt(agg(preW)));
console.log("POST 07-16..07-27:", fmt(agg(postW)));

// ── 2. Only the 23 overridden pages (all their queries, not just weather) ─
const isTarget = (p) => TARGETS.some((t) => p.includes(t));
const [prePages, postPages] = await Promise.all([
  q({ ...PRE, dimensions: ["page"], rowLimit: 25000 }),
  q({ ...POST, dimensions: ["page"], rowLimit: 25000 }),
]);
const preT = prePages.filter((r) => isTarget(r.keys[0]));
const postT = postPages.filter((r) => isTarget(r.keys[0]));
console.log("\n## 2. The 23 overridden dest×month pages (ALL queries)");
console.log("PRE :", fmt(agg(preT)));
console.log("POST:", fmt(agg(postT)));

// ── 3. Per-page detail, sorted by post impressions ───────────────────────
const key = (r) => r.keys[0].replace(siteUrl || "", "").replace(/^https:\/\/[^/]+/, "");
const preMap = new Map(preT.map((r) => [key(r), r]));
const postMap = new Map(postT.map((r) => [key(r), r]));
const allKeys = [...new Set([...preMap.keys(), ...postMap.keys()])];
allKeys.sort((a, b) => (postMap.get(b)?.impressions ?? 0) - (postMap.get(a)?.impressions ?? 0));
console.log("\n## 3. Per-page (pre → post)");
console.log("page\tpreImp\tpostImp\tpreClk\tpostClk\tprePos\tpostPos\tpreCTR%\tpostCTR%");
for (const k of allKeys) {
  const a = preMap.get(k), b = postMap.get(k);
  const ctr = (r) => (r && r.impressions ? ((r.clicks / r.impressions) * 100).toFixed(1) : "—");
  console.log(
    [k, a?.impressions ?? 0, b?.impressions ?? 0, a?.clicks ?? 0, b?.clicks ?? 0,
      a ? a.position.toFixed(1) : "—", b ? b.position.toFixed(1) : "—", ctr(a), ctr(b)].join("\t"),
  );
}

// ── 4. Control: all OTHER dest×month pages (did the whole class move?) ───
const isDestMonth = (p) => /\/destination\/[^/]+\/(january|february|march|april|may|june|july|august|september|october|november|december)$/.test(p);
const preC = prePages.filter((r) => isDestMonth(r.keys[0]) && !isTarget(r.keys[0]));
const postC = postPages.filter((r) => isDestMonth(r.keys[0]) && !isTarget(r.keys[0]));
console.log("\n## 4. CONTROL — every other dest×month page");
console.log("PRE :", fmt(agg(preC)));
console.log("POST:", fmt(agg(postC)));

// ── 5. Trek pages (the km-led title change shipped the same day) ─────────
const isTrek = (p) => p.includes("/treks/");
console.log("\n## 5. Trek pages (km-led titles, same deploy)");
console.log("PRE :", fmt(agg(prePages.filter((r) => isTrek(r.keys[0])))));
console.log("POST:", fmt(agg(postPages.filter((r) => isTrek(r.keys[0])))));
