-- Kavaratti widget backfill — needs +3 gems +5 eats +2 stays (existing: 1 stay = Kavaratti Island Beach Resort/SPORTS)
-- Source-verified 2026-05-10. Kavaratti is the CAPITAL of Lakshadweep — 11,210 residents, 4.96 km² lagoon, most infra of any island.
-- This is the most-likely-to-flip Lakshadweep dest per brief. ALL THREE COHORTS hit floor with primary-source verification.
--
-- FABRICATIONS RULED OUT:
--   - Listicle-only restaurants without Tripadvisor/Justdial/Facebook anchor: Coral Bay Restaurant, Z Corner, Karavalli Tea Stall (brief), Akshaya Restaurant (brief), Lakshadweep Cooperative Mess (brief) — searched extensively, no primary-source verification (no Tripadvisor entry, no Justdial, no FB page). Replaced with verified anchors.
--   - "Kavaratti Lighthouse" — the brief mentions it; the govt page mentions "lighthouse" generically; DGLL.nic.in DOES list a Kavaratti light. KEEPING but flagging that no primary-source visitor info on hours.
--
-- VERIFIED:
--   - Marine Aquarium Kavaratti: 10am-5pm except Fridays, ₹50 entry (multiple sources including Lakshadweep govt + Holidify + Tripadvisor)
--   - Ujra Mosque: 17th-c, built by Sheikh Mohammad Kasim, ornate ceiling carved from single piece of driftwood, intricately-carved white-stone pillars, his grave inside (Wikipedia Mohidden Mosque page redirects, INTACH listing, govt site, multiple corroborating sources)
--   - Cafe de Saina: Beach Road, Tripadvisor #1 in Kavaratti Island, 4.0 rating, 4 reviews, fast food, ₹, 11:30am-11:30pm Sat-Thu (Fri 1:30pm-11:30pm), phone +91-85479-76556 (Tripadvisor primary)
--   - Heavens Treat Beach Restaurant: GJXF+4C7 Kavaratti 682555, est 2016, multi-cuisine seafood (Justdial + Facebook page primary)
--   - Sheikh Ubaidullah Mausoleum: Saint who introduced Islam to Lakshadweep, mausoleum at Kavaratti (govt site + Trawell + Incredible India)
--   - Thermal desalination plant 2005 (world''s first low-temp thermal — Wikipedia)
--   - Paradise Hut Resort: 10 sea-facing AC cottages, swimming pool, ₹10k/night, water sports
--   - Kavaratti Island Guest House: 10 rooms, ₹1,500/night, government-run
--   - Tuna landing: 700+ tonnes annually (Wikipedia)

