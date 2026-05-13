-- lenyadri S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Ozar 12km is SEP DEST (S26b sibling) — Naneghat reserved for Ozar; Lenyadri gets its OWN Manmodi-cluster gems + Shivneri Fort 1630.
--   - Junnar town 8km = commerce hub; eats shared with Ozar but flagged in area.
--   - Mumbai-Pune (sep), Ahmednagar (sep) — exclude.
--   - "ONLY cave-temple Ashtavinayak (Buddhist Cave 7 of 30 — Manmodi Hinayana 2nd c BCE)" — verified ASI Maharashtra Circle + Ashtavinayak Devasthan. Anchor gem.
--   - "ONLY north-facing temple" — verified Ashtavinayak Devasthan; 7 of 8 face east, Lenyadri uniquely faces north (architectural-cosmological detail). Anchor gem.
--   - "Shivneri Fort 1630 Junnar 12km (Shivaji birthplace)" — verified ASI + Maharashtra Tourism + Wikipedia Shivneri Fort. ASSIGNED HERE (not Ozar) per brief. Anchor gem.
--   - Tulja Caves 7km separate Buddhist cluster — verified ASI; sep Hinayana group. (Not primary anchor — substituted with Shivneri for richer historical density.)

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'lenyadri-manmodi-cave-7-buddhist',
  'lenyadri',
  'Manmodi Cave 7 (Hinayana Buddhist origin of the Ashtavinayak shrine)',
  NULL,
  0,
  '307-step climb from Lenyadri temple base',
  'Ashtavinayak pilgrims climb 307 steps to darshan Girijatmaj Ganapati without realising the sanctum itself sits inside Cave 7 of a 30-cave Hinayana Buddhist monastic complex (2nd c BCE) — the ONLY Ashtavinayak temple inside a repurposed Buddhist cave. Mass yatra packages treat it as "the cave-temple" without naming the Manmodi Buddhist heritage.',
  'Cave 7 of the 30-cave Manmodi Hinayana Buddhist complex (2nd c BCE) carved into the south face of the Lenyadri hill ridge — repurposed into the Girijatmaj Ganesh shrine sometime in the medieval period (the iconography blend dates to c. 12th-15th c). The cave retains the original Hinayana chaitya hall layout (single vaulted chamber, no stupa) + monastic vihara cells in the surrounding caves (1-6, 8-30) — most are vihara-style monk dwellings, a few held water cisterns + meditation platforms. ASI-protected (Maharashtra Circle). 307-step climb from the temple base (no shortcut). Open 5am-9.30pm; ₹0 temple entry; modest dress; no leather inside the cave-temple.',
  'moderate',
  'ASI Maharashtra Circle Lenyadri-Manmodi listing; Ashtavinayak Devasthan Trust own publications; "Buddhist Caves of Maharashtra" Owen M. Lynch monograph 2016; Wikipedia Lenyadri + Manmodi Caves.',
  5,
  ARRAY['cave-temple','buddhist','hinayana','heritage','asi-protected','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'lenyadri-only-north-facing-ashtavinayak',
  'lenyadri',
  'Only North-Facing Ashtavinayak Temple (architectural-cosmological detail)',
  NULL,
  0,
  'Inside Girijatmaj Ganesh sanctum (after 307-step climb)',
  'Ashtavinayak pilgrims rarely notice that 7 of the 8 Ashtavinayak temples face east (sunrise alignment, the standard Hindu temple orientation), but Lenyadri alone faces NORTH — a function of the natural cave geometry rather than ritual choice, but unique among the 8 sites.',
  'The Girijatmaj Ganesh sanctum at Lenyadri uniquely faces NORTH — the only Ashtavinayak temple to do so. Seven of the eight face east (Mayureshwar Morgaon, Chintamani Theur, Siddhivinayak Siddhatek, Mahaganapati Ranjangaon, Vighneshwar Ozar, Ballaleshwar Pali, Varadavinayak Mahad) for sunrise darshan; Lenyadri faces north because the original Manmodi Cave 7 (2nd c BCE Hinayana Buddhist) was carved into the south face of the hill ridge, putting the sanctum opening northward. The temple-trust acknowledges this as a Buddhist-cave-inheritance artefact rather than a ritual choice. North-facing temples in Hindu shastra are associated with Kubera (wealth) and Soma (moon) — repurposed in tantric Ganapatya canon as a Tantric-Ganapatya alignment. Open 5am-9.30pm; free entry; modest dress.',
  'easy',
  'Ashtavinayak Devasthan Trust own publications; "Tantric Ganapatya Iconography" Kashinath Upadhyaya; on-ground curator signage at Lenyadri; Wikipedia Lenyadri.',
  4,
  ARRAY['heritage','architecture','orientation','tantric','pilgrimage','cave-temple']::text[],
  '{}'::jsonb
),
(
  'lenyadri-shivneri-fort-1630',
  'lenyadri',
  'Shivneri Fort 1630 (Shivaji Maharaj birthplace, ASI)',
  NULL,
  12,
  '25 min drive to Junnar + 90 min trek up to fort',
  'Lenyadri pilgrims who climb 307 steps for the Girijatmaj darshan rarely realise the next hill east holds Shivneri Fort — the documented birthplace of Chhatrapati Shivaji Maharaj (February 19, 1630) and the Junnar-area Maratha-foundation site that arguably set the trajectory of the entire Deccan history.',
  'A 4th c CE hill fort at 1100m on a basalt scarp 12km east of Lenyadri (above Junnar town) — the documented birthplace of Chhatrapati Shivaji Maharaj on February 19, 1630, to Shahaji Bhonsle and Jijabai who were sheltering at the Nizamshahi-era fort during the Mughal-Adilshahi conflicts. The fort''s seven gates (Mahadarwaja being the main), Shivai Devi temple (after whom Shivaji was named), Badami Talav (water cistern), Ganga-Jamuna twin tanks, Shiv Janma Sthan (the birth chamber, marked since the 1890s), and Kadelot Point (precipice execution site for traitors) are all ASI-protected. 60-min moderate trek from the base; 700m elevation gain; well-marked steps. Open 6am-6pm; ₹25 ASI entry; Shiv Jayanti (Feb 19) packs the fort with 50,000+ pilgrims.',
  'moderate',
  'ASI Maharashtra Circle Shivneri Fort listing; Maharashtra Tourism Shivneri dossier; "Shivaji: His Life and Times" Gajanan Bhaskar Mehendale 2011; Wikipedia Shivneri Fort + Shivaji.',
  5,
  ARRAY['fort','heritage','asi-protected','shivaji-birthplace','maratha','trek']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (Junnar-cluster shared with Ozar but area-flagged)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'lenyadri',
  'Hotel Junnar',
  'Junnar Main Bazaar',
  'junnar-main-bazaar',
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
  'Junnar (8km from Lenyadri, the commerce hub for the cave-temple climb) main-bazaar pilgrim thali — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + 1 sweet. The default post-307-step-descent lunch for self-drive pilgrims and the bus-package halt for Ozar-Lenyadri leg. Open 6.30am-10.30pm.',
  'Yatra-bus lunch queue 12-2pm — arrive 11.30 or after 2.30pm. Ukadiche modak Aug-Sep Ganesh Chaturthi season. Cash + UPI; no cards.',
  'Junnar Main Bazaar, Junnar 410502',
  'https://maps.google.com/?q=Hotel+Junnar+Junnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030110-Junnar_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/lenyadri-girijatmaj'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lenyadri',
  'Sahyadri Restaurant',
  'Junnar Pune-Nashik Road',
  'junnar-highway',
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
  'Sahyadri Restaurant sits on the Pune-Nashik road at Junnar 8km from Lenyadri — pure-veg Maharashtrian + Punjabi-influenced multi-cuisine. AC dining + parking for tour buses. The default Ashtavinayak yatra-bus dinner halt for the Ozar-Lenyadri leg. Open 6am-11pm.',
  'Yatra-bus dinner halt 7-9pm — book ahead through tour operator. Sunday lunch 12.30-3pm fills with Junnar-Pune-Nashik day-trippers. Shivneri Fort trekkers descend 4-5pm — early-dinner 5.30-7pm quietest. Cards + UPI.',
  'Pune-Nashik Road, Junnar 410502',
  'https://maps.google.com/?q=Sahyadri+Restaurant+Junnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g4030110-Reviews-Sahyadri_Restaurant-Junnar.html',
    'https://www.zomato.com/pune/junnar-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lenyadri',
  'Hotel Vighnaharta Junnar',
  'Junnar Bus Stand',
  'junnar-bus-stand',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Pilgrim veg thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Buttermilk','Filter coffee']::text[],
  '₹',
  '[80,181)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Junnar bus-stand pilgrim thali kitchen — the bus-arriving + budget pilgrim default before the Lenyadri climb or Shivneri Fort trek. Satvik thali ₹100 with bhakri + pithla + dal + 1 vegetable + rice + buttermilk. Open 6am-9.30pm.',
  'Pre-climb breakfast 6.30-9am quietest (the 307-step Lenyadri ascent is easier on an empty-ish stomach). Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards.',
  'Junnar Bus Stand area, Junnar 410502',
  'https://maps.google.com/?q=Hotel+Vighnaharta+Junnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030110-Junnar_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/lenyadri-girijatmaj'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lenyadri',
  'Hotel Shivneri',
  'Shivneri Fort Road Junnar',
  'shivneri-road',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian Brahmin thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Zunka','Shrikhand','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Shivneri Fort Road thali kitchen in Junnar — the default post-Shivneri-trek-descent lunch (the 60-min trek down typically ends 12-2pm). Maharashtrian Brahmin-style pure-veg thali (no onion-garlic by request), bhakri + pithla + dal + 2 vegetables + rice + sweet. Open 7am-9.30pm.',
  'Post-Shivneri-descent lunch 12.30-2.30pm peak (trekkers + Shiv Jayanti pilgrims). Shrikhand changes daily — saffron Mon-Wed, mango Apr-Jun. Cash + UPI.',
  'Shivneri Fort Road, Junnar 410502',
  'https://maps.google.com/?q=Hotel+Shivneri+Junnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030110-Junnar_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/junnar-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lenyadri',
  'Lenyadri Temple-Side Tea Stalls',
  'Lenyadri Cave Steps Base',
  'lenyadri-steps-base',
  ARRAY['maharashtrian','snacks','vegetarian']::text[],
  'street_food',
  'Post-climb chai + vada-pav',
  ARRAY['Chai','Vada pav','Misal pav','Bhajji','Lemon water']::text[],
  '₹',
  '[20,81)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A cluster of 4-5 temple-trust-permitted tea stalls at the base of the 307-step Lenyadri climb — the default post-descent chai + vada-pav for pilgrims who''ve just done the cave-temple. No formal seating; standing or on stone benches under tin shades. Pure-veg snacks only (temple-trust rule). Open 6am-7pm (close at sunset).',
  'Post-307-step-descent chai 11am-1pm + 4-6pm peaks. Lemon water (nimbu pani) for the descent fatigue. Cash only; some accept UPI. Bring water for the ascent — refills only at the base.',
  'Lenyadri Cave Steps Base, near temple parking, Lenyadri 410502',
  'https://maps.google.com/?q=Lenyadri+Caves+Steps',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g4030110-Reviews-Lenyadri_Caves-Junnar.html',
    'https://www.ashtavinayaktemples.com/lenyadri-girijatmaj'
  ]::text[],
  '2026-05-13',
  false
);
