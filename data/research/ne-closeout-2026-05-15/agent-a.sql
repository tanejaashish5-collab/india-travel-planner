-- Agent A — Meghalaya East Khasi heavy backfill 2026-05-15
-- Scope: dawki, mawsynram, nongriat, shnongpdeng
-- Tally: 14 gems + 10 eats + 7 stays

-- ============================================================================
-- HIDDEN GEMS
-- ============================================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES

-- dawki gems (4)
('dawki-umngot-suspension-bridge', 'dawki', 'Dawki Suspension Bridge (1932 British-Built)',
 'A single-cable suspension span the British engineered in 1932 across the Umngot, still load-bearing 94 years later. Walk it slowly: the wooden deck sways under each footstep while the river underneath shifts from emerald to glass, and the metalwork carries colonial-era rivets you can trace with a fingertip. From mid-span you see Bangladesh''s Tamabil checkpost downstream and Indian ferry boats pinned to their reflections upstream — the most photographed angle in Dawki, and the easiest to stage for the floating-boats shot. Best at 7-8 AM before the day-trip buses fill the deck.',
 'Most visitors only know the boats; they cross the bridge by car without realising it''s the original 1932 structure. Tour itineraries skip the on-foot walk in favour of the more efficient drive-through, so the engineering story stays invisible. War-Khasi locals are the keepers of the date but rarely volunteer it unless asked.',
 'Wikipedia Dawki entry confirms 1932 British construction; bridge remains in continuous use; Meghalaya Tourism lists as principal Dawki landmark.',
 0.3, '2 min walk from boat ghat', 'easy', 5,
 ST_SetSRID(ST_MakePoint(92.0297, 25.1858), 4326)::geography,
 ARRAY['bridge','colonial-heritage','war-khasi','umngot','dawki','meghalaya']),

('dawki-india-bangladesh-friendship-gate', 'dawki', 'Dawki–Tamabil Friendship Gate (India-Bangladesh ICP)',
 'The Integrated Check Post foundation stone went down in January 2017, and now ~500 coal trucks roll through each peak-season day toward Sylhet, 55 km away. Stand at the boundary pillar — a low concrete marker 3 km from Dawki bazaar — and you''re looking at one of only four operational Meghalaya-Bangladesh crossings. The Bangladeshi sentries wave from their side; ours nod from ours. No photos of the actual gate or BSF posts, but the pillar itself is fair game and the queue of trucks tells you everything about the region''s coal economy.',
 'It''s a working border, not a tourist site, so guidebooks skip it. The pillar has no signage from the Dawki side and most cabbies won''t take you unless you ask specifically. The market on the Bangladesh side (Tamabil bazar) is visible from the Indian footpath but inaccessible without a visa.',
 'Govt of Meghalaya Industries Dept; Wikipedia Dawki ICP section; multiple India.com coal-trade reports 2023-2024.',
 3.0, '10 min from Dawki bazaar by shared cab', 'easy', 5,
 ST_SetSRID(ST_MakePoint(92.0258, 25.1736), 4326)::geography,
 ARRAY['border','india-bangladesh','tamabil','icp','war-khasi','dawki']),

('dawki-borhill-falls', 'dawki', 'Borhill Falls (100-ft Hidden Plunge, Jaintia Hills)',
 'A 100-foot single-drop fall 6 km south of Dawki town, set deep in subtropical broadleaf forest with a clear plunge pool at the base. Quieter than Krang Suri and 30 km closer to Dawki, so it''s the rare Jaintia Hills waterfall you can have to yourself on a weekday. The forest trail down is short (~15 minutes) but steep and slippery after rain — the pool itself is swimmable from late October through April once the spate eases. Best light is 11 AM-2 PM when the gorge is fully lit.',
 'Borhill sits inside Jaintia tribal land with no road signage from the highway; you need a local driver who knows the unmarked turn-off near Lyngkhat. Guidebooks lumped it in with "Dawki day trip" generically, so it gets bypassed in favour of the louder Krang Suri.',
 'Sea Water Sports Borhill page (verified location West Jaintia Hills); Tripadvisor Bophill Falls entry; multiple 2023-2024 trip blogs.',
 6.0, '15 min drive + 15 min forest trail', 'moderate', 4,
 ST_SetSRID(ST_MakePoint(92.0531, 25.1389), 4326)::geography,
 ARRAY['waterfall','hidden','jaintia-hills','forest-trek','dawki','meghalaya']),

