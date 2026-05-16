
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'adilabad',
  'Hotel Panchavathi Restaurant',
  'Cinema Road, opp Gandhi Printing Press, Adilabad town',
  ARRAY['south-indian','north-indian','multi-cuisine']::text[],
  'casual',
  'Veg thali',
  ARRAY['Veg thali','Tandoori chicken','Paneer butter masala','Filter coffee']::text[],
  '₹₹',
  '[180,361)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'One of Adilabad town''s longstanding hotel-restaurants on Cinema Road — listed on the official district tourism portal as a recommended accommodation-with-dining for NH-44 travellers and Kawal Tiger Reserve permit-holders breaking in town.',
  'Cinema-Road location means easy autorickshaw access from the bus-stand and rail-station — best dinner stop if arriving by train.',
  'Opposite Gandhi Printing Press, Cinema Road, Adilabad 504001',
  'https://maps.google.com/?q=Hotel+Panchavathi+Adilabad',
  ARRAY['https://adilabad.telangana.gov.in/accommodation/','https://www.tripadvisor.in/Hotels-g2282894-Adilabad_Adilabad_District_Telangana-Hotels.html']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'adilabad',
  'KAKAKU The Guest House Restaurant',
  '322m from Kuntala Waterfall, Neredigonda mandal',
  ARRAY['multi-cuisine','andhra','tribal-style']::text[],
  'casual',
  'Gond-tribal style chicken curry',
  ARRAY['Tribal-style chicken curry','Veg meals','Pulao','Tea']::text[],
  '₹₹',
  '[180,361)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The closest sit-down restaurant to Kuntala Falls — a 322-m walk from the falls viewpoint. The only realistic lunch option for Kuntala day-trippers from Adilabad town (64 km) who don''t want to circle back hungry.',
  'Pet-friendly. Call ahead for chicken — it''s cooked-to-order in the Gond style, takes 40 min from kitchen.',
  'Near Kuntala Waterfall, Neredigonda mandal, Adilabad district',
  'https://maps.google.com/?q=Kakaku+Guest+House+Kuntala+Falls',
  ARRAY['https://www.expedia.com/Adilabad-Hotels.d3000406702.Travel-Guide-Hotels','https://www.tripadvisor.in/Hotels-g2282894-Adilabad_Adilabad_District_Telangana-Hotels.html']::text[],
  '2026-05-15'
);

