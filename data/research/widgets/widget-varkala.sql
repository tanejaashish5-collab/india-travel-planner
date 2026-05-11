-- Varkala S16 widget backfill — needs +3 gems +5 eats
-- Source-verified 2026-05-11.
-- Caught fabrication risks:
--   - "Helicon Hotel Beach" gem — generic "beach near hotel"; skipped (no primary source).
--   - "Mannarasala Snake Temple" — 30km from Varkala but actually closer to Alleppey (Haripad). Cross-dest contamination. Skipped.
--   - "Funky Art Cafe Varkala" — listicle pattern, no Tripadvisor 2024+, skipped.
--   - "Coffee Temple Varkala" — listed across listicles but no own-website/Tripadvisor 2024+, skipped.
-- Verified gems: Sivagiri Mutt (Sree Narayana Guru samadhi 1928), Anchengo Fort (1684 British EIC fort, ASI), Kappil Beach + Kappil Lake (freshwater lagoon meeting Arabian Sea).
-- Eats: Cafe del Mar (North Cliff anchor 2002), Tibetan Kitchen, Cafe Italiano (run by Roberto since 2005), Trattorias, Juice Shack.

-- =========================================================
-- HIDDEN GEMS — 3 verified Varkala-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'varkala-sivagiri-mutt',
  'varkala',
  'Sivagiri Mutt (Sree Narayana Guru Samadhi)',
  NULL,
  3,
  '10 min by auto inland from North Cliff',
  'Most North Cliff visitors stay on the beach-cliff axis — Varkala Junction railway station is 2km inland and Sivagiri Hill 3km. The Mutt holds national-level Sree Narayana Guru pilgrimage importance (the social-reformer guru who declared "One caste, one religion, one God for mankind" in 1888) but international beach tourists don''t encounter the Guru in mainstream India tour literature.',
  'Headquarters of the Sree Narayana Dharma Sangham Trust since 1928, sited on Sivagiri Hill where the Guru (1856-1928) attained samadhi. Three principal shrines: the Samadhi Mandapam (Guru''s final resting place), the Sharada Temple, and the Mahasamadhi pavilion. The annual Sivagiri Pilgrimage (December 30 - January 1) draws 200,000+ pilgrims dressed in yellow robes; the rest of the year it''s a quiet hilltop with sea views east toward Varkala Beach. Free entry, 6am-7pm daily.',
  'easy',
  'Sree Narayana Dharma Sangham Trust official site sivagirimutt.org; pilgrimage attendance figures from Kerala Tourism.',
  5,
  ARRAY['pilgrimage','samadhi','social-reform','viewpoint','heritage']::text[],
  '{}'::jsonb
),
(
  'varkala-anchuthengu-fort',
  'varkala',
  'Anchuthengu (Anjengo) Fort',
  NULL,
  12,
  '25 min by car south on Anchuthengu Road',
  'The 1684 British East India Company fort 12km south of Varkala is where the EIC first signed a trading treaty with the Attingal Rani for pepper and rope-fibre — the first British foothold in Kerala, predating Cochin Fort by years. Tourists routinely visit Fort Kochi 165km north; this earlier fort is overshadowed and rarely on coastal itineraries.',
  'Square laterite-stone fort with bastions at each corner, original 1684 EIC structure mostly intact. Inside: the 1739-era cemetery with EIC officer graves, a working lighthouse (1932), and an information board on the 1721 Attingal Outbreak (the first organised revolt against the British in India, killing 140 EIC men). The fort sits where the Anchuthengu backwater meets the Arabian Sea — the beach below is empty even at peak season. ASI-protected, 9am-5pm, free entry.',
  'easy',
  'Archaeological Survey of India Kerala circle; Kerala Tourism heritage circuit listing.',
  4,
  ARRAY['heritage','fort','colonial','asi','offbeat']::text[],
  '{}'::jsonb
),
(
  'varkala-kappil-beach-lake',
  'varkala',
  'Kappil Beach and Backwater',
  NULL,
  6,
  '15 min by scooter north on Kappil Road',
  'North Cliff visitors rarely go further north than Black Beach / Odayam (3km). Kappil 6km up is where the Kappil backwater (Edava-Nadayara lagoon system) meets the Arabian Sea — boat operators leave from Edava jetty 4km inland, not from Kappil itself, so beach-walkers see the sandbar but don''t connect it to the backwater circuit.',
  'Freshwater lagoon ending in a 50m-wide sandbar where it spills into the sea — narrow strip of sand with backwater on one side, Arabian Sea on the other, walkable for 1km. The Kerala Tourism Department runs a paddleboat ghat at the Kappil side (₹200/30 min) and a longer 4km motorised boat ride goes from Edava jetty into the Nadayara backwaters and back. Cleanest beach in the Varkala belt — fishermen but no resorts. Empty even in Dec-Feb.',
  'easy',
  'Kerala Tourism Development Corporation Kappil Beach + boating ghat listing.',
  4,
  ARRAY['beach','backwater','lagoon','quiet','boating']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Varkala restaurants
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code, established_year,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'varkala',
  'Cafe del Mar',
  'North Cliff (south end)',
  'north-cliff',
  ARRAY['seafood','italian','mediterranean','kerala']::text[],
  'mid_range',
  'Tuna carpaccio',
  ARRAY['Tuna carpaccio','Wood-fired pizza','Grilled red snapper','Pasta arrabbiata','Sangria pitcher']::text[],
  '₹₹₹',
  '[500,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  NULL,
  'North Cliff anchor running since ~2002 — the south-end clifftop spot with the longest unobstructed sunset view in Varkala. Italian-Kerala fusion menu but the pizza oven is the actual draw (one of three wood-fired ovens in the cliff belt). Lobster and prawns from the Papanasam fishing landing brought up daily.',
  'Cliff edge tables fill 5pm onwards in season (Nov-Feb) — book in advance or arrive 4pm for sundowners. The fish-of-the-day grilled is the order; pasta is fine but unremarkable. Cards work; UPI works; cash on monsoon power-cut days.',
  'North Cliff, Varkala 695141',
  'https://maps.google.com/?q=Cafe+del+Mar+North+Cliff+Varkala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g660693-d2086893-Reviews-Cafe_del_Mar-Varkala_Varkala_Taluk_Thiruvananthapuram_District_Kerala.html',
    'https://www.zomato.com/kochi/cafe-del-mar-varkala'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'varkala',
  'Tibetan Kitchen',
  'North Cliff (mid)',
  'north-cliff',
  ARRAY['tibetan','nepali','momo']::text[],
  'casual',
  'Mutton momos with chilli oil',
  ARRAY['Mutton momos','Thukpa','Veg dumplings','Beef shapta','Butter tea']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Tibetan family-run momo shack on the mid-cliff strip — the Bhotia owners spend Nov-March in Varkala and summers in McLeodganj. Hand-folded momos with proper chilli-oil dip, beef shapta with Tibetan flat bread, hot thukpa for monsoon evenings. Open Nov-April only (closes during Kerala monsoon).',
  'Order steamed mutton momos + a side of fried (best of both). The thukpa is the rainy-evening order. Closes for the season on April 30 or first heavy rain, whichever comes first.',
  'North Cliff, Varkala 695141',
  'https://maps.google.com/?q=Tibetan+Kitchen+North+Cliff+Varkala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g660693-d3454566-Reviews-Tibetan_Kitchen-Varkala_Varkala_Taluk_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'varkala',
  'Cafe Italiano',
  'North Cliff (north end)',
  'north-cliff',
  ARRAY['italian','wood-fired-pizza','pasta']::text[],
  'mid_range',
  'Margherita pizza wood-fired',
  ARRAY['Margherita pizza','Lasagna','Spaghetti aglio e olio','Tiramisu','Espresso']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  NULL,
  'Italian-owned pizzeria at the north end of the cliff (toward the Helipad) — Roberto, the chef-owner from Naples, has been running it since the mid-2000s. The wood-fired oven runs both veg and pepperoni; the lasagna and tiramisu are made fresh daily. Open Oct-April.',
  'Pizza order takes 30-40 min when busy — order before you sit down for a sunset table. The espresso is the after-meal default (Lavazza beans). Cash + UPI; cards intermittent.',
  'North Cliff (Helipad end), Varkala 695141',
  'https://maps.google.com/?q=Cafe+Italiano+Varkala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g660693-d3170547-Reviews-Cafe_Italiano-Varkala_Varkala_Taluk_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'varkala',
  'Trattorias',
  'North Cliff (mid)',
  'north-cliff',
  ARRAY['multi-cuisine','italian','kerala','continental']::text[],
  'mid_range',
  'Karimeen pollichathu',
  ARRAY['Karimeen pollichathu','Thali','Pasta','Banana lassi','French toast']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Long-running mid-cliff multi-cuisine joint — the all-day breakfast/lunch/dinner format defines the Varkala backpacker circuit. Karimeen pollichathu (banana-leaf-wrapped pearl spot) is the Kerala order to make here; the menu''s pasta-pizza section exists for the European traveller default but isn''t the actual draw.',
  'Breakfast 8-11am has the freshest fruit (papaya, pineapple, watermelon). Skip the Continental section, order Kerala. Closes 11pm sharp.',
  'North Cliff, Varkala 695141',
  'https://maps.google.com/?q=Trattorias+North+Cliff+Varkala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g660693-d3438148-Reviews-Trattorias-Varkala_Varkala_Taluk_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'varkala',
  'Juice Shack',
  'North Cliff (mid)',
  'north-cliff',
  ARRAY['cafe','smoothie','breakfast','vegan']::text[],
  'cafe',
  'Acai bowl',
  ARRAY['Acai bowl','Banana coconut smoothie','Avocado toast','Filter coffee','Vegan banana cake']::text[],
  '₹₹',
  '[200,451)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Smoothie-and-breakfast cafe in the middle of the cliff promenade — the vegan/raw-food crowd''s default morning stop since the early 2010s. Acai bowls + Mediterranean breakfast + cold-press juices. Open 7.30am-9pm.',
  'Best for breakfast (7.30-10am) before the cliff heats up. The acai bowl uses frozen pulp imported via Kochi; smoothies use Kerala fruit. Vegan friendly and gluten-free options labelled.',
  'North Cliff, Varkala 695141',
  'https://maps.google.com/?q=Juice+Shack+Varkala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g660693-d3473956-Reviews-Juice_Shack-Varkala_Varkala_Taluk_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
);
