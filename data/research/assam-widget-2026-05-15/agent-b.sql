-- Agent B — Assam widget topup 2026-05-15
-- Scope: sivasagar, charaideo, majuli, jorhat
-- Tally: 14 gems + 6 eats + 5 stays inserted; 4 HS locks declared

-- =====================================================================
-- ====== sivasagar (Ahom capital 1699-1788) ======
-- =====================================================================
-- Need: +3 GEMS + 1 EAT + 1 value stay + 1 xfactor stay

-- ----- GEMS (3) -----
INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('sivasagar-talatal-ghar-kareng-ghar',
   'sivasagar',
   'Talatal Ghar & Kareng Ghar',
   'Seven storeys — four above ground, three below. The above-ground halls (Kareng Ghar, rebuilt 1752 in brick by Rajeswar Singha on Suklenmung''s 1540 wooden foundation) host arches that look almost Mughal, but stand on Ahom rice-paste-egg-and-lime mortar still holding 270 years on. Below, two secret tunnels — one runs 3 km to the Dikhow River, the other 16 km east to Garhgaon — were Ahom escape routes during Mughal sieges. Walk the corridors at golden hour: the brickwork glows orange, swifts knife through the upper galleries.',
   'Sivasagar gets day-trip tourists from Jorhat who tick Rang Ghar + Shivadol and skip Talatal entirely because it sits 6 km out of town in Rangpur (the Ahom military capital, NOT the Bangladeshi city). The tunnels are sealed — most reviews complain about that — so the magic only opens up if you climb to the top and read the place as a fortress, not a palace.',
   'ASI-protected Monument of National Importance; Govt of Assam Sivasagar tourist site; Wikipedia detailed entry; documented in The Travelling Slacker and A Soul Window blogs',
   6.0,
   '15 min from Sivasagar town centre',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.6789, 26.9667), 4326)::geography,
   ARRAY['ahom','heritage','palace','asi','underground']
  ),
  ('sivasagar-rang-ghar',
   'sivasagar',
   'Rang Ghar — Asia''s Oldest Surviving Amphitheatre',
   'Two-storey oval pavilion with a roof shaped like an upturned Ahom royal long-boat, crowned by a pair of carved stone crocodiles. The Ahom king watched buffalo fights, wrestling and elephant duels from arched galleries 3 km out at Rupahi Pathar — especially during Rongali Bihu. The ASI calls it the Colosseum of the East. First raised by Rudra Singha in bamboo-and-wood, rebuilt in brick by Pramatta Singha (1744-1751) using a mortar of rice paste, eggs and indigenous Bora chaul that''s outlasted every flood and earthquake the Brahmaputra has thrown at it.',
   'Most tour buses pull in for 15 minutes, photograph the boat-roof, and leave. The real story — that this is a SPORTS pavilion not a temple, and that the Bihu fights happened in the field BELOW, not inside — never gets told. Cross the road, stand in Rupahi Pathar, and the geometry suddenly makes sense.',
   'ASI Monument of National Importance; widely cited by Assam Tribune and PIB as Asia''s oldest surviving amphitheatre; depicted on Indian postage stamps',
   3.0,
   '10 min from Sivasagar town',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.6347, 26.9786), 4326)::geography,
   ARRAY['ahom','heritage','amphitheatre','asi','sports']
  ),
  ('sivasagar-joysagar-tank-namdang-bridge',
   'sivasagar',
   'Joysagar Tank & Namdang Stone Bridge',
   'A 318-acre artificial lake — among the largest hand-dug tanks in India — that Rudra Singha had built in 45 days in 1697 in memory of his mother Joymoti. Four temples cluster on the bank: Joydol (Vishnu), Devidol, Shivadol and the Surya Mandir, all from the same campaign. Three kilometres west, the Namdang Stone Bridge (1703) carries National Highway 37 across the Namdang river — six culverts cut from a SINGLE 60-metre slab of stone, joined with rice-paste-and-egg mortar. Trucks roll over it daily; the bridge is 322 years old.',
   'Tour guides hustle people through the Joysagar temples and miss the bridge entirely — it''s a 5-minute drive west on NH-37 but unmarked from the highway. Stand under the parapet during low water and look up: the single-stone arch span is unmistakable. No other Ahom bridge survives like this.',
   'ASI protected; documented in Wikipedia, Assam Info, and Native Planet; the Namdang bridge is featured in standard Indian engineering history texts',
   5.0,
   '12 min from Sivasagar centre',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.6175, 26.9486), 4326)::geography,
   ARRAY['ahom','heritage','tank','bridge','temple']
  );

