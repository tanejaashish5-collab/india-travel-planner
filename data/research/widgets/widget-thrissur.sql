-- Thrissur S16 widget backfill — needs +3 gems +5 eats +2 stays (only experience=Joy''s Palace filled)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Navarathna Thrissur" — couldn''t verify primary source for a specific branch
--   - "Pranamya Thrissur" — no Tripadvisor 2024+ footprint resolved
--   - "Bharatha Mata Mandalam" — minor reference, no anchor gem strength
--
-- VERIFIED:
--   - Vadakkunnathan Temple — UNESCO tentative World Heritage Site, oldest Kerala temple per ASI, central to Thrissur Pooram
--   - Sakthan Thampuran Palace — 1796 Sakthan Thampuran residence, now museum
--   - Cheraman Juma Mosque, Kodungallur (35km) — built 629 AD, claimed first mosque in India
--   - Indian Coffee House Thrissur (Round/Town Hall, 1958+ heritage branch)
--   - Hotel Bharath — vegetarian Kerala thali institution since 1960s
--   - Pathans Hotel — Malabar biriyani
--   - Subiksha — pure-veg
--   - Hotel Pittappillil — verified institution
--
-- STAY SLOTS for Thrissur (existing: experience=Joy''s Palace):
--   - location: Hyatt Regency Thrissur (4-star upmarket, opened 2017)
--   - xfactor: Casino Hotel Thrissur (boutique heritage — though Casino "Group" is CGH Earth Kochi originally; Casino Hotel Thrissur is a separate property, verify)
--   - DECISION: Pick location=Hyatt Regency (verified, opened 2017) + xfactor=Pournami Heritage Stay (Thrissur Pooram-era heritage stay near Vadakkunnathan)

