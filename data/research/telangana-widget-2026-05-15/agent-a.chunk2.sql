
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Pista House',
  'Charminar (Shah Ali Banda Road, original outlet)',
  ARRAY['hyderabadi','sweets','bakery']::text[],
  'sweet_shop',
  'Mutton Haleem (Ramzan GI-tagged)',
  ARRAY['Mutton Haleem','Pista Burfi','Karachi Halwa','Dilkhush']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Founded in 1997 by Mohammed Abdul Majeed (with sons Mohd Abdul Mohsi and Mohd Mohddis Ali) after a textile-business pivot. Haleem received India''s first non-veg Geographical Indication tag on 10 September 2010 — the GI was provoked after a Delhi seller began selling "Pista House" haleem.',
  'Order the Ramzan-only haleem (mid-Feb to mid-Mar window) from the original Shah Ali Banda outlet — chain branches reheat; the original cooks fresh in copper degs from 4pm. Off-season, the pista burfi and dilkhush travel well.',
  'Shah Ali Banda Rd, opposite Madina Hotel, Charminar, Hyderabad 500002',
  'https://maps.google.com/?q=Pista+House+Charminar',
  ARRAY['https://pistahouse.in/pages/about-us','https://www.business-standard.com/article/economy-policy/gi-tag-for-haleem-110091000020_1.html','https://zeezest.com/food/find-hyderabad-s-best-haleem-at-pista-house-zee-zest-401']::text[],
  '2026-05-15',
  1997
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Karachi Bakery (Moazzam Jahi Market original)',
  'Moazzam Jahi Market',
  ARRAY['bakery','sindhi','sweets']::text[],
  'sweet_shop',
  'Fruit Biscuits',
  ARRAY['Fruit Biscuits','Osmania Biscuits','Dil Kush','Plum Cake']::text[],
  '₹',
  '[120,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Founded 1953 by Khanchand Ramnani — a Sindhi-Hindu refugee who fled Karachi during Partition 1947 and named the bakery after his original hometown. The fruit-biscuit recipe Ramnani perfected in the 1960s remains the bakery''s gateway product; it''s now exported to Europe, Americas, Australia, and the Gulf.',
  'Buy directly from the Moazzam Jahi Market parent counter — chain outlets in airports and malls use packaged stock that''s 1-2 weeks old. Boxed fruit biscuits (250g) keep 30 days; ask for "freshly baked" batch only.',
  'Moazzam Jahi Market, Hyderabad 500001',
  'https://maps.google.com/?q=Karachi+Bakery+Moazzam+Jahi+Market',
  ARRAY['https://en.wikipedia.org/wiki/Karachi_Bakery','https://m.thewire.in/article/rights/karachi-bakery-is-the-name-of-a-little-memory-that-survived-partition','https://www.localsamosa.com/business/indian-brands-built-by-partition-refugees-9364338']::text[],
  '2026-05-15',
  1953
);

