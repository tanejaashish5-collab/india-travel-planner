import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "node:fs";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const dir = "data/research/eateries";
const files = readdirSync(dir).filter(f => f.startsWith("rajasthan-") && f.endsWith(".json"));
console.log(`Loading ${files.length} rajasthan-*.json files`);

const targetDests = new Set(["ajmer","alwar","barmer","bharatpur","bikaner","bundi","chittorgarh","deeg","dungarpur","gagron-fort","jaipur","jaisalmer","jodhpur","kumbhalgarh","mount-abu","neemrana","osian","pushkar","ranakpur","ranthambore","sariska","shekhawati","udaipur"]);

const rows = [];
const dropped = [];
for (const f of files) {
  const arr = JSON.parse(readFileSync(`${dir}/${f}`, "utf-8"));
  for (const r of arr) {
    if (!targetDests.has(r.destination_id)) {
      dropped.push({ file: f, name: r.name, reason: `bad dest: ${r.destination_id}` });
      continue;
    }
    rows.push(r);
  }
}
console.log(`Loaded ${rows.length} rows, ${dropped.length} dropped`);
if (dropped.length) for (const d of dropped) console.log(`  DROP: [${d.file}] ${d.name} — ${d.reason}`);

const { data, error } = await s.from("local_eateries").upsert(rows, { onConflict: "destination_id,name,area" }).select("id");
if (error) { console.error("Upsert failed:", error); process.exit(1); }
console.log(`✓ Upserted ${data?.length ?? rows.length} rows`);

// Verify per dest
console.log("\n=== Per-dest counts ===");
let total = 0;
for (const d of [...targetDests].sort()) {
  const { count } = await s.from("local_eateries").select("*", { count: "exact", head: true }).eq("destination_id", d);
  console.log(`  ${d.padEnd(20)} ${count}`);
  total += count ?? 0;
}
console.log(`---\nTotal: ${total}`);
