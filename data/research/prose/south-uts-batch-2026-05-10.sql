-- South UTs prose batch — 72 rows (6 dests × 12 months)
-- Generated 2026-05-10
-- Voice: locked NakshIQ FT Weekend register
-- destinations: borra-caves, daman, diu, silvassa, karaikal, puducherry

-- =========================================================
-- BORRA CAVES (Eastern Ghats, Andhra Pradesh) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 1, 5, 'go',
  'Peak Araku window. 10-22C in valley, cave interior 16C year-round. Vizag-Borra train runs full.',
  'January is the year''s cleanest cave-tourism window. Northeast monsoon has spent itself, the Kirandul Passenger (58501) leaves Visakhapatnam at 06:50 and reaches Borra Guhalu at 09:40 with full tunnel-and-viaduct theatre, and the cave grounds open 10am-1pm and 2pm-5pm. Pack a light fleece — Araku evenings drop to 10C.',
  NULL,
  'Borra Caves in January is the version Eastern Ghats regulars wait the year for. Daytime at the 900m valley sits 18-25C, mornings drop to 10-12C, and the cave interior holds 16C regardless of the season — the limestone temperature buffer that makes this one of the few all-weather attractions in tropical India. The 58501 Kirandul Passenger from Visakhapatnam (06:50 dep, 09:40 Borra Guhalu) is the trip itself: 58 tunnels, the Anantagiri viaduct, Tyda forest stop. Cave entry is ₹60 adults / ₹45 children, phone camera ₹25, video ₹100. APTDC has run electric lighting (63 mercury, sodium-vapour and halogen lamps) since the 1962 installation, and the chambers stay walkable 10am-1pm and 2pm-5pm with a 30-minute lunch closure. The 400 descent steps to the main hall are dry in January — they get treacherous after rain. Last train back from Borra: 14:55 (ARK VSKP SPL) or 16:50 (KRDL VSKP).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 2, 5, 'go',
  'Driest stretch of the year. 12-26C valley. Train seats free up after first week. Ideal hike pairing.',
  'February is when the Araku valley runs cleanest. Rainfall under 10mm, road conditions to Tyda and Anantagiri firm, Coffee Trail walks workable all day. Cave humidity inside the chamber drops noticeably — the limestone formations are at their photogenic peak.',
  NULL,
  'February in Borra Caves is the technical peak month. Rainfall averages 5-10mm against the annual 950mm, the valley runs 12-26C, and the Araku Coffee Trail and Padmapuram Gardens pair well as a 2-day add-on. The Vizag-Kirandul train holds its winter timetable; the second-week Republic-Day spillover thins out and seats free up to 3-4 day lead. Cave electric lighting is at full coverage, but bring a torch for the gallery beyond the Shiva-linga formation — the APTDC LED install runs to about 70 percent of the chamber depth. Auto from Borra Guhalu station to the cave gate: ₹50, walking distance is 10 minutes if you do not feel like haggling. Borra village has tea-and-pakora shacks but no full restaurant; pack lunch from Visakhapatnam or eat at the APTDC canteen at the cave entrance.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 3, 4, 'go',
  'Last cool window before pre-summer heat. 14-30C valley. Train and cave fully operational.',
  'March extends the February experience minus the Republic-Day crowd. Lodging in Araku town discounts 20-25 percent versus February, the Anantagiri tribal weekly market (Wednesday) is more accessible. Last comfortable month before the plains heat reaches the hills.',
  NULL,
  'March in Borra Caves is the soft-landing month between season and summer. Daytime 16-30C in the valley, with Araku town nights still dropping to 14C; the cave interior holds 16C as always. Rainfall remains under 15mm. The Kirandul Passenger runs its full timetable; weekday seats are walk-up bookable. Anantagiri Wednesday tribal market draws 600-800 people from the surrounding villages — the bus from Araku town leaves around 7am and returns by 2pm, ₹40 each way. Coffee plantations around Tyda are mid-flowering and the homestay network (Damuku, Jungle Bells, Tribal Resort) holds occupancy at 50-60 percent. Cave entry queues are walk-in. The 4km road from Borra Guhalu railway station to the cave gate is paved but narrow; private vehicles park 200m below, last stretch is on foot.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 4, 3, 'go',
  'Pre-summer heat in valley. 18-34C. Cave interior 16C is now the draw, not the side benefit.',
  'April flips the script — the cave''s 16C interior is the day''s relief, not its supporting act. Train schedules hold, but plan to stay inside the chamber longer than the 30-minute walk-through suggests. Lodging rates drop 30 percent.',
  NULL,
  'April in Borra Caves shifts from cool-getaway to heat-relief. The Araku valley pushes to 30-34C in the afternoon, humidity climbs past 60 percent, and the 16C cave interior becomes genuinely valuable rather than incidentally pleasant. The Kirandul Passenger runs on time but the unreserved coaches get warm; book Second Sitting (₹110, reservable) instead of General. The 400-step descent into the main chamber takes the heat out of you, then the cool returns it; allow an hour minimum inside, more if you can. The cave canteen sells lemon-water and tea at fair rates. Araku town hotels (Mayuri Hill Resort, Aalankrita) discount 25-30 percent versus February peak. Skip the Coffee Trail walk between 11am-3pm; mornings before 10am and evenings after 5pm are still workable. ATMs in Araku work; Borra village has none.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 5, 2, 'wait',
  'Peak pre-monsoon heat. 20-36C, humidity 70 percent. Cave interior still 16C but valley walks suspended.',
  'May is for travelers who want the cave only and can skip the broader Araku experience. The chamber stays at its standard 16C, but everything that gets you there — train, walk, valley loop — is gruelling. Pre-monsoon thunderstorms also start.',
  'May pushes Araku into the hottest stretch of its year. Humidity creeps past 70 percent, pre-monsoon thunderstorms hit two-three afternoons a week (knocking electric lighting in the cave for 30-90 minutes at a stretch), and the trip beyond the cave proper falls apart.',
  'May in Borra Caves is the month the experience compresses. Valley temperatures hit 22-36C, humidity touches 70 percent, and pre-monsoon thunderstorms — which the Eastern Ghats catch from late April — knock APTDC''s electric lighting in the chamber for 30 to 90 minutes at a stretch on storm days. The 16C cave interior remains the draw, but the train ride bakes (the Kirandul Passenger has no AC), the 400-step descent leaves you spent, and the broader Araku valley loop (Coffee Museum, Tribal Museum, Tyda forest walks) collapses past 11am. Hotel rates run 35-40 percent below February — it is the year''s cheapest stretch — but only worth booking if the cave is the entire agenda. Carry a torch, water, ORS sachets. Plan a one-night stay maximum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 6, 2, 'wait',
  'SW monsoon onset. 22-32C with 200-250mm rain. Cave 400-step descent gets slick. Train runs but tunnels can flood.',
  'June is the soft monsoon — the southwest current gives the Eastern Ghats moderate rainfall (400mm short of Kerala), the valley turns dramatically green, and waterfalls near Anantagiri start running. The 400-step cave descent gets slippery; walk it carefully.',
  'June starts dropping rain on the Eastern Ghats. The cave interior holds 16C but the descent steps turn slick, the Vizag-Kirandul train tunnels can flood briefly, and lighting outages run 1-2 hours during heavier downpours. Wait for September if monsoon green is the draw.',
  'June in Borra Caves is when the southwest monsoon hits the Eastern Ghats with moderate force — 200-250mm of rainfall, evening downpours mostly, valley turning visibly green from week two. Daytime drops to 22-32C; the air feels lighter, but humidity climbs past 80 percent. The Kirandul Passenger holds its timetable but tunnels along the route catch water on the worst days, leading to 30-90 minute halts. Inside the cave, the 400-step descent gets genuinely slippery — Borra has no railing for half its length, and limestone-water mix is treacherous. The cave does not close, but APTDC stations a guard at the entrance during heavy days. Katiki Falls, 7km from the cave, runs at full strength now and is the under-rated companion attraction. Hotel rates are at year-low. The trip works for the rain-loving traveler.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 7, 1, 'skip',
  'Peak monsoon. 22-30C, 300-350mm rainfall. Cave descent unsafe, train delays routine. Skip.',
  NULL,
  'July is the wettest month at Araku. Cave-descent steps run with water, the Vizag-Kirandul track sees landslide closures averaging 2-3 days a month, and the 16C interior is reachable only on dry windows that may not arrive during your trip.',
  'July in Borra Caves is the month most Eastern Ghats operators stop selling cave tours. Rainfall hits 300-350mm across 22-25 wet days. The Kirandul Passenger gets 1-3 days of cancellation a month due to landslides on the Anantagiri-Borra section; East Coast Railway recovers fast but you cannot plan around it. Inside the cave, water seeps down the descent steps continuously, and APTDC closes the chamber on the heaviest-rain days (no posted schedule — staff judgment). Katiki Falls and the broader Araku waterfall network are at peak flow but reaching them on red-mud roads is its own problem. Hotels at 50 percent below peak rates, but the trip you came for is a coin-flip with the weather. The next viable window is mid-September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 8, 1, 'skip',
  'Monsoon continues. 22-30C, 250-300mm rain. Cave access intermittent. Skip.',
  NULL,
  'August holds July''s pattern with marginally fewer wet days. Cave closures happen on the worst-rain afternoons, the descent stays slippery, and the train runs but with frequent delays. Wait for late September.',
  'August in Borra Caves is more of July with slightly fewer extreme-rain days. Rainfall 250-300mm, valley 22-30C, humidity at 85 percent. The Kirandul Passenger holds a six-day timetable but landslide-led cancellations are common on the Sunabeda-Borra-Tyda stretch. Cave access remains gated by APTDC staff judgment on the heaviest mornings; expect 30-50 percent of August mornings to either close the chamber or limit it to the upper galleries above the slippery descent. Anantagiri''s Wednesday tribal market continues — bus from Araku town gets through unless the previous day saw 60mm-plus. The valley itself runs at year-deepest green — coffee-plantation canopy, low cloud, mist on the Anantagiri viaduct — but the cave at the centre of the trip works only intermittently. October cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 9, 3, 'go',
  'Monsoon retreat. 20-28C, rainfall 150-200mm. Cave fully reopens by mid-month. Valley at peak green.',
  'September is the recovery month. Rainfall halves versus August, the SW monsoon retreats from the Eastern Ghats by mid-month, the Vizag-Kirandul timetable normalises, and the valley sits at its lushest. Cave descent dries out by the third week.',
  'Early September is still rain-heavy on the Eastern Ghats. The cave reopens fully only after the mid-month rainfall break. If your dates are in the first fortnight, push to mid-October.',
  'September in Borra Caves is the trickle back to normal. Rainfall drops to 150-200mm, mostly first half. By September 18-20 the southwest monsoon retreats from the Eastern Ghats and the Kirandul Passenger normalises its timetable. Cave-descent steps dry out a week after the last sustained rain; APTDC reinstates regular hours (10-1, 2-5) by the third week. Valley is at its post-monsoon peak — coffee bushes deep green, Katiki and Padmapuram still running, Anantagiri viewpoints clear of dust. Daytime 22-28C, humidity dropping to 75 percent. Araku town hotels sit at year-low rates (50 percent below February) for the first 10 days, then climb 15-20 percent as the season opens. The smart traveler''s call is the September 20 to October 5 window — Borra at its lushest, before the Diwali-October rush.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 10, 4, 'go',
  'Season opens. 18-28C, NE monsoon spillover 100-150mm. Cyclone watch on Bay of Bengal coast.',
  'October is the season opener for Borra. Rainfall halves again versus September, the cave runs full hours, train timetable holds. Watch the IMD bulletins — Bay of Bengal cyclones can disrupt 3-4 day windows in late October, but Eastern Ghats elevation softens the worst.',
  NULL,
  'October in Borra Caves is when the Eastern Ghats return to coherent. Rainfall 100-150mm — most in the first 10 days — and daytime 18-28C with humidity falling to 70 percent. The Kirandul Passenger runs its full timetable. The cave descent is dry, lighting consistent, and the afternoon 2pm-5pm slot is the cleanest of the day for photos. Bay of Bengal cyclones do form in October — the season runs to mid-November — but Araku at 900m elevation gets the wind-rain spillover rather than direct hits. The catch: a named system passing within 200km of Visakhapatnam can knock the train timetable for 24-48 hours. Track IMD bulletins three days out. Hotel rates run 25-30 percent below January peak. Diwali week, variable date, brings a 5-day bump at Araku-town hotels — book around it if dates allow.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 11, 5, 'go',
  'Peak builds. 14-26C, rainfall under 50mm. Train sold out on weekends. Cyclone risk fades by week three.',
  'November is the proper return to peak Eastern Ghats form. Rainfall drops below 50mm, valley dries out, days are at 26C with bright skies. The Vizag-Kirandul Passenger fills weekend round-trips 5-7 days ahead — book the train before the hotel.',
  NULL,
  'November in Borra Caves is the year''s second-peak month behind January. Daytime 16-26C, nights at Araku-town drop to 12-14C, rainfall under 50mm with most of it in the first week. Bay of Bengal cyclone risk fades by November 20 — the last named system of the season usually forms around then. The Kirandul Passenger sells its 200-odd reservable seats 5-7 days ahead on weekend departures; book through irctc.co.in or station counter at Visakhapatnam Junction (counter 7-8 are general, counter 4 is reservation). Cave runs full hours, lighting consistent, queues 10-15 minutes at most. Anantagiri Wednesday tribal market is at peak attendance after the harvest. Araku town hotels climb to 70 percent of peak rates by month-end as Christmas-week travellers begin booking. Pack a fleece for evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('borra-caves', 12, 5, 'go',
  'Peak season. 10-24C, dry, train sold out Christmas-NY. Book 21 days ahead.',
  'December is when the Eastern Ghats run cleanest. Rainfall under 30mm, days 22-24C, nights at Araku town drop to 10C. Christmas-NY week sells out the Kirandul Passenger 14-21 days ahead and pushes hotel rates 40-50 percent above November. Lock dates early.',
  NULL,
  'December in Borra Caves is the operational peak. Daytime 12-24C, nights 10-12C, rainfall under 30mm. The cave interior''s 16C now feels mild rather than cold against the valley air. The 58501 Kirandul Passenger sells out 14-21 days ahead from December 22 to January 2; the alternative is the East Coast Express to Visakhapatnam plus an APTDC bus or rented car (₹3,500-4,500 round-trip from Vizag). Cave entry queues stretch to 30-40 minutes on Christmas day and December 26-31 — arrive at the 10am opening or after 3pm. Araku-town hotels (Aalankrita Resorts, Mayuri Hill Resort, APTDC Punnami) hit peak rates and full occupancy December 24 to January 2; the first three weeks run 30-35 percent cheaper. Anantagiri Tribal Market falls on Wednesdays — check date before planning the day. Pack layers; the train and the cave both call for them.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- DAMAN (Devka, Moti Daman, Nani Daman) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 1, 5, 'go',
  'Peak Arabian-Sea winter. 15-28C, dry. Mumbai-Surat weekend traffic peaks Friday evening.',
  'January is when Daman runs at its most coherent. Cool dry weather, alcohol legal (Daman is a Union Territory while surrounding Gujarat is dry), Devka and Jampore beaches at low-tide swim levels, Moti Daman fort walks comfortable all day. Friday-evening Mumbai exodus on NH48 makes a 5-7 hour drive vs 2.5 on a Tuesday.',
  NULL,
  'Daman in January is the Mumbai-weekenders'' rotation slot. Daytime 18-28C, nights drop to 15-16C, the Arabian Sea sits at 24C and Devka Beach low-tide windows (check the Vapi tide table) open 6-9am and 4-7pm for safe wading; the rocky outcrops and undertow make full swims a coastguard concern. The Moti Daman ferry — ₹10 across Damanganga river — runs 7am-7pm and connects the Cathedral of Bom Jesus (1559, golden wood altar, open 7am-7:30pm with mass at 6:30am Sunday) to Nani Daman''s St Jerome Fort. Daman''s alcohol-licensed status is the worst-kept secret on this coast: bars on Devka Beach Road and the Mirasol-Diu Resort string keep weekend Gujarat traffic flowing. Mumbai to Daman is 175km — 2.5-3 hours on a Tuesday, 5-7 hours Friday 4pm onwards on NH48 via Vapi. ATMs concentrate around Nani Daman bus stand; Moti Daman has one working machine (Bank of Baroda) that runs out by Sunday afternoon.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 2, 5, 'go',
  'Driest month. 16-30C. Republic Day spill thins out. Beach-shack rates at peak.',
  'February delivers the Konkan-coast equivalent of clean: rainfall under 5mm, low humidity, comfortable mid-day walks. The fort circuit (Moti Daman fort walls, Bom Jesus, Lighthouse) takes a half-day on foot. Hotel-Mirasol and Sandy Resort hold rates at January levels.',
  NULL,
  'February in Daman is the cleanest of the cool months. Rainfall averages under 5mm, humidity at 60 percent, daytime 18-30C. The Damanganga estuary low tide opens daily mud-flat birding strips — flamingos visit Nani Daman backwaters in the second half. Moti Daman fort walls run 2km of accessible rampart with the lighthouse at the south end (₹10 climb, 9am-6pm); the Bom Jesus golden altar is best lit between 4-5pm when the western windows catch sun. Friday-Sunday Gujarat traffic builds — Surat to Daman is 100km on NH48 and 2 hours mid-week, 4 hours Friday evening. Sea-facing hotel rates (Mirasol, Sandy, Cidade) hold January peak through to February 15, then start sliding. Spice Galleon at Gold Beach Resort and Hotel Mirasol''s sea-view restaurant are the better Portuguese-influenced kitchens; both take cards. Devka Beach evening shacks run 6pm-11pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 3, 4, 'go',
  'Last cool window. 19-32C. Holi traffic mid-month. Hotel rates drop 20 percent.',
  'March extends the February experience minus the dry-air comfort. Days warm to 32C by month-end but evenings stay pleasant, sea-bathing windows lengthen, hotel rates begin sliding 20-25 percent. Holi week brings a Friday-Tuesday traffic surge on NH48.',
  NULL,
  'March in Daman is the soft-landing month. Daytime 22-32C, humidity climbing to 65 percent in the last fortnight, evenings still in the 21-23C band. The Holi long weekend — variable date — sends Surat and Ahmedabad traffic toward both Daman and Diu, which crowds Devka Beach Road and stretches the Vapi-Daman 12km drive to 90 minutes on the Friday. Outside that window, hotel rates slide 20-25 percent versus February peak; Hotel Mirasol drops walk-in rates from ₹6,500 to ₹5,000. Cathedral of Bom Jesus is at its most pleasant late-afternoon (the 1559 facade catches a deep-amber 5pm glow). Beach-shack happy hours start at 5pm; Devka''s licensed-bar belt is the dry-state oasis Mumbai and Surat weekenders show up for. Last comfortable month before April pushes humidity past 75 percent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 4, 3, 'go',
  'Pre-summer heat. 23-34C. Humidity 75 percent. Bom Jesus and indoor fort tours hold up; beach time narrows.',
  'April still functions for the alcohol-and-AC weekend — bars are open, hotels are AC-strong, Bom Jesus and the Moti Daman fort wall remain walkable mornings and evenings. Sea-bathing collapses past 10am due to heat and rising humidity.',
  NULL,
  'April in Daman is when the trip narrows to its core. Daytime 24-34C with humidity past 75 percent; the Devka Beach walk and fort circuit work only before 10am or after 5pm. The Arabian Sea warms to 28C, taking the cooling-bath element off the table. The trip still functions on indoor-and-evening lines: AC hotel rooms (Mirasol, Cidade de Daman, Sandy Resort), the Bom Jesus interior, the Damanganga ferry rides at sunset. Beach-shack happy hours stretch to 5-9pm; the dry-Gujarat weekend traffic still flows on Friday evenings. Hotel rates drop another 25-30 percent versus February. Carry sunscreen and accept that 10am-5pm is for the pool. Friday-Sunday occupancy still 60-70 percent; Tuesday-Thursday under 30 percent and prices reflect that.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 5, 2, 'wait',
  'Peak heat. 25-36C, humidity 80 percent. Pre-monsoon thunder. Beach activities collapse. Indoors only.',
  'May is when Daman becomes a pool-and-bar weekend. Outdoor beach access is a pre-9am or post-7pm window. Hotel rates at year-low. Workable only for travelers prioritising AC, alcohol-availability, and short distance from Mumbai or Surat.',
  'May runs hot and sticky on the Konkan coast. Devka Beach is unwalkable mid-day; the fort circuit collapses by 11am. Pre-monsoon thunderstorms knock power 1-3 hours through the month. The trip works only as a Mumbai-Surat short-hop pool-and-bar weekend; better windows return in October.',
  'May in Daman is when the coastal weekend compresses to its smallest viable shape. Daytime 26-36C, humidity 80 percent, sea at 30C, and the air thick from 9am to 7pm. Pre-monsoon thunderstorms — the first squalls of the southwest monsoon advance — start arriving in the last 10 days, knocking grid power for 1-3 hours at a stretch. The fort, the cathedral, the Devka Beach walk all collapse mid-day. The trip narrows to AC hotel room, hotel pool, evening beach-shack hour, and the licensed-bar circuit that drives Gujarat weekend traffic regardless of weather. Hotel rates run at year-low — Mirasol and Cidade de Daman drop walk-in rates 40 percent. Friday-Sunday occupancy holds at 60 percent; Tuesday-Thursday hotels are half-empty and rates negotiable. Push to October if comfort matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 6, 1, 'skip',
  'SW monsoon onset. 25-32C, 250-300mm rain. Rough seas, beach unsafe, fort circuit waterlogged. Skip.',
  NULL,
  'June is the southwest monsoon hitting the Konkan coast at speed. Devka Beach goes off-limits to swimming (red-flag advisory), the Damanganga river floods low-lying sections of Moti and Nani Daman, and the cyclone risk on the Saurashtra-Gujarat coast peaks at the start of the month.',
  'June in Daman is when the southwest monsoon hits. Rainfall jumps to 250-300mm over 18-22 wet days, the Arabian Sea turns rough (3-4m wave heights), and Devka Beach goes red-flag — swimming is enforced-prohibited by Coast Guard advisory. The Damanganga river floods low-lying lanes in Nani Daman during 80mm-plus days. June is also the start of Saurashtra-Gujarat coast cyclone season — the worst recent example was Cyclone Vayu (June 2019) and Cyclone Biparjoy (June 2023), which both forced full UT-administration evacuations. The Moti Daman ferry suspends on rough-tide days. Bom Jesus stays open but the walk to it gets soaked. Hotel rates at year-low — 50 percent below February — but the trip you came for cannot happen. Mumbai-Surat weekend traffic disappears. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 7, 1, 'skip',
  'Peak monsoon. 24-30C, 400-500mm rain. Beaches closed, NH48 floods. Skip.',
  NULL,
  'July is the wettest month — 400-500mm of rain over 25-27 wet days. Devka Beach is closed to public access on red-alert days, NH48 between Vapi and Daman waterlogs near the Damanganga bridge, and the trip you came for genuinely cannot happen.',
  'July in Daman is the year''s wettest stretch. Rainfall 400-500mm, the Arabian Sea sits in active monsoon, and Devka Beach is closed to public entry on the worst 8-10 days of the month under Coast Guard red alert. NH48 between Vapi and Daman crosses the Damanganga river bridge; the approach roads waterlog after 100mm-plus rain events, adding 1-2 hours to a normally 30-minute drive from Vapi station. The Moti Daman ferry suspends entirely most days; the road bridge across Damanganga handles all crossings. Bom Jesus, the Cathedral, and St Jerome Fort remain open but visitor traffic is near-zero. Hotels run skeleton occupancy at 50-60 percent below peak. The trip you came for — beach, bar, fort walk — does not work this month. Plan October at the earliest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 8, 1, 'skip',
  'Monsoon continues. 24-30C, 350-400mm rain. Beach closed, fort walks soggy. Skip.',
  NULL,
  'August holds the July pattern — 350-400mm of rain, beaches closed, fort circuit waterlogged. Independence Day brings a long-weekend Mumbai surge into Daman regardless, but the trip itself remains hollow.',
  'August in Daman holds July''s monsoon pattern. Rainfall 350-400mm across 22-25 wet days, daytime 24-30C, humidity at 90 percent. Devka Beach remains under red-flag swim restriction; the Coast Guard does not lift it for any sustained window in August. NH48 from Mumbai to Daman runs but waterlogs in pockets; the 175km drive can stretch to 6-7 hours on a flooded weekend. Independence Day long weekend (August 15-17) sends a domestic surge into both Daman and Diu — alcohol-availability outweighs weather for a part of the Mumbai weekenders — and hotels in the Devka Beach Road belt sell out 7-10 days ahead. Outside that window the trip does not work. Bom Jesus and St Jerome Fort stay open but in monsoon-lonely mode. The next clean weekend is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 9, 2, 'wait',
  'Recovery. 24-30C, 200mm rain easing. Beach reopens late-month. Patchy.',
  'September is the trickle back to coherent. Rainfall halves versus August, the southwest monsoon retreats from the Konkan coast by mid-month, and Devka Beach swim-flag goes amber by the third week. Workable for a low-pressure weekend; full reopening is October.',
  'September is on the way back but still in the monsoon for the first half. Devka Beach swim restrictions ease only late-month, NH48 still floods on heavy days, and hotel rates have not yet climbed. October dramatically cleaner with two extra weeks of patience.',
  'September in Daman is recovery month. Rainfall drops to 200-220mm across 14-16 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing toward 80 percent, sea state calming through the month. Devka Beach Coast Guard swim-flag flips from red to amber by September 20-22; full green takes another week. NH48 stops waterlogging by mid-month and the Mumbai-Daman drive returns to its 2.5-3 hour Tuesday norm. The Moti Daman ferry restarts daily by week three. Bom Jesus and the Moti Daman fort walls dry out and become pleasant late-afternoon walks. Hotel rates sit 40 percent below February; Mirasol and Cidade de Daman walk-in rates are at year-end-of-monsoon low. The Pitru Paksha period (variable in mid-September) tempers Indian-tourist demand. Workable, but October is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 10, 4, 'go',
  'Season opens. 22-32C, rainfall under 80mm. Devka full-green flag, hotel rates climbing.',
  'October is the proper return to form. Rainfall drops to 80mm or less, mostly the first week. Sea state stable, Devka swim-flag green, fort circuit dry. Hotel rates climb 20 percent in the second half as Diwali approaches.',
  NULL,
  'October in Daman is when the Konkan coast returns to coherent. Rainfall 60-80mm, mostly first week. Daytime 23-32C, humidity 75 percent and falling, sea at 27C. Devka Beach Coast Guard flag turns full green by October 10. The Moti Daman ferry runs full timetable. Bom Jesus and St Jerome Fort visit-traffic returns to weekend-strong levels. The Diwali long weekend (variable, usually mid-October to early November) brings the year''s second domestic-tourism wave; hotel rates climb 25-30 percent for the 5-day window and Friday-evening NH48 traffic stretches to 6-7 hours from Mumbai. The first three weeks of October are the smart traveller''s window — full-green beach, dry fort circuit, rates 30 percent below January peak. Spice Galleon at Gold Beach Resort and the Mirasol Portuguese-leaning kitchens reopen full menus by week two.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 11, 5, 'go',
  'Peak builds. 18-30C, rainfall under 30mm. Mumbai-Surat weekend traffic at full strength.',
  'November is when Daman runs its high-season pattern. Cool dry weather, full-green sea, fort and cathedral at their best photo light. Diwali week is variable but typically falls early November — book around it.',
  NULL,
  'November in Daman is the proper start to high season. Daytime 20-30C, nights drop to 18C, rainfall under 30mm and almost all in the first week. The Arabian Sea is at 26C, swim conditions full-green. Devka Beach low-tide windows lengthen to 8am-11am and 4pm-7pm for safe wading. The Moti Daman fort wall (2km accessible rampart, lighthouse climb ₹10) gets the year''s best afternoon light around 4-5pm. Bom Jesus interior is most photogenic between 4-5pm when the western windows catch sun. Diwali week — variable, usually late October through early November — brings the year''s second peak: hotel rates climb 35-40 percent for the 5-day window and NH48 Friday traffic from Mumbai stretches to 6-7 hours. Outside Diwali, weekday rates run 25-30 percent below December peak. Spice Galleon, Mirasol seafood kitchen, and Hotel Cidade de Daman seafood buffet are at their best — fish-catch quality has fully returned post-monsoon.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('daman', 12, 5, 'go',
  'Peak season. 15-28C, dry. Christmas-NY hotel rates 50 percent above November.',
  'December is the year''s most reliable Daman window — dry, cool, full operational tempo. Christmas-NY week (Dec 24 to Jan 2) drives hotel rates up 50 percent and books out the Mirasol-Cidade-Sandy belt 14-21 days ahead.',
  NULL,
  'December in Daman is operational peak. Daytime 20-28C, nights 15-17C, rainfall under 20mm. The Arabian Sea sits at 24C — the year''s coldest for swim purposes but still warm by global standards. Devka Beach swim-flag green throughout. Christmas week (December 22 to January 2) drives hotel rates up 45-55 percent versus November and books out the Devka Beach Road belt — Mirasol, Cidade de Daman, Sandy Resort, Hotel Princess Park — 14-21 days ahead. Christmas Eve at Bom Jesus draws 600-800 worshippers across two services; the 1559 cathedral is at peak photogenic. The Mumbai-Daman NH48 corridor sees its heaviest traffic of the year on December 23-26 and December 30-January 1; Friday-evening drives stretch to 7-8 hours. The first three weeks of December run 30 percent cheaper with the same conditions; lock dates pre-December 20 if budget matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- DIU (Saurashtra coast island, Daman & Diu UT) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 1, 5, 'go',
  'Peak Saurashtra winter. 13-26C, dry. Festa de Diu running. Mumbai-Diu Alliance Air 6 flights/week.',
  'January is when Diu runs at its operational peak. Festa de Diu (Nov-Feb beach festival) has its widest programme, the 1535 Portuguese fort runs 8am-6pm with bright clear skies, Nagoa Beach palms are at their cleanest. Alliance Air 9I623 BOM-DIU runs Mon/Wed/Thu/Fri/Sat/Sun.',
  NULL,
  'Diu in January is the version every Saurashtra-coast traveller wants to find. Daytime 17-26C, nights drop to 13C, rainfall under 5mm. The 1535 Portuguese fort — built by Dom Nuno da Cunha, held until Operation Vijay in 1961 — runs 8am-6pm with no entry fee. The double-moat layout, 22 cannons in situ, and the 20-metre walls are at their photogenic peak in the cool dry air. Nagoa Beach (7:30am-8:30pm, no entry fee) is calm enough for full swims; the hodka palms run 50m back from the high-tide line. Naida Caves (6am-8pm, free) — the Portuguese rock-quarry chambers cut into the city wall — light at noon when sun catches the inner cuts. INS Khukri Memorial (1971 sinking, 18 officers, 176 sailors lost; memorial inaugurated 1999) is the contemplative quarter-hour stop above Chakratirth Beach. Festa de Diu programmes — the UT-tourism festival running mid-November to mid-February — peak in January with concerts at the amphitheatre, Naida Caves cultural events, fort heritage walks. Alliance Air 9I623 from Mumbai to Diu runs six days a week (skip Tuesday); fare ₹4,500-6,500. Diu is on Indian standard time but feels Portuguese — bilingual fort signage, Catholic-feast calendar, the licensed-alcohol economy that draws dry-Gujarat weekenders.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 2, 5, 'go',
  'Driest stretch. 14-28C. Festa de Diu closing fortnight. Hotel rates hold January peak.',
  'February is the cleanest of the cool Saurashtra months. Festa de Diu winds down the second week, then mid-Feb to early March is the year''s under-the-radar window — same weather, dropping rates. Republic Day spillover thins by week one.',
  NULL,
  'February in Diu is the sweetest of the cool Saurashtra months. Daytime 16-28C, nights 14-15C, rainfall under 5mm, humidity 60 percent. The Arabian Sea sits at 23-24C — the year''s coldest, but workable for confident swimmers. Festa de Diu winds down its big-event programme around February 14-15; the closing weekend at Nagoa Beach amphitheatre draws 4,000-5,000 visitors. Mid-February to early March is the year''s under-noticed window — same January weather, hotel rates sliding 15-20 percent. Diu Fort''s seaward bastions catch the year''s cleanest evening light at 5-5:30pm. The St Paul''s Church choir runs 9am Sunday mass year-round but sounds best in the cool air. The Diu town fish market behind Bunder Chowk fills 7-9am — pomfret, prawns, bangda fresh in. Alliance Air loads run at 80-90 percent; book 5-7 days ahead. Cycle rentals at Diu Town junction: ₹150/day with passport-copy deposit. The 27sq km island is fully cyclable in a long day.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 3, 4, 'go',
  'Last cool window. 17-30C. Hotel rates drop 25 percent. Holi Mumbai surge mid-month.',
  'March extends February''s weather minus the Festa de Diu programme. Hotel rates discount 25-30 percent, the fort and beaches run at low-volume, mornings still cool enough for cycling the island. Holi long-weekend traffic spikes 5-7 days.',
  NULL,
  'March in Diu is the soft-landing month. Daytime 19-30C, nights 17-18C, humidity climbing past 65 percent in the last fortnight. The Festa de Diu programme has wrapped, and the island returns to its quiet baseline — Diu Town has under 50,000 residents and outside the festival peak it shows. Holi long-weekend (variable mid-March) sends Mumbai and Surat traffic to the island; Alliance Air 9I623 sells out 7-10 days ahead and hotel rates spike 25-30 percent for the 4-day window. Outside that, walk-in rates at Hotel Apaar, Sugati Beach Resort, and the Radhika Beach Resort drop 25-30 percent versus February peak. Cycle the southern Vanakbara fishing-village loop early — the Mukhya Sthal-Nagoa-Vanakbara 18km circuit takes 3 hours leisurely, must start by 7:30am. Naida Caves and the Sea Shell Museum are workable midday. Last comfortable month before April pushes humidity past 75 percent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 4, 3, 'go',
  'Pre-summer. 22-33C, humidity 75 percent. Fort and Naida cool early/late; Nagoa Beach swims compress.',
  'April still functions for travelers who prioritise the alcohol-licensed weekend. Beach time narrows to 7-9am and 5-7pm windows, fort and caves require early-morning visits. Hotel rates 30 percent below February.',
  NULL,
  'April in Diu is when the trip narrows to AC, beach-shack, and licensed-bar lines. Daytime 23-33C, humidity past 75 percent, Arabian Sea at 28C. Nagoa Beach swim windows compress to 7-9am and 5-7pm — the noon-3pm stretch is unworkable on the open sand. Diu Fort''s seaward bastions catch onshore breeze and remain comfortable mornings only. Naida Caves'' rock-cut chambers stay 3-4C cooler than the surface and become genuinely valuable as a heat refuge. INS Khukri Memorial is a 5-minute stop, exposed to sun, plan for early morning. The Festa de Diu has long ended; the island is at its quietest of the cool half-year. Hotel rates run 30-35 percent below February peak. Alliance Air loads drop to 50-60 percent, walk-up tickets available. The Vanakbara fishing-village morning catch (5-7am) is at peak quality before the sea warms further.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 5, 2, 'wait',
  'Peak heat. 25-35C, humidity 80 percent. Pre-monsoon thunder. Outdoor access narrow.',
  'May is when the Saurashtra coast bakes. Outdoor access narrows to a pre-9am or post-7pm window. Hotel rates at year-low — Alliance Air loads under 50 percent. Push to October if comfort matters; viable only for short alcohol-licensed weekends.',
  'May runs hot and sticky. Outdoor activity collapses past 9am, pre-monsoon thunderstorms knock power 1-3 hours, and the trip you came for — the Portuguese-island walking experience — does not work outside thin morning and evening windows. Wait for October.',
  'May in Diu is the year''s most uncomfortable stretch. Daytime 26-35C, humidity 80 percent, sea at 30C. Pre-monsoon thunderstorms — the southwest monsoon advance touching the Saurashtra coast — start arriving in the last week and knock grid power for 1-3 hours at a stretch on storm days. Diu Fort, Naida Caves, INS Khukri Memorial all become pre-9am or post-7pm propositions. Cycle rentals fall off; the island gets covered by rented Maruti or auto for the few visitors who land. Alliance Air 9I623 runs at 40-50 percent loads — walk-up fares drop to ₹3,800. Hotel rates run at year-low (40 percent below February peak); Hotel Apaar walk-in drops below ₹3,500 and Radhika Beach Resort below ₹6,000. The licensed-bar economy continues to pull short Gujarat weekenders, but the broader trip — the heritage walk, the photography, the outdoor cycling — does not work.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 6, 1, 'skip',
  'SW monsoon onset plus Arabian Sea cyclone risk. 25-32C, 200-250mm rain. Beaches red-flag. Skip.',
  NULL,
  'June is the southwest monsoon hitting the Saurashtra coast plus the year''s peak Arabian Sea cyclone window — Vayu (2019), Biparjoy (2023) both formed in this month. Beach access closes, Alliance Air re-times flights around weather, the trip cannot run.',
  'June in Diu coincides with the year''s peak Arabian Sea cyclone window. Vayu (June 2019) and Biparjoy (June 2023) both formed in this month and forced UT-administration evacuations of low-lying Saurashtra coast settlements. Even in cyclone-free Junes, rainfall hits 200-250mm and the Arabian Sea runs 3-5m wave heights — Nagoa, Chakratirth, Ghoghla beaches all under Coast Guard red-flag for the entire month. Alliance Air 9I623 timetables get re-cut at short notice on storm days. Diu Fort and Naida Caves stay open but are wet, exposed, and visitor-empty. Hotel rates at year-low (50 percent below February); the licensed-bar economy thins to local trade only. The trip you came for — the heritage island, the beach swims, the photogenic light — cannot happen. Plan October minimum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 7, 1, 'skip',
  'Peak monsoon. 25-30C, 350-400mm rain. Beaches closed, Alliance Air thinned. Skip.',
  NULL,
  'July is the wettest month — 350-400mm of rain over 22-25 wet days. Beach access remains under Coast Guard red-flag, Alliance Air drops Mumbai-Diu rotations, the trip cannot run.',
  'July in Diu is the year''s wettest stretch. Rainfall 350-400mm over 22-25 wet days, the Arabian Sea sits in active monsoon, and Coast Guard maintains red-flag swim restriction across all beaches. Alliance Air 9I623 thins from six rotations a week to three or four through the month, and at-short-notice cancellations are routine on storm days. Diu Fort''s seaward bastions get the heaviest rain on the island and the walk along the rampart is unsafe. Naida Caves drain to the floor through cracks in the rock — the inner chambers flood. The licensed-bar economy survives on local Gujarat weekenders who drive in regardless, but the broader trip — heritage, photography, beach — does not work. Hotel rates at year-low. Push to mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 8, 1, 'skip',
  'Monsoon continues. 25-30C, 250-300mm rain. Independence Day domestic surge despite weather. Skip.',
  NULL,
  'August holds the July pattern. Rainfall 250-300mm, beaches closed, Alliance Air thinned. The Independence Day long weekend (Aug 15-17) brings a Mumbai-Surat surge regardless of weather, but the trip itself remains hollow.',
  'August in Diu holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 250-300mm, daytime 25-30C, humidity at 90 percent, sea state still rough. Coast Guard red-flag remains across Nagoa, Ghoghla, Chakratirth and Vanakbara beaches. Alliance Air runs three to four rotations a week with cancellation risk. The Independence Day long weekend (August 15-17) sends a Mumbai-Surat surge into the island regardless of conditions — alcohol availability outweighs weather for that demographic — and licensed-bar belt fills out. Hotel rates at year-low otherwise; Festa de Diu has not started its November-February run. The trip you came for — the heritage walks, the photogenic Portuguese architecture, the beach swims — does not work. October at the earliest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 9, 2, 'wait',
  'Recovery. 25-30C, 100-150mm rain. Beach amber by week three. Alliance Air rebuilds rotations.',
  'September is recovery month. Rainfall halves versus August, the southwest monsoon retreats from the Saurashtra coast by mid-month, beach swim-flag goes amber by week three. Workable for a quiet visit; full reopening is October.',
  'September is on the way back but still in monsoon for the first half. Beaches stay restricted until late month, Alliance Air rebuilds rotations gradually, the Festa de Diu programme has not restarted. October is dramatically cleaner with two extra weeks of patience.',
  'September in Diu is the trickle back to operational. Rainfall drops to 100-150mm across 12-15 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing past 80 percent, sea state calming through the month. Coast Guard swim-flag flips amber by September 18-20; full green takes another week. Alliance Air rebuilds 9I623 to its full six-day-a-week rotation by late September. Diu Fort, Naida Caves, INS Khukri Memorial dry out and become walkable late-afternoon. The Vanakbara fishing fleet returns to full strength by month-end, and fish-market quality at Bunder Chowk picks up. Hotel rates sit at year-low — Hotel Apaar walk-in below ₹3,800, Radhika Beach Resort below ₹7,000. The Pitru Paksha period (variable mid-September) tempers Indian-tourist demand. Workable, but the cleaner call is the second half of October once Festa de Diu programme launch dates publish.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 10, 4, 'go',
  'Season opens. 22-32C, rainfall under 50mm. Festa de Diu programme launches mid-month.',
  'October is the proper return to form on the Saurashtra coast. Rainfall under 50mm, beach swim-flag full-green by week one, Festa de Diu programme launches mid-month. Diwali week brings a domestic surge.',
  NULL,
  'October in Diu is when the island returns to coherent. Rainfall 30-50mm, mostly first week. Daytime 24-32C, humidity 70 percent and falling, Arabian Sea at 27C. Coast Guard swim-flag green throughout. Alliance Air at full rotation, fares back to standard range. Festa de Diu — the 75-day November-February tourism festival — typically launches its programme in the third week of October at the Naida Caves amphitheatre. The fort, caves, and Khukri Memorial are at their post-monsoon photogenic best. Diwali long weekend (variable mid-October to early November) brings a Mumbai-Surat surge; Alliance Air sells out 7-10 days ahead and hotel rates climb 30-35 percent for the 5-day window. Outside Diwali, weekday rates run 25-30 percent below December peak. Cycle the Mukhya Sthal-Nagoa-Vanakbara 18km circuit at full ease. Smart traveller''s month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 11, 5, 'go',
  'Peak builds. 16-28C, rainfall under 20mm. Festa de Diu in full programme.',
  'November is the proper return to high season. Cool dry weather, full Festa de Diu programme, Diwali week (variable, often early Nov) drives 5-day rate spike, Alliance Air fully booked weekends.',
  NULL,
  'November in Diu is high-season entry. Daytime 18-28C, nights 16-17C, rainfall under 20mm. The Arabian Sea drops to 25C — the year''s coldest, but workable for confident swimmers. Festa de Diu programme is in full run: amphitheatre concerts at Naida Caves, fort heritage walks, beach sports competitions, food stalls along Nagoa Beach Road. Diwali long weekend (variable, often early November) brings the year''s second peak — Alliance Air 9I623 sells out 10-14 days ahead, hotel rates climb 35-40 percent for the 5-day window, NH48 Vapi-Una traffic stretches. Outside Diwali, weekday rates run 25-30 percent below December peak. Diu Fort''s seaward bastions catch the year''s cleanest evening light at 5pm; the Khukri Memorial is most affecting at 4-5pm with the wreath shadows long. Vanakbara fishing fleet at full strength; pomfret and prawns at peak quality.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diu', 12, 5, 'go',
  'Peak season. 13-26C, dry. Festa de Diu Festival of Lights mid-Dec. Christmas-NY 50 percent premium.',
  'December is the year''s most coherent Diu window. Dry cool weather, full Festa programme including Festival of Lights, Christmas-NY week drives 50 percent rate premium and books out island 21 days ahead.',
  NULL,
  'December in Diu is operational peak. Daytime 17-26C, nights 13-15C, rainfall under 10mm. The Festa de Diu Festival of Lights — mid-month dates published annually around November 20 — runs across Diu Town and Nagoa Beach with illuminated fort walls, choreographed light shows, food and craft stalls. Alliance Air 9I623 sells out 14-21 days ahead from December 22 to January 2; the alternative routings are via Ahmedabad or driving from Mumbai (1,000km, 16-18 hours over two days). Christmas Eve at St Paul''s Church in Diu Town draws 700-1,000 worshippers; the Bom Jesus equivalent in Daman is busier still. Hotel rates climb 45-55 percent versus November for the December 24 to January 2 window — Radhika Beach Resort, Sterling Holidays Diu, Hotel Apaar all book 21 days ahead. The first three weeks of December offer the same conditions at 30-35 percent lower rates; lock dates pre-December 20 if budget matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- SILVASSA (Dadra & Nagar Haveli HQ) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 1, 5, 'go',
  'Peak Konkan-jungle window. 14-30C, dry. Mumbai weekend traffic peaks Friday 4pm.',
  'January is when Silvassa runs at its best. Cool dry weather, Vasona Lion Safari (9-5, closed Monday) workable all day, Dudhni Lake boat-rides at full schedule, Khanvel-Ras-Treat resort belt at peak occupancy weekends. NH48 Mumbai traffic Friday 4pm = 5-7 hours; Tuesday morning = 2.5-3 hours.',
  NULL,
  'Silvassa in January is the version Mumbai weekenders book first. Daytime 18-30C, nights 14-16C, rainfall under 10mm. The Vasona Lion Safari (10km from Silvassa town, 9am-5pm, closed Monday, ₹100 per person) runs the 20-25 minute drive-through with morning slots showing the lions most active. Dudhni Lake — the Madhuban Dam reservoir 40km southeast — runs boat rides 9am-5pm, ₹150-200 per person for shikara, jet-skis ₹500 per round. The Tribal Cultural Museum in Silvassa town (10am-5pm, closed Monday) holds the warli, kokna, and varli artefact collection — the masks, fishing gear, and tarpa wind instruments are the standout exhibits. The Khanvel-Ras Resort-Treat Resort belt along the Daman Ganga river runs at 80-90 percent occupancy on weekends; Mumbai-Silvassa NH48 traffic Friday 4pm-9pm stretches to 5-7 hours from a Tuesday-morning 2.5-3 hours. Surat-Silvassa is 80km, 2 hours mid-week. The Tarpa Festival typically runs 2-3 days in late December — check dnh.gov.in tourism calendar — and spills into early January if dates are at year-end.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 2, 5, 'go',
  'Driest stretch. 16-32C. Republic Day spillover thins. Resort rates hold January peak.',
  'February delivers the cleanest dry month. Lion Safari, Dudhni Lake, the tribal village walks at Khadoli all run at full programme. Hotel rates at peak; mid-month is the quietest window before March temperatures begin climbing.',
  NULL,
  'February in Silvassa is the operational sweet spot. Rainfall under 5mm, daytime 18-32C, humidity 60 percent. The Vasona Lion Safari morning slot (9-11am) is the best wildlife window — the lions are most active on cool dry days. Dudhni Lake runs boat rides full-schedule; the 1.5-hour shikara loop covers the Western Ghats foothills shore at year-best clarity. Hirwa Van Garden in Silvassa town (8am-7pm, ₹20 entry) is at peak photogenic with the water features and lawns at their cleanest. The Tribal Cultural Museum is the country''s best-curated collection of warli and kokna material culture in a UT setting; allow 90 minutes. Khanvel Resort, Treat Resort, Ras Resort, Lake Resort by Sterling all hold January-peak rates through to mid-February, then start sliding 10-15 percent. Mumbai-Silvassa weekend traffic patterns hold — Friday 4pm-9pm slow on NH48, Tuesday-Thursday 30-50 percent below capacity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 3, 4, 'go',
  'Last cool window. 20-34C. Holi mid-month spike. Resort rates discount 20 percent off-Holi.',
  'March extends the February experience minus the deep cool. Days warm to 34C in the last week, Lion Safari afternoon slots get hot for visitors and lions, Dudhni Lake morning rides remain the move. Holi long-weekend brings a Mumbai surge.',
  NULL,
  'March in Silvassa is the soft-landing month. Daytime 22-34C, nights 20-21C, humidity past 65 percent in the last fortnight. Vasona Lion Safari afternoon slots (2-5pm) run hot — the lions are visible but noticeably less active; shift to the 9-11am slot. Dudhni Lake morning boat rides remain the cool-of-the-day move; afternoons get glare-heavy off the water. Holi long weekend (variable mid-March) sends Mumbai and Surat traffic across NH48; Silvassa hotel and resort belt hits 90 percent occupancy for the 4-day window with rates spiking 25-30 percent. Outside Holi, walk-in resort rates discount 20-25 percent versus February. The Tribal Cultural Museum and Hirwa Van Garden remain comfortable midday. Last comfortable month before April temperatures push humidity past 75 percent and outdoor afternoons collapse.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 4, 3, 'go',
  'Pre-summer heat. 24-36C, humidity 75 percent. Lion Safari lions inactive afternoons; pool-and-resort weekend.',
  'April still functions for travelers prioritising the resort weekend. Khanvel and Ras pools become the main draw, Lion Safari narrows to the 9-10am slot, Dudhni boat rides workable till 11am. Hotel rates 30 percent below February.',
  NULL,
  'April in Silvassa is when the trip shifts toward AC, pools, and short outdoor windows. Daytime 25-36C, humidity past 75 percent, the Daman Ganga river drops to its annual low and Dudhni Lake water level recedes 2-3m from monsoon high. Vasona Lion Safari 9-10am slot remains workable for wildlife visibility; the 11am-5pm window is hot enough that the lions retreat to shade and the visitor drive-through is largely an empty enclosure. Dudhni boat rides workable until 11am, then the glare and heat off the reservoir pushes visitors back to resort pools. Khanvel Resort, Treat Resort, Lake Resort by Sterling all run their pool programmes at full operational tempo — these now drive the weekend rather than the wildlife. NH48 Mumbai traffic still peaks Friday 4pm but holds at 4-5 hours rather than January''s 5-7. Hotel rates run 30 percent below February peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 5, 2, 'wait',
  'Peak heat. 27-39C, humidity 80 percent. Pre-monsoon thunder. Resort pool only viable.',
  'May is when Silvassa bakes. Lion Safari near-pointless afternoons, Dudhni Lake boat rides shut by 11am, Tribal Museum the only midday refuge. Hotel rates at year-low. Workable only as a Mumbai-pool weekend.',
  'May runs hot at 27-39C with humidity 80 percent. Outdoor wildlife and lake activities collapse mid-day, pre-monsoon thunderstorms arrive last 10 days. The trip you came for — the jungle-adjacent weekend — does not work outside thin morning windows. Wait for October.',
  'May in Silvassa is the year''s most uncomfortable stretch. Daytime 28-39C, humidity 80 percent, the Konkan plains baking and the Western Ghats foothills offering little relief at Silvassa''s 10m elevation. Vasona Lion Safari morning visits remain technically possible (lions visible 9-10am) but afternoon slots are essentially empty enclosures. Dudhni Lake glare off the reservoir is harsh past 10am. Pre-monsoon thunderstorms — the southwest monsoon advance touching the Konkan coast — start arriving in the last 10 days and knock grid power for 1-3 hours at a stretch on storm days. The Tribal Cultural Museum becomes the day''s indoor refuge. Khanvel and Ras resort pools drive the weekend; Mumbai weekend traffic still flows on Friday 4pm despite the heat. Hotel rates run at year-low — Khanvel walk-in below ₹4,500, Treat Resort below ₹6,500. Push to October if comfort matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 6, 2, 'wait',
  'SW monsoon onset. 25-32C, 300-400mm rain. Lion Safari open but soggy; Dudhni boats suspend on heavy days.',
  'June is the soft monsoon onset — the Konkan plains catch the first heavy rains, the jungle around Silvassa turns dramatically green, river-resort verandas come into their own. Lion Safari open but the lions are seldom active in heavy rain; Dudhni boats suspend on red-warning days.',
  'June drops 300-400mm of rain across 18-22 wet days. Lion Safari open but lion sightings drop sharply (the cats stay sheltered), Dudhni Lake boat rides suspend on heavy-rain days. NH48 from Mumbai waterlogs in pockets — 4-5 hour drives stretch to 6-7. Wait for October for the dry-version trip.',
  'June in Silvassa is the southwest monsoon hitting the Konkan plains at speed. Rainfall 300-400mm across 18-22 wet days, daytime 26-32C, humidity past 85 percent. The Daman Ganga river runs full and the resort verandas at Khanvel, Ras, and Treat — built to face the river — earn their keep with monsoon-deck cushions and chai service. The jungle around Silvassa turns dramatically green; warli-village walks at Khadoli get atmospheric but slippery. Vasona Lion Safari remains open but lion-sighting probability drops to under 30 percent on the worst-rain days (the cats stay in the rear sections of the enclosure). Dudhni Lake boat rides suspend on red-warning days (about 8-10 days a month) and on amber days run reduced 11am-3pm windows only. Hotel rates run 30-35 percent below February peak — the resort-veranda monsoon weekend is a niche but real Mumbai rotation. Carry rain jackets, expect schedule slips.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 7, 1, 'skip',
  'Peak monsoon. 25-30C, 500-600mm rain (annual peak). Lion Safari empty, Dudhni boats suspended. Skip.',
  NULL,
  'July is the wettest month — 500-600mm of rain over 25-27 wet days. Lion Safari sees near-zero wildlife activity, Dudhni Lake boats suspended most days, NH48 floods on heavy events. The trip cannot run outside resort-pool-and-veranda lines.',
  'July in Silvassa is the year''s wettest stretch — 500-600mm of rain over 25-27 wet days, the annual rainfall peak. Daytime 25-30C, humidity 90 percent. Lion Safari open but lion-sighting probability drops to single-digit percent; the lions stay in shaded rear enclosures and the drive-through is an empty parade. Dudhni Lake boat rides suspended for most of the month — even amber-day windows compress to 1-2 hour mid-day slots if the morning rain pauses. NH48 between Mumbai and Vapi has known flood-pockets; expect 2-3 hours added to the drive on heavy days. The trip narrows to resort-veranda monsoon weekends — Khanvel, Ras, Treat all run reduced occupancy at 50 percent below February rates. The Tribal Cultural Museum and Hirwa Van Garden are the dry-indoor options. Push to October for the dry-version trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 8, 1, 'skip',
  'Monsoon continues. 25-30C, 400-500mm rain. Same as July. Skip.',
  NULL,
  'August holds the July pattern. 400-500mm of rain, Lion Safari near-empty, Dudhni boats intermittent. The Janmashtami long weekend (variable, late Aug) brings a domestic surge despite weather, but the trip itself remains hollow.',
  'August in Silvassa holds July''s monsoon pattern with marginally fewer extreme-rain days. Rainfall 400-500mm across 22-25 wet days, daytime 25-30C, humidity at 90 percent — the year''s peak humidity stretch. Lion Safari remains technically open but the wildlife visibility is single-digit-percent; Dudhni Lake boat rides suspended on the worst days, intermittent on others. The Janmashtami long weekend (variable mid-to-late August) brings a domestic-tourism wave to the resort belt regardless of conditions; Khanvel, Ras, and Treat hit 80-90 percent occupancy for the 4-day window with rates spiking 25-30 percent. Outside that window, hotel rates run at year-low (50 percent below February). The Independence Day weekend overlaps and adds further traffic. The trip you came for — the jungle-adjacent dry-weather weekend — does not work. October at the earliest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 9, 3, 'go',
  'Recovery. 24-30C, 200-250mm rain easing. Dudhni boats resume mid-month; Lion Safari recovers.',
  'September is the trickle back to viable. Rainfall halves versus August, the southwest monsoon retreats from the Konkan by mid-month, jungle is at peak green, Dudhni boats restart after the third week. Workable for a quiet visit.',
  'Early September is still rain-heavy on the Konkan. Lion Safari and Dudhni boat rides resume only late-month, NH48 still floods on heavy days, resort programmes have not fully restarted. October is dramatically cleaner.',
  'September in Silvassa is the recovery month. Rainfall drops to 200-250mm across 14-16 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing past 80 percent. The southwest monsoon retreats from the Konkan plains by September 20-22. Vasona Lion Safari sees wildlife visibility return to 60-70 percent of January levels; lions are visible but the post-rain cool keeps them more active than April. Dudhni Lake boat rides resume full-schedule by the third week — the reservoir at year-high water level makes the shikara routes stretch further into the side-bays. NH48 Mumbai-Silvassa stops flooding by mid-month and the drive returns to its 2.5-3 hour Tuesday norm. The jungle around Khanvel is at its lushest of the post-monsoon — strong call for warli-village photography. Resort rates sit 40 percent below February. Workable if dates are fixed; October cleaner if flexible.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 10, 4, 'go',
  'Season opens. 22-32C, rainfall under 80mm. Diwali week drives 5-day spike.',
  'October is the proper return to form. Rainfall drops below 80mm, Lion Safari at full activity, Dudhni boats fully scheduled, jungle still post-monsoon green. Diwali week (variable, late Oct or early Nov) drives the year''s second peak.',
  NULL,
  'October in Silvassa is when the trip returns to coherent. Rainfall 60-80mm, mostly the first week. Daytime 23-32C, humidity 70 percent and falling, the Daman Ganga still high from the monsoon. Vasona Lion Safari at full wildlife visibility; the 9-11am morning slot delivers the year''s most consistent lion-sighting rate. Dudhni Lake boat rides at full schedule — the post-monsoon water level keeps shikara loops at year-best length. The jungle around Khanvel and the warli villages at Khadoli are at peak post-monsoon green; the Tarpa Festival (variable, often late October to early November) sometimes runs in this month — check dnh.gov.in tourism calendar. Diwali long weekend (variable mid-October to early November) brings the year''s second peak; hotel rates spike 30-35 percent for 5 days and Mumbai NH48 traffic Friday 4pm stretches to 6-7 hours. Outside Diwali, weekday rates run 25 percent below December peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 11, 5, 'go',
  'Peak builds. 16-30C, rainfall under 30mm. Tarpa Festival likely. Resort weekend traffic at full strength.',
  'November is when Silvassa runs its high-season pattern. Cool dry weather, Lion Safari at peak wildlife season, Dudhni boats year-best clarity. Tarpa Festival typically runs 2-3 days in late November or December.',
  NULL,
  'November in Silvassa is high-season entry. Daytime 18-30C, nights 16-17C, rainfall under 30mm. Vasona Lion Safari runs at peak wildlife season — the cool dry mornings and afternoons keep lions active across the 9am-5pm window. Dudhni Lake boat rides at year-best clarity; afternoon glare returns to manageable. The Tarpa Festival — the UT''s flagship tribal music-and-dance festival, named after the warli wind instrument played around the dancing circle — typically falls in late November or early December (check dnh.gov.in for current year''s dates); it draws 8,000-12,000 visitors across 2-3 days at the Silvassa amphitheatre. The Khanvel-Ras-Treat resort belt fills weekends; Mumbai NH48 Friday 4pm traffic stretches to 5-6 hours. Outside festival weekends, weekday rates run 25-30 percent below December peak. The Tribal Cultural Museum is the contextual ground for the festival — visit before the music sets in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silvassa', 12, 5, 'go',
  'Peak season. 14-28C, dry. Tarpa Festival mid-month. Christmas-NY 50 percent premium and resorts sold out.',
  'December is the year''s most coherent Silvassa window. Cool dry weather, Tarpa Festival typically mid-Dec, Christmas-NY week drives 50 percent rate premium. Book the Khanvel-Ras-Treat belt 14-21 days ahead.',
  NULL,
  'December in Silvassa is operational peak. Daytime 18-28C, nights 14-16C, rainfall under 15mm. Vasona Lion Safari at year-best lion-sighting probability; the Daman Ganga river runs cool and clear. The Tarpa Festival — typically December 7-9 or 14-16 depending on the year — pulls 8,000-12,000 visitors over 2-3 days; the warli, kokna, and varli dance troupes around tarpa wind-instrument players are the under-noticed Konkan-tribal cultural standout. Christmas-NY week (December 22 to January 2) drives hotel rates up 45-55 percent versus November and books out the Khanvel-Ras-Treat-Lake Resort belt 14-21 days ahead. Mumbai-Silvassa NH48 traffic on December 23-26 and December 30-January 1 hits its annual peak; Friday-evening drives stretch to 7-8 hours. The first three weeks of December run 30 percent cheaper with the same conditions; lock dates pre-December 20 if budget matters. The Kite Festival around Makar Sankranti (January 14-15) sometimes spills into late December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- KARAIKAL (Pondicherry UT enclave, Cauvery delta) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 1, 5, 'go',
  'Peak Cauvery delta winter. 23-28C, dry. Thirunallar Saturday queue 6am-9am.',
  'January is when Karaikal runs at its best. Northeast monsoon spent, Thirunallar Saneeswaran temple at full programme, Nagore Dargah Sufi music at peak. Saturday darshan queues form 5:30am — the special Sani Pradosham nights pull 30,000-50,000 pilgrims.',
  NULL,
  'Karaikal in January is the version pilgrims and quiet-coast travellers wait the year for. Daytime 23-28C, nights 21-23C, rainfall under 30mm — the northeast monsoon (which delivers 68 percent of the district''s 1,260mm annual rainfall) has fully retreated. Thirunallar Sri Saneeswara Bagwan Temple — one of nine Navagraha temples and the country''s primary Saturn-deity site — runs darshan 6am-12:30pm and 4-8:30pm. Saturdays draw 25,000-40,000 pilgrims; queues form by 5:30am at the Nala Theertham tank for the ritual bath that precedes darshan. Special Saturday Sani-Pradosham nights pull 50,000-plus and Karaikal-Thirunallar 4km transport bottlenecks; arrive Friday afternoon if dates fall on a Saturday. Nagore Dargah Sharif (14km from Karaikal, 20 minutes by bus or auto), built around the 16th-century Sufi saint Shahul Hamid, opens 4:30am-7am and 6:25pm-9:30pm with Friday additionally open 12-2:30pm. The Thursday-evening qawwali sessions are the under-the-radar standout. Karaikal beach and the Saint Theresa shrine round out a 2-day visit. ATMs at Karaikal main bus stand and the temple complex.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 2, 5, 'go',
  'Driest stretch. 23-30C. Thaipusam pilgrimage spike. Hotel rates hold January peak.',
  'February delivers the cleanest weather of the year. Thaipusam (variable, full-moon Jan-Feb) draws Tamil-diaspora pilgrims to Thirunallar; Saturday queues near double. Sani Peyarchi 2026 falls March 6 (next major event window), so February is the calmer-but-clean lead-up.',
  NULL,
  'February in Karaikal is the coolest dry month before March pushes the heat. Daytime 23-30C, nights 22-23C, rainfall under 10mm, humidity 65 percent. Thirunallar Saturday darshan crowds run 25,000-35,000; the Thaipusam full moon (variable late January to mid-February) draws Malaysian and Singaporean Tamil-diaspora pilgrims and pushes Saturday queues toward the year-second peak. Sani Peyarchi 2026 — the once-in-2.5-years Saturn transit at Thirunallar, the temple''s most-significant event — is expected around March 6, 2026; February runs as the lead-up calm. Nagore Dargah Thursday evening qawwali at 7pm is at its peak attendance with the cool dry air. Hotels in Karaikal — Hotel Manimaran, Hotel Subaa, MK Residency — run at 70-80 percent weekend occupancy with rates holding January peak. Pondicherry city is 130km north (3 hours via NH32), Nagapattinam 14km west, Velankanni Catholic shrine 27km south — Karaikal is the centre of a multi-faith circuit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 3, 5, 'go',
  'Sani Peyarchi 2026 Mar 6. 100,000-plus pilgrims. Karaikal sold out 14 days. Other dates: clean cool dry.',
  'March is the Sani Peyarchi month for 2026 — the 2.5-yearly Saturn transit. March 6 draws 100,000-plus pilgrims to Thirunallar over 24 hours. All Karaikal accommodation books 14-21 days ahead. Outside Mar 5-7, the month runs clean dry and is the year''s last cool stretch.',
  NULL,
  'March 2026 in Karaikal is dominated by the Sani Peyarchi date — Saturn''s transit from Pisces (begun late 2025) re-anchors at the temple on March 6. The 2.5-yearly event pulls 100,000-plus pilgrims to Thirunallar over a 24-hour darshan window from March 5 night to March 6 night. All Karaikal accommodation — every hotel, lodge, kalyana mandapam — books 14-21 days ahead and rates spike 60-80 percent. Special Tamil Nadu STC and PRTC bus services run from Chennai, Madurai, Trichy, Coimbatore, Bengaluru. Saturn-pradosham parikara poojas at the temple cost ₹500-3,000 depending on the level — book through thirunallarutemple.org. Thirunallar village 4km link road becomes one-way managed by traffic police for 36 hours. Outside the Mar 5-7 window, March is the year''s last cool month — daytime 25-32C, nights 22C, rainfall under 15mm. Nagore Dargah Thursday qawwali continues at peak attendance through the month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 4, 3, 'go',
  'Pre-summer heat. 26-36C, humidity 75 percent. Pilgrim flow stable; visitor heat collapses 11am-4pm.',
  'April is when the Cauvery delta heat hits. Pilgrim flow continues — Saturn-darshan demand is weather-agnostic — but tourist sightseeing collapses past 11am. Plan early-morning temple, late-evening dargah, AC in between. Hotel rates 25 percent below February.',
  NULL,
  'April in Karaikal is when the delta heat shifts the trip. Daytime 28-36C, humidity past 75 percent — the diurnal range opens up to its annual high (10C) — and the air is heavy from 10am to 5pm. Pilgrim flow at Thirunallar continues at full pace; faith-based visits are weather-agnostic, and the temple''s 12:30-4pm darshan-closure window naturally aligns with the hottest hours. Saturday crowds at 20,000-30,000 are slightly thinner than January-February but hold. Tourist circuits — Karaikal Beach, Saint Theresa shrine, Velankanni day-trip — collapse mid-day. Nagore Dargah''s Thursday qawwali shifts to slightly later 7:30pm start and works in cooling air. Hotel rates run 25-30 percent below February peak. Carry electrolyte sachets — the temple complex sun-glare on the Nala Theertham tank steps is no joke. The Tamil New Year (April 14) brings a 3-day local pilgrim spike; book around it if dates allow.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 5, 2, 'wait',
  'Peak heat. 27-38C, humidity 80 percent. Sea breeze tempers afternoons. Pilgrim flow holds, tourist flow collapses.',
  'May is when the delta bakes. Pilgrim flow holds — Saturn-pooja demand is weather-immune — but the broader visit (sightseeing, walks, beach) collapses. Hotel rates at year-low. Workable only as a single-purpose pilgrimage trip.',
  'May in Karaikal pushes 27-38C with humidity 80 percent. The pilgrim trip works (temple AC at darshan hall, faith-based crowds turn out anyway), but the broader visit collapses. October is the cleaner window for tourists; pilgrims should plan around the cool of dawn and late evening.',
  'May in Karaikal is the year''s most uncomfortable stretch. Daytime 28-38C, humidity 80 percent, and the diurnal range hits its annual high — nights still drop to 26-27C but the air carries heat all 24 hours. The Bay of Bengal sea-breeze tempers afternoons by 1-2C from inland Trichy or Tanjore highs, but the temple complex with its open Nala Theertham tank steps, the dargah courtyard, and the Karaikal Beach walk all collapse 11am-5pm. Pilgrim flow at Thirunallar holds — Saturn-pooja demand is genuinely weather-immune — and Saturday queues still run 15,000-25,000. Hotel rates at year-low; Hotel Manimaran walk-in below ₹2,200, Subaa Lodge below ₹1,500. Nagore Dargah Thursday qawwali shifts to 8pm and works in cooler post-sunset air. Plan dawn temple, AC midday, late dargah. Push to October if the trip is broader than pilgrimage.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 6, 2, 'wait',
  'Pre-NE monsoon. 26-35C, scattered rain. Cauvery delta humidity high; pilgrim flow holds.',
  'June runs hot with first-rain humidity — the southwest monsoon delivers Kerala''s deluge but the Coromandel coast (Karaikal''s side) catches only 60-100mm of spillover. Pilgrim flow is weather-agnostic. Tourists should still wait for October.',
  'June drops the southwest monsoon on the west coast; the Coromandel coast catches only spillover (60-100mm) but humidity climbs past 85 percent. The trip is uncomfortable for tourists; pilgrims continue as always.',
  'June in Karaikal sits in a humid lull. The southwest monsoon hits Kerala on June 1 and most of the rain stays west of the Western Ghats; the Coromandel coast and Cauvery delta catch only 60-100mm of spillover but humidity past 85 percent. Daytime 27-35C, sea-breeze less effective with the rising humidity. Pilgrim flow at Thirunallar holds steady; Saturday queues run 15,000-22,000. Velankanni''s feast pre-season starts building; the August 29 to September 8 Velankanni festival is now 8-10 weeks out. Nagore Dargah Thursday qawwali at 8pm works in pre-monsoon thunderstorm air. Hotel rates at year-low; Hotel Subaa Karaikal under ₹1,500, MK Residency under ₹2,000. The trip works for a focused pilgrimage but the broader visit (beach walks, day-trips to Thanjavur 100km west, Velankanni 27km south) is gruelling. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 7, 2, 'wait',
  'Mid-summer humidity. 26-34C, sporadic showers. Cauvery delta paddy at peak green.',
  'July is the Coromandel humid lull — west-coast monsoon at full force, east-coast monsoon still 12 weeks away. Pilgrim flow continues; tourist comfort low. Cauvery delta paddy fields are at year-peak green for photographers.',
  'July is humid and uncomfortable for general tourism; expect 85-90 percent humidity with 26-34C and only 80-100mm of rain (most spillover from Kerala-Karnataka monsoon). The trip you came for as a tourist does not work; pilgrims continue regardless.',
  'July in Karaikal is the Coromandel humid lull. Daytime 26-34C, humidity 85-90 percent, rainfall 80-100mm — almost all spillover from the southwest monsoon hammering the west coast. The Cauvery delta paddy is at year-peak green; photographers and rural-photography travellers find this their best window. Pilgrim flow at Thirunallar runs steady through the month; Saturday queues 15,000-20,000. Nagore Dargah continues full programme. Aadi-month (mid-July to mid-August in Tamil calendar) brings local-pilgrim spikes for special poojas; Tuesday and Friday darshans gain 30-40 percent attendance over baseline. Hotel rates at year-low; Hotel Subaa under ₹1,400, Manimaran under ₹2,100. The broader Karaikal trip — the beach walk, Saint Theresa shrine afternoon, day-trip to Velankanni — is gruelling in July humidity. Faith-based visits work; tourist visits should wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 8, 2, 'wait',
  'Late-summer humidity. 26-33C, 80-100mm rain. Velankanni feast pre-season builds.',
  'August holds the July pattern. Velankanni feast (Aug 29-Sep 8) drives the pre-feast Catholic pilgrim wave from August 25 onwards; Karaikal is the natural night-stop for those arriving from Pondicherry side.',
  'August stays humid (85-90 percent) with 80-100mm of rain. Pilgrim flow holds; tourist comfort still low. Wait for October if the trip is broader than faith.',
  'August in Karaikal continues the Coromandel humid lull. Daytime 26-33C, humidity 85-90 percent, rainfall 80-100mm. The Velankanni Catholic feast — built around the September 8 nativity-of-Mary — has its pre-feast novena from August 29; Karaikal becomes the natural overnight base for Tamil-diaspora and Sri Lankan Catholic pilgrims arriving from Chennai-Pondicherry side and combining Velankanni (27km south) with Thirunallar (4km from Karaikal town) and Nagore Dargah (14km north). Hotel demand spikes 30-40 percent in the last 10 days; book ahead. Aadi-month special poojas at Thirunallar continue. The Karaikal beach walk and Saint Theresa shrine remain off-limits-to-comfort for general tourists; pilgrim-circuit visits work because the destinations are religious-not-recreational. Push to October for the broader visit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 9, 3, 'go',
  'Velankanni feast Sep 8. NE monsoon arrives mid-Oct. 25-32C, 100-150mm rain. Catholic pilgrim wave.',
  'September is when the Catholic pilgrim wave centres on Velankanni''s September 8 nativity feast. Karaikal-Velankanni-Thirunallar circuit at full strength. NE monsoon still 4-6 weeks out; weather workable.',
  'Early September is workable but the NE monsoon arrives mid-October and brings the year''s rain peak. If date is flexible, push to late November for cleaner weather without the September pilgrim crowd.',
  'September in Karaikal centres on the Velankanni feast (September 1-8) — the Tamil Catholic equivalent of a Marian pilgrimage that draws 1-2 million people to the basilica 27km south of Karaikal. Karaikal is the natural overnight base; hotel rates spike 50-70 percent for the September 1-10 window and book out 14-21 days ahead. Outside the feast window, Thirunallar runs normal Saturday crowds 18,000-25,000. Nagore Dargah Thursday qawwali at peak attendance. Daytime 25-32C, humidity easing toward 80 percent, rainfall 100-150mm — most of it the second-half pre-monsoon thunderstorms. The Cauvery delta paddy is at harvest stage from week 3; rural photography continues at year-best. The trip works for the multi-faith pilgrimage circuit; for general tourism, October is cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 10, 2, 'wait',
  'NE monsoon arrives. 25-30C, 250-300mm rain. Cyclone risk on Bay of Bengal coast. Patchy.',
  'October is when the northeast monsoon hits the Coromandel coast — Cauvery delta is the most flood-prone section of Tamil Nadu. Cyclone risk peaks late month; Cyclone Ditwah (Nov 2025) and historic Nov 2021 floods both centred here.',
  'October drops 250-300mm of rain on Karaikal. The pilgrim trip continues (faith-immune to weather) but tourist visits get washed; cyclone landfall windows make the calendar unreliable. December is the proper return.',
  'October in Karaikal is when the northeast monsoon arrives — the rain pattern that defines the Cauvery delta year. The NE monsoon onset typically falls around October 20 (deviation up to a week either side); rainfall jumps to 250-300mm across 14-18 wet days, often as 3-4 day spells with rare longer dry breaks. Daytime 25-30C, humidity at 85 percent. Bay of Bengal cyclone risk peaks in late October — Karaikal-Nagapattinam-Velankanni stretch has a documented history of direct landfall (Cyclone Ditwah late November 2025 missed Karaikal by 80km but flooded the delta; the November 2021 floods red-alerted Karaikal for a week). Pilgrim flow at Thirunallar holds; Saturday queues thin to 12,000-18,000 on rainy days. Hotel rates run at year-low (40 percent below January). The NE monsoon hammer is the trade-off; for clean Coromandel weather, December is the proper return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 11, 2, 'wait',
  'Wettest month. 24-29C, 350-400mm rain. Karaikal''s annual peak rainfall. Cyclone risk elevated.',
  'November is Karaikal''s wettest month — about a third of annual rainfall in 30 days. NE monsoon at full force, cyclone risk active until Nov 20. Pilgrim flow holds but the broader trip suffers.',
  'November is rainfall peak — 350-400mm in 30 days, the year''s wettest month for the Cauvery delta. Cyclone landfall windows continue into the third week. December dramatically cleaner.',
  'November in Karaikal is the year''s rainfall peak. Rainfall 350-400mm — about a third of the district''s 1,260mm annual — across 18-22 wet days, often in 3-5 day cyclonic spells. Daytime 24-29C, humidity 90 percent, the diurnal range at year-low (5C). Bay of Bengal cyclone risk runs through November 20; the Cauvery delta has the documented bad-luck distinction of being the country''s most cyclone-prone deltaic district. Pilgrim flow at Thirunallar holds — faith-based visits are weather-agnostic — and the temple''s indoor darshan hall provides shelter; Saturday queues thin to 10,000-15,000 only on red-alert days. Nagore Dargah Thursday qawwali continues, often inside the inner-courtyard hall on rainy evenings. The Cauvery delta paddy harvest concludes; rice mills near Tiruvarur run 24/7. Hotel rates at year-low. The cleaner trip is December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karaikal', 12, 4, 'go',
  'Peak season returns. 23-28C, NE monsoon retreating. 100-150mm rain. Christmas-NY pilgrim spike.',
  'December is the proper return to clean Karaikal weather. NE monsoon retreats from the Cauvery delta in the first half; rainfall halves versus November. Christmas-NY week brings Catholic pilgrim spike at Velankanni, spillover to Karaikal hotels.',
  NULL,
  'December in Karaikal is the cleaner half of the cool season. Northeast monsoon retreats from the Cauvery delta in the first 15 days; rainfall drops from November''s 350-400mm to 100-150mm with most falling pre-December 10. Daytime 23-28C, nights 21-23C, humidity dropping past 80 percent. Thirunallar Saturday queues rebuild to 22,000-30,000 by mid-December. Christmas-NY week (December 22 to January 2) brings the year-end Catholic pilgrim spike at Velankanni 27km south; Karaikal hotels see spillover demand and rates climb 40-50 percent. Christmas Eve mass at the Saint Theresa shrine in Karaikal town draws 800-1,200 worshippers. Nagore Dargah Thursday qawwali continues; the cool dry air carries the music well across the inner courtyard. The first three weeks of December run cleaner-rainwise but with marginally higher hotel rates than November''s storm-discounted levels. Plan around your specific Saturday visit; the post-cyclone-season clean stretch has its own rhythm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- PUDUCHERRY (city, French Quarter, UT capital) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 1, 5, 'go',
  'Peak Coromandel window. 21-30C, dry. NE monsoon spent. Aurobindo Ashram Samadhi quietest.',
  'January is when Puducherry city runs at its most coherent. NE monsoon retreated, French Quarter walks comfortable all day, Promenade rock-beach pleasant 6am-late. Aurobindo Ashram Samadhi (8am-12pm, 2pm-6pm) at peak quiet — first 10 days of January are below New Year load.',
  NULL,
  'Puducherry in January is the version Coromandel regulars book first. Daytime 24-30C, nights 21-23C, rainfall under 30mm — the northeast monsoon (which delivered 350-400mm in November) has spent. The 1.2km Promenade Beach (rock-beach, Goubert Avenue) is car-free 6am-8am and 6pm-late; cars allowed 7:30am-6pm. Sri Aurobindo Ashram Samadhi (8am-12pm, 2pm-6pm, no entry fee, photography prohibited inside) is at year-quietest in the first 10 days of January post-New-Year crowd thinning; February 21 is the next big closure. The four Ashram Darshan Days (Feb 21, Apr 24, Aug 15, Nov 24) do not affect Samadhi access for the day-visitor as the building stays open, but most other Ashram facilities (Pour Tous store, Dining Hall) close to non-residents. French Quarter walks (Rue Romain Rolland, Rue Suffren, Rue Dumas) are at year-best photogenic light at 7-9am and 4-6pm. Le Cafe at Promenade Beach has a 30-minute morning queue 9-10am. Chennai-Puducherry ECR drive: 160km, 3-3.5 hours mid-week, 4-5 hours Friday evening or Sunday return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 2, 5, 'go',
  'Driest stretch. 22-31C. Mother''s Birthday Feb 21 darshan. Heritage Festival mid-Feb.',
  'February delivers the cleanest weather of the year. Pondicherry Heritage Festival (variable mid-Feb, typically 7-10 days) runs French Quarter walks, Tamil Quarter art shows. The Mother''s Birthday darshan (Feb 21) is the year''s third major Ashram day — Pour Tous, Dining Hall, most community facilities residents-only.',
  NULL,
  'February in Puducherry is the cleanest cool month. Daytime 23-31C, nights 22C, rainfall under 10mm, humidity 65 percent. The Pondicherry Heritage Festival (variable mid-February, typically 7-10 days, organised by INTACH-Pondicherry chapter) runs walks of the French Quarter, Tamil Quarter, Muslim Quarter; art shows at Maison Colombani; lectures at Alliance Francaise. The Mother''s Birthday darshan day (February 21) is the year''s third major Ashram event — the Samadhi remains open to day-visitors but Pour Tous community store, Aurobindo Dining Hall, and most community workshops close to non-residents on the 21st itself. Saturday-morning Promenade Beach pulls the year''s busiest crowd; the 1.2km stretch from Bharati Park to Dupleix Park has 4,000-5,000 walkers between 6-8am. French Quarter cafe culture (Le Cafe, Cafe des Arts, Baker Street) at peak occupancy on weekends; Chennai-Pondicherry ECR Friday-evening traffic stretches to 5-6 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 3, 4, 'go',
  'Last cool window. 24-33C. Hotel rates drop 20 percent. French Quarter walks shift to morning/evening.',
  'March extends the February experience minus the Heritage Festival programme. Days warm to 33C in the last fortnight, French Quarter walks compress to morning/evening, Promenade evening crowds remain strong. Hotel rates discount 20-25 percent.',
  NULL,
  'March in Puducherry is the soft-landing month. Daytime 25-33C, nights 24C, humidity past 70 percent in the last fortnight. Promenade Beach 6-8am car-free window remains the cleanest walk; Le Cafe queue thins to 10-15 minutes. French Quarter walks compress to 7-9am and 5-7pm; the Rue Romain Rolland-Rue Suffren-Rue Dumas grid catches good morning light. Aurobindo Ashram Samadhi continues its standard 8-12, 2-6 hours; pilgrim flow at near-January levels. Hotel rates discount 20-25 percent versus February peak — Le Dupleix walk-in below ₹8,500, Maison Perumal below ₹6,500, Hotel de l''Orient below ₹5,500. The Holi long weekend (variable mid-March) brings a Chennai-Bangalore surge across ECR; Friday-evening traffic stretches to 5-6 hours, hotel rates spike 30 percent for 4 days. Outside Holi, weekday occupancy at 50-60 percent and the city is at its quietest cool stretch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 4, 3, 'go',
  'Pre-summer heat. 26-36C, humidity 75 percent. Apr 24 darshan. French Quarter walks shrink to 7-9am.',
  'April runs hot. The Mother''s final-arrival darshan (Apr 24) closes Ashram facilities to non-residents. French Quarter walks workable only 7-9am and 5-7pm. Promenade evenings remain pleasant with sea breeze. Hotel rates 30 percent below February.',
  NULL,
  'April in Puducherry is the first uncomfortable month. Daytime 28-36C, humidity past 75 percent, the Coromandel sea-breeze giving an evening 1-2C reprieve. The Mother''s final-arrival darshan (April 24, the third of the four Ashram darshan days) closes Pour Tous, Dining Hall, and most community workshops to non-residents on the 24th; the Samadhi remains open. French Quarter walks compress to 7-9am and 5-7pm; the colonial-grid streets radiate heat from 10am. Promenade Beach evening 5-9pm car-free window is at year-strength — the sea breeze gives genuine relief and crowds build by 6pm. Le Cafe morning queue thins. Hotel rates run 30-35 percent below February peak — Le Dupleix walk-in below ₹7,000, Maison Perumal below ₹5,500. Tamil New Year (April 14) brings 3-day local-tourism spike; Chennai-Pondicherry ECR Friday traffic stretches. The Aurobindo Ashram Samadhi remains the cool indoor refuge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 5, 2, 'wait',
  'Peak heat. 27-38C, humidity 85 percent. Pre-monsoon thunder. Promenade evenings only viable.',
  'May is when Puducherry bakes. French Quarter walks collapse outside 7-9am, hotel rates at year-low. Workable only as a short Promenade-evening-and-French-cuisine weekend. Mid-May to early June pre-monsoon thunderstorms knock power.',
  'May runs 27-38C with humidity touching 85 percent — among the most uncomfortable Coromandel coast stretches. Outdoor walking collapses past 9am; the trip narrows to AC indoors and Promenade evenings. October cleaner.',
  'May in Puducherry is the year''s most uncomfortable stretch. Daytime 28-38C, humidity 85 percent, the Coromandel coast at its most punishing. The diurnal range opens to 10C; nights drop to 26-28C but the air carries heat all day. French Quarter walks workable only 6-8am and 6-8pm. Promenade Beach 6-8am morning car-free window is the most pleasant outdoor stretch; the 6-9pm evening window draws crowds for sea-breeze relief. Aurobindo Ashram Samadhi becomes a cool indoor refuge — the inner-courtyard temperature runs 4-5C below street level. Pre-monsoon thunderstorms — first squalls of the southwest monsoon advance — start arriving in the last 10 days and knock grid power 1-3 hours at a stretch. Hotel rates run 35-40 percent below February peak — Le Dupleix walk-in below ₹6,500, Hotel de l''Orient below ₹4,500. Push to October if comfort matters. Local Tamil New Year-related Aadi-month foreshadowing begins late month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 6, 2, 'wait',
  'Pre-NE monsoon humidity. 27-35C, 80-100mm rain. SW monsoon spillover. Tourist comfort low.',
  'June runs hot and humid. The Coromandel catches only spillover rain (60-100mm); humidity past 85 percent makes outdoor walks gruelling. Hotel rates at year-low. Wait for October if comfort matters.',
  'June drops the southwest monsoon on the west coast; the Coromandel coast catches only spillover (80-100mm) but humidity past 85 percent. The trip works for hotel-and-cafe weekenders only; the broader walking-French-Quarter experience does not.',
  'June in Puducherry sits in the Coromandel humid lull. The southwest monsoon hits Kerala on June 1; the Coromandel coast and Pondicherry catch 80-100mm of spillover but humidity past 85 percent and daytime 27-35C. The French Quarter colonial-grid streets radiate heat from 9am. Promenade morning car-free window remains the cleanest outdoor stretch; the evening 6-9pm draws fewer crowds than April-May with the heavier rain risk. Aurobindo Ashram Samadhi continues at quiet baseline. Auroville (10km north) handles the inland heat marginally better with its red-earth shade canopy. Hotel rates run at year-low — Le Dupleix walk-in below ₹6,000, Maison Perumal below ₹4,500, Hotel de l''Orient below ₹4,200. Le Cafe and the Promenade-side coffee shops have walk-in tables. Chennai-Pondicherry ECR Friday traffic at 50-60 percent of January levels. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 7, 3, 'go',
  'Bastille Day Jul 14. 26-34C, sporadic rain. French Embassy parade. Tourist comfort low; cultural calendar unique.',
  'July 14 — Bastille Day, the singular Pondicherry calendar event — runs French Embassy organised parades, retired-soldier marches on Goubert Avenue, French War Memorial illumination, French Quarter packed. Heat humidity uncomfortable; cultural payoff worth the trade-off for one weekend.',
  'July is hot and humid (26-34C, 85 percent humidity); the broader trip works only Promenade evenings and AC. Bastille Day weekend is the sole week worth booking specifically — surrounding days run heavy.',
  'July in Puducherry is dominated by July 14 — Bastille Day, the year''s singular French-heritage event. The French Embassy and Consulate General Pondicherry organise a torchlight march on the 13th evening from Bharati Park toward the Gandhi statue; the 14th sees retired-soldier parades in dual French-Indian uniforms marching on Goubert Avenue (Promenade Beach), French and Indian national anthems, marching bands. The French War Memorial (north end of Promenade) is illuminated in memory of the Great War French-Indian soldiers. French Quarter packs with French-passport holders, Pondicherry-French dual-citizens, and short-stay tourists; Le Cafe, Cafe des Arts, Le Club have wait times of 60-90 minutes. Hotel rates spike 50-70 percent for the July 12-15 window; Le Dupleix and Maison Perumal book 14-21 days ahead. Daytime 26-34C, humidity 85 percent, rainfall 80-100mm sporadic. Outside Bastille Day weekend, July is the Coromandel humid lull at year-low rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 8, 2, 'wait',
  'Late-summer humidity. 26-33C, 80-100mm rain. Aug 15 darshan plus Independence Day shut Ashram facilities.',
  'August holds the July pattern. Sri Aurobindo''s Birthday darshan (Aug 15, year''s most-observed Ashram day) closes most facilities to non-residents; Independence Day overlap brings domestic-tourism surge regardless of weather.',
  'August stays humid (26-33C, 85-90 percent humidity). Sri Aurobindo''s Birthday darshan (Aug 15) is the year''s most-observed Ashram day — the Samadhi remains open but Pour Tous, Dining Hall, and Ashram Press all close to non-residents. Independence Day overlap pulls a domestic-tourism wave.',
  'August in Puducherry is the year''s most-restrictive Ashram month. Sri Aurobindo''s Birthday darshan (August 15) is the most-observed of the four annual darshan days — the Samadhi remains open to day-visitors but Pour Tous community store, Aurobindo Dining Hall, Ashram Press, and most community workshops close to non-residents on the 14th, 15th, and 16th. The August 15 Independence Day overlap brings a domestic-tourism wave to Pondicherry; Le Dupleix, Maison Perumal, Palais de Mahe all hit 90 percent occupancy and rates spike 35-40 percent for the 4-day window. ECR Chennai-Pondicherry Friday-evening traffic stretches to 6-7 hours. Daytime 26-33C, humidity 85-90 percent — the Coromandel humid lull continues. Outside the August 14-17 long weekend, hotel rates run at year-low (50 percent below February). The trip works for the multi-faith pilgrim who can route the Ashram visit around darshan days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 9, 3, 'go',
  'Recovery month. 25-32C, 100-150mm rain. SW monsoon retreats. NE monsoon arrives mid-Oct.',
  'September is the trickle back to coherent. SW monsoon retreats from inland India, humidity drops 5-10 points versus August, French Quarter walks return to morning/evening viability. NE monsoon still 4-6 weeks away.',
  'September is workable but the NE monsoon arrives mid-October and brings the year''s rain peak. If date is flexible, push to late November for cleaner weather.',
  'September in Puducherry is the soft re-opening. Daytime 25-32C, humidity easing to 80 percent, evening winds turning from south to north as the southwest monsoon collapses inland. Aurobindo Ashram Samadhi at quiet baseline; Pour Tous and Dining Hall facilities return to normal post-August darshan. Promenade Beach 6-8am car-free window at year-best — the cool dry mornings before NE monsoon arrival are arguably better than November''s rain-lulls. French Quarter walks workable 7-10am and 4-7pm. Hotel rates sit 40-50 percent below February peak — Le Dupleix walk-in below ₹6,500, Maison Perumal below ₹5,000. Pitru Paksha (variable mid-September) tempers Indian-tourist demand. The Le Cafe queue is walk-in. Workable for a quiet, low-pressure visit; the catch is the second half of the month sees pre-NE-monsoon thunderstorms. October-mid-November is materially harder; late November-December cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 10, 3, 'go',
  'Season opens but NE monsoon arrives. 24-30C, 200-300mm rain. Cyclone risk Bay of Bengal.',
  'October is the season-opener with a caveat — NE monsoon hits the Coromandel coast around Oct 20, dumping 200-300mm. French Quarter walks interrupted by 3-4 day rain spells. Cyclone landfall risk active.',
  'October isn''t the clean season most India destinations get. Tamil Nadu and Pondicherry catch the NE monsoon while Kerala and Karnataka are at their post-monsoon best. Cyclone activity peaks this month and next. December is the proper return.',
  'October in Puducherry is the official season-opener but nothing like the dry crisp version inland India gets. The NE monsoon onset typically falls around October 20 (deviation up to a week either side); rainfall jumps from September''s 100-150mm to 200-300mm across 12-15 wet days, often as 3-4 day cyclonic spells with rare longer dry breaks. Daytime 25-30C, humidity 85 percent. Bay of Bengal cyclone risk peaks late October — Pondicherry has the Coromandel coast''s documented cyclone path. The French Quarter catches running rain on cyclonic days; Le Cafe and the Promenade-side cafes shift indoor seating. Aurobindo Ashram Samadhi continues without interruption. Hotel rates climb 15-20 percent versus September as Diwali approaches; Diwali long weekend (variable mid-October to early November) drives a 5-day rate spike of 30-35 percent. Pack a rain jacket; book hotels with covered courtyards.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 11, 4, 'go',
  'NE monsoon at peak. 24-29C, 300-400mm rain. Nov 24 darshan. Cyclone risk fades by week three.',
  'November is when the NE monsoon hits hardest — about a third of annual rainfall in 30 days. The Mother''s final-day darshan (Nov 24, year''s fourth Ashram day) closes most facilities. Cyclone risk runs through Nov 20; fades by month-end.',
  NULL,
  'November in Puducherry is the rainfall peak — 300-400mm over 18-22 wet days, about a third of the city''s annual 1,260mm. Daytime 24-29C, humidity 90 percent. Bay of Bengal cyclone risk runs through November 20; the Pondicherry-Cuddalore-Karaikal stretch has the coast''s most-documented cyclone landfall windows. The Mother''s final-day darshan (November 24 — the founding anniversary of Auroville and the fourth Ashram darshan day) closes Pour Tous, Dining Hall, and most community workshops to non-residents on the 24th; Samadhi remains open. Promenade Beach 6-8am car-free window remains pleasant on dry days but rain-lulls compress visiting windows to 1-2 hour stretches. French Quarter cafe culture shifts to indoor seating; Le Cafe, Cafe des Arts, Baker Street all run with rain-covered side terraces. Hotel rates run 25 percent below January peak; cyclone-spell discount opportunities exist mid-month. Christmas-week pre-bookings start late November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('puducherry', 12, 5, 'go',
  'Peak Coromandel month. 22-29C, NE monsoon retreating. Christmas-NY 50 percent premium and French Quarter sold out.',
  'December is the proper return to peak Pondicherry weather. NE monsoon retreats first half, rainfall halves versus November. Christmas-NY week drives 50 percent rate premium and books the French Quarter heritage hotels 21-30 days ahead.',
  NULL,
  'December in Puducherry is the year-second-peak month behind January-February. Northeast monsoon retreats from the Coromandel coast in the first 10 days; rainfall drops from November''s 300-400mm to 50-100mm with most pre-December 10. Daytime 24-29C, nights 22-23C, humidity dropping past 75 percent. Promenade Beach 6-8am car-free window at year-best clarity post-monsoon. French Quarter walks workable all day. Aurobindo Ashram Samadhi at peak quietude in the first 15 days; queues form by December 22 as Christmas-week travellers arrive. Christmas-NY week (December 22 to January 2) drives hotel rates up 50-60 percent versus November and books out the French Quarter heritage hotels — Le Dupleix, Maison Perumal, Palais de Mahe, Villa Shanti, Hotel de l''Orient — 21-30 days ahead. Le Cafe morning queue stretches to 30-45 minutes December 23-31. ECR Chennai-Pondicherry traffic on December 23-26 and December 30-January 1 hits its annual peak; Friday drives stretch to 7-8 hours. Lock dates pre-December 18 if budget matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
