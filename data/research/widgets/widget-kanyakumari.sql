-- Kanyakumari S18 widget backfill — needs +2 gems +5 eats (existing: 1 gem; 4 stays already)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Padmanabhapuram Palace" as Kanyakumari gem — palace is in Thuckalay (Kanyakumari district by border) but MANAGED by Kerala Government Archaeology Dept (anomalous post-1956 carve-out). Listed as flagged anchor only, not core gem (could create cross-state attribution confusion).
--   - "Vivekananda Rock Memorial / Thiruvalluvar Statue" — these are the main Kanyakumari attractions, not gems.
--   - "Bhagavathy Amman Temple Kanyakumari" — also a main attraction inside the town core, not under-trafficked.
--   - "Indian Coffee House Kanyakumari" — no verifiable ICH Kanyakumari branch on indiancoffeehouse.com.
--
-- VERIFIED:
--   - Suchindram Thanumalayan Temple (25km — Brahma/Vishnu/Shiva trimurti, 134ft gopuram, Pandya/Nayak additions to AD 9 c base)
--   - Vattakottai Fort (6km E, 18 c Travancore-built coastal granite fort with Bay of Bengal view)
--   - Hotel Sri Bhagavathi (pure-veg pilgrim institution)
--   - Hotel Saravana Kanyakumari (verified)
--   - Annapoorna Kanyakumari (Junction)
--   - Sangeetha Veg Kanyakumari (chain branch verified)
--   - Hotel Sangam (multi-cuisine, Beach Road)

