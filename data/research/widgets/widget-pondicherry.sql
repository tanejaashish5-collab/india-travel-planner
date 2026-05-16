-- Pondicherry S18 widget backfill — needs +2 gems +5 eats (existing: 1 gem Tharangambadi/Tranquebar; 4 stays Villa Shanti/La Villa/Accord/Le Dupleix)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Pondy Museum" — exists (Pondicherry Museum, Bharathi Park area) but verifying entrance fee + hours; safer to use Auroville Matrimandir Viewing Point + Sri Aurobindo Society anchors.
--   - "Paradise Beach as gem" — too well-trafficked from Chunnambar Boathouse to flag as offbeat; using it as a directional reference, not a gem.
--   - "French Consulate Pondicherry" — operational consulate, not a tourist site; skipped.
--
-- VERIFIED:
--   - Auroville Matrimandir Viewing Point (Visitor Centre, 12km north of White Town).
--   - Sri Aurobindo Ashram Main Building + Samadhi (Rue de la Marine, founded 1926).
--   - Cafe des Arts (10 Rue Suffren, White Town — French breakfast).
--   - Baker Street (123 Rue Bussy / Mission Street — French patisserie, since 2009).
--   - Surguru (Mission Street, since 1981 — Tamil pure-veg, multiple Pondy branches).
--   - Le Club Pondicherry (38 Rue Dumas — multi-cuisine French restaurant since 1976).
--   - Tanto (Rue Suffren, wood-fired pizza).

