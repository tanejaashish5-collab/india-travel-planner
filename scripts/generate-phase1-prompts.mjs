#!/usr/bin/env node
/**
 * Generate Phase 1 landing-page hero video prompts.
 *
 * Emits CSV rows for:
 *   - 36 state hero videos     (state-<slug>.mp4)
 *   - 5  macro-region heroes   (region-<slug>.mp4)
 *   - 12 month heroes          (month-<slug>.mp4)
 *   - 8  category landing      (lp-<slug>.mp4)
 *
 * Run:
 *   node scripts/generate-phase1-prompts.mjs              # emit to stdout
 *   node scripts/generate-phase1-prompts.mjs --append     # append to video-prompts.csv
 */
import { readFileSync, writeFileSync, appendFileSync } from "fs";

const APPEND = process.argv.includes("--append");

// State data — name + 3-5 signature scenic anchors used to colour the prompt
const STATES = [
  ["andaman-nicobar", "Andaman & Nicobar Islands", "white-sand beaches", "Cellular Jail at dusk", "Radhanagar sunset", "Havelock dive boats", "Neil Island bicycles"],
  ["andhra-pradesh", "Andhra Pradesh", "Tirumala temple gopurams", "Borra caves", "Lambasingi mist", "Belum cave staircases", "Krishna delta paddies"],
  ["arunachal-pradesh", "Arunachal Pradesh", "Tawang monastery prayer wheels", "Sela Pass ice", "Ziro paddy terraces", "Mechuka valley", "Namdapha rainforest"],
  ["assam", "Assam", "Brahmaputra ferries", "Kaziranga one-horn rhinos", "Majuli river island", "Sivasagar Ahom ruins", "Manas grasslands"],
  ["bihar", "Bihar", "Bodh Gaya Mahabodhi tree", "Nalanda ruins", "Rajgir hills", "Vikramshila stupas", "Mithila painting"],
  ["chandigarh", "Chandigarh", "Capitol Complex Le Corbusier", "Rock Garden mosaic", "Sukhna Lake morning", "Sector 17 plaza", "Rose Garden colour"],
  ["chhattisgarh", "Chhattisgarh", "Chitrakote waterfall", "Bastar tribal markets", "Kanger Valley caves", "Sirpur ruins", "Indravati tigers"],
  ["daman-diu", "Daman & Diu", "Diu Fort cannons", "Nagoa Beach palms", "Portuguese churches", "Devka coast", "Naida caves"],
  ["delhi", "Delhi", "Jama Masjid minarets at azaan", "Humayun's Tomb dawn", "Old Delhi chai cycles", "India Gate fog", "Hauz Khas ruins"],
  ["goa", "Goa", "Palolem crescent at golden hour", "Old Goa basilica", "Chapora fort wind", "Dudhsagar monsoon", "spice plantations"],
  ["gujarat", "Gujarat", "Rann of Kutch salt desert", "Somnath sea-temple", "Gir lion silhouettes", "Modhera sun-temple", "Ahmedabad pol streets"],
  ["haryana", "Haryana", "Sultanpur birds", "Kurukshetra fields", "Pinjore gardens", "Morni hills", "Surajkund crafts"],
  ["himachal-pradesh", "Himachal Pradesh", "Spiti high desert monasteries", "Manali deodar forest", "Tirthan trout streams", "Kasol Parvati riverbed", "Chitkul border village"],
  ["jammu-kashmir", "Jammu & Kashmir", "Dal Lake shikaras at dawn", "Gulmarg gondola", "Pahalgam Lidder river", "Sonmarg meadows", "Vaishno Devi pilgrim trail"],
  ["jharkhand", "Jharkhand", "Hundru falls", "Betla tigers", "Netarhat sunrise", "Parasnath temples", "Patratu valley"],
  ["karnataka", "Karnataka", "Hampi boulder ruins", "Coorg coffee mist", "Gokarna beach trail", "Mysore palace lights", "Western Ghats waterfalls"],
  ["kerala", "Kerala", "Alleppey backwater kettuvallam", "Munnar tea estates dawn", "Varkala cliff", "Athirapally falls in monsoon", "Kathakali green-and-red"],
  ["ladakh", "Ladakh", "Pangong Tso blue", "Nubra dune camels", "Khardung La snow", "Hemis prayer flags", "Lamayuru moonland"],
  ["lakshadweep", "Lakshadweep", "Agatti coral reef shallows", "Bangaram lagoon", "Kavaratti dhonis", "Minicoy lighthouse", "Kalpeni atoll"],
  ["madhya-pradesh", "Madhya Pradesh", "Khajuraho temple sculpture", "Sanchi stupa light", "Bandhavgarh tigers", "Pachmarhi sandstone", "Mandu fort echoes"],
  ["maharashtra", "Maharashtra", "Sahyadri fort silhouettes", "Ajanta cave murals", "Konkan coast monsoon", "Lonar crater lake", "Mumbai marine drive curve"],
  ["manipur", "Manipur", "Loktak floating phumdis", "Sangai Sendra view", "Ima Keithel women's market", "Ukhrul lily slopes", "Kangla palace gates"],
  ["meghalaya", "Meghalaya", "Cherrapunji rain curtains", "Mawlynnong cleanest village", "Living root bridges Nongriat", "Shillong viewpoints", "Dawki river clarity"],
  ["mizoram", "Mizoram", "Aizawl hills at twilight", "Phawngpui blue mountain", "Reiek bamboo forest", "Champhai vineyards", "Lengpui terraces"],
  ["nagaland", "Nagaland", "Hornbill festival warriors", "Dzukou valley flowers", "Khonoma terraces", "Kohima cemetery silence", "Mon log-drum houses"],
  ["odisha", "Odisha", "Konark sun temple wheel", "Chilika lake birds", "Puri sea-temple flags", "Daringbadi pine mist", "Pattachitra painting"],
  ["puducherry", "Puducherry", "White Town French quarter", "Promenade morning walkers", "Auroville Matrimandir", "Paradise beach boats", "yellow walls"],
  ["punjab", "Punjab", "Golden Temple aarti light", "Wagah border parade", "Anandpur Sahib gurdwara", "Patiala palace symmetry", "mustard fields in March"],
  ["rajasthan", "Rajasthan", "Jaisalmer golden sandstone", "Pushkar ghats and brahmin chants", "Udaipur lake mist", "Bishnoi villages", "Thar dunes camel silhouette"],
  ["sikkim", "Sikkim", "Kanchenjunga first light", "Yumthang valley flowers", "Gurudongmar high lake", "Pelling monastery view", "Tsomgo cable cars"],
  ["tamil-nadu", "Tamil Nadu", "Madurai Meenakshi gopurams", "Mahabalipuram shore-temple", "Ooty toy-train", "Chettinad mansion courtyards", "Kanyakumari sunrise"],
  ["telangana", "Telangana", "Charminar minarets dusk", "Warangal thousand-pillar carving", "Ramoji film city", "Bhongir fort", "Kakatiya kalyana mandapam"],
  ["tripura", "Tripura", "Ujjayanta Palace lights", "Neermahal lake palace", "Unakoti rock-cut reliefs", "Tripura Sundari temple", "Sepahijala langurs"],
  ["uttar-pradesh", "Uttar Pradesh", "Varanasi ghat fires at dusk", "Taj Mahal dawn fog", "Vrindavan flute markets", "Lucknow imambara arches", "Ayodhya Sarayu"],
  ["uttarakhand", "Uttarakhand", "Kedarnath shrine in cloud", "Valley of Flowers", "Auli oak slopes", "Rishikesh Ganga ghats", "Jim Corbett tiger grass"],
  ["west-bengal", "West Bengal", "Darjeeling toy-train through tea", "Sundarbans tiger waters", "Howrah bridge over Hooghly", "Kalimpong monasteries", "Shantiniketan baul"],
];

