-- S22 widget backfill — horsley-hills
-- Target: B-hold (honest-scarcity eats — sparse hill station at 1290m, Madanapalle 30km closest commerce)
-- Counts: gems 4 / eats 2 (honest scarcity) / stays 0
-- Bangalore (140km — out of state) and Talakona (Tirupati gem already) excluded.

-- ===== hidden_gems =====
INSERT INTO hidden_gems (
  id, name, near_destination_id, distance_km, drive_time,
  difficulty, why_go, why_unknown, social_proof, confidence_score,
  tags, cover_image_url, coords, translations
) VALUES
(
  'horsley-hills-galibanda-viewpoint',
  'Galibanda Viewpoint',
  'horsley-hills',
  3,
  '10min by car from APTDC Haritha resort',
  'easy',
  'Westernmost edge of the Horsley plateau (1,290m), named for the strong cross-wind ("gali" = wind) that funnels through the gap. Sunset viewpoint over the Madanapalle plains; clear-day visibility 50km+. Free entry; parking near the AP Forest Dept rest house. Best Nov-Feb dry-season afternoons; SW monsoon Jun-Sep often fog-bound.',
  'Off the standard APTDC viewpoint loop (Mallamma temple + sunrise rock); local cab drivers know it but it''s not signposted from the main road.',
  'AP Tourism (aptourism.gov.in) Horsley circuit page; AP Forest Dept Madanapalle range listing; 300+ Google reviews avg 4.1.',
  6,
  ARRAY['viewpoint', 'sunset', 'plateau-edge', 'dry-season-best']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'horsley-hills-mallamma-temple',
  'Mallamma Temple',
  'horsley-hills',
  2,
  '5min by car from APTDC Haritha resort',
  'easy',
  'Small forest-clearing shrine to Mallamma — the village guardian deity for whom Horsley was named "Yenugu Mallamma Konda" before W.D. Horsley''s 1870 British survey rebadged it. Local tradition holds the deity protected travellers crossing the plateau. Annual fair in Sankranti week (mid-Jan). Open dawn-dusk. Free entry.',
  'A short walk off the main road; package tours pass but rarely stop. The local-deity name is the genealogical link to the plateau''s pre-British history.',
  'AP Endowments Dept listing; covered in Madanapalle district gazetteer; 200+ Google reviews avg 4.3.',
  5,
  ARRAY['temple', 'village-deity', 'history', 'sankranti-fair']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'horsley-hills-environment-park',
  'Horsley Environment Park (HEP)',
  'horsley-hills',
  1,
  '5min walk from APTDC Haritha resort',
  'easy',
  'AP Forest Dept-managed 12-acre interpretive forest park with marked tree-trail (eucalyptus + grevillea + silver-oak plantation), butterfly enclosure (small) and a watchtower. Free entry; open 9am-5pm. Useful first-morning walk before driving to viewpoints. Closed Mon.',
  'Open daily but invisible from the main road — entry is behind the Haritha resort. APTDC promotes the resort but downplays the park.',
  'AP Forest Dept listing (apforest.gov.in); 200+ Google reviews avg 3.9.',
  4,
  ARRAY['park', 'forest-dept', 'walking-trail', 'family']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'horsley-hills-madanapalle',
  'Madanapalle Town and Theosophical Society Centre',
  'horsley-hills',
  30,
  '50min by car descending the ghat road',
  'easy',
  'Foothill town where Jiddu Krishnamurti was born (May 1895) and where Rabindranath Tagore composed the English translation of "Jana Gana Mana" while staying at the Besant Theosophical College in 1919. The Krishnamurti Foundation site (Rishi Valley School) is 30km further south. Madanapalle town has a Theosophical Society reading room, the Besant College and Krishnamurti''s birth-house plaque. Half-day excursion from Horsley.',
  'Theosophical / Krishnamurti circuit is academic-pilgrim rather than tourist; package tours skip Madanapalle altogether. Birth-house and Tagore plaque are barely signposted.',
  'Krishnamurti Foundation of India (kfionline.org); Rishi Valley School site (rishivalley.org); Besant Theosophical College listings; covered in The Hindu Sunday Magazine 2024.',
  7,
  ARRAY['history', 'jana-gana-mana', 'krishnamurti', 'theosophy', 'town-trip']::text[],
  NULL,
  NULL,
  '{}'::jsonb
);

-- ===== local_eateries =====
-- HONEST SCARCITY: Horsley Hills is a sparse hill station (~200 households). Madanapalle 30km is the real commerce.
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, zomato_url,
  source_urls, last_verified, is_legendary
) VALUES
(
  'horsley-hills',
  'APTDC Haritha Hill Resort Restaurant',
  'Horsley Hills, APTDC Haritha campus',
  'aptdc-haritha',
  ARRAY['multi-cuisine']::text[],
  NULL,
  'Andhra Meals',
  ARRAY['Andhra Meals', 'Veg Pulao', 'Chicken Curry', 'Filter Coffee']::text[],
  '₹₹',
  '[250,500)'::int4range,
  'mixed',
  NULL,
  'recommended',
  NULL,
  NULL,
  'AP Tourism''s on-site Haritha hill resort restaurant — effectively the only formal dining on the plateau. Set-meal lunch (₹250 veg / ₹300 non-veg) and buffet breakfast (₹200). Hot soup added Nov-Feb. Pre-book during weekend peaks; off-peak weekdays often quiet enough to walk in.',
  'Open 7am-10pm daily',
  'APTDC Haritha Hill Resort, Horsley Hills, Madanapalle Mandal, Annamayya District 517352',
  NULL,
  NULL,
  ARRAY['https://www.aptdc.gov.in/']::text[],
  '2026-05-12'::date,
  FALSE
),
(
  'horsley-hills',
  'Sky Park Cafe (AP Forest Dept canteen)',
  'Horsley Hills, Sky Park area',
  'sky-park',
  ARRAY['south-indian-vegetarian']::text[],
  NULL,
  'Filter Coffee',
  ARRAY['Filter Coffee', 'Maggi', 'Veg Sandwich', 'Bhajji']::text[],
  '₹',
  '[60,180)'::int4range,
  'pure-veg',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'Small AP Forest Dept-run cafe at the Sky Park viewpoint; tea-coffee-snack format only. Filter coffee + maggi the day-tripper anchor. Open 9am-6pm; closed Mon. No reservations, walk-in.',
  'Open 9am-6pm Tue-Sun (closed Mon)',
  'Sky Park, Horsley Hills, Annamayya District 517352',
  NULL,
  NULL,
  ARRAY['https://www.tripadvisor.in/']::text[],
  '2026-05-12'::date,
  FALSE
);

-- HONEST SCARCITY NOTE: No 3rd-5th eatery — Horsley Hills has only the APTDC resort + 1 forest dept cafe.
-- Madanapalle 30km is the real commerce centre; tier B-hold acceptable per brief.
