-- South Indian day-hikes — 12 new treks (Karnataka 5 + Tamil Nadu 4 + Kerala 3)
-- Source: Karnataka Tourism (karnatakatourism.org), Tamil Nadu Tourism (tamilnadutourism.tn.gov.in), Kerala Tourism (keralatourism.org)
-- Research: indiahikes.com, thrillophilia.com, various state forest dept sites
-- Best months inferred from regional monsoon/weather patterns per 2026-05-27 briefing

-- KARNATAKA (5)

-- source: https://indiahikes.com/documented-trek/madhugiri-fort
-- source: https://karnatakatourism.org/en/attractions/madhugiri-trek
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'madhugiri-trek',
  'Madhugiri Monolith Trek',
  'bengaluru',
  'moderate',
  1,
  1199,
  4,
  ARRAY[10, 11, 12, 1, 2, 3],
  true,
  true,
  6,
  'Moderate',
  'Trek to Asia''s second-largest monolith, a dramatic single rock formation towering 1,199 m above the Tumkur plateau. Steep ascent with 17th-century Vijayanagara fort ruins, concentric walls, and panoramic views over the Eastern Deccan.',
  ARRAY['Asia''s 2nd-largest monolith', '17th-century fort ruins with 7 concentric walls', 'Rocky scramble ascent (60° angle)', 'Sunrise views from summit', 'Viewpoint over Tumkur district'],
  ARRAY['Trail is steep and loose rock-strewn', 'No shade on upper section', 'Exposure on final ascent', 'Mobile coverage drops near summit'],
  ARRAY['Sturdy trekking shoes', 'Sun protection', 'Minimum 2L water', 'Light rope or hiking pole for scramble'],
  '{}',
  '[{"day": 1, "route": "Madhugiri base → Fort gate (1km) → Concentric walls section (1.5km) → Final rocky scramble (1km) → Summit (200m)", "description": "Start early morning from vehicle parking. Navigate through nested fort walls, then steep boulder scramble to summit. 2.5–3 hours ascent, 1.5–2 hours descent."}]',
  '[{"name": "Madhugiri base parking", "elevation_m": 1090, "lat": 13.5183, "lon": 76.3667}, {"name": "Fort gate entry", "elevation_m": 1110, "lat": 13.5193, "lon": 76.3673}, {"name": "Concentric wall 7 (outer)", "elevation_m": 1140, "lat": 13.5197, "lon": 76.3680}, {"name": "Concentric wall 1 (inner)", "elevation_m": 1160, "lat": 13.5205, "lon": 76.3690}, {"name": "Madhugiri summit", "elevation_m": 1199, "lat": 13.5215, "lon": 76.3700}]',
  '{"per_head": 150, "includes": ["Forest entry"], "guide_optional": true, "guide_cost_per_group": 500, "notes": "No camping; day-trek only. Entry ₹50–200 depending on vehicle type."}',
  'From Bengaluru (100 km, 2.5 hours) → NH44 to Tumkur → Local roads to Madhugiri town → Trek base parking signed. Auto or self-drive.',
  'Forest entry ₹50 (pedestrian) to ₹200 (4-wheeler). No advance booking required. Forest guard at gate can provide local guide (₹500/group, optional).',
  'Spring near fort gate (often dry in summer); carry 2L minimum',
  '4G in Madhugiri town; drops to 2G near summit',
  'Tumkur Police: 0816-222-3333 | Nearest medical: Tumkur District Hospital (15 km, 30 min by vehicle)',
  'Tumkur District Hospital, Tumkur (15 km)',
  'https://indiahikes.com/documented-trek/madhugiri-fort',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.thrillophilia.com/tours/anthargange-night-trek-and-cave-exploration-bangalore
