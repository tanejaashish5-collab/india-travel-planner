-- Agent C — Kerala batch-2 widget topup (6 dests, +11 eats)
-- A-flips: nelliyampathy 3→5, ponmudi 3→5, poovar 3→5, sabarimala 4→5,
--          silent-valley 3→5, vagamon 3→5 (ALL 6 flip A)

BEGIN;

-- ============================================================
-- NELLIYAMPATHY (+2)
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'nelliyampathy',
  'Coffee Valley Resort Restaurant',
  'Pulayanpara, ~25-minute walk from Seetharkundu Viewpoint',
  ARRAY['kerala','south-indian','multi-cuisine'],
  'mid_range',
  ARRAY['Kerala parotta with beef fry','Nelliyampathy coffee filter brew','appam with vegetable stew','fish moilee','homestyle veg sadya'],
  '₹₹',
  int4range(350, 651),
  'mixed',
  'recommended',
  NULL,
  'Resort restaurant cozily nestled inside Poabs coffee estate at 3500 feet. Cooks brew Arabica and Robusta beans grown on-site — the same beans Poabs has been producing as part of Indias largest multi-crop organic plantation. JustDial logs 313 ratings averaging 4.5/5; reviewers consistently flag the homely Kerala food and the misty cottage views. One of the few sit-down restaurants between Nemmara and the Sitharkundu viewpoint.',
  'Restaurant is geared to in-house guests so call ahead before driving up the 18-km ghat — they cook to order. Order the Nelliyampathy filter coffee specifically; the kitchen sources beans direct from the surrounding estate rather than commercial blends.',
  'Coffee Valley Resort, Pulayanpara, Nelliyampathy, Palakkad District, Kerala 678508',
  'https://maps.google.com/?q=Coffee+Valley+Resort+Nelliyampathy',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g2294765-d19378786-Reviews-Coffee_Valley_Resort-Nelliyampathy_Palakkad_District_Kerala.html','https://coffeevalleyresorts.com/','https://www.justdial.com/Palakkad/Coffee-Valley-Resort-Pulayanpara/9999PX491-X491-190515195100-E2U7_BZDET'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'nelliyampathy',
  'Green Land Farmhouses Estate Kitchen',
  'Inside the tea estate, 14 km from Nelliyampathy main town, 3500 ft elevation',
  ARRAY['kerala','farm-to-table','south-indian'],
  'casual',
  ARRAY['farm-raised emu meat curry','Kerala thali (pre-ordered)','jeep-safari evening buffet','homestyle aviyal','estate-fresh banana fry'],
  '₹',
  int4range(150, 401),
  'mixed',
  'required',
  NULL,
  'The estate kitchen is unusual for the region — they raise their own cows, buffaloes, goats, rabbits, chickens, quail, emu and ducks on-site and serve farm-to-plate dishes to guests and day-visitors who call ahead. Buffet is roughly ₹150/head per Tripadvisor reviews. The emu meat curry, sourced from the farms own birds, is the propertys genuinely distinctive offer — almost nowhere else on the Western Ghats serves it.',
  'You cannot walk in — food is prepared only on pre-order, so call the property at least 4-6 hours before reaching. Combine the meal with the night-time jeep safari through forest roads (arranged by the same management) and you may spot bison, deer or wild boar.',
  'Green Land Farmhouses, Nelliyampathy, Palakkad District, Kerala 678508',
  'https://maps.google.com/?q=Green+Land+Farmhouses+Nelliyampathy',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g2294765-d3588492-Reviews-Green_Land_Farmhouses-Nelliyampathy_Palakkad_District_Kerala.html','https://palghat.net/Green-land-farm-house/'],
  false,
  true
);

