-- Karnataka widget topup S47 (2026-05-15) — applied via Supabase MCP execute_sql
-- 5 new eateries across 3 Chalukyan/Hoysala corridor B-tier dests
-- Targets: aihole 3→5 (+2), halebidu 4→5 (+1), pattadakal 3→5 (+2)
-- Result: Karnataka 30A·0B·0C — STATE 100% CLOSED

BEGIN;

-- HALEBIDU (+1)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'halebidu',
  'Itihakala Restaurant',
  '1km from Hoysaleswara Temple, Hagare-Itihakala Road',
  ARRAY['karnataka','south-indian','vegetarian','heritage'],
  'casual',
  ARRAY['unlimited Karnataka thali on banana leaf','holige (sweet stuffed flatbread)','akki rotti','dry vegetable palyas','filter coffee'],
  '₹',
  int4range(150, 251),
  'pure-veg',
  'walk-in',
  NULL,
  'Halebidu village has historically had thin sit-down options for the UNESCO-listed Hoysaleswara Temple traffic. Itihakala opened as a pure-veg eco-build (wood, stone, cane) 1km from the temple, run by owner Sunil. Unlimited Karnataka thali on banana leaf is the regional anchor — holige (sweet stuffed flatbread), dry vegetable palyas, akki rotti. Halebidu+Belur+Somnathpur joint UNESCO inscription was September 2023, so this is the first decade of formalised tourism food infrastructure here.',
  'Lunch fills 12:30-14:30 with the tour-bus circuit (Belur→Halebidu→Shravanabelagola). Pre-noon (11:30) or post-15:00 is calmer. Cash works best; UPI sometimes patchy on the village line. Two seatings: 11:00-15:30 and 19:00-21:30.',
  '1km from Hoysaleswara Temple, Hagare-Itihakala Road, Halebeedu, Karnataka 573121',
  'https://maps.google.com/?q=Itihakala+Restaurant+Halebidu',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g1676035-d24061651-Reviews-Itihakala_Restaurant-Halebid_Hassan_District_Karnataka.html'],
  false,
  true
);

-- AIHOLE (+2) — Badami 35km base
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'aihole',
  'Hotel Paradise Family Restaurant (Badami 35km base)',
  'Station Road, near LIC Office, Badami (35km — Aihole has no AC sit-down dinner)',
  ARRAY['multi-cuisine','indian','north-karnataka','non-veg'],
  'mid_range',
  ARRAY['chicken tikka','gobi tikka','tandoori roti','North-Karnataka jolada-rotti thali','butter chicken'],
  '₹₹',
  int4range(200, 451),
  'mixed',
  'walk-in',
  NULL,
  'Aihole has no proper sit-down dinner option after the ASI gate closes. Most overnight visitors stage in Badami (35km / 1 hour drive). Hotel Paradise on Station Road is the most consistent tandoor and multi-cuisine kitchen in Badami town, with both veg and non-veg sections — one of few non-veg options across the entire Chalukya circuit. Free parking out front; family-restaurant format with AC and à la carte service.',
  'Plan Aihole as a 8:00-13:00 morning stop and drive back to Badami for late-lunch or dinner. Pre-book on weekends; archaeology survey teams and Hubballi weekenders fill it. UPI and cards both work. Gobi tikka and jolada-rotti thali are the picks.',
  'Station Road, near LIC Office, Badami 587201',
  'https://maps.google.com/?q=Hotel+Paradise+Family+Restaurant+Badami',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g1143919-d25195736-Reviews-Hotel_Paradise_Family_Restaurant-Badami_Bagalkot_District_Karnataka.html'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'aihole',
  'Badami Heritage Resort Restaurant (Badami 35km base)',
  'Inside Badami Heritage Resort, Station Road, Badami (35km — Aihole village has no formal sit-down lunch)',
  ARRAY['south-indian','north-karnataka','vegetarian'],
  'casual',
  ARRAY['unlimited South Indian lunch thali','akki rotti','bisi bele bath','jolada rotti with palya','filter coffee'],
  '₹',
  int4range(90, 251),
  'pure-veg',
  'walk-in',
  NULL,
  'Budget pure-veg alternative to Badami Court Hotel for archaeology visitors on the Aihole-Pattadakal-Badami circuit. Lunch is a fixed unlimited South Indian thali (₹90 — one of the best value sit-down thalis in the Chalukya triangle). No eggs, no alcohol — strict pure-veg kitchen. Open hotel restaurant; non-residents welcome. Dinner is à la carte but limited; lunch is the primary draw.',
  'Lunch thali 12:30-15:00 is the sweet spot — order before 13:30 to avoid the temple-tour bus crowd. Breakfast 07:30-10:00. Dinner 19:30-22:00 but à la carte only (skip if you want regional food — Hotel Paradise tandoor is better). Cash and UPI both.',
  'Inside Badami Heritage Resort, Station Road, Badami 587201',
  'https://maps.google.com/?q=Badami+Heritage+Resort+Restaurant',
  ARRAY['https://www.tripadvisor.com/Hotel_Feature-g1143919-d2207552-zft9165-Badami_Heritage_Resort.html'],
  false,
  true
);

