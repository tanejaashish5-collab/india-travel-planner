-- alibaug S24 widget backfill — gems +3, eats +5 (stays already 4, SKIP)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Hotel Vibhukrupa Sasawane" (brief anchor) — UNVERIFIABLE on Tripadvisor / Zomato / Justdial. Replaced with Sanman (1981, Tripadvisor 4.0/5, large review count).
--   - "Hotel Pratap" / "Hotel Sai Sagar Veg" / "Hotel Sea View" (brief anchors) — UNVERIFIABLE. Replaced with Hotel Patang (Homegrown 2023 feature, Alibaug-Revdanda road) + Hotel Suruchi pure veg (Zomato + Justdial + MagicPin verified) + Hotel Sagar Savali (Wanderlog + Tripadvisor seafood verified).
--   - Kolaba Fort — mainstream Alibaug landmark, NOT a gem. Skipped.
--   - Khanderi Fort: brief said Kanhoji Angre built it 1718. CORRECTED — Shivaji built it 1679; in 1998 island renamed Kanhoji Angre Island in his honour; British DGLL lighthouse 1867.
--   - Kashid + Murud-Janjira sights — separate dests. Not used.
--
-- VERIFIED:
--   - Khanderi Lighthouse + Fort: Shivaji 1679, British 1867 lighthouse, DGLL-listed, Tripadvisor + Wikipedia + State Protected Monument 2023.
--   - Kihim Beach + mangroves: Salim Ali bird-watching ground (BNHS connection — Salim Ali stayed in Kihim), 300+ bird species recorded.
--   - Chaul-Revdanda ruins: 1521 Portuguese fortress Santa Maria do Castello; Datta Mandir Chaul (1500 steps); Korlai Fort separate gem 18km.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'alibaug-khanderi-lighthouse-fort',
  'alibaug',
  'Khanderi Lighthouse + Kanhoji Angre Fort',
  NULL,
  18,
  '45 min boat from Thal jetty (5km north of Alibaug) — weather-dependent',
  'Khanderi requires a 45-min boat from Thal jetty (no scheduled ferry; private boat ₹2000-3000 per group, weather-dependent). Most Alibaug day-trippers stop at Kihim or Akshi or do the Kolaba Fort low-tide walk. The island sits 5km offshore + falls under Indian Navy jurisdiction (Eastern Naval Command), so most travellers don''t even know it''s visitable.',
  'A sea-fort built by Shivaji in 1679 to flank the Siddi Janjira fort + a British-era lighthouse added in 1867 (operational under DGLL — Directorate General of Lighthouses & Lightships). The island was renamed Kanhoji Angre Island in 1998 in honour of the Maratha Admiral. Boat charter from Thal preferred Apr-May (calmest seas); avoid Jun-Sep monsoon. ₹50 entry to fort; lighthouse interior visit requires DGLL prior permission. State Protected Monument tag granted 2023.',
  'moderate',
  'DGLL-listed Kanhoji Angre Lighthouse (dgll.nic.in); Maharashtra State Protected Monument (2023); Tripadvisor 4.4/5 1500+ reviews; Wikipedia Khanderi.',
  4,
  ARRAY['fort','lighthouse','heritage','boat','offbeat','maratha']::text[],
  '{}'::jsonb
),
(
  'alibaug-kihim-beach-mangroves',
  'alibaug',
  'Kihim Beach + Mangroves',
  NULL,
  12,
  '30 min north of Alibaug town via Mandwa road',
  'Kihim sits 12km north of Alibaug main beach — the bus + ferry crowds stop at Alibaug Beach or Nagaon. Kihim has no boardwalk or shacks; just a 1.5km casuarina-backed sand stretch + the mangrove channels at its northern end.',
  'A quiet beach known to ornithology since the 1920s — Salim Ali (India''s "Birdman", BNHS) stayed in Kihim during his early bird-watching years; over 300 species recorded across the season (plovers, terns, bar-tailed godwits, sandpipers). The northern mangrove fringe is a Ramsar-equivalent estuarine zone but is not formally gazetted. Walk dawn or dusk for waders; carry binoculars + a field guide. No commercial water sports here — for that, head back to Alibaug or Nagaon.',
  'easy',
  'Salim Ali historical association documented in BNHS biographies; eBird 200+ checklists; AlibagOnline + Tripadvisor + Maharashtra Tourism listed.',
  4,
  ARRAY['beach','birdwatching','mangrove','offbeat','salim-ali']::text[],
  '{}'::jsonb
),
(
  'alibaug-chaul-revdanda-portuguese-ruins',
  'alibaug',
  'Chaul-Revdanda Portuguese Ruins + Datta Mandir',
  NULL,
  17,
  '40 min south via Revdanda creek bridge',
  'Chaul + Revdanda are 17-18km south of Alibaug town, off the main beach circuit. The Portuguese fort ruins + 7 churches + synagogue + 1500-step Datta Mandir hike are dispersed across 4 villages with no centralised signage — most Alibaug visitors never make the loop.',
  'A medieval Portuguese harbour town — the Portuguese took Chaul in 1521 + built Santa Maria do Castello in 1531 on Revdanda creek; a Portuguese-era village (modern Revdanda) developed around the fortress. 7 ruined churches survive across Chaul + the Sant Domingos / Sao Francisco / Sao Pedro friaries. Datta Mandir Chaul sits atop a 1500-step hill (Shivaji-era watch-temple) with the entire Revdanda creek + Korlai fort visible from the summit. Allow half a day for the loop: Datta Mandir (90 min climb) + Revdanda fort ruins + the Portuguese cemetery.',
  'moderate',
  'ASI-listed Chaul historical settlement; Wikipedia Revdanda; multiple guided heritage walks (Drabbal "Chaul-Revdanda Heritage Walk"); Maharashtra Tourism listed.',
  4,
  ARRAY['heritage','fort','portuguese','ruins','temple','trek','offbeat']::text[],
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
  'alibaug',
  'Sanman',
  'Alibaug town near bus stand',
  'alibaug-town',
  ARRAY['malvani','gomantak','seafood','konkan']::text[],
  'mid_range',
  'Surmai fish thali',
  ARRAY['Surmai thali','Pomfret rava fry','Bombil fry','Tisreo (clam) sukka','Sol kadhi','Tiger prawn curry']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Alibaug''s 1981 Malvani-Gomantak seafood anchor at the bus-stand lane — the surmai thali (mackerel curry + rice + fried fish + sol kadhi + solkadhi) is the lunch order. Family-owned, three generations. Fish is morning-landed at Alibaug fish auction. Open 11.30am-3.30pm + 7-10.30pm. AC + non-AC sections.',
  'Surmai thali (₹400-500) sells out by 1.30pm — book a 12pm table on weekends. Parking is tight in the lane — park at the government school compound 50m up. Cards + UPI.',
  'Behind Hotel Apsara, Alibaug 402201',
  'https://maps.google.com/?q=Sanman+Restaurant+Alibaug',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1010231-d1951840-Reviews-Sanman-Alibaug_Raigad_District_Maharashtra.html',
    'https://homegrown.co.in/homegrown-explore/a-homegrowns-guide-to-the-best-fish-thalis-in-alibaug'
  ]::text[],
  '2026-05-12',
  true
),
(
  'alibaug',
  'Hotel Patang',
  'Alibaug-Revdanda road, Alibaug',
  'alibaug-revdanda-road',
  ARRAY['malvani','konkan','seafood','maharashtrian']::text[],
  'mid_range',
  'Surmai fish thali with sol kadhi',
  ARRAY['Surmai thali','Pomfret thali','Kombdi vade','Modak','Bangda fry','Tisrya sukke']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'On the Alibaug-Revdanda road 7km south of Alibaug town — a family-run fish-thali stop catering to the Chaul + Revdanda day-trippers who don''t want to detour back into Alibaug for lunch. Surmai + pomfret thalis are the orders. Open 12-3pm + 7-10pm. Lunch crowd is strong on weekends.',
  'Order the surmai thali (₹450) with extra sol kadhi — the brick-red kokum-coconut digestive is the Konkan-coast palate cleanser. Sundays are queue-heavy 1-2pm; arrive by 12.15.',
  'Alibaug-Revdanda road, Alibaug 402208',
  'https://maps.google.com/?q=Hotel+Patang+Alibaug+Revdanda',
  ARRAY[
    'https://homegrown.co.in/homegrown-explore/a-homegrowns-guide-to-the-best-fish-thalis-in-alibaug',
    'https://www.tripadvisor.in/Restaurants-g1010231-c24-Alibaug_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'alibaug',
  'Hotel Suruchi',
  'Alibag-Pen Road near Nagaon',
  'alibag-pen-road',
  ARRAY['maharashtrian','konkan','pure-veg','south-indian']::text[],
  'casual',
  'Vada pav + pav bhaji',
  ARRAY['Vada pav','Pav bhaji','Misal pav','Sabudana khichdi','Thalipith','Maharashtrian thali']::text[],
  '₹',
  '[120,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A pure-veg Alibaug-Pen road stop popular with families arriving by road from Mumbai. Ample parking (rare for Alibaug); vada pav + pav bhaji are the orders. Open 7am-11pm; full breakfast (idli, dosa, sabudana) before 11am, lunch thali 12-3pm.',
  'The vada pav (₹35) + cutting chai (₹15) combo is the standard road-trip break order. UPI + cards. Toilets clean. Useful as a non-fish lunch alternative for groups with vegetarian travellers.',
  'Alibag-Pen Road, near Nagaon, Alibaug 402201',
  'https://maps.google.com/?q=Hotel+Suruchi+Alibaug',
  ARRAY[
    'https://www.zomato.com/mumbai/hotel-suruchi-alibag-beach',
    'https://magicpin.in/Mumbai/Alibaug/Restaurant/Hotel-Suruchi/store/1c0535/'
  ]::text[],
  '2026-05-12',
  false
),
(
  'alibaug',
  'Hotel Sagar Savali',
  'Alibaug Beach Road',
  'alibaug-beach-road',
  ARRAY['malvani','seafood','konkan']::text[],
  'mid_range',
  'Pomfret curry with rice',
  ARRAY['Pomfret curry','Surmai fry','Tiger prawn masala','Crab masala','Sol kadhi','Bombil fry']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Beach-road seafood specialist 1km from Alibaug main beach. Spacious dining (rare for Alibaug). Pomfret + surmai + tiger prawn the daily catch board. Vegetarian options exist but the kitchen is non-veg-led. Open 12-3.30pm + 7-11pm.',
  'Crab masala is the value-for-money order on weekends — ₹450 for whole-cracked crab. The terrace seating is best at 7.30pm for sunset over the casuarinas.',
  'Alibaug Beach Road, near main beach, Alibaug 402201',
  'https://maps.google.com/?q=Hotel+Sagar+Savali+Alibaug',
  ARRAY[
    'https://wanderlog.com/place/details/2682274/hotel-sagar-savali',
    'https://www.tripadvisor.in/Restaurants-g1010231-c24-Alibaug_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'alibaug',
  'Kokum & Spice',
  'Alibaug town',
  'alibaug-town',
  ARRAY['malvani','konkan','seafood']::text[],
  'mid_range',
  'Malvani fish thali',
  ARRAY['Malvani fish thali','Solkadhi','Surmai curry','Kombdi vade','Bombil fry','Modak']::text[],
  '₹₹',
  '[450,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Alibaug Malvani-cuisine specialist — Tripadvisor reviews place it among the town''s top fish thali stops. Coconut-heavy Malvani gravies (separate from Gomantak Goan style); kombdi vade (Konkan country chicken with crispy rice-flour vade flatbread) is the lunch combo. Open 12-3.30pm + 7-11pm.',
  'Kombdi vade lunch combo (₹400) is the order if you''re tired of fish — Maharashtra''s village-Konkan signature dish. Solkadhi (kokum + coconut) free with every thali.',
  'Alibaug main town, near bus stand, Alibaug 402201',
  'https://maps.google.com/?q=Kokum+and+Spice+Alibaug',
  ARRAY[
    'https://www.tripadvisor.com/ShowUserReviews-g1010231-d7799247-r419493105-Kokum_Spice-Alibaug_Raigad_District_Maharashtra.html',
    'https://www.tripadvisor.in/Restaurants-g1010231-c24-Alibaug_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
);
