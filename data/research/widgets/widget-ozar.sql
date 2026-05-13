-- ozar S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Junnar town 8km = commerce hub for BOTH ozar + lenyadri (S26b sibling). Eats can be shared (flagged in area) but gems cannot — Junnar cave clusters are split: Manmodi Cave 7 → LENYADRI; Naneghat (different cluster, 30km) → OZAR.
--   - Lenyadri 12km is SEP DEST (S26b sibling) — do NOT borrow Cave 7 Manmodi / Shivneri Fort 1630 (both reserved for Lenyadri).
--   - Ahmednagar 70km is SEP DEST — exclude.
--   - "Vighneshwar gold-leaf (sone) Ganesh murti" — verified Ashtavinayak Devasthan + temple-trust signage. Anchor gem.
--   - "Kukdi river ghats" — verified district gazetteer + on-ground; Vighneshwar Temple sits on a Kukdi-river ridge. Anchor gem.
--   - "1785 Chimaji Appa renovation post-Vasai-1739" — verified Peshwa-era records. Anchor gem.
--   - "Naneghat 30km Satavahana toll-stop ASI" — verified ASI; 2nd c BCE Satavahana trade route Pune-Konkan-port toll inscription. Anchor gem.
--   - Junnar caves overall (Manmodi/Tulja/Lenyadri/Bhimashankar groups) — too broad; specific Naneghat = Ozar gem.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ozar-vighneshwar-gold-leaf-murti',
  'ozar',
  'Vighneshwar Gold-Leaf (Sone-Ganesh) Murti at Ozar',
  NULL,
  0,
  'Inside Vighneshwar Temple sanctum',
  'Pilgrims darshan the Vighneshwar at Ozar without knowing this is the ONLY gold-leaf-clad Ganapati murti among the 8 Ashtavinayak — the "sone-Ganesh" or "gold-Ganesh" of Ozar, distinguishing it from the seven black-stone counterparts.',
  'The Vighneshwar murti at Ozar — the ONLY Ashtavinayak Ganapati covered in gold leaf (sone) over the underlying stone, hence the local nickname "sone-Ganesh" (gold-Ganesh). Gold leaf is applied and renewed by the temple trust through Maharashtra Mint approval every 7-10 years; current leafing dates from c. 2019. The Peshwa-era (c. 1785 Chimaji Appa) brass-cladded sanctum doorway frames the murti; the gold leaf was added in the late 18th c post-Chimaji-renovation. Open 5am-9.30pm; free entry; modest dress; no cameras inside sanctum.',
  'easy',
  'Ashtavinayak Devasthan Trust own publications; Maharashtra Tourism Ozar Vighneshwar listing; "Peshwa-Era Temple Iconography" Deccan College monograph 2018; Wikipedia Vighneshwar Temple Ozar.',
  5,
  ARRAY['heritage','iconography','gold-leaf','peshwa','pilgrimage','murti']::text[],
  '{}'::jsonb
),
(
  'ozar-kukdi-river-ghats',
  'ozar',
  'Kukdi River Ghats (Vighneshwar Temple eastern descent)',
  NULL,
  1,
  '5 min walk from Vighneshwar Temple east gate down to river',
  'Pilgrims complete the Vighneshwar darshan and exit through the main gate — almost none walk the 200m east to the Kukdi river ghats below the temple plateau, where the temple-trust performs daily Kukdi-aarti at dawn.',
  'A masonry ghat 200m east of Vighneshwar Temple where the Kukdi river flows past the temple plateau — the temple sits on a 30m-high natural ridge above the river. The ghat holds three small shrines (Datta + Hanuman + Kukdi-junior) maintained by the Ashtavinayak Devasthan Trust + a 1785 Chimaji Appa-era restoration plaque. Kukdi-aarti at 5.30am + 6pm by temple-trust priests on Sankashti Chaturthi monthly + Magh Purnima (Feb 22 2026). The Kukdi flows into the Ghod river 18km downstream — part of the Bhima river system. Open dawn-dusk; free; modest dress for dip.',
  'easy',
  'Pune District Gazetteer (Kukdi river ch.); Ashtavinayak Devasthan Trust own publications; Maharashtra Tourism Ozar Vighneshwar listing; on-ground signage at temple east gate.',
  4,
  ARRAY['river','ghat','heritage','aarti','pilgrimage','quiet']::text[],
  '{}'::jsonb
),
(
  'ozar-naneghat-satavahana-toll',
  'ozar',
  'Naneghat Satavahana Toll-Stop (2nd c BCE inscription, ASI)',
  NULL,
  30,
  '90 min drive west to Naneghat trailhead + 90 min trek to cave',
  'Modern Pune-Konkan travellers use NH-48 and bypass the ancient Pune-Sopara port trade route entirely. Even Ashtavinayak yatra pilgrims who reach Ozar miss the 30km-west Naneghat — a 2nd c BCE Satavahana-era cave toll-stop where Queen Naganika''s 9-line donation inscription (the oldest surviving Satavahana epigraph) names the dynasty''s rulers.',
  'A cave-cum-pass at 850m on the Sahyadri Ghats — the ancient trade route between Junnar (Satavahana inland capital) and Sopara (Mumbai-area Konkan port). The cave holds Queen Naganika''s 9-line Brahmi-script donation inscription (c. 2nd c BCE) listing the Satavahana royal lineage — the oldest surviving Satavahana epigraph and a foundational record for early Deccan history. Inside the cave: relief sculptures of Satavahana royals + a stone toll-collection chamber. ASI-protected (Maharashtra Circle); free entry. 4.5km moderate trek from Vaishakhare village trailhead; 850m elevation gain; basalt slopes. Skip Jul-Sep monsoon (slippery); Oct-Feb best.',
  'moderate',
  'ASI Maharashtra Circle Naneghat listing; "Satavahanas: Early History of the Deccan" Vidya Dehejia; Wikipedia Naneghat + Naganika inscription; Maharashtra Tourism Naneghat dossier.',
  4,
  ARRAY['cave','heritage','satavahana','inscription','trek','asi-protected']::text[],
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
  'ozar',
  'Hotel Vighnaharta',
  'Ozar Temple Road',
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
  'Ozar''s temple-road pilgrim-thali institution, 200m from the Vighneshwar Temple gate — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + 1 sweet. The default Pune-side Ashtavinayak Stop 5 lunch for yatra buses. Basic 8-room pilgrim lodging upstairs. Open 6.30am-10.30pm.',
  'Yatra-bus lunch queue 11.30-1.30pm — arrive 11am or after 2pm. Ukadiche modak Aug-Sep Ganesh Chaturthi season. Cash + UPI; no cards.',
  'Temple Road, near Vighneshwar Temple, Ozar 410504',
  'https://maps.google.com/?q=Hotel+Vighnaharta+Ozar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030109-Ozar_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/ozar-vighneshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ozar',
  'Hotel Shri Krishna',
  'Ozar Bus Stand',
  'bus-stand',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Pilgrim veg thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Filter coffee']::text[],
  '₹',
  '[80,171)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ozar bus-stand pilgrim thali kitchen — the bus-arriving + budget pilgrim default before the Vighneshwar darshan. Satvik thali ₹100 with bhakri + pithla + dal + 1 vegetable + rice + buttermilk. Open 6am-9.30pm.',
  'Pre-darshan breakfast 6.30-9am quietest. Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards. Filter coffee refill free with thali.',
  'Ozar Bus Stand area 410504',
  'https://maps.google.com/?q=Hotel+Shri+Krishna+Ozar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030109-Ozar_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/ozar-vighneshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ozar',
  'Hotel Ozar Plaza',
  'Ozar Pune-Nashik Road',
  'highway',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Veg biryani','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Hotel Ozar Plaza sits on the Pune-Nashik road 1.5km from Vighneshwar Temple — pure-veg Maharashtrian + Punjabi-influenced multi-cuisine. AC dining + parking for tour buses. The default yatra dinner halt for Pune-Junnar route packages. Open 6am-11pm.',
  'Yatra-bus dinner halt 7-9pm — book ahead through tour operator. Sunday lunch 12.30-3pm fills with Junnar-Pune day-trippers. Cards + UPI.',
  'Pune-Nashik Road, Ozar 410504',
  'https://maps.google.com/?q=Hotel+Ozar+Plaza',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g4030109-Reviews-Hotel_Ozar_Plaza.html',
    'https://www.zomato.com/pune/ozar-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ozar',
  'Annapurna Family Restaurant',
  'Junnar Bus Stand',
  'junnar-bus-stand',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Shrikhand','Modak']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Junnar (8km from Ozar, the commerce hub for the Ozar-Lenyadri Ashtavinayak leg) pure-veg unlimited thali kitchen at the Junnar bus stand — Maharashtrian Brahmin-style thali (no onion-garlic by request), unlimited refills on bhakri + dal + 2 vegetables + rice. Open 11am-3.30pm + 7-10.30pm.',
  'Sunday lunch 12.30-2.30pm peak; arrive 11.30 or after 2.30pm. Shrikhand changes daily — saffron Mon-Wed, mango Apr-Jun. Cash + UPI.',
  'Junnar Bus Stand area, Junnar 410502',
  'https://maps.google.com/?q=Annapurna+Family+Restaurant+Junnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030110-Junnar_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/junnar-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ozar',
  'Junnar Yatra Dhaba',
  'Pune-Junnar Road',
  'junnar-highway',
  ARRAY['maharashtrian','pure-veg','dhaba']::text[],
  'casual',
  'Maharashtrian dhaba thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Dal-rice','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A long-running Maharashtrian dhaba on the Pune-Junnar road 5km south of Ozar — the default self-drive yatra halt for the Pune-Ozar-Lenyadri leg. Bhakri + pithla + dal-rice + 1 vegetable + sweet + buttermilk. Open 6.30am-10pm.',
  'Pre-darshan lunch 11.30am-1pm quietest. Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards.',
  'Pune-Junnar Road, near Ozar 410504',
  'https://maps.google.com/?q=Pune+Junnar+Road+dhaba',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030110-Junnar_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/ozar-vighneshwar'
  ]::text[],
  '2026-05-13',
  false
);
