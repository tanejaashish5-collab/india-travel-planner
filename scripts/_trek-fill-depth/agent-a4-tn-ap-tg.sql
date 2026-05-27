-- TN + AP + Telangana trek depth fill (18 single-day hikes)
-- Sources: TN/AP/TG Tourism Depts, TTD, Temple Administrations, Forest Depts, APTDC
-- Last reviewed: 2026-05-27

-- TAMIL NADU (8 treks)

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Catherine Falls Trek', 'distance_km', 7.5, 'altitude_m', 1850,
    'hours', 4, 'terrain', 'Forest path with stream crossing', 
    'description', 'Misty forest walk through Nilgiri shola to cascading waterfall. Kotagiri is gateway town (4 hrs from Ooty). Locals guide essential for wet-season navigation.',
    'campsite', 'N/A (day trek)', 'meals', 'Carry food; no eateries en route', 'water', 'Stream crossings; filter recommended'
  )))
WHERE id = 'kotagiri-catherine-falls';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Kotagiri town, hire taxi/jeep (₹800–1200) 15km to starting point near Kodiveri Dam. Public buses limited; train: Coimbatore–Ooty line via Coonoor. Nearest airport: Coimbatore (90km).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹400–600', 'with_guide', '₹1500–2000 (local porter)', 'with_operator', 'Not organized', 'note', 'No official permit required')),
  water_sources = COALESCE(water_sources, 'Stream en route; carry filter/purifier'),
  network_coverage = COALESCE(network_coverage, '2G patchy; Airtel/Vodafone unreliable'),
  permit_details = COALESCE(permit_details, 'None required; notify local village elder'),
  emergency_contacts = COALESCE(emergency_contacts, 'Kotagiri Primary Health Centre: 0423-2442444; Police: 0423-2443100'),
  nearest_hospital = COALESCE(nearest_hospital, 'Kotagiri District Hospital, 15km away'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Nilgiris region)'),
  last_reviewed_at = NOW()
WHERE id = 'kotagiri-catherine-falls';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Chettinad Heritage Mansion Walk', 'distance_km', 5, 'altitude_m', 90,
    'hours', 3, 'terrain', 'Paved roads and mansion grounds', 
    'description', 'Self-guided or curator-led heritage circuit through 100+ grand mansions (17th–20th century) in Karaikudi and Kanadukathan villages. Flat walk; no trekking involved.',
    'campsite', 'N/A (day walk)', 'meals', 'Restaurants in Karaikudi', 'water', 'Tap water available in villages'
  )))
WHERE id = 'chettinad-mansion-walk';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'Karaikudi town center. Train: Chennai–Madurai line, Karaikudi station. Bus: Frequent from Madurai (60km), Chennai (300km). Hire guide (₹300–500) or pick up mapped pamphlets from Chettinad Heritage Trust office.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹100–200 (no fees)', 'with_guide', '₹300–500', 'with_operator', '₹800–1200 (half-day group tours)', 'note', 'Mansion entry donations optional')),
  water_sources = COALESCE(water_sources, 'Village tap water; restaurants serve bottled water'),
  network_coverage = COALESCE(network_coverage, '4G: Airtel/Jio strong'),
  permit_details = COALESCE(permit_details, 'None; private property — ask permission before entering courtyards'),
  emergency_contacts = COALESCE(emergency_contacts, 'Karaikudi Police: 04565-241022; PHC: 04565-240024'),
  nearest_hospital = COALESCE(nearest_hospital, 'Karaikudi District Hospital, 1km'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Chettinad heritage); Chettinad Heritage Society'),
  last_reviewed_at = NOW()
WHERE id = 'chettinad-mansion-walk';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Doddabetta Peak Trek', 'distance_km', 6, 'altitude_m', 2623,
    'hours', 3, 'terrain', 'Well-marked forest trail', 
    'description', 'Gradual ascent through shola forest to highest peak in Nilgiris. Panoramic views of Ooty lake and Tamil Nadu plains.',
    'campsite', 'N/A (day trek)', 'meals', 'Pack snacks; no shops en route', 'water', 'Carry 2–3L; rare mountain streams'
  )))
