-- Agent B — UP heritage+Akbar closeout 2026-05-15
-- Scope: mathura, chitrakoot, fatehpur-sikri
-- Tally: 9 gems + 1 stay + 0 eats

-- ============================================================
-- mathura — 3 GEMS (Krishna janmasthan circuit)
-- ============================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
(
  'mathura-govardhan-hill-parikrama',
  'mathura',
  'Govardhan Hill & 23km Parikrama',
  'The 8km sandstone ridge that Krishna lifted on his little finger for seven days to shelter Vraj villagers from Indra''s thunderstorm — by far the most viscerally embodied story in the Krishna cycle. The 23km parikrama loops the entire hill barefoot, starting from Manasi Ganga Kund at Govardhan town and threading Radha Kund, Shyam Kund, Dan Ghati, Mukharavinda, Kusum Sarovar, and Punchari before closing back. Most pilgrims take 5-7 hours; serious devotees do dandavat parikrama (prostrating every step) over 7-10 days. Govardhan Puja (day after Diwali, around Nov 1) draws lakhs. Located 22km west of Mathura on the Mathura-Deeg road.',
  'Indian pilgrim-load is enormous on Govardhan Puja and Guru Purnima, but international visitors rarely make it past the central Krishna Janmasthan in Mathura town itself. The full circumambulation is physically demanding (heat, distance, no shade in summer) and most tour-circuit itineraries skip it for the comfortable Vrindavan ISKCON-Banke Bihari pair.',
  'Govardhan is the sacred centre of Braj — identified as a natural svayambhu form of Krishna himself (Govardhan Shila). Listed on Mathura district government tourism. Daily aarti at the main Mukharavinda darshan point near Dan Ghati.',
  22.0,
  '40 min from Mathura town',
  'moderate',
  5,
  ST_SetSRID(ST_MakePoint(77.4669, 27.4994), 4326)::geography,
  ARRAY['krishna','parikrama','heritage','vraj','pilgrimage']
),
(
  'mathura-krishna-janmasthan-temple',
  'mathura',
  'Krishna Janmasthan Temple Complex',
  'Believed to be the exact prison cell where Krishna was born to Devaki and Vasudeva inside Kansa''s palace. The current Garbha Griha (sanctum) is built around what tradition holds is the original birth-spot stone, with adjacent Bhagavat Bhavan housing the main Keshav Dev shrine and a marble Yashoda-Krishna icon. The complex shares a wall with the Shahi Eidgah mosque that Aurangzeb built in 1670 after demolishing the 1618 Veer Singh Bundela temple (which French traveller Tavernier described as a red-sandstone octagonal tower in 1650). One of Hinduism''s seven Moksha-puris. Janmashtami midnight aarti (Aug 14, 2026 — eve of Aug 15) is the year''s headline moment with lakhs queuing.',
  'Security around the Eidgah-temple boundary is heavy (CRPF-guarded, no mobiles, no bags) which deters casual visitors. Modern complex was rebuilt by Madan Mohan Malaviya''s trust from 1953 onward — many guidebooks dismiss it as "not historic" without grasping that the site itself is the deepest claim in Vaishnav devotion. Ongoing court case (filed 2020, ASI survey 2023) keeps coverage politically cautious.',
  'Janmasthan is named in Bhagavat Purana and Vishnu Purana as Krishna''s birthplace. Listed on UP Tourism. ASI survey conducted Dec 2023.',
  0.0,
  'Central Mathura',
  'easy',
  5,
  ST_SetSRID(ST_MakePoint(77.6635, 27.5046), 4326)::geography,
  ARRAY['krishna','temple','janmashtami','pilgrimage','heritage']
),
(
  'mathura-vishram-ghat-yamuna-aarti',
  'mathura',
  'Vishram Ghat Yamuna Evening Aarti',
  'The riverbank step where Krishna rested after killing his uncle Kansa — vishram literally means "rest". The Yamuna evening aarti here is older and more intimate than Varanasi''s Dashashwamedh: pandits light oil-diyas on banana-leaf rafts that float downstream from a marble-arched ghat lined with temples (Yamuna-Krishna shrine, Murli Manohar). Vishram Ghat is the central of Mathura''s 25 ghats, the start/end-point of the 14km Mathura Parikrama, and the boat-loading dock for sunset Yamuna rides past Vasudeva Ghat where Vasudeva carried infant Krishna across the river. Aarti at ~7pm (winter) / ~7:30pm (summer).',
  'Mathura town is overwhelmingly day-tripped from Agra (60km) or Delhi (180km) — by 5pm most tour groups have left, so the evening aarti runs almost entirely on local pilgrims. Sikandar Lodi banned worship here in the 15th c. but the ghat was reclaimed by Acharya Keshav Bhatt Kashmiri and Vallabhacharya — a layered history rarely told to visitors.',
  'Listed on Incredible India and UP Tourism. The Vishram Ghat aarti is the anchor stop on Mathura''s official tourism circuit.',
  4.0,
  '10 min from Mathura junction',
  'easy',
  5,
  ST_SetSRID(ST_MakePoint(77.6810, 27.5079), 4326)::geography,
  ARRAY['krishna','yamuna','aarti','riverside','heritage']
);

