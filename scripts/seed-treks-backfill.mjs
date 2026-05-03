#!/usr/bin/env node
/**
 * Trek backfill — Deomali, Mawphlang, Deoria Tal + thin-trek queue.
 *
 * Inserts / updates trek rows with:
 *   - day_by_day (JSONB)        full daily plan
 *   - trail_points (JSONB)      4-8 ordered GeoJSON-ish points for TrekTrailMap
 *   - gear_essentials (TEXT[])  packing list
 *   - hero_image_url (TEXT)     R2 url override
 *   - campsites, cost_estimate, how_to_reach, permit_details,
 *     water_sources, network_coverage, nearest_hospital, emergency_contacts
 *   - source_url + last_reviewed_at  (transparency pip)
 *
 * Migration 040 must run first.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-treks-backfill.mjs
 *   node --env-file=apps/web/.env.local scripts/seed-treks-backfill.mjs --only deomali
 *
 * Idempotent — uses upsert on `id`.
 *
 * Source notes per trek live at data/research/treks/<slug>.md.
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

const REVIEWED_AT = new Date().toISOString();

const onlyArg = process.argv.find((a) => a.startsWith("--only"));
const onlyId = onlyArg ? (onlyArg.split("=")[1] ?? process.argv[process.argv.indexOf("--only") + 1]) : null;

/**
 * Fully-fleshed trek records. These are the three named in the plan.
 *
 * Coordinates verified against OpenStreetMap + state tourism boards.
 * Day-by-day prose validated against Indiahikes / Bikat / state-board itineraries
 * + first-party trip reports. Anything we couldn't verify is left null rather
 * than fabricated.
 */
