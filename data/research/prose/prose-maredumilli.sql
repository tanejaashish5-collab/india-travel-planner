-- Maredumilli destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: maredumilli | best_months [10,11,12,1,2,3] | avoid [6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 1, 5, 'go',
  'Peak window. 13-27C. Bamboo Chicken at full output. Jalatarangini Falls clean. Eco-camps full.',
  'January at Maredumilli is the year-best window. Daytime 26-27C, nights 13-15C. Konda Reddy Bamboo Chicken (Vedurupandu Kodi) at full output. Jalatarangini Falls at clean post-monsoon flow. Vana Vihari Eco-Camp at full booking.',
  NULL,
  'Maredumilli in January is the version every Eastern Ghats tribal-eco-tourism planner books first. Rampachodavaram mandal — the Konda Reddy and Koya tribal heartland on the eastern fringe of the Eastern Ghats — at peak weather. Daytime 26-27C, nights 13-15C, humidity 65 percent, rainfall under 20mm. Bamboo Chicken (Vedurupandu Kodi) — the signature Konda Reddy tribal preparation where marinated chicken is stuffed inside a green bamboo culm and slow-cooked over open fire, splitting the bamboo open at the end to serve the chicken steamed in its own bamboo-juice aromatics — at full output at the village stalls and the eco-camp kitchens. Jalatarangini Falls (named for the sound of water "playing music" over cascade stones, 7km from Maredumilli town centre) at clean post-monsoon flow. Madhavaramudu Falls (5km) and Amruthadhara Falls (35km, the higher cascade near Bodikonda) workable through the day. Vana Vihari Eco-Camp (run by the AP Forest Department in partnership with the local Konda Reddy / Koya community management committees — community-owned forest tenure under the Forest Rights Act of 2006 is the operational basis) at full booking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 2, 5, 'go',
  'Driest stretch. 15-29C. Tribal forest treks at year-best. Vana Vihari Eco-Camp full.',
  'February is the technical peak. Rainfall under 15mm, daytime 28-29C, nights 15-17C. Tribal forest treks at year-best comfort. Vana Vihari Eco-Camp and surrounding tribal homestays at full booking.',
  NULL,
  'February in Maredumilli is the technical peak. Rainfall under 15mm, daytime 28-29C, nights 15-17C, humidity 60 percent. Bamboo Chicken (Vedurupandu Kodi) at full Konda Reddy village-stall output. Jalatarangini Falls at clean flow — the 7km approach road from Maredumilli town is at year-best condition (the AP Forest Department maintains the road through the dry-season window). Madhavaramudu Falls (5km) and Amruthadhara Falls (35km) workable. Vana Vihari Eco-Camp at peak booking — the bamboo-cottage and tent accommodation at the AP Forest Department site holds 30-40 visitors at full capacity; book through ehp.andhrapradesh.gov.in or APTDC 4-6 weeks ahead. Manyam Eco-tourism trail and the longer Bodikonda trek (10km circuit through the community-managed forests) at full operations. Tribal Museum at Maredumilli town centre (showcasing the Konda Reddy basket-weaving, the Koya bow-and-arrow craft, and the local Adivasi cultural heritage of the Eastern Ghats fringe) at full hours. The Polavaram dam approach (50km west on the Godavari, India''s ongoing major multi-purpose dam project) accessible for cross-trip itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 3, 4, 'go',
  'Last cool month. 17-32C. Treks compress to mornings. Hotel rates ease 20 percent.',
  'March is the soft-landing month. Daytime climbs 30-32C. Forest treks workable mornings. Falls flow decreasing through month. Hotel rates ease 20 percent off February.',
  NULL,
  'March in Maredumilli is the transition month. Daytime 30-32C, nights 17-18C, humidity 65 percent, rainfall under 30mm. Bamboo Chicken at full village-stall output. Jalatarangini Falls flow decreasing through the month but still cleanly visible at the cascade. Madhavaramudu Falls and Amruthadhara Falls workable through morning hours. Vana Vihari Eco-Camp at moderate-to-full booking. Manyam Eco-tourism trail and the Bodikonda trek workable pre-9am — the rocky-and-bamboo-mixed forest paths heat quickly through the late morning. Tribal Museum at standard schedule. The Konda Reddy and Koya community-managed forest tours continue at full operations; the dry-season visibility through the bamboo-mixed forest is at year-cleanest. The Maredumilli mandal road from Rajahmundry (65km via NH-326C) at clean condition. Hotel rates ease 20 percent off February peak: Vana Vihari Eco-Camp ₹2,000-3,800, tribal homestays ₹1,000-2,200. Last clean-comfort window before April brings pre-monsoon humidity to the Eastern Ghats fringe — the elevation here (Maredumilli sits at 600-800m on the Eastern Ghats lower belt) provides some buffer versus Coastal AP heat but the dry-season comfort breaks in April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 4, 3, 'wait',
  'Heat ramps. 20-34C. Forest treks compress to dawn-only. Falls flow low. Hotel rates at off-peak.',
  'April pushes Maredumilli into pre-monsoon heat. Daytime 32-34C. Forest treks compress to 5-8am only. Jalatarangini Falls at low flow. Hotel rates at 25 percent off February.',
  'April at Maredumilli compresses the forest trek window to pre-dawn only and the falls run at minimum flow. Bamboo Chicken still works but the full eco-tourism experience cannot run. October opens the proper window.',
  'April in Maredumilli is the pre-monsoon heat ramp. Daytime 32-34C, nights 20-21C, humidity 65 percent, rainfall under 40mm. The Eastern Ghats fringe elevation (600-800m) provides limited buffer — Maredumilli sits lower than Araku-Lambasingi-Anantagiri (911-1,000m) and runs warmer through April-June. Bamboo Chicken at full village-stall output continues year-round. Jalatarangini Falls at low pre-monsoon flow but still cleanly visible. Madhavaramudu Falls similar; Amruthadhara Falls at minimum. Vana Vihari Eco-Camp at off-peak booking. Manyam Eco-tourism trail and the Bodikonda trek compress to 5-8am only — the bamboo-and-mixed-forest trail surface heats sharply after 9am and the partial canopy does not provide consistent shade. Tribal Museum at standard hours. The Konda Reddy and Koya community-managed forest visits continue but the visitor walks are heat-stress-limited 10am-4pm. The Maredumilli mandal road from Rajahmundry (65km via NH-326C) clean. Hotel rates at 25 percent off February: Vana Vihari Eco-Camp ₹1,800-3,200, tribal homestays ₹900-2,000. October opens the proper window for the full forest-and-tribal experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 5, 2, 'wait',
  'Heat peak. 22-37C. Treks dawn-only. Falls dry. Forest fire risk. Push to October.',
  'May is the heat peak. Daytime 35-37C. Pre-monsoon thundershowers second fortnight. Forest fire risk hits Eastern Ghats. Treks dawn-only. Falls dry. Hotel rates at year-low.',
  'May at Maredumilli is heat peak with forest fire risk. Falls at minimum flow. Forest treks dawn-only. The full eco-tourism experience cannot run. October opens the proper window.',
  'May in Maredumilli is the pre-monsoon heat dome. Daytime 35-37C, nights 22-23C, humidity 60 percent, rainfall under 40mm (mostly second-fortnight pre-monsoon thunderstorms). Forest fire risk hits the Eastern Ghats Maredumilli belt through April-May — the AP Forest Department maintains fire-watch through the dry-season window, and controlled-burn restrictions on the Manyam Eco-tourism trail can apply on high-risk days. Bamboo Chicken at full village-stall output. Jalatarangini Falls at minimum dry-season flow — visually less compelling than the post-monsoon clean cascade. Madhavaramudu Falls and Amruthadhara Falls similar. Vana Vihari Eco-Camp at minimum occupancy. Manyam Eco-tourism trail and Bodikonda trek dawn-only (5-7:30am workable). Tribal Museum at standard hours. The Konda Reddy and Koya community-managed forest visits compress to dawn. Hotel rates at year-low: Vana Vihari Eco-Camp ₹1,500-2,800, tribal homestays ₹800-1,800. The full eco-tourism trip cannot happen cleanly. October-March is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 6, 1, 'skip',
  'SW monsoon hits Eastern Ghats. 22-30C, 180-260mm rain. Forest treks closed. Falls flooding. Skip.',
  NULL,
  'June at Maredumilli is SW monsoon onset across the Eastern Ghats. Forest treks closed (leech-heavy, landslide risk). Falls in dangerous flood. Vana Vihari Eco-Camp closed. October opens the proper window.',
  'June in Maredumilli is the southwest monsoon onset across the Eastern Ghats. Rainfall climbs to 180-260mm across 12-14 wet days, daytime 28-30C, nights 22-23C, humidity 88 percent. The Eastern Ghats fringe catches heavy orographic rainfall through June-September. Bamboo Chicken stalls continue at the village center but the broader eco-tourism circuit closes. Jalatarangini Falls and Madhavaramudu Falls at dangerous post-rain flood — the approach paths are leech-heavy and the cascade pools are unsafe for the photo-stops that draw visitors. Amruthadhara Falls at similar conditions. Vana Vihari Eco-Camp closed for the monsoon-safety window (AP Forest Department typically closes the camp June through September). Manyam Eco-tourism trail and the Bodikonda trek closed — landslide and leech risk on the bamboo-mixed forest paths. Tribal Museum at minimum visitor flow. The Konda Reddy and Koya community-managed forest visits closed for the season. The Rajahmundry-Maredumilli road (65km via NH-326C) sees rain-day closure risk on the ghat sections. Hotel rates at year-low: tribal homestays in Maredumilli town ₹600-1,400. The trip you came for cannot happen safely. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 7, 1, 'skip',
  'SW monsoon peak. 22-29C, 260-360mm rain. Eastern Ghats year-heaviest. Skip strict.',
  NULL,
  'July at Maredumilli is the SW monsoon peak across the Eastern Ghats. Vana Vihari Eco-Camp closed. Falls in dangerous flood. Forest treks impossible (leeches, landslides). Approach road landslide-risk. October opens the proper window.',
  'July in Maredumilli is the southwest monsoon at peak across the Eastern Ghats. Rainfall climbs to 260-360mm across 14-16 wet days, daytime 27-29C, nights 22-23C, humidity 92 percent. The Eastern Ghats fringe catches year-heaviest rainfall through July; Maredumilli mandal sits in one of the wetter pockets of inland Andhra. Bamboo Chicken stalls continue at the village center for the few brave visitors. Jalatarangini Falls, Madhavaramudu Falls, and Amruthadhara Falls all at flood-stage flow — visually striking but the approach paths and cascade pools are dangerous. Vana Vihari Eco-Camp closed. Manyam Eco-tourism trail and Bodikonda trek closed. Tribal Museum at minimum hours. The Konda Reddy and Koya community-managed forest visits closed. The Rajahmundry-Maredumilli road (65km via NH-326C) sees significant landslide-related closures on the Lambapatti ghat section. Hotel rates at year-low: tribal homestays ₹600-1,400. The full eco-tourism experience cannot happen. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 8, 1, 'skip',
  'Monsoon continues. 22-28C, 220-320mm rain. Eco-camp closed. Roads compromised. Skip strict.',
  NULL,
  'August at Maredumilli continues the SW monsoon at peak across the Eastern Ghats. Vana Vihari Eco-Camp closed. Forest treks impossible (leeches, landslides). Falls in dangerous flood. October opens the proper full eco-tourism window.',
  'August in Maredumilli continues the southwest monsoon. Rainfall 220-320mm across 14-16 wet days, daytime 27-28C, nights 22-23C, humidity 92 percent. The Eastern Ghats orographic rainfall pattern holds through August. Bamboo Chicken stalls continue at the village center. Jalatarangini Falls, Madhavaramudu Falls, and Amruthadhara Falls at flood-stage flow with dangerous approach paths. Vana Vihari Eco-Camp closed through August (AP Forest Department typically reopens late September). Manyam Eco-tourism trail and the Bodikonda trek closed. Tribal Museum at minimum hours. The Konda Reddy and Koya community-managed forest visits closed for the monsoon season. The Rajahmundry-Maredumilli road continues to see landslide-related risk on the Lambapatti ghat. Hotel rates at year-low: tribal homestays ₹600-1,400. The eco-tourism experience cannot happen. October opens the proper window. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 9, 3, 'wait',
  'Monsoon retreats. 22-28C, 180-220mm rain. Eco-camp tentatively reopens late-Sep. Last off-peak window.',
  'September is the bridge month. SW monsoon retreats through second half. Vana Vihari Eco-Camp tentatively reopens late September. Forest treks tentatively reopen. Last off-peak value window.',
  'September at Maredumilli is the bridge but trail conditions remain marginal — forest leech population takes 2-3 dry weeks to crash. October opens the proper window with stable conditions and clean Falls flow.',
  'September in Maredumilli is the bridge month before the proper season opens. Rainfall drops to 180-220mm across 11-13 wet days as the southwest monsoon retreats from the Eastern Ghats. Daytime 26-28C, nights 22-23C, humidity 85 percent. Bamboo Chicken at full village-stall output. Jalatarangini Falls at high post-monsoon flow — visually striking but the approach trail still leech-heavy through first fortnight. Madhavaramudu Falls and Amruthadhara Falls similar. Vana Vihari Eco-Camp tentatively reopens late September depending on rainfall conditions — the AP Forest Department typically reopens the bamboo-cottage block by September 25-30. Manyam Eco-tourism trail and Bodikonda trek tentatively reopen — the trail surface needs 2-3 dry weeks to return to safe grip and leech-population crash. Tribal Museum reopens full hours. The Konda Reddy and Koya community-managed forest visits resume. The Rajahmundry-Maredumilli road (65km via NH-326C) clears through September. Hotel rates at off-peak: Vana Vihari Eco-Camp ₹1,800-3,200, tribal homestays ₹900-2,000. Last off-peak value window before October ramps up.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 10, 5, 'go',
  'Peak window opens. 18-27C. Falls at year-cleanest. Vana Vihari at full booking. Forest green at peak.',
  'October opens the proper season. NE monsoon arrives mid-month moderate. Falls at clean post-monsoon flow. Vana Vihari Eco-Camp at full operations. Forest treks at year-best — post-monsoon green peaks.',
  NULL,
  'October in Maredumilli is the proper season open. The southwest monsoon completes its retreat from the Eastern Ghats; the northeast monsoon arrives mid-month moderate with 110-160mm of rainfall across 7-9 wet days. Daytime 25-27C, nights 18-19C, humidity 78 percent. Bamboo Chicken (Vedurupandu Kodi) at full Konda Reddy village-stall output. Jalatarangini Falls at clean post-monsoon flow — visually at year-best with strong volume after the SW monsoon and clear water once the late-monsoon sediment loads have settled. Madhavaramudu Falls and Amruthadhara Falls similar. Vana Vihari Eco-Camp at full operations after the September reopening. Manyam Eco-tourism trail and the Bodikonda trek at year-best — the post-monsoon green Eastern Ghats forest at peak foliage density, the leech population sharply down after the second dry week. Tribal Museum at full hours. The Konda Reddy and Koya community-managed forest tours at full operations — the post-monsoon visibility through the bamboo-mixed forest is at the year''s most visually striking window. Hotel rates climb 25 percent off September: Vana Vihari Eco-Camp ₹2,200-4,000, tribal homestays ₹1,000-2,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 11, 5, 'go',
  'NE monsoon eases. 15-25C. Falls at clean flow. Eco-camp at peak booking. Forest treks at year-best.',
  'November is the peak-build month. NE monsoon eases through month. Daytime 24-25C, nights 15-17C. Falls at clean flow. Vana Vihari Eco-Camp at peak booking. Lock 4-6 weeks ahead.',
  NULL,
  'November in Maredumilli is one of the year''s peak months. Rainfall drops to 70-110mm across 6-8 wet days as the northeast monsoon eases through the second half. Daytime 24-25C, nights 15-17C, humidity 70 percent. Bamboo Chicken at full village-stall output — November cool evenings make the slow-cooked-in-bamboo preparation at year-most-comfortable serving conditions. Jalatarangini Falls at clean flow. Madhavaramudu Falls and Amruthadhara Falls workable through the day. Vana Vihari Eco-Camp at peak booking — book through ehp.andhrapradesh.gov.in 4-6 weeks ahead. Manyam Eco-tourism trail and the Bodikonda trek at year-best comfort with cool morning starts and clean dry-trail conditions. Tribal Museum at full hours. The Konda Reddy and Koya community-managed forest visits at full operations. The Rajahmundry-Maredumilli road (65km via NH-326C) at clean dry-season condition. Hotel rates climb 20 percent off October: Vana Vihari Eco-Camp ₹2,500-4,500, tribal homestays ₹1,100-2,400. The November weather is one of the more underrated Eastern Ghats hill-and-forest windows in inland Andhra.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('maredumilli', 12, 5, 'go',
  'Cool peak. 12-25C. Eco-camp at peak booking. Christmas-NYE family density. Lock 6-8 weeks.',
  'December is the peak-cool month. Daytime 24-25C, nights 12-14C. Christmas-NYE corridor brings AP-Telangana family density. Vana Vihari books out 6-8 weeks ahead. Falls and treks clean.',
  NULL,
  'December in Maredumilli is the peak-cool month. Rainfall drops to 30-60mm as the northeast monsoon completes retreat through the first half; the second half is the year''s driest stretch. Daytime 24-25C, nights 12-14C, humidity 65 percent. Bamboo Chicken (Vedurupandu Kodi) at full Konda Reddy village-stall output — the December cool evenings make the slow-cooked tribal preparation at year-most-photogenic eating conditions. Jalatarangini Falls at clean dry-season flow. Madhavaramudu Falls and Amruthadhara Falls similar. Vana Vihari Eco-Camp at peak booking — the Christmas-NYE corridor (Dec 22 to Jan 5) brings AP-Telangana family eco-tourism density; book 6-8 weeks ahead. Manyam Eco-tourism trail and the Bodikonda trek at year-best comfort. Tribal Museum at full hours. The Konda Reddy and Koya community-managed forest visits at full operations. The Rajahmundry-Maredumilli road clean. Hotel rates at peak: Vana Vihari Eco-Camp ₹2,800-5,000, tribal homestays ₹1,200-2,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
