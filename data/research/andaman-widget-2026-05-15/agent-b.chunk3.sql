
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'diglipur',
  'Diglipur Bazar Bengali Dhabas',
  'Diglipur Bazar Main Road',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Bengali thali — rice + 5 sides',
  ARRAY['Maach-bhaath (fish rice)','Daal-chawal','Aloo posto','Mishti doi (sweet curd)']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Cluster of 5-6 unnamed Bengali dhabas along Diglipur Bazar serving the local Bengali-settler community (Diglipur is 72% Bengali by mother-tongue, descendants of 1950s East-Pakistan refugees). Authentic mustard-oil fish curry + posto (poppy-seed) preparations not found elsewhere in A&N.',
  'Eat where the locals eat — look for the dhaba with the longest queue at 1 PM. Stocks finish by 3 PM (no second-shift cooking). Cash only.',
  'Diglipur Bazar Main Road, North Andaman',
  'https://maps.google.com/?q=Diglipur+Bazar',
  ARRAY['https://www.go2andaman.com/diglipur/restaurants/','https://en.wikipedia.org/wiki/Diglipur']::text[],
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
  'diglipur',
  'Saddle Peak View Resort Kitchen',
  'Kalipur, 17 km from Diglipur Bazar',
  ARRAY['indian','bengali','continental']::text[],
  'casual',
  'Multi-cuisine + Kalipur fish',
  ARRAY['Fish curry rice','Egg-paratha','Veg pulao','Sea-facing breakfast']::text[],
  '₹₹',
  '[180,341)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Saddle Peak View Resort opened January 2017 at Kalipur (4-min walk to the turtle-nesting beach, 8 km from Aerial Bay jetty). Its in-house multi-cuisine kitchen serves Bengali settler-style fish-curry-rice + standard Indian fare to walk-ins by reservation.',
  'Best for early breakfast (6-8 AM) before the Saddle Peak summit trek (7-9 hour climb) — the kitchen will pack a trail breakfast box if you ask the night before.',
  'Kalipur, Diglipur, North Andaman',
  'https://maps.google.com/?q=Saddle+Peak+View+Resort+Kalipur',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g3382376-d13797219-Reviews-Saddle_Peak_View_Resort-Diglipur_North_Andaman_Island_Andaman_and_Nicobar_Islands.html']::text[],
  '2026-05-15',
  2017
);

