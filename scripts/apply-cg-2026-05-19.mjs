#!/usr/bin/env node
/* eslint-disable no-console */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = new Set(process.argv.slice(2));
const DRY_RUN = !args.has("--commit");
const STATE = "chhattisgarh";

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

function fallbackMapsUrl(row) {
  const q = encodeURIComponent(`${row.name} ${row.area ?? ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const { data: dests } = await s.from("destinations").select("id").eq("state_id", STATE).order("id");
const destIds = dests.map((d) => d.id);
console.log(`Chhattisgarh: ${destIds.length} destinations`);

const EAT_DIR = path.join(ROOT, "data", "research", "eateries");
const eatFiles = readdirSync(EAT_DIR).filter((f) => f.startsWith("chhattisgarh-") && f.endsWith(".json"));
const eateries = [];
for (const f of eatFiles) {
  const rows = JSON.parse(readFileSync(path.join(EAT_DIR, f), "utf-8"));
  for (const r of rows) {
    if (!destIds.includes(r.destination_id)) { console.warn(`  ⚠ ${f}: dest "${r.destination_id}"`); continue; }
    if (!r.google_maps_url || r.google_maps_url.includes("maps.app.goo.gl")) r.google_maps_url = fallbackMapsUrl(r);
    eateries.push(r);
  }
}
console.log(`Eateries to insert: ${eateries.length} (from ${eatFiles.length} files)`);

const stays = JSON.parse(readFileSync(path.join(ROOT, "data/research/stays/chhattisgarh-new-stays-2026-05-19.json"), "utf-8"));
console.log(`Stays to insert: ${stays.length}`);

const picksAudit = JSON.parse(readFileSync(path.join(ROOT, "data/research/stays-audit/chhattisgarh-replacements-2026-05-19.json"), "utf-8"));
const picks = [];
let honestScarcityCount = 0;
for (const t of picksAudit.task_a_results ?? []) {
  if (t.verdict === "honest_scarcity" || !t.replacement) { honestScarcityCount++; continue; }
  if (!destIds.includes(t.destination_id)) continue;
  const rep = t.replacement;
  picks.push({
    destination_id: t.destination_id, slot: t.slot, name: rep.name,
    property_type: rep.tier ?? null, price_band: rep.price_band ?? null,
    why_nakshiq: rep.tagline ?? "", source: "web_search",
    source_ref: rep.book_url ?? (rep.sources?.[0] ?? null),
    sources: rep.sources ?? null, confidence: 0.9, refreshed_at: "2026-05-19", published: true,
    signature_experience: null, contact_only: false, contact_info: null, voice_flags: null, parking_type: null,
  });
}
console.log(`Picks to insert: ${picks.length} (honest scarcity skipped: ${honestScarcityCount})`);

const { count: eC } = await s.from("local_eateries").select("*", { count: "exact", head: true }).in("destination_id", destIds);
const { count: lsC } = await s.from("local_stays").select("*", { count: "exact", head: true }).in("destination_id", destIds);
const { count: pC } = await s.from("destination_stay_picks").select("*", { count: "exact", head: true }).in("destination_id", destIds);
console.log(`\nExisting:\n  eateries: ${eC}\n  stays:    ${lsC}\n  picks:    ${pC}`);

console.log(`\nPlan:\n  DELETE ${eC} eateries → INSERT ${eateries.length} (net ${eateries.length - eC})\n  DELETE ${lsC} stays    → INSERT ${stays.length} (net ${stays.length - lsC})\n  DELETE ${pC} picks    → INSERT ${picks.length} (net ${picks.length - pC})`);

if (DRY_RUN) { console.log(`\n[DRY-RUN]`); process.exit(0); }

console.log(`\n[COMMIT]…`);
const { error: e1 } = await s.from("local_eateries").delete().in("destination_id", destIds);
if (e1) { console.error("DEL e:", e1); process.exit(1); }
const { error: e1b } = await s.from("local_eateries").insert(eateries);
if (e1b) { console.error("INS e:", e1b); process.exit(1); }
console.log(`  ✓ ${eateries.length} eateries`);

const { error: e2 } = await s.from("local_stays").delete().in("destination_id", destIds);
if (e2) { console.error("DEL s:", e2); process.exit(1); }
const { error: e2b } = await s.from("local_stays").insert(stays);
if (e2b) { console.error("INS s:", e2b); process.exit(1); }
console.log(`  ✓ ${stays.length} stays`);

const { error: e3 } = await s.from("destination_stay_picks").delete().in("destination_id", destIds);
if (e3) { console.error("DEL p:", e3); process.exit(1); }
const { error: e3b } = await s.from("destination_stay_picks").insert(picks);
if (e3b) { console.error("INS p:", e3b); process.exit(1); }
console.log(`  ✓ ${picks.length} picks`);

console.log(`\n✅ CG apply complete.`);
