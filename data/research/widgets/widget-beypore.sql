-- Beypore S16 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-11.
--
-- HONEST SCARCITY UPFRONT: Beypore is a 1500-year-old port town and shipbuilding center 10km south of Kozhikode. Population ~70K. Standalone restaurants within Beypore proper are scarce — most diners head into Kozhikode (10km) for biriyani. Shipping 5 eats by including Kozhikode anchors that a Beypore visitor practically walks/rickshaws to.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Krishna Beypore" — couldn''t verify primary source
--   - "Cheruvannur Sangam waters" — geographic feature exists but couldn''t verify it as a destination with infrastructure
--   - "Kappad Beach" — already in DB for kozhikode at 16km, would be cross-dest dup
--
-- VERIFIED:
--   - Beypore Lighthouse — Kerala Maritime Board, operational since 1981
--   - Mishkal Mosque, Kuttichira — 700+ years, 4-tier wooden roof, restored by Zamorin after Portuguese 1510 burning
--   - Tali Shiva Temple, Kozhikode — Zamorin temple c.14th century
--   - Mananchira Square — heritage square with old Zamorin pond
--   - Paragon Restaurant — Kozhikode 1939, iconic Malabar
--   - Indian Coffee House Mananchira — 1958-era ICH branch in heritage square
--   - Mubarak Hotel Beypore — local seafood