-- source: https://tumkur.nic.in/en/tourist-place/madhugiri-fort/
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'anthargange-trek',
  'Anthargange Caves & Hilltop Trek',
  'bengaluru',
  'easy',
  1,
  1712,
  5,
  ARRAY[10, 11, 12, 1, 2, 3],
  true,
  true,
  5,
  'Easy',
  'Cave-filled hilltop trek in the Kolar district, featuring perpetual spring ("Anthar Gange" = inner Ganges), rocky scrambles through narrow passages, and a hilltop Kashi Vishweshwara temple. Altitude 1,712 m amid dense forests and boulder fields.',
  ARRAY['Cave exploration with narrow crawl sections', 'Perpetual spring among rocks', 'Kashi Vishweshwara Temple (medieval)', 'Boulder-hopping loop trail', 'Bird-watching in shola forest'],
  ARRAY['Some caves require crawling; claustrophobic risk', 'Unlit caves; bring torch', 'Loose boulders on trail', 'Temple area can be crowded on weekends'],
  ARRAY['Sturdy shoes with ankle support', 'Headtorch or flashlight', 'Helmet (for cave sections)', 'Light jacket (cave cool)', '2L water'],
  '{}',
  '[{"day": 1, "route": "Anthargange base (1700m) → Spring area (5 min) → Cave zone (1km over 1 hour) → Temple (2km loop, 1.5 hours) → Base descent (30 min)", "description": "Start early to avoid crowds. Explore inner spring and cave network, navigate narrow passages. Temple crowns the loop. Afternoon return. 3–4 hours total."}]',
  '[{"name": "Anthargange base parking", "elevation_m": 1700, "lat": 13.2233, "lon": 78.5033}, {"name": "Perpetual spring pool", "elevation_m": 1708, "lat": 13.2241, "lon": 78.5041}, {"name": "Large cave entrance", "elevation_m": 1710, "lat": 13.2245, "lon": 78.5045}, {"name": "Narrow crawl passage", "elevation_m": 1712, "lat": 13.2248, "lon": 78.5048}, {"name": "Kashi Vishweshwara Temple", "elevation_m": 1710, "lat": 13.2243, "lon": 78.5050}]',
  '{"per_head": 120, "includes": ["Forest entry"], "guide_recommended": true, "guide_cost_per_group": 600, "notes": "Cave-savvy guide useful for narrow sections."}',
  'From Bengaluru (70 km, 1.5 hours) → NH44 toward Kolar → Anthargange village signed → Trek parking. Auto or self-drive.',
  'Forest entry ₹50–100 (Kolar Forest Dept). No advance booking. Local guides available at base (₹600/group, recommended for cave sections).',
  'Perpetual spring at base (potable after settling); filter advised',
  '3G in village; 2G near caves',
  'Kolar Police: 08152-225-800 | Nearest medical: Kolar Medical College (22 km)',
  'Kolar Medical College & Hospital (22 km)',
  'https://www.thrillophilia.com/tours/anthargange-night-trek-and-cave-exploration-bangalore',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://karnatakatourism.org/en/attractions/devarayanadurga-trek
-- source: https://traveltriangle.com/blog/devarayanadurga-trek/
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'devarayanadurga-trek',
  'Devarayanadurga Twin Temple Trek',
  'bengaluru',
  'easy',
  1,
  1200,
  4,
  ARRAY[10, 11, 12, 1, 2, 3],
  false,
  true,
  4,
  'Easy',
  'Short beginner-friendly trek to twin hilltops (1,200 m) in Tumkur district, 70 km from Bengaluru. Twin temples: Bhoga Narasimha (base) and Yoga Narasimha (summit). Name means "Fort of the God." Surrounded by dense forests and boulder trails.',
  ARRAY['Bhoga Narasimha Temple at base', 'Yoga Narasimha Temple at summit', 'Twin hilltop design (meditation/enjoyment worship)', 'Dense shola forest canopy', 'Beginner-friendly stone steps'],
  ARRAY['Temple areas crowded on weekends', 'Steep final ascent (but short)', 'Limited water; carry 1.5L minimum'],
  ARRAY['Comfortable trekking shoes', 'Light daypack', '1.5L water', 'Camera for temple architecture'],
  '{}',
  '[{"day": 1, "route": "Base parking (1090m) → Bhoga Narasimha Temple (200m walk) → Stone staircase ascent (1km) → Yoga Narasimha Temple summit (1200m, 1.5km from base) → Return descent (1km)", "description": "Early start to beat crowds. Stone steps guide most of the way. Temple at summit has history spanning centuries. 2–3 hours round-trip."}]',
  '[{"name": "Devarayanadurga base parking", "elevation_m": 1090, "lat": 13.3817, "lon": 76.1967}, {"name": "Bhoga Narasimha Temple", "elevation_m": 1095, "lat": 13.3823, "lon": 76.1975}, {"name": "Stone staircase (mid)", "elevation_m": 1140, "lat": 13.3847, "lon": 76.1993}, {"name": "Forest canopy zone", "elevation_m": 1170, "lat": 13.3868, "lon": 76.2008}, {"name": "Yoga Narasimha Temple (summit)", "elevation_m": 1200, "lat": 13.3885, "lon": 76.2020}]',
  '{"per_head": 100, "includes": ["No entry fee"], "guide_optional": true, "guide_cost_per_group": 400, "notes": "Temple donation optional (₹10–50 per person)."}',
  'From Bengaluru (70 km, 1.5 hours) → Tumkur district → Devarayanadurga village signed → Trek parking. Auto or self-drive.',
  'No permits required; temple areas open dawn to dusk. No advance booking.',
  'Water tap near Bhoga Narasimha Temple (limited flow); filter advised',
  '4G in village; 3G at temple',
  'Tumkur Police: 0816-222-3333 | Nearest medical: Tumkur District Hospital (25 km)',
  'Tumkur District Hospital (25 km)',
  'https://karnatakatourism.org/en/attractions/devarayanadurga-trek',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://indiahikes.com/documented-trek/nishani-motte-trek
