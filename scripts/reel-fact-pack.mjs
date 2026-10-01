#!/usr/bin/env node
/**
 * reel-fact-pack.mjs — every fact a reel script may use about ONE destination,
 * pulled from the database with its provenance, written to one JSON file.
 *
 *   node --env-file=apps/web/.env.local scripts/reel-fact-pack.mjs <slug> [<slug>...]
 *   -> ~/Automation/nakshiq-veo/data/facts/<slug>.json
 *
 * WHY (founder, 2026-10-01): "why are you just showing november or december
 * which has no story depth at all? there is so much data that we have". The
 * reel snapshot (reel-data.json) holds only month verdicts, crowd months,
 * costs, treks and vs pairs, so every script collapsed into a month verdict.
 * This file gives the writer, and the gate that checks the writer, the rest:
 * who the place suits (elderly / family / solo women / kids), the eateries,
 * the hidden gems, the tourist-trap swap, the pilgrimage route, the treks.
 *
 * Small reads only: one destination at a time, each table capped, so this
 * stays well under the 500-row REST rule in CLAUDE.md. The pack is the
 * writer's whole world: a claim that is not in the pack is a claim the
 * script_gate refuses.
 */
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import os from "os";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("[fact-pack] NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing"); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });
const OUT = join(os.homedir(), "Automation", "nakshiq-veo", "data", "facts");
mkdirSync(OUT, { recursive: true });

const slugs = process.argv.slice(2);
if (!slugs.length) { console.error("usage: reel-fact-pack.mjs <slug> [...]"); process.exit(1); }

async function q(table, build) {
  const { data, error } = await build(sb.from(table));
  if (error) throw new Error(`${table}: ${error.message}`);
  return data;
}

for (const slug of slugs) {
  const dest = (await q("destinations", t => t.select(
    "id,name,state_id,region,elevation_m,persona_blocks,solo_female_score,solo_female_note,family_stress,budget_tier,couple_suitable,solo_suitable,crowd_calendar,why_special,difficulty,crowd_level,best_for_segments,honest_scarcity,food_scene")
    .eq("id", slug).limit(1)))[0];
  if (!dest) { console.error(`[fact-pack] no destination ${slug}`); continue; }

  const months = await q("destination_months", t => t.select(
    "month,score,verdict,go_or_skip_verdict,skip_reason,who_should_go,who_should_avoid,solo_female_override,solo_female_override_note,festivals_this_month")
    .eq("destination_id", slug).order("month"));
  const kids = (await q("kids_friendly", t => t.select("*").eq("destination_id", slug).limit(1)))[0] || null;
  const eateries = await q("local_eateries", t => t.select(
    "name,area,category,cuisine,signature_dish,must_try,price_range,price_per_head_inr,vegetarian,kid_friendly,reservation,established_year,why_it_matters,insider_tip,is_legendary,last_verified,source_urls")
    .eq("destination_id", slug).eq("is_active", true).order("is_legendary", { ascending: false }).limit(6));
  const gems = await q("hidden_gems", t => t.select(
    "name,distance_km,drive_time,why_unknown,why_go,difficulty,confidence_score,tags")
    .eq("near_destination_id", slug).order("confidence_score", { ascending: false, nullsFirst: false }).limit(6));
  const trapOf = await q("tourist_trap_alternatives", t => t.select(
    "trap_destination_id,alternative_destination_id,distance_km,drive_time,why_better,crowd_difference,infrastructure_difference,family_difference,vibe_difference,alt_better_for,pain_points,common_complaints,editorial_verdict")
    .eq("trap_destination_id", slug).limit(4));
  const altOf = await q("tourist_trap_alternatives", t => t.select(
    "trap_destination_id,alternative_destination_id,distance_km,drive_time,why_better,crowd_difference,infrastructure_difference,family_difference,vibe_difference,alt_better_for")
    .eq("alternative_destination_id", slug).limit(4));
  const pilgrimage = await q("pilgrimage_routes", t => t.select(
    "slug,name,kind,summary,base_town,total_distance_km,parikrama_km,step_count,duration_days_min,duration_days_max,open_months,best_months,access_modes,stages,crowd_note,cost_note,pitfalls,last_verified")
    .eq("destination_id", slug).eq("published", true).limit(2));
  const treks = await q("treks", t => t.select(
    "id,name,difficulty,fitness_level,distance_km,max_altitude_m,duration_days,best_months,kids_suitable,min_age,permits_required,warnings,network_coverage,nearest_hospital")
    .eq("destination_id", slug).limit(6));
  const costRows = await q("destination_costs", t => t.select("category,season,months,typical_inr,range_low_inr,range_high_inr,unit")
    .eq("destination_id", slug).in("category", ["hotel-mid", "hotel-budget", "food-per-day", "transport-taxi-day"]));
  const costs = {};
  for (const r of costRows) (costs[r.season] ||= {})[r.category] = { typical_inr: r.typical_inr, low: r.range_low_inr, high: r.range_high_inr, unit: r.unit, months: r.months };
  const sos = (await q("emergency_sos", t => t.select("nearest_hospital,nearest_hospital_km,auto_verify_status,women_helpline,tourist_helpline").eq("destination_id", slug).limit(1)))[0] || null;

  const pack = {
    slug, name: dest.name, fetched_at: new Date().toISOString(),
    source: "Supabase REST, service role, read-only; one destination per call",
    destination: dest, months, kids, eateries, hidden_gems: gems,
    trap_swaps: { as_trap: trapOf, as_alternative: altOf },
    pilgrimage, treks, costs,
    emergency: sos && { nearest_hospital: sos.nearest_hospital, km: sos.nearest_hospital_km,
      // Only a CONFIRMED hospital may be named in a reel (SOS audit, 2026-09-21).
      nameable: sos.auto_verify_status === "confirmed", women_helpline_present: !!sos.women_helpline },
  };
  const out = join(OUT, `${slug}.json`);
  writeFileSync(out, JSON.stringify(pack, null, 1));
  console.log(`[fact-pack] ${slug}: months ${months.length}, eateries ${eateries.length}, gems ${gems.length}, swaps ${trapOf.length}+${altOf.length}, pilgrimage ${pilgrimage.length}, treks ${treks.length}, cost seasons ${Object.keys(costs).length}, kids ${kids ? "yes" : "no"} -> ${out}`);
}
