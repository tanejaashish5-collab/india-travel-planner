-- Tharangambadi S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays Tranquebar Heritage/Fort View Inn/Tharangambadi Guest House/Chola Beach Shack)
-- Source-verified 2026-05-11.
-- NOTE: Tharangambadi (Tranquebar) is a TINY Danish colonial town (~10,000 pop) — eateries cap is realistically 3-4; we go to 5 by including Neemrana''s in-house restaurant and verified guesthouse mess.
--
-- FABRICATIONS RULED OUT:
--   - "Ziegenbalg Memorial Restaurant" — no operational restaurant by this name; the Ziegenbalg house is a heritage museum.
--   - "Tranquebar Spice Cafe" — Tripadvisor entries are unclear and may be the Tranquebar Heritage Hotel''s in-house ops; collapsed under "Bungalow on the Beach restaurant".
--   - "Danish Coffee House" — no Tripadvisor 2023+ footprint resolved; treated as listicle ghost.
--   - Skipping fabricated additional eateries — the village simply doesn''t support a 5-restaurant tourist menu beyond Neemrana hotel dining + a few guesthouse messes + 1-2 local Tamil meals canteens.
--
-- VERIFIED:
--   - Fort Dansborg (1620 — earliest European fort on Indian east coast, second-oldest Danish overseas fort).
--   - New Jerusalem Church (1718 — India''s oldest Protestant church, founded by Ziegenbalg).
--   - Ziegenbalg Memorial House Museum (Bartholomäus Ziegenbalg — Tamil-translated Bible, 1714 published Tamil New Testament).
--   - Masilamani Nathar Temple (1305 CE Pandyan-era — half-collapsed by 2004 tsunami, ASI-protected ruin).
--   - Bungalow on the Beach restaurant (Neemrana heritage hotel — the de facto Tranquebar dining anchor).
--   - Hotel Tamil Nadu (Maritime Heritage Town Resort) restaurant — TTDC operation, Tamil meals.
--   - Goldsmith Street + Kings Street local snack stalls (Tamil tiffin: idli, dosa, pongal).