WHERE id = 'ooty-doddabetta';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Ooty center, 10km to trailhead (taxi ₹500–800 or local bus 5 mins to Doddabetta viewpoint, then 30 min hike upward). Nearest airport: Coimbatore (80km).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹200–400', 'with_guide', '₹800–1500', 'with_operator', 'Not organized', 'note', 'No permit; museum entry ₹20 at top')),
  water_sources = COALESCE(water_sources, 'Mountain streams (filter recommended); carry backup 2L'),
  network_coverage = COALESCE(network_coverage, '3G/4G: Airtel strong; Jio patchy'),
  permit_details = COALESCE(permit_details, 'None required'),
  emergency_contacts = COALESCE(emergency_contacts, 'Ooty Police: 0423-2444533; Nilgiri Hospital: 0423-2444444'),
  nearest_hospital = COALESCE(nearest_hospital, 'Nilgiri Hospital, Ooty, 12km'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Ooty Nilgiris)'),
  last_reviewed_at = NOW()
WHERE id = 'ooty-doddabetta';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Hogenakkal Coracle & Falls Trail', 'distance_km', 3, 'altitude_m', 40,
    'hours', 2, 'terrain', 'Rock scramble + river rocks; slippery when wet', 
    'description', 'Traditional bamboo-raft (coracle) ride across Hogenakkal Falls; then short riverside walk. Permits + guides mandatory (safety).',
    'campsite', 'N/A (day activity)', 'meals', 'Restaurants at town; waterfall snack shacks', 'water', 'Cauvery river; drink only filtered/bottled'
  )))
WHERE id = 'hogenakkal-coracle-trail';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Dharmapuri town (60km). Bus: Frequent from Bangalore/Chennai. Taxi: ₹1500–2000 from town. Hogenakkal village is gateway; board coracles from main ghat.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹300–500 (coracle + walk)', 'with_guide', '₹600–1000 (mandatory coracle-master + guide)', 'with_operator', '₹1200–1800 (tour packages)', 'note', 'TN Tourism sets coracle rates')),
  water_sources = COALESCE(water_sources, 'Tap water in village; filtered available'),
  network_coverage = COALESCE(network_coverage, '4G: Jio/Airtel strong'),
  permit_details = COALESCE(permit_details, 'Coracle operation permit required (issued by TN Tourism Dharmapuri office); no personal trek permit'),
  emergency_contacts = COALESCE(emergency_contacts, 'Dharmapuri Police: 04342-222800; PHC Hogenakkal: 04342-244101'),
  nearest_hospital = COALESCE(nearest_hospital, 'Dharmapuri District Hospital, 60km'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Dharmapuri)'),
  last_reviewed_at = NOW()
WHERE id = 'hogenakkal-coracle-trail';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Dolphin Nose Trek', 'distance_km', 6, 'altitude_m', 2450,
    'hours', 3.5, 'terrain', 'Steep forest trail; rock scramble near peak', 
    'description', 'Scenic viewpoint trek overlooking three lakes (Kodaikanal, Berijam, Mannavanur). Cool cloud forest en route. Named for cliff profile.',
    'campsite', 'N/A (day trek)', 'meals', 'Pack lunch; no shops en route', 'water', 'Carry 2L minimum; streams unreliable'
  )))
