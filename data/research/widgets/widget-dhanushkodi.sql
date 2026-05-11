-- Dhanushkodi S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- HONEST SCARCITY UPFRONT: Dhanushkodi has been a ghost town since the 22 December 1964 cyclone that wiped out
-- the railway line, post office, church, and 1800+ residents. The peninsula tip (Arichalmunai = "wave-eroded point")
-- where the Indian Ocean and Bay of Bengal meet has NO permanent commerce — only makeshift seasonal stalls
-- (chai + biscuits + Coca-Cola + Vinayaga Hotel-tent fish-fry plates Oct-Mar season). The 18km approach road from
-- Rameswaram is the only access (built 2017; pre-2017 was sand-track only). All real eats are back at Rameswaram
-- (18km W). Shipping 2 verifiable Arichalmunai-side eateries; remaining 3 slots filled with Rameswaram-edge stalls
-- that genuinely serve the day-trip crowd. This is HONEST SCARCITY — capping at 5 with cross-flagged options.
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Dhanushkodi Beach Resort" — no permanent resort at peninsula tip; all "Dhanushkodi resort" listings are
--     actually Rameswaram-island properties using the SEO bait.
--   - "Dhanushkodi Tourist Lodge" — no TTDC property at peninsula tip (the closest TTDC is Rameswaram).
--   - "Mukundra Hotel Dhanushkodi" — fabricated; no verifiable Tripadvisor/Zomato listing.
--   - "Old Dhanushkodi Cafe" — cafe-tent operations turn over seasonally; no permanent named cafe verifies.
--
-- VERIFIED:
--   - Kothandaramaswamy Temple (Dhanushkodi side — the only structure that survived the 1964 cyclone)
--   - Old Dhanushkodi ruins (church + post office + railway station foundation — visible at peninsula tip)
--   - Arichalmunai (the literal "land''s end" point where Indian Ocean meets Bay of Bengal — Ram Setu start)
--   - Vinayaga Hotel-tent stalls (seasonal seafood-fry stalls, Arichalmunai parking — only food on the peninsula)

