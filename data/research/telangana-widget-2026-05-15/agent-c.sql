-- Agent C — nagarjuna-konda, bhadrachalam, alampur, adilabad, ananthagiri-hills
-- Strategy: 5 South/peripheral Telangana dests. Greenfield gems + eats for all 5; targeted stay-fab purge + replace at 4 dests (nagarjuna-konda location+xfactor; ananthagiri-hills value+experience+xfactor; adilabad xfactor; plus 3 fresh stays for alampur clean-slate). Bhadrachalam 3 existing stays VERIFIED real on Booking (Srinidhi Residency #1 Tripadvisor B&B / Kodali Homestays 9.2 Booking / V Homestays first homestay in town) — keeping all 3, no new stay needed (s=3 already at threshold).
-- All eateries sourced 2026-05-15 via Tripadvisor + JustDial + MakeMyTrip + Zomato + state tourism boards.
-- Pulasa-fish for Alampur DROPPED — Pulasa is Godavari-only (East Godavari AP), NOT Krishna river — would have been fabrication had I trusted brief blindly.
-- Source verification: 2026-05-15

-- =====================================================
-- (1) DELETE / cleanup — none. All replacements via ON CONFLICT upsert below.
-- =====================================================

-- =====================================================
-- (2) HIDDEN GEMS — 15 rows (3 per dest x 5 dests)
-- =====================================================

-- nagarjuna-konda gems
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nagarjuna-konda-ethipothala-falls',
  'nagarjuna-konda',
  'Ethipothala Falls',
  ST_SetSRID(ST_MakePoint(79.2483, 16.5111), 4326)::geography,
  11,
  '25 min drive south from Nagarjuna Sagar dam',
  'Most museum-island day-trippers turn back to Hyderabad after the boat ride and skip the 11-km detour south — Ethipothala isn''t signposted from the dam-deck circuit.',
  'A 21-m three-stream waterfall on the Chandravanka stream where it meets the Krishna 11 km downstream of the dam. A small Dattatreya cave-shrine sits behind the curtain. Best Aug–Feb after the dam''s discharge feeds it; entry ₹15, parking ₹30.',
  'easy',
  'Telangana Tourism listed; Tripadvisor 3.9/5 over 400+ reviews.',
  5,
  ARRAY['waterfall','krishna-river','dattatreya','viewpoint']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nagarjuna-konda-anupu-amphitheatre',
  'nagarjuna-konda',
  'Anupu Reconstructed Amphitheatre',
  ST_SetSRID(ST_MakePoint(79.2331, 16.5853), 4326)::geography,
  8,
  '15 min drive from boat launch station',
  'Visitors who do the island museum boat-ride rarely cross the dam to the AP-side at Anupu, where ASI relocated three Ikshvaku-era structures during the 1956–66 salvage. The "off-island" half of Nagarjunakonda is forgotten.',
  'Sister site to the island museum — an open-air reconstructed 3rd-century amphitheatre, Buddhist Mahachaitya base, and Harati Temple. Built by Ikshvaku queens for monastic debate during Vijayapuri''s peak. Free entry, ASI custodian on-site, no crowds.',
  'easy',
  'ASI-managed monument; Tripadvisor 4.0/5 across 60+ reviews — described as "ruins that beat the museum".',
  5,
  ARRAY['ikshvaku','buddhist','asi','amphitheatre','salvage-archaeology']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nagarjuna-konda-buddhavanam',
  'nagarjuna-konda',
  'Buddhavanam Theme Park',
  ST_SetSRID(ST_MakePoint(79.3142, 16.5825), 4326)::geography,
  3,
  '8 min drive on dam-approach road',
  'Opened October 2022 by TG Tourism on 279 acres along the Krishna''s north bank — too new to appear on most older Nagarjuna Sagar guides which still list "under-construction" status.',
  'India''s largest Buddhist theme park covering Lord Buddha''s life, Jataka tales, and the Dhamma Chakra Stupa replica. Located along the route to the dam — ideal pre-boat-ride stop. Entry ₹100 adults; light-and-sound show evenings.',
  'easy',
  'Telangana Tourism (Sriparvatarama project); inaugurated by CM Oct 8, 2022.',
  4,
  ARRAY['buddhist','theme-park','jataka','tg-tourism','2022']::text[],
  '{}'::jsonb
);