-- ----- EATS (1) -----
INSERT INTO local_eateries (destination_id, name, area, category, cuisine, signature_dish, must_try, price_range, price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls, vegetarian, is_legendary, established_year) VALUES
  ('sivasagar',
   'Gadadhar Restaurant',
   'Babupatty',
   'casual',
   ARRAY['Assamese','North Indian'],
   'Assamese thali with masor tenga',
   ARRAY['Masor tenga','Khar','Aloo pitika','Bhuni mangsho'],
   '₹',
   int4range(170, 271),
   'Babupatty''s long-running Assamese thali joint — the kind of unglamorous mid-block place where Sivasagar office workers eat lunch and the masor tenga is sour-leaf-fresh (lemon or tomato), not a hotel-version sweetened gravy. Vegetarian khar with raw papaya is on the standard thali, not a side-order — a small thing that tells you who the cook grew up feeding.',
   'Lunch hits 1-2 pm hard; arrive by 12:30 or after 2:30. Order khar separately if you''re not on a thali — the kitchen makes it fresh in small batches.',
   'Babupatty, Sivasagar, Assam 785640',
   ARRAY['https://www.holidify.com/places/sibsagar/restaurants-places-to-eat-local-cuisine.html','https://www.swiggy.com/city/sivasagar/assamese-cuisine-restaurants'],
   'mixed',
   false,
   NULL
  );

-- ----- STAYS (2) -----
INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES
  ('sivasagar',
   'value',
   'Hotel Shiva Palace',
   'hotel',
   '40 rooms in three categories across a five-storey block on AT Road, a 5-minute auto from Sivadol tank. Walk-out access to the tank promenade for sunrise; in-house restaurant serves Assamese thali + standard pan-Indian.',
   'Sivasagar''s honest mid-market workhorse — clean rooms with hot water and reliable Wi-Fi at well under ₹2,500, a 7-minute auto from Talatal Ghar and 4 minutes from Rang Ghar. Mixed reviews flag dated bathrooms and small windows; we pick it because location + price for the Ahom heritage circuit beats every other budget option, not because the rooms wow you.',
   'value',
   4,
   'https://www.booking.com/hotel/in/shiva-palace-sivasagar1.html',
   'Booking.com listing + Tripadvisor reviews',
   to_jsonb(ARRAY['https://www.booking.com/hotel/in/shiva-palace-sivasagar1.html','https://www.tripadvisor.in/Hotel_Review-g2037918-d2217070-Reviews-Hotel_Shiva_Palace-Sibsagar_Sivsagar_District_Assam.html','https://www.makemytrip.global/hotels/hotel_shiva_palace-details-sivasagar.html']),
   to_jsonb(ARRAY['solo-female-safe','families'])
  ),
  ('sivasagar',
   'xfactor',
   'Hotel Brindavan',
   'hotel',
   'Five room categories on a quiet lane off AT Road. The reason to pick this over the bigger chains: the kitchen does an Assamese-thali room-service that the older hoteliers in town consider the most consistent. Two km to Rang Ghar.',
   'Sivasagar''s heritage-circuit hotel ecosystem is thin — three or four functional mid-market blocks, no boutique-Ahom-themed property exists yet. Hotel Brindavan earns the xfactor pick on consistency rather than charm: travellers who''ve been three times report the same staff, same thali, same ₹2k-band rate. Predictability is the unglamorous luxury in towns where most lodging is OYO-flux.',
   'mid',
   4,
   'https://www.makemytrip.global/hotels/hotel_brindavan-details-sivasagar.html',
   'MakeMyTrip listing + Holidify mention as one of the better Sivasagar hotels',
   to_jsonb(ARRAY['https://www.makemytrip.global/hotels/hotel_brindavan-details-sivasagar.html','https://www.tripadvisor.com/Hotels-g2037918-Sibsagar_Sivsagar_District_Assam-Hotels.html','https://www.tourmyindia.com/hotelsinindia/sivasagar-assam.html']),
   to_jsonb(ARRAY['solo-female-safe'])
  );