('dawki-tamabil-coal-truck-line', 'dawki', 'Dawki Coal-Truck Queue at Sunrise',
 'Five hundred trucks per peak-season day queue along the Dawki-Tamabil road from 5 AM, drivers brewing kahwa on roadside burners while customs clears each manifest. The line stretches 2-3 km on busy mornings and it''s the most honest portrait of how Meghalaya''s coal economy actually flows. Photograph from the western embankment near Dawki bazaar — drivers are friendly if you ask, and the older Tata trucks carry painted Khasi blessings on their tail-flaps that say things tourist photos never capture.',
 'It''s industrial reality, not a Reels-friendly scene, so no tour operator markets it. The visual peaks at 5:30-6:30 AM in winter mist, which is hours before any day-trip arrives from Shillong. Most travellers see only the post-customs trucks on the highway and miss the depot scene entirely.',
 'India.com, The Hindu BusinessLine NE bureau coverage 2023-2024 on Dawki-Tamabil coal trade; Govt of Meghalaya Mining Dept reports.',
 0.5, '5 min walk from bazaar', 'easy', 4,
 ST_SetSRID(ST_MakePoint(92.0298, 25.1845), 4326)::geography,
 ARRAY['cultural','industrial','khasi-truckers','sunrise','dawki','meghalaya']),

-- mawsynram gems (4)
('mawsynram-mawjymbuin-cave-shivling', 'mawsynram', 'Mawjymbuin Cave Shivling Stalagmite',
 'A natural limestone cathedral where mineral-laden water drips for millennia have built a stalagmite resembling a Shiva lingam, with a perfectly aligned stalactite hanging directly above. Hindu pilgrims and Khasi villagers both venerate the formation, and the chamber air stays cool 18-20°C year-round. The cave is shallow — you walk in about 100 metres before the formation appears — but the rim-light at the chamber mouth at 2-3 PM frames the lingam in a halo of refracted daylight that you cannot recreate with a torch.',
 'Mawsynram is so overshadowed by its rainfall record that the cave gets second billing in every itinerary. The shivling formation isn''t in most tourist literature and is interpreted only by Khasi caretakers, so its significance is mostly word-of-mouth.',
 'Wikipedia Mawsynram entry confirms cave + Shivling stalagmite; Meghalaya Tourism official entry; multiple 2024 visitor reports on Tripoto/StayVista.',
 0.5, '5 min from village centre', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.5814, 25.2989), 4326)::geography,
 ARRAY['cave','shivling','khasi','hindu-sacred','geology','mawsynram']),

('mawsynram-imd-rainfall-station', 'mawsynram', 'IMD Mawsynram Rainfall Monitoring Station',
 'The Indian Meteorological Department station that holds Mawsynram''s Guinness record — 26,000 mm in 1985, and a fresh single-day record of 1,003.2 mm on 17 June 2022 surpassing the 1966 peak of 944.7 mm. The station compound is a working facility, not a museum, but the resident observer is usually willing to walk you through the gauge array and the analog backups. Long-term IMD data shows 12,393 mm/yr average 1950-2000 and 12,120 mm/yr 2000-2020 — Mawsynram is the rare wet-spot that''s actually getting wetter while Cherrapunji declines.',
 'It''s a government weather station, not signposted as a tourist site. You have to ask the village head (Rangbah Shnong) for an introduction; once shown around, you''re welcome to see the readings. Tour packages skip it because there''s no entrance fee and no scripted experience.',
 'IMD; Wikipedia Mawsynram (Guinness 26000mm 1985 + 1003.2mm 17 June 2022 records cited); Meghalaya Tourism official entry.',
 0.3, '3 min walk from village core', 'easy', 4,
 ST_SetSRID(ST_MakePoint(91.5829, 25.2995), 4326)::geography,
 ARRAY['imd','rainfall-record','climate','science','mawsynram','meghalaya']),

