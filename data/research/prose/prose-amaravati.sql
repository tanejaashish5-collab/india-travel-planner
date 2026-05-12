-- Amaravati destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: amaravati

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 1, 5, 'go',
  'Peak Buddhist heritage window. 19-29C, dry. ASI Amaravati Museum and Mahachaitya stupa at full access.',
  'January is when the Amaravati Buddhist heritage trip runs at year-best. Daytime 27-29C, nights 19-21C, sub-30mm rain. ASI Amaravati Museum (the limestone sculpture panels — early Mahayana iconography pre-dating Mathura/Gandhara Buddha images) at full access. Mahachaitya stupa walks comfortable.',
  NULL,
  'Amaravati in January is the version Buddhist-heritage scholars book first. Daytime 27-29C, nights 19-21C, rainfall under 30mm, humidity at 65 percent. The Mahachaitya — the Great Stupa of Amaravati, built circa 200 BCE by the Satavahanas with later additions, originally a 56m-diameter dome with carved limestone railings and panels — survives as ruin walks across the Sanchi-style mound, 32km west of Vijayawada on the Krishna river south bank. ASI Amaravati Museum (₹15 entry, 10am-5pm closed Friday) holds the spectacular limestone sculpture panels (the famous "Jataka panels" with early Mahayana iconography that pre-dates the Mathura/Gandhara Buddha-image traditions by ~100 years — these panels show some of the earliest figurative representations of the Buddha in Indian art, dated to ~50 BCE first images of Buddha). Amaravateeswara Swamy Temple (the Pancharama, one of the five sacred Shiva temples in Andhra) at full ritual hours. Hotel options thin in Amaravati proper — most travelers day-trip from Vijayawada (35km, 60-minute drive) using Novotel ₹8-11k or The Gateway ₹9-12k as base.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 2, 5, 'go',
  'Driest stretch. 20-31C. ASI Museum at peak. Stupa walks through afternoon for the last time of year.',
  'February holds January cleanliness. Rainfall under 15mm, daytime 29-31C. ASI Amaravati Museum and Mahachaitya stupa walks at year-peak comfort. Capital City construction visits possible. Last clean window before March heat.',
  NULL,
  'February in Amaravati is the technical peak. Rainfall under 15mm, daytime 29-31C, nights 20-22C, humidity at 60 percent — the lowest of the year. The ASI Amaravati Museum (₹15 entry, 10am-5pm closed Friday) — the structure built to house the spectacular Satavahana-era limestone sculpture panels recovered from the Mahachaitya site through 19th-century excavations by Colin Mackenzie (1797) and later by Robert Sewell and the ASI — at full visitor capacity. The Mahachaitya stupa mound walkable through the full day for the first/last time of the year. Amaravateeswara Swamy Temple (one of the five Pancharamas of Andhra, dedicated to Shiva) at full ritual hours — Pancharama Yatra pilgrims (the multi-day circuit of the five Pancharamas: Amaravati, Draksharama, Palakollu, Samalkota, Bhimavaram) plan February stops here. The new Amaravati Capital City zones across the 217 sq km master plan can be visited as a separate self-guided drive — construction activity restarted under Chandrababu Naidu''s second term has visible progress at the Government Complex, Legislative precinct, and High Court zones. Local Amaravati lodges ₹1,200-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 3, 4, 'go',
  'Last cool month. 23-33C. ASI Museum (indoor AC) works all day. Stupa walks compress to mornings.',
  'March is the soft-landing month. ASI Amaravati Museum (indoor) works all day. Mahachaitya stupa mound walks compress to 6-10am and 5-8pm. Hotel rates 20 percent below February. Last clean-value window before April.',
  NULL,
  'March in Amaravati is the transition month. Daytime 31-33C, nights 23-24C, humidity climbing to 70 percent, rainfall under 25mm. The ASI Amaravati Museum (indoor AC galleries) handles full-day visitor traffic comfortably. The Mahachaitya stupa mound (open-ground, partial-shade walking) compresses to 6-10am and 5-8pm; the limestone-ground surface holds heat through midday. Amaravateeswara Swamy Temple morning darshan 5-11am the cool-hour shape. The Capital City zones (the 217 sq km master plan area) can be visited by AC car with built-in cool-hour stops — but the construction-site visits work better dawn-to-noon. The Krishna river-side at Amaravati ghat works pre-9am and post-6pm. Hotel rates ease 20 percent off February — Vijayawada Novotel ₹6-8k, Gateway ₹7-9k, mid-bracket ₹2.5-3.5k. Local Amaravati lodges ₹1,000-1,800. The last clean-value window before the April-May heat-and-humidity dome forces the trip into AC-only retreat. The combined day trip — ASI Museum + Mahachaitya stupa + Amaravateeswara Temple + Capital City self-drive — works as a single 8am-6pm day in March from a Vijayawada base.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 4, 3, 'wait',
  'Pre-monsoon. 26-36C, humidity 75 percent. ASI Museum (indoor) viable. Stupa walks dawn-only.',
  'April pushes the trip narrow. ASI Amaravati Museum (indoor) works all day as AC retreat. Mahachaitya stupa walks dawn-only. Outdoor work 10am-5pm unsafe. Wait for October.',
  'April pushes Amaravati into pre-monsoon stress. Mahachaitya stupa walks impossible 10am-5pm. ASI Museum (indoor AC) viable. October is dramatically better for the full heritage circuit.',
  'April in Amaravati is when the heritage trip narrows to early morning and AC indoor venues. Daytime 33-36C, nights 26-27C, humidity 75 percent, sea breeze unavailable inland. Pre-monsoon thunderstorms hit the last fortnight — short squalls that drop temperatures 3-4 degrees temporarily but raise humidity to 90 percent. The ASI Amaravati Museum (indoor AC) handles full-day traffic comfortably and works as the primary anchor. The Mahachaitya stupa mound walks work only 6-9am and 6-8pm. Amaravateeswara Swamy Temple morning darshan 5-9am only. Capital City self-drive can work with full-AC car but the outdoor walks at the construction sites become unsafe. The Krishna river-side at Amaravati ghat works dawn only. Hotel rates in Vijayawada (the 35km base) run 25-30 percent below February: Novotel ₹5-7k, Gateway ₹6-8k, mid-bracket ₹2-3k. Local Amaravati lodges ₹800-1,400. The October-March window is dramatically better for the full Buddhist-heritage circuit — Mahachaitya stupa walks, ASI Museum, Pancharama temple, Capital City visit, Krishna ghat sunset.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 5, 2, 'wait',
  'Peak heat. 27-38C, humidity 78 percent. Stupa walks impossible. Museum-only viable. Pre-monsoon cyclone risk.',
  'May functions only for museum visit with AC anchor. Stupa walks impossible except 5-7am. Pre-monsoon thunderstorms third week. Push to October.',
  'May in Amaravati pushes outdoor heritage walks essentially closed. Mahachaitya stupa unsafe except 5-7am. ASI Museum (indoor AC) viable. October is dramatically better.',
  'May in Amaravati is the closing month before the southwest monsoon arrives in early June. Daytime 36-38C, occasional 39-40C peaks the second-third week, nights 27-28C, humidity 78 percent — the inland-Krishna basin runs hot and the construction zones across the Capital City master plan have minimal tree-cover yet. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls drop temperatures 4-5 degrees temporarily but raise humidity to 90 percent. The early-cyclone risk (Bay of Bengal pre-monsoon cyclogenesis) is small but present — Asani made landfall on the AP-Odisha coast May 11, 2022. The Mahachaitya stupa mound walks work only 5-7am and 7-8pm. ASI Amaravati Museum (indoor AC) handles full-day traffic and becomes the trip''s primary anchor. Amaravateeswara Swamy Temple morning darshan 5-9am only. Capital City self-drive collapses — construction sites unsafe through midday. The Krishna river-side at Amaravati ghat works dawn only. Hotel rates at year-low in Vijayawada base: Novotel ₹4-6k, Gateway ₹5-7k, mid-bracket ₹1.5-2.5k. Local Amaravati lodges ₹700-1,200. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 6, 2, 'wait',
  'SW monsoon arrives. 26-33C, 150-200mm. Krishna volume builds. Stupa walks rain-interrupted.',
  'June is monsoon arrival. ASI Museum (indoor) holds full hours. Mahachaitya stupa walks rain-interrupted. Capital City visits constrained. Wait for October.',
  'June is the SW monsoon arrival. Stupa walks rain-interrupted, outdoor heritage damp. Indoor museum works. October delivers a cleaner heritage trip.',
  'June in Amaravati is the southwest monsoon arrival on the Krishna basin. The SW current hits the AP coast around June 1-5 — IMD declares formal monsoon onset annually. Rainfall jumps from May''s 50mm to 150-200mm across 14-16 wet days; the Krishna river volume builds through June into July. Daytime 30-33C feels cooler against May but 86 percent humidity and intermittent sustained downpours close down outdoor heritage walks. The ASI Amaravati Museum (indoor AC galleries) holds full hours — the museum becomes the primary visit during monsoon. The Mahachaitya stupa mound walks rain-interrupted. Amaravateeswara Swamy Temple morning darshan continues. The Capital City zones — construction across the 217 sq km master plan — visit constrained by monsoon-flooded ground at several site precincts. The Krishna river-side at Amaravati ghat rain-flooded. Hotel rates at year-low in Vijayawada base: Novotel ₹4-6k, Gateway ₹5-7k. Local Amaravati lodges ₹700-1,200. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 7, 2, 'wait',
  'Peak SW monsoon. 26-31C, 200-250mm. Krishna at flood-watch. Museum-only viable. Stupa walks closed.',
  'July is the wettest stretch. Krishna at flood-watch. Mahachaitya stupa walks closed. ASI Museum (indoor AC) the only viable visit. Wait for October.',
  'July is monsoon peak. Stupa walks closed, Capital City sites flooded, river-side off. Museum-only works. October is materially cleaner.',
  'July in Amaravati is the wettest stretch. Rainfall 200-250mm across 18-20 wet days, daytime 28-31C, humidity 88 percent. The Krishna river runs at flood-watch level through the month as upper-catchment rains release through Almatti, Narayanpur and Srisailam dams downstream. Amaravati sits 32km west of Vijayawada on the Krishna south bank — the river-side ghat at Amaravati floods seasonally. The Mahachaitya stupa mound walks closed for the month — outdoor heritage rain-blocked. ASI Amaravati Museum (indoor AC) continues full hours and becomes the trip''s only viable visit during peak monsoon. Amaravateeswara Swamy Temple darshan continues (inner sanctum roofed). Capital City zones — many sites across the 217 sq km master plan have unfinished drainage and become flooded. Hotel rates at year-low in Vijayawada base: Novotel ₹4-6k, Gateway ₹5-7k. Local Amaravati lodges ₹700-1,200. The trip shape Amaravati is built for — Mahachaitya stupa walks, Buddhist-heritage circuit, Capital City visit, Krishna ghat sunset — is largely closed. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 8, 2, 'wait',
  'Monsoon continues. 26-31C, 150-200mm. Krishna high. Museum-only. Buddha Purnima off-cycle.',
  'August holds July''s wet pattern. 150-200mm rain. Krishna river at flood-watch. ASI Museum (indoor AC) holds visits. Stupa walks closed. Wait for October.',
  'August is monsoon continuation. Stupa walks closed, Capital City sites flooded, river-side off. Museum-only available. October is materially cleaner.',
  'August in Amaravati stays in monsoon mode across the Krishna basin. Rainfall 150-200mm across 16-18 wet days, daytime 28-31C, humidity 87 percent. The Krishna river continues to run at flood-watch level. The Mahachaitya stupa mound walks remain closed for the month. ASI Amaravati Museum (indoor AC) continues full hours. Amaravateeswara Swamy Temple darshan continues. Capital City zones constrained. Buddha Purnima (Vesak, the Buddha''s birth-enlightenment-parinirvana day) typically falls in May/Vaishakha — so August is not a key Buddhist festival month for Amaravati. The Krishna river-side at Amaravati ghat rain-flooded. Hotel rates at year-low in Vijayawada base: Novotel ₹4-6k, Gateway ₹5-7k. Local Amaravati lodges ₹700-1,200. Cyclone-track watch via mausam.imd.gov.in continues — September-October is the peak Bay of Bengal cyclone window. The next clean window is mid-October. The trip Amaravati was built for needs October-March for full access — the monsoon months stay at indoor-museum-only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 9, 3, 'wait',
  'SW monsoon retreat. 25-31C, 100-150mm. Stupa walks return last week. Cyclone-watch active.',
  'September is the recovery month. SW monsoon retreats through the second half. Mahachaitya stupa walks return the last week. ASI Museum at full schedule. Cyclone-watch active for second half. Wait for October-15 cleaner shape.',
  'September is recovery transition. Stupa walks return last week but cyclone risk window active. October 15 onward is materially cleaner.',
  'September in Amaravati is the recovery month. Rainfall 100-150mm across 11-13 wet days, daytime 28-31C, humidity 80 percent dropping to 75 by month-end. The southwest monsoon retreats from the AP coast around September 25-30. The Mahachaitya stupa mound walks return to walkability the last week as ground dries. ASI Amaravati Museum continues full hours. Amaravateeswara Swamy Temple morning darshan returns to comfortable timing. Capital City zones return to walkability the last week. Krishna river-side at Amaravati ghat still high but accessible. September-October is the peak Bay of Bengal cyclone window — Hudhud-class storms can form starting mid-September; IMD watch via mausam.imd.gov.in is mandatory. Hotel rates climb 15-20 percent versus August lows: Novotel ₹5-7k, Gateway ₹6-8k. Local Amaravati lodges ₹900-1,500. Cycle call — a 2-day Amaravati visit late September works for monsoon-tolerant heritage travelers, but the October 15 onward window is materially cleaner with full outdoor circuit access.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 10, 4, 'go',
  'Season opens. 23-31C. Cyclone-watch first fortnight. Stupa walks return full schedule. Dussehra cluster nearby.',
  'October is the season opener. First 10-15 days carry cyclone-watch (Hudhud anniversary Oct 12). Beyond that, Mahachaitya stupa walks at full schedule. ASI Museum at peak. Dussehra at Kanaka Durga Vijayawada (35km) is the regional anchor. Rates 25 percent below January.',
  NULL,
  'October in Amaravati is the proper return to coherent. Rainfall drops to 100-150mm with the bulk falling in the first ten days; from October 15 onward the heritage circuit flips into clean walkable mode. Daytime 28-31C, humidity falling from 80 to 73 percent. The first fortnight carries the Bay of Bengal cyclone risk (Hudhud landed Vizag Oct 12, 2014; Phailin hit Odisha-AP coast Oct 12, 2013) — IMD watch mandatory October 5-20. Beyond that, Mahachaitya stupa mound walks return to full schedule. ASI Amaravati Museum at full visitor traffic. Amaravateeswara Swamy Temple at full ritual hours. Capital City zones across the 217 sq km master plan return to walkability — the construction-site self-drive becomes viable with the temperature drop. The Krishna river-side at Amaravati ghat returns to evening sunset access. Dussehra / Sharadiya Navratri at Kanaka Durga Vijayawada (35km, the regional anchor) is the cultural overlay. Hotel rates run 25-30 percent below January peak in Vijayawada base: Novotel ₹6-9k, Gateway ₹7-10k. Local Amaravati lodges ₹1,200-1,800. Strong call for first-time visitors who want full heritage hours minus December-January crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 11, 5, 'go',
  'Peak window opens. 21-30C, sub-50mm rain. Stupa walks at peak comfort. Karthika Masam at Amaravateeswara.',
  'November is the year''s second-peak month. Mahachaitya stupa walks at full schedule. ASI Museum at peak. Karthika Pournami brings deepam lighting at Amaravateeswara Pancharama. Rates 25 percent below December-January.',
  NULL,
  'November in Amaravati is the year''s second-peak month behind January. Rainfall under 50mm, daytime 27-30C, sea breeze cooling evenings to 21-22C, humidity dropping below 70 percent. The Bay of Bengal cyclone risk falls sharply after October 25. The Mahachaitya stupa mound walks at peak comfort — the Satavahana-era ruin grounds and the surrounding limestone-railing footprint walkable through the full day. ASI Amaravati Museum at peak visitor capacity. Amaravateeswara Swamy Temple (one of five Pancharamas in Andhra) at peak ritual hours. Karthika Masam (mid-November to mid-December) brings mass deepam (oil-lamp) lighting at the Pancharama temple; Karthika Pournami (full moon, mid-month) the peak night with the precinct lit by thousands of lamps. Capital City zones across the 217 sq km master plan walkable for self-drive site visits. The Krishna river-side at Amaravati ghat at full sunset access. Hotel rates climb to 80 percent of January peak in Vijayawada base: Novotel ₹7-10k, Gateway ₹8-11k, mid-bracket ₹2.5-4k. Local Amaravati lodges ₹1,400-2,200. Strong call for first-time visitors — full heritage circuit, peak weather, lower rates than January-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'amaravati', 12, 5, 'go',
  'Peak season. 20-29C, dry. Christmas-NYE rates 1.5-2x in Vijayawada base. Late-Dec cyclone outliers.',
  'December is when the Amaravati heritage trip runs at full capacity. Christmas-NYE corridor rates 1.5-2x in Vijayawada base hotels. Late-season cyclones possible (Michaung Dec 2023). Karthika Masam tail brings continued deepam through first half.',
  NULL,
  'December in Amaravati is the operational peak for the Buddhist heritage trip. Daytime 27-29C, nights 20-21C, rainfall under 25mm. The Mahachaitya stupa mound walks at peak access — the 200 BCE Satavahana-era ruins (the 56m-diameter original dome footprint, the limestone railings and panels) walkable through the full day. ASI Amaravati Museum at year-peak visitor capacity — the limestone sculpture panels with their early Mahayana iconography (some of the earliest figurative representations of the Buddha in Indian art, dated ~50 BCE) attract heritage tour groups and academic visitors. Amaravateeswara Swamy Temple (one of five Pancharamas) at peak ritual hours. Karthika Masam tail through the first half brings continued deepam lighting at temples. Capital City zones across the 217 sq km master plan at full walkability for the construction-site self-drive visit. Recent late-season cyclones — Mandous (Dec 2022); Michaung (Dec 5-6, 2023, made landfall near Nellore, brushed the Krishna basin) — are reminders that Bay of Bengal cyclogenesis extends into December. The first three weeks of December are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
