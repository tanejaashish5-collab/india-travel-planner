-- Hogenakkal Falls destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- Reverse-pattern: best Jul-Nov (post-SW monsoon Cauvery flood), avoid Jan-May (dam-controlled trickle)
-- destination_id: hogenakkal

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 1, 2, 'wait',
  'Dry-season tail. 18-30C. Cauvery flow at 30 percent. Coracle rides workable but underwhelming.',
  'January is on the dry-season descent. Mettur dam upstream controls release; Cauvery flow at Hogenakkal at 30 percent of post-monsoon peak. Coracle (parisal) rides still run ₹150-300 but the falls themselves underwhelming. Push to July-Nov.',
  'January at Hogenakkal is mid-decline. The Niagara-style falls are at fractional flow. Coracle rides functional but the spectacle absent. Wait for July when SW monsoon refills the catchment.',
  'Hogenakkal in January is the dry-season tail. The Cauvery river — which Hogenakkal sits on at the Tamil Nadu-Karnataka border, 180km southwest of Bangalore and 50km north of Dharmapuri — runs at 30 percent of its September-November post-monsoon peak. Mettur dam upstream (50km southeast) controls release; without flood-season catchment runoff, the Hogenakkal falls reduce to a series of thin cascades across the wide gorge rock-faces rather than the wall-of-water Niagara-style spectacle the tagline references. Daytime 27-30C, nights 18-20C, humidity 55 percent, rainfall under 30mm. The coracle (parisal) rides — woven bamboo basket boats with leather-hide bottom — still operate at ₹150-300 for the 30-45 minute river circuit; boatmen pole through the gorge but the dramatic falls-encircling routes (only possible at peak flow) are off the menu. The 2,000-year-old oil massage tradition (Mallipuruan oil + assorted herbs, applied by the local masseur community before river-bath) continues at the river-side ghat — ₹300-800 for a 45-90 minute session. Cross-border movement to Karnataka''s side (the Cauvery is the state line) workable but check the Tamil Nadu border-post procedures.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 2, 1, 'skip',
  'Dry season. 20-32C. Cauvery flow at 20 percent. Falls absent. Skip.',
  NULL,
  'February is when Hogenakkal''s Cauvery flow drops to 20 percent of peak. The Niagara-style falls — the tagline''s defining feature — do not exist this month. Coracle rides marginal. Oil-massage tradition works in isolation but without the falls context. Skip.',
  'February in Hogenakkal is the dry-season low. Daytime 28-32C, nights 20-21C, humidity 55 percent, rainfall under 20mm. The Cauvery river drops to 20 percent of post-monsoon peak. Mettur dam upstream releases water for irrigation but at metered low rates. The Hogenakkal falls — the river dropping through a narrow gorge across a series of rock-face cascades — reduce to a thin stream across a few rock chutes; the multi-channel Niagara-style spread that gives Hogenakkal its tagline does not exist this month. Coracle (parisal) rides at ₹150-300 still operate; the boatmen pole through the depleted gorge but the encircling-the-falls routes that define the experience are non-functional. The 2,000-year-old oil massage tradition continues at the river-side ghat — ₹300-800 per session. River-bath at ₹50 still happens at the diminished flow points. Stay limited — TTDC Tamil Nadu Tourism Hotel ₹800-1,500, riverside lodges ₹500-1,200. Day-trip from Bangalore (180km) the more common pattern. The trip-defining "India''s Niagara" experience requires July-November flow. Skip — push to July.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 3, 1, 'skip',
  'Dry continues. 22-35C. Cauvery flow at 15 percent. Falls dry. Skip.',
  NULL,
  'March is at dry-season floor. Cauvery flow 15 percent. The wide Hogenakkal gorge is bare rock. Coracle ride happens on a thin channel only. Skip — wait for July.',
  'March in Hogenakkal is the dry-season floor. Daytime 32-35C, nights 22-23C, humidity 55 percent, rainfall under 30mm. The Cauvery river runs at 15 percent of post-monsoon peak. Mettur dam upstream at its annual storage low (the dam-storage cycle bottoms out at end of April before the SW monsoon refills it). The Hogenakkal falls do not exist as a multi-channel cascade — only one or two thin chutes carry water across the wide gorge rock-faces, and most of the gorge floor is exposed rock. Coracle (parisal) rides at ₹150-300 still run but the boatmen now operate within a single narrow channel; the gorge-circling routes are entirely off the menu. The 2,000-year-old oil massage tradition continues at the river-side ghat — ₹300-800 per session. River-bath at ₹50 still happens at remaining flow points but warm-water now (the cool snowmelt-derived Cauvery is gone). Daytime 35C makes the gorge rock retain heat. Stay limited — TTDC ₹800-1,500, riverside lodges ₹500-1,200. The trip-defining experience requires SW-monsoon flow. Skip — push to July when the SW monsoon refills upstream and Mettur dam begins August-September releases.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 4, 1, 'skip',
  'Heat + dry. 25-37C. Cauvery near-bottom. Tagline avoid-window. Skip.',
  NULL,
  'April is at heat-and-dry confluence. Cauvery 10-15 percent flow. Gorge bare rock at 38C surface heat. Falls non-existent. Tagline flags Jan-May as avoid. Skip.',
  'April in Hogenakkal is the heat-and-dry confluence. Daytime 35-37C, nights 25-26C, humidity 60 percent, rainfall under 30mm. The Cauvery river runs at 10-15 percent of post-monsoon peak. Mettur dam storage at annual low. The Hogenakkal gorge — wide, rock-faced, falls-built — is at year-bottom water content; the rock surfaces hit 40-42C noon-3pm. The trip-defining multi-channel falls do not exist; coracle (parisal) rides at ₹150-300 operate in a single narrow channel; the gorge-circling routes are off the menu. The 2,000-year-old oil massage tradition continues at the river-side ghat — ₹300-800 per session — but the falls-shower-before-massage routine that the tradition assumes is non-functional. River-bath now uncomfortable due to ambient and water-warmth. Stay options limited — TTDC ₹600-1,200, riverside lodges ₹400-1,000. Day-trip from Bangalore thins to weekend-only. The trip-defining "India''s Niagara" experience requires July-November flow; the tagline explicitly flags Jan-May as the avoid window. Skip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 5, 1, 'skip',
  'Heat + dry continues. 26-38C. Pre-monsoon spike but falls still absent. Skip.',
  NULL,
  'May continues April''s pattern. Daytime 36-38C, Cauvery still at dry-season floor. Pre-monsoon thunderstorms last fortnight bring brief upstream catchment runoff but no falls-flow yet. Push to mid-July.',
  'May in Hogenakkal is the second skip month of the dry quarter. Daytime 36-38C, nights 26-27C, humidity 60 percent, rainfall under 50mm — mostly as pre-monsoon thunderstorm bursts that don''t sustain the upstream catchment. The Cauvery river still runs at 15-20 percent of post-monsoon peak. Mettur dam storage at annual low; the dam doesn''t begin August-September releases until the SW monsoon refills the Karnataka-upstream catchment in June-July. The Hogenakkal falls remain at single-channel trickle; the multi-channel Niagara-style spectacle is non-existent. Coracle (parisal) rides at ₹150-300 still operate but only on the narrow remaining channel. The 2,000-year-old oil massage tradition at the river-side ghat continues at ₹300-800 per session — these masseurs depend on the dry-season passing trade for income through April-June. River-bath now uncomfortable due to ambient and water-warmth. Stay limited — TTDC ₹600-1,200. The pre-monsoon thunderstorms hit the last fortnight; brief upstream catchment runoff may show as a 2-3 day flow boost but doesn''t produce the multi-channel falls.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 6, 2, 'wait',
  'SW monsoon arrives upstream. 24-32C. Cauvery starts climbing. Falls still thin.',
  'June is when the SW monsoon hits the upstream Karnataka catchment. Cauvery climbs from 15 to 40 percent through the month. Falls start showing multi-channel structure last fortnight. Push to mid-July for proper flow.',
  'June at Hogenakkal is the build-up month. The Cauvery is rising as the Karnataka-upstream catchment fills, but the dam release for downstream irrigation does not begin yet. Falls climbing but not at full. Wait 4-6 weeks.',
  'June in Hogenakkal is the build-up month. The southwest monsoon hits the Karnataka-upstream Cauvery catchment (Kodagu, the Kaveri river-source area, the western Karnataka hills) around June 5-10; within 7-10 days the upstream tributary inflows begin lifting the river. Rainfall at Hogenakkal itself stays modest — the local SW-monsoon spillover to the inland-Tamil Nadu plains is 80-100mm across 8-10 wet days. Daytime 30-32C, nights 24-25C, humidity 75 percent. The Cauvery flow climbs from May''s 15 percent of peak to roughly 40 percent through the month. The Hogenakkal falls start showing multi-channel structure in the last fortnight — two to three rock-chutes carrying meaningful water again, but still well below the August-November cascade-fronted spectacle. Coracle (parisal) rides at ₹150-300 now operate in two-three channel routes; the gorge-circling experience returns partially. The 2,000-year-old oil massage tradition gets renewed pre-bath context. River-bath at ₹50 returns to comfortable temperatures. Stay limited — TTDC Tamil Nadu Tourism Hotel ₹800-1,500, riverside lodges ₹500-1,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 7, 5, 'go',
  'Cauvery flood arrives. 24-30C. Falls return to full multi-channel cascade by mid-month.',
  'July is when the Cauvery flood reaches Hogenakkal. Upstream Karnataka catchment runoff peaks. Falls return to full multi-channel cascade. Coracle gorge-circling at peak. Lock beds 1-2 weeks ahead.',
  NULL,
  'July in Hogenakkal is the proper opening of the peak window. The Cauvery flood — runoff from the Karnataka-upstream SW-monsoon catchment (Kodagu, Coorg, the western Karnataka hills) — reaches Hogenakkal in significant volume by mid-July. By month-end the river runs at 75-85 percent of post-monsoon peak. The Hogenakkal falls return to their multi-channel cascade form: water drops through 8-12 distinct rock-chutes across the wide gorge, spray fills the air, the sound carries 1km, the Niagara-style spectacle that gives the town its tagline is functional. Daytime 28-30C, nights 24-25C, humidity 80 percent, rainfall locally 100-130mm. **Coracle (parisal) rides at peak** — ₹150-300 for the gorge-circling route that takes you within 50m of the falls'' base, the boatmen poling and spinning through the spray, leather-hide-bottomed bamboo baskets at year-best operation. The 2,000-year-old oil massage tradition at the river-side ghat at peak demand — ₹300-800 per session after the falls-shower routine. River-bath at ₹50 at full-flow refreshing temperatures. Stay limited but climb sharply in demand — TTDC Tamil Nadu Tourism Hotel ₹1,500-2,500, riverside lodges ₹900-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 8, 5, 'go',
  'Peak flow. 23-30C. Aadi-Perukku Aug 3 — Cauvery festival here. Lock beds.',
  'August is operational peak. Cauvery at full multi-channel cascade. Aadi-Perukku (Aug 3 Tamil-Cauvery festival) brings additional Tamil-pilgrim density. Hotel rates climb 50 percent off June.',
  NULL,
  'August in Hogenakkal is the operational peak month. The Cauvery runs at full post-monsoon flow — 90-100 percent of November peak. The Hogenakkal falls at full multi-channel cascade across the wide gorge; spray fills the air, 10-12 distinct rock-chutes carry water, the Niagara-style spectacle is at its most cinematic. Daytime 28-30C, nights 23-24C, humidity 82 percent, rainfall locally 120-150mm. **Aadi-Perukku (Tamil Aadi-18, fixed at August 3)** — the Cauvery-river celebration that marks the annual flood — has significant observance at Hogenakkal as one of the four major Cauvery river-bank festival venues alongside Trichy, Srirangam, Tanjore, and Kumbakonam. The Tamil-pilgrim density on Aug 3 and the surrounding weekend spikes 4-5x normal; coracle rides queue 2-3 hours; oil-massage masseurs book through. **Coracle (parisal) rides at year-peak** — ₹150-300 for the gorge-circling route, the boatmen poling through the spray as the falls roar; leather-hide-bottomed bamboo baskets at year-best operation. The 2,000-year-old oil massage tradition at the river-side ghat at peak demand. River-bath at ₹50 at full-flow refreshing temperatures.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 9, 5, 'go',
  'Peak continues. 23-30C. Karnataka SW retreat keeps flow at full. Hotels at peak.',
  'September is the third peak month. Karnataka-upstream catchment still draining post-SW-monsoon. Cauvery at 85-95 percent flow. Coracle + oil massage at full. Hotel rates remain at peak.',
  NULL,
  'September in Hogenakkal is the third peak month of the year''s four-month flow window. The southwest monsoon retreats from the Karnataka-upstream catchment through September (formal sub-continent withdrawal around September 25-30); the post-monsoon catchment runoff continues to drain through the Cauvery at 85-95 percent of August peak. Rainfall locally 100-130mm across 12-14 wet days. Daytime 28-30C, nights 23-24C, humidity 80 percent. The Hogenakkal falls at near-peak multi-channel cascade — 8-12 rock-chutes carrying water across the gorge, spray, sound, the Niagara-style spectacle still at full force through the first 20 days, slowly easing in the last week. **Coracle (parisal) rides at peak** — ₹150-300 for the gorge-circling routes. The 2,000-year-old oil massage tradition at the river-side ghat at peak demand — ₹300-800 per session at the masseur community clustered at the ghat. River-bath at ₹50 at full-flow comfortable temperatures. Stay limited — TTDC Tamil Nadu Tourism Hotel ₹1,800-2,800, riverside lodges ₹900-1,800. Day-trip from Bangalore (180km) at full weekend gridlock.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 10, 5, 'go',
  'NE monsoon arrives + Cauvery flow holds. 22-29C. Fourth peak month.',
  'October is the fourth peak month. NE monsoon arrives at the Tamil Nadu plains around mid-Oct, refreshing the catchment. Cauvery at 80-90 percent. Coracle + oil massage at full demand. Hotels at peak.',
  NULL,
  'October in Hogenakkal is the fourth peak month of the year''s flow window. The northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15, dropping 150-200mm locally across 8-10 wet days through the back half. The Karnataka-upstream catchment continues to drain post-SW-monsoon while the local NE rains add fresh runoff. Rainfall 150-200mm. Daytime 27-29C, nights 22-23C, humidity 78 percent. The Cauvery flow stays at 80-90 percent of August peak through the month. The Hogenakkal falls at full multi-channel cascade — 8-12 rock-chutes, spray, sound, Niagara-style spectacle at near-peak force. **Coracle (parisal) rides at peak** — ₹150-300 for the gorge-circling routes; weekends see 30-50 percent demand spikes from Bangalore day-trippers. The 2,000-year-old oil massage tradition at the river-side ghat at peak demand. River-bath at ₹50 at full-flow comfortable temperatures. Navarathri tail and Dussehra (early-to-mid October 2026) bring weekend density. Stay limited — TTDC ₹1,800-2,800, riverside lodges ₹900-1,800. Day-trip from Bangalore (180km, 3-4 hours via NH48) at full weekend gridlock. Mettur dam release alerts continue.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 11, 5, 'go',
  'Fifth peak + Karthigai pilgrim flow. 20-28C. Cauvery still at 75 percent.',
  'November is the fifth peak month. Karnataka-upstream catchment still draining + NE-monsoon refresh. Cauvery at 75 percent of August peak. Coracle + falls + oil massage all at full demand.',
  NULL,
  'November in Hogenakkal is the fifth peak month of the year''s flow window. Northeast monsoon active locally with 200-250mm rainfall across 10-12 wet days through the first three weeks. The Karnataka-upstream catchment continues to drain at 75 percent of August peak; combined with the local NE-monsoon refresh, the Cauvery runs at 75-85 percent of August peak. Daytime 25-28C, nights 20-21C, humidity 73 percent. The Hogenakkal falls at strong multi-channel cascade — 6-10 rock-chutes carrying water, Niagara-style spectacle at year-fourth-strong force. **Coracle (parisal) rides** — ₹150-300 for the gorge-circling routes. The 2,000-year-old oil massage tradition at the river-side ghat at strong demand — ₹300-800 per session. River-bath at ₹50 at year-coolest comfortable water temperatures. Karthigai Deepam pilgrims (Tiruvannamalai 220km southeast, festival Dec 4 in 2026) pass through Dharmapuri-Krishnagiri en route via the NH48; some add a Hogenakkal extension. Stay limited — TTDC ₹1,500-2,500, riverside lodges ₹800-1,500. Day-trip from Bangalore (180km) at moderate weekend demand. Mettur dam release alerts ease as the dam approaches storage capacity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hogenakkal', 12, 3, 'wait',
  'Flow descends. 19-27C. NE wraps mid-Dec. Falls at 60 percent. Christmas-NYE modest.',
  'December is the descent month. NE monsoon wraps mid-Dec; without local rain the Cauvery starts dropping. Falls at 60 percent through first half, 50 percent by month-end. Coracle still workable. Push to next July.',
  'December at Hogenakkal is the start of the dry-season descent. Falls at 60 percent and dropping. The Niagara-spectacle the tagline references is fading. Push to July for next year''s peak window.',
  'December in Hogenakkal is the start of the dry-season descent. Northeast monsoon wraps locally in the first half — rainfall 80-120mm across 6-8 wet days, then dropping under 30mm in the back half. The Karnataka-upstream catchment continues to drain at 60-65 percent of August peak. Daytime 25-27C, nights 19-20C, humidity 65 percent. The Cauvery flow at Hogenakkal runs at 60 percent of August peak through the first half, dropping toward 50 percent by month-end. The Hogenakkal falls at moderate multi-channel cascade — 4-6 rock-chutes carrying meaningful water, Niagara-style spectacle still recognizable but at noticeably reduced force compared to August-October peak. Coracle (parisal) rides at ₹150-300 still operate the gorge-circling routes but the spray-immersion drama is fading. The 2,000-year-old oil massage tradition continues at the river-side ghat at moderate demand — ₹300-800 per session. River-bath at ₹50 at year-coldest comfortable temperatures (water 18-20C). Christmas-NYE corridor brings modest weekend density from Bangalore day-trippers; the Tamil Nadu Tourism Hotel and the riverside lodges run 60-70 percent occupancy.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
