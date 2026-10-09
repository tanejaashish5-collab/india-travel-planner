#!/usr/bin/env node
/**
 * Validate data/cost-research/<region>/B*.json before anything is loaded into destination_costs.
 *   node scripts/validate-cost-research.mjs data/cost-research/north/B3.json [...]
 * Flags: missing sources behind a number, implausible values, ids not in _scope.json, bad shape.
 * Exit 1 on any ERROR. WARN lines are for human review.
 */
import fs from "node:fs";
import path from "node:path";

const RANGES = {
  mid: [700, 20000], budget: [250, 6000], homestay: [300, 8000], dorm: [100, 2500],
  taxi: [600, 25000], food_budget: [150, 1500], food_std: [250, 3500],
};
let errors = 0;
const err = (m) => { errors++; console.log("ERROR", m); };
const warn = (m) => console.log("WARN ", m);
const inRange = (v, k) => v == null || (typeof v === "number" && v >= RANGES[k][0] && v <= RANGES[k][1]);
const urls = (a) => Array.isArray(a) && a.some((u) => typeof u === "string" && /^https?:\/\//.test(u));

for (const file of process.argv.slice(2)) {
  let j;
  try { j = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { err(`${file}: invalid JSON ${e.message}`); continue; }
  const scope = JSON.parse(fs.readFileSync(path.join(path.dirname(file), "_scope.json"), "utf8"));
  const scopeById = Object.fromEntries(scope.map((d) => [d.id, d]));
  const batches = JSON.parse(fs.readFileSync(path.join(path.dirname(file), "_batches.json"), "utf8"));
  const expect = batches[j.batch] ?? [];
  for (const id of expect) if (!j.destinations?.[id]) err(`${j.batch}: missing destination ${id}`);
  for (const [id, d] of Object.entries(j.destinations ?? {})) {
    const tag = `${j.batch}/${id}`;
    if (!scopeById[id]) { err(`${tag}: not in scope`); continue; }
    const observed = scopeById[id].stay_observed;
    const s = d.stay;
    if (observed && s) warn(`${tag}: stay given but stay_observed is true (ignored at load)`);
    if (!observed && !s) err(`${tag}: stay missing`);
    if (s && !s.no_lodging) {
      for (const [k, v, src, n] of [["mid", s.mid_median_inr, s.mid_sources, s.mid_n], ["budget", s.budget_hotel_median_inr, s.budget_sources, s.budget_n], ["homestay", s.homestay_median_inr, s.homestay_sources, s.homestay_n], ["dorm", s.dorm_median_inr, s.dorm_sources, s.dorm_n]]) {
        if (v == null) continue;
        if (!inRange(v, k)) err(`${tag}: stay.${k} ${v} outside plausible ${RANGES[k]}`);
        if (!urls(src)) err(`${tag}: stay.${k} has a value but no source URL`);
        if (!n) warn(`${tag}: stay.${k} has no n`);
      }
      if (s.mid_median_inr && s.budget_hotel_median_inr && s.budget_hotel_median_inr > s.mid_median_inr) warn(`${tag}: budget hotel above mid`);
    }
    if (s?.no_lodging && !s.nearest_base) warn(`${tag}: no_lodging without nearest_base`);
    const t = d.taxi_day;
    if (!t) err(`${tag}: taxi_day missing`);
    else {
      if (t.local_sightseeing_8h_inr != null) {
        if (!inRange(t.local_sightseeing_8h_inr, "taxi")) err(`${tag}: taxi ${t.local_sightseeing_8h_inr} outside plausible`);
        if (!urls(t.sources)) err(`${tag}: taxi value but no source URL`);
        if (!t.basis) warn(`${tag}: taxi has no basis`);
      }
    }
    const f = d.food_per_person_day;
    if (!f) err(`${tag}: food_per_person_day missing`);
    else {
      if (!inRange(f.budget_inr, "food_budget")) err(`${tag}: food budget ${f.budget_inr} outside plausible`);
      if (!inRange(f.standard_inr, "food_std")) err(`${tag}: food standard ${f.standard_inr} outside plausible`);
      if ((f.budget_inr != null || f.standard_inr != null) && !urls(f.sources)) err(`${tag}: food value but no source URL`);
      if (f.budget_inr != null && f.standard_inr != null && f.budget_inr > f.standard_inr) err(`${tag}: food budget above standard`);
    }
    if (!["high", "medium", "low"].includes(d.confidence)) err(`${tag}: bad confidence ${d.confidence}`);
  }
  console.log(`${file}: ${Object.keys(j.destinations ?? {}).length} destinations, ${errors} error(s) so far`);
}
process.exit(errors ? 1 : 0);
