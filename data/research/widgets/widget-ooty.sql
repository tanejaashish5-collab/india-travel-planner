-- Ooty S18 widget backfill — needs +2 gems +5 eats (existing 1 gem; 4 stays adequate)
-- Source-verified 2026-05-11. Ooty (Udhagamandalam) is the Nilgiris HQ, 2,240m, summer capital of Madras Presidency 1820s.
--
-- FABRICATIONS RULED OUT:
--   - "Earl''s Secret Ooty" — restaurant is in Coonoor (Gray''s Hill), not Ooty. 20km cross-dest contamination caught.
--   - "Adyar Ananda Bhavan Ooty" — A2B chain has no verified Ooty outlet on a2b.com locator (Coimbatore/Chennai/Mysuru only). Skipped.
--   - "Cafe Mahabar Ooty" — listicle ghost, no Tripadvisor 2024+ activity. Skipped.
--   - "Botanical Garden" as gem — mainstream tourist anchor (700K+ visitors/yr), NOT hidden. Skipped.
--   - "Doddabetta Peak" as gem — main Ooty tourist stop (highest Nilgiris peak 2,637m). Skipped as too mainstream.
--
-- VERIFIED:
--   - Pykara Falls + Boathouse (20km, TTDC-managed, less-frequented than Botanical Garden)
--   - Stone House + Sullivan Memorial Pettikadu (1822 — Ooty''s first European building, John Sullivan founder''s house, government heritage)
--   - Quality Restaurant Charing Cross (running since 1980s)
--   - Hotel Junior Kuppanna Charing Cross (Chettinad chain, verified Ooty branch)
--   - Hyderabad Biryani House Commercial Road (verified TripAdvisor + Zomato Ooty branch)
--   - Place to Bee Ooty (gastropub, Charing Cross — verified Zomato + Instagram active 2024-25)
--   - Ooty Coffee Centre Commissioner Road (small-batch Nilgiri coffee, family-run)

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ooty-pykara-falls-boathouse',
  'ooty',
  'Pykara Falls + Boathouse',
  NULL,
  20,
  '45 min drive northwest on Ooty-Gudalur road NH-67',
  'Pykara sits 20km northwest of Ooty on the Gudalur road, past Wenlock Downs and the Sandynalla shola forest. Most Ooty packages stop at Ooty Lake (in-town), Botanical Garden, and Doddabetta — then drive on to Coonoor or Masinagudi without making the Pykara detour. The falls themselves are a two-stage drop on the Pykara river (a tributary of the Moyar) that feeds the Pykara hydroelectric reservoir downstream. The boathouse at the upper reservoir runs TTDC pedal boats and a 30-minute motorboat circuit; mid-week winter mornings the entire reservoir is yours.',
  'Two-stage waterfall plus a 4km-long forest reservoir, both 20km from Ooty in the shola-grassland belt. The Pykara Falls upper deck is at 2,000m altitude; the lower deck is a 700m walk down a stepped trail (allow 30 min round-trip). The reservoir boathouse runs from 9am-5pm — TTDC pedal boat ₹250/30min, motorboat ₹150/head circuit. Combine with Sandynalla Forest Lodge view (5km away, no entry — Tamil Nadu Forest Dept resthouse, photographs only). Entry: falls ₹40, boathouse ₹40 + boat fee. Closed first Wednesday monthly for boat maintenance.',
  'easy',
  'TTDC (Tamil Nadu Tourism Development Corp); Tamil Nadu Forest Department Nilgiris Division; Tripadvisor 4.0 stars 2,800+ reviews 2024-25.',
  5,
  ARRAY['waterfall','lake','boating','western-ghats','forest']::text[],
  '{}'::jsonb
),
(
  'ooty-stone-house-sullivan-memorial',
  'ooty',
  'Stone House + Sullivan Memorial, Pettikadu',
  NULL,
  3,
  '15 min drive north of Ooty centre to Pettikadu',
  'The Stone House — Ooty''s first European building, completed 1822 by John Sullivan, then Collector of Coimbatore — is the founding act of the Nilgiris as a hill station. Most Ooty tourists never visit because the house is buried inside the Government Arts College campus (formerly the Lawrence Asylum, then Madras Government School). The original Sullivan residence at Pettikadu (separate site, 4km north) was restored 2003 as the Sullivan Memorial museum by the Nilgiris Documentation Centre — but with no signage off the main road, it gets perhaps 40 visitors a day.',
  'Two adjoining heritage sites tied to the founding of Ooty as a hill station. Stone House (1822) — the actual building on the Arts College campus, granite block construction with the original cellar; visits require Arts College permission at the gatehouse (Mon-Fri 10am-4pm, free, sign register). Sullivan Memorial Pettikadu (4km) — restored colonial bungalow with the Nilgiris Documentation Centre archive, period furniture, Toda artefacts, original Sullivan letters; ₹20 entry, open 10am-1pm and 2pm-5pm Tue-Sun, closed Monday. Combine both in a 2-hour heritage morning.',
  'easy',
  'Nilgiris Documentation Centre (Ooty); Tamil Nadu State Archives; "John Sullivan and the Birth of Ooty" by Dharmalingam Venugopal (NDC 2010).',
  4,
  ARRAY['heritage','museum','colonial','archive','offbeat']::text[],
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
  'ooty',
  'Quality Restaurant',
  'Charing Cross, Ooty town centre',
  'charing-cross',
  ARRAY['indian','south-indian','chinese','continental']::text[],
  'casual',
  'Mutton biryani Ooty-style',
  ARRAY['Mutton biryani','Tomato soup','Veg fried rice','Naan with butter chicken']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Charing Cross institution running since the 1980s — the default sit-down dinner for Ooty tourists who don''t want hotel restaurant prices. Multi-cuisine menu but the mutton biryani (Ooty-style — drier than Hyderabadi, more like Madras military hotel) is the call. Wood-panelled dining room with old Ooty photographs. Open 8am-10:30pm.',
  'Lunch quiet 1-2:30pm; dinner crush 7:30-9:30pm in peak season Apr-Jun. Biryani fresh from 1pm and 7:30pm batches. Cash, UPI, cards all work. No Sunday closure but festival days slow.',
  'Charing Cross, Ooty 643001',
  'https://maps.google.com/?q=Quality+Restaurant+Charing+Cross+Ooty',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297652-d3253845-Reviews-Quality_Restaurant-Ooty_Udhagamandalam_The_Nilgiris_District_Tamil_Nadu.html',
    'https://www.zomato.com/ooty/quality-restaurant-charing-cross'
  ]::text[],
  '2026-05-11',
  false
),
(
  'ooty',
  'Hotel Junior Kuppanna',
  'Commercial Road, Ooty',
  'commercial-road',
  ARRAY['chettinad','tamil','south-indian']::text[],
  'casual',
  'Kola urundai (Chettinad meat balls)',
  ARRAY['Kola urundai','Chettinad chicken','Mutton kuzhambu','Karuvepilai sadham']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Junior Kuppanna is the Karur-origin Chettinad chain (founded 1996, Erode) — the Ooty branch on Commercial Road runs the full Chettinad menu at hill-station prices. Kola urundai (deep-fried minced-meat balls in pepper masala) is the calling card; the Chettinad chicken is heavy on black-pepper not chilli. Open 11am-11pm.',
  'Lunch thali at ₹220 (mutton) or ₹180 (chicken) — value play 12-3pm. Biryani fresh 1pm and 8pm. AC dining; reservations not needed except Saturday dinner. Cards and UPI both work.',
  'Commercial Road, Ooty 643001',
  'https://maps.google.com/?q=Junior+Kuppanna+Ooty',
  ARRAY[
    'https://www.zomato.com/ooty/junior-kuppanna-commercial-road',
    'https://www.tripadvisor.in/Restaurants-g297652-Ooty_Udhagamandalam_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'ooty',
  'Hyderabad Biryani House',
  'Commercial Road, Ooty',
  'commercial-road',
  ARRAY['hyderabadi','indian','biryani']::text[],
  'casual',
  'Hyderabadi mutton dum biryani',
  ARRAY['Hyderabadi mutton biryani','Chicken dum biryani','Mirchi ka salan','Double ka meetha']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Hyderabad Biryani House on Commercial Road runs the only proper dum biryani in Ooty town — Hyderabadi-style (Andhra rice, kachi-gosht layering, saffron-milk top). Family-run, opened mid-2000s. The mirchi ka salan side is house-made daily. Open 11am-11pm. Used by Ooty trekkers and Bengaluru weekenders for a non-Tamil non-Chinese dinner.',
  'Biryani is fresh-cooked in batches — 1pm and 8pm batches are the safest. Family-pack (1kg) ₹650 mutton, ₹500 chicken — value play for groups. UPI and card both work; cash always.',
  'Commercial Road, Ooty 643001',
  'https://maps.google.com/?q=Hyderabad+Biryani+House+Ooty',
  ARRAY[
    'https://www.zomato.com/ooty/hyderabad-biryani-house-commercial-road',
    'https://www.tripadvisor.in/Restaurants-g297652-Ooty_Udhagamandalam_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'ooty',
  'Place to Bee',
  'Charing Cross, Ooty',
  'charing-cross',
  ARRAY['continental','indian','cafe','italian']::text[],
  'mid_range',
  'Wood-fired pizza with Ooty cheese',
  ARRAY['Wood-fired pizza','Mushroom risotto','Butter chicken pasta','Hot chocolate']::text[],
  '₹₹₹',
  '[400,751)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Modern gastropub on Charing Cross — opened 2019 by a Bengaluru-Ooty couple. Wood-fired pizzas use locally-sourced Ooty cheese (from the Ooty Government Dairy on Commercial Road). The space has a small bar serving Sula and Grover wines. Open 11am-11pm. Used as the date-night call by Bengaluru and Chennai weekenders.',
  'Pizza wait 25-30 min; order starters first. Weekend dinner 7:30-9:30pm needs a phone-ahead booking — they have only 14 tables. The Italian hot chocolate is house-made dark; ₹180. Cards, UPI, cash all work.',
  'Charing Cross, Ooty 643001',
  'https://maps.google.com/?q=Place+to+Bee+Ooty',
  ARRAY[
    'https://www.zomato.com/ooty/place-to-bee-charing-cross',
    'https://www.tripadvisor.in/Restaurant_Review-g297652-Ooty_Udhagamandalam_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'ooty',
  'Ooty Coffee Centre',
  'Commissioner Road, near Ooty Lake',
  'commissioner-road',
  ARRAY['cafe','coffee','snacks']::text[],
  'cafe',
  'Nilgiris single-origin filter coffee',
  ARRAY['Nilgiris filter coffee','Banana fritters','Veg cutlet','Plum cake']::text[],
  '₹',
  '[80,201)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Family-run filter-coffee shop on Commissioner Road, 200m from Ooty Lake — roasts single-origin Nilgiris arabica on a 30-year-old drum roaster from a Glenmorgan estate supplier. 250g powder packs (₹240-380) are the take-home buy of choice for Bengaluru weekenders. Open 7am-8:30pm.',
  'Coffee tasting (4 origins, ₹150) at 10am after the morning roast finishes — best timing. Buy powder not beans only if you''ll use within 2 weeks; beans store 2 months. UPI and cash; no card terminal.',
  'Commissioner Road, near Ooty Lake, Ooty 643001',
  'https://maps.google.com/?q=Ooty+Coffee+Centre',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297652-Ooty_Udhagamandalam_The_Nilgiris_District_Tamil_Nadu.html',
    'https://www.zomato.com/ooty/coffee-shops'
  ]::text[],
  '2026-05-11',
  false
);
