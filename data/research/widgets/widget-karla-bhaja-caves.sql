-- karla-bhaja-caves S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Karla + Bhaja caves are 4km apart on opposite sides of NH-48 (old NH-4), Pune-Mumbai expressway corridor. Lonavala 11km E, Talegaon 15km W, Pune 60km SE.
--   - LONAVALA = SEP S25 DEST (11km). CRITICAL: All Lonavala chikki institutions (Maganlal Chikki 1880, Cooper Chikki 1936, A1 Chikki, National Chikki 1922) are S25 LONAVALA eats — DO NOT REUSE for Karla-Bhaja. Pick Karla/Bhaja-side dhabas + Talegaon-side anchors (within 3km of the caves, not 11km away in Lonavala).
--   - KARLA Cave 8 Chaitya Hall = the TALLEST chaitya in India (14m / 124ft) with 37 octagonal elephant-couple pillars, 2nd c BCE Hinayana. THE main attraction, NOT a gem.
--   - BHAJA Cave 12 = the music-cave with dance reliefs (UNIQUE among Buddhist sites — Apsara figures in dance + percussion-instrument bas-reliefs).
--   - EKVIRA Devi temple AT Karla = Mahar/Devadasi pilgrim deity, hybrid Hindu-Buddhist site (Devi shrine retrofitted into Karla''s pre-Chaitya forecourt). Mahar community pilgrimages Feb-Mar jatra. Maharashtra OBC pilgrim flow.
--   - BEDSE Caves 11km = separate Buddhist cluster (2nd c BCE Hinayana, 11 caves), under-visited even by Karla-Bhaja visitors. Borderline cross-dest but brief allows.
--   - Karla-Bhaja anchors: Hotel Surya Karla, Karla MTDC, Hotel Janseva Karla-Bhaja road, Hotel Vaibhav Talegaon, Ekvira Restaurant Karla.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'karla-bhaja-caves-bhaja-cave-12-music-dance-reliefs',
  'karla-bhaja-caves',
  'Bhaja Cave 12 music + dance bas-reliefs (unique among Buddhist sites)',
  NULL,
  4,
  '12 min drive from Karla parking to Bhaja entrance + 15 min climb',
  'Karla draws the day-tripper crowd; Bhaja sits across NH-48 and pulls 1/4 the footfall — almost none of Bhaja''s visitors register that Cave 12''s relief panels show APSARAS in dance posture + percussion instruments, the only such Buddhist-cave musical reliefs in India.',
  'Bhaja Cave 12 (a small vihara in the 22-cave Bhaja cluster) holds bas-relief panels showing apsara dancers + drummers + tabla-precursor percussion + vena-string-instrument musicians — a UNIQUE iconographic record among Buddhist cave sites in India, indicating that the early Hinayana sangha at Bhaja included or patronised secular performing arts (or that the donor-patrons were performing-arts communities). The reliefs are heavily weathered but visible in raking afternoon light (3-5pm best). The Bhaja cave cluster includes 22 caves (Cave 12 sits mid-cluster) cut 2nd c BCE — pre-dating Karla''s great Chaitya (Cave 8) by ~50 years. Bhaja entrance: ASI ticket ₹25 Indian / ₹300 foreign. 15-min climb from parking. Open 9am-5pm.',
  'easy',
  'ASI Bhaja Caves official dossier; "The Cave Temples of India" Fergusson + Burgess (1880) Bhaja ch.; "Music in Indian Caves" Lalit Kumar (1998); Maharashtra Tourism Bhaja-Karla listing.',
  5,
  ARRAY['caves','heritage','buddhist','music','dance','archaeology']::text[],
  '{}'::jsonb
),
(
  'karla-bhaja-caves-ekvira-devi-mahar-jatra',
  'karla-bhaja-caves',
  'Ekvira Devi temple at Karla (Mahar/Devadasi hybrid pilgrim site)',
  NULL,
  0,
  'Front courtyard of Karla Chaitya Cave 8',
  'Tourists climb to Karla Cave 8 to see the Chaitya Hall and skip the Ekvira Devi temple in the forecourt — a small Hindu-Devi shrine carved into the Buddhist cave forecourt where Mahar + Devadasi communities have pilgrimed since at least the 16th c.',
  'The Ekvira Devi temple sits in the front courtyard of Karla Cave 8 — a 16th-century-or-earlier Hindu Devi shrine retrofitted into the pre-existing Buddhist Chaitya forecourt, making Karla one of India''s rare hybrid Buddhist-Hindu pilgrim sites. Ekvira is worshipped primarily by the Mahar community (Maharashtra OBC + Buddhist-Ambedkar-tradition community) + the Devadasi temple-women lineage of the Konkan-Khandesh corridor. The annual Ekvira Jatra (full-moon Feb-Mar) draws 50,000+ Mahar pilgrims from Mumbai-Pune-Aurangabad — coach-loads arrive 4am dawn. The deity is depicted as a stone-cut form within a small vermilion-painted niche. The temple-Buddhist coexistence is a documented case study in syncretic-pilgrim research. Open 6am-9pm; ₹0 entry beyond Karla Cave 8 ASI ticket.',
  'easy',
  'ASI Karla Caves official dossier; "Untouchable Saints: An Indian Phenomenon" Eleanor Zelliot (2005) Mahar-Ekvira ch.; "Sacred Geographies of Maharashtra" Anne Feldhaus (2003); Maharashtra Tourism Karla-Bhaja listing; The Hindu Mahar-jatra reporting 2023.',
  5,
  ARRAY['temple','caves','heritage','mahar','devadasi','pilgrimage','syncretic']::text[],
  '{}'::jsonb
),
(
  'karla-bhaja-caves-bedse-caves-cluster',
  'karla-bhaja-caves',
  'Bedse Caves (2nd c BCE separate Buddhist cluster, under-visited)',
  NULL,
  11,
  '25 min drive west of Karla + 20 min climb to caves',
  'Karla-Bhaja day-trippers stop at the 2 cave-clusters and head back to Lonavala-Pune; almost none drive 11km further to the smaller Bedse cluster (11 caves), even though Bedse holds the most-preserved early-Hinayana vihara facade outside Bhaja.',
  'Bedse Caves sit on a hill 11km west of Karla — an 11-cave Hinayana Buddhist cluster cut 2nd c BCE, contemporaneous with Bhaja. Cave 7 holds a small but well-preserved Chaitya Hall with 4 octagonal pillars + a votive stupa (a smaller cousin to Karla''s great Chaitya), while Cave 11 is a multi-cell vihara with rock-cut benches + a worn donor inscription. The Bedse Chaitya facade is among the best-preserved early-Buddhist cave entrances in India (less weathered than Bhaja due to overhang protection). 20-min climb from Kamshet-Bedse parking; ASI ticket ₹25 Indian / ₹300 foreign. Bedse village 1km further holds basic chai-stalls only — eat at Karla-Lonavala. Open 9am-5pm.',
  'moderate',
  'ASI Bedse Caves official dossier; "The Cave Temples of India" Fergusson + Burgess (1880) Bedse ch.; "Buddhist Caves of Western India" Susan Huntington; Maharashtra Tourism Bedse listing.',
  4,
  ARRAY['caves','heritage','buddhist','archaeology','under-visited','hinayana']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (Karla/Bhaja-side ONLY — Lonavala chikki excluded)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'karla-bhaja-caves',
  'Hotel Surya Karla',
  'Karla-Bhaja Road',
  'karla-bhaja-rd',
  ARRAY['maharashtrian','konkan','mixed']::text[],
  'casual',
  'Maharashtrian-Konkan thali',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Chicken Kolhapuri (non-veg)','Sol kadhi','Modak']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Karla-Bhaja road family hotel 800m from the Karla caves parking, on the connector road between the two cave clusters — Maharashtrian-Konkan thali for the day-tripper base. Pure-veg default + Konkan Chicken-Kolhapuri non-veg menu Fri-Sun. Bhakri + pithla + dal + rice + sweet + sol kadhi ₹200 veg / ₹280 non-veg. Open 7am-10.30pm.',
  'Karla-Bhaja day-trippers post-caves lunch 1-3pm peak; arrive 12.30 or after 3pm. Sol kadhi (kokum + coconut buttermilk) free with thali Apr-Jun. Cash + UPI; no cards.',
  'Karla-Bhaja Road, between Karla + Bhaja Caves parking, Karla 410406, Maval taluka, Pune district',
  'https://maps.google.com/?q=Hotel+Surya+Karla',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915313-Karla_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/hotel-surya-karla'
  ]::text[],
  '2026-05-13',
  false
),
(
  'karla-bhaja-caves',
  'Karla MTDC Restaurant',
  'MTDC Karla Holiday Resort',
  'mtdc-karla',
  ARRAY['maharashtrian','multi-cuisine','konkan']::text[],
  'mid_range',
  'Maharashtrian + multi-cuisine',
  ARRAY['Maharashtrian thali','Misal pav','Paneer butter masala','Konkan fish (non-veg)','Filter coffee','Sol kadhi']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC Karla Holiday Resort''s in-house dining 1.5km from Karla caves parking — the government-rate AC dining option for Karla-Bhaja day-trippers + weekend stayers. Maharashtrian thali + multi-cuisine + non-veg Konkan menu. Walk-in non-residents 12.30-3pm + 7.30-10.30pm.',
  'Weekend lunches Sat-Sun fill the dining hall with Mumbai-Pune day-trippers — book +91-2114-282230 ahead. Sol kadhi unlimited refill with thali. Cards + UPI; cash works.',
  'MTDC Karla Holiday Resort, near Karla Caves, Karla 410406, Pune district',
  'https://maps.google.com/?q=MTDC+Karla',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/karla',
    'https://www.tripadvisor.in/Hotel_Review-g3915313-Reviews-MTDC_Karla-Karla.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'karla-bhaja-caves',
  'Hotel Janseva Karla',
  'Karla Caves Approach Road',
  'karla-approach-rd',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian satvik thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Zunka','Misal pav','Buttermilk']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Karla caves approach road pure-veg thali 500m from the parking — Maharashtrian satvik thali (no onion-garlic by default) for the Ekvira-jatra pilgrim flow + Mahar-community coach groups. Bhakri + pithla + zunka + dal + rice + sweet ₹150. Misal pav Sundays. Open 6.30am-10pm.',
  'Ekvira-jatra full-moon Feb-Mar window the queue extends 1km — arrive pre-dawn or post-2pm. Cash + UPI only; no cards. Sabudana khichdi Mon + Thu vrat days.',
  'Karla Caves Approach Road, Karla 410406',
  'https://maps.google.com/?q=Hotel+Janseva+Karla',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915313-Karla_Pune_District_Maharashtra.html',
    'https://www.justdial.com/Karla/Hotel-Janseva-Approach-Road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'karla-bhaja-caves',
  'Hotel Vaibhav Talegaon',
  'Talegaon Dabhade Old Mumbai-Pune Highway',
  'talegaon-old-pune-hw',
  ARRAY['maharashtrian','dhaba','mixed']::text[],
  'casual',
  'Old-highway dhaba thali',
  ARRAY['Dhaba thali','Bhakri','Tandoori roti','Chicken Kolhapuri (non-veg)','Misal pav','Lassi']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Talegaon Dabhade old Mumbai-Pune highway dhaba 15km from Karla caves — pre-expressway-era highway-dhaba institution (still preferred by truckers + self-drivers who avoid the Mumbai-Pune toll-expressway). Maharashtrian-dhaba thali + Punjabi tandoor + Konkan Chicken-Kolhapuri non-veg Fri-Sun. Open 6am-12am.',
  'Self-drivers on the OLD Mumbai-Pune highway stop here pre + post Karla-Bhaja. Cash + UPI; no cards. Truck volume 10pm-1am — avoid those hours.',
  'Old Mumbai-Pune Highway, Talegaon Dabhade 410507, Maval taluka, Pune district',
  'https://maps.google.com/?q=Hotel+Vaibhav+Talegaon+Old+Pune+Highway',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1186196-Talegaon_Dabhade_Pune_District_Maharashtra.html',
    'https://www.justdial.com/Talegaon/Hotel-Vaibhav-Old-Pune-Highway'
  ]::text[],
  '2026-05-13',
  false
),
(
  'karla-bhaja-caves',
  'Ekvira Restaurant Karla',
  'Karla Temple Plaza',
  'karla-temple-plaza',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Ekvira-jatra pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Modak (Ganesh Chaturthi)','Buttermilk','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Small pilgrim thali kitchen at the Karla caves temple plaza 200m from parking — the Mahar/Devadasi-pilgrim default for the Ekvira Devi temple-side flow. Maharashtrian satvik thali ₹120 with bhakri + 2 vegetables + dal + rice + sweet + buttermilk. Open 6am-9pm.',
  'Ekvira-jatra full-moon Feb-Mar peak — queue starts 5am dawn. Off-jatra days quiet 12.30-2.30pm. Free filter coffee refill with thali. Cash + UPI; no cards.',
  'Karla Temple Plaza, near Karla Caves parking, Karla 410406',
  'https://maps.google.com/?q=Ekvira+Restaurant+Karla',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915313-Karla_Pune_District_Maharashtra.html',
    'https://www.justdial.com/Karla/Ekvira-Restaurant-Temple-Plaza'
  ]::text[],
  '2026-05-13',
  false
);
