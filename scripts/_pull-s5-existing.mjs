import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const all = {
  wb: ["darjeeling", "kalimpong", "shantiniketan", "siliguri", "sundarbans"],
  ng: ["kohima", "mokokchung", "mon", "khonoma", "dzukou-valley", "pfutsero"],
  small: ["chandigarh", "shikharji", "agartala"],
};

const allIds = [...all.wb, ...all.ng, ...all.small];

const { data: eats } = await supabase
  .from("local_eateries")
  .select("destination_id, name")
  .in("destination_id", allIds);

const { data: gems } = await supabase
  .from("hidden_gems")
  .select("near_destination_id, id, name")
  .in("near_destination_id", allIds);

const { data: stays } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name")
  .in("destination_id", allIds);

const summary = {};
for (const id of allIds) {
  summary[id] = {
    existing_eats: eats.filter((e) => e.destination_id === id).map((e) => e.name).sort(),
    existing_gems: gems.filter((g) => g.near_destination_id === id).map((g) => g.name).sort(),
    existing_stays: stays
      .filter((s) => s.destination_id === id)
      .reduce((acc, s) => {
        acc[s.slot] = s.name;
        return acc;
      }, {}),
  };
}

writeFileSync("/tmp/s5-existing.json", JSON.stringify(summary, null, 2));

for (const [key, ids] of Object.entries(all)) {
  const lines = [];
  for (const id of ids) {
    const s = summary[id];
    lines.push(`## ${id}`);
    lines.push(`existing eats (${s.existing_eats.length}): ${s.existing_eats.join(" | ") || "—"}`);
    lines.push(`existing gems (${s.existing_gems.length}): ${s.existing_gems.join(" | ") || "—"}`);
    const stayLines = Object.entries(s.existing_stays).map(([k, v]) => `  ${k}: ${v}`).join("\n");
    lines.push(`existing stays (${Object.keys(s.existing_stays).length}/4):${stayLines ? "\n" + stayLines : " —"}`);
    lines.push("");
  }
  writeFileSync(`/tmp/s5-${key}-existing.md`, lines.join("\n"));
  console.log(`wrote /tmp/s5-${key}-existing.md`);
}
