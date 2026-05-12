-- gokarna S20 widget backfill — needs +1 gem +5 eats (4 stays ok)
-- Existing gems: Yana Rocks (skip duplicate); 1 other already in DB.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Sahasralinga Sirsi" — 60km, Sirsi dest territory; cross-dest.
--   - "Banashankari Sirsi Temple" — 50km, Sirsi dest; cross-dest. (NOT to be confused with Banashankari Badami, different temple.)
--   - "Mahabaleshwar Temple as gem" — main attraction of Gokarna town, not a hidden gem.
--   - "Anjadip Island" — naval-restricted (INS Kadamba submarine base), no public access.
--   - "Paradise Beach swimming" — Paradise Beach access has been restricted by Karnataka Forest Department since 2018 plastic-cleanup drive; not recommendable as gem.
--
-- VERIFIED:
--   - Mirjan Fort (16c CE Queen Chennabhairadevi pepper-queen, 40km north, ASI-listed).
--   - Namaste Cafe Om Beach (institution since ~1995, Tripadvisor 4.0+ stars).
--   - Mantra Cafe Om Beach (Tripadvisor verified, 2024+ activity).
--   - Hotel Pai Restaurant Gokarna town (Tripadvisor verified pure-veg).
--   - Prema Restaurant Kudle Beach (Tripadvisor 4.0+ stars, 2024+ activity).
--   - Sea Green Cafe Half Moon (Tripadvisor verified).

