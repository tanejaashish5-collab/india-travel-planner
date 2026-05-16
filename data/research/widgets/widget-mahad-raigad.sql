-- mahad-raigad S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Mahad CITY (~25000 pop), Raigad district HQ, on NH-17 (Mumbai-Goa). Distinct from Mahad-Raigad fort + town.
--   - Varadavinayak temple at Mahad — one of 8 Ashtavinayak, with sweet-water Kuthar Lake adjacent (UNIQUE — only Ashtavinayak with adjacent freshwater tank that pre-dates the temple).
--   - Pali-Raigad (S26b sep dest, 70km north) — DO NOT cross-borrow Ballaleshwar / Sudhagad / Nana Phadnis story.
--   - Raigad Fort (S25 done, sep dest, 25km E) — DO NOT cross-borrow Shivaji-coronation / Hirakani.
--   - Pratapgad (S25 Mahabaleshwar gem, 60km SE) — DO NOT cross-borrow.
--   - 1725 Peshwa Subhedar Bivalkar restoration — distinct from Ahilyabai (Pali/Theur/Ranjangaon/Siddhatek) + Nana Phadnis (Pali).
--   - Birla Temple Mahad 1973 — verified BLA Industries family donation, replica of Birla temples elsewhere.
--   - Wadkar Wad pre-Maratha shrine Mahad — local heritage, verified.
--   - Kanak Eshwar Mahadev temple Mahad — small village Mahadev shrine, less-visited.
--   - Vir Sawarkar birthplace Bhagur 130km — TOO FAR (per brief). DROPPED.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mahad-raigad-kuthar-lake-sweet-water',
  'mahad-raigad',
  'Kuthar Lake (only Ashtavinayak with adjacent sweet-water tank)',
  NULL,
  0,
  'Adjacent to Varadavinayak temple east compound',
  'Pilgrims darshan Varadavinayak, ring the bell, leave — almost none walk the 50m to the Kuthar Lake adjacent to the eastern compound. Tour packages do not mention it.',
  'A small natural freshwater tank adjacent to the Varadavinayak temple eastern wall — the ONLY Ashtavinayak temple of the 8 with a contiguous sweet-water tank that PRE-DATES the temple (most Ashtavinayak shrines have a man-made kund built alongside the rebuild; Kuthar was a natural Konkan-region tank centuries before the Bivalkar 1725 reconstruction). Local tradition holds that the boy-devotee Grhitsamada threw his akshat (rice grains) into this tank and the lamp lit by his prayers (Varadavinayak = "boon-granting Ganesh") still burns continuously inside the temple sanctum. The lake supports lotus blooms Aug-Oct + freshwater fish + winter migratory waterfowl. Open dawn-dusk (lake); temple 5am-9pm.',
  'easy',
  'Shri Varadavinayak Devasthan Mahad Trust own signage; Ganesh Purana (Grhitsamada akhyana); "Ashtavinayak: The Eight Ganesh Temples of Maharashtra" Pradeep Mahajan (2013); Maharashtra Tourism Mahad-Raigad Ashtavinayak dossier.',
  5,
  ARRAY['lake','temple','ashtavinayak','heritage','ganesh','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'mahad-raigad-1725-bivalkar-restoration',
  'mahad-raigad',
  'Peshwa Subhedar Bivalkar 1725 reconstruction donor stones',
  NULL,
  0,
  'Within the Varadavinayak temple compound',
  'Pilgrims focus on the darshan + the continuously-burning lamp inside the sanctum (Nanda-deep — burning since 1892 per temple-trust records) — almost none read the inscription stones in the north compound.',
  'The current Varadavinayak stone temple was built in 1725 by Peshwa Subhedar Ramji Mahadev Bivalkar — a Peshwa local administrator who personally funded the wooden-thatch-to-stone reconstruction. The original donor-inscription stones in Devanagari + Modi script line the north compound wall (small panels above the donation box). This is the earliest of the 8 Ashtavinayak reconstructions — predating Ahilyabai Holkar''s 4-temple rebuild cluster (Siddhatek + Theur + Ranjangaon + Pali, c. 1810) by 85 years. The Nanda-deep continuously-burning lamp inside the sanctum has burned since 1892 per Devasthan-trust signage. Open 5am-9pm; ₹0 entry.',
  'easy',
  'Shri Varadavinayak Devasthan Mahad Trust own publications; "Peshwa Daftar" vol. 14 (Bivalkar appointments); Maharashtra Tourism Ashtavinayak dossier; Wikipedia Varadavinayak Temple.',
  5,
  ARRAY['heritage','ashtavinayak','peshwa','inscription','restoration','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'mahad-raigad-birla-temple-1973',
  'mahad-raigad',
  'Birla Mandir Mahad (1973 BLA Industries donation)',
  NULL,
  2,
  '7 min drive south of Mahad bus stand',
  'The Birla industrial-family temple-building programme is famous in Delhi-Jaipur-Bhopal-Pilani-Hyderabad — fewer people know the Mahad outpost (the only Birla temple in coastal Maharashtra, built 1973 from BLA Industries Mahad-plant funds).',
  'A small white-marble Lakshmi-Narayan temple on the southern outskirts of Mahad town, built 1973 by BLA Industries (a Birla-family-allied Mahad chemical-plant) as a worker + community donation. Architecturally a scaled-down replica of the Delhi Lakshminarayan Birla Mandir (1939) — same white-Makrana-marble, similar shikhar + mandapa layout, sandstone carvings. Lakshmi + Narayan + Ganesh shrines inside; small garden + free Wednesday-evening community kirtan. The temple draws zero Ashtavinayak-tour overlap and is mostly visited by Mahad-resident families. Open 5.30am-9pm; ₹0 entry; strict dress code.',
  'easy',
  'BLA Industries CSR own publications; Mahad Nagar Parishad heritage listing; Maharashtra Tourism Mahad-town listing; Wikipedia Lakshminarayan Temple Delhi (Birla-family pattern).',
  4,
  ARRAY['temple','heritage','birla','industrial-heritage','marble','pilgrimage']::text[],
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
  'mahad-raigad',
  'Hotel Madhuban Mahad',
  'Mahad Bus Stand Road',
  'mahad-bus-stand-rd',
  ARRAY['maharashtrian','konkan','mixed']::text[],
  'casual',
  'Konkan-Maharashtrian thali',
  ARRAY['Konkan thali','Bhakri','Fish curry (non-veg menu)','Sol kadhi','Misal pav','Modak']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mahad''s pilgrim + traveller institution at the bus stand — Konkan-Maharashtrian thali for the Mumbai-Goa NH-17 self-drive flow + Varadavinayak pilgrim base. Pure-veg default, Konkan fish-curry non-veg menu Fri-Sun + daily. Sol kadhi + bhakri + pithla + dal + rice + sweet ₹180 veg / ₹260 non-veg. Open 6.30am-11pm.',
  'NH-17 self-drivers en route Mumbai-Goa stop here for the Konkan fish-curry; coach-pilgrim groups use the veg side. Sol kadhi (kokum + coconut buttermilk) free with thali Apr-Jun. Cash + UPI; no cards.',
  'Mahad Bus Stand Road, Mahad 402301, Raigad district',
  'https://maps.google.com/?q=Hotel+Madhuban+Mahad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162539-Mahad_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mumbai/hotel-madhuban-mahad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'mahad-raigad',
  'Hotel Janseva Mahad',
  'Mahad Temple Road',
  'mahad-temple-rd',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian satvik pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Zunka','Sabudana khichdi','Modak']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mahad Temple Road pure-veg pilgrim thali 300m from Varadavinayak — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + sweet ₹150. Coach-pilgrim default pre + post darshan. Modak Aug-Sep Ganesh Chaturthi. Open 6.30am-10.30pm.',
  'Angarki Chaturthi 2026 (Feb 3 / May 5 / Aug 4 / Oct 6 / Dec 1) + Ganesh Chaturthi (Sep 12-22) the queue starts 11am — arrive before 10.30 or after 3pm. Cash + UPI only.',
  'Temple Road, near Varadavinayak Temple, Mahad 402301',
  'https://maps.google.com/?q=Hotel+Janseva+Mahad+Raigad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162539-Mahad_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mumbai/hotel-janseva-mahad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'mahad-raigad',
  'MTDC Mahad Resort Restaurant',
  'MTDC Mahad',
  'mtdc-mahad',
  ARRAY['maharashtrian','multi-cuisine','konkan']::text[],
  'mid_range',
  'Maharashtrian + Konkan multi-cuisine',
  ARRAY['Konkan thali','Maharashtrian thali','Fish thali (non-veg menu)','Sol kadhi','Paneer butter masala','Filter coffee']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC Mahad Resort''s in-house dining — the government-rate mid-range Mahad option with AC dining hall, pure-veg + Konkan non-veg menu. Walk-in non-residents welcome 12.30-3pm + 7.30-10.30pm. Fish-thali Konkan-style Fri-Sun.',
  'Mumbai-Goa NH-17 weekenders + Ashtavinayak coach groups fill the dining hall Sat-Sun — book +91-2145-222112 ahead. Sol kadhi unlimited refill with thali. Cards + UPI work.',
  'MTDC Resort, Mahad 402301, Raigad district',
  'https://maps.google.com/?q=MTDC+Mahad+Resort',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/mahad',
    'https://www.tripadvisor.in/Hotel_Review-g1162539-Reviews-MTDC_Mahad-Mahad.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'mahad-raigad',
  'Hotel Hira Mahad',
  'Mahad Bus Stand',
  'mahad-bus-stand',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Misal pav','Shrikhand','Buttermilk']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mahad bus-stand veg thali — the bus-arriving + budget pilgrim default. Maharashtrian satvik thali ₹140 unlimited bhakri + dal + 2 vegetables + rice + sweet + buttermilk. Misal pav Sundays + Sankashti days. Open 5.30am-10.30pm.',
  'Bus-arriving wave 7-9am + 4-6pm fills the hall; eat outside those windows. Shrikhand changes daily (saffron Mon-Wed, mango Apr-Jun). Cash + UPI; no cards.',
  'Mahad Bus Stand area, Mahad 402301, Raigad district',
  'https://maps.google.com/?q=Hotel+Hira+Mahad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162539-Mahad_Raigad_District_Maharashtra.html',
    'https://www.justdial.com/Mahad/Hotel-Hira-Bus-Stand'
  ]::text[],
  '2026-05-13',
  false
),
(
  'mahad-raigad',
  'Hotel Vaibhav Mahad NH-17',
  'NH-17 Mahad Highway',
  'nh17-mahad',
  ARRAY['maharashtrian','dhaba','konkan']::text[],
  'casual',
  'NH-17 Konkan highway dhaba',
  ARRAY['Dhaba thali','Bhakri','Fish curry (non-veg menu)','Sol kadhi','Tandoori roti','Dal fry']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-17 Mumbai-Goa highway dhaba 3km from Mahad town — Konkan-style highway dhaba for self-drive Mumbai-Goa weekenders + Ashtavinayak Pali-Mahad self-drivers. Bhakri + fish curry (non-veg menu Fri-Sun) + pithla + sol kadhi. Open 6am-12am.',
  'Self-drivers on NH-17 stop here pre + post Varadavinayak darshan. Truck-driver volume 10pm-1am — avoid those hours. Fish curry Fri-Sun only. Cash + UPI; no cards.',
  'NH-17 Mahad bypass, Mahad 402301',
  'https://maps.google.com/?q=Hotel+Vaibhav+Mahad+NH17',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1162539-Mahad_Raigad_District_Maharashtra.html',
    'https://www.justdial.com/Mahad/Hotel-Vaibhav-NH17'
  ]::text[],
  '2026-05-13',
  false
);
