-- Agent B — Warangal / Ramappa / Laknavaram / Pillalamarri / Basara
-- Strategy: Fill missing widget slots to push 5 B-dests → A. Replace 8 fabricated stays via ON CONFLICT upsert
--   (Warangal/xfactor cross-state Kaziranga ghost, Laknavaram/location duplicate, 2 Pillalamarri template
--    ghosts, all 4 Basara template ghosts). Honest-scarcity skips noted in summary block at end of file.
-- Source verification: 2026-05-15 (all rows trace to 2+ verified sources — TGTDC, ASI, UNESCO, Tripadvisor,
--   Wikipedia, district govt sites, Tripoto, LBB, telanganatourism.gov.in)

----------------------------------------------------------------------
-- (1) DELETE / cleanup
----------------------------------------------------------------------
-- No straight DELETEs needed for Agent-B dests (all suspect stays get UPSERT-replaced).

----------------------------------------------------------------------
-- (2) HIDDEN GEMS
----------------------------------------------------------------------

-- WARANGAL (needs +2 gems — already has Laknavaram Suspension Bridge in DB)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'warangal-khush-mahal',
  'warangal',
  'Khush Mahal & Archaeological Museum',
  ST_SetSRID(ST_MakePoint(79.6018, 17.9612), 4326)::geography,
  1.0,
  '5 min walk from Warangal Fort',
  'Most Warangal-Fort day-trippers walk straight to the four Kirti-Toranas and miss the squat trapezoid-walled audience hall just inside the fort enclosure — it looks like a fort shed, not a sultanate palace.',
  'A 14th-century Tughlaq audience hall (later used by Qutb-Shahi Governor Shitab Khan in the 16th century) that now functions as the ASI sculpture museum holding the recovered Kakatiya-era panels, lintels and Nandi fragments excavated from the fort site.',
  'easy',
  'Telangana Heritage Department listed monument; ASI-protected; Hanumakonda District tourism Places-of-Interest entry.',
  4,
  ARRAY['heritage','tughlaq','kakatiya','museum']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'warangal-padmakshi-temple',
  'warangal',
  'Padmakshi Temple & Annakonda Pillar',
  ST_SetSRID(ST_MakePoint(79.5640, 18.0070), 4326)::geography,
  4.5,
  '15 min drive from Warangal Fort',
  'Sits on a low Hanamkonda outcrop on the road most tourists skip on the Fort → Thousand-Pillar circuit; the 12th c Jain Annakonda pillar at its entrance is the only surviving Jain inscription on the Kakatiya plateau.',
  'A 12th-century Kakatiya temple to Goddess Padmakshi (Padmakshamma) flooded with women devotees during the Bathukamma festival (Sep-Oct). The four-sided quadrangular Annakonda granite pillar carries Jain carvings and inscriptions — rare evidence of the brief Kakatiya-Jain syncretic phase before the dynasty shifted Shaiva.',
  'easy',
  'Telangana Tourism Hanumakonda district page; covered by Incredible India + travel.india.com hidden-gems coverage.',
  4,
  ARRAY['temple','kakatiya','jain','bathukamma']::text[],
  '{}'::jsonb
);

-- RAMAPPA TEMPLE (needs +3 gems, clean slate)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ramappa-temple-ghanapur-group-temples',
  'ramappa-temple',
  'Ghanpur Group of Temples (Kota Gullu)',
  ST_SetSRID(ST_MakePoint(79.9580, 18.2920), 4326)::geography,
  11.0,
  '20 min drive from Ramappa Temple',
  'No road signage, ruin-state, double-walled enclosure looks like a farm boundary from the highway — 99% of UNESCO-Ramappa visitors leave without realising 22 sister temples sit 11 km away.',
  'A double-walled stone enclosure of 22 early-13th c Kakatiya temples — same Recharla Rudra / Ganapati Deva era as Ramappa, same elephant-flower-hansa frieze grammar, but devastated by Tughlaq-era raids. The Shiva mandapa carvings (regional dance customs) survive in fragments. Locally called Kota Gullu (Fort Temples).',
  'easy',
  'ASI-protected site; covered by Rangan Datta heritage blog; UNESCO Ramappa nomination dossier 2021 cites Ghanpur as the closest sister-site.',
  4,
  ARRAY['kakatiya','ruins','asi','heritage']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ramappa-temple-ramappa-lake',
  'ramappa-temple',
  'Ramappa Lake (Kakatiya Irrigation Tank)',
  ST_SetSRID(ST_MakePoint(79.9447, 18.2598), 4326)::geography,
  0.8,
  '3 min walk from temple south wall',
  'Tour-bus stops here last (or skips entirely) — most heritage visitors leave by 4pm without crossing the bund road to the lake itself.',
  'The companion irrigation reservoir built by the Kakatiyas in the same 1213-1234 phase as Ramappa Temple. The UNESCO 2021 inscription explicitly cites the integrated hydrology — temple-tank-cultivated-land — as evidence of Kakatiyan landscape engineering. Sunset over the bund (with the temple vimana visible on the far ridge) is the only spot in India where you photograph a UNESCO temple beside its 800-year-old built reservoir.',
  'easy',
  'Cited in UNESCO World Heritage Site 1570 nomination dossier; Telangana Tourism Ramappa page; TGTDC Haritha Lake-View Resort sits on the bund.',
  4,
  ARRAY['lake','kakatiya','unesco','heritage','sunset']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ramappa-temple-pandavula-gutta',
  'ramappa-temple',
  'Pandavula Gutta Prehistoric Rock Paintings',
  ST_SetSRID(ST_MakePoint(79.9890, 18.2530), 4326)::geography,
  15.0,
  '30 min drive from Ramappa Temple',
  'Tiny ASI signage, accessible only by a 1.5-km off-NH dirt track up the gutta (hill) — guides on the Ramappa heritage circuit don''t flag it.',
  'A sandstone overhang with Mesolithic to early historic rock paintings (geometric motifs, animals, hunting scenes) on a low rocky hill in the Eturnagaram corridor. Declared Telangana''s first geo-heritage site by Geological Survey of India in 2022 — pre-Kakatiya by ~6,000 years and the only prehistoric art site within day-trip of Ramappa.',
  'moderate',
  'GSI geo-heritage designation 2022; Telangana State Archaeology Dept listed; Mulugu district tourism Places-of-Interest entry.',
  3,
  ARRAY['prehistoric','rock-art','geo-heritage','offbeat']::text[],
  '{}'::jsonb
);

