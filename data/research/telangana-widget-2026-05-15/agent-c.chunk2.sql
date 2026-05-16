
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'nagarjuna-konda',
  'Hotel Siddartha',
  'Buddhavanam Hill Colony, Nandikonda',
  ARRAY['hyderabadi','biryani','north-indian','south-indian']::text[],
  'casual',
  'Hyderabadi mutton biryani',
  ARRAY['Hyderabadi mutton biryani','Chicken 65','Andhra meals','Less-spicy thali (south-Indian)']::text[],
  '₹₹',
  '[180,381)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Six-room budget hotel-restaurant in Buddhavanam Hill Colony, walking distance from the dam approach. Famous locally for biryani — the in-house cafe gets repeat tour-bus business for less-oily, less-spicy fare than the dhabas.',
  'Walk-in is fine; call 09490643900 for biryani-batch timing — they cook in 30-portion handis. Cash + UPI.',
  'Buddhavanam Hill Colony, Nagarjuna Sagar 508202',
  'https://maps.google.com/?q=Hotel+Siddartha+Nagarjuna+Sagar',
  ARRAY['https://www.makemytrip.com/tripideas/attractions/hotel-siddartha','https://www.makemytrip.com/tripideas/foodie-hotspots-nagarjuna-sagar']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'nagarjuna-konda',
  'Park Inn Restaurant',
  'Hill Colony, Nagarjuna Sagar',
  ARRAY['multi-cuisine','south-indian','north-indian']::text[],
  'casual',
  'Andhra thali',
  ARRAY['Andhra-style fish curry','Chicken biryani','Veg meals','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Workhorse multi-cuisine stop in Hill Colony — one of the few sit-down options outside the Haritha campus. Caters to Hyderabad-Nagarjunasagar weekend traffic that doesn''t want TGTDC institutional dining.',
  'Park Inn''s parking lot fills first on weekends — head over before 1pm or after 2:30pm. Fish curry is the local-non-veg pick.',
  'Hill Colony, Nagarjuna Sagar 508202',
  'https://maps.google.com/?q=Park+Inn+Nagarjuna+Sagar+Hill+Colony',
  ARRAY['https://www.google.com/travel/hotels/entity/CgoIy-nbocmCiNJsEAE','https://www.makemytrip.com/tripideas/foodie-hotspots-nagarjuna-sagar']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'nagarjuna-konda',
  'Punnami Restaurant (AP Tourism, Anupu side)',
  'Anupu, Nagarjunasagar (AP side of dam)',
  ARRAY['andhra','south-indian','rayalaseema']::text[],
  'casual',
  'Rayalaseema-style chicken pulao',
  ARRAY['Andhra meals','Chicken pulao','Gongura mutton','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'AP Tourism (APTDC)''s Punnami brand restaurant on the AP-side of the Nagarjuna Sagar dam at Anupu — handy lunch stop on the Anupu amphitheatre + dam-pylon combined day-trip. Catches the AP-side ferry-return crowd.',
  'AP-side service can be slower; order before walking the amphitheatre, not after. Spicy by default — ask for "less spicy" if not a Rayalaseema-cuisine veteran.',
  'AP Tourism Complex, Anupu, Nagarjuna Sagar',
  'https://maps.google.com/?q=AP+Tourism+Anupu+Nagarjuna+Sagar',
  ARRAY['https://appunnamitourism.com/','https://tourism.ap.gov.in/hotellist?cityCode=134&unitCode=10418&adults=1&childs=0']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'nagarjuna-konda',
  'Ethipothala Falls Food Stalls',
  'Ethipothala Falls parking area, 11 km south of dam',
  ARRAY['street-food','andhra']::text[],
  'street_food',
  'Mirapakaya bajji (chilli fritters)',
  ARRAY['Mirapakaya bajji','Punugulu','Hot tea','Corn cob (post-monsoon)']::text[],
  '₹',
  '[40,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'A rural cluster of stalls at the Ethipothala viewpoint that serves the same fritter-and-tea menu locals expect at any Krishna-river waterfall. Most filling-up traveller stop on the dam-Ethipothala loop.',
  'Monsoon (Aug–Sep) the corn-cob lady camps near the parking-bay entrance — that''s the freshest produce. Avoid pre-cooked vada once tour bus arrives.',
  'Ethipothala Falls viewpoint, near Macherla–Nagarjuna Sagar road',
  'https://maps.google.com/?q=Ethipothala+Falls+Nagarjuna+Sagar',
  ARRAY['https://www.trawell.in/telangana/nagarjuna-sagar/ethipothala-falls','https://www.tripadvisor.in/Attraction_Review-g1177884-d3731739-Reviews-Ethipothala_Falls-Nagarjuna_Sagar_Telangana.html']::text[],
  '2026-05-15'
);

-- bhadrachalam eateries
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhadrachalam',
  'Madhuvan Family Restaurant',
  'Ashok Nagar Colony, Bhadrachalam',
  ARRAY['south-indian','chinese','north-indian']::text[],
  'mid_range',
  'Bhadrachalam veg thali',
  ARRAY['Veg thali (banana-leaf)','Andhra meals','Paneer butter masala','Chinese starters']::text[],
  '₹₹',
  '[220,421)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Running since 1989 — the longest-standing family-restaurant in Bhadrachalam, scaled with the pilgrim boom. AC family-meal hall is where the temple-trust priests and out-of-town darshan groups sit down after morning rituals.',
  'Lunch rush 1–3pm post-darshan; aim 12:30 or 4pm. Banana-leaf veg thali is the local order — don''t default to chinese starters.',
  'Ashok Nagar Colony, Bhadrachalam, Telangana 507111',
  'https://maps.google.com/?q=Madhuvan+Family+Restaurant+Bhadrachalam',
  ARRAY['https://www.makemytrip.com/tripideas/attractions/madhuvan-family-restaurant','https://yappe.in/andhra-pradesh/bhadrachalam/madhuvan-family-restaurant/2122477']::text[],
  '2026-05-15',
  1989
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'bhadrachalam',
  'MNR Family Dhaba',
  'Charla Road, Bhadrachalam (opp Andhra Chicken Centers)',
  ARRAY['north-indian','tandoor','andhra','chinese']::text[],
  'casual',
  'Tandoori chicken',
  ARRAY['Tandoori chicken','Chicken biryani','Butter naan','Veg curry combos']::text[],
  '₹₹',
  '[220,421)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Charla-Road dhaba that''s become the go-to non-veg + tandoor stop for the Bhadrachalam–Charla–Konta route truckers and pilgrims who break temple-town rules. Listed as one of the area''s "greatest dhaba" picks.',
  'Charla-Road is the non-veg-friendly stretch (the temple-precinct streets are pure-veg). Tandoor heats up ~12:30pm and ~7:30pm.',
  'Charla Road, Bhadrachalam 507111',
  'https://maps.google.com/?q=MNR+Family+Dhaba+Bhadrachalam',
  ARRAY['https://www.justdial.com/Bhadrachalam/Mnr-Family-Dhaba-Opposite-Andra-Chicken-Centers-Complex-Bhadrachalam-Ho/9999P8743-8743-190912112024-Q1X4_BZDET','https://www.holidify.com/places/bhadrachalam/restaurants-places-to-eat-local-cuisine.html']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'bhadrachalam',
  'Annamaya Kitchen',
  'Indira Nagar, Bhadrachalam',
  ARRAY['south-indian','andhra','satvik-veg']::text[],
  'casual',
  'Pure-veg satvik thali',
  ARRAY['Satvik thali','Pongal','Idli sambar','Filter coffee']::text[],
  '₹₹',
  '[180,361)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  '100%-vegetarian temple-town hotel that opens at 6am — the realistic option for pilgrim families coming out of pre-dawn suprabhata darshan. Daily 6am–10pm; banana-leaf hearty thalis throughout the day.',
  'Pre-darshan (5:30–7am) breakfast queue is real — order in advance via phone if a temple group. Thali quantities are generous for one.',
  'Indira Nagar, Bhadrachalam 507111',
  'https://maps.google.com/?q=Annamaya+Kitchen+Bhadrachalam',
  ARRAY['https://annamayakitchen.com/','https://www.holidify.com/places/bhadrachalam/restaurants-places-to-eat-local-cuisine.html']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'bhadrachalam',
  'Sri Raghavendra Udipi Tiffins',
  'Temple Road area, Bhadrachalam',
  ARRAY['south-indian','udipi','tiffin']::text[],
  'casual',
  'Set dosa with coconut chutney',
  ARRAY['Set dosa','Idli vada','Mysore bonda','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Udipi-style tiffin spot near the temple road — the workhorse breakfast option for darshan-goers who want quick set-dosa-and-out, not a full thali. Listed on Tripadvisor as a Bhadrachalam veg-tiffin staple.',
  'Tiffin-shift menu 6–11am only; lunch switches to meals. Set-dosa-with-chutney-trio is the order locals stand in line for.',
  'Near Sri Sita Rama Temple, Bhadrachalam 507111',
  'https://maps.google.com/?q=Sri+Raghavendra+Udipi+Bhadrachalam',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2288622-d13366241-Reviews-Sri_Raghavendra_Udipi_Tiffins-Bhadrachalam_Bhadradri_Kothagudem_District_Telang.html']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'bhadrachalam',
  'Athidhi Hotel Restaurant',
  'Bhadrachalam main bazaar',
  ARRAY['multi-cuisine','south-indian','north-indian']::text[],
  'mid_range',
  'Chef-prepared Andhra non-veg thali',
  ARRAY['Andhra non-veg thali','Mutton curry','Chicken biryani','Pulao']::text[],
  '₹₹₹',
  '[320,621)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Higher-priced sit-down hotel-restaurant — described in regional food guides as the "delicious-meals-at-hefty-price" spot in town. Quality of cooking and service materially better than the budget dhabas; preferred by Hyderabad-based pilgrim families.',
  'Reservation suggested for festival weekends (Sri Rama Navami, Vaikuntha Ekadashi) — pilgrim load triples. AC family hall is set back from main hall noise.',
  'Bhadrachalam main road, Bhadrachalam 507111',
  'https://maps.google.com/?q=Athidhi+Hotel+Bhadrachalam',
  ARRAY['https://www.holidify.com/places/bhadrachalam/restaurants-places-to-eat-local-cuisine.html','https://snapnews.in/best-restaurants-in-bhadrachalam/']::text[],
  '2026-05-15'
);

-- alampur eateries
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'alampur',
  'Haritha Hotel Alampur Dining Hall',
  'Near Jogulamba Temple bridge, Alampur',
  ARRAY['south-indian','andhra']::text[],
  'casual',
  'Andhra meals (limited menu)',
  ARRAY['Veg meals','Idli sambar','Curd rice','Filter coffee']::text[],
  '₹',
  '[140,281)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'TGTDC''s in-house dining at Haritha Alampur — the only TG-run sit-down within walking distance of the Nava-Brahma temple cluster. Limited menu, advance-order culture; most pilgrim coaches break here on the Hyderabad-Bengaluru highway.',
  'Reviewers consistently note the restaurant is "not always functioning" — call +91 9705392100 ahead. If closed, fall back on the Gadwal-town dhabas 26 km north.',
  'Near Jogulamba Temple Bridge, Alampur, Jogulamba Gadwal 509152',
  'https://maps.google.com/?q=Haritha+Hotel+Alampur',
  ARRAY['https://telanganatourism.gov.in/partials/stay/jogulamba-gadwal/haritha-hotel-alampur.html','https://www.justdial.com/Alampur/Telangana-Tourism-Haritha-Hotel-Near-Jogulamba-Temple-Bridge-Gadwal-Mahboobnagar-District-Alampur-Ho/9999P8502-8502-150212123210-Z5S4_BZDET']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'alampur',
  'Jogulamba Temple Annadanam',
  'Inside Jogulamba Temple compound, Alampur',
  ARRAY['andhra','satvik-veg','annadanam']::text[],
  'casual',
  'Temple prasadam thali',
  ARRAY['Prasadam thali','Pulihora','Daddojanam','Chakrapongal']::text[],
  '₹',
  '[0,51)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'modest',
  'Free annadanam (community lunch) at the Shakti-Peetha — a centuries-old temple-trust practice rooted in the goddess''s post-1390 revival here. The realistic mid-day meal option for darshan-day visitors who don''t want to drive 26 km to Gadwal.',
  'Annadanam window 12:30–2:30pm; donate ₹50–100 in the hundi if you eat. Temple dress code (no shorts, no leather belts).',
  'Jogulamba Temple, Alampur, Jogulamba Gadwal 509152',
  'https://maps.google.com/?q=Jogulamba+Temple+Alampur',
  ARRAY['https://gadwal.telangana.gov.in/tourist-place/jogulamba-devi/','https://srijogulamba.com/about-us']::text[],
  '2026-05-15'
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'alampur',
  'Haritha Hotel Gadwal Restaurant',
  'Gadwal town, Jogulamba Gadwal district HQ (26 km north of Alampur)',
  ARRAY['south-indian','andhra','telangana']::text[],
  'casual',
  'Gadwal-style chicken pulao',
  ARRAY['Chicken pulao','Andhra meals','Veg thali','Idli vada (breakfast)']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'TGTDC Gadwal''s in-house restaurant — fallback for pilgrims when Alampur''s Haritha isn''t cooking. Gadwal town (the Jogulamba Gadwal district HQ) is the realistic full-meal option within 30 km of Alampur.',
  'NH-44/NH-167 trucker stop combined with TG Tourism overnight crowd — busiest 8–10pm. Pulao quality jumps if you ask "freshly made" instead of buffet.',
  'Gadwal town, Jogulamba Gadwal 509125',
  'https://maps.google.com/?q=Haritha+Gadwal+Hotel',
  ARRAY['https://hotels.xploreall.com/room/gadwal-haritha-hotel/','https://telanganatourismhotels.in/']::text[],
  '2026-05-15'
);

