-- Halebidu destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: halebidu | best_months [10,11,12,1,2,3,7,8,9] | avoid [4,5]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 1, 5, 'go',
  'Peak Hoysala window. 16-29C, dry. Hoysaleshwara 240-panel narrative frieze at year-cleanest light.',
  'January is the strongest stretch for Halebidu. Daytime 27-29C, nights 16-17C. Hoysaleshwara Temple (1121 CE, UNESCO 2023) — twin shikhara, 240-plus wall panels (Ramayana, Mahabharata, Bhagavata), monolithic Nandi, Kedareshwara adjacent — at year-cleanest light.',
  NULL,
  'Halebidu in January is the proper Hoysala stretch. Daytime 27-29C, nights 16-17C, humidity 55 percent, rainfall under 15mm. Hassan district''s Western Ghats foothill location (930m elevation). Hoysaleshwara Temple (1121 CE, UNESCO 2023 Sacred Ensembles of the Hoysalas) opens 7:30am-7:30pm, ASI ₹40. The temple is famously unfinished — 60-year construction abandoned when Malik Kafur sacked the Hoysala capital Dwarasamudra in 1311; Halebidu literally means "old city" in Kannada. The twin shikhara (sanctums for Hoysaleshwara and Shantaleshwara joined by a connecting mandapa) was never crowned. The 240-plus wall panels — running the full plinth circumference, narrating Ramayana, Mahabharata, and Bhagavata Purana scenes — are the most extensive narrative frieze in any Indian temple. The monolithic Nandi facing the east entrance (largest single-block Nandi in South India at 4.6m / 15 feet long) at year-best comfort. Kedareshwara Temple (smaller adjacent twin-shikhara) and Basadi Halli Jain complex 1km southwest (four 12th-c basadis — Parshwanatha, Adinatha, Shantinatha, Vijayanatha). Hotels at Belur 16km west: Hoysala Village Resort ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 2, 5, 'go',
  'Driest month. 17-31C. 240-panel frieze photography year-best. Belur-Halebidu axis at peak comfort.',
  'February holds the technical peak with rainfall under 10mm. The Hoysaleshwara 240-plus wall panels narrative frieze and the soapstone-carved exterior at year-cleanest light. Standard Belur-Halebidu-Sravanabelagola three-temple day-trip at peak comfort.',
  NULL,
  'February in Halebidu is the year''s cleanest photography window for the 240-panel narrative frieze. Rainfall under 10mm, daytime 29-31C, nights 17-18C, humidity 50 percent. Hoysaleshwara Temple (1121 CE, UNESCO 2023, abandoned in the 1311 Malik Kafur invasion) — the 240-plus wall panels narrating Ramayana (south wall: Rama-Lakshmana-Sita, Hanuman crossing the sea, Lanka battle), Mahabharata (west wall: Bhima-Duryodhana, Kurukshetra), and Bhagavata Purana (north wall: Krishna-leela) — at year-best 9-11am morning light. The friezes below (basement courses with elephants, horses, lions, makaras, swans) hold detail in morning sun. The twin shikhara (Hoysaleshwara and Shantaleshwara joined by the navaranga) sits unfinished — upper towers never built, visible legacy of the 1311 sack. The monolithic Nandi (4.6m, largest single-block in South India) at year-best comfort. Kedareshwara Temple and Basadi Halli Jain complex (1km southwest, four 12th-c basadis) walk cleanly. Hotels at peak: Hoysala Village Resort (Belur 16km west) ₹5-7k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 3, 5, 'go',
  'Last cool month before April. 19-33C. Coffee Blossom Mar-Apr at adjacent Chikmagalur. Rates ease 20 percent.',
  'March extends the February window. Hassan foothill (930m) keeps daytime under 33C even as the Northern Karnataka plateau heats up. Coffee Blossom 7-10 day window starts late March in adjacent Chikmagalur (60km north). Hotel rates ease 20 percent.',
  NULL,
  'March in Halebidu is the last comfortable window before the brief April heat dip. Daytime 31-33C, nights 19-21C, humidity climbing from 55 to 65 percent, rainfall under 25mm. Hassan foothill 930m elevation keeps daytime under 33C even as the Northern Karnataka plateau hits 35C+ in March. Hoysaleshwara Temple (1121 CE, UNESCO 2023) full ritual hours; the 240-panel narrative frieze, twin shikhara, monolithic Nandi, Kedareshwara adjacent at standard photographic light. Coffee Blossom 7-10 day window — when white coffee blossoms carpet adjacent Chikmagalur and Coorg plantations — typically starts late March (weather-dependent). Belur 16km west day-trip combined with Halebidu makes the standard two-day Hoysala-circuit shape. Basadi Halli Jain complex (1km southwest, four 12th-c basadis) walks cleanly. Hotels ease 20 percent: Hoysala Village Resort (Belur) ₹4-5.5k, Mallige Madhuvana ₹2,800-4k. Sravanabelagola 90km southeast (57-ft Bahubali monolith — last Mahamastakabhisheka 2018, next 2030) viable third-temple day.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 4, 3, 'wait',
  'Pre-monsoon. 22-35C. Coffee Blossom peak adjacent. Temple walks compress past 11am.',
  'April is the brief warm period at Halebidu — foothill 930m elevation limits the worst of the heat compared to Northern Karnataka. Coffee Blossom 7-10 day window typically peaks first half. Temple walks 6:30-10am and 4-6pm.',
  'April at Halebidu is workable but not optimal — Hassan plateau hits 34-35C daytime, the temple''s open-plinth pradakshina walks heat up past 11am. The Coffee Blossom adjacent draw partially offsets. October-March is dramatically cleaner.',
  'April in Halebidu is the brief warm window before the southwest monsoon arrives. Daytime 33-35C, nights 22-24C, humidity 65 percent, rainfall 30-50mm from pre-monsoon thunderstorms in the last fortnight. Hassan foothill 930m elevation keeps the heat materially below the Northern Karnataka plateau peak (Hampi/Bijapur 40-42C in the same window — Halebidu 7-8C cooler). The Coffee Blossom 7-10 day window typically peaks the first half of April — white blossom carpet at adjacent Chikmagalur (60km north). Hoysaleshwara Temple open-plinth walks compress to 6:30-10am and 4-6pm; the 240-panel narrative frieze (Ramayana on south wall, Mahabharata on west wall, Bhagavata on north wall) still walkable in shaded morning. The temple''s soapstone interior (the navaranga with the twin sanctums) holds 27-29C cool through afternoon. The monolithic Nandi in the open east-facing mandapa heats up in direct sun by 11am. Kedareshwara and Basadi Halli Jain complex walks compress similarly. Hotels 25 percent below February: Hoysala Village Resort (at Belur) ₹3,500-5k, Mallige Madhuvana ₹2,500-3,500, KSTDC Mayura Velapuri ₹1,500-2,500. October-March cleaner; April niche call with Coffee Blossom combination.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 5, 3, 'wait',
  'Pre-monsoon heat. 23-35C. Pre-monsoon thunderstorms. Temple walks compress.',
  'May still works for Hoysala-specific trips with the temple interior as mid-day refuge. Pre-monsoon thunderstorms in the last fortnight drop daytime temperatures 3-4C. The 240-panel narrative frieze workable in dawn windows.',
  'May at Halebidu is functional but compromised. Daytime 33-35C, humidity 70 percent, pre-monsoon evening thunderstorms break afternoons. The Hoysala detail is at full year-round display but the open-plinth walking compresses to 6:30-10am and 5-7pm. October-March cleaner.',
  'May in Halebidu is the pre-monsoon close. Daytime 33-35C, nights 23-25C, humidity 70 percent, rainfall 60-90mm from increasing pre-monsoon thunderstorms — the last fortnight sees heavy late-afternoon squalls that drop daytime temperatures 3-4C temporarily. Hassan foothill 930m elevation keeps the worst of the heat off — the temple-and-circuit walks compress to 6:30-10am and 5-7pm but remain materially more workable than the Northern Karnataka plateau. Hoysaleshwara Temple''s soapstone interior (the twin-sanctum navaranga, the connecting mandapa) holds 27-29C cool through afternoon as natural mid-day refuge. The 240-panel narrative frieze photographic in morning light. The monolithic Nandi in the open east-facing mandapa heats up; better viewed pre-9am or post-5pm. The Kedareshwara adjacent and Basadi Halli Jain complex walk similar pattern. Coffee Blossom past peak; the white-blossom carpet at adjacent Chikmagalur dries by mid-May. Hotels at year-low: Hoysala Village Resort (at Belur) ₹3-4k, Mallige Madhuvana ₹2-3k, KSTDC Mayura Velapuri ₹1,200-2,000. Functional only for travelers locked to school-holiday May. July onward delivers the Western-Ghats-monsoon-greens experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 6, 4, 'go',
  'SW monsoon arrives. 22-30C, 150-200mm rain. Hoysaleshwara interior holds dry. Green-Ghats opens.',
  'June is the start of the Western Ghats green-monsoon window. The southwest monsoon hits Hassan district from June 5-10; rainfall 150-200mm. Hoysaleshwara interior holds dry; soapstone exterior darkens dramatically in wet.',
  NULL,
  'June in Halebidu is the start of the Western Ghats green-monsoon window. The southwest monsoon hits Hassan district June 5-10 as the current crosses the Western Ghats; rainfall 150-200mm across 14-16 wet days, mostly intense late-afternoon and overnight squalls. Daytime drops to 28-30C, nights 22-23C, humidity 85 percent. Hoysaleshwara Temple interior (twin-sanctum navaranga, connecting mandapa, carved pillars) holds dry and cool through any rain. The 240-panel narrative frieze (Ramayana, Mahabharata, Bhagavata) on the open-plinth exterior walks well in morning windows between showers. The temple''s soapstone darkens dramatically in the wet — chloritic-schist takes on a deeper grey-green that contrasts beautifully with the carved detail. The monolithic Nandi (4.6m, largest single-block in South India) in the open east-facing mandapa walked in morning light. Kedareshwara and Basadi Halli Jain complex similar pattern. The Hassan plateau and Western Ghats foothills at year-best green. Hotels at off-peak: Hoysala Village Resort (Belur) ₹3-4.5k, Mallige Madhuvana ₹2,500-3,500. UNESCO Hoysala detail under wet-season soapstone-dark with monsoon backdrop is a legitimate Halebidu shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 7, 4, 'go',
  'Monsoon peak. 21-28C, 250-320mm rain. Soapstone temple dark and dramatic. Green-Ghats peak.',
  'July is peak Western Ghats monsoon at Halebidu. Heavy rainfall 250-320mm but the Hoysaleshwara interior holds dry. The 240-panel frieze exterior darkened by wet to dramatic effect.',
  NULL,
  'July in Halebidu is the peak Western Ghats monsoon. Rainfall 250-320mm across 18-22 wet days, daytime 27-28C, nights 21-22C, humidity 90 percent. Hoysaleshwara''s soapstone darkens to a deeper grey-green under sustained wet, contrasting beautifully against the carved detail of the 240-panel narrative frieze, and the friezes of elephants, horses, lions, makaras, swans below. Temple interior (twin-sanctum navaranga, connecting mandapa, carved pillars and ceiling rosettes) holds dry and 26-28C cool through any rain. The open-plinth pradakshina with the 240 panels walks workable 8-10:30am and 4-6:30pm between heavy squalls. The monolithic Nandi (4.6m, largest single-block in South India) in the open east mandapa under wet-season dark. The Hassan district and Western Ghats foothills at year-greenest. Halebidu was the original Hoysala capital — Dwarasamudra — sacked by Malik Kafur in 1311, abandoned and renamed Halebidu ("old city"). Hotels at off-peak: Hoysala Village Resort (Belur) ₹3,500-5k, Mallige Madhuvana ₹2,500-3,500. Pack waterproof.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 8, 4, 'go',
  'Monsoon strong. 21-28C, 200-260mm rain. Green-Ghats peak. Soapstone dramatic.',
  'August holds July''s monsoon pattern (200-260mm). The Hoysaleshwara wet-season visual register at year-best. Hassan plateau and Western Ghats foothills at year-greenest.',
  NULL,
  'August in Halebidu continues the peak Western Ghats monsoon. Rainfall 200-260mm across 17-20 wet days, daytime 27-28C, nights 21-22C, humidity 90 percent. Hoysaleshwara''s soapstone darkens to deepest wet-season grey-green, contrasting against the carved detail of the 240-panel narrative frieze. The Ramayana frieze on the south wall (Rama-Lakshmana-Sita, Sita''s abduction, Hanuman crossing the sea, Lanka battle) and Mahabharata frieze on the west wall (Bhima-Duryodhana mace fight, Kurukshetra scenes) at year-best wet-soapstone photographic depth. Temple interior holds dry. The monolithic Nandi (4.6m) in the open east mandapa under wet-dark photography. The Hassan district and Western Ghats foothills at peak green — coffee plantations at adjacent Chikmagalur in the second-flush coffee-pick window. Kedareshwara and Basadi Halli Jain complex at standard hours. Hotels at off-peak: Hoysala Village Resort (Belur) ₹3,500-5k, Mallige Madhuvana ₹2,500-3,500. Pack waterproof, allow buffer days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 9, 4, 'go',
  'Monsoon easing. 20-29C, 150-200mm rain. Hoysala detail at peak green-Ghats backdrop.',
  'September is the monsoon ease month. Rainfall drops to 150-200mm; wet mornings and clearer afternoons. The 240-panel narrative frieze at year-best with green-Ghats backdrop.',
  NULL,
  'September in Halebidu is the monsoon ease month. The southwest monsoon starts to retreat from the Karnataka interior in the last week of September. Rainfall drops to 150-200mm across 14-16 wet days, daytime 27-29C, nights 20-21C, humidity 85 percent. The wet-and-clear weather pattern shifts: morning rain followed by partly-clear afternoons becomes standard rhythm. Hoysaleshwara returns to peak photographic comfort — soapstone exterior still wet-season dark, the 240-panel narrative frieze (Ramayana on south wall, Mahabharata on west wall, Bhagavata on north wall) in clean morning light. The temple''s twin-shikhara design (unfinished after the 1311 Malik Kafur sack — the flat upper-roof character is the visible legacy of abandonment) at peak photographic visibility. The monolithic Nandi (4.6m, largest single-block in South India) at year-cleanest morning light. The Hassan plateau and Western Ghats foothills at year-best green — the soapstone-against-green-Ghats sweet spot. Belur 16km west day-trip at peak comfort. Hotels climb 15 percent off August: Hoysala Village Resort (Belur) ₹3,800-5,500, Mallige Madhuvana ₹2,800-4k. September offers value pricing with year-greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 10, 5, 'go',
  'Season opens. 18-29C, 80-120mm rain. Post-monsoon green-Ghats. 240-panel frieze at peak comfort.',
  'October is the season opener. Monsoon ease through the first half (80-120mm); the back half dry-clear. Post-monsoon green-Ghats landscape at peak. Hoysaleshwara and Belur walks at year-best photographic comfort.',
  NULL,
  'October in Halebidu is the full return to the heritage circuit. The southwest monsoon officially retreats around October 10-15 — first half of the month carries 80-120mm, back half flips into clean weather. Daytime 27-29C, nights 18-20C, humidity easing from 85 to 70 percent. The post-monsoon green Western Ghats foothills hold through October — visual sweet spot for the Hoysala-soapstone-and-green-Ghats landscape. Hoysaleshwara Temple (1121 CE, UNESCO 2023) walks at year-best photographic comfort. The 240-plus wall panels at year-best detail readability: Ramayana (Rama-Lakshmana-Sita, Sita-haran, Hanuman-Lanka), Mahabharata (Bhima-Duryodhana, Kurukshetra), Bhagavata (Krishna-leela) in clean morning light. The basement friezes (elephants, horsemen, lions, makaras, swans) walk cleanly. The monolithic Nandi (4.6m, largest single-block in South India) at peak visit comfort. Kedareshwara Temple and Basadi Halli Jain complex walk well. Belur 16km west and Sravanabelagola 90km southeast viable as three-temple circuit. Hotels 25-30 percent below January peak: Hoysala Village Resort (Belur) ₹4-5.5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. 240-panel frieze photography year-best detail.',
  'November is the proper pivot to peak. Rainfall under 30mm, full Hoysala-circuit walking, Karnataka Rajyotsava Nov 1. The Hoysaleshwara 240-panel narrative frieze at year-best photographic detail.',
  NULL,
  'November in Halebidu is the year''s second-peak month behind January-February. Rainfall under 30mm, daytime 26-28C, nights 17-19C, humidity dropping below 65 percent. Air visibility at its annual cleanest. The Hoysala-detail circuit walks at year-best photographic comfort. Hoysaleshwara Temple (1121 CE, the unfinished masterpiece — 60-year construction abandoned with the 1311 sack of Dwarasamudra, the original Hoysala capital) — the 240-plus wall panels narrating Ramayana, Mahabharata, and Bhagavata scenes — at year-best 9-11am oblique morning light. The basement friezes (elephants, horsemen, lions, makaras, swans, warrior, celestial) at peak detail. The twin shikhara unfinished upper structure (visible legacy of the 1311 abandonment) at year-cleanest photographic light. The monolithic Nandi (4.6m, largest single-block in South India) in the open east mandapa. Kedareshwara Temple and Basadi Halli Jain complex walks at peak comfort. Karnataka Rajyotsava (November 1) cultural programming in Hassan district HQ 35km southeast. Hotels climb to 75 percent of January peak: Hoysala Village Resort (Belur) ₹4,500-6,500, Mallige Madhuvana ₹3,200-4,500. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('halebidu', 12, 5, 'go',
  'Peak season. 15-27C, dry. Christmas-NYE moderate rate spike. 240-panel frieze year-cleanest.',
  'December is operational peak. Daytime 25-27C, nights 15-16C, year-cleanest air visibility. Hoysaleshwara and Belur at year-best. Christmas-NYE 1.5-2x rates.',
  NULL,
  'December in Halebidu is the operational peak. Daytime 25-27C, nights drop to 15-16C, humidity 55 percent, rainfall under 20mm. Hassan''s 930m foothill makes December nights crisp — pack light layers. Air visibility at annual best. The Hoysala-detail circuit at year-cleanest photographic light. Hoysaleshwara Temple (1121 CE, UNESCO 2023, abandoned after the 1311 Malik Kafur sack — Halebidu literally means "old city" in Kannada) — the 240-plus wall panels (Ramayana, Mahabharata, Bhagavata), the basement elephant-horse-lion-makara-swan friezes, the twin unfinished shikhara — all at year-best 9-11am morning light. The monolithic Nandi (4.6m / 15 feet, largest single-block in South India). Kedareshwara Temple and Basadi Halli Jain complex (four 12th-c basadis — Parshwanatha, Adinatha, Shantinatha, Vijayanatha) walks at peak comfort. Belur 16km west and Sravanabelagola 90km southeast (57-foot Bahubali monolith — last Mahamastakabhisheka 2018, next 2030) viable as three-temple circuit. Christmas-NYE (December 22 to January 5) sees moderate rate lift: Hoysala Village Resort (Belur) ₹5-7k. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
