#!/usr/bin/env node
/**
 * Fills solo_female_override + solo_female_override_note on destination_months
 * ONLY where the month-level score diverges meaningfully from the annual score.
 *
 * Rule: only write an override if it differs from the annual score by >= 2, OR
 * if a specific month has a documented risk class that warrants a targeted note.
 *
 * Drafts are inline below, Claude-written in-conversation (no API spend).
 * User reviews the JSON after this runs.
 *
 * Usage:
 *   node scripts/fill-solo-female-overrides.mjs
 */
import { mkdirSync, writeFileSync } from "fs";

// Each key is destination_id. Each value is an array of {month, score, note}.
const overrides = {
  // ═══════════ BEACH — Christmas/NY crowd risk ═══════════
  palolem: [
    { month: 12, score: 3, note: "Christmas-NY week packs the crescent with stag tourism; return after Jan 5 for the usual solo-safe rhythm." },
  ],
  "calangute-baga": [
    { month: 12, score: 1, note: "Peak charter-tourism week — stag harassment + beach-shack fights documented. Move to South Goa (Agonda/Palolem) entirely." },
    { month: 1, score: 2, note: "First week of January still absorbs NYE overflow; shifts safer after Jan 8." },
  ],
  anjuna: [
    { month: 12, score: 2, note: "Peak party-strip week; Anjuna flea + midnight raves = stag-group density. Stay in Vagator side only, skip Anjuna beach at night." },
  ],
  vagator: [
    { month: 12, score: 2, note: "Peak Chronicle + Nine Bar crowd = aggressive stag flow. Stay in Vagator hotels with security; skip walking the cliff strip." },
  ],
  agonda: [
    { month: 12, score: 3, note: "Even quiet Agonda fills with holiday-week bookings; beach-shack staff changes. Stick to named long-stay cottage operators." },
  ],
  morjim: [
    { month: 12, score: 3, note: "Russian-New-Year crowd peaks; Russian-mafia-affiliated clubs in the area have documented harassment. Stay cottage-side, not club-strip." },
  ],
  varkala: [
    { month: 12, score: 3, note: "Christmas sees a backpacker-density peak + Indian domestic stag flow; stay cliff-north, not the south-cliff extension." },
  ],
  kovalam: [
    { month: 12, score: 2, note: "Peak domestic-tourist male-stag week; Lighthouse Beach harassment reports spike. Stay at resort (Taj, Leela) with private beach." },
  ],
  gokarna: [
    { month: 12, score: 3, note: "Peak Western-backpacker week overlaps with Indian domestic crowd; Om + Kudle stay safe, Half Moon + far-north coves get sparse and risky." },
  ],

  // ═══════════ PILGRIMAGE — mela / yatra peaks ═══════════
  prayagraj: [
    { month: 1, score: 2, note: "Maha Kumbh + Magh Mela overlap years (2025 was Maha, 2028 Ardh) turn the city into 100M-pilgrim density; skip outside organised yatra format." },
    { month: 2, score: 2, note: "Mauni Amavasya + Magh Mela close means extreme density; railhead overcrowding is the documented solo-female hazard." },
  ],
  haridwar: [
    { month: 7, score: 3, note: "Kanwar Yatra peak — male-pilgrim density + road-aggression reported. Haridwar ghats remain policed; outskirts + NH roads need care." },
  ],
  nashik: [
    { month: 8, score: 2, note: "Simhastha Kumbh years (next 2027) turn pilgrim density + transport chaos; Panchavati during Shravan is already crowded. Skip overnight solo this month." },
    { month: 9, score: 3, note: "Trimbakeshwar Shravan close — thin-the-herd tail end, pilgrim density still above comfort. Day-trip from Pune." },
  ],
  puri: [
    { month: 6, score: 2, note: "Rath Yatra period (late Jun–Jul) — 3M pilgrims in 3 days. Solo female infeasible unless part of an organised trust-booked group." },
    { month: 7, score: 2, note: "Rath Yatra + Sayana Ekadashi overlap month — ongoing density. Return Aug onwards." },
  ],
  pushkar: [
    { month: 11, score: 2, note: "Pushkar Camel Fair week (Kartik Purnima) — 2L visitors, stag-tour operators + photography-tourists. Skip or stay in a trust-booked haveli only." },
  ],
  ujjain: [
    { month: 4, score: 2, note: "Simhastha-year-adjacent months (next Simhastha 2028) + April Narmada Panchakroshi Yatra = pilgrim-density spike. Off-Simhastha, score returns to 3." },
  ],
  ambaji: [
    { month: 9, score: 2, note: "Bhadrapada Poornima mela = 5M pilgrims in a week. Temple trust manages accommodation only for registered yatra groups; solo infeasible." },
  ],
  kedarnath: [
    { month: 11, score: 2, note: "Kapat-closing week — tail-end pilgrims, shrinking transport, early snow. Return in May when infrastructure restarts." },
    { month: 12, score: null, note: "Shrine closed winter; no solo visit possible." },
    { month: 1, score: null, note: "Shrine closed winter; no solo visit possible." },
    { month: 2, score: null, note: "Shrine closed winter; no solo visit possible." },
    { month: 3, score: null, note: "Shrine closed winter; no solo visit possible." },
  ],
  badrinath: [
    { month: 12, score: null, note: "Shrine closed winter; town deserted." },
    { month: 1, score: null, note: "Shrine closed winter; town deserted." },
    { month: 2, score: null, note: "Shrine closed winter; town deserted." },
    { month: 3, score: null, note: "Shrine closed winter; town deserted." },
  ],
  gangotri: [
    { month: 12, score: null, note: "Shrine closed winter; access road shut." },
    { month: 1, score: null, note: "Shrine closed winter; access road shut." },
    { month: 2, score: null, note: "Shrine closed winter; access road shut." },
    { month: 3, score: null, note: "Shrine closed winter; access road shut." },
  ],
  yamunotri: [
    { month: 12, score: null, note: "Shrine closed winter; trek route inaccessible." },
    { month: 1, score: null, note: "Shrine closed winter; trek route inaccessible." },
    { month: 2, score: null, note: "Shrine closed winter; trek route inaccessible." },
    { month: 3, score: null, note: "Shrine closed winter; trek route inaccessible." },
  ],
  "hemkund-sahib": [
    { month: 7, score: 4, note: "Yatra season peak — SGPC-regulated langar + shared-taxi + community flow means solo-women-pilgrim format is active and safe." },
    { month: 11, score: null, note: "Shrine closes Oct; no solo access Nov-May." },
    { month: 12, score: null, note: "Closed." }, { month: 1, score: null, note: "Closed." },
    { month: 2, score: null, note: "Closed." }, { month: 3, score: null, note: "Closed." },
    { month: 4, score: null, note: "Closed." }, { month: 5, score: null, note: "Closed." },
  ],
  sabarimala: [
    { month: 12, score: 1, note: "Mandalam-Makaravilakku peak pilgrim season (Nov 17 – Jan 14) — men-only cultural context strongest; women 10-50 face direct hostility. Skip absolutely." },
    { month: 1, score: 1, note: "Mandalam-Makaravilakku close — same context. Skip absolutely." },
  ],

  // ═══════════ HILL STATIONS — summer weekend stag vs quiet shoulder ═══════════
  manali: [
    { month: 6, score: 2, note: "Peak summer holiday week (Jun 10-30) = Delhi/Punjab stag-group density at Old Manali + Mall. Book ahead + stay in New Manali with hotel security." },
    { month: 7, score: 3, note: "Monsoon thins the weekender stag flow — safer walk of Old Manali even solo." },
  ],
  lonavala: [
    { month: 7, score: 2, note: "Weekend monsoon crowd is entirely Mumbai/Pune stag groups — bhushi-dam-area incidents documented. Stay at Shillim/retreat properties, not Mall Road." },
    { month: 8, score: 2, note: "Continued monsoon stag-group density; same caveat as July." },
  ],
  khandala: [
    { month: 7, score: 2, note: "Same Mumbai/Pune weekend-stag overlap as Lonavala. Stay Mahabaleshwar-side instead." },
  ],
  mahabaleshwar: [
    { month: 5, score: 3, note: "May weekend holiday crowd = family-heavy but stag-group overflow from Panchgani. Stay Club Mahabaleshwar, not Mapro-area lodges." },
  ],

  // ═══════════ HIMALAYAN TREKS — winter closure ═══════════
  "har-ki-doon": [
    { month: 12, score: null, note: "Snow-blocked trek route Nov-Mar." },
    { month: 1, score: null, note: "Snow-blocked." },
    { month: 2, score: null, note: "Snow-blocked." },
    { month: 3, score: null, note: "Snow-blocked; trek infrastructure closed." },
  ],
  chandratal: [
    { month: 11, score: null, note: "Camp closed; lake inaccessible." },
    { month: 12, score: null, note: "Snow-blocked." },
    { month: 1, score: null, note: "Snow-blocked." },
    { month: 2, score: null, note: "Snow-blocked." },
    { month: 3, score: null, note: "Snow-blocked; access road shut." },
    { month: 4, score: null, note: "Access road typically shut until mid-May." },
    { month: 5, score: null, note: "Access opens mid-May; routine only from June." },
  ],
  kaza: [
    { month: 12, score: 2, note: "Winter Spiti (Dec-Feb) is -20°C, road risk, organised-group-only. Solo absolutely not; operators run women's Spiti winter trips in January with heated convoy." },
    { month: 1, score: 2, note: "Same winter Spiti context as December." },
    { month: 2, score: 2, note: "Late-winter Spiti same context; roads opening late Feb." },
  ],
  "valley-of-flowers": [
    { month: 10, score: null, note: "Trek closes Oct 1 per Uttarakhand forest dept." },
    { month: 11, score: null, note: "Closed." }, { month: 12, score: null, note: "Closed." },
    { month: 1, score: null, note: "Closed." }, { month: 2, score: null, note: "Closed." },
    { month: 3, score: null, note: "Closed." }, { month: 4, score: null, note: "Closed." },
    { month: 5, score: null, note: "Trek opens Jun 1 per forest dept." },
  ],
  roopkund: [
    { month: 11, score: null, note: "Snow closes access from Nov through May." },
    { month: 12, score: null, note: "Snow-blocked." },
    { month: 1, score: null, note: "Snow-blocked." },
    { month: 2, score: null, note: "Snow-blocked." },
    { month: 3, score: null, note: "Snow-blocked." },
    { month: 4, score: null, note: "Snow-blocked until late May." },
  ],

  // ═══════════ LADAKH — winter access ═══════════
  leh: [
    { month: 12, score: 3, note: "Winter Leh — flight-only access, minus-teens, thin tourist flow. Homestays (Omasila, Nimmu House) provide heated safety; still a committed trip, not casual." },
    { month: 1, score: 3, note: "Chadar-trek month brings international solo women; Leh town is otherwise quiet. Homestay-booked + flight-in only." },
    { month: 2, score: 3, note: "Late-winter Leh context continues; Srinagar road still closed." },
  ],
  "nubra-valley": [
    { month: 12, score: 2, note: "Access via Khardung-La is weather-dependent Dec-Mar; organised winter operator only." },
    { month: 1, score: 2, note: "Winter Nubra context; only organised-group routing." },
    { month: 2, score: 2, note: "Same; roads often shut entirely." },
    { month: 3, score: 2, note: "Thaw season; still organised-group-only." },
  ],
  "pangong-lake": [
    { month: 12, score: 2, note: "Lake frozen, minus-20 nights, organised winter operator only; camps closed to walk-in." },
    { month: 1, score: 2, note: "Same winter context." },
    { month: 2, score: 2, note: "Same winter context." },
    { month: 3, score: 2, note: "Thaw season; limited access." },
  ],
  zanskar: [
    { month: 11, score: null, note: "Kargil-Zanskar road closes Nov, no solo access until May." },
    { month: 12, score: null, note: "Road closed; organised Chadar trek only, not solo." },
    { month: 1, score: null, note: "Road closed; organised Chadar trek only." },
    { month: 2, score: null, note: "Road closed." },
    { month: 3, score: null, note: "Road closed." },
    { month: 4, score: null, note: "Road closed." },
  ],
  "khardung-la": [
    { month: 12, score: 2, note: "Pass closed to civilian traffic in deep winter; organised winter operator convoy-only." },
    { month: 1, score: 2, note: "Pass typically shut; convoy-only." },
    { month: 2, score: 2, note: "Pass typically shut; convoy-only." },
  ],

  // ═══════════ KASHMIR — winter + Amarnath yatra ═══════════
  srinagar: [
    { month: 7, score: 3, note: "Amarnath yatra base month — CRPF convoys + yatra-pilgrim density. Tourism outside yatra route is fine; plan around convoy days." },
    { month: 1, score: 3, note: "Peak winter + snowfall — Dal freezes, thin tourist flow. Houseboat with heater (Sukoon) is safe; walk-outs limited." },
  ],
  pahalgam: [
    { month: 7, score: 3, note: "Amarnath yatra base — Pahalgam is packed with yatris + security. Stay at Heevan/Pahalgam Hotel, avoid Chandanwari end." },
    { month: 8, score: 4, note: "Post-Amarnath quiet returns by mid-Aug; best window before school-holiday season." },
  ],
  gulmarg: [
    { month: 12, score: 4, note: "Ski-season peak (Dec-Feb) — organised operators thick on the ground, international tourists present; safest winter Kashmir destination." },
    { month: 1, score: 4, note: "Ski peak; same context." },
    { month: 2, score: 4, note: "Ski peak; same context." },
  ],
  sonamarg: [
    { month: 12, score: null, note: "Access road closed mid-Nov to Apr." },
    { month: 1, score: null, note: "Closed." }, { month: 2, score: null, note: "Closed." },
    { month: 3, score: null, note: "Closed." }, { month: 4, score: null, note: "Closed." },
  ],

  // ═══════════ WILDLIFE — closure months ═══════════
  "corbett-national-park": [
    { month: 7, score: 2, note: "Core zone closed Jul-Oct (monsoon breeding); buffer zones + Jhirna run. Safari flow thins; plan post-Oct instead." },
    { month: 8, score: 2, note: "Core closed, same context." },
    { month: 9, score: 2, note: "Core closed, same context." },
  ],
  kanha: [
    { month: 7, score: 2, note: "Core closed Jul 1 – Oct 15; organised safari not available. Skip this window." },
    { month: 8, score: 2, note: "Same closure." },
    { month: 9, score: 2, note: "Same closure; partial buffer reopens mid-Oct." },
  ],
  ranthambore: [
    { month: 7, score: 2, note: "Core zone closed Jul-Sep monsoon; Zone 6-10 open but thin safari flow. Resume Oct 1." },
    { month: 8, score: 2, note: "Core closed." },
    { month: 9, score: 2, note: "Core closed." },
  ],
  bandhavgarh: [
    { month: 7, score: 2, note: "Core closed Jul 1 – Oct 15; MPTDC safari absent. Skip." },
    { month: 8, score: 2, note: "Same closure." },
    { month: 9, score: 2, note: "Same closure." },
  ],
  kaziranga: [
    { month: 5, score: 2, note: "Park closes mid-May for monsoon; jeep + elephant safari unavailable. Reopens Nov 1." },
    { month: 6, score: null, note: "Park fully closed." },
    { month: 7, score: null, note: "Park fully closed." },
    { month: 8, score: null, note: "Park fully closed." },
    { month: 9, score: null, note: "Park fully closed." },
    { month: 10, score: 2, note: "Park reopens mid-Oct; safari flow still thin, book ahead." },
  ],

  // ═══════════ DESERT — summer extreme ═══════════
  jaisalmer: [
    { month: 5, score: 3, note: "45°C+ peak; daytime tourist flow collapses, only organised dune-overnight operates. Return Oct–Feb." },
    { month: 6, score: 3, note: "Same extreme-heat context." },
  ],
  bikaner: [
    { month: 5, score: 3, note: "46°C+ peak, thin solo-tourist flow; daytime-only movement. Return in winter." },
    { month: 6, score: 3, note: "Same extreme-heat context." },
  ],
  kutch: [
    { month: 5, score: 3, note: "Post-Rann Utsav dead season — Dhordo camps closed, 45°C+ in Bhuj. Come Nov-Feb instead." },
    { month: 6, score: 2, note: "Pre-monsoon extreme; no tourist infrastructure operating." },
  ],
  "rann-of-kutch": [
    { month: 5, score: 2, note: "Tent city dismantled; no tourist infrastructure until Nov re-setup." },
    { month: 6, score: 2, note: "Same off-season context." },
    { month: 7, score: 2, note: "Salt flats underwater; not visitable as the 'white Rann'." },
    { month: 8, score: 2, note: "Same monsoon context." },
    { month: 9, score: 2, note: "Pre-setup, still no tent city." },
  ],

  // ═══════════ TOURIST CITY — extreme-heat months ═══════════
  agra: [
    { month: 5, score: 2, note: "47°C+ peak; tourist flow thins, heat-stroke risk, hydration-scam touts become aggressive. Return Oct-Mar." },
    { month: 6, score: 2, note: "Same extreme-heat context." },
  ],
  varanasi: [
    { month: 5, score: 2, note: "44°C peak + pre-monsoon muggy = walker-incident reports spike. Return Oct-Mar." },
  ],
  jaipur: [
    { month: 5, score: 3, note: "45°C+ peak; daytime fort-climbing not advisable. Amer + Nahargarh tours operate pre-noon only." },
    { month: 6, score: 3, note: "Same extreme-heat context." },
  ],

  // ═══════════ CAMEL FAIR / FESTIVAL WINDOWS ═══════════
  osian: [
    { month: 10, score: 3, note: "Desert-festival season + Camel Safari peak — organised operators thick. Day-trip from Jodhpur works in any month." },
  ],

  // ═══════════ NE DESTINATIONS — festival windows ═══════════
  kohima: [
    { month: 12, score: 4, note: "Hornbill Festival (Dec 1-10) — 2L visitors, organised Nagaland Tourism package + vetted homestays = safer than the annual baseline." },
  ],
  ziro: [
    { month: 9, score: 4, note: "Ziro Music Festival (late Sep) — organised festival camp + long-stay female audience = safer than off-festival baseline." },
  ],
  dambuk: [
    { month: 12, score: 3, note: "Orange Festival (mid-Dec) — operator-organised only, festival infrastructure elevates the solo-safe window from the annual 2/5." },
  ],

  // ═══════════ MONSOON SPECIFICS ═══════════
  athirapally: [
    { month: 8, score: 4, note: "Monsoon peak — waterfall at maximum volume, tour-bus + family crowd density. Safer than the average month." },
  ],
  "jog-falls": [
    { month: 8, score: 3, note: "Monsoon peak — waterfall tourism density helps safety-in-numbers. Off-monsoon the falls thin and so does tourist flow." },
  ],
  dudhsagar: null,
  "dudhsagar-falls": [
    { month: 8, score: 3, note: "Monsoon peak — jeep safari operates daily, tourism flow highest. Solo women routinely join mixed jeeps." },
  ],
  bhandardara: [
    { month: 6, score: 4, note: "Firefly week (late May - mid Jun) — organised camps, mass tourism, documented safe format. Safer than the average month." },
  ],
};

// ─── Transform to flat list + write ───
const flat = [];
for (const [id, months] of Object.entries(overrides)) {
  if (months === null) continue;
  for (const m of months) {
    flat.push({
      destination_id: id,
      month: m.month,
      solo_female_override: m.score, // may be null if closed/unscorable
      solo_female_override_note: m.note,
    });
  }
}

mkdirSync("data/solo-female", { recursive: true });
writeFileSync("data/solo-female/overrides.json", JSON.stringify(flat, null, 2));

const byDest = new Set(flat.map((r) => r.destination_id));
const nulls = flat.filter((r) => r.solo_female_override === null).length;

console.log(`Overrides written: data/solo-female/overrides.json`);
console.log(`  ${flat.length} month-rows across ${byDest.size} destinations`);
console.log(`  ${nulls} null-score overrides (closed-shrine / snow-blocked / monsoon-shut)`);
console.log(`  ${flat.length - nulls} with explicit override score + note`);
