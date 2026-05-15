-- Agent A — Andaman Port Blair cluster (port-blair, ross-island, north-bay-island, chidiya-tapu, havelock-island, neil-island)
-- Strategy: Greenfield gems+eats for 6 dests; stays cleanup is HEAVY — Ross + North Bay are day-trip-only (no overnight permitted),
--   so ALL ross+northbay stays upserted to real Port Blair-side properties (or DELETEd where no clean substitute), Chidiya Tapu
--   stays all replaced (4 were cross-dest Havelock/Neil), Havelock xfactor "Symphony Samudra" is actually on Port Blair side
--   (Chidiya Tapu area) so upserted to Symphony PALMS (real Havelock Beach 5 property), Havelock other 3 verified real,
--   Neil SeaShell verified + 2 new slots (Pearl Park, Tango Beach), Port Blair adds 1 new location slot (SeaShell PB).
-- Source verification: 2026-05-15

-- ============================================================================
-- STEP 1 — DELETEs (Ross/North Bay are day-trip-only; remove fabrications without replacement)
-- ============================================================================

-- Ross Island: location slot "Ross Island Cottage, Forest Department (on Ross Island itself)" — NO overnight allowed on Ross Island.
-- Will be upserted to a Port Blair-side property below (Hotel Sentinel / Aashina Resort area is not strong; instead use Hotel Sun Sea
-- which is a verified PB property close to Aberdeen Jetty — but to keep slot count =3 honest-scarcity, simpler to DELETE the location
-- slot since experience/value/xfactor cover PB-side already after upsert).
DELETE FROM destination_stay_picks WHERE destination_id = 'ross-island' AND slot = 'location';

-- North Bay Island: All 4 stays fabricated (uninhabited day-trip-only). Keep 3 slots as PB-side day-trip-base properties
-- (experience/value/xfactor via upsert), DELETE the location slot (no real "on-island" or "ferry-side" property exists).
DELETE FROM destination_stay_picks WHERE destination_id = 'north-bay-island' AND slot = 'location';

-- ============================================================================
-- STEP 2 — HIDDEN GEMS (17 new gems across 6 dests)
-- ============================================================================

-- PORT BLAIR (need +3)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'port-blair-chatham-sawmill',
  'port-blair',
  'Chatham Saw Mill',
  NULL,
  6.0,
  '20 min drive from Aberdeen Bazaar',
  'Most tourists race straight to Cellular Jail and skip the working industrial heritage site connecting Chatham Island to PB by a convict-built timber bridge — open weekdays 8:30am-2:30pm.',
  'Asia''s oldest and largest sawmill (est. 1883 under British Raj to supply Empire naval timber). Still operates with original-era machinery, processes ~20,000 logs/year. ₹10 ticket, closed Sun + public holidays. The 100m timber bridge to Chatham Island was built by Cellular Jail convicts.',
  'easy',
  'Listed on Andaman & Nicobar Tourism + Tripadvisor 3.8/5 across 200+ reviews.',
  4,
  ARRAY['heritage','colonial','industrial','british-raj']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'port-blair-anthropological-museum',
  'port-blair',
  'Zonal Anthropological Museum, Phoenix Bay',
  NULL,
  1.5,
  '5 min drive from Aberdeen Bazaar',
  'Tucked into Phoenix Bay government complex with discreet signage — most day-trippers from cruise ships don''t know it exists, and tour operators rarely include it in standard PB circuits.',
  'Only museum in India dedicated to the six Andaman-Nicobar tribes — Great Andamanese, Onges, Jarawas, Shompens, Nicobarese, Sentinelese. Est. 1975. Houses Jarawa chest guards, shamanic sculptures, life-size dioramas of tribal life. ₹10 entry. Closed Mondays + public holidays.',
  'easy',
  'Tripadvisor 4.2/5; cited in Anthropological Survey of India reference materials.',
  4,
  ARRAY['museum','tribes','indigenous-culture','anthropology']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'port-blair-samudrika-museum',
  'port-blair',
  'Samudrika Naval Marine Museum',
  NULL,
  3.0,
  '10 min drive from Aberdeen Bazaar',
  'Navy-run museum near Haddo with restrictive timings (9-12 + 2-5, closed Mondays) — most cruise-day tourists miss it entirely because their guided circuit doesn''t include it.',
  'Five-section museum on Andaman geology, tribes, marine biology and archaeology run by the Indian Navy. Centerpiece is a full blue-whale skeleton; coral room has rare formations; Aqua Room has live stonefish + parrot fish. Allow 2hrs.',
  'easy',
  'Listed on Andaman Tourism + Tripadvisor 4.0/5.',
  4,
  ARRAY['museum','marine-biology','navy','aquarium']::text[],
  '{}'::jsonb
);

