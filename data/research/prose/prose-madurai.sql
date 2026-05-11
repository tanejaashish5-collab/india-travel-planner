-- Madurai destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: madurai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 1, 5, 'go',
  'Pongal + Jallikattu week. 21-30C, dry. Avaniyapuram/Palamedu/Alanganallur bull-jumping Jan 15-17.',
  'January pairs the cleanest weather (21-30C, sub-50mm rain) with the Pongal cluster. Jallikattu at Avaniyapuram (Jan 15), Palamedu (Jan 16) and Alanganallur (Jan 17) — all within a 25km arc — anchor the week. Meenakshi temple darshan at full tempo dawn to midnight.',
  NULL,
  'Madurai in January is the version Tamil Nadu veterans book first. Daytime 27-30C, nights 21-22C, rainfall under 30mm, humidity 60 percent. The Meenakshi Amman Temple — 14 gopurams, the tallest (Eastern) at 51m, the Pottramarai golden-lotus tank at centre, the Hall of 1000 Pillars on the east — runs full ritual hours 5am-12:30pm and 4pm-9:30pm. The midnight Palli Arai carries Sundareswarar to Meenakshi''s chamber at roughly 9:30pm nightly; dress code is strict, no shorts, shoes off at the outer gopuram. Pongal (Jan 14-17, fixed Tamil solar calendar) brings the harvest cluster: Bhogi Jan 14, Pongal Jan 15, Mattu Pongal Jan 16, Kaanum Pongal Jan 17. Jallikattu — the bull-vaulting tradition revived after the 2014-17 court ban — runs at Avaniyapuram (Jan 15), Palamedu (Jan 16) and Alanganallur (Jan 17), all within 25km of the city; arrive 7am or book via the District Collector. Konar Kadai parotta-salna at Goripalayam, Murugan Idli Shop (since 1958) for breakfast queues, Anjappar Chettinad for the spicy shift, and Jigarthanda (rose-syrup-almond-milk-with-ice-cream — originated here) at Famous Jigarthanda on East Masi Street.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 2, 5, 'go',
  'Driest stretch. 22-32C. Thai Pusam Feb 1. Heritage walks comfortable through afternoon.',
  'February holds the Pongal-cleaned air with the year''s lowest rainfall (sub-20mm) and 22-32C span. Thai Pusam (Feb 1, 2026) draws kavadi processions through the Meenakshi temple precincts. Hotel rates ease 20 percent from the January Jallikattu spike.',
  NULL,
  'February in Madurai is the technical peak. Rainfall under 20mm, daytime 28-32C, nights 22-23C, humidity at 55 percent — the lowest of the year. Thai Pusam (Pushya nakshatra in Tamil Thai month, Feb 1 in 2026) brings kavadi-bearing devotees through the Meenakshi precincts and to Palani 120km west; the smaller satellite procession at Madurai runs from dawn. The Meenakshi Amman Temple at full ritual tempo — 5am Suprabhatam, the midnight Palli Arai ceremony at 9:30pm — and the four-mada-street circumambulation is walkable through the afternoon for the first time since November. Thirumalai Nayak Palace (1636, the Indo-Saracenic remnant of the original 14-acre footprint, sound-and-light show 6:45pm English / 8pm Tamil, ₹50) runs full schedule. Gandhi Memorial Museum at Tamukkam (the dhoti Gandhi wore on Jan 30, 1948 is here — ₹0, closed Friday) at year-quietest visitor load. Hotel rates ease 20 percent off January Jallikattu prices: heritage bracket (Heritage Madurai, GRT Regency) at ₹6-9k, mid-bracket ₹3-5k, homestays around the temple at ₹1,500-2,500. Konar Kadai parotta-salna evening shift queues build from 7pm; Murugan Idli for 6:30am breakfast still beats the 8am rush.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 3, 4, 'go',
  'Last cool month. 24-35C. Heritage walks compress to mornings. Rates 25 percent off February.',
  'March is the soft-landing month before the Chithirai festival ramp. Daytime climbs past 34C the last fortnight but temple darshan and the four-mada-street walk still work pre-10am and post-5pm. Hotel rates drop 25 percent from February peak — last clean-value window.',
  NULL,
  'March in Madurai is the transition month. Daytime 32-35C, nights 24-25C, humidity climbing to 65 percent, rainfall under 40mm. The heritage circuit compresses: Meenakshi temple at full hours but the four-mada-street walk works only 6-10am and 5-9pm — the granite floors of the outer prakaram hold heat through the afternoon. Thirumalai Nayak Palace runs full schedule (the sound-and-light 6:45pm English slot turns into the cool-hour photography slot). Gandhi Memorial Museum, Vandiyur Mariamman Teppakkulam tank (the 1645 floating-festival reservoir, fills only Apr-May with Vaigai water), and the Pudhu Mandapam pillared market hall (16th century, now a tailoring bazaar) all run normal hours. The Vaigai river — Madurai''s seasonal lifeline — runs near-dry. Chithirai festival preparations begin in temple precincts the last week. Hotel rates ease 25 percent off February: heritage bracket ₹5-7k, mid-bracket ₹2,500-4k, homestays ₹1,200-2,000. The last clean-value window before the festival surge and the April heat dome converge. Murugan Idli queues at 7am are still 10-12 deep; Konar Kadai parotta-salna evening service builds 8-10pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 4, 5, 'go',
  'Chithirai Festival overrides the heat. 27-40C. Apr 21-May 2 in 2026 — Thirukalyanam + Aazhi Ther.',
  'April is the Chithirai exception. Despite 38-40C daytime, the world''s largest temple festival (12 days, ~1 million pilgrims) anchors the month — Meenakshi''s celestial wedding to Sundareswarar on Thirukalyanam day (day 10), Aazhi Ther chariot procession day 11. 2026 cycle: Apr 21 - May 2.',
  NULL,
  'April in Madurai is the Chithirai exception — the only month outside winter that holds a peak score in inland Tamil Nadu. The Chithirai festival (Tamil month Chithirai, 12 days, ~1 million pilgrims annually) is the world''s largest temple festival and the reason the city packs out despite 38-40C daytime heat. 2026 cycle: April 21 to May 2 (verify against the Meenakshi Temple''s official almanac). Day 1 begins with the kodiyetram (flag hoisting); day 8 the pattabhishekam (coronation of Meenakshi); day 10 the Thirukalyanam — the celestial wedding of Meenakshi to Sundareswarar — typically draws the largest crowd; day 11 the Aazhi Ther (chariot procession) sees the temple chariots dragged through the four mada streets by tens of thousands of devotees on ropes. The Vaigai-side procession to Mariamman Teppakkulam runs in the second week as Lord Kallazhagar arrives from Alagar Kovil 21km east. Daytime 38-40C, nights 27-28C, humidity 65 percent — drink 4-5L water daily, AC retreat windows mandatory noon-3pm. Hotel rates spike 2-3x normal during the 12 festival days — Heritage Madurai at ₹15-20k, mid-bracket ₹8-12k, homestays ₹4-6k; book 8-12 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 5, 2, 'wait',
  'Heat dome. 28-42C. Festival tail spills into early May. Heritage walks collapse.',
  'Early May (1-2) still carries the Chithirai festival tail in 2026. Beyond that, daytime 38-42C makes the temple walk and four-mada-street circumambulation unworkable noon-5pm. AC museum-and-cafe rotation only. Hotels at year-low.',
  'May at Madurai is the heat dome at its worst. 38-42C daytime, humidity 65 percent, sea breeze does not reach 150km inland. Heritage walks collapse outside 6-9am and 7-9pm. AC retreat the only viable mid-day shape. Push to October-November for the clean trip.',
  'May in Madurai is the post-festival contraction. The Chithirai tail spills into the first two days of May in the 2026 cycle (festival end May 2) — after that the city empties out. Daytime 38-42C, nights 28-29C, humidity 65 percent, rainfall under 50mm but the pre-monsoon thunderstorms hit the last fortnight as short violent squalls that knock grid power 1-2 hours and raise humidity to 85 percent. Heritage walking compresses to 6-9am and 7-9pm only. Meenakshi temple inner prakaram granite holds 42-44C surface heat through the afternoon — barefoot circumambulation becomes unbearable noon-4pm. Vandiyur Mariamman Teppakkulam tank fills with Vaigai water around the Vaigai dam release window (the floating-festival reservoir gets its annual water in May) — Float Festival itself runs on the Thai-month full moon back in January-February, not now. Hotel rates at year-low outside the festival tail: Heritage Madurai at ₹4-6k, mid-bracket ₹2,000-3,500, homestays ₹1,000-1,800. Murugan Idli Shop and Konar Kadai stay open; AC rotation through the Gandhi Museum, Thirumalai Nayak Palace mural hall, and Jigarthanda at Famous on East Masi Street is the only viable mid-day shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 6, 2, 'wait',
  'Heat continues. 27-40C. SW monsoon mostly bypasses Madurai (rain-shadow). Better windows ahead.',
  'June still sits in the heat dome — inland Tamil Nadu is in the SW monsoon rain shadow so rainfall stays under 70mm. Daytime 36-40C makes the temple walk endurance-mode. Hotel rates remain at year-low. Push to October.',
  'June at Madurai is post-festival, pre-monsoon nothing-month. SW monsoon hits Kerala but Madurai (inland, rain-shadow of Western Ghats) gets only 50-70mm. Heat continues at 36-40C. Heritage trip remains compressed to dawn and dusk. October-February is dramatically better.',
  'June in Madurai is the empty stretch. The southwest monsoon hits the Kerala side of the Western Ghats around June 1 — but Madurai sits in the rain shadow on the eastern side, receiving only 50-70mm across 8-10 wet days versus Kochi''s 600-700mm in the same month. Daytime 36-40C, nights 27-28C, humidity 70 percent. Tamil Nadu''s genuine monsoon (the northeast monsoon) does not arrive until mid-October. Meenakshi temple at full ritual tempo through both shifts but the four-mada-street walk works only 5:30-8am and 7-9pm. Thirumalai Nayak Palace and Gandhi Memorial Museum function as AC mid-day refuges. The Vaigai dam release window keeps the river-bed lightly wet but mostly dust. Hotel rates remain at year-low: Heritage Madurai ₹4-5k, mid-bracket ₹2,000-3,000, homestays ₹900-1,500. International tourist load near-zero; domestic load only Pongal-tourists trickling back in. The October 15 onward window — when the northeast monsoon breaks the heat and the Pongal-Chithirai axis prepares to restart — is dramatically better. Skip unless transit-stopping.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 7, 3, 'wait',
  'Heat eases. 26-37C. Aadi-month temple energy + Aadi Perukku Aug 3 prep. Walks possible mornings.',
  'July sees a 2-3C ease as SW monsoon spillover reaches inland plains via the Western Ghats. Aadi month (mid-Jul to mid-Aug, Tamil calendar) brings amavasai pithru rituals and crowds at Meenakshi. Heritage walks workable 6-10am, 6-9pm.',
  'July is workable but not optimal. Daytime still 35-37C; the trip you came for runs at 60 percent of October-February capacity. AC mid-day rotation needed. Aadi devotional crowds add temple density. The Oct-Mar window is dramatically better.',
  'July in Madurai is the first easing month. SW monsoon spillover reaches the eastern Western Ghats — Madurai receives 80-100mm rainfall across 10-12 wet days, mostly late-afternoon thunderstorms that drop daytime temperatures 2-3C from June. Daytime 34-37C, nights 26-27C, humidity climbing past 75 percent. Aadi-month (mid-July to mid-August in the Tamil calendar) is one of the heaviest devotional months at Meenakshi temple — Fridays (Aadi Velli) and the new moon (Aadi Amavasai) bring 50,000+ pilgrims for special abhishekams. Aadi Perukku (Tamil Aug 3, the Cauvery-river celebration) is the cluster anchor but is Trichy-Srirangam-centric, not Madurai. Heritage walking workable 6-10am and 6-9pm. Hotel rates climb 20 percent off June lows on weekends: Heritage Madurai ₹5-6k, mid-bracket ₹2,500-3,500, homestays ₹1,000-1,800. Murugan Idli queues return; Konar Kadai evening service stretches 9-11pm. Functional for budget pilgrims and Tamil-devotional travelers; sub-optimal for first-time heritage visits.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 8, 3, 'wait',
  'Continued ease. 25-36C. Aadi month tail + early NE monsoon hints. Heritage shoulder.',
  'August continues July''s pattern with another 1C ease. Aadi tail runs through mid-month (Aadi Perukku Aug 3, Cauvery-side festival). Walks workable mornings and evenings. Hotel rates 30 percent below January peak.',
  'August is the second month of the heritage shoulder. The trip works at 70 percent of peak capacity. AC mid-day rotation still needed. October opens the proper window — push to then if comfort matters.',
  'August in Madurai continues the gradual climb-down. Rainfall 90-120mm across 12-14 wet days, daytime 34-36C, nights 25-26C, humidity 80 percent. Aadi tail (the Tamil month runs mid-July to mid-August) keeps the temple precincts busy through the first fortnight — Aadi Perukku Aug 3 is centred at Srirangam and the Cauvery river towns, not Madurai, but the Vaigai gets a small Madurai-side observance. The Vaigai dam releases water periodically in August; the riverbed shows wet patches but is not the floating-festival fill. Meenakshi temple full ritual tempo; Thirumalai Nayak Palace sound-and-light at 6:45pm benefits from cooler evening air. Hotel rates run 30 percent below January peak: Heritage Madurai ₹4,500-6k, GRT Regency / Sangam ₹3,000-4,500, mid-bracket ₹2,000-3,000, homestays ₹1,000-1,500. Heritage walking works 6-10am and 6-9pm; the four-mada-street is comfortable through the after-dinner stretch. October 15 onward delivers a materially cleaner experience; August functions only for travelers locked to a school-holiday window or short-stop transit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 9, 3, 'wait',
  'Pre-NE monsoon. 25-35C. Navarathri week starts late Sep. Pre-October rate window.',
  'September is the build-up to the northeast monsoon and the peak heritage season. Daytime eases to 33-35C, Navarathri week (9 nights, last week of Sep / first week of Oct) brings temple-circuit demand. Last sub-October pricing window.',
  'September still sits below the October-March window. The NE monsoon has not arrived; daytime 33-35C; the trip works but at 75 percent capacity. Push to October if comfort and value matter equally.',
  'September in Madurai is the pre-peak run-in. Rainfall 100-130mm across 12-14 wet days, daytime 33-35C, nights 25-26C, humidity 78 percent. The southwest monsoon retreats from Kerala around September 25-30; the northeast monsoon — Tamil Nadu''s actual rain season — is still 3-4 weeks away. Navarathri (the nine-night festival of the Goddess, Sukla-Pratipada to Mahanavami of Ashwin month) typically falls in late September / early October; the Meenakshi temple precincts get the full nine-night programme of devotional music and Bharatanatyam performances at the thousand-pillar hall. Hotel rates remain at off-season levels through mid-month: Heritage Madurai ₹4,500-6k, mid-bracket ₹2,500-3,500, homestays ₹1,000-1,500 — Navarathri week sees a 20 percent bump on weekends. Heritage walking now workable 6:30am-10:30am and 5:30pm-9pm; the inner prakaram afternoon walk still uncomfortable but doable in shoes-off discipline. The Vaigai shows seasonal flow returning. October 15 onward is the clean window — September is the value side of that window for travelers who want pre-peak pricing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 10, 5, 'go',
  'NE monsoon arrives. 23-32C. Navarathri tail + Dussehra. Heritage walks return mid-month.',
  'October is the season opener at Madurai. The NE monsoon arrives around Oct 15 — first 10 days dry-warm, second half cooler with 150-180mm rain across 8-10 days. Navarathri tail + Dussehra. Hotel rates 30-35 percent below January peak.',
  NULL,
  'October in Madurai is the proper return to the heritage circuit. The northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15, dropping 150-180mm across 8-10 wet days through the second half. Daytime falls to 30-32C, nights 23-24C, humidity easing to 75 percent. The first ten days extend September''s warm-dry pattern; the back half delivers the cooler temple-walk weather Madurai is known for. Navarathri tail and Dussehra (Vijayadasami, the tenth day, falls in early-to-mid October in 2026) bring weapon-worship rituals at Meenakshi and the Aigiri Nandini-set Devi processions at the temple''s Amman shrine. The Meenakshi precincts at full ritual tempo, four-mada-street walks workable through mid-afternoon, Thirumalai Nayak Palace sound-and-light at peak comfort. Hotel rates run 30-35 percent below January Pongal peak: Heritage Madurai ₹5-7k, GRT Regency / Sangam ₹3-4k, mid-bracket ₹2,500-3,500, homestays ₹1,200-2,000. Vaigai shows healthy flow. Murugan Idli queues, Konar Kadai parotta-salna evenings, Jigarthanda at Famous all return to peak service. Strong call for first-time visitors who want full heritage hours without the Pongal-week premium.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 11, 5, 'go',
  'Peak builds. 22-31C, NE monsoon active 200-250mm. Heritage walks year-best comfort.',
  'November is the pivot to the proper peak. NE monsoon delivers 200-250mm across 10-12 wet days but evening showers, daytime workable. Daytime 28-31C, nights 22-23C. Karthigai Deepam pilgrims pass through to Tiruvannamalai.',
  NULL,
  'November in Madurai is the year''s second-peak month behind January. Northeast monsoon active with 200-250mm rainfall across 10-12 wet days — mostly late-afternoon and evening showers that rinse the city without disrupting morning programmes. Daytime 28-31C, nights 22-23C, humidity 72 percent, sea breeze (from the Coromandel coast 150km east) reaching Madurai by mid-afternoon some days. The Meenakshi temple precincts at full ritual tempo through both shifts; the four-mada-street walk is at year-best comfort, the inner prakaram now walkable through mid-afternoon. Thirumalai Nayak Palace sound-and-light shows benefit from cool evenings (the 1636 hall has no AC). Gandhi Memorial Museum, Vandiyur Mariamman Teppakkulam (the floating-festival tank starts filling in late November), the Pudhu Mandapam pillared bazaar all run normal hours. Karthigai Deepam (Nov-Dec full moon, Krittika nakshatra — 2026 falls Dec 4) draws pilgrims through Madurai en route to Tiruvannamalai 350km north; the Meenakshi precincts get a smaller Karthigai observance. Hotel rates climb to 75-80 percent of January peak: Heritage Madurai ₹6-8k, mid-bracket ₹3,500-5k, homestays ₹1,500-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('madurai', 12, 5, 'go',
  'Peak season. 21-30C. Karthigai Deepam Dec 4. Christmas-NYE rate lift but Madurai stays moderate.',
  'December is when Madurai runs at full peak. NE monsoon wraps mid-month, rainfall easing to 100-130mm. Karthigai Deepam Dec 4 with Tiruvannamalai pull-through traffic. Heritage walks at year-cleanest. Lock beds 4-6 weeks ahead.',
  NULL,
  'December in Madurai is the operational peak. Northeast monsoon wraps in the first 10-12 days delivering 100-130mm; from mid-month rainfall falls under 30mm and the city flips into clean heritage-walk mode. Daytime 28-30C, nights 21-22C, humidity falling to 65 percent. Karthigai Deepam (Nov-Dec full moon at Krittika nakshatra — 2026 falls December 4) is centred on Tiruvannamalai 350km north but Madurai sees a synchronised smaller observance at Meenakshi and pull-through pilgrim traffic at the Madurai Junction railway station. Christmas-NYE rates run 1.5-2x normal in Madurai (less of a spike than coastal Tamil Nadu): Heritage Madurai ₹8-12k, GRT Regency / Sangam ₹5-7k, mid-bracket ₹3,500-5k, homestays ₹2,000-3,500. The Meenakshi precincts at full ritual tempo, the Palli Arai 9:30pm palanquin ceremony at year-best comfort, four-mada-street circumambulation walkable through full afternoon for the first time since November. Thirumalai Nayak Palace sound-and-light at year-cleanest visibility. Vaigai shows full flow into the floating-festival tank. Murugan Idli at 6am, Konar Kadai parotta-salna at 8pm, Jigarthanda at Famous on East Masi Street — the full circuit runs cleanly.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
