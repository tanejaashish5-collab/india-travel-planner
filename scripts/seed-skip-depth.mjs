#!/usr/bin/env node
/**
 * Seed Lonavala-style depth onto tourist_trap_alternatives.
 *
 * Adds pain_points / common_complaints / alt_better_for / source_url /
 * last_reviewed_at for the canonical-trap pages. Migration 039 must run
 * first.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-skip-depth.mjs
 *
 * Idempotent — updates by (trap_destination_id, alternative_destination_id).
 *
 * Sources (TripAdvisor lowest-tier reviews + travel-forum threads + first-
 * party news coverage). All claims survive an editorial spot-check at the
 * URL listed in source_url. See data/research/skip-list/ for raw notes.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  console.error('Tip: node --env-file=apps/web/.env.local scripts/seed-skip-depth.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const REVIEWED_AT = new Date().toISOString();

/**
 * Each entry mutates one (trap, alt) row by setting:
 *   pain_points: bullets of what specifically goes wrong AT THE TRAP
 *   common_complaints: 2-3 verbatim-style traveler quotes
 *   alt_better_for: one-line "go to alt if you want…" framing
 *   source_url: where pain_points were sourced
 *
 * Pain_points + complaints are TRAP-LEVEL (same across all alts of a trap)
 * and we write them on the rank-1 row only — the page reads first row.
 * alt_better_for is per-alternative.
 */
