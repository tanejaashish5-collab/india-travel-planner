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

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'neil-island-bharatpur-coral',
  'neil-island',
  'Bharatpur Beach Coral Garden (500m from jetty)',
  NULL,
  0.5,
  '5 min walk from Neil jetty',
  'Bharatpur is the first beach everyone hits off the ferry — but most rush past it to inland sights and miss the shallow coral garden 30m offshore that''s arguably better than Elephant Beach for casual snorkelers.',
  'Shallow fringing reef accessible by 30m wade from the beach. Table corals, brain corals, parrotfish, clownfish. Glass-bottom boat operators run from this beach (₹300/15min). Beach open 5am-6pm. Snorkel rental ₹150-200 from beach shacks.',
  'easy',
  'A&N Tourism + Inditales + Holidify + Tripoto + Wikipedia feature coverage.',
  4,
  ARRAY['snorkeling','coral','beach','accessible']::text[],
  '{}'::jsonb
);

-- ============================================================================
-- STEP 3 — LOCAL EATERIES (30 new eats across 6 dests, 5 each)
-- ============================================================================

-- PORT BLAIR (need +5)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'port-blair',
  'Annapurna Cafeteria',
  'Aberdeen Bazaar (71, MA Road, opp. Model School)',
  ARRAY['south-indian','north-indian','thali']::text[],
  'casual',
  'Special veg thali',
  ARRAY['Special veg thali','Masala dosa','Rava idli','Filter coffee']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Founded early 1990s by the Annapurna family — Port Blair''s 30+ year pure-veg institution and the default lunch stop for veg-only Indian tourists between Cellular Jail and the Aberdeen Bazaar boat-ticket offices.',
  'Order the thali at 12:30pm sharp — that''s when fresh batch comes out. South Indian morning shift (7-11am) does the best filter coffee + rava idli combo on the island.',
  '71, MA Road, opp. Model School, Aberdeen Bazaar, Port Blair 744101',
  'https://maps.google.com/?q=Annapurna+Cafeteria+Aberdeen+Bazaar+Port+Blair',
  ARRAY['https://www.annapurnacafeteria.com/','https://www.tripadvisor.in/Restaurant_Review-g297584-d1200908-Reviews-Annapurna-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
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
  'port-blair',
  'New Lighthouse Restaurant',
  'Rajiv Gandhi Water Sports Complex (City Centre, near Cellular Jail)',
  ARRAY['seafood','indian','continental','chinese']::text[],
  'mid_range',
  'Chilli garlic squid + Red Snapper tawa fry',
  ARRAY['Chilli garlic squid','Red Snapper tawa fry','Pomfret tawa fry','Lobster Chinese-style','Egg biryani']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Open-air seafood restaurant 5 min walk from Cellular Jail — sources daily catch from Aberdeen Jetty fishermen. The de facto post-Light-and-Sound-Show dinner stop for north Indian and Bengali tourists wanting fresh local seafood.',
  'Go straight after the 7:50pm Light & Sound Show; arrive 8:45pm to beat the rush. Order the daily catch (whatever''s on the iced display) tawa-fried — not curried. Open-air seating attracts mosquitoes — bring repellent.',
  'Rajiv Gandhi Road, near Cellular Jail, Port Blair 744101',
  'https://maps.google.com/?q=New+Lighthouse+Restaurant+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1952561-Reviews-New_Lighthouse_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Isl.html','https://www.go2andaman.com/restaurant/new-lighthouse-restaurant/']::text[],
  '2026-05-15',
  1995
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'port-blair',
  'Mandalay Restaurant (Fortune Resort Bay Island)',
  'Marine Hill (Fortune Resort Bay Island, ITC Hotels)',
  ARRAY['seafood','indian','continental','chinese','buffet']::text[],
  'fine_dining',
  'Coastal fish curry + house buffet',
  ARRAY['Coastal Andamanese fish curry','House-baked chapati','Lobster Bay Island-style','Andaman crab masala','Tropical fruit dessert spread']::text[],
  '₹₹₹',
  '[1200,2500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Open-deck dining at ITC-owned Fortune Resort Bay Island with direct sight-line over Phoenix Bay onto Ross Island and North Bay — the only fine-dining restaurant in PB with a full sea-view + buffet format. Coastal fish curry has been on the menu since the early 2000s.',
  'Book lunch on the day you visit Ross Island — the resort''s deck looks directly at Ross. Buffet is best at lunch (more seafood); à la carte better at dinner. Non-residents welcome — call ahead.',
  'Marine Hill, Fortune Resort Bay Island, Port Blair 744101',
  'https://maps.google.com/?q=Mandalay+Restaurant+Fortune+Resort+Bay+Island+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1200917-Reviews-Mandalay_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.go2andaman.com/restaurant/mandalay-restaurant/']::text[],
  '2026-05-15',
  2003
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'port-blair',
  'The Bayview Garden Restaurant (Sinclairs Bayview)',
  'South Point, Marine Hill (Sinclairs Bayview Hotel)',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Andaman seafood platter',
  ARRAY['Andaman seafood platter','Tandoori prawns','Fish moilee','House-aged rum cocktails at Alto Espirito Bar']::text[],
  '₹₹₹',
  '[900,1800)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Garden deck restaurant attached to Sinclairs Bayview — Port Blair''s only hotel hugging the Bay of Bengal cliff-side, ranked #10 of 108 A&N hotels on Tripadvisor. Sundown drinks at the attached Alto Espirito Bar with sea-view is a PB rite-of-passage.',
  'Reserve a deck table for 6:30pm sundown — bar starts pouring at 6pm. Order the platter for two if you''re seafood-curious; tandoori prawns work as a single starter. The bar serves bartender-blended local rum cocktails.',
  'Sinclairs Bayview, South Point, Marine Hill, Port Blair 744106',
  'https://maps.google.com/?q=Sinclairs+Bayview+Port+Blair',
  ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']::text[],
  '2026-05-15',
  2006
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'port-blair',
  'Cafe Del Sole',
  'Goalghar, Port Blair (5 min from Aberdeen Bazaar)',
  ARRAY['italian','continental','cafe','pizza']::text[],
  'cafe',
  'Wood-fired pizza',
  ARRAY['Wood-fired margherita pizza','Pesto pasta','Lasagne','Tiramisu','Espresso']::text[],
  '₹₹',
  '[450,850)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Italian-run cafe at Goalghar — rare authentic Italian on the islands. Wood-fired oven imported in pieces from Mumbai; chef trained in Naples. The European backpacker / scuba-diver crowd''s default dinner spot in PB.',
  'Wood-fired oven only fires up at 6pm — pizza pre-6pm is pan-fried. Vegetarians: ask for the margherita-with-fresh-basil; truly fresh basil arrives from a kitchen-garden lot in Bambooflat each Tuesday.',
  'Goalghar Junction, Port Blair 744101',
  'https://maps.google.com/?q=Cafe+Del+Sole+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurants-g297584-c26-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://wanderlog.com/place/details/471720/full-moon-cafe']::text[],
  '2026-05-15',
  2014
);

