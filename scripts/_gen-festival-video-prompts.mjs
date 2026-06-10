#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_gen-festival-video-prompts.mjs
//
// Generates a per-festival AI-video-prompt spreadsheet for the 331 festivals
// surfaced at /festivals/[slug]. Strict fabrication guardrails: every prompt
// is LOCATION-ONLY B-roll (the place at the festival's time of year), never
// the ritual/people/attire — those vary by sect, region, and year and AI
// video models cannot render them accurately without poisoning NakshIQ's
// "no fabrication" brand.
//
// Output: data/festivals/video-prompts.csv
//   One row per festival. Columns documented in README inside data/festivals/.
//
// Zero LLM. Pure DB read + templating using:
//   - destination terrain (type + elevation + state) → visual baseline
//   - festival month → light + weather mood
//   - festival-name keyword scan → subject specificity (kite/bird/camel/...)
//   - region anchor (desert/coast/himalaya/temple-town/...)
//
// Each prompt is paired with:
//   - negative_prompt: fabrication-blocking exclusions
//   - reference_image_url: the destination JPG (use as image-to-video anchor)
//   - aspect_ratio + duration: defaults that match the festival-page hero slot
//
// Usage:
//   node scripts/_gen-festival-video-prompts.mjs

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT, loadEnv, getSupabase, fetchAll } from "./_vs-lib.mjs";

await loadEnv();

const OUT_DIR = path.join(ROOT, "data", "festivals");
const OUT_PATH = path.join(OUT_DIR, "video-prompts.csv");

// ─── Reference data ────────────────────────────────────────────────────────

const MONTH_NAMES = ["", "January","February","March","April","May","June","July","August","September","October","November","December"];

// Light + weather mood by month (IST seasons). Drives the time-of-day +
// atmospheric cue the prompt asks for.
const MONTH_MOOD = {
  1:  { tod: "blue hour pre-dawn",     weather: "winter clarity, low-angle sun, mist on rivers and lakes",            palette: "cool blue + warm tungsten contrast" },
  2:  { tod: "early golden hour",      weather: "late-winter clarity, crisp light, dry air",                            palette: "warm amber + cold shadow" },
  3:  { tod: "afternoon to dusk",      weather: "pre-summer warmth, dust in the air, soft hazy light",                  palette: "warm earth tones, ochre" },
  4:  { tod: "evening golden hour",    weather: "pre-monsoon heat, light softening at dusk, dramatic cloud build-up",   palette: "saturated warm orange" },
  5:  { tod: "post-sunset twilight",   weather: "summer haze, heat shimmer over dry ground, warm tungsten dusk",        palette: "burnt orange + deep blue" },
  6:  { tod: "overcast midday",        weather: "early monsoon — cumulus clouds, intermittent rain breaks, fresh greens", palette: "cool grey-green + saturated blue" },
  7:  { tod: "post-rain twilight",     weather: "deep monsoon — saturated greens, wet roads reflecting light, low cloud", palette: "deep emerald + slate" },
  8:  { tod: "late morning shaft-light", weather: "monsoon green, valley mist, sun shafts breaking through cloud",        palette: "lush green + silver mist" },
  9:  { tod: "afternoon clearing",     weather: "post-monsoon — lush green, crisp clarity, distant cumulus",             palette: "vibrant greens + cobalt sky" },
  10: { tod: "evening golden hour",    weather: "autumn warmth, returning dust, soft sunset glow",                       palette: "warm gold + violet sky" },
  11: { tod: "early morning",          weather: "early winter — crystalline cold light, cool blue mornings",             palette: "icy cyan + warm low sun" },
  12: { tod: "blue hour + lantern light", weather: "deep winter — frost, low mist, blue hour dominance",                   palette: "deep blue + amber pinpoints" },
};

