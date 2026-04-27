import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const tables = [
  "confidence_cards", "kids_friendly", "local_legends", "viral_eats",
  "hidden_gems", "festivals", "local_stays", "local_eateries",
  "points_of_interest", "sub_destinations", "traveler_notes",
  "permits", "camping_spots", "destination_stay_picks"
];
const dests = ["amritsar","anandpur-sahib","damdama-sahib","patiala","kurukshetra","morni-hills","pinjore-gardens","chandigarh"];

console.log("dest".padEnd(20) + tables.map(t => t.slice(0,5)).join(" "));
for (const d of dests) {
  const counts = [];
  for (const t of tables) {
    const { count } = await s.from(t).select("*", { count: "exact", head: true }).eq("destination_id", d);
    counts.push(String(count ?? 0).padStart(5));
  }
  const sectionsWithData = counts.filter(c => parseInt(c.trim()) > 0).length;
  console.log(`${d.padEnd(20)}${counts.join(" ")}  → ${sectionsWithData}/14 sections`);
}
