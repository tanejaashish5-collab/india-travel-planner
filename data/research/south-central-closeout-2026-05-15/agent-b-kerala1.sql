-- Agent B — Kerala batch-1 widget topup (6 dests, +10 eats + 2 HS-confirmed)
-- A-flips: cherai 3→5, eravikulam 2→5, idukki 3→5, marari 3→5 (4 dests)
-- HS-confirmed B: chinnar (2/5), kumbalangi (3/5)

BEGIN;

-- ============================================================
-- CHERAI (+2): Lilliput Multi Cuisine + Oceanview
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'cherai',
  'Lilliput Multi Cuisine Restaurant',
  'Cherai Munambam Beach Road, opposite Cherai Beach',
  ARRAY['kerala','seafood','indian','chinese'],
  'casual',
  ARRAY['karimeen kanthari pollichathu','meen mappas','fish kandari','prawns ginger garlic','crab roast'],
  '₹₹',
  int4range(350, 651),
  'mixed',
  'walk-in',
  NULL,
  'Ranks #1 of 14 Cherai restaurants on Tripadvisor with 563 reviews at 4.6 stars. Family run, opposite the beach, kitchen leans on Ammachi-style Kerala home cooking — the karimeen pollichathu is wrapped in plantain leaf and steamed on tawa. Mid-morning to late dinner service, indoor and partial outdoor seating. Multi-cuisine menu also covers Chinese and tandoor but locals come for the seafood.',
  'Karimeen kanthari pollichathu is the order. Ask for kanthari (bird-eye chili) spice level — kitchen tones it down for foreigners by default. Cash and UPI both accepted.',
  'Cherai Munambam Beach Road, Kuzhupally, Vypin Island, Kochi 683515',
  'https://maps.google.com/?q=Lilliput+Multi+Cuisine+Restaurant+Cherai+Beach',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g2647335-d8704223-Reviews-Lilliput_Multi_Cuisine_Restaurant-Cherai_Beach_Vypin_Island_Kochi_Cochin_Ernakul.html','https://www.sluurpy.in/cherai-beach/restaurant/4420105/lilliput-multi-cuisine-restaurant'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'cherai',
  'Oceanview Restaurant',
  'Cheraibeach Road, next to Sea Lagoon Resort — 25m from beach',
  ARRAY['seafood','kerala','fast-food'],
  'casual',
  ARRAY['grilled prawns','fish fry','squid roast','meen curry','tiger prawns butter pepper'],
  '₹₹',
  int4range(400, 801),
  'mixed',
  'walk-in',
  NULL,
  'Sunset seafood spot adjacent to Sea Lagoon resort — open-air seating 25 metres from the surf, evening service primarily. Catch-of-the-day is what to ask for; the grilled prawns and squid roast are the consistent picks. Open noon to 10pm, but the room fills around 5:30pm for the Arabian Sea sunset.',
  'Order grilled rather than fried — kitchen handles the grill better. Arrive by 5:15pm in season to claim a sea-facing table; rooftop fills first.',
  'Cheraibeach Road, Cherai Beach, Vypin Island, Kochi 683514',
  'https://maps.google.com/?q=Oceanview+Restaurant+Cherai+Beach',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2647335-d11756886-Reviews-Oceanview-Cherai_Beach_Vypin_Island_Kochi_Cochin_Ernakulam_District_Kerala.html'],
  false,
  true
);

