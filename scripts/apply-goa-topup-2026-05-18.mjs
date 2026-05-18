#!/usr/bin/env node
/* eslint-disable no-console */
// Apply Goa light-audit topup: DELETE 15 fabricated eateries, UPDATE 49 source_urls,
// INSERT 20 new stays for 7 zero-stay dests, INSERT 6 picks for missing slots.
//
// Usage:
//   node scripts/apply-goa-topup-2026-05-18.mjs --dry-run
//   node scripts/apply-goa-topup-2026-05-18.mjs --commit

import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = new Set(process.argv.slice(2));
const DRY_RUN = !args.has("--commit");
const STATE = "goa";

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// --- Load inputs ---
const sourceTopups = JSON.parse(readFileSync(path.join(ROOT, "data/research/eateries-topup/goa-source-topups.json"), "utf-8"));
const newStays = JSON.parse(readFileSync(path.join(ROOT, "data/research/stays/goa-zero-dests-topup-2026-05-18.json"), "utf-8"));
const newPicks = JSON.parse(readFileSync(path.join(ROOT, "data/research/stays-audit/goa-missing-picks-2026-05-18.json"), "utf-8"));

const drops = sourceTopups.filter((r) => r._drop === true);
const topups = sourceTopups.filter((r) => r._drop !== true);

console.log(`Goa topup plan:`);
console.log(`  Eateries to DELETE (fabricated): ${drops.length}`);
console.log(`  Eateries to UPDATE (source topup): ${topups.length}`);
console.log(`  Stays to INSERT: ${newStays.length}`);
console.log(`  Picks to INSERT: ${newPicks.length}`);

// Show fabrications being dropped
console.log(`\nFabrications to DELETE:`);
for (const r of drops) console.log(`  • ${r.destination_id}/${r.name} — ${r._drop_reason}`);

// Validate dests exist in DB
const { data: dests } = await s.from("destinations").select("id").eq("state_id", STATE);
const destIds = new Set(dests.map((d) => d.id));

let badStays = 0, badPicks = 0;
for (const r of newStays) if (!destIds.has(r.destination_id)) { console.warn(`  ⚠ stay dest "${r.destination_id}" not in Goa`); badStays++; }
for (const r of newPicks) if (!destIds.has(r.destination_id)) { console.warn(`  ⚠ pick dest "${r.destination_id}" not in Goa`); badPicks++; }
if (badStays || badPicks) { console.error(`Bad dest_ids: ${badStays} stays, ${badPicks} picks`); process.exit(1); }

if (DRY_RUN) {
  console.log(`\n[DRY-RUN] No writes. Re-run with --commit to execute.`);
  process.exit(0);
}

console.log(`\n[COMMIT] Writing to Supabase…`);

// 1. DELETE 15 fabricated eateries (by (destination_id, name, area))
let deletedCount = 0;
for (const r of drops) {
  let query = s.from("local_eateries").delete().eq("destination_id", r.destination_id).eq("name", r.name);
  if (r.area) query = query.eq("area", r.area);
  const { error, count } = await query.select("id");
  if (error) { console.error(`DELETE eatery ${r.name}:`, error); process.exit(1); }
  deletedCount++;
}
console.log(`  ✓ Attempted DELETE on ${drops.length} fabricated eateries`);

// 2. UPDATE 49 rows: source_urls + last_verified by (destination_id, name)
let updatedCount = 0;
for (const r of topups) {
  const upd = { source_urls: r.source_urls, last_verified: r.last_verified ?? "2026-05-18" };
  const { error } = await s.from("local_eateries").update(upd).eq("destination_id", r.destination_id).eq("name", r.name);
  if (error) { console.error(`UPDATE eatery ${r.destination_id}/${r.name}:`, error); process.exit(1); }
  updatedCount++;
}
console.log(`  ✓ Updated ${updatedCount} eatery source_urls + last_verified`);

// 3. INSERT 20 new stays — normalize contact-as-object if needed
//    (Gujarat stays applied with object contact; same path here.)
const staysToInsert = newStays.map((r) => ({
  destination_id: r.destination_id,
  name: r.name,
  type: r.type,
  location: r.location,
  why_special: r.why_special,
  price_range: r.price_range,
  contact: r.contact,
  best_for: r.best_for,
  verified: r.verified ?? true,
  tags: r.tags,
}));
for (let i = 0; i < staysToInsert.length; i += 50) {
  const chunk = staysToInsert.slice(i, i + 50);
  const { error } = await s.from("local_stays").insert(chunk);
  if (error) { console.error(`INSERT stays chunk ${i}:`, error); process.exit(1); }
}
console.log(`  ✓ Inserted ${staysToInsert.length} stays`);

// 4. INSERT 6 picks — same shape as Gujarat/Maharashtra
const picksToInsert = [];
let pSkip = 0;
for (const t of newPicks) {
  if (t.verdict === "honest_scarcity" || !t.replacement) { pSkip++; continue; }
  const rep = t.replacement;
  picksToInsert.push({
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
const { error: pErr } = await s.from("destination_stay_picks").insert(picksToInsert);
if (pErr) { console.error(`INSERT picks:`, pErr); process.exit(1); }
console.log(`  ✓ Inserted ${picksToInsert.length} picks (skipped ${pSkip} honest-scarcity)`);

console.log(`\n✅ Goa topup complete.`);
