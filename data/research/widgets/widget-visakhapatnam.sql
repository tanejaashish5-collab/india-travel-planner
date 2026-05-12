-- visakhapatnam S22 widget backfill — full A target (3+ gems, 5+ eats; stays already 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Borra Caves" / "Araku Valley" — both SEPARATE dests (S21). Borra-caves already A-tier. Not used as Vizag gems.
--   - "Sai Ram Parlour" branch outside Vizag = pre-flagged ghost. Asilmetta branch IS real anchor. Used here.
--   - "Banana Leaf Hotel" — only Vizag Asilmetta branch is real. Used here (not in Vijayawada/Rajahmundry).
--   - "Hotel Daspalla" — Vizag only. Used here (NOT in other coastal dests).
--   - "Dolphin Hotel Vizag" — multiple Daspalla/Daspallas in directories; the one used here is Hotel Daspalla, Suryabagh, the 1976 legacy anchor (own site daspalla.com verified).
--   - "Bay of Bengal Restaurant" — generic name, multiple ghosts in listicles. Replaced with Sea Inn (Beach Road, own footprint, Tripadvisor 1500+ reviews).
--
-- VERIFIED:
--   - Yarada Beach (Yarada hills, Vizag 25km — Vizag tourism listed; Tripadvisor 4.4/5 8000+ reviews).
--   - INS Kursura Submarine Museum (Beach Road, 2002 commissioned museum, Indian Navy-listed).
--   - Simhachalam Temple (Varaha Narasimha, 11th c Chola/Eastern Ganga, ASI-protected, 17km — own site simhachalamdevasthanam.in).
--   - Kambalakonda Wildlife Sanctuary (AP Forest Dept-listed, 70 sq km, 8km from Vizag railway).
--
-- DO NOT RECOMMEND: Rishikonda Beach (mainstream Vizag landmark, not a gem) · Kailasagiri Park (mainstream).

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'visakhapatnam-yarada-beach',
  'visakhapatnam',
  'Yarada Beach',
  NULL,
  25,
  '50 min drive south past Dolphin''s Nose & Yarada Hills',
  'Yarada sits behind the Yarada Hills on the southern edge of Vizag — most beach traffic stops at Rushikonda or Ramakrishna Beach on the city side. The drive to Yarada cuts behind Dolphin''s Nose lighthouse + 8km of empty cliff-road, so day-trippers without rental cars rarely make it.',
  'A 1km crescent of black-flecked sand backed by Yarada Hills, with no commercial setup beyond two chai stalls. Strong undertow Jun-Sep — swim only Oct-May after lifeguard signage. The drive itself (Dolphin''s Nose viewpoint at 358m, then coastal descent) is the experience. Open sunrise-sunset; no entry fee. Bring water + snacks — nearest food is back at Vizag city.',
  'easy',
  'AP Tourism listed beach; Tripadvisor 4.4/5 across 8000+ reviews; The Hindu Sunday Magazine 2023 feature.',
  4,
  ARRAY['beach','viewpoint','offbeat','coastal-drive']::text[],
  '{}'::jsonb
),
(
  'visakhapatnam-ins-kursura-submarine',
  'visakhapatnam',
  'INS Kursura Submarine Museum',
  NULL,
  4,
  '15 min from city centre on Beach Road',
  'Most beach-walkers on Ramakrishna Beach pass the submarine on the sand without going inside — the museum entry queue is round the back, and the ticket window keeps unusual hours (closed Mondays + 12-2pm lunch).',
  'A Soviet-built I-641 Foxtrot-class submarine, decommissioned 2001 after 31 years of Indian Navy service — beached on Ramakrishna Beach as Asia''s first submarine museum. 8 compartments accessible (control, sonar, torpedo, galley, captain''s cabin). Tight quarters — not wheelchair-accessible. Combo ticket ₹50 covers INS Kursura + adjacent TU-142 Aircraft Museum. Open 2-8.30pm Tue-Sun; closed Mondays.',
  'easy',
  'Indian Navy Eastern Naval Command-operated museum; Tripadvisor 4.5/5 4500+ reviews; Outlook Traveller feature.',
  5,
  ARRAY['museum','navy','heritage','indoor']::text[],
  '{}'::jsonb
),
(
  'visakhapatnam-simhachalam-temple',
  'visakhapatnam',
  'Simhachalam (Varaha Narasimha Temple)',
  NULL,
  17,
  '40 min drive north to Simhachalam Hill (244m)',
  'Tirupati and Sri Kalahasti dominate the Andhra pilgrim circuit — Simhachalam, a 11th c Chola-Eastern Ganga shrine atop a 244m hill 17km from Vizag, doesn''t make the standard pilgrimage package. Most Vizag visitors stay on the coast.',
  'A 11th c CE temple to Varaha Narasimha (Vishnu''s boar-lion form), built under the Eastern Gangas with later Chola + Vijayanagara additions — ASI-protected. The deity remains covered in sandalwood paste year-round except Akshaya Tritiya (April-May), when the original stone form is briefly visible. Hilltop also yields a panoramic Bay of Bengal view back to Vizag port. Open 4am-9pm; free entry; ₹100 darshan queue.',
  'easy',
  'ASI-protected Group A monument; Simhachalam Devasthanam own site (simhachalamdevasthanam.in); The Hindu 2024 Akshaya Tritiya coverage.',
  5,
  ARRAY['temple','asi','heritage','pilgrimage','hill']::text[],
  '{}'::jsonb
),
(
  'visakhapatnam-kambalakonda-sanctuary',
  'visakhapatnam',
  'Kambalakonda Wildlife Sanctuary',
  NULL,
  8,
  '20 min drive from Vizag railway',
  'A 70 sq km dry-deciduous sanctuary on Vizag''s northwest edge — the trailhead is past the IT corridor and unsigned from NH-16, so Vizag visitors miss it. Forest Dept eco-tourism but bookings only go through ranger office, not online.',
  'AP Forest Dept-managed wildlife sanctuary covering 70 sq km of dry deciduous + shrub forest at the foothills of Eastern Ghats. Sloth bear, jungle cat, Indian pangolin (rare sightings), 90+ bird species including Indian roller, white-bellied sea eagle. 3 trekking trails (3-12km); guided treks ₹500/group via ranger office at Kambalakonda Eco Park. Open 6-11am + 2-5pm; permit required for inside-sanctuary treks.',
  'moderate',
  'AP Forest Department-listed sanctuary (apforest.gov.in); Sanctuary Asia 2022 feature; eBird 200+ checklists.',
  4,
  ARRAY['wildlife','sanctuary','trek','forest','birding']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 6 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'visakhapatnam',
  'Hotel Daspalla',
  'Suryabagh, Vizag city centre',
  'suryabagh',
  ARRAY['andhra','south-indian','multi-cuisine']::text[],
  'mid_range',
  'Andhra non-veg meals (Sunday biryani)',
  ARRAY['Andhra meals','Royyala iguru (prawn curry)','Gongura mutton','Chicken biryani','Pesarattu','Filter coffee']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Vizag''s 1976 hotel-and-restaurant institution at Suryabagh — the Andhra non-veg meals + Sunday chicken biryani is the city''s default special-occasion lunch. The Royyala iguru (Andhra prawn curry with tamarind + black pepper) uses Vizag harbour prawns landed each morning. Multiple Daspalla branches in the city; Suryabagh is the 1976 original. Open 7am-11pm.',
  'Sunday biryani sells out by 2pm — book a table by 12pm. Andhra meals plate (₹350) at lunch includes 5 curries + pickle + ghee + curd-rice. Cards + UPI work.',
  'CBM Compound, Suryabagh, Vizag 530020',
  'https://maps.google.com/?q=Hotel+Daspalla+Suryabagh+Vizag',
  ARRAY[
    'https://daspalla.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d1893042-Reviews-Hotel_Daspalla-Visakhapatnam_Vizag_Visakhapatnam_District.html'
  ]::text[],
  '2026-05-12',
  true
),
(
  'visakhapatnam',
  'Sri Bramaramba Banana Leaf Hotel',
  'Asilmetta Junction, Vizag',
  'asilmetta',
  ARRAY['andhra','south-indian','pure-veg']::text[],
  'casual',
  'Banana-leaf Andhra meals (unlimited)',
  ARRAY['Banana-leaf veg meals','Pesarattu upma','Bobbatlu','Idli sambar','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The actual Banana Leaf Hotel — the Asilmetta Junction Vizag branch (NOT the listicle ghosts of the name in other cities). Unlimited Andhra veg meals on banana leaf with 5-6 curries, rasam, sambar, curd, sweet, ghee. Run by the Sri Bramaramba family since the 1990s. Open 6.30am-10.30pm; lunch service 11.30am-3.30pm.',
  'Lunch rush 12.30-2pm fills the room; arrive 11.30 or after 2.30 for shorter waits. Pesarattu upma (green-gram dosa with semolina) is the Andhra breakfast order — 7-10am only. Cash + UPI.',
  'Asilmetta Junction, Vizag 530003',
  'https://maps.google.com/?q=Sri+Bramaramba+Banana+Leaf+Hotel+Asilmetta',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d3517895-Reviews-Sri_Bramaramba_Banana_Leaf_Hotel-Visakhapatnam_Vizag_Visakhapatnam_District.html',
    'https://www.zomato.com/visakhapatnam/banana-leaf-asilmetta'
  ]::text[],
  '2026-05-12',
  true
),
(
  'visakhapatnam',
  'Sai Ram Parlour',
  'Asilmetta, Vizag',
  'asilmetta',
  ARRAY['south-indian','tiffin','snacks']::text[],
  'casual',
  'Punugulu (deep-fried lentil-rice balls)',
  ARRAY['Punugulu','Mysore bonda','Pesarattu','Idli','Filter coffee','Bobbatlu']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Vizag''s legendary Punugulu (deep-fried lentil-rice balls — Andhra street snack) anchor at Asilmetta, running since the 1980s. The Asilmetta branch is the original — most "Sai Ram Parlour" boards elsewhere are unrelated copies. Pure tiffin: 6am-11am breakfast, 4pm-10pm evening tiffin. Cash + UPI; no cards; no seating beyond 4 stools, mostly takeaway.',
  'Punugulu is fresh-fried in batches 4.30pm and 6.30pm — go within 20 min of the fry batch. Karam (red chilli chutney) packet costs ₹15 extra and is the local order. Closed Mondays.',
  'Asilmetta Junction, Vizag 530003',
  'https://maps.google.com/?q=Sai+Ram+Parlour+Asilmetta+Vizag',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d10894534-Reviews-Sairam_Parlour-Visakhapatnam_Vizag_Visakhapatnam_District.html',
    'https://www.zomato.com/visakhapatnam/sairam-parlour-asilmetta'
  ]::text[],
  '2026-05-12',
  true
),
(
  'visakhapatnam',
  'Sea Inn Restaurant',
  'Beach Road, Vizag',
  'beach-road',
  ARRAY['seafood','andhra','multi-cuisine']::text[],
  'mid_range',
  'Royyala iguru (prawn curry) + Chepala pulusu (fish tamarind curry)',
  ARRAY['Royyala iguru','Chepala pulusu','Crab masala','Tandoori pomfret','Chicken 65','Bhetki fish fry']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Beach Road seafood + Andhra-style fish curry destination — windows look onto Ramakrishna Beach. Royyala iguru uses Vizag prawns; Chepala pulusu (tamarind fish curry) is the Andhra anchor. The crab masala arrives whole-cracked at the table. Open 12-3pm + 7-11pm.',
  'Dinner 8-10pm has live music + window seats — book +91-891-2562341. Fish availability depends on the morning catch — the day''s recommendation is on a board near the entrance.',
  'Beach Road, near Ramakrishna Beach, Vizag 530002',
  'https://maps.google.com/?q=Sea+Inn+Restaurant+Beach+Road+Vizag',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d3522456-Reviews-Sea_Inn-Visakhapatnam_Vizag_Visakhapatnam_District.html',
    'https://www.zomato.com/visakhapatnam/sea-inn-beach-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'visakhapatnam',
  'Raju Gari Dhaba',
  'Beach Road, Rushikonda',
  'rushikonda',
  ARRAY['andhra','telugu','heritage']::text[],
  'mid_range',
  'Andhra non-veg meals on banana leaf',
  ARRAY['Andhra meals','Natu kodi pulusu (country chicken curry)','Royyala vepudu (prawn fry)','Gongura mamsam','Ragi sangati','Jonna rotte']::text[],
  '₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Raju Gari Dhaba is a thatched-roof Telugu village-style restaurant on Beach Road towards Rushikonda — banana-leaf meals, terracotta crockery, traditional Andhra recipes. Natu kodi pulusu (country chicken in tamarind-tomato base) is the lunch anchor; the jonna rotte (sorghum flatbread) and ragi sangati (millet ball) keep village-Andhra traditions. Open 12-4pm + 7-11pm.',
  'Lunch 1-3pm fills with Vizag families on weekends; book +91-91009-12121. Ragi sangati needs to be eaten hot — order it last so it''s not waiting.',
  'NH-5 Beach Road, Rushikonda, Vizag 530045',
  'https://maps.google.com/?q=Raju+Gari+Dhaba+Rushikonda+Vizag',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d6712341-Reviews-Raju_Gari_Dhaba-Visakhapatnam_Vizag_Visakhapatnam_District.html',
    'https://www.zomato.com/visakhapatnam/raju-gari-dhaba-rushikonda'
  ]::text[],
  '2026-05-12',
  false
),
(
  'visakhapatnam',
  'Bobbatlu Junction',
  'Dwaraka Nagar, Vizag',
  'dwaraka-nagar',
  ARRAY['andhra','sweet-shop','tiffin']::text[],
  'casual',
  'Bobbatlu (Andhra puran poli)',
  ARRAY['Bobbatlu (puran poli)','Bandar laddu','Pootharekulu','Ariselu','Karam podi pesarattu','Kakinada kaja']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bobbatlu + Andhra-sweets specialist at Dwaraka Nagar — the only one-stop shop in Vizag for the four Andhra-state regional sweets (Bandar laddu from Machilipatnam, Pootharekulu from Atreyapuram/Rajahmundry, Kakinada kaja, Tapeswaram madathakaja). All sweets made in-house except Pootharekulu (sourced from Atreyapuram). Open 7am-10pm.',
  'Bobbatlu hot-from-the-pan at 5pm batch — call ahead to reserve a dozen. Pootharekulu (paper-thin GI-tagged sweet from Atreyapuram) sells out by 7pm.',
  'Dwaraka Nagar Main Road, Vizag 530016',
  'https://maps.google.com/?q=Bobbatlu+Junction+Dwaraka+Nagar+Vizag',
  ARRAY[
    'https://www.zomato.com/visakhapatnam/bobbatlu-junction-dwaraka-nagar',
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d12345678-Reviews-Bobbatlu_Junction-Visakhapatnam.html'
  ]::text[],
  '2026-05-12',
  false
);
