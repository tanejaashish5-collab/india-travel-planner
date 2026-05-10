-- Kozhikode (Calicut) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala North Malabar batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kozhikode | best_months 10-3 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 1, 5, 'go',
  'Peak Malabar window. 22-31C, dry. Calicut Beach pier at clean sky. Biriyani-and-halwa circuit at full hours.',
  'January is when Calicut runs at its strongest. Daytime 22-31C, dry, Calicut Beach 100-year wooden pier walks at year-clean light, Mishkal Mosque at full prayer times, Kuttichira spice market mornings. Paragon, Sagar Hotel, Rahmaniya all running 11am-11pm.',
  NULL,
  'Calicut (Kozhikode) in January is the version the Malabar culinary capital delivers cleanly. Daytime 22-31C, nights 21C, humidity below 70 percent. Vasco da Gama landed at Kappad Beach (16km north of city) on May 20, 1498, marking the start of European maritime trade with India — the spot is signposted, free entry, walk-in. The 100-year wooden pier on Calicut Beach is at year-clean sunset light 5:30-6:30pm. Mishkal Mosque (700+ year, 4-tier wooden roof — one of Kerala''s oldest, in the Kuttichira quarter) opens for non-Muslim visitors outside prayer times (avoid Friday 12-2pm). Kuttichira spice market runs 7am-11am and 4pm-7pm — atmospheric for the historic Mappila-Muslim trade quarter. Paragon (since 1939, the standard for Malabar biriyani — long-grain Khaima/Jeerakasala rice not Basmati, distinct from Hyderabadi), Sagar Hotel and Rahmaniya all run 11am-11pm. Kuttichira Sweet Halwa shops on SM Street stack the Malabar halwa towers daily. Calicut International (CCJ) 25km, Kozhikode railway in city. Beypore shipyard 10km south.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 2, 5, 'go',
  'Driest month. 23-32C. Mishkal Mosque, Kuttichira market, Beach at year-clean. Hyatt and Beach Heritage at peak.',
  'February is the cleanest weather window. Rainfall under 5mm, humidity at 65 percent. Kuttichira spice market and Mishkal Mosque pair with Calicut Beach pier dawn walks. Paragon biriyani 1pm queues need 30-40 minute wait; lock a 12:30 arrival.',
  NULL,
  'February in Calicut is the technical peak. Rainfall under 5mm, daytime 23-32C, humidity at 65 percent. The 700+ year Mishkal Mosque (Kuttichira quarter, 4-tier wooden Kerala-style roof) and the 14th-century Mucchundi Palli (also Kuttichira) run their full prayer schedule. Non-Muslim visitor windows outside prayer times work cleanly. The Kuttichira spice market (7am-11am and 4pm-7pm) at peak Mappila-Muslim trade-quarter intensity — turmeric, coriander, dried-shrimp ladders, copra. Paragon at 1pm runs 30-40 minute queues for the long-grain Khaima/Jeerakasala Malabar biriyani — arrive 12:30. Sagar Hotel, Rahmaniya, Salkara all run 11am-11pm. Kuttichira Sweet Halwa shops on SM Street stack 50+ Malabar halwa varieties (carrot, ash-gourd, banana, ginger, traditional) at ₹350-500/kg. Calicut Beach 100-year wooden pier sunset 6-6:30pm runs 200-300 walkers on weekends, half that weekday. Walk-in rates at Hyatt Regency Calicut ₹8-12k, Beach Heritage ₹4-7k, Calicut Towers ₹3-5k. Calicut International (CCJ) 25km, Kozhikode railway central.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 3, 4, 'go',
  'Last comfortable window. 24-33C. Mosque-market-beach circuit holds 7-11am and 5-7pm. Hotel rates ease 20 percent.',
  'March extends February''s heritage walking with rising heat. Mosque interiors hold cool, Kuttichira market mornings work cleanly, Calicut Beach evening pier walk holds. Mid-day SM Street halwa-shopping retreats indoors. Paragon and Sagar still 30-minute lunch queues weekends.',
  NULL,
  'March in Calicut is the soft-landing month before pre-monsoon humidity. Daytime 25-33C, humidity climbing to 75 percent in the last fortnight. The Kuttichira heritage quarter (Mishkal Mosque, Mucchundi Palli, the 1st-floor wooden joinery houses) holds at 26-28C in interior thermal-mass laterite — comfortable midday for indoor visits but the open lane between buildings collapses past 11am. The Kuttichira spice market 7am-11am morning slot is the only working window; the 4pm-7pm slot returns by month-end. Calicut Beach 100-year wooden pier walks: 6:30am-9am and 5:30-7pm, mid-day sand temperatures spike past 50C. Paragon, Sagar Hotel, Rahmaniya all run full hours; lunch queue at Paragon thins by mid-month. SM Street Kuttichira Sweet Halwa shops cool — laterite walls — but the walk between shops gets hot. Walk-in rates drop 20 percent versus February: Hyatt Regency ₹6-9k, Beach Heritage ₹3-5k, Calicut Towers ₹2-4k. Calicut International (CCJ) 25km via NH-66, Kozhikode railway in city. Last comfortable window before April pushes the trip into endurance shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 4, 3, 'wait',
  'Pre-monsoon heat. 26-35C, humidity 75 percent. Indoor heritage holds. Vishu Apr 14 closes most shops 24h.',
  'April still works for travelers willing to time-shift. Mosque interiors and indoor biriyani halls hold; the open Kuttichira lanes and Calicut Beach circuit collapse past 10am. Vishu (April 14, Malayalam new year) closes most heritage shops and biriyani halls for 24 hours.',
  'April delivers the first wave of Malabar pre-monsoon heat. Mosque interiors and indoor biriyani halls hold, but the open Kuttichira market lanes, the Calicut Beach pier walk, and the SM Street halwa shopping all collapse past 10am.',
  'April in Calicut is when the heritage trip narrows to early mornings, indoor anchors, and late evenings. Daytime 27-35C, humidity 75-80 percent. The Mishkal Mosque interior (700+ year wooden roof, 4-tier Kerala-style) and the Mucchundi Palli interior hold 26-28C in the laterite thermal mass; non-Muslim visitor windows outside prayer times work fine. Vishu (April 14, Malayalam new year) is observed across the city with the kanikkonna-flower Vishukani household ritual; most heritage shops, the Kuttichira spice market, and most biriyani halls (Paragon, Sagar Hotel, Rahmaniya) close for 24 hours. Calicut Beach pier walks compress to 6:30-9am and 6-7pm. SM Street Kuttichira Sweet Halwa shops indoor browsing works mid-day. Walk-in rates drop 30 percent versus February: Hyatt Regency Calicut ₹5-8k, Beach Heritage ₹3-4.5k, Calicut Towers ₹2-3.5k. Calicut International (CCJ) 25km, Kozhikode railway in city. The smart traveler''s shape: 7-10am Kuttichira market, AC indoor 11am-4pm, 5-7pm beach pier and sunset.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 5, 2, 'wait',
  'Peak pre-monsoon. 27-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Heritage indoor only.',
  'May works only for travelers committed to indoor heritage and early-morning windows. Last 10 days bring pre-monsoon thunderstorms that knock grid power 1-3 hours. Walk-in rates at year-low.',
  'May runs hot and sticky on the Malabar coast. Mosque interiors, Paragon-and-Sagar AC dining halls hold; the open Kuttichira lanes and Calicut Beach pier collapse from 9am. Wait for October.',
  'May in Calicut is the last month before the southwest monsoon arrives around June 1. Daytime 28-36C, humidity 80 percent, the third week brings pre-monsoon thunderstorms that knock grid power 1-3 hours each afternoon. The Mishkal Mosque and Mucchundi Palli interiors hold 26-28C. Paragon, Sagar Hotel, Rahmaniya, Salkara all run AC mid-day — the indoor Malabar biriyani circuit (long-grain Khaima/Jeerakasala rice, 1939-anchored Paragon, ₹250-400 per plate) is the most reliable working anchor. SM Street Kuttichira Sweet Halwa shops cool through the day. Calicut Beach pier walks compress to 6-8:30am and 6-7pm only — sand temperatures spike past 55C mid-day. Walk-in hotel rates run year-low: Hyatt Regency Calicut ₹4-7k, Beach Heritage ₹2.5-4k, Calicut Towers ₹2-3k. Calicut International (CCJ) 25km, Kozhikode railway central. Push to October if dates flex. Karkidakam Ayurveda month begins mid-July at long-stay resorts in surrounding districts but is a different traveler entirely.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 6, 1, 'skip',
  'SW monsoon arrival. 24-30C, 700-900mm rainfall. Beach forbidden, Kuttichira market suspended. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Malabar coast. Calicut Beach pier walks unsafe, Kuttichira spice market suspended, the open-lane heritage circuit collapses on heavy-rain days. The biriyani-and-halwa indoor circuit alone doesn''t justify a trip.',
  'June in Calicut is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days, often as 4-8 hour sustained downpours. Daytime 25-30C, humidity 90 percent. The Calicut Beach 100-year wooden pier is unsafe, Kerala Tourism issues a sea-state advisory, lifeguards withdraw from beach service. The Kuttichira spice market suspends through monsoon — vendors stack indoor goods only. The Mishkal Mosque interior remains open for prayer times (non-Muslim windows outside prayer continue) but the open Kuttichira lanes turn to standing water on heavy-rain days. Paragon, Sagar Hotel, Rahmaniya all run normal hours indoors — the Malabar biriyani-and-halwa indoor circuit alone, however, doesn''t justify the trip. Walk-in rates at year-low: Hyatt Regency Calicut ₹4-7k, Beach Heritage ₹2.5-4k. Calicut International (CCJ) 25km, Kozhikode railway central — flights and trains run normally. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Indoor circuit only — biriyani halls work but heritage circuit dead.',
  NULL,
  'July is the wettest month at Calicut. Outdoor heritage circuit closed, beach forbidden, Kuttichira market suspended. Indoor biriyani halls run but a one-anchor trip isn''t worth the rain. Wait for October.',
  'July in Calicut is the wettest month of the Malabar year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. The 100-year wooden pier on Calicut Beach unsafe, Kerala Tourism advisory holds, sea bathing prohibited. The Kuttichira spice market suspended for monsoon. The 700+ year Mishkal Mosque interior remains open for prayers (non-Muslim windows outside prayer continue) but the open Kuttichira lane collapses to standing water on heavy-rain days. Paragon (since 1939), Sagar Hotel, Rahmaniya all run indoor service at normal hours — the long-grain Khaima/Jeerakasala Malabar biriyani at ₹250-400 per plate is the one reliable working anchor. SM Street Kuttichira Sweet Halwa shops continue but foot traffic reduces 60-70 percent. Walk-in hotel rates at year-low: Hyatt Regency Calicut ₹4-6k, Beach Heritage ₹2.5-4k, Calicut Towers ₹2-3k. Karkidakam Ayurveda month begins mid-month at long-stay resorts — different traveler entirely. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 8, 2, 'wait',
  'Monsoon continues. 24-29C, 600-800mm rain. Onam Aug-Sep brings programming. Beach still closed.',
  'August holds the July rain pattern with an Onam overlay. Kuttichira market still suspended, beach unsafe, but Onam (Atham→Thiruvonam, variable date) brings 10 days of cultural events. Calicut is more biriyani-anchored than snake-boat-race-anchored.',
  'August is monsoon-thick at Calicut with the Onam overlay. Beach closed, Kuttichira market suspended, the heritage outdoor circuit unsafe on most days. Indoor biriyani halls run but the trip narrows to a 2-day single-anchor visit. Wait for October.',
  'August in Calicut runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — pookalam flower carpets, sadhya feasts, the Nehru Trophy snake-boat race in Alleppey on the second Saturday. Calicut observes Onam through home-and-temple programming and the city restaurants stage Onam Sadhya thalis on Thiruvonam day (Paragon, Sagar Hotel, Rahmaniya, Salkara all serve at ₹400-600 per banana-leaf plate). The Kuttichira spice market remains suspended for monsoon. Calicut Beach 100-year wooden pier unsafe — Kerala Tourism advisory holds. Walk-in hotel rates run year-low: Hyatt Regency Calicut ₹4-6k, Beach Heritage ₹2.5-4k. Karkidakam Ayurveda month ends mid-month. The standard Malabar heritage trip remains constrained. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 9, 3, 'wait',
  'Monsoon retreating. 24-31C, 250-400mm rain. Kuttichira market resumes by week three. Beach calms.',
  'September is the recovery month. Monsoon withdraws around September 25-30, Kuttichira spice market resumes by the third week, beach lifeguard service returns. Push to mid-October if dates flex.',
  'Early September is still rain-heavy. Kuttichira market and beach pier walks don''t come back online until the third week. Push to mid-October when the full Malabar circuit returns.',
  'September in Calicut is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-31C, humidity finally easing toward 80 percent. The southwest monsoon retreats from the Malabar coast around September 25-30 (IMD declares formal withdrawal). The Kuttichira spice market (7am-11am and 4pm-7pm) resumes from the third week as the open-lane footing dries. The 700+ year Mishkal Mosque non-Muslim visitor windows outside prayer times continue full schedule. Calicut Beach 100-year wooden pier walks return when lifeguard service resumes mid-month. Paragon, Sagar Hotel, Rahmaniya all run at normal hours — the queue at Paragon at 1pm climbs back from 10 to 25 minutes by month-end. Walk-in rates climb 15-20 percent versus August: Hyatt Regency Calicut ₹5-8k, Beach Heritage ₹3-5k, Calicut Towers ₹2-3.5k. Calicut International (CCJ) 25km, Kozhikode railway central. The smart traveler''s call is to wait for the October 20-31 window — full circuit, calm sea, off-peak rates. September is a 2-3 day biriyani sample.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 10, 4, 'go',
  'Season opens. 24-31C, post-monsoon, 100-200mm late rain. Full Malabar circuit returns by week two.',
  'October is the proper season-opener for Calicut. Late-monsoon spillover wraps in the first 10 days, Kuttichira market and beach pier return to clean conditions, Paragon-Sagar-Rahmaniya hit full crowds. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Calicut is when the Malabar circuit returns to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the full city heritage trip returns by October 12-15. Daytime 25-31C, humidity falling toward 78 percent, sea temperature 28C. The Kuttichira spice market (7am-11am and 4pm-7pm) returns to full Mappila-Muslim trade-quarter intensity. Mishkal Mosque (700+ year, 4-tier wooden Kerala-style roof) at full visitor schedule outside prayer times. The 100-year wooden pier on Calicut Beach pulls clean post-monsoon evening light at 6pm. Paragon (since 1939), Sagar Hotel, Rahmaniya, Salkara all run full hours — lunch queue at Paragon climbs back to 25-30 minutes weekends. Walk-in hotel rates run 25-30 percent below January peak: Hyatt Regency Calicut ₹6-9k, Beach Heritage ₹3.5-5.5k, Calicut Towers ₹2.5-4k. SM Street Kuttichira Sweet Halwa shops at full stock — Onam-month leftover stock pulls 10-15 percent halwa-shop discounts in early October. Calicut International (CCJ) 25km, Kozhikode railway central, Beypore shipyard 10km south.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Kuttichira market and Mishkal Mosque at year-clean. Paragon at full lunch queue.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, humidity 70 percent, full Malabar circuit at peak attendance. Hotel rates 20 percent below December peak — strong call for first-time visitors.',
  NULL,
  'November in Calicut is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, humidity dropping under 70 percent, sea temperature 27C. The Kuttichira spice market (7am-11am and 4pm-7pm) at peak Mappila-Muslim trade-quarter intensity. Mishkal Mosque (700+ year, 4-tier wooden roof) at peak visitor numbers outside prayer times. The 100-year wooden pier on Calicut Beach pulls year-clean sunset light 5:45-6:15pm — 200-300 walkers weekday, 400-500 weekend. Paragon (since 1939), Sagar Hotel, Rahmaniya all run full hours; the long-grain Khaima/Jeerakasala Malabar biriyani at Paragon hits 30-40 minute lunch queues at 1pm. SM Street Kuttichira Sweet Halwa shops at full stock — 50+ varieties of Malabar halwa at ₹350-500/kg. Walk-in rates at Hyatt Regency Calicut ₹7-11k, Beach Heritage ₹4-6.5k, Calicut Towers ₹3-5k — still meaningfully below December 22-January 5 peak. Calicut International (CCJ) 25km via NH-66, Kozhikode railway central, Beypore shipyard 10km south, Kappad Beach (Vasco da Gama landing) 16km north.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kozhikode', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE Dec 22-Jan 5 rates climb 50-70 percent. Paragon needs reservation.',
  'December is when Calicut runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees hotel rates climb 50-70 percent and Paragon needs lunch reservation. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Calicut is the operational peak. Daytime 22-30C, nights 21C, rainfall under 30mm. The Kuttichira spice market at peak intensity, Mishkal Mosque at peak visitor numbers outside prayer times, the 100-year wooden pier on Calicut Beach at year-clean sunset light. Paragon (since 1939) needs lunch reservation — call 0495-2761020 a day ahead from December 18; the long-grain Khaima/Jeerakasala Malabar biriyani at ₹300-450 per plate runs 45-minute waits without booking. Sagar Hotel, Rahmaniya, Salkara all run full hours. SM Street Kuttichira Sweet Halwa shops at peak Christmas-gifting volume; Malabar halwa hampers in 1kg-3kg gift boxes at ₹500-1500. The Christmas-NYE corridor (December 22 to January 5) sees walk-in rates climb 50-70 percent: Hyatt Regency Calicut ₹12-18k, Beach Heritage ₹6-9k, Calicut Towers ₹4-6k. The first three weeks (December 1-21) are the better-value window — peak weather, peak Malabar heritage, rates 30-40 percent below Christmas-NYE numbers. Calicut International (CCJ) 25km via NH-66 — book transfers 5 days ahead through Christmas week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
