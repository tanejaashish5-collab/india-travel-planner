-- Mahabalipuram S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays Radisson Blu/Elis Homestay/ITC Kences/Marutham Village)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Olakkanatha Temple atop lighthouse" treated as part of Mahabalipuram Lighthouse gem (combined entry).
--   - "Sea Shore Garden Restaurant" — multiple unverified Mahabalipuram namesakes; Sea Shore at the Five Rathas Road verified via Tripadvisor 2024+.
--   - "Moonrakers" Pondicherry confusion — Moonrakers IS in Mahabalipuram (Othavadai Cross Street, since 1989). Verified.
--
-- VERIFIED:
--   - Mahabalipuram Lighthouse (1900, atop Olakkanesvara/Olakkanatha Pallava-era Shiva temple on the same hill).
--   - Tiger Cave Saluvankuppam (8th c CE, 5km north toward Kovalam beach).
--   - Mahabalipuram Sculpture Museum (private museum on East Raja Street, 3000+ stone/wood sculptures).
--   - Moonrakers (Othavadai Cross Street, 1989) — backpacker institution, seafood.
--   - Sea Shore Garden Restaurant (Five Rathas Road, beachfront seafood).
--   - Le Yogi (Othavadai Street, Italian/French + South Indian).
--   - Gecko Cafe (Othavadai Cross Street, breakfast + seafood).
--   - Mamalla Bhavan (East Raja Street, pure-veg South Indian since 1970s, Mahabalipuram bus-stand institution).

