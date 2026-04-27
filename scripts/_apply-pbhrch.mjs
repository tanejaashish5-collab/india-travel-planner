import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { config } from "dotenv";
import path from "node:path";
import { readdirSync } from "node:fs";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const targetDests = new Set(["amritsar","anandpur-sahib","damdama-sahib","patiala","kurukshetra","morni-hills","pinjore-gardens","chandigarh"]);
const targetFiles = ["punjab-amritsar-zone-1-golden-temple.json","punjab-amritsar-zone-2-lawrence-road.json","punjab-amritsar-zone-3-hall-bazaar-katra.json","punjab-amritsar-zone-4-ranjit-avenue-modern.json","punjab-anandpur-sahib.json","punjab-damdama-sahib.json","punjab-patiala.json","haryana-kurukshetra.json","haryana-morni-hills.json","haryana-pinjore-gardens.json","chandigarh-chandigarh.json"];

const rows = [];
for (const f of targetFiles) {
  try {
    const arr = JSON.parse(readFileSync(`data/research/eateries/${f}`, "utf-8"));
    for (const r of arr) if (targetDests.has(r.destination_id)) rows.push(r);
  } catch (e) { console.error(`Skip ${f}: ${e.message}`); }
}
console.log(`Loaded ${rows.length} rows from ${targetFiles.length} files`);

const { data, error } = await s.from("local_eateries").upsert(rows, { onConflict: "destination_id,name,area" }).select("id");
if (error) { console.error("Upsert failed:", error); process.exit(1); }
console.log(`✓ Upserted ${data?.length ?? rows.length} rows`);