// State-level terrain anchor (overrides destination.type when more specific).
const STATE_ANCHOR = {
  "rajasthan":          "Thar desert dunes, fort silhouettes, ochre stone",
  "gujarat":            "salt flats, Arabian Sea coast, white limestone",
  "ladakh":             "high-altitude desert, ochre ridges, glaciated peaks",
  "jammu-kashmir":      "alpine meadows, deodar forests, lake reflections",
  "himachal-pradesh":   "Himalayan ridges, deodar slopes, prayer-flag-empty (no flags) ridgelines",
  "uttarakhand":        "Himalayan foothills, oak + rhododendron forest, river valleys",
  "sikkim":             "cloud forests, terraced ridges, Kanchenjunga distant peaks",
  "arunachal-pradesh":  "deep cloud forest, mist-shrouded valleys, river gorges",
  "meghalaya":          "limestone karst, monsoon green, root-bridge gorges (empty)",
  "assam":              "Brahmaputra river plains, tea-garden geometry, low mist",
  "nagaland":           "hill villages on ridges, terraced fields, fog drifts",
  "manipur":            "Loktak floating phumdis, valley mist, distant ridges",
  "tripura":            "lateritic plateaus, betel-nut groves, low light",
  "mizoram":            "ridgeline towns, dense forest, monsoon clouds",
  "west-bengal":        "Bengal delta, mangrove waterways, jute-field horizons",
  "odisha":             "Chilika lagoon, coastal dunes, eastern beach sunrise",
  "andhra-pradesh":     "Deccan plateau, granite outcrops, dry scrub",
  "telangana":          "boulder-strewn Deccan, baoli stepwells, granite hills",
  "karnataka":          "Western Ghats canopy, Hampi boulders, coastal lagoons",
  "kerala":             "backwater canals, coconut palm rows, monsoon-wet stone",
  "tamil-nadu":         "Coromandel coast, granite temple towers (exterior only), dry scrub",
  "puducherry":         "French-quarter colonnades, Bay-of-Bengal shoreline",
  "goa":                "Konkan coast, laterite cliffs, palm-fringed beach",
  "maharashtra":        "Western Ghats plateau, fort silhouettes, monsoon waterfalls",
  "madhya-pradesh":     "Vindhya plateau, sandstone outcrops, sal forest",
  "chhattisgarh":       "Bastar sal forest, red-earth tribal villages (no figures), waterfalls",
  "jharkhand":          "Chotanagpur plateau, sal forest, tribal-belt landscapes (empty)",
  "bihar":              "Ganges plains, ancient mound sites, river-mist mornings",
  "uttar-pradesh":      "Ganga + Yamuna plains, ghats (water-and-stone, no figures), mustard fields",
  "punjab":             "Punjab plains, mustard-yellow fields, geometric canal grid",
  "haryana":            "Aravalli foothills, dry-scrub plateau, monsoon-green fields",
  "delhi":              "Mughal-era stone architecture (exterior wide shots), Yamuna riverbank",
  "chandigarh":         "Le-Corbusier geometric architecture, Shivalik foothill backdrop",
  "andaman-nicobar":    "tropical island coastline, reef shallows, coconut canopy",
  "lakshadweep":        "Arabian Sea atolls, white-sand sandbar shallows",
};

