-- source: https://nomadsofindia.com/trekking-destinations/bhimashankar-trek-complete-guide/
-- source: https://www.bhatakna.com/tours/bhimashankar-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'bhimashankar-trek',
  'Bhimashankar Trek',
  'bhimashankar',
  'moderate',
  1,
  985,
  19,
  ARRAY[7, 8, 9, 10, 11, 12, 1, 2],
  false,
  true,
  12,
  'moderate',
  'Trek through dense forests of the Western Ghats to reach the ancient Bhimashankar Jyotirlinga Temple, one of Maharashtra''s most sacred pilgrimage sites. The Ganesh Ghat route offers a 19km ascent with 1100m elevation gain.',
  '[
    "Sacred Jyotirlinga temple at 985m elevation",
    "Dense Sahyadri forest with cascading streams",
    "Panoramic views of the surrounding valleys",
    "Important pilgrimage destination with religious significance"
  ]',
  '[
    "Steep rocky sections require good footwear",
    "Monsoon months (June-September) bring slippery paths and leeches",
    "Early start recommended due to long distance",
    "No mobile network at higher elevations"
  ]',
  '[
    "Sturdy trekking boots with good grip",
    "Light rain jacket",
    "Water bottles (3-4 liters minimum)",
    "Energy snacks and meals",
    "Sun protection and hat"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Kusur/Khandas Base to Bhimashankar Temple",
      "distance_km": 9.5,
      "altitude_m": 1100,
      "hours": 5,
      "terrain": "Dense forest, rocky trail, steep sections near summit",
      "description": "Ascend through thick Western Ghats forest from base village. Trail winds upward with several stream crossings. Final approach to temple is steep but well-defined.",
      "campsite": null,
      "meals": "Self-packed lunch, water available at base villages",
      "water": "Stream crossings en route; tank near temple"
    }
  ]',
  '[
    {"name": "Kusur Village Base", "lat": 19.2333, "lng": 73.35, "altitude_m": 400, "day": 1, "type": "trailhead"},
    {"name": "Forest Ascent Junction", "lat": 19.24, "lng": 73.33, "altitude_m": 650, "day": 1, "type": "junction"},
    {"name": "Mid-way Stream", "lat": 19.25, "lng": 73.32, "altitude_m": 800, "day": 1, "type": "water-tank"},
    {"name": "Temple Approach", "lat": 19.27, "lng": 73.31, "altitude_m": 950, "day": 1, "type": "fort-gate"},
    {"name": "Bhimashankar Temple Summit", "lat": 19.28, "lng": 73.30, "altitude_m": 985, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹500–800", "with_guide": "₹1500–2500", "with_operator": "₹2500–4000", "note": "Entry free; guide hire from base village"}',
  'From Mumbai: 215km east via Pune. From Pune: 130km northeast. Drive to Kusur or Khandas village. Auto-rickshaws available from Karjat or Lonavala.',
  'No permits required; free entry. Temple open dawn-dusk. Pilgrimage site—visit with respect.',
  'Multiple streams and water tanks along route. Refill opportunities at temple premises.',
  'Base villages (Kusur, Khandas) have weak/no network. Jio 4G may work on lower slopes.',
  'Nearest hospital: Karjat Civil Hospital (25km away). Mobile emergency: alert fellow trekkers.',
  'Karjat Civil Hospital (~25km), Pune medical facilities (75km via highway)',
  'https://nomadsofindia.com/trekking-destinations/bhimashankar-trek-complete-guide/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://www.escape2explore.com/blog/trekking/into-the-heart-of-history-the-kothaligad-experience/
-- source: https://indiahikes.com/documented-trek/kothaligad-peth-fort-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'kothaligad-trek',
  'Kothaligad (Peth) Fort Trek',
  'lonavala',
  'moderate',
  1,
  1080,
  4,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
  false,
  true,
  10,
  'moderate',
  'A steep 4km climb to the "Funnel Fort" (Peth Fort), famous for its narrow funnel-shaped passage and dramatic cliff edges. Popular monsoon trek with lush green surroundings near Lonavala.',
  '[
    "Unique funnel-shaped gateway passage",
    "Spectacular cliff edges and panoramic views",
    "Well-preserved Shivaji-era fort structure",
    "Excellent monsoon trekking destination"
  ]',
  '[
    "Steep rocky sections require good footing",
    "Narrow funnel passage can be slippery when wet",
    "Exposed cliff sections—not suitable for fear of heights",
    "Swift weather changes in monsoon season"
  ]',
  '[
    "Sturdy trekking shoes with grip",
    "Rain jacket and waterproof bag",
    "2-3 liters water",
    "Energy bars and light lunch",
    "First aid kit"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Ambivli Village to Kothaligad Fort Summit",
      "distance_km": 4,
      "altitude_m": 1080,
      "hours": 3,
      "terrain": "Steep rocky ascent, narrow passages, exposed sections",
      "description": "Start from Ambivli village and climb steeply through forests. The iconic funnel-shaped gate entrance is narrow and requires careful navigation. Summit offers 360° views of neighboring forts.",
      "campsite": null,
      "meals": "Pack light lunch; water at base village",
      "water": "Base village tap; limited en route"
    }
  ]',
  '[
    {"name": "Ambivli Base Village", "lat": 18.92, "lng": 73.40, "altitude_m": 460, "day": 1, "type": "trailhead"},
    {"name": "First Ascent Slope", "lat": 18.93, "lng": 73.40, "altitude_m": 650, "day": 1, "type": "junction"},
    {"name": "Funnel Gate Entrance", "lat": 18.94, "lng": 73.39, "altitude_m": 950, "day": 1, "type": "fort-gate"},
    {"name": "Fort Summit & Plateau", "lat": 18.95, "lng": 73.38, "altitude_m": 1080, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹400–600", "with_guide": "₹1200–1800", "with_operator": "₹2000–3000", "note": "Free entry; rappelling available for experienced trekkers (₹500–800 extra)"}',
  'From Lonavala: 23km via Karjat direction. Drive to Ambivli village. Parking available at village entrance.',
  'Free entry to fort. Rappelling requires skill and additional fee. No permits needed.',
  'Water available at Ambivli village. Limited sources on trail; carry sufficient water.',
  'Lonavala has good Jio 4G network. Coverage drops above 800m elevation.',
  'Ambivli village has medical aid centers. Lonavala town (23km) has better facilities.',
  'Lonavala Civil Hospital (23km), Pune medical centers (60km)'
  'https://www.escape2explore.com/blog/trekking/into-the-heart-of-history-the-kothaligad-experience/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://nomadsofindia.com/trekking-destinations/sondai-fort-a-complete-guide/
-- source: https://www.thrillophilia.com/tours/one-day-trek-to-sondai-fort
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'sondai-fort-trek',
  'Sondai Fort Trek',
  'lonavala',
  'easy',
  1,
  480,
  5,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
  false,
  true,
  8,
  'easy',
  'One of Maharashtra''s easiest forts, perfect for beginners and families. A 5km trek through dense forest leading to a 480m-elevation fort with a serene summit plateau. Ideal monsoon destination with lush greenery.',
  '[
    "Beginner-friendly, one of easiest treks in Maharashtra",
    "Serene fort plateau with panoramic views",
    "Lush forest corridor, especially vibrant in monsoon",
    "Quick summit—achievable in 2-3 hours total"
  ]',
  '[
    "Well-defined but narrow forest trail",
    "Steep final 500m approach to fort",
    "Monsoon brings slippery rocks and leeches",
    "Limited shade on final ascent"
  ]',
  '[
    "Comfortable walking shoes",
    "Light rain jacket",
    "1.5–2 liters water",
    "Snacks and energy bars",
    "Sun hat"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Sondewadi Base to Sondai Fort Summit",
      "distance_km": 5,
      "altitude_m": 480,
      "hours": 3,
      "terrain": "Forest trail, rocky sections, steep final climb",
      "description": "Start from Sondewadi village and trek through dense forest with well-marked path. Forest canopy offers shade for most of the ascent. Final 500m climb is steeper but manageable.",
      "campsite": null,
      "meals": "Pack light lunch or snacks; water at village",
      "water": "Village tap at base; limited on trail"
    }
  ]',
  '[
    {"name": "Sondewadi Base Village", "lat": 18.88, "lng": 73.38, "altitude_m": 380, "day": 1, "type": "trailhead"},
    {"name": "Forest Midpoint", "lat": 18.89, "lng": 73.37, "altitude_m": 420, "day": 1, "type": "junction"},
    {"name": "Steep Ascent Begins", "lat": 18.90, "lng": 73.36, "altitude_m": 450, "day": 1, "type": "junction"},
    {"name": "Fort Summit", "lat": 18.91, "lng": 73.35, "altitude_m": 480, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹300–500", "with_guide": "₹800–1200", "with_operator": "₹1500–2500", "note": "Free entry; no permits required"}',
  'From Lonavala: 20km. Drive to Sondewadi village. Basic facilities available; nearest food/accommodation in Lonavala.',
  'Free entry. No permits required. Monument protected by ASI.',
  'Village tap at Sondewadi. Refill before ascent; limited sources on trail.',
  'Lonavala area has good Jio network. Base village has weak signal.',
  'Lonavala town (20km) has medical facilities and ambulance services.',
  'Lonavala Civil Hospital (20km), Pune medical centers (70km)'
  'https://nomadsofindia.com/trekking-destinations/sondai-fort-a-complete-guide/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://treksandtrails.org/blog/korigad-fort/
-- source: https://www.thefreebird.net/treks/korigad-fort
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'korigad-fort-trek',
  'Korigad Fort Trek',
  'lonavala',
  'easy',
  1,
  923,
  5,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
  false,
  true,
  10,
  'easy',
  'Beginner-friendly trek near Aamby Valley with 500–600 well-paved stairs ascending 923m. The fort plateau features two lakes, temples, and panoramic Sahyadri views. Ideal for families and first-time trekkers.',
  '[
    "Well-paved stairs throughout ascent",
    "Two lakes on fort plateau",
    "Ancient Koraidevi temple and cannons",
    "Flat summit allows easy exploration"
  ]',
  '[
    "Consistent elevation gain despite being easy",
    "Sun exposure on upper stairs",
    "Monsoon brings slippery stairs",
    "Limited water sources en route"
  ]',
  '[
    "Sturdy walking shoes with grip",
    "Sun hat and sunscreen",
    "2 liters water minimum",
    "Energy snacks",
    "Light rain jacket"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Peth Shahpur Base to Korigad Fort Summit",
      "distance_km": 5,
      "altitude_m": 923,
      "hours": 2.5,
      "terrain": "Well-maintained stairs, rocky sections, flat summit plateau",
      "description": "Begin from Peth Shahpur village and ascend well-paved stairs through forest. Most of the trek is shaded. Stairs are consistent and manageable for all fitness levels. Summit plateau is completely flat.",
      "campsite": null,
      "meals": "Pack light snacks; water at village",
      "water": "Base village tap; small tanks on plateau"
    }
  ]',
  '[
    {"name": "Peth Shahpur Base", "lat": 18.96, "lng": 73.40, "altitude_m": 500, "day": 1, "type": "trailhead"},
    {"name": "Lower Stairs Section", "lat": 18.97, "lng": 73.39, "altitude_m": 650, "day": 1, "type": "junction"},
    {"name": "Mid-level Plateau", "lat": 18.98, "lng": 73.38, "altitude_m": 800, "day": 1, "type": "junction"},
    {"name": "Upper Stairs & Fort Gate", "lat": 18.99, "lng": 73.37, "altitude_m": 900, "day": 1, "type": "fort-gate"},
    {"name": "Summit Plateau with Lakes", "lat": 19.00, "lng": 73.36, "altitude_m": 923, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹300–500", "with_guide": "₹900–1400", "with_operator": "₹1500–2500", "note": "Free entry; stairs well-maintained by local authorities"}',
  'From Lonavala: 20km via Aamby Valley direction. Drive to Peth Shahpur village. Parking available at village entrance.',
  'Free entry. No permits required. Fort owned by local trust.',
  'Base village tap. Small water tanks on fort plateau. Carry sufficient water.',
  'Lonavala area has good Jio network. Upper plateau has weak signal.',
  'Lonavala town (20km) has basic medical services. Ambulance available.',
  'Lonavala Civil Hospital (20km), Pune medical centers (70km)'
  'https://treksandtrails.org/blog/korigad-fort/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://nomadsofindia.com/trekking-destinations/tikona-fort-trekking-guide/
-- source: https://www.tripadvisor.in/Attraction_Review-g608474-d3704951-Reviews-Tikona_Fort-Lonavala
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'tikona-fort-trek',
  'Tikona Fort Trek',
  'lonavala',
  'easy',
  1,
  1080,
  4,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
  false,
  true,
  10,
  'easy',
  'A 4km trek to the iconic triangular pyramid fort at 1080m elevation. Well-marked path with moderate initial climb followed by a steep but short final ascent. Panoramic 360° Sahyadri views from the summit.',
  '[
    "Unique triangular-pyramid fort shape",
    "Steep but short final ascent (10-15 mins)",
    "360° panoramic views of neighboring forts",
    "Popular with families and photographers"
  ]',
  '[
    "Final ascent is steep and narrow",
    "Exposed sections at summit—avoid in high winds",
    "Monsoon paths become slippery",
    "Strong sun exposure at summit"
  ]',
  '[
    "Sturdy trekking shoes with grip",
    "Light rain jacket",
    "2 liters water",
    "Sun protection and hat",
    "Energy snacks"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Tikona Base to Fort Summit",
      "distance_km": 4,
      "altitude_m": 1080,
      "hours": 2.5,
      "terrain": "Forest trail, rocky sections, steep final scramble",
      "description": "Trek through well-defined forest path with moderate elevation gain. Final 15 minutes involve steep rocky scramble to summit. Wide plateau at top allows 360° exploration.",
      "campsite": null,
      "meals": "Pack light lunch; water at base village",
      "water": "Base village tap; very limited on trail"
    }
  ]',
  '[
    {"name": "Tikona Base Village", "lat": 18.93, "lng": 73.35, "altitude_m": 600, "day": 1, "type": "trailhead"},
    {"name": "Forest Ascent Midpoint", "lat": 18.94, "lng": 73.34, "altitude_m": 800, "day": 1, "type": "junction"},
    {"name": "Steep Ascent Begins", "lat": 18.95, "lng": 73.33, "altitude_m": 1000, "day": 1, "type": "junction"},
    {"name": "Triangular Summit", "lat": 18.96, "lng": 73.32, "altitude_m": 1080, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹300–500", "with_guide": "₹900–1400", "with_operator": "₹1500–2500", "note": "Free entry; ASI-protected monument"}',
  'From Lonavala: 12km. Drive via Lonawala town and follow signs to Tikona fort base. Parking near base village.',
  'Free entry. No permits required. Monument protected by ASI.',
  'Base village tap. Refill before ascent; no sources on trail.',
  'Lonavala area has good Jio network. Summit has weak signal.',
  'Lonavala town (12km) has medical facilities. Emergency: alert other trekkers.',
  'Lonavala Civil Hospital (12km), Pune medical centers (75km)'
  'https://nomadsofindia.com/trekking-destinations/tikona-fort-trekking-guide/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://adventure-pulse.com/trek/tung-fort-trek-pune/
-- source: https://www.thrillophilia.com/attractions/tung-fort
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'tung-fort-trek',
  'Tung Fort Trek',
  'lonavala',
  'moderate',
  1,
  1075,
  6,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
  false,
  false,
  14,
  'moderate',
  'A 6km trek with steep ascent and dramatic cliff edges overlooking Pawna Lake. The narrow ridgeline offers 360° views of neighboring forts (Lohagad, Tikona, Visapur). More adventurous than neighboring forts despite short distance.',
  '[
    "Narrow ridgeline with dramatic cliff edges",
    "360° panoramic views of Pawna Lake and forts",
    "Steep ascent—more adventure than distance suggests",
    "Excellent monsoon photography location"
  ]',
  '[
    "Steep and narrow ridge sections—not for novices",
    "Exposed to wind and rain on ridgeline",
    "Monsoon paths extremely slippery",
    "Avoid in stormy weather"
  ]',
  '[
    "Sturdy trekking boots with excellent grip",
    "Rain jacket and waterproof bag",
    "2-3 liters water",
    "Energy bars and meals",
    "First aid kit"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Tungwadi Base to Tung Fort Summit",
      "distance_km": 6,
      "altitude_m": 1075,
      "hours": 4,
      "terrain": "Steep ascent, narrow ridgeline, exposed cliff sections",
      "description": "Start from Tungwadi village and ascend steeply through forest. Trail becomes narrower as elevation increases. Summit ridgeline is exposed but offers commanding Pawna Lake views.",
      "campsite": null,
      "meals": "Pack substantial lunch; water at village",
      "water": "Base village tap; limited on trail"
    }
  ]',
  '[
    {"name": "Tungwadi Base", "lat": 18.95, "lng": 73.41, "altitude_m": 650, "day": 1, "type": "trailhead"},
    {"name": "Steep Ascent Section", "lat": 18.96, "lng": 73.41, "altitude_m": 800, "day": 1, "type": "junction"},
    {"name": "Ridgeline Approach", "lat": 18.97, "lng": 73.40, "altitude_m": 1000, "day": 1, "type": "junction"},
    {"name": "Tung Fort Summit Ridge", "lat": 18.98, "lng": 73.39, "altitude_m": 1075, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹500–800", "with_guide": "₹1500–2200", "with_operator": "₹2500–4000", "note": "Free entry; guide recommended for first-timers due to steep ridge"}',
  'From Lonavala: 23km. Drive to Tungwadi village (also called Tungi) near Pawna Lake. Parking available at village entrance.',
  'Free entry. No permits required. Local trust maintains fort.',
  'Base village tap. Stream near Pawna dam. Carry sufficient water.',
  'Tungwadi area has weak 4G. Pawna dam area may have Jio signal.',
  'Tungwadi medical aid. Lonavala town (23km) has better facilities.',
  'Lonavala Civil Hospital (23km), Pune medical centers (80km)'
  'https://adventure-pulse.com/trek/tung-fort-trek-pune/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://asoulwindow.com/naneghat-trek/
-- source: https://nomadsofindia.com/trekking-destinations/sondai-fort-trekking-guide/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'naneghat-trek',
  'Naneghat Trek',
  'lonavala',
  'moderate',
  1,
  792,
  8,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2],
  false,
  false,
  14,
  'moderate',
  'An 8km trek along an ancient trade route with natural caves featuring Sanskrit inscriptions from the Satavahana dynasty (2nd-1st century BCE). Naneghat Pass at 792m is a historical passage through the Sahyadri with archaeological significance.',
  '[
    "Ancient Satavahana inscriptions in Brahmi script",
    "Natural caves with historical importance",
    "Ancient trade route pathway",
    "Panoramic views from pass"
  ]',
  '[
    "Moderate ascent but longer distance than most forts",
    "Cave sections can be slippery and muddy in monsoon",
    "Limited shade on open sections",
    "Requires 5-6 hours total trekking time"
  ]',
  '[
    "Sturdy trekking shoes",
    "Light rain jacket",
    "3 liters water (long trek)",
    "Energy snacks and lunch",
    "Torch for cave exploration"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Base Village to Naneghat Pass & Caves",
      "distance_km": 8,
      "altitude_m": 792,
      "hours": 5,
      "terrain": "Mixed forest, cave sections, open ridge trail",
      "description": "Trek through forest following ancient trade route markers. Navigate through natural caves with Satavahana inscriptions. Ascend to Naneghat Pass for panoramic views.",
      "campsite": null,
      "meals": "Pack substantial lunch; water at base",
      "water": "Base village tap; stream near cave section"
    }
  ]',
  '[
    {"name": "Junnar Base Village", "lat": 18.96, "lng": 73.20, "altitude_m": 450, "day": 1, "type": "trailhead"},
    {"name": "Forest Trail Midpoint", "lat": 18.97, "lng": 73.21, "altitude_m": 550, "day": 1, "type": "junction"},
    {"name": "Cave Entrance Section", "lat": 18.98, "lng": 73.22, "altitude_m": 650, "day": 1, "type": "cave"},
    {"name": "Satavahana Inscription Area", "lat": 18.99, "lng": 73.23, "altitude_m": 700, "day": 1, "type": "viewpoint"},
    {"name": "Naneghat Pass Summit", "lat": 19.00, "lng": 73.24, "altitude_m": 792, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹600–900", "with_guide": "₹1800–2500", "with_operator": "₹2500–4000", "note": "Free entry; archaeological site—treat with respect"}',
  'From Lonavala: 145km northeast. From Pune: 122km north. Nearest town: Junnar. Drive to base village; auto-rickshaws available.',
  'Free entry. ASI-protected archaeological site. No permits needed. Cave sections are natural—use care.',
  'Base village tap. Stream near cave section. Carry 3+ liters due to trek length.',
  'Junnar town has weak network. Base village has very limited signal.',
  'Junnar town medical center (nearby). Emergency: local guides can assist.',
  'Junnar Hospital, Ahmednagar Medical Facilities (50km), Pune (120km)'
  'https://asoulwindow.com/naneghat-trek/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://nomadsofindia.com/trekking-destinations/harishchandragad-trek-complete-guide/
-- source: https://indiahikes.com/documented-trek/harishchandragad-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'harishchandragad-trek',
  'Harishchandragad Trek',
  'bhandardara',
  'hard',
  1,
  1424,
  11,
  ARRAY[10, 11, 12, 1, 2, 3, 4],
  false,
  false,
  16,
  'hard',
  'An 11km trek via the Pachnai route (easiest) or Khireshwar trail (moderate-hard) to reach the historic fort at 1424m elevation. The legendary Konkan Kada cliff offers a sheer vertical 600m overhang with breathtaking sunset views. A fortress of immense archaeological and spiritual significance.',
  '[
    "Konkan Kada vertical cliff—iconic 600m overhang",
    "Kedareshwar Cave with natural spring",
    "Sapta Tirta Pushkarini—seven sacred ponds",
    "Spectacular sunset views from cliff edge",
    "Harishchandreshwar Temple at summit"
  ]',
  '[
    "Hard physical difficulty—requires good fitness",
    "Steep ascent with 1000m+ elevation gain",
    "Exposed cliff sections—not for fear of heights",
    "Monsoon routes become treacherous",
    "Remote location—limited rescue options"
  ]',
  '[
    "Professional trekking boots with excellent grip",
    "Rain jacket and waterproof bag",
    "3-4 liters water (long trek)",
    "Substantial meals and energy snacks",
    "First aid kit and emergency supplies",
    "Headlamp for cave sections"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Pachnai Base to Harishchandragad Summit via Konkan Kada",
      "distance_km": 11,
      "altitude_m": 1424,
      "hours": 6,
      "terrain": "Forest trail, steep ascent, cave sections, exposed cliff ridge",
      "description": "Start from Pachnai base village. Ascend through dense forest with multiple stream crossings. Reach Kedareshwar Cave midway. Continue steep ascent to fort plateau. Navigate to Konkan Kada for sunset views.",
      "campsite": null,
      "meals": "Pack substantial lunch; water at springs",
      "water": "Kedareshwar spring; Sapta Tirta ponds on plateau"
    }
  ]',
  '[
    {"name": "Pachnai Base Village", "lat": 19.17, "lng": 73.92, "altitude_m": 400, "day": 1, "type": "trailhead"},
    {"name": "Lower Forest Section", "lat": 19.18, "lng": 73.91, "altitude_m": 650, "day": 1, "type": "junction"},
    {"name": "Kedareshwar Cave", "lat": 19.19, "lng": 73.90, "altitude_m": 900, "day": 1, "type": "cave"},
    {"name": "Mid-Plateau Section", "lat": 19.20, "lng": 73.89, "altitude_m": 1200, "day": 1, "type": "junction"},
    {"name": "Harishchandreshwar Temple", "lat": 19.21, "lng": 73.88, "altitude_m": 1380, "day": 1, "type": "fort-gate"},
    {"name": "Konkan Kada Cliff Edge", "lat": 19.22, "lng": 73.87, "altitude_m": 1424, "day": 1, "type": "viewpoint"}
  ]',
  '{"budget": "₹800–1200", "with_guide": "₹2500–3500", "with_operator": "₹4000–6000", "note": "Free entry; guide recommended for route navigation and safety"}',
  'From Bhandardara: 25km northeast. From Nashik: 60km south. Drive to Pachnai or Khireshwar base village. Limited accommodation in Bhandardara.',
  'Free entry. No permits required. Spiritual site—visit with respect. Multiple routes available (Pachnai = easiest, Nalichi Vaat = hardest technical climb).',
  'Kedareshwar spring provides water midway. Sapta Tirta ponds at plateau. Carry 3+ liters.',
  'Pachnai village has very weak signal. No network at higher elevations.',
  'Bhandardara town (25km) has medical facilities. Emergency: guide assistance essential.',
  'Bhandardara Primary Health Center (25km), Nashik medical facilities (85km)'
  'https://nomadsofindia.com/trekking-destinations/harishchandragad-trek-complete-guide/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://indiahikes.com/documented-trek/kalsubai-peak-trek (already exists in DB; included for completeness)
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'kalsubai-trek-alt',
  'Kalsubai Peak Trek (Highest Peak)',
  'bhandardara',
  'moderate-hard',
  1,
  1646,
  7,
  ARRAY[11, 12, 1, 2, 3, 4, 5],
  false,
  false,
  14,
  'moderate-hard',
  'A 7km trek to Maharashtra''s highest peak at 1646m elevation via 4 iron ladders. Ascend through forest to Kalsubai plateau. The Kalsubai Temple sits atop the mountain with breathtaking Sahyadri and Bhandardara Dam views.',
  '[
    "Maharashtra''s highest peak at 1646m",
    "Four fixed iron ladders for technical ascent",
    "Kalsubai Temple at summit",
    "Panoramic views of Bhandardara Dam and surrounding peaks",
    "Excellent sunrise/sunset location"
  ]',
  '[
    "Iron ladder sections require strength and care",
    "Steep exposed sections—not for vertigo sufferers",
    "Weather can change rapidly at high elevation",
    "Descent is more challenging than ascent"
  ]',
  '[
    "Sturdy trekking boots with grip",
    "Rain jacket and waterproof bag",
    "2-3 liters water",
    "Energy snacks and meals",
    "Gloves helpful for ladder grip"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Bari Base to Kalsubai Peak via Iron Ladders",
      "distance_km": 7,
      "altitude_m": 1646,
      "hours": 4,
      "terrain": "Forest trail, ladder sections, steep rocky ascent",
      "description": "Start from Bari village and ascend through forest. Encounter four fixed iron ladder sections. Final ascent is steep but well-marked. Summit plateau is small but offers 360° views.",
      "campsite": null,
      "meals": "Pack lunch and energy snacks; water at base",
      "water": "Base village tap; no reliable sources on trail; temple tank may have water"
    }
  ]',
  '[
    {"name": "Bari Base Village", "lat": 19.14, "lng": 73.93, "altitude_m": 550, "day": 1, "type": "trailhead"},
    {"name": "Forest Ascent Start", "lat": 19.15, "lng": 73.92, "altitude_m": 750, "day": 1, "type": "junction"},
    {"name": "First Iron Ladder Section", "lat": 19.16, "lng": 73.91, "altitude_m": 1100, "day": 1, "type": "junction"},
    {"name": "Upper Ladder Section", "lat": 19.17, "lng": 73.90, "altitude_m": 1400, "day": 1, "type": "junction"},
    {"name": "Kalsubai Temple Summit", "lat": 19.18, "lng": 73.89, "altitude_m": 1646, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹700–1000", "with_guide": "₹2000–3000", "with_operator": "₹3500–5500", "note": "Free entry; guide recommended for ladder navigation"}',
  'From Bhandardara: 12km south. From Nashik: 65km south. Drive to Bari base village. Auto-rickshaws available from Kasara train station.',
  'Free entry. No permits required. Well-established trekking route.',
  'Bari village tap at base. Refill here before ascent. Temple tank at summit may have water.',
  'Bari village has weak Jio signal. No network at higher elevations.',
  'Bhandardara town (12km) has medical services. Emergency: guide assistance needed.',
  'Bhandardara Health Center (12km), Nashik medical facilities (80km)'
  'https://indiahikes.com/documented-trek/kalsubai-peak-trek',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;

-- source: https://nomadsofindia.com/trekking-destinations/peb-fort-an-ultimate-guide/
-- source: https://indiahikes.com/documented-trek/peb-fort-trek-vikatgad
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'karjat-peb-vikatgad',
  'Peb/Vikatgad Fort Trek',
  'lonavala',
  'moderate',
  1,
  740,
  6,
  ARRAY[6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
  false,
  true,
  12,
  'moderate',
  'A 6km trek to the historic Peb Fort (also called Vikatgad) at 740m elevation. Located on the Matheran hill range near Karjat, this moderate trek offers impressive fort structures and panoramic valley views. Popular alternative to crowded Matheran trails.',
  '[
    "Well-preserved fort structures and ramparts",
    "Panoramic valley and Matheran range views",
    "Moderate difficulty—good for intermediate trekkers",
    "Less crowded than nearby Matheran treks"
  ]',
  '[
    "Steep initial approach to fort plateau",
    "Exposed cliff sections—use caution",
    "Monsoon paths become slippery",
    "Limited shade on open sections"
  ]',
  '[
    "Sturdy trekking shoes with grip",
    "Light rain jacket",
    "2-3 liters water",
    "Energy snacks and lunch",
    "Sun hat and sunscreen"
  ]',
  '[]',
  '[
    {
      "day": 1,
      "title": "Neral/Matheran Base to Peb Fort Summit",
      "distance_km": 6,
      "altitude_m": 740,
      "hours": 3.5,
      "terrain": "Forest trail, steep rocky sections, exposed passages",
      "description": "Trek from Neral village or Matheran toy-train base. Ascend through forest with moderate elevation gain. Final approach is steep. Fort plateau offers commanding valley views.",
      "campsite": null,
      "meals": "Pack lunch and snacks; water at base",
      "water": "Neral village tap; limited on trail"
    }
  ]',
  '[
    {"name": "Neral Base Village", "lat": 19.01, "lng": 73.30, "altitude_m": 450, "day": 1, "type": "trailhead"},
    {"name": "Forest Midpoint", "lat": 19.02, "lng": 73.29, "altitude_m": 550, "day": 1, "type": "junction"},
    {"name": "Steep Ascent Begins", "lat": 19.03, "lng": 73.28, "altitude_m": 650, "day": 1, "type": "junction"},
    {"name": "Fort Gate & Plateau", "lat": 19.04, "lng": 73.27, "altitude_m": 700, "day": 1, "type": "fort-gate"},
    {"name": "Vikatgad Summit", "lat": 19.05, "lng": 73.26, "altitude_m": 740, "day": 1, "type": "summit"}
  ]',
  '{"budget": "₹400–700", "with_guide": "₹1200–1800", "with_operator": "₹2000–3500", "note": "Free entry; accessible via Matheran toy-train (₹100 return)"}',
  'From Karjat: 20km. Drive to Neral village or board toy-train to Matheran. Base village accessible from both starting points.',
  'Free entry. No permits required. ASI-protected monument.',
  'Neral village tap. Refill here. Limited sources on trail.',
  'Neral/Matheran area has decent Jio coverage. Higher elevations have weak signal.',
  'Neral medical center (nearby). Karjat hospital (20km).',
  'Karjat Civil Hospital (20km), Lonavala Civil Hospital (35km), Pune medical centers (90km)'
  'https://nomadsofindia.com/trekking-destinations/peb-fort-an-ultimate-guide/',
  '2026-05-27'
) ON CONFLICT (id) DO NOTHING;
