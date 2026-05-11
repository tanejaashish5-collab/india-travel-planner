-- Valparai destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: valparai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 1, 5, 'go',
  'Peak Valparai window. 14-26C at 1193m. 40 hairpins clear, lion-tailed macaque sightings at year-best, NCF tours running.',
  'January is the cleanest window at Valparai. Aliyar-Valparai 40-hairpin road dry, lion-tailed macaque (LTM) sightings frequent on the road and at Iyerpadi-Puthuthottam tea estates. NCF (Nature Conservation Foundation) macaque tours ₹600-1000/person.',
  NULL,
  'Valparai in January is when the Anamalai hill station delivers everything the 40-hairpin drive promises. At 1193m and accessed only via the Aliyar-Valparai road from Pollachi (40 hairpins on NH183, the route is one of the steepest sustained ghats in South India), Valparai is one of TN''s least-touristed hill stations — population around 70,000 with no commercial tourism infrastructure beyond tea estate stays. Daytime 22-26C, nights 14-17C, rainfall under 30mm. Lion-tailed macaque (LTM, Macaca silenus, IUCN endangered, ~3000 globally) sightings are the year''s draw — January concentration at the Iyerpadi, Puthuthottam and Sholayar tea estates is at peak, troops cross the road every 2-4km on the Sholayar-Valparai-Aliyar stretch. The Nature Conservation Foundation (NCF) — running the only formal macaque-watching program — operates research-based tours at ₹600-1,000/person, advance booking 5-7 days at ncf-india.org. Aliyar Reservoir (at the base, 40km away, KSEB-managed) workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 2, 5, 'go',
  'Driest month. 15-27C. LTM sightings at year-best, NCF tours full schedule. Hairpin road dry.',
  'February is the cleanest weather month at Valparai. Rainfall under 20mm, 40-hairpin Aliyar-Valparai road at year-driest, LTM sightings consistent. Birding at peak — 250+ species including Great Hornbill nesting season.',
  NULL,
  'Valparai in February is the technical peak window for the Anamalai cloud forest hill station. Rainfall averages 15-20mm, daytime 23-27C, nights 15-18C. Lion-tailed macaque (LTM, Macaca silenus, IUCN endangered, ~3000 globally) sightings at year-best concentration — troops at Iyerpadi, Puthuthottam and Sholayar tea estate boundaries cross the road every 2-3km on the main stretches. Nature Conservation Foundation (NCF) macaque-watching tours ₹600-1,000/person, advance 5-7 days, running full daily schedule from the Valparai office. Great Hornbill nesting season — the Anamalai-Parambikulam landscape is one of South India''s densest hornbill habitats, females sealed into nest cavities Feb-Apr, the male delivers food through a small slit. Other birds: Malabar Trogon, Nilgiri Wood Pigeon, White-bellied Treepie, Sri Lanka Frogmouth. Gaur sightings frequent on dawn drives along the Sholayar-Valparai road. Sloth Bear, Leopard, Wild Boar sightings less predictable but increasing as water sources concentrate. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) at year-driest underfoot — drivers from Coimbatore reach Valparai in 3.5-4 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 3, 5, 'go',
  'Cool-dry holds. 16-28C. LTM at peak, hornbill nesting visible. Last clean month before pre-monsoon haze.',
  'March extends February''s clean-weather pattern. LTM concentration at peak (waterholes shrinking), Great Hornbill nesting visible at established nest trees. Last clean month before pre-monsoon afternoon haze sets in. Rates 15 percent below January.',
  NULL,
  'Valparai in March is the soft-landing month where wildlife concentration peaks but weather still holds clean. Daytime 24-28C, nights 16-19C, humidity climbing toward 65 percent in the last fortnight, rainfall under 40mm. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) sightings at year-peak — water sources shrinking concentrates the troops at the Iyerpadi, Puthuthottam, Sholayar tea estate boundaries; the NCF (Nature Conservation Foundation) reports March as the highest single-month sighting frequency, with 8-15 troop crossings per researcher day. Great Hornbill nesting at peak visibility — the Anamalai-Parambikulam landscape''s females are still sealed into nest cavities, the male delivers food through a slit at established nest trees (NCF-monitored nests at Iyerpadi). Other birds: Malabar Trogon, Sri Lanka Frogmouth, Nilgiri Wood Pigeon at full concentration. Gaur on dawn drives, Sloth Bear and Leopard sightings climbing. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) at year-clearest before April haze. Aliyar Reservoir (40km, at the base) workable, Monkey Falls (45km, off the climb) at dry-season ribbon.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 4, 4, 'go',
  'Pre-monsoon. 18-30C. Hornbill chicks emerging from nest seals. Wildlife concentration peaks.',
  'April is when Great Hornbill chicks emerge from sealed nest cavities — the year-best window for hornbill watching. LTM and other primate sightings at peak. Pre-monsoon thunderstorms from April 22-28. Hotel rates 25 percent below January.',
  NULL,
  'Valparai in April is the peak wildlife window with the heat-compromise. Daytime 25-30C, nights 18-21C, humidity past 75 percent in the last fortnight. Great Hornbill chicks emerge from sealed nest cavities — the female breaks the mud-and-droppings seal after 80-90 days inside the cavity, both parents now flying multiple food runs daily, the NCF-monitored Iyerpadi nests offer the year-best public hornbill-watching window. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) sightings continue strong at the Iyerpadi, Puthuthottam, Sholayar tea estate boundaries — NCF macaque-watching tours ₹600-1,000/person at full schedule. Gaur, Sloth Bear, Leopard sightings climb as water sources shrink to a few permanent streams. Birds: Malabar Trogon, Sri Lanka Frogmouth, Nilgiri Wood Pigeon, Black-and-orange Flycatcher concentration peaks. The 40-hairpin NH183 Aliyar-Valparai climb workable but pre-monsoon afternoon haze from April 15. Pre-monsoon thunderstorms from April 22-28 bring 50-80mm overnight rains — the road stays dry under typical afternoon storms, full landslide-risk doesn''t start until late May. Aliyar Reservoir, Monkey Falls workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 5, 3, 'wait',
  'Pre-monsoon. 19-30C. First fortnight workable, last 10 days bring SW-monsoon advance. 40-hairpin road landslide-watch starts.',
  'Early May extends April — wildlife at peak, hornbill chicks fledging. Last 10 days bring SW-monsoon advance squalls. The Aliyar-Valparai 40-hairpin road enters landslide-watch from May 22. Push to October if uncertainty matters.',
  'May splits cleanly in two — first fortnight workable (hornbill chicks fledging, LTM sightings strong, NCF tours running), last 10 days bring SW-monsoon advance squalls. Valparai catches some of TN''s heaviest SW rainfall (2500-4000mm annually); the 40-hairpin road enters landslide-watch from May 22.',
  'Valparai in May splits cleanly in two. The first fortnight extends April: daytime 26-30C, nights 19-21C, humidity 75 percent. Great Hornbill chicks fledging from the NCF-monitored Iyerpadi nest trees — both parents and chick visible on flight training. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) sightings hold strong at Iyerpadi, Puthuthottam, Sholayar tea estate boundaries. NCF macaque-watching tours ₹600-1,000/person at full schedule. Sloth Bear and Leopard sightings climb at water-source remnants. By the third week, SW monsoon advance squalls hit the Anamalai western face — Valparai catches the windward shoulder and receives some of TN''s heaviest monsoon rain (2,500-4,000mm annually). The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) becomes landslide-watch country from May 22 — TN PWD clearance schedules unpredictable, afternoon arrivals risk 1-3 hour holds at the climb base or mid-elevation. Monkey Falls (45km off the climb) builds rapidly. Aliyar Reservoir at the base operational. Tea estate accommodation at year-low ahead of monsoon: TANTEA ₹1,400-2,500, Parry Agro ₹2,400-4,000, Briar Tea Bungalow ₹4,000-7,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 6, 1, 'skip',
  'SW monsoon onset. 16-22C, 400-600mm rainfall. Aliyar-Valparai road closes weekly, NCF tours suspend. Skip.',
  NULL,
  'June is when the SW monsoon hits Valparai with full force. 400-600mm rainfall, 40-hairpin Aliyar-Valparai road closes 2-3 days/week on landslides, NCF macaque tours suspend, tea estate access compromised. The Valparai trip cannot happen until October. Skip.',
  'Valparai in June is when the SW monsoon arrives on the Anamalai windward face with peak force. Rainfall 400-600mm at the 1193m elevation — Valparai catches one of TN''s heaviest SW monsoon zones (2,500-4,000mm annual, comparable to Cherrapunji wettest months in scale though across more months). Daytime 18-22C, nights 16-19C feel mild but constant rain and 95 percent humidity strip outdoor activity. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) becomes the year''s most dangerous road segment — TN PWD typically closes the road 2-3 days per week through June for landslide clearance, often without prior notice. Lion-tailed macaque (LTM) sightings continue (the troops live here year-round) but Nature Conservation Foundation tours suspend through the heaviest rain weeks. Tea estate accommodation reduced — TANTEA, Parry Agro, Briar Tea Bungalow continue but advance confirmation essential. Monkey Falls (45km off the climb) and Aliyar Reservoir build dramatically. Hotel rates at year-low: TANTEA ₹1,200-2,200, Parry Agro ₹2,000-3,500, Briar Tea Bungalow ₹3,500-6,000. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 7, 1, 'skip',
  'Peak SW monsoon. 16-22C, 700-1000mm rainfall. Aliyar-Valparai road closures frequent. NCF suspended. Skip.',
  NULL,
  'July is the year''s wettest stretch at Valparai — 700-1000mm rainfall, 40-hairpin Aliyar-Valparai road closures 3-4 days/week, NCF macaque tours suspended, tea estate stays advance-only. The Valparai trip cannot happen until October. Skip.',
  'Valparai in July is the year''s wettest month. Rainfall 700-1,000mm at the 1193m elevation across 27-29 wet days — the Anamalai western face catches the full SW monsoon force, among the heaviest July rainfall in South India. Daytime 18-22C, nights 16-19C with constant rain and 95 percent humidity. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) closes 3-4 days per week under TN PWD landslide-clearance schedules; the route is one of the most landslide-prone in South India during peak monsoon. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) troops remain at the Iyerpadi-Puthuthottam-Sholayar tea estate boundaries but Nature Conservation Foundation macaque-watching tours suspend completely. Great Hornbill juveniles flying with parents but visibility absent under cloud cover. Gaur, Sloth Bear, Leopard remain in habitat but sightings near-zero through rain. Tea estate accommodation: TANTEA ₹1,200-2,200, Parry Agro ₹2,000-3,500, Briar Tea Bungalow ₹3,500-6,000 — but most reduce capacity through the worst rain weeks. Monkey Falls at peak flow, Aliyar Reservoir at peak storage.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 8, 1, 'skip',
  'SW monsoon continues. 16-22C, 500-700mm rainfall. Road closures frequent. NCF still suspended. Skip.',
  NULL,
  'August holds the July pattern — 500-700mm rainfall, road closures 2-3 days/week, NCF macaque tours still suspended. Tea estate stays restricted. The Valparai trip cannot happen until October. Skip.',
  'Valparai in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 500-700mm across 24-27 wet days at the 1193m elevation. Daytime 18-22C, nights 16-19C with 90 percent humidity and consistent overcast. The 40-hairpin NH183 Aliyar-Valparai climb closes 2-3 days per week under TN PWD landslide-clearance schedules. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) troops remain in habitat at the Iyerpadi-Puthuthottam-Sholayar tea estate boundaries but Nature Conservation Foundation (NCF) macaque-watching tours remain suspended through the month. Great Hornbill juveniles fledged but visibility limited under cloud. Tea estate accommodation remains advance-only through the worst rain weeks. TANTEA forest rest house, Parry Agro guesthouse, Briar Tea Bungalow at year-low rates but with reduced capacity. Aliyar Reservoir at near-capacity, Monkey Falls (45km off the climb) at peak flow. The Sholayar power station (TNEB hydro project) continues controlled releases during heavy-rain events. Hotel rates: TANTEA ₹1,200-2,200, Parry Agro ₹2,000-3,500, Briar Tea Bungalow ₹3,500-6,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 9, 2, 'wait',
  'SW monsoon retreats slowly. 16-23C, 250-400mm rainfall easing. Road still landslide-watch first fortnight.',
  'September is the recovery month but late SW monsoon holds the first fortnight. 250-400mm rainfall, 40-hairpin road still landslide-watch through Sep 20, NCF tours resume late month only. October is dramatically cleaner with two extra weeks of patience.',
  'September is on the way back but the SW monsoon holds the first fortnight at Valparai — 250-400mm rainfall, the 40-hairpin Aliyar-Valparai road still landslide-watch through Sep 20, NCF macaque tours resume on a partial schedule late month only. Push to October — same monsoon-green Anamalai aesthetic at materially cleaner road and tour conditions.',
  'Valparai in September is the soft re-opening but with the first fortnight still under SW monsoon influence. Rainfall 250-400mm across 18-22 wet days at the 1193m elevation, most in the first three weeks. Daytime 20-23C, nights 16-18C, humidity dropping toward 85 percent. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) stabilises in the third week — TN PWD closure events drop from 2-3 per week to under 1 per week from Sep 20 onward. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) troops at Iyerpadi-Puthuthottam-Sholayar tea estate boundaries become more visible as rain eases. Nature Conservation Foundation (NCF) macaque-watching tours resume on partial schedule late month — full daily tours don''t restart until October 1. Great Hornbill juveniles and parents flying together at high visibility on clearing afternoons. Tea estate accommodation returns to advance bookings: TANTEA ₹1,400-2,500, Parry Agro ₹2,400-4,000, Briar Tea Bungalow ₹4,000-7,000. Monkey Falls at year-peak flow. Aliyar Reservoir at near-capacity. October is the cleaner call — same Anamalai green at materially better road conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 10, 4, 'go',
  'Season opens. 16-25C, 150-250mm rainfall. NCF tours back at full schedule. Tea estates greenest of year.',
  'October is the proper season opener. SW monsoon retreats fully by mid-month, 40-hairpin road stabilises, NCF macaque tours at full daily schedule. Tea estates at year-greenest after the monsoon flush. Hotel rates 30 percent below January peak.',
  NULL,
  'Valparai in October is when the Anamalai hill station returns to full operations. Daytime 22-25C, nights 16-18C, rainfall 150-250mm mostly the first 10 days as the SW monsoon retreats, humidity dropping toward 75 percent. The tea estates around Iyerpadi, Puthuthottam, Sholayar, Stanmore are at year-greenest after the four-month monsoon flush — the Anamalai sweep is at year-prettiest. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) stabilises fully by Oct 15 — landslide closure events drop to rare. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) sightings strong at the Iyerpadi-Puthuthottam-Sholayar tea estate boundaries. Nature Conservation Foundation (NCF) macaque-watching tours ₹600-1,000/person at full daily schedule from Oct 1. Great Hornbill family groups flying together at high visibility — the post-fledge phase as juveniles learn home-territory boundaries. Gaur sightings on dawn drives, Sloth Bear and Leopard sightings increasing as wildlife disperses from monsoon refuges. NE monsoon brings 1-2 hour evening downpours typical 4-7pm but daytime mostly clear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 11, 5, 'go',
  'High season builds. 15-25C. NE monsoon residual, but tea estates clear, LTM sightings frequent. Hotel rates climb 20 percent.',
  'November is the genuine pivot to Valparai high season. NE monsoon residual under 100mm, mostly first 10 days. Tea estates dry and clear, LTM sightings frequent, NCF tours at full schedule. Hotel rates climb 20 percent as Christmas-week traffic begins booking.',
  NULL,
  'Valparai in November is when the Anamalai hill station turns the corner. Northeast monsoon residual eases to under 100mm across 5-7 wet days, almost all in the first 10 days. Daytime 21-25C, nights 15-18C, humidity dropping under 75 percent. The Iyerpadi, Puthuthottam, Sholayar, Stanmore tea estate sweep is at year-clearest visibility — the post-monsoon green still holding but sightlines now clear past the cloud cover that characterizes June-October. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) sightings at peak NCF-tour visibility — troops cross the road every 2-3km on the Sholayar-Valparai-Iyerpadi stretch. Nature Conservation Foundation (NCF) macaque-watching tours ₹600-1,000/person at full daily schedule, advance 3-5 days. Great Hornbill family groups visible at established feeding trees. Gaur, Sloth Bear, Leopard sightings increasing through the month as wildlife disperses from monsoon refuges. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) at year-cleanest underfoot. Aliyar Reservoir at full operations, Monkey Falls (45km off the climb) at strong post-monsoon flow.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('valparai', 12, 5, 'go',
  'Peak season. 13-25C. Christmas-NY rates 1.7-2x. NCF tours at peak demand. Book 4-6 weeks ahead.',
  'December is the year''s most reliable Valparai window — peak Anamalai weather, full operational tempo. Christmas-NY week (Dec 22-Jan 5) drives rates to 1.7-2x base. Tea estate accommodation books 4-6 weeks ahead through the rate-peak weeks.',
  NULL,
  'Valparai in December is the year''s most coherent window. Daytime 21-25C, nights 13-16C, rainfall under 30mm, humidity 70 percent. Christmas-NY week (December 22 to January 5) is the tight stretch but materially milder than Ooty/Kodaikanal: tea estate accommodation climbs 1.7-2x — Briar Tea Bungalow ₹9,000-15,000 against ₹4,500-8,000 off-peak, Parry Agro guesthouse ₹5,000-8,000 against ₹2,800-4,500 off-peak, TANTEA forest rest house ₹3,000-5,000 against ₹1,500-2,700. Lion-tailed macaque (LTM, IUCN endangered, ~3000 globally) sightings at peak concentration — Nature Conservation Foundation (NCF) macaque-watching tours ₹600-1,000/person book 4-6 weeks ahead through Christmas-NY weeks. The Iyerpadi-Puthuthottam-Sholayar tea estate boundaries see troop crossings every 2-3km on main stretches. Great Hornbill family groups at established feeding trees. Gaur on dawn drives, Sloth Bear and Leopard sightings at year-best concentration. The 40-hairpin NH183 Aliyar-Valparai climb (60km from Pollachi base) at year-driest underfoot but queues from Coimbatore-side traffic build the last week of December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