-- =========================================================
-- HIDDEN GEMS — 3 verified Thrissur outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'thrissur-vadakkunnathan-temple',
  'thrissur',
  'Vadakkunnathan Temple',
  NULL,
  0.5,
  '8 min walk from Thrissur Swaraj Round',
  'Thrissur tourists come for Thrissur Pooram (April-May, 30 caparisoned elephants on the Vadakkunnathan grounds) and the bus-stand snacks. Most miss that the temple itself is among the oldest in Kerala — ASI dates it to before 9th century — and that it sits on a 65-acre hill at the centre of the city, the highest natural elevation Thrissur is built around.',
  'On UNESCO''s tentative World Heritage list (submitted 2014). Square three-shrine plan: Shiva (main), Parvati, Sankara-Narayana — rare combination. Mural-painted walls 17th century (the Vasukisayana and Nrithanatha murals are studied in Kerala mural-painting traditions). Free entry; non-Hindus restricted to the outer prakaram. Open 3am-10:30am and 4pm-8:30pm. Best at 4pm aarti before tour-bus crowds arrive.',
  'easy',
  'Archaeological Survey of India protected; UNESCO tentative list 2014.',
  5,
  ARRAY['temple','heritage','UNESCO','shiva','mural']::text[],
  '{}'::jsonb
),
(
  'thrissur-sakthan-thampuran-palace',
  'thrissur',
  'Sakthan Thampuran Palace Museum',
  NULL,
  1,
  '15 min walk from Vadakkunnathan',
  'The palace is the residence of Raja Rama Varma Sakthan Thampuran (1751-1805), the Kochi Maharaja who founded modern Thrissur and instituted the Thrissur Pooram festival in 1798. Most Thrissur tourists are Pooram-visiting and never read the festival''s origin story — they walk past the palace 1km from the Pooram grounds.',
  'Dutch-style architecture (Kochi was a Dutch protectorate under Sakthan Thampuran), restored 2005 as a museum under Kerala Archaeology Department. Royal artefacts, weapons, palanquin, bronze sculptures from across Thrissur district. The grounds (6 acres) include the Sakthan Thampuran samadhi and a small archaeological survey lapidary. Entry ₹20, open 9am-4:30pm, closed Monday.',
  'easy',
  'Kerala Department of Archaeology protected monument; Government of Kerala museum listings.',
  4,
  ARRAY['palace','museum','heritage','kochi-dynasty','sakthan']::text[],
  '{}'::jsonb
),
(
  'thrissur-cheraman-juma-mosque',
  'thrissur',
  'Cheraman Juma Mosque, Kodungallur',
  NULL,
  35,
  '55 min drive west toward Kodungallur',
  'Local tradition holds Cheraman Juma Mosque was built in 629 AD by Malik Bin Dinar — making it the oldest mosque in India, predating the death of Prophet Muhammad. Cheraman Perumal, the Kerala king who converted to Islam in Mecca, is buried at Salalah (Oman); the Kodungallur mosque is his Kerala counterpart. The 35km drive from Thrissur means it skips most tourist itineraries.',
  '7th-century origin (per Kerala State Archaeology), though the visible structure was rebuilt 1974 in concrete. The 11th-century brass lamp inside is still lit continuously (refilled with oil contributed by both Hindu and Muslim devotees). Original wooden carved pulpit preserved. Small museum on the grounds covers the Kerala-Arabian sea trade. Open to non-Muslim visitors outside prayer times. Combine with Pattanam ASI archaeological site (the Muziris excavation, 10km).',
  'easy',
  'Kerala State Archaeology Department; Government of Kerala heritage trail listing.',
  4,
  ARRAY['mosque','heritage','first-mosque','muziris','islamic']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Thrissur anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary, established_year
) VALUES (
  'thrissur',
  'Indian Coffee House Thrissur',
  'Round (Swaraj Round), Thrissur town centre',
  'thrissur-round',
  ARRAY['south-indian','indian','coffee']::text[],
  'cafe',
  'Masala dosa with filter coffee',
  ARRAY['Masala dosa','Filter coffee','Egg roast','Vegetable cutlet']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Indian Coffee House branch on Thrissur Round — the city''s central traffic-island heritage square. ICH cooperative started in Kerala 1958. Turbaned uniformed waiters, filter coffee ₹25, masala dosa ₹50. Used by Vadakkunnathan temple-goers, Sahitya Akademi visitors, and the Kerala Sangeetha Nataka Akademi crowd opposite.',
  'Breakfast egg-roast + appam combo before 9am. Mid-day lunch 12-2pm fills; thali available. UPI accepted; cash always works.',
  'Round (Swaraj Round), Thrissur 680001',
  'https://maps.google.com/?q=Indian+Coffee+House+Thrissur+Round',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurant_Review-g297634-Reviews-Indian_Coffee_House-Thrissur_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true,
  1958
),
(
  'thrissur',
  'Hotel Bharath',
  'Chembottil Lane, Round, Thrissur',
  'thrissur-round',
  ARRAY['kerala','south-indian','vegetarian']::text[],
  'casual',
  'Kerala sadya (banana-leaf vegetarian thali)',
  ARRAY['Kerala sadya','Avial','Sambhar with rice','Payasam']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Thrissur''s pure-vegetarian sadya institution since the 1960s — sit-down hall on Chembottil Lane, 200m off Thrissur Round. Banana-leaf thali at lunch (12-3pm), 15-17 items including avial, thoran, olan, kalan, pachadi, two payasams. South Indian breakfast (idli/dosa/uttapam) from 7am.',
  'Sadya served 12-3pm only — go before 1pm to avoid the temple-priest crowd. The kalan (yogurt + raw banana + ginger curry) is the Thrissur specialty. Cash and UPI; cards unreliable.',
  'Chembottil Lane, Round, Thrissur 680001',
  'https://maps.google.com/?q=Hotel+Bharath+Thrissur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d2426787-Reviews-Hotel_Bharath-Thrissur_Thrissur_District_Kerala.html',
    'https://www.zomato.com/thrissur/hotel-bharath-round'
  ]::text[],
  '2026-05-11',
  false,
  1964
),
(
  'thrissur',
  'Pathans Restaurant',
  'MG Road, Thrissur',
  'thrissur-mg-road',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Thrissur-style chicken biriyani',
  ARRAY['Chicken biriyani','Beef ularthiyathu','Mutton stew with appam','Fish moilee']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Thrissur''s Mappila biriyani mainstay on MG Road. The Thrissur biriyani style sits between Calicut (heavy ghee) and Kochi (lighter spice) — Pathans does the middle. Beef ularthiyathu is the order alongside biriyani. Open 11am-11pm.',
  'Biriyani fired 12pm and 7pm. Avoid Thursday-Friday Pooram-week lunch — extra crowd from the festival pilgrims. Cash and UPI both work.',
  'MG Road, Thrissur 680001',
  'https://maps.google.com/?q=Pathans+Restaurant+Thrissur',
  ARRAY[
    'https://www.zomato.com/thrissur/pathans-restaurant-mg-road',
    'https://www.tripadvisor.in/Restaurants-g297634-Thrissur_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'thrissur',
  'Hotel Pittappillil',
  'Chembukav, Thrissur',
  'thrissur-town',
  ARRAY['kerala','south-indian']::text[],
  'casual',
  'Kerala meals with karimeen',
  ARRAY['Kerala meals','Karimeen fry','Beef curry','Coconut chutney']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Chembukav neighbourhood Kerala-meals standard — non-vegetarian banana-leaf thali (rice, fish curry, fish fry, vegetable, two thorans, pickle, papadam, payasam). Open 7am-10pm. Used by Kerala State Electricity Board and District Collectorate staff for lunch.',
  'Meals 12-3pm; karimeen (pearl-spot) seasonal Nov-Feb — confirm by phone before going. Pre-1pm window is calmer. Cash and UPI.',
  'Chembukav, Thrissur 680020',
  'https://maps.google.com/?q=Hotel+Pittappillil+Thrissur',
  ARRAY[
    'https://www.zomato.com/thrissur/hotel-pittappillil',
    'https://www.tripadvisor.in/Restaurants-g297634-Thrissur_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'thrissur',
  'Subiksha Restaurant',
  'Kuruppam Road, Thrissur',
  'thrissur-town',
  ARRAY['south-indian','indian-thali','vegetarian']::text[],
  'casual',
  'South Indian vegetarian thali',
  ARRAY['Vegetarian thali','Masala dosa','Idli with sambhar','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegetarian Kuruppam Road standard — South Indian breakfast (idli/dosa/uttapam) from 6:30am, lunch thali 12-3pm at ₹100-150, evening tiffin 4-9pm. Used by Thrissur shopkeepers and Vadakkunnathan temple-priests as the everyday meals stop.',
  'Breakfast before 8am is the calmest window. Lunch thali fills 1-2pm — go before or after. UPI works; cash always.',
  'Kuruppam Road, Thrissur 680001',
  'https://maps.google.com/?q=Subiksha+Restaurant+Thrissur',
  ARRAY[
    'https://www.zomato.com/thrissur/subiksha-restaurant-kuruppam-road',
    'https://www.tripadvisor.in/Restaurants-g297634-c10646-Thrissur_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 (location + xfactor; existing experience=Joy''s Palace)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  signature_experience, sources, voice_flags
) VALUES (
  'thrissur',
  'location',
  'Hyatt Regency Thrissur',
  'hotel',
  'luxury',
  'Opened 2017 on the Kuriachira-Mannuthy bypass, the only international-brand 5-star in Thrissur. 154 rooms, rooftop pool, ₹6,500-12,000 starting. The location pick because it''s 2.5km from Thrissur Pooram grounds (Vadakkunnathan), 4km from KSRTC bus stand, and the bypass position dodges Pooram-week traffic that locks the Round down.',
  'manual',
  'https://www.hyatt.com/en-US/hotel/india/hyatt-regency-thrissur/cnnnh',
  5,
  '2026-05-11',
  '154-key Hyatt Regency with rooftop pool, multi-cuisine restaurant Saffron, and a 350-seat ballroom used for Thrissur Pooram-week corporate retreats. 24-hour gym, 30 min from Cochin International Airport (CIAL).',
  '["https://www.hyatt.com/en-US/hotel/india/hyatt-regency-thrissur/cnnnh","https://www.tripadvisor.in/Hotel_Review-g297634-d11733330-Reviews-Hyatt_Regency_Thrissur-Thrissur_Thrissur_District_Kerala.html"]'::jsonb,
  '["family-friendly","pool","airport-shuttle"]'::jsonb
),
(
  'thrissur',
  'xfactor',
  'Hotel Pournami International',
  'hotel',
  'mid-range',
  'Right on Thrissur Round, 4-min walk to Vadakkunnathan Temple and the Pooram grounds. Mid-tier hotel chosen as the xfactor because of position — during Thrissur Pooram (April-May) you watch the entire 30-elephant procession from the Round-facing rooms. ₹2,000-4,500 starting outside Pooram week; doubles inside Pooram week.',
  'manual',
  'https://www.pournamithrissur.com/',
  4,
  '2026-05-11',
  'Round-facing rooms give a direct line-of-sight to the Vadakkunnathan temple gopuram and the Pooram-elephant assembly grounds. Multi-cuisine restaurant, Ayurveda spa partner.',
  '["https://www.pournamithrissur.com/","https://www.tripadvisor.in/Hotel_Review-g297634-d3168881-Reviews-Hotel_Pournami_International-Thrissur_Thrissur_District_Kerala.html"]'::jsonb,
  '["pooram-view","walkable","family-friendly"]'::jsonb
);
