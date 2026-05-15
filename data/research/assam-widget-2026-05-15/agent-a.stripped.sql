INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('guwahati-kamakhya-temple', 'guwahati', 'Kamakhya Temple (Nilachal Hill)',
   'Climb Nilachal Hill at dawn while the Brahmaputra still smokes below and you''ll find a temple that has no idol — only a yoni-shaped natural cleft kept moist by an underground spring, draped in red cloth, vermilion, and hibiscus. The shikhara is honeycombed Ahom-style with carved goddesses, the inner sanctum a damp stone cave you descend into barefoot. This is the highest seat of Tantric worship in India and one of the 51 Shakti Peethas — the site where Sati''s yoni is said to have fallen. During Ambubachi Mela (22-26 June 2025), three days of complete closure mark the goddess''s annual menstruation; red-soaked cloth distributed afterwards is among the most coveted prasad in Tantric India.',
   'Mass tourists treat it as a quick darshan stop between Umananda and the airport, miss the Ambubachi window entirely (rains scare off the comfort-seekers), and skip the secondary shrines at Bhuvaneshwari, Kamala, and the cremation-ground Tara — where night-time Aghori practice still happens. The descent into the garbhagriha terrifies most visitors enough to retreat without touching the spring-fed cleft.',
   'One of 51 Shakti Peethas in India; Ambubachi Mela 2025 drew ~25 lakh pilgrims per state SDRF estimates; featured Outlook Traveller, Times of India, BBC Travel.',
   8.2,
   '20 min uphill drive from Paltan Bazaar',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(91.7058, 26.1664), 4326)::geography,
   ARRAY['temple','shakti-peetha','tantric','ahom-architecture','pilgrimage']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('guwahati-umananda-island', 'guwahati', 'Umananda Island (Peacock Island)',
   'A ten-minute ferry from Umananda Ghat near Guwahati High Court drops you on a teardrop of forested rock in mid-Brahmaputra — splayed like peacock feathers, hence the name. The 1694 Ahom-era Shiva temple at the top was built by Bar Phukan Garhganya Handique under King Gadadhar Singha; an 1897 earthquake almost flattened it before a local merchant rebuilt the shrine. The myth here is older than the temple: Shiva burnt Kamadeva to ash with his third eye when the god of love disturbed his meditation, giving the hill its alternative name Bhasmachal (Ash Hill). Until 2020 the island still hosted introduced golden langurs.',
   'Most domestic tourists treat it as a passport-stamp photo stop, miss the carved hood-stones at the temple base depicting Sati''s dismembered body parts, and don''t realise this is recognised as the smallest inhabited river island in the world by Govt of Assam and Incredible India. The sunset ferry back framing the Saraighat Bridge is the unmarketed highlight.',
   'Featured Incredible India + Govt of Assam Tourism + Outlook Traveller; ~7000+ Google reviews 4.3★ avg.',
   1.5,
   '10 min ferry from Umananda Ghat',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(91.7440, 26.1947), 4326)::geography,
   ARRAY['temple','river-island','ahom-heritage','ferry-access','shiva']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('guwahati-madan-kamdev', 'guwahati', 'Madan Kamdev — Khajuraho of the East',
   'Forty kilometres northwest of Guwahati at Baihata Chariali, an archaeological field clears into the dismembered remains of at least 24 temples built by the Pala kings of Kamarupa in the 9th-10th centuries CE. The sandstone panels match Khajuraho in subject — dancing apsaras, mithuna couples, gods locked in carved embrace — but here the figures sit half-buried in grass, lichen-stained, untouristed. The site was officially excavated only in the 1970s after British officer Edward Tuite Dalton first noted the ruins in 1855; centuries of jungle had hidden them. There''s no ticket queue, no audio guide, no tour-bus signage. A small ASI museum on-site holds the relocated finer pieces.',
   'Khajuraho''s fame has buried Madan Kamdev''s — most Guwahati visitors don''t know it exists, and tour operators rarely pitch it because the road is mediocre and there''s no monetisable experience layer. Erotic-sculpture circuits in India default to Madhya Pradesh; this Assamese cousin sits without the conservation budget or the marketing.',
   'Featured Live History India + Incredible India + Govt of Assam Tourism; covered by Abhijna e-Museum heritage gallery.',
   38.0,
   '1.5 hours via NH27 to Baihata Chariali',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(91.6342, 26.3392), 4326)::geography,
   ARRAY['archaeology','erotic-sculpture','pala-dynasty','ruins','heritage']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('kaziranga-kalapahar-daigurung-corridor', 'kaziranga', 'Kalapahar-Daigurung Elephant Corridor (Karbi Anglong)',
   'Drive south of NH-715 into the Karbi Anglong hills during monsoon (July-September) and you may witness one of India''s most dramatic wildlife events — herds of elephants, rhinos, and swamp deer fleeing the flooded Kaziranga plains for high ground via the Kalapahar-Daigurung corridor near Silonijan. This is one of nine corridors recognised by the Supreme Court in its 2019 order banning private construction on these tracts. The combined Kaziranga-Karbi Anglong Elephant Reserve harbours ~2000 Asian elephants. A 34.5km elevated corridor project (NHAI-cleared) is under construction to give animals permanent overpass. Visit with a forest department guide from the Bokakhat range office; village viewpoints near Silonijan offer the safest sightings during flood season.',
   'Most tour itineraries fixate on the four named ranges inside KNP and ignore the broader migration story. The corridor is a sensitive landscape — no commercial safaris run here — which is exactly why it remains an uncrowded conservation-tourism experience for the prepared.',
   'WWF India + Wildlife Trust of India + Govt of Assam Forest Department; SC order 2019; covered Mongabay India + Down To Earth.',
   18.0,
   '40 min from Kohora to Silonijan',
   'moderate',
   4,
   ST_SetSRID(ST_MakePoint(93.3000, 26.5000), 4326)::geography,
   ARRAY['wildlife-corridor','elephant-migration','flood-season','karbi-anglong','conservation']
  );