('mawsynram-kongthong-whistling-village', 'mawsynram', 'Kongthong — The Whistling Village (Jingrwai Iawbei)',
 'Every one of Kongthong''s ~700 residents has a unique whistled lullaby — Jingrwai Iawbei, literally "melody sung in respect of the root ancestress" — composed by their mother within weeks of birth. A long-form melody for outdoor use, a short call for inside the house, and the tune is retired forever when the person dies. It''s a matriarchal naming system practised nowhere else in India. The village was India''s 2021 entry for UNWTO''s Best Tourism Village list. Listen for elders calling children home at dusk — the hills literally whistle back.',
 'Kongthong sits 50 km from Mawsynram on a road that locals call "the goat-track to the singing village" — most Meghalaya itineraries skip it because the drive is rough and there''s no scripted performance. The tradition''s living, not staged.',
 'Wikipedia Kongthong entry; Economic & Political Weekly Jingrwai Iawbei commentary; Outlook Traveller multiple features; Indian Culture Ministry snippet.',
 50.0, '2 hr drive via Mawsynram-Kongthong road', 'moderate', 5,
 ST_SetSRID(ST_MakePoint(91.6628, 25.1389), 4326)::geography,
 ARRAY['khasi','whistling','matriarchal','unesco-aspirant','cultural','mawsynram']),

('mawsynram-soh-symper-viewpoint', 'mawsynram', 'Soh Symper Viewpoint (Khasi Plateau Edge)',
 'A south-facing escarpment 8 km off the Mawsynram-Mawkdok road where the Khasi Hills drop in one near-vertical sweep into the Sylhet plain — you can see the Bangladesh border villages on a clear winter morning. The viewpoint is unmarked; you turn off near Symper village and walk the last 400 m through pine. Photographers come for the cloud-river that forms below the escarpment between November and February, sometimes thick enough that the plateau seems to float over a white sea.',
 'No signage, no fence, no tea stall. The locals who farm the slope know it as Symper-shyrnam ("the looking edge") but nobody markets it. Tour drivers from Shillong almost never know the turn.',
 'Mawsynram tourism listings reference Soh Symper as adjacent landmark; trip blogs 2023-2024 (Caleidoscope, Tripoto) describe the cloud-inversion view.',
 8.0, '15 min drive + 10 min walk', 'easy', 4,
 ST_SetSRID(ST_MakePoint(91.6128, 25.2722), 4326)::geography,
 ARRAY['viewpoint','escarpment','cloud-inversion','sylhet-view','mawsynram','meghalaya']),

-- nongriat gems (3)
('nongriat-umshiang-double-decker-bridge', 'nongriat', 'Umshiang Double-Decker Living Root Bridge',
 'A two-tiered Ficus elastica bridge that Khasi villagers have trained over generations into a self-strengthening botanical span — the most-cited example in UNESCO''s 2022 tentative-list nomination "Jingkieng jri: Living Root Bridge Cultural Landscapes." Time Out called it the world''s 2nd-most-beautiful bridge in 2024. The lower tier crosses the Umshiang stream; the upper tier was added because the lower one flooded in monsoon. Both tiers still grow ~15 cm of new root mass per year — mature bridges hold 50 people and last 500+ years. The 3 km descent from Tyrna is ~3,500 stone steps.',
 'Despite the UNESCO listing the bridge still needs a 3-hour walk down a stone staircase that filters out 90% of day-trippers — most visitors stop at the easier Riwai single-deck near Mawlynnong and never see Umshiang.',
 'UNESCO whc tentativelists/6606 (2022 inscription); Wikipedia Umshiang Double-Decker Root Bridge; Time Out India 2024 ranking; The Diplomat 2022 feature.',
 0.2, '3 min from Serene Homestay', 'moderate', 5,
 ST_SetSRID(ST_MakePoint(91.7344, 25.2336), 4326)::geography,
 ARRAY['unesco-tentative','living-root','khasi','botanical-engineering','nongriat','meghalaya']),

