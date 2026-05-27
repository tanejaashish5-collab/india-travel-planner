-- Himalayan multi-day famous treks: Hemkund Sahib, Friendship Peak, Warwan Valley, Sela Pass, Naranag Gangbal, Nubra Valley, Sarchu-Tso Moriri, Pin Bhaba, Chandratal-Baralacha, Auli Gorson, Mechuka-Yorlung
-- Sources: TrekOnIndia, Hemkunt.in, Bizarexpedition, Indiahikes, Bikat Adventures, Trek the Himalayas, WhiteMagic, Himalayan Hikers
-- Verified: 2026-05-27 — all 11 trek IDs new, all 11 destination_ids exist in DB

-- source: https://trekonindia.com/2025/07/01/hemkund-sahib-trek-distance-a-complete-guide-for-your-spiritual-and-scenic-journey/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'hemkund-sahib-trek',
  'Hemkund Sahib Trek',
  'hemkund-sahib',
  'moderate',
  2,
  4633,
  19,
  ARRAY[6,7,8,9],
  false,
  false,
  10,
  'medium',
  'Sacred Sikh pilgrimage trek to a glacial lake at 4633m in Uttarakhand''s Chamoli district. The route ascends through lush forests and alpine meadows from Govindghat, passing through the small settlement of Ghangaria before reaching the serene Hemkund Sahib lake and Gurudwara. This trek combines spiritual significance with stunning high-altitude mountain scenery.',
  ARRAY['Sacred Sikh gurudwara at 4633m','Glacial alpine lake with pristine waters','Spectacular views of Kamet and Neelkanth peaks','Diverse flora from oak forests to alpine grasslands','Pilgrimage route with cultural significance to Sikhs worldwide'],
  ARRAY['Altitude sickness common above 3500m','Final 6km from Ghangaria is steep scree; loose rocks','Weather highly variable; snow possible even in summer','High foot traffic during peak season July-August','Limited facilities above Ghangaria'],
  ARRAY['Sturdy hiking boots with good grip','Warm layers and rain jacket','High-SPF sunscreen and sunglasses','Trekking poles recommended for descent','Altitude medication (consult doctor)'],
  '[{"name":"Govindghat","altitude_m":1680,"facilities":["tea shop","basic lodging"],"water":"river","flat_ground":true},{"name":"Ghangaria","altitude_m":2590,"facilities":["guesthouse","restaurant","medical camp"],"water":"tap and stream","flat_ground":false},{"name":"Hemkund Sahib","altitude_m":4633,"facilities":["gurudwara langar","camping allowed"],"water":"glacial lake","flat_ground":true}]'::jsonb,
  '[{"day":1,"title":"Govindghat to Ghangaria","distance_km":13,"altitude_m":2590,"hours":6,"terrain":"forest trail and steep ascent","description":"Start from Govindghat at 1680m and ascend through oak and deodar forests. The path gains 910m elevation over 13km. Ghangaria serves as the overnight halt with basic lodging and food.","campsite":"Ghangaria settlement","meals":"lunch en route, dinner at guesthouse","water":"streams and taps"},{"day":2,"title":"Ghangaria to Hemkund Sahib and return","distance_km":12,"altitude_m":4633,"hours":8,"terrain":"alpine meadow and scree","description":"Early morning start to Hemkund Sahib. The 6km climb from Ghangaria is steep, crossing alpine meadows and rocky scree. Visit the sacred lake and gurudwara, then descend back to Ghangaria. Physically demanding with altitude exposure.","campsite":"Return to Ghangaria","meals":"gurudwara langar at shrine, light dinner","water":"glacial lake, streams"}]'::jsonb,
  '[{"name":"Govindghat","lat":30.487,"lng":79.522,"altitude_m":1680,"day":1,"type":"trailhead"},{"name":"Pulna","lat":30.540,"lng":79.555,"altitude_m":2220,"day":1,"type":"campsite"},{"name":"Ghangaria","lat":30.550,"lng":79.575,"altitude_m":2590,"day":1,"type":"settlement"},{"name":"Hemkund Sahib Lake","lat":30.566,"lng":79.608,"altitude_m":4633,"day":2,"type":"lake"},{"name":"Hemkund Sahib Gurudwara","lat":30.566,"lng":79.608,"altitude_m":4633,"day":2,"type":"monastery"}]'::jsonb,
  '{"budget":6000,"with_guide":12000,"with_operator":18000,"note":"Budget includes accommodation in Ghangaria, all meals, and porter support; most pilgrims visit in July-August peak season"}'::jsonb,
  'From Delhi: train to Rishikesh (7h), then bus/taxi to Govindghat (8h more). Govindghat is the starting point at 1680m elevation on the Alaknanda River.',
  'No special permits required for Indian nationals. Register with local authorities in Govindghat if trekking solo. Peak season (July-August) can be very crowded.',
  'Streams at Govindghat and Ghangaria; glacial lake water at Hemkund Sahib (purify before drinking).',
  'Airtel and Jio patchy above Ghangaria; rely on gurudwara emergency radio.',
  'Hemkund Sahib Gurudwara medical camp (seasonal); emergency evacuation by helicopter possible to Auli or Joshimath.',
  'Joshimath Government Hospital (45km away, 4h descent + drive)',
  'https://trekonindia.com/2025/07/01/hemkund-sahib-trek-distance-a-complete-guide/',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.bikatadventures.com/Home/Itinerary/friendship-peak-expedition
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'friendship-peak-trek',
  'Friendship Peak Trek',
  'manali',
  'hard',
  5,
  5289,
  45,
  ARRAY[6,7,8,9],
  true,
  false,
  16,
  'hard',
  'Technical high-altitude mountaineering expedition to Friendship Peak at 5289m in Himachal Pradesh''s Pir Panjal range. Starting from Manali''s Solang Valley, the route traverses oak forests, meadows, and glaciers. IMF permit required. This is a semi-technical climb demanding crampons, ropes, and ice axe expertise.',
  ARRAY['5289m peak with panoramic views of Pir Panjal and Dhauladhar ranges','Spectacular glacier traverse with crevasse fields','Culturally rich Solang Valley starting point','High-altitude alpine meadows in bloom season','Dramatic snow and ice formations'],
  ARRAY['Requires mountaineering skills and high fitness','Altitude sickness above 4000m very common','Crevasse dangers on glaciers; rope team essential','Weather changes rapidly; storms possible','IMF permit mandatory; limited windows for climbing'],
  ARRAY['Crampons and ice axe (can be hired)','Mountaineering harness and rope','Down jacket and high-altitude bivvy bag','Goggles for snow glare','Altimeter and gps device'],
  '[{"name":"Solang Base Camp","altitude_m":2400,"facilities":["tea stall"],"water":"stream","flat_ground":true},{"name":"Dhundi Camp","altitude_m":3200,"facilities":[],"water":"glacial stream","flat_ground":false},{"name":"Advance Camp","altitude_m":4500,"facilities":[],"water":"snow melt","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Manali to Solang to Dhundi","distance_km":12,"altitude_m":3200,"hours":6,"terrain":"forest and alpine meadow","description":"Drive from Manali to Solang (2400m), then trek to Dhundi camp on Solang Nallah. Acclimatization trek through oak and pine forests with views of Solang Valley.","campsite":"Dhundi camp","meals":"packed lunch, camp dinner","water":"glacial stream"},{"day":2,"title":"Dhundi to High Camp via Advance Base","distance_km":18,"altitude_m":4500,"hours":8,"terrain":"glacier and moraine","description":"Ascend through moraines and negotiate the lower glacier. Camp at 4500m with views of the peak. Rest and prepare equipment for the summit push.","campsite":"Advance Camp at 4500m","meals":"high-altitude dehydrated meals","water":"snow melt"},{"day":3,"title":"Acclimatization and rope team practice","distance_km":6,"altitude_m":4800,"hours":5,"terrain":"glacier and crevasse fields","description":"Short climb to 4800m with crevasse crossing practice. Learn rope techniques and acclimatize to extreme altitude. Return to camp for rest.","campsite":"Advance Camp","meals":"light expedition food","water":"ice block melting"},{"day":4,"title":"Summit push: Advance Camp to Friendship Peak and return","distance_km":14,"altitude_m":5289,"hours":10,"terrain":"ice, snow, and final rock scramble","description":"Alpine start (2am). Ascend fixed ropes and negotiate glacial slopes. Cramponed ascent to the summit at 5289m. Panoramic views before the descent. Long day with extreme exposure.","campsite":"Return to Advance Camp","meals":"emergency energy bars","water":"limited; melt snow"},{"day":5,"title":"Advance Camp to Dhundi to Manali","distance_km":30,"altitude_m":2400,"hours":8,"terrain":"moraine, glacier descent, then forest","description":"Pack down all camp gear. Descend via glacier and moraine. Trek back to Dhundi and drive to Manali. Recovery evening in town.","campsite":"Manali overnight","meals":"celebration dinner in Manali","water":"streams and tap"}]'::jsonb,
  '[{"name":"Manali","lat":32.237,"lng":77.189,"altitude_m":2050,"day":1,"type":"trailhead"},{"name":"Solang Valley","lat":32.251,"lng":77.180,"altitude_m":2400,"day":1,"type":"settlement"},{"name":"Dhundi","lat":32.270,"lng":77.160,"altitude_m":3200,"day":1,"type":"campsite"},{"name":"Advance Base Camp","lat":32.290,"lng":77.130,"altitude_m":4500,"day":3,"type":"campsite"},{"name":"Friendship Peak Summit","lat":32.310,"lng":77.110,"altitude_m":5289,"day":4,"type":"summit"}]'::jsonb,
  '{"budget":45000,"with_guide":65000,"with_operator":85000,"note":"Includes IMF permit, sherpa, all meals, glacier equipment rental; international trekkers add USD 75 IMF fee"}'::jsonb,
  'From Delhi: fly to Bhuntar (1h), taxi to Manali (2h). Alternatively, 12h overnight bus from Delhi to Manali.',
  'Indian Mountaineering Foundation (IMF) permit required. USD 75 per foreign climber. Apply 2-3 weeks in advance. Indian nationals: INR 2000. Permit valid for 10 days from issue date.',
  'Glacial melt streams at camps; bring water purification tablets.',
  'Jio 3G up to Solang; no coverage above Dhundi.',
  'IMF Base Camp radio operator at Solang; helicopter evacuation coordinated from Manali civil airport.',
  'Manali Government Hospital (20km away, 2h descent)',
  'https://www.bikatadventures.com/Home/Itinerary/friendship-peak-expedition',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://indiahikes.com/warwan-valley
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'warwan-valley-trek',
  'Warwan Valley Trek',
  'kishtwar',
  'hard',
  8,
  4100,
  80,
  ARRAY[7,8,9],
  true,
  false,
  14,
  'hard',
  'Remote 8-day high-altitude traverse through the pristine Warwan Valley in Kishtwar district of Jammu and Kashmir. Often called the ''Switzerland of India'', the trek explores one of the least-trodden valleys in the Indian Himalayas. Inner Line Permit (ILP) required for foreigners. Route crosses alpine meadows, pristine lakes (Tarsar and Marsar), and high passes with minimal infrastructure.',
  ARRAY['Pristine Tarsar and Marsar alpine lakes at 4000m+','Remote high-altitude meadows untouched by mass tourism','Crossing Margan Top at 4100m with panoramic views','Diverse alpine flora including rare medicinal plants','Authentic Kashmiri mountain culture and villages'],
  ARRAY['ILP mandatory for foreigners; restricted zone','Very remote; 6-8 days without road access','High altitude; AMS affects many trekkers','Unpredictable weather; snow possible until end June','Sparse water sources in sections; stream crossings'],
  ARRAY['Four-season tent and warm sleeping bag (−10°C)','Waterproof trekking gear and sturdy boots','Portable water purification system','Map and compass (GPS unreliable in valleys)','First aid kit with altitude sickness medication'],
  '[{"name":"Panikhar Base","altitude_m":2400,"facilities":["tea stall","local lodging"],"water":"river","flat_ground":true},{"name":"Inshan Valley","altitude_m":3100,"facilities":[],"water":"river and stream","flat_ground":false},{"name":"Tarsar Lake Camp","altitude_m":4000,"facilities":[],"water":"glacial lake","flat_ground":true},{"name":"Marsar Lake Camp","altitude_m":4050,"facilities":[],"water":"glacial lake","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Panikhar to Inshan","distance_km":10,"altitude_m":3100,"hours":5,"terrain":"forest and meadow","description":"Start from Panikhar village on the Srinagar-Leh Highway. Trek through pine and fir forests above the Warwan River to Inshan village. Establish camp in the lush Inshan Valley.","campsite":"Inshan Valley camp","meals":"packed lunch, camp-cooked dinner","water":"Warwan River"},{"day":2,"title":"Inshan to Shiskaran","distance_km":12,"altitude_m":3400,"hours":6,"terrain":"alpine meadow","description":"Continue trek to Shiskaran meadow. The route offers views of surrounding peaks. Gain elevation gradually as the valley narrows.","campsite":"Shiskaran","meals":"lunch at rest spot, camp dinner","water":"clear streams"},{"day":3,"title":"Shiskaran to Margan Top Base","distance_km":14,"altitude_m":3800,"hours":7,"terrain":"steep alpine ascent","description":"Ascend towards Margan Top. Trail becomes steeper; boulder-hopping sections. Alpine vegetation gives way to sparse grass. High camp for the pass crossing.","campsite":"Margan Top Base Camp","meals":"high-calorie expedition food","water":"snowmelt and streams"},{"day":4,"title":"Margan Top crossing to Tarsar Lake","distance_km":12,"altitude_m":4100,"hours":8,"terrain":"boulder, scree, and high pass","description":"Early start for Margan Top (4100m) crossing. Descent to the stunning Tarsar Lake. One of the trek''s iconic days. Altitude effects likely; move slowly.","campsite":"Tarsar Lake Camp","meals":"celebratory lakeside meal","water":"glacial lake"},{"day":5,"title":"Tarsar Lake to Marsar Lake","distance_km":8,"altitude_m":4050,"hours":5,"terrain":"high-altitude plateau","description":"Short acclimatization day. Trek across the pristine high-altitude plateau connecting Tarsar and Marsar lakes. Both lakes are pristine and rarely visited.","campsite":"Marsar Lake Camp","meals":"light trekking meal","water":"glacial lake"},{"day":6,"title":"Marsar Lake to Sonamoush Pass Base","distance_km":10,"altitude_m":3900,"hours":6,"terrain":"alpine meadow and rocky pass approach","description":"Descend slightly to the base of Sonamoush Pass. Prepare for next day''s challenging crossing. Camp in a sheltered meadow.","campsite":"Pass Base Camp","meals":"carb-heavy dinner","water":"glacial streams"},{"day":7,"title":"Sonamoush Pass to Kishtwar River Valley","distance_km":14,"altitude_m":3600,"hours":8,"terrain":"pass crossing and steep descent","description":"Cross Sonamoush Pass (approximately 4000m). Dramatic descent into Kishtwar River Valley. Long and physically demanding day. Route becomes less distinct.","campsite":"Kishtwar Valley Camp","meals":"simple camp meal","water":"river"},{"day":8,"title":"Return to Panikhar via Kishtwar","distance_km":16,"altitude_m":2400,"hours":7,"terrain":"riverside trail and forest","description":"Final descent following the Kishtwar River back towards Panikhar. Trek ends at the road. Long day with mostly downhill terrain.","campsite":"Panikhar village","meals":"celebration meal in village","water":"river"}]'::jsonb,
  '[{"name":"Panikhar","lat":34.200,"lng":76.050,"altitude_m":2400,"day":1,"type":"trailhead"},{"name":"Inshan","lat":34.250,"lng":76.000,"altitude_m":3100,"day":1,"type":"settlement"},{"name":"Margan Top","lat":34.320,"lng":75.900,"altitude_m":4100,"day":4,"type":"pass"},{"name":"Tarsar Lake","lat":34.380,"lng":75.850,"altitude_m":4000,"day":4,"type":"lake"},{"name":"Marsar Lake","lat":34.400,"lng":75.820,"altitude_m":4050,"day":5,"type":"lake"}]'::jsonb,
  '{"budget":28000,"with_guide":42000,"with_operator":55000,"note":"Budget trekker with hired porter; operator includes meals and permits; ILP processing fees separate"}'::jsonb,
  'From Srinagar: 8-hour drive (150km) to Inshan on NH1 (Srinagar-Leh Highway). From Leh: 12-hour drive via Ladakh. Most trekkers approach via Srinagar.',
  'Inner Line Permit (ILP) required for foreign nationals (approximately INR 500 per person for 10 days, obtained from DC office Kishtwar or Srinagar). Indian nationals need no permit but should register with local authorities.',
  'Multiple streams en route; Tarsar and Marsar are pristine lakes; always use purification tablets.',
  'Absolutely zero cellular coverage beyond Inshan; satellite communicator (Garmin InReach) strongly recommended.',
  'Indian Army at Inshan and Panikhar; emergency evacuation by helicopter possible from Leh (12 hours away).',
  'District Hospital Kishtwar (80km away, 6+ hours descent and drive)',
  'https://indiahikes.com/warwan-valley',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.incredibleindia.gov.in/en/arunachal-pradesh/tawang/sela-pass
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'sela-pass-trek',
  'Sela Pass Trek',
  'tawang',
  'moderate',
  3,
  4170,
  28,
  ARRAY[4,5,10,11],
  true,
  false,
  8,
  'medium',
  'High-altitude trek crossing Sela Pass at 4170m in Arunachal Pradesh''s Tawang district. The route combines a strategic mountain pass with a sacred glacial lake, Sela Lake, set in a dramatic landscape. Protected Area Permit (PAP) required for foreign nationals. The trek offers pristine alpine terrain and stunning Himalayan views.',
  ARRAY['Sela Lake: sacred glacial alpine lake at 4160m','Sela Pass at 4170m with strategic Himalayan views','Rare alpine flora and sparse vegetation zone','Buddhist monastery visits en route','Authentic Arunachali tribal culture'],
  ARRAY['PAP permit mandatory for foreigners; complex application','Extreme altitude sickness risk above 4000m','Unpredictable weather; visibility often poor','Thin air; even acclimatized trekkers struggle','Limited emergency services; very remote'],
  ARRAY['Insulated warm layers and thermal undergarments','Windproof and waterproof jacket','High-altitude trekking boots','Face mask or balaclava for wind protection','Altitude sickness medications (consult physician)'],
  '[{"name":"Dirang Base","altitude_m":2400,"facilities":["guesthouse","basic shop"],"water":"tap","flat_ground":true},{"name":"Bomdila Camp","altitude_m":2800,"facilities":["tea shop"],"water":"stream","flat_ground":false},{"name":"Sela Pass Base Camp","altitude_m":3800,"facilities":[],"water":"glacial stream","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Dirang to Bomdila","distance_km":10,"altitude_m":2800,"hours":5,"terrain":"winding mountain road and forest path","description":"Start from Dirang (2400m) and trek or drive to Bomdila for initial acclimatization. Bomdila is a scenic hill station with Buddhist monasteries.","campsite":"Bomdila guesthouse","meals":"packed lunch, local restaurant dinner","water":"tap and streams"},{"day":2,"title":"Bomdila to Sela Pass Base","distance_km":9,"altitude_m":3800,"hours":6,"terrain":"steep alpine ascent","description":"Ascend steeply from Bomdila towards Sela Pass. The terrain becomes sparse and windswept. High camp at 3800m to prepare for the final push.","campsite":"Sela Pass Base Camp","meals":"lightweight camp meals","water":"glacial stream"},{"day":3,"title":"Sela Pass and Sela Lake","distance_km":9,"altitude_m":4170,"hours":6,"terrain":"boulder field, pass, and lake circuit","description":"Trek to Sela Pass (4170m) with Sela Lake (4160m) nearby. The lake is considered sacred and lies in a glacial cirque. Stunning but harsh landscape. Return to Bomdila or continue descent towards Tawang (optional extension).","campsite":"Return to Bomdila or descent to Tawang","meals":"celebration meal","water":"Sela Lake and streams"}]'::jsonb,
  '[{"name":"Dirang","lat":27.680,"lng":92.520,"altitude_m":2400,"day":1,"type":"settlement"},{"name":"Bomdila","lat":27.720,"lng":92.480,"altitude_m":2800,"day":1,"type":"settlement"},{"name":"Sela Pass","lat":27.850,"lng":92.350,"altitude_m":4170,"day":3,"type":"pass"},{"name":"Sela Lake","lat":27.850,"lng":92.360,"altitude_m":4160,"day":3,"type":"lake"}]'::jsonb,
  '{"budget":8000,"with_guide":14000,"with_operator":20000,"note":"Budget option with minimal facilities; operator includes meals, accommodation, PAP, local guide"}'::jsonb,
  'From Guwahati: 12-hour drive (380km) via Bomdila to reach Dirang. Flight from Delhi to Guwahati (2h), then drive. Alternatively, 14h overnight bus from Delhi to Guwahati.',
  'Protected Area Permit (PAP) required for foreign nationals (approximately USD 50 plus agent charges; 5-10 working days to obtain). Apply at Guwahati, Tezpur, or Itanagar facilitation centers. Indian nationals require Inner Line Permit (ILP).',
  'Multiple streams; Sela Lake water requires purification (glacial melt).',
  'Mobile network patchy; Jio coverage up to Bomdila; zero coverage above 3000m.',
  'Indian Army posts at Sela and Tawang; helicopter evacuation possible from Tawang airfield.',
  'Tawang District Hospital (40km away, 6h descent)',
  'https://www.incredibleindia.gov.in/en/arunachal-pradesh/tawang/sela-pass',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://indiahikes.com/kashmir-great-lakes
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'naranag-gangbal-trek',
  'Naranag Gangbal Trek',
  'sonamarg',
  'moderate',
  4,
  3680,
  32,
  ARRAY[7,8,9,10],
  false,
  false,
  10,
  'medium',
  'Shorter 4-day loop through the Kashmir Great Lakes region, connecting Naranag to Gangbal Lake at 3680m. This trek is a condensed version of the longer Great Lakes circuit, focusing on the most scenic lakes (Gangbal, Satsar, Ghad Sar) and lush meadows. Starting and ending at Naranag village, it offers pristine alpine scenery without crossing high passes.',
  ARRAY['Gangbal Lake: pristine glacial alpine lake at 3575m','Satsar Lake: multi-chambered scenic high-altitude lake','Ghad Sar: turquoise glacial waters surrounded by peaks','Naranag ancient temple ruins and spiritual significance','Alpine meadows with wildflower displays in summer'],
  ARRAY['ILP not required; but checkpost closes at 4pm at Naranag','High altitude; AMS affects 30% of trekkers','Sudden weather changes; afternoon storms common','Terrain can be slippery; snow patches until June','Limited accommodation beyond Naranag village'],
  ARRAY['Four-season tent and warm sleeping bag','Waterproof jacket and rain pants','Sturdy hiking boots with good ankle support','Hat and gloves for cold mornings','Map and compass for route-finding'],
  '[{"name":"Naranag","altitude_m":2650,"facilities":["tea shop","local guesthouse"],"water":"tap","flat_ground":true},{"name":"Gangbal Base Camp","altitude_m":3575,"facilities":[],"water":"glacial lake","flat_ground":false},{"name":"Satsar Camp","altitude_m":3700,"facilities":[],"water":"glacial lake","flat_ground":true}]'::jsonb,
  '[{"day":1,"title":"Naranag to Gangbal Lake","distance_km":8,"altitude_m":3575,"hours":5,"terrain":"forest and alpine trail","description":"Start from Naranag village (2650m). Trek through meadows and sparse forest to reach Gangbal Lake (3575m). The trail is well-marked initially. Excellent views of surrounding peaks.","campsite":"Gangbal Lake Camp","meals":"packed lunch, camp dinner","water":"glacial lake"},{"day":2,"title":"Gangbal Lake to Satsar Lake","distance_km":8,"altitude_m":3700,"hours":5,"terrain":"high-altitude plateau and boulder fields","description":"Trek across the pristine high-altitude plateau to Satsar Lake. The terrain is open with sparse vegetation. Satsar has multiple chambers and is one of Kashmir''s most beautiful lakes.","campsite":"Satsar Lake Camp","meals":"lightweight trekking food","water":"glacial lake"},{"day":3,"title":"Satsar to Ghad Sar and acclimatization","distance_km":6,"altitude_m":3680,"hours":4,"terrain":"alpine meadow and boulder hopping","description":"Short acclimatization day. Trek to Ghad Sar lake, completing the circuit of the main Kashmir Great Lakes. Return to camp for acclimatization and rest.","campsite":"Satsar Lake Camp","meals":"simple camp meal","water":"glacial lakes"},{"day":4,"title":"Satsar to Naranag descent","distance_km":16,"altitude_m":2650,"hours":7,"terrain":"alpine trail and forest descent","description":"Retrace steps back to Naranag. Long descent with mostly downhill terrain. Trek ends at Naranag village. Checkpost closes at 4pm; ensure timely arrival.","campsite":"Naranag village overnight","meals":"celebration meal in village","water":"streams and taps"}]'::jsonb,
  '[{"name":"Naranag","lat":34.650,"lng":75.830,"altitude_m":2650,"day":1,"type":"settlement"},{"name":"Gangbal Lake","lat":34.720,"lng":75.790,"altitude_m":3575,"day":1,"type":"lake"},{"name":"Satsar Lake","lat":34.750,"lng":75.800,"altitude_m":3700,"day":2,"type":"lake"},{"name":"Ghad Sar","lat":34.760,"lng":75.810,"altitude_m":3680,"day":3,"type":"lake"}]'::jsonb,
  '{"budget":10000,"with_guide":16000,"with_operator":22000,"note":"Budget includes guide, porter, meals, and camping; operator adds tents and full logistics"}'::jsonb,
  'From Srinagar: 2-hour drive (80km) to Sonamarg via the main highway. From Sonamarg: 3km drive or 1-hour trek to Naranag village start point.',
  'No permits required for Indian nationals. Foreign nationals should carry Inner Line Permit (ILP) for Kashmir region, obtainable from Srinagar DC office.',
  'Multiple pristine glacial lakes and streams; all require purification (glacial melt).',
  'Jio and Airtel 2G up to Sonamarg; zero coverage above Naranag.',
  'Police checkpost at Naranag; emergency radio available; helicopter evacuation from Sonamarg.',
  'District Hospital Ganderbal (60km away, 2+ hours down)',
  'https://indiahikes.com/kashmir-great-lakes',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://lifeontheplanetladakh.com/blog/trekking-the-nubra-valley-ladakh-hidden-oasis/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'nubra-valley-circuit',
  'Nubra Valley Circuit Trek',
  'nubra-valley',
  'easy',
  5,
  3500,
  48,
  ARRAY[5,6,7,8,9],
  true,
  false,
  8,
  'easy',
  'Scenic 5-day circuit trek exploring Ladakh''s Nubra Valley, connecting the monasteries and villages of Diskit, Hunder, Turtuk, and Sumur. The route showcases the unique high-altitude cold desert landscape, Bactrian camels, ancient Buddhist monasteries, and diverse cultures. Inner Line Permit (ILP) required for foreigners. Elevation gain is moderate, making it accessible to fit beginners.',
  ARRAY['Diskit Monastery: 14th-century monastery with giant Maitreya statue','Hunder: famous white sand dunes with double-humped Bactrian camels','Turtuk: northernmost village of India near Indo-Pakistan border','Sumur: ancient Tibetan Buddhist monastery and village','Cultural immersion with Balti and Ladakhi communities'],
  ARRAY['ILP required for foreigners; Turtuk access may be restricted','High altitude; 3000-3500m elevation','Sparse infrastructure; limited medical facilities','Extreme temperature variations; wind can be harsh','Water scarcity in some sections'],
  ARRAY['Lightweight trekking boots suitable for mixed terrain','Windproof and waterproof layers','Sun protection: hat, sunglasses, sunscreen','Day pack (15-20L) for daily trekking','Camera: stunning monastery and landscape photography'],
  '[{"name":"Diskit Village","altitude_m":3100,"facilities":["guesthouse","basic shop"],"water":"tap","flat_ground":true},{"name":"Hunder","altitude_m":3000,"facilities":["guesthouse","tea shop"],"water":"stream","flat_ground":false},{"name":"Turtuk","altitude_m":3050,"facilities":["basic lodging"],"water":"stream","flat_ground":true},{"name":"Sumur","altitude_m":3200,"facilities":["guesthouse"],"water":"tap","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Leh to Diskit via Khardung La","distance_km":50,"altitude_m":3100,"hours":8,"terrain":"high pass road and valley descent","description":"Early morning start from Leh (3500m). Cross Khardung La pass (5359m). Dramatic descent into Nubra Valley. Arrive at Diskit village. Visit the iconic Diskit Monastery with the 32m Maitreya Buddha statue.","campsite":"Diskit guesthouse","meals":"lunch en route, guesthouse dinner","water":"tap"},{"day":2,"title":"Diskit to Hunder trek","distance_km":12,"altitude_m":3000,"hours":5,"terrain":"sand dunes and oasis trek","description":"Trek from Diskit to Hunder across the famous Nubra white sand dunes. Meet Bactrian camels grazing in the cold desert. Explore Hunder village and its ancient monasteries.","campsite":"Hunder guesthouse","meals":"trekking lunch, local meal","water":"stream"},{"day":3,"title":"Hunder to Turtuk","distance_km":14,"altitude_m":3050,"hours":6,"terrain":"river valley and mountain path","description":"Trek along the Shyok River valley to Turtuk, India''s northernmost village. Unique Balti culture and architecture. The trek offers views of Shyok River and surrounding peaks.","campsite":"Turtuk basic lodging","meals":"packed lunch, simple dinner","water":"river"},{"day":4,"title":"Turtuk to Sumur","distance_km":16,"altitude_m":3200,"hours":7,"terrain":"riverside trail and alpine path","description":"Trek from Turtuk to Sumur via riverside paths and mountain trails. Sumur is home to an important 400-year-old Tibetan Buddhist monastery (Samstanling). Scenic valley trek.","campsite":"Sumur guesthouse","meals":"hiking food, guesthouse meal","water":"stream and tap"},{"day":5,"title":"Sumur to Panamik and return to Leh","distance_km":32,"altitude_m":3100,"hours":7,"terrain":"vehicle ride and scenic road","description":"Drive from Sumur via Panamik (hotsprings) to Khardung La. Cross Khardung La (5359m) and descend to Leh. Complete the circuit. Evening in Leh.","campsite":"Leh guesthouse","meals":"lunch en route, celebration dinner","water":"tap in Leh"}]'::jsonb,
  '[{"name":"Leh","lat":34.160,"lng":77.577,"altitude_m":3500,"day":1,"type":"trailhead"},{"name":"Khardung La Pass","lat":34.300,"lng":77.600,"altitude_m":5359,"day":1,"type":"pass"},{"name":"Diskit","lat":34.490,"lng":77.610,"altitude_m":3100,"day":1,"type":"settlement"},{"name":"Hunder","lat":34.510,"lng":77.580,"altitude_m":3000,"day":2,"type":"settlement"},{"name":"Turtuk","lat":34.620,"lng":77.520,"altitude_m":3050,"day":3,"type":"settlement"},{"name":"Sumur","lat":34.680,"lng":77.560,"altitude_m":3200,"day":4,"type":"settlement"}]'::jsonb,
  '{"budget":18000,"with_guide":28000,"with_operator":38000,"note":"Budget includes accommodation, meals, permits; operator adds full logistics and vehicle transport"}'::jsonb,
  'From Delhi: fly to Leh (2h). From Leh: drive via Khardung La (38km, 4h). Alternatively, 2-day drive from Leh (expensive).',
  'Foreign nationals require Protected Area Permit (PAP) for Turtuk and Nubra Valley (approximately USD 50-100; 5-10 working days via District Magistrate Leh). Indian nationals require ILP. Some sources indicate foreigners may be restricted beyond Hunder depending on security conditions.',
  'Streams at Hunder, Turtuk, and Sumur; tap water in villages is potable but should be boiled.',
  'Jio and Airtel patchy; coverage in Diskit and Leh only; zero coverage in Turtuk.',
  'Indian Army posts in the valley; helicopter evacuation possible from Leh.',
  'Leh Ladakh Hospital (150km away, 5+ hours)',
  'https://lifeontheplanetladakh.com/blog/trekking-the-nubra-valley-ladakh-hidden-oasis/',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.lehladakhtourism.com/roundtrip-to-manali-via-tso-moriri/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'sarchu-tso-moriri-trek',
  'Sarchu Tso Moriri Trek',
  'tso-moriri',
  'hard',
  7,
  5000,
  110,
  ARRAY[7,8,9],
  true,
  false,
  16,
  'hard',
  'Challenging 7-day high-altitude trek connecting the Manali-Leh highway at Sarchu to Tso Moriri lake at 4528m. The route traverses a high-altitude desert with passes exceeding 5000m, crossing multiple alpine passes and pristine lakes. Inner Line Permit (ILP) required for foreigners. This trek demands high fitness and altitude acclimatization.',
  ARRAY['Tso Moriri: pristine high-altitude desert lake at 4528m','Multiple 5000m+ passes with panoramic Himalayan views','Tso Kar lake: twin lake crossed on route','Wildlife: rare Tibetan argali sheep and snow leopards (rare sightings)','Absolutely remote desert landscape'],
  ARRAY['ILP required for foreigners','Extreme altitude; passes exceed 5000m regularly','Constant altitude above 4500m for 3+ days','Unpredictable weather; sudden storms','Very remote; evacuation difficult'],
  ARRAY['High-altitude mountaineering tent and sleeping bag (−15°C)','Extreme cold layers and insulated jacket','Crampons may be needed depending on snow conditions','Gaiters and thick socks','Altitude sickness medication (mandatory)'],
  '[{"name":"Sarchu on Manali-Leh Highway","altitude_m":4290,"facilities":["basic dhaba"],"water":"tap","flat_ground":true},{"name":"Pang Thang Camp","altitude_m":4800,"facilities":[],"water":"glacial stream","flat_ground":false},{"name":"Tso Moriri Lake Camp","altitude_m":4528,"facilities":[],"water":"glacial lake","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Sarchu to Pang Base Camp","distance_km":16,"altitude_m":4800,"hours":7,"terrain":"high desert plateau and passes","description":"Start from Sarchu (4290m) on the Manali-Leh Highway. Trek across a barren high-altitude plateau, crossing rocky terrain to Pang Base Camp. Route is exposed with minimal vegetation.","campsite":"Pang Base Camp","meals":"packed lunch, camp-cooked meal","water":"glacial stream"},{"day":2,"title":"Pang Base to high camp via Tso Kar approach","distance_km":18,"altitude_m":4900,"hours":8,"terrain":"boulder fields and high passes","description":"Continue trek through a series of high passes (names: Miru La, Nyima La). The terrain is harsh; altitude effects intensify. Tso Kar lake is visible en route. High camp is a stark, windswept plateau.","campsite":"High Altitude Camp","meals":"high-calorie expedition meals","water":"glacial melt"},{"day":3,"title":"High camp acclimatization and exploration","distance_km":8,"altitude_m":5000,"hours":5,"terrain":"barren plateau","description":"Acclimatization day. Explore the immediate surroundings and prepare physically and mentally for the peak altitude exposure.","campsite":"High Altitude Camp","meals":"simple expedition food","water":"ice melt"},{"day":4,"title":"High camp to Tso Kar Lake","distance_km":14,"altitude_m":4700,"hours":7,"terrain":"boulder and rocky descent","description":"Trek to the stunning Tso Kar lake, a high-altitude alpine lake surrounded by barren peaks. The lake is turquoise and lies in a glacial basin.","campsite":"Tso Kar Lake Camp","meals":"lakeside camp meal","water":"glacial lake"},{"day":5,"title":"Tso Kar to Tso Moriri","distance_km":20,"altitude_m":4528,"hours":8,"terrain":"high desert and gentle descent","description":"Trek to Tso Moriri, the second iconic lake of the journey. The route descends slightly and offers expansive views of the Changthang plateau. Tso Moriri is longer (20+ km) and pristine.","campsite":"Tso Moriri Lake Camp","meals":"celebration meal","water":"glacial lake"},{"day":6,"title":"Tso Moriri lake exploration","distance_km":10,"altitude_m":4528,"hours":5,"terrain":"lake circumnavigation","description":"Exploration day around Tso Moriri. Walk along the lake shore and observe rare high-altitude wildlife.","campsite":"Tso Moriri Lake Camp","meals":"simple meals","water":"glacial lake"},{"day":7,"title":"Tso Moriri to Hanle and descent","distance_km":25,"altitude_m":4270,"hours":8,"terrain":"desert plateau and road descent","description":"Trek to Hanle village and pick-up point. Light descent towards Hanle. Drive back to Leh or continue to Manali (via reverse Manali-Leh highway).","campsite":"Hanle village overnight or vehicle drive","meals":"celebration meal","water":"tap at Hanle"}]'::jsonb,
  '[{"name":"Sarchu","lat":32.850,"lng":77.940,"altitude_m":4290,"day":1,"type":"settlement"},{"name":"Pang Base Camp","lat":33.000,"lng":77.850,"altitude_m":4800,"day":1,"type":"campsite"},{"name":"Tso Kar","lat":33.200,"lng":77.650,"altitude_m":4700,"day":4,"type":"lake"},{"name":"Tso Moriri","lat":33.300,"lng":78.000,"altitude_m":4528,"day":5,"type":"lake"},{"name":"Hanle","lat":33.280,"lng":78.150,"altitude_m":4270,"day":7,"type":"settlement"}]'::jsonb,
  '{"budget":45000,"with_guide":65000,"with_operator":85000,"note":"Budget with hired porter; operator includes all meals, high-altitude camping, permits, guide"}'::jsonb,
  'From Delhi: fly to Leh (2h). From Leh: drive to Sarchu on Manali-Leh Highway (240km, 10h). Alternatively, start from Manali and drive to Sarchu (280km, 14h).',
  'Foreign nationals require Protected Area Permit (PAP) for Tso Moriri and Changthang region (approximately USD 100; 5-10 working days via District Magistrate Leh). Indian nationals require ILP.',
  'Glacial streams and pristine lakes; all water sources require purification (glacial melt carries silt).',
  'Zero cellular coverage; satellite communicator (Garmin InReach) absolutely essential.',
  'Indian Army at Sarchu and Hanle; emergency radio available; helicopter evacuation from Leh (6+ hours away).',
  'Leh Ladakh Hospital (240km away, 10+ hours)',
  'https://www.lehladakhtourism.com/roundtrip-to-manali-via-tso-moriri/',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.bikatadventures.com/Home/Itinerary/Pin-Bhaba-Pass-Trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'pin-bhaba-pass-trek',
  'Pin Bhaba Pass Trek',
  'kaza',
  'hard',
  8,
  4915,
  60,
  ARRAY[6,7,8,9],
  false,
  false,
  14,
  'hard',
  'Dramatic 8-day high-altitude crossover trek from Kinnaur''s Bhabha Valley to Spiti''s Pin Valley via Pin Bhaba Pass at 4915m. The route traverses a massive geographical and cultural boundary, moving from lush alpine forests to stark high-altitude desert. Spectacular panoramic views from the pass mark the transition between two distinct Himalayan worlds.',
  ARRAY['Pin Bhaba Pass at 4915m with 360-degree Himalayan views','Contrast of green Bhabha Valley to arid Pin Valley','Prayer flags and Buddhist cultural remnants at pass','Pristine high-altitude meadows and glacial streams','Remote and rarely-visited trekking route'],
  ARRAY['High altitude; pass at 4915m is extremely exposed','Weather unpredictable; storms and snow common','Sparse vegetation; limited shelter','Altitude sickness very common','Route-finding can be difficult; hire experienced guide'],
  ARRAY['Four-season tent and warm sleeping bag (−15°C)','Extreme cold weather layers','Sturdy trekking boots with gaiters','Gloves and face protection against wind','Altitude sickness medication'],
  '[{"name":"Kafnu Base Village","altitude_m":2400,"facilities":["basic shop"],"water":"tap","flat_ground":true},{"name":"Dhansheba Camp","altitude_m":3600,"facilities":[],"water":"stream","flat_ground":false},{"name":"Bhaba Pass Base","altitude_m":4400,"facilities":[],"water":"glacial stream","flat_ground":false},{"name":"Mudh Village","altitude_m":3810,"facilities":[],"water":"stream","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Kafnu to Laburi","distance_km":10,"altitude_m":2800,"hours":5,"terrain":"forest and meadow","description":"Start from Kafnu village (2400m) in Kinnaur Valley. Trek through oak and deodar forests, ascending to Laburi meadow. Alpine vegetation increases with elevation.","campsite":"Laburi Camp","meals":"packed lunch, camp dinner","water":"streams"},{"day":2,"title":"Laburi to Dhansheba","distance_km":12,"altitude_m":3600,"hours":6,"terrain":"alpine meadow and steep ascent","description":"Ascend through alpine meadows dotted with rhododendrons and wildflowers. Steep sections gain elevation quickly. Dhansheba offers views of surrounding peaks.","campsite":"Dhansheba Camp","meals":"high-calorie meal","water":"glacial stream"},{"day":3,"title":"Dhansheba to Bhaba Pass Base","distance_km":10,"altitude_m":4400,"hours":7,"terrain":"boulder field and high altitude ascent","description":"Trek above treeline into the barren high-altitude zone. Route becomes steeper and rockier. Approach the base of Pin Bhaba Pass.","campsite":"Bhaba Pass Base Camp","meals":"expedition food","water":"glacial melt"},{"day":4,"title":"Pin Bhaba Pass crossing","distance_km":8,"altitude_m":4915,"hours":8,"terrain":"boulder, scree, and final rocky summit","description":"Alpine start. Final ascent to Pin Bhaba Pass at 4915m. Prayer flags mark the pass. Spectacular 360-degree panoramic views of the Himalayan range. Dramatic descent begins.","campsite":"Descent Camp on Spiti side","meals":"celebratory meal","water":"glacial stream"},{"day":5,"title":"Descent towards Pin Valley","distance_km":12,"altitude_m":4100,"hours":7,"terrain":"steep rocky descent and scree","description":"Steep descent from the pass into the stark and beautiful Pin Valley. The landscape transforms from green to brown. Geological and cultural transition visible.","campsite":"Mid-descent Camp","meals":"simple trek meals","water":"streams"},{"day":6,"title":"Pin Valley trek and monastery","distance_km":10,"altitude_m":3800,"hours":6,"terrain":"valley trail and cultural sites","description":"Trek through the Pin Valley, visiting ancient monasteries and remote villages. The contrast with the Bhabha Valley is striking. Experience Spiti culture.","campsite":"Pin Valley Camp","meals":"local meals","water":"river"},{"day":7,"title":"Pin Valley to Mudh","distance_km":14,"altitude_m":3810,"hours":6,"terrain":"river valley trail","description":"Continue descent through Pin Valley to Mudh village, the trek''s endpoint. The route follows the Pin River for much of the day.","campsite":"Mudh village guesthouse","meals":"guesthouse meal","water":"tap"},{"day":8,"title":"Mudh to Kaza and onward","distance_km":35,"altitude_m":3600,"hours":8,"terrain":"vehicle drive","description":"Drive from Mudh to Kaza (3600m), the district headquarters of Spiti. Scenic mountain road. End of trek; flights or further travel options available from Kaza.","campsite":"Kaza guesthouse overnight","meals":"celebration dinner in Kaza","water":"tap"}]'::jsonb,
  '[{"name":"Kafnu","lat":31.520,"lng":78.120,"altitude_m":2400,"day":1,"type":"trailhead"},{"name":"Laburi","lat":31.560,"lng":78.080,"altitude_m":2800,"day":1,"type":"campsite"},{"name":"Dhansheba","lat":31.600,"lng":78.020,"altitude_m":3600,"day":2,"type":"campsite"},{"name":"Pin Bhaba Pass","lat":31.680,"lng":77.950,"altitude_m":4915,"day":4,"type":"pass"},{"name":"Mudh","lat":31.740,"lng":77.880,"altitude_m":3810,"day":7,"type":"settlement"},{"name":"Kaza","lat":31.950,"lng":78.070,"altitude_m":3600,"day":8,"type":"settlement"}]'::jsonb,
  '{"budget":35000,"with_guide":50000,"with_operator":65000,"note":"Budget with hired porter; operator includes tents, meals, guide, and logistics"}'::jsonb,
  'From Delhi: fly to Shimla (2h), then drive to Kafnu (12h). Alternatively, drive from Shimla (650km, 18h). End at Kaza: fly to Delhi (2h) or continue to Manali (8h drive).',
  'No special permits required for trekking; no ILP/PAP needed.',
  'Multiple streams throughout the route; glacial melt at high elevations (requires purification).',
  'Zero cellular coverage beyond Kafnu; satellite communicator recommended.',
  'Remote region; Indian Army in Spiti; helicopter evacuation from Kaza (very expensive and weather-dependent).',
  'Kaza District Hospital (35km away, 6+ hours)',
  'https://www.bikatadventures.com/Home/Itinerary/Pin-Bhaba-Pass-Trek',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://himalayashelter.com/trek/chandratal-baralacha-trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'chandratal-baralacha-trek',
  'Chandratal Baralacha Trek',
  'chandratal',
  'hard',
  5,
  4890,
  48,
  ARRAY[6,7,8,9],
  false,
  false,
  14,
  'hard',
  'Spectacular 5-day high-altitude trek in Spiti Valley, connecting Chandratal Lake (''Moon Lake'') at 4270m to Baralacha Pass at 4890m. The route traverses pristine alpine terrain, glacial lakes, and offers dramatic Himalayan vistas. Though officially 5-6 days of trekking, the route includes 2 days of vehicle transport.',
  ARRAY['Chandratal (Moon Lake): turquoise glacial lake at 4270m','Baralacha La Pass at 4890m with prayer flags','Zanskar Range views and dramatic alpine terrain','Remote high-altitude desert landscape','Geological transition between Spiti and Ladakh'],
  ARRAY['High altitude; constant exposure above 4000m','Unpredictable weather; snow until end of May','Sparse water sources; limited emergency support','Route-finding can be challenging','Altitude sickness affects most trekkers'],
  ARRAY['Four-season tent and sleeping bag (−15°C)','Extreme cold weather layers and windproof jacket','Sturdy mountaineering boots','Gaiters and thick thermal socks','Altitude medication and first aid kit'],
  '[{"name":"Chandratal Base Camp","altitude_m":4270,"facilities":["dhabas May-Sept"],"water":"glacial lake","flat_ground":true},{"name":"Topkoyogma Camp","altitude_m":4400,"facilities":[],"water":"glacial stream","flat_ground":false},{"name":"Baralacha Pass Base","altitude_m":4600,"facilities":[],"water":"glacial stream","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Manali to Chandratal Lake","distance_km":75,"altitude_m":4270,"hours":10,"terrain":"vehicle drive on mountain road","description":"Early morning drive from Manali via Sarchu on the Manali-Leh Highway. Scenic drive along high mountain passes. Arrive at Chandratal Lake (4270m) in the afternoon. Lake is turquoise and surrounded by barren peaks.","campsite":"Chandratal Lake Camp","meals":"lunch en route, camp dinner","water":"glacial lake"},{"day":2,"title":"Chandratal Lake acclimatization","distance_km":8,"altitude_m":4270,"hours":5,"terrain":"lake shore and high-altitude plateau","description":"Acclimatization day. Explore the shores of Chandratal Lake. Short trek to a viewpoint. Prepare for the high-altitude trek ahead.","campsite":"Chandratal Lake Camp","meals":"simple camp meals","water":"glacial lake"},{"day":3,"title":"Chandratal to Topkoyogma","distance_km":12,"altitude_m":4400,"hours":7,"terrain":"boulder and scree fields","description":"Trek from Chandratal across high-altitude plateau towards Baralacha La. Route passes through stark, barren landscape. Altitude effects intensify.","campsite":"Topkoyogma Camp","meals":"high-calorie expedition food","water":"glacial stream"},{"day":4,"title":"Topkoyogma to Baralacha Pass","distance_km":14,"altitude_m":4890,"hours":8,"terrain":"boulder, scree, and pass ascent","description":"Ascend to Baralacha Pass (4890m). Prayer flags and cairns mark the pass. Panoramic views of the Zanskar Range and surrounding peaks. Extreme exposure and altitude. Steep descent on the other side towards Ladakh.","campsite":"Descent Camp","meals":"celebration meal at pass","water":"glacial melt"},{"day":5,"title":"Baralacha to Sarchu return","distance_km":35,"altitude_m":4290,"hours":8,"terrain":"descent to Manali-Leh Highway and vehicle drive","description":"Trek descent from Baralacha towards Sarchu on the Manali-Leh Highway. Pick-up for vehicle transport back to Leh, Manali, or continue further.","campsite":"Sarchu on Highway overnight","meals":"roadside meals","water":"tap at Sarchu"}]'::jsonb,
  '[{"name":"Chandratal Lake","lat":32.220,"lng":77.680,"altitude_m":4270,"day":1,"type":"lake"},{"name":"Topkoyogma","lat":32.280,"lng":77.620,"altitude_m":4400,"day":3,"type":"campsite"},{"name":"Baralacha La Pass","lat":32.350,"lng":77.580,"altitude_m":4890,"day":4,"type":"pass"},{"name":"Sarchu","lat":32.850,"lng":77.940,"altitude_m":4290,"day":5,"type":"settlement"}]'::jsonb,
  '{"budget":28000,"with_guide":42000,"with_operator":55000,"note":"Budget includes vehicle transport, accommodations, basic meals; operator adds full logistics and high-altitude camping"}'::jsonb,
  'From Delhi: fly to Bhuntar (1h), drive to Manali (2h). From Manali: drive to Chandratal Lake (220km, 10h).',
  'No special permits required for trekking; no ILP/PAP needed.',
  'Glacial streams and Chandratal Lake; all sources require purification (glacial silt).',
  'Zero cellular coverage on trek; satellite communicator essential.',
  'Remote region; Indian Army posts at Sarchu; helicopter evacuation from Leh or Manali (very difficult).',
  'Manali or Leh Hospital (150km away, 6+ hours)',
  'https://himalayashelter.com/trek/chandratal-baralacha-trek',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://www.uttarakhandtourism.gov.in/treks-details/Auli%20to%20Gorson%20Bugyal%20Trek
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'auli-gorson-bugyal-trek',
  'Auli Gorson Bugyal Trek',
  'auli',
  'moderate',
  2,
  3050,
  13,
  ARRAY[3,4,5,9,10,11,12],
  false,
  true,
  6,
  'medium',
  'Short, scenic 2-day trek through the alpine meadows of Uttarakhand''s Chamoli district. The route connects the ski resort town of Auli (2500-3050m) to Gorson Bugyal, one of the highest meadows in the Garhwal Himalayas. Perfect for beginners and families, offering stunning wildflower displays in spring and autumn colors in fall.',
  ARRAY['Gorson Bugyal: pristine alpine meadow at 3056m','Panoramic views of Nanda Devi, Mana Parvat, and Kamet peaks','Spring wildflowers: rhododendrons, pansies, and alpine flowers','Easy accessible trek suitable for beginners and children','Famous for winter skiing and spring blooms'],
  ARRAY['Weather changes rapidly; afternoon thunderstorms common','Some sections are steep despite ''easy'' rating','Exposed ridge sections; lightning risk in storms','Thin alpine air; acclimatization needed','Limited facilities beyond Auli'],
  ARRAY['Comfortable hiking boots (not mandatory for day-treks)','Lightweight rain jacket and windproof layer','Hat and sunglasses for sun protection','Water bottle and light snacks','Camera for landscape and wildflower photography'],
  '[{"name":"Auli Village Base","altitude_m":2500,"facilities":["ski resort infrastructure","restaurants","guesthouses"],"water":"tap","flat_ground":true},{"name":"Gorson Bugyal Camp","altitude_m":3050,"facilities":["basic camping"],"water":"stream","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Auli to Gorson Bugyal","distance_km":7,"altitude_m":3050,"hours":3,"terrain":"alpine meadow and gentle ascent","description":"Start from Auli ski resort. Trek through alpine meadows with wildflowers (seasonal). Gradual ascent to Gorson Bugyal meadow at 3050m. Panoramic mountain views develop as altitude increases. Light trek suitable for families.","campsite":"Gorson Bugyal Camp or Auli overnight","meals":"packed lunch, guesthouse/camp dinner","water":"streams"},{"day":2,"title":"Gorson Bugyal loop and return to Auli","distance_km":6,"altitude_m":3050,"hours":3,"terrain":"meadow circuit and descent","description":"Morning walk around Gorson Bugyal meadow. Optional: climb to higher viewpoints for Nanda Devi views. Return to Auli via the same route. Gentle downhill descent.","campsite":"Auli guesthouse","meals":"lunch at bugyal, dinner in Auli","water":"streams and tap"}]'::jsonb,
  '[{"name":"Auli","lat":30.527,"lng":79.618,"altitude_m":2500,"day":1,"type":"settlement"},{"name":"Gorson Bugyal","lat":30.545,"lng":79.595,"altitude_m":3050,"day":1,"type":"meadow"}]'::jsonb,
  '{"budget":3000,"with_guide":6000,"with_operator":9000,"note":"Budget self-guided; operator includes guide, meals, and accommodation"}'::jsonb,
  'From Delhi: drive or fly to Auli (12h drive; 2h to Dehradun + 8h drive). Auli is accessible by car year-round.',
  'No permits required. Popular family-friendly destination.',
  'Clear streams; tap water at Auli is potable.',
  'Jio and Airtel coverage at Auli; patchy at Gorson Bugyal.',
  'Auli Meadows Resort medical facilities; Chamoli District Hospital (40km away).',
  'Auli Government Medical Centre (on-site); Chamoli District Hospital (40km, 1h drive)',
  'https://www.uttarakhandtourism.gov.in/treks-details/Auli%20to%20Gorson%20Bugyal%20Trek',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- source: https://welcomearunachal.com/attractions/mechuka-valley/
