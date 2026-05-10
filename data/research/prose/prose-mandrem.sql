-- Mandrem destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: mandrem (wellness/yoga, tidal-creek beach, kitesurfing Dec-Mar)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 1, 5, 'go',
  'Peak Konkan winter. 21-30C, dry. Wellness retreats at full capacity. Tidal creek wades at low tide.',
  'January is when Mandrem runs at peak operating volume. Wellness retreats — Ashiyana, Mandala — run their flagship January cohorts at ₹150-300k all-inclusive for 7-21 days. Tidal creek separates the village from the beach proper — wade at low tide (check Goa tide tables) or use the bamboo footbridge.',
  NULL,
  'Mandrem in January is the wellness-and-quiet-beach version of north Goa peak. Daytime 22-30C, nights 19-21C, sea at 26C; the 3km Mandrem Beach holds 200-300 visitors at peak — a fraction of Anjuna 5km south. A tidal creek separates village from beach — at low tide it''s a knee-deep wade across the sandbar, at high tide use the bamboo footbridge near Yab Yum. Ashiyana Yoga Retreat (since 2003) and Mandala Cafe and Yoga (since 2005) run flagship January cohorts at ₹150-300k all-inclusive for 7-21 day residential programmes; book 2-3 months ahead at ashiyana.com or mandala-goa.com. Yab Yum (₹15-40k peak, the bamboo-architecture eco-resort) holds peak rates; Earthscape (₹5-15k) is the lower-cost option. Kitesurfing operates from the Ashvem-end at full thermal-window 11am-5pm — North Goa Kitesurfing School charges ₹4,000-5,000 for a 90-minute intro.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 2, 5, 'go',
  'Driest month. 22-31C. Kitesurfing at peak thermal. Ashiyana / Mandala February cohorts.',
  'February is Mandrem''s cleanest weather window. Rainfall under 5mm, low humidity, the consistent 12-15 knot afternoon onshore wind makes February the kitesurfing peak. Ashiyana and Mandala run February cohorts; long-stay yoga residencies fill the village.',
  NULL,
  'February in Mandrem is the technical peak. Rainfall under 5mm, daytime 23-31C, humidity at 60 percent. The consistent 12-15 knot afternoon onshore wind makes February the kitesurfing peak — North Goa Kitesurfing School and Vaayu Kiteclub (both based at the Ashvem-Mandrem boundary, 800m north) operate 11am-6pm with intermediate-and-up sessions ₹6,000-7,500 for 2 hours. Ashiyana Yoga Retreat and Mandala run February cohorts; the village runs heavily yoga-residential. The 3km Mandrem Beach holds at 200-400 daily visitors — quiet by Goa-coast standards. Tidal-creek wade timing follows the lunar cycle; check goagovt.tide-tables.in for daily windows. Yab Yum walks-in at ₹35-40k peak; Earthscape at ₹12-15k. The village-side scooter ride to Anjuna Wednesday Flea Market (8km, 15-18 minutes) and Saturday Night Market at Arpora (12km, 22 minutes) are the off-village social anchors. La Plage at Morjim (4km, 8 minutes) is the dinner reservation worth booking 3-4 days ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 3, 4, 'go',
  'Last cool window. 23-32C. Kitesurfing winds taper end of month. Hotel rates slide 20 percent.',
  'March extends February''s weather. Kitesurfing wind quality holds through first three weeks; tapers in the last 7-10 days as pre-monsoon humidity arrives. Hotel rates slide 20 percent versus February peak.',
  NULL,
  'March in Mandrem is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last week. Kitesurfing wind quality holds through the first three weeks — afternoon onshore 10-13 knots, slightly less consistent than February but operational; North Goa Kitesurfing School and Vaayu Kiteclub run their last full cohorts of the season. Ashiyana''s last 200-hour cohort closes mid-March, then the school shuts till October. Mandala holds shorter retreats through April. Hotel rates slide 20 percent: Yab Yum at ₹28-32k from February''s ₹38k peak; Earthscape at ₹10-12k. Tidal creek wade is at year-easiest with sandbar at firm dry condition. La Plage at Morjim (4km) drops booking lead from 3-4 days to 1-2. Last comfortable beach-and-yoga window before April pre-monsoon humidity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 4, 2, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Kitesurfing wound down. Yoga schools closed.',
  'April still works for solitude-led travelers prioritising calm beach over comfort. Yoga schools closed since March 25, kitesurfing schools closed since March 25-30. Hotel rates 30-35 percent below peak.',
  'April pushes Mandrem into pre-monsoon stress. Kitesurfing schools closed (winds gone), yoga schools closed, beach time collapses past 10am. Wait for late October.',
  'April in Mandrem narrows to a sliver. Daytime 26-34C, humidity at 75 percent and rising, sea at 29C. Yoga schools — Ashiyana, Mandala — closed since March 25. Kitesurfing schools (North Goa Kitesurfing, Vaayu) closed since March 25-30 as the consistent afternoon onshore winds drop below operational threshold. The 3km beach gets uncomfortable past 10am — sand temperature climbs and the tidal-creek wade becomes a heat-relief option rather than a charm. Yab Yum walks-in at ₹22-26k from February''s ₹38k; Earthscape at ₹7-9k. Beach shacks at the Ashvem-end stay open till May 31 forest-dept deadline but at half-capacity. La Plage at Morjim drops to walk-in viable. Friday-Sunday Mumbai-Pune-Bangalore weekend traffic continues; weekday Mandrem is at year-low energy. Trip works only for AC-strong room and pool-day shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 5, 2, 'wait',
  'Peak heat. 26-35C, humidity 80 percent. Shacks dismantle May 31. Pre-monsoon thunder weeks 3-4.',
  NULL,
  'May runs hot and sticky. Sea bathing collapses past 9am, shacks dismantle May 31. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Mandrem is the last chapter before the southwest monsoon. Daytime 27-35C, humidity 80 percent, sea at 30C. Forest-department deadline closes all 30-odd shacks along the 3km Mandrem-Ashvem strip by midnight May 31. Yoga schools have been closed since late March; kitesurfing operations closed since late March. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. La Plage at Morjim closes May 25 to early August. Yab Yum at ₹15-18k from February''s ₹38k peak; Earthscape at ₹5-6k. Tidal-creek wade still works but the sandbar collapses on storm days. The trip Mandrem sells — yoga, kitesurfing, calm beach — is winding down to nothing. Push to mid-October for the wellness-led trip; late November for kitesurfing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 6, 1, 'skip',
  'SW monsoon arrives June 10. 24-30C, 700-800mm rain. Beach unusable, tidal creek floods. Skip.',
  NULL,
  'June dumps 700-800mm of rain. All shacks dismantled, sea closed for swimming, tidal creek floods beyond wade. Yoga and kitesurfing schools closed. Yab Yum at deep monsoon walk-in. The trip you came for is closed.',
  'June in Mandrem is when the southwest monsoon takes over. The current arrives around June 10 and dumps 700-800mm of rain across 22-25 wet days. All shacks dismantled since May 31. Beach swimming prohibited under Goa Tourism advisory; rip currents and undertow are dangerous. Tidal creek that separates village from beach floods beyond wade — only the bamboo footbridge near Yab Yum stays usable, and even that submerges on heaviest-rain days. Yoga schools (Ashiyana, Mandala) closed for the season; kitesurfing operations closed. Yab Yum stays open at deep monsoon walk-in ₹10-14k from peak ₹38k+; Earthscape closed June through September. La Plage at Morjim closed till early August. The wellness, kitesurfing, calm-beach trip Mandrem sells runs at zero in June. Next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach closed, creek flooded. Skip.',
  NULL,
  NULL,
  'July in Mandrem is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. The 3km beach loses 30-40m of sand width to surf erosion (recovery slow through October). Sea swimming prohibited; lifeguards off-duty. Tidal creek floods to chest-deep on storm days, even bamboo footbridge unusable on the worst. Yoga schools, kitesurfing, all the wellness operators closed. Yab Yum stays open at year-low ₹8-12k; the 6-villa boutique runs at 30-40 percent occupancy on cheap-monsoon-weekend Mumbai traffic. Earthscape closed. La Plage at Morjim closed. The trip Mandrem sells is closed in July. Waiting two-three months pays off enormously — late October hits 4-go territory with clean beach, calm sea, yoga schools reopening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 500-700mm rain. Beach closed, creek high. Skip.',
  NULL,
  NULL,
  'August in Mandrem is more of July with the worst of the southwest current beginning to ease in the final week. Rainfall 500-700mm across 22-24 wet days. Beach swimming still prohibited. Tidal creek still floods on heavier-rain days. Yoga schools and kitesurfing operations closed. La Plage at Morjim reopens late August (4km, 8 minutes by scooter). Yab Yum walks-in at ₹10-13k; Earthscape still closed. Ganesh Chaturthi (variable date late August or early September) shuts much of Hindu Goa for 5-11 days; coastal Mandrem largely unaffected. Trip you came for is closed in August. Push to mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 9, 2, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Yoga schools still closed. Beach still rough.',
  'September is the recovery month. SW monsoon retreats through second half. Yoga schools reopen only in October. Beach still rough through first three weeks. Push to mid-October.',
  'September is rebuild-not-yet-open month. Beach still rough, shacks under construction, yoga schools closed till October. Wait two-three weeks.',
  'September in Mandrem is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats around September 25-30. Shack-building crews from inland Goa start arriving September 15 to rebuild the 30-odd Mandrem-Ashvem structures for the October 1 statutory opening. Beach still rough through first three weeks. Tidal creek sandbar slowly rebuilds. Yoga schools — Ashiyana, Mandala — won''t reopen until late October. Kitesurfing operations won''t restart until November once consistent winds return. Yab Yum walks-in at ₹13-18k; Earthscape reopens around September 15 at ₹5-6k. La Plage at Morjim back to full hours by mid-September. The smart traveler''s call is to wait for the October 5-15 window — full shacks, calm sea, yoga schools reopening. September is a 3-day sample at best.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, 100-150mm late spillover. Shacks rebuilt, yoga schools open late month.',
  'October is the season-opener. All shacks open from October 1, yoga schools reopen late October, kitesurfing restarts mid-November once thermal winds normalise. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Mandrem is the proper return. The October 1 statutory date opens all 30-odd Mandrem-Ashvem shacks. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days) but sea state stabilises by October 10-12. Daytime 25-31C, humidity falling 80 to 70 percent, sea at 28C. Tidal creek wade returns to standard low-tide passability. Yoga schools — Ashiyana, Mandala — reopen their first 200-hour cohorts of the season from late October-early November (book at ashiyana.com or mandala-goa.com 4-6 weeks ahead). Kitesurfing schools won''t restart until mid-November once consistent 10-13 knot afternoon winds return. Yab Yum walks-in at ₹22-26k from December peak ₹38k+; Earthscape at ₹7-9k. La Plage at Morjim at peak hours; booking lead 1-2 days. Strong-value window — full beach minus December rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 11, 5, 'go',
  'Peak builds. 22-30C, rainfall under 30mm. Yoga schools running, kitesurfing returns mid-month.',
  'November is the proper pivot to peak season. Rainfall under 30mm, yoga schools at full residency, kitesurfing returns mid-November once consistent afternoon winds settle. Hotel rates 25-30 percent below December peak.',
  NULL,
  'November in Mandrem is the year''s second-peak month behind January. Rainfall under 30mm, daytime 22-30C, sea at 27C, humidity dropping below 70 percent. Yoga schools — Ashiyana, Mandala — running first full 200-hour cohorts of the season; mixed-residency pricing ₹150-300k for 4-week intakes. Kitesurfing schools — North Goa Kitesurfing, Vaayu Kiteclub — return mid-November once consistent 10-13 knot afternoon onshore winds settle; introductory 90-minute sessions ₹4,000-5,000. Yab Yum walks-in at ₹28-32k; Earthscape at ₹10-12k. Christmas-NYE rates kick in around November 25 — book accommodation before then. Tidal creek wade at year-best with stable sandbar. La Plage at Morjim booking lead climbs to 2-3 days. Strong call for first-time Mandrem visitors — peak weather, yoga and kitesurfing in operation, prices still 25-30 percent below late-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mandrem', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE rates 2x. Yoga residencies sold out, kitesurfing at full operation.',
  'December is when Mandrem runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2x, Ashiyana and Mandala December cohorts sold out 3-4 months ahead, kitesurfing slots sell out 2-3 days ahead.',
  NULL,
  'December in Mandrem is the operational peak. Daytime 22-30C, nights 19-21C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb to 2x the November baseline: Yab Yum at ₹38-40k+; Earthscape at ₹13-15k. Ashiyana Yoga Retreat and Mandala''s December residential cohorts sell out 3-4 months ahead — book at ashiyana.com or mandala-goa.com by September if December dates are firm. Kitesurfing schools (North Goa Kitesurfing, Vaayu Kiteclub) operate 11am-6pm at full capacity; intermediate-and-up 2-hour sessions sell out 2-3 days ahead at ₹6,000-7,500. La Plage at Morjim booking lead 5-7 days. Tidal creek wade at year-best with strong sandbar. The 8km scooter ride to Anjuna Wednesday Flea Market gridlocks 11am-2pm in Christmas week. The first three weeks of December (before December 22) are the better-value Mandrem window — full beach, yoga schools running, kitesurfing operational, December-22 rate spike still ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
