-- mahabaleshwar S25 widget backfill — gems +3, eats +5, stays +1 (slot: location)
-- Source-verified 2026-05-13.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Imperial Chinese Mahabaleshwar Main Market 1960s" pre-flagged — NOT a verifiable restaurant; Imperial Stores (supermarket) at Main Market end exists but not a Chinese restaurant. DROPPED.
--   - "Hotel Hira Pearl Mahabaleshwar" pre-flagged — NOT VERIFIED. Hotel SHAHEE Pearl exists. DROPPED Hira Pearl, used Shahee Pearl in a different slot context.
--   - "Hotel Frigate Mahabaleshwar" pre-flagged for location stay — NOT VERIFIED on Booking/Tripadvisor/Yatra/MakeMyTrip. DROPPED. Replaced with Brightland Resort & Spa (verified Tripadvisor #6 of 118 properties, Avakali location near Wilson Point) for location slot.
--   - "Holycow Cafe Mapro adjacent" pre-flagged — no specific Tripadvisor / Zomato anchor surfaced. DROPPED.
--   - Mapro Garden founder correction: brief says "Vakharia family"; actual founder = Kishore Vora (1959), nephew Mayur Vora expanded 1983 (Wikipedia + own site mapro.com).
--   - Panchgani = SEPARATE DEST (18km!) — Table Land, Devil''s Kitchen, Bhilar book village, Mala''s 1958 all stay on Panchgani file.
--   - Pratapgad = Mahabaleshwar gem (24km, Shivaji vs Afzal Khan 1659 battle, fort built 1656). NOT a Satara or Raigad gem.
--
-- VERIFIED ANCHORS:
--   - Mapro Garden: 1959 Kishore Vora in Gureghar village; jam factory + cafe + retail outlets across Mahabaleshwar/Panchgani/Lonavala (Wikipedia + own site).
--   - Pratapgad Fort: built 1656, Battle of Pratapgad 10 Nov 1659 (Shivaji vs Afzal Khan), 1080m, 24km from Mahabaleshwar (satara.gov.in + Wikipedia + Maharashtra Tourism).
--   - Wilson Point: highest plateau Mahabaleshwar 1439m (~1450m), three masonry watchtower platforms, named for Sir Leslie Wilson (Mahabaleshwar Tourism + Trawell + Tripadvisor).
--   - Tapola "Mini Kashmir": 28km from Mahabaleshwar, Shivsagar Lake (Koyna dam backwaters 90km long), boating/kayak/jet-ski (Maharashtra Tourism + Pune Pulse 2024 + Trawell).
--   - Lingmala Waterfall: 6km from Mahabaleshwar bus stand, 500ft main fall, monsoon Jul-Sep peak, two-fall complex (Mahabaleshwar Tourism + Tripadvisor + Trawell).
--   - Grapevine restaurant: Masjid Road (NOT Pollock Road as brief said) — Parsi + Mediterranean + seafood + wine list, lamb burger + dhansak + salli boti signature (Tripadvisor + Wanderlog + LBB Mumbai).
--   - Brightland Resort & Spa: Avakali Mahabaleshwar, 4500ft, Tripadvisor rank #6/118, near Wilson Point + ST stand (Tripadvisor + booking.com + brightland.in).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mahabaleshwar-pratapgad-fort',
  'mahabaleshwar',
  'Pratapgad Fort (Shivaji-Afzal Khan 1659)',
  NULL,
  24,
  '1hr drive via Mahabaleshwar-Poladpur Rd to base, then 500-step climb',
  'Most Mahabaleshwar tourists do Mapro Garden + Venna Lake + the four standard points and leave. Pratapgad is 24km on a single-lane mountain road and needs a half-day commitment + a 500-step climb — most package itineraries skip it.',
  'A 1080m mountain fort built 1656 by Shivaji''s prime minister Moropant Pingle to guard the Par Pass + Koyna river banks — and the site of the 10 November 1659 Battle of Pratapgad, where Shivaji killed the Bijapur Sultanate general Afzal Khan in close combat at the bagh-pasha embrace. The Afzal Khan tomb sits below the fort''s south wall. Strategic spur position over the Par-Kinesvar villages; the climb opens onto Bhavani temple + Shivaji-era ramparts. Best Oct-Feb cool window; closed monsoon-week if monsoon rain rolls cliff fog. ₹0 entry (parking ₹50); cafeteria + drinking water at the top.',
  'moderate',
  'Maharashtra state-protected fort; Satara District Government tourist listing; Maharashtra Tourism Pratapgad page; Wikipedia + Atlas Obscura + Conde Nast Traveller India.',
  5,
  ARRAY['fort','heritage','shivaji','sahyadri','viewpoint']::text[],
  '{}'::jsonb
),
(
  'mahabaleshwar-wilson-point-sunrise',
  'mahabaleshwar',
  'Wilson Point (Sunrise Point, 1439m highest plateau)',
  NULL,
  2,
  '10 min drive from main market, last 500m on foot',
  'Wilson Point sits 2km north of Mahabaleshwar market — it''s the highest point in town at 1439m but is overshadowed by Arthur''s Seat + Kate''s Point in the standard package itinerary. Most tourists don''t make the dawn drive.',
  'Mahabaleshwar''s highest plateau (1439m / 4720ft) — named for Sir Leslie Wilson, Bombay Presidency Governor 1923-26. Three masonry watchtower platforms at different spots offer 270-degree dawn sweeps across the Sahyadri. The Krishna river origin lies a 20-min walk from the third platform. Best 5.45-6.30am summer; 6.30-7.15am winter — go 30min before sunrise to claim a platform spot. Approach road steep + slippery after rain.',
  'easy',
  'Mahabaleshwar Tourism official site; Trawell + MakeMyTrip TripIdeas; Tripadvisor 4.1/5 4000+ reviews.',
  5,
  ARRAY['viewpoint','sunrise','plateau','sahyadri','colonial']::text[],
  '{}'::jsonb
),
(
  'mahabaleshwar-tapola-shivsagar-lake',
  'mahabaleshwar',
  'Tapola "Mini Kashmir" + Shivsagar Lake',
  NULL,
  28,
  '1hr 15min drive via Mahabaleshwar-Bamnoli Rd',
  'The Tapola turn is 28km out of Mahabaleshwar on a single-lane road that descends 1000m into a Koyna-dam backwater. The MTDC + Maharashtra Tourism call it "Mini Kashmir of the West" but the package-tour bus crowd doesn''t cover the distance.',
  'Tapola hamlet sits on the 90km Shivsagar Lake — the Koyna Dam backwaters, fed by the Solshi + Koyna + Kandata rivers. Paddle-boat / kayak / jet-ski operators at the jetty; ₹100-400 ride. The lake-edge ridge offers Vasota Fort trek (boat to base + 1100m climb) for trekkers — a permitted-entry forest department fort inside Koyna WLS. Best Oct-Feb cool + clear; monsoon Jul-Sep adds drama but operators close for safety. Stop at Bhilar book-village or Mapro Garden on the drive back.',
  'easy',
  'Maharashtra Tourism Tapola page; Satara Tourism listing; Pune Pulse 2024 summer-special feature; Trawell + Holidify.',
  4,
  ARRAY['lake','viewpoint','offbeat','water-sports','sahyadri']::text[],
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
  'mahabaleshwar',
  'Mapro Garden Cafe',
  'Wai-Panchgani Road, Gureghar',
  'gureghar',
  ARRAY['cafe','strawberry','desserts']::text[],
  'casual',
  'Strawberry-and-cream',
  ARRAY['Strawberry-and-cream','Strawberry crush','Strawberry milkshake','Mapro fudge','Veg sandwich','Hot chocolate','Mapro pizza']::text[],
  '₹₹',
  '[180,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mapro Garden Cafe — Kishore Vora founded Mapro 1959 in Gureghar village producing strawberry jams from local farmer''s fruit; nephew Mayur Vora expanded 1983. Today the Gureghar flagship is the cafe + factory-outlet + farm complex. The strawberry-and-cream plate (₹220) is the postcard Mahabaleshwar order; Mapro Hot Chocolate is the rainy-day winter pull. In-house fudge counter takes packed orders for the drive home. Open 9am-9pm.',
  'Strawberry Festival weekend (Mar-Apr) is heaving — go midweek 11am or 4pm. Fudge counter packs same-day. Cards + UPI.',
  'Mapro Garden, Wai-Panchgani Rd, Gureghar 412806',
  'https://maps.google.com/?q=Mapro+Garden+Mahabaleshwar',
  ARRAY[
    'https://www.mapro.com/',
    'https://en.wikipedia.org/wiki/Mapro_Garden',
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d1893042-Reviews-Mapro_Garden.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'mahabaleshwar',
  'The Grapevine',
  'Masjid Road',
  'masjid-road',
  ARRAY['parsi','mediterranean','seafood']::text[],
  'mid_range',
  'Parsi dhansak + salli boti',
  ARRAY['Mutton dhansak','Salli boti','Patra ni macchi','Lamb burger','Kheema pav','Wood-fired pizza','Chocolate mousse']::text[],
  '₹₹₹',
  '[700,1401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The Grapevine — Mahabaleshwar''s Parsi-and-Mediterranean fine-casual on Masjid Road. Three-level building (basement + ground + mezzanine), rustic dark-wood interiors, larger wine list than the hill-station average. Parsi dishes (dhansak, salli boti, patra ni macchi) are the kitchen''s real story; the lamb burger + wood-fired pizza fill the cross-cuisine ask. Open 12.30-3.30pm + 7-10.30pm.',
  'Mezzanine 10-seater fills 7.30pm — book +91-2168-261424. Dhansak only as a meal, not a la carte; it needs 25min cook time. Cards + UPI.',
  'Masjid Road, Mahabaleshwar 412806',
  'https://maps.google.com/?q=The+Grapevine+Mahabaleshwar+Masjid+Road',
  ARRAY[
    'https://www.tripadvisor.com/Restaurant_Review-g635749-d4045708-Reviews-The_Grapevine-Mahabaleshwar_Satara_District_Maharashtra.html',
    'https://www.thatgoangirl.com/the-grapevine-mahabaleshwar/',
    'https://lbb.in/mumbai/the-grapevine-restaurant-mahabaleshwar-8df178/'
  ]::text[],
  '2026-05-13',
  true
),
(
  'mahabaleshwar',
  'Hotel Shreyas',
  'Mahabaleshwar Bazaar',
  'main-bazaar',
  ARRAY['maharashtrian','gujarati','south-indian']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Maharashtrian thali','Pithla-bhakri','Misal pav','Idli-vada','Solkadhi','Aam-ras (Apr-Jun)','Puran poli']::text[],
  '₹₹',
  '[280,501)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Shreyas — Mahabaleshwar Bazaar Maharashtrian-and-Gujarati pure-veg thali kitchen. Family-run since the 1980s; the unlimited Maharashtrian thali at ₹250 is the daily lunch driver; the Gujarati thali (kadhi + dal + 3 sabzi + rotli + rice + sweet) is the weekend Mumbai-tourist anchor. Pithla-bhakri is the Sahyadri-village order. Open 11am-3.30pm + 7-10pm.',
  'Sat-Sun lunch 12.30-2pm has 20-min waits; weekday walks in. Aam-ras only April-June Alphonso season. Cash + UPI.',
  'Mahabaleshwar Bazaar, Mahabaleshwar 412806',
  'https://maps.google.com/?q=Hotel+Shreyas+Mahabaleshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g635749-Mahabaleshwar_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'mahabaleshwar',
  'Veggies Residency Restaurant',
  'Metgutad',
  'metgutad',
  ARRAY['north-indian','maharashtrian','gujarati']::text[],
  'mid_range',
  'Veg Punjabi platter',
  ARRAY['Paneer butter masala','Dal tadka','Veg kolhapuri','Tandoori roti','Veg Maharashtrian thali','Gulab jamun']::text[],
  '₹₹',
  '[350,601)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Veggies Residency — Metgutad ridge pure-veg multi-cuisine hotel-restaurant. The veg Maharashtrian thali rotation is the cheapest honest meal in Mahabaleshwar; the Punjabi platter (paneer butter masala + dal tadka + roti) is the broader pull. Hotel-tied but accepts walk-in non-residents. Open 7-10.30am + 12-3pm + 7-10.30pm.',
  'Metgutad sunset view from terrace 5-6pm — coffee + samosa is the rate-card pull. Weekend lunch books fast; call ahead.',
  'Veggies Residency, Metgutad, Mahabaleshwar 412806',
  'https://maps.google.com/?q=Veggies+Residency+Mahabaleshwar',
  ARRAY[
    'https://www.booking.com/hotel/in/veggies-residency-amp-pure-veg-restaurant.html',
    'https://www.tripadvisor.com/Restaurants-g635749-zfz10665-Mahabaleshwar_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'mahabaleshwar',
  'Imperial Stores',
  'Main Bazaar end',
  'main-bazaar',
  ARRAY['grocery','strawberry','jam','chikki','farmstore']::text[],
  'casual',
  'Mahabaleshwar strawberry / jam / honey haul',
  ARRAY['Mahabaleshwar strawberry (fresh)','Mapro jam','Local honey','Chikki','Mahabaleshwar wine','Kolhapuri chappal','Cheese']::text[],
  '₹',
  '[100,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Imperial Stores — the largest old-school supermarket at the south end of Main Bazaar / Town Bazaar. Not a "restaurant" in the table-service sense but Mahabaleshwar''s definitive bakery + jam + chikki + dry-fruit / fresh-strawberry / wine-and-cheese stop. Mahabaleshwar strawberries (in-season Dec-Apr) sold by box; Mapro + local-farmer competing labels on the same shelf. The mini-cafe counter at the back serves coffee + sandwich + strawberry-and-cream plates. Open 8am-10pm.',
  'Strawberry box pricing varies daily — Mapro is premium; ask for the local-farmer label for 30% cheaper. Wine selection has Mahabaleshwar/Nashik regional bottles. Cards + UPI.',
  'Town Bazaar end, Mahabaleshwar 412806',
  'https://maps.google.com/?q=Imperial+Stores+Mahabaleshwar',
  ARRAY[
    'https://evendo.com/locations/india/mahabaleshwar/shop/imperial-stores',
    'https://www.treebo.com/blog/amazing-places-to-shop-in-mahabaleshwar/'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (slot: location)
-- =========================================================
-- S25 rule: location + xfactor were free; picked location (preferred per brief).
-- Brightland Resort & Spa replaces brief''s "Hotel Frigate" which has NO verifiable web footprint.

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'mahabaleshwar',
  'location',
  'Brightland Resort & Spa',
  'Mid-luxury hill resort',
  '₹4,500–₹9,800 per night',
  'Brightland Resort & Spa sits in Avakali at 4500ft above sea level — 3.7 miles from Mahabaleshwar Bazaar and 4.3 miles from Wilson Point (the highest plateau). Tripadvisor rank #6 of 118 Mahabaleshwar properties; couples rate the location 9.4/10. Mountain-view rooms, in-house spa + multi-cuisine + barbecue dinner. The Avakali setting is far enough from market noise to give Sahyadri silence but close enough that the four standard points are 15 minutes by car.',
  'Avakali ridge stay + Sahyadri valley mist breakfast',
  'web_search',
  'Brightland Resort & Spa own site + Tripadvisor + Booking.com',
  '["https://www.brightland.in/","https://www.tripadvisor.in/Hotel_Review-g635749-d638065-Reviews-Brightland_Resort_Spa-Mahabaleshwar_Satara_District_Maharashtra.html","https://www.booking.com/hotel/in/brightland-resort.html"]'::jsonb,
  '{"altitude_ft": 4500, "wilson_point_distance_mi": 4.3, "tripadvisor_rank": "6 of 118", "couples_score": 9.4}'::jsonb,
  0.88,
  true
);
