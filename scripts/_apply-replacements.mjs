import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const data = JSON.parse(readFileSync("/tmp/replacement-picks.json", "utf-8"));

// === Task A: insert 36 new picks ===
const taskA = data.task_a_results || [];
const newPicks = [];
let nullCount = 0;
for (const r of taskA) {
  if (!r.result) { nullCount++; continue; }
  newPicks.push({
    destination_id: r.destination_id,
    slot: r.slot,
    name: r.result.name,
    property_type: r.result.property_type,
    price_band: r.result.price_band,
    why_nakshiq: r.result.why_nakshiq,
    signature_experience: r.result.signature_experience,
    sources: r.result.sources ?? [],
    confidence: Math.max(0, Math.min(1, Number(r.result.confidence) || 0.75)),
    voice_flags: [],
    source: "manual",
    contact_only: false,
    contact_info: null,
    published: (Array.isArray(r.result.sources) && r.result.sources.length >= 2) && ((Number(r.result.confidence) || 0.75) >= 0.6),
    refreshed_at: new Date().toISOString(),
  });
}
console.log(`Task A: inserting ${newPicks.length} new picks (${nullCount} honest-scarcity nulls)`);
const { error: errA } = await s.from("destination_stay_picks").upsert(newPicks, { onConflict: "destination_id,slot" });
if (errA) { console.error("Task A failed:", errA); process.exit(1); }
console.log("✓ Task A applied");

// === Task B: update sources for 15 KEEPs (skip the 5 dubious_after_research) ===
const taskB = data.task_b_results || [];
const dubiousB = taskB.filter(r => r.dubious_after_research);
const cleanB = taskB.filter(r => !r.dubious_after_research);
console.log(`\nTask B: ${cleanB.length} clean enrichments, ${dubiousB.length} dubious-after-research (will delete)`);

let bUpdated = 0;
for (const r of cleanB) {
  const { error } = await s.from("destination_stay_picks")
    .update({ sources: r.sources ?? [], refreshed_at: new Date().toISOString(), published: Array.isArray(r.sources) && r.sources.length >= 2 })
    .eq("destination_id", r.destination_id).eq("slot", r.slot);
  if (error) { console.error(`✗ ${r.destination_id}/${r.slot}: ${error.message}`); continue; }
  bUpdated++;
}
console.log(`✓ Updated sources on ${bUpdated} KEEP picks`);

// === Delete the 5 dubious-after-research + the Anandpur Sahib Chandigarh Taj ===
const toDelete = [
  ...dubiousB.map(r => ({ destination_id: r.destination_id, slot: r.slot, reason: "dubious_after_research" })),
  { destination_id: "anandpur-sahib", slot: "experience", reason: "cross-dest (Chandigarh Taj flagged by agent)" },
];
console.log(`\nDeleting ${toDelete.length} additional bad rows:`);
for (const r of toDelete) {
  const { count, error } = await s.from("destination_stay_picks")
    .delete({ count: "exact" })
    .eq("destination_id", r.destination_id).eq("slot", r.slot);
  if (error) { console.error(`✗ ${r.destination_id}/${r.slot}: ${error.message}`); continue; }
  console.log(`  ${count > 0 ? "✓" : "·"} ${r.destination_id.padEnd(20)} ${r.slot.padEnd(11)} (${r.reason})`);
}

// === Final state per affected dest ===
const dests = [...new Set([...newPicks.map(p => p.destination_id), ...cleanB.map(r => r.destination_id), ...toDelete.map(r => r.destination_id)])];
console.log(`\n=== Final state per dest ===`);
let totalPicks = 0, totalSourced = 0;
for (const d of dests.sort()) {
  const { data: rows } = await s.from("destination_stay_picks").select("slot, sources, published").eq("destination_id", d);
  const sourced = (rows ?? []).filter(r => Array.isArray(r.sources) && r.sources.length >= 2).length;
  totalPicks += rows.length; totalSourced += sourced;
  console.log(`  ${d.padEnd(22)} picks=${rows.length}/4 sourced=${sourced}`);
}
console.log(`\nTotal: ${totalPicks} picks, ${totalSourced} sourced (${((totalSourced/totalPicks)*100).toFixed(0)}%)`);