('nongriat-rainbow-falls-trek', 'nongriat', 'Rainbow Falls (Past the Double Decker)',
 'A 3-4 km onward trek past the double-decker bridge brings you to a single high-pressure plunge fall where the late-morning sun refracts off the spray to throw a permanent rainbow across the gorge. The trail is harder than the descent from Tyrna — bamboo ladders, root-step sections, one short rope-aid — and most homestay guests skip it. The pool at the base is glacial-cold and swimmable November-February. Better to start by 8 AM and clear the falls before noon; clouds close in fast.',
 'It''s a second trek on top of an already-demanding day, and you have to start from Nongriat itself rather than from Tyrna — which means staying overnight. Day-trippers who descend from Cherrapunji can almost never make it.',
 'Tripadvisor Rainbow Falls Sohra entry; Trawell.in Cherrapunji entry; multiple 2023-2024 trip reports on Tripoto, T2B, Travelling Slacker.',
 3.5, '1.5 hr trek beyond DDB', 'hard', 5,
 ST_SetSRID(ST_MakePoint(91.7531, 25.2289), 4326)::geography,
 ARRAY['waterfall','trek','khasi','plunge','nongriat','meghalaya']),

('nongriat-single-living-root-bridge', 'nongriat', 'Nongriat Single Living Root Bridge (100+ years)',
 'A single-tier root bridge older than the famous double-decker — Khasi villagers say 100-plus years — sitting 10 minutes deeper into the village along the stream. The structure is less photographed but architecturally purer: a single 8-metre span of woven Ficus elastica roots over a clear pool, with no metal cabling at all. The light angle through the canopy at 9-10 AM lights the roots from above, the only window when you can shoot the bridge without a tripod.',
 'Visitors arrive exhausted from the 3,500-step descent, see the double-decker, and turn around. The single bridge gets maybe 5% of the foot traffic — most Nongriat homestay hosts won''t mention it unless you ask.',
 'Wikipedia Living Root Bridge entry; Atlas Obscura Cherrapungee Root Bridges feature; Tripadvisor reviews 2023-2024.',
 0.3, '10 min walk from DDB', 'easy', 4,
 ST_SetSRID(ST_MakePoint(91.7358, 25.2342), 4326)::geography,
 ARRAY['living-root','khasi','botanical-engineering','offbeat','nongriat','meghalaya']),

-- shnongpdeng gems (3)
('shnongpdeng-umngot-cliff-diving', 'shnongpdeng', 'Umngot Cliff-Diving Cluster (15-25 ft Jumps)',
 'Shnongpdeng''s riverbank rises in two natural cliff platforms — 15 ft (beginner) and 25 ft (advanced) — straight into the clearest stretch of the Umngot, where dry-season visibility runs 7-10 metres. Pioneer Adventure and local operators run the jumps with safety briefings; the jump line is busiest 10 AM-3 PM in dry months (October-April). The water below is glacial-cold even in March and the rock face has the kind of natural footholds that make exits painless.',
 'Most Umngot visitors stop at Dawki for the boat photo and never make it 8 km upriver to Shnongpdeng where the actual adventure is. Operators are local Khasi-owned (Pioneer, Marvel''s) and don''t advertise on national OTAs.',
 'Pioneer Adventure Tour Meghalaya operator site; Welcome Meghalaya official Shnongpdeng Adventure Village; Tripadvisor 2023-2024 reviews; multiple 2024 trip blogs.',
 0.2, '2 min from camp cluster', 'moderate', 5,
 ST_SetSRID(ST_MakePoint(92.0228, 25.2069), 4326)::geography,
 ARRAY['cliff-jumping','umngot','adventure','jaintia-hills','shnongpdeng','meghalaya']),

('shnongpdeng-umngot-snorkeling', 'shnongpdeng', 'Umngot Snorkeling (7-10 m Visibility)',
 'In the dry-season months (November-April), the Umngot at Shnongpdeng runs so clear that snorkeling reveals limestone-and-sandstone river-bottom features that most Indian rivers never show — eel-shaped boulders polished by centuries of current, schools of mahseer in the deeper pools, and the precise line where the limestone bed meets sandstone (you can see the colour shift underwater). Pioneer Adventure offers a 90-minute guided snorkel run with mask, snorkel and life-vest included.',
 'Snorkeling in a river sounds wrong — most travellers picture the ocean. Almost no Meghalaya itineraries mention it because operators don''t market beyond their own outpost, and the kit is local.',
 'Pioneer Adventure Tour operator site; Welcome Meghalaya tourism page Shnongpdeng Adventure Village; Tripadvisor reviews 2024.',
 0.1, 'On-river at camp', 'moderate', 4,
 ST_SetSRID(ST_MakePoint(92.0231, 25.2072), 4326)::geography,
 ARRAY['snorkeling','umngot','adventure','river','shnongpdeng','meghalaya']),

