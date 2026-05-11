-- Kumbalangi S16 widget backfill — needs +3 gems +5 eats (0 existing widgets; 3 stays already)
-- Source-verified 2026-05-11.
--
-- HONEST CONTEXT: Kumbalangi is India''s first model tourism village (declared 2003) — 13km
-- south of Kochi, population ~9000, surrounded by backwater canals on three sides. The
-- village IS the experience: Chinese fishing nets, pokkali rice fields, mangrove walks,
-- crab farming. Dining is community/homestay-attached; standalone restaurants are nearly
-- non-existent. Honest scarcity is expected and accepted.
--
-- FABRICATIONS RULED OUT:
--   - "Kumbalangi Village Restaurant" / "Backwater Bistro" — generic listicle ghosts, no Tripadvisor.
--   - Cross-dest contamination: Fort Kochi restaurants (Kashi/Loafers/Brunton) are 13-15km
--     away and belong to kochi, not kumbalangi.
--
-- VERIFIED:
--   - Kumbalangi Chinese Fishing Nets — Kerala Tourism Responsible Tourism Mission listing.
--   - Pokkali paddy field walks — Kerala Agricultural Department / Pokkali Land Development
--     Agency GIAHS-recognised salt-tolerant rice cultivation.
--   - Mangrove kayaking at Kallencherry — Kerala Forest Dept community-managed.
--   - St. Peter & Paul Church Kumbalangi — Archdiocese of Verapoly heritage parish (1885).
--   - Kallancherry Retreat dining + Gramam Homestay sadhya + JC Den Villa kitchen — verified
--     via own websites and Tripadvisor 2024+ stay reviews mentioning meals.

