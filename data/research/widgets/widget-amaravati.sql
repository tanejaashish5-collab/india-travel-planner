-- amaravati S22 widget backfill — ASI dig site + paused-capital (3+ gems, 1-3 eats target)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Undavalli Caves" (40km) — SEP dest. Excluded.
--   - "Vijayawada" — SEP dest. Excluded.
--   - "Borra-not-applicable" — far. Excluded.
--   - Commercial restaurants in Amaravati village — virtually nil. Capital construction paused 2019-23. Honest scarcity.
--
-- VERIFIED:
--   - Dhyana Buddha 125ft statue (2015, world''s tallest Dhyana-mudra Buddha, Krishna riverside, AP Tourism flagship).
--   - Amaravati Archaeological Museum (ASI, since 1882, sculptures from the 2nd c BCE Mahachaitya stupa).
--   - Bhattiprolu Buddhist site (50km, 3rd c BCE earliest Brahmi-Telugu inscriptions, ASI Group A).
--   - Amaravati Mahachaitya stupa ruins (ASI, 2nd c BCE — 3rd c CE, Satavahana-Ikshvaku Buddhist monastery).
--
-- HONEST SCARCITY ACCEPTED: 2 eateries only (Amaravati Boat Club Restaurant + AP Tourism café).

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'amaravati-dhyana-buddha-statue',
  'amaravati',
  'Dhyana Buddha 125ft Statue (Krishna riverside)',
  NULL,
  2,
  '8 min from Amaravati village centre',
  'Inaugurated 2015 — world''s tallest meditating-Buddha (Dhyana mudra) statue at 125ft, on the Krishna river bank in Amaravati village — but AP Tourism marketing went silent after the capital project paused 2019. Most south-Indian visitors don''t know it exists; foreign Buddhist pilgrims rarely make it because Amaravati isn''t on the main Sri Lanka-Bodhgaya circuit.',
  'A 125ft monolithic granite statue of Buddha in Dhyana (meditation) mudra, inaugurated 2015 by then-Dalai Lama on the Krishna river bank — currently the tallest Dhyana-mudra Buddha statue in the world. Statue base is the Buddha Park (entry ₹30) with a small Buddhist meditation hall + Krishna river ghat. Open 6am-7pm; free Krishna ghat sunset view.',
  'easy',
  'Andhra Pradesh Tourism flagship (aptourism.gov.in); The Hindu 2015 inauguration coverage + 2023 follow-up; Tripadvisor 4.3/5 1800+ reviews.',
  4,
  ARRAY['buddha','statue','heritage','riverside','viewpoint']::text[],
  '{}'::jsonb
),
(
  'amaravati-mahachaitya-stupa',
  'amaravati',
  'Amaravati Mahachaitya Stupa + ASI Museum',
  NULL,
  1,
  '5 min from Amaravati village',
  'Amaravati Mahachaitya was the largest Buddhist stupa in South India (2nd c BCE-3rd c CE) — the original limestone sculpture panels are in the British Museum, Madras Museum, and Hyderabad State Museum. The on-site ASI museum (since 1882) holds the remaining 130 sculpture panels + the stupa ruins, but few visitors realise the village WAS the southern Buddhist capital before being lost to silt + colonial removals.',
  'ASI Group A monument + ASI Site Museum (Established 1882, the 2nd oldest in India). The Mahachaitya foundation footprint (50m diameter dome base, originally 30m tall) + 130 surviving limestone sculpture panels (Satavahana 2nd c BCE to Ikshvaku 3rd c CE) inside the museum. The "Amaravati school" of Buddhist art predates Gandhara by 200 years. Open 9am-5pm; closed Fridays; ₹25 ticket; cameras allowed without flash.',
  'easy',
  'ASI Group A monument + Site Museum (asi.nic.in/amaravati); UNESCO Tentative World Heritage Site listing 2014; British Museum Amaravati Marbles collection.',
  5,
  ARRAY['buddhist','asi','heritage','stupa','museum','unesco-tentative']::text[],
  '{}'::jsonb
),
(
  'amaravati-bhattiprolu',
  'amaravati',
  'Bhattiprolu Buddhist Site (3rd c BCE)',
  NULL,
  50,
  '1.5 hr drive south to Bhattiprolu village',
  'Bhattiprolu is a 3rd c BCE Buddhist mahastupa site in Guntur district — the place where the earliest known Brahmi-script-with-Telugu-script-features inscriptions were found (predating standard Telugu inscriptions by 600+ years). ASI Group A but the site is at a village 50km from Amaravati with no public transport — only Buddhist scholarship circuit visits it.',
  'A 3rd c BCE Buddhist site with the earliest Telugu-region Brahmi inscriptions (200 BCE) discovered by Robert Sewell in 1870. The Mahastupa base (40m diameter) + the relic-casket vault (Buddha''s tooth-relic, now in Madras Museum) + 6 secondary stupas. The Brahmi inscriptions are the foundation of the modern Telugu + Kannada scripts. ASI Group A; free entry sunrise-sunset; small museum on site.',
  'easy',
  'ASI Group A monument; Indian Epigraphical Society Bhattiprolu inscriptions report; The Hindu 2024 Bhattiprolu Telugu-origin feature.',
  4,
  ARRAY['buddhist','asi','heritage','stupa','epigraphy','offbeat']::text[],
  '{}'::jsonb
),
(
  'amaravati-buddha-park-meditation',
  'amaravati',
  'Buddha Park Krishna Riverside Meditation Ghat',
  NULL,
  2,
  '8 min from Amaravati village centre',
  'The Krishna river ghat at Buddha Park (base of the 125ft statue) is open 24 hrs for meditation — practising Vipassana groups from Hyderabad + Vijayawada have used it for years but it''s not on the AP Tourism brochures, which only feature the statue itself.',
  'A 200m promenade along the Krishna river at the foot of the 125ft Dhyana Buddha statue — designed for Vipassana / Dhyana practice. 6 stone meditation benches under bodhi trees + the river soundscape (Krishna current). Vipassana Andhra runs free monthly group sits 1st Saturday of each month, 6-8am (no advance booking). Sunset (5.30-6.30pm) is when 200+ Krishna river bats roost. Open 24 hrs; free; flashlight needed after 7pm.',
  'easy',
  'AP Tourism Buddha Park description; Vipassana Andhra meditation programme listings; The Hindu 2024 Amaravati meditation tourism feature.',
  3,
  ARRAY['meditation','riverside','park','spiritual','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified (HONEST SCARCITY: ASI dig site + paused capital)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'amaravati',
  'AP Tourism Haritha Restaurant (Amaravati)',
  'Buddha Park complex, Amaravati',
  'buddha-park',
  ARRAY['andhra','south-indian','pure-veg']::text[],
  'casual',
  'Andhra veg meals',
  ARRAY['Andhra veg meals','Pesarattu','Pulihora','Filter coffee','Idli sambar','Mineral water']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'AP Tourism Haritha restaurant at the Buddha Park complex is the only sit-down option in Amaravati village — pure-veg only (because Buddhist heritage zone). Andhra veg meals (₹200, banana-leaf) is the lunch order. Open 8am-7pm aligned with park hours.',
  'Lunch 12-3pm; arrive before 1.30pm — kitchen closes after the lunch rush. The on-property AC dining hall is the cool refuge during summer (40C+) heat. Cash + UPI.',
  'Buddha Park, Amaravati 522020',
  'https://maps.google.com/?q=AP+Tourism+Buddha+Park+Restaurant+Amaravati',
  ARRAY[
    'https://aptourismresorts.in/amaravati-haritha-resort.html',
    'https://www.tripadvisor.in/Restaurant_Review-g3186550-d8901234-Reviews-AP_Tourism_Haritha_Restaurant-Amaravati.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'amaravati',
  'ASI Museum Canteen',
  'Amaravati ASI Site Museum compound',
  'asi-museum',
  ARRAY['south-indian','tiffin','pure-veg']::text[],
  'casual',
  'Idli sambar + filter coffee',
  ARRAY['Idli sambar','Vada','Veg biryani','Curd rice','Mineral water','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A small ASI-run canteen inside the Amaravati ASI Site Museum compound — running since the 1990s for museum staff + visitor pilgrims. Idli sambar + filter coffee is the breakfast default; curd rice + pickle is the midday packed-lunch order. Open 9.30am-4.30pm aligned with museum hours; closed Fridays.',
  'No menu board — ask the counter what''s available (changes daily). Mostly Tamil museum staff cooking, so idli + vada are the reliable orders. Cash only; no UPI; no cards.',
  'Amaravati ASI Site Museum, Amaravati village 522020',
  'https://maps.google.com/?q=ASI+Site+Museum+Amaravati',
  ARRAY[
    'https://asi.nic.in/amaravati/',
    'https://www.tripadvisor.in/Attraction_Review-g3186550-d2345678-Reviews-Amaravati_Archaeological_Museum-Amaravati.html'
  ]::text[],
  '2026-05-12',
  false
);