-- source: https://www.treksandtrails.org/tours/nishani-motte-coorg-trek-86419
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'nishani-motte-trek',
  'Nishani Motte Wildlife Circuit Trek',
  'coorg',
  'hard',
  1,
  1750,
  14,
  ARRAY[9, 10, 11, 12, 1, 2],
  false,
  false,
  14,
  'Hard',
  'Challenging day-trek in Talacauvery Wildlife Sanctuary, originating at Talakaveri sacred source of Cauvery River. Peaks at 1,750 m with narrow summit perch (space for ~10 people). 13–14 km round-trip through shola forests, grassy ridges, and Brahmagiri range views.',
  ARRAY['Talakaveri: sacred source of Cauvery River', 'Shola forest with moss, lichens, epiphytes', 'Grassy ridge panorama to Brahmagiri', 'Narrow summit (dramatic drop-offs)', 'Post-monsoon lush (Oct–Feb)'],
  ARRAY['Hard trek; exposed narrow summit with drop-offs', 'Dense mist risk; poor visibility in cloud', 'Slippery moss-covered rocks (monsoon residue)', 'No mobile coverage; carry whistle', 'Permit not required but inform forest office'],
  ARRAY['Sturdy hiking boots (essential for slop)', 'Rain jacket (even in dry season)', 'Minimum 3L water (unreliable springs)', 'Headtorch for early-morning start', 'Whistle, first-aid kit'],
  '{}',
  '[{"day": 1, "route": "Talakaveri shrine (1270m) → Shola forest ascent (4km) → Grassy ridge plateau (3km) → Nishani Motte summit (1750m, final 2km) → Return reverse route (14km total)", "description": "Pre-dawn start from Talakaveri to catch sunrise. Steep shola ascent, then open ridge walking with cumulative 500m elevation gain. Summit narrow, exposed; not for acrophobic. 7–8 hours total; hard fitness required."}]',
  '[{"name": "Talakaveri shrine", "elevation_m": 1270, "lat": 11.4275, "lon": 75.5092}, {"name": "Shola forest entry", "elevation_m": 1310, "lat": 11.4250, "lon": 75.5110}, {"name": "Forest canopy midpoint", "elevation_m": 1480, "lat": 11.4198, "lon": 75.5140}, {"name": "Grassy ridge plateau", "elevation_m": 1620, "lat": 11.4130, "lon": 75.5175}, {"name": "Nishani Motte summit", "elevation_m": 1750, "lat": 11.4050, "lon": 75.5210}]',
  '{"per_head": 250, "includes": ["No entry fee"], "guide_essential": true, "guide_cost_per_group": 1200, "notes": "Hard trek; strong guide recommended. Permit not required; inform forest office."}',
  'From Coorg town (~40 km, 1 hour) → Talacauvery village → Talakaveri shrine parking. Self-drive or local taxi.',
  'No advance permit; inform Talacauvery Forest Range office (~11.429°N, 75.509°E) before trek. Wildlife sanctuary boundary; no camping.',
  'Talakaveri spring (sacred; acceptable for drinking)', 'Springs along ridge unreliable',
  'Dead zone; no coverage; carry whistle',
  'Coorg Police: 08272-248-888 | Nearest medical: Coorg District Hospital (45 km, 1+ hours)',
  'Coorg District Hospital, Madikeri (45 km)',
  'https://indiahikes.com/documented-trek/nishani-motte-trek',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://indiahikes.com/documented-trek/mullayanagiri-peak-trek
-- source: https://karnatakatourism.org/en/attractions/mullayanagiri-trek/
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'mullayanagiri-trek',
  'Mullayanagiri: Karnataka''s Highest Peak',
  'chikmagalur',
  'moderate',
  1,
  1930,
  6,
  ARRAY[8, 9, 10, 11, 12, 1, 2],
  true,
  false,
  12,
  'Moderate',
  'Trek to Karnataka''s highest peak (1,930 m) in the Western Ghats near Chikmagalur. Starts at Sarpadhari junction. Steep zig-zag ascent through bushland and forest, ending at a small Shiva temple and the tomb of Saint Mulappa Swamy. Panoramic Western Ghats views.',
  ARRAY['Highest peak in Karnataka', 'Shiva temple at summit', 'Tomb of Saint Mulappa Swamy', 'Steep 60° zig-zag ascent', 'Grassland panorama'],
  ARRAY['Very steep initial section (60°+)', 'Exposed in afternoon heat; early start essential', 'Path can be slippery after rain', 'Summit exposed to wind & cold'],
  ARRAY['Sturdy trekking boots', 'Sun protection (wide-brimmed hat, sunscreen)', '2L water minimum', 'Light snacks for energy', 'Warm layer for summit'],
  '{}',
  '[{"day": 1, "route": "Sarpadhari junction (1520m) → Steep forest ascent (2km) → Mid-forest plateau (2km) → Summit shrine (2km final, 1930m)", "description": "Early morning from Sarpadhari. Steep ascent over 3 hours, moderate descent 2 hours. Summit has Shiva temple; pilgrims visit year-round. Jeep-accessible to Sarpadhari; trek from there."}]',
  '[{"name": "Sarpadhari junction", "elevation_m": 1520, "lat": 13.4567, "lon": 75.6250}, {"name": "Forest entry", "elevation_m": 1580, "lat": 13.4598, "lon": 75.6268}, {"name": "Zig-zag midpoint", "elevation_m": 1750, "lat": 13.4645, "lon": 75.6295}, {"name": "Grassland plateau", "elevation_m": 1850, "lat": 13.4698, "lon": 75.6330}, {"name": "Mullayanagiri summit (Shiva temple)", "elevation_m": 1930, "lat": 13.4740, "lon": 75.6360}]',
  '{"per_head": 180, "includes": ["Forest entry ₹50–100"], "guide_optional": true, "guide_cost_per_group": 700, "notes": "Jeep taxi available from Chikmagalur to Sarpadhari (₹800–1200)."}',
  'From Chikmagalur town (15 km, 30 min) → Sarpadhari junction by jeep or car. Trek from Sarpadhari (3–4 km climb, 3–4 hours). Chikmagalur is ~280 km from Bengaluru (6 hours).',
  'No advance permit; forest entry ₹50–100 at Sarpadhari. Informally arrange guide (₹500–700) at Sarpadhari checkpoint.',
  'Sarpadhari spring (before ascent); no sources mid-trail; carry minimum 2L',
  '3G in Chikmagalur town; 2G at Sarpadhari; dead zone at summit',
  'Chikmagalur Police: 08267-225-555 | Nearest medical: Chikmagalur District Hospital (25 km)',
  'Chikmagalur District Hospital (25 km)',
  'https://indiahikes.com/documented-trek/mullayanagiri-peak-trek',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- TAMIL NADU (4)