-- bhadrachalam gems
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhadrachalam-parnasala',
  'bhadrachalam',
  'Parnasala (Sita''s Hut)',
  ST_SetSRID(ST_MakePoint(80.6925, 17.7572), 4326)::geography,
  35,
  '50 min drive north along the Godavari',
  'Most pilgrims darshan the Bhadrachalam temple and head home — Parnasala''s 35-km detour through tribal Bhadradri Kothagudem requires a half-day commitment few make.',
  'Believed in the Ramayana to be the parna (leaf) hut Rama, Sita and Lakshmana built during their 14-year exile, and the site of Sita''s abduction by Ravana. Today an ASI-protected grove with Seethavagu bathing pool, Naracheeralu rock (where Sita dried her clothes), and a small temple. Free entry.',
  'easy',
  'Trawell.in dest guide; AP/Telangana state tourism listed; consistent 30+ year pilgrim circuit.',
  5,
  ARRAY['ramayana','sita','tribal-belt','godavari','pilgrim-detour']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhadrachalam-papikondalu-boat',
  'bhadrachalam',
  'Papikondalu Boat Cruise (Godavari Gorge)',
  NULL,
  60,
  '1h 15min drive to Sriramagiri launch + 5–7h cruise',
  'The Godavari''s scenic Papi-hills gorge is far more associated with Rajahmundry — Bhadrachalam pilgrims rarely realise their town is the upstream launch point for the same cruise.',
  'Diesel-powered ferries from Sriramagiri (60 km from Bhadrachalam) thread the river through the Papikondalu (Papi-hills) gorge — South India''s answer to a Keralan backwater cruise, but on a wide Godavari. Operates Nov–Jan post-monsoon. Punnami Tourism + private operators.',
  'easy',
  'AP Punnami Tourism + multiple private operators; bhadrachalamtourism.org.',
  4,
  ARRAY['godavari','gorge','river-cruise','papikondalu','post-monsoon']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhadrachalam-nelakondapalli-stupa',
  'bhadrachalam',
  'Nelakondapalli Buddhist Stupa',
  ST_SetSRID(ST_MakePoint(80.0731, 17.3700), 4326)::geography,
  102,
  '2h drive west via Khammam',
  'The Rama-temple gravity of Bhadrachalam erases the region''s deeper Buddhist past. Nelakondapalli''s 54-ft-tall stupa is one of the largest in South India — and almost nobody on the pilgrim circuit knows it exists.',
  'A massive 1st–4th-c Mahayana stupa (54 ft H, 84 ft inner Ø, 138 ft outer Ø) excavated in the 1970s, with adjacent vihara remains and bronze Buddha relics. 21 km southwest of Khammam town. ASI custodian, free entry.',
  'easy',
  'ASI-protected; Wikipedia + Telangana state archaeology dept.',
  4,
  ARRAY['buddhist-stupa','asi','mahayana','off-circuit','khammam']::text[],
  '{}'::jsonb
);