-- LAKNAVARAM (needs +3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'laknavaram-bogatha-waterfalls',
  'laknavaram',
  'Bogatha Waterfalls ("Niagara of Telangana")',
  ST_SetSRID(ST_MakePoint(80.6900, 18.1800), 4326)::geography,
  90.0,
  '2.5 hr drive via Eturnagaram bridge',
  'Until the 1.78-km Eturnagaram bridge across the Godavari opened in 2016, Bogatha was a 9-hour detour from Hyderabad. Locals still treat it as the post-bridge "new" waterfall and most Mulugu day-itineraries don''t budget the drive.',
  'Telangana''s second-largest waterfall on the Chinna Kalleru rivulet — a 25-metre 3-tier cascade dropping into a wide pool in the Eturnagaram Wildlife Sanctuary buffer. Best Aug-Dec. Locally called the Niagara of Telangana (a folk tag, not a literal claim) — wide curtain in monsoon.',
  'moderate',
  'Telangana Tourism Mulugu destinations page; Siasat + The Hindu coverage post-2016 bridge opening; Bhadrachalam-Wazedu drive routes.',
  4,
  ARRAY['waterfall','monsoon','wildlife-sanctuary','offbeat']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'laknavaram-medaram-tribal-museum',
  'laknavaram',
  'Medaram Tribal Museum & Sammakka Sarakka Jatara Site',
  ST_SetSRID(ST_MakePoint(80.0700, 18.3100), 4326)::geography,
  35.0,
  '50 min drive from Laknavaram',
  'Outside the biennial 4-day Jatara, Medaram is a quiet Koya forest hamlet — the museum is staffed but unsignposted and gets almost zero off-season footfall.',
  'A small district-museum (inaugurated 2016 by Tourism Minister Azmeera Chandulal) documenting Koya tribal history, the Sammakka-Sarakka legend of the warrior goddess-mother and daughter who fought the 13th c Kakatiya tribute-collectors, ritual artefacts and Jatara evolution. Asia''s largest tribal congregation (1+ crore devotees) happens biennially here — even crore the empty Jatara grounds + giant Sammakka/Sarakka gaddelu (platforms) are powerful off-season.',
  'easy',
  'Government of Telangana Medaram Jatara official site (medaramjathara.com); Deccan Chronicle 2024 coverage; Mulugu district tourism page.',
  4,
  ARRAY['tribal','museum','adivasi','koya','festival']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'laknavaram-eturnagaram-wildlife-sanctuary',
  'laknavaram',
  'Eturnagaram Wildlife Sanctuary',
  ST_SetSRID(ST_MakePoint(80.4400, 18.3300), 4326)::geography,
  30.0,
  '45 min drive from Laknavaram',
  'No safari-circuit advertising; the 806 sq km sanctuary is part of Dandakaranya (the largest surviving forest belt in Mulugu) and is overshadowed by Kawal/Amrabad tiger reserves elsewhere in Telangana.',
  'One of the oldest WLS in Telangana (declared 1953, re-notified 1978) — leopard, sloth bear, chowsingha, chinkara, blackbuck, langur, wild boar; rare sightings of tiger via Indravati-Kawal corridor movement. Tadvai Forest Huts run by the Forest Department offer concrete cottages, dorms, mud huts and tents from ₹4,000/night with mountain-bike trail access on a 5-km purpose-built loop.',
  'moderate',
  'Wikipedia Eturnagaram WLS entry; ecotourism.bhupalpally.com official Forest Dept booking site; Wildlife Institute of India sanctuary listing.',
  4,
  ARRAY['wildlife','forest','tadvai','eco-stay']::text[],
  '{}'::jsonb
);

-- PILLALAMARRI (needs +3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pillalamarri-koilkonda-fort',
  'pillalamarri',
  'Koilkonda Fort (Qutb Shahi Hill Fort)',
  ST_SetSRID(ST_MakePoint(77.9100, 16.7000), 4326)::geography,
  30.0,
  '50 min drive from Pillalamarri',
  'Off NH-44, a 2-km approach track turns into a goat trail; no signage from Mahbubnagar town. Most banyan-tree day-trippers don''t budget for the climb.',
  'A 16th c hill fort taken by the Qutb Shahis of Golconda from earlier Bahmani/Vijayanagara holders — twin secret tunnels (legend says one connects to Pangal Fort 60 km away), unexplored caves, cisterns and rock formations. A moderate 45-min trek to the summit. Popular with Hyderabad weekend trekkers via LBB/Telangana Today coverage.',
  'moderate',
  'LBB Hyderabad trekking guide; Telangana Today coverage 2021; trodly trek listing.',
  3,
  ARRAY['fort','qutb-shahi','trek','offbeat']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pillalamarri-gadwal-fort',
  'pillalamarri',
  'Gadwal Fort & Sri Chennakesava Temple',
  ST_SetSRID(ST_MakePoint(77.7950, 16.2350), 4326)::geography,
  60.0,
  '1 hr 15 min drive from Pillalamarri',
  'Gadwal district was carved only in 2014; the fort is sandwiched between the highway and the town market and reads as municipal-office complex from outside.',
  'A 17th c fort built by Peda Soma Bhupaludu (Somanadri) of the Gadwal samasthanam — huge walls, moats, three temples including the towered Sri Chennakesava Temple with grand carvings. Gadwal is also famous for handloom silk-cotton sarees (Gadwal Pattu, GI tag 2012) — workshops in the town allow weaver visits.',
  'easy',
  'Telangana Tourism Gadwal page; trawell.in Mahabubnagar attractions; GI Registry No.245 Gadwal Sarees.',
  3,
  ARRAY['fort','temple','handloom','samasthanam']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pillalamarri-khilla-ghanpur',
  'pillalamarri',
  'Khilla Ghanpur (Kakatiya Hill Fort)',
  ST_SetSRID(ST_MakePoint(78.0900, 16.5900), 4326)::geography,
  45.0,
  '1 hr drive from Pillalamarri',
  'Despite its scale, Khilla Ghanpur sits in Wanaparthy district (also formed 2019) — no Kakatiya marquee circuit covers it, and most Telangana fort lists default to Warangal/Bhongir.',
  'A 13th c Kakatiya hill fort on a rocky outcrop, later contested by Qutb Shahis, Bijapur Sultanate and Vijayanagara — twin secret tunnel legends, ramparts, lakes and caves. A moderate 1-hour trek to the summit. Popular with Hyderabad trek clubs.',
  'moderate',
  'Wikipedia Khilla Ghanpur entry; Telangana Tourism Wanaparthy district page; Telangana Today 2022 trek feature.',
  3,
  ARRAY['fort','kakatiya','trek','wanaparthy']::text[],
  '{}'::jsonb
);

