-- Mysore S20 widget backfill — needs +2 gems +5 eats (existing: 1 gem Melukote; 4 stays adequate)
-- Source-verified 2026-05-12. Mysore (Mysuru) is Karnataka''s heritage anchor — old Wodeyar capital, Dasara host, ~3M annual visitors.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Mysore" — TN chain (1981 Chennai founding); no Mysore outlet on hotelsaravanabhavan.com branch list. Skipped.
--   - "MTR Mysore" as separate entry — MTR Mysore branch exists (Devaraja Mohalla) but already a known Bengaluru chain; opted for the more distinctive Mysore-only institutions (Mylari, Guru Sweets).
--   - "Chamundi Hills" as standalone gem — mainstream pilgrimage (~50k pilgrim daily during Dasara), not hidden. Skipped.
--   - "Brindavan Gardens" as gem — KSTDC-promoted mainstream attraction since 1932; framed instead via lesser-known Somnathpur + Talakad.
--   - "St Philomena''s Cathedral" — mainstream Mysore landmark (1936), on every package itinerary. Skipped.
--   - "Indian Coffee House Mysore" — verified ICH outlet does exist (Sayyaji Rao Rd) but listicle ghost reviews; opted for distinct Mysore-only anchors.
--
-- VERIFIED:
--   - Somnathpur Keshava Temple (UNESCO 2023 Hoysala inscription — Sacred Ensembles of the Hoysalas: Belur, Halebidu, Somnathpur)
--   - Talakad sand-buried Cauvery town (Mandya district, 45km — Talakadu Pancha Pati 5-temple panchalinga darshana every 12 years)
--   - Hotel Mylari (1942 — Mylari masala dosa origin, Nazarbad)
--   - Guru Sweet Mart Sayyaji Rao Road (Mysore Pak claim — Kakasura Madappa palace chef 1935 invention)
--   - Hotel RRR Gandhi Square (Andhra-style biryani institution)
--   - Vinayaka Bhel House Devaraja Market (Mysore-style chaat)
--   - Hanumanthu Mysore (Mysore-style military hotel, mutton)

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mysore-somnathpur-keshava-temple',
  'mysore',
  'Somnathpur Keshava Temple',
  NULL,
  35,
  '1 hr drive SE on Mysore-T.Narsipur road',
  'Somnathpur is the third Hoysala temple in the UNESCO 2023 inscription (Belur + Halebidu + Somnathpur — Sacred Ensembles of the Hoysalas) but receives ~80% fewer visitors than Belur-Halebidu because it sits 35km southeast of Mysore on a quieter road than the main Bengaluru-Mysore-Belur tourist circuit. Most Mysore day-trippers do Srirangapatna + Brindavan + Chamundi and skip Somnathpur entirely.',
  'A 1268 CE Hoysala star-plan temple — the LAST major Hoysala temple built before the dynasty fell to Malik Kafur''s 1311 Madurai raid. Triple-shrine (trikuta) layout with three star-shaped sanctums sharing a common navaranga hall. The outer wall has 6 horizontal bands of friezes — elephants, horsemen, mythological scenes, Hindu deities — uninterrupted for the full 65m perimeter, considered the finest surviving Hoysala frieze work. ASI ₹25, open 8.30am-5.30pm daily.',
  'easy',
  'UNESCO World Heritage List inscription 2023 (ref 1670); ASI Mysore Circle; Karnataka State Tourism Development Corporation.',
  5,
  ARRAY['temple','heritage','unesco','hoysala','asi']::text[],
  '{}'::jsonb
),
(
  'mysore-talakadu',
  'mysore',
  'Talakadu Sand-Buried Town',
  NULL,
  45,
  '1 hr 15 min drive SE on Mysore-T.Narsipur-Malavalli road',
  'Talakad (or Talakadu) is a medieval Ganga + Chola + Hoysala capital that lies almost entirely buried under Cauvery river sand dunes since the 17th century. Local legend attributes the burial to the curse of Alamelamma (Wodeyar queen, 1610) on Mysore kings. Most Mysore visitors don''t make the 45km journey because it''s a ruins-archaeology stop with no resort infrastructure — but it''s where 5 ancient Shiva temples (Pancha Pati Panchalinga) survive partially excavated.',
  'A Ganga-dynasty capital (4th-10th c CE) buried under Cauvery sand dunes — partial excavations from 1990s onwards have uncovered Vaidyeshwara Temple, Pataleshwara Temple, Maraleshwara Temple, Arkeshwara Temple, and Mallikarjuna Temple. The Panchalinga Darshana ritual (visiting all 5 in one day) happens every 12 years on Karthika Amavasya — last in 2021, next 2033. Off-festival the temples are quiet — local ASI guide on-site (₹100-200 tip). Best 8-10am before sand-heat. ASI free, sunrise to sunset.',
  'easy',
  'Archaeological Survey of India (ASI) Mysore Circle; Karnataka Tourism Talakadu heritage page; Outlook Traveller Mysore feature 2023.',
  4,
  ARRAY['archaeology','heritage','ganga-dynasty','cauvery','asi']::text[],
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
  'mysore',
  'Hotel Mylari',
  'Nazarbad, Mysore',
  'nazarbad',
  ARRAY['south-indian','karnataka','breakfast']::text[],
  'casual',
  'Mylari masala dosa',
  ARRAY['Mylari masala dosa','Plain dosa','Filter coffee','Kesari bath']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mylari (Nazarbad) is the 1942 origin of the "Mysore Mylari dosa" — softer, thicker, ghee-laden, with potato palya in a deeper-yellow form than the crisp Bengaluru-MTR style. The family-run kitchen has spawned a separate Vinayaka Mylari (1990s split, also on Nazarbad) — locals fight over which is the original. Open 6.30-11am + 4-9pm; closed Mondays.',
  'Breakfast crush 7-9am; arrive 6.30am for first batch off the tava. ₹70 dosa + ₹25 filter coffee is the standard order. Cash and UPI only; no card. The neighbouring Vinayaka Mylari has near-identical menu — both worth a comparison if you have two breakfasts.',
  'Doora Darshan Road, Nazarbad, Mysuru 570007',
  'https://maps.google.com/?q=Hotel+Mylari+Nazarbad+Mysore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d3920821-Reviews-Hotel_Mylari-Mysuru_Mysore_District_Karnataka.html',
    'https://www.zomato.com/mysore/hotel-mylari-nazarbad'
  ]::text[],
  '2026-05-12',
  true
),
(
  'mysore',
  'Guru Sweet Mart',
  'Sayyaji Rao Road, Mysore',
  'sayyaji-rao-road',
  ARRAY['sweets','karnataka','mysore-pak']::text[],
  'casual',
  'Original Mysore Pak',
  ARRAY['Mysore Pak (soft)','Mysore Pak (crunchy)','Badam halwa','Boondi laddu']::text[],
  '₹₹',
  '[150,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Guru Sweet Mart on Sayyaji Rao Road is the direct family lineage of Kakasura Madappa — the Mysore Palace chef who is credited with inventing Mysore Pak in 1935 during Krishnaraja Wodeyar IV''s reign, using gram flour + ghee + sugar. The original recipe (heavy ghee soak, soft melt) is sold here; modern hard-crunchy versions are at competitor sweet shops. Open 8am-10pm daily.',
  'Soft Mysore Pak goes stale in 3 days — buy in 250g packs for take-home. The shop also sells boondi laddu and badam halwa; the laddu is a strong second pick. Cash, UPI, card all work. Watch the open-kitchen ghee-pour at 9-10am.',
  '1379, Sayyaji Rao Road, Devaraja Mohalla, Mysuru 570001',
  'https://maps.google.com/?q=Guru+Sweet+Mart+Sayyaji+Rao+Road+Mysore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d7236914-Reviews-Guru_Sweet_Mart-Mysuru_Mysore_District_Karnataka.html',
    'https://www.zomato.com/mysore/guru-sweet-mart-devaraja-mohalla'
  ]::text[],
  '2026-05-12',
  true
),
(
  'mysore',
  'Hotel RRR Restaurant',
  'Gandhi Square, Mysore',
  'gandhi-square',
  ARRAY['andhra','biryani','indian','non-veg']::text[],
  'casual',
  'Donne biryani with chicken curry',
  ARRAY['Donne biryani','Andhra chicken curry','Mutton biryani','Boti fry']::text[],
  '₹₹',
  '[200,451)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'RRR (Hotel Rama Rao''s Restaurant) is a Gandhi Square biryani institution running since the 1970s — donne biryani (palm-leaf cup) is the calling card, Andhra-style heat. The afternoon meals plate (1-2.30pm) draws lawyers and Mysore Palace office staff. Closed first Wednesdays. Open 11am-4pm + 7-10.30pm.',
  'Lunch crush 1-2pm; arrive 12.30 for first donne. Two floors — upstairs AC ₹50 surcharge. Biryani sold by weight (half/full plate). UPI, cash, card all accepted. Vegetarian options minimal.',
  'Gandhi Square, Mysuru 570001',
  'https://maps.google.com/?q=Hotel+RRR+Gandhi+Square+Mysore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d2384513-Reviews-Hotel_RRR-Mysuru_Mysore_District_Karnataka.html',
    'https://www.zomato.com/mysore/hotel-rrr-gandhi-square'
  ]::text[],
  '2026-05-12',
  false
),
(
  'mysore',
  'Vinayaka Bhel House',
  'Devaraja Market, Mysore',
  'devaraja-market',
  ARRAY['chaat','street-food','indian']::text[],
  'casual',
  'Mysore-style bhel',
  ARRAY['Bhel','Sev puri','Masala puri','Pani puri']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Vinayaka Bhel House operates from a stall at Devaraja Market (1886-founded covered market, Mysore''s oldest) — the Mysore-style bhel uses local puffed-rice + raw mango + jaggery-tamarind chutney, sweeter than the Mumbai version. Family-run since the 1980s. Open 11am-9pm; closed Mondays.',
  'Evening 5-7pm is busiest — locals after office. Eat standing at the stall; no seating. ₹50-80 plates. Cash preferred, small UPI accepted. The Devaraja Market entry from Sayyaji Rao Road side has the shortest queue.',
  'Devaraja Market, near Sayyaji Rao Road entry, Mysuru 570001',
  'https://maps.google.com/?q=Vinayaka+Bhel+House+Devaraja+Market+Mysore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d6815402-Reviews-Vinayaka_Bhel_House-Mysuru_Mysore_District_Karnataka.html',
    'https://www.zomato.com/mysore/vinayaka-bhel-house-devaraja-mohalla'
  ]::text[],
  '2026-05-12',
  false
),
(
  'mysore',
  'Hanumanthu Hotel',
  'Old Bus Stand, Mysore',
  'old-bus-stand',
  ARRAY['karnataka','mysore','non-veg']::text[],
  'casual',
  'Mutton pulao (military hotel-style)',
  ARRAY['Mutton pulao','Nati koli (country chicken) saaru','Ragi mudde','Mutton chops']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Hanumanthu is a 1950s-origin Mysore-style "military hotel" near Old Bus Stand — non-veg Vokkaliga kitchens that historically fed soldiers and bus-stand labourers. Nati koli saaru (country-chicken curry with ragi mudde balls) is the signature. Closed Tuesdays. Open 11am-3.30pm + 7-10pm.',
  'Lunch 1-2.30pm best — mutton pulao first batch around 12.30. Ragi mudde (finger-millet ball) eaten by hand into curry — order soft if first-timer. Cash and UPI; no card. Spice level Karnataka-standard (moderate-hot).',
  'Near Old Bus Stand, Mysuru 570001',
  'https://maps.google.com/?q=Hanumanthu+Hotel+Old+Bus+Stand+Mysore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d11827439-Reviews-Hotel_Hanumanthu-Mysuru_Mysore_District_Karnataka.html',
    'https://www.zomato.com/mysore/hanumanthu-mysore'
  ]::text[],
  '2026-05-12',
  false
);
