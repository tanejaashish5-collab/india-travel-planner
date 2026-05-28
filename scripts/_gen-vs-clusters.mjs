#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_gen-vs-clusters.mjs — Phase 2 of the /vs/ comparison-page expansion.
//
// After the demand miner, fills the /vs/ set with "sensible" region/type cluster
// pairs: destinations that share a comparable category AND are geographically
// comparable. Selection is tiered (same-state → same-region → cross-region) so
// the high-value within-state comparisons dominate and cross-region stays a
// deliberate minority; ranked by real GSC popularity so famous destinations
// float above obscure ones; capped by a per-destination degree limit so no
// single hub spawns dozens of pages.
//
// Usage:  node scripts/_gen-vs-clusters.mjs [targetPairs]   (default 320)
// Input:  data/cro/vs-demand-<date>.json   (demand pairs to skip + popularity)
// Output: data/cro/vs-clusters-<date>.json
//
// Zero LLM. Pure Supabase data + set ops.

import process from "node:process";
import {
  loadEnv, today, getSupabase, fetchAll, fetchTrapPairs, normType,
  STATE_REGION, DENY_DESTS, loadExistingPairKeys, writeJson, readJson,
} from "./_vs-lib.mjs";

await loadEnv();

const TARGET = parseInt(process.argv[2] ?? "1200", 10);
const DEGREE_CAP = 14;  // max cluster-fill pairs a single destination may appear in
const SS_CAP = 700;    // same-state pairs    (highest comparison value)
const SR_CAP = 400;    // same-region pairs
const CR_CAP = 150;     // cross-region pairs  (deliberate minority)

// A pair needs at least one shared COMPARABLE type to be worth comparing.
const COMPARABLE = new Set([
  "hill-station", "beach", "wildlife", "national-park", "pilgrimage", "temple",
  "temple-town", "heritage", "fort", "lake", "island", "hot-springs", "valley", "city",
]);
// Cross-region pairs (different REGION buckets) are only allowed for these
// narrow, well-defined categories where a long-distance comparison still makes
// sense (e.g. Munnar vs Manali).
const NARROW = new Set(["hill-station", "beach", "wildlife"]);
const TIER_RANK = { flagship: 5, full: 4, A: 3, B: 2, C: 1 };

const supabase = await getSupabase();
const dests = await fetchAll(supabase, "destinations",
  "id, type, content_tier, state_id, subregion, infrastructure_score");

// Popularity signal: real per-destination GSC impressions (from the Phase-1
// demand file) dominate; content tier + infrastructure score break ties among
// destinations with no search footprint yet, so flagship/well-built places
// still outrank obscure ones. destination_months.score is a weather/conditions
// score — near-uniform across destinations — so it is NOT used as popularity.
const demand = readJson(`data/cro/vs-demand-${today()}.json`);
const destDemand = demand?.destination_demand ?? {};
function popularity(d) {
  return (destDemand[d.id] ?? 0) * 100
    + (TIER_RANK[d.content_tier] ?? 2) * 10
    + (d.infrastructure_score ?? 0);
}

// Eligible: drop thin tier-C content and destinations with no category at all.
const elig = dests
  .filter((d) => !DENY_DESTS.has(d.id) && d.content_tier !== "C" && Array.isArray(d.type) && d.type.length > 0)
  .map((d) => ({
    id: d.id,
    state_id: d.state_id,
    subregion: d.subregion || null,
    region: STATE_REGION[d.state_id] || null,
    types: new Set(d.type.map(normType)),
    pop: popularity(d),
  }));

console.log(`\n━━━ Cluster-fill — ${elig.length} eligible destinations (tier-C + typeless excluded) ━━━`);
console.log(`  popularity source: ${Object.keys(destDemand).length} destinations carry GSC impressions`);

