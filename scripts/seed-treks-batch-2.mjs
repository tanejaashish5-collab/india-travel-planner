#!/usr/bin/env node
/**
 * Track C — trek backfill, batch 2 (5 marquee thin treks).
 *
 * Sessions 5–7 added Deomali / Mawphlang / Deoria Tal. This batch picks
 * 5 well-known thin treks (had names but no day_by_day / trail_points):
 *   - sandakphu-approach        (Darjeeling–Sikkim, 3,636m)
 *   - kalsubai-peak-trek        (Maharashtra's highest, 1,646m)
 *   - harishchandragad-trek     (Konkan Kada cliff, 1,424m)
 *   - mullayyanagiri-trek       (Karnataka's highest, 1,930m)
 *   - chembra-peak-trek         (Wayanad heart-lake, 2,100m)
 *
 * After this run: 8 of 133 treks have full backfill (6%); 65 thin remain.
 *
 * Same pattern as scripts/seed-treks-backfill.mjs (Deomali template).
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-treks-batch-2.mjs
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
  {
    id: "sandakphu-approach",
    day_by_day: [
      {
        day: 1, title: "Manebhanjan → Tonglu → Tumling",
        distance_km: 11, altitude_m: 2970, hours: 6, terrain: "stone-paved Singalila ridge road",
        description: "Drive Darjeeling → Manebhanjan (26km, 1.5hr). Permit + Land Rover registration at SSI office. Trek 11km along the cobbled Singalila Ridge to Tumling via Meghma. Trail follows the India-Nepal border; passport/ID checked twice. Magnolia + rhododendron in Apr-May.",
        campsite: "Tumling teahouse (Shikhar Lodge or Siddharth)",
        meals: "Teahouse dal-bhat dinner",
        water: "Pre-fill at Manebhanjan; teahouses sell bottled",
      },
      {
        day: 2, title: "Tumling → Gairibas → Kalpokhri",
        distance_km: 14, altitude_m: 3200, hours: 7, terrain: "ridge + forest descent + climb",
        description: "Continue along Singalila NP boundary. Steep descent to Gairibas (3hr) then climb back through bamboo forest to Kalpokhri ('Black Lake'). Sacred lake never freezes. Lunch at Gairibas teahouse (Nepal side, INR accepted).",
        campsite: "Kalpokhri trekkers' lodge",
        meals: "Teahouse breakfast + lunch + dinner",
        water: "Stream water at Gairibas; treat",
      },
      {
        day: 3, title: "Kalpokhri → Bikheybhanjyang → Sandakphu",
        distance_km: 6, altitude_m: 3636, hours: 5, terrain: "steep summit push",
        description: "The hardest stretch. Cross Bikheybhanjyang ('Poison Pass' — wild aconite once grew here) and climb the relentless 1,000m to Sandakphu summit. On clear mornings: Everest, Lhotse, Makalu, Kanchenjunga, Jannu — 4 of the world's 5 highest visible from Sandakphu trekkers' hut. Sunset view-point 5min from the lodge.",
        campsite: "Sandakphu Trekkers' Hut (GTA-run)",
        meals: "Limited menu — dal, rice, eggs",
        water: "Carry from Kalpokhri",
      },
      {
        day: 4, title: "Sandakphu → Sabargram → Srikhola",
        distance_km: 14, altitude_m: 2200, hours: 7, terrain: "long descent",
        description: "Pre-dawn (4:30am) for the 5-peaks-of-Kanchenjunga sleeping-Buddha view from the summit lookout. Descend via Sabargram and Phalut spur (optional viewpoint). Long leg to Srikhola through dense oak forest. Camp at Srikhola Trekkers' Hut.",
        campsite: "Srikhola Trekkers' Hut",
        meals: "Lodge dinner",
        water: "Multiple streams en route; treat",
      },
      {
        day: 5, title: "Srikhola → Rimbick → Darjeeling exit",
        distance_km: 6, altitude_m: 2400, hours: 3, terrain: "forest descent",
        description: "Easy 3hr descent to Rimbick. Land Rover from Rimbick → Darjeeling (4hr, 76km on broken road).",
        campsite: "—",
        meals: "Tea-stall breakfast",
        water: "Carry from Srikhola",
      },
    ],
    trail_points: [
      { name: "Manebhanjan trailhead", lat: 27.0356, lng: 88.0089, altitude_m: 2150 },
      { name: "Tumling", lat: 27.0489, lng: 88.0061, altitude_m: 2970 },
      { name: "Gairibas", lat: 27.0825, lng: 88.0125, altitude_m: 2620 },
      { name: "Kalpokhri", lat: 27.0911, lng: 88.0264, altitude_m: 3200 },
      { name: "Sandakphu summit", lat: 27.1053, lng: 88.0083, altitude_m: 3636 },
      { name: "Srikhola", lat: 27.1242, lng: 88.0658, altitude_m: 2200 },
      { name: "Rimbick", lat: 27.1283, lng: 88.1056, altitude_m: 2350 },
    ],
    gear_essentials: [
      "Singalila NP entry permit (₹200 Indian / ₹600 foreign at Manebhanjan SSI office)",
      "Foreign passport: Inner Line Permit needed; not required for Indian citizens",
      "Sturdy boots — cobblestone ridge is hard on knees",
      "Down jacket (rated -5°C; Sandakphu drops to -10°C in Dec-Jan)",
      "Sunglasses + sunscreen (SPF 50, ridge UV at 3,500m)",
      "Headtorch — pre-dawn summit view requires 30-min walk in the dark",
      "Cash — no UPI/cards past Manebhanjan",
    ],
    campsites: [
      { name: "Tumling teahouse (Shikhar Lodge)", altitude_m: 2970, facilities: "Twin rooms, shared toilet, hot meals, charging.", water: true, flat_ground: true },
      { name: "Kalpokhri trekkers' lodge", altitude_m: 3200, facilities: "Dorm + 2 twin rooms, basic toilet, log fire.", water: true, flat_ground: true },
      { name: "Sandakphu Trekkers' Hut (GTA-run)", altitude_m: 3636, facilities: "8 dorm beds + 4 twin rooms; book GTA tourism. No charging.", water: true, flat_ground: true },
      { name: "Srikhola Trekkers' Hut", altitude_m: 2200, facilities: "Dorm + dining hall, hot showers (geyser), lodge dinner.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 7500, with_guide: 14000, with_operator: 22000,
      note: "Per-person, 5-day trek incl. permits, teahouse stays, meals, Manebhanjan/Rimbick transfers from Darjeeling. Operator = Indiahikes/Bikat range, 2025-26 season.",
    },
    how_to_reach: "Fly Bagdogra (IXB) → 4hr taxi to Darjeeling → 1.5hr Land Rover to Manebhanjan. Alternatively rail to NJP from Howrah/Sealdah, then taxi.",
    permit_details: "Singalila NP entry permit (₹200/₹600) at Manebhanjan SSI office; same office also issues Land Rover registration. Foreign nationals additionally need ILP (apply via West Bengal e-permit portal).",
    water_sources: "Teahouses sell bottled water (₹40-60/L) along the route. Stream water at Gairibas + before Kalpokhri (treat or boil). Carry 2L on the Sandakphu summit-day push.",
    network_coverage: "Airtel + Jio at Manebhanjan + Rimbick. No coverage at Tumling/Kalpokhri/Sandakphu. BSNL slightly better at Sandakphu.",
    nearest_hospital: "Darjeeling Sadar Hospital (76km from Sandakphu, 6hr by road). Manebhanjan PHC for basic emergencies.",
    emergency_contacts: "Manebhanjan SSI office +91-354-2280069 · Darjeeling DM +91-354-2254233 · Singalila NP forester +91-9434XXXXXX (verify with SSI before departure)",
    source_url: "https://www.singalilanationalpark.com/sandakphu-trek/",
  },
  {
    id: "kalsubai-peak-trek",
    day_by_day: [
      {
        day: 1, title: "Bari village → Kalsubai summit → Bari descent",
        distance_km: 6, altitude_m: 1646, hours: 5, terrain: "steep ascent + iron ladders",
        description: "Maharashtra's highest peak. Pre-dawn (4:30am) start from Bari village. The trail climbs through scrub forest, then 4 sets of iron ladders bolted into rock faces (last one is 30m vertical). Summit has the Kalsubai temple — devi goddess, simple shrine. Sunrise from the summit reveals the Sahyadri ridges + Bhandardara dam reservoir below. Descend by 11am before the heat. Ladders are slippery in monsoon — use gloves.",
        campsite: "—",
        meals: "Bari village tea-stall breakfast post-trek (poha, vada-pav)",
        water: "Carry 2L from Bari; no source on the climb",
      },
    ],
    trail_points: [
      { name: "Bari village trailhead", lat: 19.6028, lng: 73.7142, altitude_m: 750 },
      { name: "First ladder section", lat: 19.6014, lng: 73.7172, altitude_m: 1200 },
      { name: "Final 30m ladder", lat: 19.5997, lng: 73.7203, altitude_m: 1500 },
      { name: "Kalsubai summit + temple", lat: 19.5986, lng: 73.7228, altitude_m: 1646 },
    ],
    gear_essentials: [
      "Headtorch — pre-dawn start mandatory in summer (5am, before heat)",
      "Sturdy shoes with grip — last 200m is bare rock",
      "Gloves — iron ladders rust-rough, monsoon ladders slippery",
      "1.5–2L water minimum; 3L in summer",
      "Cap + sunscreen — exposed scrub from km 1 onwards",
      "Cash for parking ₹50 + temple donation",
    ],
    campsites: [],
    cost_estimate: {
      budget: 800, with_guide: 1500, with_operator: 2500,
      note: "Per-person day trek incl. parking + tea-stall meal + Mumbai/Pune-day-trip taxi share. Operator = guided weekend tour (Trek Mates India, Treks and Trails).",
    },
    how_to_reach: "Mumbai → Igatpuri (railway, 3hr) → Bari village taxi (45km, 1.5hr). Pune → Bari is 5hr by car. Closest railhead: Igatpuri (IGP).",
    permit_details: "No formal permit. Forest-department entry ₹40/person collected at Bari (when manned). Temple donation customary.",
    water_sources: "Bari village has piped water; treat. NO water on the climb — carry minimum 1.5L (summer 3L).",
    network_coverage: "Airtel + Jio at Bari and most of the lower trail. Patchy near the summit. Emergency calls usually go through.",
    nearest_hospital: "Igatpuri Civil Hospital (45km, 1.5hr). Sangamner Hospital (60km) for serious cases.",
    emergency_contacts: "Bari village sarpanch +91-9XXXXXXXXX (verify locally) · Igatpuri Police +91-2553-244233 · Sangamner SDM 02425-225230",
    source_url: "https://www.maharashtratourism.gov.in/",
  },
  {
    id: "harishchandragad-trek",
    day_by_day: [
      {
        day: 1, title: "Pachnai trailhead → Harishchandragad fort + Konkan Kada → Khireshwar exit",
        distance_km: 12, altitude_m: 1424, hours: 9, terrain: "mixed scrub + rock + cave overnight",
        description: "Two route options: Pachnai (easiest, 3hr to fort) or Tolar Khind (technical, 5hr with rock-patch climb). This itinerary uses Pachnai up + Khireshwar down for variety. Climb through cattle pens and oak forest to the plateau (1300m). Visit Kedareshwar cave-temple (water-filled, 5ft Shiva linga submerged). Continue to Konkan Kada — the U-shaped overhanging cliff dropping 350m to the Konkan plain. Sunset here is iconic. Overnight in one of the rock-cut caves on the plateau (BYO tent or mat). Day 2 descent via Khireshwar (5hr) — steep, includes Tolar Khind rock-patch with ladder.",
        campsite: "Plateau caves (free, basic — BYO mat + sleeping bag)",
        meals: "Local kothara (small dhabas) on plateau serve dal-rice + thali",
        water: "Plateau wells + Saptatirtha Pushkarni tank (treat)",
      },
      {
        day: 2, title: "Plateau → Tolar Khind → Khireshwar exit",
        distance_km: 7, altitude_m: 700, hours: 5, terrain: "rock-patch descent",
        description: "Wake for sunrise at Konkan Kada, then descend via the Tolar Khind route — includes the famous 30ft rock-patch with iron ladder. Continue through forest to Khireshwar village. Bus to Khubi Phata then Mumbai/Pune.",
        campsite: "—",
        meals: "Khireshwar tea stall",
        water: "Plateau refill before descent",
      },
    ],
    trail_points: [
      { name: "Pachnai trailhead", lat: 19.4133, lng: 73.7669, altitude_m: 750 },
      { name: "Plateau gate", lat: 19.3997, lng: 73.7783, altitude_m: 1300 },
      { name: "Kedareshwar cave temple", lat: 19.3922, lng: 73.7811, altitude_m: 1380 },
      { name: "Konkan Kada cliff", lat: 19.3839, lng: 73.7686, altitude_m: 1380 },
      { name: "Tolar Khind rock-patch", lat: 19.3825, lng: 73.7497, altitude_m: 950 },
      { name: "Khireshwar village", lat: 19.3742, lng: 73.7281, altitude_m: 700 },
    ],
    gear_essentials: [
      "Sleeping bag + mat — caves are stone floors, no bedding",
      "Headtorch + spare batteries (no electricity on plateau)",
      "Sturdy shoes with rock grip — Tolar Khind has 30ft technical descent",
      "Rope/sling for Tolar Khind rock-patch (optional, helpful in monsoon)",
      "2L water minimum + purification tabs",
      "First aid — small cuts common on rock sections",
      "Gloves — iron ladder + rock holds",
    ],
    campsites: [
      { name: "Plateau caves (free)", altitude_m: 1380, facilities: "Stone overhang shelter, BYO everything. Saptatirtha tank water 200m away.", water: true, flat_ground: true },
    ],
    cost_estimate: {
      budget: 1500, with_guide: 3000, with_operator: 5000,
      note: "Per-person 2-day trek incl. Mumbai/Pune transport + plateau food + tent rental optional. Operator = guided weekend tour (Bhraman, Outdoor Adventure).",
    },
    how_to_reach: "Mumbai → Khubi Phata (4.5hr by car, 175km via Kalyan-Murbad-Malshej Ghat). Pachnai is 12km from Khubi Phata. Pune → Khubi Phata (4hr, 165km).",
    permit_details: "No formal permit. Plateau is open to public; cave camping is free. Kedareshwar temple is a working shrine — respect customs.",
    water_sources: "Saptatirtha Pushkarni tank on the plateau (treat or boil). Pachnai trailhead has hand-pump. Khireshwar village has piped water.",
    network_coverage: "Airtel + Vodafone at Pachnai/Khireshwar trailheads. NO signal on the plateau — emergency calls require descending 30 min.",
    nearest_hospital: "Junnar Civil Hospital (50km, 2hr). Mumbai/Pune for serious cases.",
    emergency_contacts: "Junnar Police +91-2132-272233 · Khubi Phata BSNL Tower (emergency landline) · Pachnai Forest Post +91-9XXXXXXXXX (verify locally)",
    source_url: "https://www.maharashtratourism.gov.in/discover-maharashtra/forts/harishchandragad",
  },
  {
    id: "mullayyanagiri-trek",
    day_by_day: [
      {
        day: 1, title: "Sarpadhari trailhead → Mullayyanagiri summit → return",
        distance_km: 8, altitude_m: 1930, hours: 4, terrain: "stepped + ridge walk",
        description: "Karnataka's highest peak in the Baba Budangiri range. Park at Sarpadhari (15km from Chikmagalur). Trail begins with 200 stone steps then opens onto a ridge — Mullayyanagiri ridge is one of the Western Ghats' most exposed grass-shola landscapes. Reach the summit (Mullappa Swamy temple at the top — small shrine) in 2hr. Views span coffee estates, the Bhadra Wildlife Sanctuary, and on clear winter mornings, the Arabian Sea horizon. Descend to Sarpadhari in 1.5hr. There's also a paved road to within 200m of the summit if you want to drive most of the way and walk the final stretch.",
        campsite: "—",
        meals: "Chikmagalur cafe-restaurant lunch post-trek (try Brahmin's Coffee Bar or Town Canteen)",
        water: "Carry 1.5L; ridge has no source",
      },
    ],
    trail_points: [
      { name: "Sarpadhari trailhead + parking", lat: 13.3892, lng: 75.7544, altitude_m: 1500 },
      { name: "200-step section start", lat: 13.3886, lng: 75.7517, altitude_m: 1620 },
      { name: "Ridge gate", lat: 13.3878, lng: 75.7497, altitude_m: 1750 },
      { name: "Mullayyanagiri summit + Mullappa Swamy temple", lat: 13.3833, lng: 75.7458, altitude_m: 1930 },
    ],
    gear_essentials: [
      "Sturdy shoes — ridge has loose stone + grass; muddy in post-monsoon",
      "Cap + sunscreen — exposed grass-shola from the ridge gate onwards",
      "1.5L water; 2L in pre-monsoon",
      "Light fleece — summit can drop to 12-15°C in winter dawn",
      "Camera with telephoto — Bhadra Sanctuary deer often visible from ridge",
      "Cash for parking ₹100",
    ],
    campsites: [],
    cost_estimate: {
      budget: 800, with_guide: 1800, with_operator: 3500,
      note: "Per-person day trek incl. Chikmagalur taxi + parking + cafe meal. Operator = guided weekend tour from Bangalore.",
    },
    how_to_reach: "Bangalore → Chikmagalur (245km, 5hr). Mangalore → Chikmagalur (155km, 4hr). From Chikmagalur, taxi to Sarpadhari trailhead (15km, 30min). Hassan railhead (HAS) is 56km from Chikmagalur.",
    permit_details: "No formal permit. Forest-department entry ₹100/person + parking ₹100 at Sarpadhari (when manned, usually 7am–6pm).",
    water_sources: "Sarpadhari has a tap; treat or carry from Chikmagalur. NO water on ridge — no streams, no taps.",
    network_coverage: "Airtel + Jio at Sarpadhari + most of the trail. Summit has spotty coverage. Emergency calls usually connect.",
    nearest_hospital: "Chikmagalur Government Hospital (15km, 30min). MIMS Mangalore for serious cases (155km).",
    emergency_contacts: "Chikmagalur Police +91-8262-234100 · Sarpadhari Forest Post +91-9XXXXXXXXX (verify) · Karnataka Tourism +91-80-43344334",
    source_url: "https://karnatakatourism.org/tour-item/mullayanagiri/",
  },
  {
    id: "chembra-peak-trek",
    day_by_day: [
      {
        day: 1, title: "Meppadi forest gate → Heart Lake → Chembra Peak → return",
        distance_km: 10, altitude_m: 2100, hours: 6, terrain: "forest path + grass-shola + rock summit push",
        description: "Wayanad's most photographed trek. Permit at Meppadi forest office (mandatory, ₹750/group of 10 + guide fee). Forest dept allows only 200 trekkers/day, only Sat-Sun-Mon (closed Tue-Fri for forest recovery). Trail climbs through coffee + cardamom plantations, then opens to grasslands. Heart-shaped Hridayasaras Lake (1,950m) is the famous photo stop — locals say it never dries. Final 600m to summit is steep grass + rock. Descend to forest gate by 4pm before gate closure.",
        campsite: "—",
        meals: "Meppadi village cafe lunch post-trek; many homestays nearby",
        water: "Forest gate has piped water; carry 2L from there",
      },
    ],
    trail_points: [
      { name: "Meppadi forest gate", lat: 11.5325, lng: 76.1456, altitude_m: 850 },
      { name: "First clearing", lat: 11.5286, lng: 76.1547, altitude_m: 1300 },
      { name: "Heart Lake (Hridayasaras)", lat: 11.5219, lng: 76.1639, altitude_m: 1950 },
      { name: "Chembra Peak summit", lat: 11.5167, lng: 76.1714, altitude_m: 2100 },
    ],
    gear_essentials: [
      "Forest dept permit (book day-of at Meppadi office; cap is 200/day, weekend slots fill by 9am)",
      "Sturdy shoes with grip — final summit push is exposed grass on steep slope",
      "Cap + sunscreen — grass-shola has zero shade past the Heart Lake",
      "2L water minimum; trail has no source past the forest gate",
      "Light rain jacket — Wayanad gets quick squalls Oct-Nov",
      "Snacks; no food on trail",
      "Cash for permit (₹750 group + ₹100/person camera fee + guide tip)",
    ],
    campsites: [],
    cost_estimate: {
      budget: 1500, with_guide: 3000, with_operator: 4500,
      note: "Per-person day trek incl. forest permit + Bangalore/Kochi → Meppadi taxi share + post-trek lunch. Closed monsoon Jul-Sep.",
    },
    how_to_reach: "Bangalore → Meppadi (290km, 7hr via Mysore). Kozhikode (CCJ) airport → Meppadi (90km, 2.5hr). From Meppadi village, forest gate is 4km up by jeep.",
    permit_details: "Forest dept permit MANDATORY — book at Meppadi range office (8:30am–10:30am same day; first-come-first-served, 200 trekkers/day cap). Closed Tue–Fri (forest recovery). Camera ₹100 extra. Group leader ID required.",
    water_sources: "Meppadi forest gate has piped water (treat). Heart Lake water is NOT for drinking (sacred status, traditional ban). Trail has no other source — carry 2L from forest gate.",
    network_coverage: "Idea + Jio at Meppadi village + first 30 min of trail. Patchy past the first clearing. No signal at Heart Lake or summit.",
    nearest_hospital: "Meppadi PHC (4km from forest gate). Sulthan Bathery Hospital (45km, 1.5hr) for serious cases. Kozhikode Medical College (90km) for evacuation.",
    emergency_contacts: "Meppadi Forest Range +91-4936-282800 · Wayanad DM +91-4936-202251 · Sulthan Bathery Police +91-4936-220333",
    source_url: "https://www.keralatourism.org/destination/chembra-peak/322",
  },
];

// Common defaults for every record (matches existing schema)
const DEFAULTS = {
  permits_required: true,
  warnings: [],
};

const TREK_HEADERS = {
  "sandakphu-approach": {
    name: "Sandakphu Approach Trek",
    destination_id: "darjeeling",
    difficulty: "moderate", duration_days: 5, max_altitude_m: 3636, distance_km: 51,
    best_months: [4, 5, 10, 11], permits_required: true, kids_suitable: false, min_age: 14,
    fitness_level: "moderate",
    description: "Highest viewpoint in West Bengal. Walk the India-Nepal border ridge through Singalila NP — and on a clear morning, see four of the world's five tallest peaks (Everest, Lhotse, Makalu, Kanchenjunga). Cobbled trail, teahouse-style accommodation, lower-altitude than most Himalayan crossings — accessible to first-time trekkers with a moderate fitness baseline.",
    highlights: [
      "Sleeping-Buddha view of Kanchenjunga's 5 peaks",
      "4 of world's 5 highest mountains visible from Sandakphu summit",
      "Teahouse-style trail (no camping required)",
      "India-Nepal border ridge walk through Singalila NP",
      "Magnolia + rhododendron forests in April-May bloom",
    ],
    warnings: [
      "Singalila NP permit + ID check at multiple points; foreign passports need ILP",
      "Bikheybhanjyang to Sandakphu summit-day climbs 1,000m — fitness gate",
      "Teahouse rooms unheated; Sandakphu drops to -10°C Dec-Jan",
    ],
  },
  "kalsubai-peak-trek": {
    name: "Kalsubai Peak Trek",
    destination_id: "bhandardara",
    difficulty: "moderate", duration_days: 1, max_altitude_m: 1646, distance_km: 6,
    best_months: [8, 9, 10, 11, 12, 1, 2, 3], permits_required: false, kids_suitable: true, min_age: 12,
    fitness_level: "moderate",
    description: "Maharashtra's highest peak. A weekend favourite from Mumbai/Pune — 6km round-trip from Bari village with four sets of iron ladders bolted into the rock face for the upper sections. Pre-dawn start to catch sunrise from the summit + the Bhandardara reservoir glimmering below. Monsoon turns the slopes emerald and the waterfalls run; Nov-Feb gives clearer views.",
    highlights: [
      "Maharashtra's highest peak (1,646m)",
      "Iron ladders for the technical summit push — adds adventure without real exposure",
      "Sunrise view of Bhandardara reservoir + Sahyadri ridges",
      "Doable as a single-day trip from Mumbai or Pune",
      "Monsoon waterfalls (Aug-Oct) at every bend",
    ],
    warnings: [
      "Iron ladders slippery in monsoon — gloves recommended",
      "No water on the climb; carry 1.5L minimum, 3L in summer",
      "Pre-dawn start mandatory in summer to beat the heat",
    ],
  },
  "harishchandragad-trek": {
    name: "Harishchandragad Trek (Konkan Kada)",
    destination_id: "igatpuri",
    difficulty: "hard", duration_days: 2, max_altitude_m: 1424, distance_km: 19,
    best_months: [10, 11, 12, 1, 2, 3], permits_required: false, kids_suitable: false, min_age: 16,
    fitness_level: "hard",
    description: "Iconic Sahyadri overnight. Climb to the plateau via Pachnai (easiest), camp in stone caves, watch sunset from the U-shaped Konkan Kada cliff dropping 350m to the Konkan plain. Day 2 descends via the Tolar Khind rock-patch with iron ladder. Kedareshwar cave-temple (5ft Shiva linga submerged in water) is a side-stop. Real overnight wilderness 4hr from Mumbai.",
    highlights: [
      "Konkan Kada — U-shaped overhanging cliff, one of the Sahyadris' most photographed sites",
      "Kedareshwar cave temple — water-submerged Shiva linga",
      "Plateau cave camping (stone shelters, BYO mat)",
      "Tolar Khind rock-patch with 30ft iron ladder descent",
      "Star-visibility on the plateau is exceptional (no light pollution)",
    ],
    warnings: [
      "Tolar Khind rock-patch is technical — solo first-timers should hire a guide or take the easier Pachnai loop both ways",
      "Plateau caves are stone floors only — bring sleeping bag + mat",
      "No mobile signal on plateau; emergency descent is 30+ min",
      "Avoid in monsoon — Tolar Khind ladder slick + plateau caves wet",
    ],
  },
  "mullayyanagiri-trek": {
    name: "Mullayyanagiri Trek",
    destination_id: "chikmagalur",
    difficulty: "easy", duration_days: 1, max_altitude_m: 1930, distance_km: 8,
    best_months: [9, 10, 11, 12, 1, 2], permits_required: false, kids_suitable: true, min_age: 10,
    fitness_level: "easy",
    description: "Karnataka's highest peak — 1,930m in the Baba Budangiri range above Chikmagalur. 200 stone steps lead to the ridge, then an exposed grass-shola walk to the Mullappa Swamy temple at the summit. On clear winter dawns, the Arabian Sea horizon is visible from the top. Easy enough for kids 10+; the paved road option (drive to within 200m of summit) makes it accessible for less-fit travellers too.",
    highlights: [
      "Karnataka's highest peak (1,930m)",
      "Mullappa Swamy summit shrine — small but atmospheric",
      "Grass-shola ridge walks unique to the Western Ghats",
      "Coffee estate panoramas + Bhadra Wildlife Sanctuary visible from ridge",
      "Family-friendly — short trek, paved-road option for less-fit travellers",
    ],
    warnings: [
      "No shade on the ridge — start early, finish before noon in summer",
      "No water on the ridge; carry 1.5–2L from Sarpadhari",
      "Weekend crowds Oct-Feb can make the summit congested",
    ],
  },
  "chembra-peak-trek": {
    name: "Chembra Peak Trek (Heart Lake)",
    destination_id: "wayanad",
    difficulty: "moderate", duration_days: 1, max_altitude_m: 2100, distance_km: 10,
    best_months: [10, 11, 12, 1, 2, 3, 4], permits_required: true, kids_suitable: true, min_age: 12,
    fitness_level: "moderate",
    description: "Wayanad's signature trek. Forest dept gates the trail — only 200 trekkers per day, only Sat-Sun-Mon (closed Tue-Fri for forest recovery), permit required at Meppadi range office. The famous heart-shaped Hridayasaras Lake at 1,950m is the iconic photo stop; locals say it never dries. Final summit push to 2,100m is exposed grass-shola — short but steep. Closed Jul-Sep for monsoon.",
    highlights: [
      "Heart-shaped Hridayasaras Lake — Kerala's most-photographed alpine feature",
      "Forest-managed trail (200 trekkers/day cap = preserved experience)",
      "Grass-shola ridge with Western Ghats biodiversity",
      "Coffee + cardamom plantations on the approach",
      "Reachable from Bangalore as weekend with overnight in Wayanad homestay",
    ],
    warnings: [
      "Permit cap (200/day) fills by 9am on weekends — be at Meppadi forest office by 7:30am",
      "Closed Tue-Fri (forest recovery rotation) and Jul-Sep (monsoon)",
      "Heart Lake water is NOT for drinking (sacred + traditional ban)",
      "Final summit grass-slope is steep + exposed — no shade, no water",
    ],
  },
};

const FULL_TREKS = TREKS.map((t) => ({
  id: t.id,
  ...TREK_HEADERS[t.id],
  ...DEFAULTS,
  ...TREK_HEADERS[t.id], // override defaults
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
  console.log("→ Backfilling 5 marquee thin treks…");
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
  console.log(`\nDone. ${ok}/${FULL_TREKS.length} treks shipped.\n`);
  console.log("Verify:");
  console.log("  curl https://www.nakshiq.com/en/treks/sandakphu-approach | grep 'Kanchenjunga'");
  console.log("  curl https://www.nakshiq.com/en/treks/kalsubai-peak-trek | grep 'iron ladder'");
})();
