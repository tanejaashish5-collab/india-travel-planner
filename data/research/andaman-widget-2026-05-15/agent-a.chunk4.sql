
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Cownfish Cafe (Wild Orchid Resort)',
  'Beach No. 5, Wild Orchid Resort, Havelock',
  ARRAY['continental','cafe','breakfast','beverages']::text[],
  'cafe',
  'All-day breakfast platter + filter coffee',
  ARRAY['All-day breakfast platter','Pancakes with coconut syrup','Cappuccino','Sandwiches','Smoothies']::text[],
  '₹₹',
  '[300,650)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Wild Orchid''s casual all-day cafe — the breakfast + coffee outpost separate from the fine-dining Red Snapper. The Govind-Nagar mid-morning hangout for diving-trip-returners and slow-travel solo travelers.',
  'Open from 7am — coffee plus pancakes between 7-9am before snorkel boats depart. Wifi available. Sit in the garden side for shade.',
  'Wild Orchid Resort, Beach No. 5, Vijaynagar, Havelock Island 744211',
  'https://maps.google.com/?q=Wild+Orchid+Resort+Havelock+Cownfish',
  ARRAY['https://www.eternalandamans.com/havelock-island/best-havelock-restaurants','https://traveltriangle.com/hotel/the-wild-orchid-havelock-an']::text[],
  '2026-05-15',
  2007
);

