
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'Mandalay Restaurant (Fortune Resort Bay Island, North Bay-view dining)',
  'Marine Hill, Fortune Resort Bay Island — 2.5 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['seafood','indian','continental','chinese','buffet']::text[],
  'fine_dining',
  'Coastal fish curry with North Bay sea-view',
  ARRAY['Coastal Andamanese fish curry','Lobster Bay Island-style','Tropical fruit dessert','House-baked chapati']::text[],
  '₹₹₹',
  '[1200,2500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Open-deck restaurant with sight-line directly onto North Bay and Ross — finish the day with Andaman seafood lunch facing the island you snorkeled that morning. The only PB fine-dining with sea-view.',
  'Book 12:30pm lunch on your North Bay day for sea-direction post-ferry. The buffet has more seafood at lunch; à la carte better at dinner.',
  'Marine Hill, Fortune Resort Bay Island, Port Blair 744101',
  'https://maps.google.com/?q=Mandalay+Restaurant+Fortune+Resort+Bay+Island+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1200917-Reviews-Mandalay_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.go2andaman.com/restaurant/mandalay-restaurant/']::text[],
  '2026-05-15',
  2003
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'The Bayview Garden Restaurant (Sinclairs Bayview)',
  'South Point, Marine Hill — 3 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Andaman seafood platter + bar sundowner',
  ARRAY['Andaman seafood platter','Tandoori prawns','Fish moilee','Alto Espirito bar cocktails']::text[],
  '₹₹₹',
  '[900,1800)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Cliff-side garden deck — the natural sundowner stop after a North Bay morning. Ranked #10 of 108 A&N hotels on Tripadvisor; Alto Espirito Bar starts pouring at 6pm.',
  'Time post-ferry shower + Bayview sundown for 6pm bar opening. Seafood platter for two pairs with the bar''s house rum.',
  'Sinclairs Bayview, South Point, Marine Hill, Port Blair 744106',
  'https://maps.google.com/?q=Sinclairs+Bayview+Port+Blair',
  ARRAY['https://www.sinclairshotels.com/portblair','https://www.tripadvisor.com/Hotel_Review-g297584-d1062564-Reviews-Sinclairs_Bayview_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islan.html']::text[],
  '2026-05-15',
  2006
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'north-bay-island',
  'Cafe Del Sole (Port Blair, casual post-North-Bay dinner)',
  'Goalghar Junction — 2 km from Aberdeen Jetty (North Bay ferry pier)',
  ARRAY['italian','cafe','pizza','continental']::text[],
  'cafe',
  'Wood-fired pizza after sea-walk',
  ARRAY['Wood-fired margherita pizza','Pesto pasta','Lasagne','Tiramisu']::text[],
  '₹₹',
  '[450,850)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Italian-run cafe — the casual non-Indian alternative to seafood after a full North Bay snorkel day. Backpacker/diver crowd.',
  'Best 7pm onwards when wood-fired oven is at temp. Margherita is the safest non-meat option for North-Bay-tired families.',
  'Goalghar Junction, Port Blair 744101',
  'https://maps.google.com/?q=Cafe+Del+Sole+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurants-g297584-c26-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://wanderlog.com/place/details/471720']::text[],
  '2026-05-15',
  2014
);