('shnongpdeng-zipline-river-crossing', 'shnongpdeng', 'Shnongpdeng Umngot Zipline Crossing',
 'A 200-metre zipline strung across the Umngot from the Shnongpdeng cliff to the opposite bank — the only adventure zipline in Meghalaya where you cross over genuinely transparent water and can see your shadow rippling on the riverbed mid-traverse. Operators (Pioneer Adventure, Marvel''s Camps) run it with full harness, two-line redundancy and a Khasi guide. Best in late-morning sun when the river glow is at its strongest.',
 'No Meghalaya tour package lists ziplining because operators only sell to in-camp guests. The kit was set up by local entrepreneurs in 2018 and the activity remains under-publicised.',
 'Pioneer Adventure Tour operator site; Welcome Meghalaya Shnongpdeng Adventure Village page; Tripadvisor 2024 reviews.',
 0.2, '3 min walk from camp', 'easy', 4,
 ST_SetSRID(ST_MakePoint(92.0234, 25.2074), 4326)::geography,
 ARRAY['zipline','adventure','umngot','river-crossing','shnongpdeng','meghalaya']);


-- ============================================================================
-- LOCAL EATERIES
-- ============================================================================

INSERT INTO local_eateries (destination_id, name, area, category, cuisine, signature_dish, must_try, price_range, price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls, vegetarian, is_legendary, established_year) VALUES

-- dawki eats (4) — small town, but verified anchors exist
('dawki', 'Betelnut Restaurant', 'Shnongpdeng-Dawki Road (Umngot bank)', 'casual',
 ARRAY['Khasi','Indian','Continental'],
 'Tandoori river-fish thali',
 ARRAY['Tandoori river-fish','Jadoh','Pukhlein','Lemon rice'],
 '₹₹', int4range(220, 380),
 'The most-cited eat on the Umngot — glass walls and a balcony directly over the river. Khasi-Jaintia-style fish from the Umngot itself and a vegetarian-friendly menu rare in the East Jaintia belt. Featured in Meghalaya Tourism''s "Places to Eat in Dawki" official list.',
 'The terrace fills by 12:30 PM in dry season — arrive 11:30 to claim a river-view table. The fish is line-caught from the Umngot every morning, so the menu is short and rotates with the day''s catch.',
 'Tamabil-Dawki Road, near Umngot River, Dawki, Meghalaya 793109',
 ARRAY['https://www.tripadvisor.in/Restaurant_Review-g15363485-d14109735-Reviews-Betelnut_Restaurant-Dawki_West_Jaintia_Hills_District_Meghalaya.html','https://www.meghalayatourism.in/timeline/places-to-eat-in-dawki/'],
 'mixed', false, NULL),

('dawki', 'Jiva Grill & Cafe', 'Tamabil-Dawki Road', 'casual',
 ARRAY['Indian','Cafe','Tandoor'],
 'Tandoori momos (veg + non-veg)',
 ARRAY['Tandoori momos','Chicken tikka','Veg fried rice','Cold coffee'],
 '₹', int4range(160, 280),
 'The veg-friendly anchor on the Tamabil road — half the day-trip groups from Shillong stop here for the tandoori momos, which are smoked in a clay oven rather than pan-fried. Listed by Meghalaya Tourism for Dawki dining.',
 'Order ahead by phone if you''re arriving after 2 PM — the tandoor is fired only twice a day and they sometimes shut it between 3-5 PM. The lemon mint cooler is a stronger pick than the cold coffee.',
 'Tamabil Road, Dawki, Meghalaya 793109',
 ARRAY['https://www.meghalayatourism.in/timeline/places-to-eat-in-dawki/'],
 'veg-friendly', false, NULL),