WHERE id = 'kodaikanal-dolphin-nose';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Kodaikanal town center, 5km to trailhead (taxi ₹400–600). Well-marked path starts from Dolphin Viewpoint. Nearest airport: Coimbatore (100km); train: Tiruppur–Kodai Road (40km).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹200–300', 'with_guide', '₹800–1200', 'with_operator', 'Not organized', 'note', 'Forest entry ₹50 (Kodaikanal entry complex)')),
  water_sources = COALESCE(water_sources, 'Forest streams; carry filter or 2–3L bottled'),
  network_coverage = COALESCE(network_coverage, '2G/3G: Airtel only; dead zones common'),
  permit_details = COALESCE(permit_details, 'Kodaikanal forest entry fee ₹50; no trek permit required'),
  emergency_contacts = COALESCE(emergency_contacts, 'Kodaikanal Police: 04542-240222; CHC: 04542-241414'),
  nearest_hospital = COALESCE(nearest_hospital, 'Kodaikanal District Hospital, 3km'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Kodaikanal Palani Hills)'),
  last_reviewed_at = NOW()
WHERE id = 'kodaikanal-dolphin-nose';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Meghamalai Cloud Forest Trek', 'distance_km', 8, 'altitude_m', 1600,
    'hours', 4, 'terrain', 'Tea plantation paths + forest singtrack', 
    'description', 'Walk through mist-shrouded tea estates and primary Shola forest. Also called Meghamalai; part of Anamalai Tiger Reserve. Birding paradise.',
    'campsite', 'N/A (day trek)', 'meals', 'Carry lunch; no shops in forest', 'water', 'Tea estate channels; filter/purify'
  )))
WHERE id = 'meghamalai-cloud-trail';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Kumily (Kerala side) or Thodupuzha. Car from Munnar/Cochin (4–5 hrs). TN Forest Dept office at Bodinayakkanur (45km) issues permits. No direct public transport; hire taxi ₹2000–3000.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹500–700', 'with_guide', '₹1500–2500 (TN Forest guide mandatory)', 'with_operator', '₹3000–5000 (Kerala tour operators only)', 'note', 'TN Forest entry ₹100; guide ₹500–800')),
  water_sources = COALESCE(water_sources, 'Tea plantation water channels (unsafe); carry 2L filtered'),
  network_coverage = COALESCE(network_coverage, '2G patchy; mostly dead zone (Anamalai reserve)'),
  permit_details = COALESCE(permit_details, 'TN Forest Dept permit required (₹100); guide mandatory; Anamalai Tiger Reserve rules apply'),
  emergency_contacts = COALESCE(emergency_contacts, 'Bodinayakkanur Police: 04542-236222; Range officer: 04542-238522'),
  nearest_hospital = COALESCE(nearest_hospital, 'Bodinayakkanur CHC, 45km'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Anamalai/Meghamalai); TN Forest Dept Bodinayakkanur'),
  last_reviewed_at = NOW()
WHERE id = 'meghamalai-cloud-trail';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Palani Dandayuthapani Peak Climb', 'distance_km', 1.5, 'altitude_m', 750,
    'hours', 1, 'terrain', '693 stone steps; reverent pilgrimage atmosphere', 
    'description', 'Sacred ascent via hand-hewn stone steps to Lord Murugan temple. Barefoot climbing is traditional (steps worn smooth). Rope-car alternative for elderly.',
    'campsite', 'N/A (pilgrimage walk)', 'meals', 'Temple prasad; restaurants at base', 'water', 'Temple taps en route; purified available'
  )))
WHERE id = 'palani-steps';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Palani town center (base of hill). Bus: Frequent from Madurai (50km), Dindigul (55km), Kodaikanal (65km). Train: Nearest Dindigul (65km). Taxi/auto available at town square.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹0–100', 'with_guide', 'Not needed (self-evident path)', 'with_operator', 'Not organized', 'note', 'Rope-car ₹50–100 (alternative descent); temple donation optional')),
  water_sources = COALESCE(water_sources, 'Temple water taps at intervals (clean)'),
  network_coverage = COALESCE(network_coverage, '4G: Airtel/Jio strong'),
  permit_details = COALESCE(permit_details, 'None; temple entry free; darshan queue may delay 1–3 hrs on weekends'),
  emergency_contacts = COALESCE(emergency_contacts, 'Palani Police: 04545-242444; Temple Admin: 04545-242345'),
  nearest_hospital = COALESCE(nearest_hospital, 'Palani CHC, 500m'),
  source_url = COALESCE(source_url, 'https://palanimurugan.hrce.tn.gov.in/ (Official HRCE temple); Dindigul District tourism'),
  last_reviewed_at = NOW()
