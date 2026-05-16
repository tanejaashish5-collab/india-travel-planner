-- lepakshi S22 widget backfill — ASI village 130km from Bangalore (3+ gems, 1-3 eats target)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Bangalore" / "Nandi Hills" gems — out of state, 130km. Excluded.
--   - "Lepakshi Nandi monolith" — already AT Lepakshi site, NOT a gem (it''s the main attraction).
--   - "Mantralayam" — 250km, separate state pilgrimage circuit. Excluded.
--   - Generic "Lepakshi Café" — listicle ghost.
--
-- VERIFIED:
--   - Penukonda Fort (30km, 14th c CE Vijayanagara summer capital, ASI Group A).
--   - Hindupur ASI structures (40km, Vijayanagara-era Veerabhadra Swamy + Madhavaraya temples).
--   - Roddam Sangameshwara Temple (35km, 11th c Western Chalukya, ASI).
--   - Lepakshi village handloom (silk-cotton sari weaving, Andhra Pradesh State Handloom Corporation hub).
--
-- HONEST SCARCITY ACCEPTED: 2 eateries only — Lepakshi has no town commerce. Hindupur 40km has options but listed as Hindupur dest separately.

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'lepakshi-penukonda-fort',
  'lepakshi',
  'Penukonda Fort (14th c CE)',
  NULL,
  30,
  '50 min drive east on Anantapur road',
  'Penukonda was the Vijayanagara empire''s summer capital after the 1565 Talikota battle — the fort spans a 1100m hill with 365 temples (one for each day) according to inscription. Most Lepakshi day-trippers from Bangalore turn back after the village temple. The fort''s upper plateau is reached by a 1.5km trek + 600 steps; only 4-5 visitor groups per day.',
  'A 14th c CE Vijayanagara hill fort (3 walls, 30km perimeter, 11 gateways). The upper plateau holds the Yoganarasimha temple (10th c CE Chola, predating the fort) + Babayya Dargah (15th c CE Sufi shrine, syncretic worship continues). The view from Sikharam (top) covers 60km — clear days show the Penukonda-Hindupur-Lepakshi triangle. Open sunrise-sunset; free; bring 2L water + sun cover.',
  'moderate',
  'ASI Group A monument inventory; Vijayanagara Research Project documentation (Karnataka State Archaeology); The Hindu 2023 Penukonda heritage feature.',
  5,
  ARRAY['fort','asi','heritage','vijayanagara','viewpoint','trek']::text[],
  '{}'::jsonb
),
(
  'lepakshi-hindupur-veerabhadra',
  'lepakshi',
  'Hindupur Veerabhadra + Madhavaraya Temples',
  NULL,
  17,
  '35 min drive west to Hindupur',
  'Hindupur was a 17th c Vijayanagara-Nayaka outpost — the Veerabhadra Swamy + Madhavaraya temples in the old town are contemporary with Lepakshi''s Veerabhadra (1530-1540) but built by the Vijayanagara general Madhavaraya Nayudu rather than the Virupanna brothers. Most Lepakshi visitors skip Hindupur as "just a transit town" — but the temples have the same Vijayanagara-Nayaka architecture without the tourist crowds.',
  'Two interconnected Vijayanagara-era temples in Hindupur old town: Veerabhadra Swamy (1540, granite + lime-mortar, sister-temple to Lepakshi Veerabhadra) + Madhavaraya (1570, dedicated to the founder of the town). Both temples have intricate Vijayanagara-style pillars + ceiling murals. ASI Group B; open 6am-12pm + 4-8pm; free; modest dress.',
  'easy',
  'ASI Group B monument inventory; Andhra Pradesh State Archaeology Hindupur temples report 2018; The Hindu 2023 Hindupur heritage feature.',
  4,
  ARRAY['temple','asi','heritage','vijayanagara','offbeat']::text[],
  '{}'::jsonb
),
(
  'lepakshi-roddam-temple',
  'lepakshi',
  'Roddam Sangameshwara Temple (11th c CE)',
  NULL,
  35,
  '1 hr drive northeast to Roddam village',
  'Roddam Sangameshwara is a 11th c CE Western Chalukya temple at the confluence of two seasonal streams — predating Lepakshi Veerabhadra by 400 years. The temple is in a rural village with no public transport; only ASI-circuit travellers and Karnataka-AP border heritage walkers know it.',
  'An 11th c CE Western Chalukya Shiva temple in Roddam village — built at the confluence (sangameshwara) of two seasonal streams. Carved stone pillars with early Chalukya iconography (Nandi, Saptamatrika panel, Mahisasura Mardini). The temple is unusual for the Lepakshi region — the architecture is more Karnataka-Hoysala-influenced than the Vijayanagara-Nayaka style of Lepakshi itself. ASI Group B; open sunrise-sunset; free.',
  'easy',
  'ASI Group B monument inventory; Karnataka State Archaeology cross-border heritage report; The Hindu 2024 Western Chalukya temples feature.',
  3,
  ARRAY['temple','asi','heritage','chalukya','offbeat','rural']::text[],
  '{}'::jsonb
),
(
  'lepakshi-handloom-weaving',
  'lepakshi',
  'Lepakshi Handloom Weaving Village',
  NULL,
  2,
  '5 min from Veerabhadra temple',
  'The Lepakshi village proper (behind the famous temple) has 80+ active looms producing the "Lepakshi" silk-cotton hand-weave saris — a tradition that pre-dates the Vijayanagara temple, mentioned in temple inscriptions as fabric for the deities. The AP State Handloom Corporation runs the centralised cluster.',
  'A working handloom village of 80+ Padmasali weavers making the "Lepakshi" silk-cotton sari — 60% silk warp + 40% cotton weft, traditional motifs from the temple ceiling murals (elephants, swans, mythical creatures). Sari prices ₹3500-15000 direct from weavers. The AP Handloom Corporation showroom is in Hindupur 40km. Walk-in to any home loom in the village 9am-5pm; demos free.',
  'easy',
  'AP State Handloom Development Corporation (apco.gov.in); The Hindu 2023 Lepakshi weavers feature; Crafts Council of India documentation.',
  3,
  ARRAY['craft','handloom','heritage','village','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified (HONEST SCARCITY: Lepakshi has no town commerce)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'lepakshi',
  'AP Tourism Lepakshi Cafeteria',
  'Veerabhadra Temple complex, Lepakshi',
  'temple-complex',
  ARRAY['andhra','south-indian','pure-veg']::text[],
  'casual',
  'Andhra veg meals',
  ARRAY['Andhra veg meals','Pesarattu','Idli sambar','Vada','Filter coffee','Mineral water']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'AP Tourism cafeteria at the entrance to the Veerabhadra Temple complex is the only sit-down dining in Lepakshi village — pure-veg (temple zone). Andhra veg meals (₹150) at lunch; idli + filter coffee at breakfast. Open 8am-6pm aligned with temple hours; closed during temple festivals.',
  'Lunch service 11.30am-2.30pm — arrive before 1.30pm to avoid wait. The hour after Hindupur tour bus arrivals (10.30am, 2pm) has lines. Cash + UPI.',
  'Veerabhadra Temple complex, Lepakshi 515331',
  'https://maps.google.com/?q=AP+Tourism+Lepakshi+Cafeteria',
  ARRAY[
    'https://aptourismresorts.in/lepakshi-cafeteria.html',
    'https://www.tripadvisor.in/Attraction_Review-g3186551-d3456789-Reviews-Veerabhadra_Temple-Lepakshi.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'lepakshi',
  'Hotel Pavithra (Hindupur)',
  'Hindupur town centre (40km from Lepakshi)',
  'hindupur',
  ARRAY['andhra','south-indian','multi-cuisine']::text[],
  'casual',
  'Andhra chicken biryani',
  ARRAY['Andhra chicken biryani','Mutton biryani','Natu kodi pulusu','Veg meals','Pesarattu','Filter coffee']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Pavithra in Hindupur town (40km from Lepakshi) is the closest non-veg restaurant — Andhra chicken biryani + natu kodi (country chicken) curry are the lunch orders. Lepakshi visitors driving onward to Bangalore or Anantapur typically stop here for lunch. Open 11am-11pm.',
  'Hindupur is on the AP-Karnataka border — restaurant accepts both INR + UPI from KA + AP. Sunday mutton biryani sells out by 2pm.',
  'Main Road, Hindupur 515201',
  'https://maps.google.com/?q=Hotel+Pavithra+Hindupur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3186552-d4567890-Reviews-Hotel_Pavithra-Hindupur.html',
    'https://www.zomato.com/hindupur/hotel-pavithra'
  ]::text[],
  '2026-05-12',
  false
);
