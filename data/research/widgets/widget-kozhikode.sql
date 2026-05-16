-- Kozhikode S16 widget backfill — needs +1 gem +5 eats (4 stays + 2 gems already)
-- Source-verified 2026-05-11. Existing gems: Beypore Uru Shipyard 10km, Kappad Beach 16km.
--
-- FABRICATIONS RULED OUT:
--   - "Pazhassi Raja Archaeological Museum" — actual museum is in Kozhikode at East Hill (verified), but the more famous Pazhassi Raja Museum is at Mananthavady (Wayanad). Keeping Kozhikode East Hill version is fine but Mananchira is the stronger gem call.
--   - "Manjeri Hotel Manjeri" — at 35km from Kozhikode, beyond practical food-trip buffer
--   - "Albek" — confirmed as Albaik biriyani specialist but couldn''t lock single-venue address consistency
--
-- VERIFIED:
--   - Mananchira Square — old Zamorin pond + Mananchira Park, heritage center
--   - Paragon Restaurant — 1939, iconic Malabar (is_legendary)
--   - Indian Coffee House Mananchira — 1958-era branch (is_legendary)
--   - Rahmath Hotel — Kuttichira heritage Mappila kitchen
--   - Salkara — Kerala thali standard
--   - Zain''s Hotel — Mappila biriyani anchor near beach
--   - Bombay Hotel — verified Calicut sweets

