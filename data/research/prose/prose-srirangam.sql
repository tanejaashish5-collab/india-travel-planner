-- Srirangam destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: srirangam

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 1, 5, 'go',
  'Peak window + Vaikunta Ekadasi tail. 21-30C. Paramapada Vasal just closed (Dec 30, 2026). Mass post-Ekadasi crowds.',
  'January is the second-peak window at Srirangam after the Vaikunta Ekadasi run (2026 Dec 30) — Paramapada Vasal has just closed, the 21-day Pagal Pathu + Ra Pathu festival winds down through the first week. NE monsoon retreated, temple full ritual tempo. Pongal Jan 14-17 brings additional density.',
  NULL,
  'Srirangam in January is the second peak of the year, following the December Vaikunta Ekadasi observance. The world''s largest functioning Hindu temple — Sri Ranganathaswamy Temple, 156 acres, 7 concentric prakaram walls, 21 gopurams (the Rajagopuram on the south side at 73m / 240ft is the tallest in Asia) — sits on an island formed by the Cauvery and Kollidam (Coleroon) rivers, 12km north of Trichy proper. NE monsoon has retreated; daytime 27-30C, nights 21-22C, rainfall under 30mm. The 21-day Pagal Pathu + Ra Pathu festival that began around the December 30 Vaikunta Ekadasi (2026 cycle) winds down through the first week of January; the Paramapada Vasal (the "gate to Vaikuntam" inside the temple, only open this one day in the year) has just closed for another year. Pongal cluster (Jan 14-17) brings 4 days of additional pilgrim density — the Trichy-Srirangam axis is one of the busiest Pongal-temple corridors after Madurai. Lord Ranganatha''s utsava (procession) deity makes daily darshan rounds. Temple precincts open 6am-1pm and 3pm-9pm; entry to the inner sanctum requires Hindu-only identification at the 7th prakaram gate.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 2, 5, 'go',
  'Driest month. 22-32C. Pagal-Ra-Pathu tail. Walks comfortable through afternoon.',
  'February is the dry-quarter peak. Rainfall under 20mm, daytime 28-32C. The 7-prakaram walk through the largest functioning temple in the world is comfortable through full afternoon. Rates ease 20 percent off Vaikunta Ekadasi spike.',
  NULL,
  'February in Srirangam is the technical peak window. Rainfall under 20mm, daytime 28-32C, nights 22-23C, humidity 60 percent. The Sri Ranganathaswamy Temple at full ritual tempo: 6am opening, the Suprabhatam and abhishekam sequence, midday closure 1pm-3pm, evening shift 3pm-9pm. The 7-prakaram walk — from the southern Rajagopuram entry (73m, the tallest temple gopuram in Asia) through six concentric walls to the inner sanctum — covers roughly 1.2km of walking; the 4 outer prakarams have residential streets and shops, while the 3 inner prakarams are temple-administered. Comfortable through full afternoon for the first time since November (the granite courtyards hold ambient heat through April). The Garbha Griham (inner sanctum, Hindu-only) houses the reclining Ranganatha — the deity rests on Adishesha, one of the most iconic Vaishnavite forms. Andal-Ranganatha "Aadi Pooram" festival is an August event so absent this month; February brings the Maasi-month Theppotsavam (float festival) on the Chitra Pournami pattern at the Chandrapushkarini tank within the temple. Stay in Trichy proper (12km) — Sangam Hotel ₹3-4,500, Femina ₹2,500-4k, homestays ₹1,000-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 3, 4, 'go',
  'Last cool month. 24-35C. Walks compress mid-day last fortnight. Rates ease.',
  'March extends February''s pattern but daytime climbs past 33C the last fortnight. 7-prakaram walk works through 11am and resumes 4pm. Rates 25 percent below February. Last clean-value window.',
  NULL,
  'March in Srirangam is the soft-landing month. Daytime 32-35C, nights 24-25C, humidity 65 percent, rainfall under 40mm. The Sri Ranganathaswamy Temple at full ritual tempo through both shifts; the 7-prakaram walk works comfortably 6am-11am and resumes 4pm onward. The 4 outer prakarams (with residential streets and shops) handle heat better than the 3 inner prakarams whose granite courtyards bake in afternoon sun. The Garbha Griham (inner sanctum, Hindu-only entry) air-cooled by the temple''s 24-hour ritual flame and stone-mass holds 4-5C below outside ambient. Rajagopuram (73m, tallest in Asia) photography at year-cleanest pre-haze visibility. The Hall of 1000 Pillars and the Sesharaya Mandapam''s 21-pillared horse-rider carvings at quietest mid-month visitor load. Stay in Trichy (12km drive — Trichy Junction railway station is the regional hub) — Sangam Hotel ₹2,500-4k, Femina ₹2-3,500, homestays ₹900-1,500. Last clean-value window before April pushes the inner-prakaram walk past comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 4, 3, 'wait',
  'Pre-monsoon heat. 27-38C. Inner-prakaram walk dawn-only. Hotel rates 30 percent off.',
  'April pushes Srirangam''s 7-prakaram walk into endurance. Daytime 36-38C, inner prakaram granite hits 42-44C surface heat. Workable as 6-10am sprint + 5-9pm. AC retreat in Trichy noon onward.',
  'April in Srirangam compresses the trip to dawn and dusk. The 7-prakaram walk — the whole reason to come — works at 50 percent. The Trichy-Srirangam axis is Tamil Nadu''s plains-inland heat dome at its worst. Wait for October.',
  'April in Srirangam is the pre-monsoon endurance month. Daytime 36-38C, nights 27-28C, humidity 65 percent, rainfall under 30mm. The Sri Ranganathaswamy Temple''s 7-prakaram walk compresses to 6am-10am and 5pm-9pm; the inner-prakaram granite courtyards hit 42-44C surface heat noon-4pm, barefoot circumambulation through the Garbha-Griham approach corridor unworkable through mid-day. The Garbha Griham itself stays air-cooled by the ritual-flame and stone-mass. The 4 outer prakarams (with residential streets) workable through later hours since shop-shade and street awnings reduce direct exposure. Hall of 1000 Pillars and the Sesharaya Mandapam''s pillar-carvings still at full access but viewer comfort marginal. Stay in Trichy proper (12km — Trichy Junction is the regional hub) where AC hotels offer noon-3pm retreat: Sangam Hotel ₹2,000-3,500, Femina ₹1,800-3k, homestays ₹700-1,200. International visitor load near-zero; domestic pilgrim load thin. Chithirai festival pull at Madurai (130km south) — April pilgrim flow goes through Trichy Junction to Madurai rather than detouring to Srirangam. October opens the proper return window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 5, 2, 'wait',
  'Heat dome. 28-40C. Inner prakaram unworkable. Hotel rates at year-low.',
  'May is Trichy-Srirangam plains heat dome at its worst. Daytime 38-40C, inner granite hits 46-48C noon-4pm. The temple-walk shape collapses. Push to October.',
  'May in Srirangam pushes past the limit of barefoot temple-walking. The Trichy-Srirangam axis is inland-plains Tamil Nadu at its worst — 38-40C, no sea breeze, no relief until the southwest monsoon spillover in late June. Wait for October.',
  'May in Srirangam is the inland-plains heat peak. Daytime 38-40C, nights 28-29C, humidity 65 percent, rainfall under 50mm but mostly as short pre-monsoon thunderstorm bursts that don''t cool the granite. The Sri Ranganathaswamy Temple inner-prakaram walk compresses to 5:30am-9am and 7pm-9pm; the inner-prakaram granite courtyards hit 46-48C surface heat noon-4pm — unworkable. The Garbha Griham stays air-cooled internally but the approach corridor through the inner prakarams is the bottleneck. The 4 outer prakarams (with residential street shade) workable through later hours but the trip-defining 7-prakaram circumambulation runs at 40 percent. The temple''s 24-hour ritual schedule continues unchanged; the priests and resident-Brahmin community of Srirangam (one of the oldest Vaishnavite communities in South India, several thousand families have been on the temple-side island for 800+ years) carry on. Stay in Trichy proper (12km) — Sangam Hotel ₹1,800-3k, Femina ₹1,500-2,500, homestays ₹600-1,000. International visitor load near-zero. October opens the proper return window after the NE monsoon arrives.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 6, 2, 'wait',
  'SW spillover eases heat. 27-37C. Trip works at 60 percent. Push to October.',
  'June sees a 1-2C ease as SW monsoon spillover reaches the eastern Western Ghats. Daytime 35-37C, mornings and evenings workable. Hotels at year-low. October opens the proper window.',
  'June at Srirangam is the SW-monsoon-spillover ease month. The temple-walk shape works at 60 percent. AC mid-day rotation needed. The October-March window is dramatically better.',
  'June in Srirangam is the first easing month. Tamil Nadu''s inland plains sit in the southwest-monsoon rain shadow — Srirangam receives only 60-80mm rainfall across 8-10 wet days (Kerala''s ghat-side Kochi sees 600-700mm in the same window). The Cauvery and Kollidam rivers, which surround the temple island, still run low — the river-fill comes later from NE-monsoon catchment runoff. Daytime 35-37C, nights 27-28C, humidity 75 percent. The Sri Ranganathaswamy Temple''s 7-prakaram walk works comfortably 6am-10am and 5pm-9pm. The inner-prakaram granite courtyards still hit 42-44C noon-4pm. The 4 outer-prakaram residential streets (where the local Brahmin community lives — Srirangam is one of the few Indian temple-towns where ritual life and lay community share the temple''s outer prakaram space) workable through afternoon shade. Stay in Trichy proper (12km — Sangam Hotel ₹2-3,500, Femina ₹1,800-3k, homestays ₹700-1,200). The Aadi-Perukku Cauvery-festival (Aug 3, the Cauvery-river celebration) is still six weeks away. October-March is dramatically better; June is wait-tier.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 7, 3, 'wait',
  'Heat eases. 26-35C. Aadi-month Tamil pilgrim density. Walks workable mornings.',
  'July sees a 2-3C ease. Aadi-month (mid-Jul to mid-Aug Tamil calendar) brings Aadi-Velli Friday density. Walks workable 6-10am, 6-9pm. Hotel rates climb 20 percent off June.',
  'July at Srirangam is the start of the easing window but daytime still 33-35C. The trip works at 70 percent. October opens the proper window — push 12 weeks.',
  'July in Srirangam is the first proper ease month. The southwest monsoon spillover reaches inland Tamil Nadu more substantially — rainfall 80-100mm across 10-12 wet days, daytime 33-35C, nights 26-27C, humidity 78 percent. Aadi-month (the Tamil month running mid-July to mid-August) is one of the heavier devotional months at Sri Ranganathaswamy — Aadi-Velli (Aadi Fridays) bring 20,000-40,000 day-pilgrims for special abhishekams; Aadi-Amavasai (the Aadi new moon) brings pithru-tarpana rituals at the Cauvery ghats around the temple island. The Cauvery and Kollidam start filling as SW-monsoon catchment runoff arrives — the temple island geography becomes properly visible from the Cauvery bridge crossings (Aaaduthurai and Mukkombu both 7-10km upstream). The 7-prakaram walk works 6am-10am and 6pm-9pm. The Garbha Griham and Hall of 1000 Pillars at full ritual access. Stay in Trichy (12km) — Sangam Hotel ₹2,500-4k, Femina ₹2-3,500, homestays ₹800-1,300. The Aadi-pilgrim density adds 30-40 percent occupancy on Aadi-Velli weekends. October-March is dramatically better but July works for Aadi-locked pilgrim itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 8, 4, 'go',
  'Aadi Perukku Aug 3 + Aadi-Pooram. 25-33C. Cauvery festival days centred here.',
  'August is the Cauvery-festival month. Aadi Perukku (Aug 3, Tamil Aadi-18 — Cauvery river-bank festival) is centred on the Cauvery towns and Srirangam is among the most important venues. The Andal-Ranganatha "Aadi Pooram" festival follows mid-month.',
  NULL,
  'August in Srirangam is one of the year''s feature festival windows. Rainfall 100-130mm across 12-14 wet days, daytime 32-33C, nights 25-26C, humidity 82 percent. **Aadi Perukku (Tamil Aadi-18, fixed at August 3)** — the Cauvery-river celebration that marks the river''s annual flood — is centred at the Cauvery temple-towns of Tamil Nadu, and Srirangam (on its Cauvery island) is one of the four most important venues alongside Trichy, Tanjore and Kumbakonam. Thousands of devotees take ritual dips at the Adi-Ranga ghat on the Srirangam island side, offering raksha-bandhan-style threads to the Cauvery river. The Andal-Ranganatha "Aadi Pooram" festival (Andal''s spiritual marriage to Ranganatha — Andal was the only female Alvar saint, the 10-day festival commemorates her ascension into the Ranganatha icon) falls in mid-August in the Tamil calendar; the second-week temple programme attracts 50,000+ pilgrims. The temple''s 7-prakaram walks workable 6am-11am and 5pm-9pm; Aadi Perukku and Aadi Pooram day crowds may slow the inner-prakaram entry by 30-45 minutes. Stay in Trichy (12km) — Sangam Hotel ₹3-4,500, Femina ₹2,500-4k, homestays ₹900-1,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 9, 3, 'wait',
  'Pre-NE monsoon. 25-33C. Navarathri last week + early October. Pre-peak rate window.',
  'September is the build-up to peak. Daytime eases to 31-33C. Navarathri week (9 nights, last Sep / first Oct) brings temple density. Last sub-October pricing window.',
  'September at Srirangam still sits below the October-March window. Daytime 31-33C; the trip works but at 75 percent. Push to October.',
  'September in Srirangam is the pre-NE-monsoon run-in. Rainfall 100-130mm across 12-14 wet days, daytime 31-33C, nights 25-26C, humidity 80 percent. The Cauvery still runs high from August''s Aadi-Perukku flow. The southwest monsoon retreats from sub-continent around September 25-30; the northeast monsoon — Tamil Nadu''s actual rain season — arrives around October 15. Navarathri (the nine-night Devi festival, Sukla-Pratipada to Mahanavami of Ashwin month, falls in late September / early October 2026) brings additional temple-circuit density; the Sri Ranganathaswamy precincts get the full nine-night programme. Hotel rates remain at off-season through mid-month: Sangam Hotel ₹2,500-4k, Femina ₹2-3,500, homestays ₹800-1,300 — Navarathri week sees 20 percent bump. The 7-prakaram walk now workable 6:30-10:30am and 5:30-9pm; the inner-prakaram afternoon walk still marginal. The Garbha Griham and Hall of 1000 Pillars at full access. October 15 onward is the clean window — September is the value side of that window for travelers wanting pre-peak pricing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 10, 4, 'go',
  'NE monsoon arrives. 23-31C. Navarathri tail + Dussehra. 7-prakaram walk returns mid-month.',
  'October is the season-opener. NE monsoon arrives around Oct 15 as evening showers. Daytime 28-31C. Cauvery at full Channel-flow. Hotel rates 30 percent below January peak.',
  NULL,
  'October in Srirangam is the proper return to the year''s peak window. The northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15, dropping 150-200mm across 8-10 wet days through the back half, mostly as late-afternoon and evening showers. Daytime 28-31C, nights 23-24C, humidity 76 percent. The Cauvery and Kollidam at high-channel flow — the temple island is at year-best visual context from the Aaaduthurai and Mukkombu bridge crossings 7-10km upstream. The Sri Ranganathaswamy Temple at full ritual tempo, 7-prakaram walks workable through mid-afternoon for the first time since November. Navarathri tail and Dussehra (Vijayadasami, the tenth day, falls in early-to-mid October 2026) bring weapon-worship rituals at the temple and the Aigiri Nandini-set Devi processions. The Hall of 1000 Pillars and Sesharaya Mandapam at quieter visitor load. Rajagopuram photography at year-cleanest visibility post-rain. Stay in Trichy (12km) — Sangam Hotel ₹3-4,500, Femina ₹2,500-4k, homestays ₹900-1,500. Strong call for first-time visitors — full prakaram-walk hours minus the December Vaikunta Ekadasi crush.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 11, 5, 'go',
  'Peak builds. 22-30C. NE monsoon active. Vaikunta Ekadasi prep. Pagal Pathu opens late.',
  'November is the peak-build month. NE monsoon active 200-250mm in evening showers. Daytime 27-30C, walks comfortable through full afternoon. Pagal Pathu (10-day pre-Ekadasi festival) opens last week of November. Lock beds.',
  NULL,
  'November in Srirangam is the year''s peak-build month into the December Vaikunta Ekadasi. Northeast monsoon active with 200-250mm rainfall across 10-12 wet days — mostly late-afternoon and evening showers that rinse the temple precincts without disrupting morning programmes. Daytime 27-30C, nights 22-23C, humidity 73 percent. The Sri Ranganathaswamy Temple at full ritual tempo, 7-prakaram walks at year-best comfort, inner-prakaram now walkable through mid-afternoon. The Cauvery and Kollidam at full channel flow; the island geography visible from the Mukkombu bridge crossing. **Pagal Pathu** — the 10-day daytime-festival cycle that precedes Vaikunta Ekadasi — opens in the last week of November in the 2026 cycle (Ekadasi falls Dec 30, so Pagal Pathu runs Dec 21-30 and Ra Pathu Dec 31-Jan 9; some preparation programmes start late November). Hall of 1000 Pillars at quietest pre-peak visitor load. Rajagopuram (73m, tallest in Asia) photography at year-cleanest visibility. Stay in Trichy (12km) — Sangam Hotel ₹3,500-5k, Femina ₹3-4,500, homestays ₹1,000-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('srirangam', 12, 5, 'go',
  'Vaikunta Ekadasi Dec 30, 2026 — Paramapada Vasal opens. Peak of peaks.',
  'December is the operational peak. Vaikunta Ekadasi falls Dec 30 in 2026 — Paramapada Vasal opens the once-a-year-only gate to Vaikuntham. Pagal Pathu runs Dec 21-30. ~5-10 lakh pilgrims across the festival. Lock beds 6-8 weeks ahead.',
  NULL,
  'December in Srirangam is the operational peak of the temple year. **Vaikunta Ekadasi falls December 30 in 2026** (Margazhi-Sukla-Ekadasi — the eleventh lunar day of the bright half of Margazhi, calculated annually against the Tamil-Vaishnavite calendar; verify against the temple''s published almanac at srirangam.org). On this single day, **Paramapada Vasal** — the "gate to Vaikuntham" inside the temple''s seventh prakaram, a narrow corridor that remains closed all year — opens for a 24-hour window. 5-10 lakh pilgrims cross through over the course of the day; queues form 6-8 hours ahead at the southern Rajagopuram entry. The 10-day **Pagal Pathu** (daytime festival, Dec 21-30, the procession of utsava-Ranganatha through the four temple-streets each daytime hour) runs into Ekadasi day; **Ra Pathu** (night festival, Dec 31-Jan 9) follows. Rainfall 100-150mm — NE monsoon wraps in the first half; from Dec 20 the precincts run clean. Daytime 26-29C, nights 21-22C, humidity 68 percent. Hotel rates 2-3x normal Dec 25-31: Sangam Hotel ₹6-9k, Femina ₹5-8k, homestays ₹2,500-4k. Lock beds 6-8 weeks ahead from October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
