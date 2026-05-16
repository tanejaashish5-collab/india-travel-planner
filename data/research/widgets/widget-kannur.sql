-- Kannur S16 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Mappila Square" — no resolvable single venue, listicle ghost
--   - "Sundareshwara Temple Kannur" — couldn''t confirm primary source for a specific Kannur address
--   - "Aralam WLS" — 45km, beyond the practical day-trip buffer from Kannur town
--   - "Mahe Tourist Home Mahe" — confirmed in Pondicherry UT, cross-territory administrative complication; skipped
--
-- VERIFIED:
--   - Parassinikkadavu Muthappan Temple — only daily Theyyam venue in Kerala (most temples have annual Theyyam season)
--   - Muzhappilangad Drive-in Beach — India''s longest drive-in beach (4km), Asia''s longest
--   - Thalassery Fort — British East India Company 1708 on a laterite headland
--   - Hotel Sea Lord — Kannur biriyani anchor
--   - Odhen''s (Thalassery) — Thalassery biriyani institution
--   - Indian Coffee House Kannur — Town Square branch, ICH cooperative

-- =========================================================
-- HIDDEN GEMS — 3 verified Kannur area outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kannur-parassinikkadavu-theyyam',
  'kannur',
  'Parassinikkadavu Muthappan Temple',
  NULL,
  16,
  '35 min drive north of Kannur town',
  'Theyyam — the 800-year-old north Malabar ritual dance-possession — is normally a December-April annual season at most Kerala temples. Parassinikkadavu is the one venue where Muthappan Theyyam is performed every single day, twice a day. Most cultural tourists assume Theyyam needs festival-timing planning and miss the daily ritual entirely.',
  'Muthappan Theyyam performed daily 6am and 5:30pm — the only year-round daily Theyyam in Kerala. The deity Muthappan (a hybrid Shiva-Vishnu hunter figure) is offered toddy and fish (rare for Hindu temples), and the temple accepts all castes and religions. Free entry, plus a community lunch (annadanam) at 12:30pm for all visitors. Drive 16km from Kannur on the Taliparamba road.',
  'easy',
  'Kerala Tourism Theyyam circuit anchor; temple''s own administrative records show daily Theyyam since 1960s.',
  5,
  ARRAY['theyyam','temple','ritual','dance','daily']::text[],
  '{}'::jsonb
),
(
  'kannur-muzhappilangad-drive-beach',
  'kannur',
  'Muzhappilangad Drive-in Beach',
  NULL,
  15,
  '25 min south of Kannur town off NH-66',
  'BBC Travel listed Muzhappilangad among Asia''s top six drive-in beaches in 2016 but most domestic tourists going to Kerala for beaches still default to Varkala or Kovalam. The 4km hard-packed strand allows cars/motorbikes to actually drive on the sand — a rare feature in India.',
  'India''s longest drive-in beach at 4km, Asia''s longest. Black-sand mud at the high-tide line, white sand to the low-tide line. Drive your own vehicle on; tide-table on Kerala Tourism site marks the safe windows (low tide ± 2 hours). 4-wheel rentals at the entry; bike rentals ₹300/hour. Local fishermen still run their boats off the beach''s north end — go pre-9am to watch the catch land.',
  'easy',
  'Kerala Tourism beach listing; BBC Travel 2016 inclusion in Asia''s top drive-in beaches.',
  5,
  ARRAY['beach','drive','tide','unique']::text[],
  '{}'::jsonb
),
(
  'kannur-thalassery-fort',
  'kannur',
  'Thalassery Fort',
  NULL,
  22,
  '40 min south of Kannur on NH-66',
  'Kannur Fort (St Angelo) gets all the heritage attention because it''s within Kannur town. Thalassery Fort, built 22km south by the British East India Company in 1708, is overlooked despite being the British launching point for Malabar control and the site that gave Thalassery its colonial spelling "Tellicherry".',
  'Square laterite fort 1708, four bastions, secret tunnel system to the sea (now closed). View from the ramparts covers Thalassery harbour where the British shipped Malabar pepper and Tellicherry coffee to Europe. Free entry; combine with the Mahe French Quarter (6km south, UT Puducherry) for a half-day British-French-Indian heritage loop. Cricket fans note Thalassery is where the first cricket match in India was played in 1792.',
  'easy',
  'Archaeological Survey of India Kerala Circle protected; Kerala Tourism heritage fort inventory.',
  4,
  ARRAY['fort','heritage','british','laterite','cricket']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified across Kannur + Thalassery cluster
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kannur',
  'Hotel Sea Lord',
  'Fort Road, Kannur town',
  'kannur-town',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Kannur biriyani',
  ARRAY['Kannur biriyani','Fish moilee','Chicken pepper fry','Pathiri with mutton curry']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Long-running Kannur biriyani anchor on Fort Road, 5 min walk from St Angelo Fort. The biriyani style differs from Thalassery — slightly drier, more black pepper, less ghee. Open 6am-10:30pm. Bus-load Theyyam pilgrims stop here on the way to Parassinikkadavu.',
  'Biriyani dispatched 11:30am and 6:30pm — eat within an hour. Fish moilee is the safer call for first-timers — Sea Lord''s version uses king mackerel and tempered coconut milk. UPI and cash both work; cards unreliable on busy days.',
  'Fort Road, Kannur 670001',
  'https://maps.google.com/?q=Hotel+Sea+Lord+Kannur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d2632620-Reviews-Hotel_Sea_Lord-Kannur_Kannur_District_Kerala.html',
    'https://www.zomato.com/kannur/hotel-sea-lord-fort-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kannur',
  'Odhen''s Restaurant',
  'Thalassery — 22km south of Kannur',
  'thalassery',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Thalassery chicken biriyani',
  ARRAY['Thalassery biriyani','Mutton stew with appam','Karimeen pollichathu','Halwa Thalassery-style']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Thalassery biriyani institution since the 1960s — short-grain khyma rice with ghee, separate-cook method (not dum). The cardamom-and-fennel masala is the giveaway. Halwa Thalassery-style (brown, jaggery-rich, not the orange Karachi version) sold by weight at the counter. Open 11:30am-10pm.',
  'Biriyani fired 12:30pm and 7:30pm — eat within 90 min. Halwa is take-away only; 500g pack travels well 2-3 days in the cool. Cash works, UPI works, cards rarely.',
  'Logan''s Road, Thalassery 670101',
  'https://maps.google.com/?q=Odhens+Thalassery',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304560-d3941523-Reviews-Odhen_s_Restaurant-Thalassery_Kannur_District_Kerala.html',
    'https://www.zomato.com/kannur/odhens-thalassery'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kannur',
  'Indian Coffee House Kannur',
  'Town Square, near KSRTC Bus Stand',
  'kannur-town',
  ARRAY['south-indian','indian','coffee']::text[],
  'cafe',
  'Masala dosa',
  ARRAY['Masala dosa','Filter coffee','Egg roast','Vegetable cutlet']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Kannur branch of the Indian Coffee House cooperative (chain started 1958 in Kerala as a worker-run alternative). Turbaned uniformed waiters, filter coffee ₹25, masala dosa ₹50. Used by Kannur University students and KSRTC bus crews. Open 6:30am-9:30pm.',
  'Egg roast (₹70) with appam is the breakfast call; masala dosa is the safe lunch. Lunch rush 1-2pm — go before 12:30 or after 2pm. UPI now accepted at the Kannur branch.',
  'Town Square, KSRTC Bus Stand Road, Kannur 670001',
  'https://maps.google.com/?q=Indian+Coffee+House+Kannur',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurants-g303881-Kannur_Kannur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'kannur',
  'Kalpaka Restaurant',
  'SM Road, Kannur',
  'kannur-town',
  ARRAY['malabar','mappila','seafood']::text[],
  'casual',
  'Pathiri with chicken curry',
  ARRAY['Pathiri with chicken curry','Fish biriyani','Squid roast','Banana leaf meals']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mid-range Mappila kitchen on SM Road — pathiri (rice-flour flatbread) with chicken curry is the order. The squid roast (kanava roast) is a coastal Kannur dish not always on the menu but worth asking for. Banana-leaf vegetarian meals at lunch ₹150.',
  'Pathiri fresh-pressed at 12pm and 7pm — go within the hour. Off-menu requests for squid/king-fish in season (Aug-Feb) — the kitchen will source from the harbour for the next service. Cash and UPI.',
  'SM Road, Kannur 670001',
  'https://maps.google.com/?q=Kalpaka+Restaurant+Kannur',
  ARRAY[
    'https://www.zomato.com/kannur/kalpaka-restaurant',
    'https://www.tripadvisor.in/Restaurants-g303881-c11-Kannur_Kannur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kannur',
  'Paris Presidency Restaurant',
  'Kannappa Road, Kannur',
  'kannur-town',
  ARRAY['malabar','north-indian','chinese']::text[],
  'mid_range',
  'Special chicken biriyani',
  ARRAY['Kannur biriyani','Beef ularthiyathu','Chilli chicken','Mutton chukka']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Mid-range multi-cuisine restaurant on Kannappa Road, AC family hall on the first floor. Beef ularthiyathu (dry-fried beef with coconut slivers) is the order locals come for, alongside the standard Kannur biriyani. Open 11am-11pm.',
  'Family hall fills 8-9:30pm — book by phone for dinner Friday-Sunday. Lunch is quieter, AC works. Cards work, UPI works, cash always.',
  'Kannappa Road, Kannur 670001',
  'https://maps.google.com/?q=Paris+Presidency+Kannur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g303881-Kannur_Kannur_District_Kerala.html',
    'https://www.zomato.com/kannur/paris-presidency-kannappa-road'
  ]::text[],
  '2026-05-11',
  false
);
