#!/usr/bin/env node
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const { data } = await supabase.from("destination_stay_picks").select("destination_id, slot, confidence").eq("published", false);
let pub = 0, del = 0;
for (const p of data) {
  if ((p.confidence ?? 0) >= 0.6) {
    const { error } = await supabase.from("destination_stay_picks").update({ published: true }).eq("destination_id", p.destination_id).eq("slot", p.slot);
    if (!error) pub++;
  } else {
    const { error } = await supabase.from("destination_stay_picks").delete().eq("destination_id", p.destination_id).eq("slot", p.slot);
    if (!error) del++;
  }
}
console.log(`Published high-conf: ${pub}`);
console.log(`Deleted low-conf:    ${del}`);

const { count: remaining } = await supabase.from("destination_stay_picks").select("destination_id", { count: "exact", head: true }).eq("published", false);
const { count: totalPub } = await supabase.from("destination_stay_picks").select("destination_id", { count: "exact", head: true }).eq("published", true);
console.log(`\nRemaining held: ${remaining}`);
console.log(`Total published picks site-wide: ${totalPub}`);
