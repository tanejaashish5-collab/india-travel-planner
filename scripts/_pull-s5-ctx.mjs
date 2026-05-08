import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const clusters = {
  wb: {
    label: "West Bengal — gems-only topup (5 dests)",
    ids: ["darjeeling", "kalimpong", "shantiniketan", "siliguri", "sundarbans"],
  },
  ng: {
    label: "Nagaland — gems-only topup (6 dests)",
    ids: ["kohima", "mokokchung", "mon", "khonoma", "dzukou-valley", "pfutsero"],
  },
  small: {
    label: "Small leftovers — chandigarh +1 gem, shikharji +1 stay, agartala +1 gem",
    ids: ["chandigarh", "shikharji", "agartala"],
  },
};

for (const [key, c] of Object.entries(clusters)) {
  const { data } = await supabase
    .from("destinations")
    .select(
      "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken"
    )
    .in("id", c.ids);
  writeFileSync(`/tmp/s5-${key}-ctx.json`, JSON.stringify(data, null, 2));
  console.log(`${c.label}: ${data.length} dests written to /tmp/s5-${key}-ctx.json`);
}
