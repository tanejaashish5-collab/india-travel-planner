-- Kollam destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: kollam

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 1, 5, 'go',
  'Peak window. 23-31C, dry. Ashtamudi Lake calm. Kollam-Alleppey 8-hour SWTD cruise daily.',
  'January is when Kollam runs at its strongest. Ashtamudi Lake (Kerala''s 2nd-largest, Ramsar wetland) calm and clear. Munroe Island canoe trips (community-run) ₹500-1000/2-3 hours. Kollam-Alleppey State Water Transport cruise — India''s longest scheduled backwater journey, 8 hours, ₹400-500/person, daily 10:30am from Kollam jetty.',
  NULL,
  'Kollam in January is the version of Kerala backwaters that buyers picking quiet over volume should book. Daytime sits at 24-31C, nights drop to 22C, Ashtamudi Lake at 25C, humidity below 70 percent. Ashtamudi — Kerala''s 2nd-largest lake (61 sq km, Ramsar wetland) — sits at year-best clarity. The standout activity is the Kollam-Alleppey State Water Transport Department (SWTD) cruise — India''s longest scheduled backwater journey at 80km and 8 hours, ₹400-500/person, daily 10:30am from Kollam jetty (boat seats 50-60). Munroe Island canoe trips through 8 connected backwater villages run ₹500-1000 for 2-3 hours, community-run by Munroe Island Tourism Society — book through Kerala Tourism. Houseboat day-cruises from Kollam jetty ₹3-5k/6 hours, overnight ₹8-15k non-AC, ₹15-25k AC. Hotels: Raviz Resort Kollam ₹12-22k, Holiday Inn Express Kollam ₹6-10k, Hotel Sudarsan ₹3-5k. Kollam Junction railway is the gateway to South Kerala. Backwater alternative for travelers wanting to avoid Alleppey-Kumarakom volume.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 2, 5, 'go',
  'Driest month. 24-32C. Munroe Island canoe trips at year-best. SWTD cruise daily.',
  'February delivers Kollam''s cleanest weather. Rainfall under 5mm, Ashtamudi Lake at year-best, Munroe Island canoes through 8 villages at peak. Kollam-Alleppey SWTD cruise daily.',
  NULL,
  'February in Kollam is the year''s cleanest weather window. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent — the lowest of the year. Ashtamudi Lake (Ramsar) at year-best clarity. Munroe Island canoe trips through 8 connected backwater villages run at peak community-run schedule — 2-3 hour trips ₹500-1000, smaller numbers and quieter than Alleppey. Kollam-Alleppey SWTD cruise daily 10:30am, India''s longest scheduled backwater journey (80km, 8 hours, ₹400-500). Houseboat overnight cruises ₹8-15k non-AC and ₹15-25k AC; Kollam-side operators include Aquaserene Houseboats and Kollam Houseboats. Hotels at peak: Raviz Resort Kollam ₹14-24k (the heritage anchor on Ashtamudi), Holiday Inn Express ₹7-12k, Nani Hotel Kollam ₹3-5k. Long-stay (5+ night) rates negotiable from mid-month. Kollam Junction railway is the gateway to South Kerala — Trivandrum 75km south, Alleppey 80km north, Kochi 150km north. Cashew Festival (Kollam is India''s cashew-processing capital — 70% of national output) typically runs late February — verify dates via Kerala Tourism.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 3, 4, 'go',
  'Last cool month. 25-33C. Hotel rates slide 20 percent. SWTD cruise daily.',
  'March extends February''s weather minus the peak crunch. Munroe Island canoes shift to morning-only. SWTD cruise still daily. Hotel rates 20-25 percent below February peak.',
  NULL,
  'March in Kollam is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week, Ashtamudi Lake at 28C. Munroe Island canoe trips compress to 6-9am only; afternoon trips suspend due to heat. Kollam-Alleppey SWTD cruise still daily 10:30am — afternoon shaded by deck canopy makes the 8-hour trip workable. Houseboat overnight cruises hold AC-bias from mid-month. Hotel rates drop 20-25 percent versus February peak: Raviz Resort Kollam ₹11-19k, Holiday Inn Express ₹5-9k, Nani Hotel Kollam ₹2.5-4k. Kollam Junction railway full schedules — KSRTC bus to Alleppey ₹70 (2.5 hours), to Trivandrum ₹85 (2 hours), to Kochi ₹160 (3.5 hours). Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. Munroe canoes dawn-only. Vishu Apr 14.',
  'April pushes Kollam into pre-monsoon. Munroe Island canoe trips dawn-only. Vishu (April 14) brings sadhya at major hotels. SWTD cruise still daily. AC-room comfort holds.',
  'April pushes Kollam into pre-monsoon stress. Outdoor Munroe Island canoes unbearable past 8am, mid-day requires AC room. Wait for late October.',
  'April in Kollam is when the trip narrows to early morning and evening. Daytime 28-34C, humidity 80 percent, Ashtamudi Lake at 30C. Munroe Island canoe trips workable 6-9am only. Kollam-Alleppey SWTD cruise still daily 10:30am — the boat''s deck canopy makes the 8-hour journey workable but cabin-class non-existent (open-deck shaded benches only). Vishu (April 14, Malayalam new year) lands across major hotels with full Vishukani arrangements at dawn (gold, rice, kanikkonna flowers in front of mirrors) and 26-28 dish sadhya lunches — Raviz Resort Kollam runs special Vishu packages, ₹2-3k per person beyond room rates. Hotel rates run 30-35 percent below February peak: Raviz Resort Kollam ₹9-17k, Holiday Inn Express ₹4-8k, Nani Hotel Kollam ₹2-3.5k. Friday-Sunday Bangalore weekend traffic continues; weekday occupancy under 50 percent. The trip works for travelers willing to anchor on early-morning programmes and AC-room afternoons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 5, 2, 'wait',
  'Pre-monsoon plus arriving squalls. 28-34C, humidity 85 percent. Hotel rates at year-low.',
  NULL,
  'May runs hot and sticky on Ashtamudi. Pre-monsoon thunderstorms hit weeks three and four. Munroe Island canoes operate sub-50 percent schedule, hotels 50 percent occupancy. Wait for October.',
  'May in Kollam is the closing month before the southwest monsoon. Daytime 29-34C, humidity 85 percent. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls that knock grid power 1-2 hours and raise humidity to 90 percent for 24 hours. Munroe Island canoe trips operate 50 percent schedule, cancel half the morning slots due to thunderstorm risk. Kollam-Alleppey SWTD cruise still daily but late-May runs through afternoon storms — pack a poncho and accept that the 8-hour journey may end with rain. Hotel rates at year-low: Raviz Resort Kollam ₹8-14k, Holiday Inn Express ₹4-7k, Nani Hotel Kollam ₹1.8-3k. Houseboat day-cruises run sub-50 percent schedule. Friday-Sunday occupancy holds at 50-55 percent. Push to mid-October if comfort matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 6, 2, 'wait',
  'SW monsoon. 25-30C, 600-700mm rain. Cruising in 6-8 hour deluges grim.',
  'June is when the southwest monsoon arrives. SWTD cruise still operates daily but 8-hour journey through grey rain is uncomfortable. Munroe Island canoes suspend due to channel current. Hotel rates at year-low.',
  'June pushes Kollam into monsoon. Cruising on the 8-hour SWTD route through 6-8 hour deluges is uncomfortable; Munroe Island canoes suspended due to channel current. Push to October.',
  'June in Kollam is when the southwest monsoon takes Ashtamudi. The current arrives around June 1 (Kerala receives monsoon onset first in India — IMD announces formal date annually from Thiruvananthapuram). Rainfall jumps to 600-700mm across 22-25 wet days. Daytime 25-30C, humidity 90 percent. SWTD cruise still operates daily 10:30am but the 8-hour journey through grey rain is uncomfortable — boat deck canopy keeps passengers dry but views collapse. Munroe Island canoe trips suspend due to channel current speed (the village waterways flood). Houseboat overnight cruises run but views similarly collapse. Hotel rates at year-low: Raviz Resort Kollam ₹7-12k, Holiday Inn Express ₹3.5-6k, Nani Hotel Kollam ₹1.5-2.5k. Karkidakam Ayurveda month opens mid-July at backwater resorts (Coconut Lagoon CGH Kumarakom, 100km north) — Kollam itself is not an Ayurveda destination. Push to October for the standard cruise-and-canoe trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 7, 1, 'skip',
  'Peak monsoon. 25-29C, 700-800mm rain. SWTD cruise reduces. Munroe canoes closed.',
  NULL,
  'July is the wettest month at Kollam. SWTD cruise reduces frequency or cancels on rough-weather days. Munroe Island canoes closed through monsoon. Backwater trip closed. Skip; wait for October.',
  'July in Kollam is monsoon at its most stubborn. Rainfall averages 750mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 25-29C, humidity 92 percent. Kerala State Water Transport Department (SWTD) reduces Kollam-Alleppey cruise frequency or cancels on rough-weather days — typical July sees 8-12 cancellations across the month. Munroe Island canoe trips closed through the full monsoon (June 15 to September 30 by Munroe Island Tourism Society rule). Houseboat overnight cruises run but at sub-30 percent occupancy. Hotel rates at year-low: Raviz Resort Kollam ₹6-10k, Holiday Inn Express ₹3-5k, Nani Hotel Kollam ₹1.2-2k. Some smaller hotels run 4-6 week monsoon maintenance windows. The trip Kollam sells — backwater quiet, Munroe canoes, SWTD cruise — runs at zero through July. Wait for October when the cycle reopens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 8, 2, 'wait',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026). Munroe canoes still closed.',
  'August is rain-heavy with Onam. Hotels run sadhya at Raviz Resort and Holiday Inn Express. SWTD cruise reduces frequency. Munroe canoes still closed through monsoon. Worth a 1-2 day visit for Onam.',
  'August holds monsoon at Kollam — Munroe Island canoes closed and SWTD cruise reduces frequency on rough days. Worth visiting only for Onam sadhya at Raviz Resort or Holiday Inn Express.',
  'August in Kollam pairs the southwest monsoon with the Onam state holiday cluster. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org). Raviz Resort Kollam and Holiday Inn Express Kollam run elaborate sadhya lunches: 26-28 dishes on banana leaf, ₹1500-2500 per person, plus Onam packages with cultural programmes (Kathakali demos, Vallamkali viewing trips to Aranmula 70km north). SWTD cruise reduces frequency through monsoon — typical August sees 10-15 cancellations. Munroe Island canoes still closed (reopen October 1). Aranmula Boat Race on the Pampa River (early September during Onam tail) is the religious vallam kali — Aranmula 70km north by NH-66, Pampa village reachable by KSRTC bus. Hotel rates climb 20-25 percent through Onam week (lock 4-6 weeks ahead): Raviz Resort Kollam ₹10-15k versus August baseline ₹7-12k. Worth a 1-2 day visit specifically for Onam; otherwise wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. SWTD cruise rebuilding. Munroe canoes reopen Oct 1.',
  'September is the recovery. SWTD cruise returns to daily schedule late month. Munroe canoes reopen October 1. Hotel rates climbing from August lows. Worth a 2-3 day visit only if dates are fixed.',
  'September is rebuild-not-yet-clean at Kollam. Munroe canoes still closed through the month. Push to mid-October for the proper backwater shape.',
  'September in Kollam is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Aranmula Boat Race on the Pampa River (early September during Onam tail, religious vallam kali, Aranmula Parthasarathy Temple festival) lands on Uthrattadi day — verify exact date via Kerala Tourism. SWTD Kollam-Alleppey cruise returns to daily 10:30am schedule from mid-month. Munroe Island canoes reopen October 1 (Munroe Island Tourism Society rule). Houseboat overnight cruises return to full schedule. Hotel rates climb 15-20 percent versus August lows: Raviz Resort Kollam ₹9-15k, Holiday Inn Express ₹4-7k, Nani Hotel Kollam ₹2-3k. The full clean cruising-and-canoe window opens from October 5-15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 10, 4, 'go',
  'Season opens. 24-30C, 200-250mm late-monsoon spillover. Munroe canoes reopen.',
  'October is the season-opener at Kollam. Munroe Island canoes reopen October 1, SWTD cruise daily, late-monsoon spillover still 200-250mm but second half clean. Hotel rates 25-30 percent below December.',
  NULL,
  'October in Kollam is the proper return to coherent. Munroe Island canoe trips reopen October 1 (Munroe Island Tourism Society rule). Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean cruise mode. Daytime 25-30C, humidity falling from 85 to 75 percent, Ashtamudi Lake at 27C. Kollam-Alleppey SWTD cruise daily 10:30am at full passenger load (₹400-500/person, 8 hours, India''s longest scheduled backwater journey). Munroe canoe trips ₹500-1000 for 2-3 hours through 8 backwater villages. Houseboat overnight cruises ₹8-15k non-AC, ₹15-25k AC. Hotel rates 25-30 percent below December peak: Raviz Resort Kollam ₹10-17k, Holiday Inn Express ₹5-8k, Nani Hotel Kollam ₹2.5-4k. Pack a poncho rather than an umbrella for the first half — coastal winds make umbrellas useless. Strong value window for first-time Kollam visitors who want backwaters minus Alleppey volume.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Ashtamudi at year-best. Hotel rates 20 percent below Dec.',
  'November is the proper pivot to peak. Rainfall under 50mm, Ashtamudi at year-best, Munroe canoes and SWTD cruise at full schedule. Hotel rates 20-25 percent below December peak.',
  NULL,
  'November in Kollam is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent, Ashtamudi Lake at year-best. Munroe Island canoe trips at full schedule — ₹500-1000 for 2-3 hours through 8 backwater villages, community-run. Kollam-Alleppey SWTD cruise daily 10:30am, ₹400-500/person. Houseboat overnight cruises ₹8-15k non-AC, ₹15-25k AC. Hotel rates climb to 75-80 percent of December peak: Raviz Resort Kollam ₹13-22k, Holiday Inn Express ₹6-10k, Nani Hotel Kollam ₹3-5k. Friday-Sunday traffic from Bangalore-Chennai pushes occupancy to 75 percent at major hotels. Kollam Junction railway is the gateway to South Kerala — Trivandrum 75km south, Alleppey 80km north, Kochi 150km north. Cashew Festival (Kollam is India''s cashew-processing capital — 70 percent of national output) typically runs late November-February — verify exact dates via Kerala Tourism. Strong call for first-time visitors who want quiet backwaters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kollam', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 1.8-2.2x. SWTD cruise daily.',
  'December is when Kollam runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 1.8-2.2x normal (lower spike than Alleppey). SWTD cruise daily, Munroe canoes at peak. Lock hotels 4-5 weeks ahead.',
  NULL,
  'December in Kollam is the operational peak — quiet Kerala backwaters at their most expensive. Daytime 23-30C, nights 21-22C, rainfall under 30mm, Ashtamudi Lake at 25C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.8-2.2x the November baseline (lower spike than Alleppey or premium Kumarakom): Raviz Resort Kollam hits ₹22-32k, Holiday Inn Express ₹10-15k, Nani Hotel Kollam ₹5-7k. Munroe Island canoe trips at peak — community-run schedule sees 3-4 daily slots from village jetty. Kollam-Alleppey SWTD cruise daily 10:30am at full capacity (often sells out 24-48 hours ahead through peak week). Houseboat overnight cruises ₹15-25k non-AC, ₹25-40k AC, peak-week 50 percent uplift. Kollam Junction railway at peak capacity. Cochin International Airport 150km north (3-3.5 hours by NH-66). Lock hotels 4-5 weeks ahead from October. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak rates and gridlock.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
