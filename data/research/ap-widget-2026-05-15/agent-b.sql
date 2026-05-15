-- Agent B — AP widget topup 2026-05-15
-- Scope: lambasingi, maredumilli, horsley-hills, gandikota, pulicat-lake
-- Tally: 4 eats inserted; 1 HS lock (lambasingi)

-- ====== lambasingi ======
-- HS LOCK: Lambasingi village ~3000 pop; December tourist surge only; no in-village
-- restaurant infrastructure beyond existing APTDC Haritha + Roadside Bamboo stalls.
-- Tripadvisor reviews (2024-26) consistently report "no decent restaurant" and
-- "only roadside ramshackle shacks." Chintapalli (20km gateway) also yields zero
-- verifiable named restaurant footprint on Tripadvisor/Zomato/Restaurant Guru.
-- HOLD at 2 eats — better honest scarcity than fabricate listicle ghost.

-- ====== maredumilli ======
INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try,
  price_range, price_per_head_inr, why_it_matters, insider_tip,
  signature_address, source_urls, vegetarian, is_legendary, established_year
) VALUES (
  'maredumilli',
  'Maredumilli Home''s Homely Restaurant',
  'Maredumilli main bazaar',
  'casual',
  ARRAY['Andhra','Tribal','Konda Reddi'],
  'Bamboo chicken (kodi pulusu cooked inside green bamboo node over woodfire)',
  ARRAY['Bamboo chicken','Bamboo biryani','Country chicken curry','Ragi sangati'],
  '₹₹',
  int4range(250, 451),
  'In a forest hamlet where most "bamboo chicken stalls" are unsigned roadside huts, Maredumilli Home''s is the rare named sit-down spot with a Restaurant Guru footprint (4.2 / 139 votes) — bamboo node split open at the table, smoke still rising. Konda Reddi/Koya families run several of these kitchens; the bamboo isn''t marketing, it''s how the tribe has cooked forever, before APFDC eco-tourism arrived in 2009.',
  'Order bamboo chicken AND bamboo biryani together — they share the same flavoured stock but the biryani absorbs more bamboo smokiness. Arrive by 12:30 PM; the bamboo is split fresh that morning and they run out by mid-afternoon on weekends.',
  'Main bazaar road, Maredumilli, Alluri Sitharama Raju district, Andhra Pradesh 533295',
  ARRAY[
    'https://restaurant-guru.in/chicken-Maredumilli-m4',
    'https://www.justdial.com/East-Godavari/Bamboo-chicken-Maredumilli/9999PX883-X883-171225050846-I6M8_BZDET'
  ],
  'meat-heavy',
  false,
  NULL
);

-- ====== horsley-hills ======
INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try,
  price_range, price_per_head_inr, why_it_matters, insider_tip,
  signature_address, source_urls, vegetarian, is_legendary, established_year
) VALUES (
  'horsley-hills',
  'Hotel Sri New Gongura',
  'Madanapalle (28km gateway, Old National Hwy)',
  'casual',
  ARRAY['Andhra','South Indian','Rayalaseema'],
  'Unlimited Andhra meals on banana leaf with gongura pachadi (sorrel-leaf chutney)',
  ARRAY['Unlimited thali','Gongura pachadi','Pesarattu','Ragi sangati with natu kodi pulusu','Perugu chutney'],
  '₹',
  int4range(120, 251),
  'Horsley summit (1290m) has only APTDC Haritha + Sky Park canteen — for a real Rayalaseema meal you drop 28km to Madanapalle, J. Krishnamurti''s 1895 birth town. New Gongura is the #3 vegetarian eatery in town with a 4000+ Restaurant Guru-reviews footprint that dwarfs every Horsley summit listing combined. Banana-leaf thali, self-service, runs from 7 AM (so coming down post-sunrise) to 10 PM.',
  'Pair with a stop at Besant Theosophical College (1.5km, where Margaret Cousins set Jana Gana Mana to its current tune in 1919) — order ragi sangati + natu kodi pulusu, the rural Rayalaseema staple summit hotels don''t make. Cash preferred; UPI works.',
  'Old National Hwy, near Government Bus Stand, Madanapalle, Annamayya district 517325',
  ARRAY[
    'https://restaurant-guru.in/Hotel-Sri-New-Gongura-Madanapalle',
    'https://yappe.in/andhra-pradesh/madanapalle/new-gongura-restaurant/1017484',
    'https://magicpin.in/Madanapalle/Madanapalle/Restaurant/Hotel-Sri-New-Gongura/store/33a036/'
  ],
  'pure-veg',
  false,
  NULL
);

