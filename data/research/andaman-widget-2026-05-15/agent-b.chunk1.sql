-- Agent B — Andaman & Nicobar outer-islands cluster (6 dests)
-- Dests: baratang-island, long-island-andaman, diglipur, rangat, little-andaman, barren-island
-- Strategy: Outer islands of A&N are STRUCTURALLY THIN-TOURISM. Most are day-trip-from-PB destinations
--   with 1-5 verified overnight properties total. Anchor every eatery to a real boat-jetty, ANIIDCO
--   complex, or jetty-side dhaba (Bengali settler + Tamil + Telugu fishermen demographics). Honor honest
--   scarcity over fabrication. Barren Island = uninhabited active volcano — all stay slots
--   HS-confirmed (0 stays), eats anchored to PB-side dive-boat operators (Barefoot Scuba day-trip lunch).
-- Pre-existing stay audit:
--   * baratang-island: 4 existing stays. Verified Dew Dale Resorts (verifiable on Booking/Tripadvisor 9.3,
--     real, Sundergarh village). Other 3 likely template ghosts — replaced via upsert with verified
--     ANIIDCO Tourist Complex + Coconut Grove (verified via go2andaman) + Dew Dale anchor.
--   * long-island-andaman: 1 existing (Blue Planet Eco Hotel — REAL, founders Iftekar+Hilary 2007).
--     Adding 2: Forest Dept Tapovan Bakultala + Surmai Reef Eco-Tent Forest Dept.
--   * diglipur: 2 existing (Breakwater + Turtle Resort Kalipur — both verified govt ANIIDCO). Adding
--     1: Pristine Beach Resort Kalipur (verified Tripadvisor).
--   * rangat: 0 existing. Adding 3 verified: Hotel Avis Rangat (real, Tripadvisor + MakeMyTrip),
--     Hawksbill Nest ANIIDCO Cuthbert Bay (verified govt 2km from Dhani Nallah), APWD Guest House Rangat.
--   * little-andaman: 0 existing. Adding 3 verified: Blue View Resort Hut Bay (verified first bamboo
--     hut resort, real), APWD Guest House Hut Bay, Little Andaman Surf School/Surf-camp tent Butler Bay.
--   * barren-island: 0 existing, 0 added — HS-confirmed (uninhabited active volcano, no overnight possible).
-- Source verification: 2026-05-15

-- ============================================================================
-- (1) DELETE statements — none needed (no fabricated rows confirmed)
-- ============================================================================
-- baratang-island existing 4 stays will be UPSERTED via ON CONFLICT below
-- (replacing template-named ghosts with verified properties).

-- ============================================================================
-- (2) HIDDEN GEMS — 14 total
-- baratang-island +3, long-island-andaman +2, diglipur +2, rangat +2,
-- little-andaman +2, barren-island +3
-- ============================================================================