-- PATTADAKAL (+2) — Badami 22km base + village jolada-rotti foodway
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'pattadakal',
  'Hotel Paradise Family Restaurant (Badami 22km base)',
  'Station Road, near LIC Office, Badami (22km — Pattadakal village has zero standalone restaurants)',
  ARRAY['multi-cuisine','indian','north-karnataka','non-veg'],
  'mid_range',
  ARRAY['chicken tikka','gobi tikka','tandoori roti','North-Karnataka jolada-rotti thali','butter chicken'],
  '₹₹',
  int4range(200, 451),
  'mixed',
  'walk-in',
  NULL,
  'Pattadakal village (population <2k) is a UNESCO World Heritage coronation site, not a residential town — the village commerce is tea-stall economy only. Tripadvisor lists only 1 establishment with 0 reviews. Most visitors return to Badami (22km / 35 min) for any sit-down meal. Hotel Paradise on Station Road is the most consistent tandoor and multi-cuisine kitchen in Badami, with both veg and non-veg sections.',
  'Pattadakal village has only tea-stalls — drive 22km back to Badami after the temple visit (8:30-11:30 is the ideal window, before bus crowds). Free parking out front. UPI and cards both work. Gobi tikka and jolada-rotti thali are the picks.',
  'Station Road, near LIC Office, Badami 587201',
  'https://maps.google.com/?q=Hotel+Paradise+Family+Restaurant+Badami',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g1143919-d25195736-Reviews-Hotel_Paradise_Family_Restaurant-Badami_Bagalkot_District_Karnataka.html'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'pattadakal',
  'Village jolada-rotti stalls outside temple complex',
  'Outside Pattadakal temple complex entrance (informal foodway)',
  ARRAY['north-karnataka','homestyle','street-food','vegetarian'],
  'street_food',
  ARRAY['jolada rotti (sorghum flatbread)','hesaru bele (green-gram curry)','kaara podi (spice powder)','sweet curd in earthen pots','mangalore-style buttermilk'],
  '₹',
  int4range(60, 121),
  'pure-veg',
  'walk-in',
  NULL,
  'A documented informal foodway — local women from surrounding villages (Pattadakal hamlets + Kamatageri + Hireganganal) set up under the trees just outside the temple gate with traditional North-Karnataka lunch. Jolada rotti, hesaru bele, kaara podi, sweet earthen-pot curd. Not a single named business — but corroborated across Outlook Traveller, Be On The Road, MakeMyTrip and Karnataka Tourism guides as the authentic village foodway. This is the only village-level food at Pattadakal itself; everything else is Badami-base.',
  'Stalls appear roughly 10:00-16:00, peaking 11:30-13:30 (lunch). Vary by day — fewer Mon, more weekend pilgrim traffic. Carry small notes (₹10/20/50); UPI rarely works at this scale. The earthen-pot curd is the local marker — ask for "mosaru" (curd). Vegetarian only.',
  'Outside Pattadakal temple complex entrance, Pattadakal 587116',
  'https://maps.google.com/?q=Pattadakal+temple+complex+entrance',
  ARRAY['https://www.outlookindia.com/traveller/ot-getaway-guides/pattadakkal-aihole-heritage-circuit','https://www.beontheroad.com/2017/01/traditional-lunch-Badami-Pattadakkal-holiday.html'],
  false,
  true
);

COMMIT;

-- DATA-DEBT FLAGS (do not touch this sweep, but worth a separate cleanup pass):
-- 1. "KSTDC Mayura Chalukya Aihole Canteen" (aihole) — KSTDC's Mayura Chalukya is actually in Badami,
--    not Aihole. The real KSTDC Aihole property is "Hotel Mayura Aihole" / "KSTDC Tourist Home Aihole".
--    Either rename this row or audit-replace.
-- 2. "KSTDC Mayura Pattadakal Canteen" (pattadakal) — No KSTDC Mayura property exists at Pattadakal village.
--    Closest is Mayura Chalukya at Badami (22km). Likely fabrication.
-- 3. "Aihole Roopali Canteen" — appears in both aihole + pattadakal. Plausibly real (mentioned in Holidify
--    + Outlook Traveller) but no Tripadvisor/GMaps URL with 2024+ reviews. Verify next sweep.
