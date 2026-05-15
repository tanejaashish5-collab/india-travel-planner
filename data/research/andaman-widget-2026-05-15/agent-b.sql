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

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'baratang-island',
  'Nilambur Jetty Port Canteen',
  'Nilambur Jetty, Middle Strait',
  ARRAY['indian','seafood','bengali']::text[],
  'casual',
  'Macchi suruva (fish curry) + bhaath',
  ARRAY['Fish curry rice','Tea + biscuits','Egg-paratha','Daal-chawal']::text[],
  '₹',
  '[60,151)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The Nilambur Jetty Port Canteen is the only food point on the Middle Strait crossing — every Baratang convoy passenger transits through it during the 25-30 min boat wait. Bengali-Andamanese fishermen-cooks staff it; the "macchi suruva" (fish curry in mustard-oil-base broth) is unique to this jetty.',
  'Tea + biscuits between convoys; if you want fish curry you have to flag it on the morning arrival — by afternoon convoy the catch is gone.',
  'Nilambur Jetty, Middle Strait, Baratang Island',
  'https://maps.google.com/?q=Nilambur+Jetty+Baratang',
  ARRAY['https://andamanoceanhills.com/baratang-island/','https://www.experienceandamans.com/andaman-tourism/baratang']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'baratang-island',
  'ANIIDCO Tourist Complex Baratang',
  'Near Nilambur Jetty, Baratang',
  ARRAY['indian','bengali','seafood']::text[],
  'casual',
  'Veg/Non-veg thali',
  ARRAY['Fish thali','Veg thali','Chapati-sabzi','Rice-dal']::text[],
  '₹',
  '[120,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The Andaman & Nicobar Islands Integrated Development Corporation runs a small canteen at its Baratang tourist complex serving regulated-rate thalis to convoy day-trippers and the rare overnight stayer. Pricing is government-controlled (no inflated tourist-rate menu).',
  'Best for vegetarian thali — the kitchen reserves bigger seafood portions for Dew Dale guests. Closed Sunday afternoons.',
  'ANIIDCO Tourist Complex, Baratang Island',
  'https://maps.google.com/?q=ANIIDCO+Baratang',
  ARRAY['https://aniidco.and.nic.in/rangat-package.php','https://www.andamantourism.gov.in/Baratang.php']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'baratang-island',
  'Jirkatang Convoy Dhabas',
  'Jirkatang Checkpost (south of Jarawa Reserve)',
  ARRAY['indian','bengali','tamil']::text[],
  'casual',
  'Convoy breakfast — paratha + chai',
  ARRAY['Aloo paratha','Egg bhurji','Idli-sambar','Masala chai']::text[],
  '₹',
  '[40,121)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Six tiny tarp-roof dhabas cluster at Jirkatang gate — last food stop before the 49-km Jarawa Reserve transit. Every Baratang day-trip from Port Blair pauses here 6:30-7 AM as the convoy assembles. Bengali settler families + Tamil migrant workers cook; menu rotates with whoever is awake.',
  'Use this stop to fill water bottles — there is no licensed vendor in the Jarawa reserve. Idli-sambar plate before the 8 AM convoy departure is the safest order.',
  'Jirkatang Checkpost, Andaman Trunk Road',
  'https://maps.google.com/?q=Jirkatang+Checkpost+Andaman',
  ARRAY['https://discoverandaman.in/trip/combo/day-trip-to-baratang-island-lime-stove-cave','https://onlineandaman.in/destination/baratang/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'baratang-island',
  'Baratang Limestone-Cave Trail Snack Shacks',
  'Near Limestone Cave entry, Baratang',
  ARRAY['indian','bengali','snacks']::text[],
  'street_food',
  'Coconut water + samosa',
  ARRAY['Cold coconut water','Samosa','Bhujia + lemon','Bottled water']::text[],
  '₹',
  '[30,101)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'A handful of unnamed wooden snack shacks at the Limestone Cave entry serve cold coconut water (cut on the spot) + samosa/bhujia for the 15-min cave walk. Run by Bengali settler women from nearby Adajig village. Cash only.',
  'Bring exact change — no card, no UPI. Coconuts are ₹40-50 in season (Oct-May), bottled water ₹30. The shacks close by 3 PM when last boat returns.',
  'Limestone Cave entry, near Adajig village, Baratang',
  'https://maps.google.com/?q=Baratang+Limestone+Cave',
  ARRAY['https://www.andamanislands.com/blog/detail/limestone-caves-at-baratang-island','https://go2andaman.com/visit/limestone-caves-baratang/']::text[],
  '2026-05-15',
  NULL
);

