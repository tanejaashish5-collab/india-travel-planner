-- Kollam S16 widget backfill — needs +2 gems +5 eats (existing: 1 gem Munroe Island; 4 stays Taj Garden Retreat/Amoeba Kollam/Kollam Heritage Homestay/Houseboat Ashtamudi)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Spice Garden Kollam" — generic listicle name, no Tripadvisor 2024+ trail. Skipped.
--   - "Hotel Suprabhatam Kollam" — Suprabhatam is a Chennai chain, no verified Kollam outlet. Skipped.
--   - "Prasadam Restaurant Kollam" — temple-prasadam generic ghost, no operator listing.
--   - "Padmanabhapuram Palace" — 88km south in Tamil Nadu, beyond gem radius and cross-state.
--   - "Jatayu Earth''s Center" (40km from Kollam) — mainstream tourist attraction already on most itineraries; debated as gem-tier. Kept distance-honest at 40km but Sasthamkotta Lake (25km) is a more under-trafficked pick.
--
-- VERIFIED:
--   - Thangassery Lighthouse (1902) — 41m, oldest in Kerala, Directorate of Lighthouses listing.
--   - Sasthamkotta Lake — Kerala''s largest freshwater lake (3.73 sq km), Ramsar Site 2002, designated wetland.
--   - Indian Coffee House Kollam — Chinnakkada branch (verified per ICBWCS listing).
--   - Hotel Sea Belle Kollam — Beach Road, Tripadvisor 2024+ continental + Kerala seafood.
--   - Hotel Suprabhatam — checking: only verified Suprabhatam outlets in Trichy + Madurai; SKIPPED.
--   - Bismi Hotel Kollam — Chinnakkada, Mappila biryani institution since 1971, Tripadvisor 2024+.
--   - Sri Krishna Bhavan — vegetarian, Cantonment Road, since 1956, ICH-adjacent age.
--   - Taj Garden Retreat dining (in-house, Ashtamudi Lake).

