#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_validate-vs-pairs.mjs — Phase 3 of the /vs/ comparison-page expansion.
//
// Single render-health gate for every demand + cluster candidate. The /vs/ page
// 404s if either destination row is missing or its month grid is incomplete, so
// a bad pair would sit in the sitemap serving a 404. This rejects those before
// they ever reach vs-pairs.generated.ts. Also assigns each surviving pair its
// theme (deterministic — no LLM).
//
// Usage:  node scripts/_validate-vs-pairs.mjs
// Input:  data/cro/vs-demand-<date>.json + data/cro/vs-clusters-<date>.json
// Output: data/cro/vs-validated-<date>.json  (deploy-ready)
//         data/cro/vs-rejected-<date>.json
//
// Zero LLM. Pure Supabase data + rules.

import {
  loadEnv, today, getSupabase, fetchAll, normType, canonKey,
  STATE_REGION, DENY_DESTS, loadExistingPairKeys, fetchTrapPairs, writeJson, readJson,
} from "./_vs-lib.mjs";

await loadEnv();

// ─── Deterministic theme assignment ─────────────────────────────────────────
// Cross-region pairs → "cross-region". Otherwise the shared category decides.
// Every value here is a key in VS_THEME_LABELS (vs-pairs.ts) — "lakes-valleys"
// is added there by the same expansion change.
const THEME_GROUPS = [
  ["hill-stations", new Set(["hill-station", "meadow", "tea"])],
  ["beaches", new Set(["beach", "island", "coastal", "backwater", "coral"])],
  ["wildlife", new Set(["wildlife", "national-park", "safari", "tiger", "birding", "sanctuary"])],
  ["pilgrimage", new Set(["pilgrimage", "temple", "temple-town", "sacred", "spiritual", "buddhist", "monastery"])],
  ["heritage", new Set(["heritage", "fort", "unesco", "historical", "palace", "archaeological", "caves", "colonial"])],
  ["metros", new Set(["city"])],
  ["lakes-valleys", new Set(["lake", "valley", "hot-springs", "river", "waterfall"])],
];

function pickTheme(types) {
  for (const [theme, set] of THEME_GROUPS) {
    if (types.some((t) => set.has(t))) return theme;
  }
  return null;
}

function assignTheme(d1, d2) {
  const r1 = STATE_REGION[d1.state_id];
  const r2 = STATE_REGION[d2.state_id];
  if (r1 && r2 && r1 !== r2) return "cross-region";
  const t1 = [...new Set((d1.type ?? []).map(normType))];
  const t2 = [...new Set((d2.type ?? []).map(normType))];
  const shared = t1.filter((t) => t2.includes(t));
  // Shared category wins; fall back to either destination's own categories.
  return pickTheme(shared) ?? pickTheme(t1) ?? pickTheme(t2) ?? "heritage";
}

// ─── Render-health rules ────────────────────────────────────────────────────
function monthRowCount(d) {
  return d?.destination_months?.[0]?.count ?? 0;
}
function healthIssue(d) {
  if (!d) return "destination row missing";
  if (!String(d.name || "").trim()) return "no name";
  if (!String(d.tagline || "").trim()) return "no tagline";
  if (monthRowCount(d) < 12) return `only ${monthRowCount(d)}/12 month rows`;
  return null;
}

// ─── Main ───────────────────────────────────────────────────────────────────
const supabase = await getSupabase();
const stamp = today();

const demand = readJson(`data/cro/vs-demand-${stamp}.json`) ?? { candidates: [] };
const clusters = readJson(`data/cro/vs-clusters-${stamp}.json`) ?? { candidates: [] };

