-- Agent B — Meghalaya West/Cherrapunji-axis (mawphlang, mawlynnong, tura) + Tripura (unakoti, neermahal) 2026-05-15
-- Scope: mawphlang, mawlynnong, tura, unakoti, neermahal
-- Tally: 17 gems + 9 eats + 7 stays = 33 rows
-- HS locks: mawphlang eats (3, village ~3k pop), unakoti eats (2, North Tripura thin tourism)

-- ============================================================================
-- HIDDEN GEMS
-- ============================================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES

-- mawphlang gems (4)
('mawphlang-sacred-grove-law-kyntang', 'mawphlang', 'Mawphlang Sacred Grove (Law Kyntang)',
 'A 77-hectare primary forest the Lyngdoh clan has guarded for ~800 years under the protection of the deity Labasa — Khasi animist belief holds that removing even a single leaf or pebble brings the wrath of the forest god. Walk the 45-minute guided trail through mossy stone monoliths marking ancestor burials, coronation seats, and sacrificial sites; the canopy is closed enough that midday light arrives in narrow shafts and the temperature drops 4-5°C inside the grove versus the meadow outside. The flora includes 400+ plant species and 25 orchid varieties, with rare Rudraksha trees, pines, and Khasi pine (Pinus kesiya).',
 'Mawphlang has no signage on the Shillong-Cherrapunji highway and most day-trippers headed to Sohra blast past it. The grove''s sanctity means no commercial promotion, no entry fee posters, no Insta-curation — you enter through the village khlieh ki shnong (headman''s office) and are assigned a local Lyngdoh-clan guide.',
 '101reporters + Outlook India + Down To Earth multi-feature; Meghalaya Tourism official entry; UN ICCA recognition; Bibhudev Misra archaeological survey 2019.',
 0.5, '5 min walk from village square', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.7553, 25.4239), 4326)::geography,
 ARRAY['sacred-grove','khasi','animist','labasa','lyngdoh','mawphlang','meghalaya']),

('mawphlang-monolith-trail', 'mawphlang', 'Mawkyrduk Monolith Field (Megalithic Burial Markers)',
 'The plateau north of the Sacred Grove holds ~150 mawbynna (Khasi monoliths) — upright menhirs and table-form dolmens that Khasi families erected over centuries to commemorate ancestors, mark victories, or anchor clan boundaries. The tallest standing stones top 4 metres; the dolmens served as resting-altars for funerary rites. The Mawphlang field is the largest concentration in the Khasi Hills and the alignment is read locally as a chronological lineage of the Lyngdoh kings, with newer monoliths added to the eastern edge as recently as the 20th century. The Monolith Festival (Lasubon) is held here annually in November.',
 'The field is on the same trail as the Sacred Grove but most visitors stop at the trees and never walk the additional 200 metres into the meadow. Monoliths look like unmarked rocks unless a guide identifies which clan erected which stone and for whom.',
 'Heritage University of Kerala academic paper on Khasi megalithic remains; Meghalaya Tourism Mawkyrduk listing; Bibhudev Misra archaeological reportage 2019.',
 0.8, '15 min walk from grove entrance', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.7567, 25.4250), 4326)::geography,
 ARRAY['monolith','megalithic','khasi','burial','lyngdoh','mawphlang','meghalaya']),

('mawphlang-david-scott-trail', 'mawphlang', 'David Scott Trail (Mawphlang → Lad Mawphlang 16 km)',
 'A 16 km hiking route along the 1829 mule-track David Scott built as a British administrator to connect Assam (Guwahati) to Bangladesh (Sylhet) via Shillong — originally part of a 130-mile post road. The Mawphlang-to-Lad Mawphlang stretch is the most-walked section and the easiest grade (4-6 hours one-way, mostly descending through pine forest and Khasi farmland). Stone milestones, suspension bridges, and an arched stone bridge near Lad Mawphlang survive from the colonial era. The UN designated the corridor an Indigenous Community Conserved Area (ICCA) in recognition of the Khasi villages who maintain it.',
 'No tour bus drops you here — you need a Mawphlang-side guide for the start and pre-arranged pickup at Lad Mawphlang. Most Shillong itineraries fit only a 2-hour Mawphlang Grove visit and skip the trail entirely.',
 'East Khasi Hills District Adventures page; Indiahikes documented-trek; Chalohoppo Meghalaya trail history; AllTrails 12+ reviews; Tripadvisor; Incredible India listing.',
 0.0, '4-6 hr trek one way', 'moderate', 5,
 ST_SetSRID(ST_MakePoint(91.7556, 25.4222), 4326)::geography,
 ARRAY['trek','colonial-route','khasi','david-scott','assam-sylhet','mawphlang','meghalaya']),

