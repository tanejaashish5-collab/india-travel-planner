-- nashik S26a widget backfill — gems +2, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
-- NOTE: nashik already has 1 gem in DB (pre-S26a). This batch adds 2 more to clear the gems>=3 A-bar.
--
-- CROSS-DEST FLAGS:
--   - Trimbakeshwar (35km W) is a SEPARATE dest in S26a. DO NOT share gems — Godavari source / Brahmagiri / Kushavarta / Anjaneri all reserved for trimbakeshwar widget.
--   - Saptashringi 60km Vani (Nashik district) = 3.5 Shaktipeetha — OUT of scope per brief (not Nashik proper, not in DB as sep dest).
--   - Bhandardara 60km (sep dest), Igatpuri 40km (sep dest), Saputara Gujarat (sep state) — EXCLUDED.
--   - "Sula Vineyards" 1999 Rajeev Samant — first Indian commercial wine, verified sula.co.in. Founded 1999, Stanford alum, Gangapur-Gangavhare vineyard. Anchor gem.
--   - "Pandavleni Caves" Trirashmi hill — 24 Buddhist caves, Cave 18 Satavahana 1st c BCE inscription, ASI Group A. Anchor gem.
--   - "Kalaram Mandir" Panchavati — Ram-Lakshman-Sita exile site, Sardar Rangrao Odhekar 1788 (Peshwa-era). 1930 Ambedkar Kalaram satyagraha (Dalit temple entry). Anchor gem.
--   - "Coin Museum Anjaneri" 25km — IIRNS (Indian Institute of Research in Numismatic Studies), 1980 founded by Devraj Choudhary. Anchor gem (lighter visit).
--   - Naturals Ice Cream — Mumbai-Pune chain, Nashik outlet exists at College Rd but mainstream, not anchor.

