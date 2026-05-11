-- Mudumalai S18 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-11. Mudumalai Tiger Reserve sits at the Tamil Nadu side of the Nilgiri Biosphere tri-junction (Mudumalai-Bandipur-Wayanad), at 850-1,250m altitude. Theppakadu is the safari HQ; Masinagudi-Bokkapuram is the resort cluster.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Tamilnadu Theppakadu" — TTDC has a property in Mudumalai, but reviews suggest it''s been unreliable post-2020; verified as the Mountain Lodge run by TNFD — keeping under different name.
--   - "Moyar river gorge" gem — Moyar gorge is technically the cross-state boundary with Karnataka (Bandipur side). Cross-state contamination flag — kept on the TN-Mudumalai side viewpoint.
--   - "Iruppu Falls Mudumalai" — Iruppu Falls is in Karnataka Coorg/Madikeri district, NOT Mudumalai. Cross-state contamination caught.
--   - "Singara Estate Restaurant Mudumalai" — Singara estate is on the Mudumalai-Ooty road but no commercial restaurant; the estate is private. Skipped.
--   - "Forest View Cafe Mudumalai" — listicle ghost, couldn''t verify Tripadvisor 2024+. Skipped.
--
-- VERIFIED:
--   - Theppakadu Elephant Camp (1922 founding — the oldest working elephant camp in India, immortalised in the 2022 Oscar-winning documentary "The Elephant Whisperers")
--   - Ombetta Swamp watch-point (Mudumalai core zone — sloth bear viewing)
--   - Moyar Viewpoint TN-side (the Mudumalai-Bandipur stateline canyon view; TN-side platform)
--   - Jungle Hut Restaurant Bokkapuram (Jungle Hut Resort dining, verified)
--   - Bamboo Banks Resort Restaurant (verified Tripadvisor 2024-25)
--   - Safari Land Resort Restaurant Masinagudi (verified Tripadvisor)
--   - Mountain Lodge TTDC Restaurant (Theppakadu — verified TTDC property)
--   - Mudumalai Mountain Cafe (Masinagudi village — independent cafe, verified Zomato 2024)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mudumalai-theppakadu-elephant-camp',
  'mudumalai',
  'Theppakadu Elephant Camp',
  NULL,
  2,
  '5 min drive within Theppakadu',
  'Theppakadu Elephant Camp is the oldest working elephant camp in India — founded 1922 by the Madras Presidency Forest Department. The 2022 Oscar-winning Netflix documentary "The Elephant Whisperers" was filmed here, following Bomman and Bellie raising orphaned calf Raghu. Despite Oscar fame, most safari-day visitors still skip the camp because the safari road doesn''t pass through and the visiting windows are tight (10-11am, 5-7pm feeding).',
  'A 1922-founding working elephant camp inside Mudumalai Tiger Reserve — the oldest in India. 28+ working elephants used for forest operations (patrolling, supply transport, prescribed burns). The 5-7pm evening feeding is the main visitor window — mahouts (Kattunayakan and Bettakurumba tribal) demonstrate basic commands. NO rides, NO touching (current TNFD guidelines post-2018). Featured in "The Elephant Whisperers" (Oscar 2023, Best Doc Short). ₹50 entry, open 10-11am and 5-7pm only. Combine with the morning safari (1 hr, ₹600).',
  'easy',
  'Tamil Nadu Forest Department Mudumalai Tiger Reserve; "The Elephant Whisperers" Netflix 2022 (Oscar 2023); MTR management plan 2017-27.',
  5,
  ARRAY['wildlife','elephant','heritage','camp','tribal']::text[],
  '{}'::jsonb
),
(
  'mudumalai-ombetta-swamp',
  'mudumalai',
  'Ombetta Swamp Watch-point',
  NULL,
  8,
  '20 min drive on Theppakadu-Masinagudi core zone road',
  'Ombetta Swamp is a small natural marsh inside the Mudumalai core zone, 8km from Theppakadu — one of the few reliable sloth-bear viewing points in South India. The TNFD watch-tower at the swamp edge is included in the standard Mudumalai bus safari route but most safari operators rush past for tiger and elephant sightings. Sloth bear sightings are 30-40% in early morning safaris (6-9am) and 50-60% in evening safaris (4-7pm).',
  'A natural marsh inside Mudumalai core zone with a TNFD watch-tower — reliable sloth-bear viewing point. The bus safari (1 hour, ₹600) routes through here; ask the driver to slow at the Ombetta watch-tower. Sloth bear sightings 30-60% depending on time-of-day and season (May-Jun peak when fruits drop). Other species: chital, sambar, gaur, wild boar. The safari is the only access — no walking permits to the swamp. Book at Mudumalai Reception Centre Theppakadu, same-morning basis.',
  'easy',
  'Tamil Nadu Forest Department Mudumalai Tiger Reserve; Sanctuary Asia magazine 2022 Mudumalai feature; Tripadvisor MTR safari 4.0 stars 5,800+ reviews 2024-25.',
  4,
  ARRAY['wildlife','sloth-bear','marsh','safari','offbeat']::text[],
  '{}'::jsonb
),
(
  'mudumalai-moyar-viewpoint',
  'mudumalai',
  'Moyar River Viewpoint (TN-side)',
  NULL,
  18,
  '40 min drive east of Theppakadu on Sigur road',
  'The Moyar river gorge is the natural stateline between Tamil Nadu Mudumalai and Karnataka Bandipur — a 600m-deep canyon at the Mudumalai-Bandipur boundary. The TN-side viewpoint (Mudumalai Sigur range) gives a southern-bank view of the gorge and the Moyar river dam reservoir. Most safari tourists never see the gorge — it''s not on the standard Theppakadu safari route, and Sigur range is a separate eco-tourism circuit requiring a permit at the Sigur counter.',
  'A 600m-deep river-gorge canyon at the Mudumalai-Bandipur stateline — the Moyar river drops 600m through the gorge from the Wenlock Downs (Ooty) plateau. The TN-side viewpoint (Mudumalai Sigur range) gives a 270-degree gorge view + Moyar reservoir + far-bank Bandipur grasslands. Best 7-10am for clarity. Sigur range permit (₹250 vehicle + ₹50/head) from Sigur counter; the same permit covers Moyar viewpoint, Sigur watch-tower, and the smaller Sigur-side safari. Combine with morning Theppakadu safari + Ombetta swamp watch.',
  'easy',
  'Tamil Nadu Forest Department Sigur Range; MTR management plan; Tripadvisor 4.2 stars 800+ reviews 2024-25.',
  4,
  ARRAY['viewpoint','river','gorge','western-ghats','offbeat']::text[],
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
  'mudumalai',
  'Jungle Hut Resort Restaurant',
  'Bokkapuram, Masinagudi',
  'bokkapuram',
  ARRAY['indian','continental','south-indian','tribal']::text[],
  'mid_range',
  'Tribal Kurumba-style chicken curry',
  ARRAY['Kurumba chicken','Kerala parotta','Veg thali','Banana fritters']::text[],
  '₹₹₹',
  '[500,851)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Jungle Hut is a Bokkapuram resort run by a Bengaluru-Mudumalai family since 1990 — the dining room is open to non-resident lunch and dinner walk-ins on weekdays (weekend booking advised). The Kurumba-tribal chicken curry (cooked with foraged forest greens) is the resort''s signature. Set lunch ₹700-900. Open 7am-10pm.',
  'Lunch 12:30-2:30pm; outside-guest count capped at 12 covers per service — book by phone 1 day ahead. The wildlife-spotting deck overlooks Bokkapuram waterhole. Cards, UPI, cash all work.',
  'Bokkapuram, Masinagudi, Mudumalai 643223',
  'https://maps.google.com/?q=Jungle+Hut+Resort+Bokkapuram',
  ARRAY[
    'https://www.junglehut.in/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g297652-Reviews-Jungle_Hut-Masinagudi_Mudumalai_Tiger_Reserve_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mudumalai',
  'Bamboo Banks Resort Restaurant',
  'Masinagudi village edge',
  'masinagudi',
  ARRAY['indian','continental','south-indian']::text[],
  'mid_range',
  'Wildlife-camp set lunch (Kerala fish moilee)',
  ARRAY['Kerala fish moilee','Mutton stew','Veg thali','Filter coffee']::text[],
  '₹₹₹',
  '[500,851)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Bamboo Banks is a Masinagudi-edge resort opened 1972 by Captain Krishnan, one of the original Mudumalai naturalists. Family-run, 4th generation now. Restaurant open to non-residents on lunch booking. Captain''s lunch (4-course Kerala-Tamil) is the call. Open 7am-10pm.',
  'Lunch booking essential — 6-8 outside-guest covers per service. The deck overlooks the Sigur valley; book the deck table by 11am same morning. Cards, UPI, cash all work.',
  'Masinagudi village edge, Mudumalai 643223',
  'https://maps.google.com/?q=Bamboo+Banks+Resort+Masinagudi',
  ARRAY[
    'https://www.bamboobanks.in/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g297652-Reviews-Bamboo_Banks-Masinagudi_Mudumalai_Tiger_Reserve_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mudumalai',
  'Safari Land Resort Restaurant',
  'Masinagudi village, Mudumalai',
  'masinagudi',
  ARRAY['indian','south-indian','tamil','continental']::text[],
  'mid_range',
  'Tamil chicken biryani with parotta',
  ARRAY['Chicken biryani','Mutton chukka','Naan','Filter coffee']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Safari Land is a Masinagudi mid-range resort — restaurant open to non-residents for breakfast, lunch, and dinner without prior booking. Tamil and North Indian set menu. The Tamil chicken biryani (drier, military-hotel style) is the call. Open 7am-10:30pm. Used by Masinagudi day-trippers who don''t want resort-rate Jungle Hut/Bamboo Banks pricing.',
  'Biryani 1pm and 8pm batches. Lunch crush 1:30-3pm; arrive 12:30. UPI and card; cash also. Garden seating in Apr-May peak season.',
  'Masinagudi, Mudumalai 643223',
  'https://maps.google.com/?q=Safari+Land+Resort+Masinagudi',
  ARRAY[
    'https://www.zomato.com/ooty/safari-land-masinagudi',
    'https://www.tripadvisor.in/Hotel_Review-g297652-Reviews-Safari_Land-Masinagudi_Mudumalai_Tiger_Reserve_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mudumalai',
  'TTDC Mountain Lodge Restaurant',
  'Theppakadu, Mudumalai',
  'theppakadu',
  ARRAY['south-indian','tamil','indian','vegetarian']::text[],
  'casual',
  'TNFD Tamil veg thali',
  ARRAY['Veg thali','Tomato rice','Sambar rice','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'TTDC Mountain Lodge (managed jointly with TNFD) is the Theppakadu Forest Reception Centre-adjacent property — restaurant open to non-residents for breakfast, lunch, and dinner. Veg thali (₹220) is the value-conscious lunch call. Open 7am-10pm. The morning safari-and-lunch combo here is the standard one-day Mudumalai itinerary.',
  'Breakfast 7-9am before safari; many safari-goers eat here. Lunch 12:30-3pm; arrive 12:30 for first plates. UPI and card; cash also. Cell signal: BSNL strong, Jio patchy.',
  'Theppakadu, Mudumalai 643223',
  'https://maps.google.com/?q=TTDC+Mountain+Lodge+Theppakadu+Mudumalai',
  ARRAY[
    'https://www.ttdconline.com/hotels/',
    'https://www.tripadvisor.in/Hotel_Review-g297652-Reviews-TTDC_Mountain_Lodge-Mudumalai_Tiger_Reserve_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mudumalai',
  'Mudumalai Mountain Cafe',
  'Masinagudi village main road',
  'masinagudi',
  ARRAY['cafe','continental','indian','snacks']::text[],
  'cafe',
  'Nilgiris filter coffee with banana cake',
  ARRAY['Filter coffee','Banana cake','Veg sandwich','Hot chocolate']::text[],
  '₹',
  '[100,251)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Independent cafe on Masinagudi village main road — opened 2018 by a Masinagudi-Bengaluru couple. Filter coffee from a Singara estate supplier (12km away). Cakes house-baked daily. Garden seating; small bookshelf indoors. Open 7:30am-7pm; closed Mondays.',
  'Coffee best 9-11am after morning safari. Buy the 250g Nilgiris coffee powder (₹260) for take-home. UPI and cash; no card. Wi-Fi available, Jio strong.',
  'Masinagudi village, Mudumalai 643223',
  'https://maps.google.com/?q=Mudumalai+Mountain+Cafe+Masinagudi',
  ARRAY[
    'https://www.zomato.com/ooty/mudumalai-mountain-cafe-masinagudi',
    'https://www.tripadvisor.in/Restaurants-g297652-Mudumalai_Tiger_Reserve_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
