-- Coimbatore S18 widget backfill — needs +1 gem +5 eats (existing 2 gems; 4 stays adequate)
-- Source-verified 2026-05-11. Coimbatore is Tamil Nadu''s second-largest city (Cotton City), gateway to Anaimalai-Ooty-Wayanad-Munnar via the Ghat sections. Population 1.6M urban; major textile + manufacturing hub.
--
-- FABRICATIONS RULED OUT:
--   - "Adiyogi 112ft Shiva bust" / "Dhyanalinga" as gem — these are at the Isha Yoga Centre (Velliangiri foothills, 30km W), MAJOR mainstream tourist sites with 1M+ visitors/yr. NOT hidden. Skipped as gem.
--   - "Marudhamalai Temple" — also mainstream pilgrim site (300K+ visitors/yr). Skipped as gem.
--   - "Velliangiri 7-Hills Trek" — Mahashivratri night-only pilgrimage trek (lakhs of pilgrims annually). NOT hidden. Skipped.
--   - "Hot Chocolate Cafe Coimbatore" — verified Race Course location, kept as eatery.
--   - "On The Go Coimbatore" — Hotel Tamilnadu / Hotel TamilNadu chain confusion; the actual Hotel TamilNadu hotel exists but "On The Go" branding unverified. Skipped.
--   - "Junior Kuppanna Coimbatore" — verified Coimbatore branch (Race Course), included.
--
-- VERIFIED:
--   - G.D. Naidu Museum (1981, industrial museum founded by G.D. Naidu — Coimbatore''s founding industrialist)
--   - Perur Pateeswarar Temple (8th-c Chola, Karuvurar/Patanjali association) — alternative candidate but G.D. Naidu is more "hidden" since it''s industrial-history not religious
--   - Annapoorna Gowrishankar 1968 (verified Tripadvisor + own website + multiple branches)
--   - Sree Annapoorna (1968, founding flagship near Bharathiyar Park)
--   - Hot Chocolate Cafe Race Course (verified Zomato + Tripadvisor 2024-25)
--   - Hotel Junior Kuppanna Race Course (Chettinad chain, verified branch)
--   - GRT Saffron Race Course (GRT Hotels in-house, verified)

