-- =====================================================
-- Agent C: Missing Himalayan + Northeast + Central/Tribal Treks
-- Generated: 2026-05-27
-- All rows use ON CONFLICT (id) DO UPDATE for idempotency
-- =====================================================

-- =====================================================
-- DESTINATIONS (new parents for treks)
-- =====================================================



-- Ziro — Arunachal Pradesh, scenic plateau, Ziro Valley
INSERT INTO destinations (
  id, name, state_id, region, coords, elevation_m, type, vibe, difficulty,
  nearest_airport, nearest_railhead, tagline, why_special,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_required, languages_spoken, best_months, avoid_months,
  translations, place_type, crowd_level,
  solo_suitable, couple_suitable, biker_suitable, content_tier, permit_type
) VALUES (
  'ziro', 'Ziro', 'arunachal-pradesh', 'Lower Subansiri',
  ST_SetSRID(ST_MakePoint(93.8333, 27.8167), 4326)::geography,
  1500, ARRAY['trekking-base', 'cultural-base'], ARRAY['tribal', 'pastoral', 'offbeat'], 'easy',
  'bagdogra', NULL, 'Scenic plateau, Apatani tribal heartland, emerging trekking hub',
  'Lush plateau at 1,500m home to Apatani tribe. Rice paddies and pine forests. ILP required. Talle Valley trek base.',
  'budget', 2, 5, 'patchy', false, 'clinic',
  'ilp', ARRAY['hindi', 'english', 'apatani'], ARRAY[10,11,12,1,2,3,4,5], ARRAY[6,7,8,9],
  '{
    "hi": {
      "name": "जीरो",
      "tagline": "अपतानी जनजाति का दिल, हरा पठार",
      "why_special": "सुरम्य घाटी, चावल की खेती, पाइन जंगल। ILP आवश्यक है।"
    }
  }',
  'town', 'low', true, true, true, 'B', 'ilp'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  permit_type = EXCLUDED.permit_type;

-- Kiphire — Nagaland, Saramati Peak base
INSERT INTO destinations (
  id, name, state_id, region, coords, elevation_m, type, vibe, difficulty,
  nearest_airport, nearest_railhead, tagline, why_special,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_required, languages_spoken, best_months, avoid_months,
  translations, place_type, crowd_level,
  solo_suitable, couple_suitable, biker_suitable, content_tier, permit_type
) VALUES (
  'kiphire', 'Kiphire', 'nagaland', 'Eastern Nagaland',
  ST_SetSRID(ST_MakePoint(94.2667, 26.0), 4326)::geography,
  800, ARRAY['trekking-base', 'tribal'], ARRAY['tribal', 'border', 'adventure'], 'hard',
  NULL, NULL, 'Gateway to Saramati Peak, India-Myanmar border trek',
  'Small town at India-Myanmar border. Saramati Peak (3,841m) is Nagaland''s highest. Tribal Naga culture, remote.',
  'budget', 5, 9, 'poor', false, 'clinic',
  'none', ARRAY['hindi', 'english', 'naga'], ARRAY[9,10,11,12,1,2,3], ARRAY[4,5,6,7,8],
  '{
    "hi": {
      "name": "किफायर",
      "tagline": "सरमाती पीक का द्वार, भारत-म्यांमार सीमा पर",
      "why_special": "नागालैंड की सर्वोच्च चोटी 3,841 मीटर पर। दुर्गम और जनजातीय।"
    }
  }',
  'town', 'very-low', false, false, true, 'B', 'none'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  permit_type = EXCLUDED.permit_type;



-- Betla — Jharkhand, Palamau Tiger Reserve / National Park
-- source: https://forest.jharkhand.gov.in/wings_wildlife_protectedarea_betla.aspx
INSERT INTO destinations (
  id, name, state_id, region, coords, elevation_m, type, vibe, difficulty,
  nearest_airport, nearest_railhead, tagline, why_special,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_required, languages_spoken, best_months, avoid_months,
  translations, place_type, crowd_level,
  solo_suitable, couple_suitable, biker_suitable, content_tier, permit_type
) VALUES (
  'betla', 'Betla', 'jharkhand', 'Latehar/Palamu',
  ST_SetSRID(ST_MakePoint(84.1901, 23.8878), 4326)::geography,
  700, ARRAY['national-park', 'trekking', 'wildlife'], ARRAY['wild', 'tiger-country', 'forest-trek'], 'moderate',
  'ranchi', 'latehar', 'Palamau Tiger Reserve, forest trails through sal and bamboo',
  '226 sq.km national park in Palamau Tiger Reserve. Forest trails, Palamu Fort trek, tiger and elephant habitat.',
  'budget', 2, 3, 'patchy', false, 'clinic',
  'none', ARRAY['hindi', 'english'], ARRAY[10,11,12,1,2,3,4], ARRAY[5,6,7,8,9],
  '{
    "hi": {
      "name": "बेतला",
      "tagline": "पालामू टाइगर रिजर्व, वन्यजीव और ट्रेकिंग",
      "why_special": "226 वर्ग किमी का राष्ट्रीय उद्यान, बाघ और हाथी निवास।"
    }
  }',
  'protected-area', 'low', true, true, false, 'B', 'none'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  permit_type = EXCLUDED.permit_type;

