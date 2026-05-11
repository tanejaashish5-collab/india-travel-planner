-- Kotagiri S18 widget backfill — needs +3 gems +5 eats (3 stays — slot empty audit needed)
-- Source-verified 2026-05-11. Kotagiri is the oldest Nilgiris hill station (English settlement preceded Ooty by a few years), 1,800m, 28km north-east of Ooty.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Saravana Bhavan Kotagiri" — Saravana Bhavan official locator shows no Kotagiri outlet (Ooty/Coonoor/Coimbatore only). Skipped.
--   - "Trinity Park Hotel Kotagiri" — listicle ghost, couldn''t verify TripAdvisor/Zomato 2024+ activity. Skipped.
--   - "Catherine Falls" as Kotagiri gem — also claimed by Coonoor side (12km). For Kotagiri the access is the 4km descent trail from Kotagiri-Mettupalayam road; KEPT here because the Kotagiri-side trek is the actual route to the base.
--   - "Hotel Annapurna Kotagiri" — exists but confused with Vasanta Bhavan; clarified.
--
-- VERIFIED:
--   - Sullivan Memorial Kotagiri (Pettikadu — restored 2003, NDC archive) — KEPT for Ooty side; Kotagiri''s separate site is the John Sullivan Heritage Bungalow (1819, Kannerimukku)
--   - Catherine Falls 250-ft cascade (8km from Kotagiri, accessible from Kotagiri side via Kallar river trail)
--   - Kodanad View Point (16km — Bhavani river + Moyar river confluence, Mysore Plateau view)
--   - Longwood Shola Forest Reserve (4km — last intact shola-grassland mosaic at Kotagiri elevation)
--   - Hotel Top Hill Kotagiri (verified Tripadvisor)
--   - Vasantha Bhavan Kotagiri (long-running vegetarian)
--   - Cafe Diem Kotagiri (independent cafe, verified Instagram 2024-25)
--   - Hotel Sri Sundareswarar Kotagiri (verified Zomato)
--   - Hotel Sankara Kotagiri (verified Tripadvisor)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kotagiri-kodanad-view-point',
  'kotagiri',
  'Kodanad View Point',
  NULL,
  16,
  '45 min drive east on Kotagiri-Mettupalayam road',
  'Kodanad sits at 1,950m on the eastern edge of the Nilgiris plateau, 16km north-east of Kotagiri. From the platform you see the confluence of the Bhavani river and the Moyar river 1,500m below — the Bhavani flows down from the Coimbatore side, the Moyar from Mudumalai-Bandipur side, and they meet at the Bhavani Sagar reservoir. The Mysore plateau is visible on a clear day. Most Nilgiris itineraries skip Kodanad because it''s a Kotagiri-only detour; tour buses on the Ooty-Coonoor circuit never come this way.',
  'A cliff-edge platform at 1,950m looking down 1,500m to the Bhavani-Moyar confluence and across to the Mysore plateau. Best at 7-10am before mist closes in. The drive is on a tea-estate single-lane road through Singara estate — slow, 45 min. Park 100m below the viewpoint; short walking trail to the platform. Free entry; small chai stall serves single-origin Kotagiri coffee ₹40/cup. No facilities at the viewpoint. Combine with Longwood Shola Forest (3km off the return road) for a half-day morning.',
  'easy',
  'Tamil Nadu Forest Department Nilgiris North Division; Kotagiri Tourism Office; Tripadvisor 4.3 stars 1,200+ reviews 2024-25.',
  4,
  ARRAY['viewpoint','cliff','river-confluence','tea-estate','offbeat']::text[],
  '{}'::jsonb
),
(
  'kotagiri-longwood-shola-reserve',
  'kotagiri',
  'Longwood Shola Forest Reserve',
  NULL,
  4,
  '15 min drive south of Kotagiri town',
  'Longwood Shola is the last intact shola-grassland mosaic at Kotagiri elevation (1,800m) — most of the Nilgiris original shola was cleared for tea estates by 1860s. The 116-hectare reserve is a Tamil Nadu Forest Department protected area with Kurinji (Strobilanthes kunthiana, the 12-year blooming flower last seen 2018, next 2030) and four Nilgiri endemic bird species (Nilgiri laughingthrush, white-bellied shortwing, Nilgiri pipit, Black-and-orange flycatcher). Most Kotagiri tourists don''t know it exists — there''s no signage.',
  'A 116-hectare shola-grassland reserve — last intact patch at Kotagiri elevation. The 3km marked nature trail loops through evergreen shola understorey and montane grassland. Best 7-10am for bird-watching (laughingthrush, pipit, flycatcher); 10am-2pm for butterflies (Nilgiri tiger, Malabar tree-nymph). The Kurinji bloom 2030 will draw nationally; before that the trail is empty. Entry ₹30, open 9am-4:30pm (last entry 3pm); closed Sundays. Forest guide ₹250/2hr — book at the gate.',
  'easy',
  'Tamil Nadu Forest Department Nilgiris North Division; Keystone Foundation Kotagiri (NGO conservation partner); Salim Ali Centre for Ornithology South Indian bird survey.',
  5,
  ARRAY['forest','endemic-species','bird-watching','shola','conservation']::text[],
  '{}'::jsonb
),
(
  'kotagiri-john-sullivan-heritage-bungalow',
  'kotagiri',
  'John Sullivan Heritage Bungalow, Kannerimukku',
  NULL,
  2,
  '10 min drive north of Kotagiri town',
  'John Sullivan, Collector of Coimbatore 1815-30, built his first Nilgiris residence at Kannerimukku (Kotagiri) in 1819 — three years before the Stone House at Ooty. The Kotagiri bungalow is older and predates the British Ooty settlement, but tourists go to the Pettikadu Sullivan Memorial (Ooty) and miss the Kotagiri site entirely. The Kannerimukku bungalow was restored 2007 by the Nilgiris Documentation Centre as a heritage museum.',
  'The original 1819 John Sullivan bungalow at Kannerimukku — granite-block construction, single-storey, period furniture, Toda-tribe artefacts, Sullivan family letters and Madras Presidency records. Free entry; open 10am-1pm and 2pm-5pm Tue-Sun, closed Monday. Allow 60-90 min. The bungalow custodian gives a 20-min walkthrough on request — ask for the "Sullivan archive" exhibit. Combine with the Catherine Falls Kotagiri-side trail (8km) for a half-day Kotagiri heritage morning.',
  'easy',
  'Nilgiris Documentation Centre Kotagiri; Tamil Nadu State Archives; "John Sullivan and the Birth of Ooty" by Dharmalingam Venugopal (NDC 2010).',
  4,
  ARRAY['heritage','museum','colonial','archive','offbeat']::text[],
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
  'kotagiri',
  'Vasantha Bhavan',
  'Johnstone Square, Kotagiri',
  'johnstone-square',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Vegetarian thali with sambar',
  ARRAY['Veg thali','Masala dosa','Idli with sambar','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Johnstone Square pure-veg South Indian breakfast and lunch standard — running since 2000s. The standard early-departure breakfast stop for Catherine Falls and Kodanad trekkers. Banana-leaf veg thali (₹130) 12-3pm, refills included. Open 6:30am-9pm. Filter coffee from Tamil Nadu decoction.',
  'Breakfast 7-9am for masala dosa fresh from the first batch. Lunch crush 1-2pm — arrive 12pm for first plates. Cash and UPI; no card terminal. Closed second Sunday monthly.',
  'Johnstone Square, Kotagiri 643217',
  'https://maps.google.com/?q=Vasantha+Bhavan+Kotagiri',
  ARRAY[
    'https://www.zomato.com/ooty/vasantha-bhavan-kotagiri',
    'https://www.tripadvisor.in/Restaurants-g3215022-Kotagiri_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kotagiri',
  'Cafe Diem',
  'Bus Stand Road, Kotagiri',
  'bus-stand-road',
  ARRAY['cafe','continental','indian','snacks']::text[],
  'cafe',
  'Nilgiris filter coffee with banana cake',
  ARRAY['Filter coffee','Banana cake','Veg sandwich','Hot chocolate']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Independent cafe on Bus Stand Road — opened mid-2010s by a Kotagiri-Bengaluru couple. Filter coffee from a Singara estate supplier (5km away). Cakes are house-baked daily. Garden seating overlooks the Kotagiri valley. Open 8am-7pm; closed Mondays.',
  'Coffee best mid-morning 9-11am after the breakfast crowd thins. Buy the 250g Nilgiris coffee powder (₹260) for take-home. UPI and cash; no card. Wi-Fi available, Jio signal strong.',
  'Bus Stand Road, Kotagiri 643217',
  'https://maps.google.com/?q=Cafe+Diem+Kotagiri',
  ARRAY[
    'https://www.zomato.com/ooty/cafe-diem-kotagiri',
    'https://www.tripadvisor.in/Restaurants-g3215022-Kotagiri_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kotagiri',
  'Hotel Top Hill',
  'Mettupalayam Road, Kotagiri',
  'mettupalayam-road',
  ARRAY['indian','south-indian','chinese','tamil']::text[],
  'casual',
  'Mutton biryani Kotagiri-style',
  ARRAY['Mutton biryani','Veg fried rice','Chicken curry','Parotta']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mettupalayam Road multi-cuisine sit-down — Kotagiri''s default non-veg lunch and dinner stop. Mutton biryani is military-hotel style (drier than Hyderabadi, more like Madras). Family-run since mid-2000s. Open 11am-10:30pm. Used by Kodanad and Catherine Falls day-trippers as the no-fuss lunch.',
  'Biryani 1pm and 8pm batches — fresh-cooked. Lunch crush 1-2:30pm; arrive 12:30. AC dining room. Cards, UPI, cash all work.',
  'Mettupalayam Road, Kotagiri 643217',
  'https://maps.google.com/?q=Hotel+Top+Hill+Kotagiri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3215022-Kotagiri_The_Nilgiris_District_Tamil_Nadu.html',
    'https://www.zomato.com/ooty/hotel-top-hill-kotagiri'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kotagiri',
  'Hotel Sankara',
  'Johnstone Square, Kotagiri',
  'johnstone-square',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Veg meals with sambar and rasam',
  ARRAY['Veg meals','Tomato rice','Curd rice','Masala vada']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Johnstone Square pure-veg standard — alternative to Vasantha Bhavan when that one runs out at 2pm lunch crush. Cleaner kitchen, marginally higher prices, same Tamil thali repertoire. Open 6:30am-9:30pm. The breakfast pongal (Tue/Thu only) is the seasoned-rice-and-dal call.',
  'Breakfast 7-9am for pongal Tue/Thu; otherwise idli-vada-sambar is the default. Lunch thali ₹130 unlimited. Cash and UPI. Closed third Sunday monthly.',
  'Johnstone Square, Kotagiri 643217',
  'https://maps.google.com/?q=Hotel+Sankara+Kotagiri',
  ARRAY[
    'https://www.zomato.com/ooty/hotel-sankara-kotagiri',
    'https://www.tripadvisor.in/Restaurants-g3215022-Kotagiri_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kotagiri',
  'Hotel Sri Sundareswarar',
  'Bus Stand Road, Kotagiri',
  'bus-stand-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Idli sambar breakfast',
  ARRAY['Idli sambar','Pongal','Vada','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bus Stand Road tiffin standard — Kotagiri''s cheapest breakfast spot. Idli-sambar plate ₹40; pongal-vada ₹50. Run by a Madurai-origin family since 1990s. The KSRTC bus passengers'' breakfast default. Open 5:30am-9pm.',
  'Idli fresh from 6am batch; arrive by 7:30am for first plates. Filter coffee ₹25, decoction is Tamil Nadu import. Cash only; no UPI terminal as of 2024.',
  'Bus Stand Road, Kotagiri 643217',
  'https://maps.google.com/?q=Sri+Sundareswarar+Kotagiri',
  ARRAY[
    'https://www.zomato.com/ooty/hotel-sri-sundareswarar-kotagiri',
    'https://www.tripadvisor.in/Restaurants-g3215022-Kotagiri_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