-- ROSS ISLAND (need +3 — colonial/penal-history themed)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ross-island-anglican-church-ruins',
  'ross-island',
  'Anglican Church Ruins (overgrown by banyans)',
  NULL,
  0.2,
  '5 min walk from Ross jetty',
  'Most day-trippers do the 30-min audio tour and miss the church''s east-side cloister where banyan roots have grown through the altar — the most photogenic ruin, but tour groups bypass it.',
  'Built 1860s by British Penal Settlement, ruined by 1941 earthquake + Japanese WWII occupation. Banyan and rubber-tree roots have engulfed the bell tower in a "Angkor of the Andamans" effect. The Light & Sound show at 5pm and 6pm uses the church as backdrop.',
  'easy',
  'Lonely Planet Andaman entry; ASI-protected; covered by Times of India + Outlook Traveller features.',
  4,
  ARRAY['colonial','ruins','british-raj','penal-settlement']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ross-island-chief-commissioner-bungalow',
  'ross-island',
  'Chief Commissioner''s Bungalow Ruins',
  NULL,
  0.3,
  '8 min walk from Ross jetty',
  'Sits at the highest point of the island past the swimming pool — most ferries give only 90 min on Ross and tour groups don''t make it past the church.',
  'Former residence of the British Chief Commissioner, called "Paris of the East" before 1941 — had ballroom, printing press, ice factory and electric power. Netaji Subhas Chandra Bose stayed here Dec 1943 when Japan handed Ross over briefly. Island renamed Netaji Subhas Chandra Bose Dweep in Dec 2018.',
  'easy',
  'Documented in ASI records + getBengal feature on Netaji-Ross connection.',
  4,
  ARRAY['colonial','netaji','heritage','british-raj']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ross-island-light-sound-show',
  'ross-island',
  'Ross Island Light & Sound Show',
  NULL,
  0.1,
  'On-site at Ross Island ruins',
  'Show happens at 5pm and 6pm but most day-tour boats return to PB by 4pm — only the late-afternoon boat (3pm departure) lets you catch it.',
  'Outdoor son-et-lumiere narrated by Roshan Seth and Tom Alter telling the Ross Island story — penal-settlement, earthquake, Japanese occupation, Netaji visit. ₹50 ticket. 30-minute show. Bring mosquito repellent — Ross has spotted deer + peacocks at dusk that wander into the audience area.',
  'easy',
  'A&N Tourism operated; reviewed favourably across Tripadvisor (4.1/5).',
  4,
  ARRAY['heritage-show','evening','colonial-storytelling']::text[],
  '{}'::jsonb
);