// Festival-name keyword → subject specificity. Match first in priority order;
// fall through to terrain default if nothing matches.
// IMPORTANT: subjects do NOT pre-bake time-of-day terms — those come from the
// month-mood layer. Subjects only describe SHAPE (what's in frame), not light.
//
// HUMAN-VENUE EXCLUSION (2026-06-09): subjects must describe a PLACE (terrain,
// architecture, water), never a human-activity venue. Veo/AI-video models cannot
// honour negation — "empty fairground … no crowds" reliably renders the crowd
// (the words tents/flags/market/workshop prime the gathering, and "no crowds"
// names the very concept it's trying to suppress). Verified live 2026-06-09:
// fair/mela subjects rendered crowds on prashar-mela, mitthe-urs-fair, nagdwari-mela.
// So "carnival|mela|fair", "food|cuisine", "craft|weave|…", and "tribal|adivasi"
// keyword rules were REMOVED — those festivals now fall through to the terrain
// default (or a later place-based keyword like temple/river/lake), which is the
// LOCATION-ONLY B-roll this generator was always meant to produce (see header).
// Keep this list place-only: a subject is safe when its core noun is a landscape
// or structure that is inherently figure-free (a river, ridge, temple exterior,
// empty beach, lantern-lit boats — the boat subject verified clean same run).
const FESTIVAL_KEYWORDS = [
  { rx: /\b(kite|uttarayan|patang)\b/i,                  subject: "wide-angle empty sky with high cumulus and distant kite silhouettes (specks, no closeup)" },
  { rx: /\b(bird|flamingo|migratory)\b/i,                 subject: "wetland reflections, water birds at distance in flight, reed-bed foreground" },
  { rx: /\bcamel\b/i,                                     subject: "Thar desert dunes, distant camel silhouettes against the horizon (no riders, no closeup)" },
  { rx: /\b(snow|winter sports|ski).*(auli|kufri|kullu|gulmarg|tawang)\b/i, subject: "snow-covered slopes, fresh powder texture, low-angle light raking the ridge" },
  { rx: /\b(lit fest|literature|literary)\b/i,             subject: "Mughal-era palace courtyard exterior, light filtering through stone arches, empty stone benches" },
  { rx: /\b(boat|float|teppa|jal vihar)\b/i,               subject: "still water surface ripples, distant lantern-lit boats, no occupants visible" },  { rx: /\b(dance|music festival|sangeet)\b/i,             subject: "ancient stone amphitheater steps, distant lights, no performers in frame" },  { rx: /\b(monastery|gompa|hemis|losar|saga dawa)\b/i,    subject: "monastery exterior wide shot at altitude, empty courtyard, no flags or figures visible, light on stone" },  { rx: /\b(tulip|flower|bloom|garden)\b/i,                subject: "vast flower-bed geometric rows, slow drift through colour fields, no people" },
  { rx: /\b(river|ganga|yamuna|brahmaputra|godavari|kaveri|narmada)\b/i, subject: "river current detail, ghats (architecture only, no figures), low mist on water" },
  { rx: /\b(temple|jagannath|kapaat|kapat|opening|kumbh|sangam)\b/i, subject: "temple-town exterior wide shot — sandstone or granite architecture, no figures, no idols visible" },
  { rx: /\b(wildlife|safari|elephant|tiger)\b/i,            subject: "forest canopy from above, dust trails on a logging road, no animals or vehicles visible" },  { rx: /\b(bonfire|lohri|bhogi|sankranti)\b/i,             subject: "empty harvest field, distant glow from small communal fires (low + small, no figures)" },
  { rx: /\b(harvest|baisakhi|onam|pongal)\b/i,              subject: "ripening fields wide shot, no harvesters visible, distant grain stacks" },
  { rx: /\b(yatra|pilgrimage|parikrama|route|kapaat|opening)\b/i, subject: "long mountain road or trail receding into distance, no pilgrims visible" },
  { rx: /\b(beach|coast|sea)\b/i,                          subject: "empty beach at low tide, footprint-free sand, distant horizon, soft surf" },
  { rx: /\b(lake|sarovar|tal|pushkar)\b/i,                 subject: "still lake, reflection of surrounding terrain, no boats or figures" },
  { rx: /\b(desert|rann|thar)\b/i,                          subject: "salt flats or dunes, geometric horizon line, no figures" },
  { rx: /\b(island)\b/i,                                    subject: "tropical shoreline aerial, reef shallows, coconut canopy edge" },
  { rx: /\b(spring|holi|basant)\b/i,                        subject: "open meadow with early-bloom wildflowers, no people" },
  { rx: /\b(diwali|deepavali|deepawali|lantern|deepak)\b/i, subject: "architecture exterior with distant warm pinpoint lights, no figures" },
  { rx: /\b(badri|kedar|hemkund|nanda devi|tungnath|gangotri|yamunotri)\b/i, subject: "Himalayan stone-built shrine exterior wide shot, glacial river in foreground, no figures, no signage" },
  { rx: /\b(rath yatra|chariot)\b/i,                        subject: "wide-shot of empty stone-paved processional avenue, ancient gopuram exteriors, no chariot or figures" },
];

// Known high-search festivals — bump to priority A. Conservative list,
// based on widely-known events; tune after GSC data lands.
const HIGH_PRIORITY = new Set([
  "Pushkar Camel Fair", "Jaipur Literature Festival", "International Kite Festival (Uttarayan)",
  "Magh Mela", "Kumbh Mela", "Maha Shivaratri", "Holi", "Diwali", "Dev Diwali",
  "Hemis Festival", "Tulip Festival", "Onam", "Pongal", "Kutch Mahotsav",
  "Goa Carnival", "Sunburn Festival", "Pushkar Fair", "Bikaner Camel Festival",
  "Mamallapuram Dance Festival", "Hornbill Festival", "Ziro Music Festival",
  "Saga Dawa", "Losar (Tibetan New Year)", "Lohri", "Makar Sankranti",
  "Float Festival (Teppam)", "Rath Yatra", "Durga Puja", "Navratri",
  "Pang Lhabsol", "Hampi Utsav", "Kullu Dussehra", "Mysore Dasara",
  // Char Dham + Uttarakhand pilgrimage anchors (high search around April-May)
  "Badri-Kedar Festival", "Tungnath Temple Opening", "Nanda Devi Raj Jat Yatra",
  "Gangotri Yamunotri Yatra", "Hemkund Sahib Opening",
  // Other high-search anchors
  "Ganga Aarti at Har Ki Pauri (Kumbh legacy)", "Magh Mela (Jaunsar)",
  "Auli Winter Carnival", "Kufri Winter Sports Festival", "Kullu Winter Carnival",
]);

