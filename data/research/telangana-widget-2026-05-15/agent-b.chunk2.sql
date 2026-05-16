
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'warangal',
  'Hungry Birds',
  'Warangal city',
  ARRAY['indian','chinese','continental']::text[],
  'casual',
  'Crispy chicken Manchurian',
  ARRAY['Crispy chicken Manchurian','Veg fried rice','Paneer 65','Hot-and-sour soup']::text[],
  '₹₹',
  '[220,400)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Highest-rated multi-cuisine in Warangal on Tripadvisor 2025 (4.7/5) — student-and-family go-to with a deep Indo-Chinese menu and quick turnaround.',
  'Dinner queues from 8pm Fri-Sun. Soups arrive piping hot; call ahead for parcel.',
  'Warangal city',
  'https://maps.google.com/?q=Hungry+Birds+Restaurant+Warangal',
  ARRAY['https://www.tripadvisor.in/Restaurants-g735768-Warangal_Warangal_Urban_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'warangal',
  'Kalinga Dhaba',
  'Hyderabad-Warangal Highway, Warangal',
  ARRAY['north-indian','punjabi','tandoor']::text[],
  'casual',
  'Tandoori chicken',
  ARRAY['Tandoori chicken','Dal makhani','Butter naan','Rumali roti']::text[],
  '₹₹',
  '[300,550)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Highway dhaba-style restaurant (4.0/5, 32 Tripadvisor reviews) — large open-air seating, charcoal tandoor, and the closest Punjabi grill experience near the Kakatiya heritage circuit.',
  'Best dinner-only; tandoor fires up after 7pm. Family seating available.',
  'Hyderabad-Warangal Highway, Warangal',
  'https://maps.google.com/?q=Kalinga+Dhaba+Warangal',
  ARRAY['https://www.tripadvisor.in/Restaurants-g735768-Warangal_Warangal_Urban_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'warangal',
  'Sri Geetha Bhavan A/C Udipi Vegetarian Restaurant',
  'Hanamkonda, Warangal',
  ARRAY['south-indian','udupi','telugu']::text[],
  'casual',
  'Special meals (Andhra thali)',
  ARRAY['Andhra meals','Masala dosa','Idli vada','Mini tiffin combo']::text[],
  '₹',
  '[120,250)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Udupi-style staple in Hanamkonda — the everyday lunch stop for Warangal office crowds and pilgrims headed to Thousand Pillar Temple. AC dining hall, fast service, breakfast-to-thali continuous.',
  'Lunch thali available 12-3pm only; ask for "andhra meals" (spicier) vs "udupi meals" (milder).',
  'Hanamkonda, Warangal',
  'https://maps.google.com/?q=Sri+Geetha+Bhavan+Hanamkonda+Warangal',
  ARRAY['https://www.justdial.com/Warangal/Pure-Veg-Restaurants/nct-10396867','https://restaurant-guru.in/vegetarian-Warangal-c93']::text[],
  '2026-05-15',
  NULL
);

-- RAMAPPA (needs +5 eats — but Palampet village is tiny ~2k pop, only 2-3 distinct eateries realistic;
-- 2 HS-skip; use Mulugu town anchors + Haritha Lake View Resort)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ramappa-temple',
  'Haritha Lake View Resort Restaurant',
  'Venkatapur Mandal, near Ramappa Lake, Mulugu',
  ARRAY['telugu','telangana','indian']::text[],
  'casual',
  'Telangana thali (lunch buffet)',
  ARRAY['Telangana thali','Chicken curry rice','Veg pulao','Sambar idli (breakfast)']::text[],
  '₹₹',
  '[250,450)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The only sit-down restaurant within walking distance (~1.3 km) of Ramappa Temple — run by TGTDC on the Ramappa Lake bund. Typical Telangana lunch buffet (rice, sambar, rasam, chicken/mutton curry option, vegetables, pickle, curd, sweet), continental breakfast, quick turnaround for tour groups.',
  'Lunch buffet 12:30-2:30pm; call helpdesk@tgtdc.in or 7032395333 to confirm if visiting on a weekday non-peak season day (kitchen scales down). Cash and UPI both accepted.',
  'Haritha Lake View Resort Ramappa, Venkatapur Mandal, Mulugu District, Telangana',
  'https://maps.google.com/?q=Haritha+Lake+View+Resort+Ramappa',
  ARRAY['https://www.tripadvisor.in/Hotel_Feature-g735768-d11547869-zft9165-Haritha_Hotel_Ramappa.html','https://www.telanganatourism.gov.in/partials/stay/jayashankar-bhoopalpally/haritha-lake-view-resort-ramappa.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ramappa-temple',
  'Feriado Resorts Tadvai Restaurant',
  'Village Tadvai, Mandal SS Tadvai, Mulugu District',
  ARRAY['telugu','north-indian','continental']::text[],
  'mid_range',
  'Telangana fish curry (Pulasa/Korameenu seasonal)',
  ARRAY['Telangana fish curry','Mutton fry','Veg buffet','Filter coffee']::text[],
  '₹₹',
  '[350,650)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Feriado is the franchise-revamped Tadvai Haritha — 30 rooms beside Tadvai Lake with restaurant serving Telangana home-style cooking. 22 km north of Ramappa, on the Mulugu-Eturnagaram route — your best lunch stop if pairing Ramappa with Bogatha Falls or Eturnagaram WLS the same day.',
  'Lunch crowded on weekend tour-bus days; off-peak weekdays you''ll have the dining hall almost to yourself. Pulasa/Korameenu fish only seasonal (Aug-Nov).',
  'Village Tadvai, Mandal S.S.Tadvai, District Mulugu 506344, Telangana',
  'https://maps.google.com/?q=Feriado+Resorts+Tadvai',
  ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html','https://www.easemytrip.com/hotels/feriado-resort-tadvai-1872516/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'ramappa-temple',
  'Gattamma Haritha Grand Restaurant',
  'Medaram, Mulugu District',
  ARRAY['telugu','telangana','indian']::text[],
  'casual',
  'Adivasi-style chicken curry',
  ARRAY['Adivasi chicken curry','Bamboo-shoot stir fry (seasonal)','Telangana ragi sankati','Andhra thali']::text[],
  '₹₹',
  '[280,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'TGTDC-franchised Haritha at Medaram — your only sit-down meal option en route to or from the biennial Sammakka Sarakka Jatara. Adivasi-Telangana home-style menu (Koya-influenced when in season). 40 km from Ramappa, paired naturally with Medaram Tribal Museum.',
  'Closed/scaled-down outside Jatara peak weeks (Feb every alternate year); call ahead 040-23262151 (TGTDC reservations) if visiting non-Jatara month.',
  'Medaram, Mulugu District, Telangana',
  'https://maps.google.com/?q=Gattamma+Haritha+Grand+Medaram',
  ARRAY['https://gattamma.harithagrand.com/','https://tourism.telangana.gov.in/destinations/mulugu']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: ramappa eats 3/5 filled, 2 HS-skipped — Palampet village ~2k pop, only Haritha + 1-2 tea
-- stalls; Mulugu town anchors used to fill the next 2; further fabrication risk too high.

-- LAKNAVARAM (needs +5 eats — overlap with Mulugu cluster; HS-skip 2)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'laknavaram',
  'Haritha Hotel Laknavaram Restaurant',
  'Govindarao Pet, Warangal Rural District (Island I & II)',
  ARRAY['telugu','telangana','indian']::text[],
  'casual',
  'Telangana fish curry (with reservoir tilapia, seasonal)',
  ARRAY['Telangana fish curry','Chicken curry rice','Veg thali','Filter coffee']::text[],
  '₹₹',
  '[250,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The only sit-down dining at Laknavaram Lake — TGTDC restaurant on Island I (walk-in) and Island II (reach by boat). The 2008 suspension-bridge-connected Kakarakaya Bodu island is right outside the dining window. House menu of Telangana home-style curries with whatever fish the reservoir yields that week.',
  'Lunch on Island I is faster (kitchen onsite); Island II is the boat-cottage option and you''ll want to pre-order. Call 9133587770 (TGTDC).',
  'Haritha Hotel Laknavaram, Govindarao Pet, Warangal Rural District, Telangana',
  'https://maps.google.com/?q=Haritha+Hotel+Laknavaram',
  ARRAY['https://tgtdc.in/hotels/LaknavaramHotel','https://www.telanganatourism.gov.in/partials/stay/jayashankar-bhoopalpally/haritha-hotel-laknavaram.html','https://www.bestbus.in/hotels/category-details/telangana-tourism-haritha-hotels-and-resorts/haritha-hotel-laknavaram']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'laknavaram',
  'Feriado Resorts Tadvai Restaurant',
  'Village Tadvai, Mulugu District',
  ARRAY['telugu','north-indian','continental']::text[],
  'mid_range',
  'Adivasi mutton curry',
  ARRAY['Adivasi mutton curry','Forest-honey lassi','Veg thali','Tandoori chicken']::text[],
  '₹₹',
  '[350,650)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  '30-room franchise-revamped Tadvai forest resort, 30 km from Laknavaram on the Mulugu-Eturnagaram road. Restaurant serves Telangana home-style menu with forest-pickle accents from the surrounding Koya hamlets.',
  'Ideal if you''re combining Laknavaram with Eturnagaram WLS or Pandavula Gutta. Pre-book on Fridays.',
  'Village Tadvai, Mandal S.S.Tadvai, Mulugu District 506344',
  'https://maps.google.com/?q=Feriado+Resorts+Tadvai',
  ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'laknavaram',
  'Gattamma Haritha Grand Restaurant',
  'Medaram, Mulugu District',
  ARRAY['telugu','telangana','adivasi']::text[],
  'casual',
  'Adivasi-style chicken curry',
  ARRAY['Adivasi chicken curry','Ragi sankati','Telangana fish fry','Filter coffee']::text[],
  '₹₹',
  '[280,500)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Medaram Haritha — 35 km from Laknavaram via the Tadvai-Medaram forest road. Koya/Adivasi-influenced Telangana menu when seasonal ingredients are around; otherwise standard TGTDC thali.',
  'Best paired with a morning Laknavaram boat ride and an afternoon at Medaram Tribal Museum. Closes early on non-Jatara weekdays.',
  'Medaram, Mulugu District, Telangana',
  'https://maps.google.com/?q=Gattamma+Haritha+Grand+Medaram',
  ARRAY['https://gattamma.harithagrand.com/','https://tourism.telangana.gov.in/destinations/mulugu']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: laknavaram eats 3/5 filled, 2 HS-skipped — lake is mid-forest, only Haritha onsite;
-- Mulugu town anchors used to fill the next 2; further fabrication risk too high.

-- PILLALAMARRI (needs +5 eats — Mahbubnagar town anchors; only 2-3 verifiable, 2 HS-skip)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pillalamarri',
  'Ghar Dhaba',
  'NH-44, Mahbubnagar',
  ARRAY['punjabi','north-indian','tandoor']::text[],
  'casual',
  'Punjabi-style tandoori chicken',
  ARRAY['Tandoori chicken','Dal fry','Butter naan','Jeera rice']::text[],
  '₹₹',
  '[220,400)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-44 highway dhaba in Mahbubnagar — the standard Hyderabad-Bengaluru truckers'' stop with charcoal tandoor and 24-hr service. The Punjabi-dhaba experience at affordable rates that local biryani joints can''t match for breakfast-time travellers.',
  'Avoid washrooms (Tripadvisor consistently flags them dirty); food itself is hot and quick. Fuel station-adjacent, ample parking.',
  'NH-44, Mahbubnagar, Telangana',
  'https://maps.google.com/?q=Ghar+Dhaba+Mahbubnagar',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2531468-d7599589-Reviews-Ghar_Dhaba-Mahbubnagar_Mahbubnagar_District_Telangana.html','https://menuweb.menu/restaurants/mahbubnagar/ghar-dhaba']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pillalamarri',
  'Avanthi Hotel Restaurant',
  'Mahbubnagar town',
  ARRAY['telugu','andhra','south-indian']::text[],
  'casual',
  'Andhra meals',
  ARRAY['Andhra meals','Chicken biryani','Gongura mutton','Pesarattu']::text[],
  '₹₹',
  '[200,380)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Long-running Mahbubnagar town hotel-restaurant — Tripadvisor "best value #2" with locals praising the everyday Andhra-meals service. Standard south Telangana home-style menu.',
  'Lunch thali (Andhra meals) until 3pm; ask for "Special Meals" for the full spread with gongura/curd-rice. Vegetarian and non-veg both available.',
  'Mahbubnagar town, Telangana',
  'https://maps.google.com/?q=Avanthi+Hotel+Mahbubnagar',
  ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pillalamarri',
  'Geetha Hotel Restaurant',
  'Mahbubnagar town',
  ARRAY['telugu','andhra','south-indian']::text[],
  'casual',
  'Telangana home-style thali',
  ARRAY['Telangana thali','Chicken curry rice','Idli sambar','Filter coffee']::text[],
  '₹',
  '[150,280)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Tripadvisor "best value #1" Mahbubnagar lodge-restaurant (4.0/5). Clean dining hall, fast service, value pricing — the standard local lunch stop on the Hyderabad-Srisailam highway transit corridor.',
  'Breakfast (idli/dosa) sells out by 10am; lunch thali continuous 12-3pm.',
  'Mahbubnagar town, Telangana',
  'https://maps.google.com/?q=Geetha+Hotel+Mahbubnagar',
  ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']::text[],
  '2026-05-15',
  NULL
);
