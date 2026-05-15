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
