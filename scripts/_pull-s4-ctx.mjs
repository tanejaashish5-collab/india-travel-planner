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
  pbhrch: {
    label: "Punjab + Chandigarh + Haryana",
    ids: [
      "amritsar", "anandpur-sahib", "damdama-sahib", "patiala",
      "chandigarh", "kurukshetra", "morni-hills", "pinjore-gardens",
    ],
  },
  jhcg: {
    label: "Jharkhand + Chhattisgarh",
    ids: [
      "deoghar", "netarhat", "ranchi", "shikharji",
      "barnawapara", "jagdalpur", "sirpur",
    ],
  },
  mnmz: {
    label: "Manipur + Mizoram",
    ids: [
      "imphal", "loktak-lake", "moreh", "tamenglong", "ukhrul",
      "aizawl", "champhai", "lunglei", "phawngpui-peak",
    ],
  },
};

for (const [key, c] of Object.entries(clusters)) {
  const { data } = await supabase
    .from("destinations")
    .select(
      "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken, cell_network, atm_available, permit_required"
    )
    .in("id", c.ids);
  writeFileSync(`/tmp/s4-${key}-ctx.json`, JSON.stringify(data, null, 2));
  console.log(`${c.label}: ${data.length} dests written to /tmp/s4-${key}-ctx.json`);
}