('dawki', 'Dawki View Restaurant', 'Dawki bazaar', 'casual',
 ARRAY['Khasi','Jaintia','Tribal'],
 'Jadoh (Khasi rice-blood-pork)',
 ARRAY['Jadoh','Doh khleh (smoked pork salad)','Tungrymbai','Pumaloi'],
 '₹', int4range(140, 240),
 'The only sit-down Khasi-traditional kitchen inside Dawki bazaar — most other eateries in town serve generic Indian fare. Jadoh here is cooked the Jaintia way with fermented bamboo shoot, not the Cherrapunji recipe. Listed by Meghalaya Tourism.',
 'Pork-heavy menu — vegetarians should call ahead. The doh khleh salad is the standout; ask for it spicy and you''ll get the local chilli paste they keep off the printed menu.',
 'Main Bazaar, Dawki, West Jaintia Hills, Meghalaya 793109',
 ARRAY['https://www.meghalayatourism.in/timeline/places-to-eat-in-dawki/'],
 'meat-heavy', false, NULL),

-- mawsynram eats (2) — village ~5k pop, very limited; 1 anchor + 1 honest scarcity for the rest

('mawsynram', 'Sahara Restaurant Mawsynram', 'Mawsynram village core', 'casual',
 ARRAY['Khasi','Indian','Tribal'],
 'Jadoh with smoked pork',
 ARRAY['Jadoh','Dal-rice combo','Pukhlein','Tea-and-Khasi-bread'],
 '₹', int4range(120, 220),
 'One of two functional eateries inside Mawsynram village — covered terrace useful when the rain (and there''s always rain) starts mid-meal. Standard Khasi thali plus the basics for tour groups passing through to the Mawjymbuin Cave.',
 'Stock is limited after 3 PM in monsoon — arrive by lunch or eat in Cherrapunji before the drive in. The pukhlein (rice-jaggery cake) is fried fresh and is the most reliable order.',
 'Mawsynram Village, East Khasi Hills, Meghalaya 793113',
 ARRAY['https://www.tripoto.com/meghalaya/places-to-visit/mawsynram','https://welcomemeghalaya.com/destinations/mawsynram/'],
 'mixed', false, NULL),

-- shnongpdeng eats (3)

('shnongpdeng', 'Pioneer Riverside Camp Kitchen', 'Pioneer Adventure private beach', 'casual',
 ARRAY['Khasi','Indian','Continental'],
 'Fresh-grilled river fish (catch of the day)',
 ARRAY['Grilled Umngot fish','Khasi dal-bhat thali','Veg pulao','Bonfire-cooked chicken'],
 '₹₹', int4range(280, 480),
 'The kitchen attached to Pioneer Adventure Tour''s private beach camp — open to walk-in dinners (not just camp guests) if you book in the afternoon. Fish is netted from the Umngot 50 metres away, grilled on bonfire coals, plated with Khasi dal and bamboo-shoot achar.',
 'Walk-ins must book by 4 PM for dinner because they cook to numbers, not menu. The 7 PM bonfire-cooked chicken is a single-batch event — get the first round before the camp guests finish their portion.',
 'Pioneer Adventure private beach, Shnongpdeng, West Jaintia Hills, Meghalaya 793109',
 ARRAY['https://pioneeradventuretour.com/shnongpdeng-dawki/','https://pioneeradventuretour.com/'],
 'mixed', false, NULL),

('shnongpdeng', 'Marvel''s Camp Bonfire Kitchen', 'Marvel''s Camps riverside', 'casual',
 ARRAY['Khasi','Tribal','Indian'],
 'Pork-and-bamboo-shoot stew (Doh-Jem)',
 ARRAY['Doh-jem','Khasi dal-bhat','Grilled river fish','Pukhlein'],
 '₹₹', int4range(240, 420),
 'Marvel''s Camps & Treks runs a Khasi-led kitchen with the area''s strongest pork stew — Doh-Jem with fermented bamboo shoot (tungrymbai), cooked Jaintia-style with smoked pork rather than fresh. Riverside seating on bamboo platforms within metres of the Umngot.',
 'Veg portions are limited — ask for "Khasi veg thali" specifically and the cook adds the seasonal greens (jasturi, soh-niamtra). The doh-jem is the only dish worth ordering twice.',
 'Marvel''s Camps & Treks riverside, Shnongpdeng, West Jaintia Hills, Meghalaya 793109',
 ARRAY['https://www.marvelscamps.com/','https://www.tripadvisor.in/Hotels-g23838666-c3-zff29-Shnongpdeng_West_Jaintia_Hills_District_Meghalaya-Hotels.html'],
 'meat-heavy', false, NULL),

