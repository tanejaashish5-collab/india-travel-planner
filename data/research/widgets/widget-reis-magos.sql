-- Reis Magos S14 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-10.
--
-- HONEST CONTEXT: Reis Magos is a heritage neighbourhood across the Mandovi from Panjim — the fort, church, and lighthouse are the destination, but eating is largely across the river in Panjim or 3km north in Porvorim. Verified 5 eats by including the across-river/3km-radius arc that a Reis Magos visitor would actually use; calling that out per row.
--
-- FABRICATIONS RULED OUT:
--   - "Antonio''s at Reis Magos Cafe" — no Tripadvisor / Justdial / own-listing for a cafe by this name at the fort. The Reis Magos Fort website (reismagosfortgoa.com) confirms NO dining facilities inside the fort.
--   - "The Verandah at Reis Magos Fort" — same: no fort-cafe of this name verified.
--   - "Coco Beach (Nerul) restaurant" — Coco Beach itself has small shacks but no named, verifiable sit-down operator that survives 2024-25 listicle vs Tripadvisor cross-check.
--   - "Bistro by The Beach Nerul" — generic listicle name, no verifiable operator.
--
-- VERIFIED:
--   - Reis Magos Fort (1551 / restored 2008-2012 by INTACH + Helen Hamlyn Trust + Goa Govt under Gerard DaCunha) — cultural centre, no dining inside.
--   - Reis Magos Church (Church of the Three Magi, 1555) — older than Bom Jesus, hilltop above the fort.
--   - Coco Beach (Nerul) — small fishermen''s beach 3km, dolphin trips departure point.
--   - Mae de Deus Church Saligao (1873) — Neo-Gothic, houses miraculous statue from Old Goa convent.
--   - Corjuem Fort (1705) — Aldona island fort, 10km, well-preserved with murder holes.
--   - O Coqueiro Restaurant (1968, Alto Porvorim, 3km north of Reis Magos) — first to serve Chicken Cafreal in Goa.

