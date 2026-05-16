-- Chikmagalur destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: chikmagalur | best_months [9,10,11,12,1,2,3] | avoid [5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 1, 5, 'go',
  'Peak coffee window. 12-26C at 1090m. Mullayanagiri 1930m clear. Plantation walks year-best.',
  'January is when Chikmagalur runs at its strongest. Daytime 22-26C at 1090m, nights drop to 12-14C. Mullayanagiri (1930m, Karnataka''s highest peak) road access clean, plantation walks at year-best. Hirekolale Lake, Z Point, Coffee Museum at full schedule.',
  NULL,
  'Chikmagalur in January is the version every Western Ghats coffee traveller books first. The Sufi-coffee legend — Baba Budan smuggled 7 coffee beans from Mocha, Yemen, in 1670, planting them on the Baba Budan Giri hills, and the entire Indian coffee industry traces back to this single act — anchors the town''s identity. Daytime 22-26C at 1090m elevation, nights 12-14C, humidity 60 percent, rainfall under 15mm. Mullayanagiri peak (1930m, the highest peak in Karnataka) road access clean — the 1.5km final stretch is a steep 14-hairpin drive followed by a 470-step climb to the Shiva temple at the summit. Baba Budan Giri (1895m, the second-highest, 28km from town) holds the dargah of Hazrat Dada Hayath Mir Khalandar plus the Manikyadhara waterfall trek. Plantation walks at year-best — Tata Coffee plantation, Coffee Day Estates, Devon Plantations all run guided tours ₹500-1,500/person including coffee tasting. Coffee Museum at Hiremane village (free, donations) holds bean-to-cup demonstrations. Kemmangundi (1434m, 60km, the Sahyadri viewpoint), Z Point sunset (45min trek from Kemmangundi), Hebbe Falls (10km from Kemmangundi, 168m drop) on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 2, 5, 'go',
  'Driest month. 13-28C. Mullayanagiri at clearest. Plantation walks year-best. Coffee harvest tail.',
  'February is Chikmagalur''s cleanest weather window — rainfall under 10mm, humidity 55 percent. Mullayanagiri 1930m road clear. Coffee Robusta harvest tail (peak Dec-Jan). Plantation tours at peak operational tempo.',
  NULL,
  'Chikmagalur in February is the technical peak. Rainfall under 10mm, daytime 24-28C, nights 13-15C, humidity at year-low 55 percent. Mullayanagiri (1930m, Karnataka''s highest peak) road clear — the 14-hairpin final stretch and 470-step temple climb at year-best walking conditions. Baba Budan Giri hills (1895m, 28km from town — Baba Budan smuggled coffee beans from Yemen in 1670, the historical origin of Indian coffee) at peak access; the Manikyadhara Falls trek (1.5km from the dargah, 35min walk) holds dry-trail conditions. Coffee Robusta harvest tail (peak December-January, ending February-March across the lower-elevation estates) — plantation walks see fresh-bean processing, drying patios in full visual activity. Tata Coffee plantation, Coffee Day Estates, Devon Plantations all run guided tours ₹500-1,500/person. Coffee Museum at Hiremane village holds bean-to-cup demonstrations. Kemmangundi (1434m, 60km, the Sahyadri viewpoint), Z Point sunset, Hebbe Falls (168m drop) on full schedule. Hirekolale Lake at clean access.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 3, 5, 'go',
  'Coffee Blossom window opens. 15-30C. White-blossom carpet 7-10 days after first pre-monsoon showers.',
  'March is when Coffee Blossom hits Chikmagalur — 7-10 day window of white-blossom carpet across Arabica plantations triggered by first pre-monsoon showers (typically Mar 15-25 weather-dependent). The Western Ghats visual peak. Mullayanagiri still clear.',
  NULL,
  'Chikmagalur in March is the year''s photographic peak — the Coffee Blossom window. Daytime 26-30C, nights 15-17C, humidity climbing toward 60 percent in the last fortnight, rainfall 30-60mm (the pre-monsoon showers that trigger the blossom). Coffee Blossom — the 7-10 day window of white-blossom carpet across Arabica coffee plantations (Coffea arabica flowers 9-12 weeks before the rains, with the first pre-monsoon shower triggering synchronous flowering across estates within hours) — typically hits Chikmagalur and the Western Ghats coffee belt between March 15 and April 5, weather-dependent. The visual is iconic: 200,000+ hectares of Arabica plantations across the Chikmagalur-Coorg-Sakleshpur belt blanketed in jasmine-scented white blossoms for 7-10 days, followed by green-cherry development through November-December harvest. Tata Coffee, Coffee Day Estates, Devon Plantations all run extended hours for the blossom window — book 30 days ahead. Mullayanagiri (1930m, Karnataka''s highest peak) still clear with rising daytime temperatures making the 470-step temple climb best 6-10am. Baba Budan Giri (1895m) and Manikyadhara Falls trek at clean access.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 4, 4, 'go',
  'Coffee Blossom tail. 17-32C. Mullayanagiri still workable. Pre-monsoon thunderstorms last 10 days.',
  'April extends March Coffee Blossom (window often runs into Apr 5-10 depending on first-rain timing). Mullayanagiri summit climb works 6-10am. Pre-monsoon thunderstorms hit week 3-4 with afternoon squalls. Hotel rates climb on blossom-window weekends.',
  NULL,
  'Chikmagalur in April is the Coffee Blossom tail plus pre-monsoon transition. Daytime 28-32C at 1090m, nights 17-19C, humidity climbing past 65 percent, rainfall 60-100mm with pre-monsoon thunderstorms hitting the last 10 days. The Coffee Blossom window (which starts after the first pre-monsoon shower triggers synchronous flowering across Arabica plantations) often runs into April 5-10 — the 7-10 day visual peak depends on the exact first-rain date. Late-March / early-April blossoms remain at peak photogenic; the jasmine-scented white-carpet visual across 200,000+ hectares of Arabica plantation across Chikmagalur-Coorg-Sakleshpur is the year''s defining Western Ghats experience. Tata Coffee plantation, Coffee Day Estates, Devon Plantations all run extended blossom-tour hours. Mullayanagiri (1930m, Karnataka''s highest peak) still workable — the 470-step temple climb works 6-10am, mid-day temperatures at the summit exposed-stone make later climbs punishing. Baba Budan Giri (1895m, the Sufi dargah and Manikyadhara Falls trek) at clean access. Kemmangundi (1434m, the Sahyadri viewpoint), Z Point sunset, Hebbe Falls (168m drop) at full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 5, 3, 'wait',
  'Pre-monsoon plus storms. 18-31C. SW monsoon advance squalls last 10 days. Visibility collapsing.',
  'May is the pre-monsoon transition. First fortnight extends April — last 10 days bring SW monsoon advance squalls. Mullayanagiri visibility collapses on stormy afternoons. Wait for September if Coffee Blossom not the goal.',
  'May is when SW monsoon advance squalls start hitting the Western Ghats. Visibility from Mullayanagiri and Kemmangundi collapses to under 1km on stormy afternoons. Hebbe Falls returns from late month. Push to September for the green Ghats without the storm risk.',
  'Chikmagalur in May is the pre-monsoon transition. The first fortnight extends April: daytime 27-31C, nights 18-20C, humidity 75 percent. Mullayanagiri (1930m, Karnataka''s highest peak) workable 6-10am, plantation walks viable till noon. By the third week, southwest monsoon advance squalls start hitting Karnataka — Chikmagalur at 1090m receives the first 80-150mm of the season''s 1,500-2,500mm annual rainfall, typically as 1-3 hour afternoon downpours. The full annual rainfall total ranks Chikmagalur among India''s wettest at this latitude, alongside Coorg (2,500-3,500mm) and trailing only Agumbe (7,000mm, 80km west). Visibility from Mullayanagiri summit (the 1.5km final-hairpin road plus 470-step climb), Kemmangundi (1434m), Z Point sunset all collapse to under 1km on rainy afternoons. Hebbe Falls (168m drop) starts returning to flow from late May. Plantation walks become slippery — the lateritic soil under coffee canopy turns to mud within 2-3 days of rain start. Hotel rates drop sharply: Java Rain Resort ₹10-14k (was ₹14-19k), The Serai ₹12-17k, Tata Coffee Plantation Trails ₹9-12k, plantation homestays ₹2,500-5,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 6, 2, 'wait',
  'SW monsoon onset. 16-25C, 600-800mm rainfall. Landslide risk. Mullayanagiri road closes intermittently.',
  'June is when the SW monsoon hits Chikmagalur with peak Western Ghats force. 600-800mm rainfall, NH-73 Hassan-Chikmagalur landslide-prone, Mullayanagiri summit road closes intermittently, viewpoints fogged. Skip unless monsoon-green plantation walking is the goal.',
  'June is full southwest monsoon at Chikmagalur. 600-800mm rainfall, NH-73 Hassan-Chikmagalur landslide-prone, Mullayanagiri summit road closes intermittently, viewpoints permanently fogged. The trip you came for cannot happen until September. Hebbe Falls peak flow is the only standout.',
  'Chikmagalur in June is when the southwest monsoon arrives with peak Western Ghats force. The 1090m hill town receives 600-800mm of rainfall through the month — part of Chikmagalur''s extraordinary 1,500-2,500mm annual total. Daytime 21-25C feels mild but constant rain and 95 percent humidity make outdoor activity miserable. The NH-73 Hassan-Chikmagalur (90km) becomes landslide-watch country: Karnataka PWD typically closes the steeper Mudigere-Chikmagalur stretch 1-2 days per week through the month for clearance. Mullayanagiri (1930m) summit road closes intermittently — the 1.5km final-hairpin stretch becomes dangerous in heavy rain, and the 470-step temple climb suspends on stormy afternoons. Baba Budan Giri (1895m, the Sufi dargah and Manikyadhara Falls trek) and Z Point at Kemmangundi (1434m) lose visibility past 200m. Hebbe Falls (168m drop) at peak monsoon flow — the one visual standout of the month, accessible by 4WD only from Kemmangundi base. Plantation walks suspended on the worst days; the lateritic soil under coffee canopy turns to deep mud. Belavadi (Hoysala Veera Narayana 1200 CE, 29km) at year-greenest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 7, 1, 'skip',
  'Peak monsoon. 16-24C, 800-1100mm rainfall. NH-73 landslide-prone, summit roads closed. Skip.',
  NULL,
  'July is the wettest stretch at Chikmagalur — 800-1100mm rainfall. NH-73 closures 2-3 days per week, Mullayanagiri summit road closed, viewpoints permanently fogged. Coffee plantation walks suspended. Wait for September.',
  'Chikmagalur in July is the year''s wettest stretch. Rainfall hits 800-1100mm at the 1090m elevation across 25-27 wet days — Chikmagalur receives some of the heaviest July rainfall in South India alongside Coorg and the Agumbe-Hulikal belt 80km west (among India''s wettest places at 7,000mm annual total). Daytime 21-24C with 95 percent humidity and constant downpour make outdoor sustained activity impossible. NH-73 Hassan-Chikmagalur (90km) closure events run 2-3 days per week as Karnataka PWD clears landslides on the Mudigere-Chikmagalur Western Ghats descent. The Sakleshpur-Subrahmanya broad-gauge route nearby (closed since 1996 after monsoon landslide damage) underscores the lethal monsoon-Ghats reality. Mullayanagiri (1930m, Karnataka''s highest peak) summit road closed throughout the month. Baba Budan Giri (1895m), Manikyadhara Falls trek, Kemmangundi (1434m), Z Point, Hebbe Falls (peak monsoon flow visible only from base — the access road closes 2-3 days per week) suspended. Plantation walks completely suspended. The single Belavadi (Hoysala Veera Narayana 1200 CE, 29km) heritage access works as an indoor visit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 8, 2, 'wait',
  'SW monsoon continues. 16-25C, 600-800mm rainfall. NH-73 stabilising. Hebbe Falls peak.',
  'August holds the July pattern with marginally fewer extreme-rain days. NH-73 closure events drop. Hebbe Falls at peak monsoon flow. Mullayanagiri still closed. Wait for September for clean access.',
  'August at Chikmagalur holds the July pattern. 600-800mm rainfall, NH-73 closures continue 1-2 days per week, Mullayanagiri summit road still closed most days. Hebbe Falls peak flow visible from base. Wait for September for clean Western Ghats access.',
  'Chikmagalur in August holds the July monsoon pattern with marginally fewer extreme-rain days. 600-800mm rainfall across 22-25 wet days at the 1090m elevation. Daytime 21-25C feels mild but constant rain and 90 percent humidity strip outdoor activity. NH-73 Hassan-Chikmagalur (90km) closure events drop to 1-2 days per week though landslide watches stay active across the Western Ghats descent. Mullayanagiri (1930m, Karnataka''s highest peak) summit road still closed most days. Baba Budan Giri (1895m, the Sufi dargah of Hazrat Dada Hayath Mir Khalandar — the historical anchor of the Baba Budan coffee legend, 1670 smuggling of beans from Yemen) and Manikyadhara Falls trek closed. Kemmangundi (1434m) and Z Point lose visibility past 200m. Hebbe Falls (168m drop) at peak monsoon flow — visible from base if NH-73 holds. Independence Day (Aug 15) brings a small bump from Bengaluru weekend traffic — Plantation Trails properties (Tata Coffee) fill to 60 percent occupancy despite the conditions. Plantation walks suspended on most days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 9, 4, 'go',
  'SW monsoon retreats. 15-26C, 300-500mm rainfall easing. Mullayanagiri reopens. Plantations year-greenest.',
  'September is the recovery month. SW monsoon retreats from Karnataka by week 3, Mullayanagiri summit road reopens, plantation walks viable. Coffee plantations at year-greenest after the rains. Hotel rates at shoulder levels.',
  NULL,
  'Chikmagalur in September is the soft re-opening. Rainfall drops to 300-500mm across 16-19 wet days at the 1090m elevation, mostly the first fortnight. Daytime 23-26C, nights 15-17C, humidity easing toward 80 percent. The southwest monsoon retreats from interior Karnataka by September 20-25; NH-73 Hassan-Chikmagalur (90km) stabilises with closure events dropping to under 1 per week from mid-month. Mullayanagiri (1930m, Karnataka''s highest peak) summit road reopens with PWD clearance from week three — the 1.5km final-hairpin stretch plus 470-step temple climb return to viable access. Baba Budan Giri (1895m, the Sufi dargah and Manikyadhara Falls trek) and Z Point at Kemmangundi return to clear visibility. Hebbe Falls (168m drop) at sustained post-monsoon flow — visually one of the year''s best windows. Plantation walks resume — coffee bushes at year-greenest, the cherry development from the spring blossom now reaching ripening (Robusta peak harvest December-January, Arabica peak November-December). Tata Coffee, Coffee Day Estates, Devon Plantations all run guided tours. Coffee Museum at Hiremane village holds bean-to-cup demonstrations.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 10, 5, 'go',
  'Season opens. 14-26C. NE monsoon residual, plantations year-greenest. Hebbe Falls strong flow.',
  'October is the proper season opener. Mullayanagiri summit at full schedule, plantation walks at year-best green, Hebbe Falls at sustained flow. Hotel rates 25 percent below December peak.',
  NULL,
  'Chikmagalur in October is when the Western Ghats hill town returns to full operations. Daytime 23-26C at 1090m, nights 14-16C, humidity dropping toward 75 percent, rainfall 200-300mm — northeast monsoon overspill from Tamil Nadu hits mostly as 1-2 hour evening showers in the first fortnight. Plantation walks at year-second-greenest after the monsoon flush. Mullayanagiri (1930m, Karnataka''s highest peak) summit road at full schedule — the 1.5km final-hairpin and 470-step Shiva temple climb at clean dry-stone access from week two onward. Baba Budan Giri (1895m, the Sufi dargah of Hazrat Dada Hayath Mir Khalandar where Baba Budan smuggled 7 Mocha coffee beans from Yemen in 1670, planting the origin of the Indian coffee industry on these very hills) and Manikyadhara Falls trek (1.5km from dargah, 35min walk) at clean access. Kemmangundi (1434m, the Sahyadri viewpoint), Z Point sunset, Hebbe Falls (168m drop, accessible by 4WD from Kemmangundi base) at sustained post-monsoon flow. Coffee plantations at peak ripening — Robusta cherries at red-bunch visibility, Arabica development behind.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 11, 5, 'go',
  'High season builds. 13-26C, dry. Coffee Arabica harvest starting. Mullayanagiri clear, plantations photogenic.',
  'November is the genuine pivot to Chikmagalur high season. Rainfall under 100mm, NE monsoon residual easing, Arabica coffee harvest starting. Hotel rates climb 20 percent as Christmas-week books out.',
  NULL,
  'Chikmagalur in November is when the hill town turns the corner. Northeast monsoon overspill eases to under 100mm across 5-7 wet days, almost all in the first 10 days. Daytime 22-26C, nights 13-15C, humidity dropping toward 65 percent. Coffee Arabica harvest starting — the cherries at red-bunch peak visibility across plantations, hand-picking labour operations active 7am-5pm on every estate. Mullayanagiri (1930m, Karnataka''s highest peak) at full clear summit visibility — the 1.5km final-hairpin and 470-step Shiva temple climb at peak walking comfort. Baba Budan Giri (1895m, the Sufi dargah and Manikyadhara Falls trek) and Kemmangundi (1434m, Z Point sunset, Hebbe Falls 168m drop) all on full schedule. Plantation walks at year-best — Tata Coffee, Coffee Day Estates, Devon Plantations run extended hours through the harvest window. Coffee Museum at Hiremane village holds peak demonstrations. Karnataka Rajyotsava (November 1) brings a 1-day state-celebration bump. Belavadi (Hoysala Veera Narayana 1200 CE) at clean access; the combined Chikmagalur + Belur + Halebidu + Shravanabelagola (UNESCO Sacred Ensembles of the Hoysalas 2023) heritage circuit runs at peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chikmagalur', 12, 5, 'go',
  'Peak season. 11-24C, dry. Coffee Robusta + Arabica harvest. Christmas-NYE rates 2-2.5x.',
  'December is the year''s most reliable Chikmagalur window — peak weather, dry, full operational tempo. Coffee harvest at peak — Robusta + Arabica both active. Christmas-NYE (Dec 22-Jan 5) drives rates to 2-2.5x base.',
  NULL,
  'Chikmagalur in December is the year''s most coherent window — peak weather, full operational tempo, coffee harvest at peak. Daytime 22-24C at 1090m, nights 11-13C (some plantation locations drop to 9C late month), humidity 55 percent, rainfall under 20mm. Coffee Robusta peak harvest (Dec-Jan, the cherries hand-picked in 3-4 passes across each tree) plus Arabica peak harvest (Nov-Dec tail) — plantations at peak visual activity, drying patios full of cherry beans, processing facilities running daily. Mullayanagiri (1930m, Karnataka''s highest peak) at year-cleanest summit visibility — the 1.5km final-hairpin and 470-step Shiva temple climb works full-day. Baba Budan Giri (1895m, the Sufi dargah of Hazrat Dada Hayath Mir Khalandar — the historical Baba Budan who smuggled 7 Mocha coffee beans from Yemen in 1670, planting the origin of Indian coffee on these hills) and Manikyadhara Falls trek at peak access. Kemmangundi (1434m, the Sahyadri viewpoint), Z Point sunset, Hebbe Falls (168m drop, accessible by 4WD from Kemmangundi base) all on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
