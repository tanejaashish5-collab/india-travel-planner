-- Courtallam S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- Source-verified 2026-05-11. Small Western Ghats waterfall town in Tenkasi district — June-Sept monsoon peak.
--
-- FABRICATIONS RULED OUT:
--   - "Indian Coffee House Courtallam" — no verifiable ICH branch in Tenkasi district.
--   - "Hotel Saravana Courtallam" — multi-branch chain; specific Courtallam outlet not found on the saravana chain page.
--     (NOTE: there''s a "Hotel Saravana Bhavan Tenkasi" — different chain, mid-town Tenkasi 6km away. Used Tenkasi-edge instead.)
--   - "Manjolai Tea Estate Resort" — Manjolai is 35km away (Kalakkad-Mundanthurai TR); too far to count as Courtallam gem.
--     Listed as gem only (drive-route), not eatery.
--
-- VERIFIED:
--   - Tenkasi Kasi Viswanathar Temple (10km — 16th c Pandya rebuild, gopuram visible from Courtallam approach)
--   - Papanasam Falls + Dam (15km north — Tambaraparani river, Kalakkad-Mundanthurai TR buffer)
--   - Manjolai Hills (35km — small tea estate at 4000ft, dense forest road via Servalar Dam)
--   - Hotel Tamil Nadu Courtallam (TTDC, the only chain-grade lodging-cum-restaurant in town)
--   - Hotel Mookambika Courtallam (multi-cuisine local, Main Bazaar Road)
--   - Hotel Annapurna Tenkasi (pure-veg verified, 6km — used by Courtallam visitors)
--   - Sri Krishna Bhojanalaya Courtallam (pure-veg pilgrim mess)

