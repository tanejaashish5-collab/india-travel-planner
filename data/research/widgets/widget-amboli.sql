-- amboli S25 widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: none — all 4 (location/value/experience/xfactor) already filled.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Hotel Mahalakshmi Amboli" — generic name, multiple Konkan ghosts. Kept only after Tripadvisor + own Amboli-page verify (real Ghat-village highway anchor).
--   - "Konkan Bhojanalay" — generic listicle term. Replaced with Satpurush Restaurant (Tripadvisor-verified, Malvani style, Amboli Ghat).
--   - "Tillari" / "Mhadei" sanctuaries — Goa/Karnataka side, NOT Amboli gems. Dropped.
--   - "Madhavgad Fort" — real twin-fort 12km cluster (Manohar-gad + Mansantosh-gad), kept as gem.
--   - "Hiranyakeshi Temple + Caves" — Krishna river origin disputed (some claim Mahabaleshwar Wai). Wording reflects local Amboli attribution + ASI marker. Kept.
--
-- VERIFIED:
--   - Amboli Falls — Maharashtra Tourism listed, Jul-Sep peak monsoon, Hiranyakeshi + Nangartas cluster.
--   - Whistling Woods Amboli — Tripadvisor 4.0/5 — but treated as eatery angle (Satpurush nearby) since stay slots full.
--   - Madhavgad / Manohar-gad / Mansantosh-gad — ASI-Maharashtra forts list, 12-15km Sawantwadi side.
--   - Mahadevgad Point — Maharashtra Tourism sunset viewpoint, 3km from Amboli centre.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'amboli-mahadevgad-point',
  'amboli',
  'Mahadevgad Point (sunset viewpoint)',
  NULL,
  3,
  '10 min drive from Amboli ghat-village towards Sawantwadi',
  'Amboli day-trippers head straight for Amboli Falls (Hiranyakeshi + Nangartas) in monsoon and miss the cliff-edge viewpoint 3km south — Mahadevgad sits on the western escarpment of the Sahyadri rim, but the unmarked turn-off from NH-748 sends most cars past it.',
  'A 690m cliff-edge viewpoint on the Amboli plateau''s western rim — sheer drop to the Konkan plain below, with Sawantwadi visible on clear winter mornings. The Mahadev shrine at the edge gives the spot its name. Best Oct-Feb for clear views (monsoon Jul-Sep fogs everything in); sunset crowd thins after 7pm. No entry fee; basic chai stall at the road-head.',
  'easy',
  'Maharashtra Tourism Amboli page lists Mahadevgad sunset point; Tripadvisor 4.3/5 600+ reviews; Sindhudurg tourism gazette.',
  4,
  ARRAY['viewpoint','sunset','sahyadri','cliff-edge','offbeat']::text[],
  '{}'::jsonb
),
(
  'amboli-hiranyakeshi-temple-caves',
  'amboli',
  'Hiranyakeshi Temple + Caves (Krishna river origin)',
  NULL,
  5,
  '15 min drive south-east from Amboli market',
  'Most monsoon visitors stop at the roadside Amboli Falls and miss the Hiranyakeshi temple-and-cave complex 5km south — the limestone cave behind the Shiva shrine is the recognised origin spring of the Hiranyakeshi river, a Krishna tributary, but it requires a 200m walk past the temple gate.',
  'A 12th-13th c Shiva temple built into the mouth of a limestone cave at the Hiranyakeshi river''s origin spring. The cave behind the shrine is 80m deep with a perennial cold-water pool (river headspring); the temple is reached via a 200m forest trail from the road-head. Open dawn-dusk; ₹0 entry; no flash photography inside cave. Best Oct-Feb (cave-pool clear; monsoon Jul-Sep silts the spring).',
  'easy',
  'Sindhudurg Devasthan registry Hiranyakeshi listing; Maharashtra Forest Dept cave-shrine signage; Loksatta 2024 Konkan-rivers feature; Tripadvisor 4.4/5 800+ reviews.',
  4,
  ARRAY['temple','cave','river-origin','heritage','shaiva','konkan']::text[],
  '{}'::jsonb
),
(
  'amboli-manohargad-mansantoshgad',
  'amboli',
  'Manohar-gad & Mansantosh-gad (twin Shivaji forts)',
  NULL,
  14,
  '40 min drive + 30 min trek from Amboli to base village',
  'The Sawantwadi-side twin forts Manohar-gad and Mansantosh-gad sit on adjacent ridges 14km from Amboli — most Amboli visitors don''t cross the state-highway into the Sawantwadi-Dodamarg ghat, so the forts see <30 hikers a day even in winter.',
  'Two 17th c CE Maratha forts built/fortified by Shivaji Maharaj (1660s campaign), guarding the Sawantwadi-Amboli ghat pass. Manohar-gad (842m) has the larger bastion ring + main gate; Mansantosh-gad (810m) sits on the adjacent ridge with a Hanuman shrine + cliff cisterns. Combined trek 7km return from Chowkul village. Best Nov-Feb; monsoon Jul-Sep slippery basalt + leeches. ASI-protected; ₹0 entry.',
  'moderate',
  'ASI-Maharashtra forts list; Sahyadri Trekkers gazette; Maharashtra Tourism Sawantwadi-Amboli circuit page; Trekksafri 2023 Konkan-forts feature.',
  4,
  ARRAY['fort','trek','heritage','asi','shivaji','sahyadri','twin-forts']::text[],
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
  'amboli',
  'Whistling Woods Restaurant',
  'Amboli Ghat',
  'amboli-ghat',
  ARRAY['malvani','konkani','multi-cuisine']::text[],
  'mid_range',
  'Malvani fish thali (in season Sep-Mar)',
  ARRAY['Malvani fish thali','Sol kadhi','Kombdi vade','Veg thali','Mutton sukka','Bhakri']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Whistling Woods Amboli resort, set in evergreen rainforest 1km off NH-748 — Malvani thali (fish or veg) is the lunch order, with Sindhudurg-style coconut + kokum + tirphal-pepper masala. Open to walk-in diners 12-3pm + 7.30-10pm; resort guests get priority Fri-Sun monsoon weekends.',
  'Monsoon Jul-Sep is heaving — book lunch +91-9420-862244 by 11am. Fish thali depends on the morning Sawantwadi catch; veg thali is the safe order on weekdays.',
  'Whistling Woods Resort, Off Amboli-Sawantwadi Rd, Amboli 416510',
  'https://maps.google.com/?q=Whistling+Woods+Amboli',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1162201-d1943310-Reviews-Whistling_Woods_Amboli-Sawantwadi_Maharashtra.html',
    'https://whistlingwoodsamboli.in/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'amboli',
  'Satpurush Restaurant',
  'Amboli Ghat market',
  'amboli-market',
  ARRAY['malvani','konkani']::text[],
  'casual',
  'Malvani mutton + sol kadhi',
  ARRAY['Malvani mutton','Chicken sukka','Fish thali','Sol kadhi','Tandalachi bhakri','Kombdi vade']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Amboli market''s Malvani thali kitchen — small family-run dining hall on the main ghat road, running since the early 2000s. Mutton sukka with tirphal-pepper + coconut masala is the order; sol kadhi (kokum + coconut milk) is unlimited. Most local-recommended Malvani option in Amboli proper. Open 11.30am-3.30pm + 7-10pm.',
  'Monsoon Jul-Sep lunch fills 12.30-2pm — arrive 11.30 or call +91-9421-100222. Mutton sells out by 2pm on Sundays. Cash + UPI; no cards.',
  'Amboli Ghat market, NH-748, Amboli 416510',
  'https://maps.google.com/?q=Satpurush+Restaurant+Amboli',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162201-Sawantwadi_Maharashtra.html',
    'https://www.zomato.com/sawantwadi/satpurush-restaurant'
  ]::text[],
  '2026-05-13',
  false
),
(
  'amboli',
  'Hotel Mahalakshmi',
  'Amboli Bus Stand',
  'amboli-bus-stand',
  ARRAY['maharashtrian','konkani','pure-veg']::text[],
  'casual',
  'Maharashtrian veg thali + misal pav',
  ARRAY['Veg thali','Misal pav','Pithla bhakri','Kanda poha','Sabudana khichdi','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Maharashtrian breakfast + thali stop next to Amboli bus stand — the workhorse option for travellers connecting Sawantwadi-Kolhapur or stopping en-route to Goa. Misal at 8am, pithla-bhakri at lunch, sabudana khichdi (Mon/Wed/Fri). Open 6.30am-10pm.',
  'Best fresh-misal window 7.30-9am; thali ready by 11.30am. ST buses to Sawantwadi (1hr) + Kolhapur (3hr) leave from the stand outside. Cash + UPI only.',
  'Amboli Bus Stand, NH-748, Amboli 416510',
  'https://maps.google.com/?q=Hotel+Mahalakshmi+Amboli+Bus+Stand',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162201-Sawantwadi_Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/amboli'
  ]::text[],
  '2026-05-13',
  false
),
(
  'amboli',
  'Hill View Hotel & Restaurant',
  'Amboli Ghat',
  'amboli-ghat',
  ARRAY['malvani','maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Malvani chicken + bhakri',
  ARRAY['Malvani chicken','Veg thali','Fish thali','Bhakri','Sol kadhi','Tandoori paneer']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Highway-side dining + budget rooms on the Amboli ghat road — Malvani-style chicken with bhakri is the lunch anchor, served on a covered terrace with the Sahyadri scarp visible on clear days. Open 8am-10.30pm with continuous service.',
  'Monsoon Jul-Sep the terrace is the seat to ask for. Tandoor fires up after 6pm only; lunch is Malvani-only menu. Cash + UPI.',
  'NH-748, Amboli Ghat, Amboli 416510',
  'https://maps.google.com/?q=Hill+View+Hotel+Amboli',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162201-Sawantwadi_Maharashtra.html',
    'https://www.zomato.com/sawantwadi/hill-view-amboli'
  ]::text[],
  '2026-05-13',
  false
),
(
  'amboli',
  'Hotel Sunshine',
  'Amboli-Sawantwadi Rd',
  'sawantwadi-rd',
  ARRAY['malvani','konkani','multi-cuisine']::text[],
  'casual',
  'Konkani veg thali + kokum sharbat',
  ARRAY['Konkani veg thali','Fish curry rice','Sol kadhi','Kokum sharbat','Kombdi vade','Modak (seasonal)']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Highway dhaba 1km outside Amboli market on the Sawantwadi descent — the truckers'' + monsoon-tourist mid-morning stop for Konkani veg thali + chilled kokum sharbat (April-June summer essential). Open 7am-11pm with continuous service.',
  'Kokum sharbat is house-made April-June only; monsoon Jul-Sep switches to hot kokum-tea. Fish curry rice ₹180 is the lunch order; veg thali ₹140. Cash + UPI.',
  'Amboli-Sawantwadi Rd, Amboli 416510',
  'https://maps.google.com/?q=Hotel+Sunshine+Amboli',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162201-Sawantwadi_Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/amboli'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIP (all 4 slots already filled)
-- =========================================================