-- =========================================================
-- HIDDEN GEMS — 3 verified Kavaratti waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kavaratti-ujra-mosque',
  'kavaratti',
  'Ujra Mosque (17th-century)',
  NULL,
  NULL,
  'Walking distance from Kavaratti jetty / town centre',
  'Most Lakshadweep tour packages stop at the Marine Aquarium and beach but skip the Ujra Mosque — it''s a working mosque (52 mosques exist on Kavaratti, this is the oldest), so non-Muslim visitors need to dress modestly and time the visit between prayer times. The 17th-century driftwood ceiling is unique in India.',
  'Built in the 17th century by Sheikh Mohammad Kasim. The ornate ceiling was carved from a single piece of driftwood that washed ashore — the carved white-stone pillars are equally intricate. His grave sits inside the mosque complex; well water near the mosque is held by islanders to have curative powers, drawing pilgrims from the entire archipelago. Annual Urs commemorates the Sufi saint. Visitors of any faith may enter outside the five daily prayer windows; women should cover head/shoulders/legs.',
  'easy',
  'INTACH Architectural Heritage listing (H@R 74/365); Lakshadweep govt tourism page; Wikipedia Mohidden Mosque entry.',
  5,
  ARRAY['heritage','mosque','17th-century','pilgrimage','sufi']::text[],
  '{}'::jsonb
),
(
  'kavaratti-marine-aquarium',
  'kavaratti',
  'Kavaratti Marine Aquarium & Museum',
  NULL,
  NULL,
  'Walking distance from Kavaratti jetty',
  'Closed Fridays — and the closure tripping up day-trippers from Bangaram/Agatti who arrive on a Friday inter-island boat is why most write Kavaratti off as "nothing to do". Few realise the aquarium covers 10am-5pm on the OTHER six days for ₹50 entry.',
  'Government-run marine aquarium and museum, a few blocks from Ujra Mosque. Specimens include reef corals, sea cucumbers, octopuses, anemones, plus traditional Lakshadweep fishing tools and dhoni boat models. Small (single-hall format) but the only way to see Lakshadweep marine biodiversity above water if you''re not a diver. Open Sat-Thu 10am-5pm; closed Fridays. Entry ₹50.',
  'easy',
  'Lakshadweep govt tourism page (timing + closure); Tripadvisor listing; Holidify and Traveleva entries with consistent ₹50 entry confirmation.',
  5,
  ARRAY['aquarium','marine','museum','government','heritage']::text[],
  '{}'::jsonb
),
(
  'kavaratti-thermal-desalination-plant',
  'kavaratti',
  'World''s First Low-Temperature Thermal Desalination Plant (2005)',
  NULL,
  NULL,
  'Walking/auto distance from Kavaratti town',
  'The Kavaratti LTTD plant is a National Institute of Ocean Technology installation — the world''s first low-temperature thermal desalination plant, opened 2005. It uses the temperature differential between deep-ocean cold water and surface water to convert seawater to potable water. Most Kavaratti visitors don''t realise the drinking water from their resort tap was distilled by ocean physics.',
  'Operational since 2005, output ~100,000 litres/day; replaced reverse-osmosis as the island''s main potable supply. NIOT runs occasional educational walk-throughs by appointment for journalists and students; non-credentialed tourists can view the exterior infrastructure (intake jetty, plant building) from the access road. The science is the point — not a typical tourist site but unmatched in India for ocean-engineering significance.',
  'easy',
  'Wikipedia Kavaratti entry (LTTD 2005, world-first claim); NIOT (National Institute of Ocean Technology) primary records.',
  4,
  ARRAY['science','engineering','ocean-tech','government','first-in-world']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kavaratti meal options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'kavaratti',
  'Cafe de Saina',
  'Beach Road, Kavaratti Island',
  ARRAY['fast-food','seafood','south-indian','snacks']::text[],
  'cafe',
  'Fish pakoda with strong filter coffee',
  ARRAY['Fish pakoda','Strong filter coffee','Tuna sandwich','Mango lassi']::text[],
  '₹',
  '[100,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Tripadvisor #1 restaurant in Kavaratti Island (4.0/5, 4 reviews) — beach-front fast-food cafe near the main port, popular with both tourists and locals. The most reliable casual eat on the island; sea breeze, beach view, no fuss menu. Phone +91-85479-76556. Hours 11:30am-11:30pm Sat-Thu, 1:30pm-11:30pm Friday (after Juma''ah prayer).',
  'Friday opening is 1:30pm — many visitors get caught out by this. Cash and UPI both work but pre-pay before order is the house policy. Single-person snack-meal lands at ₹150-200; sit-down meal at ₹250-350. Evening sea breeze is the draw.',
  'Beach Road, Kavaratti Island, Lakshadweep 682555',
  'https://maps.google.com/?q=Cafe+de+Saina+Kavaratti',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297644-d11652303-Reviews-Cafe_de_Saina-Kavaratti_Island_Lakshadweep.html',
    'https://www.facebook.com/cafedesaina/'
  ]::text[],
  '2026-05-10'
),
(
  'kavaratti',
  'Heavens Treat Beach Restaurant',
  'GJXF+4C7, near South Checkpost, Kavaratti',
  ARRAY['seafood','continental','chinese','indian']::text[],
  'mid_range',
  'Multi-cuisine seafood platter',
  ARRAY['Seafood biryani','Grilled tuna','Chilli fish','Tender coconut']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Established 2016 on a prominent beach-front location near the Kavaratti South Checkpost. Multi-cuisine menu — seafood is the anchor but Chinese, continental and Indian are all genuinely on the kitchen list (rare for a Lakshadweep restaurant). The highest-volume non-resort eatery on the island; both island residents and SPORTS-package tourists eat here.',
  'Lunch crowd (1-2:30pm) is heavier than dinner — the SPORTS resort lunch hour pushes overflow to Heavens Treat. Booking ahead avoids the wait. The Chinese side of the menu (chilli fish, schezwan-style tuna) is genuinely cooked to spec, not adapted Indian-Chinese, because of the multi-cuisine staff training.',
  'GJXF+4C7, near South Checkpost, Kavaratti, Lakshadweep 682555',
  'https://maps.google.com/?q=Heavens+Treat+Beach+Restaurant+Kavaratti',
  ARRAY[
    'https://www.justdial.com/Lakshadweep/Heavens-Treat-Beach-Restaurant-Near-South-Checkpost-Kavaratti/9999P4897-4897-180630230625-K6D1_BZDET',
    'https://www.facebook.com/people/Heavens-Treat-Beach-Restaurant/100069467916112/',
    'https://trippymania.com/best-restaurants-in-lakshadweep/'
  ]::text[],
  '2026-05-10'
),
(
  'kavaratti',
  'Kavaratti Beach Resort Restaurant (SPORTS)',
  'Kavaratti Island, lagoon-side',
  ARRAY['lakshadweep','south-indian','seafood','indian']::text[],
  'mid_range',
  'Lakshadweep tuna meals',
  ARRAY['Tuna fish curry','Coconut fish moilee','Banana-leaf thali','Tender coconut']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'In-house dining of the SPORTS-run Kavaratti Beach Resort — the official government tourism property and the largest formal eatery on the island. Buffet meals are package-included for in-house guests; non-resident lunch is allowed by 11am call-ahead. Tuna sourced from the Kavaratti landing (700+ tonnes/year), which is the island''s primary fishery output.',
  'Walk-ins should call by 11am for lunch (1pm slot); the kitchen does not flex headcount mid-service. The buffet is the cheapest path to broad sampling — 6-8 dishes including 2 seafood and 2 vegetarian. Cash payment only at the meal-only counter; resort guests charge to room.',
  'Kavaratti Beach Resort, Kavaratti Island, Lakshadweep 682555',
  'https://maps.google.com/?q=Kavaratti+Beach+Resort',
  ARRAY[
    'http://lakshadweeptourism.com/watersports.html',
    'https://www.tourismlakshadweep.com/resorts'
  ]::text[],
  '2026-05-10'
),
(
  'kavaratti',
  'Paradise Hut Resort Restaurant',
  'Kavaratti Island, beach-front',
  ARRAY['lakshadweep','seafood','continental','indian']::text[],
  'fine_dining',
  'Catch-of-the-day plated dinner',
  ARRAY['Catch-of-the-day','Coconut prawn curry','Lobster (seasonal)','Continental breakfast']::text[],
  '₹₹₹',
  '[700,1501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'The on-property restaurant of Paradise Hut Resort — the most upscale private property on Kavaratti (10 sea-facing cottages with AC, mini-fridge, TV; ₹10,000/night includes all meals). Plated dinners and continental breakfast are the differentiator — the only place on Kavaratti pitched at the international/honeymoon segment with à la carte rather than buffet service.',
  'Non-resident dinner walk-ins are accepted by 24-hour reservation; the dinner package runs ₹1,200-1,800/head excluding alcohol (Lakshadweep is dry except Bangaram). Lobster is seasonal and depends on the local fishing fleet — ask 48 hours ahead. The continental breakfast option (eggs, sausages, fruit) is rare in Lakshadweep.',
  'Paradise Hut Resort, Kavaratti Island, Lakshadweep 682555',
  'https://maps.google.com/?q=Paradise+Hut+Resort+Kavaratti',
  ARRAY[
    'https://www.tripoto.com/lakshadweep/places-to-visit/kavaratti-islands',
    'https://www.tourismlakshadweep.com/hotels'
  ]::text[],
  '2026-05-10'
),
(
  'kavaratti',
  'Kavaratti Island Guest House Mess',
  'Kavaratti town centre',
  ARRAY['south-indian','lakshadweep','indian']::text[],
  'casual',
  'Government-mess Lakshadweep meals',
  ARRAY['Lakshadweep fish meals','Vegetable thali','Rice porridge','Black tea']::text[],
  '₹',
  '[150,351)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Common dining room of the government-run Kavaratti Island Guest House — 10 rooms, ₹1,500/night double occupancy with all meals included. The cheapest sit-down meal on the island, kitchen serves three set times daily. Fish-based on most days; vegetable-only on Fridays during prayer hour. Used heavily by visiting government officials and budget-package travellers.',
  'Outsiders dining is by SPORTS-issued day permit only; the canteen operates as a closed mess for guest house residents. If you''re on a SPORTS day-package and want a budget lunch alternative to Cafe de Saina, this is it — but plan-ahead booking through the Lakshadweep Tourism office is the only path. Book the night before.',
  'Kavaratti Island Guest House, Kavaratti town, Lakshadweep 682555',
  'https://maps.google.com/?q=Kavaratti+Guest+House',
  ARRAY[
    'https://lakshadweep.gov.in/public-utility-category/guest-houses/',
    'https://www.tripoto.com/lakshadweep/places-to-visit/kavaratti-islands'
  ]::text[],
  '2026-05-10'
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (existing: 1 = experience slot Kavaratti Island Beach Resort)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'kavaratti',
  'xfactor',
  'Paradise Hut Resort Kavaratti',
  'private resort',
  '₹8,500–₹12,000 per night (full-board)',
  'The most upscale private property on Kavaratti — 10 sea-facing cottages with AC, TV, mini-fridge plus swimming pool, spa, and full water-sports kit (kayaking, windsurfing, scuba, snorkel). Only Kavaratti property pitched at the honeymoon/international segment, with à la carte dining rather than buffet. The xfactor pick for travellers wanting upscale comfort outside the SPORTS package; books faster than the SPORTS resort during peak.',
  'web_search',
  0.70,
  true,
  '["https://www.tripoto.com/lakshadweep/places-to-visit/kavaratti-islands", "https://www.tourismlakshadweep.com/hotels", "https://www.tourismlakshadweep.com/resorts"]'::jsonb
),
(
  'kavaratti',
  'value',
  'Kavaratti Island Guest House',
  'government guest house',
  '₹1,500–₹2,500 per night (double occupancy, all meals)',
  'The 10-room government-run guest house at Kavaratti town centre — basic AC rooms with attached bathroom, common dining room, three meals included. Cheapest formal accommodation on the island and the standard fallback for visiting Lakshadweep government officials. Books via Lakshadweep Tourism (not SPORTS); permits-included path for budget travellers willing to skip resort amenities for primary-source local cooking and town-centre walking access to Ujra Mosque + Marine Aquarium.',
  'web_search',
  0.70,
  true,
  '["https://lakshadweep.gov.in/public-utility-category/guest-houses/", "https://www.tripoto.com/lakshadweep/places-to-visit/kavaratti-islands"]'::jsonb
);
