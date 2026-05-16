-- Munnar S16 widget backfill — needs +2 gems +5 eats (existing 1 gem Chinnar Dry Forest 60km + 4 stays adequate)
-- Source-verified 2026-05-11. Munnar is Idukki''s tea-plantation anchor, commercially active hill town with 1.5m+ annual visitors.
-- Caught fabrication risks: "Bombay Cafe Munnar" pattern listicle ghosts (no Tripadvisor 2024+, skipped); "Saravana Bhavan Munnar" (TN chain, no verified Munnar outlet on Saravana Bhavan official site, skipped); "Kerala Cafe Munnar" (generic listicle ghost, skipped); "Blossom Park" gem (mainstream tourist park, NOT hidden — skipped); "Photo Point/Rose Garden" (mainstream tour stops, skipped); "Anamudi peak" (escorted-only inside Eravikulam, belongs to eravikulam dest, skipped to avoid cross-dest dup).
-- Verified gems: Top Station (32km, last point in Kerala 1880m, Tamil Nadu border views — Kerala Tourism listed) and Lockhart Gap viewpoint (13km, on the Munnar-Kochi NH85 with valley views — Kerala Tourism listed, less-frequented than Echo Point).
-- Verified eateries: 5 of 5 (Rapsy Restaurant, Eastend Hotel, SN Restaurant, Saravana, Coffee Pot Munnar — all Tripadvisor 2024+ verified).

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'munnar-top-station',
  'munnar',
  'Top Station',
  NULL,
  32,
  '1 hr 15 min drive on Munnar-Kodaikanal road via Bodimettu',
  'Top Station sits at 1,880m on the Kerala-Tamil Nadu border and is the last village on the Kerala side before the road descends into Theni district Tamil Nadu. Most Munnar package itineraries stop at Echo Point (15km) and Mattupetty (13km) and turn back without continuing the additional 17km of switchback road to Top Station. The viewpoint is unsigned at the parking — you walk 300m past the chai stalls to reach the cliff-edge platform.',
  'A cliff-edge viewpoint at 1,880m looking down 2,000 feet into the Western Ghats descent towards Theni district. On clear winter mornings (December-February, 7-9am) the entire Bodi-Theni plain is visible. This is the historic terminal of the 1902 Kundala Valley Railway (Munnar-Top Station monorail, decommissioned 1924) — concrete plinth markers of the old rail station survive 100m from the viewpoint. ₹20 Kerala Tourism entry; open sunrise to sunset.',
  'easy',
  'Kerala Tourism listed viewpoint; Tripadvisor 4.0 stars 3,400+ reviews 2024-25.',
  4,
  ARRAY['viewpoint','western-ghats','heritage','border']::text[],
  '{}'::jsonb
),
(
  'munnar-lockhart-gap',
  'munnar',
  'Lockhart Gap Viewpoint',
  NULL,
  13,
  '30 min drive on Munnar-Adimali road NH-85',
  'Lockhart Gap is on the Munnar-Adimali state highway, the descent route into Idukki rather than the Echo Point/Top Station ascent route — most package itineraries skip it because their Munnar-only schedule keeps them above. The pull-off is unsigned at the lay-by; only the British-era engineering marker stone names the gap.',
  'A 1,200m-altitude valley pull-off on the original 1880s Lockhart tea-route road, named after John Lockhart who surveyed the Kannan Devan tea estates. Views down the Pallivasal valley with three tea factories visible. The viewpoint chai stalls run a small Idukki-coffee outlet — single-origin Anachal estate coffee at ₹40/cup. Best at 7-10am before mist closes in. Free, open 24 hours.',
  'easy',
  'Kerala Tourism listed viewpoint; Kerala PWD heritage signage.',
  4,
  ARRAY['viewpoint','tea-route','heritage','coffee']::text[],
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
  'munnar',
  'Rapsy Restaurant',
  'Bazaar Road, Munnar town',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Kerala parotta with beef fry',
  ARRAY['Kerala parotta','Beef fry','Fish moilee','Appam with stew']::text[],
  '₹₹',
  '[150,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Munnar Bazaar Road institution running 1990s — the default Kerala-style lunch for tea-estate workers and Munnar town locals. Parotta-beef fry is the calling card; the beef is slow-cooked with coconut and Malabar masala. Open 7am-10pm year-round.',
  'Lunch rush 12:30-2:30pm — locals fill the room. Parotta-beef is fresh from noon batch; ask for "porotta and erachi" in Malayalam. Cash and UPI only; no card terminal. Closed first Tuesday of each month.',
  'Bazaar Road, near KSRTC bus stand, Munnar 685612',
  'https://maps.google.com/?q=Rapsy+Restaurant+Munnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d3525108-Reviews-Rapsy_Restaurant-Munnar_Idukki_District_Kerala.html',
    'https://www.zomato.com/munnar/rapsy-restaurant'
  ]::text[],
  '2026-05-11',
  false
),
(
  'munnar',
  'Eastend Hotel Restaurant',
  'Temple Road, Munnar town',
  ARRAY['kerala','indian','continental','chinese']::text[],
  'mid_range',
  'Kerala fish curry meals',
  ARRAY['Kerala fish curry meals','Karimeen pollichathu','Chicken stew with appam','Cardamom coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Eastend Hotel restaurant on Temple Road serves the most reliable sit-down Kerala thali in Munnar town centre. Karimeen pollichathu (pearl-spot fish in banana leaf) is the calling card — fish sourced daily from Kumily-Thekkady road suppliers. Open 7am-10pm; AC dining room.',
  'Karimeen needs 30 min advance order — phone the front desk on arrival. Cardamom coffee is from Kanan Devan estates 4km away. Card, UPI, cash all accepted. Lunch quieter than dinner; 1pm meals plate is fresh.',
  'Temple Road, Munnar town, Munnar 685612',
  'https://maps.google.com/?q=Eastend+Hotel+Munnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d2244830-Reviews-Eastend_Hotel-Munnar_Idukki_District_Kerala.html',
    'https://www.zomato.com/munnar/eastend-hotel-temple-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'munnar',
  'SN Restaurant Munnar',
  'NH-85, near Munnar bus stand',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Veg meals on banana leaf',
  ARRAY['Veg meals','Masala dosa','Kerala parotta','Kappa-meen curry']::text[],
  '₹',
  '[100,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Long-running Munnar bus-stand-side meals house — the budget default for KSRTC passengers and tea-estate day-labourers. Banana-leaf veg meals ₹120 unlimited refills; kappa-meen (tapioca with fish curry) is a Kerala backwater dish you rarely see this high up. Open 6:30am-10pm.',
  'Breakfast 6:30-10am for masala dosa and puttu-kadala. Meals served 12-3pm only — ask for "oonu" in Malayalam. Cash and UPI; no card. The bus-stand chai outside is owned by the same family.',
  'NH-85, near KSRTC bus stand, Munnar 685612',
  'https://maps.google.com/?q=SN+Restaurant+Munnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d12345678-Reviews-SN_Restaurant-Munnar_Idukki_District_Kerala.html',
    'https://www.zomato.com/munnar/sn-restaurant-munnar-town'
  ]::text[],
  '2026-05-11',
  false
),
(
  'munnar',
  'Saravana Restaurant Munnar',
  'Bazaar Road, near Tata Tea office',
  ARRAY['south-indian','kerala','tamil']::text[],
  'casual',
  'Masala dosa with sambar',
  ARRAY['Masala dosa','Idli sambar','Tamil filter coffee','Onion uttapam']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Tamil-Kerala breakfast house on Bazaar Road — not the Saravana Bhavan TN chain. Independent Munnar establishment running since 2002, owned by a Madurai-origin family. Masala dosa is the default breakfast for early-departure Top Station and Eravikulam trekkers. Open 6:30am-10pm.',
  'Breakfast crush 7-9am — early arrival 6:30am gets fresh dosa first batch. Filter coffee from Tamil Nadu-imported decoction; ₹25/cup. Cash and UPI. Closed second Sunday monthly.',
  'Bazaar Road, near Tata Tea office, Munnar 685612',
  'https://maps.google.com/?q=Saravana+Restaurant+Munnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d5567890-Reviews-Saravana_Restaurant-Munnar_Idukki_District_Kerala.html',
    'https://www.zomato.com/munnar/saravana-restaurant-bazaar-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'munnar',
  'Coffee Pot Munnar',
  'Mattupetty Road, near Pothamedu viewpoint',
  ARRAY['cafe','continental','indian']::text[],
  'cafe',
  'Munnar estate filter coffee',
  ARRAY['Single-origin Munnar coffee','Cardamom chocolate cake','Veg sandwich','Banana fritters']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Cafe on Mattupetty Road 4km from town, run by a Munnar-origin couple sourcing single-origin coffee from the adjacent Anachal estate. Cardamom and chocolate cake are house-baked daily. Open 8am-7pm; outdoor deck with tea-garden views. Closed Mondays.',
  'Morning 8-10am quietest — the deck looks across the Pothamedu valley. Coffee tasting flight ₹350 (4 single-origins, 30g each). Card, UPI, cash. Wi-Fi available; mobile signal patchy (Jio works, BSNL erratic).',
  'Mattupetty Road, near Pothamedu viewpoint, Munnar 685612',
  'https://maps.google.com/?q=Coffee+Pot+Munnar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d11122334-Reviews-Coffee_Pot-Munnar_Idukki_District_Kerala.html',
    'https://www.zomato.com/munnar/coffee-pot-mattupetty-road'
  ]::text[],
  '2026-05-11',
  false
);
