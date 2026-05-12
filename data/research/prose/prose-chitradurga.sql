-- Chitradurga destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: chitradurga | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 1, 5, 'go',
  'Peak fort-trek window. 16-29C, dry. Seven concentric walls and the Obavva legend at year-cleanest.',
  'January is the strongest stretch for Chitradurga. Daytime 27-29C, nights 16-17C, humidity 50 percent. The fort''s seven concentric walls + 19 gateways + 38 entry points + 1,500-acre footprint walk cleanly. Onake Obavva monument, Hidimbeshwara cave, monolithic pillar all at year-best traction.',
  NULL,
  'Chitradurga in January is the proper fort-trek stretch. Daytime 27-29C, nights 16-17C, humidity 50 percent, rainfall under 10mm. The Chitradurga Fort (Chalukyas/Rashtrakutas, expanded by Nayaka chieftains 1500-1779) — seven concentric walls, 19 gateways, 38 secondary entries, 35 secret passages, 1,500-acre footprint that withstood every invader until Hyder Ali''s 1779 siege — is the largest hill fort in South India still walkable. Open 9am-5:30pm, ASI ₹40. Allow 4-5 hours. The Obavva Memorial — Obavva, wife of a Nayaka guard, in 1779 single-handedly killed multiple Hyder Ali soldiers infiltrating through a secret rock-cleft using only an onake (rice-pestle), buying the defenders critical reaction time before being killed; the cleft (Onake Obavvana Kindi) is preserved on the third-wall perimeter. The 18-meter monolithic granite pillar inside the third enclosure. Hidimbeshwara cave (Mahabharata Bhima-Hidimba legend, still active). Sampige Siddeshwara Temple. The fort''s rainwater-harvesting tanks (Tippe Donee, Akka-Tangi) hold winter water clean. Hotels: KSTDC Mayura Naagavi ₹1,500-2,500, Aishwarya Fort ₹2,000-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 2, 5, 'go',
  'Driest month. 18-32C. Fort-photography year-best granite-and-sky contrast. Obavva cleft walks cleanest.',
  'February holds the technical peak with rainfall under 5mm. The seven-wall granite-and-sky photography at year-best. Obavva cleft (Onake Obavvana Kindi) and the monolithic pillar walks at year-cleanest. Bahmani-circuit nearby (Chitradurga sits on the Bengaluru-Hospet axis).',
  NULL,
  'February in Chitradurga is the year''s cleanest photography window for the granite-hill fort. Rainfall under 5mm, daytime 30-32C, nights 18-19C, humidity 45 percent. The seven concentric walls across the granite-boulder hill at year-cleanest light — Chalukya-Rashtrakuta-Nayaka construction, walls 6-8m high, built using local granite with lime-jaggery binder. The fort ascends roughly 250m elevation from base to top — full circuit 4-5 hours, allow water and a hat even in February. The Obavva cleft (Onake Obavvana Kindi — where Obavva killed Hyder Ali''s infiltrators with a rice-pestle in 1779) at peak photographic accessibility — the narrow vertical fissure visible from the third-wall perimeter. The Obavva Memorial-pestle at the visitor centre. The 18-meter monolithic granite pillar inside the third enclosure. Hidimbeshwara cave (Mahabharata Bhima-Hidimba legend, still active) at year-best access — interior cool through afternoon. Sampige Siddeshwara Temple. The fort-top rainwater-harvesting tanks (Tippe Donee, Akka-Tangi) hold clean winter water. Hotels at peak: KSTDC Mayura Naagavi ₹1,800-3k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 3, 4, 'go',
  'Last cool month. 20-35C. Fort climb compress past 10am. Granite radiates by noon. Rates ease 25 percent.',
  'March extends February''s window. Heat builds late month. The 1,500-acre fort climb (granite re-radiates by noon) compresses to 6:30-10am and 4-6pm. Hotel rates ease 25 percent.',
  NULL,
  'March in Chitradurga is the soft-landing month before the heat dome opens. Daytime 33-35C, nights 20-22C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The 1,500-acre granite-boulder fort layout — the seven walls climbing 250m elevation, the boulder-and-cleft Obavva approach, the monolithic pillar inside the third enclosure, Hidimbeshwara cave at the upper reaches — involves significant open-air walking on exposed granite. The granite re-radiates from late morning; surface temperatures reach 40-42C by noon. Walks compress to 6:30-10am and 4-6pm. The Obavva cleft (Onake Obavvana Kindi) approach at 7-9am cleanest light. The monolithic pillar walk early. Hidimbeshwara cave interior holds cool (24-26C through the day, even when outside is 35C) — functions as mid-trip refuge. Sampige Siddeshwara Temple cool interior. The fort-top rainwater-harvesting tanks start to draw down. Hotels ease 25 percent: KSTDC Mayura Naagavi ₹1,200-2,000, Aishwarya Fort ₹1,800-3k, Annapoorneshwari ₹1,500-2,500. Chitradurga sits on the Bengaluru-Hospet highway (NH-48, 200km north of Bengaluru, 140km south of Hospet) — last clean-value window before April-June.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 4, 1, 'skip',
  'Heat dome opens. 23-40C. Granite boulder climb 48C surface. Fort closed by physics mid-day. Skip.',
  NULL,
  'April pushes Chitradurga into the strict-skip stretch. The Northern Karnataka plateau hits 38-40C; granite boulder fort surface 48-50C. The 1,500-acre climb is heat-stroke territory 10am-5pm. Push to October.',
  'April in Chitradurga is the start of the strict-skip stretch. Daytime 38-40C, nights 23-25C, humidity 35 percent, rainfall under 10mm — Northern Karnataka plateau (Bayaluseeme rain-shadow) at peak heat. The 1,500-acre granite-boulder fort layout becomes unworkable: the seven walls climbing 250m elevation across exposed granite, the boulder-and-cleft Obavva approach, the monolithic pillar walk, the cave-temple approaches — stone-surface temperatures reach 48-50C by 1pm. There is no continuous shade on the fort climb; the boulders re-radiate stored heat through the afternoon. Hidimbeshwara cave interior remains cool (still 26-28C) but the approach defeats the day. Sampige Siddeshwara Temple cool. The Obavva cleft (Onake Obavvana Kindi) inaccessible 10am-5pm. The pre-dawn 5:30-8am window is the only workable slot. Hotels collapse to year-low: KSTDC Mayura Naagavi ₹1,000-1,800, Aishwarya Fort ₹1,500-2,500, Annapoorneshwari ₹1,200-2,000. Push to October — the fort climb demands cool weather, and there is no version of the April trip that does justice to the seven-wall layout.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 5, 1, 'skip',
  'Heat peak. 24-42C. Granite 50C plus. Pre-monsoon dust. Fort closed. Skip strict.',
  NULL,
  'May is harshest Chitradurga month. Daytime 40-42C, granite 50-52C. Pre-monsoon dust knocks visibility. Hotel occupancy under 25 percent. Push to October.',
  'May in Chitradurga is the heat dome at peak intensity. Daytime 40-42C, nights 24-26C, humidity 35 percent, rainfall under 30mm. The Bayaluseeme plateau records its annual heat peak in the third and fourth week — Chitradurga (610m elevation) sits slightly cooler than Hampi or Bijapur (Krishna basin 450m) but the granite-boulder fort still hits 50-52C surface heat by 1pm. The 1,500-acre fort closed by physics. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand across the open granite and knocking visibility on the seven-wall photography routes. Hidimbeshwara cave and Sampige Siddeshwara Temple interiors hold cool refuge. The Obavva cleft and monolithic pillar inaccessible 9am-6pm. Hotels at year-low: KSTDC Mayura Naagavi ₹800-1,500, Aishwarya Fort ₹1,200-2,000, Annapoorneshwari ₹1,000-1,800. Hospet (140km north) and Hampi similarly heat-locked. Bengaluru (200km south) cooler at 920m elevation. Skip Chitradurga. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 6, 2, 'wait',
  'SW monsoon light. 23-34C, 70-100mm rain. Heat eases. Walks viable AM/PM. Push to Oct.',
  NULL,
  'June brings 5-6C ease as SW monsoon spillover reaches Chitradurga (70-100mm across 7-9 wet days). Daytime 33-34C; fort climb compresses to 6-10am and 5-7pm. Hotel rates remain off-peak. October is materially better.',
  'June in Chitradurga is the first ease month. Southwest monsoon spillover reaches the Chitradurga plateau (the central Karnataka district between the Krishna and the Tungabhadra basins) — 70-100mm across 7-9 wet days, short late-afternoon thunderstorms drop daytime temperatures 5-6C from May. Daytime 33-34C, nights 23-24C, humidity 70 percent. The granite-boulder fort stops re-radiating to lethal temperatures; the 1,500-acre climb compresses to 6-10am and 5-7pm. The Obavva cleft approach, the monolithic pillar walk, the seven-wall perimeter all viable in morning windows. Hidimbeshwara cave at peak coolness. Sampige Siddeshwara Temple at standard hours. The fort-top rainwater-harvesting tanks start to refill from monsoon recharge — the Tippe Donee and Akka-Tangi tanks show first wet-season levels. Hotels remain off-peak: KSTDC Mayura Naagavi ₹1,200-2,000, Aishwarya Fort ₹1,500-2,500, Annapoorneshwari ₹1,200-2,000. Functional only for travelers locked to this window. October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 7, 2, 'wait',
  'SW monsoon active. 22-30C, 90-120mm rain. Granite slick. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon — 90-120mm across 10-12 wet days. Daytime 29-30C. Granite-boulder climb slick — grip footwear essential. Fort walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Chitradurga is the SW monsoon at moderate intensity. Rainfall 90-120mm across 10-12 wet days — short violent afternoon thunderstorms. Daytime 29-30C, nights 22-23C, humidity 78 percent. The granite-boulder fort darkens in the wet — the dry-season grey shifts to a wet-season silver-blue. The seven-wall climb slick — grip footwear essential, the rock-cleft Obavva approach should be skipped on heavy-rain days. Hidimbeshwara cave and Sampige Siddeshwara Temple interiors hold dry. Monolithic granite pillar walks viable in dry windows. The fort-top rainwater-harvesting tanks at peak monsoon recharge — the Tippe Donee and Akka-Tangi twin-tanks at full level, the year''s visual peak for the harvest-tank engineering. Hotels climb 15 percent off June lows: KSTDC Mayura Naagavi ₹1,300-2,200, Aishwarya Fort ₹1,800-3k, Annapoorneshwari ₹1,300-2,200. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 8, 3, 'wait',
  'Monsoon continues. 21-29C, 90-120mm rain. Boulder field green-mossed. Walks AM/PM.',
  'August holds July''s rain pattern (90-120mm). Daytime 28-29C. Granite boulders show green moss and lichen — visual peak for the wet-season fort character. Fort walks viable mornings and evenings.',
  'August works at 70 percent capacity. Daytime 28-29C, monsoon residue makes granite climbs rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner fort-trek shape.',
  'August in Chitradurga is the gradual climb-down from the monsoon. Rainfall 90-120mm across 10-12 wet days, daytime 28-29C, nights 21-22C, humidity 80 percent. The granite boulders of the fort show green moss and lichen patches — a wet-season visual character that contrasts dramatically with the dry-season ochre-grey of February. The fort-top rainwater-harvesting tanks at year-best level. The seven-wall climb still slick — grip footwear essential. Obavva cleft (Onake Obavvana Kindi) at moisture-darkened photographic depth. Monolithic granite pillar at peak. Hidimbeshwara cave interior cool and dry. Sampige Siddeshwara Temple standard hours. The 1,500-acre fort surrounding belt — the agricultural plain around Chitradurga town — at year-greenest fields from monsoon recharge, providing visual backdrop to the fort photography. Hotels 30 percent below January peak: KSTDC Mayura Naagavi ₹1,200-2,000, Aishwarya Fort ₹1,500-2,500, Annapoorneshwari ₹1,200-2,000. October window cleaner if flexibility exists.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 9, 3, 'wait',
  'Monsoon retreating. 20-28C, 70-100mm rain. Green-moss boulder peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 70-100mm. Post-monsoon green moss on boulders peaks late month. Last off-peak window.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 27-28C; afternoon thunderstorms still break fort climbs. Push to mid-October.',
  'September in Chitradurga is the bridge month before the proper season opens. Rainfall drops to 70-100mm across 9-11 wet days — second-half is materially drier. Daytime 27-28C, nights 20-21C, humidity easing from 80 to 70 percent. The post-monsoon green moss on the granite boulders peaks in the last 10 days — the visual character of the seven-wall fort climbs at year-greenest before drying to dry-season grey-ochre by November. The fort-top rainwater-harvesting tanks hold near-peak level. Hidimbeshwara cave interior cool. Sampige Siddeshwara Temple at standard hours. The Obavva cleft and monolithic pillar walks at improving traction. Hotels 25 percent below January peak: KSTDC Mayura Naagavi ₹1,500-2,500, Aishwarya Fort ₹2-3.5k, Annapoorneshwari ₹1,500-2,500. October 15 onward is the proper clean call; September offers value pricing and greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 10, 4, 'go',
  'Season opens. 19-29C, 30-50mm rain. Green-mossed boulders. Fort-trek returns mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean fort-trek weather. Granite-and-green-moss visual peak. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Chitradurga is the proper return to the fort-trek circuit. Southwest monsoon withdraws around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean weather. Daytime 28-29C, nights 19-21C, humidity falling from 70 to 60 percent. The granite-and-green-moss visual character on the seven-wall fort climbs holds through October before drying to winter ochre-grey. The 1,500-acre fort circuit (seven concentric walls, 19 gateways, 38 entries, 35 secret passages) walks comfortably through the afternoon. The Obavva cleft (Onake Obavvana Kindi) and the Obavva Memorial-pestle display at year-best photographic light. The 18-meter monolithic granite pillar inside the third enclosure. Hidimbeshwara cave at standard hours. Sampige Siddeshwara Temple. The fort-top tanks (Tippe Donee, Akka-Tangi) at year-best clean water level. Chitradurga sits on the Bengaluru-Hospet NH-48 (200km north of Bengaluru, 140km south of Hospet/Hampi) — viable as the Hampi-circuit stopover. Hotels 25-30 percent below January peak: KSTDC Mayura Naagavi ₹1,800-3k, Aishwarya Fort ₹2-3.5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Fort-photography year-best granite-and-sky.',
  'November is the proper pivot to peak. Rainfall under 20mm, full fort-trek weather, Karnataka Rajyotsava Nov 1 brings Chitradurga district programming. Granite-and-sky photography at year-best contrast.',
  NULL,
  'November in Chitradurga is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 26-28C, nights 17-19C, humidity dropping below 58 percent. Air visibility at annual cleanest. The seven-wall granite fort walks at year-best traction and photography — the granite-and-sky contrast year-cleanest. The fort''s Nayaka-era expansion (the chieftain dynasty that ruled 1500-1779 as Vijayanagara feudatories, fell to Hyder Ali''s 1779 siege after the Obavva episode) best understood from the upper rampart — seven concentric walls visible in receding tiers. The Obavva cleft (Onake Obavvana Kindi) where Obavva killed Hyder Ali''s soldiers with a rice-pestle — the narrow vertical fissure in the third-wall perimeter at year-best depth. The 18-meter monolithic granite pillar inside the third enclosure. Hidimbeshwara cave and Sampige Siddeshwara Temple at peak comfort. The fort-top rainwater-harvesting tanks hold clean post-monsoon water. Karnataka Rajyotsava (Nov 1) brings district cultural programming. Hotels climb to 75 percent of January peak: KSTDC Mayura Naagavi ₹2-3.5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chitradurga', 12, 5, 'go',
  'Peak season. 15-27C, dry. Christmas-NYE moderate rate spike. Fort at year-cleanest air.',
  'December is operational peak. Daytime 25-27C, nights 15-16C, year-cleanest air visibility. The seven-wall fort circuit and the Obavva legend walks at year-best. Christmas-NYE 1.5-2x rates.',
  NULL,
  'December in Chitradurga is the operational peak. Daytime 25-27C, nights drop to 15-16C, humidity 50 percent, rainfall under 10mm. Air visibility at annual best — the granite-boulder fort shows year-cleanest contrast against the winter sky. The 1,500-acre fort circuit walks comfortably from dawn through 5:30pm close. The seven concentric walls, 19 gateways, the Hidimbeshwara cave-temple at the upper reaches, Sampige Siddeshwara Temple, the 18-meter monolithic granite pillar — all at year-best photographic light. The Obavva cleft (Onake Obavvana Kindi where Obavva killed Hyder Ali''s soldiers in 1779 with a rice-pestle) at year-cleanest photographic depth. The Obavva Memorial-pestle at the visitor centre. The fort-top tanks (Tippe Donee, Akka-Tangi) hold clean post-monsoon water. Chitradurga sits on the Bengaluru-Hospet NH-48 — viable as Hampi-circuit stopover (140km south of Hampi). Christmas-NYE (December 22 to January 5) sees moderate rate lift: KSTDC Mayura Naagavi ₹2-3.2k, Aishwarya Fort ₹3-4.5k. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
