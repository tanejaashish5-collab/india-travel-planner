-- Agent D — MP + Odisha widget topup (8 dests, +14 eats)
-- A-flips: bandhavgarh 4→5, bhimbetka 2→5, kanha 4→5, pachmarhi 4→5, sanchi 3→5
--          deomali 2→5, nrusinghanath-harishankar 4→5, simlipal 3→5 (ALL 8 flip A)

BEGIN;

-- 1. bandhavgarh +1
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'bandhavgarh',
  'Aangan',
  'Tala village, near Tala Gate',
  ARRAY['italian','american','indian','multi-cuisine'],
  'fine_dining',
  ARRAY['Paneer Chilli','Vegetable Biryani','Chicken tandoori','wood-fired pizza','outdoor barbecue platter'],
  '₹₹₹₹',
  int4range(1200, 2001),
  'mixed',
  'recommended',
  NULL,
  'Aangan is the only Tala restaurant that explicitly serves walk-in non-resident diners, separate from the resort-locked dining at Mahua Kothi, Kings Lodge, Syna and Tala Camp. Italian and American mains alongside North-Indian standards. 5.0/5 across 114 Tripadvisor reviews — top-ranked Tala restaurant. Outdoor seating around bonfire, full bar with cocktails (Devi runs the bar).',
  'Book the night-before by phone — the kitchen is small and resorts call ahead for guest overflow. Ask for the outdoor patio table over the indoor hall. Skip the Continental specials and stick to Paneer Chilli + tandoori platter; reviewers consistently call those out.',
  'Tala Village, Bandhavgarh Tiger Reserve, Umaria 484661',
  'https://maps.google.com/?q=Aangan+Tala+Bandhavgarh',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2424471-d25181858-Reviews-Aangan-Tala_Bandhavgarh_National_Park_Umaria_District_Madhya_Pradesh.html'],
  false,
  true
);

-- 2. bhimbetka +3 — Bhopal 45km surrogate base
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'bhimbetka',
  'Manohar Dairy & Restaurant (Hamidia Road, Bhopal — 45km base)',
  'Hamidia Road, Old City Bhopal',
  ARRAY['indian','street-food','fast-food','sweets'],
  'casual',
  ARRAY['Chole Bhature','Pani Puri','Masala Dosa','Rasmalai','Sohan Halwa'],
  '₹₹',
  int4range(150, 401),
  'pure-veg',
  'walk-in',
  1970,
  'Founded 15 April 1970 by Shyam Sundar Harwani as a dairy-counter, Manohar now ranks #9 of 716 Bhopal restaurants on Tripadvisor (4.3/5, 655 reviews, most recent 2025) and holds a Travellers Choice award. Stop here on the Bhopal → Bhimbetka NH-46 leg — the caves have no food vendors inside, and Manohar opens 07:30, perfect for pre-cave breakfast.',
  'Hamidia Road branch is the original and has the bakery counter that the MP Nagar branch lacks; pick up sohan halwa for the cave trek. Pani puri counter is downstairs — sit-down thali is upstairs. Open till 23:00 if you return late from Bhimbetka.',
  '6, Hamidia Road, Bhopal 462001',
  'https://maps.google.com/?q=23.26423,77.40875',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g319726-d1191156-Reviews-Manohar_Dairy_Restaurant_Hamidia_Road-Bhopal_Bhopal_District_Madhya_Pradesh.html','https://www.manohardairy.com/about-6'],
  true,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'bhimbetka',
  'Bapu Ki Kutia (Bhopal — 45km base)',
  'New Market, Roshanpura, Bhopal',
  ARRAY['indian','jain','vegetarian','asian'],
  'mid_range',
  ARRAY['Karare Bhindi','Jain Thali','Dal Makhani','Malai Kofta','Veg Kothey'],
  '₹₹',
  int4range(300, 601),
  'pure-veg',
  'recommended',
  1964,
  'Established 1964 by Shyamdas Sujwani under a still-standing palm tree — one of Bhopal''s oldest pure-veg fine-dines, ranked #17 of 716 on Tripadvisor (4.0/5, 243 reviews) and a Travellers Choice recipient. The Jain thali is the standout (no onion, no garlic, satvik) — useful for Bhimbetka day-trippers who want a heavier midday meal before the 45-min cave walk.',
  'Avoid 13:00–14:30 lunch rush — the New Market lot fills fast and parking is congested. Karare Bhindi is the dish reviewers single out across years; pair with veg kothey for the table-share order.',
  'New Market, Roshanpura, Bhopal 462003',
  'https://maps.google.com/?q=Bapu+Ki+Kutia+New+Market+Bhopal',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g319726-d4234250-Reviews-Bapu_Ki_Kutia-Bhopal_Bhopal_District_Madhya_Pradesh.html','https://www.bapukikutia.in/'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'bhimbetka',
  'Indian Coffee House (New Market, Bhopal — 45km base)',
  'New Market Road, TT Nagar, Bhopal',
  ARRAY['south-indian','coffee','indian','cafe'],
  'cafe',
  ARRAY['Filter Coffee','Rava Masala Dosa','Mutton Cutlet','Keema Dosa','Onion Uttapam'],
  '₹',
  int4range(120, 301),
  'mixed',
  'walk-in',
  NULL,
  'Worker-cooperative branch of the all-India Indian Coffee House network, one of Bhopals last surviving mid-century coffee parlours — turbaned bearers in white, wooden chairs, paper menus. Ranked #15 of 716 Bhopal restaurants (3.9/5, 202 Tripadvisor reviews, most recent Dec 2023). The largest of the three Bhopal ICH outlets; filter-coffee + dosa is the canonical order before the Bhimbetka or Sanchi day-trip.',
  'Go before 09:30 if you want the rava masala dosa fresh from the first batch; later in the day batter sits and texture suffers. Pay at the counter on the way out — bearers do not carry change.',
  'New Market Road, TT Nagar, Bhopal 462022',
  'https://maps.google.com/?q=Indian+Coffee+House+New+Market+Bhopal',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g319726-d1191152-Reviews-Indian_Coffee_House-Bhopal_Bhopal_District_Madhya_Pradesh.html'],
  false,
  true
);

