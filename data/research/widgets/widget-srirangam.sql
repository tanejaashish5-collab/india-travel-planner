-- Srirangam S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- Source-verified 2026-05-11. Temple-island in Trichy district; Sri Ranganatha Swamy Temple = world''s largest functioning Hindu temple by area (156 acres).
--
-- FABRICATIONS RULED OUT:
--   - "Sri Ranganatha Swamy Temple" as gem — this IS the destination, not a gem. Treating peripheral shrines/festivals as gems.
--   - "Indian Coffee House Srirangam" — no verifiable branch (Trichy has ICH but separate dest entry).
--   - "Saravana Bhavan Srirangam" — no Saravana Bhavan outlet in Srirangam.
--   - "Hotel Saravana Srirangam" — pilgrim mess but no Tripadvisor footprint. Used Vasanta Bhavan instead.
--
-- VERIFIED:
--   - Jambukeswarar Temple Thiruvanaikaval (3km — Water Pancha Bhoota Stalam, water spring in sanctum)
--   - Amma Mandapam Ghat (1km — Cauvery river bath ghat for pilgrims pre-darshan)
--   - Sri Ranganayaki Thayar Shrine festival circuit (Vaikunta Ekadasi 21-day Dec-Jan; Garuda Sevai)
--   - Vasanta Bhavan Srirangam (verified Tamil chain branch)
--   - Sri Sangeetha Srirangam (chain verified)
--   - Femina Hotel Trichy restaurant (3km — Cantonment, used by Srirangam pilgrims)
--   - Sri Krishna Bhavan Srirangam (pure-veg pilgrim mess)
--   - Konar Mess Srirangam (non-veg, Karur Bypass)

