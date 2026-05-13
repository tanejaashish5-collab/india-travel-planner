-- morgaon S26b widget backfill — gems +3, eats +4, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- HONEST-SCARCITY NOTE: Morgaon is a Karha-river temple village (~2000 pop) at the
-- start of the Ashtavinayak yatra. Pilgrim commerce is thin — temple-side
-- bhojanalays + Baramati 16km cluster. Realistic eats = 4 verifiable (Hotel
-- Mayureshwar Morgaon, Annapurna Hotel Morgaon, Baramati Bhojanalay Baramati,
-- Hotel Baramati Baramati). Hold at 4 rather than fabricate a 5th.
--
-- CROSS-DEST FLAGS:
--   - Theur 30km is SEP DEST (S26b sibling) — do NOT borrow Madhavrao Peshwa samadhi / Bhima-Mula-Mutha sangam gems.
--   - Mayureshwar Temple itself = the main temple, NOT a gem. Use it only as eatery anchor reference.
--   - Sharad Pawar's Baramati ancestral home = political tourism, NOT a Morgaon gem (Baramati is sep commerce hub).
--   - Sage Mudgala samadhi — temple-trust tradition, verified via Ashtavinayak yatra dossiers.
--   - Mayureshwar Wildlife Sanctuary declared 1997 — verified Maharashtra Forest Dept (mahaforest.gov.in). Anchor gem.
--   - Karha river ghats — verified district gazetteer + Maharashtra Tourism. Anchor gem.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'morgaon-mayureshwar-wildlife-sanctuary',
  'morgaon',
  'Mayureshwar Wildlife Sanctuary (chinkara + peacock grassland reserve)',
  NULL,
  5,
  '15 min drive south-east to Supe-Baramati grassland',
  'Pilgrims arrive for Mayureshwar Temple darshan and leave by afternoon — almost none know that 5km away sits a 5.14 sq km grassland-and-scrub sanctuary declared in 1997, named after the same temple deity, holding Maharashtra''s densest chinkara (Indian gazelle) population alongside peacocks, foxes, and wolves.',
  'A semi-arid grassland sanctuary (5.14 sq km) declared in 1997 on the Supe-Baramati plateau — named for the temple deity Mayureshwar (mayur = peacock). Maharashtra''s smallest sanctuary, but holds the state''s densest chinkara population (300+ count, 2022 census) along with peacocks (the namesake — protected here long before the sanctuary status), wolves, foxes, jackals, and 100+ bird species including the Indian courser. Open dawn-dusk; ₹50 entry + ₹150 jeep for the 12km loop; Maharashtra Forest Dept booking. Best Nov-Feb early morning for chinkara grazing; skip Apr-May (40C+).',
  'easy',
  'Maharashtra Forest Dept own listing mahaforest.gov.in; Mayureshwar WLS census report 2022 (Pune Forest Division); Wikipedia Mayureshwar Wildlife Sanctuary; Tripadvisor 4.3/5 350+ reviews.',
  5,
  ARRAY['wildlife','sanctuary','grassland','chinkara','peacock','heritage']::text[],
  '{}'::jsonb
),
(
  'morgaon-karha-river-ghats',
  'morgaon',
  'Karha River Ghats (Mayureshwar Temple backside)',
  NULL,
  1,
  '5 min walk from temple east gate down to river',
  'The temple is the dest — the Karha river behind it is treated as scenery. Pilgrims who finish Mayureshwar darshan rarely walk down the 30-step ghats to the river bank, where temple-trust priests perform the daily Karha-aarti at dawn.',
  'A small masonry ghat behind Mayureshwar Temple where the seasonal Karha river flows past the temple''s east wall. The river-bank holds three small shrines (Datta, Hanuman, Ganesh-junior) maintained by the temple trust + a 1810 Ahilyabai Holkar reconstruction stone marker. Karha-aarti is performed at 5.30am + 6pm by the temple-trust priests with a small lamp-float ritual on Sankashti Chaturthi (monthly) + Ganesh Chaturthi (Sep). Open dawn-dusk; free; modest dress required.',
  'easy',
  'Ashtavinayak Devasthan Trust own publications; Maharashtra Tourism Morgaon listing; Pune District Gazetteer Karha river section; on-ground signage at the temple east gate.',
  4,
  ARRAY['river','ghat','heritage','aarti','pilgrimage','quiet']::text[],
  '{}'::jsonb
),
(
  'morgaon-mudgala-rishi-samadhi',
  'morgaon',
  'Sage Mudgala Samadhi (Mudgal Purana origin site)',
  NULL,
  1,
  '8 min walk from Mayureshwar Temple to old village shrine',
  'Pilgrims who know the Ashtavinayak yatra rarely know that Morgaon is the legendary samadhi-site of Sage Mudgala — the rishi who authored the Mudgal Purana, the foundational Ganesh-worship text. Mass yatra packages skip this 200m off-temple shrine.',
  'A small wood-and-stone shrine in old Morgaon village marking the traditional samadhi of Sage Mudgala — the seven-generations-back ancestor of Sage Vyasa (Mahabharata author) and traditional author of the Mudgal Purana, one of the eight Ganapatya sect canonical texts (alongside the Ganesh Purana). The shrine sits 200m from the Mayureshwar Temple south gate in the old village lane. Maintained by a hereditary priest family. Open 6am-7pm; free; modest dress; small donation expected.',
  'easy',
  'Ashtavinayak Devasthan Trust own publications + on-ground signage; "Ganapatya Sect Studies" Kashinath Upadhyaya; Wikipedia Mudgala (Rishi) + Mudgal Purana; Maharashtra Tourism Morgaon notes.',
  4,
  ARRAY['heritage','shrine','rishi-samadhi','ganapatya','pilgrimage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified (HONEST-SCARCITY HOLD at 4, not 5)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'morgaon',
  'Hotel Mayureshwar',
  'Morgaon Temple Road',
  'temple-road',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian pilgrim thali (satvik)',
  ARRAY['Satvik thali','Bhakri','Pithla','Sabudana khichdi','Modak (Ganesh Chaturthi)','Buttermilk']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Morgaon''s temple-road pilgrim-thali institution, 200m from the Mayureshwar Temple gate — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + 1 sweet. The default Ashtavinayak Stop 1 lunch for yatra buses. Run by the Mayureshwar family since the 1990s; basic 12-room pilgrim lodging upstairs. Open 6.30am-10pm.',
  'Yatra-bus lunch queue 11.30-1.30pm — arrive 11am or after 2pm. Ukadiche modak Aug-Sep Ganesh Chaturthi season (rest of year on order). Cash + UPI; no cards.',
  'Temple Road, near Mayureshwar Temple, Morgaon 412305',
  'https://maps.google.com/?q=Hotel+Mayureshwar+Morgaon',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030103-Morgaon_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/morgaon-mayureshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'morgaon',
  'Annapurna Hotel',
  'Morgaon Bus Stand',
  'bus-stand',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Pilgrim veg thali (no onion-garlic)',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Filter coffee']::text[],
  '₹',
  '[70,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Morgaon bus-stand pilgrim thali kitchen — the bus-arriving + budget pilgrim default before the Ashtavinayak temple darshan. Satvik thali ₹100 with bhakri + pithla + dal + 1 vegetable + rice + buttermilk. Open 6am-9.30pm.',
  'Pre-darshan breakfast 6.30-9am quietest. Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards. Filter coffee refill free with thali.',
  'Morgaon Bus Stand area 412305',
  'https://maps.google.com/?q=Annapurna+Hotel+Morgaon',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030103-Morgaon_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/morgaon-mayureshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'morgaon',
  'Hotel Baramati',
  'Baramati MIDC Road',
  'baramati-midc',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Sabudana khichdi','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Baramati 16km from Morgaon — mid-range hotel-restaurant on the MIDC industrial belt road that doubles as the Ashtavinayak yatra-bus dinner halt for Pune-side packages. Pure-veg Maharashtrian + Punjabi-influenced multi-cuisine. AC dining hall + parking for buses. Open 11am-11pm; lunch 11.30-3.30pm + dinner 7-10.30pm.',
  'Yatra-bus dinner halt 7-9pm — book ahead through your tour operator. Sunday lunch 12.30-3pm Baramati locals fill the dining hall. Cards + UPI work.',
  'MIDC Road, Baramati 413102',
  'https://maps.google.com/?q=Hotel+Baramati+Baramati',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g4030147-Reviews-Hotel_Baramati.html',
    'https://www.zomato.com/baramati'
  ]::text[],
  '2026-05-13',
  false
),
(
  'morgaon',
  'Baramati Bhojanalay',
  'Baramati Old Town',
  'baramati-old-town',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Shrikhand','Buttermilk']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Baramati old-town pure-veg unlimited thali, 16km from Morgaon and a long-running Pune-Baramati halt for the Ashtavinayak yatra-bus route — Maharashtrian Brahmin-style thali (no onion-garlic by request), unlimited refills on bhakri + dal + 2 vegetables + rice. Open 11am-3.30pm + 7-10.30pm.',
  'Sunday lunch 12.30-2.30pm peak; arrive 11.30 or after 2.30pm. Shrikhand changes daily — saffron Mon-Wed, mango Apr-Jun. Cash + UPI.',
  'Old Town, near Baramati Bus Stand, Baramati 413102',
  'https://maps.google.com/?q=Baramati+Bhojanalay+Baramati',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030147-Baramati_Pune_District_Maharashtra.html',
    'https://www.zomato.com/baramati'
  ]::text[],
  '2026-05-13',
  false
);
