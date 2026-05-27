-- =====================================================
-- Agent B: South India pilgrim hikes + Shikharji
-- Generated: 2026-05-27
-- All rows are ON CONFLICT (id) DO UPDATE — idempotent
-- =====================================================
-- source: https://www.keralatourism.org/sabarimala
-- source: https://en.wikipedia.org/wiki/Sabarimala
-- source: https://www.tirumala.org/
-- source: https://en.wikipedia.org/wiki/Tirumala
-- source: https://en.wikipedia.org/wiki/Palani
-- source: https://en.wikipedia.org/wiki/Six_Abodes_of_Murugan
-- source: https://en.wikipedia.org/wiki/Shikharji
-- source: https://en.wikipedia.org/wiki/Tiruchendur

-- =====================================================
-- DESTINATIONS (5 new)
-- =====================================================

-- Sabarimala, Kerala — pilgrimage to Ayyappa temple
INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'sabarimala',
  'Sabarimala',
  'kerala',
  'Lord Ayyappa''s sacred shrine on a misty peak',
  'One of the world''s largest annual pilgrimages. The Sannidhanam temple sits at 914m on the Western Ghats, accessible via a demanding trek from Pamba. Strict 41-day pre-pilgrimage ritual required.',
  ST_SetSRID(ST_MakePoint(77.4667, 9.6500), 4326)::geography,
  914,
  ARRAY['temple','pilgrimage','trek'],
  ARRAY['spiritual','remote'],
  'moderate',
  'Pathanamthitta',
  'Cochin',
  'none',
  ARRAY['malayalam','tamil','hindi','english'],
  ARRAY[11,12,1,2],
  ARRAY[5,6],
  '{
    "hi": {
      "name": "सबरिमला",
      "tagline": "अयप्पा देव का पवित्र मंदिर बादलों के बीच",
      "why_special": "विश्व का सबसे बड़ा वार्षिक तीर्थ स्थल। पश्चिमी घाट पर 914 मीटर की ऊंचाई पर स्थित संन्निधानम मंदिर, पंबा से चुनौतीपूर्ण ट्रेक के माध्यम से सुलभ। तीर्थ से पहले 41 दिन की कठोर तपस्या अनिवार्य।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  elevation_m = EXCLUDED.elevation_m,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  difficulty = EXCLUDED.difficulty,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

-- Tirumala, Andhra Pradesh — Venkateswara pilgrimage
INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'tirumala',
  'Tirumala',
  'andhra-pradesh',
  'The world''s most visited temple atop Seshachalam Hills',
  'Sri Venkateswara Temple draws millions annually. Sits at 976m in the Eastern Ghats. Two paved trekking routes from Tirupati: Alipiri Mettu (3,550 steps, 11km) and shorter Srivari Mettu (2,388 steps, 2.1km). Darshan queues are long but free meals and stays available.',
  ST_SetSRID(ST_MakePoint(79.1408, 13.1849), 4326)::geography,
  976,
  ARRAY['temple','pilgrimage','trek'],
  ARRAY['spiritual','visited'],
  'easy',
  'Tirupati',
  'Tirupati',
  'none',
  ARRAY['telugu','hindi','tamil','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[5,6],
  '{
    "hi": {
      "name": "तिरुमला",
      "tagline": "विश्व का सबसे अधिक दर्शन किया जाने वाला मंदिर शेषाचलम पहाड़ियों पर",
      "why_special": "श्री वेंकटेश्वर मंदिर को लाखों साल में आते हैं। पूर्वी घाट में 976 मीटर की ऊंचाई पर स्थित। तिरुपति से दो पक्की ट्रेकिंग मार्ग: अलीपीरी मेट्टु (3,550 सीढ़ियां, 11 किमी) और छोटी श्रीवारी मेट्टु (2,388 सीढ़ियां, 2.1 किमी)। दर्शन कतारें लंबी हैं लेकिन मुफ्त भोजन और ठहरने की सुविधा है।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  elevation_m = EXCLUDED.elevation_m,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

-- Palani, Tamil Nadu — Murugan''s hermit shrine on a hill
INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'palani',
  'Palani',
  'tamil-nadu',
  'Sacred hilltop where Murugan meditated as an ascetic',
  'Dandayuthapani Swamy temple sits at 1,500 feet (450m) within the Palani Hills. 670 steps lead to the peak, though rope car and rail options exist. Draws over 7 million annual pilgrims. The deity''s idol is said to be made of nine sacred herbs.',
  ST_SetSRID(ST_MakePoint(77.4500, 10.2500), 4326)::geography,
  450,
  ARRAY['temple','pilgrimage','trek'],
  ARRAY['spiritual','accessible'],
  'easy',
  'Palani',
  'Madurai',
  'none',
  ARRAY['tamil','hindi','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[5,6],
  '{
    "hi": {
      "name": "पलानी",
      "tagline": "पवित्र पहाड़ी जहां मुरुगन तपस्वी के रूप में ध्यान करते थे",
      "why_special": "पलानी पहाड़ियों के भीतर 450 मीटर की ऊंचाई पर स्थित डंडायुधापनी स्वामी मंदिर। शिखर तक 670 सीढ़ियां, हालांकि रोपवे और रेल विकल्प भी हैं। सालाना 7 मिलियन से अधिक तीर्थ यात्री आते हैं। देवता की मूर्ति को नौ पवित्र जड़ी-बूटियों से बना माना जाता है।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  elevation_m = EXCLUDED.elevation_m,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  difficulty = EXCLUDED.difficulty,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

-- Shikharji, Jharkhand — Jain moksha site, highest peak in Jharkhand
INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'shikharji',
  'Shikharji',
  'jharkhand',
  'The holiest Jain site where 20 Tirthankaras attained moksha',
  'Sammed Shikharji atop Parasnath Hill (1,365m) is Jharkhand''s highest peak. The Jain pilgrimage combines a 27km parikrama (sacred circuit) or 9km direct climb to the temple complex. Madhuban village at the base offers dharamshalas and simple stays. Pilgrims walk on paved concrete tracks.',
  ST_SetSRID(ST_MakePoint(86.1371, 23.9611), 4326)::geography,
  1365,
  ARRAY['temple','pilgrimage','jain-site','trek'],
  ARRAY['spiritual','remote'],
  'moderate',
  'Parasnath',
  'Ranchi',
  'none',
  ARRAY['hindi','santali','bengali','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[6,7,8,9],
  '{
    "hi": {
      "name": "शिखरजी",
      "tagline": "सबसे पवित्र जैन स्थल जहां 20 तीर्थंकरों ने मोक्ष प्राप्त किया",
      "why_special": "परसनाथ पहाड़ी (1,365 मीटर) पर स्थित समेत शिखरजी झारखंड की सबसे ऊंची चोटी है। जैन तीर्थ यात्रा 27 किमी परिक्रमा (पवित्र परिक्रमा) या 9 किमी की सीधी चढ़ाई को जोड़ती है। आधार पर मधुबन गांव धर्मशालाएं और सरल ठहरने की सुविधा प्रदान करता है।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  elevation_m = EXCLUDED.elevation_m,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  difficulty = EXCLUDED.difficulty,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

-- The remaining 4 Arupadai Veedu temples (minimal but real)

INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'tiruchendur',
  'Tiruchendur',
  'tamil-nadu',
  'Murugan''s coastal shrine where he vanquished the demon Surapadman',
  'One of the Six Abodes of Murugan. The Arulmigu Subramaniya Swamy Temple sits on the Gulf of Mannar coast with a 42m seven-tier gopuram. Devotees believe Murugan defeated the demon here and performed a victory dance.',
  ST_SetSRID(ST_MakePoint(78.1201, 8.4900), 4326)::geography,
  NULL,
  ARRAY['temple','pilgrimage','coastal'],
  ARRAY['spiritual','coastal'],
  'easy',
  'Tirunelveli',
  'Madurai',
  'none',
  ARRAY['tamil','hindi','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[6,7],
  '{
    "hi": {
      "name": "तिरुचेंदुर",
      "tagline": "मुरुगन का तटीय मंदिर जहां उन्होंने राक्षस सुरपद्मन को पराजित किया",
      "why_special": "मुरुगन के छह आवास में से एक। अरुलमिगु सुब्रह्मण्य स्वामी मंदिर मन्नार की खाड़ी के तट पर 42 मीटर ऊंचे सात स्तरीय गोपुरम के साथ स्थित है।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'swamimalai',
  'Swamimalai',
  'tamil-nadu',
  'Where Murugan taught the Om mantra to his father Shiva',
  'One of the Six Abodes of Murugan, located on the banks of a Kaveri tributary near Kumbakonam. The temple commemorates the moment Murugan explained the sacred Om to Shiva, teaching the father through his divine wisdom.',
  ST_SetSRID(ST_MakePoint(79.4167, 10.9667), 4326)::geography,
  NULL,
  ARRAY['temple','pilgrimage'],
  ARRAY['spiritual'],
  'easy',
  'Kumbakonam',
  'Trichy',
  'none',
  ARRAY['tamil','hindi','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[6,7],
  '{
    "hi": {
      "name": "स्वामिमलै",
      "tagline": "जहां मुरुगन ने अपने पिता शिव को ओम मंत्र सिखाया",
      "why_special": "मुरुगन के छह आवास में से एक, कुंभकोणम के पास कावेरी की एक सहायक नदी के किनारे स्थित। मंदिर उस क्षण को चिन्हित करता है जब मुरुगन ने शिव को पवित्र ओम समझाया।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'pazhamudircholai',
  'Pazhamudircholai',
  'tamil-nadu',
  'Murugan''s shrine with both consorts Deivanai and Valli',
  'One of the Six Abodes of Murugan, nestled in the Alagar Hills near Melur in Madurai district. The temple depicts Murugan with his two wives, representing the balance of Shiva and Shakti energies.',
  ST_SetSRID(ST_MakePoint(78.3402, 10.0306), 4326)::geography,
  NULL,
  ARRAY['temple','pilgrimage','hills'],
  ARRAY['spiritual'],
  'easy',
  'Madurai',
  'Madurai',
  'none',
  ARRAY['tamil','hindi','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[6,7],
  '{
    "hi": {
      "name": "पझमुदिरचोलै",
      "tagline": "मुरुगन का मंदिर जहां दैवानाई और वल्ली दोनों पत्नियां विराजमान हैं",
      "why_special": "मुरुगन के छह आवास में से एक, मदुरै जिले में मेलूर के पास अलगर पहाड़ियों में स्थित। मंदिर मुरुगन को अपनी दो पत्नियों के साथ चित्रित करता है।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'tiruparankundram',
  'Tiruparankundram',
  'tamil-nadu',
  'Murugan''s hilltop temple where he married Deivanai',
  'The first of the Six Abodes of Murugan, located on a hillock in Madurai district. The shrine marks the moment Murugan married the daughter of Indra, the king of gods, establishing his role as a householder.',
  ST_SetSRID(ST_MakePoint(78.0700, 9.8700), 4326)::geography,
  NULL,
  ARRAY['temple','pilgrimage','hills'],
  ARRAY['spiritual'],
  'easy',
  'Madurai',
  'Madurai',
  'none',
  ARRAY['tamil','hindi','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[6,7],
  '{
    "hi": {
      "name": "तिरुपरणकुंद्रम",
      "tagline": "मुरुगन का मंदिर जहां उन्होंने देवानाई से विवाह किया",
      "why_special": "मुरुगन के छह आवास में से पहला, मदुरै जिले में एक पहाड़ी पर स्थित। मंदिर उस क्षण को चिन्हित करता है जब मुरुगन ने इंद्र की बेटी से विवाह किया।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

INSERT INTO destinations (
  id, name, state_id, tagline, why_special, coords, elevation_m,
  type, vibe, difficulty, nearest_railhead, nearest_airport,
  permit_type, languages_spoken, best_months, avoid_months,
  translations
) VALUES (
  'tiruttani',
  'Tiruttani',
  'tamil-nadu',
  'Hilltop temple where Murugan regained inner peace',
  'One of the Six Abodes of Murugan, located atop a hill 87km north of Chennai. The 365 steps represent the 365 days of the year. The temple marks where Murugan found inner tranquility and married his second consort Valli.',
  ST_SetSRID(ST_MakePoint(79.6300, 13.1800), 4326)::geography,
  NULL,
  ARRAY['temple','pilgrimage','hills'],
  ARRAY['spiritual'],
  'easy',
  'Thiruvallur',
  'Chennai',
  'none',
  ARRAY['tamil','hindi','english'],
  ARRAY[10,11,12,1,2,3],
  ARRAY[6,7],
  '{
    "hi": {
      "name": "तिरुत्तणि",
      "tagline": "पहाड़ी मंदिर जहां मुरुगन ने आंतरिक शांति प्राप्त की",
      "why_special": "मुरुगन के छह आवास में से एक, चेन्नई से 87 किमी उत्तर में एक पहाड़ी पर स्थित। 365 सीढ़ियां साल के 365 दिनों का प्रतिनिधित्व करती हैं।"
    }
  }'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  why_special = EXCLUDED.why_special,
  coords = EXCLUDED.coords,
  type = EXCLUDED.type,
  vibe = EXCLUDED.vibe,
  best_months = EXCLUDED.best_months,
  avoid_months = EXCLUDED.avoid_months,
  translations = EXCLUDED.translations;

-- =====================================================
-- TREKS (5 total)
-- =====================================================

-- Sabarimala: Pamba to Sannidhanam
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m,
  distance_km, best_months, permits_required, kids_suitable, min_age,
  fitness_level, description, highlights, warnings, source_url
) VALUES (
  'sabarimala-pamba',
  'Pamba to Sannidhanam Trek',
  'sabarimala',
  'moderate',
  1,
  914,
  8,
  ARRAY[11,12,1,2],
  false,
  false,
  18,
  'high',
  'The pilgrim route from Pamba (485m) to Sannidhanam (914m). Crosses forested terrain and river valleys in the Periyar Tiger Reserve buffer. Steep climbs with brief views of cardamom plantations.',
  ARRAY[
    'Pamba ghats – ritual bathing point before ascent',
    'Dense Western Ghats forest canopy',
    'Alpine grasslands near the peak',
    'Sannidhanam temple complex at summit'
  ],
  ARRAY[
    'Requires 41-day pre-pilgrimage ritual purification (Mandala Vrat)',
    'Steep terrain; acclimatisation needed at altitude',
    'Monsoon (May-Oct) closes the route completely',
    'Cramped shelters; book accommodation well ahead',
    'Porters available but arrange independently'
  ],
  'https://www.keralatourism.org/sabarimala'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  destination_id = EXCLUDED.destination_id,
  difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days,
  max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km,
  best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required,
  kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age,
  fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings;

-- Tirumala: Alipiri Mettu (longer route)
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m,
  distance_km, best_months, permits_required, kids_suitable, min_age,
  fitness_level, description, highlights, warnings, source_url
) VALUES (
  'tirumala-alipiri',
  'Alipiri Mettu Steps Trek',
  'tirumala',
  'easy',
  1,
  976,
  11,
  ARRAY[10,11,12,1,2,3],
  false,
  true,
  NULL,
  'medium',
  'Paved pilgrimage route with 3,550 roofed steps from Tirupati to Tirumala. Fully sheltered, passing through the Seshachalam Hills. Steady uphill with rest points and water stations every km.',
  ARRAY[
    '3,550 concrete steps fully roofed for shade',
    'Seven hill passes with views of Tirupati plains',
    'Water and rest stations maintained by TTD',
    'Arrives at Sri Venkateswara Temple complex'
  ],
  ARRAY[
    'Summer heat (Apr-May) is intense; start early morning',
    'Crowded, especially weekends and festivals',
    'Take 3–4 hours; dehydration risk on hot days',
    'Final descent back to Tirupati adds 2–3 hours'
  ],
  'https://www.tirumala.org/'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  destination_id = EXCLUDED.destination_id,
  difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days,
  max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km,
  best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required,
  kids_suitable = EXCLUDED.kids_suitable,
  fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings;

-- Tirumala: Srivari Mettu (shorter route)
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m,
  distance_km, best_months, permits_required, kids_suitable, min_age,
  fitness_level, description, highlights, warnings, source_url
) VALUES (
  'tirumala-srivari',
  'Srivari Mettu Steps Trek',
  'tirumala',
  'easy',
  1,
  976,
  2.1,
  ARRAY[10,11,12,1,2,3],
  false,
  true,
  NULL,
  'low',
  'Shorter pilgrim route with 2,388 roofed steps from Tirupati to Tirumala. Steep but direct; fully sheltered. Accessible to families and those with moderate fitness.',
  ARRAY[
    '2,388 steps, steeper gradient than Alipiri',
    'Fully roofed passage through forest',
    'Reaches temple faster than Alipiri route',
    'Water points every 500m'
  ],
  ARRAY[
    '1–1.5 hours at brisk pace; allow 2 hours for rest',
    'Steep sections; take your time to avoid injury',
    'Less crowded than Alipiri, good for families',
    'Hot midday; avoid noon climbs'
  ],
  'https://www.tirupatihelps.com/alipiri-mettu-and-srivari-mettu-distance-steps-timings-tirupati/'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  destination_id = EXCLUDED.destination_id,
  difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days,
  max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km,
  best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required,
  kids_suitable = EXCLUDED.kids_suitable,
  fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings;

-- Palani: 670-step climb to Dandayuthapani
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m,
  distance_km, best_months, permits_required, kids_suitable, min_age,
  fitness_level, description, highlights, warnings, source_url
) VALUES (
  'palani-steps',
  'Palani Dandayuthapani Peak Climb',
  'palani',
  'easy',
  1,
  450,
  1,
  ARRAY[10,11,12,1,2,3],
  false,
  true,
  NULL,
  'low',
  'Scenic 670-step climb through wooded hillside to the Dandayuthapani Swamy temple. Carved rock steps with occasional water sources. Rope car and rail are alternatives for those unable to climb.',
  ARRAY[
    '670 sacred steps through forest canopy',
    'Glimpses of Palani Hills and surrounding town',
    'Reach the hilltop temple sanctuary',
    'Panoramic valley views from summit'
  ],
  ARRAY[
    'Steady uphill; takes 45–60 minutes',
    'Hot afternoons; start early morning for coolness',
    'Occasional loose stones on steps',
    'Rope car and train available as alternatives'
  ],
  'https://en.wikipedia.org/wiki/Palani'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  destination_id = EXCLUDED.destination_id,
  difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days,
  max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km,
  best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required,
  kids_suitable = EXCLUDED.kids_suitable,
  fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings;

-- Shikharji: Sacred Parikrama circuit
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m,
  distance_km, best_months, permits_required, kids_suitable, min_age,
  fitness_level, description, highlights, warnings, source_url
) VALUES (
  'shikharji-parikrama',
  'Shikharji Parikrama (Sacred Circuit)',
  'shikharji',
  'hard',
  1,
  1365,
  27,
  ARRAY[10,11,12,1,2,3],
  false,
  false,
  18,
  'very-high',
  'The full 27km circumambulation of Sammed Shikharji on Parasnath Hill. Paved concrete path through Madhuban forest. Pilgrims loop around the entire peak to pay respects at 20 Tirthankara reliquaries where moksha was attained.',
  ARRAY[
    'Starts and ends at Madhuban base sanctuary',
    'Passes 20 Tirthankara shrines along the route',
    'Forest canopy through pristine sal trees',
    'Sunset views from higher elevations'
  ],
  ARRAY[
    'Takes 12–16 hours; full day commitment required',
    'Minimal water sources; carry 2L minimum',
    'Monsoon (Jun-Sep) makes route muddy; avoid',
    'Acclimatisation needed at 1,365m elevation',
    'Porters (doliwallahs) available for elderly/disabled pilgrims'
  ],
  'https://en.wikipedia.org/wiki/Shikharji'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  destination_id = EXCLUDED.destination_id,
  difficulty = EXCLUDED.difficulty,
  duration_days = EXCLUDED.duration_days,
  max_altitude_m = EXCLUDED.max_altitude_m,
  distance_km = EXCLUDED.distance_km,
  best_months = EXCLUDED.best_months,
  permits_required = EXCLUDED.permits_required,
  kids_suitable = EXCLUDED.kids_suitable,
  min_age = EXCLUDED.min_age,
  fitness_level = EXCLUDED.fitness_level,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  warnings = EXCLUDED.warnings;

-- =====================================================
-- POINTS OF INTEREST (10 total)
-- =====================================================

-- Sabarimala POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'sabarimala-sannidhanam',
  'sabarimala',
  'Sannidhanam Temple Complex',
  'temple',
  'The main Ayyappa shrine at 914m peak. The sanctum sanctorum houses the deity''s idol. The vast open courtyard can hold thousands of pilgrims during season.',
  ST_SetSRID(ST_MakePoint(77.4667, 9.6500), 4326)::geography,
  'Free (donations accepted)',
  '1-2 hours',
  ARRAY['darshan','pilgrimage','main-shrine'],
  true,
  '{"hi": {"name": "संन्निधानम मंदिर परिसर", "description": "914 मीटर की चोटी पर मुख्य अयप्पा मंदिर। पवित्र गर्भगृह देवता की मूर्ति को धारण करता है।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'sabarimala-pamba',
  'sabarimala',
  'Pamba Ghats',
  'ghat',
  'Sacred bathing point where pilgrims purify before the trek. Confluence of Pamba, Achankovil, and Manimala rivers. Simple guest houses and the start of the trekking trail.',
  ST_SetSRID(ST_MakePoint(77.3333, 9.5833), 4326)::geography,
  'Free',
  '30 minutes',
  ARRAY['ritual','pilgrimage','water'],
  true,
  '{"hi": {"name": "पंबा घाट", "description": "पवित्र स्नान स्थल जहां तीर्थ यात्री ट्रेक से पहले शुद्ध होते हैं।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'sabarimala-erumeli',
  'sabarimala',
  'Erumeli Petta Thullal',
  'temple',
  'Starting point for the traditional 60km route to Sabarimala. Pilgrims gather here for the longer, austere Mala-clad (celibate) pilgrimage. Less common than Pamba but spiritually significant.',
  ST_SetSRID(ST_MakePoint(77.2500, 9.6667), 4326)::geography,
  'Free',
  '30 minutes',
  ARRAY['ritual','pilgrimage','traditional'],
  true,
  '{"hi": {"name": "एरुमेली पेट्ता थुल्लल", "description": "सबरिमला के लिए पारंपरिक 60 किमी मार्ग का शुरुआती बिंदु।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

-- Tirumala POIs
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'tirumala-venkateswara',
  'tirumala',
  'Sri Venkateswara Temple',
  'temple',
  'The main shrine dedicated to Vishnu (Venkateswara). Famous for the Tirupati Laddu (sweet offering). Darshan queues are long; free meals (annadanam) provided by TTD.',
  ST_SetSRID(ST_MakePoint(79.1408, 13.1849), 4326)::geography,
  'Free (donations)',
  '2-4 hours (queue-dependent)',
  ARRAY['darshan','main-shrine','pilgrimage'],
  true,
  '{"hi": {"name": "श्री वेंकटेश्वर मंदिर", "description": "विष्णु को समर्पित मुख्य मंदिर। तिरुपति लड्डु के लिए प्रसिद्ध।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'tirumala-akasaganga',
  'tirumala',
  'Akasaganga Waterfall',
  'waterfall',
  'Natural spring on the hill generating a small cascade. Considered sacred by pilgrims. Cool, shaded spot with steps leading down.',
  ST_SetSRID(ST_MakePoint(79.1350, 13.1800), 4326)::geography,
  'Free',
  '20 minutes',
  ARRAY['water','viewpoint','nature'],
  true,
  '{"hi": {"name": "आकाशगंगा जलप्रपात", "description": "पहाड़ी पर एक प्राकृतिक वसंत जो एक छोटा झरना बनाता है।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'tirumala-papavinasanam',
  'tirumala',
  'Papavinasanam Tank',
  'ghat',
  'Sacred pond where pilgrims bathe before darshan. Believed to wash away sins (papa = sin, vinasanam = destruction).',
  ST_SetSRID(ST_MakePoint(79.1420, 13.1860), 4326)::geography,
  'Free',
  '30 minutes',
  ARRAY['ritual','water','pilgrimage'],
  true,
  '{"hi": {"name": "पापविनाशनम टैंक", "description": "पवित्र तालाब जहां तीर्थ यात्री दर्शन से पहले स्नान करते हैं।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

-- Palani POI
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'palani-temple',
  'palani',
  'Dandayuthapani Swamy Temple',
  'temple',
  'The main hilltop shrine. Deity carved from nine sacred herbs (Navapashanam). Approach via 670 steps, rope car, or rail. Open dawn to 9 PM; darshan typically 2–3 hours due to crowds.',
  ST_SetSRID(ST_MakePoint(77.4500, 10.2500), 4326)::geography,
  'Free (donations)',
  '2-3 hours',
  ARRAY['darshan','main-shrine','pilgrimage','hilltop'],
  true,
  '{"hi": {"name": "डंडायुधापनी स्वामी मंदिर", "description": "मुख्य पहाड़ी मंदिर। देवता को नौ पवित्र जड़ी-बूटियों से बना माना जाता है।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

-- Shikharji POI
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'shikharji-jal-mandir',
  'shikharji',
  'Jal Mandir (Water Temple)',
  'temple',
  'Small shrine halfway through the parikrama dedicated to water. Pilgrims believe drinking water here grants blessings. Natural spring feeds the temple.',
  ST_SetSRID(ST_MakePoint(86.1300, 23.9600), 4326)::geography,
  'Free',
  '15 minutes',
  ARRAY['temple','water','pilgrimage'],
  true,
  '{"hi": {"name": "जल मंदिर", "description": "परिक्रमा के आधे रास्ते में एक छोटा मंदिर जो जल को समर्पित है।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

-- Rockfort POI (Trichy exists, adding POI only)
INSERT INTO points_of_interest (
  id, destination_id, name, type, description, coords, entry_fee,
  time_needed, tags, kids_suitable, translations
) VALUES (
  'trichy-rockfort',
  'trichy',
  'Rockfort Ucchi Pillayar Temple',
  'temple',
  'Ancient Ganesh temple atop a 273-foot rock fortress in central Trichy. 437 carved steps wind through the rock to the summit. Panoramic views of the Kaveri River and city below. Open 6 AM–8 PM.',
  ST_SetSRID(ST_MakePoint(78.6965, 10.8155), 4326)::geography,
  'Free (donations)',
  '1-1.5 hours',
  ARRAY['temple','rock-monument','viewpoint','pilgrimage'],
  true,
  '{"hi": {"name": "रॉकफोर्ट उच्ची पिल्लैयर मंदिर", "description": "एक 273 फुट की चट्टान के शीर्ष पर गणेश मंदिर। 437 नक्काशीदार सीढ़ियां चोटी तक जाती हैं। कावेरी नदी और शहर का चित्ताकर्षक दृश्य।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  coords = EXCLUDED.coords,
  entry_fee = EXCLUDED.entry_fee,
  time_needed = EXCLUDED.time_needed,
  translations = EXCLUDED.translations;

-- =====================================================
-- HIDDEN GEMS (3 total)
-- =====================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, tags, confidence_score, translations
) VALUES (
  'sabarimala-karimala',
  'sabarimala',
  'Karimala Temple Ruins',
  ST_SetSRID(ST_MakePoint(77.4000, 9.6000), 4326)::geography,
  5.5,
  '1 hour walk',
  'Tucked in the forest, rarely mentioned in pilgrim guides.',
  'Crumbling ancient shrine with intricate stone carvings. Possible 8th-century origins. Peaceful, traffic-free setting where monks historically meditated.',
  'moderate',
  ARRAY['ancient-temple','forest','offbeat','pilgrimage'],
  3,
  '{"hi": {"name": "करिमाला मंदिर खंडहर", "description": "जंगल में छिपा हुआ, बहुत कम पर्यटक आते हैं।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  distance_km = EXCLUDED.distance_km,
  drive_time = EXCLUDED.drive_time,
  why_unknown = EXCLUDED.why_unknown,
  why_go = EXCLUDED.why_go,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  confidence_score = EXCLUDED.confidence_score,
  translations = EXCLUDED.translations;

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, tags, confidence_score, translations
) VALUES (
  'shikharji-tonk',
  'shikharji',
  'Tonk (Small Temple Peak)',
  ST_SetSRID(ST_MakePoint(86.1200, 23.9700), 4326)::geography,
  2.5,
  '45 minute detour',
  'Off the main parikrama; requires navigation or local guide.',
  'Solitary shrine perched on a lesser peak. Sweeping views of Parasnath and the Madhuban forest canopy. Rarely crowded; felt by pilgrims to hold intense spiritual energy.',
  'moderate',
  ARRAY['pilgrimage','peak','offbeat','jain'],
  3,
  '{"hi": {"name": "टोंक", "description": "एक छोटी पहाड़ी पर अकेला मंदिर। परसनाथ और मधुबन जंगल के विहंगम दृश्य।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  distance_km = EXCLUDED.distance_km,
  drive_time = EXCLUDED.drive_time,
  why_unknown = EXCLUDED.why_unknown,
  why_go = EXCLUDED.why_go,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  confidence_score = EXCLUDED.confidence_score,
  translations = EXCLUDED.translations;

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, tags, confidence_score, translations
) VALUES (
  'palani-kodaikanal-pass',
  'palani',
  'Mountain Road to Kodaikanal',
  ST_SetSRID(ST_MakePoint(77.3500, 10.2000), 4326)::geography,
  2,
  '2 hours',
  'Scenic drive from Palani uphill; many pilgrims descend directly from the temple.',
  'Winding mountain road with tea and cardamom plantations. Shola forest patches and misty views. If hiking, the old pilgrim route is overgrown but navigable with a guide. Fog rolls in by evening.',
  'moderate',
  ARRAY['mountain-road','tea-estates','offbeat','scenic'],
  3,
  '{"hi": {"name": "कोडाइकनाल की ओर पहाड़ी सड़क", "description": "पलानी से ऊपर की ओर घुमावदार सड़क चाय और इलायची बागों से होकर गुजरती है।"}}'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  coords = EXCLUDED.coords,
  distance_km = EXCLUDED.distance_km,
  drive_time = EXCLUDED.drive_time,
  why_unknown = EXCLUDED.why_unknown,
  why_go = EXCLUDED.why_go,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  confidence_score = EXCLUDED.confidence_score,
  translations = EXCLUDED.translations;

-- =====================================================
-- COLLECTIONS (1 new)
-- =====================================================

INSERT INTO collections (
  id, name, description, items, tags, content_type
) VALUES (
  'arupadai-veedu',
  'Arupadai Veedu: Six Abodes of Murugan',
  'The sacred circuit of six hilltop and coastal temples across Tamil Nadu dedicated to Murugan. Each shrine marks a divine episode: marriage, victory over demons, and spiritual teachings. Circumambulation is a 3–4 day journey by road.',
  '[
    {"destination_id": "tiruparankundram", "rank": 1, "note": "Murugan married Deivanai here, first of the six abodes."},
    {"destination_id": "tiruchendur", "rank": 2, "note": "Coastal shrine where Murugan defeated the demon Surapadman."},
    {"destination_id": "palani", "rank": 3, "note": "Hilltop hermitage where Murugan meditated as an ascetic."},
    {"destination_id": "swamimalai", "rank": 4, "note": "Where Murugan taught his father Shiva the sacred Om."},
    {"destination_id": "pazhamudircholai", "rank": 5, "note": "Murugan enshrined with both consorts Deivanai and Valli."},
    {"destination_id": "tiruttani", "rank": 6, "note": "Final abode where Murugan regained inner peace and married Valli."}
  ]'::jsonb,
  ARRAY['pilgrimage','circuit','murugan','tamil-Nadu'],
  'circuit'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  items = EXCLUDED.items,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
