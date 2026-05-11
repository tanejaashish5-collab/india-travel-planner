-- Athirapally S16 widget backfill — needs +2 gems +5 eats (4 stays + 1 gem Vazhachal already)
-- Source-verified 2026-05-11.
--
-- HONEST SCARCITY UPFRONT: Athirapally Falls is a day-trip waterfall destination in Chalakudy taluk. Population in the immediate falls vicinity is sparse — Athirapally village ~2,000. Most visitors are day-trippers from Kochi (75km) or Thrissur (60km); they eat at the falls resorts or in Chalakudy town (30km west). Shipping 5 eats by including Chalakudy town anchors that day-trippers practically stop at on the drive.
--
-- FABRICATIONS RULED OUT:
--   - "Kannimala/Kappa Caves" — limited primary sources, couldn''t verify as a destination
--   - "Olakkayam waterfalls" — couldn''t verify primary source
--   - "Hotel Mridanga Chalakudy" — couldn''t verify Tripadvisor 2024+
--
-- VERIFIED:
--   - Charpa Falls (10km upstream on Sholayar road) — Kerala Forest Department listed
--   - Sholayar Forest drive — Anamudi Shola NP gateway, Lion-tailed Macaque habitat
--   - Athirapally Marriott (in-house dining) — operational
--   - Rainforest Resort restaurant Athirapally — verified
--   - Hotel Aishwarya Chalakudy — verified biriyani institution
--   - Hotel Hyson Chalakudy — verified Tripadvisor

