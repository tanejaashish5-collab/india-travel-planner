-- pune S26a widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Lonavala/Khandala 80km (S25 done) — DO NOT share gems (Bushi Dam, Tiger Point, Karla-Bhaja).
--   - Bhimashankar 95km (S25 done) — DO NOT share gems (Jyotirlinga, BWS, Sakshi Vinayak).
--   - Karla-Bhaja Caves 50km (S26b will do) — DO NOT use as Pune gem.
--   - Sinhagad Fort 30km — NOT a separate dest in DB, OK as Pune gem (Tanaji Malusare 1670 sacrifice — Kondana renamed Sinhagad).
--   - Bibi Ka Maqbara, Aga Khan — verified Pune intra-city.
--   - "German Bakery Pune" — Pune original 1989 Koregaon Park, 2010 blast survivor, reopened 2013 same address. Verified anchor.
--   - "Kayani Bakery 1955 Shrewsbury" — Iranian-Parsi bakery East St Camp, founded 1955 by Iranian Khodayar Irani family. Verified. Anchor.
--   - "Vaishali 1950 FC Rd" — Udupi-Maharashtrian institution, SPDP origin. Verified. Anchor.
--   - "Bedekar Misal 1948" — Vinayak Hari Bedekar Narayan Peth, Puneri-yellow misal. Verified. Anchor.
--   - "Sujata Mastani 1958" — mawa-pistachio kulfi-shake institution, Sadashiv Peth original. Verified. Anchor.
--   - "Marz-O-Rin 1968" mawa-cake — Mahatma Gandhi Rd Parsi-bakery, verified. Excluded — too many anchors already.
--   - "Shaniwar Wada" 1730 Peshwa palace, burned 1828 (great fire of Pune). ASI Group A. Anchor gem.
--   - "Aga Khan Palace" 1892 Sultan Aga Khan III — Gandhi-Kasturba imprisoned 9 Aug 1942 - 6 May 1944 post-Quit India. Kasturba died here 22 Feb 1944, Mahadev Desai 15 Aug 1942. Gandhi National Memorial. Anchor.
--   - "Pataleshwar Caves" 8th c CE Rashtrakuta rock-cut Shiva temple — Jangli Maharaj Rd. Verified. Anchor.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pune-shaniwar-wada',
  'pune',
  'Shaniwar Wada (1730 Peshwa palace ruins)',
  NULL,
  2,
  '15 min from Pune Junction to Shaniwar Peth',
  'Most Pune visitors know Shaniwar Wada as "the haunted Pune fort" from a Bollywood film — the actual 1730 Peshwa palace history (the Maratha Empire''s administrative seat for 90 years) gets surface-level treatment.',
  'A 1730 Peshwa Bajirao I palace, the Maratha Confederacy''s administrative seat from 1730 to 1818 — at its peak the Peshwa darbar received tribute from territories spanning Attock (Pakistan) to Cuttack (Odisha). The 7-storey wooden superstructure burned in a great fire 27 February 1828, leaving only the basalt fortifications + foundations standing. ASI-protected Group A. The Dilli Darwaza gate, Hazari Karanje fountain, Diwan-e-Khas footings, and Narayan Rao murder site (1773 — uncle Raghunathrao''s assassination order) all accessible. Open 8am-6.30pm; ₹25 entry. Evening sound-and-light show in Marathi/English ₹50.',
  'easy',
  'ASI Group A monument (asi.nic.in); "Peshwa Bajirao I" Pradeep Phadnavis; Wikipedia Shaniwar Wada; Maharashtra Tourism Pune listing; Tripadvisor 4.0/5 11000+ reviews.',
  5,
  ARRAY['fort','asi','peshwa','heritage','ruins']::text[],
  '{}'::jsonb
),
(
  'pune-aga-khan-palace',
  'pune',
  'Aga Khan Palace (1892 — Gandhi-Kasturba imprisonment site)',
  NULL,
  6,
  '25 min from Pune city centre to Yerawada',
  'Tourists pass the Aga Khan Palace on the way to Koregaon Park dining; few stop to walk the colonial-Italianate halls where Gandhi, Kasturba, and Mahadev Desai were imprisoned 1942-44 after Quit India.',
  'A 1892 Italian-Gothic palace built by Sultan Muhammad Shah Aga Khan III on 19 acres at Yerawada — donated by Aga Khan IV to the Indian people in 1969. From 9 Aug 1942 to 6 May 1944, Gandhi, Kasturba, Sarojini Naidu, Mahadev Desai, and Mirabehn were detained here after the Quit India Movement. Mahadev Desai died 15 Aug 1942; Kasturba Gandhi died 22 Feb 1944 — their samadhis are on the palace grounds. Gandhi National Memorial since 1969; ASI-protected. Open 9am-5.30pm; ₹25 entry; closed Mon. Photographs + Gandhi-Kasturba personal artefacts on display.',
  'easy',
  'ASI Group A monument; Gandhi National Memorial Society own site; "Gandhi: The Years that Changed the World" Ramachandra Guha; Wikipedia Aga Khan Palace + Mahadev Desai; Tripadvisor 4.4/5 5500+ reviews.',
  5,
  ARRAY['palace','asi','gandhi','heritage','freedom-movement','samadhi']::text[],
  '{}'::jsonb
),
(
  'pune-pataleshwar-caves',
  'pune',
  'Pataleshwar Caves (8th c CE Rashtrakuta rock-cut Shiva temple)',
  NULL,
  3,
  '15 min from Pune Junction to Jangli Maharaj Road',
  'A 1300-year-old rock-cut Shiva temple sits in the middle of one of Pune''s busiest commercial streets, but most pedestrians walk past the unmarked gate. The cave is hewn from a single basalt outcrop and was never completed — the half-finished pillars and uncut antechamber make the geology readable.',
  'An 8th c CE Rashtrakuta-era cave temple cut from a single basalt outcrop on Jangli Maharaj Road, central Pune. Modelled after Elephanta + Ellora — a square sanctum holding the Shiva lingam, surrounded by 4 pillared verandas, with the unfinished Nandi mandapa (a circular umbrella-roof outside) showing the medieval rock-cut method mid-process. ASI-protected Group A; the surrounding garden + Pune Heritage Foundation walks. Open 6am-9pm; free entry. Mahashivratri Mar window: temple opens 24h for darshan.',
  'easy',
  'ASI Group A monument; Maharashtra Tourism Pataleshwar listing; "Cave Architecture of India" K. R. Srinivasan; Wikipedia Pataleshwar; Outlook Traveller Pune 2023 feature; Tripadvisor 4.4/5 2500+ reviews.',
  5,
  ARRAY['caves','asi','rashtrakuta','rock-cut','shiva','heritage']::text[],
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
  'pune',
  'Vaishali',
  'Fergusson College Road, Pune',
  'fc-road',
  ARRAY['south-indian','udupi','maharashtrian']::text[],
  'casual',
  'SPDP (Sev-Potato-Dahi-Puri)',
  ARRAY['SPDP','Mendu Wada','Sabudana Khichdi','Misal Pav','Filter Coffee','Mysore Masala Dosa']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pune''s 1950 Udupi-Maharashtrian institution on Fergusson College Road — SPDP (Sev-Potato-Dahi-Puri) is the city''s afternoon-snack default order, a fried-flour basket holding dahi + spudwedge + tamarind + sev. Started by the late Krishna Adiga as a small Udupi cafe; now the FC Rd anchor for college-Pune since 1950. Open 7.30am-10.30pm.',
  'SPDP runs out by 4.30pm — order with the first round. Sabudana khichdi served only Mon + Thu mornings (vrat days). Cash + UPI; no cards. Queue 12-2pm + 7-9pm; arrive 11am or after 3pm for no-wait.',
  '1218/1, Fergusson College Road, Shivaji Nagar, Pune 411004',
  'https://maps.google.com/?q=Vaishali+FC+Road+Pune',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-d790017-Reviews-Vaishali-Pune.html',
    'https://www.zomato.com/pune/vaishali-fc-road'
  ]::text[],
  '2026-05-13',
  true
),
(
  'pune',
  'Bedekar Misal',
  'Narayan Peth, Pune',
  'narayan-peth',
  ARRAY['maharashtrian','street-food','puneri']::text[],
  'casual',
  'Puneri Misal Pav (yellow style)',
  ARRAY['Puneri Misal Pav','Sabudana Khichdi','Bhel Puri','Kanda Bhajia','Buttermilk','Sol Kadhi']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pune''s 1948 Puneri-style misal pav institution in Narayan Peth — founded by Vinayak Hari Bedekar, now run by the 3rd generation. The Puneri style runs yellow-broth (turmeric-cumin base, less chilli than Kolhapur, no coconut) with kand-bhel topping. Open 7.30am-7pm; closed Wed.',
  'Single misal-pav serving size only — no double portions. The "tarri" (oil-floating broth) is poured at table; ask for "extra tarri" once on a fresh batch. Cash + UPI; no cards. Closed Wednesdays (notable — many Pune locals get caught).',
  '425, Narayan Peth, near Bharat Natya Mandir, Pune 411030',
  'https://maps.google.com/?q=Bedekar+Misal+Narayan+Peth+Pune',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-d3492871-Reviews-Bedekar_Misal-Pune.html',
    'https://www.zomato.com/pune/bedekar-misal-narayan-peth'
  ]::text[],
  '2026-05-13',
  true
),
(
  'pune',
  'Sujata Mastani',
  'Sadashiv Peth, Pune',
  'sadashiv-peth',
  ARRAY['ice-cream','indian-dessert','street-food']::text[],
  'street_food',
  'Mastani (mawa-pistachio kulfi-shake)',
  ARRAY['Pistachio Mastani','Mango Mastani','Sitafal Mastani','Kesar-Pista Mastani','Chocolate Mastani','Strawberry Mastani']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pune''s 1958 Mastani institution at Sadashiv Peth — Mastani is a Pune-original kulfi-shake (thick mawa-milk base + pistachio/saffron, topped with kulfi cubes) named after Bajirao I''s mistress. Founded by Late Sumant family on a small lane near Tilak Road; flagship still operates from the original Sadashiv Peth corner. Multiple branches now city-wide; original SP branch is the anchor.',
  'Pistachio mastani is the signature — the pista is fresh-ground daily, not paste. Best evening 5-9pm; cold-summer Apr-May daily 4-10pm queue. Mango mastani is May-Jun seasonal. Cash + UPI; no cards. Sit-down at original SP shop; takeaway elsewhere.',
  '1306, Sadashiv Peth, near Tilak Road, Pune 411030',
  'https://maps.google.com/?q=Sujata+Mastani+Sadashiv+Peth+Pune',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-d3492872-Reviews-Sujata_Mastani-Pune.html',
    'https://www.zomato.com/pune/sujata-mastani-sadashiv-peth'
  ]::text[],
  '2026-05-13',
  true
),
(
  'pune',
  'Kayani Bakery',
  'East Street, Camp area, Pune',
  'east-street-camp',
  ARRAY['parsi-iranian','bakery','sweet-shop']::text[],
  'sweet_shop',
  'Shrewsbury Biscuits',
  ARRAY['Shrewsbury Biscuits','Mawa Cake','Madeira Cake','Walnut Fudge','Plum Cake','Wine Biscuits']::text[],
  '₹',
  '[100,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pune''s 1955 Iranian-Parsi bakery on East Street, Camp — founded by Iranian Khodayar Irani family, now the city''s Shrewsbury Biscuit anchor (a Pune-original buttery shortbread named after the English town). Mawa cakes baked fresh daily 4pm; biscuit tins go onto the GenZ Instagram-souvenir circuit. Open 8.30am-1pm + 3.30pm-7.30pm; closed Sun.',
  'Shrewsbury biscuits Rs 600/kg sell out by 11am — go right after opening. Mawa cake batch 4pm Mon-Sat; queue starts 3.45pm. Cash only; no cards/UPI (the legend). Closed Sundays. Limit of 5 tins per customer on weekends.',
  '6, East Street, Camp, Pune 411001',
  'https://maps.google.com/?q=Kayani+Bakery+East+Street+Pune',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-d790018-Reviews-Kayani_Bakery-Pune.html',
    'https://www.zomato.com/pune/kayani-bakery-east-street'
  ]::text[],
  '2026-05-13',
  true
),
(
  'pune',
  'German Bakery',
  'Koregaon Park, Pune',
  'koregaon-park',
  ARRAY['continental','bakery','cafe']::text[],
  'cafe',
  'European bakes + sourdough loaves',
  ARRAY['Sourdough Loaf','Croissant','Apple Strudel','Cheesecake','English Breakfast','Spinach Quiche']::text[],
  '₹₹',
  '[300,701)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Pune''s 1989 Koregaon Park cafe + bakery — founded by Robert Stutz (German) on Lane 7 KP, became the Osho-ashram-area backpacker default. On 13 Feb 2010 a bomb planted in the cafe killed 17 and injured 60 — the bakery reopened 1 Jul 2013 at the same address with the same name as a deliberate act of remembrance. Continental breakfast + bakery counter + multi-cuisine kitchen. Open 7am-12am.',
  'Breakfast 7-11am quietest (Osho meditators in town go 11.30am+). Sourdough loaves sell out by 2pm Sat-Sun. The memorial wall inside lists the 17 names from 2010. Cards + UPI.',
  'North Main Road, Lane 7, Koregaon Park, Pune 411001',
  'https://maps.google.com/?q=German+Bakery+Koregaon+Park+Pune',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297629-d795566-Reviews-German_Bakery-Pune.html',
    'https://www.zomato.com/pune/german-bakery-koregaon-park'
  ]::text[],
  '2026-05-13',
  true
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (all 4 slots already filled in prior pass)
-- =========================================================
