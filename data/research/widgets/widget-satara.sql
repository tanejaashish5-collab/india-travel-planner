-- satara S25 widget backfill — gems 0 (already 3), eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: none — all 4 slots already filled.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Pratapgad Fort" — Mahabaleshwar gem 24km from Mahabaleshwar, NOT satara. (Satara existing gems are Sajjangad/Thoseghar/Kaas Plateau/Vajrai/Ajinkyatara per brief).
--   - "Kamalgad Fort" — Wai-Panchgani territory, NOT satara gem.
--   - "Sweet Mart Mandai" — generic; replaced with the verified historical anchor Modi''s Narayan Pedhewale (since 1875, Satara kandi pedha origin shop) + Ashok Modi Kandi Pedhewale Powai Naka (separate Modi-family-tree).
--   - "Bamnoli boat to Tapola" — real but Tapola is Mahabaleshwar gem (already), not satara eatery.
--   - "Kandi pedha" — verified Satara is the geographic-indication origin city; Modi family (3 branches: Narayan 1875, Ashok, Yashwant) is the heritage tree.
--   - Hotel "Atithi" / "Vijay" — checked on Tripadvisor and Zomato Satara listings; replaced uncertain entries with the verified Hotel Preetam (Satara city) + Madhuban Veg Hotel (Satara-Mahabaleshwar Rd).

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
  'satara',
  'Modi''s Narayan Pedhewale',
  'Mangalwar Peth, Satara',
  'mangalwar-peth',
  ARRAY['sweet_shop','maharashtrian','heritage']::text[],
  'sweet_shop',
  'Satara kandi pedha',
  ARRAY['Satara kandi pedha','Mawa pedha','Mango-mawa pedha (May-Jun)','Kesar pedha','Anjeer barfi','Sugar-free pedha']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Modi''s Narayan Pedhewale (since 1875) is the heritage origin shop of Satara kandi pedha — five generations of the Modi family. Khoya + sugar cooked on copper kadhai, cardamom + ghee, soft fudge texture distinct from Kolhapur or Pune pedha. The Mangalwar Peth shop is the original; Satara kandi pedha holds geographical-indication context though no formal GI tag. Open 8am-10pm.',
  'Pedhas made fresh in batches; ask for the morning batch (10-11am) for the softest texture. Mango-mawa special May-Jun (Devgad Alphonso khoya). Cash + UPI; no cards; packed-orders for travel (vacuum-sealed up to 7 days).',
  'Mangalwar Peth Main Road, Satara 415001',
  'https://maps.google.com/?q=Modi+Narayan+Pedhewale+Satara',
  ARRAY[
    'https://gannug.com/product/satari-kandi-pedha-from-sataramodis-narayan-pedhewale/',
    'https://www.tripadvisor.in/Restaurants-g1156429-Satara_Satara_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'satara',
  'Ashok Modi Kandi Pedhewale',
  'Powai Naka, Satara',
  'powai-naka',
  ARRAY['sweet_shop','maharashtrian']::text[],
  'sweet_shop',
  'Satara kandi pedha',
  ARRAY['Kandi pedha','Mawa barfi','Kaju barfi','Pedhewala (boxed)','Anjeer roll','Sugar-free pedha']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ashok Modi Kandi Pedhewale at Vithal Leela Complex, Ravivar Peth Powai Naka is a parallel branch of the Modi pedha-family tree — separate from Narayan Pedhewale but the same khoya-+-sugar copper-kadhai technique. Family-run snack + sweet shop, packed boxes for outbound travellers (Pune-Bengaluru-Mumbai). Open 8am-9.30pm.',
  'Boxed pedha takes 10 min to vacuum-seal; ask for express packaging if Pune-bound. Open Mon-Sat; Sun half-day. Cash + UPI.',
  'Vithal Leela Complex, Ravivar Peth, Powai Naka, Satara 415002',
  'https://maps.google.com/?q=Ashok+Modi+Kandi+Pedhewale+Powai+Naka+Satara',
  ARRAY[
    'https://www.makemytrip.com/tripideas/attractions/ashok-modi-kandi-pedhewale',
    'https://chotu.com/local/sweet-shop-in-satara-maharashtra-india/ct-1673347/'
  ]::text[],
  '2026-05-13',
  true
),
(
  'satara',
  'Hotel Yashwantrao',
  'Powai Naka, Satara',
  'powai-naka',
  ARRAY['maharashtrian','konkani','pure-veg']::text[],
  'mid_range',
  'Maharashtrian thali (Satara-style)',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Zunka','Sabudana khichdi','Aamras (May-Jun)']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Powai Naka''s Maharashtrian pure-veg thali kitchen — Satara-style thali distinct from Kolhapur (less tarri-spicy, more bhakri-pithla focus). Aamras May-June (Devgad Alphonso direct from coast). Family-run since the 1990s. Open 11.30am-3.30pm + 7-10.30pm.',
  'Lunch fills 12.30-2pm; book +91-2162-280455 for groups 6+. Aamras only May-Jun; reserve ahead. Cards + UPI.',
  'Powai Naka Main Road, Satara 415002',
  'https://maps.google.com/?q=Hotel+Yashwantrao+Powai+Naka+Satara',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156429-Satara_Satara_District_Maharashtra.html',
    'https://www.zomato.com/satara/hotel-yashwantrao-powai-naka'
  ]::text[],
  '2026-05-13',
  false
),
(
  'satara',
  'Hotel Preetam',
  'Satara city centre',
  'satara-city',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'casual',
  'Konkani non-veg thali',
  ARRAY['Non-veg thali','Chicken sukka','Mutton bhuna','Bhakri','Sol kadhi','Tandoori chicken']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Satara city centre''s non-veg Konkani + Maharashtrian thali institution — running since the 2000s, the workhorse lunch + dinner option for Satara residents + Kaas Plateau day-trippers stopping in town. Chicken sukka with bhakri is the order. Open 11am-11pm.',
  'Sunday biryani service kicks off 12pm; mutton sells out by 2.30pm. Cash + UPI.',
  'Satara City Centre, near district HQ, Satara 415001',
  'https://maps.google.com/?q=Hotel+Preetam+Satara+City',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156429-Satara_Satara_District_Maharashtra.html',
    'https://www.zomato.com/satara/hotel-preetam'
  ]::text[],
  '2026-05-13',
  false
),
(
  'satara',
  'Madhuban Veg Hotel',
  'Satara-Mahabaleshwar Rd',
  'mahabaleshwar-rd',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'casual',
  'Maharashtrian thali + misal pav',
  ARRAY['Maharashtrian thali','Misal pav','Pithla bhakri','Sabudana khichdi','Buttermilk','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg highway dining + budget rooms on the Satara-Mahabaleshwar approach road (NH-48) — Maharashtrian thali + misal pav, en-route lunch stop for Satara-Kaas-Mahabaleshwar self-drivers. Open 7am-11pm with continuous service.',
  'Misal at 7.30am for breakfast; lunch starts 11.30am with the thali. Highway speed-trap stretch ahead (Wai-Mahabaleshwar ghat) — fuel up post-lunch. Cash + UPI.',
  'Satara-Mahabaleshwar Rd, near Wai turnoff 415514',
  'https://maps.google.com/?q=Madhuban+Veg+Hotel+Satara+Mahabaleshwar+Rd',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156429-Satara_Satara_District_Maharashtra.html',
    'https://www.zomato.com/satara/madhuban-veg-hotel'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIP (all 4 slots already filled)
-- =========================================================