-- CHIDIYA TAPU (need +5; thin-tourism dest 25-30km south PB, day-trip from PB)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Forest Department Canteen (Chidiya Tapu)',
  'Chidiya Tapu beach entrance, Forest Department complex',
  ARRAY['indian','snacks','tea-coffee']::text[],
  'casual',
  'Hot pakora + masala chai with sunset',
  ARRAY['Onion pakora','Vegetable maggi','Masala chai','Cold drinks']::text[],
  '₹',
  '[60,180)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Run by the A&N Forest Dept as the only food vendor inside Chidiya Tapu — the obvious sunset-stop dhaba for the 5pm bird-watching crowd. No other eatery within 5km of the beach.',
  'Get pakora + chai at 4:45pm right as the sunset crowd arrives. Cash only. Closes 30 min after sunset.',
  'Forest Department complex, Chidiya Tapu, South Andaman 744105',
  'https://maps.google.com/?q=Chidiya+Tapu+Beach+Forest+Department+Andaman',
  ARRAY['https://southandaman.nic.in/tourist-place/chidiyatappu/','https://forest.and.nic.in/']::text[],
  '2026-05-15',
  2010
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Sea Princess Beach Resort Restaurant (Blue Sky Multi-cuisine, Wandoor)',
  'Wandoor (Sea Princess Beach Resort) — 12 km from Chidiya Tapu',
  ARRAY['indian','continental','seafood','multi-cuisine']::text[],
  'mid_range',
  'Andaman fish curry + Wandoor sunset view',
  ARRAY['Andaman fish curry','Tandoori prawns','Garden salad','Bar cocktails at Saaz Bar']::text[],
  '₹₹',
  '[700,1500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Sea-facing restaurant at the 40-room Sea Princess in Wandoor — the closest hotel-restaurant to Chidiya Tapu (12km), near Mahatma Gandhi Marine National Park. Non-residents welcome.',
  'Combine Chidiya Tapu sunset (5:30pm) with dinner here (7pm) — 25 min drive. Saaz Bar starts 6pm.',
  'Sea Princess Beach Resort, Wandoor, South Andaman 744105',
  'https://maps.google.com/?q=Sea+Princess+Beach+Resort+Wandoor',
  ARRAY['https://www.silversandhotels.com/sea-princess-beach-resort-in-port-blair/','https://www.tripadvisor.in/Hotel_Review-g297584-d735046-Reviews-Silver_Sand_Sea_Princess_Beach_Resort-Port_Blair_South_Andaman_Island_Andaman_and_Nicob.html']::text[],
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
  'chidiya-tapu',
  'New Lighthouse Restaurant (Port Blair, post-sunset return)',
  'Rajiv Gandhi Road, near Cellular Jail — 25 km from Chidiya Tapu',
  ARRAY['seafood','indian','continental','chinese']::text[],
  'mid_range',
  'Post-sunset seafood return-dinner',
  ARRAY['Chilli garlic squid','Pomfret tawa fry','Red Snapper tawa fry','Crab masala']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'After 5:30pm Chidiya Tapu sunset, the 45-min drive back to PB lands you at New Lighthouse for 7pm seafood dinner — standard end-of-Chidiya-Tapu-day routine.',
  'Drive back via NH-4 (45 min). Skip the resort dinner at Sea Princess if you want PB seafood instead of multi-cuisine. Open till 10:30pm.',
  'Rajiv Gandhi Road, near Cellular Jail, Port Blair 744101',
  'https://maps.google.com/?q=New+Lighthouse+Restaurant+Port+Blair',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g297584-d1952561-Reviews-New_Lighthouse_Restaurant-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Isl.html','https://www.go2andaman.com/restaurant/new-lighthouse-restaurant/']::text[],
  '2026-05-15',
  1995
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Annapurna Cafeteria (Port Blair, pre-Chidiya-Tapu breakfast)',
  'Aberdeen Bazaar (71, MA Road) — 25 km north of Chidiya Tapu',
  ARRAY['south-indian','north-indian','thali']::text[],
  'casual',
  'Pre-trip breakfast thali',
  ARRAY['Masala dosa','Idli vada','Special veg thali','Filter coffee']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Chidiya Tapu has no breakfast spot — most visitors start in PB and drive south. Annapurna is the default pre-bird-watching morning thali stop for veg families heading to Chidiya Tapu (best birding 6-8am, so 4:30am breakfast pickup).',
  'Open from 7am (south-Indian breakfast). Pack a roti+sabzi takeaway for the 7am drive — birding sites have zero food vendors.',
  '71, MA Road, opp. Model School, Aberdeen Bazaar, Port Blair 744101',
  'https://maps.google.com/?q=Annapurna+Cafeteria+Aberdeen+Bazaar+Port+Blair',
  ARRAY['https://www.annapurnacafeteria.com/','https://www.tripadvisor.in/Restaurant_Review-g297584-d1200908-Reviews-Annapurna-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  1993
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chidiya-tapu',
  'Symphony Samudra Beachside Jungle Resort Restaurant',
  'Wandoor-Chidiya Tapu road, near Munda Pahar — 5 km from Chidiya Tapu',
  ARRAY['multi-cuisine','indian','continental','seafood']::text[],
  'mid_range',
  'Beachside Andaman dinner',
  ARRAY['Fresh fish thali','Andaman crab','Tropical fruit dessert','Sundowner bar']::text[],
  '₹₹₹',
  '[1000,2000)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Symphony Samudra is the eco-resort on the Wandoor-Chidiya Tapu road — the only mid-range resort restaurant within 5km of Chidiya Tapu beach. Club Mahindra affiliate property. Beachfront sundowner.',
  'Walk-in welcome for non-residents — call ahead to confirm dinner availability (smaller property, kitchen needs notice). Pair with 5:30pm sunset at Chidiya Tapu and 7pm dinner here.',
  'Wandoor-Chidiya Tapu road, near Munda Pahar, South Andaman 744105',
  'https://maps.google.com/?q=Symphony+Samudra+Beachside+Jungle+Resort',
  ARRAY['https://www.symphonyresorts.com/symphony-samudra-beachside-jungle-resort-and-spa/','https://discoverandaman.in/hotel/symphony-samudra-beachside-jungle-resort-and-spa']::text[],
  '2026-05-15',
  2015
);

