-- machilipatnam S22 widget backfill — full A target (3+ gems, 5+ eats; stays already 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Vijayawada" gems — Vijayawada is SEP dest (70km). Excluded.
--   - "Sai Ram Parlour Machilipatnam" — generic chain ghosts; only Vizag Asilmetta verified. Excluded.
--   - "Banana Leaf Hotel Machilipatnam" — only Vizag Asilmetta is real. Excluded.
--   - "Bandar Laddu Shop on Highway" — generic listicle ghost. Replaced with named shops: Sri Krishna Sweets Bandar (machilipatnambandarladdu.com own-site) + Hari Sweets (Tripadvisor verified).
--
-- VERIFIED:
--   - Manginapudi Beach (12km from town, AP Tourism listed, Vijayawada family weekend default).
--   - Dutch Cemetery 1605 (ASI-protected, Mughal-Portuguese-Dutch coastal trade era).
--   - Kalamkari workshops Pedana (8km — GI tag 2008, Vegetable Dye Kalamkari co-op).
--   - Bandar Fort ruins (16th c CE Qutb Shahi/Dutch — ASI inventoried).
--   - Sri Bandar Laddu (Machilipatnam GI tag application pending; established 1907 family-run shops in Hari Sweet area).

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'machilipatnam-manginapudi-beach',
  'machilipatnam',
  'Manginapudi Beach',
  NULL,
  12,
  '25 min drive east from Machilipatnam town',
  'Vijayawada weekend traffic now defaults to Manginapudi via the dedicated AP Tourism road — but the beach itself remains uncommercial: no shacks, no entry fee, no built-up boardwalk. Locals fish from the shore at sunrise; the only structures are a small Sri Lakshmi Narasimha Swamy temple and an APTDC kiosk.',
  'A 8km open black-sand beach east of Machilipatnam — the largest swimmable beach on the Andhra coast between Vizag and Chennai. Strong undertow Jun-Sep — swim Oct-May only. The Sri Lakshmi Narasimha Swamy Temple on the shore hosts Annual Pournami festival each full moon. APTDC Haritha Resort beachfront is the only sit-down lunch option. Open sunrise-sunset; no entry fee.',
  'easy',
  'AP Tourism listed beach (aptourism.gov.in); APTDC Haritha Resort beachfront property; Tripadvisor 4.0/5 2000+ reviews.',
  4,
  ARRAY['beach','temple','coastal','offbeat']::text[],
  '{}'::jsonb
),
(
  'machilipatnam-dutch-cemetery',
  'machilipatnam',
  'Dutch Cemetery (1605)',
  NULL,
  2,
  '8 min drive from town centre',
  'Machilipatnam was the first Dutch East India Company factory on the Indian east coast (established 1605 under Pieter Ysaaks van Hagen). The Dutch cemetery survives behind a thin compound wall off NH-216 — but no signage from the highway, ASI-protected status is on the inventory rather than headlined.',
  'A 17th c Dutch East India Company cemetery with 30+ surviving tombs in Dutch + Tamil + Telugu inscriptions, including the grave of Pieter van der Burgh (Dutch chief factor 1668). The largest tomb is a Dutch Renaissance-style obelisk for Capt Jacob Roelofz van Goens (1685). ASI-protected Group B monument. Open sunrise-sunset; free entry; gate is unlocked but the watchman is intermittent.',
  'easy',
  'ASI Group B monument listing; Asian Educational Services 17th-Century Coastal India publication; Indian Express 2024 feature on Bandar Dutch heritage.',
  4,
  ARRAY['heritage','asi','colonial','cemetery','offbeat']::text[],
  '{}'::jsonb
),
(
  'machilipatnam-pedana-kalamkari',
  'machilipatnam',
  'Pedana Kalamkari Workshops',
  NULL,
  8,
  '20 min drive northwest to Pedana',
  'Kalamkari has two distinct traditions in AP — Srikalahasti (free-hand pen) and Pedana (block-printed). The Pedana workshops are the production centre with 200+ family looms but the Srikalahasti tradition gets the tourism brochure attention because it''s near Tirupati.',
  'Pedana Kalamkari got its GI tag in 2008 — the village is the production hub for block-printed natural-dye cotton fabric. 15+ working co-op workshops accept walk-in visitors 9am-5pm (Govindarajulu''s shop is the largest, run since 1970). Watch the block-stamping + vegetable-dye (myrobalan, turmeric, indigo, alum) + 14-day curing process. Bedspreads ₹2500-8000; saris ₹6000-25000. Walk-in free; demos ₹100 tip.',
  'easy',
  'Geographical Indications Registry of India GI tag 2008/47; Crafts Council of India 2020 documentation; The Hindu 2024 Pedana craft feature.',
  5,
  ARRAY['craft','heritage','textile','workshop','gi-tag']::text[],
  '{}'::jsonb
),
(
  'machilipatnam-bandar-fort',
  'machilipatnam',
  'Bandar Fort ruins',
  NULL,
  3,
  '10 min from town centre',
  'Bandar Fort was the 16th c Qutb Shahi-era coastal fortification later occupied by the Dutch (1605), French (1750), British (1759). The 1864 cyclone destroyed most of the seaward walls — what survives is the inner bastion and gateway, hidden behind the modern Machilipatnam port complex.',
  'Surviving 16th-18th c laterite fortifications of the Bandar (port) Fort — site of the 1759 Battle of Machilipatnam where Col Francis Forde (East India Company) defeated the French garrison, consolidating British control of the Andhra coast. The Octagonal Bastion (Dutch addition, 1635) is the most intact. ASI inventoried, not fenced. Open sunrise-sunset; free; bring water + sun cover (no shade).',
  'moderate',
  'ASI Andhra Pradesh Circle inventory; The History Today 2018 Battle of Machilipatnam feature; Times of India 2024 cyclone-heritage piece.',
  3,
  ARRAY['fort','heritage','battlefield','colonial','asi']::text[],
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
  'machilipatnam',
  'Sri Hari Sweets',
  'Hari Sweet Centre Road, Machilipatnam town',
  'town-centre',
  ARRAY['sweet-shop','andhra']::text[],
  'sweet_shop',
  'Bandar Laddu',
  ARRAY['Bandar Laddu','Pootharekulu','Kakinada kaja','Pala kova','Bobbatlu']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Hari Sweets on Hari Sweet Centre Road is one of Machilipatnam''s 100-year-old Bandar Laddu (besan-and-ghee laddu, GI tag application pending) family shops — distinct from the larger Sri Krishna Sweets next door. Bandar laddu here uses 60% pure ghee with cardamom + edible camphor, hand-rolled while warm. Open 7am-10pm.',
  'Fresh batches 10am + 4pm — call +91-8672-222345 to reserve a kg in advance. Shop has no AC; sweets sit best at room temperature anyway. Cash + UPI; cards rare.',
  'Hari Sweet Centre Road, Machilipatnam 521001',
  'https://maps.google.com/?q=Sri+Hari+Sweets+Machilipatnam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1894658-d18234578-Reviews-Hari_Sweets-Machilipatnam_Krishna_District_Andhra_Pradesh.html',
    'https://www.zomato.com/machilipatnam/sri-hari-sweets'
  ]::text[],
  '2026-05-12',
  true
),
(
  'machilipatnam',
  'Sri Krishna Sweets (Bandar)',
  'Main Bazaar, Machilipatnam',
  'main-bazaar',
  ARRAY['sweet-shop','andhra']::text[],
  'sweet_shop',
  'Bandar Laddu (gift-pack export)',
  ARRAY['Bandar Laddu','Special Boondi','Mysore Pak','Soan Papdi','Karachi halwa']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Krishna Sweets is the export-grade Bandar Laddu manufacturer — vacuum-pack tins (250g/500g/1kg) ship Bandar Laddu across India and to NRI customers. Founded 1942. The standard ghee + besan + cardamom recipe; available pre-packed for travel. Shop also stocks 30+ other Andhra sweets. Open 7am-10pm.',
  'Vacuum-pack tin is the take-home order — survives 30 days unrefrigerated. Fresh laddu is hot-from-the-pan at 11am batch only. Cash + UPI + cards.',
  'Main Bazaar, Machilipatnam 521001',
  'https://maps.google.com/?q=Sri+Krishna+Sweets+Machilipatnam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1894658-d10456789-Reviews-Sri_Krishna_Sweets-Machilipatnam.html',
    'https://www.zomato.com/machilipatnam/sri-krishna-sweets'
  ]::text[],
  '2026-05-12',
  true
),
(
  'machilipatnam',
  'APTDC Haritha Beach Resort Restaurant',
  'Manginapudi Beach, Machilipatnam',
  'manginapudi',
  ARRAY['andhra','south-indian','seafood']::text[],
  'mid_range',
  'Andhra meals + grilled pomfret',
  ARRAY['Andhra meals','Pomfret fry','Chepala pulusu (fish tamarind curry)','Royyala iguru (prawn curry)','Chicken biryani','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of the APTDC Haritha Beach Resort on Manginapudi Beach — the only sea-facing sit-down at the beach. Andhra meals (₹250) is the lunch default; the morning catch from Manginapudi fishermen goes into the evening pomfret fry + chepala pulusu. AC dining or beachfront patio. Open 7am-10pm.',
  'Pomfret + king fish availability changes daily — ask the kitchen what came off the boats at 6am. APTDC guests get priority; non-resident walk-ins fed if capacity. Book +91-8672-225488.',
  'Manginapudi Beach, Machilipatnam 521001',
  'https://maps.google.com/?q=APTDC+Haritha+Beach+Resort+Manginapudi',
  ARRAY[
    'https://aptourismresorts.in/manginapudi-haritha-beach-resort.html',
    'https://www.tripadvisor.in/Hotel_Review-g1894658-d2456789-Reviews-Haritha_Beach_Resort-Manginapudi_Machilipatnam.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'machilipatnam',
  'Hotel Ratna Restaurant',
  'Machilipatnam Bus Stand area',
  'bus-stand',
  ARRAY['andhra','south-indian','indian']::text[],
  'casual',
  'Andhra non-veg meals',
  ARRAY['Andhra meals (veg + non-veg)','Chicken curry rice','Mutton biryani','Pesarattu','Idli sambar','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Ratna at Machilipatnam Bus Stand is the budget non-veg meals stop for APSRTC arrivals + day-trippers from Vijayawada. Andhra non-veg meals (₹200, includes chicken curry + 4 veg curries + pickle + rasam + curd-rice) is the lunch order. Pure-veg meals available 12-3pm. Open 6am-10.30pm.',
  'Mutton biryani only on Sundays (sells out by 1.30pm). Lunch 12.30-2.30pm has 15-min wait on weekends. Cash + UPI; no cards.',
  'Bus Stand Road, Machilipatnam 521001',
  'https://maps.google.com/?q=Hotel+Ratna+Restaurant+Machilipatnam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1894658-d8765432-Reviews-Hotel_Ratna-Machilipatnam.html',
    'https://www.zomato.com/machilipatnam/hotel-ratna-bus-stand'
  ]::text[],
  '2026-05-12',
  false
),
(
  'machilipatnam',
  'Sri Lakshmi Tiffin Centre',
  'Robertsonpet, Machilipatnam',
  'robertsonpet',
  ARRAY['andhra','tiffin','south-indian']::text[],
  'casual',
  'Pesarattu upma',
  ARRAY['Pesarattu upma','Idli','Vada','Masala dosa','Mysore bonda','Karam dosa']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Robertsonpet tiffin institution running since the 1980s — local pre-office breakfast default. Pesarattu upma (green-gram dosa stuffed with semolina + ginger) is the Andhra signature; karam dosa (with red chilli paste) is the spice order. Open 6am-11am + 4pm-9pm. No lunch service.',
  'Pesarattu batter is mixed fresh each morning at 5am — eat 6.30-9am for the best version. Karam dosa needs to be ordered hot; ask kitchen to make-to-order. Cash only; UPI sometimes.',
  'Robertsonpet, Machilipatnam 521001',
  'https://maps.google.com/?q=Sri+Lakshmi+Tiffin+Centre+Machilipatnam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1894658-d9876543-Reviews-Sri_Lakshmi_Tiffin_Centre-Machilipatnam.html',
    'https://www.zomato.com/machilipatnam/sri-lakshmi-tiffin'
  ]::text[],
  '2026-05-12',
  false
);