// Exclusion set: curated + generated + trap pairs + this run's demand pairs.
const existing = loadExistingPairKeys();
for (const [a, b] of await fetchTrapPairs(supabase)) {
  existing.add(`${a}-vs-${b}`);
  existing.add(`${b}-vs-${a}`);
}
if (demand) {
  for (const c of demand.candidates ?? []) {
    existing.add(`${c.id1}-vs-${c.id2}`);
    existing.add(`${c.id2}-vs-${c.id1}`);
  }
  console.log(`  excluding ${demand.candidates?.length ?? 0} demand pairs from this run`);
} else {
  console.log(`  (no vs-demand-${today()}.json found — proceeding with cluster-fill only)`);
}

// ─── Build candidate pairs ──────────────────────────────────────────────────
const candidates = [];
for (let i = 0; i < elig.length; i++) {
  for (let j = i + 1; j < elig.length; j++) {
    const A = elig[i], B = elig[j];

    // 1. shared comparable type
    const shared = [...A.types].filter((t) => B.types.has(t));
    const sharedComparable = shared.filter((t) => COMPARABLE.has(t));
    if (!sharedComparable.length) continue;

    // 2. geographic sanity. Within a state, any comparable shared type is a
    // sensible comparison. Across states — same region or not — only NARROW,
    // genuinely-alike categories (hill-station / beach / wildlife) compare
    // meaningfully; a cross-state "heritage" overlap pairs unlike places (a
    // hill station vs a temple town), so those are dropped.
    let geo;
    if (A.state_id === B.state_id) geo = "same-state";
    else if (A.region && A.region === B.region) geo = "same-region";
    else geo = "cross-region";
    if (geo !== "same-state" && !sharedComparable.some((t) => NARROW.has(t))) continue;

    // 3. not already shipped / mined
    if (existing.has(`${A.id}-vs-${B.id}`)) continue;

    // score = popularity + tie-breaker bonuses
    let bonus = 0;
    if (A.subregion && A.subregion === B.subregion) bonus += 50;
    if (sharedComparable.some((t) => NARROW.has(t))) bonus += 20;

    candidates.push({
      id1: A.id,
      id2: B.id,
      score: A.pop + B.pop + bonus,
      geo,
      shared_type: sharedComparable[0],
    });
  }
}
console.log(`  ${candidates.length} admissible candidate pairs before tiered selection`);

// ─── Tiered greedy selection with per-destination degree cap ─────────────────
const degree = new Map();
const picked = [];
function tryPick(list, limit) {
  list.sort((a, b) => b.score - a.score);
  let n = 0;
  for (const c of list) {
    if (picked.length >= TARGET || n >= limit) break;
    const da = degree.get(c.id1) ?? 0;
    const db = degree.get(c.id2) ?? 0;
    if (da >= DEGREE_CAP || db >= DEGREE_CAP) continue;
    degree.set(c.id1, da + 1);
    degree.set(c.id2, db + 1);
    picked.push({
      id1: c.id1,
      id2: c.id2,
      cluster_reason: { shared_type: c.shared_type, geo: c.geo, score: Math.round(c.score) },
    });
    n++;
  }
  return n;
}
const nSS = tryPick(candidates.filter((c) => c.geo === "same-state"), SS_CAP);
const nSR = tryPick(candidates.filter((c) => c.geo === "same-region"), SR_CAP);
const nCR = tryPick(candidates.filter((c) => c.geo === "cross-region"), CR_CAP);

const geoBreakdown = { "same-state": nSS, "same-region": nSR, "cross-region": nCR };

const payload = {
  generated: new Date().toISOString(),
  target: TARGET,
  degree_cap: DEGREE_CAP,
  tier_caps: { "same-state": SS_CAP, "same-region": SR_CAP, "cross-region": CR_CAP },
  eligible_destinations: elig.length,
  candidate_pairs: candidates.length,
  picked: picked.length,
  geo_breakdown: geoBreakdown,
  candidates: picked,
};

const out = writeJson(`data/cro/vs-clusters-${today()}.json`, payload);
console.log(`\n  picked ${picked.length} cluster-fill pairs (target ${TARGET}, degree cap ${DEGREE_CAP})`);
console.log(`  geo split: ${JSON.stringify(geoBreakdown)}`);
console.log(`→ wrote ${out}\n`);
