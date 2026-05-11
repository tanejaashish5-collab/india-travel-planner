-- Mahabalipuram (Mamallapuram) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: mahabalipuram | best_months [10,11,12,1,2,3] | avoid [6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 1, 5, 'go',
  'Peak Coromandel window. 21-29C, dry. Shore Temple sunrise viable. Pongal weekend (Jan 14-17) crowded.',
  'January is when Mahabalipuram runs at its best. Daytime 22-29C, low humidity, full sunrise-to-Shore Temple weather. Pongal long weekend (January 14-17) brings Chennai-Bangalore weekend traffic — book 3-4 weeks ahead.',
  NULL,
  'Mahabalipuram in January is the version that put it on the UNESCO list (inscribed 1984). Daytime 22-29C, nights 20C, humidity 65 percent, sea breeze cool through the day. The Shore Temple (Pallava, early 8th century, the only one of the legendary Seven Pagodas to survive above water — the 2004 tsunami briefly exposed two submerged temples offshore) opens 6am-6pm ₹40 entry. The Pancha Rathas (Five Rathas — Dharmaraja, Bhima, Arjuna, Nakula-Sahadeva, Draupadi — single-rock 7th-century monolithic chariots) lie 1km south, same ticket. Arjuna''s Penance (Descent of the Ganges, the world''s largest open-air rock bas-relief at 27m wide and 9m tall, mid-7th century) sits in the village core, free entry. Krishna''s Butter Ball (a 250-ton granite boulder balanced on a slope), Krishna Mandapam, Varaha Cave Temple all walkable in a single day. Pongal long weekend (January 14-17) brings Chennai-Bangalore weekenders — Friday-Sunday rates jump 60 percent. Book Radisson Blu Temple Bay (₹12-15k), Ideal Beach Resort (₹6-9k), Mamalla Heritage Hotel (₹3-4.5k) 3-4 weeks ahead. ECR drive from Chennai is 58km, 90 minutes off-peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 2, 5, 'go',
  'Driest month. 22-31C. Mahabalipuram Dance Festival typically runs late Dec to early Feb at Shore Temple.',
  'February is the technical peak. Rainfall under 10mm, full UNESCO walking weather. The Mahabalipuram Dance Festival (Tamil Nadu Tourism, classical Bharatanatyam, Kathak, Odissi performances at the Shore Temple open-air venue) typically runs late December to early February — verify exact 2026 dates with TN Tourism.',
  NULL,
  'February in Mahabalipuram is the year''s cleanest weather window. Rainfall under 10mm, daytime 23-31C, humidity 60 percent, sea breeze starting 11am-onward. The Mahabalipuram Dance Festival (Tamil Nadu Tourism — Bharatanatyam, Kathak, Odissi, Kuchipudi performances at the Shore Temple open-air courtyard) typically runs late December through early February — verify 2026 dates via tamilnadutourism.tn.gov.in. Free entry for most evening performances. Shore Temple sunrise (6:10am) is the strongest single shot of the year — sea-side facade catches first light. The UNESCO ensemble (Five Rathas, Arjuna''s Penance, Krishna''s Butter Ball, cave temples) walks comfortably 9am-1pm and 3-6pm. The 2004 tsunami exposed two submerged temple structures briefly offshore — ASI surveys confirmed at least seven submerged sites supporting the Seven Pagodas legend. Hotel rates at peak: Radisson Blu Temple Bay ₹13-17k, InterContinental Mahabalipuram Resort ₹15-20k, Ideal Beach Resort ₹7-10k, mid-tier hotels ₹3-5k. Chennai Airport (MAA) 60km via ECR, 75 minutes off-peak. Stone-carving co-op workshops along ECR ₹500-1500/hour.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 3, 4, 'go',
  'Last cool month. 24-32C, humidity climbing late-month. Heritage walks work pre-11am and post-5pm.',
  'March extends the February shape with heat building. UNESCO sites walk cleanly 7-11am and 4-6:30pm. Hotel rates ease 20-25 percent versus February peak.',
  NULL,
  'March in Mahabalipuram is the soft-landing month before pre-monsoon heat. Daytime 25-32C, humidity rising from 65 to 75 percent across the month, sea breeze starting later (1-2pm) and dropping off earlier (6pm). The Shore Temple, Five Rathas, Arjuna''s Penance walk comfortably 7-11am and 4-6:30pm; the mid-day window forces an indoor break. The Government College of Architecture and Sculpture (set up 1957 to preserve the Pallava stone-carving lineage) workshops, the Crocodile Bank (40km north on ECR, founded 1976 by Romulus Whitaker, India''s largest reptile reserve — Indian gharial, mugger, saltwater crocodile, also a Madras Croc Bank Trust visitor centre, open 8:30am-5:30pm ₹60 entry), DakshinaChitra heritage village (25km north on ECR, 10am-6pm closed Tuesday ₹120 entry — recreated agraharam houses) all run normal hours. Hotel rates ease 20-25 percent: Radisson Blu Temple Bay ₹10-13k, InterContinental Mahabalipuram Resort ₹11-15k, Ideal Beach Resort ₹5-7k, mid-tier hotels ₹2.5-4k. Last comfortable window before April pre-monsoon humidity sets in. ECR drive from Chennai 58km, 90 minutes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 4, 3, 'wait',
  'Pre-monsoon heat. 27-36C, humidity 75 percent. Tamil New Year Apr 14. Heritage walks compress.',
  'April still works for early-morning UNESCO walks and beach-resort pool days. Tamil New Year (April 14) cultural anchor. Mid-day strictly pool-and-AC.',
  'April pushes Mahabalipuram into early-morning-and-evening-only walking shape. Shore Temple sunrise still works; mid-day at the UNESCO ensemble (Five Rathas, Arjuna''s Penance, cave temples) is brutal on the unshaded granite. Push to October-November.',
  'April in Mahabalipuram is when the UNESCO walk narrows to dawn-and-dusk windows. Daytime 28-36C, humidity 75 percent, sea breeze unreliable until 4pm. Tamil New Year (Puthandu, April 14) is observed across the village with traditional Saravana Bhavan-style sadhya thalis (₹250-500) at most restaurants and pre-dawn temple darshan at Sthala Sayana Perumal Temple (the older Vaishnavite temple in the village, separate from the Pallava monuments). Shore Temple sunrise 6:10am window is still the strongest single shot — granite cools overnight, sea side facade catches first light. The granite of the Five Rathas heats to 50-55C surface temperature by 11am — walking the ensemble post-10am uncomfortable. Hotel rates drop 30 percent versus February: Radisson Blu Temple Bay ₹8-11k, InterContinental Mahabalipuram Resort ₹9-13k, Ideal Beach Resort ₹4-6k, mid-tier hotels ₹2-3.5k. Beach-resort pool day works as the mid-day shape — Ideal Beach Resort, Radisson Blu Temple Bay open pools to walk-in guests at ₹500-1200 day pass. Push to October 15 onward for the clean shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 5, 2, 'wait',
  'Peak heat. 28-38C, humidity 80 percent. Sea side granite scorching mid-day. Hotel rates at year-low.',
  'May functions only for beach-resort pool stays and dawn UNESCO walks. Mid-day granite is dangerous-hot. Pre-monsoon thunderstorms last 10 days.',
  'May is Mahabalipuram''s harshest stretch. Granite of Shore Temple, Five Rathas, Arjuna''s Penance hits 50-60C surface mid-day — touching is unsafe. UNESCO walking compresses to 6-9am only. Push to mid-October.',
  'May in Mahabalipuram is the last month before the SW monsoon pivots the year. Daytime 29-38C with last-fortnight spikes to 40C, humidity 80 percent, sea breeze unreliable till 5pm. The granite of the UNESCO ensemble reaches surface temperatures of 50-60C by 11am — touching the Shore Temple wall, the Pancha Rathas plinths, or the Krishna''s Butter Ball boulder mid-day is genuinely unsafe. UNESCO walking compresses to 6-9am dawn only. Pre-monsoon thunderstorms hit the last 10 days as Mango Showers — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours. Hotel rates at year-low: Radisson Blu Temple Bay ₹7-9k, InterContinental Mahabalipuram Resort ₹8-11k, Ideal Beach Resort ₹3.5-5k, mid-tier hotels ₹1.8-3k. Beach resorts run "summer pool stays" — Ideal Beach, Radisson Blu, Chariot Beach Resort packages at ₹4-8k night including pool, breakfast, dinner. Stone-carving workshops on East Coast Road compress to 7-10am. The UNESCO walking trip is essentially closed in May; the next clean window is October 15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 6, 2, 'wait',
  'SW monsoon weak on TN coast. 27-35C, only 50-70mm rain. Heat continues. Granite mid-day dangerous.',
  'June continues the heat — TN coast in SW monsoon rain shadow. Granite of Five Rathas and Shore Temple still scorching mid-day. UNESCO walking compressed to dawn.',
  'June is heat-with-marginal-rain. Unlike Kerala (full SW monsoon), TN coast receives only 50-70mm. Granite mid-day still 50-55C surface. UNESCO walking compressed to 6-9am dawn. Push to October.',
  'June in Mahabalipuram sits in the TN coast''s SW-monsoon rain shadow — the Western Ghats absorb most of the moisture and only 50-70mm of light rain reaches Mahabalipuram across 5-7 wet days. Heat dominates: daytime 27-35C, humidity 78 percent. The granite of the UNESCO ensemble (Shore Temple, Five Rathas, Krishna''s Butter Ball, Arjuna''s Penance) still hits 50-55C surface mid-day. UNESCO walking compresses to 6-9am dawn — sunrise at the Shore Temple at 5:55am is the strongest shape of the day. Hotel rates remain low-season: Radisson Blu Temple Bay ₹7-9k, InterContinental Mahabalipuram Resort ₹8-11k, Ideal Beach Resort ₹3.5-5k. Beach resort pool day shape continues. The Tamil Nadu Government Polytechnic stone-carving school workshops run reduced hours through the summer. Crocodile Bank (40km north on ECR, 8:30am-5:30pm, founded 1976 by Romulus Whitaker) is the strongest day-trip alternative — gharial enclosure shaded, evening feeding at 4:30pm. The clean travel window opens with the NE monsoon retreat in October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 7, 2, 'wait',
  'SW monsoon residual. 26-33C, 100-130mm rain. Sea breeze stronger. Mid-day still demanding.',
  'July sees the first heat retreat — sea breeze stronger, rain showers 7-9 days. Mid-day still demanding outdoors. Push to October.',
  'July is marginal improvement on June. Sea breeze stronger, rain showers 7-9 days, but the granite ensemble still requires dawn-and-evening windows. Push to mid-October.',
  'July in Mahabalipuram marks the first measurable heat retreat. Daytime 26-33C, humidity 80 percent, sea breeze stronger from 2pm onward. SW monsoon residual brings 100-130mm across 7-9 wet days — short evening squalls. The granite of the UNESCO ensemble cools to 40-45C mid-day surface temperatures, walking pre-11am and post-4pm becomes viable. Shore Temple sunrise (5:50am) and sunset programming both work. Aadi month opens (mid-July to mid-August) — Sthala Sayana Perumal Temple in the village stages Aadi Perukku Cauvery river-bank rituals on August 3 (the temple is non-riverine but Vaishnavite communities observe). Hotel rates remain low-season: Radisson Blu Temple Bay ₹7-10k, InterContinental Mahabalipuram Resort ₹8-12k, Ideal Beach Resort ₹4-6k. Stone-carving workshops along ECR resume normal hours. Crocodile Bank evening feeding 4:30pm reliable. DakshinaChitra heritage village (25km north on ECR) full hours. Beach-resort pool day still the mid-day shape. October 15 onward delivers a dramatically cleaner travel window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 8, 2, 'wait',
  'Aadi continues. 26-33C, 130-160mm rain. Sea breeze evening relief. Mid-day still demanding.',
  'August holds the July pattern. Aadi Perukku (August 3) Cauvery anchor for Vaishnavite community. Madras Day (August 22) brings Chennai cross-traffic.',
  'August continues the slow heat retreat. Granite ensemble walks pre-10am and post-4pm. Sea breeze evening relief. The dramatically cleaner window is November onward.',
  'August in Mahabalipuram extends the slow heat retreat with two cultural anchors. Aadi Perukku (August 3, fixed) is the Cauvery river-bank festival — observed primarily inland at Mayuram, Tanjore, Srirangam, Trichy, but the Vaishnavite community at the village Sthala Sayana Perumal Temple stages parallel programming. Madras Day (August 22) marks Chennai''s 1639 founding — Madras Week weekend drives strong Chennai weekend traffic to ECR. Daytime 26-33C, humidity 80 percent, rain 130-160mm across 10-12 wet days. The granite of the Five Rathas, Shore Temple, Arjuna''s Penance walks pre-10am and post-4pm. Friday-Sunday rates climb 30-40 percent versus weekday lows: Radisson Blu Temple Bay ₹8-11k weekend, ₹6-9k weekday; Ideal Beach Resort ₹4.5-6.5k weekend; Mamalla Beach Resort ₹3.5-5k weekend. Stone-carving workshops resume Madras Week visitor demonstrations. The November window remains the strong call for first-time visitors who want clean weather across the full ensemble.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-32C, 120-160mm rain. Vinayaka Chathurthi Sep 7. Heat easing.',
  'September is the bridge month. Vinayaka Chathurthi (around September 7, 2026) brings Pillayar idol immersion at Mahabalipuram beach. Heat easing. Outdoor walks reliable.',
  'September continues the gentle approach to clean weather. Outdoor walking 8-11am and 4-7pm works. Push to mid-October for the proper recovery shape.',
  'September in Mahabalipuram is the bridge month before the NE monsoon arrives. Daytime 26-32C, humidity 78 percent, sea breeze reliably from 1pm. Vinayaka Chathurthi (variable Bhadrapada Shukla Chathurthi — September 7, 2026) brings Pillayar idol immersion processions to the beach south of the Shore Temple on the eleventh day (Anantha Chaturdashi). The granite of the UNESCO ensemble walks pre-11am and post-4pm. Shore Temple sunrise (6am) still works. Friday-Sunday Chennai-Bangalore weekend traffic returns to ECR after the August lull — book Friday-Sunday 1-2 weeks ahead. Hotel rates climb 15-20 percent versus August low: Radisson Blu Temple Bay ₹9-12k weekday, ₹11-14k weekend; InterContinental Mahabalipuram Resort ₹10-14k. Stone-carving workshops at full demonstration pitch. DakshinaChitra heritage village (25km north on ECR), Crocodile Bank (40km north) day-trips work. The NE monsoon arrives mid-October — Mahabalipuram receives 250-350mm across 11-13 wet days from October 15 onward, but the temperature relief is the bigger story. Mid-October onward is the clean call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 10, 4, 'go',
  'Season opens. 24-30C, 250-350mm rain. NE monsoon arrives. UNESCO walks return mid-month.',
  'October is the season-opener at Mahabalipuram. NE monsoon delivers 250-350mm but the temperature drops dramatically — granite walks comfortable. Mid-month onward, sunrise-at-Shore-Temple weather returns clean.',
  NULL,
  'October in Mahabalipuram is the proper season opener. The NE monsoon arrives in force from mid-month — rainfall jumps to 250-350mm across 11-13 wet days, but the temperature drop is dramatic. Daytime falls from late-September''s 31-32C to 24-30C, granite of the Shore Temple and Five Rathas cools below 40C surface mid-day, sea breeze cool and reliable. The UNESCO walking trip resumes its full shape from October 15 onward. Cyclone watch begins along the Coromandel coast — IMD monitors Bay of Bengal lows from October 1; the village has historically been outside major-cyclone paths but rain can disrupt 1-2 days per week. Diwali (around October 21, 2026) brings Chennai-Bangalore weekend traffic. Hotel rates climb to 50-60 percent of December peak: Radisson Blu Temple Bay ₹10-13k, InterContinental Mahabalipuram Resort ₹11-15k, Ideal Beach Resort ₹5-8k, mid-tier hotels ₹3-5k. Mahabalipuram Dance Festival typically opens late December — Tamil Nadu Tourism announcements come mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 11, 5, 'go',
  'NE monsoon active but eases. 22-29C, 300-400mm rain. UNESCO walks full hours between showers.',
  'November is full season at Mahabalipuram. Rain still substantial (300-400mm) but mornings clean, evenings cool, UNESCO ensemble walks at full reach. Cyclone watch holds — Nivar hit Cuddalore November 25, 2020.',
  NULL,
  'November in Mahabalipuram is the proper high-season month. The NE monsoon remains active (300-400mm across 12-14 wet days) but the rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Cyclone watch holds — Cyclone Nivar landed at Cuddalore (140km south) on November 25, 2020, brushing Mahabalipuram with heavy wind but no major damage. IMD updates daily via mausam.imd.gov.in. The UNESCO ensemble (Shore Temple, Five Rathas, Arjuna''s Penance, Krishna''s Butter Ball, cave temples) walks at full reach 7am-6pm between showers. Mahabalipuram Dance Festival announcements typically come early November — programmes run late December through January with the Shore Temple open-air courtyard as venue. Hotel rates climb to 75-85 percent of December peak: Radisson Blu Temple Bay ₹12-15k, InterContinental Mahabalipuram Resort ₹13-17k, Ideal Beach Resort ₹6-9k, mid-tier hotels ₹3-5k. Stone-carving workshops along ECR run full demonstration schedules. Crocodile Bank (40km north) and DakshinaChitra (25km north) day-trips work cleanly. ECR drive from Chennai 90 minutes off-peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mahabalipuram', 12, 5, 'go',
  'Peak season. 21-28C, 150-200mm rain. Dance Festival opens at Shore Temple. Christmas-NYE rates 2-3x.',
  'December is Mahabalipuram''s operational peak. Mahabalipuram Dance Festival opens at the Shore Temple — classical Bharatanatyam, Kathak, Odissi performances. Christmas-NYE (Dec 22-Jan 5) rates 2-3x normal. Lock rooms 6-8 weeks ahead.',
  NULL,
  'December in Mahabalipuram is the operational peak — the Mahabalipuram Dance Festival opens at the Shore Temple, drawing dance critics, photographers, and the cultural-tourism circuit. The festival (Tamil Nadu Tourism, approximately December 25 to early February — verify 2026 dates via tamilnadutourism.tn.gov.in) stages Bharatanatyam, Kathak, Odissi, Kuchipudi performances against the Pallava temple backdrop. Free entry for most evening performances, ticketed gala nights ₹500-2000. Daytime 22-28C, nights 20C, rain 150-200mm across 7-9 wet days, humidity 70 percent. Cyclone watch holds through December 20 — Vardah hit Chennai December 12, 2016; Michaung hit Chennai December 5, 2023. IMD updates daily. The Christmas-NYE corridor (Dec 22 to Jan 5) sees rates run 2-3x the November baseline: Radisson Blu Temple Bay ₹18-25k, InterContinental Mahabalipuram Resort ₹20-30k, Ideal Beach Resort ₹10-14k, mid-tier hotels ₹5-8k. ECR drive from Chennai congested 4-7pm Friday-Sunday — 2 hours peak. Lock heritage hotel beds 6-8 weeks ahead. The first three weeks of December (before Dec 22) are the better-value window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