// Macro regions — used in browse filters & some landing surfaces
const REGIONS = [
  ["north", "North India", "Himalayan ranges and Indo-Gangetic plains", "Ladakh moonland, Kashmir Dal Lake, Himachal valleys, Uttarakhand char-dham, Punjab gurdwaras, Rajasthan deserts"],
  ["south", "South India", "tropical coasts and Western Ghats", "Kerala backwaters, Goa palms, Tamil Nadu gopurams, Karnataka coffee, Andhra coastline"],
  ["east", "East India", "rivers, deltas, and pilgrim coasts", "Bengal Sundarbans, Odisha Konark sun temple, Bihar Bodh Gaya, Jharkhand forests, plateau waterfalls"],
  ["west", "West India", "Arabian Sea coasts and Sahyadri forts", "Maharashtra ghats, Gujarat Rann, Goa beaches, Konkan rail through monsoon"],
  ["northeast", "North-East India", "seven sisters & one brother — tribal heartlands", "Arunachal monasteries, Meghalaya living-root bridges, Nagaland Hornbill, Sikkim Kanchenjunga, Mizoram blue hills, Manipur Loktak, Tripura palaces, Assam Brahmaputra"],
];

// Months — seasonal mood that should colour the cuts
const MONTHS = [
  ["january", "January", "deep winter — snow, fog, citrus orchards in the south", "Himalayan snow, Rajasthan morning mist, Kerala coconut light, Andaman dive season"],
  ["february", "February", "late winter into early spring — mustard fields, almond blossoms", "Kashmir almond bloom, Punjab mustard, Hampi gold light, Ranthambore tiger weather"],
  ["march", "March", "spring — Holi colours, palaash forests, mountain blossoms", "Goa final season, Holi powder bursts, Himachal palaash red, Kerala backwater calm"],
  ["april", "April", "pre-monsoon — heat haze rising, mountain freshness, last clear skies before rain", "Uttarakhand char-dham opens, Ladakh accessible, plain heat shimmer"],
  ["may", "May", "peak summer — hill-station rush, north-east first rains, southern coast empty", "Manali deodar shade, Munnar tea cool, Goa empty beach, Spiti road opens"],
  ["june", "June", "monsoon arrives — Kerala first, then Konkan and Western Ghats wake up", "Athirapally roaring, Konkan rail through curtains, Coorg coffee leaves dripping"],
  ["july", "July", "deep monsoon — waterfalls swollen, rice paddies emerald, plains soaked", "Meghalaya cherrapunji, Maharashtra fort silhouettes in mist, Kerala house-boat"],
  ["august", "August", "monsoon continues — clouds against Western Ghats, north-east lush", "Valley of Flowers, Spiti rain-shadow desert, Goa green hills behind beaches"],
  ["september", "September", "monsoon retreats — post-rain clarity, festivals begin, paddies golden", "Kerala Onam, Sikkim post-rain peaks, Coorg coffee blossoms, Ladakh autumn"],
  ["october", "October", "post-monsoon clarity — clearest mountains, Durga Puja, beaches re-open", "Kanchenjunga first crisp views, Dussehra, Bengal pandals, Goa boats out"],
  ["november", "November", "early winter — best month, festivals, dry trails, perfect light", "Pushkar camel fair, Hornbill festival, Rajasthan fort circuit, Tawang clear skies"],
  ["december", "December", "winter peak — north dry-cold, south warm, fog in the plains, Christmas markets", "Manali snow, Goa Christmas mass, Kerala backwater honeymoon, Rann of Kutch white"],
];

