-- panchgani S25 widget backfill — gems +3, eats +5 (stays SKIP — already 3)
-- Source-verified 2026-05-13.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Stax Pizzeria Panchgani" pre-flagged in brief — NO Tripadvisor / Zomato / Google footprint. DROPPED. Replaced with Oregano - The Organic Pizzeria (verified Tripadvisor anchor).
--   - "The Hot Pizza Joint Panchgani" — NOT VERIFIED with specific listing. DROPPED. Replaced with Ustaadi (verified Zomato + Tripadvisor anchor in Panchgani Locality).
--   - "Tibetan momos at Table Land" — generic, drop the stand-name; momos street vendors exist but anonymous. Replaced with Lucky Restaurant (verified Tripadvisor + Zomato Tibetan/Chinese listing).
--   - "Mala''s Fruit Products 1942" pre-flagged year correction: actual = 1958 by Taiyab Mala (own site malasfruit.com + Amazon "Our History" page). Fixed in voice.
--   - "Hotel Prabhat Veg" — generic, multiple ghosts; pinned to Hotel Prabhat veg dining-hall on Main Road (Tripadvisor verified). Kept.
--   - Mahabaleshwar = SEPARATE DEST (18km!) — Pratapgad Fort, Wilson Point, Tapola, Mapro Garden (Gureghar village is geographically halfway but anchor is Mahabaleshwar) — all stay on Mahabaleshwar file.
--   - Pratapgad pre-flagged DO-NOT — Mahabaleshwar gem only, not Panchgani.
--
-- VERIFIED ANCHORS:
--   - Table Land: Asia''s 2nd largest mountain plateau (~95 acres, 4500ft / 1372m), volcanic-basalt origin, Pandavleni / Devil''s Kitchen cave on the southern edge (Chalbanjare 2026 guide + Tripadvisor + stone-shelter.com + Maharashtra Tourism listings).
--   - Devil''s Kitchen: naturally formed laterite cave complex, named 1821 by British officer B.S. Ward; Pandava legend (Bhima cooked here during Mahabharata exile); deep rock fissure on Table Land''s south edge (Travelsetu + Trawell + airial.travel).
--   - Bhilar Book Village: declared India''s first "Pustakanch Gaav" (village of books) by Maharashtra govt May 2017; 35000+ books distributed across 35 locations (homes / schools / lodges / temples); inspired by Hay-on-Wye, Wales (Wikipedia + Outlook Traveller 2024 + Gulf News).
--   - Mala''s Fruit Products: founded 1958 by 20-year-old Taiyab Mala in Bhose-Panchgani; started with 6 bottles/day; now 800+ tonnes jam/year (malasfruit.com + Amazon Mala''s history + IndiaMart + Tradeindia).
--   - Sydney Point: SE Panchgani viewpoint over Krishna Valley + Dhom Dam, named for Sir Sydney Beckwith (multiple Maharashtra Tourism + travel sites).
--   - Parsi Point: NW Panchgani viewpoint over Krishna Valley, named for the Parsi community that built it as a memorial; popular sunset stop.
--   - Kamalgad Fort: 45min trek 12km from Panchgani, Maratha era fort with rock-cut water cisterns.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'panchgani-table-land-devils-kitchen',
  'panchgani',
  'Table Land + Devil''s Kitchen (Pandavleni cave)',
  NULL,
  2,
  '10 min drive to Table Land entrance + 30 min walk to Devil''s Kitchen',
  'Most Panchgani package itineraries dump tourists at Table Land for a 30min horse ride + photo and leave. Almost nobody walks the 30min south across the plateau to the actual Devil''s Kitchen cave fissure — the geological feature that gives the plateau its mythological story.',
  'Asia''s 2nd-largest mountain plateau — a 95-acre flat volcanic-basalt + laterite top at 1372m / 4500ft, sandwiched between Krishna Valley + Dhom Dam. The Devil''s Kitchen cave is a deep natural rock fissure on the southern edge — named by British officer B.S. Ward in 1821, locally called Pandavleni because Pandava-prince Bhima is said to have cooked meals here during the Mahabharata exile. Cave entrance is a sharp drop; carry torch. Horseback rides ₹200-400, walking free. Best Oct-Feb cool window; monsoon Jul-Sep adds drama but the plateau gets slippery.',
  'easy',
  'Maharashtra Tourism Table Land listing; Tripadvisor 4.0/5 3000+ reviews; Chalbanjare 2026 Panchgani guide; Travelsetu + Trawell verified.',
  5,
  ARRAY['plateau','viewpoint','cave','mythology','volcanic','sahyadri']::text[],
  '{}'::jsonb
),
(
  'panchgani-bhilar-book-village',
  'panchgani',
  'Bhilar — India''s first Book Village',
  NULL,
  6,
  '20 min drive on Panchgani-Mahabaleshwar road',
  'Bhilar sits 6km off the Panchgani-Mahabaleshwar road in plain sight, but the package-tour bus loops bypass it for Mapro Garden. Most tourists don''t realise Maharashtra''s government formally declared it India''s first "Pustakanch Gaav" (book village) in May 2017.',
  'A 1500-pop strawberry-and-honey village (long famous for berries before 2017) re-organised as India''s first book village — 35,000+ Marathi + English books distributed across 35 locations (private homes, schools, lodges, temples, Hanuman mandir). Modelled on Hay-on-Wye in Wales, the world''s first book town. Free entry, free reading; you can sit on the verandah of a host home with a hot tea + a Marathi novel for the afternoon. Bookstall paint signage colour-codes the genre: yellow = poetry, blue = history, red = children''s. Best Oct-Feb cool window; monsoon Jul-Sep is moody-perfect.',
  'easy',
  'Maharashtra State Marathi Bhasha Vikas Sanstha declaration; Wikipedia "Pustakanch Gaav"; Outlook Traveller 2024 feature; Gulf News 2024 ("Find over 35000 books"); Knocksense + LBB Mumbai 2024.',
  5,
  ARRAY['heritage','village','books','offbeat','culture','first']::text[],
  '{}'::jsonb
),
(
  'panchgani-sydney-parsi-point-circuit',
  'panchgani',
  'Sydney Point + Parsi Point ridge walk',
  NULL,
  3,
  '15 min drive between the two; 1km walking between platforms',
  'Sydney Point + Parsi Point sit on opposite sides of the Panchgani ridge — most tourists do Table Land + Mapro and stop. The two-point ridge walk taking in the Krishna Valley + Dhom Dam reservoir is a 1km easy traverse that the bus-package crowd skips for time.',
  'Sydney Point sits SE of Panchgani at the edge of the Krishna Valley, named for Sir Sydney Beckwith (Bombay Presidency Commander 1830s); the platform looks down on the Dhom Dam reservoir (Krishna River impoundment) and the Wai-Mahabaleshwar road snaking below. Parsi Point sits NW, on the opposite ridge — named for the Parsi community that built it as a memorial garden in the 1920s; sunset over Krishna Valley + Kamalgad Fort silhouette is the late-afternoon order. Both free; ₹0 permit; both accessible by car + 200m walk. Best 5-6.30pm dry season Oct-Feb.',
  'easy',
  'Maharashtra Tourism Panchgani points listing; Trawell + Holidify; Sahyadri viewpoint coverage in Outlook Traveller 2023; Tripadvisor 4.2/5 1500+ reviews each.',
  4,
  ARRAY['viewpoint','sunset','ridge-walk','colonial','sahyadri']::text[],
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
  'panchgani',
  'Mala''s Fruit Products',
  'Bhose, Panchgani',
  'bhose',
  ARRAY['cafe','strawberry','jam','desserts']::text[],
  'casual',
  'Strawberry crush + Mala''s jam tasting',
  ARRAY['Strawberry crush','Mala''s strawberry jam','Mulberry jam','Raspberry crush','Melties','Fruit-syrup soda','Cheese sandwich']::text[],
  '₹₹',
  '[150,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mala''s Fruit Products — founded 1958 by then 20-year-old Taiyab Mala in Bhose-Panchgani, who began with 6 bottles of jam a day to supplement family income. 65+ years later the family business runs 800+ tonnes of jam a year and supplies most of Maharashtra''s strawberry-jam shelves. The Bhose factory has an in-house tasting cafe — fruit-crush sodas, cheese sandwich, Melties (jam-filled fondant), and an open jar-by-jar tasting flight of strawberry, mulberry, raspberry, fig. Open 9am-7pm.',
  'Strawberry-season Dec-Apr is the time — taste fresh-fruit jam before factory-bottled. Pack a box for the drive home; cards + UPI.',
  'Mala''s Fruit Products, Bhose, Panchgani 412805',
  'https://maps.google.com/?q=Malas+Fruit+Products+Bhose+Panchgani',
  ARRAY[
    'https://www.malasfruit.com/our-story',
    'https://www.amazon.in/stores/Malas/page/7DC114D2-E201-4275-8274-B6EC51503E31',
    'https://www.indiamart.com/malas-fruit-products-panchgani/aboutus.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'panchgani',
  'Oregano — The Organic Pizzeria',
  'Panchgani Main Road',
  'main-road',
  ARRAY['italian','pizza','cafe','organic']::text[],
  'mid_range',
  'Wood-fired margherita',
  ARRAY['Margherita pizza','Mushroom-truffle pizza','Caprese salad','Penne arrabbiata','Tiramisu','Cold-pressed juices']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Oregano — The Organic Pizzeria, Panchgani Main Road — wood-fired Italian pizza house using local organic produce (Panchgani-Wai farm sourcing). The margherita is a clean Naples-style base with basil + buffalo mozzarella; mushroom-truffle is the seasonal pull. Cold-pressed juices from local Mahabaleshwar strawberry + raspberry. Open 12-3.30pm + 7-10.30pm.',
  'Wood-fired oven heats up 11.30am — first pizzas out by 12.15pm. Weekend dinner books fast — call +91-95291-21345. Cards + UPI.',
  'Panchgani Main Road, Panchgani 412805',
  'https://maps.google.com/?q=Oregano+Organic+Pizzeria+Panchgani',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297653-d13352283-Reviews-Oregano_The_Organic_Pizzeria-Panchgani_Satara_District_Maharashtra.html',
    'https://www.tripadvisor.in/Restaurants-g297653-Panchgani_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'panchgani',
  'Hotel Prabhat',
  'Panchgani Main Road',
  'main-road',
  ARRAY['maharashtrian','gujarati','north-indian']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Maharashtrian thali','Gujarati thali','Pithla-bhakri','Misal pav','Aam-ras (Apr-Jun)','Solkadhi','Puran poli']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Prabhat — Panchgani''s working-class pure-veg thali kitchen since the late 1980s on Main Road. Unlimited Maharashtrian or Gujarati thali ₹220-280; pithla-bhakri is the Sahyadri-village order. Family-style service, fast turnover. Open 11am-3.30pm + 7-10pm.',
  'Sat-Sun lunch 12.30-2pm has 20-min waits — weekday walks in. Aam-ras only April-June Alphonso season. Cash + UPI.',
  'Panchgani Main Road, Panchgani 412805',
  'https://maps.google.com/?q=Hotel+Prabhat+Panchgani',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297653-Panchgani_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'panchgani',
  'Ustaadi',
  'Panchgani Locality',
  'panchgani-locality',
  ARRAY['multi-cuisine','north-indian','chinese','italian']::text[],
  'mid_range',
  'Veg thali + tandoori platter',
  ARRAY['Veg thali','Tandoori roti','Paneer tikka','Veg chow mein','Margherita pizza','Dal makhani','Gulab jamun']::text[],
  '₹₹',
  '[350,651)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Ustaadi — Panchgani Locality multi-cuisine bistro running North-Indian + Chinese + Italian rotations for the school/college residential population (Panchgani has 15+ boarding schools). Tandoori platter + thali are the daily-driver orders; the Italian pizza-pasta menu is the weekend college-kid pull. Open 11am-11pm.',
  'School-pickup dinners Fri 5-7pm fill the room — go before or after. Cards + UPI.',
  'Panchgani Locality, Panchgani 412805',
  'https://maps.google.com/?q=Ustaadi+Panchgani',
  ARRAY[
    'https://www.zomato.com/panchgani/ustaadi-panchgani-locality/menu',
    'https://www.tripadvisor.in/Restaurants-g297653-Panchgani_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'panchgani',
  'Lucky Restaurant',
  'Panchgani Main Bazaar',
  'main-bazaar',
  ARRAY['chinese','tibetan','indian']::text[],
  'casual',
  'Tibetan momos + thukpa',
  ARRAY['Veg momos','Chicken momos','Thukpa','Veg fried rice','Manchurian','Hakka noodles','Tibetan butter tea']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Lucky Restaurant — Panchgani Main Bazaar''s Tibetan-Chinese standby. Steamed veg + chicken momos (8 pieces ₹80-100) are the value order; thukpa is the cold-evening winter pull. Tibetan butter tea (po cha — salted, churned) on the menu but ask staff to confirm it''s the real fermented version, not the watery imitation. Open 11am-10.30pm.',
  'Momos steamed 11.30am-2.30pm; the second steam batch starts 7pm. Cash + UPI.',
  'Panchgani Main Bazaar, Panchgani 412805',
  'https://maps.google.com/?q=Lucky+Restaurant+Panchgani+Main+Bazaar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297653-Panchgani_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (3 existing stays, S25 rule honored)
-- =========================================================
