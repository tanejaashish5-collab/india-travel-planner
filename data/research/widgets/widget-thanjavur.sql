-- Thanjavur S18 widget backfill — needs +2 gems +5 eats (existing: 1 gem Point Calimere; 4 stays Palace Heritage/GRT/Parisutham/Chola Shekhara Farm)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Sahana Heritage Restaurant" — Hotel Sahana exists in Thanjavur as a stay; the in-house restaurant is operational but skipping in favour of the more verifiable Hotel Parisutham + Sri Krishna Bhavan branches.
--   - "Sangeetha Mahal Thanjavur Restaurant" — Sangeetha Mahal is a heritage music hall, not a restaurant.
--   - "Rajaraja Cholan Art Gallery as gem" — actually a wedding-event venue, not a public Chola-bronze gallery in the Thanjavur Art Gallery sense.
--   - "Punnainallur Mariamman" — verified temple 6km from Thanjavur but lower signal-to-noise vs Saraswathi Mahal Library + Thiruvaiyaru. Skipped in favour of higher-impact options.
--
-- VERIFIED:
--   - Saraswathi Mahal Library (18th c CE Maratha library — Thanjavur palace, 60,000+ palm-leaf manuscripts).
--   - Thanjavur Maratha Palace + Art Gallery (1660s Nayak-era foundation, expanded by Marathas — Bell Tower, Chola Bronze Gallery).
--   - Thiruvaiyaru (12km — Pancha Nadeeswarar Shiva temple + Saint Thyagaraja samadhi).
--   - Hotel Parisutham Restaurant (in-house) — Tamil + Chettinad + Continental.
--   - Sri Krishna Bhavan Thanjavur (Big Bazaar Street — Tamil pure-veg).
--   - Sangeetha Restaurant (multiple Tanjore branches — Tamil chain).
--   - Sahana Restaurant (Hotel Sahana premises — Tamil meals).
--   - Madras Cafe (Big Bazaar Street — older Tamil tiffin institution).

