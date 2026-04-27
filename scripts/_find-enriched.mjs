import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// 1. Picks with non-empty sources array (enrichment evidence)
const { data: enrichedPicks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, name, sources, voice_flags, published, confidence, refreshed_at")
  .not("sources", "is", null)
  .order("refreshed_at", { ascending: false })
  .limit(15);

console.log("=== TOP 15 picks by refreshed_at (sources populated) ===");
for (const p of enrichedPicks ?? []) {
  const srcCount = Array.isArray(p.sources) ? p.sources.length : 0;
  console.log(`${p.destination_id.padEnd(20)} ${p.slot.padEnd(11)} pub=${p.published} src=${srcCount} conf=${p.confidence ?? "?"} ${p.refreshed_at?.slice(0,10) ?? "?"}`);
}

// 2. Group: which dests have ALL slots enriched (sources non-empty)?
const { data: allPicks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, sources, published");
const byDest = {};
for (const p of allPicks ?? []) {
  byDest[p.destination_id] = byDest[p.destination_id] ?? { total: 0, withSources: 0, published: 0 };
  byDest[p.destination_id].total++;
  if (Array.isArray(p.sources) && p.sources.length > 0) byDest[p.destination_id].withSources++;
  if (p.published) byDest[p.destination_id].published++;
}
const fullyEnriched = Object.entries(byDest)
  .filter(([_, v]) => v.total >= 3 && v.withSources === v.total && v.published === v.total)
  .slice(0, 10);
console.log("\n=== Fully-enriched dests (all slots have sources + all published) ===");
for (const [d, v] of fullyEnriched) console.log(`${d.padEnd(20)} ${v.total} slots, all enriched`);

// 3. Sample stay_intelligence with upgrade_reasoning
const { data: si } = await s.from("destinations")
  .select("id, stay_intelligence")
  .not("stay_intelligence", "is", null)
  .limit(5);
console.log("\n=== Sample stay_intelligence blobs ===");
for (const r of si ?? []) {
  const ur = r.stay_intelligence?.upgrade_reasoning;
  const note = r.stay_intelligence?.destination_note;
  console.log(`${r.id.padEnd(20)} upgrade_reasoning=${ur ? "YES" : "no"} note=${note ? "YES" : "no"} verified_by=${r.stay_intelligence?.verified_by ?? "—"}`);
}

// 4. Show one full example
if (fullyEnriched[0]) {
  const sampleId = fullyEnriched[0][0];
  const { data: full } = await s.from("destination_stay_picks")
    .select("slot, name, why_nakshiq, sources, published")
    .eq("destination_id", sampleId);
  const { data: fullSI } = await s.from("destinations")
    .select("stay_intelligence")
    .eq("id", sampleId).single();
  console.log(`\n=== FULL EXAMPLE: ${sampleId} ===`);
  console.log("stay_intelligence.upgrade_reasoning:", JSON.stringify(fullSI?.stay_intelligence?.upgrade_reasoning ?? null, null, 2)?.slice(0, 400));
  console.log("\nPicks:");
  for (const p of full ?? []) {
    console.log(`  [${p.slot}] ${p.name} (pub=${p.published}, ${(p.sources ?? []).length} sources)`);
    console.log(`    why: ${p.why_nakshiq?.slice(0, 120)}...`);
  }
}
