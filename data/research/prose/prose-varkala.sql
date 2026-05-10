-- Varkala destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala South Coast batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: varkala | best_months 10-3 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 1, 5, 'go',
  'Peak Kerala cliff window. 22-30C, dry. North Cliff strip at full shack capacity. Post-NYE rates ease Jan 5.',
  'January is when Varkala runs at its strongest. Daytime 22-30C, sea at 27C, Papanasam Beach swimmable all month. Janardanaswamy Temple full schedule. Christmas-NYE rate spike eases by January 5 — sweet-spot is Jan 6-31.',
  NULL,
  'Varkala in January is the version Kerala''s only cliff beach delivers cleanly. Daytime 22-30C, nights 21C, sea at 27C — Papanasam (Black) Beach below the cliff swimmable all month. The 15m laterite escarpment runs 1.5km along the cliff-top strip — Tibetan, Israeli, German, and yoga cafes line the promenade, distinct from the Kovalam beach-and-promontory shape (more meditative than party-anchored). Janardanaswamy Temple (the 2,000-year-old Vishnu shrine at the cliff top, dedicated to Lord Vishnu) holds Hindus-only inner-sanctum access (non-Hindus enter the outer mandapam for darshan). Papanasam Beach is sacred — Hindus believe the waters wash away sins; cremation-ash immersion ceremonies happen daily at the south end. Cliff-top yoga retreats and Ayurveda parlours run full programming. The Lost Hostels, Eden Garden, Taj Gateway Varkala, Varkala Marine Palace anchor the room market. Walk-in rates: Taj Gateway Varkala ₹8-12k, Eden Garden Ayurvedic ₹4-7k, mid-tier cliff cafes-with-rooms ₹2-4k, hostels ₹500-1500. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km — 90-minute taxi ₹1,500-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 2, 5, 'go',
  'Driest month. 23-31C, sea at 27C. North Cliff strip at full international rotation. Walk-in rates ease 15 percent.',
  'February is the cleanest weather window. Rainfall under 5mm, humidity 65 percent, North Cliff strip at peak yoga-and-Ayurveda programming. Walk-in rates ease 15 percent versus Christmas-NYE peak.',
  NULL,
  'February in Varkala is the technical peak of the Kerala cliff year. Rainfall under 5mm, daytime 23-31C, humidity at 65 percent, sea temperature 27C. The 1.5km North Cliff strip runs at peak international-rotation density — Tibetan, Israeli, German, yoga-school clientele in regular long-stay residency. The 15m laterite escarpment running parallel to Papanasam Beach holds 30+ shack-cafes plus 8-10 yoga retreats and 5-6 Ayurveda parlours. Janardanaswamy Temple (2,000-year-old Vishnu shrine) at full schedule — Shivratri (variable date late-Feb or early-Mar) is the temple''s biggest annual draw, brings 10,000-15,000 pilgrims for 24 hours. Papanasam (Black) Beach swim conditions clean; the south end runs daily cremation-ash immersion ceremonies and the Hindu pind-daan rituals — respect the spaces. Walk-in rates: Taj Gateway Varkala ₹7-11k, Eden Garden Ayurvedic ₹4-6k, mid-tier cliff cafes-with-rooms ₹1.5-3.5k, hostels ₹500-1500. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km — 90-minute taxi ₹1,500-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 3, 4, 'go',
  'Last cool window. 24-32C, sea at 28C. North Cliff strip clean. Hotel rates ease 25 percent versus February.',
  'March extends February''s cliff-strip programming with rising heat. Yoga retreats and cliff-top cafes hold dawn-and-dusk windows clean. Walk-in rates ease 25 percent versus February peak.',
  NULL,
  'March in Varkala is the soft-landing month before pre-monsoon humidity. Daytime 25-32C, humidity climbing to 75 percent in the last fortnight, sea temperature 28C. The 1.5km North Cliff strip works in dawn-and-dusk windows: morning yoga at 6-8am, breakfast cafes 7am-11am, mid-day shade-and-pool 11am-4pm, sunset cliff walks 5:30-7pm. Janardanaswamy Temple (2,000-year-old Vishnu shrine) holds full schedule. Papanasam (Black) Beach swim conditions still clean — the year''s last comfortable window before pre-monsoon humidity sets in. Cliff-top yoga retreats at Eden Garden Ayurvedic, Bethsaida Hermitage, Soma Beach Resort run pre-monsoon discounts of 10-15 percent versus February peak. Walk-in rates: Taj Gateway Varkala ₹5-8k, Eden Garden ₹3-5k, mid-tier cliff cafes-with-rooms ₹1.5-3k, hostels ₹400-1200. The international long-stay yoga rotation thins from mid-March as residency cycles end before the May heat. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km. Last comfortable window before April pushes the trip into endurance shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 4, 3, 'wait',
  'Pre-monsoon heat. 26-34C, humidity 75 percent. Sea bathable but cliff-walk collapses past 10am. Vishu cultural anchor.',
  'April still works for early-morning yoga plus AC pool days. Sea temperature 29C bathable. Vishu (April 14) cultural anchor. Walk-in rates 30 percent below February peak.',
  'April delivers the first wave of pre-monsoon humidity. Cliff-top walking and Papanasam Beach mid-day collapse past 9am. Yoga schedules compress to 6-9am dawn and 5-7pm sunset only.',
  'April in Varkala is when the cliff-strip trip narrows to early mornings, AC mid-days, and late evenings. Daytime 27-34C, humidity 75-80 percent, sea temperature 29C — bathable but no longer cooling. Yoga retreats compress class schedules to 6-9am and 5-7pm windows; mid-day cliff-top sun is brutal on the unshaded laterite. Vishu (April 14, Malayalam new year) is observed across Kerala with the kanikkonna-flower Vishukani household ritual; Janardanaswamy Temple runs special pre-dawn darshan, cliff-cafe restaurants stage Vishu Sadhya thalis at ₹600-1200 per banana-leaf plate. Papanasam (Black) Beach swim 6-9am, 5-7pm only. Walk-in rates drop 30 percent versus February peak: Taj Gateway Varkala ₹4-7k, Eden Garden Ayurvedic ₹2.5-4.5k, mid-tier cliff cafes-with-rooms ₹1-2.5k, hostels ₹350-1000. The international yoga long-stay rotation has largely shipped out. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km via NH-66, 90-minute taxi ₹1,500-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 5, 2, 'wait',
  'Peak pre-monsoon. 27-35C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Cliff erosion concerns build.',
  'May still functions for pool-and-AC weekenders. Last 10 days bring evening thunderstorms, cliff-edge erosion concerns rise as the SW monsoon nears. Walk-in rates at year-low.',
  'May runs hot and sticky on the Kerala coast. Cliff-top walks past 8am unworkable, Papanasam Beach 30C bathable but uncomfortable, pre-monsoon thunderstorms last 10 days. Cliff erosion concerns rise — the 15m laterite escarpment loses 0.5-1m per year on average, accelerating in monsoon.',
  'May in Varkala is the last month before the southwest monsoon arrives around June 1. Daytime 28-35C, humidity 80 percent, sea temperature 30C, the third week brings pre-monsoon thunderstorms — 30-90 minute evening squalls that knock grid power 1-3 hours. Cliff-top walks compress to 6-8am and 6-7pm only. The 15m laterite cliff erosion is a real concern — the escarpment loses 0.5-1m per year on average and accelerates through monsoon. Cliff-edge cafes and yoga shalas pull back from the unstable lip. Janardanaswamy Temple (2,000-year-old Vishnu shrine) runs full schedule but pilgrim numbers thin to a fraction of February peak. Walk-in rates run year-low: Taj Gateway Varkala ₹3-5k, Eden Garden Ayurvedic ₹2-3.5k, mid-tier cliff cafes-with-rooms ₹800-1.8k, hostels ₹300-800. Karkidakam Ayurveda month begins mid-July — Eden Garden, Bethsaida Hermitage, Soma Beach Resort start drawing the medicine-tourism segment. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km. Push to mid-October if dates flex.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 6, 1, 'skip',
  'SW monsoon. 24-29C, 700-900mm rainfall. Cliff erosion danger zone, sea forbidden, shacks shut. Skip.',
  NULL,
  'June is when the southwest monsoon hits Kerala. Papanasam Beach forbidden, cliff erosion danger zone (laterite escarpment loses 0.5-1m per year, monsoon-accelerated), shack-cafes shut, yoga retreats closed for season.',
  'June in Varkala is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days. Daytime 25-29C, humidity 90 percent. Papanasam (Black) Beach unsafe — Kerala Tourism issues a sea-state advisory, lifeguards withdraw, sea bathing prohibited. The 15m laterite cliff erosion accelerates dangerously through monsoon — the cliff-edge cafe strip pulls back 1-2m, and several cafes have permanently retreated 5-10m over the past decade as sections of the laterite face have collapsed into the surf. Most North Cliff shacks shut for the season. Yoga retreats close. Janardanaswamy Temple (2,000-year-old Vishnu shrine) runs reduced schedule — pilgrim traffic at year-low. Walk-in rates run year-low: Taj Gateway Varkala ₹3-5k, Eden Garden Ayurvedic ₹2-3.5k, mid-tier cliff cafes-with-rooms ₹800-1.5k, hostels ₹300-800. Karkidakam Ayurveda packages start drawing a different traveler. The standard cliff-strip trip is closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Karkidakam Ayurveda month for different traveler. Skip beach.',
  NULL,
  'July is the wettest month at Varkala. Beach forbidden, cliff erosion zone, shacks shut. Karkidakam (mid-July to mid-August) Ayurveda month is peak medicine-tourism season — different trip entirely. Standard cliff trip skip.',
  'July in Varkala is the wettest month of the Kerala year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. Papanasam (Black) Beach unsafe — Kerala Tourism advisory holds, lifeguards stay off-duty, North Cliff shacks almost all closed, yoga retreats shuttered. The 15m laterite cliff erosion is at peak danger — the SW monsoon current cuts at the escarpment base, 0.3-0.5m of cliff face can collapse per heavy-rain day. Janardanaswamy Temple (2,000-year-old Vishnu shrine) runs reduced schedule. Karkidakam (mid-July to mid-August in the Malayalam calendar) is the traditional Ayurveda month — open pores absorb medicated oils best in monsoon humidity. Eden Garden Ayurvedic, Bethsaida Hermitage, Soma Beach Resort run 14-21 day Karkidaka Chikitsa packages: ₹35-70k inclusive (treatment + accommodation + diet) versus ₹55-120k peak-season. A different traveler entirely. Standard cliff trip closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Onam Aug-Sep but Varkala is a beach destination, not Onam-anchored.',
  NULL,
  'August holds the July rain pattern. Beach unsafe, cliff erosion zone, shacks shut. Onam (variable Aug-Sep) brings programming but Varkala is not Onam-anchored. Wait for late October.',
  'August in Varkala runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — but Varkala is a beach-and-cliff destination, not an Onam-anchored cultural centre. Taj Gateway Varkala, Eden Garden Ayurvedic, Bethsaida Hermitage stage Onam Sadhya thalis on Thiruvonam day at ₹600-1200 per banana-leaf plate. Janardanaswamy Temple (2,000-year-old Vishnu shrine) runs special Onam darshan windows. Papanasam (Black) Beach unsafe under Kerala Tourism advisory. Cliff erosion still at peak danger. Walk-in rates run year-low: Taj Gateway ₹3-5k, mid-tier cliff cafes-with-rooms ₹800-2k, hostels ₹300-1000. Karkidakam Ayurveda packages end mid-month. Trivandrum International (TRV) 50km. The standard cliff trip is closed. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 9, 2, 'wait',
  'Monsoon retreating. 24-30C, 250-400mm rain. Cliff erosion stabilising. Shacks rebuild. Sea calms last week.',
  'September is the recovery month. Monsoon withdraws around September 25-30, cliff erosion stabilises, shack-cafes rebuild for October 1-15 reopen. Push to mid-October if dates flex.',
  'September is rebuild-not-yet-open month at Varkala. Beach still rough through three weeks, shack-cafes under construction, cliff-edge inspection ongoing. Push to mid-October.',
  'September in Varkala is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-30C, humidity easing toward 80 percent, sea temperature 28C. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). The 15m laterite cliff stabilises after the monsoon current eases — Kerala Tourism cliff-edge safety inspections in late September verify the escarpment integrity for the next season. Papanasam (Black) Beach sand width recovers in the last fortnight; lifeguard service returns 9am-5pm by month-end. Shack-cafe rebuilding crews arrive mid-month for the North Cliff strip ready for the October 1-15 reopen window. Janardanaswamy Temple (2,000-year-old Vishnu shrine) returns to full schedule. Walk-in rates climb 15-20 percent versus August: Taj Gateway Varkala ₹4-6k, Eden Garden Ayurvedic ₹2.5-4k, mid-tier cliff cafes-with-rooms ₹1-2.5k, hostels ₹400-1200. The smart traveler''s call is to wait for October 15-31 — full shacks, calm sea, off-peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, post-monsoon, 100-200mm late rain. North Cliff strip rebuilt by mid-month.',
  'October is the proper season-opener. Shack-cafe strip rebuilds through first 15 days, sea calms by week two, walk-in rates 25-30 percent below January peak. Strong value window.',
  NULL,
  'October in Varkala is when the Kerala cliff season returns to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the 1.5km North Cliff strip rebuilds through October 1-15. Sea temperature 28C, daytime 25-31C, humidity falling toward 78 percent. Kerala Tourism lifeguard service runs 9am-5pm at Papanasam (Black) Beach. The 15m laterite cliff face — freshly cleaned by the monsoon — runs at deepest oxblood colour against the post-monsoon sky, the year''s most dramatic light. Janardanaswamy Temple (2,000-year-old Vishnu shrine) at full schedule. Cliff-top yoga retreats and Ayurveda parlours — Eden Garden, Bethsaida Hermitage, Soma Beach Resort — return to full programming by October 10. The international yoga long-stay rotation begins arriving for the new season. Walk-in hotel rates run 25-30 percent below January peak: Taj Gateway Varkala ₹6-9k, Eden Garden Ayurvedic ₹3-5k, mid-tier cliff cafes-with-rooms ₹1.5-3k, hostels ₹400-1200. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km via NH-66.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 11, 5, 'go',
  'Peak builds. 22-30C, dry. North Cliff strip at full capacity. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, sea calm at 27C, North Cliff strip at full international rotation. Hotel rates 20 percent below December peak.',
  NULL,
  'November in Varkala is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, sea temperature 27C, humidity dropping under 70 percent. The 1.5km North Cliff strip at full international-rotation density — Tibetan, Israeli, German, yoga-school clientele in regular long-stay residency. Janardanaswamy Temple (2,000-year-old Vishnu shrine) at full schedule. Papanasam (Black) Beach swim conditions clean; the south end runs daily cremation-ash immersion ceremonies and Hindu pind-daan rituals — respect the spaces. Cliff-top yoga retreats — Eden Garden, Bethsaida Hermitage, Soma Beach Resort, plus 8-10 smaller yoga shalas — at peak programming density. Cafe del Mar, Tibet Coffee Shop, Cafe Italia all run 7am-11pm. Walk-in rates: Taj Gateway Varkala ₹7-11k, Eden Garden Ayurvedic ₹4-6k, mid-tier cliff cafes-with-rooms ₹2-4k, hostels ₹500-1500 — still meaningfully below December 22-January 5 peak. Train station 3km from cliff (auto ₹100), Trivandrum International (TRV) 50km via NH-66, 90-minute taxi.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('varkala', 12, 5, 'go',
  'Peak season. 21-30C, sea at 27C. Christmas-NYE Dec 22-Jan 5 rates double. Cliff-strip gridlock weekends.',
  'December is when Varkala runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees rates 2-2.5x normal and weekend traffic gridlocks the cliff-strip. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Varkala is the operational peak and the most expensive stretch of the Kerala cliff year. Daytime 22-30C, nights 21C, rainfall under 30mm, sea temperature 27C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-2.5x the November baseline: Taj Gateway Varkala hits ₹15-22k versus November''s ₹7-11k, Eden Garden Ayurvedic ₹8-13k, mid-tier cliff cafes-with-rooms ₹4-7k, hostels ₹1.5-3k. The cliff-strip auto-rickshaw approach gridlocks weekends from 11am to 5pm. Yoga retreats want bookings 4-6 weeks ahead through Christmas. Janardanaswamy Temple (2,000-year-old Vishnu shrine) at peak pilgrim attendance. Papanasam (Black) Beach lifeguards run extended 8am-6pm hours through Christmas week. The first three weeks of December (December 1-21) are the better-value window — peak weather, peak yoga programming, rates 30-40 percent below Christmas-NYE numbers: Taj Gateway ₹8-12k, Eden Garden ₹5-7k, mid-tier ₹2.5-4k. Train station 3km from cliff (auto ₹100, gridlocks weekends), Trivandrum International (TRV) 50km — book transfers 5 days ahead through Christmas week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
