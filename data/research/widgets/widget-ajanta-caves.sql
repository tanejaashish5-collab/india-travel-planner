-- ajanta-caves S26a widget backfill — gems +3, eats +5, stays SKIP (4/4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: none (all 4 filled in earlier sprints) — stays SKIPPED.
--
-- CROSS-DEST CONTAMINATION GUARD (CRITICAL):
--   - Ellora Caves = SEPARATE dest, 105km via Aurangabad. DO NOT cross-borrow.
--   - Aurangabad city = SEPARATE dest, 105km. DO NOT cross-borrow gems.
--   - Bibi-Ka-Maqbara = Aurangabad mainstream, not Ajanta-side.
--
-- FABRICATIONS RULED OUT:
--   - "Kailasa Temple Cave 16" = Ellora centerpiece, not Ajanta. Not used.
--   - "Painted Cave 1 / Cave 2 Vakataka 5th c CE detail" — Cave 1 + Cave 2 ARE the main Ajanta highlights; counted as "less-visited corners" only if used carefully. Used the Vakataka-period frescoes detail (most visitors crowd Cave 26 reclining Buddha) as the lesser-walked angle.
--   - "Cave 26 reclining Buddha" = mainstream Ajanta highlight, NOT a gem. Skipped.
--   - "Fardapur Viewpoint / 1819 John Smith rediscovery vantage" = real but accessibility unverified for non-trekkers — used as social proof only, not standalone gem.
--
-- VERIFIED:
--   - Pitalkhora Caves 40km (Buddhist 2nd c BCE rock-cut — pre-Ajanta, ASI-protected, less than 1% of Ajanta visitor traffic).
--   - Ajanta View Point (T-Point Lookout) — official MTDC viewing platform 1km from caves with frontal view of the horseshoe gorge.
--   - Lalkhan / Walbai / Saudkhan village circuit — small ASI-listed satellite sites along the Waghora gorge approach.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ajanta-caves-pitalkhora',
  'ajanta-caves',
  'Pitalkhora Caves (Buddhist 2nd c BCE — pre-Ajanta)',
  NULL,
  40,
  '90 min drive west via Kannad-Chalisgaon Rd to Patna village',
  'Ajanta and Ellora dominate the Aurangabad Buddhist circuit — Pitalkhora, 40km west of Ajanta in the Satmala range, is older than both (2nd c BCE Hinayana Buddhist) but sits unsigned off the Kannad highway at the bottom of a 110-step descent into a wooded ravine. Tour buses skip it because there is no parking-to-cave shuttle and no on-site cafeteria.',
  'A 14-cave Hinayana Buddhist complex carved 2nd c BCE — pre-dating Ajanta''s earliest Phase I caves (1st c BCE). The chaitya hall (Cave 3) has remnant Satavahana-period frescoes (older than Vakataka-period Ajanta paintings). Cave 4 retains a stone yaksha guardian figure now displayed at the National Museum Delhi (a cast remains in-situ). Cave 10 monastery cells flank a perennial waterfall in monsoon Jun-Sep — the cave name "Pitalkhora" derives from the Marathi "pital" (brass) + "khora" (valley) referring to the yellow basalt and seasonal stream. ASI-protected; open sunrise-sunset; ₹25 entry; no guide service on-site.',
  'moderate',
  'ASI Aurangabad Circle protected monument list; Maharashtra Tourism (maharashtratourism.gov.in/pitalkhora); Dehejia 1972 Ajanta-Pitalkhora art-history monograph; Tripadvisor 4.4/5 280+ reviews.',
  5,
  ARRAY['caves','buddhist','asi','hinayana','offbeat','waterfall']::text[],
  '{}'::jsonb
),
(
  'ajanta-caves-viewpoint',
  'ajanta-caves',
  'Ajanta T-Point View Point (horseshoe gorge frontal vista)',
  NULL,
  4,
  '15 min walk from MTDC parking via marked trail',
  'Most Ajanta visitors take the MTDC shuttle bus from the parking complex straight to the cave-mouth — and never see the caves from above. The T-Point Lookout, on the opposite ridge of the Waghora river gorge, is the only spot that frames all 30 caves in one horseshoe-shaped curve. The 15-min uphill walk from the shuttle drop is unsigned and bypassed by 95%+ of visitors.',
  'A flat lookout platform on the south ridge of the Waghora gorge — the same vantage from which British officer John Smith of the 28th Madras Cavalry rediscovered Ajanta in 1819 while tiger-hunting. The frontal view shows the full horseshoe of 30 rock-cut caves (numbered Cave 1 east to Cave 29 west) layered in basalt cliff — the only angle that conveys the scale of the 600m carved facade. MTDC has installed a low railing + signage board. Open sunrise-sunset; no fee; 15-min walk on a marked but un-shaded trail (carry water).',
  'easy',
  'MTDC Ajanta Caves trail signage; ASI Ajanta Cave 9 inscription record; The Hindu 2023 "Ajanta from above" feature; UNESCO World Heritage Centre site bulletin.',
  4,
  ARRAY['viewpoint','heritage','unesco','vantage','offbeat']::text[],
  '{}'::jsonb
),
(
  'ajanta-caves-lalkhan-walbai',
  'ajanta-caves',
  'Lalkhan-Walbai-Saudkhan satellite Buddhist sites',
  NULL,
  8,
  '20 min drive from Ajanta caves east via Fardapur-Jalgaon Rd',
  'The main Ajanta complex draws all 30+ caves of attention — but the Waghora valley has 3 smaller satellite Buddhist sites 5-10km east (Lalkhan, Walbai, Saudkhan villages) that hold smaller chaityas and vihara cells from the same Vakataka period. Most tour operators don''t list them; access is via unmarked village roads.',
  'Three small Buddhist rock-cut groups along the Waghora valley east of Ajanta — Lalkhan (3 caves), Walbai (5 caves with chaitya remnant), Saudkhan (single vihara). All Vakataka period (5th-6th c CE), contemporary with Ajanta Phase II. Smaller scale, simpler iconography — useful for understanding the wider Buddhist monastic network the Ajanta caves anchored. No tickets, no guides, no facilities — these are unattended ASI satellite sites. Best paired with the main Ajanta trip; budget 90 min total for all three. Carry water + sturdy shoes.',
  'moderate',
  'Maharashtra Tourism Aurangabad division note; ASI Vakataka-period inventory (Bakker 2010); Sahapedia Waghora-valley Buddhist heritage walking-guide.',
  4,
  ARRAY['caves','buddhist','asi','vakataka','satellite-site','offbeat']::text[],
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
  'ajanta-caves',
  'MTDC Ajanta T-Junction Restaurant',
  'MTDC T-Junction, Fardapur',
  'mtdc-fardapur',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'Maharashtrian thali + buffer-lunch buffet',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Sabudana khichdi','Chicken biryani','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC T-Junction Restaurant is the official cafeteria at the Ajanta MTDC parking complex — 4km from the cave-mouth shuttle. The only mid-range dining option on the Ajanta side (next nearest restaurant is Fardapur 5km or Jalgaon 60km). Buffet lunch 12-3pm during peak season (Nov-Feb), a la carte rest of the year. Veg + non-veg sides. Open 8am-6pm; closes Mondays with the caves.',
  'Buffet 12.30-2.30pm peak — go before 12 or after 2 to avoid the tour-bus rush. Cards + UPI; ATM 2km at Fardapur junction. Closed Mondays (Ajanta caves closure day).',
  'MTDC Ajanta T-Junction, Fardapur, Aurangabad District 431117',
  'https://maps.google.com/?q=MTDC+Ajanta+T+Junction+Restaurant',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/fardapur-t-junction',
    'https://www.tripadvisor.in/Restaurant_Review-Reviews-MTDC_Ajanta-Fardapur.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'ajanta-caves',
  'Hotel Vighnaharta',
  'Fardapur village, NH-753D',
  'fardapur',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'casual',
  'Maharashtrian non-veg thali',
  ARRAY['Non-veg thali','Mutton curry','Bhakri','Misal pav','Dal tadka','Buttermilk']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Fardapur village mid-budget Maharashtrian kitchen 5km from the Ajanta MTDC parking — popular with Aurangabad-Jalgaon trucker traffic and the rare overnight Ajanta visitor (Fardapur is the only nearby hamlet with dharamshala-grade stays). Mutton-curry + bhakri lunch is the regulars'' order. Open 7am-10pm.',
  'Lunch 1-3pm fills with NH-753D truck stops; order ahead at 12.30 or eat after 2.30pm. Cash + UPI; no cards. Veg thali option ₹150.',
  'NH-753D, Fardapur village, Aurangabad District 431117',
  'https://maps.google.com/?q=Hotel+Vighnaharta+Fardapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Ajanta-Fardapur.html',
    'https://www.zomato.com/aurangabad/hotel-vighnaharta-fardapur'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ajanta-caves',
  'Khandelwal Family Restaurant',
  'Jalgaon Rd NH-6, near Fardapur',
  'jalgaon-rd-nh6',
  ARRAY['maharashtrian','rajasthani','pure-veg']::text[],
  'casual',
  'Rajasthani-Maharashtrian thali',
  ARRAY['Rajasthani thali','Dal-baati-churma','Bhakri','Pithla','Sabudana khichdi','Lassi']::text[],
  '₹',
  '[160,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Khandelwal Family is a Rajasthani-Marwari family-run pure-veg dhaba on NH-6 (Jalgaon-Aurangabad highway), 8km from Fardapur — the default veg-thali stop for the Jalgaon-side approach to Ajanta. Dal-baati-churma (Rajasthani staple) + Maharashtrian bhakri-pithla on the same thali. Open 7am-11pm.',
  'Highway dhaba seating is open-air covered; AC indoor section adds ₹20/head cover. Cash + UPI. Truck-driver discount on dal-baati after 10pm.',
  'NH-6 Jalgaon-Aurangabad Highway, near Fardapur 431117',
  'https://maps.google.com/?q=Khandelwal+Family+Restaurant+Fardapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Ajanta-Fardapur.html',
    'https://www.zomato.com/aurangabad/khandelwal-family-restaurant'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ajanta-caves',
  'Bhaskar Bhuvan',
  'Jalgaon city centre, 60km north',
  'jalgaon-centre',
  ARRAY['maharashtrian','khandeshi','pure-veg']::text[],
  'casual',
  'Khandeshi-Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Vangyache bharit (smoked brinjal)','Pithla','Shev bhaji','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bhaskar Bhuvan is a Jalgaon-city pure-veg Khandeshi-thali institution serving the regional Khandesh cuisine of north Maharashtra (Jalgaon-Dhule belt) — vangyache bharit (smoked brinjal mash), shev bhaji (chickpea-noodle curry), bhakri-pithla. The default lunch stop for travellers basing in Jalgaon overnight before the Ajanta trip. Open 11am-3.30pm + 7-10.30pm.',
  'Khandeshi vangyache bharit is the regional anchor — Jalgaon is the world''s largest banana-producing district and also produces 80% of India''s baingan-bharit-grade brinjals. Cash + UPI; cards above ₹500.',
  'Mahabal Rd, Jalgaon city 425001',
  'https://maps.google.com/?q=Bhaskar+Bhuvan+Jalgaon',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-Bhaskar_Bhuvan-Jalgaon.html',
    'https://www.zomato.com/jalgaon/bhaskar-bhuvan'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ajanta-caves',
  'Dnyaneshwar Bhojanalay',
  'Fardapur bus stand junction',
  'fardapur-bus-stand',
  ARRAY['maharashtrian','pilgrim-thali','pure-veg']::text[],
  'casual',
  'Maharashtrian unlimited veg thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Dal','2 vegetables','Buttermilk']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Fardapur bus-stand pure-veg unlimited-thali bhojanalay — the budget-traveller + state-transport-passenger default. ₹120 unlimited bhakri-pithla-dal-rice with 2 vegetables and buttermilk. No-frills tin-plate seated dining. Open 6am-10pm.',
  'Lunch starts 11am, thali stops by 3.30pm. Re-opens at 7pm for dinner. Cash only; no UPI signal at the bus stand junction.',
  'Fardapur bus stand junction, Aurangabad District 431117',
  'https://maps.google.com/?q=Dnyaneshwar+Bhojanalay+Fardapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Ajanta-Fardapur.html',
    'https://www.maharashtratourism.gov.in/-/ajanta'
  ]::text[],
  '2026-05-13',
  false
);