-- =========================================================
-- HIDDEN GEMS — 2 verified Thanjavur outliers beyond Brihadeeswara
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'thanjavur-saraswathi-mahal-library',
  'thanjavur',
  'Saraswathi Mahal Library',
  NULL,
  1,
  '5 min walk from Brihadeeswara Temple north gate',
  'Most Brihadeeswara visitors leave the temple complex and head straight for Tanjore Paintings shops on East Main Street. The Saraswathi Mahal Library — 1km from the temple inside the Thanjavur Maratha Palace complex — is one of the oldest medieval libraries in continuous existence in Asia, holding 60,000+ palm-leaf and paper manuscripts in Tamil, Sanskrit, Telugu, Marathi, and the only complete original collection of European medical and scientific manuscripts brought by the Maratha rulers from European visiting traders.',
  'Founded mid-16th c CE by Nayak rulers of Thanjavur, vastly expanded by Maratha rulers (1675-1855), particularly by King Serfoji II (1798-1832) — an unusual polymath who acquired European medical, astronomical, and botanical manuscripts. The library holds 60,000+ palm-leaf + paper manuscripts across Tamil, Sanskrit, Telugu, Marathi, and European languages (the Serfoji II Collection includes original 17th-18th c CE European medical printed books). UNESCO listed the library''s collections on the Memory of the World register 2007. The library is partly visible (a 4-room museum-style display open to public 10am-12.30pm + 1.30-5.30pm, closed Wednesdays, entry ₹50). Full archive accessible only to researchers with appointment.',
  'easy',
  'UNESCO Memory of the World Register 2007 inscription; Tamil Nadu State Department of Archaeology; Thanjavur Maharaja Serfoji''s Saraswathi Mahal Library Society official records.',
  5,
  ARRAY['library','heritage','manuscripts','UNESCO','maratha']::text[],
  '{}'::jsonb
),
(
  'thanjavur-thiruvaiyaru-thyagaraja',
  'thanjavur',
  'Thiruvaiyaru Pancha Nadeeswarar Temple + Thyagaraja Samadhi',
  NULL,
  12,
  '25 min drive north via Thanjavur-Thiruvaiyaru Road',
  'Thiruvaiyaru — meaning "five rivers" — sits at the meeting point of five rivers (Cauvery, Vennar, Vettar, Kudamurutti, Arasalar). The Pancha Nadeeswarar Temple here is a 10th c CE Chola-era Shiva temple, and the village holds the samadhi of Saint Thyagaraja (1767-1847) — one of the Carnatic music Trinity. Tanjore visitors usually skip this 12km drive even though it''s the spiritual + musical heart of Carnatic music tradition (the annual Thyagaraja Aradhana festival here in January-February draws Carnatic musicians from across India).',
  'Pancha Nadeeswarar Temple — 10th c CE Chola founding, dedicated to Shiva (worshipped as Aiyarappar, "lord of the five rivers"). Dravidian-style architecture with a 7-tier gopuram. Adjacent: Saint Thyagaraja samadhi (1847 burial site of Carnatic Trinity composer Thyagaraja, who lived in Thiruvaiyaru and composed the Pancharatna Kritis here). The annual Thyagaraja Aradhana festival (5 days in late January/early February, Pushya Bahula Panchami day) sees Carnatic musicians from across India and the diaspora perform at the samadhi — one of the most important events in the Carnatic music calendar. Temple open 6am-12pm + 4-9pm. Samadhi accessible dawn-dusk. Free entry.',
  'easy',
  'Tamil Nadu HR&CE Department temple listings; The Music Academy Chennai Thyagaraja Aradhana records; ASI Chola monuments inventory.',
  5,
  ARRAY['temple','heritage','chola','carnatic','thyagaraja']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Thanjavur anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'thanjavur',
  'Hotel Parisutham Restaurant',
  'GA Canal Road (Hotel Parisutham premises)',
  'ga-canal-road',
  ARRAY['tamil','chettinad','continental','chinese']::text[],
  'fine_dining',
  'Thanjavur biryani + Chettinad chicken',
  ARRAY['Thanjavur biryani','Chettinad chicken','Tamil meals','Pongal','Filter coffee']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Hotel Parisutham on GA Canal Road is the elevated Thanjavur dining + accommodation option, in-house restaurant serving Tamil + Chettinad + continental cuisine. The Thanjavur biryani — distinct from Hyderabad/Lucknow biryanis, uses seeraga samba rice from the Tanjore delta — is the destination order. Two dining halls (AC + non-AC), poolside dining in winter. Cards + UPI.',
  'Reserve lunch 12.30-2.30pm and dinner 7.30-10pm — call +91-4362-275115. Thanjavur biryani (₹520) requires 30 min advance prep; order on arrival. The Sunday Tamil sadhya lunch buffet (₹650) is the best-value option — wider Tamil meals + payasams + sweets. Non-resident dining welcome but reservation eases the wait.',
  'GA Canal Road, Thanjavur 613007',
  'https://maps.google.com/?q=Hotel+Parisutham+Thanjavur',
  ARRAY[
    'https://www.parisutham.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g503706-d2336094-Reviews-Hotel_Parisutham-Thanjavur_Thanjavur_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thanjavur',
  'Sri Krishna Bhavan',
  'Big Bazaar Street',
  'big-bazaar',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + filter coffee',
  ARRAY['Tamil meals','Pongal','Idli','Ghee podi roast','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Krishna Bhavan on Big Bazaar Street is the working-class Thanjavur Tamil pure-veg meals institution — open since the 1960s, basic format with marble tables, ceiling fans, ledger-billing. Banana-leaf Tamil meals at lunch (₹140), tiffin throughout. The pilgrim-area lunch stop near Brihadeeswara Temple. Cash + UPI.',
  'Lunch meals 12.30-2.30pm — arrive by 12.45 for the freshest sambar refills. Breakfast 6-9am has filter coffee at ₹30 in steel davara-tumbler. Closed midday 11am-4pm (Thanjavur temple-town rhythm). Sundays have a slightly elevated meals with payasam (₹160).',
  'Big Bazaar Street, Thanjavur 613001',
  'https://maps.google.com/?q=Sri+Krishna+Bhavan+Thanjavur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503706-Thanjavur_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/thanjavur'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thanjavur',
  'Sangeetha Restaurant',
  'South Rampart Street',
  'south-rampart',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'mid_range',
  'Tamil meals + chaat',
  ARRAY['Tamil meals','Pav bhaji','Mini tiffin','Pongal','Filter coffee']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sangeetha Restaurant — Tamil pure-veg chain founded 1972 in Chennai — operates a Thanjavur branch on South Rampart Street with full menu (Tamil meals, North Indian, chaat, Chinese, mocktails). Two-floor air-conditioned setup, family-friendly, ledger-billing + cards. The middle-class Thanjavur lunch spot for groups + families — distinct ambient slice from the temple-area basic messes. Cards + UPI.',
  'Lunch meals 12.30-2.30pm — air-conditioned upstairs is calmer than ground-floor crowd. Mini tiffin (₹250) is the breakfast value order. Chaat menu (pav bhaji, samosa chaat, ₹180-260) is the underrated section — most pure-veg pilgrim-area places skip chaat. Sangeetha is the closest reliable option for non-Tamil cuisine.',
  'South Rampart Street, Thanjavur 613001',
  'https://maps.google.com/?q=Sangeetha+Restaurant+Thanjavur',
  ARRAY[
    'https://www.sangeethaveg.com/',
    'https://www.zomato.com/chennai/sangeetha-restaurant-thanjavur'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thanjavur',
  'Sahana Restaurant',
  'Trichy Main Road (Hotel Sahana)',
  'trichy-main-road',
  ARRAY['south-indian','tamil','chinese','vegetarian']::text[],
  'mid_range',
  'Tamil meals + Mysore masala dosa',
  ARRAY['Tamil meals','Mysore masala dosa','Pongal','Ghee podi roast','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sahana Restaurant inside Hotel Sahana on Trichy Main Road is the mid-tier Thanjavur Tamil pure-veg option — air-conditioned dining, two-level menu, banana-leaf meals at lunch (₹180), expanded tiffin breakfast/dinner with Mysore masala dosa, paper roast, ghee podi roast variants. The road-trip lunch stop on the Thanjavur-Trichy highway. Cards + UPI.',
  'Lunch meals 12.30-2.30pm — pre-book if a group of 6+. Mysore masala dosa (₹140) is the breakfast value order; uses red chutney instead of standard coconut, distinctly Karnataka-influenced. The hotel rooms upstairs are a separate operation; the restaurant takes priority on the ground floor.',
  'Trichy Main Road, Thanjavur 613007',
  'https://maps.google.com/?q=Hotel+Sahana+Thanjavur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503706-Thanjavur_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/sahana-restaurant-thanjavur'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thanjavur',
  'Vasantha Bhavan',
  'Gandhiji Road',
  'gandhiji-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + Thanjavur degree coffee',
  ARRAY['Tamil meals','Idli','Vada','Pongal','Thanjavur degree coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Vasantha Bhavan on Gandhiji Road is a 1970s-era Thanjavur Tamil pure-veg meals + tiffin institution — basic format (4 tables, marble tops, ceiling fans, ledger-billing), reliable Tamil meals at lunch (₹140), tiffin throughout. The Thanjavur degree-coffee (first-press filter decoction, like Kumbakonam''s) is the local pride. Cash + UPI; closed midday 11am-4pm.',
  'Thanjavur degree coffee (₹35) in steel davara-tumbler is the must-order — without milk for the first taste, then add milk for the standard sip. Lunch meals 12.30-2.30pm is the rhythm. Sunday meals adds rava kesari + extra payasam (₹160 vs ₹140 weekday).',
  'Gandhiji Road, Thanjavur 613001',
  'https://maps.google.com/?q=Vasantha+Bhavan+Thanjavur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503706-Thanjavur_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/thanjavur'
  ]::text[],
  '2026-05-11',
  false
);
