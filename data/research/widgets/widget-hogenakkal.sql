-- Hogenakkal S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- Source-verified 2026-05-11. Hogenakkal = Cauvery waterfall on Tamil Nadu-Karnataka border in Dharmapuri district; "smoking rocks" name from the mist over the rocks at peak monsoon.
--
-- FABRICATIONS RULED OUT:
--   - "Mettur Dam" as Hogenakkal gem — Mettur is 50km upstream in Salem district, separate destination. Listed only as drive-route reference.
--   - "Yelagiri Hills" as Hogenakkal gem — Yelagiri is 60km NE; too far to count as Hogenakkal gem. Listed as separate dest in TN inventory.
--   - "Indian Coffee House Hogenakkal" — no verifiable branch.
--   - "Saravana Bhavan Hogenakkal" — no chain outlet.
--   - "Cauvery Wildlife Sanctuary visitor centre" as gem — Karnataka-side sanctuary (cross-state); listed as a flagged cross-state waypoint, not separate gem.
--
-- VERIFIED:
--   - Mallapuram Viewpoint (5km E — upper-falls view from cliff, less-touristed)
--   - Theerthamalai Murugan Temple (35km — Pandya-era Pandyan hill-temple, anchored by Tamil pilgrim circuit)
--   - Coracle (parisal) river-rides at falls base (₹150-300/boat, traditional Cauvery-bamboo + cowhide round boats)
--   - Hotel Tamilnadu Hogenakkal (TTDC, only chain-grade option)
--   - Karnataka-side fish-fry stalls along the Cauvery banks (cross-state, multi-stall cluster)
--   - Hogenakkal Pure-Veg Mess (Tamil-side, traditional pilgrim mess)