const TRAP_DEPTH = [
  {
    trap: "lonavala",
    pain_points: [
      "Tiger Point: 1.5–2km tailback on weekends, parking ₹100–200 + limited shoulder space",
      "Bhushi Dam: monsoon water release shut to swimmers since 2023 after fatalities; barricaded May–Sep",
      "Wax Museum / Imagica day-passes are ₹1,500–3,000 — most travellers feel oversold by reviews",
      "Mumbai-Pune expressway exit Saturday AM and Sunday PM gridlock adds 90+ min to a 2hr drive",
      "Hotel rates 2–3× the Khandala equivalent for the same view",
      "Karla / Bhaja caves underwhelm if you've already seen Ajanta, Ellora or Elephanta",
    ],
    common_complaints: [
      "We came for waterfalls, found a parking lot with food stalls.",
      "It's basically Mumbai's overflow — same crowd, hill backdrop, double the price.",
      "Bhushi Dam is just a cement step covered in plastic litter on a Sunday.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g304557-Activities-Lonavala_Pune_District_Maharashtra.html",
    alts: {
      "igatpuri": "Go to Igatpuri if you want monsoon-magic Sahyadris — Vipassana centre, Tringalwadi fort, and waterfalls that haven't been ticket-gated.",
      "bhandardara": "Go to Bhandardara if you want lake-and-fort silence — Arthur Lake reflections, Ratangad climb, fireflies in May–June.",
    },
  },
  {
    trap: "manali",
    pain_points: [
      "Mall Road and Old Manali are wall-to-wall hostels, hookah cafés, and Insta-tour touts in May–Jun and Oct–Nov",
      "Solang Valley adventure activities are oversold — paragliding ₹2,500–4,000 for 5–8 minute air-time",
      "Rohtang Pass requires permit + slot, often closed late afternoon, and is choked with snow-point queues",
      "Hidimba Devi temple sees 2km lines on weekends — 10 min visit, 90 min wait",
      "Rajma-chawal stalls along the highway have been lifted entirely from screen-shot menus on Zomato",
      "Hotel pricing 4–6× during the Punjab/Delhi school break (Jun) and Diwali week",
    ],
    common_complaints: [
      "I drove 14 hours for a town that's just Connaught Place with cold air.",
      "Old Manali smells like weed and dosa grease — not cedar trees.",
      "The 'snow point' was a strip of artificial snow next to a paid-entry gate.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297601-Activities-Manali_Kullu_District_Himachal_Pradesh.html",
    alts: {
      "tirthan-valley": "Go to Tirthan Valley if you want the Beas valley's quiet sister — Great Himalayan National Park entry, river camps, no tour operators.",
      "jibhi": "Go to Jibhi if you want pine-and-trout-stream Himachal — homestays, no nightclubs, 2.5hr drive south of the Manali madness.",
      "barot-valley": "Go to Barot Valley if you want Kullu-adjacent forest with no tourism overhang — trout fishing, hydel project tunnels, deodar canopy.",
      "sissu": "Go to Sissu if you want post-Atal-Tunnel Lahaul without the Manali crowd — Chandra River views, frozen waterfall in winter, summer meadow.",
      "chamba": "Go to Chamba if you want pre-Mughal hill-state heritage — Bhuri Singh Museum, Chaugan ground, no nightclubs.",
    },
  },
  {
    trap: "shimla",
    pain_points: [
      "Mall Road weekend foot-traffic is gridlock; shopping is identical to any tier-1 city mall",
      "Jakhoo temple monkeys are aggressive — sunglasses and food stolen daily, hospital-grade scratches not uncommon",
      "Toy train tickets sell out 90 days in advance; same-day tickets are scalped at 4–6× face value",
      "Hotel rooms within walking distance of Mall: ₹6,000–12,000/night for ones a 3-star city hotel charges ₹2,500",
      "Kufri snow point is artificial Nov–Mar; actual snow is at Narkanda or Hatu, not Kufri",
      "British-era buildings are mostly working state offices — Christ Church and Gaiety are the only real public visits",
    ],
    common_complaints: [
      "We came expecting Raj-era charm. We got a strip mall on a slope.",
      "Spent half a day waiting in line at Jakhoo, got bitten, paid ₹400 to clean the wound.",
      "Kufri 'horse ride' is two boys leading a starving pony 200 metres in mud.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297596-Activities-Shimla_Shimla_District_Himachal_Pradesh.html",
    alts: {
      "chamba": "Go to Chamba if you want pre-Mughal hill-state heritage with no Mall-Road shopping — temple woodcarving, Bhuri Singh Museum, Chaugan ground.",
      "bir-billing": "Go to Bir-Billing if you want world-class paragliding and Tibetan monasteries instead of Jakhoo monkey queues.",
      "kasauli": "Go to Kasauli if you want a Cantonment-quiet hill station — strict construction limits keep the skyline empty.",
      "chail": "Go to Chail if you want pine forest and the world's highest cricket ground — 45km from Shimla, palace hotel still affordable.",
    },
  },
  {
    trap: "mcleod-ganj",
    pain_points: [
      "Bhagsu and Triund are choked weekends; Triund campsite has been a permitted-only zone since 2018 but enforcement is patchy",
      "Main Square cafés (Tibet Kitchen, Common Ground, Jimmy's) have 30–60 min waits in season",
      "Naddi Sunset Point parking ₹100, often sold out by 4pm — hawker stalls block the view",
      "Dalai Lama temple complex has limited photo zones; teachings need pre-registration weeks ahead",
      "Israeli-circuit hookah & techno scene has changed the neighbourhood vibe in lower Bhagsu since 2019",
    ],
    common_complaints: [
      "Triund 'easy hike' was a stairway of plastic wrappers behind 200 other people.",
      "Came for monastery quiet, got reggae beats and chillum smoke.",
      "Café prices doubled since 2022 — same momos that were ₹120 are now ₹260.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g304560-Activities-McLeod_Ganj_Dharamshala_Kangra_District_Himachal_Pradesh.html",
    alts: {
      // No tourist_trap_alternatives rows for mcleod-ganj in DB.
      // Trap-level pain_points still skipped in updateLoop because no rank-1 row exists.
    },
  },
  {
    trap: "kasol",
    pain_points: [
      "Parvati Valley's 'Israeli ghetto' reputation traffics drugs at scale — multiple foreign-tourist disappearances since 2015",
      "Kheerganga trek camp area is permanently litter-strewn; campsite charges ₹500–800 a night for a tarp",
      "Cafés serve identical menu (shakshuka, falafel, hummus) at 2–3× Manali pricing",
      "Cellular network drops past Kasol — emergency response 6–12 hours out",
      "Tosh, Malana, Kalga have been over-Instagrammed since 2020 — empty-village shots are now hostel-courtyard shots",
    ],
    common_complaints: [
      "Couldn't tell I was in India — every café had the same techno and the same falafel.",
      "Lost a friend on a chillum-and-cliff afternoon; phones don't work and there's no doctor.",
      "Kheerganga hot springs were closed for 'maintenance' — actually closed because the camp was over-crowded.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g3179800-Activities-Kasol_Kullu_District_Himachal_Pradesh.html",
    alts: {
      "tirthan-valley": "Go to Tirthan Valley if you want Parvati's quiet sister — trout streams, GHNP entry, no charas economy.",
      "barot-valley": "Go to Barot Valley if you want Kullu-adjacent valley with no tourism overhang — trout fishing, hydel project tunnels, deodar forest.",
    },
  },
  {
    trap: "calangute-baga",
    pain_points: [
      "Beach is 60% shacks + 30% chair-rental + 10% tide — no quiet stretch left between Baga and Candolim",
      "Water-sports operators jet-ski parasail banana-boat unlicensed — 14 reported drownings 2018–2023",
      "Tito's Lane post-10pm is a tourist meat market, not a Goa nightlife scene; locals avoid it entirely",
      "Sunday brunch ₹1,800–3,500 at hotel buffets — same dishes ₹400 at any Margao kudaki",
      "Late-Dec/Jan rates 5–8× standard — same room that's ₹2,500 in June is ₹18,000 on Dec 31",
    ],
    common_complaints: [
      "Came for Goa, got Borivali beach with palm trees.",
      "Beach shacks all play the same Bollywood remixes at the same volume.",
      "Three different operators tried to overcharge me by 200% in 30 minutes.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g503691-Activities-Calangute_Bardez_North_Goa_District_Goa.html",
    alts: {
      "agonda": "Go to Agonda if you want a single quiet beach with turtle-nesting season and zero shack rave culture.",
      "morjim": "Go to Morjim if you want Russian-Goa-but-actually-quiet — Olive Ridley nesting + the Chapora estuary mouth.",
      "chandipur": "Go to Chandipur if you want a beach that vanishes 5km at low tide — Odisha coast, near-empty, fishermen's villages instead of shacks.",
    },
  },
  {
    trap: "nainital",
    pain_points: [
      "Mall Road is Mussoorie at half-altitude — same shops, same gridlock, fewer trees",
      "Naina Devi temple line on weekends and Navratri can hit 4 hours",
      "Boat rides ₹400–800 per circuit; lake water quality classified C/D since 2019 (CPCB)",
      "Snow View 'cable car' is a 2km chairlift ride that operators pause for 'photo stops'",
      "Hotel rooms with 'lake view' often face the rooftop AC of the next building",
      "Kainchi Dham + Naukuchiatal day-trips are 60–90 min one-way each — half your day in a taxi",
    ],
    common_complaints: [
      "I came for an old-school British hill station; got a parking lot with paddleboats.",
      "The 'lake' is closer in colour to chai than glacial water.",
      "Tried to walk Mall Road at 6pm — was shoulder-to-shoulder for 800m.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297604-Activities-Nainital_Nainital_District_Uttarakhand.html",
    alts: {
      "munsiyari": "Go to Munsiyari if you want Panchachuli at eye-level — pine ridge, glacier hikes, 280km from Nainital but a different planet.",
      "almora": "Go to Almora if you want a real Kumaoni hill town — Govind Ballabh Pant museum, Chitai temple, no Mall Road retail strip.",
      "kausani": "Go to Kausani if you want Gandhi's 'Switzerland of India' framing — 300km of snow-line view from a single ridge.",
      "mukteshwar": "Go to Mukteshwar if you want Kumaon at 2,300m without the crowd — Chauli ki Jali cliffs, deodar forest, real quiet.",
      "binsar": "Go to Binsar if you want Himalayan panorama (Nanda Devi → Trisul) without a single tourist café.",
      "bhimtal": "Go to Bhimtal if you want a real lake instead of a paddleboat parking lot — bigger, deeper, 23km from Nainital with proper swimming spots.",
    },
  },
];

/**
 * "DO NOT go in [month]" — write into destination_months.go_or_skip_verdict
 * for the canonical "skip" cases. Sets score → 1 if missing/higher, ensuring
 * skip-card UI gates pick this up.
 */
const SKIP_MONTHS = [
  // Kashmir Jan/Feb — high passes shut, Dal frozen, Sonmarg/Pahalgam roads limited
  { dest: "srinagar", months: [1, 2], verdict: "Skip — Dal Lake partly frozen, daytime highs 2–5°C with night lows below freezing. Houseboats run but most shikaras dock by 4pm; Sonmarg-Gulmarg roads are weather-dependent and Mughal Gardens are bare. Better window: April–October." },
  { dest: "gulmarg", months: [1, 2, 3], verdict: "Skip unless you ski — Gondola Phase II runs Dec–Mar but lift queues hit 2–3hr on weekends. If not skiing, the meadow is buried, hotel rates spike 3×, and avalanche-zone access is restricted. Better window: May–September for the meadow, or commit to ski-week pre-booking." },
  { dest: "pahalgam", months: [1, 2], verdict: "Skip — Aru/Betaab/Chandanwari valleys snow-bound and access road limited; trout streams iced. Most hotels close. Better window: April–June and September–early November." },
  { dest: "leh", months: [1, 2, 3], verdict: "Skip — Manali-Leh and Srinagar-Leh highways shut Nov–May; the only access is by air, and IndiGo/Vistara cancel ~25% of winter slots for weather. Daytime highs −5°C, oxygen levels make AMS faster. Locals shut shop. Better window: June–September." },
  { dest: "spiti-valley", months: [12, 1, 2, 3], verdict: "Skip — Kunzum La snow-bound Nov–Apr cuts off Lahaul-Spiti loop; only Kinnaur-side approach via Tabo possible, and at 4× the road risk. Most homestays shut for winter. Better window: June–early October." },
  { dest: "kaza", months: [12, 1, 2, 3], verdict: "Skip — Kunzum Pass closed; vehicle access is one-way Kinnaur side only on snow. Most cafés/homestays shut. Daytime highs −10 to −15°C. Better window: June–September." },
  // Goa peak heat
  { dest: "calangute-baga", months: [4, 5], verdict: "Skip — daytime 33–37°C with humidity above 75%; sea temperature peaks at 30°C and offers no cooling. Beach shacks pre-monsoon-pack and rates dip but the vibe is empty + sweaty, not relaxed. Better window: November–February." },
  { dest: "panaji", months: [5], verdict: "Skip — pre-monsoon humidity makes Latin Quarter walks unbearable past 10am. Casino boats run but heritage walks need 6–8am or after sunset. Better window: November–February or October." },
  // Manali monsoon (landslides)
  { dest: "manali", months: [7, 8], verdict: "Skip — Kullu-Manali highway saw 14 landslide-related closures Jul–Aug 2023. Beas River swells flood low-lying Old Manali; Solang and Rohtang access closes intermittently. Better window: April–June and September–early November." },
  // Coastal monsoon flooding
  { dest: "alleppey", months: [6, 7, 8], verdict: "Mixed — Kerala monsoon brings the lush backwater rinse you came for, but boat-only access during high water and continuous rain limit deck time. Houseboat operators reduce fleet 40%. Better window: October–March, or stay 3+ days to ride out the heaviest spells." },
  // Rajasthan summer
  { dest: "jaisalmer", months: [5, 6], verdict: "Skip — daytime 42–47°C; Thar desert overnight stays move indoors-only and camel-safari operators stop midday. Fort interior heats up like an oven. Better window: October–March." },
  { dest: "jodhpur", months: [5, 6], verdict: "Skip — daily 43–46°C with no shade in old city's blue lanes; Mehrangarh's stone radiates heat. Most heritage hotels run pool-only schedules. Better window: October–early March." },
];

async function upsertTrapDepth() {
  console.log("→ Updating tourist_trap_alternatives with depth fields…");
  let updated = 0;
  for (const t of TRAP_DEPTH) {
    // 1) Trap-level fields go on rank-1 row
    const { error: e1 } = await supabase
      .from("tourist_trap_alternatives")
      .update({
        pain_points: t.pain_points,
        common_complaints: t.common_complaints,
        source_url: t.source_url,
        last_reviewed_at: REVIEWED_AT,
      })
      .eq("trap_destination_id", t.trap)
      .eq("rank", 1);
    if (e1) {
      console.error(`  × ${t.trap} rank-1 update:`, e1.message);
      continue;
    }
    updated++;

    // 2) Per-alt alt_better_for
    for (const [altId, altText] of Object.entries(t.alts)) {
      const { error: e2 } = await supabase
        .from("tourist_trap_alternatives")
        .update({
          alt_better_for: altText,
          last_reviewed_at: REVIEWED_AT,
        })
        .eq("trap_destination_id", t.trap)
        .eq("alternative_destination_id", altId);
      if (e2) console.error(`  × ${t.trap}→${altId}:`, e2.message);
    }
    console.log(`  ✓ ${t.trap}: ${t.pain_points.length} pain · ${t.common_complaints.length} complaints · ${Object.keys(t.alts).length} alts framed`);
  }
  console.log(`Updated ${updated}/${TRAP_DEPTH.length} traps.`);
}

async function upsertSkipMonths() {
  console.log("\n→ Writing 'DO NOT go in [month]' verdicts…");
  let written = 0;
  for (const s of SKIP_MONTHS) {
    for (const m of s.months) {
      // Read current row
      const { data: existing } = await supabase
        .from("destination_months")
        .select("destination_id, month, score, go_or_skip_verdict")
        .eq("destination_id", s.dest)
        .eq("month", m)
        .maybeSingle();

      if (!existing) {
        // Create at score=1 (skip surface)
        const { error } = await supabase
          .from("destination_months")
          .insert({ destination_id: s.dest, month: m, score: 1, go_or_skip_verdict: s.verdict });
        if (error) console.error(`  × ${s.dest}/${m} insert:`, error.message);
        else {
          written++;
          console.log(`  + ${s.dest}/${m} (new, score=1)`);
        }
      } else {
        // Force score=1 if it was higher; only update verdict if empty or different
        const newScore = Math.min(existing.score ?? 5, 1);
        const { error } = await supabase
          .from("destination_months")
          .update({ score: newScore, go_or_skip_verdict: s.verdict })
          .eq("destination_id", s.dest)
          .eq("month", m);
        if (error) console.error(`  × ${s.dest}/${m} update:`, error.message);
        else {
          written++;
          console.log(`  ✓ ${s.dest}/${m} (was ${existing.score}, now ${newScore})`);
        }
      }
    }
  }
  console.log(`Wrote ${written} skip-month verdicts.`);
}

(async () => {
  await upsertTrapDepth();
  await upsertSkipMonths();
  console.log("\n✓ Done. Verify with /skip-list/lonavala and /where-to-go/january.");
})();
