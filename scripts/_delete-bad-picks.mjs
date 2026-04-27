import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const audit = JSON.parse(readFileSync("/tmp/audit-results.json", "utf-8"));
const toDelete = audit.filter(r => r.verdict === "WRONG_DEST" || r.verdict === "DUBIOUS");
console.log(`Deleting ${toDelete.length} rows (${audit.filter(r=>r.verdict==="WRONG_DEST").length} WRONG_DEST + ${audit.filter(r=>r.verdict==="DUBIOUS").length} DUBIOUS)\n`);

let deleted = 0, missing = 0;
for (const r of toDelete) {
  const { error, count } = await s.from("destination_stay_picks")
    .delete({ count: "exact" })
    .eq("destination_id", r.destination_id)
    .eq("slot", r.slot);
  if (error) { console.error(`✗ ${r.destination_id}/${r.slot} — ${error.message}`); continue; }
  if (count === 0) missing++;
  else deleted += count;
  console.log(`${count > 0 ? "✓" : "·"} ${r.destination_id.padEnd(20)} ${r.slot.padEnd(11)} ${r.verdict.padEnd(11)} ${r.name.slice(0,50)}`);
}
console.log(`\n✓ Deleted ${deleted} rows, ${missing} were already gone.`);