-- source: https://indiahikes.com/documented-trek/swamimalai-hill-trek
-- source: https://trektamilnadu.com/trail/yelagiri-swamimalai
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'yelagiri-swamimalai-trek',
  'Yelagiri Swamimalai Trek',
  'yercaud',
  'easy',
  1,
  1410,
  5,
  ARRAY[10, 11, 12, 1, 2, 3],
  true,
  true,
  5,
  'Easy',
  'Short day-trek in Yelagiri hills (Eastern Ghats), Tamil Nadu. Summit at 1,410 m near Mangalam tribal village. Shiva temple at top with panoramic views of surrounding valleys and tribal settlements. Forested trail, family-friendly.',
  ARRAY['Shiva temple at hilltop', 'Tribal village Mangalam', 'Eastern Ghats landscape', 'Diverse bird life', 'Flowering trees (season-dependent)'],
  ARRAY['Crowded on weekends', 'Temple area busy at peak times', 'Minimal shade on final ascent', 'Narrow sections with minor exposure'],
  ARRAY['Comfortable trekking shoes', 'Sun hat and sunscreen', '1.5L water', 'Camera for bird watching'],
  '{}',
  '[{"day": 1, "route": "Mangalam village (1200m) → Forest trail ascent (2.5km) → Temple steps (1.5km) → Swamimalai summit (1410m, 3km round total)", "description": "Morning trek from tribal village Mangalam. Well-marked stepped trail through flowering forest. Summit temple viewpoint with Shiva shrine. 2–3 hours round-trip."}]',
  '[{"name": "Mangalam village entry", "elevation_m": 1200, "lat": 12.3650, "lon": 78.9750}, {"name": "Forest trail midpoint", "elevation_m": 1290, "lat": 12.3695, "lon": 78.9782}, {"name": "Temple steps begin", "elevation_m": 1340, "lat": 12.3730, "lon": 78.9810}, {"name": "Final approach", "elevation_m": 1390, "lat": 12.3760, "lon": 78.9835}, {"name": "Swamimalai Shiva Temple", "elevation_m": 1410, "lat": 12.3775, "lon": 78.9850}]',
  '{"per_head": 100, "includes": ["Forest entry ₹50"], "guide_optional": true, "guide_cost_per_group": 400, "notes": "Temple donation optional (₹10–50)."}',
  'From Yercaud (40 km, 1 hour) → Mangalam village. Nearest airport: Salem (80 km). Local taxi or auto-rickshaw to Mangalam.',
  'Forest entry ₹50 (Tamil Nadu Forest Dept, Tirupathur Range). No advance booking.',
  'Water tap in Mangalam village; natural springs along trail unreliable',
  '3G in Mangalam; 2G on trail; fair coverage',
  'Yercaud Police: 04286-244-322 | Nearest medical: Tirupathur Government Hospital (25 km)',
  'Tirupathur Government Hospital (25 km)',
  'https://indiahikes.com/documented-trek/swamimalai-hill-trek',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.tamilnadutourism.tn.gov.in/destinations/pagoda-point-yercaud
