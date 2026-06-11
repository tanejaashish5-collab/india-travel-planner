import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "node:fs";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const { data: dests } = await s.from("destinations").select("id, name").eq("state_id", "nagaland").order("id");
const ids = dests.map((d) => d.id);
const { data: picks } = await s
  .from("destination_stay_picks")
  .select("destination_id, slot, name, source, sources, why_nakshiq, signature_experience, property_type, price_band, confidence, contact_info")
  .in("destination_id", ids)
  .order("destination_id");

const out = picks.map((p) => ({
  destination_id: p.destination_id,
  destination_name: dests.find((d) => d.id === p.destination_id)?.name,
  slot: p.slot,
  name: p.name,
  source: p.source,
  source_count: Array.isArray(p.sources) ? p.sources.length : 0,
  sources: p.sources,
  why_nakshiq: p.why_nakshiq,
  signature_experience: p.signature_experience,
  property_type: p.property_type,
  price_band: p.price_band,
  confidence: p.confidence,
  book_url: p.contact_info?.book_url ?? null,
}));
writeFileSync("/tmp/nagaland-stays-current.json", JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} picks → /tmp/nagaland-stays-current.json`);

// Slot map per dest
const slotOrder = ["experience", "value", "location", "xfactor"];
const inv = dests.map((d) => {
  const dPicks = picks.filter((p) => p.destination_id === d.id);
  return {
    destination_id: d.id,
    name: d.name,
    filled_slots: dPicks.map((p) => p.slot),
    missing_slots: slotOrder.filter((slot) => !dPicks.some((p) => p.slot === slot)),
  };
});
writeFileSync("/tmp/nagaland-stays-inventory.json", JSON.stringify(inv, null, 2));
console.log("\n=== Inventory ===");
for (const d of inv) {
  console.log(`  ${d.destination_id.padEnd(20)} filled=[${d.filled_slots.join(",")}] missing=[${d.missing_slots.join(",")}]`);
}