// City-specific terrain anchor — overrides the state-level anchor when the
// city's actual character differs from the state's representative landscape
// (e.g., Bhubaneswar's Lingaraj precinct is not Chilika lagoon; Delhi's
// Mughal stone is not the Yamuna riverbank for most festivals).
const CITY_ANCHOR = {
  "bhubaneswar":   "ancient sandstone temple precincts (exteriors only), dry winter morning haze, sal-tree edges",
  "puri":          "Bay of Bengal beach, sandstone temple gopurams (exterior), shore-side dunes",
  "konark":        "Sun Temple ruins exterior in wide shot, ochre stone, dune-grass foreground",
  "varanasi":      "Ganga ghats from across the river, stone-and-water composition, no figures, low mist",
  "haridwar":      "Ganga current at the foothills, stone ghats (no figures), Himalayan haze",
  "rishikesh":     "Ganga rapids and pebble-shore wide shot, suspension-bridge silhouette, no figures",
  "ujjain":        "Shipra riverbank stone steps, ancient temple skyline at distance, no figures",
  "prayagraj":     "Triveni sangam confluence wide aerial, sandbar geometry, no figures",
  "ahmedabad":     "old-city pol architecture, geometric stepwell shadows, dry winter morning",
  "kolkata":       "Hooghly riverbank colonial-era architecture (exterior), ferry wake, no figures",
  "chennai":       "Marina beach wide shot at first light, distant horizon, no figures",
  "mumbai":        "Marine Drive curve at first light, monsoon-wet stone or dry dust depending on month",
  "jaipur":        "Hawa Mahal + Amber Fort exteriors wide, ochre-pink stone, dry winter clarity",
  "udaipur":       "Lake Pichola at first light, palace silhouettes, no boats or figures",
  "jodhpur":       "blue-painted old city wide aerial, Mehrangarh fort silhouette",
  "delhi":         "Lodhi Garden tombs (exterior wide), winter mist, no figures",
  "mysuru":        "Mysore Palace exterior wide shot, gardens, no figures",
  "madurai":       "Meenakshi temple gopurams (exterior only, no idols), surrounding streets at low light",
  "thanjavur":     "Brihadeeswarar temple exterior wide shot, courtyard geometry, no figures",
  "amritsar":      "old-city laneways at first light, distant temple silhouette (architecture only)",
  "bekal":         "Bekal Fort wave-washed laterite ramparts, distant Arabian Sea, no figures",
  "joshimath":     "Joshimath ridge view with Auli meadows in middle distance, snow-tipped peaks behind",
  "auli":          "Auli ski-slope meadows in season-appropriate state (snow Jan-Mar, green May-Sep)",
  "munnar":        "Munnar tea-garden geometric terraces, monsoon mist or winter clarity",
  "ooty":          "Nilgiri tea-garden ridges, eucalyptus stands, cloud-shadow play",
  "hampi":         "Tungabhadra boulder field, ruined temple gopurams exterior, no figures",
  "khajuraho":     "Khajuraho temple complex exterior wide shot — distant compositional shot only (no detail of carvings), dawn light, no figures",
};

// Rain-shadow override: these regions are NOT monsoonal even in Jun-Sep.
// Standard MONTH_MOOD is wrong for them. Override returns a different mood.
const RAIN_SHADOW = new Set(["ladakh", "spiti", "lahaul-spiti"]);
const RAIN_SHADOW_DESTS = new Set([
  "leh", "nubra", "pangong-tso", "tso-moriri", "kargil", "zanskar",
  "kaza", "tabo", "kibber", "komic", "hikkim", "langza", "spiti-valley",
]);