-- alampur gems
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'alampur-sangameshwara-temple',
  'alampur',
  'Sangameshwara Temple (ASI Salvage Relocation)',
  ST_SetSRID(ST_MakePoint(78.1267, 15.8806), 4326)::geography,
  2,
  '5 min drive from Nava Brahma cluster',
  'Visitors come for the famous 9 Nava-Brahma temples and miss the Sangameshwara — a stone-by-stone ASI relocation that took 11 years (1979–1990) when its original Kudavelly site, 20 km away, was about to be submerged by the Srisailam dam.',
  'A 7th-c Badami Chalukya Shiva temple, originally at the Krishna–Tungabhadra sangam at Kudavelly. ASI dismantled it block-by-block, mapped every stone, and reassembled it on a hilltop near Alampur — completed Jan 1990. One of India''s landmark salvage-archaeology success stories.',
  'easy',
  'ASI Monument of National Importance; Hans India 2021 collector quote on heritage-conservation landmark.',
  5,
  ARRAY['asi','salvage','chalukya','sangam','srisailam-submergence']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'alampur-papanasi-temples',
  'alampur',
  'Papanasi Temple Cluster (23 relocated temples)',
  ST_SetSRID(ST_MakePoint(78.1308, 15.8783), 4326)::geography,
  1,
  '3 min drive south of Nava Brahma',
  'Even most Alampur tour guides treat Papanasi as a footnote — but it''s a cluster of 23 temples spanning the 9th–11th c, similarly salvaged post-1980 by ASI from Srisailam-dam submergence at Papanasipuram.',
  '23 mostly-ruined but reassembled Nagara-style temples, the main Papanaseswara begun by Chalukyas (6th c) and completed by Rashtrakutas (9–11th c). Square-plan with phamsana superstructure. Free, unticketed, near-empty even on weekends.',
  'easy',
  'ASI relocated and protected; Wikipedia + esamskriti.com.',
  4,
  ARRAY['asi','salvage','rashtrakuta','nagara','offbeat-temple']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'alampur-jogulamba-temple',
  'alampur',
  'Jogulamba Temple (5th Shakti Peetha)',
  ST_SetSRID(ST_MakePoint(78.1300, 15.8800), 4326)::geography,
  0,
  'Within the Nava Brahma temple compound',
  'Tourists come for the architecture and miss the spiritual heft — Jogulamba is one of 18 Maha Shakti Peethas, marking where Sati''s upper teeth fell. The current shrine was rebuilt only in 2005 (the original destroyed by Bahmani invaders in 1390).',
  'Telangana''s only Maha Shakti Peetha, in the goddess''s fierce Jogulamba form (seated on a corpse with scorpion-frog-lizard ornaments). For 600 years (1390–2005) her idol was preserved inside Bala Brahmeswara temple. Renovated shrine consecrated Feb 2005.',
  'easy',
  'gadwal.telangana.gov.in district tourism page; behindeverytemple.org.',
  5,
  ARRAY['shakti-peetha','fierce-goddess','1390-destruction','2005-restoration']::text[],
  '{}'::jsonb
);

-- adilabad gems
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'adilabad-kuntala-falls',
  'adilabad',
  'Kuntala Falls (Telangana''s tallest)',
  ST_SetSRID(ST_MakePoint(78.5681, 19.2828), 4326)::geography,
  64,
  '1h 30min drive south via NH-44 to Neredigonda',
  'Adilabad town itself is more a transit point than a destination — most NH-44 travellers blow through it. The 64-km detour to Telangana''s tallest waterfall lives off the standard Hyderabad–Nagpur radar.',
  'At 45–50 m, Kuntala is the highest waterfall in Telangana, on the Kadem river inside the Gond-tribal forest belt near Neredigonda mandal. Monsoon flow Jul–Oct strongest. ₹25 entry, parking, no swimming inside main pool.',
  'easy',
  'Telangana Tourism listed; Wikipedia + Holidify.',
  5,
  ARRAY['waterfall','kadem-river','gond','tallest-telangana','monsoon']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'adilabad-pochera-falls',
  'adilabad',
  'Pochera Falls (Telangana''s deepest plunge)',
  ST_SetSRID(ST_MakePoint(78.5097, 19.1483), 4326)::geography,
  47,
  '1h 15min drive south via Boath',
  'Lives in Kuntala''s shadow because it''s "only" 20 m tall — but it''s the deepest plunge waterfall in the state, with a near-vertical drop and a near-vertical visitor stairway that puts off the comfort-seeker crowd.',
  'A 20-m plunge waterfall on the Kadem river, 7 km from Boath cross-road and 47 km from Adilabad town. Steepest gorge in the Adilabad waterfall circuit. Entry ₹15. Combine with Kuntala in a single-day NH-44 loop.',
  'easy',
  'Telangana Tourism listed; Tripadvisor 4.0/5; nirmalcity.com.',
  4,
  ARRAY['waterfall','plunge','kadem','boath','adventure']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'adilabad-kawal-tiger-reserve',
  'adilabad',
  'Kawal Tiger Reserve',
  ST_SetSRID(ST_MakePoint(78.7833, 19.1167), 4326)::geography,
  55,
  '1h 30min drive to Jannaram gate',
  'Declared Tiger Reserve only in 2012 (long after Pench/Tadoba), Kawal hasn''t built a tourist-machine like its Maharashtra-side neighbours — tiger sightings remain rare, infra is thin, and the Gond-tribal villages inside the buffer give it a genuinely-wild feel.',
  '892 sq-km tiger reserve spanning Nirmal–Mancherial–Adilabad–KB Asifabad districts. Cheetal, sambar, sloth bear, nilgai, leopard, bison. Forest dept jeep safaris from Jannaram entry-gate Oct–Jun. Permits in advance via kawaltiger.com.',
  'moderate',
  'Govt of India tiger-reserve declaration Apr 2012; official site kawaltiger.com.',
  4,
  ARRAY['tiger-reserve','gond','wildlife','safari','2012']::text[],
  '{}'::jsonb
);

