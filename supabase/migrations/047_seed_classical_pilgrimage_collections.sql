-- 047_seed_classical_pilgrimage_collections — seed 10 missing classical
-- pilgrimage + heritage circuits identified in the competitive gap audit.
--
-- All destination_id refs were FK-checked against the destinations table
-- before writing this migration. Tiruvannamalai (Pancha Bhoota agni-element)
-- is not yet in the destinations table — Pancha Bhoota is shipped with 4 of 5
-- stops + an honest-scarcity note in strategy_intro.
--
-- cover_video left NULL for all 10 — text-only header until videos are
-- generated against the 10 prompts queued in video-prompts.csv (use_case
-- = 'collection cover'). cover_image also NULL for now.

INSERT INTO collections (id, name, description, content_type, items, tags, risk_level, strategy_intro, connector_notes) VALUES
(
  'dwadasa-jyotirlinga',
  '12 Jyotirlingas — The Complete Shiva Pilgrimage',
  'The 12 self-manifested ''Pillar of Light'' Shiva temples spread across nine states, from Somnath on the Arabian Sea to Rameshwaram at the southern tip — a cross-India spiritual circuit at the heart of Hindu pilgrimage.',
  'circuit',
  '[
    {"rank":1,"destination_id":"somnath","note":"First of the 12. Believed eternally restored after 17 destructions. Arabian Sea-facing sanctum at the western tip of Saurashtra."},
    {"rank":2,"destination_id":"dwarka","note":"Nageshwar Jyotirlinga sits 16km from Dwarka town. Krishna''s ancient kingdom — pair with an Original Char Dham visit."},
    {"rank":3,"destination_id":"ujjain","note":"Mahakaleshwar — the only south-facing (dakshina-mukhi) Jyotirlinga. The 4am Bhasma aarti uses funerary ash from the cremation ghats."},
    {"rank":4,"destination_id":"omkareshwar","note":"Set on Mandhata island in the Narmada, shaped like the sacred ''Om'' syllable. Unique among the twelve."},
    {"rank":5,"destination_id":"trimbakeshwar","note":"Source of the Godavari River at the foot of Brahmagiri Hill. Three-faced lingam representing Brahma-Vishnu-Shiva."},
    {"rank":6,"destination_id":"bhimashankar","note":"Sahyadri forest temple at 1,034m. Birthplace of the Bhima River. A wildlife sanctuary surrounds the shrine."},
    {"rank":7,"destination_id":"ellora-caves","note":"Grishneshwar — adjacent to Ellora''s Cave 16 (Kailasa). Smallest of the 12 sanctums but the geographical anchor of the Marathwada Shiva belt."},
    {"rank":8,"destination_id":"srisailam","note":"Mallikarjuna atop Nallamala Hills. Krishna River gorge below. Also one of the 18 Shakti Peethas — the site is doubly sacred."},
    {"rank":9,"destination_id":"rameswaram","note":"Said to have been built by Ram before crossing to Lanka. Longest temple corridor in India (197m). 22 sacred wells inside the complex."},
    {"rank":10,"destination_id":"kedarnath","note":"18km Himalayan trek or helicopter. Submerged-then-saved behind a boulder during the 2013 floods. The most physically demanding stop."},
    {"rank":11,"destination_id":"varanasi","note":"Kashi Vishwanath beside the Ganga. The 2021 Vishwanath Corridor reopened the temple-to-river axis after 250 years of urban encroachment."},
    {"rank":12,"destination_id":"deoghar","note":"Vaidyanath — the healer aspect of Shiva. The Shravan Mela in July-August draws 5M+ pilgrims walking from Sultanganj with Ganga water."}
  ]'::jsonb,
  ARRAY['pilgrimage','shiva','temple-circuit','hindu-religious','spiritual'],
  'serious',
  'The Dwadasa Jyotirlinga — twelve self-manifested ''pillars of light'' where Shiva is said to have appeared as fiery cosmic columns — are scattered across nine Indian states. Completing the full circuit is the deepest pilgrimage in Shaivism and traditionally takes three to four weeks. Most pilgrims travel in regional clusters over multiple trips rather than one continuous yatra. Two of the twelve — Kedarnath and Bhimashankar — involve sustained physical effort; the rest are road- and rail-accessible.',
  'Geography splits naturally into five zones: West (Somnath + Nageshwar in Gujarat); Central (Mahakaleshwar + Omkareshwar in MP); Maharashtra (Trimbakeshwar + Bhimashankar + Grishneshwar); South (Mallikarjuna at Srisailam + Rameshwaram); North (Kedarnath + Varanasi + Vaidyanath at Deoghar). Domestic flights connect most clusters; rail covers the rest. Kedarnath is open May–October only.'
),
(
  'pancha-bhoota-stalams',
  'Pancha Bhoota Stalams — The 5 Element Shiva Temples',
  'Five Shiva temples in South India where the lingam represents one of the five great elements — earth, water, fire, air, and ether — collectively forming the Pancha Bhoota Stalams of Shaivite cosmology.',
  'circuit',
  '[
    {"rank":1,"destination_id":"kanchipuram","note":"Ekambareshwar — Prithvi (Earth) element. The lingam is made of earth itself; no abhishekam (anointing ritual) is performed because of its composition."},
    {"rank":2,"destination_id":"trichy","note":"Jambukeshwarar at Tiruvanaikaval (Trichy) — Appu / Jala (Water) element. A natural underground spring keeps the sanctum''s sub-shrine permanently flooded."},
    {"rank":3,"destination_id":"chidambaram","note":"Nataraja Temple — Akasha (Sky/Ether) element. The empty sanctum behind the curtain is the original ''Chidambara Rahasyam'' — the sky-element invisible by definition."},
    {"rank":4,"destination_id":"srikalahasti","note":"Kalahasteeswara — Vayu (Air) element. The flickering lamps in the windless sanctum supposedly move on their own, evidence of the air deity''s presence."}
  ]'::jsonb,
  ARRAY['pilgrimage','shiva','south-india','temple-circuit','five-elements'],
  'easy',
  'The Pancha Bhoota Stalams are five Shiva temples in Tamil Nadu and Andhra Pradesh — one for each of the five great elements (pancha bhoota) of Shaiva-Siddhanta cosmology. The full set is: Ekambareshwar at Kanchipuram (earth), Jambukeshwarar at Tiruvanaikaval/Trichy (water), Arunachaleshwar at Tiruvannamalai (fire), Kalahasteeswara at Srikalahasti (air), Nataraja at Chidambaram (sky/ether). Tiruvannamalai (the fire-element temple) is a notable destination not yet in our database — a future addition will complete the set on this collection page.',
  'All five sit within Tamil Nadu and southern Andhra Pradesh, comfortably done as a 5–7 day road circuit from Chennai or Bangalore. Conventional pilgrim order is geographical: Kanchipuram → Tiruvannamalai → Chidambaram → Trichy → Srikalahasti, ending closest to Tirupati for an extended weekend.'
),
(
  'sapta-puris',
  'Sapta Puris — The 7 Sacred Cities of Moksha',
  'Seven ancient cities believed in Hindu tradition to grant moksha (liberation) — Ayodhya, Mathura, Haridwar, Varanasi, Kanchipuram, Ujjain and Dwarka — bridging mythological, devotional and continuous-living-civilisation history.',
  'destinations',
  '[
    {"rank":1,"destination_id":"ayodhya","note":"Ram Janmabhoomi — birthplace of Lord Ram. The new Ram Mandir consecrated January 2024."},
    {"rank":2,"destination_id":"mathura","note":"Krishna Janmabhoomi — birthplace of Krishna. Dwarkadheesh and Banke Bihari nearby; pair with Vrindavan."},
    {"rank":3,"destination_id":"haridwar","note":"Maya — gateway to the Char Dham. Ganga arrives in the plains here; evening Ganga aarti at Har Ki Pauri is iconic."},
    {"rank":4,"destination_id":"varanasi","note":"Kashi — believed to have been continuously inhabited for 3,000+ years. Death here is said to grant direct moksha."},
    {"rank":5,"destination_id":"kanchipuram","note":"Kanchi — the Vishnu-Shiva double city. Ekambareshwar (Shiva, earth-element) and Varadaraja Perumal (Vishnu) are both must-visits."},
    {"rank":6,"destination_id":"ujjain","note":"Avantika — site of the Mahakaleshwar Jyotirlinga and the once-in-12-years Simhastha Kumbh Mela."},
    {"rank":7,"destination_id":"dwarka","note":"Dwaravati — Krishna''s sea-facing kingdom. Dwarkadheesh Temple and offshore archaeological sites mark the original city now beneath the Arabian Sea."}
  ]'::jsonb,
  ARRAY['pilgrimage','sapta-puri','sacred-cities','moksha','hindu-religious'],
  'moderate',
  'In Hindu tradition, seven cities — Ayodhya, Mathura, Maya (Haridwar), Kashi (Varanasi), Kanchi (Kanchipuram), Avantika (Ujjain) and Dwaravati (Dwarka) — are believed to grant liberation (moksha) to those who die within their boundaries. The Sapta Puri concept is older than most of the temples within these cities; the cities themselves have been continuously inhabited for two to three millennia. Visiting all seven is not a circuit in the geographical sense — they are scattered from the Arabian Sea to the Bay of Bengal — but most devotees treat them as a lifetime list rather than a single trip.',
  'No natural ordered route. Most pilgrims pair geographically: North Indian cluster (Ayodhya + Mathura + Haridwar + Varanasi) over 8–10 days; West (Dwarka + Ujjain) over 4–5 days; South (Kanchipuram) as a Tamil Nadu add-on. Each city is a major rail/air hub.'
),
(
  'original-char-dham',
  'Original Char Dham — The 4 Corners of India',
  'Adi Shankaracharya''s 8th-century pan-India yatra: Badrinath in the Himalayas, Dwarka on the Arabian Sea, Puri on the Bay of Bengal and Rameshwaram at the southern tip — distinct from the Uttarakhand ''Chota'' Char Dham circuit.',
  'circuit',
  '[
    {"rank":1,"destination_id":"badrinath","note":"North dham — Vishnu in his Badri-Narayan form. Sits at 3,133m on the Alaknanda. Hot springs at Tapt Kund. Open May–November."},
    {"rank":2,"destination_id":"dwarka","note":"West dham — Krishna''s sea-facing kingdom on the Arabian Sea. Dwarkadheesh Temple flag changes five times a day."},
    {"rank":3,"destination_id":"puri","note":"East dham — Lord Jagannath. The annual Rath Yatra in June-July draws over a million on the Grand Road."},
    {"rank":4,"destination_id":"rameswaram","note":"South dham — built by Lord Ram before crossing to Lanka. Pamban Bridge connects to the mainland; 22 sacred wells inside the temple."}
  ]'::jsonb,
  ARRAY['pilgrimage','char-dham','vaishnav','original-char-dham','hindu-religious'],
  'serious',
  'Adi Shankaracharya organised the original Char Dham yatra in the 8th century: four mathas in the four cardinal corners of India, dedicated to Vishnu (Badrinath), Krishna (Dwarka), Jagannath (Puri) and Ram (Rameshwaram). Completing all four is the canonical pan-India pilgrimage — distinct from the much smaller Uttarakhand ''Chota'' Char Dham (Yamunotri-Gangotri-Kedarnath-Badrinath) which lies entirely within one state. Modern pilgrims typically need 18–25 days of travel via flights between the four anchor cities.',
  'No road circuit possible — the four corners are too far apart. Standard pattern: clockwise sequence starting at Puri (East), Badrinath (North via Dehradun), Dwarka (West via Ahmedabad/Jamnagar), Rameshwaram (South via Madurai). Each leg is a separate flight; Badrinath is closed November–April, fixing the season.'
),
(
  'mahabharata-trail',
  'Mahabharata Trail — Walking the Epic',
  'Six places anchoring the Mahabharata narrative — from Krishna''s birthplace at Mathura through the Kaurava-Pandava capital at Indraprastha (Delhi), to the Kurukshetra battlefield, ending at the Sangam where the epic was recited.',
  'circuit',
  '[
    {"rank":1,"destination_id":"mathura","note":"Krishna''s birthplace. The starting point of the epic''s Vrishni-clan storyline. Pair with Vrindavan for the full Krishna-leela context."},
    {"rank":2,"destination_id":"delhi","note":"Indraprastha — the original Pandava capital, believed to have been at present-day Purana Qila. Yudhishthira''s coronation site by tradition."},
    {"rank":3,"destination_id":"kurukshetra","note":"The battlefield itself. 18 days of war on this Haryana plain. Brahma Sarovar tank, Jyotisar (where the Bhagavad Gita was delivered), Bhishma Kund."},
    {"rank":4,"destination_id":"prayagraj","note":"Sangam — Triveni confluence of Ganga, Yamuna and Saraswati. Where Vyasa is said to have first recited the Mahabharata to Janamejaya."},
    {"rank":5,"destination_id":"dwarka","note":"Krishna''s later kingdom on the Arabian Sea. The post-war years; the city is said to have submerged after Krishna''s departure."},
    {"rank":6,"destination_id":"somnath","note":"Bhalka Tirtha near Somnath — the spot where Krishna was struck by an arrow and left this world. The geographical end-point of the epic."}
  ]'::jsonb,
  ARRAY['pilgrimage','mahabharata','epic','vaishnav','hindu-religious','heritage'],
  'moderate',
  'The Mahabharata isn''t one place but a chain — from Krishna''s birth at Mathura, through the Pandava court at Indraprastha (Delhi''s Purana Qila), the 18-day battlefield at Kurukshetra, the Sangam at Prayagraj where the epic was first recited, Krishna''s second kingdom at Dwarka, to Bhalka near Somnath where his earthly journey ended. Tracing these six gives you a chronological walk through the world''s longest epic. Most stops have on-site museums or temples explicitly tied to specific Mahabharata events; some require a guide to surface the connection.',
  'A natural west-to-east-to-west loop: Mathura → Delhi → Kurukshetra → Prayagraj cluster (3-4 days), then Dwarka + Somnath as a separate Gujarat trip (3 days). Total 7-10 days. Avoid June (heat) and August (monsoon flooding around the Yamuna and Ganga).'
),
(
  'major-shakti-peethas',
  'Major Shakti Peethas — Where Devi Took Form',
  'Four of the most-visited Shakti Peethas — sites where parts of Sati''s body fell as Shiva carried her remains in grief — anchoring the goddess-worship tradition across India.',
  'destinations',
  '[
    {"rank":1,"destination_id":"guwahati","note":"Kamakhya at Nilachal Hill — yoni-shaped natural rock formation; the most-visited Shakti Peetha. Ambubachi Mela in June draws ~2 million."},
    {"rank":2,"destination_id":"kolhapur","note":"Mahalakshmi Ambabai — one of the six Shakti Peethas where parts of Sati''s body fell. The original wealth-goddess shrine, distinct from the Mumbai Mahalakshmi."},
    {"rank":3,"destination_id":"kolkata","note":"Kalighat Kali Temple — the Peetha where Sati''s right toe is said to have fallen, giving Kolkata (Kalikata → Kalighat) its name."},
    {"rank":4,"destination_id":"kurukshetra","note":"Bhadrakali Shakti Peetha — believed location of Sati''s right ankle. The temple sits within walking distance of the Mahabharata battlefield landmarks."}
  ]'::jsonb,
  ARRAY['pilgrimage','shakti-peetha','devi','goddess-worship','hindu-religious'],
  'easy',
  'Shakti Peethas are sites where parts of Sati''s body or ornaments fell as Shiva, mad with grief, carried her remains across the cosmos until Vishnu''s discus dismembered her. Different traditions count 18, 51, 52 or even 108 Peethas. This collection covers four of the most actively visited and pilgrimage-anchored: Kamakhya (Guwahati), Mahalakshmi (Kolhapur), Kalighat (Kolkata), and Bhadrakali (Kurukshetra). Each is a complete weekend pilgrimage in itself; collectively they cover four corners of India.',
  'Geographically scattered — better treated as long-weekend trips than a single tour. Guwahati and Kolkata pair as a Northeast-East flight loop (4–5 days). Kolhapur fits a Pune-Belgaum trip. Kurukshetra works as a Delhi day-trip. The Ambubachi Mela at Kamakhya (June) is the year''s biggest goddess-worship gathering — book accommodation 2-3 months ahead.'
),
(
  'caves-of-india',
  'Caves of India — Rock-Cut Heritage',
  'Six of India''s greatest rock-cut cave complexes — from the painted Buddhist viharas of Ajanta to the prehistoric rock shelters of Bhimbetka — covering 2,200 years of carved-stone history.',
  'destinations',
  '[
    {"rank":1,"destination_id":"ajanta-caves","note":"30 Buddhist rock-cut caves carved 2nd century BCE to 6th century CE. The painted murals — especially Cave 1 and Cave 17 — are among Asia''s greatest surviving ancient art."},
    {"rank":2,"destination_id":"ellora-caves","note":"34 Buddhist, Hindu and Jain caves cut between 6th and 11th centuries. Cave 16 (Kailasa) is the world''s largest single monolithic rock excavation."},
    {"rank":3,"destination_id":"elephanta-caves","note":"Trimurti Sadashiva Cave on Gharapuri Island, ferry from Mumbai. The 5.4m three-headed Shiva relief is one of the great icons of Indian sculpture."},
    {"rank":4,"destination_id":"belum-caves","note":"India''s second-longest cave system (3,229m surveyed). Limestone karst with stalactites, stalagmites and underground freshwater stream — entirely different geology from the rock-cut sites."},
    {"rank":5,"destination_id":"undavalli-caves","note":"4th-century rock-cut cave temple on the Krishna River near Vijayawada. Monolithic reclining Vishnu in the upper chamber. Pallava-era engineering."},
    {"rank":6,"destination_id":"bhimbetka","note":"Prehistoric rock shelters in MP — paintings dating back ~30,000 years, the oldest known continuously-evidenced human habitation in India. UNESCO World Heritage."}
  ]'::jsonb,
  ARRAY['heritage','caves','rock-cut','unesco','archaeology','art-history'],
  'moderate',
  'India''s cave heritage breaks into three families: the Buddhist-Hindu-Jain rock-cut sanctuaries of the Western Ghats (Ajanta, Ellora, Elephanta), the limestone karst formations of the Deccan (Belum, Borra), and the prehistoric rock shelters of central India (Bhimbetka). This collection covers six of the most visit-worthy spanning all three categories, omitting the smaller Western Ghats sites (Karla, Bhaja, Kanheri) which require dedicated Mumbai day-trips. Together they cover roughly 32,000 years of human visual history — from prehistoric ochre handprints to baroque Pallava sculpture.',
  'Maharashtra cluster (Ajanta + Ellora + Elephanta) is the natural starting point — 4-5 days based out of Aurangabad and Mumbai. Bhimbetka pairs with a Bhopal-Sanchi heritage trip (3 days). Belum and Undavalli sit on an AP rail loop (2 days from Vijayawada). All sites are accessible without trekking; Ajanta has a steep stair descent into the gorge.'
),
(
  'iconic-train-journeys',
  'Iconic Train Journeys of India — Toy Trains, Heritage Lines and Coastal Runs',
  'Six routes that make India''s rail heritage visible — four UNESCO-recognised mountain railways plus the Konkan and Matheran light railways — each a distinct landscape and engineering personality.',
  'destinations',
  '[
    {"rank":1,"destination_id":"darjeeling","note":"Darjeeling Himalayan Railway — UNESCO World Heritage 1999. The world''s first hill passenger railway, opened 1881. Loops, zigzags and switchbacks; steam-hauled summer specials."},
    {"rank":2,"destination_id":"shimla","note":"Kalka-Shimla Railway — UNESCO 2008. 96km, 102 tunnels (including the 1.14km Barog Tunnel), 988 bridges. The Shivalik Express runs vista-domed cars June–November."},
    {"rank":3,"destination_id":"coonoor","note":"Nilgiri Mountain Railway — UNESCO 2005. The only rack-railway in India (Abt-system rack track on the steepest sections). Mettupalayam to Ooty via Coonoor; X-class steam locomotives still in service."},
    {"rank":4,"destination_id":"ooty","note":"NMR terminus at Udhagamandalam (Ooty). Reverse the journey down to Mettupalayam for the best photography light. Rotation of the locomotive on the Mettupalayam turntable is a sight in itself."},
    {"rank":5,"destination_id":"matheran","note":"Matheran Light Railway — narrow-gauge toy train climbing 21km from Neral. The only motorised vehicle allowed in Matheran (the town bans cars and motorcycles)."},
    {"rank":6,"destination_id":"gokarna","note":"Konkan Railway anchor — the 756km Roha-Mangalore line opened 1998 has 92 tunnels, 2,000+ bridges and one of the world''s most scenic monsoon rail routes. Gokarna sits on the southern half."}
  ]'::jsonb,
  ARRAY['heritage','railway','toy-train','unesco','transport-experience','engineering-marvels'],
  'easy',
  'Indian Railways operates four UNESCO-listed mountain railways (Darjeeling, Nilgiri, Kalka-Shimla, Matheran is on the tentative list) plus the spectacular monsoon Konkan Railway between Mumbai and Mangalore. Together they cover four entirely different mountain ecosystems and three distinct narrow-gauge engineering traditions: rack-and-pinion (NMR), zigzag and loops (DHR), and tunnel-and-viaduct (Kalka-Shimla, Konkan). Each ride is a journey rather than a transit — book second-class (window seats, breeze) or first-class for the long-distance heritage runs.',
  'No connecting circuit possible — four mountain railways are in four different states. Best paired with their hill-station destinations: NMR with Coonoor-Ooty (3-4 days); Kalka-Shimla with a Himachal week; DHR with a Sikkim-Darjeeling trip (5-7 days); Matheran as a Mumbai weekend; Konkan Railway as the connecting Mumbai-Goa monsoon route (1 day). Book heritage classes 60-90 days ahead via IRCTC.'
),
(
  'ramayana-trail',
  'Ramayana Trail — Walking Where Ram Walked',
  'Five anchor sites tracing Ram''s exile and return — Ayodhya (birth), Chitrakoot (forest exile), Nashik (Panchavati), Hampi (Kishkindha) and Rameshwaram (the bridge to Lanka).',
  'circuit',
  '[
    {"rank":1,"destination_id":"ayodhya","note":"Ram Janmabhoomi — the start of the epic. The new Ram Mandir consecrated January 2024 anchors the modern pilgrimage."},
    {"rank":2,"destination_id":"chitrakoot","note":"Forest exile years. Ram, Sita and Lakshman lived here for 11 of their 14 vanvas years. Mandakini ghats, Sphatik Shila, Hanuman Dhara."},
    {"rank":3,"destination_id":"nashik","note":"Panchavati — where the Surpanakha episode unfolded and Sita was abducted from. Sita Gufa, Kalaram Temple, Tapovan."},
    {"rank":4,"destination_id":"hampi","note":"Kishkindha — Sugriva''s monkey kingdom. Anjaneya Hill (Hanuman''s birthplace by tradition), Pampa Sarovar, Rishimukha. Ramayana sites here predate Vijayanagar by centuries."},
    {"rank":5,"destination_id":"rameswaram","note":"Setubandh — where Ram built the bridge to Lanka with the help of Sugriva''s vanara army. Pamban island; the temple of Ramanathaswamy with its 197m corridor."}
  ]'::jsonb,
  ARRAY['pilgrimage','ramayana','epic','vaishnav','hindu-religious','heritage'],
  'moderate',
  'The Ramayana isn''t a single place but a route — from Ayodhya (Ram''s birth) through the forest exile years at Chitrakoot, the Panchavati episode at Nashik, the meeting with Hanuman and the Vanara army at Kishkindha (Hampi), to the bridge built at Rameshwaram before crossing to Lanka. Visiting all five gives a chronological walk through the epic. Each stop has on-site shrines and landmark spots tied to specific incidents — a guide is recommended at Hampi where the Ramayana sites pre-date the more famous Vijayanagar ruins.',
  'Natural north-to-south sequence: Ayodhya → Chitrakoot (3 hours by road south) → Nashik (overnight train) → Hampi (long train via Hyderabad) → Rameshwaram (train via Chennai-Madurai). Total 12-15 days. Avoid June (heat across the route) and the immediate post-monsoon (Ayodhya river flooding).'
),
(
  'christian-heritage-trail',
  'Christian Heritage Trail — From St. Thomas to the Portuguese Basilicas',
  'Six anchors of India''s 2,000-year Christian heritage — from the oldest European church at Kochi to the Portuguese basilicas of Old Goa and the Lutheran fort-church at Tranquebar.',
  'circuit',
  '[
    {"rank":1,"destination_id":"kochi","note":"St. Francis Church (1503) — the oldest European church in India. Vasco da Gama was buried here before his remains were repatriated to Lisbon in 1539. Pair with Mattancherry''s Paradesi Synagogue."},
    {"rank":2,"destination_id":"thrissur","note":"Kerala''s Christian heart — Our Lady of Lourdes Cathedral, the Vimala Matha Cathedral and many more. Thrissur is also the seat of the Syro-Malabar Catholic Church (Mar Thoma Christians)."},
    {"rank":3,"destination_id":"old-goa","note":"Basilica of Bom Jesus (1605) — UNESCO. Holds the incorrupt body of St. Francis Xavier in a silver casket; viewed every 10 years. Sé Cathedral, Convent of St. Francis of Assisi all within walking distance."},
    {"rank":4,"destination_id":"panaji","note":"Our Lady of the Immaculate Conception (1541) — the iconic white double-staircase church above Panaji. The original ringing bell came from the ruined Augustinian church at Old Goa."},
    {"rank":5,"destination_id":"puducherry","note":"Sacred Heart Basilica and Notre Dame des Anges — French-era Gothic and neo-Gothic in pastel-perfect condition. The French Quarter walks like a Catholic European old town."},
    {"rank":6,"destination_id":"tharangambadi","note":"Zion Church (1701) — India''s oldest Lutheran church, founded by the Tranquebar Mission. The first Tamil Bible was printed here in 1715. Inside Fort Dansborg complex."}
  ]'::jsonb,
  ARRAY['heritage','christian','colonial','portuguese','french','danish','churches'],
  'easy',
  'Indian Christianity predates most European national churches — tradition holds St. Thomas the Apostle landed at Muziris (near Kochi) in 52 CE and established the first churches in Kerala. The colonial era added three more denominational layers: Portuguese Catholicism (Goa, 1510), Danish Lutheranism (Tranquebar, 1620), and French Catholicism (Pondicherry, 1673). This trail covers six anchors across Kerala, Goa and the Tamil Nadu-Pondicherry coast — together telling a 2,000-year story you can''t get from any single denomination.',
  'A natural south-coastal sweep: Kochi → Thrissur (1 hour) by road; fly Kochi to Goa (Old Goa + Panaji 2-3 days); then Tamil Nadu coast Tranquebar → Pondicherry (3 days). Total 8-10 days. Best in November-February (cool dry weather, all the saint-day feasts active). Old Goa is busiest during the St. Francis Xavier feast week (early December).'
);
