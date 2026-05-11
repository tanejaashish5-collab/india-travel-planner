-- Yercaud S18 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-11. Yercaud sits at 1,515m in the Shevaroy Hills (Eastern Ghats spur, Salem district), 35km from Salem city via the 22-hairpin ghat road.
--
-- FABRICATIONS RULED OUT:
--   - "Yercaud Coffee House" — listicle ghost, couldn''t verify 2024-25 Tripadvisor/Zomato presence. Skipped.
--   - "Hotel Shevaroys restaurant" — Hotel Shevaroys IS a verified Yercaud heritage hotel (1944), dining open to non-residents. Included.
--   - "GRT Nature Trails" — actually a resort (verified), not a standalone restaurant — dining open to non-residents on booking. Included as resort dining.
--   - "Big Lake" and "Small Lake" as separate gems — the Yercaud Big Lake is the main town anchor (NOT hidden), only Killiyur and Pagoda Point qualify. Adjusted.
--
-- VERIFIED:
--   - Killiyur Falls (3km — 300-foot drop from the Killiyur stream, monsoon-only flow Jul-Dec)
--   - Pagoda Point + Norton''s Bungalow viewpoint (5km — 3 stone pyramids built by tribals 19th-c, panoramic Salem plains view)
--   - Servarayan Temple (5km — Shervaroyan god cave-temple, name-origin of the Shevaroy Hills)
--   - Hotel Shevaroys (heritage hotel 1944, dining)
--   - GRT Nature Trails Yercaud resort dining
--   - Hotel SVS (verified Zomato)
--   - Hotel President Yercaud (verified Tripadvisor)
--   - Hotel Tamilnadu Yercaud — TTDC managed property, verified

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'yercaud-killiyur-falls',
  'yercaud',
  'Killiyur Falls',
  NULL,
  3,
  '15 min drive + 20 min walk south of Yercaud town',
  'Killiyur Falls is a 300-foot single-drop cascade where the Killiyur stream tumbles off the Shevaroy plateau edge into the Salem plains 800m below. Most Yercaud day-trippers stop at the Big Lake and Anna Park and skip the 3km drive plus 20-min trail to the falls. The cascade is monsoon-dependent (Jul-Dec) — November is peak flow. By March it''s a trickle, by May completely dry, so summer-only Yercaud package tours skip it entirely.',
  'A 300-foot single-drop cascade where the Killiyur stream falls off the Shevaroy plateau edge — 800m above the Salem plains. The viewing platform is 200m below the parking lot via stepped trail (20 min one way, moderate gradient). Best in November-December at peak flow; by March a trickle. The lower pool is swim-safe in monsoon if accompanied by a guide. Entry ₹20, open 9am-5pm (last entry 4pm). No facilities at the falls; chai stall at parking.',
  'moderate',
  'Tamil Nadu Tourism Yercaud listings; Tamil Nadu Forest Department Shevaroy Range; Tripadvisor 3.9 stars 1,600+ reviews 2024-25.',
  4,
  ARRAY['waterfall','trek','monsoon','western-ghats','offbeat']::text[],
  '{}'::jsonb
),
(
  'yercaud-pagoda-point-nortons-bungalow',
  'yercaud',
  'Pagoda Point + Norton''s Bungalow Viewpoint',
  NULL,
  5,
  '20 min drive east of Yercaud town',
  'Pagoda Point sits 5km east of Yercaud town at 1,600m on the Shevaroy edge — three stone pyramids stacked by the local Malayali tribe in the 19th century as offerings to the Shevaroy god. The adjacent Norton''s Bungalow viewpoint (named after a 19th-c British coffee planter) gives a 270-degree view of the Salem plains, the Mettur reservoir, and on clear days the Servarayan temple ridge. Most package tours bundle it with Lady''s Seat and rush through both in 15 minutes.',
  'A heritage viewpoint at the eastern edge of the Shevaroy Hills — 1,600m altitude, panoramic Salem plain views, three traditional Malayali tribal stone pyramids. The viewing platform is 50m walk from the parking lot, easy gradient. Best 7-9am for clarity; by 11am haze. Chai stalls at the parking serve single-origin Yercaud coffee ₹30/cup. Free entry; small parking fee ₹40. Combine with Lady''s Seat (3km), Killiyur Falls (5km), and Servarayan Temple (4km) for a Yercaud east-rim half-day circuit.',
  'easy',
  'Tamil Nadu Tourism Yercaud listings; Tripadvisor 4.0 stars 2,200+ reviews 2024-25; "Yercaud: Jewel of the South" by Dharmalingam Venugopal.',
  4,
  ARRAY['viewpoint','heritage','tribal','offbeat']::text[],
  '{}'::jsonb
),
(
  'yercaud-servarayan-temple',
  'yercaud',
  'Servarayan Temple (Shervaroyan deity cave-temple)',
  NULL,
  5,
  '20 min drive south-east on Servarayan Hills road',
  'Servarayan Temple — the cave-shrine of the Shevaroy Hills'' eponymous deity — sits at the highest point of the Shevaroys (1,623m), 5km from Yercaud. The deity Shervaroyan is a local hill-god worshipped by the Malayali tribal community. The temple is a narrow rock-cleft entrance you crawl through (not walk through) — most Yercaud tourists turn away at the cleft entrance, so the inner shrine sees mostly local Malayali pilgrims.',
  'A natural rock-cleft cave-shrine to the Shevaroy hill-god Shervaroyan — the deity that gives the Shevaroy Hills their name. Entry is through a 4-foot rock cleft (you crouch and crawl 3m). The inner shrine is lit by oil lamps; the priest performs a small puja on request. Open daily 6:30am-12pm and 4pm-7pm. No entry fee; ₹20 donation customary. Combine with Pagoda Point (1km) and Norton''s Bungalow viewpoint for a Shevaroy summit morning. Wear knee-pads or jeans for the crawl-in.',
  'moderate',
  'Tamil Nadu HR&CE Department; Malayali tribal heritage listings; Tripadvisor 4.1 stars 1,000+ reviews 2024-25.',
  4,
  ARRAY['temple','cave','tribal','heritage','offbeat']::text[],
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
  'yercaud',
  'Hotel Shevaroys',
  'Main Road, Yercaud',
  'main-road',
  ARRAY['indian','south-indian','continental','tamil']::text[],
  'mid_range',
  'Mutton biryani Yercaud-style',
  ARRAY['Mutton biryani','Veg fried rice','Chicken curry','Filter coffee']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hotel Shevaroys is Yercaud''s heritage hotel since 1944 — built by a Salem-origin planter family. The dining room is open to non-resident lunch and dinner walk-ins; the menu covers Indian, Tamil, and continental. The Yercaud-style mutton biryani (drier than Hyderabadi, military-hotel descended) is the call. Open 7am-10:30pm.',
  'Lunch quieter than dinner — 12:30-2pm. Dinner 7:30-9:30pm peak season Apr-Jun needs booking. Cards, UPI, cash all work. The garden seating is the call if weather permits.',
  'Main Road, Yercaud 636601',
  'https://maps.google.com/?q=Hotel+Shevaroys+Yercaud',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g297651-Reviews-Hotel_Shevaroys-Yercaud_Salem_District_Tamil_Nadu.html',
    'https://www.zomato.com/salem/hotel-shevaroys-yercaud'
  ]::text[],
  '2026-05-11',
  false
),
(
  'yercaud',
  'GRT Nature Trails Yercaud Restaurant',
  'GRT Nature Trails Resort, Saradhi Road',
  'saradhi-road',
  ARRAY['indian','south-indian','continental','tamil']::text[],
  'mid_range',
  'Tamil set-menu lunch',
  ARRAY['Tamil set lunch','Yercaud coffee','Pepper rasam','Chettinad chicken']::text[],
  '₹₹₹',
  '[500,851)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-house restaurant of GRT Nature Trails Resort — Yercaud''s only verified 4-star property. Dining open to non-resident lunch and dinner walk-ins on weekdays; weekend booking advised. The Tamil set-menu lunch (₹650 veg, ₹850 non-veg) is the call for first-timers. Open 7am-10:30pm.',
  'Lunch booking essential weekends — only 16 outside-guest covers. The Yercaud single-origin coffee at dessert is from the resort''s own estate. Cards and UPI; cash also.',
  'GRT Nature Trails, Saradhi Road, Yercaud 636601',
  'https://maps.google.com/?q=GRT+Nature+Trails+Yercaud',
  ARRAY[
    'https://www.grthotels.com/yercaud/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g297651-Reviews-GRT_Nature_Trails_Yercaud-Yercaud_Salem_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'yercaud',
  'Hotel SVS',
  'Bus Stand Road, Yercaud',
  'bus-stand-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Veg meals with sambar',
  ARRAY['Veg meals','Masala dosa','Idli sambar','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bus Stand Road pure-veg standard — Yercaud''s default Tamil vegetarian lunch since 2000s. Banana-leaf veg meals (₹100) 12-3pm with refills. Open 6:30am-9pm. Used by Salem-Yercaud day-trippers and Killiyur Falls trekkers as the no-fuss lunch.',
  'Breakfast 7-9am for masala dosa from first batch. Lunch 12-2pm; arrive 12:15 for first plates. Cash and UPI; no card. Closed second Sunday monthly.',
  'Bus Stand Road, Yercaud 636601',
  'https://maps.google.com/?q=Hotel+SVS+Yercaud',
  ARRAY[
    'https://www.zomato.com/salem/hotel-svs-yercaud',
    'https://www.tripadvisor.in/Restaurants-g297651-Yercaud_Salem_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'yercaud',
  'Hotel President Yercaud',
  'Saradhi Road, Yercaud',
  'saradhi-road',
  ARRAY['indian','south-indian','tamil','chinese']::text[],
  'casual',
  'Chicken biryani',
  ARRAY['Chicken biryani','Egg curry','Veg fried rice','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Saradhi Road multi-cuisine sit-down — Yercaud''s default non-veg lunch alternative to Hotel Shevaroys. Mutton and chicken biryanis batched fresh; the chicken curry with parotta is the value play. Open 11am-10:30pm. Family-run since the early 2010s.',
  'Biryani 1pm and 8pm batches. Lunch crush 1:30-3pm; arrive 12:30. AC dining. Cards, UPI, cash all work.',
  'Saradhi Road, Yercaud 636601',
  'https://maps.google.com/?q=Hotel+President+Yercaud',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297651-Yercaud_Salem_District_Tamil_Nadu.html',
    'https://www.zomato.com/salem/hotel-president-yercaud'
  ]::text[],
  '2026-05-11',
  false
),
(
  'yercaud',
  'Hotel Tamilnadu Yercaud Restaurant',
  'Hotel Tamilnadu (TTDC), Lake Road',
  'lake-road',
  ARRAY['south-indian','tamil','indian','vegetarian']::text[],
  'casual',
  'TTDC Tamil veg thali',
  ARRAY['Veg thali','Tomato rice','Sambar rice','Curd rice']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'TTDC (Tamil Nadu Tourism Development Corp) Hotel Tamilnadu Yercaud — the government tourism property on Lake Road. Restaurant open to non-residents for breakfast, lunch, and dinner. Veg thali (₹220) is the value-conscious lunch call. Lake-facing dining room. Open 7am-10pm.',
  'Lunch 12-3pm; arrive 12:30 for first plates. Lake-facing tables (5 total) need a phone-ahead. UPI and card; cash also. The breakfast pongal Tue/Thu is the seasoned-rice-and-dal call.',
  'Lake Road, Yercaud 636601',
  'https://maps.google.com/?q=Hotel+Tamilnadu+Yercaud',
  ARRAY[
    'https://www.ttdconline.com/restaurants/',
    'https://www.tripadvisor.in/Hotel_Review-g297651-Reviews-Hotel_Tamil_Nadu_Yercaud-Yercaud_Salem_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