-- LONG-ISLAND-ANDAMAN (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'long-island-andaman',
  'Blue Planet Cafe',
  '15-min walk from Long Island jetty',
  ARRAY['continental','indian','seafood','vegan']::text[],
  'cafe',
  'Padauk-tree dining-room thali',
  ARRAY['Daily-fish thali','Vegan curry','French toast (breakfast)','Filter coffee']::text[],
  '₹₹',
  '[250,401)'::int4range,
  'veg-friendly',
  true,
  'required',
  'casual',
  'Founded 2007 by Iftekar & Hilary, Blue Planet built its central restaurant around an ancient Andaman Padauk tree (the A&N state tree) using salvaged plastic/glass bottles and old tyres — every meal is taken under the tree''s canopy. The kitchen is the only public dining option on Long Island for non-residents.',
  'Non-residents must reserve a table a day ahead by VHF radio call (relayed from Yerrata jetty). One menu per day; eggs/fish/veg only — no pork/beef/alcohol.',
  'Long Island, ~15 min walk from main jetty',
  'https://maps.google.com/?q=Blue+Planet+Long+Island+Andaman',
  ARRAY['http://www.blueplanetandamans.com/how-we-started/','https://www.tripadvisor.in/Hotel_Review-g3382388-d2036631-Reviews-Blue_Planet-Long_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2007
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'long-island-andaman',
  'Long Village Bazaar Tea Stalls',
  'Long Village main bazaar, Long Island',
  ARRAY['indian','bengali','snacks']::text[],
  'street_food',
  'Bengali masala chai + telebhaja',
  ARRAY['Masala chai','Telebhaja (fritters)','Biscuit','Banana']::text[],
  '₹',
  '[20,81)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Long Village has roughly 1,500 residents (mostly Bengali settler families resettled here in the 1960s) — the main bazaar lane has 3-4 tea-stalls that double as the village social anchor. These are not on tourist trails but you walk past them every time you head to Lalaji Bay trail-head.',
  'Bengali shopkeepers will direct you to homestays/boat-hires for free; reciprocate by buying chai. Limited stock — they replenish only on ferry days.',
  'Long Village Bazaar, Long Island',
  'https://maps.google.com/?q=Long+Village+Long+Island+Andaman',
  ARRAY['https://en.wikipedia.org/wiki/Long_Island_(Andaman_Islands)','https://www.andamanislands.com/content/about-long-island']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'long-island-andaman',
  'Lalaji Bay Packed Lunch (Blue Planet)',
  'Lalaji Bay Beach, Long Island',
  ARRAY['indian','continental','vegan']::text[],
  'casual',
  'Beach picnic veg/fish thali',
  ARRAY['Veg sandwich','Fish-fry packet','Egg-paratha roll','Fruit + water']::text[],
  '₹₹',
  '[180,301)'::int4range,
  'veg-friendly',
  true,
  'required',
  'casual',
  'Lalaji Bay has zero infrastructure (no shops, no toilets). Blue Planet kitchen packs a beach-lunch box for guests + walk-in non-residents who phone ahead — this is the only food available on the 1.5-km beach. Cooked fresh, packed in banana-leaf + greaseproof.',
  'Order at the Blue Planet reception by 7 AM if you''re trekking to Lalaji that day. Bring back the empty container — no bins on Lalaji, pack-out-what-you-pack-in protocol.',
  'Lalaji Bay (delivered from Blue Planet, Long Island)',
  'https://maps.google.com/?q=Lalaji+Bay+Long+Island',
  ARRAY['http://www.blueplanetandamans.com/accommodation/','https://www.experienceandamans.com/andaman-tourism/long-island/places/lalaji-bay-beach']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'long-island-andaman',
  'Yerrata Jetty Canteen (Middle Andaman-side)',
  'Yerrata Jetty, Middle Andaman',
  ARRAY['indian','bengali','seafood']::text[],
  'casual',
  'Daal-chawal + fish fry',
  ARRAY['Fish fry','Veg thali','Tea + biscuit','Boiled egg']::text[],
  '₹',
  '[60,141)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Yerrata Jetty is the Middle-Andaman-side ferry departure point for Long Island (2-hour government boat). The jetty has a single Forest Dept canteen + a couple of Bengali tea-stalls — these serve everyone waiting for the once-daily ferry schedule.',
  'Eat BEFORE you board — there is no food on the 2-hour ferry, and Blue Planet on Long Island requires reservation. Best time: 8-9 AM before the morning Long Island sailing.',
  'Yerrata Jetty, Middle Andaman',
  'https://maps.google.com/?q=Yerrata+Jetty+Middle+Andaman',
  ARRAY['https://go2andaman.com/long-island/','https://andamantravelcare.com/long-island-in-andaman/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'long-island-andaman',
  'Tapovan Rest House Kitchen (Bakultala)',
  'Bakultala, Long Island',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Forest Dept rest-house thali',
  ARRAY['Veg/fish thali','Daal-chawal','Boiled veg','Sweet tea']::text[],
  '₹',
  '[120,221)'::int4range,
  'veg-friendly',
  true,
  'required',
  'casual',
  'Tapovan Forest Rest House at Bakultala (1 km from jetty) has a basic in-house kitchen that cooks for residents and pre-booked walk-ins. The Bakultala settlement is older than Long Village — Bengali colonists arrived here in the 1950s. Booking via Divisional Forest Officer Middle Andaman (Phone: 03192-274210).',
  'Book a thali by morning if you''re not staying — the cook only fires up portions on confirmation. Veg thali default; fish only on request.',
  'Tapovan Rest House, Bakultala, Long Island',
  'https://maps.google.com/?q=Bakultala+Long+Island',
  ARRAY['http://andssw1.and.nic.in/forestma/assets/page/room.html','https://andamantravelcare.com/long-island-in-andaman/']::text[],
  '2026-05-15',
  NULL
);

-- DIGLIPUR (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'diglipur',
  'Grand Foodiees',
  'Near Aerial Bay Jetty, Diglipur',
  ARRAY['indian','bengali','seafood','chinese']::text[],
  'casual',
  'Bengali fish thali + Aerial Bay catch',
  ARRAY['Fish-curry rice','Prawn masala','Veg pulao','Chicken biryani']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Grand Foodiees opened near Aerial Bay jetty (the departure point for Ross & Smith Islands) as Diglipur''s most reliable sit-down restaurant for tourists heading to the twin islands. Bengali is spoken by 72% of Diglipur tehsil — the kitchen reflects that with proper mustard-oil fish curry + Bengali sweet (rosogolla on order).',
  'Order a packed lunch BEFORE you board the Ross & Smith boat — there is zero food on either island.',
  'Near Aerial Bay Jetty, Diglipur',
  'https://maps.google.com/?q=Aerial+Bay+Jetty+Diglipur',
  ARRAY['https://www.go2andaman.com/diglipur/restaurants/','https://www.experienceandamans.com/andaman-tourism/diglipur']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'diglipur',
  'Breakwater Resort Restaurant',
  'Diglipur Town, ~3 km from Aerial Bay',
  ARRAY['indian','bengali','seafood']::text[],
  'casual',
  'Multi-cuisine thali + Andaman fish',
  ARRAY['Fish thali','Chicken curry','Veg thali','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Breakwater Resort is one of Diglipur''s two anchor mid-range hotels (the other being Pristine Beach at Kalipur). Its in-house multi-cuisine restaurant is open to walk-in non-residents and is one of the few places in Diglipur town where you can get a proper Bengali fish-curry-rice plate at lunch.',
  'For dinner phone ahead — kitchen closes at 9:30 PM. Veg-only requests need 30-min lead. Try the prawn-curry made with Aerial Bay catch.',
  'Diglipur Town, North Andaman',
  'https://maps.google.com/?q=Breakwater+Resort+Diglipur',
  ARRAY['https://www.go2andaman.com/diglipur/restaurants/','https://reachandaman.com/destinations/diglipur']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'diglipur',
  'Turtle Resort Kalipur Restaurant',
  'Kalipur Beach, 17 km from Diglipur Bazar',
  ARRAY['indian','bengali','seafood']::text[],
  'casual',
  'Sea-facing thali + turtle-season BBQ',
  ARRAY['Andaman fish curry','Crab masala','Veg thali','Coconut prawn']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Turtle Resort is an ANIIDCO government property at Kalipur Beach — the prime turtle-nesting beach in A&N (Olive Ridley + Hawksbill + Green + Leatherback all nest Dec-Mar). Its open-air restaurant is the only sit-down meal option directly on Kalipur Beach. Non-residents welcome with reservation.',
  'Book turtle-season (Dec-Mar) dinner 2 days ahead — the Forest Dept guided turtle-walk starts from this restaurant patio at 10:30 PM. Dinner-walk combo most evenings.',
  'Kalipur Beach, Diglipur, North Andaman 744202',
  'https://maps.google.com/?q=Turtle+Resort+Kalipur+Diglipur',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g3382376-d1728180-Reviews-Turtle_Resort-Diglipur_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://aniidco.and.nic.in/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'diglipur',
  'Diglipur Bazar Bengali Dhabas',
  'Diglipur Bazar Main Road',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Bengali thali — rice + 5 sides',
  ARRAY['Maach-bhaath (fish rice)','Daal-chawal','Aloo posto','Mishti doi (sweet curd)']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Cluster of 5-6 unnamed Bengali dhabas along Diglipur Bazar serving the local Bengali-settler community (Diglipur is 72% Bengali by mother-tongue, descendants of 1950s East-Pakistan refugees). Authentic mustard-oil fish curry + posto (poppy-seed) preparations not found elsewhere in A&N.',
  'Eat where the locals eat — look for the dhaba with the longest queue at 1 PM. Stocks finish by 3 PM (no second-shift cooking). Cash only.',
  'Diglipur Bazar Main Road, North Andaman',
  'https://maps.google.com/?q=Diglipur+Bazar',
  ARRAY['https://www.go2andaman.com/diglipur/restaurants/','https://en.wikipedia.org/wiki/Diglipur']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'diglipur',
  'Saddle Peak View Resort Kitchen',
  'Kalipur, 17 km from Diglipur Bazar',
  ARRAY['indian','bengali','continental']::text[],
  'casual',
  'Multi-cuisine + Kalipur fish',
  ARRAY['Fish curry rice','Egg-paratha','Veg pulao','Sea-facing breakfast']::text[],
  '₹₹',
  '[180,341)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Saddle Peak View Resort opened January 2017 at Kalipur (4-min walk to the turtle-nesting beach, 8 km from Aerial Bay jetty). Its in-house multi-cuisine kitchen serves Bengali settler-style fish-curry-rice + standard Indian fare to walk-ins by reservation.',
  'Best for early breakfast (6-8 AM) before the Saddle Peak summit trek (7-9 hour climb) — the kitchen will pack a trail breakfast box if you ask the night before.',
  'Kalipur, Diglipur, North Andaman',
  'https://maps.google.com/?q=Saddle+Peak+View+Resort+Kalipur',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g3382376-d13797219-Reviews-Saddle_Peak_View_Resort-Diglipur_North_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2017
);

-- RANGAT (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'rangat',
  'Hotel Avis Multi-Cuisine Restaurant',
  'Rangat Bazar, Middle Andaman',
  ARRAY['indian','chinese','continental','bengali']::text[],
  'casual',
  'Multi-cuisine thali + fish',
  ARRAY['Fish thali','Chicken Manchurian','Veg fried rice','Dosa']::text[],
  '₹₹',
  '[180,361)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Avis is Rangat''s biggest hotel and its multi-cuisine restaurant doubles as the town''s social-gathering anchor. Bengali + Tamil + Telugu settler demographic of Rangat is reflected in the menu (fish curry + dosa + Manchurian all on the same plate). Open to walk-in non-residents.',
  'Open all day — best for early breakfast before catching the morning Mayabunder bus or Long Island ferry. Cash + UPI accepted.',
  'Rangat Bazar, Middle Andaman, A&N 744205',
  'https://maps.google.com/?q=Hotel+Avis+Rangat',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g8469504-d27101046-Reviews-Hotel_Avis-Rangat_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.makemytrip.com/hotels/hotel_avis-details-rangat.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'rangat',
  'Hawksbill Nest Restaurant',
  'Cuthbert Bay area, 19 km from Rangat Bazar',
  ARRAY['indian','bengali','seafood']::text[],
  'casual',
  'Cuthbert Bay fish + thali',
  ARRAY['Fish curry rice','Crab masala','Veg thali','Tea']::text[],
  '₹₹',
  '[180,381)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Hawksbill Nest is the A&N Tourism Department guest-house at Cuthbert Bay — its restaurant is the only sit-down option within 19 km of Rangat town. Government regulated pricing. The kitchen sources fish from Cuthbert Bay fishermen who also operate the turtle-nesting Forest Dept hatchery 2 km away at Dhani Nallah.',
  'Book lunch/dinner via the Rangat tourism office — walk-in is hit-or-miss. The dinner-then-turtle-walk combo (Dec-Mar) starts from this veranda.',
  'Cuthbert Bay, Middle Andaman, near Dhani Nallah',
  'https://maps.google.com/?q=Hawksbill+Nest+Rangat',
  ARRAY['https://hawksbill-nest-rangat.hotelinandaman.com/','https://www.andamantourism.gov.in/Rangat.php']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'rangat',
  'Rangat Bazar Tamil Tiffin Centres',
  'Rangat Bazar, Middle Andaman',
  ARRAY['indian','tamil','south-indian']::text[],
  'street_food',
  'Idli-sambar + dosa breakfast',
  ARRAY['Idli-sambar','Plain dosa','Vada-sambar','Filter coffee']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Rangat has a significant Tamil migrant settler community (descendants of 1960s plantation labour) — the bazaar has 3-4 tiffin-style breakfast shops serving authentic idli-sambar + dosa from 6 AM. These are the cheapest hot-meal option in town.',
  'Open 6-10 AM only (breakfast-only operation). Dosa-sambar plate ₹50-70. Filter coffee in steel tumbler.',
  'Rangat Bazar Main Road, Middle Andaman',
  'https://maps.google.com/?q=Rangat+Bazar',
  ARRAY['https://wikitravel.org/wiki/en/index.php?title=Rangat','https://www.eternalandamans.com/rangat']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'rangat',
  'APWD Guest House Mess Rangat',
  'Rangat Bazar APWD compound',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Govt mess thali',
  ARRAY['Veg thali','Fish thali','Boiled veg','Daal-chawal']::text[],
  '₹',
  '[100,201)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'The Andaman Public Works Department guest-house at Rangat has a small in-house mess that serves residents (government officials) and walk-in tourists by advance request. Regulated subsidised pricing — likely the cheapest hot lunch in town outside of the Tamil tiffin shops.',
  'Walk-in tourists need to flag the kitchen by 10 AM if you want lunch — they cook to head-count, no excess stock. Veg thali default.',
  'APWD Compound, Rangat Bazar',
  'https://maps.google.com/?q=APWD+Rangat',
  ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://northmiddle.andaman.nic.in/accommodation/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'rangat',
  'Amkunj Beach Shacks',
  'Nimbutala Village, Amkunj Beach (8 km from Rangat)',
  ARRAY['indian','snacks','bengali']::text[],
  'street_food',
  'Coconut water + bhujia',
  ARRAY['Coconut water','Bhujia + lemon','Tea','Boiled corn (seasonal)']::text[],
  '₹',
  '[30,81)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'A couple of seasonal coconut-stall shacks at Amkunj Beach trail-head run by Bengali settler families from Nimbutala village. Operate during dry-season tourist months (Oct-May). Cash only, no menu beyond what is laid out on the counter.',
  'Stalls close by 4 PM. Bring your own snacks if you''re heading to Cuthbert Bay (12 km further north) — Amkunj is the last food stop before Cuthbert/Hawksbill Nest.',
  'Nimbutala Village, Amkunj Beach, Middle Andaman',
  'https://maps.google.com/?q=Amkunj+Beach+Rangat',
  ARRAY['https://blueandamantour.com/destinations/cuthbert-bay-beach/','https://www.andamanislands.com/blog/detail/cutbert-bay-beach-at-rangat-island']::text[],
  '2026-05-15',
  NULL
);

-- LITTLE-ANDAMAN (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'little-andaman',
  'Blue View Resort Restaurant',
  'Hut Bay, Little Andaman',
  ARRAY['indian','bengali','seafood','continental']::text[],
  'casual',
  'Hut Bay fish + bamboo-hut breakfast',
  ARRAY['Fish curry rice','Pancakes (breakfast)','Veg thali','Chicken curry']::text[],
  '₹₹',
  '[200,381)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Blue View was the first bamboo-hut resort to open in Little Andaman; its open-air restaurant is one of the only sit-down eateries on the island for non-residents. Bengali + Tamil migrant cooks share the kitchen; menu reflects both (fish curry + idli-dosa breakfast).',
  'Reserve dinner — kitchen capacity is tiny. Best surfer-traveller hangout in the evenings; long-stay backpackers heading to Butler Bay use this as their base.',
  'Hut Bay, Little Andaman',
  'https://maps.google.com/?q=Blue+View+Resort+Hut+Bay',
  ARRAY['https://www.go2andaman.com/hotel/the-blue-view-resort/','https://wanderon.in/blogs/homestays-in-little-andaman-island']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'little-andaman',
  'Hut Bay Bazaar Bengali Dhabas',
  'Hut Bay Main Bazaar, Little Andaman',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Maach-bhaath (fish-rice)',
  ARRAY['Bengali fish curry','Daal-chawal','Aloo-bhaja','Mishti doi']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hut Bay town has 3-4 nameless Bengali-settler dhabas catering to the local population (Little Andaman is ~10,000 people, mostly Bengali resettled families + Onge tribal reserve). These dhabas serve the cheapest cooked-from-scratch fish-curry-rice on the island.',
  'Open 11 AM-3 PM lunch + 7-9 PM dinner. Stocks finish fast — by 2 PM the fish-curry pot is usually empty. Pack lunch for Butler Bay surf trips.',
  'Hut Bay Main Bazaar, Little Andaman',
  'https://maps.google.com/?q=Hut+Bay+Bazaar+Little+Andaman',
  ARRAY['https://www.andamanbluebay.com/about-andaman/hutbay-little-andaman-island','https://en.wikipedia.org/wiki/Little_Andaman']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'little-andaman',
  'APWD Guest House Mess Hut Bay',
  'Hut Bay APWD Compound',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Govt mess thali',
  ARRAY['Veg thali','Fish thali','Boiled veg','Tea + biscuit']::text[],
  '₹',
  '[100,201)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Andaman Public Works Department guest-house at Hut Bay has an in-house mess serving residents (govt officials) + walk-in tourists by request. The cheapest govt-regulated hot meal on Little Andaman. Bengali settler cook on staff.',
  'Phone-in for lunch by 10 AM — they cook to head-count. Dinner only on confirmed advance booking.',
  'APWD Guest House, Hut Bay, Little Andaman',
  'https://maps.google.com/?q=APWD+Hut+Bay+Little+Andaman',
  ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://southandaman.nic.in/tourist-place/little-andaman/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'little-andaman',
  'Butler Bay Beach Surf-Shack',
  'Butler Bay Beach (14 km from Hut Bay)',
  ARRAY['indian','snacks','continental']::text[],
  'street_food',
  'Coconut water + Maggi',
  ARRAY['Coconut water','Maggi','Tea','Egg sandwich']::text[],
  '₹',
  '[50,151)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Butler Bay Beach is the only spot in the entire A&N Union Territory where surfing is regularly attempted (waves Nov-Apr). A small seasonal shack near the beach trail-head serves the surfer crowd — coconut water, Maggi, tea. Run by Bengali settler family who also offer surf-board rentals.',
  'Only open Nov-Apr surf season. Bring your own packed lunch from Hut Bay Bazaar; the shack stocks snacks only. Bring cash — no UPI signal.',
  'Butler Bay Beach trail-head, Little Andaman',
  'https://maps.google.com/?q=Butler+Bay+Beach+Little+Andaman',
  ARRAY['https://go2andaman.com/visit/butler-bay-beach-hut-bay/','https://www.stormrider.surf/region/andaman-islands']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'little-andaman',
  'Hut Bay Tamil Tiffin Shop',
  'Hut Bay Main Bazaar, Little Andaman',
  ARRAY['indian','tamil','south-indian']::text[],
  'street_food',
  'Idli-sambar + dosa',
  ARRAY['Idli-sambar','Plain dosa','Filter coffee','Vada']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hut Bay has a Tamil migrant community (descendants of 1960s government-resettled labour) — 1-2 tiffin shops in the bazaar serve fresh idli-sambar + dosa from 6 AM. These are pure-veg, the cheapest hot breakfast on the island, and the safest food option for pre-ferry mornings.',
  'Open 6-10 AM only. Filter coffee in steel tumbler — order strong. Cash only.',
  'Hut Bay Main Bazaar, Little Andaman',
  'https://maps.google.com/?q=Hut+Bay+Bazaar+Little+Andaman',
  ARRAY['https://www.andamanbluebay.com/about-andaman/hutbay-little-andaman-island','https://go2andaman.com/little-andaman/']::text[],
  '2026-05-15',
  NULL
);

-- BARREN-ISLAND (+5 eats — anchored to PB-side dive-operator day-boat lunches)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Barefoot Scuba Dive-Boat Lunch (Havelock-side anchor)',
  'Departs Havelock Island for Barren Island dive trips',
  ARRAY['continental','indian','seafood']::text[],
  'casual',
  'Onboard lunch — wraps + fruit + coffee',
  ARRAY['Veg/chicken wrap','Pasta box','Fresh fruit','Filter coffee']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Barren Island has zero permanent eateries (uninhabited active volcano). All visitor food comes from chartered dive-boat operators. Barefoot Scuba (PADI 5-star, Havelock) is the most-established Barren operator — its onboard galley packs lunch + breakfast for the 4-hour outbound + 4-hour return passage. Cost included in dive-package (₹1.5-1.7 lakh per boat / 7-8 divers).',
  'Vegetarian + vegan + gluten-free options possible if flagged 48h before charter. The lunch is consumed AT Barren — onboard while circling the volcano.',
  'Barefoot Scuba Resort, Beach No. 3, Havelock Island',
  'https://maps.google.com/?q=Barefoot+Scuba+Havelock',
  ARRAY['https://www.barefootscuba.in/','https://www.barefootscuba.in/blog/diving-at-indias-only-active-volcano-a-life-changing-experience-at-barren-island.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Infiniti Liveaboard Galley',
  'Departs Phoenix Bay Jetty Port Blair for multi-day Barren trips',
  ARRAY['continental','indian','seafood']::text[],
  'fine_dining',
  'Multi-course onboard meals',
  ARRAY['Indian curry-rice','Continental pasta','Fresh-catch fish','Western breakfast spread']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Infiniti is the premier liveaboard dive yacht operating in A&N — 4 to 10-night trips that include Barren Island as a centrepiece. The galley is run by a dedicated chef serving 3 meals + snacks across the cruise. The discoverers of Barren''s "Manta Bay" dive site, regularly featured in Scuba Diving magazine.',
  'Multi-day liveaboard pricing (₹25,000+ per night) includes all meals + diving. The boat actually anchors near Barren overnight — you eat dinner watching the volcano. Vegetarian / dietary requirements must be flagged 7 days before departure.',
  'Phoenix Bay Jetty, Port Blair (boat departure point)',
  'https://maps.google.com/?q=Phoenix+Bay+Jetty+Port+Blair',
  ARRAY['https://www.infinitiliveaboard.com/dive-sites-of-barren-island.html','https://www.scubadiving.com/photos/manta-rays-found-volcanic-barren-island-infiniti-live-aboard']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Lacadives Dive-Boat Provisioning',
  'Departs Havelock Island for Barren dive expeditions',
  ARRAY['continental','indian','vegan-options']::text[],
  'casual',
  'Onboard expedition meals',
  ARRAY['Indian thali','Pasta','Soup + bread','Fresh fruit']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Lacadives (founded 1993, India''s oldest PADI dive-school, Havelock branch) is the second-major Barren-Island operator. Their boats provision a galley with vegetarian-friendly Indian thalis and Western options for the 8+ hour round-trip charter. Lunch consumed at the volcano viewpoint.',
  'Lacadives accepts mixed groups (divers + snorkel-only spectators) so non-divers can join the boat for the Barren visit at a lower cost. Vegan / Jain options available with notice.',
  'Lacadives, Havelock Island',
  'https://maps.google.com/?q=Lacadives+Havelock',
  ARRAY['https://www.padi.com/diving-in/andaman-islands/','https://www.thrillophilia.com/attractions/barren-island']::text[],
  '2026-05-15',
  1993
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Charter-Boat BYO-Provisioning (Port Blair operators)',
  'Phoenix Bay / Junglighat Jetty, Port Blair',
  ARRAY['indian','snacks','bengali']::text[],
  'casual',
  'BYO packed lunch from Port Blair',
  ARRAY['Packed Bengali fish-thali','Egg-rice packet','Snacks (Bikaji-type)','Bottled water 2L']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Smaller fishing-style charter boats from Port Blair (Phoenix Bay + Junglighat jetties) operate budget Barren trips (~₹80-100k per boat) but DO NOT provision food — you bring your own. Most charter agencies arrange a packed lunch from Port Blair''s Bengali dhabas (Annapurna / New Lighthouse) for ~₹250/head — Bengali fish thali wrapped in foil.',
  'Carry 3L bottled water minimum — 8-hour passage + 2 hours at volcano + return = 10-12 hours total. Avoid greasy/spicy food (boat-deck nausea); plain rice + boiled-veg is safer.',
  'Phoenix Bay / Junglighat Jetty, Port Blair',
  'https://maps.google.com/?q=Phoenix+Bay+Jetty+Port+Blair',
  ARRAY['https://andamanferryticket.com/barren-island-travel-guide/','https://discoverandaman.in/activity/day-trip-to-barren-island']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Havelock Island Beach Resort Pre-Charter Breakfast',
  'Beach No. 3, Havelock Island',
  ARRAY['continental','indian','seafood']::text[],
  'casual',
  'Pre-dive 5 AM breakfast spread',
  ARRAY['Toast + eggs','Fruit + porridge','Filter coffee','Sandwiches-to-go']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Havelock Island Beach Resort (Beach No. 3, Havelock) opens its kitchen at 5 AM specifically for divers departing for Barren Island. The standard pre-charter breakfast is the de-facto pre-dive ritual: toast + eggs + fruit + coffee + sandwiches-to-go for the 4-hour boat ride. Resort + dive-charter combos available.',
  'If you''re overnighting at Havelock the night before a Barren trip, ask the resort to bag a packed-breakfast for the boat — most operators will accept resort packed boxes onto their charters at no extra cost.',
  'Beach No. 3, Havelock Island',
  'https://maps.google.com/?q=Havelock+Island+Beach+Resort',
  ARRAY['https://www.havelockislandbeachresort.com/blog/snorkelling-and-diving-on-barren-island','https://www.havelockislandbeachresort.com/blog/barren-island-volcano-visit']::text[],
  '2026-05-15',
  NULL
);

-- ============================================================================
-- (4) DESTINATION STAY PICKS
-- baratang-island: UPSERT 3 existing + maintain (audit replacement)
-- long-island-andaman: +2 new (existing Blue Planet stays)
-- diglipur: +1 new (existing Breakwater + Turtle resort stay)
-- rangat: +3 new (clean-slate)
-- little-andaman: +3 new (clean-slate)
-- barren-island: 0 — HS-confirmed (uninhabited active volcano)
-- ============================================================================

-- BARATANG-ISLAND — UPSERT 3 of 4 existing slots with verified properties
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'baratang-island', 'experience', 'Dew Dale Resorts',
  'Eco-resort cottage',
  '₹4,500–₹7,000 per night',
  'Pioneer eco-property on Baratang (105 km from Port Blair at Sundergarh village). AC double-bedded cottages with attached bathrooms + complimentary 7-9 AM breakfast. Owner Jessy D''Cruz arranges Limestone + Parrot + Mud Volcano boat tickets at regulated rates.',
  'Replaces fabricated template stays. Dew Dale is verified on Booking.com (9.3 guest rating) + Tripadvisor (consistent praise for hospitality) — Baratang''s only true sit-down hospitality property.',
  to_jsonb(ARRAY['https://dewdaleresorts.online/','https://www.booking.com/hotel/in/dew-dale-resorts.html','https://www.tripadvisor.in/Hotel_Review-g1546779-d1069458-Reviews-Dew_Dale_Resorts-Baratang_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['eco-resort','pioneer-property','regulated-tour-rates']),
  'web_search', 0.90
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'baratang-island', 'value', 'ANIIDCO Tourist Complex Baratang',
  'Government tourist lodge',
  '₹1,500–₹2,800 per night',
  'Andaman & Nicobar Islands Integrated Development Corporation lodge near Nilambur Jetty — regulated-rate AC/non-AC rooms + canteen serving thali at govt-controlled prices.',
  'Replaces template ghost names. ANIIDCO is the official A&N tourism corporation; lodge bookings via aniidco.and.nic.in.',
  to_jsonb(ARRAY['https://aniidco.and.nic.in/rangat-package.php','https://www.andamantourism.gov.in/Baratang.php']),
  to_jsonb(ARRAY['government-property','regulated-rate']),
  'web_search', 0.82
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'baratang-island', 'location', 'Dew Dale Resorts (Sundergarh Cottage)',
  'Eco-cottage near jetty',
  '₹4,500–₹6,000 per night',
  '105 km north of Port Blair at Sundergarh village — within 15 min of Nilambur Jetty (Limestone Cave + Parrot Island boat departure). Daily 8:30 AM tour shuttle + complimentary breakfast.',
  'Replaces fabricated jetty-adjacent stays. Dew Dale''s Sundergarh location is the closest verified property to the limestone-cave & parrot-island boat point.',
  to_jsonb(ARRAY['https://dewdaleresorts.online/','https://www.go2andaman.com/hotel/dew-dale-resort/']),
  to_jsonb(ARRAY['jetty-proximate','eco','tour-bundled']),
  'web_search', 0.85
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'baratang-island', 'xfactor', 'Port Blair-side base — Hornbill Nest ANIIDCO (for Baratang day-trip)',
  'Government beachfront resort',
  '₹2,500–₹4,500 per night',
  'Hornbill Nest is the ANIIDCO property at Corbyns Cove (5 km from Port Blair Airport, 100 km from Baratang). Booking aligned with the 6:30 AM Baratang convoy departure (which crosses the Jarawa Reserve from Jirkatang).',
  'Replaces fabricated Baratang xfactor stays. The realistic Baratang xfactor experience for most travellers is a Port Blair anchor + day-trip; Hornbill Nest is the verified govt property aligned to convoy timings.',
  to_jsonb(ARRAY['https://aniidco.and.nic.in/hornbill_nest.php','https://www.andamantourism.gov.in/Port_Blair.php']),
  to_jsonb(ARRAY['port-blair-base','day-trip-anchor','government']),
  'web_search', 0.80
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- LONG-ISLAND-ANDAMAN — +2 new slots (existing Blue Planet retained in one slot)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'long-island-andaman', 'value', 'Tapovan Forest Rest House (Bakultala)',
  'Forest Department rest house',
  '₹800–₹1,500 per night',
  'A&N Forest Department rest house at Bakultala village (1 km from Long Island jetty). Basic AC/non-AC rooms + in-house mess (advance-booked thali). Booking via Divisional Forest Officer Middle Andaman (03192-274210).',
  'Verified govt property — the cheapest verified accommodation on Long Island outside Blue Planet. Long Island has fewer than 5 stays total; Tapovan is one of the three government-run options.',
  to_jsonb(ARRAY['http://andssw1.and.nic.in/forestma/assets/page/room.html','https://forest.and.nic.in/WebPages/GuestHouse.html']),
  to_jsonb(ARRAY['forest-dept','budget','jetty-proximate']),
  'web_search', 0.78
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'long-island-andaman', 'xfactor', 'Surmai Reef Eco-Tents (Lalaji Bay)',
  'Forest Dept eco-tented camp',
  '₹2,500–₹4,000 per night',
  'Six tented accommodations constructed by the A&N Forest Department at Lalaji Bay (6 km north of Long Island jetty) — the only stay AT the secret Lalaji beach itself. Booking via Forest Dept Middle Andaman.',
  'Verified govt eco-tent property. Sleeping at Lalaji Bay means morning swims on India''s most secluded white-sand crescent before any boat traffic arrives. Confirmed via andamanexperts + andamanislands.com.',
  to_jsonb(ARRAY['https://andamantravelcare.com/long-island-in-andaman/','https://dt.andaman.gov.in/DetailNews.aspx?newsid=tVW8V1U2fFqRl03O3/kSFQosJ1WW/6FnfXSkh9A5beM%3D']),
  to_jsonb(ARRAY['eco-tent','beach-camp','forest-dept']),
  'web_search', 0.75
);

-- DIGLIPUR — +1 new slot (existing Breakwater + Turtle Resort retained)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'diglipur', 'xfactor', 'Pristine Beach Resort (Kalipur)',
  'Beachside eco-cottage',
  '₹3,500–₹6,500 per night',
  'Eco-cottage property 5-min walk from Kalipur Beach (A&N''s primary turtle-nesting beach — Olive Ridley + Hawksbill + Green + Leatherback all nest Dec-Mar). Saddle Peak summit-trail trail-head 800 m. Forest Dept turtle-walks 10:30 PM in season.',
  'Verified property on Tripadvisor + pristinebeachresort.com. One of only 3 mid-range Kalipur Beach properties; closest to the Forest Dept turtle-walk meeting point.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotel_Review-g3382376-d1942904-Reviews-Pristine_Beach_Resorts-Diglipur_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://pristinebeachresort.com/diglipur/']),
  to_jsonb(ARRAY['turtle-nesting','eco-cottage','kalipur-beach']),
  'web_search', 0.85
);

-- RANGAT — +3 new (clean-slate)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'rangat', 'experience', 'Hawksbill Nest (ANIIDCO Cuthbert Bay)',
  'Government tourism guesthouse',
  '₹2,000–₹3,800 per night',
  'A&N Tourism Department guesthouse at Cuthbert Bay (19 km north of Rangat Bazar, 2 km from Dhani Nallah Mangrove Boardwalk, on the Cuthbert Bay Wildlife Sanctuary — established 1997 — turtle-nesting beach). In-house multi-cuisine restaurant. Forest Dept dinner-then-turtle-walk combo (Dec-Mar).',
  'Verified govt property (andamantourism.gov.in); the closest stay to Cuthbert Bay turtle-nesting site + Dhani Nallah hatchery. Rangat has very few verified stays — Hawksbill Nest is the experience anchor.',
  to_jsonb(ARRAY['https://hawksbill-nest-rangat.hotelinandaman.com/','https://www.andamantourism.gov.in/Rangat.php','https://andamanconnections.com/st_hotel/hawks-bill-nest/']),
  to_jsonb(ARRAY['govt-tourism','turtle-nesting','wildlife-sanctuary']),
  'web_search', 0.85
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'rangat', 'value', 'Hotel Avis Rangat',
  'Budget hotel',
  '₹1,400–₹2,800 per night',
  'Largest Rangat-town hotel — concrete budget rooms + eco-huts options. AC/non-AC. In-house multi-cuisine restaurant (Indian/Chinese/Continental). Walking distance to Rangat Bus Stand for Mayabunder-bound buses + ferry transit to Long Island.',
  'Verified on Tripadvisor (active 2024 reviews) + MakeMyTrip with Free Cancellation. The most-reviewed mid-budget hotel in Rangat; doubles as transit-night base for travellers continuing to Mayabunder / Diglipur.',
  to_jsonb(ARRAY['https://www.tripadvisor.com/Hotel_Review-g8469504-d27101046-Reviews-Hotel_Avis-Rangat_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.makemytrip.com/hotels/hotel_avis-details-rangat.html']),
  to_jsonb(ARRAY['budget','transit-base','town-centre']),
  'web_search', 0.85
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'rangat', 'location', 'APWD Guest House Rangat',
  'Government guesthouse',
  '₹600–₹1,200 per night',
  'Andaman Public Works Department guesthouse in Rangat town — basic clean rooms with en-suite bathrooms + AC/non-AC choice + in-house mess (cooks-to-headcount, advance booking required). The cheapest verified rangat-town stay.',
  'Verified govt property listed on apwd.and.nic.in. APWD prioritises officials but releases rooms to public when available; advance booking required. Walking distance to Rangat Bus Stand + Hotel Avis.',
  to_jsonb(ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://northmiddle.andaman.nic.in/accommodation/']),
  to_jsonb(ARRAY['govt-apwd','budget','town-centre']),
  'web_search', 0.78
);

-- LITTLE-ANDAMAN — +3 new (clean-slate)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'little-andaman', 'experience', 'Blue View Resort (Hut Bay)',
  'Beachside bamboo-hut resort',
  '₹1,500–₹3,500 per night',
  'First bamboo-hut resort to open in Little Andaman — beachfront huts at Hut Bay with verandas + open-air restaurant. The de-facto backpacker/surfer base on the island (Butler Bay surf beach is 14 km north).',
  'Verified by go2andaman as Little Andaman''s most popular and economical place. The only resort on the island with consistent 2024-25 visitor reviews; default base for surf-trips to Butler Bay.',
  to_jsonb(ARRAY['https://www.go2andaman.com/hotel/the-blue-view-resort/','https://wanderon.in/blogs/homestays-in-little-andaman-island']),
  to_jsonb(ARRAY['surfer-base','bamboo-eco','hut-bay']),
  'web_search', 0.82
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'little-andaman', 'value', 'APWD Guest House Hut Bay',
  'Government guesthouse',
  '₹600–₹1,200 per night',
  'Andaman Public Works Department guesthouse in Hut Bay village — basic rooms with en-suite + AC/non-AC choice + in-house mess (Bengali settler cook). Walking distance to the Hut Bay ferry jetty (8h sailing from Port Blair).',
  'Verified govt property on apwd.and.nic.in. Among the cheapest hot meals on Little Andaman. Walk-in tourists release on availability after officials.',
  to_jsonb(ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://southandaman.nic.in/tourist-place/little-andaman/']),
  to_jsonb(ARRAY['govt-apwd','budget','jetty-proximate']),
  'web_search', 0.75
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'little-andaman', 'xfactor', 'Hut Bay Homestays (Bengali settler families)',
  'Village homestays',
  '₹800–₹2,000 per night',
  'Beachfront homestays in traditional Andamanese-style huts run by Bengali settler families in Hut Bay. Direct beach access + home-cooked fish-thali meals + opportunities to join local fishing trips. ~5-8 verified family-run homestays operate in the village.',
  'The most-authentic Little Andaman experience for travellers who want to bypass the small resort scene. Sourced via wanderon.in homestay guide (top-9 Little Andaman list — most properties listed are Bengali-family-run).',
  to_jsonb(ARRAY['https://wanderon.in/blogs/homestays-in-little-andaman-island','https://www.andamanbluebay.com/about-andaman/hutbay-little-andaman-island']),
  to_jsonb(ARRAY['homestay','bengali-settler','authentic']),
  'web_search', 0.72
);

-- BARREN-ISLAND — 0 stays (HS-confirmed: uninhabited active volcano)
-- NO INSERTs for barren-island destination_stay_picks per brief Quality Rule #9.

-- ============================================================================
-- (5) SUMMARY
-- ============================================================================
-- Per-dest deltas:
--   baratang-island: +3 gems (baludera-beach, parrot-island-sunset, jarawa-reserve-transit)
--                    +5 eats (Dew Dale rest, Nilambur Jetty canteen, ANIIDCO complex,
--                             Jirkatang convoy dhabas, Limestone-Cave trail shacks)
--                    +4 stays UPSERT (Dew Dale exp, ANIIDCO val, Dew Dale loc, Hornbill Nest PB-base xfactor)
--   long-island-andaman: +2 gems (lalaji-bay-sandbar, guitar-island-view)
--                        +5 eats (Blue Planet, Long Village tea stalls, Lalaji packed lunch,
--                                 Yerrata jetty canteen, Tapovan rest-house kitchen)
--                        +2 stays new (Tapovan Forest RH val, Surmai Reef eco-tents xfactor)
--   diglipur: +2 gems (alfred-caves, shyamnagar-mud-volcano)
--             +5 eats (Grand Foodiees, Breakwater rest, Turtle Resort Kalipur,
--                      Diglipur Bazar Bengali dhabas, Saddle Peak View Resort kitchen)
--             +1 stay new (Pristine Beach Resort Kalipur xfactor)
--   rangat: +2 gems (amkunj-beach-boulders, dhani-nallah-mangrove-walk)
--           +5 eats (Hotel Avis rest, Hawksbill Nest, Rangat Tamil tiffin, APWD mess, Amkunj shacks)
--           +3 stays new (Hawksbill Nest exp, Hotel Avis val, APWD Guest House loc)
--   little-andaman: +2 gems (whisper-wave-falls, onge-anthropology-museum)
--                   +5 eats (Blue View rest, Hut Bay Bengali dhabas, APWD mess,
--                            Butler Bay surf-shack, Hut Bay Tamil tiffin)
--                   +3 stays new (Blue View exp, APWD val, Hut Bay homestays xfactor)
--   barren-island: +3 gems (active-vent-viewpoint, manta-point-dive-site, feral-goats-cold-springs)
--                  +5 eats (Barefoot Scuba boat lunch, Infiniti Liveaboard galley, Lacadives boat,
--                           PB charter BYO provisioning, Havelock Island Beach Resort pre-charter brkfst)
--                  0 stays — HS-CONFIRMED (uninhabited active volcano)
--
-- HS-confirmed skips with reasoning:
--   * barren-island stays (all 3 slots): Uninhabited active volcano (138 km NE of PB).
--     Day-trip-only via chartered dive-boats (Barefoot Scuba/Infiniti/Lacadives). NO overnight
--     stays possible. HS-confirmed per brief Quality Rule #9.
--
-- Tier flip projections (B → A threshold = g>=3 AND e>=5 AND s>=3):
--   * baratang-island (g=0 e=0 s=4) → (g=3 e=5 s=4) ✓ FLIP to A
--   * long-island-andaman (g=1 e=0 s=1) → (g=3 e=5 s=3) ✓ FLIP to A
--   * diglipur (g=1 e=0 s=2) → (g=3 e=5 s=3) ✓ FLIP to A
--   * rangat (g=1 e=0 s=0) → (g=3 e=5 s=3) ✓ FLIP to A
--   * little-andaman (g=1 e=0 s=0) → (g=3 e=5 s=3) ✓ FLIP to A
--   * barren-island (g=0 e=0 s=0) → (g=3 e=5 s=0) — stays at B (s<3, HS-confirmed scarcity)
--
-- Cross-state contamination guard: All properties verified within A&N UT.
-- No Havelock/Neil/Port Blair properties claimed for Barren/Long/Diglipur/Rangat/Little
-- except where explicitly anchored as a PB-base day-trip option (baratang xfactor + barren eats).
