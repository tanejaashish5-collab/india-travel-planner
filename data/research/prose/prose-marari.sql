-- Marari destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: marari

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 1, 5, 'go',
  'Peak season. 23-31C, dry, sea calm. 5-6 properties total — Marari Beach Resort CGH the anchor.',
  'January is when Marari runs at its strongest. Kerala''s most low-key non-touristy beach with deliberately limited hotel infrastructure — 5-6 properties total, Marari Beach Resort CGH (1999 pioneer) the anchor. 12km north of Alleppey, fishing village backdrop. Combine with Alleppey backwaters as 2-night package.',
  NULL,
  'Marari in January is the version of a Kerala beach that resorts deliberately keep low-key. Daytime sits at 24-31C, sea at 26C, humidity below 70 percent. The fishing village is the backdrop — 5-6 hotel properties total along a 4km beach stretch (compare Kovalam at 50+ properties on a 3km stretch). Marari Beach Resort CGH (1999 pioneer of the eco-resort tier in Kerala) is the anchor — heritage Kerala-design Mararikulam villa rooms, ₹22-45k/night. A Beach Symphony ₹15-30k, Marari Sands Beach Resort ₹8-15k, Niraamaya Retreats Beach & Backwaters Marari ₹12-22k. The combo trip (Alleppey houseboat 1 night + Marari beach 2 nights) is the standard CGH-anchored shape — book through Marari Beach Resort directly or KTDC-Alleppey. 12km north of Alleppey via NH-66, 25 minutes by car. Mararikulam railway 4km from beach. Cochin International Airport 90km north (90 min by NH-66). Fishing-village mornings: 5:30am catch arrives at Mararikulam beach. No beach shacks — meals at resort restaurants or Kerala fish-curry homestays.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 2, 5, 'go',
  'Driest month. 24-32C. Sea bathing at year-best. Beach width fully recovered.',
  'February delivers Marari''s cleanest weather. Rainfall under 5mm, sea bathing at year-best, beach width fully recovered from monsoon erosion. Long-stay rates negotiable from mid-month.',
  NULL,
  'February in Marari is the year''s cleanest weather window. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent — the lowest of the year. Sea at 26C, full swim conditions all day. The 4km Mararikulam beach is at its widest after monsoon recovery. Marari Beach Resort CGH at peak (₹25-50k/night, book 6-8 weeks ahead — the resort runs only 49 villas across 25 acres, deliberately constrained inventory), A Beach Symphony at Marari ₹18-35k, Niraamaya Retreats Beach & Backwaters Marari ₹14-25k. Mid-tier: Marari Sands Beach Resort ₹10-18k, Cherai Jetty Beach Resort ₹7-14k. Long-stay (5+ night) rates negotiable from mid-month. Yoga-and-Ayurveda packages are the resort-side draw — Marari Beach Resort''s Mind, Body, Spirit programme is the headline (₹2-5 lakh per couple for 14-21 nights). 12km north of Alleppey via NH-66, 25 minutes by car. The combo trip (Alleppey houseboat + Marari beach) is the standard package, total 3-4 nights at ₹35-80k all-inclusive. Cochin International Airport 90km north.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 3, 4, 'go',
  'Last cool month. 25-33C. Sea bathing strong. Resort rates slide 20 percent.',
  'March extends February''s weather minus the peak crunch. Sea bathing strong, beach width holds, resort rates 20-25 percent below February peak. Last comfortable window before April heat.',
  NULL,
  'March in Marari is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week, sea at 28C. Sea bathing 6-10am and 4-7pm holds; mid-day call is the resort pool. Beach width still strong — monsoon erosion won''t kick in until late May. Resort rates drop 20-25 percent versus February peak: Marari Beach Resort CGH ₹20-38k, A Beach Symphony at Marari ₹14-26k, Niraamaya Retreats ₹11-19k, Marari Sands Beach Resort ₹8-13k, Cherai Jetty Beach Resort ₹6-11k. Long-stay rates more negotiable. Friday-Sunday Bangalore weekend traffic still drives 70-80 percent occupancy. Mararikulam beach fishing-village mornings hold full schedule — 5:30am catch arrives. 12km north of Alleppey via NH-66, 25 minutes by car. Combine with Alleppey houseboat as 2-3 night package. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. Sea bathing dawn-only. Vishu Apr 14.',
  'April pushes Marari into pre-monsoon. Sea bathing 5:30-9am only. Vishu (Apr 14) brings sadhya at all major resorts. Ayurveda packages run year-round. Resort rates 30 percent below February peak.',
  'April pushes Marari into pre-monsoon stress. Sea bathing dawn-only, mid-day requires AC room or pool. Wait for late October if a beach trip is the goal.',
  'April in Marari is when the beach trip narrows to dawn and dusk. Daytime 28-34C, humidity 80 percent, sea at 29C. Sea bathing works 5:30-9am and 5-7pm only. Vishu (April 14, Malayalam new year) lands across all major resorts with full Vishukani arrangements at dawn (gold, rice, kanikkonna flowers in front of mirrors) and 26-28 dish sadhya lunches — Marari Beach Resort CGH and Niraamaya Retreats run special Vishu packages, ₹3-5k per person beyond room rates. Resort rates run 30-35 percent below February: Marari Beach Resort CGH ₹17-32k, A Beach Symphony ₹12-22k, Niraamaya Retreats ₹9-16k, Marari Sands Beach Resort ₹7-11k, Cherai Jetty Beach Resort ₹5-9k. Pool-equipped resort the recommended call. Friday-Sunday traffic from Bangalore continues; weekday occupancy under 50 percent. Ayurveda programme (Marari Beach Resort Mind, Body, Spirit; Niraamaya Wellness) runs year-round and works in April with indoor sessions. The trip works for travelers willing to anchor on early-morning beach plus pool-and-Ayurveda.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 5, 2, 'wait',
  'Peak heat plus pre-monsoon. 28-34C, humidity 85 percent. Sea state weakens, swells arrive.',
  NULL,
  'May runs hot and sticky on the Kerala coast. Sea state weakens through the third week as pre-monsoon swells arrive. Beach access dawn-only, resort rates at year-low. Wait for October.',
  'May in Marari is the closing month before the southwest monsoon. Daytime 29-34C, humidity 85 percent, sea at 30C. Pre-monsoon swells arrive third week — sea state turns choppier, swimming workable but undertow strengthens. Beach width holds but begins narrowing in the last week as monsoon erosion starts. Resort rates at year-low: Marari Beach Resort CGH ₹15-26k, A Beach Symphony ₹11-18k, Niraamaya Retreats ₹8-14k, Marari Sands Beach Resort ₹5-9k, Cherai Jetty Beach Resort ₹4-7k. Pre-monsoon thunderstorms hit weeks three and four — short violent squalls that knock grid 1-2 hours and raise humidity. Friday-Sunday occupancy holds at 50-55 percent for monsoon-weekend traffic. Ayurveda programmes hit pre-Karkidakam tail (Karkidakam proper opens mid-July). The trip works for traveling-pool-and-Ayurveda; the beach trip waits for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 6, 1, 'skip',
  'SW monsoon. 25-30C, 700-800mm rain. Beach unsafe, erosion claims sand width.',
  NULL,
  'June is when the southwest monsoon hits. Sea state advisory in force, beach access prohibited, beach width loses 30-50m through the month. Some resorts close maintenance windows. Skip; wait for October.',
  'June in Marari is the southwest monsoon at full strength. The current arrives around June 1 (Kerala receives monsoon onset first in India — IMD announces formal date annually from Thiruvananthapuram). Rainfall jumps to 700-800mm across 22-25 wet days; sustained downpours of 6-12 hours with cyclonic-cell wind close down beach access entirely. Kerala Tourism issues a sea-state advisory through the season — swimming is prohibited, lifeguards withdraw to base. Beach erosion claims 30-50m of sand width through the month — recovery begins in October. Marari Beach Resort CGH and most major properties run reduced occupancy at year-low rates: Marari Beach Resort CGH ₹13-22k, A Beach Symphony ₹10-15k, Niraamaya Retreats ₹7-12k. Some smaller resorts (Marari Sands, Cherai Jetty) close 4-6 week maintenance windows late June through August. Ayurveda programmes continue (Karkidakam Ayurveda month opens mid-July). Beach trip closed; wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 7, 2, 'wait',
  'Peak monsoon plus Karkidakam Ayurveda. 25-29C, 800-900mm rain. Marari Beach Resort Ayurveda peak.',
  'July is the wettest month with Karkidakam Ayurveda peak. Marari Beach Resort CGH Mind, Body, Spirit packages are the year''s deepest Ayurveda offering — ₹3-5 lakh per couple for 14-21 nights. Beach trip closed. For Ayurveda yes, beach no.',
  'July is monsoon-deep at Marari with the beach closed under sea-state advisory. Karkidakam Ayurveda packages at Marari Beach Resort and Niraamaya Wellness are the only real reason to be here in July.',
  'July in Marari is monsoon at its most stubborn. Rainfall averages 850mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 25-29C, humidity 92 percent. Beach access remains prohibited under sea-state advisory. The real Kerala draw of the season is Karkidakam (Ayurveda month — mid-July to mid-August in the Malayalam calendar) where monsoon humidity is held by traditional Ayurveda to enable maximum oil-medicine absorption. Marari Beach Resort CGH Mind, Body, Spirit programme is the year''s deepest Ayurveda offering — 14-21 night Karkidaka Chikitsa packages, ₹3-5 lakh per couple, with daily synchronised abhyangam, kashayam dharas, internal medication, and traditional Karkidaka kanji breakfast. Niraamaya Retreats Marari Wellness runs ₹2-3.5 lakh packages. Standard resort rates at year-low: Marari Beach Resort CGH ₹12-20k (non-Ayurveda), A Beach Symphony ₹9-14k, Marari Sands Beach Resort ₹4-7k. The Karkidakam-specific trip works; the standard beach trip waits for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 8, 2, 'wait',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Beach still closed. Onam Aug 25 (verify 2026).',
  'August is rain-heavy with Onam (Aug 25, 2026 — verify) and Nehru Trophy at nearby Punnamada (12km south). Marari Beach Resort runs Onam sadhya cruises and Vallamkali viewing packages. Beach still closed. Karkidakam Ayurveda continues.',
  'August holds monsoon at Marari with beach closed. Worth visiting only for Onam sadhya at the resort or as a Nehru Trophy spectator base.',
  'August in Marari pairs the southwest monsoon with the Onam state holiday cluster. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Sea state advisory still in force — swimming prohibited. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org). Marari Beach Resort CGH and Niraamaya Retreats Marari run elaborate sadhya lunches: 26-28 dishes on banana leaf, ₹3-5k per person, plus all-inclusive Onam packages with Vallamkali (snake-boat) viewing trips at ₹50-80k per couple for 3 nights. Nehru Trophy Boat Race lands 2nd Saturday August at Punnamada Lake (12km south, 25 minutes by car) — Marari resorts are convenient spectator bases, tickets ₹500-3,000 via KTDC. Karkidakam Ayurveda continues through mid-month. Standard rates rise 20-30 percent through Onam-Nehru week (book 6-8 weeks ahead): Marari Beach Resort CGH ₹15-25k versus August baseline ₹12-20k. Beach remains closed; pool and Ayurveda are the in-resort options.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 9, 2, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Sea state easing. Beach reopens late month.',
  'September is the recovery month. SW monsoon retreats through the second half. Sea state advisory lifts last week, beach access returns from October 1. Worth a 1-2 day visit only if dates are completely fixed.',
  'September is rebuild-not-yet-open at Marari. Beach access prohibited through first three weeks. Push to mid-October when full beach width and sea-bathing returns.',
  'September in Marari is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Sea state advisory begins easing in the last week — swimming prohibition lifts when wave-height drops below 1.5m, typically the last 2-3 days of September. Beach width still recovering from monsoon erosion (lost 30-50m June-August); narrow with debris, local crews clear through October. Resort rates 50-55 percent below January peak: Marari Beach Resort CGH ₹15-22k, A Beach Symphony ₹10-16k, Niraamaya Retreats ₹8-13k, Marari Sands Beach Resort ₹4-8k, Cherai Jetty Beach Resort ₹3-7k. Some smaller resorts still in monsoon maintenance (open from October 1). Ayurveda programmes hold full schedule. The full beach-and-sun shape opens cleanly only from October 5-15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 10, 4, 'go',
  'Beach reopens Oct 1. 24-30C, 200-250mm late-monsoon spillover. Sea state stabilising.',
  'October is the season-opener at Marari. Beach access returns October 1, sea state advisory lifts, beach width rebuilds through the month. Resort rates 30 percent below December peak. Strong value window.',
  NULL,
  'October in Marari is the proper return to coherent. Beach access returns from October 1 (Kerala Tourism sea-state advisory lifts as wave-height stabilises), the 4km Mararikulam beach width recovers through the month. Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean beach mode. Daytime 25-30C, humidity falling from 85 to 75 percent, sea at 28C. Marari Beach Resort CGH and Niraamaya Retreats Marari run full schedules; smaller Marari Sands and Cherai Jetty Beach Resort reopen from October 1 after monsoon maintenance. Resort rates 30-35 percent below December peak: Marari Beach Resort CGH ₹18-30k versus December''s ₹30-45k, A Beach Symphony ₹12-22k, Niraamaya Retreats ₹10-18k. Mid-tier ₹5-10k. Mararikulam beach fishing-village mornings resume — 5:30am catch arrives. Pack a poncho rather than an umbrella — coastal winds make umbrellas useless. Strong value window for first-time visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Beach width fully recovered. Resort rates 20 percent below Dec.',
  'November is the proper pivot to peak. Rainfall under 50mm, beach width fully recovered, sea bathing at year-best. Resort rates 20-25 percent below December peak.',
  NULL,
  'November in Marari is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, sea at 27C, humidity dropping below 70 percent. The 4km Mararikulam beach width fully recovered. Sea bathing 6am-6pm, swim conditions clean. Resort rates climb to 75-80 percent of December peak: Marari Beach Resort CGH ₹22-38k, A Beach Symphony ₹15-28k, Niraamaya Retreats Marari ₹12-22k, Marari Sands Beach Resort ₹8-14k, Cherai Jetty Beach Resort ₹6-11k. Friday-Sunday Bangalore-Chennai weekend traffic pushes occupancy to 80 percent at the larger resorts. Combo trips (Alleppey houseboat 1 night + Marari beach 2-3 nights) book through CGH-Earth Marari Beach Resort directly or KTDC-Alleppey. 12km north of Alleppey via NH-66, 25 minutes by car. Mararikulam railway 4km from beach. Strong call for first-time visitors who want full beach access minus the Christmas-NYE rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('marari', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 2-2.5x. Marari Beach Resort lock 6-8 weeks ahead.',
  'December is when Marari runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2-2.5x normal. Marari Beach Resort CGH lock 6-8 weeks ahead — only 49 villas, deliberately constrained. Beach width fully recovered.',
  NULL,
  'December in Marari is the operational peak — Kerala''s most low-key non-touristy beach at its most expensive. Daytime 23-30C, nights 21-22C, rainfall under 30mm, sea at 26C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-2.5x the November baseline: Marari Beach Resort CGH hits ₹40-65k (only 49 villas across 25 acres — lock 6-8 weeks ahead, 8-10 weeks for Christmas week), A Beach Symphony ₹25-40k, Niraamaya Retreats Marari ₹18-30k. Mid-tier Marari Sands Beach Resort ₹12-20k, Cherai Jetty Beach Resort ₹9-15k. The 4km Mararikulam beach hits peak access. The combo trip (Alleppey houseboat 1 night + Marari beach 2-3 nights) is the standard CGH-anchored shape, total 3-4 nights at ₹60-150k all-inclusive. 12km north of Alleppey via NH-66, 25 minutes by car. Mararikulam railway 4km from beach. Cochin International Airport 90km north (90 minutes by NH-66) at peak capacity. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
