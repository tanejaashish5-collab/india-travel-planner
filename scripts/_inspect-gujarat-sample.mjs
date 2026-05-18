import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const SAMPLE_DESTS = ["ahmedabad", "rann-of-kutch", "dwarka", "modhera", "saputara", "statue-of-unity", "lothal", "champaner-pavagadh"];

for (const d of SAMPLE_DESTS) {
  console.log(`\n${"=".repeat(70)}\n${d.toUpperCase()}\n${"=".repeat(70)}`);

  const { data: e, error: eErr } = await s
    .from("local_eateries")
    .select("name, area, category, signature_dish, source_urls, last_verified")
    .eq("destination_id", d);
  if (eErr) console.log("E ERR:", eErr.message);
  console.log(`EATERIES (${(e ?? []).length}):`);
  for (const r of e ?? []) {
    const src = Array.isArray(r.source_urls) ? r.source_urls.length : 0;
    console.log(`  • ${r.name} | ${r.area ?? "?"} | ${r.category ?? "?"} | dish: ${r.signature_dish ?? "-"} | ${src} src | verified ${r.last_verified ?? "?"}`);
  }

  const { data: ls } = await s
    .from("local_stays")
    .select("name, type, location, verified")
    .eq("destination_id", d);
  console.log(`STAYS (${(ls ?? []).length}):`);
  for (const r of ls ?? []) console.log(`  • ${r.name} | ${r.location ?? "?"} | ${r.type ?? "?"} | verified=${r.verified}`);

  const { data: p } = await s
    .from("destination_stay_picks")
    .select("slot, name, why_picked")
    .eq("destination_id", d);
  console.log(`PICKS (${(p ?? []).length}):`);
  for (const r of p ?? []) console.log(`  [${r.slot}] ${r.name} — ${(r.why_picked ?? "").slice(0, 90)}`);
}