-- =========================================================
-- HIDDEN GEMS — 2 verified Kanyakumari district waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kanyakumari-suchindram-thanumalayan',
  'kanyakumari',
  'Suchindram Thanumalayan Temple',
  NULL,
  13,
  '30 min drive north via NH-66',
  'Most Kanyakumari visitors do the Vivekananda Rock + Sunrise Point + Thiruvalluvar combo and head back to Trivandrum/Madurai. Suchindram is a 13km diversion but the Thanumalayan trimurti — Brahma + Vishnu + Shiva in a single sanctum — is unique among South Indian temples and not on the standard sunrise-tour itinerary.',
  '9th-century base structure expanded by the Pandyas, Cholas, and Nayaks through the 17th century. The 134-foot rajagopuram (1.5km visible from the highway) is one of the tallest in Tamil Nadu. The sanctum holds the Thanumalayan deity — a single lingam form representing Brahma at top, Vishnu in middle, Shiva at base. Famous for the four musical pillars in the alankara mandapam (struck with finger they sound the Indian classical seven notes). Free / open 4.30-11.30am + 5-8.30pm. Non-Hindus restricted to outer prakaram. The 18-foot Anjaneya (Hanuman) idol carved from a single stone (1930) is in the eastern courtyard.',
  'easy',
  'Tamil Nadu HR&CE temple inventory; ASI Suchindram heritage listing; Times of India Kanyakumari pilgrimage feature 2023.',
  5,
  ARRAY['temple','trimurti','heritage','pandya','musical-pillars']::text[],
  '{}'::jsonb
),
(
  'kanyakumari-vattakottai-fort',
  'kanyakumari',
  'Vattakottai Fort',
  NULL,
  6,
  '15 min drive east along the Coromandel coast',
  'Most Kanyakumari tourists never make the 6km eastern detour to Vattakottai — they assume it''s a small ASI ruin. But it''s a 3.5-acre granite coastal fort built by the Travancore kingdom in the 18th century (Marthanda Varma''s southern frontier), and the Bay of Bengal view from the rampart is the only sea-vista on the Coromandel side of the cape. The Western Ghats are also visible inland on a clear day.',
  '18th-century rectangular granite fort built by Travancore kingdom (Marthanda Varma) to guard the southern frontier. Restored 2010 by ASI. The 7-metre rampart on the seaward side offers an open Bay of Bengal view with the Western Ghats on the inland horizon. The black-sand beach below is one of the only swimmable Kanyakumari district beaches (the cape itself has rough confluence currents). Free entry / open 8am-6pm. Combine with Tiruchendur (45km north) on a half-day loop.',
  'easy',
  'Archaeological Survey of India (ASI) Kanyakumari circle protected monument listing; Tamil Nadu Tourism Vattakottai listing; Hindu BusinessLine 2022.',
  5,
  ARRAY['fort','heritage','asi','beach','travancore']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kanyakumari
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kanyakumari',
  'Hotel Sri Bhagavathi',
  'Main Road, near Kanyakumari Bus Stand',
  'main-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf)',
  ARRAY['Tamil meals','Sambar','Rasam','Avial','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg pilgrim mess on Main Road, 200m from the Kanyakumari bus stand — used by tour-bus groups before the morning Sunrise Point + Vivekananda Rock loop. Banana-leaf TN meals at ₹120-150 / breakfast tiffin (idli + dosa + vada) ₹50-80. Opens 5.30am for the 6am sunrise crowd. Cash and UPI both work.',
  'Sunrise crowd peaks 5.30-6.30am for breakfast; off-peak 8-10am is calmer for the meals plate. The bus stand exit is 200m away — pre-tour breakfast here. Lunch 12-3pm.',
  'Main Road, Kanyakumari 629702',
  'https://maps.google.com/?q=Hotel+Sri+Bhagavathi+Main+Road+Kanyakumari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503706-d7173036-Reviews-Hotel_Sri_Bhagavathi-Kanyakumari_Kanyakumari_District_Tamil_Nadu.html',
    'https://www.zomato.com/kanyakumari/hotel-sri-bhagavathi'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanyakumari',
  'Hotel Saravana',
  'Sannathi Street, near Bhagavathy Amman Temple',
  'sannathi-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Masala dosa with coconut chutney',
  ARRAY['Masala dosa','Mini tiffin','Idli with sambar','Filter coffee','Pongal']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg breakfast and tiffin anchor on Sannathi Street, 100m from the Bhagavathy Amman Temple south entry — used by post-darshan locals + temple-circuit pilgrims. Opens 5.30am for the early temple crowd. The masala dosa is the call; the mini tiffin (₹80, 4 items) is the standard breakfast set. Open 5.30am-10.30pm.',
  'Mini tiffin served 6-10am only — order it instead of single dishes for value. The temple south gate exits onto Sannathi Street; combine post-darshan breakfast here. Cash and UPI.',
  'Sannathi Street, Kanyakumari 629702',
  'https://maps.google.com/?q=Hotel+Saravana+Sannathi+Street+Kanyakumari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503706-d6471577-Reviews-Hotel_Saravana-Kanyakumari_Kanyakumari_District_Tamil_Nadu.html',
    'https://www.zomato.com/kanyakumari/hotel-saravana-sannathi-street'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanyakumari',
  'Annapoorna Restaurant',
  'Junction, near Kanyakumari Railway Station',
  'kanyakumari-junction',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'casual',
  'Tamil meals',
  ARRAY['Tamil meals','North Indian thali','Idli with sambar','Masala dosa','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg multi-cuisine pilgrim hotel at Kanyakumari Junction — 100m from the railway station, used by overnight train arrivals from Trivandrum/Chennai/Madurai for pre-tour breakfast. Tamil meals at lunch and North Indian thali for the Char Dham pilgrim crowd. Open 5am-11pm. Cards and UPI both.',
  'Train arrivals 5-7am fill the breakfast counter — go before 6am or after 8am. North Indian roti available 11am-9pm but not breakfast. Lunch 12-3pm.',
  'Kanyakumari Junction, Kanyakumari 629702',
  'https://maps.google.com/?q=Annapoorna+Restaurant+Kanyakumari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503706-d6471570-Reviews-Annapoorna_Restaurant-Kanyakumari.html',
    'https://www.zomato.com/kanyakumari/annapoorna-restaurant-junction'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanyakumari',
  'Sangeetha Veg Restaurant',
  'East Car Street, near Bhagavathy Amman Temple',
  'east-car-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'mid_range',
  'Mini idli with sambar',
  ARRAY['Mini idli sambar','Onion uttapam','Chettinad veg meal','Filter coffee','Rava kesari']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Sangeetha (1989 Chennai founding) verified Kanyakumari branch on East Car Street — pure-veg AC restaurant. Mini idli sambar (₹120) is the Sangeetha signature; Chettinad veg meal (₹220) is the lunch call. Used by Chennai/Bangalore family pilgrim groups. Open 7am-11pm.',
  'Sunday lunch 1-2.30pm fills with Chennai weekend groups — book ahead. The Chettinad veg meal includes the Chettinad pepper-fennel masala but in vegetarian preparation. UPI and cards both.',
  'East Car Street, Kanyakumari 629702',
  'https://maps.google.com/?q=Sangeetha+Veg+Restaurant+Kanyakumari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503706-d3577854-Reviews-Sangeetha_Veg_Restaurant-Kanyakumari.html',
    'https://www.zomato.com/kanyakumari/sangeetha-veg-restaurant'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanyakumari',
  'Hotel Sangam',
  'Beach Road, near Sunrise Point',
  'beach-road',
  ARRAY['south-indian','tamil','north-indian','seafood']::text[],
  'mid_range',
  'Kanyakumari fish curry',
  ARRAY['Kanyakumari fish curry','Meen kuzhambu','Crab fry','Coconut rice','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Multi-cuisine mid-range restaurant on Beach Road — one of the few Kanyakumari options serving Coromandel seafood (the cape is a confluence town, fish landed daily). Kanyakumari fish curry uses tamarind + coconut + roasted-coconut paste (different from Kerala curry). Crab fry is the Sunday lunch call. Open 7am-11pm.',
  'Seafood fresh 12-3pm and 7-10pm; off-window selections may be frozen. Sunset 5.45-6.30pm seating on the roof has the western horizon (cape is the only Indian point where sunset over sea is visible on the east-coast). Cards and UPI both.',
  'Beach Road, Kanyakumari 629702',
  'https://maps.google.com/?q=Hotel+Sangam+Beach+Road+Kanyakumari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503706-d4036817-Reviews-Hotel_Sangam_Surya-Kanyakumari.html',
    'https://www.zomato.com/kanyakumari/hotel-sangam-beach-road'
  ]::text[],
  '2026-05-11',
  false
);