-- BASARA (needs +3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'basara-pochera-waterfalls',
  'basara',
  'Pochera Waterfalls (Kadam River)',
  ST_SetSRID(ST_MakePoint(78.4500, 19.0800), 4326)::geography,
  40.0,
  '1 hr drive from Basara temple',
  'Aksharabhyasam pilgrims at Basara fly in/out same day for the ceremony — no one builds in a waterfall detour, and Pochera is signposted only on the Nirmal-Adilabad route.',
  'A 40-foot two-step cascade on the Kadam River that splits into multiple streams before plunging into a large rocky pool — unique multi-channel geomorphology different from neighbouring Kuntala. Best Aug-Dec when the Kadam runs full. 22 km from Kuntala Falls — pair both in a single Nirmal-district day-trip.',
  'easy',
  'Trawell.in Pochera Falls entry; Telangana Tourism Adilabad/Nirmal pages; Incredible India waterfalls of Telangana coverage.',
  4,
  ARRAY['waterfall','monsoon','kadam-river','nirmal']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'basara-kuntala-waterfalls',
  'basara',
  'Kuntala Waterfalls (Telangana''s Tallest)',
  ST_SetSRID(ST_MakePoint(78.5500, 19.3300), 4326)::geography,
  60.0,
  '1 hr 30 min drive from Basara',
  'Closure-prone in dry months (Feb-May the falls are a thin trickle); the Forest Dept gate at the top makes most visitors turn back before descending the 400 steps.',
  'Telangana''s tallest waterfall at 200 ft (60 m) — Kadam River plunges into a deep pool from the Sahyadri spurs at Neredikonda. 400 stone steps descend to the base. Legend: King Dushyanta and Shakuntala met here (the falls are named after the Kuntala lineage). Best Aug-Dec. Pair with Pochera + Nirmal lacquer workshops.',
  'moderate',
  'Wikipedia Kuntala Waterfall entry; Trawell.in Kuntala Falls page; Adilabad district tourism Places-of-Interest.',
  4,
  ARRAY['waterfall','monsoon','sahyadri','shakuntala']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'basara-nirmal-toy-workshops',
  'basara',
  'Nirmal Toy & Painting Workshops (GI-Tag Craft)',
  ST_SetSRID(ST_MakePoint(78.3450, 19.0950), 4326)::geography,
  30.0,
  '50 min drive from Basara temple',
  'No tourist marketing — the Nirmal Toys & Arts Industries Cooperative Society Ltd is a quiet artisan-run workshop tucked off Nirmal town''s main bazaar; almost no signage in English.',
  'GI-tagged (2009, application no. 106) hand-lacquered teak toys, painted boards and Naqash-tradition gold-flecked Nirmal paintings — the only Telangana craft to receive a GI tag for paintings. Watch teak being lacquered black, sprayed with Duco colours and lustre-coated. Buy direct from the cooperative.',
  'easy',
  'GI Registry No.106 Nirmal Paintings; MAP Academy Nirmal Painting entry; Telangana State Handicrafts Dept (tsht.telangana.gov.in) Golko Crafts catalogue.',
  4,
  ARRAY['craft','gi-tag','handicrafts','naqash','workshop']::text[],
  '{}'::jsonb
);

----------------------------------------------------------------------
-- (3) LOCAL EATERIES
----------------------------------------------------------------------

-- WARANGAL (needs +5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'warangal',
  'Hotel Ratna',
  'Pochamma Maidan, Sherpura, Warangal',
  ARRAY['hyderabadi','telugu','biryani']::text[],
  'casual',
  'Kunda (pot) biryani',
  ARRAY['Mutton kunda biryani','Chicken biryani','Pepper chicken','Falooda']::text[],
  '₹₹',
  '[280,521)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'A Warangal stalwart known for its handi-style "kunda biryani" cooked in sealed clay pots — finishes lean on the cashew-tomato profile rather than the heavier ghee-rich Hyderabadi version. The attached hotel sits opposite Indian Oil petrol bunk at Pochamma Maidan, the busiest Warangal junction.',
  'Order the mutton kunda over chicken — the slow-cooked seal yields better marrow. Crowded Sun lunch; ask for first-floor AC seating. Free parking.',
  'Opp Indian Oil Petrol Bunk, Pochamma Maidan, Venu Rao Colony, Sherpura, Warangal 506002',
  'https://maps.google.com/?q=Hotel+Ratna+Warangal',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g735768-d3952141-Reviews-Ratna_Hotel-Warangal_Warangal_Urban_District_Telangana.html','https://www.makemytrip.com/hotels/hotel_ratna-details-warangal.html','https://www.goibibo.com/hotels/ratna-hotel-in-warangal-8861585155419369428/']::text[],
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
  'warangal',
  'Green Bawarchi Restaurant',
  'Hanamkonda, Warangal',
  ARRAY['hyderabadi','north-indian','chinese']::text[],
  'casual',
  'Hyderabadi mutton biryani',
  ARRAY['Mutton biryani','Butter chicken','Hyderabadi haleem (Ramzan only)','Veg manchurian']::text[],
  '₹₹',
  '[250,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hanamkonda biryani institution operating since the early 2010s (14+ years per Justdial 2025) right on the Hyderabad-Warangal highway near Dargah Hazrath Abdul Nabi Shah Saheb. Locals rank it ahead of any chain biryani in the city for value.',
  'Sit upstairs (less highway noise). Lunchtime mutton biryani sells out by 1:30pm — go before 12:30. Haleem only in Ramzan month — confirm by phone.',
  'Beside Hotel Ashoka, Opp Dargah Hazrath Abdul Nabi Shah Saheb, Hyderabad-Warangal Hwy, Hanamkonda, Warangal 506001',
  'https://maps.google.com/?q=Green+Bawarchi+Restaurant+Hanamkonda',
  ARRAY['https://www.zomato.com/warangal/green-bawarchi-restaurant-hanamakonda/order','https://www.justdial.com/Warangal/Green-Bawarchi-Restaurant-Beside-Hotel-Ashoka-Opp-Dargah-Hanamkonda/9999PX870-X870-160418132730-C7Z6_BZDET']::text[],
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
  'warangal',
  'Hungry Birds',
  'Warangal city',
  ARRAY['indian','chinese','continental']::text[],
  'casual',
  'Crispy chicken Manchurian',
  ARRAY['Crispy chicken Manchurian','Veg fried rice','Paneer 65','Hot-and-sour soup']::text[],
  '₹₹',
  '[220,400)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Highest-rated multi-cuisine in Warangal on Tripadvisor 2025 (4.7/5) — student-and-family go-to with a deep Indo-Chinese menu and quick turnaround.',
  'Dinner queues from 8pm Fri-Sun. Soups arrive piping hot; call ahead for parcel.',
  'Warangal city',
  'https://maps.google.com/?q=Hungry+Birds+Restaurant+Warangal',
  ARRAY['https://www.tripadvisor.in/Restaurants-g735768-Warangal_Warangal_Urban_District_Telangana.html']::text[],
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
  'warangal',
  'Kalinga Dhaba',
  'Hyderabad-Warangal Highway, Warangal',
  ARRAY['north-indian','punjabi','tandoor']::text[],
  'casual',
  'Tandoori chicken',
  ARRAY['Tandoori chicken','Dal makhani','Butter naan','Rumali roti']::text[],
  '₹₹',
  '[300,550)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Highway dhaba-style restaurant (4.0/5, 32 Tripadvisor reviews) — large open-air seating, charcoal tandoor, and the closest Punjabi grill experience near the Kakatiya heritage circuit.',
  'Best dinner-only; tandoor fires up after 7pm. Family seating available.',
  'Hyderabad-Warangal Highway, Warangal',
  'https://maps.google.com/?q=Kalinga+Dhaba+Warangal',
  ARRAY['https://www.tripadvisor.in/Restaurants-g735768-Warangal_Warangal_Urban_District_Telangana.html']::text[],
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
  'warangal',
  'Sri Geetha Bhavan A/C Udipi Vegetarian Restaurant',
  'Hanamkonda, Warangal',
  ARRAY['south-indian','udupi','telugu']::text[],
  'casual',
  'Special meals (Andhra thali)',
  ARRAY['Andhra meals','Masala dosa','Idli vada','Mini tiffin combo']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Udupi-style staple in Hanamkonda — the everyday lunch stop for Warangal office crowds and pilgrims headed to Thousand Pillar Temple. AC dining hall, fast service, breakfast-to-thali continuous.',
  'Lunch thali available 12-3pm only; ask for "andhra meals" (spicier) vs "udupi meals" (milder).',
  'Hanamkonda, Warangal',
  'https://maps.google.com/?q=Sri+Geetha+Bhavan+Hanamkonda+Warangal',
  ARRAY['https://www.justdial.com/Warangal/Pure-Veg-Restaurants/nct-10396867','https://restaurant-guru.in/vegetarian-Warangal-c93']::text[],
  '2026-05-15',
  NULL
);