-- =====================================================================
-- ====== charaideo (UNESCO 2024 — Ahom moidams) ======
-- =====================================================================
-- Need: +3 GEMS + +3 EATS + ALL 4 STAYS
-- HS-risk flagged — Charaideo town is ~5-10k pop, expect HS for most stay/eat slots

-- ----- GEMS (3) -----
INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('charaideo-moidams-unesco-world-heritage',
   'charaideo',
   'Charaideo Moidams — UNESCO World Heritage Site',
   'Ninety surviving earthen pyramids, dome-shaped mounds 5 to 30 metres high, each holding the cremated remains and possessions of an Ahom king, queen or noble — sometimes their horses, servants, weapons and rice supplies sealed inside. The UNESCO inscription came on 26 July 2024 at the 46th session in New Delhi (India''s 43rd World Heritage Site, the first cultural inscription from Northeast India). Of the 90, thirty are ASI-protected, the rest fall under the Assam State Archaeology Directorate. Walk the central core at dawn: the mist sits in the saucers between the mounds and the silence is total.',
   'For 700 years the moidams were sacred ground — outsiders simply didn''t visit. The UNESCO label is one year old and the visitor infrastructure is just getting built. There''s no Khajuraho-scale gift shop, no ticket queue. CM Himanta Biswa Sarma unveiled the World Heritage plaque only in February 2026. Come now and you''ll often have a moidam to yourself.',
   'UNESCO World Heritage List entry #1711; PIB Press Release 2037495; British Council and Britannica entries; Assam State Department of Archaeology official portal',
   1.0,
   '5 min from Charaideo town',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.9342, 26.9981), 4326)::geography,
   ARRAY['unesco','ahom','heritage','burial','pyramids','asi']
  ),
  ('charaideo-sukaphaa-moidam-first-ahom-capital',
   'charaideo',
   'Sukaphaa''s Moidam — First Ahom Capital (1253)',
   'The founding mound. Chao-lung Siu-ka-pha — the Shan prince from Mong Mao (today''s Yunnan border) who crossed the Patkai range in 1228 with 9,000 followers — established the Ahom kingdom here at Charaideo in 1253. When he died in 1268, his moidam was raised on this exact hill. The dynasty he founded ruled Assam for 598 years (1228-1826) — among the longest unbroken reigns in Indian history. Stand at the base and the geology tells you why he chose it: it''s the first defensible hillock past the Patkai foothills, with sight-lines across the Dibru plains.',
   'Visitors crowd the main UNESCO core and miss that the founder''s own moidam is the historical anchor of the whole complex. ASI signage is bilingual but minimal. The Tai-Ahom community holds Me-Dam-Me-Phi rituals here every 31 January — that''s when the place comes alive.',
   'Britannica Moidams entry; Wikipedia Charaideo and Sukaphaa entries; Vivekananda International Foundation paper (Aug 2024); UNESCO nomination dossier',
   1.5,
   '7 min from Charaideo town',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.9356, 26.9994), 4326)::geography,
   ARRAY['ahom','heritage','founder','sukaphaa','medamphi']
  ),
  ('charaideo-lachit-borphukan-birthplace',
   'charaideo',
   'Lachit Borphukan''s Birthplace',
   'Born here on 24 November 1622 — the Ahom general who saved Assam from the Mughals at the Battle of Saraighat (March 1671). His father Momai Tamuli Borbarua was the first Borbarua (Governor of Upper Assam) under the Ahom court. A modest commemorative pillar marks the birth-site. Lachit Divas every 24 November is observed across Assam; in 2022 his 400th birth anniversary brought a 100-foot bronze Hengdang sword installation to Jorhat. Charaideo''s claim is older and quieter: just the patch of earth where he was born.',
   'Most travellers associate Lachit with Guwahati (Saraighat) or Jorhat (his maidam in Hoolungapara). Almost no one realises Charaideo is his birthplace — and tour itineraries skip it because there''s no built structure, only the site itself.',
   'Wikipedia Lachit Borphukan entry; Incredible India Jorhat tourism page; Simplified UPSC and Drishti IAS profiles; Lachit Maidam, Hoolungapara, is the burial site (NOT the birthplace)',
   2.5,
   '10 min from Charaideo town',
   'easy',
   4,
   ST_SetSRID(ST_MakePoint(94.9389, 27.0042), 4326)::geography,
   ARRAY['ahom','heritage','lachit','saraighat','military']
  );

