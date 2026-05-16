-- Thanjavur (Tanjore) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: thanjavur | best_months [11,12,1,2] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 1, 5, 'go',
  'Peak Chola heritage window. 22-30C, dry. Brihadeeswara UNESCO + Saraswathi Mahal + Maratha Palace.',
  'January is Thanjavur''s strongest stretch. Daytime 22-30C, dry, sea breeze faint inland but pleasant. Brihadeeswara Temple (UNESCO 1987, 1010 CE Chola masterpiece) walks cleanly. Saraswathi Mahal Library, Maratha Palace, Tanjore painting workshops at full hours.',
  NULL,
  'Thanjavur in January is the version a Chola-heritage trip is built around. Daytime 22-30C, nights 20C, humidity 65 percent. Brihadeeswara Temple — UNESCO 1987 (under Great Living Chola Temples 2004 extension alongside Airavatesvara at Darasuram and Gangaikonda Cholapuram), built 1003-1010 CE by Rajaraja Chola I in 7 years, the 66m granite vimana the tallest pyramidal vimana of its era — opens 6am-12:30pm + 4-8:30pm, free entry, ASI maintained. The shadow-doesn''t-fall-on-the-ground myth at noon comes from the geometry of the dome (the 81-tonne Sri Vimana Kalasam capstone sits 66m above the floor). The Nandi at the east entrance is a 16-foot granite monolith carved from a single block. The Maratha Palace complex (16th-century Nayak, extended by Marathas 18th century) holds the Saraswathi Mahal Library founded by Serfoji II — 50,000+ manuscripts in Marathi, Tamil, Sanskrit, Persian, 10am-5pm closed Wed, ₹50 entry. Tanjore painting workshops (gesso + 22-karat gold leaf + semi-precious stones) on East Main Street and West Main Street produce ₹3-50k paintings. Hotels: Ideal River View Resort ₹4-6k, Sangam Hotel ₹3-5k, Hotel Gnanam ₹2-3.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 2, 5, 'go',
  'Driest month. 22-31C. Brihadeeswara at peak photography conditions. Pongal+Pongal tail traffic eased.',
  'February is the technical peak. Rainfall under 10mm, low humidity, Brihadeeswara photography window at year-best. Saraswathi Mahal Library, Tanjore painting workshops at full demonstration.',
  NULL,
  'February in Thanjavur is the year''s cleanest weather window for the Chola-heritage circuit. Rainfall under 10mm, daytime 23-31C, humidity 60 percent. Brihadeeswara Temple (UNESCO 1987, 1010 CE Chola masterpiece) at peak photography conditions — the 66m granite vimana, the 16-foot Nandi at the east entrance, the long colonnaded mandapam — all clean morning light at 6:30-9am and 4:30-6pm. The temple complex covers approximately 6 hectares; allow 2-3 hours. The Sri Vimana Kalasam (temple-top finial, 81 tonnes total) sits at 66m elevation and catches dawn light first. Saraswathi Mahal Library (10am-5pm closed Wed, ₹50 entry) at full open hours; 50,000+ manuscripts including Marathi royal records of Serfoji II, Tamil Siddha medical texts, Sanskrit Vedic literature. Tanjore painting workshops on East Main Street and West Main Street run full demonstrations 9am-6pm — paintings ₹3-50k depending on size and gold-leaf coverage. Hotel rates at peak: Ideal River View Resort ₹5-7k, Sangam Hotel ₹4-6k, Hotel Gnanam ₹2.5-4k. Day-trip from Trichy (55km west) or Pondicherry (170km north) viable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 3, 4, 'go',
  'Last cool month. 25-33C, humidity climbing. Brihadeeswara walks pre-11am and post-5pm.',
  'March extends the February window. Maha Shivaratri may fall in March (variable). Heat builds late month. Hotel rates ease 20 percent versus February peak.',
  NULL,
  'March in Thanjavur is the soft-landing month before the heat dome opens. Daytime 26-33C, humidity climbing from 65 to 75 percent across the month, sea breeze faint inland but the Cauvery river and the temple-tank network bring evening relief. Maha Shivaratri (Phalguna Krishna Chaturdashi, variable February 26 to March 18 in 2026 — verify) typically falls late February or early March; Brihadeeswara Temple stages all-night abhishekam from 6pm to 6am with the iconic lingam (the largest stone lingam in India at 13 feet tall, made from a single granite block) at the centre of the night-long ceremony. 30,000-50,000 devotees through the temple courtyard. The Brihadeeswara walks pre-11am and 4:30-7pm windows. Saraswathi Mahal Library (10am-5pm closed Wed, ₹50 entry) at standard hours. Tanjore painting workshops on East Main Street, West Main Street at standard demonstration cycles. The Maratha Palace complex, Royal Museum, Bell Tower walk-through 9am-5pm Thu-Tue. Hotel rates ease 20 percent: Ideal River View Resort ₹4-6k, Sangam Hotel ₹3-5k, Hotel Gnanam ₹2-3.5k. Last comfortable Chola-heritage walking window before April pre-monsoon heat sets in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 4, 2, 'wait',
  'Heat dome opens. 28-39C, humidity 78 percent. Brihadeeswara walks compress to dawn. Tamil New Year Apr 14.',
  'April still works for pre-dawn Brihadeeswara visits and AC Tanjore-painting workshop stays. Tamil New Year (April 14) brings temple programming. Mid-day temple-courtyard walking impossible.',
  'April is when Thanjavur''s heat dome opens. The 6-hectare Brihadeeswara complex courtyard scorches mid-day. Push to November-December for full clean shape.',
  'April in Thanjavur is when the Chola-heritage trip narrows to dawn-and-night. Daytime 28-39C, humidity 78 percent, sea breeze faint inland. Tamil New Year (Puthandu, April 14) brings city-wide programming — Brihadeeswara Temple runs special 5am abhishekam, traditional Tanjore Sadhya at restaurants ₹250-500. The 6-hectare Brihadeeswara complex (granite courtyard, the 66m vimana, the 16-foot Nandi, the long colonnaded mandapam) walks pre-9am only. The vimana''s granite blocks reach 50-55C surface temperature by 11am. AC retreats: Saraswathi Mahal Library (10am-5pm closed Wed, well-ventilated), the Maratha Palace Royal Museum (Bell Tower side), Tanjore painting workshops on East Main Street and West Main Street (mostly indoor demonstration spaces, AC-cool). Hotel rates drop 25-30 percent versus February: Ideal River View Resort ₹3.5-5k, Sangam Hotel ₹2.5-4k, Hotel Gnanam ₹1.8-3k. Trichy day-trip (55km west) — Rockfort Temple and Srirangam Ranganathaswamy Temple — also heat-compressed. Push to November onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 5, 2, 'wait',
  'Peak heat. 29-40C, humidity 75 percent. Brihadeeswara courtyard 50-55C surface. Hotel rates year-low.',
  'May functions for pre-dawn Brihadeeswara visits and AC Tanjore-painting workshop stays. Mid-day temple walking impossible. Pre-monsoon thunderstorms last 10 days.',
  'May is Thanjavur''s harshest stretch. Brihadeeswara granite courtyard hits 50-55C surface mid-day. Pre-dawn only. Push to November.',
  'May in Thanjavur runs the heat dome at full intensity. Daytime 29-40C with the last week occasionally hitting 41-42C (Trichy regularly records the year''s TN-inland heat peak; Thanjavur 55km east sits within 1-2 degrees), humidity 75 percent, sea breeze faint inland. The granite of Brihadeeswara Temple — 66m vimana, 16-foot Nandi, the 6-hectare courtyard — reaches 50-55C surface temperature by 11am. Pre-dawn darshan 5:30-9am the only workable window for the temple-courtyard walking. Saraswathi Mahal Library and the Maratha Palace Royal Museum remain AC-cool. Tanjore painting workshops on East Main Street and West Main Street stay AC-cool through the heat — the gesso-and-gold-leaf application process actually benefits from low-humidity dry-season conditions, so May-June are workshop production peaks for finished paintings. Pre-monsoon thunderstorms hit the last 10 days. Hotel rates at year-low: Ideal River View Resort ₹3-4.5k, Sangam Hotel ₹2-3.5k, Hotel Gnanam ₹1.5-2.5k. Trichy day-trip (55km west) similarly compressed. Push to November-December for clean Chola-heritage weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 6, 2, 'wait',
  'SW monsoon weak. 28-37C, only 40-60mm rain. Heat continues. Brihadeeswara pre-9am only.',
  NULL,
  'June is heat-with-marginal-rain. Inland Cauvery delta in SW monsoon rain shadow. Temple courtyards still 45-50C mid-day. Push to November.',
  'June in Thanjavur sits in the SW monsoon rain shadow that defines inland Tamil Nadu — the Western Ghats absorb most moisture and only 40-60mm of light rain reaches the Cauvery delta through the month. Heat dominates: daytime 28-37C, humidity 75 percent, sea breeze faint inland. The Brihadeeswara complex still 45-50C surface mid-day. Pre-dawn darshan 5:30-9am the only workable window. Saraswathi Mahal Library (10am-5pm closed Wed) holds its cool interior. Tanjore painting workshops on East Main Street, West Main Street run at full production with AC-cool demonstration. The Cauvery delta mango season — Banganapalli, Imam Pasand, Sendhura at peak — Thanjavur fruit markets at year-best. Hotel rates remain low-season: Ideal River View Resort ₹3-4.5k, Sangam Hotel ₹2.5-4k, Hotel Gnanam ₹1.5-2.5k. The clean travel window opens with the NE monsoon retreat in mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 7, 3, 'wait',
  'SW monsoon residual. 27-34C, 80-110mm rain. Aadi opens. Heat retreating slowly.',
  'July sees first heat retreat — evening thunderstorms drop temps. Aadi month opens mid-July; Aadi-Friday processions at Cauvery delta temples.',
  NULL,
  'July in Thanjavur marks the first measurable heat retreat. Daytime 27-34C, humidity 78 percent, evening thunderstorms drop temperatures 4-5 degrees. SW monsoon residual brings 80-110mm across 6-8 wet days. The Tamil month Aadi opens (mid-July to mid-August). Aadi-month religious traffic across the Cauvery delta district — Brihadeeswara Temple, the Tanjore Maratha Palace Sri Bangaru Kamakshi shrine, the city''s other 100+ temples all see additional Aadi-Friday traffic. Brihadeeswara walks pre-10am and post-5pm windows. Saraswathi Mahal Library, the Maratha Palace Royal Museum, Tanjore painting workshops at standard hours. The Cauvery river runs from monsoon recharge — the river at Thanjavur is the Cauvery-Vennar branch, with the Grand Anicut (Kallanai Dam, built ~150 CE by Karikala Chola, the world''s fourth-oldest functioning water-diversion structure still in use) 30km west holding annual peak. Hotel rates in the low-season window: Ideal River View Resort ₹3.5-5k, Sangam Hotel ₹3-4.5k. October 15 onward delivers a much cleaner travel shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 8, 3, 'wait',
  'Aadi Perukku Aug 3. 26-33C, 110-140mm rain. Cauvery delta at peak Aadi traffic. Heat retreating.',
  'August brings Aadi Perukku (Cauvery river-bank festival, August 3 fixed) at peak observance. Thanjavur sits on the Cauvery-Vennar river system. October cleaner.',
  'August holds July pattern with Aadi-month religious traffic. Brihadeeswara walks pre-10am and post-5pm. October is the cleaner call.',
  'August in Thanjavur is peak Aadi-month religious traffic for the Cauvery delta. Aadi Perukku (August 3, fixed Cauvery river-bank festival) is the year''s major regional water-festival — Mayuram, Tanjore, Srirangam, Trichy are the headline venues. Thanjavur sits on the Cauvery-Vennar river system, and the Aadi Perukku day sees the Grand Anicut Kallanai (30km west) at peak observance with 50,000+ visitors performing river-bank rituals across the dam''s 320m length. The Brihadeeswara Temple''s 1000-year Chola-engineering symbolism connects directly — Karikala Chola built the Kallanai (~150 CE) and Rajaraja Chola I built Brihadeeswara (1003-1010 CE) using the same Cauvery delta engineering tradition. Daytime 26-33C, humidity 80 percent, rain 110-140mm across 9-11 wet days. Brihadeeswara walks pre-10am and post-5pm. Hotel rates climb 25-30 percent weekends: Ideal River View Resort ₹4-6k weekend, Sangam Hotel ₹3.5-5k weekend. The much cleaner travel window opens October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-32C, 110-150mm rain. Vinayaka Chathurthi Sep 7. Heat easing.',
  'September is the bridge month. Heat retreating, sea breeze improving. Brihadeeswara walks lengthen. Push to October for full season opening.',
  NULL,
  'September in Thanjavur is the bridge month before the NE monsoon arrives. Daytime 26-32C, humidity 78 percent, sea breeze faint inland but evening thunderstorms more reliable. Vinayaka Chathurthi (variable Bhadrapada Shukla Chathurthi — September 7, 2026) brings Pillayar idol immersion at the Cauvery river-front; the procession from temple-precinct to the Vennar river-bank runs 3-4 hours. Brihadeeswara Temple holds standard schedules. Saraswathi Mahal Library, the Maratha Palace Royal Museum, Tanjore painting workshops at standard demonstration hours. Hotel rates climb 15-20 percent versus August low: Ideal River View Resort ₹4-5.5k, Sangam Hotel ₹3-4.5k, Hotel Gnanam ₹2-3.5k. The NE monsoon arrives mid-to-late October — Thanjavur (inland Cauvery delta location) sees moderate rainfall, mostly 200-280mm in October-December. Mid-October onward is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 10, 4, 'go',
  'Season opens. 24-30C, 200-280mm rain. Brihadeeswara walks return mid-month. Navaratri Oct 11-20.',
  'October is the season opener. NE monsoon delivers 200-280mm but temperature drops dramatically. Full Brihadeeswara walking from mid-month. Navaratri (October 11-20, 2026) brings Maratha Palace Sri Bangaru Kamakshi at peak.',
  NULL,
  'October in Thanjavur is the proper season opener. The NE monsoon arrives in force from mid-month — inland Thanjavur receives 200-280mm of rain across 9-11 wet days. The temperature drop is dramatic: daytime falls from late-September''s 31-32C to 24-30C, humidity 80 percent. Brihadeeswara Temple''s 6-hectare granite complex walks comfortably between showers. Navaratri (Sharad Navaratri, Shukla Pratipad of Ashwin, October 11-20 in 2026) brings full nine-night programming — the Maratha Palace Sri Bangaru Kamakshi shrine (Serfoji II''s personal devotional Shakti shrine in the palace inner courtyard) at peak. Saraswathi Mahal Library, the Royal Museum, Tanjore painting workshops at full schedules. Cyclone watch begins along the Coromandel coast — Thanjavur (100km inland from Nagapattinam) is in the secondary cyclone-impact zone. Cyclone Gaja (November 16, 2018 — Vedaranyam landfall) brought 200mm+ rain to Thanjavur in 24 hours. Hotel rates climb to 50-60 percent of December peak: Ideal River View Resort ₹5-7k, Sangam Hotel ₹4-5.5k, Hotel Gnanam ₹2.5-4k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 11, 5, 'go',
  'High season. 22-29C, 250-330mm rain. Karthigai Deepam Dec 4 build. Cyclone watch holds.',
  'November is full high season. Rain still substantial (250-330mm) but mornings clean, full Chola-heritage walking. Karthigai Deepam build-up late month.',
  NULL,
  'November in Thanjavur is full high-season. The NE monsoon remains active (250-330mm across 11-13 wet days) but rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Karthigai Deepam (full moon of Karthigai, Krittika nakshatra, December 4 in 2026) builds late November — Brihadeeswara Temple stages oil-lamp displays across the long colonnaded mandapam. Cyclone watch holds — Gaja landed at Vedaranyam (100km southeast) on November 16, 2018 and brought 200mm+ rain to Thanjavur; Nivar landed at Cuddalore on November 25, 2020. IMD updates daily. Brihadeeswara, Saraswathi Mahal Library, the Royal Museum, Tanjore painting workshops at full schedules. The three-Chola-temple UNESCO ensemble — Brihadeeswara at Thanjavur, Airavatesvara at Darasuram (70km northeast), Gangaikonda Cholapuram Brihadeeswara (105km northeast) — walks cleanly as a two-day Chola heritage route. Hotel rates climb to 75-85 percent of December peak: Ideal River View Resort ₹5.5-7.5k, Sangam Hotel ₹4-6k, Hotel Gnanam ₹3-4.5k. Build 1-2 buffer days for cyclone-watch flexibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thanjavur', 12, 5, 'go',
  'Peak season + Karthigai Deepam Dec 4 + Vaikunta Ekadasi Dec 30. 21-28C, 130-200mm rain.',
  'December is operational peak. Karthigai Deepam (December 4, 2026) at Brihadeeswara. Vaikunta Ekadasi (December 30, 2026) brings Srirangam (90km west) at peak — Thanjavur as base.',
  NULL,
  'December in Thanjavur is the operational peak. Two major festivals layer on the clean weather. Karthigai Deepam (December 4, 2026 — full moon of Karthigai, Krittika nakshatra) is the year''s major Shiva-light festival — Brihadeeswara Temple lights thousands of oil lamps across the long colonnaded mandapam and the 6-hectare temple precinct. The 66m granite vimana catches the oil-lamp ground-level glow upward. Vaikunta Ekadasi (December 30, 2026 — Margazhi-Sukla-Ekadasi) is the major annual Vaishnavite festival — Srirangam Ranganathaswamy Temple (90km west, the largest Vishnu temple in India at 156 acres) draws 5-7 million pilgrims across the 21-day Pagal Pathu + Ra Pathu festival. Thanjavur works as the operational base — Trichy and Srirangam are 55-90km west. Daytime 22-28C, rain 130-200mm across 7-9 wet days, humidity 70 percent. Cyclone watch holds through December 20 — Thane hit Cuddalore on December 30, 2011. The Christmas-NYE corridor sees Ideal River View Resort ₹7-9k, Sangam Hotel ₹5-7.5k, Hotel Gnanam ₹3.5-5.5k. Lock 6-8 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