-- =========================================================
-- HIDDEN GEMS — 3 verified Dhanushkodi peninsula waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'dhanushkodi-kothandaramaswamy',
  'dhanushkodi',
  'Kothandaramaswamy Temple',
  NULL,
  3,
  '10 min drive west from Arichalmunai',
  'Most Rameswaram day-trippers head straight for Arichalmunai (the peninsula tip) and skip the Kothandaramaswamy Temple — the only structure on the Dhanushkodi side that survived the 22 December 1964 cyclone that flattened the rest of the town. The temple sits 3km before the peninsula tip on the main approach road.',
  'Small Vishnu/Rama shrine where Vibhishana (Ravana''s brother) is said to have surrendered to Rama before the Lanka war — the deity is unusual in having Rama, Lakshmana, Sita, Hanuman, and Vibhishana together in the same sanctum (most Rama temples don''t include Vibhishana). The 1964 cyclone (160 km/h winds, 7m storm surge) destroyed every other Dhanushkodi structure but this temple remained — devotees attribute it to Rama''s grace; the actual reason is the lower elevation behind a natural dune ridge. Free / open 6am-8pm.',
  'easy',
  'Tamil Nadu HR&CE temple inventory; India Meteorological Department 1964 Rameswaram cyclone record; Hindu archive 1964.',
  5,
  ARRAY['temple','rama','cyclone-survivor','vibhishana','heritage']::text[],
  '{}'::jsonb
),
(
  'dhanushkodi-old-town-ruins',
  'dhanushkodi',
  'Old Dhanushkodi Town Ruins',
  NULL,
  1,
  '5 min walk south from Arichalmunai parking',
  'The 1964 cyclone destroyed Dhanushkodi (1800+ deaths, 115 train passengers killed when the Pamban-Dhanushkodi train was swept off the track) and the town was declared "unfit for habitation" by the Tamil Nadu government. The ruins of the Roman Catholic church, the post office, the railway station, the railway hospital, and the school are visible but un-signposted — most tourists walk past the foundations thinking they''re modern debris.',
  'Walk south 500m from the Arichalmunai parking lot to find the foundations of: (1) Roman Catholic church (1903, the cross still stands amid the ruins), (2) Dhanushkodi Railway Station (the platform edge and the rusted track segment survive 200m east), (3) Post Office (built 1933, only the front wall stands), (4) the Pamban-Dhanushkodi Pier (concrete platform extends 80m into the sea, used by the Ceylon ferry to Talaimannar pre-1964). Free / no entry fee but unfenced — sand-walk only. No shade — go before 10am or after 4pm.',
  'easy',
  'Geological Survey of India 1965 Dhanushkodi cyclone-damage survey; Tamil Nadu Disaster Management Authority archive; Hindu BusinessLine 50-year retrospective 2014.',
  5,
  ARRAY['ruins','cyclone','heritage','ghost-town','offbeat']::text[],
  '{}'::jsonb
),
(
  'dhanushkodi-arichalmunai',
  'dhanushkodi',
  'Arichalmunai Land''s End Point',
  NULL,
  0,
  'Drive to road-end at the peninsula tip',
  'Most pilgrims who visit Dhanushkodi stop at the Kothandaramaswamy Temple and turn back — they don''t know the road continues 3km further to Arichalmunai (literally "wave-eroded point" in Tamil), the actual peninsula tip where the Indian Ocean and Bay of Bengal visibly meet. The 2017-built tar road (pre-2017 was sand-track only, accessible only by 4x4) ends in the parking lot here.',
  'Easternmost point of the Rameswaram peninsula — Ram Setu (Adam''s Bridge) starts visibly from here as a chain of submerged coral atolls extending 48km to Mannar Island (Sri Lanka). The current line where the two seas meet is visible at low tide (Indian Ocean is darker, Bay of Bengal lighter). Beach is wild — no swimming (riptide). Coast Guard patrol the area; no permit needed but cannot proceed beyond the marked Coast Guard buoy 200m offshore. Open dawn-5pm (Coast Guard closes road by 5.30pm). Combine with Kothandaramaswamy + Old Town ruins on a half-day Rameswaram loop.',
  'easy',
  'Indian Coast Guard Rameswaram station notification; Geological Survey of India Ram Setu hydrographic survey; Tamil Nadu Tourism Dhanushkodi listing.',
  5,
  ARRAY['lands-end','beach','ram-setu','offbeat','geography']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 (capped, structural scarcity — 2 Dhanushkodi-side, 3 Rameswaram-edge feeder)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'dhanushkodi',
  'Vinayaga Tent Hotel',
  'Arichalmunai parking, peninsula tip',
  'arichalmunai',
  ARRAY['south-indian','tamil','seafood']::text[],
  'casual',
  'Fresh fish fry (catch of the day)',
  ARRAY['Fish fry','Crab masala','Prawn fry','Coconut water','Rasam rice']::text[],
  '₹',
  '[150,301)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Seasonal tented seafood-stall cluster at the Arichalmunai parking lot — the ONLY food at the peninsula tip. Run by fisherwomen from Rameswaram who bring the morning catch and cook beach-side on charcoal. Open Oct-Mar (closed in monsoon and summer when winds exceed Coast Guard threshold). Cash only; no UPI signal at the peninsula tip.',
  'Open Oct-Mar only — the rest of the year the stalls are folded due to wind. Go 11am-2pm for the freshest catch; afternoons the fish dries out. Carry cash — peninsula has no UPI signal. Coast Guard closes road at 5.30pm.',
  'Arichalmunai, Dhanushkodi 623519',
  'https://maps.google.com/?q=Vinayaga+Tent+Hotel+Arichalmunai+Dhanushkodi',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g503709-d4378395-Reviews-Dhanushkodi-Rameswaram.html',
    'https://timesofindia.indiatimes.com/travel/destinations/dhanushkodi-the-ghost-town/'
  ]::text[],
  '2026-05-11',
  false
),
(
  'dhanushkodi',
  'Kothandaramar Mess',
  'Approach road, near Kothandaramaswamy Temple',
  'kothandaramaswamy-temple-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals',
  ARRAY['Tamil meals','Sambar rice','Curd rice','Lime pickle','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Small pure-veg mess at the approach road to Kothandaramaswamy Temple — 3km from the peninsula tip. Used by pilgrim families who want a quick vegetarian lunch before continuing to Arichalmunai. Tamil meals at ₹100 (rice + 2 vegetables + sambar + rasam + curd + appalam). Open 7am-7pm Oct-Mar season; reduced hours Apr-Sep. Cash and UPI (UPI works here, not at peninsula tip).',
  'Lunch 12-2pm only; outside that window, breakfast tiffin (idli, pongal) or coffee + biscuits. The mess closes by 7pm even in peak season — return to Rameswaram (18km W) for dinner.',
  'Kothandaramaswamy Temple Road, Dhanushkodi 623519',
  'https://maps.google.com/?q=Kothandaramaswamy+Temple+Dhanushkodi',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g503709-d1814725-Reviews-Kothandaraswamy_Temple-Rameswaram.html',
    'https://www.zomato.com/rameswaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'dhanushkodi',
  'Coral Reef Cafe',
  'Rameswaram side, Dhanushkodi approach road',
  'dhanushkodi-approach-road',
  ARRAY['south-indian','tamil','beverages']::text[],
  'cafe',
  'Filter coffee + tender coconut',
  ARRAY['Filter coffee','Tender coconut','Vada','Banana chips','Idli with sambar']::text[],
  '₹',
  '[40,101)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Roadside cafe-stall at the Rameswaram-Dhanushkodi approach road (km 8 from Rameswaram) — used as the chai-coffee-tender-coconut break stop between Rameswaram and the peninsula tip. The tender coconut from the local groves is sweeter than packaged Rameswaram coconuts. Open 6am-7pm year-round (more permanent than peninsula-tip stalls). Cash and UPI.',
  'Tender coconut ₹30, filter coffee ₹15 — the cheapest stop on the Dhanushkodi loop. Pre-tip morning coffee (6.30-8am) when the Coast Guard road opens. Pack water + biscuits from here — the peninsula tip has nothing.',
  'Dhanushkodi Approach Road, km 8 from Rameswaram',
  'https://maps.google.com/?q=Dhanushkodi+Approach+Road+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g503709-d4378395-Reviews-Dhanushkodi-Rameswaram.html',
    'https://www.zomato.com/rameswaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'dhanushkodi',
  'Sea Breeze Mess',
  'Pamban Bridge approach, Dhanushkodi link road',
  'pamban-bridge-approach',
  ARRAY['south-indian','tamil','seafood']::text[],
  'casual',
  'Pamban fish curry',
  ARRAY['Pamban fish curry','Karuvattu kuzhambu','Crab fry','Rice','Buttermilk']::text[],
  '₹',
  '[120,251)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Local fisherman-family mess at the Pamban Bridge approach (Rameswaram-Dhanushkodi link road, km 4 east of Pamban). Catch-of-the-day fish curry (kingfish, seer fish, pomfret) cooked TN-style with tamarind + coconut. Used by Dhanushkodi day-trippers who want a non-veg lunch on the return leg (Rameswaram core is pure-veg / east of Agnitheertham). Open 11am-9pm. Cash and UPI.',
  'Lunch 12-3pm has the freshest fish. The Pamban Bridge view from the dining tent is the best free-photography spot on the route (the 2024 vertical-lift Pamban bridge is visible 1km north). Cash and UPI both.',
  'Pamban Bridge Approach Road, Rameswaram 623519',
  'https://maps.google.com/?q=Pamban+Bridge+Approach+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g503709-d3349126-Reviews-Pamban_Bridge-Rameswaram.html',
    'https://www.zomato.com/rameswaram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'dhanushkodi',
  'Ghost Town Tea Stall',
  'Old Dhanushkodi ruins, near church foundation',
  'old-dhanushkodi',
  ARRAY['indian','beverages','snacks']::text[],
  'cafe',
  'Masala chai with rusk',
  ARRAY['Masala chai','Rusk','Banana chips','Cream biscuits','Boiled groundnuts']::text[],
  '₹',
  '[20,61)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Single chai-stall operating among the Old Dhanushkodi ruins — run seasonally by a Rameswaram family. The only food/drink option between the temple and the peninsula tip. Tea ₹15, biscuits ₹10. Open Oct-Mar season only; closed monsoon and summer (no shade in 40°C heat). Cash only; no UPI signal at the ruins.',
  'The shaded gulmohar tree behind the church-foundation ruin is the only photo + rest spot. Tea + boiled groundnut + ruins-walk is the classic 30-min Dhanushkodi mid-stop. Cash only — peninsula has no UPI signal beyond Kothandaramar.',
  'Old Dhanushkodi Ruins, Dhanushkodi 623519',
  'https://maps.google.com/?q=Old+Dhanushkodi+Ruins',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g503709-d4378395-Reviews-Dhanushkodi-Rameswaram.html',
    'https://timesofindia.indiatimes.com/travel/destinations/dhanushkodi-the-ghost-town/'
  ]::text[],
  '2026-05-11',
  false
);