-- Chitrakote Falls — Chhattisgarh, "Niagara of India"
INSERT INTO destinations (
  id, name, state_id, region, coords, elevation_m, type, vibe, difficulty,
  nearest_airport, nearest_railhead, tagline, why_special,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_required, languages_spoken, best_months, avoid_months,
  translations, place_type, crowd_level,
  solo_suitable, couple_suitable, biker_suitable, content_tier, permit_type
) VALUES (
  'chitrakote-falls', 'Chitrakote Falls', 'chhattisgarh', 'Bastar',
  ST_SetSRID(ST_MakePoint(82.0833, 20.3333), 4326)::geography,
  150, ARRAY['waterfall', 'trekking', 'tribal-culture'], ARRAY['wet-season', 'bastar-tribal'], 'easy',
  'raipur', 'jagdalpur', 'India''s Niagara, widest waterfall, Bastar tribal region',
  'India''s widest waterfall at 299m across. Tribal Bastar heartland, Indravati River. Best in monsoon.',
  'budget', 1, 2, 'moderate', true, 'clinic',
  'none', ARRAY['hindi', 'english', 'gondi'], ARRAY[6,7,8,9,10], ARRAY[11,12,1,2,3,4,5],
  '{
    "hi": {
      "name": "चित्रकोट जलप्रपात",
      "tagline": "भारत का नियाग्रा, 299 मीटर चौड़ा",
      "why_special": "मानसून में भव्य, बस्तर जनजातीय क्षेत्र, इंद्रावती नदी।"
    }
  }',
  'waterfall', 'moderate', true, true, true, 'B', 'none'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  permit_type = EXCLUDED.permit_type;

-- Bhoramdeo — Chhattisgarh, "Khajuraho of Chhattisgarh"
-- source: https://kawardha.gov.in/en/tourist-place/bhoramdev-templekawardha/
INSERT INTO destinations (
  id, name, state_id, region, coords, elevation_m, type, vibe, difficulty,
  nearest_airport, nearest_railhead, tagline, why_special,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_required, languages_spoken, best_months, avoid_months,
  translations, place_type, crowd_level,
  solo_suitable, couple_suitable, biker_suitable, content_tier, permit_type
) VALUES (
  'bhoramdeo', 'Bhoramdeo', 'chhattisgarh', 'Kabirdham',
  ST_SetSRID(ST_MakePoint(81.9667, 21.6333), 4326)::geography,
  400, ARRAY['temple', 'architecture', 'trekking'], ARRAY['spiritual', 'forest', 'historical'], 'easy',
  'raipur', 'kawardha', 'Khajuraho of Chhattisgarh, 11th-century temple in Maikal forests',
  '11th-century Shiva temple in Maikal Hills forests. Erotic sculptures, Gurur architectural style. Forest trails.',
  'budget', 1, 2, 'poor', false, 'clinic',
  'none', ARRAY['hindi', 'english'], ARRAY[10,11,12,1,2,3,4], ARRAY[5,6,7,8,9],
  '{
    "hi": {
      "name": "भोरमदेव",
      "tagline": "छत्तीसगढ़ का खजुराहो, 11वीं शताब्दी का मंदिर",
      "why_special": "मैकल पहाड़ियों में, कामोत्तेजक मूर्तिकला, घने जंगल।"
    }
  }',
  'temple', 'low', true, true, true, 'B', 'none'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  permit_type = EXCLUDED.permit_type;

-- Jampui Hills — Tripura
-- source: https://northtripura.nic.in/tourist-place/jampui-hills/
INSERT INTO destinations (
  id, name, state_id, region, coords, elevation_m, type, vibe, difficulty,
  nearest_airport, nearest_railhead, tagline, why_special,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_required, languages_spoken, best_months, avoid_months,
  translations, place_type, crowd_level,
  solo_suitable, couple_suitable, biker_suitable, content_tier, permit_type
) VALUES (
  'jampui-hills', 'Jampui Hills', 'tripura', 'North Tripura',
  ST_SetSRID(ST_MakePoint(91.5833, 24.0167), 4326)::geography,
  914, ARRAY['hill-station', 'trekking'], ARRAY['eternal-spring', 'forest-trek', 'quiet'], 'easy',
  'guwahati', NULL, 'Eternal Hills of Spring, Betlingchhip peak at 3,080 ft, year-round trekking',
  'Highest hill range in Tripura. Betlingchhip peak at 914m. Year-round temperate climate. Quiet forest trails, bird-watching.',
  'budget', 1, 2, 'poor', false, 'clinic',
  'none', ARRAY['hindi', 'english', 'tripuri'], ARRAY[10,11,12,1,2,3,4,5], ARRAY[6,7,8,9],
  '{
    "hi": {
      "name": "जंपुई पहाड़ियाँ",
      "tagline": "अनंत वसंत की पहाड़ियाँ, साल-भर ट्रेकिंग",
      "why_special": "914 मीटर पर सर्वोच्च शिखर, शांत जंगल, पक्षी अवलोकन।"
    }
  }',
  'hill-station', 'very-low', true, true, false, 'B', 'none'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  permit_type = EXCLUDED.permit_type;

-- =====================================================
-- TREKS (7 Uttarakhand, 4 Ladakh, 2 Arunachal, 2 Nagaland/Meghalaya, 3 Jharkhand, 2 Chhattisgarh, 1 Tripura = 21 new treks)
-- =====================================================

-- UTTARAKHAND TREKS

-- 1. Gaumukh Tapovan Trek
-- source: https://mappingthehimalayas.com/gangotri-gaumukh-tapovan-trek/
-- source: https://indiahikes.com/gaumukh-tapovan
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'gaumukh-tapovan-trek', 'Gaumukh Tapovan Trek',
  'gangotri', 'hard', 6, 4350, 46,
  ARRAY[5,6,9,10], true, false, 16, 'high',
  'Trek to the source of the Ganga at Gaumukh (4,050m) and extend to Tapovan meadows (4,350m). Passes through Bhojbasa forest camp. One of India''s most sacred high-altitude treks.',
  ARRAY['Gaumukh glacier source', 'Tapovan alpine meadows', 'Nandanvan viewpoint', 'Sacred Ganga origin', 'Forest permit cultural experience'],
  ARRAY['Forest permit mandatory—obtain from Uttarkashi district office', 'Altitude sickness above 3,800m', 'River crossings can swell after rain', 'Weather changes rapidly at pass', 'No rescue access in remote sections'],
  ARRAY['Trekking boots', 'Sleeping bag rated -5C', 'Crampons/microspikes for glacier', 'Water filter', 'Sun protection and gloves'],
  'Uttarkashi', 'Forest permit required from Uttarkashi District Magistrate office; cost ~₹500–800, valid 7 days. Apply 1–2 weeks in advance with ID proof.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 2. Pindari Glacier Trek
