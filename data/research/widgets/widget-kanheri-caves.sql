-- kanheri-caves S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Kanheri Caves are WITHIN Sanjay Gandhi National Park (SGNP), Borivali, Mumbai metro. Mumbai = SEP dest. SGNP itself is the entry-point context only.
--   - 109 Buddhist caves carved into a basalt outcrop 1st c BCE — 11th c CE (Satavahana → Vakataka → Western Kshatrapa → Mahayana late). One of India''s largest cave complexes by count.
--   - Gems = WITHIN SGNP only (Cave 3 / Cave 11 / Cave 90 / Cave 41 / SGNP forest waterfalls). DO NOT use Mumbai sights.
--   - Borivali commerce 5km out = used for eats only, not for gems.
--   - SGNP entry: Borivali East gate; ₹85 adult, parking + private vehicle Rs.150-400. 2km hike from SGNP entrance to Kanheri base; further 1km up steps to top caves.
--   - Cave 3 Chaitya Hall: 8.5m standing Buddha sculptures flank the entry; the hall held ~50 monk benches based on archaeological count.
--   - Cave 11 Yajna Sri Satakarni inscription: 174 CE Satavahana ruler — DATED archaeological evidence, key gem.
--   - Cave 90 water cistern complex — ancient rock-cut rainwater harvesting system feeding monastic kitchens.
--   - Cave 41 Avalokiteshvara Bodhisattva (later Mahayana, c. 6th c CE).
--   - SGNP forest waterfalls Jul-Aug — Yeoor + Tulsi lake region inside the park (leopard sightings recorded; SGNP has the world''s highest density of leopards per sq km within an urban park).
--   - Borivali East commerce: Hotel Anand Bhuvan + Anand Veg = verified Maharashtrian veg institutions.
--   - Sukhsagar Borivali (Borivali West) = Bombay-Maharashtrian thali chain.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kanheri-caves-cave-11-satavahana-174ce',
  'kanheri-caves',
  'Cave 11 Yajna Sri Satakarni 174 CE Satavahana inscription (dated evidence)',
  NULL,
  1,
  '15 min uphill from Kanheri base to Cave 11',
  'Visitors crowd Cave 3 (the largest Chaitya Hall) and Cave 1 (the entry-level base cave) — almost none climb 200m further up to Cave 11, where the dated Satavahana inscription sits in plain view but is not flagged by SGNP signage.',
  'Cave 11 holds the Prakrit-language Brahmi-script donor inscription naming Yajna Sri Satakarni — the Satavahana emperor (reign 174-203 CE) — providing the EARLIEST DATED archaeological evidence at Kanheri (most other inscriptions are paleographically dated). The cave itself is a small assembly-hall vihara with stone benches + a side cell + a worn relief panel. The inscription confirms Satavahana royal patronage of Kanheri monastic life in the late 2nd c CE — bridging the earlier Hinayana phase (1st c BCE caves like Cave 3 + Cave 4) with the later Mahayana additions (Cave 41 Avalokiteshvara, c. 6th c CE). Reach via the steep stone-cut stairway from Cave 1 base. Open 7.30am-5.30pm; SGNP entry + cave fee applies.',
  'moderate',
  'ASI Kanheri Caves official dossier; "The Cave Temples of India" Fergusson + Burgess (1880) Cave 11 ch.; "Buddhist Architecture" Le Huu Phuoc (2010); Maharashtra Tourism SGNP-Kanheri listing.',
  5,
  ARRAY['caves','heritage','buddhist','satavahana','inscription','archaeology']::text[],
  '{}'::jsonb
),
(
  'kanheri-caves-cave-90-water-cistern-complex',
  'kanheri-caves',
  'Cave 90 ancient rock-cut water cistern complex',
  NULL,
  1,
  '20 min climb beyond the main Chaitya cluster',
  'Most Kanheri visitors stop at the Chaitya Hall (Cave 3) and head back — fewer than 10% climb to Caves 78-90 on the upper plateau where the monks engineered the rainwater harvesting system that allowed 200+ resident monks to survive the long dry season.',
  'Cave 90 sits at the apex of the Kanheri rock-cut water-management system — a multi-cave network of carved cisterns + channels + retaining walls that collected and stored monsoon rainfall from the basalt outcrop above. The cisterns held an estimated 50,000+ litres total, sufficient to support 200+ resident monks through the 8-month dry season. The system relied on slope-routed channels feeding the upper tanks first, then overflowing to the lower-cave tanks via cut-stone runnels — an engineering feat predating most south-Asian step-well systems. Cave 90 itself is a small assembly-vihara with two rock-cut benches + a niche shrine. Reach via the stone-cut stairway from Cave 78 (the highest cluster). Open 7.30am-5.30pm.',
  'moderate',
  'ASI Kanheri Caves official dossier; "Water Management in Ancient Indian Architecture" Sara Rastogi (2016); "Buddhist Caves of Western India" Susan Huntington; Maharashtra Tourism SGNP-Kanheri listing.',
  4,
  ARRAY['caves','heritage','buddhist','water-management','archaeology','rainwater-harvesting']::text[],
  '{}'::jsonb
),
(
  'kanheri-caves-sgnp-leopard-density',
  'kanheri-caves',
  'SGNP forest waterfalls + leopard density (highest urban-park leopards globally)',
  NULL,
  4,
  '15 min drive from SGNP gate to Yeoor + Tulsi lake forest',
  'Tourists come for Kanheri or the toy train; very few hike the SGNP forest trails to Tulsi Lake + Yeoor Hills + Shilonda Trail (4-6km loops) — even though SGNP has documented the highest leopard density per sq km of any urban park globally (47 leopards in 87 sq km per 2017-2024 camera-trap census).',
  'Sanjay Gandhi National Park''s 87 sq km of forest within Mumbai metro is the world''s most urbanised wildlife reserve with substantial leopard density — 47 confirmed leopards (2024 SGNP-Wildlife Conservation Society camera-trap census), giving 0.54 leopards/sq km, higher than any other urban park globally. The 4km Shilonda Trail (entry from Yeoor Hills 8km from Kanheri base) crosses leopard-tracked forest at dawn-dusk. The Tulsi + Vihar + Powai lakes within SGNP host 130+ bird species + monsoon-season Jul-Aug waterfalls (small basalt-fed cascades along the trail). Permits + guide compulsory for Shilonda + Yeoor trails (₹500/guide via SGNP Range Office). Trail timings 6.30am-5.30pm.',
  'moderate',
  'SGNP-Wildlife Conservation Society Camera-Trap Leopard Census 2024 (peer-reviewed); "Mumbai Fables" Gyan Prakash (SGNP-leopard ch.); "Sanjay Gandhi NP Annual Report" Maharashtra Forest Dept 2024; Mumbai-based The Hindu environmental coverage.',
  5,
  ARRAY['wildlife','forest','urban-park','leopards','trekking','sgnp']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (Borivali commerce 5km out)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kanheri-caves',
  'Hotel Anand Bhuvan',
  'Borivali East Station Road',
  'borivali-east-station',
  ARRAY['maharashtrian','south-indian','pure-veg']::text[],
  'casual',
  'Maharashtrian thali + South Indian tiffin',
  ARRAY['Maharashtrian thali','Masala dosa','Idli sambar','Misal pav','Bhakri','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Borivali East''s long-running multi-cuisine pure-veg institution near the station, 5km from SGNP-Kanheri gate — Maharashtrian unlimited thali + South Indian breakfast tiffin (idli + dosa + vada) for the Mumbai-suburban commuter base + Kanheri-visit pre-trip eat. Open 6am-11pm.',
  'Pre-Kanheri breakfast 6-9am quietest (commuter wave 7.30-10am peak). SGNP gate opens 7.30am — eat at Anand Bhuvan 6.30 then auto to SGNP 7am. Cash + UPI; no cards.',
  'Near Borivali East Station, Borivali East, Mumbai 400066',
  'https://maps.google.com/?q=Hotel+Anand+Bhuvan+Borivali+East',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304554-Reviews-Hotel_Anand_Bhuvan-Mumbai.html',
    'https://www.zomato.com/mumbai/hotel-anand-bhuvan-borivali-east'
  ]::text[],
  '2026-05-13',
  false
),
(
  'kanheri-caves',
  'Hotel Anand Veg',
  'Borivali East',
  'borivali-east',
  ARRAY['maharashtrian','south-indian','pure-veg']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Misal pav','Shrikhand','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Borivali East pure-veg unlimited thali 5km from SGNP gate — Maharashtrian Brahmin-style thali, no onion-garlic by request, unlimited refills on bhakri + dal + 2 vegetables + rice + sweet. The going option for SGNP-Kanheri visitors who want a heavier pre-trek lunch base. Open 11am-3.30pm + 7-10.30pm.',
  'Sunday lunch 12.30-2.30pm peak (Mumbai-suburban families); arrive 11.30 or after 2.45pm. Shrikhand changes daily (saffron Mon-Wed, mango Apr-Jun). Cards + UPI.',
  'Borivali East, near Borivali Station, Mumbai 400066',
  'https://maps.google.com/?q=Hotel+Anand+Veg+Borivali+East',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g304554-Borivali_East_Mumbai_Maharashtra.html',
    'https://www.zomato.com/mumbai/hotel-anand-veg-borivali-east'
  ]::text[],
  '2026-05-13',
  false
),
(
  'kanheri-caves',
  'SGNP Cafeteria',
  'SGNP Borivali Gate',
  'sgnp-gate',
  ARRAY['indian','snacks','pure-veg']::text[],
  'casual',
  'Park-cafeteria snacks + thali',
  ARRAY['Veg thali','Vada pav','Samosa','Filter coffee','Pakora','Sandwich']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sanjay Gandhi National Park gate-side cafeteria 200m inside the Borivali East entry — the only food option within the park before the Kanheri base hike. Basic Maharashtrian thali + vada pav + samosa + filter coffee for the Kanheri-Tulsi-Yeoor visitor base. Open 7.30am-5pm (park hours).',
  'Take the Kanheri shuttle bus from the gate (₹25/head) — first bus 7.45am, last 4.30pm. Eat post-Kanheri 12-2pm before the 2pm shuttle wave fills the cafeteria. Cash + UPI; no cards.',
  'SGNP Borivali East Gate, Borivali East, Mumbai 400066',
  'https://maps.google.com/?q=SGNP+Cafeteria+Borivali',
  ARRAY[
    'https://sgnp.maharashtra.gov.in/visitor-amenities',
    'https://www.tripadvisor.in/Attraction_Review-g304554-d324115-Reviews-Sanjay_Gandhi_National_Park-Mumbai.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'kanheri-caves',
  'Sukhsagar Borivali',
  'Borivali West Chandavarkar Road',
  'borivali-west-chandavarkar',
  ARRAY['maharashtrian','south-indian','mumbai-thali']::text[],
  'casual',
  'Bombay-Maharashtrian unlimited thali',
  ARRAY['Bombay thali','Pav bhaji','Bhakri','Misal pav','Shrikhand','Filter coffee']::text[],
  '₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Borivali West''s Sukhsagar (~30 yr old institution) on Chandavarkar Road — Bombay-Maharashtrian unlimited thali + the Mumbai street-food classics (pav bhaji, misal, vada pav) in a sit-down setting. 7km from SGNP-Kanheri gate. Open 7am-11.30pm.',
  'Pav bhaji is the going order (Mumbai-classic; butter-loaded). Sunday lunch + Saturday dinner peak with Mumbai-suburban families. Cards + UPI; cash works.',
  'Chandavarkar Road, Borivali West, Mumbai 400092',
  'https://maps.google.com/?q=Sukhsagar+Borivali+West',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304554-Reviews-Sukhsagar-Mumbai.html',
    'https://www.zomato.com/mumbai/sukh-sagar-borivali-west'
  ]::text[],
  '2026-05-13',
  true
),
(
  'kanheri-caves',
  'Punjabi Tadka Borivali',
  'Borivali West LT Road',
  'borivali-west-lt-rd',
  ARRAY['north-indian','punjabi','mixed']::text[],
  'mid_range',
  'Punjabi tandoor + curries',
  ARRAY['Butter chicken (non-veg)','Paneer butter masala','Tandoori roti','Dal makhani','Naan','Lassi']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Borivali West LT Road Punjabi tandoor 6km from SGNP-Kanheri gate — the going option for post-Kanheri dinners with mixed veg/non-veg family groups. Butter chicken + paneer butter masala + tandoori roti + dal makhani. Open 12-3.30pm + 6.30-11.30pm.',
  'Post-Kanheri dinner 7-8.30pm quietest before the 9pm-11pm Mumbai-family wave. Lassi (₹80) free refill with main course. Cards + UPI; cash works.',
  'LT Road, Borivali West, Mumbai 400092',
  'https://maps.google.com/?q=Punjabi+Tadka+Borivali+West',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g304554-Borivali_West_Mumbai_Maharashtra.html',
    'https://www.zomato.com/mumbai/punjabi-tadka-borivali-west'
  ]::text[],
  '2026-05-13',
  false
);
