-- Trivandrum (Thiruvananthapuram) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala South batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: trivandrum | best_months 10-3 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 1, 5, 'go',
  'Peak Kerala-capital window. 22-31C, dry. Padmanabhaswamy interior cool, Napier Museum at full hours.',
  'January is when Trivandrum runs at its strongest. Daytime 22-31C, dry, Padmanabhaswamy Temple at full pilgrim attendance, Napier Museum 10am-4:45pm (closed Monday and Wednesday morning), Kuthiramalika Palace 8:30am-1pm and 3pm-5:30pm.',
  NULL,
  'Trivandrum in January is the version of the Kerala capital the Swachh Survekshan top-10-cleanest-cities ranking describes. Daytime 22-31C, nights 21C, humidity finally below 70 percent. Padmanabhaswamy Temple (the world''s richest temple — Supreme Court 2011 audit valued the treasure vault contents at over ₹1 lakh crore, with Vault B contents still legally locked) opens 4:30am-7:20pm with multiple darshan windows. Non-Hindus are not permitted in the main sanctum; the dress code is strict — men in dhoti only (no shirts, available for ₹50 hire at the temple), women in saree or salwar kameez (saree ₹100 hire). Lord Padmanabha''s 18-foot reclining idol on the Anantha serpent is viewed through three doors. Napier Museum (1880, Indo-Saracenic, ₹20 entry, 10am-4:45pm closed Monday and Wednesday morning), Kuthiramalika Palace (122 horse-bracket carvings on eaves, ₹50, 8:30am-1pm and 3pm-5:30pm closed Monday) and Sri Chitra Art Gallery anchor the museum quarter. Walk-in rates at Vivanta by Taj Trivandrum ₹8-12k, Hyatt Regency ₹9-13k, The Leela Kovalam (16km south, in Kovalam) ₹15-22k. Trivandrum International (TRV) 6km from city.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 2, 5, 'go',
  'Driest month plus Attukal Pongala mid-Feb to early Mar. 23-32C. World''s largest gathering of women.',
  'February is the cleanest weather window plus the Attukal Pongala anchor. Bharani-Kumbham nakshatra (variable date late-Feb or early-Mar) brings 3M+ women to Trivandrum streets in the world''s largest female-only festival, Guinness Record. Streets shut down for the day.',
  NULL,
  'February in Trivandrum is the technical peak plus a singular cultural anchor. Rainfall under 5mm, daytime 23-32C, humidity at 65 percent. Attukal Pongala — the world''s largest gathering of women, 3M+ devotees cooking pongala on Trivandrum streets, Guinness World Record — falls on Bharani-Kumbham nakshatra (variable lunar date, late February or early March). Check attukal.org for current-year date. The festival shuts down a 5-7 km radius around Attukal Bhagavathy Temple from 4am to 8pm — buses and autos suspended, vehicle traffic blocked, residents host pilgrims. Padmanabhaswamy Temple full schedule continues. Napier Museum, Kuthiramalika Palace, Sri Chitra Art Gallery all run normal hours (10am-4:45pm closed Monday). Walk-in hotel rates: Vivanta by Taj Trivandrum ₹7-11k, Hyatt Regency ₹8-12k, The Leela Kovalam (16km) ₹14-22k. The Pongala day brings hotel-rate spike of 30-40 percent in city hotels for 24-48 hours. Trivandrum International (TRV) 6km — Pongala-day flights run normal but airport-to-city transfers reroute via Kazhakkoottam.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 3, 4, 'go',
  'Last cool window or Pongala continuation. 24-33C. Museums and Padmanabhaswamy at full schedule.',
  'March extends February''s heritage circuit minus the Pongala spike (unless Pongala falls early-March in the current year). Walk-in rates ease 25 percent versus February peak. Indoor museum and temple visits dominant.',
  NULL,
  'March in Trivandrum is the soft-landing month before pre-monsoon humidity. Daytime 25-33C, humidity climbing toward 75 percent in the last fortnight. Padmanabhaswamy Temple interior (the laterite-and-stone passages and the Lord Padmanabha 18-foot reclining sanctum) holds 26-28C in the thermal-mass walls. Non-Hindu visitors do not enter the main sanctum; dress-code dhoti hire ₹50 for men, saree ₹100 for women remains at the entrance. Napier Museum (1880 Indo-Saracenic, ₹20 entry, 10am-4:45pm closed Monday and Wednesday morning) is the trip''s air-conditioned anchor. Kuthiramalika Palace (122 horse-eave carvings, ₹50 entry) holds full hours 8:30am-1pm and 3pm-5:30pm. Sri Chitra Art Gallery (Travancore royal collection, Raja Ravi Varma originals, ₹20 entry) holds the same Monday-closed schedule. Walk-in rates ease 25 percent versus February peak: Vivanta by Taj Trivandrum ₹6-9k, Hyatt Regency ₹6-9k, The Leela Kovalam ₹12-17k. If Attukal Pongala (variable lunar date) lands early-March in the current year, expect a 24-48 hour city-shutdown spike. Trivandrum International (TRV) 6km from city centre.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 4, 3, 'wait',
  'Pre-monsoon heat. 26-35C, humidity 75 percent. Indoor museums hold. Vishu Apr 14 closes most heritage 24h.',
  'April still works for travelers willing to time-shift to indoor museums and AC heritage. Padmanabhaswamy interior and Napier Museum hold 26-28C. Vishu (April 14, Malayalam new year) closes most heritage venues for 24 hours.',
  'April delivers the first wave of pre-monsoon plains heat. Outdoor walking between Padmanabhaswamy, Napier Museum, Kuthiramalika Palace collapses past 10am. Indoor anchors hold but the open temple-square circuit needs 6:30-9am or 5:30-7pm windows.',
  'April in Trivandrum is when the heritage capital trip narrows to early mornings, indoor anchors, and late evenings. Daytime 27-35C, humidity 75-80 percent. Padmanabhaswamy Temple interior (the laterite-and-stone passages) and Napier Museum (1880, ₹20 entry) hold 26-28C in their thermal-mass interiors. The open temple-square walking circuit between Padmanabhaswamy, Kuthiramalika Palace and Napier Museum collapses past 10am. Vishu (April 14, Malayalam new year) is observed across the city with the kanikkonna-flower Vishukani household ritual; Padmanabhaswamy runs special pre-dawn darshan, but most heritage venues — Napier Museum, Sri Chitra Art Gallery, Kuthiramalika Palace — close for 24 hours. Walk-in rates at Vivanta by Taj Trivandrum drop to ₹5-8k, Hyatt Regency ₹6-9k, The Leela Kovalam (16km) ₹10-15k. The smart traveler''s shape: 6-9am Padmanabhaswamy, 10am-4pm AC museum and palace, 5-7pm Shanghumukham Beach (8km west) for sea breeze. Trivandrum International (TRV) 6km from city centre.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 5, 2, 'wait',
  'Peak pre-monsoon. 27-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Indoor only past 10am.',
  'May still functions for indoor heritage. Padmanabhaswamy interior and museum AC remain workable. Last 10 days bring pre-monsoon thunderstorms. Walk-in rates at year-low.',
  'May runs hot and sticky on the Kerala plains. Outdoor circuits collapse past 9am, pre-monsoon thunderstorms knock grid power afternoons, the open temple-square walk is unworkable. Indoor museum-and-temple-only travelers continue.',
  'May in Trivandrum is the last month before the southwest monsoon arrives around June 1. Daytime 28-36C, humidity 80 percent, the third week brings pre-monsoon thunderstorms that knock grid power 1-3 hours each afternoon. Padmanabhaswamy Temple interior holds 26-28C in the laterite-and-stone passages — the dawn 4:30am darshan is the cleanest of the year, before the heat sets in. Napier Museum (1880, ₹20 entry, 10am-4:45pm closed Monday and Wednesday morning) and Sri Chitra Art Gallery (Raja Ravi Varma originals, ₹20) are the AC anchors of the day. Kuthiramalika Palace (122 horse-eave carvings) holds 26-27C in interior thermal mass. Walk-in hotel rates run year-low: Vivanta by Taj Trivandrum ₹4-6k, Hyatt Regency ₹5-7k, The Leela Kovalam (16km south) ₹8-12k. Karkidakam Ayurveda month begins mid-July — Trivandrum''s Somatheeram and Soma Ayurveda Group resorts in Kovalam are major Karkidaka Chikitsa centres. Push to October-November if the trip is heritage-only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 6, 1, 'skip',
  'SW monsoon arrival. 24-30C, 700-900mm rainfall. Outdoor heritage closed slippery. Skip standard trip.',
  NULL,
  'June is when the southwest monsoon hits Kerala. Padmanabhaswamy outer-passages flood, museum-square walking unsafe on heavy-rain days, Shanghumukham Beach unsafe. Indoor anchors hold but a one-anchor trip isn''t worth the rain. Wait for October.',
  'June in Trivandrum is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days, often as 4-8 hour sustained downpours. Daytime 25-30C, humidity 90 percent. Padmanabhaswamy Temple interior remains open at full schedule (4:30am-7:20pm darshan windows, dress code unchanged), but the outer passage approach floods on heavy-rain days. Napier Museum, Kuthiramalika Palace, Sri Chitra Art Gallery all run normal hours indoors but the inter-venue walking circuit collapses. Shanghumukham Beach (8km west) unsafe — Kerala Tourism issues a sea-state advisory, lifeguards withdraw. Walk-in hotel rates at year-low: Vivanta by Taj Trivandrum ₹4-6k, Hyatt Regency ₹4-7k, The Leela Kovalam (16km south) ₹8-12k. Karkidakam Ayurveda packages (mid-July to mid-August) start drawing the medicine-tourism segment to Somatheeram and Soma Ayurveda Group in Kovalam. Trivandrum International (TRV) 6km — flights run normal. The standard heritage trip is closed in June. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Karkidakam Ayurveda month draws different traveler. Skip standard.',
  NULL,
  'July is the wettest month at Trivandrum. Outdoor heritage walking unsafe most days. Karkidakam (mid-July to mid-August in Malayalam calendar) draws the Ayurveda-medicine traveler to Kovalam resorts — different trip entirely. Standard heritage trip skip.',
  'July in Trivandrum is the wettest month of the Kerala year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. Padmanabhaswamy Temple interior remains open at full 4:30am-7:20pm darshan schedule but the outer approach floods. Napier Museum, Kuthiramalika Palace, Sri Chitra Art Gallery all run normal indoor hours but the open-square walking circuit between venues is unworkable on most days. Shanghumukham Beach unsafe under Kerala Tourism advisory. Walk-in hotel rates at year-low: Vivanta by Taj Trivandrum ₹4-6k, Hyatt Regency ₹4-6k, The Leela Kovalam (16km south) ₹7-11k. Karkidakam (mid-July to mid-August in the Malayalam calendar) is the traditional Ayurveda month — open pores absorb medicated oils best in monsoon humidity. Somatheeram and Soma Ayurveda Group in Kovalam run 14-21 day Karkidaka Chikitsa packages with monsoon-season discounts. A different traveler entirely. Standard heritage trip is closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 8, 2, 'wait',
  'Onam Aug-Sep brings full city programming. 24-29C, 600-800mm rain. Pookalam-and-Sadhya across city.',
  'August holds the July rain pattern with the Onam overlay. Atham→Thiruvonam (variable date) brings 10 days of pookalam, sadhya thalis at Vivanta-Hyatt-Leela, cultural events at Kanakakkunnu Palace grounds. Onam is the only meaningful cultural draw of the wet months.',
  'August is monsoon-thick at Trivandrum. The outdoor heritage circuit is closed but Onam programming runs indoor-and-courtyard. If Onam (variable date) anchors the trip, August can work. Otherwise wait for October.',
  'August in Trivandrum runs the July monsoon pattern with one major cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — pookalam flower carpets in homes and public courtyards, sadhya feasts on Thiruvonam day across the state. Trivandrum is one of the strongest Onam-anchored destinations: Kanakakkunnu Palace grounds host Onam Week cultural programming (Pulikali tiger dances, Thiruvathira folk dances, Kerala temple-art demonstrations), Vivanta by Taj, Hyatt Regency, and The Leela Kovalam all stage 26-30 dish Onam Sadhya thalis on Thiruvonam day at ₹800-1500 per banana-leaf plate. Padmanabhaswamy Temple runs special Onam darshan windows. Walk-in hotel rates climb 30-40 percent for Onam week then drop back: Vivanta ₹6-10k, Hyatt Regency ₹6-9k, The Leela Kovalam ₹9-13k. Karkidakam Ayurveda packages end mid-month. Trivandrum International (TRV) 6km. If Onam anchors the trip, August works; otherwise October is cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 9, 3, 'wait',
  'Monsoon retreating. 24-31C, 250-400mm rain. Onam tail. Heritage circuit walkable from week three.',
  'September is the recovery month. Onam tail in first week (if not in August), monsoon withdraws around September 25-30, full heritage circuit walkable from third week. Walk-in rates 50 percent below January peak.',
  'Early September is still rain-heavy. Heritage outdoor circuit returns only in the last week. If Onam (variable date) doesn''t fall in early September, push to October.',
  'September in Trivandrum is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-31C, humidity finally easing toward 80 percent. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). If Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival) falls in early September in the current year — the festival migrates Aug-Sep depending on the Malayalam calendar — Trivandrum runs full Onam programming through the first 10 days: Kanakakkunnu Palace grounds, Padmanabhaswamy Onam darshan, Sadhya thalis at Vivanta-Hyatt-Leela. Outdoor heritage circuits between Padmanabhaswamy, Napier Museum, Kuthiramalika Palace come back online by the third week. Walk-in hotel rates: Vivanta by Taj Trivandrum ₹5-8k, Hyatt Regency ₹5-8k, The Leela Kovalam (16km south) ₹8-12k. Trivandrum International (TRV) 6km. The smart traveler''s call is to wait for the October 20-31 window unless Onam falls in early September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 10, 4, 'go',
  'Season opens. 24-31C, post-monsoon, 100-200mm late rain. Full heritage circuit returns.',
  'October is the proper season-opener. Late-monsoon spillover wraps in first 10 days. Padmanabhaswamy, Napier Museum, Kuthiramalika Palace at full schedule. Walk-in rates 25-30 percent below January peak.',
  NULL,
  'October in Trivandrum is when the Kerala capital returns to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the full heritage circuit between Padmanabhaswamy Temple, Napier Museum, Kuthiramalika Palace, and Sri Chitra Art Gallery returns by October 12-15. Daytime 25-31C, humidity falling toward 78 percent. Padmanabhaswamy Temple at full 4:30am-7:20pm darshan schedule. Napier Museum (1880 Indo-Saracenic, ₹20 entry, 10am-4:45pm closed Monday and Wednesday morning), Kuthiramalika Palace (122 horse-eave carvings, ₹50 entry, 8:30am-1pm and 3pm-5:30pm closed Monday) and Sri Chitra Art Gallery (Raja Ravi Varma originals, ₹20 entry) all at full schedule. Shanghumukham Beach (8km west) lifeguard service returns 9am-5pm. Walk-in hotel rates run 25-30 percent below January peak: Vivanta by Taj Trivandrum ₹6-9k, Hyatt Regency ₹6-10k, The Leela Kovalam (16km south) ₹11-16k. Trivandrum International (TRV) 6km. Kovalam day-trip 16km, Varkala day-trip 50km north.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Full heritage circuit at peak attendance. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, humidity 70 percent, Padmanabhaswamy and museum-quarter circuit at peak. Hotel rates 20 percent below December peak.',
  NULL,
  'November in Trivandrum is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, humidity dropping under 70 percent. Padmanabhaswamy Temple at full 4:30am-7:20pm darshan schedule — non-Hindu visitors not permitted in the main sanctum, dress-code dhoti hire ₹50 for men and saree ₹100 for women remains at the entrance. Napier Museum (1880 Indo-Saracenic, ₹20 entry, 10am-4:45pm closed Monday and Wednesday morning), Kuthiramalika Palace (122 horse-eave carvings, ₹50 entry), Sri Chitra Art Gallery (Travancore royal collection plus Raja Ravi Varma originals, ₹20 entry) all at full schedule. Shanghumukham Beach (8km west) lifeguard service 9am-5pm at peak weekend attendance. Walk-in rates at Vivanta by Taj Trivandrum ₹7-11k, Hyatt Regency ₹7-11k, The Leela Kovalam (16km south) ₹13-19k — still below December 22-January 5 peak. Trivandrum International (TRV) 6km from city centre, Kovalam day-trip 16km south, Varkala day-trip 50km north, Poovar day-trip 27km south. Strong call for first-time Kerala-capital visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trivandrum', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE Dec 22-Jan 5 rates climb 50-70 percent at city, 100 percent at Kovalam.',
  'December is when Trivandrum runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees city hotel rates climb 50-70 percent and The Leela Kovalam climb 100 percent. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Trivandrum is the operational peak. Daytime 22-30C, nights 21C, rainfall under 30mm. Padmanabhaswamy Temple at peak pilgrim attendance — the 4:30am dawn darshan is the cleanest window of the day, before the December tour groups arrive. The Christmas-NYE corridor (December 22 to January 5) sees city walk-in rates climb 50-70 percent: Vivanta by Taj Trivandrum ₹12-18k, Hyatt Regency ₹13-19k. The Leela Kovalam (16km south, peak coastal property) climbs nearly 100 percent — ₹25-40k from November''s ₹13-19k baseline. The first three weeks of December (December 1-21) are the better-value window — peak weather, peak heritage circuit, rates 30-40 percent below Christmas-NYE numbers: Vivanta ₹8-12k, Hyatt Regency ₹8-12k, The Leela Kovalam ₹14-20k. Napier Museum, Kuthiramalika Palace, Sri Chitra Art Gallery all run full hours but Saturday-Sunday queues form by 10:30am. Trivandrum International (TRV) 6km — book transfers 5 days ahead through Christmas week. Kovalam, Varkala, Poovar all within 50km — combine for a 4-5 day south-Kerala loop.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