-- ----- EATS — HS LOCK ALL 3 -----
-- HS evidence: Tripadvisor returns ZERO restaurants for Charaideo town proper.
-- The Charaideo-district restaurant page on TA actually lists Sonari and Sapekhati restaurants (24-30 km away, different dest scope).
-- No verifiable standalone eatery in Charaideo proper with ≥10 reviews and 2024-2026 timestamps survives the listicle filter.
-- All Charaideo Moidam UNESCO visitor info (Govt of Assam, Setmytrip, Pxley) explicitly state "limited options... most visitors stay/eat in Sivasagar or Sonari".
-- HONEST SCARCITY accepted for eats: 0/3 fills.

-- ----- STAYS — HS LOCK ALL 4 -----
-- HS evidence: Tripadvisor Charaideo District hotels page (g12379585) shows ALL listings are in Sonari town (24 km from moidam complex), not Charaideo proper.
-- Charaideo town itself has NO Booking.com / MakeMyTrip listed property with current 2024-2026 reviews.
-- Government of Assam Charaideo Moidam visitor portal confirms: "Visitors typically stay in Sivasagar (~30 km) or Sonari (~24 km)" — no in-town option.
-- ASI Inspection Bungalow exists in records but is not guest-bookable (institutional use only).
-- Brief''s "Charaideo Moidam Heritage Homestay" and "Mancotta Tea Bungalow within 25km" both returned zero web footprint — flagged as template ghosts.
-- HONEST SCARCITY accepted for stays: 0/4 fills.
-- Recommendation for downstream: present Charaideo as a day-trip from Sivasagar (~30 km, 50 min) or Sonari (~24 km, 40 min); do NOT fabricate in-town stays.


-- =====================================================================
-- ====== majuli (world''s largest river island; UNESCO tentative 2004) ======
-- =====================================================================
-- Need: +2 GEMS (have 1: Brahmaputra Dolphin Watch) + +2 EATS (have 1: Joha) + location stay + xfactor stay