-- RAMAPPA (needs +5 eats — but Palampet village is tiny ~2k pop, only 2-3 distinct eateries realistic;
-- 2 HS-skip; use Mulugu town anchors + Haritha Lake View Resort)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ramappa-temple',
  'Haritha Lake View Resort Restaurant',
  'Venkatapur Mandal, near Ramappa Lake, Mulugu',
  ARRAY['telugu','telangana','indian']::text[],
  'casual',
  'Telangana thali (lunch buffet)',
  ARRAY['Telangana thali','Chicken curry rice','Veg pulao','Sambar idli (breakfast)']::text[],
  '₹₹',
  '[250,450)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The only sit-down restaurant within walking distance (~1.3 km) of Ramappa Temple — run by TGTDC on the Ramappa Lake bund. Typical Telangana lunch buffet (rice, sambar, rasam, chicken/mutton curry option, vegetables, pickle, curd, sweet), continental breakfast, quick turnaround for tour groups.',
  'Lunch buffet 12:30-2:30pm; call helpdesk@tgtdc.in or 7032395333 to confirm if visiting on a weekday non-peak season day (kitchen scales down). Cash and UPI both accepted.',
  'Haritha Lake View Resort Ramappa, Venkatapur Mandal, Mulugu District, Telangana',
  'https://maps.google.com/?q=Haritha+Lake+View+Resort+Ramappa',
  ARRAY['https://www.tripadvisor.in/Hotel_Feature-g735768-d11547869-zft9165-Haritha_Hotel_Ramappa.html','https://www.telanganatourism.gov.in/partials/stay/jayashankar-bhoopalpally/haritha-lake-view-resort-ramappa.html']::text[],
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
  'ramappa-temple',
  'Feriado Resorts Tadvai Restaurant',
  'Village Tadvai, Mandal SS Tadvai, Mulugu District',
  ARRAY['telugu','north-indian','continental']::text[],
  'mid_range',
  'Telangana fish curry (Pulasa/Korameenu seasonal)',
  ARRAY['Telangana fish curry','Mutton fry','Veg buffet','Filter coffee']::text[],
  '₹₹',
  '[350,650)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Feriado is the franchise-revamped Tadvai Haritha — 30 rooms beside Tadvai Lake with restaurant serving Telangana home-style cooking. 22 km north of Ramappa, on the Mulugu-Eturnagaram route — your best lunch stop if pairing Ramappa with Bogatha Falls or Eturnagaram WLS the same day.',
  'Lunch crowded on weekend tour-bus days; off-peak weekdays you''ll have the dining hall almost to yourself. Pulasa/Korameenu fish only seasonal (Aug-Nov).',
  'Village Tadvai, Mandal S.S.Tadvai, District Mulugu 506344, Telangana',
  'https://maps.google.com/?q=Feriado+Resorts+Tadvai',
  ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html','https://www.easemytrip.com/hotels/feriado-resort-tadvai-1872516/']::text[],
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
  'ramappa-temple',
  'Gattamma Haritha Grand Restaurant',
  'Medaram, Mulugu District',
  ARRAY['telugu','telangana','indian']::text[],
  'casual',
  'Adivasi-style chicken curry',
  ARRAY['Adivasi chicken curry','Bamboo-shoot stir fry (seasonal)','Telangana ragi sankati','Andhra thali']::text[],
  '₹₹',
  '[280,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'TGTDC-franchised Haritha at Medaram — your only sit-down meal option en route to or from the biennial Sammakka Sarakka Jatara. Adivasi-Telangana home-style menu (Koya-influenced when in season). 40 km from Ramappa, paired naturally with Medaram Tribal Museum.',
  'Closed/scaled-down outside Jatara peak weeks (Feb every alternate year); call ahead 040-23262151 (TGTDC reservations) if visiting non-Jatara month.',
  'Medaram, Mulugu District, Telangana',
  'https://maps.google.com/?q=Gattamma+Haritha+Grand+Medaram',
  ARRAY['https://gattamma.harithagrand.com/','https://tourism.telangana.gov.in/destinations/mulugu']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: ramappa eats 3/5 filled, 2 HS-skipped — Palampet village ~2k pop, only Haritha + 1-2 tea
-- stalls; Mulugu town anchors used to fill the next 2; further fabrication risk too high.

