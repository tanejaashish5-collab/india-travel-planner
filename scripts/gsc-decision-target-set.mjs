#!/usr/bin/env node
/**
 * gsc-decision-target-set.mjs — build the DECISION-INTENT ranking target set.
 *
 * WHY THIS EXISTS (2026-09-20)
 * ----------------------------
 * A 28d GSC split by intent class showed that a top-3 ranking is worth ~5x more
 * on a decision query than on a place-name or weather query, and that within
 * decision queries CTR collapses 13.6x between position 1-3 (4.49%) and 6-10
 * (0.33%). Weather (33.5% of impressions) and bare place names (30.9%) are
 * structurally zero-click — Google answers them in the SERP itself, and on bare
 * place names MakeMyTrip/Tripadvisor hold the organic top spots.
 *
 * So the only pool where moving position pays is decision-intent queries
 * currently stuck at positions 6-10. This script pins that cohort down as a
 * NAMED, FROZEN target set with a pre-registered baseline, per the repo's
 * "pick the Northstar BEFORE building" rule — a post-hoc metric can always be
 * argued with, a pre-registered one cannot.
 *
 * Read-only: searchanalytics.query only. Writes a .json to gsc-audits/.
 *
 * Usage:
 *   node --env-file=apps/web/.env.local scripts/gsc-decision-target-set.mjs
 *   node --env-file=apps/web/.env.local scripts/gsc-decision-target-set.mjs --measure
 */
import path from "node:path";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
const { google } = await import("googleapis");

const rawClient = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const cl = rawClient.installed || rawClient.web;
const oauth2 = new google.auth.OAuth2(cl.client_id, cl.client_secret);
oauth2.setCredentials({
  refresh_token: process.env.GSC_OAUTH_REFRESH_TOKEN
    || readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim(),
});
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }

const MEASURE = process.argv.includes("--measure");
const FROZEN = path.join(ROOT, "gsc-audits", "decision-target-set-2026-09-20.json");
const SEP = "~||~";

// ---- intent classification -------------------------------------------------
// Deliberately conservative and ordered: WEATHER wins over everything (a weather
// query is zero-click even when it also names a month), then DECISION.
const WEATHER = /weather|temperature|मौसम|तापमान|forecast|climate|rainfall/i;
const DECISION = /\bvs\b|versus|which is better|better than|worth it|should i|best time|itinerary|\d+\s*day|cost|budget|kharch|खर्च|kitna|how many days|safe for|with kids|for family/i;
const classify = (q) => (WEATHER.test(q) ? "weather" : DECISION.test(q) ? "decision" : "place/other");

const win = (endISO, days) => {
  const e = new Date(endISO + "T00:00:00Z");
  const s = new Date(e.getTime() - (days - 1) * 864e5);
  return { startDate: s.toISOString().slice(0, 10), endDate: endISO };
};

// freshest date with data
const probe = (await gsc.searchanalytics.query({ siteUrl, requestBody: {
  startDate: new Date(Date.now() - 16 * 864e5).toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10), dimensions: ["date"] } })).data.rows || [];
const freshest = probe.map(r => r.keys[0]).sort().pop();
const W = win(freshest, 28);
console.log(`# window ${W.startDate} .. ${W.endDate} (freshest GSC date: ${freshest})`);

const rows = (await gsc.searchanalytics.query({ siteUrl, requestBody: {
  ...W, dimensions: ["query", "page"], rowLimit: 25000 } })).data.rows || [];
console.log(`# query x page rows: ${rows.length}`);

const strip = (u) => u.replace(/^https?:\/\/[^/]+/, "");

