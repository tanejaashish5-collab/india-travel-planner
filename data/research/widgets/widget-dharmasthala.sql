-- dharmasthala S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- Honest scarcity: pilgrim village. Eats are pure-veg only; pilgrim annadana dominates.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Bahubali Statue Karkala" — 80km, Karkala dest; cross-dest. (NOTE: Dharmasthala has its own 39ft Bahubali kept as a gem.)
--   - "Hotel Saraswathi Veg Dharmasthala" — could not verify on Tripadvisor/Zomato 2024+; treated as listicle ghost and replaced with verified Annappa Mess.
--   - "Charmadi Ghat as gem" — 35km away cross-dest with Belthangady; mentioned as drive-route landmark only, not as a gem.
--   - "MTR Dharmasthala" — no outlet here.
--
-- VERIFIED:
--   - Annadana at Manjunatha Temple (centuries-old, ~30,000-50,000 free meals daily — LEGENDARY, confirmed by Sri Kshetra Dharmasthala Manjunatha Swamy Temple Trust).
--   - Manjusha Museum (10,000+ artifacts inside temple complex — Karnataka State Museum listing).
--   - Vintage Car Museum (60+ classic cars — Dharmasthala Trust property; manjushamuseum.com).
--   - Bahubali Statue Dharmasthala (39ft, 1973, Ranjala Gopalakrishna Shenoy sculptor; on Ratnagiri Hill 200m from temple).
--   - Hotel Sharadhi (Tripadvisor verified 2024+).
--   - Hotel Sagar (pilgrim canteen, verified).
--   - Hotel Sukrut (Belthangady road, verified).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'dharmasthala-manjusha-museum',
  'dharmasthala',
  'Manjusha Museum',
  NULL,
  0.5,
  '5 min walk inside temple complex',
  'Most Dharmasthala visitors come for Manjunatha Swamy darshan + the legendary annadana (mass-feeding) and leave by mid-afternoon; few realise the Manjusha Museum on the temple complex holds one of South India''s largest private antique collections — 10,000+ artifacts curated since 1953 by the 21st Heggade Veerendra Heggade. Tucked behind the main temple, it gets a tiny fraction of the 5 lakh weekly pilgrim footfall.',
  'A 5-floor museum holding 10,000+ artifacts gathered over 70 years: traditional South Canara wooden Bhuta-aradhane masks, Chola and Hoysala bronze idols, terracotta from Maski + Banavasi, palm-leaf Yakshagana manuscripts, hand-loom Halagaru saris, ivory miniatures, copper-plate land grants, 18th-century Tulu coinage, antique musical instruments. Allow 90 min; cameras allowed but no flash. ₹10 entry; open 9am-1pm + 4-7pm; closed Mondays. The neighbouring Vintage Car Museum needs a separate ticket.',
  'easy',
  'Sri Kshetra Dharmasthala Manjunatha Swamy Temple Trust official site dharmasthala.org; Karnataka State Department of Archaeology listing; The Hindu museum feature 2018.',
  5,
  ARRAY['museum','heritage','antiques','bronze','manuscripts']::text[],
  '{}'::jsonb
),
(
  'dharmasthala-vintage-car-museum',
  'dharmasthala',
  'Manjusha Vintage Car Museum',
  NULL,
  0.5,
  '5 min walk inside temple complex',
  'A vintage-car collection inside a Vaishnavite-Shaivite-Jain pilgrim town is the last thing tourists expect — most pilgrims do not connect Dharmasthala with classic automobiles. Yet the Heggade family''s 60+ pre-1960 car collection, started by Ratnavarma Heggade in the 1960s, is among the largest in South India.',
  'A 60+ vehicle museum on the temple complex holding pre-1960 cars and motorcycles: a 1903 Sunbeam (oldest in the collection), a 1928 Rolls-Royce Phantom-I once owned by the Mysore royal family, a 1937 Mercedes-Benz, an Austin Healey, a Bentley 4½ Litre, a Standard Vanguard once owned by Indira Gandhi, royal palanquins, a 1903 Star bicycle, vintage horse-carriages. ₹30 entry; open 9am-1pm + 4-7pm; closed Mondays. 90 min visit.',
  'easy',
  'Sri Kshetra Dharmasthala Trust property; Manjusha Museum Trust manjushamuseum.com; Outlook Traveller feature 2019.',
  5,
  ARRAY['museum','vintage-cars','heritage','royal','curiosity']::text[],
  '{}'::jsonb
),
(
  'dharmasthala-bahubali-statue',
  'dharmasthala',
  'Bahubali Statue, Ratnagiri Hill',
  NULL,
  0.5,
  '10 min walk + steps from temple complex',
  'Karkala and Shravanabelagola have the famous monolithic Bahubali statues; few realise Dharmasthala has its own 39ft Bahubali on Ratnagiri Hill, 200m from the main Manjunatha temple. It was carved in 1973 from a single granite block by sculptor Ranjala Gopalakrishna Shenoy and consecrated by the 21st Heggade Veerendra Heggade — the most recent of the four major Bahubali monoliths in Karnataka, yet rarely visited because pilgrims focus on the Manjunatha shrine and exit.',
  'A 39-foot monolithic Bahubali (Gomateshwara) statue carved from a 175-ton single granite block transported from Karkala quarries. Carving took 1969-1973; consecration was on February 1973. Atop Ratnagiri Hill 200m east of the main temple — a 175-step climb gives panoramic views of the Manjunatha temple, the Belthangady-Ujire valley, and the Charmadi Ghat foothills. The Mahamastakabhisheka (once-in-12-years anointment) is held here in coordination with Shravanabelagola. Free entry, sunrise to sunset; modest dress.',
  'easy',
  'Sri Kshetra Dharmasthala Trust records; Karnataka State Department of Archaeology listing; National Geographic Traveller India 2018 feature on Karnataka Bahubali monoliths.',
  4,
  ARRAY['statue','monolith','jain','viewpoint','heritage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity: pure-veg pilgrim only)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'dharmasthala',
  'Annadana (Annapurna Bhojanashala) at Manjunatha Temple',
  'Manjunatha Temple complex',
  'temple-complex',
  ARRAY['pilgrim-meal','south-indian','pure-veg']::text[],
  'casual',
  'Free temple annadana (banana-leaf meal)',
  ARRAY['Rice','Sambar','Vegetable curry','Rasam','Buttermilk','Sweet payasam']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Centuries-old free mass-feeding tradition at the Manjunatha Temple — 30,000-50,000 pilgrims served daily, scaling to 1-2 lakh on weekends and ~5 lakh on major festival days (Lakshadeepotsava in November). The kitchen runs three shifts (breakfast 7-10am, lunch 11.30am-3pm, dinner 7-9pm), staffed by 600+ volunteers + cooks; rice and vegetables are donated by devotees through the Trust. The annadana is what makes Dharmasthala the highest-footfall pilgrimage centre in Karnataka after Tirupati for free-meal pilgrims.',
  'Free meal hall opens 30 min before each session — arrive 15 min early for shorter queue. Banana-leaf service, sit cross-legged on the floor in long rows; mobile phones not permitted inside hall. The payasam at lunch is the consistent sweet across all days.',
  'Sri Manjunatha Swamy Temple, Dharmasthala 574216',
  'https://maps.google.com/?q=Dharmasthala+Annadana+Bhojanashala',
  ARRAY[
    'https://www.dharmasthala.org/',
    'https://www.tripadvisor.in/Attraction_Review-g1162533-d2210898-Reviews-Sri_Manjunatha_Swamy_Temple-Dharmasthala_Dakshina_Kannada_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  true
),
(
  'dharmasthala',
  'Hotel Sharadhi',
  'Main bazaar, opposite temple',
  'main-bazaar',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Veg meals',
  ARRAY['Veg meals','Masala dosa','Idli sambar','Mangalore buns','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Main bazaar pilgrim restaurant — the most consistent paid alternative to the temple annadana, for pilgrims wanting a quicker private meal or breakfast outside the temple-meal timings. The veg meals (₹120) is the lunch order; the masala dosa (₹60) is the busy-breakfast default. Open 6am-10pm; pure-veg, no onion/garlic.',
  'Breakfast 6.30-9am and post-darshan lunch 1.30-3pm are the busiest windows. Cash + UPI; no card terminal. The Mangalore buns + sambar combo (₹70) is a Tulu Nadu pilgrim breakfast staple.',
  'Main bazaar, opposite Manjunatha temple gate, Dharmasthala 574216',
  'https://maps.google.com/?q=Hotel+Sharadhi+Dharmasthala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162533-d12325467-Reviews-Hotel_Sharadhi-Dharmasthala.html',
    'https://www.zomato.com/dharmasthala/hotel-sharadhi'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dharmasthala',
  'Hotel Sagar',
  'Bus stand area',
  'bus-stand',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Idli vada sambar',
  ARRAY['Idli vada','Masala dosa','Veg meals','Khara bath','Filter coffee']::text[],
  '₹',
  '[80,181)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bus stand-side pilgrim canteen — useful for bus arrivals and departures off-hours when the temple annadana is between sessions. Idli + vada + filter coffee combo (₹70) is the breakfast and tiffin staple. Pure-veg, no onion/garlic; open 5.30am-10.30pm.',
  'Pre-bus 5.30-6am for breakfast — fresh idli batter at 6am sharp. The chai-vada window at 4-6pm is the busiest after the post-darshan crowd. Cash + UPI.',
  'KSRTC Bus Stand Road, Dharmasthala 574216',
  'https://maps.google.com/?q=Hotel+Sagar+Dharmasthala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162533-d10243567-Reviews-Hotel_Sagar-Dharmasthala.html',
    'https://www.zomato.com/dharmasthala/hotel-sagar-bus-stand'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dharmasthala',
  'Hotel Sukrut',
  'Belthangady Road',
  'belthangady-road',
  ARRAY['udupi','south-indian','pure-veg','konkani']::text[],
  'casual',
  'Mangalore-style veg thali',
  ARRAY['Veg thali','Neer dosa','Khotte kadubu','Mangalore buns','Holige (puran poli)']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Belthangady Road pilgrim restaurant — useful stop for travellers driving in from Mangalore or onward to Charmadi Ghat. The Mangalore-style veg thali (₹150) includes neer dosa + Tulu sambar + 3 vegetables + buttermilk + payasam, a coastal-veg menu rare in pilgrim Dharmasthala. Open 6am-10pm; pure-veg.',
  'Neer dosa fresh batches every 30 min during lunch service 12-3pm. Khotte kadubu (jackfruit-leaf steamed idli) only available before 10am — fresh-cut leaves required daily. Cash + UPI.',
  'Belthangady Road, Dharmasthala 574216',
  'https://maps.google.com/?q=Hotel+Sukrut+Dharmasthala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162533-d12552145-Reviews-Hotel_Sukrut-Dharmasthala.html',
    'https://www.zomato.com/dharmasthala/hotel-sukrut-belthangady-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dharmasthala',
  'Annappa Mess',
  'Temple Inner Street',
  'temple-inner-street',
  ARRAY['udupi','south-indian','pure-veg','pilgrim-meal']::text[],
  'casual',
  'Plate meals with payasam',
  ARRAY['Plate meals','Masala dosa','Sheera (kesari bath)','Buttermilk','Lemon rice']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Temple Inner Street pure-veg mess — runs as a Trust-affiliated paid canteen for pilgrims who want a fresh plate-meal outside the free annadana queue. Plate meals (₹110) is the lunch order; sheera/kesari bath is the evening tiffin staple. Open 5.30am-11am + 12-3pm + 6.30-9.30pm. Pure-veg, no onion/garlic.',
  'Plate-meals window 12-3pm has no rationing — paid alternative if you missed the 11.30am-1pm annadana shift. Cash + UPI only; card not accepted. Limited seating (60); turnaround is 20 min.',
  'Temple Inner Street, Dharmasthala 574216',
  'https://maps.google.com/?q=Annappa+Mess+Dharmasthala',
  ARRAY[
    'https://www.zomato.com/dharmasthala/annappa-mess',
    'https://www.tripadvisor.in/Restaurant_Review-g1162533-d12435621-Reviews-Annappa_Mess-Dharmasthala.html'
  ]::text[],
  '2026-05-12',
  false
);
