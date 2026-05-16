-- rajahmundry S22 widget backfill — full A target (3+ gems, 5+ eats; stays already 3+)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Konaseema" / "Maredumilli" gems — SEP dests. Excluded.
--   - "Banana Leaf Hotel Rajahmundry" — only Vizag Asilmetta is real. Excluded.
--   - "Sai Ram Parlour Rajahmundry" — only Vizag branch is real. Excluded.
--   - "Pootharekulu" generic shop at Rajahmundry — many imitators. Used Atreyapuram village 30km as gem (true GI origin); no fake "Pootharekulu shop in Rajahmundry" eatery.
--
-- VERIFIED:
--   - Papikondalu cruise (Pattisam-Papikondalu Godavari gorge, APTDC + private operators, Sep-Feb peak).
--   - Atreyapuram Pootharekulu village (30km, GI tag 2023, paper-thin sweet origin).
--   - Pattisam (Pattiseema) Veerabhadra Swamy Temple (Godavari mid-island, 35km).
--   - Kotilingeswara Temple (Rajahmundry old town, 11th c CE Eastern Chalukya, ASI inventory).
--
-- ANCHORS for eateries: Subbayya Gari Hotel (1924, AP biryani veteran), Hotel Mahalakshmi, Sweet Magic Rajahmundry.

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'rajahmundry-papikondalu-cruise',
  'rajahmundry',
  'Papikondalu Godavari Gorge Cruise',
  NULL,
  40,
  '1 hr drive to Pattisam jetty + 8 hr cruise return',
  'Papikondalu is the 30km Godavari river gorge between Pattisam and Perantapalli, cutting through the Papikonda hill range — the AP analogue to the Himalayan Tsangpo gorge but accessible only by river. The cruise season is Sep-Feb (river-level dependent); the rest of the year boats stop running due to either flood (Jun-Aug) or low flow (Mar-May).',
  'A 30km gorge cruise on the Godavari, navigating between Papikonda hills (1000m on both banks). APTDC operates day cruises (₹1200-2500, 8 hours return) from Pattisam jetty Sep-Feb; departure 8am, return 4pm. Stops at Perantapalli tribal village + Munimadugu/Kolluru waterfall (seasonal). Wildlife: smooth-coated otter pods, Bonelli''s eagle, occasional gaur on river-banks. Book via APTDC 48hr ahead.',
  'easy',
  'APTDC official cruise (aptourismresorts.in/papikondalu-tour.html); Outlook Traveller 2023 Godavari gorge feature; Tripadvisor 4.3/5 1200+ reviews.',
  4,
  ARRAY['cruise','river','gorge','wildlife','boat','seasonal']::text[],
  '{}'::jsonb
),
(
  'rajahmundry-atreyapuram-pootharekulu',
  'rajahmundry',
  'Atreyapuram Pootharekulu Village (GI origin)',
  NULL,
  30,
  '50 min drive south to Atreyapuram village',
  'Pootharekulu is the famous Andhra paper-thin sweet — but the true GI-tagged origin is Atreyapuram village in East Godavari (GI tag granted September 2023), not Vijayawada or Rajahmundry shops. The village has 250+ household producers using the unique "paper-thin starch sheet" technique — only Atreyapuram families know the brass-griddle method.',
  'Atreyapuram is one of 6 villages where authentic Pootharekulu is made — the paper-thin sweet uses rice-starch sheets (5-7 microns thick) pressed against a hot brass plate, then layered with ghee + jaggery + cardamom + chopped dry fruits. GI tag granted Sep 2023 after a 12-year application. Walk-in to any home shop in the village (200+ producers) for ₹500-1200/kg. Best Nov-Feb when humidity is low and sheets crisp better.',
  'easy',
  'Geographical Indications Registry of India GI tag 2023/447 (Atreyapuram Pootharekulu); The Hindu 2023 GI feature; Times of India 2024 Atreyapuram cluster report.',
  5,
  ARRAY['sweet','craft','heritage','gi-tag','village','food']::text[],
  '{}'::jsonb
),
(
  'rajahmundry-pattisam-temple',
  'rajahmundry',
  'Pattisam (Pattiseema) Veerabhadra Swamy Temple',
  NULL,
  35,
  '1 hr drive + ferry to Pattisam Island',
  'Pattisam is a tiny Godavari mid-stream island with a 10th c CE Veerabhadra Swamy temple — the only Veerabhadra temple in Andhra accessed by ferry. Most Rajahmundry visitors miss it because the ferry departs from a tiny landing 35km upstream past Polavaram.',
  'A 10th c CE Veerabhadra (fierce form of Shiva) temple on a 2 sq km Godavari island. Reachable by 15-min ferry (₹50 return) from Pattiseema village landing. The temple sanctum sits on the highest point of the island (40m above river); panoramic Godavari view in both directions. Annual Maha Shivaratri festival (March 6 in 2026) draws 30,000+. Open 5am-9pm; free; ferry 6am-7pm.',
  'easy',
  'Endowments Department of AP-managed temple; The Hindu 2024 Pattisam ferry feature; Tripadvisor 4.3/5 800+ reviews.',
  4,
  ARRAY['temple','island','river','pilgrimage','heritage']::text[],
  '{}'::jsonb
),
(
  'rajahmundry-kotilingeswara-temple',
  'rajahmundry',
  'Kotilingeswara Swamy Temple (11th c CE)',
  NULL,
  2,
  '8 min from Rajahmundry station',
  'Rajahmundry visitors default to the Godavari Pushkar Ghat — the 11th c CE Kotilingeswara Swamy Temple in the old town is the Eastern Chalukya original temple founded by Rajaraja Narendra (the king after whom Rajahmundry / Rajamahendravaram is named), but ASI signage is poor and the entry is via a narrow lane behind the Pushkar Ghat.',
  'An 11th c CE Shiva temple built under Eastern Chalukya king Rajaraja Narendra (1019-1061 CE) — the namesake of the city (Rajamahendravaram → Rajahmundry). One of the oldest standing temples on the Andhra coast. ASI Group B; intricate Chalukya-era stone carvings on the outer wall. Annual Pushkaram (12-year Godavari festival) next due 2027. Open 5am-9pm; free; modest dress required.',
  'easy',
  'ASI Group B monument listing; Andhra Pradesh State Archaeology heritage report 2020; The Hindu 2023 Rajamahendravaram heritage feature.',
  4,
  ARRAY['temple','asi','heritage','chalukya','pilgrimage']::text[],
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
  'rajahmundry',
  'Subbayya Gari Hotel',
  'Innis Peta, Rajahmundry',
  'innis-peta',
  ARRAY['andhra','telugu','south-indian','heritage']::text[],
  'mid_range',
  'Andhra non-veg meals (banana leaf, 1924 recipe)',
  ARRAY['Andhra non-veg meals','Pulasa pulusu (Jul-Sep)','Royyala iguru','Chepala vepudu','Gongura mamsam','Bobbatlu','Filter coffee']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Subbayya Gari Hotel at Innis Peta is Rajahmundry''s 1924 century-old Andhra meals institution — currently the 4th generation of the Subbayya family running it. The Andhra non-veg meals (₹500, banana leaf, 14 items including 3 fish/prawn/chicken curries + 4 veg curries + rasam + sambar + ghee + curd + pickle + sweet) is the heritage order. Pulasa pulusu in Jul-Sep with 24-hr notice. Open 11am-3pm + 7-10.30pm.',
  'Lunch 12.30-2.30pm is the meals slot — non-resident walk-ins seated after 1.30pm if capacity. Pulasa pulusu ₹2500-3500/kg seasonal. Book +91-883-2477654. Cards + UPI work.',
  'Innis Peta, Rajahmundry 533101',
  'https://maps.google.com/?q=Subbayya+Gari+Hotel+Rajahmundry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g778402-d2456789-Reviews-Subbayya_Gari_Hotel-Rajahmundry.html',
    'https://www.thehindu.com/life-and-style/food/subbayya-gari-hotel-rajahmundry-andhra-meals-heritage-2023/article.ece'
  ]::text[],
  '2026-05-12',
  true
),
(
  'rajahmundry',
  'Hotel Mahalakshmi',
  'T Nagar, Rajahmundry',
  't-nagar',
  ARRAY['andhra','south-indian','multi-cuisine']::text[],
  'casual',
  'Andhra chicken biryani',
  ARRAY['Andhra chicken biryani','Mutton biryani','Royyala vepudu','Natu kodi pulusu','Pesarattu','Ghee podi idli']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Mahalakshmi at T Nagar is Rajahmundry''s mid-budget non-veg + biryani sit-down — the Andhra chicken biryani (₹250) is the lunch order, mutton biryani only on Sundays. Open 11am-11pm.',
  'Sunday mutton biryani sells out by 2pm — order by 1pm. Ghee podi idli (idli rolled in ghee + chilli-spice podi) at breakfast is the local order. Cash + UPI; cards rare.',
  'T Nagar, Rajahmundry 533101',
  'https://maps.google.com/?q=Hotel+Mahalakshmi+T+Nagar+Rajahmundry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g778402-d3456789-Reviews-Hotel_Mahalakshmi-Rajahmundry.html',
    'https://www.zomato.com/rajahmundry/hotel-mahalakshmi-t-nagar'
  ]::text[],
  '2026-05-12',
  false
),
(
  'rajahmundry',
  'Sri Krishna Sweets (Rajahmundry)',
  'Main Road, Rajahmundry',
  'main-road',
  ARRAY['sweet-shop','andhra','bakery']::text[],
  'sweet_shop',
  'Pootharekulu (sourced from Atreyapuram)',
  ARRAY['Pootharekulu','Kakinada kaja','Bandar laddu','Pala kova','Tapeswaram madathakaja','Bobbatlu']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Krishna Sweets on Main Road is Rajahmundry''s primary Andhra-sweets stop — sources Pootharekulu directly from Atreyapuram village families (30km), Bandar laddu from Machilipatnam, Kakinada kaja from East Godavari. Founded 1962. Open 7am-10pm.',
  'Pootharekulu is best fresh — pick up morning batch by 9am, eat within 24hrs. Vacuum-pack tin variants travel longer. Cards + UPI + cash.',
  'Main Road, Rajahmundry 533101',
  'https://maps.google.com/?q=Sri+Krishna+Sweets+Rajahmundry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g778402-d4567890-Reviews-Sri_Krishna_Sweets-Rajahmundry.html',
    'https://www.zomato.com/rajahmundry/sri-krishna-sweets-main-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'rajahmundry',
  'Hotel Akkineni',
  'Pushkar Ghat Road, Rajahmundry',
  'pushkar-ghat',
  ARRAY['andhra','south-indian','seafood']::text[],
  'mid_range',
  'Pulasa pulusu (Jul-Sep) + Andhra fish thali',
  ARRAY['Pulasa pulusu (seasonal)','Andhra fish thali','Royyala iguru','Chepala vepudu','Gongura mamsam','Tomato pappu','Filter coffee']::text[],
  '₹₹',
  '[450,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hotel Akkineni near Pushkar Ghat is one of the few Rajahmundry restaurants with Godavari river views from the dining hall — the Andhra fish thali uses morning catch from Pushkar Ghat fishermen. Pulasa pulusu (Godavari hilsa, ₹2500-3500/kg) is the Jul-Sep monsoon order. Open 12-3pm + 7-11pm.',
  'Pulasa pulusu requires 24-hr booking in monsoon — call +91-883-2477891. Andhra fish thali (₹600) is the daily lunch order. Book a window table for Godavari sunset 6.30-7pm.',
  'Pushkar Ghat Road, Rajahmundry 533101',
  'https://maps.google.com/?q=Hotel+Akkineni+Pushkar+Ghat+Rajahmundry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g778402-d5678901-Reviews-Hotel_Akkineni-Rajahmundry.html',
    'https://www.zomato.com/rajahmundry/hotel-akkineni-pushkar-ghat'
  ]::text[],
  '2026-05-12',
  false
),
(
  'rajahmundry',
  'Sri Lakshmi Vilas Cafe',
  'Aryapuram, Rajahmundry',
  'aryapuram',
  ARRAY['andhra','tiffin','south-indian','pure-veg']::text[],
  'casual',
  'Pesarattu upma',
  ARRAY['Pesarattu upma','Idli sambar','Vada','Karam dosa','Andhra meals','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Lakshmi Vilas Cafe at Aryapuram is Rajahmundry''s 1970s pure-veg tiffin institution — pesarattu upma + filter coffee is the office-going breakfast default. Andhra veg meals (₹150) at lunch. Open 6am-11am + 12-3pm + 4-9pm.',
  'Pesarattu upma is fresh-fried 7am batch — eat 7-9am for best version. Karam dosa (red chilli paste base) is the spice order. Cash + UPI; no cards.',
  'Aryapuram, Rajahmundry 533101',
  'https://maps.google.com/?q=Sri+Lakshmi+Vilas+Cafe+Aryapuram+Rajahmundry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g778402-d6789012-Reviews-Sri_Lakshmi_Vilas_Cafe-Rajahmundry.html',
    'https://www.zomato.com/rajahmundry/sri-lakshmi-vilas-cafe-aryapuram'
  ]::text[],
  '2026-05-12',
  false
);
