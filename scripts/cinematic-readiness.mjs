#!/usr/bin/env node
/**
 * cinematic-readiness.mjs — score every destination A/B/C for cinematic-shell readiness.
 *
 * Tiers (from ~/.claude/plans/cinematic-rollout-2026-05-05-new-ui-that-synthetic-wall.md
 * + ~/.claude/plans/does-the-cinematic-experience-immutable-candle.md):
 *   A    — magazine-ready: tagline + why_special + 12 months scored + 12 months prose_lead
 *          + ≥3 hidden_gems + ≥5 local_eateries + ≥3 destination_stay_picks
 *   HS-B — structurally renderable AND every thin widget slot is HS-confirmed
 *          in destinations.honest_scarcity. Renders cinematic with proud scarcity
 *          panels in place of the missing widgets — eligible for the flip.
 *   B    — structurally renderable but at least one thin widget is NOT HS-confirmed
 *          (still needs research or backfill before flip).
 *   C    — gaps: missing prose months OR missing required text fields (tagline / why_special)
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

console.log("cinematic-readiness · scoring all destinations\n");

// Counts come from the cinematic_readiness_counts() Postgres function
// (migration 078): one RPC returning only the destinations BELOW tier A,
// instead of paging ~13K rows over the metered REST API (2026-10-04).
const SLOT_FROM_GAP = { gems: "gems", eats: "eateries", stays: "stays" };
function isSlotHsConfirmed(hs, gapKey) {
  const slot = SLOT_FROM_GAP[gapKey];
  return !!(hs && hs[slot] && hs[slot].confirmed === true);
}
let countQ = supabase.from("destinations").select("id", { count: "exact", head: true });
if (STATE_FILTER) countQ = countQ.eq("state_id", STATE_FILTER);
const { count: totalDests, error: countErr } = await countQ;
if (countErr) throw new Error(`destinations count: ${countErr.message}`);
const { data: gapRowsRaw, error: rpcErr } = await supabase.rpc("cinematic_readiness_counts", { only_gaps: true });
if (rpcErr) throw new Error(`cinematic_readiness_counts: ${rpcErr.message}`);
const gapDests = gapRowsRaw.filter((r) => !STATE_FILTER || r.state_id === STATE_FILTER);
const dests = gapDests.map((r) => ({
  id: r.id, name: r.name, state_id: r.state_id,
  tagline: r.has_tagline ? "y" : "", why_special: r.has_why_special ? "y" : "",
  honest_scarcity: r.honest_scarcity,
}));
const monthsByDest = new Map(gapDests.map((r) => [r.id, { scored: r.months_scored, prose: r.months_prose }]));
const gemsByDest = new Map(gapDests.map((r) => [r.id, r.gems]));
const eatsByDest = new Map(gapDests.map((r) => [r.id, r.eats]));
const staysByDest = new Map(gapDests.map((r) => [r.id, r.stays]));
console.log(`destinations: ${totalDests} · below tier A: ${dests.length}\n`);

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
  const thinSlots = [];
  if (gc < GEMS_MIN) thinSlots.push("gems");
  if (ec < EATS_MIN) thinSlots.push("eats");
  if (sc < STAYS_MIN) thinSlots.push("stays");

  if (!hasTagline || !hasWhySpecial || !hasAllScored || !hasAllProse) {
    tier = "C";
  } else if (thinSlots.length === 0) {
    tier = "A";
  } else if (thinSlots.every((slot) => isSlotHsConfirmed(d.honest_scarcity, slot))) {
    tier = "HS-B";
  } else {
    tier = "B";
  }

  // Tag the HS-confirmed thin slots so the markdown report can show them as
  // "honest scarcity" rather than "still needs research."
  const hsConfirmed = thinSlots.filter((slot) =>
    isSlotHsConfirmed(d.honest_scarcity, slot)
  );

  scored.push({
    id: d.id,
    name: d.name,
    state: d.state_id,
    tier,
    counts: { months_scored: mc.scored, months_prose: mc.prose, gems: gc, eats: ec, stays: sc },
    has: { tagline: hasTagline, why_special: hasWhySpecial },
    hs_confirmed: hsConfirmed,
    missing,
  });
}

// Tally
const tally = { A: 0, "HS-B": 0, B: 0, C: 0 };
for (const r of scored) tally[r.tier] += 1;
tally.A = totalDests - scored.length; // only below-A rows are fetched

// State totals
const byState = new Map();
for (const r of scored) {
  const v = byState.get(r.state) || { A: 0, "HS-B": 0, B: 0, C: 0, total: 0 };
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
  totals: { ...tally, total: totalDests },
  note: "destinations[] lists only destinations below tier A; tier A ones are counted, not listed.",
  thresholds: { GEMS_MIN, EATS_MIN, STAYS_MIN },
  by_state: stateRows,
  gap_counts: gapRows.map(([field, count]) => ({ field, count })),
  destinations: scored.sort((a, b) => {
    const order = { C: 0, B: 1, "HS-B": 2, A: 3 };
    if (order[a.tier] !== order[b.tier]) return order[a.tier] - order[b.tier];
    return a.id.localeCompare(b.id);
  }),
};
const jsonPath = `${outDir}/cinematic-readiness.json`;
writeFileSync(jsonPath, JSON.stringify(json, null, 2));

const lines = [];
lines.push(`# Cinematic readiness — ${stamp}`);
lines.push("");
lines.push(`Total: **${totalDests}** dests · A=**${tally.A}** · HS-B=**${tally["HS-B"]}** · B=**${tally.B}** · C=**${tally.C}**`);
lines.push("");
lines.push(`Cinematic-eligible (A + HS-B): **${tally.A + tally["HS-B"]}**`);
lines.push("");
lines.push(`Thresholds: gems ≥ ${GEMS_MIN} · eateries ≥ ${EATS_MIN} · stay picks ≥ ${STAYS_MIN}`);
lines.push("");
lines.push("## Gap field tally (most blocking first)");
lines.push("");
lines.push("| Field | Dests blocked |");
lines.push("|---|---:|");
for (const [field, count] of gapRows) lines.push(`| ${field} | ${count} |`);
lines.push("");
lines.push("## By state (destinations below tier A only)");
lines.push("");
lines.push("| State | A | HS-B | B | C | Total |");
lines.push("|---|---:|---:|---:|---:|---:|");
for (const r of stateRows) lines.push(`| ${r.state} | ${r.A} | ${r["HS-B"]} | ${r.B} | ${r.C} | ${r.total} |`);
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
lines.push("## Tier HS-B destinations (cinematic-eligible with scarcity panels)");
lines.push("");
lines.push("| Dest | State | HS-confirmed slots |");
lines.push("|---|---|---|");
for (const r of scored.filter((x) => x.tier === "HS-B")) {
  lines.push(`| ${r.name} (${r.id}) | ${r.state} | ${r.hs_confirmed.join(" · ")} |`);
}
lines.push("");
lines.push(`## Tier A destinations (magazine-ready): ${tally.A}`);
const mdPath = `${outDir}/cinematic-readiness.md`;
writeFileSync(mdPath, lines.join("\n") + "\n");

console.log(`tier counts: A=${tally.A}  HS-B=${tally["HS-B"]}  B=${tally.B}  C=${tally.C}  (total ${totalDests})`);
console.log(`cinematic-eligible (A + HS-B): ${tally.A + tally["HS-B"]}`);
console.log(`wrote: ${jsonPath}`);
console.log(`wrote: ${mdPath}`);
