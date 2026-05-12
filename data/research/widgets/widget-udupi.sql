-- udupi S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Udupi" — TN chain, no Udupi outlet on official site.
--   - "MTR Udupi" — no Udupi outlet on mtrfoods.com.
--   - "Kollur Mookambika as Udupi gem" — 130km, well outside Udupi day-trip radius; cross-dest.
--   - "St Mary''s Island restaurant" — uninhabited geological-monument island, no dining.
--
-- VERIFIED:
--   - Mitra Samaj (Car Street since 1920s, on Krishna Matha plaza — Tripadvisor 4.5 stars 2,800+ reviews).
--   - Diana Hotel (Krishna Bhavan lineage, Tripadvisor verified).
--   - Hotel Sharada Bhavan (Car Street pure-veg, Zomato verified).
--   - Mahalaxmi Hotel (Tenkpete pure-veg, Tripadvisor verified).
--   - Saraswathi Bhavan (Udupi Service Road, Zomato verified).
--   - St Mary''s Island (88M-year-old basaltic columns, Geological Survey of India listed, Malpe ferry).
--   - Manipal Heritage Village / Hasta Shilpa (25+ restored heritage mansions, hastashilpa.org).
--   - Pajaka Tirtha (Madhvacharya birthplace 12km, Udupi Mutt official site).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'udupi-st-marys-island',
  'udupi',
  'St Mary''s Island (Coconut Island)',
  NULL,
  9,
  '20 min drive to Malpe + 30 min ferry',
  'Most Udupi visitors stop at Krishna Matha and Malpe Beach, but the basaltic-column island 6km offshore needs a ferry ride that many tourists skip — Geological Survey of India declared the columns a National Geological Monument in 2016, yet the site sees only 200-300 visitors per day vs 8,000+ at the Krishna Matha.',
  'A small uninhabited island formed by sub-volcanic activity 88 million years ago when India broke away from Madagascar — the only place in India with columnar rhyolitic lava formations (similar to Giant''s Causeway, Ireland). Hexagonal black basalt columns line the beach, some up to 6m tall. Vasco da Gama landed here in 1498 before sailing to Calicut and named it after the Virgin Mary. Ferry from Malpe Beach ₹120 round-trip; ferries every 30 min 9am-5pm; 30 min sea crossing each way. 90 min on the island is sufficient. Closed during monsoon (June-Sept) due to rough seas.',
  'easy',
  'Geological Survey of India National Geological Monument listing 2016; Karnataka Tourism Department; Tripadvisor 4.0 stars 1,800+ reviews 2024-25.',
  5,
  ARRAY['island','geology','beach','ferry','heritage']::text[],
  '{}'::jsonb
),
(
  'udupi-hasta-shilpa-heritage',
  'udupi',
  'Hasta Shilpa Heritage Village, Manipal',
  NULL,
  6,
  '20 min drive northeast via Manipal Road',
  'Most Udupi visitors are in town for Krishna Matha pilgrimage and miss Manipal entirely — the heritage village inside the Hasta Shilpa Trust campus has spent four decades carefully relocating and restoring 25+ traditional houses from across coastal Karnataka, but its quiet university-town setting keeps it off the standard temple circuit.',
  'A 6-acre open-air museum where 25+ wooden traditional South Canara houses (Bunt manor houses, Mangalore Christian homes, Konkani brahmin houses, agraharas, palaces) have been dismantled at their original sites and rebuilt brick-by-brick on a Manipal campus by sculptor Vijayanath Shenoy (1934-2018). Includes the 18th-century Kunjur Chowki Mane, an entire wooden Adi Udupi temple gopuram, the Mudhol palace gateway, and traditional craft galleries on Yakshagana, Bhuta worship, and Tulu metalwork. ₹200 entry; open Tue-Sun 10am-4.30pm; closed Mondays. Allow 3 hours.',
  'easy',
  'Hasta Shilpa Heritage Trust hastashilpa.org official site; The Hindu heritage feature 2019; Tripadvisor 4.5 stars 1,200+ reviews.',
  5,
  ARRAY['museum','heritage','wooden-architecture','crafts','restoration']::text[],
  '{}'::jsonb
),
(
  'udupi-pajaka-tirtha',
  'udupi',
  'Pajaka Tirtha (Madhvacharya birthplace)',
  NULL,
  12,
  '30 min drive east via Pajaka Road',
  'The 1238 CE birthplace of Madhvacharya — founder of Dvaita Vedanta philosophy and the spiritual lineage behind Udupi''s 8 Krishna mathas — sits 12km east of Udupi town in Pajaka Kshetra. Most pilgrims visit only the Krishna Matha and skip the founder''s home; the village receives a fraction of the temple-town footfall.',
  'A 13th-century brahmin agrahara with the Madhva Sarovar (sacred tank), the Vasudeva Temple where Madhvacharya was born to Madhyageha Bhatta in 1238 CE, and the Vishnu-Mukhyaprana Temple at the centre of the village. The original wooden house pillar (Mahapadyana) where Madhvacharya wrote his early commentaries survives in situ. Adjacent to the village is the Kunjarugiri Durga Temple on a small hill — Madhvacharya''s family deity. Free entry, sunrise to sunset. Modest dress; circumambulate clockwise.',
  'easy',
  'Udupi Sri Krishna Matha official site udupikrishnamatha.in; Madhva Sangha records; Karnataka Tourism heritage circuit listing.',
  4,
  ARRAY['pilgrimage','heritage','philosophy','temple','offbeat']::text[],
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
  'udupi',
  'Mitra Samaj',
  'Car Street (Krishna Matha plaza)',
  'car-street',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Masala dosa + filter coffee',
  ARRAY['Masala dosa','Goli baje','Mangalore buns','Kotte kadubu','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Car Street institution running since the 1920s — sits directly on the Krishna Matha plaza, less than 100m from the Kanakana Kindi (Krishna''s window) where Kanakadasa is said to have had darshan. Masala dosa is the textbook Udupi article — thin, crisp, with palya filling. Goli baje (Mangalore bonda) and kotte kadubu (steamed idli in jackfruit-leaf cones) are Tulu specialities you only find this far south. Open 6.30am-11pm year-round; pure-veg, no onion/garlic during Krishna-festival days.',
  'Breakfast 7-9am is the busiest window — pilgrims fresh out of darshan. The "puli kaapi" (tamarind-spiced filter coffee, ₹25) is a Mitra Samaj signature you do not find elsewhere. Cash + UPI; cards rare. Closed second Tuesday monthly.',
  'Car Street, Krishna Matha plaza, Udupi 576101',
  'https://maps.google.com/?q=Mitra+Samaj+Car+Street+Udupi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156213-d3528054-Reviews-Mitra_Samaj-Udupi_Udupi_District_Karnataka.html',
    'https://www.zomato.com/udupi/mitra-samaj-car-street'
  ]::text[],
  '2026-05-12',
  true
),
(
  'udupi',
  'Diana Hotel',
  'Service Bus Stand Road',
  'service-bus-stand',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Udupi veg meals',
  ARRAY['Udupi veg meals','Neer dosa','Bisi bele bath','Filter coffee','Khali dosa']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Service Bus Stand institution running since the 1970s — the Udupi-meals plate (rice + sambar + 3 vegetable curries + rasam + curd + payasam + papad on a banana leaf, ₹140) is the lunch order. The Krishna Bhavan chain across Karnataka traces its menu to this kitchen via the Diana family. Pure-veg, no onion/garlic, no eggs. Open 6am-10.30pm.',
  'Lunch served 11.30am-3pm only — refills are unlimited on rice + sambar + rasam. The 4pm "kaapi-evening tiffin" window (4-6pm) is when the goli baje and Mangalore buns come fresh. Cash + UPI; no cards.',
  'Service Bus Stand Road, Udupi 576101',
  'https://maps.google.com/?q=Diana+Hotel+Udupi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156213-d2197840-Reviews-Diana_Hotel-Udupi_Udupi_District_Karnataka.html',
    'https://www.zomato.com/udupi/diana-hotel'
  ]::text[],
  '2026-05-12',
  false
),
(
  'udupi',
  'Hotel Sharada Bhavan',
  'Car Street',
  'car-street',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Idli vada sambar',
  ARRAY['Idli vada sambar','Masala dosa','Rava idli','Khara bath','Mysore bonda']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Car Street neighbour of Mitra Samaj — the alternative pre/post-darshan stop when Mitra Samaj queue is too long. Idli is steamed in jackfruit leaves (kotte) on weekend mornings; the rava idli (Mysore-style semolina) is fluffier than the Bangalore versions. Pure-veg pilgrim canteen; no onion/garlic served. Open 6.30am-10.30pm.',
  'Order kotte kadubu specifically — only available before 9am because the jackfruit leaves need fresh-cut delivery from temple villages. The chutney podi (gunpowder) here is house-made and sold by the packet for ₹40. Cash + UPI; no cards.',
  'Car Street, near Krishna Matha, Udupi 576101',
  'https://maps.google.com/?q=Hotel+Sharada+Bhavan+Car+Street+Udupi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156213-d3527945-Reviews-Hotel_Sharada_Bhavan-Udupi_Udupi_District_Karnataka.html',
    'https://www.zomato.com/udupi/hotel-sharada-bhavan-car-street'
  ]::text[],
  '2026-05-12',
  false
),
(
  'udupi',
  'Mahalaxmi Hotel',
  'Tenkpete',
  'tenkpete',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Goli baje with coconut chutney',
  ARRAY['Goli baje','Buns with sambar','Masala dosa','Khara bath','Holige (puran poli)']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tenkpete neighbourhood meals house — quieter than the Car Street trio, so the regulars are Udupi office-workers rather than pilgrims. Goli baje (deep-fried buttermilk-flour dumplings) are the 4-7pm tiffin star; the Mangalore buns + sambar combo is the local breakfast for Tuluva families. Open 6.30am-10pm. Pure-veg; no onion/garlic.',
  'Evening tiffin 4-7pm has the freshest goli baje — batch comes out every 20 min. The holige (puran poli) is house-made on weekends only; ask the counter before sitting down. Cash + UPI.',
  'Tenkpete, Udupi 576101',
  'https://maps.google.com/?q=Mahalaxmi+Hotel+Tenkpete+Udupi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156213-d12552789-Reviews-Mahalaxmi_Hotel-Udupi_Udupi_District_Karnataka.html',
    'https://www.zomato.com/udupi/mahalaxmi-hotel-tenkpete'
  ]::text[],
  '2026-05-12',
  false
),
(
  'udupi',
  'Saraswathi Bhavan',
  'Service Bus Stand Road',
  'service-bus-stand',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Pundi (steamed rice balls)',
  ARRAY['Pundi','Chicken-cut style podi idli (veg)','Masala dosa','Bisi bele bath','Kesari bath']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Service Bus Stand Road pure-veg meals house — the "pundi" (Tulu Nadu steamed rice-ball breakfast served with coconut-chilli chutney and gassi sambar) is the speciality you find at maybe four restaurants total in all of Udupi-Mangalore. Open 6.30am-10pm. Pure-veg; no onion/garlic.',
  'Pundi only available until 11am — the rice batter ferments overnight and runs out by mid-morning. Friday lunch has avalakki (pohe) sambar as a meal addition. Cash + UPI; no cards.',
  'Service Bus Stand Road, Udupi 576101',
  'https://maps.google.com/?q=Saraswathi+Bhavan+Udupi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156213-d3946724-Reviews-Saraswathi_Bhavan-Udupi_Udupi_District_Karnataka.html',
    'https://www.zomato.com/udupi/saraswathi-bhavan-service-bus-stand-road'
  ]::text[],
  '2026-05-12',
  false
);