-- ============================================================
-- ERAVIKULAM (+3): Munnar base-village cluster, 8km from park gate
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'eravikulam',
  'Saravana Bhavan Munnar',
  'MG Road, Munnar Market — 8 km from Eravikulam NP gate',
  ARRAY['south-indian','tamil','kerala','vegetarian'],
  'casual',
  ARRAY['banana-leaf meals','masala dosa','idli sambar','filter coffee','rava kesari'],
  '₹',
  int4range(150, 351),
  'pure-veg',
  'walk-in',
  1997,
  'Munnar outpost of the Tamil tiffin chain since 1997 — banana-leaf meals at lunch, tiffin items 7:30am to 9:30pm. Pure veg, packed with both pilgrim families and tea-estate office crews. The closest reliable pure-veg pre-7am breakfast before the 6 km drive to Eravikulam gate for the first KSRTC shuttle.',
  'Meals served 12:00–3:00pm only. Early Eravikulam runners should order set-dosa or pongal at 7:30am open. Cash only on busy weekends; UPI on weekdays.',
  'MG Road, Munnar Colony, Munnar 685612',
  'https://maps.google.com/?q=Saravana+Bhavan+Munnar+MG+Road',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g303881-d1986714-Reviews-Saravana_Bhavan-Munnar_Idukki_District_Kerala.html','https://www.justdial.com/Munnar/Saravana-Bhavan-Munnar-Market-Munnar-Colony/9999P4865-4865-160922121121-I7W1_BZDET'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'eravikulam',
  'Rapsy Restaurant',
  'Main Bazaar, SH 17, Munnar — 8 km from Eravikulam NP gate',
  ARRAY['kerala','muslim','indian','halal'],
  'casual',
  ARRAY['kappa biriyani','chicken biriyani','parotta beef','fish curry','special fish fry'],
  '₹',
  int4range(180, 401),
  'mixed',
  'walk-in',
  NULL,
  'Ranks #3 of 65 Munnar restaurants on Tripadvisor with 575 reviews. Halal Muslim-style food, Main Bazaar location packed with trekkers between 12 and 3pm — kappa biriyani (tapioca + meat) is the Munnar signature dish you should not skip, plus the parotta-beef combo. Counter-service, no frills.',
  'Park on the bazaar street is brutal in season — walk from the KSRTC stand. Kappa biriyani sells out by 2pm on weekends, order on arrival.',
  'Main Bazaar, SH 17, Nullatanni, Munnar 685612',
  'https://maps.google.com/?q=Rapsy+Restaurant+Munnar+Main+Bazaar',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g303881-d2634677-Reviews-Rapsy_Restaurant-Munnar_Idukki_District_Kerala.html','https://www.justdial.com/Munnar/Rapsy-Restaurant-Pothamedu/9999P4865-4865-190326193037-H3G5_BZDET'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'eravikulam',
  'Sree Mahaveer Bhojanalaya',
  'Colony Road, Government Guest House Road, Munnar — 8 km from Eravikulam gate',
  ARRAY['north-indian','gujarati','rajasthani','vegetarian'],
  'casual',
  ARRAY['gujarati thali','rajasthani thali','punjabi thali','dal baati churma','chaas'],
  '₹₹',
  int4range(220, 401),
  'pure-veg',
  'walk-in',
  NULL,
  'Pure-veg North Indian and Gujarati thali house off Munnar Colony Road. Three thalis (Gujarati / Rajasthani / Punjabi) served unlimited at lunch and dinner — the one place in the cluster where a Tamil tiffin menu isnt the only veg option. Patronage skews to Gujarati and Mumbai family groups on the Munnar circuit.',
  'Thali service starts 12:30pm. Tell the server which thali you want first — they switch rotation by demand. Phone +91 4865 232 022 to confirm closing days in monsoon.',
  'Colony Road, Government Guest House Road, Munnar 685612',
  'https://maps.google.com/?q=Sree+Mahaveer+Bhojanalaya+Munnar',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g303881-d4295473-Reviews-Sree_Mahaveer_Bhojanalaya_Restaurant-Munnar_Idukki_District_Kerala.html'],
  false,
  true
);

-- ============================================================
-- IDUKKI (+2): Pappens + Kuttanadu
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'idukki',
  'Pappens Family Restaurant & Bakery',
  'Cheruthoni town centre — between Idukki Dam and Cheruthoni Dam',
  ARRAY['kerala','indian','bakery','seafood'],
  'casual',
  ARRAY['chicken biryani','fried fish','butter chicken','beef ularthiyathu','parotta'],
  '₹₹',
  int4range(220, 451),
  'mixed',
  'walk-in',
  2002,
  'Founded in 2002, Pappens is the default lunch stop for KSEB Idukki HQ staff and dam-visit day-trippers. 4187 ratings on Restaurant Guru, 3.9 stars — the fried fish and chicken biryani are the orders. Attached bakery sells karutha halwa and Kerala plum cake for the road. Catering wing handles Idukki political-circuit functions, so consistency matters here.',
  'Lunch peak 1–2:15pm — parking is a problem. Park at the Cheruthoni KSRTC stand and walk 200m. Order biryani first; fish has a 15-min wait when not pre-fried.',
  'Cheruthoni, Idukki 685602',
  'https://maps.google.com/?q=Pappens+Restaurant+Cheruthoni+Idukki',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297632-d10484047-Reviews-Pappens_Restaurant-Idukki_Idukki_District_Kerala.html','https://restaurant-guru.in/Pappens-Cheruthoni','https://pappens.in/about.php'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'idukki',
  'Kuttanadu Restaurant',
  'NH 220, Chelimada — Dindigul-Theni-Kottarakkara highway, Idukki',
  ARRAY['kerala','seafood','kuttanadu'],
  'casual',
  ARRAY['karimeen pollichathu','duck curry','konchu fry','vaattipaticha meen curry','kappa puzhukku'],
  '₹₹',
  int4range(280, 501),
  'mixed',
  'walk-in',
  NULL,
  'NH-220 highway dhaba serving Kuttanad (lower-Kerala backwater) cuisine in the Idukki hills — duck curry and karimeen pollichathu are the dishes you cannot easily get up here, since this is hill country not delta country. Coconut-milk prawn preparation with restrained spice. Family-clean and clean parking off NH-220.',
  'On the NH-220 between Painavu and Kottarakkara — natural lunch stop for the Idukki Dam to Alleppey transfer. Duck curry needs 25-minute prep, call ahead on +91 95447 67144.',
  'NH 220, Dindigul Theni – Kottarakkara Hwy, Chelimada, Idukki 685509',
  'https://maps.google.com/?q=Kuttanadu+Restaurant+Idukki+NH+220',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297632-d13543598-Reviews-Kuttanadu_Restaurant-Idukki_Idukki_District_Kerala.html'],
  false,
  true
);

