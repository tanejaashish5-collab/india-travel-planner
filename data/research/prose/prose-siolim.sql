-- Siolim destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: siolim (RIVERSIDE Bardez village; São João Jun 24 = THE event; avoid_months=[7,8] only)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 1, 5, 'go',
  'Peak Konkan winter. 21-30C, dry. Riverside village, calm scene. Hosa and Thalassa booking 5-7 days out.',
  'January is when Siolim runs at peak operating volume. The 1630 twin-steeple Portuguese church (Our Lady of Mt Carmel, the village anchor) at peak walking weather. Hosa (Indian Ocean kitchen, since 2020) and Thalassa (Greek taverna, moved from Vagator 2018) want 5-7 day dinner booking lead.',
  NULL,
  'Siolim in January is the calmest of the north-Goa peak destinations and the only riverside one. Daytime 22-30C, nights 19-21C; the Chapora River runs at low tide. The 1630 twin-steeple Portuguese church (Our Lady of Mt Carmel; novena May 1, feast August 15) is at peak walking weather — the rebuild completed 1937 after the original facade collapsed. Siolim House (the 1631 Bragança manor, UNESCO Heritage Watch shortlist 2001) operates as a heritage-stay rental ₹4.5-7.5k. The Postcard Siolim House (₹6-10k) is the boutique-restoration anchor; Vivenda Dos Palhacos (₹12-18k) and Nilaya Hermitage (₹8-14k) round the spread. Hosa (Indian Ocean cuisine, since 2020) and Thalassa (Mariketty Grana''s Greek taverna, moved from Vagator''s cliffs in 2018) each want 5-7 day dinner booking lead — Thalassa especially for Friday-Sunday riverside-deck tables. The 499m Siolim-Chopdem Bridge (2002) crosses to Pernem.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 2, 5, 'go',
  'Driest month. 22-31C. Carnival reaches Mapusa (5km). Heritage-villa scene at peak demand.',
  'February is Siolim''s cleanest weather window. Rainfall under 5mm, low humidity, Carnival float parade reaches Mapusa (5km, 10 minutes by scooter) — closer than Panaji. Heritage-villa scene at peak demand, Thalassa booking lead 6-8 days.',
  NULL,
  'February in Siolim is the technical peak. Rainfall under 5mm, daytime 23-31C, humidity at 60 percent. The 1630 Portuguese church at year-best photography window (the dual-steeple silhouette catches the late-afternoon sun cleanly). Carnival float parade reaches Mapusa (5km, 10 minutes by scooter) on the festival Monday — closer than Panaji or Margao. The 499m Siolim-Chopdem Bridge sees clean traffic; weekend river-cruise operators (Kerkar Sunset Cruise, Lazy Cruise) run from the Chopdem-side jetty 4-7pm. Heritage-villa scene at peak demand: Vivenda Dos Palhacos at ₹16-18k, The Postcard Siolim House at ₹9-10k, Siolim House at ₹7-7.5k peak. Hosa booking lead 5-7 days; Thalassa 6-8 days for the riverside-deck Friday-Sunday tables. Anjuna Wednesday Flea Market 5km south, 10 minutes by scooter; Saturday Night Market at Arpora 6km, 12 minutes. The 4km riverside walking road from the church to the bridge is the village''s spine — quiet by Goa-coast standards.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 3, 4, 'go',
  'Last cool window. 23-32C. Hotel rates slide 20 percent. Holi week mid-month traffic spike.',
  'March extends February''s weather. Hotel rates slide 20 percent. Holi week (variable date) brings Friday-Tuesday surge. Last comfortable river-walk-and-church month before April humidity.',
  NULL,
  'March in Siolim is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last week. The 4km riverside road from Our Lady of Mt Carmel church to the Siolim-Chopdem Bridge walks at year-best in cool early mornings; afternoons start to heat up by month-end. Holi week (variable date, mid-March most years) brings a Friday-Tuesday spike from Mumbai-Pune-Bangalore drive traffic. Outside Holi week, hotel rates slide 20 percent: Vivenda Dos Palhacos at ₹13-15k from February''s ₹17k; The Postcard Siolim House at ₹7-8k; Nilaya Hermitage at ₹9-11k. Hosa drops booking lead from 5-7 days to 3-4. Thalassa Friday-Sunday riverside-deck tables drop to 4-5 day lead. Saturday Night Market at Arpora runs through April 30. Last comfortable evening-on-the-river-deck window before April humidity collapses outdoor evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 4, 3, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. River-walk and church-tour collapse mid-day.',
  'April still works for evening-and-pool weekenders prioritising river-deck dinners and AC accommodation. Hotel rates drop 30 percent. Hosa and Thalassa hold full hours. Riverside walks viable only 7-9am and 5-6:30pm.',
  'April pushes Siolim into pre-monsoon heat. Riverside walk uncomfortable mid-day, river-deck dinners only viable past 7pm. Wait for late October.',
  'April in Siolim narrows to evenings on the river deck. Daytime 26-34C, humidity at 75 percent, the Chapora River runs warm and the riverside road radiates afternoon heat. The 1630 church visit and 4km walk to the Siolim-Chopdem Bridge work only 7-9am and 5-6:30pm. Thalassa''s riverside-deck tables hold the village''s strongest evening draw — bookings still want 2-3 day lead. Hosa drops to 1-2 day booking lead. Vivenda Dos Palhacos walks-in at ₹10-12k from February''s ₹17k peak; The Postcard Siolim House at ₹5-6k; Siolim House at ₹4-5k. Friday-Sunday Mumbai-Pune-Bangalore drive traffic continues; weekday occupancy under 40 percent. Saturday Night Market at Arpora still runs through April 30. The trip works for AC-strong room, river-deck-dinner, pool-day shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 5, 2, 'wait',
  'Peak heat. 26-35C, humidity 80 percent. Pre-monsoon thunder weeks 3-4. May 1 church novena starts.',
  'May is the closing month before monsoon. Pre-monsoon thunder hits last 10 days. May 1 starts the 24-day novena leading to the August 15 church feast. Hotel rates at year-low.',
  'May runs hot and sticky. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Outdoor river-deck dinners get rain-interrupted. Push to October — or wait for São João June 24.',
  'May in Siolim is the closing month before the southwest monsoon. Daytime 27-35C, humidity 80 percent. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. The 1630 Our Lady of Mt Carmel church starts its 24-day novena around May 1 leading to the August 15 feast — Friday-Sunday evening masses fill, but the 7pm timing slot collides with thunderstorm windows in the last fortnight. Hosa and Thalassa hold open year-round but evening river-deck bookings shift to 5-6:30pm to clear before the storm window. Vivenda Dos Palhacos at ₹8-10k from February''s ₹17k; Siolim House at ₹3-4k; Nilaya Hermitage at ₹5-7k. Friday-Sunday weekend Mumbai-Pune occupancy at 50 percent. The trip Siolim sells — heritage-villa, river-deck dining, church-and-bridge walks — winds down through May. Push to October — or wait six weeks for São João.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 6, 4, 'wait',
  'São João June 24. SW monsoon proper but THE Siolim event of the year. 175-year-old boat float, well-jumping.',
  'June is the rare monsoon month worth visiting Siolim — São João (June 24, feast of John the Baptist) is the village''s 175-year-old signature event. Goa-wide festival but Siolim is the recognised epicentre. Boat float on the Chapora, kopels (flower crowns), well-jumping.',
  'Outside São João week (June 22-26), June is monsoon Goa proper — 700-800mm of rain, sea closed, all coastal shacks dismantled. Hosa and Thalassa hold lighter hours. Trip works only for the festival itself.',
  'June in Siolim is the rare monsoon month worth the trip — the only Goa coastal destination with a calendar reason to come now. São João (June 24, feast of John the Baptist) is Goa''s 175-year-old water-festival signature event and Siolim is the recognised epicentre. The village fields a 100-boat float parade on the Chapora River from the Siolim-Chopdem ferry point at 11am, men wear kopels (palm-and-flower crowns), and the well-jumping tradition runs through the morning. Goa Tourism organises the central event but it is genuinely village-led. Accommodation around the river belt sells out 6-8 weeks ahead for June 22-26; Vivenda Dos Palhacos, The Postcard Siolim House and Siolim House all hit walk-in rates 50 percent above the rest of June. Outside São João, June is monsoon Goa — 700-800mm rain, sea closed, coastal shacks dismantled. Book before April if dates lock.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach Goa unusable. Skip.',
  NULL,
  NULL,
  'July in Siolim is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. The southwest monsoon is at peak through the month — 4-12 hour sustained downpours, 30-60km/h onshore winds. The Chapora River runs full and brown; riverside walks get muddy. Thalassa''s riverside-deck closes during the worst-rain weeks; Hosa shifts to indoor-only seating. Coastal Goa 5km west (Anjuna, Vagator, Mandrem, Morjim) all closed for swimming with shacks dismantled. Vivenda Dos Palhacos at ₹8-10k from peak ₹17k; The Postcard Siolim House at ₹4-5k; Siolim House at ₹3-4k. Mumbai-Pune cheap-monsoon-weekend traffic keeps Friday-Sunday occupancy at 40-50 percent but the trip Siolim sells outside São João — heritage walk, river dinner, church-and-bridge — runs at 25 percent of peak capacity. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 8, 1, 'skip',
  'Monsoon eases late-month. 24-29C, 500-700mm rain. Aug 15 is church feast peak. Skip otherwise.',
  NULL,
  'August holds July''s pattern with marginally fewer extreme-rain days. August 15 is the Our Lady of Mt Carmel feast — the church draws 3,000-5,000 worshippers — but the trip otherwise is closed. Wait for October.',
  'August in Siolim is more of July with the worst of the southwest current beginning to ease in the final week. Rainfall 500-700mm across 22-24 wet days. The August 15 feast of Our Lady of Mt Carmel — the 1630 church''s annual peak — draws 3,000-5,000 worshippers from across north Goa for the morning mass and afternoon procession; the village fills with extended-family pilgrims through the day. Outside the August 15 window, the trip is closed: coastal beach Goa unusable, riverside walks muddy, Thalassa riverside-deck rain-interrupted. Ganesh Chaturthi (variable date late August or early September) shuts much of Hindu Goa for 5-11 days. Hosa and Thalassa on lighter hours. Hotel rates at year-low. The trip works only for the August 15 feast pilgrimage. Push to October for the secular Siolim trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 9, 3, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Hosa and Thalassa back to full hours by mid-month.',
  'September is the recovery month. SW monsoon retreats through second half. Hosa and Thalassa back to full evening rhythm by mid-month. Beach Goa 5km west still rebuilding. Hotel rates 40-50 percent below peak.',
  'Beach Goa still rough through first three weeks of September. Coastal shacks rebuilding for Oct 1 reopen. Inland Siolim trip works.',
  'September in Siolim is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from the Konkan coast around September 25-30. Hosa and Thalassa back to full evening rhythm by mid-month — Thalassa''s riverside-deck reopens once the storm window clears. The Chapora River drops to normal flow by late month. Coastal Goa 5km west (Anjuna, Vagator, Morjim) still rough through first three weeks; shacks rebuilding for October 1 statutory opening. Vivenda Dos Palhacos walks-in at ₹10-13k; The Postcard Siolim House at ₹5-6.5k; Siolim House at ₹4-5k. Saturday Night Market at Arpora still suspended till early November. Hosa booking lead returns to 2-3 days; Thalassa to 3-4 days for riverside-deck. The smart traveler''s call is to wait for late September to mid-October — full village reopened, off-peak rates, beach Goa nearby rebuilding.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, 100-150mm late spillover. Coastal shacks rebuilt 5km west. Hotel rates 30-35 percent below December peak.',
  'October is the season-opener. Coastal Goa 5km west (Anjuna, Vagator, Morjim) at full rebuild from October 1; Hosa and Thalassa at full booking lead 3-4 days. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Siolim is the proper return. Coastal Goa 5km west — Anjuna, Vagator, Morjim shacks all open from October 1 statutory date. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days) but sea state stabilises by October 10-12. Daytime 25-31C, humidity falling 80 to 70 percent. The Chapora River runs at low-tide normal. Hosa and Thalassa at full booking lead 3-4 days; Thalassa''s riverside-deck Friday-Sunday tables back to 4-5 day lead. The 4km riverside walk from the 1630 church to Siolim-Chopdem Bridge dries to firm walking. Saturday Night Market at Arpora resumes around November 1. Hotel rates run 30-35 percent below December peak: Vivenda Dos Palhacos at ₹12-14k from December peak ₹17-18k; The Postcard Siolim House at ₹7-8k; Siolim House at ₹5-6k. Strong-value window — full village minus December rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 11, 5, 'go',
  'Peak builds. 22-30C, rainfall under 30mm. Hosa booking 4-5 days. Thalassa river-deck 5-6 days.',
  'November is the proper pivot to peak season. Rainfall under 30mm, Hosa booking lead 4-5 days, Thalassa river-deck booking lead 5-6 days, Saturday Night Market at Arpora resumed.',
  NULL,
  'November in Siolim is the year''s second-peak month behind January. Rainfall under 30mm, daytime 22-30C, humidity dropping below 70 percent. Hosa booking lead climbs to 4-5 days; Thalassa Friday-Sunday riverside-deck tables to 5-6 days. Saturday Night Market at Arpora resumes around November 1 (6km from Siolim, 12 minutes by scooter); Wednesday Flea Market at Anjuna 5km south at full attendance from November 15. Vivenda Dos Palhacos walks-in at ₹15-17k from December peak ₹17-18k; The Postcard Siolim House at ₹8-9k; Siolim House at ₹6-7k; Nilaya Hermitage at ₹11-13k. Christmas-NYE rates kick in around November 25 — book accommodation before then. The 1630 church and the 4km riverside walk to the Siolim-Chopdem Bridge are at year-best walking weather. Strong call for first-time Siolim visitors — peak weather, full restaurant programme, prices still 25-30 percent below late-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('siolim', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE rates 2x. Thalassa river-deck booking 7-10 days.',
  'December is when Siolim runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2x, Thalassa river-deck booking 7-10 days, Hosa 5-7 days. Less Sunburn-spillover than Vagator-Anjuna 4km south.',
  NULL,
  'December in Siolim is the operational peak. Daytime 22-30C, nights 19-21C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb to 2x the November baseline: Vivenda Dos Palhacos at ₹17-18k peak; The Postcard Siolim House at ₹9-10k; Siolim House at ₹7-7.5k; Nilaya Hermitage at ₹13-14k. Thalassa''s riverside-deck Friday-Sunday tables booking 7-10 days for Christmas-NYE; Hosa 5-7 days. Goa Liberation Day (December 19, public holiday with Panaji parade 18km south) brings a long-weekend bump from Mumbai-Pune. The 1630 Our Lady of Mt Carmel church holds Midnight Mass on December 24 — village fills with extended families. Less Sunburn-spillover (Vagator hosts December 28-30 most years) than Anjuna-Vagator 4-5km south, since Siolim caters to a heritage-villa-and-fine-dining demographic. The first three weeks of December (before December 22) are the better-value Siolim window — peak weather, full programme, December-22 rate spike still ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