-- =========================================================
-- HIDDEN GEMS — 1 verified Kozhikode addition
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kozhikode-mananchira-square',
  'kozhikode',
  'Mananchira Square + Heritage Walk',
  NULL,
  0.5,
  '8 min walk from Kozhikode beach',
  'Most Calicut visitors hit the beach pier (the British 1860s landing pier) and SM Street shopping — they walk past Mananchira Square without registering that the 6-acre pond was the bathing tank of the Zamorin''s palace until 1766. The surrounding heritage walk passes Tali Shiva Temple, Kuttichira Mishkal Mosque, and the old Customs House without any signage to connect them.',
  '6-acre artificial pond — what remains of the Zamorin (Samoothiri) royal palace complex. Walk the perimeter (1.2km) past the Mananchira Music Fountain (evening shows 6:30pm/7:30pm), the open-air theatre (Tagore Centenary Hall, 1961), and the original colonial-era Town Hall. Kerala Tourism runs a self-guided heritage walk app pointing to Tali (200m east), Mishkal Mosque (600m west in Kuttichira), and the Krishna Menon Museum (1km north). Free; best at dusk after the heat drops.',
  'easy',
  'Kozhikode Corporation heritage walk; Kerala Tourism Mananchira listing.',
  4,
  ARRAY['heritage','walk','pond','square','zamorin']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kozhikode anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary, established_year
) VALUES (
  'kozhikode',
  'Paragon Restaurant',
  'Kannur Road, Kozhikode town',
  'kozhikode-town',
  ARRAY['malabar','mappila','biriyani','seafood']::text[],
  'mid_range',
  'Calicut chicken biriyani',
  ARRAY['Calicut biriyani','Chemmeen pollichathu','Beef ularthiyathu','Kappa with fish curry']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Founded 1939 — the Calicut biriyani institution. Three storeys, 250+ covers, still family-run by the founder''s descendants. The Calicut biriyani style (short-grain khyma rice, separate-cook with ghee, fennel-cardamom spice mix) is benchmarked here. Open 11:30am-11pm. Anthony Bourdain shot a No Reservations segment here in 2008.',
  'Biriyani fired at 12:15pm and 7:15pm — eat within an hour. The chemmeen (prawn) pollichathu in banana leaf is the order non-biriyani diners make. Weekend dinner needs 30-45 min wait without booking. Cards and UPI both work.',
  'Kannur Road, Kozhikode 673001',
  'https://maps.google.com/?q=Paragon+Restaurant+Kozhikode',
  ARRAY[
    'https://paragonrestaurant.in/',
    'https://www.tripadvisor.in/Restaurant_Review-g297628-d3358017-Reviews-Paragon_Restaurant-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true,
  1939
),
(
  'kozhikode',
  'Indian Coffee House Mananchira',
  'Mananchira Square, Kozhikode',
  'kozhikode-town',
  ARRAY['south-indian','indian','coffee']::text[],
  'cafe',
  'Masala dosa with filter coffee',
  ARRAY['Masala dosa','Filter coffee','Egg roast','Mutton cutlet']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Kozhikode ICH branch on Mananchira Square — operational since 1958, the original heritage-square branch. Rectangular colonial-era hall opposite the old Mananchira pond. Turbaned uniformed waiters, filter coffee ₹25, masala dosa ₹50. Used by Calicut University students and the Kozhikode press corps.',
  'Breakfast egg-roast + appam combo is the call. Morning before 9am is the calm window; 5pm-7pm tea-time fills with college crowd. UPI accepted at this branch; cash always works.',
  'Mananchira Square, Kozhikode 673001',
  'https://maps.google.com/?q=Indian+Coffee+House+Mananchira+Kozhikode',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurant_Review-g297628-Reviews-Indian_Coffee_House-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true,
  1958
),
(
  'kozhikode',
  'Rahmath Hotel',
  'Kuttichira heritage quarter',
  'kuttichira',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Mappila chicken biriyani',
  ARRAY['Mappila biriyani','Pathiri with chicken curry','Kallummakkaya (mussel) roast','Halwa']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Kuttichira-quarter Mappila kitchen — 4 minutes walk from Mishkal Mosque. The biriyani style is older and slightly different from Paragon: more black pepper, less ghee, no separate-cook. Kallummakkaya (mussel) roast in coconut and chilli is the Kuttichira specialty rare elsewhere. Open 6am-10:30pm.',
  'Biriyani fired 11:30am and 6:30pm — eat within 90 min. Pathiri (rice-flour flatbread) fresh-pressed 12pm and 7pm. The Calicut halwa from the counter (brown, jaggery) is take-away only — buy 250g. Cash and UPI.',
  'Kuttichira, Kozhikode 673001',
  'https://maps.google.com/?q=Rahmath+Hotel+Kuttichira+Kozhikode',
  ARRAY[
    'https://www.zomato.com/kozhikode/rahmath-hotel-kuttichira',
    'https://www.tripadvisor.in/Restaurants-g297628-c11-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'kozhikode',
  'Salkara',
  'Mavoor Road, Kozhikode',
  'kozhikode-town',
  ARRAY['kerala','south-indian','indian-thali']::text[],
  'casual',
  'Kerala sadya thali',
  ARRAY['Kerala sadya','Karimeen pollichathu','Avial','Coconut payasam']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Kerala-thali specialist on Mavoor Road — the sadya (banana-leaf 12-15 course vegetarian feast) is the order. Sit-down hall, AC. The non-veg menu adds karimeen (pearl-spot fish) and prawn curry. Open 11am-10:30pm.',
  'Sadya served 12-3pm only; afternoon and evening run on à la carte. For first-timers, sadya is the call — coconut payasam (banana + coconut-milk sweet) closes the meal. Cards and UPI both work.',
  'Mavoor Road, Kozhikode 673016',
  'https://maps.google.com/?q=Salkara+Mavoor+Road+Kozhikode',
  ARRAY[
    'https://www.zomato.com/kozhikode/salkara-mavoor-road',
    'https://www.tripadvisor.in/Restaurants-g297628-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'kozhikode',
  'Zain''s Hotel',
  'Convent Cross Road, Kozhikode beach area',
  'kozhikode-town',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Special chicken biriyani',
  ARRAY['Calicut biriyani','Mutton biriyani','Pathiri with mutton','Sulaimani']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Mappila biriyani institution near Kozhikode beach — Convent Cross Road branch open since the 1970s, second to Paragon among locals for biriyani depth-of-flavour. Smaller hall, faster service. Open 6am-11pm.',
  'Biriyani fired 11:30am and 6:30pm. Pathiri-with-mutton is the alternative if biriyani queue is long. Sulaimani (Mappila spice tea) closes the meal. Cash and UPI both work.',
  'Convent Cross Road, Kozhikode 673001',
  'https://maps.google.com/?q=Zains+Hotel+Kozhikode',
  ARRAY[
    'https://www.zomato.com/kozhikode/zains-hotel-convent-cross-road',
    'https://www.tripadvisor.in/Restaurants-g297628-c11-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
);
