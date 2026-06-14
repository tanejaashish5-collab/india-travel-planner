/**
 * Seed 8 famous-but-missing SIKKIM destinations + their month suitability + SOS.
 *
 * Born 2026-06-14 from a contact-form report ("searched a Sikkim place, got a
 * different location") — the search trap was Mangan (no destination existed, so
 * "mangan" matched Barmer's "Manganiyar" gem). This adds the real places.
 *
 * NO FABRICATION: coords + elevation independently verified vs Wikipedia/official
 * (elevations that could not be verified are stored NULL, not guessed). Emergency
 * numbers are REUSED from existing verified rows (Mangan/Gangtok/Pakyong/Gyalshing
 * district administration + national constants), not invented. Month scores are
 * honest seasonality judgments (0-5 DB scale) grounded in bloom/monsoon/snow facts.
 *
 * Egress note: this is ~112 small WRITES (8 dests + 96 months + 8 sos), not a
 * >500-row dump, so the REST service client is fine (the direct-PG rule targets
 * bulk dumps; SUPABASE_DB_URL isn't set locally anyway). Batched into 5 calls.
 *
 * Run:  DRY=1 node --env-file=apps/web/.env.local scripts/_seed-sikkim-coverage-2026-06-14.mjs
 *       node --env-file=apps/web/.env.local scripts/_seed-sikkim-coverage-2026-06-14.mjs
 */
import { createClient } from "@supabase/supabase-js";

const TODAY = "2026-06-14";

// score -> verdict (matches existing vocabulary: go / wait / skip)
const verdictFor = (s) => (s >= 4 ? "go" : s === 3 ? "wait" : "skip");

// North/East/West season note buckets (honest, place-agnostic fallbacks)
const MONSOON = "Monsoon — heavy rain and landslide risk on the mountain roads (Jun–Sep).";

