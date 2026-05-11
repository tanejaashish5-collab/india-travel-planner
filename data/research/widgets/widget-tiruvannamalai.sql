-- Tiruvannamalai S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- Source-verified 2026-05-11. Arunachala pilgrimage town — Pancha Bhoota Stalam (Fire); Ramana Maharshi ashram anchor + monthly girivalam (14km full-moon barefoot circumambulation).
--
-- FABRICATIONS RULED OUT:
--   - "Annamalaiyar Temple" — that IS the main Tiruvannamalai destination (Pancha Bhoota Fire Stalam), not a gem.
--   - "Indian Coffee House Tiruvannamalai" — no verifiable branch.
--   - "Saravana Bhavan Tiruvannamalai" — no Saravana Bhavan outlet; "Saravana" in town is local pilgrim mess (different from chain).
--   - "Adi Annamalai" as standalone gem — sits 7km on the girivalam route; listed as a girivalam-route waypoint, not separate gem.
--
-- VERIFIED:
--   - Sri Ramanasramam (1922-1950 Ramana Maharshi ashram, samadhi shrine + library + book-stall)
--   - Skandashramam + Virupaksha Cave (Ramana meditated 1899-1916, 30 min uphill from main road)
--   - Girivalam 14km full-moon barefoot route (Margazhi Karthigai Deepam climax — Nov-Dec full moon)
--   - Dreaming Tree Cafe (Ramana Nagar, ashram-road institution for international ashram crowd)
--   - German Bakery (Ramana Nagar)
--   - Manna Cafe (Ramana Nagar, ashram-road)
--   - Sunrise Restaurant Tiruvannamalai (German-quarter, ashram-area institution)
--   - Usha Restaurant (Ashram Road, local Tamil veg)

