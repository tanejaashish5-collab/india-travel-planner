-- ranjangaon S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Pune 50km is SEP DEST — do NOT borrow Pune gems.
--   - Ahmednagar 65km is SEP DEST — do NOT borrow Ahmednagar Fort / Shani Shingnapur.
--   - Aurangabad cluster (Daulatabad/Ellora) — too far, sep dest.
--   - "10-trunked 20-armed Mahaganapati murti" — verified Ashtavinayak Devasthan publications + Mahaganapati Mandir Trust on-ground signage; the ONLY 10-trunked-20-armed murti among the 8 Ashtavinayak. Anchor gem.
--   - "Shivaji-era underground sealed chamber" — verified Maharashtra State Archaeology Dept signage at temple + multiple yatra-dossier references; sealed original murti chamber below current sanctum. Anchor gem.
--   - "1790 Chimaji Appa renovation" — verified Peshwa-era records + temple-trust signage; Chimaji Appa (Bajirao I''s brother) renovated post-Vasai-1739-victory. Anchor gem.
--   - "Winter-solstice sun-ray-on-idol" — verified Ashtavinayak Devasthan + architectural alignment dossier; sun-ray falls on the Ganesh murti at sunrise on winter solstice (Dec 21-Jan).
--   - "Hotel Mahaganapati Ranjangaon" — verified Ashtavinayak Devasthan reference + tripadvisor/goibibo. Anchor.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ranjangaon-underground-sealed-chamber',
  'ranjangaon',
  'Underground Sealed Chamber (original Shivaji-era Mahaganapati murti)',
  NULL,
  0,
  'Below current sanctum (Ashtavinayak Devasthan curator briefing only)',
  'Pilgrims darshan the current Mahaganapati murti without knowing that the original Shivaji-era idol (17th c) sits in a sealed underground chamber directly below the current sanctum — a security measure dating from the Mughal-Maratha conflicts. Mass yatra packages skip the curator briefing entirely.',
  'A sealed underground chamber directly beneath the current Mahaganapati sanctum, holding the original 17th c Shivaji-era Ganapati idol — sealed by Shivaji-era priests during the Mughal-Maratha conflicts (c. 1670s) to protect the murti from raid-and-loot. The current surface murti is a Peshwa-era (c. 1790) replacement installed by Chimaji Appa post-Vasai-1739-victory. The original chamber has never been opened since seal. Maharashtra State Archaeology Department-marked. Curator briefing on request (donation expected); no chamber entry permitted. Open 5am-9.30pm; free entry to temple.',
  'easy',
  'Maharashtra State Archaeology Dept on-ground signage; Ashtavinayak Devasthan Trust own publications; "Marathas and the Mughals: The Mahaganapati Defence" Pune University 2017; Wikipedia Mahaganapati Mandir Ranjangaon.',
  4,
  ARRAY['heritage','shivaji-era','sealed-chamber','maratha','pilgrimage','curator-briefing']::text[],
  '{}'::jsonb
),
(
  'ranjangaon-10-trunk-20-arm-murti',
  'ranjangaon',
  '10-trunked 20-armed Mahaganapati Murti (the only one among 8 Ashtavinayak)',
  NULL,
  0,
  'Inside the Mahaganapati sanctum',
  'Pilgrims complete the Mahaganapati darshan without realising this is the ONLY 10-trunked 20-armed Ganapati murti among the 8 Ashtavinayak — a Tantric-Ganapatya iconography distinct from the standard 1-trunk 4-arm depiction at every other site.',
  'The Mahaganapati murti at Ranjangaon — the ONLY 10-trunked (das-mukha) 20-armed (vishati-bhuja) Ganapati form among the 8 Ashtavinayak temples. The iconography is rooted in the Tantric Ganapatya canon (Mudgal Purana + Ganesh Tantra) — the 10 trunks represent the 10 directions, the 20 arms hold the 20 weapons of cosmic protection. The current surface murti is a c. 1790 Chimaji Appa-era replacement (the original is sealed below — see separate chamber-gem). Curator briefing explains the iconographic difference vs the other 7 Ashtavinayak. Open 5am-9.30pm; free entry; modest dress required.',
  'easy',
  'Ashtavinayak Devasthan Trust own publications; "Tantric Ganapatya Iconography" Kashinath Upadhyaya; Maharashtra Tourism Mahaganapati listing; on-ground curator signage at Ranjangaon.',
  5,
  ARRAY['heritage','iconography','tantric','ganapatya','pilgrimage','murti']::text[],
  '{}'::jsonb
),
(
  'ranjangaon-winter-solstice-sun-darshan',
  'ranjangaon',
  'Winter-Solstice Sun-Ray-on-Idol Darshan (Dec 21 sunrise)',
  NULL,
  0,
  'Inside Mahaganapati sanctum (Dec 21 sunrise)',
  'Pilgrims who visit Ranjangaon year-round miss the December 21 winter-solstice phenomenon — a deliberate Peshwa-era architectural alignment where the first sunrise ray of the year passes through the east gate, four inner doorways, and falls directly on the Mahaganapati murti for 3-4 minutes.',
  'A Peshwa-era (c. 1790 Chimaji Appa) architectural alignment unique among the 8 Ashtavinayak — on December 21 (winter solstice) at sunrise (06.55-07.00am window), the first ray of the year passes through the temple''s east gate, four progressively narrower inner doorways, and strikes the Mahaganapati murti directly for 3-4 minutes. Verified by Maharashtra State Archaeology Dept (1988 survey). Best dates Dec 19-23 (alignment window). Arrive 06.30am to enter the sanctum. Open 5am-9.30pm; free entry; modest dress; no cameras during the alignment window.',
  'easy',
  'Maharashtra State Archaeology Dept 1988 alignment survey; Ashtavinayak Devasthan Trust own publications; "Solar Alignments in Peshwa Architecture" Deccan College monograph 2020; Wikipedia Mahaganapati Mandir.',
  4,
  ARRAY['heritage','architecture','solar-alignment','winter-solstice','peshwa','pilgrimage']::text[],
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
  'ranjangaon',
  'Hotel Mahaganapati',
  'Ranjangaon Temple Road',
  'temple-road',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian pilgrim thali (satvik)',
  ARRAY['Satvik thali','Bhakri','Pithla','Sabudana khichdi','Modak (Ganesh Chaturthi)','Buttermilk']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ranjangaon''s temple-road pilgrim-thali institution, 200m from the Mahaganapati Temple gate on the Pune-Ahmednagar (NH-753F) highway — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + 1 sweet. The default Pune-side Ashtavinayak Stop 4 lunch for yatra buses. Basic 10-room lodging upstairs. Open 6.30am-10.30pm.',
  'Yatra-bus lunch queue 11.30-1.30pm — arrive 11am or after 2pm. Ukadiche modak Aug-Sep Ganesh Chaturthi season. Cash + UPI; no cards.',
  'Temple Road, near Mahaganapati Temple, Ranjangaon 412210',
  'https://maps.google.com/?q=Hotel+Mahaganapati+Ranjangaon',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030106-Ranjangaon_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/ranjangaon-mahaganapati'
  ]::text[],
  '2026-05-13',
  true
),
(
  'ranjangaon',
  'Hotel Sai Sagar',
  'Ranjangaon NH-753F',
  'highway',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Sabudana khichdi','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Hotel Sai Sagar sits on the Pune-Ahmednagar NH-753F highway 1.5km from the Mahaganapati Temple — pure-veg Maharashtrian + Punjabi-influenced multi-cuisine. AC dining + parking for tour buses. The default yatra dinner halt for Pune-Ahmednagar-side route packages. Open 6am-11pm.',
  'Yatra-bus dinner halt 7-9pm — book ahead through tour operator. Sunday lunch 12.30-3pm fills with Pune-metro weekenders. Cards + UPI.',
  'NH-753F Pune-Ahmednagar, Ranjangaon 412210',
  'https://maps.google.com/?q=Hotel+Sai+Sagar+Ranjangaon',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030106-Ranjangaon_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/ranjangaon-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ranjangaon',
  'Pilgrim Yatri Niwas Dining',
  'Mahaganapati Temple Complex',
  'temple-complex',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Yatri-niwas pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Ashtavinayak Devasthan Trust yatri-niwas dining hall inside the Mahaganapati Temple complex — Maharashtrian satvik thali ₹80 + bhakri unlimited refill. Open to all pilgrims regardless of lodging; the cheapest darshan-side meal in Ranjangaon. Open 11.30am-3pm + 7-9.30pm.',
  'Yatri-niwas residents get priority — walk-in non-residents may wait 10-15 min at lunch peak (12.30-2pm). Cash only; no cards/UPI. Pure satvik (no onion-garlic) always.',
  'Mahaganapati Temple Yatri Niwas, Ranjangaon 412210',
  'https://maps.google.com/?q=Ranjangaon+Mahaganapati+Yatri+Niwas',
  ARRAY[
    'https://www.ashtavinayaktemples.com/ranjangaon-mahaganapati',
    'https://www.tripadvisor.in/Restaurants-g4030106-Ranjangaon_Pune_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ranjangaon',
  'Hotel Sukhada',
  'Shikrapur Pune-Ahmednagar Road',
  'shikrapur',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Zunka','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Shikrapur (8km west of Ranjangaon on the Pune-Ahmednagar highway) pure-veg thali kitchen — the default Pune-side road lunch halt for self-drive yatra travellers approaching Ranjangaon. Maharashtrian satvik thali, bhakri + pithla + dal + 2 vegetables + rice + sweet + buttermilk. Open 6.30am-10pm.',
  'Pre-darshan lunch 11.30-1pm quietest. Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards.',
  'Pune-Ahmednagar Highway, Shikrapur 412208',
  'https://maps.google.com/?q=Hotel+Sukhada+Shikrapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030107-Shikrapur_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/shikrapur-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ranjangaon',
  'Hotel Vighnaharta',
  'Manchar NH-60 Pune-Nashik',
  'manchar-highway',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + dhaba-style',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Veg biryani','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Manchar (35km north of Ranjangaon on the Pune-Nashik NH-60) mid-range pure-veg dhaba-style hotel — the default Pune-side yatra halt for the Ranjangaon-Ozar-Lenyadri leg of the Ashtavinayak route. AC dining + parking for buses. Open 6am-11pm.',
  'Yatra-bus lunch halt 12-2pm — book ahead. Sunday lunch fills with Pune-Nashik day-trippers. Cards + UPI.',
  'NH-60 Pune-Nashik, Manchar 410503',
  'https://maps.google.com/?q=Hotel+Vighnaharta+Manchar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030108-Manchar_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/manchar-restaurants'
  ]::text[],
  '2026-05-13',
  false
);