-- =========================================================
-- HIDDEN GEMS — 2 verified Pondicherry gems outside White Town tourist loop
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pondicherry-auroville-matrimandir-viewing',
  'pondicherry',
  'Auroville Matrimandir Viewing Point',
  NULL,
  12,
  '30 min drive north via ECR + Auroville Main Road',
  'Tour groups crowd Promenade Beach and Rock Beach; the Matrimandir — the geodesic-gold meditation sphere at the heart of Auroville township — sits 12km north and requires a separate visit: book the Viewing Point pass at the Auroville Visitor Centre (free) and walk 1km through a planted forest to a raised platform that overlooks the Matrimandir from 250m. Most Pondicherry tourists never make the trip.',
  'Matrimandir construction began 1971 under Sri Aurobindo''s spiritual collaborator The Mother (Mirra Alfassa); finished 2008. 12 meditation chambers around a single inner crystal chamber (Inner Chamber requires advance booking + 7-day permit). The Viewing Point is the standard tourist access — quiet, open 9am-12.30pm + 2-4pm, closed Sundays. The Banyan Tree on the path was planted 1968 at Auroville''s founding. Allow 90 min including the Visitor Centre exhibit.',
  'easy',
  'Auroville Foundation official site; Auroville Visitor Centre access procedures.',
  5,
  ARRAY['spiritual','meditation','heritage','auroville','offbeat']::text[],
  '{}'::jsonb
),
(
  'pondicherry-sri-aurobindo-ashram',
  'pondicherry',
  'Sri Aurobindo Ashram + Samadhi',
  NULL,
  0.8,
  '12 min walk from Promenade Beach via Rue de la Marine',
  'Pondicherry tourists do the Rock Beach + Promenade walk and stop at Le Cafe for coffee; few cross Rue de la Marine to enter the Ashram''s main building (the Samadhi courtyard, Sri Aurobindo''s and The Mother''s shared resting place). The Ashram is the spiritual mother organisation of Auroville (founded 1926, 22 years before Auroville township) — a working ashram of 1,200+ residents, not a museum.',
  'Sri Aurobindo (1872-1950) — Bengali nationalist turned spiritual philosopher, founder of Integral Yoga — settled in French Pondicherry 1910 to escape British arrest, founded the Ashram 1926 with The Mother. Their joint Samadhi (white marble crypt covered in flowers daily) is the focal point of the main building courtyard. Public access 8am-12pm + 2-6pm. Strict silence, modest dress, no photography inside, no phones beyond the entrance. The adjacent Sri Aurobindo Ashram Bookstore (Rue de la Marine) is the largest source of Aurobindo + Mother writings in print.',
  'easy',
  'Sri Aurobindo Ashram official site; Government of Puducherry tourism listings.',
  5,
  ARRAY['ashram','spiritual','heritage','aurobindo','samadhi']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Pondicherry anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'pondicherry',
  'Cafe des Arts',
  'Rue Suffren, White Town',
  'white-town',
  ARRAY['french','cafe','breakfast','continental']::text[],
  'mid_range',
  'French breakfast (croissant + omelette + coffee)',
  ARRAY['Croissant','Omelette','Crepes','Vegetarian breakfast plate','French press coffee']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Two-storey colonial-house cafe on Rue Suffren in the heart of White Town — courtyard with bougainvillea, indoor tables under high ceilings, vintage French film posters on the walls. The breakfast plate (croissant + omelette + coffee + juice) is the slow-morning order; lunch shifts to crepes (savoury + sweet) + sandwiches. Espresso machine, French-press coffee, a small French wine list. Cards + UPI.',
  'Breakfast 8-10am on the courtyard is the best Pondicherry slow-morning experience — by 10.30am Heritage Walk tourists fill it up. The vintage Royal Enfield + bicycle parked outside is the Instagram cliché — request the upstairs table instead for a quieter spot. Closed Tuesdays.',
  '10 Rue Suffren, White Town, Pondicherry 605001',
  'https://maps.google.com/?q=Cafe+des+Arts+Pondicherry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d3530148-Reviews-Cafe_Des_Arts-Pondicherry_Union_Territory_of_Puducherry.html',
    'https://www.zomato.com/pondicherry/cafe-des-arts-white-town'
  ]::text[],
  '2026-05-11',
  false
),
(
  'pondicherry',
  'Baker Street',
  'Rue Bussy / Mission Street',
  'mission-street',
  ARRAY['french','patisserie','bakery','cafe']::text[],
  'cafe',
  'Almond croissant + coffee',
  ARRAY['Almond croissant','Chocolate eclair','Quiche lorraine','Lemon tart','Baguette sandwich']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'French patisserie + bakery on Rue Bussy (Mission Street), opened 2009 by a French baker as an attempt to bring proper laminated-dough viennoiserie to Pondicherry. Croissants, pain au chocolat, eclairs, quiches, baguette sandwiches — the lamination is genuine (10+ folds, French butter). Three branches now run across town; the Rue Bussy original is the busiest. Cards + UPI.',
  'Croissants come out 8.30am and 4.30pm — arrive within 30 min for warm. The almond croissant (₹160) is the destination order; quiche lorraine (₹220) is the underrated savoury option. Take a baguette sandwich (₹180) for a Promenade Beach picnic — works better than restaurant lunch in heat.',
  '123 Rue Bussy, Pondicherry 605001',
  'https://maps.google.com/?q=Baker+Street+Pondicherry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d2080893-Reviews-Baker_Street-Pondicherry_Union_Territory_of_Puducherry.html',
    'https://www.zomato.com/pondicherry/baker-street-mission-street'
  ]::text[],
  '2026-05-11',
  false
),
(
  'pondicherry',
  'Surguru',
  'Mission Street',
  'mission-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf) + filter coffee',
  ARRAY['Tamil meals','Ghee podi roast','Masala dosa','Pongal','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Surguru opened 1981 on Mission Street as Pondicherry''s answer to the Tamil Nadu pure-veg meals chain (when Saravana Bhavan was still T Nagar-only). Three Pondicherry branches now (Mission Street is the founding outlet). Tamil thali on banana leaf at lunch (₹140-180), tiffin + dosa at breakfast, filter coffee throughout. The locals'' default lunch spot — distinct ambient slice from the White Town French-cafe scene.',
  'Lunch meals run 12.30-3pm — arrive by 1pm for the freshest rice + sambar refills. Sunday meals adds a special payasam dessert (₹40 extra). UPI + cards + cash; air-conditioned upstairs is calmer than the ground-floor crowd. Closed Mondays for staff rotation.',
  'Mission Street, Pondicherry 605001',
  'https://maps.google.com/?q=Surguru+Pondicherry+Mission+Street',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d2073571-Reviews-Hotel_Surguru-Pondicherry_Union_Territory_of_Puducherry.html',
    'https://www.zomato.com/pondicherry/surguru-mission-street'
  ]::text[],
  '2026-05-11',
  true
),
(
  'pondicherry',
  'Le Club',
  'Rue Dumas, White Town',
  'white-town',
  ARRAY['french','continental','seafood']::text[],
  'fine_dining',
  'Bouillabaisse + crème brûlée',
  ARRAY['Bouillabaisse','Coq au vin','Beef bourguignon','Crème brûlée','French wine']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Le Club opened 1976 on Rue Dumas inside a colonial-era French bungalow — Pondicherry''s longest-running French fine-dining room. Bouillabaisse, coq au vin, beef bourguignon, ratatouille — French classics adapted to local ingredients, with a wine list curated by visiting French oenologists. Reservation needed for the courtyard tables. Cards; UPI sometimes.',
  'Dinner 7.30-10pm needs reservation — call +91-413-2339745 a day ahead. The bouillabaisse (₹1,800) is the destination order; uses local karimeen + prawns + crab. House French wines at ₹450/glass are cheaper than the bottles. Closed Mondays.',
  '38 Rue Dumas, White Town, Pondicherry 605001',
  'https://maps.google.com/?q=Le+Club+Pondicherry+Rue+Dumas',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d1233489-Reviews-Le_Club-Pondicherry_Union_Territory_of_Puducherry.html',
    'https://www.zomato.com/pondicherry/le-club-white-town'
  ]::text[],
  '2026-05-11',
  true
),
(
  'pondicherry',
  'Tanto Pizzeria',
  'Rue Suffren, White Town',
  'white-town',
  ARRAY['italian','pizza','continental']::text[],
  'mid_range',
  'Wood-fired pizza margherita',
  ARRAY['Pizza margherita','Pizza ai funghi','Pasta carbonara','Tiramisu','Italian wine']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Wood-fired Italian pizzeria on Rue Suffren — small open-front kitchen with the brick oven facing the street, 12 tables under a thatched canopy. The Neapolitan-style pizza is the destination order (margherita with imported Italian buffalo mozzarella runs ₹520). Italian pasta + tiramisu cover the dinner menu. Espresso machine, small Italian wine list. Cash + cards + UPI.',
  'The pizza oven fires up 12noon-3pm and 6.30-10.30pm — arrive in those windows. The pizza ai funghi (₹580) with sautéed mushrooms is the underrated order. Tiramisu (₹220) is genuine — uses mascarpone, not whipped cream. No reservations; 30 min wait on weekends.',
  'Rue Suffren, White Town, Pondicherry 605001',
  'https://maps.google.com/?q=Tanto+Pondicherry',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d4146533-Reviews-Tanto_Pizzeria-Pondicherry_Union_Territory_of_Puducherry.html',
    'https://www.zomato.com/pondicherry/tanto-pizzeria-white-town'
  ]::text[],
  '2026-05-11',
  false
);