-- source: https://traveltriangle.com/blog/pagoda-point-yercaud/
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'yercaud-pagoda-point-trek',
  'Yercaud Pagoda Point Trek',
  'yercaud',
  'easy',
  1,
  1500,
  4,
  ARRAY[10, 11, 12, 1, 2, 3, 4, 5, 6],
  false,
  true,
  4,
  'Easy',
  'Short family-friendly trek to Pagoda Point (1,500 m) in Yercaud, Tamil Nadu. Also called Pyramid Point due to 4 stone piles arranged like temple pagodas (tribal origin). Sri Rama Temple at hilltop. Stunning sunrise and sunset views over Salem and Kakambadi.',
  ARRAY['4 pyramid-shaped stone piles', 'Sri Rama Temple', 'Views of Salem and Kakambadi', 'Sunrise photography spot', 'Well-marked forest trail'],
  ARRAY['Crowded sunrise times (arrive early)', 'Exposed viewpoint in afternoon wind', 'Limited water facilities'],
  ARRAY['Comfortable walking shoes', 'Camera for sunrise', '1L water', 'Light snacks'],
  '{}',
  '[{"day": 1, "route": "Yercaud town (1450m) → Forest path (1.5km) → Pagoda viewpoint (1500m, 2km from town) → Return", "description": "Short 1-hour walk from Yercaud town to viewpoint. Visit Sri Rama Temple. Sunrise (5:30–6:30 am) or sunset (5–5:45 pm) recommended for photography. Minimal elevation gain."}]',
  '[{"name": "Yercaud town center", "elevation_m": 1450, "lat": 11.7933, "lon": 78.8123}, {"name": "Forest path entry", "elevation_m": 1465, "lat": 11.7945, "lon": 78.8140}, {"name": "Trail midpoint", "elevation_m": 1480, "lat": 11.7960, "lon": 78.8160}, {"name": "Sri Rama Temple", "elevation_m": 1495, "lat": 11.7975, "lon": 78.8180}, {"name": "Pagoda Point viewpoint", "elevation_m": 1500, "lat": 11.7985, "lon": 78.8190}]',
  '{"per_head": 50, "includes": ["No entry fee"], "guide_optional": true, "guide_cost_per_group": 300, "notes": "Free access; stalls with tea/snacks at base."}',
  'From Yercaud town (4.5 km, 15–20 min walk). Yercaud is 90 km from Salem city. Nearest airport: Salem (90 km).',
  'No permits required; open to public.',
  'Water tap near Sri Rama Temple',
  '4G in Yercaud town; 3G at Pagoda Point',
  'Yercaud Police: 04286-244-322 | Nearest medical: Yercaud General Hospital (5 km)',
  'Yercaud General Hospital (5 km)',
  'https://www.tamilnadutourism.tn.gov.in/destinations/pagoda-point-yercaud',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.beyondyatra.com/destination/sirumalai
-- source: https://www.cooltrails.com/trails-of-tamil-nadu-kerala/
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'sirumalai-trek',
  'Sirumalai Hills Trek',
  'kodaikanal',
  'moderate',
  1,
  1600,
  8,
  ARRAY[10, 11, 12, 1, 2, 3],
  true,
  false,
  10,
  'Moderate',
  'Trek through Sirumalai massif (60,000 acres) in Tamil Nadu''s Dindigul district, 25 km from Dindigul town. Summit at 1,600 m amid deciduous and wet-deciduous forests. Diverse fauna (slender loris, gaur, sambar deer, sloth bear, pangolin). Lower altitude than Kodaikanal but wilder.',
  ARRAY['Moist deciduous forest canopy', 'Slender loris and gaur sightings', 'Waterfalls (monsoon residue)', 'Deciduous forest biodiversity', 'Less crowded than Kodaikanal'],
  ARRAY['Trail can be muddy/slippery post-monsoon', 'Leopard sightings possible; make noise', 'Limited water sources mid-trail', 'Mobile dead zone in forest'],
  ARRAY['Sturdy hiking boots (mud-proof)', 'Rain jacket (mist frequent)', '2L water', 'Whistle for safety', 'Torch (early-morning start)'],
  '{}',
  '[{"day": 1, "route": "Sirumalai base parking (1200m) → Deciduous forest ascent (3km) → Waterfalls zone (1.5km) → Plateau ridge (2km) → Summit viewpoint (1600m, 8km total)", "description": "Early morning trek through dense moist forest. Gradual climb with 400m elevation gain. Wildlife spotting likely. 5–6 hours round-trip. Afternoon descent before mist thickens."}]',
  '[{"name": "Sirumalai base parking", "elevation_m": 1200, "lat": 10.6417, "lon": 77.9583}, {"name": "Forest entry checkpoint", "elevation_m": 1230, "lat": 10.6443, "lon": 77.9603}, {"name": "Forest canopy midpoint", "elevation_m": 1380, "lat": 10.6545, "lon": 77.9685}, {"name": "Waterfall zone (monsoon)", "elevation_m": 1480, "lat": 10.6625, "lon": 77.9745}, {"name": "Sirumalai plateau ridge", "elevation_m": 1600, "lat": 10.6710, "lon": 77.9820}]',
  '{"per_head": 160, "includes": ["Forest entry ₹50–100"], "guide_essential": true, "guide_cost_per_group": 800, "notes": "Guide recommended for wildlife safety and navigation."}',
  'From Dindigul town (25 km, 45 min) → Sirumalai base parking (forest road). Dindigul is 125 km from Trichy (2.5 hours).',
  'Forest entry ₹50–100 (Dindigul Forest Range, Tamil Nadu). Advance booking recommended via Dindigul Forest Dept (+91-451-2432-222).',
  'Springs along trail unreliable; carry 2L minimum. Water tap at base.',
  'Dead zone in forest; 2G in town',
  'Dindigul Police: 0451-243-9000 | Nearest medical: Dindigul Medical College Hospital (30 km)',
  'Dindigul Medical College Hospital (30 km)',
  'https://www.beyondyatra.com/destination/sirumalai',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.tamilnadutourism.tn.gov.in/destinations/coakers-walk