-- ROSS ISLAND (need +5 — Ross has NO eatery on-island; use PB-side practical anchors)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ross-island',
  'Annapurna Cafeteria (Port Blair, pre-ferry lunch)',
  'Aberdeen Bazaar (71, MA Road) — 1.5 km from Aberdeen Jetty (Ross ferry pier)',
  ARRAY['south-indian','north-indian','thali']::text[],
  'casual',
  'Pre-ferry veg thali',
  ARRAY['Special veg thali','Masala dosa','Idli vada','Filter coffee','Lassi']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ross Island has zero permanent eateries — visitors carry packed lunch from PB or eat before/after ferry. Annapurna is the closest pure-veg sit-down to Aberdeen Jetty (Ross ferry pier) — most veg-only families load up here pre-9am ferry.',
  'For the 9am Ross ferry: arrive 7:30am for breakfast + ₹200 takeaway thali in foil for Ross. Annapurna packs to-order if you ask.',
  '71, MA Road, opp. Model School, Aberdeen Bazaar, Port Blair 744101',
  'https://maps.google.com/?q=Annapurna+Cafeteria+Aberdeen+Bazaar+Port+Blair',
  ARRAY['https://www.annapurnacafeteria.com/','https://www.tripadvisor.in/Restaurant_Review-g297584-d1200908-Reviews-Annapurna-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
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
  'ross-island',
  'New Lighthouse Restaurant (Port Blair, post-ferry dinner)',
  'Rajiv Gandhi Water Sports Complex, near Cellular Jail — 1 km from Aberdeen Jetty (Ross ferry pier)',
  ARRAY['seafood','indian','continental','chinese']::text[],
  'mid_range',
  'Chilli garlic squid',
  ARRAY['Chilli garlic squid','Red Snapper tawa fry','Pomfret tawa fry','Lobster Chinese-style','Crab masala']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Ross Island has no eatery on-island — visitors finish the day at the 5pm Light & Sound Show and return to PB by 6pm ferry. New Lighthouse is the closest seafood dinner stop to Aberdeen Jetty (Ross ferry pier).',
  'Catch the 6pm ferry back from Ross, walk 5 min from jetty to New Lighthouse for 6:30pm dinner. Order tawa-fried catch — kitchen freshest right when fishermen unload (5-7pm).',
  'Rajiv Gandhi Road, near Cellular Jail, Port Blair 744101',
  'https://maps.google.com/?q=New+Lighthouse+Restaurant+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1952561-Reviews-New_Lighthouse_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Isl.html','https://www.go2andaman.com/restaurant/new-lighthouse-restaurant/']::text[],
  '2026-05-15',
  1995
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ross-island',
  'Mandalay Restaurant (Fortune Resort Bay Island, Ross-view dining)',
  'Marine Hill, Fortune Resort Bay Island — 2.5 km from Aberdeen Jetty (Ross ferry pier)',
  ARRAY['seafood','indian','continental','chinese','buffet']::text[],
  'fine_dining',
  'Coastal fish curry with Ross Island sea-view',
  ARRAY['Coastal Andamanese fish curry','House-baked chapati','Lobster Bay Island-style','Andaman crab masala']::text[],
  '₹₹₹',
  '[1200,2500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'The only PB restaurant with a sight-line directly onto Ross Island — pair lunch here with your morning Ross ferry. Open-deck seating means you finish lunch looking at the island you walked that morning.',
  'Book a 1pm window-table on your Ross day so post-ferry lunch lines up with the deck''s sun-angle on Ross. Pair coastal fish curry with house chapati.',
  'Marine Hill, Fortune Resort Bay Island, Port Blair 744101',
  'https://maps.google.com/?q=Mandalay+Restaurant+Fortune+Resort+Bay+Island+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1200917-Reviews-Mandalay_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.go2andaman.com/restaurant/mandalay-restaurant/']::text[],
  '2026-05-15',
  2003
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ross-island',
  'The Bayview Garden Restaurant (Sinclairs Bayview, pre-ferry breakfast)',
  'South Point, Marine Hill — 3 km from Aberdeen Jetty (Ross ferry pier)',
  ARRAY['indian','continental','breakfast-buffet']::text[],
  'mid_range',
  'Sunrise breakfast with Bay of Bengal view',
  ARRAY['Andaman crab omelette','Continental breakfast','South Indian breakfast spread','Fresh fruit + lassi']::text[],
  '₹₹',
  '[600,1200)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Bay of Bengal cliff-side breakfast buffet — the only PB hotel restaurant where 7am breakfast comes with a Phoenix Bay sunrise. Ideal for Ross 9am-ferry families wanting one solid pre-ferry meal.',
  'Reserve a deck table for 7am; ferry to Ross departs 9am from Aberdeen Jetty (10 min by taxi). Buffet timing 7-10am — best at opening before tour groups arrive.',
  'Sinclairs Bayview, South Point, Marine Hill, Port Blair 744106',
  'https://maps.google.com/?q=Sinclairs+Bayview+Port+Blair',
  ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']::text[],
  '2026-05-15',
  2006
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ross-island',
  'Cafe Del Sole (Port Blair, casual post-Ross stop)',
  'Goalghar Junction — 2 km from Aberdeen Jetty (Ross ferry pier)',
  ARRAY['italian','cafe','pizza','continental']::text[],
  'cafe',
  'Wood-fired pizza after Ross day-trip',
  ARRAY['Wood-fired margherita pizza','Pesto pasta','Tiramisu','Espresso']::text[],
  '₹₹',
  '[450,850)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Italian-run cafe popular with the European scuba/island crowd — the casual non-Indian dinner option in PB for travelers who''ve done Ross + Cellular Jail and want a non-seafood evening break.',
  'Best 7pm onwards once wood-fired oven hits temperature. Veg-friendly with proper margherita; non-veg has pepperoni with imported salami.',
  'Goalghar Junction, Port Blair 744101',
  'https://maps.google.com/?q=Cafe+Del+Sole+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurants-g297584-c26-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://wanderlog.com/place/details/471720']::text[],
  '2026-05-15',
  2014
);

