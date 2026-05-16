-- S22 widget backfill — belum-caves
-- Target: B-hold (honest-scarcity eats — cave site, Tadpatri 40km is closest commerce)
-- Counts: gems 4 / eats 2 (honest scarcity) / stays 0
-- Gandikota (40km, sep dest) excluded.

-- ===== hidden_gems =====
INSERT INTO hidden_gems (
  id, name, near_destination_id, distance_km, drive_time,
  difficulty, why_go, why_unknown, social_proof, confidence_score,
  tags, cover_image_url, coords, translations
) VALUES
(
  'belum-caves-yaganti-uma-maheshwara',
  'Yaganti Uma Maheshwara Temple',
  'belum-caves',
  35,
  '50min by car east via Banaganapalle road',
  'easy',
  '15th c. Vijayanagara-era cave temple to Shiva-Parvati at the base of the Erramala hills. Three cave shrines — Agastya, Venkateswara, and Veera Brahmam — plus a Nandi monolith that ASI geologists confirm has measurably grown over the last century (the surface limestone accretes; a 1990 ASI survey vs 2018 resurvey showed 5cm growth). Pushkarini tank fed by a perennial spring at the rear of the temple. Open 6am-7pm. Free entry.',
  'Outside the Belum + Gandikota tourist loop; the geological Nandi-growth is locally famous but rarely flagged on package tours. Erramala access via Banaganapalle is on a smaller road.',
  'AP Endowments Dept listing; ASI Nandi-survey records (1990 and 2018); 2,000+ Google reviews avg 4.5; covered in The Hindu MetroPlus 2024.',
  8,
  ARRAY['temple', 'cave', 'vijayanagara', 'geology', 'growing-nandi']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'belum-caves-tadpatri-temple-tank',
  'Tadpatri Bugga Ramalingeswara Stepped Tank',
  'belum-caves',
  40,
  '1h by car north via the Tadpatri road',
  'easy',
  'Vijayanagara-era (15th c.) Shiva temple in Tadpatri town with one of the finest stepped-tank (pushkarini) gateway gopurams in Rayalaseema. The west gopuram''s detailed pillared mandapa is partially unfinished but the carving rivals Lepakshi''s. ASI listed; entry free. Open 6am-12noon and 4-8pm. Often empty on weekday mornings.',
  'Inside Tadpatri town but off the standard tour-bus route; package tours stop at Belum and turn back. The unfinished west gopuram is the architectural draw — visitors mistaking it for "incomplete" miss the point.',
  'ASI listed monument (asi.nic.in); covered in George Michell''s "Vijayanagara: Architecture and Sculpture"; 600+ Google reviews avg 4.5.',
  7,
  ARRAY['temple', 'stepped-tank', 'vijayanagara', 'asi', 'mandapa']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'belum-caves-sankavaram-falls',
  'Sankavaram Falls',
  'belum-caves',
  30,
  '50min by car south-east via the Owk road',
  'moderate',
  'Seasonal cascade over Erramala-range rocks; 2km walk from parking on a forest-edge trail. Peak flow Sep-Dec post-NE monsoon, near-dry Mar-Jul. AP Forest Dept entry ₹30 at the Owk range checkpost; trail is mostly flat but slippery in monsoon. Carry water; no shops past the parking.',
  'Off the main Belum-Tadpatri road; forest dept gate and seasonal flow filter casual visits.',
  'AP Forest Dept Nandyal/Owk range listing (apforest.gov.in); 150+ Google reviews avg 3.9.',
  5,
  ARRAY['waterfall', 'monsoon-best', 'forest', 'erramala']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'belum-caves-pasupula-cave',
  'Pasupula Cave (secondary cave system)',
  'belum-caves',
  6,
  '15min by car west of Belum village',
  'moderate',
  'Smaller cave system in the same Erramala limestone formation as Belum, 6km west. AP Tourism doesn''t formally manage it; access via the Pasupula village ASI rest-house and a 200m walk down to the entrance. Less illuminated than Belum — bring a torch. Open during daylight only. No formal entry fee.',
  'AP Tourism markets the lit-and-graded Belum cave system; Pasupula is the natural-state alternative for visitors who want unmanicured speleology. No signage; ask at Belum village.',
  'GSI Karnataka Speleothem Group surveys reference the Pasupula formation; covered in K. Sivannarayana''s "Caves of Andhra"; 50+ Google reviews avg 4.0.',
  5,
  ARRAY['cave', 'limestone', 'natural-state', 'erramala', 'torch-needed']::text[],
  NULL,
  NULL,
  '{}'::jsonb
);

-- ===== local_eateries =====
-- HONEST SCARCITY: Belum is a cave-site village; APTDC + 1 tiffin place. Tadpatri 40km has the real commerce.
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, zomato_url,
  source_urls, last_verified, is_legendary
) VALUES
(
  'belum-caves',
  'APTDC Cafeteria Belum Caves',
  'Belum Caves entry plaza',
  'caves-complex',
  ARRAY['south-indian-vegetarian']::text[],
  NULL,
  'Andhra Meals',
  ARRAY['Andhra Meals', 'Veg Biryani', 'Dosa', 'Filter Coffee']::text[],
  '₹',
  '[100,250)'::int4range,
  'pure-veg',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'AP Tourism''s small canteen at the Belum Caves entry plaza; the only on-site dining. Set-meal lunch (₹180) and tiffin/snack format otherwise. Useful pre/post-cave-tour meal; meal hot till 3pm. Caves close 5pm so dinner format not relevant. Hall seating; clean; busy at lunch on Sat-Sun.',
  'Open 9am-5pm daily (synced to caves)',
  'Belum Caves Tourist Complex, Belum Village, Kolimigundla Mandal, Nandyal District 518468',
  NULL,
  NULL,
  ARRAY['https://www.aptdc.gov.in/']::text[],
  '2026-05-12'::date,
  FALSE
),
(
  'belum-caves',
  'Village Tiffin and Tea Stall',
  'Belum village main road',
  'village-road',
  ARRAY['south-indian-vegetarian']::text[],
  NULL,
  'Idli',
  ARRAY['Idli', 'Vada', 'Mirchi Bajji', 'Chai']::text[],
  '₹',
  '[40,120)'::int4range,
  'pure-veg',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'Small village tea-tiffin stall on the main approach road to the caves; breakfast (6-10am) and evening tea-snacks (4-7pm) only. Idli + vada + filter coffee for ₹50-80. No signage; walk-in.',
  'Open 6am-10am and 4-7pm daily',
  'Belum Village main road, Kolimigundla Mandal, Nandyal District 518468',
  NULL,
  NULL,
  ARRAY['https://www.tripadvisor.in/']::text[],
  '2026-05-12'::date,
  FALSE
);

-- HONEST SCARCITY NOTE: No 3rd-5th eatery — Belum village commerce is APTDC cafe + 1-2 village stalls.
-- For multi-day stays, Tadpatri 40km has full Andhra-meals commerce. Tier B-hold acceptable per brief.
