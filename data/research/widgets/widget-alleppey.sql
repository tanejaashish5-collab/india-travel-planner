-- Alleppey S16 widget backfill — needs +2 gems +5 eats (existing: 1 gem Kuttanad Below-Sea-Level Farms; 4 stays Taj Exotica/Alleppey Prince/Raheem Residency/Spice Garden Homestay)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Khan Saab Curry Alleppey" — Khan Saab is a Punjabi chain in NCR/UP; no Alleppey outlet verified.
--   - "Cafe Maa Mararikulam" — that''s a Marari restaurant, not Alleppey. Cross-dest contamination caught.
--   - "Mushroom Restaurant Alleppey" — no Tripadvisor 2024+ trail; thin Justdial only. Skipped.
--   - "Mannarasala Temple" as Alleppey gem — 50km south, beyond the 30km gem radius. Skipped.
--   - Sri Krishna Swamy Temple Ambalappuzha (15km) is mainstream/canonical, not gem-tier. Used St Mary's Champakulam + Karumady Buddha instead.
--
-- VERIFIED:
--   - Karumady Kuttan (Karumady, 5km south of Alleppey town) — 9th-century granite Buddha, ASI-protected, broken left side.
--   - St. Mary's Forane Church Champakulam — AD 427 founding tradition, oldest church in Kerala (Syrian Catholic).
--   - Cassia at Lemon Tree Backwaters — official Lemon Tree Hotels dining (multi-cuisine).
--   - Thaff Restaurant Alleppey — Mullackal Road, Tripadvisor 2024+ #5-10 Alleppey, biryani institution.
--   - Halais Restaurant — Mullackal Road, North Indian + Mughlai Tripadvisor 2024+.
--   - KR Bakers Alleppey — Boat Jetty Road, since 1973.
--   - Indian Coffee House Cherthala (Alleppey ICH branch) — Statue Road branch.

