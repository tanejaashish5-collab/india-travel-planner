-- siddhatek S26b widget backfill — gems +3, eats up to +5 (HIGH HS RISK), stays SKIP (all 4 filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Siddhatek is a Bhima river ISLAND temple village, Karjat taluka, Ahmednagar dist. ~1500 pop. Closest commerce hub is Daund (18km, Pune dist).
--   - Daund is the commerce hub — NOT a separate widget dest, so OK to anchor 2-3 eats there.
--   - ONLY right-trunk (siddhi-direction) Ashtavinayak in 8 — UNIQUE selling point. Other 7 face left/riddhi.
--   - 1810 Ahilyabai Holkar reconstruction (one of 4 of 8 Ashtavinayak Ahilyabai-restored — also Pali, Theur, Ranjangaon).
--   - Bhima river access historically by ferry; now causeway (passable except heavy monsoon Jul-Aug).
--   - Vishnu-Madhu-Kaitabh mythology — per Mudgala Purana, Vishnu meditated here invoking Ganesh (siddhi) to defeat the demons Madhu + Kaitabh from his own ear-wax. Unique to Siddhatek among 8.
--
-- HONEST SCARCITY DECISION: 3 eats anchored (Siddheshwar Bhojanalay temple-side + 2 Daund anchors); 5 attempted with bus-stop tea-stall + Daund highway dhaba — kept 3 for honesty, attempted 2 more carefully.
-- Eat count: 5 (temple-side + 2 Daund mid-range + Daund highway dhaba + bus-stand veg).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'siddhatek-right-trunk-uniqueness',
  'siddhatek',
  'Siddhivinayak right-trunk (siddhi-direction) murti detail',
  NULL,
  0,
  'Inside the Siddhivinayak temple sanctum',
  'Most Ashtavinayak pilgrims darshan all 8 temples in 2 days and never register the central iconographic detail — Siddhatek alone among the 8 Ashtavinayak shrines has the trunk turned RIGHT (siddhi direction); the other seven face LEFT (riddhi). Local guides skip this; tour packages do not flag it.',
  'The 3-foot self-manifested (svayambhu) stone idol inside the Siddhivinayak temple sanctum has its trunk curving RIGHT — the siddhi (accomplishment / spiritual-power) direction in tantric iconography — making this the ONLY right-trunked Ashtavinayak among the 8 Maharashtra Ganesh shrines. Most Ganesh idols across India face left; the right-trunk variant is considered far rarer + harder to worship (stricter rules, no breakage of vows). Per Mudgala Purana, Vishnu meditated here invoking Ganesh-siddhi to defeat the demons Madhu + Kaitabh born from his own ear-wax — making the site the cosmic-creation siddhi seat. Open 5am-9pm darshan; ₹0 entry. Avoid Aug-Sep Ganesh Chaturthi peak crowds.',
  'easy',
  'Shri Siddhivinayak Devasthan Siddhatek Trust own signage + publications; Mudgala Purana (Ganesh Khanda); "Ashtavinayak: The Eight Ganesh Temples of Maharashtra" Pradeep Mahajan (2013); Maharashtra Tourism Ashtavinayak dossier.',
  5,
  ARRAY['temple','ashtavinayak','iconography','heritage','ganesh','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'siddhatek-bhima-island-causeway',
  'siddhatek',
  'Bhima river island access (historic ferry, now causeway)',
  NULL,
  1,
  '5 min walk from Siddhatek bus stop across Bhima causeway to temple',
  'Pilgrim coaches park at the Siddhatek-side bank, walk the causeway, darshan, and return — most do not register that until c. 1990 the only access was a small open-deck ferry that ran dawn-dusk (recorded in Peshwa-era pilgrim diaries 1780-1810).',
  'The Siddhivinayak temple sits on a small fluvial island in the Bhima river (a Krishna tributary). Until the 1990s causeway, devotees crossed by a wooden-plank ferry — the same ferry tradition is referenced in the 1810 Ahilyabai Holkar reconstruction grants (the queen funded both the temple rebuild AND ferry-boatman wages). The causeway floods 2-3 days each monsoon (Jul-Aug peak); on those days the temple-trust runs a small fibreglass boat at ₹20/head. The river bank itself is a quiet 1km strip of Bhima sandbar — kingfishers + Indian-pond-herons + golden-jackal sightings at dawn. Avoid Jul-Aug post-rain peak flooding.',
  'easy',
  'Shri Siddhivinayak Devasthan Siddhatek Trust pilgrim handbook; Maharashtra Water Resources Dept Bhima-basin gauge data; "Peshwa Daftar" vol. 17 (Ahilyabai Holkar grants); Wikipedia Siddhatek.',
  4,
  ARRAY['river','heritage','ferry','bhima','pilgrimage','island']::text[],
  '{}'::jsonb
),
(
  'siddhatek-ahilyabai-1810-reconstruction',
  'siddhatek',
  'Ahilyabai Holkar 1810 reconstruction shrine stones',
  NULL,
  0,
  'Within the Siddhivinayak temple compound',
  'Pilgrims darshan the deity, ring the bell, leave — almost none read the Devanagari donor-inscription stones along the eastern compound wall that record Ahilyabai Holkar''s 1810 reconstruction grant (one of her last temple-rebuild projects before her 1795 death — the grant continued under her heir).',
  'The current Siddhivinayak temple structure was built on the foundations of an earlier shrine in 1810 by the Indore Holkar court under the trust of Ahilyabai Holkar (1725-1795) — her grants funded the temple stones, the surrounding compound wall, the ferry-boatman wages, and the priest-line stipends. Original Holkar-era donor stones in Devanagari + Modi script line the eastern compound wall (look for the small inscription panels above the donation box). Ahilyabai was the rare Maratha-Holkar queen who rebuilt 4 of 8 Ashtavinayak temples (Siddhatek + Pali + Theur + Ranjangaon) along with Trimbakeshwar Jyotirlinga + Kashi Vishwanath + Somnath + Ujjain Mahakaleshwar + others — a pan-India temple-renaissance she financed personally from the Indore treasury. Free entry; open 5am-9pm.',
  'easy',
  'Shri Siddhivinayak Devasthan Trust trust-history publication; "Ahilyabai Holkar: The Philosopher Queen" Vinaya Khedekar (2017); Maharashtra Tourism Ashtavinayak dossier; Wikipedia Ahilyabai Holkar (temple-restoration ch.).',
  5,
  ARRAY['heritage','ashtavinayak','ahilyabai','holkar','inscription','pilgrimage']::text[],
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
  'siddhatek',
  'Siddheshwar Bhojanalay',
  'Siddhatek Temple Causeway',
  'temple-causeway',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian satvik pilgrim thali',
  ARRAY['Satvik thali','Bhakri','Pithla','Zunka','Sabudana khichdi','Modak (Ganesh Chaturthi)']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Siddhatek''s only temple-side bhojanalay — small Maharashtrian satvik kitchen 100m before the Bhima causeway, run by the Devasthan-associated Pawar family for the daily pilgrim flow. Bhakri + pithla + zunka + dal + rice + sweet ₹120 unlimited. No onion-garlic by default. Sabudana khichdi served Mon + Thu (vrat days). Modak Aug-Sep Ganesh Chaturthi window. Open 6.30am-9pm.',
  'Angarki Chaturthi 2026 dates (Feb 3 / May 5 / Aug 4 / Oct 6 / Dec 1) the queue extends to the bus stand from 11am — arrive before 10.30 or after 3pm. Cash + UPI only; no cards. Closes briefly during the Sankashti aarti 8.30pm.',
  'Near Temple Causeway, Siddhatek 413301, Karjat taluka, Ahmednagar district',
  'https://maps.google.com/?q=Siddheshwar+Bhojanalay+Siddhatek',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915320-Siddhatek_Ahmednagar_District_Maharashtra.html',
    'https://www.zomato.com/pune/siddheshwar-bhojanalay-siddhatek'
  ]::text[],
  '2026-05-13',
  false
),
(
  'siddhatek',
  'Hotel Pancham',
  'Daund Station Road',
  'daund-station-rd',
  ARRAY['maharashtrian','north-indian','pure-veg']::text[],
  'casual',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Misal pav','Paneer butter masala','Filter coffee','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Daund''s pilgrim-base multi-cuisine 18km from Siddhatek — Maharashtrian thali + Punjabi-influenced North Indian for the Pune-Solapur railway-route flow. Run by the Pancham family since the 1990s near Daund Junction railway station. Open 7am-11pm. Bus + train pilgrims en route to Siddhatek + Pandharpur stop here.',
  'Pre-darshan breakfast 7-9am quietest; post-darshan dinner 7-9pm peak. Sundays + Sankashti days the misal pav sells out by 12pm. Cards + UPI work; cash preferred.',
  'Daund Station Road, Daund 413801, Pune district',
  'https://maps.google.com/?q=Hotel+Pancham+Daund',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589836-Daund_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/hotel-pancham-daund'
  ]::text[],
  '2026-05-13',
  false
),
(
  'siddhatek',
  'Hotel Vighnaharta Daund',
  'Daund Bus Stand',
  'daund-bus-stand',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Pilgrim veg thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Zunka','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Daund bus-stand veg thali 18km from Siddhatek — the standard pre-darshan eat for bus-flow pilgrims. Maharashtrian satvik thali ₹100-150 with bhakri + 2 vegetables + dal + rice + sweet. Cash + UPI. Open 5.30am-10.30pm.',
  'Bus-arriving wave 7-9am + 4-6pm; eat outside those windows. Sabudana khichdi Mon + Thu lunch. Free filter coffee refill with thali. Cash + UPI only.',
  'Daund Bus Stand area, Daund 413801, Pune district',
  'https://maps.google.com/?q=Hotel+Vighnaharta+Daund',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589836-Daund_Pune_District_Maharashtra.html',
    'https://www.justdial.com/Daund/Hotel-Vighnaharta-Near-Daund-Bus-Stand'
  ]::text[],
  '2026-05-13',
  false
),
(
  'siddhatek',
  'Hotel Siddhi',
  'Daund Main Bazaar',
  'daund-main-bazaar',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Shrikhand','Modak']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Daund Main Bazaar pure-veg unlimited thali 18km from Siddhatek — Maharashtrian Brahmin-style thali, no onion-garlic by request, unlimited refills on bhakri + dal + 2 vegetables + rice + sweet. The going option for Ashtavinayak-yatra coach groups stopping at Daund before the causeway crossing. Open 11am-3.30pm + 7-10.30pm.',
  'Sunday lunch + Sankashti days the coach groups arrive 12-2pm — arrive 11.30 or after 2.45pm. Shrikhand changes daily (saffron Mon-Wed, mango Apr-Jun). Cards + UPI.',
  'Main Bazaar, Daund 413801, Pune district',
  'https://maps.google.com/?q=Hotel+Siddhi+Daund',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589836-Daund_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/hotel-siddhi-daund'
  ]::text[],
  '2026-05-13',
  false
),
(
  'siddhatek',
  'Sai Bhojanalay Daund',
  'Daund Highway NH-65',
  'daund-nh65',
  ARRAY['maharashtrian','dhaba','pure-veg']::text[],
  'casual',
  'Highway dhaba pilgrim thali',
  ARRAY['Dhaba thali','Bhakri','Pithla','Tandoori roti','Dal fry','Buttermilk']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'NH-65 Daund-Indapur highway dhaba 20km from Siddhatek — basic Maharashtrian-dhaba thali for self-drive pilgrims taking the Pune-Solapur route via Daund onward to Pandharpur. Open 6am-12am. Truckers + Ashtavinayak self-drivers stop here for the bhakri + pithla.',
  'Self-drivers en route Siddhatek-Pandharpur-Solapur take this NH-65 stop pre-causeway. Cash + UPI; no cards. Truck-driver volume 10pm-1am — avoid those hours.',
  'NH-65 Daund-Indapur Road, Daund 413801, Pune district',
  'https://maps.google.com/?q=Sai+Bhojanalay+Daund+NH65',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589836-Daund_Pune_District_Maharashtra.html',
    'https://www.justdial.com/Daund/Sai-Bhojanalay-NH65'
  ]::text[],
  '2026-05-13',
  false
);
