-- =====================================================
-- Agent A supplement: Trek rows + POIs for the 5 Kailashes
-- Generated: 2026-05-27
-- Reason: Agent A delivered destinations + collections but not the
--         treks table rows / POIs that the /treks page needs.
-- All rows are ON CONFLICT (id) DO UPDATE — idempotent
-- =====================================================

-- =====================================================
-- TREKS: one pilgrim trek per Kailash
-- =====================================================

-- source: https://en.wikipedia.org/wiki/Adi_Kailash
-- source: https://kmvn.in/adi-kailash-om-parvat-yatra
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, water_sources, nearest_hospital,
  network_coverage, how_to_reach, permit_details, emergency_contacts, hero_image_url, source_url
) VALUES (
  'adi-kailash-yatra-trek',
  'Adi Kailash & Om Parvat Yatra',
  'adi-kailash',
  'hard',
  8,
  4572,
  75,
  ARRAY[5, 6, 9, 10]::int[],
  true, false, 18, 'high',
  'A six-to-eight-day pilgrim trek from Dharchula in Pithoragarh district to Adi Kailash and the natural-Om-shaped Om Parvat. The classic route runs Dharchula → Gunji → Nabhi → Kuti → Jolingkong (Parvati Sarovar at the base of Adi Kailash). A motorable road now reaches close to Jolingkong, so many pilgrims combine vehicle stages with day hikes. Inner Line Permit required because the trail runs along the Indo-Tibet border.',
  ARRAY['Om Parvat — natural snow-Om symbol on the peak face', 'Parvati Sarovar at the base of Adi Kailash', 'Border villages of Gunji, Nabhi, and Kuti', 'Less crowded than Tibetan Mt Kailash']::text[],
  ARRAY['Inner Line Permit mandatory — apply at Dharchula SDM 1-3 days ahead', 'High altitude — acclimatise at Gunji (3,200m) for one day minimum', 'Weather closes the route from late October to April', 'Cell network drops past Dharchula — carry satellite messenger']::text[],
  ARRAY['Trekking boots', 'Down jacket', 'Thermal layers', 'Microspikes (Sep-Oct)', 'Diamox for altitude', 'Power bank', 'Satellite messenger']::text[],
  'Streams reliable until Kuti; carry 2L for the Jolingkong day. Purify all water.',
  'CHC Dharchula (basic). Serious cases: District Hospital Pithoragarh 90km.',
  'BSNL only at Dharchula. No coverage past Gunji. Satellite phone strongly recommended.',
  'Pantnagar/Dehradun → Tanakpur (rail) → Pithoragarh → Dharchula (~340km from Kathgodam). KMVN operates the official package.',
  'Inner Line Permit (free) issued by Dharchula SDM. Carry Aadhaar + 2 photos + medical fitness certificate. Indian passport-holders only on the classic route.',
  'SDRF Uttarakhand 1070. Pithoragarh DM Office 05964-225950. ITBP Dharchula post.',
  NULL,
  'https://kmvn.in/adi-kailash-om-parvat-yatra'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, destination_id = EXCLUDED.destination_id, difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days, max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km, best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required, kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age, fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description, highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings, gear_essentials = EXCLUDED.gear_essentials,
  water_sources = EXCLUDED.water_sources, nearest_hospital = EXCLUDED.nearest_hospital,
  network_coverage = EXCLUDED.network_coverage, how_to_reach = EXCLUDED.how_to_reach,
  permit_details = EXCLUDED.permit_details, emergency_contacts = EXCLUDED.emergency_contacts,
  source_url = EXCLUDED.source_url;

-- source: https://en.wikipedia.org/wiki/Kinnaur_Kailash
-- source: https://himachaltourism.gov.in/destination/kinner-kailash/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, water_sources, nearest_hospital,
  network_coverage, how_to_reach, permit_details, emergency_contacts, hero_image_url, source_url
) VALUES (
  'kinner-kailash-parikrama-trek',
  'Kinner Kailash Parikrama',
  'kinner-kailash',
  'hard',
  5,
  5242,
  48,
  ARRAY[7, 8, 9]::int[],
  false, false, 18, 'very-high',
  'A 48-km circular circumambulation of the Kinner Kailash massif in Kinnaur, Himachal Pradesh, traditionally walked by pilgrims during Shravan (Jul-Aug). The route crosses the Charang La pass at 5,242m — the highest point of the parikrama — and passes the 79-foot vertical Kinner Kailash Shivling rock formation. Most operators run it as a 5-day trek starting from Thangi village near Kalpa. No permit required for Indian nationals.',
  ARRAY['Charang La pass at 5,242m', 'The natural Shivling rock — 79 feet vertical', 'Kalpa village views of the Kinner Kailash range', 'Shravan-month pilgrim trail with chai stops at sadhu camps']::text[],
  ARRAY['One of the harder Himalayan parikramas — daily ascent of 1000m+ for two days', 'Charang La can be snowbound till early August', 'Acute mountain sickness risk above 4,500m — carry Diamox', 'No mobile signal past Thangi']::text[],
  ARRAY['Trekking boots', '4-season sleeping bag', 'Down jacket', 'Microspikes', 'Trekking poles', 'Diamox', 'Headlamp']::text[],
  'Streams reliable on the Lalanti and Chitkul-side slopes; the Charang La crossing has no water — carry 3L.',
  'CHC Reckong Peo (basic). Serious cases: IGMC Shimla 240km.',
  'BSNL/Jio at Kalpa-Reckong Peo. Zero signal past Thangi village.',
  'Shimla → Reckong Peo (240km by road, 8hr) → Kalpa → Thangi village (trailhead). Buses run daily; shared taxis cheaper.',
  'No permit for Indians. Foreign nationals need ILP from Reckong Peo (free).',
  'SDRF HP 1070. Reckong Peo Police 01786-222204.',
  NULL,
  'https://himachaltourism.gov.in/destination/kinner-kailash/'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, destination_id = EXCLUDED.destination_id, difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days, max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km, best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required, kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age, fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description, highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings, gear_essentials = EXCLUDED.gear_essentials,
  water_sources = EXCLUDED.water_sources, nearest_hospital = EXCLUDED.nearest_hospital,
  network_coverage = EXCLUDED.network_coverage, how_to_reach = EXCLUDED.how_to_reach,
  permit_details = EXCLUDED.permit_details, emergency_contacts = EXCLUDED.emergency_contacts,
  source_url = EXCLUDED.source_url;

-- source: https://en.wikipedia.org/wiki/Shrikhand_Mahadev
-- source: https://himachaltourism.gov.in/destination/shrikhand-mahadev/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, water_sources, nearest_hospital,
  network_coverage, how_to_reach, permit_details, emergency_contacts, hero_image_url, source_url
) VALUES (
  'shrikhand-mahadev-yatra-trek',
  'Shrikhand Mahadev Yatra',
  'shrikhand-mahadev',
  'extreme',
  5,
  5227,
  32,
  ARRAY[7, 8]::int[],
  true, false, 18, 'very-high',
  'A 32-km roundtrip pilgrim trek from Jaon village in Nirmand subdivision of Kullu district to the 75-foot Shivling at Shrikhand Mahadev (5,227m). The Himachal government opens the yatra for a narrow ~25-day window each year, usually mid-July to mid-August, when the snow is most stable. Considered one of the hardest pilgrim treks in India because of the relentless gradient — gains over 3,000m in two days, with sections of fixed-rope climbing past Parvati Bagh.',
  ARRAY['The 75-foot natural Shivling at the summit', 'Bhim Talai meadow and Parvati Bagh wildflowers', 'Nain Sarovar lake en route', 'Steep rock-scramble sections — Bhim Dwar and Kali Ghati']::text[],
  ARRAY['Yatra opens only ~25 days a year — register with HP Tourism', 'Medical certificate mandatory at base camp', 'Above 5,000m the air has 50% sea-level oxygen — Diamox + acclimatisation essential', 'Loose scree on the final climb after rain — historic deaths every year', 'No helicopter rescue from above Kunsa']::text[],
  ARRAY['Trekking boots with hard sole', '4-season sleeping bag', 'Down jacket', 'Hand gloves', 'Trekking poles (essential for descent)', 'Diamox', 'Power bank', 'Wooden danda from Jaon']::text[],
  'Streams reliable till Thachru; carry 3L for the Bhim Dwar push and the summit day. Snowmelt at Parvati Bagh.',
  'CHC Nirmand (basic). Serious cases: Regional Hospital Rampur 60km, IGMC Shimla 180km.',
  'BSNL only till Jaon. No signal beyond.',
  'Shimla → Rampur Bushahr (130km, 6hr) → Nirmand → Jaon village (trailhead, 25km). Buses run Shimla-Rampur; shared jeeps Rampur-Jaon.',
  'No permit, but mandatory registration with HP Tourism + medical certificate at Singhad/Jaon base camp during yatra window.',
  'SDRF HP 1070. Nirmand SDM Office. Rampur Police 01782-233330.',
  NULL,
  'https://himachaltourism.gov.in/destination/shrikhand-mahadev/'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, destination_id = EXCLUDED.destination_id, difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days, max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km, best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required, kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age, fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description, highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings, gear_essentials = EXCLUDED.gear_essentials,
  water_sources = EXCLUDED.water_sources, nearest_hospital = EXCLUDED.nearest_hospital,
  network_coverage = EXCLUDED.network_coverage, how_to_reach = EXCLUDED.how_to_reach,
  permit_details = EXCLUDED.permit_details, emergency_contacts = EXCLUDED.emergency_contacts,
  source_url = EXCLUDED.source_url;

-- source: https://en.wikipedia.org/wiki/Manimahesh_Lake
-- source: https://hpchamba.nic.in/tourist-place/manimahesh-lake/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, water_sources, nearest_hospital,
  network_coverage, how_to_reach, permit_details, emergency_contacts, hero_image_url, source_url
) VALUES (
  'manimahesh-yatra-trek',
  'Manimahesh Kailash Yatra',
  'manimahesh-kailash',
  'moderate',
  3,
  3950,
  26,
  ARRAY[8, 9]::int[],
  false, true, 12, 'medium',
  'A 13-km one-way trek from Hadsar village in Chamba district to Manimahesh Lake (3,950m), the sacred glacial pool below Manimahesh Kailash peak. The official Manimahesh Yatra runs from Janmashtami to Radha Ashtami (late Aug to early Sep). The trail climbs through Dhancho waterfall and Sundrasi meadows before opening out to the lake. Easier than the other four Kailash routes — most pilgrims complete it in 2-3 days with overnight at Dhancho or the lake itself.',
  ARRAY['Manimahesh Lake at sunrise — Kailash peak reflection', 'Dhancho waterfall and meadow camp', 'Gauri Kund and Kamal Kund near the main lake', 'Pilgrim community atmosphere during the yatra window']::text[],
  ARRAY['Yatra crowds — tent space at the lake fills up days ahead during the official window', 'Weather flips fast — rain at Dhancho becomes snow at the lake', 'Helicopter from Bharmour to Gauri Kund available but unreliable in poor weather', 'No alcohol or non-vegetarian food permitted on the route during yatra']::text[],
  ARRAY['Trekking shoes', 'Rain jacket', 'Thermal layers', 'Headlamp', 'Trekking pole', 'Water bottle', 'Prasad/offerings if pilgrim']::text[],
  'Streams reliable from Hadsar to Dhancho; the Sundrasi-to-lake stretch has snowmelt streams.',
  'CHC Bharmour (basic). Serious cases: Zonal Hospital Chamba 70km.',
  'BSNL/Jio at Bharmour. Patchy past Hadsar. No signal at the lake.',
  'Pathankot/Dharamshala → Chamba → Bharmour (65km) → Hadsar (trailhead, 13km). HRTC buses serve Bharmour daily.',
  'No permit required. Mandatory pilgrim registration during the official yatra window (Aug-Sep) at Bharmour.',
  'SDRF HP 1070. Chamba District Control 01899-222002. Bharmour SDM Office.',
  NULL,
  'https://hpchamba.nic.in/tourist-place/manimahesh-lake/'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, destination_id = EXCLUDED.destination_id, difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days, max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km, best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required, kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age, fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description, highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings, gear_essentials = EXCLUDED.gear_essentials,
  water_sources = EXCLUDED.water_sources, nearest_hospital = EXCLUDED.nearest_hospital,
  network_coverage = EXCLUDED.network_coverage, how_to_reach = EXCLUDED.how_to_reach,
  permit_details = EXCLUDED.permit_details, emergency_contacts = EXCLUDED.emergency_contacts,
  source_url = EXCLUDED.source_url;

-- source: https://en.wikipedia.org/wiki/Kailash_Mansarovar_Yatra
-- source: https://kmy.gov.in/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, water_sources, nearest_hospital,
  network_coverage, how_to_reach, permit_details, emergency_contacts, hero_image_url, source_url
) VALUES (
  'kailash-mansarovar-yatra-trek',
  'Kailash Mansarovar Yatra (Lipulekh route)',
  'mansarovar-kailash',
  'extreme',
  24,
  5334,
  90,
  ARRAY[6, 7, 8, 9]::int[],
  true, false, 18, 'very-high',
  'A government-organised pilgrim yatra to Mount Kailash and Lake Mansarovar in Tibet, traditionally undertaken via the Lipulekh Pass (5,334m) from Pithoragarh district in Uttarakhand. The MEA runs annual batches managed by KMVN — applicants are selected by computerised draw, must clear a medical screening in Delhi, and pay the official fee. The Indian-side trek covers ~90km of high-altitude trails through Gunji and Navidhang to Lipulekh, then continues into Tibet for the 52-km Kailash parikrama. Suspended 2020-2024 due to border tensions and COVID; resumption status varies year to year — check the official MEA portal before applying.',
  ARRAY['Mount Kailash at sunrise from Tarboche', 'The 52-km Kailash parikrama via Dolma La pass (5,630m)', 'Lake Mansarovar circumambulation', 'Crossing Lipulekh Pass on foot']::text[],
  ARRAY['Yatra status changes year-to-year — check the official MEA portal before planning', 'Medical fitness screening at Delhi ITBP base hospital is mandatory and strict', 'Restricted-access route — government-managed batches only, no private trekking permitted', 'Extreme altitude — Dolma La at 5,630m and Lipulekh at 5,334m', 'Chinese visa procedures (handled by yatra organisers) take 30+ days']::text[],
  ARRAY['All gear is provided / specified by KMVN', 'Personal: down jacket, thermal layers, trekking boots, sunglasses (glacier grade)', 'Diamox', 'Hand sanitizer', 'Sunscreen SPF 50+']::text[],
  'Provided by yatra logistics — bottled / boiled water at all camps.',
  'ITBP Mirthi medical facility. Serious cases evacuated to Pithoragarh District Hospital or AIIMS Delhi.',
  'No personal mobile signal past Dharchula. Yatra organisers maintain satellite comms.',
  'Apply online via kmy.gov.in. Selected applicants assemble in Delhi for medical screening, then travel by road via Pithoragarh and Dharchula to the Indian-side trailhead.',
  'Restricted-access route — government-managed only. No Inner Line Permit required since the MEA handles all permits including the Chinese visa.',
  'KMVN Pithoragarh office. ITBP Mirthi. MEA emergency desk for yatra batches.',
  NULL,
  'https://kmy.gov.in/'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, destination_id = EXCLUDED.destination_id, difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days, max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km, best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required, kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age, fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description, highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings, gear_essentials = EXCLUDED.gear_essentials,
  water_sources = EXCLUDED.water_sources, nearest_hospital = EXCLUDED.nearest_hospital,
  network_coverage = EXCLUDED.network_coverage, how_to_reach = EXCLUDED.how_to_reach,
  permit_details = EXCLUDED.permit_details, emergency_contacts = EXCLUDED.emergency_contacts,
  source_url = EXCLUDED.source_url;

-- =====================================================
-- POINTS OF INTEREST: 2-3 per Kailash dest
-- =====================================================

-- ADI KAILASH POIs
INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('adi-kailash-parvati-sarovar', 'adi-kailash', 'Parvati Sarovar (Gauri Kund)', 'lake',
  'Glacial lake at the base of Adi Kailash, considered the bathing pool of goddess Parvati. The standard turnaround point for the yatra.',
  ST_SetSRID(ST_MakePoint(80.6315, 30.3180), 4326)::geography,
  '2-3 hours',
  ARRAY['sacred-lake','pilgrim-site']::text[], false,
  '{"hi":{"name":"पार्वती सरोवर (गौरी कुंड)","description":"आदि कैलाश के आधार पर हिमनद झील, जिसे देवी पार्वती का स्नान सरोवर माना जाता है।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('adi-kailash-om-parvat', 'adi-kailash', 'Om Parvat', 'viewpoint',
  'A 6,191m peak near Nabhi whose north face naturally forms the sacred "Om" symbol in snow. Best viewed from Nabhidhang campsite at dawn.',
  ST_SetSRID(ST_MakePoint(80.7544, 30.2289), 4326)::geography,
  '1-2 hours (viewpoint stop)',
  ARRAY['viewpoint','sacred-peak']::text[], false,
  '{"hi":{"name":"ओम पर्वत","description":"6,191 मीटर ऊंची चोटी जिसके उत्तरी मुख पर बर्फ का प्राकृतिक \"ॐ\" प्रतीक बनता है।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

-- KINNER KAILASH POIs
INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('kinner-kailash-shivling', 'kinner-kailash', 'Kinner Kailash Shivling', 'temple',
  'A 79-foot vertical rock formation revered as a natural Shiva lingam, sitting just below the Kinner Kailash peak. The colour appears to shift across the day as the light angle changes.',
  ST_SetSRID(ST_MakePoint(78.4380, 31.4790), 4326)::geography,
  '4-5 hours from base camp',
  ARRAY['sacred-rock','pilgrim-site']::text[], false,
  '{"hi":{"name":"किन्नर कैलाश शिवलिंग","description":"79 फुट ऊंची प्राकृतिक चट्टान जिसे शिवलिंग के रूप में पूजा जाता है। दिन भर में रंग बदलता दिखाई देता है।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('kinner-kailash-charang-la', 'kinner-kailash', 'Charang La Pass', 'viewpoint',
  'The 5,242m crossing at the top of the parikrama, between Charang and Chitkul valleys. Snowbound till early August in most years.',
  ST_SetSRID(ST_MakePoint(78.5900, 31.4730), 4326)::geography,
  'Day 3 of the parikrama',
  ARRAY['mountain-pass','high-altitude']::text[], false,
  '{"hi":{"name":"चरंग ला दर्रा","description":"5,242 मीटर का पास जो चरंग और छितकुल घाटियों को जोड़ता है। अगस्त की शुरुआत तक बर्फ रहती है।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

-- SHRIKHAND MAHADEV POIs
INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('shrikhand-shivling', 'shrikhand-mahadev', 'Shrikhand Mahadev Shivling', 'temple',
  'A 75-foot vertical natural rock formation revered as the Shrikhand Mahadev Shivling. Standing at 5,227m it is one of India''s highest pilgrim destinations.',
  ST_SetSRID(ST_MakePoint(77.5189, 31.5097), 4326)::geography,
  'Summit day, 8-12 hours roundtrip from Bhim Dwar',
  ARRAY['sacred-rock','high-altitude','pilgrim-site']::text[], false,
  '{"hi":{"name":"श्रीखंड महादेव शिवलिंग","description":"75 फुट ऊंची प्राकृतिक चट्टान जिसे श्रीखंड महादेव शिवलिंग के रूप में पूजा जाता है। 5,227 मीटर पर भारत के सबसे ऊंचे तीर्थस्थलों में से एक।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('shrikhand-parvati-bagh', 'shrikhand-mahadev', 'Parvati Bagh', 'garden',
  'A wildflower meadow at ~4,200m on the route between Kunsa and Bhim Dwar, named for Parvati. Brahma Kamal blooms here through July and August.',
  ST_SetSRID(ST_MakePoint(77.5350, 31.5300), 4326)::geography,
  '1-2 hours en route',
  ARRAY['alpine-meadow','wildflowers']::text[], false,
  '{"hi":{"name":"पार्वती बाग","description":"लगभग 4,200 मीटर की ऊंचाई पर जंगली फूलों का घास का मैदान। जुलाई-अगस्त में ब्रह्म कमल खिलता है।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

-- MANIMAHESH POIs
INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('manimahesh-lake', 'manimahesh-kailash', 'Manimahesh Lake (Dal Lake)', 'lake',
  'The glacial lake at 3,950m below Manimahesh Kailash peak, the destination of the annual Manimahesh Yatra. Pilgrims circumambulate the lake before darshan.',
  ST_SetSRID(ST_MakePoint(76.6500, 32.4000), 4326)::geography,
  'Half day at the lake',
  ARRAY['sacred-lake','pilgrim-site']::text[], true,
  '{"hi":{"name":"मणिमहेश झील (डल झील)","description":"मणिमहेश कैलाश शिखर के नीचे 3,950 मीटर पर हिमनद झील — वार्षिक मणिमहेश यात्रा का गंतव्य।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('manimahesh-gauri-kund', 'manimahesh-kailash', 'Gauri Kund', 'lake',
  'A smaller sacred pool ~1km before the main Manimahesh Lake, where women pilgrims traditionally bathe before darshan.',
  ST_SetSRID(ST_MakePoint(76.6480, 32.3980), 4326)::geography,
  '30 minutes',
  ARRAY['sacred-lake','pilgrim-site']::text[], true,
  '{"hi":{"name":"गौरी कुंड","description":"मुख्य मणिमहेश झील से लगभग 1 किमी पहले एक छोटी पवित्र कुंड जहाँ महिला तीर्थयात्री दर्शन से पहले स्नान करती हैं।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

-- MANSAROVAR / Mount Kailash POIs (Tibet side — listed as destination context for the yatra)
INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('mansarovar-lake', 'mansarovar-kailash', 'Lake Mansarovar', 'lake',
  'A 320 sq-km freshwater lake at 4,590m, regarded by Hindus, Buddhists, Jains and Bon as one of the holiest waters on earth. Yatris bathe in it during the official KMVN circumambulation.',
  ST_SetSRID(ST_MakePoint(81.4667, 30.6500), 4326)::geography,
  'Half day during parikrama',
  ARRAY['sacred-lake','pilgrim-site']::text[], false,
  '{"hi":{"name":"मानसरोवर झील","description":"4,590 मीटर पर 320 वर्ग किमी की ताजे पानी की झील — हिंदू, बौद्ध, जैन और बॉन धर्म में पृथ्वी के सबसे पवित्र जल में से एक।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;

INSERT INTO points_of_interest (id, destination_id, name, type, description, coords, time_needed, tags, kids_suitable, translations) VALUES
('lipulekh-pass', 'mansarovar-kailash', 'Lipulekh Pass', 'viewpoint',
  'The 5,334m pass on the Indo-Tibet border in Pithoragarh district — the historical Indian-side entry point for the Kailash Mansarovar Yatra. A jeepable road to the pass was completed in 2020.',
  ST_SetSRID(ST_MakePoint(81.0044, 30.2300), 4326)::geography,
  'Half day stop',
  ARRAY['mountain-pass','border']::text[], false,
  '{"hi":{"name":"लिपुलेख दर्रा","description":"पिथौरागढ़ ज़िले में 5,334 मीटर का भारत-तिब्बत सीमा दर्रा — कैलाश मानसरोवर यात्रा का पारंपरिक भारतीय प्रवेश बिंदु।"}}'::jsonb)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, coords=EXCLUDED.coords, time_needed=EXCLUDED.time_needed, tags=EXCLUDED.tags, translations=EXCLUDED.translations;
