#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_mine-vs-queries.mjs — Phase 1 of the /vs/ comparison-page expansion.
//
// Mines Google Search Console for comparison-intent queries (" vs ", " versus ",
// " v/s ", " or ", "height" comparisons) and resolves each side of the query to
// a NakshIQ destination id. Outputs demand-PROVEN /vs/ pair candidates — pairs
// real users already search for — that aren't yet shipped.
//
// Usage:  node scripts/_mine-vs-queries.mjs [windowDays]   (default 90)
// Output: data/cro/vs-demand-<date>.json
//
// Zero LLM. GSC API + string matching only. The GSC OAuth client pattern is
// ported from scripts/data-pull.mjs.

import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  ROOT, loadEnv, today, getSupabase, fetchAll, slugify, levenshtein,
  canonKey, loadExistingPairKeys, fetchTrapPairs, writeJson,
} from "./_vs-lib.mjs";

await loadEnv();

const WINDOW_DAYS = parseInt(process.argv[2] ?? "90", 10);
const GSC_SITE_URL = process.env.GSC_SITE_URL;

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

// ─── GSC OAuth client (ported from scripts/data-pull.mjs) ───────────────────
let _gsc;
async function gsc() {
  if (_gsc) return _gsc;
  if (!GSC_SITE_URL) throw new Error("GSC_SITE_URL not set in .env.local");
  const clientJson = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
  const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
  const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN
    || readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();
  const { google } = await import("googleapis");
  const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  _gsc = google.searchconsole({ version: "v1", auth: oauth2 });
  return _gsc;
}

async function gscQuery({ startDate, endDate, dimensions = ["query"], rowLimit = 5000 }) {
  const client = await gsc();
  const { data } = await client.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: { startDate, endDate, dimensions, rowLimit },
  });
  return data.rows ?? [];
}

// ─── Comparison-intent parsing ──────────────────────────────────────────────
// Split a query on the first comparison token. " or " is noisy but the
// destination-resolution step downstream filters out non-place pairs.
const SEP_RE = /\s+(?:vs\.?|v\/s|versus|or)\s+/i;

const MONTHS = [
  "january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december",
  "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec",
];
// Filler stripped from each side before destination resolution. "height",
// "weather" etc. are dropped so "manali height vs leh height" → manali / leh.
const FILLER = new Set([
  ...MONTHS,
  "2023", "2024", "2025", "2026", "2027", "2028",
  "weather", "temperature", "climate", "tourism", "tourist", "trip", "trips",
  "tour", "tours", "travel", "traveling", "travelling", "better", "which",
  "is", "are", "was", "the", "a", "an", "for", "in", "at", "on", "of", "to",
  "india", "indian", "places", "place", "visit", "visiting", "things", "do",
  "see", "best", "good", "time", "vs", "versus", "or", "comparison", "compare",
  "comparing", "height", "altitude", "distance", "km", "kms", "route", "road",
  "map", "near", "nearby", "honeymoon", "family", "couples", "couple", "kids",
  "solo", "summer", "winter", "monsoon", "season", "holiday", "holidays",
  "vacation", "with", "and", "from", "review", "reviews", "guide", "itinerary",
  "cost", "budget", "price", "how", "what", "where", "more", "worth",
]);

// Clean one side of a comparison query into a slug for destination matching.
function cleanSide(s) {
  const toks = String(s)
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .filter((t) => !FILLER.has(t));
  return toks.join("-");
}

