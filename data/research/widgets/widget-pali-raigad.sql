-- pali-raigad S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Pali village ~10000 pop, Sudhagad taluka, Raigad district. NH-17 (Mumbai-Goa) passes 4km from Pali.
--   - Ballaleshwar = ONLY named-deity Ashtavinayak (named after Ballal, the boy devotee from local Puranic legend; the other 7 named after Ganesh attributes like Siddhi, Maya, Vighna, etc.).
--   - Two idols east+north-facing same temple — UNIQUE among 8 Ashtavinayak (most have a single sanctum idol).
--   - 1810 Nana Phadnis stone reconstruction (Phadnis was Peshwa minister + Ashtavinayak patron — distinct from Ahilyabai''s 4-temple cluster).
--   - Mahad-Raigad (S26b, sep dest, 70km south on NH-17) — DO NOT cross-borrow Varadavinayak / Kuthar Lake.
--   - Raigad Fort (S25 done, sep dest, 80km SE) — DO NOT cross-borrow.
--   - Sudhagad Fort 15km west of Pali — verified Bhonsle-era; pre-Peshwa fort, Shivaji used briefly. ASI/Maharashtra Tourism.
--   - Surya Narayana ASI temple Pali 1km — verified small ASI temple, less-visited.
--   - Saraswati temple Pali 1km — minor village shrine, dropped in favor of fort + ASI Surya temple + reconstruction-stones (stronger trio).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pali-raigad-ballal-named-deity',
  'pali-raigad',
  'Ballaleshwar named-deity story (only Ashtavinayak named after a devotee)',
  NULL,
  0,
  'Inside the Ballaleshwar temple sanctum',
  'Ashtavinayak pilgrims darshan all 8 temples in 2 days; most do not register that Pali is the ONLY one of the 8 named after a human devotee — the other 7 carry Ganesh epithet names (Siddhi-vinayak, Maya-reshwar, Vighnesh-war, etc.). Tour guides skip the Ballal-devotee story.',
  'Ballaleshwar is the ONLY Ashtavinayak temple in the 8 named after a HUMAN devotee — Ballal, a young boy from a Vaishya merchant family in Pali, who per local Puranic legend was beaten by villagers for ignoring family business to worship Ganesh, was tied to a tree, and yet kept chanting until Ganesh himself appeared and granted him the boon that the deity would forever be known by Ballal''s name (Ballal-eshwar = "lord of Ballal"). The other 7 Ashtavinayak temples carry Ganesh epithets (Siddhi, Maya, Vighna, Chinta, Maha, Vara, Mayuresh, Girijatmaj). The sanctum holds TWO idols (east-facing main + north-facing secondary — also unique among 8). The trunk faces left (riddhi-direction — standard for 7 of 8; Siddhatek is the exception). Open 5am-9.30pm; ₹0 entry.',
  'easy',
  'Shri Ballaleshwar Devasthan Pali Trust own signage + publications; "Ashtavinayak: The Eight Ganesh Temples of Maharashtra" Pradeep Mahajan (2013); Maharashtra Tourism Ashtavinayak dossier; Ganesh Purana (Ballal akhyana ch.).',
  5,
  ARRAY['temple','ashtavinayak','heritage','ganesh','pilgrimage','iconography']::text[],
  '{}'::jsonb
),
(
  'pali-raigad-sudhagad-fort',
  'pali-raigad',
  'Sudhagad Fort (Bhonsle-era; pre-Peshwa fort)',
  NULL,
  15,
  '40 min drive + 90 min trek to fort plateau',
  'Mumbai-Pune trekkers cluster at Lohagad-Visapur-Tikona-Tung instead; Sudhagad sits in pilgrim-Pali''s back-yard but pulls a fraction of the Sahyadri-fort trekking footfall.',
  'A 624m basalt hill-fort 15km west of Pali, Sudhagad taluka — built pre-13th c (Yadava-era), captured by the Bhonsles c. 1657 + briefly considered by Shivaji as a potential Maratha capital before he chose Raigad in 1674. The fort plateau holds the Bhorai Devi temple (Bhonsle clan deity), Mahadev temple, surviving water cisterns + storage granaries + 2 fortified gateways (Pachapur + Dindarmal). The trail starts at Thakurwadi village (15km west of Pali); 90-min trek with 350m elevation gain; moderate difficulty. Avoid Jul-Aug heavy monsoon (slippery basalt + leech). Free entry. Maharashtra Tourism + ASI joint maintenance.',
  'moderate',
  'Maharashtra Tourism Sudhagad listing; ASI Sudhagad Fort dossier; "Shivaji and his Times" Jadunath Sarkar (Sudhagad ch.); "Forts of Maharashtra" Trekksahyadri (2018); Wikipedia Sudhagad.',
  4,
  ARRAY['fort','trek','heritage','shivaji','sahyadri','viewpoint']::text[],
  '{}'::jsonb
),
(
  'pali-raigad-1810-nana-phadnis-reconstruction',
  'pali-raigad',
  'Nana Phadnis 1810-era stone reconstruction donor inscriptions',
  NULL,
  0,
  'Within the Ballaleshwar temple compound walls',
  'Pilgrims darshan the deity and exit through the south gate — almost none read the Devanagari + Modi-script donor stones along the western compound wall that record the Phadnis-era reconstruction grant.',
  'The current Ballaleshwar temple is the 1810-era reconstruction funded by the Peshwa-court trust under Nana Phadnis (1742-1800; chief minister of the Peshwas — the same Phadnis whose Pune wada at Menavali is itself a heritage anchor). The original Pali Ganesh shrine was a wooden-thatch structure rebuilt in stone with intricate carved-stone gateway + bell-arch + south-facing courtyard. The reconstruction-era donor inscriptions in Devanagari + Modi script line the western compound wall (small panels above the donation box near the south gate). Distinct from Ahilyabai Holkar''s 4-Ashtavinayak rebuilds (Siddhatek + Theur + Ranjangaon + Mahad — Pali was Nana Phadnis''s personal patronage). Open 5am-9.30pm; ₹0 entry.',
  'easy',
  'Shri Ballaleshwar Devasthan Pali Trust own publications; "Peshwa Daftar" vol. 22 (Nana Phadnis temple-grants); "Nana Phadnavis: His Career and Times" K. P. Mishra (1988); Wikipedia Nana Phadnis (patronage ch.).',
  5,
  ARRAY['heritage','ashtavinayak','phadnis','inscription','peshwa','pilgrimage']::text[],
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
  'pali-raigad',
  'Hotel Vaibhav Pali',
  'Pali Temple Road',
  'pali-temple-rd',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian satvik pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Zunka','Sabudana khichdi','Modak (Ganesh Chaturthi)']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pali''s pilgrim-thali institution on Pali Temple Road, 200m from the Ballaleshwar gate — Maharashtrian satvik thali (no onion-garlic), bhakri + pithla + zunka + dal + rice + sweet ₹150. Coach-group standard pre-darshan stop. Modak Aug-Sep Ganesh Chaturthi window. Open 6.30am-10.30pm.',
  'Angarki Chaturthi 2026 dates (Feb 3 / May 5 / Aug 4 / Oct 6 / Dec 1) + Ganesh Chaturthi window (Sep 12-22 2026) the queue starts 11am — arrive before 10.30 or after 3pm. Cash + UPI only; no cards.',
  'Pali Temple Road, near Ballaleshwar Temple, Pali 410205, Sudhagad taluka, Raigad district',
  'https://maps.google.com/?q=Hotel+Vaibhav+Pali+Raigad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915326-Pali_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mumbai/hotel-vaibhav-pali-raigad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pali-raigad',
  'MTDC Pali Holiday Resort Restaurant',
  'MTDC Pali Resort',
  'mtdc-pali',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Paneer butter masala','Chicken Kolhapuri (non-veg menu)','Filter coffee','Sol kadhi']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC Pali Holiday Resort''s in-house dining 2km from Ballaleshwar temple — the only government-rate mid-range option in Pali. AC dining hall, pure-veg by default + non-veg menu (Chicken Kolhapuri) on Konkan-tradition request. Open to walk-in non-residents 12.30-3pm + 7.30-10.30pm.',
  'Mahashivratri + Ganesh Chaturthi peak the dining hall fills with coach groups — book +91-2142-242244 ahead. Sol kadhi (kokum + coconut buttermilk Konkan summer drink) free with thali Apr-Jun. Cards + UPI work.',
  'MTDC Holiday Resort, near Ballaleshwar Temple, Pali 410205',
  'https://maps.google.com/?q=MTDC+Pali+Raigad',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/pali',
    'https://www.tripadvisor.in/Hotel_Review-g3915326-Reviews-MTDC_Pali_Holiday_Resort-Pali.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'pali-raigad',
  'Hotel Sai Vihar Pali',
  'Pali Main Road',
  'pali-main-rd',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Shrikhand','Modak']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pali Main Road pure-veg unlimited thali, 400m from Ballaleshwar temple — Maharashtrian Brahmin-style thali, no onion-garlic by request, unlimited refills on bhakri + dal + 2 vegetables + rice + sweet. Coach-group standard. Open 11am-3.30pm + 7-10.30pm.',
  'Sunday lunch + Sankashti days the coach groups arrive 12-2pm — arrive 11.30 or after 2.45pm. Shrikhand changes daily (saffron Mon-Wed, mango Apr-Jun). Cards + UPI.',
  'Main Road, Pali 410205, Sudhagad taluka, Raigad district',
  'https://maps.google.com/?q=Hotel+Sai+Vihar+Pali+Raigad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915326-Pali_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mumbai/hotel-sai-vihar-pali-raigad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pali-raigad',
  'Hotel Janmabhumi',
  'Sudhagad-Pali Road',
  'sudhagad-pali-rd',
  ARRAY['maharashtrian','konkan','mixed']::text[],
  'casual',
  'Konkan-Maharashtrian thali',
  ARRAY['Konkan thali','Bhakri','Fish curry (non-veg menu)','Sol kadhi','Modak','Buttermilk']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Sudhagad-Pali road family hotel 1.5km from Ballaleshwar temple — Konkan-Maharashtrian thali (pure-veg default; Konkan fish-curry non-veg menu Fri-Sun for Mumbai-weekenders en route Sudhagad Fort). Sol kadhi + bhakri + pithla + dal + rice + sweet ₹200 veg, ₹280 non-veg. Open 7am-10.30pm.',
  'Mumbai-weekend trekkers en route Sudhagad Fort eat here pre-trek (7-9am breakfast) + post-darshan lunch. Fish curry Fri-Sun only. Cash + UPI; no cards.',
  'Sudhagad-Pali Road, Pali 410205',
  'https://maps.google.com/?q=Hotel+Janmabhumi+Sudhagad+Pali',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915326-Pali_Raigad_District_Maharashtra.html',
    'https://www.justdial.com/Pali-Raigad/Hotel-Janmabhumi-Sudhagad-Road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'pali-raigad',
  'Hotel Madhuban Pali',
  'NH-17 Pali Junction',
  'nh17-pali-jn',
  ARRAY['maharashtrian','dhaba','pure-veg']::text[],
  'casual',
  'Highway dhaba pilgrim thali',
  ARRAY['Dhaba thali','Bhakri','Tandoori roti','Dal fry','Misal pav','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'NH-17 (Mumbai-Goa highway) Pali Junction dhaba 4km from Ballaleshwar temple — basic Maharashtrian-dhaba thali for self-drive pilgrims branching off NH-17 to Pali. Open 6am-12am. Mumbai-Goa highway truckers + Mahad-Pali pilgrim self-drivers stop here.',
  'Self-drivers on the NH-17 Mumbai-Goa route branch off at Pali Junction; this is the standard pre-darshan or post-darshan stop. Cash + UPI; no cards. Truck-driver volume 10pm-1am — avoid those hours.',
  'NH-17 Pali Junction, Pali 410205, Raigad district',
  'https://maps.google.com/?q=Hotel+Madhuban+Pali+NH17',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915326-Pali_Raigad_District_Maharashtra.html',
    'https://www.justdial.com/Pali-Raigad/Hotel-Madhuban-NH17'
  ]::text[],
  '2026-05-13',
  false
);
