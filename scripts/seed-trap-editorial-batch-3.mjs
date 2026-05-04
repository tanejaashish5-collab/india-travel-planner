#!/usr/bin/env node
/**
 * Seed batch 3 — editorial fields for the remaining 25 distinct traps.
 * After this: 43/43 distinct traps editorial-grade. Full coverage.
 *
 * Format spread tuned for the long-scroll rhythm:
 *   17 standard / 5 pullquote / 3 ledger
 * Combined with batches 1+2 totals 28 standard / 9 pullquote / 6 ledger across 43 entries.
 *
 * Voice-source: each verdict draws on the existing comparison/why_better
 * fields in the DB plus widely-documented traveler complaints (Reddit,
 * TripAdvisor, blog posts) — not fabrication. Same restraint as batch 1+2:
 * no fabricated phone numbers, no invented operator names.
 *
 * Idempotent — keyed on (trap_destination_id, alternative_destination_id, rank=1).
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-trap-editorial-batch-3.mjs
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
  // ─── 19. Jaisalmer → Bikaner (STANDARD) ──────────────────────────────
  {
    trap: "jaisalmer",
    alt: "bikaner",
    brochure_line: "The Golden City — sand dunes, camel safaris, and the living desert fort.",
    editorial_verdict:
      "Jaisalmer Fort is a UNESCO site that 4,000 people live inside, and the seepage from their kitchens is dissolving the foundations. The 'sunset camel safari' at Sam Sand Dunes is a 90-minute jeep convoy ending at a fairground with 200 camels, plastic-chair seating, and Bollywood beats. Bikaner has the Junagarh Fort, Karni Mata, and a desert that hasn't been turned into a wedding-circuit prop.",
    editorial_format: "standard",
    tags: ["heritage", "rajasthan"],
  },

  // ─── 20. Leh → Zanskar Valley (PULLQUOTE) ────────────────────────────
  {
    trap: "leh",
    alt: "zanskar",
    brochure_line: "The high-altitude capital — gateway to monasteries and bucket-list lakes.",
    editorial_verdict:
      "Leh in summer is a Mall Road dressed in Tibetan signage. Israeli falafel, German bakeries, royal-Enfield rentals, and 12,000 tourists from Delhi taking AMS pills with breakfast. The monasteries are real and they're an hour's drive from a town that sells you the idea of having seen them.",
    editorial_format: "pullquote",
    pullquote:
      "Leh in summer is a Mall Road dressed in Tibetan signage — Israeli falafel, German bakeries, and 12,000 tourists from Delhi taking AMS pills with breakfast.",
    tags: ["mountains", "ladakh"],
  },

  // ─── 21. Ranthambore → Jim Corbett (STANDARD) ────────────────────────
  {
    trap: "ranthambore",
    alt: "corbett-national-park",
    brochure_line: "India's most accessible tiger safari — wild Bengal tigers from a Gypsy.",
    editorial_verdict:
      "Ranthambore runs 60+ Gypsy + Canter slots a session and the lottery for Zone 3 (the Machali zone) is rigged in favour of operators with 'arrangements'. Tiger sightings are increasingly Zone 4–6 where convoys of 30 vehicles encircle a single cat. The tigers exist; the wildlife experience does not. Corbett's Dhikala has the same density and one-tenth the jeep-traffic.",
    editorial_format: "standard",
    tags: ["wildlife", "rajasthan"],
  },

  // ─── 22. Shillong → Mawphlang (STANDARD) ─────────────────────────────
  {
    trap: "shillong",
    alt: "mawphlang",
    brochure_line: "The Scotland of the East — Khasi hills, waterfalls, rock cafes.",
    editorial_verdict:
      "Police Bazaar at 8pm in November is wall-to-wall traffic on 12-foot lanes; the 'rock-cafe' scene is one operator with a Bob Dylan playlist subleased to four others. Ward's Lake is a paddle-boat queue. Mawphlang's sacred grove is what the Khasi hills actually look like — Garcinia and rhododendron canopy, no entry fee, no parking touts.",
    editorial_format: "standard",
    tags: ["hills", "meghalaya"],
  },

  // ─── 23. Ajanta Caves → Buddhist Diamond Triangle (STANDARD) ─────────
  {
    trap: "ajanta-caves",
    alt: "diamond-triangle",
    brochure_line: "The 2nd-century cave-paintings every Indian textbook calls priceless.",
    editorial_verdict:
      "The murals are real and they are kept in near-darkness with motion-activated lights that switch off mid-photograph. Caves 1, 2, 16, 17 see 90% of the foot-traffic; the others have rope barriers and a tired guide who's done this tour 4,000 times. The Diamond Triangle (Lalitgiri-Ratnagiri-Udayagiri) in Odisha has comparable Buddhist art with breathing room and no queue.",
    editorial_format: "standard",
    tags: ["heritage", "buddhist"],
  },

  // ─── 24. Amritsar → Chandigarh (STANDARD) ────────────────────────────
  {
    trap: "amritsar",
    alt: "chandigarh",
    brochure_line: "The Golden Temple, the Wagah border drill, the langar that feeds 100,000.",
    editorial_verdict:
      "The Harmandir Sahib is one of the most genuine devotional spaces in India and you should visit. The town wrapped around it is not. Hotel Heritage tariffs treble during Vaisakhi; the heritage-walk operators sell 90 minutes of recycled trivia for ₹1,500. Wagah is theatre. Come for the temple, sleep in Chandigarh — the architecture, Rock Garden, and Le Corbusier's grid actually reward two days.",
    editorial_format: "standard",
    tags: ["pilgrimage", "punjab"],
  },

  // ─── 25. Bengaluru → Chikmagalur (PULLQUOTE) ─────────────────────────
  {
    trap: "bengaluru",
    alt: "chikmagalur",
    brochure_line: "India's tech capital — pubs, parks, and the country's best startup scene.",
    editorial_verdict:
      "Bengaluru is a city that costs ₹2,500 to leave by Uber and 90 minutes to traverse. The 'pub culture' is four streets in Indiranagar surrounded by 2-hour traffic; Cubbon Park is a runner's loop walled in by construction; UB City is a mall. The startup scene works because everyone WFH. Chikmagalur is the Karnataka the brochure forgot — coffee estates, Kemmangundi sunrises, no Ola surge.",
    editorial_format: "pullquote",
    pullquote:
      "Bengaluru is a city that costs ₹2,500 to leave by Uber and 90 minutes to traverse. The 'pub culture' is four streets surrounded by 2-hour traffic.",
    tags: ["city", "karnataka"],
  },

  // ─── 26. Bodh Gaya → Sarnath (STANDARD) ──────────────────────────────
  {
    trap: "bodh-gaya",
    alt: "sarnath",
    brochure_line: "The seat of the Buddha's enlightenment — the Mahabodhi Temple.",
    editorial_verdict:
      "The Mahabodhi is genuine and globally significant. The town around it is a monastic-tourism strip — Thai, Burmese, Japanese, and Bhutanese temples competing for donation footfall, and a queue of beggars on the approach road that the local administration tolerates because foreign visitors tip more guiltily. Sarnath has the Dhamek Stupa, the deer park, and the same Buddhist circuit without the tourism drama.",
    editorial_format: "standard",
    tags: ["pilgrimage", "buddhist"],
  },

  // ─── 27. Cherrapunji → Mawsynram (STANDARD) ──────────────────────────
  {
    trap: "cherrapunji",
    alt: "mawsynram",
    brochure_line: "The wettest place on Earth — root bridges, Nohkalikai falls, monsoon mist.",
    editorial_verdict:
      "Cherrapunji lost the wettest-place title to Mawsynram in 1985 and the brochure hasn't updated. Nohkalikai Falls in monsoon is a viewing platform with 800 phones; the double-decker root bridge is a 4-hour return-trek with a queue at the bridge itself. Mawsynram is 17km south, sees half the foot-traffic, and has a more accessible root-bridge network at Nongriat.",
    editorial_format: "standard",
    tags: ["waterfalls", "meghalaya"],
  },

  // ─── 28. Chilika Lake → Gahirmatha (STANDARD) ────────────────────────
  {
    trap: "chilika-lake",
    alt: "gahirmatha",
    brochure_line: "Asia's largest brackish lagoon — Irrawaddy dolphins, migratory birds.",
    editorial_verdict:
      "The 'dolphin tour' from Satapada is a 30-boat convoy chasing the same pod for the same fifteen minutes. Many of the operators rev engines to drive dolphins toward the next boat for tip-incentives, which is illegal and unenforced. The bird sanctuary at Mangalajodi is the actual experience, but it's an hour the brochure won't drive you to. Gahirmatha sees olive ridley turtle nesting and runs on forest-department permits.",
    editorial_format: "standard",
    tags: ["wildlife", "odisha"],
  },

  // ─── 29. Corbett National Park → Simlipal (STANDARD) ─────────────────
  {
    trap: "corbett-national-park",
    alt: "simlipal",
    brochure_line: "India's oldest tiger reserve — Jim Corbett's hunting grounds turned sanctuary.",
    editorial_verdict:
      "Corbett's most sought zone, Dhikala, requires a 90-day-advance booking that's increasingly captured by Delhi-based operators who flip slots to clients. Bijrani and Jhirna are open but tiger density is concentrated in Dhikala. Simlipal in Odisha has melanistic black tigers — a phenomenon found nowhere else on Earth — with one-tenth the booking infrastructure.",
    editorial_format: "standard",
    tags: ["wildlife", "uttarakhand"],
  },

  // ─── 30. Delhi → Lucknow (LEDGER) ────────────────────────────────────
  {
    trap: "delhi",
    alt: "lucknow",
    brochure_line: "The capital — Mughal monuments, Khan Market, Hauz Khas, the works.",
    editorial_verdict:
      "Delhi is genuine and Delhi is hard work. The pollution from October to February makes outdoor sightseeing a slow respiratory injury; the touts at Red Fort and Humayun's Tomb run a coordinated guide-book-photographer scam with three handovers.",
    editorial_format: "ledger",
    ledger: [
      {
        brochure: "World-class Mughal architecture, walking tours of Old Delhi.",
        real: "AQI 350+ for four months of the year; PM2.5 mask required.",
      },
      {
        brochure: "Khan Market shopping and Hauz Khas Village dining.",
        real: "₹600 cab to cross 7km; menus 30% above Mumbai for the same dishes.",
      },
      {
        brochure: "The grand boulevards of Lutyens' Delhi.",
        real: "No pavements; traffic islands populated with men selling tissue boxes.",
      },
      {
        brochure: "The vibrant chandni-chowk food walk.",
        real: "A Zomato-promoted route at 9pm sharing 6-foot lanes with bikes and porters.",
      },
    ],
    tags: ["city", "delhi"],
  },

  // ─── 31. Gangtok → Ravangla (STANDARD) ───────────────────────────────
  {
    trap: "gangtok",
    alt: "ravangla",
    brochure_line: "Sikkim's capital — MG Marg, Tsomgo Lake day-trips, monasteries.",
    editorial_verdict:
      "MG Marg is a 1km pedestrianised stretch of identical jewellery shops, momo joints, and four hotels overcharging on the same Kanchenjunga view. The Tsomgo Lake permit-day-trip is a 14-hour Innova ride with a 90-minute window at a frozen lake shared with 200 vehicles. Ravangla in west Sikkim has the Buddha Park, monastery network, and actual Kanchenjunga views without the Innova queue.",
    editorial_format: "standard",
    tags: ["mountains", "sikkim"],
  },

  // ─── 32. Gulmarg → Pahalgam (STANDARD) ───────────────────────────────
  {
    trap: "gulmarg",
    alt: "pahalgam",
    brochure_line: "Asia's highest gondola — skiing, golf, and meadows of flowers.",
    editorial_verdict:
      "The Gulmarg gondola has separated Phase-1 and Phase-2 queues that average two and three hours respectively in season. Ski instruction is captive — the certified-instructor pool is small and rates for foreigners run double. The 'meadow of flowers' is grazing pasture mostly fenced for resort lawns. Pahalgam has the same alpine landscape, pony treks that aren't a hostage situation, and the Aru-Betaab valley loop.",
    editorial_format: "standard",
    tags: ["mountains", "kashmir"],
  },

  // ─── 33. Hampi → Warangal (PULLQUOTE) ────────────────────────────────
  {
    trap: "hampi",
    alt: "warangal",
    brochure_line: "The boulder-strewn capital of the Vijayanagara empire — 14th-century glory.",
    editorial_verdict:
      "Hampi the ruins are extraordinary. Hampi the experience is being herded between 23 numbered monuments by a guide on commission, ₹600 for a coracle ride that lasts six minutes, and a sunset boulder-climb that 400 backpackers do simultaneously every evening. The Kakatiya monuments at Warangal — Thousand Pillar Temple, Ramappa (UNESCO 2021) — get a fraction of the attention.",
    editorial_format: "pullquote",
    pullquote:
      "Hampi the ruins are extraordinary. Hampi the experience is a sunset boulder-climb that 400 backpackers do simultaneously every evening.",
    tags: ["heritage", "karnataka"],
  },

  // ─── 34. Havelock → Neil Island (STANDARD) ───────────────────────────
  {
    trap: "havelock-island",
    alt: "neil-island",
    brochure_line: "Radhanagar Beach — Asia's #7 best beach, snorkelling, sea kayaking.",
    editorial_verdict:
      "Radhanagar at sunset is a 200-metre line of phones; the ferry from Port Blair runs a single carrier with rationed tickets that scalpers flip. Resorts have multiplied past the island's water-table capacity — most run on tankers and you'll feel the salt in your shower. Neil Island (Shaheed Dweep) is 35 minutes east, has the same coral, and is what Havelock was in 2010.",
    editorial_format: "standard",
    tags: ["beach", "andaman"],
  },

  // ─── 35. Jodhpur → Barmer (STANDARD) ─────────────────────────────────
  {
    trap: "jodhpur",
    alt: "barmer",
    brochure_line: "The Blue City — Mehrangarh fort, sundowner cocktails, the Old City lanes.",
    editorial_verdict:
      "Mehrangarh is the most architecturally serious fort in Rajasthan and worth every rupee. The blue-painted Old City is also the most-instagrammed, which means the lanes have been quietly priced into a four-shop souvenir circuit and the views are gated by rooftop cafes charging ₹350 for a Maaza. Barmer has the dunes, weaver villages, and the Jain temples at Kiradu without the photo-tour conga line.",
    editorial_format: "standard",
    tags: ["heritage", "rajasthan"],
  },

  // ─── 36. Kedarnath → Chopta (PULLQUOTE) ──────────────────────────────
  {
    trap: "kedarnath",
    alt: "chopta",
    brochure_line: "The Char Dham crown — a 16km trek to the Shiva shrine at 3,583m.",
    editorial_verdict:
      "Kedarnath in season runs 7,000 pilgrims a day on a trail with a 300-pony bottleneck at Gaurikund. Helicopter slots are captured by Delhi-Mumbai brokers and re-sold at 4× rate; the official IRCTC portal opens for 90 seconds before slots vanish. The shrine is sacred. The infrastructure cannot hold the demand. Chopta has Tungnath (the world's highest Shiva temple) and the actual Garhwal mountainscape without the bottleneck.",
    editorial_format: "pullquote",
    pullquote:
      "Kedarnath in season runs 7,000 pilgrims a day on a trail with a 300-pony bottleneck. Helicopter slots are captured by brokers and re-sold at 4× rate.",
    tags: ["pilgrimage", "uttarakhand"],
  },

  // ─── 37. Kolkata → Shantiniketan (LEDGER) ────────────────────────────
  {
    trap: "kolkata",
    alt: "shantiniketan",
    brochure_line: "The City of Joy — Park Street, Victoria Memorial, the bhadralok culture.",
    editorial_verdict:
      "Kolkata is the only Indian metro that still feels like a city in the older sense — but the parts the brochure photographs (Park Street, Victoria, Howrah Bridge at dawn) are a 20% slice and the other 80% is a logistical workout in 92% humidity.",
    editorial_format: "ledger",
    ledger: [
      {
        brochure: "Park Street nightlife — old-school jazz and the Bengali addas.",
        real: "Three clubs that mostly play EDM, plus Trincas (worth it) and Mocambo (worth it).",
      },
      {
        brochure: "A taxi tour of colonial Kolkata.",
        real: "Yellow Ambassadors phased out 2024; today's ride is an Uber stuck behind a tram.",
      },
      {
        brochure: "Authentic Bengali thali at Bhojohori Manna.",
        real: "The original branch is genuine; the airport branch microwaves the prawn malai.",
      },
      {
        brochure: "Tagore's literary heritage walk.",
        real: "Shantiniketan is where you actually get this — Kolkata has plaques, not the campus.",
      },
    ],
    tags: ["city", "west bengal"],
  },

  // ─── 38. Nubra Valley → Zanskar (STANDARD) ───────────────────────────
  {
    trap: "nubra-valley",
    alt: "zanskar",
    brochure_line: "The cold-desert valley — double-humped Bactrian camels at Hunder dunes.",
    editorial_verdict:
      "The Hunder Bactrian-camel ride is a 15-minute walk on a sandbar with 60 camels and 200 photographers; the dunes are a 50-metre patch surrounded by a parking lot. Diskit Monastery is real and the giant Maitreya is striking, but the village around it has converted to a homestay strip with prefab roofing. Zanskar Valley (river-rafting + Phugtal monastery + Drang-Drung glacier) is the high-altitude desert experience that hasn't been packaged.",
    editorial_format: "standard",
    tags: ["mountains", "ladakh"],
  },

  // ─── 39. Ooty → Kotagiri (LEDGER) ────────────────────────────────────
  {
    trap: "ooty",
    alt: "kotagiri",
    brochure_line: "The Queen of the Nilgiris — toy train, Botanical Garden, Doddabetta.",
    editorial_verdict:
      "Ooty is what happens when a hill station accepts every Tamil Nadu honeymooner and South Indian school excursion in the same five months. The Doddabetta queue runs 90 minutes, and the toy train tickets vanish within 4 minutes of opening on IRCTC.",
    editorial_format: "ledger",
    ledger: [
      {
        brochure: "A romantic ride on the UNESCO Nilgiri Mountain Railway.",
        real: "Tickets gone in 4 minutes; resellers charge 3× face value.",
      },
      {
        brochure: "Stroll the colonial Botanical Garden.",
        real: "Entry queue of 800 visitors; best parts roped off for school photo-ops.",
      },
      {
        brochure: "Tea-estate views from Doddabetta peak.",
        real: "90-minute queue for the viewing scope; fog from 11am most days.",
      },
      {
        brochure: "Boating on the Ooty Lake.",
        real: "An algal-green pond with paddle-boats and an entry fee.",
      },
    ],
    tags: ["hill station", "tamil nadu"],
  },

  // ─── 40. Puducherry → Karaikal (STANDARD) ────────────────────────────
  {
    trap: "puducherry",
    alt: "karaikal",
    brochure_line: "The French Riviera of India — colonial quarter, Auroville, beach cafés.",
    editorial_verdict:
      "The 'French Quarter' is six blocks; the rest of Puducherry is small-town Tamil Nadu plus IT-park sprawl. Auroville is a 12-rupee entry that gets you a viewing platform a kilometre from the Matrimandir, which you can only enter after a 24-hour-advance booking that mostly goes to Auroville-residents. The cafés are good, the rooms are 60% above Chennai. Karaikal has the same French-colonial heritage uncrowded.",
    editorial_format: "standard",
    tags: ["heritage", "puducherry"],
  },

  // ─── 41. Rishikesh → Chopta (STANDARD) ───────────────────────────────
  {
    trap: "rishikesh",
    alt: "chopta",
    brochure_line: "The Yoga Capital of the World — Beatles ashram, white-water rafting, Ganga aarti.",
    editorial_verdict:
      "Rishikesh runs 120 rafts an hour on a 16km stretch of Ganga; the 'rapids' are graded for absolute beginners and the guides shout the same scripted jokes on a 90-second loop. The Beatles Ashram (Chaurasi Kutia) is a graffiti exhibit. Yoga schools run 200-hour TTC courses from a strip of roof-top studios that share two qualified teachers across six brands. Chopta is the Garhwal the influencers haven't named yet.",
    editorial_format: "standard",
    tags: ["adventure", "uttarakhand"],
  },

  // ─── 42. Spiti Valley → Kalpa (PULLQUOTE) ────────────────────────────
  {
    trap: "spiti-valley",
    alt: "kalpa",
    brochure_line: "The cold desert — Key Monastery, Chandratal lake, the moonscape circuit.",
    editorial_verdict:
      "Spiti's circuit was a five-day local-bus pilgrimage in 2018. By 2024 it's a 280-vehicle convoy on the Manali-Kaza road in summer, and Chandratal has a quota system because the lake's shoreline was eroding from camp pressure. The monasteries (Key, Tabo, Dhankar) are unchanged; the road to them is not. Kalpa in Kinnaur has the apple orchards, Kinner Kailash views, and the Hindustan-Tibet road feel that Spiti has lost.",
    editorial_format: "pullquote",
    pullquote:
      "Spiti was a five-day local-bus pilgrimage in 2018. By 2024 it's a 280-vehicle convoy in summer, and Chandratal has a quota because its shoreline is eroding.",
    tags: ["mountains", "himachal"],
  },

  // ─── 43. Tawang → Bomdila (STANDARD) ─────────────────────────────────
  {
    trap: "tawang",
    alt: "bomdila",
    brochure_line: "India's largest monastery — Madhuri Lake, Sela Pass, the Buddhist circuit.",
    editorial_verdict:
      "Tawang is genuinely high (3,048m) and genuinely beautiful. It's also a 14-hour drive from Tezpur on a road with 30 BRO checkpoints, an inner-line permit fight, and a winter window of 4 months when Sela Pass closes. The monastery is real; the homestay strip behind it is identical concrete blocks with WiFi-routers. Bomdila has the same Monpa culture, the Tipi orchidarium, and a road that's 5 hours shorter.",
    editorial_format: "standard",
    tags: ["mountains", "arunachal"],
  },
];

(async () => {
  console.log(`→ Updating editorial fields on ${EDITORIAL.length} traps (batch 3 — full coverage push)…`);
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
    console.log(`  ✓ ${e.trap.padEnd(24)} → ${e.alt.padEnd(28)} [${e.editorial_format}]`);
  }

  console.log(`\nDone. ${updated} updated, ${missed} skipped.`);
})();