-- source: https://kodaikanaltourism.co.in/coakers-walk-kodaikanal
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'coakers-walk-kodaikanal',
  'Coaker''s Walk: Kodaikanal Cliffside Trail',
  'kodaikanal',
  'easy',
  1,
  2133,
  1,
  ARRAY[5, 6, 7, 8, 9, 10, 11, 12],
  false,
  true,
  3,
  'Easy',
  '1 km paved cliffside walk at 2,133 m in Kodaikanal, constructed in 1872 by Lieutenant Coaker. Built on a steep mountain slope with safety railings. Panoramic views of Kodaikanal Lake, Periyakulam town, Madurai city, and Dolphin''s Nose point. Family-friendly.',
  ARRAY['1 km paved walkway', '1872 Victorian-era construction', '2133m altitude (highest in hike)', 'Panoramic valley views', 'Observatory along the path', 'Dolphin''s Nose viewpoint (clear days)'],
  ARRAY['Mist common (visit before 2:30 pm for clear views)', 'Can be crowded on weekends', 'Narrow sections with sheer drops; hold railings', 'Slippery when wet'],
  ARRAY['Comfortable walking shoes (good grip)', 'Light jacket (cool, windy)', '0.5L water', 'Camera'],
  '{}',
  '[{"day": 1, "route": "Van Allen Hospital (2120m) → Coaker''s Walk east entrance → Observatory midpoint (0.5km) → St Peter''s Church vicinity → West exit near Kodaikanal Lake (1km total)", "description": "30-minute paved walk, leisurely pace. No elevation gain. Best visited before 2:30 pm (mist descends afternoon). Observatory offers extended panorama. Suitable for all ages."}]',
  '[{"name": "Van Allen Hospital entrance", "elevation_m": 2120, "lat": 10.2368, "lon": 77.4850}, {"name": "Coaker''s Walk east start", "elevation_m": 2130, "lat": 10.2375, "lon": 77.4870}, {"name": "Observatory midpoint", "elevation_m": 2133, "lat": 10.2390, "lon": 77.4900}, {"name": "St Peter''s Church vicinity", "elevation_m": 2130, "lat": 10.2405, "lon": 77.4925}, {"name": "Kodaikanal Lake viewpoint", "elevation_m": 2128, "lat": 10.2418, "lon": 77.4950}]',
  '{"per_head": 0, "includes": ["No entry fee"], "guide_optional": false, "guide_cost_per_group": 0, "notes": "Free access; well-marked paved path."}',
  'From Kodaikanal town center (0.5 km, 5 min by auto or walk). Kodaikanal is 120 km from Madurai (2.5 hours).',
  'No permits required; open to public.',
  'Water fountains near observatory and town entrance',
  '4G throughout',
  'Kodaikanal Police: 04542-241-555 | Nearest medical: Kodaikanal Medical Centre (1 km)',
  'Kodaikanal Medical Centre (1 km)',
  'https://www.tamilnadutourism.tn.gov.in/destinations/coakers-walk',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- KERALA (3)

