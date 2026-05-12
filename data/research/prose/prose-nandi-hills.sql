-- Nandi Hills destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: nandi-hills | best_months [10,11,12,1,2,3,9] | avoid [4,5]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 1, 5, 'go',
  'Peak sunrise window. 10-24C at 1478m. Gates 6am, sun 6.45am. Cloud-inversion mornings frequent.',
  'January is the cleanest sunrise window at Nandi Hills. Daytime 18-24C at 1478m, nights drop to 10-12C. Gates open 6am, sunrise 6.45-7am, cloud-inversion mornings frequent on cold post-NYE days. Tipu''s Drop, Brahmashram cave, Yoga Nandeeshwara Temple at clean access.',
  NULL,
  'Nandi Hills in January is the version every Bengaluru sunrise-chaser books first. The 1478m fortress hilltop sits 60km NE of Bengaluru — the 90-minute drive on NH-44 means a 4.30am start from MG Road for the 6am gate opening. Sunrise at 6.45-7am, the post-NYE cold-front pattern (nights 10-12C, daytime 18-24C) produces cloud-inversion mornings frequently — the valley fills with mist below 1000m and the hilltop sits above it, the visual setpiece that defines Nandi photography. The Yoga Nandeeshwara Temple (Chola 9th-century CE — Bull Temple Bengaluru''s older sibling), Tipu''s Drop (the cliff where Tipu Sultan reportedly threw prisoners during his 1791 occupation against the British), Brahmashram cave, and Amrita Sarovar (lake at the summit) hold full free access — ₹15 hilltop entry plus ₹50-100 parking. The Karnataka State Tourism Bhoga Nandeeshwara Temple at the base of the hill (Ganga Dynasty 9th century, oldest temple in Karnataka) ₹free, 6am-noon + 4-8.30pm. Paragliding tandem flights (BPC Karnataka, ₹3500-5000 per 15-min flight) run weekend mornings only, weather-dependent. Tata Coffee plantation property at the base operates the strongest cafe option.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 2, 5, 'go',
  'Driest month. 12-26C. Cleanest sunrise visibility. Paragliding peak weekends.',
  'February is Nandi''s technical peak. Rainfall under 5mm, humidity at year-low. Sunrise 6.30am visibility at clearest. Paragliding tandem flights at peak weekend frequency. Day-trip from Bengaluru holds full ease.',
  NULL,
  'Nandi Hills in February is the technical sweet spot. Rainfall under 5mm, daytime 20-26C, nights 12-14C, humidity at year-low 50 percent. Sunrise visibility at year-best — the Deccan plateau holds clear-air conditions across the 100km viewline. Gates 6am, sunrise 6.30am — the early-bird BBMP traffic from Bengaluru hits NH-44 by 4.30am. Yoga Nandeeshwara Temple (Chola 9th-century), Tipu''s Drop, Brahmashram cave, Amrita Sarovar (summit lake) hold free access; ₹15 hilltop entry and ₹50-100 parking. Bhoga Nandeeshwara Temple at the base (Ganga Dynasty 9th century) holds clean morning access. Paragliding (BPC Karnataka, ₹3500-5000 per 15-min tandem flight) at peak weekend frequency through the month — Saturday and Sunday morning launches happen 8-10am, weather-dependent. Cycling clubs (Bengaluru Riders, Bangalore Bicycle Club, Spinhog) run weekend uphill rides to the summit — 1478m elevation gain across the 60km route from Bengaluru, the standard testing route for the city''s road cyclists. Tata Coffee plantation cafe at the base (Coffee Day Junction) and Café Coffee Day at Devanahalli (closer airport spillover) hold full hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 3, 4, 'go',
  'Warming. 14-29C. Last clean window. Mid-day heat builds. Sunrise visibility still year-clean.',
  'March extends February''s pattern with rising mid-day heat. Sunrise window still works (gates 6am, sunrise 6.15am earlier into the month). Mid-day at the summit becomes warm; afternoon visits less comfortable than mornings.',
  NULL,
  'Nandi Hills in March is the soft-landing month before pre-monsoon heat. Daytime 22-29C at 1478m elevation, nights 14-16C, humidity climbing toward 60 percent in the last fortnight, rainfall under 15mm. Sunrise still works at year-clean visibility — gates 6am, sunrise 6.15am earlier into the month. The cold-night cloud-inversion pattern eases through March; by month-end the inversion-mist that defines January-February mornings becomes rare. Yoga Nandeeshwara Temple (Chola 9th-century), Tipu''s Drop, Brahmashram cave, Amrita Sarovar hold full access at ₹15 hilltop entry. Bhoga Nandeeshwara Temple at base (Ganga Dynasty 9th century, oldest temple in Karnataka) clean morning access. Paragliding (BPC Karnataka, ₹3500-5000 tandem) holds weekend launches through the month — Bengaluru weekend traffic at peak as the cool-weather window narrows. Holi long weekend (variable mid-March, 2026 likely March 13-15) brings 3-day domestic bump from Bengaluru-Pune-Hyderabad. Cycling clubs run their last comfortable weekend ascents. Mid-day at the summit (10am-3pm) becomes warm — most visitors leave by 11am. Tata Coffee plantation cafe at base on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 4, 3, 'wait',
  'Pre-monsoon. 17-32C. Sunrise still works but mid-day unviable. Visibility hazy.',
  'April works only for the sunrise visit — be at the gate 5.45am, off the hill by 9am. Mid-day temperatures at the 1478m summit climb to 30-32C with hazy pre-monsoon visibility. Bengaluru day-trippers concentrate dawn-only.',
  'April puts Nandi Hills into dawn-only operation. Mid-day 30-32C even at 1478m elevation, post-9am visibility hazy with pre-monsoon dust, paragliding launches cancelled on calm-air mornings. The cloud-inversion sunrise that defines Nandi rarely happens after March. Push to October-November.',
  'Nandi Hills in April narrows to the dawn-only visit. Daytime 28-32C at the 1478m summit, nights 17-19C, humidity 65 percent. The cloud-inversion sunrise pattern (the visual setpiece that draws Bengaluru photographers) is rare after mid-March — warm nights below 18C don''t produce the valley-mist cap. Sunrise still works as a viewpoint visit: gates 6am, sunrise 6am, but visibility drops to hazy pre-monsoon dust conditions across the Deccan plateau viewline. Most regulars are off the hill by 9am — by 10am the 1478m altitude offers little relief from the plateau heat. Yoga Nandeeshwara Temple (Chola 9th-century), Tipu''s Drop, Brahmashram cave, Amrita Sarovar hold free access at ₹15 hilltop entry. Bhoga Nandeeshwara Temple at the base clean. Paragliding (BPC Karnataka, ₹3500-5000) launches require steady thermal conditions — pre-monsoon afternoons cancel often on calm-wind or storm-prone weather. Cycling weekend ascents drop sharply as the climb becomes punishing past 8am. Tata Coffee plantation cafe at base on full schedule. Hotel rates drop 20-25 percent versus February: Mansion 1907 ₹10-14k, Discovery Village Nandi ₹3-4.5k, Saj Earth ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 5, 3, 'wait',
  'Pre-monsoon plus storms. 18-31C. Sunrise visibility poor. Hotel rates year-low.',
  'May still works for the dawn-only viewpoint visit but pre-monsoon haze drops sunrise visibility. Thunderstorms knock visibility to under 1km on stormy mornings. Hotel rates at year-low. Wait for October.',
  'May at Nandi Hills is when visibility collapses. Pre-monsoon haze and afternoon thunderstorms drop the Deccan plateau viewline to under 5km on most mornings. Paragliding cancelled most weekends. Cycling ascents impractical past 7am. Wait for October.',
  'Nandi Hills in May is the pre-monsoon transition. Daytime 27-31C, nights 18-20C, humidity climbing past 75 percent in the last fortnight. Pre-monsoon thunderstorms hit harder than April — violent 1-2 hour evening squalls 4-5 days per week, post-storm humidity stays at 85 percent through evening. The Deccan plateau viewline drops to under 5km on most mornings, the year-defining cloud-inversion pattern absent. Gates 6am, sunrise 6am holds but the photograph that brought you is impossible. Yoga Nandeeshwara Temple (Chola 9th-century), Tipu''s Drop, Brahmashram cave, Amrita Sarovar still accessible at ₹15 hilltop entry. Paragliding (BPC Karnataka, ₹3500-5000 tandem) cancelled most weekends — pre-monsoon thermals are unstable, BPC suspends launches on weather alert. Cycling weekend ascents drop to dawn-only — most riders pull out of the route by 7am. Tata Coffee cafe at base on full schedule. Bhoga Nandeeshwara Temple (Ganga Dynasty 9th century) at base holds full hours. Hotel rates at near year-low: Mansion 1907 ₹9-12k, Discovery Village Nandi ₹2.5-4k, Saj Earth Resort ₹4-5.5k. The Bengaluru day-trip works for any reason other than the photography.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 6, 3, 'wait',
  'SW monsoon arrives. 17-25C, 80-120mm rainfall. Cool but constant cloud cover.',
  'June brings the SW monsoon to Nandi. Temperatures ease to 17-25C, fogged-in mornings frequent but the cloud is wet-cloud not the dry inversion of January. Paragliding cancelled. Sunrise visibility absent most days.',
  'June is when the SW monsoon hits Nandi Hills. 80-120mm rainfall, constant cloud cover, sunrise visibility absent most mornings, paragliding suspended. The viewpoint visit functions as a green-monsoon-hilltop walk but the photography is gone. Wait for October.',
  'Nandi Hills in June is when the southwest monsoon arrives. The 1478m hilltop catches 80-120mm of rainfall across 14-18 wet days, daytime 22-25C, nights 17-19C, humidity 90 percent. The hilltop sits in cloud cover most mornings — not the dry cold-inversion mist that defines January-February but constant wet-cloud that drops visibility to under 200m. Sunrise (6am) impossible to photograph. Gates 6am hold but the trip you came for cannot happen. The summit still works as a monsoon-green hilltop walk — Yoga Nandeeshwara Temple (Chola 9th-century, ₹free, ₹15 hilltop entry), Tipu''s Drop (cliff barrier safe even in wet), Brahmashram cave (dry inside), Amrita Sarovar (lake at peak monsoon water level) all accessible. Bhoga Nandeeshwara Temple at the base (Ganga Dynasty 9th century, oldest temple in Karnataka) at year-greenest. Paragliding (BPC Karnataka) suspended for the monsoon — operations resume October. Cycling weekend ascents drop to specialist riders only — the wet roads and reduced visibility cut traffic by 80 percent versus dry months. Tata Coffee plantation cafe at base on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 7, 2, 'wait',
  'SW monsoon peak. 17-23C, 100-150mm rainfall. Hilltop fogged most days. Sunrise impossible.',
  'July is the wettest stretch at Nandi. 100-150mm rainfall, fogged-in hilltop most mornings. Sunrise visibility absent. Paragliding suspended. Wait for October.',
  'July is full southwest monsoon at Nandi Hills. The hilltop fogs in completely most mornings — 100-150mm rainfall across 18-22 days, sunrise visibility absent, paragliding suspended. The trip you came for cannot happen. Wait for October.',
  'Nandi Hills in July is the year''s wettest stretch. 100-150mm rainfall across 18-22 wet days at the 1478m hilltop. Daytime 21-23C, nights 17-19C, humidity 90 percent. The hilltop sits in dense cloud cover most mornings — visibility under 100m on the worst days. Sunrise (6.10am) impossible to photograph. The trip you came for cannot happen. Gates 6am hold but most visitors who do make the 4.30am Bengaluru departure find a fogged-out summit and turn back. The Bengaluru-Nandi NH-44 drive (60km, 90min in dry conditions, 2-2.5hr in monsoon) becomes weather-watch country — the Devanahalli-Chikballapur stretch sees periodic surface flooding. Yoga Nandeeshwara Temple (Chola 9th-century), Tipu''s Drop, Brahmashram cave, Amrita Sarovar (lake at peak water) remain accessible at ₹15 hilltop entry — the visit functions as a monsoon-green hilltop walk if the photography isn''t the goal. Bhoga Nandeeshwara Temple at base on full schedule. Paragliding (BPC Karnataka) suspended for the monsoon. Tata Coffee cafe at base on full schedule — strongest day-trip option in the area for non-sunrise visits. Hotel rates at year-low: Mansion 1907 ₹8-11k, Discovery Village ₹2.5-3.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 8, 2, 'wait',
  'SW monsoon continues. 17-23C, 110-160mm rainfall. Hilltop fogged. Sunrise impossible.',
  'August holds the July pattern — 110-160mm rainfall, fogged hilltop most days, sunrise visibility absent, paragliding suspended. Independence Day weekend (Aug 15) brings domestic bump despite weather. Wait for October.',
  'August at Nandi Hills holds the July pattern. 110-160mm rainfall, fogged hilltop, sunrise visibility absent on 70 percent of days. Independence Day weekend (Aug 15) brings traffic but the experience is compromised. Wait for October.',
  'Nandi Hills in August holds the July monsoon pattern with marginally more rain days. 110-160mm rainfall across 20-23 wet days at the 1478m hilltop. Daytime 21-23C, nights 17-19C, humidity 90 percent. Sunrise visibility absent on 70 percent of days; the cloud-inversion pattern that defines Nandi photography is impossible during the SW monsoon. The hilltop fogs in most mornings — visibility under 100m on the wettest days. Yoga Nandeeshwara Temple (Chola 9th-century, ₹15 hilltop entry), Tipu''s Drop (the cliff Tipu Sultan reportedly used for executions during his 1791 occupation), Brahmashram cave, Amrita Sarovar (summit lake at peak monsoon water) remain accessible — the visit functions as a green-hilltop walk if the photography isn''t the goal. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru — Discovery Village Nandi and Saj Earth Resort fill to 80 percent weekend occupancy despite the conditions. Bhoga Nandeeshwara Temple at base (Ganga Dynasty 9th century, oldest temple in Karnataka) on full schedule. Paragliding (BPC Karnataka, ₹3500-5000 tandem) suspended for the monsoon — operations resume October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 9, 4, 'go',
  'SW monsoon withdraws. 16-26C, 100-150mm rainfall easing. Sunrise visibility returns late month. Paragliding resumes.',
  'September is the recovery month. SW monsoon retreats from Karnataka by week three. Sunrise visibility returns from Sep 20-25. Paragliding launches resume late month. Hotel rates at shoulder levels.',
  NULL,
  'Nandi Hills in September is the soft re-opening. Rainfall drops to 100-150mm across 14-17 wet days at the 1478m hilltop. Daytime 24-26C, nights 16-18C, humidity easing toward 80 percent. The southwest monsoon retreats from interior Karnataka by September 20-25; sunrise visibility returns from the third week as the cold-front patterns start re-establishing. The cloud-inversion mornings that define Nandi photography don''t resume properly until late October-November (the night temperatures need to drop below 15C for the valley-mist cap to form) but the post-monsoon green is at year-peak across the hilltop. Yoga Nandeeshwara Temple (Chola 9th-century, ₹15 hilltop entry), Tipu''s Drop, Brahmashram cave, Amrita Sarovar (lake at peak monsoon water) all on full schedule. Paragliding (BPC Karnataka, ₹3500-5000 per 15-min tandem) resumes weekend launches from Sep 20 onward. Cycling clubs (Bengaluru Riders, Bangalore Bicycle Club) restart weekend ascents from week three. Bhoga Nandeeshwara Temple at base (Ganga Dynasty 9th century) on full schedule. Tata Coffee plantation cafe at base on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 10, 5, 'go',
  'Season opens. 15-26C, 80-110mm rainfall easing. Sunrise visibility at year-best post-monsoon clarity.',
  'October is the proper season opener. NE monsoon overspill light, sunrise visibility at clearest post-monsoon, paragliding at full schedule. Hotel rates 20 percent below December peak.',
  NULL,
  'Nandi Hills in October is when the hilltop returns to full operations. Daytime 22-26C at 1478m, nights 15-17C, humidity dropping toward 70 percent, rainfall 80-110mm — northeast monsoon overspill hitting mostly as 1-2 hour evening showers in the first fortnight. Sunrise visibility at year-cleanest post-monsoon clarity from week two onward; the cloud-inversion pattern that defines Nandi photography starts re-establishing from October 25-30 as night temperatures drop below 16C. The 1478m fortress hilltop sits 60km NE of Bengaluru — the 90-minute drive on NH-44 takes a 4.45am start from MG Road for the 6am gate and sunrise 6.05am. Yoga Nandeeshwara Temple (Chola 9th-century — the Bull Temple Bengaluru''s older sibling), Tipu''s Drop (cliff associated with Tipu Sultan''s 1791 occupation against the British), Brahmashram cave, Amrita Sarovar all on full access. Paragliding (BPC Karnataka, ₹3500-5000 per 15-min tandem) at full weekend schedule. Cycling weekend ascents at year-best — Bengaluru Riders, Bangalore Bicycle Club, Spinhog all run their post-monsoon training rides through the month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 11, 5, 'go',
  'High season builds. 13-25C, dry. Cloud-inversion mornings frequent. Paragliding at full schedule.',
  'November is the genuine pivot to Nandi high season. Rainfall under 40mm, humidity 60 percent. Cloud-inversion mornings return as night temperatures drop below 14C. Paragliding at peak weekend traffic.',
  NULL,
  'Nandi Hills in November is when the hilltop turns the corner. Northeast monsoon overspill spent by mid-month, rainfall under 40mm across 4-6 wet days. Daytime 22-25C, nights 13-15C, humidity 60 percent. The cloud-inversion sunrise pattern (Bengaluru photography''s defining setpiece) returns at year-best frequency — cold-front nights below 14C produce valley-mist caps that the hilltop sits above; 60-70 percent of November mornings deliver the visual. Gates 6am, sunrise 6.15-6.30am, the Bengaluru photography clubs (Bengaluru Weekend Shoots, BPS, Plus Magnify Photography) run their year-busiest weekend workshops. Yoga Nandeeshwara Temple (Chola 9th-century, ₹15 hilltop entry), Tipu''s Drop (the cliff Tipu Sultan used during his 1791 occupation against the British), Brahmashram cave, Amrita Sarovar all on full access. Paragliding (BPC Karnataka, ₹3500-5000 per 15-min tandem) at peak weekend frequency — Saturday-Sunday morning launches happen 8-10am. Cycling weekend ascents at year-best — the 60km Bengaluru-Nandi route plus the 1478m climb is the canonical training ride for Bengaluru road cyclists. Bhoga Nandeeshwara Temple at base on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nandi-hills', 12, 5, 'go',
  'Peak season. 10-23C. Cloud-inversion at year-peak. Christmas-NYE weekend mass traffic.',
  'December is the year''s most reliable Nandi window — peak cloud-inversion mornings, dry, full operational tempo. Christmas-NYE weekends fill all stays at the base. NH-44 traffic chokes from 4-7am.',
  NULL,
  'Nandi Hills in December is the year''s most coherent window — peak cloud-inversion mornings, full operational tempo, the hilltop at year-cleanest visibility. Daytime 20-23C at 1478m, nights 10-12C (some mornings drop to 8C), humidity 55 percent, rainfall under 10mm. The cold-front cloud-inversion pattern that defines Nandi photography hits peak frequency — 80-90 percent of December mornings deliver the valley-mist cap with the hilltop sitting above it. Gates 6am, sunrise 6.30am. The 60km Bengaluru-Nandi drive on NH-44 chokes from 4-7am weekend mornings as the city''s photography clubs, family day-trippers, paragliding bookings, and cycling clubs all converge on the hilltop. Christmas-NYE weekend (Dec 22-Jan 5) fills every available stay at the base: Mansion 1907 (heritage rental ₹16-22k for the whole property), Discovery Village Nandi (₹6-9k), Saj Earth Resort (₹6-9k), Stonehill International School area homestays (₹3-5k). Yoga Nandeeshwara Temple (Chola 9th-century, ₹15 hilltop entry), Tipu''s Drop, Brahmashram cave, Amrita Sarovar at peak visitor flow. Paragliding (BPC Karnataka, ₹3500-5000 tandem) at year-busiest — 90-day advance booking essential.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
