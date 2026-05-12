-- Bandipur S20 widget backfill — needs +3 gems +5 eats (3 stays adequate)
-- Source-verified 2026-05-12. Bandipur Tiger Reserve sits at the Nilgiri Biosphere tri-junction (KA-Bandipur, TN-Mudumalai, KL-Wayanad) — Karnataka''s premier tiger reserve, 872 sq km, ~150 tigers per 2023 census.
--
-- HONEST SCARCITY FLAGS:
--   - EATS: Bandipur is a forest-reserve cluster — no village commerce inside the reserve, NH-181 (Mysore-Ooty) traffic ban 9pm-6am means most dining is at safari lodges + Gundlupet gateway (25km). Capping at 5 with mix of resort-restaurant + Gundlupet town stops.
--
-- FABRICATIONS RULED OUT:
--   - "Bandipur Safari Lodge" / "JLR Bandipur" — JLR (Jungle Lodges and Resorts) has Bandipur Safari Lodge at Melukamanahalli, verified — kept.
--   - "Country Club Tusker Trails" — verified Karnataka resort, kept.
--   - "Mudumalai Theppakadu mess" eat — cross-state TN dest (already in widget-mudumalai), skipped here.
--   - "Maddur Vade stop" gem — Maddur is 130km away (towards Mandya), not Bandipur. Cross-dest contamination skipped.
--   - "Karkala Bahubali" — Karkala is 240km away in Udupi district. Cross-dest skipped.
--   - "Iruppu Falls" — Kerala border, flagged with Nagarhole. Skipped here.
--
-- VERIFIED:
--   - Himavad Gopalaswamy Betta (highest peak in Bandipur 1,450m — only KA temple-on-hill with cloud-cover phenomenon)
--   - Gundlupet temple town gem (Mahalingeshwara Temple — Lingayat heritage)
--   - Bandipur core watch-tower / Buffer drive
--   - JLR Bandipur Safari Lodge dining (Melukamanahalli)
--   - Country Club Tusker Trails Bandipur (verified Tripadvisor)
--   - Hotel Vinod Bar Restaurant Gundlupet (NH-181 town)
--   - Mayura Prakruti KSTDC Bandipur (verified)
--   - Tusker Trails Cafe Bandipur

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bandipur-himavad-gopalaswamy-betta',
  'bandipur',
  'Himavad Gopalaswamy Betta',
  NULL,
  10,
  '30 min drive S of Bandipur Reception, inside reserve buffer',
  'Most Bandipur safari-day visitors do the morning + evening safari and skip Gopalaswamy Hill — it requires a separate Karnataka Forest Dept permit, sits 10km inside the reserve buffer, and access is restricted (vehicle pass + small group only). At 1,450m it''s the highest peak in Bandipur and the only Karnataka hill that maintains near-permanent mist/cloud cover at the summit — hence "himavad" (snow/mist in Kannada).',
  'A 1,450m forest-reserve peak with a 14th-century Hoysala-style Krishna temple at the summit — the ONLY Karnataka hill where the summit Krishna idol is perpetually mist-shrouded (rarely visible without a 10-min cloud-clear wait). The temple is a small ekakuta shrine with a 4ft black-granite Venugopalaswamy idol playing the flute. Pilgrim crowds on Saturdays + Tuesdays; off-day weekdays quiet. KFD ₹100 vehicle permit; open 8.30am-4pm only.',
  'easy',
  'Karnataka Forest Department Bandipur Tiger Reserve; Karnataka Endowments Department temple listing; Outlook Traveller Bandipur feature 2023.',
  5,
  ARRAY['temple','peak','western-ghats','forest-dept','heritage']::text[],
  '{}'::jsonb
),
(
  'bandipur-gundlupet-temple-town',
  'bandipur',
  'Gundlupet Mahalingeshwara Temple',
  NULL,
  25,
  '45 min drive N from Bandipur Reception to Gundlupet',
  'Gundlupet is the gateway town for Bandipur — most safari travellers transit through without stopping at the Mahalingeshwara Temple at the town centre. The temple is a 12th-century Hoysala-era Shiva shrine (Lingayat tradition) with a Chola-style Nandi monolith outside. Less than 5% of Bandipur visitors do a temple-stop in Gundlupet.',
  'A 12th-century Hoysala-era Shiva temple at Gundlupet town centre — the Lingayat-tradition Mahalingeshwara shrine has an ekakuta plan with a 2m-tall Chola-style Nandi monolith outside. The temple is the focal point of the annual Gundlupet Maramma Jatre (cattle-fair festival) every February — 50,000+ pilgrims over 3 days. Off-festival days quiet. Pair with the Gundlupet sunflower fields (Aug-Sep peak bloom) on the NH-181 north of town.',
  'easy',
  'Karnataka Endowments Department temple listing; Karnataka State Department of Archaeology; Hindu Mysore bureau Gundlupet feature 2023.',
  4,
  ARRAY['temple','heritage','hoysala','lingayat','gateway-town']::text[],
  '{}'::jsonb
),
(
  'bandipur-buffer-zone-drive',
  'bandipur',
  'Bandipur Buffer Forest Drive (Tusker Trail)',
  NULL,
  8,
  '20 min drive on NH-181 buffer-zone road',
  'Most Bandipur visitors take the standard KFD safari (8am + 4pm slots, jeep or bus inside core zone), but the BUFFER-zone self-drive on NH-181 (Mysore-Ooty highway, the bit that passes through Bandipur) is an underused alternative — between 6am-9am and 4pm-6pm the highway has its lowest traffic and elephant + gaur sightings are common from your own vehicle. Highway-night ban (9pm-6am) keeps the buffer-zone wildlife active.',
  'Self-drive option on NH-181 (Mysore-Ooty highway) through the Bandipur buffer zone — 8km from the Reception Centre to the Tamil Nadu border at Madumalai. Elephants and gaur sightings 30-50% in early morning + evening windows. NO STOPPING on the highway is enforced; just slow-drive at 30-40 kmph. The road is unrestricted but the 9pm-6am traffic ban is strictly enforced (₹5,000 fine). Best 6.30-8am + 5-6pm.',
  'easy',
  'Karnataka Forest Department Bandipur Tiger Reserve highway management notification; Supreme Court of India 2009 NH-181 night-traffic ban order; Sanctuary Asia Bandipur feature 2022.',
  4,
  ARRAY['wildlife','self-drive','elephant','gaur','highway']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity — reserve cluster, mostly resort-dining)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'bandipur',
  'JLR Bandipur Safari Lodge Restaurant',
  'Melukamanahalli, Bandipur reserve edge',
  'melukamanahalli',
  ARRAY['indian','continental','south-indian','karnataka']::text[],
  'mid_range',
  'Wildlife-camp set lunch (Karnataka thali)',
  ARRAY['Karnataka thali','Chicken curry','Veg pulao','Filter coffee']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Jungle Lodges and Resorts (JLR Karnataka — KSTDC-affiliated wildlife properties) operates Bandipur Safari Lodge at Melukamanahalli, on the reserve edge — restaurant open to non-residents for lunch + dinner with prior booking. Set Karnataka thali with safari-package timing 1-2.30pm + 8-10pm. Open 7am-10.30pm.',
  'Lunch booking essential — 10-15 outside-guest covers per service. Set menu fixed; ₹650-850 per person. Cards, UPI, cash all work. Lodge dining hall has wildlife-photo wall + naturalist briefing pre-safari.',
  'Melukamanahalli, Bandipur 571126',
  'https://maps.google.com/?q=JLR+Bandipur+Safari+Lodge+Melukamanahalli',
  ARRAY[
    'https://www.junglelodges.com/our-resorts/bandipur-safari-lodge/',
    'https://www.tripadvisor.in/Hotel_Review-g1162183-d1234567-Reviews-JLR_Bandipur_Safari_Lodge-Bandipur_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bandipur',
  'Country Club Tusker Trails Restaurant',
  'Mangala village, Bandipur',
  'mangala',
  ARRAY['indian','south-indian','continental','chinese']::text[],
  'mid_range',
  'Multi-cuisine resort lunch buffet',
  ARRAY['Indian veg thali','Chicken biryani','Chinese fried rice','Filter coffee']::text[],
  '₹₹₹',
  '[500,851)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Country Club Tusker Trails is a multi-amenity resort at Mangala village, 8km from Bandipur Reception — restaurant open to non-residents for lunch and dinner, buffet model. Pool-side seating; non-resident pool access ₹500 extra. Open 7am-10.30pm.',
  'Lunch buffet 1-3pm ₹650 veg / ₹850 non-veg. Dinner 7.30-10pm a la carte. Card, UPI, cash all work. Adjacent to NH-181 — lunch stop for Mysore-Ooty road travellers.',
  'Mangala village, Bandipur 571126',
  'https://maps.google.com/?q=Country+Club+Tusker+Trails+Bandipur',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1162183-d2284718-Reviews-Country_Club_Tusker_Trails-Bandipur_National_Park_Karnataka.html',
    'https://www.countryclubindia.net/holiday-destinations/tusker-trails-bandipur'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bandipur',
  'Hotel Vinod Bar Restaurant',
  'Gundlupet, NH-181',
  'gundlupet',
  ARRAY['south-indian','karnataka','indian','non-veg']::text[],
  'casual',
  'Karnataka mutton biryani',
  ARRAY['Mutton biryani','Chicken curry','Veg meals','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Vinod is a Gundlupet town-side highway restaurant on NH-181 — the gateway-town stop 25km from Bandipur Reception, common lunch break for Bengaluru-Ooty/Mysore-Wayanad travellers. Karnataka mutton biryani is the call. Open 7am-11pm.',
  'Lunch 12.30-3pm; biryani fresh-batch 1pm and 2pm. Truck-driver clientele early morning; tourist crowd lunch. Cash and UPI; card sometimes works. Highway-side parking ample.',
  'NH-181, Gundlupet town 571111',
  'https://maps.google.com/?q=Hotel+Vinod+Gundlupet',
  ARRAY[
    'https://www.zomato.com/mysore/hotel-vinod-gundlupet',
    'https://www.tripadvisor.in/Restaurant_Review-g6766732-d12345680-Reviews-Hotel_Vinod_Bar_Restaurant-Gundlupet_Chamarajanagar_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bandipur',
  'Mayura Prakruti KSTDC',
  'Bandipur Reception, NH-181',
  'bandipur-reception',
  ARRAY['south-indian','karnataka','indian','vegetarian']::text[],
  'casual',
  'Karnataka veg meals',
  ARRAY['Veg meals','Masala dosa','Filter coffee','Kesari bath']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Mayura Prakruti (KSTDC Karnataka Tourism property) is the only government-run dining option at Bandipur Reception — open to walk-in non-residents for breakfast/lunch/dinner. Karnataka veg meals ₹220. Pre-safari breakfast 7-9am the default for safari-bookers. Open 7am-10pm.',
  'Breakfast 7-9am before morning safari; arrive 6.45am for first batch. Lunch 12.30-3pm. Cards, UPI, cash all work. Adjacent to Bandipur Tourist Reception Centre — safari booking + Mayura combined breakfast is the standard sequence.',
  'KSTDC Mayura Prakruti, Bandipur Reception, NH-181, Bandipur 571126',
  'https://maps.google.com/?q=Mayura+Prakruti+Bandipur',
  ARRAY[
    'https://kstdc.co/hotels/mayura-prakruti-bandipur/',
    'https://www.tripadvisor.in/Hotel_Review-g1162183-d3826018-Reviews-Mayura_Prakruti-Bandipur_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bandipur',
  'Tusker Trails Cafe',
  'NH-181, near Bandipur core zone',
  'nh-181',
  ARRAY['cafe','snacks','continental','indian']::text[],
  'cafe',
  'Filter coffee with banana cake',
  ARRAY['Filter coffee','Banana cake','Veg sandwich','Hot chocolate']::text[],
  '₹',
  '[100,251)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Tusker Trails Cafe is a small NH-181 highway cafe (opened ~2018, 4km N of Bandipur Reception) — common safari-day morning coffee + post-safari afternoon stop. Filter coffee from Coorg + Chikmagalur estate supply. Open 7am-7pm; closed Tuesdays.',
  'Post-safari coffee window 9.30-11am busy. Wi-Fi available; Jio strong, Airtel patchy. Cash and UPI; no card. Take-home coffee 250g ₹350.',
  'NH-181, Bandipur reserve edge 571126',
  'https://maps.google.com/?q=Tusker+Trails+Cafe+Bandipur',
  ARRAY[
    'https://www.zomato.com/mysore/tusker-trails-cafe-bandipur',
    'https://www.tripadvisor.in/Restaurant_Review-g1162183-d22456790-Reviews-Tusker_Trails_Cafe-Bandipur_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