// Merge — demand pairs first (higher priority), cluster pairs second; dedupe
// order-independently within the merged set.
const seen = new Set();
const merged = [];
for (const c of demand.candidates ?? []) {
  const k = canonKey(c.id1, c.id2);
  if (seen.has(k)) continue;
  seen.add(k);
  merged.push({ id1: c.id1, id2: c.id2, source: "demand", gsc_impressions: c.gsc_impressions ?? 0 });
}
for (const c of clusters.candidates ?? []) {
  const k = canonKey(c.id1, c.id2);
  if (seen.has(k)) continue;
  seen.add(k);
  merged.push({
    id1: c.id1, id2: c.id2, source: "cluster",
    cluster_score: c.cluster_reason?.score ?? 0,
    cluster_reason: c.cluster_reason ?? null,
  });
}

// Safety-net dedupe against everything already shipped (curated + generated + trap).
const existing = loadExistingPairKeys();
for (const [a, b] of await fetchTrapPairs(supabase)) {
  existing.add(`${a}-vs-${b}`);
  existing.add(`${b}-vs-${a}`);
}
const collided = [];
const fresh = merged.filter((c) => {
  if (DENY_DESTS.has(c.id1) || DENY_DESTS.has(c.id2)) return false;
  if (existing.has(`${c.id1}-vs-${c.id2}`)) { collided.push(c); return false; }
  return true;
});

console.log(`\n━━━ Validating ${fresh.length} candidate pairs (${merged.length} merged, ${collided.length} already shipped) ━━━`);

// Batched health query — fetch every destination once, with its month-row count.
const health = await fetchAll(
  supabase, "destinations",
  "id, name, tagline, type, state_id, destination_months(count)",
);
const hmap = new Map(health.map((d) => [d.id, d]));

const validated = [];
const rejected = [];
for (const c of fresh) {
  const d1 = hmap.get(c.id1);
  const d2 = hmap.get(c.id2);
  const i1 = healthIssue(d1);
  const i2 = healthIssue(d2);
  if (i1 || i2) {
    rejected.push({
      id1: c.id1, id2: c.id2, source: c.source,
      reason: [i1 && `${c.id1}: ${i1}`, i2 && `${c.id2}: ${i2}`].filter(Boolean).join("; "),
    });
    continue;
  }
  validated.push({
    id1: c.id1,
    id2: c.id2,
    theme: assignTheme(d1, d2),
    source: c.source,
    _sort: c.source === "demand" ? 1e9 + (c.gsc_impressions ?? 0) : (c.cluster_score ?? 0),
  });
}

// Demand pairs rank above cluster pairs; within each, by impressions / score.
validated.sort((a, b) => b._sort - a._sort);
const pairs = validated.map((v, i) => ({
  id1: v.id1, id2: v.id2, theme: v.theme, source: v.source, priority: i + 1,
}));

const themeBreakdown = pairs.reduce((acc, p) => {
  acc[p.theme] = (acc[p.theme] ?? 0) + 1;
  return acc;
}, {});
const sourceBreakdown = pairs.reduce((acc, p) => {
  acc[p.source] = (acc[p.source] ?? 0) + 1;
  return acc;
}, {});

const validatedOut = writeJson(`data/cro/vs-validated-${stamp}.json`, {
  generated: new Date().toISOString(),
  counts: {
    merged: merged.length,
    already_shipped: collided.length,
    validated: pairs.length,
    rejected: rejected.length,
  },
  source_breakdown: sourceBreakdown,
  theme_breakdown: themeBreakdown,
  pairs,
});
const rejectedOut = writeJson(`data/cro/vs-rejected-${stamp}.json`, {
  generated: new Date().toISOString(),
  count: rejected.length,
  rejected,
});

console.log(`\n  validated (deploy-ready) : ${pairs.length}`);
console.log(`  rejected (unhealthy)     : ${rejected.length}`);
console.log(`  source split             : ${JSON.stringify(sourceBreakdown)}`);
console.log(`  theme split              : ${JSON.stringify(themeBreakdown)}`);
if (rejected.length) {
  console.log(`\n  Sample rejects:`);
  for (const r of rejected.slice(0, 10)) console.log(`    ${r.id1}-vs-${r.id2}  —  ${r.reason}`);
}
console.log(`\n→ wrote ${validatedOut}`);
console.log(`→ wrote ${rejectedOut}\n`);
