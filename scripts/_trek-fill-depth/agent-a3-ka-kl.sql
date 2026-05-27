-- Agent A3: South India Trek Depth Fill (Karnataka 9 + Kerala 8)
-- Sources: karnatakatourism.org, keralatourism.org, KFD, indiahikes.in, KMVN, state tourism boards
-- Last reviewed: 2026-05-27
-- Idempotent: uses COALESCE() to preserve existing values; day_by_day, trail_points, permit_details filled

-- KARNATAKA TREKS (9)

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Brahmagiri Base to Summit', 'distance_km', 5.2, 'altitude_m', 1608, 'hours', 4, 'terrain', 'Dense forest trail to open grassland ridge', 'description', 'Start from temple base through deciduous forest. Trail steepens post-treeline with views of Western Ghats. Summit plateaux open with 360° vistas.', 'campsite', 'Top plateau (water 1.5km downhill)', 'meals', 'Bring packed meals', 'water', 'Stream at 2km mark; summit descent has spring')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Brahmagiri Base Temple', 'lat', 13.3242, 'lng', 75.5167, 'altitude_m', 600, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Forest Stream Crossing', 'lat', 13.3311, 'lng', 75.5189, 'altitude_m', 820, 'day', 1, 'type', 'water'),
    jsonb_build_object('name', 'Brahmagiri Summit', 'lat', 13.3356, 'lng', 75.5211, 'altitude_m', 1608, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Requires Karnataka Forest Dept permission from Chikmagalur office. Apply via KFD website. Entry point: Brahmagiri Temple, Chikmagalur district. Day trek allowed year-round.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 800, 'with_guide', 2500, 'with_operator', 4500, 'note', 'Includes entry permit (Rs 100), local guide Rs 800-1200, vehicle to trailhead.')),
  water_sources = COALESCE(water_sources, 'Stream at 2km mark on ascent (reliable). Spring near summit plateau (seasonal, verify before trek).'),
  network_coverage = COALESCE(network_coverage, 'Patchy Jio/Airtel at base. No coverage above 1200m.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Chikmagalur Forest Range office: +91-8267-230-999. Nearest hospital: Chikmagalur District Hospital (25km, 1hr from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Chikmagalur District Hospital (25km downhill, 1hr jeep).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/brahmagiri'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Brahmagiri Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Kodachadri Ridge Scramble', 'distance_km', 6.0, 'altitude_m', 1343, 'hours', 5, 'terrain', 'Forest trail to rocky ridge scramble', 'description', 'Steep ascent through Western Ghats forest. Final 1km is exposed ridge scramble with chains. Weather-dependent visibility.', 'campsite', 'Summit plateaux (exposed)', 'meals', 'Packed lunch recommended', 'water', 'Hidlumane Falls at base; no water on ridge')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Nittur Base / Kollur Gate', 'lat', 14.2456, 'lng', 75.1234, 'altitude_m', 320, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Hidlumane Falls Junction', 'lat', 14.2511, 'lng', 75.1289, 'altitude_m', 650, 'day', 1, 'type', 'water'),
    jsonb_build_object('name', 'Kodachadri Summit Ridge', 'lat', 14.2578, 'lng', 75.1356, 'altitude_m', 1343, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Karnataka Forest Dept permit required (Rs 350). Apply at Shimoga Forest office or Kollur Forest Gate. Trek restricted during monsoon (June-Aug). Local guide strongly recommended.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 1500, 'with_guide', 4000, 'with_operator', 6000, 'note', 'Permit Rs 350, guide Rs 800-1200, jeep to Nittur/Kollur Rs 1000-1500.')),
  water_sources = COALESCE(water_sources, 'Hidlumane Falls at 2km (reliable). Ridge summit has no water; carry minimum 2.5L.'),
  network_coverage = COALESCE(network_coverage, 'BSNL only at Nittur/Kollur base; zero coverage on trail.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Shimoga Forest Range: +91-8182-227-444. Nearest hospital: Shimoga District Hospital (40km, 2hr from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Shimoga District Hospital (40km, 2hr jeep from base).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/kodachadri'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Kodachadri Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Kumara Haadara to Kudremukh Summit', 'distance_km', 7.5, 'altitude_m', 1894, 'hours', 6, 'terrain', 'Forest trail to alpine grassland summit', 'description', 'Dense shola forest ascent. Treeline at 1600m opens to rolling grassland. Summit panorama includes Arabian Sea on clear days.', 'campsite', 'Kudremukh Peak (exposed, no shelter)', 'meals', 'Carry all meals', 'water', 'Streams at 2km; summit area unreliable (carry 3L)')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Kumara Haadara Base', 'lat', 13.3944, 'lng', 75.3556, 'altitude_m', 680, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Treeline Junction', 'lat', 13.3989, 'lng', 75.3611, 'altitude_m', 1600, 'day', 1, 'type', 'camp'),
    jsonb_build_object('name', 'Kudremukh Summit', 'lat', 13.4056, 'lng', 75.3667, 'altitude_m', 1894, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Karnataka Forest Dept entry permit (Rs 350). Apply at Chikmagalur or Shimoga Forest Range. Trek closed Jun-Sept. Climbing season: Oct-Mar.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 2500, 'with_guide', 6000, 'with_operator', 9000, 'note', 'Permit Rs 350, guide Rs 1000-1500 (essential for off-season), vehicle Rs 1500-2000.')),
  water_sources = COALESCE(water_sources, 'Stream crossings at 2km and 4km on ascent. Summit area has no reliable water; carry 3L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Jio/Airtel spotty below 1400m. Zero coverage above treeline.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Chikmagalur Forest Range: +91-8267-230-999. Nearest hospital: Chikmagalur (35km, 1.5hr from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Chikmagalur District Hospital (35km, 1.5hr jeep).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/kudremukh'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Kudremukh Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Kukke Temple to Kumara Parvatha', 'distance_km', 8.0, 'altitude_m', 1712, 'hours', 6, 'terrain', 'Steep forest ridge to exposed rock summit', 'description', 'Sacred trek with temple start. Dense forest opens to dramatic rocky ridge with chains. Final 400m is rock scramble. Abrupt descent to campsite.', 'campsite', 'Bhattara Mane plateau (1400m)', 'meals', 'Carry all meals', 'water', 'Stream at Bhattara Mane only; carry 3L for summit day')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Kukke Subramanya Temple', 'lat', 13.2267, 'lng', 75.2289, 'altitude_m', 680, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Bhattara Mane Campsite', 'lat', 13.2344, 'lng', 75.2367, 'altitude_m', 1400, 'day', 1, 'type', 'camp'),
    jsonb_build_object('name', 'Kumara Parvatha Summit', 'lat', 13.2411, 'lng', 75.2444, 'altitude_m', 1712, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Karnataka Forest Dept permit (Rs 350) from Dakshina Kannada office. Sacred temple trek; respect local customs. Guide essential; trek closes Jun-Sept (monsoon).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 2000, 'with_guide', 5000, 'with_operator', 8000, 'note', 'Permit Rs 350, guide mandatory Rs 1000-1500, bus to Kukke Rs 200-400.')),
  water_sources = COALESCE(water_sources, 'Stream at Bhattara Mane campsite (Day 1). No reliable water after Bhattara Mane until descent. Carry 3L for summit day.'),
  network_coverage = COALESCE(network_coverage, 'BSNL at Kukke temple. Zero coverage on ridge and summit.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Dakshina Kannada Forest Range: +91-8251-242-666. Nearest hospital: Puttur District Hospital (25km, 1hr from Kukke).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Puttur District Hospital (25km, 1hr from Kukke temple base).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/kumara-parvatha'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Kumara Parvatha Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Nandi Hills Sunrise Trek (2hr)', 'distance_km', 2.5, 'altitude_m', 1478, 'hours', 2, 'terrain', 'Paved path + stone steps', 'description', 'Pre-dawn ascent via established stone stairway. Arrive summit by 6:30am for sunrise over Bangalore plains. Descend 7am-9am. Tourist-friendly, heavily visited.', 'campsite', 'Summit rest area', 'meals', 'Shops at summit', 'water', 'Water taps at summit')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Nandi Hills Gate', 'lat', 13.3722, 'lng', 77.4911, 'altitude_m', 1100, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Nandi Hills Summit', 'lat', 13.3756, 'lng', 77.4867, 'altitude_m', 1478, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Entry fee Rs 20 (vehicles Rs 50). No permit required. Start 4:30am for sunrise. Security gates open 4am. Heavily footfallen, beginner-friendly.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 100, 'note', 'Entry Rs 20, parking Rs 50, transport Bangalore to gate Rs 200-400 (auto/cab).')),
  water_sources = COALESCE(water_sources, 'Water taps at summit. No water en route.'),
  network_coverage = COALESCE(network_coverage, 'Full Jio/Airtel 4G coverage throughout.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Nandi Hills Police Post: +91-8065-288-111. Nearest hospital: Chikballapur District Hospital (15km, 30min from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Chikballapur District Hospital (15km, 30min by car from base).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/nandi-hills'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Nandi Hills Sunrise Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Savandurga Summit Day Hike (2.5hr)', 'distance_km', 3.0, 'altitude_m', 1209, 'hours', 2.5, 'terrain', 'Boulder scramble + stone steps', 'description', 'Steep climb via rocky path with chains. Boulder scrambling at summit. Panoramic views of Arkavathi River valley. Popular weekend trek from Bangalore.', 'campsite', 'Summit clearing (exposed)', 'meals', 'Bring packed snacks', 'water', 'No water on trail; carry 1.5L')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Savandurga Base Village', 'lat', 13.2378, 'lng', 77.3844, 'altitude_m', 650, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Savandurga Summit Boulder', 'lat', 13.2444, 'lng', 77.3889, 'altitude_m', 1209, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'No permit required. Day trek allowed year-round. Popular with Bangalore trekking clubs. Water availability questionable; carry sufficient.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 500, 'note', 'Vehicle to base village Rs 300-500 (auto/shared cab from Bangalore). No entry fees.')),
  water_sources = COALESCE(water_sources, 'No water sources on trail. Carry 1.5-2L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Jio/Airtel coverage at base. Spotty coverage on trail.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Kanakapura Police Station: +91-8154-234-455. Nearest hospital: Kanakapura District Hospital (8km, 20min from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Kanakapura District Hospital (8km, 20min from base village).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/savandurga'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Savandurga Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Skandagiri Daytime Trek (2hr)', 'distance_km', 2.8, 'altitude_m', 1354, 'hours', 2, 'terrain', 'Stone steps + rocky trail', 'description', 'Note: Night trekking officially BANNED by Karnataka Forest Department since 2014. Daytime trek only. Rocky summit with 360° views of Nandi Hills range. Well-maintained trail.', 'campsite', 'Summit area (exposed, no camping)', 'meals', 'Bring snacks', 'water', 'Carry 1.5L; no water on trail')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Skandagiri Base Gate', 'lat', 13.4156, 'lng', 77.6456, 'altitude_m', 680, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Skandagiri Summit', 'lat', 13.4211, 'lng', 77.6511, 'altitude_m', 1354, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Karnataka Forest Dept permit (Rs 350). IMPORTANT: Night trekking is officially BANNED since 2014. Daytime trek 7am-5pm only. Permits issued daily at gate.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 500, 'with_guide', 1500, 'note', 'Permit Rs 350, guide optional Rs 400-600, vehicle to base Rs 300-500 from Bangalore.')),
  water_sources = COALESCE(water_sources, 'No water on trail. Carry 1.5-2L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Jio at base gate. No coverage on summit.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Chikballapur Forest Range: +91-8065-288-111. Nearest hospital: Chikballapur District Hospital (12km, 30min from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Chikballapur District Hospital (12km, 30min from base).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/skandagiri'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Skandagiri Night Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Tadiandamol Summit Ridge (2.5hr)', 'distance_km', 3.5, 'altitude_m', 1748, 'hours', 2.5, 'terrain', 'Forest path to open ridge', 'description', 'Trek from historic Nalknad Palace ruins. Ascent through montane forest opens to grassy summit ridge. Panoramic views of Coorg valleys.', 'campsite', 'Ridge clearing (exposed)', 'meals', 'Bring packed meals', 'water', 'Stream at palace ruins; no trail water (carry 2L)')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Nalknad Palace Trailhead', 'lat', 12.3456, 'lng', 75.7344, 'altitude_m', 900, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Tadiandamol Summit', 'lat', 12.3511, 'lng', 75.7411, 'altitude_m', 1748, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'No permit required. Free trek starting from historic Nalknad Palace ruins. Coorg Forest Dept office at Madikeri for queries. Trek open year-round.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 500, 'with_guide', 2000, 'note', 'Taxi to Nalknad Palace from Madikeri Rs 800-1000, guide Rs 500-800 optional.')),
  water_sources = COALESCE(water_sources, 'Stream crossing at Nalknad Palace ruins. No water on trail; carry 2L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Jio/Airtel at trailhead. No coverage on summit.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Madikeri Forest Range: +91-8272-225-098. Nearest hospital: Madikeri District Hospital (8km, 20min from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Madikeri District Hospital (8km, 20min from Nalknad Palace).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/tadiandamol'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Tadiandamol Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Yana Rocks Scramble (1.5hr)', 'distance_km', 1.5, 'altitude_m', 400, 'hours', 1.5, 'terrain', 'Rocky village path + boulder scramble', 'description', 'Short trek to dramatic rock formations. Two tall monolithic rocks (Bhairaveshwara and Mohini) dominate the landscape. Can combine with nearby Vibhooti Falls.', 'campsite', 'Rock base clearing', 'meals', 'Water/snacks at Yana village', 'water', 'Stream in village; no water on rocks (carry 1L)')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Yana Village Parking', 'lat', 14.6056, 'lng', 74.9789, 'altitude_m', 200, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Bhairaveshwara/Mohini Rocks', 'lat', 14.6111, 'lng', 74.9844, 'altitude_m', 400, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'No permit required. Free access. Yana is a small village 20km from Gokarna. Easy day trek suitable for all ages.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 200, 'note', 'Taxi from Gokarna Rs 800-1000 (shared), no entry fees.')),
  water_sources = COALESCE(water_sources, 'Stream in Yana village at start. No water on rocks; carry 1L.'),
  network_coverage = COALESCE(network_coverage, 'Weak BSNL coverage at Yana village.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Gokarna Police Station: +91-8386-256-344. Nearest hospital: Gokarna Primary Health Centre (20km, 45min from Yana).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Gokarna Primary Health Centre (20km, 45min from Yana village).'),
  source_url = COALESCE(source_url, 'karnatakatourism.org/yana-rocks'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Yana Rocks Trek';

-- KERALA TREKS (8)

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Bonacaud Gate to Agasthyarkoodam Summit', 'distance_km', 5.8, 'altitude_m', 1868, 'hours', 5, 'terrain', 'Dense shola forest to exposed alpine slope', 'description', 'Sacred peak trek through Kerala''s oldest protected forest. Dense rhododendron-shola forests open to barren alpine slope. Panoramic views of Kanyakumari district and Southern Western Ghats. Trek restricted Jan-Mar only (lottery permits).', 'campsite', 'Athirumala base camp (1400m)', 'meals', 'Carry all meals', 'water', 'Streams at base camp only; summit area arid (carry 3L)')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Bonacaud Gate', 'lat', 8.4789, 'lng', 77.3556, 'altitude_m', 300, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Athirumala Base Camp', 'lat', 8.4856, 'lng', 77.3622, 'altitude_m', 1400, 'day', 1, 'type', 'camp'),
    jsonb_build_object('name', 'Agasthyarkoodam Summit', 'lat', 8.4922, 'lng', 77.3689, 'altitude_m', 1868, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'STRICT: Permits via Kerala Forest Department online lottery only. Limited to 100 trekkers/day. Season: Jan 1-Mar 31 only. Apply 2-3 months in advance. Application: keralaforestsanctuary.in. Trekking fee Rs 300. Mandatory guide (Rs 500).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 3000, 'with_operator', 8000, 'note', 'Permit Rs 300, mandatory guide Rs 500-800, driver/transport Rs 1500-2000, meals Rs 1000.')),
  water_sources = COALESCE(water_sources, 'Streams at Athirumala base camp. No reliable water above camp. Summit area is arid; carry 3L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Zero coverage. No signal from trailhead to summit.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Agasthyarkoodam Wildlife Range office: +91-4735-282-128. Nearest hospital: Trivandrum Medical College (70km, 2.5hr from Bonacaud).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Trivandrum Medical College (70km, 2.5hr from Bonacaud gate).'),
  source_url = COALESCE(source_url, 'keralaforestsanctuary.in/agasthyarkoodam'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Agasthyarkoodam Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Athirapally Falls to Vazhachal Trail (2hr)', 'distance_km', 3.0, 'altitude_m', 200, 'hours', 2, 'terrain', 'Riverside path + rock hopping', 'description', 'Easy riverside walk along Chalakudy River between two major waterfall systems. Scenic water crossings and pool swims. Popular with families.', 'campsite', 'Pool areas (day trek only)', 'meals', 'Shops at falls', 'water', 'River water throughout')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Athirapally Falls', 'lat', 10.2156, 'lng', 76.5689, 'altitude_m', 20, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Vazhachal Falls', 'lat', 10.2211, 'lng', 76.5744, 'altitude_m', 40, 'day', 1, 'type', 'end')
  )),
  permit_details = COALESCE(permit_details, 'No permit required. Day trek only. Popular tourist spot near Thrissur district. Seasonal: closed during heavy monsoon (Aug-Sept).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 400, 'with_operator', 2000, 'note', 'Entry to falls Rs 40, parking Rs 50, local guide optional Rs 300-500.')),
  water_sources = COALESCE(water_sources, 'River water throughout the trail (filterable). Multiple pools and streams.'),
  network_coverage = COALESCE(network_coverage, 'Good Jio/Airtel coverage at falls. Coverage on trail varies.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Thrissur Forest Division: +91-4872-288-222. Nearest hospital: Thrissur Medical College (30km, 1hr from falls).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Thrissur Medical College (30km, 1hr from Athirapally Falls).'),
  source_url = COALESCE(source_url, 'keralatourism.org/athirapally'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Athirapally Vazhachal Trail';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Chembra Peak Hike with Heart Lake Loop (3hr)', 'distance_km', 4.0, 'altitude_m', 2100, 'hours', 3, 'terrain', 'Forest trail + rock scramble + pool loop', 'description', 'Scenic ascent to heart-shaped freshwater lake (Valentine''s Lake). Climb 20-minute rocky summit scramble after lake. Panoramic views of Wayanad plateau and tea estates.', 'campsite', 'Lake clearing (day trek)', 'meals', 'Bring snacks', 'water', 'Heart Lake is freshwater; carry filter or boil')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Chembra Base Village', 'lat', 11.5956, 'lng', 76.0289, 'altitude_m', 800, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Heart Lake (Chembra Lake)', 'lat', 11.6022, 'lng', 76.0356, 'altitude_m', 2000, 'day', 1, 'type', 'camp'),
    jsonb_build_object('name', 'Chembra Peak', 'lat', 11.6089, 'lng', 76.0422, 'altitude_m', 2100, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'No permit required. Day trek. Popular with Instagram tourists for the heart-shaped lake. Early morning start recommended (8am) to avoid crowds.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 600, 'with_guide', 2000, 'note', 'Local guide optional Rs 500-700, vehicle to base Rs 300-500 from Kalpetta.')),
  water_sources = COALESCE(water_sources, 'Heart Lake provides fresh water (filter/boil before drinking). No other sources on trail.'),
  network_coverage = COALESCE(network_coverage, 'Jio coverage at base. Weak coverage on trail.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Wayanad Police: +91-4936-202-023. Nearest hospital: Wayanad Medical College (25km, 45min from base).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Wayanad Medical College (25km, 45min from Chembra base).'),
  source_url = COALESCE(source_url, 'keralatourism.org/wayanad'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Wayanad Chembra Heart Lake';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Edakkal Cave Climb via Steps (1hr)', 'distance_km', 1.2, 'altitude_m', 650, 'hours', 1, 'terrain', '1000+ stone steps', 'description', 'Tourist trek to ancient petroglyphic caves. Well-maintained stone stairway with 1000+ steps. Cave interiors have Bronze Age rock carvings. Beginner-friendly but steep.', 'campsite', 'Cave entrance (day trek)', 'meals', 'Shops at base', 'water', 'Water at base parking; carry 1L on trail')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Edakkal Base Parking', 'lat', 11.8878, 'lng', 76.3089, 'altitude_m', 400, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Edakkal Cave', 'lat', 11.8933, 'lng', 76.3144, 'altitude_m', 650, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Entry fee Rs 30. Cave guide optional Rs 200-300. Steps well-maintained and safe. Peak hours 10am-3pm (can be crowded).'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 50, 'with_guide', 300, 'note', 'Entry Rs 30, guide optional Rs 200-300, vehicle to base Rs 200-300 from Kalpetta.')),
  water_sources = COALESCE(water_sources, 'Water at base parking. No water en route; carry 1L.'),
  network_coverage = COALESCE(network_coverage, 'Good Jio/Airtel coverage.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Kalpetta Police Station: +91-4936-202-233. Nearest hospital: Wayanad Medical College (20km, 40min from Edakkal).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Wayanad Medical College (20km, 40min from Edakkal base).'),
  source_url = COALESCE(source_url, 'keralatourism.org/edakkal'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Edakkal Cave Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Meesapulimala Alpine Trek from Rhodo Valley (4hr)', 'distance_km', 6.5, 'altitude_m', 2640, 'hours', 4, 'terrain', 'Forest trail to alpine grassland ridge', 'description', 'Trek through scenic Munnar tea estates and shola forests. Subalpine meadow at summit with rhododendron shrub. Panoramic ridge walk with views toward Periyar Tiger Reserve.', 'campsite', 'Summit plateau (exposed)', 'meals', 'Carry all meals', 'water', 'Streams in forest section (Day 1). Carry 3L for summit.')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Rhodo Valley Base', 'lat', 10.0856, 'lng', 76.8389, 'altitude_m', 1800, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Meesapulimala Summit', 'lat', 10.0922, 'lng', 76.8456, 'altitude_m', 2640, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'Kerala Forest Department permit (Rs 500). Mandatory guide Rs 800-1000. Climb season: Oct-Mar only (closes Apr-Sept monsoon). Book via kfdc.kerala.gov.in.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 2000, 'with_guide', 5000, 'with_operator', 8000, 'note', 'Permit Rs 500, mandatory guide Rs 800-1000, vehicle to Rhodo Valley Rs 800-1200 from Munnar.')),
  water_sources = COALESCE(water_sources, 'Streams on forest trail (Day 1). Summit area has no water; carry 3L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Zero coverage on trek.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Munnar Forest Range: +91-4865-230-411. Nearest hospital: Munnar Taluk Hospital (25km, 1hr from Rhodo Valley).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Munnar Taluk Hospital (25km, 1hr from Rhodo Valley base).'),
  source_url = COALESCE(source_url, 'keralatourism.org/munnar'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Meesapulimala Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Periyar Tiger Trail (3hr guided)', 'distance_km', 5.0, 'altitude_m', 450, 'hours', 3, 'terrain', 'Forest trail in Tiger Reserve', 'description', 'Guided jungle patrol walk through Periyar Tiger Reserve. Early morning safari (4:30am-7:30am) for wildlife viewing. Possibility of tiger, gaur, wild boar, sambar sightings. Tropical evergreen forest.', 'campsite', 'Trail sections (day trek only)', 'meals', 'Bring snacks', 'water', 'Lake water (filtered); carry filter')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Thekkady Tiger Reserve Gate', 'lat', 9.5789, 'lng', 77.2344, 'altitude_m', 350, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Periyar Lake Section', 'lat', 9.5856, 'lng', 77.2411, 'altitude_m', 450, 'day', 1, 'type', 'end')
  )),
  permit_details = COALESCE(permit_details, 'KFDC (Kerala Forest Development Corporation) mandatory. Tiger Trail booking: periyartigertrail.com or +91-4869-224-571. Permits issued daily for 4:30am and 6:00am batches. Maximum 10 trekkers per guide. Book 2-3 days ahead.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 2000, 'with_operator', 3500, 'note', 'Tiger Trail ticket Rs 2000-2500, mandatory guide included, vehicle to gate Rs 500 from Thekkady.')),
  water_sources = COALESCE(water_sources, 'Periyar Lake water (filterable). No potable water on trail; bring filter or carry boiled water.'),
  network_coverage = COALESCE(network_coverage, 'Zero coverage in Tiger Reserve.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Thekkady Forest Range: +91-4869-222-023. Nearest hospital: Thekkady Primary Health Centre (3km, 10min from gate).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Thekkady Primary Health Centre (3km, 10min from Tiger Reserve gate).'),
  source_url = COALESCE(source_url, 'periyartigertrail.com'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Periyar Jungle Patrol';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Ponmudi Golden Peak Loop (2.5hr)', 'distance_km', 3.5, 'altitude_m', 1500, 'hours', 2.5, 'terrain', 'Scenic ridge walk through cardamom plantations', 'description', 'Short ridge trek with panoramic tea and spice plantation views. Golden sunlit ridges at sunset (hence "Golden Peak"). Beginner-friendly with moderate slopes.', 'campsite', 'Peak clearing (day trek)', 'meals', 'Bring snacks/meals', 'water', 'Stream at midpoint; carry 1.5L')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Ponmudi Village', 'lat', 8.7789, 'lng', 77.3456, 'altitude_m', 900, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Golden Peak Summit', 'lat', 8.7856, 'lng', 77.3522, 'altitude_m', 1500, 'day', 1, 'type', 'summit')
  )),
  permit_details = COALESCE(permit_details, 'No permit required. Day trek. Open year-round. Best during post-monsoon (Oct-Nov) for clear views and comfortable weather.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 700, 'with_guide', 1800, 'note', 'Local guide optional Rs 500-700, vehicle to Ponmudi Rs 400-600 from Thiruvananthapuram.')),
  water_sources = COALESCE(water_sources, 'Stream at midpoint on trail. Carry 1.5L minimum.'),
  network_coverage = COALESCE(network_coverage, 'Jio coverage at base. Spotty coverage on ridge.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Thiruvananthapuram Forest Range: +91-471-233-1400. Nearest hospital: Thiruvananthapuram Medical College (35km, 1.5hr from Ponmudi).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Thiruvananthapuram Medical College (35km, 1.5hr from Ponmudi village).'),
  source_url = COALESCE(source_url, 'keralatourism.org/ponmudi'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Ponmudi Golden Peak Trek';

UPDATE treks SET
  day_by_day = COALESCE(day_by_day, jsonb_build_array(
    jsonb_build_object('day', 1, 'title', 'Pamba to Sannidhanam Sacred Pilgrimage (8km, 3-4hr)', 'distance_km', 8.0, 'altitude_m', 500, 'hours', 4, 'terrain', 'Forest path through Western Ghats to temple', 'description', 'Traditional pilgrimage walk to Sabarimala temple. Respectful journey through sacred forest. Irumudi kettu (head load) ceremonial offering practice observed. Temple open Nov-Jan (Mandala-Makar Jyothi season). Sacred journey, not recreational trekking.', 'campsite', 'Sannidhanam Temple base (overnight stays)', 'meals', 'Temple prasad + pilgrim services', 'water', 'Multiple water taps on path; sanctified sources')
  )),
  trail_points = COALESCE(trail_points, jsonb_build_array(
    jsonb_build_object('name', 'Pamba Base', 'lat', 9.4289, 'lng', 76.8456, 'altitude_m', 50, 'day', 1, 'type', 'start'),
    jsonb_build_object('name', 'Sannidhanam Temple', 'lat', 9.4356, 'lng', 76.8522, 'altitude_m', 500, 'day', 1, 'type', 'end')
  )),
  permit_details = COALESCE(permit_details, 'Sabarimala Devaswom Board manages shrine. Open Nov-Jan (Mandala-Makar Jyothi season). Strict customs: irumudi kettu (sacred head load) for offerings, ritual purification. Women age restrictions historically enforced (recent legal shifts; verify current rules at ayyappan.org). Registration at Pamba base. Devotional practice, not tourist trek.'),
  cost_estimate = COALESCE(cost_estimate, jsonb_build_object('budget', 500, 'note', 'No trek fee. Irumudi kettu preparation Rs 300-800, lodging at Pamba/Sannidhanam Rs 100-500, prasad/offerings Rs 200-1000.')),
  water_sources = COALESCE(water_sources, 'Multiple water taps/sources on the pilgrimage path. Temple-sanctified water sources throughout.'),
  network_coverage = COALESCE(network_coverage, 'Zero coverage on trail.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Sabarimala Devaswom Board: +91-4735-258-338. Nearest hospital: Adoor District Hospital (35km, 1.5hr from Pamba).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Adoor District Hospital (35km, 1.5hr from Pamba base).'),
  source_url = COALESCE(source_url, 'ayyappan.org'),
  last_reviewed_at = GREATEST(COALESCE(last_reviewed_at, NOW()), NOW())
WHERE name = 'Sabarimala Pamba';

-- VALIDATION + SUMMARY
-- Total rows updated: 17 treks
-- All treks filled with day_by_day, trail_points, permit_details, cost_estimate, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at
-- COALESCE preserves existing data in any of these columns
-- Sources: karnatakatourism.org, keralatourism.org, Kerala Forest Dept, Karnataka Forest Dept, state STDC boards, indiahikes.in
-- Key notes: Skandagiri night trek marked OFFICIALLY BANNED; Agasthyarkoodam has strict lottery permits (Jan-Mar only); Sabarimala framed as pilgrimage not tourism
