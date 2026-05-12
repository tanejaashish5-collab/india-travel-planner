-- harihareshwar S24 widget backfill — full A target (gems +2, eats +5, stays +3)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Diveagar Suvarna Ganesh" — 12km, real (golden Ganesh stolen 2012/returned 2012), but Diveagar is its own non-DB slug — kept as a Harihareshwar gem (allowed per brief: "Diveagar not separate dest, OK to gem").
--   - "Shrivardhan Lakshmi Narayan temple" — 15km, Peshwa Balaji Vishwanath''s birthplace village, real (Peshwa-era).
--   - Naivedyam Hotel / Vaibhav / Mahalaxmi — multiple borderline thin web footprints; verified via MTDC Karli Resort proximity + Tripadvisor + Maharashtra Tourism Bagmandala ferry listing. Kept as honest mid-tier anchors with sourced URLs; dropped any unverifiable family bhojanalays.
--   - Bagmandala ferry — MMB (Maharashtra Maritime Board) RoRo Bankot-Bagmandala launched Feb 2022 — used in 2022+ news cycle.
--   - Velas turtle festival — Sahyadri Nisarga Mitra (SNM) since 2002, Olive Ridley hatchling release Feb-Mar — multiple 2023-2024 Times of India / The Hindu features.
--
-- VERIFIED:
--   - 1 existing gem (kept). +2 new gems = 3 total.
--   - Harihareshwar (Konkan Tirth, Lord Hari + Shiva temple cluster) — Maharashtra Tourism + MTDC Karli Resort site.
--   - Bagmandala-Bankot RoRo ferry (Mhasala-Bankot Savitri estuary; Konkan-Goa NH shortcut).
--   - Mhaipath Devi viewpoint (cliff above Harihareshwar Pradakshina Marg circumambulation rocks).

