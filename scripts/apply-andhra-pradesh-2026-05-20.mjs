#!/usr/bin/env node
/* eslint-disable no-console */
// Apply Andhra Pradesh eateries + stays + picks. DELETE existing placeholders → INSERT verified.
// Usage:
//   node scripts/apply-andhra-pradesh-2026-05-20.mjs --dry-run
//   node scripts/apply-andhra-pradesh-2026-05-20.mjs --commit

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = new Set(process.argv.slice(2));
const DRY_RUN = !args.has("--commit");
const STATE = "andhra-pradesh";

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

function fallbackMapsUrl(row) {
  const q = encodeURIComponent(`${row.name} ${row.area ?? ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const { data: dests } = await s.from("destinations").select("id, name").eq("state_id", STATE).order("id");
const destIds = dests.map((d) => d.id);
console.log(`Andhra Pradesh: ${destIds.length} destinations`);

const EAT_DIR = path.join(ROOT, "data", "research", "eateries");
const eatFiles = readdirSync(EAT_DIR).filter((f) => f.startsWith("andhra-pradesh-") && f.endsWith(".json"));
const eateries = [];
for (const f of eatFiles) {
  const rows = JSON.parse(readFileSync(path.join(EAT_DIR, f), "utf-8"));
  if (!Array.isArray(rows)) throw new Error(`${f} not array`);
  for (const r of rows) {
    if (!destIds.includes(r.destination_id)) { console.warn(`  ⚠ ${f}: dest "${r.destination_id}" not in Andhra Pradesh DB`); continue; }
    if (!r.google_maps_url || r.google_maps_url.includes("maps.app.goo.gl")) r.google_maps_url = fallbackMapsUrl(r);
    eateries.push(r);
  }
}
console.log(`Eateries to insert: ${eateries.length} (from ${eatFiles.length} files)`);

const STAYS_FILE = path.join(ROOT, "data", "research", "stays", "andhra-pradesh-new-stays-2026-05-20.json");
const stays = JSON.parse(readFileSync(STAYS_FILE, "utf-8"));
console.log(`Stays to insert: ${stays.length}`);

const PICKS_FILE = path.join(ROOT, "data", "research", "stays-audit", "andhra-pradesh-replacements-2026-05-20.json");
const picksAudit = JSON.parse(readFileSync(PICKS_FILE, "utf-8"));
const picks = [];
let honestScarcityCount = 0;
for (const t of picksAudit.task_a_results ?? []) {
  if (t.verdict === "honest_scarcity" || !t.replacement) { honestScarcityCount++; continue; }
  if (!destIds.includes(t.destination_id)) { console.warn(`  ⚠ pick ${t.destination_id}/${t.slot} dest not in Andhra Pradesh DB`); continue; }
  const rep = t.replacement;
  picks.push({
    destination_id: t.destination_id, slot: t.slot, name: rep.name,
    property_type: rep.tier ?? null, price_band: rep.price_band ?? null,
    why_nakshiq: rep.tagline ?? "", source: "web_search",
    source_ref: rep.book_url ?? (rep.sources?.[0] ?? null),
    sources: rep.sources ?? null, confidence: 0.9, refreshed_at: "2026-05-20", published: true,
    signature_experience: null, contact_only: false, contact_info: null, voice_flags: null, parking_type: null,
  });
}
console.log(`Picks to insert: ${picks.length} (honest scarcity skipped: ${honestScarcityCount})`);

const { count: eC } = await s.from("local_eateries").select("*", { count: "exact", head: true }).in("destination_id", destIds);
const { count: lsC } = await s.from("local_stays").select("*", { count: "exact", head: true }).in("destination_id", destIds);
const { count: pC } = await s.from("destination_stay_picks").select("*", { count: "exact", head: true }).in("destination_id", destIds);
console.log(`\nExisting:\n  eateries:  ${eC}\n  stays:     ${lsC}\n  picks:     ${pC}`);

console.log(`\nPlan:`);
console.log(`  DELETE ${eC} eateries → INSERT ${eateries.length} (net ${eateries.length - eC})`);
console.log(`  DELETE ${lsC} stays    → INSERT ${stays.length} (net ${stays.length - lsC})`);
console.log(`  DELETE ${pC} picks    → INSERT ${picks.length} (net ${picks.length - pC})`);

if (DRY_RUN) { console.log(`\n[DRY-RUN] No writes. Re-run with --commit.`); process.exit(0); }

console.log(`\n[COMMIT] Writing to Supabase…`);

const { error: e1 } = await s.from("local_eateries").delete().in("destination_id", destIds);
if (e1) { console.error("DEL eateries:", e1); process.exit(1); }
console.log(`  ✓ Deleted ${eC} eateries`);
for (let i = 0; i < eateries.length; i += 50) {
  const { error } = await s.from("local_eateries").insert(eateries.slice(i, i + 50));
  if (error) { console.error(`INS eateries:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${eateries.length} eateries`);

const { error: e2 } = await s.from("local_stays").delete().in("destination_id", destIds);
if (e2) { console.error("DEL stays:", e2); process.exit(1); }
console.log(`  ✓ Deleted ${lsC} stays`);
for (let i = 0; i < stays.length; i += 50) {
  const { error } = await s.from("local_stays").insert(stays.slice(i, i + 50));
  if (error) { console.error(`INS stays:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${stays.length} stays`);

const { error: e3 } = await s.from("destination_stay_picks").delete().in("destination_id", destIds);
if (e3) { console.error("DEL picks:", e3); process.exit(1); }
console.log(`  ✓ Deleted ${pC} picks`);
for (let i = 0; i < picks.length; i += 50) {
  const { error } = await s.from("destination_stay_picks").insert(picks.slice(i, i + 50));
  if (error) { console.error(`INS picks:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${picks.length} picks`);

console.log(`\n✅ Andhra Pradesh apply complete.`);
