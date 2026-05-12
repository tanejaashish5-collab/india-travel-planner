-- Dandeli destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: dandeli | best 10-3 + 9 | avoid 6-8 (rafting closed peak monsoon) | type adventure/wildlife/rafting/nature

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 1, 5, 'go',
  'Peak rafting window. 16-32C dry. Kali River grade II-III rapids running clean. Tiger Reserve safaris optimal.',
  'January is when Dandeli runs at its strongest. Kali River rafting (grade II-III rapids on the post-monsoon flow) at peak conditions. Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 2007 — 834 sq km) safari permits at full availability. Daytime 18-32C, nights 16C.',
  NULL,
  'Dandeli in January is the version Western Ghats adventure regulars choose for the rafting-and-wildlife combination. Daytime 18-32C, nights 16C, humidity 65 percent, the Kali River running at full post-monsoon volume. The defining experience is white-water rafting on the Kali River — grade II-III rapids through 10-12km stretch from Sambrani to Kulgi via the Old Magazine bridge — operating during the post-monsoon window October to March (closed peak SW monsoon June-August when water levels become dangerously high). Operators: Bison River Resort, Kali Adventure Camp, Old Magazine Camp (Jungle Lodges & Resorts) at ₹1,500-2,500 per person, 90-120 min on water, 7am and 2pm trips. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, declared 2007 — 834 sq km merged Anshi National Park plus Dandeli Wildlife Sanctuary, the Western Ghats wet zone with black panther sightings documented, tiger population per NTCA 2018 census estimated 3-6, leopards plus the country''s largest concentration of black panthers, hornbills, langurs) at full safari operations. Jeep safari ₹800-1,500 per person, dawn and afternoon slots, advance booking via the Range Forest Office.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 2, 5, 'go',
  'Driest month. 17-33C. Kali River rafting at peak. Tiger Reserve at year-clearest visibility.',
  'February is the cleanest weather window. Kali River rafting at peak. Kali Tiger Reserve safari visibility at year-best — animals concentrate at water sources. Hotel rates ease 15 percent versus January.',
  NULL,
  'Dandeli in February is the technical peak of the adventure-and-wildlife year. Rainfall under 10mm, daytime 18-33C, nights 17C, humidity 60 percent — the lowest of the year. The Kali River — fed by the Joida-side Western Ghats catchment and the Supa Dam reservoir release — runs at clean post-monsoon volume for the grade II-III rafting through Sambrani to Kulgi. Operators (Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR) at ₹1,500-2,500 per person, 90-120 min trips, 7am and 2pm slots. Kali Tiger Reserve (834 sq km Western Ghats wet zone, Karnataka''s 5th tiger reserve declared 2007 — Anshi National Park plus Dandeli Wildlife Sanctuary merged; estimated 3-6 tigers per NTCA 2018 census, the country''s most concentrated black panther sightings documented through the year) at year-best safari visibility — Bandipur and Nagarhole get the tiger headlines but Dandeli''s black panthers are the distinctive draw. Jeep safari ₹800-1,500 per person, dawn and afternoon, advance booking via Range Forest Office. Syntheri Rocks (35km — 300m limestone gorge over Kaneri River, free entry) at peak dry-rock visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 3, 4, 'go',
  'Last cool month. 20-34C, humidity 70 percent. Rafting clean. Tiger Reserve wildlife concentration peak.',
  'March extends February''s pattern. Tiger Reserve animal concentration at year-peak as water sources dry. Rafting still clean but flow easing. Hotel rates 25 percent below February.',
  NULL,
  'Dandeli in March is the soft-landing month with peak wildlife concentration. Daytime 21-34C, nights 19C, humidity climbing to 70 percent in the last fortnight, rainfall under 30mm. The Kali River rafting continues — grade II-III rapids through the Sambrani-Kulgi stretch — but flow eases through the month as monsoon spillover from the Supa Dam reservoir ends. Operators (Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR) at ₹1,500-2,500 per person, 7am and 2pm trips. The 7am slot is the smart-traveller choice — afternoon slot becomes hot on the unshaded river stretches. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 834 sq km Western Ghats wet zone — Anshi NP plus Dandeli Wildlife Sanctuary merged 2007) at year-peak wildlife sighting probability — as the 50-plus jungle water-sources dry through the dry season, the documented black panther population, the 3-6 estimated tigers, the 200-plus leopards, the gaur and sambar all concentrate at the remaining river-and-reservoir water. Jeep safari ₹800-1,500 per person, dawn and afternoon slots, advance booking via Range Forest Office.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 4, 3, 'wait',
  'Pre-monsoon heat. 23-36C, humidity 75 percent. Tiger Reserve at wildlife concentration peak but heat brutal.',
  'April still works for serious wildlife watchers willing to time dawn safaris. Animal concentration at year-peak as water dries. Rafting season ends mid-month. Hotel rates 30 percent below February.',
  'April pushes Dandeli into pre-monsoon heat. Rafting season closes mid-month as river flow drops below safe rapid levels. Forest temperature past 32C makes mid-day safaris unproductive. Wait for October.',
  'April in Dandeli is the peak wildlife concentration window with the rafting-season closure. Daytime 24-36C, nights 23C, humidity 75 percent. The Kali River rafting season closes by mid-April as river flow drops below grade II-III rapid thresholds — Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR all wind down rafting operations by April 15-20 (next restart October). The Kali Tiger Reserve (834 sq km Western Ghats wet zone, Karnataka''s 5th tiger reserve declared 2007) at year-peak wildlife sighting probability — as forest water-sources dry, the documented black panther population, the 3-6 estimated tigers, leopards, gaur, sambar, hornbill all concentrate at the remaining Kali River and Supa Dam reservoir water. Dawn jeep safari (₹800-1,500 per person) the year''s prime wildlife-photography slot; afternoon slot becomes punishing past 32C. Advance booking via Range Forest Office. Syntheri Rocks (35km — 300m-tall limestone cliff over Kaneri River gorge) workable only 6.30-9am. Vishu (April 14, Kerala spillover) brings a 2-3 day domestic wildlife-watcher bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 5, 2, 'wait',
  'Peak pre-monsoon. 24-37C humidity 80 percent. Rafting season closed. Pre-monsoon thunderstorms.',
  'May functions only for the dawn-safari wildlife watcher. Rafting season closed. Pre-monsoon thunderstorms third week onward give first relief but Kali River not back to rafting flow until October. Hotel rates at year-low.',
  'May runs hot, sticky, with rafting season closed and pre-monsoon thunderstorms knocking grid power. Tiger Reserve dawn safaris still workable but the full Dandeli trip closes in May. October-March is dramatically better.',
  'May in Dandeli is the closing pre-monsoon month before the southwest current arrives around June 1. Daytime 25-37C, nights 24C, humidity 80 percent. The Kali River rafting season closed since mid-April; operators (Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR) maintain accommodation operations but rafting not back until October. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 834 sq km Western Ghats wet zone — Anshi NP plus Dandeli Wildlife Sanctuary merged 2007) dawn jeep safari (₹800-1,500 per person, advance booking via Range Forest Office) at year-peak wildlife concentration — but the afternoon-slot collapses past 33C. Pre-monsoon thunderstorms hit the third and fourth weeks — afternoon squalls that knock grid power 1-2 hours daily and raise humidity to 90 percent. Syntheri Rocks (35km — 300m limestone gorge over Kaneri River) workable only 6.30-8.30am. Hotel rates at year-low: Old Magazine Camp JLR ₹3-5k, Bison River Resort ₹2.3-3.5k, town hotels ₹900-1.6k. Hubli-Dandeli 75km drive at year-cleanest before monsoon. Push to October for the full rafting-plus-wildlife shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 6, 1, 'skip',
  'SW monsoon onset. 22-30C, 600-800mm rainfall. Tiger Reserve closes for monsoon. Rafting impossible. Skip.',
  NULL,
  'June is when the southwest monsoon hits Dandeli with peak Western Ghats force. Rainfall 600-800mm, Tiger Reserve closes to safaris for monsoon (Karnataka Forest Department standard practice), rafting closed (water too high). Skip.',
  'June in Dandeli is the southwest monsoon''s arrival point on the Western Ghats wet zone. The reserve sits in the Sahyadri rain-belt; annual rainfall over 3,500mm. Rainfall jumps to 600-800mm across 22-24 wet days. Daytime 23-30C feels mild but constant rain and 92 percent humidity strip outdoor activity. The Kali Tiger Reserve (834 sq km, Karnataka''s 5th tiger reserve, declared 2007) closes to public safaris for the monsoon period — Karnataka Forest Department standard practice closes safari operations June through September (sometimes extending into early October) for trail-safety and breeding-season protection. The Kali River rafting cannot operate — water levels become dangerously high, grade II-III rapids of the dry season turn into grade IV-V uncontrollable surges. Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR all suspend rafting operations (some accommodation continues). Syntheri Rocks (35km — 300m limestone gorge over Kaneri River) closed to walking on wet days; the staircase to the viewpoint becomes hazardously slippery. Kavala Caves (40km) closed. Hubli-Dandeli 75km drive at landslide-watch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 7, 1, 'skip',
  'Peak monsoon. 22-28C, 800-1000mm rainfall. Tiger Reserve closed, rafting impossible. Skip.',
  NULL,
  'July is the wettest month at Dandeli. Rainfall 800-1000mm. Tiger Reserve closed by Forest Department, rafting closed (water too high). Standard adventure-and-wildlife trip impossible. Skip.',
  'July in Dandeli is the year''s wettest stretch. Rainfall 800-1000mm across 25-27 wet days, the Western Ghats wet zone at full Sahyadri rain-belt force. Daytime 23-28C, humidity 95 percent. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 834 sq km Western Ghats wet zone — Anshi NP plus Dandeli Wildlife Sanctuary merged 2007) closed to public safaris by Karnataka Forest Department for the monsoon period. The Kali River rafting cannot operate — water levels at dangerously high grade IV-V surges. Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR all suspend rafting operations. Syntheri Rocks (35km), Kavala Caves (40km) closed. Hubli-Dandeli 75km drive at peak landslide-watch — multiple cancellation events through the month. Some accommodation continues operating for monsoon-tolerant travellers but the Dandeli "experience" requires rafting plus wildlife safaris, neither of which is available. Hotel rates at year-low: town hotels ₹900-1.5k, accommodation-only at Bison River Resort ₹2-3k. Crocodile sightings on the Supa Dam reservoir possible from sheltered boat trips on lighter-rain days, but the reservoir-side operators run reduced schedules. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 8, 1, 'skip',
  'Monsoon continues. 22-29C, 500-700mm rainfall. Tiger Reserve closed, rafting closed. Skip.',
  NULL,
  'August holds July''s pattern with marginally easing rainfall. Tiger Reserve still closed by Forest Department, Kali River rafting impossible. Standard trip skip.',
  'August in Dandeli holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 500-700mm across 22-24 wet days at the Western Ghats wet zone elevation. Daytime 23-29C feels mild but constant rain and 92 percent humidity strip outdoor activity. The Kali Tiger Reserve (834 sq km, Karnataka''s 5th tiger reserve declared 2007) closed to public safaris by Karnataka Forest Department through end-September minimum. The Kali River rafting cannot operate — water levels at dangerous grade IV-V flows. Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR continue accommodation operations but rafting suspended. Syntheri Rocks (35km — 300m limestone gorge over Kaneri River, free entry) closed on heavy-rain days; walkable on rare clear afternoons. Kavala Caves (40km) closed for season. Hubli-Dandeli 75km drive landslide-watch eases in the second half. Hotel rates year-low: town hotels ₹900-1.6k, Bison River Resort (accommodation-only) ₹2.2-3.3k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 9, 3, 'wait',
  'Monsoon retreat. 22-30C, 300-400mm rain. Tiger Reserve reopening late month. Rafting reopens October.',
  'September is the recovery month. SW monsoon retreats around Sep 25, Tiger Reserve safaris typically resume Oct 1, rafting reopens with safe Kali River flow Oct 1-15. Late September workable for bird-watching but October is the proper restart.',
  'September is on the way back but Tiger Reserve still closed first three weeks, rafting not back until October, roads still landslide-watch first fortnight. Push to mid-October — same adventure-plus-wildlife aesthetic at materially cleaner conditions.',
  'September in Dandeli is the trickle back from monsoon. Rainfall drops to 300-400mm across 18-20 wet days, mostly the first fortnight. Daytime 23-30C, humidity easing to 85 percent in the second half. The southwest monsoon retreats from the Karnataka Western Ghats around September 25-30 (IMD declares formal withdrawal). The Kali Tiger Reserve (834 sq km, Karnataka''s 5th tiger reserve declared 2007) typically reopens to public safaris October 1 — Karnataka Forest Department''s standard practice resumes after the trail-safety and breeding-season closure. The Kali River rafting (grade II-III rapids on the post-monsoon flow) typically reopens October 1-15 as Supa Dam reservoir release stabilises to safe rafting levels. Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR prepare for the October-March rafting season. Bird-watching at year-greenest — the Western Ghats wet zone hornbill, racket-tailed drongo, Malabar parakeet, paradise flycatcher, frogmouth nightjar all visible. Hubli-Dandeli 75km drive stabilises from mid-month. Hotel rates climb 15-20 percent versus August lows: Old Magazine Camp JLR ₹3.5-5k, Bison River Resort ₹2.5-4k, town hotels ₹1.1-1.9k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 10, 5, 'go',
  'Season opens. 21-31C, 200-300mm spillover. Rafting restarts mid-month. Tiger Reserve safaris reopen.',
  'October is the proper season opener. Late-monsoon residue first 10 days, then full rafting-plus-wildlife mode. Kali River rafting restarts Oct 1-15, Tiger Reserve safaris reopen Oct 1. Hotel rates 25 percent below January.',
  NULL,
  'Dandeli in October is the proper return to coherent. Rainfall drops to 200-300mm with the bulk falling in the first ten days; from October 15 onward Dandeli flips into clean adventure-plus-wildlife mode. Daytime 22-31C, nights 20C, humidity falling from 85 to 75 percent. The Kali River rafting (grade II-III rapids through the Sambrani-Kulgi 10-12km stretch) typically restarts October 1-15 as Supa Dam reservoir release stabilises to safe rafting flow. Operators (Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR) at ₹1,500-2,500 per person, 7am and 2pm trips. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 834 sq km — Anshi NP plus Dandeli Wildlife Sanctuary merged 2007, declared 2007) reopens to public safaris October 1. Jeep safari ₹800-1,500 per person, dawn and afternoon slots, advance booking via Range Forest Office. Wildlife concentration recovering through the month — the Western Ghats wet zone is at year-greenest after the monsoon flush. Syntheri Rocks (35km — 300m limestone gorge over Kaneri River, free entry) returns to walkable conditions. Kavala Caves (40km), Supa Dam reservoir crocodile-boat trips.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 11, 5, 'go',
  'Peak builds. 19-31C, rainfall under 70mm. Karnataka Rajyotsava Nov 1. Rafting at peak flow. Rates climb 20 percent.',
  'November is the proper pivot to peak. Rafting at year-best post-monsoon flow. Tiger Reserve animal concentration building. Karnataka Rajyotsava Nov 1. Hotel rates climb 20 percent.',
  NULL,
  'Dandeli in November is the year''s second-peak month behind January. Rainfall drops under 70mm, daytime 20-31C, nights 18C, humidity dropping below 70 percent. The Kali River rafting (grade II-III rapids through the Sambrani-Kulgi stretch) at year-best post-monsoon flow — the Supa Dam reservoir at high post-monsoon levels feeds clean continuous release. Operators (Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR) at ₹1,500-2,500 per person, 7am and 2pm trips. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 834 sq km — the country''s most concentrated black panther sightings, 3-6 estimated tigers per NTCA 2018 census, plus leopards, gaur, sambar, hornbill, racket-tailed drongo, Malabar parakeet) at full safari operations — wildlife concentration building as the dry season starts. Jeep safari ₹800-1,500 per person, dawn and afternoon, advance booking via Range Forest Office. Syntheri Rocks (35km — 300m limestone gorge over Kaneri River, free entry), Kavala Caves (40km), Supa Dam reservoir crocodile-boat trips all at full operations. Karnataka Rajyotsava (November 1, 1956 state formation) sees cultural programmes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dandeli', 12, 5, 'go',
  'Peak season. 16-32C dry. Christmas-NYE rates 1.8x. Rafting plus Tiger Reserve at full tempo. Lock JLR camps 6 weeks ahead.',
  'December is when Dandeli runs at full capacity. Christmas-NYE rates 1.8x normal. Rafting plus Tiger Reserve safaris at peak. Old Magazine Camp JLR books out 6 weeks ahead.',
  NULL,
  'Dandeli in December is the operational peak for the adventure-plus-wildlife year. Daytime 18-32C, nights 17C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.8x the November baseline: Old Magazine Camp JLR ₹7-10k all-in (the Jungle Lodges & Resorts property is the year-most-booked adventure-camp accommodation — book 6 weeks ahead), Bison River Resort ₹4.5-6.5k, town hotels ₹2-3k. The Kali River rafting at year-cleanest flow — grade II-III rapids through the Sambrani-Kulgi 10-12km stretch. Operators (Bison River Resort, Kali Adventure Camp, Old Magazine Camp JLR) at ₹1,500-2,500 per person, 7am and 2pm trips. The Kali Tiger Reserve (Karnataka''s 5th tiger reserve, 834 sq km Western Ghats wet zone — Anshi NP plus Dandeli Wildlife Sanctuary merged 2007 declared 2007 — the country''s most concentrated black panther sightings documented through the year, 3-6 estimated tigers per NTCA 2018 census) at full safari operations. Jeep safari ₹800-1,500 per person. Wildlife concentration building as dry season deepens — water-source visibility year-cleanest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
