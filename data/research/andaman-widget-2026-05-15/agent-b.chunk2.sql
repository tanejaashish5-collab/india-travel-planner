
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
