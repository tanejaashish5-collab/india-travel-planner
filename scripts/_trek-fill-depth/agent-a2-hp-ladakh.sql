-- source: https://raachotrekkers.com/kinner-kailash-parikrama-charang-la-trek/
-- source: https://indiahikes.com/documented-trek/kinner-kailash-shivlingam-trek/
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Kalpa to Thangi to Lambar","distance_km":8,"altitude_m":2966,"hours":4,"terrain":"forest trail, gradual ascent","description":"Drive from Kalpa to Thangi village (trailhead at 2,966m). Trek northeast following a rivulet to Lambar campsite.","campsite":"Lambar","meals":"breakfast, lunch, dinner","water":"Rivulet available"},
    {"day":2,"title":"Lambar to Shurting","distance_km":10,"altitude_m":3150,"hours":5,"terrain":"meadow, stream valley","description":"Trek northeast following the rivulet through alpine meadows to Shurting campsite. Steady climb with views of Kinner Kailash massif.","campsite":"Shurting","meals":"breakfast, lunch, dinner","water":"Stream reliable"},
    {"day":3,"title":"Shurting to Charang","distance_km":8,"altitude_m":4420,"hours":6,"terrain":"rocky, steep ascent","description":"Trek through Charang valley, steadily ascending. Pass the 11th-century Rangrik Tungma Monastery complex. Reach Charang campsite at 4,420m.","campsite":"Charang","meals":"breakfast, lunch, dinner","water":"Limited; carry 2L"},
    {"day":4,"title":"Charang to Lalanti (Charang Pass approach)","distance_km":8,"altitude_m":4850,"hours":7,"terrain":"high alpine, rocky","description":"Steep climb into bare alpine terrain. Trek uphill in Charang valley towards Charang Pass. Reach Lalanti base camp. Views of the Kinner Kailash peak.","campsite":"Lalanti","meals":"breakfast, lunch, dinner","water":"Snowmelt streams; carry 2L"},
    {"day":5,"title":"Lalanti to Charang Pass (Lalanti Pass) to Chitkul","distance_km":30,"altitude_m":5242,"hours":12,"terrain":"scree, fixed rope sections, descent","description":"Demanding summit day. Climb steeply to Charang Pass (5,242m) — the parikrama''s highest point. Descend 12+ hours to Chitkul village. Long day with intense gradient.","campsite":"Chitkul","meals":"breakfast, lunch, dinner","water":"No water on pass; carry 3L"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Thangi Trailhead","lat":31.42,"lng":77.68,"altitude_m":2966,"day":1,"type":"trailhead"},
    {"name":"Lambar","lat":31.43,"lng":77.70,"altitude_m":2896,"day":1,"type":"campsite"},
    {"name":"Shurting","lat":31.45,"lng":77.72,"altitude_m":3150,"day":2,"type":"campsite"},
    {"name":"Charang Monastery Complex","lat":31.48,"lng":77.75,"altitude_m":3800,"day":3,"type":"monastery"},
    {"name":"Charang Campsite","lat":31.50,"lng":77.78,"altitude_m":4420,"day":3,"type":"campsite"},
    {"name":"Lalanti Base Camp","lat":31.52,"lng":77.82,"altitude_m":4850,"day":4,"type":"campsite"},
    {"name":"Charang Pass (Lalanti Pass)","lat":31.55,"lng":77.85,"altitude_m":5242,"day":5,"type":"pass"},
    {"name":"Chitkul","lat":31.48,"lng":77.92,"altitude_m":2680,"day":5,"type":"junction"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Shimla → Reckong Peo (240km by road, 8hr via HRTC buses or shared taxis) → Kalpa (15km) → Thangi village (trailhead, 8km). Most operators arrange pickups from Shimla.'),
  permit_details = COALESCE(permit_details, 'No permit required for Indian nationals. Foreign nationals need Inner Line Pass (ILP) from DC Reckong Peo, free of cost, issued on arrival.'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":18000,"with_guide":28000,"with_operator":42000,"note":"Budget includes porter, food, guide. Operator packages add accommodation in Kalpa and Shimla."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Day 1-2: Streams reliable along rivulet. Day 3-4: Limited; Charang Pass crossing has zero water — carry 3L. Day 5: Snowmelt streams on descent.'),
  network_coverage = COALESCE(network_coverage, 'BSNL/Jio signal at Kalpa and Reckong Peo. No signal beyond Thangi village. Satellite phone may be necessary.'),
  emergency_contacts = COALESCE(emergency_contacts, 'SDRF Himachal Pradesh 1070. Reckong Peo Police 01786-222204. Nearest functional hospital: CHC Reckong Peo (30km, basic); serious cases: IGMC Shimla 240km.'),
  nearest_hospital = COALESCE(nearest_hospital, 'CHC Reckong Peo (basic, 30km from Kalpa). IGMC Shimla (serious cases, 240km).'),
  source_url = COALESCE(source_url, 'https://indiahikes.com/documented-trek/kinner-kailash-shivlingam-trek/'),
  last_reviewed_at = NOW()
WHERE id = 'kinner-kailash-parikrama-trek';

-- source: https://brozaadventures.com/manimahesh-trek
-- source: https://manimahesh.net.in/manimahesh-lake-trek/
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Hadsar to Dhancho Waterfall","distance_km":7,"altitude_m":2800,"hours":6,"terrain":"forest, waterfall approach","description":"Drive from Bharmour (13km) to Hadsar trailhead. Trek through forests with steady climb. Pass Dhancho Waterfall — spectacular 30m cascade. Reach Dhancho meadow camp.","campsite":"Dhancho Meadow","meals":"breakfast, lunch, dinner","water":"Waterfall and streams abundant"},
    {"day":2,"title":"Dhancho to Manimahesh Lake via Gauri Kund","distance_km":8,"altitude_m":3950,"hours":7,"terrain":"steep rocky, boulder fields","description":"Stiff climbs through Bhandar Ghati diversion to Bhairo Ghati. Navigate boulder sections with vertical scrambles. Pass Gauri Kund (sacred pool of Goddess Parvati). Final push 1km to Manimahesh Lake at 3,950m. Sunrise views of Manimahesh Kailash reflection.","campsite":"Manimahesh Lake","meals":"breakfast, lunch, dinner","water":"Gauri Kund and snowmelt at lake"},
    {"day":3,"title":"Manimahesh Lake to Bharmour descent","distance_km":15,"altitude_m":1450,"hours":6,"terrain":"rocky descent, easy trail","description":"Early descent from the lake through easy terrain. Most of the path is downhill. Return to Dhancho and continue to Hadsar. Drive back to Bharmour for evening departure.","campsite":"Bharmour town","meals":"breakfast, lunch, dinner","water":"Streams and waterfalls on descent"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Hadsar Trailhead","lat":31.88,"lng":75.98,"altitude_m":2180,"day":1,"type":"trailhead"},
    {"name":"Dhancho Waterfall","lat":31.92,"lng":75.95,"altitude_m":2500,"day":1,"type":"landmark"},
    {"name":"Dhancho Meadow Camp","lat":31.94,"lng":75.94,"altitude_m":2800,"day":1,"type":"campsite"},
    {"name":"Bhandar Ghati","lat":31.96,"lng":75.92,"altitude_m":3200,"day":2,"type":"junction"},
    {"name":"Bhairo Ghati Boulder Section","lat":31.98,"lng":75.90,"altitude_m":3600,"day":2,"type":"pass"},
    {"name":"Gauri Kund","lat":32.00,"lng":75.88,"altitude_m":3800,"day":2,"type":"lake"},
    {"name":"Manimahesh Lake","lat":32.02,"lng":75.86,"altitude_m":3950,"day":2,"type":"lake"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Pathankot → Chamba (90km by road, 3hr) → Bharmour (65km, 2.5hr via HRTC or shared jeep) → Hadsar (13km, 30min). HRTC buses run daily Pathankot-Bharmour; shared taxis available from Chamba.'),
  permit_details = COALESCE(permit_details, 'No permit required. Mandatory registration with Bharmour SDM during official Yatra window (late Aug to early Sep). Medical certificate not required outside yatra dates.'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":12000,"with_guide":18000,"with_operator":28000,"note":"Budget includes guide, porter, camp food. Best value during official yatra season when guides are readily available."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Day 1: Dhancho Waterfall and streams abundant. Day 2: Gauri Kund en route, snowmelt streams at lake. Day 3: Waterfalls and streams throughout descent.'),
  network_coverage = COALESCE(network_coverage, 'BSNL/Jio signal at Bharmour. Patchy signal at Hadsar. No signal beyond Dhancho meadow.'),
  emergency_contacts = COALESCE(emergency_contacts, 'SDRF Himachal Pradesh 1070. Chamba District Control 01899-222002. Bharmour SDM Office emergency line available during yatra season. Nearest hospital: CHC Bharmour (basic, 13km); serious cases: Zonal Hospital Chamba 70km.'),
  nearest_hospital = COALESCE(nearest_hospital, 'CHC Bharmour (basic, 13km from Hadsar). Zonal Hospital Chamba (serious cases, 70km).'),
  source_url = COALESCE(source_url, 'https://manimahesh.net.in/manimahesh-lake-trek/'),
  last_reviewed_at = NOW()
WHERE id = 'manimahesh-yatra-trek';

-- source: https://hptdc.in/index.php/shreekhand-mahadev-trek/
-- source: https://www.shikhar.com/shrikhand-mahadev-trek-sti592
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Shimla/Chandigarh to Jaon via Rampur","distance_km":250,"altitude_m":1700,"hours":10,"terrain":"motorway, highway","description":"Drive from Chandigarh/Shimla to Rampur Bushahr (130km, 6hr). Continue to Nirmand (35km, 1.5hr). Final 25km to Jaon village via Singhad base camp (1.5hr). Overnight in Jaon guesthouse.","campsite":"Jaon Village Lodge","meals":"dinner, breakfast","water":"Village water available"},
    {"day":2,"title":"Jaon to Thachdu via Singhad","distance_km":12,"altitude_m":3180,"hours":6,"terrain":"forest trail, meadow, alpine","description":"Trek from Jaon through forests and meadows. Pass Singhad registration point. Steady climb to Thachdu campsite. Views of lower Himalayas. Wildlife: musk deer, snow leopard habitat.","campsite":"Thachdu","meals":"breakfast, lunch, dinner","water":"Streams reliable"},
    {"day":3,"title":"Thachdu to Bheem Dwar via Kali Ghati","distance_km":10,"altitude_m":4850,"hours":8,"terrain":"scree, rocky scramble, steep","description":"Grueling day. Navigate Kali Ghati — a steep rock-scramble section with sections of fixed rope. Reach Bheem Dwar at 4,850m. Exposure and thin air make this technically demanding.","campsite":"Bheem Dwar","meals":"breakfast, lunch, dinner","water":"Limited; carry 2.5L"},
    {"day":4,"title":"Bheem Dwar to Shrikhand Mahadev summit and return","distance_km":12,"altitude_m":5227,"hours":10,"terrain":"scree, vertical rock, fixed ropes","description":"Alpine start (4am). Push 3km uphill to Parvati Bagh (13,622ft). Continue 2.5km steep ascent with fixed ropes on bare scree. Summit at 75-foot natural Shivling (5,227m). Pilgrims perform Parikrama. Return to Bheem Dwar by evening.","campsite":"Bheem Dwar","meals":"breakfast, lunch, dinner","water":"No water above Parvati Bagh; carry 3L"},
    {"day":5,"title":"Bheem Dwar to Thachdu return descent","distance_km":10,"altitude_m":3180,"hours":6,"terrain":"rocky descent, easier trail","description":"Long descent back to Thachdu via Kali Ghati. Gravity assists but loose scree is treacherous. Watch footing carefully. Rest and recover for the final trek out.","campsite":"Thachdu","meals":"breakfast, lunch, dinner","water":"Streams on descent"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Jaon Trailhead","lat":31.75,"lng":76.85,"altitude_m":1700,"day":2,"type":"trailhead"},
    {"name":"Singhad Base Camp","lat":31.78,"lng":76.82,"altitude_m":2400,"day":2,"type":"junction"},
    {"name":"Thachdu Campsite","lat":31.82,"lng":76.80,"altitude_m":3180,"day":2,"type":"campsite"},
    {"name":"Kali Ghati Rock Section","lat":31.85,"lng":76.78,"altitude_m":4400,"day":3,"type":"pass"},
    {"name":"Bheem Dwar","lat":31.88,"lng":76.75,"altitude_m":4850,"day":3,"type":"campsite"},
    {"name":"Parvati Bagh Meadow","lat":31.90,"lng":76.73,"altitude_m":4150,"day":4,"type":"landmark"},
    {"name":"Shrikhand Mahadev Summit","lat":31.92,"lng":76.70,"altitude_m":5227,"day":4,"type":"summit"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Shimla → Rampur Bushahr (130km, 6hr via HRTC or shared taxi) → Nirmand (35km, 1.5hr) → Jaon (25km via Singhad, 1.5hr). HRTC buses run daily Shimla-Rampur. No direct transport Rampur-Jaon; hire shared jeep or taxi (₹2,500-4,000).'),
  permit_details = COALESCE(permit_details, 'No permit required but mandatory HP Tourism registration + medical fitness certificate (issued by any government hospital) at Singhad base camp. Registration happens at the gate before trek. Yatra window: mid-July to mid-August only (fixed annual window due to snow stability). 2026 official start expected around July 14. Online registration opens ~July 1.'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":22000,"with_guide":32000,"with_operator":48000,"note":"Budget high due to altitude (5227m), permit registration, and mandatory guides. Includes porter, food, base camp logistics."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Day 2: Streams reliable. Day 3: Scarce; carry 2.5L. Day 4: No water above Parvati Bagh — carry 3L for summit. Day 5: Abundant on descent.'),
  network_coverage = COALESCE(network_coverage, 'BSNL only till Nirmand/Jaon. Zero signal beyond. Satellite communication not available on trek.'),
  emergency_contacts = COALESCE(emergency_contacts, 'SDRF Himachal Pradesh 1070. Nirmand SDM Office. Rampur Police 01782-233330. Nearest hospital: Regional Hospital Rampur (60km), IGMC Shimla (180km for serious cases).'),
  nearest_hospital = COALESCE(nearest_hospital, 'Regional Hospital Rampur (60km from Jaon). IGMC Shimla (serious cases, 180km).'),
  source_url = COALESCE(source_url, 'https://hptdc.in/index.php/shreekhand-mahadev-trek/'),
  last_reviewed_at = NOW()
WHERE id = 'shrikhand-mahadev-yatra-trek';

-- source: https://www.tourmyindia.com/treks/lamayuru-alchi-trek.html
-- source: https://lifeontheplanetladakh.com/tours/lamayuru-to-alchi-via-stakspi-la-trek-a-5-day
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Lamayuru Monastery to Prinkti La Pass","distance_km":10,"altitude_m":3750,"hours":6,"terrain":"stream valley, alpine meadow","description":"Start trek from Lamayuru Monastery (11th century). Follow a stream and gradually climb northeast to Prinkti La Pass (3,750m). Pass through alpine meadows with yak herds. Reach Shilla village (3,700m) en route. Camp at base of pass.","campsite":"Prinkti La Camp","meals":"breakfast, lunch, dinner","water":"Stream available till pass"},
    {"day":2,"title":"Prinkti La to Wanla Gompa","distance_km":9,"altitude_m":3250,"hours":5,"terrain":"boulder descent, valley meadow","description":"Descend steeply from Prinkti La through dry stream bed and boulder fields. Reach Wanla village and ancient Wanla Gompa (3,250m) nestled in a side valley. Wanla is a strategic stop between the two monasteries.","campsite":"Wanla Gompa","meals":"breakfast, lunch, dinner","water":"Village well and streams"},
    {"day":3,"title":"Wanla to Alchi Monastery","distance_km":9,"altitude_m":3100,"hours":5,"terrain":"valley trail, Indus approach","description":"Trek from Wanla towards the Indus River valley. Descend gradually through prayer-flag valleys and small chortens. Reach Alchi Monastery (3,100m) — famous for ornate Buddhist murals and statues. Village of Alchi is on the Indus River.","campsite":"Alchi Village Lodge","meals":"breakfast, lunch, dinner","water":"Streams and Indus water available"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Lamayuru Monastery","lat":34.25,"lng":77.12,"altitude_m":3510,"day":1,"type":"monastery"},
    {"name":"Shilla Village","lat":34.28,"lng":77.15,"altitude_m":3700,"day":1,"type":"junction"},
    {"name":"Prinkti La Pass","lat":34.30,"lng":77.18,"altitude_m":3750,"day":1,"type":"pass"},
    {"name":"Wanla Gompa","lat":34.27,"lng":77.22,"altitude_m":3250,"day":2,"type":"monastery"},
    {"name":"Prayer Flag Valley","lat":34.26,"lng":77.28,"altitude_m":3350,"day":3,"type":"landmark"},
    {"name":"Alchi Monastery","lat":34.23,"lng":77.35,"altitude_m":3100,"day":3,"type":"monastery"},
    {"name":"Alchi on Indus","lat":34.22,"lng":77.37,"altitude_m":3050,"day":3,"type":"junction"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Leh → Lamayuru Monastery (160km by road via Khardung La or alternative routes, 5-6hr). Return pickup from Alchi (90km from Leh, 3hr). Shared taxis available Leh-Lamayuru-Alchi.'),
  permit_details = COALESCE(permit_details, 'No special permit required for Indians. Foreigners need Inner Line Permit (ILP), cost ₹590, issued at Leh District Collector office or online. Trek is well-marked and popular with trekking groups.'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":9000,"with_guide":14000,"with_operator":22000,"note":"Budget covers guide, porter, local food, gompas visits. Operator packages include Leh stays and transport."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Day 1: Stream valleys provide water till Prinkti La. Day 2: Wanla village well and streams. Day 3: Abundant water near Indus; some dry stretches at high points — carry 1.5L.'),
  network_coverage = COALESCE(network_coverage, 'Jio/Airtel patchy between Lamayuru and Wanla. Better coverage at Alchi. BSNL limited to Leh area.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Ladakh Police Control Leh 01982-255050. Nearest medical facility: CHC Lamayuru (basic, 160km from Leh); serious cases: Central Hospital Leh (90km from Alchi).'),
  nearest_hospital = COALESCE(nearest_hospital, 'CHC Lamayuru (basic, 160km from Leh). Central Hospital Leh (90km from Alchi, serious cases).'),
  source_url = COALESCE(source_url, 'https://www.tourmyindia.com/treks/lamayuru-alchi-trek.html'),
  last_reviewed_at = NOW()
WHERE id = 'lamayuru-alchi-trek';

-- source: https://www.trekmunk.com/treks/lamayuru-to-padum-trek
-- source: https://www.yatritrekking.com/en/lamayuru-padum-trekking.html
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Leh to Lamayuru Monastery","distance_km":160,"altitude_m":3510,"hours":6,"terrain":"motorway","description":"Drive from Leh to Lamayuru Monastery (5-6hr via Khardung La or bypass). Overnight in Lamayuru village guesthouse. Acclimatization walk around monastery.","campsite":"Lamayuru Guesthouse","meals":"dinner, breakfast","water":"Village water available"},
    {"day":2,"title":"Lamayuru to Prinkti La to Wanla","distance_km":19,"altitude_m":3250,"hours":7,"terrain":"alpine, valley descent","description":"Trek from Lamayuru via Prinkti La (3,750m) to Wanla Gompa (3,250m). Long trekking day with steady climbs and descents.","campsite":"Wanla","meals":"breakfast, lunch, dinner","water":"Streams available"},
    {"day":3,"title":"Wanla to Padum via Tar La approach (Stage 1 Lingshed variant)","distance_km":22,"altitude_m":3900,"hours":8,"terrain":"high desert, rocky, alpine","description":"Trek northeast through barren landscape. Ascend towards Tar La Pass approach (5,250m, not fully crossed on this day). Camp at intermediate point between Wanla and Tar La at 3,900m.","campsite":"Tar La Base Camp","meals":"breakfast, lunch, dinner","water":"Streams at lower elevations; carry 2L for upper sections"},
    {"day":4,"title":"Tar La Pass crossing (5,250m) descent to Kiupa La region","distance_km":18,"altitude_m":4100,"hours":8,"terrain":"scree pass, high alpine plateau","description":"Cross Tar La Pass (5,250m) in alpine conditions. Descend to Kiupa La area (3,850m). Sparse vegetation, prayer flags mark the route. Thin air and altitude exposure.","campsite":"Kiupa La Camp","meals":"breakfast, lunch, dinner","water":"Snowmelt at higher elevations; scarce below"},
    {"day":5,"title":"Kiupa La area to Lingshed village","distance_km":16,"altitude_m":3900,"hours":6,"terrain":"rocky descent, village approach","description":"Trek to Lingshed (3,900m), a remote village with gompa. Descend through valleys. Lingshed is a cultural hub and rest point on the main Padum-Lamayuru route.","campsite":"Lingshed","meals":"breakfast, lunch, dinner","water":"Village well and streams"},
    {"day":6,"title":"Lingshed to Murgum La approach","distance_km":15,"altitude_m":4100,"hours":7,"terrain":"rocky, alpine meadow","description":"Trek north towards Murgum La (4,100m). Sparse desert landscape. Ascend towards pass. Camp near Murgum La.","campsite":"Murgum La Camp","meals":"breakfast, lunch, dinner","water":"Limited; carry 2.5L"},
    {"day":7,"title":"Murgum La to Hanuma La base (4,800m approach)","distance_km":20,"altitude_m":4400,"hours":8,"terrain":"high plateau, scree","description":"Cross Murgum La descent. Trek across high Zanskar plateau. Ascend towards Hanuma La (4,800m) — one of the highest passes. Remote landscape with nomadic herds.","campsite":"Hanuma La Base","meals":"breakfast, lunch, dinner","water":"Snowmelt streams; carry 3L"},
    {"day":8,"title":"Hanuma La crossing to Lanang","distance_km":18,"altitude_m":4000,"hours":8,"terrain":"pass crossing, descent","description":"Summit push to Hanuma La (4,800m). Descend to Lanang village (4,000m). Views of surrounding Zanskar ranges.","campsite":"Lanang","meals":"breakfast, lunch, dinner","water":"Streams at Lanang"},
    {"day":9,"title":"Lanang to Padum via Netoski La (4,475m) — Yulchung — Kanji","distance_km":22,"altitude_m":3400,"hours":7,"terrain":"alpine descent, village trail","description":"Trek south. Cross Netoski La (4,475m). Descend through Skiumpata, Yulchung to Kanji and finally Padum town (3,400m). Final push to administrative hub of Zanskar.","campsite":"Padum Town","meals":"breakfast, lunch, dinner","water":"Abundant on descent to Padum"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Leh","lat":34.16,"lng":77.58,"altitude_m":3500,"day":1,"type":"trailhead"},
    {"name":"Lamayuru Monastery","lat":34.25,"lng":77.12,"altitude_m":3510,"day":1,"type":"monastery"},
    {"name":"Prinkti La Pass","lat":34.30,"lng":77.18,"altitude_m":3750,"day":2,"type":"pass"},
    {"name":"Wanla Gompa","lat":34.27,"lng":77.22,"altitude_m":3250,"day":2,"type":"monastery"},
    {"name":"Tar La Pass","lat":34.22,"lng":77.08,"altitude_m":5250,"day":3,"type":"pass"},
    {"name":"Kiupa La","lat":34.15,"lng":76.95,"altitude_m":3850,"day":4,"type":"pass"},
    {"name":"Lingshed Village","lat":34.10,"lng":76.88,"altitude_m":3900,"day":5,"type":"junction"},
    {"name":"Murgum La","lat":34.08,"lng":76.75,"altitude_m":4100,"day":6,"type":"pass"},
    {"name":"Hanuma La","lat":34.05,"lng":76.60,"altitude_m":4800,"day":7,"type":"pass"},
    {"name":"Lanang","lat":33.95,"lng":76.55,"altitude_m":4000,"day":8,"type":"campsite"},
    {"name":"Netoski La","lat":33.85,"lng":76.48,"altitude_m":4475,"day":9,"type":"pass"},
    {"name":"Padum Town","lat":33.75,"lng":76.50,"altitude_m":3400,"day":9,"type":"junction"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Leh → Lamayuru (160km, 5-6hr via Khardung La). End trek at Padum (return drive 270km to Leh via Kargil, 12-14hr, or fly). Alternative: reverse direction starting from Padum.'),
  permit_details = COALESCE(permit_details, 'No special trek permit for Indians. Foreigners need Inner Line Permit (ILP), cost ₹590, valid for all Zanskar/Ladakh trekking. Professional guide essential — route is untracked in sections and remote. Guide cost ₹3,000-5,000/day.'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":85000,"with_guide":125000,"with_operator":165000,"note":"9-day remote trek is expensive due to guide, porter, full logistics. Operator packages include Leh/Padum stays, all meals, emergency coordination."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Days 1-3: Streams reliable. Days 4-7: Scarce; carry 2.5-3L. High passes have snowmelt only. Days 8-9: Abundant streams and village wells.'),
  network_coverage = COALESCE(network_coverage, 'Jio/Airtel weak to absent on trek. Leh and Padum have 4G coverage. Satellite phone essential for emergencies.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Ladakh Police Control Leh 01982-255050. Padum SDM Office 01983-242001. Nearest hospital: District Hospital Leh (pre-trek), CHC Padum (post-trek, basic).'),
  nearest_hospital = COALESCE(nearest_hospital, 'District Hospital Leh (pre-trek, 160km from Lamayuru). CHC Padum (post-trek). Both basic; serious cases require air evacuation.'),
  source_url = COALESCE(source_url, 'https://www.trekmunk.com/treks/lamayuru-to-padum-trek'),
  last_reviewed_at = NOW()
WHERE id = 'padum-lamayuru-traverse';

-- source: https://discoverwithdheeraj.com/phugtal-monastery-trek-travel-guide/
-- source: https://taleof2backpackers.com/phugtal-monastery-trek/
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Leh to Padum via Kargil","distance_km":270,"altitude_m":3400,"hours":12,"terrain":"motorway, high pass","description":"Long drive from Leh to Padum through Kargil and Rangdum Pass (4,087m). Scenic Suru Valley and Nun-Kun peaks. Overnight in Padum town guesthouse.","campsite":"Padum Town Lodge","meals":"dinner, breakfast","water":"Town water available"},
    {"day":2,"title":"Padum to Cha Village","distance_km":15,"altitude_m":3600,"hours":3,"terrain":"motorway, jeep track","description":"Drive from Padum south to Cha (Chah) village (2-2.5hr). Trek from Cha village is 2-3 hours to Phugtal Monastery approach. Overnight in Cha village guesthouse to acclimatize.","campsite":"Cha Village Lodge","meals":"breakfast, lunch, dinner","water":"Village well"},
    {"day":3,"title":"Cha Village to Phugtal Monastery via Lungnak Valley","distance_km":8,"altitude_m":3850,"hours":5,"terrain":"river valley, trail, cliff approach","description":"Trek from Cha through scenic Lungnak Valley following the river. Trail winds through prayer-flag paths and river bends. Reach Phugtal Monastery (3,850m) honeycomb-shaped gompa built into vertical cliff face. Meet monks, explore cave temple and assembly hall. Overnight in monastery guest rooms or camp nearby.","campsite":"Phugtal Monastery/Camp","meals":"breakfast, lunch, dinner","water":"Lungnak River and monastery spring"},
    {"day":4,"title":"Phugtal Monastery exploration and return trek to Raru","distance_km":12,"altitude_m":3200,"hours":5,"terrain":"river valley descent, rocky","description":"Morning meditation or monastery visit. Retrace steps along Lungnak River towards Raru village. Pick up at Raru by jeep. Drive back to Padum for overnight.","campsite":"Padum Town Lodge","meals":"breakfast, lunch, dinner","water":"River available throughout"},
    {"day":5,"title":"Padum to Leh return drive","distance_km":270,"altitude_m":3500,"hours":12,"terrain":"motorway","description":"Return drive to Leh via Kargil and Rangdum. Long but scenic drive through multiple passes. Reach Leh by evening. Trek complete.","campsite":"Leh","meals":"breakfast, lunch, snacks in transit","water":"Town water on arrival"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Leh","lat":34.16,"lng":77.58,"altitude_m":3500,"day":1,"type":"trailhead"},
    {"name":"Kargil town","lat":34.55,"lng":76.12,"altitude_m":2648,"day":1,"type":"junction"},
    {"name":"Rangdum Pass","lat":34.18,"lng":76.45,"altitude_m":4087,"day":1,"type":"pass"},
    {"name":"Padum town","lat":33.75,"lng":76.50,"altitude_m":3400,"day":1,"type":"junction"},
    {"name":"Cha (Chah) Village","lat":33.60,"lng":76.52,"altitude_m":3600,"day":2,"type":"campsite"},
    {"name":"Lungnak River Valley","lat":33.48,"lng":76.58,"altitude_m":3700,"day":3,"type":"landmark"},
    {"name":"Phugtal Monastery","lat":33.40,"lng":76.65,"altitude_m":3850,"day":3,"type":"monastery"},
    {"name":"Raru Village","lat":33.50,"lng":76.68,"altitude_m":3200,"day":4,"type":"junction"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Leh → Kargil (240km, 7-8hr via Lamayuru Road or Khardung La) → Padum (120km, 4hr via Rangdum Pass). From Padum, drive/jeep to Cha village (15km, 45min-1hr). Trek to monastery 3-5km from Cha. Return transport arranged in Zanskar region.'),
  permit_details = COALESCE(permit_details, 'No special trek permit for Indians. Foreigners need Inner Line Permit (ILP), ₹590, issued at Leh. Monastery respects prayer times — visit outside 6-8am and 5-7pm. Donations welcomed (₹100-500).'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":35000,"with_guide":50000,"with_operator":70000,"note":"Cost high due to Leh-Padum drives. Budget covers full logistics, jeep hire, guide, monastery stay, meals. Operator packages include Leh hotel, internal flights option."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Lungnak River provides water throughout the trek. Monastery has reliable spring water. Carry 1-2L only for day 3 trek.'),
  network_coverage = COALESCE(network_coverage, 'Jio weak at Padum. Zero signal in Lungnak Valley and at monastery. Satellite communication may be necessary for emergencies.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Padum SDM Office 01983-242001. Monks at Phugtal can arrange basic first aid. Nearest hospital: CHC Padum (basic, 40km from Cha). Serious cases: District Hospital Leh (270km, requires air evacuation).'),
  nearest_hospital = COALESCE(nearest_hospital, 'CHC Padum (basic, 40km from Cha). District Hospital Leh (serious cases, 270km, air evacuation required).'),
  source_url = COALESCE(source_url, 'https://discoverwithdheeraj.com/phugtal-monastery-trek-travel-guide/'),
  last_reviewed_at = NOW()
WHERE id = 'phugtal-monastery-trek';

-- source: https://www.shikhar.com/blog/spituk-to-stok-trek-ladakh/
-- source: https://lifeontheplanetladakh.com/tours/spituk-to-stok-trek
UPDATE treks SET
  day_by_day = COALESCE(day_by_day, '[
    {"day":1,"title":"Leh acclimatization and Spituk Monastery visit","distance_km":10,"altitude_m":3500,"hours":3,"terrain":"town walk, vehicle","description":"Spend acclimatization day in Leh (3,500m). Morning visit to Leh Palace and Main Bazaar. Afternoon: short 2-3 km walk to Shanti Stupa or Gyamsa village. Evening: visit Spituk Gompa (closest monastery to Leh, 15min drive). Overnight in Leh guesthouse.","campsite":"Leh Lodge","meals":"breakfast, lunch, dinner","water":"Town water available"},
    {"day":2,"title":"Leh to Spituk Monastery and trek to Zingchen Valley","distance_km":8,"altitude_m":3200,"hours":4,"terrain":"monastery approach, river valley","description":"Drive from Leh (15min) to Spituk Monastery (9km). Trek from Spituk through Indus-adjacent terrain. Descend into Zingchen valley (3,200m) — scenic green oasis with streams and willows. Camp at Zingchen campsite.","campsite":"Zingchen Valley","meals":"breakfast, lunch, dinner","water":"Streams abundant in valley"},
    {"day":3,"title":"Zingchen to Stok La Pass (4,900m) to Stok Village","distance_km":8,"altitude_m":3250,"hours":5,"terrain":"high alpine, narrow pass, rocky descent","description":"Trek from Zingchen uphill through alpine terrain to Stok La Pass (4,900m). Views of Indus Valley and surrounding ranges. Descend steeply to Stok village (3,250m). Overnight in Stok guesthouse.","campsite":"Stok Village Lodge","meals":"breakfast, lunch, dinner","water":"Streams at pass approaches; village well"}
  ]'::jsonb),
  trail_points = COALESCE(trail_points, '[
    {"name":"Leh City","lat":34.16,"lng":77.58,"altitude_m":3500,"day":1,"type":"trailhead"},
    {"name":"Shanti Stupa","lat":34.15,"lng":77.60,"altitude_m":3600,"day":1,"type":"landmark"},
    {"name":"Spituk Monastery","lat":34.15,"lng":77.47,"altitude_m":3700,"day":2,"type":"monastery"},
    {"name":"Zingchen Valley","lat":34.17,"lng":77.42,"altitude_m":3200,"day":2,"type":"campsite"},
    {"name":"Stok La Pass","lat":34.18,"lng":77.35,"altitude_m":4900,"day":3,"type":"pass"},
    {"name":"Stok Village","lat":34.17,"lng":77.32,"altitude_m":3250,"day":3,"type":"junction"}
  ]'::jsonb),
  how_to_reach = COALESCE(how_to_reach, 'Leh is the hub. Spituk Monastery is 15min drive from Leh city center (9km). Stok village is 40km from Leh (1.5hr drive). Most trekkers base in Leh and do Spituk-Stok as an overnight or day trek from town. Return transport from Stok to Leh via jeep.'),
  permit_details = COALESCE(permit_details, 'No special permit required for Indians. Foreigners need Inner Line Permit (ILP), ₹590, issued at Leh District Collector or online. Trek is popular with tourists; easily arranged from Leh guesthouses and tour operators.'),
  cost_estimate = COALESCE(cost_estimate, '{"budget":6000,"with_guide":9000,"with_operator":15000,"note":"Budget covers guide, porter, meals, camping. One of Ladakh''s most affordable treks due to proximity to Leh and minimal logistics."}'::jsonb),
  water_sources = COALESCE(water_sources, 'Day 1: Leh town water. Day 2: Zingchen Valley streams abundant. Day 3: Streams at lower elevations; carry 1.5L on upper sections and pass.'),
  network_coverage = COALESCE(network_coverage, 'Jio/Airtel good signal in Leh and Spituk. Patchy signal in Zingchen Valley. Fair coverage at Stok.'),
  emergency_contacts = COALESCE(emergency_contacts, 'Leh Police Control 01982-255050. Stok village SDM can coordinate local help. Nearest hospital: District Hospital Leh (well-equipped, 40km from Stok).'),
  nearest_hospital = COALESCE(nearest_hospital, 'District Hospital Leh (well-equipped, 40km from Stok).'),
  source_url = COALESCE(source_url, 'https://www.shikhar.com/blog/spituk-to-stok-trek-ladakh/'),
  last_reviewed_at = NOW()
WHERE id = 'spituk-stok-trek';

-- Verification count
SELECT COUNT(*) as updated_treks FROM treks
WHERE id IN ('kinner-kailash-parikrama-trek','manimahesh-yatra-trek','shrikhand-mahadev-yatra-trek','lamayuru-alchi-trek','padum-lamayuru-traverse','phugtal-monastery-trek','spituk-stok-trek')
AND last_reviewed_at = NOW();

-- 7 treks updated: kinner-kailash-parikrama-trek, manimahesh-yatra-trek, shrikhand-mahadev-yatra-trek, lamayuru-alchi-trek, padum-lamayuru-traverse, phugtal-monastery-trek, spituk-stok-trek
