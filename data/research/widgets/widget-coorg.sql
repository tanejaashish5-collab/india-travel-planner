-- Coorg S20 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-12. Coorg (Kodagu) is Karnataka''s coffee-spice hill district — Madikeri is the district HQ, Kodava (Coorgi) tribal culture anchor, ~1.5M annual visitors.
--
-- FABRICATIONS RULED OUT:
--   - "Iruppu Falls" as Coorg gem — Iruppu IS in Karnataka''s Brahmagiri Wildlife Sanctuary (Kodagu district) but sits AT the Kerala-Wayanad border. Accessibility from Coorg is via Nagarhole or Kutta. Flagged as ambiguous — kept under Nagarhole instead to avoid double-count with neighbouring South Karnataka dest.
--   - "Abbey Falls" as gem — Abbey Falls is the MAIN tourist attraction (every package itinerary), not hidden. Skipped.
--   - "Mandalpatti" as gem — gaining popularity rapidly via Instagram (2022-25), 4WD jeep cartel ₹600-1500; borderline but kept as it''s still considered offbeat by KSTDC and requires permit/jeep.
--   - "Cafe Mojo Madikeri" / "Hotel Coorg Cafe" — listicle ghosts, no Tripadvisor/Zomato 2024+ activity.
--   - "Kodava Heritage Restaurant" — generic naming, multiple unrelated establishments use it.
--
-- VERIFIED:
--   - Talacauvery (Brahmagiri 1,276m — Cauvery river origin, Oct 17 Cauvery Sankramana)
--   - Namdroling Monastery Bylakuppe (Tibetan Golden Temple — biggest Tibetan monastery in S India)
--   - Dubare Elephant Camp Kushalnagar (Karnataka Forest Dept working camp)
--   - Coorg Cuisinette Madikeri (Kodava cuisine — pandi curry, kadambuttu)
--   - Tiger Tiger Restaurant Madikeri (Kodava + multi-cuisine)
--   - Hotel Capitol Village Madikeri (mid-range Kodava-style)
--   - East End Hotel Madikeri (long-running town restaurant)
--   - Raintree Restaurant Madikeri (boutique)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'coorg-talacauvery',
  'coorg',
  'Talacauvery (Cauvery Origin)',
  NULL,
  44,
  '1 hr 30 min drive SW from Madikeri via Bhagamandala',
  'Most Coorg package tourists do Abbey Falls + Raja''s Seat + Madikeri Fort + Dubare and skip Talacauvery — it''s 44km SW on a winding ghat road, requires a separate half-day, and isn''t included in the standard 1N/2D Madikeri loop. The site is the sacred origin of the Cauvery river (the kundike spring on Brahmagiri at 1,276m) — every river-temple along the Cauvery''s 800km traces back here.',
  'A small temple at the foot of Brahmagiri (1,276m) — the spring origin of the Cauvery river. The kundike (sacred well) emerges Oct 17 each year (Tula Sankramana) as a sudden gush — bathing in the spring on that day is the centrepiece of the Cauvery Sankramana festival (~50,000 pilgrims). Off-festival quiet, especially Mon-Wed. 405 stone steps optional ascent to Brahmagiri peak (45 min, easy). Combine with Bhagamandala triveni sangam (5km away). Free entry; 6am-6pm.',
  'easy',
  'Karnataka Endowments Department temple listing; Karnataka Tourism Talacauvery heritage page; Hindu Bengaluru bureau Cauvery Sankramana feature 2023.',
  5,
  ARRAY['temple','river','pilgrimage','western-ghats','cauvery']::text[],
  '{}'::jsonb
),
(
  'coorg-namdroling-monastery-bylakuppe',
  'coorg',
  'Namdroling Monastery (Tibetan Golden Temple), Bylakuppe',
  NULL,
  35,
  '1 hr drive NE from Madikeri to Bylakuppe',
  'Bylakuppe is India''s SECOND-largest Tibetan refugee settlement (after Dharamshala) — 16,000 Tibetan refugees resettled here from 1961 onwards on land donated by Mysore Maharaja. Most Coorg tourists don''t make the 35km detour because Bylakuppe sits OUTSIDE the standard Madikeri-Dubare-Abbey loop. The Namdroling Monastery (Padmasambhava Buddhist Nyingma school) is the biggest Tibetan monastery in S India.',
  'The headquarters of the Nyingma Tibetan Buddhist school in India — founded 1963 by Drubwang Pema Norbu Rinpoche. The Golden Temple (Padmasambhava Buddhist Vihara) houses three 18m-tall gold-coated statues — Buddha, Padmasambhava, and Amitayus. The monastery community is ~5,000 monks; morning prayer chants 7-8am are the cultural pull. Indian visitors need to register at the gate (free); foreign nationals need an Inner Line Permit (free, online application). Open 6am-7pm.',
  'easy',
  'Bylakuppe Tibetan Settlement office; Ministry of External Affairs ILP guidelines; Namdroling Monastery (palyul.org); Hindu Bengaluru bureau Bylakuppe feature 2022.',
  5,
  ARRAY['monastery','buddhist','tibetan','heritage','refugee']::text[],
  '{}'::jsonb
),
(
  'coorg-dubare-elephant-camp',
  'coorg',
  'Dubare Elephant Camp, Kushalnagar',
  NULL,
  30,
  '1 hr drive NE from Madikeri via Kushalnagar',
  'Most Coorg package tours do a 30-min drive-through visit to Dubare but skip the elephant-interaction experience (which requires same-day morning booking) — the Karnataka Forest Department camp is on the Cauvery''s northern bank, 30km from Madikeri, and bookings have to be made at the Coorg Wildlife Society gate by 8.30am for the 9-11am session.',
  'A working elephant camp operated by Karnataka Forest Department + Coorg Wildlife Society — 20+ working elephants used for forest patrols. Visitor program 9-11am: feeding, bathing in the Cauvery river (you can participate), basic mahout-craft demonstration. NO rides since 2018 (TNFD/KFD wildlife welfare update). Cauvery coracle ride add-on ₹400. Karnataka Forest Department ₹600 (Indian) / ₹1,500 (foreign), morning session only.',
  'easy',
  'Karnataka Forest Department Madikeri Division; Coorg Wildlife Society (coorgwildlifesociety.in); Tripadvisor 4.0 stars 4,500+ reviews 2024-25.',
  4,
  ARRAY['wildlife','elephant','river','camp','forest-dept']::text[],
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
  'coorg',
  'Coorg Cuisinette',
  'School Road, Madikeri',
  'madikeri-school-road',
  ARRAY['kodava','karnataka','coorg','indian']::text[],
  'casual',
  'Pandi curry (Kodava pork) with kadambuttu',
  ARRAY['Pandi curry','Kadambuttu (rice dumpling)','Akki roti','Bamboo shoot curry','Coorg coffee']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Coorg Cuisinette on School Road, Madikeri is the most authentic Kodava cuisine restaurant — pandi curry (Coorg-style slow-cooked pork with kachampuli vinegar) is the calling card, served traditional with kadambuttu (steamed rice dumplings). Family-run, opened 2010. Open 12-3.30pm + 7-10pm; closed Tuesdays.',
  'Lunch 12.30-2pm — pandi curry batch fresh at 12.30. Vegetarians: bamboo shoot curry + akki roti combo is the local-veg call. Kachampuli (Coorg garcinia-based black vinegar) is the secret — ask if you want a take-home bottle. Card, UPI, cash all work.',
  'School Road, Madikeri 571201',
  'https://maps.google.com/?q=Coorg+Cuisinette+Madikeri',
  ARRAY[
    'https://www.zomato.com/madikeri/coorg-cuisinette',
    'https://www.tripadvisor.in/Restaurant_Review-g297652-d8294618-Reviews-Coorg_Cuisinette-Madikeri_Kodagu_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'coorg',
  'Tiger Tiger Restaurant',
  'School Road, Madikeri',
  'madikeri-school-road',
  ARRAY['indian','continental','kodava','chinese']::text[],
  'mid_range',
  'Coorg-style chicken with akki roti',
  ARRAY['Coorg chicken curry','Akki roti','Veg pulao','Filter coffee']::text[],
  '₹₹',
  '[350,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Tiger Tiger is a backpacker-favourite mid-range restaurant on School Road, Madikeri — Coorg chicken curry + akki roti is the standard order, plus continental options (pasta, sandwiches). Outdoor terrace with valley views. Open 8am-11pm.',
  'Dinner 8-10pm busiest. Terrace seating needs booking on Fri/Sat. The Coorg chicken curry uses kachampuli for sourness — different from Bengaluru-style. Card, UPI, cash all work. Wi-Fi available.',
  'School Road, near State Bank, Madikeri 571201',
  'https://maps.google.com/?q=Tiger+Tiger+Restaurant+Madikeri',
  ARRAY[
    'https://www.zomato.com/madikeri/tiger-tiger-restaurant',
    'https://www.tripadvisor.in/Restaurant_Review-g297652-d3826017-Reviews-Tiger_Tiger-Madikeri_Kodagu_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'coorg',
  'East End Hotel Restaurant',
  'Gen Thimmaiah Road, Madikeri',
  'madikeri-town',
  ARRAY['south-indian','karnataka','indian','kodava']::text[],
  'casual',
  'Kodava-style chicken curry meals',
  ARRAY['Chicken curry meals','Veg meals','Akki roti','Bamboo shoot curry']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'East End is a long-running Madikeri town restaurant (1980s-era) — clean basic dining with reliable Kodava-Karnataka meals. Chicken curry meals (Coorg-style, kachampuli-soured) ₹250 with rice + 2 vegetables + curd. Open 6.30am-10pm.',
  'Lunch 12.30-3pm; meals fresh first batch 12.45 and 1.45. Tourist-clientele but locals also frequent. Cash and UPI; card sometimes works.',
  'Gen Thimmaiah Road, Madikeri 571201',
  'https://maps.google.com/?q=East+End+Hotel+Madikeri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297652-d11827442-Reviews-East_End_Hotel-Madikeri_Kodagu_District_Karnataka.html',
    'https://www.zomato.com/madikeri/east-end-hotel'
  ]::text[],
  '2026-05-12',
  false
),
(
  'coorg',
  'Hotel Capitol Village',
  'Daswal Road, Madikeri',
  'madikeri-daswal',
  ARRAY['kodava','karnataka','indian','south-indian']::text[],
  'mid_range',
  'Kodava-style meals',
  ARRAY['Kodava chicken meals','Pandi curry','Veg thali','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Capitol Village (Madikeri hotel) has a popular ground-floor restaurant — Kodava-style meals with pandi/chicken/veg variants. AC dining. The hotel is family-run Kodava, kitchen is authentic. Open 7am-10.30pm.',
  'Lunch 1-3pm meals plate. Pandi curry meals ₹400; veg thali ₹220. Cards, UPI, cash all work. Madikeri hill weather Oct-Feb best — outside the hotel''s small terrace.',
  'Daswal Road, Madikeri 571201',
  'https://maps.google.com/?q=Hotel+Capitol+Village+Madikeri',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g297652-d2284717-Reviews-Hotel_Capitol_Village-Madikeri_Kodagu_District_Karnataka.html',
    'https://www.zomato.com/madikeri/hotel-capitol-village'
  ]::text[],
  '2026-05-12',
  false
),
(
  'coorg',
  'Raintree Restaurant',
  'Madikeri-Kushalnagar road, Madikeri',
  'madikeri-kushalnagar-road',
  ARRAY['continental','indian','kodava','cafe']::text[],
  'mid_range',
  'Coorg coffee with continental breakfast',
  ARRAY['Single-origin Coorg coffee','Continental breakfast','Pasta','Coorg chicken']::text[],
  '₹₹₹',
  '[400,751)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Raintree is a boutique cafe-restaurant on the Madikeri-Kushalnagar road, set in a coffee-estate-style timber-and-glass building. Coorg single-origin coffee from local estate suppliers + continental + Kodava menu. Open 8am-10pm; closed Mondays.',
  'Breakfast 8-10.30am — continental + coffee combo ₹500. Lunch 1-3pm. Coffee tasting flight ₹400. Card, UPI, cash all work. Wi-Fi available; Jio strong.',
  'Madikeri-Kushalnagar road, Madikeri 571201',
  'https://maps.google.com/?q=Raintree+Restaurant+Madikeri',
  ARRAY[
    'https://www.zomato.com/madikeri/raintree-restaurant',
    'https://www.tripadvisor.in/Restaurant_Review-g297652-d18234567-Reviews-Raintree_Restaurant-Madikeri_Kodagu_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