-- RANGAT (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'rangat',
  'Hotel Avis Multi-Cuisine Restaurant',
  'Rangat Bazar, Middle Andaman',
  ARRAY['indian','chinese','continental','bengali']::text[],
  'casual',
  'Multi-cuisine thali + fish',
  ARRAY['Fish thali','Chicken Manchurian','Veg fried rice','Dosa']::text[],
  '₹₹',
  '[180,361)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Avis is Rangat''s biggest hotel and its multi-cuisine restaurant doubles as the town''s social-gathering anchor. Bengali + Tamil + Telugu settler demographic of Rangat is reflected in the menu (fish curry + dosa + Manchurian all on the same plate). Open to walk-in non-residents.',
  'Open all day — best for early breakfast before catching the morning Mayabunder bus or Long Island ferry. Cash + UPI accepted.',
  'Rangat Bazar, Middle Andaman, A&N 744205',
  'https://maps.google.com/?q=Hotel+Avis+Rangat',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g8469504-d27101046-Reviews-Hotel_Avis-Rangat_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.makemytrip.com/hotels/hotel_avis-details-rangat.html']::text[],
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
  'rangat',
  'Hawksbill Nest Restaurant',
  'Cuthbert Bay area, 19 km from Rangat Bazar',
  ARRAY['indian','bengali','seafood']::text[],
  'casual',
  'Cuthbert Bay fish + thali',
  ARRAY['Fish curry rice','Crab masala','Veg thali','Tea']::text[],
  '₹₹',
  '[180,381)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Hawksbill Nest is the A&N Tourism Department guest-house at Cuthbert Bay — its restaurant is the only sit-down option within 19 km of Rangat town. Government regulated pricing. The kitchen sources fish from Cuthbert Bay fishermen who also operate the turtle-nesting Forest Dept hatchery 2 km away at Dhani Nallah.',
  'Book lunch/dinner via the Rangat tourism office — walk-in is hit-or-miss. The dinner-then-turtle-walk combo (Dec-Mar) starts from this veranda.',
  'Cuthbert Bay, Middle Andaman, near Dhani Nallah',
  'https://maps.google.com/?q=Hawksbill+Nest+Rangat',
  ARRAY['https://hawksbill-nest-rangat.hotelinandaman.com/','https://www.andamantourism.gov.in/Rangat.php']::text[],
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
  'rangat',
  'Rangat Bazar Tamil Tiffin Centres',
  'Rangat Bazar, Middle Andaman',
  ARRAY['indian','tamil','south-indian']::text[],
  'street_food',
  'Idli-sambar + dosa breakfast',
  ARRAY['Idli-sambar','Plain dosa','Vada-sambar','Filter coffee']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Rangat has a significant Tamil migrant settler community (descendants of 1960s plantation labour) — the bazaar has 3-4 tiffin-style breakfast shops serving authentic idli-sambar + dosa from 6 AM. These are the cheapest hot-meal option in town.',
  'Open 6-10 AM only (breakfast-only operation). Dosa-sambar plate ₹50-70. Filter coffee in steel tumbler.',
  'Rangat Bazar Main Road, Middle Andaman',
  'https://maps.google.com/?q=Rangat+Bazar',
  ARRAY['https://wikitravel.org/wiki/en/index.php?title=Rangat','https://www.eternalandamans.com/rangat']::text[],
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
  'rangat',
  'APWD Guest House Mess Rangat',
  'Rangat Bazar APWD compound',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Govt mess thali',
  ARRAY['Veg thali','Fish thali','Boiled veg','Daal-chawal']::text[],
  '₹',
  '[100,201)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'The Andaman Public Works Department guest-house at Rangat has a small in-house mess that serves residents (government officials) and walk-in tourists by advance request. Regulated subsidised pricing — likely the cheapest hot lunch in town outside of the Tamil tiffin shops.',
  'Walk-in tourists need to flag the kitchen by 10 AM if you want lunch — they cook to head-count, no excess stock. Veg thali default.',
  'APWD Compound, Rangat Bazar',
  'https://maps.google.com/?q=APWD+Rangat',
  ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://northmiddle.andaman.nic.in/accommodation/']::text[],
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
  'rangat',
  'Amkunj Beach Shacks',
  'Nimbutala Village, Amkunj Beach (8 km from Rangat)',
  ARRAY['indian','snacks','bengali']::text[],
  'street_food',
  'Coconut water + bhujia',
  ARRAY['Coconut water','Bhujia + lemon','Tea','Boiled corn (seasonal)']::text[],
  '₹',
  '[30,81)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'A couple of seasonal coconut-stall shacks at Amkunj Beach trail-head run by Bengali settler families from Nimbutala village. Operate during dry-season tourist months (Oct-May). Cash only, no menu beyond what is laid out on the counter.',
  'Stalls close by 4 PM. Bring your own snacks if you''re heading to Cuthbert Bay (12 km further north) — Amkunj is the last food stop before Cuthbert/Hawksbill Nest.',
  'Nimbutala Village, Amkunj Beach, Middle Andaman',
  'https://maps.google.com/?q=Amkunj+Beach+Rangat',
  ARRAY['https://blueandamantour.com/destinations/cuthbert-bay-beach/','https://www.andamanislands.com/blog/detail/cutbert-bay-beach-at-rangat-island']::text[],
  '2026-05-15',
  NULL
);

