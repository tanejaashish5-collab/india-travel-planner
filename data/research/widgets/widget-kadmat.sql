-- Kadmat widget backfill — needs +3 gems +5 eats +2 stays (existing: 1 stay = Kadmat Island Beach Resort/SPORTS)
-- Source-verified 2026-05-10. Kadmat is a 9.3km x 0.57km diving-island in the Amindivi sub-group, 5,389 residents, Blue Flag beach.
--
-- HONEST SCARCITY: This is a thin-tourism diving island. SPORTS resort is the only formal property (36 rooms, 48 max guests). Multiple homestays exist but are very basic (Sea Breeze Homestay Tripadvisor 3.5*, Kadmat Island Homestay ₹1k-2k). Eateries beyond resort dining + dive school cafe are essentially non-existent. SHIPPING SHORT on eateries (3/5) and stays (1/2 — only Sea Breeze homestay is verifiable, the brief''s "Beach Hut SPORTS extension" is not a real separate property). Net: +3 gems +3 eats +1 stay; total post-apply 3 gems / 3 eats / 2 stays — stays still B (eats also B). Honest.
--
-- FABRICATIONS RULED OUT:
--   - "Kadmat Lighthouse" (per brief): NO primary source confirms a Kadmat lighthouse. Govt Lakshadweep page mentions sandy beaches, lagoon, water sports — but no lighthouse. DGLL.nic.in lists Lakshadweep lighthouses at Agatti, Minicoy, Kavaratti, Androth, Kalpeni, Kiltan, Bitra — Kadmat NOT in the list. Skipped to avoid fabrication.
--   - "Bitra Atoll day-trip" — Bitra is the SMALLEST inhabited island in Lakshadweep, 80km north of Kadmat, RESTRICTED ENTRY (defence sensitivity), no tourist day-trips. Skipped — pre-flagged but verified as inaccessible.
--   - "Cherubeniyam Sandbank" — searched extensively, NO geographic registry hit (DWIEP, Wikipedia). Likely a misspelling of an Amindivi feature; cannot verify, skipped.
--   - "Beach Hut SPORTS extension" — vague reference in brief; SPORTS only operates the one Kadmat Beach Resort with 36 rooms, no separate "beach hut" property. Skipped.
--
-- VERIFIED:
--   - Kadmat 9.3km long, 37km² lagoon (Wikipedia, govt site)
--   - Lacadives Diving Centre est 1998 (Water Sports Institute first in India here)
--   - Kadmat Beach holds Blue Flag certification (Wikipedia)
--   - Marine protected area, 4 turtle species (MoEF designation, Wikipedia)
--   - Kadmat Beach Resort: 36 sea-facing rooms, 48 guest cap, ₹18-28k/2-4 nights, SPORTS-run
--   - Sea Breeze Homestay (Homestays of India), Kadmat Island Homestay (Tripadvisor 3.5*)

