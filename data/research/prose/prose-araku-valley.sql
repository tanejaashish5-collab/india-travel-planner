-- Araku Valley destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: araku-valley | best_months [10,11,12,1,2,3] | avoid [6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 1, 5, 'go',
  'Peak window. 12-26C. Vizag-Araku rail at full schedule. Coffee tours at year-best.',
  'January at Araku is the year-best window. Daytime 25-26C, nights 12-14C. Vizag-Araku Vistadome train (220km, 58 tunnels, 8 hours) at full schedule. Coffee estate tours at peak harvest tail. Tribal Sankramana cluster.',
  NULL,
  'Araku Valley in January is the version every Eastern Ghats coffee-and-rail planner books first. The 911m elevation Eastern Ghats valley — coffee-cultivation country since 1898 under the Andhra Pradesh Forest Development Corporation, the only significant arabica-robusta belt in eastern India — at full peak weather. Daytime 25-26C, nights 12-14C, humidity 60 percent, rainfall under 25mm. The Vizag-Araku Vistadome train (Visakhapatnam Junction departing Kirandul Passenger 06803 at 6:50am, the 220km route through 58 tunnels including the dramatic Borra Caves stop, 8 hours one-way, ₹1,000-1,500 Vistadome class — book 60 days ahead via IRCTC) at full schedule. Coffee tours at the Araku Coffee Plantation (Padmapuram, the original APFDC arabica blocks) and the Anantagiri estates (Koraput-border, the smaller robusta-mixed plantations) at peak post-harvest visibility — the November-January harvest tail is when the drying-yards and the local cupping rooms are at full activity. Tribal Sankramana (tribal harvest festival, mid-January) at Borra and Araku villages brings Konda Reddy / Bagata / Mukha Dhora dance and rice-beer (chukku) gatherings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 2, 5, 'go',
  'Driest stretch. 14-28C. Tribal Sankramana tail. Coffee cupping rooms at full activity.',
  'February is the driest month. Daytime 27-28C, rainfall under 20mm. Vizag-Araku Vistadome at full schedule. Tribal Sankramana tail through first fortnight. Coffee cupping sessions at the Araku Tribal Coffee Coop at full output.',
  NULL,
  'February in Araku is the technical peak weather month. Rainfall under 20mm, daytime 27-28C, nights 14-15C, humidity 55 percent. The Vizag-Araku Vistadome train (the Kirandul Passenger 06803/06804 pairing, the rail route with 58 tunnels through the Eastern Ghats) at full schedule and at year-cleanest visibility through the gorge sections. Coffee tours at the Araku Coffee Plantation (APFDC arabica blocks, the original 1898 cultivation belt) and the Anantagiri estates at peak — the Araku Coffee Trail Festival (a state-promoted tourism circuit, typically late January through February) runs through the month with coffee-estate walks, cupping sessions at the Araku Tribal Coffee Cooperative, and direct-tribal-farmer purchase windows. Padmapuram Botanical Garden and the toy-train circular ride at full operations. Galikonda viewpoint at year-cleanest. Tyda Park (35km from Araku, the lodge-based jungle-stay run by APTDC with watchtower-and-tent accommodation) at full booking. Anantagiri Falls and Chaparai Falls workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 3, 4, 'go',
  'Last cool month. 16-30C. Coffee tours easing toward off-season. Hotel rates ease 20 percent.',
  'March is the soft-landing month. Daytime climbs 28-30C. Coffee tours continue. Vizag-Araku Vistadome at full schedule. Hotel rates ease 20 percent. Last clean-comfort window before April pre-monsoon humidity.',
  NULL,
  'March in Araku is the transition month. Daytime 28-30C, nights 16-18C, humidity 60 percent, rainfall under 30mm — the Eastern Ghats elevation still buffers Araku from the lowland Coastal AP heat. The Vizag-Araku Vistadome train at full schedule. Coffee tours continue at the APFDC arabica blocks and the Anantagiri estates; the post-harvest tail closes through March, and the cupping rooms shift to bean-quality-grading work that is less visitor-accessible than the November-January harvest peak. Padmapuram Botanical Garden, the toy-train circuit, and Galikonda viewpoint at full visibility. Tyda Park APTDC jungle-stay at full booking. Anantagiri Falls and Chaparai Falls workable through morning. Tribal Museum at standard hours. The Mukha Dhora and Bagata village walks (10-15km radius from Araku town, accessible via APTDC guided tours or private taxi) workable through the day. Hotel rates ease 20 percent off February: APTDC Haritha Resort ₹2,000-3,800, private cottages ₹1,000-2,400, tribal homestays ₹800-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 4, 4, 'go',
  'Pre-monsoon mild. 19-32C. Elevation buffer holds. Hotel rates at off-peak.',
  'April is mild at 911m elevation. Daytime 30-32C — significantly cooler than coastal Vizag 38-40C. Vizag-Araku Vistadome workable. Coffee plantation walks viable. Hotel rates at 25 percent off February peak.',
  NULL,
  'April in Araku is the pre-monsoon mild month — the Eastern Ghats elevation provides a 6-8C buffer versus coastal Visakhapatnam (which hits 38-40C in April). Daytime 30-32C, nights 19-21C, humidity 65 percent, rainfall under 40mm. The Vizag-Araku Vistadome train at full schedule and remains a comfortable journey — the AC Vistadome car and the tunnel-cut Eastern Ghats route mean the train ride itself works through April. Coffee plantation walks at Anantagiri and Padmapuram workable cleanly through morning; the post-harvest off-season means lower visitor density at the cupping rooms. Padmapuram Botanical Garden and toy-train circuit at full operations. Galikonda viewpoint workable through full day. Tyda Park jungle-stay continues at full booking — the APTDC tented camp gets afternoon thunderstorm bursts late month but the cool nights (19-21C) hold. Anantagiri Falls and Chaparai Falls workable mornings. Hotel rates at 25 percent off February peak: APTDC Haritha Resort ₹1,800-3,400, private cottages ₹900-2,200, tribal homestays ₹700-1,600.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 5, 3, 'wait',
  'Pre-monsoon thundershowers. 21-32C, 60-100mm rain. Coffee plantation greens emerging. Hotel rates at year-low.',
  'May sees pre-monsoon thundershowers across the Eastern Ghats. Daytime 30-32C — elevation buffer still works versus coastal Vizag 40C+. Anantagiri Falls regaining flow. Hotel rates at year-low.',
  'May at Araku is pre-monsoon thundershower season. Eastern Ghats elevation still buffers heat but afternoon storms interrupt the coffee-and-train circuit. October opens the proper window. Wait if flexibility exists.',
  'May in Araku is the pre-monsoon thundershower month. Rainfall climbs to 60-100mm across 7-9 wet days, mostly late-afternoon and evening thunderstorms; daytime 30-32C, nights 21-23C, humidity 75 percent. The Eastern Ghats elevation (911m) continues to buffer Araku from the brutal Coastal AP heat (coastal Visakhapatnam hits 38-40C in May with high humidity). The Vizag-Araku Vistadome train continues at full schedule. Coffee tours at the APFDC arabica blocks and Anantagiri estates compress to mornings; the afternoon thunderstorms cut estate walks short by 2pm. Padmapuram Botanical Garden and the toy-train circuit workable morning. Galikonda viewpoint workable on dry mornings. Tyda Park APTDC jungle-stay at light occupancy. Anantagiri Falls and Chaparai Falls begin regaining flow after the late-monsoon dry months. Tribal Museum at standard hours. The Mukha Dhora and Bagata village walks workable on dry mornings only. Hotel rates at year-low: APTDC Haritha Resort ₹1,500-3,000, private cottages ₹800-2,000, tribal homestays ₹600-1,400. October-March is dramatically cleaner; May works for value-priority travelers willing to absorb the afternoon-rain disruption.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 6, 2, 'wait',
  'SW monsoon hits Eastern Ghats. 21-29C, 200-280mm rain. Landslide risk on rail line. Push to October.',
  'June sees SW monsoon onset hit Eastern Ghats hard. Daytime drops to 28-29C — cool but wet. Vizag-Araku Vistadome sees landslide-risk-related cancellations. Coffee tours impossible. Push to October.',
  'June at Araku is SW monsoon onset. Rail route through 58 tunnels sees landslide-risk cancellations on heavy-rain days. Coffee plantations leech-heavy. October opens the proper coffee-and-rail-and-tribal circuit window.',
  'June in Araku is the southwest monsoon onset. Rainfall climbs sharply to 200-280mm across 13-15 wet days, daytime 28-29C, nights 21-22C, humidity 88 percent. The Eastern Ghats are one of the wetter pockets of inland Andhra in June-September; the Anantagiri-Araku belt catches heavy orographic rainfall. The Vizag-Araku Vistadome train (the 220km route through 58 tunnels and several cuttings) sees periodic cancellations on heavy-rain days — the South Coast Railway suspends the Kirandul Passenger 06803 service on landslide-risk-flagged days; the line itself remains structurally sound but Indian Railways prioritizes safety. Coffee tours at Anantagiri and Padmapuram impossible — the estate paths are leech-heavy and muddy, the cupping rooms run reduced operations through the monsoon. Padmapuram Botanical Garden workable on dry windows. Galikonda viewpoint visibility lost to cloud and rain. Tyda Park APTDC jungle-stay closed for monsoon-safety. Anantagiri Falls and Chaparai Falls at peak monsoon flow but access roads compromised. Hotel rates at year-low: APTDC Haritha Resort ₹1,400-2,800, private cottages ₹700-1,800. October opens the proper window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 7, 2, 'wait',
  'SW monsoon peak. 20-28C, 280-380mm rain. Rail route compromised. Coffee plantations closed. Push to October.',
  NULL,
  'July at Araku is SW monsoon at peak. 280-380mm across the Eastern Ghats. Vizag-Araku rail route compromised. Coffee plantations and tribal walks impossible. Roads landslide-risk. Push to October.',
  'July in Araku is the southwest monsoon at peak across the Eastern Ghats. Rainfall climbs to 280-380mm across 16-18 wet days, daytime 27-28C, nights 20-21C, humidity 92 percent. The Vizag-Araku Vistadome train sees frequent cancellations through the month — heavy-rain landslide events on the Anantagiri-Borra section disrupt the rail line, and South Coast Railway runs reduced service. Coffee tours at Anantagiri and Padmapuram impossible. Padmapuram Botanical Garden closed for landslide-safety on heavy-rain days. Galikonda viewpoint inaccessible — cloud cover sits at 911m elevation through most of July. Tyda Park APTDC jungle-stay closed. Anantagiri Falls and Chaparai Falls at maximum flow but the approach roads are compromised. The road route from Vizag (115km via NH-516E) sees rain-day closure risk on the ghat sections. Tribal Museum at minimum visitor flow. Hotel rates at year-low: APTDC Haritha Resort ₹1,400-2,800, private cottages ₹700-1,800, tribal homestays ₹500-1,200. The Eastern Ghats coffee-and-tribal-and-rail circuit cannot run cleanly. October-March is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 8, 2, 'wait',
  'Monsoon continues. 20-28C, 220-320mm rain. Rail intermittent. Cyclone risk for late month from Bay of Bengal.',
  NULL,
  'August at Araku continues SW monsoon. Rail intermittent. Coffee plantations closed. Cyclone-influenced heavy bursts from Bay of Bengal possible. October opens the proper window.',
  'August in Araku continues the southwest monsoon. Rainfall 220-320mm across 15-17 wet days, daytime 27-28C, nights 20-21C, humidity 90 percent. The Eastern Ghats orographic rainfall pattern holds through August. The Vizag-Araku Vistadome train runs intermittent service — landslide-related cancellations continue, and Indian Railways pre-publishes alternative bus-shuttle arrangements on flagged days. Coffee tours at Anantagiri and Padmapuram remain impossible. Padmapuram Botanical Garden and the toy-train circuit closed on heavy-rain days. Galikonda viewpoint cloud-covered. Tyda Park APTDC jungle-stay closed. Anantagiri Falls and Chaparai Falls at full monsoon flow. The road route from Vizag (115km via NH-516E) sees landslide-risk-related closures on the Anantagiri ghat. Late August can see the first depressions from the Bay of Bengal — coastal AP cyclone watch begins in earnest from August, though peak cyclone season is October-December. Hotel rates at year-low: APTDC Haritha Resort ₹1,400-2,800, private cottages ₹700-1,800, tribal homestays ₹500-1,200. October is materially cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 9, 3, 'wait',
  'Monsoon retreats. 20-28C, 180-240mm rain. Rail returning. Coffee plantations reopening late-Sep.',
  'September is the bridge month. SW monsoon retreats from Eastern Ghats through second half. Vizag-Araku Vistadome returns to regular schedule. Coffee tours tentatively reopen late September.',
  'September at Araku is the bridge but coffee plantation paths and Anantagiri-ghat road conditions remain marginal through first half. October opens the proper window with stable weather and harvest-readiness.',
  'September in Araku is the bridge month. Rainfall drops to 180-240mm across 12-14 wet days as the southwest monsoon retreats from the Eastern Ghats (IMD typically declares formal retreat from coastal AP late September into early October). Daytime 27-28C, nights 20-21C, humidity 85 percent. The Vizag-Araku Vistadome train returns to regular schedule from mid-September onwards. Coffee tours at Anantagiri and Padmapuram tentatively reopen late September — the pre-harvest flush is visible but the cupping rooms are not at the full November-onwards activity. Padmapuram Botanical Garden returns to standard hours. Galikonda viewpoint visibility returns through the second half. Tyda Park APTDC jungle-stay reopens late September. Anantagiri Falls and Chaparai Falls at full post-monsoon flow — visually striking but still in monsoon-spillover mode. Tribal Museum returns to standard schedule. The Vizag-Araku road (115km via NH-516E) sees ghat-section maintenance through September. Hotel rates at off-peak: APTDC Haritha Resort ₹1,500-3,000, private cottages ₹800-2,000, tribal homestays ₹600-1,400. Last off-peak value window before October peak season opens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 10, 5, 'go',
  'Peak window opens. 17-27C. Vistadome at full visibility. Coffee harvest opens late-Oct.',
  'October opens the proper season. SW monsoon retreats fully. NE monsoon arrives mid-month moderate. Daytime 25-27C. Vizag-Araku Vistadome at full schedule. Coffee harvest opens late month at APFDC estates.',
  NULL,
  'October in Araku is the proper season open. The southwest monsoon completes its retreat from the Eastern Ghats; the northeast monsoon arrives mid-month moderate (120-180mm across 8-10 wet days, mostly late-afternoon and evening showers — the Eastern Ghats catch less NE rainfall than coastal AP). Daytime 25-27C, nights 17-19C, humidity 75 percent. The Vizag-Araku Vistadome train (the Kirandul Passenger 06803/06804) at full schedule and full visibility through the gorge sections. Coffee tours at Anantagiri and Padmapuram open through the month — the November harvest prep ramps in October; late-October opens the early-arabica picking at the APFDC estates. Padmapuram Botanical Garden and toy-train circuit at full operations. Galikonda viewpoint workable through full day. Tyda Park APTDC jungle-stay at full booking. Anantagiri Falls and Chaparai Falls at clean post-monsoon flow. Tribal Museum at full visitor hours. The Mukha Dhora, Bagata, and Khond village walks workable cleanly. Hotel rates climb 20 percent off September: APTDC Haritha Resort ₹2,000-3,800, private cottages ₹1,000-2,400, tribal homestays ₹700-1,600.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 11, 5, 'go',
  'Coffee harvest peak. 14-26C. Cupping rooms at full activity. NE monsoon eases through month.',
  'November is the coffee harvest peak month. Daytime 24-26C, nights 14-16C. Coffee harvest at APFDC arabica blocks and Anantagiri estates at full activity. Vizag-Araku Vistadome at peak booking. Lock rooms early.',
  NULL,
  'November in Araku is the coffee harvest peak month and one of the year''s peak weather months. Rainfall drops to 80-130mm across 6-8 wet days as the northeast monsoon eases through the second half. Daytime 24-26C, nights 14-16C, humidity 68 percent. The Vizag-Araku Vistadome train at full schedule and at year-densest booking — the 220km route through 58 tunnels and the Eastern Ghats gorge sees year-best visibility through the dry late-November windows. Coffee harvest at the APFDC arabica blocks (Padmapuram, Sunkarametta) and the Anantagiri estates at full activity — picking, sun-drying yards, and the early-stage washing process all visible through estate tours; the Araku Tribal Coffee Cooperative cupping room runs daily quality-grading sessions through the harvest. Padmapuram Botanical Garden and the toy-train circuit at full operations. Galikonda viewpoint at year-cleanest. Tyda Park APTDC jungle-stay at full booking. Anantagiri Falls and Chaparai Falls at clean flow. Tribal Museum at full visitor hours. Mukha Dhora, Bagata, Khond village walks at peak weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('araku-valley', 12, 5, 'go',
  'Cool peak + coffee harvest tail. 11-25C. Christmas-NYE peak booking. Lock 8 weeks ahead.',
  'December is peak-cool + coffee harvest tail. Daytime 24-25C, nights 11-13C. Christmas-NYE corridor brings AP-Telangana family density. Vizag-Araku Vistadome books out 6-8 weeks ahead.',
  NULL,
  'December in Araku is the peak-cool month and the coffee harvest tail. Rainfall drops to 30-60mm as the northeast monsoon completes retreat through the first half; the second half is the year''s driest stretch. Daytime 24-25C, nights 11-13C, humidity 60 percent — Araku gets its coldest nights of the year through the second half of December, with occasional sub-10C lows in the inner valley positions. The Vizag-Araku Vistadome train at full schedule and books out 6-8 weeks ahead through the Christmas-NYE corridor; the IRCTC opens the booking window 60 days before journey date. Coffee harvest tail at the APFDC and Anantagiri estates continues through the first fortnight — late-December is the post-arabica window when the robusta-mixed lower-elevation blocks come into picking. Coffee Cooperative cupping sessions at full output. Padmapuram Botanical Garden and toy-train at full operations. Galikonda viewpoint at year-clearest visibility. Tyda Park APTDC jungle-stay at peak occupancy. Anantagiri Falls and Chaparai Falls at clean dry-flow. Tribal Museum at full hours. Christmas-NYE corridor (Dec 22 to Jan 5) brings AP-Telangana family density.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
