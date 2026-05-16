-- Kovalam destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala South Coast batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kovalam | best_months 11-2 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 1, 5, 'go',
  'Peak coastal Kerala. 22-30C, sea calm. Lighthouse Beach at full shack capacity. Post-NYE rates ease Jan 5.',
  'January is when Kovalam runs at its strongest. Daytime 22-30C, sea at 27C, swim conditions all month. Vizhinjam Lighthouse (1856, 142 steps) ₹50, Tue-Sun 10am-5pm. Christmas-NYE rate spike eases by January 5 — sweet-spot is Jan 6-31.',
  NULL,
  'Kovalam in January is the version Kerala''s most famous beach delivers cleanly. Daytime 22-30C, nights 21C, sea at 27C — full swim conditions across the three crescent bays. Lighthouse Beach (most built-up, the year-round backpacker scene) holds ~30 shack-restaurants on the rocky promenade, Hawa Beach (mid-tier, quieter) sits north, and Samudra Beach (least-developed, family-friendly) caps the strip. Vizhinjam Lighthouse (1856 — the 142-step climb opens Tue-Sun 10am-5pm, ₹50 entry) is the natural anchor. The Ayurveda belt — Somatheeram, Soma Ayurveda Group, Niraamaya Surya Samudra — runs full Karkidaka-and-rejuvenation programming all year but draws strongest in this window. Cliff-top German/Israeli/Tibetan cafe culture surviving in the strip — Cafe del Mar, Suprabhatham, German Bakery (Kovalam, distinct from Goa). Walk-in rates: The Leela Kovalam ₹15-22k, Niraamaya Surya Samudra ₹18-30k, Somatheeram ₹6-10k, mid-tier Lighthouse Beach properties ₹3-6k. Christmas-NYE spike eases from January 5; January 6-31 is the cleanest weather plus ease-rate window. Trivandrum International (TRV) 16km, 25-minute taxi ₹600-800 metered.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 2, 5, 'go',
  'Driest month. 23-31C, sea at 27C. Lighthouse Beach quieter Tue-Thu, Sat surge. Walk-in rates ease 15 percent.',
  'February is the cleanest weather window. Rainfall under 5mm, humidity 65 percent, sea calm. Lighthouse Beach quieter Tue-Thu — the international backpacker rotation thins mid-week. Saturdays surge with Trivandrum-city day-trippers.',
  NULL,
  'February in Kovalam is the technical peak of the Kerala beach year. Rainfall under 5mm, daytime 23-31C, humidity at 65 percent, sea temperature 27C. Lighthouse Beach (most built-up) holds ~30 shack-restaurants and 5-6 long-running Ayurveda parlours — Tue-Thu the international backpacker rotation thins to manageable, Sat sees a Trivandrum-city day-trip surge of 3,000-4,000 visitors. Hawa Beach and Samudra Beach (north of the lighthouse promontory) hold cleaner sand and quieter cafe scenes. Vizhinjam Lighthouse (1856, 142 steps, ₹50 entry, Tue-Sun 10am-5pm) at peak attendance — arrive 10am for the cleanest queue. The Ayurveda belt — Somatheeram, Soma Ayurveda Group, Niraamaya Surya Samudra — runs at peak rejuvenation-package density. Cafe del Mar, Suprabhatham, German Bakery (Kovalam) all run 7am-11pm. Walk-in rates: The Leela Kovalam ₹14-22k, Niraamaya Surya Samudra ₹16-28k, Somatheeram ₹5-9k, mid-tier Lighthouse Beach ₹3-5k. Trivandrum International (TRV) 16km — 25-minute taxi ₹600-800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 3, 4, 'go',
  'Last cool window. 24-32C, sea at 28C. Lighthouse, Hawa, Samudra all clean. Hotel rates ease 25 percent.',
  'March extends February''s coastal weather minus the rate stress. Lighthouse Beach 6:30am-9am and 5pm-7pm prime; mid-day collapses past 11am. Walk-in rates ease 25 percent versus February peak.',
  NULL,
  'March in Kovalam is the soft-landing month before pre-monsoon humidity. Daytime 25-32C, humidity climbing to 75 percent in the last fortnight, sea temperature 28C. The three-bay shape works in dawn-and-dusk windows: Lighthouse Beach swimming and shack breakfasts 6:30am-9am, mid-day shade-and-pool 11am-4pm, Hawa Beach and Samudra Beach evening walks 5-7pm. Vizhinjam Lighthouse (1856, ₹50 entry, Tue-Sun 10am-5pm) the climb is workable through the day with 3-4pm being the most comfortable. Ayurveda parlours at Somatheeram, Soma Ayurveda Group, Niraamaya Surya Samudra hold full programming — pre-monsoon massage cycles run 10-15 percent below February peak rates. Walk-in rates: The Leela Kovalam ₹11-17k, Niraamaya Surya Samudra ₹13-22k, Somatheeram ₹4-7k, mid-tier Lighthouse Beach ₹2.5-4.5k. Cafe del Mar, Suprabhatham, German Bakery (Kovalam) all run 7am-11pm. Trivandrum International (TRV) 16km via NH-66, 25-minute taxi. Last comfortable window before April pushes the trip into endurance shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 4, 3, 'wait',
  'Pre-monsoon heat. 26-34C, humidity 75 percent. Sea bathable but mid-day collapses. Vishu Apr 14 cultural anchor.',
  'April still works for early-morning beach plus AC pool days. Sea temperature 29C — bathable but not cooling. Vishu (April 14, Malayalam new year) is the only cultural anchor. Walk-in rates 30 percent below February peak.',
  'April delivers the first wave of pre-monsoon humidity. Beach mid-day collapses past 9am, lighthouse climb sweltering, sand temperatures spike past 50C by 11am. Trip works only as dawn-and-dusk shape with AC pool middle.',
  'April in Kovalam is when the trip narrows to early mornings, AC mid-days, and late evenings. Daytime 27-34C, humidity 75-80 percent, sea temperature 29C — bathable but no longer cooling. Lighthouse Beach swimming and Vizhinjam Lighthouse climb both compress to 6-9am and 5-7pm windows; mid-day sand temperatures spike past 50C. The cliff-top cafe strip — Cafe del Mar, Suprabhatham, German Bakery (Kovalam) — runs full hours but afternoons collapse to AC-only customers. Vishu (April 14, Malayalam new year) is observed across Kerala with the kanikkonna-flower Vishukani household ritual; resort restaurants stage Vishu Sadhya thalis at ₹600-1200 per banana-leaf plate. Walk-in rates drop 30 percent versus February peak: The Leela Kovalam ₹10-15k, Niraamaya Surya Samudra ₹11-18k, Somatheeram ₹3.5-6k, mid-tier Lighthouse Beach ₹2-3.5k. Trivandrum International (TRV) 16km via NH-66, 25-minute taxi ₹500-700.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 5, 2, 'wait',
  'Peak pre-monsoon. 27-35C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Sea at 30C bathable but hot.',
  'May still functions for pool-and-AC weekenders. Sea bathing past 8am unpleasant, beach unwalkable past 10am, last 10 days bring evening thunderstorms. Walk-in rates at year-low.',
  'May runs hot and sticky on the Kerala coast. Sea temperature 30C is bathable but no longer cooling, beach unwalkable past 10am, pre-monsoon thunderstorms knock grid power 1-3 hours afternoons. Wait for late October.',
  'May in Kovalam is the last month before the southwest monsoon arrives around June 1. Daytime 28-35C, humidity 80 percent, sea temperature 30C, the third week brings pre-monsoon thunderstorms — 30-90 minute evening squalls that knock grid power 1-3 hours. Lighthouse Beach swimming and Vizhinjam Lighthouse climb compress to 6-8:30am only; sand temperatures spike past 55C mid-day. Cafe del Mar, Suprabhatham, German Bakery (Kovalam) run reduced hours late-month. The cliff-top backpacker scene thins as international travelers head north or out for the season. Walk-in rates run year-low: The Leela Kovalam ₹8-12k, Niraamaya Surya Samudra ₹9-14k, Somatheeram ₹3-5k, mid-tier Lighthouse Beach ₹1.5-3k. Karkidakam Ayurveda month begins mid-July — Somatheeram and Soma Ayurveda Group start drawing the medicine-tourism segment. Trivandrum International (TRV) 16km via NH-66. Push to mid-October if dates flex — the standard beach trip is closed by month-end.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 6, 1, 'skip',
  'SW monsoon arrival. 24-29C, 700-900mm rainfall. Sea forbidden, shacks shut, lighthouse climb suspended. Skip.',
  NULL,
  'June is when the southwest monsoon hits Kerala. Sea bathing prohibited under Kerala Tourism advisory, lifeguards withdraw, shack-restaurants shut, lighthouse climb suspended on heavy-rain days. The beach trip cannot work.',
  'June in Kovalam is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days. Daytime 25-29C, humidity 90 percent. Lighthouse Beach loses 20-30m of sand width to the heavy surf; Kerala Tourism issues a sea-state advisory and lifeguards withdraw — sea bathing is prohibited, not just discouraged. The 30-shack restaurant strip on Lighthouse Beach mostly shuts for the season; only AC-indoor cliff-top cafes (German Bakery Kovalam, Cafe del Mar) hold reduced hours. Vizhinjam Lighthouse (1856, 142 steps) suspends climbs on heavy-rain days. Walk-in rates run at year-low: The Leela Kovalam ₹8-12k, Niraamaya Surya Samudra ₹8-12k, Somatheeram ₹3-5k, mid-tier Lighthouse Beach ₹1.5-2.5k. Karkidakam Ayurveda packages (mid-July to mid-August) start drawing the medicine-tourism segment. Trivandrum International (TRV) 16km flights run normal. The standard beach trip is closed in June. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Karkidakam Ayurveda month for different traveler. Skip beach.',
  NULL,
  'July is the wettest month at Kovalam. Beach forbidden, shacks shut, lighthouse closed on heavy-rain days. Karkidakam (mid-July to mid-August in Malayalam calendar) is peak Ayurveda season — different trip entirely. Standard beach trip skip.',
  'July in Kovalam is the wettest month of the Kerala year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. Lighthouse Beach unsafe — Kerala Tourism advisory holds, lifeguards stay off-duty, shack-restaurants almost all closed. Vizhinjam Lighthouse (1856) climb suspended through most of the month. Karkidakam (mid-July to mid-August in the Malayalam calendar) is the traditional Ayurveda month — open pores absorb medicated oils best in monsoon humidity. Somatheeram, Soma Ayurveda Group, Niraamaya Surya Samudra run 14-21 day Karkidaka Chikitsa packages with monsoon-season discounts: ₹40-80k inclusive (treatment + accommodation + diet) versus ₹60-150k peak-season. A different traveler entirely — the medicine-tourist who treats Kovalam''s humidity as an asset rather than obstacle. Walk-in beach-trip rates at year-low: The Leela Kovalam ₹7-11k, mid-tier Lighthouse Beach ₹1.5-2.5k. Standard beach trip closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Onam Aug-Sep but Kovalam is not Onam-anchored.',
  NULL,
  'August holds the July rain pattern. Beach unsafe, shacks shut, lighthouse climb suspended. Onam (variable Aug-Sep) brings programming but Kovalam is a beach destination, not Onam-anchored. Wait for late October.',
  'August in Kovalam runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — but Kovalam is a beach destination, not an Onam-anchored cultural centre. The Leela Kovalam, Niraamaya Surya Samudra, Somatheeram all stage Onam Sadhya thalis on Thiruvonam day at ₹800-1500 per banana-leaf plate. Lighthouse Beach unsafe under Kerala Tourism advisory; shack-restaurants almost all closed. Karkidakam Ayurveda packages end mid-month. Walk-in rates run year-low: The Leela Kovalam ₹7-11k climbing 25-30 percent for Onam week, Niraamaya Surya Samudra ₹8-12k, mid-tier Lighthouse Beach ₹1.5-3k. Trivandrum International (TRV) 16km — flights run normal. The standard beach trip is closed. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 9, 2, 'wait',
  'Monsoon retreating. 24-30C, 250-400mm rain. Beach calms by week three. Shacks rebuild.',
  'September is the recovery month. Monsoon withdraws around September 25-30, sea calms in last week, shacks rebuild for October 1-15 reopen. Push to mid-October if dates flex.',
  'September is rebuild-not-yet-open month at Kovalam. Beach still rough through three weeks, shacks under construction, lighthouse climb suspended on rain days. Push to mid-October.',
  'September in Kovalam is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-30C, humidity easing toward 80 percent, sea temperature 28C. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Lighthouse Beach sand width recovers in the last fortnight; lifeguard service returns 9am-5pm by month-end. Shack-restaurant rebuilding crews arrive mid-month to ready the 30-strong Lighthouse Beach strip for the October 1-15 reopen window. Vizhinjam Lighthouse (1856, ₹50, 142 steps, Tue-Sun 10am-5pm) returns to climb access by the third week. Walk-in rates climb 15-20 percent versus August: The Leela Kovalam ₹9-13k, Niraamaya Surya Samudra ₹10-15k, Somatheeram ₹4-6k, mid-tier Lighthouse Beach ₹2-3.5k. Trivandrum International (TRV) 16km via NH-66, 25-minute taxi. The smart traveler''s call is to wait for the October 15-31 window — full shacks, calm sea, off-peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 10, 4, 'go',
  'Season opens Oct 1. 24-31C, post-monsoon, 100-200mm late rain. Shacks rebuilt by mid-month.',
  'October is the proper season-opener. Shack-restaurant strip rebuilds through first 15 days, sea calms by week two, walk-in rates 25-30 percent below January peak. Strong value window.',
  NULL,
  'October in Kovalam is when the Kerala beach season returns to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the 30-strong Lighthouse Beach shack-restaurant strip rebuilds through October 1-15. Sea temperature 28C, daytime 25-31C, humidity falling toward 78 percent. Kerala Tourism lifeguard service runs 9am-5pm. Vizhinjam Lighthouse (1856, ₹50 entry, Tue-Sun 10am-5pm, 142 steps) at full operations. The cliff-top cafe strip — Cafe del Mar, Suprabhatham, German Bakery (Kovalam) — comes back to full hours by October 10. Hawa Beach and Samudra Beach (north of the lighthouse promontory) at the year''s cleanest sand width post-monsoon recovery. Walk-in hotel rates run 25-30 percent below January peak: The Leela Kovalam ₹11-16k, Niraamaya Surya Samudra ₹12-18k, Somatheeram ₹4-7k, mid-tier Lighthouse Beach ₹2.5-4.5k. Trivandrum International (TRV) 16km via NH-66, 25-minute taxi ₹600-800. Pack a poncho rather than an umbrella — Kerala coastal winds make umbrellas useless against the last monsoon squalls.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Lighthouse Beach at full shack capacity. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, sea calm at 27C, shack-restaurant strip at full capacity. International backpacker rotation returns. Hotel rates 20 percent below December peak.',
  NULL,
  'November in Kovalam is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, sea temperature 27C, humidity dropping under 70 percent. The 30-strong Lighthouse Beach shack-restaurant strip at full capacity by November 10. International backpacker rotation returns from Goa-Manali-Pushkar circuits. Vizhinjam Lighthouse (1856, ₹50 entry, Tue-Sun 10am-5pm, 142 steps) at peak attendance — arrive 10am for the cleanest queue. The Ayurveda belt — Somatheeram, Soma Ayurveda Group, Niraamaya Surya Samudra — runs full programming. Cafe del Mar, Suprabhatham, German Bakery (Kovalam) all run 7am-11pm at full international-clientele. Walk-in rates: The Leela Kovalam ₹13-19k, Niraamaya Surya Samudra ₹14-22k, Somatheeram ₹5-8k, mid-tier Lighthouse Beach ₹3-5k — still meaningfully below December 22-January 5 peak. Trivandrum International (TRV) 16km via NH-66, 25-minute taxi. Strong call for first-time Kerala-coast visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kovalam', 12, 5, 'go',
  'Peak season. 21-30C, sea at 27C. Christmas-NYE Dec 22-Jan 5 rates double, gridlock at Lighthouse promontory.',
  'December is when Kovalam runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees rates 2-2.5x normal and traffic gridlock around Lighthouse promontory. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Kovalam is the operational peak and the most expensive stretch of the Kerala beach year. Daytime 22-30C, nights 21C, rainfall under 30mm, sea temperature 27C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-2.5x the November baseline: The Leela Kovalam hits ₹28-42k versus November''s ₹13-19k, Niraamaya Surya Samudra ₹26-38k, Somatheeram ₹9-14k, mid-tier Lighthouse Beach ₹6-9k. The Lighthouse promontory road gridlocks from 11am to 5pm through Christmas week — arrive at 9am or take the cliff-side stairs from Hawa Beach. The 30-strong shack-restaurant strip wants reservations for dinner from December 22 onwards. Vizhinjam Lighthouse (1856, ₹50 entry, Tue-Sun 10am-5pm) sees 30-minute climb queues at 4pm. The first three weeks of December (December 1-21) are the better-value window — peak weather, peak shack capacity, rates 30-40 percent below Christmas-NYE numbers: The Leela ₹16-23k, Niraamaya ₹17-25k, mid-tier ₹3.5-5.5k. Trivandrum International (TRV) 16km via NH-66 — book transfers 5 days ahead through Christmas week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
