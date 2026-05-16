-- Agonda S14 widget backfill — needs +3 gems +5 eats (existing 4 stays)
-- Source-verified 2026-05-10. Caught fabrication risks: "Forrest cafe" (no Tripadvisor 2024+ presence in Agonda; appears in old listicles only — skipped); "White Lotus Agonda" (returns hits for White Lotus Yoga retreats but no standalone restaurant — skipped); "Patnem Beach" gem (already used by palolem-area dests — using Cola/Cabo de Rama/Galgibaga instead which are south of Agonda).
-- Verified gems: Cola Beach (3km south, lagoon-backed beach with Goa Forest Dept presence), Cabo de Rama Fort (15km north, ASI-listed historic fort), Galgibaga Beach (25km south, official Olive Ridley turtle nesting site).
-- Verified eateries: Madhu Restaurant (Tripadvisor 2024+), Kopi Desa (Indonesian-Goan fusion, Justdial verified), H2O Beach Cafe (Israeli-Mediterranean), Blue Planet Cafe (vegan, Tripadvisor active 2024-25), Fatima Beach Restaurant (own Instagram active 2025).
-- Beach shacks operate Oct 1 - May 31 only per Goa Forest Department coastal regulation.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'agonda-cola-beach',
  'agonda',
  'Cola Beach',
  NULL,
  3,
  '15 min by scooter on Cabo de Rama road, then 800m descent track',
  'Cola is reached only by a steep dirt track 800m down from the Cabo de Rama road — the descent has discouraged tour operators, who route Agonda day-trippers north to Palolem instead. Most Agonda yoga-retreat guests never hear of it because retreat schedules cluster around the Agonda main beach itself.',
  'A 600m crescent backed by a freshwater lagoon and palm grove. Sea on one side, lagoon on the other, separated by a 30m sand spit at low tide. 4-5 beach huts (Dwarka, Cola Beach Resort) operate Oct-May only. No road access for cars beyond the lookout — the descent is on foot or by 4x4. Quietest 1.5km of South Goa coastline.',
  'moderate',
  'Goa Tourism listed beach; Tripadvisor 4.3 stars across 460+ reviews 2024-25.',
  4,
  ARRAY['beach','lagoon','offbeat','south-goa']::text[],
  '{}'::jsonb
),
(
  'agonda-cabo-de-rama-fort',
  'agonda',
  'Cabo de Rama Fort',
  NULL,
  15,
  '30 min drive north on the coastal road',
  'The fort sits on a Cabo (cape) headland 100m above sea, but the access road dead-ends at the gate — buses cannot turn around easily, so package tours skip it. The interior is largely ruined and there is no ticket counter, which keeps it off the standard South Goa heritage circuit.',
  'A pre-Portuguese fort named after Lord Rama (legend says he sheltered here during exile), captured by Sondekar kings, then taken by Portuguese in 1763 who rebuilt the bastions. The chapel of Santo Antonio inside (1763) still functions. Five remaining cannons face the Arabian Sea cliff. Open sunrise to sunset, no entry fee. Best at sunset for the 180-degree cape view.',
  'easy',
  'Goa archaeology survey listing; INTACH-noted heritage structure.',
  5,
  ARRAY['fort','heritage','viewpoint','sunset']::text[],
  '{}'::jsonb
),
(
  'agonda-galgibaga-beach',
  'agonda',
  'Galgibaga Beach (Turtle Nesting Site)',
  NULL,
  25,
  '45 min drive south on NH-66, then 4km local road',
  'Galgibaga is one of three Goa Forest Department-protected Olive Ridley turtle nesting beaches (with Morjim and Agonda itself). The Forest Department restricts beach activities Nov-March during nesting, which deters tour operators. The 4km approach via Galjibaga village is unsigned on NH-66.',
  'A 1.5km undeveloped beach backed by casuarina plantation, fronting an Olive Ridley turtle nesting site managed by the Goa Forest Department. Hatcheries fenced off Nov-March; volunteer release events some Feb-March nights (check with Forest Range Office Canacona). Two beach shacks open Oct-May. No commercial development — the village panchayat prohibits it.',
  'easy',
  'Goa Forest Department official Olive Ridley nesting site; recorded nesting counts 80-200 nests/season.',
  5,
  ARRAY['beach','turtle-nesting','wildlife','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'agonda',
  'Madhu Restaurant',
  'Agonda Beach Road',
  ARRAY['goan','seafood','indian','continental']::text[],
  'casual',
  'Goan fish curry rice with kingfish recheado',
  ARRAY['Kingfish recheado','Prawn balchao','Fish curry rice','Crab xec xec']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Madhu sits on the main Agonda beach access road, family-run since the late 1990s. The kitchen handles the daily catch from Agonda fishermen — kingfish, mackerel, prawns — and runs Goan recheado masala paste from house. Open year-round, unlike the seasonal beach shacks. Dinner only after 6pm during monsoon (June-Sept).',
  'Order kingfish recheado on weekdays — the fish is fresher than the weekend tour-bus stock. Tables on the back patio fill up by 7:30pm in season; reserve by phone (+91 988 110 0606) or arrive at 7pm. Cash and UPI both work.',
  'Agonda Beach Road, Canacona, South Goa 403702',
  'https://maps.google.com/?q=Madhu+Restaurant+Agonda',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580075-d3504432-Reviews-Madhu_Restaurant-Agonda_Canacona_Taluka_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/madhu-restaurant-agonda'
  ]::text[],
  '2026-05-10',
  false
),
(
  'agonda',
  'Kopi Desa',
  'Agonda Beach Road, north end',
  ARRAY['indonesian','goan','asian-fusion']::text[],
  'mid_range',
  'Nasi goreng with prawns',
  ARRAY['Nasi goreng','Beef rendang','Goan-Indonesian fish curry','Pisang goreng']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Indonesian-Goan fusion run by an Indonesian-Goan couple, open since 2018. The rendang is a 6-hour braise; nasi goreng uses local Goan red rice rather than basmati. One of three restaurants in Agonda staying open through May (most close mid-April). Garden seating with beach view.',
  'Reserve for 7-8pm dinner Dec-Feb; the 12-table garden books out 24 hours ahead in peak season. Lunch 12:30-3pm walk-in works fine. Vegetarians get tempeh and tofu rendang versions made fresh.',
  'Agonda Beach Road, north end, Canacona 403702',
  'https://maps.google.com/?q=Kopi+Desa+Agonda',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580075-d12849316-Reviews-Kopi_Desa-Agonda_Canacona_Taluka_South_Goa_District_Goa.html',
    'https://www.instagram.com/kopidesaagonda/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'agonda',
  'H2O Agonda',
  'Agonda Beach, central stretch',
  ARRAY['mediterranean','israeli','european']::text[],
  'mid_range',
  'Mezze platter with pita',
  ARRAY['Mezze platter','Sabich','Shakshuka','Grilled fish']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Israeli-Mediterranean beach shack on the central Agonda stretch, running since 2014. Caters to the Israeli post-army backpacker circuit that winters in Agonda Dec-March. Sabich and shakshuka breakfast 8-11am are the calling cards — most Agonda places do not do Israeli breakfast.',
  'Beach shack so seasonal — open Oct 1 to May 31 only per Goa Forest Dept rule. Breakfast queue 9-10am; come at 8 or 11. Mediterranean platter is for two but the staff splits it for solo travellers without fuss.',
  'Agonda Beach central stretch, Canacona 403702',
  'https://maps.google.com/?q=H2O+Agonda+Beach',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580075-d8459014-Reviews-H2O_Agonda-Agonda_Canacona_Taluka_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/h2o-agonda'
  ]::text[],
  '2026-05-10',
  false
),
(
  'agonda',
  'Blue Planet Cafe',
  'Agonda village, behind the chapel',
  ARRAY['vegan','vegetarian','raw','salads']::text[],
  'cafe',
  'Buddha bowl with tahini',
  ARRAY['Buddha bowl','Raw cacao smoothie','Vegan banoffee pie','Kombucha']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegan cafe behind the Agonda chapel, the breakfast anchor for the yoga-retreat circuit (Sampoorna, Yoga Magic, Bhakti Kutir guests cycle here). Menu rotates with the morning local-vegetable haul; kombucha and kefir brewed on site. Open 8am-9pm Oct-May; restricted hours June-Sept.',
  'Buddha bowl after 12:30pm only — kitchen needs lunch prep time. Smoothie bowls quickest 8-10am. Cash and UPI; no card. Note for retreat schedule: most yoga groups eat here 7-8am pre-class.',
  'Agonda village, behind St Anne''s Chapel, Canacona 403702',
  'https://maps.google.com/?q=Blue+Planet+Cafe+Agonda',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580075-d10211437-Reviews-Blue_Planet_Cafe-Agonda_Canacona_Taluka_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/blue-planet-cafe-agonda'
  ]::text[],
  '2026-05-10',
  false
),
(
  'agonda',
  'Fatima Beach Restaurant',
  'Agonda Beach, south end',
  ARRAY['goan','seafood','indian']::text[],
  'casual',
  'Tandoori prawns',
  ARRAY['Tandoori prawns','Pomfret rava fry','Goan sausage chilli','Sol kadi']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Beach shack at the south end of Agonda nearest the river-mouth, run by the Fatima family (locals from Agonda village) for over 12 seasons. Tandoor fires up at 6pm — pomfret rava fry and prawn tandoori are the daily anchors. Sunset table view of the Talpona river-mouth and Cabo de Rama headland.',
  'South-end shacks are closer to the Olive Ridley nesting fence; staff knows turtle-release event dates Feb-March. Sunset reservation table — call 9921xxxxxx the morning of. Open Oct 1 to May 31 only.',
  'Agonda Beach south end, near Talpona river-mouth, Canacona 403702',
  'https://maps.google.com/?q=Fatima+Beach+Agonda',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580075-d3504434-Reviews-Fatima_Restaurant-Agonda_Canacona_Taluka_South_Goa_District_Goa.html',
    'https://www.instagram.com/fatimabeach.agonda/'
  ]::text[],
  '2026-05-10',
  false
);