function moodFor(month, destinationId, stateId, elevationM) {
  if (RAIN_SHADOW.has(stateId) || RAIN_SHADOW_DESTS.has(destinationId)) {
    if (month >= 6 && month <= 9) {
      return { tod: "morning light on the ridge", weather: "high-altitude summer — clear cold air, sharp shadows, no monsoon (rain-shadow region)", palette: "ochre + deep blue sky + ice-white peaks" };
    }
    if (month >= 11 || month <= 2) {
      return { tod: "blue hour pre-dawn", weather: "deep winter at altitude — frozen rivers, snow on ridges, harsh cold light", palette: "icy blue + warm low sun pinpoints" };
    }
  }
  // Himalayan / Western-Ghat hill stations (>= 1500m) have a different
  // seasonal feel than the plains: April-June isn't "heat shimmer", it's
  // alpine spring; Oct-Nov is crystalline clarity not plains haze.
  if (elevationM != null && elevationM >= 1500) {
    if (month >= 4 && month <= 6) {
      return { tod: "early morning", weather: "alpine spring — clear cold air, snow-melt streams, distant high-altitude peaks", palette: "snow-white + emerald + cobalt sky" };
    }
    if (month === 7 || month === 8 || month === 9) {
      return { tod: "afternoon shaft-light", weather: "monsoon in the hills — mist drifts through deodar forest, sun shafts breaking cloud, wet stone glistens", palette: "saturated emerald + silver mist" };
    }
    if (month === 10 || month === 11) {
      return { tod: "morning golden hour", weather: "post-monsoon clarity at altitude — crystalline cold air, autumn-tinged forest, distant snow", palette: "warm amber + cool cobalt" };
    }
    if (month === 12 || month === 1 || month === 2) {
      return { tod: "blue hour", weather: "deep winter in the hills — snow on ridges, frozen streams, low sun raking the slope", palette: "icy blue + warm tungsten pinpoints" };
    }
  }
  return MONTH_MOOD[month] ?? MONTH_MOOD[6];
}

// ─── Terrain inference from destination row ────────────────────────────────

function inferTerrain(d) {
  // destinations.type is text[] — flatten to a single lowercase string for matching.
  const t = (Array.isArray(d?.type) ? d.type.join(" ") : (d?.type ?? "")).toLowerCase();
  const elev = d?.elevation_m ?? 0;
  const stateId = (d?.state_id ?? "").toLowerCase();
  const destId = (d?.id ?? "").toLowerCase();
  // City-specific override wins over the state anchor (state anchor can be
  // misleading for cities whose character diverges from the state baseline).
  if (CITY_ANCHOR[destId]) return { region: CITY_ANCHOR[destId], stateId };
  // State anchor next
  if (STATE_ANCHOR[stateId]) return { region: STATE_ANCHOR[stateId], stateId };
  // Then fall back to type/elevation
  if (elev >= 3500) return { region: "high-altitude cold desert, glaciated peaks, ochre ridges", stateId };
  if (elev >= 1500) return { region: "Himalayan foothills, oak + deodar slopes, distant snow peaks", stateId };
  if (t.includes("beach") || t.includes("coast")) return { region: "tropical coastline, palm-fringed shore, reef shallows", stateId };
  if (t.includes("forest") || t.includes("wildlife") || t.includes("national-park")) return { region: "dense forest canopy from above, river crossings, dust trails", stateId };
  if (t.includes("desert")) return { region: "desert dunes, salt flats, geometric horizon", stateId };
  if (t.includes("temple") || t.includes("religious") || t.includes("pilgrim")) return { region: "ancient temple-town exterior (no idols visible), stone-and-water composition", stateId };
  if (t.includes("city") || t.includes("urban") || t.includes("metro")) return { region: "city skyline wide shot, river or coast adjacency, dawn or dusk light", stateId };
  if (t.includes("lake")) return { region: "lake surface reflections, surrounding terrain, no boats or figures", stateId };
  return { region: "Indian subcontinental landscape — vegetation and architecture appropriate to the region, no figures", stateId };
}

// ─── Subject inference from festival name ──────────────────────────────────

function inferSubject(festivalName, terrain) {
  for (const kw of FESTIVAL_KEYWORDS) {
    if (kw.rx.test(festivalName)) return kw.subject;
  }
  return `${terrain.region} establishing wide shot — no figures, no signage with text`;
}

// ─── Shot type by terrain ──────────────────────────────────────────────────