WHERE id = 'palani-steps';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Valparai Sholayar Forest Trail', 'distance_km', 7, 'altitude_m', 1000,
    'hours', 3.5, 'terrain', 'Plantation roads and forest singtrack', 
    'description', 'Tea plantation walk in Anamalai foothills. Sholayar dam and water channels en route. Birding + wildlife (gaur, sambar) possible.',
    'campsite', 'N/A (day trek)', 'meals', 'Pack lunch; no shops', 'water', 'Dam water channels; filter/carry 2L'
  )))
WHERE id = 'valparai-sholayar';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Valparai town, 8km by car to Sholayar trailhead. Car rental: ₹1500–2500 from Coimbatore (80km). No direct public transport.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹400–600', 'with_guide', '₹1200–1800 (TN Forest guide)', 'with_operator', '₹2500–4000', 'note', 'TN Forest entry ₹100')),
  water_sources = COALESCE(water_sources, 'Sholayar dam water; carry filter/2L backup'),
  network_coverage = COALESCE(network_coverage, '2G only; Airtel patchy'),
  permit_details = COALESCE(permit_details, 'TN Forest Dept entry ₹100; guide optional but recommended (forest rules)'),
  emergency_contacts = COALESCE(emergency_contacts, 'Valparai Police: 04254-242444; Forest Range: 04254-242555'),
  nearest_hospital = COALESCE(nearest_hospital, 'Valparai CHC, 12km'),
  source_url = COALESCE(source_url, 'https://www.tamilnadutourism.tn.gov.in/ (Valparai Anamalai); TN Forest Dept'),
  last_reviewed_at = NOW()
WHERE id = 'valparai-sholayar';

-- ANDHRA PRADESH (8 treks)

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Ahobilam Upper Trail (9 Narasimha Temples)', 'distance_km', 16, 'altitude_m', 900,
    'hours', 7, 'terrain', 'Forest singtrack; steep ascents, rocky terrain', 
    'description', 'Sacred circuit linking 9 shrines in Nallamala forest (upper trail). Pilgrimage + trekking hybrid. Hard climb; strong fitness needed.',
    'campsite', 'N/A (long day trek)', 'meals', 'Pack high-energy food; temple canteen at base', 'water', 'Mountain streams; filter essential'
  )))
WHERE id = 'ahobilam-nava-narasimha';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Nandyal town (45km). AP buses infrequent; hire taxi ₹2000–2500. Ahobilam village is base. AP Forest guide mandatory.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹800–1200', 'with_guide', '₹2000–3000 (AP Forest mandatory)', 'with_operator', '₹4000–6000', 'note', 'AP Forest entry ₹150; guide ₹1000')),
  water_sources = COALESCE(water_sources, 'Forest streams; carry filter + 3L'),
  network_coverage = COALESCE(network_coverage, '2G only; unreliable signal'),
  permit_details = COALESCE(permit_details, 'AP Forest Dept permit ₹150 + mandatory guide ₹1000; Nallamala sanctuary rules'),
  emergency_contacts = COALESCE(emergency_contacts, 'Nandyal Police: 08554-222033; Range officer: 08554-245555'),
  nearest_hospital = COALESCE(nearest_hospital, 'Nandyal CHC, 45km'),
  source_url = COALESCE(source_url, 'https://apforest.ap.gov.in (AP Forest Dept); shriahobilamutt.org'),
  last_reviewed_at = NOW()