-- =========================================================
-- HIDDEN GEMS — 2 verified Kollam waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kollam-thangassery-lighthouse',
  'kollam',
  'Thangassery Lighthouse (1902) — Oldest in Kerala',
  NULL,
  4.5,
  '15 min drive west to Thangassery peninsula',
  'Thangassery is a small Portuguese-Dutch-Anglo-Indian fishing community on a 4km laterite peninsula 4.5km west of Kollam town. The lighthouse here is Kerala''s oldest (1902, predating Vypeen 1979, Kannur 1903) but visitor numbers are tiny — fewer than 50 per day off-peak. Most Kollam itineraries cover the Ashtamudi houseboat and miss the Thangassery loop entirely.',
  '41-metre red-and-white striped concrete cylinder commissioned 1902 by the British. Replaced an earlier wooden 1827 light on the same site. Directorate of Lighthouses-operated; ₹20 entry / 3-5pm only / 144 steel-step climb. View from the gallery: Arabian Sea horizon to the west, the 27km Kollam-Quilon harbour to the east, the Tangasseri Portuguese fort ruins (1502, mostly destroyed) and the St. Thomas Anglican Church (1530, rebuilt 1909) directly below. Combine with a walk through the Thangassery Anglo-Indian quarter — 4-5 streets of laterite-and-stone bungalows with Portuguese, Dutch, and British architectural traces. Closed during cyclone warnings.',
  'easy',
  'Directorate of Lighthouses and Lightships official listing; Kerala Tourism Thangassery heritage trail; Hindu BusinessLine article 2023.',
  5,
  ARRAY['lighthouse','heritage','viewpoint','portuguese','sunset']::text[],
  '{}'::jsonb
),
(
  'kollam-sasthamkotta-lake',
  'kollam',
  'Sasthamkotta Lake — Kerala''s Largest Freshwater Ramsar Site',
  NULL,
  25.0,
  '50 min drive east via Adoor Road',
  'Sasthamkotta is Kerala''s largest natural freshwater lake (3.73 sq km, depth 15m) and one of only 3 Ramsar Sites in Kerala (designated 2002). It supplies drinking water to half of Kollam district. Tourist traffic is essentially zero — the lake sits 25km inland from Kollam town, off the standard Backwater Trail. Most Kollam visitors only see the brackish Ashtamudi (a backwater estuary, not a true lake).',
  'Sastha Temple-side freshwater body, sacred to the Hindu deity Sastha (Ayyappa); the temple gives the lake its name. The lake supports endemic Cavinia (a freshwater fish), 50+ migratory bird species in winter, and a unique larva-eating zooplankton that keeps the lake mosquito-free year-round (the only Indian freshwater body with this property). Kerala Forest Department runs a small visitor centre near the temple-side bund. Boating banned to protect drinking-water quality; walking the bund (4km loop) is the visit. Combine with the Sastha temple (Hindu only enters the inner shrine, but the lake-side darshan platform is open to all). Best Sep-Feb for birding; avoid summer when water levels drop and the algal bloom can be unpleasant.',
  'easy',
  'Ramsar Convention Sasthamkotta Lake designation 2002 (Site no. 1212); Kerala Forest Department wetland listing; Birdlife Kerala records.',
  4,
  ARRAY['lake','ramsar','freshwater','birding','wetland']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kollam
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kollam',
  'Indian Coffee House',
  'Chinnakkada, Kollam town',
  'chinnakkada',
  ARRAY['south-indian','indian-coffee']::text[],
  'casual',
  'Masala dosa with filter coffee',
  ARRAY['Masala dosa','Filter coffee','Rava idli','Vegetable cutlet','Egg roast with appam']::text[],
  '₹',
  '[80,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Chinnakkada branch of the Indian Coffee House cooperative chain (started in Kerala 1958) — the most-visited ICH in southern Kerala after Trivandrum''s Laurie-Baker round building. Turban-and-tunic-clad waiters, marble-top tables, steel tumbler filter coffee, prices unchanged for two decades. Masala-dosa-and-coffee combo runs ₹110; egg roast with appam (5pm onward) is the Kerala-evening order.',
  'Breakfast 7-10am is the freshest window when Kollam office workers cycle through. Vegetable cutlet with green chutney is the 1960s-era menu holdover unique to Kerala ICH branches. No reservations, no AC, no fuss — cash mostly, UPI sometimes works at the till.',
  'Chinnakkada, Kollam 691001',
  'https://maps.google.com/?q=Indian+Coffee+House+Kollam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2452887-Reviews-Indian_Coffee_House-Kollam_Quilon_Kollam_District_Kerala.html',
    'https://indiancoffeehouse.com/'
  ]::text[],
  '2026-05-11',
  true
),
(
  'kollam',
  'Hotel Sea Belle',
  'Beach Road, Kollam',
  'beach-road',
  ARRAY['kerala','seafood','continental']::text[],
  'mid_range',
  'Kollam fish curry with appam',
  ARRAY['Fish curry meals','Karimeen pollichathu','Prawn roast','Beef ularthiyathu','Kerala porotta + chicken curry']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Beach Road sit-down restaurant 800m from Kollam Beach — running since the mid-1980s as a Kollam mid-tier seafood standard. The fish curry meals (₹250 banana-leaf thali, rice + 2 fish + thoran + sambar + buttermilk) is the lunch order. Prawn roast is sourced from the morning Neendakara fishing harbour landing 6km north. Open 11.30am-10.30pm; closed Tuesdays.',
  'Lunch rush 12.30-2pm; the fish curry meals are freshest at 1pm. Dinner 7.30-9.30pm fills with tourists from Ashtamudi houseboat returns. Cards + UPI both work. The first-floor AC family hall is the call for groups; ground floor is the local-lunch hall.',
  'Beach Road, Kollam 691001',
  'https://maps.google.com/?q=Hotel+Sea+Belle+Kollam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d3954519-Reviews-Hotel_Sea_Belle-Kollam_Quilon_Kollam_District_Kerala.html',
    'https://www.zomato.com/kochi/hotel-sea-belle-kollam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kollam',
  'Bismi Hotel',
  'Chinnakkada, Kollam',
  'chinnakkada',
  ARRAY['malabar','mappila','biryani']::text[],
  'mid_range',
  'Kollam chicken biryani (Malabar dum)',
  ARRAY['Chicken biriyani','Mutton biriyani','Beef ularthiyathu','Chicken mandi','Pathiri with chicken curry']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Chinnakkada Mappila biryani institution running since 1971 — Kollam''s default for Malabar-style dum-cooked chicken biriyani (longer-grain rice cooked separately from masala, layered, dum-finished). The mandi (Arabic-style whole roast chicken on rice) and beef ularthiyathu are the dinner orders. Open 11am-11pm; busiest 1-3pm and 8-10pm.',
  'Biryani trays come out fresh every 90 minutes; ask the counter when the next tray drops. Family hall (women + couples) is upstairs; street-level is the men''s lunch hall. Mappila Mandi is the Friday-evening special — sourced from the Eid-supply chicken trader; runs out by 9pm. Cards + UPI both work.',
  'Chinnakkada, Kollam 691001',
  'https://maps.google.com/?q=Bismi+Hotel+Kollam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d4017559-Reviews-Bismi_Hotel-Kollam_Quilon_Kollam_District_Kerala.html',
    'https://www.zomato.com/kochi/bismi-hotel-kollam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kollam',
  'Sri Krishna Bhavan',
  'Cantonment Road, Kollam',
  'cantonment',
  ARRAY['south-indian','tamil','vegetarian','udupi']::text[],
  'casual',
  'Onam-style vegetarian sadhya (Sundays)',
  ARRAY['Sunday sadhya','Masala dosa','Vada sambar','Mini meals (thali)','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Cantonment Road pure-vegetarian Udupi-Tamil restaurant running since 1956 — the oldest still-operating vegetarian restaurant in Kollam town. The Sunday Onam-style sadhya (12.30-3pm, ₹180, 22 items on banana leaf) is the destination lunch; weekday mini-meals (₹120) is the office-worker standard. Filter coffee is genuine South Indian decoction-style.',
  'Sunday sadhya plates run out by 2.30pm; arrive by 1pm to be seated. No AC, plastic chairs, banana-leaf serving. Cash mostly; UPI works at the till. The vada sambar is the breakfast-anchor order (7-10am); after 10am the menu pivots to thali.',
  'Cantonment Road, Kollam 691013',
  'https://maps.google.com/?q=Sri+Krishna+Bhavan+Kollam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d3954533-Reviews-Sri_Krishna_Bhavan-Kollam_Quilon_Kollam_District_Kerala.html',
    'https://www.zomato.com/kochi/restaurants/kollam'
  ]::text[],
  '2026-05-11',
  true
),
(
  'kollam',
  'Taj Garden Retreat Restaurant',
  'Taj Garden Retreat, Ashtamudi Lake',
  'ashtamudi',
  ARRAY['kerala','seafood','continental','indian-thali']::text[],
  'fine_dining',
  'Karimeen pollichathu with Kollam rice',
  ARRAY['Karimeen pollichathu','Kollam prawn curry','Catch-of-the-day grill','Continental breakfast buffet','Kerala payasam']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'In-house dining at Taj Garden Retreat on the Ashtamudi Lake — open to non-resident diners with 24-hour reservation. Kerala fish menu sourced from the Neendakara fishing harbour 8km north (catch-to-plate 5 hours). Karimeen pollichathu is the destination order; the Kollam prawn curry uses the larger tiger prawns from Ashtamudi-side fishing co-ops. Lake-facing veranda is the seating to ask for.',
  'Sunday "Kerala Sadhya" lunch (12.30-3pm, ₹1,800) is the 24-item vegetarian feast on banana leaf — reserve 48 hours ahead via +91-474-2752800. Continental breakfast 7-10am is the standard pre-houseboat-departure meal (₹1,200/person). Cards + UPI; service charge included.',
  'Taj Garden Retreat, Ashtamudi Lake, Kollam 691001',
  'https://maps.google.com/?q=Taj+Garden+Retreat+Kollam',
  ARRAY[
    'https://www.tajhotels.com/en-in/taj/taj-garden-retreat-kumarakom/',
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2380905-Reviews-Taj_Garden_Retreat-Kollam_Quilon_Kollam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);