-- ============================================================
-- PONMUDI (+2)
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'ponmudi',
  'Malabar Restaurant & Hotel Vithura',
  'Vithura town, 15 km from Ponmudi summit on the 22-hairpin ghat road',
  ARRAY['kerala','malabar','seafood','multi-cuisine'],
  'casual',
  ARRAY['Malabar fish biryani','Karimeen pollichathu','chicken biryani','Kerala porotta with beef curry','filter coffee'],
  '₹',
  int4range(150, 351),
  'mixed',
  'walk-in',
  NULL,
  'Vithura is the last proper town before the Ponmudi ghat climb begins, and Malabar Restaurant has become the de-facto refuelling stop for the descent from the hills. JustDial logs 943 ratings averaging 3.7/5 — high traffic for a small ghat-town eatery. Kitchen leans Malabar-style seafood and biryani, which is unusual at this altitude given Vithura sits inland; the operator sources fish from Trivandrum 45 km away.',
  'Open until 10:30 pm — the only viable late-dinner option if you are driving down from the summit after the KTDC Golden Peak restaurant closes. Stick to the biryani and the Karimeen; the multi-cuisine continental side is weaker.',
  'Vithura, Thiruvananthapuram District, Kerala 695551',
  'https://maps.google.com/?q=Malabar+Restaurant+Vithura+Ponmudi',
  ARRAY['https://www.justdial.com/Thiruvananthapuram/Malabar-Restaurant-Hotel-Vithura/0471PX471-X471-190731063203-J5B3_BZDET'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'ponmudi',
  'Government Guest House Restaurant Ponmudi',
  'Ponmudi summit, near the view-point and watch tower, 1066m elevation',
  ARRAY['kerala','south-indian','budget'],
  'casual',
  ARRAY['vegetarian Kerala meals','puri-bhaji breakfast','tapioca and tea','ice cream','cold drinks'],
  '₹',
  int4range(80, 251),
  'mixed',
  'walk-in',
  NULL,
  'The Government Guest House at the Ponmudi summit runs the only on-property restaurant once you climb past the KTDC Golden Peak. The DTPC-maintained cafeteria sits at the view-point complex and is the cheapest hot meal at altitude — TripAdvisor reviewers consistently flag it as budget-priced lunch and dinner with surprisingly fresh food given the remoteness. Limited menu (puri, tea, tapioca, ice cream) but reliable.',
  'Book the meal slot via the guest house reception when you arrive — they cook in batches and run out by 2:30 pm on weekends. Pair with the watch-tower climb just behind the cafeteria for the Agasthyakoodam panorama.',
  'Government Guest House, Ponmudi Hill, Nedumangad Taluk, Thiruvananthapuram District, Kerala 695551',
  'https://maps.google.com/?q=Government+Guest+House+Ponmudi',
  ARRAY['https://www.justdial.com/Ponmudi/Government-Guest-House-Restaurant-Ponmudi-Thiruvananthapuram/0471PX471-X471-181113224523-S5C1_BZDET','https://www.tripadvisor.in/ShowTopic-g311295-i10148-k5511339-Accomodation_in_Govt_Guest_house_Ponmudi-Kovalam_Thiruvananthapuram_District_Kerala.html'],
  false,
  true
);

-- ============================================================
-- POOVAR (+2)
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'poovar',
  'Chillis Floating Restaurant Poovar',
  'Poovar backwaters, Club Mahindra Resort Road, accessible only by boat',
  ARRAY['kerala','seafood','south-indian','multi-cuisine'],
  'mid_range',
  ARRAY['Karimeen pollichathu','prawn curry','crab masala','paneer pakora','tiger prawns grilled'],
  '₹₹₹',
  int4range(700, 1501),
  'mixed',
  'required',
  NULL,
  'The original floating restaurant on the Poovar backwater, anchored mid-estuary where the Neyyar river meets the Arabian Sea. Tripadvisor records 56 reviews — seafood is the genuine pull; the kitchen receives daily catch from Poovar harbour two km away. Pricing is steep (reviewers flag 5x the mainland rate) because the boat-pickup and remote-anchor logistics fold into every bill. Currently rated 3.0/5 on Tripadvisor.',
  'You cannot walk in — call ahead, place your order, and the restaurant despatches a boat from the jetty to pick you up. Stick to seafood and skip the continental side. Do not go expecting fine-dining hygiene; reviewers consistently flag service inconsistency.',
  'Poovar Backwaters, Club Mahindra Resort Road, Poovar, Thiruvananthapuram District, Kerala 695525',
  'https://maps.google.com/?q=Chillis+Floating+Restaurant+Poovar',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g951922-d4004532-Reviews-Chilli_s_Floating_Restaurant_Poovar-Poovar_Thiruvananthapuram_District_Kerala.html','https://www.facebook.com/floatingrestaurantpoovar/'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'poovar',
  'Samudra Floating Restaurant',
  'Poovar backwaters mangrove channel, near Golden Sand Beach and Elephant Rock',
  ARRAY['kerala','seafood','south-indian'],
  'mid_range',
  ARRAY['Karimeen pollichathu','crab masala','prawns curry','Kerala fish thali','appam with stew'],
  '₹₹₹',
  int4range(600, 1301),
  'mixed',
  'required',
  NULL,
  'A second floating restaurant on the Poovar circuit, positioned along the mangrove channel between Golden Sand Beach and the photographed Elephant Rock formation. Tripadvisor reviewers (with 2022+ activity) praise it as great place to have tasty and quality food during backwaters boat journeys — the seafood is the headline; karimeen pollichathu, crab masala and prawn curry consistently called out. Reaches via hired boat from the Poovar jetty.',
  'Combine the meal with the standard 1-hour backwater cruise — most local boat-operators will detour to Samudra on request for an extra ₹100-150. Lunch is the better window: the mangrove light is best 11 am-2 pm and the kitchen runs through fresh catch before stocks dwindle by dinner.',
  'Poovar Backwaters, Poovar, Thiruvananthapuram District, Kerala 695525',
  'https://maps.google.com/?q=Samudra+Floating+Restaurant+Poovar',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297637-d11844166-Reviews-Samudra_Floating_Restaurant-Thiruvananthapuram_Trivandrum_Thiruvananthapuram_Dis.html'],
  false,
  true
);

