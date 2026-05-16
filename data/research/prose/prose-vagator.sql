-- Vagator destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: vagator (Big + Little Vagator beaches under red laterite cliffs, Sunburn Dec 28-30)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 1, 5, 'go',
  'Peak Konkan winter. 21-30C, dry. Cliff-bay beaches at full operations. Bean Me Up, Olive Bar, Spice Traders all booked.',
  'January is when Vagator runs at peak operating volume. Big Vagator and Little Vagator beaches under the red laterite cliffs at full shack hours; Chapora Fort headland (Dil Chahta Hai shoot location, 1717 Portuguese rebuild) draws sunset crowds. W Goa lounge nightly. Bean Me Up (pure-veg cafe), Olive Bar & Kitchen, Spice Traders all hit full booking demand.',
  NULL,
  'Vagator in January is the cliff-bay alternative to the open-coast belt. Daytime 21-30C, nights 19-21C, sea at 26C. Big Vagator and Little Vagator beaches sit under 30-50m red laterite cliffs (the iconic photographic frame); both at full shack hours. Chapora Fort on the headland (1717 Portuguese rebuild on a 1604 original, free entry, 4-7pm sunset window) draws 800-1,200 visitors daily — the Dil Chahta Hai (2001) shoot location is the popular tag. The 1km walk up from Chapora village takes 15 minutes. W Goa (₹40k+ peak, the cliff-edge lifestyle hotel) is the Vagator anchor; JW Marriott Vagator (₹15-40k) is the larger resort option. Bean Me Up (pure-vegetarian and vegan cafe near Ozran Beach, since 2009) wants 1-2 day dinner booking lead; Olive Bar & Kitchen takes weekend reservations 3-4 days ahead. Spice Traders covers casual; Chronicle near Ozran runs weekend live music.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 2, 5, 'go',
  'Driest month. 22-31C. Carnival reaches Mapusa (8km). Cliff-bay weather at year-best.',
  'February is Vagator''s cleanest weather window. Rainfall under 5mm, low humidity, cliff-bay sunset photography at year-best. Carnival float parade reaches Mapusa (8km, 15 minutes by scooter). Olive Bar & Kitchen and Bean Me Up at peak booking demand.',
  NULL,
  'February in Vagator is the technical peak. Rainfall under 5mm, daytime 23-31C, humidity at 60 percent. The 30-50m red laterite cliffs flanking Big and Little Vagator are at year-best photography window; the 5pm-6pm sunset arc catches the cliff face cleanly. Chapora Fort sunset crowd hits 1,500-2,000 daily; the 1km approach climb from Chapora village takes 15 minutes (the Sunday afternoon slot fills earlier). Carnival float parade reaches Mapusa (8km, 15 minutes by scooter) on the festival Monday. Saturday Night Market at Arpora (4km, 8 minutes by scooter) runs 6pm-late. W Goa holds peak rates ₹45-50k+; JW Marriott Vagator at ₹35-40k. Bean Me Up booking lead climbs to 3-4 days; Olive Bar & Kitchen weekend reservations to 5-6 days. Spice Traders walk-in viable except Friday-Saturday peak. Anjuna Wednesday Flea Market 1km south of Chapora — 5 minutes by scooter from Vagator''s main road. The cliff-walk from Big Vagator north to Ozran Beach is at year-best with firm laterite under foot.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 3, 4, 'go',
  'Last cool window. 23-32C. Hotel rates slide 20 percent. Holi week mid-month traffic spike.',
  'March extends February''s weather. Hotel rates slide 20 percent. Holi week (variable date) brings Friday-Tuesday surge. Last comfortable Chapora-climb-and-cliff-walk month before April humidity.',
  NULL,
  'March in Vagator is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last week. The Chapora Fort climb gets uncomfortable past 11am by month-end — early morning (8-10am) and late afternoon (4-6pm) windows hold. Holi week (variable date, mid-March most years) brings a Friday-Tuesday spike from Mumbai-Pune-Bangalore drive traffic. Outside Holi week, hotel rates slide 20 percent: W Goa walks-in at ₹35-40k from February''s ₹50k peak; JW Marriott Vagator at ₹26-30k. Bean Me Up drops booking lead from 3-4 days to 1-2; Olive Bar & Kitchen weekend bookings drop to 3-4 day lead. Spice Traders walk-in viable. Saturday Night Market at Arpora runs through April 30. The cliff-walk from Big Vagator to Ozran is still firm but warm — early morning the only comfortable window. Last comfortable beach-cliff-fort window before April humidity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 4, 3, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Chapora climb and cliff walk collapse mid-day.',
  'April still works for evening-and-pool weekenders. Hotel rates drop 30 percent. Bean Me Up, Olive Bar & Kitchen, Spice Traders hold full hours. Chapora climb and cliff walk only viable 7-9am and 5-6:30pm.',
  'April pushes Vagator into pre-monsoon heat. Mid-day beach activity collapses past 10am, Chapora climb uncomfortable mid-day. Wait for late October.',
  'April in Vagator narrows to evening-and-pool. Daytime 26-34C, humidity at 75 percent, sea at 29C. The mid-day window 10am-5pm collapses under heat — the Chapora Fort climb (the 1km laterite-step approach radiates heat) gets uncomfortable past 10am, beach activity past 11am. Bean Me Up holds full hours; Olive Bar & Kitchen drops weekend booking lead to 1-2 days; Spice Traders walk-in clean. W Goa walks-in at ₹28-32k; JW Marriott Vagator at ₹20-24k. Friday-Sunday Mumbai-Pune-Bangalore drive traffic continues; weekday occupancy under 40 percent. Saturday Night Market at Arpora still runs through April 30. Anjuna Wednesday Flea Market 1km south scaled down to 200-300 stalls. The trip works for AC-strong room, evening-cliff-bar (Olive, Chronicle), pool-day shape. Skip the 11am-4pm beach window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 5, 2, 'wait',
  'Peak heat. 26-35C, humidity 80 percent. Shacks dismantle May 31. Pre-monsoon thunder weeks 3-4.',
  'May is the closing month before monsoon. Shacks dismantle May 31. Saturday Night Market closed since April 30. Pre-monsoon thunder hits last 10 days. Hotel rates at year-low.',
  'May runs hot and sticky. Beach unwalkable mid-day, shacks dismantle May 31. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Vagator is the closing month before the southwest monsoon. Daytime 27-35C, humidity 80 percent, sea at 30C. Forest-department deadline closes all 50-odd Vagator-Chapora-Anjuna shacks by midnight May 31. Saturday Night Market at Arpora closed since April 30. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. Olive Bar & Kitchen drops to weekend-only operation by mid-month; Bean Me Up and Spice Traders hold full hours but on lighter footfall. W Goa at ₹22-28k from February''s ₹50k; JW Marriott Vagator at ₹15-18k. The cliff-walk between Big Vagator and Ozran gets dangerous on stormy afternoons — laterite and water mix is treacherous. Chapora Fort climb stays open but at 11am-4pm avoidance. Friday-Sunday weekend Mumbai-Pune occupancy at 50 percent on cheap-package traffic. The trip Vagator sells — beach, cliff, sunset, club — winds down through May. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 6, 1, 'skip',
  'SW monsoon arrives June 10. 24-30C, 700-800mm rain. Beach unusable, cliffs slick. Skip.',
  NULL,
  'June dumps 700-800mm of rain. All shacks dismantled, sea closed, cliff walks dangerous. Olive Bar closed for monsoon. The trip you came for is closed.',
  'June in Vagator is when the cliff-bay trip stops working. The southwest monsoon arrives around June 10 and dumps 700-800mm of rain across 22-25 wet days. All shacks dismantled since May 31. Big Vagator and Little Vagator beaches lose 20-30m of sand width to surf erosion through June-August. Sea swimming prohibited under Goa Tourism advisory. The cliff-walk from Big Vagator to Ozran is closed by Goa Forest Department — wet laterite is unstable and has caused rescue incidents in past Junes. Chapora Fort technically open but the 1km approach floods. Olive Bar & Kitchen closed June 1 to mid-September. Bean Me Up holds open year-round; Spice Traders shifts to indoor-only. W Goa at ₹15-20k from peak ₹50k+; JW Marriott Vagator at ₹12-15k. Mumbai-Pune cheap-monsoon-weekend traffic keeps Friday-Sunday occupancy at 50 percent but the trip the cliff-bay sells is closed. Next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach closed, cliffs closed. Skip.',
  NULL,
  NULL,
  'July in Vagator is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. Big Vagator and Little Vagator beaches lose continuing sand width to surf erosion. Sea swimming prohibited; lifeguards off-duty. All shacks dismantled. Cliff-walk from Big Vagator to Ozran closed by Goa Forest Department. Chapora Fort technically open but 1km approach floods on heaviest-rain days. Olive Bar & Kitchen closed June 1 to mid-September. Bean Me Up runs at 25-30 percent normal traffic; Spice Traders holds open. W Goa stays open year-round at ₹14-18k from peak ₹50k+. Mumbai-Pune cheap-monsoon-weekend traffic keeps Friday-Sunday occupancy at 50 percent but the cliff-bay trip is closed. Wait for mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 500-700mm rain. Beach closed. Skip.',
  NULL,
  'August holds July''s pattern with the worst easing late month. Beach inaccessible, shacks closed, cliff walks closed. Olive Bar closed till mid-September. Wait for late October.',
  'August in Vagator is more of July with the worst of the southwest current beginning to ease in the final week. Rainfall 500-700mm across 22-24 wet days. Beach swimming still prohibited under advisory. All shacks dismantled. Cliff-walk from Big Vagator to Ozran still closed by Goa Forest Department. Chapora Fort 1km approach still flood-prone. Olive Bar & Kitchen closed June 1 to mid-September. Bean Me Up and Spice Traders run at 30-40 percent normal traffic. Bonderam (4th Saturday on Divar Island) is the real Goa monsoon draw — base in Panaji-Old Goa for it, not the cliff-bay. Ganesh Chaturthi (variable date late August or early September) shuts much of Hindu Goa for 5-11 days. Hotel rates at year-low. Skip Vagator in August. Push to October when the cliff-bay rebuilds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 9, 2, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Olive Bar reopens mid-Sep. Beach still rough. Cliff walk closed first 3 weeks.',
  'September is the recovery month. SW monsoon retreats through second half. Olive Bar reopens around September 15. Beach still rough through first three weeks; cliff walk reopens late month. Push to mid-October.',
  'September is rebuild-not-yet-open month. Beach still rough, shacks under construction, cliff walk closed first three weeks. Wait two-three weeks.',
  'September in Vagator is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from the Konkan coast around September 25-30. Shack-building crews start arriving September 15 to rebuild the 50-odd Vagator-Chapora-Anjuna structures for October 1 statutory opening. Beach itself still rough through the first three weeks. Olive Bar & Kitchen reopens around September 15. Bean Me Up and Spice Traders rebuild to 60-70 percent normal traffic. Cliff-walk from Big Vagator to Ozran reopens unofficially in the last week as Forest Department clears the laterite. Chapora Fort approach dries to firm walking by month-end. W Goa at ₹16-22k; JW Marriott Vagator at ₹15-18k. Saturday Night Market at Arpora still suspended till early November. The smart traveler''s call is to wait for the October 5-15 window — full shacks, calm sea, cliff walk reopened.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, 100-150mm late spillover. Shacks rebuilt, cliff walk reopens. Hotel rates 30-35 percent below December peak.',
  'October is the cliff-bay''s season-opener. All shacks open from October 1, cliff walk fully reopened by mid-month, Chapora Fort climb dry and walkable. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Vagator is the proper return. The October 1 statutory date opens all 50-odd Vagator-Chapora-Anjuna shacks. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days) but sea state stabilises by October 10-12. Daytime 25-31C, humidity falling 80 to 70 percent, sea at 28C. Cliff-walk from Big Vagator to Ozran fully reopens by mid-month. Chapora Fort approach dry; sunset crowd rebuilds to 600-1,000 daily. Olive Bar & Kitchen at full hours by mid-October; Bean Me Up and Spice Traders at peak. Saturday Night Market at Arpora resumes around November 1. Anjuna Wednesday Flea Market relaunches around October 15 with 200-300 stalls (full 600-stall capacity by mid-November). W Goa walks-in at ₹32-38k from December peak ₹50k+; JW Marriott Vagator at ₹22-26k. Strong-value window — full cliff-bay minus December rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 11, 5, 'go',
  'Peak builds. 22-30C, rainfall under 30mm. Saturday Night Market resumes. Olive Bar booking lead 4-5 days.',
  'November is the proper pivot to peak season. Rainfall under 30mm, Saturday Night Market at Arpora running, Olive Bar weekend booking lead 4-5 days, Sunburn ticket sales open.',
  NULL,
  'November in Vagator is the year''s second-peak month behind January. Rainfall under 30mm, daytime 22-30C, sea at 27C, humidity dropping below 70 percent. Saturday Night Market at Arpora resumes around November 1; Anjuna Wednesday Flea Market hits 600-stall full capacity by November 15. Olive Bar & Kitchen weekend booking lead climbs to 4-5 days; Bean Me Up to 2-3 days; Spice Traders Friday-Saturday to 1-2 days. Cliff-walk from Big Vagator to Ozran at year-best walking weather. Chapora Fort sunset crowd rebuilds to 1,200-1,500 daily. W Goa at ₹38-45k peak; JW Marriott Vagator at ₹28-32k. Christmas-NYE rates kick in around November 25 — book accommodation before then. Sunburn Festival ticket sales open November (festival December 28-30 in Vagator most years; rotates to Pune some). Strong call for first-time Vagator visitors — peak weather, full programme, prices still 25-30 percent below late-December (and Sunburn-week 6-week-ahead lockout).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagator', 12, 5, 'go',
  'Peak Goa. 21-30C, dry. Sunburn Dec 28-30 pulls 80,000+ over 3 days. Hotel lockout 10km radius from Nov.',
  'December is when Vagator runs at Goa''s most concentrated peak. Sunburn Festival (December 28-30 in Vagator most years) pulls 80,000+ over three days; accommodation 10km radius locks out by mid-November. Christmas-NYE rates 3-4x normal. Chapora Fort sunset crowd 2,500+.',
  NULL,
  'December in Vagator is the operational peak and the most-concentrated chaos of the Goa coast. Daytime 22-30C, nights 19-21C, rainfall under 20mm. Sunburn (December 28-30 in Vagator most years; rotates to Pune some) pulls 80,000+ over three days at the Vagator beachfront field. Accommodation across the 10km Vagator-Anjuna-Assagao-Siolim radius locks out by mid-November for December 27-31; Sunburn package + hotel combos sell from ₹25,000-150,000+. W Goa at peak ₹50k+ for festival week (3-4 day minimum); JW Marriott Vagator at ₹38-45k. Christmas-NYE corridor (December 22 to January 5) sees rates 3-4x the November baseline. Olive Bar & Kitchen booking lead 7-10 days; Bean Me Up 4-5; Spice Traders 3-4. Chapora Fort sunset crowd hits 2,500+ Christmas day; the 1km approach gridlocks 4-7pm. The first three weeks of December are the better-value window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