-- source: https://himalayanhikers.in/pindari-glacier-trek
-- source: https://trekthehimalayas.com/pindari-glacier-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'pindari-glacier-trek', 'Pindari Glacier Trek',
  'kausani', 'moderate', 8, 3660, 52,
  ARRAY[4,5,6,9,10,11], false, false, 14, 'moderate',
  'Trek through Kumaon Himalayas to Pindari Glacier at 3,660m. Soft-core experience crossing charming villages (Song, Loharkhet, Khati, Dwali) alongside Pindar River. Popular gateway trek.',
  ARRAY['Pindari Glacier viewpoint', 'Roaring Pindar River crossing', 'Kumaon village culture', 'Dhakuri Pass views', 'Khati—last inhabited village'],
  ARRAY['Leeches during monsoon (very heavy June–August)', 'Snow patches possible even in April', 'Altitude sickness above 3,400m', 'Landslides in heavy rain', 'Khati water limited—refill early'],
  ARRAY['Trekking boots', 'Leech socks (monsoon essential)', 'Rain jacket', 'Poles for river crossings', 'Light gloves'],
  'Kausani/Bageshwar', 'No government permit, but check with local tourism office in Kausani for current trail status.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 3. Sunderdhunga Glacier Trek
-- source: https://mountainsthrill.com/nanda-devi-east-base-camp-trek/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'sunderdhunga-glacier-trek', 'Sunderdhunga Glacier Trek',
  'kausani', 'hard', 9, 4000, 60,
  ARRAY[5,6,9,10], false, false, 16, 'high',
  'Less-crowded glacier trek in Kumaon, starting from Bageshwar/Song villages. The glacier itself is remote and less visited than Pindari. High-altitude alpine experience.',
  ARRAY['Untouched glacier', 'Remote alpine meadows', 'Icy blue crevasses', 'Minimal crowds', 'Views of Nanda Devi East'],
  ARRAY['Very remote—rescue options limited', 'Glacier crevasse risk without crampons', 'Snow patches persistent until July', 'Poor water sources above camp', 'Extreme cold at glacier'],
  ARRAY['Trekking boots', 'Crampons/microspikes', 'Sleeping bag -10C rated', 'Rope for glacier safety', 'Ice axe'],
  'Bageshwar', 'No permit required, but arrange guide from Bageshwar—many trekkers skip this route due to remoteness.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 4. Kafni Glacier Trek
-- source: https://mountainsthrill.com/nanda-devi-east-base-camp-trek/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'kafni-glacier-trek', 'Kafni Glacier Trek',
  'kausani', 'hard', 8, 3980, 56,
  ARRAY[5,6,9,10], false, false, 16, 'high',
  'Trek to Kafni Glacier in eastern Kumaon. Starts from Chaukori or Bageshwar. Remote glacial experience with minimal commercialization.',
  ARRAY['Pristine glacier views', 'Remote Kumaon peaks', 'Alpine wildflowers (June–July)', 'Clear night skies', 'Solitude and silence'],
  ARRAY['Extreme remoteness—no rescue', 'Crevasse risk—guide essential', 'Snowmelt river crossings can be dangerous', 'Limited camping water', 'AMS above 3,600m'],
  ARRAY['Trekking boots with gaiters', 'Crampons mandatory', 'Sleeping bag -10C', 'Rope and ice axe', 'Navigation equipment'],
  'Chaukori/Bageshwar', 'No permit, but hire experienced guide from Bageshwar. Trek is rarely done—book 1 month in advance.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 5. Nanda Devi East Base Camp Trek
-- source: https://danuadventure.in/trip/nanda-devi-east-base-camp-trek/
-- source: https://indiahikes.com/documented-trek/nanda-devi-base-camp-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'nanda-devi-east-base-camp', 'Nanda Devi East Base Camp Trek',
  'munsiyari', 'hard', 5, 4750, 16,
  ARRAY[5,6,9,10], true, false, 16, 'high',
  'High-altitude trek to base camp of Nanda Devi East (7,434m). Improved road access reduces trekking distance. Spectacular views of second-highest peak visible from base camp.',
  ARRAY['Nanda Devi East panorama', 'Glacier trekking', 'Panchachuli views', 'Alpine meadows', 'Ganghar base camp'],
  ARRAY['Altitude sickness mandatory risk above 4,500m', 'Glacier crossings require crampons and rope', 'Weather extremely unstable', 'Limited emergency extraction', 'Rockfall danger on moraine'],
  ARRAY['Crampons and ice axe', 'Sleeping bag -15C', 'Rope and harness', 'Trekking boots', 'Sun protection'],
  'Munsiyari', 'Permit required—apply to District Magistrate, Pithoragarh; cost ~₹200–400, valid 10 days. Arrange via trekking operator.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 6. Vasuki Tal Trek