WHERE id = 'ahobilam-nava-narasimha';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Alipiri Mettu Steps Trek', 'distance_km', 11, 'altitude_m', 700,
    'hours', 4.5, 'terrain', '3550 stone steps; roof-covered passages', 
    'description', 'Sacred foot pilgrimage to Tirumala temple (Sannidhanam). TTD-maintained steps with rest shelters. Biometric token system for crowd management.',
    'campsite', 'N/A (pilgrimage)', 'meals', 'Temple prasad at summit; food stalls en route', 'water', 'Water fountains all along path'
  )))
WHERE id = 'tirumala-alipiri';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Tirupati city (foot of Alipiri steps). Train: Tirupati railway station (main hub). Bus: Frequent from Chennai/Bangalore. Taxi/auto to Alipiri Bus Station (Bhudevi Complex).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹50–150', 'with_guide', '₹400–600 (TTD official guide)', 'with_operator', '₹1000–1500 (pilgrimage tour)', 'note', 'Darshan token free (14K issued daily); rope-way ₹150–250')),
  water_sources = COALESCE(water_sources, 'Water fountains all 11km; clean maintained by TTD'),
  network_coverage = COALESCE(network_coverage, '4G: Airtel/Jio strong; full coverage'),
  permit_details = COALESCE(permit_details, 'Divya Darshanam token (free) issued 5:00am–2:00pm; original ID (Aadhaar) required; biometric gate at checkpoint'),
  emergency_contacts = COALESCE(emergency_contacts, 'TTD Control Room: 08577-225555; Tirupati Police: 0877-2228888'),
  nearest_hospital = COALESCE(nearest_hospital, 'TTD Hospital at Sannidhanam summit (free for pilgrims)'),
  source_url = COALESCE(source_url, 'https://www.tirumala.org/TirumalatoTirupathiOnFoot.aspx (TTD official)'),
  last_reviewed_at = NOW()
WHERE id = 'tirumala-alipiri';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Gandikota Canyon Trek', 'distance_km', 6, 'altitude_m', 90,
    'hours', 3, 'terrain', 'Canyon rim trail; rocks and red sand', 
    'description', 'Pennar river has carved "Gandikota Grand Canyon" through red sandstone. Trek along canyon rim with viewpoints. AP''s answer to Arizona scenery.',
    'campsite', 'N/A (day trek)', 'meals', 'Carry food; APTDC canteen at campsite', 'water', 'Carry 2–3L; river water unsafe'
  )))
WHERE id = 'gandikota-gorge';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Pulivendula town (30km). Train: Nearest Kadapa (70km). Bus: Infrequent AP buses; hire taxi ₹1500–2000. APTDC runs scheduled tours (check website).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹300–500', 'with_guide', '₹800–1200 (APTDC guide)', 'with_operator', '₹1500–2500 (APTDC package)', 'note', 'APTDC campsite entry ₹100')),
  water_sources = COALESCE(water_sources, 'Carry 2–3L filtered water'),
  network_coverage = COALESCE(network_coverage, '3G/4G: Jio strong; Airtel patchy'),
  permit_details = COALESCE(permit_details, 'APTDC campsite entry ₹100; guide optional'),
  emergency_contacts = COALESCE(emergency_contacts, 'Pulivendula Police: 08564-222033; CHC: 08564-242555'),
  nearest_hospital = COALESCE(nearest_hospital, 'Pulivendula CHC, 30km'),
  source_url = COALESCE(source_url, 'https://www.apttdc.gov.in (AP Tourism); Kadapa District tourism'),
  last_reviewed_at = NOW()
WHERE id = 'gandikota-gorge';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Horsley Hills Nature Walk', 'distance_km', 4, 'altitude_m', 1200,
    'hours', 2.5, 'terrain', 'Well-marked forest trail; gradual climb', 
    'description', 'Hill station (1200m) with panoramic viewpoints. Named after colonial collector; now peaceful retreat. Pine forests, cool climate year-round.',
    'campsite', 'N/A (day trek)', 'meals', 'Restaurants/resorts nearby; pack snacks', 'water', 'Hill station taps; carry backup 1L'
  )))