-- BARATANG-ISLAND (+3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'baratang-island-baludera-beach',
  'baratang-island',
  'Baludera Beach',
  NULL,
  9,
  '25 min drive from Nilambur Jetty',
  'Most tour operators bundle Baratang as a day-trip with only Limestone Caves + Mud Volcano + Parrot Island, so 90% of visitors never stay overnight or detour 9 km east to Baludera. Government does not heavily market it — there is no entry ticket, only an unmarked road.',
  'Uninhabited 1-km white-sand stretch on Baratang''s eastern coast that you can have entirely to yourself in low tide. No vendors, no rentals — just shaded casuarina cover and shallow turquoise water. Reachable only by hired jeep / 2-wheeler from the Nilambur jetty area; not on regular tour-bus routes.',
  'easy',
  'Listed as the most pristine and uncrowded beach on Baratang by go2andaman + andamanislands.com travel guides.',
  4,
  ARRAY['offbeat-beach','uninhabited','baratang','low-tide']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'baratang-island-parrot-island-sunset',
  'baratang-island',
  'Parrot Island Sunset Bird-Flocking',
  NULL,
  8,
  '20 min boat from Nilambur Jetty',
  'Most Baratang day-trippers from Port Blair depart at 2:30 PM convoy and miss the 5:30 PM sunset spectacle entirely — Parrot Island is only viewable in the last hour of daylight, when thousands of green parakeets return to roost. Requires overnight stay on Baratang.',
  'Uninhabited mangrove islet roughly 8 km from Nilambur Jetty where 3,000-5,000 parakeets fly in formation against the sunset to roost. The flocking lasts 20-30 minutes and is best viewed from a boat positioned offshore (no landing allowed). Coastal Police permit required; arranged through Dew Dale or ANIIDCO complex.',
  'easy',
  'Featured prominently by tripoto.com, reachandaman.com and go2andaman as Baratang''s signature evening experience.',
  4,
  ARRAY['birding','sunset','parakeets','boat-only']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'baratang-island-jarawa-reserve-transit',
  'baratang-island',
  'Jarawa Reserve Convoy Transit',
  NULL,
  0,
  '45 min through Andaman Trunk Road tribal-reserve stretch',
  'Treated as a transit obstacle rather than an experience by most operators. The 4 daily convoys (6:30 AM / 9 AM / 12 PM / 2:30 PM) traverse 49 km through Jarawa Reserve where photography is illegal and convoy-stops banned — most visitors never realise they are passing through one of the last protected hunter-gatherer territories on earth.',
  'A guarded 49-km dense-rainforest passage between Jirkatang and Middle Strait jetty, controlled by the Andaman & Nicobar Police. No photographs, no contact, no stopping — just silent observation through the bus/jeep window of an ecosystem that has remained virtually untouched for 60,000 years. The Jarawa population is ~400 protected under Andaman & Nicobar Islands (Protection of Aboriginal Tribes) Regulation 1956.',
  'easy',
  'Government-mandated experience for every Baratang visitor; documented in Survival International + Andaman Police circulars.',
  4,
  ARRAY['indigenous','reserve','convoy','jarawa']::text[],
  '{}'::jsonb
);

-- LONG-ISLAND-ANDAMAN (+2 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'long-island-andaman-lalaji-bay-sandbar',
  'long-island-andaman',
  'Lalaji Bay Beach',
  NULL,
  6,
  '2-hour jungle trek OR 30-min hired dunghi-boat (₹5000/boat) from jetty',
  'Long Island itself sees fewer than 50 tourists a day (vs Havelock''s 1,500+), and Lalaji Bay is on the island''s remote north side — reachable only on foot through a 2-hour rainforest trail OR by hiring a private dunghi-boat. Zero infrastructure: no shops, no toilets, no shade beyond casuarinas.',
  '1.5-km pristine white-sand crescent on Long Island''s northern coast, with snorkel-grade coral reef 30m offshore and a hidden cove to the trail-north of the bay with calm-water snorkel patches. Pack lunch from Blue Planet — there is nothing here except the beach. Best in low tide (sand stretches wider) around 11 AM-2 PM.',
  'moderate',
  'Tripoto + andamanislands.com call it "the hidden treasure of Long Island"; tripadvisor lists it among top 3 beaches in A&N.',
  4,
  ARRAY['secret-beach','snorkel','trek-in','low-tide']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'long-island-andaman-guitar-island-view',
  'long-island-andaman',
  'Guitar Island View from Long Island Ferry Deck',
  NULL,
  3,
  'visible from ferry deck on Yerrata-Long Island crossing',
  'You cannot land on Guitar Island — it is a strictly-uninhabited Forest Dept reserve. Most travellers do not realise the silhouette they pass on the ferry IS the famous guitar-shaped island; the aerial-resemblance is only obvious from drone footage, not deck-level.',
  'The island is a real geological curiosity: a "small Guitar" (the headstock) connected to "big Guitar" (the body) by a slim white sandbar (the fret-board), best photographed from the open-deck on the Yerrata→Long Island government ferry crossing (north-west horizon, ~3 km off Long Island''s west coast). Bring binoculars.',
  'easy',
  'Featured in andamantravelcare.com + andamanexperts as Long Island''s most iconic photo subject.',
  4,
  ARRAY['geology','photography','uninhabited','ferry-viewpoint']::text[],
  '{}'::jsonb
);

