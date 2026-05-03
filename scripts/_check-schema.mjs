import { createClient } from "@supabase/supabase-js";
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Sample destination row to see what columns actually exist
const { data: d, error: e1 } = await s.from("destinations").select("*").eq("id", "kotagiri").maybeSingle();
if (e1) console.error("dest:", e1);
else console.log("destinations columns:", Object.keys(d || {}).sort().join(", "));

const { data: t, error: e2 } = await s.from("treks").select("*").limit(1).maybeSingle();
if (e2) console.error("treks:", e2);
else console.log("\ntreks columns:", Object.keys(t || {}).sort().join(", "));

// Try emergency_sos
const { data: es, error: e3 } = await s.from("emergency_sos").select("*").limit(1).maybeSingle();
if (e3) console.error("\nemergency_sos:", e3.message);
else console.log("\nemergency_sos columns:", Object.keys(es || {}).sort().join(", "));

// check kotagiri specific data
if (d) {
  console.log("\n--- Kotagiri snapshot ---");
  console.log("daily_cost:", JSON.stringify(d.daily_cost ?? "<absent>"));
  console.log("crowd_calendar:", JSON.stringify(d.crowd_calendar ?? "<absent>"));
  console.log("food_scene:", JSON.stringify(d.food_scene ?? "<absent>"));
  console.log("persona_blocks:", JSON.stringify(d.persona_blocks ?? "<absent>"));
}