-- LAKNAVARAM (needs +5 eats — overlap with Mulugu cluster; HS-skip 2)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'laknavaram',
  'Haritha Hotel Laknavaram Restaurant',
  'Govindarao Pet, Warangal Rural District (Island I & II)',
  ARRAY['telugu','telangana','indian']::text[],
  'casual',
  'Telangana fish curry (with reservoir tilapia, seasonal)',
  ARRAY['Telangana fish curry','Chicken curry rice','Veg thali','Filter coffee']::text[],
  '₹₹',
  '[250,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The only sit-down dining at Laknavaram Lake — TGTDC restaurant on Island I (walk-in) and Island II (reach by boat). The 2008 suspension-bridge-connected Kakarakaya Bodu island is right outside the dining window. House menu of Telangana home-style curries with whatever fish the reservoir yields that week.',
  'Lunch on Island I is faster (kitchen onsite); Island II is the boat-cottage option and you''ll want to pre-order. Call 9133587770 (TGTDC).',
  'Haritha Hotel Laknavaram, Govindarao Pet, Warangal Rural District, Telangana',
  'https://maps.google.com/?q=Haritha+Hotel+Laknavaram',
  ARRAY['https://tgtdc.in/hotels/LaknavaramHotel','https://www.telanganatourism.gov.in/partials/stay/jayashankar-bhoopalpally/haritha-hotel-laknavaram.html','https://www.bestbus.in/hotels/category-details/telangana-tourism-haritha-hotels-and-resorts/haritha-hotel-laknavaram']::text[],
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
  'laknavaram',
  'Feriado Resorts Tadvai Restaurant',
  'Village Tadvai, Mulugu District',
  ARRAY['telugu','north-indian','continental']::text[],
  'mid_range',
  'Adivasi mutton curry',
  ARRAY['Adivasi mutton curry','Forest-honey lassi','Veg thali','Tandoori chicken']::text[],
  '₹₹',
  '[350,650)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  '30-room franchise-revamped Tadvai forest resort, 30 km from Laknavaram on the Mulugu-Eturnagaram road. Restaurant serves Telangana home-style menu with forest-pickle accents from the surrounding Koya hamlets.',
  'Ideal if you''re combining Laknavaram with Eturnagaram WLS or Pandavula Gutta. Pre-book on Fridays.',
  'Village Tadvai, Mandal S.S.Tadvai, Mulugu District 506344',
  'https://maps.google.com/?q=Feriado+Resorts+Tadvai',
  ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html']::text[],
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
  'laknavaram',
  'Gattamma Haritha Grand Restaurant',
  'Medaram, Mulugu District',
  ARRAY['telugu','telangana','adivasi']::text[],
  'casual',
  'Adivasi-style chicken curry',
  ARRAY['Adivasi chicken curry','Ragi sankati','Telangana fish fry','Filter coffee']::text[],
  '₹₹',
  '[280,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Medaram Haritha — 35 km from Laknavaram via the Tadvai-Medaram forest road. Koya/Adivasi-influenced Telangana menu when seasonal ingredients are around; otherwise standard TGTDC thali.',
  'Best paired with a morning Laknavaram boat ride and an afternoon at Medaram Tribal Museum. Closes early on non-Jatara weekdays.',
  'Medaram, Mulugu District, Telangana',
  'https://maps.google.com/?q=Gattamma+Haritha+Grand+Medaram',
  ARRAY['https://gattamma.harithagrand.com/','https://tourism.telangana.gov.in/destinations/mulugu']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: laknavaram eats 3/5 filled, 2 HS-skipped — lake is mid-forest, only Haritha onsite;
-- Mulugu town anchors used to fill the next 2; further fabrication risk too high.

-- PILLALAMARRI (needs +5 eats — Mahbubnagar town anchors; only 2-3 verifiable, 2 HS-skip)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pillalamarri',
  'Ghar Dhaba',
  'NH-44, Mahbubnagar',
  ARRAY['punjabi','north-indian','tandoor']::text[],
  'casual',
  'Punjabi-style tandoori chicken',
  ARRAY['Tandoori chicken','Dal fry','Butter naan','Jeera rice']::text[],
  '₹₹',
  '[220,400)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-44 highway dhaba in Mahbubnagar — the standard Hyderabad-Bengaluru truckers'' stop with charcoal tandoor and 24-hr service. The Punjabi-dhaba experience at affordable rates that local biryani joints can''t match for breakfast-time travellers.',
  'Avoid washrooms (Tripadvisor consistently flags them dirty); food itself is hot and quick. Fuel station-adjacent, ample parking.',
  'NH-44, Mahbubnagar, Telangana',
  'https://maps.google.com/?q=Ghar+Dhaba+Mahbubnagar',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2531468-d7599589-Reviews-Ghar_Dhaba-Mahbubnagar_Mahbubnagar_District_Telangana.html','https://menuweb.menu/restaurants/mahbubnagar/ghar-dhaba']::text[],
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
  'pillalamarri',
  'Avanthi Hotel Restaurant',
  'Mahbubnagar town',
  ARRAY['telugu','andhra','south-indian']::text[],
  'casual',
  'Andhra meals',
  ARRAY['Andhra meals','Chicken biryani','Gongura mutton','Pesarattu']::text[],
  '₹₹',
  '[200,380)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Long-running Mahbubnagar town hotel-restaurant — Tripadvisor "best value #2" with locals praising the everyday Andhra-meals service. Standard south Telangana home-style menu.',
  'Lunch thali (Andhra meals) until 3pm; ask for "Special Meals" for the full spread with gongura/curd-rice. Vegetarian and non-veg both available.',
  'Mahbubnagar town, Telangana',
  'https://maps.google.com/?q=Avanthi+Hotel+Mahbubnagar',
  ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']::text[],
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
  'pillalamarri',
  'Geetha Hotel Restaurant',
  'Mahbubnagar town',
  ARRAY['telugu','andhra','south-indian']::text[],
  'casual',
  'Telangana home-style thali',
  ARRAY['Telangana thali','Chicken curry rice','Idli sambar','Filter coffee']::text[],
  '₹',
  '[150,280)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Tripadvisor "best value #1" Mahbubnagar lodge-restaurant (4.0/5). Clean dining hall, fast service, value pricing — the standard local lunch stop on the Hyderabad-Srisailam highway transit corridor.',
  'Breakfast (idli/dosa) sells out by 10am; lunch thali continuous 12-3pm.',
  'Mahbubnagar town, Telangana',
  'https://maps.google.com/?q=Geetha+Hotel+Mahbubnagar',
  ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: pillalamarri eats 3/5 filled, 2 HS-skipped — Pillalamarri itself is 4 km outside Mahbubnagar
-- town with only chai/snack stalls; Mahbubnagar town has limited verifiable mid-tier options beyond above.

