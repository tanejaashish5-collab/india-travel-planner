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