-- ============================================================
-- SABARIMALA (+1)
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'sabarimala',
  'Aravana & Appam Prasadam Counters (TDB, Sannidhanam)',
  'Sannidhanam plateau, dedicated TDB Prasadam counters near the Pathinettampadi (18 Holy Steps)',
  ARRAY['kerala','prasadam','sweet','temple-food'],
  'street_food',
  ARRAY['Aravana payasam (red rice + jaggery + ghee 250g can)','Appam (rice-flour + jaggery + ghee disc)','Vella Aravana','Pancha kajaya'],
  '₹',
  int4range(50, 251),
  'pure-veg',
  'walk-in',
  NULL,
  'The Travancore Devaswom Board runs dedicated Prasadam counters at Sannidhanam where Aravana payasam and Appam are sold to every Sabarimala pilgrim. Each batch uses 38 kg of red rice, 200 kg of jaggery, 10 litres of ghee and 16 coconuts — and the temple produces 100 batches every day during the Mandalam-Makaravilakku season. Over 8 million 250 g Aravana cans are sold during the two-month season. The Prasadam is not a meal but is the only branded temple food artefact pilgrims carry home; the recipe has remained unchanged for centuries.',
  'Buy Aravana cans on your descent, not on arrival — the cans are heavy and you will regret carrying them up the 18 Holy Steps. Each can keeps unrefrigerated for 6+ months due to the jaggery-ghee preservation. During Mandala season (mid-November to late December) queues at the counters peak after 5 pm; arrive between 1-3 pm for shorter waits.',
  'Sannidhanam Prasadam Counters, Sabarimala Ayyappa Temple, Pathanamthitta District, Kerala 689713',
  'https://maps.google.com/?q=Sabarimala+Sannidhanam+Prasadam+Counter',
  ARRAY['https://www.sabarimala.kerala.gov.in/prasadham-counters','https://sabarimala.tdb.org.in/node/195','https://www.onmanorama.com/food/features/2025/12/11/sabarimala-prasadam-significance.html'],
  true,
  true
);

-- ============================================================
-- SILENT-VALLEY (+2)
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'silent-valley',
  'The Table Multicuisine Restaurant Anaikatti',
  'Anaikatti village, ~12 km from Mukkali gate on the Mukkali-Anaikatti corridor',
  ARRAY['multi-cuisine','south-indian','north-indian','chinese'],
  'mid_range',
  ARRAY['chicken biryani','American chop suey','butter naan with paneer butter masala','South Indian meals','filter coffee'],
  '₹₹',
  int4range(250, 551),
  'mixed',
  'walk-in',
  NULL,
  'Anaikatti is the established eatery cluster for Silent Valley visitors — Mukkali gate itself has only a tiny Forest Department canteen, so most jeep-safari groups head to Anaikatti afterwards. The Table is the highest-rated multi-cuisine restaurant in Anaikatti, scoring 4.8/5 across 46 Tripadvisor reviews (notably high for the area). Reviewers flag balanced flavours, family-friendly portions, and welcoming staff.',
  'After your morning Silent Valley jeep-safari (which ends at Sairandhri viewpoint), drive 12 km east to Anaikatti on the cross-border road. The Table serves through to dinner, unlike the Mukkali gate canteen which shuts mid-afternoon. Useful midway-stop if you are continuing to Coimbatore.',
  'Anaikatti, Coimbatore District, Tamil Nadu 641108',
  'https://maps.google.com/?q=The+Table+Multicuisine+Restaurant+Anaikatti',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g15357143-d33407853-Reviews-The_Table_Multicuisine_Restaurant-Anaikatti_Coimbatore_District_Tamil_Nadu.html','https://www.facebook.com/TableMultiCuisineRestaurant/'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'silent-valley',
  'My Village Eco Rural Resort Restaurant',
  'Anaikatti, 25-acre plantation in the Western Ghats, ~10 km from Mukkali gate',
  ARRAY['kerala','south-indian','homestyle','farm-to-table'],
  'mid_range',
  ARRAY['Kerala sadya (banana leaf)','homestyle chicken curry with parotta','farm-fresh mango ice cream','aviyal','appam with stew'],
  '₹₹',
  int4range(400, 851),
  'mixed',
  'recommended',
  NULL,
  'A 25-acre rural-architecture resort spread across plantation land in the Anaikatti corridor — the cottages are built in regional Indian village styles. The kitchen leans home-style with sadya-format meals on banana leaves and produce from the resorts own farm. Tripadvisor reviewers consistently flag the food 5/5; the mango ice cream gets repeat mentions. Used by Silent Valley day-trippers as a lunch base after the morning jeep safari.',
  'Call the resort an hour ahead even for lunch — the chef cooks to order rather than batch-prep, and the sadya needs 45 minutes lead time. Skip the multi-cuisine items; the kitchens strength is the Kerala homestyle base.',
  'My Village Eco Rural Resort, Anaikatti, Coimbatore District, Tamil Nadu 641108',
  'https://maps.google.com/?q=My+Village+Eco+Rural+Resort+Anaikatti',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g15357143-d15153237-Reviews-My_Village_Eco_Rural_Resort-Anaikatti_Coimbatore_District_Tamil_Nadu.html','https://www.tripadvisor.com/Hotel_Feature-g15357143-d15153237-zft9165-My_Village_Eco_Rural_Resort.html'],
  false,
  true
);