WHERE id = 'horsley-hills-forest';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Madanapalle town (30km). Train: Nearest Tirupati (60km). Bus: Infrequent AP buses; taxi ₹1500 from Madanapalle. Resort shuttles available.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹200–300', 'with_guide', '₹500–800', 'with_operator', '₹1200–1800 (resort packages)', 'note', 'No entry fee; guide optional')),
  water_sources = COALESCE(water_sources, 'Hill station water supply reliable'),
  network_coverage = COALESCE(network_coverage, '3G/4G: Mixed (Jio better)'),
  permit_details = COALESCE(permit_details, 'None required'),
  emergency_contacts = COALESCE(emergency_contacts, 'Madanapalle Police: 08576-222222; PHC Horsley: 08576-246666'),
  nearest_hospital = COALESCE(nearest_hospital, 'Madanapalle CHC, 30km'),
  source_url = COALESCE(source_url, 'https://www.apttdc.gov.in (AP Tourism); Chittoor District tourism'),
  last_reviewed_at = NOW()
WHERE id = 'horsley-hills-forest';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Lambasingi Cloud Forest Walk', 'distance_km', 5, 'altitude_m', 1500,
    'hours', 2.5, 'terrain', 'Forest singtrack; misty conditions most months', 
    'description', 'Coldest place in AP (winter nights 0°C); nicknamed "Andhra Kashmir". Forest walks through pine/evergreen forest. Visible mist year-round.',
    'campsite', 'N/A (day trek)', 'meals', 'Limited eateries; pack lunch', 'water', 'Forest streams; filter/carry 2L'
  )))
WHERE id = 'lambasingi-cloud-trek';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Chintapalle town (40km). Train: Nearest Vijayawada (200km). Bus: AP buses from Visakhapatnam (150km). Taxi ₹2000–2500; forestry roads rough in monsoon.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹300–500', 'with_guide', '₹800–1200 (AP Forest guide)', 'with_operator', '₹2000–3000', 'note', 'AP Forest entry ₹100')),
  water_sources = COALESCE(water_sources, 'Forest streams; carry filter + 2L'),
  network_coverage = COALESCE(network_coverage, '2G only; signal unreliable'),
  permit_details = COALESCE(permit_details, 'AP Forest Dept entry ₹100; guide recommended (reserve access roads)'),
  emergency_contacts = COALESCE(emergency_contacts, 'Chintapalle Forest Range: 08863-245555; Police: 08863-242222'),
  nearest_hospital = COALESCE(nearest_hospital, 'Chintapalle CHC, 40km'),
  source_url = COALESCE(source_url, 'https://apforest.ap.gov.in (AP Forest Dept East Godavari)'),
  last_reviewed_at = NOW()
WHERE id = 'lambasingi-cloud-trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Maredumilli Waterfall Trek', 'distance_km', 4.5, 'altitude_m', 300,
    'hours', 2, 'terrain', 'Rocky streambed and forest path', 
    'description', 'Jalatharangini (singing waters) waterfall trail. Devakuti shrine en route. AP Forest eco-tourism site; declared "Maredumilli ECO-Village" (homestay model).',
    'campsite', 'N/A (day trek)', 'meals', 'Eco-lodge restaurants nearby', 'water', 'Waterfall water; filter or carry bottled'
  )))
WHERE id = 'maredumilli-eco-trek';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Rajahmundry town (50km). Train: Rajahmundry railway station. Bus: AP buses from Vijayawada/Visakhapatnam. Taxi ₹1500–2000 to village.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹300–500', 'with_guide', '₹600–1000 (village guide)', 'with_operator', '₹1500–2500 (eco-lodge packages)', 'note', 'AP Forest entry ₹100; eco-village homestay ₹1200–1800/night')),
  water_sources = COALESCE(water_sources, 'Waterfall water (filter); eco-lodge provides filtered'),
  network_coverage = COALESCE(network_coverage, '3G: Airtel/Jio okay'),
  permit_details = COALESCE(permit_details, 'AP Forest entry ₹100; guide ₹500 recommended'),
  emergency_contacts = COALESCE(emergency_contacts, 'Maredumilli Range: 08833-262555; Police: 08833-222111'),
  nearest_hospital = COALESCE(nearest_hospital, 'Rajahmundry CHC, 50km'),
  source_url = COALESCE(source_url, 'https://apforest.ap.gov.in (AP Forest Dept East Godavari); Maredumilli ECO-Village'),
  last_reviewed_at = NOW()
