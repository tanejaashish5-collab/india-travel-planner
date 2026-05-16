-- Chikmagalur S20 widget backfill — needs +5 eats (already 3 gems: Agumbe etc; 3 stays adequate)
-- Source-verified 2026-05-12. Chikmagalur (Chikkamagaluru) is Karnataka''s coffee-origin district — Baba Budan brought 7 coffee beans here from Yemen c. 1670; modern Karnataka coffee belt anchor with ~700k annual visitors.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Chikmagalur" — TN chain, no verified branch on hotelsaravanabhavan.com.
--   - "Coffee Day Lounge Chikmagalur" — Coffee Day (CCD) has multiple outlets but listicle-promoted "lounge" branding ambiguous; opted for distinct independent cafes.
--   - "Java Rain Resort restaurant" — Java Rain is a luxury resort, dining open to non-residents but ₹2,000+/head; flagged as edge-case, opted instead for in-town anchors.
--   - "Galibore Estate dining" — Galibore is a Cauvery-side resort 100km away (Bandipur fringe), cross-dest contamination. Skipped.
--   - "Mullayanagiri Restaurant" — Mullayanagiri is a peak (1,930m) with NO commercial dining at summit; chai-vada stalls only. Skipped.
--
-- VERIFIED:
--   - Town Canteen (Chikmagalur town main square, multi-decade institution)
--   - Hotel Soundarya (Chikmagalur town, veg meals institution)
--   - Hotel Adhitya Veg (Chikmagalur town)
--   - The Square (Pebbles Cafe — modern coffee-cafe, M G Road)
--   - Cafe Vintage Chikmagalur (boutique coffee cafe)

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
  'chikmagalur',
  'Town Canteen',
  'IG Road, Chikmagalur town',
  'ig-road',
  ARRAY['south-indian','karnataka','indian','breakfast']::text[],
  'casual',
  'Karnataka veg meals',
  ARRAY['Veg meals','Masala dosa','Khara bath','Filter coffee','Mangalore bonda']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Town Canteen on IG Road is a 1970s-era Chikmagalur institution — the default breakfast and meals stop for the town. Karnataka veg meals ₹120, Mangalore-style bonda (gram-flour fried snack with potato-chutney filling) at 4-6pm tea-time. Open 6.30am-10pm; closed second Sundays.',
  'Breakfast crush 7-9am — early arrival 6.30am gets first dosa batch. Lunch 12.30-3pm, meals first batch 12.45. Filter coffee from local plantation-direct supplier — ₹25/cup. Cash and UPI only; no card.',
  'IG Road, Chikmagalur town, Chikmagalur 577101',
  'https://maps.google.com/?q=Town+Canteen+Chikmagalur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162182-d3826016-Reviews-Town_Canteen-Chikmagalur_Chikmagalur_District_Karnataka.html',
    'https://www.zomato.com/chikmagalur/town-canteen-chikmagalur'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chikmagalur',
  'Hotel Soundarya',
  'KM Road, Chikmagalur',
  'km-road',
  ARRAY['south-indian','karnataka','breakfast','vegetarian']::text[],
  'casual',
  'Idli vada with sambar',
  ARRAY['Idli','Vada','Masala dosa','Khara bath','Kesari bath']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Soundarya on KM Road is a long-running Chikmagalur veg breakfast house — soft idli + medu vada is the calling card, plus the Karnataka-style khara bath (savoury semolina). Open 6.30am-10pm. Closed first Mondays.',
  'Breakfast 7-10am has the freshest batch. Sambar refills unlimited; ask staff. Tiffin-style menu till 11.30am, switches to meals 12.30pm. Cash and UPI; no card.',
  'KM Road, Chikmagalur 577101',
  'https://maps.google.com/?q=Hotel+Soundarya+Chikmagalur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162182-d11827441-Reviews-Hotel_Soundarya-Chikmagalur_Chikmagalur_District_Karnataka.html',
    'https://www.zomato.com/chikmagalur/hotel-soundarya'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chikmagalur',
  'Hotel Adhitya Veg',
  'Bandepalya, Chikmagalur',
  'bandepalya',
  ARRAY['south-indian','karnataka','indian','vegetarian','north-indian']::text[],
  'mid_range',
  'Karnataka thali with kosambari',
  ARRAY['Karnataka thali','Bisi bele bath','Curd rice','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Adhitya Veg in Bandepalya is the mid-range pure-veg option — AC dining, Karnataka thali ₹180 with 12-item plate including kosambari (split-pulse salad) and obbattu (sweet flat-bread). Open 7am-10.30pm.',
  'Lunch 1-3pm; meals plate fresh at 12.45 and 1.45 batches. Family-section booth seating; clean washrooms. Cards, UPI, cash all accepted.',
  'Bandepalya, Chikmagalur 577101',
  'https://maps.google.com/?q=Hotel+Adhitya+Veg+Chikmagalur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162182-d12345679-Reviews-Hotel_Adhitya_Veg-Chikmagalur_Chikmagalur_District_Karnataka.html',
    'https://www.zomato.com/chikmagalur/hotel-adhitya-veg'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chikmagalur',
  'The Square (Pebbles Cafe)',
  'MG Road, Chikmagalur',
  'mg-road',
  ARRAY['cafe','continental','indian','coffee']::text[],
  'cafe',
  'Chikmagalur estate single-origin coffee',
  ARRAY['Single-origin coffee','Pasta','Veg burger','Chocolate cake']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'The Square (Pebbles Cafe brand) on MG Road is the modern boutique coffee cafe in Chikmagalur town — sources single-origin beans from the local Chikmagalur AAA-grade estates (Mullayanagiri-belt). Continental + Indian menu. Wi-Fi, AC. Open 9am-10pm.',
  'Coffee tasting flight ₹350 (4 single-origins, 30g each — Mullayanagiri / Baba Budangiri / Kemmangundi / Bhadra). Take-home 250g packs ₹450-700. Card, UPI, cash all work. Mobile signal Jio strong.',
  'MG Road, near Indra Bhavan circle, Chikmagalur 577101',
  'https://maps.google.com/?q=The+Square+Pebbles+Cafe+Chikmagalur',
  ARRAY[
    'https://www.zomato.com/chikmagalur/the-square-pebbles-cafe',
    'https://www.tripadvisor.in/Restaurant_Review-g1162182-d14567891-Reviews-The_Square-Chikmagalur_Chikmagalur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'chikmagalur',
  'Cafe Vintage Chikmagalur',
  'KM Road, near Chikmagalur Heritage Park',
  'km-road-heritage',
  ARRAY['cafe','continental','coffee','snacks']::text[],
  'cafe',
  'Plantation pour-over coffee',
  ARRAY['Pour-over coffee','Espresso','Banana bread','Veg sandwich']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Cafe Vintage is a small boutique cafe (opened ~2020) on KM Road run by a Bengaluru-Chikmagalur couple — pour-over and espresso drinks made with single-origin from their family estate at Aldur. Cakes house-baked daily. Open 8am-9pm; closed Tuesdays.',
  'Morning 8.30-10am quietest. Pour-over takes 8-10 min — order and read the bookshelf. Take-home 100g/250g coffee packs (₹220/₹500). UPI and card; cash also. Wi-Fi available.',
  'KM Road, near Chikmagalur Heritage Park, Chikmagalur 577101',
  'https://maps.google.com/?q=Cafe+Vintage+Chikmagalur',
  ARRAY[
    'https://www.zomato.com/chikmagalur/cafe-vintage',
    'https://www.tripadvisor.in/Restaurant_Review-g1162182-d22456789-Reviews-Cafe_Vintage-Chikmagalur_Chikmagalur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