-- source: https://himalayanhikers.in/vasuki-tal-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'vasuki-tal-trek', 'Vasuki Tal Trek',
  'kedarnath', 'moderate', 3, 4135, 16,
  ARRAY[5,6,7,9,10], false, false, 12, 'moderate',
  'Short but scenic trek from Kedarnath temple to Vasuki Tal alpine lake at 4,135m. Accessible daylight trekking with stunning views of Kedar peaks.',
  ARRAY['Alpine lake Vasuki Tal', 'Kedar peak views', 'Rhododendron forests', 'Quick high-altitude experience', 'Temple pilgrimage combined'],
  ARRAY['Rapid altitude gain causes AMS', 'Weather changes suddenly', 'No shelter above camp', 'Water sources limited', 'Trail exposed in sections'],
  ARRAY['Light hiking boots', 'Fleece jacket', 'Hat and gloves', 'Poles for descent', 'Sunscreen'],
  'Kedarnath/Chopta', 'No special permit beyond Kedarnath entry fee. Trek is via forest route—hire local guide from Kedarnath.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 7. Khatling Glacier Trek
-- source: https://mountainsthrill.com/khatling-glacier-trek-uttarakhand/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'khatling-glacier-trek', 'Khatling Glacier Trek',
  'munsiyari', 'hard', 7, 3810, 50,
  ARRAY[5,6,9,10], true, false, 16, 'high',
  'Glacier trek starting from Ghuttu (Tehri Garhwal) or Chopta. Less-known than Gaumukh, more intimate glacier experience. High forest and alpine terrain.',
  ARRAY['Khatling Glacier', 'Dense forest sections', 'Alpine wildflowers', 'Tejam temple en route', 'Minimal tourist presence'],
  ARRAY['Remoteness—limited rescue access', 'Avalanche risk on glacier approach', 'Rockfall common', 'No marked trail—guide essential', 'Poor water quality near glacier terminus'],
  ARRAY['Crampons', 'Ice axe', 'Sleeping bag -10C', 'Gaiters', 'Rope'],
  'Ghuttu/Chopta', 'Forest permit required from Tehri District Forest Office, Ghuttu; cost ~₹500–600. Book guide 2 weeks ahead.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- LADAKH TREKS

-- 8. Phugtal Monastery Trek
-- source: https://taleof2backpackers.com/phugtal-monastery-trek/
-- source: https://chalbanjare.com/faq/phuktal-monastery
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'phugtal-monastery-trek', 'Phugtal Monastery Trek',
  'zanskar', 'moderate', 5, 3850, 40,
  ARRAY[6,7,8,9], false, false, 12, 'moderate',
  'Trek through Lungnak Valley to cave monastery at 3,850m. Honeycomb-shaped gompa built into cliff face, home to 70 Buddhist monks.',
  ARRAY['Phugtal cliff monastery', 'Lungnak Valley trek', 'Remote Buddhist culture', 'Monastery visit and prayers', 'Pristine river walks'],
  ARRAY['River crossings can swell in rain', 'Altitude sickness possible', 'No medical help on trail', 'Monastery etiquette required—no photography in certain areas', 'Loose scree sections'],
  ARRAY['Trekking boots', 'Sleeping bag', 'Water filter', 'Respectful clothing for monastery', 'Sun protection'],
  'Padum/Leh', 'No special trek permit beyond Ladakh Inner Line. Monastery respects prayer times—visit outside 6–8 am and 5–7 pm.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 9. Padum to Lamayuru Traverse
-- source: https://www.ju-lehadventure.com/trekking-ladakh/zanskar-from-stongde-to-phuktal
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'padum-lamayuru-traverse', 'Padum to Lamayuru Traverse',
  'zanskar', 'hard', 9, 4400, 120,
  ARRAY[6,7,8,9], false, false, 16, 'high',
  'Classic Zanskar-to-Ladakh crossing trekking from Padum town to Lamayuru village (or vice versa). Crosses remote passes, river valleys, and alpine plateaus.',
  ARRAY['Desert plateau crossing', 'Zanskar gorge', 'Lingshed village visit', 'Moonland landscape', 'Pure adventure trekking'],
  ARRAY['Extreme remoteness—no rescue', 'River crossings can be dangerous', 'Weather unpredictable', 'Limited water in desert sections', 'Altitude sickness above 4,000m', 'Snow on passes until July'],
  ARRAY['Crampons', 'Trekking boots', 'Sleeping bag -10C', 'Rope', 'Navigation tools'],
  'Padum/Leh', 'No special permit for Indians; foreigners need Inner Line Permit. Trek is untracked in sections—professional guide essential, cost ₹3,000–5,000/day.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 10. Lamayuru to Alchi Trek
-- source: https://en.wikipedia.org/wiki/Lamayuru
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'lamayuru-alchi-trek', 'Lamayuru to Alchi Trek',
  'lamayuru', 'moderate', 3, 3400, 28,
  ARRAY[5,6,7,8,9], false, true, 10, 'moderate',
  'Scenic valley trek connecting two ancient monastery complexes. Passes through villages, prayer flags, and stunning Ladakhi landscapes.',
  ARRAY['Lamayuru Moonland', 'Alchi Monastery murals', 'Prayer flag valleys', 'Desert and green oasis', 'Buddhist cultural sites'],
  ARRAY['Sun exposure—carry sunscreen', 'Altitude (3,000–3,400m) can cause mild AMS', 'Water sources seasonal', 'Some steep descents', 'No shelter mid-trek'],
  ARRAY['Good hiking boots', 'Sun hat and goggles', 'Rain jacket (monsoon)', 'Water bottle', 'Casual backpack 20L'],
  'Lamayuru/Leh', 'No special permit. Trek is marked and frequently trekked—local guesthouses arrange guides for ₹800–1,200/day.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 11. Spituk to Stok Trek