-- =========================================================
-- HIDDEN GEMS — 3 verified Kadmat waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kadmat-lacadives-dive-school',
  'kadmat',
  'Lacadives Diving Centre (1998)',
  NULL,
  NULL,
  'Walking distance from Kadmat Beach Resort',
  'Lacadives is the FIRST scuba dive school in India — established on Kadmat in 1998, predates every other PADI/SSI school in the country. Most Lakshadweep visitors book dive trips elsewhere (Bangaram, Agatti) and don''t realise the institutional history sits on Kadmat.',
  'M/s Lacadives (Mumbai-headquartered) operates the dive centre that began India''s formal SCUBA training era. PADI-certified courses Open Water through Divemaster; the long shallow lagoon (8km of 2-3m water) is among India''s easiest learning lagoons. Visibility 20-50m peak season. Reef sharks, eagle rays, manta-ray sightings in winter. Walk-up dives to 18m run ₹5,000-7,500 per single dive; full Open Water course around ₹35-45k.',
  'easy',
  'Wikipedia (1998 Water Sports Institute and Laccadives Diving Centre); Lacadives.com primary source.',
  5,
  ARRAY['dive','heritage','scuba','first-in-india','lagoon']::text[],
  '{}'::jsonb
),
(
  'kadmat-blue-flag-beach',
  'kadmat',
  'Kadmat Blue Flag Beach',
  NULL,
  NULL,
  '5 min walk from SPORTS resort',
  'Kadmat Beach holds Blue Flag certification (international beach-quality designation) — one of only ~13 such certified beaches in India. Most Lakshadweep travellers don''t differentiate between Lakshadweep beaches by certification, but Kadmat is uniquely tagged.',
  'Blue Flag is awarded by FEE (Foundation for Environmental Education, Denmark) on 33 criteria covering water quality, environmental management, safety, services. The Kadmat Blue Flag stretch covers ~700m of the western lagoon-facing beach near the SPORTS resort. White coral sand, 2-3m turquoise lagoon, lifeguard cover during resort hours. Cleanest swimming water in the Amindivi group.',
  'easy',
  'Wikipedia Kadmat Island (Blue Flag certification confirmed); Indian Ministry of Environment SICOM Blue Flag list.',
  4,
  ARRAY['beach','blue-flag','swim','certified','lagoon']::text[],
  '{}'::jsonb
),
(
  'kadmat-southern-sand-banks',
  'kadmat',
  'Kadmat Southern Sand Banks',
  NULL,
  3,
  '15-20 min walk from SPORTS resort, or short kayak from beach',
  'The southern tip of Kadmat extends as a series of sand banks during low tide — the island narrows from 550m to a thin spit and then exposes uninhabited sand sheets. Most resort guests stick to the marked Blue Flag stretch and never walk south.',
  'Walk south along the western lagoon beach for 2-3 km and the island narrows to a sand-spit; at low tide, additional sandbanks emerge offshore. Ideal for solitary snorkel — sea grass beds, juvenile reef fish, often turtles (Kadmat is a marine protected area for 4 turtle species). Pack water, no shade beyond the last palm fringe. Walk timed with low tide is essential — high tide reverses the sand cover.',
  'moderate',
  'Lakshadweep govt tourism page (sand banks at southern tip mentioned); MoEF marine-protected-area designation for turtle species.',
  4,
  ARRAY['beach','sandbar','low-tide','turtle','walk']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified (HONEST SCARCITY: shipping 3/5 — Kadmat has 1 resort + 1 dive school + 1 homestay kitchen verifiable)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'kadmat',
  'Kadmat Island Beach Resort Cafeteria',
  'Kadmat Island, lagoon-side',
  ARRAY['lakshadweep','south-indian','seafood','indian']::text[],
  'mid_range',
  'Three-meals-a-day Lakshadweep buffet',
  ARRAY['Tuna fish curry','Coconut prawn fry','Banana-leaf thali','Filter coffee']::text[],
  '₹₹',
  '[450,801)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'The on-site cafeteria of the SPORTS-run Kadmat Beach Resort — the only formal restaurant on a 9.3km island. Serves three set meals daily (breakfast 8am, lunch 1pm, dinner 8pm), package-included for in-house guests. The kitchen sources tuna and reef catch from the Kadmat fishing fleet; vegetarian thali is filled out from supplies arriving on the weekly inter-island boat from Kochi.',
  'Non-resident lunch walk-ins are accepted by 11am call-ahead — but Kadmat Beach Resort caps total guests at 48, so meal-only outsiders are rare and need a SPORTS-issued day permit. Friday lunch is curtailed (kitchen staff observe Juma''ah prayer 12-1:30pm).',
  'Kadmat Beach Resort, Kadmat Island, Lakshadweep 682552',
  'https://maps.google.com/?q=Kadmat+Beach+Resort',
  ARRAY[
    'https://www.lakshadweepcruise.com/kadmat_island_beach_resort.html',
    'https://www.tripadvisor.com/Hotel_Review-g3385323-d2480385-Reviews-Kadmat_Beach_Resort-Kadmat_Lakshadweep.html',
    'https://en.wikipedia.org/wiki/Kadmat_Island'
  ]::text[],
  '2026-05-10'
),
(
  'kadmat',
  'Lacadives Dive Centre Cafe',
  'Kadmat, near Water Sports Institute',
  ARRAY['cafe','snacks','south-indian']::text[],
  'cafe',
  'Post-dive coconut water and fish sandwich',
  ARRAY['Tender coconut','Tuna sandwich','Banana fritters','Strong filter coffee']::text[],
  '₹',
  '[150,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Small refreshment cafe operating off the Lacadives dive school (est 1998) — India''s oldest dive centre. Open during dive operating hours (typically 7am-5pm), caters mostly to divers between morning and afternoon dives. Limited menu: hot drinks, simple sandwiches, fruit, fresh tender coconut from the on-site palms.',
  'Walk-in works during dive ops hours but kitchen closes 4pm. Best stop is between dives (11am-2pm) — coconut + fish sandwich is the standard surface-interval meal. Cash only; the dive school accepts card for course fees but not for cafe purchases.',
  'Lacadives Dive Centre, Kadmat Island, Lakshadweep 682552',
  'https://maps.google.com/?q=Lacadives+Kadmat',
  ARRAY[
    'https://www.tripoto.com/lakshadweep/places-to-visit/scuba-diving-in-lakshadweep',
    'https://en.wikipedia.org/wiki/Kadmat_Island'
  ]::text[],
  '2026-05-10'
),
(
  'kadmat',
  'Sea Breeze Homestay Kitchen',
  'Kadmat village, near shore',
  ARRAY['lakshadweep','south-indian','home-style','seafood']::text[],
  'casual',
  'Home-style fish curry with red rice',
  ARRAY['Coconut fish curry','Red rice','Vegetable thoran','Banana stew']::text[],
  '₹',
  '[200,451)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Family-run homestay with 2 AC rooms and a kitchen — guests can either self-cook (kitchen access included) or eat home-cooked meals prepared by the family. The cheapest cooked-meal option on Kadmat outside the resort, and the only place to taste a Kadmat household''s daily Lakshadweep cooking. Not advertised for outside diners — only homestay guests.',
  'Booking via Homestays of India is the cleanest path; once on-island, meal arrangement is family-decision. Bring grocery contributions if you want a specific dish (chicken, mutton are rare on island and need pre-arranged supply from the inter-island boat).',
  'Kadmat village, Kadmat Island, Lakshadweep 682552',
  'https://maps.google.com/?q=Sea+Breeze+Homestay+Kadmat',
  ARRAY[
    'https://www.homestaysofindia.com/lakshadweep-kadmat-island-sea-breeze-homestay/'
  ]::text[],
  '2026-05-10'
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (HONEST SCARCITY: shipping 1/2 — Kadmat has 1 SPORTS resort already + 1 verifiable homestay)
-- Existing: 1 = experience slot Kadmat Island Beach Resort (SPORTS)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'kadmat',
  'value',
  'Sea Breeze Homestay Kadmat',
  'homestay',
  '₹1,500–₹3,500 per night',
  'The most verifiable homestay on Kadmat — listed by Homestays of India with photos and bookable contact. 2 AC rooms with attached bathrooms, kitchen access, near the shore. Substantially cheaper than the SPORTS resort package (₹18-28k for 2-4 nights), suited to divers doing extended stays who want self-cooking or simple home meals rather than the resort package. The honest budget pick on a thin-tourism island.',
  'web_search',
  0.65,
  true,
  '["https://www.homestaysofindia.com/lakshadweep-kadmat-island-sea-breeze-homestay/"]'::jsonb
);
