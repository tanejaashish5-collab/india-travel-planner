import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data: dests, error } = await s
  .from("destinations")
  .select("id, name, state_id, region, tagline")
  .eq("state_id", "gujarat")
  .order("id");

if (error) {
  console.error("destinations query error:", error);
  process.exit(1);
}

console.log(`Gujarat destinations: ${dests.length}\n`);

const ids = dests.map((d) => d.id);

const { data: eaterieCounts } = await s
  .from("local_eateries")
  .select("destination_id")
  .in("destination_id", ids);
const eByDest = {};
for (const r of eaterieCounts ?? []) eByDest[r.destination_id] = (eByDest[r.destination_id] ?? 0) + 1;

const { data: stayCounts } = await s
  .from("local_stays")
  .select("destination_id")
  .in("destination_id", ids);
const sByDest = {};
for (const r of stayCounts ?? []) sByDest[r.destination_id] = (sByDest[r.destination_id] ?? 0) + 1;

const { data: pickCounts } = await s
  .from("destination_stay_picks")
  .select("destination_id, slot, name")
  .in("destination_id", ids);
const pByDest = {};
for (const r of pickCounts ?? []) {
  pByDest[r.destination_id] = pByDest[r.destination_id] ?? [];
  pByDest[r.destination_id].push({ slot: r.slot, name: r.name });
}

console.log("id".padEnd(28) + "name".padEnd(28) + "eat".padStart(5) + "stay".padStart(6) + "picks");
console.log("-".repeat(80));
for (const d of dests) {
  const e = eByDest[d.id] ?? 0;
  const st = sByDest[d.id] ?? 0;
  const p = (pByDest[d.id] ?? []).map((x) => x.slot).join(",") || "-";
  console.log(
    d.id.padEnd(28) +
      (d.name ?? "").slice(0, 27).padEnd(28) +
      String(e).padStart(5) +
      String(st).padStart(6) +
      "  " +
      p,
  );
}

console.log(`\nTotal: ${dests.length} dests`);
console.log(`Dests with 0 eateries: ${dests.filter((d) => !eByDest[d.id]).length}`);
console.log(`Dests with 0 stays:    ${dests.filter((d) => !sByDest[d.id]).length}`);
console.log(`Dests with 0 picks:    ${dests.filter((d) => !pByDest[d.id]).length}`);