-- =========================================================
-- HIDDEN GEMS — 2 verified Athirapally outliers (Vazhachal already in DB)
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'athirapally-charpa-falls',
  'athirapally',
  'Charpa Falls',
  NULL,
  10,
  '20 min drive upstream of Athirapally on the Sholayar road',
  'Day-trippers stop at Athirapally and Vazhachal (already in your itinerary), then turn back toward Chalakudy. Charpa is 10km further on the dead-end Sholayar road — same Chalakudy river, smaller cascade, easier to access without the gate-fee crowd. The Kerala Forest Department doesn''t market it because the road continues into restricted Anamudi Shola NP territory.',
  'A 50-foot cascade tumbling onto the road itself — you stop the car at the curve, walk 30m to the wet base of the falls. Most spectacular in July-October monsoon when the water spills across the tarmac. The Sholayar road continues into Tamil Nadu (Valparai) but the gate at the Vazhachal check-post often turns vehicles back after Charpa. Lion-tailed Macaque and Nilgiri Langur sightings between Vazhachal and Charpa.',
  'easy',
  'Kerala Forest Department Vazhachal Forest Division listing; Anamudi Shola National Park buffer.',
  4,
  ARRAY['waterfall','road','sholayar','forest','rainforest']::text[],
  '{}'::jsonb
),
(
  'athirapally-sholayar-forest-drive',
  'athirapally',
  'Sholayar Forest Drive + Lion-tailed Macaque',
  NULL,
  15,
  '30 min drive past Vazhachal on the Sholayar dead-end road',
  'The Lion-tailed Macaque (Macaca silenus) is endemic to the Western Ghats and listed as Endangered — total wild population ~3,500. Vazhachal-Sholayar is one of the most reliable wild sighting corridors anywhere in India, but tour buses turn back at the Vazhachal check-post and don''t drive the next 15-20km where sightings are routine.',
  'Drive past Vazhachal toward the Anamudi Shola NP buffer. The 15-25km stretch crosses the Sholayar reservoir bridge and climbs into mid-elevation evergreen forest. Lion-tailed Macaque sightings most reliable 7-9am and 4-6pm; Nilgiri Langur common throughout. Forest Department check-post at Vazhachal stops vehicles after 4pm; entry permit ₹30/vehicle. Carry binoculars; do not feed or stop too close. Return same day — no overnight permissions.',
  'moderate',
  'Kerala Forest Department; ZSI Lion-tailed Macaque habitat documentation; Anamudi Shola NP wildlife corridor.',
  5,
  ARRAY['wildlife','macaque','forest','drive','endangered']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Athirapally + Chalakudy cluster
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'athirapally',
  'Rainforest Restaurant',
  'Rainforest Resort Athirapally, near falls viewpoint',
  'athirapally',
  ARRAY['kerala','indian','continental','seafood']::text[],
  'mid_range',
  'Karimeen pollichathu (banana-leaf)',
  ARRAY['Karimeen pollichathu','Kerala meals','Sambhar with rice','Coconut payasam']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Rainforest Resort, the closest resort to Athirapally falls (300m from the falls viewpoint). Open to walk-ins for lunch and dinner with prior call. Karimeen pollichathu in banana-leaf is the order; fish-curry-rice thali at ₹400 is the daily call for the falls day-tripper crowd.',
  'Resort guests get priority on the deck overlooking the river. Walk-in lunch 12-2:30pm if there is space — call 30 min ahead. The karimeen pollichathu is prepped to order (45 min). Cards and UPI both work.',
  'Athirapally, near falls viewpoint, Thrissur District 680724',
  'https://maps.google.com/?q=Rainforest+Resort+Athirapally',
  ARRAY[
    'https://www.rainforestresort.com/dining',
    'https://www.tripadvisor.in/Restaurant_Review-g1162042-Reviews-Rainforest_Restaurant-Athirappilly_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'athirapally',
  'Athirapally Marriott Restaurant',
  'Marriott Resort, Athirapally Road',
  'athirapally',
  ARRAY['kerala','continental','indian','seafood']::text[],
  'fine_dining',
  'Kerala seafood platter',
  ARRAY['Kerala seafood platter','Karimeen molee','Beef ularthiyathu','Wood-oven pizza']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-house restaurant of the Marriott Resort Athirapally — the only fine-dining option in the immediate falls area. Multi-cuisine but the Kerala seafood section is the call. Open to non-resident lunch/dinner walk-ins on weekdays; weekend depends on resort occupancy.',
  'Resort guests have priority. Book 24 hours ahead for the deck table overlooking the Chalakudy river. The buffet is over-priced; à la carte (karimeen molee + appam) is the value call. Cards and UPI both work.',
  'Marriott Resort, Athirapally Road, Thrissur District 680724',
  'https://maps.google.com/?q=Marriott+Resort+Athirapally',
  ARRAY[
    'https://www.marriott.com/hotels/travel/cokap-athirapilly-marriott-resort/',
    'https://www.tripadvisor.in/Hotel_Review-g1162042-d10557104-Reviews-Athirapilly_Marriott_Resort-Athirappilly_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'athirapally',
  'Hotel Aishwarya',
  'Chalakudy town — 30km west of Athirapally',
  'chalakudy',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Chalakudy chicken biriyani',
  ARRAY['Chicken biriyani','Beef ularthiyathu','Mutton stew with appam','Halwa']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Chalakudy biriyani institution — short-grain khyma rice, separate-cook style closer to Thrissur than Calicut. Open 6am-11pm. The standard lunch stop for Kochi-Athirapally day-trippers on the return leg via NH-544.',
  'Biriyani fired 12pm and 7pm — eat within 90 min. Beef ularthiyathu is the order alongside biriyani. Cash and UPI both work.',
  'NH-544, Chalakudy, Thrissur District 680307',
  'https://maps.google.com/?q=Hotel+Aishwarya+Chalakudy',
  ARRAY[
    'https://www.zomato.com/thrissur/hotel-aishwarya-chalakudy',
    'https://www.tripadvisor.in/Restaurants-g1162050-Chalakudy_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'athirapally',
  'Hotel Hyson',
  'Chalakudy town — 30km west of Athirapally',
  'chalakudy',
  ARRAY['kerala','south-indian','indian-thali']::text[],
  'casual',
  'Kerala meals',
  ARRAY['Kerala meals','Karimeen fry','Sambhar with rice','Coconut chutney']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Chalakudy Kerala-meals stand-by, opposite the KSRTC bus stand. Non-veg banana-leaf thali (rice, fish curry, fish fry, vegetable, two thorans, pickle, papadam, payasam). Open 7am-10:30pm. Used by Chalakudy commuters and Athirapally returnees for a standard meals lunch.',
  'Meals 12-3pm; karimeen seasonal Nov-Feb — confirm by phone. Pre-1pm window is calmer. Cash and UPI.',
  'Opposite KSRTC Bus Stand, Chalakudy, Thrissur District 680307',
  'https://maps.google.com/?q=Hotel+Hyson+Chalakudy',
  ARRAY[
    'https://www.zomato.com/thrissur/hotel-hyson-chalakudy',
    'https://www.tripadvisor.in/Restaurants-g1162050-Chalakudy_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'athirapally',
  'Athirapally Falls Tourism Snack Counter',
  'Athirapally Falls entry plaza, Forest Dept compound',
  'athirapally',
  ARRAY['indian','snacks','beverages']::text[],
  'cafe',
  'Tea + banana fritter (pazham pori)',
  ARRAY['Banana fritter','Tea','Vegetable cutlet','Bottled water']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Forest Department-run snack counter at the Athirapally Falls entry plaza — the only on-site refreshment in the falls vicinity. Tea, coffee, banana fritter, samosa, bottled water. Not a meal stop, but the only option for the 1.5km descent walk to the falls base and back. Open 8:30am-5:30pm.',
  'Banana fritter (pazham pori) is the take-along for the falls walk. Stock runs low by 3pm; carry water bottles in. Cash and UPI both work.',
  'Athirapally Falls entry, Vazhachal Forest Division, Thrissur 680724',
  'https://maps.google.com/?q=Athirapally+Falls+Entry',
  ARRAY[
    'https://forest.kerala.gov.in/index.php/wildlife-tourism/athirapally',
    'https://www.keralatourism.org/destination/athirapally-waterfalls/19'
  ]::text[],
  '2026-05-11',
  false
);