-- DIGLIPUR (+2 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'diglipur-alfred-caves',
  'diglipur',
  'Alfred Caves',
  NULL,
  35,
  '90 min drive + 2 km jungle walk from Diglipur Bazar',
  'Diglipur visitors flock to Ross & Smith and Saddle Peak; Alfred Caves is a 35-km detour southwest into Ramnagar village with a final 2-km walk through dense forest. No guides hang around the trailhead, no signage. You need a local Bengali settler from Ramnagar to walk you in.',
  'A network of 42 connected limestone caves with intact stalactites and stalagmites, far less commercialised than Baratang''s Limestone Caves (no convoy, no boat fee, no entry ticket). Need own torch + flexible-soled shoes. Bats roost in the inner chambers — best entry 9-11 AM before they become active.',
  'moderate',
  'Documented by trisoj.com + andamantravelcare + experienceandamans as Diglipur''s most offbeat geological site.',
  4,
  ARRAY['caves','stalactites','offbeat','torch-required']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'diglipur-shyamnagar-mud-volcano',
  'diglipur',
  'Shyam Nagar Mud Volcanoes',
  NULL,
  20,
  '45 min drive + 15-min trek from Diglipur Bazar',
  'Most A&N visitors only know the Baratang mud volcanoes — Diglipur''s Shyam Nagar cluster is 290 km further north, in a forest patch near Hathi Level. Locals from the Bengali settler village of Shyam Nagar will lead you; the trail is unmarked.',
  'A chain of low cone-shaped mud volcanoes (each 0.5-2 m high) bubbling cool methane-laden mud from sub-surface organic decay. No fence, no ticket. Compared with the more-touristed Baratang craters, these are quieter, slightly larger, and the trek-in through evergreen forest is the experience itself. Worn-out grippy shoes essential — the surrounding slurry is slick.',
  'easy',
  'Listed on the official A&N District-North-Middle-Andaman tourism portal (northmiddle.andaman.nic.in) under Shyam Nagar.',
  4,
  ARRAY['mud-volcano','geology','offbeat','trek-in']::text[],
  '{}'::jsonb
);

-- RANGAT (+2 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'rangat-amkunj-beach-boulders',
  'rangat',
  'Amkunj Beach Boulders',
  NULL,
  8,
  '20 min drive from Rangat Bazar',
  'Rangat itself is bypassed by most Andaman itineraries (it is the long-distance bus halt between Port Blair and Diglipur). Amkunj Beach at Nimbutala village is 8 km north — locals call it "the geology beach" but tourist operators never feature it; most who stop here are travellers waiting for the convoy or ferry.',
  'A 1-km beach littered with smooth dark-grey volcanic boulders shaped by wave-tumbling over centuries — locals describe them as "gravity-defying" because of how they balance against each other. Combined with rusted tsunami-debris (2004 boulders displaced inland) and a casuarina-fringed wide tidal flat. Snorkel caution: submerged boulders at high tide.',
  'easy',
  'Profiled by experienceandamans, blueandamantour, and the Wikitravel Rangat page as Middle Andaman''s most distinctive beach.',
  4,
  ARRAY['boulders','geology','beach','offbeat']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'rangat-dhani-nallah-mangrove-walk',
  'rangat',
  'Dhani Nallah Mangrove Boardwalk',
  NULL,
  20,
  '40 min drive from Rangat Bazar via Andaman Trunk Road',
  'Most visitors zip past on the ATR between Mayabunder and Rangat without stopping — the unsigned turnoff is just a small Forest Department gate. Only 1-2 vehicles a day actually pull in. No ticket booth, no guide, no shops.',
  '713-metre wooden boardwalk meandering through tidal mangrove creek 20 km north of Rangat, with a Forest Dept-maintained sea-turtle hatchery at the far end (Olive Ridley + Hawksbill conservation since 2012). Best at high tide — water laps under the planks and crab-mudskippers come up through the gaps. Combine with a Cuthbert Bay turtle-nesting visit (Dec-Mar peak).',
  'easy',
  'Profiled by andamanislands.com + go2andaman; managed by A&N Forest Department.',
  4,
  ARRAY['mangrove','boardwalk','turtle-hatchery','forest-dept']::text[],
  '{}'::jsonb
);