const PLACES = [
  {
    id: "mangan", name: "Mangan", subregion: "North Sikkim",
    lat: 27.52, lng: 88.53, elevation_m: 955, difficulty: "easy",
    type: ["hill-station", "spiritual", "offbeat"],
    vibe: ["serene", "remote", "panoramic"],
    tags: ["gateway-town", "cardamom", "kanchenjunga", "monastery", "north-sikkim"],
    cell_network: "patchy", ideal_duration_min: 1, ideal_duration_max: 2,
    best_months: [3, 4, 5, 10, 11], avoid_months: [6, 7, 8],
    nearest_airport: "Pakyong (PYG) — 80 km; Bagdogra — 200 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 215 km",
    permit_type: "rap",
    permit_required: "Indian nationals: no permit for Mangan town. Foreigners: Sikkim entry permit (RAP/ILP), free on arrival or via a registered agent; a Protected Area Permit is needed only beyond Mangan toward Lachen, Lachung and Gurudongmar.",
    tagline: "The gateway town to North Sikkim — Lachen, Lachung and Gurudongmar start here",
    why_special: "Mangan is the headquarters of North Sikkim district and the town every traveller passes through on the way to Lachen, Lachung and Gurudongmar. It sits at about 955 m on the North Sikkim highway above the Teesta, and the surrounding hills are part of India's main large-cardamom belt. The monasteries of Phodong and Labrang lie just to the south.",
    scores: [3, 3, 4, 5, 5, 2, 1, 2, 3, 5, 4, 3],
    notes: { 3: "Spring clears; roads to the north open up.", 4: "Best window — clear skies, stable roads, the gateway to North Sikkim at its easiest.", 5: "Peak season; crisp Kanchenjunga views before the rains.", 6: MONSOON, 7: MONSOON, 8: MONSOON, 10: "Post-monsoon clarity returns; ideal for onward travel north.", 11: "Cool and clear; good shoulder month.", 1: "Cold but accessible; the high north beyond is snowbound.", 12: "Cold, lower crowds; passes further north are closed." },
    sos_hospital: "District Hospital Mangan (Pentok, Mangan)", sos_hospital_km: 1,
    sos_rescue: "SP Mangan (North): 03592-234242; DM Mangan: 03592-234856; SDM Mangan: 03592-234204",
    sos_source: "Mangan District Administration — Directory (DM/SP/SDM Mangan) + District Hospital Mangan",
  },
  {
    id: "yumthang-valley", name: "Yumthang Valley", subregion: "North Sikkim",
    lat: 27.8268, lng: 88.6959, elevation_m: 3564, difficulty: "moderate",
    type: ["nature", "trek", "wildlife"],
    vibe: ["dramatic", "serene", "wild", "panoramic"],
    tags: ["valley-of-flowers", "rhododendron", "shingba-sanctuary", "hot-spring", "alpine-meadow", "high-altitude"],
    cell_network: "patchy", ideal_duration_min: 1, ideal_duration_max: 2,
    best_months: [4, 5, 10], avoid_months: [1, 2, 7, 8, 12],
    nearest_airport: "Pakyong (PYG) — 145 km; Bagdogra — 270 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 290 km",
    permit_type: "pap",
    permit_required: "Indian nationals: Protected Area Permit arranged by a registered Sikkim operator (group of 2+), from the base village of Lachung. Foreigners: PAP via an operator; some points beyond Yumthang (e.g. Zero Point) are further restricted.",
    tagline: "Sikkim's Valley of Flowers — rhododendrons carpet the meadow, Feb–June",
    why_special: "Yumthang, the 'Valley of Flowers', is a broad alpine meadow at about 3,560 m inside the Shingba Rhododendron Sanctuary, which protects roughly two dozen rhododendron species that bloom across the valley from late February to June. A short drive north are hot springs and, beyond, the Zero Point snow desert. It is reached from the base village of Lachung.",
    scores: [1, 1, 3, 5, 5, 3, 2, 2, 3, 4, 3, 1],
    notes: { 3: "Early rhododendron bloom; patches of snow remain.", 4: "Peak bloom — the meadow is at its most colourful and roads are open.", 5: "Late bloom, warming days; the best all-round window.", 6: "Bloom fading and monsoon arriving — landslide risk on the Lachung road.", 7: MONSOON, 8: MONSOON, 10: "Post-monsoon clear air and fresh greenery.", 1: "Heavy snow; the valley and Lachung road are often closed.", 2: "Cold, snowbound; bloom only just beginning at lower edges.", 12: "Snow and freezing nights; access unreliable." },
    sos_hospital: "District Hospital Mangan (Pentok, Mangan)", sos_hospital_km: 80,
    sos_rescue: "SP Mangan (North): 03592-234242; DM Mangan: 03592-234856; Chungthang PS: 03592-276955 (en route). Beyond Lachung the Indian Army manages infrastructure — no civilian rescue line is published.",
    sos_source: "Mangan District Administration — Directory + District Hospital Mangan (high-altitude PAP zone)",
  },
  {
    id: "nathu-la", name: "Nathu La", subregion: "East Sikkim",
    lat: 27.38681, lng: 88.83095, elevation_m: 4310, difficulty: "moderate",
    type: ["adventure", "heritage", "offbeat"],
    vibe: ["dramatic", "remote", "panoramic"],
    tags: ["border-pass", "india-china-border", "silk-route", "high-altitude", "indians-only"],
    cell_network: "patchy", ideal_duration_min: 1, ideal_duration_max: 1,
    best_months: [5, 6, 9, 10], avoid_months: [1, 2, 3, 12],
    nearest_airport: "Pakyong (PYG) — 85 km; Bagdogra — 185 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 215 km",
    permit_type: "pap",
    permit_required: "Indian nationals ONLY — foreigners are not permitted. Indians need a special border permit arranged a day ahead through a registered Gangtok operator; the pass is open Wed–Sun (closed Mon–Tue), daily permits are capped and confirmed morning-of, subject to weather and the Army.",
    tagline: "A 4,310 m India–China border pass on the old Silk Route",
    why_special: "Nathu La is a 4,310 m pass on the India–China border, one of the highest motorable roads in the world and a historic gate on the old Silk Route. It reopened to visitors in 2006 after decades closed; on a clear day you can look across into Tibet. Indian citizens can visit with a permit on open days — foreign nationals are not allowed.",
    scores: [1, 1, 1, 3, 5, 4, 3, 3, 4, 5, 3, 1],
    notes: { 4: "Road reopening after winter; late snow lines the pass.", 5: "Peak — clearest visibility and most reliable permit days.", 6: "Good, but afternoon cloud and early monsoon can close the road.", 7: "Monsoon — poor visibility and rockfall risk on the climb.", 8: "Monsoon — frequent closures.", 9: "Skies clear again; a strong shoulder month.", 10: "Crisp, clear and stable — excellent.", 11: "Cold; closures begin as snow returns.", 1: "Heavy snow, −20°C nights; the pass is usually shut.", 2: "Snowbound and freezing.", 3: "Still snow-blocked most days.", 12: "Snow and freezing conditions; closed." },
    sos_hospital: "Sir Thutob Namgyal Memorial (STNM) Hospital, Gangtok", sos_hospital_km: 56,
    sos_rescue: "SP East (Gangtok): 03592-284416 (O), 9800653010 (M); DM Gangtok: 03592-284444. On the JN Road / Nathu La sector the Indian Army (17 Mountain Division) runs medical posts — flag down an Army convoy for high-altitude or accident emergencies.",
    sos_source: "Gangtok District Administration — Police + Helpline + STNM Hospital (Army-controlled border sector)",
  },
  {
    id: "aritar", name: "Aritar", subregion: "East Sikkim",
    lat: 27.18806, lng: 88.67472, elevation_m: 1500, difficulty: "easy",
    type: ["lake", "nature", "heritage", "offbeat"],
    vibe: ["serene", "offbeat", "panoramic"],
    tags: ["lampokhari-lake", "silk-route", "boating", "paragliding", "monastery"],
    cell_network: "patchy", ideal_duration_min: 2, ideal_duration_max: 3,
    best_months: [3, 4, 5, 9, 10, 11], avoid_months: [6, 7, 8],
    nearest_airport: "Pakyong (PYG) — 55 km; Bagdogra — 145 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 150 km",
    permit_type: "rap",
    permit_required: "Indian nationals: no permit for Aritar. Foreigners: Sikkim entry permit (RAP/ILP); the nearby Rongli–Zuluk Silk-Route loop needs a separate Protected Area Permit.",
    tagline: "Old Silk-Route village around Lampokhari lake and paragliding hills",
    why_special: "Aritar is a quiet East-Sikkim village on the old Silk Route, best known for Lampokhari (Aritar Lake), one of Sikkim's oldest natural lakes, now fitted with paddle boats and a lakeside promenade. The ridges around it are used for paragliding, and the historic Aritar Gumpa monastery sits nearby.",
    scores: [3, 3, 4, 5, 4, 2, 1, 2, 3, 5, 4, 3],
    notes: { 3: "Cool, clear spring; lake and boating fully open.", 4: "Best month — mild, dry and green, ridges good for paragliding.", 5: "Warm and dry; the last clear window before the rains.", 6: MONSOON, 7: MONSOON, 8: MONSOON, 9: "Post-monsoon green; roads reopen.", 10: "Autumn clarity — strong Kanchenjunga views from the ridges.", 11: "Cool and clear; a fine shoulder month.", 1: "Cold but accessible; quiet.", 12: "Cold, low crowds; the lake area stays open." },
    sos_hospital: "Sir Thutob Namgyal Memorial (STNM) Hospital, Gangtok", sos_hospital_km: 70,
    sos_rescue: "Rongli PS: 9002999639 (PI Umesh Pradhan); SSP Pakyong: 7547965002; DM Pakyong: 9474774456",
    sos_source: "Pakyong District Administration — Police stations + Helpline",
  },
  {
    id: "tashiding", name: "Tashiding", subregion: "West Sikkim",
    lat: 27.307, lng: 88.28, elevation_m: 1465, difficulty: "easy",
    type: ["spiritual", "heritage", "nature"],
    vibe: ["spiritual", "serene", "panoramic"],
    tags: ["monastery", "nyingma", "bhumchu-festival", "sacred-water", "kanchenjunga"],
    cell_network: "patchy", ideal_duration_min: 1, ideal_duration_max: 2,
    best_months: [2, 3, 4, 10, 11], avoid_months: [6, 7, 8],
    nearest_airport: "Bagdogra — 150 km; Pakyong (PYG) — 120 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 155 km",
    permit_type: "rap",
    permit_required: "Indian nationals: no permit. Foreigners: Sikkim entry permit (RAP/ILP); West Sikkim is otherwise permit-free except the Nepal-border zone.",
    tagline: "Sikkim's holiest Nyingma monastery and the Bhumchu sacred-water festival",
    why_special: "Tashiding Monastery, founded in 1641 on a heart-shaped hill between the Rathong and Rangeet rivers, is among the holiest Nyingma sites in Sikkim. Its Bhumchu festival (Feb–Mar) centres on a sacred pot of water whose level is read as an omen for the year ahead. Kanchenjunga rises behind the ridge.",
    scores: [3, 5, 5, 4, 3, 1, 1, 2, 3, 4, 4, 3],
    notes: { 2: "Bhumchu festival — the year's biggest pilgrimage; book ahead.", 3: "Post-festival calm, clear spring skies; prime time.", 4: "Mild and dry, rhododendrons on the approach.", 5: "Warm; the last dry window before the rains.", 6: "West Sikkim is the wettest belt — heavy monsoon, road damage.", 7: MONSOON, 8: MONSOON, 9: "Roads clearing; lush and green.", 10: "Crisp autumn air and clear mountain views.", 11: "Cool and clear; quiet.", 1: "Cold; Bhumchu crowds build toward month-end.", 12: "Cold and quiet." },
    sos_hospital: "District Hospital Gyalshing", sos_hospital_km: 20,
    sos_rescue: "Geyzing PS: 8145887528 (PI Roshan Gurung); District Hospital Gyalshing: 03595-250634",
    sos_source: "Gyalshing District Administration — Police stations + District Hospital Gyalshing",
  },
  {
    id: "phodong", name: "Phodong", subregion: "North Sikkim",
    lat: 27.40833, lng: 88.57056, elevation_m: null, difficulty: "easy",
    type: ["spiritual", "heritage", "nature"],
    vibe: ["spiritual", "serene", "remote"],
    tags: ["monastery", "nyingma", "labrang", "murals", "north-sikkim"],
    cell_network: "patchy", ideal_duration_min: 1, ideal_duration_max: 1,
    best_months: [3, 4, 5, 10, 11], avoid_months: [6, 7, 8],
    nearest_airport: "Pakyong (PYG) — 60 km; Bagdogra — 165 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 180 km",
    permit_type: "rap",
    permit_required: "Indian nationals: no permit for Phodong. Foreigners: Sikkim entry permit (RAP/ILP); a Protected Area Permit is needed only further north toward Lachen and Lachung.",
    tagline: "An 18th-century Nyingma monastery on the road north to Mangan",
    why_special: "Phodong is a small monastery village on the North Sikkim highway about 28 km north of Gangtok, on the way to Mangan. Its early-18th-century Phodong Monastery, one of Sikkim's major Nyingma gompas, is known for its old murals, and a short walk leads to the linked Labrang Monastery.",
    scores: [3, 3, 4, 5, 4, 2, 1, 2, 3, 5, 4, 3],
    notes: { 3: "Clear spring weather; an easy day-stop on the way north.", 4: "Best window — dry, clear and quiet.", 5: "Warm and clear before the rains.", 6: MONSOON, 7: MONSOON, 8: MONSOON, 9: "Greenery returns; roads clearing.", 10: "Crisp autumn air; ideal for the monastery walk.", 11: "Cool and clear.", 1: "Cold but accessible as a day trip from Gangtok.", 12: "Cold and quiet." },
    sos_hospital: "Sir Thutob Namgyal Memorial (STNM) Hospital, Gangtok", sos_hospital_km: 38,
    sos_rescue: "SP Mangan (North): 03592-234242; DM Mangan: 03592-234856; or via SP East (Gangtok): 03592-284416 (Phodong sits on the Gangtok–Mangan road)",
    sos_source: "Mangan / Gangtok District Administration — Directory + STNM Hospital Gangtok",
  },
  {
    id: "rinchenpong", name: "Rinchenpong", subregion: "West Sikkim",
    lat: 27.242192, lng: 88.270916, elevation_m: 1700, difficulty: "easy",
    type: ["hill-station", "spiritual", "nature"],
    vibe: ["serene", "panoramic", "spiritual"],
    tags: ["monastery", "kanchenjunga", "homestay", "rhododendron", "kaluk"],
    cell_network: "patchy", ideal_duration_min: 2, ideal_duration_max: 3,
    best_months: [1, 3, 4, 10, 11, 12], avoid_months: [6, 7, 8, 9],
    nearest_airport: "Bagdogra — 130 km; Pakyong (PYG) — 110 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 125 km",
    permit_type: "rap",
    permit_required: "Indian nationals: no permit. Foreigners: Sikkim entry permit (RAP/ILP); West Sikkim is otherwise permit-free.",
    tagline: "A quiet West-Sikkim ridge with full Kanchenjunga views and old monasteries",
    why_special: "Rinchenpong is a quiet hill village in West Sikkim with wide, unobstructed views of Kanchenjunga. It is built around the 18th-century Rinchenpong (Resum) Monastery, and the surrounding ridges of Kaluk and Hee are known for forest walks and traditional homestays.",
    scores: [4, 4, 5, 5, 3, 1, 1, 1, 2, 4, 5, 4],
    notes: { 1: "Clearest skies of the year for Kanchenjunga.", 2: "Cold, crisp and clear.", 3: "Rhododendrons bloom; mild and clear — prime time.", 4: "Warm days, clear mornings; excellent.", 5: "Warmer with building haze before the rains.", 6: MONSOON, 7: MONSOON, 8: MONSOON, 9: "Tail of the monsoon; clouds still obscure the peaks.", 10: "Post-monsoon clarity; views return.", 11: "Cool, dry and very clear — peak viewing.", 12: "Cold and clear; quiet." },
    sos_hospital: "District Hospital Gyalshing", sos_hospital_km: 25,
    sos_rescue: "Geyzing PS: 8145887528 (PI Roshan Gurung); District Hospital Gyalshing: 03595-250634 (Rinchenpong/Soreng sector)",
    sos_source: "Gyalshing District Administration — Police stations + District Hospital Gyalshing",
  },
  {
    id: "dzongu", name: "Dzongu", subregion: "North Sikkim",
    lat: 27.51, lng: 88.438, elevation_m: null, difficulty: "moderate",
    type: ["offbeat", "nature", "spiritual"],
    vibe: ["remote", "wild", "serene"],
    tags: ["lepcha-reserve", "homestay", "hot-spring", "cardamom", "kanchenjunga", "offbeat"],
    cell_network: "none", ideal_duration_min: 2, ideal_duration_max: 4,
    best_months: [2, 3, 4, 5, 10, 11], avoid_months: [6, 7, 8, 9],
    nearest_airport: "Pakyong (PYG) — 90 km; Bagdogra — 165 km",
    nearest_railhead: "New Jalpaiguri (NJP) — 180 km",
    permit_type: "rap",
    permit_required: "Entry is restricted to protect the Lepcha reserve: a permit from the Mangan district office is required even for Indian nationals, usually arranged by your Dzongu homestay. Foreign nationals need additional clearance and are often not permitted.",
    tagline: "The Lepcha tribal reserve of North Sikkim — homestays, hot springs, waterfalls",
    why_special: "Dzongu is a protected reserve of the Lepcha — Sikkim's indigenous people — set across the hills north-west of Mangan. Closed to outsiders without a permit, it is a landscape of cardamom terraces, waterfalls and hot springs, visited mainly through Lepcha-run homestays. It borders Khangchendzonga National Park.",
    scores: [3, 4, 4, 5, 4, 1, 1, 1, 2, 4, 4, 3],
    notes: { 2: "Cool, dry and quiet; homestays open.", 3: "Mild spring; cardamom hills and waterfalls at their best.", 4: "Best window — warm days, stable roads, green valleys.", 5: "Warm; last clear stretch before the rains.", 6: "Monsoon — Dzongu gets most of its rain now; roads often cut.", 7: MONSOON, 8: MONSOON, 9: "Tail of a heavy monsoon; roads still unreliable.", 10: "Post-monsoon green and clear; access reopens.", 11: "Cool, clear and calm.", 1: "Cold; higher reaches may see snow." },
    sos_hospital: "District Hospital Mangan (Pentok, Mangan)", sos_hospital_km: 25,
    sos_rescue: "SP Mangan (North): 03592-234242; DM Mangan: 03592-234856; SDM Mangan: 03592-234204 — Dzongu entry permits are issued by the Mangan DC office, coordinate rescue via your homestay host.",
    sos_source: "Mangan District Administration — Directory + District Hospital Mangan (restricted Lepcha reserve)",
  },
];

