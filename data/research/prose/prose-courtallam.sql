-- Courtallam (Kutralam) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- Reverse-pattern: best Jun-Sep (SW monsoon herb-infused flow), avoid Mar-May (trickle)
-- destination_id: courtallam

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 1, 4, 'go',
  'Tail season. 22-30C. Main Falls + Five Falls + Tiger Falls still flowing — 60 percent of monsoon peak.',
  'January at Courtallam runs at roughly 60 percent of the monsoon-season peak flow. Main Falls and Five Falls hold workable flow; the smaller Tiger and Shenbaga falls slower. Daytime 26-30C, water cool. Oil-massage tradition at quietest visitor load — best window for the therapeutic stay.',
  NULL,
  'Courtallam in January is the tail-season window — the SW monsoon flow that defined June-September has eased but the catchment in the Sahyadri''s western Ghats still delivers workable volumes to the main falls. Main Falls (the principal cascade in the town centre, women''s and men''s separate enclosures, ₹15 ticket) at roughly 60 percent of monsoon peak; Five Falls (Aintharuvi, 2km from town — five separate streams of the Chittar drop together) at similar levels; Tiger Falls (Puli Aruvi) and Shenbaga Falls and Old Courtallam Falls at thinner flow. The Honey Falls (Then Aruvi, 4km trek), Fruit Falls (Pazha Aruvi), and Orchard Falls (Thoppu Aruvi) at quieter visitor load. Daytime 26-30C, nights 22-23C, humidity 65 percent. Water temperature 21-23C — cool but the herb-infused claim (Siddha medicine attributes therapeutic qualities to the Sahyadri-catchment forest herbs the streams pass through) holds best in the dilute post-monsoon flow. Oil-massage practitioners (2,000-year-old tradition, Mallipuruan oil + assorted herbs) at year-quietest schedules — ₹500-1,500 for a 45-90 minute session at the licensed therapists clustered around the Main Falls bus stand.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 2, 3, 'wait',
  'Driest of dry months. 23-32C. Flow at 35 percent. Trickle-only at small falls.',
  'February sees flow drop to 35 percent of peak. Main Falls and Five Falls still workable but thin. Smaller falls (Tiger, Shenbaga, Old, Honey, Fruit, Orchard) at trickle. Oil massage workable but the therapeutic-water claim weakens. Push to June.',
  'February in Courtallam is when flow drops below the threshold the town is built around. Main Falls thin, smaller falls at trickle. The 9-falls-experience that defines the visit collapses. Push to mid-June for monsoon peak.',
  'February in Courtallam is the dry-quarter low. Daytime 27-32C, nights 23-24C, humidity 60 percent, rainfall under 20mm. Main Falls (the principal cascade, ₹15 ticket) at roughly 35 percent of June-September monsoon flow; Five Falls (Aintharuvi) at similar — workable for a quick splash but not the immersion-bath the falls are built around. The smaller falls in the 9-falls circuit (Tiger, Shenbaga, Old Courtallam, Honey, Fruit, Orchard, Pazhaya) drop to trickle or stop entirely. The Siddha-medicine therapeutic-water claim — that the Sahyadri-catchment forest passes Mallipuruan-oil-related herbs into the stream — weakens at this flow level since the dilution is gone but so is the volume. Oil-massage practitioners (the 2,000-year-old tradition) still operate at ₹500-1,500 per session but the falls-shower-before-massage routine works at half-strength. Hotel rates at year-low: Hotel Vetri Mahal ₹1,200-2,000, Sundara Mahal ₹1,500-2,500, homestays ₹600-1,000. Pollachi-Tenkasi axis traffic light. The trip is wait-tier — workable but at fractional value. Push to the SW-monsoon June-September peak when the herb-infused flow is at full force.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 3, 2, 'skip',
  'Hot dry. 25-35C. Flow at 15 percent. Most falls dry. Skip.',
  NULL,
  'March is when the catchment runs dry. Main Falls at 15 percent, the 8 smaller falls of the 9-falls circuit at near-zero. The trip-defining "9 herb-infused waterfalls" experience does not exist in March. Skip — wait for June.',
  'March in Courtallam is the hot-dry contraction. Daytime 30-35C, nights 25-26C, humidity 65 percent, rainfall under 30mm. The Sahyadri-catchment forest above the falls is at year-driest; the Main Falls drops to 15 percent of monsoon peak (a thin curtain rather than the wall-of-water the falls are built around). Five Falls reduces to a single thin stream. Tiger Falls, Shenbaga Falls, Old Courtallam Falls, Honey Falls, Fruit Falls, Orchard Falls and Pazhaya all stop entirely or run at uncountable trickles. The 9-falls circuit — the trip-defining experience — does not exist in March. Oil-massage practitioners (the 2,000-year-old tradition) still operate at ₹500-1,500 per session but as a standalone therapy without the falls-shower context. Dam-release alerts (when the upstream Manjolai-Manimuthar storage releases for downstream irrigation) bring 1-2 days of artificial flow but these are unpredictable and not the herb-infused current the town markets. Hotel rates at year-low: Hotel Vetri Mahal ₹1,000-1,800, homestays ₹500-800. Skip — the proper SW-monsoon June-September window is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 4, 1, 'skip',
  'Heat dry peak. 27-37C. Falls dry. Tagline avoid-window. Skip.',
  NULL,
  'April is the heat-dry peak. Main Falls at trickle. Smaller falls dry. Daytime 35-37C makes even the dry-season ritual workable only at dawn. Tagline explicitly flags Mar-May as avoid. Skip.',
  'April in Courtallam is the heat-dry peak. Daytime 33-37C, nights 27-28C, humidity 70 percent, rainfall under 20mm. The catchment is at year-driest. Main Falls reduces to a trickle that barely covers the bathing platform; Five Falls splits into uncountable thin threads; the 7 remaining smaller falls (Tiger, Shenbaga, Old, Honey, Fruit, Orchard, Pazhaya) are dry or running at unsustainable rates. The 9-falls-experience that gives Courtallam its tourism reason does not exist in April. Oil-massage practitioners (the 2,000-year-old Mallipuruan-and-Siddha tradition) still take walk-ins at ₹500-1,500 per session — these become the only remaining draw of the town this month, and the practitioners depend on the dry-season passing trade. Dam-release alerts from the upstream Manjolai-Manimuthar storage bring occasional 6-12 hour artificial flow events; these are not the herb-infused current the town markets but tourists sometimes time visits to a known release window. Hotel rates at year-low: Hotel Vetri Mahal ₹1,000-1,800, Sundara Mahal ₹1,200-2,000, homestays ₹500-800. Skip — the brief flags Mar-May as the avoid window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 5, 1, 'skip',
  'Heat continues. 28-38C. Falls still dry. Pre-monsoon wait. Skip.',
  NULL,
  'May continues the dry-bone pattern. Daytime 35-38C, falls at trickle, the 9-falls-circuit non-functional. Pre-monsoon thunderstorms last fortnight bring brief afternoon spikes but not the sustained flow the town runs on. Wait for mid-June.',
  'May in Courtallam is the second dry-skip month. Daytime 33-38C, nights 28-29C, humidity 70 percent, rainfall under 50mm — but the May rainfall is mostly pre-monsoon thunderstorm bursts that don''t sustain catchment flow. Main Falls and Five Falls remain at 10-15 percent of monsoon peak. The 7 smaller falls in the 9-falls circuit remain dry or at uncountable trickle. The trip-defining herb-infused-water claim collapses at this catchment level. Pre-monsoon thunderstorms hit the last fortnight as short violent squalls that briefly boost flow for 6-12 hours but the catchment doesn''t store enough to sustain volume. Oil-massage practitioners continue operating at ₹500-1,500 per session but the falls-shower-before-massage routine is non-functional. Dam-release alerts from upstream Manimuthar storage bring occasional artificial flow windows. Hotel rates at year-low: Hotel Vetri Mahal ₹1,000-1,800, Sundara Mahal ₹1,200-2,000, homestays ₹500-800. The SW monsoon will arrive around June 5-10 and from then the catchment fills within 7-10 days. Skip May entirely — June is the proper return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 6, 5, 'go',
  'SW monsoon arrives. 24-30C. 9 falls fill within 7-10 days. Peak season opens mid-June.',
  'June is when Courtallam reopens for the year. SW monsoon hits the Sahyadri catchment around June 5-10; within 7-10 days the 9-falls circuit fills to full capacity. The herb-infused-water Siddha-medicine claim peaks. Hotel rates climb 60 percent off May lows.',
  NULL,
  'June in Courtallam is the season opener — and the start of the four-month peak window that defines the town. The southwest monsoon hits the Sahyadri catchment around June 5-10; within 7-10 days the Main Falls (₹15 ticket), Five Falls (Aintharuvi), Tiger Falls (Puli Aruvi), Shenbaga Falls, Honey Falls (Then Aruvi), Fruit Falls (Pazha Aruvi), Orchard Falls (Thoppu Aruvi), Old Courtallam Falls and Pazhaya Falls — the full 9-falls circuit — fill to working capacity. By the end of June the catchment is delivering 4-6x the dry-season flow. Water temperature drops to 18-20C; the Siddha-medicine therapeutic-water claim (that the Sahyadri forest above the falls infuses Mallipuruan-related herbs into the stream) peaks in this fresh-monsoon current. Daytime 27-30C, nights 24-25C, humidity 82 percent. Oil-massage practitioners (the 2,000-year-old tradition) at peak demand — pre-booking recommended for the post-falls-shower massage sequence, ₹500-1,500 for 45-90 minutes. Dam-release alerts become routine — Manjolai-Manimuthar storage releases for flood control. Hotel rates climb 60 percent off May lows: Hotel Vetri Mahal ₹2,500-4k, Sundara Mahal ₹3-4,500, homestays ₹1,200-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 7, 5, 'go',
  'Peak monsoon flow. 24-29C. All 9 falls at full. Spa-of-South-India in operation.',
  'July is the operational peak. All 9 falls at full flow. Daytime 26-29C, water 17-19C, herb-infusion claim at strongest. Oil-massage practitioners book 1-2 weeks ahead. Lock the stay.',
  NULL,
  'July in Courtallam is the operational peak of the monsoon-falls year. Rainfall 250-300mm across 18-20 wet days in the upper catchment (the falls-side town receives less direct rain but feels the catchment runoff). Daytime 26-29C, nights 24-25C, humidity 85 percent, water temperature 17-19C. All 9 falls — Main Falls (₹15 ticket, women''s and men''s enclosures, opens 5am-7pm), Five Falls (Aintharuvi 2km away), Tiger Falls (Puli Aruvi), Shenbaga Falls, Honey Falls (Then Aruvi, 4km trek), Fruit Falls (Pazha Aruvi), Orchard Falls (Thoppu Aruvi), Old Courtallam Falls, Pazhaya Falls — at full flow. The Siddha-medicine therapeutic-water claim peaks: the freshly-monsooned Sahyadri forest above passes Mallipuruan-oil-related and assorted herb compounds into the streams at the year-strongest dilution. Oil-massage practitioners (2,000-year-old tradition) book 1-2 weeks ahead — ₹500-1,500 for 45-90 minutes at the licensed therapists clustered around the Main Falls bus stand and at the heritage spa-stay properties. Hotel rates at year-peak: Hotel Vetri Mahal ₹3-5k, Sundara Mahal ₹4-6k, homestays ₹1,500-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 8, 5, 'go',
  'Monsoon peak continues. 24-29C. Aadi-month Tamil pilgrim density. Falls at full.',
  'August continues July''s pattern. Aadi-month (mid-Jul to mid-Aug Tamil calendar) brings Tamil pilgrim density — Main Falls darshan-bath central to the Aadi observance. Hotels at peak. Lock 3-4 weeks ahead.',
  NULL,
  'August in Courtallam holds the July monsoon-peak pattern. Rainfall 200-250mm in the upper catchment, daytime 26-29C, nights 24-25C, water temperature 17-19C, humidity 85 percent. All 9 falls at full flow. Aadi-month (the Tamil calendar month running mid-July to mid-August) brings additional pilgrim density — Main Falls bathing has Aadi-Velli (Aadi Fridays) and Aadi Amavasai (new moon) observances that draw 5,000-10,000 day-pilgrims from the Tirunelveli and Madurai districts. Oil-massage practitioners (2,000-year-old tradition) at peak demand — book 2-3 weeks ahead for the post-falls-shower sequence. The Siddha-medicine therapeutic-water claim at full force; resident Siddha doctors at the heritage spa-stays add Karkidakam-style 7-21 day Ayurveda packages (₹15-50k inclusive of food and lodging) in parallel with the falls-shower routine. Hotel rates at year-peak: Hotel Vetri Mahal ₹3-5k, Sundara Mahal ₹4-6k, homestays ₹1,500-2,500. Dam-release alerts continue — when the upstream Manjolai-Manimuthar storage releases for flood control the PA system at Main Falls posts 30-60 minute bathing closures. Pollachi-Tenkasi axis traffic at year-densest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 9, 5, 'go',
  'Monsoon tail. 24-30C. Flow holding at 80-85 percent. Rates ease 15 percent.',
  'September is the third peak month. SW monsoon eases mid-month but the catchment runoff continues at 80-85 percent. Daytime 27-30C, water 18-20C. Hotel rates ease 15 percent off August.',
  NULL,
  'September in Courtallam is the monsoon-tail peak. Rainfall drops to 150-180mm in the upper catchment as the southwest monsoon retreats through the back half (formal withdrawal from sub-continent around September 25-30). Daytime 27-30C, nights 24-25C, humidity 82 percent, water temperature 18-20C. The 9 falls hold at 80-85 percent of August peak through the first 20 days, slowly dropping to 60-70 percent by month-end. Main Falls and Five Falls at full bath-flow; Tiger, Shenbaga, and Honey at workable flow; Fruit, Orchard, Old and Pazhaya at moderate. The Siddha-medicine therapeutic-water claim at 80 percent — still meaningfully herb-infused as the catchment forest continues to drain. Oil-massage practitioners (2,000-year-old tradition) at peak-tail demand. Dam-release alerts continue through the first fortnight, easing in the back half. Hotel rates ease 15 percent off August: Hotel Vetri Mahal ₹2,500-4k, Sundara Mahal ₹3,500-5k, homestays ₹1,200-2,000. Navarathri (the nine-night Devi festival, last week of September into October) brings additional temple-circuit pilgrim density. The Spa-of-South-India operates at the third-strong month of the peak window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 10, 5, 'go',
  'NE monsoon arrives. 24-30C. Catchment refills mid-month. Second peak window.',
  'October is the second peak window. NE monsoon arrives around Oct 15, refilling the catchment for a second flow surge. Daytime 27-30C. Hotel rates 25 percent below August. Strong value window.',
  NULL,
  'October in Courtallam is the second peak window of the year — the unusual reverse-pattern Tamil Nadu town that benefits from BOTH monsoons. Rainfall 150-200mm in the upper catchment (the northeast monsoon arrives around October 15 and refills the catchment that was draining through September). Daytime 27-30C, nights 24-25C, water temperature 19-21C, humidity 80 percent. The 9 falls climb back from September''s 60-70 percent to 80-85 percent of monsoon peak through the back half of the month. Main Falls (₹15 ticket) and Five Falls at full bath-flow; the smaller falls at workable. The Siddha-medicine therapeutic-water claim returns to strong — the NE-monsoon current carries forest-catchment herbs at the second-best-of-year concentration. Oil-massage practitioners (2,000-year-old tradition) at peak demand; ₹500-1,500 per session at the licensed therapists. Navarathri tail (the nine-night Devi festival running into early October) and Dussehra bring additional temple-circuit traffic. Hotel rates ease 25 percent off August: Hotel Vetri Mahal ₹2,200-3,500, Sundara Mahal ₹3-4,500, homestays ₹1,000-1,800. Dam-release alerts continue as a routine PA-system event.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 11, 4, 'go',
  'NE monsoon active. 23-30C. Catchment full. Flow at 80 percent. Rates 30 percent below August.',
  'November holds the NE-monsoon flow surge. Catchment full, 9 falls at 80 percent. Daytime 27-30C. Hotel rates 30 percent below August. Strong value window.',
  NULL,
  'November in Courtallam holds the second-peak NE-monsoon flow. Rainfall 200-250mm in the upper catchment, daytime 27-30C, nights 23-24C, water temperature 20-22C, humidity 78 percent. The catchment is full and the 9 falls at 80 percent of August peak — Main Falls, Five Falls, Tiger Falls and Shenbaga at full bath-flow; Honey, Fruit, Orchard, Old and Pazhaya at workable flow. The Siddha-medicine therapeutic-water claim at strong-second-of-year. Oil-massage practitioners (2,000-year-old tradition) at peak demand — ₹500-1,500 per session. Hotel rates ease 30 percent off August: Hotel Vetri Mahal ₹2-3,500, Sundara Mahal ₹2,500-4k, homestays ₹900-1,500. Dam-release alerts continue as routine. Karthigai Deepam pilgrims (Nov-Dec full moon, 2026 falls Dec 4 — the Tiruvannamalai-centred festival 350km north) pass through the Tirunelveli district en route. International tourist load remains light; domestic Tamil-pilgrim and oil-therapy clientele dense. The Spa-of-South-India operates at the fourth-strong month of the year''s peak window — value-side of the August peak. Book stays 1-2 weeks ahead at the heritage spa properties.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('courtallam', 12, 4, 'go',
  'NE tail. 22-29C. Flow easing to 70 percent. Christmas-NYE modest rate lift.',
  'December is the NE-monsoon tail. Catchment still draining, flow at 70 percent. Daytime 26-29C, water 19-21C. Christmas-NYE modest spike (Tamil-pilgrim oriented town, not coastal-tourism). Last solid month before dry contraction.',
  NULL,
  'December in Courtallam is the NE-monsoon tail and the last strong month of the year''s peak window. Rainfall 100-150mm in the upper catchment, daytime 26-29C, nights 22-23C, water temperature 19-21C, humidity 72 percent. The catchment is still draining post-NE-monsoon; the 9 falls at 70 percent of August peak — Main Falls (₹15 ticket) and Five Falls at full bath-flow, Tiger and Shenbaga at workable, Honey and Fruit at moderate, Orchard and Old and Pazhaya at thinner flow. The Siddha-medicine therapeutic-water claim still holds at 70 percent strength. Oil-massage practitioners (2,000-year-old tradition) at strong demand — ₹500-1,500 per session at the licensed therapists clustered around Main Falls bus stand. Hotel rates at modest Christmas-NYE lift (this is a Tamil-pilgrim-oriented town, not coastal Goa-style tourism): Hotel Vetri Mahal ₹2-3,500, Sundara Mahal ₹2,500-4k, homestays ₹900-1,500. Dam-release alerts thinning out through the back half. The heritage spa-stay properties book up around Christmas-NYE for Karkidakam-style Ayurveda packages stretched into the December calendar.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
