import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const succ = readFileSync("/tmp/enrich-success.txt", "utf-8").trim().split("\n").filter(Boolean);
const full = ["chopta","har-ki-doon","haridwar","rishikesh"];
const allClaimed = [...new Set([...succ, ...full])];
console.log(`Claimed success: ${allClaimed.length}`);

// Today's date
const today = new Date().toISOString().slice(0,10);
const { data } = await s.from("destination_stay_picks")
  .select("destination_id, slot, sources, refreshed_at")
  .in("destination_id", allClaimed)
  .gte("refreshed_at", today + "T00:00:00");

const byDest = {};
for (const r of data ?? []) {
  byDest[r.destination_id] = byDest[r.destination_id] ?? { picks: 0, withSources: 0 };
  byDest[r.destination_id].picks++;
  if (Array.isArray(r.sources) && r.sources.length > 0) byDest[r.destination_id].withSources++;
}

let withSources = 0, picksOnly = 0, missing = 0;
for (const d of allClaimed) {
  const v = byDest[d];
  if (!v) { missing++; continue; }
  if (v.withSources > 0) withSources++; else picksOnly++;
}
console.log(`Refreshed today with sources: ${withSources}`);
console.log(`Refreshed today, no sources: ${picksOnly}`);
console.log(`Not refreshed today: ${missing}`);

// Sample
console.log("\n=== Sample (first 10 enriched) ===");
const sample = allClaimed.slice(0, 10);
for (const d of sample) {
  const v = byDest[d] ?? { picks: 0, withSources: 0 };
  console.log(`${d.padEnd(20)} picks=${v.picks} withSources=${v.withSources}`);
}
