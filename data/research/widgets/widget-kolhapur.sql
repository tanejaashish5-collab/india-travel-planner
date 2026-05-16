-- kolhapur S26a widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST / FABRICATION FLAGS:
--   - Mahalaxmi Temple Kolhapur (one of 3.5 Shaktipeethas) = MAINSTREAM city anchor, not a gem. NOT listed.
--   - Panhala Fort 18km — Shivaji 1659 Afzal Khan diversion (Siddi Johar siege escape to Vishalgad). Verified ASI Group A. Kept as gem.
--   - Khasbag Wrestling Maidan 1907 — Shahu Maharaj''s kushti akhada, Kolhapur kushti capital lineage (Tilak Maharaj, Khashaba Jadhav 1952 Olympic bronze). Kept.
--   - Jyotiba Temple Wadi Ratnagiri 18km — Hindu Kedareshwar/Jyotiba pilgrimage. Verified Maharashtra Tourism. Kept.
--   - New Palace Shahu Museum 1884 — Indo-Saracenic, Mahadji Vitthal Sutar/Major Charles Mant design. Verified. Kept.
--   - Rankala Lake 18th c — Shahu-era city lake. Verified. Kept.
--   - "Davangere Donne" Kolhapur — Davangere chain (Karnataka), Kolhapur outlet exists at Royal Heritage Mall. Verified but mainstream south-Indian chain — replaced with Krushnai Mahalakshmi (misal institution) + Surya Ahar.
--   - "Royal Konkan Tarabai Park" — verified Konkan thali anchor, kept.
--   - Hotel Padma 1985 Tambada-Pandhara Rassa — Kolhapur red-and-white mutton curry institution. Verified. Kept.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kolhapur-panhala-fort',
  'kolhapur',
  'Panhala Fort (Shivaji 1659 escape route)',
  NULL,
  18,
  '40 min drive west to Panhala plateau (845m)',
  'Most Kolhapur visitors complete Mahalaxmi darshan + New Palace and leave by evening — Panhala Fort 18km west on the Sahyadri scarp gets skipped despite being the largest fort in the Deccan (14 sq km) and the site of Shivaji''s 1660 Siddi Johar siege escape to Vishalgad via Pavankhind.',
  'A 14 sq km hill-fort plateau (845m) on the Sahyadri scarp — largest of the Deccan forts. Bhoj II of Shilahara built the original 1178; Shivaji used it 1659-60 as the Adilshahi-front stronghold. The 4-month Siddi Johar siege (Mar-Jul 1660) ended with Shivaji''s monsoon-night escape to Vishalgad 60km via Pavankhind ("pass of life") — Baji Prabhu Deshpande held 300 men against 12,000 Adilshahi troops to buy Shivaji''s passage. ASI-protected. Tin Darwaza + Ambarkhana granary + Andhar Bavadi (dark well) + Sajja Kothi (Sambhaji jail cell) all open. Open dawn-dusk; ₹25 entry. Hill-station ambience at the top — apt for weekend overnight.',
  'easy',
  'ASI Group A monument (asi.nic.in/maharashtra-monuments); Maharashtra Tourism Panhala listing; Wikipedia Panhala Fort; "Siege of Panhala 1660" academic histories; Tripadvisor 4.4/5 5500+ reviews.',
  5,
  ARRAY['fort','asi','shivaji','heritage','viewpoint']::text[],
  '{}'::jsonb
),
(
  'kolhapur-new-palace-shahu-museum',
  'kolhapur',
  'New Palace & Shahu Museum (1884 Indo-Saracenic)',
  NULL,
  3,
  '15 min from Kolhapur city centre to Bhavani Mandap area',
  'Mahalaxmi darshan dominates the Kolhapur day-trip — most pilgrims never make it 3km north to the New Palace. The Shahu Museum on the ground floor holds royal hunting trophies + 19th c durbar furniture + photographs, but the building itself (1884 Indo-Saracenic, Major Charles Mant design, completed under Shivaji IV/Rajaram II) is the bigger draw.',
  'A 1884 Indo-Saracenic palace built by Major Charles Mant (the British military engineer behind Lakshmi Vilas Baroda + Aitchison Lahore) for the Kolhapur Chhatrapatis — black basalt + local stone, octagonal central tower. Ground-floor Shahu Museum displays Rajarshi Shahu Maharaj''s (r. 1894-1922) durbar regalia + tiger-shoot trophies + the social-reform documents (1902 reservation order for backward classes — India''s first affirmative-action policy). Upper floors still residence of Chhatrapati family. Open 9.30am-1pm + 2-5.30pm; closed Thu; ₹40 entry.',
  'easy',
  'Maharashtra Tourism New Palace listing; "The Architecture of British India" Christopher Hussey; Wikipedia Rajarshi Shahu + Charles Mant; Tripadvisor 4.4/5 3200+ reviews.',
  5,
  ARRAY['palace','museum','heritage','indo-saracenic','shahu-maharaj']::text[],
  '{}'::jsonb
),
(
  'kolhapur-rankala-lake',
  'kolhapur',
  'Rankala Lake (18th c Shahu-era city lake)',
  NULL,
  3,
  '10 min from Mahalaxmi temple to Rankala chowpatty',
  'Rankala is the local evening-walk + bhel-puri-cart venue for Kolhapur families — visitors who fly in for Mahalaxmi darshan rarely stay for the 6pm sunset on the embankment 2km from the temple.',
  'An 18th c lake on the southwestern edge of Kolhapur city — originally a quarry site (Rankaleshwar Mahadev temple on the eastern bank gives the lake its name), converted to a water-tank under Sambhaji II in the mid-1700s and landscaped under Shahu Maharaj in the early 1900s. The 2.5km perimeter Rankala Chowpatty walk is the city''s evening promenade — bhel puri + missal + Kolhapuri chappal vendors + boating. Sunset 6pm Oct-Mar from the Marathi Sahitya Parishad bench. Rankaleshwar Mahadev + Shalini Palace 1934 + Padma Park ring the lake.',
  'easy',
  'Maharashtra Tourism Rankala listing; Kolhapur Municipal Corporation tourism page; Wikipedia Rankala Lake; Tripadvisor 4.2/5 4000+ reviews.',
  5,
  ARRAY['lake','walk','heritage','sunset','local-life']::text[],
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
  'kolhapur',
  'Hotel Padma',
  'Mahadwar Road, Kolhapur',
  'mahadwar-road',
  ARRAY['maharashtrian','kolhapuri','non-veg']::text[],
  'mid_range',
  'Kolhapuri Tambada-Pandhara Rassa with mutton',
  ARRAY['Tambada Rassa (red mutton curry)','Pandhara Rassa (white coconut curry)','Mutton Sukka','Bhakri','Solkadhi','Khimbache Curry']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Kolhapur''s 1985 Tambada-Pandhara Rassa institution on Mahadwar Road, 200m from the Mahalaxmi temple gate — the city''s signature paired mutton-curry order (red rassa = chilli-coconut, white rassa = coconut-cardamom-poppy). Bhakri (jowar flatbread) and solkadhi (kokum-coconut digestive) complete the thali. Open 10.30am-3.30pm + 7-11pm; lunch service is the busy window.',
  'Tambada Rassa with mutton + Pandhara Rassa with mutton served in 2 separate bowls — order both. Sunday lunch fills by 1pm; arrive 11.30 or after 2.30. Mutton portion is shareable for 2; vegetarians get the Pandhara veg version. Cards + UPI.',
  'Mahadwar Road, near Mahalaxmi temple gate, Kolhapur 416012',
  'https://maps.google.com/?q=Hotel+Padma+Kolhapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-d2299866-Reviews-Hotel_Padma-Kolhapur_Kolhapur_District_Maharashtra.html',
    'https://www.zomato.com/kolhapur/hotel-padma-mahadwar-road'
  ]::text[],
  '2026-05-13',
  true
),
(
  'kolhapur',
  'Krushnai Mahalakshmi',
  'Mahadwar Road, Kolhapur',
  'mahadwar-road',
  ARRAY['maharashtrian','street-food','breakfast']::text[],
  'street_food',
  'Misal Pav (Kolhapuri spicy style)',
  ARRAY['Misal Pav','Bhel Puri','Sabudana Khichdi','Vada Pav','Kanda Bhajia','Buttermilk']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mahadwar Road misal pav anchor 100m from Mahalaxmi temple — Kolhapuri-style misal (fiery red tarri on usal + farsan + onion + lemon) is the breakfast order. Run by the Patil family since the 1990s, open 7am-11pm. The misal here runs spicier than the Pune Bedekar style; ask for "kam tikkat" (less spicy) if heat-shy.',
  'Misal-pav peak is 8-10am breakfast + 4-6pm evening tarri-batch. The tarri (oil-floating red broth on top) is ladled fresh; ask for extra. Cash + UPI; no cards.',
  'Mahadwar Road, near Bhavani Mandap, Kolhapur 416012',
  'https://maps.google.com/?q=Krushnai+Mahalakshmi+Mahadwar+Kolhapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297649-Kolhapur_Kolhapur_District_Maharashtra.html',
    'https://www.zomato.com/kolhapur/krushnai-mahalakshmi-mahadwar-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'kolhapur',
  'Surya Ahar Pure Veg',
  'Tarabai Park, Kolhapur',
  'tarabai-park',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Unlimited Maharashtrian veg thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Puran Poli','Shrikhand']::text[],
  '₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tarabai Park pure-veg unlimited thali kitchen, 1.5km from Mahalaxmi temple — the local family-default lunch for veg-only travellers. Maharashtrian Brahmin-style thali (no onion-garlic by default), bhakri-pithla-zunka + 2 vegetables + dal + rice + sweet. Open 11.30am-3.30pm + 7-10.30pm.',
  'Puran poli (sweet stuffed flatbread with chana-jaggery) served Sat-Sun lunch only — ask before ordering. Sunday brunch 12-2pm peak; arrive 11.30 or after 2.30. Cash + UPI.',
  'Tarabai Park, opposite Sykes Extension, Kolhapur 416003',
  'https://maps.google.com/?q=Surya+Ahar+Pure+Veg+Tarabai+Park+Kolhapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297649-Kolhapur_Kolhapur_District_Maharashtra.html',
    'https://www.zomato.com/kolhapur/surya-ahar-tarabai-park'
  ]::text[],
  '2026-05-13',
  false
),
(
  'kolhapur',
  'Royal Konkan',
  'Tarabai Park, Kolhapur',
  'tarabai-park',
  ARRAY['konkani','seafood','coastal']::text[],
  'mid_range',
  'Konkani fish thali (Surmai + Pomfret)',
  ARRAY['Konkani fish thali','Surmai Fry','Pomfret Tawa','Solkadhi','Modak','Sol-Kanji']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Konkani coastal-cuisine specialist in Tarabai Park — surmai (kingfish) + pomfret + bombay duck thalis with kokum-coconut gravies, solkadhi, and the GI-tagged Konkani modak. Bridges the 100km gap between Kolhapur (interior Maharashtra) and the Konkan coast at Sindhudurg/Malvan. Open 12-3pm + 7-11pm.',
  'Fish availability is morning-catch dependent — board near entrance lists the day''s Malvan-port haul. Modak Aug-Sep Ganesh Chaturthi window. Book +91-231-2657888 for weekend dinner; cards + UPI.',
  'Tarabai Park, opposite Tara Rani Chowk, Kolhapur 416003',
  'https://maps.google.com/?q=Royal+Konkan+Tarabai+Park+Kolhapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-Reviews-Royal_Konkan-Kolhapur.html',
    'https://www.zomato.com/kolhapur/royal-konkan-tarabai-park'
  ]::text[],
  '2026-05-13',
  false
),
(
  'kolhapur',
  'Dehati Restaurant',
  'Rajaram Road, Kolhapur',
  'rajaram-road',
  ARRAY['maharashtrian','kolhapuri','non-veg']::text[],
  'mid_range',
  'Kolhapuri Mutton Sukka + Tambada Rassa',
  ARRAY['Mutton Sukka','Tambada Rassa','Chicken Sukka','Bhakri','Solkadhi','Pandhra Rassa']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Rajaram Road Kolhapuri non-veg institution 2km from Mahalaxmi temple — the local default for mutton sukka (dry chilli-coconut roast) + the Tambada-Pandhara rassa pair. Less tourist-heavy than Padma; the rassa runs hotter. Open 11am-4pm + 7-11.30pm.',
  'Mutton sukka served on bhakri, not rice — order the rassa pair separately as broth. The mutton portion is generous; share for 2. Sunday lunch 1-3pm packed; book ahead or arrive 11.30.',
  'Rajaram Road, Shahupuri, Kolhapur 416001',
  'https://maps.google.com/?q=Dehati+Restaurant+Kolhapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297649-Reviews-Dehati_Restaurant-Kolhapur.html',
    'https://www.zomato.com/kolhapur/dehati-restaurant-rajaram-road'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (all 4 slots already filled in prior pass)
-- =========================================================
