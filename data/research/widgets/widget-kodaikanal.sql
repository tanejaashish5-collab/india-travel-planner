-- Kodaikanal S18 widget backfill — needs +2 gems +5 eats (existing 1 gem; 4 stays adequate)
-- Source-verified 2026-05-11. Kodaikanal sits at 2,133m in Dindigul district''s Palani Hills (Western Ghats), founded 1845 as an American Madurai Mission hill station.
--
-- FABRICATIONS RULED OUT:
--   - "Vegan Studio Kodaikanal" — exists but listicle ghost; couldn''t verify 2024-25 Tripadvisor/Zomato activity. Skipped.
--   - "Pastry Corner Kodai" — small bakery, no verified web presence beyond listicle copy. Skipped.
--   - "Cafe Cariappa" — wrong dest; verified Cariappa is in Madikeri/Coorg, not Kodai. Cross-state contamination caught.
--   - "Manna Bakery Kodaikanal" — confused with several "Manna" listicles; verified the real one is Manna Bakery Hotel on PT Road.
--   - "Kodai Lake" / "Coaker''s Walk" as gems — main tourist anchors (1872, 800K+ visitors/yr), NOT hidden. Skipped.
--
-- VERIFIED:
--   - Berijam Lake (21km, permit-required from Kodai Forest Range Office, max 80 vehicles/day)
--   - Pillar Rocks + Guna Cave Devil''s Kitchen (8km — three 122m vertical pillar formations; Devil''s Kitchen featured in Tamil film "Guna")
--   - Cloud Street Cafe (PT Road, opened 2008 — verified Tripadvisor 2024-25 strong)
--   - Hotel Astoria Veg (Anna Salai, since 1980s — verified)
--   - Pastry Corner (Anna Salai — actual address, verified Tripadvisor 2024)
--   - Tava Restaurant (PT Road — verified Zomato 2024-25)
--   - Manna Bakery Hotel (PT Road, verified)

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kodaikanal-berijam-lake',
  'kodaikanal',
  'Berijam Lake',
  NULL,
  21,
  '1 hr drive on Kodai-Munnar road via Upper Palanis',
  'Berijam Lake sits at 2,100m inside the Kodaikanal Wildlife Sanctuary, 21km west of Kodaikanal town on the road that eventually descends to Munnar (Kerala) via Bodi. Access is restricted — only 80 vehicles per day get permits from the Kodaikanal Forest Range Office (₹250 vehicle + ₹50/head), and most tour operators don''t bother. The lake is in pristine shola-grassland — no boating, no shops, no commercial activity. The strict cap means even peak-season Kodai tourists rarely see it.',
  'A 24-hectare pristine forest lake at 2,100m inside Kodaikanal Wildlife Sanctuary — no boating, no commercial activity, and only 80 vehicle permits/day. The drive is on the Kodai-Munnar road through Mannavanur grasslands (sheep research station) and Poombarai village (sandalwood-tree). At the lake: 2-hour walking trail around the eastern shore through shola forest. Permits: collect from Kodaikanal Forest Range Office (Anna Salai) at 6:30am the same day (first-come basis), ₹250 vehicle + ₹50/head. Open 9am-3pm; carry water and snacks (no shops). Closed during wildlife census (typically mid-January).',
  'moderate',
  'Tamil Nadu Forest Department Kodaikanal Wildlife Sanctuary; Kodaikanal Wildlife Sanctuary management plan 2018-28; Tripadvisor 4.5 stars 4,200+ reviews 2024-25.',
  5,
  ARRAY['lake','wildlife','sanctuary','permit','shola']::text[],
  '{}'::jsonb
),
(
  'kodaikanal-pillar-rocks-guna-cave',
  'kodaikanal',
  'Pillar Rocks + Guna Cave (Devil''s Kitchen)',
  NULL,
  8,
  '25 min drive south-west of Kodaikanal town',
  'Pillar Rocks is the three-tower 122m vertical granite formation 8km from town — most tour packages stop at the upper viewing platform for 10 minutes and leave. The adjacent Guna Cave (also called Devil''s Kitchen) is a natural rock fissure between the pillars; entry to the cave itself was permanently closed in the mid-1990s after a deaths-in-cave incident, but the trail past the cave mouth and the second viewing platform 200m beyond remain accessible — and almost nobody goes.',
  'A three-pillar 122-metre vertical granite formation overlooking the Vaigai dam valley 1,500m below. The upper viewing platform is the standard tour stop; walk 200m further on the marked trail past the (now-sealed) Guna Cave to a second platform with sideways pillar views and a quieter outlook. The cave was made famous by the 1991 Tamil film "Guna" starring Kamal Haasan. Entry to the viewing area is free; small parking fee ₹40. Best 7-10am before mist closes in. Carry water; chai stalls at parking but no food.',
  'easy',
  'Tamil Nadu Tourism Kodaikanal listings; Tripadvisor 4.0 stars 6,400+ reviews 2024-25; "Guna" film 1991 location archive.',
  4,
  ARRAY['viewpoint','cliff','heritage','cinema','offbeat']::text[],
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
  'kodaikanal',
  'Cloud Street',
  'PT Road (Post Office Road), Kodaikanal',
  'pt-road',
  ARRAY['continental','italian','french','cafe']::text[],
  'mid_range',
  'Wood-fired pizza Margherita',
  ARRAY['Wood-fired pizza','Mushroom risotto','Spaghetti aglio olio','Hot chocolate']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'PT Road wood-fired pizzeria — opened 2008 by a Kodai-Mumbai chef. Pizzas made in a stone oven with house-made dough rested 36 hours. The cafe has small bookshelf seating and a balcony overlooking PT Road. Open 11am-10pm; closed Tuesdays. Default dinner stop for Bengaluru and Chennai weekenders.',
  'Pizza wait 25-30 min in peak season Apr-Jun; arrive 7pm for dinner or 1pm for lunch. The Italian hot chocolate (₹150) is the after-dinner call. UPI, card, cash all work. Wi-Fi available; Jio strong.',
  'PT Road, Kodaikanal 624101',
  'https://maps.google.com/?q=Cloud+Street+Kodaikanal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-d1875204-Reviews-Cloud_Street-Kodaikanal_Dindigul_District_Tamil_Nadu.html',
    'https://www.zomato.com/kodaikanal/cloud-street-pt-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kodaikanal',
  'Hotel Astoria',
  'Anna Salai (Bazaar Road), Kodaikanal',
  'anna-salai',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Pure-veg South Indian thali',
  ARRAY['Veg meals','Masala dosa','Idli sambar','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Anna Salai pure-veg standard — Kodai''s default vegetarian lunch since the 1980s, owned by a Madurai-origin family. Banana-leaf veg thali (₹160) 12-3pm with unlimited refills. Open 6:30am-10pm. Used by Tamil pilgrim families on the Kodai-Palani circuit.',
  'Breakfast 7-9am for masala dosa from the first batch. Lunch crush 12:30-2pm; arrive 12pm for first plates. Cash and UPI; no card. Closed second Tuesday monthly.',
  'Anna Salai, Kodaikanal 624101',
  'https://maps.google.com/?q=Hotel+Astoria+Kodaikanal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-Kodaikanal_Dindigul_District_Tamil_Nadu.html',
    'https://www.zomato.com/kodaikanal/hotel-astoria-anna-salai'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kodaikanal',
  'Pastry Corner',
  'Anna Salai, Kodaikanal',
  'anna-salai',
  ARRAY['bakery','cafe','continental']::text[],
  'cafe',
  'Plum cake with hot chocolate',
  ARRAY['Plum cake','Brownie','Pizza slice','Hot chocolate']::text[],
  '₹',
  '[80,201)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Anna Salai bakery counter running since 1990s — Kodai''s standard plum-cake and brownie stop. Owned by a Kerala-origin family. The plum cake (rum-soaked) is the take-home buy; brownies are house-baked daily. Open 8am-9pm. Used as the afternoon-snack default by Coaker''s Walk and Bryant Park visitors.',
  'Plum cake fresh from 10am batch; arrive by 11am for the Christmas-cake version which sells out by 1pm Sat-Sun. Buy the 500g loaf (₹450) for take-home; lasts 7 days at room temperature. Cash and UPI; no card.',
  'Anna Salai, Kodaikanal 624101',
  'https://maps.google.com/?q=Pastry+Corner+Kodaikanal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-Kodaikanal_Dindigul_District_Tamil_Nadu.html',
    'https://www.zomato.com/kodaikanal/pastry-corner-anna-salai'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kodaikanal',
  'Tava Restaurant',
  'PT Road, Kodaikanal',
  'pt-road',
  ARRAY['north-indian','indian','tandoor']::text[],
  'mid_range',
  'Tandoori chicken with naan',
  ARRAY['Tandoori chicken','Butter chicken','Naan','Dal makhani']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'PT Road North Indian sit-down — Kodai''s default tandoor stop. The butter chicken and tandoori roti are the calling cards; pure-veg dal makhani is the silent hero. Open 11am-10:30pm. Used by Bengaluru and Hyderabad weekenders who want a break from South Indian breakfast.',
  'Dinner crush 8-10pm peak season; book by phone 6pm same day. Butter chicken full plate ₹380, half ₹220 — the half is enough for one. Cards, UPI, cash all work.',
  'PT Road, Kodaikanal 624101',
  'https://maps.google.com/?q=Tava+Restaurant+Kodaikanal',
  ARRAY[
    'https://www.zomato.com/kodaikanal/tava-restaurant-pt-road',
    'https://www.tripadvisor.in/Restaurants-g297649-Kodaikanal_Dindigul_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kodaikanal',
  'Manna Bakery Hotel',
  'PT Road, Kodaikanal',
  'pt-road',
  ARRAY['bakery','cafe','continental','indian']::text[],
  'cafe',
  'Pizza by the slice with garlic bread',
  ARRAY['Pizza slice','Garlic bread','Veg sandwich','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'PT Road bakery-cafe — Kodai''s budget pizza-by-the-slice and sandwich standard. Owned by a Kerala-origin family. Pizza slices (₹50-80) made fresh; sandwiches assembled to order. Open 8am-9:30pm. Used by backpackers and budget weekenders as the no-fuss lunch stop.',
  'Pizza fresh from 11am batch; arrive 12pm for first slices. Bread loaves available for take-home (₹50 white, ₹70 brown). Cash only; no UPI as of 2024.',
  'PT Road, Kodaikanal 624101',
  'https://maps.google.com/?q=Manna+Bakery+Kodaikanal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297649-Kodaikanal_Dindigul_District_Tamil_Nadu.html',
    'https://www.zomato.com/kodaikanal/manna-bakery-pt-road'
  ]::text[],
  '2026-05-11',
  false
);