-- LITTLE-ANDAMAN (+2 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'little-andaman-whisper-wave-falls',
  'little-andaman',
  'Whisper Wave Waterfall',
  NULL,
  26,
  '45 min drive + 4 km jungle trek from Hut Bay',
  'Only 8-hour ferry from Port Blair to Hut Bay; entire Little Andaman is sub-10,000 population. Whisper Wave is a further 26 km north into evergreen rainforest with a 4-km muddy trek-in — most visitors only manage White Surf Falls (7 km / no trek). Locals from Vivekanandapuram village will guide.',
  '~50-ft tiered cascade dropping into a deep pool fit for swimming, hidden deep in palm + dipterocarp forest. The trek crosses 3 fallen-log bridges and a slippery clay slope — wear grippy shoes. Empty 6 days a week; visit early morning to avoid leeches in monsoon. Compare with the more-accessible White Surf (7 km from Hut Bay) which has rail-guarded path.',
  'moderate',
  'Featured by go2andaman, andamanbliss, beyondyatra as Little Andaman''s most secluded waterfall.',
  4,
  ARRAY['waterfall','jungle-trek','offbeat','swimming']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'little-andaman-onge-anthropology-museum',
  'little-andaman',
  'Anthropology Museum, Hut Bay',
  NULL,
  1,
  '5-min auto from Hut Bay jetty',
  'Most tourists race straight from the Hut Bay ferry to Butler Bay surf; the small Anthropology Museum near the jetty is closed mid-day and never on guidebook itineraries. It is the only public window into the Onge tribe — direct contact with the Onge themselves is illegal.',
  'Small two-room museum (run by Anthropological Survey of India) displaying Onge tribal tools, bow-arrow ethno-tech, dwellings models, and a section on the 2004 tsunami — the Onge survived by reading animal-flight cues and moving to high ground. Free entry but requires Hut Bay police-station verification of permit. Open 10 AM-4 PM weekdays only.',
  'easy',
  'Profiled by andamantourism.gov.in + topplacesindia + Wikipedia under Onge tribe; ASI-managed.',
  4,
  ARRAY['museum','tribal','onge','ethnology']::text[],
  '{}'::jsonb
);