-- 3. kanha +1
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'kanha',
  'Banjar Restaurant (Krishna Jungle Resort by BeyondStay)',
  'Khatia, Manegaon F.V., 1.5km from Khatia Gate',
  ARRAY['indian','central-indian','multi-cuisine','tribal'],
  'mid_range',
  ARRAY['Mahua-infused dal','Bhutte ki kees','Local kodo-millet thali','Tandoori platter','Kheer'],
  '₹₹',
  int4range(500, 1001),
  'mixed',
  'recommended',
  NULL,
  'Sit-down restaurant at Krishna Jungle Resort with hand-painted tiger murals — the kitchen sources milk, salad and most vegetables from tribal villages around Manegaon, so the Central-Indian items (mahua dal, kodo millet) actually trace to the produce around the park, unlike the Taj/Singinawa kitchens that fly ingredients in from Mumbai/Delhi. Reviewers note non-resident dining was accommodated when booked in advance.',
  'Call before 11:00 the same day to confirm a lunch table — the resort prioritises in-house guests, and the dining room only seats ~30. Ask for the millet thali ahead of the buffet, as it is prepared to order. Khatia-gate side, walkable from village dhabas if you are comparing.',
  'Manegaon F.V., near Khatia Gate, Mandla 481111',
  'https://maps.google.com/?q=Krishna+Jungle+Resort+Khatia+Kanha',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g26871771-d624664-Reviews-Krishna_Jungle_Resort_By_Beyond_Stay_Kanha-Manegaon_F_V_Mandla_District_Madhya_Prades.html','https://www.kanha-national-park.com/krishna-jungle-resort-kanha.html'],
  false,
  true
);

-- 4. pachmarhi +1
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'pachmarhi',
  'Rasoi Dhawa',
  'Near Company Garden, Cantonment',
  ARRAY['indian','north-indian','tandoor','non-vegetarian','asian'],
  'mid_range',
  ARRAY['Paneer Tikka','Tandoori Chicken','Chicken Tikka','Vegetable Hyderabadi Biryani','Chicken Masala'],
  '₹₹',
  int4range(350, 701),
  'mixed',
  'walk-in',
  NULL,
  'Ranked #2 of 20 Pachmarhi restaurants on Tripadvisor (3.4/5, 39 reviews, most recent June 2024). Open-air dhaba-style seating around an evening bonfire — one of the very few Pachmarhi standalones serving good tandoori non-veg (the cantonment town leans heavily on pure-veg MPSTDC dining like Champak Bungalow and Glenview). Phone +91 94253 67392.',
  'Order tandoori dishes early — they go off the coal by 22:00. Pricing is high for what you get, but the non-veg/bonfire combination has no peer inside Pachmarhi cantonment limits. Walk-in works; reservations only needed during Dec-Jan peak.',
  'Near Company Garden, Pachmarhi 461881',
  'https://maps.google.com/?q=Rasoi+Dhawa+Pachmarhi',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g503700-d7595733-Reviews-Rasoi_Dhawa-Pachmarhi_Hoshangabad_District_Madhya_Pradesh.html'],
  false,
  true
);

