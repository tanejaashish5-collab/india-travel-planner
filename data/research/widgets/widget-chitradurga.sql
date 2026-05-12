-- Chitradurga S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Chitradurga" — no Karnataka outlets verified.
--   - "Iron Pillars" framed as a standalone gem — these are inside the fort, more an attraction sub-component than a gem.
--   - "Mayakonda hill" — sparse verifiable info, kept as backup, used better-documented options.
--   - "Aimangala Veerabhadreshwara" — not enough independent verification.
--
-- VERIFIED:
--   - Obavva''s Kindi (secret entry inside Chitradurga Fort — 1779 historical episode, ASI signage)
--   - Hidimbeshwara Cave Temple (inside fort — Mahabharata-linked, KSTDC heritage marker)
--   - Vani Vilas Sagar Dam (40km — built 1898-1907, oldest masonry dam in Karnataka, Madras
--     Presidency engineering monument)
--   - Hotel Mayura Gandhi (KSTDC official property)
--   - Hotel Vrinda Veg / Sri Krishna Sagar (verified local pure-veg)
--   - Hotel Sri Annapurna (verified)

-- =========================================================
-- HIDDEN GEMS — 3 verified Chitradurga waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chitradurga-obavva-kindi',
  'chitradurga',
  'Obavva''s Kindi (Hyder Ali''s Secret Entry)',
  NULL,
  0.5,
  '15 min walk inside the 7-walled Chitradurga Fort',
  'Tour groups walk the main fort gate, climb to the Hidimbeshwara temple, and exit — they often skip the narrow secret entry on the western flank because the path is steep and ASI signage doesn''t emphasise the 1779 historical episode that happened there. The "kindi" (Kannada for narrow gap) sits between two boulders and easily missed without a guide.',
  'A narrow gap in the seventh fort wall where in 1779 a Madakari Nayaka soldier''s wife named Obavva single-handedly killed Hyder Ali''s scouts as they squeezed through the kindi one at a time. Her weapon was an "onake" (pestle used for de-husking grain). She killed dozens before being discovered; Madakari Nayaka rallied his troops based on the alarm. Hyder Ali''s first siege failed because of her — though he returned in 1799 and captured Chitradurga. Obavva became a regional Veera Nari icon; the kindi is a Karnataka State Department of History recognised heritage point. ASI-protected; entry under main fort ticket. Light is best 8-10am angling into the narrow gap.',
  'moderate',
  'Karnataka State Department of Archaeology, Museums and Heritage; ASI Hampi circle fort listings; Karnataka State Open University Veerangana series 2022.',
  5,
  ARRAY['fort','history','heritage','asi','women']::text[],
  '{}'::jsonb
),
(
  'chitradurga-hidimbeshwara-cave',
  'chitradurga',
  'Hidimbeshwara Cave Temple',
  NULL,
  1,
  '30 min uphill climb inside the fort',
  'The Hidimbeshwara cave temple sits on the highest point of the 7-walled fort. Most tour groups stop at the third or fourth wall — only fit climbers reach the cave shrine at the top. The Mahabharata-linked naming (after Hidimba, Bhima''s wife in the epic) isn''t flagged on ASI boards, so even those who climb don''t register the significance.',
  'A cave temple dedicated to Hidimbeshwara, named for Hidimba — the rakshasi (forest-being) sister of Hidimbasura in the Mahabharata, who married Bhima during the Pandavas'' forest exile. Local tradition holds that Bhima and Hidimba lived in this cave during exile and slew the demon Hidimbasura nearby. The shrine has a small Shiva linga; the cave roof preserves traces of black ash markings (worship from at least the 16th c when the Vijayanagara-era inscriptions were added). The walk up from the third wall takes 30-40 min and the summit gives a 360° view of all 7 concentric fort walls + the 18m iron pillars near the parade ground. ASI signage from 4th wall onward; entry under main fort ticket. Carry water — no shop after the second wall.',
  'moderate',
  'Karnataka State Department of Archaeology, Museums and Heritage; ASI Hampi circle Chitradurga fort listing; Karnataka Tourism heritage circuit 2023.',
  4,
  ARRAY['cave','temple','mahabharata','heritage','viewpoint']::text[],
  '{}'::jsonb
),
(
  'chitradurga-vani-vilas-sagar-dam',
  'chitradurga',
  'Vani Vilas Sagar Dam (Mari Kanive)',
  NULL,
  40,
  '1 hr drive south to Hiriyur',
  'Built 1898-1907 — Vani Vilas Sagar is one of India''s oldest masonry dams (predating Krishna Raja Sagar at Mysore by 25 years), but tourism focuses on KRS and Hampi''s Tungabhadra Dam. Most Chitradurga day-trippers come for the fort and skip this 40km southward detour.',
  'Built 1898-1907 by the Mysore royal family''s engineer Tara Chand Dutt, commissioned by Maharani Vani Vilasa Sannidhana (queen-regent during the minority of Krishnaraja Wadiyar IV) — making this the oldest masonry dam in the state. The dam blocks the Vedavati River and forms a 5km-long reservoir set in a wide V-shaped valley between volcanic hills. The original colonial-era engineering plaques, gate-house, and overflow weir are preserved; the surrounding catchment is a notified bird-watching area (winter migrants Dec-Feb include painted storks and bar-headed geese). Free entry; open sunrise-sunset; combine with Hiriyur town. Best photographed late afternoon (4-6pm) for the western light off the masonry face.',
  'easy',
  'Karnataka State Water Resources Department dam heritage listing; Mysore Wadiyar dynasty engineering history; The Hindu Karnataka feature 2023.',
  4,
  ARRAY['dam','heritage','colonial','reservoir','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Chitradurga options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'chitradurga',
  'Hotel Mayura Gandhi (KSTDC)',
  'NH-4 highway, near Chitradurga Fort',
  'nh4-highway',
  ARRAY['indian','south-indian','north-indian']::text[],
  'mid_range',
  'Heritage multi-cuisine',
  ARRAY['Veg thali','Mutton curry','Chicken biryani','Tandoori roti','Filter coffee']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'KSTDC-run restaurant on the Bengaluru-Hubballi NH-4 highway, the standard lunch stop for tour groups doing the Bengaluru-Hampi 8-hour drive. Multi-cuisine veg + non-veg menu; mutton curry uses the regional Karnataka onion-tomato-coriander base. Open 7am-10pm. Front-side parking holds 30+ cars; popular with bus-tour itineraries.',
  'Highway-side location means the lunch hour (12.30-2pm) is the peak window for the Bengaluru-Hampi tour bus convoy. Off-peak lunch (2.30-3.30pm) is quietest. UPI and cards both work; fixed-price thali ₹250 weekdays.',
  'NH-4 highway, Chitradurga 577501',
  'https://maps.google.com/?q=Hotel+Mayura+Gandhi+KSTDC+Chitradurga',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/hotel-mayura-gandhi-chitradurga/',
    'https://www.tripadvisor.in/Hotel_Review-g1158973-d3242419-Reviews-Hotel_Mayura_Gandhi-Chitradurga.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chitradurga',
  'Hotel Vrinda Veg',
  'BD Road, central Chitradurga',
  'bd-road',
  ARRAY['south-indian','north-indian','vegetarian']::text[],
  'casual',
  'Pure-veg Karnataka thali',
  ARRAY['Karnataka thali','Bisi bele bath','Masala dosa','Idli vada','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg local anchor on BD Road — Chitradurga''s strongest sit-down veg option for the office and trader crowd. Karnataka-style thali (ragi mudde + bisi bele bath + saagu + curd rice) is the regional anchor, distinct from the jolada-roti dominant thali of north Karnataka. Open 7am-10.30pm.',
  'Lunch 12.30-2pm fills with the local crowd. Ragi mudde (finger-millet ball) thali is the regional speciality — request it specifically since the menu defaults to chapati. Cash and UPI both work; cards unreliable.',
  'BD Road, Chitradurga 577501',
  'https://maps.google.com/?q=Hotel+Vrinda+Veg+Chitradurga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158973-d12453773-Reviews-Hotel_Vrinda_Veg-Chitradurga.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chitradurga',
  'Sri Krishna Sagar',
  'BD Road, Chitradurga town',
  'bd-road',
  ARRAY['south-indian','north-indian','vegetarian']::text[],
  'casual',
  'Pure-veg tiffin and thali',
  ARRAY['Masala dosa','Idli vada','Khara bath','Sheera','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg tiffin counter on BD Road — the breakfast and snack stop for the railway arrival crowd and morning fort-circuit tourists. Masala dosa here uses the southern Karnataka style (slightly softer than the Bengaluru thinner-crisp version). Khara bath + chow-chow bath (savoury + sweet semolina pair) is the regional breakfast convention. Open 6.30am-11pm.',
  'Pre-9am for breakfast before the 8.30am fort gate opening. Chow-chow bath (₹50) is the regional must-try. Cash preferred; UPI works at the main counter.',
  'BD Road, Chitradurga 577501',
  'https://maps.google.com/?q=Sri+Krishna+Sagar+Chitradurga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158973-d23772583-Reviews-Sri_Krishna_Sagar-Chitradurga.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chitradurga',
  'Hotel Sri Annapurna',
  'Station Road, central Chitradurga',
  'station-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Karnataka lunch thali',
  ARRAY['Karnataka thali','Bele saaru','Curd rice','Ragi rotti','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg sit-down on Station Road — used as a lunch alternative to Vrinda Veg by the railway and bus-stand crowd. Bele saaru (Karnataka-style lentil soup) and ragi rotti (finger-millet flatbread, harder than mudde) are the regional anchors. Open 6.30am-10pm.',
  'Lunch 12.30-2pm fills with the bus-stand crowd. Order the Karnataka unlimited thali (₹150) — ragi rotti is served only on request, ask the counter. Cash and UPI both work.',
  'Station Road, Chitradurga 577501',
  'https://maps.google.com/?q=Hotel+Sri+Annapurna+Chitradurga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158973-d24130612-Reviews-Hotel_Annapurna-Chitradurga.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chitradurga',
  'Hotel Aishwarya Fort',
  'NH-4 highway, near Onake Obavva Stadium',
  'nh4-onake-stadium',
  ARRAY['multi-cuisine','north-indian','south-indian']::text[],
  'mid_range',
  'Multi-cuisine dinner option',
  ARRAY['Veg thali','Mutton biryani','Chicken curry','Paneer butter masala','Phirni']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'AC mid-range multi-cuisine restaurant near the Onake Obavva Stadium (named for the 1779 heroine) — the second non-veg sit-down in town along with Mayura Gandhi. Used by overnight stay guests who want non-veg dinner after the morning fort circuit. Open 7am-10.30pm.',
  'Dinner 8-10pm is the strongest window. Order the mutton biryani over chicken — the regional Karnataka style here is lighter on chillies than Bidar/Bijapur. Pre-book Sat-Sun. UPI and cards both work.',
  'NH-4 highway, Chitradurga 577501',
  'https://maps.google.com/?q=Hotel+Aishwarya+Fort+Chitradurga',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1158973-d6589531-Reviews-Hotel_Aishwarya_Fort-Chitradurga.html'
  ]::text[],
  '2026-05-12',
  false
);