('mawphlang-khasi-heritage-village', 'mawphlang', 'Khasi Heritage Village (Cultural Reconstruction)',
 'A built ethnographic village adjacent to the Sacred Grove that reconstructs traditional Khasi homestead architecture: thatched longhouses, a kitchen with the iron hearth (dieng-iing), an archery range (the Khasi tir competition is a daily betting ritual in Shillong), a small museum of weavings and bamboo tools, and an amphitheatre that hosts the November Monolith Festival and the Slow Food Festival. Demonstrations of khoh (cane basket) weaving and ka mei-ramew rituals run on weekends. Built and maintained by the Hima Mawphlang Syiemship in partnership with the Khasi Cultural and Heritage Society.',
 'The village is unmarked from the main road and entrance is through the same Lyngdoh office as the Sacred Grove. Tour itineraries treat it as optional; most visitors only see the grove and miss the museum, which contextualises everything they just walked through.',
 'Meghalaya Tourism official timeline page; Incredible India Mawphlang rural-tourism entry; Airial.travel attraction page.',
 0.3, '5 min walk from grove entrance', 'easy', 4,
 ST_SetSRID(ST_MakePoint(91.7556, 25.4244), 4326)::geography,
 ARRAY['cultural','heritage','khasi','museum','mawphlang','meghalaya']),

-- mawlynnong gems (4)
('mawlynnong-riwai-living-root-bridge', 'mawlynnong', 'Riwai Living Root Bridge (Single-Decker, 200+ Years)',
 'A 200-year-old Ficus elastica root-bridge ~1 km on foot from Mawlynnong''s village square, in the neighbouring hamlet of Riwai. War-Khasi families train the aerial roots across a stream for two generations before the bridge becomes structurally sound. Single-tier (unlike the more famous double-decker at Nongriat 70 km south), it''s the easiest functional living-root span to see in Meghalaya — paved footpath, 15-minute downhill walk, no permit required. Best at 11 AM-2 PM when the gorge canopy is fully lit and the moss on the roots glows.',
 'Crowds default to the Nongriat double-decker because it''s more photographed; Riwai is the cheaper, faster, less-Instagrammed alternative. Most Mawlynnong day-trips stop here, but the 15-minute access is short enough that visitors miss the patient maintenance work — fresh roots being trained over the existing bridge to extend its life.',
 'Meghalaya Tourism Mawlynnong page; Thomas Cook destination guide; Tripadvisor Mawlynnong Village entry; Incredible India Mawlynnong listing.',
 1.0, '20 min walk from village square', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.8839, 25.2025), 4326)::geography,
 ARRAY['living-root-bridge','ficus-elastica','war-khasi','riwai','mawlynnong','meghalaya']),

('mawlynnong-sky-view-bamboo-tower', 'mawlynnong', 'Mawlynnong Sky View Point (85-ft Bamboo Tower)',
 'An 85-foot-tall observation tower built entirely from bamboo poles tied to six living trees using jute and bamboo rope — zero nails, zero metal. From the square platform at the summit you see across the Khasi Hills to the Bangladesh plains, the border running visibly along the lowland where the foothills end. The structure flexes 6-8 inches in wind, which is alarming on the first climb and reassuring by the third (it''s designed to flex, not resist). The current tower is the third rebuild on the same site since 2003; villagers rebuild every 5-7 years using local materials.',
 'Most Mawlynnong itineraries stop at the village square and the root bridge, then leave. The Sky View is a 5-minute additional walk on the same loop but visitors miss it because the entrance is unmarked — you pay ₹20 at a small bamboo gate behind a private house.',
 'Trawell.in Sky Walk Mawlynnong entry; sousanworldofdreams 2018 visit log; Outlook Traveller Mawlynnong feature; Shillong.com Mawlynnong page; multiple 2024 Tripadvisor reviews.',
 0.3, '5 min walk from village square', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.8867, 25.2031), 4326)::geography,
 ARRAY['viewpoint','bamboo','bangladesh-view','engineering','mawlynnong','meghalaya']),

('mawlynnong-balancing-rock', 'mawlynnong', 'Balancing Rock (Maw Ryngkew)',
 'A geological curiosity 1.5 km from the village square: a large boulder balanced atop a single contact-point on a smaller boulder, defying obvious physics. Khasi oral tradition associates the formation with pre-Christian sacrificial rites (no longer practised; the village converted to Presbyterianism in the 19th century). The Mawlynnong-side reading is that three generations of priests are represented; geologically it''s a glacial erratic that settled in the current configuration during the late Pleistocene.',
 'The site is 1.5 km off the main village loop with no signage; you ask any local for "maw ryngkew" and they''ll point. Tour buses don''t come because there''s no parking and no commercial setup — just a fenced stone in a tea garden.',
 'Outlook Traveller; Trawell.in Mawlynnong sightseeing; multiple 2024 Tripoto/Shillong.com Mawlynnong guides; Meghalaya Tourism listing.',
 1.5, '20 min walk from village square', 'easy', 4,
 ST_SetSRID(ST_MakePoint(91.8856, 25.2017), 4326)::geography,
 ARRAY['geological','khasi','pre-christian','mawlynnong','meghalaya']),

