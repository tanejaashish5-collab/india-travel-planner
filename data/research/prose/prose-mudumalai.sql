-- Mudumalai National Park destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: mudumalai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 1, 4, 'go',
  'Peak Mudumalai window. 13-28C. Theppakadu elephant camp feeding 9-11am + 5-7pm. Forest Dept bus safari ₹150-300.',
  'January is the cleanest weather window at Mudumalai. Daytime 24-28C, nights 13-16C. Theppakadu elephant camp feeding 9-11am + 5-7pm. Forest Department bus safari ₹150-300/person. Open year-round, best Feb-May for sightings. Theppakadu Lodge forest accommodation ₹2,500-4,500.',
  NULL,
  'Mudumalai National Park in January is the clean access window to one of South India''s defining wildlife biosphere reserves. The 321 sq km National Park (notified 1940, India''s first wildlife sanctuary, upgraded to Tiger Reserve in 2007) sits at the Tamil Nadu-Karnataka-Kerala tri-junction within the Nilgiri Biosphere Reserve — the densest tiger landscape in India (Wayanad-Mudumalai-Bandipur-Nagarhole contiguous), Bengal Tiger camera-trap-confirmed ~50 individuals at the Mudumalai+Wayanad combined. Daytime 24-28C, nights 13-16C, rainfall under 30mm. Theppakadu Elephant Camp — the historic 1922-established working elephant camp where TN Forest Department-trained elephants are bathed, fed, and worked — runs feeding sessions 9-11am and 5-7pm daily; the morning bath of the 25 elephants in the Moyar River is the highest-quality wildlife-tourism experience in TN, ₹50-100 access at the camp gate. Forest Department bus safari (the only public safari mode at Mudumalai, ₹150-300 per person, 6:30-9am and 3-5pm batches) covers the Bandipur-border zone and the core Masinagudi loop. No private jeep safaris (different from Anamalai/Kabini).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 2, 5, 'go',
  'Peak wildlife window opens. 14-30C. Sighting odds climb. Theppakadu feeding at full schedule.',
  'February is the technical sweet spot at Mudumalai. Rainfall under 25mm, water sources shrinking, wildlife concentration climbing. Tiger sighting odds 1-in-22 safaris. Theppakadu elephant camp at full schedule.',
  NULL,
  'Mudumalai National Park in February is the peak wildlife visibility window opens. Rainfall averages 20-25mm, daytime 25-30C, nights 14-17C. Water sources start shrinking across the 321 sq km National Park, concentrating Asiatic Elephant herds, Indian Gaur, Sambar Deer, Spotted Deer at known waterholes (Moyar River, Mudumalai-Bandipur boundary streams, Masinagudi pondage). Bengal Tiger sighting odds climb to 1-in-22 safaris — the Nilgiri Biosphere Reserve (Mudumalai-Bandipur-Nagarhole-Wayanad contiguous) holds 200+ tigers in the combined landscape. Theppakadu Elephant Camp (1922 working elephant camp, TN Forest Department) feeding sessions 9-11am and 5-7pm at full schedule — the morning Moyar River bath of the 25 camp elephants is the year-best wildlife-tourism setpiece. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) at peak demand — book through the Mudumalai Reception Centre at Theppakadu or online via tnforests.gov.in. Other wildlife: Sloth Bear, Leopard (sighting odds climbing), Wild Dog (dhole, pack-sightings 1-in-15 safaris), Bonnet Macaque, Common Langur.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 3, 5, 'go',
  'Peak wildlife. 16-32C. Water sources shrinking, animals concentrating. Tiger sighting odds 1-in-18 safaris.',
  'March is the peak Mudumalai wildlife window. Water sources at low, animals concentrate visibly at waterholes. Tiger sighting odds climb to 1-in-18 safaris. Theppakadu feeding at full schedule. Rates climb 15 percent versus January.',
  NULL,
  'Mudumalai National Park in March is the peak wildlife-concentration month. Daytime 26-32C, nights 16-19C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. Water sources at year-low across the 321 sq km National Park — the Moyar River reduces to pockets, the Mudumalai-Bandipur boundary streams reduce to remnant pools, Masinagudi pondage holds. Asiatic Elephant herds (the Nilgiri Biosphere Reserve''s largest population, 800-1000 individuals), Indian Gaur (the 1500-strong Nilgiri Biosphere population), Sambar, Spotted Deer concentrate predictably at the remaining water. Bengal Tiger sighting odds climb to 1-in-18 safaris on Forest Department bus rotations (₹150-300 per person, 6:30-9am and 3-5pm batches). Wild Dog (dhole) pack sightings 1-in-12 safaris — the Mudumalai dhole population is one of South India''s densest. Sloth Bear and Leopard sightings climbing. Theppakadu Elephant Camp (1922 working elephant camp) feeding 9-11am and 5-7pm — the Moyar River bathing of the 25 camp elephants at year-photogenic. Birdlife 270+ species: Crested Serpent-Eagle, Indian Pitta, Malabar Whistling Thrush, Grey Junglefowl, Indian Peafowl.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 4, 5, 'go',
  'Peak wildlife continues. 18-34C. Sighting odds at year-best. Pre-monsoon storms last 10 days.',
  'April is when Mudumalai tiger sighting odds peak. Water concentration at year-extreme — elephants and tigers predictable. Pre-monsoon thunderstorms from Apr 22-28 bring temperature relief. Theppakadu at full schedule.',
  NULL,
  'Mudumalai National Park in April is the year''s peak wildlife visibility window. Daytime 28-34C, nights 18-21C, humidity past 70 percent in the last fortnight, pre-monsoon rainfall 60-100mm in the last 10 days. Water sources at year-extreme low — the Moyar River reduces to its few perennial pools, the Mudumalai-Bandipur boundary streams reduce to remnant water-holes; the entire wildlife population concentrates predictably. Bengal Tiger sighting odds at year-best 1-in-15 safaris. Asiatic Elephant herd encounters 5-8 per safari batch — the Nilgiri Biosphere Reserve population (800-1000 elephants) at peak concentration along the Moyar River and the Bandipur boundary. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) pack sightings 1-in-8 safaris. Sloth Bear and Leopard at peak. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) at year-busiest — 90-day booking via Wildlife Warden Ooty or tnforests.gov.in. Theppakadu Elephant Camp (1922 working elephant camp, TN Forest Department) feeding 9-11am and 5-7pm at peak demand — the Moyar River bath of the 25 camp elephants busiest morning.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 5, 5, 'go',
  'Peak wildlife continues. 19-34C. First fortnight peak, last 10 days bring SW-monsoon advance. Theppakadu at full schedule.',
  'Early May extends April peak. Last 10 days bring SW-monsoon advance squalls. Mudumalai sits in the rain-shadow of the Western Ghats so SW monsoon impact is lighter than Valparai/Ooty — operations continue through the month. Theppakadu at full schedule.',
  NULL,
  'Mudumalai National Park in May splits cleanly but lighter than Western Ghats hill stations. The first fortnight extends April: daytime 28-34C, nights 19-22C, humidity 75 percent. Water sources at year-extreme low, wildlife concentrated at the Moyar River pools and boundary waterholes. Bengal Tiger sighting odds 1-in-13 safaris (year-best). Asiatic Elephant herd encounters at peak. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard all at peak. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) at year-busiest. Theppakadu Elephant Camp (1922 working elephant camp) feeding 9-11am and 5-7pm — the Moyar River bath at year-best visibility. By the third week, southwest monsoon advance squalls hit but Mudumalai sits in the rain-shadow of the Western Ghats (the Anamalai and Nilgiri western faces block most of the SW monsoon flow); rainfall through late-May only 80-150mm, far lighter than Valparai (2,500-4,000mm annually) or Ooty (4,000-6,000mm). Operations continue through the month. The Theppakadu-Masinagudi corridor and the Bandipur-Mudumalai road stay open.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 6, 4, 'go',
  'SW monsoon — lighter than Western Ghats. 17-26C, 150-250mm rainfall. Operations continue. Sighting odds ease.',
  'June brings the SW monsoon but Mudumalai''s rain-shadow position keeps rainfall at 150-250mm — far lighter than Valparai (700-1000mm) or Ooty (800-1200mm). Operations continue, sighting odds ease as water returns and wildlife disperses. Theppakadu at full schedule.',
  NULL,
  'Mudumalai National Park in June is when the SW monsoon arrives but Mudumalai''s rain-shadow position (blocked by the Western Ghats Anamalai and Nilgiri faces) keeps rainfall to 150-250mm at the 1140m Theppakadu elevation — materially lighter than Valparai (700-1000mm) or Ooty (800-1200mm). Daytime 21-26C, nights 17-20C, humidity 85 percent. The 321 sq km National Park continues operations through the month. Bengal Tiger sighting odds drop to 1-in-25 safaris as wildlife disperses with returning water. Asiatic Elephant herds (the Nilgiri Biosphere Reserve population, 800-1000 elephants) move into the deeper forest cover but herd encounters still 2-4 per safari. Indian Gaur, Sambar, Spotted Deer disperse. Wild Dog (dhole) packs less visible. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) continues at full schedule though afternoon batches occasionally cancel for heavy-rain afternoons. Theppakadu Elephant Camp (1922 working elephant camp) feeding 9-11am and 5-7pm continues full schedule — the Moyar River bath at higher water levels makes the morning session photogenic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 7, 3, 'wait',
  'SW monsoon continues. 17-25C, 200-300mm rainfall. Some zones close. Sighting odds at year-low. Wait for Oct-Nov.',
  'July is the wettest stretch at Mudumalai but still rain-shadow lighter than Western Ghats. 200-300mm rainfall, some zones close, sighting odds at year-low as wildlife disperses. Wait for October-November when concentration patterns return.',
  'July is the wettest stretch at Mudumalai (200-300mm) but still lighter than Western Ghats hill stations. Some safari zones close on heavy-rain days, sighting odds at year-low (1-in-50 safaris) as wildlife disperses into dense forest cover with water everywhere. Theppakadu camp continues. Wait for October-November.',
  'Mudumalai National Park in July is the year''s wettest stretch but still materially lighter than the Western Ghats hill stations (Ooty/Coonoor/Valparai). Rainfall 200-300mm across 18-22 wet days at the 1140m Theppakadu elevation — Mudumalai sits in the rain-shadow of the Anamalai and Nilgiri western faces. Daytime 21-25C, nights 17-20C, humidity 90 percent. Bengal Tiger and Asiatic Elephant sighting odds drop to year-low — wildlife disperses into dense forest cover with water sources everywhere. Indian Gaur, Sambar, Spotted Deer all dispersed. Wild Dog (dhole) packs largely absent from public safari zones. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) continues but some afternoon zones close on heavy-rain days. Theppakadu Elephant Camp (1922 working elephant camp) feeding 9-11am and 5-7pm continues — the only consistently reliable wildlife-tourism setpiece during the rains. The Moyar River at high flow makes the morning bath spectacle most photogenic. Theppakadu Forest Lodge (₹2,200-4,000/night) and Masinagudi Forest Lodge (₹1,800-3,200) at year-low rates. Masinagudi commercial belt at ₹2,000-6,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 8, 2, 'wait',
  'SW monsoon heaviest period. 17-25C, 250-400mm rainfall. Many zones close. Skip unless Theppakadu camp the goal.',
  NULL,
  'August is when the SW monsoon hits hardest at Mudumalai — 250-400mm rainfall, many safari zones close, sighting odds at year-worst. Theppakadu camp continues but most wildlife tourism suspends. Wait for October.',
  'Mudumalai National Park in August holds the heaviest monsoon stretch. Rainfall 250-400mm across 22-26 wet days at the 1140m Theppakadu elevation — even rain-shadow Mudumalai catches significant August rain. Daytime 21-25C, nights 17-20C with 90 percent humidity. Many safari zones close under TN Forest Department safety protocols — the Bandipur-border zone restricts, the deeper Masinagudi loop suspends batches on heavy-rain days. Bengal Tiger sighting odds at year-worst (1-in-60 safaris). Asiatic Elephant herds (800-1000 strong population) dispersed deep into the Nilgiri Biosphere Reserve interior. Forest Department bus safari (₹150-300 per person) operates reduced schedule. Theppakadu Elephant Camp (1922 working elephant camp) feeding 9-11am and 5-7pm continues at full schedule — the rainy-day Moyar River bath of the 25 camp elephants remains the day''s reliable wildlife experience. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru and Mysore but rain-impacted sightings disappoint. Theppakadu Forest Lodge (₹2,200-4,000/night) and Masinagudi Forest Lodge (₹1,800-3,200) at year-low rates. Masinagudi commercial belt at ₹2,000-6,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 9, 3, 'wait',
  'SW monsoon retreats slowly. 16-26C, 150-250mm rainfall. Sighting odds easing. Wait for October full peak.',
  'September is the recovery month. SW monsoon retreats by week three, sighting odds improving but still below October-November patterns. Theppakadu at full schedule. October is the cleaner call.',
  'September is on the way back at Mudumalai. 150-250mm rainfall, sighting odds easing toward seasonal patterns but still well below October-November concentration. Theppakadu Elephant Camp continues full schedule. Push to October — same green at materially better wildlife visibility.',
  'Mudumalai National Park in September is the soft re-opening. Rainfall drops to 150-250mm across 14-18 wet days at the 1140m Theppakadu elevation, mostly the first three weeks. Daytime 23-26C, nights 16-19C, humidity dropping toward 80 percent. Wildlife sighting odds improving as water sources start consolidating — Bengal Tiger sighting odds 1-in-35 safaris (climbing toward 1-in-25 by October), Asiatic Elephant herds (the Nilgiri Biosphere Reserve population, 800-1000 elephants) returning to predictable boundary patterns, Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs starting to reappear at public safari zones. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) returns to full daily schedule from Sep 20-25. Theppakadu Elephant Camp (1922 working elephant camp, TN Forest Department) feeding 9-11am and 5-7pm at full schedule — the Moyar River bath of the 25 camp elephants at year-best clarity as the river runs at sustained post-monsoon flow. Birdlife 270+ species returning to post-monsoon territories. Theppakadu Forest Lodge (₹2,500-4,500/night) and Masinagudi Forest Lodge (₹2,000-3,500) at light bookings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 10, 4, 'go',
  'Season opens. 15-26C, 150-250mm rainfall. Theppakadu at full schedule. Wildlife returning to patterns.',
  'October is the proper season opener at Mudumalai. All zones reopen, wildlife returning to predictable patterns. Theppakadu camp at full schedule. NE monsoon brings evening showers but daytime mostly clear. Rates 25 percent below December peak.',
  NULL,
  'Mudumalai National Park in October is when the 321 sq km National Park returns to full operations. Daytime 23-26C, nights 15-18C, rainfall 150-250mm split across the SW retreat (first 10 days) and NE monsoon arrival (last 10 days), humidity dropping toward 75 percent. All safari zones reopen under TN Forest Department schedule — the Bandipur-border zone, the deeper Masinagudi loop, the Moyar River corridor all operational. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) at full daily schedule. Bengal Tiger sighting odds returning — 1-in-25 safaris (climbing through Nov-Apr to 1-in-13 peak), Asiatic Elephant herds, Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs all returning to predictable patterns. Sloth Bear and Leopard sightings increasing. Theppakadu Elephant Camp (1922 working elephant camp) feeding 9-11am and 5-7pm at full schedule — the post-monsoon Moyar River bath at year-photogenic flow. Birdlife 270+ species at full territory concentration. NE monsoon brings 1-2 hour evening downpours typical 4-7pm but daytime mostly clear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 11, 5, 'go',
  'High season builds. 14-25C. Wildlife visibility strong. Rates climb 15 percent through month.',
  'November is the genuine pivot to Mudumalai high season. NE monsoon residual under 100mm, wildlife visibility strong, Theppakadu at full schedule. Hotel rates climb 15 percent as Christmas-week traffic begins booking. Strong window.',
  NULL,
  'Mudumalai National Park in November is when the Nilgiri Biosphere wildlife visibility returns to peak patterns. Northeast monsoon residual eases to under 100mm across 5-7 wet days, almost all in the first 10 days. Daytime 21-25C, nights 14-17C, humidity dropping under 70 percent. Water sources start consolidating, wildlife returning to predictable boundary patterns. Bengal Tiger sighting odds climb to 1-in-22 safaris (peak 1-in-13 by March-April). Asiatic Elephant herd encounters frequent across the Mudumalai-Bandipur-Wayanad-Nagarhole landscape — the largest elephant population in India clusters here, 800-1000 just at Mudumalai. Indian Gaur (1500-strong Nilgiri Biosphere population), Sambar, Spotted Deer, Wild Dog (dhole) packs at full concentration. Sloth Bear and Leopard sightings strong. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) at full daily schedule. Theppakadu Elephant Camp (1922 working elephant camp, TN Forest Department, 25 camp elephants) feeding 9-11am and 5-7pm at year-busiest — the morning Moyar River bath the year-best wildlife-tourism setpiece.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mudumalai', 12, 4, 'go',
  'Peak Mudumalai. 13-25C. Christmas-NY rates climb 20 percent. Forest rest houses book 6-8 weeks ahead. Theppakadu busiest.',
  'December is the year''s most reliable Mudumalai window. Wildlife visibility strong, Theppakadu camp at peak. Christmas-NY week (Dec 22-Jan 5) drives rates up 20 percent. Forest rest houses book 6-8 weeks ahead.',
  NULL,
  'Mudumalai National Park in December is the year''s most coherent operational window. Daytime 21-25C, nights 13-16C, rainfall under 30mm, humidity 70 percent. Christmas-NY week (December 22 to January 5) is the tight booking stretch: forest rest houses (Theppakadu Forest Lodge ₹3,000-5,500, Masinagudi Forest Lodge ₹2,500-4,500) book 6-8 weeks ahead through the Wildlife Warden Ooty office — rates hold (TN Forest Department doesn''t price-discriminate seasonally). Masinagudi commercial belt (8km from Theppakadu) climbs 20 percent: ₹4,000-12,000. Bengal Tiger sighting odds 1-in-20 safaris (climbing toward 1-in-13 by March-April). Asiatic Elephant herd encounters 4-6 per safari batch — the Nilgiri Biosphere Reserve population (800-1000 at Mudumalai) at strong winter concentration along the Moyar River corridor and Bandipur boundary. Indian Gaur, Sambar, Spotted Deer, Wild Dog (dhole) packs, Sloth Bear, Leopard at peak concentration. Forest Department bus safari (₹150-300 per person, 6:30-9am and 3-5pm batches) at year-busiest — 60-day booking via tnforests.gov.in sells out 2-3 days after window opens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
