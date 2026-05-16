-- aalo — widget backfill (West Siang HQ, Adi+Galo town, 50K population)
-- Real tourism infra exists. District govt site lists 9 named hotels. Eats also have 4+ verified named restaurants.
-- Existing gems (2): Basar (Lepa Rada HQ), Kane Wildlife Sanctuary. Eats (2): Cafe Aalo, Hotel Toshi Palace Restaurant. Stays (0).

-- =========================================================
-- gems (+1)
-- =========================================================

INSERT INTO hidden_gems (id, near_destination_id, name, distance_km, drive_time, why_unknown, why_go, difficulty, confidence_score, tags, translations) VALUES
('aalo-patum-bridge', 'aalo', 'Patum Bridge over Yomgo River',
  2, '5 min from Aalo town centre',
  'It is a working road bridge that locals cross daily — domestic tourists driving the Aalo–Mechuka circuit usually pass over it without stopping. It is not on the standard "Arunachal sightseeing" lists.',
  'A 146m cable bridge over the Yomgo (Siyom) River, doubling as the best uninterrupted vantage of Aalo town. Walking the span at sunset gives you the river bend with the Donyi Polo temple grounds visible on the far bank. After dark the bridge lights up — a small infrastructure spectacle in a town with very little night life.',
  'easy', 4,
  ARRAY['bridge','viewpoint','river','sunset'],
  '{}'::jsonb);

-- =========================================================
-- eats (+3)
-- =========================================================

INSERT INTO local_eateries (destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, why_it_matters, insider_tip, signature_address, google_maps_url, source_urls, last_verified) VALUES
('aalo', 'Galong''s Kitchen', 'Mechukha-Aalo Road',
  ARRAY['Galo','Tribal','Northeast Indian'], 'casual',
  'Pika Pila',
  ARRAY['Pika Pila','Bamboo shoot fry','Apong (rice beer)','Smoked pork'],
  '₹', '[150,400)'::int4range,
  'mixed', false, 'walk-in', 'casual',
  'One of the few places in Aalo serving genuine Galo tribal cuisine to outsiders. Pika Pila is a fermented bamboo-shoot and pork-fat preparation that defines Galo home kitchens — most restaurants in Arunachal soften it for tourists, Galong''s does not. Located on the Aalo–Mechukha road, popular with local govt staff and overland convoys heading deeper into West Siang.',
  'Order Pika Pila with steamed rice, not roti. They run out of pork by 2pm on most days — go for early lunch. Apong (rice beer) is served in bamboo cups, ask politely as it is not always on the table.',
  'Mechukha-Aalo Road, Aalo, West Siang, Arunachal Pradesh',
  NULL,
  ARRAY['https://travelsetu.com/guide/along-aalo-tourism/food-in-along-aalo','https://welcomearunachal.com/explore/cuisine-local-flavours/'],
  '2026-05-10');

INSERT INTO local_eateries (destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, why_it_matters, insider_tip, signature_address, google_maps_url, source_urls, last_verified) VALUES
('aalo', 'Donyi Hango Restaurant', 'Near SBI, Aalo',
  ARRAY['Galo','Adi','Indian'], 'casual',
  'Traditional Arunachal thali',
  ARRAY['Arunachal thali','Dung Po (bamboo-tube rice)','Pasa fish soup','Rice beer'],
  '₹', '[200,500)'::int4range,
  'veg-friendly', true, 'walk-in', 'casual',
  'Aalo''s most accessible introduction to a full Adi-Galo thali — rice steamed in bamboo (Dung Po), pasa fish soup with the local ooriam leaf juice, fermented bamboo, and a small portion of smoked meat. Customisable to vegetarian on request, which most other tribal-cuisine places do not offer.',
  'Ask for the thali to be served with apong if you want the full experience — they don''t bring it by default to outside tourists. Lunch is more reliable than dinner; dinner kitchen sometimes shuts by 8pm.',
  'Near SBI, Aalo, West Siang, Arunachal Pradesh',
  NULL,
  ARRAY['https://travelsetu.com/guide/along-aalo-tourism/food-in-along-aalo'],
  '2026-05-10');

INSERT INTO local_eateries (destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, why_it_matters, insider_tip, signature_address, google_maps_url, source_urls, last_verified) VALUES
('aalo', 'Orange Restaurant and Lounge', 'Aalo town centre',
  ARRAY['Indian','Chinese','Tibetan'], 'mid_range',
  'Thukpa',
  ARRAY['Thukpa (veg/non-veg)','Veg momos','Chowmein','Chicken curry'],
  '₹₹', '[250,600)'::int4range,
  'veg-friendly', true, 'walk-in', 'casual',
  'The reliable pan-Indian-plus-Tibetan fallback for travelers who have hit Galo-cuisine fatigue or are travelling with vegetarians. Standard thukpa, veg momos, chicken curry — predictable and clean. Govt staff lunch crowd 1-2pm, traveller crowd 7-9pm.',
  'Their thukpa is the better order than the chowmein — broth is richer than the noodles deserve. Cash works better than UPI; Aalo signal can drop in the evening.',
  'West Siang, Aalo, Arunachal Pradesh',
  NULL,
  ARRAY['https://travelsetu.com/guide/along-aalo-tourism/food-in-along-aalo'],
  '2026-05-10');

-- =========================================================
-- stays (+3)
-- =========================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('aalo', 'experience', 'Hotel Toshi Palace',
  'Mid-range hotel',
  '₹2,500–₹4,500 per night',
  'A 14-room three-floor hotel opposite the State Transport Station in Sipu Colony, the most established stay for travelers passing through Aalo. In-house restaurant runs 7am-9pm. Wedge between budget rest houses and the unreliable homestay scene — predictable for Aalo–Mechukha overland trips.',
  'web_search', 0.75, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('aalo', 'value', 'P&P Resort (District Tourist Complex)',
  'Govt tourist complex',
  '₹1,200–₹2,500 per night',
  'Officially listed on the West Siang district govt accommodation page (westsiang.nic.in). Pi Colony location — quieter end of town. Booking via 7636852354. Slower service than private hotels but reliable for solo travelers and families wanting a govt-rate fallback.',
  'web_search', 0.70, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('aalo', 'location', 'Hotel Aagam',
  'Mid-range hotel',
  '₹1,800–₹3,200 per night',
  'Listed on West Siang district govt accommodation page, located opposite the Deputy Commissioner''s office — the administrative core of Aalo. Closer to Donyi Polo temple and the Mopin festival grounds than Toshi Palace. Useful if your Aalo trip overlaps with the March-April Mopin festival.',
  'web_search', 0.70, true);