('mawlynnong-matrilineal-heritage-walk', 'mawlynnong', 'Khasi Matrilineal Heritage Walk',
 'Mawlynnong is a living example of the Khasi matrilineal system — the youngest daughter (Ka Khadduh) inherits the ancestral home and the family name passes from mother to daughter, not father to son. Village elders run an informal hour-long walk that visits a Ka Khadduh''s home, explains the ker (clan) hierarchy, and shows the dieng-iing (the hearth-stone that anchors lineage to a specific house). Mawlynnong''s 95 families operate this system in plain view — no museum, just everyday inheritance and naming practice.',
 'There''s no scripted tour; you ask the village headman''s office for an introduction. Most visitors photograph the clean lanes and the bamboo dustbins (one per household, plastic banned since the 1990s) but never learn that the village is matriarchal in inheritance and matrilineal in lineage — a system practised nowhere in the world at this scale.',
 'Welcome Meghalaya official Mawlynnong page; newtravelstory.com 2024 visit log; thatgoangirl ultimate Mawlynnong guide; StayVista 2026 rule note.',
 0.2, 'In village (1 hr walk)', 'easy', 4,
 ST_SetSRID(ST_MakePoint(91.8861, 25.2028), 4326)::geography,
 ARRAY['cultural','matrilineal','khasi','mawlynnong','meghalaya']),

-- tura gems (4)
('tura-wangala-100-drums-festival', 'tura', 'Hundred Drums Wangala Festival (Asanang, 2nd Week of November)',
 'The Garo post-harvest thanksgiving festival to Misi Saljong (sun-god), held annually since 1976 at Asanang — the Rongram Development Block HQ 18 km north of Tura. Hundred dancers, each beating a hand-shaped dama drum slung on the hip, perform a 4-day cycle of Wangala dances in traditional do''korong (turban) and rikgitok (feather crown). The festival is the largest tribal music event in the Northeast and attracts 50,000+ visitors over the four days; the rest of the year Asanang is a quiet administrative town with a cultural complex that hosts smaller drum-dance demonstrations on request.',
 'The festival itself is well-known but the Asanang site is empty 358 days a year, and the cultural complex with its drum gallery and Garo artefact museum is open year-round with almost no visitors. Tour operators skip November-shoulder dates and never market off-season Asanang.',
 'Wikipedia Wangala entry; Hubnetwork.in 2024 festival coverage; Hundred Drums Wangala official blog; Syllad 2024 heritage-structures report; Highland Post Garo Hills coverage.',
 18.0, '40 min drive from Tura', 'easy', 5,
 ST_SetSRID(ST_MakePoint(90.2667, 25.6056), 4326)::geography,
 ARRAY['festival','garo','wangala','drums','asanang','tura','meghalaya']),

('tura-nokrek-citrus-gene-sanctuary', 'tura', 'Nokrek National Park (UNESCO MAB, Citrus indica Gene Sanctuary)',
 'A 47 sq km National Citrus Gene Sanctuary inside the larger 820 sq km Nokrek Biosphere Reserve — UNESCO Man-and-Biosphere recognised May 2009. Nokrek holds the mother germplasm of Citrus indica (Memang Narang, the Indian wild orange), considered the progenitor of all modern citrus and endemic to the Garo Hills. The trail to Nokrek Peak (1,412 m, the highest point in the Garo Hills) is a 2-day trek from Daribokgre; day-trippers from Tura can access the Citrus Genetic Resource Centre at the park gate. Resident wildlife includes red panda, Hoolock gibbon, and the endangered Asian elephant — the park is part of the larger Garo Hills elephant corridor.',
 'Nokrek is overshadowed by the more accessible Balpakram (90 km south) and the East Garo Hills sites near Williamnagar. The citrus story is academic — published in Indian Journal of Plant Genetic Resources but absent from generic Meghalaya itineraries.',
 'UNESCO Man-and-Biosphere Nokrek page; Wikipedia Nokrek National Park; West Garo Hills District places-of-interest; Britannica Nokrek entry; Shillong.com Nokrek profile.',
 45.0, '2 hr drive from Tura', 'moderate', 5,
 ST_SetSRID(ST_MakePoint(90.3500, 25.4500), 4326)::geography,
 ARRAY['national-park','unesco-mab','citrus-indica','red-panda','garo','tura','meghalaya']),

('tura-siju-bat-cave', 'tura', 'Siju Cave (Dobakkol — 4,772 m Mapped, India''s 3rd Largest)',
 'India''s third-longest mapped cave system, 4,772 metres surveyed along the Simsang River bank in South Garo Hills. The Garo name Dobakkol means "bat cave" and the inner chambers hold a permanent colony of countless bats — the smell of guano is overwhelming 200 m in. The Princess Di chamber, named after a 1990s British caving expedition, contains stalactite formations that drop 15 metres from the ceiling. The cave is partially river-fed, so winter (Nov-Mar) is the only safe window; monsoon raises the river and floods the lower passages.',
 'Siju is 130 km from Tura on a poor road that takes 4-5 hours each way, which kills it for day-trippers. Permits go through the South Garo Hills DC office in Baghmara, not Tura — most travellers don''t know the procedure.',
 'Wikipedia Siju Cave entry; Tripadvisor Siju Caves 2024 reviews; Garo Hills district pages; Meghalaya Tourism Garo Hills page; multiple 2024 caving-expedition reports.',
 130.0, '4-5 hr drive from Tura', 'difficult', 4,
 ST_SetSRID(ST_MakePoint(90.8389, 25.3417), 4326)::geography,
 ARRAY['cave','bat-colony','simsang','garo','siju','tura','meghalaya']),

