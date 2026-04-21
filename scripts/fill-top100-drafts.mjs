#!/usr/bin/env node
/**
 * Fills in new_tagline + new_why_special for the 15 REWRITE entries in
 * data/voice-rewrites/top100-voice.json.
 *
 * This is a one-shot drafting script. Drafts are inline below, Claude-written
 * in the NakshIQ hero voice (opinion + texture + no banned words). User reviews
 * the JSON after this runs and edits anything that doesn't land.
 *
 * Usage:
 *   node scripts/fill-top100-drafts.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const drafts = {
  pachmarhi: {
    new_tagline: "MP's only hill station — Satpura Queen",  // unchanged, already works
    new_why_special: "Pachmarhi is Madhya Pradesh's only hill station and sits at a modest 1,067m — no Himalayan drama, just British cantonment bones and Satpura peaks covered in sal forest. Bee Falls gets the crowds; Dhoopgarh (highest point in MP) gets the sunset. The Pandava Caves are overrated but the 40-km radius of waterfalls and viewpoints keeps a weekend busy. Best as a July-September base for central India's other places, not a standalone hill-station trip.",
  },
  kolkata: {
    new_tagline: "India's cultural capital — where the trams still run, the Puja pandals rewrite themselves every October, and College Street's coffee-house conversations haven't ended since 1940.",
    new_why_special: "Victoria Memorial, Howrah Bridge, the last surviving trams, Durga Puja (UNESCO Intangible Heritage), Park Street, College Street book market. Kolkata carries its 19th-century reformist energy the way Delhi carries Mughal stone — in the details, the food, the arguments at every corner tea stall. Gateway to all of Northeast India, and the only Indian metro where walking at 10 PM still feels like a city belongs to its people.",
  },
  lambasingi: {
    new_tagline: "Only sub-zero place in South India — the Kashmir nobody knows about",
    new_why_special: "Recorded -2°C in winter. The ONLY location south of the Vindhyas with sub-zero temps. Locally called 'Korra Bayalu' (leave a stick outside and it freezes like a stick). Coffee and pepper plantations drape the hills; cloud forests wrap the mornings. It's a climatic glitch in Andhra Pradesh — the kind of weird worth the 4-hour drive from Visakhapatnam to tell your friends about.",
  },
  mawphlang: {
    new_tagline: "Sacred Forest of the Khasi tribe — 1,000-year-old untouched grove where nothing can be removed, not even a leaf.",
    new_why_special: "Mawphlang Sacred Forest is a 1,000-year-old grove protected by the Khasi tribe under the deity Labasa. The rule is absolute: nothing leaves the forest — not a leaf, not a pebble, not a dead branch. Locals believe violators face serious misfortune. The result is an undisturbed ecosystem with ancient trees draped in moss, rare orchids, medicinal plants, and a silence that feels genuinely sacred. A local guide (mandatory) walks you through explaining Khasi beliefs and plant uses. The David Scott Trail — a 16-km colonial-era trade route from Mawphlang to Lad Mawphlang — starts here and remains one of Northeast India's best day treks. 25km from Shillong, yet most tourists skip it for Cherrapunji.",
  },
  "neil-island": {
    new_tagline: "Havelock's quieter cousin — coral, cycling, and the Natural Bridge rock arch that ends up in every Andaman photo.",
    new_why_special: "Neil (officially renamed Shaheed Dweep) is a 14 sq km island best covered on a rented bicycle. The Natural Bridge rock formation is the main draw — a coral arch you reach at low tide. Lakshmanpur and Bharatpur beaches are the swim-and-snorkel stops; Sitapur (Sunrise Beach) is the 5am alarm worth setting. Only 1 ATM on the island and it's often out of cash — bring what you need from Port Blair. BSNL/Airtel 2G only; consider this the disconnect.",
  },
  gokarna: {
    new_tagline: "What Goa was 30 years ago — Om Beach, temple town, and five beaches connected by cliff trails",
    new_why_special: "Gokarna is a temple town that happens to sit on the best beaches of India's west coast. Zero commercialisation compared to Goa — no touts, no clubs, no package tourists. Om Beach is shaped like the sacred symbol; Kudle has backpacker shacks; Half Moon and the next cliff-accessed beach require a 30-minute trek each way. The Mahabaleshwar Temple is one of Hinduism's seven mukti-sthalas (liberation places). Spiritual heritage plus undeveloped coastline — the combination doesn't exist elsewhere in India.",
  },
  kokernag: {
    new_tagline: "Kashmir's largest freshwater spring — trout hatchery, botanical garden, and water pure enough to drink from source.",
    new_why_special: "Kokernag is the reason Kashmir's trout menus exist — the hatchery here supplies Srinagar and Sonamarg. The spring itself bubbles up at 18°C year-round, pure enough to drink from source without a filter. The surrounding botanical garden is modest but well-maintained (by Kashmir standards — which is saying something). A 90-minute drive from Srinagar; a genuine day-trip detour that most travellers skip because Pahalgam is closer. Quieter too.",
  },
  almora: {
    new_tagline: "The Kumaoni heritage town where Kasar Devi cosmic energy attracted Swami Vivekananda, D.H. Lawrence, and Timothy Leary before Instagram discovered it.",
    new_why_special: "Almora sits on a horseshoe-shaped ridge with panoramic Himalayan views. The Kasar Devi temple area has measurably different geomagnetic readings — Swami Vivekananda meditated here, Timothy Leary tripped here, D.H. Lawrence wrote here. The town still carries its Kumaoni bones — temples, bazaars, a rhythm most Uttarakhand hill stations have traded away for concrete.",
  },
  gangtok: {
    new_tagline: "India's cleanest hill town — monasteries, momos, and jaw-dropping Kanchenjunga views from a state where plastic bags have been illegal since 1998.",
    new_why_special: "Gangtok is the capital of Sikkim, India's least populated and cleanest state. Rumtek and Enchey monasteries hold their own against anything in Ladakh. MG Marg pedestrian street is one of the best-designed public spaces in India — no vehicles, no touts, you just walk. Nathula Pass (Indo-China border at 4,310m) is a surreal day trip. Tsomgo Lake at 3,753m freezes in winter and mirrors in summer. Permits required for some areas; process is smoother than Ladakh.",
  },
  kanatal: {
    new_tagline: "North India glamping capital — apple orchards, stargazing, zero cell signal.",
    new_why_special: "Kanatal is the anti-hill-station — no Mall Road, no Mall Road traffic jam, no Mall Road photographers. Just orchards at 2,590m, tented camps on the Tehri-Garhwal ridge, and night skies that still register meaningful stars. The Kodia Jungle trek is the short hike worth doing; the Surkanda Devi climb (3km one-way) is the view. An hour past Dhanaulti, two hours past Mussoorie — far enough that the weekenders thin out.",
  },
  mandu: {
    new_tagline: "Romantic medieval citadel at 634m — Jahaz Mahal, Rani Roopmati's love story, and 45 sq km of Afghan-Mughal ruins that most of India has forgotten.",
    new_why_special: "Jahaz Mahal (Ship Palace), Rani Roopmati's Pavilion, Afghan-Mughal ruins stretched across 45 sq km of plateau. Monsoon makes Mandu unrecognisable — green hills where the summer stone was bare, waterfalls that weren't there in April. The love story of Baz Bahadur and Rani Roopmati is the thread every ruin here pulls on. A 2-hour drive from Indore, yet it stays firmly off the tourist circuit.",
  },
  bhandardara: {
    new_tagline: "Arthur Lake, fireflies in May, and Kalsubai — Maharashtra's rooftop",
    new_why_special: "Bhandardara is built around Arthur Lake and Wilson Dam — the surrounding Sahyadri hills hold Maharashtra's highest peak (Kalsubai, 1,646m), spectacular monsoon waterfalls, and one of India's strangest natural shows: millions of fireflies lighting up the forest canopy in late May to early June. Most weekenders come for the firefly week alone and skip the rest of the year. A mistake — the lake in monsoon rivals anything in Coorg.",
  },
  sanchi: {
    new_tagline: "Ashoka built it in the 3rd century BCE and it's still standing — the oldest stone Buddhist architecture in India.",
    new_why_special: "Sanchi's Great Stupa predates Bodhgaya's current temple by several centuries — the oldest surviving stone Buddhist architecture in India. Four intricately carved gateways (toranas) tell stories from Buddha's life and the Jataka tales; the craftsmanship is why UNESCO listed the complex. The Ashokan pillar fragment here carries the lion capital that became India's national emblem. A half-day trip from Bhopal, or an overnight if you want dawn and dusk light on the stone. Most visitors skip it for Khajuraho — a mistake the Buddhist circuit corrects.",
  },
  dharamshala: {
    new_tagline: "Cricket stadium with the best view in world sport, Tibetan government-in-exile, and gateway to the Dhauladhar range.",
    new_why_special: "McLeodganj (upper Dharamshala) is where the Dalai Lama lives and the Tibetan government-in-exile runs. Lower Dharamshala has the HPCA cricket stadium with the Dhauladhar range looming behind fine leg — no cricket ground anywhere looks like it. Namgyal Monastery is the practical centre; Bhagsu Waterfall the weekend spillover; Kangra Art Museum tells the pre-Tibetan Pahari story. Triund trek (9km up, 9 down) is the one day-hike worth planning around.",
  },
  haridwar: {
    new_tagline: "Where the Ganges leaves the mountains and enters the plains — evening Ganga Aarti at Har Ki Pauri is India's most electric spiritual spectacle.",
    new_why_special: "Haridwar is one of the seven holiest cities in Hinduism and the gateway to the Char Dham. The Ganga Aarti at Har Ki Pauri — thousands of floating diyas on the river — is the kind of collective religious experience that reorganises your assumptions about crowds and faith. The city hosts the Kumbh Mela every 12 years, the largest human gathering on Earth. Mansa Devi temple via ropeway gives panoramic views. Rishikesh is 25km away; the pair is a natural overnight circuit.",
  },
};

// ─── Apply ───
const FILE = "data/voice-rewrites/top100-voice.json";
const entries = JSON.parse(readFileSync(FILE, "utf-8"));

let filled = 0;
let missing = [];
for (const e of entries) {
  if (e.status !== "REWRITE") continue;
  const d = drafts[e.id];
  if (!d) { missing.push(e.id); continue; }
  e.new_tagline = d.new_tagline;
  e.new_why_special = d.new_why_special;
  filled++;
}

writeFileSync(FILE, JSON.stringify(entries, null, 2));
console.log(`Filled drafts for ${filled} REWRITE entries.`);
if (missing.length) console.log(`Missing drafts: ${missing.join(", ")}`);