-- LITTLE-ANDAMAN (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'little-andaman',
  'Blue View Resort Restaurant',
  'Hut Bay, Little Andaman',
  ARRAY['indian','bengali','seafood','continental']::text[],
  'casual',
  'Hut Bay fish + bamboo-hut breakfast',
  ARRAY['Fish curry rice','Pancakes (breakfast)','Veg thali','Chicken curry']::text[],
  '₹₹',
  '[200,381)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Blue View was the first bamboo-hut resort to open in Little Andaman; its open-air restaurant is one of the only sit-down eateries on the island for non-residents. Bengali + Tamil migrant cooks share the kitchen; menu reflects both (fish curry + idli-dosa breakfast).',
  'Reserve dinner — kitchen capacity is tiny. Best surfer-traveller hangout in the evenings; long-stay backpackers heading to Butler Bay use this as their base.',
  'Hut Bay, Little Andaman',
  'https://maps.google.com/?q=Blue+View+Resort+Hut+Bay',
  ARRAY['https://www.go2andaman.com/hotel/the-blue-view-resort/','https://wanderon.in/blogs/homestays-in-little-andaman-island']::text[],
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
  'little-andaman',
  'Hut Bay Bazaar Bengali Dhabas',
  'Hut Bay Main Bazaar, Little Andaman',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Maach-bhaath (fish-rice)',
  ARRAY['Bengali fish curry','Daal-chawal','Aloo-bhaja','Mishti doi']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hut Bay town has 3-4 nameless Bengali-settler dhabas catering to the local population (Little Andaman is ~10,000 people, mostly Bengali resettled families + Onge tribal reserve). These dhabas serve the cheapest cooked-from-scratch fish-curry-rice on the island.',
  'Open 11 AM-3 PM lunch + 7-9 PM dinner. Stocks finish fast — by 2 PM the fish-curry pot is usually empty. Pack lunch for Butler Bay surf trips.',
  'Hut Bay Main Bazaar, Little Andaman',
  'https://maps.google.com/?q=Hut+Bay+Bazaar+Little+Andaman',
  ARRAY['https://www.andamanbluebay.com/about-andaman/hutbay-little-andaman-island','https://en.wikipedia.org/wiki/Little_Andaman']::text[],
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
  'little-andaman',
  'APWD Guest House Mess Hut Bay',
  'Hut Bay APWD Compound',
  ARRAY['indian','bengali']::text[],
  'casual',
  'Govt mess thali',
  ARRAY['Veg thali','Fish thali','Boiled veg','Tea + biscuit']::text[],
  '₹',
  '[100,201)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Andaman Public Works Department guest-house at Hut Bay has an in-house mess serving residents (govt officials) + walk-in tourists by request. The cheapest govt-regulated hot meal on Little Andaman. Bengali settler cook on staff.',
  'Phone-in for lunch by 10 AM — they cook to head-count. Dinner only on confirmed advance booking.',
  'APWD Guest House, Hut Bay, Little Andaman',
  'https://maps.google.com/?q=APWD+Hut+Bay+Little+Andaman',
  ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://southandaman.nic.in/tourist-place/little-andaman/']::text[],
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
  'little-andaman',
  'Butler Bay Beach Surf-Shack',
  'Butler Bay Beach (14 km from Hut Bay)',
  ARRAY['indian','snacks','continental']::text[],
  'street_food',
  'Coconut water + Maggi',
  ARRAY['Coconut water','Maggi','Tea','Egg sandwich']::text[],
  '₹',
  '[50,151)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Butler Bay Beach is the only spot in the entire A&N Union Territory where surfing is regularly attempted (waves Nov-Apr). A small seasonal shack near the beach trail-head serves the surfer crowd — coconut water, Maggi, tea. Run by Bengali settler family who also offer surf-board rentals.',
  'Only open Nov-Apr surf season. Bring your own packed lunch from Hut Bay Bazaar; the shack stocks snacks only. Bring cash — no UPI signal.',
  'Butler Bay Beach trail-head, Little Andaman',
  'https://maps.google.com/?q=Butler+Bay+Beach+Little+Andaman',
  ARRAY['https://go2andaman.com/visit/butler-bay-beach-hut-bay/','https://www.stormrider.surf/region/andaman-islands']::text[],
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
  'little-andaman',
  'Hut Bay Tamil Tiffin Shop',
  'Hut Bay Main Bazaar, Little Andaman',
  ARRAY['indian','tamil','south-indian']::text[],
  'street_food',
  'Idli-sambar + dosa',
  ARRAY['Idli-sambar','Plain dosa','Filter coffee','Vada']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hut Bay has a Tamil migrant community (descendants of 1960s government-resettled labour) — 1-2 tiffin shops in the bazaar serve fresh idli-sambar + dosa from 6 AM. These are pure-veg, the cheapest hot breakfast on the island, and the safest food option for pre-ferry mornings.',
  'Open 6-10 AM only. Filter coffee in steel tumbler — order strong. Cash only.',
  'Hut Bay Main Bazaar, Little Andaman',
  'https://maps.google.com/?q=Hut+Bay+Bazaar+Little+Andaman',
  ARRAY['https://www.andamanbluebay.com/about-andaman/hutbay-little-andaman-island','https://go2andaman.com/little-andaman/']::text[],
  '2026-05-15',
  NULL
);
