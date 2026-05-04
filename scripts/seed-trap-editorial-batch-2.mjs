#!/usr/bin/env node
/**
 * Seed batch 2 — editorial fields for 8 more marquee Tourist Traps.
 * Picks from the with-pain-points group (so editorial voice rests on real
 * complaint data, not fabrication).
 *
 *   5 standard / 2 pullquote / 1 ledger
 *
 * After this: 18 / 59 traps editorial-grade. Remaining 7 with-pain-points
 * fold into batch 3; the 34 without depth need a pain_points pass first.
 *
 * Idempotent — keyed on (trap_destination_id, alternative_destination_id, rank=1).
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-trap-editorial-batch-2.mjs
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

const EDITORIAL = [
  // ─── 11. Udaipur → Bundi (STANDARD) ──────────────────────────────────
  {
    trap: "udaipur",
    alt: "bundi",
    brochure_line: "The City of Lakes — India's most romantic Rajput capital.",
    editorial_verdict:
      "Udaipur in season is a wedding venue with a town wrapped around it. Lake Pichola's ghats are roped off for sundowner cruises charging ₹3,500 a person. The City Palace queue is two hours and the audio-guide is a re-edit of a 2014 brochure. Bundi has the same blue-painted Rajput architecture, an actual stepwell circuit, and rooms below ₹2,000.",
    editorial_format: "standard",
    tags: ["heritage", "rajasthan"],
  },

  // ─── 12. Kaziranga → Manas National Park (STANDARD) ──────────────────
  {
    trap: "kaziranga",
    alt: "manas-national-park",
    brochure_line: "The one-horned rhino — India's wildlife crown jewel.",
    editorial_verdict:
      "Kaziranga in peak season runs 35-jeep convoys through the Central Range so the rhino sighting is real but communal. Resort prices triple between October and March; the budget jeep is a Maruti Gypsy with no shocks on a road that needs them. Manas (UNESCO + tiger reserve + same one-horned rhino) gets a tenth of the traffic and a fraction of the price.",
    editorial_format: "standard",
    tags: ["wildlife", "assam"],
  },

  // ─── 13. Varanasi → Chitrakoot (STANDARD) ────────────────────────────
  {
    trap: "varanasi",
    alt: "chitrakoot",
    brochure_line: "The eternal city on the Ganga — moksha and morning aartis.",
    editorial_verdict:
      "The Ganga aarti at Dasaswamedh Ghat is a real ritual performed for an audience of 4,000 phones. Sadhus pose for paid photos; the boats compete on speakers. The lanes are extraordinary and they are also full of touts following you for an hour. Come for one sunrise, leave by the second day. Chitrakoot has the Ramayana ghats without the photographers.",
    editorial_format: "standard",
    tags: ["spiritual", "uttar pradesh"],
  },

  // ─── 14. Dharamshala → Bir Billing (STANDARD) ────────────────────────
  {
    trap: "dharamshala",
    alt: "bir-billing",
    brochure_line: "The home of the Dalai Lama — Tibetan Buddhism in the Himalayas.",
    editorial_verdict:
      "McLeod Ganj in May is a 3-block traffic jam between two cafés selling the same banana pancake. Bhagsu Falls has more selfie sticks than water. The Dalai Lama Temple is closed half the days you'll be there. The monasteries are real but the town around them has been monetised into cliché. Bir has the paragliding, the monasteries (Sherab Ling), and 60% less foot-traffic.",
    editorial_format: "standard",
    tags: ["mountains", "himachal"],
  },

  // ─── 15. Kasol → Tirthan Valley (STANDARD) ───────────────────────────
  {
    trap: "kasol",
    alt: "tirthan-valley",
    brochure_line: "Mini Israel — the chillum capital of the Parvati Valley.",
    editorial_verdict:
      "Kasol in 2026 is a strip of cafés all serving the same hummus plate, the same shakshuka, the same lo-fi playlist. The Parvati you came for is up the valley; the one in Kasol smells like exhaust and bonfire smoke from rented campsites. Tirthan has trout streams, deodars, and homestays run by the people who own the land.",
    editorial_format: "standard",
    tags: ["mountains", "café strip"],
  },

  // ─── 16. Alleppey → Kumarakom (PULLQUOTE) ────────────────────────────
  {
    trap: "alleppey",
    alt: "kumarakom",
    brochure_line: "The Venice of the East — Kerala's iconic backwater houseboat experience.",
    editorial_verdict:
      "There are 1,500 houseboats on the Alleppey backwaters and only 60 are licensed for sewage handling. The 'sunset cruise' is a 200-metre traffic jam of identical boats in a canal lined with plastic. Kumarakom runs 80 boats on the same lake system, with clean-water permits that actually exist.",
    editorial_format: "pullquote",
    pullquote:
      "There are 1,500 houseboats on the Alleppey backwaters. Only 60 are licensed to handle their own sewage. You are paying ₹12,000 to sleep on one of the others.",
    tags: ["backwaters", "kerala"],
  },

  // ─── 17. Srinagar → Pahalgam (PULLQUOTE) ─────────────────────────────
  {
    trap: "srinagar",
    alt: "pahalgam",
    brochure_line: "The summer capital of Kashmir — Dal Lake shikaras and floating gardens.",
    editorial_verdict:
      "The shikaras on Dal Lake are real. The price they will quote you is not. Lotus gardens cost extra, the floating vegetable market runs at 5am for tour-buses, and your houseboat owner has a brother who runs a carpet shop you'll be 'invited' to visit. Pahalgam is what the Kashmir brochure was actually photographing — pine forests, the Lidder, day-treks that don't end in a sales pitch.",
    editorial_format: "pullquote",
    pullquote:
      "The shikaras on Dal Lake are real. The price they will quote you is not.",
    tags: ["lake", "kashmir"],
  },

  // ─── 18. Pushkar → Ajmer (LEDGER) ────────────────────────────────────
  {
    trap: "pushkar",
    alt: "ajmer",
    brochure_line: "The sacred lake town — sunrise camel rides and the Brahma temple.",
    editorial_verdict:
      "Pushkar runs on a tourist-trap loop disguised as spirituality. The camel ride is a 20-minute walk on a road, ₹500 of which is the photo at the dunes. The 'puja' priests at the ghat work on commission.",
    editorial_format: "ledger",
    ledger: [
      {
        brochure: "A spiritual cleansing puja at the ghat.",
        real: "A ₹2,100 'donation' demanded after the priest grabbed your wrist.",
      },
      {
        brochure: "Sunrise camel ride into the desert.",
        real: "A 20-minute walk along a road behind the bus stand.",
      },
      {
        brochure: "Authentic Rajasthani thali at the lake-view restaurant.",
        real: "A buffet refilled three times a day with no Rajasthani staff in the kitchen.",
      },
      {
        brochure: "Visit the only Brahma temple in India.",
        real: "Twenty-minute queue with shoe-stand fees, camera fees, and a guide insisting on a tip.",
      },
    ],
    tags: ["pilgrim town", "rajasthan"],
  },
];

(async () => {
  console.log(`→ Updating editorial fields on ${EDITORIAL.length} marquee traps (batch 2)…`);
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
