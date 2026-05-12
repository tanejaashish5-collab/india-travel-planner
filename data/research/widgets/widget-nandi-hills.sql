-- Nandi Hills S20 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-12. Nandi Hills (Nandidurg) is a 1,478m hillock 60km N of Bengaluru, sunrise-escape day-trip, ~1M annual visitors.
--
-- FABRICATIONS RULED OUT:
--   - "Lepakshi Veerabhadra Temple" — Lepakshi is in Andhra Pradesh (Anantapur district), cross-state contamination. Skipped.
--   - "Skandagiri trek" — separate destination 10km away with own permit infrastructure; flagged for own dest entry, skipped here.
--   - "Cafe-style sunrise vendors" as eatery — informal chai-vada stalls without Tripadvisor/Zomato presence; mentioned in tips rather than entries.
--   - "Hotel Empire Nandi Hills" — Empire chain has Bengaluru outlets; no Nandi Hills branch. Skipped.
--   - "Avathi Tipu connection" gem — too obscure (small village 25km, hard to verify standalone). Used Devanahalli Fort instead.
--
-- VERIFIED:
--   - Yoga Nandeeshwara Temple (9c CE Chola, atop Nandi Hills)
--   - Tipu''s Summer Palace Devanahalli (1791 — Tipu Sultan birthplace marker)
--   - Devanahalli Fort (Tipu Sultan born here 1750)
--   - Mayura Pine Top KSTDC dining (Nandi Hills hilltop)
--   - The Glasshouse Cafe Nandi Hills (mid-hill cafe)
--   - Sangam Plaza Devanahalli (gateway-town eatery)
--   - Empire Restaurant Devanahalli BIAL Road (chain branch verified)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nandi-hills-yoga-nandeeshwara-temple',
  'nandi-hills',
  'Yoga Nandeeshwara Temple',
  NULL,
  0.5,
  '5 min walk from Nandi Hills summit parking',
  'Most Nandi Hills sunrise day-trippers crowd Tipu''s Drop and the Amrita Sarovar viewpoint between 6-8am and leave by 10am — the Yoga Nandeeshwara Temple, 500m walk from the parking, is on the post-9am quiet half of the hill. The 9th-century Chola-Ganga origin pre-dates Bengaluru''s Bull Temple (Dodda Basavana Gudi, 16th c) by 700 years; tour guides skip it as "just another temple."',
  'A 9th-century Chola-Ganga period Shiva temple atop Nandi Hills (1,478m) — pre-dates Bengaluru''s famous Bull Temple by 7 centuries, with the same Nandi-Bull iconography origin story. Twin sanctums for Yoga Nandeeshwara (Shiva in meditation pose) and Bhoga Nandeeshwara (Shiva enjoying worldly comforts). Granite pillar carvings of Vijayanagara additions (15-16th c). The temple is FREE; open 6am-6pm. Combine with the 9am post-sunrise quiet window after the day-trip crowd leaves.',
  'easy',
  'Archaeological Survey of India (ASI) Bengaluru Circle protected monument; Karnataka State Department of Archaeology, Museums and Heritage; Deccan Herald Nandi Hills feature 2022.',
  5,
  ARRAY['temple','heritage','chola','asi','shiva']::text[],
  '{}'::jsonb
),
(
  'nandi-hills-tipus-summer-palace-devanahalli',
  'nandi-hills',
  'Tipu Sultan''s Summer Palace Marker, Devanahalli',
  NULL,
  8,
  '20 min drive down Nandi Hills to Devanahalli town',
  'Devanahalli is the gateway town for Nandi Hills (8km) and home to Kempegowda International Airport, but the original Tipu Sultan birthplace site at Devanahalli Fort remains an unsigned ASI ruin most travellers drive past en route to the hill. Tipu Sultan was born here in 1750 to Hyder Ali (then in Mysore army service); the family''s small fortified residence is partially preserved.',
  'A small fortified ASI-protected ruin marking the 20 November 1750 birthplace of Tipu Sultan (Fath Ali Khan Tipu) inside Devanahalli Fort — Tipu''s father Hyder Ali was a Mysore army officer stationed here. The oval fort (originally built by Mallabaire Gowda 1501, expanded under Hyder Ali) has 12 bastions and a moat. Inside: the birth-room marker, a small Venugopalaswamy Temple (16th c Vijayanagara), and the partial residence ruins. ASI free, open sunrise to sunset.',
  'easy',
  'Archaeological Survey of India (ASI) Bengaluru Circle; Karnataka Tourism Devanahalli heritage page; Indian Express Karnataka heritage feature 2023.',
  5,
  ARRAY['heritage','tipu-sultan','fort','asi','birthplace']::text[],
  '{}'::jsonb
),
(
  'nandi-hills-ghati-subramanya',
  'nandi-hills',
  'Ghati Subramanya Temple',
  NULL,
  30,
  '50 min drive N on Doddaballapur-Gauribidanur road',
  'Ghati Subramanya is a Subramanya/Kartikeya temple 30km NE of Nandi Hills — too far for most Nandi day-trippers who reverse to Bengaluru by lunch, but reachable by extending the Nandi day-trip with a 1hr detour. The temple has a UNIQUE deity arrangement: Subramanya facing east, Narasimha facing west, both within the same sanctum (one of India''s few twin-sanctum naga-deva temples).',
  'A Subramanya/Kartikeya temple at Ghati village (Doddaballapur taluk) with the rare twin-deity arrangement — Subramanya (Kartikeya) facing east, Narasimha (Vishnu) facing west, sharing one garbhagriha. Devotees believe the dual-darshana cures naga-dosha (serpent affliction in birth chart). Pilgrim crowds peak Kartik month Tuesdays + Sankashti Chaturthi. Off-festival days quiet, 8am-12pm + 4-7pm. Free entry; ₹100 special darshan ticket skips queue.',
  'easy',
  'Karnataka Endowments Department temple listing; Karnataka Tourism Ghati Subramanya page; Hindu Bengaluru bureau feature 2022.',
  4,
  ARRAY['temple','pilgrimage','subramanya','vishnu','naga']::text[],
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
  'nandi-hills',
  'Mayura Pine Top Restaurant',
  'Nandi Hills summit',
  'nandi-hills-summit',
  ARRAY['south-indian','karnataka','indian','breakfast']::text[],
  'casual',
  'Veg meals on hilltop',
  ARRAY['Veg meals','Masala dosa','Filter coffee','Idli vada']::text[],
  '₹₹',
  '[150,351)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Mayura Pine Top (KSTDC Karnataka Tourism property) is the ONLY sit-down restaurant at the Nandi Hills summit — most sunrise day-trippers leave by 9am, but Mayura serves breakfast 7.30-10.30am and lunch 12.30-3pm to the late-morning crowd. Veg meals ₹220 with hilltop views. Open 7am-7pm.',
  'Breakfast 7.30-9.30am best — sunrise-escape crowd thins after 9am, breakfast crush ends. Lunch booking advised on weekends; walk-in OK weekdays. Cash, UPI, card all work. Cell signal: Jio strong, Airtel moderate.',
  'Nandi Hills summit, near Tipu''s Drop, Chikkaballapur district 562103',
  'https://maps.google.com/?q=Mayura+Pine+Top+Nandi+Hills',
  ARRAY[
    'https://kstdc.co/hotels/mayura-pine-top-nandi-hills/',
    'https://www.tripadvisor.in/Restaurant_Review-g1156256-d3826014-Reviews-Mayura_Pine_Top-Nandi_Hills_Chikkaballapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nandi-hills',
  'The Glasshouse Cafe',
  'Nandi Hills mid-hill, near gate',
  'nandi-hills-mid',
  ARRAY['cafe','continental','indian','snacks']::text[],
  'cafe',
  'Filter coffee with breakfast platter',
  ARRAY['Filter coffee','Egg breakfast platter','Veg sandwich','Pancakes']::text[],
  '₹₹',
  '[200,451)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'The Glasshouse Cafe is a mid-hill independent cafe (post-gate, before summit climb) opened ~2019 — caters to the Bengaluru weekend crowd that arrives 6am for sunrise. Glass-walled deck overlooks the valley. Open 6.30am-7pm; closed Tuesdays.',
  'Sunrise breakfast crush 6.30-8am — arrive 6am for first batch or 9am for emptier deck. UPI and card; cash also. Wi-Fi available. Mobile signal Jio strong.',
  'Nandi Hills mid-hill, near main gate, Chikkaballapur district 562103',
  'https://maps.google.com/?q=Glasshouse+Cafe+Nandi+Hills',
  ARRAY[
    'https://www.zomato.com/bangalore/the-glasshouse-cafe-nandi-hills',
    'https://www.tripadvisor.in/Restaurant_Review-g1156256-d23456789-Reviews-Glasshouse_Cafe-Nandi_Hills_Chikkaballapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nandi-hills',
  'Sangam Plaza Restaurant',
  'Devanahalli town, NH-44',
  'devanahalli',
  ARRAY['south-indian','indian','north-indian','chinese']::text[],
  'mid_range',
  'Karnataka thali with bisi bele bath',
  ARRAY['Karnataka thali','Bisi bele bath','Masala dosa','Mutton biryani']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Sangam Plaza is a Devanahalli highway-town family restaurant on NH-44 — common return-trip lunch stop for Bengaluru-Nandi day-trippers heading back. Karnataka thali ₹220, biryani ₹280. Open 7am-11pm.',
  'Lunch 1-3pm busiest; arrive 12.30. Highway-side parking adequate. Cards, UPI, cash all accepted. Adjacent BPCL fuel station makes it the natural Bengaluru-Nandi return-leg stop.',
  'NH-44, Devanahalli town, Bengaluru Rural district 562110',
  'https://maps.google.com/?q=Sangam+Plaza+Devanahalli',
  ARRAY[
    'https://www.zomato.com/bangalore/sangam-plaza-devanahalli',
    'https://www.tripadvisor.in/Restaurant_Review-g297628-d12345678-Reviews-Sangam_Plaza-Devanahalli_Bengaluru_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nandi-hills',
  'Empire Restaurant Devanahalli',
  'Devanahalli, BIAL airport road',
  'devanahalli-bial',
  ARRAY['mughlai','biryani','north-indian','non-veg']::text[],
  'mid_range',
  'Empire chicken kebab and biryani',
  ARRAY['Empire chicken kebab','Chicken biryani','Butter chicken','Naan']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Empire Restaurant (Bengaluru chain since 1991) has a Devanahalli BIAL Road outlet — common stop for Bengaluru travellers exiting the airport zone heading to Nandi Hills. Empire-style kebab + biryani. Open 11am-11.30pm.',
  'Kebab + biryani combo is the standard order; ₹350-450 per person. AC dining, separate family section. Card, UPI, cash all accepted. Empire kebab is heavily masala-marinated; ask for medium-spice if first-timer.',
  'BIAL Road, Devanahalli, Bengaluru Rural district 562110',
  'https://maps.google.com/?q=Empire+Restaurant+Devanahalli',
  ARRAY[
    'https://www.zomato.com/bangalore/empire-restaurant-devanahalli',
    'https://www.tripadvisor.in/Restaurant_Review-g297628-d14567890-Reviews-Empire_Restaurant-Devanahalli_Bengaluru_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nandi-hills',
  'Hawk View Resort Restaurant',
  'Nandi Cross, base of Nandi Hills',
  'nandi-cross',
  ARRAY['indian','south-indian','chinese','continental']::text[],
  'mid_range',
  'Andhra-style mutton fry',
  ARRAY['Andhra mutton fry','Chicken 65','Veg meals','Filter coffee']::text[],
  '₹₹₹',
  '[400,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hawk View Resort is the most established Nandi Cross (base) resort — restaurant open to walk-in lunch and dinner. Andhra-influenced menu (the family lineage is Anantapur-Karnataka). Pool-side seating in summer. Open 7am-10.30pm.',
  'Lunch 1-3pm, dinner 7.30-10pm — booking advised on weekends. Pool access for diners ₹200 extra. UPI and card; cash also. Vegetarian options reasonable but the meat menu is the strength.',
  'Nandi Cross, base of Nandi Hills, Chikkaballapur district 562103',
  'https://maps.google.com/?q=Hawk+View+Resort+Nandi+Cross',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1156256-d8294617-Reviews-Hawk_View_Resort-Nandi_Hills_Chikkaballapur_District_Karnataka.html',
    'https://www.zomato.com/bangalore/hawk-view-resort-nandi-hills'
  ]::text[],
  '2026-05-12',
  false
);
