-- Thrissur destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: thrissur

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 1, 4, 'go',
  'Peak window. 22-31C, dry. Vadakkunnathan Temple at full visiting hours. Round-city walk comfortable.',
  'January is when Thrissur runs at its strongest outside of Pooram. Daytime 22-31C, dry, low humidity. Vadakkunnathan Temple (UNESCO tentative list, 9th century) at full visiting hours. Round-city walk (Tekkinkadu Maidanam at center, perimeter 1.6km) comfortable through afternoon. Pooram is April-May; January is the cleanest non-festival window.',
  NULL,
  'Thrissur in January is the version of Kerala''s cultural capital that buyers picking heritage over festival should book first. Daytime sits at 24-31C, nights drop to 22C, humidity below 70 percent. Vadakkunnathan Temple (UNESCO tentative list, 9th-century Shiva temple at the center of the round city) opens 4am-9pm with Hindu-only sanctum entry (dress code: men dhoti or mundu, women saree or salwar-kurta). Tekkinkadu Maidanam — the 1.6km circular ground that defines Thrissur''s round-city layout — holds afternoon strollers. Sakthan Thampuran Palace (1795) ₹25 entry, 9:30am-4:30pm. Kerala Sahitya Akademi, Kerala Lalitha Kala Akademi, and KFRI all walk-in 9am-5pm. Trichur Railway is the gateway — Kochi 75km south (1.5 hours), Calicut 130km north (3 hours). Hotels: Casino Hotel Thrissur ₹4-8k, Hotel Joys Palace ₹3-5k, Yuvarani Residency ₹2.5-4k. Pathans for Malabar biriyani, Bharat Hotel for Kerala thali, Indian Coffee House (1957). Christmas-NYE rate spike eases by January 5.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 2, 4, 'go',
  'Driest month. 23-32C. Heritage walking at year-best. KFRI and Akademi events steady.',
  'February delivers Thrissur''s cleanest weather. Rainfall under 5mm, heritage walking at year-best, the Sahitya and Lalitha Kala Akademi calendars kick into spring programmes (literary readings, art shows). Pre-Pooram lull — last quiet month before April-May festival rush.',
  NULL,
  'February in Thrissur is the year''s cleanest weather window. Rainfall under 5mm, daytime 24-32C, humidity at 60 percent — the lowest of the year. The 1.6km Tekkinkadu Maidanam round-city walk is at year-best; the perimeter delivers Vadakkunnathan Temple from 4 angles (the temple sits at the geographic center). Sahitya Akademi (Kerala''s state literary academy, founded 1956) and Lalitha Kala Akademi (state visual arts) kick into spring programmes — readings, exhibitions, talks weekly through February. Sakthan Thampuran Palace at ₹25 entry; Archaeological Museum walk-in. KFRI campus tours by appointment. Hotels: Casino Hotel Thrissur ₹4-8k, Hotel Joys Palace ₹3-5k, Yuvarani Residency ₹2.5-4k. Pathans Restaurant Malabar biriyani ₹220-300, Bharat Hotel Kerala thali ₹150-220, Indian Coffee House (1957). Last quiet month before April-May Pooram pushes the city into festival-tier rate spikes. Trichur Railway runs full schedules — Kochi 75km south (1.5 hours by car or train), Calicut 130km north (3 hours).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 3, 4, 'go',
  'Last cool month. 24-33C. Pre-Pooram setup begins. Heritage walks comfortable mornings.',
  'March extends February''s weather. Pre-Pooram caparison preparation visible at temple workshops. Heritage walks early-morning. Hotel rates hold steady — Pooram is April-May, no early-bird crunch yet.',
  NULL,
  'March in Thrissur is the soft-landing month before Pooram. Daytime 25-33C, humidity climbing toward 75 percent in the last week. Pre-Pooram preparation begins visibly through the city — caparison-makers (the elaborate gold-plated headgear and umbrellas for the festival elephants) work across small workshops, panchavadyam orchestra rehearsals at Vadakkunnathan and Thiruvambadi Temple courtyards through afternoons, and the Thiruvambadi-Paramekkavu rivalry preparations begin (the two temples compete with each other in the Pooram fireworks display). Heritage walks early-morning. Round-city Tekkinkadu Maidanam circuit holds afternoon strollers. Hotels at steady rates — Pooram is April-May, no early-bird crunch yet: Casino Hotel Thrissur ₹3-6k, Hotel Joys Palace ₹2.5-4k, Yuvarani Residency ₹2-3k. Last comfortable window before April pushes the city into Pooram-week heat plus festival rate spikes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 4, 5, 'go',
  'Pooram month. 27-35C, hot. Thrissur Pooram on Pooram star Medam (typically late Apr or early May).',
  'April is when Thrissur Pooram lands — India''s grandest temple festival. 100+ caparisoned elephants, panchavadyam orchestra (5 instruments), all-night fireworks competition between Thiruvambadi and Paramekkavu temples. Tickets free (outdoor) but accommodation triple-priced. Lock hotels 3-6 months ahead.',
  NULL,
  'April in Thrissur is dominated by Thrissur Pooram — India''s grandest temple festival, drawing 1-2 million visitors over 36 hours. Daytime 28-35C, humidity 80 percent — heat is brutal, but festival energy carries the day. The Pooram falls on the Pooram nakshatram in Malayalam Medam — typically late April to early May (verify 2026 date via Kerala Tourism keralatourism.org). The ritual: 100+ caparisoned temple elephants from 10 surrounding temples gather at Vadakkunnathan precincts; panchavadyam (5-instrument orchestra: thimila, maddalam, ilathalam, edakka, kombu) plays for hours; Thiruvambadi and Paramekkavu temples compete in the most celebrated rivalry in Kerala festival culture. The Kudamattam (umbrella-changing) ceremony on Pooram evening is the visual peak. All-night fireworks (Vedikkettu) competition runs 4am-6am. Outdoor festival is ticket-free but accommodation triple-priced (Casino Hotel Thrissur ₹12-20k versus February ₹4-8k, Hotel Joys Palace ₹8-12k versus ₹3-5k). Lock hotels 3-6 months ahead. Vishu (April 14) lands during Pooram month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 5, 4, 'go',
  'Pooram month if late dates. 28-34C, humidity 80 percent. Festival continues if Pooram lands May.',
  'May can hold Pooram if the Pooram nakshatram falls late — 30 percent of years see the festival in early May. Otherwise Pooram tail (week-after fireworks Display Vedikkettu, smaller temple poorams across district). Heritage walks dawn-only. Hotel rates 30 percent below Pooram peak.',
  NULL,
  'May in Thrissur depends on the lunar calendar. Pooram falls on the Pooram nakshatram in Malayalam Medam — typically late April but can land in early May (roughly 30 percent of years). Verify exact 2026 date via Kerala Tourism keralatourism.org. If Pooram is May-dated, the first week sees India''s grandest temple festival with 100+ caparisoned elephants, panchavadyam orchestra, and Thiruvambadi-Paramekkavu fireworks competition. If Pooram has already passed in April, May runs the Pooram tail — week-after fireworks displays (Vedikkettu) and smaller temple poorams across the district (Arattupuzha Pooram is the largest of the smaller poorams, 14km from Thrissur). Daytime 29-34C, humidity 80 percent — Pooram-attending crowds tolerate heat through cultural intensity, casual visitors compress to 5:30-9am and 6-8pm only. Hotel rates 30 percent below Pooram week (off-festival) — Casino Hotel Thrissur ₹3.5-7k, Hotel Joys Palace ₹2.5-4k. Pre-monsoon thunderstorms hit weeks three and four. Vadakkunnathan Temple full hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 6, 2, 'wait',
  'SW monsoon. 25-30C, 600-700mm rain. Heritage walks rain-interrupted. Pooram tail done.',
  'June is when the southwest monsoon arrives. Heritage walks rain-interrupted, the round-city circuit becomes wet stroll only. Hotel rates at year-low. Pooram tail finished (May).',
  'June pushes Thrissur into monsoon. Heritage walks rain-interrupted, the Pooram-tail energy is gone. Indoor temple-and-museum days only. Wait for late October.',
  'June in Thrissur is when the southwest monsoon arrives. The current hits Kerala on or around June 1 (IMD announces formal Kerala monsoon onset annually from Thiruvananthapuram). Rainfall jumps to 600-700mm across 22-25 wet days, daytime 25-30C, humidity 90 percent. Heritage walks rain-interrupted; the Tekkinkadu Maidanam round-city circuit becomes wet stroll only. Vadakkunnathan Temple, Sakthan Thampuran Palace, Sahitya and Lalitha Kala Akademi all hold their hours — an indoor heritage day works. Pooram-tail energy from April-May is gone; the next major festival (small village poorams) lands monsoon-onwards but on smaller scale. Hotel rates at year-low: Casino Hotel Thrissur ₹2.5-5k, Hotel Joys Palace ₹1.8-3k, Yuvarani Residency ₹1.5-2.5k. Karkidakam Ayurveda month opens mid-July at backwater resorts (Coconut Lagoon CGH Kumarakom 80km south) — Thrissur itself is not a primary Ayurveda destination. The trip works for indoor heritage days only; outdoor circuit waits for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 7, 1, 'skip',
  'Peak monsoon. 25-29C, 700-800mm rain. Heritage walks impossible.',
  NULL,
  'July is the wettest month at Thrissur with rainfall 750mm across 25-27 wet days. Heritage walks impossible, the Tekkinkadu round-city circuit floods at low spots, indoor museums and Akademi venues run reduced hours. Skip; wait for October.',
  'July in Thrissur is monsoon at its most stubborn. Rainfall averages 750mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 25-29C, humidity 92 percent. Heritage walks completely rain-blocked; the Tekkinkadu Maidanam round-city circuit floods at low spots; Vadakkunnathan Temple, Sakthan Thampuran Palace, and the Akademi venues hold reduced hours through the month. Hotel rates at year-low: Casino Hotel Thrissur ₹2-4.5k, Hotel Joys Palace ₹1.5-2.8k, Yuvarani Residency ₹1.2-2.2k. The trip Thrissur sells — heritage walking, festival energy, Vadakkunnathan-Tekkinkadu circuit — runs at zero in July. Karkidakam Ayurveda is the only Kerala draw of the month, but Thrissur is not the destination for it. Wait for October when the city dries out.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 8, 4, 'go',
  'Monsoon plus Onam plus Pulikali. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026). Pulikali Day 4 of Onam.',
  'August holds monsoon but Pulikali (Tiger Dance) on Day 4 of Onam at Swaraj Round (Tekkinkadu Maidanam) is Thrissur''s standout Onam draw — 200+ painted dancers in tiger costumes performing across the round city. Onam sadhya across all hotels. Lock 6-8 weeks ahead.',
  NULL,
  'August in Thrissur is the year''s standout cultural month outside of Pooram. The Onam Pulikali (Tiger Dance) on Day 4 of Onam at Swaraj Round (Tekkinkadu Maidanam) is Thrissur''s signature Onam draw — 200+ painted dancers in tiger and hunter costumes parade through the round city, drumming, dancing, performing acrobatics. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org); Pulikali typically lands Day 4 (around Aug 28-29 in 2026). Daytime 25-29C, humidity 88 percent, rainfall 500-600mm across 22-25 wet days — Pulikali holds its full schedule even in heavy rain. Casino Hotel Thrissur, Hotel Joys Palace, and Yuvarani Residency run elaborate Onam sadhya lunches: 26-28 dishes on banana leaf, ₹500-1500 per person, plus Pulikali-viewing packages with reserved Tekkinkadu balcony seating ₹1500-3000. Hotel rates climb 80-100 percent through Pulikali week (lock 6-8 weeks ahead): Casino Hotel Thrissur ₹6-12k versus August baseline ₹2.5-5k. Worth the trip for Pulikali.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Onam tail. Heritage walks improving.',
  'September is the recovery. SW monsoon retreats through second half. Onam Pulikali tail through first week. Heritage walks slowly returning. Worth a 2-3 day visit if dates fixed.',
  'September is rebuild-not-yet-clean at Thrissur. Heritage walks rain-interrupted through the first three weeks. Push to mid-October for the proper round-city shape.',
  'September in Thrissur is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Onam Pulikali tail through the first week — smaller village pulikali performances continue across Thrissur district. Heritage walks return mid-month — Tekkinkadu Maidanam round-city circuit, Vadakkunnathan Temple, Sakthan Thampuran Palace, Sahitya and Lalitha Kala Akademi all to full hours from mid-September. Hotel rates climb 15-20 percent versus August lows: Casino Hotel Thrissur ₹3-6k, Hotel Joys Palace ₹2.2-4k, Yuvarani Residency ₹1.8-3k. Friday-Sunday Bangalore weekend traffic resumes. The full clean walking window opens from October 5-15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 10, 4, 'go',
  'Season opens. 24-30C, 200-250mm late-monsoon spillover. Heritage walks fully return.',
  'October is the season-opener at Thrissur. Heritage walks fully return mid-month — Vadakkunnathan Temple, Sakthan Thampuran Palace, Sahitya and Lalitha Kala Akademi back to full hours. Hotel rates 25-30 percent below December peak. Strong value window.',
  NULL,
  'October in Thrissur is the proper return to coherent. Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean walking weather. Daytime 25-30C, humidity falling from 85 to 75 percent. Tekkinkadu Maidanam round-city circuit at full afternoon use; Vadakkunnathan Temple, Sakthan Thampuran Palace, Sahitya and Lalitha Kala Akademi, KFRI all at full hours. Hotel rates 25-30 percent below December peak: Casino Hotel Thrissur ₹3.5-7k, Hotel Joys Palace ₹2.5-4.5k, Yuvarani Residency ₹2-3.5k. Pathans Restaurant Malabar biriyani, Bharat Hotel Kerala thali, Indian Coffee House (1957) all run full schedules. Trichur Railway full timetable. Pack a poncho rather than an umbrella for the first half — coastal Kerala winds make umbrellas useless. Strong value window for first-time heritage visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 11, 4, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Heritage walks at year-best. Akademi calendars active.',
  'November delivers full peak. Rainfall under 50mm. Vadakkunnathan, Tekkinkadu Maidanam, Sahitya and Lalitha Kala Akademi calendars at full strength. Hotel rates 15-20 percent below December peak.',
  NULL,
  'November in Thrissur is among the year''s best months for the heritage circuit. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent. Vadakkunnathan Temple at full hours, Sakthan Thampuran Palace at peak walk-in, Sahitya and Lalitha Kala Akademi calendars active with literary readings, theatre festivals, and art exhibitions. The 1.6km Tekkinkadu Maidanam round-city circuit at year-best afternoon use. Hotel rates climb to 80-85 percent of December peak: Casino Hotel Thrissur ₹4.5-9k, Hotel Joys Palace ₹3.5-5.5k, Yuvarani Residency ₹2.8-4.5k. Pathans Malabar biriyani, Bharat Hotel Kerala thali, Indian Coffee House (1957) all peak. Friday-Sunday Bangalore weekend traffic pushes occupancy to 70 percent. Trichur Railway is the gateway — Kochi 75km south (1.5 hours), Calicut 130km north (3 hours). Strong call for first-time Kerala heritage visitors who want full Cultural Capital programme minus the December-festival rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thrissur', 12, 4, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 1.6-2x. Heritage walks at peak.',
  'December delivers peak weather minus the Pooram-tier festival load. Christmas-NYE rates 1.6-2x normal (lower spike than coastal Kerala). Vadakkunnathan + heritage circuit full hours. Lock hotels 3-4 weeks ahead.',
  NULL,
  'December in Thrissur is peak weather minus the Pooram-tier festival rate spike. Daytime 23-30C, nights 21-22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.6-2x the November baseline (lower spike than coastal Kerala — Thrissur is heritage-centric not beach-centric): Casino Hotel Thrissur hits ₹7-12k, Hotel Joys Palace ₹5-8k, Yuvarani Residency ₹4-6k. Vadakkunnathan Temple, Sakthan Thampuran Palace, Sahitya and Lalitha Kala Akademi all at full hours; the Tekkinkadu Maidanam round-city circuit at peak walking. Pathans Malabar biriyani, Bharat Hotel Kerala thali, Indian Coffee House (1957) hold full schedules. Trichur Railway at peak capacity — Kochi 75km south (1.5 hours by car or train). The first three weeks of December (before December 22) are the better-value window — peak weather minus peak rates. December lacks the Pooram festival energy of April-May; for that, plan the trip 4-6 months ahead for the Pooram lunar date.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