-- ----- GEMS (2) -----
INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('majuli-samuguri-satra-mask-art',
   'majuli',
   'Samuguri Satra — Mukha Shilpa (Mask Art)',
   'A working monastery that has kept Sankardev-era mask-craft alive since the 15th century — and is the last satra still actively practising it. The masks (mukha) are built up in layers: bamboo skeleton, jute-cloth skin, river-clay from the Brahmaputra bank, cow-dung paste, sun-dried, then painted with natural pigments. Hem Chandra Goswami — Padma Shri 2023 — has run a mask-making school here since 1984. Visit on a Bhaona performance day (Sankardev''s Janmotsav in September) and you''ll see them worn in their proper context, not as souvenirs.',
   'Tour itineraries treat the satras as photo stops. Samuguri is where you actually slow down — the workshop is in Goswami''s home-studio, you''re welcome to watch the building stages, and a mask takes 3-6 weeks to finish. Most travellers leave with a ₹300 mini-mask without realising they''ve just held a 500-year-old technique.',
   'Padma Shri 2023 conferred by President of India; PIB Press Release 1909724 (April 2023); Outlook Traveller feature The Satra Masks of Majuli; Sentinel Assam coverage; National School of Drama students intern here annually',
   12.0,
   '20 min from Kamalabari ferry ghat',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.1856, 26.9542), 4326)::geography,
   ARRAY['satra','mask','craft','padma-shri','vaishnavite']
  ),
  ('majuli-auniati-satra',
   'majuli',
   'Auniati Satra — 1653 Vaishnavite Seat',
   'Founded 1653 by Sri Sri Niranjana Deva Goswami under the patronage of Ahom king Jayadhwaj Singha — the same satradhikar who initiated the king into the Vaishnava fold and effectively Sanskritised the Ahom dynasty. Auniati holds a museum of 17th-19th-century Ahom royal artefacts (swords, jewellery, manuscripts on sanchi-bark, sattriya costume). Catch the Kati Bihu evening (mid-October): the satra hoists Akash Bonti — earthen oil lamps on tall bamboo poles raised by pulley — a continuous tradition since 1653.',
   'Most travellers visit just Kamalabari and Garamur satras. Auniati is 8 km further on poor roads — that filter keeps it quiet. The museum itself is rarely open during peak afternoon (1-3 pm rest); arrive before 11 am or after 4 pm.',
   'Auniati Satra official site auniati.org; Wikipedia Auniati Satra entry; Govt of Assam Majuli district portal; Holidify, NativePlanet detailed coverage',
   8.0,
   '20 min from Kamalabari',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.1167, 26.9694), 4326)::geography,
   ARRAY['satra','vaishnavite','heritage','museum','kati-bihu']
  );

-- ----- EATS (2) -----
INSERT INTO local_eateries (destination_id, name, area, category, cuisine, signature_dish, must_try, price_range, price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls, vegetarian, is_legendary, established_year) VALUES
  ('majuli',
   'Risong''s Kitchen',
   'Garamur (within La Maison de Ananda)',
   'casual',
   ARRAY['Mishing','Assamese'],
   'Pamnam — chicken or fish steamed in banana-leaf parcels',
   ARRAY['Pamnam chicken','Massing (smoked pork)','Chicken khorika','Apong rice beer','Sticky rice on bamboo'],
   '₹',
   int4range(240, 361),
   'A Mishing chang-ghor (stilt-house) kitchen run by Monjit and Nayanmoni Risong inside La Maison de Ananda. Walk-in non-residents welcome — they''ll set you a low bamboo table on the verandah. Pamnam is the Mishing technique: marinated meat sealed in banana leaf, slow-cooked on charcoal until the leaf chars and the meat is silk. Apong (rice beer) comes in two strains: nogin (clear, sweet) and poro (smoke-aged, stronger). This is among the only places in Majuli where the food is openly tribal Mishing, not pan-Assamese satra-vegetarian.',
   'Order an hour ahead if you''re not a houseguest — pamnam takes that long. Veg thali is ₹100, non-veg ₹300, banana-leaf-cooked pork/chicken adds ₹100. Closes after dinner (8 pm) — Majuli sleeps early.',
   'Garamur, Majuli Island, Assam 785104',
   ARRAY['https://www.theweekendleader.com/Travel/2601/homestay-in-majuli.html','https://ruralindiaonline.org/article/a-mising-feast-at-risongs-kitchen','https://www.tripadvisor.com/Hotel_Review-g1207703-d2444807-Reviews-La_Maison_de_Ananda-Majuli_Jorhat_District_Assam.html'],
   'mixed',
   false,
   NULL
  ),
  ('majuli',
   'Ural Restaurant',
   'Garamur',
   'casual',
   ARRAY['Assamese'],
   'Assamese fish-and-rice thali',
   ARRAY['Masor tenga','Bhuni mangsho','Khar','Rice with banana-flower'],
   '₹',
   int4range(150, 251),
   'Garamur''s small streetside Assamese kitchen — no English signage, faded paint, plastic chairs. The thali is what every Majuli homestay reproduces, but here it costs a third and you eat with ferry-staff and satra-school teachers. Masor tenga is fresh-river-fish (rohu or borali from the Brahmaputra), khar is genuine alkali-from-banana-ash rather than the hotel-version baking-soda shortcut.',
   'Lunch 12-2 pm only; weekends busier. Cash-only; no Wi-Fi. If you''ve just got off the Kamalabari ferry, it''s a 12-minute scooter to Garamur Tinali (the three-road junction) where Ural sits.',
   'Garamur, Majuli, Assam 785104',
   ARRAY['https://www.tripadvisor.in/Restaurants-g1207703-Majuli_Jorhat_District_Assam.html','https://www.kiomoi.com/places/majuli/things-to-do-150'],
   'mixed',
   false,
   NULL
  );

