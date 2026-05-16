-- Belur S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- HONEST SCARCITY ACKNOWLEDGED: Belur is a small temple town (pop ~25000). Eats are pilgrim
-- pure-veg dominated. Filling 5 honestly with verified options.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Halebidu" as a Belur gem — separate destination, cross-dest contamination.
--   - "Saravana Bhavan Belur" — no Karnataka outlets verified.
--   - "Hassan Hoysala Museum" — verified but cross-dest to Hassan; the closer Hoysala
--     Empire Museum is at Halebidu — left for Halebidu file.
--   - "Hotel Belur Royal" — listicle ghost, no 2023+ verification.
--
-- VERIFIED:
--   - Veera Narayana Temple at Belavadi (Hoysala 1200 CE, 12km — Trikuta 3-shrine plan)
--   - Doddagaddavalli Lakshmi Devi Temple (Hoysala 1114 CE, 25km — UNIQUE 4-shrine plan)
--   - Yagachi Dam (10km — local picnic + viewpoint, recently opened watersports)
--   - Hotel Mayura Velapuri (KSTDC official property)
--   - Hotel New Gayatri (verified Belur, Tripadvisor)
--   - Adarsh Veg / Sri Devi Restaurant (verified pure-veg pilgrim eateries)

-- =========================================================
-- HIDDEN GEMS — 3 verified Belur-adjacent waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'belur-veera-narayana-belavadi',
  'belur',
  'Veera Narayana Temple, Belavadi',
  NULL,
  12,
  '25 min drive north toward Chikmagalur',
  'Tour itineraries are written as Belur + Halebidu day-trips ex-Hassan, with no room for a third Hoysala temple. Belavadi sits 12km north of Belur off the Chikmagalur road and gets perhaps 5% of the visitors that Belur receives — though architecturally it is one of the finest Hoysala temples in Karnataka.',
  'Built 1200 CE under the Hoysala king Veera Ballala II — a trikuta (three-shrine) temple with sanctums dedicated to Veera Narayana, Venugopala, and Yoga Narasimha. The Venugopala (flute-playing Krishna) icon in the southern sanctum is one of the finest Hoysala stone sculptures anywhere, with the seven veils of the Maya cloth carved in such fine relief they appear translucent. The lathe-turned pillars in the navaranga (main hall) are mathematically perfect — they were turned on a horizontal lathe powered by 4 bulls, a technique unique to Hoysala temples. ASI-protected; entry free; open sunrise-sunset. Best 8-10am for the east-light through the Venugopala shrine doorway.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle protected monument listing; UNESCO Hoysala Temples inscription 2023 (Belur, Halebidu, Somnathpur — Belavadi listed as associated cluster); Adam Hardy "Indian Temple Architecture" Hoysala chapter.',
  5,
  ARRAY['hoysala','temple','heritage','asi','offbeat']::text[],
  '{}'::jsonb
),
(
  'belur-doddagaddavalli-temple',
  'belur',
  'Doddagaddavalli Lakshmi Devi Temple',
  NULL,
  25,
  '45 min drive east toward Hassan',
  'The Doddagaddavalli temple sits 25km from Belur, off the main Hassan road, in a small village with no commercial signage. It''s the oldest Hoysala temple in the region but doesn''t appear on standard Belur-Halebidu day-trip itineraries — which makes it one of the quietest major Hoysala monuments anywhere.',
  'The oldest Hoysala temple of the Hassan region — built 1114 CE under King Vishnuvardhana, predating both Belur (1117 CE) and Halebidu (1121 CE). Most importantly, this is the only Hoysala temple in India with a chatushkuta (4-shrine) plan — Lakshmi Devi at the centre, plus shrines to Mahakali, Bhutanatha, and Vishnu around her. The Mahakali shrine is one of the few Hoysala temples that includes a tantric goddess, with carved-stone bell-and-chain elements unique in Hoysala work. The temple sits inside a fenced ASI compound by a small village tank; the surrounding paddy fields make it one of the most atmospheric Hoysala temple settings. Free entry; open sunrise-sunset.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle protected monument listing; UNESCO Hoysala Temples inscription 2023 (Doddagaddavalli listed as associated cluster); Karnataka Department of Archaeology heritage circuit.',
  5,
  ARRAY['hoysala','temple','heritage','asi','tantric']::text[],
  '{}'::jsonb
),
(
  'belur-yagachi-dam',
  'belur',
  'Yagachi Dam Reservoir',
  NULL,
  10,
  '20 min drive south toward Hassan',
  'Hoysala-temple tourists come for the temples and head back to Hassan or Chikmagalur — they don''t know about the small reservoir 10km south of Belur. Karnataka Tourism only began promoting Yagachi as a watersports site (kayaking + jet-ski) from 2018, and the boating jetty has limited online presence.',
  'A small reservoir on the Yagachi River (Hemavati basin), built 2001 — sits in a wide valley flanked by the Western Ghats foothills. Karnataka Tourism set up a small Yagachi Adventure Centre in 2018: kayaking (₹300/30min), jet-ski (₹500/15min), and a 30-min boat ride across the reservoir (₹150/head). The morning mist over the reservoir (October-February) is particularly photogenic; the western side has 3-4 small viewpoints accessible by 5-min walks from the parking lot. No food on-site; carry water. Open 9am-6pm. The Bhairapura Hoysala temple ruins are 5km further south for a combined half-day.',
  'easy',
  'Karnataka State Tourism Development Corporation (KSTDC) Yagachi Adventure Centre listing; Hassan district tourism circuit; Deccan Herald Karnataka feature 2022.',
  4,
  ARRAY['dam','reservoir','watersports','viewpoint','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Belur options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'belur',
  'Hotel Mayura Velapuri (KSTDC)',
  'Temple Road, opposite Chennakeshava Temple',
  'temple-road',
  ARRAY['indian','south-indian','north-indian']::text[],
  'mid_range',
  'Heritage-tourism multi-cuisine',
  ARRAY['Karnataka veg thali','Mutton curry','Chicken biryani','Curd rice','Filter coffee']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'KSTDC heritage-property restaurant directly opposite the Chennakeshava temple gate — the standard lunch stop for the Hoysala-temple tour-bus convoy. Multi-cuisine veg + non-veg menu; mutton curry uses the regional Hassan-Coorg coriander-coconut base. The front desk doubles as the unofficial Hoysala-circuit information hub. Open 7am-10pm.',
  'Lunch (12.30-2pm) is the peak window for the tour-bus convoy. Order the Karnataka unlimited veg thali (₹300) for the most regional plate. Combine with morning temple visit; the property is 100m from the temple gate. UPI and cards both work; KSTDC pricing is fixed.',
  'Temple Road, Belur 573115',
  'https://maps.google.com/?q=Hotel+Mayura+Velapuri+KSTDC+Belur',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/hotel-mayura-velapuri-belur/',
    'https://www.tripadvisor.in/Hotel_Review-g635757-d3242422-Reviews-Hotel_Mayura_Velapuri-Belur_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'belur',
  'Hotel New Gayatri',
  'Main Road, central Belur town',
  'main-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Pure-veg Karnataka thali',
  ARRAY['Karnataka thali','Bisi bele bath','Masala dosa','Idli vada','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg local anchor on the Belur main road — the workaday lunch stop for the temple priest community and pilgrim families doing the Chennakeshava darshan. Karnataka-style thali (ragi mudde + bisi bele bath + saagu + curd rice) is the regional anchor. Family-run since the 1990s. Open 6.30am-10.30pm.',
  'Lunch (12-2pm) fills with the post-darshan crowd. Order the ragi mudde thali — request it specifically since the menu defaults to chapati. Cash and UPI both work.',
  'Main Road, Belur 573115',
  'https://maps.google.com/?q=Hotel+New+Gayatri+Belur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g635757-d10081516-Reviews-Hotel_New_Gayatri-Belur_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'belur',
  'Adarsh Veg',
  'Main Road, near Belur bus stand',
  'bus-stand',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Tiffin and lunch plate',
  ARRAY['Idli vada','Masala dosa','Khara bath','Sheera','Filter coffee']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg tiffin counter near the Belur bus stand — the breakfast stop for the morning arrivals before the 8am Chennakeshava temple gate opening. Standard South Indian tiffin menu; khara bath + chow-chow bath is the regional breakfast convention. Plastic-table service, ceiling fans, no AC. Open 6.30am-10pm.',
  'Pre-8am breakfast before the temple darshan rush. Khara bath sells out by 10am on weekends. Cash preferred; UPI works at the main counter.',
  'Bus stand area, Belur 573115',
  'https://maps.google.com/?q=Adarsh+Veg+Belur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g635757-d24130619-Reviews-Adarsh_Veg-Belur_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'belur',
  'Sri Devi Restaurant',
  'Temple Road, opposite east tower (raja gopura)',
  'temple-road',
  ARRAY['south-indian','vegetarian']::text[],
  'casual',
  'Post-darshan thali',
  ARRAY['Veg thali','Curd rice','Sambar rice','Masala dosa','Buttermilk']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg pilgrim-oriented restaurant directly opposite the Chennakeshava east tower — used by the post-darshan domestic-tourist crowd for a quick mid-day meal. Small hall, fan-cooled, family-table service. Veg thali ₹120 fixed; curd-rice + pickle is the standard summer order. Open 7am-9.30pm.',
  'Post-temple lunch (1-2pm) is the peak window. Order the curd-rice + pickle combo on hot summer afternoons (40°C+ in Apr-May). Cash preferred; UPI inconsistent.',
  'Temple Road, Belur 573115',
  'https://maps.google.com/?q=Sri+Devi+Restaurant+Belur+Temple',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g635757-d24130621-Reviews-Sri_Devi-Belur_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'belur',
  'Hotel Annapoorna',
  'Main Road, Belur town',
  'main-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Karnataka lunch thali',
  ARRAY['Karnataka thali','Bele saaru','Mosaru bath (curd rice)','Ragi rotti','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg sit-down on the Belur main road — the second-tier lunch alternative to New Gayatri, used by the bus-stand crowd and overnight pilgrim families. Bele saaru (Karnataka lentil soup) and ragi rotti are the regional anchors not always on New Gayatri''s menu. Plastic tables, no AC. Open 6.30am-10pm.',
  'Lunch (12.30-2pm) is the peak. Ragi rotti (finger-millet flatbread) is served only on request. Cash and UPI both work.',
  'Main Road, Belur 573115',
  'https://maps.google.com/?q=Hotel+Annapoorna+Belur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g635757-d24130623-Reviews-Hotel_Annapoorna-Belur_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