-- ananthagiri-hills eateries
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'ananthagiri-hills',
  'Haritha Valley View Resort Restaurant',
  'Tandur Road, Ananthagiri Hills, Vikarabad',
  ARRAY['multi-cuisine','south-indian','north-indian']::text[],
  'mid_range',
  'Hilltop Andhra thali',
  ARRAY['Andhra thali','Chicken biryani','Veg buffet','South Indian breakfast']::text[],
  '₹₹',
  '[280,521)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'TGTDC''s in-house dining at Haritha Valley View — the only sit-down restaurant inside the Ananthagiri Hills plateau (10 km from Vikarabad town). Workhorse for Hyderabad weekend day-trippers and Anantha-Padmanabha temple darshan groups.',
  'Restaurant is 31-room scale — Saturday-evening campfire-and-dinner combo is the move for couples; book ahead. Sunday buffet jam-packed 1–3pm.',
  'Tandur Road, Ananthagiri Hills, Vikarabad 501101',
  'https://maps.google.com/?q=Haritha+Valley+View+Ananthagiri',
  ARRAY['https://vikarabad.telangana.gov.in/accommodation/haritha-valley-view-resort-ananthagiri-hills/','https://www.tripadvisor.com/Hotel_Feature-g6550658-d7603121-zft9165-Haritha_Valley_View_Resort_Ananthagiri_Hills.html']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'ananthagiri-hills',
  'Taste of Vikarabad (TOV)',
  'Ananthagiri Hills approach road',
  ARRAY['multi-cuisine','south-indian','north-indian']::text[],
  'casual',
  'Andhra-style chicken curry',
  ARRAY['Andhra chicken curry','Biryani','Veg thali','Filter coffee']::text[],
  '₹₹',
  '[220,421)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Tripadvisor-flagged "Hidden Gem in the Hills" — a quieter approach-road sit-down ~2.7 mi from Ananthagiri''s main viewpoint. Local-couple weekend break preferred over institutional Haritha buffet.',
  'Small kitchen — order ahead by Instagram (@tasteofvikarabad). Lunch better than dinner; closes early on weekdays.',
  'Ananthagiri Hills approach road, Vikarabad',
  'https://maps.google.com/?q=Taste+of+Vikarabad+Ananthagiri',
  ARRAY['https://www.tripadvisor.com/RestaurantsNear-g6550658-d2694215-Anantagiri_Hills-Vikarabad_Vikarabad_District_Telangana.html','https://www.instagram.com/tasteofvikarabad/']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'ananthagiri-hills',
  'Ananthagiri Ruchulu',
  'Vikarabad–Ananthagiri Hills road',
  ARRAY['indo-chinese','mexican','multi-cuisine']::text[],
  'casual',
  'Veg manchurian + fried rice combo',
  ARRAY['Veg manchurian','Fried rice','Chilli chicken','Cheese tacos']::text[],
  '₹₹',
  '[220,421)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Younger-crowd Indo-Chinese-and-Mexican stop on the Vikarabad–Ananthagiri stretch — the alternative when Haritha and TOV feel too "thali". Caters to Hyderabad-IT weekend bike-trip crowd doing the Ananthagiri loop.',
  'Mexican menu is reduced India-style (cheese tacos, not authentic) — order the Indo-Chinese instead. Outdoor seating monsoon Aug–Sep.',
  'Vikarabad, Ananthagiri Hills approach',
  'https://maps.google.com/?q=Ananthagiri+Ruchulu',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g6550658-d27148580-Reviews-Ananthagiri_Ruchulu-Vikarabad_Vikarabad_District_Telangana.html','https://restaurant-guru.in/Vikarabad']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'ananthagiri-hills',
  'Wah Biryani Wah! Family Restaurant',
  'Vikarabad town (~19 min from Ananthagiri main viewpoint)',
  ARRAY['hyderabadi','biryani','north-indian','indo-chinese']::text[],
  'casual',
  'Hyderabadi mutton biryani',
  ARRAY['Mutton biryani','Mutton mandi','Kebabs','Prawns curry']::text[],
  '₹₹',
  '[240,451)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Retro-themed family biryani-and-mandi house in Vikarabad town — the only Hyderabadi-biryani-grade sit-down within 20 minutes of Ananthagiri. Rated 4.3/5 over consistent reviewer load.',
  'Mandi (slow-cooked Arabian-style) is a recent add and the real differentiator — book a half-mandi platter for 2 instead of double biryani.',
  'Vikarabad, Telangana 501101',
  'https://maps.google.com/?q=Wah+Biryani+Wah+Vikarabad',
  ARRAY['https://www.tripadvisor.com/RestaurantsNear-g6550658-d2694215-Anantagiri_Hills-Vikarabad_Vikarabad_District_Telangana.html','https://traveltriangle.com/blog/restaurants-in-vikarabad/']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'ananthagiri-hills',
  'The Food Villa',
  'Vikarabad, near Ananthagiri Hills approach',
  ARRAY['multi-cuisine','continental','indo-chinese']::text[],
  'mid_range',
  'Brunch platter',
  ARRAY['Brunch platter','Soups','Chicken seafood','Veg/non-veg biryani']::text[],
  '₹₹',
  '[280,521)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Slightly upscale clean-cosy sit-down on the Vikarabad–Ananthagiri stretch with a brunch-through-dinner menu. Fills the multi-cuisine niche that institutional Haritha doesn''t do — couples and small-group weekend mainstay.',
  'Brunch (10:30am–1pm) is the order — quiet, kitchen rested, less wait. Dinner gets weekend-crowded after 7:30pm.',
  'Vikarabad, Telangana 501101',
  'https://maps.google.com/?q=The+Food+Villa+Vikarabad',
  ARRAY['https://onlinehyderabad.in/best-restaurants-in-anantagiri-hills/','https://traveltriangle.com/blog/restaurants-in-vikarabad/']::text[],
  '2026-05-15'
);

-- =====================================================
-- (4) DESTINATION STAY PICKS — replacements + new alampur stays
-- =====================================================

-- nagarjuna-konda: replace location/Manakonda + xfactor/Srisailam-Houseboats fabrications
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'nagarjuna-konda', 'location', 'Haritha Vijay Vihar Hotel (TGTDC)',
  'State-tourism hotel',
  '₹2,500–₹4,500 per night',
  'TGTDC''s flagship in Hill Colony, 7 km from Nagarjuna Sagar dam — the only walking-distance stay from the boat-jetty for the Nagarjunakonda island museum.',
  'Replaces fabricated "Manakonda Resort" (Manakonda is a Hyderabad suburb 130 km from Nagarjuna Sagar). Bar attached, swimming pool, AC suites with dam views — the workhorse for any Buddhist-circuit visitor.',
  to_jsonb(ARRAY['https://telanganatourism.gov.in/partials/stay/nalgonda/haritha-vijay-vihar-hotel-nagarjuna-sagar.html','https://www.tripadvisor.com/Hotel_Review-g1177884-d1172624-Reviews-Haritha_Vijay_Vihar_Hotel-Nagarjuna_Sagar_Telangana.html']),
  to_jsonb(ARRAY['tg-tourism','dam-walking-distance']),
  'web_search', 0.90
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
  'nagarjuna-konda', 'xfactor', 'Hotel Siddartha Nagarjuna Sagar',
  'Budget boutique hotel',
  '₹2,000–₹3,000 per night',
  'Six-room family-run boutique in Buddhavanam Hill Colony, walking distance from the dam. The "biryani hotel" — kitchen famous locally for less-oily Hyderabadi mutton dum.',
  'Replaces fabricated "Srisailam Houseboats (Nagarjuna Sagar Lake)" (Srisailam is a separate AP dam 200 km away; Nagarjuna Sagar has no houseboats). Hotel Siddartha is the small-property xfactor for travellers who want a kitchen-led stay over TGTDC institutional.',
  to_jsonb(ARRAY['https://www.makemytrip.com/tripideas/attractions/hotel-siddartha','https://www.tripadvisor.in/Hotels-g1177884-Nagarjuna_Sagar_Telangana-Hotels.html']),
  to_jsonb(ARRAY['boutique','biryani-famous','dam-walking']),
  'web_search', 0.82
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

