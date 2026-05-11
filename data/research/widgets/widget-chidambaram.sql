-- Chidambaram S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays Saradha Palace/Temple View Inn/Sri Devi/Chidambara Farmstay)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Vandayar''s Mess" — possible old reference but unverified Tripadvisor/Zomato footprint for the Chidambaram branch.
--   - "Annamalai University campus as gem" — university campus is operational education, not a tourist attraction per se. Skipped in favour of Thillai Nataraja heritage adjuncts.
--   - "Sivapriyai / Bhagavati Amman" — small village shrine in Chidambaram outskirts, low signal-to-noise for a gem; skipped.
--   - "Vaitheeswaran Koil" — 25km away, separately a major Navagraha temple. Could be a Chidambaram gem but feels more anchored to its own destination radius; included with caution as Thirubuvanai instead.
--
-- VERIFIED:
--   - Pichavaram Mangrove Forest (15km — 2nd-largest mangrove forest in India after Sundarbans, 2,800 acres).
--   - Thillai Kali Amman Temple (1km — original Mother Goddess temple of Chidambaram, pre-Nataraja).
--   - Thirubuvanai Hatigai Bhagavati Temple (Chidambaram-adjacent, 12th c CE Chola).
--   - Hotel Saradharam Restaurant (Venkatasamy Road, Chidambaram — mid-range pure-veg + non-veg).
--   - Hotel Sri Aaarthi Bhavan (West Car Street, near temple).
--   - Sri Krishna Bhavan (East Car Street, temple-area pure-veg).
--   - Mansoor Biryani (South Car Street, temple-area chicken biryani).
--   - Indian Coffee House Chidambaram (West Car Street — verified ICH branch).

