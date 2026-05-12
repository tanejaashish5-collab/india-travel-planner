-- Kabini destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kabini | best_months [3,4,5,6,10,11,12] | avoid [8,9]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 1, 4, 'go',
  'Peak luxury-safari season. 14-28C. Boat + jeep safari. Black panther sightings strong.',
  'January is when Kabini runs at its high-season strongest. Daytime 24-28C, nights 14-16C. Jeep safari ₹2,200-2,500/person, boat safari ₹1,500-2,500. Black panther (Saaya) sightings strong. Christmas-NYE tail at premium.',
  NULL,
  'Kabini in January is the version every luxury-safari traveller books first. The Kabini backwaters — the KRS-fed Kabini reservoir (built 1974, the Kabini river dam on Nagarhole''s southern boundary) — is India''s most luxurious wildlife experience, with Kabini River Lodge (JLR — Jungle Lodges & Resorts, the original, opened 1989 on the Kabini foreshore), Orange County Kabini, Evolve Back Kuruba Safari Lodge (renamed from Orange County in 2017), The Bison, and JK Tyre-owned Bison Resort defining the top-end safari accommodation in South India. Daytime 24-28C, nights 14-16C, humidity 60 percent. Kabini is the southern entry to Nagarhole National Park (the Rajiv Gandhi NP); jeep safaris (₹2,200-2,500/person, 6-pax open jeep, 2.5hr loops via the Karapur gate) and boat safaris (₹1,500-2,500/person, 2hr Kabini reservoir loop, the JLR-operated boat fleet is the only public boat operator) at 6.30-9am and 3-6pm batches. Bengal Tiger sighting odds 1-in-22 safaris (climbing toward 1-in-15 by April peak).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 2, 4, 'go',
  'Wildlife visibility climbs. 15-30C. Reservoir levels start dropping. Black panther odds at peak.',
  'February is when Kabini wildlife visibility climbs. Rainfall under 20mm, Kabini reservoir levels start dropping, animals concentrate at the foreshore. Tiger sighting odds 1-in-18. Black panther sightings at peak.',
  NULL,
  'Kabini in February is when the luxury-safari window opens. Rainfall averages 15-20mm, daytime 26-30C, nights 15-17C, humidity 60 percent. The Kabini reservoir levels start dropping from the post-monsoon high — the receding waterline exposes the foreshore where wildlife concentrates to drink. Bengal Tiger sighting odds 1-in-18 safaris. Black Panther — Kabini is documented black panther habitat, the famous Saaya black panther photographed extensively through 2010s-2020s by Shaaz Jung and other wildlife photographers — sighting odds at year-best 1-in-25 safaris. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population, India''s largest single contiguous elephant population) start aggregating at the Kabini foreshore — herds of 20-40 elephants reliable at the morning and evening waterhole visits. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at clean visibility. Jeep safaris (₹2,200-2,500/person at Karapur Nagarhole gate, 6.30-9am and 3-6pm) and Kabini boat safaris (JLR, ₹1,500-2,500/person, 2hr reservoir loop) at peak demand.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 3, 5, 'go',
  'Kabini elephant congregations open. 17-33C. Reservoir foreshore exposed. Tiger 1-in-15.',
  'March is when Kabini elephant congregations start — herds of 30-80+ at the reservoir foreshore. Tiger sighting odds 1-in-15. Black panther odds strong. Rates climb 15 percent versus January.',
  NULL,
  'Kabini in March is when the elephant congregations open. Daytime 27-33C, nights 17-19C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. The Kabini reservoir foreshore exposes further as the dry season progresses, and Asiatic Elephant herds aggregate from across the Nilgiri Biosphere Reserve (800-1,000 strong population) to the receding waterline. March herds of 30-80+ elephants at the morning and evening waterhole sessions become standard — the year-peak super-herds of 200-500+ are still a month away (April-May) but March delivers the strongest opening visuals. Bengal Tiger sighting odds 1-in-15 safaris. Black Panther — the Kabini Saaya documentation continues with strong sightings — odds 1-in-25 safaris. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) pack sightings 1-in-10 safaris, Sloth Bear, Leopard at peak. Jeep safaris (₹2,200-2,500/person at Karapur Nagarhole gate, 6.30-9am and 3-6pm batches) and Kabini boat safaris (JLR, ₹1,500-2,500/person, 2hr reservoir loop — the JLR-operated boat fleet is the only public operator) at year-busiest demand.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 4, 5, 'go',
  'Kabini elephant year-peak begins. 19-35C. Super-herds at reservoir. Tiger 1-in-12.',
  'April is the start of Kabini''s year-peak elephant congregation window — super-herds of 100-300+ on the reservoir foreshore. Tiger sighting odds 1-in-12. Black panther odds peak. Safari at peak demand.',
  NULL,
  'Kabini in April is the start of the year''s most photographed wildlife event — the Kabini elephant super-herd congregations. Daytime 28-35C, nights 19-21C, humidity past 70 percent in the last fortnight, pre-monsoon rainfall 80-130mm in the last 10 days. The Kabini reservoir foreshore is now at year-extreme exposure as water levels reach their pre-monsoon low, and Asiatic Elephant herds aggregate from across the Nilgiri Biosphere Reserve (800-1,000 strong population — the largest single contiguous Asiatic Elephant population in the world) to the receding waterline. April delivers super-herds of 100-300+ elephants at the morning and evening waterhole sessions, with occasional gatherings exceeding 500 documented in peak years. This is the wildlife setpiece that defines Kabini — there is no comparable Asiatic Elephant aggregation visible anywhere else in India. Bengal Tiger sighting odds 1-in-12 safaris (year-best). Black Panther — Kabini Saaya documentation continues — sighting odds 1-in-22. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) pack sightings 1-in-8 safaris.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 5, 5, 'go',
  'Kabini elephant super-herds year-peak. 20-35C. 200-500+ elephant gatherings documented.',
  'May is the absolute Kabini elephant year-peak. Super-herds of 200-500+ on the reservoir foreshore at the year-cleanest visibility. Tiger sighting odds 1-in-12. Safari at year-busiest demand.',
  NULL,
  'Kabini in May is the absolute year-peak for the Kabini elephant congregations — the wildlife setpiece that defines the property. Daytime 29-35C, nights 20-22C, humidity 75 percent, rainfall under 100mm in the first fortnight with SW monsoon advance squalls hitting the last 10 days. The Kabini reservoir foreshore is at year-extreme exposure as water levels reach their lowest, and Asiatic Elephant herds aggregate from across the Nilgiri Biosphere Reserve (800-1,000 strong population, India''s largest single contiguous Asiatic Elephant population) to the receding waterline. May regularly delivers super-herds of 200-500+ elephants at the morning and evening waterhole sessions; the documented year-peak gatherings exceeding 800+ have been photographed in years with extreme reservoir drawdown. This is the wildlife visual that draws international wildlife photographers — Steve Winter, Sandesh Kadur, Shaaz Jung, others — to Kabini specifically. Bengal Tiger sighting odds 1-in-12 safaris (year-best). Black Panther — Kabini''s famous Saaya — sighting odds 1-in-20. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 6, 4, 'go',
  'SW monsoon arrives. 19-27C, 250-400mm rainfall. Elephant herds dispersing. Boat safaris may suspend.',
  'June brings SW monsoon to Kabini. Reservoir filling, elephant herds dispersing. Tiger sighting odds drop to 1-in-30. Boat safaris suspend on heavy-rain days. Operations continue at lower demand.',
  NULL,
  'Kabini in June is when the SW monsoon arrives and the year-peak elephant congregations dissolve. Rainfall 250-400mm at the 700m park elevation, heavier than Bandipur due to closer proximity to the Coorg-Wayanad Western Ghats wet zone. Daytime 23-27C, nights 19-22C, humidity 90 percent. The Kabini reservoir starts filling from upstream KRS Dam releases plus direct monsoon catchment — the foreshore that drew the April-May super-herds disappears under rising water. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) disperse into the deeper forest cover across Nagarhole, Bandipur, Mudumalai, Wayanad with water sources returning everywhere; herd encounters drop to 2-4 per safari. Bengal Tiger sighting odds drop to 1-in-30 safaris. Black Panther sightings ease — odds 1-in-40. Indian Gaur, Sambar, Spotted Deer disperse. Wild Dog (dhole) packs less visible. Jeep safaris (₹2,200-2,500/person at Karapur Nagarhole gate, 6.30-9am and 3-6pm batches) continue at full schedule though afternoon batches occasionally cancel for heavy-rain afternoons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 7, 3, 'wait',
  'SW monsoon. 19-25C, 300-500mm rainfall. Reservoir filling. Sighting odds year-low.',
  'July is the wettest stretch. 300-500mm rainfall, Kabini reservoir filling, elephant herds dispersed. Sighting odds at year-low. Boat safaris suspend most days. Wait for Oct-Nov.',
  'July at Kabini is the wettest stretch — 300-500mm rainfall, the reservoir filling, elephant herds dispersed, sighting odds at year-low (1-in-50). Boat safaris suspend most days. Wait for Oct-Nov.',
  'Kabini in July is the year''s wettest stretch — 300-500mm rainfall across 20-25 wet days at the 700m park elevation, heavier than Bandipur due to Kabini''s closer position to the Coorg-Wayanad Western Ghats wet zone. Daytime 22-25C, nights 19-21C, humidity 90 percent. The Kabini reservoir continues filling rapidly with KRS Dam releases plus monsoon catchment. Bengal Tiger and Asiatic Elephant sighting odds drop to year-low — wildlife disperses into dense forest cover with water sources everywhere across the contiguous Bandipur-Nagarhole-Mudumalai-Wayanad landscape. Indian Gaur, Sambar, Spotted Deer all dispersed. Wild Dog (dhole) packs largely absent from public safari zones. Black Panther sightings absent on most rotations. Jeep safaris (₹2,200-2,500/person at Karapur Nagarhole gate, 6.30-9am and 3-6pm batches) run but some afternoon zones close on heavy-rain days. Kabini boat safaris (JLR-operated, ₹1,500-2,500/person) suspend most days — the reservoir gets choppy and visibility drops. Stays at year-low rates: Kabini River Lodge JLR ₹10-15k, Orange County Kabini ₹14-22k, Evolve Back Kuruba Safari Lodge ₹28-40k, The Bison ₹10-15k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 8, 1, 'skip',
  'SW monsoon heaviest. 19-26C, 350-550mm rainfall. Boat safari ops suspended. Skip.',
  NULL,
  'August at Kabini — SW monsoon heaviest. 350-550mm rainfall, Kabini reservoir at peak flooding, boat safari operations suspended for the month, sighting odds at year-worst. Wait for October.',
  'Kabini in August holds the heaviest monsoon stretch — and the Kabini boat safari operations (the JLR-operated reservoir fleet, the only public boat operator and one of the defining Kabini wildlife experiences) suspend for the month in most years as the reservoir reaches peak flood levels and the foreshore is fully submerged. Rainfall 350-550mm across 22-26 wet days at the 700m elevation. Daytime 22-26C, nights 19-21C with 90 percent humidity. The Kabini reservoir at peak flood — KRS Dam upstream releases plus direct catchment fill the reservoir to maximum (124.8ft on the Kabini gauge), and the foreshore that drew the April-May super-herds is now fully under water. Jeep safaris at Karapur Nagarhole gate (₹2,200-2,500/person, 6.30-9am and 3-6pm batches) continue but reduced schedule on heavy-rain days. Bengal Tiger sighting odds at year-worst (1-in-60). Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) dispersed deep into the interior — herd encounters down to 1-2 per safari. Indian Gaur, Sambar, Spotted Deer all dispersed. Independence Day (Aug 15) brings minimal traffic — even Bengaluru weekenders avoid Kabini in August.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 9, 2, 'wait',
  'SW monsoon retreats slowly. 18-27C, 250-400mm rainfall. Boat ops resume late month.',
  'September — boat safari ops resume late month as reservoir stabilises. Sighting odds easing but October much cleaner. Wait for October.',
  'September at Kabini — SW monsoon retreating but reservoir still at peak levels, boat safari ops resuming only week 3+. Sighting odds easing but October dramatically better for the full Kabini experience.',
  'Kabini in September is the soft re-opening. Rainfall drops to 250-400mm across 16-20 wet days at the 700m park elevation, mostly the first three weeks. Daytime 25-27C, nights 18-20C, humidity dropping toward 80 percent. The Kabini reservoir continues at peak post-monsoon levels through most of the month — the foreshore that drew the April-May super-herds remains submerged. Bengal Tiger sighting odds easing — 1-in-35 safaris (climbing toward 1-in-25 by October). Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) returning to predictable Kabini-fringe patterns but the year-peak super-herds won''t reform until March-May 2027. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs starting to reappear at public safari zones. Black Panther sightings recovering — odds 1-in-40. Jeep safaris at Karapur Nagarhole gate (₹2,200-2,500/person, 6.30-9am and 3-6pm batches) return to full daily schedule from Sep 20-25. Kabini boat safaris (JLR-operated, ₹1,500-2,500/person, 2hr reservoir loop) resume from week three as the reservoir stabilises.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 10, 4, 'go',
  'Season opens. 18-29C. Boat safaris reliable. Sighting odds climbing.',
  'October is the proper season opener at Kabini. Boat safaris on full schedule, jeep ops reliable. Sighting odds climbing 1-in-25. Mysore Dasara tail brings traffic.',
  NULL,
  'Kabini in October is when the luxury-safari destination returns to full operations. Daytime 25-29C, nights 18-20C, humidity dropping toward 75 percent, rainfall 150-250mm — northeast monsoon overspill from Tamil Nadu hits mostly as 1-2 hour evening showers in the first fortnight. The Kabini reservoir at sustained high post-monsoon levels — the year-peak super-herd elephant congregations won''t reform until March-May, but the reservoir-edge ecology returns to clean wildlife visibility. Wildlife sighting odds at climbing seasonal pattern — Bengal Tiger sighting odds 1-in-25 (climbing to 1-in-20 by month-end), Asiatic Elephant herd encounters 3-5 per safari batch (the Nilgiri Biosphere 800-1,000 strong population at predictable patterns), Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at clean post-monsoon visibility. Black Panther — Kabini Saaya documented habitat — sighting odds 1-in-30 recovering. Mysore Dasara (Sep 22 - Oct 1, 2026) tail brings international heritage-tourists who add a Kabini luxury-safari extension after the Mysore palace experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 11, 4, 'go',
  'High season builds. 16-28C, dry. Sighting odds 1-in-20. Black panther sightings climbing.',
  'November is the genuine pivot to Kabini high season. Rainfall under 90mm, dry, full wildlife visibility. Tiger sighting odds 1-in-20. Black panther sightings climbing. Christmas-week books out.',
  NULL,
  'Kabini in November is when the reserve turns the corner. Northeast monsoon overspill eases to under 90mm across 5-7 wet days, almost all in the first 10 days. Daytime 24-28C, nights 16-18C, humidity dropping toward 65 percent. The Kabini reservoir at clean post-monsoon levels — the foreshore starting to emerge as the dry season begins. Bengal Tiger sighting odds 1-in-20 safaris (climbing toward 1-in-15 by February). Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population returning to predictable Kabini-fringe patterns; the year-peak super-herds form March-May. Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at clean visibility. Black Panther — Kabini''s famous Saaya black panther (extensively photographed through 2010s-2020s by Shaaz Jung and other wildlife photographers) — sighting odds climbing toward year-peak. Jeep safaris at Karapur Nagarhole gate (₹2,200-2,500/person, 6.30-9am and 3-6pm batches) and Kabini boat safaris (JLR-operated, ₹1,500-2,500/person, 2hr reservoir loop) at full operational tempo. Karnataka Rajyotsava (November 1) brings a 1-day domestic bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kabini', 12, 4, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE rates 2x. Black panther sightings strong.',
  'December is the year''s busiest Kabini window — peak weather, dry, full operational tempo. Christmas-NYE drives rates to 2x. Black panther sightings at year-peak window. JLR boat safari at year-busiest demand.',
  NULL,
  'Kabini in December is the year''s busiest wildlife window — peak weather, full operational tempo, dry conditions. Daytime 24-27C, nights 14-16C, humidity 60 percent, rainfall under 20mm. The Kabini reservoir foreshore emerging more visibly as the dry season takes hold — the year-peak super-herd elephant congregations of April-May still 4-5 months away but reliable 20-40 elephant gatherings at the morning and evening waterhole sessions. Bengal Tiger sighting odds 1-in-18 safaris (climbing toward 1-in-15 by January-February). Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population (India''s largest single contiguous Asiatic Elephant population). Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole — pack sightings 1-in-12), Sloth Bear, Leopard at full visibility. Black Panther — Kabini Saaya documented habitat — sighting odds 1-in-25 at the year-peak window. The Kabini Saaya black panther (Bagheera, photographed extensively through 2010s-2020s by Shaaz Jung) makes regular December appearances.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