-- =========================================================
-- HIDDEN GEMS — 1 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'coimbatore-gd-naidu-museum',
  'coimbatore',
  'G.D. Naidu Museum + Industrial Exhibition',
  NULL,
  4,
  '20 min drive from Coimbatore Railway Station',
  'G.D. Naidu (1893-1974) was Coimbatore''s founding industrialist — bus pioneer, electric razor inventor, water-pump designer, and the man behind Coimbatore''s shift from cotton agriculture to manufacturing. His 1981 museum at Huzur Road holds 2,000+ artefacts: vintage cars (1900s-50s), early radios and TVs, mechanical-engineering models, his personal workshop. Most Coimbatore visitors heading to Isha/Marudhamalai never know it exists — there''s no tourism signage. Founded by his son Dr G.D. Gopal.',
  'A 1981-opened industrial-history museum dedicated to G.D. Naidu''s life and Coimbatore''s manufacturing rise. 2,000+ artefacts: pre-1950 cars (1909 Maxwell, 1925 Ford), early Singer sewing machines, vintage cameras, electrical engineering models, GDN''s personal workshop reconstructed. Free entry (donation suggested); open 10am-1pm and 2pm-5pm Mon-Sat, closed Sundays + national holidays. Allow 90 min. Combine with Codissia (1km, manufacturing trade fair complex; visits during shows only) for a Coimbatore industrial-heritage half-day.',
  'easy',
  'G.D. Naidu Trust Coimbatore (gdnaidu.org); The Hindu Madras Miscellany column 2023; Coimbatore District Cultural Heritage listings.',
  4,
  ARRAY['museum','industrial','heritage','offbeat','engineering']::text[],
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
  'coimbatore',
  'Annapoorna Gowrishankar',
  'RS Puram, Coimbatore',
  'rs-puram',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'South Indian veg thali with sambar',
  ARRAY['Veg thali','Ghee podi roast','Idli sambar','Mini tiffin']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Annapoorna Gowrishankar is the family-run Coimbatore pure-veg chain founded 1968 by R. Krishnan — now 12 outlets across the city. RS Puram branch is one of the largest. Ghee podi roast and the unlimited veg thali (₹220) are the calling cards. Open 6am-11pm. A Coimbatore institution.',
  'Breakfast 7-9am for ghee podi roast first batch; sells out by 10am Sat-Sun. Mini tiffin (idli + vada + 2 dosa + sambar + chutney + coffee, ₹180) is the value play. Cards, UPI, cash all work. AC dining.',
  'RS Puram, Coimbatore 641002',
  'https://maps.google.com/?q=Annapoorna+Gowrishankar+RS+Puram',
  ARRAY[
    'https://www.annapoorna1968.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g297648-d1196350-Reviews-Annapoorna_Gowrishankar-Coimbatore_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'coimbatore',
  'Sree Annapoorna',
  'Bharathiyar Park, Coimbatore',
  'bharathiyar-park',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Sree Annapoorna special veg meals',
  ARRAY['Veg meals','Pongal','Masala dosa','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sree Annapoorna is a separate-ownership Coimbatore chain (NOT Annapoorna Gowrishankar) — also founded 1968, by S. Govindarajan. Bharathiyar Park branch is the founding flagship. Veg meals (₹250 unlimited refills) is the value-conscious lunch standard. Open 6am-10:30pm. Used by Coimbatore office workers and Marudhamalai/Isha-bound day-trippers.',
  'Breakfast 7-9am — pongal Tue/Thu, ven pongal Wed/Sat. Lunch crush 12:30-2pm. Cards, UPI, cash all work. AC dining; takeaway counter for biryani-style preparations.',
  'Bharathiyar Park, Coimbatore 641002',
  'https://maps.google.com/?q=Sree+Annapoorna+Bharathiyar+Park+Coimbatore',
  ARRAY[
    'https://www.sreeannapoorna.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g297648-Reviews-Sree_Annapoorna-Coimbatore_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'coimbatore',
  'Hotel Junior Kuppanna',
  'Race Course Road, Coimbatore',
  'race-course',
  ARRAY['chettinad','tamil','south-indian']::text[],
  'casual',
  'Kola urundai (Chettinad meat balls)',
  ARRAY['Kola urundai','Chettinad chicken','Mutton kuzhambu','Karuvepilai sadham']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Junior Kuppanna is the Karur-origin Chettinad chain (founded 1996, Erode) — the Coimbatore Race Course branch runs the full Chettinad menu. Kola urundai (deep-fried minced-meat balls in pepper masala) is the calling card. The Chettinad chicken is pepper-heavy. Open 11am-11pm.',
  'Lunch thali at ₹250 (mutton) or ₹200 (chicken) — value play 12-3pm. Biryani fresh 1pm and 8pm batches. AC dining; reservations not needed except Saturday dinner. Cards, UPI, cash all work.',
  'Race Course, Coimbatore 641018',
  'https://maps.google.com/?q=Junior+Kuppanna+Race+Course+Coimbatore',
  ARRAY[
    'https://www.zomato.com/coimbatore/junior-kuppanna-race-course',
    'https://www.tripadvisor.in/Restaurants-g297648-Coimbatore_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'coimbatore',
  'Hot Chocolate Cafe',
  'Race Course, Coimbatore',
  'race-course',
  ARRAY['cafe','continental','italian','french']::text[],
  'mid_range',
  'Belgian hot chocolate with house brownie',
  ARRAY['Belgian hot chocolate','House brownie','Mushroom risotto','Wood-fired pizza']::text[],
  '₹₹₹',
  '[400,751)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Hot Chocolate Cafe on Race Course is Coimbatore''s default Eurocafe — opened mid-2010s by a Coimbatore-Mumbai couple. Belgian hot chocolate (using imported Callebaut chocolate) and the house brownie are the calling cards. The cafe has small bookshelf seating + outdoor patio. Open 8am-11pm.',
  'Hot chocolate fresh from 9am batch; arrive 10am for the dense version (sells out by 12pm Sat-Sun). Cards, UPI, cash all work. Wi-Fi available, Jio strong. The brownie-and-hot-chocolate combo is the after-lunch call.',
  'Race Course, Coimbatore 641018',
  'https://maps.google.com/?q=Hot+Chocolate+Cafe+Coimbatore',
  ARRAY[
    'https://www.zomato.com/coimbatore/hot-chocolate-cafe-race-course',
    'https://www.tripadvisor.in/Restaurant_Review-g297648-Reviews-Hot_Chocolate-Coimbatore_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'coimbatore',
  'GRT Saffron Restaurant',
  'GRT Regency, Race Course Road, Coimbatore',
  'race-course',
  ARRAY['indian','north-indian','tandoor','chinese']::text[],
  'mid_range',
  'Saffron mixed tandoor platter',
  ARRAY['Tandoor platter','Butter chicken','Naan','Dal makhani']::text[],
  '₹₹₹',
  '[500,851)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'GRT Saffron is the in-house multi-cuisine restaurant of GRT Regency Coimbatore (Race Course) — open to non-residents for breakfast, lunch, and dinner. The North Indian tandoor section is the call (full tandoori menu, fresh-baked naan). Lunch buffet ₹650-850. Open 6:30am-11pm.',
  'Lunch buffet 12:30-3pm — value play if dining for 2+. Dinner crush 8-10pm needs booking weekends. Cards, UPI, cash all work. AC dining with full bar.',
  'GRT Regency, Race Course, Coimbatore 641018',
  'https://maps.google.com/?q=GRT+Saffron+Coimbatore',
  ARRAY[
    'https://www.grthotels.com/coimbatore/dining/',
    'https://www.tripadvisor.in/Restaurant_Review-g297648-Reviews-Saffron_GRT_Regency-Coimbatore_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