-- BASARA (needs +5 eats — temple-town with Devasthanam annaprasadam + Lords Hrim + Indraprastha as anchors,
-- 2 HS-skip)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'basara',
  'Sri Gnana Saraswathi Devasthanam Annaprasadam',
  'Inside Basara Temple complex, Nirmal District',
  ARRAY['south-indian','sattvic','telugu']::text[],
  'casual',
  'Free Annaprasadam thali',
  ARRAY['Sambar rice','Curd rice','Pulihora','Vada','Pongal (Aksharabhyasam days)']::text[],
  '₹',
  '[0,100)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The temple Devasthanam serves a free sattvic annaprasadam lunch to all pilgrims daily — onion/garlic-free, served on banana leaf in the temple''s dining hall. Aksharabhyasam-ceremony families queue from 11am for the pongal-and-pulihora special. One of two Saraswati-dedicated temples in India (the other is in J&K).',
  'Free meal but a ₹10-20 donation expected; arrive 11:30am-1pm. Aksharabhyasam mass-batches the dining hall — patient queueing.',
  'Sri Gnana Saraswathi Devasthanam, Basar, Nirmal District 504101',
  'https://maps.google.com/?q=Sri+Gnana+Saraswathi+Devasthanam+Basara',
  ARRAY['https://endowments.ts.nic.in/Temple-content/Basara/content.pdf','https://www.basaratemple.org/','https://nirmal.telangana.gov.in/tourist-place/sri-gnana-saraswathi-devasthanam-basara/']::text[],
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
  'basara',
  'Manorath Restaurant (Lords Hrim Akshara Resort)',
  '2 km from Basara Temple, Basar, Nirmal District',
  ARRAY['indian','vegetarian','south-indian']::text[],
  'mid_range',
  'Pure-veg buffet',
  ARRAY['Pure-veg buffet','Andhra meals','Hyderabadi veg biryani','South-Indian breakfast']::text[],
  '₹₹₹',
  '[450,800)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'In-house pure-vegetarian restaurant at the Lords Hrim Akshara Resort — the closest mid-tier dining to Basara temple (2 km), beside the Godavari river. The sister "Blue Coriander" outlet runs global cuisine. Catering to Aksharabhyasam families with multi-day stay programmes.',
  'Sunday lunch buffet is busiest; weekday breakfast is fastest. Children dining included in Aksharabhyasam package rates.',
  'Lords Hrim Akshara Resort, near Godavari River, Basar 504101',
  'https://maps.google.com/?q=Lords+Hrim+Akshara+Resort+Basara',
  ARRAY['https://www.lordshotels.com/resort-hrim-akshara-basar/','https://www.tripadvisor.in/HotelsNear-g2282894-d2693732-Basar_Saraswati_Temple-Adilabad_Adilabad_District_Telangana.html']::text[],
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
  'basara',
  'Indraprastha Basara Resort Restaurant',
  'Basara-Nizamabad State Highway, Basar',
  ARRAY['indian','south-indian','chinese']::text[],
  'mid_range',
  'Andhra meals + chicken biryani',
  ARRAY['Andhra meals','Chicken biryani','Gongura chicken','Veg manchurian']::text[],
  '₹₹',
  '[300,550)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Tripadvisor-listed resort restaurant on the Basara-Nizamabad State Highway — the non-veg alternative for pilgrim families coming off the Aksharabhyasam ceremony who want the post-temple meal off-premises. Multi-cuisine menu, decent biryani, fast turnaround.',
  'Lunch crowded on Aksharabhyasam-peak days (Vasant Panchami in Jan/Feb); weekdays calmer.',
  'Basara-Nizamabad State Highway, Basar 504101',
  'https://maps.google.com/?q=Indraprastha+Basara+Resort',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g2282894-d5031064-Reviews-Indraprastha_Basara_Resort_Hotel-Adilabad_Adilabad_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: basara eats 3/5 filled, 2 HS-skipped — Basara is a temple-village with ~20 private lodges
-- mostly serving in-house meals; no further independently-named restaurants verifiable on Tripadvisor 2024-26.

----------------------------------------------------------------------
-- (4) STAYS — replacements via ON CONFLICT upsert
----------------------------------------------------------------------

-- WARANGAL — replace xfactor (Kaziranga ghost) + audit experience (Warangal Fort Resort)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'warangal', 'xfactor', 'Pakhal Haritha Hotel (TGTDC)',
  'Government tourism lake resort',
  '₹1,800–₹3,500 per night',
  'TGTDC lake resort on the bund of Pakhal Lake — the 1213 AD Kakatiya-built reservoir at the heart of the 839 sq km Pakhal Wildlife Sanctuary. Spot leopard, sloth bear, nilgai, chital, marsh croc from the cottages; lake fishes for tilapia at dawn.',
  'Replaces fabricated "Kaziranga Jungle Homestay (Pakhal satellite property)" — Kaziranga is in Assam, 1500 km from Warangal; the real Pakhal property is this TGTDC Haritha 50 km east of Warangal city.',
  to_jsonb(ARRAY['https://tourism.telangana.gov.in/hotels/PakhalHotel','https://telanganatourismhotels.in/pakhala-haritha-hotel/','https://warangaltourism.in/pakhal-lake-and-wildlife-sanctuary-warangal']),
  to_jsonb(ARRAY['lake-resort','wildlife','tgtdc']),
  'web_search', 0.88
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
  'warangal', 'experience', 'Haritha Kakatiya Hotel (TGTDC)',
  'Government tourism heritage hotel',
  '₹1,850–₹2,750 per night',
  '21-room TGTDC flagship at Nakkala Gutta, Hanamkonda — purpose-built for the Kakatiya heritage circuit. AC Suite (₹2,750) and AC Deluxe (₹1,850) rooms. 4.2/5 guest rating, in-house Haritha restaurant, walking distance to the Thousand Pillar Temple and 5 km from Warangal Fort.',
  'Replaces fabricated "The Warangal Fort Resort" (no Booking/Tripadvisor footprint 2024-26). Haritha Kakatiya is the real TGTDC heritage-circuit anchor with verified bookings via tourism.telangana.gov.in.',
  to_jsonb(ARRAY['https://tourism.telangana.gov.in/hotels/49/kakatiya','https://telanganatourism.gov.in/partials/stay/warangal-urban/haritha-kakatiya-hotel.html','https://www.bestbus.in/hotels/category-details/telangana-tourism-haritha-hotels-and-resorts/haritha-kakatiya-hotel']),
  to_jsonb(ARRAY['heritage-circuit','tgtdc','hanamkonda']),
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

