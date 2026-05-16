-- Bijapur (Vijayapura) destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: bijapur | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 1, 5, 'go',
  'Peak Adil Shahi window. 15-29C, dry. Gol Gumbaz, Ibrahim Rauza, Jami Masjid at year-cleanest light.',
  'January is the strongest stretch for Bijapur. Daytime 27-29C, nights 15-16C. Gol Gumbaz (1656, world''s 2nd-largest unsupported dome), Ibrahim Rauza (1635), Jami Masjid (1576), and Malik-i-Maidan (world''s largest medieval cannon by weight) at year-best photography.',
  NULL,
  'Bijapur (officially renamed Vijayapura in 2014, both names in use) in January is the proper Adil Shahi heritage stretch. Daytime 27-29C, nights 15-16C, humidity 50 percent, rainfall under 10mm. The Adil Shahi dynasty ruled here 1490-1686. Gol Gumbaz (1656 — mausoleum of Sultan Mohammed Adil Shah, second-largest unsupported dome in the world at 44m diameter, surpassed only by St Peter''s) opens 6am-6pm, ASI ₹40. The Whispering Gallery on the upper dome circumference (100 narrow steps) carries a whisper 38m across — try pre-9am when crowds are thin. Ibrahim Rauza (1635 — Ibrahim Adil Shah II''s dual mausoleum, considered by scholars to have inspired the Taj Mahal design which began 1632) opens 6am-6pm, ASI ₹40 — the dome, four corner minarets, calligraphic friezes. Jami Masjid (1576, Ali Adil Shah I — incomplete, the 116-arch prayer hall and 38m dome over the mihrab are the standouts) free entry. Malik-i-Maidan — the 5.5m bronze cannon on Sherza Burj bastion, world''s largest medieval cannon by weight at ~55 tons. Hotels: Madhuvan ₹2-3.5k, Kanishka ₹2,500-4k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 2, 5, 'go',
  'Driest month. 17-32C. Gol Gumbaz dome photography year-best. Whispering Gallery quietest.',
  'February holds the technical peak with rainfall under 5mm. Gol Gumbaz dome photography at year-best contrast. Whispering Gallery at year-quietest visitor load — the 38m acoustic anomaly heard cleanly. Adil Shahi monument circuit at peak comfort.',
  NULL,
  'February in Bijapur is the year''s cleanest photography window for the Adil Shahi circuit. Rainfall under 5mm, daytime 30-32C, nights 17-18C, humidity 45 percent. Gol Gumbaz (1656, Mohammed Adil Shah''s mausoleum, 44m unsupported dome) at year-best dome contrast against the winter sky. The Whispering Gallery (38m upper-dome circumference where the slightest whisper carries clearly across the diameter, an unintended consequence of the pendentive-squinch construction) walks quietest in February; arrive 6:30am for clean acoustic test before group tours. Ibrahim Rauza (1635 — Ibrahim Adil Shah II''s dual mausoleum, the Sultan was a polymath who composed the Kitab-i-Nauras book of Indian classical music notation) at year-best detail. The Taj-Mahal-design-inspiration claim is scholar consensus — the 1635 completion pre-dates the Taj 1648, the Taj architect Lahauri was familiar with the Adil Shahi monuments, the perforated jali screens and corner-minaret design directly anticipate the Taj. Jami Masjid 116-arch prayer hall walks cleanly. Malik-i-Maidan cannon on Sherza Burj. Hotels at peak: Madhuvan ₹3-4.5k, Kanishka ₹3-5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 3, 4, 'go',
  'Last cool month. 19-35C. Open-monument walks compress past 11am. Rates ease 25 percent.',
  'March extends the February window. Heat builds late month. Gol Gumbaz dome climb (heat traps inside the spiral staircase), Ibrahim Rauza open courtyard, and Jami Masjid open prayer hall walks compress to 6:30-10am and 4-6pm. Rates ease 25 percent.',
  NULL,
  'March in Bijapur is the soft-landing month before the heat dome opens. Daytime 33-35C, nights 19-21C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The Adil Shahi monument circuit involves significant open-air walking and dome-climbs. Gol Gumbaz spiral-staircase to the Whispering Gallery (100 narrow steps inside a hot stone shaft, no ventilation) becomes furnace-like by 11am — climb pre-9am or skip in the afternoon. The Ibrahim Rauza open courtyard between the mausoleum and the mosque walks compress to dawn-mid-morning. Jami Masjid prayer hall (the 116-arch open hall under the central dome) holds cool through afternoon but the open inner courtyard heats up. Malik-i-Maidan cannon at Sherza Burj bastion (open-air city-wall walk) viable 6:30-10am only. The Asar Mahal (the relic chamber with the alleged hairs of Prophet Muhammad, women not permitted in the inner chamber) and Mehtar Mahal walk cleanly through morning. Hotels ease 25 percent: Madhuvan ₹2-3.5k, Kanishka ₹2,500-4k, KSTDC Mayura Adil Shahi ₹1,500-2,500. Last clean-value window before April-June strict heat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 4, 1, 'skip',
  'Heat dome opens. 23-41C. Gol Gumbaz dome-climb interior 48C plus. Outdoor walks unworkable. Skip.',
  NULL,
  'April pushes Bijapur into the strict-skip stretch. Northern Karnataka plateau hits 40-41C. Gol Gumbaz spiral staircase interior reaches 48C with no ventilation — the climb becomes dangerous. Ibrahim Rauza courtyard, Jami Masjid open hall, Malik-i-Maidan all heat-locked. Push to October.',
  'April in Bijapur is the start of the strict-skip stretch. Daytime 39-41C, nights 23-25C, humidity 35 percent, rainfall under 10mm — Northern Karnataka plateau (Bayaluseeme rain-shadow) at peak heat. The Adil Shahi monument circuit becomes unworkable: Gol Gumbaz spiral-staircase to the Whispering Gallery (a hot stone shaft with no ventilation) reaches 48-50C interior by mid-morning — climbing it in April is a heat-stress risk that has caused several reported tourist illnesses in past summers. The Ibrahim Rauza open courtyard between mausoleum and mosque, the Jami Masjid 116-arch prayer hall with its inner courtyard, the Citadel walls, the Malik-i-Maidan cannon walk at Sherza Burj bastion — all closed by physics 10am-5pm. Stone-surface temperatures at the Gol Gumbaz exterior, the Ibrahim Rauza minarets, the Asar Mahal reach 48-52C. The Whispering Gallery acoustic test the trip is built around becomes inaccessible. Hotel rates collapse to year-low: Madhuvan ₹1,200-2,000, Kanishka ₹1,500-2,500, KSTDC Mayura Adil Shahi ₹900-1,500. The 6:30-8:30am pre-dawn window is the only workable slot. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 5, 1, 'skip',
  'Heat peak. 25-44C. Stone surface 52C. Pre-monsoon dust. Gol Gumbaz climb dangerous. Skip strict.',
  NULL,
  'May is harshest Bijapur month. Daytime 42-44C, stone surface 50-52C. The Gol Gumbaz interior climb becomes dangerous. Pre-monsoon dust knocks photography. Push to October.',
  'May in Bijapur is the heat dome at peak intensity. Daytime 42-44C, nights 25-27C, humidity 35 percent, rainfall under 25mm. The Northern Karnataka plateau (Bijapur sits on the Bayaluseeme rain-shadow at 600m elevation) records its annual heat peak in the third and fourth week — Bijapur regularly clocks 44-45C in May, the highest of the four Karnataka heritage cities (Hampi/Badami/Bidar/Bijapur). The Adil Shahi monument circuit is closed by physics: Gol Gumbaz dome interior 48-52C with no ventilation, the Whispering Gallery acoustic test inaccessible, the spiral-staircase climb a heat-stroke risk. Ibrahim Rauza courtyard, Jami Masjid prayer hall, Citadel walls, Malik-i-Maidan cannon walk — all 50-52C stone-surface mid-day. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand across the open-air Gol Gumbaz precinct and the Ibrahim Rauza compound, knocking visibility on the dome-photography routes. Hotels at year-low: Madhuvan ₹1,000-1,800, Kanishka ₹1,200-2,000, KSTDC Mayura Adil Shahi ₹800-1,300. Bijapur is the most heat-vulnerable of the three Northern Karnataka Islamic-heritage cities. Skip. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 6, 2, 'wait',
  'SW monsoon light. 24-37C, 60-90mm rain. Heat eases. Walks viable AM/PM. Push to October.',
  NULL,
  'June brings 5-6C ease as SW monsoon spillover reaches the Krishna basin (60-90mm across 6-8 wet days). Daytime 35-37C; Gol Gumbaz and Ibrahim Rauza walks 6-10am and 5-7pm only. Surrounding plateau fields turn green. October is materially better.',
  'June in Bijapur is the first ease month. Southwest monsoon spillover reaches the Krishna river basin (Bijapur lies between the Krishna and the Bhima rivers, on the northern Karnataka plateau) — 60-90mm across 6-8 wet days, short late-afternoon thunderstorms drop daytime temperatures 4-5C from May. Daytime 35-37C, nights 24-26C, humidity 65 percent. The Gol Gumbaz dome-climb still uncomfortable in the middle of the day — the interior holds 36-38C through afternoon — but pre-9am and post-5pm clean. Ibrahim Rauza courtyard, Jami Masjid prayer hall, Malik-i-Maidan cannon walk all compress to 6-10am and 5-7pm windows. The Bijapur plateau fields around the city turn green from monsoon recharge — visual character changes from dry-season ochre to wet-season olive. Hotels remain off-peak: Madhuvan ₹1,500-2,500, Kanishka ₹1,800-3k, KSTDC Mayura Adil Shahi ₹1,200-2,000. Functional only for travelers locked to this window. October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 7, 2, 'wait',
  'SW monsoon active. 23-32C, 100-130mm rain. Stone walks slick. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon at Bijapur — 100-130mm across 10-12 wet days. Daytime 31-32C. Stone walks slick on Gol Gumbaz dome-base and Ibrahim Rauza marble. Walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Bijapur is the SW monsoon at moderate intensity. Rainfall 100-130mm across 10-12 wet days — short violent afternoon thunderstorms. Daytime 31-32C, nights 23-24C, humidity 75 percent. The Gol Gumbaz exterior dark in the wet — the basalt-granite construction shifts color. The dome-climb interior holds cool 30-32C — the Whispering Gallery acoustic test workable in monsoon months as visitor load drops. Ibrahim Rauza marble courtyard slick — wear grip footwear. Jami Masjid prayer hall holds dry; the inner courtyard rain-interrupted. Malik-i-Maidan cannon walk at Sherza Burj bastion 6:30-10am window between showers. The Bijapur plateau Krishna-basin fields at year-greenest from monsoon recharge. The Asar Mahal relic chamber and Mehtar Mahal walk cleanly. Hotels climb 15 percent off June lows: Madhuvan ₹1,800-3k, Kanishka ₹2,200-3,500, KSTDC Mayura Adil Shahi ₹1,500-2,500. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 8, 3, 'wait',
  'Monsoon continues. 22-30C, 100-130mm rain. Krishna-basin fields year-greenest. Walks AM/PM.',
  'August holds July''s rain pattern (100-130mm). Daytime 29-30C. The Adil Shahi circuit and the Krishna-basin agricultural belt at year-best visual character. Walks viable mornings and evenings.',
  'August works at 70 percent capacity. Daytime 29-30C, monsoon residue makes exterior walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner Adil Shahi-circuit shape.',
  'August in Bijapur is the gradual climb-down from the monsoon. Rainfall 100-130mm across 10-12 wet days, daytime 29-30C, nights 22-23C, humidity 80 percent. The Krishna-basin fields around Bijapur district at year-greenest from monsoon recharge — the contrast between the Adil Shahi basalt domes (Gol Gumbaz, Ibrahim Rauza, Jami Masjid) and the green plain shows the year-best visual character before the dry-season ochre returns by November. Gol Gumbaz dome and the Whispering Gallery acoustic test workable through morning hours; visitor load remains 60 percent below January. Ibrahim Rauza courtyard rain-interrupted afternoons; the calligraphic friezes (Persian poetry by Ibrahim Adil Shah II himself, his Kitab-i-Nauras musical-treatise patron) at clean morning photographic light. Jami Masjid 116-arch prayer hall walks clean. Malik-i-Maidan cannon at Sherza Burj. Hotels 30 percent below January peak: Madhuvan ₹1,500-2,500, Kanishka ₹1,800-3k, KSTDC Mayura Adil Shahi ₹1,200-2,000. October window cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 9, 3, 'wait',
  'Monsoon retreating. 21-29C, 70-100mm rain. Green-field peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 70-100mm. Post-monsoon green peaks late month. Last off-peak window before season opens.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 28-29C; afternoon thunderstorms still break Gol Gumbaz dome-circuit walks. Push to mid-October.',
  'September in Bijapur is the bridge month before the proper season opens. Rainfall drops to 70-100mm across 9-11 wet days — second-half is materially drier. Daytime 28-29C, nights 21-22C, humidity easing from 80 to 70 percent. The post-monsoon green peaks in the last 10 days — the Krishna-basin plateau fields around the Adil Shahi monuments at year-greenest before drying to ochre by November. Gol Gumbaz dome-climb and the Whispering Gallery acoustic test workable through morning. Ibrahim Rauza courtyard and the calligraphic friezes (Persian poetry commissioned by Ibrahim Adil Shah II, polymath and Kitab-i-Nauras patron) at clean morning light. Jami Masjid 116-arch prayer hall at peak comfort. Malik-i-Maidan cannon walk. The Asar Mahal relic chamber, Mehtar Mahal walks at peak comfort. Hotels 25 percent below January peak: Madhuvan ₹1,800-3k, Kanishka ₹2,200-3,500, KSTDC Mayura Adil Shahi ₹1,300-2,200. October 15 onward is the clean call; September offers value pricing and greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 10, 4, 'go',
  'Season opens. 19-30C, 30-50mm rain. Green-field landscape. Adil Shahi walks return mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean Adil Shahi walking. Green plain around monuments still holds. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Bijapur is the proper return to the Adil Shahi circuit. Southwest monsoon withdraws around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean weather. Daytime 29-30C, nights 19-21C, humidity falling from 70 to 60 percent. The post-monsoon green plain still holds through October — visual sweet spot for the basalt-dome-and-green-field landscape. Gol Gumbaz (1656, Mohammed Adil Shah''s 44m unsupported dome — the world''s second-largest after St Peter''s Vatican) walks cleanly through the afternoon; the Whispering Gallery acoustic test at clean morning visitor load. Ibrahim Rauza (1635, the Taj Mahal''s design predecessor — Ibrahim Adil Shah II''s dual mausoleum, four corner minarets, Persian calligraphic friezes) at year-best detail. Jami Masjid 116-arch prayer hall (1576, Ali Adil Shah I). Malik-i-Maidan cannon on Sherza Burj bastion (5.5m bronze, world''s largest medieval cannon by weight at ~55 tons, cast 1549). Hotels 25-30 percent below January peak: Madhuvan ₹2-3.5k, Kanishka ₹2,500-4k, KSTDC Mayura Adil Shahi ₹1,500-2,500. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Gol Gumbaz dome-photography year-best.',
  'November is the proper pivot to peak. Rainfall under 20mm, full Adil Shahi walking, Karnataka Rajyotsava Nov 1 brings Vijayapura district programming. Gol Gumbaz dome photography at year-best contrast against the dry-season sky.',
  NULL,
  'November in Bijapur is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 26-28C, nights 17-19C, humidity dropping below 60 percent. Air visibility at its annual cleanest. Gol Gumbaz dome photography at year-best contrast against the dry-season clear blue sky — the 44m unsupported dome catches dawn glow first and shows year-cleanest silhouette at sunset. The Whispering Gallery acoustic test at peak comfort; visitor load remains moderate. Ibrahim Rauza (1635, the Taj Mahal design predecessor, Ibrahim Adil Shah II''s dual mausoleum) at year-cleanest stone-detail light — the perforated jali screens, the corner minarets, the calligraphic friezes (Persian poetry from Ibrahim Adil Shah II''s own commission). Jami Masjid 116-arch prayer hall walks at peak comfort. Malik-i-Maidan cannon walk at Sherza Burj bastion clean. The Asar Mahal relic chamber and Mehtar Mahal at year-best visit comfort. Karnataka Rajyotsava (November 1, state formation day) brings cultural programming in Vijayapura (Bijapur officially renamed 2014) town. Hotels climb to 75 percent of January peak: Madhuvan ₹2,500-4k, Kanishka ₹3-4.5k, KSTDC Mayura Adil Shahi ₹1,800-3k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bijapur', 12, 5, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE moderate rate spike. Adil Shahi at year-cleanest.',
  'December is operational peak. Daytime 25-27C, nights 14-15C, year-cleanest air visibility. Gol Gumbaz, Ibrahim Rauza, Jami Masjid at year-best. Christmas-NYE 1.5-2x rates.',
  NULL,
  'December in Bijapur is the operational peak. Daytime 25-27C, nights drop to 14-15C, humidity 50 percent, rainfall under 10mm. Air visibility at annual best — the basalt-granite Adil Shahi domes show year-cleanest contrast against the winter sky. Gol Gumbaz (1656, world''s 2nd-largest unsupported dome) at year-best dome-photography conditions — arrive 6:30am for the Whispering Gallery acoustic test before group tours, then walk the Gol Gumbaz Museum (ASI gallery, Adil Shahi sculpture fragments). Ibrahim Rauza (1635, the Taj Mahal''s design predecessor — the 1635 completion pre-dates the Taj 1648, the Taj architect Ustad Ahmad Lahauri''s familiarity with the Adil Shahi monuments is well-documented, the jali-screen and corner-minaret design directly precedes the Taj vocabulary). Jami Masjid 116-arch prayer hall at year-best. Malik-i-Maidan cannon on Sherza Burj. Asar Mahal, Mehtar Mahal, the Citadel walls. Christmas-NYE (December 22 to January 5) sees moderate rate lift: Madhuvan ₹3.5-5.5k, Kanishka ₹4-6k, KSTDC Mayura Adil Shahi ₹2,500-3,500. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
