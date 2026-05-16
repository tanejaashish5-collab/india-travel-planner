-- Kumarakom S16 widget backfill — needs +2 gems +5 eats (existing: 1 gem Pathiramanal Island; 4 stays Leela Kumarakom/waterfront homestays/Kumarakom Lake Resort/Spice Village houseboats)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Kayal Restaurant Kumarakom" — generic name, no Tripadvisor 2024+ trail. Skipped.
--   - "Spice Restaurant Kumarakom" — generic name, listicle ghost. Skipped.
--   - Erumeli St. Thomas Church — 50km southeast, beyond gem radius. Skipped.
--   - Cross-dest watch: Vaikom Mahadeva Temple is 15km, within range — kept as gem.
--
-- VERIFIED:
--   - Aymanam Village (5km north of Kumarakom) — Arundhati Roy "God of Small Things" setting, Kerala Tourism literary trail.
--   - Vaikom Mahadeva Temple (15km west) — Shaiva pilgrimage; Vaikom Satyagraha 1924 site (anti-untouchability movement); Travancore Devaswom Board.
--   - Vembanad Restaurant at Kumarakom Lake Resort (in-house, Sthamarakara peninsula).
--   - Ettukettu at Coconut Lagoon (CGH Earth, Kavanattinkara, in-house heritage Kerala dining).
--   - Tharavadu Heritage Home Kumarakom — restaurant + homestay, Tripadvisor 2024+.
--   - Cassia at Lemon Tree Kumarakom area (verified). Note: Lemon Tree Backwaters is closer to Alleppey side (10km). Kept generic for Kumarakom side.
--   - Vembanad Banks (standalone, Cheepunkal). Tripadvisor 2024+ Kumarakom area listing.