-- BHONGIR (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Hotel Vivera (Bhongir Bypass)',
  'Bhongir Bypass, Hyderabad-Warangal Highway',
  ARRAY['andhra','telangana','biryani','south-indian']::text[],
  'casual',
  'Chicken Dum Biryani',
  ARRAY['Chicken Dum Biryani','Vegetable Biryani','South Indian Tiffins','Veg Meals']::text[],
  '₹₹',
  '[220,421)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The default highway-halt for Hyderabad → Warangal traffic and Yadadri pilgrim coaches — sits on NH-163 near the toll plaza below Bhongir Fort. Ample car parking distinguishes it from cramped town-centre options.',
  'Stick to chicken biryani or veg meals — Tripadvisor reviews flag mutton biryani as inconsistent. Idli/vada for breakfast (6-10am) is cheaper and cleaner than the lunch crowd.',
  'Survey No 28, Near Yadagiri Gutta Toll Plaza, Bhongir Bypass, Yadadri Bhuvanagiri District, Telangana 508116',
  'https://maps.google.com/?q=Hotel+Vivera+Bhongir+Bypass',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g1544623-d10273760-Reviews-Hotel_Vivera_at_Bhongir_Bypass-Nalgonda_Nalgonda_District_Telangana.html','https://www.justdial.com/Nalgonda/Hotel-Vivera-Near-Yadagiri-Gutta-Survey-No-28-Bhongir/9999P8682-8682-130430141716-R2H8_BZDET']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Yadadri Temple Annadanam (Thadiyaradhana)',
  'Sri Lakshmi Narasimha Swamy Temple complex, Yadagirigutta',
  ARRAY['temple-prasadam','andhra','satvik']::text[],
  'casual',
  'Free temple-prasadam meal (rice, dal, sambar, rasam, curd)',
  ARRAY['Pulihora prasadam','Annadanam meal']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Run by the Telangana State Endowments Devasthanam, the Yadadri Annadanam (a.k.a. Thadiyaradhana) feeds ~500 devotees free of charge daily — funded by donations and the kalyanam-seva revenue pool. After the 2016-2022 temple rebuild, the kitchen capacity was doubled.',
  'Token issued 11am-1pm at the dharma-darshanam queue exit; one token per person. Vegetarian-only, no leather/footwear inside the dining hall. Bring own water bottle in summer.',
  'Sri Lakshmi Narasimha Swamy Devasthanam, Yadagirigutta, Yadadri Bhuvanagiri District 508115',
  'https://maps.google.com/?q=Yadagirigutta+Annadanam',
  ARRAY['https://yadagiriguttatemple.telangana.gov.in/','https://en.wikipedia.org/wiki/Sri_Lakshmi_Narasimha_Swamy_Temple,_Yadagirigutta']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Hotel Sannidhi Emerald Restaurant',
  'Bhongir town, near railway station',
  ARRAY['multi-cuisine','indian','chinese','andhra']::text[],
  'mid_range',
  'Andhra Veg Thali',
  ARRAY['Andhra Veg Thali','Chicken Biryani','Paneer Tikka','South Indian Breakfast']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The closest sit-down multi-cuisine restaurant inside Bhongir town itself (versus the highway-bypass Vivera). Attached to the Sannidhi Emerald hotel, the dining room handles the Yadadri pilgrim overflow + railway-station travellers.',
  'Lunch buffet 12:30-3:30pm is the best-value window. Skip the Chinese; stick to the Andhra meals and biryani that the kitchen specialises in.',
  'Near Bhongir Railway Station, Bhuvanagiri, Yadadri Bhuvanagiri District 508116',
  'https://maps.google.com/?q=Hotel+Sannidhi+Emerald+Bhongir',
  ARRAY['https://www.hotels.com/ho3249745792/hotel-sannidhi-emerald-bhongir-india/','https://timbu.in/hotel/1436882-hotel-sannidhi-emerald']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Haritha Hotel Restaurant (TGTDC Yadagirigutta)',
  'Yadagirigutta town, 8-min walk from Lakshmi Narasimha Temple',
  ARRAY['andhra','south-indian','vegetarian']::text[],
  'casual',
  'South Indian Tiffins + Andhra Meals',
  ARRAY['Idli','Dosa','Veg Meals','Filter Coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'The Telangana State Tourism (TGTDC) Haritha Hotel''s in-house restaurant — open 7am-11pm specifically to serve pilgrim flows. Predictable Andhra-meals format and the only TGTDC-rated kitchen within walking distance of the Yadadri temple.',
  'Best for South Indian breakfast 7-10am. Pilgrim-rush 11am-1pm makes the dining hall chaotic; come either earlier or after 3pm.',
  'Haritha Hotel Yadagirigutta, Near Lakshmi Narasimha Temple, Yadadri Bhuvanagiri District 508115',
  'https://maps.google.com/?q=Haritha+Hotel+Yadagirigutta',
  ARRAY['https://telanganatourism.gov.in/partials/stay/yadadri-bhuvanagiri/haritha-hotel-yadagirigutta.html','https://tourism.telangana.gov.in/hotels/YadagiriguttaHotel']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Surendrapuri Complex Dining (Kuntala Foods)',
  'Inside Surendrapuri Mythological Theme Park, 9 km from Bhongir Fort',
  ARRAY['andhra','vegetarian','telangana']::text[],
  'casual',
  'Veg Meals (Andhra style)',
  ARRAY['Veg Meals','Pongal','Chapati Curry','Curd Rice']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The in-park dining facility inside Surendrapuri runs as a pilgrim-tourist meals counter — pure-veg only (since the park sits at the foothill of the Yadadri temple complex). Standard Andhra meals; useful when you''ve done the 3-km sculpture walk and need a refuel before the Yadagirigutta drive.',
  'Park hours 9am-7pm; meals counter peaks 12-2pm. Carry a refillable water bottle — the in-park kiosks mark up packaged water 2x.',
  'Surendrapuri, Yadagirigutta, Yadadri Bhuvanagiri District 508115',
  'https://maps.google.com/?q=Surendrapuri+Yadagirigutta',
  ARRAY['https://surendrapuri.com/','https://lbb.in/hyderabad/surendrapuri-getaway/']::text[],
  '2026-05-15',
  NULL
);

-- MEDAK (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Sri Geethabhavan',
  'Medak town, near Bus Stand',
  ARRAY['andhra','south-indian','vegetarian']::text[],
  'casual',
  'Andhra Veg Thali',
  ARRAY['Veg Meals','Idli','Dosa','Pesarattu']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The default veg-meals anchor for Medak town — recommended by Telangana State Tourism Development Corporation as the cleanest, most consistent option for Cathedral + Fort day-trippers. Family-run kitchen, no frills.',
  'Closes 9pm — last meals taken 8:30pm. Veg-only; if you want non-veg head to Min Swagath or Hot Bucket Biryani.',
  'Near Medak Bus Stand, Medak town 502110',
  'https://maps.google.com/?q=Sri+Geethabhavan+Medak',
  ARRAY['https://medak.telangana.gov.in/where-to-stay/','https://www.tripadvisor.in/Restaurants-g2285320-Medak_Medak_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Min Swagath Restaurant',
  'Medak town centre',
  ARRAY['andhra','indian','chinese']::text[],
  'casual',
  'Chicken Biryani',
  ARRAY['Chicken Biryani','Hyderabadi Veg Biryani','Andhra Meals','Tandoori Items']::text[],
  '₹₹',
  '[220,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The town''s go-to multi-cuisine joint for non-veg meals — listed on Tripadvisor and OpenTable''s "near Medak Cathedral" indexes. Standard Andhra-Chinese hybrid menu that Medak families default to for weekend lunches.',
  'Chicken biryani is the strongest order; veg biryani uses the same masala blend and is also decent. Skip the Chinese — kitchen overstretches.',
  'Medak town centre, near Cathedral Road, Medak 502110',
  'https://maps.google.com/?q=Min+Swagath+Restaurant+Medak',
  ARRAY['https://www.tripadvisor.in/Restaurants-g2285320-Medak_Medak_District_Telangana.html','https://www.opentable.com/landmark/restaurants-near-medak-cathedral']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Hot Bucket Biryani',
  'Medak town, near Cathedral',
  ARRAY['hyderabadi','biryani','andhra']::text[],
  'casual',
  'Bucket Chicken Biryani',
  ARRAY['Bucket Chicken Biryani','Mutton Biryani','Chicken 65','Mirchi ka Salan']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'The take-away biryani specialist that locals send pilgrims to — small kitchen, single product (bucket biryani), high turnover. Useful for travellers who want to eat back at their hotel rather than queue at sit-down restaurants.',
  'Order ahead by phone (calls listed on Tripadvisor); pickup window 12-3pm and 7-10pm. Single bucket (1.5kg) feeds 3-4 adults.',
  'Cathedral Road, Medak town 502110',
  'https://maps.google.com/?q=Hot+Bucket+Biryani+Medak',
  ARRAY['https://www.opentable.com/landmark/restaurants-near-medak-cathedral','https://www.tripadvisor.in/Restaurants-g12389567-Medak_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Haritha Hotel Restaurant (Edupayala / Medak Fort)',
  'Edupayala temple complex / adjacent to Medak Fort',
  ARRAY['andhra','telangana','vegetarian']::text[],
  'casual',
  'Veg Meals',
  ARRAY['Veg Meals','Telangana-style Pappu','Sambar Rice','Filter Coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Telangana Tourism (TGTDC) Haritha Hotel has a small in-house dining room serving the Edupayala-temple pilgrim flow and Medak Fort hikers. State-rated kitchen; the only reliable veg-meals option after 8pm in Medak district.',
  'Sit on the open-side veranda overlooking the fort walls if you''re at the Medak Fort branch — sunset 5-6:30pm is the best window.',
  'Haritha Hotel, Edupayala / Medak Fort entrance, Medak District 502110',
  'https://maps.google.com/?q=Haritha+Hotel+Medak',
  ARRAY['https://medak.telangana.gov.in/where-to-stay/','https://tourism.telangana.gov.in/destinations/sangareddy']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Medak Cathedral Tea & Snacks Counter',
  'Inside CSI Medak Cathedral compound',
  ARRAY['snacks','tea','vegetarian']::text[],
  'cafe',
  'Tea + Egg Puff',
  ARRAY['Tea','Egg Puff','Biscuits','Samosa']::text[],
  '₹',
  '[40,121)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'A small CSI-run tea-and-snacks counter inside the Cathedral compound — proceeds support diocese welfare. The Cathedral itself was consecrated 25 December 1924 after a 10-year build (started 1914) by Methodist Bishop Charles Walker Posnett to provide work for famine-hit locals.',
  'Open during Cathedral visiting hours; closed during Sunday-morning services (8-11am). Photographs of the Italian-mason-laid mosaic floor are best 10:30am-noon when sunlight hits the stained glass.',
  'CSI Medak Cathedral, Ghusnabad area, Medak 502110',
  'https://maps.google.com/?q=Medak+Cathedral',
  ARRAY['https://en.wikipedia.org/wiki/Medak_Cathedral','https://www.csimedakdiocese.org/cathedral-history.php','https://mattersindia.com/2015/03/medak-cathedral-built-to-feed-the-poor-but-revered-by-all/']::text[],
  '2026-05-15',
  1924
);
