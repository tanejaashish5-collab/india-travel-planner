import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const ids = [
  "ayodhya", "lucknow", "prayagraj",
  "dalhousie", "kasauli",
  "corbett-national-park", "ranikhet",
  "mount-abu", "badrinath", "mukteshwar",
];

const { data: dests } = await supabase.from("destinations")
  .select("id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken")
  .in("id", ids);

const { data: existingGems } = await supabase.from("hidden_gems")
  .select("id, near_destination_id, name").in("near_destination_id", ids);

writeFileSync("/tmp/s9-ctx.json", JSON.stringify({
  label: "S9 — gap=2 +2g cohort, 10 dests × 2 gems each",
  task_per_dest: {
    ayodhya: "+2 gems · TIER-1 EXCLUDE: Ram Janmabhoomi / Ram Mandir / Hanuman Garhi / Kanak Bhavan / Treta Ke Thakur / Sarayu Ghat aarti",
    lucknow: "+2 gems · TIER-1 EXCLUDE: Bara Imambara / Chota Imambara / Rumi Darwaza / Bhul Bhulaiya / Hazratganj / Residency / Ambedkar Park",
    prayagraj: "+2 gems · TIER-1 EXCLUDE: Triveni Sangam / Anand Bhawan / Allahabad Fort / Khusro Bagh / All Saints Cathedral",
    dalhousie: "+2 gems · existing: any flagged below",
    kasauli: "+2 gems",
    "corbett-national-park": "+2 gems",
    ranikhet: "+2 gems",
    "mount-abu": "+2 gems · MID-TIER but watch: exclude Dilwara Temples / Nakki Lake / Sunset Point / Guru Shikhar (canonical)",
    badrinath: "+2 gems · PILGRIM TIER-1 EXCLUDE: Badrinath Temple / Tapt Kund / Mana Village / Vasudhara Falls (already in DB) / Brahma Kapal",
    mukteshwar: "+2 gems",
  },
  dests,
  existing: { gems: existingGems },
}, null, 2));

console.log(`wrote /tmp/s9-ctx.json — ${dests.length} dests · ${existingGems.length} existing gems`);