// Category landing pages — each gets one editorial hero
const CATEGORIES = [
  ["treks", "Treks of India", "the trail network — from Himalayan high passes to Western Ghats jungle trails", "Roopkund skull lake, Hampta Pass, Kuari ridge, Sandakphu Singalila, Dudhsagar trek, Valley of Flowers"],
  ["camping", "Camping across India", "tents under sky — riverside, desert, alpine meadow, jungle clearing", "Tirthan riverside, Spiti starfield, Coorg coffee-camp, Pench-edge wildlife camp, Sahyadri ridge"],
  ["routes", "Road Trips of India", "tarmac storytelling — desert highways, ghat curves, coastal NHs", "Manali-Leh, Mumbai-Goa coastal, Mangalore-Mahe via Wayanad, Spiti loop, Ladakh circuit"],
  ["stays", "Stays in India", "rooms with character — heritage haveli, treehouse, monastery guesthouse, beach shack", "Rajasthan haveli courtyard, Kerala houseboat, Spiti mud-brick homestay, Goa colonial veranda"],
  ["festivals", "Festivals of India", "ritual, colour, sound — temple processions, tribal dances, regional new years", "Pushkar camels, Onam vallam-kali, Hornbill warriors, Durga Puja pandal, Theyyam fire"],
  ["tourist-traps", "Tourist Trap Alternatives", "the editorial — crowded headliner alongside the quieter alternative just down the road", "Mall Road chaos vs Old Manali, Charminar evening rush vs Chowmahalla calm, Gokarna town vs Paradise Beach"],
  ["road-conditions", "Road Conditions Live", "the safety side — landslide zones, monsoon-closed passes, winter snow bands", "Spiti rockfall warning, Rohtang gate, Sikkim NH-10 monsoon, Char Dham yatra route"],
  ["explore", "Explore India", "the master hub — diverse vistas, all 36 states in one anthology cut", "Himalayan snow → desert dunes → backwater dawn → tea estates → temple ghats → river island"],
];

