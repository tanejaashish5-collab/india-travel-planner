-- Lambasingi destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: lambasingi | best_months [11,12,1,2] | avoid [5,6,7,8,9]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 1, 5, 'go',
  'Frost peak. 0-15C. The Kashmir-of-Andhra window. 4am snow-rime first 3 weeks. Lock 6-8 weeks ahead.',
  'January at Lambasingi is the frost peak. Daytime 14-15C, nights 0-3C with occasional sub-zero pre-dawn frost. The first 3 weeks of January are the year''s peak frost-tourism window. Lock cottages 6-8 weeks ahead.',
  NULL,
  'Lambasingi in January is the version every South Indian winter-tourist books first. The only place in peninsular South India where ground frost forms and pre-dawn temperatures drop to 0-3C with occasional sub-zero readings — earning the village its "Kashmir of Andhra" nickname. Elevation 1,000m on the Chintapalli mandal section of the Eastern Ghats, 100km from Visakhapatnam via the NH-516E ghat road through Anantagiri (which itself runs at 911m, but Lambasingi sits higher in a deeper-cut valley pocket that traps overnight cold air). Daytime 14-15C, nights 0-3C, humidity 70 percent, rainfall under 20mm. The first three weeks of January are the absolute frost-tourism peak — the 4-6am pre-dawn window when surface frost-rime forms on the rooftops, the apple-orchard fences, and the strawberry farm leaves at the Susan Garden viewpoint and the surrounding farms. AP Tourism (APTDC) runs a "Frost Tourism" promotion through December-January with cottage accommodation at the Lambasingi APTDC log-cabin block. Coffee plantation walks on the surrounding APFDC arabica blocks at full visibility. Indian Aroma View Point and Kothapalli Falls (4km away) workable through the day.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 2, 5, 'go',
  'Frost tail. 4-17C. Frost-rime mornings continue through first fortnight. Crowds easing.',
  'February holds the frost tail through first fortnight. Daytime 16-17C, nights 4-7C. Frost-rime mornings continue through Feb 14. Crowds ease 30 percent off peak January.',
  NULL,
  'February in Lambasingi is the frost tail — the morning rime continues through the first fortnight but the intensity drops compared to January peak. Daytime 16-17C, nights 4-7C, humidity 65 percent, rainfall under 15mm. Pre-dawn surface frost-rime continues through approximately February 14 in most years — verify against weather conditions before booking the frost-tourism trip if first-fortnight only. The "Kashmir of Andhra" promotion runs through the first half of February. AP Tourism (APTDC) cottage accommodation at the Lambasingi log-cabin block at full booking through the first two weeks; the second fortnight sees occupancy ease as the frost mornings recede. Coffee plantation walks on the surrounding APFDC arabica blocks (the Chintapalli mandal estates connect to the broader Anantagiri-Araku coffee belt at 100km distance) at full visibility. Apple orchards (Lambasingi is one of the few apple-growing pockets in South India, supported by AP horticulture extension since the 1990s) at post-flower spring growth stage. Strawberry farms at Susan Garden viewpoint at full activity — direct-farm pick options. Indian Aroma View Point at year-cleanest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 3, 3, 'wait',
  'Frost over. 9-22C. Pleasant but not the trip. Apple orchards in spring growth. Wait for December.',
  'March is post-frost mild. Daytime 20-22C, nights 9-11C. The frost that defines Lambasingi has ended. Coffee and apple orchards in spring growth. Pleasant hill weather but not the year-defining trip. Wait for December.',
  'March at Lambasingi has ended the frost — the trip''s entire selling point. Daytime 20-22C is pleasant but available at hundreds of South Indian hill stations. December opens the next frost window. Wait.',
  'March in Lambasingi is the post-frost transition. Daytime 20-22C, nights 9-11C, humidity 65 percent, rainfall under 30mm. The frost-tourism window has closed; surface frost-rime no longer forms. The Eastern Ghats elevation (1,000m) continues to buffer Lambasingi from Coastal AP heat through March, but the trip that draws South Indian visitors here — the sub-zero frost mornings, the apple-orchard rime, the Kashmir-of-Andhra promotion — has ended for the year. Coffee plantation walks on the surrounding APFDC arabica blocks workable through full day; the post-harvest cupping work continues. Apple orchards at spring-growth stage — visually less compelling than the dormant-winter or fruit-bearing windows. Strawberry farms at Susan Garden viewpoint at standard activity. Indian Aroma View Point workable. Tribal villages (Kondareddy and Bagata) accessible. The Eastern Ghats hill weather is pleasant but available at any of a dozen South Indian hill stations at lower transit cost. Hotel rates ease 35 percent off January peak: APTDC log cabins ₹2,000-3,500, private cottages ₹1,200-2,500, tribal homestays ₹800-1,800. December is the proper next-window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 4, 2, 'wait',
  'Warming. 13-26C. Eastern Ghats elevation still buffers heat. Off-peak rates. Wait for December.',
  'April warms further. Daytime 24-26C, nights 13-15C. Elevation buffer still works versus coastal Vizag 38C+. But the frost trip is months away. Hotel rates at year-low.',
  'April at Lambasingi has fully transitioned out of the frost window. The destination is built around sub-zero mornings — without those, it competes with cooler-and-closer hill alternatives. December opens the proper window. Wait 8 months.',
  'April in Lambasingi is the pre-monsoon warm month. Daytime 24-26C, nights 13-15C, humidity 65 percent, rainfall under 40mm — the Eastern Ghats 1,000m elevation continues to provide a substantial cool-buffer versus coastal Visakhapatnam (which hits 38-40C in April). The "Kashmir of Andhra" frost-tourism window is fully closed; APTDC promotion ends. Coffee plantation walks on the surrounding APFDC blocks workable through morning. Apple orchards at growth stage. Strawberry farms at Susan Garden viewpoint at off-season. Indian Aroma View Point workable. Tribal villages (Kondareddy and Bagata) accessible. The cool-hill weather is comparable to Araku (35km away, 911m elevation) but Lambasingi has limited core infrastructure beyond the APTDC log-cabin block — Araku offers significantly better dining, train access, coffee tourism depth, and tribal cultural depth at similar elevation. Hotel rates at year-low: APTDC log cabins ₹1,500-3,000, private cottages ₹1,000-2,200, tribal homestays ₹700-1,500. December is the next definitional window; the April mild trip works only as a Vizag-day-trip alternative.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 5, 2, 'wait',
  'Pre-monsoon thundershowers. 15-27C, 60-100mm rain. Roads marginal. Hotel rates at year-low.',
  NULL,
  'May at Lambasingi is pre-monsoon thundershower season. Eastern Ghats ghat road conditions marginal on heavy-rain days. The frost trip is 7 months away. October is too early for the next frost. Wait for December.',
  'May in Lambasingi is the pre-monsoon thundershower month. Rainfall climbs to 60-100mm across 7-9 wet days, mostly late-afternoon thunderstorms; daytime 25-27C, nights 15-17C, humidity 75 percent. The Eastern Ghats elevation continues to buffer Lambasingi from the brutal Coastal AP heat. APTDC Frost Tourism promotion is closed (December opens the next window). Coffee plantation walks on the surrounding APFDC blocks workable on dry mornings. Apple orchards at full growth stage — early fruit-set visible on the mature blocks. Strawberry farms at Susan Garden viewpoint at off-season. Indian Aroma View Point workable on clear mornings. Tribal villages (Kondareddy and Bagata) accessible. The NH-516E ghat road from Visakhapatnam (100km via Anantagiri) sees rain-day closure risk on the upper ghat sections; pre-check road condition with local APTDC or local taxi operators before the journey. Hotel rates at year-low: APTDC log cabins ₹1,400-2,800, private cottages ₹900-2,000, tribal homestays ₹600-1,400. December opens the proper window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 6, 1, 'skip',
  'SW monsoon hits Eastern Ghats. 16-25C, 200-280mm rain. Roads landslide-risk. Skip strict.',
  NULL,
  'June at Lambasingi is SW monsoon onset across the Eastern Ghats. Roads landslide-risk. NH-516E ghat sees closures. No frost season. Skip strict. December opens the proper window.',
  'June in Lambasingi is the southwest monsoon onset across the Eastern Ghats. Rainfall climbs sharply to 200-280mm across 13-15 wet days, daytime 23-25C, nights 16-18C, humidity 88 percent. The Eastern Ghats catch heavy orographic rainfall through June-September; the Chintapalli mandal section that holds Lambasingi receives some of the heavier rainfall in inland Andhra. The NH-516E ghat road from Visakhapatnam (100km via Anantagiri) sees periodic landslide-risk closures on the upper ghat sections. The APTDC log-cabin block at Lambasingi runs minimum occupancy. Coffee plantation walks impossible — leech-heavy and muddy. Apple orchards inaccessible. Strawberry farms at Susan Garden viewpoint closed. Indian Aroma View Point cloud-obscured. Tribal villages cut off on heavy-rain days. The trip Lambasingi exists for — the frost-tourism window — is 6 months away. The cool-hill weather of June is available at significantly more accessible South Indian hill stations (Ooty, Munnar, Coorg). Hotel rates at year-low: APTDC log cabins ₹1,400-2,800, private cottages ₹900-2,000, tribal homestays ₹600-1,400. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 7, 1, 'skip',
  'SW monsoon peak. 16-24C, 280-380mm rain. Eastern Ghats landslide season. Skip strict.',
  NULL,
  'July at Lambasingi is SW monsoon peak. Eastern Ghats see year-heaviest rainfall and landslide risk. Roads compromised, no frost season. Skip strict. December opens the proper window.',
  'July in Lambasingi is the southwest monsoon at peak across the Eastern Ghats. Rainfall climbs to 280-380mm across 16-18 wet days, daytime 22-24C, nights 16-17C, humidity 92 percent. The Eastern Ghats see year-heaviest landslide risk through July — the NH-516E ghat road from Visakhapatnam (100km via Anantagiri) sees regular closures on the Anantagiri and Lambasingi-approach ghat sections. The APTDC log-cabin block runs minimum occupancy. Coffee plantation walks impossible. Apple orchards inaccessible. Strawberry farms closed. Indian Aroma View Point and the Kothapalli Falls approach roads compromised. Tribal villages cut off on heavy-rain days. The "Kashmir of Andhra" frost-tourism promotion is closed. The frost window is 5 months away. Hotel rates at year-low: APTDC log cabins ₹1,400-2,800, private cottages ₹900-2,000, tribal homestays ₹600-1,400. The trip you came for — sub-zero frost mornings, apple-orchard rime — cannot happen for 5 more months. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 8, 1, 'skip',
  'Monsoon continues. 16-24C, 220-320mm rain. Roads compromised. Skip strict.',
  NULL,
  'August at Lambasingi continues SW monsoon across the Eastern Ghats. Approach road landslide-risk. The destination''s entire reason for visiting — sub-zero frost mornings — is still 4 months away. Skip strict; wait for December.',
  'August in Lambasingi continues the southwest monsoon at peak intensity. Rainfall 220-320mm across 15-17 wet days, daytime 22-24C, nights 16-17C, humidity 90 percent. The Eastern Ghats orographic rainfall pattern holds through August. NH-516E ghat road from Visakhapatnam sees periodic landslide-related closures. The APTDC log-cabin block at minimum occupancy. Coffee plantation walks impossible. Apple orchards inaccessible — the early-monsoon fruit-set has matured but pest pressure and humidity-related disease pressure dominate orchard management through August. Strawberry farms at Susan Garden viewpoint closed. Indian Aroma View Point cloud-obscured. Kothapalli Falls at peak flow but approach road compromised. Tribal villages cut off on heavy-rain days. Hotel rates at year-low: APTDC log cabins ₹1,400-2,800, private cottages ₹900-2,000, tribal homestays ₹600-1,400. The frost window is 4 months away. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 9, 2, 'wait',
  'Monsoon retreats. 16-24C, 180-240mm rain. Roads tentatively reopening. No frost season.',
  NULL,
  'September at Lambasingi is monsoon retreat. Roads tentatively reopen. But the destination''s entire purpose — sub-zero frost — is still 3 months away. Wait for December.',
  'September in Lambasingi is the southwest monsoon retreat. Rainfall drops to 180-240mm across 12-14 wet days, daytime 22-24C, nights 16-17C, humidity 85 percent. The Eastern Ghats begin to clear through the second half — the NH-516E ghat road maintenance crews work through September to restore the rain-damaged sections. The APTDC log-cabin block tentatively reopens late September. Coffee plantation walks on the surrounding APFDC blocks tentatively reopen — the post-monsoon green is visually striking but the cupping rooms are not yet at full activity. Apple orchards at post-monsoon recovery stage. Strawberry farms at Susan Garden viewpoint at off-season. Indian Aroma View Point and Kothapalli Falls accessible on dry days. Tribal villages accessible. The Eastern Ghats post-monsoon green carpet peaks late September — visually compelling but Lambasingi competes with the dramatically better-developed Araku circuit (35km away) at this exact season. The destination''s entire reason for visiting — the frost tourism window — is still 3 months away. Hotel rates at off-peak: APTDC log cabins ₹1,500-3,000, private cottages ₹1,000-2,200, tribal homestays ₹700-1,500. Wait for December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 10, 3, 'wait',
  'Post-monsoon green. 14-22C. NE monsoon brings evening showers. Pleasant but no frost. Wait for December.',
  NULL,
  'October at Lambasingi has clean post-monsoon green and NE monsoon evening showers. Pleasant hill weather. But the frost trip is 2 months away. December opens the proper window.',
  'October in Lambasingi is the post-monsoon green and the northeast monsoon onset. Rainfall 100-150mm across 7-9 wet days as the NE monsoon arrives mid-month with late-afternoon and evening showers. Daytime 20-22C, nights 14-16C, humidity 78 percent. The Eastern Ghats post-monsoon green carpet at peak. The APTDC log-cabin block reopens full operations. Coffee plantation walks on the surrounding APFDC blocks at full visibility — the pre-harvest flush is visible on the arabica blocks; the November harvest preparation begins. Apple orchards at fruit-bearing stage. Strawberry farms at Susan Garden viewpoint at pre-season setup. Indian Aroma View Point and Kothapalli Falls at clean flow. Tribal villages (Kondareddy and Bagata) accessible cleanly. The "Kashmir of Andhra" frost-tourism promotion preparation begins late October at APTDC — the December-January peak window publicity ramps. The Eastern Ghats cool-hill weather is pleasant but available at multiple alternative hill stations. The destination''s definitional sub-zero frost window is 2 months away. Hotel rates ease 25 percent off the peak: APTDC log cabins ₹1,800-3,400, private cottages ₹1,100-2,400, tribal homestays ₹800-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 11, 4, 'go',
  'Cool builds. 8-19C. Frost season approaching. Apple orchards bearing fruit. Last off-peak window.',
  'November is the cool-build month. Daytime 17-19C, nights 8-11C. Frost season approaches — first occasional dawn rime late November. Apple orchards bearing. Last off-peak value window before December peak.',
  NULL,
  'November in Lambasingi is the cool-build month before the frost peak opens. Rainfall drops to 40-80mm across 5-7 wet days as the northeast monsoon eases through the second half. Daytime 17-19C, nights 8-11C, humidity 65 percent. The first occasional pre-dawn surface rime can appear in the last week of November on cold-air-pool nights — not yet the definitional frost-tourism experience that January delivers, but the visual harbinger. APTDC Frost Tourism promotion publicity at peak — the December-January booking window opens through November. The APTDC log-cabin block at moderate-to-full booking. Coffee plantation walks on the surrounding APFDC arabica blocks at full visibility — the November harvest is the year''s peak coffee-tourism window across the broader Anantagiri-Araku-Lambasingi belt. Apple orchards bearing fruit — direct-orchard purchase windows. Strawberry farms at Susan Garden viewpoint at pre-season setup. Indian Aroma View Point at year-cleanest. Kothapalli Falls at clean flow. Tribal villages accessible. Hotel rates at off-peak still: APTDC log cabins ₹2,000-3,800, private cottages ₹1,200-2,800, tribal homestays ₹900-2,000. Last value-window before December peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('lambasingi', 12, 5, 'go',
  'Frost peak. 2-17C. Last 7-10 days year-best rime. 4am snow-rime daily. Lock 8-10 weeks ahead.',
  'December is the year''s definitional month. Last 7-10 days of December are the absolute peak frost-tourism window. Daytime 15-17C, nights 2-5C with consistent pre-dawn surface frost-rime.',
  NULL,
  'December in Lambasingi is the year''s definitional month — the frost-tourism peak when the "Kashmir of Andhra" promotion delivers its entire promise. Rainfall under 30mm; the second half is the year''s driest stretch. Daytime 15-17C, nights 2-5C, humidity 65 percent. The first three weeks of December see steadily intensifying pre-dawn cold; the last 7-10 days of December (December 22 through 31) are the absolute peak frost-tourism window when surface frost-rime forms reliably 4-6am on the rooftops, the apple-orchard fences, the strawberry farm leaves at Susan Garden, and the open valley floor. Set an alarm for 4:30am — the rime is visible by 5am and gone by 8am as the sun crosses the eastern ridge. The Christmas-NYE corridor (Dec 22 to Jan 5) is the year''s densest booking window at Lambasingi; APTDC log cabins book out 8-10 weeks ahead. AP Tourism Frost Tourism promotion runs full publicity. Coffee plantation walks at the surrounding APFDC arabica blocks at full visibility. Apple orchards (dormant-winter stage by late December) at year-most-photogenic. Strawberry farms at full activity — direct-pick options.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