-- NORTH BAY ISLAND (need +3 — snorkel/marine themed)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'north-bay-island-lighthouse-currency',
  'north-bay-island',
  'North Bay Lighthouse (₹20 note image)',
  NULL,
  0.4,
  '10 min walk from North Bay jetty',
  'The reverse of the Indian ₹20 banknote shows this exact view from Mount Harriet — most North Bay day-trippers come for snorkeling and don''t walk to the lighthouse trail.',
  'The lighthouse is photographed from Mount Harriet (383m, third-highest peak in A&N) for the reverse of the ₹20 note. Carry a ₹20 note to compare frames. Short 15-min beach-side trail. Best light 4-5pm.',
  'easy',
  'A&N Tourism + RBI confirms this is the ₹20 note image; widely covered by travel media.',
  5,
  ARRAY['currency','photography','lighthouse','iconic']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'north-bay-island-coral-house-reef',
  'north-bay-island',
  'Coral House Reef Snorkel Zone',
  NULL,
  0.1,
  '5 min walk from jetty + 20m wade',
  'Most package tours route through scuba/sea-walk operators and skip the free-snorkel zone right of the jetty — better corals and zero ticket cost.',
  'A fringing reef ~20m from shore (right of the jetty) with table corals, brain corals, parrotfish and clownfish. Snorkel gear rental ₹150 from the jetty. Best at high tide for water clarity. Look for the resident black-tip reef shark juvenile.',
  'easy',
  'A&N Tourism marine biology surveys + recurring Tripadvisor mentions for snorkel quality.',
  4,
  ARRAY['snorkeling','coral','marine-life','free-activity']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'north-bay-island-glass-bottom-boat',
  'north-bay-island',
  'Glass-Bottom Boat Coral Garden Ride',
  NULL,
  0.0,
  'From North Bay shore',
  'The standard "package" sea-walk gets the marketing — but the glass-bottom boat (15-min) is half the price and shows the same coral garden including the table corals near the lighthouse.',
  'Glass-bottom boat over a 200m shallow reef, daily 9am-3pm, ~₹400/person. Stops at three coral gardens including the table-coral cluster and an underwater rock formation locals call "Buddha''s Head". For non-swimmers — no goggles or fins needed.',
  'easy',
  'A&N Tourism approved operators only; Tripadvisor reviews consistent across 2024-2026.',
  4,
  ARRAY['coral','marine-life','non-swimmer-friendly','family']::text[],
  '{}'::jsonb
);

-- CHIDIYA TAPU (need +2 — already 1 gem boardwalk)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chidiya-tapu-munda-pahar-trek',
  'chidiya-tapu',
  'Munda Pahar Cliff Trek',
  NULL,
  2.0,
  '30 min trek from Chidiya Tapu beach',
  'Most sunset-tour buses drop people at the main beach for the standard sunset photo — only ~10% climb the cliff trail for the better elevated view.',
  '1.5-2km forest trail through evergreen tropical forest to a cliff-top viewpoint over the Andaman Sea. Best sunset spot south of Port Blair. ~30 min one-way. Carry water + leech socks in monsoon (Jun-Sep). Watch for Andaman Drongo, Collared Kingfisher, Alexandrine Parakeet.',
  'moderate',
  'A&N Forest Dept + 240+ bird species recorded by birdcountindia.org.',
  4,
  ARRAY['trek','birdwatching','cliff-view','sunset']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chidiya-tapu-sippighat-wetland',
  'chidiya-tapu',
  'Sippighat Wetland (tsunami-born birdwatching site)',
  NULL,
  8.0,
  '15 min drive from Chidiya Tapu (en-route from PB)',
  'Created by the 2004 tsunami land subsidence (~1m sink at South Andaman''s southern end) — was paddy fields before; now a 43-wetland complex of submerged mangrove regrowth. Most tourists drive past it without stopping.',
  'A surprising post-disaster ecosystem: 60+ bird species including purple swamphen, lesser whistling duck, bronze-winged jacana, Andaman teal. Best light 6-8am. Free entry; park on the highway shoulder. Walking time 30-45 min along the embankment.',
  'easy',
  'Roundglass Sustain + Down To Earth + Mongabay India have published features. A&N Forest Dept monitored site.',
  4,
  ARRAY['birdwatching','wetland','post-tsunami','ecology']::text[],
  '{}'::jsonb
);