-- ============================================================
-- VAGAMON (+2)
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'vagamon',
  'Cafe Kudumbashree Premium Restaurant Vagamon',
  'Petta Junction, central Vagamon, parking for 25 cars',
  ARRAY['kerala','south-indian','multi-cuisine'],
  'casual',
  ARRAY['Kerala sadya','appam with mutton stew','beef ularthiyathu','filter coffee','banana leaf meals'],
  '₹',
  int4range(120, 351),
  'mixed',
  'walk-in',
  2026,
  'Inaugurated January 16, 2026 by Local Self Government Minister VN Vasavan — the 15th Kudumbashree Premium Café-Restaurant outlet across Kerala. The Kudumbashree network is the state governments womens self-help-group enterprise programme, and these premium outlets are operated by trained women entrepreneurs with a 3-month state-funded onboarding. The Vagamon outlet sits at Petta Junction with 25-car parking and separate facilities — built specifically to handle the weekend tourist surge.',
  'Single most reliable budget eatery in Vagamon, where most dining options are resort-restaurants charging hotel rates. Open through afternoon (when many Vagamon eateries shut between 3-7 pm) and the price point stays sub-₹250 even on weekends. Try the sadya at lunch.',
  'Cafe Kudumbashree Premium Restaurant, Petta Junction, Vagamon, Idukki District, Kerala 685503',
  'https://maps.google.com/?q=Cafe+Kudumbashree+Vagamon+Petta+Junction',
  ARRAY['https://www.onmanorama.com/news/kerala/2026/01/16/kudumbashree-restaurant-in-idukki-vagamon.html','http://lsgkerala.gov.in/en/kudumbashree/news/cafe-kudumbashree-premium-restaurant-opened-kollam'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'vagamon',
  'Sobremesa at Vaasta Vagamon',
  'Vaasta Vagamon resort, 4-minute drive from Vagamon Pine Forest',
  ARRAY['kerala','multi-cuisine','indian','chinese','continental'],
  'mid_range',
  ARRAY['Kerala fish curry meals','butter chicken with naan','paneer tikka','filter coffee','Chinese noodles'],
  '₹₹',
  int4range(450, 951),
  'mixed',
  'recommended',
  NULL,
  'Sobremesa is the in-house dining space at Vaasta Vagamon, set against the tea-plantation backdrop near Peermade and the Vagamon Pine Forest. The kitchen runs an Indian-Chinese-Continental spread and the resort itself draws weekend Bangalore-Kochi traffic. Tripadvisor reviews flag it as one of the few resort restaurants in Vagamon that allows walk-in dinners (most resorts restrict to in-house guests). The Spanish-origin Sobremesa name nods to lingering at the table after meals — the restaurant runs longer evening seatings than most Vagamon dining rooms.',
  'Reserve a window table for sunset — the property faces the western tea slopes and the dining rooms glass wall captures the 6-7 pm light. Skip the continental side; the kitchens strength is Kerala-Indian. The resort accepts walk-in diners but you will be seated after in-house guests on weekends.',
  'Vaasta Vagamon, Peermade, Vagamon, Idukki District, Kerala 685531',
  'https://maps.google.com/?q=Vaasta+Vagamon+Sobremesa',
  ARRAY['https://www.vaastavagamon.com/','https://www.tripadvisor.com/Hotel_Review-g2282921-d34045577-Reviews-Vaasta_Vagamon-Vagamon_Idukki_District_Kerala.html'],
  false,
  true
);

COMMIT;