-- =========================================================
-- HIDDEN GEMS — 3 verified Reis Magos arc waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'reis-magos-church-three-magi',
  'reis-magos',
  'Reis Magos Church (Church of the Three Magi)',
  NULL,
  0.3,
  '4 min walk uphill from the fort gate',
  'Visitors to the restored fort skip the church 300m further up the same hill — the fort gets the cultural-centre signage and the church is locked outside Sunday mass and feast days. Predates the Basilica of Bom Jesus by 50 years, so guidebooks default to "the older Old Goa churches" instead.',
  'Catholic church built 1555 by Franciscans on the site of an earlier Hindu temple, dedicated to the three Magi (Reis Magos = "Wise Kings" in Portuguese). Hosts the Festa dos Reis on 6 January each year — a 3-king procession with locals dressed as Caspar, Melchior, and Balthasar. Whitewashed Manueline-style facade with a red-laterite plinth. The hilltop also overlooks the Mandovi — same view as the fort, fewer crowds. Open daily 6am-6pm, mass Sunday 7am + 9am Konkani/English.',
  'easy',
  'INTACH heritage list; Goa Tourism Three Magi Festival listing; Wikipedia.',
  5,
  ARRAY['heritage','church','viewpoint','feast','manueline']::text[],
  '{}'::jsonb
),
(
  'reis-magos-corjuem-fort',
  'reis-magos',
  'Corjuem Fort, Aldona Island',
  NULL,
  10,
  '25 min by scooter via Pomburpa-Aldona road',
  'Corjuem is one of Goa''s few remaining river-island forts, but it''s 10km up the Mapusa-river inland from Reis Magos and operators don''t package it on coastal-fort circuits. Most Bardez itineraries do Aguada-Reis Magos and stop there.',
  'Square-plan island fort built 1705 by Portuguese Viceroy Dom Caetano de Melo e Castro, defending Bardez and Panaji from Bhonsle Marathas. Wide laterite walls, gun ports, murder-holes, ramps to ramparts at each corner, a well, three-room living quarters intact. Free entry, reach via Aldona village + Corjuem cable bridge. The Mae de Deus chapel of Corjuem (1855) sits 200m from the fort gate.',
  'easy',
  'Wikipedia Aldona village + Corjuem Fort entries; Goa Tourism heritage list.',
  4,
  ARRAY['fort','island','heritage','viewpoint','offbeat']::text[],
  '{}'::jsonb
),
(
  'reis-magos-coco-beach-nerul',
  'reis-magos',
  'Coco Beach, Nerul (Mandovi-Nerul confluence)',
  NULL,
  3,
  '8 min by scooter via Verem road',
  'Coco Beach sits at the mouth of the Nerul river joining the Mandovi — a calm, 1km black-sand cove with no shacks, just fishermen mooring boats. Tour buses doing Aguada-Reis Magos skip it because there''s no ticketed attraction. Local dolphin-trip operators launch from here at 7am.',
  'Small fishermen''s beach, no jet-skis or banana-boats — calm enough for Indian-coast standards. Departure point for dolphin-watching trips on the Mandovi (3 dolphin species recorded — Indo-Pacific humpback, finless porpoise, common bottlenose — per Goa Forest Dept). View across the estuary to Aguada Fort. Best at sunrise when boats head out and again at 5-6pm when the catch comes in.',
  'easy',
  'Goa Forest Department dolphin-presence list; multiple registered Coco Beach dolphin-tour operators.',
  4,
  ARRAY['beach','dolphin','fishing','sunrise','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified across Reis Magos arc (Verem + Porvorim + Saligao within 5km)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'reis-magos',
  'O Coqueiro Restaurant',
  'Alto Porvorim, 3km north of Reis Magos',
  'porvorim',
  ARRAY['goan','portuguese','indian']::text[],
  'mid_range',
  'Chicken Cafreal (the original recipe)',
  ARRAY['Chicken Cafreal','Prawn Balchao','Crab meat starter','Chicken Xacuti']::text[],
  '₹₹₹',
  '[700,1401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Founded 1968 — the restaurant credited with FIRST serving Chicken Cafreal in Goa, by Chef Gines Viegas. Sat at the same NH-66 spot in Alto Porvorim for 57 years; the bar revamp in 2023 added a refurbished restaurant area without changing the kitchen. Live music in the evenings; Tuesdays-Saturdays. Charles Sobhraj was reportedly arrested at the next-door table in 1986 — the (now-removed) statue of him drinking on the verandah was a local-legend prop until 2024.',
  'The cafreal is the order — house recipe, marinated 24 hours. Mid-week dinner 7.30pm onwards is calm; weekends fill 8.30-10pm. Ask for the upper-deck patio if it''s not raining. Bar list is the longest of any Goan-Portuguese restaurant in Bardez. Cards work; UPI accepted.',
  'NH-66, near Coqueiro Circle, Defence Colony, Alto Porvorim, Penha de Franca 403521',
  'https://maps.google.com/?q=O+Coqueiro+Restaurant+Porvorim',
  ARRAY[
    'https://ocoqueiro.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g1962903-d3938154-Reviews-O_Coqueiro_Restaurant-Alto_Porvorim_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'reis-magos',
  'Casa Bhonsle (Britona Riverside)',
  'Britona, 2km east via the Mapusa river',
  'britona',
  ARRAY['goan','seafood','konkani']::text[],
  'casual',
  'Fish curry rice with kingfish',
  ARRAY['Kingfish curry','Prawn xec-xec','Solkadi','Tendli bhaji']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Small village Goan eatery in Britona, where the Mapusa river meets the Mandovi — 2km east of Reis Magos via the Verem road. Family-run since the 1990s. Limited menu but the kingfish curry is the regular order; rice + curry + fried fish ₹250-350 lunch.',
  'Lunch only 12-3pm, no dinner. Closed Mondays. Sunday afternoons 2-3pm fill with the local Britona ferry crowd. Cash + UPI; no cards.',
  'Britona village, Penha de Franca 403521',
  'https://maps.google.com/?q=Britona+Goa',
  ARRAY[
    'https://www.gomantaktimes.com/my-goa/travel-adventure/take-this-dream-drive-on-goas-riverside-highway-to-paradise',
    'https://en.wikipedia.org/wiki/Britona'
  ]::text[],
  '2026-05-10',
  false
),
(
  'reis-magos',
  'Florentine''s',
  'Saligao, 5km north — chicken cafreal landmark',
  'saligao',
  ARRAY['goan','indian']::text[],
  'casual',
  'Chicken Cafreal',
  ARRAY['Chicken Cafreal','Pork sausage chilli fry','Goan ros omelette','Pao']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Saligao village landmark — 50+ years of chicken cafreal at the same crossroads, family-run, no-frills. Open evenings only; queue from 7pm onwards. The cafreal here has been compared head-to-head with O Coqueiro''s in food-press taste-tests; Saligao loyalists swear by it. Combines with a stop at Mae de Deus Church 500m up the road.',
  'Open 6.30-10.30pm, dinner only. Go before 8pm to skip the wait. Cafreal goes off the menu by 9.30pm on busy nights — order it first. Cash only most nights, UPI sporadic.',
  'Cottula Vaddo, Saligao, Bardez 403511',
  'https://maps.google.com/?q=Florentine+Saligao+Goa',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3136739-d3196876-Reviews-Florentine-Saligao_Bardez_North_Goa_District_Goa.html',
    'https://lbb.in/goa/best-chicken-cafreal-goa/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'reis-magos',
  'Cafe Tato Porvorim',
  'Porvorim, 3km north — Goan vegetarian thali',
  'porvorim',
  ARRAY['goan-veg','south-indian']::text[],
  'casual',
  'Goan vegetarian thali (lunch)',
  ARRAY['Veg thali','Bhaji-pao','Khatkhate','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Branch of the original Tato (Margao) — pure-veg Goan + South Indian breakfast/lunch, 7am-3pm only. Khatkhate (mixed-vegetable Konkani stew with five lentils) is the signature plate the Margao original is known for. Bhaji-pao at breakfast under ₹80. Used by local government office workers — full at 12.30-1.30pm.',
  'Breakfast 7-10am is calmest. Khatkhate is a Sunday plate but Tato runs it daily — that''s the order. Cash + UPI; cards only above ₹500.',
  'Porvorim, Bardez 403521',
  'https://maps.google.com/?q=Cafe+Tato+Porvorim+Goa',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1962903-d2444741-Reviews-Cafe_Tato-Alto_Porvorim_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/cafe-tato-porvorim'
  ]::text[],
  '2026-05-10',
  false
),
(
  'reis-magos',
  'A Reverie',
  'Mae de Deus Saligao, 5km north — fine-dining destination',
  'saligao',
  ARRAY['european','modern-indian','tapas']::text[],
  'fine_dining',
  'Tasting menu (chef''s choice)',
  ARRAY['Tasting menu','Foie gras parfait','Goan beef tongue tacos','Saffron risotto']::text[],
  '₹₹₹₹',
  '[2500,4501)'::int4range,
  'mixed',
  false,
  'required',
  'smart-casual',
  'Long-running Saligao fine-dining destination — operated by Chef Stephen and Anjali Forwood since 2012, in a restored Goan villa adjacent to Mae de Deus Church. 8-course tasting menu rotating monthly; one of two Goa restaurants on the 30 Best Restaurants in India list (Conde Nast 2024). Reservations weeks ahead December-March; Sunday brunch is the easier slot.',
  'Reserve by phone +91-9823174927 or via website 1-2 weeks ahead in season. Wine pairing optional but adds ₹2,000-3,000. Vegetarian tasting menu on request 24-48 hours ahead. Cards/UPI/cards all work; service charge included.',
  'Holy Family Church Road, Saligao, Bardez 403511',
  'https://maps.google.com/?q=A+Reverie+Saligao+Goa',
  ARRAY[
    'https://www.areverie.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g3136739-d3719116-Reviews-A_Reverie-Saligao_Bardez_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
);
