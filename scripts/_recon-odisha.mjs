import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data: dests } = await s.from("destinations").select("id, name, region, tagline").eq("state_id", "odisha").order("id");
console.log(`Odisha destinations: ${dests.length}\n`);

const ids = dests.map((d) => d.id);
const { data: eCounts } = await s.from("local_eateries").select("destination_id, name, area, last_verified, source_urls").in("destination_id", ids);
const { data: sCounts } = await s.from("local_stays").select("destination_id, name, verified").in("destination_id", ids);
const { data: pCounts } = await s.from("destination_stay_picks").select("destination_id, slot, name").in("destination_id", ids);

const eByDest = {}, sByDest = {}, pByDest = {};
for (const r of eCounts ?? []) (eByDest[r.destination_id] ??= []).push(r);
for (const r of sCounts ?? []) (sByDest[r.destination_id] ??= []).push(r);
for (const r of pCounts ?? []) (pByDest[r.destination_id] ??= []).push(r);

console.log("dest".padEnd(28) + "eat stay picks   1st eatery quality signal");
console.log("-".repeat(120));
for (const d of dests) {
  const e = eByDest[d.id] ?? [];
  const st = sByDest[d.id] ?? [];
  const p = pByDest[d.id] ?? [];
  const slots = p.map((r) => r.slot).join(",");
  const firstE = e[0];
  const sig = firstE ? `${firstE.name} | area=${firstE.area ? "OK" : "NULL"} | src=${(firstE.source_urls ?? []).length} | v=${firstE.last_verified ?? "NULL"}` : "(none)";
  console.log(d.id.padEnd(28) + String(e.length).padStart(3) + String(st.length).padStart(5) + String(p.length).padStart(7) + "   " + slots.padEnd(35) + " " + sig.slice(0, 70));
}
console.log(`\nTotals: ${eCounts?.length ?? 0} eateries · ${sCounts?.length ?? 0} stays · ${pCounts?.length ?? 0} picks`);

let nullArea = 0, nullDate = 0, weakSources = 0;
for (const r of eCounts ?? []) {
  if (!r.area) nullArea++;
  if (!r.last_verified) nullDate++;
  if (!Array.isArray(r.source_urls) || r.source_urls.length < 3) weakSources++;
}
console.log(`\nQuality signals on ${eCounts?.length ?? 0} eateries:`);
console.log(`  NULL area:           ${nullArea}`);
console.log(`  NULL last_verified:  ${nullDate}`);
console.log(`  <3 source URLs:      ${weakSources}`);
