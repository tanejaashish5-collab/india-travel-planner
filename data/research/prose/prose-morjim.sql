-- Morjim destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: morjim (Olive Ridley turtle nesting Oct-Mar, "Little Russia" expat enclave, La Plage)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 1, 5, 'go',
  'Peak Konkan winter. 21-30C, dry. Olive Ridley nesting at peak. La Plage booking 4-6 days out.',
  'January is when Morjim runs at peak operating volume. Olive Ridley turtle nesting (Goa Forest Department-protected) at peak — Oct-Mar season, January is mid-window. Russian-expat scene at fullest (signage in Cyrillic across the village). La Plage (the French-Mediterranean institution since 2003) wants 4-6 day booking lead.',
  NULL,
  'Morjim in January is the calmest of the north-Goa peak destinations and the one with the genuine wildlife claim. Daytime 22-30C, nights 19-21C, sea at 26C. Olive Ridley turtle nesting at peak through the Oct-Mar season — Goa Forest Department''s Morjim-Galgibaga Marine Turtle Conservation Project runs nightly patrols on the southern stretch (Turtle Beach, near Morjim Mouth); visitors can join the 8pm-11pm volunteer monitoring window by checking in at the Forest Dept hut. The project records 100-200 nests across the Morjim-Mandrem-Galgibaga circuit each season; turtle-walks are free but disruption is regulated — no torches, no flash photography. Russian-expat scene at fullest: Cyrillic signage on most cafe boards, Russian menus at La Plage, Sur La Mer and Morjim main road cafes. La Plage (since 2003) wants 4-6 day dinner booking lead. Sur La Mer (₹15-40k) and Mayfair On Sea hold high-end stays; Marbela Beach (₹5-15k) is the mid-tier.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 2, 5, 'go',
  'Driest month. 22-31C. Turtle nesting still active. Russian peak season, Carnival reaches Mapusa (10km).',
  'February is Morjim''s cleanest weather window. Rainfall under 5mm, low humidity, turtle nesting still active through the Forest Department''s Oct-Mar protected season. La Plage at peak booking demand. Russian-expat traffic at year-peak — Cyrillic signage everywhere, January-February Russian-charter window.',
  NULL,
  'February in Morjim is the technical peak. Rainfall under 5mm, daytime 23-31C, humidity at 60 percent. Olive Ridley turtle nesting still active — Goa Forest Department patrols continue nightly through to mid-March. Russian-expat traffic at year-peak; chartered flights from Moscow-St Petersburg via Mumbai-Goa run a January-February window that fills the Morjim-Ashvem belt. La Plage booking lead 5-7 days; the kitchen takes a Tuesday off. Sur La Mer holds peak rates ₹35-40k; Mayfair On Sea at ₹30-35k; Marbela Beach at ₹12-14k. The 3.5km Morjim Beach holds 200-400 daily visitors — quiet by Goa-coast standards. Carnival float parade reaches Mapusa (10km, 18 minutes by scooter) on the festival Monday. Anjuna Wednesday Flea Market 7km south — 12-15 minutes. Ashvem Beach kitesurfing operations (North Goa Kitesurfing, Vaayu Kiteclub) at 1-2km north are at peak thermal-window. Beach-shack scene is chiller than Calangute-Baga 12km south — most close by 10pm, no mainstream nightlife.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 3, 4, 'go',
  'Last cool window. 23-32C. Turtle nesting tapers. Russian charter window closes mid-month. Hotel rates slide 20 percent.',
  'March extends February''s weather. Olive Ridley nesting tapers in the last two weeks. Russian charter flights end mid-March. Hotel rates slide 20 percent versus February peak.',
  NULL,
  'March in Morjim is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last week. Olive Ridley turtle nesting tapers in the last two weeks — Forest Department patrols wind down by March 25-30 once egg-laying drops below threshold. Russian charter flights end mid-March; the Cyrillic signage starts coming down by month-end. Hotel rates slide 20 percent: Sur La Mer at ₹25-30k from February''s ₹38k; Mayfair On Sea at ₹22-26k; Marbela Beach at ₹10-12k. La Plage drops dinner booking lead from 5-7 days to 2-3. Ashvem-end kitesurfing wind quality holds first three weeks; tapers in the last 7-10 days. Last comfortable beach-and-turtle-walk window before April humidity collapses outdoor evening activity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 4, 2, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Turtle nesting season closed. Russian crowd gone.',
  'April still works for solitude-led travelers — the Russian-charter scene has cleared, beaches at year-quietest. Hotel rates 30-35 percent below peak. La Plage booking lead drops to walk-in viable.',
  'April pushes Morjim into pre-monsoon heat. Olive Ridley nesting season closed, Russian-expat scene gone, mid-day beach activity collapses. Wait for late October.',
  'April in Morjim narrows to a quiet shape. Daytime 26-34C, humidity at 75 percent, sea at 29C. Olive Ridley turtle nesting season closed; Forest Department patrols stand down till the next October-March cycle. Russian-expat scene cleared by early month — most return-charter flights run through March. Beach traffic at year-quietest — 50-100 daily visitors versus the 300-400 February peak. Sur La Mer walks-in at ₹18-22k; Mayfair On Sea at ₹16-20k; Marbela Beach at ₹6-8k. La Plage drops to walk-in viable; the kitchen closes May 25 to early August for monsoon. Beach shacks open till May 31 forest-dept deadline but on shorter hours. Trip works for AC-strong room, late-evening shack, pool-day shape — and the genuinely quiet beach is unusual for the Goa coast in any season. Skip the 11am-4pm window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 5, 2, 'wait',
  'Peak heat. 26-35C, humidity 80 percent. Shacks dismantle May 31. La Plage closes May 25.',
  'May is the closing month. Shacks dismantle May 31. La Plage closes May 25 to early August. Pre-monsoon thunder hits last 10 days. Hotel rates at year-low.',
  'May runs hot and sticky. Sea bathing collapses past 9am, shacks dismantle May 31, La Plage closes May 25. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Morjim is the last chapter before the southwest monsoon. Daytime 27-35C, humidity 80 percent, sea at 30C. Forest-department deadline closes all 25-odd Morjim-Ashvem-Mandrem shacks by midnight May 31. La Plage closes May 25 to early August. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. Sur La Mer at ₹13-17k from February''s ₹38k peak; Mayfair On Sea at ₹12-15k; Marbela Beach at ₹5-6k. Anjuna Wednesday Flea Market down to under 100 stalls. Friday-Sunday weekend Mumbai-Pune occupancy at 50 percent on cheap-package traffic; weekday Morjim is nearly empty. The trip Morjim sells — turtle nesting, Russian-expat scene, La Plage dinners, calm beach — is winding down to nothing. Push to mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 6, 1, 'skip',
  'SW monsoon arrives June 10. 24-30C, 700-800mm rain. Beach unusable, La Plage closed. Skip.',
  NULL,
  NULL,
  'June in Morjim is when the southwest monsoon takes over. The current arrives around June 10 and dumps 700-800mm of rain across 22-25 wet days. All shacks dismantled since May 31. La Plage closed till early August. Sea swimming prohibited under Goa Tourism advisory. Forest Department turtle patrols off-season till October. Sur La Mer stays open year-round at ₹10-14k from peak ₹38k+; Mayfair On Sea similar pricing. Marbela Beach drops to ₹4-5k. Russian-expat scene gone since March; the Cyrillic signs come down or stay covered for monsoon. The 3.5km Morjim Beach loses 30-40m of sand width to surf erosion. Trip works only for cheap-monsoon-weekend Mumbai-Pune traffic with strong AC and pool — and even then most regulars head to Bombay-Lonavala instead. Next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach closed. Skip.',
  NULL,
  NULL,
  'July in Morjim is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. Sea swimming prohibited; lifeguards off-duty. All shacks dismantled. La Plage closed till early August. Sur La Mer holds open year-round at ₹10-13k; Mayfair On Sea similar. The 3.5km beach loses sand width to surf erosion (recovery slow through October). Russian-expat scene completely absent. The trip Morjim sells — turtle nesting (closed till October), Russian-expat winter (gone), La Plage dinners (closed), calm beach (unusable) — runs at zero in July. Waiting until late October pays off enormously: Forest Department turtle patrols restart mid-month, La Plage reopens, beach rebuilds, Russian-charter window resumes mid-November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 8, 1, 'skip',
  'Monsoon eases late-month. 24-29C, 500-700mm rain. La Plage reopens late August. Beach still closed.',
  NULL,
  'August holds July''s pattern with the worst easing in the last week. La Plage reopens around August 25-30. Beach still under swim advisory. Wait for late October.',
  'August in Morjim is more of July with the worst of the southwest current beginning to ease in the final week. Rainfall 500-700mm across 22-24 wet days. Sea swimming still prohibited under advisory. All shacks remain dismantled. La Plage reopens around August 25-30 — earliest of the seasonal kitchens to come back. Sur La Mer at ₹12-15k; Marbela Beach at ₹4.5-5k. Forest Department turtle patrols still off-season; Olive Ridley arrivals begin only in mid-October. Ganesh Chaturthi (variable date late August or early September) shuts much of Hindu Goa for 5-11 days; coastal Morjim largely unaffected — most operations Catholic-and-Russian-run. Trip you came for is closed in August. Push to mid-October when the turtle nesting reopens and the beach rebuilds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 9, 2, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. La Plage at full hours. Beach still rough. Turtle patrols not yet restarted.',
  'September is the recovery month. SW monsoon retreats through second half. La Plage at full hours by mid-month. Forest Department turtle patrols restart only mid-October. Beach still rough through first three weeks.',
  'September is rebuild-not-yet-open month. Beach still rough, shacks under construction, turtle patrols off-season. Wait two-three weeks.',
  'September in Morjim is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats around September 25-30. La Plage at full hours by mid-month. Shack-building crews start arriving September 15 to rebuild the 25-odd Morjim-Ashvem structures for October 1 statutory opening. Beach still rough first three weeks. Forest Department Marine Turtle Conservation Project officially restarts patrols mid-October once the first Olive Ridley arrivals are recorded; September is fallow. Sur La Mer at ₹15-20k; Mayfair On Sea at ₹13-18k; Marbela Beach at ₹5-7k. Russian-charter window won''t reopen until November. The smart traveler''s call is to wait for mid-October — full shacks, calm sea, turtle patrols restarting, La Plage at full booking demand. September gives a 3-day sample at best.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, 100-150mm late spillover. Olive Ridley nesting begins. Shacks rebuilt.',
  'October is the season-opener at Morjim. All shacks open from October 1, Forest Department turtle patrols restart mid-month, first Olive Ridley arrivals recorded. La Plage at full booking lead. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Morjim is the proper return. The October 1 statutory date opens all 25-odd shacks across the Morjim-Ashvem strip. Forest Department''s Marine Turtle Conservation Project restarts patrols mid-October; first Olive Ridley arrivals recorded around October 12-18 in most years. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days) but sea state stabilises by October 10-12. Daytime 25-31C, humidity falling 80 to 70 percent, sea at 28C. La Plage at full evening booking lead 2-3 days. Sur La Mer walks-in at ₹22-26k from December peak ₹38k+; Mayfair On Sea at ₹18-22k; Marbela Beach at ₹8-10k. Russian-charter window won''t reopen until November. Strong-value window for nature-led travelers — Olive Ridley nesting begins, beach rebuilds, off-peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 11, 5, 'go',
  'Peak builds. 22-30C, rainfall under 30mm. Turtle nesting active. Russian-charter window reopens.',
  'November is the proper pivot to peak season. Rainfall under 30mm, Olive Ridley nesting active (Forest Department patrols nightly), Russian-charter flights resume, La Plage booking lead 3-4 days.',
  NULL,
  'November in Morjim is the year''s second-peak month behind January. Rainfall under 30mm, daytime 22-30C, sea at 27C, humidity dropping below 70 percent. Olive Ridley turtle nesting at active phase — Goa Forest Department''s nightly patrols (8pm-11pm window for visitor monitoring) run continuously from mid-October through to mid-March. Russian-charter window reopens — chartered flights from Moscow-St Petersburg via Mumbai-Goa fill the Morjim-Ashvem belt November-March. Cyrillic signage returns. La Plage booking lead climbs to 3-4 days. Sur La Mer walks-in at ₹28-32k; Mayfair On Sea at ₹26-30k; Marbela Beach at ₹10-12k. Christmas-NYE rates kick in around November 25 — book accommodation before then. Strong call for first-time Morjim visitors — peak weather, full turtle-nesting window, Russian-expat scene returning, prices still 25-30 percent below late-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('morjim', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE rates 2x. Russian-expat scene at year-peak.',
  'December is when Morjim runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2x, Russian-expat scene at year-peak, La Plage booking lead 5-7 days, Olive Ridley nesting at year-peak.',
  NULL,
  'December in Morjim is the operational peak. Daytime 22-30C, nights 19-21C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb 2x: Sur La Mer at ₹38-42k+; Mayfair On Sea at ₹35-40k; Marbela Beach at ₹13-15k. Russian-expat scene at year-peak — chartered flights from Moscow-St Petersburg run weekly, Cyrillic signage across cafe-and-stay boards, Russian menus at La Plage, Sur La Mer and the village cafes. La Plage booking lead 5-7 days. Olive Ridley nesting at year-peak; Forest Department patrols log 30-50 nests per week through Christmas-NYE. Anjuna Wednesday Flea Market 7km south gridlocks 11am-2pm in Christmas week. The 3.5km Morjim Beach holds 600-800 daily visitors at peak — quieter than Calangute-Baga 12km south but busier than November. The first three weeks of December are the better-value window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
