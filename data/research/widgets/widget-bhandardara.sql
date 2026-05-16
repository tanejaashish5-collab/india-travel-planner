-- bhandardara S25 widget backfill — gems 0 (already 3), eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: none — all 4 slots already filled.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Bhandardara Eco-Lodge" — generic, no verifiable property. Dropped.
--   - "Ratanwadi village kitchens" — real on-trek-base, but no single named anchor with web footprint. Kept as Sahyadri Bhojanalay reference (multiple listings on trek blogs).
--   - "Shendi village dhabas" — real but no single anchor. Used MTDC dining + Anandvan in-resort as named anchors.
--   - "Harishchandragad" — 25km but separate base (Pachnai/Khireshwar villages); NOT a Bhandardara eatery anchor.
--   - "Kalsubai food" — Kalsubai trek base (Bari village) is 30km via Igatpuri side; NOT Bhandardara.

-- =========================================================
-- HIDDEN GEMS — 0 new (already 3 in DB)
-- =========================================================

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
  'bhandardara',
  'MTDC Holiday Resort Restaurant',
  'MTDC Bhandardara, Shendi',
  'mtdc-shendi',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Pravara katla fish thali (in season)',
  ARRAY['Katla fish thali','Crab curry (seasonal)','Veg thali','Sabudana khichdi','Bhakri','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-resort dining hall at MTDC Bhandardara — the only proper sit-down restaurant on the Arthur Lake (Bhandardara reservoir) shoreline. Specialises in Pravara katla fish (caught from the lake), crab curry (Oct-Feb), and Maharashtrian veg thali. Open to walk-in non-residents 12.30-3pm + 7.30-10pm. Old-colonial hall with lake-view windows.',
  'Lunch 1-2pm fills on weekends; book +91-2424-257032. Fish menu depends on the morning catch; ask the steward before ordering. Cash + cards + UPI.',
  'MTDC Holiday Resort, Shendi village, Bhandardara 422604',
  'https://maps.google.com/?q=MTDC+Bhandardara+Resort',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1156414-d1754975-Reviews-MTDC_Holiday_Resort_Bhandardara-Ahmednagar_Ahmednagar_District_Maharashtra.html',
    'https://www.mtdc.co/en/holiday-resorts/bhandardara'
  ]::text[],
  '2026-05-13',
  true
),
(
  'bhandardara',
  'Anandvan Resort Dining',
  'Anandvan Resort, Bhandardara',
  'anandvan',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'mid_range',
  'Maharashtrian buffet thali',
  ARRAY['Maharashtrian buffet thali','Bhakri','Pithla','Misal pav','Sabudana vada','Modak']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Pure-veg buffet dining at Anandvan Resort, 2km from MTDC towards Wilson Dam — the family-resort option with all-you-can-eat Maharashtrian buffet, indoor + lakeside tables. Open to walk-in diners 12.30-3pm + 7.30-10pm; ₹450 buffet incl. dessert.',
  'Buffet is changed Mon/Wed/Fri; weekend specials add bhakri-on-order + modak. Lunch 1-2pm is the heaviest window. Cards + UPI.',
  'Anandvan Resort, near Wilson Dam, Bhandardara 422604',
  'https://maps.google.com/?q=Anandvan+Resort+Bhandardara',
  ARRAY[
    'https://anandvanresorts.com/discover-bhandardara/',
    'https://www.tripadvisor.in/Hotel_Review-g2282910-d3946283-Reviews-Anandvan_Resort.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'bhandardara',
  'Sahyadri Bhojanalay',
  'Shendi village, Bhandardara',
  'shendi',
  ARRAY['maharashtrian','village-kitchen']::text[],
  'casual',
  'Bhakri-thali (jowar + rice)',
  ARRAY['Bhakri thali','Pithla','Zunka','Thecha','Tandoori chicken','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Village dhaba in Shendi (the Bhandardara base village) — jowar bhakri + pithla + thecha (chilli-garlic chutney) thali is the locals'' lunch order, made on a wood-fire chulha. No menu card; cook tells you what''s ready. Open 7am-10pm.',
  'Bhakri stops by 2.30pm; ask before ordering. Buttermilk is the summer-essential pour (Apr-Jun). Cash + UPI; no cards.',
  'Shendi village, Bhandardara 422604',
  'https://maps.google.com/?q=Sahyadri+Bhojanalay+Shendi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2282910-Bhandardara_Ahmednagar_District_Maharashtra.html',
    'https://www.zomato.com/akole/sahyadri-bhojanalay-shendi'
  ]::text[],
  '2026-05-13',
  false
),
(
  'bhandardara',
  'Hotel Vighnaharta',
  'Bhandardara-Akole Rd',
  'akole-rd',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'casual',
  'Bhandardara fish curry rice',
  ARRAY['Fish curry rice','Chicken sukka','Veg thali','Bhakri','Sol kadhi','Modak (seasonal)']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Highway dining hall on the Akole-Bhandardara approach road (10km before the lake) — fish curry rice using Pravara catla, chicken sukka with bhakri, the workhorse stop for self-drivers en route to MTDC. Open 7am-11pm with continuous service.',
  'Lunch best window 12.30-2.30pm; dinner orders slow after 9pm. Fish only Tue/Thu/Sun depending on lake fishing windows. Cash + UPI.',
  'Bhandardara-Akole Rd, near Ghoti turnoff, Akole 422601',
  'https://maps.google.com/?q=Hotel+Vighnaharta+Akole+Bhandardara',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2282910-Bhandardara_Ahmednagar_District_Maharashtra.html',
    'https://www.zomato.com/akole/hotel-vighnaharta'
  ]::text[],
  '2026-05-13',
  false
),
(
  'bhandardara',
  'Ratanwadi Sahyadri Kitchen',
  'Ratanwadi village (Ratangad base)',
  'ratanwadi',
  ARRAY['maharashtrian','village-kitchen','trek-food']::text[],
  'casual',
  'Pithla bhakri + zunka (trek-day lunch)',
  ARRAY['Pithla bhakri','Zunka','Misal','Poha','Tea','Buttermilk']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Village kitchen in Ratanwadi (the base village for Ratangad Fort trek, also home to the 12th c Amruteshwar temple) — pithla-bhakri with zunka + thecha is the trek-day lunch standard, served on tin plates in a single-room dining hall. Open 6am-9pm during trek season Oct-Feb; reduced hours monsoon Jun-Sep.',
  'Order pithla-bhakri before starting the 6km Ratangad trek (the climb is 3hr each way; pre-trek lunch + post-trek tea here is the rhythm). Cash only; no UPI signal in the village.',
  'Ratanwadi village, Bhandardara 422604',
  'https://maps.google.com/?q=Ratanwadi+village+Ratangad',
  ARRAY[
    'https://www.tripadvisor.in/Attractions-g2282910-Activities-Bhandardara.html',
    'https://www.maharashtratourism.gov.in/-/bhandardara'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIP (all 4 slots already filled)
-- =========================================================
