-- Calangute-Baga destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: calangute-baga (busiest beach strip in Goa)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 1, 5, 'go',
  'Peak Goa winter. 21-31C, dry. Strip at full chaos. Christmas-NYE gridlock eases Jan 5. Tito''s Lane runs nightly.',
  'January is when Calangute-Baga runs at peak operating volume. Daytime 21-31C, sea calm, all 100+ shacks open, Tito''s/Mambo''s/Cafe Mambo on Tito''s Lane run 9pm-3am. Christmas-NYE gridlock eases by January 5 once school holidays end. Britto''s and Souza Lobo (1932) wait 30-45 minutes lunch.',
  NULL,
  'Calangute-Baga in January is the busiest stretch of beach Goa running at full chaos. Daytime 22-31C, nights 19-21C, sea at 26C — all 100+ shacks across the 7km Calangute-Baga-Candolim strip open. Tito''s Lane (Tito''s, Mambo''s, Cafe Mambo) runs nightly 9pm-3am. Souza Lobo (since 1932, the Goan-Portuguese institution at Calangute beach end) takes no bookings — arrive by 12:30pm or 7:45pm before the 30-45 minute wait. Britto''s at Baga is the same story. Water sports — parasailing ₹1,200, jet-ski ₹800-1,000 per 15 minutes, banana boat ₹400 per head — operate 9am-5pm at the central Calangute lifeguard station. Christmas-NYE gridlock through December 22-January 5 stretches the 6km Calangute-Baga road to a 90-minute crawl on weekends; eases January 6 onwards. Taj Holiday Village (₹15-40k peak), Hyatt Centric Candolim, Pousada Tauma and Lazy Lagoon Lemon Tree (₹5-15k) hold listed walk-in rates from January 6.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 2, 5, 'go',
  'Driest month. 22-32C. Strip at full operations, traffic down from December. Carnival reaches Mapusa (8km).',
  'February is the cleanest of the strip''s peak months. Rainfall under 5mm, low humidity, weekend traffic 30-40 percent below December levels. All shacks at full hours, water sports running, Tito''s Lane in full rhythm.',
  NULL,
  'February in Calangute-Baga is the most-coherent of the peak months. Rainfall under 5mm, daytime 22-32C, humidity at 60 percent. Weekend traffic down 30-40 percent versus December — the 6km strip parks easier, Souza Lobo and Britto''s lunch waits drop to 15-20 minutes. Carnival float parade reaches Mapusa (8km, 15 minutes by scooter) on the festival Monday — closer than Panaji. Saturday Night Market at Arpora (5km, 10 minutes) runs 6pm-late. All 100+ shacks at full hours; water sports — parasailing, jet-ski, banana boat — operate 9am-5pm with consent at the central lifeguard station. Tito''s Lane runs nightly 9pm-3am with Bollywood, EDM, and commercial-house rooms separately ticketed (cover ₹1,500-2,500 weekend). Taj Holiday Village holds peak rates ₹35-40k; Pousada Tauma ₹35-40k; Hyatt Centric Candolim ₹30-35k; Lazy Lagoon Lemon Tree ₹12-15k. The 7km Calangute-Baga-Candolim continuous beach is at year-best swim conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 3, 4, 'go',
  'Last cool window. 23-33C. Hotel rates slide 20-25 percent. Holi week brings mid-month traffic spike.',
  'March extends February''s weather minus the long-stay-resident crush. Hotel rates slide 20-25 percent versus February peak. Holi (variable date, mid-month most years) brings a Friday-Tuesday traffic surge from Mumbai-Pune-Bangalore.',
  NULL,
  'March in Calangute-Baga is the soft-landing month. Daytime 24-33C, humidity climbing toward 70 percent in the last week. The 6km Calangute-Baga road parks easier — weekend wait at Souza Lobo lunch drops to 10-15 minutes. Holi week (variable date) brings a Friday-Tuesday spike from Mumbai-Pune-Bangalore drive traffic on NH48 — book accommodation at least 3 weeks ahead if dates overlap. Outside Holi week, hotel rates slide 20-25 percent versus February peak: Taj Holiday Village walks-in at ₹25-30k; Hyatt Centric Candolim at ₹22-25k; Lazy Lagoon Lemon Tree at ₹10-12k. Tito''s Lane still runs nightly. Water sports operate full hours. Saturday Night Market runs through April 30. Last comfortable beach-day month before April humidity collapses mid-day swim windows. The mid-day water-sports session at central Calangute lifeguard station gets uncomfortable from 11am-3pm in last week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 4, 3, 'wait',
  'Pre-monsoon heat. 25-35C, humidity 75 percent. Mid-day collapses but evening strip still functions.',
  'April still functions for evening-and-pool weekenders from Mumbai-Pune-Bangalore. Hotel rates drop 30 percent. Sea bathable but mid-day collapses past 10am. Tito''s Lane and Saturday Night Market still run.',
  'April pushes the strip into pre-monsoon stress. Mid-day beach activity collapses past 10am, water sports run on shorter hours, sea temperature 29C and not cooling. Wait for late October if comfort matters.',
  'April in Calangute-Baga narrows to evening-and-pool. Daytime 26-35C, humidity 75 percent, sea at 29C. The mid-day window 10am-5pm collapses under heat at the strip''s central beach; water sports operators trim to 7am-10am and 4pm-6pm slots only. The 6km strip stays drivable but evening Tito''s Lane queue energy is at year-low — international DJs done for the season. Souza Lobo and Britto''s waits drop to 5-10 minutes. Saturday Night Market still runs through April 30. Hotel rates drop 30 percent versus February: Taj Holiday Village at ₹18-22k; Hyatt Centric Candolim at ₹15-18k; Lazy Lagoon Lemon Tree at ₹7-9k. Friday-Sunday Mumbai-Pune drive traffic continues; weekday occupancy under 40 percent. Trip works for AC-strong room, evening-strip, and pool-day shape. Skip the 11am-4pm beach window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 5, 2, 'wait',
  'Peak heat. 26-36C, humidity 80 percent. Shacks dismantle May 31. Pre-monsoon thunder weeks 3-4.',
  'May is the closing month before monsoon. Shacks dismantle May 31 forest-dept rule. Saturday Night Market closed since April 30. Pre-monsoon thunder hits last 10 days. Hotel rates at year-low.',
  'May runs hot and sticky on the Konkan coast. Beach unwalkable mid-day, shacks dismantle May 31. Tito''s Lane drops to 3-night-a-week operation late month. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Calangute-Baga is the closing month before the southwest monsoon. Daytime 27-36C, humidity 80 percent, sea at 30C. Forest-department deadline closes all 100+ shacks across the strip by midnight May 31. Saturday Night Market at Arpora closed since April 30. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. Tito''s Lane drops to 3-nights-a-week operation in the last 10 days. Hotel rates at year-low: Taj Holiday Village at ₹15-18k; Hyatt Centric Candolim at ₹12-15k; Lazy Lagoon Lemon Tree at ₹6-7k. Souza Lobo and Britto''s stay open year-round but at half-pace; the year-round Goan-Portuguese kitchens at Hotel Mandovi (Panaji 12km) and Cidade de Goa hold up better. Friday-Sunday weekend Mumbai-Pune occupancy at 50-60 percent on cheap-package traffic. The trip Calangute-Baga sells — beach, shack, water sports — winds down through May. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 6, 1, 'skip',
  'SW monsoon arrives June 10. 24-30C, 700-800mm rain. Shacks closed, sea closed, water sports off. Skip.',
  NULL,
  'June dumps 700-800mm of rain on the Konkan coast. All shacks dismantled since May 31, sea swimming prohibited under Goa Tourism advisory, water sports suspended. Tito''s Lane on weekend-only operation. The trip you came for is closed.',
  'June in Calangute-Baga is when the strip stops working. The southwest monsoon arrives around June 10 and dumps 700-800mm across 22-25 wet days. All 100+ shacks dismantled since May 31. Sea swimming prohibited under Goa Tourism advisory (rip currents and undertow are genuinely dangerous, not just discouraged). Water sports — parasailing, jet-ski, banana boat — suspended for the season. Tito''s Lane scales to weekend-only (Friday-Saturday) operation; Mambo''s and Cafe Mambo close mid-month till mid-September. Souza Lobo, Britto''s, Hotel Mandovi (Panaji) stay open year-round but at 30-40 percent normal traffic. Hotel rates at year-low: Taj Holiday Village at ₹10-15k; Lazy Lagoon Lemon Tree at ₹5-6k. Mumbai-Pune cheap-monsoon-weekend packages keep Friday-Sunday occupancy at 50-60 percent but the trip the strip sells is closed. Next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Beach closed, strip dormant. Skip.',
  NULL,
  'July is the wettest month at Calangute-Baga. Rainfall hits 900-1100mm. Beach unsafe, shacks closed, water sports off. Tito''s Lane weekend-only. Wait for October.',
  'July in Calangute-Baga is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. The strip''s 7km beach loses 20-40m of sand width to surf erosion through July-August (recovery happens slowly through October). Sea swimming prohibited; lifeguards off-duty. All shacks dismantled since May 31. Water sports suspended. Tito''s Lane on weekend-only (Friday-Saturday) operation. Saturday Night Market suspended. Souza Lobo, Britto''s, Hotel Mandovi keep going; the inland Goan-Portuguese kitchens (Mum''s Kitchen and Viva Panjim in Panaji) are better positioned this month. Hotel rates at year-low: Taj Holiday Village at ₹10-12k; Hyatt Centric Candolim at ₹10-13k; Lazy Lagoon Lemon Tree at ₹5-6k. Mumbai-Pune cheap-monsoon-weekend traffic keeps occupancy at 50-60 percent Friday-Sunday but the beach trip is closed. Wait for mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 500-700mm rain. Strip dormant. Skip.',
  NULL,
  NULL,
  'August in Calangute-Baga is more of July with the worst of the southwest current beginning to ease in the final week. Rainfall 500-700mm across 22-25 wet days. Beach swimming still prohibited under advisory. All shacks dismantled. Water sports suspended. Tito''s Lane on weekend-only operation; Mambo''s remains closed. Hotel Mandovi and the inland Panaji kitchens — Confeitaria 31 de Janeiro, Hospedaria Venite, Mum''s Kitchen, Viva Panjim — pick up the Goan-Portuguese diner traffic that doesn''t fit at the strip. Bonderam (4th Saturday on Divar Island) is the real Goa monsoon draw — base in Panaji-Old Goa for it, not the strip. Ganesh Chaturthi (variable date late August or early September) shuts much of Hindu Goa for 5-11 days. Hotel rates at year-low. Skip Calangute-Baga in August. Push to October when the strip rebuilds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 9, 2, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Shacks rebuild for Oct 1 reopen. Beach still rough.',
  'September is the recovery month. SW monsoon retreats through second half, shack frames go up for October 1 statutory opening. Tito''s Lane returns to nightly operation late month. Push to mid-October.',
  'September is rebuild-not-yet-open month. Beach still rough, shacks under construction, Saturday Night Market still suspended, water sports off. Wait two-three weeks.',
  'September in Calangute-Baga is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from the Konkan coast around September 25-30. Shack-building crews from Karnataka and inland Goa start arriving September 15 to rebuild the 100+ structures along the 6km strip for the October 1 statutory opening. Beach itself still rough through the first three weeks; sand width slowly rebuilding. Tito''s Lane returns to nightly operation in the last 10 days; Mambo''s and Cafe Mambo reopen mid-month. Saturday Night Market still suspended till early November. Water sports won''t restart until October 5-10. Hotel rates climb 15-20 percent versus August lows but still 50 percent below January peak. The smart traveler''s call is to wait for the October 5-15 window — full strip reopening, calm sea, off-peak rates. September is a 3-day sample at best.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 10, 4, 'go',
  'Season opens Oct 1. 24-32C, 100-150mm late spillover. Shacks rebuilt, water sports return week two.',
  'October is the strip''s season-opener. All shacks open from October 1 statutory date, water sports return mid-month, Tito''s Lane at full nightly rhythm. Saturday Night Market resumes around November 1. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Calangute-Baga is the proper return to coherent. The October 1 statutory date opens all 100+ shacks across the 6km strip. Water sports — parasailing, jet-ski, banana boat — restart at the central lifeguard station from October 5-10 once sea state stabilises. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days). Daytime 25-32C, humidity falling 80 to 70 percent, sea at 28C. Tito''s Lane at full nightly rhythm by October 15; Mambo''s, Cafe Mambo running. Saturday Night Market at Arpora resumes around November 1. Souza Lobo and Britto''s back to full peak hours; lunch waits build to 20-30 minutes by month-end. Hotel rates run 30-35 percent below December peak: Taj Holiday Village at ₹22-26k; Hyatt Centric Candolim at ₹18-22k; Lazy Lagoon Lemon Tree at ₹9-11k. Strong-value window — full strip minus the December rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 11, 5, 'go',
  'Peak builds. 22-31C, rainfall under 30mm. Saturday Night Market resumes. Tito''s Lane at full rhythm.',
  'November is the proper pivot to peak season. Rainfall under 30mm, Saturday Night Market at Arpora running, Tito''s Lane at full international-DJ rhythm, water sports at full operating window.',
  NULL,
  'November in Calangute-Baga is the year''s second-peak month behind January. Rainfall under 30mm, daytime 23-31C, sea at 27C, humidity dropping below 70 percent. Saturday Night Market at Arpora resumes around November 1 (5km from the central strip, 10 minutes by scooter); Tito''s Lane runs at full international-DJ rhythm with Friday-Sunday cover charge ₹2,000-3,500. Water sports operate 9am-5pm at full menu: parasailing ₹1,200-1,500, jet-ski ₹800-1,000 per 15 minutes, banana boat ₹400-500 per head, ringo ₹500. Hotel rates climb to 75-80 percent of peak: Taj Holiday Village at ₹28-32k; Hyatt Centric Candolim at ₹22-26k; Lazy Lagoon Lemon Tree at ₹10-12k. Christmas-NYE rates kick in around November 25 — book accommodation before then. Souza Lobo and Britto''s rebuild to peak lunch waits 20-30 minutes; dinner reservations want 1-2 day lead. Strong call for first-time strip visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('calangute-baga', 12, 5, 'go',
  'Peak Goa. 21-30C, dry. Christmas-NYE rates 2-3x. Strip gridlocks Dec 22-Jan 5. Sunburn diaspora at Vagator pulls 80,000+.',
  'December is when Calangute-Baga runs at full chaos. Christmas-NYE (Dec 22-Jan 5) sees rates 2-3x normal, strip road in 90-minute crawl, restaurant waits 60-90 minutes. Sunburn at Vagator (5km, Dec 28-30 most years) pulls 80,000+ over three days.',
  NULL,
  'December in Calangute-Baga is the operational peak and the most-trafficked stretch of beach Goa. Daytime 22-30C, nights 19-21C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb 2-3x: Taj Holiday Village at ₹40k+; Hyatt Centric Candolim at ₹35-40k; Lazy Lagoon Lemon Tree at ₹14-15k. The 6km Calangute-Baga road crawls 90 minutes on weekend evenings. Souza Lobo and Britto''s lunch waits hit 60-90 minutes; dinner reservations want 5-7 day lead. Tito''s Lane at full Christmas-NYE rhythm with cover charges ₹3,500-5,000 weekend nights; Mambo''s tickets sold 2-3 weeks ahead online. Sunburn at Vagator (5km north, December 28-30 most years; rotates to Pune some) pulls 80,000+ over three days; accommodation 10km radius locks out by mid-November. The first three weeks of December are the better-value window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