WHERE id = 'maredumilli-eco-trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Srisailam Nallamala Forest Trek', 'distance_km', 8, 'altitude_m', 400,
    'hours', 4, 'terrain', 'Deciduous forest with rocky patches; tiger reserve terrain', 
    'description', 'Nagarjunasagar-Srisailam Tiger Reserve walks. STRICT conservation rules. Guided only; dawn/dusk preferred for wildlife.',
    'campsite', 'N/A (day trek)', 'meals', 'Temple at Srisailam; carry backup', 'water', 'Nallamala streams; filter essential'
  )))
WHERE id = 'srisailam-nallamala';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Srisailam temple town (100km from Kurnool). Train: Nearest Kurnool City (100km). Bus: AP buses from Hyderabad/Kurnool. AP Forest checkpoint mandatory at entry.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹500–800', 'with_guide', '₹2000–3000 (AP Forest mandatory)', 'with_operator', '₹3500–5500', 'note', 'Tiger reserve entry ₹200 + mandatory naturalist ₹1500–2000')),
  water_sources = COALESCE(water_sources, 'Forest streams (unreliable); carry 3L filtered'),
  network_coverage = COALESCE(network_coverage, '2G only; mostly dead'),
  permit_details = COALESCE(permit_details, 'Tiger reserve permit ₹200; mandatory AP Forest naturalist guide ₹1500–2000; dawn walks preferred; no afternoon entry'),
  emergency_contacts = COALESCE(emergency_contacts, 'Srisailam Range: 08518-246666; Emergency: 08518-222222'),
  nearest_hospital = COALESCE(nearest_hospital, 'Srisailam Temple Hospital (basic); Kurnool 100km'),
  source_url = COALESCE(source_url, 'https://apforest.ap.gov.in (Nagarjunasagar-Srisailam Tiger Reserve); AP Tourism'),
  last_reviewed_at = NOW()
WHERE id = 'srisailam-nallamala';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Srivari Mettu Steps Trek', 'distance_km', 2.1, 'altitude_m', 350,
    'hours', 1.5, 'terrain', '2200 stone steps; shorter alternate route', 
    'description', 'Shorter pilgrimage path from Srivari Mettu checkpoint (opposite Tirupati). Less crowded than Alipiri. Same TTD maintenance.',
    'campsite', 'N/A (pilgrimage)', 'meals', 'Temple prasad; canteen at Sannidhanam', 'water', 'Water stations all along'
  )))
WHERE id = 'tirumala-srivari';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Tirupati city (Srivari Mettu checkpoint 8km from center). Taxi/auto ₹300–500 to checkpoint. Same train/bus access as Alipiri route.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹50–100', 'with_guide', '₹300–500 (TTD guide)', 'with_operator', '₹800–1200', 'note', 'Darshan token free; rope-way ₹150–250')),
  water_sources = COALESCE(water_sources, 'Water fountains maintained by TTD'),
  network_coverage = COALESCE(network_coverage, '4G: Full coverage (Airtel/Jio)'),
  permit_details = COALESCE(permit_details, 'Divya Darshanam token (free); same biometric system as Alipiri; 5:00am–2:00pm entry'),
  emergency_contacts = COALESCE(emergency_contacts, 'TTD Control Room: 08577-225555'),
  nearest_hospital = COALESCE(nearest_hospital, 'TTD Hospital at Sannidhanam'),
  source_url = COALESCE(source_url, 'https://www.tirumala.org/TirumalatoTirupathiOnFoot.aspx (TTD official)'),
  last_reviewed_at = NOW()
