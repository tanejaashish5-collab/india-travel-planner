#!/usr/bin/env node
/**
 * Sprint 8 — Phase D: tail prose.
 *  - Dial 112 universal emergency backfill on 190 empty deep_dive rows.
 *    Dial 112 is India's verified Unified Emergency Number (police,
 *    ambulance, fire) — fabricating destination-specific helplines would
 *    violate no-fake-data rule, so we backfill only the universally-true.
 *  - Bhopal tagline rewrite (the only truly-thin tagline in the DB).
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Pull every destination, find those with empty deep_dive
const { data: dests, error: e1 } = await supabase
  .from("destinations")
  .select("id, name, deep_dive");
if (e1) { console.error(e1); process.exit(1); }

const empty = dests.filter(d =>
  !d.deep_dive ||
  (typeof d.deep_dive === "object" && Object.keys(d.deep_dive).length === 0)
);

console.log(`empty deep_dive: ${empty.length}`);

const universalEntry = {
  local_helpers: [
    {
      name: "Dial 112",
      role: "India Unified Emergency Number — connects to nearest police, ambulance, fire service",
      phone: "112",
      availability: "24/7 nationwide",
    },
  ],
};

let updated = 0;
const errors = [];
for (const d of empty) {
  const { error } = await supabase
    .from("destinations")
    .update({ deep_dive: universalEntry })
    .eq("id", d.id);
  if (error) { errors.push({ id: d.id, error: error.message }); continue; }
  updated++;
}
console.log(`  deep_dive backfilled: ${updated}/${empty.length}`);
if (errors.length) console.log(errors);

// Bhopal tagline — verified facts: city of lakes, MP capital, Bhojpur shivling 28 km, Bhimbetka 45 km
const { error: e2 } = await supabase
  .from("destinations")
  .update({
    tagline: "Six lakes, the Bhojpur shivling, and Bhimbetka rock shelters — Madhya Pradesh's lake capital.",
  })
  .eq("id", "bhopal");
console.log(`  bhopal tagline: ${e2 ? "ERR " + e2.message : "✓"}`);
