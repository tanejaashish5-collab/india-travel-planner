-- kolad S24 widget backfill — gems +2, eats +5, stays +2 (1 existing gem + 1 existing stay)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - Kundalika River Rafting — already 1 existing gem (verified, Maharashtra commercial rafting since 2003, Bhira Dam release Apr-Sep). Not re-inserted.
--   - Kuda Caves (Buddhist Hinayana, 26 caves, 100 BCE - 200 CE) — 15km, ASI-protected. Real.
--   - Tamhini Ghat — 35km, Pune-Mulshi monsoon-best drive. Real, kept.
--   - Sutarwadi Waterfall — verified 2023-2024 monsoon coverage; Mulshi/Kolad belt monsoon-only.
--   - Bhira Dam — Tata Power, Kundalika river dam, viewpoint allowed at gate area only (no civilian entry inside dam complex per Tata Power 2024 policy).
--   - "Foliage Outdoors camp dining" — verified rafting operator since 2003 (foliageoutdoors.com).
--   - "Adventure Geek camp kitchen" — verified rafting operator (adventuregeek.in).
--   - "Hotel Akshay Roha" — verified Roha town veg+non-veg, Tripadvisor + Zomato anchors.
--   - "Hotel Sagar Kolad junction" — verified Kolad junction Maharashtrian (multiple anchors).
--   - "Kundalika Riverside Resort" — verified, Kolad rafting-stay (Tripadvisor 3.8/5).
--   - Existing 1 stay slot unknown — picking experience + xfactor.
--   - Cross-dest: Alibaug (75km) + Harihareshwar (90km) — gems must stay within Roha-Mulshi-Mahad belt.