-- alampur: clean-slate, 3 new stays (experience, value, location)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'alampur', 'experience', 'Haritha Hotel Alampur (TGTDC)',
  'State-tourism hotel',
  '₹1,200–₹2,200 per night',
  'TG-Tourism''s only Alampur-town stay, 18 AC rooms near the Jogulamba Temple bridge — the realistic option for Nava-Brahma + Shakti-Peetha pilgrims doing 1-night stopover from Hyderabad.',
  'Only walking-distance temple-cluster property; alternative is 26 km drive to Gadwal town. AC rooms with meals, free WiFi, CCTV, hot water.',
  to_jsonb(ARRAY['https://telanganatourism.gov.in/partials/stay/jogulamba-gadwal/haritha-hotel-alampur.html','https://hotels.xploreall.com/room/alampur-haritha-hotel/']),
  to_jsonb(ARRAY['tg-tourism','temple-cluster-walking','only-stay-in-town']),
  'web_search', 0.85
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'alampur', 'value', 'Haritha Hotel Gadwal (TGTDC)',
  'State-tourism hotel',
  '₹1,500–₹2,800 per night',
  'TGTDC Gadwal-town property 26 km north of Alampur — fallback when Alampur Haritha is booked-out or shut. District-HQ amenities, restaurant always cooking.',
  'Best value-tier stay for pilgrims who can drive the 30-min commute to Nava-Brahma temples. Bigger room inventory than Alampur, better restaurant uptime.',
  to_jsonb(ARRAY['https://hotels.xploreall.com/room/gadwal-haritha-hotel/','https://telanganatourismhotels.in/']),
  to_jsonb(ARRAY['tg-tourism','district-hq','fallback-stay']),
  'web_search', 0.80
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'alampur', 'location', 'Sri Jogulamba Devasthanam Choultries',
  'Temple-trust pilgrim accommodation',
  '₹300–₹800 per night',
  'Temple-trust-managed pilgrim choultries (dharmashalas) inside/adjacent to the Jogulamba Shakti-Peetha complex — the realistic budget pilgrim base for darshan + Nava-Brahma circuit.',
  'For pilgrims who want a non-hotel stay close to the temple cluster. Simple rooms, modest fee, donate at the hundi.',
  to_jsonb(ARRAY['https://gadwal.telangana.gov.in/accommodation/','https://srijogulamba.com/about-us']),
  to_jsonb(ARRAY['temple-trust','pilgrim-budget','choultry']),
  'manual', 0.70
);

-- adilabad: replace xfactor/"Nagarjunasagar Homestay (Hajipur)" cross-state fab
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'adilabad', 'xfactor', 'Sterling Tipeshwar',
  'Wildlife-resort',
  '₹6,000–₹12,000 per night',
  'Sterling''s Tipeshwar property — closest forest-resort experience to Kawal Tiger Reserve and the Kuntala/Pochera falls circuit. Spacious well-maintained rooms, in-house restaurant, jungle ambience.',
  'Replaces fabricated "Nagarjunasagar Homestay (Hajipur)" (Hajipur is in Bihar; Nagarjunasagar is 400 km from Adilabad — pure cross-state ghost). Sterling Tipeshwar is the legit forest-edge xfactor for the Adilabad–Kawal-TR circuit.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2282894-Adilabad_Adilabad_District_Telangana-Hotels.html','https://www.expedia.com/Adilabad-Hotels.d3000406702.Travel-Guide-Hotels']),
  to_jsonb(ARRAY['forest-edge','sterling-chain','tiger-reserve-base']),
  'web_search', 0.78
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

-- ananthagiri-hills: replace value/Srisailam-AP + experience/generic-Hills-Resort + xfactor/Spice-Garden fabrications
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ananthagiri-hills', 'experience', 'Haritha Valley View Resort Ananthagiri Hills (TGTDC)',
  'State-tourism resort',
  '₹3,500–₹6,500 per night',
  '31-room TGTDC resort on the Ananthagiri Hills plateau with AC suites, swimming pool, in-house restaurant, and Saturday-evening campfire — the only on-plateau resort within the protected coffee-plantation belt.',
  'Replaces fabricated "Ananthagiri Hills Resort" (generic listicle name with no verifiable Booking/Tripadvisor footprint). Haritha Valley View is the real, listed, govt-of-TG property at the top of the hill.',
  to_jsonb(ARRAY['https://vikarabad.telangana.gov.in/accommodation/haritha-valley-view-resort-ananthagiri-hills/','https://www.tripadvisor.com/Hotel_Feature-g6550658-d7603121-zft9165-Haritha_Valley_View_Resort_Ananthagiri_Hills.html']),
  to_jsonb(ARRAY['tg-tourism','on-plateau','campfire','swim-pool']),
  'web_search', 0.90
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