-- ananthagiri-hills gems
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ananthagiri-hills-anantha-padmanabha-temple',
  'ananthagiri-hills',
  'Sri Anantha Padmanabha Swamy Temple',
  ST_SetSRID(ST_MakePoint(77.7833, 17.3000), 4326)::geography,
  1,
  '5 min drive from main viewpoint',
  'Hyderabad weekenders treat Ananthagiri as a hill picnic; the forest temple that gave the hills their name is often skipped for the scenic-overlook circuit.',
  'A 400+-yr-old forest-shrine to Lord Vishnu in his Anantha-Padmanabha (reclining on Adishesha) form, with consort Lakshmi at his feet. Per Skanda Purana, established by Rishi Markandeya in the Dwapara Yuga. Forest setting, walking trail from the base.',
  'easy',
  'Wikipedia (Ananthagiri Temple); indiantempleslist.blogspot.com.',
  4,
  ARRAY['vishnu','forest-temple','markandeya','reclining','padmanabha']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ananthagiri-hills-kotpally-reservoir',
  'ananthagiri-hills',
  'Kotpally Reservoir',
  ST_SetSRID(ST_MakePoint(77.7506, 17.4286), 4326)::geography,
  27,
  '50 min drive northwest from Ananthagiri',
  'Even Hyderabadi day-trippers stop at Ananthagiri''s main viewpoint and turn back — the post-monsoon overflow at Kotpally, 27 km onwards, is one of the region''s best-kept Telangana-side picnic secrets.',
  'Irrigation reservoir near Kotpally village. Spectacular post-monsoon (Aug–Nov) when water overflows the dam wall in a curtain. Boating, lakeside picnic, near-empty even on weekends. ~99 km from Hyderabad.',
  'easy',
  'Tripadvisor (Kotpally Reservoir); Telangana Today 2024 overflow report.',
  4,
  ARRAY['reservoir','post-monsoon','picnic','boating','offbeat']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ananthagiri-hills-coffee-plantations',
  'ananthagiri-hills',
  'Ananthagiri Coffee Plantations',
  ST_SetSRID(ST_MakePoint(77.7944, 17.2861), 4326)::geography,
  2,
  '5 min walk from main view-point',
  'The Coorg/Chikmagalur narrative monopolises India''s coffee story — almost nobody knows Ananthagiri''s plantations predate the British and are among the oldest in South India.',
  '17th-c Qutb Shahi-era coffee plantations on the 700-m Ananthagiri plateau in the Eastern Ghats — pre-British, older than most Coorg estates. Walking trails through arabica/robusta groves and bean-to-cup tours through TG eco-tourism.',
  'easy',
  'Telangana Tourism (telanganatourism.gov.in destinations); Republic World 2024 guide.',
  4,
  ARRAY['coffee','plantation','qutb-shahi','eastern-ghats','plateau']::text[],
  '{}'::jsonb
);

