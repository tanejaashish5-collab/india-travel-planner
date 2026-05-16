-- Bekal destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala North Malabar batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: bekal | best_months 10-3 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 1, 5, 'go',
  'Peak Malabar coast window. 22-31C, dry, sea calm. Fort photogenic, keyhole watchtower at full visibility.',
  'January is when Bekal runs at its strongest. Daytime 22-31C, the Arabian Sea calms to swimmable, and the 35-acre fort interior is comfortable mid-day. Entry ₹25, gates 8am-5:30pm, keyhole watchtower lines empty by 4pm.',
  NULL,
  'Bekal in January is the version Kerala''s northernmost-Kasaragod-district promise delivers cleanly. Daytime 22-31C, nights drop to 21C, humidity finally below 70 percent. The 1650 CE Bekal Fort (Keladi Nayaks original, captured by Tipu Sultan, taken by the British in 1799) sits on a 35-acre laterite polygon, gates open 8am-5:30pm, ticket ₹25 at the entrance counter. The keyhole watchtower view to the Arabian Sea — the Mani Ratnam Bombay (1995) ''Tu Hi Re'' shot — pulls the largest 4-5pm queues; arrive 8:30-10am for empty stone. Bekal Beach below the fort runs 1km of clean sand. Kannur Airport (CNN) 90km, Mangalore Airport (IXE) 70km, train to Kasaragod railway 16km then ₹150-200 auto. Kerala Tourism (keralatourism.org) lists the fort under Kasaragod district. Vivanta by Taj Bekal and Lalit Resort & Spa Bekal hold peak rates Dec 22-Jan 5; book post-Jan 5 for the cleanest weather plus 25-30 percent rate ease.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 2, 5, 'go',
  'Driest month. 23-32C, sea at 27C. Fort interior cool by 9am, keyhole watchtower clean of crowds Tue-Thu.',
  'February is the cleanest stretch on the Kasaragod coast. Rainfall under 10mm, humidity at 65 percent. Fort interior thermal-mass laterite holds 26-28C against 32C outside. Lalit Bekal and Vivanta drop walk-in rates 15-20 percent versus January peak.',
  NULL,
  'February in Bekal is the technical peak. Rainfall under 10mm, daytime 23-32C, sea temperature 27C — bathable conditions all month. The 35-acre Bekal Fort is at its photographic best — laterite stone holds deep oxblood colour against the dry sky, and the keyhole watchtower clears of crowds Tuesday-Thursday by 8:45am opening. Entry ₹25, ASI signage in English and Malayalam. Bekal Beach lifeguard service runs 9am-5pm. Boat-trip operators offer 30-minute rides past Bekal Hole Aqua Park (Kerala Tourism / KTDC managed) for ₹150. Vivanta by Taj Bekal walk-in drops to ₹14-22k from January''s ₹18-28k; Lalit Resort & Spa Bekal and Neeleshwar Hermitage (CGH Earth) on the Nileshwar river side run ₹12-18k. Kannur Airport (CNN) 90km via NH-66, drive 2 hours; Mangalore Airport (IXE) 70km, 1.5 hours. Strong call for first-time Bekal visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 3, 4, 'go',
  'Last comfortable window. 24-33C. Fort cool 8-11am and 4-6pm. Hotel rates 25-30 percent below February peak.',
  'March extends February''s weather minus the Christmas-NYE-overflow tax. Mornings before 11am hold up cleanly for fort circuits; the keyhole watchtower at 4-5pm catches the cleanest sea-light of the year. Walk-in rates at Vivanta and Lalit drop 25-30 percent.',
  NULL,
  'March in Bekal is the soft-landing month. Daytime 25-33C, humidity climbing toward 75 percent in the last fortnight, sea temperature 28C. The 35-acre fort interior — laterite walls, the underground tunnel to the Arabian Sea, the stable area — remains comfortable 8am-11am and 4pm-6pm; mid-day collapses past 12. Kerala Tourism (keralatourism.org) and KTDC continue full Bekal Hole Aqua Park boat operations (₹150 for 30 minutes). Bekal Beach lifeguards run 9am-5pm; sea bathing safe through the full sand stretch. Walk-in rates at Vivanta by Taj Bekal drop to ₹10-15k, Lalit Resort & Spa Bekal ₹9-13k, Neeleshwar Hermitage ₹8-12k, hotels in Kasaragod town under ₹3k. The keyhole watchtower at 4:30-5pm is the year''s cleanest light against the laterite. Last comfortable window before April pushes the trip into endurance shape — Mangalore (IXE) 70km, Kannur (CNN) 90km, Kasaragod railway 16km.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 4, 3, 'wait',
  'Pre-monsoon heat. 26-35C, humidity 75 percent. Fort interior cool but exterior collapses past 10am.',
  'April still works for travelers willing to time-shift. Vishu (April 14, Malayalam new year) is a quiet local-family observance — Kasaragod is less festival-tourist than Trivandrum or Trichur. Fort interior thermal mass holds 26-28C, but the open watchtower path collapses 11am-4pm.',
  'April delivers the first wave of Malabar pre-monsoon heat. The fort''s open laterite walking circuit and the keyhole watchtower path collapse past 10am under 26-35C and 75 percent humidity. Trip needs to compress into 6-9am and 5-7pm windows.',
  'April in Bekal is when the trip narrows to early mornings and late evenings. Daytime 27-35C, humidity 75-80 percent, sea temperature 29C — bathable but no longer cooling. The 35-acre fort interior holds at 26-28C — the underground tunnel to the sea, the stable arches, the magazine — but the open watchtower path radiates heat from 10am to 4pm. Vishu (April 14, Malayalam new year) is observed in households across Kasaragod with the kanikkonna-flower Vishukani arrangement; commercial tourist activity dips 2-3 days but the fort and Kerala Tourism boat operators run normally. Walk-in rates at Vivanta by Taj Bekal drop 30 percent versus January (₹8-12k), Lalit ₹7-10k, Neeleshwar Hermitage ₹7-11k. The smart traveler''s shape: 6-9am fort and beach, AC pool 11am-4pm, 5-7pm keyhole watchtower at the cleanest light of the day. Mangalore (IXE) 70km via NH-66, drive 1.5 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 5, 2, 'wait',
  'Peak pre-monsoon. 27-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Indoor only past 10am.',
  'May still functions for travelers committed to the time-shift trick. Last 10 days bring pre-monsoon thunderstorms — 30-90 minute evening squalls that knock grid power 1-3 hours. Fort interior remains the trip''s working anchor.',
  'May runs hot and sticky on the Malabar coast. Sea bathing past 9am is unpleasant, fort exterior walking past 10am is unworkable, the last 10 days of the month see pre-monsoon thunderstorms knock grid power. The southwest monsoon is roughly 10 days out.',
  'May in Bekal is the last chapter before the southwest monsoon arrives around June 1. Daytime 28-36C, humidity 80 percent, sea temperature 30C, the third and fourth weeks of the month bring the first arriving SW current squalls — 30-90 minute evening thunderstorms that knock grid power 1-3 hours. The 35-acre Bekal Fort remains open 8am-5:30pm at ₹25 entry, but the open laterite paths and the keyhole watchtower walk are unworkable from 10am onwards. Bekal Hole Aqua Park boat operations continue weather-permitting; lifeguards trim hours late in the month. Walk-in hotel rates run at year-low — Vivanta by Taj Bekal ₹6-9k, Lalit Resort & Spa Bekal ₹5-8k, Neeleshwar Hermitage ₹5-9k. The trip works only as an early-morning fort visit, AC-pool day, and evening sea-breeze cliff dinner. Push to mid-October if you can wait. Mangalore Airport (IXE) 70km, Kasaragod railway 16km.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 6, 1, 'skip',
  'SW monsoon arrival ~Jun 1. 24-30C, 700-900mm rainfall. Fort exterior closed slippery, sea dangerous. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Malabar coast — the first state in India to take the rain. Bekal Fort exterior pathways close on heavy-rain days (slippery laterite), the keyhole watchtower path is unsafe, sea bathing is prohibited under Kerala Tourism advisory.',
  'June in Bekal is when the southwest monsoon arrives. The current hits the Malabar coast around June 1 — Kerala is the first state in India to receive the SW monsoon — and dumps 700-900mm of rain across the month, mostly as 4-8 hour sustained downpours. Daytime 25-30C, humidity 90 percent. Bekal Fort officially remains open 8am-5:30pm at ₹25 entry, but the keyhole watchtower path and the open laterite circuit close on heavy-rain days for safety. Lifeguard service withdraws from Bekal Beach; sea bathing is prohibited under Kerala Tourism advisory. Bekal Hole Aqua Park boat operations suspend on rough-water days. Hotel rates fall to year-low — Vivanta by Taj Bekal ₹6-9k, Lalit ₹5-7k — but the trip you came for cannot happen. Mangalore Airport (IXE) 70km flights run normally; Kasaragod railway 16km, but the on-ground experience reduces to indoor pool and sheltered courtyards. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Fort exterior closed, sea forbidden. Skip.',
  NULL,
  'July is the wettest month at Bekal. Rainfall hits 900-1100mm across 26-28 wet days. Fort exterior paths shut for safety on most days, sea swimming forbidden under Kerala Tourism advisory, KTDC boat operations suspended. The trip is closed in everything but name.',
  'July in Bekal is the wettest month of the Malabar year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. Bekal Fort interior remains open at ₹25 entry but the keyhole watchtower path and the open laterite walking circuit shut on heavy-rain days for safety — most days qualify. Kerala Tourism issues a sea-state advisory: swimming is prohibited, lifeguards stay off-duty, the 1km Bekal Beach loses 20-30m of sand to the heavy surf. Bekal Hole Aqua Park boat operations are suspended through the month. Hotel rates run at year-low — Vivanta by Taj Bekal ₹5-8k, Lalit ₹4-7k, Neeleshwar Hermitage ₹5-9k offers Karkidakam-month Ayurveda packages (mid-July to mid-August) that draw a different traveler entirely. The fort-and-beach trip is closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Onam falls Aug-Sep. Fort exterior still closed slippery.',
  NULL,
  'August holds July''s pattern with marginally fewer extreme-rain days. Onam (Atham→Thiruvonam, variable date Aug-Sep) is Kerala''s biggest festival but Kasaragod district observes it more quietly than south Kerala. Bekal Fort exterior paths still close on heavy-rain days. Wait for October.',
  'August in Bekal runs the July monsoon pattern with one cultural shift. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — pookalam flower carpets, sadhya feasts, snake boat races in central Kerala — but Kasaragod''s more Tulu-influenced district observes it more quietly than Trivandrum or Trichur. Bekal Fort interior remains open 8am-5:30pm at ₹25 entry, but the keyhole watchtower path and open laterite circuit shut on heavy-rain days for safety. Bekal Hole Aqua Park boats stay suspended. Walk-in hotel rates run at year-low — Vivanta by Taj Bekal ₹5-8k, Lalit Resort & Spa Bekal ₹4-7k. Karkidakam Ayurveda packages at Neeleshwar Hermitage (CGH Earth) and Vivanta run 14-21 days, draw the medicine-tourist segment. Standard fort-and-beach trip is closed. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 9, 2, 'wait',
  'Monsoon retreating. 24-31C, 250-400mm rain. Sea still rough, fort exterior dries from third week.',
  'September is the recovery month. Monsoon withdraws from the Malabar coast around September 25-30; the fort''s open laterite paths dry within a week of the last sustained rain. Worth the wait if dates flex to the last week.',
  'Early September is still rain-heavy. The fort exterior circuit and keyhole watchtower path don''t come back online until the last week. Sea remains rough through most of the month. If your dates fall in the first fortnight, push to mid-October.',
  'September in Bekal is the recovery month. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-31C, humidity finally easing toward 80 percent. The southwest monsoon retreats from the Malabar coast around September 25-30 — IMD declares formal withdrawal — and the 35-acre fort''s open laterite circuit and keyhole watchtower path dry within a week of the last sustained rain. The full fort-and-beach trip comes back online for the last 5-7 days of the month. Kerala Tourism lifeguard service returns to Bekal Beach in the last fortnight; sea swimming caution lifts when conditions allow. KTDC and Bekal Hole Aqua Park boat operations resume mid-month. Walk-in hotel rates remain 50 percent below January peak for the first 20 days, then climb 15-20 percent in the last week. Vivanta by Taj Bekal ₹6-10k, Lalit Resort & Spa Bekal ₹5-9k. Mangalore Airport (IXE) 70km flights run full schedules; Kasaragod railway 16km from the fort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 10, 4, 'go',
  'Season opens. 24-31C, post-monsoon green, 100-200mm late rain. Fort and watchtower fully accessible.',
  'October is the proper season-opener. The Malabar dries out, fort laterite is firm, the keyhole watchtower view to a churning post-monsoon Arabian Sea is the year''s most dramatic. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Bekal is when the Malabar coast turns the corner. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the 35-acre Bekal Fort, the keyhole watchtower path, and Bekal Beach all return to full coherence by October 12-15. Daytime 25-31C, humidity falling toward 78 percent, sea temperature 28C. Kerala Tourism lifeguard service runs 9am-5pm. KTDC and Bekal Hole Aqua Park resume 30-minute boat operations at ₹150. The post-monsoon Arabian Sea churns deeper-blue against the freshly-rinsed laterite walls — the keyhole watchtower at 5pm captures the year''s most dramatic light. Walk-in hotel rates run 25-30 percent below January peak: Vivanta by Taj Bekal ₹10-15k, Lalit Resort & Spa Bekal ₹8-13k, Neeleshwar Hermitage ₹9-13k. Pack a poncho rather than an umbrella — Malabar coastal winds make umbrellas useless against the last monsoon squalls. Mangalore (IXE) 70km, Kannur (CNN) 90km, Kasaragod railway 16km.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Theyyam season opens in adjacent Kannur district. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, sea calm, fort and keyhole watchtower at full-day comfort. North Kerala Theyyam season opens in adjacent Kannur (60km south); a Bekal-Kannur 2-night combination is a strong itinerary call.',
  NULL,
  'November in Bekal is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, sea temperature 27C, humidity dropping under 70 percent. The 35-acre Bekal Fort runs at its photographic best — laterite stone deep in colour against the post-monsoon-cleaned sky, the keyhole watchtower clean of crowds till 11am. Theyyam season opens across north Malabar in mid-November (the 1,000-year-old ritual art form runs Oct-May depending on village calendars), with Parassinikkadavu Muthappan Temple (60km south, daily 5am and 5:30pm performances) the most accessible venue from Bekal. A Bekal-Kannur 2-night combination — Bekal Fort plus Theyyam — is the strongest north-Kerala itinerary call. Walk-in rates at Vivanta by Taj Bekal climb to ₹12-18k, Lalit Resort & Spa Bekal ₹10-14k, Neeleshwar Hermitage ₹11-15k — still meaningfully below December 22-January 5 peak. Bekal Hole Aqua Park (KTDC) boats run at ₹150 for 30 minutes. Kerala Tourism (keralatourism.org) lifeguards 9am-5pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bekal', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE Dec 22-Jan 5 doubles rates. Fort access tighter, queue-times longer.',
  'December is when Bekal runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees hotel rates 2-2.5x normal, Mangalore-airport-driver volumes spike, fort entrance queues form by 9:30am. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Bekal is the operational peak and the most expensive stretch of the Malabar coastal year. Daytime 22-30C, nights 21C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates run 2-2.5x the November baseline: Vivanta by Taj Bekal hits ₹22-32k versus November''s ₹15k, Lalit Resort & Spa Bekal ₹16-22k. The 35-acre Bekal Fort entrance forms queues by 9:30am, the keyhole watchtower view (the Mani Ratnam Bombay shot) sees 30-minute photographic queues at 4-5pm. KTDC Bekal Hole Aqua Park boats book out by 11am — operate 9am-5:30pm at ₹150. Bekal Beach lifeguards run extended 8am-6pm hours through Christmas week. The first three weeks of December (December 1-21) are the better-value window — peak weather minus peak chaos: rates run 30-40 percent below Christmas-NYE numbers, fort queues thin past 4:30pm. Mangalore (IXE) 70km, Kannur (CNN) 90km, Kasaragod railway 16km — book transfers 1 week ahead from December 18.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