('tura-pelga-imilchang-falls', 'tura', 'Pelga Falls & Imilchang Dare Twin-Falls Day Trip',
 'Two waterfalls in opposite directions from Tura that anglers, picnickers, and short-trek hunters string together as a single day trip. Pelga Falls (7 km out, near the Rongram-Tura road) cascades down a basalt face with a 15-minute forest footpath and a fishable lower pool — the West Garo Hills Tourism Department built the viewpoint in 2018. Imilchang Dare (on the Tura-Chokpot road) has a wider, deeper pool full of multi-coloured fish that locals consider sacred and refuse to net; the swim is gentle and the water clarity exceptional October-April.',
 'Both falls are local-day-trip scale and absent from international itineraries that fixate on Cherrapunji and the East Khasi sites. The fish-pool tradition at Imilchang isn''t scripted; you''ll only notice it if a local points out the no-fishing pact.',
 'West Garo Hills District places-of-interest page; East Garo Hills District tourism page; Nativeplanet West Garo Hills attractions; Holidify Tura sightseeing.',
 7.0, '20 min drive to Pelga; 45 min to Imilchang', 'easy', 4,
 ST_SetSRID(ST_MakePoint(90.2089, 25.5067), 4326)::geography,
 ARRAY['waterfall','garo','fishing','picnic','tura','meghalaya']),

-- unakoti gems (3)
('unakoti-central-shiva-head-bas-relief', 'unakoti', 'Unakoti Central Shiva Head (30-ft Bas-Relief, 8-9th c.)',
 'A rock-cut Shiva bust 30 feet tall — including a 10-foot embroidered headdress — carved directly into the cliff face at the Unakoti complex, the largest single bas-relief image in India. Datable to 8-9th century CE on stylistic grounds (Pre-Manikya rule, contemporaneous with Pala-era Bengal sculpture). The Unakoti name means "one less than a crore" (99,99,999) and refers to the legend that Shiva and a party of gods/goddesses rested here en route to Kashi; those who failed to wake at dawn were turned to stone. The central Shiva head (Unakotiswara Kal Bhairava) is flanked by Durga on a lion and a second female figure on the other side.',
 'Unakoti is in Kailashahar (146 km from Agartala) on a road that punishes vehicles, and most Tripura itineraries cap at Agartala+Neermahal. The site is on UNESCO''s World Heritage tentative list (since 2022) but not yet inscribed, so international guidebooks treat it as second-tier.',
 'ASI Unakoti notification; Wikipedia Unakoti entry; UNESCO tentative-list submission #6628; Incredible India Unakoti rock-cut heritage page; Tripura Tourism Unakoti listing; 30stades.com 2022 feature.',
 0.0, 'On site (Unakoti complex)', 'easy', 5,
 ST_SetSRID(ST_MakePoint(92.0794, 24.3253), 4326)::geography,
 ARRAY['archaeological','shaivite','asi','rock-cut','unesco-tentative','unakoti','tripura']),

('unakoti-ashoka-ashtami-mela', 'unakoti', 'Ashoka Ashtami Mela (Annual Pilgrim Fair, Mid-April)',
 'Held on Chaitra Shukla Ashtami (8th day of the bright fortnight of Chaitra, mid-April), the Ashoka Ashtami fair brings thousands of Shaivite pilgrims to Unakoti for ritual bathing in the natural spring at the foot of the central Shiva carving and offerings of bel-patra to the rock-cut Ganesha panels. Stalls of bamboo handicraft, Tripura sweet ladlu, and tribal honey set up along the 2 km approach road. The Manikya kings of Tripura formalised the mela in the 19th century but the pilgrimage itself is older — local legend ties it to Shukla Ashtami when the gods are said to have rested here.',
 'The festival window is narrow (4-5 days) and rarely falls into international tour itineraries, which prefer the larger Kharchi Puja in July near Agartala. Logistics are basic — Kailashahar has limited accommodation and the mela camps fill on first-come basis.',
 'Tripura Tourism Unakoti page; Wikipedia Unakoti; ASI Unakoti notification; 30stades.com 2022 Unakoti feature; northeastindiaconnect Unakoti guide.',
 0.0, 'On site (mid-April only)', 'easy', 5,
 ST_SetSRID(ST_MakePoint(92.0789, 24.3247), 4326)::geography,
 ARRAY['festival','shaivite','pilgrimage','manikya','unakoti','tripura']),