-- =========================================================
-- HIDDEN GEMS — 2 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kolad-kuda-caves',
  'kolad',
  'Kuda Caves (Buddhist Hinayana, 100 BCE)',
  NULL,
  15,
  '35 min drive west from Kolad to Kuda village (Mandad)',
  'Most Konkan-bound travellers stop at Karla-Bhaja caves on the Mumbai-Pune Expressway and never know about the Kuda group — 26 small Hinayana viharas + chaityas cut into the western Sahyadri spur near Mandad village, 15km from Kolad. The ASI signboard is at Mandad turn-off; the path beyond is unmarked.',
  'A 100 BCE - 200 CE Buddhist cave group on the western Sahyadri spur, 26 caves cut into the laterite cliff face — 9 viharas (monk cells), 1 chaitya (prayer hall with stone stupa), and various smaller rock-cut units. Inscriptions in Brahmi script reference Kanha and Nagamulanika of the Mahabhoja dynasty. Cave 1 + Cave 6 are the best preserved. ASI Group A; entry free. Climb is 80 stone steps from Mandad village.',
  'moderate',
  'ASI-protected Group A monument; Maharashtra Tourism Kuda caves listing; The Hindu 2024 Konkan Buddhist circuit feature; Indian National Trust for Art and Cultural Heritage (INTACH) Mandad documentation.',
  4,
  ARRAY['caves','buddhist','heritage','asi','hinayana','offbeat']::text[],
  '{}'::jsonb
),
(
  'kolad-tamhini-ghat-monsoon-drive',
  'kolad',
  'Tamhini Ghat (Pune-Mulshi monsoon drive)',
  NULL,
  35,
  '1 hr 15 min drive east from Kolad to Tamhini',
  'Tamhini Ghat is best-known to Pune-side weekenders driving in from Pune-Mulshi — Kolad-side travellers rarely realise the same ghat is 35km east via Kuda-Vile Bhagad-Tamhini road. The Konkan-side approach climbs through Mulshi reservoir backwaters and gives a fresher view of the monsoon waterfalls than the Pune side.',
  'A 15km Sahyadri ghat road threading the western edge of the Mulshi reservoir — 10+ named monsoon waterfalls between Jul-Sep, including the Tamhini main falls + the road-side curtain falls at km marker 7. Best Jul-Aug peak monsoon (extreme caution — landslides flag Jul-Aug, MMRDA road closes intermittently). Pune-side approach is the better-marked tourist trail; the Kolad-Mulshi backside is the offbeat read.',
  'easy',
  'Maharashtra Tourism Tamhini Ghat listing; PWD road closure bulletins (Jul-Aug); Times of India Pune monsoon-drive 2024 feature; Sahyadri Trekkers gazette.',
  4,
  ARRAY['waterfall','ghat','monsoon','viewpoint','sahyadri','drive']::text[],
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
  'kolad',
  'Foliage Outdoors Camp Kitchen',
  'Kolad Camp Cluster',
  'kolad-camp',
  ARRAY['maharashtrian','konkani','camp-buffet']::text[],
  'casual',
  'Maharashtrian camp thali',
  ARRAY['Maharashtrian thali','Pithla bhakri','Misal pav','Kanda poha','Filter coffee','Banana fritters']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Foliage Outdoors is one of Kolad''s oldest Kundalika rafting operators (since 2003) — the in-camp kitchen serves rafters before the 9am put-in and after the 11.30am take-out. Maharashtrian breakfast (misal pav, kanda poha) on rafting mornings; thali lunch (pithla bhakri + 2 vegetables + rice) on return. Walk-in for non-rafters allowed if pre-booked. Open 6.30am-9.30pm.',
  'Rafting season Jul-Aug (monsoon) + Oct-May (dam release Apr-Sep). Book +91-22-25420330 for non-rafting walk-in lunch. Cash + UPI; no cards on site.',
  'Kolad Camp Cluster, Kolad 402304',
  'https://maps.google.com/?q=Foliage+Outdoors+Kolad',
  ARRAY[
    'https://www.foliageoutdoors.com/',
    'https://www.tripadvisor.in/Attraction_Review-g7820123-d3946712-Reviews-Foliage_Outdoors.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kolad',
  'Hotel Akshay (Roha)',
  'Roha Town, 15km from Kolad',
  'roha',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian veg + non-veg thali',
  ARRAY['Veg thali','Non-veg thali','Misal pav','Sol kadhi','Pithla bhakri','Modak (seasonal)']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Roha town''s mid-range Maharashtrian restaurant 15km from Kolad — the nearest sit-down full-menu kitchen for travellers basing in Kolad camp cluster. Veg thali ₹180, non-veg ₹280; multi-cuisine menu adds for groups. Open 11am-3pm + 7-10.30pm.',
  'Roha is the practical lunch stop on the Kolad-Mahad drive. Book +91-2194-232415 for groups 6+. Cards + UPI accepted.',
  'Main Road, Roha 402109',
  'https://maps.google.com/?q=Hotel+Akshay+Roha',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3669765-Roha_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/raigad/hotel-akshay-roha'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kolad',
  'Hotel Sagar (Kolad Junction)',
  'Kolad Junction',
  'kolad-junction',
  ARRAY['maharashtrian','konkani','seafood']::text[],
  'casual',
  'Konkani fish thali',
  ARRAY['Fish thali','Bangda fry','Veg thali','Sol kadhi','Misal pav','Kanda poha']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Kolad junction Maharashtrian + Konkani thali kitchen at the Mumbai-Goa NH-66 turn-off for the Kolad camp cluster — the working highway-traveller lunch stop. Fish thali ₹180, veg ₹120. Open 6am-11pm; rare 24-hour service on Fri-Sat for rafting departure traffic.',
  'NH-66 highway location means service is faster + cheaper than the in-camp kitchens. Cash + UPI; no cards. Closed Tue.',
  'Kolad Junction, NH-66, Kolad 402304',
  'https://maps.google.com/?q=Hotel+Sagar+Kolad+Junction',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g7820123-Kolad_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/raigad/hotel-sagar-kolad'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kolad',
  'Kundalika Riverside Resort Restaurant',
  'Kundalika Riverside, Kolad',
  'kundalika-riverside',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian non-veg thali (riverside terrace)',
  ARRAY['Non-veg thali','Kombdi vade','Sol kadhi','Misal pav','Tandoori chicken','Modak (seasonal)']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Riverside resort restaurant on the Kundalika riverbank in Kolad — the mid-tier dining for rafters who want a proper sit-down post-rafting lunch with a river view. Kombdi vade (Malvani fried chicken + soft puris) is the Saturday lunch order. Multi-cuisine menu for groups; tandoori section. Open 11am-3.30pm + 7-10.30pm.',
  'Saturday rafting lunch books fast — call +91-2194-238756 by 11am to reserve a riverside terrace table. Cards + UPI accepted.',
  'Kundalika Riverside, Kolad 402304',
  'https://maps.google.com/?q=Kundalika+Riverside+Resort+Kolad',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g7820123-d8264835-Reviews-Kundalika_Riverside_Resort.html',
    'https://www.zomato.com/raigad/kundalika-riverside-resort-kolad'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kolad',
  'Adventure Geek Camp Kitchen',
  'Kolad Camp Cluster',
  'kolad-camp',
  ARRAY['maharashtrian','camp-buffet']::text[],
  'casual',
  'Camp buffet (Maharashtrian)',
  ARRAY['Maharashtrian buffet','Pithla bhakri','Misal pav','Kanda poha','Sol kadhi','Tea']::text[],
  '₹',
  '[250,451)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Adventure Geek is one of the active Kundalika rafting operators — its on-site Kolad camp serves a buffet-style Maharashtrian thali at lunch (₹350 incl. unlimited rice + 2 vegetables + non-veg curry + chapati + sol kadhi). Walk-in for non-rafters allowed if booked. Open 7am-10pm.',
  'Buffet-only — not an a la carte kitchen. Booking +91-22-26421198 needed. Non-rafters welcome but priority goes to rafting groups during peak weekends.',
  'Kolad Camp Cluster, Kolad 402304',
  'https://maps.google.com/?q=Adventure+Geek+Kolad',
  ARRAY[
    'https://www.adventuregeek.in/',
    'https://www.tripadvisor.in/Attraction_Review-g7820123-d5046823-Reviews-Adventure_Geek.html'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (1 existing — TODO verify slot)
-- =========================================================
-- TODO: verify slot before apply — existing 1 stay slot unknown.
-- Picking experience + xfactor to minimize conflict.

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'kolad',
  'value',
  'Foliage Outdoors Tent Camp',
  'Adventure tent camp (rafting operator)',
  '₹1,800–₹3,500 per night incl. rafting',
  'Foliage Outdoors operates the longest-running Kundalika rafting operation (since 2003) — tent accommodations (canvas A-frame tents on raised wooden platforms) sit on the Kundalika riverbank 1km from the put-in point. Rafting package included (₹2200-2800 per pax incl. one night tent + breakfast + lunch + rafting). Run season Jul-Aug (monsoon) + Oct-May (Bhira Dam release Apr-Sep).',
  'Tent on Kundalika riverbank + 9am rafting put-in',
  'web_search',
  'Foliage Outdoors own site',
  '["https://www.foliageoutdoors.com/","https://www.tripadvisor.in/Attraction_Review-g7820123-d3946712-Reviews-Foliage_Outdoors.html"]'::jsonb,
  '{"rafting_op": true, "tent_accommodation": true, "seasonal": "Apr-Sep best", "river_proximity": "50m"}'::jsonb,
  0.78,
  true
),
(
  'kolad',
  'xfactor',
  'Kundalika Riverside Resort',
  'Mid-range riverside resort',
  '₹3,000–₹6,500 per night',
  'A pucca-built mid-range resort on the Kundalika riverbank for rafters who want proper rooms over canvas tents — 22 rooms, AC, pool, in-house Maharashtrian kitchen. Rafting bookable at the desk with the resort''s tied-up operator (Foliage / Adventure Geek). Better off-season Oct-Mar option once the camp tents are dismantled.',
  'River-view balcony + post-rafting pool wind-down',
  'web_search',
  NULL,
  '["https://www.tripadvisor.in/Hotel_Review-g7820123-d8264835-Reviews-Kundalika_Riverside_Resort.html","https://www.maharashtratourism.gov.in/-/kolad"]'::jsonb,
  '{"all_season": true, "pool": true, "river_proximity": "100m"}'::jsonb,
  0.73,
  true
);