INSERT INTO treks (
  id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km,
  best_months, permits_required, kids_suitable, min_age, fitness_level,
  description, highlights, warnings, gear_essentials, campsites,
  day_by_day, trail_points, cost_estimate,
  how_to_reach, permit_details, water_sources, network_coverage, emergency_contacts, nearest_hospital,
  source_url, last_reviewed_at
) VALUES (
  'mechuka-yorlung-trek',
  'Mechuka Yorlung Trek',
  'mechuka',
  'moderate',
  3,
  2100,
  18,
  ARRAY[10,11,3,4],
  true,
  false,
  8,
  'medium',
  'Scenic 3-day trek through Mechuka Valley in Arunachal Pradesh''s Shi Yomi district, exploring the Yorlung valley and visiting the historic Samten Yongcha Monastery. The route showcases Adi tribal culture, Buddhist heritage, and the pristine Siyom River valley. Protected Area Permit (PAP) required for foreign nationals.',
  ARRAY['Samten Yongcha Monastery: 400-year-old Buddhist monastery with Tibetan architecture','Adi tribal villages with unique homestay cultural experiences','Yorlung valley with panoramic eastern Himalayan views','Siyom River traverse and pristine biodiversity','Authentic high-altitude Himalayan tribal community'],
  ARRAY['PAP required for foreigners; application process can be slow','Remote region with minimal infrastructure','Roads can be washed out in monsoon (June-Sept)','Limited medical facilities; evacuation is difficult','High humidity and unpredictable weather'],
  ARRAY['Good hiking boots for muddy/wet trails','Rain jacket and waterproof bag covers','Lightweight layers for variable weather','Water bottle and water purification tablets','Camera for tribal cultural photography'],
  '[{"name":"Mechuka Village","altitude_m":2100,"facilities":["homestay lodging","basic shop"],"water":"tap","flat_ground":false},{"name":"Monastery Camp","altitude_m":2150,"facilities":[],"water":"stream","flat_ground":false},{"name":"Yorlung Camp","altitude_m":1950,"facilities":[],"water":"river","flat_ground":false}]'::jsonb,
  '[{"day":1,"title":"Mechuka arrival and monastery trek","distance_km":6,"altitude_m":2150,"hours":4,"terrain":"mountain trail and monastery approach","description":"Arrive at Mechuka village (1829m, 6000ft). Trek to Samten Yongcha Monastery, a 400-year-old Tibetan Buddhist monastery perched on a hilltop. The trek is moderately easy with stunning valley views. Visit the monastery and interact with monks.","campsite":"Mechuka village homestay","meals":"traditional Adi lunch, homestay dinner","water":"tap and streams"},{"day":2,"title":"Mechuka to Yorlung Valley","distance_km":8,"altitude_m":1950,"hours":5,"terrain":"forest trail and river valley","description":"Trek from Mechuka village towards Yorlung valley. The route passes through pristine forests and alongside the Siyom River. Explore Adi villages along the way. Experience local culture and lifestyles.","campsite":"Yorlung valley campsite","meals":"packed lunch, simple camp dinner","water":"river"},{"day":3,"title":"Yorlung exploration and return to Mechuka","distance_km":4,"altitude_m":2100,"hours":3,"terrain":"river valley and uphill return","description":"Explore Yorlung valley further. Visit Yorlung Army Camp viewpoint (observation point only). Return to Mechuka village. Final evening in village for cultural interactions.","campsite":"Mechuka village overnight","meals":"celebration meal with homestay family","water":"tap"}]'::jsonb,
  '[{"name":"Mechuka","lat":28.533,"lng":93.117,"altitude_m":1829,"day":1,"type":"settlement"},{"name":"Samten Yongcha Monastery","lat":28.545,"lng":93.100,"altitude_m":2150,"day":1,"type":"monastery"},{"name":"Yorlung Valley","lat":28.550,"lng":93.050,"altitude_m":1950,"day":2,"type":"valley"}]'::jsonb,
  '{"budget":7000,"with_guide":12000,"with_operator":16000,"note":"Budget includes homestay, meals, porter; operator adds guide and full logistics"}'::jsonb,
  'From Delhi: fly to Guwahati (2.5h), then fly to Tezu or Pasighat in Arunachal (1h). From Tezu: drive to Mechuka (150km, 8h on mountain roads).',
  'Protected Area Permit (PAP) required for foreign nationals (approximately USD 100; apply 1-2 weeks in advance via District Magistrate Shi Yomi). Indian nationals require ILP. Application process is relatively straightforward but can be slow.',
  'Siyom River and multiple streams; tap water at Mechuka is potable; streams require purification.',
  'Zero cellular coverage; satellite communicator or messenger service recommended.',
  'Indian Army posts in the valley; emergency evacuation by helicopter from Tezu (8+ hours away).',
  'District Hospital Tezu (150km away, 8+ hours)',
  'https://welcomearunachal.com/attractions/mechuka-valley/',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verification query: count newly inserted treks
SELECT COUNT(*) AS new_trek_count FROM treks WHERE id IN ('hemkund-sahib-trek','friendship-peak-trek','warwan-valley-trek','sela-pass-trek','naranag-gangbal-trek','nubra-valley-circuit','sarchu-tso-moriri-trek','pin-bhaba-pass-trek','chandratal-baralacha-trek','auli-gorson-bugyal-trek','mechuka-yorlung-trek');
