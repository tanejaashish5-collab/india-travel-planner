-- Sabarimala destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala Pilgrimage batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: sabarimala | best_months 11, 12, 1 (rigid 41-day Mandala-Makaravilakku) | avoid 2-10
-- Note: Sabarimala temple opening calendar published by Travancore Devaswom Board (sabarimalaonline.org)
-- Standard exceptions to "skip" rule: Apr 14 Vishu + 1st of every Malayalam month brief openings

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 1, 5, 'go',
  'Mandala-Makaravilakku peak Jan 1-14. 5-22C at 914m. 5km Pampa-Sannidhanam trek. Black-dhoti pilgrim crowds.',
  'January 1-14 is the climactic stretch of the 41-day Mandala-Makaravilakku window. The Makaravilakku festival on January 14 itself sees 1.5-2M devotees on the hill in a single 24-hour window. Online TDB virtual queue (sabarimalaonline.org) for Jan 14 books 6 weeks ahead.',
  NULL,
  'Sabarimala in January is the climactic stretch of the world''s second-largest pilgrimage. Daytime 18-22C at 914m elevation in the Western Ghats, nights 5-8C, dry. The 41-day Mandala-Makaravilakku window (Nov 16-17 to Jan 14, exact dates verified annually by the Travancore Devaswom Board at sabarimalaonline.org) reaches its climax on January 14 — Makaravilakku, when 1.5-2M devotees concentrate at Sannidhanam in a single 24-hour window. The 5km trek from Pampa parking through Pampa Triveni to Sannidhanam takes 2-3 hours one-way for fit pilgrims, 4-5 for older devotees. Black-dhoti pilgrim attire — Lord Ayyappa''s 41-day vratham (austerity period of fasting, abstinence, no shaving) precedes the journey. Caste distinctions are erased on the trek; rich and poor walk in the same procession. Online TDB virtual queue ticket (sabarimalaonline.org) for Jan 14 darshan books 6 weeks ahead, ₹100 fee. Women aged 10-50 traditionally not permitted — the legal status fluctuates per Supreme Court rulings; the 2018 SC ruling allowed entry but subsequent challenges remain under consideration. Closest railhead Kottayam (100km), Cochin International (COK) 170km.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 2, 1, 'skip',
  'Mandala season ended Jan 14. Temple closed except 1st of Malayalam month brief openings. Skip.',
  NULL,
  'February is post-Mandala. The Sabarimala shrine is closed for the season except for brief 1st-of-Malayalam-month openings (Kumbham in February — 5-7 day window, exact dates published by Travancore Devaswom Board at sabarimalaonline.org). The 41-day Mandala season ended Jan 14.',
  'February in Sabarimala is post-Mandala — the 41-day Mandala-Makaravilakku pilgrimage window ended on January 14 and the shrine is closed for the regular season. The Travancore Devaswom Board (sabarimalaonline.org) publishes brief 1st-of-Malayalam-month openings — Kumbham (the Malayalam month starting roughly mid-February to mid-March) opens for a 5-7 day pooja window, exact dates verified each year on the TDB calendar. Outside these brief openings, the 5km Pampa-Sannidhanam trek route is closed, the trek path itself is unsafe-and-unmaintained, and Pampa parking facilities run skeleton operations. The 1.5-2M-pilgrim infrastructure (queue management, prasadam distribution, KSRTC special-bus services) is fully wound down. The Pampa River area at the base of the trek does run year-round but the destination itself is shrine-anchored. Daytime 18-22C, nights 7-10C, dry. The 100km drive from Kottayam railhead and 170km from Cochin International (COK) has no pilgrim-traffic during the brief Kumbham opening; outside that window, the shrine itself is closed. Skip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 3, 1, 'skip',
  'Post-Mandala closure. Temple opens only for brief 1st-of-Malayalam-month windows. Skip.',
  NULL,
  'March is post-Mandala closure. The shrine opens only for brief 1st-of-Malayalam-month openings (Meenam in March — 5-7 day window). Travancore Devaswom Board (sabarimalaonline.org) publishes exact dates. Outside these windows, the trek and shrine are closed.',
  'March in Sabarimala is in post-Mandala closure. The shrine opens only for the 1st-of-Malayalam-month brief openings — Meenam (the Malayalam month roughly mid-March to mid-April) opens for a 5-7 day pooja window, exact dates verified each year on the Travancore Devaswom Board calendar at sabarimalaonline.org. Outside these brief openings, the 5km Pampa-Sannidhanam trek route is closed, Pampa parking shuts, and KSRTC special-bus services from Kottayam, Pathanamthitta, Erumeli all suspended. Daytime 22-28C, nights 10-14C, the 914m hill begins entering pre-monsoon humidity in the last fortnight. The 1.5-2M-pilgrim infrastructure runs at year-low; the surrounding Pamba River-and-forest area itself is part of the Periyar Tiger Reserve buffer zone with restricted general access during off-season. The 100km drive from Kottayam railhead and 170km from Cochin International (COK) targets a closed shrine. Skip outside the brief Meenam opening window — and even those windows are devotee-specific rather than broad-tourist.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 4, 2, 'wait',
  'Vishu Apr 14 brief opening. Temple opens for 10-day Vishu window. Otherwise closed.',
  'April 14 is Vishu (Malayalam new year) — the shrine opens for a 10-day Vishu window. Travancore Devaswom Board (sabarimalaonline.org) publishes exact dates each year. Pilgrims gather for Vishukani darshan. Outside this window the shrine remains closed.',
  'April outside the Vishu 10-day opening is post-Mandala closure. The 5km Pampa-Sannidhanam trek route is closed, KSRTC special-bus services from Kottayam suspend, and Pampa parking runs skeleton operations. Outside Vishu, skip.',
  'April in Sabarimala is mostly closed except for the Vishu (Malayalam new year, April 14) brief opening. The Travancore Devaswom Board (sabarimalaonline.org) publishes a 10-day Vishu window each year — exact dates verify annually. The Vishu window draws 100,000-300,000 devotees for Vishukani darshan with Lord Ayyappa, a fraction of the Mandala-Makaravilakku 50M+ but still a significant pilgrim concentration. Daytime 25-30C at 914m, nights 14-18C, pre-monsoon humidity climbing. The 5km Pampa-Sannidhanam trek route opens only for the Vishu window. Online TDB virtual queue ticket (sabarimalaonline.org) for Vishu darshan books 2-3 weeks ahead, ₹100 fee. Black-dhoti pilgrim attire and 41-day vratham still expected for the Vishu window — though the pre-pilgrimage austerity period is interpreted more flexibly than for Mandala. Closest railhead Kottayam (100km), Cochin International (COK) 170km. Outside the 10-day Vishu window, the shrine is closed and the trek path is unsafe-and-unmaintained.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 5, 1, 'skip',
  'Post-Vishu closure. Temple opens only for brief 1st-of-Malayalam-month windows. Skip.',
  NULL,
  'May is post-Vishu closure. The shrine opens only for the 1st-of-Malayalam-month brief opening (Edavam in May — 5-7 day window). Travancore Devaswom Board (sabarimalaonline.org) publishes exact dates. Outside these windows, the trek and shrine are closed.',
  'May in Sabarimala is in post-Vishu closure. The shrine opens only for the 1st-of-Malayalam-month brief opening — Edavam (the Malayalam month roughly mid-May to mid-June) opens for a 5-7 day pooja window, exact dates verified each year on the Travancore Devaswom Board calendar at sabarimalaonline.org. Outside these brief openings, the 5km Pampa-Sannidhanam trek route is closed, Pampa parking shuts, and KSRTC special-bus services suspend. Daytime 26-32C at 914m, nights 17-21C, pre-monsoon humidity at 80 percent in the third week as evening thunderstorms hit the Western Ghats. The 1.5-2M-pilgrim infrastructure runs at year-low. The surrounding area is part of the Periyar Tiger Reserve buffer zone with restricted off-season access. The 100km drive from Kottayam railhead and 170km from Cochin International (COK) targets a closed shrine. Skip outside the brief Edavam opening window. The southwest monsoon arrives in Kerala on June 1 — the trek path and the Western Ghats hill are entering peak inaccessibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 6, 1, 'skip',
  'SW monsoon. Temple closed except 1st-of-Malayalam-month brief opening. Pampa River dangerous.',
  NULL,
  'June is when the southwest monsoon hits Kerala. Temple closed except for brief 1st-of-Malayalam-month opening (Mithunam in June). Pampa River dangerous in monsoon. The 5km trek path floods. Skip.',
  'June in Sabarimala is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 800-1000mm across 22-25 wet days at the 914m hill. Daytime 22-26C, humidity 95 percent. The shrine opens only for the 1st-of-Malayalam-month brief opening — Mithunam (the Malayalam month roughly mid-June to mid-July) opens for a 5-7 day pooja window, exact dates verified each year at sabarimalaonline.org. Outside this window, the trek path is closed, KSRTC special-bus services suspend, Pampa parking shuts. The Pampa River roars dangerous in monsoon — the 5km Pampa-Sannidhanam trek route through the Periyar Tiger Reserve buffer zone floods, with sections submerged on heavy-rain days. The Pampa Triveni confluence runs at full Western Ghats catchment volume. Closest railhead Kottayam (100km) — the trek itself is closed in everything but name. Wait for November when the Mandala-Makaravilakku window opens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 7, 1, 'skip',
  'Peak monsoon. Temple closed except 1st-of-Malayalam-month brief. Trek path dangerous.',
  NULL,
  'July is the wettest month at Sabarimala. Temple closed except brief 1st-of-Malayalam-month opening (Karkidakam in July). Trek path floods on heavy-rain days. Skip.',
  'July in Sabarimala is the wettest month of the south-Kerala hill year. Rainfall averages 1000-1200mm at the 914m hill across 26-28 wet days. Daytime 22-26C with humidity at 95 percent. The shrine opens only for the 1st-of-Malayalam-month brief opening — Karkidakam (the Malayalam month roughly mid-July to mid-August, the traditional Ayurveda month) opens for a 5-7 day pooja window, exact dates verified each year on the Travancore Devaswom Board calendar at sabarimalaonline.org. Outside this window, the 5km Pampa-Sannidhanam trek path floods on heavy-rain days, KSRTC special-bus services suspend, Pampa parking shuts. The Pampa River through the Periyar Tiger Reserve buffer zone runs at peak Western Ghats catchment volume. Closest railhead Kottayam (100km), Cochin International (COK) 170km — both targeting a closed shrine. Wait for the November Mandala-Makaravilakku window when the shrine opens for its 41-day pilgrimage season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 8, 1, 'skip',
  'Monsoon continues. Temple closed except 1st-of-Malayalam-month brief. Onam not Sabarimala-anchored.',
  NULL,
  'August holds the July rain pattern. Temple closed except brief 1st-of-Malayalam-month opening (Chingam in August — falls during Onam window). Onam (variable Aug-Sep) is a state-wide festival, not Sabarimala-anchored. Skip.',
  'August in Sabarimala runs the July monsoon pattern. Rainfall eases slightly to 700-900mm across 23-25 wet days at the 914m hill. Daytime 22-26C, humidity 95 percent. The shrine opens only for the 1st-of-Malayalam-month brief opening — Chingam (the Malayalam month starting roughly mid-August to mid-September, which contains the Onam festival period) opens for a 5-7 day pooja window, exact dates verified each year at sabarimalaonline.org. Onam (Atham to Thiruvonam, 10-day festival, variable date August-September) is Kerala''s biggest celebration — but Sabarimala is a pilgrimage shrine, not an Onam-anchored destination. The pookalam-and-sadhya cultural programming happens in Trivandrum, Kochi, Trichur, not at the closed-season hill. Outside the Chingam opening, the 5km trek path is closed and KSRTC special-bus services suspend. Closest railhead Kottayam (100km), Cochin International (COK) 170km — both targeting a closed shrine. Wait for November when the Mandala-Makaravilakku 41-day pilgrimage opens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 9, 1, 'skip',
  'Monsoon retreating. Temple closed except 1st-of-Malayalam-month brief. Skip — wait for Mandala.',
  NULL,
  'September is post-Onam closure. Temple opens only for brief 1st-of-Malayalam-month opening (Kanni in September). Trek path still wet. The Mandala-Makaravilakku 41-day window opens November 16-17. Wait.',
  'September in Sabarimala is in post-Onam-and-Karkidakam closure with the southwest monsoon retreating. Rainfall halves versus August to 300-500mm at the 914m hill, mostly first half. Daytime 22-26C, humidity easing toward 85 percent in the last fortnight. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). The shrine opens only for the 1st-of-Malayalam-month brief opening — Kanni (the Malayalam month roughly mid-September to mid-October) opens for a 5-7 day pooja window, exact dates verified each year on the Travancore Devaswom Board calendar at sabarimalaonline.org. Outside the Kanni opening, the 5km Pampa-Sannidhanam trek path is still wet and closed, KSRTC special-bus services suspend, Pampa parking shuts. The Mandala-Makaravilakku 41-day pilgrimage window opens around November 16-17 (exact date verified annually) — the shrine''s peak operating season is 8-10 weeks away. Closest railhead Kottayam (100km), Cochin International (COK) 170km. Wait.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 10, 1, 'skip',
  'Pre-Mandala closure. Temple opens only for 1st-of-Malayalam-month brief. Mandala opens Nov 16-17.',
  NULL,
  'October is pre-Mandala closure. Temple opens only for brief 1st-of-Malayalam-month opening (Thulam in October — 5-7 day pooja). The 41-day Mandala-Makaravilakku window opens November 16-17. Wait three more weeks.',
  'October in Sabarimala is pre-Mandala closure. Rainfall under 200mm at the 914m hill — late-monsoon spillover wraps in the first 10 days, the Periyar Tiger Reserve buffer zone dries out by month-end. Daytime 21-25C, nights 14-18C. The shrine opens only for the 1st-of-Malayalam-month brief opening — Thulam (the Malayalam month roughly mid-October to mid-November) opens for a 5-7 day pooja window, exact dates verified each year on the Travancore Devaswom Board calendar at sabarimalaonline.org. Outside the Thulam opening, the 5km Pampa-Sannidhanam trek path remains closed, KSRTC special-bus services suspend, Pampa parking shuts. The 41-day Mandala-Makaravilakku window opens November 16-17 in the typical Malayalam calendar (verify exact date for current year on TDB). Devotee preparation — the 41-day vratham (austerity period of fasting and abstinence) — begins in early-mid October for those targeting the December and January peak-darshan windows. Closest railhead Kottayam (100km), Cochin International (COK) 170km. Wait three more weeks for the full Mandala season opening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 11, 5, 'go',
  'Mandala-Makaravilakku opens Nov 16-17. 19-25C at 914m. 5km Pampa-Sannidhanam trek active.',
  'November 16-17 (verify current-year date on sabarimalaonline.org) marks the start of the 41-day Mandala-Makaravilakku pilgrimage window. Pilgrim load builds steadily through December. Online TDB virtual queue (sabarimalaonline.org) opens 6 weeks ahead — book early.',
  NULL,
  'November in Sabarimala is when the world''s second-largest pilgrimage opens for its 41-day Mandala-Makaravilakku window. The exact opening date varies year-to-year (typically November 16 or 17, verify on the Travancore Devaswom Board calendar at sabarimalaonline.org). Daytime 19-25C at 914m, nights 12-15C, dry. The 50M+ annual pilgrim total concentrates in this 41-day window plus the brief 1st-of-Malayalam-month openings — November sees 200-500K devotees per day building through the month. The 5km Pampa-Sannidhanam trek (Pampa parking → Pampa Triveni confluence → Sannidhanam) takes 2-3 hours one-way for fit pilgrims. Black-dhoti pilgrim attire — the 41-day vratham (austerity period of fasting, abstinence, no shaving) precedes the trek. Caste distinctions are erased; egalitarian access. Online TDB virtual queue ticket (sabarimalaonline.org) for darshan books 6 weeks ahead, ₹100 fee. Women aged 10-50 traditionally not permitted — current legal status: 2018 Supreme Court ruling allowed entry, subsequent challenges still under consideration. KSRTC special-bus services from Kottayam, Pathanamthitta, Erumeli all run. Closest railhead Kottayam (100km), Cochin International (COK) 170km.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('sabarimala', 12, 5, 'go',
  'Mandala peak-build. 8-22C at 914m. 5-10M pilgrims pass through in December alone. Book virtual queue 6 weeks ahead.',
  'December is peak-build for the Mandala-Makaravilakku window. 5-10M devotees pass through in December alone. Online TDB virtual queue (sabarimalaonline.org) for darshan books 6-8 weeks ahead. The Sabarimala season runs at full capacity.',
  NULL,
  'December in Sabarimala is the peak-build month of the 41-day Mandala-Makaravilakku window. Daytime 18-22C at 914m, nights 8-12C — among the coldest of the southern Western Ghats winter. 5-10 million devotees pass through Sannidhanam in December alone, building toward the January 14 Makaravilakku climax. The 5km Pampa-Sannidhanam trek (Pampa parking → Pampa Triveni confluence → Sannidhanam) at peak load — wait times in the queue compounds at darshan vary 6-12 hours without virtual booking, 30-90 minutes with TDB virtual queue tickets (sabarimalaonline.org, ₹100 fee, books 6-8 weeks ahead through December). Black-dhoti pilgrim attire — the 41-day vratham (austerity period of fasting, abstinence, no shaving) preceding the trek. Egalitarian — caste distinctions erased on the trek. Women aged 10-50 traditionally not permitted (2018 Supreme Court ruling allowed entry, subsequent challenges still under consideration as of writing). KSRTC special-bus services run from Kottayam, Pathanamthitta, Erumeli at maximum capacity. Closest railhead Kottayam (100km), Cochin International (COK) 170km — book transfers 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