-- ============================================================
-- chitrakoot — 3 GEMS (Ram exile circuit)
-- ============================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
(
  'chitrakoot-kamadgiri-hill-parikrama',
  'chitrakoot',
  'Kamadgiri Hill & 5km Parikrama',
  'Kamadgiri means "the hill that fulfils desires" — the forested ridge where Ram, Sita and Lakshman lived for 11 years, 11 months and 11 days of their 14-year exile (Ramayana Aranyakanda). The 5km stone-paved parikrama loops the entire hill (3-4 hours barefoot) past Mukharvind temple (the hill''s "face"), Bharat Milap Mandir, Sakshi Gopal, Lakshman Mandir on the southern hillock (where Lakshman stood guard), Saryu Dhara, Pili Kothi and Barah Hanuman. The hill itself is the deity — Ram is said to have given Kamadgiri the boon that any pilgrim who circumambulates it will have their wish granted. Somavati Amavasya and Diwali Amavasya are the year''s peak days (lakhs walk overnight).',
  'Chitrakoot straddles UP-MP border (Karwi UP / Sitapur MP) — both halves are one continuous pilgrim site, but neither state markets it heavily and the town has zero airport (closest: Khajuraho 175km or Allahabad 130km). Most Ramayan-circuit tourism flows to Ayodhya now post-2024, leaving Chitrakoot under-visited.',
  'Listed on UP Tourism (Chitrakoot district official website). Bharat Milap Mandir features the rock-imprinted footprints of the four brothers — central scene of Tulsidas''s Ramcharitmanas.',
  0.0,
  'Central Chitrakoot',
  'moderate',
  5,
  ST_SetSRID(ST_MakePoint(80.8528, 25.2003), 4326)::geography,
  ARRAY['ramayana','parikrama','heritage','pilgrimage','tulsidas']
),
(
  'chitrakoot-hanuman-dhara-spring',
  'chitrakoot',
  'Hanuman Dhara — The Cooling Spring',
  'A rock-cut Hanuman shrine 5km from town, halfway up a Vindhyan ridge reached by 355 steps (or a small ropeway). The legend: after Hanuman burned Lanka with his blazing tail, he came here scorched — Ram shot an arrow into the cliff and a perennial spring sprouted out, falling continuously onto the deity''s tail to cool it. The dhara (stream) is real — a thin cool jet that emerges from somewhere inside the mountain, flows over the murti, and vanishes ten feet below into a kund whose source no geologist has traced. Hanuman Jayanti (April 22, 2026) is the peak day. View from the top spans the entire Mandakini valley and Kamadgiri ridge.',
  'Pilgrim-circuit guides emphasise Kamadgiri and Ramghat; Hanuman Dhara is treated as a side-stop. The 355-step climb deters bus-tour groups. The actual hydrogeology of the disappearing spring is genuinely unexplained — there is no published geological survey of where the water comes from or goes.',
  'Listed on Chitrakoot district government tourism and Incredible India.',
  5.0,
  '15 min from Chitrakoot + 355 steps',
  'moderate',
  4,
  ST_SetSRID(ST_MakePoint(80.8628, 25.2110), 4326)::geography,
  ARRAY['ramayana','hanuman','spring','viewpoint','pilgrimage']
),
(
  'chitrakoot-gupt-godavari-caves',
  'chitrakoot',
  'Gupt Godavari Twin Caves',
  'Two natural cave systems carved into a Vindhyan limestone ridge 18km from Chitrakoot — one narrow (single-file passage, knee-deep water year-round), one wider (Ram Darbar courtyard cave with murtis of Ram-Sita-Lakshman and a natural skylight opening directly overhead). Legend: the Godavari river wished to glimpse Ram during exile but didn''t want to be seen by anyone else, so she emerged secretly inside these caves, touched Ram''s feet, and vanished underground — hence gupt (hidden) Godavari. The water inside is cool and clear; the source-and-sink of the stream is geologically unexplained. Wear sandals; the narrow cave has 80m of wading.',
  'Most Chitrakoot itineraries day-trip from Khajuraho or Allahabad and only cover Ramghat + Kamadgiri before heading back. The 18km drive into the forested ridges keeps Gupt Godavari off most half-day bus circuits. The narrow cave wading deters families with small children and older pilgrims.',
  'Listed on MP Tourism (mptourism.com) and Chitrakoot district tourism. Featured in BetterIndia and Tour My India travel coverage.',
  18.0,
  '40 min from Chitrakoot',
  'moderate',
  5,
  ST_SetSRID(ST_MakePoint(80.7858, 25.1486), 4326)::geography,
  ARRAY['ramayana','cave','river','heritage','natural-formation']
);

