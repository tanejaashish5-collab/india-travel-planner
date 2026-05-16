-- Belum Caves destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: belum-caves | best_months [10,11,12,1,2,3,9] | wait [4,5,6,7,8] (surface heat)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 1, 5, 'go',
  'Peak window. 16-29C surface. Cave interior 30-35C year-round. 3.2km circuit at year-cleanest crowd.',
  'January at Belum Caves is the year-best surface window. Surface 27-29C. Cave underground temperature consistent 30-35C year-round. 3.2km guided circuit at year-cleanest pre-Christmas-NYE crowd.',
  NULL,
  'Belum Caves in January is the version every Rayalaseema cave-and-canyon planner books first. India''s second-longest cave system at 3.2km (only Krem Liat Prah in Meghalaya at 30.95km is longer) — a quartzite-dolomite-limestone karst formation carved by an underground river through 75 million years, opened to the public in 2002 after Cambodian-team-led mapping in the 1980s-90s and ASI development. Surface 27-29C, nights 16-18C, humidity 50 percent, rainfall under 15mm — the Rayalaseema rain-shadow at its driest. Cave underground temperature holds 30-35C year-round (the cave maintains thermal-mass equilibrium with the surrounding rock); humidity in the cave stays high at 80-90 percent due to the underground stream. The cave bottom sits 46m below ground level — accessed via the entrance staircase, 165m approach, and the descent to the public-section bottom. Pataalaganga (the underground stream, named for "the Ganga of the underworld") at the cave''s lowest accessible section. The 1000-Hooded Snake formation (the dramatic stalactite cluster, the cave''s most-photographed visual).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 2, 5, 'go',
  'Driest stretch. 18-31C surface. Cave interior consistent 30-35C. 3.2km circuit at year-cleanest.',
  'February is the technical peak. Rainfall under 10mm, daytime 30-31C, nights 18-19C. Cave underground consistent 30-35C. 3.2km guided circuit at year-cleanest weekday crowd.',
  NULL,
  'February in Belum Caves is the technical peak surface month. Rainfall under 10mm, daytime 30-31C, nights 18-19C, humidity 45 percent. The cave underground temperature holds at its consistent 30-35C with 80-90 percent humidity — the cave interior conditions are identical to January, December, and any other month, but the surface approach is at its driest most-comfortable window. The 3.2km guided circuit (Belum Caves does not allow unaccompanied exploration; ASI-trained guides run the full 1.5-hour circuit from the entrance to the Pataalaganga and back) at year-cleanest weekday crowd. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, and the Pataalaganga underground stream all at clean conditions. The 165m Buddha statue at the entrance and the AP Tourism interpretation centre (small museum showing the geological formation timeline and the Cambodian-Indian mapping history) at full hours. Surface entry fee ₹65 (adult), ₹45 (children), camera ₹100; guide tip ₹100-200. Tadipatri (35km, nearest town with rail access — Tadipatri station on the Guntakal-Renigunta line) hotels ₹1,000-2,200. Anantapur (60km, the larger district HQ) hotels ₹1,200-3,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 3, 4, 'go',
  'Last cool surface. 21-34C. Cave interior identical 30-35C year-round. APTDC Haritha 20 percent easier.',
  'March is the soft-landing surface month. Surface 32-34C — cave interior identical 30-35C year-round. Cave 3.2km circuit unaffected. APTDC Haritha rates ease 20 percent off February.',
  NULL,
  'March in Belum Caves is the surface transition month — but the cave interior conditions remain identical to every other month of the year. Surface 32-34C, nights 21-22C, humidity 55 percent, rainfall under 20mm. Pre-monsoon dust haze begins to compromise surface visibility through the second fortnight (the AP plains roads from Tadipatri and Anantapur see dust haze on dry-day afternoons). Cave underground temperature 30-35C, humidity 80-90 percent — consistent across the calendar. The 3.2km guided circuit at full operations (Belum Caves is one of the few AP destinations where the trip experience is essentially weather-independent — the cave interior is the destination). The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, Pataalaganga underground stream at clean conditions. The 165m Buddha statue at the entrance workable through morning (the surface approach gets hot post-11am in March). APTDC Haritha Hotel at moderate booking. Hotel rates ease 20 percent off February peak: APTDC Haritha ₹1,700-3,200; Tadipatri hotels ₹900-2,000; Anantapur hotels ₹1,100-2,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 4, 3, 'wait',
  'Heat ramps surface. 24-38C. Cave interior 30-35C — workable. Surface approach hot. Off-peak rates.',
  'April pushes surface into Rayalaseema heat. Daytime 36-38C. Cave underground 30-35C — workable. Surface approach to cave entrance hot post-9am. Hotel rates at 30 percent off February.',
  'April at Belum Caves sees surface heat make the entrance approach uncomfortable past 9am. Cave interior remains identical year-round so the actual experience holds — but the surface logistics and the cross-trips (Gandikota fort unwalkable) collapse. October opens the proper window.',
  'April in Belum Caves is the surface heat ramp — but the cave interior remains the same 30-35C year-round destination it is in every other month. Surface 36-38C, nights 24-25C, humidity 45 percent, rainfall under 30mm. Pre-monsoon dust haze through the second fortnight. The cave underground temperature 30-35C, humidity 80-90 percent — the interior experience is unchanged. The 3.2km guided circuit operates at full schedule but visitor count drops sharply through April-July (the Belum visit pairs strongly with Gandikota and Lepakshi which become unwalkable in April, so the cave-only single-destination trip is the main April-July use case). The 165m Buddha statue at the entrance workable pre-9am only — the surface concrete plaza heats sharply through late morning. APTDC Haritha Hotel at off-peak. The 80km Gandikota cross-trip cannot run in April (Gandikota fort plateau unwalkable). Hotel rates at 30 percent off February: APTDC Haritha ₹1,500-2,800; Tadipatri hotels ₹800-1,800; Anantapur hotels ₹1,000-2,500. Functional for cave-only trips willing to accept the surface heat at entry/exit — the cave experience itself remains the year-cleanest underground experience in inland AP.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 5, 3, 'wait',
  'Surface peak heat. 26-41C. Cave 30-35C — cooler than surface! Most thermal-relief seekers visit May.',
  NULL,
  'May at Belum Caves has surface heat peak (39-41C) but the cave interior at 30-35C is actually cooler than the surface — counter-intuitively May sees thermal-relief seekers visit. Cross-trips to Gandikota/Lepakshi unviable. Surface entry/exit uncomfortable but doable pre-9am.',
  'May in Belum Caves is the surface heat peak — but the cave interior remains the same year-round 30-35C and is now meaningfully cooler than the surface. Surface 39-41C, nights 26-27C, humidity 40 percent, rainfall under 30mm. Pre-monsoon dust storms hit the second fortnight. The cave interior at 30-35C and 80-90 percent humidity is actually cooler than the Rayalaseema surface — Belum is one of the few inland-AP destinations where May visits make sense as a thermal-relief option. The 3.2km guided circuit operates at full schedule; the local-Telugu visitor count picks up slightly in May as families seek cool indoor options. The 165m Buddha statue at entrance workable pre-8am only — surface concrete plaza becomes furnace by mid-morning. APTDC Haritha Hotel at off-peak occupancy (most Belum visitors are now day-trippers from Anantapur or Tadipatri who do not stay overnight). Cross-trip to Gandikota (80km) cannot run (Gandikota fort unwalkable in May). Hotel rates at year-low: APTDC Haritha ₹1,400-2,800; Tadipatri hotels ₹700-1,600; Anantapur hotels ₹900-2,200. May visits the cave but the broader Rayalaseema circuit cannot run.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 6, 3, 'wait',
  'SW monsoon light. 24-35C, 60-100mm rain. Cave interior 30-35C — unchanged. Surface eases.',
  NULL,
  'June at Belum Caves sees SW monsoon light here (Rayalaseema rain-shadow). Surface eases to 33-35C. Cave interior unchanged at 30-35C — surface still warmer than cave. Cross-trips Gandikota/Lepakshi still hot.',
  'June in Belum Caves is the first surface ease as the southwest monsoon spillover reaches the Rayalaseema rain-shadow. Rainfall climbs to 60-100mm across 7-9 wet days, daytime 33-35C, nights 24-25C, humidity 70 percent. The cave interior remains the same year-round 30-35C and 80-90 percent humidity. The 3.2km guided circuit operates at full schedule. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, and Pataalaganga underground stream at standard visibility (cave interior conditions unchanged). The 165m Buddha statue at the entrance workable through morning. APTDC Haritha Hotel at off-peak occupancy. Cross-trips to Gandikota (80km) marginal — Gandikota fort surface still 33-35C and the gorge view sees seasonal cloud cover. Lepakshi (200km) similar. The 80km Gandikota cross-trip is technically possible but the fort plateau walk remains heat-stress-limited. Hotel rates at off-peak: APTDC Haritha ₹1,500-2,900; Tadipatri hotels ₹750-1,700; Anantapur hotels ₹900-2,300. The cave-only single-destination trip works year-round; the full Rayalaseema circuit (Belum + Gandikota + Lepakshi) opens cleanly in October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 7, 3, 'wait',
  'Monsoon moderate. 23-32C, 80-120mm rain. Cave interior 30-35C — unchanged.',
  NULL,
  'July at Belum Caves sees moderate SW monsoon spillover. Surface 31-32C. Cave interior unchanged at 30-35C. Cave trip works; broader Rayalaseema cross-trips compressed. October opens the proper full-circuit window.',
  'July in Belum Caves continues the southwest monsoon spillover. Rainfall 80-120mm across 9-11 wet days, daytime 31-32C, nights 23-24C, humidity 75 percent. The cave interior remains the same 30-35C and 80-90 percent humidity — the cave underground stream is at slightly higher post-monsoon volume but visitor accessibility is unchanged. The 3.2km guided circuit operates at full schedule. The 165m Buddha statue at the entrance workable through morning and late afternoon — the post-storm cooler windows give some surface respite. APTDC Haritha Hotel at off-peak. Cross-trips to Gandikota (80km) gain marginal viability — Gandikota fort plateau cool enough morning-and-evening through July, Pennar river beginning to fill. Lepakshi (200km) still summer-tier. Hotel rates at off-peak: APTDC Haritha ₹1,500-2,900; Tadipatri hotels ₹800-1,800; Anantapur hotels ₹900-2,300. The 1.5-hour cave trip works as a day-trip from Anantapur or Tadipatri; the multi-day Rayalaseema circuit awaits October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 8, 3, 'wait',
  'Monsoon tail. 23-31C, 70-110mm rain. Cave interior 30-35C — unchanged. Off-peak rates.',
  NULL,
  'August at Belum Caves continues monsoon tail. Surface 30-31C. Cave interior unchanged. Broader Rayalaseema cross-trips marginal — October opens the proper combined-circuit window.',
  'August in Belum Caves continues the southwest monsoon spillover into the Rayalaseema rain-shadow. Rainfall 70-110mm across 9-11 wet days, daytime 30-31C, nights 23-24C, humidity 78 percent. The cave interior remains the same 30-35C and 80-90 percent humidity — the underground stream may run at slightly fuller flow post-late-monsoon but the visitor experience is unchanged. The 3.2km guided circuit operates at full schedule. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, Pataalaganga underground stream at standard visibility. The 165m Buddha statue at entrance workable through morning. APTDC Haritha Hotel at off-peak. Cross-trips to Gandikota (80km) workable in dry windows — Pennar river at fuller flow, fort plateau cool morning-and-evening. Lepakshi (200km) marginal. Hotel rates at off-peak: APTDC Haritha ₹1,600-3,000; Tadipatri hotels ₹800-1,800; Anantapur hotels ₹1,000-2,400. The cave-only trip continues to work year-round; the multi-day Rayalaseema circuit becomes clean in October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 9, 4, 'go',
  'Monsoon retreats. 22-30C. Cave 30-35C unchanged. Last off-peak before October peak.',
  'September is the bridge month. SW monsoon retreats through second half. Cave interior unchanged 30-35C. Surface eases to 28-30C. Last off-peak value window before October peak.',
  NULL,
  'September in Belum Caves is the bridge month before the proper season opens. Rainfall drops to 70-100mm across 8-10 wet days as the southwest monsoon retreats from the Rayalaseema rain-shadow. Daytime 28-30C, nights 22-23C, humidity 75 percent. The cave interior continues at the same 30-35C and 80-90 percent humidity. The 3.2km guided circuit operates at full schedule. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, Pataalaganga underground stream at clean condition. The 165m Buddha statue at the entrance workable through morning and late afternoon. APTDC Haritha Hotel at off-peak still — last value window before October peak. Cross-trips to Gandikota (80km) work cleanly — Pennar river at peak post-monsoon flow, fort plateau walkable. The combined Belum-Gandikota 2-day Rayalaseema cave-and-canyon trip opens cleanly from late September. Hotel rates at -20 percent off January: APTDC Haritha ₹1,800-3,300; Tadipatri hotels ₹900-2,000; Anantapur hotels ₹1,100-2,600.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 10, 5, 'go',
  'Peak window opens. 21-29C surface. Cave 30-35C. Belum + Gandikota 2-day circuit at year-best.',
  'October opens the proper season. NE monsoon mild. Daytime 27-29C surface. Cave 30-35C unchanged. Belum + Gandikota 2-day cave-and-canyon circuit at year-best conditions.',
  NULL,
  'October in Belum Caves is the proper season open. The southwest monsoon completes its retreat from the Rayalaseema rain-shadow; the northeast monsoon arrives mild with 60-100mm of rainfall across 6-8 wet days. Daytime 27-29C surface, nights 21-22C, humidity 70 percent. The cave interior at the consistent year-round 30-35C and 80-90 percent humidity. The 3.2km guided circuit at full operations. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, Pataalaganga underground stream at clean conditions. The 165m Buddha statue at the entrance and the AP Tourism interpretation centre at full hours. APTDC Haritha Hotel at full weekend booking. The 80km Gandikota cross-trip at year-best — Belum Caves morning + Gandikota afternoon-and-sunset works as a clean Rayalaseema circuit from Hyderabad-Bengaluru. Lepakshi (200km) cross-trip viable for a longer 3-4 day Rayalaseema circuit. Hotel rates climb 20 percent off September: APTDC Haritha ₹2,000-3,800; Tadipatri hotels ₹1,000-2,300; Anantapur hotels ₹1,200-2,800. Dussehra-Vijayadashami (Oct 19-20 in 2026) brings family-corridor weekend traffic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 11, 5, 'go',
  'NE monsoon eases. 18-27C surface. Cave 30-35C. APTDC Haritha at peak booking.',
  'November is the peak-build month. NE monsoon eases. Daytime 25-27C surface. Cave 30-35C unchanged. APTDC Haritha at peak booking — Belum-Gandikota combined trips at year-peak demand.',
  NULL,
  'November in Belum Caves is one of the year''s peak months. Rainfall drops to 30-70mm across 4-6 wet days as the northeast monsoon eases through the second half. Daytime 25-27C surface, nights 18-19C, humidity 60 percent. The cave interior continues at the same 30-35C and 80-90 percent humidity. The 3.2km guided circuit at full operations; the post-monsoon underground stream at slightly fuller flow. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, Pataalaganga underground stream at clean visibility. The 165m Buddha statue at the entrance at year-cleanest surface light. APTDC Haritha Hotel at peak booking — Belum-Gandikota combined 2-day trips at year-densest demand; book 3-4 weeks ahead through weekend windows. Hotel rates at peak: APTDC Haritha ₹2,400-4,200; Tadipatri hotels ₹1,100-2,500; Anantapur hotels ₹1,300-3,000. The cool dry surface conditions and the consistent cave interior combine for the year''s most-photographed Belum visit window. Karthika Pournami full-moon (mid-November) brings minor pilgrim spillover from the broader Rayalaseema Karthika circuit but Belum is primarily a geological tourism destination rather than a religious one.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belum-caves', 12, 5, 'go',
  'Cool peak surface. 16-26C. Cave 30-35C. Christmas-NYE peak. APTDC books 5-6 weeks ahead.',
  'December is the peak-cool surface month. Daytime 24-26C, nights 16-17C. Cave 30-35C unchanged. Christmas-NYE corridor brings Hyderabad-Bengaluru family density. APTDC Haritha 5-6 weeks ahead.',
  NULL,
  'December in Belum Caves is the peak-cool surface month. Rainfall drops to 10-30mm as the northeast monsoon completes retreat through the first half; the second half is the year''s driest stretch. Daytime 24-26C surface, nights 16-17C, humidity 55 percent. The cave interior continues at the same 30-35C and 80-90 percent humidity — note that the cave will feel notably warmer and more humid than the December surface, an inversion from May-July when the cave felt cooler than the heat dome surface. The 3.2km guided circuit at full operations. The 1000-Hooded Snake formation, Saptasvarala Guha musical pillars, Pataalaganga underground stream at clean condition. The 165m Buddha statue at the entrance at year-cleanest surface conditions. APTDC Haritha Hotel at peak booking — the Christmas-NYE corridor (Dec 22 to Jan 5) brings Hyderabad-Bengaluru family density. Combined Belum-Gandikota 2-day trips and longer Belum-Gandikota-Lepakshi (200km away) 3-4 day Rayalaseema circuits at year-peak demand; APTDC Haritha books out 5-6 weeks ahead through NYE. Hotel rates at peak: APTDC Haritha ₹2,500-4,500; Tadipatri hotels ₹1,200-2,800; Anantapur hotels ₹1,400-3,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