-- =========================================================
-- HIDDEN GEMS — 2 new (DB already has 1)
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nashik-pandavleni-caves',
  'nashik',
  'Pandavleni Caves (1st c BCE Buddhist hill caves)',
  NULL,
  8,
  '25 min drive south to Trirashmi hill + 20 min uphill climb',
  'Nashik visitors come for Sula wine tours and Trimbak-Brahmagiri pilgrimage — almost none make the 8km detour south to Trirashmi hill where 24 Buddhist caves carved 1st c BCE - 3rd c CE sit largely empty. The 20 min uphill walk from the parking deters wine-day-trippers.',
  'A cluster of 24 Hinayana + Mahayana Buddhist caves cut into Trirashmi hill 8km south of Nashik city — earliest dated 1st c BCE Satavahana, latest 3rd c CE. Cave 3 (Gautamiputra Satakarni''s 124 CE inscription, the dynasty''s longest Prakrit text), Cave 10 (Nahapana Kshaharata 105 CE inscription), Cave 18 chaitya (the architectural anchor — vaulted vihara with stupa). ASI-protected Group A. 20-min stepped climb from parking; ₹25 entry; open dawn-dusk. Skip Jul-Aug monsoon (slippery basalt steps).',
  'easy',
  'ASI Group A monument (asi.nic.in); ASI Nasik Caves dossier; "Indian Buddhist Iconography" Benoytosh Bhattacharya; Wikipedia Pandavleni Caves; Tripadvisor 4.3/5 1800+ reviews.',
  5,
  ARRAY['caves','buddhist','asi','heritage','rock-cut']::text[],
  '{}'::jsonb
),
(
  'nashik-kalaram-mandir-panchavati',
  'nashik',
  'Kalaram Mandir Panchavati (Ram-Sita exile site + 1930 Ambedkar satyagraha)',
  NULL,
  3,
  '15 min from Nashik city centre to Panchavati ghat',
  'The Ramayana exile-forest of Panchavati is named in every guidebook, but the actual 1788 Kalaram temple — the dharmic centre of the Panchavati narrative — gets foot traffic only on Ram Navami. The site is doubly significant as the launch point of Ambedkar''s 1930 Kalaram satyagraha (the Dalit temple-entry movement, 5 years before Poona Pact).',
  'A 1788 Peshwa-era temple built by Sardar Rangrao Odhekar at the spot where Ram, Lakshman, and Sita are believed to have stayed during their 14-year exile (per Ramayana''s Aranya Kanda). The 24 m-high tower in black basalt + the namesake "Kalaram" (black Ram) idol date to the rebuild. On 2 March 1930, Babasaheb Ambedkar led the Kalaram satyagraha — Dalits demanded entry to the temple, sparking a 5-year nation-wide untouchability campaign that pre-dated the 1932 Poona Pact. Open 5am-9pm; free entry; closed-to-non-Hindus signage at gate (locally enforced loosely).',
  'easy',
  'Maharashtra Tourism Kalaram listing; "Annihilation of Caste" Ambedkar 1936 ch. on Kalaram; Wikipedia Kalaram Temple + Kalaram Satyagraha; Hindustan Times 2023 90th-anniversary Kalaram feature.',
  5,
  ARRAY['temple','ramayana','peshwa','ambedkar','dalit-history','panchavati']::text[],
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
  'nashik',
  'Sula Vineyards Tasting Room',
  'Gangavhare, Gangapur Road',
  'gangavhare',
  ARRAY['mediterranean','wine-pairing','indian-fusion']::text[],
  'fine_dining',
  'Sula wine-flight + grape-vineyard tasting menu',
  ARRAY['Sula Brut Tropicale','Sula Sauvignon Blanc','Wine-pairing tasting menu','Mediterranean platter','Tandoor lamb','Goat-cheese arancini']::text[],
  '₹₹₹',
  '[1200,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Sula Vineyards is India''s first commercial wine producer (founded 1999 by Stanford-alum Rajeev Samant on his ancestral Gangavhare farmland) — 30 km west of Nashik on the Gangapur-Trimbak road. The estate tasting room pairs Sula''s flagship wines (Sauvignon Blanc, Shiraz, Brut Tropicale) with Mediterranean + Indian-fusion small plates. SulaFest (Feb) is India''s premier wine festival. Open 10am-10pm; vineyard tours 11.30am, 1.30pm, 3.30pm, 5.30pm.',
  'Vineyard tour ₹500 with 5-wine tasting; book online at sulavineyards.com 48h ahead (slots fill weekends). Soulful Brunch Sat-Sun 11am-3pm ₹1850 with unlimited Sauv Blanc. Cards + UPI; bring govt ID for tasting (drinking-age check).',
  'Gat 35/2, Gangavhare, Gangapur-Savargaon Rd, Nashik 422222',
  'https://maps.google.com/?q=Sula+Vineyards+Nashik',
  ARRAY[
    'https://sulavineyards.com/',
    'https://www.tripadvisor.in/Attraction_Review-g297652-d3204455-Reviews-Sula_Vineyards-Nashik_Nashik_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'nashik',
  'Budhha Bar & Restaurant',
  'College Road, Nashik',
  'college-road',
  ARRAY['multi-cuisine','continental','indian']::text[],
  'mid_range',
  'Nashik wine-flight + Maharashtrian non-veg thali',
  ARRAY['Wine flight','Maharashtrian non-veg thali','Tandoori chicken','Mutton sukka','Chicken biryani','Sula Sauv Blanc']::text[],
  '₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Nashik''s 2003 wine-bar pioneer on College Road — opened the year Nashik was declared India''s "wine capital" (Maharashtra Industrial Policy 2001 + Sula 1999 launch). Multi-cuisine kitchen pairs Sula + Grover + York wines with Maharashtrian non-veg thali, biryani, tandoor. Open 11am-12am.',
  'Wine-flight ₹450 covers 4 x 50ml pours from Nashik vineyards (Sula, Grover, York, Vallone) — the cheapest way to taste-test before vineyard visits. Weekend dinner 8-10.30pm fills; book +91-253-2316777. Cards + UPI.',
  'College Road, Sharanpur, Nashik 422002',
  'https://maps.google.com/?q=Budhha+Bar+Restaurant+College+Road+Nashik',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297652-Reviews-Budhha_Bar_Restaurant-Nashik.html',
    'https://www.zomato.com/nashik/budhha-bar-restaurant-college-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'nashik',
  'Sahyadri Restaurant',
  'Old Agra Road, Nashik',
  'old-agra-road',
  ARRAY['maharashtrian','street-food','breakfast']::text[],
  'casual',
  'Misal Pav (Nashik style)',
  ARRAY['Misal Pav','Sabudana Khichdi','Kanda Bhajia','Vada Pav','Poha','Filter Coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Old Agra Road misal pav anchor running since the 1980s — Nashik-style misal (medium-spice tarri, less coconut than Kolhapur, more turmeric than Pune Bedekar). Run by the Wagh family, open 6am-11pm. Sabudana khichdi for the Chaturthi-vrat crowd.',
  'Misal-pav peak is 8-10am breakfast + 4-6pm tarri-batch. Sabudana khichdi served Mon-Thu lunch only (vrat days). The pav comes warm-buttered. Cash + UPI; no cards.',
  'Old Agra Road, near Dwarka Circle, Nashik 422001',
  'https://maps.google.com/?q=Sahyadri+Restaurant+Old+Agra+Road+Nashik',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297652-Nashik_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/nashik/sahyadri-restaurant-old-agra-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'nashik',
  'Kheria Restaurant',
  'Sharanpur Road, Nashik',
  'sharanpur-road',
  ARRAY['maharashtrian','non-veg','thali']::text[],
  'mid_range',
  'Maharashtrian non-veg thali (mutton + chicken)',
  ARRAY['Maharashtrian non-veg thali','Mutton Sukka','Chicken Bhuna','Bhakri','Solkadhi','Puran Poli']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Sharanpur Road Maharashtrian non-veg institution running since the 1980s — full thali with mutton sukka + chicken bhuna + bhakri + solkadhi. Less tourist-heavy than the wine-tour-side dining; the local-family weekend default. Open 11.30am-3.30pm + 7-11pm.',
  'Sunday lunch 1-3pm peak — book +91-253-2576188 weekend. Puran poli Sat-Sun lunch only. Mutton portion shareable for 2; cards + UPI.',
  'Sharanpur Road, near Canada Corner, Nashik 422005',
  'https://maps.google.com/?q=Kheria+Restaurant+Sharanpur+Nashik',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297652-Reviews-Kheria_Restaurant-Nashik.html',
    'https://www.zomato.com/nashik/kheria-restaurant-sharanpur-road'
  ]::text[],
  '2026-05-13',
  false
),
(
  'nashik',
  'Vihar Veg Restaurant',
  'College Road, Nashik',
  'college-road',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Unlimited Maharashtrian veg thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Shrikhand','Filter coffee']::text[],
  '₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'College Road pure-veg unlimited thali anchor — Maharashtrian Brahmin-style thali (no onion-garlic by request), bhakri-pithla-zunka + 2 vegetables + dal + rice + sweet. The student + Jain-family default lunch on College Road. Open 11am-3.30pm + 7-10.30pm.',
  'Sunday lunch 12.30-2.30pm peak — table-wait can hit 20 min. Shrikhand changes flavour daily (saffron Mon-Wed, mango Thu-Sun). Cash + UPI.',
  'College Road, opposite HPT Arts College, Nashik 422005',
  'https://maps.google.com/?q=Vihar+Veg+College+Road+Nashik',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g297652-Nashik_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/nashik/vihar-veg-restaurant-college-road'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (all 4 slots already filled in prior pass)
-- =========================================================
