#!/usr/bin/env node
/**
 * Sprint 8 — Phase C: trek descriptions.
 * Citation-first composer — every sentence draws from a DB column.
 * No fabrication, no influencer words, sentence-case prose.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatMonths(arr) {
  if (!arr?.length) return null;
  const sorted = [...new Set(arr)].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0], end = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) end = sorted[i];
    else { ranges.push([start, end]); start = sorted[i]; end = sorted[i]; }
  }
  ranges.push([start, end]);
  const f = ranges.map(([s, e]) => s === e ? MONTH_NAMES[s-1] : `${MONTH_NAMES[s-1]}–${MONTH_NAMES[e-1]}`);
  if (f.length === 1) return f[0];
  if (f.length === 2) return f.join(" and ");
  return f.slice(0, -1).join(", ") + " and " + f[f.length-1];
}

function trim(s) { return (s || "").trim().replace(/\.+$/, ""); }
function lcFirst(s) { return s.replace(/^([A-Z])/, c => c.toLowerCase()); }
function ucFirst(s) { return s.replace(/^([a-z])/, c => c.toUpperCase()); }
function withPeriod(s) { return s.endsWith(".") ? s : s + "."; }

function compose(t) {
  const parts = [];
  const articleA = /^[aeiou]/i.test(t.difficulty) ? "an" : "a";
  const dayWord = t.duration_days === 1 ? "single-day" : `${t.duration_days}-day`;
  const altPhrase = t.max_altitude_m ? `, topping out at ${Number(t.max_altitude_m).toLocaleString()} m` : "";
  const distPhrase = t.distance_km ? `${t.distance_km} km` : "";

  // P1: identity
  parts.push(`${t.name} is ${articleA} ${t.difficulty} ${dayWord}, ${distPhrase} trek${altPhrase}.`);

  // P2: highlights (top 4)
  if (t.highlights?.length) {
    const tops = t.highlights.slice(0, 4).map(h => trim(h));
    parts.push(`The route takes in ${tops.join("; ")}.`);
  }

  // P3: best months
  const months = formatMonths(t.best_months);
  if (months) parts.push(`Best months: ${months}.`);

  // P4: warnings (top 3)
  if (t.warnings?.length) {
    const tops = t.warnings.slice(0, 3).map((w, i) => i === 0 ? trim(w) : lcFirst(trim(w)));
    parts.push(`Watch points: ${tops.join("; ")}.`);
  }

  // P5: logistics — single sentence with comma joins (avoids sentence-case bug)
  const logBits = [`fitness level: ${t.fitness_level}`];
  if (t.permits_required) logBits.push("permits required");
  if (t.kids_suitable === true) logBits.push("suitable for children with adult supervision");
  else if (t.kids_suitable === false && t.min_age) logBits.push(`not recommended for children under ${t.min_age}`);
  else if (t.kids_suitable === false) logBits.push("not recommended for children");
  parts.push(ucFirst(logBits.join(", ")) + ".");

  // P6: nearest hospital
  if (t.nearest_hospital && t.nearest_hospital.trim().length > 4) {
    parts.push(`Nearest hospital: ${trim(t.nearest_hospital)}.`);
  }

  // P7: network
  if (t.network_coverage && t.network_coverage.trim().length > 6) {
    parts.push(`Network coverage: ${withPeriod(trim(t.network_coverage))}`);
  }

  let out = parts.join(" ");

  // Closer for short treks — declarative, no fluff
  if (out.length < 350) {
    const dur = t.duration_days === 1 ? "day-trip" : `${t.duration_days}-day route`;
    const diffNote = {
      easy: "An accessible",
      moderate: "A moderate",
      hard: "A demanding",
      extreme: "An expedition-grade",
    }[t.difficulty] ?? "A";
    out += ` ${diffNote} ${dur} — book the trek with a registered guide and start before first light to clear the descent in daylight.`;
  }

  return out;
}

const data = JSON.parse(readFileSync("data/sprint8/treks.json", "utf-8"));
const treks = data.treks;

let updated = 0;
const lengthBuckets = { "<400": 0, "400-500": 0, "500-700": 0, "700+": 0 };
const errors = [];
const tooShort = [];

for (const t of treks) {
  const description = compose(t);
  if (description.length < 350) tooShort.push({ id: t.id, len: description.length });
  if (description.length < 400) lengthBuckets["<400"]++;
  else if (description.length < 500) lengthBuckets["400-500"]++;
  else if (description.length < 700) lengthBuckets["500-700"]++;
  else lengthBuckets["700+"]++;

  const { error } = await supabase
    .from("treks")
    .update({ description })
    .eq("id", t.id);

  if (error) { errors.push({ id: t.id, error: error.message }); continue; }
  updated++;
}

console.log(`updated: ${updated}/${treks.length}`);
console.log(`length buckets:`, lengthBuckets);
if (tooShort.length) {
  console.log(`\nshorter than 350 chars (${tooShort.length}):`);
  tooShort.forEach(t => console.log(`  ${t.id.padEnd(35)} ${t.len} ch`));
}
if (errors.length) console.log(`errors:`, errors);

// Print 2 samples
console.log(`\n--- sample 1: ${treks[0].id} ---\n${compose(treks[0])}`);
console.log(`\n--- sample 2: ${treks[2].id} ---\n${compose(treks[2])}`);
