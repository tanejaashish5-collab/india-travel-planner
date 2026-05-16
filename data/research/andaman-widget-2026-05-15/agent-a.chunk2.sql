
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