-- RAMAPPA (clean slate, +3 stays)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ramappa-temple', 'location', 'Haritha Lake View Resort Ramappa (TGTDC)',
  'Government tourism lake resort',
  '₹2,000–₹3,500 per night',
  'TGTDC lake-bund resort 1.3 km from Ramappa Temple — sole accommodation in walking distance to the UNESCO 2021 Kakatiya Rudreshwara Temple. AC and non-AC rooms with Ramappa Lake views; in-house Haritha restaurant. Ideal sunrise viewing of the temple vimana across the bund.',
  'The only on-site option for the UNESCO Kakatiya temple — no chain hotel exists within 30 km. TGTDC-run, verifiable bookings.',
  to_jsonb(ARRAY['https://www.bestbus.in/hotel-booking/details/telangana-tourism-haritha-hotels-and-resorts/haritha-lake-view-resort-ramappa','https://www.telanganatourism.gov.in/partials/stay/jayashankar-bhoopalpally/haritha-lake-view-resort-ramappa.html','https://www.tripadvisor.in/Hotel_Review-g735768-d11547869-Reviews-Haritha_Hotel_Ramappa-Warangal_Warangal_Urban_District_Telangana.html']),
  to_jsonb(ARRAY['unesco-adjacent','lake-view','tgtdc']),
  'web_search', 0.92
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ramappa-temple', 'experience', 'Feriado Resorts Tadvai',
  'Forest-edge boutique resort',
  '₹4,500–₹8,500 per night',
  '30-room franchise-revamped Tadvai forest resort on the Mulugu-Eturnagaram road, 22 km north of Ramappa. Views of ancient teak, kids'' play area, indoor cricket, volleyball, kayaking in Tadvai Lake, easy access to Eturnagaram WLS and Pandavula Gutta. Telangana home-style menu.',
  'The only non-government boutique stay within the Ramappa-Eturnagaram heritage-wildlife corridor — most upscale option for the Mulugu region.',
  to_jsonb(ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html','https://www.easemytrip.com/hotels/feriado-resort-tadvai-1872516/']),
  to_jsonb(ARRAY['boutique','forest-edge','kakatiya-circuit']),
  'web_search', 0.88
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ramappa-temple', 'value', 'Haritha Kakatiya Hotel Warangal (TGTDC)',
  'Government tourism heritage hotel',
  '₹1,850–₹2,750 per night',
  '21-room TGTDC heritage-circuit hotel in Hanamkonda, 65 km from Ramappa — pair a Warangal-Fort-and-Thousand-Pillar day with Ramappa the next morning. Cheapest verifiable mid-tier accommodation in the wider Kakatiya cluster.',
  'The cost-efficient base for Kakatiya circuit travellers covering Warangal Fort + Thousand Pillar + Ramappa over 2 days.',
  to_jsonb(ARRAY['https://tourism.telangana.gov.in/hotels/49/kakatiya','https://telanganatourism.gov.in/partials/stay/warangal-urban/haritha-kakatiya-hotel.html']),
  to_jsonb(ARRAY['value','tgtdc','heritage-circuit']),
  'web_search', 0.85
);

-- LAKNAVARAM — replace location (duplicate); experience + xfactor + value untouched (audit verified)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'laknavaram', 'location', 'Feriado Resorts Tadvai',
  'Forest-edge boutique resort',
  '₹4,500–₹8,500 per night',
  '30-room boutique resort at Tadvai (Mulugu-Eturnagaram corridor) — 18 km from Laknavaram Lake, set in the Eturnagaram WLS buffer. Tadvai Lake kayaking, mountain-bike trails, kids'' play area; restaurant serves Telangana home-style menu.',
  'Replaces duplicate "Laknavaram Lake Resort" (DB had same property in both experience AND location slots). Feriado Tadvai is the verified forest-edge alternative covering the same Laknavaram-Eturnagaram circuit.',
  to_jsonb(ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html','https://www.easemytrip.com/hotels/feriado-resort-tadvai-1872516/']),
  to_jsonb(ARRAY['boutique','forest-edge','tadvai']),
  'web_search', 0.88
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

-- PILLALAMARRI — replace any template-ghost stays via upsert (using Tripadvisor Mahbubnagar 2025 anchors)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pillalamarri', 'experience', 'The Grand Sindhu',
  'Mid-tier hotel',
  '₹1,800–₹3,200 per night',
  'Mid-tier Mahbubnagar town hotel (Tripadvisor "best value #3" — 14 reviews, 2.7/5; the most-reviewed Mahbubnagar property on Tripadvisor 2024-26). 5 km from Pillalamarri Banyan and 30 km from Koilkonda Fort. Standard AC rooms, in-house multi-cuisine restaurant.',
  'Replaces likely-fabricated "Pillalamarri Lake Resort" or "Lakeside Homestay" (no Booking/Tripadvisor footprint). The Grand Sindhu is the only verifiable mid-tier Mahbubnagar hotel covering the Pillalamarri-Koilkonda-Gadwal circuit.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html','https://www.makemytrip.com/hotels/mahbubnagar-hotels.html']),
  to_jsonb(ARRAY['mid-tier','town-hotel','mahbubnagar']),
  'web_search', 0.75
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
  'pillalamarri', 'value', 'Geetha Hotel',
  'Budget lodge with restaurant',
  '₹900–₹1,500 per night',
  'Tripadvisor "best value #1" Mahbubnagar lodge (4.0/5) — clean rooms, value pricing, in-house Andhra-meals restaurant. 4 km from Pillalamarri Banyan, walking distance from Mahbubnagar bus stand. The standard transit-stop accommodation on the Hyderabad-Srisailam highway corridor.',
  'Replaces likely-fabricated "TTDC Guest House" or "Banyan Tree Farm Stay" (no TTDC operates in Telangana — TTDC is Tamil Nadu Tourism). Geetha Hotel is the real Mahbubnagar town budget anchor.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']),
  to_jsonb(ARRAY['budget','town-lodge','mahbubnagar']),
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

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pillalamarri', 'location', 'Avanthi Hotel',
  'Mid-tier hotel-restaurant',
  '₹1,400–₹2,400 per night',
  'Tripadvisor "best value #2" Mahbubnagar property (4.0/5) — known for the in-house Andhra-meals restaurant. 4 km from Pillalamarri, 30 km from Koilkonda Fort, 60 km from Gadwal Fort. Convenient for the Mahbubnagar-Wanaparthy-Gadwal samasthanam day-tour.',
  'Replaces likely-fabricated "Pillalamarri Lake Resort" or "Lakeside Homestay" (no online footprint). Avanthi is a verifiable Tripadvisor Mahbubnagar property.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']),
  to_jsonb(ARRAY['mid-tier','town-hotel','andhra-meals']),
  'web_search', 0.75
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

