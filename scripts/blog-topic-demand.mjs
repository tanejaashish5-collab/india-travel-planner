#!/usr/bin/env node
// blog-topic-demand.mjs — snapshot of real GSC demand, bucketed into the
// weekly blog batch's 4 lanes, written to data/seo/blog-topic-demand.json.
//
// Why: the cloud blog routine cannot reach GSC (.secrets is gitignored), and
// the daily audits only list top-10 queries, so it kept picking the same
// "is X in <month> worth it" topic. This file gives it the long tail per lane.
//
// Lanes (mix decided 2026-09-27 from 28d/90d GSC). No itinerary lane: those
// queries already land on /itinerary/<dest> pages, so a blog would cannibalise.
//   month_verdict        — "<dest> in/weather <month>" for the NEXT 3 months (lead time)
//   distance_difficulty  — km / steps / how hard / how long (treks, parikramas, routes)
//   hindi_cost           — घूमने का खर्च / kharcha / budget queries
//
// Run locally (monthly is enough):
//   node scripts/blog-topic-demand.mjs
// Read-only: searchanalytics.query only.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local"), quiet: true });
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }
const sd = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const cj = JSON.parse(readFileSync(path.join(sd, "gsc-oauth-client.json"), "utf8"));
const cfg = cj.web ?? cj.installed ?? cj.desktop;
const rt = process.env.GSC_OAUTH_REFRESH_TOKEN ?? readFileSync(path.join(sd, "gsc-refresh-token.txt"), "utf8").trim();
const { google } = await import("googleapis");
const o = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
o.setCredentials({ refresh_token: rt });
const gsc = google.searchconsole({ version: "v1", auth: o });

const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 90);

const MONTHS = ["january", "february", "march", "april", "may", "june", "july",
  "august", "september", "october", "november", "december"];
const now = new Date();
const target = [1, 2, 3].map((k) => MONTHS[(now.getMonth() + k) % 12]);
const monthRe = new RegExp(`\\b(${target.join("|")}|${target.map((m) => m.slice(0, 3)).join("|")})\\b`);

const LANES = {
  hindi_cost: (q) => /खर्च|kharch|kharcha|budget|कितना|cost of|trip cost|total cost/.test(q),
  distance_difficulty: (q) => /\b(km|kms|distance|steps|kitni|difficulty|difficult|treks?|trekking|hikes?|hiking|parikrama|climb|altitude|height)\b|how long|how many|how hard/.test(q),
  month_verdict: (q) => monthRe.test(q),
};

const rows = [];
for (let startRow = 0; startRow < 75000; startRow += 25000) {
  const { data } = await gsc.searchanalytics.query({ siteUrl: SITE_URL, requestBody: {
    startDate: iso(start), endDate: iso(end), dimensions: ["query", "page"], rowLimit: 25000, startRow } });
  rows.push(...(data.rows ?? []));
  if ((data.rows ?? []).length < 25000) break;
}

const norm = (q) => q.toLowerCase().replace(/\b20\d\d\b/g, "").replace(/\s+/g, " ").trim();
const out = {};
for (const lane of Object.keys(LANES)) out[lane] = new Map();
for (const r of rows) {
  const [query, page] = r.keys;
  const q = norm(query);
  const lane = Object.keys(LANES).find((l) => LANES[l](q));
  if (!lane) continue;
  const m = out[lane];
  const e = m.get(q) ?? { query: q, impressions: 0, clicks: 0, posSum: 0, pages: {} };
  e.impressions += r.impressions; e.clicks += r.clicks; e.posSum += r.position * r.impressions;
  const p = page.replace(/^https?:\/\/[^/]+/, "");
  e.pages[p] = (e.pages[p] ?? 0) + r.impressions;
  m.set(q, e);
}

const result = {
  generated: iso(now),
  window: { start: iso(start), end: iso(end) },
  month_verdict_targets: target,
  note: "Candidates only. The routine must still check the articles table + data/blog-drafts/ for an existing angle, grep vs-pairs for comparisons, and ground every claim in DB rows. blog_ranks=true means a /blog/ page already gets impressions for this query: skip unless the new article is a clearly different question.",
  lanes: {},
};
for (const [lane, m] of Object.entries(out)) {
  result.lanes[lane] = [...m.values()]
    .filter((e) => e.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 60)
    .map((e) => {
      const pages = Object.entries(e.pages).sort((a, b) => b[1] - a[1]);
      return {
        query: e.query,
        impressions: e.impressions,
        clicks: e.clicks,
        avg_position: +(e.posSum / e.impressions).toFixed(1),
        top_page: pages[0][0],
        blog_ranks: pages.some(([p]) => p.includes("/blog/")),
      };
    });
}
const file = path.join(ROOT, "data", "seo", "blog-topic-demand.json");
writeFileSync(file, JSON.stringify(result, null, 2) + "\n");
for (const [lane, list] of Object.entries(result.lanes)) {
  const open = list.filter((x) => !x.blog_ranks);
  console.log(`${lane}: ${list.length} candidates (${open.length} with no blog ranking), top: ${open.slice(0, 4).map((x) => `${x.query} [${x.impressions}]`).join(" · ")}`);
}
console.log(`wrote ${path.relative(ROOT, file)}`);