-- adilabad eateries
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'adilabad',
  'Hotel Surabhi Grand Family Restaurant',
  'Opp Andhra Bank, Netaji Chowk, Adilabad town',
  ARRAY['south-indian','chinese','multi-cuisine']::text[],
  'casual',
  'Andhra mutton thali',
  ARRAY['Andhra mutton thali','Chicken biryani','Veg meals','South Indian breakfast']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Adilabad-town family restaurant at the central Netaji Chowk — JustDial-rated 3.9/5 and the most reliable sit-down option for travellers on the Hyderabad–Nagpur NH-44 route who break in Adilabad town for a meal.',
  'Family-hall AC section quieter than ground-floor — request when entering. Mutton thali Sundays only; chicken biryani daily.',
  'Opposite Andhra Bank, Netaji Chowk, Adilabad 504001',
  'https://maps.google.com/?q=Hotel+Surabhi+Grand+Adilabad',
  ARRAY['https://www.justdial.com/Adilabad/Hotel-Surabhi-Grand-Family-Restaurant-Opposite-Andra-Bank-Netaji-Chowk/9999P8732-8732-100827124502-E3H8_BZDET/menu','https://www.tripadvisor.in/Restaurants-g2282894-Adilabad_Adilabad_District_Telangana.html']::text[],
  '2026-05-15'
);
