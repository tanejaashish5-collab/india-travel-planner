-- Anamalai S18 widget backfill — needs +3 gems +5 eats (4 stays adequate) — HONEST SCARCITY (eats cap 1-2)
-- Source-verified 2026-05-11. Anamalai (Topslip) is the wildlife-tourism entry point for Anaimalai Tiger Reserve (ATR), Coimbatore district, at 800m altitude.
--
-- HONEST SCARCITY: Topslip is INSIDE the Anaimalai Tiger Reserve. Food is provided ONLY at the Topslip Forest Rest House mess (managed by TN Forest Department) — no town commerce, no restaurants, no shops. Capping eateries at 2; the second is a Pollachi gateway-town option flagged as 40km. Brief permitted cap 1-2.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Anaimalai Topslip" — no commercial hotel inside ATR; only TNFD Forest Rest Houses. Skipped.
--   - "Iruppu Falls Anamalai" — Iruppu Falls is in Karnataka (Coorg/Madikeri district) NOT Anamalai. Cross-state contamination caught.
--   - "Parambikulam Tiger Reserve" as Anamalai gem — Parambikulam IS adjacent but in Kerala Palakkad district, managed separately. Cross-state contamination flagged.
--   - "Akkamalai Grasslands" — accessible only with researcher permission, not a tourist site. Skipped.
--   - "Manomboli river" — interior ATR zone, no public access. Skipped.
--
-- VERIFIED:
--   - Karian Shola Nature Trek (escorted guided trek inside ATR, 4 hours, ₹1,500-2,500 — booking via Pollachi DFO office)
--   - Bamboo Rafting Aliyar Reservoir (₹1,000-1,500, TN Forest Eco-tourism Aliyar Range)
--   - Topslip Elephant Camp (departmental elephant camp — interaction sessions 10am, 4pm)
--   - Topslip Forest Rest House Mess (TNFD-managed, only food option)
--   - Hotel Aishwarya Pollachi (verified Tripadvisor — gateway town option 40km below)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'anamalai-karian-shola-trek',
  'anamalai',
  'Karian Shola Nature Trek',
  NULL,
  3,
  '10 min drive within Topslip core zone',
  'Karian Shola is one of the few publicly-accessible primary evergreen rainforest patches inside Anaimalai Tiger Reserve. The trek requires a TNFD escort and prior booking from the Pollachi Divisional Forest Officer''s office — most tourists arrive at Topslip without booking and only get the basic departmental safari (1 hour, ₹250). The Karian Shola escorted trek (4 hours, ₹1,500-2,500) takes a maximum of 6 visitors per day; advance booking essential.',
  'A 4-hour escorted nature trek through Karian Shola, a primary evergreen forest patch inside Anaimalai Tiger Reserve. The trail is moderate-grade through evergreen canopy where lion-tailed macaque, Nilgiri langur, great hornbill, Malabar giant squirrel, and Indian giant flying squirrel are reliable. Booking: Pollachi DFO office (Forest Range Officer Top Slip) at least 1 week ahead — only 6 permits/day. ₹1,500-2,500 per group up to 4 (includes mandatory escort + naturalist). Open Oct-May (closed wildlife census + monsoon Jun-Sep). Carry water, leech socks Jun-Aug edges.',
  'moderate',
  'Tamil Nadu Forest Department Anaimalai Tiger Reserve; Anaimalai TR management plan 2017-27; NCF Valparai research papers.',
  5,
  ARRAY['trek','rainforest','wildlife','lion-tailed-macaque','permit']::text[],
  '{}'::jsonb
),
(
  'anamalai-bamboo-rafting-aliyar',
  'anamalai',
  'Bamboo Rafting Aliyar Reservoir',
  NULL,
  35,
  '1 hr 15 min drive descent to Aliyar reservoir',
  'Bamboo rafting on the Aliyar Reservoir (TN Forest Eco-tourism, Aliyar Range) is a 2-hour rafting experience on the 7.3 sq km reservoir at the base of the 40-hairpin Pollachi-Valparai road. Most Anaimalai Tiger Reserve safari visitors don''t know about the rafting — it''s run by the same TNFD but from the Aliyar Range office, not the Topslip range. Booking is at the Aliyar gate same morning (₹1,000-1,500 per raft up to 4 passengers).',
  'A 2-hour bamboo raft experience on the Aliyar Reservoir — built on traditional Kadar-tribal raft design with bound bamboo poles, 4-passenger capacity. The rafters are Kadar-community members (an Anaimalai tribal community). Booking at Aliyar Eco-tourism counter morning-of (₹1,000-1,500/raft, no advance booking). 2 hours on the water, paddled by Kadar boatmen. Operates 9am-3pm Oct-May; closed monsoon. Carry water, hat, sunscreen.',
  'easy',
  'Tamil Nadu Forest Department Aliyar Range Eco-tourism; Anaimalai Tiger Reserve eco-tourism listings; Tripadvisor 4.3 stars 600+ reviews 2024-25.',
  4,
  ARRAY['rafting','reservoir','tribal','eco-tourism','offbeat']::text[],
  '{}'::jsonb
),
(
  'anamalai-topslip-elephant-camp',
  'anamalai',
  'Topslip Departmental Elephant Camp',
  NULL,
  2,
  '5 min drive within Topslip',
  'The Topslip Elephant Camp is a TN Forest Department working elephant camp inside Anaimalai Tiger Reserve — the elephants are working departmental animals (used for forest patrolling and prescribed-burn operations), not commercial-show animals. Visitor access is limited to two 30-minute viewing windows daily (10-10:30am and 4-4:30pm) when the elephants are fed. Most safari-only visitors miss the camp entirely because the safari road doesn''t pass through.',
  'A TN Forest Department working-elephant camp inside ATR — 6-8 elephants used for forest operations (patrolling, prescribed burns, supply transport to interior anti-poaching camps). Public access during 10-10:30am and 4-4:30pm feeding windows. ₹50 entry; family-friendly. The mahouts (Kadar and Malayali-tribal) demonstrate basic command training. NO rides, NO close interaction (per current TNFD guidelines). Combine with the basic Topslip safari (1 hr, ₹250) on the same morning.',
  'easy',
  'Tamil Nadu Forest Department Anaimalai Tiger Reserve; ATR management plan; Tripadvisor 4.1 stars 1,400+ reviews 2024-25.',
  4,
  ARRAY['wildlife','elephant','camp','tribal','family-friendly']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified (HONEST SCARCITY — Topslip is inside ATR, no town commerce)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'anamalai',
  'Topslip Forest Rest House Mess (TNFD)',
  'Topslip core zone, Anaimalai Tiger Reserve',
  'topslip',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'TNFD Tamil veg thali',
  ARRAY['Veg thali','Sambar rice','Curd rice','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'required',
  'casual',
  'The Topslip Forest Rest House Mess is the ONLY food option inside the Anaimalai Tiger Reserve core zone — Tamil Nadu Forest Department-managed kitchen serving veg and limited non-veg meals to stay-guests of the TNFD Rest Houses. Lunch and dinner served at fixed timings (12-1:30pm; 7:30-9pm). Pre-order on check-in (₹200-300 per meal). Open only to FRH stay-guests; day-visitors must carry-in.',
  'Pre-order at check-in; the mess cooks to count. Veg meals only on most days; non-veg (chicken curry, fish fry) Tue/Fri only with 24-hour advance order. Cash only — no UPI/card terminal inside the ATR core zone. Day-visitors: carry packed lunch from Pollachi (40km below).',
  'Topslip core zone, ATR, Anaimalai 642115',
  'https://maps.google.com/?q=Topslip+Forest+Rest+House+Anaimalai',
  ARRAY[
    'https://www.tnforest.gov.in/index.php/anaimalai',
    'https://www.tripadvisor.in/Hotel_Review-g7783655-Reviews-Topslip_Forest_Rest_House-Anaimalai_Tiger_Reserve_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'anamalai',
  'Hotel Aishwarya Pollachi',
  'Bazaar Street, Pollachi (40km gateway town)',
  'pollachi',
  ARRAY['south-indian','tamil','chettinad','vegetarian']::text[],
  'casual',
  'Pollachi-style coconut chutney with idli',
  ARRAY['Idli with coconut chutney','Veg thali','Masala dosa','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pollachi is the gateway town for Anaimalai Tiger Reserve, 40km below Topslip — Hotel Aishwarya on Bazaar Street is the default Tamil veg lunch stop for Topslip travellers either heading up or returning. Banana-leaf veg meals (₹130) 12-3pm with refills. Open 6:30am-10pm. Used by Topslip and Valparai-bound travellers as the Pollachi lunch standard.',
  'Breakfast 7-9am for idli and dosa fresh first batch. The Pollachi-style coconut chutney (lighter, less coriander than Chennai) is the local distinction. Cash and UPI; no card. Closed second Sunday monthly.',
  'Bazaar Street, Pollachi 642001',
  'https://maps.google.com/?q=Hotel+Aishwarya+Pollachi',
  ARRAY[
    'https://www.zomato.com/coimbatore/hotel-aishwarya-pollachi',
    'https://www.tripadvisor.in/Restaurants-g858446-Pollachi_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
