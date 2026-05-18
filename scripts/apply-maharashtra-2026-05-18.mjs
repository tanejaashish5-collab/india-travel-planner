#!/usr/bin/env node
/* eslint-disable no-console */
// Apply Maharashtra eateries + stays + picks (DELETE existing → INSERT verified).
// Usage:
//   node scripts/apply-maharashtra-2026-05-18.mjs --dry-run
//   node scripts/apply-maharashtra-2026-05-18.mjs --commit

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = new Set(process.argv.slice(2));
const DRY_RUN = !args.has("--commit");
const STATE = "maharashtra";

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function fallbackMapsUrl(row) {
  const q = encodeURIComponent(`${row.name} ${row.area ?? ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const { data: dests } = await s.from("destinations").select("id, name").eq("state_id", STATE).order("id");
const destIds = dests.map((d) => d.id);
console.log(`Maharashtra: ${destIds.length} destinations`);

// ---- Load eateries ----
const EAT_DIR = path.join(ROOT, "data", "research", "eateries");
const eatFiles = readdirSync(EAT_DIR).filter((f) => f.startsWith("maharashtra-") && f.endsWith(".json"));
const eateries = [];
for (const f of eatFiles) {
  const rows = JSON.parse(readFileSync(path.join(EAT_DIR, f), "utf-8"));
  if (!Array.isArray(rows)) throw new Error(`${f} not array`);
  for (const r of rows) {
    if (!destIds.includes(r.destination_id)) {
      console.warn(`  ⚠ ${f}: skipping ${r.name} — dest "${r.destination_id}" not in Maharashtra DB`);
      continue;
    }
    if (!r.google_maps_url || r.google_maps_url.includes("maps.app.goo.gl")) {
      r.google_maps_url = fallbackMapsUrl(r);
    }
    eateries.push(r);
  }
}
console.log(`Eateries to insert: ${eateries.length} (from ${eatFiles.length} files)`);

// ---- Load stays ----
const STAYS_FILE = path.join(ROOT, "data", "research", "stays", "maharashtra-new-stays-2026-05-18.json");
const stays = JSON.parse(readFileSync(STAYS_FILE, "utf-8"));
console.log(`Stays to insert: ${stays.length}`);

// ---- Load picks + transform task_a_results → picks rows ----
const PICKS_FILE = path.join(ROOT, "data", "research", "stays-audit", "maharashtra-replacements-2026-05-18.json");
const picksAudit = JSON.parse(readFileSync(PICKS_FILE, "utf-8"));
const picks = [];
let honestScarcityCount = 0;
for (const t of picksAudit.task_a_results ?? []) {
  if (t.verdict === "honest_scarcity" || !t.replacement) {
    honestScarcityCount++;
    continue;
  }
  if (!destIds.includes(t.destination_id)) {
    console.warn(`  ⚠ pick: skipping ${t.destination_id}/${t.slot} — not in MH DB`);
    continue;
  }
  const rep = t.replacement;
  picks.push({
    destination_id: t.destination_id,
    slot: t.slot,
    name: rep.name,
    property_type: rep.tier ?? null,
    price_band: rep.price_band ?? null,
    why_nakshiq: rep.tagline ?? "",
    source: "web_search",
    source_ref: rep.book_url ?? (rep.sources?.[0] ?? null),
    sources: rep.sources ?? null,
    confidence: 0.9,
    refreshed_at: "2026-05-18",
    published: true,
    signature_experience: null,
    contact_only: false,
    contact_info: null,
    voice_flags: null,
    parking_type: null,
  });
}
console.log(`Picks to insert: ${picks.length} (honest scarcity skipped: ${honestScarcityCount})`);

const { count: eExistCount } = await s.from("local_eateries").select("*", { count: "exact", head: true }).in("destination_id", destIds);
const { count: lsExistCount } = await s.from("local_stays").select("*", { count: "exact", head: true }).in("destination_id", destIds);
const { count: pExistCount } = await s.from("destination_stay_picks").select("*", { count: "exact", head: true }).in("destination_id", destIds);
console.log(`\nExisting:`);
console.log(`  local_eateries:           ${eExistCount}`);
console.log(`  local_stays:              ${lsExistCount}`);
console.log(`  destination_stay_picks:   ${pExistCount}`);

console.log(`\nPlan:`);
console.log(`  DELETE ${eExistCount} eateries  → INSERT ${eateries.length} (net ${eateries.length - eExistCount})`);
console.log(`  DELETE ${lsExistCount} stays     → INSERT ${stays.length} (net ${stays.length - lsExistCount})`);
console.log(`  DELETE ${pExistCount} picks     → INSERT ${picks.length} (net ${picks.length - pExistCount})`);

if (DRY_RUN) {
  console.log(`\n[DRY-RUN] No writes. Re-run with --commit.`);
  process.exit(0);
}

console.log(`\n[COMMIT] Writing to Supabase…`);

const { error: e1 } = await s.from("local_eateries").delete().in("destination_id", destIds);
if (e1) { console.error("DELETE eateries:", e1); process.exit(1); }
console.log(`  ✓ Deleted ${eExistCount} eateries`);

for (let i = 0; i < eateries.length; i += 50) {
  const chunk = eateries.slice(i, i + 50);
  const { error } = await s.from("local_eateries").insert(chunk);
  if (error) { console.error(`INSERT eateries chunk ${i}:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${eateries.length} eateries`);

const { error: e2 } = await s.from("local_stays").delete().in("destination_id", destIds);
if (e2) { console.error("DELETE stays:", e2); process.exit(1); }
console.log(`  ✓ Deleted ${lsExistCount} stays`);

for (let i = 0; i < stays.length; i += 50) {
  const chunk = stays.slice(i, i + 50);
  const { error } = await s.from("local_stays").insert(chunk);
  if (error) { console.error(`INSERT stays chunk ${i}:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${stays.length} stays`);

const { error: e3 } = await s.from("destination_stay_picks").delete().in("destination_id", destIds);
if (e3) { console.error("DELETE picks:", e3); process.exit(1); }
console.log(`  ✓ Deleted ${pExistCount} picks`);

for (let i = 0; i < picks.length; i += 50) {
  const chunk = picks.slice(i, i + 50);
  const { error } = await s.from("destination_stay_picks").insert(chunk);
  if (error) { console.error(`INSERT picks chunk ${i}:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${picks.length} picks`);

console.log(`\n✅ Maharashtra apply complete.`);
