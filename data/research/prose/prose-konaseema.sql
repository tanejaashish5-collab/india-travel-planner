-- Konaseema destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: konaseema

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 1, 5, 'go',
  'Peak Godavari delta window. 19-29C, dry. Olive Ridley nesting at Coringa. Dindi backwater boats at year-best.',
  'January is when the Godavari delta runs at year-best. Daytime 27-29C, nights 19-21C, sub-30mm rain. Coringa Wildlife Sanctuary (Olive Ridley nesting peak Nov-Mar, only mangrove fishing-cat habitat outside Sundarbans). Dindi backwater boats run cleanly. Antarvedi temple confluence at full tempo.',
  NULL,
  'Konaseema in January is the version Godavari-delta veterans book first. Daytime 27-29C, nights 19-21C, rainfall under 30mm, humidity at 70 percent. The 13-island Godavari delta — the river splits into seven distributaries (Vasishta, Vainateya, Gowtami, Tulya Bhaga, Atreya, Bharadwaja and Kaushika) after Dowleswaram before fanning into the Bay of Bengal — runs at peak walkability. Coringa Wildlife Sanctuary (235 sq km of mangrove forest near Kakinada, the only mangrove fishing-cat habitat in India outside the Sundarbans, declared sanctuary 1978) is at Olive Ridley nesting peak Nov-Mar — APFD-managed turtle-watch programmes run from Hope Island and Sacramento Island. Dindi backwater boats (the AP-tourism KSTDC-equivalent operates day-cruises 9am-5pm from Dindi village, ₹250-450 per head shared, ₹3,500-5,500 private) cruise the Vainateya distributary cleanly. Hotel options thin: Sterling Dindi River Resort ₹4-6k, Coconut Country Resort Dindi ₹3-4.5k, family homestays in Mummidivaram/Yanam ₹1,500-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 2, 5, 'go',
  'Driest stretch. 20-31C. Coringa Olive Ridley still nesting. Backwater boat trips at full tempo.',
  'February holds January''s cleanliness. Rainfall under 15mm, daytime 29-31C. Coringa nesting season tail. Dindi backwater day-cruises and Antarvedi confluence at peak access. Hotel rates ease 15 percent off January.',
  NULL,
  'February in Konaseema is the technical peak. Rainfall under 15mm, daytime 29-31C, nights 20-22C, humidity at 65 percent — the lowest of the year on the Godavari delta. Coringa Wildlife Sanctuary Olive Ridley nesting season at tail (peak Nov-Feb, the AP Forest Department coordinates beach-patrol and hatchery work through this window) — turtle-watch guided trips run from Sacramento Island and Hope Island sandbars by boat, ₹1,200-1,800 per head with 1-night-stay options at the basic forest-camp. The mangrove fishing-cat population (estimated 30-50 cats, the only Indian habitat outside Sundarbans) remains nearly impossible to spot but camera-trap data and night-time boat trips from Coringa village run 3-4 hour slots. Dindi backwater day-cruises (9am-5pm from Dindi village, ₹250-450 shared) run the Vainateya distributary in clear weather. Antarvedi temple confluence — the Lakshmi Narasimha darshan plus the sunset over the river-mouth — works dawn to dusk. Coconut groves and paddy fields walkable. Hotel rates ease 15 percent off January: Sterling Dindi ₹3.5-5k, Coconut Country Dindi ₹2.5-4k, homestays ₹1,200-2k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 3, 4, 'go',
  'Last cool month. 23-33C. Backwater boats run dawn/dusk. Olive Ridley nesting wraps. Coconut groves walkable.',
  'March is the soft-landing month. Olive Ridley nesting season ends mid-month. Backwater cruise schedules compress to dawn and dusk slots. Antarvedi works mornings. Hotel rates 20 percent below February. Last clean window before pre-monsoon heat.',
  NULL,
  'March in Konaseema is the transition month. Daytime 31-33C, nights 23-24C, humidity climbing to 72 percent, rainfall under 30mm. Coringa Olive Ridley nesting season wraps by mid-month — APFD hatchery release events (turtle-release into the Bay of Bengal at sunset) are the conservation highlight of the season-tail. Dindi backwater cruise schedules still run 9am-5pm but the comfortable slots compress to 9-11am and 3-5pm; the noon stretch on open backwaters carries 33-34C heat. Antarvedi temple confluence walks work pre-11am and post-5pm. Coconut groves and paddy fields still walkable. The mangrove fishing-cat night-boat trips remain viable through March. Hotel rates ease 20 percent off February: Sterling Dindi ₹3-4k, Coconut Country ₹2-3k, homestays ₹1,000-1,800. The last clean window before April-May humidity stress forces the trip into endurance mode. Godavari fish curry (jeera-tamarind base) and drumstick fry at family-run kitchens — Tanugula Sweets, Subbayya Gari Hotel along the route. The Papikondalu boat trip from Rajahmundry (60km upstream Godavari gorge, day cruise) remains at full water level.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 4, 3, 'wait',
  'Pre-monsoon humidity. 26-35C, humidity 80 percent. Sri Rama Navami at Bhadrachalam upstream. Backwaters slow.',
  'April still works for cruise-and-temple travelers willing to time the windows — backwater boats 6-9am and 4-7pm only. Sri Rama Navami at Bhadrachalam (90km upstream Godavari) draws regional pilgrims. AC car retreats handle mid-day.',
  'April pushes the delta trip into pre-monsoon stress. Backwater cruises compress to dawn and dusk. Coconut grove walks unsafe under midday sun. Mangrove cat night-trips unsuited to 88 percent humidity. October-March is the proper window.',
  'April in Konaseema is when the delta trip narrows to early morning and evening. Daytime 33-35C, humidity 80 percent, sea breeze starts only after 5pm. Pre-monsoon thunderstorms hit the last fortnight — short violent squalls that drop temperatures 3-4 degrees temporarily but raise humidity to 90 percent. Dindi backwater cruises run only 6-9am and 4-7pm windows; the noon stretch on the open Vainateya distributary becomes unsafe. Sri Rama Navami (chaitra-shukla-navami, typically falls in April) at Bhadrachalam upstream (Sita-Rama-Lakshmana temple on the Godavari, 90km from Konaseema centre, the festival is the largest in Telangana and Andhra Rama-pilgrimage circuit) draws regional pilgrims — book ferries and Bhadrachalam ghat accommodation 4-6 weeks ahead. Coconut groves walkable only at dawn. Antarvedi confluence morning darshan works. Hotel rates run 25-30 percent below February: Sterling Dindi ₹2.5-3.5k, Coconut Country ₹1.8-2.5k, homestays ₹800-1.5k. Weekday occupancy under 50 percent. The October-March window is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 5, 2, 'wait',
  'Peak heat plus pre-monsoon. 27-36C, humidity 85 percent. Backwater trip stress-mode. Asani-class cyclone risk.',
  'May functions only for tolerant cruise travelers at dawn slots. Pre-monsoon thunderstorms third week. East-coast cyclone risk window opens — Asani brushed AP coast May 2022. October-March is dramatically better.',
  'May in Konaseema pairs peak humidity with the pre-monsoon cyclone-cell risk on the Krishna-Godavari delta. Backwater cruises work only dawn. Heat stress mid-day unsafe. October is dramatically cleaner — push the trip.',
  'May in Konaseema is the closing month before the southwest monsoon arrives around June 1-5. Daytime 34-36C, humidity 85 percent, sea breeze unreliable. Pre-monsoon thunderstorms hit the third and fourth week — short squalls drop temperatures 4-5 degrees temporarily but raise humidity to 90 percent. The early-cyclone risk window (Bay of Bengal pre-monsoon cyclogenesis) is small but present — Asani made landfall on the AP-Odisha coast May 11, 2022. IMD watch via mausam.imd.gov.in is standard practice. Backwater cruises run only 5:30-8:30am with night sailings off-schedule. Coconut grove and paddy walks unsafe through midday — the delta canopy gives some shade but humidity dominates. Antarvedi temple morning darshan works. Hotel rates at year-low: Sterling Dindi ₹2-2.8k, Coconut Country ₹1.5-2.2k, homestays ₹700-1.2k. The Coringa fishing-cat night-boat programme suspends through monsoon. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 6, 2, 'wait',
  'SW monsoon arrives. 26-32C, 200-250mm. Godavari swells. Backwater cruises run intermittently in clear windows.',
  'June is monsoon arrival on the delta. Rainfall jumps to 200-250mm. Godavari swells through July. Backwater cruises run only in clear morning windows; Coringa mangrove boat trips suspend. Wait for October.',
  'June is the SW monsoon arrival without the upside — Godavari runs full, backwaters carry strong current, Coringa mangrove tours suspend. October delivers a cleaner delta for first-time visitors.',
  'June in Konaseema is the SW monsoon arrival point on the Godavari delta. The southwest current hits the AP coast around June 1-5 — IMD declares formal monsoon onset annually. Rainfall jumps from May''s 60mm to 200-250mm across 14-16 wet days; the Godavari swells through June into July as upper-catchment rains feed the delta. Daytime 28-32C feels mild against May but 88 percent humidity and intermittent sustained downpours close down the open-water backwater trip. Dindi cruises run intermittently in clear morning windows only — operators run reduced schedules and group-only bookings. Coringa mangrove boat trips and fishing-cat night-boats suspend through the wet season. Antarvedi temple darshan runs (the priests stay through monsoon) but the river-confluence sunset gets rain-interrupted. Coconut groves and paddy fields water-logged. Hotel rates at year-low: Sterling Dindi ₹1.8-2.5k, Coconut Country ₹1.3-2k, homestays ₹600-1.1k. Wait for late October — the next clean window opens then.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 7, 1, 'skip',
  'Peak SW monsoon. 26-31C, 250-300mm. Godavari at flood-watch. Backwater and mangrove trips suspended.',
  NULL,
  'July is the wettest stretch on the Godavari delta. Rainfall 250-300mm across 20-23 wet days. The Godavari runs at flood-watch level. Backwater cruises and mangrove boat trips suspended. Skip Konaseema entirely.',
  'July in Konaseema is monsoon at its operational worst for the delta-cruise trip. Rainfall averages 270mm across 20-23 wet days, often as sustained 6-12 hour downpours. The Godavari river runs at flood-watch level through the month — upper-catchment storms across Maharashtra and Karnataka send sediment-heavy water through Dowleswaram barrage and into the seven-distributary fan. Dindi backwater cruises suspended through the month for safety. Coringa mangrove boat trips and fishing-cat night-boats both suspended. Antarvedi temple darshan runs but the river-confluence walking ghat floods intermittently. Coconut groves and paddy fields submerged seasonally. Hotel rates at year-low: Sterling Dindi ₹1.5-2.2k, Coconut Country ₹1.2-1.8k, homestays ₹500-900. The trip you came for — Olive Ridley nesting, backwater boats, mangrove fishing-cat habitat, coconut-grove walks, the Godavari-delta peace — is functionally closed for the month. Cyclone-track watch via mausam.imd.gov.in continues. The next clean window is October 15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 8, 1, 'skip',
  'Monsoon continues. 26-31C, 200-250mm. Godavari at flood-watch. Delta cruises and mangrove trips closed.',
  NULL,
  'August holds July''s pattern. 200-250mm rain across 18-22 wet days. Godavari flood-watch continues. Delta trip stays closed. Skip — wait for October. Hotel rates at year-low but the trip shape collapses.',
  'August in Konaseema stays in monsoon mode across the delta. Rainfall 200-250mm across 18-22 wet days, daytime 28-31C, humidity 87 percent. Upper-catchment rains continue to feed the Godavari at flood-watch level through August — the Dowleswaram barrage releases coordinate with downstream district administration to prevent low-lying island flooding, but the 13-island delta still sees seasonal water levels 2-3m above winter base. Dindi backwater cruises remain suspended. Coringa mangrove boat trips remain suspended. Antarvedi temple darshan runs but confluence walks are rain-interrupted. The Krishna Janmashtami draw at Konaseema''s 100+ Hindu temples (the delta is known as the Athvaja Sapta — "seven-distributary sacred land") brings local pilgrims but doesn''t justify the trip for visitors. Hotel rates at year-low: Sterling Dindi ₹1.5-2.2k, Coconut Country ₹1.2-1.8k, homestays ₹500-900. Cyclone-track watch via mausam.imd.gov.in continues — September-October is the peak Bay of Bengal cyclone window. The next clean window is October 15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 9, 3, 'go',
  'SW monsoon retreat. 25-31C, 150-200mm. Godavari volume peaks. Papikondalu trip at year-best water level.',
  'September is the late-monsoon transition. Godavari volume at year-peak. The Papikondalu boat trip from Rajahmundry (60km upstream Godavari gorge) hits its best-water-level slot. Backwater boats return second half. Cyclone-watch active.',
  NULL,
  'September in Konaseema is the late-monsoon transition with one specific upside — the Godavari river runs at year-peak volume through the second half, making the Papikondalu boat trip from Rajahmundry (60km upstream from Pattiseema into the Eastern Ghats gorge — the river narrows between 200-300m basalt cliffs through the Polavaram-Papikondalu stretch) genuinely cinematic. The water level peaks in September-October before the Polavaram-Pattiseema lift-irrigation diversions reduce downstream flow in winter. AP Tourism and private operators (₹500-800 per head full-day, departure 7am from Pattiseema or Rajahmundry, return 6pm) run the trip when river-level is safe. Dindi backwater cruises return to operation through the second half. Coringa mangrove trips remain suspended until October. Daytime 28-31C, humidity 80 percent dropping to 75 by month-end. Rainfall 150-200mm across 13-15 wet days. The southwest monsoon retreats from the AP coast around September 25-30. Specific edge: Papikondalu travelers should consider September even over the December-January peak window for the water-volume reason alone.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 10, 4, 'go',
  'Season opens. 23-31C. Cyclone-watch first fortnight. Coringa nesting begins. Backwater cruises return.',
  'October is the season opener. First 10-15 days carry the cyclone-watch (Hudhud anniversary Oct 12). From October 15 onward, Coringa Olive Ridley nesting begins, Dindi backwater cruises resume full schedule, Papikondalu water still high. Rates 25 percent below January.',
  NULL,
  'October in Konaseema is the proper return to coherent. Rainfall drops to 100-150mm with the bulk falling in the first ten days; from October 15 onward the delta flips into clean cruise-and-mangrove mode. Daytime 28-31C, humidity falling from 80 to 73 percent. The first fortnight carries the Bay of Bengal cyclone risk — Hudhud landed on the AP coast at Vizag on October 12, 2014; Phailin hit Odisha-AP coast October 12, 2013 — so IMD watch is mandatory October 5-20. Beyond that, Coringa Olive Ridley nesting season begins (peak Nov-Mar but October triggers the first major egg-laying waves), Coringa mangrove boat trips resume, Dindi backwater cruises return to 9am-5pm full schedule, Papikondalu boat trips from Rajahmundry continue at high-water level. Antarvedi temple confluence walks return to full walkability. Hotel rates run 25-30 percent below January peak: Sterling Dindi ₹2.5-3.5k, Coconut Country ₹2-3k, homestays ₹1,000-1,800. Strong call for first-time visitors who want full delta hours minus the December-January crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 11, 5, 'go',
  'Peak window opens. 21-30C, sub-50mm rain. Coringa nesting at peak. Backwater cruises clean. Karthika Masam.',
  'November is the year''s second-peak month. Olive Ridley nesting at peak at Coringa, mangrove fishing-cat night-boats viable, Dindi cruises clean, Papikondalu water still high. Karthika Pournami mid-month brings deepam lighting. Rates 25 percent below December.',
  NULL,
  'November in Konaseema is the year''s second-peak month behind January. Rainfall under 50mm, daytime 28-30C, sea breeze cooling evenings to 22-23C, humidity dropping below 72 percent. The Bay of Bengal cyclone risk falls sharply after October 25. Coringa Wildlife Sanctuary Olive Ridley nesting at peak — Hope Island and Sacramento Island sandbars host major egg-laying through November-December. Coringa mangrove boat trips and fishing-cat night-boats both at peak season — multi-day forest-camp stays bookable through Coringa Wildlife Sanctuary office, ₹1,500-2,500 per night basic forest camp inclusive of guided boat-tours. Dindi backwater cruises (9am-5pm full schedule, ₹250-450 shared) run cleanly. Papikondalu boat trips from Rajahmundry at peak water level still through November (winter low starts December). Karthika Masam brings mass deepam lighting at the delta''s 100+ Hindu temples; Karthika Pournami full moon mid-month the headline night. Antarvedi confluence at peak. Hotel rates climb to 80 percent of January peak: Sterling Dindi ₹3-4k, Coconut Country ₹2.5-3.5k, homestays ₹1,200-2k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'konaseema', 12, 5, 'go',
  'Peak season. 20-29C, dry. Christmas-NYE rates 1.5-2x. Olive Ridley nesting peak. Late-Dec cyclone outliers.',
  'December is when Konaseema runs at full capacity. Olive Ridley nesting at peak. Christmas-NYE rates 1.5-2x. Late-season cyclones possible (Michaung Dec 2023 made landfall near Nellore) — IMD watch standard.',
  NULL,
  'December in Konaseema is the operational peak for the delta trip. Daytime 27-29C, nights 20-21C, rainfall under 25mm. Coringa Olive Ridley nesting at peak (peak nesting Nov-Mar) — forest-camp stays at Sacramento Island and Hope Island sandbars bookable via Coringa Wildlife Sanctuary office, AP Forest Department coordinates beach-patrol and hatchery work through this window. Mangrove fishing-cat night-boats at peak. Dindi backwater cruises (9am-5pm, ₹250-450 shared, ₹3,500-5,500 private) at full tempo. Antarvedi temple confluence and the 100+ delta-village temples at peak Karthika Masam tail. Papikondalu boat trips from Rajahmundry begin to see winter-low water levels through December — September-October were the peak-water months. Recent late-season cyclones — Mandous (December 9-10, 2022); Michaung (December 5-6, 2023, made landfall near Nellore as severe cyclonic storm) — are reminders that Bay of Bengal cyclogenesis extends into December. IMD watch via mausam.imd.gov.in through the second week is standard practice. First three weeks of December are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