-- ====== gandikota ======
INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try,
  price_range, price_per_head_inr, why_it_matters, insider_tip,
  signature_address, source_urls, vegetarian, is_legendary, established_year
) VALUES (
  'gandikota',
  'Gandikota Restaurant',
  'Palur, Jammalamadugu (15km gateway)',
  'casual',
  ARRAY['South Indian','North Indian','Chinese','Andhra'],
  'Andhra non-veg meals + Chinese sides (rare combo this side of Kadapa)',
  ARRAY['Mutton biryani','Chilli chicken','Andhra meals plate','Veg fried rice'],
  '₹₹',
  int4range(180, 421),
  'Inside Gandikota fort village (~3000 pop) the only food is APTDC Haritha + village tiffin stalls. Real sit-down dining lives 15km out at Jammalamadugu''s Palur junction, where Gandikota Restaurant runs the only multi-cuisine kitchen for the trekker/photographer crowd returning from the gorge at sunset. 4.0 on Justdial with 27 reviews — not legendary, but the verified workhorse where everyone defaults after fort closing time.',
  'Time it for the post-sunset window: leave Gandikota fort by 6:30 PM after the gorge light, hit Palur by 7 PM before the dinner rush. Wheelchair-accessible entrance — rare for Kadapa-district highway eateries. AC hall vs open-side seating.',
  'Beside Bharath Petroleum, behind Government Degree College, Palur, Jammalamadugu, YSR Kadapa district 516434',
  ARRAY[
    'https://www.justdial.com/Jammalamadugu/Gandikota-Restaurant-Beside-Bharath-Petroleum-Beside-Government-Degree-Collegebehind-Palur/9999P8560-8560-230607130203-S4S5_BZDET/amp',
    'https://gandikotacanyon.business.site/'
  ],
  'mixed',
  false,
  NULL
);

-- ====== pulicat-lake ======
INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try,
  price_range, price_per_head_inr, why_it_matters, insider_tip,
  signature_address, source_urls, vegetarian, is_legendary, established_year
) VALUES (
  'pulicat-lake',
  'Sri Komala Vilas Pure Veg Hotel',
  'Sullurpeta (35km AP-side gateway, near Police Station)',
  'casual',
  ARRAY['South Indian','Tamil','Andhra'],
  'Filter coffee + masala dosa + unlimited mini meals (Tamil-Andhra border style)',
  ARRAY['Masala dosa','Mini meals','Filter coffee','Idli vada','Paneer butter masala'],
  '₹',
  int4range(80, 201),
  'Pulicat village itself has only fishermen co-op fish-fry stalls + Sri Lakshmi tiffin — for a clean sit-down vegetarian stop you backtrack to Sullurpeta, the AP-side gateway where every NH16 traveller hitting ISRO Sriharikota or the lake stops. Sri Komala Vilas has 3195 Restaurant Guru reviews (the densest footprint in town), runs self-service, and is independent — not a branch of the Nellore Komala Vilas chain.',
  'Pre-dawn coffee stop before the Pulicat 6 AM flamingo boats (Nov-Mar) — they open early. Mini meals are cheaper and tastier than the special; gongura pickle is the giveaway it''s actually local-sourced. Cash + UPI both work; no card.',
  'Near Police Station, GNT Road, Sullurpeta, Tirupati district, Andhra Pradesh 524121',
  ARRAY[
    'https://restaurant-guru.in/Sri-Komala-Vilas-Pure-veg-Hotel-Sullurupeta',
    'https://in.worldorgs.com/catalog/sullurupeta/night-club/sri-komala-vilas-pure-veg-hotel',
    'https://www.zomato.com/sullurpeta/sri-komala-vilas-3-sullurpeta-locality/order'
  ],
  'pure-veg',
  false,
  NULL
);

-- ====== HS LOCKS ======
-- lambasingi: 2 eats (existing APTDC + Roadside Bamboo). Genuine HS — no in-village
-- named restaurant footprint exists on Tripadvisor/Zomato/Restaurant Guru as of
-- May 2026. Chintapalli (20km gateway) similarly thin. Existing eats already cover
-- the realistic anchor set; +1 would require fabrication.
