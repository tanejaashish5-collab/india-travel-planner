import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const { data, error } = await supabase.from("routes").select("id,name,day_by_day").order("id");
if (error) { console.error(error); process.exit(1); }

const shapes = new Map();
for (const r of data) {
  const days = r.day_by_day ?? [];
  if (days.length === 0) {
    const k = "EMPTY";
    if (!shapes.has(k)) shapes.set(k, []);
    shapes.get(k).push(r.id);
    continue;
  }
  const first = days[0] ?? {};
  const keys = Object.keys(first).sort().join("+");
  if (!shapes.has(keys)) shapes.set(keys, []);
  shapes.get(keys).push(r.id);
}
console.log(`Total routes: ${data.length}`);
for (const [k, ids] of shapes) {
  console.log(`\n[${k}]  ${ids.length} routes`);
  console.log(`  ${ids.slice(0, 5).join(", ")}${ids.length > 5 ? ` … (+${ids.length - 5})` : ""}`);
}