INSERT INTO local_eateries (destination_id, name, area, category, cuisine, signature_dish, must_try, price_range, price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls, vegetarian, is_legendary, established_year) VALUES
  ('kaziranga', 'Assamese Affair', 'Kohora',
   'casual',
   ARRAY['Assamese'],
   'Assamese thali with pork and bamboo shoot',
   ARRAY['Pork with bamboo shoot','Fish curry with mustard sauce','Khar (alkaline curry)','Pitha (rice cakes)','Local pickles'],
   '₹',
   int4range(280, 421),
   'A small kitchen behind Kohora chariali quietly ranked #1 of Kohora restaurants on Tripadvisor by serving from-scratch Assamese plates the lodge buffets won''t bother making — pork-and-bamboo-shoot, fish in mustard, khar, fresh pithas. The thali is the headline; everything else is a bonus.',
   'Order at least 2 hours ahead by phone for pork-and-bamboo and fresh pitha — they cook to order, not in advance.',
   'Kohora Chariali, near NH-715, Kohora, Golaghat district',
   ARRAY['https://www.tripadvisor.com/Restaurant_Review-g17739836-d32788220-Reviews-Assamese_Affair-Kohora_Golaghat_District_Assam.html'],
   'meat-heavy',
   false,
   NULL
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('manas-national-park-mathanguri-viewpoint', 'manas-national-park', 'Mathanguri Viewpoint (Bhutan Border)',
   'Drive 22km north of Bansbari through dense Bhabar grassland and sal forest and the track ends at Mathanguri — a forest rest-house on the Manas river bank where India ends and Royal Manas National Park, Bhutan begins on the opposite bank. The river runs clear over white pebbles, the Bhutanese foothills rise blue behind. This is the only place in India where you can sit on the bank and watch wild elephants cross between two countries. The rest-house verandah at dawn is one of subcontinent''s most quietly cinematic spots: mist, birdsong, no signal, no other tourists. The combined India-Bhutan transboundary protected area is 1059 sq km — among the largest in Asia.',
   'Only forest-department vehicles can enter the core to reach Mathanguri, advance permit required from Bansbari range office. The 22km track is rough, the rest-house basic, and Bodo insurgency history (1992-2011 UNESCO "In Danger" listing) still suppresses bookings.',
   'UNESCO World Heritage 1985 + transboundary status with Royal Manas Bhutan; Outlook Traveller "Assam''s Best"; covered Sahapedia documentary.',
   22.0,
   '1 hour rough track from Bansbari',
   'moderate',
   5,
   ST_SetSRID(ST_MakePoint(91.0000, 26.7700), 4326)::geography,
   ARRAY['bhutan-border','transboundary','viewpoint','river','elephant-crossing']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('manas-national-park-beki-river', 'manas-national-park', 'Beki River — Rafting + Golden Langur Forest',
   'The Manas river splits into the Beki and Bholkaduba as it leaves the Bhutan foothills and enters Assam''s plains; the Beki is the cleaner, faster channel and the de facto rafting route inside Manas. Local operators run grade-II-III stretches from Mathanguri downstream during October-March when water clears. The riparian forest along its banks is one of two Indian habitats for the endangered golden langur (the other is Chakrashila WLS) and Bengal floricans display in the grassland nearby. The Manas-Beki system also feeds the Brahmaputra further south.',
   'Manas tourism markets the Bansbari safari and Mathanguri rest-house; the Beki river itself sits between the two and rarely makes the brochure. Rafting permits require the river guide and a Range Officer''s nod — most operators don''t advertise it.',
   'UNESCO + Wikipedia Manas River entry; Assam Tourism boating page; covered Outlook Traveller.',
   12.0,
   '30 min from Bansbari',
   'moderate',
   4,
   ST_SetSRID(ST_MakePoint(91.0500, 26.6800), 4326)::geography,
   ARRAY['river','rafting','golden-langur','bengal-florican','riparian-forest']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('manas-national-park-bansbari-range', 'manas-national-park', 'Bansbari Range — Tiger Reserve Core',
   'Bansbari is the central of Manas''s three forest ranges (Panbari west, Bansbari central, Bhuiyapara east) and the most accessible safari entry from Barpeta Road. The savannah-grass landscape here grows so tall during monsoon that elephants vanish into it — making winter safaris (November-March) the only window when you can actually see the Bengal tigers, pygmy hogs, hispid hares, wild buffalo, and golden langur the park is famous for. Manas''s pygmy hog reintroduction program (the world''s smallest pig species) operates from the Bansbari belt; the species was thought extinct until 1971.',
   'Domestic wildlife tourists default to Kaziranga''s rhinos. Manas suffered through Bodo insurgency 1992-2011 (UNESCO "In Danger" listing for 19 years) and the park''s reputation only began recovering after 2011 restoration. Tiger sightings are rarer than at Bandhavgarh or Tadoba which keeps the crowds thin.',
   'UNESCO 1985 World Heritage; Project Tiger reserve; pygmy hog program documented IUCN Red List + WWF; covered in danger 1992-2011, restored 2011.',
   0.5,
   '20 min from Bansbari Lodge',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(90.9700, 26.7200), 4326)::geography,
   ARRAY['tiger-reserve','safari','pygmy-hog','golden-langur','grassland']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('haflong-jatinga-bird-mystery', 'haflong', 'Jatinga — The Bird Mystery Ridge',
   'A small Khasi-Dimasa ridge village 9km south of Haflong, sitting 1000m up at the foot of the Borail range. On moonless, fog-bound nights in September and October between 6pm and 9:30pm, birds — tiger bittern, black bittern, pond heron, kingfisher, hill partridge, emerald dove — descend disoriented from the dark skies, drawn toward village lights, where they are knocked down with bamboo poles and killed. The phenomenon was first documented in writing by British tea-planter and naturalist E.P. Gee in his 1957 book ''Wild Life of India'' (he visited with ornithologist Salim Ali). The cause: high-altitude winds and fog disorient juvenile and local migrant birds at their roost; the lights of Jatinga act as a refuge they crash toward. Not actual suicide — but few places on earth host a more eerily specific avian event.',
   'Jatinga is hard to reach (the train to Haflong via Lumding is famously slow), the phenomenon only manifests in a narrow Sep-Oct window, and the local Khasi-Dimasa community has actively moved from killing the birds to protecting them via a Forest Department-aided observation tower, which means the spectacle is more muted than the legend.',
   'Documented E.P. Gee + Salim Ali 1957 ''Wild Life of India''; covered BBC + National Geographic + Times of India; Govt of Assam Dima Hasao tourism page.',
   9.0,
   '20 min south of Haflong',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(93.0017, 25.1278), 4326)::geography,
   ARRAY['ornithology','dimasa-khasi','phenomenon','E-P-Gee','observation-tower']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('haflong-haflong-lake', 'haflong', 'Haflong Lake — Hill-Station Heart',
   'A natural lake sitting in a bowl in the centre of Haflong town at 680m elevation — Assam''s only proper hill-station lake. In winter (November-February) it becomes a wintering site for migratory waterfowl arriving from Central Asia: bar-headed geese, lesser whistling ducks, ruddy shelducks, common teals, pintails. The lake is the town''s emotional and geographic centre; sunrise from the eastern bank with mist rising off the water and the Borail ridges silhouetted east is the postcard image of Dima Hasao. Boating is restricted to small paddle boats on the southern bank.',
   'Haflong itself receives a fraction of the Northeast tourism Meghalaya draws — the train via Lumding is slow, the road via Silchar is mountainous, and the lake is the kind of asset that needs the surrounding cultural context (Dimasa, Zeme Naga, Hmar settlements around the ridge) to feel cinematic rather than ordinary.',
   'Govt of Assam Tourism Dima Hasao page; covered Outlook Traveller "Switzerland of the Northeast"; The Better India Dima Hasao guide.',
   0.3,
   '5 min walk from Haflong centre',
   'easy',
   4,
   ST_SetSRID(ST_MakePoint(93.0167, 25.1675), 4326)::geography,
   ARRAY['lake','migratory-birds','hill-station','sunrise','winter']
  );

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('haflong-maibang-dimasa-capital', 'haflong', 'Maibang — Forgotten Dimasa Capital',
   'Forty-seven kilometres east of Haflong on the bank of the Mahur river sits Maibang — capital of the Dimasa Kachari Kingdom from the 16th to 18th centuries, before they were pushed further south to Khaspur by Ahom expansion. The headline ruin is the Ramchandi Temple (also called Maibang Stone House or "Longthai ni Noh" in Dimasa), a monolithic 12th-century shrine cut from a single boulder and crowned with two roofs. The Mahur river bends around a long stone-walled embankment that once protected the royal court. The Dimasa rajbari ruins, scattered stone-sculpture fragments, and the river-bank cremation steps are largely unmarked — you''ll need a Dimasa guide from Haflong to read the site. The kingdom''s textiles (Maibong jainsem and Dimasa risha) survive in a few weaver households.',
   'Maibang sits a long drive from Haflong on a winding mountain road; the train station here is on the Lumding-Badarpur loop but few people get off. The site has no ASI signage, no audio guide, and most local people don''t know the Dimasa story themselves.',
   'Wikipedia Maibang entry + Govt of Assam Tourism; covered Outlook Traveller Blue Ridge feature; Vocal Journal historical write-up.',
   47.0,
   '2 hours east via NH-27',
   'moderate',
   4,
   ST_SetSRID(ST_MakePoint(93.1314, 25.3094), 4326)::geography,
   ARRAY['archaeology','dimasa-kachari','stone-temple','ruins','tribal-kingdom']
  );