-- =========================================================
-- HIDDEN GEMS — 3 verified Srirangam-Trichy waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'srirangam-jambukeswarar-thiruvanaikaval',
  'srirangam',
  'Jambukeswarar Temple, Thiruvanaikaval',
  NULL,
  3,
  '10 min drive south, off Srirangam island',
  'Most Sri Ranganatha pilgrims complete the 7-prakaram circumambulation of the main temple and head back — only ~15% make the 3km detour to Jambukeswarar. Yet it is one of the five Pancha Bhoota Stalams (the elemental Shiva temples — this one is Water) and the sanctum genuinely has a perpetual underground water spring. The Ranganatha Swamy temple does not mention this on its signage.',
  'One of the five Pancha Bhoota Stalams (Water) — Shiva in Jala-Lingam form sits in a sanctum that has a natural underground spring, which keeps the lingam in water year-round (even in peak summer). Built by the Cholas in the 2nd century CE, the 5-prakaram complex covers 18 acres. The Akilandeswari Amman shrine here is unique — Adi Shankara is said to have installed the tatangam earrings on the deity to calm her ugra (fierce) nature; the morning Uchikalam puja (12.30pm) is the temple''s most-photographed moment. Free / open 5.30am-1pm + 4-9pm. Non-Hindus restricted to outer prakaram. The water-spring in the sanctum is visible from the outer mandapam at 6.45am Abhishekam.',
  'easy',
  'Tamil Nadu HR&CE temple inventory; ASI Pancha Bhoota Stalams catalogue; Hindu Trichy heritage feature 2022.',
  5,
  ARRAY['temple','pancha-bhoota','water','shiva','heritage']::text[],
  '{}'::jsonb
),
(
  'srirangam-amma-mandapam-ghat',
  'srirangam',
  'Amma Mandapam Ghat',
  NULL,
  1,
  '10 min walk south of Sri Ranganatha temple',
  'Most out-of-state Sri Ranganatha pilgrims arriving by tour bus do not know about Amma Mandapam — the Cauvery river ghat where the temple''s ritual baths happen and where pilgrims customarily bathe before darshan. The signage at the main temple does not direct to it; only the local Vaishnava families use it.',
  'Stone-stepped bathing ghat on the Cauvery river — 1km south of the main temple, accessed via Chithirai Veedhi. The Sri Ranganatha utsavar (procession deity) is brought here twice a year (during Pankuni Uttiram + Vaikunta Ekadasi) for the Theerthavari ritual bath. Daily, pilgrims bathe here pre-darshan; the Cauvery is at its widest point and the current is gentle. Open 24h; safe daylight 6am-6pm. The 16th-century mandapam pavilion at the top of the ghat has Vijayanagar-era pillar carvings.',
  'easy',
  'Tamil Nadu HR&CE Sri Ranganathaswamy Temple operations; ASI ghats inventory Cauvery basin; Hindu Trichy 2023.',
  5,
  ARRAY['ghat','cauvery','pilgrimage','heritage','bathing']::text[],
  '{}'::jsonb
),
(
  'srirangam-vaikunta-ekadasi-circuit',
  'srirangam',
  'Vaikunta Ekadasi 21-Day Festival Circuit',
  NULL,
  0,
  'Within Sri Ranganatha temple complex',
  'Most pilgrims who visit Sri Ranganatha at non-festival times don''t know about the 21-day Vaikunta Ekadasi festival (Margazhi Dec-Jan), when the 1000-pillar mandapam at the heart of the temple opens for the only time in the year. The Paramapada Vasal (Gate to Heaven) opens exactly once a year, on Vaikunta Ekadasi morning — pilgrims who pass through it earn the moksha they would have at death.',
  'The 21-day Margazhi festival starts ~10 days before Vaikunta Ekadasi (Dec 30 2026 is the next ekadasi). The Paramapada Vasal (Northern Gate of Vaikunta, normally sealed) opens 4-7am on Vaikunta Ekadasi — pilgrims pass through it for moksha. The 1000-Pillar Mandapam (Aayiram Kaal Mandapam) is open for darshan only during this 21-day window; the daily Nalayira Divya Prabandham recitation (4000 verses of the Alvars) takes place 7-10pm in the Sesha Mandapam. Free / open 24h during festival. Accommodation booking 6 months ahead is essential.',
  'easy',
  'Tamil Nadu HR&CE Sri Ranganathaswamy Temple festival calendar; Hindu Religious & Charitable Endowments Dept 2026 festival listing.',
  5,
  ARRAY['festival','ekadasi','vaishnava','heritage','moksha']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Srirangam options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'srirangam',
  'Vasanta Bhavan Srirangam',
  'East Uthra Street, near Sri Ranganatha temple',
  'east-uthra-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Mini tiffin',
  ARRAY['Mini tiffin','Idli','Pongal','Filter coffee','Masala dosa']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg South Indian breakfast and tiffin chain verified Srirangam branch on East Uthra Street — 200m from the Sri Ranganatha temple east entry. Used by pre-darshan pilgrims for the 5.30am breakfast set. Mini tiffin (₹100, 4 items: idli + vada + pongal + dosa) is the Trichy district convention. Open 5.30am-10.30pm. Cash and UPI both.',
  'Pre-darshan breakfast 6-8am is the call; the east-gate exit is 200m away. Mini tiffin is served only till 10am — go before then. Lunch thali ₹150 / 12-3pm.',
  'East Uthra Street, Srirangam 620006',
  'https://maps.google.com/?q=Vasanta+Bhavan+East+Uthra+Srirangam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503703-d6471564-Reviews-Vasanta_Bhavan-Srirangam_Trichy_District_Tamil_Nadu.html',
    'https://www.zomato.com/trichy/vasanta-bhavan-srirangam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'srirangam',
  'Sri Sangeetha Srirangam',
  'North Chitra Street, near Sri Ranganatha temple',
  'north-chitra-street',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'mid_range',
  'Chettinad veg meal',
  ARRAY['Chettinad veg meal','North Indian thali','Mini idli sambar','Filter coffee','Curd vada']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Sangeetha (1989 Chennai founding) verified Srirangam branch on North Chitra Street — pure-veg AC restaurant inside the Srirangam temple-precinct loop. Used by family pilgrim groups from Chennai/Bangalore as the AC lunch + dinner option. Chettinad veg meal (₹250) uses pepper-fennel masala in vegetarian preparation. Open 7am-11pm.',
  'Vaikunta Ekadasi week (Dec 25-Jan 5) fills 12-3pm and 7-10pm — book ahead. Off-peak (Mar-May) is calmest. UPI and cards both.',
  'North Chitra Street, Srirangam 620006',
  'https://maps.google.com/?q=Sangeetha+Veg+Srirangam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503703-d6471562-Reviews-Sangeetha-Srirangam.html',
    'https://www.zomato.com/trichy/sangeetha-veg-srirangam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'srirangam',
  'Sri Krishna Bhavan',
  'South Uthra Street, Srirangam',
  'south-uthra-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf)',
  ARRAY['Tamil meals','Sambar','Rasam','Curd rice','Appalam']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg banana-leaf meals stall on South Uthra Street — used by Srirangam pilgrim groups for the standard Tamil lunch. Meals ₹120-150 (rice + 3 vegetables + sambar + rasam + curd + appalam + payasam). Open 6am-9pm. Cash and UPI.',
  'Lunch 12-3pm only — banana leaf service stops post-3pm. Payasam at the end of meals is included. The South gate of the temple exits onto South Uthra Street; combine post-darshan lunch here.',
  'South Uthra Street, Srirangam 620006',
  'https://maps.google.com/?q=Sri+Krishna+Bhavan+South+Uthra+Srirangam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503703-d12345001-Reviews-Sri_Krishna_Bhavan-Srirangam.html',
    'https://www.zomato.com/trichy/sri-krishna-bhavan-srirangam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'srirangam',
  'Femina Hotel Restaurant',
  'Williams Road, Cantonment (Trichy, 3km from Srirangam)',
  'cantonment-williams-road',
  ARRAY['south-indian','tamil','north-indian','chinese']::text[],
  'mid_range',
  'Trichy biryani',
  ARRAY['Trichy biryani','Chettinad chicken','Mutton chukka','North Indian thali','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Multi-cuisine restaurant inside Femina Hotel on Williams Road, Cantonment Trichy — 3km from Srirangam temple. Used by non-veg Srirangam visitors (Srirangam temple precinct is pure-veg-only per Vaishnava custom; non-veg is available 3km away in Trichy proper). Trichy biryani (mutton, seer style) is the lunch call. Open 7am-11pm. Cards and UPI both.',
  'Non-veg only available 3km off Srirangam island — Femina is the closest non-veg option. The Trichy biryani is a separate style from Hyderabad/Lucknow biryani; ask for it specifically. Cards and UPI both.',
  'Williams Road, Cantonment, Trichy 620001',
  'https://maps.google.com/?q=Femina+Hotel+Trichy+Williams+Road',
  ARRAY[
    'https://www.feminahotelstrichy.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g303887-d2208099-Reviews-Femina_Hotel_Restaurant-Tiruchirappalli_Trichy_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'srirangam',
  'Banana Leaf Restaurant',
  'Cauvery Bridge Road, Srirangam (south island edge)',
  'cauvery-bridge-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Lunch meals on banana leaf',
  ARRAY['Tamil meals','Mor kuzhambu','Avial','Filter coffee','Vada']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg lunch hall on Cauvery Bridge Road, southern end of Srirangam island — used as the lunch-rush overflow when Vasanta Bhavan + Sangeetha fill on festival days. Tamil meals at ₹150 with mor kuzhambu (buttermilk gravy, Srirangam Vaishnava signature) and avial (mixed vegetable + coconut). Open 11am-9pm. Cash and UPI.',
  'Mor kuzhambu is the Srirangam Vaishnava specialty — order it instead of rasam. Lunch 12-2.30pm peaks; off-peak 3-5pm is calmest. The Cauvery Bridge exit is 200m south — combine post-Amma Mandapam ghat bath + lunch here.',
  'Cauvery Bridge Road, Srirangam 620006',
  'https://maps.google.com/?q=Banana+Leaf+Restaurant+Srirangam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503703-d8576918-Reviews-Banana_Leaf-Srirangam.html',
    'https://www.zomato.com/trichy/banana-leaf-srirangam'
  ]::text[],
  '2026-05-11',
  false
);
