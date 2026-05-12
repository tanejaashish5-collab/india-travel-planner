-- Gandikota destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: gandikota | best_months [10,11,12,1,2,3,9] | avoid [5,6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 1, 5, 'go',
  'Peak window. 16-28C. Fort + Pennar gorge + Jamia Masjid at year-cleanest. APTDC Haritha books fast.',
  'January at Gandikota is the year-best window. Daytime 27-28C, rainfall sub-15mm. Pennar gorge sunset at year-cleanest light. Gandikota Fort + Madhavaraya temple + Jamia Masjid walk cleanly. APTDC Haritha at peak booking.',
  NULL,
  'Gandikota in January is the version every "Grand Canyon of India" planner books first. The Erramala hills cleaved open by the Pennar river into a 300-foot-deep gorge — the visual that gives Gandikota its Grand Canyon nickname (the actual Grand Canyon of Arizona runs 6,000ft so the scale is incommensurable but the dramatic red-rock-cliff cleaved-river-gorge resemblance is real) at year-best photography light. Daytime 27-28C, nights 16-17C, humidity 50 percent, rainfall under 15mm. Gandikota Fort — 1123 CE Kakatiya-origin, expanded by the Pemmasani Nayakas in the 16th-17th century during the Vijayanagara empire''s southern expansion, a 13-acre fort plateau atop the gorge — walks cleanly through the full day. The Madhavaraya Swamy temple inside the fort complex (the 1500s Vijayanagara Vaishnavite shrine, granite construction with characteristic Vijayanagara-period sculpture) at full visibility. Jamia Masjid (1582, Adil Shahi architectural influence — the Bijapur Sultanate''s temporary control over the fort in the late 16th century is the explanatory context) at clean condition.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 2, 5, 'go',
  'Driest stretch. 18-30C. Fort walks at full visibility. Sunset gorge photos at year-best.',
  'February is the technical peak. Rainfall under 10mm, daytime 28-30C. Fort + Madhavaraya temple + Jamia Masjid + Pennar gorge sunset at year-best. APTDC Haritha full weekend bookings.',
  NULL,
  'February in Gandikota is the technical peak. Rainfall under 10mm, daytime 28-30C, nights 18-19C, humidity 45 percent — the Rayalaseema rain-shadow at year-driest. The Pennar gorge sunset cliff position at year-cleanest light. Gandikota Fort (13-acre Kakatiya-Pemmasani Nayaka fort plateau atop the gorge) walks cleanly through the full day. The Madhavaraya Swamy temple at full visibility — the 1500s Vijayanagara Vaishnavite granite construction at its most photogenic in the clean dry-season light. Jamia Masjid (1582 Adil Shahi influence) workable. The Charminar-like four-pillar gateway at the fort''s eastern approach clean. The Pennar river-bed walk (the cliff descent through the cleaved gorge, ~30 min one-way) viable through morning and late afternoon. APTDC Haritha Hotel at peak weekend booking; weekday occupancy moderate. The 80km Belum Caves cross-trip becomes a single-day combination — Belum Caves morning + Gandikota afternoon-and-sunset works as a clean Rayalaseema circuit from Hyderabad-Bengaluru. Tadipatri (40km, the nearest decent town) hotels ₹1,200-2,500. Jammalamadugu (30km, on the gorge''s opposite-bank side) sees minimal accommodation.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 3, 4, 'go',
  'Last cool month. 20-33C. Fort walks compress past 11am. Rates ease 20 percent.',
  'March is the soft-landing month. Daytime climbs 31-33C. Fort walks compress to pre-11am and post-5pm. Sunset gorge photos workable. Hotel rates ease 20 percent off February peak.',
  NULL,
  'March in Gandikota is the transition month. Daytime 31-33C, nights 20-21C, humidity 50 percent, rainfall under 20mm. Pre-monsoon dust haze begins to compromise the deep-gorge visibility through the last fortnight. Gandikota Fort walks compress to pre-11am and post-5pm — the granite-and-sandstone fort plateau heats sharply through late morning and the exposed-sun crossings of the 13-acre fort interior become heat-stress-limited. The Madhavaraya Swamy temple at full visibility (cool stone interior at any hour). Jamia Masjid workable through morning. The Pennar gorge sunset cliff position workable from 5pm onwards. The cliff descent to the Pennar river-bed compresses to morning only — the rocky path retains heat through afternoon. APTDC Haritha at moderate-to-full weekend booking. The 80km Belum Caves cross-trip continues; Belum Caves underground temperature stays consistent year-round so the cross-trip combination works through March. Hotel rates ease 20 percent off February: APTDC Haritha ₹2,200-3,800; Tadipatri-Jammalamadugu guest houses ₹900-2,000. Last clean-comfort window before April heat dome opens — the Rayalaseema plains here run 40-44C through Apr-Jun.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 4, 2, 'wait',
  'Heat ramps. 23-38C. Fort walks impossible mid-day. Rock surface 45C+. Push to October.',
  'April pushes Gandikota into Rayalaseema heat. Daytime 36-38C. Fort sandstone-and-granite at 45-48C surface noon. Walks compress to 5-8am only. APTDC Haritha rates at off-peak.',
  'April at Gandikota loses the fort walk. Daytime 36-38C with rock surface 45-48C makes the 13-acre fort plateau and the Pennar gorge cliff position unsafe past 8am. Sunset photo still viable. October opens the proper window.',
  'April in Gandikota is the pre-monsoon Rayalaseema heat ramp. Daytime 36-38C, nights 23-24C, humidity 45 percent, rainfall under 30mm. Pre-monsoon dust haze through the second fortnight compromises the deep-gorge visibility further. Gandikota Fort walks impossible past 8am — the granite-and-sandstone fort plateau holds 45-48C surface heat by 11am and the 13-acre fort interior with limited shade becomes heat-stroke territory through afternoon. The Madhavaraya Swamy temple at full ritual tempo (cool stone interior workable). Jamia Masjid workable in the cool stone interior. The Pennar gorge sunset cliff position (5-7pm) still viable but the approach walk to the cliff edge from the fort entrance is exposed-sun ordeal through April. The cliff descent to the Pennar river-bed impossible through April. APTDC Haritha at off-peak occupancy. The 80km Belum Caves cross-trip continues; Belum Caves underground temperature consistent year-round so Belum-only trip remains viable in April. Hotel rates at 30 percent off February: APTDC Haritha ₹1,800-3,400; Tadipatri-Jammalamadugu guest houses ₹800-1,800. October opens the proper fort-and-gorge window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 5, 1, 'skip',
  'Heat peak. 25-41C. Fort sandstone radiates 50C+. Gorge brutal. Skip strict.',
  NULL,
  'May at Gandikota is heat peak. Daytime 39-41C, sandstone-granite fort surface 50-52C. Pennar gorge brutal. The fort cannot be walked. APTDC Haritha at year-low. Push to October. Skip strict.',
  'May in Gandikota is the Rayalaseema heat dome at peak intensity. Daytime 39-41C, nights 25-26C, humidity 40 percent, rainfall under 30mm. Pre-monsoon dust storms hit the second fortnight; the deep-gorge visibility collapses to limited late-afternoon windows. Gandikota Fort (13-acre Kakatiya-Pemmasani Nayaka plateau atop the gorge) cannot be walked — the granite-and-sandstone surfaces hold 50-52C through afternoon and the exposed-fort interior provides no shade. Pre-dawn 4-6am workable but the deep-gorge visibility at that hour requires direct east-light which only opens after sunrise. The Madhavaraya Swamy temple cool stone interior remains a refuge. Jamia Masjid cool interior workable. The Pennar gorge sunset cliff position (5:30-7pm) viable but the approach walk dangerous through May. The cliff descent to the Pennar river-bed impossible. APTDC Haritha at year-low occupancy. The 80km Belum Caves cross-trip works as Belum-only because the cave underground temperature is consistent year-round, but the Gandikota side of the trip cannot run. Hotel rates at year-low: APTDC Haritha ₹1,500-3,000; Tadipatri-Jammalamadugu guest houses ₹700-1,600. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 6, 1, 'skip',
  'SW monsoon light. 24-35C, 70-110mm rain. Fort still hot. Pennar river marginal. Push to October.',
  NULL,
  'June at Gandikota sees first SW monsoon ease but Rayalaseema rain-shadow keeps rainfall light. Fort still 34-35C. Pennar river starts to fill. Conditions marginal. October opens the proper window. Skip.',
  'June in Gandikota is the first easing month but the Rayalaseema rain-shadow keeps the southwest monsoon light. Rainfall 70-110mm across 7-9 wet days, daytime 33-35C, nights 24-25C, humidity 70 percent. The granite-and-sandstone fort surfaces drop from 50C peak to 38-42C mid-day — still uncomfortable through the 11am-4pm window. Pre-dawn (5-8am) and late-afternoon (5-7pm) workable. The Madhavaraya Swamy temple and Jamia Masjid cool stone interiors workable through the day. The Pennar gorge sunset cliff position viable. The cliff descent to the Pennar river-bed becomes possible morning-only as the river starts to fill (the Pennar runs at low flow through most of the dry months and begins to fill through June-August). Pre-monsoon dust haze begins to clear. APTDC Haritha at off-peak. The 80km Belum Caves cross-trip continues. Hotel rates at off-peak: APTDC Haritha ₹1,500-3,000; Tadipatri-Jammalamadugu guest houses ₹700-1,600. The full Gandikota experience (fort plateau walk + gorge cliff position + sunset photo + river-bed descent) cannot run cleanly. October opens the proper window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 7, 2, 'wait',
  'SW monsoon moderate. 23-32C, 90-140mm rain. Pennar filling. Fort workable morning. Push to October.',
  NULL,
  'July at Gandikota continues monsoon. Pennar river filling. Fort plateau hot mid-day. Cloud cover obscures gorge views. October opens the proper photographic window.',
  'July in Gandikota continues the southwest monsoon spillover into the Rayalaseema rain-shadow. Rainfall 90-140mm across 9-11 wet days, daytime 30-32C, nights 23-24C, humidity 75 percent. The Pennar river continues to fill — flow visible at the gorge floor for the first time since the previous monsoon. Gandikota Fort walks compress to morning (5:30-9am) and late afternoon (5-7pm); cloud cover obscures the deep-gorge view through cloudy windows. The Madhavaraya Swamy temple and Jamia Masjid cool stone interiors workable. The Pennar gorge sunset cliff position viable on dry-window evenings — the post-storm clear-air windows can be visually striking but the timing is unreliable. The cliff descent to the Pennar river-bed workable mornings only — surface mud and the unfamiliar tourist-track conditions through the cleaved gorge mean the descent is hazardous on heavy-rain days. APTDC Haritha at off-peak. The 80km Belum Caves cross-trip continues (Belum interior temp consistent year-round). Hotel rates at off-peak: APTDC Haritha ₹1,500-3,000; Tadipatri-Jammalamadugu guest houses ₹700-1,700. October opens the clean gorge-and-fort window with year-best post-monsoon visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 8, 2, 'wait',
  'Monsoon continues. 23-31C, 80-130mm rain. Pennar at fuller flow. Fort still mid-day hot. Push to October.',
  NULL,
  'August at Gandikota continues SW monsoon spillover. Pennar river at fuller flow. Fort plateau still hot. Cloud cover obscures cliff views. October opens the proper window.',
  'August in Gandikota continues the southwest monsoon spillover. Rainfall 80-130mm across 9-11 wet days, daytime 29-31C, nights 23-24C, humidity 78 percent. The Pennar river at fuller flow — the gorge floor now shows visible river flow through the cleaved rock, the year''s best window for the river-in-gorge visual since the previous post-monsoon season. Gandikota Fort walks compress to morning and late afternoon. The Madhavaraya Swamy temple and Jamia Masjid cool stone interiors workable. The Pennar gorge sunset cliff position viable on dry-window evenings; cloud cover often disrupts the sunset view through the heavy monsoon days. The cliff descent to the Pennar river-bed workable mornings. APTDC Haritha at off-peak. The 80km Belum Caves cross-trip continues. Hotel rates at off-peak: APTDC Haritha ₹1,600-3,200; Tadipatri-Jammalamadugu guest houses ₹800-1,800. October opens the cleanest gorge-and-fort window with post-monsoon river flow and dry-air visibility combined.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 9, 4, 'go',
  'Monsoon retreats. 22-30C. Pennar at peak post-monsoon flow. Fort walkable. Last off-peak window.',
  'September is the bridge month. SW monsoon retreats through second half. Pennar river at peak post-monsoon flow — gorge visual at year-most-striking. Fort walkable. Last off-peak value window.',
  NULL,
  'September in Gandikota is the bridge month. Rainfall drops to 80-120mm across 8-10 wet days as the southwest monsoon retreats. Daytime 28-30C, nights 22-23C, humidity 76 percent. The Pennar river at peak post-monsoon flow — the gorge floor shows the year''s most visually striking river-in-cleaved-rock visual; the deep red-sandstone-and-granite gorge cliffs framed against the flowing river give the Grand-Canyon-of-India comparison its strongest visual support. Gandikota Fort (13-acre Kakatiya-Pemmasani Nayaka plateau) walkable through morning and late-afternoon windows. The Madhavaraya Swamy temple at full visibility — the post-monsoon air clarity reveals the 1500s Vijayanagara granite sculpture detail at year-best. Jamia Masjid (1582 Adil Shahi) at clean condition. The Pennar gorge sunset cliff position workable; post-monsoon dry air gives clean sunset visibility through dry-window evenings. The cliff descent to the Pennar river-bed workable in dry windows. APTDC Haritha at off-peak still — last value window before October peak. The 80km Belum Caves cross-trip works cleanly.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 10, 5, 'go',
  'Peak window opens. 21-29C. Pennar river clean. Fort + gorge at year-best photo light.',
  'October opens the proper season. NE monsoon mild here. Daytime 27-29C. Pennar river at clean post-monsoon flow. Fort + Madhavaraya + Jamia Masjid + sunset gorge at year-best photo conditions.',
  NULL,
  'October in Gandikota is the proper season open. The southwest monsoon completes its retreat from the Rayalaseema rain-shadow; the northeast monsoon arrives mild with 70-110mm of rainfall across 6-8 wet days — mostly late-afternoon and evening showers. Daytime 27-29C, nights 21-22C, humidity 70 percent. The Pennar river at clean post-monsoon flow — the gorge floor shows year-most-visually-striking river-in-cleaved-rock conditions. Gandikota Fort (13-acre Kakatiya-Pemmasani Nayaka plateau) walks cleanly through the full day. The Madhavaraya Swamy temple at full visibility. Jamia Masjid (1582 Adil Shahi influence) clean. The Pennar gorge sunset cliff position at year-best photo light — the post-monsoon clear air and the cool evening temperatures combine for the year''s most photographed AP image. The cliff descent to the Pennar river-bed workable through morning and late afternoon. APTDC Haritha at full weekend booking. The 80km Belum Caves cross-trip works cleanly as a one-day combination. Hotel rates climb 20 percent off September: APTDC Haritha ₹2,400-4,200; Tadipatri-Jammalamadugu guest houses ₹1,000-2,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 11, 5, 'go',
  'NE monsoon eases. 18-27C. Fort + gorge at year-cleanest. APTDC Haritha at peak booking.',
  'November is the peak-build month. NE monsoon eases through second half. Daytime 25-27C, nights 18-19C. Pennar river still at clean flow. Fort + gorge at year-cleanest. APTDC Haritha books out 3-4 weeks ahead.',
  NULL,
  'November in Gandikota is one of the year''s peak months. Rainfall drops to 40-80mm across 5-7 wet days as the northeast monsoon eases through the second half. Daytime 25-27C, nights 18-19C, humidity 60 percent. The Pennar river still at clean post-monsoon flow through the first fortnight; the second-fortnight flow eases but remains visible at the gorge floor. Gandikota Fort (13-acre Kakatiya-Pemmasani Nayaka plateau atop the gorge) walks cleanly through the full day. The Madhavaraya Swamy temple at full visibility — the cool dry post-monsoon air reveals the 1500s Vijayanagara granite sculpture work at year-cleanest detail. Jamia Masjid (1582 Adil Shahi influence) clean. The Pennar gorge sunset cliff position at year-cleanest light — the November dry-air and cool evening conditions make this the year''s most-photographed visit window. The cliff descent to the Pennar river-bed workable through the day. APTDC Haritha at peak booking — book 3-4 weeks ahead through weekend windows. The 80km Belum Caves cross-trip works cleanly. Hotel rates at peak: APTDC Haritha ₹2,800-4,800; Tadipatri-Jammalamadugu guest houses ₹1,100-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gandikota', 12, 5, 'go',
  'Cool peak. 16-26C. Christmas-NYE booking peak. Lock APTDC 6 weeks ahead.',
  'December is the peak-cool month. Daytime 24-26C, nights 16-17C. Christmas-NYE corridor brings Hyderabad-Bengaluru family density. APTDC Haritha books out 6 weeks ahead for NYE.',
  NULL,
  'December in Gandikota is the peak-cool month. Rainfall drops to 15-40mm as the northeast monsoon completes retreat through the first half; the second half is the year''s driest stretch. Daytime 24-26C, nights 16-17C, humidity 55 percent. Pennar river at low post-monsoon flow but still visible at the gorge floor. Gandikota Fort (13-acre Kakatiya-Pemmasani Nayaka plateau) walks cleanly through the full day; the cool-stone fort surfaces at year-most-comfortable touch temperatures. The Madhavaraya Swamy temple at full ritual tempo. Jamia Masjid clean. The Pennar gorge sunset cliff position at year-cleanest visibility — the December dry-air and cool evening conditions combine for the most-photographed Gandikota window. The cliff descent to the Pennar river-bed workable through the day. APTDC Haritha at peak booking — the Christmas-NYE corridor (Dec 22 to Jan 5) brings Hyderabad-Bengaluru family density; APTDC Haritha books out 5-6 weeks ahead for NYE. The 80km Belum Caves cross-trip at peak weekend combination. Hotel rates at peak: APTDC Haritha ₹3,000-5,500; Tadipatri-Jammalamadugu guest houses ₹1,200-2,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