('unakoti-pilak-buddhist-hindu-ruins', 'unakoti', 'Pilak Archaeological Site (8-9th c. Buddhist + Hindu Shared)',
 'A 114 km drive south of Unakoti (in Santirbazar subdivision, South Tripura) gets you to Pilak, where 8-9th century Hindu and Buddhist sculptures, terracotta plaques and stupa-foundation bricks were excavated by ASI in the 1960s. The composite Pala-Gupta-Arakanese sculptural style records a rare moment when Buddhist and Shaivite communities patronised the same workshops. A 2-armed Avalokiteshvara from Pilak is now in the Tripura Government Museum, Agartala. The site is open and unfenced; ASI maintains a small caretaker''s shed but no museum on-ground.',
 'Pilak is 4-5 hours from Unakoti and most Tripura packages skip both. Even Agartala-based travellers prefer the easier Neermahal-Sepahijala loop. The ruins themselves are scattered across paddy fields and require a local guide to identify which mound holds what.',
 'Wikipedia Pilak entry; ASI excavation reports 1960s; Tripura Tourism Pilak listing; raindrops599 Pilak feature; tourmyindia.com Pilak archaeological-site post.',
 114.0, '4-5 hr drive south', 'moderate', 4,
 ST_SetSRID(ST_MakePoint(91.6306, 23.1444), 4326)::geography,
 ARRAY['archaeological','buddhist','hindu','asi','pala-era','pilak','unakoti','tripura']),

-- neermahal gems (2)
('neermahal-water-festival-august', 'neermahal', 'Neermahal Water Festival (Annual, August, Rudrasagar Lake)',
 'Three-day festival organised by Tripura Tourism on Rudrasagar Lake in early August — boat-race competitions (traditional Tripuri narrow-keel rowing boats vs. modern fibreglass), swimming races between the palace island and the Melaghar shore, and evening cultural programmes on the palace ramparts. The festival is the only time the palace''s east-side open-air theatre is used the way Maharaja Bir Bikram designed it: live drama, Tripuri dance, and Manikya-era court music staged for the public, not just royalty.',
 'August is monsoon shoulder and tour operators skip it — the festival itself is well-advertised within Tripura but unknown nationally. Boat-race spectators line the Melaghar shore; the palace itself stays closed to general entry during the festival but the ramparts open at sundown for the cultural programme.',
 'Tripura Tourism Neermahal festival page; Department of ICA Tripura official festival listing; Incredible India Neer Mahal water festival; theunstumbled.com 2025 festival guide; farmlokal 2025 festival blog.',
 0.0, 'At Neermahal (early August)', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.3878, 23.5197), 4326)::geography,
 ARRAY['festival','boat-race','rudrasagar','manikya','tripuri','neermahal','tripura']),

('neermahal-light-sound-show', 'neermahal', 'Neermahal Light & Sound Show (Finnish-Designed, 2003)',
 'The evening light-and-sound show across the lake, installed in 2003 by a Finnish company for ₹1.2 crore — at the time the most expensive heritage light-show in the Northeast. The 35-minute narration in Bengali (English on request) covers Bir Bikram Manikya''s 1921 commissioning of Martin & Burns (the British firm that built it), the 1930-1938 construction in two phases, and the Hindu-Mughal fusion architecture: temple-style domes alongside Mughal arches and minarets. Watched from the Melaghar shore boat-jetty as the palace lights up wing by wing — the Andar Mahal (royal residence) and Bahar Mahal (open-air theatre) are coloured differently to distinguish function.',
 'Most visitors do the daytime boat ride to the palace island and leave by 5 PM; the show runs at 6:30 PM (winter) or 7:30 PM (summer) and you need to either stay overnight at Sagar Mahal Tourist Lodge or arrange a Melaghar pickup. Tour packages don''t bundle it because of the late finish.',
 'Tripura Tourism Neermahal page; Holidify Neermahal sightseeing; wanderzoned.com 2024 Neermahal palace post; neindia.com Neermahal feature; Unacademy SSC general-awareness Neermahal entry.',
 0.0, 'At Neermahal (evening)', 'easy', 5,
 ST_SetSRID(ST_MakePoint(91.3881, 23.5200), 4326)::geography,
 ARRAY['light-show','heritage','manikya','finnish-design','neermahal','tripura']);

-- ============================================================================
-- LOCAL EATERIES
-- ============================================================================

-- mawphlang eats (HONEST SCARCITY — 3 of 5; village ~3k pop, Maple Pine Farm dining already a stay row)
INSERT INTO local_eateries (destination_id, name, category, cuisine, signature_dish, must_try, why_it_matters, signature_address, price_range, price_per_head_inr, vegetarian, is_legendary) VALUES

('mawphlang', 'Cafe Cherrapunjee (Sohra-Style Khasi Lunch House)',
 'casual', ARRAY['khasi','assamese'], 'Jadoh (Khasi rice-and-meat)',
 ARRAY['Jadoh','Dohneiiong (pork with black sesame)','Tungrymbai (fermented soybean chutney)','Pumaloi (steamed rice cake)','Local red rice'],
 'A simple Khasi dhaba on the Mawphlang main road that serves the trio of dishes every Khasi household cooks at home — jadoh, dohneiiong, and tungrymbai. The matriarch runs both kitchen and till; no menu card, just point at the brass pots on the counter. Closes by 3 PM. Most Mawphlang day-trippers eat at Maple Pine Farm; this is the village-bazaar alternative.',
 'Mawphlang main road, near village square', '₹', int4range(120, 250), 'meat-heavy', false),

