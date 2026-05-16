-- Nagarhole National Park destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: nagarhole | best_months [10,11,12,1,2,3,4,5] | avoid [6,7,8,9]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 1, 4, 'go',
  'Peak Nagarhole access. 14-28C. Safari ₹600-2500. Tiger density South India highest.',
  'January is the cleanest access window at Nagarhole. Daytime 24-28C, nights 14-16C. Forest Department bus + jeep safari ₹600-2,500/person, 6.30-9am and 3-6pm batches. Tiger density South India highest per latest census.',
  NULL,
  'Nagarhole National Park (Rajiv Gandhi National Park, renamed 1992 after Rajiv Gandhi assassination) in January is the clean access window to one of South India''s most densely-tiger landscapes. The 643 sq km park sits at the Karnataka-Kerala (Wayanad) and Karnataka-Tamil Nadu (Mudumalai) junction within the Nilgiri Biosphere Reserve — the contiguous Bandipur + Nagarhole + Mudumalai + Wayanad landscape holds 200+ tigers in the combined 1,400 sq km core, and Nagarhole specifically carries the highest tiger density in South India per the latest All India Tiger Estimation (2018-2022). The name Nagarhole means "snake river" in Kannada — the Kabini river meanders snake-like through the park''s southern boundary. Daytime 24-28C, nights 14-16C, humidity 60 percent. Karnataka Forest Department safaris run from two gates: Karapur (southern entry, near Hunsur) and Anechowkur/Veeranahosahalli (northern entry, near Hunsur-Kutta), bus (₹600/person, 25-30 seats, 2hr loop) and jeep (₹2,200-2,500/person, 6-pax open jeep, 2.5hr loop) at 6.30-9am and 3-6pm batches; bookings via Jungle Lodges & Resorts Kabini reception or wildlife.karnataka.gov.in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 2, 5, 'go',
  'Wildlife peak opens. 15-30C. Tiger sighting odds 1-in-18. Kabini backwater concentrations begin.',
  'February is when Nagarhole wildlife visibility climbs. Rainfall under 20mm. Tiger sighting odds 1-in-18 safaris. Kabini river starts shrinking, animals concentrate. Safari ₹600-2,500. Black panther sightings possible.',
  NULL,
  'Nagarhole National Park in February is when the wildlife window opens. Rainfall averages 15-20mm, daytime 26-30C, nights 15-17C. Water sources start shrinking across the 643 sq km park, animals concentrate at the Kabini river and seasonal stream pools. Bengal Tiger sighting odds climb to 1-in-18 safaris — Nagarhole holds the highest tiger density in South India per the All India Tiger Estimation. Black Panther — Nagarhole-Kabini is documented black panther habitat (the famous Saaya panther of Kabini, photographed extensively by Shaaz Jung and others through 2010s-2020s, makes intermittent appearances in Nagarhole as well). Asiatic Elephant herds (the Nilgiri Biosphere Reserve 800-1,000 strong population, India''s largest single contiguous elephant population) at peak concentration. Indian Gaur (the 1,500-strong biosphere population), Sambar Deer, Spotted Deer, Wild Dog (dhole — pack sightings 1-in-12 safaris), Sloth Bear, Leopard all visible. Karnataka Forest Department safaris run from Karapur and Anechowkur gates (bus ₹600/person, jeep ₹2,200-2,500/person at 6.30-9am and 3-6pm batches). Bookings via Jungle Lodges Kabini reception or wildlife.karnataka.gov.in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 3, 5, 'go',
  'Peak wildlife. 17-33C. Kabini river shrinking, animals concentrate. Tiger sighting odds 1-in-15.',
  'March is peak Nagarhole wildlife concentration. Kabini river reducing, animals at remnant water. Tiger sighting odds 1-in-15 safaris. Black panther sightings possible at any safari. Rates climb 15 percent versus January.',
  NULL,
  'Nagarhole National Park in March is the peak wildlife-concentration month. Daytime 27-33C, nights 17-19C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. The Kabini river — Nagarhole''s southern boundary, snake-meandering river that gives the park its Kannada name "snake river" — reduces to pools and the deeper channels, concentrating wildlife predictably. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population), Indian Gaur, Sambar, Spotted Deer at the remaining water. Bengal Tiger sighting odds climb to 1-in-15 safaris (Nagarhole carries the highest tiger density in South India per the 2018-2022 census). Wild Dog (dhole) pack sightings 1-in-10 safaris. Sloth Bear and Leopard at peak. Black Panther — Nagarhole-Kabini is documented black panther habitat (the famous Saaya black panther of Kabini, photographed extensively through 2010s-2020s) — intermittent sightings continue. Karnataka Forest Department safaris run from Karapur (south, near Hunsur) and Anechowkur (north, near Veeranahosahalli) gates: bus (₹600/person), jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm batches.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 4, 5, 'go',
  'Peak wildlife. 19-35C. Kabini reservoir-fed pools draw elephant herds. Sighting odds year-best.',
  'April is when Nagarhole tiger sighting odds peak. Kabini river/reservoir pools draw elephant congregations of 50-100+ animals. Pre-monsoon storms last 10 days. Safari at peak demand.',
  NULL,
  'Nagarhole National Park in April is the year''s peak wildlife visibility window. Daytime 28-35C, nights 19-21C, humidity past 70 percent in the last fortnight, pre-monsoon rainfall 80-130mm in the last 10 days. The Kabini river/KRS-fed Kabini reservoir pools at year-extreme low — the entire wildlife population concentrates predictably. Bengal Tiger sighting odds at year-best 1-in-12 safaris. Asiatic Elephant — Nagarhole-Kabini is documented as the site of the world''s largest annual Asiatic Elephant congregations: herds aggregate from across the Nilgiri Biosphere Reserve (800-1,000 strong population) to the Kabini backwaters in April-May, with regular gatherings of 50-100+ elephants and occasional super-herds exceeding 500. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) pack sightings 1-in-8 safaris. Sloth Bear and Leopard at peak. Black Panther — the famous Saaya black panther of Kabini (photographed extensively through 2010s-2020s by Shaaz Jung and others) makes intermittent appearances.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 5, 5, 'go',
  'Peak wildlife. 20-35C. Kabini elephant congregations year-peak. First fortnight strongest.',
  'Early May extends April peak — Kabini elephant congregations year-peak with herds of 50-200+. Last 10 days bring SW monsoon advance. Operations continue through.',
  NULL,
  'Nagarhole National Park in May is when the Kabini elephant congregations hit year-peak. The first fortnight extends April: daytime 29-35C, nights 20-22C, humidity 75 percent. Asiatic Elephant herds aggregate from across the Nilgiri Biosphere Reserve (800-1,000 strong population) to the Kabini backwaters — May regularly delivers super-herds of 200+ elephants on the Kabini reservoir foreshore, and occasional 500+ gatherings have been documented. Karnataka Forest Department safaris from Karapur and Anechowkur gates and the Kabini boat safari (separate booking via JLR Kabini, ₹1,500-2,500/person, 2hr Kabini reservoir loop, 6.30-9am and 3-6pm) at year-busiest. Bengal Tiger sighting odds 1-in-12 safaris (year-best). Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard all at peak. Black Panther — Nagarhole-Kabini documented habitat — intermittent sightings continue. By the third week, southwest monsoon advance squalls hit but Nagarhole sits in the partial rain-shadow of the Western Ghats; rainfall through late-May only 100-180mm — far lighter than Coorg (700-1000mm) or Wayanad (800-1100mm). Safari operations continue through the month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 6, 3, 'wait',
  'SW monsoon arrives. 19-27C, 250-400mm rainfall. Sighting odds drop. Some zones close.',
  'June brings SW monsoon to Nagarhole. 250-400mm rainfall — heavier than Bandipur due to closer proximity to the Western Ghats. Safari operations continue but sighting odds drop sharply. Wait for Oct-Nov.',
  'June at Nagarhole — the SW monsoon arrives with rainfall heavier than Bandipur (Nagarhole sits closer to the Coorg-Wayanad Western Ghats wet zone). 250-400mm rainfall, operations continue but sighting odds drop to 1-in-35. Wait for Oct-Nov.',
  'Nagarhole National Park in June is when the SW monsoon arrives. Rainfall 250-400mm at the 700-1000m park elevation — heavier than Bandipur (150-250mm) due to Nagarhole''s closer proximity to the Coorg-Wayanad Western Ghats wet zone. Daytime 23-27C, nights 19-22C, humidity 90 percent. The 643 sq km park continues operations through the month. Bengal Tiger sighting odds drop to 1-in-35 safaris as wildlife disperses with returning water. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) move from the Kabini backwater concentrations into the deeper forest cover — herd encounters still 2-4 per safari but the year-peak super-herds of April-May dissolve. Indian Gaur, Sambar, Spotted Deer disperse. Wild Dog (dhole) packs less visible. Karnataka Forest Department safaris run from Karapur and Anechowkur gates (bus ₹600/person, jeep ₹2,200-2,500/person) at 6.30-9am and 3-6pm batches at full schedule though afternoon batches occasionally cancel for heavy-rain afternoons. Some boat-safari operations on the Kabini reservoir suspend on heavy-rain days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 7, 2, 'wait',
  'SW monsoon. 19-25C, 300-500mm rainfall. Many zones close. Sighting odds year-low.',
  'July is the wettest stretch at Nagarhole. 300-500mm rainfall (heavier than Bandipur), some safari zones close, sighting odds at year-low. Wait for Oct-Nov.',
  'July is the wettest stretch at Nagarhole — 300-500mm rainfall, heavier than Bandipur due to closer proximity to Coorg-Wayanad wet zone. Some safari zones close, sighting odds at year-low (1-in-50 safaris). Wait for Oct-Nov.',
  'Nagarhole National Park in July is the year''s wettest stretch — 300-500mm rainfall across 20-25 wet days at the 700-1000m park elevation, materially heavier than Bandipur (200-300mm) due to Nagarhole''s closer position to the Coorg-Wayanad Western Ghats wet zone. Daytime 22-25C, nights 19-21C, humidity 90 percent. Bengal Tiger and Asiatic Elephant sighting odds drop to year-low — wildlife disperses into dense forest cover with water sources everywhere across the 643 sq km park. Indian Gaur, Sambar, Spotted Deer all dispersed. Wild Dog (dhole) packs largely absent from public safari zones. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person at Karapur and Anechowkur gates, 6.30-9am and 3-6pm batches) run but some afternoon zones close on heavy-rain days. Kabini boat safaris suspend on heavy-rain days. Stays at year-low rates: Kabini River Lodge JLR ₹10-15k, Orange County Kabini ₹14-22k, Evolve Back Kuruba Safari Lodge ₹28-40k, The Bison ₹10-15k. The NH-212 Mysore-Bavali (KL border) night traffic BAN 9pm-6am (2009 Supreme Court order, animal corridor protection — enforced 365 days/year regardless of monsoon) holds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 8, 2, 'wait',
  'SW monsoon heaviest. 19-26C, 350-550mm rainfall. Many zones close. Skip.',
  NULL,
  'August is when the SW monsoon hits hardest at Nagarhole — 350-550mm rainfall, many safari zones close, sighting odds at year-worst (1-in-60). Wait for October.',
  'Nagarhole National Park in August holds the heaviest monsoon stretch. Rainfall 350-550mm across 22-26 wet days at the 700-1000m park elevation. Daytime 22-26C, nights 19-21C with 90 percent humidity. Many safari zones close under Karnataka Forest Department safety protocols — the southern Kabini-bordering zones restrict, the deeper core loops suspend on heavy-rain days. Bengal Tiger sighting odds at year-worst (1-in-60 safaris). Asiatic Elephant herds (800-1,000 strong Nilgiri Biosphere population) dispersed deep into the contiguous Bandipur-Mudumalai-Wayanad interior. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person at Karapur and Anechowkur gates) operate reduced schedule. Kabini boat safaris suspend most days. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru and Mysore but rain-impacted sightings disappoint. Stays at deep year-low rates: Kabini River Lodge JLR ₹10-14k, Orange County Kabini ₹14-20k, Evolve Back Kuruba Safari Lodge ₹28-40k, The Bison ₹10-15k. The NH-212 Mysore-Bavali night traffic BAN 9pm-6am (2009 Supreme Court order for animal corridor protection) enforced 365 days/year. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 9, 3, 'wait',
  'SW monsoon retreats. 18-27C, 250-400mm rainfall. Sighting odds easing. October cleaner.',
  'September is the recovery month. SW monsoon retreats by week 3, sighting odds improving. October cleaner for full operational tempo.',
  'September is on the way back at Nagarhole. 250-400mm rainfall, sighting odds easing toward seasonal patterns but still well below October-November concentration. Push to October — same green at materially better wildlife visibility.',
  'Nagarhole National Park in September is the soft re-opening. Rainfall drops to 250-400mm across 16-20 wet days at the 700-1000m park elevation, mostly the first three weeks. Daytime 25-27C, nights 18-20C, humidity dropping toward 80 percent. Wildlife sighting odds improving as water sources start consolidating — Bengal Tiger sighting odds 1-in-35 safaris (climbing toward 1-in-25 by October), Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) returning to predictable Kabini-fringe patterns, Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs starting to reappear at public safari zones. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person at Karapur and Anechowkur gates, 6.30-9am and 3-6pm batches) return to full daily schedule from Sep 20-25. Kabini boat safaris resume from week three as the reservoir levels stabilise. Stays at recovering rates: Kabini River Lodge JLR ₹12-17k, Orange County Kabini ₹16-23k, Evolve Back Kuruba Safari Lodge ₹30-44k, The Bison ₹12-18k. The NH-212 night traffic BAN 9pm-6am (2009 Supreme Court order, animal corridor protection) enforced.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 10, 4, 'go',
  'Season opens. 18-29C, 150-250mm rainfall. NE monsoon residual. Sighting odds climbing.',
  'October is the proper season opener at Nagarhole. Sighting odds climbing 1-in-25 to 1-in-20. Mysore Dasara tail brings traffic. Hotel rates 20 percent below January.',
  NULL,
  'Nagarhole National Park in October is when the Project Tiger reserve returns to full operations. Daytime 25-29C, nights 18-20C, humidity dropping toward 75 percent, rainfall 150-250mm — northeast monsoon overspill from Tamil Nadu hits mostly as 1-2 hour evening showers in the first fortnight. Wildlife sighting odds at climbing seasonal pattern — Bengal Tiger sighting odds 1-in-25 (climbing to 1-in-20 by month-end). Asiatic Elephant herd encounters 3-5 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population. Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at clean post-monsoon visibility. Mysore Dasara (Sep 22 - Oct 1, 2026) tail brings international heritage-tourists who add a Nagarhole-Kabini wildlife extension after the Mysore palace experience; Mysore-Kabini (95km, 2hr via Hunsur on SH-88) at peak first-week traffic. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person at Karapur and Anechowkur gates, 6.30-9am and 3-6pm batches) at full schedule. Kabini boat safaris (separate booking via JLR Kabini, ₹1,500-2,500/person, 2hr Kabini reservoir loop) resume.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 11, 5, 'go',
  'High season builds. 16-28C, dry. Sighting odds 1-in-20. Christmas-week books out.',
  'November is the genuine pivot to Nagarhole high season. Rainfall under 90mm, dry, full wildlife visibility. Tiger sighting odds 1-in-20. Black panther sightings climbing.',
  NULL,
  'Nagarhole National Park in November is when the reserve turns the corner. Northeast monsoon overspill eases to under 90mm across 5-7 wet days, almost all in the first 10 days. Daytime 24-28C, nights 16-18C, humidity dropping toward 65 percent. Bengal Tiger sighting odds 1-in-20 safaris (climbing toward 1-in-15 by February). Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population returning to predictable Kabini-fringe patterns. Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at clean post-monsoon visibility. Black Panther — Nagarhole-Kabini documented habitat (the famous Saaya black panther, extensively photographed through 2010s-2020s by Shaaz Jung and others) — sighting odds climbing. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person at Karapur and Anechowkur gates, 6.30-9am and 3-6pm batches) at full operational tempo. Kabini boat safaris on full schedule. Karnataka Rajyotsava (November 1) brings a 1-day domestic bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nagarhole', 12, 4, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE rates 2x. Sighting odds 1-in-18. Black panther.',
  'December is the year''s busiest Nagarhole window — peak weather, dry, full operational tempo. Christmas-NYE drives rates to 2x. Black panther sightings strong.',
  NULL,
  'Nagarhole National Park in December is the year''s busiest wildlife window — peak weather, full operational tempo, dry conditions. Daytime 24-27C, nights 14-16C, humidity 60 percent, rainfall under 20mm. Bengal Tiger sighting odds 1-in-18 safaris (climbing toward 1-in-15 by January-February, the peak concentration window). Nagarhole carries the highest tiger density in South India per the All India Tiger Estimation. Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population (India''s largest single contiguous elephant population) at clean post-monsoon Kabini-fringe distribution; the famous Kabini super-herds peak in April-May but December delivers reliable 20-40 elephant gatherings. Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole — pack sightings 1-in-12), Sloth Bear, Leopard at full visibility. Black Panther — Nagarhole-Kabini is the documented black panther habitat of South India; the famous Saaya black panther (photographed extensively through 2010s-2020s by Shaaz Jung and other wildlife photographers) makes regular appearances.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