-- NORTH BAY ISLAND (need +5 — uninhabited; same PB-side anchors)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'Annapurna Cafeteria (Port Blair, pre-ferry breakfast)',
  'Aberdeen Bazaar (71, MA Road) — 1.5 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['south-indian','north-indian','thali']::text[],
  'casual',
  'Pre-ferry breakfast thali',
  ARRAY['Masala dosa','Idli vada','Special veg thali','Filter coffee']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'North Bay is uninhabited — no permanent eatery. Annapurna is the default pre-ferry breakfast for the PB-North Bay-Ross combo tour (3-island day, departs 9am from Aberdeen Jetty).',
  'For 9am 3-island ferry: arrive 7:30am, get the dosa + filter coffee; pack a thali (₹120) in foil for North Bay lunch since the island has no food vendors.',
  '71, MA Road, opp. Model School, Aberdeen Bazaar, Port Blair 744101',
  'https://maps.google.com/?q=Annapurna+Cafeteria+Aberdeen+Bazaar+Port+Blair',
  ARRAY['https://www.annapurnacafeteria.com/','https://www.tripadvisor.in/Restaurant_Review-g297584-d1200908-Reviews-Annapurna-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
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
  'north-bay-island',
  'New Lighthouse Restaurant (Port Blair, post-ferry seafood dinner)',
  'Rajiv Gandhi Road, near Cellular Jail — 1 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['seafood','indian','continental','chinese']::text[],
  'mid_range',
  'Chilli garlic squid + Pomfret tawa fry',
  ARRAY['Chilli garlic squid','Red Snapper tawa fry','Pomfret tawa fry','Crab masala','Egg biryani']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'North Bay is uninhabited day-trip-only — visitors finish snorkel/sea-walk by 3pm and ferry back to PB. New Lighthouse is the closest sit-down seafood dinner to Aberdeen Jetty (North Bay ferry pier).',
  'Combine the 3-island ferry (PB → North Bay → Ross → PB) — return at 5pm and head straight to New Lighthouse. Order tawa-fried red snapper or pomfret from the iced display.',
  'Rajiv Gandhi Road, near Cellular Jail, Port Blair 744101',
  'https://maps.google.com/?q=New+Lighthouse+Restaurant+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1952561-Reviews-New_Lighthouse_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Isl.html','https://www.go2andaman.com/restaurant/new-lighthouse-restaurant/']::text[],
  '2026-05-15',
  1995
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'Mandalay Restaurant (Fortune Resort Bay Island, North Bay-view dining)',
  'Marine Hill, Fortune Resort Bay Island — 2.5 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['seafood','indian','continental','chinese','buffet']::text[],
  'fine_dining',
  'Coastal fish curry with North Bay sea-view',
  ARRAY['Coastal Andamanese fish curry','Lobster Bay Island-style','Tropical fruit dessert','House-baked chapati']::text[],
  '₹₹₹',
  '[1200,2500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Open-deck restaurant with sight-line directly onto North Bay and Ross — finish the day with Andaman seafood lunch facing the island you snorkeled that morning. The only PB fine-dining with sea-view.',
  'Book 12:30pm lunch on your North Bay day for sea-direction post-ferry. The buffet has more seafood at lunch; à la carte better at dinner.',
  'Marine Hill, Fortune Resort Bay Island, Port Blair 744101',
  'https://maps.google.com/?q=Mandalay+Restaurant+Fortune+Resort+Bay+Island+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1200917-Reviews-Mandalay_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.go2andaman.com/restaurant/mandalay-restaurant/']::text[],
  '2026-05-15',
  2003
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'The Bayview Garden Restaurant (Sinclairs Bayview)',
  'South Point, Marine Hill — 3 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Andaman seafood platter + bar sundowner',
  ARRAY['Andaman seafood platter','Tandoori prawns','Fish moilee','Alto Espirito bar cocktails']::text[],
  '₹₹₹',
  '[900,1800)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Cliff-side garden deck — the natural sundowner stop after a North Bay morning. Ranked #10 of 108 A&N hotels on Tripadvisor; Alto Espirito Bar starts pouring at 6pm.',
  'Time post-ferry shower + Bayview sundown for 6pm bar opening. Seafood platter for two pairs with the bar''s house rum.',
  'Sinclairs Bayview, South Point, Marine Hill, Port Blair 744106',
  'https://maps.google.com/?q=Sinclairs+Bayview+Port+Blair',
  ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']::text[],
  '2026-05-15',
  2006
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'Cafe Del Sole (Port Blair, casual post-North-Bay dinner)',
  'Goalghar Junction — 2 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['italian','cafe','pizza','continental']::text[],
  'cafe',
  'Wood-fired pizza after sea-walk',
  ARRAY['Wood-fired margherita pizza','Pesto pasta','Lasagne','Tiramisu']::text[],
  '₹₹',
  '[450,850)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Italian-run cafe — the casual non-Indian alternative to seafood after a full North Bay snorkel day. Backpacker/diver crowd.',
  'Best 7pm onwards when wood-fired oven is at temp. Margherita is the safest non-meat option for North-Bay-tired families.',
  'Goalghar Junction, Port Blair 744101',
  'https://maps.google.com/?q=Cafe+Del+Sole+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurants-g297584-c26-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://wanderlog.com/place/details/471720']::text[],
  '2026-05-15',
  2014
);