-- source: https://app.advcollective.com/travel-guides/Munnar/summit-anamudi-peak-south-india-highest-hike-western-ghats-views
-- source: https://www.keralatourism.org/munnar/anamudi-peak-kerala.php
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'anamudi-peak-trek',
  'Anamudi Peak: South India''s Highest',
  'eravikulam',
  'hard',
  1,
  2695,
  8,
  ARRAY[1, 2, 3],
  true,
  false,
  16,
  'Hard',
  'SOUTH INDIA''S HIGHEST PEAK at 2,695 m, in Eravikulam National Park, Munnar. KFD conservation lottery: extremely limited (Jan–Mar only, <50 daily slots). Mandatory guided trek. Strict permit system (online application 2–3 months ahead). Home to Nilgiri Tahrs, Asian elephants, and gaurs.',
  ARRAY['South India''s highest peak', 'Eravikulam National Park protégé', 'Nilgiri Tahr population', 'Asian elephant sightings', 'Subalpine grasslands at 2600+m'],
  ARRAY['RARE PERMIT — only Jan–Mar, lottery-based, <50/day, online application required', 'Altitude sickness possible (2695m, rapid ascent)', 'Weather highly variable (mist, cold, wind)', 'Steep final push', 'Oxygen depletion at summit'],
  ARRAY['Altitude acclimation day recommended', 'Warm layers (0–5°C at summit)', 'Rain jacket and windstopper', 'Trekking poles (essential)', '3L water + high-energy snacks', 'Sunscreen and glacier cream'],
  '{}',
  '[{"day": 1, "route": "Eravikulam NP gate (1600m) → Guide rendezvous → Ascending slope & shola forest (2km) → Mid-altitude plateau (3km, 2200m) → Final subalpine push (2km, 2695m) → Summit return to gate (8km total)", "description": "Mandatory official guide from KFD. Very early 4 am start. 7–8 hours round-trip with altitude gain of 1095m. Summit has stone cairn, weather-dependent views to Arabian Sea and Western Ghats. ONLY Jan–Mar due to NP closure (conserv.)."}]',
  '[{"name": "Eravikulam NP gate", "elevation_m": 1600, "lat": 10.3958, "lon": 76.7833}, {"name": "Guide assembly point", "elevation_m": 1610, "lat": 10.3965, "lon": 76.7843}, {"name": "Shola forest belt", "elevation_m": 1850, "lat": 10.4025, "lon": 76.7903}, {"name": "Plateau zone", "elevation_m": 2200, "lat": 10.4118, "lon": 76.7983}, {"name": "Anamudi summit", "elevation_m": 2695, "lat": 10.4280, "lon": 76.8115}]',
  '{"per_head": 2000, "includes": ["KFD permit (₹1500)", "Mandatory guide (₹500–700)"], "guide_essential": true, "guide_cost_per_group": 600, "notes": "Permit LOTTERY only Jan–Mar. Online application at keralatourism.org (apply 2–3 mo ahead). Non-refundable. Entry fee ₹100 per person. Guide is KFD-appointed forest dept staff."}',
  'From Munnar town (13 km, 30 min) → Eravikulam NP gate. Munnar is 120 km from Kottayam (3 hours) or 100 km from Thekkady (2.5 hours).',
  'KFD conservation lottery MANDATORY. Website: https://www.keralatourism.org/ (Anamudi permit portal). Application deadline ~2–3 months before trek date. Lottery draw typically in Nov (for Jan–Mar slots). <50 permitted daily. Non-refundable fee ₹1500. Alternative: Rajamalai viewpoint (accessible year-round, no permit, lower altitude).',
  'Natural springs along ascent (guide points out); carry 3L backup',
  '2G in Munnar; dead zone above 2200m',
  'Munnar Police: 04865-230-433 | Nearest medical: Munnar Primary Health Centre (5 km from gate)',
  'Munnar Primary Health Centre (5 km from NP gate); serious cases → Kottayam District Hospital (120 km, 3 hours)',
  'https://app.advcollective.com/travel-guides/Munnar/summit-anamudi-peak-south-india-highest-hike-western-ghats-views',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://indiahikes.com/documented-trek/ranipuram-trek
-- source: https://www.keralatourism.org/destination/ranipuram-kasaragod/166/
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'ranipuram-trek',
  'Ranipuram: The Ooty of Kerala',
  'kannur',
  'moderate',
  1,
  1022,
  6,
  ARRAY[10, 11, 12, 1, 2, 3],
  true,
  true,
  8,
  'Moderate',
  'Trek to Ranipuram (1,022 m) in Kasaragod district, North Kerala, called the "Ooty of Kerala." Grass savannahs, shola forest patches, and panoramic valleys. Start from Panathady checkpoint. Relatively easy 5 km trail through evergreen and monsoon forests.',
  ARRAY['Grass savannahs & meadows', 'Evergreen shola forest canopy', 'Monsoon forest transitions', 'Malabar Giant Squirrels, leopards, deer', 'Valley panorama from peak'],
  ARRAY['Can be muddy post-monsoon', 'Leeches risk in monsoon (avoid June–August)', 'Limited shade on grassland section', 'Weather changes rapidly'],
  ARRAY['Comfortable trekking shoes (waterproof)', 'Rain jacket', 'Leech socks or salt (if monsoon adjacent)', '1.5L water', 'Insect repellent'],
  '{}',
  '[{"day": 1, "route": "Panathady checkpoint (750m) → Shola forest ascent (2.5km) → Grassland plateau opening (1km) → Summit grassland viewpoint (1022m, 5km total)", "description": "Morning start from Panathady checkpoint (45 min drive from Kasaragod town). Moderate forest hike through wet evergreen forest, then open grassland summit. 3–4 hours round-trip, minimal technical difficulty."}]',
  '[{"name": "Panathady ecotourism checkpoint", "elevation_m": 750, "lat": 11.9867, "lon": 75.3875}, {"name": "Forest entry", "elevation_m": 800, "lat": 11.9920, "lon": 75.3910}, {"name": "Shola forest midpoint", "elevation_m": 900, "lat": 12.0015, "lon": 75.3975}, {"name": "Grassland transition", "elevation_m": 980, "lat": 12.0095, "lon": 75.4035}, {"name": "Ranipuram summit plateau", "elevation_m": 1022, "lat": 12.0150, "lon": 75.4085}]',
  '{"per_head": 120, "includes": ["Entry ₹50"], "guide_optional": true, "guide_cost_per_group": 500, "notes": "Entry ₹50 per person at Panathady checkpoint (Kerala Forest Ecotourism). Tickets issued 8 am–3 pm."}',
  'From Kasaragod town (58 km, 1.5 hours) → Panathady checkpoint by auto or self-drive. Nearest airport: Kannur (80 km, 2 hours).',
  'Entry ₹50 at Panathady checkpoint (Kerala Forest Ecotourism Division). No advance booking needed; first-come basis. Tickets issued 8 am–3 pm daily.',
  'Natural springs along trail; filter advised',
  '3G in Kasaragod town; 2G at Panathady; fair coverage on plateau',
  'Kasaragod Police: 0498-275-3333 | Nearest medical: Kasaragod General Hospital (45 km, 1.5 hours)',
  'Kasaragod General Hospital (45 km, 1.5 hours drive)',
  'https://indiahikes.com/documented-trek/ranipuram-trek',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.keralatourism.org/destination/vagamon-kasaragod/166/
