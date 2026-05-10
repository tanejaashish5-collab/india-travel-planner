-- Dudhsagar Falls destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: dudhsagar-falls

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 1, 5, 'go',
  'Peak post-monsoon flow. 16-28C valley. Jeep safari Collem 8am-5pm. Train route open with viaduct theatre.',
  'January is when Dudhsagar runs at its post-monsoon peak. Jeep safari from Collem (Kulem) is at full tempo (8am-5pm gate, ₹400/jeep up to 7 pax via Mollem range office); the Vasco-Hubli rail line through Bhagwan Mahavir Wildlife Sanctuary delivers the iconic bridge-through-spray crossing on the Goa Express and Hubli Vasco Passenger.',
  NULL,
  'Dudhsagar Falls in January is the version every Western Ghats traveller wants. Daytime in the valley sits 18-28C, mornings at the 600m Mollem range gate drop to 16C, the four-tier 310m fall — India''s 5th tallest — runs at its post-monsoon strength. Jeep safari from Collem (Kulem) is the access route: Mollem range office issues 8am-5pm permits at ₹400 per jeep up to 7 passengers, plus ₹50 entry per person; the 14km off-road run through Bhagwan Mahavir Wildlife Sanctuary takes 90 minutes each way and ends at a 1km walk to the base pool. Trek option (Castle Rock or Kulem side) runs the railway line — technically prohibited but routinely walked, 11-14km one-way; the Goa Express (12780) and Hubli-Vasco Passenger (07306) both pass the bridge mid-morning, framed in spray. Stays cluster: Lalit Golf & Spa (₹12-18k, Canacona side), Jungle Greens (₹5-8k, Collem road), Dudhsagar Riverside Homestay (₹2-3.5k, Mollem village), Wildernest Treehouses (₹6-10k, Chorla Ghat). Kulem station to Collem jeep stand is a 200m walk; from Madgaon, Kulem is 1.5 hours by Vasco-Kulem passenger.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 2, 5, 'go',
  'Driest month, flow easing. 18-30C. Jeep + train both run. Visitor load eases mid-month.',
  'February is the cleanest of the cool months — rainfall under 10mm, valley dry, jeep tracks firm. Flow eases visibly versus January but stays photogenic. Mid-Feb to mid-March is the under-rated window — same conditions, lower visitor load.',
  NULL,
  'February in Dudhsagar is the technical sweet-spot. Rainfall averages under 10mm, daytime 19-30C, the four-tier fall still runs at strong post-monsoon flow but visibly easing versus January. The 14km Collem-to-falls jeep track is at its driest and firmest of the year — the 8am gate sees 30-40 jeeps roll out by 9, and the base pool gets the year''s clearest spray light between 11am and 1pm. Republic Day spillover thins by Feb 5; mid-February to mid-March is the window photographers prefer — same conditions, 30 percent fewer visitors. The Vasco-Hubli rail crossings (Goa Express 12780, Hubli-Vasco Passenger 07306) hold their winter timetable. Stays: Lalit Golf & Spa walk-in available, Wildernest Treehouses at Chorla Ghat (45km drive but worth the night) hold ₹6,000-9,000. Pack a torch — Mollem-side homestays sit on long power-cut lines. Avoid weekends; jeep waits at Collem stretch to 60-90 minutes Saturday-Sunday.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 3, 3, 'wait',
  'Flow weakening. 20-32C valley. Jeep + train run but the falls lose the spray theatre.',
  'March is when Dudhsagar starts thinning. The four-tier fall reduces to two strong tiers; spray off the railway bridge weakens. Jeep and train still run normally. Workable for travellers who want the sanctuary drive more than the falls peak.',
  'March is the start of the dry-down. Flow drops noticeably each week, the spray-through-the-bridge theatre that defines Dudhsagar weakens, and by month-end the lower tiers are visibly thin. If the falls are the entire reason for the trip, push to October-January.',
  'March in Dudhsagar is the first month the trip starts compromising. Daytime 21-32C, valley humidity creeping toward 70 percent, the four-tier fall reduces visibly each week as Western Ghats catchment dries. By March 20-25 the lower two tiers are thinning — the Goa Express bridge crossing still gets a spray pass but at reduced photogenic strength. Jeep tours from Collem run normal 8am-5pm; the 14km drive through Bhagwan Mahavir Wildlife Sanctuary is the higher-value half of the day now (sloth bear, sambar, gaur sightings climb in March as wildlife concentrates near remaining water sources). Lalit Golf & Spa drops walk-in rates 25 percent versus February. Holi long weekend brings a 3-day domestic bump. The smart split is to make the trip a wildlife-sanctuary drive with the falls as the back-half; February-October-November are the falls-led months.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 4, 2, 'wait',
  'Flow trickle. 23-34C. Jeep runs, train runs, but the falls are a thin flow over 4 tiers.',
  'April is heat plus thin-flow. The falls drop to a watered-rock-face — the 310m drop is still there but the spray and the photo are not. Wildlife-sanctuary drive is the only valid reason to make the trip.',
  'April is when the falls themselves are not really the trip. Flow is a thin trickle, valley heat at 32-34C, jeep dusty, and the iconic spray-through-the-bridge moment is gone until October. Wait for October — the same logistics with five times the flow.',
  'April in Dudhsagar is when the falls reduce to their weakest annual flow. The four-tier 310m drop still exists in geometry but the water is a thin sheet over rock. Daytime 24-34C in the valley, humidity past 70 percent, jeep tracks dusty. The 14km Collem-jeep ride still runs (8am-5pm, ₹400/jeep) but the back-end payoff is thin: photographs that worked in January look like an empty rockface. The Bhagwan Mahavir Wildlife Sanctuary drive carries the day instead — water sources are at year-low, animals concentrate at the Surla and Tambdi Surla streams, sloth bear and gaur sighting probability climbs. Lalit Golf & Spa walk-in at ₹8,000-10,000 versus ₹12,000-15,000 peak. The Vasco-Hubli train crossing of the bridge still runs but the spray cinematography is gone until October. Skip the falls trip; consider Mollem sanctuary as a separate plan.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 5, 1, 'skip',
  'Falls almost dry. 25-36C. Jeep runs but the trip you came for cannot deliver. Skip.',
  NULL,
  'May is when the falls effectively dry to a trickle ahead of the monsoon arrival. The four-tier 310m structure is visible but waterless. Jeep + train still run but the photo and the spray are absent. Wait for October.',
  'May in Dudhsagar is the year''s low point for falls flow. The Western Ghats catchment is drained ahead of the southwest monsoon; the four tiers run as sheet-water over rock or stop entirely on the lower tiers. Daytime 26-36C in the valley, humidity climbing past 75 percent the last week, pre-monsoon thunderstorms from May 22 onward bringing 30-50mm overnight squalls but no day-flow recovery. The Collem jeep run is dusty and hot; the 14km off-road push through Bhagwan Mahavir Wildlife Sanctuary still runs (8am-5pm, ₹400/jeep) but the falls themselves cannot deliver the trip. Vasco-Hubli train crossings still pass the bridge — empty rockface backdrop. Stays at Lalit Golf & Spa, Wildernest Treehouses, Dudhsagar Riverside Homestay run at year-low rates (35-40 percent below peak) but the trip is hollow. October 1 is the next valid window — jeep gates stay closed till then.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 6, 1, 'skip',
  'JEEP CLOSURE STARTS JUN 1. 25-30C, monsoon onset. Falls at full force but unreachable by jeep. Trains run.',
  NULL,
  'June 1 is the official jeep-safari closure under Goa Forest Department rules. Falls run at full monsoon strength but the only reliable access (Collem jeep) is shut till Oct 1. Trains pass the bridge but stops at the falls are not permitted — windows-only viewing. Skip.',
  'June in Dudhsagar is when access closes even as the falls hit their year-best flow. Goa Forest Department rule shuts Collem-Mollem jeep operations from June 1 to September 30 — the 14km off-road track through Bhagwan Mahavir Wildlife Sanctuary is unsafe under monsoon (landslides, swollen streams, leech-heavy trails). Falls themselves run at full pre-peak monsoon strength: rainfall in the catchment averages 600-800mm in June, the four 310m tiers froth white. Vasco-Hubli trains continue to pass the railway bridge — Goa Express 12780, Hubli-Vasco Passenger 07306, plus monsoon-special services — but stops at the falls themselves are not permitted (signal block, safety rule), so it''s windows-only viewing through the carriage. The trek route (Castle Rock or Kulem) is technically illegal and dangerous in monsoon (Indian Railways prosecutes track-walkers). The trip you came for cannot happen until October 1.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 7, 1, 'skip',
  'JEEP CLOSED. 24-29C, peak monsoon, 1000-1200mm rain. Falls peak flow but inaccessible. Skip.',
  NULL,
  'July is peak monsoon — falls at year-best flow but jeep closed under Forest Department rule, train windows-only viewing. Trek route closed for safety. The only proper access is October 1 onward.',
  'July in Dudhsagar is when the falls hit visual year-peak — and remain inaccessible. Catchment rainfall hits 1000-1200mm. The four 310m tiers froth and roar; the railway bridge crossing through spray on the Vasco-Hubli line is at its most cinematic. But Goa Forest Department''s seasonal closure (Jun 1 - Sep 30) means no jeep safari from Collem; the 14km off-road track is unsafe and gated. Train crossings on Goa Express 12780 and Hubli-Vasco Passenger 07306 remain windows-only — Indian Railways permits no scheduled stops at the falls section, no platform exists, and trespassing is prosecuted. The Castle Rock and Kulem trek routes — already informal — are flat dangerous in monsoon (rockfall, rail collisions, leeches, cobras). Mollem-village stays sit at year-low rates but the falls cannot be reached. The trip works only as a window-glimpse from a moving train.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 8, 1, 'skip',
  'JEEP CLOSED. 24-29C, 800-1000mm rain. Same as July — falls peak, access shut. Skip.',
  NULL,
  'August continues the July pattern — Forest Department jeep closure in force, falls at year-best flow, but no proper access. Train windows-only. Wait for October 1.',
  'August in Dudhsagar holds July''s monsoon pattern. Rainfall 800-1000mm in the catchment, the four 310m tiers running at year-peak strength. Goa Forest Department''s seasonal jeep closure (Jun 1 - Sep 30) remains in force; the 14km Collem-to-falls off-road remains gated. Vasco-Hubli train crossings continue — Goa Express, Hubli-Vasco Passenger — but stops at the falls section are not permitted under Indian Railways rules. The trek route remains illegal and dangerous. Mollem-village homestays run at 50 percent below peak rates but the trip cannot deliver. Bhagwan Mahavir Wildlife Sanctuary itself stays open with restricted access — leopard, gaur, sloth bear sightings concentrate around water sources but the safari roads are closed for tourist purpose. Wait for October 1, when the seasonal closure lifts and falls still run at strong post-monsoon flow.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 9, 1, 'skip',
  'JEEP STILL CLOSED. 25-30C, 400-600mm rain easing. Closure lifts Oct 1 — wait two more weeks.',
  NULL,
  'September keeps the jeep closure in place till September 30. Rain eases, falls still strong, but the Collem jeep operation does not restart until October 1. Wait the extra week or two for full access.',
  'September in Dudhsagar is the recovery month with the gating constraint that Forest Department jeep closure holds till September 30. Rainfall drops to 400-600mm, the southwest monsoon retreats from the Western Ghats by the third week, but the 14km Collem-to-falls jeep operation does not restart until October 1 under the regulator''s fixed cycle. Vasco-Hubli train crossings continue to pass the bridge — Goa Express, Hubli-Vasco Passenger — but stops are not permitted and trespass is prosecuted. The trek route from Castle Rock or Kulem station is technically illegal year-round and remains dangerous on muddy tracks. Falls run at strong flow throughout September — visible from train carriages, photographable through windows on a 5-second pass. Mollem-village stays (Dudhsagar Riverside Homestay, Mollem Nature Camp, Sahakari Spice Farm Homestay) sit at year-low rates from September 1-25 but the access window is shut. Push to October 1 for the proper trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 10, 4, 'go',
  'JEEP REOPENS OCT 1. 22-30C, 150-200mm rain. Falls at strong post-monsoon flow. Best balance of all year.',
  'October 1 is the official jeep-safari reopening. Falls still at strong post-monsoon flow, valley dry enough for safari tracks, weather coolest of the post-monsoon. The Oct 1-Nov 30 window is the year''s best balance of access and flow.',
  NULL,
  'October in Dudhsagar is the year''s best access-and-flow balance. The Goa Forest Department lifts seasonal jeep closure on October 1; Collem jeep operations restart at full tempo (8am-5pm gate, ₹400/jeep up to 7 pax, 14km off-road through Bhagwan Mahavir Wildlife Sanctuary). The four 310m tiers still run at strong post-monsoon flow — only marginally easing from the August-September peak — and the spray-through-the-bridge effect is at its photogenic best for the Vasco-Hubli train crossings (Goa Express 12780, Hubli-Vasco Passenger 07306). Daytime 23-30C in the valley, rainfall 150-200mm mostly the first 10 days, humidity easing toward 75 percent. Wildlife sanctuary drives are at year-best — sloth bear, gaur, sambar concentrate as monsoon waterholes shrink to remaining streams. Stays: Lalit Golf & Spa walk-in at ₹8,500-10,000 (versus ₹12-18k peak), Wildernest Treehouses at Chorla Ghat ₹5,500-7,500, Mollem Nature Camp ₹3,000-4,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 11, 5, 'go',
  'Peak Dudhsagar window. 18-29C, dry, falls strong. Jeep and train both at full tempo. Weekday-quiet.',
  'November is the proper Dudhsagar peak. Falls run at strong post-monsoon flow, valley cool and dry, jeep tracks firm, train route clear, weekend visitor load 4,000-6,000 jeep tickets. Weekday Tuesday-Thursday is the smart-traveller call — jeep waits under 30 minutes.',
  NULL,
  'November in Dudhsagar is operational peak. Daytime 20-29C, nights drop to 18C, rainfall under 50mm and almost all in the first week. The four 310m tiers run strong post-monsoon flow; the spray-through-the-bridge cinematography on the Vasco-Hubli line peaks. Weekend jeep wait at Collem stretches to 60-90 minutes Saturday-Sunday with 4,000-6,000 jeep-ticket sales month-of; weekday Tuesday-Thursday wait drops to 15-30 minutes. Bhagwan Mahavir Wildlife Sanctuary drives carry strong sloth bear, gaur, and sambar sighting odds. Stays climb 25-35 percent across the month — Lalit Golf & Spa from ₹10,000 to ₹14,000, Wildernest Treehouses from ₹6,500 to ₹8,500. Vasco-Hubli train timetable holds full; the Goa Express westbound passes the bridge around 10:45am and the Hubli-Vasco Passenger around 11:30am — the 9am-12pm window is photographer-prime. Diwali long weekend (variable) brings a 3-day domestic surge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dudhsagar-falls', 12, 5, 'go',
  'Peak season. 16-28C, dry, flow strong. Christmas-NY drives jeep ticket queues 90+ min. Book stays 21 days ahead.',
  'December is the year''s most reliable Dudhsagar window. Falls strong, valley cool, jeep + train both at full tempo. Christmas-NY week (Dec 22-Jan 2) drives jeep-counter queues at Collem to 90+ minutes and Mollem-belt stays out 21 days ahead.',
  NULL,
  'December in Dudhsagar is operational peak. Daytime 18-28C, nights at 16C in the Mollem belt, rainfall under 30mm. The four 310m tiers run at strong post-monsoon flow — only marginally weaker than November. Christmas-NY week (December 22 to January 2) drives jeep-counter queues at Collem (Mollem range office) to 90-120 minute waits Saturday and Sunday; weekday Tuesday-Thursday holds at 30-45 minutes. Stays in the Mollem belt book out 21-28 days ahead from December 18: Lalit Golf & Spa at ₹16,000-19,000 (versus ₹10,000-12,000 weekday Nov), Wildernest Treehouses ₹9,000-11,000, Dudhsagar Riverside Homestay walk-in at ₹3,500-4,500 (versus ₹2,000-2,500 off-peak). The 8am gate is the smart-traveller arrival — last 30 jeeps return by 5pm cut-off and skipping the 8am rush stretches to a 1pm departure. Vasco-Hubli train timetable holds full; Goa Express westbound passes the bridge ~10:45am, Hubli-Vasco Passenger ~11:30am — book photographer-side seats.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