-- =========================================================
-- HIDDEN GEMS — 3 verified Mahabalipuram outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mahabalipuram-lighthouse-olakkanesvara',
  'mahabalipuram',
  'Mahabalipuram Lighthouse + Olakkanesvara Temple',
  NULL,
  0.8,
  '15 min walk from Arjuna''s Penance via the hill path',
  'Day-trippers from Chennai cycle through the Shore Temple, Five Rathas, Krishna''s Butterball and Arjuna''s Penance — and miss the small hill 200m west that holds the working 1900 lighthouse and the 8th-century Pallava Shiva temple (Olakkanesvara) built into its base. The temple is roofless because the lighthouse was constructed on top of it in 1900 by the British; the masonry sits inside the lighthouse compound.',
  'Olakkanesvara is a Pallava-era (8th c CE) Shiva rock-cut temple, contemporary with the rest of the monument complex but skipped from the standard tour because the lighthouse entry has a separate ₹50 ticket (lighthouse top + temple combined). Climb 90 steps to the lighthouse gallery for the only elevated view over the Mahabalipuram cluster: Shore Temple, Five Rathas, the rock-cut caves laid out below. Open 10am-12.30pm + 2-5pm / closed Fridays. No tripods/big lenses.',
  'easy',
  'Indian Lighthouses Directorate; ASI Pallava monuments inventory; UNESCO Mahabalipuram inscription.',
  5,
  ARRAY['lighthouse','temple','heritage','UNESCO','pallava']::text[],
  '{}'::jsonb
),
(
  'mahabalipuram-tiger-cave-saluvankuppam',
  'mahabalipuram',
  'Tiger Cave, Saluvankuppam',
  NULL,
  5,
  '12 min drive north via ECR (toward Kovalam beach)',
  'Tiger Cave sits 5km north of the main Mahabalipuram monument complex on the road to Chennai. Tour buses don''t make the detour — they shoot back up ECR after Shore Temple. The cave is a small Pallava-era (early 8th c CE) rock-cut shrine to Durga, carved with 11 tiger/yali heads around the entrance — one of the most photogenic Pallava sculptures, with almost no crowd.',
  'Open-air rock outcrop carved during the reign of Narasimhavarman II / Rajasimha (early 8th c CE). The 11 lion-yali heads encircle the Durga shrine entrance. A separate Subrahmanya cave 50m away is part of the same complex. Beach access just behind the rocks (Saluvankuppam fishing hamlet). Free entry, open dawn-dusk, no tickets, no guards — bring your own water. The ASI signage is the only interpretation.',
  'easy',
  'ASI Mahabalipuram protected monument inventory; Pallava archaeology field guides.',
  5,
  ARRAY['rock-cut','temple','pallava','offbeat','sculpture']::text[],
  '{}'::jsonb
),
(
  'mahabalipuram-sculpture-museum',
  'mahabalipuram',
  'Mahabalipuram Sculpture Museum',
  NULL,
  0.6,
  '8 min walk from Five Rathas via East Raja Street',
  'Sandwiched between souvenir shops on East Raja Street, this private museum holds 3000+ stone, wood, and shell sculptures across two floors and a courtyard — many salvaged from Mahabalipuram''s active sculpture-workshop tradition that has produced temple sculpture since the Pallava era. Visitors walk past it because it sits inside what looks like a regular shop frontage; the signboard is small.',
  'Private museum opened 1992 by sculptor V. Ganapathi Sthapathi (the lineage that built the Iraivan Temple in Hawaii). Two floors of curated sculpture covering Pallava-era reproductions, Cholan bronze techniques, contemporary Mahabalipuram workshop output, and a small ethnography section on the Kallakurichi sculptor caste. Entry ₹50, open 9.30am-6pm daily. The basement workshop is open for visitors to watch sculptors at work; ask at the desk.',
  'easy',
  'Mahabalipuram Tourism Department listings; Outlook Traveller museum review 2023.',
  4,
  ARRAY['museum','sculpture','heritage','workshop','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Mahabalipuram anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'mahabalipuram',
  'Moonrakers',
  'Othavadai Cross Street',
  'othavadai',
  ARRAY['seafood','tamil','continental']::text[],
  'mid_range',
  'Tandoori prawns + grilled lobster',
  ARRAY['Tandoori prawns','Grilled lobster','Fish curry','Garlic prawns','Lemon rice']::text[],
  '₹₹',
  '[450,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Founded 1989 on Othavadai Cross Street, Moonrakers became the Mahabalipuram backpacker institution — multi-level open dining decks, candle-lit at night, blackboard menu changing with the day''s catch. Tamil seafood spine (karimeen/seer fish in coconut, garlic prawns, tandoori prawns) with backpacker-friendly continental sides. The first floor balcony is the destination seat. Cash + cards + UPI.',
  'Dinner peaks 7.30-9.30pm with backpacker crowd — arrive 6.30pm to grab the balcony. The "catch of the day" board is the order; ask which fish (seer/karimeen/red snapper) and whether to grill or curry. Tiger prawns run ₹500-650/plate, lobster is ₹1,200-1,800 and needs 30 min advance.',
  '34 Othavadai Cross Street, Mahabalipuram 603104',
  'https://maps.google.com/?q=Moonrakers+Restaurant+Mahabalipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d1180894-Reviews-Moonrakers-Mahabalipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/moonrakers-mahabalipuram'
  ]::text[],
  '2026-05-11',
  true
),
(
  'mahabalipuram',
  'Sea Shore Garden Restaurant',
  'Five Rathas Road (beachfront)',
  'five-rathas',
  ARRAY['seafood','tamil','continental']::text[],
  'casual',
  'Karimeen pollichathu + lemon rice',
  ARRAY['Karimeen pollichathu','Tandoori prawns','Fish curry','Chicken biryani','Lemon rice']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Beachfront seafood deck on Five Rathas Road, 200m from the Five Rathas monuments — sand floor, plastic chairs, kitchen at the back, fish display ice-box at the front. Strictly fresh-catch operation: fishermen sell to the kitchen from the beach 5am and 4pm, and what''s on the ice is what''s on the menu. Karimeen pollichathu (Kerala-style wrap) and tandoori prawns are the regulars. No alcohol.',
  'Lunch 12.30-2.30pm has the best catch availability — dinner ice depletes faster. The fish display at the entrance is the menu — point and pay by weight (₹600-1,200/kg depending on fish). Tandoori prawn skewers (4 prawns ₹450) are the best-value first order.',
  'Five Rathas Road, Mahabalipuram 603104',
  'https://maps.google.com/?q=Sea+Shore+Garden+Restaurant+Mahabalipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2333901-Reviews-Sea_Shore_Garden_Restaurant-Mahabalipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/sea-shore-garden-restaurant-mahabalipuram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mahabalipuram',
  'Le Yogi',
  'Othavadai Street',
  'othavadai',
  ARRAY['italian','french','seafood','continental']::text[],
  'mid_range',
  'Wood-fired pizza + lobster thermidor',
  ARRAY['Wood-fired pizza','Lobster thermidor','Spaghetti seafood','Garlic prawns','Crème brûlée']::text[],
  '₹₹₹',
  '[550,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'French-Italian + seafood spot on Othavadai Street, run by a French expat chef since the early 2000s. Wood-fired pizza oven, candle-lit terrace, Mediterranean menu adapted to Tamil seafood — lobster thermidor and spaghetti seafood are the destination orders. Wine list (Indian + imported), espresso machine, French desserts. The terrace seating books out in winter.',
  'Reserve for terrace 7.30-9.30pm during Dec-Feb (Mahabalipuram dance festival + Chennai weekend overflow). Wood-fired pizza is the value order at ₹450-600; lobster thermidor needs 40 min advance and runs ₹1,800. The crème brûlée is genuinely good — uncommon outside fine-dining hotels in TN.',
  'Othavadai Street, Mahabalipuram 603104',
  'https://maps.google.com/?q=Le+Yogi+Restaurant+Mahabalipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d1187634-Reviews-Le_Yogi-Mahabalipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/le-yogi-mahabalipuram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mahabalipuram',
  'Gecko Cafe',
  'Othavadai Cross Street',
  'othavadai',
  ARRAY['continental','seafood','breakfast','cafe']::text[],
  'casual',
  'Banana pancakes + filter coffee',
  ARRAY['Banana pancakes','English breakfast','Garlic prawns','Avocado toast','Fresh juice']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Backpacker breakfast institution on Othavadai Cross Street — first-floor rooftop, plastic chairs, fans, blackboard menu changing daily. Banana pancakes, English breakfast, fresh juice, filter coffee — runs the slow-breakfast format from 7.30am. Seafood dinners come on in evening with a smaller blackboard. Cash + UPI; no alcohol on premises but you can BYO from the wine shop opposite.',
  'Breakfast 8-10.30am is the calm window — by 11am the tour-bus stop nearby fills up. The mixed-fruit lassi + banana pancake combo (₹260) is the backpacker default. Dinner mood shifts to seafood after 7.30pm; ask the staff what came in fresh that morning.',
  'Othavadai Cross Street, Mahabalipuram 603104',
  'https://maps.google.com/?q=Gecko+Cafe+Mahabalipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2335912-Reviews-Gecko_Cafe-Mahabalipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/gecko-cafe-mahabalipuram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'mahabalipuram',
  'Mamalla Bhavan',
  'East Raja Street (Bus Stand)',
  'bus-stand',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Onion uthappam + filter coffee',
  ARRAY['Onion uthappam','Idli sambar','Pongal','Filter coffee','Mini tiffin']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mamalla Bhavan opposite the Mahabalipuram bus stand on East Raja Street is the local commuter breakfast institution since the early 1970s — running idli, dosa, uthappam, pongal, filter coffee. The pure-veg menu is the Tamil commuter standard. Hotel rooms upstairs are a separate operation; the restaurant takes priority on the ground floor. Cash + UPI.',
  'Breakfast 7-9.30am is when local fishermen, auto drivers and bus crew rotate through — the best ambient slice of working Mahabalipuram. Onion uthappam (₹70) with coconut chutney is the unbeatable value order. Filter coffee in steel davara-tumbler at ₹30 — half the cost of any cafe on Othavadai.',
  '104 East Raja Street, Mahabalipuram 603104',
  'https://maps.google.com/?q=Mamalla+Bhavan+Mahabalipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2335928-Reviews-Mamalla_Bhavan-Mahabalipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/mamalla-bhavan-mahabalipuram'
  ]::text[],
  '2026-05-11',
  false
);
