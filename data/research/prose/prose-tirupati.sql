-- Tirupati destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: tirupati | best_months [10,11,12,1,2,3] | avoid [5,6,7]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 1, 5, 'go',
  'Peak window. 18-29C. Pongal-Sankranti cluster + Vaikunta Dwaram tail. Sarva Darshan 18-36 hours.',
  'January at Tirumala is the year-best window. Daytime 27-29C, sub-30mm rain. Vaikunta Dwaram tail from Dec 30 2026 Ekadasi feeds the first week''s crowd. Sankranti cluster Jan 14-16 brings Andhra family pilgrim density. Sarva Darshan 18-36 hr.',
  NULL,
  'Tirupati in January is the version the TTD planner books first. Daytime 27-29C, nights 18-20C, humidity 60 percent, rainfall under 30mm — the Rayalaseema rain shadow at its driest stretch. The Sri Venkateswara Swamy Temple at Tirumala — the world''s richest functioning temple by annual offerings (₹14,000 crore aggregate; FY24 hundi collection alone ₹1,556 crore) — runs at full ritual tempo. The Suprabhatam at 3am opens the day; Sarva Darshan (the free queue) holds 18-36 hour waits in the Vaikuntam Q-complex pre-darshan rest sheds. Special Entry Darshan at ₹300 (book 60 days ahead via tirupatibalaji.ap.gov.in) compresses the wait to 2-4 hours. The Vaikunta Dwaram (the celestial entry door opened only on Vaikunta Ekadasi — Dec 30 2026 — and the 10 days after) tail runs through the first week of January; pilgrim density spikes to 200,000+ a day for the Mukkoti Dwadasi (Jan 1 2026) ekadasi-pair sequence. Sankranti cluster (Bhogi-Sankranti-Kanuma-Mukkanuma Jan 14-16) brings additional Andhra family pilgrim flow. Padayatra route from Alipiri to Tirumala (3,550 steps, ~3 hours) workable cleanly.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 2, 5, 'go',
  'Driest stretch. 20-31C. Maha Shivaratri spillover from Srisailam. Padayatra at year-best comfort.',
  'February is the driest of the dry. Daytime 29-31C, rainfall under 20mm. The 3,550-step Alipiri-Tirumala padayatra at year-cleanest comfort. Maha Shivaratri (Feb 14 2026) brings Srisailam spillover crowd at Govindaraja Swamy temple in Tirupati town.',
  NULL,
  'February in Tirupati is the technical peak weather month. Rainfall under 20mm, daytime 29-31C, nights 20-21C, humidity 55 percent — the Rayalaseema rain shadow''s driest mark. The Sri Venkateswara Swamy Temple at Tirumala runs at full ritual tempo: Suprabhatam 3am, Tomalaseva 3:30am, Archana 4:30am, Sarva Darshan 7am-3pm and 7pm-2am. The 3,550-step Alipiri-Tirumala padayatra (the traditional walking ascent — 9km, takes 2.5-3 hours, footwear/bag deposit at Alipiri, free TTD water and curd-rice stations every 500 steps) at year-best comfort; the second route via Srivari Mettu (2,388 steps, 2.1km, steeper but quicker, ~1.5 hours) also clean. Maha Shivaratri (Feb 14 in 2026) spillover from Srisailam Mallikarjuna Jyotirlinga (120km north) brings additional pilgrim density at the Govindaraja Swamy Temple in Tirupati town (the original 12th century Ramanujacharya-consecrated temple, often missed by Tirumala-only pilgrims). Sri Padmavathi Ammavari Temple at Tiruchanoor (5km from Tirupati, the consort temple — TTD protocol mandates Padmavathi darshan before Tirumala Venkateswara) at full schedule. Special Entry Darshan ₹300 queue at 2-3 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 3, 4, 'go',
  'Last cool month. 22-34C. Padayatra compresses past 9am. TTD accommodation easing 20 percent.',
  'March is the soft-landing month. Daytime climbs 32-34C through the month. Padayatra workable pre-9am and post-5pm. TTD accommodation rates ease 20 percent. Last clean-comfort window before April heat dome.',
  NULL,
  'March in Tirupati is the transition month. Daytime 32-34C, nights 22-23C, humidity 60 percent, rainfall under 30mm. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo: Suprabhatam 3am, the standard darshan sequence through the day. The 3,550-step Alipiri-Tirumala padayatra (9km walking ascent) compresses to pre-9am or post-5pm — the rock-step trail surface holds 38-40C noon-3pm and the footwear-deposit-at-Alipiri rule means the bare-stone surface is felt directly. The Srivari Mettu route (2,388 steps, 2.1km) similarly restricted to mornings and evenings. Sri Padmavathi Ammavari Temple at Tiruchanoor at full schedule. Kapilatheertham (the natural waterfall-fed temple tank at the foot of the Tirumala range, 3km from Tirupati town) workable with the Kapileswara temple visit at year-end of comfort. TTD accommodation rates ease 20 percent off February: Tirumala cottages ₹500-3,000 range (book via ttdsevaonline.com 90 days ahead), Tirupati town hotels Marasa Sarovar ₹4-6,000, Fortune Kences ₹3-5,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 4, 3, 'wait',
  'Rayalaseema heat ramps. 25-38C. Padayatra near-impossible mid-day. Temple interior cool but town brutal.',
  'April pushes Tirupati into pre-monsoon Rayalaseema heat. Daytime 36-38C. The Alipiri padayatra walks compress to 3-7am only. Interior temple darshan remains workable. Rates ease 30 percent. Push to October.',
  'April in Tirupati pushes the Rayalaseema rain-shadow heat past comfort. Padayatra compresses to 3-7am only — the 3,550-step walk on bare-stone (footwear deposited at Alipiri) is hazardous noon-5pm. Interior darshan still workable but the town circulation is brutal. October opens the clean window.',
  'April in Tirupati is the pre-monsoon Rayalaseema heat ramp. Daytime 36-38C, nights 25-26C, humidity 55 percent, rainfall under 40mm. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo — the seven-hilltop elevation of Tirumala (853m) gives a 4-5C buffer versus Tirupati town below. The Alipiri-Tirumala 3,550-step padayatra (9km walking ascent) compresses to 3-7am only; the rock-step surface holds 42-44C noon-4pm and the footwear-deposit-at-Alipiri rule means the bare-stone surface is directly underfoot. The Srivari Mettu route (2,388 steps) similarly restricted to pre-dawn. Sri Padmavathi Ammavari Temple at Tiruchanoor (Tirupati town, 5km) still at full schedule. Kapilatheertham temple-tank workable mornings only. Sarva Darshan queues remain dense (TTD does not slow during April; the temple operates regardless of season) — Special Entry ₹300 darshan is the practical recommendation. TTD accommodation rates ease 30 percent off February: Tirumala cottages at lower band, Tirupati hotels at year-low. International pilgrim arrivals thin (the global Vaishnavite community avoids April-June).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 5, 2, 'wait',
  'Rayalaseema heat peak. 27-40C. Padayatra impossible. Tirupati town 41C+. Push to October.',
  'May is the heat dome peak. Daytime 38-40C, town pavement 45-48C, the Alipiri padayatra impossible. AC bus from Alipiri base to Tirumala the only viable ascent. Rates at year-low. Push to October.',
  'May at Tirupati is the Rayalaseema heat peak. The 3,550-step padayatra cannot happen at 38-40C with bare-stone trail surface 45-48C. AC bus ascent the only practical option. The temple itself runs but the experience is compressed to interior-only. October opens the proper window.',
  'May in Tirupati is the Rayalaseema heat dome peak. Daytime 38-40C, nights 27-28C, humidity 55 percent, rainfall under 50mm. Pre-monsoon dust storms hit the second fortnight; the seven-hill ascent road sees afternoon visibility drops. The Sri Venkateswara Swamy Temple at Tirumala (853m elevation) holds 4-5C cooler than Tirupati town but Tirumala daytime still climbs to 33-35C. The 3,550-step Alipiri-Tirumala padayatra impossible — bare-stone trail surface hits 45-48C by 10am. AC bus (TTD-operated, ₹240 return from Alipiri, 30-min ascent) or private taxi the only viable ascent. Sri Padmavathi Ammavari Temple at Tiruchanoor workable only 5-9am and 6-10pm. Kapilatheertham tank-bath compresses to 5-8am. Sarva Darshan queues thin to 12-18 hours as pilgrim density drops; Special Entry ₹300 darshan walks under 2 hours. TTD accommodation at year-low: Tirumala cottages ₹400-2,500, Tirupati town hotels Marasa Sarovar ₹3-4,500, Fortune Kences ₹2,500-4,000. Functional only for pilgrims locked to specific lunar dates; the trip you came for cannot happen comfortably. October-March is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 6, 2, 'wait',
  'SW monsoon light here. 26-36C, 60-90mm rain. Padayatra still compressed. Hotels at year-low.',
  'June sees first ease as SW monsoon spillover reaches Rayalaseema. Daytime drops to 35-36C. Padayatra workable pre-7am. Hotel rates at year-low. October is materially better for the full pilgrim experience.',
  'June at Tirupati is the first ease but Rayalaseema rain-shadow keeps SW monsoon light (60-90mm). Padayatra still compresses to pre-7am only. Hotel rates at year-low. October-February is dramatically cleaner; wait if flexibility exists.',
  'June in Tirupati is the first easing month. The southwest monsoon spills across the Western Ghats and reaches Rayalaseema in light form — rainfall 60-90mm across 8-10 wet days, mostly late-afternoon thunderstorms that drop daytime temperatures 3-4C from May. Daytime 35-36C, nights 26-27C, humidity 70 percent. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo; the 853m elevation Tirumala plateau cools quickly when rain hits. The 3,550-step Alipiri-Tirumala padayatra compresses to 4-7am only; the bare-stone trail surface still holds 38-42C noon-4pm. The Srivari Mettu route (2,388 steps) similarly restricted. Sri Padmavathi Ammavari Temple at Tiruchanoor workable mornings and post-6pm. Kapilatheertham tank workable through 10am. Sarva Darshan queues thin to 8-14 hours; Special Entry ₹300 darshan at 90-min wait. TTD accommodation rates remain at off-peak: Tirumala cottages ₹400-2,800, Tirupati town hotels Marasa Sarovar ₹3-4,800, Fortune Kences ₹2,500-4,200. International pilgrim arrivals near-zero. Functional for pilgrim itineraries that need the temple but not the town experience; October opens the proper window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 7, 2, 'wait',
  'SW monsoon light. 25-34C, 80-120mm rain. Aadi-month Andhra pilgrim density. Padayatra workable AM.',
  'July sees 2-3C further ease. Daytime 33-34C. Aadi-month brings Andhra family pilgrim density at Tirumala. Padayatra workable 4-9am. Hotel rates climb 15 percent. October-February still dramatically cleaner.',
  'July at Tirupati continues the easing pattern but Rayalaseema rain shadow keeps the monsoon light. Padayatra still compresses to mornings. Aadi-month brings local Andhra pilgrim density. October opens the proper window for first-visit travelers.',
  'July in Tirupati is the proper start of the easing window. Rainfall 80-120mm across 10-12 wet days, daytime 33-34C, nights 25-26C, humidity 75 percent — the SW monsoon spillover continues into Rayalaseema in moderate form. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo. The 3,550-step Alipiri-Tirumala padayatra workable 4-9am; the second route via Srivari Mettu similarly clean morning-only. Aadi-month (Tamil-Telugu calendar mid-July to mid-August) brings Andhra family pilgrim density at Tirumala — Aadi-Velli (Aadi Fridays) and Aadi-Pournami (Aadi full moon) draw 150,000+ daily peaks; the spillover Tirupati-Tiruchanoor-Tirumala cluster sees additional Tamil-pilgrim flow from Chennai (140km) and Kanchipuram (110km). Sri Padmavathi Ammavari Temple at Tiruchanoor at full schedule. Kapilatheertham at full visitor flow with the Kapileswara temple. Sarva Darshan queues climb to 14-20 hours on Aadi-Velli; Special Entry ₹300 at 2-3 hours. TTD accommodation rates climb 15 percent off June: Tirumala cottages ₹500-3,000, Tirupati hotels Marasa Sarovar ₹3,500-5,200, Fortune Kences ₹2,800-4,500. Functional for Aadi-locked pilgrim itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 8, 3, 'wait',
  'Monsoon tail. 24-32C, 100-140mm rain. Aadi tail + Sravana month. Padayatra workable AM. Hotels +20 percent.',
  'August continues the easing. Daytime 31-32C. Aadi tail through first fortnight; Sravana month from mid-August brings additional Telugu pilgrim density. Padayatra workable 4-10am. Hotels at +20 percent off June.',
  NULL,
  'August in Tirupati continues the easing pattern. Rainfall 100-140mm across 11-13 wet days, daytime 31-32C, nights 24-25C, humidity 78 percent. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo. The 3,550-step Alipiri-Tirumala padayatra workable 4-10am — the trail surface stays under 35C in the cooler post-storm windows. Aadi-month tail runs through the first fortnight; Sravana month (Telugu calendar — typically mid-August through mid-September in 2026) starts in the second half with Sravana-Sukravara (Sravana Fridays) Vishnu observances at Tirumala — Vishnu-worship in Sravana is the year''s second-most-significant pilgrim cluster after Brahmotsavam. Sri Padmavathi Ammavari Temple at Tiruchanoor sees Sravana-Sukravara crowd spikes (the consort temple is part of the Sravana Vishnu observance circuit). Kapilatheertham tank workable through morning. Sarva Darshan queues 14-22 hours on Sravana-Sukravara; weekday Sarva Darshan 12-18 hours. Special Entry ₹300 at 2-3 hours. TTD accommodation rates +20 percent off June: Tirumala cottages ₹500-3,200, Tirupati hotels Marasa Sarovar ₹3,800-5,500, Fortune Kences ₹3,000-4,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 9, 5, 'go',
  'Salakatla Brahmotsavam Sep 24-Oct 2. Garudasevai Day 5 peak. 23-31C. Lock 4-6 months ahead.',
  'September is Tirumala''s definitional festival month. Salakatla Brahmotsavam Sep 24-Oct 2 2026: 9-day annual TTD utsavam — Dhwajarohanam Day 1, Garudasevai Day 5 (peak crowd 500k+), Rathotsavam Day 8. Lock TTD accommodation 4-6 months ahead.',
  NULL,
  'September in Tirupati is Tirumala''s definitional festival month. The Salakatla Brahmotsavam — the annual nine-day TTD Brahmotsavam, the temple''s grandest festival cycle — runs Sep 24 to Oct 2 in 2026 (verify against tirupatibalaji.ap.gov.in calendar). The sequence: Day 1 (Sep 24) Dhwajarohanam (flag-hoisting), Day 5 (Sep 28) Garudasevai (the peak crowd day when Sri Venkateswara is processed on the Garuda vahana — historic peak 500,000+ pilgrims), Day 8 (Oct 1) Rathotsavam (chariot procession), Day 9 (Oct 2) Chakra Snanam at Pushkarini and Dhwajavarohanam closing. The Sri Venkateswara Swamy Temple at Tirumala at maximum ritual tempo; Suprabhatam 3am, Tomalaseva, Archana, and an additional set of Vaibhavotsavam processions through each Brahmotsavam day. Rainfall easing — 80-110mm across 9-11 wet days, daytime 29-31C, nights 23-24C. The 3,550-step Alipiri padayatra workable 4-10am and 5-9pm. Sarva Darshan queues 24-48 hours on festival peak days; Special Entry ₹300 darshan at 4-6 hours through Brahmotsavam. TTD accommodation books out 6 months in advance for the festival window; private hotels (Marasa Sarovar, Fortune Kences, Bliss) at peak rates ₹6-12,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 10, 5, 'go',
  'Brahmotsavam tail + post-monsoon clean. 22-30C. NE monsoon arrives mid-Oct. Padayatra at year-best.',
  'October opens the proper season. Brahmotsavam tail through Oct 2; the post-festival fortnight cleans down to peak-window levels. Daytime 28-30C, NE monsoon arrives mid-month as evening showers. Padayatra at year-best comfort.',
  NULL,
  'October in Tirupati is the proper season open. Salakatla Brahmotsavam tail runs through Oct 2 (Chakra Snanam closing); the post-festival fortnight sees pilgrim density fall back to peak-window levels. Rainfall climbs to 140-200mm across 8-10 wet days as the northeast monsoon — Rayalaseema''s real rain season — arrives around October 15, mostly as late-afternoon and evening showers that rinse the temple plateau without disrupting morning programmes. Daytime 28-30C, nights 22-23C, humidity 75 percent. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo — Suprabhatam 3am, the standard darshan sequence. The 3,550-step Alipiri-Tirumala padayatra at year-best comfort; the Srivari Mettu route (2,388 steps) similarly clean through full day. Sri Padmavathi Ammavari Temple at Tiruchanoor at full schedule. Kapilatheertham tank workable through full day. Sarva Darshan queues 12-24 hours; Special Entry ₹300 at 2-3 hours. TTD accommodation rates remain at moderate-peak (the festival window has just closed): Tirumala cottages ₹500-3,500, Tirupati hotels Marasa Sarovar ₹4,500-6,500, Fortune Kences ₹3,500-5,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 11, 5, 'go',
  'NE monsoon active. 20-28C. Karthika Masam mass-deepam. Padayatra peak comfort. Lock rooms early.',
  'November is the year''s second-peak month. NE monsoon active 180-220mm in evening showers. Daytime 26-28C. Karthika Masam (full month) brings mass-deepam observances; Karthika Pournami peak. Padayatra at year-best comfort.',
  NULL,
  'November in Tirupati is the year''s second-peak month behind January. Northeast monsoon active with 180-220mm rainfall across 9-11 wet days — late-afternoon and evening showers that rinse the seven-hill range and the Tirumala plateau without disrupting morning programmes. Daytime 26-28C, nights 20-21C, humidity 72 percent. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo. Karthika Masam (the full Karthika lunar month — late October into late November in 2026) brings month-long Shiva-Vishnu observances; the Tirumala temple participates in the Karthika-Deepam mass-lamp lighting alongside Srikalahasti, Srisailam, and Lepakshi. Karthika Pournami (the full-moon day, around mid-November depending on lunar calendar) draws 250,000+ pilgrims for the mass-deepam at sunset across the seven hills. The 3,550-step Alipiri-Tirumala padayatra at year-best comfort; Srivari Mettu route similarly clean. Sri Padmavathi Ammavari Temple at Tiruchanoor at full programme. Kapilatheertham workable through full day. Sarva Darshan queues 14-26 hours on Karthika-Pournami; standard weekdays 12-20 hours. Special Entry ₹300 at 2-4 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tirupati', 12, 5, 'go',
  'Vaikunta Ekadasi Dec 30. Vaikunta Dwaram opens. 200,000+ peak day. Lock TTD 6 months ahead.',
  'December is the year''s climactic month. Vaikunta Ekadasi Dec 30 2026 — Vaikunta Dwaram (the celestial entry door) opens for the only time in the year, with 10-day pilgrim window. Peak day 200,000+. Daytime 26-28C. Lock TTD accommodation 6 months ahead.',
  NULL,
  'December in Tirupati is the year''s climactic festival month. Daytime 26-28C, nights 18-20C, humidity 65 percent, rainfall 60-100mm across the first half (NE monsoon tail) easing through the second half. The Sri Venkateswara Swamy Temple at Tirumala at full ritual tempo. **Vaikunta Ekadasi falls Dec 30 in 2026** (Margazhi-Sukla-Ekadasi — the most significant Vaishnavite festival at Tirumala). At pre-dawn on the festival day, the Vaikunta Dwaram (the celestial entry door, kept locked through the year and ceremonially opened only for the Ekadasi-Dwadasi pair) opens; pilgrims who pass through the door earn the spiritual merit of moksha-darshana. The 10-day Vaikunta Dwaram window (Dec 30 2026 to Jan 8 2027) draws 200,000+ daily peak pilgrim density; the Sarva Darshan queue climbs to 36-72 hours through the window. Special Entry ₹300 darshan books out 60 days in advance; the TTD pre-booking system opens early October for the Vaikunta Ekadasi window. Karthika Masam tail (Karthika Pournami fell in November). The 3,550-step Alipiri-Tirumala padayatra at year-best comfort but festival-day density makes timing critical — start pre-dawn for both ascent and queue entry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