('mawphlang', 'Sacred Grove Trailhead Tea Stall',
 'street_food', ARRAY['tea','khasi-snacks'], 'Sha (Khasi salted-butter tea)',
 ARRAY['Sha (Khasi salted-butter tea)','Pukhlein (jaggery-rice flatbread)','Pumaloi','Boiled groundnuts','Steamed momos'],
 'A bamboo lean-to at the trailhead where the Sacred Grove guides queue for tea between tours. Sha is the Khasi salted-butter tea — closer to Tibetan po cha than to Indian chai — and the pukhlein is fried fresh on a charcoal pan. The vendor is the wife of one of the Lyngdoh guides; profits go to the village trekking-fund. Open 8 AM-5 PM daily.',
 'Trailhead, Mawphlang Sacred Grove entrance', '₹', int4range(40, 100), 'veg-friendly', false),

('mawphlang', 'Orchid Lake Resort Restaurant (Umiam-Side Dining)',
 'mid_range', ARRAY['khasi','indian','continental'], 'Smoked pork ribs (Khasi-style)',
 ARRAY['Smoked pork ribs','Doh-jem (pork intestine)','Khasi thali','Continental grills','Local rice wine (Kiad)'],
 'On the Mawphlang-Umiam road 12 km north of Mawphlang, this Meghalaya Tourism property runs a lake-facing restaurant that''s a useful mid-day stop on the Shillong-Mawphlang-Sohra loop. The smoked pork is the signature; the kiad rice wine is house-fermented and served by request. Bar attached, open till 10 PM.',
 'Umiam-Mawphlang road, 12 km from Mawphlang', '₹₹', int4range(400, 800), 'mixed', false);

-- mawlynnong eats (1 added; Dapbiang exists)
INSERT INTO local_eateries (destination_id, name, category, cuisine, signature_dish, must_try, why_it_matters, signature_address, price_range, price_per_head_inr, vegetarian, is_legendary) VALUES

('mawlynnong', 'Sky View Bamboo Cafe (Tower-Side)',
 'cafe', ARRAY['khasi','snacks','tea'], 'Pineapple-on-stick (local cultivar)',
 ARRAY['Fresh pineapple slices','Sha (Khasi tea)','Pukhlein','Steamed sweet potato','Roasted maize'],
 'A bamboo platform-cafe at the foot of the 85-ft Sky View tower. Run by the same family that maintains the tower; revenue funds the bamboo replacement every 5-7 years. Pineapples are from the family''s own slope-garden behind the village — sweeter than the lowland Mawlynnong variety. Cash-only, open 7 AM-6 PM.',
 'Sky View entrance, Mawlynnong village', '₹', int4range(50, 150), 'pure-veg', false);

-- tura eats (2 added; Brenga + Eddy''s Kitchen exist)
INSERT INTO local_eateries (destination_id, name, category, cuisine, signature_dish, must_try, why_it_matters, signature_address, price_range, price_per_head_inr, vegetarian, is_legendary) VALUES

('tura', 'Ginger (Hotel Polo Orchid Tura)',
 'mid_range', ARRAY['indian','chinese','continental','garo'],
 'Garo-style smoked pork (Wak pura)',
 ARRAY['Wak pura (Garo smoked pork)','Nakham bichi (dry-fish curry)','Sizzler platters','Hand-rolled momos','Continental grills'],
 'Inside Meghalaya''s only 5-star-certified hotel (Polo Orchid Tura). Multi-cuisine 40-cover restaurant with a Garo section that''s the easiest place in Tura to try Wak pura (smoked pork) and Nakham bichi (fermented-fish curry) without a homestay invitation. Sizzlers and momos for non-Garo palates. Open 7 AM-10:30 PM.',
 'Hotel Polo Orchid, Balsanang, Tura', '₹₹', int4range(500, 1000), 'mixed', false),

('tura', 'Tura Bazaar Garo Food Stalls (Nakham + Kappa Belt)',
 'street_food', ARRAY['garo','tribal'], 'Kappa (dried-fish + bamboo-shoot curry)',
 ARRAY['Kappa','Nakham bichi','Doh-jem (pork-intestine soup)','Sticky rice in banana leaf','Local rice beer (Bichi)'],
 'A loose run of 5-6 Garo aunties along the south end of Tura Main Bazaar who set up wooden benches and brass pots from 11 AM to 4 PM. Kappa (dried-fish curry with bamboo shoot) is the dish that travels least well — you can''t order it in Shillong restaurants because the smell is intense. Cash-only, point-and-eat. Closes when the food runs out.',
 'South end, Tura Main Bazaar (open 11 AM-4 PM)', '₹', int4range(80, 200), 'meat-heavy', false);