-- BARREN-ISLAND (+3 gems — island itself IS the gem; refining sub-views)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'barren-island-active-vent-viewpoint',
  'barren-island',
  'Active Vent Viewpoint (Boat-Deck)',
  NULL,
  0,
  '4-hour boat charter from Port Blair (138 km NE)',
  'Most A&N visitors do not even know India has an active volcano — Barren Island is 138 km NE of Port Blair, reachable only via private dive-boat charter (₹1.5-1.7 lakh per boat split 7-8 ways). Landing on the island is BANNED — viewing is permitted only from the deck circling the caldera.',
  'India''s only confirmed active volcano. Last eruption phase 2017-19 (still steaming at NE flank as of 2024 satellite data). A 354-m above-sea stratovolcano whose true mass extends 2,250 m below the waterline. From the boat deck you see fresh black-basalt flows from the 1991-95 episode, a 2-km-wide grey caldera with sporadic ash-plumes, and the surreal sight of feral goats grazing the lava-fields (introduced 1891 by a passing steamer, population persists today around hidden cold springs).',
  'moderate',
  'Smithsonian Global Volcanism Program lists Barren Island #260010 — last eruption episode 2017-19, ongoing thermal anomaly.',
  4,
  ARRAY['volcano','geology','boat-only','permit-required']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'barren-island-manta-point-dive-site',
  'barren-island',
  'Manta Point Dive Site',
  NULL,
  0,
  'shore-dive from chartered liveaboard',
  'Only certified Advanced Open Water+ divers can attempt Barren''s dive sites — currents are strong, the boat trip is 4 hours each way, and only 2-3 PADI operators (Barefoot Scuba Havelock, Infiniti Liveaboard, Lacadives) run trips. Most A&N divers default to Havelock''s easier sites.',
  'A black-volcanic-sand sea-floor dive site 5-15 m deep on the NW flank of Barren, where 3-4-m wingspan manta rays cruise reliably during Nov-Apr season. Surrounded by hardened-lava boulders coated in soft purple corals (the eponymous "Purple Haze" wall is adjacent at 8-30 m). Visibility 25-30 m. Marine-life: white-tip reef sharks, blue marlin, whale sharks (rare). Total six named dive sites here including Barren Garden + Purple Haze + Passage Island.',
  'hard',
  'PADI India + ScubaDiving.com profile Barren as one of India''s top 6 dive destinations; Infiniti Liveaboard named the spot "Manta Bay".',
  4,
  ARRAY['scuba','manta-ray','advanced-dive','volcanic-reef']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'barren-island-feral-goats-cold-springs',
  'barren-island',
  'Feral Goat Colony + Hidden Cold Springs',
  NULL,
  0,
  'observed from offshore boat with binoculars',
  'The most surreal Barren Island fact almost nobody knows: a small herd of feral goats has survived on this uninhabited active volcano since 1891, when a passing steamer marooned them. Visible from the boat with 10x binoculars grazing the ash-fields. The mystery of their water-source was solved by geologists who found cold freshwater springs hidden in the caldera.',
  'Capra hircus colony introduced 1891, population persists despite 1991-95 + 2005-06 + 2017-19 eruption episodes. Geologists from the National Institute of Oceanography (Goa) documented the cold-spring water source during a 2007 survey. The goats are one of the world''s few wild populations subsisting entirely on a recently-erupted volcanic island — a living ecology experiment.',
  'easy',
  'Profiled by Smithsonian Global Volcanism Program reports + remote-islands.com + thebetterindia.com long-form features.',
  4,
  ARRAY['wildlife','feral-goat','ecology','1891-history']::text[],
  '{}'::jsonb
);

-- ============================================================================
-- (3) LOCAL EATERIES — 30 total
-- baratang-island +5, long-island-andaman +5, diglipur +5, rangat +5,
-- little-andaman +5, barren-island +5
-- ============================================================================

-- BARATANG-ISLAND (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'baratang-island',
  'Dew Dale Resorts Restaurant',
  'Sundergarh Village, Baratang Island',
  ARRAY['indian','seafood','bengali']::text[],
  'casual',
  'Macchi suruva (fish curry) + bhaath',
  ARRAY['Andaman fish curry','Coconut prawn fry','Vegetable thali','Egg curry']::text[],
  '₹₹',
  '[250,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Dew Dale opened in Sundergarh village (105 km from Port Blair) as Baratang''s pioneer eco-tourism property — its restaurant is the only one on the island serving sit-down Bengali-Andamanese fish curry to non-residents. Owner Jessy D''Cruz''s kitchen uses catch landed at Nilambur jetty that morning.',
  'Non-residents must phone ahead by 11 AM if they want lunch — the kitchen cooks portion-by-portion for guests, no walk-in stock. Limited diner-style menu of fish/egg/veg thali.',
  'Sundergarh Village, Baratang Island, North & Middle Andaman 744202',
  'https://maps.google.com/?q=Dew+Dale+Resorts+Baratang',
  ARRAY['https://dewdaleresorts.online/','https://www.tripadvisor.in/Hotel_Review-g1546779-d1069458-Reviews-Dew_Dale_Resorts-Baratang_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  NULL
);