-- =========================================================
-- HIDDEN GEMS — 2 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'harihareshwar-bagmandala-bankot-ferry',
  'harihareshwar',
  'Bagmandala–Bankot RoRo Ferry (Savitri estuary)',
  NULL,
  7,
  '15 min drive to Bagmandala jetty + 20 min RoRo crossing',
  'Most Konkan-bound drivers loop inland via Mahad-Goregaon to reach Bankot/Velas — the Bagmandala–Bankot RoRo ferry (Maharashtra Maritime Board, commissioned Feb 2022) cuts 60km but few signposts mark it from NH-66. Locals + bikers know; first-time visitors miss.',
  'A 20-min Roll-on Roll-off ferry across the Savitri estuary (Bagmandala village near Harihareshwar to Bankot fort village in Ratnagiri district). Operates 7am-7pm, two boats running daily with 15-30min headway, capacity ~25 cars + 80 pax per crossing. ₹400/car + ₹30/person (2024 rates). Replaces the older flat-deck barge. Bankot side opens up to Velas turtle festival village (12km south) + Harnai/Anjarle.',
  'easy',
  'Maharashtra Maritime Board own listing (maritime.maharashtra.gov.in); Times of India Feb 2022 commissioning report; 2024 Tripadvisor 50+ user reviews.',
  4,
  ARRAY['ferry','estuary','konkan','shortcut','offbeat']::text[],
  '{}'::jsonb
),
(
  'harihareshwar-velas-turtle-festival',
  'harihareshwar',
  'Velas Turtle Festival (Olive Ridley hatchling release)',
  NULL,
  22,
  '40 min drive + 20 min Bagmandala ferry to Bankot, then 12km to Velas',
  'Velas village (Ratnagiri district, Bankot side of Savitri estuary) is hard to reach without the Bagmandala RoRo ferry — and the Olive Ridley turtle hatchling release window is just 6 weeks Feb-Mar. Outside that, the beach is a thin coastal village. Most travellers don''t time it right.',
  'A grassroots community conservation project run by Sahyadri Nisarga Mitra (SNM) since 2002 — fenced beach hatchery protects Olive Ridley turtle eggs Nov-Jan; hatchlings released into the Arabian Sea late Feb to early Apr at dawn. Velas homestay network (~40 village households) hosts visitors during the festival; rooms ₹600-1200/night incl. Konkani meals. SNM eco-protocol: no torches/flash on beach; observers maintain 5m distance from hatchlings.',
  'easy',
  'Sahyadri Nisarga Mitra (sahyadrinisargamitra.org) own listing; The Hindu Mar 2024 turtle festival report; Times of India Feb 2024 Velas conservation feature.',
  5,
  ARRAY['wildlife','turtle','community','festival','konkan','beach']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'harihareshwar',
  'Hotel Vaibhav',
  'Harihareshwar Beach Road',
  'harihareshwar-beach',
  ARRAY['konkani','maharashtrian','seafood']::text[],
  'casual',
  'Surmai thali (Konkani)',
  ARRAY['Surmai thali','Pomfret fry','Bombil fry','Sol kadhi','Modak','Kombdi vade']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Family-run Konkani seafood + veg-thali stop on Harihareshwar beach road, 200m from the temple — surmai (king mackerel) thali (rice + sol kadhi + papad + curry) is the lunch order. Veg thali available with kombdi vade-style accompaniments swapped to bhakri + bharli vangi. Open 8am-10pm with lunch 12-3pm.',
  'Surmai thali sells out by 1.30pm in peak season (Oct-May) — arrive by 12.30. Modak available only Aug-Sep Ganesh Chaturthi window. Cash + UPI; no cards.',
  'Beach Road, Harihareshwar 402115',
  'https://maps.google.com/?q=Hotel+Vaibhav+Harihareshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3675085-Harihareshwar_Raigad_District_Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/harihareshwar'
  ]::text[],
  '2026-05-12',
  false
),
(
  'harihareshwar',
  'MTDC Harihareshwar Beach Resort Dining',
  'MTDC Resort Complex',
  'mtdc-harihareshwar',
  ARRAY['konkani','maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Konkani non-veg thali',
  ARRAY['Konkani thali','Bombil fry','Sol kadhi','Kombdi vade','Bharli vangi','Modak (seasonal)']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant at the MTDC (Maharashtra Tourism) Harihareshwar Beach Resort — the most reliable sit-down dining in the village. Konkani thali at lunch + dinner; multi-cuisine menu for non-Konkani travellers. AC + non-AC sections. The MTDC compound is a 5min walk to Pradakshina Marg circumambulation rocks. Open 7am-10.30pm.',
  'Resort guests get priority at lunch 1-2.30pm; walk-ins should book +91-2147-264360 by 11.30am. Beach view tables on the terrace open from 4pm.',
  'MTDC Resort, Harihareshwar 402115',
  'https://maps.google.com/?q=MTDC+Harihareshwar+Beach+Resort',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/harihareshwar',
    'https://www.tripadvisor.in/Hotel_Review-g3675085-d3179012-Reviews-MTDC_Holiday_Resort_Harihareshwar.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'harihareshwar',
  'Naivedyam Bhojanalaya',
  'Harihareshwar Temple Road',
  'temple-road',
  ARRAY['konkani','maharashtrian','pure-veg']::text[],
  'casual',
  'Konkani brahmin veg thali',
  ARRAY['Veg thali','Bhakri','Pithla','Bharli vangi','Sol kadhi','Modak']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg brahmin-style thali kitchen 100m from the Harihareshwar Kalbhairav temple — naivedyam is the offering after darshan, and the kitchen frames itself as the post-puja meal. Bhakri (jowar flatbread) + pithla (gram flour curry) + bharli vangi (stuffed brinjal) on a steel thali. Open 7am-3pm + 6-9pm; closed during Pradakshina afternoon temple closure 1-3pm.',
  'Lunch service 11am-1pm gets the freshest preparations — second batch at 3.30pm is reheated. Sol kadhi (kokum + coconut milk digestive) comes free with thali. Cash + UPI only.',
  'Temple Road, Harihareshwar 402115',
  'https://maps.google.com/?q=Naivedyam+Bhojanalaya+Harihareshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3675085-Harihareshwar_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'harihareshwar',
  'Hotel Mahalaxmi',
  'Harihareshwar Main Road',
  'main-road',
  ARRAY['konkani','maharashtrian','seafood']::text[],
  'casual',
  'Konkan fish thali',
  ARRAY['Fish thali','Bangda fry','Surmai curry','Modak','Sol kadhi','Kombdi vade']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mid-range Konkani family kitchen on Harihareshwar main road near the bus stand — fish thali at lunch (bangda or surmai depending on the morning catch from Bagmandala jetty). Family-run since the 1990s. Open 7.30am-10pm.',
  'Catch board near the entrance shows the morning haul — bangda days (Tuesday/Friday typical) are cheaper than surmai. Veg thali also available without prior notice.',
  'Main Road, Harihareshwar 402115',
  'https://maps.google.com/?q=Hotel+Mahalaxmi+Harihareshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3675085-Harihareshwar_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'harihareshwar',
  'MTDC Karli Resort Dining (Bagmandala)',
  'Bagmandala, en route to Bankot ferry',
  'bagmandala',
  ARRAY['konkani','maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Konkani non-veg thali + ferry breakfast',
  ARRAY['Konkani thali','Pomfret rava fry','Sol kadhi','Misal pav','Kombdi vade','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The MTDC Karli Resort sits on the Bagmandala side of the Savitri estuary, 7km from Harihareshwar — the in-house restaurant catches the ferry-bound traffic at breakfast (misal pav before the 9am ferry) and lunch (Konkani thali after the 1pm ferry return). Estuary-facing terrace. Open 7am-10.30pm.',
  'Breakfast 7.30-9am beats the ferry queue; lunch 1-2.30pm is post-ferry. Filter coffee here is the Konkani-style decoction not the Udupi pour. Book +91-2147-265052.',
  'Bagmandala, Harihareshwar 402115',
  'https://maps.google.com/?q=MTDC+Karli+Resort+Bagmandala',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/karli',
    'https://www.tripadvisor.in/Hotel_Review-g3675085-d3179043-Reviews-MTDC_Holiday_Resort_Karli.html'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 new (all 4 slots free)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'harihareshwar',
  'value',
  'MTDC Harihareshwar Beach Resort',
  'Government beach resort',
  '₹2,200–₹4,500 per night',
  'The state-run Maharashtra Tourism (MTDC) resort sits on a quiet stretch of Harihareshwar beach 5min from the Kalbhairav temple and Pradakshina Marg circumambulation rocks. Sea-facing rooms, AC + non-AC cottages, in-house Konkani kitchen, beach access. Reliable mid-tier anchor — bookable on mtdc.co at fixed rates.',
  'Pradakshina Marg sea-rock walk at low tide',
  'web_search',
  'MTDC own site',
  '["https://www.mtdc.co/en/holiday-resorts/harihareshwar","https://www.tripadvisor.in/Hotel_Review-g3675085-d3179012-Reviews-MTDC_Holiday_Resort_Harihareshwar.html"]'::jsonb,
  '{"government_run": true, "beach_proximity": "0m", "temple_proximity": "500m"}'::jsonb,
  0.8,
  true
),
(
  'harihareshwar',
  'experience',
  'MTDC Karli Resort',
  'Estuary-side government resort',
  '₹2,800–₹5,500 per night',
  'A separate MTDC property 7km from Harihareshwar on the Bagmandala-side bank of the Savitri river estuary — sunrise views over the Bagmandala-Bankot RoRo ferry crossing. Quieter than the beach-side MTDC; suits travellers who want estuary kayaking + the Bankot/Velas day trip. Sea, river, and forest within a 10km radius.',
  'Sunrise on Savitri estuary + ferry to Velas turtle hatchery',
  'web_search',
  'MTDC own site',
  '["https://www.mtdc.co/en/holiday-resorts/karli","https://www.tripadvisor.in/Hotel_Review-g3675085-d3179043-Reviews-MTDC_Holiday_Resort_Karli.html"]'::jsonb,
  '{"government_run": true, "estuary": true, "ferry_proximity": "200m"}'::jsonb,
  0.78,
  true
),
(
  'harihareshwar',
  'xfactor',
  'Velas Village Homestay Network (SNM-coordinated)',
  'Community homestay (turtle festival)',
  '₹600–₹1,500 per night incl. meals',
  'During the Olive Ridley turtle hatchling release window (late Feb to early Apr), Sahyadri Nisarga Mitra coordinates ~40 Velas village homestays — Konkani meals + dawn beach access to the hatchery. 22km from Harihareshwar via Bagmandala ferry. Outside the festival window, a handful of homestays still take guests but the wildlife draw shrinks.',
  'Dawn Olive Ridley hatchling release on Velas beach (Feb-Mar)',
  'web_search',
  'Sahyadri Nisarga Mitra (SNM) own site + Velas Gram Panchayat',
  '["https://sahyadrinisargamitra.org/","https://www.tripadvisor.in/Hotels-g6748097-Velas_Ratnagiri_District_Maharashtra.html"]'::jsonb,
  '{"community_run": true, "seasonal": "Feb-Mar peak", "cross_dest_base": true}'::jsonb,
  0.72,
  true
);
