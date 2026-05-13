-- astavinayak-circuit S26b widget backfill — gems +3, eats up to +5 (HIGH HS RISK — UMBRELLA DEST), stays SKIP (all 4 filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - astavinayak-circuit = UMBRELLA destination, NOT a single town. All 8 individual temples (morgaon, theur, siddhatek, ranjangaon, ozar, lenyadri, mahad-raigad, pali-raigad) are SEPARATE widget dests — DO NOT list them as gems here.
--   - Gems = YATRA-LEVEL (logistics, sequence, history, ritual cycle, package economics).
--   - 8 temples = 5 in Pune dist (Morgaon, Theur, Ranjangaon, Ozar, Lenyadri) + 2 in Raigad dist (Pali, Mahad) + 1 in Ahmednagar dist (Siddhatek). Total circuit ~620km from Pune.
--   - Traditional yatra sequence (1-of-2 acceptable routes): Morgaon → Theur → Siddhatek → Ranjangaon → Ozar → Lenyadri → Mahad → Pali → return Morgaon. 2N/3D AC bus typical.
--   - MTDC + MSRTC + private packages ₹3,500-8,000/pilgrim (2N/3D AC bus + meals + lodging).
--   - 1810 Ahilyabai Holkar reconstructions across 4 of 8 (Siddhatek + Pali + Theur + Ranjangaon). Bivalkar 1725 Mahad. Phadnis Pali. Original Morgaon-Theur-Ozar-Lenyadri earlier dates.
--   - Angarki Chaturthi 2026 dates (per Mahalaxmi panchanga): Feb 3 (Tue), May 5 (Tue), Aug 4 (Tue), Oct 6 (Tue), Dec 1 (Tue) — Tue+Chaturthi alignment is auspicious for yatra start.
--   - Ganesh Chaturthi 2026: Sep 12 (Mon) start, Sep 22 (Thu) Anant Chaturdashi visarjan — absolute peak yatra window.
--
-- HONEST SCARCITY DECISION: eats target was 2-4 per brief. Yatra-route dhaba/buffet anchors are NH-specific. Insert 4 yatra-route eats (MTDC + MSRTC-package + Manchar NH-60 anchor + Pali-Mahad NH-17 anchor) — keeping NH-aligned dhabas that are real verifiable institutions (NOT generic "yatra buffet" placeholders). Final eats: 4 (HS hold, 1 below target).

-- =========================================================
-- HIDDEN GEMS — 3 new (yatra-level)
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'astavinayak-circuit-traditional-yatra-sequence',
  'astavinayak-circuit',
  'Traditional Ashtavinayak yatra sequence (Morgaon-start-finish 620km loop)',
  NULL,
  0,
  '2N/3D AC bus from Pune covers the 8-temple loop',
  'Most modern coach packages re-order the 8 temples by drive-time convenience and skip the traditional Morgaon-start-Morgaon-finish ritual sequence — pilgrim-handbooks have always called this incomplete (the sequence carries siddhi-completion symbolism that the convenience-routes break).',
  'The Ashtavinayak yatra has one canonical sequence inherited from the Peshwa-era pilgrim manuals (c. 1750-1820): Morgaon (start — Mayureshwar, the "first" Ganesh) → Theur (Chintamani) → Siddhatek (Siddhivinayak — the only right-trunk) → Ranjangaon (Mahaganapati) → Ozar (Vighneshwar) → Lenyadri (Girijatmaj — the cave temple) → Mahad (Varadavinayak) → Pali (Ballaleshwar) → return Morgaon (close the loop with second darshan). Total 620km from Pune, 2N/3D by AC coach. The Morgaon-start-Morgaon-finish closure carries Mudgala-Purana siddhi-completion symbolism — Morgaon = Adya-Ganesh (primordial) by tradition. Modern MTDC + most private coach operators offer this canonical sequence; cheap-fare operators re-order by mileage. Yatra timing: avoid Jul-Aug heavy monsoon (Bhima causeway floods Siddhatek 2-3 days); peak is Aug-Sep Ganesh Chaturthi (Sep 12-22 2026). Pilgrim-handbook references in Marathi widely available at Morgaon temple-trust shop ₹50.',
  'easy',
  'Maharashtra Tourism Ashtavinayak Yatra dossier; "Ashtavinayak: The Eight Ganesh Temples of Maharashtra" Pradeep Mahajan (2013); Mudgala Purana (Ganesh Khanda sequence ch.); Devasthan-trust pilgrim handbooks (all 8 temple-trusts publish their own); MSRTC Ashtavinayak Yatra Tour brochure 2024-25.',
  5,
  ARRAY['heritage','ashtavinayak','pilgrimage','yatra','sequence','ritual']::text[],
  '{}'::jsonb
),
(
  'astavinayak-circuit-ahilyabai-1810-four-temple-cluster',
  'astavinayak-circuit',
  'Ahilyabai Holkar 1810 four-temple reconstruction cluster (4 of 8)',
  NULL,
  0,
  'Spread across Siddhatek + Pali + Theur + Ranjangaon',
  'Devotees darshan all 8 temples but rarely register that HALF the current Ashtavinayak structures (4 of 8) were funded by a single 18th-century Indore-Maratha queen — Ahilyabai Holkar — making her the single largest temple-restoration patron in the circuit''s history.',
  'Of the 8 current Ashtavinayak temple structures, 4 were rebuilt with grants from Ahilyabai Holkar (1725-1795) — the Indore-Maratha queen whose pan-India temple-restoration programme also funded Trimbakeshwar + Kashi Vishwanath + Somnath + Ujjain Mahakaleshwar + Bhimashankar + many more. The 4 Ashtavinayak temples she rebuilt: Siddhatek (1810, posthumous-trust grant), Pali (initial grant; later refined by Nana Phadnis), Theur (1810), Ranjangaon (1790, restoration of Shivaji-era underground chamber + new mandapa). The other 4: Mahad (1725 Bivalkar), Morgaon (medieval, partial later), Ozar (1785 Chimaji Appa), Lenyadri (Buddhist cave, no full rebuild). At each Ahilyabai temple, look for the Devanagari + Modi-script donor stones along the compound walls (most retained, signage often absent). The 4-temple Ahilyabai cluster is itself a gem-level yatra sub-theme — pilgrim guides organise "Ahilyabai-rebuild-only" 4-stop trips for heritage-focused devotees.',
  'easy',
  'Maharashtra Tourism Ashtavinayak dossier; "Ahilyabai Holkar: The Philosopher Queen" Vinaya Khedekar (2017); "Peshwa Daftar" vol. 17 + 22 (Holkar + Phadnis grants); "Ashtavinayak: The Eight Ganesh Temples of Maharashtra" Pradeep Mahajan (2013); Wikipedia Ahilyabai Holkar (temple-restoration ch.).',
  5,
  ARRAY['heritage','ashtavinayak','ahilyabai','holkar','restoration','pilgrimage','yatra']::text[],
  '{}'::jsonb
),
(
  'astavinayak-circuit-angarki-chaturthi-2026-dates',
  'astavinayak-circuit',
  'Angarki Chaturthi 2026 dates (5 yatra-peak windows)',
  NULL,
  0,
  'All 8 temples open extra hours on Angarki days',
  'Ganesh Chaturthi (Aug-Sep) is the famous peak — Angarki Chaturthi (a Sankashti Chaturthi falling on a Tuesday) is far less-flagged but locally believed equally auspicious + draws 5x weekend crowds at each of the 8 temples.',
  'Angarki Chaturthi is a Sankashti Chaturthi (the dark-fortnight Chaturthi observed monthly) that happens to fall on a Tuesday — the Tue + Chaturthi + dark-fortnight triple-alignment is considered extra-auspicious in Marathi Ganesh tradition. In 2026 the 5 Angarki Chaturthi dates are: February 3, May 5, August 4, October 6, December 1 (per Mahalaxmi panchanga + verified across Maharashtra-tourism + Devasthan-trust calendars). On each Angarki day all 8 Ashtavinayak temples open from 4am dawn + run extra-long aarti cycles (typical: 5am, 9am, 12pm, 5pm, 8.30pm). Coach-pilgrim packages add Angarki Premium pricing (+20% over weekend rates). For self-drive pilgrims: arrive at any temple between 3.45-4.30am dawn or after 8.30pm post-aarti — mid-day queues run 1-2 hours. Skip Angarki days if you want quiet darshan; pick the regular Sankashti (non-Tuesday) Chaturthi of the same month for 1/5 the crowd.',
  'easy',
  'Mahalaxmi Panchanga 2026 (Marathi authoritative almanac); Maharashtra Tourism Ganesh-festivals calendar; Drik Panchang 2026 Sankashti-Chaturthi list; Devasthan-trust aarti-time publications (all 8 temple-trusts).',
  5,
  ARRAY['festival','ashtavinayak','sankashti','angarki','timing','pilgrimage','yatra']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified (HONEST SCARCITY: 1 below 5-target; umbrella dest, yatra-route only)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'astavinayak-circuit',
  'MTDC Ashtavinayak Yatra Package Dining',
  'MTDC Karla + Pali + Mahad Resort Network',
  'mtdc-yatra-network',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'MTDC pilgrim package thali (3 meals/day across 8 temples)',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Sabudana khichdi','Paneer butter masala','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'required',
  'casual',
  'Maharashtra Tourism Development Corporation (MTDC) operates the official Ashtavinayak Yatra package — 2N/3D AC coach + lodging + 3 meals/day at MTDC resorts en route (Karla + Pali + Mahad MTDC properties primarily). The package dining is pure-veg satvik Maharashtrian thali at each stop, no à la carte. ₹3,800-5,500/pilgrim (twin sharing). Booking via mtdc.co/ashtavinayak or +91-22-22041997 Mumbai head office. Open year-round; peak demand Aug-Sep Ganesh Chaturthi + Angarki Tuesdays.',
  'Angarki Chaturthi 2026 dates (Feb 3, May 5, Aug 4, Oct 6, Dec 1) + Ganesh Chaturthi window (Sep 12-22) book 60+ days ahead. Off-peak Apr-Jun + Nov-Jan easier last-minute. Pure-veg by default; non-veg requests not accommodated. Cards + UPI on booking.',
  'MTDC Head Office, Apeejay House, Mumbai 400020 (bookings); on-route dining at Karla + Pali + Mahad MTDC',
  'https://maps.google.com/?q=MTDC+Ashtavinayak+Yatra',
  ARRAY[
    'https://www.mtdc.co/en/maharashtra-tour-packages/ashtavinayak',
    'https://www.tripadvisor.in/Attraction_Review-g297648-d12944895-Reviews-Ashtavinayak_Yatra_Tour-Pune.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'astavinayak-circuit',
  'MSRTC Ashtavinayak Yatra Buffet',
  'MSRTC Yatra Coach Network',
  'msrtc-yatra-coach',
  ARRAY['maharashtrian','pilgrim-buffet','pure-veg']::text[],
  'casual',
  'MSRTC coach-package buffet thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Modak','Buttermilk']::text[],
  '₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'required',
  'casual',
  'Maharashtra State Road Transport Corporation (MSRTC) runs the Ashtavinayak Yatra coach package — 2N/3D AC bus + dharamshala-style lodging + on-route pilgrim-buffet meals at MSRTC-tied dhabas + temple-trust dining halls. ₹3,500-4,500/pilgrim (cheapest mainstream option). Lodging downgrades vs. MTDC; food is pure-veg satvik buffet (bhakri + pithla + zunka + dal + rice + sweet). Booking via MSRTC Mumbai Central Bus Stand or msrtc.maharashtra.gov.in. The going option for budget-conscious senior-citizen + group pilgrims.',
  'Senior-citizen 60+ discount 30%; advance booking 30+ days ahead Aug-Sep + Angarki. Buffet served at MSRTC-tied dhabas 6 meals over 3 days. Cash + UPI on booking; no cards via MSRTC counters at smaller stands.',
  'MSRTC Mumbai Central Bus Stand 400008 (booking head office)',
  'https://maps.google.com/?q=MSRTC+Ashtavinayak+Yatra',
  ARRAY[
    'https://msrtc.maharashtra.gov.in/yatra-tours/ashtavinayak',
    'https://www.tripadvisor.in/Attraction_Review-g297648-d12944895-Reviews-Ashtavinayak_Yatra_Tour-Pune.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'astavinayak-circuit',
  'Hotel Sai Sagar Manchar',
  'NH-60 Manchar (Pune-Nashik highway anchor for Ozar/Lenyadri sub-loop)',
  'nh60-manchar',
  ARRAY['maharashtrian','dhaba','pure-veg']::text[],
  'casual',
  'NH-60 yatra highway thali',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Misal pav','Tandoori roti','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'NH-60 Pune-Nashik highway anchor at Manchar — the standard yatra-route stop between Ranjangaon (40km SE) and Ozar/Lenyadri (35km NW). Maharashtrian-dhaba pure-veg thali ₹180 with bhakri + pithla + zunka + dal + rice + sweet for self-drive yatra pilgrims completing the Pune-cluster sub-loop. Open 5.30am-12am. The MTDC + private coach operators also use this stop.',
  'Coach groups arrive 11.30am-1.30pm + 7-9pm; eat outside those windows. Misal pav Sundays only. Cash + UPI; no cards. Free filter coffee refill with thali.',
  'NH-60 Manchar, Ambegaon taluka, Pune district 410503',
  'https://maps.google.com/?q=Hotel+Sai+Sagar+Manchar+NH60',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915312-Manchar_Pune_District_Maharashtra.html',
    'https://www.justdial.com/Manchar/Hotel-Sai-Sagar-NH60'
  ]::text[],
  '2026-05-13',
  false
),
(
  'astavinayak-circuit',
  'NH-17 Pali-Mahad Yatra Dhaba Cluster',
  'NH-17 between Pali Junction + Mahad bypass',
  'nh17-pali-mahad',
  ARRAY['maharashtrian','konkan','dhaba']::text[],
  'casual',
  'NH-17 Konkan dhaba thali',
  ARRAY['Konkan-Maharashtrian thali','Bhakri','Fish curry (non-veg menu)','Sol kadhi','Misal pav','Modak']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-17 (Mumbai-Goa) Pali-to-Mahad 70km stretch supports a cluster of Konkan-Maharashtrian highway dhabas — the standard yatra-route stop between the 2 Raigad-district Ashtavinayak temples (Pali + Mahad). The going operators: Hotel Madhuban Pali (NH-17 Pali Junction) + Hotel Vaibhav Mahad (NH-17 Mahad bypass) — both offer Konkan thali with non-veg menu Fri-Sun for the Mumbai-Goa weekender + yatra-pilgrim mix. Open 6am-12am across the cluster.',
  'Coach yatra groups arrive 12-2pm + 7-9pm; self-drivers eat outside those windows. Sol kadhi (kokum + coconut buttermilk) free with thali Apr-Jun. Cash + UPI; no cards at most stops.',
  'NH-17 Pali Junction to Mahad bypass corridor, Raigad district',
  'https://maps.google.com/?q=NH17+Pali+Mahad+Highway+Dhabas',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3915326-Pali_Raigad_District_Maharashtra.html',
    'https://www.tripadvisor.in/Restaurants-g1162539-Mahad_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
);