// ─── Destination resolution ─────────────────────────────────────────────────
function buildResolver(dests) {
  const byId = new Set(dests.map((d) => d.id));
  const nameIndex = new Map(); // slug → id
  const nameSlugs = []; // { slug, id } for the levenshtein fallback
  for (const d of dests) {
    const add = (raw) => {
      const sl = slugify(raw);
      if (sl && !nameIndex.has(sl)) nameIndex.set(sl, d.id);
      if (sl) nameSlugs.push({ slug: sl, id: d.id });
    };
    add(d.name);
    // Parenthetical alias: "Ooty (Udagamandalam)" → "ooty" + "udagamandalam".
    const paren = String(d.name || "").match(/^([^(]+?)\s*\(([^)]+)\)/);
    if (paren) { add(paren[1]); add(paren[2]); }
  }
  // Well-known city aliases where the search term differs from the dest id.
  // Resolved BEFORE the levenshtein fallback so "bangalore" → "bengaluru"
  // instead of edit-distance-1 collapsing it to the real "mangalore".
  const SYNONYMS = [
    ["bangalore", "bengaluru"],
    ["calcutta", "kolkata"],
    ["madras", "chennai"],
    ["bombay", "mumbai"],
    ["mysore", "mysuru"],
    ["cochin", "kochi", "ernakulam"],
    ["trivandrum", "thiruvananthapuram"],
    ["vizag", "visakhapatnam", "vishakhapatnam"],
    ["gurgaon", "gurugram"],
    ["pondy", "pondicherry", "puducherry"],
    ["banaras", "benares", "kashi", "varanasi"],
    ["prayagraj", "allahabad"],
  ];
  for (const group of SYNONYMS) {
    const target = group.find((g) => byId.has(g)) || group.map((g) => nameIndex.get(g)).find(Boolean);
    if (!target) continue;
    for (const alias of group) {
      if (!nameIndex.has(alias)) nameIndex.set(alias, target);
    }
  }
  return function resolve(slug) {
    if (!slug || slug.length < 2) return null;
    if (byId.has(slug)) return slug;                       // (a) exact id
    if (nameIndex.has(slug)) return nameIndex.get(slug);   // (b) exact name slug
    // (c) single-token-exact: "leh-ladakh" → "leh" when exactly one token is an id
    const tokenHits = [...new Set(slug.split("-").filter((t) => byId.has(t)))];
    if (tokenHits.length === 1) return tokenHits[0];
    // (d) levenshtein ≤2, unambiguous (runner-up at least 2 worse)
    if (slug.length >= 5) {
      let best = null, bestD = 99, secondD = 99;
      for (const ns of nameSlugs) {
        const d = levenshtein(slug, ns.slug);
        if (d < bestD) { secondD = bestD; bestD = d; best = ns.id; }
        else if (d < secondD) { secondD = d; }
      }
      if (bestD <= 2 && secondD - bestD >= 2) return best;
    }
    return null;
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────
const supabase = await getSupabase();
const dests = await fetchAll(supabase, "destinations", "id, name");
const resolve = buildResolver(dests);

const existing = loadExistingPairKeys();
for (const [a, b] of await fetchTrapPairs(supabase)) {
  existing.add(`${a}-vs-${b}`);
  existing.add(`${b}-vs-${a}`);
}

const start = daysAgo(WINDOW_DAYS);
const end = today();
console.log(`\n━━━ Mining GSC comparison queries — last ${WINDOW_DAYS}d (${start} → ${end}) ━━━`);

let rows = [];
let gscError = null;
try {
  rows = await gscQuery({ startDate: start, endDate: end });
  console.log(`  ${rows.length} total GSC query rows pulled`);
} catch (err) {
  gscError = err.message;
  console.error(`  GSC ERR: ${err.message}`);
  console.error(`  → writing empty demand set; cluster-fill (Phase 2) will carry the expansion.`);
}

// Per-destination GSC impressions — the real popularity signal cluster-fill
// (Phase 2) ranks pairs by, so famous destinations float above obscure ones.
const destDemand = {};
if (!gscError) {
  try {
    const pageRows = await gscQuery({ startDate: start, endDate: end, dimensions: ["page"] });
    const DEST_RE = /\/(?:(?:en|hi)\/)?destination\/([^/?#]+)/i;
    for (const r of pageRows) {
      const m = String(r.keys?.[0] ?? "").match(DEST_RE);
      if (!m) continue;
      const slug = m[1].toLowerCase();
      destDemand[slug] = (destDemand[slug] ?? 0) + (r.impressions ?? 0);
    }
    console.log(`  per-destination demand: ${Object.keys(destDemand).length} destinations carry GSC impressions`);
  } catch (err) {
    console.error(`  page-demand pull failed (cluster-fill will fall back to structural ranking): ${err.message}`);
  }
}

const pairMap = new Map(); // canonKey → aggregate
const unmatched = [];
let comparisonQueries = 0;

for (const r of rows) {
  const q = String(r.keys?.[0] ?? "").toLowerCase().trim();
  if (!SEP_RE.test(q)) continue;
  comparisonQueries++;
  const parts = q.split(SEP_RE);
  if (parts.length < 2) continue;
  const id1 = resolve(cleanSide(parts[0]));
  const id2 = resolve(cleanSide(parts[1]));
  if (!id1 || !id2 || id1 === id2) {
    unmatched.push({ query: q, left: parts[0], right: parts[1] });
    continue;
  }
  const key = canonKey(id1, id2);
  let e = pairMap.get(key);
  if (!e) { e = { id1, id2, gsc_impressions: 0, gsc_clicks: 0, _pw: 0, queries: new Set() }; pairMap.set(key, e); }
  e.gsc_impressions += r.impressions ?? 0;
  e.gsc_clicks += r.clicks ?? 0;
  e._pw += (r.position ?? 0) * (r.impressions ?? 0);
  e.queries.add(q);
}

const candidates = [];
let alreadyShipped = 0;
for (const e of pairMap.values()) {
  if (existing.has(`${e.id1}-vs-${e.id2}`)) { alreadyShipped++; continue; }
  candidates.push({
    id1: e.id1,
    id2: e.id2,
    slug: `${e.id1}-vs-${e.id2}`,
    gsc_impressions: e.gsc_impressions,
    gsc_clicks: e.gsc_clicks,
    gsc_position: e.gsc_impressions ? +(e._pw / e.gsc_impressions).toFixed(1) : 0,
    source_queries: [...e.queries].slice(0, 6),
  });
}
candidates.sort((a, b) => b.gsc_impressions - a.gsc_impressions);

const payload = {
  generated: new Date().toISOString(),
  window_days: WINDOW_DAYS,
  window: { start, end },
  gsc_error: gscError,
  stats: {
    total_query_rows: rows.length,
    comparison_intent_queries: comparisonQueries,
    resolved_pairs: pairMap.size,
    already_shipped: alreadyShipped,
    new_candidates: candidates.length,
    unmatched_queries: unmatched.length,
    destinations_with_demand: Object.keys(destDemand).length,
  },
  destination_demand: destDemand,
  candidates,
  unmatched: unmatched.slice(0, 200),
};

const out = writeJson(`data/cro/vs-demand-${today()}.json`, payload);
console.log(`\n  comparison-intent queries : ${comparisonQueries}`);
console.log(`  resolved to dest pairs    : ${pairMap.size}`);
console.log(`  already shipped (skipped) : ${alreadyShipped}`);
console.log(`  NEW demand candidates     : ${candidates.length}`);
console.log(`  unmatched (couldn't map)  : ${unmatched.length}`);
if (candidates.length) {
  console.log(`\n  Top demand candidates:`);
  for (const c of candidates.slice(0, 12)) {
    console.log(`    ${c.slug.padEnd(44)} ${String(c.gsc_impressions).padStart(5)} impr  "${c.source_queries[0]}"`);
  }
}
console.log(`\n→ wrote ${out}\n`);