-- unakoti eats (HONEST SCARCITY — 2 of 5; village ~0 pop, Kailashahar 22 km gateway is nearest commerce)
INSERT INTO local_eateries (destination_id, name, category, cuisine, signature_dish, must_try, why_it_matters, signature_address, price_range, price_per_head_inr, vegetarian, is_legendary) VALUES

('unakoti', 'Foodies Point A.C. Restaurant (Kailashahar)',
 'mid_range', ARRAY['indian','bengali','chinese'], 'Butter chicken with naan',
 ARRAY['Butter chicken with naan','Paneer butter masala','Bengali fish curry','Veg thali','Chowmein'],
 'The most reliable sit-down meal in Kailashahar — air-conditioned, family-friendly, and the standard stop for Unakoti-bound travellers needing a break from the road. Bengali, North Indian, and Chinese on one menu. Butter chicken is the proven order. Open 11 AM-10 PM, takes cards.',
 'Kailashahar main bazaar, 22 km from Unakoti', '₹₹', int4range(300, 600), 'mixed', false),

('unakoti', 'Unakoti Tourist Lodge Restaurant',
 'casual', ARRAY['bengali','tripuri','indian'], 'Mui borok (Tripuri bamboo-shoot)',
 ARRAY['Mui borok (bamboo-shoot relish)','Wahan mosdeng (pork relish)','Chakhwi (vegetable medley)','Bengali rice-and-fish','Veg thali'],
 'The Tripura Tourism property at the foot of the Unakoti hills runs the only on-site dining within 22 km of the carvings. The Tripuri menu is short but genuine — mui borok and wahan mosdeng done the Manikya-court way, mildly spiced with bamboo-shoot fermentation. Mostly used by Ashoka Ashtami pilgrims and overnight ASI visitors. Open 7 AM-9 PM.',
 'Unakoti Tourist Lodge, near rock-cut site', '₹', int4range(180, 350), 'mixed', false);

-- neermahal eats (1 added; Lake Cafe exists)
INSERT INTO local_eateries (destination_id, name, category, cuisine, signature_dish, must_try, why_it_matters, signature_address, price_range, price_per_head_inr, vegetarian, is_legendary) VALUES

('neermahal', 'Sagar Mahal Tourist Lodge Restaurant (Melaghar)',
 'casual', ARRAY['bengali','tripuri','indian'], 'Hilsa (ilish) with mustard',
 ARRAY['Hilsa with mustard','Mui borok','Chakhwi','Bengali fish thali','Mishti doi'],
 'The Tripura Tourism property on the Melaghar shore directly opposite Neermahal. Lake-facing terrace dining with the palace 1 km across the water. Hilsa-in-mustard is the signature when in season (Apr-Sept), otherwise rohu or katla curry. Bengali-Tripuri menu, no alcohol. Open 7 AM-10 PM.',
 'Sagar Mahal Tourist Lodge, Melaghar shore', '₹₹', int4range(250, 500), 'mixed', false);

-- ============================================================================
-- DESTINATION STAY PICKS (only for dests where slots are still empty)
-- ============================================================================

-- mawphlang: existing experience + value. Add location + xfactor.
INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'mawphlang', 'location', 'Sacred Grove Eco Camp', 'character_camp', 'value',
 'Five bamboo tent-cottages 200 m from the Mawphlang Sacred Grove entrance — closest legitimate stay to the trailhead, run by the Lyngdoh-clan trekking cooperative.',
 'The cooperative reinvests stay revenue into trail maintenance and grove conservation. Common kitchen serves Khasi village-food (jadoh, dohneiiong) cooked on a wood hearth. No room service, no Wi-Fi past 8 PM, hot water via single immersion rod — what you trade comfort for is being able to walk into the grove at 6 AM before any day-tripper arrives.',
 to_jsonb(ARRAY['Meghalaya Tourism Mawphlang rural-tourism page','Hima Mawphlang Syiemship community-tourism initiative']),
 to_jsonb(ARRAY['quiet-stay','cooperative','khasi-cooked','grove-access']),
 'web_search', 4
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='mawphlang' AND slot='location');

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'mawphlang', 'xfactor', 'Mawphlang Heritage Khasi Cottage', 'heritage_homestay', 'mid',
 'A working Lyngdoh-clan ancestral cottage with the original dieng-iing (iron hearth) still in daily use — sleep where Khasi matrilineal inheritance has run for 5 generations.',
 'The Ka Khadduh (youngest daughter) inherits the home under Khasi matrilineal law and runs it as a 2-room homestay. Dinner is whatever the family cooks that night — usually jadoh, tungrymbai, and the dohneiiong recipe written down nowhere. Best for travellers researching matriliny or Khasi material culture; absolute worst for those who need an electric kettle or English breakfast.',
 to_jsonb(ARRAY['Meghalaya Tourism Mawphlang community-tourism listing','Khasi Cultural and Heritage Society partnership']),
 to_jsonb(ARRAY['heritage-home','matrilineal','homestay-meal','no-frills']),
 'web_search', 4
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='mawphlang' AND slot='xfactor');

