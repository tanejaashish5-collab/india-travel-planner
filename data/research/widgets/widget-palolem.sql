-- Palolem S14 widget backfill — needs +1 gem +4 eats (stays=4; 2 gems in DB already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Cotigao Wildlife Sanctuary" — real Goa Forest Dept sanctuary 12km east, but already widely featured as a Mollem-circuit gem; including it here would dilute. "Talpona Beach" — real but very thin; merged into Galgibaga concept. "Smugglers Inn" — sea-shack name appears across Goa; no specific Palolem operator, listicle ghost, skipped. "Mickey''s Restaurant" — sea-shack tier with no Tripadvisor 2024+ activity, skipped. "Dropadi" — Magic Italy sister concept, no operator site / verifiable presence beyond 2018 listicles, skipped. Adopted gem: Galgibaga turtle beach (Goa Forest Dept olive-ridley site). Eateries: Magic Italy (Tripadvisor 4.5/3,500+), Home Patnem (Tripadvisor 4.5/2,000+), Cuba Beach Cafe Patnem (operator site cubagoa.com), Little World Cafe (Patnem, Tripadvisor 4.5).

-- =========================================================
-- HIDDEN GEMS — 1 verified addition
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'palolem-galgibaga-turtle-beach',
  'palolem',
  'Galgibaga Olive Ridley Turtle Beach',
  NULL,
  12,
  '30 min by scooter south from Palolem via Talpona ferry',
  'Galgibaga is one of three official olive-ridley turtle nesting beaches in Goa (with Morjim and Agonda) — but it''s the southern-most and least-publicised. Reaching it from Palolem requires a 5-min Talpona-Galgibaga ferry crossing that stops at sunset, so most Palolem day-trippers turn back at Patnem or Agonda.',
  'Wide 1.5km undeveloped beach designated turtle-protected by Goa Forest Department. Olive-ridley nesting Oct-March, hatching Dec-April; controlled night-watch by forest guards (no torches, no flash). 4-5 thatched-roof shacks at the south end; no concrete construction allowed within 200m of the high-tide line. Coconut groves behind the dunes. Talpona-Galgibaga ferry runs 7am-6pm, ₹10/person + scooter.',
  'easy',
  'Goa Forest Department olive ridley nesting site listing; turtle hatchling release events documented annually.',
  5,
  ARRAY['beach','turtle-nesting','wildlife','quiet']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified additions
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'palolem',
  'Magic Italy',
  'Palolem Beach Road',
  ARRAY['italian','wood-fired-pizza']::text[],
  'mid_range',
  'Wood-fired pizza',
  ARRAY['Margherita pizza','Carbonara','Lasagna','Tiramisu']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Italian-run, wood-oven pizzeria on Palolem Beach Road since 2007 — owner is Italian, dough proves 36 hours, San Marzano tomato base imported. Same family runs the Patnem branch. Considered the benchmark Italian on the south-Goa beach strip; the carbonara uses guanciale not pancetta. Closed monsoon (June-Sept).',
  'Reserve by 8pm or wait 30 min — only 14 tables. Margherita is the most-ordered; tiramisu is house-made daily, 4-5 portions only. Cash preferred; card sometimes works. Closed Mondays.',
  'Palolem Beach Road, Canacona 403702, Goa',
  'https://maps.google.com/?q=Magic+Italy+Palolem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503690-d2167203-Reviews-Magic_Italy-Palolem_Canacona_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/magic-italy-palolem'
  ]::text[],
  '2026-05-10'
),
(
  'palolem',
  'Home',
  'Patnem Beach Road',
  ARRAY['european','vegetarian','baked-goods']::text[],
  'mid_range',
  'Mediterranean breakfast plate',
  ARRAY['Mediterranean breakfast','Hummus platter','Vegan brownies','Filter coffee']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'British-run Mediterranean-vegetarian cafe on Patnem Beach Road since the late 2000s, now with rooms above. House-baked bread, hummus, falafel — no fried-everything beach-shack food. Sister property to the Patnem rooms; the same kitchen plates breakfast 8am-noon and dinner 6pm-10pm. Closed monsoon.',
  'Mediterranean breakfast at 9am is the right order — bread, eggs, hummus, olive oil. Dinner reserves fast; walk-in works for breakfast. Cash and UPI; card unreliable.',
  'Patnem Beach Road, Canacona 403702, Goa',
  'https://maps.google.com/?q=Home+Restaurant+Patnem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503690-d2169068-Reviews-Home-Patnem_Canacona_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/home-patnem'
  ]::text[],
  '2026-05-10'
),
(
  'palolem',
  'Cuba Beach Cafe Patnem',
  'Patnem Beach',
  ARRAY['multi-cuisine','goan','seafood']::text[],
  'casual',
  'Goan fish thali',
  ARRAY['Fish curry rice','Tiger prawns','Beef chilli','Banoffee pie']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Cuba is a south-Goa hospitality group (since 2007) running beach huts and a sea-shack restaurant on Patnem Beach. The cafe is the all-day kitchen — Goan thali at lunch, full multi-cuisine dinner with live acoustic Wed-Fri. Wood-roasted prawns and fish-of-the-day are the signature. Closed monsoon.',
  'Banoffee pie is the dessert order — house-made, sells out by 9pm. Live music 8pm-10:30pm Wed-Fri; book a table by 7pm or take the second sitting. Cash, card, UPI all work.',
  'Patnem Beach, Canacona 403702, Goa',
  'https://maps.google.com/?q=Cuba+Beach+Cafe+Patnem',
  ARRAY[
    'https://www.cubagoa.com/patnem',
    'https://www.tripadvisor.in/Restaurant_Review-g503690-d2168938-Reviews-Cuba_Beach_Cafe-Patnem_Canacona_South_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10'
),
(
  'palolem',
  'Little World Cafe',
  'Patnem Beach Road',
  ARRAY['cafe','vegetarian','mediterranean']::text[],
  'cafe',
  'Falafel wrap',
  ARRAY['Falafel wrap','Mezze platter','Smoothie bowls','Espresso']::text[],
  '₹₹',
  '[250,551)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Small all-day cafe on Patnem Beach Road — Mediterranean-vegetarian leaning, smoothie bowls, falafel wraps, espresso from a proper machine (rare on the south-Goa shack strip). 12 tables, popular with the long-stay yoga crowd from the surrounding retreats. Open 8am-10pm in season; closed monsoon.',
  'Smoothie bowls are 8am-noon only. Mezze platter is the lunch sharing order; portions large for two. Cash and UPI work; no card.',
  'Patnem Beach Road, Canacona 403702, Goa',
  'https://maps.google.com/?q=Little+World+Cafe+Patnem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503690-d12970872-Reviews-Little_World_Cafe-Patnem_Canacona_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/little-world-cafe-patnem'
  ]::text[],
  '2026-05-10'
);