-- ============================================================
-- fatehpur-sikri — 3 GEMS + 1 STAY
-- ============================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
(
  'fatehpur-sikri-buland-darwaza',
  'fatehpur-sikri',
  'Buland Darwaza — The 54m Victory Gate',
  'The world''s tallest gateway at 54m (177ft), raised by Akbar around 1576-77 as a victory arch commemorating his conquest of Gujarat (1573). The eastern archway carries a Persian inscription quoting Jesus: "Isa, Son of Mariam said: The world is a bridge, pass over it, but build no houses on it. He who hopes for an hour may hope for eternity. The world endures but an hour. Spend it in prayer, for the rest is unseen." Built in red and buff sandstone with white-and-black marble inlay and chhatris on top — climb the 42 outer steps and the proportions only resolve when you''re standing inside. The gate fronts the Jama Masjid and the Salim Chishti tomb complex, so it''s the pilgrim entry-point as well as the architectural showpiece. UNESCO World Heritage (1986).',
  'Most Agra day-trippers see Taj-Mahal-Agra-Fort and skip Fatehpur Sikri entirely (40km west of Agra). Tour-bus groups that do come usually spend 45 minutes in the Diwan-i-Khas palace half and never enter the Jama Masjid courtyard where Buland Darwaza actually stands — the two are separate ticketed precincts.',
  'UNESCO World Heritage Site (inscribed 1986, ID 255). Listed on ASI tajmahal.gov.in.',
  0.0,
  'Within Fatehpur Sikri',
  'easy',
  5,
  ST_SetSRID(ST_MakePoint(77.6603, 27.0938), 4326)::geography,
  ARRAY['unesco','mughal','akbar','heritage','architecture']
),
(
  'fatehpur-sikri-salim-chishti-tomb',
  'fatehpur-sikri',
  'Tomb of Salim Chishti — Marble Jali Masterpiece',
  'A white-marble Sufi tomb inside the Jama Masjid quadrangle, built 1580-81 by Akbar and re-clad in marble by Jahangir 1605-07. The lattice (jali) screens around the verandah are the finest surviving Mughal marble-pierce-work — geometric stars cut so thin they cast lace shadows. Salim Chishti (1478-1572) was the saint whom Akbar visited at his cell on the Sikri ridge to pray for an heir; when Akbar''s son was born 1569 he was named Salim (later Emperor Jahangir) after the saint. Inside the tomb, pilgrims tie red threads to the jali screens to make wishes — fulfilled, you return and untie them. The serpentine brackets supporting the eaves and the mother-of-pearl-inlaid sarcophagus are the most-photographed details in Fatehpur Sikri.',
  'Foreign-tourist itineraries focus on the palace half (Diwan-i-Khas, Panch Mahal). The Jama Masjid + Salim Chishti tomb are free-entry but require a separate cloth covering and side entry — most tour guides skip the side entrance route, dropping people only at the palace gate.',
  'Part of the UNESCO World Heritage Site listing (1986). Detailed academic coverage on Archnet (Aga Khan Trust for Culture).',
  0.0,
  'Inside Jama Masjid courtyard',
  'easy',
  5,
  ST_SetSRID(ST_MakePoint(77.6603, 27.0942), 4326)::geography,
  ARRAY['unesco','mughal','sufi','tomb','heritage']
),
(
  'fatehpur-sikri-panch-mahal-diwan-i-khas',
  'fatehpur-sikri',
  'Panch Mahal & Diwan-i-Khas Palace',
  'Two extraordinary buildings inside the palace precinct. Panch Mahal is a five-storey columnar wind-tower (Persian badgir tradition) built for the ladies of the harem — 176 carved sandstone columns, each tier asymmetrically smaller, topping out in a single domed chhatri. Originally screened with marble jalis. Diwan-i-Khas next door is the famous "private audience hall" with the central pillar that everyone comes to see: square base, octagonal mid-shaft, with 36 serpentine brackets spreading into a circular platform where Akbar sat surrounded on four stone walkways. This is where Akbar held his Ibadat-Khana religious debates with Hindu, Jain, Christian, Zoroastrian and Sufi scholars that birthed his syncretic Din-i-Ilahi philosophy. Anup Talao (ornamental pool) sits between the two — legend says Tansen sang Raga Deepak here and the diyas around the pool lit by themselves.',
  'Visitors crowd the central pillar of Diwan-i-Khas (5 minutes, photo, leave) and miss what made it actually radical — this was a multi-faith debating chamber in 1580, two centuries before European tolerance debates. The Panch Mahal layout (originally women-only screened pavilion) is rarely explained to tour groups.',
  'UNESCO World Heritage Site (1986). Detailed coverage in Britannica and Archnet.',
  0.0,
  'Within palace precinct',
  'easy',
  5,
  ST_SetSRID(ST_MakePoint(77.6610, 27.0948), 4326)::geography,
  ARRAY['unesco','mughal','akbar','palace','heritage']
);