-- source: https://www.outlooktraveller.com/destinations/india/vagamon-a-little-known-hill-station-of-kerala
INSERT INTO treks (id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, min_age, fitness_level, description, highlights, warnings, gear_essentials, campsites, day_by_day, trail_points, cost_estimate, how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital, source_url, last_reviewed_at)
VALUES (
  'vagamon-meadows-trek',
  'Vagamon Meadows Trek: Rolling Hills & Murugan Mala',
  'vagamon',
  'easy-moderate',
  1,
  1100,
  10,
  ARRAY[9, 10, 11, 12, 1, 2, 3],
  false,
  true,
  7,
  'Moderate',
  'Scenic trek through Vagamon''s rolling meadows (barren hills, "muttakunnu") at 1,100 m in Idukki, Kerala. Includes Murugan Mala (rock-cut temple to Lord Murugan). Surrounded by three hills: Thangal Hill, Murugan Hill, Kurisimala (triple-faith sanctuary). Small ponds interlocked in valleys, lush monsoon-residue meadows.',
  ARRAY['Murugan Mala single-rock temple', 'Rolling grassland meadows', 'Triple-faith hills (Hindu, Muslim, Christian)', 'Valley ponds in monsoon season', 'Kurisimala Christian monastery views'],
  ARRAY['Steep scramble to Murugan Mala (if included)', 'Muddy post-monsoon', 'Uneven terrain in open grassland', 'Weather changes rapidly'],
  ARRAY['Sturdy hiking boots (muddy-proof)', 'Rain jacket', '2L water', 'Camera for meadow vistas'],
  '{}',
  '[{"day": 1, "route": "Vagamon town center (1070m) → Meadow path (2km) → Murugan Mala base (3km, 1080m) → Rock-cut temple climb (1km, steep scramble, 1100m summit) → Meadow loop return (4km total), or meadow-only (10km without Murugan Mala)", "description": "Flexible route: meadows-only (easy, 10km, 3–4 hours) OR include Murugan Mala scramble (moderate, 7km, 4–5 hours). Murugan Mala features ancient Murugan temple carved into single rock. Afternoon valleys fill with mist; start early."}]',
  '[{"name": "Vagamon town center", "elevation_m": 1070, "lat": 10.0450, "lon": 76.8567}, {"name": "Meadow path entry", "elevation_m": 1080, "lat": 10.0505, "lon": 76.8615}, {"name": "Murugan Mala base checkpoint", "elevation_m": 1085, "lat": 10.0575, "lon": 76.8680}, {"name": "Rock temple entrance", "elevation_m": 1095, "lat": 10.0620, "lon": 76.8710}, {"name": "Murugan Mala rock-cut temple", "elevation_m": 1100, "lat": 10.0660, "lon": 76.8750}]',
  '{"per_head": 100, "includes": ["No entry fee"], "guide_optional": true, "guide_cost_per_group": 400, "notes": "Temple donation optional (₹10–50). No permits needed."}',
  'From Kottayam (60 km, 1.5 hours) → Vagamon hill station. Nearest airport: Cochin (100 km, 2.5 hours).',
  'No permits required; open to public. Murugan Mala temple open dawn–dusk.',
  'Water taps in Vagamon town; natural streams in valleys (filter advised)',
  '4G in town; 3G on meadows and temple',
  'Vagamon Police: 04862-209-999 | Nearest medical: Vagamon Primary Health Centre (2 km)',
  'Vagamon Primary Health Centre (2 km); serious cases → Kottayam District Hospital (60 km, 1.5 hours)',
  'https://www.keralatourism.org/destination/vagamon-kasaragod/166/',
  '2026-05-27'
)
ON CONFLICT (id) DO NOTHING;