-- ============================================================
-- KUMBALANGI (+1): Grill House only — 2 HS for the rest
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'kumbalangi',
  'Kumbalangi Grill House',
  'Opposite INTUC Union Office, near Perumbadappu Bridge, Kumbalangi',
  ARRAY['arabic','indian','north-indian','grill'],
  'casual',
  ARRAY['mandi rice','shawarma','kuzhi mandi','grilled chicken','khubz'],
  '₹₹',
  int4range(220, 451),
  'mixed',
  'walk-in',
  NULL,
  'Near the Perumbadappu Bridge approach into Kumbalangi village — Arabic-grill counter format with mandi rice and shawarma as the orders. The only non-homestay dine-in option inside Kumbalangi proper; Kumbalangis food economy is otherwise the homestay-sadhya circuit (already covered by Gramam and Kallancherry). Counter-service, no-frills, family-acceptable.',
  'Kuzhi mandi is the differentiator (slow-cooked pit rice) — order in advance by 12pm for 2pm lunch. Limited evening hours; close by 9:30pm.',
  'Opposite INTUC Union Office, Kumbalangi, Kochi 682007',
  'https://maps.google.com/?q=Kumbalangi+Grill+House',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g297633-d20992841-Reviews-Kumbalangi_Grill_House-Kochi_Cochin_Ernakulam_District_Kerala.html','https://www.justdial.com/Ernakulam/Kumbalangi-Grill-House-Opposite-Intuc-Union-Office-Kumbalangi/0484PX484-X484-220518210332-V9U2_BZDET'],
  false,
  true
);

-- ============================================================
-- MARARI (+2): Coffee Temple + Palm Heaven
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'marari',
  'Coffee Temple',
  'Beach Road, Marari Beach — tables under coconut palms, 30m from sand',
  ARRAY['cafe','seafood','north-indian','continental'],
  'casual',
  ARRAY['espresso','tuna sandwich','fish curry meals','dal','fresh juice'],
  '₹₹',
  int4range(200, 451),
  'mixed',
  'walk-in',
  NULL,
  'Ranks #4 of 18 Mararikulam restaurants on Tripadvisor. Owner-run cafe on Marari Beach Road with a chef of 15 years experience — espresso bar plus a small kitchen turning out fish curry meals and Indian-coffee-house style breakfasts. Sit at the palm-shaded outside tables; backwater view through the trees.',
  'Cook-to-order, so lunch takes 20 minutes — order on arrival, walk the beach, come back. Tuna sandwich is the go-to for a 15-minute pitstop between resort and beach.',
  'Beach Road, Mararikulam North, Alappuzha 688523',
  'https://maps.google.com/?q=Coffee+Temple+Marari+Beach',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g3171875-d10793070-Reviews-Coffee_Temple-Mararikulam_Alappuzha_District_Kerala.html'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'marari',
  'Palm Heaven Marari',
  'Coconut grove off Marari Beach Road — Mararikulam',
  ARRAY['kerala','seafood','indian','asian'],
  'casual',
  ARRAY['karimeen fry','prawn curry','tiger prawn roast','fish moilee','red rice meals'],
  '₹₹',
  int4range(280, 501),
  'mixed',
  'walk-in',
  NULL,
  'Ranks #8 of 20 Mararikulam restaurants on Tripadvisor at 4.4 stars — small family-run shack inside a coconut grove a short walk from the beach. Tables under umbrellas in a palm clearing. The angle is homely seafood cooked on local family recipes, not resort-kitchen polish. Karimeen fry and prawn curry are the orders.',
  'Cash preferred. Open lunch to 9pm; arrives quiet between 3 and 6pm — good time to claim a quieter corner table.',
  'Mararikulam North, Marari Beach, Alappuzha 688523',
  'https://maps.google.com/?q=Palm+Heaven+Marari+Homely+Food',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g3171875-d11664728-Reviews-Palm_Heaven_Marari_Homely_Food-Mararikulam_Alappuzha_District_Kerala.html'],
  false,
  true
);

COMMIT;