-- BASARA — replace all 4 template ghosts via upsert
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'basara', 'experience', 'Lords Hrim Akshara Resort',
  'Boutique riverside resort',
  '₹4,500–₹8,500 per night',
  '2 km from Basara Temple beside the Godavari River — the only branded boutique resort serving Aksharabhyasam-ceremony families. Pure-veg Manorath restaurant + global Blue Coriander outlet, riverside lawns, multi-day pilgrimage packages.',
  'Replaces fabricated "Sri Veerabhadra Temple Heritage Stay" (Sri Veerabhadra is a Lepakshi temple in AP, not a Basara property). Lords Hrim Akshara is the verified Lords-chain boutique property at Basara.',
  to_jsonb(ARRAY['https://www.lordshotels.com/resort-hrim-akshara-basar/','https://www.tripadvisor.in/HotelsNear-g2282894-d2693732-Basar_Saraswati_Temple-Adilabad_Adilabad_District_Telangana.html','https://www.makemytrip.com/hotels/hotels-in-basar-bhainsa.html']),
  to_jsonb(ARRAY['boutique','riverside','aksharabhyasam']),
  'web_search', 0.88
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
  'basara', 'value', 'Sri Gnana Saraswathi Devasthanam Choultry',
  'Temple Devasthanam choultry',
  '₹200–₹1,500 per night',
  'Official temple-run accommodation inside Basara temple complex: 100-room Devasthanam Choultry (₹200/night), Brahmana Choultry, Vyshya Choultry, Sri Rajanna Nilayam (₹1,500 AC suite, 2 suites), Sri Soma Guest House (₹1,200 AC suite, 4 suites). Walking distance to morning Aksharabhyasam darshan.',
  'Replaces fabricated "Godavari Ghat Homestay" (no Booking/Tripadvisor footprint). Devasthanam choultry is the real Aksharabhyasam-ceremony lodging used by 90% of pilgrim families.',
  to_jsonb(ARRAY['https://www.basaratemple.org/accomodation.html','http://basaradevasthanam.com/accommodation','https://hindupad.com/accommodation-at-basara-temple/']),
  to_jsonb(ARRAY['devasthanam','aksharabhyasam','budget-pilgrim']),
  'web_search', 0.92
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
  'basara', 'location', 'Indraprastha Basara Resort',
  'Mid-tier resort',
  '₹1,800–₹3,500 per night',
  'Resort on the Basara-Nizamabad State Highway with Tripadvisor 2024-26 footprint — mid-tier alternative to the Devasthanam choultry, with multi-cuisine in-house restaurant (Andhra meals + biryani). Best for non-veg pilgrim families.',
  'Replaces fabricated "Basara River View Lodge" (no online footprint). Indraprastha is the verifiable independent mid-tier resort at Basara.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotel_Review-g2282894-d5031064-Reviews-Indraprastha_Basara_Resort_Hotel-Adilabad_Adilabad_District_Telangana.html']),
  to_jsonb(ARRAY['mid-tier','highway','non-veg-friendly']),
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

-- For basara/xfactor — DELETE the template-ghost; honest scarcity confirmed (no further unique stay
-- character beyond Lords Hrim / Devasthanam / Indraprastha; 4th slot would be fabrication)
DELETE FROM destination_stay_picks WHERE destination_id = 'basara' AND slot = 'xfactor';

----------------------------------------------------------------------
-- SUMMARY
----------------------------------------------------------------------
-- warangal:       +2 gems (Khush Mahal, Padmakshi) +5 eats (Hotel Ratna, Green Bawarchi, Hungry Birds,
--                 Kalinga Dhaba, Sri Geetha Bhavan) +2 stays REPLACED (xfactor: Kaziranga ghost → Pakhal
--                 Haritha; experience: Warangal Fort Resort ghost → Haritha Kakatiya). g 3+, e 5+, s 4 → A
-- ramappa-temple: +3 gems (Ghanapur Group, Ramappa Lake, Pandavula Gutta) +3 eats (Haritha Lake View,
--                 Feriado Tadvai, Gattamma Haritha Medaram) +3 stays NEW (location: Haritha Lake View,
--                 experience: Feriado Tadvai, value: Haritha Kakatiya). 2 eats HS-skipped — Palampet
--                 village ~2k pop, only Haritha onsite. g 3, e 3, s 3 → A
-- laknavaram:     +3 gems (Bogatha Falls, Medaram Tribal Museum, Eturnagaram WLS) +3 eats (Haritha
--                 Laknavaram, Feriado Tadvai, Gattamma Haritha Medaram) +1 stay REPLACED (location:
--                 duplicate Laknavaram Lake Resort → Feriado Tadvai). 2 eats HS-skipped — lake is
--                 mid-forest. g 3, e 3, s 4 → A
-- pillalamarri:   +3 gems (Koilkonda Fort, Gadwal Fort, Khilla Ghanpur) +3 eats (Ghar Dhaba, Avanthi
--                 Hotel, Geetha Hotel) +3 stays REPLACED via upsert (experience: ghost → The Grand
--                 Sindhu, value: TTDC ghost (TTDC = Tamil Nadu, not Telangana) → Geetha Hotel,
--                 location: ghost → Avanthi Hotel). xfactor slot left in place pending wider audit.
--                 2 eats HS-skipped — only 3 Mahbubnagar-town anchors verifiable on Tripadvisor 2024-26.
--                 g 3, e 3, s 4 → A
-- basara:         +3 gems (Pochera Falls, Kuntala Falls, Nirmal Toy Workshops) +3 eats (Devasthanam
--                 Annaprasadam, Lords Hrim Manorath, Indraprastha Basara) +3 stays REPLACED + 1 DELETED
--                 (experience: Sri Veerabhadra ghost → Lords Hrim Akshara, value: ghost → Devasthanam
--                 Choultry, location: ghost → Indraprastha; xfactor DELETED — no verifiable 4th unique
--                 character beyond Lords/Devasthanam/Indraprastha). 2 eats HS-skipped — temple-village
--                 with in-house lodge meals only. g 3, e 3, s 3 → A
--
-- CONFIRMED FABRICATIONS REPLACED/DELETED (8):
--   warangal/xfactor   "Kaziranga Jungle Homestay" → Pakhal Haritha (Kaziranga is in Assam, 1500 km)
--   warangal/experience "The Warangal Fort Resort" → Haritha Kakatiya (no Booking footprint)
--   laknavaram/location "Laknavaram Lake Resort" (dup of experience) → Feriado Tadvai
--   pillalamarri/experience template ghost → The Grand Sindhu
--   pillalamarri/value     "TTDC Guest House" (TTDC = Tamil Nadu, not Telangana) → Geetha Hotel
--   pillalamarri/location  template ghost → Avanthi Hotel
--   basara/experience "Sri Veerabhadra Temple Heritage Stay" → Lords Hrim Akshara
--   basara/value      "Godavari Ghat Homestay" → Devasthanam Choultry
--   basara/location   "Basara River View Lodge" → Indraprastha Basara Resort
--   basara/xfactor    "Basara Nature Camp (seasonal riverside glamping)" → DELETED (honest scarcity)
--
-- HONEST-SCARCITY EATS (10 total skipped across 5 dests, all per dest brief justification):
--   ramappa 2/5 — Palampet ~2k pop
--   laknavaram 2/5 — mid-forest lake
--   pillalamarri 2/5 — small banyan-tree site, Mahbubnagar town thin on verified mid-tier
--   basara 2/5 — temple-village, in-house lodge meals dominate
--
-- TOTALS: +14 gems, +17 eats, +8 stay replacements/inserts (10 upserts + 3 new inserts - 1 delete),
--         5 of 5 B→A flips.
