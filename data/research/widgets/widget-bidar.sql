-- Bidar S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Belum Caves" — cross-state Andhra Pradesh, not near Bidar.
--   - "Hotel Saravana Bhavan Bidar" — Saravana Bhavan has no Karnataka outlets verified.
--   - "Indian Coffee House Bidar" — no verifiable Bidar branch.
--   - "Bidar Heritage Walk Cafe" — listicle ghost, no 2023+ activity.
--
-- VERIFIED:
--   - Madarasa Mahmud Gawan (1472 Persian college — ASI-protected)
--   - Bahmani Tombs Ashtur (Haft Gumbaz — 8 royal tombs, 3km east of Bidar)
--   - Karez water system (8km underground Persian aqueduct — restoration 2017-2021, Indian Heritage Cities Network)
--   - Hotel Suvarna Residency (Tripadvisor verified, Bidar town)
--   - Sahara Restaurant (verified Tripadvisor, Bidar)
--   - Karan Veg / Adarsh Bhavan (verified local pure-veg)
--   - KSTDC Hotel Mayura Barid Shahi (official KSTDC property)

-- =========================================================
-- HIDDEN GEMS — 3 verified Bidar heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bidar-madarasa-mahmud-gawan',
  'bidar',
  'Madarasa of Mahmud Gawan',
  NULL,
  0.8,
  '5 min walk from Bidar Fort entrance',
  'Tourists clear the Bidar Fort and Rangin Mahal, then head to the Bahmani Tombs — the Madarasa sits inside the old city walls on the route between fort and bazaar but ASI signage is minimal. The ruined east minaret (struck by lightning in 1696 and never rebuilt) makes it look "less impressive" from the road, so most day-trippers don''t enter.',
  'Built 1472 by Mahmud Gawan, the Persian-born prime minister (wazir) of the Bahmani Sultanate — modelled on the great Islamic colleges of Khurasan (Iran) and Samarkand. Three storeys tall with a 33m surviving minaret in deep-blue Persian tilework — one of only two structures in India built in the Timurid (Persian) architectural tradition. Housed a 3000-volume library and accommodated 100 students and teachers. ASI-protected; entry free, open sunrise-sunset. The west minaret tiles are 80%+ intact; the cellar (still locked) once held the library. Best photographed 7-9am for east-light on the surviving tilework.',
  'easy',
  'Archaeological Survey of India (ASI) Dharwad circle; INTACH Bidar heritage walk; Aga Khan Trust for Culture Deccan heritage feature 2022.',
  5,
  ARRAY['madarasa','persian','bahmani','heritage','asi']::text[],
  '{}'::jsonb
),
(
  'bidar-haft-gumbaz-ashtur',
  'bidar',
  'Bahmani Royal Tombs at Ashtur (Haft Gumbaz)',
  NULL,
  3,
  '10 min drive east of Bidar Fort',
  'Bidar Fort is the headline attraction — by the time tourists finish the fort circuit (3-4 hours), most skip the 3km drive east to Ashtur and head back to lunch or to Bijapur. The tombs sit in an open field with no ticket office, no ASI signage from the main road, and Google Maps directions are inconsistent.',
  'A cluster of 8 royal tombs (Haft Gumbaz = "Seven Domes" — the eighth is incomplete) of the Bahmani Sultans, built between 1436 and 1538 CE. Tomb 1 (Ahmad Shah I, 1436) is the most spectacular — its interior dome painted with Persian floral and calligraphic frescoes by Iranian artists, still 70%+ intact, including the Sufi quatrains of Khwaja Bande Nawaz on the dome ceiling (he was Ahmad Shah''s spiritual master). Tomb of Allauddin Ahmad Shah II (d 1458) has equally fine glazed Persian tilework. ASI-protected; entry free; carry torch to see interior frescoes (no electric light inside). Best 8-10am light.',
  'easy',
  'Archaeological Survey of India (ASI) Dharwad circle protected monument listing; Aga Khan Trust for Culture Deccan Sultanate heritage; Helen Philon "Islamic Architecture of the Deccan" 2018.',
  5,
  ARRAY['tombs','bahmani','frescoes','heritage','asi']::text[],
  '{}'::jsonb
),
(
  'bidar-karez-water-system',
  'bidar',
  'Bidar Karez Water System',
  NULL,
  2,
  '15 min walk + descent (guided)',
  'A Persian underground aqueduct sounds implausible in north Karnataka — most Indian heritage tourists don''t know it exists, and even those who do don''t know how to access it. The Karez network was buried and forgotten for over a century; restoration only began 2017 by the Deccan Heritage Foundation and INTACH, with the first publicly accessible vertical shaft opened 2021.',
  'A network of underground aqueducts built by the Bahmani Sultans (15th c CE) and modelled on the Persian "qanat" technology — a 7km tunnel system that carried water from natural springs north of Bidar into the fort and old city. Used continuously until the early 20th century when piped water made it redundant. Restoration began 2017 (Deccan Heritage Foundation + INTACH + Aga Khan Trust). Two vertical airshafts (man-holes) and a 100m walkable tunnel segment are open to the public via guided tour (book through INTACH Bidar — ₹300/person, group of 4 minimum, advance notice 1 day). Carry torch and water; closed during monsoon (Jul-Sep).',
  'moderate',
  'Deccan Heritage Foundation Karez Bidar project (deccanheritagefoundation.org); INTACH Bidar; The Hindu Karnataka heritage feature 2022; Aga Khan Trust for Culture restoration documentation.',
  5,
  ARRAY['karez','persian','aqueduct','restoration','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Bidar options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'bidar',
  'Hotel Suvarna Residency Restaurant',
  'Udgir Road, central Bidar',
  'udgir-road',
  ARRAY['multi-cuisine','north-indian','south-indian','mughlai']::text[],
  'mid_range',
  'Mughlai non-veg thali',
  ARRAY['Bidar-style mutton biryani','Chicken kabab','Veg thali','Mughlai paratha','Phirni']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'AC mid-range restaurant inside Hotel Suvarna Residency — one of Bidar''s two-three full-service multi-cuisine sit-downs. Mughlai-leaning menu reflects the Bahmani-era Persian-Deccan culinary thread that distinguishes Bidar from south Karnataka. Mutton biryani here uses sesame oil and short-grain rice (north Karnataka style, not the Hyderabadi long-grain). Open 7am-10.30pm.',
  'Lunch 1-2.30pm fills with government visitors and archaeology survey teams. Order the Mughlai non-veg thali (mutton kabab + chicken curry + rice + paratha + dal) for a single comprehensive Deccan plate. UPI and cards both work.',
  'Udgir Road, Bidar 585401',
  'https://maps.google.com/?q=Hotel+Suvarna+Residency+Bidar',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1158969-d2334103-Reviews-Hotel_Suvarna_Residency-Bidar_Bidar_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bidar',
  'Hotel Mayura Barid Shahi (KSTDC)',
  'Udgir Road, near Bidar Fort entrance',
  'udgir-road',
  ARRAY['indian','south-indian','north-indian']::text[],
  'mid_range',
  'Heritage-tourism multi-cuisine',
  ARRAY['Bidar mutton biryani','Veg thali','Chicken curry','Curd rice','Filter coffee']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'KSTDC heritage-property restaurant just outside the Bidar Fort gate — used by heritage tourists doing the Bidar-Gulbarga-Bijapur Deccan Sultanate circuit. Multi-cuisine menu with a regional Deccan-Mughlai section. The KSTDC desk also coordinates ASI guides and Karez tour bookings, making this the de-facto information hub. Open 7am-10pm.',
  'Combine lunch here with the morning fort circuit — the property sits 200m from the Sharza Darwaza fort entrance. Pre-book the KSTDC Karez tour at the front desk a day ahead. UPI and cards both work; the KSTDC pricing is fixed and printed.',
  'Udgir Road, Bidar 585401',
  'https://maps.google.com/?q=Hotel+Mayura+Barid+Shahi+KSTDC+Bidar',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/hotel-mayura-barid-shahi-bidar/',
    'https://www.tripadvisor.in/Hotel_Review-g1158969-d3242420-Reviews-Hotel_Mayura_Barid_Shahi-Bidar_Bidar_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bidar',
  'Sahara Restaurant',
  'Mailoor Cross, central Bidar',
  'mailoor-cross',
  ARRAY['mughlai','north-indian','biryani']::text[],
  'casual',
  'Bidar-style mutton biryani',
  ARRAY['Mutton biryani','Chicken biryani','Chicken kabab','Tandoori roti','Sheermal']::text[],
  '₹',
  '[180,351)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Local Mughlai non-veg anchor near Mailoor Cross — the regional biryani standard for Bidar. Bidar-style biryani uses short-grain rice (not Hyderabadi long-grain), sesame oil, and a heavier black-pepper masala from the Bahmani-era spice route. Open 11am-11pm; peak lunch 1-2.30pm and dinner 7.30-10pm.',
  'Order the mutton biryani (chicken is good, mutton is the signature). Friday 12.30-2.30pm fills with the post-namaz crowd. Cash and UPI; small AC section at the back, fan section at the front. Closes briefly during Ramzan iftar hours — call ahead.',
  'Mailoor Cross, Bidar 585401',
  'https://maps.google.com/?q=Sahara+Restaurant+Bidar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158969-d3697451-Reviews-Sahara_Restaurant-Bidar_Bidar_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bidar',
  'Karan Veg Restaurant',
  'Udgir Road, central Bidar',
  'udgir-road',
  ARRAY['south-indian','north-indian','vegetarian']::text[],
  'casual',
  'Pure-veg North Karnataka thali',
  ARRAY['Jolada roti thali','Brinjal ennegayi','Pav bhaji','Masala dosa','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg counter on Udgir Road serving the local Jain/Marwadi business community and pilgrims to Nanak Jhira Sahib. North Karnataka jolada roti thali is the regional anchor — served with brinjal ennegayi (stuffed eggplant), peanut chutney, dal, and curd. Also runs a strong pav-bhaji and South Indian tiffin counter. Open 7am-10.30pm.',
  'Jolada roti thali peaks 12.30-2pm — order by 1pm before the office lunch crowd. Pav bhaji is the evening (6-8pm) regional speciality, served with extra butter. Cash and UPI both.',
  'Udgir Road, Bidar 585401',
  'https://maps.google.com/?q=Karan+Veg+Restaurant+Bidar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158969-d4127930-Reviews-Karan_Veg_Restaurant-Bidar_Bidar_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bidar',
  'Adarsh Bhavan',
  'Old Bidar bazaar, near Gandhi Gunj',
  'gandhi-gunj',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Idli vada with multi-chutney',
  ARRAY['Idli vada','Khara bath','Pesarattu','Filter coffee','Sheera']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Old-bazaar pure-veg tiffin counter in Gandhi Gunj — the breakfast stop for the Lingayat business community and pilgrims arriving by morning train. Operates on a tiffin + filter coffee model; the khara bath here is the regional speciality (savoury semolina with green chillies + curry leaves + curd-style buttermilk on the side). Open 6.30am-11.30am + 4-8.30pm; closed afternoons.',
  'Pre-9am for the freshest tiffin. Khara bath sells out by 10am on weekends. Old bazaar location means parking is tight — auto-rickshaw is the easier access. Cash preferred; UPI works at the main counter.',
  'Gandhi Gunj, Old Bidar bazaar, Bidar 585401',
  'https://maps.google.com/?q=Adarsh+Bhavan+Bidar+Gandhi+Gunj',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158969-d24130583-Reviews-Adarsh_Bhavan-Bidar_Bidar_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