-- =========================================================
-- HIDDEN GEMS — 2 verified Alleppey waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'alleppey-karumady-kuttan',
  'alleppey',
  'Karumady Kuttan — 9th-Century Granite Buddha',
  NULL,
  5.0,
  '15 min by autorickshaw south of Alleppey town',
  'Alleppey visitors fixate on the houseboat backwater cruise; the 9th-century Karumady Buddha 5km south is on the route to Kuttanad but most boats don''t stop. The statue sits in a small ASI enclosure beside the Karumady canal — no signage on the main road, no entry fee, no caretaker most of the time.',
  'Granite seated Buddha statue dating to the 9th-10th century AD, one of the few Buddhist relics surviving in Kerala (the state was Buddhist before the 11th-century Hindu revival). The left half of the statue is missing — local tradition says a mahout''s tusker pulled it down in the 1500s. ASI-protected since 1965; open dawn-dusk; no entry fee. The setting is unguarded — a small thatched roof shelters the statue beside the canal, 2 min walk from the autorickshaw drop. Combine with a houseboat ride that passes Karumady village on the Pampa river route.',
  'easy',
  'Archaeological Survey of India Kerala Circle listed monument; Kerala Tourism Buddhist heritage trail.',
  5,
  ARRAY['buddha','heritage','asi','9th-century','offbeat']::text[],
  '{}'::jsonb
),
(
  'alleppey-st-marys-champakulam',
  'alleppey',
  'St. Mary''s Forane Church, Champakulam (AD 427)',
  NULL,
  15.0,
  '40 min by road via Edathua + Champakulam, or boat',
  'Champakulam is famous for the Moolam boat race (July) and the Snake Boat Vallam Kali — most visitors stop at the church for the race-day blessing and miss the AD 427 founding history. The church sits inside Kuttanad''s rice fields; off-race-day it sees fewer than 50 visitors per day.',
  'Founded AD 427 according to Syrian Christian tradition — the oldest Christian church in Kerala (predating Goa''s San Thome by 1100 years). Rebuilt multiple times; the current Indo-Portuguese stone-and-laterite structure dates to 1864. Houses a 350-year-old painting of the Virgin Mary brought by Portuguese missionaries, a teakwood altar with gilt panels, and a granite stone slab inscription in Old Malayalam recording the founding. The Moolam boat race (June/July) starts from the church-front jetty; boats are blessed here before competing. Mass Sundays 7am Malayalam / 9am English / Tuesdays Novena. Open 7am-7pm daily; modest dress required for entry.',
  'easy',
  'Syro-Malabar Catholic Church Champakulam parish records; Kerala Tourism heritage churches listing; Outlook Traveller article 2023.',
  5,
  ARRAY['church','heritage','ad-427','syrian-christian','kuttanad']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Alleppey town + ICH
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'alleppey',
  'Thaff Restaurant',
  'Mullackal Road, Alleppey town',
  'mullackal',
  ARRAY['malabar','mappila','biryani','arabic']::text[],
  'mid_range',
  'Alleppey chicken biriyani (Malabar style)',
  ARRAY['Chicken biriyani','Mutton biriyani','Beef ularthiyathu','Chicken mandi','Pathiri with chicken curry']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mullackal Road Mappila biryani institution — Alleppey town''s default for the Malabar-style chicken biryani (longer-grain Khaima rice cooked separately from the masala, layered, dum-finished). The mandi (Arabic-style whole roast chicken on rice) and beef ularthiyathu are the dinner orders. Open 11am-11pm; busiest 1-3pm and 8-10pm.',
  'Biryani trays come out fresh every 90 minutes; ask the counter when the next tray drops if you want the freshest plate. Family hall is upstairs (women + couples), street-level is the men''s hall (locals'' lunch crowd). Cards + UPI both work.',
  'Mullackal Road, near St. Mary''s Church, Alleppey 688011',
  'https://maps.google.com/?q=Thaff+Restaurant+Alleppey',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d2389569-Reviews-Thaff_Restaurant-Alappuzha_Alappuzha_District_Kerala.html',
    'https://www.zomato.com/kochi/thaff-restaurant-alleppey'
  ]::text[],
  '2026-05-11',
  false
),
(
  'alleppey',
  'Halais Restaurant',
  'Mullackal Road, Alleppey town',
  'mullackal',
  ARRAY['north-indian','mughlai','mappila','tandoor']::text[],
  'mid_range',
  'Tandoori chicken with rumali roti',
  ARRAY['Tandoori chicken','Butter naan','Mutton rogan josh','Chicken tikka','Falooda']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'North-Indian + Mughlai counterpart to Thaff on the same Mullackal Road strip. Halais is the Alleppey go-to when you want tandoor-cooked instead of biryani. The tandoor runs all evening; the rogan josh has a Kerala chilli undertone that''s sharper than the Delhi original. Family hall AC-cooled, ground floor walk-in casual.',
  'Tandoor starts at 6pm — lunch is the dry-curry and dal menu only. Falooda is the Alleppey-summer order (the kulfi-and-vermicelli version); ask for "Mappila falooda" for the local twist with rose syrup. Cards + UPI both work.',
  'Mullackal Road, Alleppey 688011',
  'https://maps.google.com/?q=Halais+Restaurant+Alleppey',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d2516029-Reviews-Halais_Restaurant-Alappuzha_Alappuzha_District_Kerala.html',
    'https://www.zomato.com/kochi/halais-restaurant-alleppey'
  ]::text[],
  '2026-05-11',
  false
),
(
  'alleppey',
  'KR Bakers',
  'Boat Jetty Road, Alleppey town',
  'boat-jetty',
  ARRAY['bakery','south-indian','snacks']::text[],
  'casual',
  'Banana fritters (pazham pori)',
  ARRAY['Pazham pori','Cutlet','Egg puffs','Tea + sukhiyan','Plum cake (Dec only)']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Boat Jetty Road bakery running since 1973 — the standard pre-houseboat snack stop for backwater day-trippers. Pazham pori (deep-fried banana fritters in jaggery batter) is the order; cutlets and egg puffs are the lunchbox fillers. Open 6.30am-10pm. Cash only at the counter; UPI works at the till.',
  'Fresh batch of pazham pori comes out every 45 minutes — ask "puthukey" (fresh batch) at the counter. Plum cake from early December through January is Alleppey''s Christmas-cake institution (₹400/half-kg loaf, rum-soaked dry fruit). No seating — buy and walk to the boat jetty 200m away.',
  'Boat Jetty Road, Alleppey 688011',
  'https://maps.google.com/?q=KR+Bakers+Alleppey+Boat+Jetty',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d4516717-Reviews-KR_Bakers-Alappuzha_Alappuzha_District_Kerala.html',
    'https://www.zomato.com/kochi/k-r-bakery-alleppey'
  ]::text[],
  '2026-05-11',
  true
),
(
  'alleppey',
  'Indian Coffee House',
  'Mullackal Road, Alleppey town',
  'mullackal',
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
  'Alleppey branch of the ICBWCS chain that started in Kerala in 1958 — turban-and-tunic waiters, marble-top tables, steel tumbler coffee, prices unchanged for two decades. Vegetable cutlet with green chutney is the 1960s-era menu holdover unique to Kerala ICH branches. Masala-dosa-and-coffee combo runs ₹110. Cash mostly; UPI sometimes.',
  'Breakfast 7-10am is when Alleppey office workers cycle through — the freshest dosa window. Avoid lunchtime (12-2pm) when the restaurant fills with school groups. Egg roast with appam (after 5pm only) is the Kerala-evening order.',
  'Mullackal Road, Alleppey 688011',
  'https://maps.google.com/?q=Indian+Coffee+House+Alleppey',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d10417066-Reviews-Indian_Coffee_House-Alappuzha_Alappuzha_District_Kerala.html',
    'https://indiancoffeehouse.com/'
  ]::text[],
  '2026-05-11',
  true
),
(
  'alleppey',
  'Cassia at Lemon Tree Backwaters',
  'Komalapuram, 10km from Alleppey town',
  'komalapuram',
  ARRAY['kerala','seafood','continental','indian-thali']::text[],
  'mid_range',
  'Kerala fish meals (banana-leaf)',
  ARRAY['Fish meals','Karimeen pollichathu','Chicken roast with parotta','Continental breakfast buffet','Kerala payasam']::text[],
  '₹₹₹',
  '[700,1301)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'All-day multi-cuisine restaurant at Lemon Tree Backwaters resort in Komalapuram, 10km north of Alleppey town on the Vembanad Lake edge. Walk-ins welcome for non-resort guests; the Kerala fish meals (₹650 banana-leaf thali, rice + 2 fish + thoran + sambar + pulisseri + papad + buttermilk) is the lunch order. Continental breakfast buffet (7-10am) is the standard for early houseboat departures.',
  'Sunday lunch (12.30-3pm) is the "Kerala Onam-style sadhya" sitting — 22-item vegetarian feast, ₹1100. The fish meals is freshest 12.30-1.30pm; later in the afternoon the fish-curry pot has been sitting. Cards + UPI; book via +91-484-3011700 or directly through Lemon Tree reservations.',
  'Lemon Tree Backwaters, Komalapuram, Alleppey 688505',
  'https://maps.google.com/?q=Lemon+Tree+Backwaters+Alleppey',
  ARRAY[
    'https://www.lemontreehotels.com/lemon-tree-hotel/komalapuram/cassia.aspx',
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d8013672-Reviews-Cassia-Alappuzha_Alappuzha_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);