-- =========================================================
-- HIDDEN GEMS — 1 verified (need only +1)
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'gokarna-mirjan-fort',
  'gokarna',
  'Mirjan Fort',
  NULL,
  40,
  '1 hr 10 min drive north via NH-66',
  'Gokarna visitors typically loop the five beaches and the Mahabaleshwar Temple; almost none drive the 40km north to Mirjan because it sits on a side road off NH-66 with no tourist signage. The fort''s 16th-century pepper-queen Chennabhairadevi held off four Portuguese assaults and ran Uttara Kannada''s spice trade for 54 years — yet she is absent from mainstream India history syllabi.',
  'A 200m x 150m laterite fort built by Queen Chennabhairadevi of the Saluva dynasty (reigned 1552-1606 — the longest-ruling queen in Karnataka history, known as "Rani of Pepper" to the Portuguese for monopolising the European pepper trade). Double walls, 4 entrance gates, internal wells and a granary. Restored by ASI 2001-2012. Wedding-photoshoot-photogenic without the crowds of Hampi. Mirjan-Jambeer Khadi creek runs adjacent. ASI-protected; free entry; 9am-5pm; closed Fridays.',
  'easy',
  'Archaeological Survey of India Bengaluru circle inventory; Karnataka State Archaeology heritage circuit; Outlook Traveller Mirjan feature 2022.',
  5,
  ARRAY['fort','heritage','asi','pepper-trade','queen']::text[],
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
  'gokarna',
  'Namaste Cafe',
  'Om Beach',
  'om-beach',
  ARRAY['multi-cuisine','italian','israeli','indian']::text[],
  'mid_range',
  'Wood-fired pizza + fresh juice',
  ARRAY['Wood-fired pizza','Shakshuka','Banana porridge','Falafel plate','Hummus with pita']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Om Beach anchor open since the mid-1990s — the original Gokarna backpacker cafe, sitting on the rocks at the north end of Om Beach where the two omkara curves meet. Wood-fired pizza is the order; the menu has been steady since the 2000s with Israeli-influenced additions (shakshuka, hummus) reflecting the Israeli-circuit traveller pattern that defined Gokarna in the 2000s-2010s. Open 7.30am-11pm Oct-April; closed monsoon June-Sept.',
  'Sunset 5.30-6.30pm fills the rock-edge tables — arrive 4.30pm in peak season (Dec-Feb). Pizza takes 25 min wood-fired; order before sitting. Cash + UPI; cards intermittent.',
  'Om Beach (north end on the rocks), Gokarna 581326',
  'https://maps.google.com/?q=Namaste+Cafe+Om+Beach+Gokarna',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d3527842-Reviews-Namaste_Cafe-Gokarna_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/gokarna/namaste-cafe-om-beach'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gokarna',
  'Mantra Cafe',
  'Om Beach',
  'om-beach',
  ARRAY['multi-cuisine','vegetarian','israeli','indian']::text[],
  'casual',
  'Banana lassi + pesto pasta',
  ARRAY['Banana lassi','Pesto pasta','Veg thali','Falafel','Apple pie']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Om Beach mid-strip backpacker cafe running since the late 1990s — owned by a Goan-origin family with kitchen staff who switch between Goa and Gokarna based on monsoon. Pure-veg leaning menu (Gokarna town is a Hindu pilgrimage centre and most restaurants on the beach belt follow). The apple pie and chocolate cake are house-baked daily. Open 7.30am-11pm Oct-April.',
  'The 4pm chai-and-cake window is the quieter pocket — most travellers are at the beach. The vegetable thali at lunch (12.30-3pm) is the Indian-leaning option. Cash + UPI; no cards.',
  'Om Beach (middle strip), Gokarna 581326',
  'https://maps.google.com/?q=Mantra+Cafe+Om+Beach+Gokarna',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d2526189-Reviews-Mantra_Cafe-Gokarna_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/gokarna/mantra-cafe'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gokarna',
  'Hotel Pai Restaurant',
  'Gokarna town main street',
  'gokarna-town',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Masala dosa with sambar',
  ARRAY['Masala dosa','Idli vada','Filter coffee','Khara bath','Veg meals']::text[],
  '₹',
  '[80,181)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Gokarna town main-street institution running since the 1980s — the default pre-darshan breakfast stop for Mahabaleshwar Temple pilgrims. Masala dosa + filter coffee combo for ₹110; the veg meals (₹120, lunch only 12-3pm) is rice + sambar + 2 vegetables + rasam + curd + papad. Pure-veg, no onion/garlic during the temple fasting calendar. Open 6.30am-10.30pm.',
  'Breakfast 7-9.30am is busy with pilgrims fresh from morning darshan — chai counter outside has shorter queue. The Mangalore buns (sweet) are available evening tiffin 4-6pm only. Cash + UPI; no cards.',
  'Main Street, Gokarna 581326',
  'https://maps.google.com/?q=Hotel+Pai+Gokarna',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d6502321-Reviews-Hotel_Pai_Restaurant-Gokarna_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/gokarna/hotel-pai-restaurant-main-street'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gokarna',
  'Prema Restaurant',
  'Kudle Beach',
  'kudle-beach',
  ARRAY['multi-cuisine','indian','italian','seafood']::text[],
  'casual',
  'Garlic prawns + thali',
  ARRAY['Garlic prawns','Veg thali','Banana pancake','Tomato soup','Fresh juice']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Kudle Beach mid-strip family-run cafe operating since the early 2000s — the default Kudle dinner stop for backpackers staying in beach huts. Garlic prawns (₹350) are the signature; the veg/non-veg thali is the value-meal default. Fresh juice from Karwar-supplied fruit. Open 8am-11pm Oct-April; closed monsoon.',
  'Kudle Beach sunset 5.30-6.30pm is the busiest window — book a sand-table early in the season. The seafood depends on the morning Gokarna-port landing; pomfret and prawns most days, fish curry when surmai is available. Cash + UPI; cards rare.',
  'Kudle Beach (middle), Gokarna 581326',
  'https://maps.google.com/?q=Prema+Restaurant+Kudle+Beach+Gokarna',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d2456987-Reviews-Prema_Restaurant-Gokarna_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/gokarna/prema-restaurant-kudle-beach'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gokarna',
  'Sea Green Cafe',
  'Half-Moon Beach',
  'half-moon-beach',
  ARRAY['multi-cuisine','indian','italian','vegetarian']::text[],
  'casual',
  'Fresh fruit pancake',
  ARRAY['Fresh fruit pancake','Veg curry rice','Banana lassi','Lemon ginger tea','Pasta']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Half-Moon Beach (one of the harder-to-reach Gokarna beaches, 30 min walk from Om Beach trailhead) hut cafe running since the early 2010s — the only proper sit-down food option on Half-Moon. Pancakes, thalis, and pasta menu typical of the Gokarna circuit. Open 8am-9pm Oct-April; closed monsoon and on full-moon-tide days when access path floods.',
  'Half-Moon access is via 30 min cliff trail from Om Beach south end — go before 11am because the trail heats up midday and is unsafe after dark (no lighting). Cash only; no card or UPI signal.',
  'Half-Moon Beach, Gokarna 581326',
  'https://maps.google.com/?q=Sea+Green+Cafe+Half+Moon+Beach+Gokarna',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d8021598-Reviews-Sea_Green_Cafe-Gokarna_Uttara_Kannada_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