if (!MEASURE) {
  // ---- BUILD: freeze the cohort -------------------------------------------
  const target = rows
    .filter((r) => classify(r.keys[0]) === "decision")
    .filter((r) => r.position > 5 && r.position <= 10)
    .map((r) => ({ query: r.keys[0], page: strip(r.keys[1]),
                   impressions: r.impressions, clicks: r.clicks, position: +r.position.toFixed(1) }))
    .sort((a, b) => b.impressions - a.impressions);

  const tI = target.reduce((a, r) => a + r.impressions, 0);
  const tC = target.reduce((a, r) => a + r.clicks, 0);

  // reference CTR the cohort would earn at top-3, measured on THIS site — not
  // an industry benchmark, so it cannot be argued away as someone else's data.
  const d13 = rows.filter((r) => classify(r.keys[0]) === "decision" && r.position <= 3);
  const ctr13 = d13.reduce((a, r) => a + r.clicks, 0) / d13.reduce((a, r) => a + r.impressions, 0);

  // group by page so the work is actionable per URL
  const byPage = {};
  for (const t of target) {
    byPage[t.page] ??= { page: t.page, queries: 0, impressions: 0, clicks: 0, posW: 0, topQueries: [] };
    const p = byPage[t.page];
    p.queries++; p.impressions += t.impressions; p.clicks += t.clicks; p.posW += t.position * t.impressions;
    if (p.topQueries.length < 3) p.topQueries.push(t.query);
  }
  const pages = Object.values(byPage)
    .map(({ posW, ...p }) => ({ ...p, avgPosition: +(posW / p.impressions).toFixed(1) }))
    .sort((a, b) => b.impressions - a.impressions);

  const frozen = {
    createdAt: new Date().toISOString(),
    window: W,
    definition: `decision-intent queries at GSC position 5.1-10.0 in the 28d window ending ${W.endDate}`,
    baseline: {
      queries: target.length, pages: pages.length, impressions: tI, clicks: tC,
      ctr: +(100 * tC / tI).toFixed(3),
      avgPosition: +(target.reduce((a, r) => a + r.position * r.impressions, 0) / tI).toFixed(2),
    },
    reference: {
      decisionTop3Ctr: +(100 * ctr13).toFixed(2),
      clicksIfCohortReachedTop3: Math.round(tI * ctr13),
    },
    preRegistered: {
      target: "clicks >= 100 AND avg position <= 4.5",
      by: "2026-11-15",
      note: "A miss is a finding, not a failure: it would mean position is not the binding constraint on this cohort, and the next hypothesis is query-level demand seasonality.",
    },
    targets: target,
    pages,
  };
  writeFileSync(FROZEN, JSON.stringify(frozen, null, 2));
  console.log(`\n# FROZEN target set -> ${path.relative(ROOT, FROZEN)}`);
  console.log(`#   ${target.length} query x page rows across ${pages.length} pages`);
  console.log(`#   baseline: ${tI} impressions, ${tC} clicks, CTR ${frozen.baseline.ctr}%, avg pos ${frozen.baseline.avgPosition}`);
  console.log(`#   at this site's own decision top-3 CTR (${frozen.reference.decisionTop3Ctr}%) the cohort = ${frozen.reference.clicksIfCohortReachedTop3} clicks/28d`);

  console.log(`\n# Top 25 target pages by impressions`);
  console.log(`  imp   clk   pos  queries  page`);
  for (const p of pages.slice(0, 25))
    console.log(`${String(p.impressions).padStart(5)} ${String(p.clicks).padStart(5)} ${String(p.avgPosition).padStart(5)} ${String(p.queries).padStart(8)}  ${p.page}`);
} else {
  // ---- MEASURE: re-score the frozen cohort --------------------------------
  if (!existsSync(FROZEN)) { console.error(`ERR: no frozen set at ${FROZEN}`); process.exit(1); }
  const frozen = JSON.parse(readFileSync(FROZEN, "utf8"));
  const key = new Set(frozen.targets.map((t) => t.query + SEP + t.page));
  let i = 0, c = 0, posW = 0, found = 0;
  for (const r of rows) {
    if (!key.has(r.keys[0] + SEP + strip(r.keys[1]))) continue;
    found++; i += r.impressions; c += r.clicks; posW += r.position * r.impressions;
  }
  const b = frozen.baseline;
  const pct = (a, z) => (z === 0 ? "n/a" : `${a > z ? "+" : ""}${(100 * (a - z) / z).toFixed(1)}%`);
  console.log(`\n# COHORT RE-MEASURE (frozen ${frozen.window.startDate}..${frozen.window.endDate})`);
  console.log(`# rows still present: ${found} / ${frozen.targets.length}`);
  console.log(`metric        baseline        now        delta`);
  console.log(`impressions ${String(b.impressions).padStart(10)} ${String(i).padStart(10)}  ${pct(i, b.impressions)}`);
  console.log(`clicks      ${String(b.clicks).padStart(10)} ${String(c).padStart(10)}  ${pct(c, b.clicks)}`);
  console.log(`CTR         ${String(b.ctr + "%").padStart(10)} ${String((100 * c / i).toFixed(3) + "%").padStart(10)}`);
  console.log(`avg pos     ${String(b.avgPosition).padStart(10)} ${String((posW / i).toFixed(2)).padStart(10)}  (lower is better)`);
  console.log(`\n# PRE-REGISTERED TARGET: ${frozen.preRegistered.target} by ${frozen.preRegistered.by}`);
}