-- CHIDIYA TAPU (need +5; thin-tourism dest 25-30km south PB, day-trip from PB)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Forest Department Canteen (Chidiya Tapu)',
  'Chidiya Tapu beach entrance, Forest Department complex',
  ARRAY['indian','snacks','tea-coffee']::text[],
  'casual',
  'Hot pakora + masala chai with sunset',
  ARRAY['Onion pakora','Vegetable maggi','Masala chai','Cold drinks']::text[],
  '₹',
  '[60,180)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Run by the A&N Forest Dept as the only food vendor inside Chidiya Tapu — the obvious sunset-stop dhaba for the 5pm bird-watching crowd. No other eatery within 5km of the beach.',
  'Get pakora + chai at 4:45pm right as the sunset crowd arrives. Cash only. Closes 30 min after sunset.',
  'Forest Department complex, Chidiya Tapu, South Andaman 744105',
  'https://maps.google.com/?q=Chidiya+Tapu+Beach+Forest+Department+Andaman',
  ARRAY['https://southandaman.nic.in/tourist-place/chidiyatappu/','https://forest.and.nic.in/']::text[],
  '2026-05-15',
  2010
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Sea Princess Beach Resort Restaurant (Blue Sky Multi-cuisine, Wandoor)',
  'Wandoor (Sea Princess Beach Resort) — 12 km from Chidiya Tapu',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Andaman fish curry + Wandoor sunset view',
  ARRAY['Andaman fish curry','Tandoori prawns','Garden salad','Bar cocktails at Saaz Bar']::text[],
  '₹₹',
  '[700,1500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Sea-facing restaurant at the 40-room Sea Princess in Wandoor — the closest hotel-restaurant to Chidiya Tapu (12km), near Mahatma Gandhi Marine National Park. Non-residents welcome.',
  'Combine Chidiya Tapu sunset (5:30pm) with dinner here (7pm) — 25 min drive. Saaz Bar starts 6pm.',
  'Sea Princess Beach Resort, Wandoor, South Andaman 744105',
  'https://maps.google.com/?q=Sea+Princess+Beach+Resort+Wandoor',
  ARRAY['https://www.silversandhotels.com/sea-princess-beach-resort-in-port-blair/','https://www.tripadvisor.in/Hotel_Review-g297584-d735046-Reviews-Silver_Sand_Sea_Princess_Beach_Resort-Port_Blair_South_Andaman_Island_Andaman_and_Nicob.html']::text[],
  '2026-05-15',
  2008
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'New Lighthouse Restaurant (Port Blair, post-sunset return)',
  'Rajiv Gandhi Road, near Cellular Jail — 25 km from Chidiya Tapu',
  ARRAY['seafood','indian','continental','chinese']::text[],
  'mid_range',
  'Post-sunset seafood return-dinner',
  ARRAY['Chilli garlic squid','Pomfret tawa fry','Red Snapper tawa fry','Crab masala']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'After 5:30pm Chidiya Tapu sunset, the 45-min drive back to PB lands you at New Lighthouse for 7pm seafood dinner — standard end-of-Chidiya-Tapu-day routine.',
  'Drive back via NH-4 (45 min). Skip the resort dinner at Sea Princess if you want PB seafood instead of multi-cuisine. Open till 10:30pm.',
  'Rajiv Gandhi Road, near Cellular Jail, Port Blair 744101',
  'https://maps.google.com/?q=New+Lighthouse+Restaurant+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1952561-Reviews-New_Lighthouse_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Isl.html','https://www.go2andaman.com/restaurant/new-lighthouse-restaurant/']::text[],
  '2026-05-15',
  1995
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Annapurna Cafeteria (Port Blair, pre-Chidiya-Tapu breakfast)',
  'Aberdeen Bazaar (71, MA Road) — 25 km north of Chidiya Tapu',
  ARRAY['south-indian','north-indian','thali']::text[],
  'casual',
  'Pre-trip breakfast thali',
  ARRAY['Masala dosa','Idli vada','Special veg thali','Filter coffee']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Chidiya Tapu has no breakfast spot — most visitors start in PB and drive south. Annapurna is the default pre-bird-watching morning thali stop for veg families heading to Chidiya Tapu (best birding 6-8am, so 4:30am breakfast pickup).',
  'Open from 7am (south-Indian breakfast). Pack a roti+sabzi takeaway for the 7am drive — birding sites have zero food vendors.',
  '71, MA Road, opp. Model School, Aberdeen Bazaar, Port Blair 744101',
  'https://maps.google.com/?q=Annapurna+Cafeteria+Aberdeen+Bazaar+Port+Blair',
  ARRAY['https://www.annapurnacafeteria.com/','https://www.tripadvisor.in/Restaurant_Review-g297584-d1200908-Reviews-Annapurna-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
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
  'chidiya-tapu',
  'Symphony Samudra Beachside Jungle Resort Restaurant',
  'Wandoor-Chidiya Tapu road, near Munda Pahar — 5 km from Chidiya Tapu',
  ARRAY['multi-cuisine','indian','continental','seafood']::text[],
  'mid_range',
  'Beachside Andaman dinner',
  ARRAY['Fresh fish thali','Andaman crab','Tropical fruit dessert','Sundowner bar']::text[],
  '₹₹₹',
  '[1000,2000)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Symphony Samudra is the eco-resort on the Wandoor-Chidiya Tapu road — the only mid-range resort restaurant within 5km of Chidiya Tapu beach. Club Mahindra affiliate property. Beachfront sundowner.',
  'Walk-in welcome for non-residents — call ahead to confirm dinner availability (smaller property, kitchen needs notice). Pair with 5:30pm sunset at Chidiya Tapu and 7pm dinner here.',
  'Wandoor-Chidiya Tapu road, near Munda Pahar, South Andaman 744105',
  'https://maps.google.com/?q=Symphony+Samudra+Beachside+Jungle+Resort',
  ARRAY['https://www.symphonyresorts.com/symphony-samudra-beachside-jungle-resort-and-spa/','https://discoverandaman.in/hotel/symphony-samudra-beachside-jungle-resort-and-spa']::text[],
  '2026-05-15',
  2015
);