-- 5. sanchi +2
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'sanchi',
  'New Jaiswal Lodge Restaurant',
  'Main Road, Sanchi village',
  ARRAY['indian','north-indian','vegetarian'],
  'casual',
  ARRAY['Aloo Paratha','Dal Tadka','Veg Thali','Paneer butter masala','Mixed pakora'],
  '₹',
  int4range(120, 301),
  'pure-veg',
  'walk-in',
  NULL,
  'Ranked #2 of 4 standalone Sanchi restaurants on Tripadvisor (3.9/5, 8 reviews) — Sanchi village population is under 8,000 and the dining scene is genuinely thin outside MPT-managed places. New Jaiswal Lodge is one of two non-MPT standalones (Jain Shree Hotel being the other) and is on the main road between the bus stand and the stupa-hill ticket counter — practical mid-morning halt for the UNESCO complex visit.',
  'Pure-veg only, in line with the Buddhist site context. Ask the rice + dal + sabzi thali — they refuse to scale the spice for non-locals so order one mild and one regular plate to share. The Jain Shree Hotel next door has near-identical food if Jaiswal is full.',
  'Main Road, Sanchi 464661, Raisen district',
  'https://maps.google.com/?q=New+Jaiswal+Lodge+Sanchi',
  ARRAY['https://www.tripadvisor.in/Restaurants-g776953-Sanchi_Raisen_District_Madhya_Pradesh.html'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'sanchi',
  'Hotel Sanchi Queen Restaurant',
  'Stupa Road, opposite Sanchi Post Office',
  ARRAY['indian','north-indian','chinese'],
  'casual',
  ARRAY['Veg thali','Paneer dishes','Indo-Chinese noodles','Dal fry','Roti basket'],
  '₹₹',
  int4range(200, 451),
  'veg-friendly',
  'walk-in',
  NULL,
  'Small 9-room hotel restaurant on Stupa Road, five minutes walk from the Great Stupa entrance — closer to the monument than any MPT property except Gateway Retreat. Tripadvisor traveller praised food as really tasty and very well priced (Mar 2023). Useful when MPT Gateway Retreat dining hall is closed between meal services (typically 15:00–19:00) — this kitchen runs all-day.',
  'Walk-ins welcome even if not staying — the dining room is on ground floor with street entry. Skip the Chinese and stick to the dal-roti-sabzi staples; the in-house tawa is consistent. Pay cash — card machine is unreliable per the 2023 review.',
  'Bhopal–Vidisha Highway, near Sanchi Post Office, Sanchi 464661',
  'https://maps.google.com/?q=Hotel+Sanchi+Queen+Sanchi',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g776953-d24086471-Reviews-Hotel_Sanchi_Queen-Sanchi_Raisen_District_Madhya_Pradesh.html'],
  false,
  true
);