-- source: https://www.indianholiday.com/ladakh/trek-packages/spituk-to-stok-trek.html
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'spituk-stok-trek', 'Spituk to Stok Trek',
  'leh', 'easy', 2, 3250, 16,
  ARRAY[5,6,7,8,9], false, true, 8, 'easy',
  'Short beginner trek from monastery near Leh to alpine Stok Kangri base meadows. Perfect warm-up for Ladakh trekking.',
  ARRAY['Spituk Monastery views', 'Alpine meadow walks', 'Stok Kangri views', 'Easy acclimatization trek', 'Close to Leh'],
  ARRAY['Rapid altitude (from 3,500m start)', 'Sun exposure intense', 'Water limited on ridge', 'Loose scree descent', 'Weather swift changes'],
  ARRAY['Hiking boots', 'Hat and glasses', 'Light rain jacket', 'Water bottle', 'Sunscreen SPF 50+'],
  'Leh (30min away)', 'No special permit. Trek is popular with tourists—easily done as day or overnight trek from Leh hotels.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- ARUNACHAL PRADESH TREKS

-- 12. Tawang to Bumla Pass Trek
-- source: https://www.incredibleindia.gov.in/en/arunachal-pradesh/tawang/bumla-pass/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'tawang-bumla-pass-trek', 'Tawang to Bumla Pass Trek',
  'tawang', 'hard', 2, 4572, 37,
  ARRAY[3,4,5,9,10,11], true, false, 16, 'high',
  'High-altitude trek to India-Myanmar border at Bumla Pass (4,572m). Snowfall possible year-round. Military permits required—restricted route near border.',
  ARRAY['Border pillar', 'Snow-capped landscape', 'Tibet views on clear days', 'Indo-Myanmar border experience', 'Extreme altitude'],
  ARRAY['Altitude sickness extreme', 'Blizzards possible at summit', 'Foreigners not allowed—Indians only', 'Private vehicles banned—use army transport', 'Medical support distant'],
  ARRAY['Insulated trekking boots', 'Down jacket -20C rated', 'Balaclava and goggles', 'Hand/toe warmers', 'Crampons if icy'],
  'Tawang', 'Special permit mandatory—ILP + Bumla Pass permit from Deputy Commissioner office, Tawang. Cost ~₹300–500. Apply via registered tour operator. Foreigners prohibited.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 13. Talle Valley Trek
-- source: https://www.escapetoindia.com/trekking-in-arunachal-pradesh/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'talle-valley-trek', 'Talle Valley Trek',
  'ziro', 'easy', 3, 1800, 24,
  ARRAY[10,11,12,1,2,3,4,5], true, true, 10, 'easy',
  'Pastoral trek through Apatani tribal valleys, rice paddies, and pine forests around Ziro plateau. Interact with Apatani culture and homestays.',
  ARRAY['Apatani village homestays', 'Rice paddy terraces', 'Tribal culture immersion', 'Pine and bamboo forests', 'Quiet pastoral trekking'],
  ARRAY['ILP required for all foreigners', 'Leeches in monsoon (May–September)', 'Mud tracks slippery in rain', 'Limited medical facilities', 'Occasional landslides'],
  ARRAY['Waterproof hiking boots', 'Leech socks', 'Rain jacket', 'Quick-dry pants', 'Respect for tribal customs'],
  'Ziro', 'ILP mandatory for all non-Indians—apply in Delhi or Itanagar office. Cost ~₹200. Indians can trek freely with ID proof.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- NAGALAND / MEGHALAYA TREKS

-- 14. Saramati Peak Trek
-- source: https://thegypsychiring.com/mount-saramati-peak-trek-nagaland/
-- source: https://kiphire.nic.in/tourist-place/mount-saramati/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'saramati-peak-trek', 'Saramati Peak Trek',
  'kiphire', 'hard', 3, 3841, 24,
  ARRAY[9,10,11,12,1,2,3], false, false, 16, 'high',
  'Trek to Nagaland''s highest peak at 3,841m on Indo-Myanmar border. Thanamir village start. Remote, requires rock scramble, minimal trekking infrastructure.',
  ARRAY['Border pillar at summit', 'Highest peak in Nagaland', 'Myanmar views', 'Rock scramble experience', 'Rock wall climbing challenge'],
  ARRAY['50-foot rock scramble—climbing experience needed', 'Extreme remoteness—no rescue', 'Weather unpredictable', 'Limited water on trail', 'Altitude sickness above 3,400m'],
  ARRAY['Rock climbing shoes or boots', 'Harness and rope', 'Helmet', 'Sleeping bag -5C', 'Trekking poles'],
  'Kiphire/Kohima (60km away)', 'No permit required, but guide mandatory from Kiphire—cost ₹2,000–3,000/day. Rock climbing experience highly recommended.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 15. Nokrek Peak Trek
-- source: https://meghalayatourism.gov.in/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'nokrek-peak-trek', 'Nokrek Peak Trek',
  'tura', 'moderate', 2, 1412, 12,
  ARRAY[10,11,12,1,2,3,4], false, true, 12, 'moderate',
  'Trek to Nokrek Peak (1,412m) in UNESCO Nokrek Biosphere Reserve. Forest trail through tropical and subtropical ecosystem with rare flora (Khasi wild orange) and clouded leopards.',
  ARRAY['Biosphere reserve status', 'Rare Khasi wild orange trees', 'Clouded leopard habitat', 'Tropical forest canopy', 'Unique botanical diversity'],
  ARRAY['Leeches May–September', 'Muddy trails in monsoon', 'Slippery descent', 'Limited water access', 'Few signs—hire guide'],
  ARRAY['Waterproof hiking boots', 'Leech socks', 'Rain jacket', 'Long sleeves', 'Water bottle'],
  'Tura (20km away)', 'No special permit. Trek is within UNESCO reserve—guides available from Tura tourism office for ₹600–900/day.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- JHARKHAND TREKS

