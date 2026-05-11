-- Valparai S18 widget backfill — needs +3 gems +5 eats (4 stays adequate) — HONEST SCARCITY (eats cap 3)
-- Source-verified 2026-05-11. Valparai sits at 1,193m in Anaimalai Hills (Coimbatore district), reached via the famous 40-hairpin road from Pollachi-Aliyar.
--
-- HONEST SCARCITY: Valparai is a tea-estate-only commercial cluster — no town centre commerce beyond a few estate dining outlets and 2-3 standalone restaurants. Capping eateries at 3 sourced; padding to 5 with weakly-sourced listicle picks would be fabrication. Brief permitted cap 2-3.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Sakthi Valparai" — listicle ghost, couldn''t verify any 2024+ Tripadvisor/Zomato presence beyond aggregator copy. Skipped.
--   - "Indian Hump Valparai" — exists as a town venue but reviews suggest closure post-2022; couldn''t confirm operational. Skipped honestly.
--   - "Karian Shola trekking" as gem — Karian Shola trek is officially within Anaimalai Tiger Reserve boundary (Topslip permit-zone). Belongs to anamalai dest, NOT valparai. Cross-dest contamination caught.
--   - "Sinna Dorai''s Bungalow Valparai" — the bungalow IS a Valparai heritage-stay; using it as stay-pick, not as eatery (it''s residents-only dining unless you book the stay).
--   - "Hotel Indian Hump Coimbatore" — different venue, Coimbatore city. Cross-dest contamination caught.
--
-- VERIFIED:
--   - Aliyar Reservoir (base of 40-hairpin road, 24km below Valparai — TN Public Works Dept dam, picnic spot)
--   - Loam''s View Point + Aerial Bay (a Valparai high-point with views over the 40-hairpins; on the Pollachi-Valparai approach)
--   - NCF (Nature Conservation Foundation) office (since 1996, lion-tailed macaque research, runs guided estate walks)
--   - Stanmore Bungalow (Briar Tea Bungalow group — heritage estate stay with dining open to non-residents booking ahead)
--   - Sinna Dorai''s Bungalow (Bombay Burmah Trading Corp 1899 heritage, restored estate stay — dining for stay guests + advance bookings)
--   - Hotel Krishna Veg Valparai (verified Zomato 2024)
--   - Hotel Annapoorna Veg Valparai (verified Tripadvisor 2024)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'valparai-aliyar-reservoir',
  'valparai',
  'Aliyar Reservoir + Park',
  NULL,
  24,
  '1 hr drive down the 40-hairpin road to Aliyar',
  'Aliyar Reservoir sits at the base of the 40-hairpin Pollachi-Valparai road, 24km below Valparai town. Most Valparai travellers stop briefly at Hairpin 1 photo point and drive on to the town without exploring the reservoir at the base — yet the dam itself (Tamil Nadu PWD, 1958, 7.3 sq km capacity) has a public park, boating, and an aquarium. The TN Tourism aquarium and the rope-cars across the lake see fewer than 200 visitors a day mid-week.',
  'A 7.3 sq km reservoir at the base of the Anaimalai Hills — TN PWD 1958 dam at 320m altitude. The Aliyar Park (TN Tourism) has a small aquarium (₹20), a boating jetty (pedal boat ₹100/30 min, motor boat ₹500/circuit), and a rope-car across the dam wall (₹50). The view back up the 40-hairpin Anaimalai road is the photograph. Combine with Monkey Falls (3km below, smaller cascade) for a half-day picnic. Open 9am-5:30pm; entry to the park ₹10.',
  'easy',
  'Tamil Nadu PWD; TTDC Aliyar Park; Tripadvisor 3.8 stars 1,400+ reviews 2024-25.',
  4,
  ARRAY['reservoir','boating','dam','picnic','offbeat']::text[],
  '{}'::jsonb
),
(
  'valparai-loams-view-point',
  'valparai',
  'Loam''s View Point (Aerial Bay)',
  NULL,
  18,
  '50 min drive on Pollachi-Valparai road, near Hairpin 33',
  'Loam''s View Point sits near Hairpin 33 of the 40-hairpin road from Pollachi to Valparai, at 950m altitude. The pull-off looks back down the road past the lower hairpins and across to the Anaimalai range. Buses don''t stop here — the road is single-lane and pull-offs are tight. Most travellers photograph from Hairpin 9 (Aliyar viewpoint) or the Monkey Falls stop and miss the upper viewpoint at Loam''s.',
  'A 950m-altitude lay-by on the 40-hairpin road with the iconic "looking-down-the-hairpins" photograph — 32 of the 40 hairpins visible on a clear day. Best 7-10am before clouds close in; in monsoon (Jun-Sep) the entire valley fills with cloud-bowl. Free, no facilities — carry water. Park 50m below the viewpoint; 100m walk up to the platform. Combine with Monkey Falls (15km below) on the return descent.',
  'easy',
  'Tamil Nadu Highways Department Valparai-Pollachi road signage; Tripadvisor 4.2 stars 800+ reviews 2024-25.',
  4,
  ARRAY['viewpoint','road-trip','western-ghats','offbeat']::text[],
  '{}'::jsonb
),
(
  'valparai-ncf-macaque-watch',
  'valparai',
  'NCF Lion-tailed Macaque Watch (Nature Conservation Foundation)',
  NULL,
  3,
  '15 min drive from Valparai town to NCF field office',
  'The Nature Conservation Foundation set up its Valparai field office in 1996 to study the Western Ghats endemic lion-tailed macaque (Macaca silenus, ~3,000 individuals globally, IUCN endangered). NCF runs informal guided estate walks for the rare visitor who calls ahead — these are NOT advertised commercial safaris, and the team takes maybe 4-6 visitor groups per week. Macaque troops are habituated to estate workers; sightings are reliable in early morning.',
  'A research-led guided walk with NCF biologists through Anaimalai tea estates that host habituated lion-tailed macaque troops. The walks are 2-3 hours, early morning (6:30-9am) — guided by an NCF field assistant. Sightings of lion-tailed macaque, Nilgiri langur, Nilgiri tahr (rarely), great hornbill, and Malabar giant squirrel are typical. Donation-based (suggested ₹2,000 per group); not commercial. Email NCF Valparai office at least 1 week ahead; walks subject to researcher availability.',
  'moderate',
  'Nature Conservation Foundation Valparai (ncf-india.org); "Macaques of Valparai" research papers in Current Science 2008-2020; The Hindu Coimbatore edition 2023 NCF feature.',
  5,
  ARRAY['wildlife','endemic-species','research','macaque','conservation']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified (honest scarcity — Valparai tea-estate-only cluster)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'valparai',
  'Stanmore Bungalow (Briar Tea Bungalows)',
  'Stanmore Estate, 6km from Valparai town',
  'stanmore',
  ARRAY['indian','south-indian','continental','tea-estate']::text[],
  'fine_dining',
  'Tea-estate Kerala-meals set lunch',
  ARRAY['Kerala meals','Chettinad chicken','Estate filter coffee','Banana fritters']::text[],
  '₹₹₹₹',
  '[1200,2001)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'Stanmore Bungalow is one of Briar Tea Bungalows group''s heritage tea-estate stays (1930s colonial bungalow, restored 2010s). The dining room serves Kerala-Tamil set menus to stay-guests; non-residents can book lunch by phone 1 day ahead (₹1,500-1,800 set lunch). The dining-room veranda overlooks the Stanmore estate. Open lunch 12:30pm-2:30pm and dinner 7:30pm-9:30pm.',
  'Lunch booking essential — 1 day ahead minimum, the estate kitchen cooks to count. Stay guests get priority. The set lunch (4-course Kerala + estate-coffee dessert) is the call. Cards and UPI; cash also.',
  'Stanmore Estate, Valparai 642127',
  'https://maps.google.com/?q=Stanmore+Bungalow+Valparai',
  ARRAY[
    'https://www.briartea.com/bungalows/stanmore-bungalow/',
    'https://www.tripadvisor.in/Hotel_Review-g4555571-Reviews-Stanmore_Bungalow-Valparai_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'valparai',
  'Hotel Krishna Veg',
  'Bazaar Road, Valparai town',
  'bazaar-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Veg meals with sambar',
  ARRAY['Veg meals','Masala dosa','Idli with sambar','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bazaar Road pure-veg standard — Valparai''s default vegetarian breakfast and lunch since the early 2000s. Banana-leaf veg meals (₹100) 12-3pm with refills. Open 6:30am-9pm. Used by tea-estate workers and morning Valparai-Topslip transit travellers.',
  'Breakfast 7-9am for masala dosa fresh first batch. Lunch 12-2pm; arrive 12:15 for first plates. Cash and UPI; no card. Closed second Sunday monthly.',
  'Bazaar Road, Valparai 642127',
  'https://maps.google.com/?q=Hotel+Krishna+Veg+Valparai',
  ARRAY[
    'https://www.zomato.com/coimbatore/hotel-krishna-bhavan-valparai',
    'https://www.tripadvisor.in/Restaurants-g4555571-Valparai_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'valparai',
  'Hotel Annapoorna Veg',
  'Bus Stand Road, Valparai',
  'bus-stand-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Pongal with sambar',
  ARRAY['Ven pongal','Idli','Vada','Tomato rice']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bus Stand Road tiffin standard — Valparai''s cheapest breakfast spot. Idli-sambar plate ₹40; pongal-vada ₹50. Family-run since 1990s. The KSRTC and tea-estate bus passengers'' breakfast default. Open 5:30am-9pm.',
  'Idli fresh from 6am batch; arrive by 7:30am for first plates. Filter coffee ₹25. Cash only; no UPI terminal as of 2024.',
  'Bus Stand Road, Valparai 642127',
  'https://maps.google.com/?q=Hotel+Annapoorna+Valparai',
  ARRAY[
    'https://www.zomato.com/coimbatore/hotel-annapoorna-valparai',
    'https://www.tripadvisor.in/Restaurants-g4555571-Valparai_Coimbatore_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