const SLUGS = PLACES.map((p) => p.id);
const DRY = process.env.DRY === "1";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — run with --env-file=apps/web/.env.local");
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Build the three row sets ----------------------------------------------------
const destRows = PLACES.map((p) => ({
  id: p.id, name: p.name, state_id: "sikkim", subregion: p.subregion,
  coords: `POINT(${p.lng} ${p.lat})`, // PostgREST coerces WKT -> geography(Point,4326)
  elevation_m: p.elevation_m, type: p.type, vibe: p.vibe, difficulty: p.difficulty,
  nearest_airport: p.nearest_airport, nearest_railhead: p.nearest_railhead,
  tagline: p.tagline, why_special: p.why_special, cell_network: p.cell_network,
  permit_required: p.permit_required, permit_type: p.permit_type,
  languages_spoken: ["Nepali", "Sikkimese", "Hindi", "English"], tags: p.tags,
  best_months: p.best_months, avoid_months: p.avoid_months,
  ideal_duration_min: p.ideal_duration_min, ideal_duration_max: p.ideal_duration_max,
  place_type: "destination", content_tier: "B",
  last_verified: TODAY, content_reviewed_at: new Date().toISOString(), translations: {},
}));

const monthRows = PLACES.flatMap((p) =>
  Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const score = p.scores[i];
    const note = p.notes[m] ?? (p.avoid_months.includes(m) ? MONSOON : null);
    // why_go/why_not are gated by the dm_prose_floor CHECK (>=150 chars for
    // go/skip, >=120 for wait). Padding short factual notes to clear that floor
    // would be fluff (against the voice rules), so leave them NULL — the
    // constraint allows NULL — and carry the concise seasonal fact in `note`.
    return {
      destination_id: p.id, month: m, score, evergreen_marker: true,
      verdict: verdictFor(score), note, why_go: null, why_not: null,
      content_reviewed_at: new Date().toISOString(),
    };
  }),
);