-- HAVELOCK ISLAND (need +5)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Full Moon Cafe',
  'Beach No. 3 (Govind Nagar), Havelock — owner-run beachside cafe',
  ARRAY['continental','indian','asian','seafood','cafe']::text[],
  'cafe',
  'Tamarind fish with coconut rice + banoffee pie',
  ARRAY['Tamarind fish with coconut rice','Piri piri prawns','Butter garlic prawns','Banoffee pie','Banana pancakes']::text[],
  '₹₹',
  '[400,900)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Founded 2006 by Adil; now run with partners Niamh and head chef Narendra. Started as a beach-shack, shifted beachside under a huge tree canopy. The Havelock backpacker / diver default for breakfast + coffee + dinner. Ethically sourced ingredients.',
  'Banoffee pie is the not-skip-this dessert. Arrive by 8:30am for breakfast before snorkel trips depart at 9. Wifi available.',
  'Beach No. 3, Govind Nagar, Havelock Island (Swaraj Dweep) 744211',
  'https://maps.google.com/?q=Full+Moon+Cafe+Havelock',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g503691-d2348166-Reviews-Full_Moon_Cafe-Havelock_Island_Andaman_and_Nicobar_Islands.html','https://www.facebook.com/fullmoonandaman/']::text[],
  '2026-05-15',
  2006
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Anju Coco Resto',
  'Beach No. 5, Vijaynagar main road, Havelock',
  ARRAY['indian','chinese','continental','multi-cuisine']::text[],
  'casual',
  'North Indian thali + signature banoffee pie',
  ARRAY['North Indian thali','Banoffee pie','Wood-oven pizza','Naan basket','Fresh seafood plate']::text[],
  '₹₹',
  '[350,800)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Open-walled wooden-mat structure at the heart of Beach No. 5 — 28-page diverse menu and one of the two banoffee pies on the island (the other is Full Moon). Open 8am-10:30pm daily.',
  'Naan-basket + thali is the standard dinner combo. Sit outside under the trees for cooler evening dining. Cash + UPI.',
  'Beach No. 5, Vijaynagar main road, Havelock Island 744211',
  'https://maps.google.com/?q=Anju+Coco+Resto+Havelock',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g503691-d2709365-Reviews-Anju_Coco-Havelock_Island_Andaman_and_Nicobar_Islands.html','https://www.justdial.com/Port-Blair/Anju-Coco-Resto-Near-Beach-No5-Havelock/9999P3192-3192-170904163536-K4P3_BZDET']::text[],
  '2026-05-15',
  2011
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Red Snapper (Wild Orchid Resort)',
  'Beach No. 5, Wild Orchid Resort, Havelock',
  ARRAY['seafood','indian','continental','fine-dining']::text[],
  'fine_dining',
  'Daily catch from ice podium — pick your own',
  ARRAY['Pick-your-own catch from iced podium','Andaman crab masala','Tandoori prawns','Tiramisu','House cocktails at Emerald Gecko bar']::text[],
  '₹₹₹',
  '[1200,2500)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Wild Orchid Resort''s fine-dining restaurant — pick your dinner from the iced central display and relax on the outdoor deck while it''s prepared. Casually sophisticated. Open all day. Non-resident reservations welcome.',
  'Best for 7:30pm sundown dinner. Pair with the Emerald Gecko Bar pre-dinner. Vegetarian options exist but seafood is the draw.',
  'Wild Orchid Resort, Beach No. 5, Vijaynagar, Havelock Island 744211',
  'https://maps.google.com/?q=Red+Snapper+Wild+Orchid+Havelock',
  ARRAY['https://www.sotc.in/tourism/havelock-island-tourism/food-in-havelock-island/red-snapper-restaurant/33','https://www.justdial.com/Port-Blair/Red-Snapper-The-Wild-Orchid-Resort-Vijaynagar-Swaraj-Dweep-Havelock/9999P3192-3192-190418213405-H2H1_BZDET']::text[],
  '2026-05-15',
  2007
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'havelock-island',
  'Famous Seafood Restaurant',
  'Govind Nagar, Havelock (near Beach No. 1 fishing jetty)',
  ARRAY['seafood','indian','continental']::text[],
  'casual',
  'Grilled fish + prawn masala (fresh from morning catch)',
  ARRAY['Grilled fish (daily catch)','Prawn masala','Calamari fry','Crab masala','Fish biryani']::text[],
  '₹₹',
  '[300,700)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Walking-distance to Govind Nagar fishing jetty — sources catch daily from the 5:30am auction. The local-and-budget seafood option vs the resort-priced Red Snapper. Justdial 4.7/5 across 2,200+ reviews. (Note: kitchen cooks veg and non-veg in same utensils per multiple reviews — strict vegetarians skip).',
  'Order whatever was on the morning auction (ask staff what came in). Cash + UPI. Open lunch + dinner.',
  'Govind Nagar (near Beach No. 1 jetty), Havelock Island 744211',
  'https://maps.google.com/?q=Famous+Seafood+Restaurant+Havelock',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g23098910-d23910173-Reviews-Famous_Seafood_Restaurant-Swaraj_Dweep_Havelock_Island_Andaman_and_Nicobar_Isl.html','https://www.justdial.com/Port-Blair/Famous-Seafood-Restaurant-Havelock/9999P3192-3192-191112191203-E1D3_BZDET']::text[],
  '2026-05-15',
  2014
);