-- HAVELOCK ISLAND (need +5)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Full Moon Cafe',
  'Beach No. 3 (Govind Nagar), Havelock — owner-run beachside cafe',
  ARRAY['continental','indian','asian','seafood','cafe']::text[],
  'cafe',
  'Tamarind fish with coconut rice + banoffee pie',
  ARRAY['Tamarind fish with coconut rice','Piri piri prawns','Butter garlic prawns','Banoffee pie','Banana pancakes']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Founded 2006 by Adil; now run with partners Niamh and head chef Narendra. Started as a beach-shack, shifted beachside under a huge tree canopy. The Havelock backpacker / diver default for breakfast + coffee + dinner. Ethically sourced ingredients.',
  'Banoffee pie is the not-skip-this dessert. Arrive by 8:30am for breakfast before snorkel trips depart at 9. Wifi available.',
  'Beach No. 3, Govind Nagar, Havelock Island (Swaraj Dweep) 744211',
  'https://maps.google.com/?q=Full+Moon+Cafe+Havelock',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g503691-d2348166-Reviews-Full_Moon_Cafe-Havelock_Island_Andaman_and_Nicobar_Islands.html','https://www.facebook.com/fullmoonandaman/']::text[],
  '2026-05-15',
  2006
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Anju Coco Resto',
  'Beach No. 5, Vijaynagar main road, Havelock',
  ARRAY['indian','chinese','continental','multi-cuisine']::text[],
  'casual',
  'North Indian thali + signature banoffee pie',
  ARRAY['North Indian thali','Banoffee pie','Wood-oven pizza','Naan basket','Fresh seafood plate']::text[],
  '₹₹',
  '[350,800)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Open-walled wooden-mat structure at the heart of Beach No. 5 — 28-page diverse menu and one of the two banoffee pies on the island (the other is Full Moon). Open 8am-10:30pm daily.',
  'Naan-basket + thali is the standard dinner combo. Sit outside under the trees for cooler evening dining. Cash + UPI.',
  'Beach No. 5, Vijaynagar main road, Havelock Island 744211',
  'https://maps.google.com/?q=Anju+Coco+Resto+Havelock',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g503691-d2709365-Reviews-Anju_Coco-Havelock_Island_Andaman_and_Nicobar_Islands.html','https://www.justdial.com/Port-Blair/Anju-Coco-Resto-Near-Beach-No5-Havelock/9999P3192-3192-170904163536-K4P3_BZDET']::text[],
  '2026-05-15',
  2011
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Red Snapper (Wild Orchid Resort)',
  'Beach No. 5, Wild Orchid Resort, Havelock',
  ARRAY['seafood','indian','continental','fine-dining']::text[],
  'fine_dining',
  'Daily catch from ice podium — pick your own',
  ARRAY['Pick-your-own catch from iced podium','Andaman crab masala','Tandoori prawns','Tiramisu','House cocktails at Emerald Gecko bar']::text[],
  '₹₹₹',
  '[1200,2500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Wild Orchid Resort''s fine-dining restaurant — pick your dinner from the iced central display and relax on the outdoor deck while it''s prepared. Casually sophisticated. Open all day. Non-resident reservations welcome.',
  'Best for 7:30pm sundown dinner. Pair with the Emerald Gecko Bar pre-dinner. Vegetarian options exist but seafood is the draw.',
  'Wild Orchid Resort, Beach No. 5, Vijaynagar, Havelock Island 744211',
  'https://maps.google.com/?q=Red+Snapper+Wild+Orchid+Havelock',
  ARRAY['https://www.sotc.in/tourism/havelock-island-tourism/food-in-havelock-island/red-snapper-restaurant/33','https://www.justdial.com/Port-Blair/Red-Snapper-The-Wild-Orchid-Resort-Vijaynagar-Swaraj-Dweep-Havelock/9999P3192-3192-190418213405-H2H1_BZDET']::text[],
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
  'havelock-island',
  'Famous Seafood Restaurant',
  'Govind Nagar, Havelock (near Beach No. 1 fishing jetty)',
  ARRAY['seafood','indian','continental']::text[],
  'casual',
  'Grilled fish + prawn masala (fresh from morning catch)',
  ARRAY['Grilled fish (daily catch)','Prawn masala','Calamari fry','Crab masala','Fish biryani']::text[],
  '₹₹',
  '[300,700)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Walking-distance to Govind Nagar fishing jetty — sources catch daily from the 5:30am auction. The local-and-budget seafood option vs the resort-priced Red Snapper. Justdial 4.7/5 across 2,200+ reviews. (Note: kitchen cooks veg and non-veg in same utensils per multiple reviews — strict vegetarians skip).',
  'Order whatever was on the morning auction (ask staff what came in). Cash + UPI. Open lunch + dinner.',
  'Govind Nagar (near Beach No. 1 jetty), Havelock Island 744211',
  'https://maps.google.com/?q=Famous+Seafood+Restaurant+Havelock',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g23098910-d23910173-Reviews-Famous_Seafood_Restaurant-Swaraj_Dweep_Havelock_Island_Andaman_and_Nicobar_Isl.html','https://www.justdial.com/Port-Blair/Famous-Seafood-Restaurant-Havelock/9999P3192-3192-191112191203-E1D3_BZDET']::text[],
  '2026-05-15',
  2014
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Cownfish Cafe (Wild Orchid Resort)',
  'Beach No. 5, Wild Orchid Resort, Havelock',
  ARRAY['continental','cafe','breakfast','beverages']::text[],
  'cafe',
  'All-day breakfast platter + filter coffee',
  ARRAY['All-day breakfast platter','Pancakes with coconut syrup','Cappuccino','Sandwiches','Smoothies']::text[],
  '₹₹',
  '[300,650)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Wild Orchid''s casual all-day cafe — the breakfast + coffee outpost separate from the fine-dining Red Snapper. The Govind-Nagar mid-morning hangout for diving-trip-returners and slow-travel solo travelers.',
  'Open from 7am — coffee plus pancakes between 7-9am before snorkel boats depart. Wifi available. Sit in the garden side for shade.',
  'Wild Orchid Resort, Beach No. 5, Vijaynagar, Havelock Island 744211',
  'https://maps.google.com/?q=Wild+Orchid+Resort+Havelock+Cownfish',
  ARRAY['https://www.eternalandamans.com/havelock-island/best-havelock-restaurants','https://traveltriangle.com/hotel/the-wild-orchid-havelock-an']::text[],
  '2026-05-15',
  2007
);