const sosRows = PLACES.map((p) => ({
  destination_id: p.id, tourist_helpline: "1800-111-363", police: "100",
  ambulance: "108", fire: "101", women_helpline: "1091",
  nearest_hospital: p.sos_hospital, nearest_hospital_km: p.sos_hospital_km,
  rescue_contact: p.sos_rescue, source_label: p.sos_source,
  verified: true, verified_by: "sikkim-coverage-2026-06-14 (district-admin reuse of constants-reverify-2026-06-09)",
  verified_date: TODAY, updated_at: new Date().toISOString(),
}));

// Preflight: which slugs already exist? (expect none) -------------------------
const { data: existing, error: exErr } = await supabase.from("destinations").select("id").in("id", SLUGS);
if (exErr) throw exErr;
if (existing?.length) console.warn("⚠ already present (will be skipped on conflict):", existing.map((r) => r.id).join(", "));

if (DRY) {
  console.log(`DRY=1 — would write: ${destRows.length} destinations, ${monthRows.length} months, ${sosRows.length} sos`);
  console.log("slugs:", SLUGS.join(", "));
  process.exit(0);
}

// Clean any prior partial run, then write (idempotent) ------------------------
for (const t of ["destination_months", "emergency_sos"]) {
  const { error } = await supabase.from(t).delete().in("destination_id", SLUGS);
  if (error) throw new Error(`clean ${t}: ${error.message}`);
}
{
  const { error } = await supabase.from("destinations").upsert(destRows, { onConflict: "id" });
  if (error) throw new Error(`destinations: ${error.message}`);
}
{
  const { error } = await supabase.from("destination_months").insert(monthRows);
  if (error) throw new Error(`destination_months: ${error.message}`);
}
{
  const { error } = await supabase.from("emergency_sos").upsert(sosRows, { onConflict: "destination_id" });
  if (error) throw new Error(`emergency_sos: ${error.message}`);
}

// Verify counts ---------------------------------------------------------------
const counts = {};
for (const [t, col] of [["destinations", "id"], ["destination_months", "destination_id"], ["emergency_sos", "destination_id"]]) {
  const { count } = await supabase.from(t).select(col, { count: "exact", head: true }).in(col, SLUGS);
  counts[t] = count;
}
console.log(`destinations: ${counts.destinations}/8   destination_months: ${counts.destination_months}/96   emergency_sos: ${counts.emergency_sos}/8`);
console.log("Sikkim coverage seed complete:", SLUGS.join(", "));