-- 16. Netarhat Sunrise Trek
-- source: https://www.outlooktraveller.com/destinations/india/a-guide-to-netarhat-jharkhands-secret-hill-station
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'netarhat-sunrise-trek', 'Netarhat Sunrise Trek',
  'netarhat', 'easy', 1, 1128, 6,
  ARRAY[10,11,12,1,2,3,4,5], false, true, 8, 'easy',
  'Early morning trek to Prabhat Vihar (Sunrise Point) at Netarhat. Watch sunrise over Chotanagpur plateau with mist-covered valleys. Pine forest walk.',
  ARRAY['Plateau sunrise views', 'Pine forest canopy', 'Mist-covered valley panorama', 'Single-day trek convenience', 'Quiet morning atmosphere'],
  ARRAY['Steep initial ascent', 'Slippery in moisture/frost', 'Few trail markings', 'Cold early morning', 'Limited water access'],
  ARRAY['Hiking boots', 'Fleece jacket', 'Headlamp/torch', 'Warm hat', 'Water bottle'],
  'Latehar (20km)', 'No permit required. Trek is accessed via Netarhat town—hire local guide from hotels for ₹300–500.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 17. Betla National Park Forest Trail
-- source: https://forest.jharkhand.gov.in/wings_wildlife_protectedarea_betla.aspx
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'betla-national-park-trail', 'Betla National Park Forest Trail',
  'betla', 'moderate', 2, 800, 14,
  ARRAY[10,11,12,1,2,3,4,5], false, true, 10, 'easy',
  'Forest trail trekking within Palamau Tiger Reserve / Betla National Park. Sal and bamboo forest sections, Palamu Fort ruins walk included.',
  ARRAY['Tiger reserve habitat', 'Palamu Fort 3km hike', 'Sal and bamboo forest', 'Elephant spotting chances', 'Remote forest immersion'],
  ARRAY['Tiger risk—never trek alone', 'Leeches May–September', 'No marked trails—guide mandatory', 'Limited water', 'Landslide risk in monsoon'],
  ARRAY['Sturdy hiking boots', 'Long pants (tiger safety)', 'Bell to alert animals', 'Water filter', 'First aid'],
  'Medininagar/Ranchi', 'No trek permit, but National Park entry fee ~₹60–250 depending on vehicle. Guide (mandatory) costs ₹500–800/day.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 18. Dassam Falls Walk
-- source: https://tourism.jharkhand.gov.in/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'dassam-falls-walk', 'Dassam Falls Walk',
  'netarhat', 'easy', 1, 1100, 4,
  ARRAY[6,7,8,9,10,11], false, true, 6, 'easy',
  'Short waterfall walk near Netarhat. Cascading falls into pool at base. Popular spot in monsoon season when water flow is spectacular.',
  ARRAY['Multi-tiered waterfall', 'Monsoon flow power', 'Pool swimming option', 'Forest picnic spot', 'Accessible family walk'],
  ARRAY['Slippery rocks—wear grip shoes', 'Strong currents in monsoon', 'Flash flood risk after heavy rain', 'Unguarded pool edges', 'Sun exposure'],
  ARRAY['Water shoes with grip', 'Towel', 'Quick-dry pants', 'Light rain jacket', 'Water bottle'],
  'Latehar (15km)', 'No permit. Walk is short and well-trodden from Netarhat town—no guide needed. Best visited June–September.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- CHHATTISGARH TREKS

-- 19. Chitrakote Falls and Bastar Tribal Trail
-- source: https://indiatourisminfo.com/chitrakote-waterfall-chhattisgarh/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'chitrakote-bastar-trail', 'Chitrakote Falls & Bastar Tribal Trail',
  'chitrakote-falls', 'easy', 2, 200, 12,
  ARRAY[6,7,8,9,10], false, true, 8, 'easy',
  'Short trek to India''s widest waterfall (299m) on Indravati River. Combined with village walks through Bastar tribal communities (Gond, Maria subgroups).',
  ARRAY['Widest waterfall in India', 'Bastar tribal villages', 'Monsoon spray and mist', 'Indravati River views', 'Local craft and culture'],
  ARRAY['Flash flood risk in monsoon', 'Strong currents at fall base', 'Tribal villages—ask permission for photos', 'Sun exposure on rocks', 'Slippery pool rocks'],
  ARRAY['Water shoes', 'Towel', 'Sun hat', 'Camera permission protocol', 'Water bottle'],
  'Jagdalpur (45km)', 'No trek permit. Walk requires guide for tribal village access (₹400–600/day). Best June–October when water flow peaks.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- 20. Bhoramdeo Temple Trek
-- source: https://kawardha.gov.in/en/tourist-place/bhoramdev-templekawardha/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'bhoramdeo-temple-trek', 'Bhoramdeo Temple Trek',
  'bhoramdeo', 'easy', 1, 400, 6,
  ARRAY[10,11,12,1,2,3,4], false, true, 8, 'easy',
  'Trek through Maikal Hills forest to 11th-century Bhoramdeo (Khajuraho of Chhattisgarh) temple. Erotic sculptures and Gurur architectural style.',
  ARRAY['11th-century temple', 'Erotic sculpture details', 'Maikal forest setting', 'Archaeological significance', 'Quiet spiritual site'],
  ARRAY['Trail overgrown in monsoon', 'Limited signage—hire guide', 'Temple upkeep varies', 'Few services nearby', 'Sun exposure on approach'],
  ARRAY['Hiking boots', 'Hat', 'Camera for architecture', 'Water bottle', 'Respect dress code'],
  'Kawardha (20km)', 'No trek permit. Temple is accessible via guided forest trail from Kawardha town (guide ₹300–500/day). Best Oct–Mar.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- TRIPURA TREK

