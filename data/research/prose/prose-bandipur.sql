-- Bandipur National Park destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: bandipur | best_months [10,11,12,1,2,3,4,5] | avoid [6,7,8,9]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 1, 4, 'go',
  'Peak Bandipur access. 14-28C. Government safari ₹600-2500. Nilgiri Biosphere clear.',
  'January is the cleanest access window at Bandipur. Daytime 24-28C, nights 14-16C. Forest Department bus + jeep safari ₹600-2,500/person, 6.30-9am and 3-6pm batches. Tiger sighting odds climbing toward Feb-May peak.',
  NULL,
  'Bandipur National Park in January is the clean access window to South India''s tri-junction tiger landscape — Bandipur sits at the meeting of Karnataka-Tamil Nadu-Kerala within the Nilgiri Biosphere Reserve (Mudumalai TN + Wayanad KL + Nagarhole + Bandipur contiguous, holding 200+ tigers in the combined 1,400 sq km core). The 874 sq km Project Tiger reserve (declared 1973, one of India''s first 9) was originally Venugopala Wildlife Park before the Tiger Project upgrade. Daytime 24-28C, nights 14-16C, humidity 60 percent. Karnataka Forest Department safaris run as bus (₹600/person, 25-30 seats, 2hr loop) and jeep (₹2,200-2,500/person, 6-pax open jeep, 2.5hr loop) at 6.30-9am and 3-6pm batches; bookings via Bandipur Safari Lodge reception or wildlife.karnataka.gov.in. Private jeep safaris not permitted — different model from Kabini/Nagarhole. Tiger sighting odds 1-in-25 safaris (climbing toward 1-in-15 by April peak). Asiatic Elephant herd encounters 3-5 per safari batch (the Nilgiri Biosphere 800-1,000 strong population), Indian Gaur, Sambar Deer, Spotted Deer reliable. Sloth Bear and Wild Dog (dhole) sightings climbing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 2, 5, 'go',
  'Wildlife peak opens. 15-30C. Tiger sighting odds 1-in-20. Water concentration begins.',
  'February is when Bandipur wildlife visibility climbs. Rainfall under 20mm, water sources start shrinking, animals concentrate. Tiger sighting odds 1-in-20 safaris. Asiatic Elephant herd encounters at peak. Safari ₹600-2,500.',
  NULL,
  'Bandipur National Park in February is when the wildlife window opens. Rainfall averages 15-20mm, daytime 26-30C, nights 15-17C. Water sources start shrinking across the 874 sq km Project Tiger reserve, concentrating Asiatic Elephant herds, Indian Gaur, Sambar Deer, Spotted Deer at known waterholes. Bengal Tiger sighting odds climb to 1-in-20 safaris — the Nilgiri Biosphere Reserve (Bandipur + Mudumalai + Nagarhole + Wayanad contiguous landscape) holds 200+ tigers in the combined 1,400 sq km core. Karnataka Forest Department safaris run as bus (₹600/person, 25-30 seats) and jeep (₹2,200-2,500/person, 6-pax) at 6.30-9am and 3-6pm batches — bookings via Bandipur Safari Lodge reception or wildlife.karnataka.gov.in. Tiger sighting odds 1-in-20. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population, India''s largest single contiguous elephant population) at peak concentration. Other wildlife: Sloth Bear (sighting odds climbing), Leopard, Wild Dog (dhole — pack sightings 1-in-12 safaris), Bonnet Macaque, Common Langur. Birdlife 200+ species: Crested Hawk Eagle, Indian Pitta, Malabar Whistling Thrush, Grey Junglefowl, Indian Peafowl.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 3, 5, 'go',
  'Peak wildlife window. 17-33C. Water shrinking. Tiger sighting odds 1-in-15.',
  'March is peak Bandipur wildlife concentration. Water sources at low, animals concentrate visibly at waterholes. Tiger sighting odds 1-in-15 safaris. Rates climb 15 percent versus January.',
  NULL,
  'Bandipur National Park in March is the peak wildlife-concentration month. Daytime 27-33C, nights 17-19C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. Water sources at year-low across the 874 sq km reserve — the seasonal streams reduce to remnant pools, the perennial Moyar River (forming the Bandipur-Mudumalai boundary with Tamil Nadu) reduces to pockets. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population), Indian Gaur (the 1,500-strong biosphere population), Sambar, Spotted Deer concentrate predictably at the remaining water. Bengal Tiger sighting odds climb to 1-in-15 safaris. Wild Dog (dhole) pack sightings 1-in-10 safaris — Bandipur-Mudumalai dhole population is one of South India''s densest. Sloth Bear and Leopard sightings climbing. Karnataka Forest Department safaris run as bus (₹600/person) and jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm — bookings 30-day advance via Bandipur Safari Lodge reception or wildlife.karnataka.gov.in. Private jeep safaris not permitted at Bandipur — different from Kabini/Nagarhole. Holi long weekend (variable mid-March, 2026) brings 3-day domestic bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 4, 5, 'go',
  'Peak wildlife. 20-35C. Sighting odds at year-best. Pre-monsoon storms last 10 days.',
  'April is when Bandipur tiger sighting odds peak. Water concentration at year-extreme — elephants, tigers, dhole packs predictable. Pre-monsoon thunderstorms last 10 days bring temperature relief. Safari at peak demand.',
  NULL,
  'Bandipur National Park in April is the year''s peak wildlife visibility window. Daytime 29-35C, nights 20-22C, humidity past 70 percent in the last fortnight, pre-monsoon rainfall 80-130mm in the last 10 days. Water sources at year-extreme low — the Moyar River reduces to its perennial pools, the Mudumalai-boundary streams to waterholes; the entire wildlife population concentrates predictably. Bengal Tiger sighting odds at year-best 1-in-12 safaris. Asiatic Elephant herd encounters 6-9 per safari batch — the Nilgiri Biosphere Reserve population (800-1,000 elephants) at peak concentration along the Moyar River and Bandipur-Nagarhole boundary. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) pack sightings 1-in-8 safaris. Sloth Bear and Leopard at peak. Karnataka Forest Department safaris run as bus (₹600/person, 25-30 seats) and jeep (₹2,200-2,500/person, 6-pax) at 6.30-9am and 3-6pm batches at year-busiest — 60-90 day advance booking essential via Bandipur Safari Lodge reception or wildlife.karnataka.gov.in. Private jeep safaris not permitted.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 5, 5, 'go',
  'Peak wildlife. 21-35C. First fortnight peak, last 10 days bring SW monsoon advance.',
  'Early May extends April peak. Last 10 days bring SW monsoon advance squalls. Bandipur partial rain-shadow keeps operations through. Tiger sighting odds 1-in-12. Safari at peak demand.',
  NULL,
  'Bandipur National Park in May splits cleanly but the rain-shadow position keeps operations running. The first fortnight extends April: daytime 29-35C, nights 21-23C, humidity 75 percent. Water sources at year-extreme low, wildlife concentrated at the Moyar River pools and boundary waterholes. Bengal Tiger sighting odds 1-in-12 safaris (year-best). Asiatic Elephant herd encounters at peak — herds of 10-15 elephants at the Moyar waterholes common. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard all at peak. Karnataka Forest Department safaris run as bus (₹600/person) and jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm batches at year-busiest. By the third week, southwest monsoon advance squalls hit but Bandipur sits in the partial rain-shadow of the Western Ghats (the Anamalai and Nilgiri western faces block most of the SW monsoon flow); rainfall through late-May only 100-180mm — far lighter than Coorg (700-1000mm) or Wayanad (800-1100mm). Safari operations continue through the month though afternoon batches occasionally cancel on storm afternoons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 6, 3, 'wait',
  'SW monsoon arrives. 19-27C, 150-250mm rainfall. Rain-shadow keeps lighter than Western Ghats. Sighting odds drop.',
  'June brings SW monsoon to Bandipur but the rain-shadow position keeps rainfall lighter than Western Ghats. 150-250mm rainfall. Safari operations continue. Sighting odds drop as water returns and wildlife disperses.',
  'June at Bandipur — the SW monsoon arrives but the rain-shadow position keeps rainfall to 150-250mm (versus 700-1000mm at Coorg). Operations continue but sighting odds drop sharply to 1-in-30 safaris as wildlife disperses with returning water. Wait for Oct-Nov.',
  'Bandipur National Park in June is when the SW monsoon arrives but Bandipur''s rain-shadow position (blocked by the Western Ghats Anamalai and Nilgiri western faces) keeps rainfall to 150-250mm at the 700-1000m park elevation — materially lighter than Coorg (700-1000mm) or Wayanad (800-1100mm) just 50km west. Daytime 23-27C, nights 19-22C, humidity 85 percent. The 874 sq km Project Tiger reserve continues operations through the month. Bengal Tiger sighting odds drop to 1-in-30 safaris as wildlife disperses with returning water. Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) move into the deeper forest cover but herd encounters still 2-4 per safari. Indian Gaur, Sambar, Spotted Deer disperse. Wild Dog (dhole) packs less visible. Karnataka Forest Department safaris run as bus (₹600/person) and jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm batches at full schedule though afternoon batches occasionally cancel for heavy-rain afternoons. Stays at year-low rates: Bandipur Safari Lodge JLR ₹6-9k, Country Club Bandipur ₹4-6k, Serai Bandipur ₹12-17k, Bandipur Forest Lodge ₹2,500-4,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 7, 3, 'wait',
  'SW monsoon continues. 19-26C, 200-300mm rainfall. Some zones close. Sighting odds at year-low.',
  'July is the wettest stretch at Bandipur but still lighter than Western Ghats. 200-300mm rainfall, some zones close. Sighting odds at year-low as wildlife disperses. Wait for Oct-Nov.',
  'July is the wettest stretch at Bandipur (200-300mm) but still lighter than Western Ghats hill stations (Coorg/Wayanad). Some safari zones close on heavy-rain days, sighting odds at year-low (1-in-50 safaris) as wildlife disperses into dense forest cover with water everywhere. Wait for Oct-Nov.',
  'Bandipur National Park in July is the year''s wettest stretch but still materially lighter than Western Ghats hill stations (Coorg/Wayanad). Rainfall 200-300mm across 18-22 wet days at the 700-1000m park elevation — Bandipur sits in the partial rain-shadow of the Anamalai and Nilgiri western faces. Daytime 23-26C, nights 19-22C, humidity 90 percent. Bengal Tiger and Asiatic Elephant sighting odds drop to year-low — wildlife disperses into dense forest cover with water sources everywhere. Indian Gaur, Sambar, Spotted Deer all dispersed. Wild Dog (dhole) packs largely absent from public safari zones. Karnataka Forest Department safaris run as bus (₹600/person) and jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm batches but some afternoon zones close on heavy-rain days. Stays at year-low rates: Bandipur Safari Lodge JLR ₹5-8k, Country Club Bandipur ₹3-5k, Serai Bandipur ₹10-15k, Bandipur Forest Lodge ₹2,000-3,500. The Mysore-Mangalore NH-275 night traffic BAN 9pm-6am (2009 Supreme Court order, animal corridor protection — enforced 365 days/year regardless of monsoon) holds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 8, 2, 'wait',
  'SW monsoon heaviest. 19-26C, 250-400mm rainfall. Many zones close. Skip.',
  NULL,
  'August is when the SW monsoon hits hardest at Bandipur — 250-400mm rainfall, many safari zones close, sighting odds at year-worst (1-in-60). Wait for October.',
  'Bandipur National Park in August holds the heaviest monsoon stretch. Rainfall 250-400mm across 22-26 wet days at the 700-1000m park elevation — even rain-shadow Bandipur catches significant August rain. Daytime 23-26C, nights 19-22C with 90 percent humidity. Many safari zones close under Karnataka Forest Department safety protocols — the Bandipur-Mudumalai boundary zone restricts, the deeper core loops suspend on heavy-rain days. Bengal Tiger sighting odds at year-worst (1-in-60 safaris). Asiatic Elephant herds (800-1,000 strong Nilgiri Biosphere population) dispersed deep into the contiguous Mudumalai-Nagarhole-Wayanad interior. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person) operate reduced schedule. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru and Mysore but rain-impacted sightings disappoint. Stays at year-low rates: Bandipur Safari Lodge JLR ₹5-8k, Country Club Bandipur ₹3-5k, Serai Bandipur ₹10-15k, Bandipur Forest Lodge ₹2,000-3,500. The Mysore-Mangalore NH-275 night traffic BAN (2009 Supreme Court order for animal corridor protection) enforced 365 days/year.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 9, 3, 'wait',
  'SW monsoon retreats. 18-27C, 150-250mm rainfall. Sighting odds easing. Wait for October full peak.',
  'September is the recovery month. SW monsoon retreats by week 3, sighting odds improving. October cleaner. Wait for October full operational tempo.',
  'September is on the way back at Bandipur. 150-250mm rainfall, sighting odds easing toward seasonal patterns but still well below October-November concentration. Push to October — same green at materially better wildlife visibility.',
  'Bandipur National Park in September is the soft re-opening. Rainfall drops to 150-250mm across 14-18 wet days at the 700-1000m park elevation, mostly the first three weeks. Daytime 25-27C, nights 18-20C, humidity dropping toward 80 percent. Wildlife sighting odds improving as water sources start consolidating — Bengal Tiger sighting odds 1-in-35 safaris (climbing toward 1-in-25 by October), Asiatic Elephant herds (the Nilgiri Biosphere 800-1,000 strong population) returning to predictable boundary patterns, Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs starting to reappear at public safari zones. Karnataka Forest Department safaris run as bus (₹600/person) and jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm batches at full daily schedule from Sep 20-25. Stays at recovering rates: Bandipur Safari Lodge JLR ₹6-9k, Country Club Bandipur ₹4-6k, Serai Bandipur ₹11-16k, Bandipur Forest Lodge ₹2,500-4,500. The Mysore-Mangalore NH-275 night traffic BAN 9pm-6am (2009 Supreme Court order, animal corridor protection) enforced.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 10, 4, 'go',
  'Season opens. 18-29C, 130-200mm rainfall. NE monsoon residual. Sighting odds climbing.',
  'October is the proper season opener at Bandipur. Wildlife visibility returns to seasonal patterns, sighting odds climbing from 1-in-25 to 1-in-20 by month-end. Mysore Dasara tail brings traffic. Hotel rates 20 percent below January.',
  NULL,
  'Bandipur National Park in October is when the Project Tiger reserve returns to full operations. Daytime 25-29C, nights 18-20C, humidity dropping toward 75 percent, rainfall 130-200mm — northeast monsoon overspill hitting mostly as 1-2 hour evening showers in the first fortnight. Wildlife sighting odds at climbing seasonal pattern — Bengal Tiger sighting odds 1-in-25 (climbing to 1-in-20 by month-end), Asiatic Elephant herd encounters 3-5 per safari batch, Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole) packs at clean post-monsoon visibility. Mysore Dasara (Sep 22 - Oct 1, 2026) tail brings international heritage-tourists who add a Bandipur wildlife day-trip after the Mysore palace experience; Mysore-Bandipur (75km, 1.5hr on NH-275) at peak first-week traffic. Karnataka Forest Department safaris run as bus (₹600/person) and jeep (₹2,200-2,500/person) at 6.30-9am and 3-6pm batches at full schedule. Stays: Bandipur Safari Lodge JLR ₹7-10k, Country Club Bandipur ₹4-6k, Serai Bandipur ₹13-18k, Bandipur Forest Lodge ₹2,800-4,800. The Mysore-Mangalore NH-275 night traffic BAN 9pm-6am (2009 Supreme Court order for animal corridor protection) enforced.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 11, 4, 'go',
  'High season builds. 16-28C, dry. Sighting odds 1-in-20. NE monsoon residual easing.',
  'November is the genuine pivot to Bandipur high season. Rainfall under 80mm, dry, full wildlife visibility. Tiger sighting odds 1-in-20. Hotel rates climb 15-20 percent.',
  NULL,
  'Bandipur National Park in November is when the reserve turns the corner. Northeast monsoon overspill eases to under 80mm across 5-7 wet days, almost all in the first 10 days. Daytime 24-28C, nights 16-18C, humidity dropping toward 65 percent. Bengal Tiger sighting odds 1-in-20 safaris (climbing toward 1-in-15 by February). Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population returning to predictable patterns. Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at clean post-monsoon visibility. Karnataka Forest Department safaris run as bus (₹600/person, 25-30 seats) and jeep (₹2,200-2,500/person, 6-pax open jeep) at 6.30-9am and 3-6pm batches at full operational tempo. Karnataka Rajyotsava (November 1) brings a 1-day domestic bump. Stays: Bandipur Safari Lodge JLR ₹8-12k, Country Club Bandipur ₹5-7k, Serai Bandipur ₹15-21k, Bandipur Forest Lodge ₹3,200-5,200. Hotel rates climb 15-20 percent across the month as Christmas-week families begin booking. The Mysore-Mangalore NH-275 night traffic BAN 9pm-6am (2009 Supreme Court order for animal corridor protection) enforced.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bandipur', 12, 4, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE rates 2x. Sighting odds 1-in-18.',
  'December is the year''s busiest Bandipur window — peak weather, dry, full operational tempo. Christmas-NYE drives rates to 2x. Sighting odds climbing toward 1-in-15 by Jan-Feb peak.',
  NULL,
  'Bandipur National Park in December is the year''s busiest wildlife window — peak weather, full operational tempo, dry conditions. Daytime 24-27C, nights 14-16C, humidity 60 percent, rainfall under 20mm. Bengal Tiger sighting odds 1-in-18 safaris (climbing toward 1-in-15 by January-February). Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve 800-1,000 strong population (India''s largest single contiguous elephant population) at clean post-monsoon distribution. Indian Gaur, Sambar Deer, Spotted Deer, Wild Dog (dhole — pack sightings 1-in-12), Sloth Bear, Leopard at full visibility. Karnataka Forest Department safaris (bus ₹600/person, jeep ₹2,200-2,500/person at 6.30-9am and 3-6pm batches) at year-busiest demand — 60-90 day advance booking essential via Bandipur Safari Lodge reception or wildlife.karnataka.gov.in. Private jeep safaris not permitted at Bandipur — different from Kabini/Nagarhole. Christmas-NYE week (Dec 22-Jan 5): Bandipur Safari Lodge JLR ₹14-20k (was ₹8-12k off-peak), Country Club Bandipur ₹9-13k (was ₹5-7k), Serai Bandipur ₹25-35k (was ₹15-21k), Bandipur Forest Lodge ₹5-8k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
