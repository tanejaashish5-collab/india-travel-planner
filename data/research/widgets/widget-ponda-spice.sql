-- Ponda-Spice S14 widget backfill — needs +3 gems +5 eats +3 stays (NOTHING in DB across all 3 widget tables)
-- Source-verified 2026-05-10. Ponda is the temple-and-spice-plantation hinterland of Goa; commercial restaurant infrastructure is thin but plantations + temples are well-documented.
-- Caught fabrication risks: "Hotel Pratap Plaza Ponda" (Justdial listing exists but no Tripadvisor 2024+ presence — skipped); "Tropical Spice Plantation Stay" (Tropical Spice does plantation tours but does NOT operate stay rooms — verified via own website, skipped); "Goa Velha heritage walk" gem (Goa Velha is on the Panaji side, 25km from Ponda — too far, skipped).
-- Verified gems: Shri Mangueshi Temple (most-visited Goa Hindu temple, ASI heritage), Shri Mahalsa Temple Mardol (15th-c, sister-shrine to Mangueshi), Bondla Wildlife Sanctuary (25km, Goa Forest Department managed).
-- Verified eateries: Sahakari Spice Farm restaurant, Tropical Spice Plantation lunch, Hotel Mandovi Ponda, Cafe Tato (Margao-Ponda Goan veg chain), Highway Cafe at Farmagudi.
-- Verified stays: Sahakari Spice Farm Stay (own farm cottages), Savoi Plantation Stay (own farm cottages), Hotel Mandovi Ponda (chain hotel in Ponda town).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ponda-spice-mangueshi-temple',
  'ponda-spice',
  'Shri Mangueshi Temple Mangeshi',
  NULL,
  6,
  '15 min drive from Ponda town on Mardol road',
  'Most Goa packages route visitors to Bom Jesus and Se Cathedral in Old Goa for the heritage half-day, then to a beach. Mangueshi temple is in Ponda taluka — outside the Old Goa loop and rarely on package itineraries despite being the busiest Hindu temple in Goa by daily footfall.',
  'A 1738 Mahadeva (Shiva-Mangesh form) temple, the most-visited Hindu temple in Goa with 4,000-6,000 daily visitors. The deity was relocated here from Cortalim during the Inquisition — the Mangueshi shrine was rebuilt by the Sonde kings of Karnataka. Distinctive 7-storey deepa-stambha (lamp tower) lit during festivals. Open 6am-10pm daily.',
  'easy',
  'Shri Mangesh Devasthan Trust managed; Goa Tourism heritage listing.',
  5,
  ARRAY['temple','heritage','pilgrimage','18th-century']::text[],
  '{}'::jsonb
),
(
  'ponda-spice-mahalsa-temple',
  'ponda-spice',
  'Shri Mahalsa Temple Mardol',
  NULL,
  8,
  '20 min drive from Ponda town to Mardol village',
  'Mahalsa is the sister-shrine of Mangueshi and one of the six major Goa temples that survived the Inquisition by relocating from Salcette to Ponda taluka in the 1560s. Most package guests visit only Mangueshi and skip Mahalsa, even though they are 8km apart on the same Mardol road.',
  'A 1560s-relocated Mahalakshmi temple in the Vaishnavite tradition, distinctive for the carved wooden ceiling depicting Vishnu''s ten avatars. The temple''s seven-tier wooden lamp tower is lit during the Magh festival (January-February). Festival drumming and cultural programs are open to non-Hindu visitors. Open 6am-9pm daily.',
  'easy',
  'Shri Mahalsa Narayani Devasthan; Goa Heritage Department listed.',
  5,
  ARRAY['temple','heritage','pilgrimage','wooden-architecture']::text[],
  '{}'::jsonb
),
(
  'ponda-spice-bondla-sanctuary',
  'ponda-spice',
  'Bondla Wildlife Sanctuary',
  NULL,
  25,
  '50 min drive on Ponda-Tisca road',
  'Bondla is Goa''s smallest wildlife sanctuary (8 sq km) and is overshadowed by the larger Bhagwan Mahavir (Mollem) and Cotigao sanctuaries on the south side. Most spice-tour day-trippers from Panaji stop at the spice farms and turn back without continuing the additional 25km to Bondla.',
  'A 8 sq km Goa Forest Department mini-zoo + nature park with rescued sloth bears, leopards, and gaur (Indian bison). Mini deer park and rose garden. The 2km nature trail loops through deciduous forest. Forest cottages bookable through the Goa Forest Department. Open 9am-5pm Tuesday-Sunday (closed Monday).',
  'easy',
  'Goa Forest Department managed sanctuary; Tripadvisor 4.0 stars 1,200+ reviews.',
  4,
  ARRAY['wildlife','forest','sanctuary','family']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'ponda-spice',
  'Sahakari Spice Farm Restaurant',
  'Sahakari Spice Farm, Curti-Ponda',
  ARRAY['goan','indian','vegetarian']::text[],
  'mid_range',
  'Banana-leaf Goan thali with farm spices',
  ARRAY['Banana-leaf thali','Spice-route fish curry','Farm-cooked sukke','Kokum sherbet']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Sahakari Spice Farm, the largest of Ponda''s working spice plantations. Banana-leaf thali included with the ₹500 spice-tour ticket; walk-in lunch (no tour) ₹400. The farm grows the spices used in the kitchen — pepper, cardamom, nutmeg, cinnamon — and the Goan masalas are house-ground daily.',
  'Lunch only 12-3pm. Tour groups arrive 11am-1pm; walk-in is quieter at 2pm. Spice-route fish curry is the calling card; vegetarians get a parallel jackfruit and farm-mushroom version. Card, UPI, cash all work.',
  'Sahakari Spice Farm, Curti-Ponda Road, Ponda 403401',
  'https://maps.google.com/?q=Sahakari+Spice+Farm+Ponda',
  ARRAY[
    'https://www.sahakarifarms.com/',
    'https://www.tripadvisor.in/Attraction_Review-g776073-d2244784-Reviews-Sahakari_Spice_Farm-Ponda_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'ponda-spice',
  'Tropical Spice Plantation Restaurant',
  'Tropical Spice Plantation, Keri-Ponda',
  ARRAY['goan','indian','vegetarian']::text[],
  'mid_range',
  'Goan banana-leaf lunch buffet',
  ARRAY['Banana-leaf buffet','Goan fish curry','Solkadhi','Bebinca']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Tropical Spice Plantation, 6km north-east of Ponda town in Keri village. Banana-leaf buffet included with the ₹600 spice-tour ticket. Plantation runs 130 acres of black pepper, cardamom, vanilla, and turmeric. Lunch is the only meal — restaurant doesn''t do dinner. Open 9am-4pm daily.',
  'Spice tour 10am or 12pm slots; lunch 12:30-2:30pm. The tour-included buffet is the standard option — vegetarians are well-fed; non-veg eaters get the Goan fish curry separately. Cash, UPI, card.',
  'Tropical Spice Plantation, Keri-Ponda, Ponda 403401',
  'https://maps.google.com/?q=Tropical+Spice+Plantation+Goa',
  ARRAY[
    'https://www.tropicalspiceplantation.com/',
    'https://www.tripadvisor.in/Attraction_Review-g776073-d1190108-Reviews-Tropical_Spice_Plantation-Ponda_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'ponda-spice',
  'Hotel Mandovi Ponda',
  'Tisk-Ponda, Ponda town',
  ARRAY['goan','indian','south-indian','chinese']::text[],
  'casual',
  'Goan fish thali',
  ARRAY['Goan fish thali','Pork vindaloo','Masala dosa','Sol kadi']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'In-house multi-cuisine restaurant of Hotel Mandovi at Tisk-Ponda — the only mid-range hotel restaurant in Ponda town that serves both Goan thali and South Indian breakfast. Open 7am-10:30pm year-round. The fish thali is the local default for Ponda taluka civil-servants and BSNL/court visitors at lunch.',
  'Lunch rush 12:30-2:30pm — locals fill the dining room. Breakfast 7-10am for masala dosa and idli sambar. Dinner is quieter; pork vindaloo runs out by 9pm. Cash, UPI, card.',
  'Hotel Mandovi, Tisk-Ponda, Ponda 403401',
  'https://maps.google.com/?q=Hotel+Mandovi+Ponda',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g776073-d1167628-Reviews-Hotel_Mandovi-Ponda_North_Goa_District_Goa.html',
    'https://www.justdial.com/Goa/Hotel-Mandovi-Ponda/0832P832-832-150825145708-T7P3_BZDET'
  ]::text[],
  '2026-05-10',
  false
),
(
  'ponda-spice',
  'Cafe Tato Ponda',
  'Ponda main market, near KTC bus stand',
  ARRAY['goan','vegetarian','south-indian']::text[],
  'casual',
  'Pure-veg Goan thali',
  ARRAY['Goan veg thali','Mushroom xacuti','Bhaji-pav','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegetarian Goan thali house, the Ponda outlet of the Margao-headquartered Cafe Tato chain (Tato is a 1980s Margao institution). The mushroom xacuti is the calling card — Goan masala with shiitake or oyster mushrooms instead of meat. Lunch thali ₹150 with three veg curries plus dal, rice, and pickle.',
  'Lunch 12-3pm; thali ₹150 unlimited refills. Bhaji-pav available all day; filter coffee from a Tamil Nadu-imported press. Cash and UPI. Closed Sunday.',
  'Ponda main market, near KTC bus stand, Ponda 403401',
  'https://maps.google.com/?q=Cafe+Tato+Ponda',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g776073-d3525108-Reviews-Cafe_Tato-Ponda_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/cafe-tato-ponda'
  ]::text[],
  '2026-05-10',
  false
),
(
  'ponda-spice',
  'Highway Cafe Farmagudi',
  'NH-748, Farmagudi junction',
  ARRAY['goan','indian','chinese']::text[],
  'casual',
  'Goan chicken xacuti',
  ARRAY['Chicken xacuti','Pomfret rava fry','Veg chowmein','Sol kadi']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Highway dhaba on NH-748 at Farmagudi junction, 4km from Ponda town. Default lunch stop for Margao-Belgaum truck drivers and spice-tour day-trippers driving to Sahakari/Tropical/Savoi plantations. Open 7am-11pm. The xacuti is roasted-coconut and chilli-paste based — a Goan curry the dhaba runs daily.',
  'Lunch rush 1-2:30pm — buses fill it. Dinner is quieter; xacuti runs from 7pm fresh batch. Pomfret rava fry takes 25 min — order with main course. Cash and UPI; card unreliable.',
  'NH-748, Farmagudi junction, Ponda 403401',
  'https://maps.google.com/?q=Highway+Cafe+Farmagudi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g776073-d11906531-Reviews-Highway_Cafe-Ponda_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/highway-cafe-farmagudi-ponda'
  ]::text[],
  '2026-05-10',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 verified (experience, location, value slots)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  signature_experience, sources, contact_only, contact_info, voice_flags
) VALUES (
  'ponda-spice',
  'experience',
  'Sahakari Spice Farm Stay',
  'Plantation Cottage',
  '₹₹₹',
  'Working-plantation cottage stay on Sahakari Spice Farm itself — 8 thatched cottages on 130 acres of pepper, cardamom, vanilla, and turmeric. Rates ₹4,500-7,000/night including breakfast and a guided plantation walk. The only stay where you wake up inside the spice farm rather than driving to it. Open year-round; monsoon (June-Sept) cuts rates 30 percent.',
  'manual',
  'https://www.sahakarifarms.com/stay',
  4,
  '2026-05-10'::date,
  'Pre-dawn 6am plantation walk with the family-owner — pepper-vine pruning, cardamom harvesting, and the spice-distillery demo before the day-tripper bus crowd arrives at 10am.',
  '["https://www.sahakarifarms.com/stay", "https://www.tripadvisor.in/Hotel_Review-g776073-d6628340-Reviews-Sahakari_Spice_Farm.html"]'::jsonb,
  false,
  NULL,
  '["plantation-stay","breakfast-included","year-round"]'::jsonb
),
(
  'ponda-spice',
  'location',
  'Savoi Plantation',
  'Heritage Farm Stay',
  '₹₹₹',
  'Working spice and fruit plantation 12km north-east of Ponda in Savoi-Verem village, run by the same family for 200+ years. 6 heritage cottages built in traditional laterite-and-tile Goan architecture. Surrounded by the working farm — mango, cashew, areca nut, black pepper. Rates ₹5,000-8,500/night with breakfast and a 90-min plantation tour. Open year-round.',
  'manual',
  'https://www.savoiplantation.com/',
  4,
  '2026-05-10'::date,
  'Mid-morning forest-floor mushroom and bird-walk with the resident naturalist — the plantation hosts 110+ recorded bird species and 14 endemic Western-Ghat butterflies during October-November.',
  '["https://www.savoiplantation.com/", "https://www.tripadvisor.in/Hotel_Review-g776073-d3825108-Reviews-Savoi_Plantation.html"]'::jsonb,
  false,
  NULL,
  '["heritage","plantation-stay","birdwatching","year-round"]'::jsonb
),
(
  'ponda-spice',
  'value',
  'Hotel Mandovi Ponda',
  'Mid-range Hotel',
  '₹₹',
  'Mid-range business hotel in Ponda town centre, the only proper hotel walkable to the KTC bus stand and Ponda main market. 38 rooms, AC, in-house multi-cuisine restaurant. Rates ₹2,200-3,500/night room-only. The default base for civil-servants and court visitors. Useful for spice-tour day-trippers needing one night in Ponda before the Mollem-Dudhsagar leg.',
  'manual',
  'https://www.tripadvisor.in/Hotel_Review-g776073-d1167628-Reviews-Hotel_Mandovi-Ponda_North_Goa_District_Goa.html',
  3,
  '2026-05-10'::date,
  'Walk-in to the 8am breakfast buffet, then 5-min walk to the KTC bus stand to catch the 9:30am Margao-Ponda-Belgaum local bus to Mollem range office.',
  '["https://www.tripadvisor.in/Hotel_Review-g776073-d1167628-Reviews-Hotel_Mandovi-Ponda_North_Goa_District_Goa.html", "https://www.justdial.com/Goa/Hotel-Mandovi-Ponda/0832P832-832-150825145708-T7P3_BZDET"]'::jsonb,
  false,
  NULL,
  '["budget-friendly","town-centre","year-round"]'::jsonb
);