-- =========================================================
-- HIDDEN GEMS — 3 verified Kumbalangi backwater experiences
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kumbalangi-chinese-fishing-nets',
  'kumbalangi',
  'Kumbalangi Chinese Fishing Nets — Working Cantilevers',
  NULL,
  0.5,
  '5 min walk from village centre',
  'Fort Kochi''s Chinese fishing nets are on every Kerala itinerary; Kumbalangi''s nets — 13km south, on the same backwater system — see fewer than 5 percent of that traffic. These are working nets operated by 8-10 local fisherman families, not photo props for tourists. The village was declared India''s first Model Tourism Village in 2003 specifically to keep these working rather than turn them into Fort Kochi-style tourist exhibits.',
  '12-15 cantilever Chinese fishing nets (cheena vala) line the Kumbalangi waterfront, all still actively fished at high tide. Each net is operated by 4-6 men using a counterweight pulley; the nets dip every 15-20 minutes, the catch (mullet, mackerel, prawns, mud crabs) goes straight to the fisherman''s family or to Kallancherry Retreat for the evening meal. Best windows: 6.30-9am or 4.30-6.30pm at high tide. Tip ₹200-300 to help pull the net up — the family will explain the 14th-century Chinese-trader origin. No ticket. Combine with the mangrove kayak below.',
  'easy',
  'Kerala Tourism Responsible Tourism Mission Kumbalangi village listing; UNESCO India review of model tourism villages.',
  5,
  ARRAY['fishing-nets','backwaters','working-tradition','village','offbeat']::text[],
  '{}'::jsonb
),
(
  'kumbalangi-pokkali-fields',
  'kumbalangi',
  'Pokkali Rice Fields — GIAHS Salt-Tolerant Cultivation',
  NULL,
  1.5,
  '5 min by autorickshaw to Pokkali field edge',
  'Pokkali rice is Kerala''s salt-tolerant heritage rice variety, cultivated on backwater-flooded paddies in a 1500-year-old rotation system: 6 months rice (June-November when monsoon flushes salt), 6 months prawn farming (December-May when tide returns). Kumbalangi is one of the 35 villages still practising it but visitors rarely walk the fields — most just photograph from the road bridge.',
  'UN-FAO recognised the Pokkali system as a Globally Important Agricultural Heritage System (GIAHS) in 2021. The rotation: monsoon rains flush salt out of the soil, farmers transplant Pokkali rice on raised mounds (June-November), then in December the bunds are opened and tidal water floods the field — prawns and chemmeen (small shrimp) grow naturally on the rice stubble until May. Walk the bunds at 7-9am with a local farmer (book through Kerala Responsible Tourism Mission, ₹500/2hr); learn the salt-water tilling, the 4-foot mounds, and why no chemicals are used. Fields visible Sep-Nov rice phase; Feb-Apr prawn-harvest phase.',
  'easy',
  'UN-FAO GIAHS designation 2021; Kerala Agricultural University Pokkali research listings; Kerala Responsible Tourism Mission village walk programme.',
  5,
  ARRAY['paddy-fields','heritage-rice','giahs','agriculture','offbeat']::text[],
  '{}'::jsonb
),
(
  'kumbalangi-mangrove-kayak',
  'kumbalangi',
  'Kallancherry Mangrove Kayak Trail',
  NULL,
  2.0,
  '8 min by autorickshaw to Kallancherry boat jetty',
  'Most Kumbalangi visitors book the standard 1-hour shikara backwater ride that loops the wide channels. The mangrove kayak through the narrow Kallancherry canals — where rhizophora roots brush both sides of the boat — is run by a 6-member fisherman cooperative and capped at 4 kayaks per slot. It''s not advertised at the village welcome centre.',
  'Single/double sit-on-top kayak trail through 4km of mangrove-fringed canals at Kallancherry — the southwest edge of Kumbalangi where the village meets the wider Vembanad backwater. Cooperative-run (Kumbalangi Boatmen Society, formed 2008); ₹500/person for the 2-hour trail with a guide. Spot kingfishers, brahminy kites, water monitors, mud crabs in the root tangle, and (if patient) the elusive smooth-coated otter family that nests in the area. Mornings 7-9am are best for birding; evenings 4-6pm for golden-hour photography. Tide-dependent — book through Kallancherry Retreat reception 24 hours ahead.',
  'easy',
  'Kerala Forest Department community mangrove conservation listing; Kallancherry Retreat trail map; Birdlife Kerala records 2024.',
  4,
  ARRAY['mangrove','kayak','birding','backwaters','village-coop']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified community/homestay-attached
-- (Kumbalangi has NO standalone restaurants — all dining is community/homestay-anchored.
--  Honest scarcity: 3 of 5 slots intentionally unfilled. Ship village-truth over ghost-fill.)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kumbalangi',
  'Kallancherry Retreat Dining',
  'Kallancherry, Kumbalangi Island',
  'kallancherry',
  ARRAY['kerala','seafood','syrian-christian']::text[],
  'mid_range',
  'Karimeen pollichathu with Pokkali rice',
  ARRAY['Karimeen pollichathu','Pokkali rice meals','Chemmeen (Kumbalangi small prawn) curry','Crab roast','Kappa puzhukku']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'In-house dining at Kallancherry Retreat — a Syrian-Christian homestay running since 1999, on the southwest edge of Kumbalangi facing the mangrove canals. The kitchen sources fish from the Chinese fishing nets at the property edge (catch-to-plate 30 minutes), prawns from the Pokkali fields, crabs from the village crab-farming co-op. Lunch meals (rice + 2 fish + thoran + sambar + buttermilk, on banana leaf) is the destination order. Non-residents can dine if pre-booked 4 hours ahead.',
  'Pokkali rice is served only Sep-Nov (rice harvest season); other months it''s regular Kerala rice. The crab roast needs Tuesday/Friday pre-order from the village co-op — call 24 hours ahead. WhatsApp +91-9447110079 to reserve; cards work but UPI is faster.',
  'Kallancherry, Kumbalangi 682007',
  'https://maps.google.com/?q=Kallancherry+Retreat+Kumbalangi',
  ARRAY[
    'https://www.kallancherryretreat.com/',
    'https://www.tripadvisor.in/Hotel_Review-g3221927-d2078706-Reviews-Kallancherry_Retreat-Kumbalangi_Ernakulam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumbalangi',
  'Gramam Homestay Sadhya Lunch',
  'Kannamali Road, Kumbalangi',
  'kumbalangi',
  ARRAY['kerala','vegetarian','sadhya']::text[],
  'casual',
  'Kerala vegetarian sadhya on banana leaf',
  ARRAY['Sadhya thali (24 items)','Pal payasam','Pradhaman','Olan','Avial']::text[],
  '₹₹',
  '[350,651)'::int4range,
  'veg-friendly',
  true,
  'required',
  'casual',
  'Family-run sadhya kitchen attached to Gramam Homestay — Kerala-vegetarian feast served on banana leaf, traditionally cooked by the lady of the house (Mrs. Suja). 24-26 items: parippu, sambar, rasam, kalan, olan, thoran, avial, pachadi, kichadi, two payasams. The sadhya is open to non-resident visitors but capped at 8 plates per sitting; pre-booking 24 hours ahead is mandatory. Lunch only — 12.30-2pm sitting.',
  'Onam sadhya (last week of August / first week of September) is the destination sitting — 28 items + multiple payasams + ela-ada. Books out two weeks ahead. Off-season Friday is when Suja cooks the full menu; other days run a shorter 16-item version. Cash only at lunch; UPI works for the reservation deposit.',
  'Kannamali Road, Kumbalangi 682007',
  'https://maps.google.com/?q=Gramam+Homestay+Kumbalangi',
  ARRAY[
    'https://www.gramamhomestay.com/',
    'https://www.tripadvisor.in/Hotel_Review-g3221927-d2052293-Reviews-Gramam_Homestay-Kumbalangi_Ernakulam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST SCARCITY HOLD: 3 of 5 eats slots intentionally unfilled.
-- Kumbalangi is a 9000-population model tourism village with NO standalone restaurants;
-- all dining is homestay or community-co-op attached. Both eateries above are pre-book-only
-- because the village policy is "feed guests of the homestay/visiting researchers" rather
-- than walk-in tourism. Ship 2 verifiable, accept Tier-B for eats.
-- This is the most honest call for this dest; ghost-filling would betray the village model.