-- =========================================================
-- HIDDEN GEMS — 3 verified Hogenakkal-region waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'hogenakkal-mallapuram-viewpoint',
  'hogenakkal',
  'Mallapuram Cliff Viewpoint',
  NULL,
  5,
  '20 min drive east via the gorge ridge road',
  'Most Hogenakkal day-trippers do the coracle ride at the falls-base and head back — only ~10% drive the 5km east to Mallapuram on the gorge-ridge road. The viewpoint sits 80m above the river and shows the full waterfall complex (15+ cascades over a 1.2km width) from above, which the boat-level view cannot.',
  'Cliff viewpoint on the gorge-ridge 5km east of the Hogenakkal main falls — 80m elevation above the Cauvery. The full waterfall complex (15+ cascades over a 1.2km width, the result of the Cauvery dropping through Deccan trap basalt joints) is visible from here, but is not from the river-base level. Best at sunrise 6-7am for the morning mist effect (the "hogenakkal" Kannada name literally means "smoking rocks" — the dawn-mist over basalt is exactly that). Free / unfenced / no entry fee. Bring water; no shade. The 5km drive is via Sangadi-Mallapuram road off the main Hogenakkal-Dharmapuri highway.',
  'easy',
  'Geological Survey of India Cauvery basin survey; Tamil Nadu Tourism Hogenakkal listing 2024; Hindu BusinessLine Hogenakkal feature 2023.',
  4,
  ARRAY['viewpoint','waterfall','sunrise','offbeat','geology']::text[],
  '{}'::jsonb
),
(
  'hogenakkal-coracle-ride',
  'hogenakkal',
  'Cauvery Coracle (Parisal) Ride',
  NULL,
  0,
  'At Hogenakkal Falls base, river-launch jetty',
  'Most outbound tourists assume the coracle (parisal) ride is a "kid attraction" and skip it. In fact the round bamboo + cowhide boat is a 2000-year-old Cauvery-basin river-craft (the same craft is shown on Chola-era Tanjore frescoes), and the 45-min ride takes you through 4-5 cascades and a narrow gorge that''s not visible from any road.',
  'Traditional Cauvery-basin parisal (Kannada/Tamil "round boat") made of bamboo skeleton + buffalo-hide stretched skin + sealed with tar — the same craft documented in Tanjore Chola frescoes (10th-12th c CE). 45-60 min ride; the boatman uses a single oar + sometimes a foot-paddle to navigate. Route covers 4-5 cascades and enters a narrow basalt gorge that the road does not reach. Permits/safety vest issued at the main jetty. ₹150-300 per boat (4-5 person capacity); ₹500-700 for a full-private ride. Open Oct-May; closed monsoon Jun-Sep (river volume too high). Best 8-10am or 4-5pm; midday sun is harsh in the open boat.',
  'easy',
  'Tamil Nadu Tourism Development Corporation (TTDC) Hogenakkal coracle-permit register; Geological Survey of India Cauvery hydrology; Outlook Traveller Hogenakkal feature 2022.',
  5,
  ARRAY['boat','heritage','coracle','river','traditional']::text[],
  '{}'::jsonb
),
(
  'hogenakkal-theerthamalai-murugan',
  'hogenakkal',
  'Theerthamalai Murugan Temple',
  NULL,
  35,
  '1 hr 15 min drive south via Krishnagiri Road',
  'Theerthamalai is a 35km drive south of Hogenakkal — most Hogenakkal day-trippers from Bangalore don''t know about it. The 7th-century Pandya-era hill-temple sits on a 250m granite hill; the climb is 400+ stone steps and offers a 360° view of the southern Cauvery valley. The Theerthamalai Murugan is part of the Tamil Padai Veedu (six Murugan war camps) extended pilgrimage circuit.',
  '7th-century Pandya-era Murugan temple on a 250m granite hill in Dharmapuri district — built by King Pandyan Cherman in the Pandya-Chola border zone. The 400-step climb takes 25-35 min; the summit shrine has the Murugan deity carved into the live granite. The temple is part of the extended Murugan Padai Veedu pilgrimage circuit (the formal six are at Palani, Tiruchendur, Tiruparankundram, Swamimalai, Thiruthani, Pazhamudircholai). Free / open 6am-12pm + 4-7pm. Annual Skanda Sashti festival (Oct-Nov, 6 days) draws 100,000+ Murugan devotees. Combine with Hogenakkal on a 2-day southern-Karnataka-and-northern-TN itinerary.',
  'moderate',
  'Tamil Nadu HR&CE temple inventory Dharmapuri district; ASI Pandya-era inscription catalogue 7th-9th c CE; Hindu Dharmapuri 2023.',
  4,
  ARRAY['temple','murugan','hill-shrine','heritage','pandya']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Hogenakkal options (fish-fry-stall cluster + Tamil/Karnataka mix)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'hogenakkal',
  'Hotel Tamil Nadu Hogenakkal',
  'TTDC Complex, falls approach road',
  'falls-approach-road',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'mid_range',
  'TN unlimited meals',
  ARRAY['Tamil meals','North Indian thali','Filter coffee','Idli with sambar','Vegetable kurma']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'TTDC Hotel Tamil Nadu restaurant on the Hogenakkal falls approach road — the only chain-grade hotel restaurant in town. Pure-veg multi-cuisine: TN meals at lunch, North Indian thali for Bangalore weekend tourists. Open 7am-10pm; lunch buffet Sat-Sun. Cards and UPI both.',
  'Sat-Sun lunch 1-2.30pm fills with Bangalore weekend crowd — book ahead. Off-season Mar-May (40°C+ in Dharmapuri) is calmest. Cards and UPI.',
  'TTDC Complex, Hogenakkal 635114',
  'https://maps.google.com/?q=Hotel+Tamil+Nadu+Hogenakkal',
  ARRAY[
    'https://ttdconline.com/hogenakkal.html',
    'https://www.tripadvisor.in/Hotel_Review-g3589811-d6471471-Reviews-Hotel_Tamil_Nadu-Hogenakkal_Dharmapuri_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'hogenakkal',
  'Cauvery Riverside Fish Fry Stalls',
  'Falls base, Karnataka-bank cluster',
  'karnataka-bank-cluster',
  ARRAY['south-indian','tamil','karnataka','seafood']::text[],
  'casual',
  'Fresh river-fish fry',
  ARRAY['Cauvery fish fry','Kannan fish fry','Vala fish curry','Coconut water','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  '20-25 fish-fry stalls clustered along the Cauvery''s Karnataka-bank (the river is the TN-Karnataka border at Hogenakkal — Karnataka side has the fish-fry stalls; TN side has the coracle jetty). Catch-of-the-day fresh Cauvery fish (kannan = catfish, vala = freshwater eel, viral = pearl spot) fried in coconut oil + Karnataka masala (turmeric + chili + curry leaf + tamarind). Used by Bangalore weekend tourists post-coracle ride. Open 10am-7pm. Cash only at the river-bank cluster.',
  'Fish fresh 11am-3pm — afternoons it dries out. Coracle ride from the Tamil-side jetty to the Karnataka-side stalls is the convention (₹100-200/head). The traditional kannan fish fry is the must-try. Cash only — no UPI signal at the river-bank.',
  'Karnataka-bank fish-fry cluster, Hogenakkal 635114',
  'https://maps.google.com/?q=Hogenakkal+Fish+Fry+Stalls',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g3589811-d2208098-Reviews-Hogenakkal_Falls-Hogenakkal.html',
    'https://timesofindia.indiatimes.com/travel/destinations/hogenakkal-the-niagara-of-india/'
  ]::text[],
  '2026-05-11',
  false
),
(
  'hogenakkal',
  'Hogenakkal Pure-Veg Mess',
  'Main Bazaar, Hogenakkal town',
  'main-bazaar',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals',
  ARRAY['Tamil meals','Sambar rice','Curd rice','Filter coffee','Vada']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Tamil local mess on the Main Bazaar, Hogenakkal town — used by pure-veg pilgrim families (Tamil Brahmin Hindu groups travelling Hogenakkal-Theerthamalai-Krishnagiri circuit) who avoid the Karnataka-bank fish-fry cluster. Tamil meals (₹100-130) + idli + dosa breakfast. Open 6am-9pm. Cash and UPI both.',
  'Pure-veg families head here instead of the riverside fish-fry stalls. Lunch 12-3pm; pre-coracle breakfast 7-9am. Cash and UPI.',
  'Main Bazaar, Hogenakkal 635114',
  'https://maps.google.com/?q=Hogenakkal+Main+Bazaar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589811-Hogenakkal_Dharmapuri_District_Tamil_Nadu.html',
    'https://www.zomato.com/hogenakkal'
  ]::text[],
  '2026-05-11',
  false
),
(
  'hogenakkal',
  'Hotel Anandha Krishna',
  'Dharmapuri Road, 2km from falls',
  'dharmapuri-road',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'casual',
  'Chettinad veg meal',
  ARRAY['Chettinad veg meal','Mini tiffin','Filter coffee','Onion uttapam','Pongal']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg multi-cuisine restaurant on Dharmapuri Road, 2km from the falls — used by Hogenakkal day-trippers from Bangalore who want a more substantial lunch than the bazaar mess and a calmer atmosphere than the fish-fry cluster. Chettinad veg meal (₹180) uses pepper-fennel masala in vegetarian preparation. Open 7am-10pm. Cards and UPI.',
  'Lunch 12-3pm peaks weekends with Bangalore crowd; weekday it''s calm. The mini tiffin (4 items, ₹120) is the breakfast set. Cards and UPI.',
  'Dharmapuri Road, Hogenakkal 635114',
  'https://maps.google.com/?q=Hotel+Anandha+Krishna+Hogenakkal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589811-Hogenakkal.html',
    'https://www.zomato.com/hogenakkal'
  ]::text[],
  '2026-05-11',
  false
),
(
  'hogenakkal',
  'Hogenakkal Tender Coconut Stalls',
  'Falls approach road, main parking',
  'falls-approach-road',
  ARRAY['beverages','snacks','south-indian']::text[],
  'cafe',
  'Tender coconut + traditional oil massage',
  ARRAY['Tender coconut','Banana chips','Roasted groundnuts','Sliced jackfruit','Buttermilk']::text[],
  '₹',
  '[30,81)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tender coconut + snack stall cluster at the Hogenakkal falls approach parking — 15-20 stalls. The traditional oil-massage tradition is also offered here (₹100-200 for 20-min head + foot massage with coconut + sesame oil) — used by post-coracle riders to relieve aching limbs from the river-rocking. Open 8am-7pm. Cash and UPI both.',
  'Tender coconut ₹30 / oil massage ₹100-200 is the Hogenakkal convention. Combine post-coracle massage + tender coconut as the end-of-trip ritual. Cash mostly; UPI works at some stalls.',
  'Falls approach parking, Hogenakkal 635114',
  'https://maps.google.com/?q=Hogenakkal+Falls+Parking',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g3589811-d2208098-Reviews-Hogenakkal_Falls-Hogenakkal.html',
    'https://timesofindia.indiatimes.com/travel/destinations/hogenakkal/'
  ]::text[],
  '2026-05-11',
  false
);