-- 6. deomali +3
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'deomali',
  'Deomali Desia Eco Stays — Restaurant',
  'Borabandha, Pottangi block, foot of Deomali peak',
  ARRAY['odia','tribal','indian','organic'],
  'mid_range',
  ARRAY['Pakhala bhata','Mandia (ragi) pej','Tribal mutton with bamboo shoot','Mandia roti','Mahua-flavoured chutney'],
  '₹₹',
  int4range(350, 701),
  'mixed',
  'required',
  NULL,
  'Restaurant inside the Desia Eco Stays bamboo-cottage property at the foot of Deomali (Odishas highest peak at 1672m), Borabandha hamlet in Pottangi block. 4.2/5 on Tripadvisor (139 ratings) — kitchen serves Koraput-tribal dishes (mandia pej, pakhala) sourced from the surrounding villages, and runs cultural-evening events with Bonda and Gadaba villagers. Closest review-verified dine option to the peak.',
  'Pre-order lunch the night before — only 8 cottages and the kitchen scales for residents, so non-residents must call ahead via +91 owner contact on desiadeomali.com. The mandia (ragi) pej is the tribal-staple ask, not on the printed menu. Pottangi block town is 10km if Desia is full.',
  'Borabandha village, Pottangi, Koraput 764038',
  'https://maps.google.com/?q=Deomali+Desia+Eco+Stays+Borabandha',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g27478409-d27475446-Reviews-Deomali_Desia_Eco_Stays-Borabandha_Koraput_District_Odisha.html','https://www.desiadeomali.com/'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'deomali',
  'Hotel CNC Restaurant (Semiliguda, NH-26)',
  'NH-26 highway, Semiliguda town',
  ARRAY['odia','indian','chinese','non-vegetarian'],
  'casual',
  ARRAY['Odia rice plate','Chicken curry','Mutton fry','Veg thali','Egg curry'],
  '₹',
  int4range(150, 351),
  'mixed',
  'walk-in',
  NULL,
  'Highway hotel-restaurant on NH-26 in Semiliguda — the only proper sit-down dining between Koraput town and the Deomali peak turn-off. Outlook Traveller and regional travel write-ups specifically cite wonderful food at a restaurant named CNC as the recommended Semiliguda halt. Both veg and non-veg, bar-attached, room service for through-passers. Listed across Justdial and Top10Place for the Similiguda area.',
  'Time it for the late-lunch slot 13:30–15:00 returning from the peak — the Odia rice plate (multiple subzis + dal + rice + chutney) is the value order. Skip the Chinese — kitchen is built for rice meals. NH-26 frontage means truckers fill it by 19:00 — get there earlier if you want a clean table.',
  'NH-26, Semiliguda, Koraput 764036',
  'https://maps.google.com/?q=Hotel+CNC+Semiliguda',
  ARRAY['https://www.hotelcnc.com/contact-us','https://www.outlooktraveller.com/destinations/india/into-odishas-tribal-soul-why-koraput-belongs-on-your-travel-list'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'deomali',
  'Onkadelli Tribal Haat (Thursday market, Odisha-AP border)',
  'Onkadelli village, Odisha-Andhra border, 90km from Koraput',
  ARRAY['tribal','odia','foodway','street-food'],
  'street_food',
  ARRAY['Salap (palm-toddy in gourd pipe)','Mahua liquor','Roasted maize','Wild forest tubers','Dry fish & millet'],
  '₹',
  int4range(50, 201),
  'mixed',
  'walk-in',
  NULL,
  'Weekly Thursday haat at Onkadelli on the Odisha-Andhra border (90km from Koraput, on the Machkund hydroelectric corridor) — the Bonda, Didayai, Gadaba, Poraja and Mali tribes converge here at dawn. The markets salap (fermented palm sap, drunk through a dried-gourd pipe) is the named foodway entry, sold alongside mahua liquor, roasted maize, dry fish, wild tubers and rice. Not a restaurant — a market with food stalls, but the most documented tribal foodway accessible from Deomali.',
  'Arrive by 09:30 — Bonda women have walked down from the hills since dawn and the market thins by noon. Carry small change (₹10/₹20 notes). Photography is contested — most tribes object; ask first or just buy and eat. Pair with a Desia Eco Stays or Hotel CNC return-lunch.',
  'Onkadelli village, Pottangi tehsil, Koraput 764036',
  'https://maps.google.com/?q=Onkadelli+Haat+Koraput',
  ARRAY['https://koraput.nic.in/tourist-place/onukadelli/','https://maverickbird.com/india/onkadeli-tribal-market/','https://www.outlooktraveller.com/destinations/india/into-odishas-tribal-soul-why-koraput-belongs-on-your-travel-list'],
  true,
  true
);

-- 7. nrusinghanath-harishankar +1
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'nrusinghanath-harishankar',
  'Padampur Main Road Pilgrim Dhabas (Khaliapali Bus Stand strip)',
  'Padampur town, Khaliapali bus stand area',
  ARRAY['odia','indian','vegetarian','pilgrim-food'],
  'casual',
  ARRAY['Pakhala bhata','Dalma','Aloo-poshto','Mutton curry','Odia rice thali'],
  '₹',
  int4range(80, 251),
  'mixed',
  'walk-in',
  NULL,
  'Padampur is the road-and-bus-corridor hub between Bargarh (50km E) and the Paikmal/Nrusinghanath temple (32km W) — most OSRTC services from Bargarh to Paikmal hold at Khaliapali bus stand for 20–30 minutes, and a strip of small dhabas (Maa Annpurna Restaurant on Main Road being the only Tripadvisor-listed one at pincode 768036) feeds the through-pilgrim traffic. Padampur is a sub-divisional HQ, distinct from Paikmal block — adds a real pre-trek halt option separate from the existing Paikmal dhabas row.',
  'Most kitchens run rice + dal + 2 sabzi thali at ₹80–120, paid at counter. Skip mutton — too inconsistent. Ideal stop on the morning Bargarh→Nrusinghanath leg to load up before the 16km Gandhamardan hill trek to Harishankar. Padampur loses food options after 21:00 — return-leg pilgrims should eat by 19:30.',
  'Main Road / Khaliapali Bus Stand area, Padampur 768036, Bargarh district',
  'https://maps.google.com/?q=Padampur+Bus+Stand+Bargarh',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g8532849-d8528201-Reviews-Maa_Annpurna_Restaurant-Padampur_Bargarh_District_Odisha.html','https://www.mappls.com/place-bus+stand-khaliapali-padampur-district+bargarh-burden+ps-bargarh+district-odisha-768036-EYBJNS','https://en.wikipedia.org/wiki/Paikmal'],
  false,
  true
);