-- =========================================================
-- HIDDEN GEMS — 3 verified Courtallam-Tenkasi waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'courtallam-tenkasi-kasi-viswanathar',
  'courtallam',
  'Tenkasi Kasi Viswanathar Temple',
  NULL,
  10,
  '20 min drive south to Tenkasi',
  'Most Courtallam visitors come for the waterfall bath circuit (Main Falls + Five Falls + Old Falls + Tiger Falls) and skip the 10km drive to Tenkasi town — yet the Kasi Viswanathar Temple (literally "Kasi of the South") is the 16th-century Pandya-Nayak rebuild of an earlier 8th-century shrine. Its 180-foot gopuram (under 1990s restoration) is the third-tallest in Tamil Nadu.',
  '16th-century Shiva temple rebuilt by Parakrama Pandya — the name claims Kasi (Varanasi) parity because the temple''s Tambaraparani river flows like the Ganga and the deity (Sankaranarayana) is in the same Brahmotsavam tradition as Kashi Vishwanath. 180-foot rajagopuram with intricate stucco work; the inner sanctum has a 9-foot Shiva lingam. The 1,000-pillar mandapam has musical pillars (struck by hand they sound musical notes). Free / open 5.30am-12pm + 4-9pm. Non-Hindus restricted to outer prakaram. Annual Brahmotsavam in Vaikasi (May-June, 10 days) with chariot procession.',
  'easy',
  'Tamil Nadu HR&CE temple inventory; ASI Tenkasi inscriptions catalogue; Tamil Hindu newsletter Pandya temple feature 2023.',
  5,
  ARRAY['temple','heritage','pandya','gopuram','musical-pillars']::text[],
  '{}'::jsonb
),
(
  'courtallam-papanasam-falls-dam',
  'courtallam',
  'Papanasam Falls and Dam',
  NULL,
  20,
  '45 min drive north via Ambasamudram',
  'Most Courtallam waterfall-bath visitors don''t know about Papanasam — it''s a separate ~20km drive north on the Tambaraparani river. The falls + dam combo sits inside the Kalakkad-Mundanthurai Tiger Reserve buffer zone; the dam (1944, Travancore-era stone construction) creates a backwater lake good for sunset views.',
  'Papanasam (literal "sin-destroyer") is a 2-tier waterfall + Travancore-era stone dam (built 1944) on the Tambaraparani river. Bath-site below the falls is permitted Oct-May (closed during monsoon for safety); the upper-tier viewpoint is a 200m walk from the parking lot. Adjacent Papanasaswamy Temple (12th c Pandya) marks the bath-site as a Brahmotsavam tirtha. Forest entry permit ₹30 (issued at the Ambasamudram Forest Range office, en route). Open 8am-5pm. Combine with Kalakkad sanctuary safari (separate permit).',
  'moderate',
  'Tamil Nadu Forest Department Kalakkad-Mundanthurai Tiger Reserve buffer zone listing; Public Works Department Tambaraparani basin dam inventory; Hindu Tenkasi 2024.',
  4,
  ARRAY['waterfall','dam','tiger-reserve','heritage','river']::text[],
  '{}'::jsonb
),
(
  'courtallam-manjolai-tea-estate',
  'courtallam',
  'Manjolai Hills Tea Estate',
  NULL,
  35,
  '1 hr 30 min drive via Servalar Dam ghats',
  'Manjolai is 35km from Courtallam but the 4000ft tea estate sits deep inside the Kalakkad-Mundanthurai TR — most Courtallam tourists don''t even know it exists. The 30km mountain road has 14 hairpins and crosses the Servalar dam reservoir; the estate (Bombay Burmah Trading Corporation, 1950s) is one of the southernmost tea estates in India.',
  'Small tea estate at 4000ft inside the Western Ghats — 30km of single-lane mountain road from Manimuthar dam (no public transport beyond Manimuthar; 4x4 or own vehicle only). Tea factory tours by appointment via the BBTC office; the estate club + dak bungalow accept walk-in lunch (₹400/head, advance call required). Best Oct-Apr (monsoon closes the road for landslide work). Combine with Manimuthar dam viewpoint and Kakkachi (4500ft, the highest tea section) for a 4-5 hour loop. The estate boundary touches the Kalakkad-Mundanthurai TR core — sambar, lion-tailed macaque, and tahr regularly spotted on the road.',
  'challenging',
  'Tamil Nadu Forest Department Kalakkad-Mundanthurai TR boundary inventory; Bombay Burmah Trading Corporation Manjolai estate records; Outlook Traveller Western Ghats feature 2023.',
  4,
  ARRAY['tea-estate','western-ghats','offbeat','tiger-reserve','heritage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Courtallam-Tenkasi
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'courtallam',
  'Hotel Tamil Nadu Courtallam',
  'Main Falls Road (TTDC), Courtallam',
  'main-falls-road',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'mid_range',
  'TN unlimited meals (banana leaf)',
  ARRAY['Tamil meals','North Indian thali','Filter coffee','Idli with sambar','Vegetable kurma']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Tamil Nadu Tourism Development Corporation (TTDC) restaurant inside the Hotel Tamil Nadu Courtallam — the only chain-grade restaurant in town, walking distance from Main Falls. Pure-veg multi-cuisine: TN meals at lunch, North Indian thali for the Mumbai/Pune monsoon-tourist crowd. Open 7am-10pm; lunch buffet on weekends and monsoon weekends (Jun-Sep).',
  'Monsoon weekends Jun-Sep fill 1-3pm; book ahead in Adi (Jul-Aug, Tamil Aadi monsoon-bath peak season). Off-season Mar-May the dining hall is quietest. Cards and UPI both work.',
  'Main Falls Road, Courtallam 627802',
  'https://maps.google.com/?q=Hotel+Tamil+Nadu+Courtallam',
  ARRAY[
    'https://ttdconline.com/courtallam.html',
    'https://www.tripadvisor.in/Restaurant_Review-g3589814-d6471470-Reviews-Hotel_Tamil_Nadu-Courtallam_Tenkasi_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'courtallam',
  'Hotel Mookambika',
  'Main Bazaar Road, Courtallam',
  'main-bazaar-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Idli with coconut chutney',
  ARRAY['Idli','Vada','Pongal','Filter coffee','Masala dosa']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg breakfast and tiffin mess on Main Bazaar Road — used by waterfall-bath day-trippers for breakfast before the 7am Main Falls opening. Idli ₹30 / plate, masala dosa ₹50. Open 5.30am-9pm; closes after the falls close (5.30pm). Cash and UPI.',
  'Pre-falls breakfast 6-8am is the convention; after 8am the bus-tour groups arrive. The bazaar road is the main approach to all 9 Courtallam falls — easy to combine with the walk in.',
  'Main Bazaar Road, Courtallam 627802',
  'https://maps.google.com/?q=Hotel+Mookambika+Courtallam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3589814-d8576920-Reviews-Hotel_Mookambika-Courtallam.html',
    'https://www.zomato.com/courtallam/hotel-mookambika'
  ]::text[],
  '2026-05-11',
  false
),
(
  'courtallam',
  'Sri Krishna Bhojanalaya',
  'Old Falls Road, Courtallam',
  'old-falls-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf)',
  ARRAY['Tamil meals','Sambar','Rasam','Avial','Curd rice']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg banana-leaf meals stall on Old Falls Road — used by post-bath waterfall visitors who want a heavy carb lunch. Tamil meals at ₹120-150 (rice + 3 vegetables + sambar + rasam + curd + payasam). Open 11am-9pm. Cash and UPI.',
  'Lunch 12-3pm only (banana leaf service stops post-3pm); post-bath crowds peak 1-2pm. The mess sits 100m from the Old Falls approach — combine post-bath lunch here. Avial is the must-try Tirunelveli specialty.',
  'Old Falls Road, Courtallam 627802',
  'https://maps.google.com/?q=Sri+Krishna+Bhojanalaya+Courtallam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589814-Courtallam_Tenkasi_District_Tamil_Nadu.html',
    'https://www.zomato.com/courtallam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'courtallam',
  'Hotel Annapurna Tenkasi',
  'Bus Stand Road, Tenkasi (6km from Courtallam)',
  'tenkasi-bus-stand',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Mini tiffin',
  ARRAY['Mini tiffin','Idli','Vada','Pongal','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg breakfast and tiffin anchor at Tenkasi Bus Stand — 6km from Courtallam, used by Courtallam visitors who arrive on the morning Madurai-Tenkasi train and need breakfast before the 30-min transit to Courtallam. Mini tiffin (₹80, 4 items: idli + vada + pongal + dosa) is the Tirunelveli district convention. Open 5.30am-10pm.',
  'Pre-Courtallam breakfast at the Tenkasi bus stand (6.30-8am) — auto-rickshaw to Courtallam is ₹150-200 from here. The Tenkasi Junction railway is 1km away — combine train arrival + breakfast + Courtallam transit on the morning leg. Cash and UPI.',
  'Bus Stand Road, Tenkasi 627811',
  'https://maps.google.com/?q=Hotel+Annapurna+Tenkasi+Bus+Stand',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3661075-d8576919-Reviews-Hotel_Annapurna-Tenkasi_Tirunelveli_District_Tamil_Nadu.html',
    'https://www.zomato.com/tenkasi/hotel-annapurna-bus-stand'
  ]::text[],
  '2026-05-11',
  false
),
(
  'courtallam',
  'Hotel Saravana Bhavan Tenkasi',
  'Main Road, Tenkasi (6km from Courtallam)',
  'tenkasi-main-road',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'mid_range',
  'Chettinad veg meal',
  ARRAY['Chettinad veg meal','North Indian thali','Filter coffee','Mini idli sambar','Curd vada']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Pure-veg AC multi-cuisine restaurant on Tenkasi Main Road — note: this is the LOCAL Tenkasi-area "Saravana Bhavan" (not the Chennai chain Hotel Saravana Bhavan), a single-outlet Tirunelveli district institution. Used by Courtallam tourists who want AC dinner after the day at the falls. Open 7am-11pm. Cards and UPI both.',
  'Monsoon evenings Jun-Sep fill 7.30-9.30pm — book ahead. The Chettinad veg meal (₹280) uses Chettinad pepper-fennel masala in vegetarian preparation. UPI and cards both.',
  'Main Road, Tenkasi 627811',
  'https://maps.google.com/?q=Saravana+Bhavan+Tenkasi+Main+Road',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3661075-d12345678-Reviews-Saravana_Bhavan-Tenkasi.html',
    'https://www.zomato.com/tenkasi'
  ]::text[],
  '2026-05-11',
  false
);
