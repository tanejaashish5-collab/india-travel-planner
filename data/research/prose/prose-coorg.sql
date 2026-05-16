-- Coorg (Kodagu) destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: coorg | best_months [10,11,12,1,2,3,9] | avoid [6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 1, 5, 'go',
  'Peak coffee-misty window. 13-26C at 1170m. Talacauvery clear. Plantation walks year-best.',
  'January is when Coorg runs at its strongest. Daytime 22-26C at 1170m Madikeri, nights drop to 13-15C. Abbey Falls, Talacauvery, Bhagamandala, Raja''s Seat, Madikeri Fort all at clean access. Plantation walks at year-best.',
  NULL,
  'Coorg in January is the version every Western Ghats traveller books first. Kodagu district (HQ Madikeri at 1170m) is India''s coffee capital — Arabica + Robusta cultivation across 1,02,000+ hectares produces roughly 33 percent of India''s coffee output, with Coorg-Chikmagalur-Sakleshpur together producing 70+ percent. The Kodava (Coorgi) warrior caste — Kshatriya, ~150,000 worldwide, the most decorated military district per capita in India (Field Marshal KM Cariappa and General KS Thimayya both Kodava) — anchors the cultural identity. Daytime 22-26C, nights 13-15C, humidity 60 percent, rainfall under 15mm. Abbey Falls (5km from Madikeri, 70ft drop, ₹15) at clean dry-season flow. Talacauvery (44km, the Cauvery river source at Brahmagiri hill 1276m, the Oct 17 Cauvery Sankramana annual emergence ritual at the kundike pool the year''s spiritual peak — January is dry-season pilgrim flow) on full access. Bhagamandala (40km, the triveni sangam of Kaveri+Kannike+Sujyoti — the second pilgrim anchor of Coorg) at clean. Madikeri Fort and Omkareshwara Temple (1820 Lingayat-Islamic hybrid architecture). Raja''s Seat (sunset viewpoint).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 2, 5, 'go',
  'Driest month. 14-28C. Talacauvery + plantation walks at peak. Misty mornings frequent.',
  'February is Coorg''s cleanest weather window — rainfall under 10mm, humidity 55 percent. Talacauvery, Abbey Falls, Bhagamandala, Iruppu Falls all on clean access. Plantation walks at peak operational tempo. Hotel rates near peak.',
  NULL,
  'Coorg in February is the technical peak. Rainfall under 10mm, daytime 24-28C, nights 14-16C, humidity at year-low 55 percent. Misty mornings still frequent at 1170m Madikeri elevation — cold-night cloud-inversion in the valleys below 800m produces the iconic Coorg-mist photographs. Abbey Falls (5km from Madikeri, 70ft drop, ₹15, 8am-5.30pm) at clean dry-season flow. Talacauvery (44km, the Cauvery river origin source at Brahmagiri hill 1276m — the kundike pool where the river is said to emerge from the earth on October 17 annually for the Cauvery Sankramana ritual) at clean pilgrim access. Bhagamandala (40km, the triveni sangam of the Kaveri+Kannike+Sujyoti — second Coorg pilgrim anchor) at peak. Madikeri Fort (1814 Tipu Sultan-era stonework with later British modifications) and Omkareshwara Temple (1820 Lingayat-Islamic hybrid architecture, Coorgi Raja Lingarajendra II commission) on full hours. Raja''s Seat (sunset viewpoint at 1175m, ₹15) at peak weekend traffic. Iruppu Falls (Brahmagiri Wildlife Sanctuary border with Wayanad — Ramayana legend the river formed when Lakshmana shot an arrow into the rock for Sita''s bath) on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 3, 5, 'go',
  'Coffee Blossom window. 16-30C. White-blossom carpet 7-10 days after first pre-monsoon showers.',
  'March is when Coffee Blossom hits Coorg — 7-10 day window of white-blossom carpet across Arabica plantations triggered by first pre-monsoon showers (typically Mar 15-25 weather-dependent). Western Ghats visual peak.',
  NULL,
  'Coorg in March is the year''s photographic peak — the Coffee Blossom window. Daytime 26-30C, nights 16-18C, humidity climbing toward 60 percent in the last fortnight, rainfall 30-60mm (the pre-monsoon showers that trigger the blossom). Coffee Blossom — the 7-10 day window of white-blossom carpet across Arabica coffee plantations triggered by the first pre-monsoon shower (Coffea arabica flowers 9-12 weeks before the rains; the first shower triggers synchronous flowering across estates within hours) — typically hits Coorg between March 15 and April 5, weather-dependent. The visual: 1,02,000+ hectares of Arabica coffee plantation across Kodagu blanketed in jasmine-scented white blossoms for 7-10 days, followed by green-cherry development through November-December harvest. Tata Coffee Plantation Trails, Coffee Day Estates, Evolve Back, Old Kent Estates all run extended blossom-tour hours — book 30 days ahead. Abbey Falls (5km, 70ft drop, ₹15), Talacauvery (44km, Cauvery source at Brahmagiri 1276m), Bhagamandala (40km, triveni sangam), Madikeri Fort, Omkareshwara Temple (1820), Raja''s Seat (1175m sunset viewpoint) all on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 4, 4, 'go',
  'Coffee Blossom tail. 17-31C. Talacauvery and plantation walks still workable. Pre-monsoon storms last 10 days.',
  'April extends March Coffee Blossom — the window often runs into Apr 5-10 depending on first-rain timing. Talacauvery, plantations, falls still on full schedule. Last 10 days bring pre-monsoon thunderstorms.',
  NULL,
  'Coorg in April is the Coffee Blossom tail plus pre-monsoon transition. Daytime 27-31C at 1170m, nights 17-19C, humidity climbing past 65 percent, rainfall 60-100mm with pre-monsoon thunderstorms hitting the last 10 days. The Coffee Blossom window often runs into April 5-10 — the 7-10 day visual peak depends on first-rain timing. Late-March / early-April blossoms remain at peak; the jasmine-scented white-carpet visual across 1,02,000+ hectares of Arabica plantation across Kodagu is the year''s defining Western Ghats experience. Tata Coffee Plantation Trails, Coffee Day Estates, Evolve Back, Old Kent Estates run extended blossom-tour hours. Abbey Falls (5km, 70ft drop, ₹15), Talacauvery (44km, the Cauvery river source at Brahmagiri 1276m), Bhagamandala (40km, triveni sangam), Madikeri Fort, Omkareshwara Temple (1820 Lingayat-Islamic hybrid), Raja''s Seat (1175m sunset viewpoint, ₹15) all at full schedule though mid-day temperatures push outdoor walks to 6-10am and 5-7pm windows. Iruppu Falls (Brahmagiri border with Wayanad) at year-lowest flow until first heavy pre-monsoon rains hit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 5, 3, 'wait',
  'Pre-monsoon plus storms. 18-29C. SW monsoon advance squalls last 10 days. Visibility collapsing.',
  'May is the pre-monsoon transition. First fortnight extends April. Last 10 days bring SW monsoon advance squalls. Plantation walks become slippery. Wait for September if Coffee Blossom not the goal.',
  'May is when SW monsoon advance squalls start hitting Coorg. Visibility from Raja''s Seat and viewpoints collapses on stormy afternoons. Plantation walks slippery. Push to September for the green Ghats without the storm risk.',
  'Coorg in May is the pre-monsoon transition. The first fortnight extends April: daytime 26-29C, nights 18-20C, humidity 75 percent. Abbey Falls (5km, 70ft drop) workable, plantation walks viable till noon. By the third week, southwest monsoon advance squalls start hitting Karnataka — Coorg at 1170m receives the first 100-200mm of the season''s 2,500-3,500mm annual rainfall, typically as 1-3 hour afternoon downpours. The full annual rainfall total ranks Kodagu among India''s wettest districts. Visibility from Raja''s Seat (1175m), Talacauvery (44km, Brahmagiri at 1276m), Bhagamandala (40km triveni sangam) collapses to under 1km on rainy afternoons. Iruppu Falls (Brahmagiri border with Wayanad) starts returning to monsoon flow from late May. Plantation walks become slippery — the lateritic Coorg soil under coffee canopy turns to mud within 2-3 days of rain start. Madikeri Fort and Omkareshwara Temple (1820) hold full hours indoors. Hotel rates drop sharply: Tamara Coorg ₹14-22k (was ₹20-30k), Evolve Back Chikkana Halli ₹12-20k, Taj Madikeri Resort ₹10-15k, plantation homestays ₹2,500-5,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 6, 1, 'skip',
  'SW monsoon onset. 18-25C, 700-900mm rainfall. Landslide risk on NH-275. Skip.',
  NULL,
  'June is when the SW monsoon hits Coorg with peak Western Ghats force. 700-900mm rainfall, NH-275/SH-90 landslide-prone, plantation walks suspended, viewpoints fogged. The trip you came for cannot happen until September. 2018 Kodagu landslides killed 20+; risk is real.',
  'Coorg in June is when the southwest monsoon arrives with peak Western Ghats force — and Kodagu''s 2018 and 2019 landslide disasters (which killed 20+ people across Madikeri-Virajpet-Somwarpet talukas, displaced 8,000+ residents, destroyed 800+ homes) underscore the real risk. The district receives 700-900mm of rainfall through June — part of Coorg''s extraordinary 2,500-3,500mm annual total, ranking it among India''s wettest districts. Daytime 22-25C feels mild but constant rain and 95 percent humidity make outdoor activity miserable. NH-275 and SH-90 access roads to Coorg become landslide-watch country: Karnataka PWD typically closes the steeper Sakleshpur-Madikeri and Mysore-Madikeri stretches 1-3 days per week through the month for clearance. Talacauvery (44km, Cauvery source at Brahmagiri 1276m) and Bhagamandala (40km, triveni sangam) lose road access on the worst days. Abbey Falls (5km, 70ft drop) at peak monsoon flow — visible from base. Iruppu Falls (Brahmagiri border with Wayanad) at year-best monsoon flow but accessibility cuts. Plantation walks suspended on most days. Raja''s Seat (1175m) and viewpoints lose visibility past 200m.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 7, 1, 'skip',
  'Peak monsoon. 18-24C, 900-1200mm rainfall. Landslide risk peak. Skip.',
  NULL,
  'July is the wettest stretch at Coorg — 900-1200mm rainfall. NH-275/SH-90 closures 2-3 days per week, plantation walks completely suspended. Wait for September. Kodagu landslide risk is the real concern, not just rain.',
  'Coorg in July is the year''s wettest stretch and the peak landslide-risk period. Rainfall hits 900-1200mm at the 1170m Madikeri elevation across 25-27 wet days — Kodagu receives some of the heaviest July rainfall in South India alongside Agumbe-Hulikal (~7,000mm annual) 80km west. Daytime 22-24C with 95 percent humidity and constant downpour make outdoor sustained activity impossible. The 2018 Kodagu landslide disaster (peak rainfall August 17, 23 deaths, 8,000+ displaced) plus 2019 follow-on slides underscored the genuine geological risk — Kodagu''s lateritic soils on steep slopes become unstable after sustained 1000mm+ rainfall over 3-5 days. NH-275 Mysore-Madikeri (120km) and SH-90 Bengaluru-Madikeri (270km via Channapatna) closure events run 2-3 days per week as Karnataka PWD clears landslides. Plantation walks completely suspended. Talacauvery (44km, the Cauvery source at Brahmagiri 1276m) and Bhagamandala (40km, the triveni sangam) lose road access most days. Abbey Falls (5km, 70ft drop) at year-peak monsoon flow — visible from base. Iruppu Falls (Brahmagiri border with Wayanad) at year-best monsoon flow but accessibility cuts.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 8, 1, 'skip',
  'SW monsoon continues. 18-25C, 700-1000mm rainfall. 2018 landslide month. Skip.',
  NULL,
  'August holds the July pattern with the peak landslide-risk window. 700-1000mm rainfall, NH-275 closures continue, plantation walks suspended. 2018 Kodagu disaster peaked August 17. Wait for September.',
  'Coorg in August holds the July monsoon pattern with marginally fewer extreme-rain days, but it is the historical peak landslide-risk window. 700-1000mm rainfall across 22-25 wet days at the 1170m Madikeri elevation. Daytime 22-25C feels mild but constant rain and 90 percent humidity strip outdoor activity. The 2018 Kodagu landslide disaster (peak event August 17, 2018 — 23 deaths in the worst Karnataka monsoon disaster on record) makes August the standout-risk month. NH-275 Mysore-Madikeri (120km) and SH-90 Bengaluru-Madikeri (270km) closure events continue 1-2 days per week. Talacauvery (44km, Cauvery source at Brahmagiri 1276m) and Bhagamandala (40km, triveni sangam) lose road access intermittently. Abbey Falls (5km, 70ft drop) at peak monsoon flow. Iruppu Falls (Brahmagiri border with Wayanad — the Ramayana legend that Lakshmana created the river by shooting an arrow into the rock for Sita''s bath) at year-peak monsoon flow. Plantation walks suspended on most days. Madikeri Fort and Omkareshwara Temple (1820) hold full hours indoors. Independence Day (Aug 15) brings minimal traffic — even hardy Bengaluru weekenders avoid Kodagu after the August 2018 trauma.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 9, 4, 'go',
  'SW monsoon retreats. 17-26C, 400-600mm rainfall easing. Plantations year-greenest. Abbey Falls strong.',
  'September is the recovery month. SW monsoon retreats from Karnataka by week 3. Plantation walks viable. Abbey Falls at sustained post-monsoon flow. Hotel rates at shoulder levels.',
  NULL,
  'Coorg in September is the soft re-opening. Rainfall drops to 400-600mm across 18-22 wet days at the 1170m Madikeri elevation, mostly the first fortnight. Daytime 23-26C, nights 17-19C, humidity easing toward 80 percent. The southwest monsoon retreats from interior Karnataka by September 20-25; NH-275 Mysore-Madikeri (120km) and SH-90 Bengaluru-Madikeri (270km via Channapatna) stabilise with closure events dropping to under 1 per week from mid-month. Abbey Falls (5km, 70ft drop, ₹15) at sustained post-monsoon flow — one of the year''s strongest visual windows. Iruppu Falls (Brahmagiri Wildlife Sanctuary border with Wayanad — the Ramayana legend site, where Lakshmana shot an arrow to create the river for Sita''s bath) at peak post-monsoon flow. Talacauvery (44km, the Cauvery source at Brahmagiri 1276m) and Bhagamandala (40km, the triveni sangam of Kaveri+Kannike+Sujyoti) return to clear access from week three. Plantation walks resume — coffee bushes at year-greenest, the cherry development from the March-April blossom now reaching ripening. Tata Coffee Plantation Trails, Coffee Day Estates, Evolve Back, Old Kent Estates all run guided tours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 10, 5, 'go',
  'Season opens. 16-26C. Cauvery Sankramana Oct 17. Plantations year-greenest. Talacauvery peak.',
  'October is the proper season opener. Cauvery Sankramana (Oct 17) annual ritual at Talacauvery brings 50,000+ pilgrims. Plantations at year-greenest. Hotel rates 25 percent below December peak.',
  NULL,
  'Coorg in October is when the Western Ghats hill district returns to full operations. Daytime 23-26C at 1170m, nights 16-18C, humidity dropping toward 75 percent, rainfall 200-350mm — northeast monsoon overspill from Tamil Nadu hits mostly as 1-2 hour evening showers in the first fortnight. The headline date is Cauvery Sankramana (Tula Sankramana, October 17 annually — the day the Cauvery river is believed to emerge spontaneously from the kundike pool at Talacauvery, marking the river''s spiritual birthday) — 50,000+ pilgrims converge on Talacauvery (44km from Madikeri, the river source at Brahmagiri hill 1276m); Bhagamandala (40km, triveni sangam) sees secondary pilgrim flow. Plantation walks at year-second-greenest after the SW monsoon flush. Coffee bushes at peak ripening — Robusta cherries at red-bunch visibility, Arabica development behind. Abbey Falls (5km, 70ft drop, ₹15), Iruppu Falls (Brahmagiri border with Wayanad), Madikeri Fort, Omkareshwara Temple (1820), Raja''s Seat (1175m sunset viewpoint) all on full schedule. Tata Coffee Plantation Trails, Coffee Day Estates, Evolve Back, Old Kent Estates all run guided tours ₹500-1,500/person.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 11, 5, 'go',
  'High season builds. 14-26C, dry. Coffee Arabica harvest. Karnataka Rajyotsava Nov 1.',
  'November is the genuine pivot to Coorg high season. Rainfall under 80mm, humidity 65 percent, full plantation-walking weather. Coffee Arabica harvest starting. Hotel rates climb 20-25 percent.',
  NULL,
  'Coorg in November is when the hill district turns the corner. Northeast monsoon overspill eases to under 80mm across 5-7 wet days, almost all in the first 10 days. Daytime 23-26C at 1170m, nights 14-16C, humidity dropping toward 65 percent. Coffee Arabica harvest starting — the cherries at red-bunch peak visibility across plantations, hand-picking labour operations active 7am-5pm on every estate. Plantation walks at year-best — Tata Coffee Plantation Trails, Coffee Day Estates, Evolve Back, Old Kent Estates run extended hours through the harvest window. Abbey Falls (5km, 70ft drop, ₹15) at sustained post-monsoon flow. Talacauvery (44km, the Cauvery source at Brahmagiri 1276m), Bhagamandala (40km, the triveni sangam of Kaveri+Kannike+Sujyoti) at clean post-Sankramana access (the Oct 17 ritual now behind). Madikeri Fort, Omkareshwara Temple (1820 Lingayat-Islamic hybrid), Raja''s Seat (1175m sunset viewpoint), Iruppu Falls (Brahmagiri border with Wayanad) all on full schedule. Karnataka Rajyotsava (November 1, State Formation Day 1956) brings a 1-day state-celebration bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coorg', 12, 5, 'go',
  'Peak season. 12-25C, dry. Coffee harvest peak. Huttari Kodava festival. Christmas-NYE rates 2-2.5x.',
  'December is the year''s most reliable Coorg window — peak weather, dry, full operational tempo. Coffee Arabica + Robusta harvest at peak. Huttari Kodava harvest festival mid-late Dec. Christmas-NYE rates 2-2.5x base.',
  NULL,
  'Coorg in December is the year''s most coherent window — peak weather, full operational tempo, coffee harvest at peak. Daytime 22-25C at 1170m Madikeri, nights 12-14C (some plantation locations drop to 10C late month), humidity 55 percent, rainfall under 20mm. Coffee Robusta peak harvest (Dec-Jan, the cherries hand-picked in 3-4 passes across each tree) plus Arabica peak harvest tail — Kodagu plantations at peak visual activity, drying patios full of cherry beans, processing facilities running daily. Huttari (the Kodava community''s traditional harvest thanksgiving festival, typically mid-late December — verify against the Karkadaka maasam Rohini nakshatra annually) — Kodava families across Madikeri-Virajpet-Somwarpet host community celebrations with paddy-sheaf harvesting rituals, traditional dances (Bolakaat, Ummattaat), kuttiyatte gun rituals, and Kodava cuisine feasts. Cauvery Sankramana (Oct 17) is now behind but Talacauvery (44km, the Cauvery source at Brahmagiri 1276m) and Bhagamandala (40km, triveni sangam of Kaveri+Kannike+Sujyoti) at clean pilgrim access.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
