-- S22 widget backfill — ahobilam
-- Target: B-hold (honest-scarcity eats — forest gorge, pilgrim village, 9-Narasimha cluster)
-- Counts: gems 4 / eats 2 (honest scarcity) / stays 0
-- Mantralayam (160km) excluded per brief.

-- ===== hidden_gems =====
INSERT INTO hidden_gems (
  id, name, near_destination_id, distance_km, drive_time,
  difficulty, why_go, why_unknown, social_proof, confidence_score,
  tags, cover_image_url, coords, translations
) VALUES
(
  'ahobilam-upper-lakshmi-narasimha-trek',
  'Upper Ahobilam — Lakshmi Narasimha Trek',
  'ahobilam',
  8,
  '30min by jeep + 90-120min trek up the Nallamala forest',
  'hard',
  'Trek from Lower Ahobilam temple complex up the Nallamala forest gorge to Upper Ahobilam, where the original Lakshmi Narasimha cave-shrine sits beside the Bhavanasini stream. ~5km one-way, steep rocky ascent past Krodakara and Yogananda Narasimha sub-shrines. Forest dept jeeps run from Lower temple gate (₹400/person shared). Trek closed mid-Jul to mid-Sep monsoon (slippery rocks, sloth bear movement). Carry water; no shops past the parking.',
  'Forest-gorge trek deters package tours. Most Lower-Ahobilam darshan groups skip Upper Ahobilam entirely. Jeep + trek combo also drops elderly pilgrims out of the cohort.',
  'AP Forest Dept Nallamala range listing; Ahobila Mutt official site (ahobilamutt.org); Tripadvisor 100+ reviews avg 4.3.',
  8,
  ARRAY['trek', 'temple', 'forest', 'narasimha', 'nallamala', 'monsoon-closed']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'ahobilam-bhargava-narasimha',
  'Bhargava Narasimha Shrine',
  'ahobilam',
  2,
  '15min trek from Lower Ahobilam temple',
  'moderate',
  'One of the nine Narasimha shrines in the Ahobilam cluster; the cave-shrine where the sage Bhargava (Parashurama''s lineage) is said to have worshipped Narasimha. 2km trail from Lower Ahobilam past the Bhargava-Tirtha tank. Easier than the Upper Ahobilam trek but still steep at the final approach. Open 6am-12noon and 4-7pm.',
  'Inside the 9-Narasimha pilgrim circuit but typically visited only by Sri Vaishnava-tradition pilgrims doing the full Navanarasimha sequence. Standard tour packages stop at Lower Ahobilam.',
  'Ahobila Mutt official site (ahobilamutt.org); listed in the Navanarasimha Mahatmyam Telugu pamphlet; 80+ Google reviews avg 4.5.',
  6,
  ARRAY['temple', 'narasimha', 'navanarasimha', 'trek']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'ahobilam-karanja-narasimha',
  'Karanja Narasimha Shrine',
  'ahobilam',
  1,
  '10min walk on the road between Lower and Upper Ahobilam',
  'easy',
  'The most accessible of the nine Narasimha shrines — roadside cave-shrine where Narasimha is depicted with a Karanja (Pongamia) tree behind him. 1km from Lower Ahobilam parking; flat walk. Open 6am-7pm; on the main jeep route to Upper Ahobilam so combine with that day. Free entry.',
  'Roadside shrine often overlooked in the rush to the jeep stand for Upper Ahobilam. Sequence-conscious pilgrims include it; package-tour visitors usually pass it without stopping.',
  'Ahobila Mutt circuit map (ahobilamutt.org); AP Endowments Dept listing; 150+ Google reviews avg 4.4.',
  5,
  ARRAY['temple', 'narasimha', 'easy-access', 'navanarasimha']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'ahobilam-bhavanasini-stream',
  'Bhavanasini Stream and Falls',
  'ahobilam',
  9,
  'On the Upper Ahobilam trek, 200m past the main shrine',
  'hard',
  'The perennial mountain stream that flows past Upper Ahobilam''s cave-shrine, cascading over a series of small falls into the gorge. Pilgrim bathing tradition before darshan. Reached only on the Upper Ahobilam jeep + trek; closed monsoon Jul-Sep. Cold water year-round; rocks slippery in any season — use the rope-anchored bathing platform built by the temple trust.',
  'Tied to the Upper Ahobilam trek, so already filtered by the same monsoon-closure and physical-fitness gate. The stream is a side-stop pilgrims often miss in the rush to darshan.',
  'Ahobila Mutt site references Bhavanasini in the Upper Ahobilam pilgrim guide; AP Tourism Nallamala circuit listing; Tripadvisor mentions on Upper-Ahobilam-trek pages.',
  6,
  ARRAY['stream', 'sacred-water', 'trek', 'nallamala', 'monsoon-closed']::text[],
  NULL,
  NULL,
  '{}'::jsonb
);

-- ===== local_eateries =====
-- HONEST SCARCITY: Ahobilam = forest gorge, ~500 households, Ahobila Mutt + 1 APTDC base. No commercial restaurants.
-- 2 verifiable: Mutt annadanam + APTDC Haritha canteen.
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, zomato_url,
  source_urls, last_verified, is_legendary
) VALUES
(
  'ahobilam',
  'Ahobila Mutt Annadanam',
  'Lower Ahobilam, mutt complex',
  'mutt-complex',
  ARRAY['south-indian-vegetarian']::text[],
  NULL,
  'Free Annadanam Meals',
  ARRAY['Free Annadanam Meals', 'Sambar Rice', 'Curd Rice', 'Pulihora']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'Sri Ahobila Mutt''s pilgrim meal hall; sit-down banana-leaf service at lunch and dinner for pilgrims registered at the mutt. Walk-in for non-residents subject to availability — coordinate at mutt office. Pulihora (tamarind rice) usually on the rotation. Mutt is a 600-year-old Sri Vaishnava monastic lineage; meals follow the standard Vaikhanasa-tradition pilgrim format.',
  'Open 11.30am-2pm and 7-9pm daily',
  'Sri Ahobila Mutt, Lower Ahobilam, Allagadda Mandal, Nandyal District 518543',
  NULL,
  NULL,
  ARRAY['https://www.ahobilamutt.org/']::text[],
  '2026-05-12'::date,
  TRUE
),
(
  'ahobilam',
  'APTDC Haritha Ahobilam Canteen',
  'Lower Ahobilam, APTDC Haritha hotel campus',
  'aptdc-haritha',
  ARRAY['south-indian-vegetarian']::text[],
  NULL,
  'Andhra Meals',
  ARRAY['Andhra Meals', 'Dosa', 'Idli', 'Filter Coffee']::text[],
  '₹₹',
  '[250,450)'::int4range,
  'pure-veg',
  NULL,
  'recommended',
  NULL,
  NULL,
  'AP Tourism''s on-site canteen at the Haritha resort; the only AC dining option in the village. Limited menu — Andhra meals at lunch (₹250) and à la carte snack-tiffin format otherwise. Useful pre-jeep stop before the Upper Ahobilam trek. Book lunch ahead during weekend pilgrim peaks.',
  'Open 7am-10pm daily',
  'APTDC Haritha Hotel, Lower Ahobilam, Nandyal District 518543',
  NULL,
  NULL,
  ARRAY['https://www.aptdc.gov.in/']::text[],
  '2026-05-12'::date,
  FALSE
);

-- HONEST SCARCITY NOTE: No 3rd-5th eatery added — Ahobilam has no commercial restaurants beyond the Mutt and APTDC.
-- Tier B-hold acceptable per brief; flipping to A would require fabrication.