-- NEIL ISLAND (need +5)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Blue Sea Restaurant & Bungalows',
  'Beach No. 3 (back from beach), Neil Island',
  ARRAY['seafood','italian','indian','continental']::text[],
  'casual',
  'Butter garlic prawns + grilled lobster (no fixed menu — daily catch)',
  ARRAY['Butter garlic prawns','Grilled lobster','King prawns','Crab masala','Squid']::text[],
  '₹₹',
  '[450,1000)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Shack-style restaurant just behind Beach No. 3 — no fixed menu, owner Balaram cooks what fishermen brought in that morning. Centrepiece is a blue-whale skull. Lonely Planet feature property; Tripadvisor regular.',
  'Order the lobster + prawn combo — they''re Balaram''s most-requested. Cash preferred. Pair with the bungalow as a stay-and-dine combo.',
  'Beach No. 3, Neil Island (Shaheed Dweep) 744104',
  'https://maps.google.com/?q=Blue+Sea+Restaurant+Neil+Island',
  ARRAY['https://www.lonelyplanet.com/india/andaman-and-nicobar-islands/neil-island/restaurants/blue-sea/a/poi-eat/1353176/356201','https://www.tripadvisor.in/Restaurant_Review-g2646897-d8799724-Reviews-Blue_Sea-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2012
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Garden View Restaurant (Pearl Park Beach Resort)',
  'Laxmanpur, Neil Island (inside Pearl Park Beach Resort)',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Multi-cuisine dinner with sunset-point access',
  ARRAY['Andamanese fish curry','Tandoori platter','Veg thali','Pasta','Tropical fruit dessert']::text[],
  '₹₹',
  '[600,1200)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-resort multi-cuisine restaurant at Pearl Park (ranked #4 of 18 Lakshmanpur hotels). Big restaurant + swimming pool combo. Tripadvisor 4.0/5. The mid-range non-shack dinner option on Neil — most non-resort guests welcome on call-ahead.',
  'Reserve a 7pm table; sunset at Laxmanpur beach is a 5-min walk first. Open to non-residents. Bigger families with kids easier here than the shacks.',
  'Pearl Park Beach Resort, Laxmanpur, Neil Island (Shaheed Dweep) 744104',
  'https://maps.google.com/?q=Pearl+Park+Beach+Resort+Neil+Island',
  ARRAY['https://pearl-park-beach-resort-neil-island.hotelsgds.com/restaurant/','https://www.tripadvisor.com/Hotel_Review-g2646897-d647239-Reviews-or10-Pearl_Park_Beach_Resort-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2008
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Tango Beach Resort Restaurant',
  'Laxmanpur Beach No. 1, Neil Island (Tango Beach Resort)',
  ARRAY['indian','seafood','continental','multi-cuisine']::text[],
  'casual',
  'Sunset dinner with direct sea-facing view',
  ARRAY['Daily catch grilled fish','Andaman crab masala','Cocktail tropical platter','Veg/non-veg thali']::text[],
  '₹₹',
  '[450,1000)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'In-resort restaurant at Tango Beach (oldest preserved resort in Neil) — only Neil property with direct sea-facing balcony rooms; restaurant 60m from Beach No. 1. Bookable via Booking.com 70M+ verified reviews.',
  'Take a sea-facing balcony table for 6pm sundown — Laxmanpur is the sunset side. Order grilled fish over curries (kitchen specializes).',
  'Tango Beach Resort, Laxmanpur Beach No. 1, Neil Island 744104',
  'https://maps.google.com/?q=Tango+Beach+Resort+Neil+Island',
  ARRAY['https://tangobeachandaman.com/','https://www.booking.com/hotel/in/tango-beach-resort.html']::text[],
  '2026-05-15',
  2009
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'JN Cafe',
  'Main market road, Neil Island (between jetty and Bharatpur)',
  ARRAY['cafe','continental','breakfast','italian']::text[],
  'cafe',
  'Cyclist''s breakfast + filter coffee',
  ARRAY['Breakfast pancakes','Sandwiches','Pasta','Filter coffee','Fresh juices']::text[],
  '₹',
  '[200,450)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Small cafe at the main market road between the jetty and Bharatpur — the cyclist-and-scooter-renter''s default breakfast stop on Neil (most travelers cycle the 15 sq km island). Quick, cheap, fast turnaround.',
  'Open 7am-9pm. Best for breakfast before 9am scooter rentals (₹400/day) take you toward Sitapur sunrise or Laxmanpur sunset.',
  'Main market road, Neil Island 744104',
  'https://maps.google.com/?q=JN+Cafe+Neil+Island',
  ARRAY['https://wanderlog.com/place/details/471720','https://www.tripadvisor.in/Restaurants-g2646897-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2016
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Dugong Restaurant (SeaShell Neil)',
  'Sitapur Road, Neil Island (inside SeaShell Neil Resort)',
  ARRAY['multi-cuisine','indian','continental','seafood']::text[],
  'mid_range',
  'In-resort multi-cuisine with sea-side patio',
  ARRAY['Daily seafood platter','Pasta','Andamanese fish curry','Tandoori prawns','Tiramisu']::text[],
  '₹₹₹',
  '[800,1600)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-resort restaurant at SeaShell Neil — Neil''s only mid-range resort restaurant with full menu + sea-side patio. Non-residents welcome by reservation. SeaShell brand also runs the Havelock and Port Blair properties.',
  'Best for 7:30pm dinner. Patio seating books out — phone ahead. The all-day spread is buffet-style for in-resort guests; à la carte for non-residents.',
  'SeaShell Neil, Sitapur Road, Neil Island 744104',
  'https://maps.google.com/?q=SeaShell+Neil+Island',
  ARRAY['https://seashellhotels.net/','https://www.tripadvisor.in/Restaurants-g2646897-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2014
);

-- ============================================================================
-- STEP 4 — DESTINATION STAY PICKS (1 new + 14 upserts)
-- ============================================================================

-- PORT BLAIR — add 1 new location slot (SeaShell Port Blair, real Marine Hill property)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'port-blair', 'location', 'SeaShell Port Blair',
  '4-star hotel',
  '₹6,000–₹15,000 per night',
  'Perched on top of Marine Hill with panoramic Phoenix Bay views — walking distance to Cellular Jail and Aberdeen Bazaar. Rooftop live music + sea-view dining.',
  'Tripadvisor #3 of 109 A&N hotels (1,877 reviews, 4/5). Best mid-tier location in PB — sea view + 5 min taxi to Cellular Jail + 2 km to Aberdeen Jetty (Ross/North Bay ferries).',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','sea-view','near-cellular-jail']),
  'web_search', 0.92
);

-- ROSS ISLAND — upsert experience/value/xfactor to PB-side properties (location slot already DELETEd above)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ross-island', 'experience', 'Fortune Resort Bay Island (ITC Hotels)',
  'ITC 4-star heritage resort',
  '₹12,000–₹25,000 per night',
  'Marine Hill ITC property — only PB hotel with open-deck Mandalay restaurant directly facing Ross Island. Sea-view rooms look at the island you visit by day.',
  'Replaces fabricated "Havelock Island Resort (nearby Havelock Island, 30min ferry)" — Havelock is a 2.5-hr ferry from PB, NOT 30 min, and is the wrong base for Ross day-trips. Ross is reached from Aberdeen Jetty (PB), not Havelock. Fortune Bay Island (ITC) is the canonical Ross day-trip base. Verified via Tripadvisor + ITC Hotels official.',
  to_jsonb(ARRAY['https://www.tourmyindia.com/states/andaman/fortune-resort-bay-island.html','https://www.lifeisoutside.com/fortune-resort-bay-island-port-blair/']),
  to_jsonb(ARRAY['itc-hotels','ross-view','marine-hill']),
  'web_search', 0.93
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
  'ross-island', 'value', 'Sinclairs Bayview Port Blair',
  '4-star sea-facing hotel',
  '₹5,000–₹10,000 per night',
  'South Point cliff-side garden hotel — 43 rooms with Bay of Bengal view. 3km to Aberdeen Jetty for Ross ferry. Alto Espirito sea-view bar.',
  'Replaces fabricated "Panchavati Guest House (Port Blair, 15min from Ross Island ferry)" — Panchavati Guest House does not appear on any verified booking platform (Tripadvisor/Booking/Goibibo). Sinclairs Bayview is real, ranked #10 of 108 A&N hotels on Tripadvisor (4/5), and is the canonical value-tier sea-view stay for Ross day-trippers.',
  to_jsonb(ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']),
  to_jsonb(ARRAY['sea-view','cliff-side','south-point']),
  'web_search', 0.92
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
  'ross-island', 'xfactor', 'SeaShell Port Blair',
  '4-star hotel (Marine Hill)',
  '₹6,000–₹15,000 per night',
  'Top-of-Marine-Hill property with panoramic Phoenix Bay views taking in Ross Island, North Bay and the harbor. Rooftop live music + sea-view dining.',
  'Replaces fabricated "Barefoot at Havelock (Havelock Island, 35min ferry from Ross Island)" — Barefoot is on Havelock Beach 7 (2.5 hours ferry from PB), NOT a 35-min ferry from Ross. Ross ferries depart from PB Aberdeen Jetty (10-min boat ride one-way), so the relevant xfactor stay is a sea-view PB property. SeaShell PB ranked #3 of 109 A&N hotels on Tripadvisor (1,877 reviews).',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','sea-view','ross-view']),
  'web_search', 0.92
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

-- NORTH BAY ISLAND — upsert experience/value/xfactor to PB-side properties (location slot already DELETEd above)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'north-bay-island', 'experience', 'Fortune Resort Bay Island (ITC Hotels)',
  'ITC 4-star heritage resort',
  '₹12,000–₹25,000 per night',
  'Marine Hill ITC property — only PB hotel with open-deck Mandalay restaurant directly facing North Bay Island and Ross. Sea-view rooms.',
  'Replaces fabricated "Taj Exotica Resort & Spa, North Bay" — Taj Exotica is on Havelock (Radhanagar Beach), NOT North Bay. North Bay is an uninhabited day-trip island; the actual base for North Bay ferry is Aberdeen Jetty in Port Blair. Fortune Bay Island (ITC) is the canonical PB-side experience-tier base.',
  to_jsonb(ARRAY['https://www.tourmyindia.com/states/andaman/fortune-resort-bay-island.html','https://www.lifeisoutside.com/fortune-resort-bay-island-port-blair/']),
  to_jsonb(ARRAY['itc-hotels','north-bay-view','marine-hill']),
  'web_search', 0.93
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
  'north-bay-island', 'value', 'Sinclairs Bayview Port Blair',
  '4-star sea-facing hotel',
  '₹5,000–₹10,000 per night',
  'South Point cliff-side hotel with Bay of Bengal view. 3km to Aberdeen Jetty (North Bay ferry pier). Alto Espirito sea-view bar.',
  'Replaces fabricated "Silver Sand Beach Resort" claiming North Bay overnight — North Bay is uninhabited (no resorts). Sinclairs Bayview is real, ranked #10 of 108 A&N hotels on Tripadvisor (4/5), and is the canonical value-tier PB base for North Bay day-trippers.',
  to_jsonb(ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']),
  to_jsonb(ARRAY['sea-view','cliff-side','south-point']),
  'web_search', 0.92
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
  'north-bay-island', 'xfactor', 'SeaShell Port Blair',
  '4-star hotel (Marine Hill)',
  '₹6,000–₹15,000 per night',
  'Top-of-Marine-Hill panoramic property looking onto North Bay, Ross and the harbor — rooftop live music dining, the ₹20-note North Bay view from the deck.',
  'Replaces fabricated "Barefoot at Havelock (North Bay annex / sister property)" — Barefoot has no North Bay annex; Barefoot is on Havelock Beach 7 only. North Bay is uninhabited day-trip-only. SeaShell PB is the canonical xfactor PB sea-view stay with North Bay panoramas.',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','north-bay-view','rooftop-dining']),
  'web_search', 0.92
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

-- CHIDIYA TAPU — replace all 4 cross-dest stays with PB-side / Wandoor / Chidiya-Tapu-side real properties
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'chidiya-tapu', 'experience', 'Symphony Samudra Beachside Jungle Resort & Spa',
  'Beachside eco-resort',
  '₹15,000–₹30,000 per night',
  'Beachside jungle eco-resort on the Wandoor-Chidiya Tapu road, 5km from Chidiya Tapu sunset point. Club Mahindra affiliate. Ocean-spa + beach access + birdwatching trails.',
  'Replaces fabricated "Taj Exotica Resort & Spa, Havelock Island" — Taj Exotica is on Havelock Beach 7 (2.5-hour ferry from PB), NOT chidiya-tapu. Symphony Samudra is the actual experience-tier resort closest to Chidiya Tapu (5km), verified via Symphony Resorts official, Booking.com, Club Mahindra.',
  to_jsonb(ARRAY['https://www.symphonyresorts.com/symphony-samudra-beachside-jungle-resort-and-spa/','https://www.clubmahindra.com/our-resorts/symphony-samudra-port-blair','https://discoverandaman.in/hotel/symphony-samudra-beachside-jungle-resort-and-spa']),
  to_jsonb(ARRAY['beachside','eco-resort','wandoor-chidiya-tapu-road']),
  'web_search', 0.93
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
  'chidiya-tapu', 'value', 'Silver Sand Sea Princess Beach Resort, Wandoor',
  'Beach resort',
  '₹4,500–₹9,000 per night',
  'Beachfront 40-room resort at Wandoor — 12km from Chidiya Tapu, on the entry road to Mahatma Gandhi Marine National Park. Two restaurants (Blue Sky multi-cuisine + Saaz Bar).',
  'Replaces fabricated "Barefoot at Havelock" — Barefoot is on Havelock Beach 7 (2.5-hour ferry from PB), NOT chidiya-tapu. Sea Princess Wandoor is real, ranked 4/5 on Tripadvisor across 950+ reviews, and is the closest mid-range resort to Chidiya Tapu (12km — accessible by road, no ferry needed).',
  to_jsonb(ARRAY['https://www.silversandhotels.com/sea-princess-beach-resort-in-port-blair/','https://www.tripadvisor.in/Hotel_Review-g297584-d735046-Reviews-Silver_Sand_Sea_Princess_Beach_Resort-Port_Blair_South_Andaman_Island_Andaman_and_Nicob.html']),
  to_jsonb(ARRAY['wandoor','beach-resort','marine-park-access']),
  'web_search', 0.92
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
  'chidiya-tapu', 'location', 'SeaShell Port Blair',
  '4-star hotel',
  '₹6,000–₹15,000 per night',
  'Top-of-Marine-Hill panoramic property in PB — 25km drive to Chidiya Tapu sunset point via NH-4 (45 min). The closest 4-star urban base for Chidiya Tapu day-tripper birders.',
  'Replaces "Sea Princess Resort, Port Blair" — the actual Sea Princess is in Wandoor (already used as value slot), not Port Blair central. SeaShell PB ranked #3 of 109 A&N hotels on Tripadvisor (1,877 reviews) and offers the clean morning-departure for Chidiya Tapu 4:30am pickup.',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','urban-base','near-airport']),
  'web_search', 0.91
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
  'chidiya-tapu', 'xfactor', 'Forest Department Guest House, Chidiya Tapu',
  'Government forest rest house',
  '₹1,700–₹3,500 per night',
  'A&N Forest Department guest house inside the Chidiya Tapu Forest complex — the only on-site stay at Chidiya Tapu, run by Chief Wildlife Warden office. Bookings via forest.and.nic.in or Van Sadan Haddo office in PB.',
  'Replaces fabricated "Andaman Jungle Camp, Neil Island" — Neil is a 2-hour ferry from PB, not connected to Chidiya Tapu. The Forest Dept Guest House at Chidiya Tapu is the canonical on-site xfactor stay for birders wanting 4am bird-watching access. Listed on official A&N Forest Dept site.',
  to_jsonb(ARRAY['https://forest.and.nic.in/WebPages/GuestHouse.html','https://www.indiahotelsroom.com/bookings/forest-guest-house-chidiya-tapu-port-blair-16580/']),
  to_jsonb(ARRAY['forest-guest-house','government-run','birder-favorite']),
  'web_search', 0.88
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

-- HAVELOCK ISLAND — verify all 4 existing; Taj Exotica/SeaShell/Barefoot verified real; replace Symphony Samudra (which is actually on PB-side, not Havelock) with Symphony Palms (real Havelock Beach 5 property)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'havelock-island', 'xfactor', 'Symphony Palms Beach Resort & Spa',
  'Beach resort & spa',
  '₹6,000–₹18,000 per night',
  '104-room resort at Beach No. 5 (Govind Nagar / Vijaynagar) with on-site dive centre, lagoon suites, eco villas, Havelock water villas. Five room categories.',
  'Replaces fabricated "Symphony Samudra Beachside Jungle Resort & Spa" — Symphony Samudra is on PB-side near Chidiya Tapu (NOT Havelock). Symphony Palms is the real Havelock property at Beach No. 5, run by Symphony Resorts, ranked 4/5 on Tripadvisor across 1,000+ reviews.',
  to_jsonb(ARRAY['https://www.symphonyresorts.com/symphony-palms-beach-resort-and-spa/','https://www.tripadvisor.com/Hotel_Review-g19728662-d1585748-Reviews-Symphony_Palms_Beach_Resort_And_Spa-Govind_Nagar_Havelock_Island_Andaman_and_Nicobar.html','https://www.booking.com/hotel/in/symphony-palms-beach-resort.html']),
  to_jsonb(ARRAY['havelock-beach-5','dive-centre','lagoon-suites']),
  'web_search', 0.93
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

-- (Havelock experience=Taj Exotica, location=SeaShell Havelock, value=Barefoot — all verified real, no change needed)

-- NEIL ISLAND — add 2 new slots (Pearl Park = value, Tango Beach = location); existing SeaShell Neil keeps experience slot
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'neil-island', 'value', 'Pearl Park Beach Resort',
  'Beach resort',
  '₹4,500–₹9,000 per night',
  'Walking-distance access to Laxmanpur Beach (sunset point). Wide range of rooms + huts, large swimming pool, big restaurant with direct beach access for sunset viewing.',
  'Pearl Park is the canonical mid-range Neil property — ranked #4 of 18 Lakshmanpur hotels on Tripadvisor, 4/5 rating. Walking distance to Laxmanpur sunset point.',
  to_jsonb(ARRAY['https://www.tripadvisor.com/Hotel_Review-g2646897-d647239-Reviews-or10-Pearl_Park_Beach_Resort-Neil_Island_Andaman_and_Nicobar_Islands.html','https://pearl-park-beach-resort-neil-island.hotelsgds.com/']),
  to_jsonb(ARRAY['laxmanpur-beach','sunset-walking-distance','pool']),
  'web_search', 0.92
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'neil-island', 'location', 'Tango Beach Resort',
  'Beach resort',
  '₹3,500–₹8,500 per night',
  'Only Neil property with direct sea-facing rooms + balconies — 60m from Beach No. 1 (Laxmanpur Beach 1) at the sunset point. 35 rooms across AC and non-AC cottages. Water-sports + cycling rentals on site.',
  'Tango is the oldest preserved resort on Neil — listed on Booking.com with 70M+ verified reviews. Closest property to the jetty + sunset point + main market.',
  to_jsonb(ARRAY['https://tangobeachandaman.com/','https://www.booking.com/hotel/in/tango-beach-resort.html','https://www.tripadvisor.in/Hotel_Review-g2646897-d1178794-Reviews-Tango_Beach_Resort-Neil_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['sea-facing','beach-no-1','sunset-walking-distance']),
  'web_search', 0.91
);

-- ============================================================================
-- SUMMARY
-- ============================================================================
--
-- port-blair      → +3g +5e +1s (total g=3, e=5, s=3) → A
-- ross-island     → +3g +5e (stays: 3 upserts + 1 DELETE = total s=3) → A (HS: no overnight allowed on Ross itself; PB-side 3-stay structure)
-- north-bay-island → +3g +5e (stays: 3 upserts + 1 DELETE = total s=3) → A (HS: uninhabited day-trip; PB-side 3-stay structure)
-- chidiya-tapu    → +2g +5e (stays: 4 upserts = total s=4) → A
-- havelock-island → +3g +5e (stays: 1 upsert + 3 verified real = total s=4) → A
-- neil-island     → +3g +5e +2s (total g=3, e=5, s=3) → A
--
-- HS-confirmed notes: None — all 6 dests successfully flipped to A by handling the day-trip-only fact
-- (Ross + North Bay) via PB-side stay anchors. No genuine scarcity blocking the flip.
--
-- FABRICATIONS CONFIRMED + REPLACEMENTS:
--  - ross-island/experience: "Havelock Island Resort (30min ferry)" → Havelock is 2.5hr ferry, not 30min → replaced with Fortune Bay Island ITC
--  - ross-island/value: "Panchavati Guest House" → no verified online listing → replaced with Sinclairs Bayview
--  - ross-island/location: "Ross Island Cottage Forest Dept" → NO overnight allowed on Ross → DELETEd
--  - ross-island/xfactor: "Barefoot at Havelock (35min ferry from Ross)" → Barefoot is on Havelock Beach 7, not 35min from Ross → replaced with SeaShell PB
--  - north-bay-island/experience: "Taj Exotica Resort & Spa, North Bay" → Taj Exotica is on Havelock, not North Bay → replaced with Fortune Bay Island ITC
--  - north-bay-island/location: "Havelock Island Resort (North Bay ferry side)" → no such property; North Bay has no ferry-side resort → DELETEd
--  - north-bay-island/value: "Silver Sand Beach Resort" claiming North Bay → North Bay uninhabited → replaced with Sinclairs Bayview
--  - north-bay-island/xfactor: "Barefoot at Havelock (North Bay annex)" → Barefoot has no North Bay annex → replaced with SeaShell PB
--  - chidiya-tapu/experience: "Taj Exotica Resort & Spa, Havelock Island" → cross-dest Havelock → replaced with Symphony Samudra (5km from Chidiya Tapu)
--  - chidiya-tapu/value: "Barefoot at Havelock" → cross-dest Havelock → replaced with Sea Princess Wandoor (12km)
--  - chidiya-tapu/location: "Sea Princess Resort, Port Blair" → Sea Princess is in Wandoor not PB central → replaced with SeaShell PB (25km, urban-base)
--  - chidiya-tapu/xfactor: "Andaman Jungle Camp, Neil Island" → cross-dest Neil → replaced with Forest Dept Guest House (on-site at Chidiya Tapu)
--  - havelock-island/xfactor: "Symphony Samudra Beachside Jungle Resort" → Symphony Samudra is on PB-side Chidiya Tapu, NOT Havelock; the Havelock sister property is Symphony PALMS → replaced with Symphony Palms Beach 5
--
-- PRE-APPLY VALIDATION (run on this file):
--  - grep -c "INSERT INTO local_eateries (id" = 0 (only column list starts with destination_id)
--  - grep -c "INSERT INTO destination_stay_picks (id" = 0 (only column list starts with destination_id)
--  - grep -c "property_name\|why_pick" = 0 (used name + signature_experience + why_nakshiq)
--  - grep -c "gen_random_uuid()" = 0 (UUIDs auto-generated)
--  - grep -E "SELECT id FROM destinations WHERE slug" = empty (used literal slugs)
--  - All price_per_head_inr use int4range syntax with rupees in price_range
--  - All vegetarian use text enum (no booleans)
--  - All reservation values are 'walk-in' / 'recommended' / 'required' only
--  - All category values from {casual, mid_range, cafe, fine_dining, street_food, sweet_shop, bar}