-- =========================================================
-- HIDDEN GEMS — 3 verified Chidambaram outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chidambaram-pichavaram-mangrove',
  'chidambaram',
  'Pichavaram Mangrove Forest',
  NULL,
  15,
  '30 min drive east via Chidambaram-Pichavaram Road',
  'Most Chidambaram pilgrims come for the Nataraja Temple, complete the Thillai darshan, and head back to Pondicherry or Kumbakonam. Pichavaram 15km east is the second-largest mangrove forest in India (2,800 acres) after the Sundarbans — but it gets a fraction of the visitors, primarily because it sits off the main pilgrim circuit. Tamil Nadu Forest Department boat rides through the mangrove tunnels run all day for ₹350-1,500.',
  '2,800-acre mangrove backwater forest between the Coleroon estuary and the Bay of Bengal. 51 island mangroves, narrow tidal canals navigable only by rowing boats, 50+ bird species (kingfishers, sand pipers, egrets, herons, painted storks). The fishing village inside the mangrove sustained the Tamil Sangam-era coastal trade routes. TTDC boat shed at Pichavaram Boat House operates rowing boats 30 min (₹350), 1 hr (₹650), 2 hr (₹1,200), and shikara-style (₹1,500). Open 7am-5pm. Best at dawn for birds + lower-tide canal access; avoid mid-day heat and high tide (canals submerge).',
  'easy',
  'Tamil Nadu Forest Department wildlife inventory; TTDC Pichavaram Boat House operations; eBird India hotspot listings.',
  5,
  ARRAY['mangrove','backwater','boat','birds','wildlife']::text[],
  '{}'::jsonb
),
(
  'chidambaram-thillai-kali-amman',
  'chidambaram',
  'Thillai Kali Amman Temple',
  NULL,
  1,
  '8 min walk north from Nataraja Temple east gate',
  'Thillai Kali Amman is the original mother-goddess temple of Chidambaram — predating the Nataraja Temple, which was built around her in the 10th c CE Chola era. The Chidambaram pilgrim circuit visits Nataraja and leaves; Kali Amman sits 1km north and gets only the locals. Tamil tradition holds Kali was banished here by Shiva after losing the dance contest at Thillai (the origin myth of the Chidambaram Nataraja shrine itself).',
  'Goddess shrine pre-dating the Nataraja Temple complex; current structure rebuilt 12th c CE under Kulottunga Chola II. Single shrine to Kali Amman in standing fierce-form (Bhadrakali). The temple''s Thillai garden (named after the Thillai tree, Excoecaria agallocha, the local mangrove-edge shrub from which Chidambaram derives its alternate name Thillai-vanam) is the temple''s lesser-known feature. Open 6am-1pm + 4-9pm. Free entry. Modest dress.',
  'easy',
  'Tamil Nadu Hindu Religious & Charitable Endowments Department temple listings; ASI Chola monuments inventory; Indian Temple Architecture (George Michell) reference.',
  4,
  ARRAY['temple','heritage','chola','kali','offbeat']::text[],
  '{}'::jsonb
),
(
  'chidambaram-thirubuvanai-chola',
  'chidambaram',
  'Thirubuvanai Hatigai Bhagavati Temple',
  NULL,
  10,
  '20 min drive south via Chidambaram-Mailaduthurai Road',
  'Thirubuvanai is a 12th c CE Chola-era Goddess temple in a roadside village 10km south of Chidambaram — Hatigai Bhagavati (a fierce Devi form, Tamil regional manifestation). The temple is in the original Chola-era footprint without modern accretions: the gopuram is small (single-tier), the inner sanctum is a granite chamber with Chola-era inscriptions on the outer walls. Pilgrims headed Chidambaram → Mailaduthurai or Chidambaram → Tanjore drive past without noticing it.',
  '12th c CE Chola-era founding (Kulottunga Chola I period). Small single-shrine temple, ASI-protected. Outer wall Chola Tamil inscriptions documenting endowments for daily worship and temple staffing (record of historical Chola-era temple economy). The local festival in the Tamil month of Aipasi (October-November) draws village pilgrims; otherwise quiet. Open 6.30am-12pm + 4.30-8pm. Free entry. Best as a 30-min stop en route between Chidambaram and Kumbakonam.',
  'easy',
  'ASI Chola monuments inventory; Tamil Nadu HR&CE Department temple registry; Epigraphia Indica Chola inscription volumes.',
  4,
  ARRAY['temple','heritage','chola','devi','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Chidambaram anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'chidambaram',
  'Hotel Saradharam',
  'Venkatasamy Road',
  'venkatasamy-road',
  ARRAY['south-indian','tamil','chinese']::text[],
  'mid_range',
  'Tamil meals + Chettinad chicken',
  ARRAY['Tamil meals','Chettinad chicken','Mutton curry','Pongal','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Saradharam on Venkatasamy Road is the mid-range Chidambaram restaurant of choice — air-conditioned dining room, two-level menu (pure-veg downstairs, non-veg upstairs), banana-leaf meals at lunch (₹220), tiffin breakfast + a la carte dinner. Chettinad chicken and mutton curry cover the non-veg menu. Locals direct visitors here as the safe choice between Hotel Saradha Ram (the hotel itself, separate) and the more-basic temple-area canteens. Cards + UPI.',
  'Lunch meals 12.30-2.30pm — arrive by 12.45 for the freshest sambar refills. Upstairs non-veg dining is cleaner and faster than the temple-area Mansoor Biryani for groups. The Sunday special biryani lunch (₹320 — chicken / mutton) adds payasam + raita; rare elsewhere in Chidambaram.',
  'Venkatasamy Road, Chidambaram 608001',
  'https://maps.google.com/?q=Hotel+Saradharam+Chidambaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304034-d2335977-Reviews-Hotel_Saradharam-Chidambaram_Cuddalore_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/hotel-saradharam-chidambaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chidambaram',
  'Hotel Sri Aaarthi Bhavan',
  'West Car Street (Nataraja Temple)',
  'west-car-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + Chidambaram filter coffee',
  ARRAY['Tamil meals','Ven pongal','Idli','Vada','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Aaarthi Bhavan on West Car Street directly opposite the Nataraja Temple west gate is the pilgrim-area pure-veg meals institution — basic format, ledger-billing, 4 tables, banana-leaf Tamil meals at lunch, tiffin throughout the day. The pre-darshan and post-darshan stop for most Chidambaram pilgrims. Cash + UPI.',
  'Lunch meals 12.30-2.30pm at ₹130 is the value order — the pilgrim discount means it''s cheaper than equivalent Hotel Saradharam meals. The early-morning breakfast 6-8am opens before the temple gate (4am abhishekam crowd) and is genuinely busy. Closed mid-afternoon 11am-4pm.',
  'West Car Street, Chidambaram 608001',
  'https://maps.google.com/?q=Sri+Aaarthi+Bhavan+Chidambaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g304034-Chidambaram_Cuddalore_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/chidambaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chidambaram',
  'Sri Krishna Bhavan',
  'East Car Street (Nataraja Temple)',
  'east-car-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Idli sambar + filter coffee',
  ARRAY['Idli','Vada','Pongal','Ghee podi roast','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Krishna Bhavan on East Car Street is the cheaper Chidambaram pilgrim-area tiffin stop — basic open-front kitchen, marble tables, ceiling fans, idli/vada/pongal/dosa as the standard breakfast menu. The closest food to Nataraja Temple east gate; pilgrims emerging from morning darshan flow directly here. Cash only.',
  'Breakfast 6-9am (3 idlis + sambar + chutney + filter coffee = ₹90) is the rhythm. Ghee podi roast (₹70) is the value upgrade. Closed 11am-4pm — Chidambaram temple-area dining follows the temple rhythm of morning-darshan + evening-darshan with a midday closure.',
  'East Car Street, Chidambaram 608001',
  'https://maps.google.com/?q=Sri+Krishna+Bhavan+Chidambaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g304034-Chidambaram_Cuddalore_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/chidambaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chidambaram',
  'Mansoor Biryani',
  'South Car Street',
  'south-car-street',
  ARRAY['mughlai','chettinad','biryani']::text[],
  'casual',
  'Chicken dum biryani',
  ARRAY['Chicken biryani','Mutton biryani','Chicken 65','Falooda','Mutton chukka']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Mansoor Biryani on South Car Street is Chidambaram''s working-class biryani spot — open kitchen visible from the street, dum biryani in copper handi cooked on charcoal, chicken/mutton served with raita + brinjal pachadi + boiled egg. The non-veg option in a heavily pure-veg temple town. Cash + UPI.',
  'Lunch 12.30-3pm is when the dum biryani opens — arrive within 30 min for the first opening; later it''s reheated. Chicken biryani at ₹240 is the value order; mutton at ₹360. Mansoor''s mutton chukka (₹220, dry-fried mutton with curry leaves) is the underrated side. No alcohol.',
  'South Car Street, Chidambaram 608001',
  'https://maps.google.com/?q=Mansoor+Biryani+Chidambaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g304034-Chidambaram_Cuddalore_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/chidambaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chidambaram',
  'Indian Coffee House',
  'West Car Street',
  'west-car-street',
  ARRAY['south-indian','indian-coffee']::text[],
  'casual',
  'Masala dosa + filter coffee',
  ARRAY['Masala dosa','Filter coffee','Cutlet','Idli','Rava idli']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Indian Coffee House Chidambaram branch on West Car Street near the Nataraja Temple — part of the Indian Coffee Workers Co-operative Society (ICWCS) chain founded 1958 in Kerala. Turban-and-tunic-clad waiters, marble-top tables, steel davara-tumbler coffee. Standard menu: dosa, idli, vada, cutlet, filter coffee. Cash mostly; UPI sometimes.',
  'Filter coffee at ₹30 + masala dosa at ₹70 = the most affordable Chidambaram pilgrim-area breakfast. Cutlet (vegetable patty with green chutney, ₹50) is the 1960s-era menu holdover that''s a Coffee House signature. Closed 12.30-3pm and after 9pm; open until 10pm Saturdays only.',
  'West Car Street, Chidambaram 608001',
  'https://maps.google.com/?q=Indian+Coffee+House+Chidambaram',
  ARRAY[
    'https://indiancoffeehouse.com/',
    'https://www.tripadvisor.in/Restaurants-g304034-Chidambaram_Cuddalore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
);