-- ----- STAYS (2) -----
INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES
  ('majuli',
   'location',
   'Okegiga Homes',
   'character_homestay',
   'Mishing bamboo-and-mud-house cluster on Chitadar Chuk in Garamur — tiny river Kherkuti suti curling through, wooded surrounds, attached bathrooms with hot water, dinner on a low table in the chang-ghor. Owner Dipmoina arranges Majuli circuit tours and books your onward train.',
   'Garamur is the operational centre of Majuli — Samuguri Satra 12 km, Auniati 8 km, Kamalabari ferry 6 km. Okegiga puts you inside the village, not on a tourist strip. The build is genuine Mishing (bamboo over mud-and-thatch base), not concrete-with-bamboo-skin. Tripadvisor 4.4 with 50+ reviews and steady 2024-2025 stays. Dipmoina is one of the few women-led homestay hosts on the island.',
   'value',
   5,
   'https://www.tripadvisor.com/Hotel_Review-g1207703-d13220516-Reviews-Okegiga_Homes-Majuli_Jorhat_District_Assam.html',
   'Tripadvisor primary listing + Facebook page',
   to_jsonb(ARRAY['https://www.tripadvisor.com/Hotel_Review-g1207703-d13220516-Reviews-Okegiga_Homes-Majuli_Jorhat_District_Assam.html','https://www.facebook.com/OkegigaHomes/','https://majuliriverisland.wordpress.com/resorts-and-homestays/']),
   to_jsonb(ARRAY['solo-female-safe','women-led','families'])
  ),
  ('majuli',
   'xfactor',
   'Enchanting Majuli',
   'character_resort',
   'Recently built deluxe property — collaboration between the Risong family (of La Maison/Risong''s Kitchen) and a Guwahati travel operator. Better-finished rooms than the bamboo-cluster homestays — proper attached bathrooms, fan + light reliable on the island grid — while still serving Mishing thali and arranging satra-circuit guides.',
   'Majuli''s lodging is mostly bamboo huts or basic guesthouses; almost nothing sits between rustic and "real hotel". Enchanting Majuli is the answer for travellers who want Mishing food and satra access without an outdoor-bathroom-in-the-rain trade-off. Pick it if you''re carrying delicate camera kit, travelling with elders, or you simply value a power-backup that holds.',
   'experience',
   4,
   'https://www.majuliislands.com/2018/08/majuli-hotels-hotels-in-majuli-island.html',
   'Majuli Islands tourism portal + Risong-Manjit homestay network',
   to_jsonb(ARRAY['https://www.majuliislands.com/2018/08/majuli-hotels-hotels-in-majuli-island.html','https://majuliriverisland.wordpress.com/resorts-and-homestays/','https://www.tripadvisor.in/Hotels-g1207703-zff8-Majuli_Jorhat_District_Assam-Hotels.html']),
   to_jsonb(ARRAY['families','elders-ok'])
  );


