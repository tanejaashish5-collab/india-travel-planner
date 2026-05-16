-- Candolim destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: candolim (resort spine, calmer than Calangute-Baga, Fort Aguada at south end)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 1, 5, 'go',
  'Peak Goa winter. 21-30C, dry. Calmer than Calangute. Bomras (5th in CNT 2024 top 50) booking 5-7 days out.',
  'January is when Candolim runs at peak operating volume — calmer than Calangute-Baga 2km north, more family-and-older-traveler oriented. Sea at 26C and lifeguarded at the Aguada-end. Bomra''s (5th-ranked in Conde Nast Traveller / Zomato 2024 top-50 India list) wants 5-7 day booking lead. Stone House live blues nightly.',
  NULL,
  'Candolim in January is the resort-spine version of north-Goa peak — calmer than Calangute-Baga 2km north, more family-and-older-traveler tilted. Daytime 22-30C, nights 19-21C, sea at 26C and lifeguarded at the Fort Aguada south end. The 4km Sinquerim-to-Calangute strip holds 50-odd shacks at full hours. Bomra''s — Sneh Hede''s Burmese-modern dining room, ranked 5th in Conde Nast Traveller and Zomato''s 2024 top-50 India list — wants 5-7 day booking lead; dinner-only 7-11pm except Tuesday. The Stone House (live blues nightly 9pm-late, since the 1980s) is the Candolim institution; walk-in works most nights but Friday-Saturday wants 1-2 day call-ahead. Pousada by The Beach is the lower-cost spot; Republic of Noodles at Lemon Tree is the indoor pan-Asian option. Taj Exotica (₹25-45k) at Fort Aguada anchors; Candolim Beach Resort (₹8-15k), Pousada Tauma (₹4-7k) and Manna Courtyard (₹6-12k) round it out.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 2, 5, 'go',
  'Driest month. 22-31C. Fort Aguada (1612) at the south end. Carnival reaches Mapusa (8km) Monday parade.',
  'February is Candolim''s cleanest stretch. Rainfall under 5mm, low humidity, weekend traffic 30 percent below December levels. Fort Aguada (1612 Portuguese fort, free entry, 8am-5pm) at the south end is at peak walking weather. Bomra''s booking lead 5-7 days.',
  NULL,
  'February in Candolim is the most-coherent of the peak months. Rainfall under 5mm, daytime 23-31C, humidity at 60 percent. Weekend traffic down 30 percent versus December — the resort-spine road parks easier, Bomra''s and Stone House dinner reservations come through with 4-5 day lead instead of 7. Fort Aguada (1612 Portuguese coastal fort, free entry, 8am-5pm, 4km lighthouse-and-rampart loop) at the south end of Candolim is at year-best walking weather; arrive 8am or 4pm to avoid the 11am-3pm tour-bus window. Carnival float parade reaches Mapusa (8km, 15 minutes by scooter) on the festival Monday. Saturday Night Market at Arpora (5km, 10 minutes) runs 6pm-late. Hotel rates at peak: Taj Exotica ₹40-45k, Candolim Beach Resort ₹13-15k, Manna Courtyard ₹10-12k. The 4km Sinquerim-to-Calangute beach is at year-best swim conditions; lifeguards at Sinquerim, central Candolim, and Calangute-boundary stations.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 3, 4, 'go',
  'Last cool window. 23-32C. Hotel rates slide 20 percent. Holi week brings mid-month traffic spike.',
  'March extends February''s weather. Hotel rates slide 20 percent versus February peak. Holi week (variable date) brings a Friday-Tuesday traffic surge. Last comfortable Fort Aguada walk-the-ramparts month before April humidity.',
  NULL,
  'March in Candolim is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last week. The 4km Sinquerim-Candolim strip parks easier — weekend wait at Stone House drops to walk-in viable. Holi week (variable date, mid-March most years) brings a Friday-Tuesday spike from Mumbai-Pune-Bangalore drive traffic. Outside Holi week, hotel rates slide 20 percent versus February peak: Taj Exotica walks-in at ₹30-35k; Candolim Beach Resort at ₹10-12k; Manna Courtyard at ₹8-9k. Bomra''s booking lead drops to 3-4 days. Fort Aguada (1612 Portuguese coastal fort) walks comfortably mornings before 10am and evenings after 4pm — the rampart loop gets uncomfortable mid-day in the last week. Saturday Night Market at Arpora runs through April 30. Last comfortable beach-day month before April humidity collapses the 11am-4pm swim window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 4, 3, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Fort Aguada walk collapses mid-day.',
  'April still functions for evening-and-pool weekenders. Hotel rates drop 30 percent. Sea bathable but mid-day collapses past 10am. Stone House live blues still runs nightly. Fort Aguada walk only viable 7-9am or 5-6:30pm.',
  'April pushes Candolim into pre-monsoon stress. Mid-day beach activity collapses past 10am, Fort Aguada walk uncomfortable mid-day, sea at 29C and not cooling. Wait for late October if comfort matters.',
  'April in Candolim narrows to evening-and-pool. Daytime 26-34C, humidity 75 percent, sea at 29C. The mid-day window 10am-4pm collapses under heat — the rampart loop at Fort Aguada gets uncomfortable past 10am, beach activity past 11am. Stone House holds nightly live-blues; Bomra''s drops booking lead to 1-2 days. Republic of Noodles, Pousada by The Beach maintain full hours. Taj Exotica walks-in at ₹22-28k; Candolim Beach Resort at ₹6-8k; Pousada Tauma at ₹3-4k. Friday-Sunday Mumbai-Pune drive traffic still flows; weekday occupancy under 40 percent. The Sinquerim-end of the beach (closer to Fort Aguada, more lifeguarded shade-tree cover) runs cooler than central Candolim. Saturday Night Market still runs through April 30. Trip works for AC-strong room, evening-strip, and pool-day shape. Skip the 11am-4pm beach window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 5, 2, 'wait',
  'Peak heat. 26-35C, humidity 80 percent. Shacks dismantle May 31. Pre-monsoon thunder weeks 3-4.',
  'May is the closing month before monsoon. Shacks dismantle May 31. Stone House drops to weekend-only live music. Pre-monsoon thunder hits last 10 days. Hotel rates at year-low.',
  'May runs hot and sticky. Beach unwalkable mid-day, shacks dismantle May 31. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Candolim is the closing month before the southwest monsoon. Daytime 27-35C, humidity 80 percent, sea at 30C. Forest-department deadline closes all 50-odd shacks across the 4km strip by midnight May 31. Stone House drops to weekend-only live music in the last 10 days. Saturday Night Market closed since April 30. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. Bomra''s closes May 25 to early August. Hotel rates at year-low: Taj Exotica at ₹15-18k; Candolim Beach Resort at ₹6-7k; Pousada Tauma at ₹2.5-3k; Manna Courtyard at ₹4.5-5k. Fort Aguada (1612 Portuguese fort) stays open year-round but the rampart loop only walks before 9am or after 5pm. Friday-Sunday weekend Mumbai-Pune occupancy at 50-60 percent on cheap-package traffic; weekday occupancy under 30 percent. The trip Candolim sells — beach, family-resort, Stone House blues, Bomra''s dinner — winds down through May. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 6, 1, 'skip',
  'SW monsoon arrives. 24-30C, 700-800mm rain. Shacks closed, sea closed. Skip.',
  NULL,
  'June dumps 700-800mm of rain on the Konkan coast. All shacks dismantled, sea swimming prohibited, water sports off. Bomra''s closed till mid-August. The trip you came for is closed. Wait for October.',
  'June in Candolim is when the strip stops working. The southwest monsoon arrives around June 10 and dumps 700-800mm across 22-25 wet days. All shacks dismantled since May 31. Sea swimming prohibited under Goa Tourism advisory. Water sports suspended. Stone House on weekend-only operation; many of the live-blues musicians ship to Mumbai or Bangalore for monsoon. Bomra''s closed May 25 to mid-August. Republic of Noodles holds; Pousada by The Beach drops to lunch-only. Taj Exotica stays open year-round at ₹12-18k from a peak of ₹40k+; Candolim Beach Resort at ₹5-6k. Fort Aguada walks remain technically open but the rampart loop floods on heaviest-rain days. Mumbai-Pune cheap-monsoon-weekend traffic keeps Friday-Sunday occupancy at 50-60 percent but the trip the strip sells is closed. Next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach closed. Skip.',
  NULL,
  NULL,
  'July in Candolim is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. The 4km strip''s sand width loses 20-30m to surf erosion through July-August (recovery happens slowly through October). Sea swimming prohibited; lifeguards off-duty. All shacks dismantled. Water sports suspended for the season. Stone House on weekend-only (Friday-Saturday) operation. Bomra''s closed May 25 to mid-August. Republic of Noodles holds. Taj Exotica stays open year-round but on light-staff. Hotel rates at year-low: Taj Exotica at ₹12-15k; Candolim Beach Resort at ₹5-6k. Fort Aguada rampart loop technically open but flood-prone. Mumbai-Pune cheap-monsoon-weekend traffic keeps Friday-Sunday occupancy at 50-60 percent but the beach trip is closed. Wait for mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 8, 2, 'wait',
  'Monsoon eases late-month. 24-29C, 500-700mm rain. Bomras reopens around Aug 15.',
  'August sees the strip start to rebuild. Bomras reopens around August 15. Hotel rates 60 percent below peak. Beach still closed for swimming.',
  'August still drops 500-700mm of rain. Beach still under swimming advisory. Stone House on weekend-only. Inland-only trip if you can''t wait.',
  'August in Candolim is when the resort spine starts coming back to life. Bomra''s reopens around August 15 after its 80-day monsoon shutdown. Rainfall still 500-700mm across 22-24 wet days; daytime 24-29C, humidity 85 percent. Sea swimming still prohibited under advisory. All shacks remain dismantled. Stone House on weekend-only operation; full nightly rhythm returns only October. Republic of Noodles, Pousada by The Beach hold normal hours. Taj Exotica at ₹15-20k; Candolim Beach Resort at ₹5-6k; Manna Courtyard at ₹4-5k. Fort Aguada rampart loop walks fine on dry windows. Ganesh Chaturthi (variable date late August or early September) shuts much of Hindu Goa for 5-11 days but coastal Candolim is largely unaffected — most operations Catholic-run. Trip works for AC-pool-restaurant shape if Bomra''s and Stone House are the goal; otherwise wait.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 9, 3, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Restaurant village fully open by mid-Sep. Beach still rebuilding.',
  'September is the recovery month. SW monsoon retreats through second half. Bomra''s and Stone House at full rhythm by mid-month. Beach still rough through first three weeks. Hotel rates 40-50 percent below peak.',
  'Beach still rough first three weeks of September. Shacks rebuilding for Oct 1 reopen, water sports off. Inland Bomra''s-and-Stone-House trip works.',
  'September in Candolim is the trickle back to coherent. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from the Konkan coast around September 25-30. Restaurant rhythm fully back by mid-month — Bomra''s, Stone House, Republic of Noodles all running normal hours. Stone House live-blues musicians return from monsoon migration in the last 10 days. Beach still rough through the first three weeks; sand width slowly rebuilding. All shacks under construction for October 1 statutory opening. Water sports won''t restart until October 5-10. Hotel rates climb 15-20 percent versus August lows: Taj Exotica at ₹18-25k; Candolim Beach Resort at ₹6-8k; Manna Courtyard at ₹5-6k. The smart traveler''s call is to wait for the September 25 to October 15 window — restaurant village fully open, beach rebuilding, off-peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, 100-150mm late spillover. Shacks rebuilt, water sports return week two.',
  'October is the strip''s season-opener. All shacks open from October 1, water sports return mid-month, Stone House live blues at full nightly rhythm. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Candolim is the proper return. The October 1 statutory date opens all 50-odd shacks across the 4km strip. Water sports — parasailing, jet-ski, banana boat — restart at the central lifeguard station from October 5-10. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days). Daytime 25-31C, humidity falling 80 to 70 percent, sea at 28C. Stone House at full nightly rhythm by October 15; live-blues regulars back from monsoon migration. Bomra''s booking lead climbs from 1-2 days early-October to 3-4 days late-October. Republic of Noodles, Pousada by The Beach at peak hours. Saturday Night Market at Arpora resumes around November 1. Hotel rates run 30-35 percent below December peak: Taj Exotica at ₹25-30k; Candolim Beach Resort at ₹9-11k; Manna Courtyard at ₹7-8k. Strong-value window — full strip minus December rate spike. Fort Aguada rampart loop dry and walkable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 11, 5, 'go',
  'Peak builds. 22-30C, rainfall under 30mm. Bomra''s booking lead 5-7 days. Stone House at peak nightly demand.',
  'November is the proper pivot to peak season. Rainfall under 30mm, Bomra''s booking lead 5-7 days, Stone House at peak nightly demand, water sports at full operating window.',
  NULL,
  'November in Candolim is the year''s second-peak month behind January. Rainfall under 30mm, daytime 22-30C, sea at 27C, humidity dropping below 70 percent. Bomra''s booking lead climbs to 5-7 days for prime weekend tables; Stone House Friday-Saturday live-blues nights want 1-2 day call-ahead. Water sports operate 9am-5pm at full menu: parasailing ₹1,200-1,500, jet-ski ₹800-1,000 per 15 minutes. Hotel rates climb to 75-80 percent of peak: Taj Exotica at ₹32-38k; Candolim Beach Resort at ₹11-13k; Pousada Tauma at ₹6-7k; Manna Courtyard at ₹9-11k. Christmas-NYE rates kick in around November 25 — book accommodation before then. Fort Aguada rampart loop at year-best walking weather. Saturday Night Market at Arpora at full attendance. Strong call for first-time Candolim visitors — peak weather, full programme, prices still 25-30 percent below late-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('candolim', 12, 5, 'go',
  'Peak Goa. 21-30C, dry. Christmas-NYE rates 2-3x. Bomra''s booking 10-14 days. Less Sunburn-spillover than Vagator.',
  'December is when Candolim runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2-3x, Bomra''s booking lead 10-14 days, Stone House nightly sold-out. Less Sunburn-spillover than Vagator (8km north) since Candolim caters to family-and-older demographic.',
  NULL,
  'December in Candolim is the operational peak. Daytime 22-30C, nights 19-21C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb 2-3x the November baseline: Taj Exotica at ₹40-45k+; Candolim Beach Resort at ₹13-15k; Manna Courtyard at ₹11-12k; Pousada Tauma at ₹7k. Bomra''s booking lead stretches to 10-14 days for prime tables — book before December 10 if Christmas-week dates are locked. Stone House Friday-Sunday live-blues nights sold-out 1 week ahead. The 4km strip parks cleaner than Calangute-Baga 2km north — Candolim caters to family and older-traveler demographic and the Sunburn-diaspora-spillover (Vagator hosts December 28-30 most years) lands more at Anjuna-Vagator than here. Fort Aguada rampart loop draws 5,000-6,000 daily through Christmas week. Republic of Noodles, Pousada by The Beach run reservation-only past 7pm. The first three weeks of December (before December 22) are the better-value Candolim window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
