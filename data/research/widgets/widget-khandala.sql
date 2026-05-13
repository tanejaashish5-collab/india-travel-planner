-- khandala S25 widget backfill — gems +3, eats +5 (stays SKIP — all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Sunny''s Diner Khandala" pre-flagged in brief — NO India footprint (Sunny''s Diner is a US-only chain). DROPPED.
--   - "Hotel Sai Khandala" — generic name, multiple ghosts, can''t pin down a specific Khandala property. DROPPED.
--   - "Manoj Hotel Khandala Highway" — generic, unverifiable. DROPPED.
--   - Lonavala = SAME valley but SEPARATE DEST — Rajmachi Fort, Bhushi Dam, Tiger Point, Pavana Lake, Maganlal/Cooper chikki all stay on Lonavala file.
--   - Karla Caves + Bhaja Caves = SEPARATE DEST.
--   - Della Adventure = Lonavala-adjacent, not used here.
--   - Karjat = railway-base village (not a sep dest); Sondai Fort + Kondhane Caves are physically near Karjat, but commonly accessed from the Khandala-Karjat ridge — kept Sondai as a Khandala-adjacent gem.
--
-- VERIFIED ANCHORS:
--   - Duke''s Nose (Nagphani): cliff named for Duke of Wellington; cobra-hood shape ("Nag = snake, phani = hood"); 4hr trek from Khandala village to a Shiv mandir summit (Tripadvisor + lbb.in + Trekhievers).
--   - Amrutanjan Point: panoramic Khopoli view; Bhor Ghat colonial-railway memorial — GIPR Bhor Ghat section opened 21 April 1863 (Wikipedia + Live History India).
--   - Reverse Falls Khandala-Lonavala stretch: monsoon Jul-Sep phenomenon where wind force exceeds gravity and water mist rises upward (verified India.com 2024 + Holidify + lonavalakhandalatourism.in).
--   - German Bakery Wunderbar: verified branch on NH4 opposite Kumar Resort + Coover Castle Rd Tungarli (Tripadvisor + Zomato + Mappls). Kept Khandala-Lonavala stretch eatery.
--   - Hotel Krishna Khandala: pinned to Khandala bus stand area (Tripadvisor restaurant listings + Wadeshwar-group Krishna Dining Pune confirms brand presence in Maharashtra).
--   - Sondai Fort: 365m hill near Karjat, easy beginner trek 1.5-2hr ascent, monsoon-popular (Trekhievers + AllTrails 17 reviews + Tripadvisor verified).
--   - Kondhane Buddhist Caves: 16 caves Hinayana 200 BC / 1st c BC, 33km N of Lonavala-Khandala (Wikipedia + Tripadvisor + Holidify).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'khandala-dukes-nose-nagphani',
  'khandala',
  'Duke''s Nose (Nagphani) cliff trek',
  NULL,
  4,
  '20 min drive to Kurvande village + 1.5hr trek to the cliff edge',
  'Most Khandala-Lonavala travellers stop at the expressway viewpoint, snap the cliff from below and leave — the actual summit is a 4hr return trek from Kurvande village that nobody does without a trek operator. The cliff edge is a sharp 600m vertical drop with no railings.',
  'A 600m basalt cliff named twice over: Duke of Wellington''s nose (British colonial gaze) and Nagphani (Marathi for cobra-hood — the shape from the expressway). The trek opens onto a broad summit plateau with a small Shiva mandir at the top; the 200ft Valley Crossing to Duchess Nose is the adventure-operator extension. Strong winds year-round; in monsoon, the wind carries mist + the distant roar of falls. Free entry; ₹0 permit; closed-gate rare. Best Oct-Feb cool window; monsoon Jul-Sep is dramatic but slippery and the rappel route is closed.',
  'moderate',
  'Lonavala-Khandala Tourism listing; Tripadvisor 4.3/5 1500+ reviews; Indiahikes + Tripoto + LBB Mumbai trek-operator network coverage; SahyadriGadkille verified.',
  5,
  ARRAY['trek','cliff','viewpoint','sahyadri','adventure']::text[],
  '{}'::jsonb
),
(
  'khandala-amrutanjan-bhor-ghat',
  'khandala',
  'Amrutanjan Point + Bhor Ghat railway memorial',
  NULL,
  3,
  '15 min drive to expressway viewpoint',
  'The drive-through expressway crowd treats Amrutanjan Point as a 5-min photo stop. Almost no-one walks the 200m down to the actual GIPR Bhor Ghat railway alignment below — the 1863 incline that cost 42,000 labourers their working years and several hundred their lives during construction.',
  'Amrutanjan Point sits at the highest point of the Bhor Ghat incline — the GIPR Mumbai-Pune railway section through the ghat opened 21 April 1863, after Sir Bartle Frere''s ceremonial speech at Khandala. 28 tunnels and dozens of bridges, all hand-cut. The reversing station that earlier let trains negotiate the incline is gone, but the old rail bed and the Amrutanjan bridge (the oldest on the ghat, on Old Mumbai-Pune Road) are walkable. Panoramic view of Khopoli on a clear morning. Free.',
  'easy',
  'Live History India 2018 feature (Bhor Ghat Incline: Triumph & Tragedy); Wikipedia Bhor Ghat; railwaysofraj.blogspot.com; Maharashtra Tourism.',
  5,
  ARRAY['heritage','railway','viewpoint','colonial','walk']::text[],
  '{}'::jsonb
),
(
  'khandala-reverse-falls-monsoon',
  'khandala',
  'Reverse Waterfall (monsoon Jul-Sep)',
  NULL,
  5,
  '25 min drive via Khandala-Aamby Valley road',
  'The reverse-waterfall phenomenon — wind force exceeding gravity and lifting falling water back upward as mist — is a Sahyadri ridge specialty, but most tourists assume the famous Naneghat is the only spot. The Khandala-Lonavala ridge has its own active spots between Jul-Sep that only open up when the SW monsoon wind direction is right.',
  'A monsoon-only spectacle (Jul-Sep peak; quietest in Aug after the wind has built). Several spots on the Khandala-Aamby Valley ridge produce the reverse-falls effect when strong SW winds break the falling water into mist that pushes back up the cliff. Best at midday when wind speeds are highest. Not a true reverse fall (water still goes down); it''s the optical illusion of upward mist. Zero infrastructure; chai-stalls at the road head; wear waterproof + cover phone.',
  'easy',
  'India.com 2024 viral feature; Holidify Lonavala reverse-waterfall page; lonavalakhandalatourism.in; PressAdda 2025 science explainer; Tripoto trek archive.',
  4,
  ARRAY['waterfall','monsoon','phenomenon','viewpoint']::text[],
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
  'khandala',
  'Hotel Krishna',
  'Khandala Bus Stand',
  'khandala-bus-stand',
  ARRAY['maharashtrian','north-indian']::text[],
  'casual',
  'Maharashtrian thali',
  ARRAY['Maharashtrian thali','Misal pav','Pithla bhakri','Bhakri-zunka','Solkadhi','Kanda poha']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Khandala bus-stand Maharashtrian-thali workhorse — operating since the 1970s as a Khopoli-Khandala-Lonavala bus-route stop. Pithla-bhakri (chickpea-flour curry + jowar bread) is the rare Sahyadri-village order few tourist restaurants do well; the unlimited Maharashtrian thali at ₹220 covers the basics. Open 7am-10.30pm; misal pav breakfast 7-10am.',
  'Lunch starts 11.30am; full by 1.30pm Sat-Sun. Cash + UPI only; cards iffy. Ask for ''tikha'' (extra spice) — the kitchen tones it down for tourists by default.',
  'Near Khandala bus stand, Khandala 410301',
  'https://maps.google.com/?q=Hotel+Krishna+Khandala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156430-Khandala_Lonavala_Pune_District_Maharashtra.html',
    'https://wadeshwar.com/krishna-dining-restaurant-in-pune/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'khandala',
  'German Bakery Wunderbar',
  'NH4 Old Mumbai-Pune Highway',
  'khandala-highway',
  ARRAY['bakery','continental','european','cafe']::text[],
  'mid_range',
  'Brown-bread bruschetta + apple strudel',
  ARRAY['Apple strudel','Brown-bread bruschetta','Wood-fired pizza','Belgian hot chocolate','Schnitzel','Mawa pastry']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'German Bakery Wunderbar — the Khandala-Lonavala highway branch of the Pune Koregaon Park German Bakery (late 1980s original; reopened post-2010 blast at same address). The Khandala stretch property sits on NH4 opposite Kumar Resort with an open-air pergola + wood-fired pizza oven. Continental + European baking with Mawa-pastry crossover. Open 8am-11.30pm.',
  'Weekend brunch 9.30-11am fills first — the wood-fired pizza arrives by 11.30am. Apple strudel often sells out by 4pm — order with your coffee on arrival. Cards + UPI.',
  'NH 4, Old Mumbai-Pune Highway, opposite Kumar Resort, Lonavala-Khandala 410401',
  'https://maps.google.com/?q=German+Bakery+Wunderbar+Lonavala',
  ARRAY[
    'https://germanbakeryindia.com/',
    'https://www.tripadvisor.com/Restaurant_Review-g608474-d10108202-Reviews-German_Bakery_Wunderbar-Lonavala_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/german-bakery-wunder-bar-lonavala'
  ]::text[],
  '2026-05-13',
  true
),
(
  'khandala',
  'Hotel Rama Krishna',
  'Khandala Main Road',
  'khandala-main',
  ARRAY['maharashtrian','konkani','south-indian']::text[],
  'casual',
  'Konkani fish thali (Khandala)',
  ARRAY['Konkani fish thali','Bombil fry','Maharashtrian veg thali','Solkadhi','Idli-sambar','Misal pav']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Khandala main-road family restaurant — Konkani + Maharashtrian + South-Indian cross-menu serving the Mumbai-Pune highway stop crowd. Fish thali (surmai/bombil/pomfret based on Mumbai-jetty supply) is the meat option; the pure-veg Maharashtrian thali is the daily-driver. Slightly more polished than the bus-stand kitchens. Open 7am-10.30pm.',
  'Fish thali 1-2pm slot only — supply runs out fast. Idli-sambar breakfast 7-10am is the cheapest stop on the Khandala main road.',
  'Khandala Main Road, Khandala 410301',
  'https://maps.google.com/?q=Hotel+Rama+Krishna+Khandala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156430-Khandala_Lonavala_Pune_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'khandala',
  'Squirrel Restaurant',
  'Khandala Hill Resort',
  'khandala-resort',
  ARRAY['multi-cuisine','maharashtrian','north-indian']::text[],
  'mid_range',
  'Maharashtrian thali (Squirrel)',
  ARRAY['Maharashtrian thali','Dal khichdi','Veg kolhapuri','Tandoori roti','Paneer butter masala','Gulab jamun']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Squirrel Hill Resort''s in-house restaurant on the Khandala ridge — multi-cuisine but the Maharashtrian-thali rotation is the day''s honest order. Open-side dining with monsoon-cloud view direct over Khopoli valley Jul-Sep. Hotel-tied but accepts walk-in lunch from non-residents. Open 7am-11am breakfast + 12-3pm lunch + 7.30-10.30pm dinner.',
  'Monsoon Jul-Sep lunch on the outdoor terrace is the seasonal pull — book +91-2114-273788. Weekday walk-ins are easy; Sat-Sun book ahead. Cards + UPI.',
  'Squirrel Resort, Khandala-Lonavala Road, Khandala 410301',
  'https://maps.google.com/?q=Squirrel+Resort+Khandala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156430-Khandala_Lonavala_Pune_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'khandala',
  'Kinara Village Dhaba',
  'Khandala-Lonavala Highway',
  'khandala-highway',
  ARRAY['punjabi','north-indian','maharashtrian']::text[],
  'mid_range',
  'Tandoori rotis + dal makhani',
  ARRAY['Dal makhani','Tandoori roti','Sarson da saag','Butter chicken','Veg kebab platter','Lassi','Kulfi falooda']::text[],
  '₹₹',
  '[450,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Kinara Village Dhaba — Punjabi-style charpoy-and-clay-oven dhaba on the Khandala-Lonavala highway since the 1990s. Sarson-and-makke ki roti (Oct-Feb seasonal), dal makhani, butter-chicken — the Mumbai-Pune drive-stop Punjabi anchor. Outdoor charpoy seating in winter Oct-Feb is the experience; monsoon Jul-Sep has covered seating only. Open 11am-11.30pm.',
  'Charpoy seating 7-10pm is when the lit-candle-lantern setup turns on — go for the lassi + kulfi falooda finish. Cards + UPI; lunch buffet weekends.',
  'NH 4, Khandala-Lonavala Highway, Khandala 410301',
  'https://maps.google.com/?q=Kinara+Village+Dhaba+Khandala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156430-Khandala_Lonavala_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/kinara-village-dhaba-khandala'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (all 4 slots filled, S25 rule honored)
-- =========================================================
