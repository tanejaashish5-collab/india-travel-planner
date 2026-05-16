-- Gulbarga (Kalaburagi) destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: gulbarga | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 1, 5, 'go',
  'Peak Bahmani-first-capital window. 15-29C, dry. Jama Masjid, Bande Nawaz Dargah, Haft Gumbaz at year-cleanest.',
  'January is the strongest stretch for Gulbarga. Daytime 27-29C, nights 15-16C. Jama Masjid (1367, India''s only fully-roofed mosque), Khwaja Bande Nawaz Dargah (1422 Sufi shrine), Haft Gumbaz tombs, Gulbarga Fort, and the Sannati Buddhist excavations all walk cleanly.',
  NULL,
  'Gulbarga (officially renamed Kalaburagi in 2014) in January is the proper Bahmani-first-capital stretch. Daytime 27-29C, nights 15-16C, humidity 50 percent, rainfall under 10mm. The Bahmani Sultanate''s first capital 1347-1424 (before the move to Bidar in 1429). Jama Masjid inside Gulbarga Fort (1367, built by Bahmani Sultan Muhammad Shah I — the only fully-roofed mosque in India, no open courtyard, modeled on the Mosque of Cordoba) opens 9am-5pm, free entry, modest dress — the 75 small domes covering 38,000 sq ft is the architectural feat. Khwaja Bande Nawaz Dargah (1422, shrine of Hazrat Khwaja Syed Muhammad Gisudaraz Bandanawaz — the Chishti Sufi who moved from Delhi 1397, taught Sufism to the Bahmani nobility) opens 4am-10pm, free entry, qawwali Thursday evenings, annual urs in November. Haft Gumbaz Bahmani Tombs north of Gulbarga — Firoz Shah Bahmani (1422) and five others. Gulbarga Fort (1347 — Bahmani founders'' capital fortress). Sharana Basaveshwara Temple. The Buddhist Sannati site (75km southeast — 1st-c BCE Andhra-style stupa with relic-casket). Hotels: Heritage Inn ₹2,500-4k, Pariwar ₹1,800-3k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 2, 5, 'go',
  'Driest month. 17-32C. Jama Masjid Cordoba-model interior at year-best detail. Bande Nawaz Thursday qawwali.',
  'February holds the technical peak with rainfall under 5mm. Jama Masjid 75-dome interior at year-cleanest light. Bande Nawaz Dargah Thursday-evening qawwali at peak listener comfort. Bahmani-circuit walking at peak.',
  NULL,
  'February in Gulbarga is the year''s cleanest photography window for the Bahmani-Sufi circuit. Rainfall under 5mm, daytime 30-32C, nights 17-18C, humidity 45 percent. Jama Masjid (1367 — India''s only fully-roofed mosque, 75 domes covering 38,000 sq ft, Cordoba Spain the reference) at year-best interior light — arrive 9-11am for the dome-light study, the calligraphic mihrab, the basalt columns. Khwaja Bande Nawaz Dargah (1422 — the Chishti Sufi who taught the Bahmani court Sufism, largest Sufi shrine in Karnataka) at year-cleanest pilgrim experience. Thursday-evening qawwali (typically 7-9pm) at peak acoustics in the dry season. Haft Gumbaz Bahmani Tombs (Firoz Shah the largest, multi-dome basalt) walks comfortable. Gulbarga Fort (1347 — Bahmani founders'' capital, citadel walls and Buland Darwaza) at year-best traction. Sharana Basaveshwara Temple at standard hours. The Buddha Vihar at Sannati (75km southeast, 1st-c BCE Satavahana stupa with relic-casket) viable as day-trip. Hotels at peak: Heritage Inn ₹3-4.5k, Pariwar ₹2,200-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 3, 4, 'go',
  'Last cool month. 19-35C. Jama Masjid roofed interior holds cool. Outdoor walks compress past 11am.',
  'March extends the February window. Heat builds late month. The Jama Masjid fully-roofed interior holds cool through afternoon — a year-round refuge — but the outdoor Bahmani Tombs and Gulbarga Fort walks compress to 6:30-10am and 4-6pm. Rates ease 25 percent.',
  NULL,
  'March in Gulbarga is the soft-landing month before the heat dome opens. Daytime 33-35C, nights 19-21C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The Jama Masjid (1367, India''s only fully-roofed mosque) interior holds cool through the day — the unique architectural feature (75-dome enclosed prayer hall, no open courtyard, the Cordoba Spain model) functions as a natural mid-day refuge that the rest of the Bahmani circuit cannot match. Bande Nawaz Dargah interior cool (the granite construction and the ventilated dargah courtyard). Outdoor walks compress to 6:30-10am and 4-6pm: Gulbarga Fort 1.5km perimeter, Haft Gumbaz Bahmani Tombs (Firoz Shah, Taj-ud-Din Firoz, and five others spread across a 500m row), Sharana Basaveshwara Temple complex. The Sannati Buddhist day-trip (75km southeast) viable as full day with mid-day shade-break at the Buddha Vihar interior. Hotels ease 25 percent: Heritage Inn ₹2-3.5k, Pariwar ₹1,500-2,800, KSTDC Mayura Bahmani ₹1,500-2,500. Last clean-value window before April-June.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 4, 1, 'skip',
  'Heat dome opens. 23-41C. Outdoor circuit unworkable. Jama Masjid roofed interior holds. Skip strict.',
  NULL,
  'April pushes Gulbarga into the strict-skip stretch. Northern Karnataka plateau hits 40-41C. Outdoor Bahmani Tombs walk, Gulbarga Fort perimeter, Sannati day-trip all unworkable. The fully-roofed Jama Masjid interior stays cool but the rest of the circuit fails. Push to October.',
  'April in Gulbarga is the start of the strict-skip stretch. Daytime 39-41C, nights 23-25C, humidity 35 percent, rainfall under 10mm — Northern Karnataka plateau (Bayaluseeme rain-shadow) at peak heat. The Gulbarga Fort 1.5km perimeter walk, the Haft Gumbaz tomb-row walk, the Sannati Buddhist 75km day-trip all heat-stroke territory 10am-5pm. Stone-surface temperatures at the Bahmani Tombs (the Firoz Shah multi-dome basalt construction) reach 48-50C by 1pm. The Jama Masjid (1367, India''s only fully-roofed mosque) interior continues to function as the trip''s singular AC-style refuge — the enclosed 38,000 sq ft prayer hall under 75 domes holds 30-32C through afternoon. Bande Nawaz Dargah interior holds cool but the outer courtyard heats up. Sharana Basaveshwara Temple interior cool. Hotel rates collapse to year-low: Heritage Inn ₹1,200-2,000, Pariwar ₹1,000-1,800, KSTDC Mayura Bahmani ₹900-1,500. The 6:30-8:30am pre-dawn window is the only workable slot for the outdoor Bahmani-circuit walks. Push to October-November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 5, 1, 'skip',
  'Heat peak. 25-43C. Stone surface 50C plus. Pre-monsoon dust. Outdoor circuit closed. Skip.',
  NULL,
  'May is harshest Gulbarga month. Daytime 41-43C, stone surface 50-52C. Pre-monsoon dust knocks photography. Hotel occupancy under 25 percent. Push to October.',
  'May in Gulbarga is the heat dome at peak intensity. Daytime 41-43C, nights 25-27C, humidity 35 percent, rainfall under 25mm. The Bayaluseeme rain-shadow plateau records its annual heat peak in the third and fourth week — Gulbarga regularly clocks 43-44C in May, comparable to Bijapur and just below Vidarbha''s Nagpur. The outdoor Bahmani circuit is closed by physics: Gulbarga Fort perimeter, Haft Gumbaz Bahmani Tombs, Sannati Buddhist 75km day-trip — stone-surface 50-52C by 1pm. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand across the open-air tomb-row. Jama Masjid (1367, India''s only fully-roofed mosque, the Cordoba Spain model) interior holds 30-32C as the trip''s only AC-style refuge. Bande Nawaz Dargah interior cool. Sharana Basaveshwara Temple cool. The Hyderabad day-trip (220km east, 3.5 hours by road) similarly heat-locked. Hotels at year-low: Heritage Inn ₹1,000-1,800, Pariwar ₹900-1,500, KSTDC Mayura Bahmani ₹800-1,300. Skip. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 6, 2, 'wait',
  'SW monsoon light. 24-36C, 70-100mm rain. Heat eases. Walks viable AM/PM. Push to October.',
  NULL,
  'June brings 5-6C ease as SW monsoon spillover reaches the Gulbarga plateau (70-100mm across 7-9 wet days). Daytime 35-36C; Bahmani-circuit walks 6-10am and 5-7pm only. Surrounding fields turn green from recharge. October is materially better.',
  'June in Gulbarga is the first ease month. The southwest monsoon spillover reaches the Gulbarga district (the northeastern corner of Karnataka, bordering Telangana) — 70-100mm across 7-9 wet days, short late-afternoon thunderstorms drop daytime temperatures 5-6C from May. Daytime 35-36C, nights 24-25C, humidity 70 percent. Outdoor walks compress to 6-10am and 5-7pm: Gulbarga Fort 1.5km perimeter, Haft Gumbaz Bahmani Tombs, the Sannati day-trip. The Jama Masjid roofed interior remains the year-round AC-style refuge. The surrounding plateau fields turn green from monsoon recharge — visual character changes from dry-season ochre to wet-season olive. Bande Nawaz Dargah Thursday-evening qawwali still runs (the open dargah courtyard becomes seasonal after light evening showers). Sharana Basaveshwara Temple at standard hours. Hotels remain off-peak: Heritage Inn ₹1,500-2,500, Pariwar ₹1,200-2,000, KSTDC Mayura Bahmani ₹1,200-2,000. Functional only for travelers locked to this window. October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 7, 2, 'wait',
  'SW monsoon active. 23-32C, 110-150mm rain. Outdoor walks slick. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon at Gulbarga — 110-150mm across 11-13 wet days. Daytime 31-32C. Outdoor walks slick. The Jama Masjid roofed interior is the year-round refuge. Walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Gulbarga is the SW monsoon at moderate intensity. Rainfall 110-150mm across 11-13 wet days — Gulbarga gets more monsoon than Bijapur because the plateau sits at the eastern edge of the rain-shadow as the current crosses to Hyderabad. Daytime 31-32C, nights 23-24C, humidity 78 percent. The Bahmani-era basalt construction darkens in the wet. Gulbarga Fort perimeter walks slick — wear grip footwear. The Haft Gumbaz tomb-row walks rain-interrupted afternoons. The Sannati Buddhist day-trip viable in dry windows. Jama Masjid roofed interior holds cool and dry — the year-round refuge function continues. Bande Nawaz Dargah Thursday-evening qawwali still runs (the dargah staff move it indoors on heavy-rain days). Sharana Basaveshwara Temple at standard hours. Hotels climb 15 percent off June lows: Heritage Inn ₹1,800-3k, Pariwar ₹1,500-2,500, KSTDC Mayura Bahmani ₹1,500-2,500. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 8, 3, 'wait',
  'Monsoon continues. 22-30C, 110-150mm rain. Plateau fields year-greenest. Walks AM/PM.',
  'August holds July''s rain pattern (110-150mm). Daytime 29-30C. The Bahmani circuit and surrounding plateau at year-best visual character. Walks viable mornings and evenings.',
  'August works at 70 percent capacity. Daytime 29-30C, monsoon residue makes outdoor walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner Bahmani-circuit shape.',
  'August in Gulbarga is the gradual climb-down from the monsoon. Rainfall 110-150mm across 11-13 wet days, daytime 29-30C, nights 22-23C, humidity 82 percent. The Gulbarga plateau fields at year-greenest from monsoon recharge — the contrast between the Bahmani basalt monuments (Jama Masjid, Haft Gumbaz tombs, the fort walls) and the green plain shows year-best visual character before dry-season ochre returns by November. Outdoor walks viable 6:30am-11am and 4-7pm between showers. The Jama Masjid roofed interior continues as year-round refuge. Bande Nawaz Dargah Thursday qawwali still runs. The Sannati Buddhist day-trip (75km southeast) viable in dry windows; the relic-casket housed at the Buddha Vihar interior. Sharana Basaveshwara Temple at standard hours. Haft Gumbaz Bahmani Tombs (the Firoz Shah multi-dome construction) at peak green-field photographic backdrop. Hotels 30 percent below January peak: Heritage Inn ₹1,500-2,500, Pariwar ₹1,200-2,200, KSTDC Mayura Bahmani ₹1,200-2,000. October window cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 9, 3, 'wait',
  'Monsoon retreating. 21-29C, 80-110mm rain. Green-plateau peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 80-110mm. Post-monsoon green peaks late month. Last off-peak window before season opens.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 28-29C; afternoon thunderstorms still break outdoor circuit walks. Push to mid-October.',
  'September in Gulbarga is the bridge month before the proper season opens. Rainfall drops to 80-110mm across 9-11 wet days — second-half is materially drier. Daytime 28-29C, nights 21-22C, humidity easing from 82 to 72 percent. The post-monsoon green peaks in the last 10 days — the Gulbarga plateau fields at year-greenest before drying to ochre by November. Gulbarga Fort perimeter walks at improving comfort. Haft Gumbaz Bahmani Tombs walk cleanly. Jama Masjid interior at peak photographic light. Bande Nawaz Dargah Thursday-evening qawwali back at full outdoor courtyard schedule. Sannati Buddhist day-trip viable. Sharana Basaveshwara Temple at standard hours. Bahmani urs festival at Bande Nawaz Dargah (typically November per Rabi-ul-Awwal lunar calendar) builds in late September preparation. Hotels 25 percent below January peak: Heritage Inn ₹2-3.5k, Pariwar ₹1,500-2,500. October 15 onward is the clean call; September offers value pricing and greenest landscape for travelers seeking pre-peak weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 10, 4, 'go',
  'Season opens. 19-30C, 30-50mm rain. Green-plateau landscape. Bahmani walks return mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean Bahmani-first-capital walking. Green plateau around monuments still holds.',
  NULL,
  'October in Gulbarga is the proper return to the Bahmani-first-capital circuit. Southwest monsoon withdraws from interior Karnataka around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean weather. Daytime 29-30C, nights 19-21C, humidity falling from 72 to 60 percent. The post-monsoon green plateau around the Bahmani monuments still holds through October — visual sweet spot for the basalt-and-green-plateau landscape. Jama Masjid (1367, India''s only fully-roofed mosque, the Cordoba Spain model) interior at year-best photographic light. Khwaja Bande Nawaz Dargah (1422 Chishti Sufi shrine) at full pilgrim-flow start; Thursday-evening qawwali at clean outdoor courtyard schedule. Haft Gumbaz Bahmani Tombs (Firoz Shah, Taj-ud-Din Firoz, five others) walk cleanly. Gulbarga Fort 1.5km perimeter at year-best traction. Sannati Buddhist day-trip (75km southeast, 1st-c BCE Satavahana-period stupa with relic-casket) viable as full day. Sharana Basaveshwara Temple, the Lingayat shrine, at standard hours. Hotels 25-30 percent below January peak: Heritage Inn ₹2,200-3,500, Pariwar ₹1,800-3k, KSTDC Mayura Bahmani ₹1,500-2,500. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Bande Nawaz urs festival (lunar). Walking year-best.',
  'November is the proper pivot to peak. Rainfall under 20mm, full Bahmani walking, Karnataka Rajyotsava Nov 1. Bande Nawaz Dargah annual urs festival typically falls in November (Rabi-ul-Awwal lunar — verify 2026 dates).',
  NULL,
  'November in Gulbarga is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 26-28C, nights 17-19C, humidity dropping below 60 percent. Air visibility at its annual cleanest. The Bahmani-first-capital circuit walks at year-best traction. Jama Masjid (1367, India''s only fully-roofed mosque) interior and the dome-photography at year-cleanest light. Khwaja Bande Nawaz Dargah (1422 Chishti Sufi shrine) annual urs festival typically falls in November (Rabi-ul-Awwal in the Islamic lunar calendar — date varies year to year, verify against the Dargah Sharif administration ahead of trip planning) — the urs draws Sufi devotees from across India and Pakistan, qawwali singers from Hyderabad and Aurangabad, special langar 24-hour service for 3-7 days. Haft Gumbaz Bahmani Tombs walk at clean light. Gulbarga Fort 1.5km perimeter at peak comfort. Sannati Buddhist day-trip at year-best traction. Karnataka Rajyotsava (November 1, state formation day) brings Kalaburagi district cultural programming. Hotels climb to 75 percent of January peak: Heritage Inn ₹2,500-4k, Pariwar ₹2-3.5k, KSTDC Mayura Bahmani ₹1,800-3k. If timing the trip with the urs, lock 8-12 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gulbarga', 12, 5, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE moderate rate spike. Bahmani circuit at year-cleanest.',
  'December is operational peak. Daytime 25-27C, nights 14-15C, year-cleanest air visibility. The Bahmani-first-capital circuit at year-best. Christmas-NYE 1.5-2x rates.',
  NULL,
  'December in Gulbarga is the operational peak. Daytime 25-27C, nights drop to 14-15C, humidity 50 percent, rainfall under 10mm. Air visibility at annual best — basalt-granite Bahmani-era construction shows year-cleanest contrast against the winter sky. Jama Masjid (1367, India''s only fully-roofed mosque, 75 domes covering 38,000 sq ft prayer hall) at year-best photographic light — arrive 9am for the dome study, the mihrab calligraphy, the basalt columns. Khwaja Bande Nawaz Dargah (1422 Sufi shrine) at peak winter pilgrim season; Thursday-evening qawwali at year-best acoustic clarity. Haft Gumbaz Bahmani Tombs walks at year-cleanest light. Gulbarga Fort (1347 — Bahmani founders'' capital, citadel walls and Buland Darwaza) at year-best traction. Sharana Basaveshwara Temple at standard hours. The Sannati Buddhist day-trip (75km southeast, 1st-c BCE Satavahana stupa with relic-casket) at clean morning trip. Christmas-NYE (December 22 to January 5) sees moderate rate lift: Heritage Inn ₹3-4.5k, Pariwar ₹2,200-3,500. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