-- 21. Jampui Hills Trek
-- source: https://northtripura.nic.in/tourist-place/jampui-hills/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level, description,
  highlights, warnings, gear_essentials, nearest_hospital, permit_details
) VALUES (
  'jampui-hills-trek', 'Jampui Hills Trek',
  'jampui-hills', 'easy', 1, 914, 8,
  ARRAY[10,11,12,1,2,3,4,5], false, true, 8, 'easy',
  'Year-round trekking in Tripura''s highest hill range. Betlingchhip peak at 914m. Dense forests, bird-watching, quiet nature immersion.',
  ARRAY['Betlingchhip summit', 'Dense green forest canopy', 'Year-round spring climate', 'Bird-watching opportunities', 'Peaceful solitude'],
  ARRAY['Heavy monsoon (May–September) makes roads dangerous', 'Leeches in wet season', 'Trail sparse markings', 'Limited facilities', 'Mobile network patchy'],
  ARRAY['Hiking boots', 'Leech socks (if monsoon)', 'Rain jacket', 'Binoculars for birds', 'Water bottle'],
  'Kailashahar (40km)', 'No trek permit required. Best done with local guide from Kailashahar (₹400–600/day). October–April optimal.'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, distance_km = EXCLUDED.distance_km;

-- =====================================================
-- POINTS OF INTEREST (2–3 per new destination, where relevant)
-- =====================================================

-- Gangotri POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'gangotri-main-temple', 'gangotri', 'Gangotri Main Temple', 'temple',
    'Sacred temple at 3,100m marking the source of the Ganga River. Steep stone steps lead up to the inner sanctum.',
    ST_SetSRID(ST_MakePoint(79.0167, 30.9167), 4326)::geography,
    'Gangotri town center', '5:00 AM - 8:00 PM', 'free', '1 hour',
    false,
    '{"hi": {"name": "गंगोत्री मुख्य मंदिर", "description": "गंगा नदी के स्रोत को चिह्नित करने वाला पवित्र मंदिर।"}}'
  ),
  (
    'gangotri-glacier-trail', 'gangotri', 'Bhojbasa Forest Camp', 'viewpoint',
    'Forest camp at 3,780m between Gangotri and Gaumukh. Popular overnight halt on the trek with basic dhabas.',
    ST_SetSRID(ST_MakePoint(79.0533, 30.9267), 4326)::geography,
    'Gangotri Valley, 14km from town', 'always open', 'free', '4-5 hours trek',
    false,
    '{"hi": {"name": "भोजबास फॉरेस्ट कैंप", "description": "गंगोत्री और गौमुख के बीच की वन कैंप।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Tawang POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'tawang-monastery', 'tawang', 'Tawang Monastery', 'monastery',
    'Second-largest Buddhist monastery in Asia at 3,048m. Founded 1680, home to 400+ monks. Golden roofs, prayer halls, and panoramic views.',
    ST_SetSRID(ST_MakePoint(91.5833, 27.5833), 4326)::geography,
    'Tawang town center', '6:00 AM - 4:00 PM', '₹50 (Indian), ₹250 (foreigner)', '2-3 hours',
    true,
    '{"hi": {"name": "तवांग मठ", "description": "एशिया का दूसरा सबसे बड़ा बौद्ध मठ, 400+ भिक्षुओं का घर।"}}'
  ),
  (
    'tawang-alpine-meadows', 'tawang', 'Alpine Meadows & Prayer Flags', 'viewpoint',
    'Open meadows at 2,800–3,000m with prayer flags and panoramic views of eastern Himalayas.',
    ST_SetSRID(ST_MakePoint(91.5, 27.55), 4326)::geography,
    'Tawang outskirts, 3–5km walks from town', 'always open', 'free', '1-2 hours',
    true,
    '{"hi": {"name": "अल्पाइन घास के मैदान", "description": "प्रार्थना झंडों और हिमालय के दृश्यों के साथ।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Ziro POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'ziro-apatani-villages', 'ziro', 'Apatani Tribal Villages', 'museum',
    'Traditional Apatani settlements with distinctive bamboo houses on stilts. Rice paddies surround villages. Women wear traditional beaded ear rings and bamboo tatoos.',
    ST_SetSRID(ST_MakePoint(93.8333, 27.8167), 4326)::geography,
    'Ziro plateau villages', 'always open', 'free (ask permission for photos)', '2-3 hours',
    true,
    '{"hi": {"name": "अपतानी जनजातीय गांव", "description": "परंपरागत बांस के घर और चावल की खेती।"}}'
  ),
  (
    'ziro-pine-forest', 'ziro', 'Pine Forest Canopy Walk', 'garden',
    'Dense pine and rhododendron forest walks. Bird-watching spot. Paths through sacred groves.',
    ST_SetSRID(ST_MakePoint(93.85, 27.82), 4326)::geography,
    'Ziro outskirts', 'always open', 'free', '1-2 hours',
    true,
    '{"hi": {"name": "पाइन जंगल", "description": "घने जंगल, पक्षी अवलोकन के लिए आदर्श।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Kiphire POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'kiphire-saramati-base', 'kiphire', 'Thanamir Village & Saramati Base', 'viewpoint',
    'Small village at base of Saramati Peak. Last supply point before trek. Local homestays and guides available.',
    ST_SetSRID(ST_MakePoint(94.2667, 26.0), 4326)::geography,
    'Thanamir village, Kiphire district', 'always open', 'free', '2-3 hours',
    false,
    '{"hi": {"name": "थानामीर गांव", "description": "सरमाती पीक ट्रेक का प्रवेश द्वार।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Tura POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'tura-nokrek-biosphere', 'tura', 'Nokrek Biosphere Reserve Visitor Centre', 'garden',
    'UNESCO-recognized biosphere reserve. Home to rare Khasi wild orange trees and clouded leopards. Visitor information and guide services.',
    ST_SetSRID(ST_MakePoint(90.2333, 25.5167), 4326)::geography,
    'Tura, Garo Hills', '9:00 AM - 4:00 PM', '₹50 entry fee', '1-2 hours',
    true,
    '{"hi": {"name": "नोक्रेक बायोस्फीयर रिजर्व", "description": "दुर्लभ पौधे और वन्यजीव।"}}'
  ),
  (
    'tura-tribal-market', 'tura', 'Tura Weekly Market', 'museum',
    'Vibrant tribal market every Sunday. Garo crafts, local produce, betel leaf, and traditional wear.',
    ST_SetSRID(ST_MakePoint(90.24, 25.515), 4326)::geography,
    'Tura town center', 'Sunday 6:00 AM - 2:00 PM', 'free to browse', '1-2 hours',
    true,
    '{"hi": {"name": "तुरा साप्ताहिक बाजार", "description": "गारो हस्तशिल्प और स्थानीय उत्पाद।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Netarhat POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'netarhat-sunrise-point', 'netarhat', 'Prabhat Vihar (Sunrise Point)', 'viewpoint',
    'Best sunrise viewpoint in Netarhat at 1,128m. Watch mist clear from Chotanagpur plateau at dawn.',
    ST_SetSRID(ST_MakePoint(84.3667, 23.8333), 4326)::geography,
    'Netarhat town center', '4:30 AM - 8:00 AM peak times', 'free', '1 hour',
    true,
    '{"hi": {"name": "प्रभात विहार", "description": "नेतरहाट में सबसे अच्छा सूर्योदय बिंदु।"}}'
  ),
  (
    'netarhat-upper-ghaghri-falls', 'netarhat', 'Upper Ghaghri Falls', 'waterfall',
    'Cascading waterfall 4km from Netarhat. Swimming pool at base. Monsoon surge impressive.',
    ST_SetSRID(ST_MakePoint(84.35, 23.82), 4326)::geography,
    'Netarhat outskirts, 4km away', 'always open', 'free', '1-2 hours',
    true,
    '{"hi": {"name": "ऊपरी घाघरी जलप्रपात", "description": "मानसून में प्रभावशाली, तैराकी के लिए पूल।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Betla POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'betla-palamu-fort', 'betla', 'Palamu Fort Ruins', 'monument',
    '3km forest trail to abandoned Mughal-era fort ruins. Wildlife spotting en route.',
    ST_SetSRID(ST_MakePoint(84.19, 23.89), 4326)::geography,
    'Betla National Park entrance', 'viewpoint', '₹250 (park entry)', '2-3 hours',
    true,
    '{"hi": {"name": "पालामू किला खंडहर", "description": "3 किमी वन ट्रेक, मुगल-युग का किला।"}}'
  ),
  (
    'betla-tiger-reserve', 'betla', 'Palamau Tiger Reserve Visitor Centre', 'museum',
    'Visitor information, forest guides, and safari bookings. Tiger spotting probability highest Nov–Mar.',
    ST_SetSRID(ST_MakePoint(84.1901, 23.8878), 4326)::geography,
    'Betla village, park entrance', '9:00 AM - 4:00 PM', '₹60-250 (by vehicle)', '1 hour info',
    true,
    '{"hi": {"name": "पालामू टाइगर रिजर्व", "description": "वन्यजीव सफारी और गाइड सेवा।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Chitrakote POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'chitrakote-falls-viewpoint', 'chitrakote-falls', 'Chitrakote Falls Main Viewpoint', 'waterfall',
    'Best vantage for the 299m-wide waterfall. Monsoon spray and mist create rainbows. Picnic-friendly platform.',
    ST_SetSRID(ST_MakePoint(82.0833, 20.3333), 4326)::geography,
    'Chitrakote village', '6:00 AM - 6:00 PM', '₹100 vehicle entry', '1-2 hours',
    true,
    '{"hi": {"name": "चित्रकोट जलप्रपात दृश्य", "description": "299 मीटर चौड़ा, मानसून में सबसे भव्य।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Bhoramdeo POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'bhoramdeo-main-temple', 'bhoramdeo', 'Bhoramdeo Main Temple', 'temple',
    '11th-century Shiva temple in Maikal Hills. Intricate erotic sculptures and Gurur-style architecture.',
    ST_SetSRID(ST_MakePoint(81.9667, 21.6333), 4326)::geography,
    'Bhoramdeo village, 18km from Kawardha', '6:00 AM - 6:00 PM', 'free', '1-2 hours',
    false,
    '{"hi": {"name": "भोरमदेव मंदिर", "description": "11वीं शताब्दी का शिव मंदिर, कामोत्तेजक मूर्तिकला।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Jampui POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, address, opening_hours, entry_fee, time_needed,
  kids_suitable, translations
) VALUES
  (
    'jampui-betlingchhip-peak', 'jampui-hills', 'Betlingchhip Peak (Highest)', 'viewpoint',
    'Highest point of Jampui Hills at 914m. 360° views of North Tripura plateau and valleys. Year-round clear views.',
    ST_SetSRID(ST_MakePoint(91.5833, 24.0167), 4326)::geography,
    'Jampui Hills summit', 'always open', 'free', '2-3 hours trek',
    true,
    '{"hi": {"name": "बेतलिंगछिप पीक", "description": "914 मीटर, साल-भर साफ दृश्य।"}}'
  ),
  (
    'jampui-forest-canopy', 'jampui-hills', 'Forest Trails & Bird-Watching', 'garden',
    'Dense forest with wild orchids and rhododendrons. Bird-watching hotspot, over 100 species recorded.',
    ST_SetSRID(ST_MakePoint(91.59, 24.02), 4326)::geography,
    'Jampui forest trails', 'always open', 'free', '1-2 hours',
    true,
    '{"hi": {"name": "वन ट्रेल और पक्षी अवलोकन", "description": "100+ पक्षी प्रजातियाँ, जंगली ऑर्किड।"}}'
  )
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- =====================================================
-- SQL COMPLETE
-- =====================================================