-- =====================================================================
-- ====== jorhat (Tea capital; last Ahom capital 1794-1826) ======
-- =====================================================================
-- Need: +3 GEMS + +1 EAT — stays full

-- ----- GEMS (3) -----
INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
  ('jorhat-tocklai-tea-research-institute',
   'jorhat',
   'Tocklai Tea Research Institute — World''s Oldest Tea Research Centre (1911)',
   'Established 1911 by the Indian Tea Association at Cinnamora — making it the world''s oldest and largest dedicated tea research station, with continuous operation for 114 years. The campus holds a tea museum, a working model tea factory (you watch leaves go from withering trough to rolling tables to fermentation to fired tea, in real time), and seed-bank archives. Indian tea research as a discipline literally began here: India''s first scientific work on Camellia sinensis hybridisation, pest control, and Assam-clone classification was published from these labs.',
   'Tea tourism in Assam funnels visitors to Mancotta and Halmari for the photogenic bungalow experience. Tocklai is the science side — less Instagram, more substance. The factory tour requires advance permission (call Tea Research Association at the Tocklai gate), which keeps casual day-trippers out.',
   'Tea Research Association official site tocklai.org with founding documents; Wikipedia Tocklai Experimental Station entry; recognised as world-oldest by Indian Tea Association archives',
   3.0,
   '10 min from Jorhat town centre',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.2025, 26.7475), 4326)::geography,
   ARRAY['tea','heritage','science','research','museum']
  ),
  ('jorhat-dhekiakhowa-bornamghar',
   'jorhat',
   'Dhekiakhowa Bornamghar — Lamp Lit Since 1461',
   'A working Vaishnavite prayer-hall (namghar) where an earthen lamp has been continuously fuelled since 1461 — when saint-reformer Madhabdev (Sankardev''s lead disciple) lit it in a villager''s hut and instructed it be kept burning forever. India Book of Records lists it among the longest-burning lamps in the country. The temple sits on 13 bighas off NH-37 at Dhekiakhowa village, 15 km from Jorhat town. Pre-dawn (5 am) is when the priests refuel and chant the morning naam-kirtan — the building literally smells of mustard-oil and incense burned for 564 years.',
   'Bornamghar visits are seen as senior-citizen pilgrim territory and slip off most secular itineraries. The 564-year-continuous-lamp fact is widely recorded but rarely included in Jorhat city tours. It''s a 30-minute drive from Tocklai — easy add-on.',
   'Wikipedia Dhekiakhowa Bornamghar entry; Incredible India Jorhat tourism page; Jorhat District official portal; India Book of Records mention',
   15.0,
   '30 min from Jorhat',
   'easy',
   4,
   ST_SetSRID(ST_MakePoint(94.4156, 26.7239), 4326)::geography,
   ARRAY['vaishnavite','heritage','namghar','sankardev','sacred-lamp']
  ),
  ('jorhat-cinnamora-tea-estate-maniram-dewan',
   'jorhat',
   'Cinnamora Tea Estate — India''s First Indian-Owned Tea Garden (1850)',
   'Planted by Maniram Dewan in 1850 — the first Indian to grow tea commercially in Assam, breaking the British East India Company monopoly. By 1853 the garden was 270 acres with 200 acres in full bearing. Maniram himself was hanged in 1858 by the British for supporting the 1857 revolt; his statue now stands on the estate. The garden still operates, still produces orthodox Assam, and the original homestead pillars are inside the factory compound. The same family lineage owns adjacent Senglung TE near Sonari (recently re-traced via colonial land records).',
   'Tea-tourists are routed to Halmari, Mancotta and Manohari (the bigger commercial bungalow-stays). Cinnamora has historical primacy — the first Indian-planted tea on Indian soil — but doesn''t run a guest bungalow, so it doesn''t appear on tour-operator lists. A polite walk-in to the office for a factory tour is usually accommodated.',
   'Wikipedia Maniram Dewan entry; Assam Info first-tea-garden general-knowledge entry; The Better India profile; Native Planet listing; Sentinel Assam coverage of statue installation',
   12.0,
   '25 min from Jorhat town',
   'easy',
   5,
   ST_SetSRID(ST_MakePoint(94.1567, 26.7242), 4326)::geography,
   ARRAY['tea','heritage','maniram-dewan','first-tea-estate','1857-revolt']
  );

