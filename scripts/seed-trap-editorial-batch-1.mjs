#!/usr/bin/env node
/**
 * Seed batch 1 — editorial fields for the 10 marquee Tourist Traps that
 * already have pain_points/common_complaints (25 total in DB; we pick 10
 * with state diversity + design-format spread).
 *
 *   6 standard / 2 pullquote / 2 ledger
 *
 * Format spread matches `nakshiq-design-system/project/tourist-traps/data.js`
 * — the design rotates formats down the page so the read stays alive.
 *
 * Voice: opinionated, declarative, no hedging. Brochure-line is the
 * marketing tagline rendered struck-through; editorial_verdict is the
 * 1-3 sentence editor's verdict.
 *
 * Idempotent — keyed on (trap_destination_id, alternative_destination_id, rank=1).
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-trap-editorial-batch-1.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// trap_destination_id → editorial fields. Each entry hits the rank-1 row
// (the primary alternative). Other ranks keep alt_better_for / why_better
// from earlier batches.
const EDITORIAL = [
  // ─── 1. Pangong Tso → Tso Moriri (PULLQUOTE) ────────────────────────
  {
    trap: "pangong-lake",
    alt: "tso-moriri",
    brochure_line: "The lake from 3 Idiots. Bucket-list blue.",
    editorial_verdict:
      "If Pangong is Ladakh for Instagram, Tso Moriri is Ladakh for the soul. 500 vehicles a day churn the Pangong road; the lakeshore is a tent-camp strip with Punjabi dhabas piping Bollywood through tinny speakers. The water is still blue. So is every other lake up here.",
    editorial_format: "pullquote",
    pullquote:
      "If Pangong is Ladakh for Instagram, Tso Moriri is Ladakh for the soul.",
    tags: ["high-altitude lake", "ladakh"],
  },

  // ─── 2. Manali → Tirthan Valley (STANDARD) ──────────────────────────
  {
    trap: "manali",
    alt: "tirthan-valley",
    brochure_line: "The romantic hill-station heart of Himachal.",
    editorial_verdict:
      "Manali Mall Road in season is a traffic jam wearing a fur coat. Honeymooners on rented Royal Enfields, fake yak-rides, 'Tibetan' rugs from Panipat. The mountains are still there, technically, behind the 14-storey hotels. Old Manali still has its trees; everywhere else has been monetised.",
    editorial_format: "standard",
    tags: ["hill station", "himachal"],
  },

  // ─── 3. Mussoorie → Lansdowne (STANDARD) ────────────────────────────
  {
    trap: "mussoorie",
    alt: "lansdowne",
    brochure_line: "The Queen of the Hills — Ruskin Bond's eternal mountain town.",
    editorial_verdict:
      "Mall Road in May is a 2km bumper-to-bumper line of cars from Delhi NCR with the windows down playing Honey Singh. Gun Hill Cable Car runs once an hour at full capacity. Kempty Falls has a parking fee, an entry fee, and a queue to stand in the water with 800 strangers. Ruskin Bond moved to Landour for a reason.",
    editorial_format: "standard",
    tags: ["hill station", "uttarakhand"],
  },

  // ─── 4. Lonavala → Igatpuri (STANDARD) ──────────────────────────────
  {
    trap: "lonavala",
    alt: "igatpuri",
    brochure_line: "Mumbai's monsoon weekend escape — waterfalls and chikki.",
    editorial_verdict:
      "Lonavala in monsoon is the Mumbai-Pune Expressway, parked. Tiger Point has a 2km traffic jam to see a viewpoint visible from the road. Bushi Dam is a stair-master in flip-flops with 4,000 strangers. The chikki shops on the highway are wholesale-price pretending to be artisanal. Igatpuri has the same Sahyadri waterfalls without the Sunday-trip industrial complex.",
    editorial_format: "standard",
    tags: ["hill station", "monsoon"],
  },

  // ─── 5. Nainital → Munsiyari (STANDARD) ─────────────────────────────
  {
    trap: "nainital",
    alt: "munsiyari",
    brochure_line: "The lake town of the Kumaon hills — boating and Mall Road bliss.",
    editorial_verdict:
      "Nainital in summer is what happens when a lake town accepts every car that drives up to it. The lake is choked with motorboats running on diesel; Mall Road is closed half the day because too many SUVs tried to park on it. The ropeway has a 90-minute queue for a 4-minute ride. Munsiyari has actual Panchachuli views and roughly 200 people in town.",
    editorial_format: "standard",
    tags: ["hill station", "lake"],
  },

  // ─── 6. Agra → Chitrakoot (STANDARD) ────────────────────────────────
  {
    trap: "agra",
    alt: "chitrakoot",
    brochure_line: "The city of the Taj — India's most romantic monument.",
    editorial_verdict:
      "The Taj is still extraordinary. Agra around it is not. Touts at every gate, foreign-tourist pricing on a tea, the Yamuna black with effluent two hundred metres from the marble. The 'sunrise crowd' is 4,000 people queuing in the dark, and you will photograph the Taj over someone's selfie stick. Come for the building, leave by lunch — or come at moonlight, capped and timed.",
    editorial_format: "standard",
    tags: ["monument", "uttar pradesh"],
  },

  // ─── 7. Darjeeling → Kalimpong (STANDARD) ───────────────────────────
  {
    trap: "darjeeling",
    alt: "kalimpong",
    brochure_line: "The toy-train hill station with a view of Kanchenjunga.",
    editorial_verdict:
      "Darjeeling in 2026 is a hill town that has run out of hill. The Mall is a parking lot, Tiger Hill at sunrise is 600 cars deep, and the toy train is mostly broken-down between Ghum and the workshop. The tea is real but you're drinking it inside a souvenir shop. Kalimpong has the same Kanchenjunga, half the noise, and tea estates that haven't been turned into Instagram backdrops.",
    editorial_format: "standard",
    tags: ["hill station", "tea"],
  },

  // ─── 8. Jaipur → Bundi (PULLQUOTE) ─────────────────────────────────
  {
    trap: "jaipur",
    alt: "bundi",
    brochure_line: "The Pink City — palaces, bazaars, the iconic Hawa Mahal.",
    editorial_verdict:
      "The Hawa Mahal is a façade. Literally. The building is one room deep. You are queuing across a six-lane road for a photograph from the rooftop café of a competing souvenir shop. Bundi is what Jaipur was before the package-tour buses found it.",
    editorial_format: "pullquote",
    pullquote:
      "The Hawa Mahal is a façade. Literally. The building is one room deep — and you are queuing across a six-lane road to photograph it.",
    tags: ["heritage", "rajasthan"],
  },

  // ─── 9. Goa Calangute-Baga → Agonda (LEDGER) ────────────────────────
  {
    trap: "calangute-baga",
    alt: "agonda",
    brochure_line: "Sun, sand, and the famous Goan beach-shack hospitality.",
    editorial_verdict:
      "Calangute and Baga in season are a charter-tourist photo-op surrounded by parking touts. The shacks are subleased to Mumbai operators. The 'fresh seafood' is Karwar fish, frozen.",
    editorial_format: "ledger",
    ledger: [
      {
        brochure: "Empty beach shacks, soft sand, a quiet sunset.",
        real: "₹600 entry to a beach club for a plastic chair.",
      },
      {
        brochure: "Local seafood at honest prices.",
        real: "Charter-flight pricing. The fish is from Karwar, frozen.",
      },
      {
        brochure: "A laid-back Goan vibe.",
        real: "EDM until 4am, sand bikes, a police checkpoint every 2km.",
      },
      {
        brochure: "Friendly Goan hospitality.",
        real: "Most staff are seasonal labour from Jharkhand. They are tired.",
      },
    ],
    tags: ["beach", "goa"],
  },

  // ─── 10. Shimla → Chamba (LEDGER) ───────────────────────────────────
  {
    trap: "shimla",
    alt: "chamba",
    brochure_line: "The summer capital of British India — Mall Road and toy train.",
    editorial_verdict:
      "Shimla is what Mussoorie wants to be when it grows up. The Ridge has a Wi-Fi hotspot and four McDonald's-adjacent dosa stalls. Christ Church is now mostly a backdrop. The toy train is real but full. Chamba is what hill stations look like before they become hill stations.",
    editorial_format: "ledger",
    ledger: [
      {
        brochure: "A walk down the historic Mall Road.",
        real: "A 90-minute crowd-shuffle past phone shops and chain cafés.",
      },
      {
        brochure: "Quiet pine-scented colonial bungalows.",
        real: "12-storey hotels stacked vertically on the slope, blocking the pine.",
      },
      {
        brochure: "Romantic toy-train ride from Kalka.",
        real: "Booked four months ahead. You will drive up.",
      },
      {
        brochure: "Crisp mountain air.",
        real: "Diesel fumes from 8,000 cars idling on Cart Road.",
      },
    ],
    tags: ["hill station", "himachal"],
  },
];

(async () => {
  console.log(`→ Updating editorial fields on ${EDITORIAL.length} marquee traps…`);
  let updated = 0;
  let missed = 0;

  for (const e of EDITORIAL) {
    const payload = {
      brochure_line: e.brochure_line,
      editorial_verdict: e.editorial_verdict,
      editorial_format: e.editorial_format,
      pullquote: e.pullquote ?? null,
      ledger: e.ledger ?? null,
      tags: e.tags ?? [],
    };
    const { data, error } = await supabase
      .from("tourist_trap_alternatives")
      .update(payload)
      .eq("trap_destination_id", e.trap)
      .eq("alternative_destination_id", e.alt)
      .eq("rank", 1)
      .select("trap_destination_id");

    if (error) {
      console.error(`  × ${e.trap} → ${e.alt}:`, error.message);
      missed++;
      continue;
    }
    if (!data || data.length === 0) {
      console.warn(`  ! ${e.trap} → ${e.alt}: no rank-1 row found, skipped`);
      missed++;
      continue;
    }
    updated++;
    console.log(`  ✓ ${e.trap.padEnd(20)} → ${e.alt.padEnd(24)} [${e.editorial_format}]`);
  }

  console.log(`\nDone. ${updated} updated, ${missed} skipped.`);
})();
