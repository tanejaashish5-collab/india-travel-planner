#!/usr/bin/env node
/**
 * cinematic-readiness.mjs — score every destination A/B/C for cinematic-shell readiness.
 *
 * Tiers (from ~/.claude/plans/cinematic-rollout-2026-05-05-new-ui-that-synthetic-wall.md):
 *   A — magazine-ready: tagline + why_special + 12 months scored + 12 months prose_lead
 *       + ≥3 hidden_gems + ≥5 local_eateries + ≥3 destination_stay_picks
 *   B — structurally renderable: tagline + why_special + 12 months scored + 12 months prose_lead,
 *       but at least one widget thin (gems/eats/stays under threshold)
 *   C — gaps: missing prose months OR missing required text fields (tagline / why_special)
 *
 * Output:
 *   qa/cinematic-readiness.json — per-dest tier + missing fields
 *   qa/cinematic-readiness.md   — markdown summary grouped by state, totals, gap lists
 *
 * Usage:
 *   node scripts/cinematic-readiness.mjs
 *   node scripts/cinematic-readiness.mjs --state himachal-pradesh
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const STATE_FILTER = (() => {
  const i = args.indexOf("--state");
  return i >= 0 ? args[i + 1] : null;
})();

const GEMS_MIN = 3;
const EATS_MIN = 5;
const STAYS_MIN = 3;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Supabase server-caps .select() at 1000 rows. Page through with range().
async function selectAll(table, columns, filterFn) {
  const PAGE = 1000;
  let from = 0;
  const all = [];
  while (true) {
    let q = supabase.from(table).select(columns).range(from, from + PAGE - 1);
    if (filterFn) q = filterFn(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    all.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

console.log("cinematic-readiness · scoring all destinations\n");

const destQuery = (q) => (STATE_FILTER ? q.eq("state_id", STATE_FILTER) : q);
const dests = await selectAll(
  "destinations",
  "id, name, state_id, tagline, why_special",
  destQuery
);
console.log(`destinations: ${dests.length}`);

const months = await selectAll(
  "destination_months",
  "destination_id, month, score, prose_lead",
  null
);
console.log(`destination_months rows: ${months.length}`);

const gems = await selectAll("hidden_gems", "near_destination_id", null);
console.log(`hidden_gems rows: ${gems.length}`);

const eats = await selectAll("local_eateries", "destination_id", null);
console.log(`local_eateries rows: ${eats.length}`);

const stays = await selectAll("destination_stay_picks", "destination_id", null);
console.log(`destination_stay_picks rows: ${stays.length}\n`);

// Aggregate per destination
const monthsByDest = new Map();
for (const m of months) {
  const v = monthsByDest.get(m.destination_id) || { scored: 0, prose: 0 };
  if (m.score != null) v.scored += 1;
  if (m.prose_lead && m.prose_lead.trim().length > 0) v.prose += 1;
  monthsByDest.set(m.destination_id, v);
}
const gemsByDest = new Map();
for (const g of gems) {
  if (!g.near_destination_id) continue;
  gemsByDest.set(g.near_destination_id, (gemsByDest.get(g.near_destination_id) || 0) + 1);
}
const eatsByDest = new Map();
for (const e of eats) {
  if (!e.destination_id) continue;
  eatsByDest.set(e.destination_id, (eatsByDest.get(e.destination_id) || 0) + 1);
}
const staysByDest = new Map();
for (const s of stays) {
  if (!s.destination_id) continue;
  staysByDest.set(s.destination_id, (staysByDest.get(s.destination_id) || 0) + 1);
}

const scored = [];
for (const d of dests) {
  const mc = monthsByDest.get(d.id) || { scored: 0, prose: 0 };
  const gc = gemsByDest.get(d.id) || 0;
  const ec = eatsByDest.get(d.id) || 0;
  const sc = staysByDest.get(d.id) || 0;
  const hasTagline = !!(d.tagline && d.tagline.trim().length > 0);
  const hasWhySpecial = !!(d.why_special && d.why_special.trim().length > 0);
  const hasAllScored = mc.scored === 12;
  const hasAllProse = mc.prose === 12;

  const missing = [];
  if (!hasTagline) missing.push("tagline");
  if (!hasWhySpecial) missing.push("why_special");
  if (mc.scored < 12) missing.push(`months_scored:${mc.scored}/12`);
  if (mc.prose < 12) missing.push(`months_prose:${mc.prose}/12`);
  if (gc < GEMS_MIN) missing.push(`gems:${gc}/${GEMS_MIN}`);
  if (ec < EATS_MIN) missing.push(`eats:${ec}/${EATS_MIN}`);
  if (sc < STAYS_MIN) missing.push(`stays:${sc}/${STAYS_MIN}`);

  let tier;
  if (!hasTagline || !hasWhySpecial || !hasAllScored || !hasAllProse) {
    tier = "C";
  } else if (gc < GEMS_MIN || ec < EATS_MIN || sc < STAYS_MIN) {
    tier = "B";
  } else {
    tier = "A";
  }

  scored.push({
    id: d.id,
    name: d.name,
    state: d.state_id,
    tier,
    counts: { months_scored: mc.scored, months_prose: mc.prose, gems: gc, eats: ec, stays: sc },
    has: { tagline: hasTagline, why_special: hasWhySpecial },
    missing,
  });
}

// Tally
const tally = { A: 0, B: 0, C: 0 };
for (const r of scored) tally[r.tier] += 1;

// State totals
const byState = new Map();
for (const r of scored) {
  const v = byState.get(r.state) || { A: 0, B: 0, C: 0, total: 0 };
  v[r.tier] += 1;
  v.total += 1;
  byState.set(r.state, v);
}
const stateRows = [...byState.entries()]
  .map(([state, t]) => ({ state, ...t }))
  .sort((a, b) => a.state.localeCompare(b.state));

// Gap aggregation: which fields are most-blocking across the corpus?
const gapCounts = {};
for (const r of scored) {
  for (const m of r.missing) {
    const key = m.split(":")[0];
    gapCounts[key] = (gapCounts[key] || 0) + 1;
  }
}
const gapRows = Object.entries(gapCounts).sort((a, b) => b[1] - a[1]);

// Output
const stamp = new Date().toISOString().slice(0, 10);
const outDir = "qa";
mkdirSync(outDir, { recursive: true });

const json = {
  generated_at: new Date().toISOString(),
  totals: { ...tally, total: scored.length },
  thresholds: { GEMS_MIN, EATS_MIN, STAYS_MIN },
  by_state: stateRows,
  gap_counts: gapRows.map(([field, count]) => ({ field, count })),
  destinations: scored.sort((a, b) => {
    const order = { C: 0, B: 1, A: 2 };
    if (order[a.tier] !== order[b.tier]) return order[a.tier] - order[b.tier];
    return a.id.localeCompare(b.id);
  }),
};
const jsonPath = `${outDir}/cinematic-readiness.json`;
writeFileSync(jsonPath, JSON.stringify(json, null, 2));

const lines = [];
lines.push(`# Cinematic readiness — ${stamp}`);
lines.push("");
lines.push(`Total: **${scored.length}** dests · A=**${tally.A}** · B=**${tally.B}** · C=**${tally.C}**`);
lines.push("");
lines.push(`Thresholds: gems ≥ ${GEMS_MIN} · eateries ≥ ${EATS_MIN} · stay picks ≥ ${STAYS_MIN}`);
lines.push("");
lines.push("## Gap field tally (most blocking first)");
lines.push("");
lines.push("| Field | Dests blocked |");
lines.push("|---|---:|");
for (const [field, count] of gapRows) lines.push(`| ${field} | ${count} |`);
lines.push("");
lines.push("## By state");
lines.push("");
lines.push("| State | A | B | C | Total |");
lines.push("|---|---:|---:|---:|---:|");
for (const r of stateRows) lines.push(`| ${r.state} | ${r.A} | ${r.B} | ${r.C} | ${r.total} |`);
lines.push("");
lines.push("## Tier C destinations (must backfill)");
lines.push("");
lines.push("| Dest | State | Missing |");
lines.push("|---|---|---|");
for (const r of scored.filter((x) => x.tier === "C")) {
  lines.push(`| ${r.name} (${r.id}) | ${r.state} | ${r.missing.join(" · ")} |`);
}
lines.push("");
lines.push("## Tier B destinations (widget topup)");
lines.push("");
lines.push("| Dest | State | Thin |");
lines.push("|---|---|---|");
for (const r of scored.filter((x) => x.tier === "B")) {
  lines.push(`| ${r.name} (${r.id}) | ${r.state} | ${r.missing.join(" · ")} |`);
}
lines.push("");
lines.push("## Tier A destinations (magazine-ready)");
lines.push("");
lines.push("| Dest | State |");
lines.push("|---|---|");
for (const r of scored.filter((x) => x.tier === "A")) {
  lines.push(`| ${r.name} (${r.id}) | ${r.state} |`);
}
const mdPath = `${outDir}/cinematic-readiness.md`;
writeFileSync(mdPath, lines.join("\n") + "\n");

console.log(`tier counts: A=${tally.A}  B=${tally.B}  C=${tally.C}  (total ${scored.length})`);
console.log(`wrote: ${jsonPath}`);
console.log(`wrote: ${mdPath}`);
