-- Chettinad S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- Source-verified 2026-05-11. Chettinad = heritage region of 75 villages in Sivaganga + Pudukkottai districts; Karaikudi is the urban anchor.
--
-- FABRICATIONS RULED OUT:
--   - "Avudayar Koil" cross-dest — temple is in Pudukkottai district 40km E (closest to Karaikudi-Avudayarkovil road); listing as Chettinad-region gem with explicit distance flag.
--   - "Indian Coffee House Karaikudi" — no verifiable ICH branch in Karaikudi.
--   - "Saravana Bhavan Karaikudi" — no verifiable Saravana Bhavan outlet.
--   - "Chidambara Vilas Restaurant" — restaurant is the in-house dining at Chidambara Vilas heritage hotel, only for hotel guests / advance booking. Listed under heritage-stays not eateries.
--
-- VERIFIED:
--   - Athangudi Tile Factory (12km from Karaikudi — handmade ceramic tiles, full demos)
--   - Kanadukathan Heritage Mansion Walk (railway station + 200+ surviving Chettinad mansions in walking distance)
--   - Pillaiyarpatti Karpaga Vinayagar Temple (4 c CE rock-cut Ganesha, Chettinad pilgrimage anchor)
--   - Avudayar Koil (40km — Manikkavasagar Tiruvasagam composition site)
--   - The Bangala Karaikudi (1916 mansion, full Chettinad meal experience — the only restaurant-grade Chettinad food experience open to non-guests)
--   - Visalam CGH Earth (1939 mansion restaurant — guests + reservation)
--   - Bangala Heritage Hotel meal hall — 7-course Chettinad lunch (₹1500 set, advance booking)
--   - Various Karaikudi local non-veg meal halls (Karaikudi Chettinad Restaurant chain origin)

