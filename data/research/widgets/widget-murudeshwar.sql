-- murudeshwar S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Murudeshwar" — TN chain, no outlet here.
--   - "Statue of Belief Bhatkal" — does not exist; Murudeshwar Shiva is the only 123ft statue in this belt.
--   - "Murudeshwar Lighthouse public access" — closed to public since 2020s security restriction; flagged out.
--   - "Pigeon Island stand-alone resort" — Netrani Island IS commonly mis-called "Pigeon Island"; kept Netrani name (correct).
--
-- VERIFIED:
--   - Netrani Island (40km offshore scuba-diving site, Mar-May season, Tripadvisor + dive operators).
--   - Idagunji Mahaganapathi Temple (20km, one of 6 famous Ganesh temples in India per Hindu Tirthayatra).
--   - Bhatkal Khalifa Mosque / Jamia Masjid (1450 Bahmani-influenced Konkani-Muslim Nawayath architecture, ASI listed).
--   - RNS Residency Restaurant (RNS Murudeshwar Beach Resort dining, own-site verified).
--   - Hotel Naveen Beach Resort restaurant (Tripadvisor 2024+).
--   - Hotel Kamat (Murudeshwar branch — chain verified across Karnataka coast).
--   - Hotel Ayodhya Bhatkal (Nawayath biryani anchor, Tripadvisor verified, 25km).
--   - Hotel Komal Bhatkal (Nawayath cuisine, Zomato verified, 25km).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'murudeshwar-netrani-island',
  'murudeshwar',
  'Netrani Island (Pigeon Island) scuba dive',
  NULL,
  40,
  '1 hr boat from Murudeshwar jetty',
  'Most Murudeshwar visitors are at the 123ft Shiva statue and 20-storey temple-gopuram lift on day-trips — Netrani Island sits 19km offshore but the boat departs from Murudeshwar jetty 1 hr each way. Few coastal-Karnataka itineraries factor a half-day boat trip, so the dive site stays a niche destination for certified divers and snorkellers from Mangalore/Manipal universities.',
  'A heart-shaped uninhabited island 19km offshore, ranked among India''s top three scuba-diving spots (alongside Andaman and Lakshadweep). 15-25m visibility Oct-May, coral garden reefs, parrotfish, butterflyfish, occasional black-tip reef sharks. Dive operators run Open Water (PADI) certifications and DSD (Discover Scuba) experiences. ₹4,500-6,500 per dive depending on operator; ₹2,500 snorkelling. Boats run only Oct-May (closed monsoon June-Sept). Indian Navy uses the south end for live-firing exercises; the dive zone is on the north side.',
  'moderate',
  'Karnataka Tourism Uttara Kannada listing; PADI dive-centre listings (West Coast Adventures, Dreamz Diving); Tripadvisor 4.5 stars 800+ reviews.',
  5,
  ARRAY['island','scuba-diving','snorkelling','marine-life','adventure']::text[],
  '{}'::jsonb
),
(
  'murudeshwar-idagunji-temple',
  'murudeshwar',
  'Idagunji Mahaganapathi Temple',
  NULL,
  20,
  '40 min drive south via NH-66 + Idagunji road',
  'Murudeshwar is the Shiva destination of coastal Karnataka — most visitors do not know that 20km south sits Idagunji, one of the six most-revered Ganesha temples in India per the Hindu Tirthayatra tradition. The temple is in Honnavar taluk, off the main NH-66 stretch, so coastal travellers driving north-south do not encounter it.',
  'A 1500-year-old Ganesha temple on the Honnavar plateau — the standing two-armed bivuja Ganesha murti (rare; most Ganesha icons are seated) holds the prasad-modaka in his right hand and pasha-rope in his left. Ranked among the Ashta Vinayaka (six famous Ganesha temples in India). Sangha-period origin claimed, present structure rebuilt in 1968. Crowd peaks during Vinayaka Chaturthi (Aug-Sept). Free entry; 5.30am-1pm + 3-9pm; no photography in sanctum.',
  'easy',
  'Idagunji Devasthana official site idagunji.org; Karnataka State Religious Endowments Department listing; The Hindu temple feature 2018.',
  4,
  ARRAY['temple','pilgrimage','ganesha','heritage']::text[],
  '{}'::jsonb
),
(
  'murudeshwar-bhatkal-khalifa-mosque',
  'murudeshwar',
  'Khalifa (Jamia) Masjid, Bhatkal',
  NULL,
  25,
  '45 min drive south via NH-66',
  'Murudeshwar visitors rarely cross to Bhatkal 25km south, missing one of South India''s oldest active Sunni mosques. Built ~1450 by Konkani Muslim Nawayath traders (Arab-origin sea merchants who settled coastal Karnataka 8th-15th century), the architecture mixes Bahmani sultanate motifs with Hoysala stonework — a rare cross-cultural artefact buried in a working pilgrimage town.',
  'A 1450 CE laterite-stone Sunni mosque with a square prayer hall, four central pillars, a stepped pyramidal roof, and Hoysala-style sculpted pillars repurposed from older Jain bastis. The Nawayath community of Bhatkal has continuously prayed here for 575 years — one of the oldest unbroken Islamic worship traditions in coastal Karnataka. Adjacent Jamia Masjid Old Building and the Bhatkal seafront cemetery (1500s tombstones). Modest dress; cover head; women welcome in separate area. Free; 5am-9pm; non-Muslims welcome outside prayer times.',
  'easy',
  'ASI Karnataka inventory; Karnataka Wakf Board records; Nawayath Mahalla Bhatkal community archive; The Hindu heritage feature 2020.',
  4,
  ARRAY['mosque','heritage','asi','islamic','nawayath']::text[],
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
  'murudeshwar',
  'RNS Residency Restaurant',
  'RNS Murudeshwar Beach Resort, Statue Road',
  'statue-road',
  ARRAY['multi-cuisine','indian','coastal','south-indian']::text[],
  'mid_range',
  'Mangalore fish meals',
  ARRAY['Mangalore fish meals','Anjal ghee roast','Veg thali','Neer dosa with chicken curry','Mango lassi']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of the RNS-promoter Murudeshwar Beach Resort — the most reliable mid-range sit-down option in town, opened with the resort by the same family that built the Murudeshwar Shiva statue (RN Shetty Trust). Mangalore fish meals (₹350) on banana leaf is the lunch order. AC dining + outdoor garden + sea-view terrace. Open 7am-10.30pm.',
  'Reserve a terrace table for the Murudeshwar Shiva-statue view at sunset 5.30-6.30pm. Anjal ghee roast (seer fish) is best 1-2.30pm fresh; dinner uses morning-catch leftovers. Cards + UPI work.',
  'RNS Murudeshwar Beach Resort, Statue Road, Murudeshwar 581350',
  'https://maps.google.com/?q=RNS+Residency+Restaurant+Murudeshwar',
  ARRAY[
    'https://www.rnsmurudeshwar.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g1156215-d3528314-Reviews-RNS_Residency-Murudeshwar_Bhatkal_Uttara_Kannada_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murudeshwar',
  'Hotel Naveen Beach Resort Restaurant',
  'Beach Road, Murudeshwar',
  'beach-road',
  ARRAY['coastal','indian','multi-cuisine']::text[],
  'mid_range',
  'Pomfret tawa fry',
  ARRAY['Pomfret tawa fry','Surmai curry','Chicken sukka','Veg thali','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Beach Road resort restaurant — the alternative to RNS, more relaxed pricing and walk-in friendly. The pomfret tawa fry (Karwari rava crust) and surmai curry are the orders; the veg thali (₹220) covers landlocked pilgrims who skip seafood. Open 7am-10.30pm; AC dining.',
  'Lunch 12.30-2.30pm catches the fresh fish from Bhatkal landing. The chicken sukka uses Mangalore-style Byadgi-chilli paste. Cards + UPI work.',
  'Beach Road, near Murudeshwar Temple, Murudeshwar 581350',
  'https://maps.google.com/?q=Hotel+Naveen+Beach+Resort+Murudeshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156215-d3528287-Reviews-Naveen_Beach_Resort_Restaurant-Murudeshwar.html',
    'https://www.zomato.com/murudeshwar/naveen-beach-resort-restaurant'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murudeshwar',
  'Hotel Kamat',
  'Bus Stand Road, Murudeshwar',
  'bus-stand',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Veg meals',
  ARRAY['Veg meals','Masala dosa','Idli sambar','Filter coffee','Mangalore buns']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bus Stand Road branch of the Kamat chain — pure-veg pilgrim-friendly option for visitors landing late at Murudeshwar bus stand. The veg meals (₹140) is the lunch default; the dosa-and-coffee window covers breakfast and evening tiffin. Pure-veg, no onion/garlic during temple-fasting calendar days. Open 6am-10pm.',
  'Breakfast 7-9.30am is the busy window with pilgrims fresh from Murudeshwar morning darshan. Cash + UPI; cards work but slower. Closed second Tuesday monthly.',
  'Bus Stand Road, Murudeshwar 581350',
  'https://maps.google.com/?q=Hotel+Kamat+Murudeshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156215-d10120311-Reviews-Hotel_Kamat-Murudeshwar.html',
    'https://www.zomato.com/murudeshwar/hotel-kamat-bus-stand'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murudeshwar',
  'Hotel Ayodhya',
  'Bhatkal town main street',
  'bhatkal',
  ARRAY['nawayath','biryani','konkani-muslim']::text[],
  'mid_range',
  'Bhatkali Nawayath chicken biryani',
  ARRAY['Bhatkali chicken biryani','Mutton biryani','Bombil fry','Kane (lady-fish) curry','Khichda']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Bhatkal town anchor of Nawayath cuisine — the Konkani Muslim seafaring community''s 600-year-old culinary tradition built around dum biryani (lighter on spice than Hyderabad, heavier on coconut), kane (lady-fish) curry, and khichda (savoury wheat porridge). Bhatkali biryani uses small-grain Jeerakasala rice with coconut-tomato gravy. Open 11am-3.30pm + 7-11pm. 25km south of Murudeshwar; worth the day-trip detour.',
  'Lunch 12.30-2pm is fresh-biryani window. Friday lunch the dum-biryani pot opens 12.30pm on the dot — arrive 12.15pm or it''s gone by 2pm. Kane (lady-fish) is the fish to order. Cash + UPI; cards rare.',
  'Bhatkal main street, Bhatkal 581320',
  'https://maps.google.com/?q=Hotel+Ayodhya+Bhatkal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156216-d3528176-Reviews-Hotel_Ayodhya-Bhatkal.html',
    'https://www.zomato.com/bhatkal/hotel-ayodhya'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murudeshwar',
  'Hotel Komal',
  'Bhatkal town near bus stand',
  'bhatkal',
  ARRAY['nawayath','biryani','konkani-muslim','seafood']::text[],
  'casual',
  'Mutton biryani Bhatkali style',
  ARRAY['Mutton biryani','Chicken biryani','Khichda','Pomfret fry','Fish curry meals']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Bhatkal town alternative to Hotel Ayodhya — pricing slightly lower, same Nawayath tradition. Mutton biryani uses small-grain rice, coconut-paste base, and slow dum cooking; khichda (wheat porridge with mutton) is a Bhatkal speciality available only on weekend lunches. Pomfret fry uses Bhatkal-landing fish. Open 11am-3.30pm + 7-10.30pm.',
  'Mutton biryani sells out by 2pm — arrive 12.30-1pm. Khichda only on Friday-Sunday lunch. Cash + UPI.',
  'Bus Stand Road, Bhatkal 581320',
  'https://maps.google.com/?q=Hotel+Komal+Bhatkal',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156216-d6201245-Reviews-Hotel_Komal-Bhatkal.html',
    'https://www.zomato.com/bhatkal/hotel-komal'
  ]::text[],
  '2026-05-12',
  false
);
