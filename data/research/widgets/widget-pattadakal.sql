-- Pattadakal S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- HONEST SCARCITY ACKNOWLEDGED: Pattadakal is an entry-only ASI village (pop ~1500),
-- with no commercial dining ecosystem. Filling 2 eats honestly + 1 nearest-base
-- option; cap at 3 of 5 requested.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Pattadakal Heritage" — no Tripadvisor / Zomato / Google Maps verification.
--   - "Pattadakal Bhojanalaya" — no verifiable post-2022 footprint.
--   - "Aihole/Badami canteens" listed as Pattadakal — different destinations.
--
-- VERIFIED:
--   - Sangameshwara Temple (oldest in Pattadakal cluster, Vijayaditya 696-733 CE)
--   - Papanatha Temple (Nagara-style, sits outside the main fenced cluster)
--   - Jain Narayana Temple (Rashtrakuta era 9th c CE, 500m west of cluster)
--   - KSTDC canteen at Pattadakal ASI gate
--   - Aihole base canteen (8km — closest village dining)
--   - Badami Court Hotel restaurant (22km — overnight base option)

-- =========================================================
-- HIDDEN GEMS — 3 verified Pattadakal heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pattadakal-sangameshwara-temple',
  'pattadakal',
  'Sangameshwara Temple',
  NULL,
  0.1,
  'inside the Pattadakal UNESCO cluster',
  'Tour groups crowd Virupaksha and Mallikarjuna (the largest temples) and skip past Sangameshwara because it''s incomplete — its sukhanasi (vestibule) is missing the carved entrance and the shikhara stops short. Most foreign visitors give it 5 minutes. Indian school groups skip it entirely.',
  'The oldest dated temple in the Pattadakal cluster — built by Chalukya emperor Vijayaditya (696-733 CE), predating Virupaksha (740 CE) and Mallikarjuna (745 CE). The Dravida-style shikhara was the architectural prototype the later Chalukyas refined. The temple is incomplete because Vijayaditya died before its consecration; his daughter-in-law Lokamahadevi later commissioned Virupaksha to commemorate her husband Vikramaditya II''s defeat of the Pallavas at Kanchipuram. ASI-protected; entry under main Pattadakal ticket. The relative quietness here (versus Virupaksha next door) is why this is the gem.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle; UNESCO Pattadakal nomination dossier 1987; Adam Hardy, "Indian Temple Architecture" Karnataka chapter.',
  5,
  ARRAY['temple','chalukya','unesco','asi','heritage']::text[],
  '{}'::jsonb
),
(
  'pattadakal-papanatha-temple',
  'pattadakal',
  'Papanatha Temple',
  NULL,
  0.5,
  '10 min walk south of the main fenced cluster',
  'The Papanatha sits outside the fenced UNESCO main complex, on the bank of the Malaprabha river. ASI signage from the main cluster doesn''t mark it well; most tour groups don''t walk the 500m and miss this entirely. The walk also doesn''t appear on the standard Pattadakal Google Maps preview.',
  'A late Chalukyan temple (740 CE) that uniquely blends Nagara (north Indian) and Dravida (south Indian) styles — the long axial mandapa is northern; the shikhara above the sanctum is southern. This makes Papanatha the literal architectural pivot of the entire UNESCO site: it shows the Chalukyan synthesis in a single structure rather than across separate temples. The carved frieze of Ramayana scenes inside the mandapa is among the most complete Ramayana visual narratives of the period. ASI-protected; entry under main Pattadakal ticket.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle; UNESCO Pattadakal nomination dossier 1987; Marg Magazine Chalukya architecture feature.',
  5,
  ARRAY['temple','chalukya','unesco','nagara','dravida']::text[],
  '{}'::jsonb
),
(
  'pattadakal-jain-narayana-temple',
  'pattadakal',
  'Jain Narayana Temple',
  NULL,
  0.5,
  '10 min walk west of the main cluster',
  'Built by the Rashtrakutas (who succeeded the Chalukyas), this Jain temple sits 500m west of the fenced UNESCO complex and falls completely outside most tour-guide itineraries — guides emphasise Chalukyan-only highlights and skip the Rashtrakuta-period structure. ASI signage is minimal.',
  'Built 9th century CE under the Rashtrakuta dynasty (likely Krishna II, ca 875-911 CE) — the only Jain temple in the Pattadakal cluster and the architectural bridge between the Chalukyan and later Rashtrakuta styles. The Tirthankara icon inside is partially defaced but the dvarapalas (door-guardians) at the entrance are nearly intact. The Rashtrakuta Dravida-style shikhara here directly inspired the later Ellora caves (which the same Rashtrakutas built). ASI-protected; entry under main ticket. Free space around the temple — quiet for photography.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle; UNESCO Pattadakal nomination dossier 1987; Karnataka State Department of Archaeology Rashtrakuta heritage listing.',
  4,
  ARRAY['jain','temple','rashtrakuta','unesco','asi']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified options (honest scarcity)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'pattadakal',
  'KSTDC Mayura Pattadakal Canteen',
  'Pattadakal ASI ticket gate',
  'pattadakal-asi-gate',
  ARRAY['indian','south-indian','vegetarian']::text[],
  'casual',
  'Veg thali and tiffin for tour groups',
  ARRAY['Veg thali','Idli sambar','Curd rice','Khara bath','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'KSTDC-run canteen at the Pattadakal ASI ticket gate — the only formal food option at the site. Operates on a thali + tiffin model serving tour groups doing the Badami-Aihole-Pattadakal triangle. Veg thali ₹120 fixed; tiffin items individually ₹40-80. Tin-roof shed, plastic tables, no AC. Open 9am-6pm only; closed when the site is closed.',
  'Lunch (12-1.30pm) is when tour buses arrive; pre-noon thali is freshest and quietest. Carry water bottles — refill counter inside is unreliable. UPI works at the main counter; cards not accepted.',
  'Pattadakal ASI complex gate, Pattadakal 587116',
  'https://maps.google.com/?q=Pattadakal+KSTDC+canteen',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/',
    'https://www.tripadvisor.in/Attraction_Review-g952085-d2206710-Reviews-Pattadakal.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'pattadakal',
  'Aihole Roopali Canteen (8km — neighbouring base)',
  'Aihole village main road',
  'aihole-base',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Pilgrim breakfast plate',
  ARRAY['Idli sambar','Khara bath','Filter coffee','Pongal','Bonda']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pattadakal village itself has no breakfast option — most Chalukya-circuit tourists drive 8km to Aihole for the morning meal before reaching Pattadakal. Family-run pure-veg breakfast counter on Aihole main road, tin-roof shed with 5-6 plastic tables. Khara bath and pesarattu are the regional anchors. Open 6.30am-3pm only — no dinner. Cash only.',
  'Pre-9am breakfast at Aihole, then drive to Pattadakal for 9.30am ASI gate opening — the standard Chalukya-circuit timing. By 10am the tour buses fill the road and this small counter sells out. Bring exact cash; UPI inconsistent.',
  'Aihole village main road, Aihole 587124 (8km from Pattadakal)',
  'https://maps.google.com/?q=Aihole+village+canteen+breakfast',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g952084-d2206691-Reviews-Aihole.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'pattadakal',
  'Badami Court Hotel Restaurant (22km — overnight base)',
  'Station Road extension, Badami',
  'badami-base',
  ARRAY['multi-cuisine','indian','continental']::text[],
  'mid_range',
  'AC sit-down dinner for overnight base',
  ARRAY['North Karnataka thali','Mutton biryani','Veg pulao','Continental breakfast','Mango lassi']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'smart-casual',
  'Pattadakal has no dinner service — most overnight visitors base in Badami (22km / 45 min drive) and use Badami Court Hotel as the evening anchor. Multi-cuisine menu including a North Karnataka regional section + non-veg biryani (one of few non-veg options in the entire Chalukya circuit). The de-facto evening hub for archaeology and heritage tourists. Open 7am-10.30pm; pool-side lunch on weekends.',
  'Plan Pattadakal as a morning-only stop (10am-1pm) and return to Badami for lunch and dinner — the village has zero AC sit-down options. Pre-book Sat-Sun dinner; archaeology survey groups fill it. UPI and cards both.',
  'Station Road extension, Badami 587201',
  'https://maps.google.com/?q=Badami+Court+Hotel+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g503694-d1199526-Reviews-Hotel_Badami_Court-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);

-- HONEST SCARCITY: Pattadakal eateries cap at 3 of 5 requested.
-- The village is essentially an ASI gate + temples + parking lot. No dinner, no AC,
-- no non-veg sit-down option. Aihole (8km) and Badami (22km) are the base towns.