-- NEIL ISLAND (need +5)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Blue Sea Restaurant & Bungalows',
  'Beach No. 3 (back from beach), Neil Island',
  ARRAY['seafood','italian','indian','continental']::text[],
  'casual',
  'Butter garlic prawns + grilled lobster (no fixed menu — daily catch)',
  ARRAY['Butter garlic prawns','Grilled lobster','King prawns','Crab masala','Squid']::text[],
  '₹₹',
  '[450,1000)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Shack-style restaurant just behind Beach No. 3 — no fixed menu, owner Balaram cooks what fishermen brought in that morning. Centrepiece is a blue-whale skull. Lonely Planet feature property; Tripadvisor regular.',
  'Order the lobster + prawn combo — they''re Balaram''s most-requested. Cash preferred. Pair with the bungalow as a stay-and-dine combo.',
  'Beach No. 3, Neil Island (Shaheed Dweep) 744104',
  'https://maps.google.com/?q=Blue+Sea+Restaurant+Neil+Island',
  ARRAY['https://www.lonelyplanet.com/india/andaman-and-nicobar-islands/neil-island/restaurants/blue-sea/a/poi-eat/1353176/356201','https://www.tripadvisor.in/Restaurant_Review-g2646897-d8799724-Reviews-Blue_Sea-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2012
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Garden View Restaurant (Pearl Park Beach Resort)',
  'Laxmanpur, Neil Island (inside Pearl Park Beach Resort)',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Multi-cuisine dinner with sunset-point access',
  ARRAY['Andamanese fish curry','Tandoori platter','Veg thali','Pasta','Tropical fruit dessert']::text[],
  '₹₹',
  '[600,1200)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-resort multi-cuisine restaurant at Pearl Park (ranked #4 of 18 Lakshmanpur hotels). Big restaurant + swimming pool combo. Tripadvisor 4.0/5. The mid-range non-shack dinner option on Neil — most non-resort guests welcome on call-ahead.',
  'Reserve a 7pm table; sunset at Laxmanpur beach is a 5-min walk first. Open to non-residents. Bigger families with kids easier here than the shacks.',
  'Pearl Park Beach Resort, Laxmanpur, Neil Island (Shaheed Dweep) 744104',
  'https://maps.google.com/?q=Pearl+Park+Beach+Resort+Neil+Island',
  ARRAY['https://pearl-park-beach-resort-neil-island.hotelsgds.com/restaurant/','https://www.tripadvisor.com/Hotel_Review-g2646897-d647239-Reviews-or10-Pearl_Park_Beach_Resort-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2008
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Tango Beach Resort Restaurant',
  'Laxmanpur Beach No. 1, Neil Island (Tango Beach Resort)',
  ARRAY['indian','seafood','continental','multi-cuisine']::text[],
  'casual',
  'Sunset dinner with direct sea-facing view',
  ARRAY['Daily catch grilled fish','Andaman crab masala','Cocktail tropical platter','Veg/non-veg thali']::text[],
  '₹₹',
  '[450,1000)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'In-resort restaurant at Tango Beach (oldest preserved resort in Neil) — only Neil property with direct sea-facing balcony rooms; restaurant 60m from Beach No. 1. Bookable via Booking.com 70M+ verified reviews.',
  'Take a sea-facing balcony table for 6pm sundown — Laxmanpur is the sunset side. Order grilled fish over curries (kitchen specializes).',
  'Tango Beach Resort, Laxmanpur Beach No. 1, Neil Island 744104',
  'https://maps.google.com/?q=Tango+Beach+Resort+Neil+Island',
  ARRAY['https://tangobeachandaman.com/','https://www.booking.com/hotel/in/tango-beach-resort.html']::text[],
  '2026-05-15',
  2009
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'JN Cafe',
  'Main market road, Neil Island (between jetty and Bharatpur)',
  ARRAY['cafe','continental','breakfast','italian']::text[],
  'cafe',
  'Cyclist''s breakfast + filter coffee',
  ARRAY['Breakfast pancakes','Sandwiches','Pasta','Filter coffee','Fresh juices']::text[],
  '₹',
  '[200,450)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Small cafe at the main market road between the jetty and Bharatpur — the cyclist-and-scooter-renter''s default breakfast stop on Neil (most travelers cycle the 15 sq km island). Quick, cheap, fast turnaround.',
  'Open 7am-9pm. Best for breakfast before 9am scooter rentals (₹400/day) take you toward Sitapur sunrise or Laxmanpur sunset.',
  'Main market road, Neil Island 744104',
  'https://maps.google.com/?q=JN+Cafe+Neil+Island',
  ARRAY['https://wanderlog.com/place/details/471720','https://www.tripadvisor.in/Restaurants-g2646897-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2016
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'neil-island',
  'Dugong Restaurant (SeaShell Neil)',
  'Sitapur Road, Neil Island (inside SeaShell Neil Resort)',
  ARRAY['multi-cuisine','indian','continental','seafood']::text[],
  'mid_range',
  'In-resort multi-cuisine with sea-side patio',
  ARRAY['Daily seafood platter','Pasta','Andamanese fish curry','Tandoori prawns','Tiramisu']::text[],
  '₹₹₹',
  '[800,1600)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-resort restaurant at SeaShell Neil — Neil''s only mid-range resort restaurant with full menu + sea-side patio. Non-residents welcome by reservation. SeaShell brand also runs the Havelock and Port Blair properties.',
  'Best for 7:30pm dinner. Patio seating books out — phone ahead. The all-day spread is buffet-style for in-resort guests; à la carte for non-residents.',
  'SeaShell Neil, Sitapur Road, Neil Island 744104',
  'https://maps.google.com/?q=SeaShell+Neil+Island',
  ARRAY['https://seashellhotels.net/','https://www.tripadvisor.in/Restaurants-g2646897-Neil_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2014
);

-- ============================================================================
-- STEP 4 — DESTINATION STAY PICKS (1 new + 14 upserts)
-- ============================================================================

-- PORT BLAIR — add 1 new location slot (SeaShell Port Blair, real Marine Hill property)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'port-blair', 'location', 'SeaShell Port Blair',
  '4-star hotel',
  '₹6,000–₹15,000 per night',
  'Perched on top of Marine Hill with panoramic Phoenix Bay views — walking distance to Cellular Jail and Aberdeen Bazaar. Rooftop live music + sea-view dining.',
  'Tripadvisor #3 of 109 A&N hotels (1,877 reviews, 4/5). Best mid-tier location in PB — sea view + 5 min taxi to Cellular Jail + 2 km to Aberdeen Jetty (Ross/North Bay ferries).',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','sea-view','near-cellular-jail']),
  'web_search', 0.92
);

-- ROSS ISLAND — upsert experience/value/xfactor to PB-side properties (location slot already DELETEd above)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ross-island', 'experience', 'Fortune Resort Bay Island (ITC Hotels)',
  'ITC 4-star heritage resort',
  '₹12,000–₹25,000 per night',
  'Marine Hill ITC property — only PB hotel with open-deck Mandalay restaurant directly facing Ross Island. Sea-view rooms look at the island you visit by day.',
  'Replaces fabricated "Havelock Island Resort (nearby Havelock Island, 30min ferry)" — Havelock is a 2.5-hr ferry from PB, NOT 30 min, and is the wrong base for Ross day-trips. Ross is reached from Aberdeen Jetty (PB), not Havelock. Fortune Bay Island (ITC) is the canonical Ross day-trip base. Verified via Tripadvisor + ITC Hotels official.',
  to_jsonb(ARRAY['https://www.tourmyindia.com/states/andaman/fortune-resort-bay-island.html','https://www.lifeisoutside.com/fortune-resort-bay-island-port-blair/']),
  to_jsonb(ARRAY['itc-hotels','ross-view','marine-hill']),
  'web_search', 0.93
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ross-island', 'value', 'Sinclairs Bayview Port Blair',
  '4-star sea-facing hotel',
  '₹5,000–₹10,000 per night',
  'South Point cliff-side garden hotel — 43 rooms with Bay of Bengal view. 3km to Aberdeen Jetty for Ross ferry. Alto Espirito sea-view bar.',
  'Replaces fabricated "Panchavati Guest House (Port Blair, 15min from Ross Island ferry)" — Panchavati Guest House does not appear on any verified booking platform (Tripadvisor/Booking/Goibibo). Sinclairs Bayview is real, ranked #10 of 108 A&N hotels on Tripadvisor (4/5), and is the canonical value-tier sea-view stay for Ross day-trippers.',
  to_jsonb(ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']),
  to_jsonb(ARRAY['sea-view','cliff-side','south-point']),
  'web_search', 0.92
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ross-island', 'xfactor', 'SeaShell Port Blair',
  '4-star hotel (Marine Hill)',
  '₹6,000–₹15,000 per night',
  'Top-of-Marine-Hill property with panoramic Phoenix Bay views taking in Ross Island, North Bay and the harbor. Rooftop live music + sea-view dining.',
  'Replaces fabricated "Barefoot at Havelock (Havelock Island, 35min ferry from Ross Island)" — Barefoot is on Havelock Beach 7 (2.5 hours ferry from PB), NOT a 35-min ferry from Ross. Ross ferries depart from PB Aberdeen Jetty (10-min boat ride one-way), so the relevant xfactor stay is a sea-view PB property. SeaShell PB ranked #3 of 109 A&N hotels on Tripadvisor (1,877 reviews).',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','sea-view','ross-view']),
  'web_search', 0.92
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- NORTH BAY ISLAND — upsert experience/value/xfactor to PB-side properties (location slot already DELETEd above)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'north-bay-island', 'experience', 'Fortune Resort Bay Island (ITC Hotels)',
  'ITC 4-star heritage resort',
  '₹12,000–₹25,000 per night',
  'Marine Hill ITC property — only PB hotel with open-deck Mandalay restaurant directly facing North Bay Island and Ross. Sea-view rooms.',
  'Replaces fabricated "Taj Exotica Resort & Spa, North Bay" — Taj Exotica is on Havelock (Radhanagar Beach), NOT North Bay. North Bay is an uninhabited day-trip island; the actual base for North Bay ferry is Aberdeen Jetty in Port Blair. Fortune Bay Island (ITC) is the canonical PB-side experience-tier base.',
  to_jsonb(ARRAY['https://www.tourmyindia.com/states/andaman/fortune-resort-bay-island.html','https://www.lifeisoutside.com/fortune-resort-bay-island-port-blair/']),
  to_jsonb(ARRAY['itc-hotels','north-bay-view','marine-hill']),
  'web_search', 0.93
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'north-bay-island', 'value', 'Sinclairs Bayview Port Blair',
  '4-star sea-facing hotel',
  '₹5,000–₹10,000 per night',
  'South Point cliff-side hotel with Bay of Bengal view. 3km to Aberdeen Jetty (North Bay ferry pier). Alto Espirito sea-view bar.',
  'Replaces fabricated "Silver Sand Beach Resort" claiming North Bay overnight — North Bay is uninhabited (no resorts). Sinclairs Bayview is real, ranked #10 of 108 A&N hotels on Tripadvisor (4/5), and is the canonical value-tier PB base for North Bay day-trippers.',
  to_jsonb(ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']),
  to_jsonb(ARRAY['sea-view','cliff-side','south-point']),
  'web_search', 0.92
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'north-bay-island', 'xfactor', 'SeaShell Port Blair',
  '4-star hotel (Marine Hill)',
  '₹6,000–₹15,000 per night',
  'Top-of-Marine-Hill panoramic property looking onto North Bay, Ross and the harbor — rooftop live music dining, the ₹20-note North Bay view from the deck.',
  'Replaces fabricated "Barefoot at Havelock (North Bay annex / sister property)" — Barefoot has no North Bay annex; Barefoot is on Havelock Beach 7 only. North Bay is uninhabited day-trip-only. SeaShell PB is the canonical xfactor PB sea-view stay with North Bay panoramas.',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','north-bay-view','rooftop-dining']),
  'web_search', 0.92
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- CHIDIYA TAPU — replace all 4 cross-dest stays with PB-side / Wandoor / Chidiya-Tapu-side real properties
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'chidiya-tapu', 'experience', 'Symphony Samudra Beachside Jungle Resort & Spa',
  'Beachside eco-resort',
  '₹15,000–₹30,000 per night',
  'Beachside jungle eco-resort on the Wandoor-Chidiya Tapu road, 5km from Chidiya Tapu sunset point. Club Mahindra affiliate. Ocean-spa + beach access + birdwatching trails.',
  'Replaces fabricated "Taj Exotica Resort & Spa, Havelock Island" — Taj Exotica is on Havelock Beach 7 (2.5-hour ferry from PB), NOT chidiya-tapu. Symphony Samudra is the actual experience-tier resort closest to Chidiya Tapu (5km), verified via Symphony Resorts official, Booking.com, Club Mahindra.',
  to_jsonb(ARRAY['https://www.symphonyresorts.com/symphony-samudra-beachside-jungle-resort-and-spa/','https://www.clubmahindra.com/our-resorts/symphony-samudra-port-blair','https://discoverandaman.in/hotel/symphony-samudra-beachside-jungle-resort-and-spa']),
  to_jsonb(ARRAY['beachside','eco-resort','wandoor-chidiya-tapu-road']),
  'web_search', 0.93
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();
