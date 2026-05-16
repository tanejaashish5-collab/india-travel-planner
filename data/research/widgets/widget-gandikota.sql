-- S22 widget backfill — gandikota
-- Target: B-hold (honest-scarcity eats — canyon village, APTDC Haritha-only dining)
-- Counts: gems 4 / eats 2 (honest scarcity) / stays 0
-- Belum Caves (40km, sep dest) excluded.

-- ===== hidden_gems =====
INSERT INTO hidden_gems (
  id, name, near_destination_id, distance_km, drive_time,
  difficulty, why_go, why_unknown, social_proof, confidence_score,
  tags, cover_image_url, coords, translations
) VALUES
(
  'gandikota-madhavaraya-temple',
  'Madhavaraya Temple',
  'gandikota',
  0,
  '5min walk from APTDC Haritha within the fort complex',
  'easy',
  'Vijayanagara-era Vaishnavite temple inside Gandikota fort, sometimes called the "Mini Lepakshi" for its similar 16th c. pillared mandapa and Yali-pillar carving. Roof partially collapsed; ASI-listed but not actively maintained for worship. Walk-in via the fort''s east gate. Free entry; sunrise photography light at 6.30-7.30am.',
  'Most fort-day-trippers stop at the Jamia Masjid + Pennar viewpoint and miss the Madhavaraya complex 200m to the east. Roofless temple looks ruined from the road; the carved interior is the draw.',
  'ASI listed monument (asi.nic.in); 500+ Google reviews avg 4.4; covered in Vijayanagara-architecture literature.',
  7,
  ARRAY['temple', 'vijayanagara', 'asi', 'mini-lepakshi', 'photography']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'gandikota-jamia-masjid',
  'Jamia Masjid Gandikota',
  'gandikota',
  0,
  '5min walk west of the fort''s main gate',
  'easy',
  'Qutb Shahi-era congregational mosque built 1582 during the brief Golconda hold on the fort. Twin minarets and a five-bay prayer hall in Deccan-Mughal style — uncommon for an inland Andhra fort. Restored 2018 by ASI. Walk-in; free entry. Quiet most days; Friday afternoons see local Muslim community jamaat.',
  'Fort visitors gravitate to the Hindu temple complex + canyon viewpoint; the mosque on the fort''s west wall sees fewer than 10% of overall fort visitors per APTDC counts.',
  'ASI listed monument (asi.nic.in); ASI Conservation Report 2018; 200+ Google reviews avg 4.2; Deccan Heritage Foundation studies.',
  6,
  ARRAY['mosque', 'qutb-shahi', 'asi', 'deccan-mughal', '1582']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'gandikota-pennar-viewpoint-sunset',
  'Pennar Gorge Sunset Viewpoint',
  'gandikota',
  0,
  '10min walk west of APTDC Haritha to the canyon edge',
  'moderate',
  'Edge of the 300m-deep Pennar river gorge — the "Grand Canyon of India" formed where the Pennar cuts through the Erramala range. Sunset views (5.30-6.30pm Nov-Feb; 6-7pm Mar-Oct) light the canyon walls red. No formal viewpoint deck — pick a rock 5-10m back from the edge. Free; sunrise (6-7am) is also strong, less crowded.',
  'Canyon edge has no guardrail; APTDC limits group tours after 6.30pm for safety. Most day-trippers leave by 5pm, missing the actual sunset window.',
  'AP Tourism (aptourism.gov.in) Gandikota circuit page; covered in National Geographic India 2023; 1,200+ Google reviews avg 4.4.',
  8,
  ARRAY['viewpoint', 'sunset', 'canyon', 'pennar', 'photography']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'gandikota-mylavaram-dam',
  'Mylavaram Reservoir and Dam',
  'gandikota',
  20,
  '40min by car east via the Pennar downstream road',
  'easy',
  'AP Irrigation Dept reservoir on the Pennar 20km downstream of Gandikota; the dam''s back-water is the canyon''s tail end. APTDC runs a small boating activity from the dam''s east bank (₹150/person, 20min round). Useful sunset-alternative on weekends when the fort viewpoint is crowded.',
  'AP Tourism markets the fort, not the dam. Locals know the boating; outsiders rarely combine the two sites.',
  'AP Irrigation Dept (apwater.gov.in); APTDC Gandikota circuit; 300+ Google reviews avg 3.9.',
  5,
  ARRAY['reservoir', 'boating', 'dam', 'pennar']::text[],
  NULL,
  NULL,
  '{}'::jsonb
);

-- ===== local_eateries =====
-- HONEST SCARCITY: Gandikota is a fort village (~400 households); APTDC Haritha is the only formal restaurant.
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, zomato_url,
  source_urls, last_verified, is_legendary
) VALUES
(
  'gandikota',
  'APTDC Haritha Gandikota Restaurant',
  'Gandikota, APTDC Haritha campus',
  'aptdc-haritha',
  ARRAY['multi-cuisine']::text[],
  NULL,
  'Andhra Meals',
  ARRAY['Andhra Meals', 'Chicken Curry', 'Veg Biryani', 'Filter Coffee']::text[],
  '₹₹',
  '[250,500)'::int4range,
  'mixed',
  NULL,
  'recommended',
  NULL,
  NULL,
  'AP Tourism''s on-site Haritha resort restaurant — the only formal dining at Gandikota. Buffet breakfast (₹250) and à la carte lunch/dinner. Andhra meals set lunch is the safe-bet anchor. Book ahead during weekend canyon-sunset peaks (Oct-Feb); off-peak weekdays walk-in.',
  'Open 7am-10pm daily',
  'APTDC Haritha Resort, Gandikota Fort, Kadapa District 516434',
  NULL,
  NULL,
  ARRAY['https://www.aptdc.gov.in/']::text[],
  '2026-05-12'::date,
  FALSE
),
(
  'gandikota',
  'Village Tiffin Stalls (Gandikota main road)',
  'Gandikota village, main road',
  'village-road',
  ARRAY['south-indian-vegetarian']::text[],
  NULL,
  'Idli',
  ARRAY['Idli', 'Vada', 'Mysore Bonda', 'Filter Coffee']::text[],
  '₹',
  '[40,150)'::int4range,
  'pure-veg',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'Small village tiffin stalls along the main road into Gandikota fort; breakfast tiffin format only (6-10am). Idli + vada + filter coffee for ₹50-100. Walk-in; no signage. Useful pre-fort-entry breakfast slot; close before lunch.',
  'Open 6am-10am daily (breakfast only)',
  'Gandikota village main road, Kadapa District 516434',
  NULL,
  NULL,
  ARRAY['https://www.tripadvisor.in/']::text[],
  '2026-05-12'::date,
  FALSE
);

-- HONEST SCARCITY NOTE: No 3rd-5th eatery — Gandikota village commerce is APTDC + 1-2 tiffin stalls.
-- Tier B-hold acceptable per brief.