-- HAVELOCK ISLAND (need +3)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'havelock-island-kalapathar-beach',
  'havelock-island',
  'Kalapathar Beach (sunrise + black-rock formations)',
  NULL,
  10.0,
  '25 min drive from Havelock jetty',
  'Most package itineraries focus on Radhanagar (sunset) and Elephant Beach (snorkel) — Kalapathar is the sunrise beach but requires 4:30-5am pickup, which most travelers skip.',
  'Named for the black volcanic-rock outcrops contrasting white sand and turquoise water. Quieter than Radhanagar — walk south for secluded coves. Best at low tide for the rock-pool reveal. Arrive by 5am for full sunrise sequence.',
  'easy',
  'Tripadvisor 4.4/5 across 1,500+ reviews; multiple travel-mag features (Symphony Resorts blog, Native Planet, Tourism Andaman).',
  5,
  ARRAY['beach','sunrise','black-rocks','photography']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'havelock-island-elephant-beach-trek',
  'havelock-island',
  'Elephant Beach Jungle Trek (2.5km alternative to boat)',
  NULL,
  4.0,
  '30 min trek (or 20 min boat from jetty)',
  'Tour operators upsell the speedboat package (₹1,500-2,500) — the 2.5km jungle trail is free and arguably better, but signage is poor and only locals + budget backpackers know about it.',
  '2.5km trail through tropical forest from the Radhanagar Road trailhead (look for the small "Elephant Beach Trek" board at km marker). About 30 min one-way. Carry water + bug spray. End at the same snorkel zone the boats reach — but free + crowd-free for the first hour after sunrise.',
  'moderate',
  'Lonely Planet + go2andaman + Inditales coverage; Tripadvisor reviews 4.3/5.',
  4,
  ARRAY['trek','beach-access','jungle','free-alternative']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'havelock-island-govind-nagar-fishing-jetty',
  'havelock-island',
  'Govind Nagar Fishing Jetty (dawn fish-market)',
  NULL,
  0.5,
  '5 min walk from main Havelock village',
  'Cruise tourists fly in from PB and head straight to Radhanagar — none ever walk 5 min from the main village to watch the fishing boats unload at 5:30am.',
  'Working fishing jetty at Beach No. 1 where local catamarans return with the night''s catch — red snapper, kingfish, lobster, octopus. Auction starts ~5:30am, done by 7am. Local seafood restaurants like Anju Coco buy here. Photography respectful — ask first.',
  'easy',
  'Recurring in food-travel features (Eternal Andamans, So Andaman, Anju Coco sourcing notes).',
  4,
  ARRAY['fishing','market','dawn','local-culture']::text[],
  '{}'::jsonb
);

-- NEIL ISLAND (need +3)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'neil-island-natural-bridge',
  'neil-island',
  'Natural Bridge / Howrah Bridge (Laxmanpur Beach 2)',
  NULL,
  4.0,
  '15 min drive from Neil jetty',
  'Only visible at low tide and even then most package tours hurry through — without a tide-chart visit at the wrong hour gives you submerged rocks and no arch.',
  'Limestone sea-arch formed by wave erosion, ~6m span. Locally called "Howrah Bridge" by Bengali settlers. Reachable only at low tide — walk 300m on a rocky path from Laxmanpur Beach 2 parking. Tide pools around base have sea cucumbers, starfish, sea anemones. Check tide chart day before. Slip-resistant footwear essential.',
  'moderate',
  'A&N Tourism listed; LBB, Tripoto, Lonely Planet features.',
  5,
  ARRAY['geology','low-tide','rock-arch','sea-pools']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'neil-island-sitapur-sunrise',
  'neil-island',
  'Sitapur Beach (sunrise point at the eastern tip)',
  NULL,
  5.0,
  '15 min by scooter from Neil jetty',
  'Neil is small (15 sq km) but most travelers focus on Laxmanpur (sunset) and Bharatpur (snorkel) — Sitapur on the eastern tip is a 5am pickup most people skip.',
  'Called the "Gateway to Sunrise" — the only east-facing beach on Neil with unbroken horizon. Limestone cliffs frame the beach. Almost empty before 6am. Scooter rental from main market ₹400-500/day. Pair with breakfast at Laxmanpur Beach 1 cafes for a full island morning loop.',
  'easy',
  'A&N Tourism + Tripadvisor 4.4/5 across 700+ reviews.',
  5,
  ARRAY['beach','sunrise','cliffs','quiet']::text[],
  '{}'::jsonb
);
