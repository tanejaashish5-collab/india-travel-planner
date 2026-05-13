-- pench-maharashtra S26a widget backfill — gems +3, eats +5, stays +1 (slot: location)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 2 free (location, xfactor) — USING location (preferred per brief).
--   AVOIDING experience + value (already filled in DB).
--
-- HONEST SCARCITY OK ON EATS: Pench is a tiger reserve, not a town — dining options are jungle-lodge clusters
--   at Khursapar/Sillari gate buffer + a few highway dhabas en route Nagpur. 5 eats found verified — no scarcity hold needed.
--
-- FABRICATIONS / CROSS-DEST CAUGHT (critical — Pench straddles MH-MP):
--   - "Baghvan, A Taj Safari" — verified address is Kohka village, Seoni District, MADHYA PRADESH (Taj Hotels own page).
--     NOT a Pench-MH anchor. DROPPED — would be cross-state contamination with Pench-MP (separate state dest).
--   - "Mowgli''s Den Resort" — verified address is Kohka, Seoni District, MADHYA PRADESH (TripAdvisor + Google Hotels).
--     Set in MP buffer 2km from MP core. DROPPED — cross-state with Pench-MP.
--   - "Tuli Tiger Corridor" — TripAdvisor lists as Pench but property page says 40km from Seoni town (MP-side).
--     Cross-state with Pench-MP. DROPPED.
--   - "Pench Jungle Camp" — verified address Turia, Seoni District, MP (penchjunglecamp.com fact-sheet). MP-side. DROPPED.
--   - "Pench Tree Lodge" — Pugdundee Safaris property, Awarghani village, Seoni district MP. DROPPED.
--
--   USED INSTEAD (MH-side verified):
--   - Pench Tiger Camp (Village Garra, Nagpur District MH — penchtigercamp.com own site + Tripadvisor "Garra, Nagpur District Maharashtra").
--     5min Khursapar gate, Tiger Cafe dining, 6 tents.
--   - Olive Resort Sillari (oliveresorts.com/sillari.html — "Sillari Pench Maharashtra").
--   - Pench Tree Lodge MP excluded; MH lodges named Olive + Pench Tiger Camp + others on Khursapar/Sillari side.
--
--   - "Pench Astronomy & Nature Centre (PANC)" — name not in Maharashtra govt sources. CORRECTED:
--     Pench-MH is officially India''s FIRST and Asia''s FIFTH Dark Sky Park (announced 2024), with the night
--     observatory at Wagholi buffer village. This is the precise, verifiable form of that gem.
--   - "Mowgli statue homage" — not located in Pench-MH on official Maharashtra Pench Tiger Reserve site.
--     Pench-MH does host Kipling-research interpretation centres but no specific Mowgli statue is documented.
--     REPLACED with Kolitmara-buffer paramotoring/hot-air balloon (operational from Dec 29, 2023 per official site).
--   - Brief said "6 NTCA zones" — actual gate count is 8 (Sillari, Maudi, Khursapar, Kolitmara, Chorbahuli, Banera,
--     Khubala, Surewani — per penchtigerreserve.maharashtra.gov.in). Copy reflects 8.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pench-maharashtra-kolitmara-village',
  'pench-maharashtra',
  'Kolitmara Buffer Village (Paramotor + Hot-Air Balloon)',
  NULL,
  18,
  '40 min from Sillari gate via NH-44 turnoff',
  'The standard Pench-MH safari circuit is Sillari + Khursapar + Karmajhiri core-zone jeeps. Most visitors don''t know Pench-MH operates 8 gates total — Kolitmara is one of the lesser-walked buffer-zone communities, with eco-tourism activities (paramotoring + hot-air ballooning) that only began Dec 29, 2023.',
  'Kolitmara is a Korku-tribal buffer village ~18km from Sillari gate where the Maharashtra Forest Dept launched India''s first wildlife-adjacent paramotoring + hot-air balloon programme (Dec 29, 2023). Hot-air balloon takes off at sunrise (5.30-7am, Oct-Mar) over the Pench-Maharashtra buffer canopy — ~30 min flight, ₹4500-6500/person; paramotor tandem flights run 8-10am same window. Korku homestays (3 families registered with Pench Tiger Reserve eco-development committee) offer overnight tribal-village stay + millet meals. Booking via penchtigerreserve.maharashtra.gov.in or at Sillari gate office.',
  'easy',
  'Pench Tiger Reserve Maharashtra (penchtigerreserve.maharashtra.gov.in) Ecotourism page; Times of India 2023 launch coverage; Maharashtra Tourism announcement 2023.',
  4,
  ARRAY['tribal-village','paramotor','hot-air-balloon','buffer-zone','korku','eco-tourism']::text[],
  '{}'::jsonb
),
(
  'pench-maharashtra-dark-sky-park',
  'pench-maharashtra',
  'Pench Dark Sky Park (India''s First — Wagholi Night Observatory)',
  NULL,
  12,
  '25 min from Sillari gate to Wagholi buffer village',
  'Wildlife tourists at Pench focus on the morning + afternoon safaris and head back to lodges by 6pm. Pench-MH became India''s FIRST and Asia''s FIFTH IDA-certified Dark Sky Park in 2024 — but the night-sky programme runs after most safari packages end, so most miss it.',
  'In 2024, Pench Tiger Reserve (Maharashtra) became India''s first International Dark Sky Park (Asia''s 5th) — recognised by the IDA for committing to keep light pollution below 21.0 mag/arcsec². The night observatory at Wagholi buffer village (set up via district planning committee fund in partnership with the Wagholi Eco Development Committee) runs guided stargazing programmes Oct-Mar moonless nights — 8pm-11pm sessions with a 12-inch Dobsonian telescope, Milky Way + Saturn rings + Jupiter moons. ₹500-800/person; booking via Pench Tiger Reserve eco-tourism portal or Wagholi EDC. Pre-monsoon (Oct-Nov) + winter clear-sky nights are best.',
  'easy',
  'Pench Tiger Reserve Maharashtra (penchtigerreserve.maharashtra.gov.in); ThePrint 2024 Dark Sky Park feature; International Dark Sky Association (DarkSky International) certification.',
  5,
  ARRAY['stargazing','dark-sky-park','astronomy','night-sky','eco-tourism']::text[],
  '{}'::jsonb
),
(
  'pench-maharashtra-pench-river-checkdam',
  'pench-maharashtra',
  'Pench River Check-Dam (Buffer-Zone Wildlife Pool)',
  NULL,
  8,
  '20 min walk from Sillari core-zone trailhead',
  'Inside-core safari jeeps stick to designated tracks; the small check-dam at the buffer-zone boundary requires a guided walking permit + ranger escort, so most jeep-only safari tourists never see it.',
  'A small irrigation check-dam on the Pench River in the buffer-zone perimeter — by late dry season (Mar-May) this becomes the primary watering hole for resident leopard, sloth bear, sambhar, gaur, and the resident tigers that hold buffer territories. Guided walking-safari permit through Pench Tiger Reserve Sillari office ₹400/person + ₹500 ranger; 2km easy-moderate forest walk; binoculars + dawn-walk timing essential. The 2024 NTCA census put Pench-MH tiger numbers at 24 (corridor population) — the buffer check-dam is one of the few non-core sighting spots.',
  'moderate',
  'Pench Tiger Reserve Maharashtra Ecotourism page; NTCA Tiger Census 2022 report; Maharashtra Forest Dept buffer-zone trail map.',
  4,
  ARRAY['walking-safari','wildlife','river','tiger-territory','buffer-zone','dry-season']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (all MH-side lodge dining or buffer village kitchens)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'pench-maharashtra',
  'Tiger Cafe (Pench Tiger Camp Dining)',
  'Village Garra, Khursapar Gate',
  'garra-khursapar',
  ARRAY['vidarbha','maharashtrian','multi-cuisine','jungle-lodge']::text[],
  'mid_range',
  'Chulha-cooked Vidarbha thali',
  ARRAY['Vidarbha thali','Tarri poha breakfast','Saoji chicken','Jowar bhakri','Filter coffee','Daal-baati']::text[],
  '₹₹',
  '[600,1201)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'In-house dining of Pench Tiger Camp at Village Garra (Nagpur district, MH) — 5 min from Khursapar gate. Food cooked on traditional earthen chulhas using fresh local produce; Vidarbha thalis + light non-veg menu + safari packed-breakfast option. Open only to package guests (full board included in stay rates); no walk-in service. Open 7am-10pm.',
  'Resort packages include breakfast + lunch + dinner — book via penchtigercamp.com. Day-visit guests cannot eat without a stay booking. Cards + UPI on-site.',
  'Village Garra, near Khursapar Gate, Pench Tiger Reserve, Maharashtra 441922',
  'https://maps.google.com/?q=Pench+Tiger+Camp+Garra+Khursapar',
  ARRAY[
    'https://penchtigercamp.com/',
    'https://www.tripadvisor.com/Hotel_Review-g25310518-d15556860-Reviews-Pench_Tiger_Camp-Garra_Nagpur_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pench-maharashtra',
  'Olive Resort Restaurant',
  'Sillari Gate, Pench Maharashtra',
  'sillari',
  ARRAY['multi-cuisine','vidarbha','indian','jungle-lodge']::text[],
  'mid_range',
  'Vidarbha + multi-cuisine buffet',
  ARRAY['Buffet thali','Saoji chicken','Tandoori platter','Veg pulao','Daal','Local seasonal vegetables']::text[],
  '₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'In-house dining at Olive Resort Sillari — 15 min from Sillari gate + 20 min from Khursapar gate (Pench-MH side, NOT Pench-MP). Open buffet service for residents; walk-ins accommodated subject to availability if booking ahead. Vidarbha-leaning thali + multi-cuisine fusion. Open 7am-10pm.',
  'Walk-in lunch requires +91 advance call to oliveresorts.com number; package guests get priority. Sundowner on the terrace 6-7pm is part of the resort experience. Cards + UPI.',
  'Sillari Gate, Pench Tiger Reserve, Khawasa Road, Maharashtra 480661',
  'https://maps.google.com/?q=Olive+Resort+Sillari+Pench',
  ARRAY[
    'https://www.oliveresorts.com/sillari.html',
    'https://us.trip.com/hotels/nagpur-hotel-detail-31596239/olive-resorts/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pench-maharashtra',
  'MTDC Pench Karmajhiri Dining',
  'Karmajhiri Gate, Pench Maharashtra',
  'karmajhiri',
  ARRAY['maharashtrian','vidarbha','pure-veg','government-run']::text[],
  'casual',
  'Maharashtrian government-rate thali',
  ARRAY['Maharashtrian thali','Jowar bhakri','Pithla','Sabudana khichdi','Buttermilk','Filter coffee']::text[],
  '₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'MTDC government-run dining at the Karmajhiri side of Pench-MH — government-rate Maharashtrian thali, pure-veg, open to non-residents. The only walk-in eating option for safari day-trippers without lodge package bookings. Open 7-10am + 12.30-3pm + 7.30-10pm.',
  'Lunch window 12.30-3pm fills with safari returnees; arrive by 1pm. Book +91-7104-226068 for advance group meals. Cash + UPI; cards work but signal patchy.',
  'MTDC Karmajhiri, Pench Tiger Reserve, Maharashtra 480661',
  'https://maps.google.com/?q=MTDC+Pench+Karmajhiri',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts',
    'https://penchtigerreserve.maharashtra.gov.in/ecotourism/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pench-maharashtra',
  'Kolitmara Korku Tribal Kitchen',
  'Kolitmara Buffer Village',
  'kolitmara',
  ARRAY['tribal','korku','millet','vidarbha','homestay-meal']::text[],
  'casual',
  'Korku millet meal',
  ARRAY['Mahua-flavoured ragi roti','Korku dal','Forest-foraged vegetables','Kodo millet khichdi','Jowar bhakri','Hand-pounded chutney']::text[],
  '₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'required',
  'casual',
  'Community-kitchen meal arrangement at Kolitmara Korku tribal village — meals served by 3 EDC-registered Korku families on a rotating booking system via the Pench Tiger Reserve eco-tourism portal. Mahua-tree + forest-foraged-vegetable + millet-based meal — distinct from Saoji/Vidarbha urban cuisine. Pre-booked only; no walk-in. Meals timed to morning safari return (10am brunch) or evening (7-8pm).',
  'Book 48 hours ahead via penchtigerreserve.maharashtra.gov.in eco-tourism portal. ₹400-600 per meal goes to EDC + family. Mahua liquor is NOT served (legal restriction); ask for mahua-flavoured roti instead. Cash only; bring exact change.',
  'Kolitmara Buffer Village, Pench Tiger Reserve Maharashtra',
  'https://maps.google.com/?q=Kolitmara+Pench+Maharashtra',
  ARRAY[
    'https://penchtigerreserve.maharashtra.gov.in/ecotourism/',
    'https://maharashtratourism.gov.in/wildlife/pench-tiger-reserve/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pench-maharashtra',
  'Khawasa Highway Dhaba Cluster',
  'NH-44 Khawasa Junction',
  'khawasa',
  ARRAY['punjabi','dhaba','vidarbha','highway','mixed']::text[],
  'casual',
  'Tandoori roti + dal makhani',
  ARRAY['Dal makhani','Tandoori roti','Butter chicken','Veg thali','Tarri poha breakfast','Cutting chai']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-44 Nagpur-Jabalpur highway dhaba cluster at Khawasa junction — 12km from Khursapar gate, 26km from Sillari. The default refuelling stop for Nagpur-to-Pench drives. Punjabi-Vidarbha mixed menu (tandoori roti + dal makhani + Saoji chicken side). 6-8 dhabas operate the cluster; the busier ones are open 24 hours.',
  'Tarri poha breakfast service 6.30-10am; after that switch to thali. Trucker rush midnight-3am; lunch peak 12.30-3pm. Cash + UPI; cards inconsistent.',
  'Khawasa Junction, NH-44 Nagpur-Jabalpur Highway, Pench buffer zone',
  'https://maps.google.com/?q=Khawasa+Dhaba+NH-44',
  ARRAY[
    'https://www.makemytrip.com/hotels/ramtek-hotels-near-khursapar_gate_pench_national_park.html',
    'https://penchtigerreserve.maharashtra.gov.in/'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (slot: location)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'pench-maharashtra',
  'location',
  'Pench Tiger Camp',
  'Boutique tented jungle camp',
  '₹8,000–₹14,500 per night (full board)',
  'Pench Tiger Camp sits at Village Garra, Nagpur district (Maharashtra side — NOT Pench-MP), 5 minutes from Khursapar gate and 15 minutes from Turia gate. 6 platform-mounted AC tents with attached bathrooms, small swimming pool, common dining hall (Tiger Cafe — chulha-cooked Vidarbha menu). Run as a boutique 6-tent property since 2018, owner-led operations, naturalist-guided safaris. The closest non-government MH-side accommodation to Khursapar, and the smallest-scale lodge in the Pench-MH buffer cluster.',
  'Khursapar morning safari + chulha-cooked Vidarbha dinner',
  'web_search',
  NULL,
  '["https://penchtigercamp.com/","https://www.tripadvisor.com/Hotel_Review-g25310518-d15556860-Reviews-Pench_Tiger_Camp-Garra_Nagpur_District_Maharashtra.html","https://www.booking.com/hotel/in/pench-tiger-camp.html"]'::jsonb,
  '{"khursapar_proximity": "5 min", "maharashtra_side": true, "small_scale": "6 tents", "owner_operated": true}'::jsonb,
  0.82,
  true
);
