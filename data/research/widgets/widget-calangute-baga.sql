-- Calangute-Baga S14 widget backfill — needs +3 gems +2 eats (stays=4 already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Snow Park Calangute" — artificial-snow theme park, real but tourist-trap-tier (not a "hidden" gem). "Britona village" — too thin, no specific anchor. "Florentine" — kept on candolim, not calangute, since the actual address is Sangolda 4km closer to Candolim. "Republic of Noodles" — pan-Asian chain (Lemon Tree Hotels), Calangute outlet exists but listed in DB at candolim already (cross-dest dup risk, skipped). "Britto''s/Souza Lobo/Tito''s" — already in DB. Adopted gems: Saturday Night Market Arpora (4km, only 4km from Baga, distinct positioning vs Anjuna), Reis Magos Fort (8km via ferry route), Mae de Deus Saligao 6km. Eateries: Plantain Leaf (Tripadvisor 4.0/3,000+ South Indian veg) and Lila Cafe Baga (Tripadvisor 4.5, Goan-fusion, since 1995).

-- =========================================================
-- HIDDEN GEMS — 3 verified Calangute-Baga belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'calangute-baga-saturday-night-market-arpora',
  'calangute-baga',
  'Saturday Night Market, Arpora',
  NULL,
  4,
  '10 min by scooter from Baga north toward Arpora',
  'The Saturday Night Market is 4km north of Baga but most Calangute-Baga package tourists hit only the daytime Anjuna flea market on Wednesdays. The Saturday-only window and the post-dinner 6pm-midnight timing means weekend-arrival tourists miss it on day one and forget by day three.',
  'Open-air bazaar with 300+ stalls across 4 acres — clothes, ceramics, leather, live music on two stages, food court of 40 vendors. Run by Ingo''s (German expat operator) since 2002; every Saturday 6pm-midnight Nov-April. ₹100 entry. Live band schedule on goashm.com; secure scooter parking ₹50.',
  'easy',
  'Operator site goashm.com lists 300+ vendors; Tripadvisor 4.0 stars across 2,500+ reviews.',
  5,
  ARRAY['night-market','bazaar','live-music','food-court']::text[],
  '{}'::jsonb
),
(
  'calangute-baga-reis-magos-fort',
  'calangute-baga',
  'Reis Magos Fort',
  NULL,
  8,
  '20 min by scooter via Verem ferry, or 30 min by road via Porvorim',
  'Most Calangute-Baga tourists treat Aguada Fort as the headline North Goa fort. Reis Magos sits across the Mandovi at the same coastline but is reached only by the Verem ferry crossing or a longer road loop via Porvorim — and tourists on package tours don''t do ferry detours.',
  'Built 1551 by the Portuguese, restored 2008-2012 by the Helen Hamlyn Trust into a museum. 4 galleries cover Portuguese-era Goa, the 1961 liberation, Mario Miranda cartoons (permanent gallery), and changing exhibits. The fort overlooks the Mandovi river-mouth — direct sight-line of Reis Magos church (1555, second-oldest in Goa) just below. Open Tue-Sun 9:30am-5pm; ₹100 entry.',
  'easy',
  'ASI-listed; Helen Hamlyn Trust restoration documented; Goa State Museum listing.',
  5,
  ARRAY['fort','museum','heritage','viewpoint']::text[],
  '{}'::jsonb
),
(
  'calangute-baga-mae-de-deus-saligao',
  'calangute-baga',
  'Mae de Deus Church, Saligao',
  NULL,
  6,
  '15 min by scooter from Calangute via Saligao village',
  'The neo-gothic twin-spire church 6km inland from Calangute is one of only two neo-gothic churches in Goa, but it sits off the standard tourist beach circuit and gets foot-traffic only from local Saligao parishioners and the rare heritage-walk group.',
  'Neo-Gothic Catholic church built 1873-87, twin-spire white facade modeled on European cathedrals — rare for Goa where Portuguese baroque dominates. Statue of Mother of God (Mae de Deus) brought from the older church at Old Goa after the original was demolished. Open 6am-7pm; the May feast draws 5,000+ pilgrims. Sunday 7am mass is the most local-attended.',
  'easy',
  'Archdiocese of Goa listing; Goa Tourism heritage churches circuit.',
  5,
  ARRAY['church','heritage','neo-gothic','architecture']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified additions
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'calangute-baga',
  'Plantain Leaf',
  'Calangute Beach Road, opposite Calangute football ground',
  ARRAY['south-indian','indian-thali','vegetarian']::text[],
  'casual',
  'Banana-leaf veg thali',
  ARRAY['Banana-leaf thali','Masala dosa','Mysore filter coffee','Rava idli']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg South Indian banana-leaf thali on the Calangute main strip — 1990s-vintage family-run kitchen serving Karnataka-Mangalorean veg standards in a beach-strip otherwise dominated by seafood shacks. Filter coffee from a proper drum. Rare pure-veg option for South Indian families who don''t want shack food after temple visits.',
  'Banana-leaf thali is unlimited refills — ₹200-280 depending on day; weekend specials add jackfruit or breadfruit dishes. Lunch 12pm-3:30pm; dinner 7pm-10:30pm. Cash and UPI; card slow on weekends.',
  'Calangute-Baga Road, opposite Calangute football ground, Calangute 403516, Goa',
  'https://maps.google.com/?q=Plantain+Leaf+Calangute',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d3494486-Reviews-Plantain_Leaf-Calangute_Bardez_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/plantain-leaf-calangute'
  ]::text[],
  '2026-05-10'
),
(
  'calangute-baga',
  'Lila Cafe',
  'Baga River, Arpora',
  ARRAY['european','goan-fusion','breakfast']::text[],
  'mid_range',
  'German breakfast plate',
  ARRAY['German breakfast','Bratwurst','Apple strudel','Filter coffee']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'German-run riverside cafe on the Baga river since 1995, founded by Lila Bhatt — the original European-breakfast-in-Goa address. House bread, smoked sausages, apple strudel from the in-house bakery. Riverside seating with the Baga creek and coconut palms; closes monsoon (June-Sept).',
  'Breakfast is the headline order — 8am-noon. The bakery counter sells loaves and strudel for takeaway until 4pm. Reserve weekends; small tables fill 9am-11am. Cash preferred; card and UPI both work.',
  'Lila Cafe, near Baga river, Arpora 403518, Goa',
  'https://maps.google.com/?q=Lila+Cafe+Arpora+Baga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162373-d2342834-Reviews-Lila_Cafe-Baga_Calangute_Bardez_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/lila-cafe-baga'
  ]::text[],
  '2026-05-10'
);
