#!/usr/bin/env node
/**
 * Track C — trek backfill, batch 3 (5 marquee thin treks).
 *
 * Sessions 5–7 added Deomali / Mawphlang / Deoria Tal. Batch-2 added
 * Sandakphu / Kalsubai / Harishchandragad / Mullayyanagiri / Chembra.
 * This batch picks the 5 named in backlog_post_sessions_5_to_8.md as
 * "Track C 5-trek batch" — the most-googled Himalayan thin treks:
 *   - valley-of-flowers-trek    (Garhwal UNESCO meadow, 3,650m)
 *   - hampta-pass-trek          (Himachal crossover, 4,270m)
 *   - goecha-la-trek            (Sikkim Kanchenjunga base, 4,940m)
 *   - kuari-pass-trek           (Garhwal Lord Curzon trail, 4,264m)
 *   - brahmatal-trek            (Garhwal frozen-lake winter, 3,734m)
 *
 * After this run: 13 of 133 treks have full backfill (10%); 60 thin remain.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-treks-batch-3.mjs
 *
 * Idempotent — upsert by id.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

const REVIEWED_AT = new Date().toISOString();

const TREKS = [
  // ─────────────────────────────────────────────────────────────
  {
    id: "valley-of-flowers-trek",
    day_by_day: [
      {
        day: 1, title: "Govindghat → Ghangaria",
        distance_km: 13, altitude_m: 3050, hours: 7, terrain: "stone-paved trail along Pushpawati river",
        description: "Drive Joshimath → Govindghat (20km, 1hr). Trek 13km up the Pushpawati gorge to Ghangaria — paved trail, mules + helicopter optional. Cross Bhyundar Ganga at the suspension bridge. Ghangaria is the base for both Valley of Flowers + Hemkund Sahib.",
        campsite: "Ghangaria GMVN guesthouse + private hotels",
        meals: "Ghangaria dhabas — dal-rice, paratha-chai, limited menu",
        water: "Trail has piped water + tea-stalls every 2km; bring 1.5L",
      },
      {
        day: 2, title: "Ghangaria → Valley of Flowers → Ghangaria",
        distance_km: 8, altitude_m: 3650, hours: 6, terrain: "graded forest path + meadow",
        description: "Day-trip from Ghangaria. Forest dept entry gate opens 6am, last entry 12 noon, must exit by 5pm. Climb 3km to the valley entrance through birch forest, then 2–4km of slow exploration through 300+ species of alpine flowers (peak Jul–Aug). Frank Smythe's 1937 botanist trail. UNESCO World Heritage core zone — no overnight, no plucking.",
        campsite: "Return to Ghangaria for the night",
        meals: "Pack lunch from Ghangaria dhabas; no food in valley",
        water: "Pushpawati river water in valley (treat); carry 2L",
      },
      {
        day: 3, title: "Ghangaria → Hemkund Sahib → Ghangaria",
        distance_km: 12, altitude_m: 4329, hours: 8, terrain: "stone steps, very steep",
        description: "Optional acclimatised day. Steep 6km to Hemkund Sahib gurdwara (highest gurdwara in the world) + sacred lake. Sikh pilgrims do this barefoot. Lakshman temple beside the gurdwara. Free langar (Sikh community kitchen). Return to Ghangaria.",
        campsite: "Ghangaria",
        meals: "Hemkund langar (free) + return Ghangaria dhaba",
        water: "Hemkund Sahib + langar; trail has tea stalls",
      },
      {
        day: 4, title: "Ghangaria → Govindghat → exit",
        distance_km: 13, altitude_m: 1820, hours: 5, terrain: "downhill stone-paved",
        description: "Descend to Govindghat. Drive Joshimath/Rishikesh exit.",
        campsite: "—",
        meals: "Govindghat dhabas",
        water: "Trail piped water",
      },
    ],
    trail_points: [
      { name: "Govindghat trailhead", lat: 30.6219, lng: 79.5717, altitude_m: 1820 },
      { name: "Bhyundar village", lat: 30.6731, lng: 79.5928, altitude_m: 2400 },
      { name: "Ghangaria base camp", lat: 30.7000, lng: 79.6097, altitude_m: 3050 },
      { name: "Valley of Flowers entry gate", lat: 30.7233, lng: 79.5947, altitude_m: 3300 },
      { name: "Valley meadow centre", lat: 30.7331, lng: 79.5878, altitude_m: 3650 },
      { name: "Hemkund Sahib gurdwara", lat: 30.7044, lng: 79.6206, altitude_m: 4329 },
    ],
    gear_essentials: [
      "Forest dept entry permit ₹150 Indian / ₹600 foreign at Ghangaria (3-day validity for valley)",
      "Sturdy trekking shoes — 13km approach is paved but long",
      "Light rain jacket (mandatory — Jul–Aug daily afternoon showers)",
      "Down jacket / fleece for Ghangaria nights (4–8°C)",
      "Walking pole — descent on Day 4 is hard on knees",
      "Insect repellent — leech belt at lower elevations",
      "Cash — no UPI/cards at Ghangaria",
      "Headtorch — Hemkund pre-dawn start needs it",
    ],
    campsites: [
      { name: "Ghangaria GMVN Guesthouse", altitude_m: 3050, facilities: "Dorm + twin rooms, hot meals, geyser, charging.", water: true, flat_ground: true },
      { name: "Ghangaria private hotels (Hotel Priya, Govind Ghat Hotel)", altitude_m: 3050, facilities: "Twin/triple rooms, attached bath in upper-tier rooms.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 8000, with_guide: 14000, with_operator: 20000,
      note: "Per-person 4-day trek incl. Joshimath → Govindghat shared transfer, Ghangaria stay (3 nights), forest permit, all meals. Operator = Indiahikes/Trekup India 2025–26 season.",
    },
    how_to_reach: "Fly Dehradun (DED) → 9hr taxi to Joshimath → 1hr to Govindghat. Rishikesh railhead → 10hr bus to Joshimath. Govindghat helipad operational Jul–Aug for Hemkund Sahib (Pawan Hans, ~₹3,000/PP one-way).",
    permit_details: "Forest dept entry permit ₹150 Indian / ₹600 foreign, issued at Ghangaria forest office (open 6am–12 noon for entry, must exit by 5pm). Valley itself is closed Nov–May (snow). Hemkund Sahib closed Oct–Apr.",
    water_sources: "Pushpawati river runs alongside the approach trail; tea-stalls every 2km. Valley itself has Pushpawati glacier-melt streams (treat). Hemkund Sahib has langar drinking water.",
    network_coverage: "Airtel + Jio at Govindghat. Patchy at Ghangaria (BSNL slightly better). NO signal in valley or above Ghangaria.",
    nearest_hospital: "Joshimath CHC (20km from Govindghat, 2hr). Rishikesh AIIMS for evacuation (260km, 9hr).",
    emergency_contacts: "Joshimath SDRF +91-1389-222205 · Chamoli District Control Room 1077 · Govindghat Police +91-1389-222247 · GMVN Ghangaria reservation 1364-242100",
    source_url: "https://www.uttarakhandtourism.gov.in/destination/valley-of-flowers",
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: "hampta-pass-trek",
    day_by_day: [
      {
        day: 1, title: "Manali → Jobra → Chika",
        distance_km: 4, altitude_m: 3100, hours: 3, terrain: "forest descent + river-side meadow",
        description: "Drive Manali → Jobra (16km, 1.5hr, switchbacks). Trek descends 1km to Jobra meadow + river crossing, then 3km along Rani Nala to Chika. Easy first day for acclimatisation. Camp on the meadow with the Rani Nala stream.",
        campsite: "Chika meadow camp",
        meals: "Trek-operator camp kitchen — dal-rice + chapati",
        water: "Rani Nala stream (treat); operators boil for camp use",
      },
      {
        day: 2, title: "Chika → Balu Ka Ghera",
        distance_km: 8, altitude_m: 3650, hours: 6, terrain: "boulder-hop + glacial moraine",
        description: "Climb gradually through boulder fields and grassy meadows. Multiple stream crossings (rope-line in early-season). Balu Ka Ghera is a flat sandy bowl below the Hampta wall — 'bed of sand' translation. The pass is visible from camp.",
        campsite: "Balu Ka Ghera camp (operators only)",
        meals: "Camp kitchen",
        water: "Stream-fed; treat",
      },
      {
        day: 3, title: "Balu Ka Ghera → Hampta Pass → Shea Goru",
        distance_km: 7, altitude_m: 4270, hours: 9, terrain: "steep snow/scree to pass, then steep descent",
        description: "Pass-day. Pre-dawn (4:30am) start. 3hr steep climb to Hampta Pass (4,270m) — last 200m is scree + snow into Jul. From the pass: Indrasen + Deo Tibba peaks south, Lahaul moonscape north. Steep descent into Spiti rain-shadow (different climate zone). Shea Goru camp by riverside in Lahaul.",
        campsite: "Shea Goru camp",
        meals: "Camp kitchen",
        water: "Glacier-fed stream",
      },
      {
        day: 4, title: "Shea Goru → Chhatru → Chandratal day-trip → Chhatru",
        distance_km: 8, altitude_m: 4300, hours: 6, terrain: "valley descent + jeep day-trip",
        description: "Descend to Chhatru (3,300m) on the Manali-Spiti road. Jeep day-trip to Chandratal (Moon Lake, 4,300m). Most operators include Chandratal as a paid add-on. Return to Chhatru for the night.",
        campsite: "Chhatru camp",
        meals: "Camp kitchen + Chhatru dhaba",
        water: "Chandra river; tap at Chhatru",
      },
      {
        day: 5, title: "Chhatru → Manali",
        distance_km: 0, altitude_m: 2050, hours: 6, terrain: "long jeep drive over Rohtang/Atal Tunnel",
        description: "Jeep ride back via Atal Tunnel (Rohtang Pass closed by season's date). 5–6hr drive depending on traffic.",
        campsite: "—",
        meals: "Roadside dhabas",
        water: "Carry from Chhatru",
      },
    ],
    trail_points: [
      { name: "Jobra trailhead", lat: 32.2400, lng: 77.2406, altitude_m: 2900 },
      { name: "Chika meadow", lat: 32.2522, lng: 77.2533, altitude_m: 3100 },
      { name: "Balu Ka Ghera", lat: 32.2867, lng: 77.2867, altitude_m: 3650 },
      { name: "Hampta Pass", lat: 32.3083, lng: 77.3056, altitude_m: 4270 },
      { name: "Shea Goru", lat: 32.3333, lng: 77.3306, altitude_m: 3950 },
      { name: "Chhatru", lat: 32.3683, lng: 77.4683, altitude_m: 3300 },
      { name: "Chandratal Lake", lat: 32.4733, lng: 77.6172, altitude_m: 4300 },
    ],
    gear_essentials: [
      "Forest dept permit at Manali (operators handle; ~₹500 PP)",
      "Crampons / micro-spikes (mandatory for pass-day Jun + late-Sep)",
      "Down jacket rated to -10°C — Balu Ka Ghera + pass-day cold",
      "Waterproof boots — multiple stream crossings + pass-day snow",
      "Trekking poles (essential for Day 3 descent)",
      "Headtorch + spare batteries — pre-dawn pass-day start",
      "Sunglasses + SPF 50 — UV at 4,000m on snowfield",
      "Rain jacket + pack cover (afternoon showers Jul–Aug)",
      "Cash — no UPI past Manali",
    ],
    campsites: [
      { name: "Chika camp", altitude_m: 3100, facilities: "Operator-pitched dome tents, dry toilet, dining tent.", water: true, flat_ground: true },
      { name: "Balu Ka Ghera camp", altitude_m: 3650, facilities: "Sandy flat ground, dome tents, dry toilet.", water: true, flat_ground: true },
      { name: "Shea Goru camp", altitude_m: 3950, facilities: "Riverside flat, exposed to Lahaul wind, dome tents.", water: true, flat_ground: true },
      { name: "Chhatru camp / dhaba", altitude_m: 3300, facilities: "Permanent shelter + tents, basic toilet, dhaba.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 10000, with_guide: 16000, with_operator: 22000,
      note: "Per-person 5-day trek with operator (Indiahikes / Bikat / Trek The Himalayas) incl. Manali pickup, all camps, meals, permits, Chandratal jeep. 2025–26 season pricing.",
    },
    how_to_reach: "Fly Bhuntar (KUU) → 1.5hr taxi to Manali. Or Delhi → 12hr Volvo bus to Manali (HRTC + private). Manali to Jobra is a 1.5hr morning transfer included in operator pricing.",
    permit_details: "No formal forest permit; operators handle Lahaul-Spiti road permits where applicable. Closed by season — typically Jun 15 to Oct 5 (varies year-to-year based on snow).",
    water_sources: "Stream water at every camp — operators boil + filter. Pass-day: carry 2L from Balu Ka Ghera camp. Chandratal water is NOT for drinking (sacred status, traditional ban).",
    network_coverage: "Airtel + Jio at Manali, Jobra. Patchy at Chika. NO signal Balu Ka Ghera onwards. BSNL/Jio resumes at Chhatru intermittently.",
    nearest_hospital: "Manali Civil Hospital (16km from Jobra). Lady Willingdon Mission Hospital Manali for trauma. PGI Chandigarh for serious cases.",
    emergency_contacts: "Manali SDM +91-1902-252342 · ATMA Manali Mountaineering Institute +91-1902-250036 · HP Tourism Helpline +91-1902-250116 · Lahaul-Spiti DC +91-1900-222247",
    source_url: "https://himachaltourism.gov.in/trekking-routes/",
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: "goecha-la-trek",
    day_by_day: [
      {
        day: 1, title: "Yuksom → Sachen",
        distance_km: 8, altitude_m: 2200, hours: 5, terrain: "forest path with stream crossings",
        description: "Drive Pelling → Yuksom (32km, 1.5hr) — Sikkim's first capital, gateway. Permit at the KNP entry post. Trek through Kanchenjunga Biosphere subtropical forest. Multiple stream crossings on log bridges. Camp at Sachen (2,200m).",
        campsite: "Sachen forest camp",
        meals: "Operator kitchen",
        water: "Streams, treat",
      },
      {
        day: 2, title: "Sachen → Tshoka",
        distance_km: 7, altitude_m: 3050, hours: 6, terrain: "steep climb + suspension bridge",
        description: "Steep ascent through rhododendron forest. Cross Prek Chu via suspension bridge at Bakhim. Tshoka is a Tibetan refugee village (1950s) with a small Buddhist monastery + flat camping.",
        campsite: "Tshoka trekkers' hut + camp",
        meals: "Operator kitchen + village dhabas",
        water: "Tshoka piped + stream",
      },
      {
        day: 3, title: "Tshoka → Dzongri",
        distance_km: 9, altitude_m: 4030, hours: 6, terrain: "rhododendron forest → alpine meadow",
        description: "Wooden-plank trail through dense rhododendron + magnolia forest (in bloom Apr–May). Tree-line break at Phedang (3,650m). Final climb to Dzongri meadow — first major altitude gain. Acclimatisation strict.",
        campsite: "Dzongri trekkers' hut + camp",
        meals: "Operator kitchen",
        water: "Stream + Dzongri tank",
      },
      {
        day: 4, title: "Dzongri Top sunrise + Acclimatisation",
        distance_km: 4, altitude_m: 4200, hours: 3, terrain: "ridge walk",
        description: "Pre-dawn (4am) climb to Dzongri Top — sunrise reveals Kanchenjunga, Pandim, Kabru, Rathong — 5 of Sikkim's biggest peaks visible at once. Return to camp for acclimatisation rest. Mandatory rest day for safety.",
        campsite: "Dzongri",
        meals: "Operator kitchen",
        water: "Camp source",
      },
      {
        day: 5, title: "Dzongri → Thansing",
        distance_km: 9, altitude_m: 3900, hours: 6, terrain: "valley descent + climb to glacial moraine",
        description: "Descend into the Prek Chu valley, cross at Kockchurang (3,650m), climb to Thansing — wide alpine bowl below Pandim's south face. Pandim is the iconic 6,691m peak that dominates this leg.",
        campsite: "Thansing camp (riverside)",
        meals: "Operator kitchen",
        water: "Prek Chu",
      },
      {
        day: 6, title: "Thansing → Lamuney → Goecha La (Viewpoint 1) → Lamuney",
        distance_km: 14, altitude_m: 4940, hours: 11, terrain: "moraine + rocky pass-approach",
        description: "Pass-day. 1hr from Thansing to Lamuney (4,200m) — the high camp before the pass. From Lamuney, pre-dawn 3am start. Climb past Samiti Lake (4,300m, sacred) and the moraine to Goecha La Viewpoint 1 (4,940m) — Kanchenjunga's massive south-east face fills the horizon. Viewpoint 2 (the actual pass at 5,200m) is closed since 2018. Return to Lamuney by noon.",
        campsite: "Lamuney camp",
        meals: "Operator kitchen + packed lunch",
        water: "Samiti Lake source (treat) + stream",
      },
      {
        day: 7, title: "Lamuney → Tshoka",
        distance_km: 14, altitude_m: 3050, hours: 7, terrain: "long descent",
        description: "Long descent past Thansing, Kockchurang, back through Phedang to Tshoka. Knee-heavy. Most fit trekkers do it in one day; less-fit can split at Phedang.",
        campsite: "Tshoka",
        meals: "Operator kitchen",
        water: "Streams",
      },
      {
        day: 8, title: "Tshoka → Yuksom → exit",
        distance_km: 15, altitude_m: 1780, hours: 7, terrain: "forest descent",
        description: "Descend to Yuksom. Drive Pelling/Gangtok exit.",
        campsite: "—",
        meals: "Yuksom homestay",
        water: "Trail streams",
      },
    ],
    trail_points: [
      { name: "Yuksom trailhead + KNP gate", lat: 27.3697, lng: 88.2236, altitude_m: 1780 },
      { name: "Sachen camp", lat: 27.4014, lng: 88.2092, altitude_m: 2200 },
      { name: "Bakhim suspension bridge", lat: 27.4178, lng: 88.2050, altitude_m: 2750 },
      { name: "Tshoka village", lat: 27.4258, lng: 88.2017, altitude_m: 3050 },
      { name: "Phedang", lat: 27.4519, lng: 88.1989, altitude_m: 3650 },
      { name: "Dzongri", lat: 27.4778, lng: 88.1858, altitude_m: 4030 },
      { name: "Thansing", lat: 27.5092, lng: 88.1739, altitude_m: 3900 },
      { name: "Lamuney", lat: 27.5194, lng: 88.1792, altitude_m: 4200 },
      { name: "Samiti Lake", lat: 27.5292, lng: 88.1856, altitude_m: 4300 },
      { name: "Goecha La Viewpoint 1", lat: 27.5550, lng: 88.1733, altitude_m: 4940 },
    ],
    gear_essentials: [
      "Sikkim Inner Line Permit + Kanchenjunga National Park permit (operators handle ~₹2,500 PP)",
      "Mandatory registered Sikkim guide + porter — solo trekking banned",
      "Down jacket rated -15°C — Lamuney + pass-day cold (-5 to -15°C nights)",
      "4-season tent + sleeping bag (operators provide)",
      "Crampons / micro-spikes (mandatory pass-day in Apr–May + Oct–Nov)",
      "Trekking poles — long descent days hard on knees",
      "Sunglasses category 4 + SPF 50 — UV at 5,000m brutal",
      "Headtorch + 2 spare battery sets",
      "Dry sacks — frequent rain on lower stretches",
      "Cash — no UPI past Yuksom",
    ],
    campsites: [
      { name: "Sachen forest camp", altitude_m: 2200, facilities: "Operator dome tents, dry toilet, dining tent.", water: true, flat_ground: true },
      { name: "Tshoka trekkers' hut", altitude_m: 3050, facilities: "Wooden-plank dorm + camp, village dhabas.", water: true, flat_ground: true },
      { name: "Dzongri trekkers' hut", altitude_m: 4030, facilities: "Stone hut + tents, exposed meadow.", water: true, flat_ground: true },
      { name: "Thansing camp", altitude_m: 3900, facilities: "Riverside flat, dome tents, prone to wind.", water: true, flat_ground: true },
      { name: "Lamuney camp", altitude_m: 4200, facilities: "High camp on moraine, dome tents, very cold nights.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 18000, with_guide: 24000, with_operator: 32000,
      note: "Per-person 8-day trek with operator (Indiahikes / Bikat / Trek the Himalayas) incl. Yuksom pickup, KNP permit, mandatory guide/porter, all camps, meals. 2025–26 season.",
    },
    how_to_reach: "Fly Bagdogra (IXB) → 5hr taxi to Pelling/Yuksom. Rail to NJP from Howrah/Sealdah, then taxi. Helicopter Bagdogra → Gangtok available (Pawan Hans, weather-dependent), then 7hr drive to Yuksom.",
    permit_details: "ILP needed for foreign nationals (Sikkim Tourism online portal). KNP entry permit ₹350 Indian / ₹600 foreign + ₹100 photography. MUST have a registered Sikkim guide + at least 1 porter — solo unguided trekking banned by KNP after 2017 incidents.",
    water_sources: "Streams at every camp; treat or boil. Samiti Lake water is sacred — NOT for drinking. Lamuney camp has a stream 200m away.",
    network_coverage: "Airtel + Jio at Yuksom. Patchy at Tshoka. NO signal Phedang onwards. Carry satellite messenger (operators do).",
    nearest_hospital: "Yuksom PHC. Pelling Sub-Divisional Hospital (32km, 1.5hr). STNM Hospital Gangtok (5hr) for serious cases.",
    emergency_contacts: "Yuksom Police +91-3595-241222 · Pelling Tourist Police +91-3595-258844 · Sikkim Tourism Helpline 1800-345-3700 · KNP Forester Yuksom +91-9434XXXXXX (verify with permit office)",
    source_url: "https://www.sikkimtourism.gov.in/Public/TouristInformation/sikkim_treks",
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: "kuari-pass-trek",
    day_by_day: [
      {
        day: 1, title: "Joshimath → Dhak → Gulling",
        distance_km: 5, altitude_m: 2700, hours: 4, terrain: "village path + forest climb",
        description: "Drive Joshimath → Dhak (12km, 30min). Trek 5km up through Tugasi village to Gulling — apple-orchard country. Camp on a clearing above the village.",
        campsite: "Gulling camp",
        meals: "Operator kitchen",
        water: "Stream, treat",
      },
      {
        day: 2, title: "Gulling → Khullara",
        distance_km: 6, altitude_m: 3350, hours: 5, terrain: "rhododendron forest + meadow",
        description: "Climb steeply through dense oak + rhododendron to Tali (3,150m), continue to Khullara (3,350m) — wide meadow with views opening onto Hathi-Ghoda peaks.",
        campsite: "Khullara camp",
        meals: "Operator kitchen",
        water: "Stream",
      },
      {
        day: 3, title: "Khullara → Kuari Pass → Khullara",
        distance_km: 8, altitude_m: 4264, hours: 7, terrain: "ridge walk + final scree",
        description: "Pass-day. 4hr climb along the ridge to Kuari Pass (4,264m). The view: Nanda Devi (7,816m), Dunagiri, Hathi-Ghoda, Kamet, Trishul — possibly the most peak-dense view in Garhwal. This is the trail Lord Curzon walked in 1905. Return to Khullara.",
        campsite: "Khullara",
        meals: "Operator kitchen + packed lunch",
        water: "Stream + carry 2L on pass-day",
      },
      {
        day: 4, title: "Khullara → Tali → Auli",
        distance_km: 10, altitude_m: 2850, hours: 6, terrain: "forest descent + ski-resort exit",
        description: "Descend through Tali. Continue down to Auli (Garhwal's ski resort). Most operators end here for the cable-car descent option.",
        campsite: "Auli homestay/hotel",
        meals: "Auli dhabas + hotel restaurant",
        water: "Auli piped",
      },
      {
        day: 5, title: "Auli → Joshimath → exit",
        distance_km: 0, altitude_m: 1875, hours: 1, terrain: "cable car / drive",
        description: "Auli cable car (Asia's longest at 4km, 22min) to Joshimath. Drive Rishikesh exit.",
        campsite: "—",
        meals: "Joshimath restaurants",
        water: "—",
      },
    ],
    trail_points: [
      { name: "Dhak trailhead", lat: 30.5681, lng: 79.4900, altitude_m: 2200 },
      { name: "Tugasi village", lat: 30.5733, lng: 79.4944, altitude_m: 2400 },
      { name: "Gulling camp", lat: 30.5825, lng: 79.5075, altitude_m: 2700 },
      { name: "Tali", lat: 30.5933, lng: 79.5167, altitude_m: 3150 },
      { name: "Khullara meadow", lat: 30.6000, lng: 79.5258, altitude_m: 3350 },
      { name: "Kuari Pass", lat: 30.6164, lng: 79.5394, altitude_m: 4264 },
      { name: "Auli", lat: 30.5300, lng: 79.5650, altitude_m: 2850 },
    ],
    gear_essentials: [
      "Forest dept permit (operators handle ~₹500 PP)",
      "Crampons / micro-spikes (mandatory Dec–Mar; useful Apr–May)",
      "Down jacket rated -10°C (winter -15°C minimum)",
      "Trekking poles + waterproof boots",
      "Sunglasses category 3 + SPF 50",
      "Headtorch + spare batteries",
      "Snow gaiters Dec–Apr",
      "Rain jacket Sep–Oct",
      "Cash — no UPI past Joshimath",
    ],
    campsites: [
      { name: "Gulling camp", altitude_m: 2700, facilities: "Forest clearing, operator dome tents, dry toilet.", water: true, flat_ground: true },
      { name: "Khullara meadow camp", altitude_m: 3350, facilities: "Wide meadow, exposed to wind, dome tents.", water: true, flat_ground: true },
      { name: "Auli hotels", altitude_m: 2850, facilities: "Garhwal Mandal Vikas Nigam (GMVN) rooms + private hotels, hot showers.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 8000, with_guide: 12000, with_operator: 18000,
      note: "Per-person 5-day trek with operator (Indiahikes / Trek the Himalayas) incl. Joshimath pickup, all camps, meals, permits. Auli cable car ticket ~₹350/PP. 2025–26 season.",
    },
    how_to_reach: "Fly Dehradun (DED) → 9hr taxi to Joshimath. Rishikesh railhead → 10hr bus to Joshimath. Auli at trek-end has GMVN cable car connecting to Joshimath, alternative is 16km road.",
    permit_details: "Forest dept permit issued at Joshimath; operators handle. No restricted area. Trail accessible year-round but Dec–Apr requires winter gear.",
    water_sources: "Streams at every camp; treat or boil. Pass-day carry 2L from Khullara — no source on the ridge.",
    network_coverage: "Airtel + Jio at Joshimath, Auli. Patchy at Gulling. NO signal Khullara, Kuari Pass.",
    nearest_hospital: "Joshimath CHC. Rishikesh AIIMS for evacuation (250km, 9hr). Auli has a small medical post (winter only).",
    emergency_contacts: "Joshimath SDRF +91-1389-222205 · Chamoli District Control Room 1077 · Auli GMVN +91-1389-223208 · Uttarakhand Police 112",
    source_url: "https://www.uttarakhandtourism.gov.in/destination/auli",
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: "brahmatal-trek",
    day_by_day: [
      {
        day: 1, title: "Lohajung → Bekaltal",
        distance_km: 6, altitude_m: 3000, hours: 4, terrain: "oak-forest climb",
        description: "Drive Kathgodam/Rishikesh → Lohajung (overnight base). Trek begins next morning. Steep oak-forest climb to Bekaltal — first lake of the trek, a small frozen mirror surrounded by rhododendron.",
        campsite: "Bekaltal camp",
        meals: "Operator kitchen",
        water: "Stream + tank, treat",
      },
      {
        day: 2, title: "Bekaltal → Brahmatal",
        distance_km: 6, altitude_m: 3320, hours: 5, terrain: "ridge climb + meadow",
        description: "Climb out of forest onto a ridge — first views of Mt. Trishul + Nanda Ghunti as you break the tree line. Brahmatal lake is named for Brahma, who is said to have meditated here. Camp on the meadow above the frozen lake (winter) or beside it (summer).",
        campsite: "Brahmatal camp",
        meals: "Operator kitchen",
        water: "Stream / lake-melt",
      },
      {
        day: 3, title: "Brahmatal → Brahmatal Top → Brahmatal",
        distance_km: 6, altitude_m: 3734, hours: 5, terrain: "ridge walk to summit",
        description: "Climb to Brahmatal Top (3,734m) — the highest point. Wide-angle view of Trishul (7,120m), Nanda Ghunti (6,309m), and Roopkund's south face. Many trekkers consider this one of Garhwal's best viewpoint vs effort ratios. Return to camp.",
        campsite: "Brahmatal",
        meals: "Operator kitchen + packed lunch",
        water: "Stream",
      },
      {
        day: 4, title: "Brahmatal → Daldam → Lohajung",
        distance_km: 9, altitude_m: 2300, hours: 6, terrain: "long forest descent",
        description: "Descend via Daldam village — Garhwali wood-plank houses, terraced potato fields. Long but straightforward downhill. Reach Lohajung by afternoon. Operator vehicles transfer to Kathgodam/Rishikesh.",
        campsite: "Lohajung guesthouse / exit",
        meals: "Lohajung dhabas",
        water: "Trail streams + Lohajung tap",
      },
    ],
    trail_points: [
      { name: "Lohajung trailhead", lat: 30.0306, lng: 79.7300, altitude_m: 2300 },
      { name: "Bekaltal lake", lat: 30.0533, lng: 79.7556, altitude_m: 3000 },
      { name: "Forest break ridge", lat: 30.0683, lng: 79.7644, altitude_m: 3200 },
      { name: "Brahmatal lake camp", lat: 30.0814, lng: 79.7783, altitude_m: 3320 },
      { name: "Brahmatal Top", lat: 30.0856, lng: 79.7833, altitude_m: 3734 },
      { name: "Daldam village", lat: 30.0500, lng: 79.7456, altitude_m: 2700 },
    ],
    gear_essentials: [
      "Forest dept permit (operators handle ~₹400 PP)",
      "Crampons / micro-spikes (mandatory Dec–Apr — Brahmatal is famous as a winter snow trek)",
      "Down jacket rated -15°C (winter trek; nights drop to -10 to -12°C)",
      "Snow gaiters + waterproof boots",
      "Trekking poles — long descent on Day 4",
      "Sunglasses category 3 + SPF 50 (snow-glare in winter)",
      "Headtorch + spare batteries",
      "4-season tent + sleeping bag (operators provide)",
      "Cash — no UPI at Lohajung",
    ],
    campsites: [
      { name: "Bekaltal camp", altitude_m: 3000, facilities: "Forest clearing beside lake, operator dome tents, dry toilet.", water: true, flat_ground: true },
      { name: "Brahmatal camp", altitude_m: 3320, facilities: "Meadow camp beside lake, exposed to wind, very cold winter nights.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 7000, with_guide: 11000, with_operator: 16000,
      note: "Per-person 4-day trek with operator (Indiahikes / Bikat) incl. Kathgodam/Rishikesh pickup, all camps, meals, permits, gear rental. Winter premium adds ₹2,000 (Dec–Mar). 2025–26 season.",
    },
    how_to_reach: "Kathgodam railhead (KGM) → 9hr taxi to Lohajung (most common route). Rishikesh → 11hr bus + taxi to Lohajung. Pantnagar (PGH) airport → 8hr taxi.",
    permit_details: "Forest dept permit issued at Lohajung; operators handle. Trail accessible year-round but the famous winter snow-trek experience is Dec–Apr. Reduced traffic in Sep–Oct gives green-meadow views.",
    water_sources: "Streams at every camp; treat or boil. Brahmatal lake water is sacred — drinkable only after boiling, and respect customs (don't bathe).",
    network_coverage: "Airtel + Jio at Lohajung. NO signal Bekaltal, Brahmatal, summit. BSNL very patchy — operators carry satellite messengers.",
    nearest_hospital: "Lohajung small PHC (basic). Tharali CHC (35km). Karnaprayag Hospital (60km). Dehradun for serious cases.",
    emergency_contacts: "Chamoli District Control Room 1077 · Lohajung Tourism Office +91-1389-XXXXXX · Uttarakhand SDRF +91-135-2655589 · Police 112",
    source_url: "https://www.uttarakhandtourism.gov.in/",
  },
];

// Common defaults for every record (matches existing schema)
const DEFAULTS = {
  permits_required: true,
  warnings: [],
};

const TREK_HEADERS = {
  "valley-of-flowers-trek": {
    name: "Valley of Flowers Trek",
    destination_id: "valley-of-flowers",
    difficulty: "moderate", duration_days: 4, max_altitude_m: 3650, distance_km: 38,
    best_months: [7, 8, 9], permits_required: true, kids_suitable: true, min_age: 10,
    fitness_level: "moderate",
    description: "UNESCO World Heritage alpine meadow above the Pushpawati gorge. Closed Nov–May for snow; the famous flower bloom is mid-Jul to mid-Aug (300+ species: Brahma Kamal, Blue Poppy, Cobra Lily). Day-hike from Ghangaria base. Hemkund Sahib (4,329m, world's highest gurdwara) is an optional acclimatised add-on. Paved 13km approach makes it accessible to first-time trekkers.",
    highlights: [
      "UNESCO World Heritage Site (1982)",
      "300+ alpine flower species — Brahma Kamal, Blue Poppy, Cobra Lily peak Jul–Aug",
      "Hemkund Sahib gurdwara at 4,329m (highest in the world) as optional add-on",
      "Frank Smythe's 1937 botanist trail",
      "Pushpawati glacier-fed river runs alongside the approach",
    ],
    warnings: [
      "Closed November–May for snow; bloom window is mid-July to mid-August (60-day peak)",
      "Forest dept entry rules: 6am–12 noon entry, must exit by 5pm — no overnight in valley",
      "Daily afternoon showers Jul–Aug; mandatory rain gear",
      "Leech-heavy at lower elevations Jul–Aug",
    ],
  },
  "hampta-pass-trek": {
    name: "Hampta Pass Trek",
    destination_id: "manali",
    difficulty: "moderate", duration_days: 5, max_altitude_m: 4270, distance_km: 27,
    best_months: [6, 7, 8, 9], permits_required: false, kids_suitable: false, min_age: 14,
    fitness_level: "moderate",
    description: "Crossover trek from Kullu valley's lush green to Lahaul-Spiti's moonscape — one of the Himalayas' clearest climate-zone transitions in 5 days. Pass-day is steep but technically simple. Chandratal Lake jeep day-trip is the classic add-on. Open Jun-Sep; closed by snow rest of year.",
    highlights: [
      "Climate-zone crossover: lush Kullu → moonscape Lahaul in a single pass-day",
      "Indrasen + Deo Tibba peak views from the Hampta Pass summit",
      "Chandratal Lake (Moon Lake) jeep day-trip from Chhatru",
      "Manali start point — easy logistics from Delhi",
      "Summer-only window (Jun-Sep) — perfect when most other Himalayan treks are monsoon-affected",
    ],
    warnings: [
      "Pass-day altitude gain 620m → snow + scree in early-Jun + late-Sep",
      "Multiple stream crossings — ropes/operator support recommended",
      "Closed Oct-May for snow",
      "Atal Tunnel closes occasionally for heavy snow on the Lahaul side",
    ],
  },
  "goecha-la-trek": {
    name: "Goecha La Trek",
    destination_id: "yuksom",
    difficulty: "hard", duration_days: 8, max_altitude_m: 4940, distance_km: 84,
    best_months: [4, 5, 10, 11], permits_required: true, kids_suitable: false, min_age: 16,
    fitness_level: "hard",
    description: "Sikkim's signature Kanchenjunga-base trek through Kanchenjunga National Park. 8-day approach via Yuksom → Sachen → Tshoka → Dzongri → Thansing → Lamuney → Goecha La (4,940m Viewpoint 1). Viewpoint 2 (5,200m, the actual pass) closed since 2018. Mandatory Sikkim guide + porter — solo banned. Best windows: Apr–May (rhododendron) and Oct–Nov (clearest views).",
    highlights: [
      "Kanchenjunga's massive south-east face from Goecha La Viewpoint 1",
      "Dzongri Top sunrise — 5 of Sikkim's biggest peaks (Kanchenjunga, Pandim, Kabru, Rathong, Kabru Dome) at once",
      "Samiti Lake — sacred high-altitude lake en route to the pass",
      "Rhododendron + magnolia bloom belt at Tshoka–Phedang Apr–May",
      "Tibetan refugee village Tshoka with 1950s history",
    ],
    warnings: [
      "Solo trekking BANNED in Kanchenjunga NP after 2017 incidents — mandatory registered Sikkim guide + porter",
      "Goecha La Viewpoint 2 (5,200m, the actual pass) closed since 2018 — only Viewpoint 1 (4,940m) accessible",
      "ILP for foreign nationals, KNP permit for all",
      "Pass-day is 11hr round-trip from Lamuney — high fitness requirement",
    ],
  },
  "kuari-pass-trek": {
    name: "Kuari Pass Trek (Curzon's Trail)",
    destination_id: "joshimath",
    difficulty: "moderate", duration_days: 5, max_altitude_m: 4264, distance_km: 29,
    best_months: [3, 4, 5, 9, 10, 11, 12, 1, 2], permits_required: false, kids_suitable: false, min_age: 14,
    fitness_level: "moderate",
    description: "The trail Lord Curzon walked in 1905 — a Garhwal classic with Nanda Devi as the headline view. 5-day round-trip from Joshimath via Dhak/Tugasi/Gulling/Khullara to the 4,264m pass. Auli ski-resort exit makes the descent easier (cable car option). Year-round window with Dec–Apr being the famous winter snow trek.",
    highlights: [
      "Nanda Devi (7,816m) + Dunagiri + Hathi-Ghoda + Kamet visible from the pass",
      "Lord Curzon's 1905 trail — historic Himalayan route",
      "Auli ski resort + 4km cable car at trek-end",
      "Year-round trek — winter snow Dec–Apr, summer meadows May–Jun, autumn clarity Sep–Nov",
      "Joshimath logistics base (rail-accessible from Rishikesh)",
    ],
    warnings: [
      "Winter (Dec–Mar) is technical — crampons + winter gear mandatory",
      "Pass-day altitude gain 900m → AMS risk for first-timers",
      "Joshimath subsidence (since 2023) has affected accommodation availability — confirm pre-booking",
      "Auli cable car closes for high winds; backup road descent is 16km",
    ],
  },
  "brahmatal-trek": {
    name: "Brahmatal Trek",
    destination_id: "auli",
    difficulty: "easy", duration_days: 4, max_altitude_m: 3734, distance_km: 27,
    best_months: [12, 1, 2, 3, 4, 9, 10, 11], permits_required: false, kids_suitable: true, min_age: 10,
    fitness_level: "easy",
    description: "Garhwal's most accessible winter snow trek. 4-day round-trip from Lohajung via Bekaltal lake → Brahmatal lake → Brahmatal Top (3,734m). The headline views are Mt. Trishul (7,120m) + Nanda Ghunti (6,309m) directly across the valley. Famous as a 'first winter snow' trek — minimum altitude/effort for a snow-line experience. Closed in monsoon (Jul–Aug).",
    highlights: [
      "Garhwal's best beginner winter snow trek (Dec–Mar)",
      "Mt. Trishul + Nanda Ghunti from Brahmatal Top",
      "Two named lakes — Bekaltal + Brahmatal — both freeze in winter",
      "Roopkund's south face visible from the summit",
      "Family-friendly minimum altitude/effort ratio",
    ],
    warnings: [
      "Closed Jul-Aug for monsoon",
      "Winter (Dec-Mar) requires crampons + -15°C gear",
      "Brahmatal lake water is sacred — don't bathe",
      "Lohajung is 9hr by road from Kathgodam — long approach",
    ],
  },
};

const FULL_TREKS = TREKS.map((t) => ({
  id: t.id,
  ...TREK_HEADERS[t.id],
  ...DEFAULTS,
  ...TREK_HEADERS[t.id],
  day_by_day: t.day_by_day,
  trail_points: t.trail_points,
  gear_essentials: t.gear_essentials,
  campsites: t.campsites,
  cost_estimate: t.cost_estimate,
  how_to_reach: t.how_to_reach,
  permit_details: t.permit_details,
  water_sources: t.water_sources,
  network_coverage: t.network_coverage,
  nearest_hospital: t.nearest_hospital,
  emergency_contacts: t.emergency_contacts,
  source_url: t.source_url,
  last_reviewed_at: REVIEWED_AT,
}));

(async () => {
  console.log("→ Backfilling 5 marquee thin treks (batch 3)…");
  let ok = 0;
  for (const t of FULL_TREKS) {
    const { error } = await supabase.from("treks").upsert(t, { onConflict: "id" });
    if (error) {
      console.error(`  × ${t.id}:`, error.message);
    } else {
      console.log(`  ✓ ${t.id} · ${t.day_by_day.length}d · ${t.trail_points.length} trail · ${t.gear_essentials.length} gear`);
      ok++;
    }
  }
  console.log(`\nDone. ${ok}/${FULL_TREKS.length} treks shipped. Coverage now 13/133 (10%).\n`);
  console.log("Verify:");
  console.log("  curl https://www.nakshiq.com/en/treks/valley-of-flowers-trek | grep 'Pushpawati'");
  console.log("  curl https://www.nakshiq.com/en/treks/goecha-la-trek | grep 'Kanchenjunga'");
})();