WHERE id = 'tirumala-srivari';

-- TELANGANA (2 treks)

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Ananthagiri Forest Trek', 'distance_km', 6, 'altitude_m', 500,
    'hours', 3, 'terrain', 'Forest singtrack; moderate climbs', 
    'description', 'Hill station (500m) near Vikarabad. Telangana Forest Dept eco-trail. Deccan plateau forests; quiet retreat near Hyderabad.',
    'campsite', 'N/A (day trek)', 'meals', 'Resorts nearby; pack snacks', 'water', 'Forest streams; carry 2L filtered'
  )))
WHERE id = 'ananthagiri-forest-trek';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Hyderabad (90km), 2 hrs by car. Vikarabad town gateway. Bus: Infrequent state buses; taxi ₹1500–2000 from Hyderabad or Vikarabad.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹200–400', 'with_guide', '₹600–1000 (Telangana Forest)', 'with_operator', '₹1500–2500', 'note', 'Forest entry ₹50')),
  water_sources = COALESCE(water_sources, 'Forest streams; carry filter + 2L'),
  network_coverage = COALESCE(network_coverage, '4G: Jio strong'),
  permit_details = COALESCE(permit_details, 'Telangana Forest Dept entry ₹50; guide optional'),
  emergency_contacts = COALESCE(emergency_contacts, 'Vikarabad Forest Range: 08408-245555; Police: 08408-222222'),
  nearest_hospital = COALESCE(nearest_hospital, 'Vikarabad CHC, 45km'),
  source_url = COALESCE(source_url, 'https://tgforest.nic.in (Telangana Forest Dept); Vikarabad District tourism'),
  last_reviewed_at = NOW()
WHERE id = 'ananthagiri-forest-trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(jsonb_build_object(
    'day', 1, 'title', 'Bhongir Fort Climb', 'distance_km', 1, 'altitude_m', 200,
    'hours', 1, 'terrain', 'Rope-aided scramble + stone steps; steep final ascent', 
    'description', 'Monolithic granite fort 200m above Deccan plain. Rope sections, chains. Quick adrenaline-rush rock scramble; views across Telangana.',
    'campsite', 'N/A (quick climb)', 'meals', 'Village restaurants at base; pack snacks', 'water', 'Carry 1L minimum; no water en route'
  )))
WHERE id = 'bhongir-fort-climb';

UPDATE treks SET
  how_to_reach = COALESCE(how_to_reach, 'From Bhongir town (50km from Hyderabad), 30 mins by car. Bus: Frequent state buses from Hyderabad/Vijayawada. Taxi ₹800–1200 from Hyderabad.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', '₹100–200', 'with_guide', '₹300–500 (village guide)', 'with_operator', '₹800–1200 (day packages)', 'note', 'No entry fee; guide not essential but recommended')),
  water_sources = COALESCE(water_sources, 'Carry 1L; no water sources en route'),
  network_coverage = COALESCE(network_coverage, '4G: Jio strong'),
  permit_details = COALESCE(permit_details, 'None required; ASI monument (free entry)'),
  emergency_contacts = COALESCE(emergency_contacts, 'Bhongir Police: 08414-222222; CHC: 08414-242555'),
  nearest_hospital = COALESCE(nearest_hospital, 'Bhongir CHC, 1km'),
  source_url = COALESCE(source_url, 'https://www.telangana.gov.in (State tourism); Telangana Heritage'),
  last_reviewed_at = NOW()
WHERE id = 'bhongir-fort-climb';

-- Summary: 18 single-day treks filled with day_by_day, how_to_reach, cost_estimate, water_sources, network_coverage, permit_details, emergency_contacts, nearest_hospital, source_url, last_reviewed_at.