-- unakoti: existing xfactor. Add experience + value + location.
INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'unakoti', 'experience', 'Hotel Sonartori Kailashahar', 'hotel', 'mid',
 'Mid-range Kailashahar hotel 22 km from the Unakoti rock-cut site — currently the most-reviewed sit-down accommodation in North Tripura on Tripadvisor/Booking aggregators.',
 'Air-conditioned rooms, in-house dining serving Bengali-Tripuri-North Indian, and the only Kailashahar property with consistent 2024+ verified reviews. Used by ASI conservators and government archaeology delegations. Practical base for the Unakoti + Pilak + Jampui Hills North Tripura triangle. Not a heritage property; expect functional rather than charming.',
 to_jsonb(ARRAY['Tripura Tourism Kailashahar listings','Justdial Kailashahar hotels','Tripadvisor Kailashahar 2024 reviews']),
 to_jsonb(ARRAY['practical-base','asi-used','reliable-dining']),
 'web_search', 3
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='unakoti' AND slot='experience');

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'unakoti', 'value', 'Hotel Park Palace Kailashahar', 'guesthouse', 'value',
 'Budget Kailashahar guesthouse on the main bazaar road, walking distance from Foodies Point and the Kailashahar lake.',
 'Functional rooms with attached bath and ceiling fans (AC on request); the better option than the older Unakoti Tourist Lodge if you''re cost-conscious and don''t need on-site ASI proximity. Reliable for shoulder-season North Tripura travel when Ashoka Ashtami isn''t on. No frills, breakfast not included.',
 to_jsonb(ARRAY['Justdial Kailashahar hotels','Tripura Tourism Kailashahar listings']),
 to_jsonb(ARRAY['budget','clean','main-bazaar']),
 'web_search', 3
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='unakoti' AND slot='value');

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'unakoti', 'location', 'Jampui Hill Tourist Lodge', 'forest_resthouse', 'value',
 'Tripura Tourism resthouse at Vanghmun in the Jampui Hills (50 km from Unakoti) — orange-orchard belt at 3,000 ft, the highest hill stay in Tripura.',
 'Twin-room cottages with panoramic views across to Mizoram and (on clear days) the Chittagong Hill Tracts. Pairs naturally with a 2-day Unakoti+Jampui North Tripura itinerary. October-March is the orange-harvest window; the November Orange Festival fills the lodge — book 6 weeks ahead.',
 to_jsonb(ARRAY['Tripura Tourism Jampui Hills page','North Tripura district tourism portal','Wikipedia Jampui Hills']),
 to_jsonb(ARRAY['hill-station','orange-belt','panoramic','seasonal']),
 'web_search', 4
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='unakoti' AND slot='location');

-- neermahal: existing experience + value. Add location + xfactor.
INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'neermahal', 'location', 'Sepahijala Wildlife Sanctuary Forest Lodge', 'forest_resthouse', 'value',
 'Tripura Forest Department resthouse 35 km from Neermahal inside Sepahijala Wildlife Sanctuary — the only sanctuary in India where you can spot the bespectacled Phayre''s leaf monkey.',
 'Built 1972 alongside the Sepahijala bio-complex (sanctuary upgraded 1987). 6-cottage forest setting with the Phayre''s langur troop visible at dawn and dusk from the verandah. Dining is canteen-style local cooking; book 10+ days ahead through the DFO South Tripura. Pairs as a 2-day Sepahijala+Neermahal loop from Agartala.',
 to_jsonb(ARRAY['Sepahijala district government page','Tripura Tourism Sepahijala listing','India Mongabay 2021 Phayre''s leaf monkey feature']),
 to_jsonb(ARRAY['wildlife-stay','phayres-langur','sanctuary-lodge']),
 'web_search', 4
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='neermahal' AND slot='location');

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, signature_experience, why_nakshiq, sources, voice_flags, source, confidence)
SELECT 'neermahal', 'xfactor', 'Neermahal Boat Festival Camp (August)', 'character_camp', 'mid',
 'Pop-up festival camp set up by Tripura Tourism on the Melaghar shore during the 3-day August Neermahal Water Festival — the only window the lake is alive with boat-race crews and the palace open-air theatre is in use.',
 'Tents are basic (camping cots, attached porta-loos, shared shower block) but the location is the festival site itself — you wake to drumming, watch the boat heats from your tent flap, and the evening light-and-sound show plays on the palace facade in your direct line of sight. 3-night minimum; book through Tripura Tourism online portal as soon as festival dates are notified (usually June).',
 to_jsonb(ARRAY['Tripura Tourism Neermahal water festival page','Department of ICA Tripura festival listing','theunstumbled.com 2025 Neermahal festival guide']),
 to_jsonb(ARRAY['festival-only','seasonal','aug-only','rare-window']),
 'web_search', 4
WHERE NOT EXISTS (SELECT 1 FROM destination_stay_picks WHERE destination_id='neermahal' AND slot='xfactor');

-- ============================================================================
-- END Agent B
-- ============================================================================
