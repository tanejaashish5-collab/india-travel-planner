-- Belur destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: belur | best_months [10,11,12,1,2,3,7,8,9] | avoid [4,5]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 1, 5, 'go',
  'Peak Hoysala window. 16-29C, dry. Chennakesava soapstone carvings at year-cleanest light.',
  'January is the strongest stretch for Belur. Daytime 27-29C, nights 16-17C, humidity 55 percent. Chennakesava Temple (1117 CE, UNESCO 2023 Sacred Ensembles of the Hoysalas) — the 48 uniquely carved pillars, 38 madanika celestial-maiden bracket figures, soapstone detail at year-cleanest light.',
  NULL,
  'Belur in January is the proper Hoysala stretch. Daytime 27-29C, nights 16-17C, humidity 55 percent, rainfall under 15mm. Hassan district sits in the Western Ghats foothills (940m elevation). Chennakesava Temple (1117 CE, Hoysala King Vishnuvardhana''s Talakad-victory commemoration over the Cholas — UNESCO 2023 Sacred Ensembles of the Hoysalas) opens 7:30am-7:30pm, ASI ₹40. The 48 pillars uniquely carved — no two identical — are the structural highlight; the central Narasimha Pillar (lathe-turned column that originally rotated) at the centre of the navaranga. The 38 madanikas (celestial maidens, bracket figures supporting the eaves) — each in a different pose: Darpana Sundari with mirror, Bhasma Mohini, the parrot-girl, the huntress, the dancer with anklet — at year-best detail in 9-11am morning light. Soapstone (chloritic schist) holds carved sharpness even after 900 years. The Sukha Nasi entrance with the Hoysala emblem (warrior fighting a lion), the star-plan plinth, the 644 elephants in the basement frieze. Velapuri was Belur''s ancient name. Hotels: Hoysala Village Resort ₹4-6k, Mallige Madhuvana ₹3-4.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 2, 5, 'go',
  'Driest month. 17-31C. Madanika photography year-best. Belur-Halebidu axis at peak comfort.',
  'February holds the technical peak with rainfall under 10mm. The 38 madanikas, the 48 unique pillars, and the soapstone-carved exterior walls at year-cleanest light. Standard Belur-Halebidu-Sravanabelagola three-temple day-trip at peak comfort.',
  NULL,
  'February in Belur is the year''s cleanest photography window for the Hoysala detail. Rainfall under 10mm, daytime 29-31C, nights 17-18C, humidity 50 percent. Chennakesava Temple (1117 CE Vishnuvardhana, UNESCO 2023) exterior walls — the 644-elephant basement frieze, the horseman/lion/makara/hamsa friezes above, the soapstone deity panels (Krishna lifting Govardhana, Narasimha tearing Hiranyakashipu, Trivikrama, celestial dancers) — all at year-best 9-11am morning light. The 38 madanikas on upper bracket positions — Darpana Sundari, Bhasma Mohini, the parrot-girl Sukasarika, the huntress, the dancer adjusting her anklet, the lady removing thorn from foot — each pose distinct; master-carvers signed many figures (Dasoja, Mallitamma). The Narasimha Pillar (lathe-turned rotating column) and the 48 uniquely carved pillars walk cleanly through afternoon. Day-trip axis: Halebidu 16km east + Sravanabelagola 90km southeast (57-foot Bahubali monolith — last Mahamastakabhisheka 2018, next 2030). Hotels at peak: Hoysala Village Resort ₹5-7k, Mallige Madhuvana ₹3.5-5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 3, 5, 'go',
  'Last cool month before April. 19-33C. Coffee Blossom Mar-Apr at adjacent Chikmagalur. Rates ease 20 percent.',
  'March extends the February window with the Western Ghats foothill (940m) elevation keeping daytime under 33C. Coffee Blossom 7-10 day window starts late March in adjacent Chikmagalur (60km north) — Belur-Chikmagalur combined trip viable.',
  NULL,
  'March in Belur is the last comfortable window before the brief April heat dip. Daytime 31-33C, nights 19-21C, humidity climbing from 55 to 65 percent, rainfall under 25mm. Hassan foothill 940m elevation keeps daytime under 33C even as the Northern Karnataka plateau hits 35C+ in March, making Belur a year-round-workable shoulder option. Chennakesava Temple (1117 CE Vishnuvardhana) full ritual hours; the 48 uniquely carved pillars and 38 madanika bracket figures at standard photographic light. Coffee Blossom 7-10 day window — when white coffee blossoms carpet Chikmagalur, Coorg, and Sakleshpur plantations after pre-monsoon showers trigger flowering — typically starts late March (weather-dependent). Adjacent Chikmagalur (60km north) is the Coffee Blossom heartland; the Belur-Chikmagalur combined trip is the standard Hoysala-plus-Coffee-Blossom shape. Halebidu 16km east day-trip viable. Hotels ease 20 percent off February peak: Hoysala Village Resort ₹4-5.5k, Mallige Madhuvana ₹2,800-4k, KSTDC Mayura Velapuri ₹1,800-2,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 4, 3, 'wait',
  'Pre-monsoon. 22-35C. Coffee Blossom peak in adjacent Chikmagalur. Temple walks compress past 11am.',
  'April is the brief warm period at Belur — Western Ghats foothill elevation (940m) limits the worst of the heat compared to Northern Karnataka. Coffee Blossom 7-10 day window typically peaks first half. Temple walks 6:30-10am and 4-6pm. Hotel rates 25 percent below February.',
  'April at Belur is workable but not optimal — the Hassan plateau hits 34-35C daytime, the temple''s open-plinth pradakshina walks heat up past 11am. The Coffee Blossom adjacent draw partially offsets. October-March is dramatically cleaner.',
  'April in Belur is the brief warm window before the southwest monsoon arrives. Daytime 33-35C, nights 22-24C, humidity 65 percent, rainfall 30-50mm from pre-monsoon thunderstorms in the last fortnight. Hassan foothill 940m elevation keeps the heat materially below the Northern Karnataka plateau (Belur 7-8C cooler than Hampi/Bijapur). The Coffee Blossom 7-10 day window typically peaks first half of April — white-blossom carpet at adjacent Chikmagalur (60km north). Chennakesava Temple open-plinth walks compress to 6:30-10am and 4-6pm; the 644-elephant frieze and 38 madanikas still walkable in shaded morning. Temple interior (soapstone navaranga with 48 carved pillars, the Narasimha lathe-turned pillar) holds cool through afternoon. Hotels 25 percent below February: Hoysala Village Resort ₹3,500-5k, Mallige Madhuvana ₹2,500-3,500, KSTDC Mayura Velapuri ₹1,500-2,500. October-March cleaner; April niche call with Coffee Blossom combination.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 5, 3, 'wait',
  'Pre-monsoon heat. 23-35C. Pre-monsoon thunderstorms last fortnight. Temple walks compress.',
  'May still works for Hoysala-specific trips with the temple interior as mid-day refuge. Pre-monsoon thunderstorms in the last fortnight knock daytime temperatures 3-4C. Belur-Halebidu axis viable in dawn-and-evening windows.',
  'May is at Belur is functional but compromised. Daytime 33-35C, humidity 70 percent, pre-monsoon evening thunderstorms break afternoons. The Hoysala detail is at full year-round display but the open-plinth walking compresses to 6:30-10am and 5-7pm. October-March cleaner.',
  'May in Belur is the pre-monsoon close. Daytime 33-35C, nights 23-25C, humidity 70 percent, rainfall 60-90mm from pre-monsoon thunderstorms — the last fortnight sees heavy late-afternoon squalls that drop temperatures 3-4C temporarily. Hassan foothill 940m elevation keeps the worst of the heat off — temple walks compress to 6:30-10am and 5-7pm but remain materially more workable than the Northern Karnataka plateau. Chennakesava Temple''s soapstone interior (navaranga with 48 carved pillars, the Narasimha lathe-turned column) holds 26-28C cool through afternoon as natural mid-day refuge. The 38 madanikas on upper bracket positions photographic in morning light. The 644-elephant basement frieze walks viable. Halebidu 16km east day-trip viable. Coffee Blossom past peak; the white carpet at adjacent Chikmagalur dries by mid-May. Hotels at year-low: Hoysala Village Resort ₹3-4k, Mallige Madhuvana ₹2-3k. Functional only for school-holiday May travelers. July onward delivers the year-cleaner Western-Ghats-monsoon-greens experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 6, 4, 'go',
  'SW monsoon arrives. 22-30C, 150-200mm rain. Hoysala interior holds dry. Green-Ghats landscape opens.',
  'June is the start of the Western Ghats green-monsoon window. The southwest monsoon hits Hassan district from June 5-10; rainfall 150-200mm across 14-16 wet days. Chennakesava Temple interior holds dry; the temple exterior soapstone darkens dramatically in the wet.',
  NULL,
  'June in Belur is the start of the Western Ghats green-monsoon window. The southwest monsoon hits Hassan district June 5-10; rainfall 150-200mm across 14-16 wet days. Daytime drops to 28-30C, nights 22-23C, humidity 85 percent. Chennakesava Temple interior (soapstone navaranga with 48 carved pillars, the Narasimha lathe-turned column, the 38 madanikas, the central deity) holds dry and cool through any rain. The open-plinth pradakshina with the 644-elephant basement frieze walks well in morning windows between showers. The soapstone darkens dramatically in the wet — chloritic-schist takes on a deeper grey-green that contrasts beautifully with the carved detail. The Hassan plateau and Western Ghats foothills at year-best green. Chikmagalur 60km north at peak monsoon coffee-plantation visual. Halebidu 16km east day-trip viable. Hotels at off-peak: Hoysala Village Resort ₹3-4.5k, Mallige Madhuvana ₹2,500-3,500. UNESCO Hoysala detail under wet-season soapstone-dark is a legitimate Belur shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 7, 4, 'go',
  'Monsoon peak. 21-28C, 250-320mm rain. Soapstone temple dark and dramatic. Green-Ghats landscape.',
  'July is peak Western Ghats monsoon at Belur. Heavy rainfall 250-320mm but the Hoysala interior (1117 CE soapstone navaranga) holds dry. The exterior darkened by wet to dramatic effect. Green-Ghats landscape at year-best.',
  NULL,
  'July in Belur is the peak Western Ghats monsoon. Rainfall 250-320mm across 18-22 wet days, daytime 27-28C, nights 21-22C, humidity 90 percent. Chennakesava Temple''s soapstone construction darkens to a deeper grey-green under sustained wet, contrasting beautifully with the carved detail of the 644-elephant frieze, the 38 madanika bracket figures, the deity panels. Temple interior (navaranga with 48 carved pillars, the Narasimha lathe-turned column, the central Krishna-Kesava deity) holds dry and 26-28C cool through any rain. The open-plinth pradakshina walks workable 8-10:30am and 4-6:30pm between heavy squalls. The Hassan district and Western Ghats foothills at year-greenest — the Bhadra and Hemavathi rivers at flood-stage, coffee plantations at Chikmagalur at peak monsoon dark-green. Halebidu 16km east similar pattern. Hotels at off-peak: Hoysala Village Resort ₹3,500-5k, Mallige Madhuvana ₹2,500-3,500. Pack waterproof. Hoysala detail under wet-season soapstone-dark is a niche but legitimate visual register.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 8, 4, 'go',
  'Monsoon strong. 21-28C, 200-260mm rain. Green-Ghats peak. Soapstone temple dramatic.',
  'August holds July''s monsoon pattern (200-260mm). The Hoysala temple wet-season visual register at year-best. Surrounding Hassan plateau and Western Ghats foothills at year-greenest.',
  NULL,
  'August in Belur continues the peak Western Ghats monsoon. Rainfall 200-260mm across 17-20 wet days, daytime 27-28C, nights 21-22C, humidity 90 percent. The Hoysala wet-season visual register at year-best: the Chennakesava Temple''s soapstone darkens to deepest wet-season grey-green, contrasting against the carved detail of the 644-elephant basement frieze, the 38 madanikas on bracket positions, the deity panels (Krishna-Govardhana, Narasimha-Hiranyakashipu, Trivikrama, celestial dancers). Temple interior holds dry; the 48 uniquely carved pillars, the Narasimha lathe-turned column, the central deity. The temple''s open-plinth pradakshina walks workable in morning windows between heavy squalls. The Hassan district and Western Ghats foothills at peak green — coffee plantations at adjacent Chikmagalur in the second-flush coffee-pick window. The Hemavathi river runs strong; Halebidu day-trip 16km east viable. Hotels at off-peak monsoon rates: Hoysala Village Resort ₹3,500-5k, Mallige Madhuvana ₹2,500-3,500, KSTDC Mayura Velapuri ₹1,500-2,500. The August school-holiday window often pairs well with the wet-season Hoysala visit; pack waterproof, allow buffer days for flight diversions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 9, 4, 'go',
  'Monsoon easing. 20-29C, 150-200mm rain. Hoysala detail at peak green-Ghats backdrop. Wet-and-clear pattern.',
  'September is the monsoon ease month. Rainfall drops to 150-200mm; wet mornings and clearer afternoons. The Hoysala detail and green-Ghats backdrop at year-best photographic combination.',
  NULL,
  'September in Belur is the monsoon ease month. The southwest monsoon starts to retreat from the Karnataka interior in the last week of September. Rainfall drops to 150-200mm across 14-16 wet days, daytime 27-29C, nights 20-21C, humidity 85 percent. The wet-and-clear weather pattern shifts: morning rain followed by partly-clear afternoons becomes the standard rhythm. The Hoysala temple visit returns to peak photographic comfort — Chennakesava''s soapstone exterior still wet-season dark, the carved detail of the 38 madanikas, 644-elephant frieze, and deity panels in clean morning light. The surrounding Hassan plateau and Western Ghats foothills at year-best green — the contrast between Hoysala soapstone temples and the green Western Ghats backdrop is the photographic standout of the Belur year. Halebidu 16km east day-trip at peak visual comfort. Hotels climb 15 percent off August rates as the monsoon ease becomes apparent: Hoysala Village Resort ₹3,800-5,500, Mallige Madhuvana ₹2,800-4k, KSTDC Mayura Velapuri ₹1,800-2,800. October 15 onward delivers full clean weather; September offers value pricing combined with the year''s greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 10, 5, 'go',
  'Season opens. 18-29C, 80-120mm rain. Post-monsoon green-Ghats. Hoysala detail at peak comfort.',
  'October is the season opener. Monsoon ease through the first half (80-120mm); the back half dry-clear. Post-monsoon green-Ghats landscape at peak. Chennakesava and Halebidu walks at year-best photographic comfort.',
  NULL,
  'October in Belur is the full return to the heritage circuit. The southwest monsoon officially retreats around October 10-15 — first half carries 80-120mm of monsoon ease, the back half flips into clean weather. Daytime 27-29C, nights 18-20C, humidity easing from 85 to 70 percent. The post-monsoon green Western Ghats foothills hold through October — visual sweet spot for the Hoysala-soapstone-and-green-Ghats landscape. Chennakesava Temple (1117 CE Vishnuvardhana, UNESCO 2023) walks at year-best comfort — the 644-elephant basement frieze, the 38 madanikas (Darpana Sundari, Bhasma Mohini, parrot-girl, huntress, dancer), the 48 uniquely carved pillars, the Narasimha lathe-turned central column. The soapstone (chloritic schist that allowed Hoysala master-carvers Dasoja and Mallitamma to achieve detail impossible in granite) shows year-best detail clarity. Halebidu 16km east day-trip and Sravanabelagola 90km southeast (the 57-foot Bahubali monolith) viable as the three-temple Hoysala-Jain circuit. Hotels 25-30 percent below January peak: Hoysala Village Resort ₹4-5.5k, Mallige Madhuvana ₹2,800-4k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Hoysala photography year-best detail.',
  'November is the proper pivot to peak. Rainfall under 30mm, full Hoysala-circuit walking, Karnataka Rajyotsava Nov 1. The Chennakesava 38 madanikas and 48 pillars at year-best photographic detail.',
  NULL,
  'November in Belur is the year''s second-peak month behind January-February. Rainfall under 30mm, daytime 26-28C, nights 17-19C, humidity dropping below 65 percent. Air visibility at its annual cleanest. The Hoysala-detail circuit walks at year-best photographic comfort. Chennakesava Temple (1117 CE Vishnuvardhana, the Talakad-victory commemoration, UNESCO 2023) — the 644-elephant basement frieze, the horseman/lion/makara/hamsa friezes above, the soapstone deity panels (Krishna lifting Govardhana, Narasimha tearing Hiranyakashipu, Trivikrama), the 38 madanikas — at year-best 9-11am oblique morning light. The 48 uniquely carved pillars walk cleanly through the navaranga; the Narasimha lathe-turned central column (the engineering feat of 12th-century soapstone lathe-work) at clean detail. Halebidu 16km east day-trip and Sravanabelagola 90km southeast viable. Karnataka Rajyotsava (November 1, state formation day) cultural programming in Hassan district HQ 35km southeast. Hotels climb to 75 percent of January peak: Hoysala Village Resort ₹4,500-6,500, Mallige Madhuvana ₹3,200-4,500. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('belur', 12, 5, 'go',
  'Peak season. 15-27C, dry. Christmas-NYE moderate rate spike. Hoysala detail year-cleanest.',
  'December is operational peak. Daytime 25-27C, nights 15-16C, year-cleanest air visibility. Chennakesava and Halebidu at year-best. Christmas-NYE 1.5-2x rates.',
  NULL,
  'December in Belur is the operational peak. Daytime 25-27C, nights drop to 15-16C, humidity 55 percent, rainfall under 20mm. Hassan''s 940m foothill makes December nights crisp — pack light layers. Air visibility at annual best. The Hoysala-detail circuit at year-cleanest photographic light. Chennakesava Temple (1117 CE Vishnuvardhana, UNESCO 2023) — the 644-elephant basement frieze, the 38 madanikas (Darpana Sundari, Bhasma Mohini, Sukasarika, the huntress, the dancer adjusting her anklet), the 48 uniquely carved pillars, the Narasimha lathe-turned central column, the soapstone deity panels (Krishna-Govardhana, Narasimha-Hiranyakashipu, Trivikrama) — all at year-best 9-11am morning light. Halebidu 16km east day-trip at peak comfort — Hoysaleshwara''s 240-panel narrative frieze (Ramayana, Mahabharata, Bhagavata) at year-cleanest readability. Sravanabelagola 90km southeast (57-foot Bahubali monolith — last Mahamastakabhisheka 2018, next 2030) viable as third-temple day. Christmas-NYE (December 22 to January 5) sees moderate rate lift: Hoysala Village Resort ₹5-7k. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