function csvEscape(s) {
  if (s == null) return "";
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function row(id, name, region, useCase, prompt) {
  return [id, name, region || "—", useCase, "8s", prompt].map(csvEscape).join(",");
}

function statePrompt(name, anchors) {
  const anchorList = anchors.join(" · ");
  return `Cinematic anthology cut — ${name} — five quick scenic moments that signal the state: ${anchorList}. Editorial India travel documentary look, natural light, hand-held + drone mix, mood: place, geography, culture — no on-screen text or chyrons, no logos, 8 seconds`;
}

function regionPrompt(name, blurb, anchors) {
  return `Cinematic anthology cut — ${name} — ${blurb}. Six quick scenic cuts spanning the region: ${anchors}. Natural light, editorial documentary mix, mood: scale, diversity, signature geography — no on-screen text or chyrons, no logos, 8 seconds`;
}

function monthPrompt(name, blurb, anchors) {
  return `Cinematic anthology cut — ${name} in India — ${blurb}. Four-five quick scenic cuts that signal the month's weather + light + cultural moments: ${anchors}. Natural light, no on-screen text or chyrons, no logos, 8 seconds`;
}

function categoryPrompt(name, blurb, anchors) {
  return `Cinematic anthology cut — ${name} — ${blurb}. Four-five quick scenic cuts: ${anchors}. Editorial India travel anthology look, natural light, hand-held + drone, mood: hub, breadth, signature visual idea — no on-screen text or chyrons, no logos, 8 seconds`;
}

const rows = [];

for (const [slug, name, ...anchors] of STATES) {
  rows.push(row(`state-${slug}`, name, "—", "state landing hero", statePrompt(name, anchors)));
}
for (const [slug, name, blurb, anchors] of REGIONS) {
  rows.push(row(`region-${slug}`, name, "—", "macro-region landing hero", regionPrompt(name, blurb, anchors)));
}
for (const [slug, name, blurb, anchors] of MONTHS) {
  rows.push(row(`month-${slug}`, name, "—", "month landing hero", monthPrompt(name, blurb, anchors)));
}
for (const [slug, name, blurb, anchors] of CATEGORIES) {
  rows.push(row(`lp-${slug}`, name, "—", "category landing hero", categoryPrompt(name, blurb, anchors)));
}

const output = rows.join("\n") + "\n";

if (APPEND) {
  const existing = readFileSync("video-prompts.csv", "utf-8");
  const existingIds = new Set(existing.split("\n").map((l) => l.split(",")[0]));
  const fresh = rows.filter((r) => !existingIds.has(r.split(",")[0]));
  if (fresh.length === 0) {
    console.log("All rows already present in video-prompts.csv — no append.");
  } else {
    appendFileSync("video-prompts.csv", fresh.join("\n") + "\n");
    console.log(`Appended ${fresh.length} new rows to video-prompts.csv (${rows.length - fresh.length} were duplicates).`);
  }
} else {
  process.stdout.write(output);
  console.error(`\n[stderr] Generated ${rows.length} rows (${STATES.length} states + ${REGIONS.length} regions + ${MONTHS.length} months + ${CATEGORIES.length} categories). Re-run with --append to write into video-prompts.csv.`);
}