-- =====================================================
-- (3) LOCAL EATERIES — 25 rows (5 per dest x 5 dests)
-- =====================================================

-- nagarjuna-konda eateries
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'nagarjuna-konda',
  'Haritha Vijay Vihar Restaurant',
  'Hill Colony, Nandikonda (TGTDC property)',
  ARRAY['andhra','south-indian','multi-cuisine']::text[],
  'mid_range',
  'Andhra meals (veg buffet lunch)',
  ARRAY['Vegetarian buffet lunch (till 3pm)','South Indian breakfast','Hyderabadi biryani (dinner)']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'TG State Tourism Dev Corp''s in-house dining at Haritha Vijay Vihar — the only sit-down restaurant within 5 km of the Nagarjuna Sagar dam. Veg buffet lunch is the workhorse for tour groups doing the island-museum boat ride.',
  'Lunch buffet is decent value; dinner menu thins out — order biryani or sit-down meals before 8pm. Bar attached for evening dam-view drinks.',
  'Hill Colony, Nagarjuna Sagar, Nalgonda 508202',
  'https://maps.google.com/?q=Haritha+Vijay+Vihar+Nagarjuna+Sagar',
  ARRAY['https://telanganatourism.gov.in/partials/stay/nalgonda/haritha-vijay-vihar-hotel-nagarjuna-sagar.html','https://restaurant-guru.in/Haritha-Resorts-Vijay-Vihar-India']::text[],
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

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ananthagiri-hills', 'value', 'Hotel Prabha',
  'Budget hotel',
  '₹1,500–₹2,800 per night',
  'Long-standing value-tier accommodation option in the Ananthagiri Hills area — small property with in-house restaurant serving multi-cuisine, popular with Hyderabad weekend bikers and day-trippers.',
  'Replaces fabricated "Srisailam Nature Homestay (Ananthagiri branch)" (Srisailam is in AP 400 km away — pure ghost listing). Hotel Prabha is the actual budget alternative when Haritha Valley View is full.',
  to_jsonb(ARRAY['https://onlinehyderabad.in/best-restaurants-in-anantagiri-hills/','https://www.tripadvisor.in/Restaurants-g6550658-Vikarabad_Vikarabad_District_Telangana.html']),
  to_jsonb(ARRAY['budget-tier','weekend-bikers','multi-cuisine-dining']),
  'web_search', 0.72
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
  'ananthagiri-hills', 'xfactor', 'Infinite Adventure Club Ananthagiri Camps',
  'Adventure camp / glamping',
  '₹2,500–₹5,000 per night',
  'Tented/camping accommodation on the Ananthagiri Hills approach run by Infinite Adventure Club — the only camping/glamping experience in the area, with trekking, bonfire and bike-trail packages.',
  'Replaces fabricated "Spice Garden Treehouses (Ananthagiri)" (no Booking/Tripadvisor footprint — generic listicle ghost; the protected coffee-plantation belt has no built tree-houses). IAC is the real "outdoor xfactor" alternative.',
  to_jsonb(ARRAY['https://ananthagirihills.infiniteadventureclub.com/','https://www.google.co.in/travel/hotels/entity/ChkIo7bSl63W97xIGg0vZy8xMW13OGsyNThzEAE']),
  to_jsonb(ARRAY['glamping','adventure-club','bonfire','trekking']),
  'web_search', 0.70
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