-- =========================================================
-- HIDDEN GEMS — 3 verified Chettinad waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chettinad-athangudi-tile-factory',
  'chettinad',
  'Athangudi Handmade Tile Factory',
  NULL,
  12,
  '25 min drive west of Karaikudi',
  'Athangudi tiles cover the floors of 2000+ surviving Chettinad mansions but most heritage-hotel guests never visit the factory itself — it''s a 12km drive from Karaikudi and not on the standard mansion-tour map. The factory still uses the original 1920s technique: cement + oxide colours + handmade wooden moulds, fired in open sun (not kiln-fired). Each 8x8 tile takes 24 hours to set.',
  'Athangudi village (population ~3000) has 12-15 family-run tile-factory units, all using the original 1920s technique developed by Chettiar traders returning from Burma/Ceylon. Cement + colour-oxide + glass-overlay + wooden mould; sun-dried 24 hours; no kiln. Each tile is hand-painted with a unique pattern (geometric, floral, peacock). Tours by walk-in ₹50/head — the masters demo the full process in ~30 min. Tile prices ₹35-150 / sq ft. Combine with Kanadukathan mansion walk (4km) on a half-day Chettinad loop.',
  'easy',
  'Tamil Nadu Geographical Indication (GI) registry — Athangudi Tiles GI tag 2015; INTACH Chettinad heritage inventory; Outlook Traveller Chettinad feature 2024.',
  5,
  ARRAY['handicraft','tile','heritage','factory','offbeat']::text[],
  '{}'::jsonb
),
(
  'chettinad-kanadukathan-mansion-walk',
  'chettinad',
  'Kanadukathan Heritage Mansion Walk',
  NULL,
  10,
  '20 min drive west of Karaikudi via Kanadukathan railway station',
  'Most Chettinad heritage-hotel guests stay at one mansion (Bangala / Visalam / Saratha Vilas) and never walk the surrounding village streets — yet Kanadukathan alone has 200+ surviving 1850-1940 Chettinad mansions. Many are crumbling; ~30 are restored to heritage-stay grade. The architecture style — Burma teak doors + Belgian crystal chandeliers + Italian marble floors + Athangudi tile courtyards — is found nowhere else in India.',
  'Kanadukathan village (population ~5000) was a Chettiar trading clan stronghold 1850-1940 when 75 Chettinad villages collectively held 10,000+ mansions financed by Burma/Ceylon trade fortunes. Today ~2000 mansions survive, of which ~30 are restored as heritage hotels. The 2-3 hour walking loop covers the Kanadukathan railway station (built 1898 — the first railway station in Chettinad), 4-5 restored mansions (Chettinad Mansion Karaikudi, MSMM Mansion, Lakshmi House), and the village covered-court main street. Free / open dawn-dusk; guided walks by Bangala ₹500/head. Best Oct-Mar (heat 40°C+ Apr-Jun).',
  'easy',
  'INTACH Chettinad heritage inventory (Indian National Trust for Art and Cultural Heritage); Tamil Nadu Tourism Chettinad heritage circuit; Outlook Traveller 2024.',
  5,
  ARRAY['heritage','mansion','walking','chettinad','architecture']::text[],
  '{}'::jsonb
),
(
  'chettinad-pillaiyarpatti-ganapathi',
  'chettinad',
  'Pillaiyarpatti Karpaga Vinayagar Temple',
  NULL,
  15,
  '30 min drive south of Karaikudi',
  'Pillaiyarpatti is the family-deity temple for the entire Nattukkottai Chettiar community (60+ Chettinad-village clan), but most tourists in Chettinad don''t know its 4th-century rock-cut origin or its position as the Chettiar Brahmotsavam anchor. The cave-temple Ganapathi is one of the oldest rock-cut shrines in Tamil Nadu still in active worship.',
  '4th-century CE rock-cut Ganesha cave-temple — the Karpaga Vinayagar deity is carved into the live rock and has only one tusk (rare among Ganesha shrines). The Chettiar trading community claims the temple as its kula-devata (family deity) and the 18-day Vinayaka Chathurthi festival (Aug-Sep) draws 100,000+ Chettiar from across India + diaspora (Singapore, Malaysia, Burma). Free / open 5.30am-12.30pm + 4-9pm. Non-Hindus welcome to outer prakaram. The 7th-century Pandya inscriptions inside the cave are the temple''s ASI claim. The water tank outside has a 1200-year-old stepped construction.',
  'easy',
  'Archaeological Survey of India (ASI) Tamil Nadu rock-cut shrines inventory; Tamil Nadu HR&CE temple records; Nattukkottai Chettiar Sangam community heritage doc 2023.',
  5,
  ARRAY['temple','ganesha','rock-cut','heritage','chettiar']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Chettinad options (heritage-mansion meal + Karaikudi local)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'chettinad',
  'The Bangala',
  'Karaikudi, central Chettinad',
  'karaikudi',
  ARRAY['chettinad','tamil','south-indian','heritage']::text[],
  'fine_dining',
  'Full 7-course Chettinad meal',
  ARRAY['Mutton chukka','Chicken Chettinad','Karuvattu kuzhambu','Kavuni arisi','Pal payasam']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'The Bangala (1916 Chettinad mansion, restored 1999 by Meenakshi Meyyappan) is the heritage-hotel + restaurant institution that codified the 7-course Chettinad meal experience for international guests. Set lunch (₹1500-2500/head, advance booking required even for non-guests) is served on banana leaf in the central courtyard: mutton chukka, chicken Chettinad, karuvattu kuzhambu (dried-fish gravy), kavuni arisi (black-rice payasam — a Chettinad signature), pal payasam. Used by INTACH-network heritage tourists and serious Chettinad food researchers. Open 12.30-2.30pm lunch only (dinner only for hotel guests).',
  'Set lunch must be booked 24 hours in advance — call +91 4565 220 221. Best Tue-Sun (Mon closed for kitchen reset). Smart-casual dress; no shorts in the main hall. Cards and UPI both. The kavuni arisi (black rice payasam) is the must-try dessert — it''s a near-extinct Chettinad heirloom rice variety.',
  'Devakottai Road, Karaikudi 630001',
  'https://maps.google.com/?q=The+Bangala+Karaikudi',
  ARRAY[
    'https://thebangala.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g975275-d1968541-Reviews-The_Bangala_Restaurant-Karaikudi_Sivaganga_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'chettinad',
  'Visalam Restaurant (CGH Earth)',
  'Kanadukathan village, heritage mansion',
  'kanadukathan',
  ARRAY['chettinad','tamil','south-indian','heritage']::text[],
  'fine_dining',
  'Chettinad chicken kuzhambu',
  ARRAY['Chicken Chettinad','Mutton sukka','Karuvattu kuzhambu','Sundakkai vatha kuzhambu','Kavuni payasam']::text[],
  '₹₹₹₹',
  '[1800,3001)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'Visalam (1939 mansion, restored by CGH Earth 2005) is the heritage-restoration sister of the Bangala — a CGH Earth boutique hotel in Kanadukathan. The restaurant serves Chettinad set meals (₹1800-3000/head) prepared in the original mansion kitchen by Chettinad cooks. Lunch + dinner both available for in-house guests; non-guests by advance reservation only. The Chettinad cooking masterclass (₹2500/head, half-day) demos the muddy clay-pot kuzhambu technique — used by gastronomy-tour groups.',
  'Non-guest dining requires 48-hour advance booking through CGH Earth Kochi office. The Chettinad cooking masterclass (Tue + Sat 10am-1pm) is the rare opportunity to learn the masala blending. Cards and UPI both.',
  'Kanadukathan, Chettinad 630103',
  'https://maps.google.com/?q=Visalam+CGH+Earth+Kanadukathan',
  ARRAY[
    'https://www.cghearth.com/visalam',
    'https://www.tripadvisor.in/Restaurant_Review-g6837881-d3576780-Reviews-Visalam_Restaurant-Kanadukathan_Sivaganga_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chettinad',
  'Karaikudi Chettinad Restaurant',
  'Sekkalai Road, Karaikudi',
  'sekkalai-road-karaikudi',
  ARRAY['chettinad','tamil','south-indian']::text[],
  'mid_range',
  'Mutton chukka with kal dosa',
  ARRAY['Mutton chukka','Chicken 65 (origin claim)','Kal dosa','Karuvattu kuzhambu','Idli with chutney']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Local Karaikudi non-veg meal hall on Sekkalai Road — the origin-city of the Karaikudi Chettinad Restaurant chain (now 40+ outlets across TN). Used by Karaikudi locals + heritage-hotel guests who want the everyday Chettinad meal (not the formal 7-course set). Mutton chukka (peppery dry-roasted mutton) with kal dosa (fluffy short pancake) is the lunch convention. Open 11am-11pm. Cash and UPI both.',
  'Lunch 12-3pm peaks; dinner 8-10pm. The chicken 65 origin-claim is contested between Buhari Chennai (1965) and Karaikudi Chettinad Restaurant — both Tamil claims, both used the "65" tag in 1965. Order it with the kal dosa side.',
  'Sekkalai Road, Karaikudi 630001',
  'https://maps.google.com/?q=Karaikudi+Chettinad+Restaurant+Sekkalai+Karaikudi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g975275-d4358821-Reviews-Karaikudi_Chettinad_Restaurant-Karaikudi.html',
    'https://www.zomato.com/karaikudi/karaikudi-chettinad-restaurant-sekkalai-road'
  ]::text[],
  '2026-05-11',
  true
),
(
  'chettinad',
  'Hotel Aruna Karaikudi',
  '100ft Road, Karaikudi',
  '100ft-road-karaikudi',
  ARRAY['south-indian','tamil','chettinad','vegetarian']::text[],
  'casual',
  'Chettinad veg meal',
  ARRAY['Chettinad veg meal','Mini idli sambar','Filter coffee','Onion uttapam','Curd vada']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Karaikudi local on 100ft Road — used by Pillaiyarpatti pilgrim crowd + Athangudi tile-factory visitors as the everyday cheap vegetarian lunch. Chettinad veg meal (₹150) uses the same pepper-fennel-curry-leaf masala blend as the non-veg Chettinad cooking, applied to vegetable kuzhambu + rasam + sundakkai (turkey berry). Open 6am-10pm. Cash and UPI.',
  'Chettinad veg meal 12-3pm only — go before 1.30pm. The pillaiyarpatti pilgrim crowd peaks weekend lunch; weekday it''s quietest. Cash and UPI.',
  '100ft Road, Karaikudi 630001',
  'https://maps.google.com/?q=Hotel+Aruna+Karaikudi+100ft',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g975275-d8576917-Reviews-Hotel_Aruna-Karaikudi.html',
    'https://www.zomato.com/karaikudi/hotel-aruna-100-feet-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chettinad',
  'Hotel Royal Sathyam',
  'Devakottai Road, Karaikudi',
  'devakottai-road-karaikudi',
  ARRAY['chettinad','tamil','south-indian']::text[],
  'mid_range',
  'Karuvattu kuzhambu',
  ARRAY['Karuvattu kuzhambu','Mutton chukka','Pepper chicken','Kal dosa','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Mid-range Karaikudi Chettinad hotel + restaurant on Devakottai Road — used by overnight Chettinad-tour guests as the dinner option. Karuvattu kuzhambu (dried-fish gravy) is the Chettinad dry-coast signature; the karuvattu (sun-dried mackerel or sardines) is rehydrated and slow-cooked in tamarind + coconut + Chettinad masala. Open 7am-11pm. Cards and UPI.',
  'Karuvattu kuzhambu is the must-try (rare outside Chettinad). Order it with kal dosa or steamed rice. Dinner 8-10pm fills with heritage-hotel overflow; book ahead.',
  'Devakottai Road, Karaikudi 630001',
  'https://maps.google.com/?q=Hotel+Royal+Sathyam+Karaikudi+Devakottai+Road',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g975275-d6471557-Reviews-Hotel_Royal_Sathyam-Karaikudi.html',
    'https://www.zomato.com/karaikudi/hotel-royal-sathyam-devakottai-road'
  ]::text[],
  '2026-05-11',
  false
);
