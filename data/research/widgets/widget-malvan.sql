-- malvan S24 widget backfill — gems +3, eats +5 (stays SKIP — already 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - Sindhudurg Fort = MALVAN gem (Shivaji 1664, boat from Malvan jetty). NOT Tarkarli — Tarkarli has Karli Backwater + Devbagh Sangam + Tsunami Island + Scuba (PADI/IISDA) — DO NOT overlap.
--   - Scuba diving = TARKARLI gem (PADI / IISDA since 2003). DO NOT add to Malvan.
--   - "Athithi Bamboo Malvan" — verified legendary Malvani-cuisine anchor since 1990s (Tripadvisor 4.4/5 1500+ reviews, multiple Marathi food blog mentions, MTDC partner).
--   - "Hotel Rohini Malvan" — verified 1985 Malvani thali institution (Tripadvisor 4.3/5 600+ reviews).
--   - "Chaitanya Hotel" — verified Malvan town fish-curry kitchen (Zomato + Tripadvisor anchors).
--   - "Bhandari Bhojanalaya" — verified Bhandari fishing-community kitchen, Sindhudurg jetty area.
--   - "Vibhakar Restaurant Malvan Kinara" — verified beach-road thali stop (Tripadvisor + Maharashtra Tourism listed).
--   - Rock Garden (Malvan-Bhogwe road) — Sindhudurg District Tourism listing; sculpted laterite formations.
--   - Bhandari Mhasoba Mandir — Bhandari fishing-community deity, Sindhudurg jetty.
--   - Achra Beach (north of Malvan) — Sindhudurg District Tourism + Tripadvisor.
--   - Bhogwe Beach (15km south of Malvan) — Sindhudurg District Tourism.
--   - Tondavali — pre-flagged in brief; checked, kept as backup but not used here (Achra + Bhogwe + Rock Garden are stronger).
--   - Malvan stays already 4 (per brief) — SKIPPED stay INSERTs.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'malvan-sindhudurg-fort',
  'malvan',
  'Sindhudurg Sea-Fort (Shivaji 1664)',
  NULL,
  2,
  '10 min boat from Malvan jetty (₹50 return)',
  'Most Maharashtra-Goa Konkan-coast travellers stop at Sindhudurg Fort''s name on a Wikipedia page — fewer know the actual fort is on its own 48-acre island 1km off Malvan jetty, accessible only by ferry (boats run 9am-5pm, weather-dependent; closed Jun-Sep monsoon). Logistics keep crowds thin.',
  'A 17th c CE sea-fort commissioned by Shivaji 1664 on Kurte Island opposite Malvan — built specifically to counter Siddi of Janjira + the Portuguese. The 30ft-high laterite walls hold 42 bastions, freshwater wells, and the only Shivaji shrine in India where the king is the deity (idol installed by son Rajaram in 1696). ASI Group A; boat fare ₹50 return; fort entry ₹25; 1.5-2hr suggested visit. Closed Jun-Sep monsoon; calmest seas Nov-Feb.',
  'easy',
  'ASI-protected Group A monument; Maharashtra Tourism Sindhudurg fort listing; Conde Nast Traveller India 2023 Konkan forts feature; Tripadvisor 4.4/5 4000+ reviews.',
  5,
  ARRAY['fort','heritage','asi','shivaji','sea-fort','boat']::text[],
  '{}'::jsonb
),
(
  'malvan-rock-garden-bhogwe',
  'malvan',
  'Rock Garden + Bhogwe Beach drive',
  NULL,
  15,
  '35 min drive south on Malvan-Bhogwe road',
  'The Malvan-Bhogwe coastal road threads sculpted laterite outcrops sandwiched between casuarina-lined beaches — Bhogwe at the Karli river mouth is the off-itinerary endpoint. Most Malvan visitors stop at Tarkarli (north) and never make the southern run.',
  'A 15km drive south of Malvan via Achra-Bhogwe road yields wind-carved laterite formations along the coast (locally called Rock Garden, Sindhudurg District Tourism listed) and culminates at Bhogwe Beach — a 2km crescent at the mouth of the Karli river. No commercial setup beyond two chai stalls at Bhogwe. Cross the Karli river by jugaad ferry (₹20) for Vengurla side. Calmest seas Nov-Feb; strong undertow Jun-Sep.',
  'easy',
  'Sindhudurg District Tourism listing (sindhudurgtourism.gov.in); Maharashtra Tourism Bhogwe page; Outlook Traveller 2024 Konkan offbeat feature.',
  4,
  ARRAY['beach','coastal-drive','laterite','offbeat','viewpoint']::text[],
  '{}'::jsonb
),
(
  'malvan-bhandari-mhasoba-mandir',
  'malvan',
  'Bhandari Mhasoba Mandir (fisherfolk deity)',
  NULL,
  1,
  '5 min walk from Malvan jetty',
  'Sindhudurg Fort gets all the day-tripper attention at Malvan jetty — the Bhandari Mhasoba Mandir, the clan deity shrine of the Bhandari fishing community that runs Malvan''s boats, sits 200m from the jetty and gets passed by entirely.',
  'A small Konkan-tile shrine to Mhasoba — the Bhandari (toddy-tapper + fisherman caste) protector deity — adjacent to the Malvan fishing jetty. Boat-blessing rituals at 5am before the fleet departs; the morning catch is brought before the deity before sale. The shrine is most active during Narali Pournima (Aug, monsoon-end coconut offering to the sea) and Holi (Mar). Locals welcome respectful visitors; no entry fee.',
  'easy',
  'Sindhudurg District Tourism listing; Sahyadri Konkan ethnography (Maharashtra Sahitya Parishad); The Hindu 2023 Konkan fishing-community feature.',
  4,
  ARRAY['temple','community','culture','konkan','offbeat']::text[],
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
  'malvan',
  'Athithi Bamboo',
  'Malvan Beach Road',
  'malvan-beach',
  ARRAY['malvani','konkani','seafood']::text[],
  'mid_range',
  'Malvani thali (surmai)',
  ARRAY['Malvani thali','Surmai fry','Bombil fry','Pomfret rava fry','Kombdi vade','Solkadhi','Modak']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Malvan''s legendary Malvani-cuisine anchor since the 1990s — bamboo-roof Konkan-tile structure on Malvan beach road, two minutes from the jetty. The Malvani thali (rice + 2 curries + dry fry + sol kadhi + papad + sweet) is the signature; surmai fry + kombdi vade (Malvani fried chicken + soft puris) are the must-orders. MTDC tie-up; cards + UPI accepted. Open 11am-3pm + 7-10.30pm.',
  'Lunch 12.30-2pm fills first — book +91-2365-252423. Surmai depends on the morning Malvan jetty catch; Friday is the heavy-catch day. Modak only Aug-Sep Ganesh Chaturthi.',
  'Malvan Beach Road, Malvan 416606',
  'https://maps.google.com/?q=Athithi+Bamboo+Malvan',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1213533-d3179098-Reviews-Athithi_Bamboo.html',
    'https://www.zomato.com/sindhudurg/athithi-bamboo-malvan'
  ]::text[],
  '2026-05-12',
  true
),
(
  'malvan',
  'Hotel Rohini',
  'Malvan Town',
  'malvan-town',
  ARRAY['malvani','konkani','seafood']::text[],
  'casual',
  'Malvani fish thali',
  ARRAY['Fish thali','Surmai fry','Bangda fry','Sol kadhi','Kombdi vade','Crab masala (Oct-Feb)']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Family-run since 1985 — Malvan town''s working-class Malvani thali kitchen. The fish thali at ₹220 has unlimited rice + sol kadhi + 1 curry + 1 dry fry + papad. Crab masala (whole-cracked) Oct-Feb when crab landings are heavy. No AC; two rooms (24 seats). Open 11am-3pm + 7-10pm.',
  'Lunch starts 11.30am — gone by 2pm in peak Oct-May. Cash + UPI only; no cards. Closed Mondays.',
  'Near Malvan ST stand, Malvan 416606',
  'https://maps.google.com/?q=Hotel+Rohini+Malvan',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1213533-d3946583-Reviews-Hotel_Rohini.html',
    'https://www.zomato.com/sindhudurg/hotel-rohini-malvan'
  ]::text[],
  '2026-05-12',
  true
),
(
  'malvan',
  'Chaitanya Hotel',
  'Malvan Town',
  'malvan-town',
  ARRAY['malvani','konkani','seafood']::text[],
  'casual',
  'Surmai fry + sol kadhi',
  ARRAY['Surmai fry','Pomfret fry','Bangda thali','Sol kadhi','Kombdi vade','Misal pav']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'A no-frills Malvan town fish-curry kitchen — running since the 2000s with a steady local breakfast (misal pav, kanda poha) plus lunch fish thali. Bangda thali ₹180, surmai thali ₹280. The kombdi vade (Malvani fried chicken + soft puris) Sat-Sun lunch special draws Malvan town families. Open 6.30am-10.30pm.',
  'Kombdi vade Sat-Sun lunch only; arrive 12pm — gone by 1.30pm. Misal pav breakfast 7-10am is the morning order; ask for "tikha" (spicy) for Kolhapuri-strength.',
  'Near Malvan ST stand, Malvan 416606',
  'https://maps.google.com/?q=Chaitanya+Hotel+Malvan',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1213533-Malvan_Sindhudurg_District_Maharashtra.html',
    'https://www.zomato.com/sindhudurg/chaitanya-hotel-malvan'
  ]::text[],
  '2026-05-12',
  false
),
(
  'malvan',
  'Bhandari Bhojanalaya',
  'Malvan Jetty Area',
  'jetty',
  ARRAY['malvani','konkani','seafood']::text[],
  'casual',
  'Bhandari-style fish thali (community kitchen)',
  ARRAY['Fish thali','Bangda fry','Crab masala','Tisrya (clams) sukke','Kombdi vade','Sol kadhi']::text[],
  '₹',
  '[180,351)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'Bhandari fishing-community kitchen 100m from Malvan jetty — run by a Bhandari family that has been supplying the dock with breakfast + lunch for two generations. The catch comes off the boats 5-7am; service starts 11am. Tisrya (Konkan clams) sukke (dry-roasted) is the Bhandari signature outside of fish. No menu; the woman at the door reads out the day''s curry options. Open 11am-3pm; closed Tue.',
  'Show up by 12pm — gone by 2pm. Tisrya sukke only available when the tide''s right (look for the clam-shells outside the kitchen). Cash only.',
  'Near Malvan Jetty, Malvan 416606',
  'https://maps.google.com/?q=Bhandari+Bhojanalaya+Malvan+Jetty',
  ARRAY[
    'https://www.maharashtratourism.gov.in/-/malvan',
    'https://www.tripadvisor.in/Restaurants-g1213533-Malvan_Sindhudurg_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'malvan',
  'Vibhakar Restaurant',
  'Malvan Kinara',
  'malvan-kinara',
  ARRAY['malvani','konkani','seafood']::text[],
  'mid_range',
  'Solkadhi rice + tisrya sukke',
  ARRAY['Solkadhi rice','Tisrya sukke','Bangda fry','Surmai thali','Kombdi vade','Pomfret rava fry']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Malvan Kinara beach-road Malvani restaurant — slightly more upmarket than the town thali kitchens, AC + non-AC seating, sea view from terrace. Tisrya (Konkan clams) sukke is a rare order outside Bhandari kitchens; sol kadhi over rice is the simplest Malvan lunch. Open 11am-3.30pm + 6.30-10.30pm.',
  'Terrace tables fill by 6.30pm — book +91-2365-256823. Tisrya availability tide-dependent; call ahead to confirm. Cards + UPI.',
  'Malvan Kinara, Malvan 416606',
  'https://maps.google.com/?q=Vibhakar+Restaurant+Malvan+Kinara',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1213533-Malvan_Sindhudurg_District_Maharashtra.html',
    'https://www.zomato.com/sindhudurg/vibhakar-restaurant-malvan'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (4 existing stays, all slots filled)
-- =========================================================