function pickShotType(terrainRegionLower) {
  if (/desert|salt flat|dune/.test(terrainRegionLower))       return "slow drone push-in along the horizon line";
  if (/lake|river|backwater|coast|reef/.test(terrainRegionLower)) return "static establishing with subtle water-surface parallax";
  if (/peak|ridge|himalaya|altitude|forest/.test(terrainRegionLower)) return "slow drone pull-back revealing the wider valley";
  if (/temple|palace|architecture|fort/.test(terrainRegionLower)) return "static establishing, slight push-in, no figures in frame";
  if (/field|harvest|meadow|wildflower/.test(terrainRegionLower)) return "low ground-level tracking through the foreground";
  if (/market|fairground|street/.test(terrainRegionLower))    return "wide static, then slow slow zoom-in";
  return "static establishing with subtle parallax";
}

// ─── Priority tier ─────────────────────────────────────────────────────────

function priority(festivalName) {
  if (HIGH_PRIORITY.has(festivalName)) return "A";
  for (const name of HIGH_PRIORITY) {
    if (festivalName.toLowerCase().includes(name.toLowerCase())) return "A";
  }
  // B for any festival whose host destination has known traffic (heuristic:
  // anything with a recognised pilgrimage / heritage / hill-station keyword)
  if (/\b(temple|monastery|pilgrim|heritage|hill|fort|palace|unesco)\b/i.test(festivalName)) return "B";
  return "C";
}

// ─── Prompt assembly ───────────────────────────────────────────────────────

const NEGATIVE_PROMPT = [
  "no people",
  "no human figures or silhouettes in foreground",
  "no religious figures, sadhus, priests, monks",
  "no specific religious attire (saffron robes, ceremonial clothing)",
  "no ritual objects (deities, idols, palanquins, ceremonial fire close-ups)",
  "no temple interiors or sanctum imagery",
  "no signage with readable text",
  "no on-screen graphics or overlays",
  "no synthetic / cartoony rendering",
  "no time-of-day mismatch (respect the requested mood)",
].join(", ");

function buildPrompt(f, d, terrain) {
  const mood = moodFor(f.month, (d?.id ?? "").toLowerCase(), (d?.state_id ?? "").toLowerCase(), d?.elevation_m ?? null);
  const subject = inferSubject(f.name, terrain);
  const shotType = pickShotType((terrain.region || "").toLowerCase());
  const monthName = MONTH_NAMES[f.month] ?? "";
  const destName = d?.name ?? f.destination_id;
  const stateName = (d?.state_id ?? "").replace(/-/g, " ");
  return [
    `Cinematic 16:9 establishing shot, 6-8 seconds.`,
    `Subject: ${subject}.`,
    `Location: ${destName}, ${stateName}, India (the host destination of the ${f.name} festival — do NOT render the festival itself, only the place at this time of year).`,
    `Time of day: ${mood.tod}.`,
    `Atmosphere: ${mood.weather}.`,
    `Colour palette: ${mood.palette}.`,
    `Shot type: ${shotType}.`,
    `Style: documentary register (BBC/National Geographic feel), naturalistic colour grading, soft contrast, slight film grain.`,
    `Composition: rule-of-thirds horizon, depth via foreground-midground-distance layering.`,
    `Reference month: ${monthName}.`,
  ].join(" ");
}

// ─── CSV escape ────────────────────────────────────────────────────────────

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function row(cols) {
  return cols.map(csvEscape).join(",");
}

// ─── Slug (same logic as lib/festival-slug.ts) ─────────────────────────────

function baseSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]+/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

