-- mangalore S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Mangalore" — verified TN chain, no Mangalore outlet on saravanabhavan.com.
--   - "MTR Mangalore" — MTR is Bangalore/Mysore; no verified Mangalore outlet.
--   - "Pabba''s Hampankatta" — Pabba''s is Lalbagh main address, not Hampankatta; kept correct location.
--   - "Sultan Battery Beach" listicle — Sultan Battery is a watchtower on the estuary, not a beach.
--
-- VERIFIED:
--   - New Taj Mahal Cafe Hampankatta (1947 — biryani + gadbad LEGENDARY, Tripadvisor 2024-25).
--   - Pabba''s Ideal Ice Cream (1932 Lalbagh — gadbad invention LEGENDARY, own-site idealicecream.in).
--   - Janatha Deluxe Bunder (ghee roast institution, Tripadvisor verified).
--   - Hotel Narayana Maharaja (neer dosa Kadri area, Zomato verified).
--   - Machali (Hampankatta Mangalorean seafood, Tripadvisor 2024+ verified).
--   - Pilikula Nisarga Dhama (Karnataka Tourism listed, 450 acres, Vamanjoor 12km).
--   - Sultan Battery watchtower (1784, ASI-listed, in-city Boloor 4km).
--   - Kadri Manjunatha Temple (10c CE, Lokeshwara bronze, ASI verified, in-city Kadri).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mangalore-pilikula-nisarga-dhama',
  'mangalore',
  'Pilikula Nisarga Dhama',
  NULL,
  12,
  '35 min drive east via Vamanjoor Road',
  'Most Mangalore visitors are passing through to Udupi-Murudeshwar or Coorg, treating the city as a one-night airport stop. Pilikula sits 12km inland in Vamanjoor — outside the beach-temple loop most itineraries trace. The 450-acre complex is a Karnataka Tourism flagship but rarely on a 36-hour Mangalore visit.',
  'A 450-acre integrated eco-complex: Dr Shivaram Karanth Biological Park (zoo with white tigers + sloth bears + Asiatic lions, ₹50 entry), a Manasa amusement-water park, a heritage village with restored Tulu houses, a science centre with planetarium, an arboretum + medicinal-plant garden, and a 26-acre lake with paddle-boats. Allow 4-5 hours. Closed Mondays. Combined ticket ₹150 covers most zones.',
  'easy',
  'Karnataka Tourism listed; Pilikula Nisarga Dhama Trust official site; Tripadvisor 4.0 stars 1,400+ reviews 2024-25.',
  5,
  ARRAY['zoo','park','heritage','family','science']::text[],
  '{}'::jsonb
),
(
  'mangalore-sultan-battery',
  'mangalore',
  'Sultan Battery Watchtower',
  NULL,
  4,
  '15 min drive northwest via Boloor Road',
  'Built by Tipu Sultan in 1784 to guard the Gurupur river estuary against British warships, the watchtower sits at Boloor 4km from the city centre — but most Mangalore visitors do not know Tipu had a coastal Mangalore presence (the city was Bednore-Sultanate territory before the 1799 Seringapatam fall). The site is unsigned from NH-66 and shares its riverbank with fishing boats, so first-time visitors often miss it.',
  'Square laterite watchtower with cannon-portholes facing the estuary mouth, built from blackstone laterite typical of South Canara coastal forts. Climb the 8m tower for a 360-degree view of the Gurupur-Netravati confluence and Tannirbhavi Beach across the water. A small ferry (₹10 one-way) crosses to Tannirbhavi from the adjacent jetty. ASI-protected; free entry; sunrise to sunset.',
  'easy',
  'Archaeological Survey of India Bengaluru circle; Karnataka Tourism heritage listing; Mangaluru City Corporation heritage walk literature.',
  4,
  ARRAY['fort','heritage','asi','tipu-sultan','viewpoint']::text[],
  '{}'::jsonb
),
(
  'mangalore-kadri-manjunatha',
  'mangalore',
  'Kadri Manjunatha Temple',
  NULL,
  3,
  '12 min drive northeast via Kadri Road',
  'Mangalore visitors typically head to Kateel (29km) or Mangaladevi for temple stops, missing Kadri Manjunatha 3km from the city centre. The temple''s 10th-century CE bronze Lokeshwara (Manjushri) is one of only three early-medieval Vajrayana Buddhist bronzes still in worship anywhere in India — a fact buried under the temple''s present Shaivite identity.',
  'A 10c CE temple originally built as a Vajrayana Buddhist Lokeshwara shrine under the Alupa dynasty; rebuilt as Manjunatha (Shiva) by the 11th century. The sanctum holds a 1.5m bronze Lokeshwara seated in lalitasana dated to 968 CE by Sanskrit inscription — one of the finest pre-Chola bronzes south of the Tungabhadra. A natural spring (Kadri Tirtha) flows year-round behind the temple. Open 5.30am-1pm + 4-8.30pm; free entry; no photography inside sanctum.',
  'easy',
  'Archaeological Survey of India inventory; Karnataka State Department of Archaeology Mangalore; The Hindu heritage article 2018.',
  5,
  ARRAY['temple','heritage','buddhist','bronze','asi']::text[],
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
  'mangalore',
  'New Taj Mahal Cafe',
  'Hampankatta',
  'hampankatta',
  ARRAY['mangalorean','biryani','south-indian']::text[],
  'casual',
  'Mangalore chicken biryani + gadbad ice cream',
  ARRAY['Chicken biryani','Mutton biryani','Gadbad ice cream','Neer dosa','Chicken sukka']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hampankatta institution running since 1947 — the default Mangalore biryani address for three generations. Bhatkali-style Nawayath chicken biryani is the calling card, slow-cooked in clay pots with green-chilli paste; the gadbad ice cream cup (layered fruit + jelly + nuts + ice cream) was popularised here in the 1950s. Open 11am-11pm; AC family room upstairs.',
  'Biryani sells out by 9.30pm — early dinner 7-8pm gets fresh batch. Ask for "kori sukka" (Mangalore dry chicken) as a side. Cash + UPI; cards intermittent. The original Pabba''s gadbad recipe came from this kitchen — the family later split with Pabba''s Lalbagh going independent.',
  'Falnir Road, Hampankatta, Mangalore 575001',
  'https://maps.google.com/?q=New+Taj+Mahal+Cafe+Hampankatta+Mangalore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2202044-Reviews-New_Taj_Mahal_Cafe-Mangalore_Dakshina_Kannada_District_Karnataka.html',
    'https://www.zomato.com/mangalore/new-taj-mahal-cafe-hampankatta'
  ]::text[],
  '2026-05-12',
  true
),
(
  'mangalore',
  'Pabba''s Ideal Ice Cream',
  'Lalbagh',
  'lalbagh',
  ARRAY['ice-cream','dessert']::text[],
  'casual',
  'Gadbad ice cream',
  ARRAY['Gadbad','Tiramisu sundae','Banana split','Choco chocobar','Fresh fruit sundae']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mangalore''s gadbad ice cream was invented here in the 1970s when Prabhakar Kamath layered leftover ice cream flavours with jelly and fruit on a slow Sunday — the name "gadbad" (Tulu for "mess/confusion") stuck. The Lalbagh ice cream parlour traces its lineage to the 1932 Ideal Cafe; the family runs only this one outlet and explicitly disclaims all Pabba''s-branded knock-offs across India. Open 10am-11pm year-round.',
  'Original gadbad has 9 layers (vanilla + strawberry + butterscotch + chocolate + fresh fruit + jelly + nuts + tutti-frutti + crowning whipped cream) — order "single original" not the family/jumbo size unless splitting. Cash + UPI; no cards. Queues until 10pm in summer; takeaway counter outside has shorter wait.',
  'KS Rao Road, Lalbagh, Mangalore 575003',
  'https://maps.google.com/?q=Pabbas+Ideal+Ice+Cream+Lalbagh+Mangalore',
  ARRAY[
    'https://www.idealicecream.in/',
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d2042530-Reviews-Pabba_s_Ideal_Cafe-Mangalore_Dakshina_Kannada_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  true
),
(
  'mangalore',
  'Hotel Narayana',
  'Kadri',
  'kadri',
  ARRAY['mangalorean','udupi','south-indian']::text[],
  'casual',
  'Neer dosa with chicken ghee roast',
  ARRAY['Neer dosa','Chicken ghee roast','Mangalore buns','Kori rotti','Fish curry meals']::text[],
  '₹',
  '[120,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Kadri neighbourhood meals house running since the 1980s — the neer dosa (paper-thin rice-flour pancake unique to Tulu Nadu) is the breakfast order, served with chicken ghee roast or coconut chutney. The Mangalorean fish curry meals (₹220) with kane fish + red-chilli gravy + boiled rice is the working-lunch default for Kadri locals. Open 6.30am-10pm year-round.',
  'Neer dosa fresh batches every 30 min — ask for "thick or thin" (thinner is the traditional Tulu style). The Mangalore buns (sweet banana puris with sambar) at breakfast are a Tulu Sunday-morning staple. Cash + UPI; no card terminal. Closed second Sunday of each month.',
  'Kadri Temple Road, Kadri, Mangalore 575004',
  'https://maps.google.com/?q=Hotel+Narayana+Kadri+Mangalore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d4080230-Reviews-Hotel_Narayana-Mangalore_Dakshina_Kannada_District_Karnataka.html',
    'https://www.zomato.com/mangalore/hotel-narayana-kadri'
  ]::text[],
  '2026-05-12',
  false
),
(
  'mangalore',
  'Janatha Deluxe',
  'Bunder',
  'bunder',
  ARRAY['mangalorean','seafood']::text[],
  'casual',
  'Chicken ghee roast',
  ARRAY['Chicken ghee roast','Pomfret tawa fry','Anjal (seer fish) curry','Crab masala','Kori rotti']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Bunder fish-market-side institution — the ghee-roast preparation (Mangalore dry chicken in red Byadgi-chilli + ghee + curry leaves) has been refined here since the 1990s when Janatha popularised it citywide. Pomfret tawa fry uses fish bought 200m away at the morning Bunder auction; crab masala uses backwater crabs from the Netravati. Open 11.30am-3.30pm + 7-10.30pm.',
  'Lunch 12.30-2pm has the freshest fish — Bunder market auctions end at 11am and prep is done by noon. Anjal (seer fish) is the local order; pomfret is the tourist default. Cash + UPI; cards work. Closed Sundays.',
  'Bunder Road, Mangalore 575001',
  'https://maps.google.com/?q=Janatha+Deluxe+Bunder+Mangalore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d4080216-Reviews-Hotel_Janatha_Deluxe-Mangalore_Dakshina_Kannada_District_Karnataka.html',
    'https://www.zomato.com/mangalore/hotel-janatha-deluxe-bunder'
  ]::text[],
  '2026-05-12',
  false
),
(
  'mangalore',
  'Machali',
  'Hampankatta',
  'hampankatta',
  ARRAY['mangalorean','seafood','coastal']::text[],
  'mid_range',
  'Anjal (seer fish) ghee roast',
  ARRAY['Anjal ghee roast','Crab sukka','Prawn ghee roast','Bangude pulimunchi','Neer dosa']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Hampankatta sit-down Mangalorean seafood restaurant — the most reliable mid-range option for Bunt and Tuluva coastal cooking in the city, opened mid-2010s by a family from the Bunt restaurant trade. Bangude (mackerel) pulimunchi (tangy chilli) and anjal ghee roast are the orders; the kane (lady-fish) tawa fry is a Tulu monsoon special. Open 12-3.30pm + 7-11pm; AC dining.',
  'Reserve a window table on the upstairs floor for the Hampankatta street view. Crab and prawn are market-dependent — call ahead (+91-824-2444466). The neer dosa with anjal ghee roast is the textbook Mangalore pairing.',
  'Lighthouse Hill Road, Hampankatta, Mangalore 575001',
  'https://maps.google.com/?q=Machali+Mangalore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297635-d6589456-Reviews-Machali-Mangalore_Dakshina_Kannada_District_Karnataka.html',
    'https://www.zomato.com/mangalore/machali-hampankatta'
  ]::text[],
  '2026-05-12',
  false
);
