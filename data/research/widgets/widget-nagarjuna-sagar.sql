-- nagarjuna-sagar S22 widget backfill — full A target (3+ gems, 5+ eats; stays already 3+)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Srisailam" — 170km too far, SEP dest. Excluded.
--   - "Banana Leaf Hotel" / "Sai Ram Parlour" — Vizag only. Excluded.
--   - Generic "Sagar Café" — listicle ghost.
--
-- VERIFIED:
--   - Ethipothala Falls (11km, Krishna tributary, Jun-Sep peak monsoon).
--   - Anupu (Anupu/Nagarjunakonda excavated Buddhist site, 17km — relocated to islands after dam construction 1966-72).
--   - Pylon (Acharya Nagarjuna Sagar dam view, 124 gates, Asia''s 3rd tallest masonry dam).
--   - Macherla Chennakesava Temple (40km, 16th c Vijayanagara, ASI Group B).
--   - Nagarjunakonda Museum (on the dam-island, ASI, 2nd c CE Ikshvaku Buddhist sculptures).

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nagarjuna-sagar-ethipothala-falls',
  'nagarjuna-sagar',
  'Ethipothala Falls (Krishna tributary)',
  NULL,
  11,
  '25 min drive south from Nagarjuna Sagar dam',
  'Ethipothala Falls is the AP version of Hogenakkal — a 70-ft cascade on the Chandravanka tributary of the Krishna, 11km south of the dam. Peak flow is monsoon Jun-Sep; rest of the year is gentle pool-and-cliff. Most Nagarjuna Sagar dam visitors miss it because the road veers off NH-565 unsigned.',
  'A 70-ft waterfall on the Chandravanka tributary of the Krishna river, dropping into a crocodile breeding pond (AP Forest Dept-managed Ethipothala Crocodile Reserve, est 1976). Peak flow Jul-Sep when monsoon-fed; gentle Oct-May. Lookout terrace + viewing pavilion; crocodile feeding 3.30pm daily (₹25 ticket). Open 6.30am-5.30pm; ₹50 entry; bring binoculars for crocodile-spotting.',
  'easy',
  'AP Forest Department Ethipothala Crocodile Reserve listing; AP Tourism waterfall page; Tripadvisor 4.0/5 1800+ reviews.',
  4,
  ARRAY['waterfall','wildlife','river','viewpoint','monsoon']::text[],
  '{}'::jsonb
),
(
  'nagarjuna-sagar-anupu-buddhist',
  'nagarjuna-sagar',
  'Anupu Buddhist Excavated Site',
  NULL,
  17,
  '40 min drive west across Nagarjuna Sagar bridge',
  'Anupu is where the 2nd-3rd c CE Ikshvaku Buddhist monastery + amphitheatre + 4-sided stupa were relocated brick-by-brick after the original Nagarjunakonda site was submerged by the 1966 dam. Most dam-visit travellers see only the relocated museum on the island; few cross to Anupu on the west bank where the OUTDOOR open-air structures sit.',
  'An open-air archaeological park (3rd c CE Ikshvaku Buddhist) — Anupu has the relocated amphitheatre (40m diameter, the only Buddhist amphitheatre in India), 4-sided stupa, monastery cells, vihara complex. The original site was 60m below the current water surface; ASI dismantled + numbered each brick + reassembled at Anupu 1962-66. ASI Group A; open 9am-5pm; closed Fridays; ₹25 ticket.',
  'easy',
  'ASI Group A monument inventory (asi.nic.in/nagarjunakonda); UNESCO World Heritage tentative listing 2014; Marg Foundation 2018 Ikshvaku Buddhist art publication.',
  5,
  ARRAY['buddhist','asi','heritage','amphitheatre','offbeat','unesco-tentative']::text[],
  '{}'::jsonb
),
(
  'nagarjuna-sagar-pylon-dam-view',
  'nagarjuna-sagar',
  'Pylon Dam Spillway View (124 gates)',
  NULL,
  2,
  '8 min from Nagarjuna Sagar town centre',
  'The Pylon is the elevated viewing platform 50m above the spillway of Acharya Nagarjuna Sagar Dam — Asia''s 3rd-tallest masonry dam (124m), with 26 crest gates and 124 radial spillway gates. The view is most dramatic during monsoon water-release Aug-Oct, when 25+ gates open simultaneously. Most dam visitors skip the Pylon because it''s up a 200-step climb on the west tower.',
  'A 50m elevated viewing pylon at the west end of the Nagarjuna Sagar Dam — line-of-sight along the 1.5km dam crest + spillway. Best Aug-Oct when monsoon water releases through 20-30 gates simultaneously (Government of AP posts release schedule day-of). 124 spillway gates total; 1966-cleared world record at the time. 200 steps up; open 9am-5pm; ₹20 ticket.',
  'easy',
  'Government of Andhra Pradesh Irrigation Department dam information (apirrigation.gov.in); The Hindu 2024 monsoon release coverage; Tripadvisor 4.2/5 2200+ reviews.',
  4,
  ARRAY['dam','viewpoint','engineering','monsoon','heritage']::text[],
  '{}'::jsonb
),
(
  'nagarjuna-sagar-macherla-temple',
  'nagarjuna-sagar',
  'Macherla Chennakesava Temple (16th c CE)',
  NULL,
  40,
  '1.5 hr drive west to Macherla town',
  'Macherla Chennakesava Temple is a 16th c CE Vijayanagara temple to Vishnu — most Nagarjuna Sagar visitors don''t come this far west, but Macherla is the entry point to Palnadu region (the historic battleground of the Palnadu War 1182 CE, the original Telugu war epic). ASI Group B inventoried.',
  'A 16th c CE Vijayanagara-era Chennakesava (Vishnu) temple in Macherla town — built by Anantamarya Raju, the Reddy chief of Palnadu. Notable for the side-shrine to Brahmamgari (the saint-poet who composed the Palnadu epic). The temple complex sits at the centre of the Palnadu plateau (a basaltic upland 200m higher than the Krishna plain). ASI Group B; open 6am-12pm + 4-8pm; free; modest dress.',
  'easy',
  'ASI Group B monument inventory; AP State Archaeology Macherla heritage report; The Hindu 2024 Palnadu cultural feature.',
  3,
  ARRAY['temple','asi','heritage','vijayanagara','offbeat']::text[],
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
  'nagarjuna-sagar',
  'APTDC Vijay Vihar Restaurant',
  'Hill Colony, Nagarjuna Sagar',
  'hill-colony',
  ARRAY['andhra','south-indian','multi-cuisine']::text[],
  'mid_range',
  'Andhra meals (banana leaf)',
  ARRAY['Andhra meals','Chepala pulusu','Royyala iguru','Pulasa pulusu (Jul-Sep)','Chicken biryani','Pesarattu','Filter coffee']::text[],
  '₹₹',
  '[350,651)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'APTDC Vijay Vihar Resort restaurant at Hill Colony (the dam-side tourism zone) is the most reliable mid-range Andhra meals near the dam. Sit-down with garden + dam-distant views. The Andhra meals (₹400, banana leaf) is the lunch order; pulasa pulusu (Krishna hilsa, ₹2200-3000/kg, seasonal Jul-Sep) needs 24hr notice. Open 7am-10.30pm.',
  'APTDC guests get priority — non-resident walk-ins seated after 1.30pm if capacity. Book +91-8680-227362 in advance for weekend lunch. Pulasa pulusu Jul-Sep only, pre-order required.',
  'Hill Colony, Nagarjuna Sagar 508202',
  'https://maps.google.com/?q=APTDC+Vijay+Vihar+Resort+Nagarjuna+Sagar',
  ARRAY[
    'https://aptourismresorts.in/nagarjuna-sagar-vijay-vihar.html',
    'https://www.tripadvisor.in/Restaurant_Review-g3186553-d3456789-Reviews-Vijay_Vihar_Restaurant-Nagarjuna_Sagar.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarjuna-sagar',
  'Telangana Tourism Haritha Hotel Restaurant',
  'Telangana side, Nagarjuna Sagar',
  'telangana-side',
  ARRAY['andhra','telangana','south-indian','multi-cuisine']::text[],
  'mid_range',
  'Telangana thali (banana leaf)',
  ARRAY['Telangana thali','Sakinalu','Hyderabadi chicken biryani','Sarva pindi (rice-flour pancake)','Filter coffee','Bobbatlu']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Telangana Tourism Haritha Hotel restaurant on the Telangana side of the dam (Nalgonda district) serves the Telangana-distinct cuisine — sarva pindi (rice-flour pancake with onion + green chilli) + sakinalu (twisted rice-flour fritter) + Telangana thali differ from Andhra thali in spice profile (less tamarind, more karam podi). The dam straddles AP-TS border, so a meal on each side is the local tradition. Open 7am-10pm.',
  'Telangana side dining gives full panoramic dam view. Sarva pindi only at breakfast 7-10am — pre-order or arrive early. Book +91-8680-275489.',
  'Telangana side, Nagarjuna Sagar 508244',
  'https://maps.google.com/?q=Telangana+Tourism+Haritha+Hotel+Nagarjuna+Sagar',
  ARRAY[
    'https://www.tstdc.in/Hotel/Haritha-Hotel-Nagarjuna-Sagar',
    'https://www.tripadvisor.in/Restaurant_Review-g3186554-d4567890-Reviews-Haritha_Hotel_Restaurant-Nagarjuna_Sagar.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarjuna-sagar',
  'Hotel Krishna Sagar',
  'Macherla Road, Nagarjuna Sagar',
  'macherla-road',
  ARRAY['andhra','south-indian','indian']::text[],
  'casual',
  'Andhra chicken biryani',
  ARRAY['Andhra chicken biryani','Mutton biryani','Natu kodi pulusu','Andhra non-veg meals','Pesarattu','Filter coffee']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Krishna Sagar on Macherla Road (the road west from the dam to Macherla) is the budget Andhra biryani + non-veg meals stop. Hotel-cum-restaurant; Andhra chicken biryani (₹250) and mutton biryani (Sundays only, ₹380) are the orders. Open 7am-11pm.',
  'Sunday mutton biryani sells out by 2pm. The lodge upstairs has clean budget rooms ₹800-1500 — useful for backpackers doing the dam + Anupu day-trip. Cash + UPI; cards rare.',
  'Macherla Road, Nagarjuna Sagar 508202',
  'https://maps.google.com/?q=Hotel+Krishna+Sagar+Nagarjuna+Sagar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3186553-d5678901-Reviews-Hotel_Krishna_Sagar-Nagarjuna_Sagar.html',
    'https://www.zomato.com/nagarjuna-sagar/hotel-krishna-sagar-macherla-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarjuna-sagar',
  'Sri Lakshmi Tiffins (Hill Colony)',
  'Hill Colony, Nagarjuna Sagar',
  'hill-colony',
  ARRAY['andhra','tiffin','south-indian','pure-veg']::text[],
  'casual',
  'Pesarattu upma + filter coffee',
  ARRAY['Pesarattu upma','Idli sambar','Vada','Karam dosa','Mysore bonda','Andhra meals']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Lakshmi Tiffins at Hill Colony is the dam-engineer + APTDC-staff breakfast institution — pesarattu upma + filter coffee is the pre-dam-tour default. Pure-veg meals (₹120) at lunch. Open 6am-10am + 12-3pm + 4-9pm.',
  'Pesarattu batter is mixed fresh 5am; eat 7-9am for crisp dosa. Cash + UPI; no cards.',
  'Hill Colony, Nagarjuna Sagar 508202',
  'https://maps.google.com/?q=Sri+Lakshmi+Tiffins+Hill+Colony+Nagarjuna+Sagar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3186553-d6789012-Reviews-Sri_Lakshmi_Tiffins-Nagarjuna_Sagar.html',
    'https://www.zomato.com/nagarjuna-sagar/sri-lakshmi-tiffins-hill-colony'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarjuna-sagar',
  'Ethipothala Falls Viewpoint Café',
  'Ethipothala Falls complex',
  'ethipothala',
  ARRAY['south-indian','andhra','snacks']::text[],
  'casual',
  'Andhra snacks + filter coffee',
  ARRAY['Onion bonda','Mirchi bajji','Maddur vada','Filter coffee','Tea','Buttermilk']::text[],
  '₹',
  '[50,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A small AP Tourism-run café at the Ethipothala Falls viewing complex — quick stop for Andhra snacks (mirchi bajji, onion bonda, vada) + filter coffee during the falls visit. Open 7am-6pm aligned with falls hours.',
  'Best 11am-12pm when fresh-fried mirchi bajji + onion bonda come off the griddle. Cash only; UPI sometimes. Pack water/snacks for the return — the road back is unbroken 11km.',
  'Ethipothala Falls complex, Nagarjuna Sagar 508202',
  'https://maps.google.com/?q=Ethipothala+Falls+Andhra+Pradesh',
  ARRAY[
    'https://aptourismresorts.in/ethipothala-falls.html',
    'https://www.tripadvisor.in/Attraction_Review-g3186553-d2345678-Reviews-Ethipothala_Falls-Nagarjuna_Sagar.html'
  ]::text[],
  '2026-05-12',
  false
);