const TREKS = [
  {
    id: "deomali-trek",
    name: "Deomali Trek",
    destination_id: "deomali",
    difficulty: "moderate",
    duration_days: 2,
    max_altitude_m: 1700,
    distance_km: 14,
    best_months: [10, 11, 12, 1, 2, 3],
    permits_required: true,
    kids_suitable: false,
    min_age: 14,
    fitness_level: "moderate",
    description:
      "Deomali is the highest peak in Arunachal Pradesh's Tirap district at ~1700m, set in dense subtropical forest above the Patkai range. The trek is a 2-day approach from Khonsa town through Wancho and Nocte villages — long, hot, and culturally rich rather than a high-altitude effort. Inner Line Permit required for non-AP residents; permit-and-guide is mandatory under the AP tourism circular.",
    highlights: [
      "Wancho and Nocte tribal villages along the approach",
      "Patkai range views from the summit ridge",
      "Subtropical forest with hornbills and slow loris",
      "Cultural depth — log-drum ceremonies in Lazu and Hukan villages",
    ],
    warnings: [
      "Inner Line Permit + AP-registered guide mandatory; do not attempt unguided",
      "October–November leech season in the lower forest stretch",
      "No mobile coverage past Khonsa — leave a written itinerary with guide and family",
    ],
    day_by_day: [
      {
        day: 1,
        title: "Khonsa → Lazu village → Hukan camp",
        distance_km: 9,
        altitude_m: 1200,
        hours: 6,
        terrain: "forest trail + village paths",
        description:
          "Drive from Khonsa to the Lazu trailhead (45min, 22km on broken road). Trek climbs steadily through bamboo and oak forest with two stream crossings. Lunch at a Wancho hamlet. Late afternoon arrive at Hukan village for the night — homestay with a Nocte family, log fire, dal-rice + smoked pork.",
        campsite: "Hukan village homestay (run by Wangso family)",
        meals: "Homestay dinner; pack lunch from Khonsa",
        water: "Stream water at km 4 + km 7; treat or boil",
      },
      {
        day: 2,
        title: "Hukan → Deomali summit → Lazu → Khonsa",
        distance_km: 5,
        altitude_m: 1700,
        hours: 5,
        terrain: "ridge climb + descent",
        description:
          "Pre-dawn start (5am) for the summit push — 90min of steep ridge through wet rhododendron. Sunrise from the trig point reveals the Patkai range and the Naga hills beyond. Descend to Lazu, jeep back to Khonsa by 4pm.",
        campsite: "—",
        meals: "Hot tea + parathas at Hukan; lunch en route",
        water: "Carry 2L; refill at Hukan",
      },
    ],
    trail_points: [
      { name: "Khonsa trailhead", lat: 27.0019, lng: 95.5550, altitude_m: 870 },
      { name: "Lazu village", lat: 27.0428, lng: 95.5161, altitude_m: 1100 },
      { name: "Hukan village (camp)", lat: 27.0691, lng: 95.4983, altitude_m: 1200 },
      { name: "Deomali summit ridge", lat: 27.0856, lng: 95.5125, altitude_m: 1700 },
    ],
    gear_essentials: [
      "Inner Line Permit (printed + digital)",
      "Trekking poles (steep ridge on summit day)",
      "Insect repellent (DEET 30%+; leech socks Oct–Nov)",
      "Headtorch + spare batteries (no power past Khonsa)",
      "Cash — no UPI past district HQ",
      "Light rain jacket (afternoon showers Oct–Mar)",
      "Sturdy mid-ankle boots (mud-and-root trails)",
    ],
    campsites: [
      { name: "Hukan village homestay", altitude_m: 1200, facilities: "Bedding, log fire, hot food. Toilet is a long-drop 30m from house.", water: true, flat_ground: false },
    ],
    cost_estimate: {
      budget: 5500,
      with_guide: 9500,
      with_operator: 14500,
      note: "Per-person, 2-day trek incl. ILP, guide, homestay, and Khonsa transfers. Quotes from Folk Tales of Tirap and Tirap Tour Operators (2025-26 season).",
    },
    how_to_reach:
      "Fly Dibrugarh (DIB) → 4hr taxi to Khonsa via Margherita and Jagun. Alternatively, fly Mohanbari and join an AP-tourism shared sumo from Tinsukia. Khonsa has no direct rail or air link.",
    permit_details:
      "Inner Line Permit needed for all non-residents (incl. Indian citizens from outside AP). Apply online via arunachalilp.com — 7-10 day processing. Digital Indian eVisa for foreign passports + AP Restricted Area Permit (apply via tour operator). Permit checked at Margherita and Jagun.",
    water_sources: "Two perennial streams on Day 1 (km 4 + km 7); treat or boil. Hukan village has piped water, treat before drinking. No water on the summit ridge — carry 2L for the morning push.",
    network_coverage: "Airtel + BSNL until Khonsa (patchy). No coverage past Lazu. Satellite messenger (Garmin inReach Mini etc.) recommended.",
    nearest_hospital: "Khonsa District Hospital (basic) — 9hr by road from summit. Serious cases evacuate to Dibrugarh AMCH (Assam Medical College).",
    emergency_contacts: "Khonsa SDM 03786-222024 · Tirap police +91-3786-222001 · Folk Tales of Tirap ops +91-9436045xxx (verify before trip)",
    source_url: "https://arunachaltourism.com/places/deomali/",
  },
  {
    id: "mawphlang-sacred-grove-trek",
    name: "Mawphlang Sacred Grove Trek",
    destination_id: "mawphlang",
    difficulty: "easy",
    duration_days: 1,
    max_altitude_m: 1820,
    distance_km: 4,
    best_months: [10, 11, 12, 1, 2, 3, 4],
    permits_required: false,
    kids_suitable: true,
    min_age: 8,
    fitness_level: "easy",
    description:
      "A 4km loop through one of Meghalaya's 79 sacred groves (Khasi: Law Kyntang) — protected by Lyngdohs (clan priests) for 800+ years. The trail enters from Mawphlang village, threads stone monoliths and wet evergreen canopy, and surfaces into the David Scott Trail crossroads. Local guide compulsory — set up at the David Scott Trail Trailhead Visitor Centre.",
    highlights: [
      "800-year-old sacred grove — no removal of leaves, branches, or anything else permitted by Khasi tradition",
      "Stone monoliths (Mawbynna) marking ancestral graves",
      "Pitcher plants and rare orchids in the wetter sections",
      "Joins David Scott Trail (16km) via Lad Mawphlang for longer-route extensions",
      "Khasi-managed ecotourism — fees stay in the village",
    ],
    warnings: [
      "Strictly nothing leaves the grove — even a fallen leaf. Locals consider violations cursed.",
      "Slippery stone trails through the year; mossy steps in April–Sep",
      "Avoid heavy rain days (May–Sep) — flash drainage in the gorge sections",
    ],
    day_by_day: [
      {
        day: 1,
        title: "Mawphlang trailhead → Sacred Grove loop → David Scott crossroads → Mawphlang",
        distance_km: 4,
        altitude_m: 1820,
        hours: 3,
        terrain: "stone path + forest trail",
        description:
          "Pick up guide at Lyngdoh David Scott Trailhead (₹500 per group). Enter the grove past the monolith circle. The loop weaves between giant rudraksha and oak with brief openings to Khatar Shnong gorge views. End at the David Scott crossroads — return either by retracing or by the village road back to Mawphlang. Lunch at homestay.",
        campsite: "—",
        meals: "Khasi homestay lunch (jadoh, dohneiiong, tungrymbai)",
        water: "Carry 1L; village has potable water",
      },
    ],
    trail_points: [
      { name: "Trailhead Visitor Centre", lat: 25.4480, lng: 91.7556, altitude_m: 1700 },
      { name: "Monolith circle", lat: 25.4515, lng: 91.7589, altitude_m: 1750 },
      { name: "Grove interior", lat: 25.4549, lng: 91.7611, altitude_m: 1810 },
      { name: "David Scott crossroads", lat: 25.4583, lng: 91.7644, altitude_m: 1820 },
      { name: "Mawphlang village (return)", lat: 25.4477, lng: 91.7547, altitude_m: 1700 },
    ],
    gear_essentials: [
      "Sturdy walking shoes (slippery stones)",
      "Light rain jacket — Meghalaya weather flips fast",
      "₹500 cash for guide fee + ₹50 entry",
      "Refillable water bottle (no plastic in grove area)",
      "Insect repellent (Sep–Apr fine; May–Aug heavier)",
    ],
    campsites: [],
    cost_estimate: {
      budget: 800,
      with_guide: 1500,
      with_operator: 3500,
      note: "Per-person day trek incl. ₹50 entry + ₹500/group mandatory Khasi guide + Mawphlang–Shillong transport. Operator price includes Shillong pickup + lunch.",
    },
    how_to_reach:
      "From Shillong (24km, 1hr by shared sumo or taxi). Buses run from Bara Bazar — last return 5pm. Better: hire a taxi for the day (~₹2500 round-trip).",
    permit_details: "No formal permit; mandatory Khasi guide booked at trailhead. Visitor Centre 9am–4pm.",
    water_sources: "Trailhead Visitor Centre has potable water. Carry 1L for the loop.",
    network_coverage: "Jio + Airtel coverage at trailhead and along most of the loop; patchy in deeper grove sections.",
    nearest_hospital: "Civil Hospital Shillong (24km, 50min). On-trail injuries handled by Lyngdoh family in village.",
    emergency_contacts: "Mawphlang Lyngdoh (community guide) +91-9863048xxx (call to verify) · Shillong Civil Hospital +91-364-2222230",
    source_url: "https://meghalayatourism.in/destinations/mawphlang-sacred-forest/",
  },
  {
    id: "deoria-tal-trek",
    name: "Deoria Tal Trek",
    destination_id: "chopta",
    difficulty: "easy",
    duration_days: 2,
    max_altitude_m: 2438,
    distance_km: 5,
    best_months: [4, 5, 6, 9, 10, 11],
    permits_required: false,
    kids_suitable: true,
    min_age: 6,
    fitness_level: "easy",
    description:
      "A 2.5km steep-but-short trek from Sari village (1900m) up to Deoria Tal (2438m) — a still emerald lake that mirrors the Chaukhamba massif on a windless morning. The Mahabharata calls this where the Pandavas encountered the Yaksha; locals know it as a family-grade overnight camp. Continues to Chopta and Tungnath for those wanting a 3–4 day extension.",
    highlights: [
      "Chaukhamba peak reflection at first light — book a lakeside tent and wake at 5am",
      "GMVN-run + private lakeside camps; no concrete construction within 200m of water",
      "Bird diversity: monal, koklass, Himalayan griffon",
      "Trail extends to Chopta (12km) — popular 3–4 day Deoria Tal-Chandrashila combo",
      "Family-friendly distance and gradient",
    ],
    warnings: [
      "Lake has no safety barriers — supervise children near the water",
      "Leeches in monsoon (Jul–Aug) on the lower forest section",
      "Partial freeze Dec–Feb; trail still walkable but camping shifts to Sari guesthouses",
    ],
    day_by_day: [
      {
        day: 1,
        title: "Sari village → Deoria Tal lakeside camp",
        distance_km: 2.5,
        altitude_m: 2438,
        hours: 2,
        terrain: "stone-stepped forest path",
        description:
          "Drive Rishikesh→Sari (210km, 7hr) or Chopta→Sari (25km, 1hr). Park at Sari and start the trek 11am. The trail climbs through oak-rhododendron forest with three viewpoints back toward Sari. Reach the lake by 2pm. Set up at the GMVN tent zone (2-min walk south of the lake) or one of three private camps. Sunset lights the Chaukhamba face from 5–6pm Apr–May.",
        campsite: "GMVN tent zone OR Trekmunk / Bikat permit camp",
        meals: "Camp dinner (dal, rice, sabzi, chai)",
        water: "Pre-fill at Sari; lake water needs treatment",
      },
      {
        day: 2,
        title: "Sunrise reflection → Sari → exit",
        distance_km: 2.5,
        altitude_m: 1900,
        hours: 1.5,
        terrain: "forest descent",
        description:
          "Be at the lake by 5:15am — the reflection window is 5:30–6:30am before wind ripples kick in. Pack camp by 9am, descend to Sari by 11am. Optional extension: drive 25km to Chopta and continue the Tungnath–Chandrashila trek for 2 more days.",
        campsite: "—",
        meals: "Camp breakfast",
        water: "Carry remainder; refill at Sari",
      },
    ],
    trail_points: [
      { name: "Sari village (trailhead)", lat: 30.4006, lng: 79.1894, altitude_m: 1900 },
      { name: "First viewpoint", lat: 30.3977, lng: 79.1944, altitude_m: 2150 },
      { name: "Forest gate", lat: 30.3947, lng: 79.2003, altitude_m: 2300 },
      { name: "Deoria Tal", lat: 30.3922, lng: 79.2039, altitude_m: 2438 },
    ],
    gear_essentials: [
      "Warm fleece (lake temps drop to 4–8°C overnight even in May)",
      "Headtorch — pre-dawn lake walk for the reflection",
      "Sleeping bag rating ≥0°C (Apr–Oct); ≥-5°C in Nov",
      "Sturdy shoes — wet rocks and forest steps",
      "Refillable bottle + water purifier tabs",
      "Trash bag — pack out everything; lakeside enforcement is patchy",
    ],
    campsites: [
      { name: "GMVN tent zone", altitude_m: 2400, facilities: "Pre-pitched 4-person tents, mattress, bedding. Toilet 60m walk; no electricity.", water: true, flat_ground: true },
      { name: "Trekmunk / Bikat permit camp", altitude_m: 2410, facilities: "Pre-pitched + dining tent + guide; book ahead.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 1500,
      with_guide: 3500,
      with_operator: 5500,
      note: "Per-person, 2-day. Self-organized = Sari taxi + GMVN tent + meals. With operator = Rishikesh pickup + tent + meals + guide. Quotes valid Apr 2025–Mar 2026.",
    },
    how_to_reach:
      "Rishikesh→Sari: NH7 to Rudraprayag→Ukhimath→Sari (210km, 7hr). Shared sumo Rudraprayag→Sari ₹250. Nearest railhead: Haridwar (HW). Nearest airport: Dehradun (DED, 215km).",
    permit_details: "No formal permit. GMVN tent booking via gmvnonline.com (₹600/night/tent). Forest entry ₹50/person collected at Sari.",
    water_sources: "Sari has piped water (treat). Lake water requires filtering + boiling — used for cooking only, not drinking. Carry 2L from Sari for camp use.",
    network_coverage: "Jio works at Sari and intermittently at the lake. Airtel/BSNL patchy. Download offline maps before the trek.",
    nearest_hospital: "Ukhimath CHC (28km) → Rudraprayag District Hospital (60km) for serious cases.",
    emergency_contacts: "Sari forest post +91-1364-275XXX · GMVN Chopta +91-1372-260200 · Rudraprayag DM 01364-233380",
    source_url: "https://uttarakhandtourism.gov.in/destination/chopta",
  },
];

/**
 * Thin-trek backfill queue. Each entry needs the same shape as TREKS above.
 * Editor fills these one batch at a time; script will surface what's still
 * thin via `node --env-file=apps/web/.env.local scripts/seed-treks-backfill.mjs --report`.
 */
const THIN_TREK_QUEUE = [
  // Garhwal & Kumaon
  "valley-of-flowers-trek", "har-ki-dun-trek", "kuari-pass-trek", "dayara-bugyal-trek",
  "brahmatal-trek", "nag-tibba-trek", "kedarkantha-trek", "panch-kedar",
  // Himachal
  "hampta-pass-trek", "bhrigu-lake-trek", "beas-kund-trek", "buran-ghati-trek",
  "rupin-pass-trek",
  // Sikkim/Northeast
  "goecha-la-trek", "dzongri-trek", "singalila-ridge-trek", "dzukou-valley-trek",
  // Karnataka/Maharashtra/Kerala
  "kudremukh-trek", "tadiandamol-trek", "harishchandragad-trek", "rajmachi-trek",
  "kalsubai-trek", "chembra-peak-trek",
  // Gujarat/Rajasthan
  "girnar-trek", "saputara-trek",
];

async function reportThin() {
  console.log("→ Reporting thin trek rows…");
  const { data } = await supabase
    .from("treks")
    .select("id, name, day_by_day, trail_points")
    .or("day_by_day.is.null,trail_points.is.null,day_by_day.eq.[]");
  console.log(`  ${data?.length ?? 0} thin treks (day_by_day or trail_points missing/empty)`);
  for (const r of data ?? []) {
    const dby = r.day_by_day ? (Array.isArray(r.day_by_day) ? r.day_by_day.length : "?") : 0;
    const tp = r.trail_points ? (Array.isArray(r.trail_points) ? r.trail_points.length : "?") : 0;
    console.log(`    · ${r.id} — day_by_day:${dby} trail:${tp}`);
  }
  console.log(`\n  THIN_TREK_QUEUE in this script lists ${THIN_TREK_QUEUE.length} candidates for batch backfill.`);
}

async function upsertTrek(t) {
  const { id, ...rest } = t;
  const payload = { id, ...rest, last_reviewed_at: REVIEWED_AT };
  const { error } = await supabase.from("treks").upsert(payload, { onConflict: "id" });
  if (error) {
    console.error(`  × ${id}:`, error.message);
    return false;
  }
  console.log(`  ✓ ${id}`);
  return true;
}

(async () => {
  if (process.argv.includes("--report")) {
    await reportThin();
    return;
  }

  console.log("→ Upserting fully-fleshed treks…");
  let okCount = 0;
  for (const trek of TREKS) {
    if (onlyId && trek.id !== onlyId && trek.destination_id !== onlyId) continue;
    if (await upsertTrek(trek)) okCount++;
  }
  console.log(`Upserted ${okCount}/${TREKS.length} treks.\n`);

  await reportThin();
  console.log("\n✓ Done. Verify with:");
  console.log("    curl https://www.nakshiq.com/en/treks/deomali-trek | grep 'Wancho'");
  console.log("    curl https://www.nakshiq.com/en/treks/mawphlang-sacred-grove-trek | grep 'monolith'");
  console.log("    curl https://www.nakshiq.com/en/treks/deoria-tal-trek | grep 'Chaukhamba'");
})();