('shnongpdeng', 'Gawooh Adventure Camp Kitchen', 'Gawooh Adventure homestay', 'casual',
 ARRAY['Khasi','Indian'],
 'Home-cooked Khasi dal-bhat',
 ARRAY['Khasi dal-bhat','Tungrymbai','Boiled-vegetable thali','Smoked pork curry'],
 '₹', int4range(180, 320),
 'Gawooh Adventure is the #1-Best-Value Shnongpdeng property on Tripadvisor (5.0/5, 2024-25) and its in-house kitchen is the gentlest option — milder spice, full vegetarian thali available, family-style serving. The owner''s mother does the cooking on most evenings.',
 'Open to non-guests only by prior call. The morning Khasi tea is brewed with cardamom rather than ginger — request it specifically because the staff default to the tourist-grade masala chai.',
 'Gawooh Adventure Homestay, Shnongpdeng, West Jaintia Hills, Meghalaya 793109',
 ARRAY['https://www.tripadvisor.in/Hotels-g23838666-c3-zff29-Shnongpdeng_West_Jaintia_Hills_District_Meghalaya-Hotels.html'],
 'veg-friendly', false, NULL);

-- nongriat eats — HONEST SCARCITY (village ~150 pop, all food is homestay-attached: Serene/Byron's/Halari, no standalone eateries). 0 eateries inserted.


-- ============================================================================
-- DESTINATION STAY PICKS
-- ============================================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES

-- dawki stays (3) — all 4 slots needed since 0 existing
('dawki', 'experience', 'Shatsngi Homestay & Adventure', 'character_homestay',
 'Riverside Khasi homestay walkable to the Umngot ferry ghat; family-run with Khasi traditional cuisine on a balcony over the Umngot.',
 'The closest stay to the Umngot boating-ghat that''s family-run rather than camp-operator-run. Tripadvisor #4 of Dawki specialty lodging with a 4.7/5 rating and reviewers consistently flag the breakfast and the location. Note: registered PO is Shnongpdeng but the property itself sits inside Dawki municipal boundary on the river — 400 m from the boats.',
 'value', 5, 'web_search',
 'Tripadvisor SHATSNGI HOMESTAY & ADVENTURE Dawki',
 to_jsonb(ARRAY['https://www.tripadvisor.in/Hotel_Review-g15363485-d17647416-Reviews-Shatsngi_Homestay_Adventure-Dawki_West_Jaintia_Hills_District_Meghalaya.html']),
 to_jsonb(ARRAY['solo-female-safe','family-friendly'])),

('dawki', 'location', 'Dawki Umngot Riverside Homestay', 'character_homestay',
 'Direct Umngot-facing rooms in Darrang village, 5 minutes from the ferry ghat with rope-tethered boats visible from the verandah.',
 'The simplest verified river-front stay inside Dawki proper — Khasi family-owned, no camp infrastructure, just three rooms over the water. Booked through Holidify and local channels rather than international OTAs, which keeps it accessible at the low end of the price band.',
 'value', 4, 'web_search',
 'Holidify Homestays in Dawki listing',
 to_jsonb(ARRAY['https://www.holidify.com/hotels/homestays-in-dawki-10607.html']),
 to_jsonb(ARRAY['solo-female-safe'])),

('dawki', 'value', 'Lamin Guest House Dawki', 'guesthouse',
 'Budget Khasi guest-house in Dawki bazaar 200 m from the boat road; sparse rooms, hot bucket water, working fan.',
 'The cheapest verified clean bed inside Dawki bazaar — listed across A-HOTEL.com and Booking and useful when the camps at Shnongpdeng are full. No frills but the location is unbeatable for a sunrise boat departure.',
 'value', 4, 'web_search',
 'A-HOTEL.com Dawki accommodation listing',
 to_jsonb(ARRAY['https://www.a-hotel.com/india/203316-dawki/','https://www.booking.com/city/in/dawki.html']),
 to_jsonb(ARRAY['budget','solo-female-safe'])),

-- mawsynram stays (2 new — experience slot already filled by Emily and Sankrita)

('mawsynram', 'location', 'Goshen Homestay Mawsynram', 'character_homestay',
 'Clean minimalist rooms with modern amenities and homemade Khasi breakfast, set in walking distance of multiple waterfalls and the Mawjymbuin Cave.',
 'The most-recommended Mawsynram-circuit homestay outside Emily and Sankrita''s — featured in Outlook Traveller Meghalaya 2025 homestay coverage. Family-run, hot water, and the morning fog over the rainfall plateau is best photographed from the front balcony.',
 'mid', 4, 'web_search',
 'Outlook Traveller Magazine 2025 Mawsynram homestay coverage; Holidify hotels-where-to-stay Mawsynram',
 to_jsonb(ARRAY['https://www.holidify.com/places/mawsynram/hotels-where-to-stay.html']),
 to_jsonb(ARRAY['solo-female-safe','family-friendly'])),

('mawsynram', 'value', 'Rani Homestay (Cherrapunji-Mawsynram circuit base)', 'character_homestay',
 'Centrally located boarding house with clean rooms and full meal service, positioned as a value-base for the Mawsynram day trip 16 km away.',
 'Mawsynram village itself has only 2-3 functional stays; the Cherrapunji circuit is the working base for visitors who don''t book Emily-Sankrita 6 months ahead. Rani is the budget anchor — listed across multiple aggregators with consistent positive Meghalaya-ambience feedback.',
 'value', 4, 'web_search',
 'Holidify Mawsynram hotels listing; multiple 2024-25 trip blogs',
 to_jsonb(ARRAY['https://www.holidify.com/places/mawsynram/hotels-where-to-stay.html','https://www.holidify.com/hotels/resorts-in-mawsynram-7271.html']),
 to_jsonb(ARRAY['budget','solo-female-safe'])),

-- nongriat stays (1 new — experience slot already filled by Serene Homestay; village has Byron's = original tourism initiator)

('nongriat', 'location', 'Byron''s Homestay Nongriat', 'character_homestay',
 'Three-storey village home 2 minutes from the Double Decker Living Root Bridge; dormitories and private doubles, in-house Khasi buffet, the household that initiated Nongriat tourism.',
 'Byron is the man who started tourism in Nongriat — his three-floor home was the first guesthouse in the village and remains the most-photographed in trekker blogs. Rooms are basic (dorm ₹400, double ₹500) but the location is unmatched: bridge-adjacent, with a hot shower on every floor.',
 'value', 5, 'web_search',
 'eagleflyfree.com Serene Homestay write-up (references Byron as Nongriat tourism initiator); multiple 2024 trekker blogs',
 to_jsonb(ARRAY['https://eagleflyfree.com/en/serene-homestay/','https://www.ourguest.in/homestays/details/homestay/serene-homestay','https://www.tripoto.com/meghalaya/trips/serene-homestay-nongriat-meghalaya-5e7c9b25bda75']),
 to_jsonb(ARRAY['budget','solo-female-safe','trekker-friendly'])),

-- shnongpdeng stays (1 new — experience + location slots already filled by Pioneer + Marvel's)

('shnongpdeng', 'value', 'Gawooh Adventure Camping & Homestay', 'character_camp',
 'Tripadvisor #1-Best-Value Shnongpdeng with a 5.0/5 rating: simple riverside cabins and tent setup with Khasi family hospitality, in-house meals included.',
 'The most-loved budget option in the Shnongpdeng camp cluster (Tripadvisor #1 Best Value, 6 reviews 5.0/5 as of 2025). Family-owned, mother does the cooking, water-supply and quiet hours are well-managed — the issues some neighbours report (water cut at 8 PM at Goodwill, damp bedding at Riverruns) don''t happen here.',
 'value', 5, 'web_search',
 'Tripadvisor Shnongpdeng camping rankings 2026',
 to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g23838666-c3-zff29-Shnongpdeng_West_Jaintia_Hills_District_Meghalaya-Hotels.html','https://gawooh-adventure-camping-homestay.wheree.com/']),
 to_jsonb(ARRAY['budget','solo-female-safe','family-friendly']));

-- ============================================================================
-- END
-- ============================================================================
