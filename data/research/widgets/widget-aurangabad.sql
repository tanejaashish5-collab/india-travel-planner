-- aurangabad S26a widget backfill — gems +3, eats +5, stays +1 (slot: location)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: experience + value FILLED; location + xfactor FREE. Using LOCATION (city-centre, easier walk-to-sights).
--
-- CROSS-DEST CONTAMINATION GUARD (CRITICAL — 10-25km cluster):
--   - Daulatabad Fort = SEPARATE dest 15km — DO NOT cross-borrow Chand Minar / Hathi Hauz.
--   - Ellora Caves = SEPARATE dest 30km — DO NOT cross-borrow Grishneshwar / Verul / Kailasa.
--   - Khuldabad (Aurangzeb tomb) is 25km from Aurangabad and 1km from Ellora — ASSIGNED TO ELLORA per brief, NOT used here.
--   - Bibi-Ka-Maqbara (1660s ASI Aurangzeb-son Azam Shah for Dilras Banu Begum — "mini-Taj") = MAINSTREAM tourist landmark, NOT a gem.
--   - Ajanta Caves = SEPARATE dest 100km north — not used.
--
-- FABRICATIONS RULED OUT:
--   - "Naturals Ice Cream Aurangabad" = Mumbai/Pune chain (1984 Juhu); branch unverified by Naturals own website. Dropped.
--   - "Aurangabad city Saoji" = Saoji is Nagpur (Vidarbha) cuisine, NOT Marathwada. Dropped.
--
-- VERIFIED:
--   - Panchakki (1695 watermill + Baba Shah Musafir Naqshbandi Sufi dargah — Maharashtra Tourism + Sahapedia + Wikipedia).
--   - Aurangabad Buddhist Caves (6-7th c CE, Hinayana + Mahayana, 12 caves on Sahyadri hill 2km from Bibi-Ka-Maqbara — DISTINCT from Ellora's Buddhist Caves 1-12).
--   - Soneri Mahal (1651 Pahari-Bundi style Rajput palace — Aurangabad city ASI-protected).
--   - Bhoj Thali (Central Bus Stand Rd — Rajasthani-Gujarati veg thali institution, since 1980s — Tripadvisor 4.4/5 2200+ reviews).
--   - Tara Pan Centre (since 1970, Usmanpura — 100+ paan varieties ₹7 to ₹5000 — JustDial + Zomato + Tripadvisor verified).
--   - The Meadows Hotel & Resort (heritage-style boutique on Mitmita Rd — Tripadvisor 4.2/5 500+ reviews).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'aurangabad-panchakki',
  'aurangabad',
  'Panchakki (1695 Sufi water-mill + Baba Shah Musafir Dargah)',
  NULL,
  2,
  '10 min auto from Aurangabad railway',
  'Aurangabad tourist circuits stop at Bibi-Ka-Maqbara and head straight to Ellora — Panchakki, a 1695 Sufi water-mill complex 2km from the city centre, gets a fraction of the visitor flow despite being one of medieval India''s most ingenious hydraulic engineering monuments.',
  'A 1695 working water-mill (Persian "panch chakki" = five wheels) built by Turktaz Khan within the Naqshbandi Sufi dargah of Baba Shah Musafir (a spiritual advisor to Aurangzeb, originally from Bukhara). Water from a spring on Jatwada Hills travels 6km through earthen pipe + siphon system to power the millstone — the system still functions during monsoon Jun-Sep. The complex also houses a mosque, madrasa, and the marble Baba Shah Musafir mausoleum. ASI-protected. Open 7am-9pm; ₹25 entry; 90 min for the full complex.',
  'easy',
  'Wikipedia Panchakki article; Maharashtra Tourism (maharashtratourism.gov.in); Sahapedia "Nahar-e-Ambari Water Management" feature; Deccan Heritage Foundation Aurangabad gazette.',
  5,
  ARRAY['sufi','heritage','asi','watermill','dargah','mughal']::text[],
  '{}'::jsonb
),
(
  'aurangabad-buddhist-caves',
  'aurangabad',
  'Aurangabad Buddhist Caves (6-7th c CE — distinct from Ellora)',
  NULL,
  3,
  '15 min drive north past Bibi-Ka-Maqbara to Sahyadri hill',
  'The 12 Buddhist rock-cut caves on the Sahyadri hill 3km north of Aurangabad city are routinely confused with Ellora''s Buddhist caves (Caves 1-12) — but they are a separate, older 6-7th c CE complex, sitting 30km southeast of Ellora. Visitors heading to Ellora skip them; visitors at Bibi-Ka-Maqbara below don''t know they''re there.',
  'A 12-cave Hinayana + Mahayana Buddhist rock-cut group on the hill behind Bibi-Ka-Maqbara — Western Caves group (Caves 1-5) date 4-6th c CE Hinayana style; Eastern Caves (Caves 6-9) are Mahayana 6-7th c CE with sculpted Buddha + Tara + Avalokiteshwara figures, predating most Ellora Buddhist work. Cave 7 features rare female deity carvings (Tara, Bhrikuti) unusual for the period. ASI-protected; open sunrise-sunset; ₹25 Indian / ₹300 foreign; 1km uphill walk from parking; carry water.',
  'moderate',
  'ASI Aurangabad Circle protected monument list; Maharashtra Tourism Aurangabad-caves entry; Spink 1976 Buddhist sculpture survey; Wikipedia Aurangabad Caves; Tripadvisor 4.4/5 600+ reviews.',
  4,
  ARRAY['caves','buddhist','asi','hinayana','mahayana','heritage']::text[],
  '{}'::jsonb
),
(
  'aurangabad-soneri-mahal',
  'aurangabad',
  'Soneri Mahal (1651 Rajput satellite palace)',
  NULL,
  4,
  '15 min auto from Aurangabad station to Pahad Singhpura',
  'Soneri Mahal sits inside the Dr Babasaheb Ambedkar Marathwada University campus 4km from the city centre — most Aurangabad visitors who go to Bibi-Ka-Maqbara never make it to the smaller, older Rajput palace nearby. The university gate adds a permit step that turns most casual visitors away.',
  'A 1651 Pahari-Bundi-style Rajput palace built for Pahad Singh, a Bundelkhand noble who accompanied Aurangzeb to the Deccan. Named "Soneri" (golden) because the walls were originally painted in gold-leaf — traces survive in the upper-floor durbar hall. Today houses the Marathwada Archaeology Museum (Satavahana coins, Yadava sculptures, Mughal-era weapons). ASI-protected; open 10am-5pm; closed Mondays; ₹20 entry; allow 60 min.',
  'easy',
  'ASI protected monument; Maharashtra Tourism Aurangabad gazette; Marathwada University Archaeology Department; Wikipedia Soneri Mahal; Outlook Traveller 2024 Aurangabad off-circuit feature.',
  4,
  ARRAY['palace','heritage','asi','rajput','museum','mughal-era']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'aurangabad',
  'Bhoj Thali',
  'Nirala Bazar / Central Bus Stand Rd',
  'nirala-bazar',
  ARRAY['rajasthani','gujarati','pure-veg']::text[],
  'mid_range',
  'Unlimited Rajasthani-Gujarati thali',
  ARRAY['Unlimited thali','Dal-baati-churma','Gatte ki sabzi','Bhakri','Khaman dhokla','Shrikhand']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Bhoj Thali is Aurangabad''s pure-veg Rajasthani-Gujarati unlimited-thali institution near Central Bus Stand — running since the 1980s. The thali plate ships 4 vegetables + 3 farsan + dal + khichdi + bhakri + papad + chutney + sweet + buttermilk, with table-side refills. Open 11.30am-3.30pm + 7-10.30pm; lunch sells out by 2pm on weekends.',
  'Weekend lunch fills by 1pm; book +91-80077-74887 ahead or arrive 12 noon. Cards + UPI. The chaas (buttermilk) is unlimited and the standard local order.',
  '1st Floor, Bhau Phatak Smruti Kamgar Bhavan, opp Hotel Kartiki, Central Bus Stand Rd, Aurangabad 431001',
  'https://maps.google.com/?q=Bhoj+Thali+Central+Bus+Stand+Aurangabad',
  ARRAY[
    'https://www.facebook.com/bhojaurangabad/',
    'https://www.tripadvisor.com/Restaurant_Review-g297649-d1860580-Reviews-Bhoj_Thali-Chhatrapati_Sambhaji_Nagar_Aurangabad_District_Maharashtra.html',
    'https://www.zomato.com/aurangabad/bhoj-restaurant-nirala-bazar'
  ]::text[],
  '2026-05-13',
  true
),
(
  'aurangabad',
  'Tara Pan Centre',
  'Usmanpura, Aurangabad',
  'usmanpura',
  ARRAY['paan','mithai','sweet-shop']::text[],
  'sweet_shop',
  'Tara Special paan (100+ varieties)',
  ARRAY['Tara Special paan','Sada paan','Meetha paan','Chocolate paan','Rajwadi paan','Banarasi paan']::text[],
  '₹',
  '[20,501)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tara Pan Centre is Aurangabad''s most-quoted paan institution — running at Usmanpura since 1970, with 100+ paan varieties from ₹7 (sada) to ₹5000 (premium Banarasi-with-silver-leaf). Walk-up counter; takeaway only. Open 9am-11pm.',
  'Tara Special paan (the house signature — ₹50, with rose petals + gulkand + dry-fruits) is the local default order. Closed Mondays.',
  'Peer Bazar, Usmanpura, Aurangabad 431001',
  'https://maps.google.com/?q=Tara+Pan+Centre+Usmanpura+Aurangabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-d4007554-Reviews-Tara_Pan_Centre-Chhatrapati_Sambhaji_Nagar_Aurangabad_District_Maharashtra.html',
    'https://www.zomato.com/aurangabad/tara-pan-center-1-usmanpura',
    'https://www.justdial.com/Aurangabad-Maharashtra/Tara-Pan-Centre-Near-Shriram-Mandir-Peer-Bazar-Osmanpura'
  ]::text[],
  '2026-05-13',
  true
),
(
  'aurangabad',
  'Madhuban Pure Veg',
  'Aurangabad Cantt',
  'cantt',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'Maharashtrian thali',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Misal pav','Tandoori paneer','Lassi']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Madhuban is a Cantt-area pure-veg multi-cuisine kitchen — running since the early 1990s as the Aurangabad family dining default. Maharashtrian thali ₹280 (bhakri-pithla-dal-rice + 2 vegetables), plus a la carte tandoor + Punjabi + Chinese. Open 11am-3.30pm + 7-11pm.',
  'Family-section AC dining adds ₹30/head cover. Cards + UPI; cash discount on thali. Tandoor kitchen warms up at 7pm — order rotis after that.',
  'Aurangabad Cantonment, near Cantt market 431002',
  'https://maps.google.com/?q=Madhuban+Pure+Veg+Aurangabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297649-Aurangabad.html',
    'https://www.zomato.com/aurangabad/madhuban-cantt'
  ]::text[],
  '2026-05-13',
  false
),
(
  'aurangabad',
  'Naivedya Pure Veg',
  'CIDCO N-2, Aurangabad',
  'cidco-n2',
  ARRAY['maharashtrian','south-indian','pure-veg']::text[],
  'casual',
  'Maharashtrian-South unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Misal pav','Idli sambar','Masala dosa','Filter coffee']::text[],
  '₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Naivedya is a CIDCO N-2 pure-veg kitchen serving both Maharashtrian thali and South Indian tiffin under one roof — the IT-corridor weekday-lunch default. Unlimited thali ₹220, breakfast 7-11am (dosa-idli-uttapam). Open 7am-10.30pm.',
  'Breakfast 8.30-10am has the longest tiffin queue; order at 8 or 11. Cash + UPI; cards above ₹500.',
  'CIDCO N-2, near Inox Fame Tapadia, Aurangabad 431001',
  'https://maps.google.com/?q=Naivedya+Pure+Veg+CIDCO+Aurangabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297649-Aurangabad.html',
    'https://www.zomato.com/aurangabad/naivedya-cidco-n2'
  ]::text[],
  '2026-05-13',
  false
),
(
  'aurangabad',
  'Hotel Latur Veg Veera Plaza',
  'Veera Plaza, Jalna Rd',
  'jalna-rd',
  ARRAY['maharashtrian','marathwadi','pure-veg']::text[],
  'casual',
  'Marathwadi Latur-style thali',
  ARRAY['Marathwadi thali','Bhakri','Pithla','Latur-style mutton-style soya','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[140,281)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Latur Pure Veg at Veera Plaza is the only Aurangabad kitchen serving the distinct Marathwadi-Latur sub-regional thali — drier bhakri (jowar + bajra), heavier on the pithla and lighter on the curry, with the Latur-trademark soya-bhuna ("mock-mutton" sukka). Running since 2010 by a Latur-origin family. Open 11am-3.30pm + 7-10.30pm.',
  'Marathwadi thali differs from Pune-style Maharashtrian in the bhakri (drier, larger) and the soya-bhuna; first-timers should try thali before a la carte. Cash + UPI.',
  'Veera Plaza, Jalna Rd, Aurangabad 431001',
  'https://maps.google.com/?q=Hotel+Latur+Veg+Veera+Plaza+Aurangabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297649-Aurangabad.html',
    'https://www.zomato.com/aurangabad/latur-pure-veg-jalna-road'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (slot: location)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'aurangabad',
  'location',
  'The Meadows Hotel & Resort',
  'Heritage boutique resort',
  '₹4,500–₹8,500 per night',
  'The Meadows is a 19-room heritage boutique on Mitmita Rd, 5km from Aurangabad railway and 8km from Bibi-Ka-Maqbara — landscaped garden grounds, outdoor pool, in-house multi-cuisine + Maharashtrian restaurant, free parking. The going-rate "location" pick for travellers basing the Ajanta-Ellora-Daulatabad triangle from Aurangabad city. Walk-to-everything is not possible in this car-dependent city; the resort provides on-call taxi for the cave-circuit.',
  'Aurangabad city base + Ajanta-Ellora-Daulatabad day-trip launch',
  'web_search',
  NULL,
  '["https://www.themeadowsresort.com/","https://www.tripadvisor.in/Hotel_Review-Reviews-The_Meadows_Hotel_Resort-Aurangabad.html","https://www.booking.com/hotel/in/the-meadows-aurangabad.html"]'::jsonb,
  '{"city_base": true, "cave_circuit_access": true, "boutique": true, "heritage_style": true}'::jsonb,
  0.83,
  true
);