-- ============================================================
-- fatehpur-sikri — 1 STAY (xfactor slot)
-- ============================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES
(
  'fatehpur-sikri',
  'xfactor',
  'Hotel Sunset View Guest House',
  'guesthouse',
  'Hilltop rooftop terrace 100m from Buland Darwaza — sunset over Akbar''s abandoned red-sandstone city from a chai-and-paratha rooftop. Rooms have small balconies overlooking the old town and the Stone Cutters'' Mosque.',
  'Fatehpur Sikri''s lodging market is thin — most Agra-based travellers day-trip and skip overnight stays. Sunset View is one of only two ranked B&B/inn properties in the town (40+ Tripadvisor reviews, 3.7/5), genuinely positioned for sunset over the Jama Masjid skyline. Budget-tier, hospitality-led, family-run — exactly the right profile for the xfactor slot here. Cleanliness reviews are mixed; come for the view and the location, not for luxury.',
  'value',
  4,
  'web_search',
  'https://www.tripadvisor.com/Hotel_Review-g797802-d1217732-Reviews-Hotel_Sunset_View_Guest_House-Fatehpur_Sikri_Agra_District_Uttar_Pradesh.html',
  to_jsonb(ARRAY['https://www.tripadvisor.com/Hotel_Review-g797802-d1217732-Reviews-Hotel_Sunset_View_Guest_House-Fatehpur_Sikri_Agra_District_Uttar_Pradesh.html','https://www.tripadvisor.com/Hotels-g797802-Fatehpur_Sikri_Agra_District_Uttar_Pradesh-Hotels.html']),
  to_jsonb(ARRAY['budget','sunset-view'])
);
