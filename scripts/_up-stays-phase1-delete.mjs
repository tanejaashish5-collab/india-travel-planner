import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Phase 1: delete picks the dossier flagged as unpublishable / factual_error / wrong-dest.
// Keep clean ones; mechanical-fix rows are handled in phase 2.
const deletes = [
  // AGRA
  { destination_id: "agra", slot: "location", name: "The Coral Hotel" },          // unverified
  { destination_id: "agra", slot: "value", name: "Homestead Agra" },              // doesn't exist
  { destination_id: "agra", slot: "xfactor", name: "Khem Vilas (Agra heritage haveli conversion)" }, // WRONG DEST → Ranthambore
  // AYODHYA
  { destination_id: "ayodhya", slot: "experience", name: "Ramada by Wyndham Ayodhya" }, // not yet open
  { destination_id: "ayodhya", slot: "value", name: "Vishram Homestay" },         // unverified
  // FATEHPUR SIKRI (all 4 unverified per dossier)
  { destination_id: "fatehpur-sikri", slot: "experience", name: "The Verandah - A Fatehpur Sikri Hotel" },
  { destination_id: "fatehpur-sikri", slot: "location", name: "Agra Gateway Hotel" },
  { destination_id: "fatehpur-sikri", slot: "value", name: "Gulnar Guest House" },
  { destination_id: "fatehpur-sikri", slot: "xfactor", name: "Serai Fatehpur" },
  // KUSHINAGAR
  { destination_id: "kushinagar", slot: "experience", name: "The Ashok" },        // ITDC doesn't have a Kushinagar property
  { destination_id: "kushinagar", slot: "location", name: "Kushinagar Vipassana Center Guest House" }, // residential-only, 5km away
  // LUCKNOW
  { destination_id: "lucknow", slot: "location", name: "Hotel Gomti Nivas Palace" }, // unverified
  // SARNATH (3 of 4)
  { destination_id: "sarnath", slot: "location", name: "Varuna Guest House" },
  { destination_id: "sarnath", slot: "value", name: "Sarnath Heritage Guesthouse" },
  { destination_id: "sarnath", slot: "xfactor", name: "Sarnath Vihar (Buddhist Monastery Guesthouse)" },
  // SRAVASTI (all 3 unverified)
  { destination_id: "sravasti", slot: "experience", name: "Sravasti Heritage Resort" },
  { destination_id: "sravasti", slot: "location", name: "Saket Shrine Guesthouse" },
  { destination_id: "sravasti", slot: "value", name: "Buddha Garden Homestay" },
  // VRINDAVAN (3 unverified — keep Brijwasi for rename in phase 2)
  { destination_id: "vrindavan", slot: "experience", name: "Radha Nivas Palace" },
  { destination_id: "vrindavan", slot: "location", name: "Mathura Vrindavan Hotel" },
  { destination_id: "vrindavan", slot: "xfactor", name: "Nidhivan Resort (Glamping pods)" },
  // DUDHWA — Tiger Lagoon Resort is actually in Bandhavgarh MP, not Dudhwa
  { destination_id: "dudhwa-national-park", slot: "experience", name: "Tiger Lagoon Resort" },
];

console.log(`Deleting ${deletes.length} unpublishable picks…`);
let deleted = 0;
for (const d of deletes) {
  const { error, count } = await s
    .from("destination_stay_picks")
    .delete({ count: "exact" })
    .eq("destination_id", d.destination_id)
    .eq("slot", d.slot)
    .eq("name", d.name);
  if (error) {
    console.error(`  ✗ ${d.destination_id}/${d.slot}/${d.name} — ${error.message}`);
  } else {
    console.log(`  ✓ ${d.destination_id}/${d.slot}/${d.name} (${count} row)`);
    deleted += count ?? 0;
  }
}
console.log(`\n${deleted}/${deletes.length} rows deleted`);