-- 8. simlipal +2
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'simlipal',
  'Suruchi Restaurant (Hotel Ambika, Baripada — 75km base)',
  'Roxy Cinema Hall Road, Baripada town centre',
  ARRAY['odia','indian','chinese','seafood','non-vegetarian'],
  'mid_range',
  ARRAY['Mayurbhanj-style mutton curry','Chingudi (prawn) jhol','Chicken biryani','Veg thali','Pakhala bhata'],
  '₹₹',
  int4range(300, 651),
  'mixed',
  'walk-in',
  NULL,
  'In-house Suruchi restaurant at Hotel Ambika, ranked #1 of 2 small hotels in Baripada on Tripadvisor (3.6/5, 17 reviews, most recent Dec 2024). One reviewer explicitly notes visiting only the restaurant — walk-in is accepted. Indian + Chinese + seafood, central location near Roxy Cinema and the bus stand, used by Simlipal-bound travellers as the night-before or return-leg sit-down meal (Baripada is the standard southern base for Pithabata-gate entry, 22km from the park).',
  'Order Mayurbhanj-mutton-curry (the kitchen leans into the regional preparation, not the generic Kolkata-style). Ask for the bar lounge — quieter than the main hall. Closed-end of the menu Chinese is mediocre, stick to Odia/North-Indian. Hotel Durgas Shakti Restaurant 5 min away is a backup.',
  'Roxy Cinema Hall Road, Baripada 757001, Mayurbhanj district',
  'https://maps.google.com/?q=Hotel+Ambika+Baripada',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g2287521-d2108464-Reviews-Hotel_Ambika-Baripada_Mayurbhanj_District_Odisha.html','https://www.tripadvisor.com/Hotel_Review-g2287521-d26640028-Reviews-Ambika_Hotel_And_Restaurant-Baripada_Mayurbhanj_District_Odisha.html'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'simlipal',
  'Jashipur NH-49 Highway Dhabas (Bisoi-end strip)',
  'Jashipur town, NH-49 Kolkata-Mumbai highway, Bisoi-end',
  ARRAY['odia','indian','vegetarian','dhaba','highway-food'],
  'casual',
  ARRAY['Veg Odia thali','Dal-rice plate','Aloo-bhaja','Roti-sabzi','Sweet curd-rice'],
  '₹',
  int4range(80, 251),
  'mixed',
  'walk-in',
  NULL,
  'Jashipur is one of the two Simlipal entry-points (the other being Pithabata) and sits on NH-49, the Kolkata-Mumbai main highway. A cluster of small roadside dhabas runs along the Bisoi-end of town — one vegetarian dhaba is specifically called out by trip-reports as popular among locals. The strip is the only practical lunch option for through-travellers entering Simlipal from the western Jashipur gate (vs. Pithabata-gate travellers who eat in Baripada).',
  'Pick the dhaba with the most parked Odisha-registered trucks — best indicator of freshness in low-tourist towns. Veg Odia thali (rice + dal + 2 subzi + chutney + papad) is the ₹80–120 fixed plate. Jashipur has only a few budget guesthouses and limited food — eat before the 18:00 gate closure, not after.',
  'NH-49, Bisoi-end, Jashipur 757091, Mayurbhanj district',
  'https://maps.google.com/?q=Jashipur+NH-49+dhaba',
  ARRAY['https://en.wikipedia.org/wiki/Jashipur','https://www.tripadvisor.in/ShowTopic-g297660-i9181-k7005136-Orissa_trip-Odisha.html','https://mytravelframes.com/road-trip-in-mayurbhanj-and-balasore-districts-in-odisha/'],
  false,
  true
);

COMMIT;