-- =========================================================
-- HIDDEN GEMS — 2 verified Kumarakom waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kumarakom-aymanam-village',
  'kumarakom',
  'Aymanam Village — God of Small Things Country',
  NULL,
  5.5,
  '15 min by autorickshaw, or 25 min by canoe',
  'Aymanam is the autobiographical setting of Arundhati Roy''s 1997 Booker-Prize-winning novel God of Small Things — the river is the Meenachil, the Ayemenem House is based on Roy''s grandmother''s family bungalow. Roy''s family still owns parts of the village. Most Kumarakom resort guests have never heard of it; the village itself is 5km north on the Kayalpuram backwater branch.',
  'Walk-through the village that birthed the novel: the Meenachil river, the abandoned Paradise Pickle Factory site (the History House in the novel is loosely based on the Tharavadu near the Ayemenem Bridge), and the Ayemenem Church where Sophie Mol was buried in the story. Kerala Tourism runs a 2-hour "God of Small Things literary walk" (₹400/person, book through Kumarakom Responsible Tourism Mission) — guides are Aymanam villagers, not professionals. Otherwise just take the canoe from the Kumarakom side (₹300 one way, 25 min) and walk the village lanes. Don''t approach the Roy family bungalow — it''s private.',
  'easy',
  'Kerala Tourism Aymanam literary trail listing; Kumarakom Responsible Tourism Mission guided-walk programme; multiple Outlook Traveller and Conde Nast Traveller features 2018-2024.',
  4,
  ARRAY['village','literary','backwaters','arundhati-roy','offbeat']::text[],
  '{}'::jsonb
),
(
  'kumarakom-vaikom-temple',
  'kumarakom',
  'Vaikom Mahadeva Temple + Satyagraha Memorial',
  NULL,
  14.0,
  '35 min drive west via SH-15 Vaikom Road',
  'Vaikom is a major Shaiva pilgrimage centre but most Kumarakom visitors don''t cross to the western side of Vembanad Lake. Beyond the temple, the 1924 Vaikom Satyagraha — the first organised anti-untouchability movement in India, where Gandhi and Periyar both campaigned to let lower-caste Hindus walk the public roads around the temple — has a small memorial 200m east that almost no guidebook mentions.',
  '1500-year-old Shaiva temple (one of three Shiva sites in the Vaikom-Ettumanoor-Kaduthuruthi triangle that Hindus traditionally visit on the same morning, before sunset). The Vaikom Ashtami festival (November-December) is the destination festival — 12-day temple processions with caparisoned elephants. The Satyagraha Memorial commemorates the 1924-1925 anti-caste movement that opened the temple roads to all Hindus; small museum, open 9am-5pm, free entry. Non-Hindus may enter the temple complex up to the outer prakara; inner sanctum Hindus-only. Modest dress (no shorts, no leather belts) at temple entry.',
  'easy',
  'Travancore Devaswom Board temple listing; Kerala Tourism Vaikom Satyagraha centenary 2024 documentation; Indian Express Vaikom Satyagraha 100-year feature April 2024.',
  4,
  ARRAY['temple','heritage','satyagraha','pilgrimage','social-history']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kumarakom + lake-edge
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kumarakom',
  'Vembanad Restaurant at Kumarakom Lake Resort',
  'Sthamarakara peninsula, Kumarakom',
  'sthamarakara',
  ARRAY['kerala','seafood','continental']::text[],
  'fine_dining',
  'Karimeen pollichathu with appam',
  ARRAY['Karimeen pollichathu','Kuttanad duck roast','Seer fish curry meals','Beef ularthiyathu','Pal payasam']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'Signature Kerala-cuisine restaurant at the Paul John Kumarakom Lake Resort, on the Sthamarakara peninsula jutting into Vembanad Lake. Built around the resort''s heritage section — a 165-year-old transplanted Travancore-style mansion. Karimeen pollichathu is the destination order; the Kuttanad duck roast (Kuttanad ducks are bred on Pokkali rice fields, so the meat carries a saline-sweet flavour) is the rarer find. Non-resident bookings welcome 24 hours ahead.',
  'Window tables face Vembanad sunset 5.30-7pm — reserve at +91-481-2524900. The Kuttanad duck roast needs Tuesday/Friday pre-order from the village supplier. Cards + UPI; service charge included. The Sunday "Kerala Sadhya" lunch (12.30-3pm, ₹2,200) is a separate booking.',
  'Kumarakom Lake Resort, Sthamarakara, Kumarakom 686563',
  'https://maps.google.com/?q=Kumarakom+Lake+Resort',
  ARRAY[
    'https://www.kumarakomlakeresort.in/restaurants.html',
    'https://www.tripadvisor.in/Restaurant_Review-g780988-d2076050-Reviews-Vembanad_Restaurant_Kumarakom_Lake_Resort-Kumarakom_Kottayam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumarakom',
  'Ettukettu at Coconut Lagoon',
  'Kavanattinkara, Kumarakom',
  'kavanattinkara',
  ARRAY['kerala','syrian-christian','heritage']::text[],
  'fine_dining',
  'Kerala syrian-christian thali (banana leaf)',
  ARRAY['Syrian-Christian thali','Karimeen mappas','Duck mappas','Kappa with meen curry','Pradhaman']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'CGH Earth''s flagship Kerala-cuisine restaurant at Coconut Lagoon, accessible only by boat from Kavanattinkara jetty (5 min ferry). Built around a transplanted 16th-century Tharavadu (four-quadrangle Kerala mansion). The Syrian-Christian thali — banana leaf, served on Belgian glass plate underneath — is a Kuttanad-specific menu (mappas, fish moilee, kappa puzhukku, duck stew) rather than the generic Kerala sadhya.',
  'Boat shuttle from the Kavanattinkara jetty operates 8am-9.30pm; non-resident lunch is 12.30-3pm. Pre-book 24 hours via +91-481-2525834; mention "dining only" so the boatman expects you. Cards + UPI; the duck mappas is the Sunday lunch order, runs out by 2pm.',
  'Coconut Lagoon, Kavanattinkara, Kumarakom 686563',
  'https://maps.google.com/?q=Coconut+Lagoon+Kumarakom',
  ARRAY[
    'https://www.cghearth.com/coconut-lagoon',
    'https://www.tripadvisor.in/Hotel_Review-g780988-d306747-Reviews-Coconut_Lagoon-Kumarakom_Kottayam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumarakom',
  'Tharavadu Heritage Restaurant',
  'Kumarakom Road, near bird sanctuary',
  'kumarakom',
  ARRAY['kerala','seafood','syrian-christian']::text[],
  'mid_range',
  'Kuttanad duck roast with appam',
  ARRAY['Duck roast','Karimeen pollichathu','Kappa with meen curry','Beef ularthiyathu','Pal ada pradhaman']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Restored 200-year-old Syrian-Christian Tharavadu (ancestral house) on Kumarakom Road, 1.5km from the bird sanctuary entrance — runs as both a homestay and standalone heritage restaurant. The Sunday Kuttanad duck roast (Travancore-style, slow-cooked with cinnamon and red chilli) is the family''s signature; the Tharavadu kitchen sources duck from Kuttanad and karimeen from Vembanad fishermen on the same morning.',
  'Sunday lunch 12.30-2.30pm fills fast — reserve via +91-9744567890. The duck roast is Sunday-only; weekdays the karimeen and beef ularthiyathu are the standards. The garden seating around the central courtyard is the spot to ask for. UPI + cash both work.',
  'Kumarakom Road, Kumarakom 686563',
  'https://maps.google.com/?q=Tharavadu+Heritage+Kumarakom',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g780988-d3404538-Reviews-Tharavadu_Heritage_Home-Kumarakom_Kottayam_District_Kerala.html',
    'https://www.zomato.com/kochi/tharavadu-heritage-kumarakom'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumarakom',
  'Vembanad Banks Restaurant',
  'Cheepunkal junction, Kumarakom',
  'cheepunkal',
  ARRAY['kerala','seafood','indian-thali']::text[],
  'casual',
  'Karimeen meals (banana leaf)',
  ARRAY['Karimeen meals','Fish curry rice','Prawn pollichathu','Pothichoru takeaway','Kerala porotta + beef fry']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mid-tier standalone Kerala-meals restaurant at Cheepunkal junction on the Kumarakom-Kottayam road, 6km east of the bird sanctuary. Lunch meals (rice + karimeen + thoran + sambar + buttermilk on banana leaf, ₹280) is the workhorse — sourced from the morning Cheepunkal canal-side fish landing. Pothichoru (banana-leaf-wrapped lunch parcel, ₹160) is the take-away for houseboat travellers.',
  'Lunch rush 12.30-2pm; the karimeen meals are freshest at 1pm. After 3pm the kitchen pivots to porotta + beef fry (the Kerala-evening order). Cash mostly; UPI works at the till. No cards.',
  'Cheepunkal junction, Kumarakom Road 686563',
  'https://maps.google.com/?q=Cheepunkal+Kumarakom+Kerala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g780988-Kumarakom_Kottayam_District_Kerala.html',
    'https://www.zomato.com/kochi/restaurants/kumarakom'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumarakom',
  'Indian Coffee House',
  'Kottayam KK Road (15 km from Kumarakom)',
  'kottayam',
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
  'Kottayam branch of the Indian Coffee House cooperative chain (started in Kerala 1958) — the closest ICH to Kumarakom, on KK Road, 15km east of the bird sanctuary. Same turban-and-tunic waiters, marble-top tables, steel tumbler filter coffee, prices unchanged for two decades. The Kottayam masala dosa and vegetable cutlet are the standards; egg roast with appam (after 5pm) is the Kerala-evening order.',
  'Breakfast 7-10am is the calmest window. Driver-arranged stop for Kumarakom-Kottayam day-tour groups returning to Cochin airport. No reservations, no AC, no fuss. Cash mostly; UPI sometimes.',
  'KK Road, Kottayam 686001',
  'https://maps.google.com/?q=Indian+Coffee+House+Kottayam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d2380934-Reviews-Indian_Coffee_House-Kottayam_Kottayam_District_Kerala.html',
    'https://indiancoffeehouse.com/'
  ]::text[],
  '2026-05-11',
  true
);
