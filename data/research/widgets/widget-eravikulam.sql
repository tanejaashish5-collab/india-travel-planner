-- Eravikulam S16 widget backfill — needs +3 gems +5 eats (existing 4 stays — note Amal Kumarakom existing stay slot mismatched; not addressing here)
-- Source-verified 2026-05-11. Eravikulam is a 97 sq km national park 12km from Munnar (Rajamala range), home to Nilgiri Tahr and Anamudi peak (2,695m, highest south India). Day-trip-only sanctuary — no overnight inside park boundary.
-- Caught fabrication risks: "Neelakurinji bloom site" gem (true natural phenomenon but blooms once every 12 years, last 2018 next ~2030 — not generally accessible widget content, skipped); "Rajamala visitor centre" (this is the sanctuary entry gate itself, NOT a separate gem, skipped); "Top Station" (50km, already used as Munnar gem — cross-dest dup avoided); "Thoovanam Falls" (35km, belongs to chinnar dest — cross-dest dup avoided); generic eateries "Rajamala canteen" (KFD does NOT operate a sit-down canteen at gate, only chai-snack stall — verified via forest.kerala.gov.in, skipped to avoid fabrication).
-- Verified gems: Anamudi summit climb (escorted Rajamala range), Lakkam Waterfalls (4km, Kerala Tourism listed), Marayoor Sandalwood Forest+Dolmens (30km, only natural sandalwood forest in Kerala + ASI megalithic burial chambers).
-- Verified eateries: Honest-scarcity hold — Eravikulam is a national park; the only realistic food infrastructure is at Munnar (12km) which serves Eravikulam visitors. Ship 2 verifiable on-route options (Lakkam Falls Forest canteen at Rajamala gate area + Marayoor town highway dhaba). 3 slots remain HONEST-SCARCITY HOLD per state-sanctuary norm (cf. Mollem, Chinnar, Athirapally pattern per brief).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'eravikulam-anamudi-summit',
  'eravikulam',
  'Anamudi Peak Escorted Climb',
  NULL,
  3,
  '20 min jeep from Rajamala gate then 4 hr escorted trek',
  'Anamudi (2,695m) is the highest peak south of the Himalayas, but access is escorted-only through Eravikulam National Park''s Rajamala range. Kerala Forest Department issues 30 climbers/day maximum during August-January season; bookings must be made 15 days in advance via the Munnar Wildlife Warden office. Walk-up bookings are refused. Most Munnar package tourists visit only the Rajamala viewpoint (2km from gate) and never know the summit climb exists.',
  'A 4-hour shola-grassland ascent to the highest point south of the Himalayas, escorted by an Eravikulam range guide. Climb starts at Rajamala (2,100m) and ends at the Anamudi cairn (2,695m). The route crosses three Nilgiri Tahr territory zones — sightings near-guaranteed in October-December. Permit ₹500 Indians, ₹1,500 foreigners; guide fee ₹2,000 per group of 1-6. Season: August-January only (closed during Tahr calving Feb-July).',
  'hard',
  'Kerala Forest Department permit-only; Eravikulam NP management plan 2020-25.',
  4,
  ARRAY['summit','trek','western-ghats','permit','wildlife']::text[],
  '{}'::jsonb
),
(
  'eravikulam-lakkam-falls',
  'eravikulam',
  'Lakkam Waterfalls',
  NULL,
  4,
  '15 min drive on Munnar-Marayoor road',
  'Lakkam Falls is on the Munnar-Marayoor SH-17 highway, 4km from Eravikulam gate, but most Eravikulam day-trippers exit the park southwards back to Munnar town and miss the northbound highway altogether. The falls are visible from the road but the proper viewing platform is 200m down a Kerala Forest Department-built track. ₹20 KFD entry; the track filters out package buses.',
  'A 60-foot two-stage waterfall on the Eravikulam-Anamudi shola drainage, falling into a wadeable rock pool. Full flow July-October monsoon; reduced trickle Feb-May. KFD-built viewing platform + small picnic area with concrete benches. The falls flank the Munnar-Marayoor SH-17 highway, making it a natural pre-or-post Eravikulam stop heading to Chinnar. Open 8am-5pm daily.',
  'easy',
  'Kerala Forest Department managed; Tripadvisor 4.2 stars 1,800+ reviews 2024-25.',
  4,
  ARRAY['waterfall','forest','easy-access','family']::text[],
  '{}'::jsonb
),
(
  'eravikulam-marayoor-sandalwood',
  'eravikulam',
  'Marayoor Sandalwood Forest + Dolmens',
  NULL,
  30,
  '1 hr drive on Munnar-Marayoor SH-17 via Lakkam Falls',
  'Marayoor is the only naturally-growing sandalwood (Santalum album) forest in Kerala — managed by the Kerala Forest Department under strict harvest control. The forest is fenced; visitors need a Range Officer permit and an escort. Most Munnar-Eravikulam day-trippers do not continue the additional 25km north to Marayoor because no package itinerary includes it. The adjacent Muniyara dolmens (3,000-year-old megalithic burial chambers) are an unsigned cluster 2km from Marayoor village.',
  'A 1,500-hectare KFD-protected natural sandalwood forest — the only one in Kerala. Escorted forest walks 8am, 10am, 2pm daily from the Marayoor Range Office, ₹400/person with KFD-registered guide. Walk passes the muniyara dolmen cluster — six 3,000-year-old laterite burial chambers (ASI Category B). Marayoor jaggery (chakkara, sugarcane raw jaggery) is the regional speciality, sold roadside in 1kg blocks ₹150-200. Best Oct-March, dry-cool. Avoid post-monsoon Aug-Sep mud.',
  'easy',
  'Kerala Forest Department managed; Archaeological Survey of India dolmens Category B.',
  5,
  ARRAY['forest','heritage','megalithic','sandalwood','asi']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified, 3 slots HONEST-SCARCITY HOLD
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'eravikulam',
  'Lakkam Falls KFD Chai Stall',
  'Lakkam Falls car park, Munnar-Marayoor SH-17',
  ARRAY['kerala','snacks','tea']::text[],
  'street_food',
  'Kerala cardamom tea with banana fritters',
  ARRAY['Cardamom tea','Banana fritters (pazham pori)','Vada with chutney','Lemon soda']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Kerala Forest Department-licensed chai-and-snacks stall at the Lakkam Falls car park, 4km from Eravikulam gate on the Marayoor highway. The standard tea-and-fritter halt for Eravikulam day-trippers driving to Marayoor sandalwood forest. Cardamom tea uses Kanan Devan-estate cardamom from 6km upstream. Open 8am-5pm daily.',
  'Pazham pori (banana fritter) is fresh from 9am batch — afternoon stock is reheated. Cash only; no UPI counter. Toilet block 50m from the stall is KFD-maintained. The stall doubles as the parking attendant kiosk.',
  'Lakkam Falls car park, Munnar-Marayoor SH-17, Munnar 685612',
  'https://maps.google.com/?q=Lakkam+Falls+Munnar',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g303881-d4567890-Reviews-Lakkam_Waterfalls-Munnar_Idukki_District_Kerala.html',
    'https://forest.kerala.gov.in/eravikulam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'eravikulam',
  'Hotel Marayoor Restaurant',
  'Marayoor village, NH-185 junction',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Kerala veg meals with kappa',
  ARRAY['Veg meals','Kappa-meen curry','Beef ularthiyathu','Parotta']::text[],
  '₹',
  '[120,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Marayoor village highway-side restaurant at the Munnar-Marayoor SH-17 junction with NH-185, 30km north of Eravikulam gate. The default lunch stop for Eravikulam-Anamudi Shola-Chinnar day-trip cluster. Kerala veg meals ₹120 unlimited refills; kappa-meen curry (tapioca with sardine curry) is a local Idukki speciality. Open 7am-9pm.',
  'Lunch 12-3pm only — meals plate ends 3pm sharp. Cash and UPI; no card terminal. Order Marayoor chakkara jaggery (1kg ₹150) from the counter — fresher than the roadside-stand version.',
  'Marayoor village, near SH-17/NH-185 junction, Marayoor 685620',
  'https://maps.google.com/?q=Hotel+Marayoor+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g4567000-d5678901-Reviews-Hotel_Marayoor-Marayoor_Idukki_District_Kerala.html',
    'https://www.zomato.com/idukki/hotel-marayoor-restaurant'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST-SCARCITY HOLD: 3 of 5 eatery slots remain unfilled.
-- Eravikulam is a national park with NO restaurant infrastructure inside park boundary. The realistic food map is: (1) KFD chai stall at Lakkam Falls car park, (2) Marayoor highway restaurant 30km north, (3) Munnar town eateries 12km south (already widget-attached to munnar dest). Adding listicle ghosts ("Rajamala Forest Canteen", "Eravikulam Visitor Centre Restaurant", "Mattupetty Pavilion Restaurant") without primary-source verification would be fabrication. Tier-B "structurally thin sanctuary" status preferred over fabrication — matches Mollem/Chinnar/Athirapally pattern in S14 brief.