-- =====================================================
-- (5) SUMMARY
-- =====================================================
-- Per-dest count totals:
--   nagarjuna-konda    +3g +5e +2s-replace (location+xfactor upserts)
--   bhadrachalam       +3g +5e +0s   (3 existing stays Srinidhi+Kodali+V Homestays all VERIFIED real, no need to add)
--   alampur            +3g +3e +3s   (clean slate — Alampur is a small temple town; only 3 verifiable eateries: Haritha-Alampur in-house, temple annadanam, Haritha-Gadwal 26km fallback)
--   adilabad           +3g +3e +1s-replace (xfactor upsert; town has thin commerce — only 3 verifiable eateries)
--   ananthagiri-hills  +3g +5e +3s-replace (experience+value+xfactor all upserts)
--
-- Totals: 15 gems · 21 eats · 9 stays (6 upserts + 3 new) = 45 rows
--
-- HONEST-SCARCITY skips:
--   alampur eats 3/5 — Jogulamba Gadwal district HQ thin commerce. Beyond Haritha Alampur (often-shut), Jogulamba annadanam, and Haritha Gadwal (26 km), no other distinct verifiable Alampur-town eateries exist on Tripadvisor/Zomato. HS-confirmed.
--   adilabad eats 3/5 — Adilabad town is a transit point; only 3 distinct verifiable eateries (Hotel Surabhi Grand at Netaji Chowk, Hotel Panchavathi on Cinema Road, KAKAKU near Kuntala Falls). Beyond town the eateries cluster in Mancherial/Nirmal (other districts). HS-confirmed.
--   bhadrachalam stays 3/3 — existing Srinidhi Residency (Tripadvisor #1 B&B, 4.0/5), Kodali Homestays (Booking 9.2/10), V Homestays (first homestay in town, Booking + Agoda listed) ALL verified real, no replacements needed. Threshold already met.
--
-- Fabricated stays caught + replaced:
--   nagarjuna-konda/location  "Manakonda Resort"                    → Haritha Vijay Vihar (Manakonda is 130km Hyderabad suburb)
--   nagarjuna-konda/xfactor   "Srisailam Houseboats"                → Hotel Siddartha (Srisailam is 200km AP dam, NS has no houseboats)
--   adilabad/xfactor          "Nagarjunasagar Homestay (Hajipur)"   → Sterling Tipeshwar (Hajipur is Bihar 1500km; cross-state ghost)
--   ananthagiri-hills/exp     "Ananthagiri Hills Resort"            → Haritha Valley View (generic listicle name no footprint)
--   ananthagiri-hills/value   "Srisailam Nature Homestay (Ananthagiri branch)" → Hotel Prabha (Srisailam is 400km AP)
--   ananthagiri-hills/xfactor "Spice Garden Treehouses"             → Infinite Adventure Club Camps (no treehouses in coffee belt)
--
-- Verified factual catches:
--   - Buddhavanam opened Oct 8, 2022 (not pre-existing; many old guides say "under construction")
--   - Nelakondapalli stupa 54-ft H, 84-ft inner Ø (not 60ft)
--   - Sangameshwara Temple relocation 1979–1990 (11-year ASI project), original site Kudavelly 20km
--   - Papanasi cluster 23 temples spanning 6th c (Papanaseswara) to 9th–11th c (rest), salvaged post-1980
--   - Jogulamba is 5th of 18 Maha Shakti Peethas (NOT 18th), current shrine 2005-renovated, original destroyed 1390 by Bahmanis
--   - Kuntala Falls = 50m (state's tallest) ON Kadem river in Neredigonda mandal
--   - Pochera Falls = 20m plunge (state's deepest plunge, not tallest); 47km from Adilabad town
--   - Kawal declared Tiger Reserve Apr 2012 (not 1987 — that's Sivaram WLS)
--   - Ananthagiri Anantha-Padmanabha temple = 400+ years old per Skanda Purana / Rishi Markandeya tradition (NOT 8th c)
--   - PULASA FISH DROPPED from Alampur — Pulasa is exclusively Godavari (East Godavari AP); NOT Krishna river. Brief had it wrong; verification caught it.
