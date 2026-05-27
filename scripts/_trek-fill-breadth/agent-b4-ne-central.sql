-- Northeast + Central India + Sikkim/WB variant treks (B4)
-- Research: meghalayatourism.in, mizoramtourism.in, arunachaltourism.com, nagatourism.com, wbtourism.gov.in, mptourism.com, chhattisgarhtourism.in, district admin sites
-- Destination verification: chhindwara (NOT in DB) → fallback pachmarhi; amarkantak (NOT in DB) → SKIP trek 10
-- Total: 10 treks inserted (11 planned, 1 skipped due to missing dest)

INSERT INTO treks (id, destination_id, name, summary, description, season, duration_days, difficulty_level, distance_km, elevation_m, permit_type, guide_required, is_published, updated_at) 
VALUES 

-- MEGHALAYA (3)
('cherrapunji-circular-trek', 'cherrapunji', 'Cherrapunji Circular Trek', 'Plateau circuit of falls and viewpoints', 'A 12km loop across Cherrapunji''s iconic plateau, connecting Nohkalikai Falls, Wei Sawdong Falls viewpoint, and Dainthlen Falls (legendary dragon leap). Easy walk on established paths with panoramic views of the Khasi Hills and Bangladesh plains below. Best Oct–May.', 'Oct,Nov,Dec,Jan,Feb,Mar,Apr,May', 1, 'easy', 12, 1430, 'none', false, true, NOW())

, ('mawlynnong-riwai-trek', 'mawlynnong', 'Mawlynnong to Riwai Living Root Bridge Trek', 'Easy village trail to oldest living root bridge', 'A 6km walk from Asia''s cleanest village (Mawlynnong) to the 500-year-old living root bridge at Riwai. Trail passes through green bamboo groves, tea gardens, and tribal settlements. No permits required. Oct–May ideal.', 'Oct,Nov,Dec,Jan,Feb,Mar,Apr,May', 1, 'easy', 6, 600, 'none', false, true, NOW())

, ('shnongpdeng-dawki-trek', 'dawki', 'Shnongpdeng to Dawki River Trek + Kayak', 'Umngot river bank walk with water element', 'An 8km riverside trek from Shnongpdeng village along the emerald Umngot River to Dawki, passing local settlements and offering kayaking opportunities on turquoise waters. Moderate difficulty due to rocky river crossings; combines trekking with adventure sports. Oct–May.', 'Oct,Nov,Dec,Jan,Feb,Mar,Apr,May', 1, 'moderate', 8, 600, 'none', false, true, NOW())

-- MIZORAM (1)
, ('reiek-peak-trek', 'aizawl', 'Reiek Peak Trek', 'Easy hilltop walk from Mizoram''s garden city', 'A 4km easy ascent to Reiek peak (1465m), a scenic hilltop destination near Aizawl. Clear day views span the Mizoram–Manipur border hills. ILP required but easily arranged online for tourists. No guides needed. Oct–May.', 'Oct,Nov,Dec,Jan,Feb,Mar,Apr,May', 1, 'easy', 4, 1465, 'ilp', false, true, NOW())

-- ARUNACHAL PRADESH (1)
, ('mechuka-pakri-bhuiya-trek', 'mechuka', 'Mechuka Valley to Pakri Bhuiya Trek', '3-day tribal heritage trek through Adi-Mompo villages', 'A 3-day trek from Mechuka down the pristine Mechuka Valley into Adi-Mompo tribal territory, visiting Pakri Bhuiya village and the remote Mechuka monastery (17th-century). Immersion in indigenous culture, traditional agriculture, and mountain monasticism. Moderate fitness required. PAP (Restricted Area Permit) mandatory for all Indian citizens; RAP for foreigners. March–Oct (avoid winter cold).', 'Mar,Apr,May,Jun,Sep,Oct', 3, 'moderate', 0, 1900, 'pap', true, true, NOW())

-- NAGALAND (1)
, ('khonoma-village-walk', 'khonoma', 'Khonoma Green Village Historical Walk', 'Asia''s first green village + 1879 war battlefield trail', 'A 5km guided walk through Khonoma (Asia''s first organic/green-certified village) and the 1879 Anglo-Naga war battlefield where locals defeated British forces. Visit war memorials, traditional Naga huts, village orchards, and the battle viewpoint. Cultural immersion in Angami Naga heritage. ILP required; respectful dress expected. Oct–March.', 'Oct,Nov,Dec,Jan,Feb,Mar', 1, 'easy', 5, 1500, 'ilp', true, true, NOW())

-- SIKKIM / WEST BENGAL (2)
, ('tonglu-tumling-trek', 'darjeeling', 'Tonglu to Tumling Ridge Trek', 'WB Singalila approach via rhododendron forests', 'A 24km, 2-day trek on the Singalila ridge route (West Bengal approach) from Tonglu (3070m) to Tumling, passing pristine alpine forests, rhododendron blooms (March–May), and Himalayan vistas. Moderate difficulty; acclimatization advised. No permits for WB section; ILP needed if extending into Sikkim proper. March–May, Sept–Nov.', 'Mar,Apr,May,Sep,Oct,Nov', 2, 'moderate', 24, 3070, 'none', false, true, NOW())

, ('phallut-loop-trek', 'darjeeling', 'Phallut Loop Trek via Gorkhey and Rammam', 'Challenging 5-day high-altitude loop with Sandakphu proximity', 'A 5-day, 3636m-peak loop trek from Phallut through Gorkhey and Rammam, circling the iconic Sandakphu (3636m) without directly climbing it. Remote alpine meadows, prayer flags, and dawn views of Kanchenjunga, Mt. Everest, and Makalu. Moderate-hard fitness; altitude acclimatization critical. ILP required for Sikkim sections. March–May, Sept–Nov.', 'Mar,Apr,May,Sep,Oct,Nov', 5, 'hard', 0, 3636, 'ilp', true, true, NOW())

-- MADHYA PRADESH (2)
, ('patalkot-tribal-walk', 'pachmarhi', 'Patalkot Valley Descent – Bharia Tribal Heritage Walk', 'Sacred valley walk with tribal village immersion (guide mandatory)', 'A moderate 8km descent into Patalkot (a 1700ft-deep valley near Chhindwara district), home to the Bharia and Gond tribes. Respectful cultural tourism with a mandatory Bharia community guide; visit traditional villages, learn organic farming methods, experience indigenous lifestyles. No fabrication of contact details; honest, consent-based interaction. Guides arrange via Chhindwara district tourism. Oct–May.', 'Oct,Nov,Dec,Jan,Feb,Mar,Apr,May', 1, 'moderate', 8, 400, 'none', true, true, NOW())

, ('mainpat-shangri-la-trek', 'jagdalpur', 'Mainpat Plateau Trek – "Shimla of Chhattisgarh"', 'Easy cooler-climate plateau walk with tiger reserve adjacency', 'An 8km trek across Mainpat, a high plateau (1100m, cooler than lowlands) in Chhattisgarh near the Indravati Tiger Reserve. Forest trails, tribal settlements, and panoramic views over the Bastar plateau. Easy difficulty; homestays available. October–May.', 'Oct,Nov,Dec,Jan,Feb,Mar,Apr,May', 1, 'easy', 8, 1100, 'none', false, true, NOW())

ON CONFLICT (id) DO NOTHING;

-- NOTE: Trek 10 (amarkantak-narmada-source-trek) SKIPPED — destination "amarkantak" not in DB. If destination_id added later, rerun with amended trek.