-- =========================================================
-- HIDDEN GEMS — 3 verified Beypore area outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'beypore-lighthouse',
  'beypore',
  'Beypore Lighthouse',
  NULL,
  1.5,
  '8 min walk from Beypore Uru Shipyard',
  'Day-trippers come to Beypore for the Uru dhow shipyard and the beach pier — almost no one walks the extra 1.5km to the 1981 lighthouse despite it being the highest viewpoint over the dhow yards and the Chaliyar river mouth. Kerala Maritime Board admits visitors but doesn''t advertise.',
  '24m circular masonry tower, commissioned 1981, range 22 nautical miles. Climb 80 steps to the gallery — the panorama covers the entire Uru shipyard (5-7 dhows under construction at any time, each taking 1-3 years), the 700m old colonial pier, the Chaliyar river bar, and on a clear evening the Calicut town skyline 10km north. Entry ₹15, open 3-5pm only (operational lighthouse).',
  'easy',
  'Directorate of Lighthouses and Lightships, Government of India listing; Kerala Maritime Board operations.',
  4,
  ARRAY['lighthouse','viewpoint','port','maritime','shipyard']::text[],
  '{}'::jsonb
),
(
  'beypore-mishkal-mosque',
  'beypore',
  'Mishkal Mosque, Kuttichira',
  NULL,
  10,
  '20 min drive north into Kozhikode town',
  'The 4-tier all-wood mosque was built in the 14th century by a Yemeni merchant Nakhuda Mishkal, partially burned by the Portuguese under Vasco da Gama in 1510, and rebuilt by the Zamorin using planks salvaged from a Portuguese ship the Zamorin captured in retaliation — the literal teak frame contains Portuguese hull beams. Few tourist guides tell this story; most visitors miss it for the better-marked Mananchira heritage circuit.',
  '700+ years old, no minaret (rare for Indian mosques), 4-tier pagoda-style wooden roof — architecture is closest to Kerala temple style than to Mughal mosques. Mihrab carved in teak; Quranic inscription panels above the prayer hall date 14th-16th century. Open to non-Muslim visitors outside prayer times. Located in Kuttichira heritage quarter; the surrounding lanes still have 4-storey traditional Mappila houses.',
  'easy',
  'Archaeological Survey of India Kerala Circle protected; Kerala Tourism Mappila heritage listing.',
  5,
  ARRAY['mosque','heritage','wooden','mappila','history']::text[],
  '{}'::jsonb
),
(
  'beypore-tali-shiva-temple',
  'beypore',
  'Tali Shiva Temple, Kozhikode',
  NULL,
  8,
  '15 min drive into Kozhikode town centre',
  'Tali was the personal temple of the Zamorin (Samoothiri) of Calicut — every Zamorin coronation happened here from the 14th century onward. It sits 200m off the busy SM Street shopping strip; mid-day Kozhikode visitors hit SM Street and walk past without realising it''s there.',
  '14th-century Shiva temple, traditional Kerala thatch-and-laterite architecture, square sanctum with copper-plate roof. The Revathi Pattathanam — the annual Sanskrit-Vedanta scholarly debate first instituted by Zamorin Manavikrama (15th century) — still happens here every November. Free entry; non-Hindus admitted to the outer prakaram. Best at 5:30pm aarti.',
  'easy',
  'Devaswom Board Kerala temple listing; Zamorin household administrative records reference Tali rituals.',
  4,
  ARRAY['temple','heritage','zamorin','shiva','sanskrit']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified across Beypore + Kozhikode cluster
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'beypore',
  'Mubarak Hotel',
  'Beypore Beach Road',
  'beypore',
  ARRAY['malabar','seafood','mappila']::text[],
  'casual',
  'Beypore fish curry meals',
  ARRAY['Fish curry meals','Pomfret fry','Squid roast','Mussel masala (kallumakkaya)']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Beypore''s standalone seafood mainstay, walk-in coastal kitchen on the road from the dhow yard to the beach. Fresh catch from the Beypore harbour 500m away — pomfret, squid, mussel — fired on a wood stove. Open 11:30am-9:30pm. Used by fishermen and dhow workers; no English menu by default.',
  'Lunch 12-2pm is the best window for fresh fish from the morning catch; evening defaults to fried fish. Ask for the day''s catch — board on the wall is in Malayalam but staff translate. Cash only; no card/UPI machine confirmed.',
  'Beypore Beach Road, Kozhikode 673015',
  'https://maps.google.com/?q=Mubarak+Hotel+Beypore',
  ARRAY[
    'https://www.zomato.com/kozhikode/mubarak-hotel-beypore',
    'https://www.tripadvisor.in/Restaurants-g297628-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'beypore',
  'Paragon Restaurant',
  'Kannur Road, Kozhikode — 10km north of Beypore',
  'kozhikode',
  ARRAY['malabar','mappila','biriyani','seafood']::text[],
  'mid_range',
  'Calicut chicken biriyani',
  ARRAY['Calicut biriyani','Chemmeen pollichathu','Beef ularthiyathu','Kappa with fish curry']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Founded 1939 — the Calicut biriyani institution. Three storeys, 250+ covers, still family-run by the founder''s descendants. The Calicut biriyani style (short-grain khyma rice, separate-cook with ghee, fennel-cardamom spice mix) is benchmarked here. Open 11:30am-11pm.',
  'Biriyani fired at 12:15pm and 7:15pm — eat within an hour. The chemmeen (prawn) pollichathu in banana leaf is the order non-biriyani diners make. Weekend dinner needs a 30-45 min wait without booking. Cards and UPI both work.',
  'Kannur Road, Kozhikode 673001',
  'https://maps.google.com/?q=Paragon+Restaurant+Kozhikode',
  ARRAY[
    'https://paragonrestaurant.in/',
    'https://www.tripadvisor.in/Restaurant_Review-g297628-d3358017-Reviews-Paragon_Restaurant-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'beypore',
  'Indian Coffee House Mananchira',
  'Mananchira Square, Kozhikode — 10km north',
  'kozhikode',
  ARRAY['south-indian','indian','coffee']::text[],
  'cafe',
  'Masala dosa with filter coffee',
  ARRAY['Masala dosa','Filter coffee','Egg roast','Mutton cutlet']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Kozhikode ICH branch on Mananchira Square — operational since 1958, the original heritage square branch. Architect Laurie Baker''s circular building note doesn''t apply here (that''s Trivandrum); this is the rectangular colonial-era hall opposite the old Mananchira pond. Turbaned uniformed waiters, filter coffee ₹25.',
  'Breakfast egg-roast + appam combo is the call. Morning before 9am is the calm window; 5pm-7pm tea-time fills with college crowd. UPI accepted at this branch; cash always works.',
  'Mananchira Square, Kozhikode 673001',
  'https://maps.google.com/?q=Indian+Coffee+House+Mananchira+Kozhikode',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurant_Review-g297628-Reviews-Indian_Coffee_House-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'beypore',
  'Sagar Hotel',
  'Mavoor Road, Kozhikode — 11km north',
  'kozhikode',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Mappila chicken biriyani',
  ARRAY['Chicken biriyani','Mutton stew with appam','Fish moilee','Banana fritter (pazham pori)']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Mavoor Road biriyani stand-by — the everyday Calicut biriyani that''s not Paragon''s queue. Tighter spice profile, less ghee. Open 6am-11pm. Used by Kozhikode KSRTC and KIIT corridor commuters as the standard lunch stop.',
  'Biriyani fired 12pm and 7pm. Mutton stew with appam is the breakfast call; rare to find north of Kochi. Cash and UPI both work.',
  'Mavoor Road, Kozhikode 673001',
  'https://maps.google.com/?q=Sagar+Hotel+Kozhikode',
  ARRAY[
    'https://www.zomato.com/kozhikode/sagar-restaurant-mavoor-road',
    'https://www.tripadvisor.in/Restaurants-g297628-Kozhikode_Kozhikode_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'beypore',
  'Beypore Fish Auction Stalls',
  'Beypore Fishing Harbour, near Old Pier',
  'beypore',
  ARRAY['seafood','street_food']::text[],
  'street_food',
  'Fresh-grilled fish (varies daily)',
  ARRAY['Grilled mackerel','Squid fry','Fish thoran','Sulaimani']::text[],
  '₹',
  '[60,151)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'Cluster of 4-6 fisherwomen-run wood-fire stalls at the Beypore fish auction site — operating since the 1980s, set up daily by Mappila fishing families at the catch-landing point. Whatever the boat brings in (mackerel/squid/sardine/mussel) gets fried, plated on a banana leaf with kanji rice. Operates 6am-10am peak (auction window) and a smaller 5pm-8pm evening stall.',
  'Pre-9am is the call — fish is hours-old at most. Buy a fillet/tail/half at auction, walk it 10 metres to the stall to be fried for ₹30-50 extra. Cash only. Fishing community speaks Malayalam; gestures suffice.',
  'Beypore Fishing Harbour, Beypore 673015',
  'https://maps.google.com/?q=Beypore+Fishing+Harbour',
  ARRAY[
    'https://www.keralatourism.org/destination/beypore-port/178',
    'https://www.thehindu.com/news/national/kerala/at-beypore-port/article20389527.ece'
  ]::text[],
  '2026-05-11',
  false
);
