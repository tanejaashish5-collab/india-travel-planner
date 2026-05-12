-- Visakhapatnam destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: visakhapatnam

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 1, 5, 'go',
  'Peak Eastern Ghats coast window. 19-28C, dry, Sankranti Jan 14-16 kite-flying takes over Rushikonda.',
  'January is when Vizag runs at year-best. Daytime 26-28C, nights 19-21C, rainfall under 15mm. Rushikonda and Yarada beaches at peak walkability, Kailasagiri ropeway clear, INS Kursura submarine queues short.',
  NULL,
  'Visakhapatnam in January is the version Eastern Ghats coast veterans book first. Daytime 26-28C, nights 19-21C, humidity at 65 percent, rainfall under 15mm — the cleanest weather window of the year. Rushikonda Beach (Blue Flag certified 2020, 8km north on Beach Road) and Yarada Beach (15km south, the headland-framed crescent) run at peak walkability dawn to dusk. The INS Kursura Submarine Museum (1969 Foxtrot-class sub, decommissioned and beached as a museum 2002, ₹50 entry, 2pm-8:30pm closed Monday) sees 2-3 hour weekend queues by mid-month — go on a Tuesday or Wednesday morning. Kailasagiri Hill ropeway (₹110 return, 8am-8pm) and the toy train run full schedules; the Shiva-Parvati statue and city panorama work cleanly. Sankranti (January 14-16, Andhra harvest festival cluster: Bhogi, Sankranti, Kanuma, Mukkanuma) brings kite-flying along the Ramakrishna Beach stretch and across the Yarada hilltop. Simhachalam Varaha-Lakshmi-Narasimha Temple (16km north, 11th-century Eastern Ganga origin) runs 6am-noon and 4-9pm. Hotel rates at year-peak — Park Vizag ₹12-15k, Novotel ₹9-11k, mid-bracket ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 2, 5, 'go',
  'Driest stretch. 20-30C. Vizag Beach Festival typically runs late Jan-early Feb on RK Beach.',
  'February holds the January cleanliness with rates easing 15-20 percent post-Sankranti. Rainfall under 10mm, RK Beach Beach Festival (sand sculpture, music, food stalls — annual Jan-Feb cycle) typically running. Borra Caves day trip 90km inland is the Eastern Ghats add-on.',
  NULL,
  'February in Visakhapatnam is the technical peak. Rainfall under 10mm, daytime 28-30C, nights 20-22C, humidity at 60 percent — the lowest of the year. The Vizag Beach Festival (annual, typically late January to early February on Ramakrishna Beach near the VUDA Park stretch — verify exact 2026 dates via APTDC) brings sand sculptures, music nights, food stalls and adventure-sports demos to the 5km RK Beach corridor. Submarine Museum 2-3pm slot the calmest of the day. Kailasagiri ropeway clear weather right through. The Borra Caves day trip (90km west via the Araku Valley road — million-year-old limestone karst, ₹60 entry, 10am-5pm) and the Araku Valley overnight (110km, Eastern Ghats coffee plantations) are both at peak access; the Kirandul Passenger train from Visakhapatnam to Araku via the 58-tunnel ghat section runs daily 6:50am, ₹110 second class, ₹360 chair car — the cinematic option. Beaches still at peak walkability. Banana Leaf at full tempo, Sai Ram Parlour breakfast 7-10am, RR Family Cafe for the south-Indian thali shift. Hotel rates: Park ₹10-13k, Novotel ₹8-10k, mid-bracket ₹3.5-5.5k — 15-20 percent off January peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 3, 4, 'go',
  'Last cool stretch. 23-32C. Beach walks compress to mornings and evenings. Rates 25 percent off February.',
  'March is the soft-landing month. Daytime climbs past 32C the last fortnight but Rushikonda and Yarada still work pre-10am and post-5pm. Submarine Museum and Kailasagiri ropeway full schedules. Hotel rates drop 25 percent from February — last clean-value window before April.',
  NULL,
  'March in Visakhapatnam is the transition month. Daytime 30-32C, nights 23-24C, humidity climbing to 70 percent, rainfall under 25mm. Beach walks compress: Rushikonda and Yarada work 6-10am and 5-8pm — the sand holds heat through the afternoon. Submarine Museum 2pm opening still works cleanly (the air-conditioned interior is the AC retreat). Kailasagiri ropeway and toy train run full schedules; morning slot 8-10am and evening 5-7pm hold the cool window. The Borra Caves and Araku Valley day-trip combination at peak access — the inland 800-900m elevation gives 4-5C cooler air than the coast. Simhachalam Temple morning darshan 6-11am the only viable slot. Hotel rates ease 25 percent off February: Park Vizag ₹8-11k, Novotel ₹6-9k, mid-bracket ₹3-4.5k. The last clean-value window before the April-May humidity dome converges with pre-monsoon thunderstorm activity. Banana Leaf evening biryani service 7-10pm hits the comfortable temperature band; Sri Krishna''s Veg thali (₹150-200) runs the cool-hour value play.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 4, 3, 'wait',
  'Pre-monsoon humidity. 26-34C, humidity 80 percent. Beach walks collapse mid-day. Rates 35 percent off peak.',
  'April still works for travelers willing to time the beach windows — coastal sea breeze from 5pm onward, Rushikonda Yarada walks work 6-9am and 5-8pm only. Submarine Museum and Kailasagiri AC retreats handle mid-day. Hotel rates 35 percent below January peak.',
  'April pushes Vizag into pre-monsoon stress. Rushikonda and Yarada walks collapse 10am-4pm under 34C and 80 percent humidity. Beach Road sea-breeze helps only after 5pm. October delivers materially cleaner weather. Wait for late October if comfort matters.',
  'April in Visakhapatnam is when the trip narrows to early morning and evening. Daytime 32-34C, humidity 80 percent, sea breeze starts only after 5pm. Pre-monsoon thunderstorms hit the last fortnight — short violent squalls that drop temperatures 3-4 degrees temporarily but push humidity to 90 percent for the rest of the day. Rushikonda and Yarada beach walks work as 6-9am and 5-8pm windows only. AC retreat rotation: Submarine Museum interior, Kailasagiri ropeway cabin and hilltop wind, Visakha Museum (the 1825 Dutch bungalow on Beach Road), AU Convocation Hall ground stretch, Sai Ram Parlour and Banana Leaf. Kailasagiri ropeway runs through but the toy train cabins get hot midday. Borra Caves day trip still works — the cave interior holds 18-22C year-round, the contrast worth the inland drive. Hotel rates run 35-40 percent below January: Park ₹6-9k, Novotel ₹5-7k, mid-bracket ₹2.5-3.5k. Weekday occupancy under 50 percent. The October-March window is dramatically better for first-time visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 5, 2, 'wait',
  'Peak humidity plus cyclone-cell risk. 27-34C, humidity 85 percent. Asani Cyclone hit May 2022 — watch IMD.',
  'May functions only for heritage-and-AC travelers willing to anchor in Submarine Museum, Kailasagiri ropeway and Borra Caves. Pre-monsoon thunderstorms knock grid 1-2 hours daily. Cyclone risk small but present — Asani struck the AP-Odisha coast May 11, 2022.',
  'May in Vizag pairs peak humidity with the cyclone-cell pre-monsoon risk window. Beach walks unsafe under 34C and 85 percent humidity except 6-8am. Asani Cyclone hit the AP-Odisha coast May 11, 2022 — IMD forecast monitoring mandatory. October is dramatically better.',
  'May in Visakhapatnam is the closing month before the southwest monsoon arrives around June 1-5. Daytime 32-34C, humidity 85 percent, sea breeze unreliable. Pre-monsoon thunderstorms hit the third and fourth week — short squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours and raise humidity to 90 percent. The early-cyclone risk window (Bay of Bengal pre-monsoon cyclones) is small but present — Cyclone Asani made landfall along the AP-Odisha coast on May 11, 2022, brushing past Vizag with strong winds. IMD bulletins via mausam.imd.gov.in worth checking. Tourist load drops to roughly a third of January peak. Park Vizag ₹5-7k versus January''s ₹14k, Novotel ₹4-6k, mid-bracket ₹2-3k. Beach walks compress into 6-8am and 7-8pm windows. AC museum-cafe rotation is the only viable mid-day shape. Submarine Museum, Kailasagiri ropeway, Borra Caves day trip, Sai Ram Parlour, RR Family Cafe — that''s the May playbook. Better still: wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 6, 2, 'wait',
  'SW monsoon arrives early June. 25-31C, 200-250mm rain. Coastal AP is the lighter monsoon side (vs Kerala).',
  'June is the SW monsoon arrival — AP''s east coast catches the weaker northward branch (200-250mm versus Kerala''s 600-700mm). Submarine Museum, Kailasagiri ropeway, Borra Caves all hold hours. Heritage works in mornings between squalls but the beach trip collapses.',
  'June in Vizag is the monsoon arrival without the upside — coastal AP catches the SW monsoon''s weaker northward branch but the squalls still close beach walks and knock the coastal-city shape. Heritage and AC venues work intermittently. October delivers a cleaner Vizag for first-time visitors.',
  'June in Visakhapatnam is the SW monsoon arrival point on India''s east coast. The southwest current hits the AP coast on or around June 1-5 — IMD declares formal monsoon onset annually. Rainfall jumps from May''s 80mm to 200-250mm across 15-18 wet days; Vizag sits on the SW monsoon''s weaker northward arm (Kerala gets 600-700mm same month). Daytime 28-31C feels mild but 88 percent humidity and intermittent sustained downpours close down the beach trip. Rushikonda and Yarada open but visitor traffic falls 70 percent. Submarine Museum, Kailasagiri ropeway (operates if wind under 40kmph — closures occasional), Borra Caves all hold hours. Simhachalam Temple morning darshan still works. Hotel rates at year-low: Park ₹4-6k, Novotel ₹3.5-5k, mid-bracket ₹1.8-2.5k. Andhra University Convocation Hall ground and the Buddhist heritage circuit (Thotlakonda, Bavikonda, Pavurallakonda — 8-25km north, 2nd century BCE Hinayana ruins) work in monsoon windows. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 7, 1, 'skip',
  'Peak SW monsoon. 25-30C, 250-300mm rain. Beach walks impossible. Cyclone-track risk continues.',
  NULL,
  'July is the wettest stretch on the Vizag coast. Rainfall 250-300mm across 20-22 wet days. The beach-and-Beach-Road shape that defines Vizag runs at zero. Cyclone-track watch continues. Skip Vizag proper. Heritage-only travelers can manage with Borra/Araku as the inland anchor.',
  'July in Visakhapatnam is monsoon at its most stubborn for the coastal trip shape. Rainfall averages 270mm across 20-22 wet days, often as 6-12 hour sustained deluges. Visakhapatnam Airport (Vizag International, VTZ) runs reduced inbound timetables on the wettest weeks; train traffic on the Howrah-Chennai trunk delays 1-3 hours on heavy-rain days. The Beach Road corridor — Rushikonda, RK Beach, Lawson''s Bay, Yarada — runs near-empty. Beach walks impossible most days. The cantilevered submarine and Kailasagiri ropeway both close in heavy-wind windows. Hotel rates remain at year-low: Park ₹3-5k, Novotel ₹3-4.5k, mid-bracket ₹1.5-2.2k. The trip you came for — beach walks, RK Beach sunset, Kailasagiri ropeway in clear weather, day trip to Borra-Araku via the Eastern Ghats — is functionally closed. The Buddhist heritage circuit (Thotlakonda, Bavikonda, Pavurallakonda) can be done in 90-minute clear windows but the hilltop ruins flood. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 8, 1, 'skip',
  'Monsoon continues. 25-30C, 200-250mm. Krishna Janmashtami in temple precincts. Beach trip stays closed.',
  NULL,
  'August holds July''s pattern with slight rainfall easing. 200-250mm across 18-20 wet days. Beach walks remain impossible. Krishna Janmashtami draws crowds to Simhachalam and Sankarmatham temples but the broader coastal trip stays rain-locked. Skip.',
  'August in Visakhapatnam stays in monsoon mode with the weaker tail of the southwest current still active. Rainfall 200-250mm across 18-20 wet days, daytime 28-30C, humidity 86 percent. Krishna Janmashtami (mid-to-late August) brings overnight crowds to Simhachalam and the city''s smaller Krishna temples — Janmashtami midnight aarti is the cultural anchor of the month but doesn''t justify the broader trip. The beach corridor stays largely closed for walking. AC venues — Submarine Museum, Kailasagiri ropeway in clear-wind windows, Borra Caves on dry days inland — hold hours but the day-trip planning collapses under 2-3 day wet stretches. Hotel rates run at year-low: Park ₹3.5-5k, Novotel ₹3-4.5k, mid-bracket ₹1.5-2.5k. Sai Ram Parlour, Banana Leaf, RR Family Cafe all hold full hours but the trip is essentially a city-life and food stop, not the coastal-walks visit Vizag is built for. The next clean window opens in mid-October. Cyclone track watch via mausam.imd.gov.in continues — September-October is the peak Bay of Bengal cyclone season for the east coast.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 9, 2, 'wait',
  'SW monsoon retreat begins. 25-31C, 150-200mm. NE monsoon pre-positioning. Cyclone risk peaks Sep-Oct.',
  'September is the in-between month — SW monsoon retreats through the second half (around Sep 25-30 for east-coast withdrawal). 150-200mm rainfall. Beach walks return intermittently. But Sep-Oct is the peak Bay of Bengal cyclone window — Hudhud-anniversary calendar.',
  'September is on the trickle back but caught in the SW-monsoon retreat / NE-monsoon arrival overlap that also coincides with peak Bay of Bengal cyclone formation. Hudhud-class cyclone risk is the historic baseline (Oct 12, 2014 — devastated Vizag, 18-month rebuild). Wait for mid-October.',
  'September in Visakhapatnam is the trickle back without the safety yet. Rainfall drops to 150-200mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from the AP coast around September 25-30 (IMD declares formal withdrawal). But September-October is the peak Bay of Bengal cyclone season — Hudhud landed at Vizag on October 12, 2014 as a Category 4 (wind speed 195 kmph) causing widespread destruction across the city; rebuild took 18 months. Cyclone Phailin hit the Odisha-AP coast on October 12, 2013. Daytime 28-31C, humidity easing to 80 percent. Heritage venues all open at full hours; the beach corridor returns to walkability in clear windows. Visakhapatnam Airport runs near-full schedules. Hotel rates climb 15-20 percent versus August lows but remain 45-50 percent below January peak: Park ₹4-6k, Novotel ₹4-5.5k, mid-bracket ₹2-3k. Cycle call: a 3-day September visit works for monsoon-tolerant travelers, but the October 15 onward window is dramatically cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 10, 4, 'go',
  'Season opens. 23-30C. NE monsoon residue and cyclone-watch first fortnight. Beaches return mid-month.',
  'October is the season opener at Vizag. NE-monsoon residue and the early-October cyclone window keep the first 10-15 days unstable (Hudhud-anniversary calendar, Oct 12, 2014). From October 15 onward, the coastal-walks trip returns to full shape. Rates 30 percent below December peak.',
  NULL,
  'October in Visakhapatnam is the proper return to coherent. Rainfall drops to 100-150mm with the bulk falling in the first ten days; from October 15 onward Vizag flips into clean beach-walks mode. Daytime 27-30C, humidity falling from 80 to 72 percent. The first fortnight carries the Bay of Bengal cyclone risk — Hudhud landed October 12, 2014 (Vizag''s defining recent disaster), Phailin October 12, 2013 — so weather-watch via IMD mausam.imd.gov.in is mandatory through the 5-20 October window. Beyond that, Rushikonda Beach, Yarada Beach, Lawson''s Bay, the RK Beach walking corridor all return to full walkability. Submarine Museum and Kailasagiri ropeway run full schedules; Simhachalam Temple darshan back to year-round hours. Borra Caves and Araku Valley day trips at full access — the inland 900m elevation gives 4-5C cooler air than the coast. Hotel rates run 30-35 percent below December peak: Park Vizag at ₹8-11k, Novotel at ₹6-9k, mid-bracket ₹3-4.5k. Banana Leaf at full tempo, Sai Ram Parlour for breakfast queues, RR Family Cafe for the south-Indian shift. Strong call for first-time visitors who want full coastal hours minus the Christmas-NYE crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 11, 5, 'go',
  'Peak window opens. 21-29C, rainfall under 50mm. Karthika Masam at Simhachalam. Cyclone risk drops sharply.',
  'November is the year''s second peak. Rainfall under 50mm, full beach-walk and ropeway weather, Karthika Pournami (full moon, mid-month) brings mass deepam lighting at Simhachalam Temple. Hotel rates 25 percent below December.',
  NULL,
  'November in Visakhapatnam is the year''s second-peak month behind January. Rainfall under 50mm, daytime 27-29C, sea breeze cooling evenings to 21-22C, humidity dropping below 70 percent. The Bay of Bengal cyclone risk falls sharply after October 25 (Mandous in December 2022 and Michaung in December 2023 are notable outliers but November itself stays relatively clear). Rushikonda, Yarada, Lawson''s Bay, RK Beach corridor at full walkability dawn to dusk. Submarine Museum and Kailasagiri ropeway clear-weather slots run all day. Karthika Masam (the Tamil-Telugu month from mid-November to mid-December) brings mass deepam (oil-lamp) lighting at Simhachalam — Karthika Pournami (full moon, falls mid-month) is the peak night with the Varaha-Narasimha precincts lit by thousands of lamps. Borra Caves and Araku Valley day trips at peak access. Hotel rates climb to 75-80 percent of December peak: Park at ₹10-12k, Novotel at ₹7-9k, mid-bracket ₹3.5-5k, beachfront homestays ₹2-3k. Banana Leaf evening biryani shift hits the comfortable temperature band; Sri Krishna''s Veg thali at noon. Strong call for first-time visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'visakhapatnam', 12, 5, 'go',
  'Peak season. 20-28C, dry. Christmas-NYE rates 1.8-2.5x. Late-Dec cyclone outliers — Mandous, Michaung.',
  'December is when Vizag runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 1.8-2.5x normal. Mandous (Dec 2022) and Michaung (Dec 2023) are recent reminders that late-season cyclones can still form — IMD watch through the second week.',
  NULL,
  'December in Visakhapatnam is the operational peak and the most expensive stretch of the year. Daytime 26-28C, nights 20-21C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.8-2.5x the November baseline: Park Vizag hits ₹15-18k, Novotel ₹11-14k, mid-bracket ₹5-7k, beachfront homestays ₹3-4.5k. Recent late-season cyclones — Mandous (December 9-10, 2022, hit Mahabalipuram and brushed Chennai but pulled moisture and wind to the AP coast); Michaung (December 5-6, 2023, made landfall near Nellore as severe cyclonic storm) — are reminders that Bay of Bengal cyclogenesis can extend into early December. IMD mausam.imd.gov.in watch through the second week is standard practice. Beyond that, Rushikonda, Yarada, RK Beach run at peak walkability; Submarine Museum and Kailasagiri ropeway at clear-weather peak; Simhachalam morning darshan 6-11am still works through Karthika tail. Christmas Eve services at the Visakhapatnam Cathedral and the New Year''s Eve fireworks on RK Beach are the headline social moments. The first three weeks of December are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
