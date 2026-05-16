-- Horsley Hills destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: horsley-hills | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 1, 5, 'go',
  'Peak window. 12-24C. Gali Bandalu + Mallamma Temple at year-cleanest. APTDC Haritha bookings full.',
  'January at Horsley Hills is the year-best window. Daytime 23-24C, nights 12-14C. The 1,265m Eastern Ghats hill plateau at year-cleanest weather. APTDC Haritha Resort at full booking. Day-trippers from Bengaluru-Chennai at peak.',
  NULL,
  'Horsley Hills in January is the version every Bengaluru-Chennai-Tirupati weekender books first. The 1,265m hill plateau on the Eastern Ghats — named for W.D. Horsley, the 1870s British Madras Collector who developed the hill as a summer retreat — at year-best weather. Daytime 23-24C, nights 12-14C, humidity 55 percent, rainfall under 20mm. The hill''s 4-5C buffer versus the Rayalaseema plains (which sit at 700-800m and run 28-30C in January) is the value proposition; Horsley is AP''s quiet answer to Ooty and Yelagiri, with significantly less infrastructure but a cleaner morning-to-evening cool window. Mallamma Temple (the local Mallamma Devi shrine at the hill''s summit, the religious anchor that pre-dates the British development) at full ritual tempo. Gali Bandalu viewpoint (the wind-rock formations at the eastern cliff edge) at year-cleanest visibility. Chinnamallappakonda viewpoint (the southern cliff position with the Madanapalle valley below) clean. APTDC Haritha Resort (the only major accommodation on the hill itself, the British-era circuit house redeveloped by AP Tourism) at full booking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 2, 5, 'go',
  'Driest stretch. 14-26C. APTDC bookings continue at full. Day-trippers from Bengaluru-Chennai at peak.',
  'February is the technical peak. Rainfall under 15mm, daytime 25-26C, nights 14-16C. APTDC Haritha at full booking through weekend windows. The 1,265m elevation buffer at year-clean weather. Mallamma Temple at full schedule.',
  NULL,
  'February in Horsley Hills is the technical peak weather month. Rainfall under 15mm, daytime 25-26C, nights 14-16C, humidity 50 percent — the Rayalaseema rain-shadow at its driest. The 1,265m Eastern Ghats hill plateau holds 4-5C cooler than the Madanapalle plains below. Mallamma Temple (the summit Devi shrine) at full ritual tempo. Gali Bandalu viewpoint (the wind-rock formations on the eastern cliff) at year-cleanest. Chinnamallappakonda viewpoint at full visibility. The Environmental Park (the hill''s small botanical-garden with the AP Forest Department''s nursery work) at full hours. The Eucalyptus Tree (the 150-year-old British-era tree planted by Horsley''s team, marked with a plaque) workable. APTDC Haritha Resort (the only major accommodation on the hill) at full weekend booking; weekday occupancy moderate. The 22km approach road from Madanapalle (the nearest town with rail access, 90km from the hill base via Madanapalle Road station) at year-cleanest condition. Bengaluru (160km) and Chennai (260km) day-trip and overnight visitors at peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 3, 4, 'go',
  'Last cool month. 17-29C. Elevation buffer holds. Bookings ease 20 percent.',
  'March is the soft-landing month. Daytime climbs 27-29C — still cooler than Rayalaseema plains 33-35C. Elevation buffer holds. APTDC bookings ease 20 percent off February. Last value-window before April warm-up.',
  NULL,
  'March in Horsley Hills is the transition month. Daytime 27-29C, nights 17-18C, humidity 55 percent, rainfall under 30mm — the 1,265m elevation continues to provide a 5-6C buffer versus the Rayalaseema plains (which hit 33-35C in March). Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints workable through full day. Environmental Park at full hours. The Eucalyptus Tree marker workable. APTDC Haritha Resort at moderate occupancy through weekdays, full at weekends. The 22km approach road from Madanapalle clean. The Bengaluru-Horsley (160km) and Chennai-Horsley (260km) corridors at moderate weekend traffic. Hotel rates ease 20 percent off February: APTDC Haritha ₹1,800-3,800; AP Forest guest house ₹1,000-2,200; private homestays in Madanapalle valley below ₹700-1,500. Last clean-comfort window before April pushes the Rayalaseema plains heat past comfort even at the elevated hill plateau. The Horsley experience is a day-trip and one-night-stay window; the hill has limited infrastructure beyond APTDC and the small Forest guest house, so longer stays beyond 2-3 nights tend to run out of distinct things to do.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 4, 3, 'wait',
  'Warm but elevation buffer holds. 20-32C. Hot at hill but cool versus plains. Off-peak rates.',
  'April warms further. Daytime 30-32C — elevation still buffers versus Rayalaseema plains 38-40C. Hotel rates at 30 percent off February peak. Marginal-value visit.',
  'April at Horsley Hills is warm but the 1,265m elevation still beats the Rayalaseema plains. Daytime 30-32C is workable but past the cool-comfort range that justifies the trip. October opens the proper window.',
  'April in Horsley Hills is the pre-monsoon warm month. Daytime 30-32C, nights 20-22C, humidity 60 percent, rainfall under 40mm — the 1,265m elevation continues to buffer the hill versus the Rayalaseema plains, but the cool-hill margin compresses from 5-6C to 3-4C as the hill itself warms. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints workable through morning and evening only — the noon-3pm window is exposed-sun ordeal at the cliff positions. Environmental Park workable through morning. The Eucalyptus Tree marker workable. APTDC Haritha Resort at off-peak occupancy. The 22km approach road from Madanapalle clean. The Bengaluru and Chennai weekend-trip volume drops sharply through April — Yelagiri (130km from Bengaluru, similar elevation) and Nandi Hills (60km from Bengaluru) become the preferred Bengaluru alternatives in April-June. Hotel rates at 30 percent off February peak: APTDC Haritha ₹1,500-3,200; AP Forest guest house ₹900-2,000; private homestays in Madanapalle valley ₹600-1,400.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 5, 2, 'wait',
  'Pre-monsoon. 22-34C. Hill warm too. Hotel rates at year-low. Push to October.',
  'May is the heat peak. Daytime 32-34C even on the hill. Hill plateau no longer materially cooler than Bengaluru-Chennai. Hotel rates at year-low. Push to October.',
  'May at Horsley Hills sees the hill plateau itself warm to 32-34C. The cool-hill margin versus Bengaluru-Chennai collapses to 2-3C. The trip''s entire value proposition (elevation buffer) erodes. October opens the proper window.',
  'May in Horsley Hills is the pre-monsoon heat peak. Daytime 32-34C, nights 22-23C, humidity 65 percent, rainfall 30-60mm (mostly second-fortnight pre-monsoon thunderstorms). The 1,265m elevation still provides some buffer versus Rayalaseema plains (Madanapalle hits 38-40C in May) but the cool-hill margin compresses to 4-6C and the hill plateau itself runs warm. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints workable through morning only. Environmental Park workable through morning. The Eucalyptus Tree marker workable. APTDC Haritha Resort at year-low occupancy. The 22km approach road from Madanapalle clean. Weekend traffic from Bengaluru (160km) and Chennai (260km) at minimum — both cities have closer-and-cooler alternatives through pre-monsoon. Hotel rates at year-low: APTDC Haritha ₹1,300-2,800; AP Forest guest house ₹800-1,800; private homestays in Madanapalle valley ₹500-1,300. The trip you came for — the elevation-buffered cool-hill weekend — cannot run cleanly because the hill itself is warm. October-March is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 6, 2, 'wait',
  'SW monsoon onset. 21-29C, 80-130mm rain. Eastern Ghats lighter than Western. Approach road marginal.',
  'June sees SW monsoon spillover reach the Rayalaseema rain-shadow Horsley. Daytime drops to 27-29C. Approach road sees rain-day risk. October opens the proper window.',
  'June at Horsley Hills is SW monsoon spillover onset. Rain-shadow effect keeps rainfall lower than the Western Ghats but the approach road sees rain-day risk. October opens the proper window.',
  'June in Horsley Hills is the southwest monsoon onset. Rainfall climbs to 80-130mm across 8-10 wet days, daytime 27-29C, nights 21-22C, humidity 75 percent — the Eastern Ghats Rayalaseema rain-shadow keeps rainfall lighter than the Western Ghats but the hill catches enough orographic spillover to disrupt outdoor circulation. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints visibility-limited on overcast days; cloud cover sits at 1,265m elevation through monsoon. Environmental Park at standard hours. APTDC Haritha Resort at off-peak occupancy. The 22km approach road from Madanapalle sees rain-day surface-water risk on the ghat sections. Bengaluru and Chennai weekend traffic minimal through monsoon. Hotel rates at off-peak: APTDC Haritha ₹1,300-2,800; AP Forest guest house ₹800-1,800; private homestays ₹500-1,300. Functional but the cool-hill cliff-view trip that the hill is built around runs at limited visibility through the monsoon. October opens the proper window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 7, 3, 'wait',
  'SW monsoon active. 20-27C, 110-160mm rain. Cloud cover at 1,265m. Cliffs visibility-limited.',
  NULL,
  'July at Horsley Hills sees SW monsoon active across the Eastern Ghats Rayalaseema rain-shadow. Cloud cover sits at the 1,265m hill plateau. Cliff viewpoints cloud-obscured. October opens the proper window for the cliff-and-cool experience.',
  'July in Horsley Hills is the southwest monsoon active period. Rainfall 110-160mm across 10-12 wet days, daytime 25-27C, nights 20-21C, humidity 82 percent. The Eastern Ghats Rayalaseema rain-shadow keeps total rainfall lighter than the Western Ghats (Western Ghats hill stations like Coorg get 700-1,000mm in July) but Horsley''s 1,265m elevation catches enough orographic cloud cover that visibility at the cliff viewpoints is reduced through most of the month. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints visibility-limited — cloud sits at the 1,265m plateau and the views down to the Madanapalle valley below are obscured. Environmental Park workable on dry windows. APTDC Haritha Resort at moderate occupancy — the Tamil-Nadu local-traffic from Chennai picks up slightly through the schools-vacation weekend windows even though weather is sub-optimal. The 22km approach road from Madanapalle sees periodic rain-day surface-water risk. Hotel rates at off-peak: APTDC Haritha ₹1,400-2,900; AP Forest guest house ₹800-1,800; private homestays ₹500-1,400. October-March is materially cleaner; July works only for monsoon-romance travelers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 8, 3, 'wait',
  'Monsoon continues. 20-27C, 110-160mm rain. Cloud cover persists. Push to October.',
  NULL,
  'August at Horsley Hills continues SW monsoon. Cloud cover at 1,265m persists. Cliff viewpoint visibility limited. Approach road marginal on heavy-rain days. October opens the proper window.',
  'August in Horsley Hills continues the southwest monsoon. Rainfall 110-160mm across 10-12 wet days, daytime 25-27C, nights 20-21C, humidity 82 percent. The Eastern Ghats Rayalaseema rain-shadow keeps the totals moderate but cloud cover at the 1,265m elevation persists through most of August. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints cloud-obscured through most of the month. Environmental Park workable on dry windows. APTDC Haritha Resort at off-peak. The 22km approach road from Madanapalle workable on dry-window days. Bengaluru and Chennai weekend traffic minimal — both cities have closer overcast-weather hill alternatives that don''t require the 22km ghat approach. Hotel rates at off-peak: APTDC Haritha ₹1,400-2,900; AP Forest guest house ₹800-1,800; private homestays ₹500-1,400. October opens the proper window for the cliff-and-cool experience that Horsley is built around.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 9, 4, 'go',
  'Monsoon retreats. 20-28C. Cloud cover thinning. Last off-peak window before October peak.',
  'September is the bridge month. SW monsoon retreats through second half. Cloud cover thins. Daytime 26-28C, nights 20-22C. Visibility returns. Last off-peak value window.',
  NULL,
  'September in Horsley Hills is the bridge month before the proper season opens. Rainfall drops to 90-130mm across 9-11 wet days as the southwest monsoon retreats from the Rayalaseema rain-shadow. Daytime 26-28C, nights 20-22C, humidity 78 percent. Cloud cover at the 1,265m elevation thins through the second half. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda viewpoints return to clear visibility through the second half. Environmental Park at full hours. The Eucalyptus Tree marker accessible. APTDC Haritha Resort at moderate occupancy. The 22km approach road from Madanapalle clears through the month. Bengaluru and Chennai weekend traffic begins to return late September as the cool-hill view returns. Hotel rates at off-peak still: APTDC Haritha ₹1,600-3,200; AP Forest guest house ₹900-2,000; private homestays in Madanapalle valley ₹600-1,500. Last value-window before October peak. The post-monsoon green Rayalaseema landscape below the hill cliff visible from Gali Bandalu and Chinnamallappakonda at year-most-photogenic visibility through the second half.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 10, 5, 'go',
  'Peak window opens. 17-26C. NE monsoon mild. Cliff visibility at year-best. Dussehra cluster.',
  'October opens the proper season. NE monsoon arrives mid-month moderate. Daytime 25-26C, nights 17-19C. Gali Bandalu and Chinnamallappakonda cliff visibility at year-cleanest. Dussehra weekend cluster.',
  NULL,
  'October in Horsley Hills is the proper season open. The southwest monsoon completes its retreat from the Rayalaseema rain-shadow; the northeast monsoon arrives mid-month moderate with 80-120mm of rainfall across 6-8 wet days — mostly late-afternoon and evening showers. Daytime 25-26C, nights 17-19C, humidity 72 percent. The 1,265m elevation buffer at full cool-hill margin versus the Rayalaseema plains. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda cliff viewpoints at year-cleanest visibility — the post-monsoon clear air reveals the Madanapalle valley below and the Eastern Ghats ridgeline beyond at year-most-photogenic conditions. Environmental Park at full hours. APTDC Haritha Resort at full booking through weekend windows. The 22km approach road from Madanapalle at clean post-monsoon condition. Bengaluru (160km) and Chennai (260km) weekend traffic returns. Dussehra-Vijayadashami (Oct 19-20 in 2026) brings additional Bengaluru-Chennai long-weekend booking. Hotel rates climb 25 percent off September: APTDC Haritha ₹2,000-4,000; AP Forest guest house ₹1,100-2,400; private homestays in Madanapalle valley ₹700-1,700.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 11, 5, 'go',
  'NE monsoon eases. 14-25C. Cliff visibility clean. APTDC Haritha at peak booking.',
  'November is the peak-build month. NE monsoon eases through second half. Daytime 23-25C, nights 14-16C. Cliff visibility year-best. APTDC Haritha at peak booking. Lock 3-4 weeks ahead.',
  NULL,
  'November in Horsley Hills is one of the year''s peak months. Rainfall drops to 50-90mm across 5-7 wet days as the northeast monsoon eases through the second half. Daytime 23-25C, nights 14-16C, humidity 65 percent. The 1,265m elevation buffer at full cool-hill margin. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda cliff viewpoints at year-cleanest visibility — the dry post-NE-monsoon air and the cool morning conditions combine for the year''s most photogenic cliff window. Environmental Park at full hours. The Eucalyptus Tree marker accessible. APTDC Haritha Resort at peak booking — November is one of the year''s strongest weekend windows for the Bengaluru-Chennai-Tirupati-Horsley corridor; book 3-4 weeks ahead for weekends. The 22km approach road from Madanapalle clean. Hotel rates at peak: APTDC Haritha ₹2,200-4,500; AP Forest guest house ₹1,200-2,500; private homestays in Madanapalle valley ₹800-1,800. The Karthika Pournami full-moon (mid-November) brings family-pilgrim traffic to the Mallamma Temple — the Devi shrine sees a localized peak alongside the broader Karthika Masam observances at Tirumala-Srisailam-Srikalahasti.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('horsley-hills', 12, 5, 'go',
  'Cool peak. 12-24C. Christmas-NYE booking peak. Lock 4-6 weeks ahead.',
  'December is the peak-cool month. Daytime 22-24C, nights 12-14C. Christmas-NYE corridor brings Bengaluru-Chennai family density. APTDC Haritha books out 4-6 weeks ahead for NYE.',
  NULL,
  'December in Horsley Hills is the peak-cool month. Rainfall drops to 20-50mm as the northeast monsoon completes retreat through the first half; the second half is the year''s driest stretch. Daytime 22-24C, nights 12-14C, humidity 60 percent. The 1,265m elevation buffer at maximum cool-hill margin versus the Rayalaseema plains. Mallamma Temple at full ritual tempo. Gali Bandalu and Chinnamallappakonda cliff viewpoints at year-cleanest. Environmental Park at full hours. The Eucalyptus Tree marker accessible. APTDC Haritha Resort at peak booking — the Christmas-NYE corridor (Dec 22 to Jan 5) brings Bengaluru-Chennai-Hyderabad family density; APTDC Haritha books out 4-6 weeks ahead through the corridor. The 22km approach road from Madanapalle at year-best dry-season condition. Bengaluru (160km via NH-69 / Kolar) and Chennai (260km via NH-716 / Chittoor) weekend and family-corridor traffic at year-densest. Hotel rates at peak: APTDC Haritha ₹2,500-5,000; AP Forest guest house ₹1,300-2,800; private homestays in Madanapalle valley ₹900-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