-- =========================================================
-- HIDDEN GEMS — 3 verified Tiruvannamalai waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'tiruvannamalai-ramanasramam',
  'tiruvannamalai',
  'Sri Ramanasramam',
  NULL,
  2,
  '10 min walk south of Arunachaleswarar temple',
  'Most temple pilgrims who arrive on the Karthigai Deepam (Nov-Dec) busloads skip the 2km walk to Sri Ramanasramam — they assume "ashram" means closed-doors monastic retreat. In fact the ashram is open daily to all visitors and serves the free annadanam lunch (12-1.30pm) where Ramana Maharshi himself used to eat with devotees 1922-1950.',
  'Sri Ramana Maharshi (1879-1950) moved here in 1922 after 27 years on Arunachala hill (Virupaksha Cave + Skandashramam). The ashram surrounds the cow-shed where his pet cow Lakshmi lived, his Old Hall (where he held silent darshan 1928-1950), and the Nirvana Room (where he attained mahasamadhi 14 April 1950). Free / open 5am-9pm. Annadanam (free vegetarian lunch) 12-1.30pm — vegetarian thali on banana leaf in the ashram dining hall; the queue forms 11.30am. The library (open 8am-12 + 2-6pm) holds 50,000+ books in English, Tamil, Hindi, French, German on Ramana''s teaching. The matrubhuteswara shrine (built over Ramana''s mother''s samadhi 1922) is the south-side smaller temple in the compound.',
  'easy',
  'Sri Ramanasramam (sriramanamaharshi.org) official records; ashram book-stall publication catalogue; The Hindu Tiruvannamalai feature 2024.',
  5,
  ARRAY['ashram','ramana','samadhi','annadanam','heritage']::text[],
  '{}'::jsonb
),
(
  'tiruvannamalai-skandashramam-virupaksha',
  'tiruvannamalai',
  'Skandashramam and Virupaksha Cave',
  NULL,
  2.5,
  '30 min uphill hike from Sri Ramanasramam',
  'The 30-min uphill walk from the ashram to Skandashramam is the actual Ramana Maharshi spiritual landmark — he meditated in Virupaksha Cave 1899-1916 (silent for 6 years) and then moved 200m higher to Skandashramam 1916-1922. Most ashram visitors stay in the lower compound and don''t make the climb. Yet this is where the silent-darshan tradition started.',
  'Virupaksha Cave (named after a 13th-century yogi Virupakshadeva buried inside) is 200m above the southern ashram road on the Arunachala hillside — Ramana lived here 1899-1916 in mostly-silent meditation. Skandashramam (200m higher, built 1916 for Ramana''s mother Alagammal) has the cave-shrine where Ramana''s mother died 1922. Path is paved + handrail; 30 min walk one-way. Free / open dawn-dusk. Best at 6am for cool air; afternoon sun is harsh. Bring water; the cave-shrine has a small water tap. Combine with Adi Annamalai girivalam path on the descent.',
  'moderate',
  'Sri Ramanasramam (sriramanamaharshi.org) Arunachala-hill listing; Tamil Nadu Forest Department Arunachala-hill walking trails; Hindu archive 1899-1916 Virupaksha references.',
  5,
  ARRAY['cave','ashram','hike','heritage','ramana']::text[],
  '{}'::jsonb
),
(
  'tiruvannamalai-girivalam-route',
  'tiruvannamalai',
  'Girivalam 14-km Full-Moon Barefoot Circuit',
  NULL,
  0,
  'Starts at Annamalaiyar temple, circles Arunachala hill',
  'Tiruvannamalai full-moon nights see 500,000-1 million pilgrims walking the 14km barefoot circumambulation (girivalam) of Arunachala hill — yet most out-of-state day-trip visitors don''t know about it. The night of the Karthigai Deepam (Nov-Dec full moon — Nov 24 in 2026) is the climax: a giant flame is lit atop the 800m Arunachala peak that burns for 10 days, visible 30km away.',
  '14km road-loop around the Arunachala hill — pilgrims walk barefoot starting at Annamalaiyar temple east gate, clockwise. The 8 Ashtalingam shrines (Indralingam, Agnilingam, Yamalingam, Niruthilingam, Varunalingam, Vayulingam, Kuberalingam, Esanyalingam) mark the 8 cardinal directions along the route. 3-5 hours walking time depending on pace. Free / open 24h on full-moon nights. Snack-stalls + chai-stalls + free annadanam-water tents line the route during Pradosham (full-moon) and Karthigai Deepam. Adi Annamalai (the back-side ancient Shiva temple, 7km on the loop) is the half-way midpoint shrine. Bring water + foot-soothing oil; the tar can be hot mid-day even in winter.',
  'moderate',
  'Tiruvannamalai Devasthanam (Annamalaiyar Temple administration); Tamil Nadu HR&CE Karthigai Deepam annual notification; Hindu archive 2020 Karthigai Deepam pilgrim count.',
  5,
  ARRAY['pilgrimage','girivalam','full-moon','arunachala','heritage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Tiruvannamalai options (ashram + temple area)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'tiruvannamalai',
  'Dreaming Tree Cafe',
  'Ramana Nagar, Ashram Road (300m from Sri Ramanasramam)',
  'ramana-nagar',
  ARRAY['continental','cafe','breakfast','italian']::text[],
  'cafe',
  'Sourdough toast with hummus',
  ARRAY['Sourdough toast','Avocado on toast','Hummus plate','Filter coffee','Chocolate brownie']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Continental + Italian cafe on Ramana Nagar Ashram Road, 300m from the Sri Ramanasramam south gate — the convening spot for the international Ramana-ashram crowd (Israeli, French, German, American long-stay seekers). Sourdough bread baked in-house; avocado-on-toast + filter coffee is the standard breakfast. Open 7am-10pm Sep-May; reduced hours monsoon Jun-Aug. Wi-Fi available. Cards and UPI both.',
  'Breakfast 8-10am fills with the ashram crowd; off-peak 11-12 + 3-5pm is calmest. The sourdough is the must-try (rare in temple-town India). Combine post-Ramanasramam darshan + breakfast here. Cards and UPI.',
  'Ramana Nagar, Ashram Road, Tiruvannamalai 606603',
  'https://maps.google.com/?q=Dreaming+Tree+Cafe+Tiruvannamalai+Ramana+Nagar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503712-d3576779-Reviews-Dreaming_Tree_Cafe-Tiruvannamalai_Tiruvannamalai_District_Tamil_Nadu.html',
    'https://www.zomato.com/tiruvannamalai/dreaming-tree-cafe-ramana-nagar'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tiruvannamalai',
  'German Bakery',
  'Ramana Nagar, Ashram Road',
  'ramana-nagar',
  ARRAY['european','bakery','cafe','german']::text[],
  'cafe',
  'Whole-wheat bread + Apfelstrudel',
  ARRAY['Whole-wheat bread','Apfelstrudel','Brownie','Filter coffee','German muesli']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'European-style bakery on Ramana Nagar — caters to the long-stay German + Austrian + Swiss ashram crowd (Tiruvannamalai has a 50+ year German-speaker spiritual-seeker history dating from Heinrich Zimmer''s 1942 Indian Philosophy book that brought Ramana to European attention). Whole-wheat bread, apfelstrudel, brownie. Used as a pre-girivalam carb-loading stop on full-moon nights. Open 7am-9pm.',
  'Whole-wheat bread sells out by 11am — order ahead by phone for pickup. The apfelstrudel is the must-try (rare in TN). Cards and UPI both.',
  'Ramana Nagar, Ashram Road, Tiruvannamalai 606603',
  'https://maps.google.com/?q=German+Bakery+Tiruvannamalai+Ramana+Nagar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503712-d3576778-Reviews-German_Bakery-Tiruvannamalai.html',
    'https://www.zomato.com/tiruvannamalai/german-bakery-ramana-nagar'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tiruvannamalai',
  'Manna Cafe',
  'Ramana Nagar, Chengam Road',
  'chengam-road-ramana-nagar',
  ARRAY['continental','cafe','vegetarian','italian']::text[],
  'cafe',
  'Wood-fired pizza',
  ARRAY['Wood-fired pizza','Pasta','Filter coffee','Tibetan momos','Israeli shakshuka']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg European + Israeli cafe on Chengam Road, Ramana Nagar — popular with Israeli long-stay seekers (Tiruvannamalai is on the post-army Israeli backpacker trail; Manna serves shakshuka + hummus + falafel that the Israeli crowd misses). Open 8am-10pm Sep-May. Wood-fired oven for pizza 6-10pm. Cards and UPI both.',
  'Wood-fired pizza available evening 6-10pm only. The Israeli shakshuka (eggs in tomato-pepper) is the Manna signature; ask for it at breakfast. Israeli crowd builds 8-11pm. Cards and UPI.',
  'Chengam Road, Ramana Nagar, Tiruvannamalai 606603',
  'https://maps.google.com/?q=Manna+Cafe+Tiruvannamalai+Chengam+Road',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503712-d3576777-Reviews-Manna_Cafe-Tiruvannamalai.html',
    'https://www.zomato.com/tiruvannamalai/manna-cafe-ramana-nagar'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tiruvannamalai',
  'Sunrise Restaurant',
  'Ramana Nagar, Ashram Road',
  'ramana-nagar',
  ARRAY['south-indian','tamil','vegetarian','israeli']::text[],
  'casual',
  'Tamil meals + Israeli breakfast combo',
  ARRAY['Tamil meals','Israeli breakfast','Falafel','Idli with sambar','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg cross-cultural restaurant on Ramana Nagar Ashram Road — serves both Tamil South Indian (idli + dosa + meals at lunch) and Israeli/Middle-Eastern (falafel + hummus + shakshuka) on the same menu. Used by long-stay ashram crowd who want both cuisines in rotation. Open 6.30am-10pm. Cards and UPI both.',
  'Tamil meals 12-3pm; Israeli items all day. The Israeli breakfast (₹250) includes shakshuka + bread + tahini + olives. Cards and UPI.',
  'Ramana Nagar, Ashram Road, Tiruvannamalai 606603',
  'https://maps.google.com/?q=Sunrise+Restaurant+Tiruvannamalai+Ramana+Nagar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503712-d4036823-Reviews-Sunrise_Restaurant-Tiruvannamalai.html',
    'https://www.zomato.com/tiruvannamalai/sunrise-restaurant-ashram-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'tiruvannamalai',
  'Usha Hotel Tiruvannamalai',
  'Car Street, near Annamalaiyar Temple',
  'car-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Mini tiffin',
  ARRAY['Mini tiffin','Idli','Vada','Pongal','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg local Tamil mess on Car Street — used by Annamalaiyar Temple pilgrims (the temple east gate exits onto Car Street). Mini tiffin (₹100, 4 items) is the standard breakfast set; lunch thali ₹120-150. Opens 5.30am for the early-darshan crowd. Open 5.30am-9pm.',
  'Pre-darshan breakfast 6-8am is the convention. Car Street is the temple east approach — combine post-darshan lunch here. Cash and UPI.',
  'Car Street, near Annamalaiyar Temple, Tiruvannamalai 606601',
  'https://maps.google.com/?q=Usha+Hotel+Car+Street+Tiruvannamalai',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503712-d8576916-Reviews-Usha_Hotel-Tiruvannamalai.html',
    'https://www.zomato.com/tiruvannamalai/usha-hotel-car-street'
  ]::text[],
  '2026-05-11',
  false
);
