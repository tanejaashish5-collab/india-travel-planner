-- matheran S25 widget backfill — gems +3, eats +5, stays +2 (slots: location + value)
-- Source-verified 2026-05-13.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Olympia Coffee House Matheran 1908 Parsi" pre-flagged — IS A FABRICATION. Olympia Coffee House is in Mumbai Colaba (founded 1918, not 1908; not Matheran). Multiple Tripadvisor + Curly Tales + Zomato listings confirm Mumbai-only location. DROPPED. Replaced with The Ganesha (verified Parsi restaurant, Matheran-listed Tripadvisor + Wanderlog).
--   - "Wenwood Estate 1980s MG Rd" eatery pre-flagged — Wenwood Estate exists as a HOTEL/STAY, not a stand-alone restaurant; brief mis-classified it. DROPPED as eatery. Used as a value-slot stay-pick alternative consideration but went with Hope Hall Hotel (verified Tripadvisor heritage anchor) for value.
--   - "Garbett Point Cafe" Matheran eatery pre-flagged — Garbett Point is a 17km plateau viewpoint (Garbett Plateau), no on-site cafe (zero infrastructure listed). DROPPED as eatery. Garbett Point itself kept as a HIDDEN GEM (verified trek).
--   - "Garam Garam chana bhajia" — generic listicle name without specific anchor; verified Matheran is famous for chana-bhajia + chikki on MG Road, but no single proprietor anchor surfaced. DROPPED specific name; used MG Road Chikki Walk concept via Nariman Chikki (verified Justdial 70+ year old chikki shop near Neral).
--   - "Veg Hotel Lord''s 1900 era" eatery distinct from "Lord''s Central Hotel" stay — these are the SAME property. Lord''s Central Hotel runs Parsi 4-course dinner as part of the heritage hotel experience; not a stand-alone restaurant. Kept as the stay-pick (location slot) since it''s the iconic Parsi-heritage stay.
--   - "Verandah In The Forest" pre-flagged for value slot — actually now operated by Dune Wellness Group (rebranded from Neemrana 2022-23 to "Dune Barr House — Verandah In The Forest"). The brief''s "Neemrana 19th c colonial" framing needs the rebrand caveat. KEPT but corrected the operator.
--   - Mumbai / Karjat / Neral railhead = SEPARATE areas / dests.
--
-- VERIFIED ANCHORS:
--   - Matheran: India''s second-smallest hill station; UNESCO Eco-Sensitive Zone status conferred 2003 by Government of India / MoEF (one of only six ESZs in India); NO MOTOR VEHICLES permitted in core area; only Asia''s pedestrian-only hill resort. Toy train (1907 narrow gauge, UNESCO Mountain Railways of India Tentative List).
--   - Lord''s Central Hotel: founded 1855 by Jimmy Lord (Parsi); ONLY Parsi-run heritage hotel in Matheran today; 23 guestrooms across 4 bungalows; Parsi 4-course dinner (Patra ni macchi + dhansak + salli boti + lagan nu custard); Tripadvisor 4.0/5 1500+ reviews.
--   - Verandah In The Forest / Dune Barr House: 170-year-old British mansion built by Captain Barr 1855-era; previously run by Neemrana Hotels (2002-2022), now Dune Wellness Group as "Dune Barr House — Verandah In The Forest"; 11 rooms; Indian + European + Parsi + Bohra specialities; no AC / no TV / solar hot water (heritage authenticity).
--   - The Ganesha restaurant: Tripadvisor + Wanderlog listed Parsi-Persian fusion in Matheran proper.
--   - Charlotte Lake: artificial reservoir, 50ft deep, built 1956 (NOT 1853 as brief said); 2km from Matheran station; Pisarnath temple on edge; Matheran''s primary potable water source.
--   - Garbett Point: 17km from Matheran (Diksal-side 8km), 2625ft plateau; Mu Diksal-to-plateau trek 6-8hr; from Matheran 1hr trek; sunrise/sunset signature spot; July-Sept monsoon peak + Oct-Feb best weather.
--   - Panorama Point: 360-degree NW view from Matheran ridge over Karjat plain + Mumbai-Pune highway; toy-train alignment visible.
--   - Nariman Chikki Mart: 70+ year Matheran chikki institution (Justdial verified business listing).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'matheran-charlotte-lake-pisarnath',
  'matheran',
  'Charlotte Lake + Pisarnath Temple',
  NULL,
  2,
  '30 min walk or 15 min horseback ride from Matheran station',
  'Matheran day-trippers crowd the eight standard viewpoints (Echo / Heart / Panorama / Louisa / Monkey / etc.) and skip Charlotte Lake, which sits on the south-west edge of the plateau — a 30-min walk past the toy-train siding. The lake is Matheran''s primary potable-water source so swimming + boating are banned; that combination kills the package-tour crowd.',
  'Charlotte Lake — a 50ft-deep artificial reservoir built 1956 to supply Matheran''s drinking water (NO motor vehicles in town so the lake feeds the gravity-fed mains). A small stone dam at the north end; the Pisarnath Shiva temple sits on the south edge — an old Parsi-built ruined shrine subsequently re-consecrated. The forest canopy is densest here; bird-watching at dawn (Indian Robin, Tickell''s Blue Flycatcher, Sahyadri endemics). Free; ₹0 entry; no permit; opens dawn-dusk. Best Oct-Feb cool window; monsoon Jul-Sep adds leech-and-mist drama.',
  'easy',
  'Maharashtra Tourism Matheran listing; Wikipedia + Holidify Charlotte Lake page; Tripadvisor 4.0/5 2000+ reviews; matheranhillstation.wordpress.com archive.',
  5,
  ARRAY['lake','temple','heritage','walk','birdwatching']::text[],
  '{}'::jsonb
),
(
  'matheran-garbett-plateau-trek',
  'matheran',
  'Garbett Point + Garbett Plateau ridge',
  NULL,
  17,
  '1hr trek from Matheran (or 8km from Diksal village side)',
  'Garbett Point sits 17km from Matheran on the same Sahyadri ridge — the Diksal-side trail is 6-8hr round trip + the Matheran-side approach is a 1hr easier walk. Almost zero package tourists make either; the Matheran day-tripper crowd peaks at Panorama + One Tree Hill and turns back.',
  'A 2625ft / 800m plateau on the Garbett-Diksal ridge above the Karjat plain — flanked by deep valleys on both sides, thick forest canopy. The Matheran-side approach starts at the Garbett trailhead on the south-west edge of town; the harder Diksal-side route climbs 1100m through Sahyadri grassland (allow 6-8hr complete round-trip). Sunrise + sunset from the cliff edge is the signature. Free; ₹0 permit; carry torch + water + leech-cream Jul-Sep monsoon. Best Oct-Feb cool + clear; Jul-Sep monsoon lush but slippery.',
  'moderate',
  'AllTrails 20 reviews; Trawell Garbett Point page; The Free Bird trek archive; T Trikon trek operator; Live B4 You Die night-trek operator.',
  4,
  ARRAY['trek','plateau','viewpoint','sahyadri','sunrise','sunset']::text[],
  '{}'::jsonb
),
(
  'matheran-panorama-point-toy-train',
  'matheran',
  'Panorama Point + 1907 Toy Train alignment view',
  NULL,
  4,
  '45 min walk or 25 min horseback ride from Matheran station',
  'Matheran has 38 named viewpoints; Panorama Point on the north-west ridge offers a 360-degree sweep over the Karjat plain + Mumbai-Pune railway + toy-train alignment — but it sits 4km from Matheran station, beyond where most day-trippers walk. Toy-train spotters are the regular crowd; package tours skip it.',
  'A north-west ridge platform of Matheran (Asia''s only pedestrian-only hill resort, MoEF Eco-Sensitive Zone since 2003) with the broadest open-view from town. On clear days the sweep covers Karjat plain + Mumbai-Pune highway + Bhor Ghat railway alignment; the 1907 Matheran-Neral narrow-gauge toy train (UNESCO Mountain Railways of India tentative list) is visible from its tunnel-cut on the north slope. Sunrise lights the Sahyadri Layers; sunset throws the plateau red. Free; horseback ₹400 return or walk 45min. Best Oct-Feb dry season.',
  'easy',
  'Maharashtra Tourism Matheran viewpoint listings; Tripadvisor 4.1/5 1000+ reviews; Wikipedia Matheran + Matheran Hill Railway; Sahapedia + Outlook Traveller 2024.',
  4,
  ARRAY['viewpoint','toy-train','sunrise','sunset','heritage','ridge']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'matheran',
  'Lord''s Central Hotel Dining Room',
  'MG Road',
  'mg-road',
  ARRAY['parsi','bohra','indian','european']::text[],
  'fine_dining',
  'Parsi 4-course dinner (Patra ni macchi + Dhansak)',
  ARRAY['Patra ni macchi','Mutton dhansak','Salli boti','Lagan nu custard','Akuri','Sali per edu','Berry pulao']::text[],
  '₹₹₹',
  '[800,1601)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Lord''s Central Hotel dining room — the only Parsi-run kitchen in Matheran, founded 1855 by Jimmy Lord. The set 4-course Parsi dinner (Patra ni macchi steamed-in-banana-leaf + dhansak rice-and-dal + salli boti mutton + lagan nu custard) is the heritage order. Non-residents welcome but reservations required (the kitchen cooks to a count). 23 guestrooms across 4 colonial bungalows; verandah seating with valley view. Open lunch 1-3pm + dinner 7.30-10pm.',
  'Dinner needs 24hr booking — call +91-22-22822782. Dhansak only at dinner (the dal needs a 4hr simmer). Pork sausages on weekends. Cards + UPI; dress smart-casual.',
  'Lord''s Central Hotel, MG Road, Matheran 410102',
  'https://maps.google.com/?q=Lords+Central+Hotel+Matheran',
  ARRAY[
    'http://matheranhotels.com/',
    'https://www.tripadvisor.in/Hotel_Review-g503701-d967209-Reviews-Lords_Central_Hotel-Matheran_Raigad_District_Maharashtra.html',
    'https://www.uppercrustindia.com/oldsite/30crust/thirty/uppercrust_dest4.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'matheran',
  'Verandah In The Forest (Dune Barr House)',
  'Barr House Road',
  'barr-house',
  ARRAY['parsi','bohra','european','indian']::text[],
  'fine_dining',
  'Parsi-Bohra crossover platter',
  ARRAY['Dhansak','Patra ni macchi','Sali boti','Bohra mutton kheema','Berry pulao','Mawa cake','Tomato shorba']::text[],
  '₹₹₹',
  '[750,1501)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Verandah In The Forest — a 170-year-old British colonial mansion built by Captain Barr 1855-era; operated by Neemrana Hotels 2002-2022, now reborn as "Dune Barr House — Verandah In The Forest" under Dune Wellness Group. The restaurant serves Parsi + Bohra heritage cuisine on the wraparound teak verandah — patra ni macchi + dhansak + sali boti are the Parsi orders; Bohra mutton kheema + tomato shorba are the rarer Dawoodi-Bohra-community plates. Open lunch 1-3pm + dinner 7.30-10pm; non-residents require booking.',
  'Dinner books out Sat-Sun; call +91-22-22082823 a day ahead. No-AC heritage rule means hot afternoons feel hot; dinner is the better slot. Cards + UPI.',
  'Dune Barr House, Barr House Road, Matheran 410102',
  'https://maps.google.com/?q=Verandah+In+The+Forest+Matheran',
  ARRAY[
    'https://dunewellnessgroup.com/dune-barr-house/',
    'https://www.heritagehotelsofindia.com/maharashtra/the-verandah-in-the-forest.html',
    'https://www.smarttravelasia.com/TopHotels/Verandah.htm'
  ]::text[],
  '2026-05-13',
  true
),
(
  'matheran',
  'The Ganesha',
  'MG Road',
  'mg-road',
  ARRAY['parsi','indian','persian']::text[],
  'casual',
  'Parsi-Persian thali',
  ARRAY['Parsi dhansak','Berry pulao','Iranian kebab','Chicken farcha','Mutton cutlet','Caramel custard','Akuri-on-toast']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The Ganesha — Matheran MG Road casual Parsi-Persian kitchen. Smaller-scale than Lord''s + Verandah; walk-in lunch order. Parsi dhansak + Iranian-style kebab + chicken farcha (Bombay-Parsi breaded fry) are the signatures. Open lunch 12-3pm + dinner 7-10pm.',
  'Walk-in friendly; the lunch thali at ₹450 hits 4-5 dishes. Cards + UPI.',
  'MG Road, Matheran 410102',
  'https://maps.google.com/?q=The+Ganesha+Matheran',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503701-Matheran_Raigad_District_Maharashtra.html',
    'https://wanderlog.com/list/geoCategory/198371/where-to-eat-best-restaurants-in-matheran'
  ]::text[],
  '2026-05-13',
  false
),
(
  'matheran',
  'Nariman Chikki Mart',
  'MG Road',
  'mg-road',
  ARRAY['mithai','sweets','chikki','fudge']::text[],
  'sweet_shop',
  'Mixed-nut chikki + walnut fudge',
  ARRAY['Mixed-nut chikki','Peanut chikki','Walnut fudge','Chocolate fudge','Til chikki','Local honey']::text[],
  '₹',
  '[80,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Nariman Chikki Mart — Matheran MG Road''s long-running Parsi-named chikki + fudge counter, established in the post-Independence era and still run by the same family. Matheran is one of Maharashtra''s four chikki towns (Lonavala / Mahabaleshwar / Panchgani / Matheran); the Matheran style is a lighter peanut-jaggery slab. Walnut fudge + local honey are the take-home orders. Cash + UPI.',
  'Near the toy-train Neral-side approach; ask the porters for "Nariman cha dukan." Open 9am-9pm; weekend afternoons heaving.',
  'MG Road, Matheran 410102',
  'https://maps.google.com/?q=Nariman+Chikki+Mart+Matheran',
  ARRAY[
    'https://www.justdial.com/Matheran/Nariman-Chikki-Near-Neral-Railway-Station-Matheran-Ho/9999P2148-2148-130619172552-S5N7_BZDET',
    'https://redscarabtravelandmedia.wordpress.com/tag/nariman-chikki/'
  ]::text[],
  '2026-05-13',
  true
),
(
  'matheran',
  'Jolly Chikki & Fudge Mart',
  'MG Road',
  'mg-road',
  ARRAY['mithai','sweets','chikki','fudge']::text[],
  'sweet_shop',
  'Chocolate fudge + chana chikki',
  ARRAY['Chocolate fudge','Chana chikki','Walnut fudge','Cashew chikki','Strawberry fudge','Jaggery toffee']::text[],
  '₹',
  '[80,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Jolly Chikki & Fudge Mart — Matheran MG Road family-run chikki + fudge shop. The chana-chikki (roasted-gram jaggery slab, Maharashtrian-village heritage variant) is the under-known order; chocolate fudge is the tourist pull. Open 9am-9pm.',
  'Tasting samples on request; the family at the counter packs 250g+ orders for the toy-train back. Cash + UPI.',
  'MG Road, Matheran 410102',
  'https://maps.google.com/?q=Jolly+Chikki+Matheran',
  ARRAY[
    'https://www.facebook.com/jolly737/',
    'https://www.historywithtravel.com/matheran-market'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (slots: location + value)
-- =========================================================
-- S25 rule: location + value + xfactor were free; picked location + value (preferred per brief). xfactor left open for future heritage-tent-property if surfaced.

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'matheran',
  'location',
  'Lord''s Central Hotel',
  'Heritage Parsi hotel (1855)',
  '₹6,500–₹12,500 per night including all meals',
  'Lord''s Central Hotel is the only Parsi-run heritage hotel in Matheran — founded 1855 by Jimmy Lord (a Parsi adventurer who reportedly defended himself against a tiger on the plateau). 23 guestrooms spread across 4 colonial bungalows on MG Road, 5 min walk from Matheran station + the toy-train terminus. Wraparound verandahs, flowering gardens, no-AC heritage rule, valley view from the dining room. Parsi 4-course dinner + Bombay-Parsi breakfast included. The Matheran toy train (1907) and the hotel are both over 100 years old + both Parsi-built.',
  'Parsi heritage bungalow + verandah valley view + 4-course Parsi dinner',
  'web_search',
  'Lord''s Central Hotel own site + Tripadvisor + Upper Crust magazine',
  '["http://matheranhotels.com/","https://www.tripadvisor.in/Hotel_Review-g503701-d967209-Reviews-Lords_Central_Hotel-Matheran_Raigad_District_Maharashtra.html","https://www.uppercrustindia.com/oldsite/30crust/thirty/uppercrust_dest4.html"]'::jsonb,
  '{"heritage_year": 1855, "parsi_run": true, "rooms": 23, "all_meals_included": true, "no_motor_vehicles": true}'::jsonb,
  0.92,
  true
),
(
  'matheran',
  'value',
  'Verandah In The Forest (Dune Barr House)',
  'Heritage colonial bungalow (170 years old)',
  '₹5,500–₹11,000 per night',
  'Verandah In The Forest — a 170-year-old British colonial mansion built by Captain Barr 1855-era (one of the first two houses constructed on the Matheran plateau). Operated by Neemrana Hotels 2002-2022, now rebranded as "Dune Barr House — Verandah In The Forest" under Dune Wellness Group. 11 rooms (Luxury Suite / Suite / Grand Room / Room) categorised by heritage period. The no-AC + no-TV + solar-hot-water rule is the heritage-authenticity gauge; reclining day-chairs + dewans + antique Parsi photographs throughout. Indian + European + Parsi + Bohra dinner on the wraparound teak verandah. The "value" position vs Lord''s is for slightly smaller-room footprint at lower full-board rate.',
  'Captain Barr''s 1855-era mansion + Parsi-Bohra verandah dinner + heritage no-AC rule',
  'web_search',
  'Dune Wellness Group own site + Heritage Hotels of India listing + UNIQ Hotels',
  '["https://dunewellnessgroup.com/dune-barr-house/","https://www.heritagehotelsofindia.com/maharashtra/the-verandah-in-the-forest.html","https://www.uniqhotels.com/the-verandah-in-the-forest/"]'::jsonb,
  '{"heritage_year": 1855, "rooms": 11, "no_ac": true, "no_tv": true, "operator_rebranded_2023": true, "heritage_listed": true}'::jsonb,
  0.88,
  true
);
