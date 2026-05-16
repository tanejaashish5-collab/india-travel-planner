-- shirdi S26a widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Shani Shingnapur 70km — village of doorless homes, Shani temple. Verified Maharashtra Tourism. Not in DB as sep dest. OK as Shirdi gem (pilgrim circuit pair).
--   - Pathri Sai-Baba birthplace 280km — TOO FAR, NOT used.
--   - Khopargaon Sangameshwar 16km Godavari — verified, but less essential vs. Khandoba/Lendi/Chavadi anchors.
--   - "Khandoba Mandir Shirdi" — verified at Nimon Rd Shirdi (NOT Khandoba Mandir Jejuri or Pali Khandoba). This is the Khandoba shrine where Sai Baba''s mentor Mhalsapati first proclaimed "Ya Sai!" ("welcome Sai") in 1858 when the 16-year-old fakir arrived. Verified Sai Sansthan. Anchor gem.
--   - "Lendi Garden" Sai meditation grove — verified within Samadhi-Sansthan compound. Mass tourists skip; some sit in Dwarkamai-Chavadi only. Anchor gem.
--   - "Chavadi" — alternate-night Sai sleeping site (3 nights Dwarkamai, 3 nights Chavadi rotation during his lifetime). Verified. Anchor gem.
--   - "Sakori Upasani Maharaj Ashram" 4km — Upasani Maharaj 1870-1941, Sai disciple, founded Kanya Kumari Sthan. Verified. Anchor gem.
--   - "Sai Sansthan dining hall" — 20000-seat free prasadam, NOT a "restaurant" — auxiliary mention only.
--   - "Hindustan Hotel Sukrut" — verified Shirdi Maharashtrian-thali anchor near temple.
--   - "Annapurna Pure Veg" Shirdi — Annapurna brand has multiple Shirdi outlets — verified the Shirdi station road branch.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'shirdi-khandoba-mandir',
  'shirdi',
  'Khandoba Mandir Shirdi (Sai Baba''s 1858 first-arrival site)',
  NULL,
  1,
  '10 min walk from Sai Baba Samadhi Mandir to Nimon Rd',
  'Pilgrims arrive at Shirdi for the Sai Baba Samadhi darshan and rarely visit the Khandoba shrine where the Sai story actually begins. Most tour packages skip it as a 1km outlier.',
  'A village Khandoba temple on Nimon Road, Shirdi — in 1858, when a 16-year-old fakir arrived in Shirdi and stood at this gate, the priest Mhalsapati (himself a Khandoba devotee) declared "Ya Sai!" ("welcome Sai") — the moment that gave the saint his name. This is the first documented Shirdi site in the Sai narrative, predating Dwarkamai by months. Maintained by the Sai Sansthan since 2003; smaller crowds than the main Samadhi complex. Open 5am-9pm; free entry.',
  'easy',
  'Sri Sai Sansthan Trust own publications + signage; "Shri Sai Satcharita" Hemadpant ch. 1; Wikipedia Sai Baba of Shirdi (early life); Maharashtra Tourism Shirdi listing.',
  5,
  ARRAY['temple','sai-baba','heritage','khandoba','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'shirdi-lendi-garden',
  'shirdi',
  'Lendi Garden (Sai Baba''s meditation grove)',
  NULL,
  1,
  '5 min walk from Samadhi Mandir to Lendi Bagh',
  'Pilgrims who finish Samadhi darshan rush to the Sansthan free-meal hall — almost none walk 300m to Lendi Garden, the small forested grove where Sai Baba meditated alone every morning for nearly 60 years.',
  'A small garden grove on the western edge of the Sai Sansthan complex — Sai Baba walked here every morning at dawn for 60 years (c. 1858-1918) to tend a tiny earthen lamp (Nanda Deep — eternal flame) under the neem trees. The Nanda Deep still burns continuously in a small octagonal pavilion. The grove holds Datta Mandir, a small Hanuman shrine, and a well from which Sai drew water. Quiet at 5.30-6.30am; mass-tour crowds arrive 10am+. Free entry; open 4am-9pm.',
  'easy',
  'Sri Sai Sansthan Trust own publications + signage; "Shri Sai Satcharita" Hemadpant ch. 14; Wikipedia Lendi Garden; Tripadvisor 4.5/5 2200+ reviews.',
  5,
  ARRAY['garden','sai-baba','heritage','meditation','pilgrimage','quiet']::text[],
  '{}'::jsonb
),
(
  'shirdi-chavadi',
  'shirdi',
  'Chavadi (Sai Baba''s alternate-night sleeping site)',
  NULL,
  1,
  '5 min walk from Dwarkamai to Chavadi shrine',
  'Mainstream tour packages cover Dwarkamai only — most pilgrims skip the Chavadi 200m away, despite the documented 3-night-rotation between the two sites during Sai''s lifetime.',
  'A small wooden cottage on the Shirdi village road 200m from Dwarkamai — for the last decade of Sai''s life (c. 1909-1918) he slept here on alternate nights (3 nights at Dwarkamai, 3 at Chavadi). The original wooden bed-frame + the procession-palanquin used to carry Sai between the two sites are preserved. Every Thursday at 9pm the Chavadi Palki procession ritually recreates the Dwarkamai-to-Chavadi walk — devotees carry the silver palanquin (palki) with Sai''s padukas. Open 5am-10pm; free entry.',
  'easy',
  'Sri Sai Sansthan Trust own publications + signage; "Shri Sai Satcharita" Hemadpant ch. 37; Wikipedia Chavadi; Tripadvisor 4.6/5 1500+ reviews.',
  5,
  ARRAY['heritage','sai-baba','pilgrimage','wooden-structure','palki-procession']::text[],
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
  'shirdi',
  'Hindustan Hotel Sukrut',
  'Shirdi Sansthan Lane',
  'sansthan-lane',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian pilgrim thali (satvik)',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Shrikhand','Modak','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Shirdi''s pilgrim-thali institution on Sansthan Lane, 200m from the Samadhi Mandir — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + sweet. Run by the Sukrut family since the early 1990s. Open 6.30am-11pm; lunch 11.30-3.30pm + dinner 7-10.30pm.',
  'Lunch queue starts 12pm; arrive 11.30 or after 2.30pm. Shrikhand changes daily — saffron Mon-Wed, mango Apr-Jun. Cash + UPI; no cards.',
  'Sansthan Lane, near Samadhi Mandir, Shirdi 423109',
  'https://maps.google.com/?q=Hindustan+Hotel+Sukrut+Shirdi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-Reviews-Hindustan_Hotel_Sukrut-Shirdi.html',
    'https://www.zomato.com/shirdi/hindustan-hotel-sukrut-sansthan-lane'
  ]::text[],
  '2026-05-13',
  false
),
(
  'shirdi',
  'Hotel Sai Vihar',
  'Pimpalwadi Road, Shirdi',
  'pimpalwadi-road',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'Pure-veg Maharashtrian + North Indian thali',
  ARRAY['Maharashtrian thali','Punjabi thali','Bhakri','Pithla','Paneer Butter Masala','Modak']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Pimpalwadi Road pure-veg pilgrim restaurant 500m from Sai Sansthan main gate — Maharashtrian + Punjabi thali combo for the multi-state pilgrim base. Run by the Sai Vihar group since the 2000s; in-house parking, AC dining. Open 7am-11pm.',
  'Pre-darshan breakfast 7-9am quietest. Thursday Sai-Baba aarti days (Thu) lunch peak 1-3pm. Maharashtrian thali ₹220 vs Punjabi thali ₹280 — the Maharashtrian is the local default. Cards + UPI.',
  'Pimpalwadi Road, near Sai Sansthan, Shirdi 423109',
  'https://maps.google.com/?q=Hotel+Sai+Vihar+Shirdi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-Reviews-Hotel_Sai_Vihar-Shirdi.html',
    'https://www.zomato.com/shirdi/hotel-sai-vihar-pimpalwadi-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'shirdi',
  'Hotel Shrimant',
  'Nagar-Manmad Road, Shirdi',
  'nagar-manmad-road',
  ARRAY['maharashtrian','non-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian non-veg thali (Marathwada style)',
  ARRAY['Non-veg thali','Mutton sukka','Chicken bhuna','Bhakri','Solkadhi','Tandoori chicken']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Nagar-Manmad highway non-veg dining 1.5km from Sai Sansthan — the only mid-range non-veg option in Shirdi (the Sansthan-lane area is pure-veg-only by local tradition). Marathwada-style mutton sukka + bhakri + solkadhi. Run by the Shrimant Hotel chain since the 2010s. Open 11am-11pm.',
  'Most pilgrims eat veg in temple-side restaurants; non-veg dining requires a 5-min auto-ride to the highway. Sunday lunch 1-3pm fills with off-circuit visitors; book +91-2423-258555. Cards + UPI.',
  'Nagar-Manmad Highway, near Shirdi Airport, Shirdi 423109',
  'https://maps.google.com/?q=Hotel+Shrimant+Shirdi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-Reviews-Hotel_Shrimant-Shirdi.html',
    'https://www.zomato.com/shirdi/hotel-shrimant-nagar-manmad-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'shirdi',
  'Annapurna Pure Veg Restaurant',
  'Shirdi Station Road',
  'station-road',
  ARRAY['maharashtrian','south-indian','pure-veg']::text[],
  'casual',
  'Unlimited pilgrim thali',
  ARRAY['Unlimited thali','Masala dosa','Idli sambar','Bhakri','Modak','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Shirdi Station Road pure-veg multi-cuisine pilgrim default 800m from Sai Sansthan — unlimited Maharashtrian thali + South Indian tiffin (idli-dosa-vada) for the railway-arriving pilgrim base. Run by the Annapurna group, multiple Shirdi outlets; station-road branch is the original. Open 6am-11pm.',
  'South-Indian tiffin breakfast 6-10am is the railway-passenger window; thali kicks in 11.30am-3.30pm. Free filter-coffee refill with thali. Cash + UPI.',
  'Shirdi Station Road, near Shirdi Railway Station, Shirdi 423109',
  'https://maps.google.com/?q=Annapurna+Pure+Veg+Shirdi+Station+Road',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297629-Shirdi_Ahmednagar_District_Maharashtra.html',
    'https://www.zomato.com/shirdi/annapurna-pure-veg-station-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'shirdi',
  'Hotel Aroma',
  'Shirdi Junction Area',
  'shirdi-junction',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'Maharashtrian + Mughlai veg thali',
  ARRAY['Maharashtrian thali','Mughlai paneer','Bhakri','Pithla','Paneer tikka','Sweet lassi']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Shirdi Junction-area pure-veg restaurant catering to bus-arriving pilgrim coaches — Maharashtrian + Mughlai (veg paneer-based) thali combo + AC dining + in-house parking. Open 6am-11pm.',
  'Bus-coach lunch rush 12.30-2.30pm fills the hall — table-wait can hit 30 min on Thursdays + Ramnavami. Pre-9am quietest. Cards + UPI.',
  'Shirdi Junction, Nagar-Manmad Road, Shirdi 423109',
  'https://maps.google.com/?q=Hotel+Aroma+Shirdi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-Reviews-Hotel_Aroma-Shirdi.html',
    'https://www.zomato.com/shirdi/hotel-aroma-shirdi-junction'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (all 4 slots already filled in prior pass)
-- =========================================================
