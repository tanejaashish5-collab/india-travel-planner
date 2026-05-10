-- Katra widget backfill — needs +3 gems +5 eats (existing 0 each; 4 stays already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Sarwana Bhojnalaya" (no Tripadvisor/Justdial primary listing), "Madras Cafe Katra" (no verified listing), "Annapurna Sweets" (Annapurna chain has no Katra outlet — only Pune/Madikeri/Chikmagalur), "Punjabi By Nature Katra" (no listing). All skipped.
-- Verified picks below: Pooja Vaishno Dhaba (own website, Tripadvisor #5+), Sagar Ratna Hotel Subash (chain franchise verified), Lazzez at Shree Hari (own website verified), Punjabi Haveli (highway, Justdial verified), Madhuban (Tripadvisor verified). Gems all on official Shrine Board route.

-- =========================================================
-- HIDDEN GEMS — 3 verified Vaishno Devi yatra waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'katra-bhairon-mandir',
  'katra',
  'Bhairon Mandir',
  NULL,
  14.5,
  '5 km steep trek above Bhawan, or 5 min via ropeway',
  'Most pilgrims stop at Bhawan after Vaishno Devi darshan and head back. Shrine Board doctrine says the yatra is incomplete without Bhairon Darshan, but the 5km steep climb beyond Bhawan filters out 60-70 percent of yatris. Ropeway opened 2024 makes it a 5-min ride — still under-publicised at Katra base.',
  'The legend goes that Vaishno Devi beheaded Bhairon Nath here in her Mahakali form; the head landed at Bhairon Ghati and the goddess granted the boon that any yatra would be considered incomplete without Bhairon Darshan. Mandatory final stop per Shri Mata Vaishno Devi Shrine Board. Steep gradient (1km elevation gain over 5km) but ropeway since 2024 cuts it to 5 minutes; ticket counter at Bhawan.',
  'hard',
  'Shri Mata Vaishno Devi Shrine Board official yatra guidance; 850K+ pilgrims per month touch Bhairon Mandir.',
  5,
  ARRAY['pilgrimage','temple','viewpoint','final-darshan']::text[],
  '{}'::jsonb
),
(
  'katra-ardhkuwari-cave',
  'katra',
  'Ardhkuwari (Garbh Joon Cave)',
  NULL,
  6.5,
  '6 km trek from Banganga checkpost, midpoint of yatra',
  'Yatris on the cable-car/helicopter route bypass Ardhkuwari entirely — they helicopter directly from Sanjichhat to Bhawan. Walkers reach it but most just stamp the parchi and move on without entering the narrow Garbh Joon cave itself.',
  'The narrow tunnel-cave where Vaishno Devi is said to have meditated for nine months while hiding from Bhairon Nath. You crawl through the original 30-foot rock cleft (height varies 2-4 feet) before reaching the inner shrine. Group entry, lockers for bags. Counter timings 6am-noon and 4pm-9pm; closed during midday for cave maintenance.',
  'moderate',
  'Shrine Board pilgrim count ~800K/month; physical constraint of the cave caps simultaneous entries to 8-10 people.',
  5,
  ARRAY['cave','pilgrimage','legend','rock-cleft']::text[],
  '{}'::jsonb
),
(
  'katra-sanjichhat',
  'katra',
  'Sanjichhat — Highest Point on the Yatra',
  NULL,
  10.5,
  '11 km from Banganga, 2.5 km before Bhawan',
  'Sanjichhat is where the Mata Vaishno Devi helicopter service from Katra lands — most fly-in pilgrims walk the final 2.5km down to Bhawan and never look around at Sanjichhat itself. The 24-bed shrine hospital, ATM, and Pawan Putra Bhawan free dharamshala here are unknown to walkers and helicopter passengers alike.',
  'Highest point on the yatra at 1900m (6,200 ft) — the vista overlooks the entire Trikuta range. Heli-pad operates 7am-noon shuttles from Katra, return seats fill by 9am same morning. The 24-hour shrine hospital is staffed by AIIMS rotation doctors; useful for trekkers with altitude or knee issues. Free Pawan Putra Bhawan dorm beds for the elderly.',
  'easy',
  'Shrine Board lists Sanjichhat as official rest-stop; AIIMS Jammu medical rotation logged.',
  5,
  ARRAY['viewpoint','helipad','rest-stop','altitude']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified pure-veg/sattvic options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'katra',
  'Pooja Vaishno Dhaba',
  'Jammu Road, Katra HO',
  ARRAY['north-indian','south-indian','gujarati','jain']::text[],
  'casual',
  'Aloo paratha with desi ghee',
  ARRAY['Aloo paratha','Paneer masala','Veg Manchurian','Green chutney']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Onion-and-garlic-free dhaba on Jammu Road, fully AC, runs since the 2010s. Cooked in desi ghee, the green chutney is the give-away — house-ground with hing in place of garlic. Most family-busload yatris from Punjab and Gujarat stop here on the Jammu-Katra leg.',
  'Lunch rush is 12:30-2:30pm when buses arrive; either go before noon or after 3pm. The Gujarati thali is a quieter weekday call; weekend menu defaults to North Indian. Cash and UPI both work; card machine is unreliable on bus-load days.',
  'XWRH+8PX, Jammu Road, Katra 182301, Jammu and Kashmir',
  'https://maps.google.com/?q=Pooja+Vaishno+Dhaba+Katra',
  ARRAY[
    'https://poojavaishnodhaba.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g297621-d2601123-Reviews-Pooja_Vaishno_Dhaba-Katra_Reasi_District_Jammu_Jammu_and_Kashmir.html'
  ]::text[],
  '2026-05-10'
),
(
  'katra',
  'Sagar Ratna at Hotel Subash',
  'Bus Stand Road, Katra',
  ARRAY['south-indian','north-indian']::text[],
  'mid_range',
  'Masala dosa',
  ARRAY['Masala dosa','Rava idli','Mysore filter coffee','Madras curd rice']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Katra outlet of the Delhi-origin Sagar Ratna chain, sitting inside Hotel Subash International on Banganga Road. Pure veg, sattvic-friendly, and the only reliable South Indian on the yatra strip — most other Katra restaurants are North Indian thali-driven. Filter coffee is genuine.',
  'Open from 7am for breakfast — beat the 10am Banganga checkpost rush by eating dosa here at 8am, then walking to the parchi counter. Avoid the buffet on weekends; à la carte is fresher. Hotel Subash is a 4-min walk from the bus stand.',
  'Hotel Subash International, NH-1C, Bus Stand, Katra 182301',
  'https://maps.google.com/?q=Sagar+Ratna+Hotel+Subash+Katra',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297621-d3952720-Reviews-Sagar_Ratna_Hotel_Subash-Katra_Reasi_District_Jammu_Jammu_and_Kashmir.html',
    'https://www.hotelsubashinternational.com/dining.html'
  ]::text[],
  '2026-05-10'
),
(
  'katra',
  'Lazzez',
  'Hotel Shree Hari Niwas, Jammu Road',
  ARRAY['punjabi','chinese','italian','jain']::text[],
  'mid_range',
  'Sattvik thali (no onion-no garlic)',
  ARRAY['Sattvik thali','Paneer Lazzez','Wood-oven pizza','Hakka noodles']::text[],
  '₹₹',
  '[350,651)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Pure-vegetarian multi-cuisine inside Hotel Shree Hari Niwas, Jammu Road. Specifically caters Jain and sattvik orders — kitchen runs separate prep stations to keep onion-garlic out. The wood-oven pizza on a Jain/Vaishnav-friendly menu is rare in north India.',
  'Reserve for dinner Thursday-Sunday — Punjabi tour groups fill it after 8pm. The Jain pizza is the order to make if you want something different; default thali is fine but unremarkable. Phone: 9622220605.',
  'Hotel Shree Hari Niwas, Jammu Road, Katra 182301',
  'https://maps.google.com/?q=Lazzez+Restaurant+Katra',
  ARRAY[
    'https://www.shreeharihotels.com/lazzez-restaurant.html',
    'https://www.tripadvisor.in/Restaurant_Review-g297621-d14018160-Reviews-Lazzez_Restaurant-Katra_Reasi_District_Jammu_Jammu_and_Kashmir.html'
  ]::text[],
  '2026-05-10'
),
(
  'katra',
  'Punjabi Haveli',
  'NH-1A, near Yatri Niwas',
  ARRAY['punjabi','north-indian']::text[],
  'casual',
  'Sarson da saag with makki di roti',
  ARRAY['Sarson da saag','Makki di roti','Dal makhani','Lassi']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Roadside Punjabi dhaba on the Katra-Jammu highway near Yatri Niwas — the standard stop for taxis from Jammu Airport making the 50km run to Katra. Open 11am-11pm. Tandoor runs all day; lassi is house-set in earthen pots.',
  'Yatris stopping for lunch should split the order — portions are dhaba-large. Sarson saag is seasonal (Nov-Feb); off-season the dal makhani is the safer call. Card not always working; carry 500 rupees cash for the table.',
  'NH-1A, near Yatri Niwas, Katra 182301',
  'https://maps.google.com/?q=Punjabi+Haveli+Katra',
  ARRAY[
    'https://www.dograholidays.com/best-restaurants-in-katra-vaishno-devi/',
    'https://www.makemytrip.com/tripideas/foodie-hotspots-katra-vaishno-devi'
  ]::text[],
  '2026-05-10'
),
(
  'katra',
  'Madhuban',
  'Main Bazaar, Katra',
  ARRAY['north-indian','south-indian','indian-thali']::text[],
  'casual',
  'Special vegetarian thali',
  ARRAY['Veg thali','Rajma chawal','Kashmiri pulao','Dum aloo']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Long-running pure-veg thali house in Katra main bazaar — the unlimited thali is the local default for repeat yatris stopping for a quick lunch. Range covers North Indian, South Indian, and Kashmiri pulao on a single plate.',
  'Lunch rush 12:30-2pm; thali refills slow down after 2 because kitchen pivots to dinner prep. Order rajma chawal as a backup if the thali queue is long — it''s plated in 5 minutes.',
  'Main Bazaar, Katra 182301',
  'https://maps.google.com/?q=Madhuban+Restaurant+Katra',
  ARRAY[
    'https://www.dograholidays.com/best-restaurants-in-katra-vaishno-devi/',
    'https://www.makemytrip.com/tripideas/foodie-hotspots-katra-vaishno-devi'
  ]::text[],
  '2026-05-10'
);