function buildSlugMap(rows) {
  const baseToCount = new Map();
  for (const r of rows) {
    const b = baseSlug(r.name);
    baseToCount.set(b, (baseToCount.get(b) ?? 0) + 1);
  }
  const idToSlug = new Map();
  for (const r of rows) {
    const b = baseSlug(r.name);
    const slug = (baseToCount.get(b) ?? 1) > 1 && r.destination_id ? `${b}-${r.destination_id}` : b;
    idToSlug.set(r.id, slug);
  }
  return idToSlug;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const supabase = await getSupabase();
  console.log("[gen-festival-video-prompts] querying festivals + destinations …");
  const festivals = await fetchAll(
    supabase,
    "festivals",
    "id, destination_id, name, month, approximate_date, description, significance",
  );
  if (!festivals.length) {
    console.error("No festivals found.");
    process.exit(1);
  }
  console.log(`[gen-festival-video-prompts] ${festivals.length} festivals fetched`);

  // Fetch all needed destinations in one shot
  const destIds = Array.from(new Set(festivals.map((f) => f.destination_id).filter(Boolean)));
  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, state_id, type, elevation_m")
    .in("id", destIds);
  const destById = new Map((dests ?? []).map((d) => [d.id, d]));
  console.log(`[gen-festival-video-prompts] ${destById.size} unique host destinations`);

  const slugMap = buildSlugMap(festivals);

  const HEADER = [
    "priority_tier",
    "festival_id",
    "festival_slug",
    "festival_name",
    "destination_id",
    "destination_name",
    "state",
    "month_num",
    "month_name",
    "approximate_date",
    "terrain_anchor",
    "subject",
    "shot_type",
    "time_of_day",
    "atmosphere",
    "palette",
    "full_prompt",
    "negative_prompt",
    "reference_image_url",
    "destination_video_url",
    "page_url_en",
    "page_url_hi",
    "duration_seconds",
    "aspect_ratio",
    "notes",
  ];

  const lines = [row(HEADER)];
  const tierCounts = { A: 0, B: 0, C: 0 };
  const subjectFallthroughCount = { count: 0 };

  for (const f of festivals) {
    const d = destById.get(f.destination_id);
    const terrain = inferTerrain(d);
    const subject = inferSubject(f.name, terrain);
    if (!FESTIVAL_KEYWORDS.some((kw) => kw.rx.test(f.name))) {
      subjectFallthroughCount.count++;
    }
    const mood = moodFor(f.month, (d?.id ?? "").toLowerCase(), (d?.state_id ?? "").toLowerCase(), d?.elevation_m ?? null);
    const shotType = pickShotType((terrain.region || "").toLowerCase());
    const fullPrompt = buildPrompt(f, d, terrain);
    const tier = priority(f.name);
    tierCounts[tier]++;
    const slug = slugMap.get(f.id) ?? baseSlug(f.name);
    const monthName = MONTH_NAMES[f.month] ?? "";

    const refImg = f.destination_id
      ? `https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/${f.destination_id}.jpg`
      : "";
    const destVid = f.destination_id
      ? `https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev/${f.destination_id}.mp4`
      : "";

    // Notes column: per-festival safety reminders.
    const notes = [];
    if (/temple|kapaat|kapat|dwarka|kashi|varanasi|tirupati|jagannath/i.test(f.name)) {
      notes.push("Religious site — exterior only, no idol or sanctum imagery.");
    }
    if (/tribal|adivasi|bastar|toda|bhil|gond/i.test(f.name)) {
      notes.push("Tribal community — do NOT render figures or attire; landscape and structures only.");
    }
    if (/snow|himalaya|altitude|kedarnath|badrinath|hemkund/i.test(f.name)) {
      notes.push("High-altitude — respect actual seasonal access (some passes shut Oct-May).");
    }
    if (/monsoon|onam|kerala|goa|konkan/i.test(f.name) && f.month >= 6 && f.month <= 9) {
      notes.push("Monsoon month — saturated greens and wet textures, NOT dry-season look.");
    }

    lines.push(row([
      tier,
      f.id,
      slug,
      f.name,
      f.destination_id ?? "",
      d?.name ?? "",
      (d?.state_id ?? "").replace(/-/g, " "),
      f.month,
      monthName,
      f.approximate_date ?? "",
      terrain.region,
      subject,
      shotType,
      mood.tod,
      mood.weather,
      mood.palette,
      fullPrompt,
      NEGATIVE_PROMPT,
      refImg,
      destVid,
      `https://www.nakshiq.com/en/festivals/${slug}`,
      `https://www.nakshiq.com/hi/festivals/${slug}`,
      6,
      "16:9",
      notes.join(" "),
    ]));
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, lines.join("\n") + "\n", "utf8");

  console.log(`[gen-festival-video-prompts] wrote ${lines.length - 1} rows → ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`[gen-festival-video-prompts]   tier A: ${tierCounts.A}, tier B: ${tierCounts.B}, tier C: ${tierCounts.C}`);
  console.log(`[gen-festival-video-prompts]   subject-keyword matches: ${festivals.length - subjectFallthroughCount.count}/${festivals.length} (${((festivals.length - subjectFallthroughCount.count) / festivals.length * 100).toFixed(0)}%) — rest fall back to terrain default`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