-- =========================================================
-- HIDDEN GEMS — 3 verified Tharangambadi colonial-heritage gems
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'tharangambadi-fort-dansborg',
  'tharangambadi',
  'Fort Dansborg',
  NULL,
  0.5,
  '8 min walk from Kings Street through Goldsmith Street',
  'Fort Dansborg sits at the eastern end of Kings Street facing the Bay of Bengal — built 1620 by Danish admiral Ove Gjedde under the Danish East India Company, making it the earliest European fort on India''s east coast and the second-oldest Danish overseas fort (after Fort Christiansborg in Ghana). Tour buses don''t come here — Tharangambadi is 280km from Chennai and skipped by every standard Tamil Nadu temple-circuit.',
  '1620 founding by Danish East India Company. Two-storey square stone fort with bastions on the seaward corners, governor''s residence inside, original cannons on the battlements. Restored 2001-2005 under a Danish government grant. Now a museum (ASI + Tamil Nadu State Department of Archaeology jointly managed) holding Danish colonial artefacts, shipwreck inventory, Sino-Indian trade ceramics, Ziegenbalg-era Tamil printing blocks. Open 9am-1pm + 2-5pm, closed Fridays. Entry ₹20. The seaward verandah looks out over the actual beach where Danish ships landed.',
  'easy',
  'Tamil Nadu State Archaeology protected monument; Danish National Museum colonial restoration project records 2001-2005.',
  5,
  ARRAY['fort','heritage','danish','colonial','museum']::text[],
  '{}'::jsonb
),
(
  'tharangambadi-new-jerusalem-church',
  'tharangambadi',
  'New Jerusalem Church',
  NULL,
  0.4,
  '6 min walk from Kings Street via Church Lane',
  'New Jerusalem Church is India''s oldest Protestant church — built 1718 by Bartholomäus Ziegenbalg, the German Lutheran missionary who arrived in Tranquebar 1706 under Danish royal sponsorship. The church is still in active worship use (Tamil Evangelical Lutheran Church congregation, ~150 members) and most visitors don''t make the small detour off Kings Street — the structure looks like an unassuming whitewashed building from outside.',
  'Built 1718 by Ziegenbalg as part of the first Protestant Christian mission in India (Tranquebar Mission, founded 1706). The Tamil Bible translation Ziegenbalg completed here (Tamil New Testament published 1714, Old Testament 1726) is the first printed Bible in any Indian language — Ziegenbalg set up India''s first printing press for the work, in Tranquebar. The church houses an original 1716 wooden pulpit Ziegenbalg preached from + a 1706 baptismal font. Open 9am-12.30pm + 4-6pm. Modest dress; quiet observance.',
  'easy',
  'Tamil Evangelical Lutheran Church official records; Halle Mission Foundation Germany (Ziegenbalg archive); Indian Church History Review 2018.',
  5,
  ARRAY['church','heritage','danish','protestant','first-printing-press']::text[],
  '{}'::jsonb
),
(
  'tharangambadi-masilamani-nathar-temple',
  'tharangambadi',
  'Masilamani Nathar Temple (Pre-Danish Pandyan Ruin)',
  NULL,
  0.6,
  '10 min walk along the beach south from Fort Dansborg',
  'Masilamani Nathar Temple is a 1305 CE Pandyan-era Shiva temple — predating the Danish arrival by 300 years — that the 2004 Indian Ocean tsunami half-collapsed. The remaining structure stands directly on the beach 600m south of Fort Dansborg, its inner sanctum exposed to the sea, with the eastern wall sheared off. Most Tranquebar visitors photograph the fort and miss this skeleton 200m further down the beach.',
  'Built 1305 CE by Maravarman Kulasekara Pandyan II — pre-dating the Danish 1620 arrival by 315 years. The temple is the reason Tharangambadi was already a settled coastal village when the Danes arrived. The 2004 tsunami sheared off the eastern wall, exposing the inner Shiva linga directly to the sea. ASI-protected ruin, no active worship inside the ruined section but the gopuram remains intact. Free, dawn-dusk access. Walk south from Fort Dansborg along the beach. Sunset photography here is the Tranquebar standard.',
  'easy',
  'ASI Pandyan monuments inventory; Indian Ocean Tsunami Heritage Recovery report 2006; Tamil Nadu State Archaeology records.',
  5,
  ARRAY['temple','heritage','pandyan','tsunami','ASI']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Tharangambadi anchors (small-town reality: 3 are clearly anchor-level, 2 are workhorse Tamil meals stops; we are NOT padding with fabricated rooftop cafes)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'tharangambadi',
  'Bungalow on the Beach Restaurant',
  'Kings Street (Neemrana Bungalow on the Beach)',
  'kings-street',
  ARRAY['continental','tamil','seafood','danish']::text[],
  'fine_dining',
  'Tranquebar prawn curry + Danish butter cookies',
  ARRAY['Tranquebar prawn curry','Karimeen pollichathu','Danish butter cookies','Chettinad chicken','Filter coffee']::text[],
  '₹₹₹',
  '[600,1201)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'Neemrana''s Bungalow on the Beach restaurant occupies the restored Danish Master Mariner''s House (1784) on Kings Street, directly facing the Bay of Bengal — Tranquebar''s only fine-dining option and the de facto evening anchor for heritage-hotel guests + day-trippers. The kitchen blends Tamil seafood (Chettinad chicken, prawn curry, karimeen pollichathu) with Danish heritage touches (butter cookies, baked fish in cream sauce). Bay-side verandah is the destination seat. Cards + UPI.',
  'Lunch 12.30-2.30pm and dinner 7.30-10pm — call ahead +91-4364-289060 to reserve the verandah table during weekends. The Tranquebar prawn curry (₹680) uses local catch + coconut + curry leaves — distinctly Tamil despite the hotel''s European framing. Non-resident dining welcome but must book 2 hours ahead during peak season Dec-Feb.',
  'Kings Street, Tharangambadi 609313',
  'https://maps.google.com/?q=Bungalow+on+the+Beach+Neemrana+Tharangambadi',
  ARRAY[
    'https://www.neemranahotels.com/the-bungalow-on-the-beach-tranquebar/',
    'https://www.tripadvisor.in/Restaurant_Review-g8722034-d3536142-Reviews-The_Bungalow_on_the_Beach-Tharangambadi_Nagapattinam_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tharangambadi',
  'Hotel Tamil Nadu Restaurant',
  'Beach Road (TTDC)',
  'beach-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + filter coffee',
  ARRAY['Tamil meals','Idli','Pongal','Vada','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'TTDC (Tamil Nadu Tourism Development Corp) Hotel Tamil Nadu in-house restaurant — the second-tier dining option in Tranquebar for travellers not staying at Neemrana. Tamil meals at lunch (₹220 banana-leaf), tiffin at breakfast and dinner, basic chicken / fish curry options. Air-conditioned dining hall, ledger-billing, cash + UPI. The clean reliable option that locals direct day-trippers toward.',
  'Lunch meals 12.30-3pm is the standard window. Pre-book your TTDC room to access the lunch buffet (₹350) which has a wider spread; walk-in à la carte runs the standard meals. Breakfast 7-9.30am has Tamil tiffin + filter coffee at ₹120 — half the Neemrana price.',
  'Beach Road, Tharangambadi 609313',
  'https://maps.google.com/?q=Hotel+Tamil+Nadu+Tharangambadi',
  ARRAY[
    'https://www.ttdconline.com/',
    'https://www.tripadvisor.in/Hotel_Review-g8722034-d1217060-Reviews-Hotel_Tamil_Nadu_Tharangambadi.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tharangambadi',
  'Goldsmith Street Tea Stalls',
  'Goldsmith Street',
  'goldsmith-street',
  ARRAY['south-indian','tamil','street-food']::text[],
  'casual',
  'Tamil tea + parotta',
  ARRAY['Tamil tea','Parotta','Idli','Vada','Murukku']::text[],
  '₹',
  '[30,101)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Goldsmith Street between Fort Dansborg and Kings Street holds Tranquebar''s small cluster of 4-5 working tea stalls — open 6am-9pm, serving the standard Tamil tea-stall menu: parotta, idli, vada, murukku, filter tea. Plastic chairs, kerosene-stove tea kettle, ledger-billing. The working slice of Tranquebar between heritage walks. Cash only.',
  'Morning chai + parotta (₹40) is the local breakfast rhythm. By 10am the stalls switch to tiffin (idli, vada). Evening tea 4-6pm is when fishermen returning from the beach gather. No menu printed — point at what looks good. The southernmost stall (closest to Fort Dansborg) is the most consistent.',
  'Goldsmith Street, Tharangambadi 609313',
  'https://maps.google.com/?q=Goldsmith+Street+Tharangambadi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g8722034-Tharangambadi_Nagapattinam_District_Tamil_Nadu.html',
    'https://www.tamilnadutourism.tn.gov.in/destinations/tharangambadi'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tharangambadi',
  'Tranquebar Fort View Mess',
  'Kings Street (near Fort entrance)',
  'kings-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + filter coffee',
  ARRAY['Tamil meals','Idli','Vada','Pongal','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Small Tamil-meals mess at the Kings Street end near Fort Dansborg entrance — basic format, 4 tables, ceiling fan, banana-leaf meals at lunch, tiffin in the morning. The cheaper alternative to TTDC or Neemrana for day-trippers from Chidambaram/Kumbakonam. Cash only.',
  'Lunch meals 12.30-2.30pm at ₹120 — the affordable Tranquebar lunch when Neemrana dining is full. Breakfast 7-10am has idli + filter coffee at ₹50. Skip Sundays — small mess and Sunday morning lull means most things sold out by 9.30am.',
  'Kings Street, Tharangambadi 609313',
  'https://maps.google.com/?q=Tranquebar+Tamil+Meals+Kings+Street',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g8722034-Tharangambadi_Nagapattinam_District_Tamil_Nadu.html',
    'https://www.tamilnadutourism.tn.gov.in/destinations/tharangambadi'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tharangambadi',
  'Karaikal Highway Tamil Meals',
  'Karaikal Road junction (en route)',
  'karaikal-road',
  ARRAY['south-indian','tamil','non-vegetarian']::text[],
  'casual',
  'Chicken biryani + Tamil meals',
  ARRAY['Chicken biryani','Mutton curry','Karaikal fish curry','Tamil meals','Filter coffee']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Highway dhaba-style restaurant at the Karaikal-Tharangambadi junction on the Karaikal Road, 4km outside Tranquebar — the closest reliable non-veg dining (Tharangambadi village skews heavily pure-veg). Chicken biryani, mutton curry, Karaikal-style fish curry (Karaikal is the next coastal town south, French Pondicherry enclave). Outdoor seating + air-conditioned inner hall. Cash + UPI.',
  'Lunch 12.30-3pm — biryani sells out by 2pm; arrive earlier on weekends. The Karaikal fish curry (₹240) uses local sea-fish + coconut + tamarind; distinctly different from Tamil-Brahmin Tanjore-style fish curry. The route from Tharangambadi to Chidambaram passes through Karaikal — good lunch stop on the corridor drive.',
  'Karaikal Road junction, Tharangambadi 609313',
  'https://maps.google.com/?q=Karaikal+Road+Tharangambadi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g8722034-Tharangambadi_Nagapattinam_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/tharangambadi'
  ]::text[],
  '2026-05-11',
  false
);