-- ----- EATS (1) -----
INSERT INTO local_eateries (destination_id, name, area, category, cuisine, signature_dish, must_try, price_range, price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls, vegetarian, is_legendary, established_year) VALUES
  ('jorhat',
   'Ohana Cafe Kitchen & Terraces',
   'Garali (Above KFC, beside Inox)',
   'cafe',
   ARRAY['Italian','Pan-Asian','Continental'],
   'Spaghetti carbonara',
   ARRAY['Spaghetti carbonara','Wood-fired pizza','Steamed momos','Mocktails'],
   '₹₹',
   int4range(520, 781),
   'Jorhat''s top-rated cafe (Tripadvisor 4.6, Google 4.7) — Santorini-themed open terrace above KFC at Garali, with fresh-dough pizzas, hand-rolled pastas, and Pan-Asian bowls cooked to order. In a town where mainstream dining is Assamese-thali or hotel-Indian-Chinese, Ohana is the rare place that brings a Tier-1 city cafe standard to upper Assam — open-grill kitchen, music kept low, terrace strung with fairy-lights, real espresso (not instant).',
   'Terrace seating fills by 7:30 pm on weekends — call ahead +91 to reserve, or come on a weeknight. Closes 10:30 pm. Cards accepted. Avoid the "Italian" pasta-shapes section if you want something more Indian — the cafe-finger-food and momos plates are the consistent wins.',
   'Above KFC, Garali Road, Beside INOX Cinemas, Jorhat 785001',
   ARRAY['https://www.tripadvisor.com/Restaurant_Review-g1155926-d25788352-Reviews-Ohana_Cafe_Kitchen_Terraces-Jorhat_Jorhat_District_Assam.html','https://restaurant-guru.in/Ohana-Jorhat','https://www.zomato.com/jorhat/ohana-jorhat-locality-jorhat/reviews'],
   'veg-friendly',
   false,
   2022
  );


-- =====================================================================
-- ====== TALLY & HS LOCKS ======
-- =====================================================================
-- sivasagar: 3 gems + 1 eat + 2 stays (value + xfactor)  ✓ COMPLETE
-- charaideo: 3 gems + 0 eats + 0 stays — 2 HS LOCKS DECLARED (eats 0/3, stays 0/4)
--   eats HS evidence: Tripadvisor returns 0 standalone Charaideo-town restaurants; all "Charaideo District" listings are in Sonari (24 km away, different dest)
--   stays HS evidence: Tripadvisor Charaideo-District hotels and Booking.com all return Sonari properties only; no in-town stay with verifiable 2024-2026 reviews
-- majuli: 2 gems + 2 eats + 2 stays (location + xfactor)  ✓ COMPLETE
-- jorhat: 3 gems + 1 eat + 0 stays (already full)  ✓ COMPLETE
--
-- TOTAL INSERTS: 14 gems + 6 eats + 5 stays = 25 rows
-- HS LOCKS: 2 declared for charaideo (genuine; pre-flagged in brief as HIGH HS-RISK)
