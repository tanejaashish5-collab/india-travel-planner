-- Chennai destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: chennai | best_months [11,12,1,2] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 1, 5, 'go',
  'Margazhi music tail + Pongal. 21-29C, dry. Marina at full evening rotation. Music Academy season runs till Jan 15.',
  'January is Chennai''s strongest stretch. Margazhi season tail runs through January 15 across Music Academy, Krishna Gana Sabha, Narada Gana Sabha. Pongal (Jan 14-17) brings four state holidays — Mylapore mada streets stage household kolam competitions. 22-29C, low humidity.',
  NULL,
  'Chennai in January is the version the city''s regulars book first. Daytime 22-29C, nights 21C, humidity below 65 percent, sea breeze hitting Marina by 4pm. The Margazhi music season (December 15 to January 15) runs its closing fortnight — 1000+ Carnatic concerts across 30 sabhas with Music Academy (TT Krishna Road), Krishna Gana Sabha, Narada Gana Sabha, Mylapore Fine Arts Club anchoring. Most sabha tickets ₹100-1500 per concert; season passes ₹3000-8000. Pongal (January 14-17) is the four-day harvest festival — Bhogi (14), Pongal (15, kolam-decorated rice-and-jaggery offering), Mattu Pongal (16, cattle veneration), Kaanum Pongal (17, family gatherings at Marina). State holiday cluster shuts most offices. Marina Beach (13km, second-longest urban beach in the world) at full evening rotation 4-9pm. Kapaleeshwarar Temple (Mylapore, 7th-century Pallava origins, 16th-century rebuild) 5:30am-12pm + 4-9pm. Fort St. George (1644, oldest British fort in India) museum 10am-5pm closed Friday ₹15. San Thome Basilica (over apostle Thomas''s tomb, one of three such churches globally) open 6am-9pm. Saravana Bhavan and Murugan Idli Shop fill 8-10am breakfast windows.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 2, 5, 'go',
  'Driest month. 21-30C. Heritage walking peak. Thai Pusam Feb 1, 2026 at Marudhamalai.',
  'February is Chennai''s technical peak. Rainfall under 10mm, humidity 60 percent, full heritage-walk weather. Thai Pusam (February 1, 2026) brings Muruga pilgrimage spikes — Marudhamalai outside Coimbatore is the big stage but Vadapalani Murugan Temple in Chennai sees crowds.',
  NULL,
  'February in Chennai is the year''s cleanest weather window. Rainfall under 10mm, daytime 22-30C, humidity at 60 percent — the lowest of the year. Thai Pusam (Pushya nakshatra in Tamil Thai month, February 1 in 2026) is the major Muruga festival — Palani and Marudhamalai are the headline temples but Vadapalani Andavar Temple and Tiruporur (45km south on ECR) see large kavadi processions. Marina Beach evening rotation 4-9pm at full capacity weekends. Kapaleeshwarar Temple (Mylapore, 16th-century rebuild on Pallava origins, the seven-tier gopuram visible from the Mada Streets) 5:30am-12pm + 4-9pm — the Mylapore mada streets walking tour (Kapaleeshwarar, Mundakanni Amman, Pongi Amman, Karaneeswarar) works mornings before 10am. Fort St. George museum 10am-5pm closed Friday ₹15 — Robert Clive''s house and the Banqueting Hall hold the strong original artefacts. San Thome Basilica (1893 Neo-Gothic over the original 16th-century Portuguese church, built over apostle Thomas''s tomb) open 6am-9pm. Saravana Bhavan T Nagar and Murugan Idli Shop Besant Nagar anchor breakfast. Hotel rates at peak: ITC Grand Chola ₹15-20k, Taj Coromandel ₹14-18k, mid-tier business hotels ₹4-7k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 3, 4, 'go',
  'Last cool month. 24-33C, humidity climbing. Heritage walks viable till 11am and after 5pm.',
  'March extends February''s weather minus the music-season finale. Heritage walks work dawn-to-11am and post-5pm. Hotel rates ease 15-20 percent versus February peak. Last comfortable window before the April heat dome.',
  NULL,
  'March in Chennai is the soft-landing month. Daytime 25-33C, humidity climbing toward 75 percent in the last fortnight, sea breeze less reliable. The heritage-walking shape compresses into 7-11am and 5-9pm windows. Mylapore mada streets stay walkable mornings; Marina Beach evening crowd thins until the last week of the month when the heat starts pulling people to the sea breeze again. Kapaleeshwarar Temple, San Thome Basilica, Fort St. George all hold full schedules. The DakshinaChitra heritage village (25km south on ECR, recreations of Tamil Nadu, Karnataka, Kerala, Andhra rural homes, open 10am-6pm closed Tuesday ₹120) is the strongest mid-day AC retreat — the recreated agraharam houses run through the heat. Government Museum Egmore (1851, fifth-oldest museum in India, the Bronze Gallery holds Chola masterpieces) 9:30am-5pm closed Friday ₹15. T Nagar shopping street (Pothys, Saravana Stores, Nalli Silks since 1928) runs mid-day in AC. Hotel rates ease 15-20 percent versus February: ITC Grand Chola ₹12-15k, Taj Coromandel ₹11-14k, mid-tier business hotels ₹3.5-5.5k. Last comfortable window before April pushes the city into endurance shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 4, 2, 'wait',
  'Heat dome opens. 27-37C, humidity 75 percent. Outdoor heritage walks collapse. Tamil New Year Apr 14.',
  'April still works for AC-heavy itineraries — museums, T Nagar shopping, basilicas. Tamil New Year (April 14, Puthandu) brings family programming. Mid-day strictly indoors.',
  'April is when Chennai''s heat dome opens. Daytime 28-37C, humidity 75 percent, sea breeze unreliable till 5pm. Outdoor heritage walking — Mylapore mada streets, Marina, Fort St. George open courtyards — collapses 10am-5pm. Push to October-November for clean walking weather.',
  'April in Chennai is when the trip narrows to early morning and after-dark. Daytime 28-37C, humidity 75 percent, sea breeze starts only after 5pm and remains intermittent. Tamil New Year (Puthandu, April 14) is observed across the state — Kapaleeshwarar Temple and Vadapalani Murugan Temple run special pre-dawn darshan, traditional Saravana Bhavan-style sadhya thalis ₹250-600 stage across major restaurants. The heritage walk works as 6-9am and 6-10pm only. AC retreats: Government Museum Egmore Bronze Gallery, Madras High Court (1892, world''s second-largest court complex after the Old Royal Courts of Justice, public viewing 10am-5pm except Fri-Sun) corridors, ITC Grand Chola lobby. T Nagar shopping (Pothys, Saravana Stores, Nalli Silks since 1928) is the standard mid-day option. Hotel rates drop 25-30 percent versus February: ITC Grand Chola ₹10-13k, Taj Coromandel ₹9-12k, mid-tier business hotels ₹3-5k. Mango season anchor: Salem alphonso (Banganapalli) and Imam Pasand at Koyambedu wholesale market ₹150-400/kg. Push to October-November for the clean shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 5, 2, 'wait',
  'Peak heat. 29-39C, humidity 75 percent. Outdoor walks impossible 10am-5pm. Hotel rates at year-low.',
  'May is functional only for AC-anchored business trips or T Nagar shopping. Mid-day strictly indoors. Pre-monsoon thunderstorms occasional last fortnight.',
  'May runs the heat dome at full strength. Daytime 29-39C with occasional spikes to 41-42C, humidity 75 percent, sea breeze unreliable. Heritage walking, Marina Beach mid-day, Mylapore mada streets all functionally closed 10am-5pm. Push to November.',
  'May in Chennai is the year''s harshest stretch. Daytime 29-39C with the last week occasionally hitting 41-42C — Madras Day usually marks the city''s annual heat peak. Humidity 75 percent, sea breeze unreliable till 6pm. Pre-monsoon Mango Showers begin in the last fortnight — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but raise humidity to 88 percent. Heritage walking and outdoor sights collapse 10am-6pm. Marina Beach evening crowd is still substantial after 6pm — the sea breeze finally hits and locals decamp en masse — but afternoon is unusable. AC venues stay viable: Government Museum Egmore (Bronze Gallery is the standout — Nataraja, Ardhanarisvara, Krishna Govardhana bronzes from Tanjore region 9th-13th century), DakshinaChitra heritage village if you can tolerate the open-air courtyard sections after 5pm, T Nagar shopping. Hotel rates at year-low: ITC Grand Chola ₹8-11k, Taj Coromandel ₹7-10k, mid-tier business hotels ₹2.5-4k. Mango season at peak — Koyambedu wholesale market 4am-11am ₹120-350/kg for Banganapalli, Imam Pasand, Sendhura. The clean travel window opens November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 6, 2, 'wait',
  'SW monsoon weak on TN coast. 27-37C, only 50-80mm rain. Heat continues. Sea breeze improves slightly.',
  'June brings the SW monsoon to the Western Ghats but TN coast is in the rain shadow — Chennai sees only 50-80mm. Sea breeze improves slightly. Still a heat-dominated month.',
  'June in Chennai is heat-with-occasional-rain. Unlike Kerala (which receives the SW monsoon in full force June 1), TN coast sits in the rain shadow — Chennai records just 50-80mm of June rain across 5-8 wet days. Heat dominates. Push to October-November.',
  'June in Chennai is a quirk of the dual-monsoon geography. The southwest monsoon arrives in Kerala on or around June 1 but hits the Western Ghats face and largely exhausts its moisture there — by the time the residual current crosses to the Coromandel coast, Chennai receives only 50-80mm of rain across 5-8 wet days. The city remains heat-dominated: daytime 27-37C, humidity 75 percent, sea breeze improving slightly versus May. Outdoor heritage walking still impossible 10am-5pm. The compensation: pre-monsoon mango season tail keeps Koyambedu wholesale market well-stocked, jackfruit (palapazham) hits annual peak — Eldams Road and T Nagar street vendors stage ripe-fruit rotations through the week. AC venues all hold full hours. Hotel rates remain in the low-season bracket: ITC Grand Chola ₹8-11k, Taj Coromandel ₹7-10k, mid-tier business hotels ₹2.5-4k. Marina Beach evening rotation 5:30-9pm reliable. Saravana Bhavan, Murugan Idli Shop, Hotel Sangeetha all hold full hours and AC. The clean travel window opens November once the NE monsoon delivers its relief.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 7, 3, 'wait',
  'SW monsoon tail. 26-35C, 100-130mm rain. Aadi Perukku Aug 3. Heat eases slightly.',
  'July sees marginal heat relief — sea breeze stronger, rain showers 8-10 days. Aadi Perukku (August 3 fixed) is a Cauvery river festival — Tamil cultural anchor. Mid-day still demanding indoors.',
  'July is marginal improvement on June heat. Sea breeze stronger, rain showers 8-10 days, but daytime still 26-35C. Outdoor heritage walks compress to dawn and post-7pm.',
  'July in Chennai marks the first easing of the heat dome. Daytime 26-35C, humidity 78 percent, sea breeze stronger and more reliable from 4pm onward. The SW monsoon residue brings 100-130mm across 8-10 wet days — short evening squalls rather than sustained deluges. The Tamil month Aadi opens (mid-July to mid-August), bringing Aadi Pirappu festivities in family homes. Heritage venues all run normal hours; the heat compression on outdoor walking eases. Marina Beach evening rotation 5-9pm reliable. Kapaleeshwarar Temple, San Thome Basilica, Vadapalani Murugan, Parthasarathy Temple Triplicane (Pallava origins) hold their morning and evening windows. Government Museum Egmore Bronze Gallery, DakshinaChitra heritage village (25km south on ECR — open-air sections work post-5pm), Madras High Court guided tours all viable. Hotel rates in the low-season window: ITC Grand Chola ₹7-10k, Taj Coromandel ₹6-9k, mid-tier business hotels ₹2.5-4k. T Nagar shopping at the Aadi sale peak — Pothys, Saravana Stores, Nalli Silks run discounted silk and sari ranges through the month. Better window: November onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 8, 3, 'wait',
  'Aadi continues. 26-34C, 130-160mm rain. Aadi Perukku Aug 3 Cauvery anchor. Madras Day Aug 22.',
  'August brings Aadi Perukku (August 3, Cauvery river-bank festival), Aadi sale finals, and Madras Day (August 22, city''s 1639 founding anniversary). Heat compresses but improvement is incremental.',
  'August holds July''s pattern — moderate rain, persistent humidity, sea breeze evening relief. Outdoor heritage walks limited to dawn and post-7pm. The dramatically cleaner window is November onward.',
  'August in Chennai layers two cultural anchors on the slow heat retreat. Aadi Perukku (August 3, fixed) is the Cauvery river-bank festival — observed at Mayuram, Tanjore, Srirangam, Trichy, Erode primarily but Chennai-based families travel for it. Madras Day (August 22) marks the 1639 founding of the city when Francis Day of the East India Company purchased a 5-mile coastal strip from the Damarla Venkatadri Nayak — Madras Week programming runs heritage walks, photo exhibitions, lectures across Madras Literary Society, Asian College of Journalism, Fort Museum, DakshinaChitra, INTACH. Daytime 26-34C, humidity 80 percent, rain 130-160mm across 11-13 wet days. Marina Beach evening rotation reliable. Pulikali (tiger dance) processions hit Thrissur 8 hours west — not a Chennai festival but Tamil cultural cross-traffic. Hotel rates remain low-season: ITC Grand Chola ₹7-10k, Taj Coromandel ₹6-9k, mid-tier business hotels ₹2.5-4k. Saravana Bhavan T Nagar, Murugan Idli Shop Besant Nagar, Hotel Sangeetha Nungambakkam stage Aadi-month vegetarian thalis. The dramatically cleaner travel window opens November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-33C, 130-180mm rain. Vinayaka Chathurthi Sep 7, 2026. Heat easing.',
  'September is the wind-down before the NE monsoon. Vinayaka Chathurthi (around September 7, 2026 — variable Bhadrapada Shukla Chathurthi) brings Pillayar idol immersion processions at Marina. Hotel rates climb 10-15 percent versus August low.',
  'September continues the slow approach to clean weather but the NE monsoon proper does not arrive till mid-late October. Outdoor heritage walks work mornings, evenings, but afternoon humidity remains 80 percent. Push to mid-October.',
  'September in Chennai is the bridge month before the NE monsoon arrives. Daytime 26-33C, humidity easing toward 78 percent, sea breeze increasingly reliable. Vinayaka Chathurthi (Pillayar, Ganesh — variable Bhadrapada Shukla Chathurthi date — September 7 in 2026) brings the city''s biggest Hindu festival of the latter half-year. Pillayar idols across colonies parade to Marina Beach for ceremonial immersion on the eleventh day (Anantha Chaturdashi); the procession through Triplicane, Mylapore, Royapettah, Egmore stretches several hours. Heat compresses on outdoor walking still — 11am-5pm uncomfortable but workable. Marina Beach evening rotation 4-9pm at year-best capacity. Government Museum Egmore, Fort St. George, San Thome Basilica, Kapaleeshwarar Temple all at full hours. Hotel rates climb 10-15 percent versus August low: ITC Grand Chola ₹8-11k, Taj Coromandel ₹7-10k, mid-tier business hotels ₹3-4.5k. Conferences and corporate events return to the city after the monsoon-quiet summer — Friday-Sunday occupancy lifts. The cleanest window opens once the NE monsoon delivers its first proper rains mid-late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 10, 3, 'wait',
  'NE monsoon arrives. 24-32C, 250-350mm rain. Heritage walks rain-interrupted. Cyclone watch begins.',
  'October is the NE monsoon arrival month. Coromandel coast becomes wet — 250-350mm across 11-13 wet days. Heritage walks rain-interrupted. Cyclone watch begins. Diwali (variable, around October 21, 2026) anchors month-end programming.',
  'October sees the NE monsoon arrive in force on Chennai''s coast — 250-350mm rain, 11-13 wet days. Heritage walking rain-interrupted. Cyclone watch begins. November-December are the much stronger calls.',
  'October in Chennai is the NE monsoon arrival month — unlike the SW monsoon (which barely touches the city), the NE current is the dominant rainfall season for the Coromandel coast. Rainfall jumps from September''s 130-180mm to 250-350mm across 11-13 wet days, daytime 25-32C, humidity 82 percent. The temperature relief is real — heat dome closed — but the city sees its first sustained wet stretches of the year. Cyclone watch begins: historically Vardah (December 2016), Nivar (November 2020), and Michaung (December 2023) have all hit Chennai or Cuddalore. IMD monitors Bay of Bengal lows from October 1; the city updates emergency drainage and Marina Beach traffic plans through the month. Diwali (variable Hindu calendar, around October 21 in 2026) anchors month-end — Marina Beach fireworks, T Nagar shopping at peak silk-and-sari pre-Diwali rotation, sweet shops Adyar Anand Bhavan, Sri Krishna Sweets, Grand Sweets run extended hours. Hotel rates climb to 40-50 percent of December peak: ITC Grand Chola ₹10-13k, Taj Coromandel ₹9-12k. The much cleaner travel calls are November onward as rain frequency drops and temperature stabilises.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 11, 5, 'go',
  'NE monsoon active but eases. 23-30C, 350-400mm rain. Karthigai Deepam late-month. Hotel rates climb.',
  'November is the proper start of Chennai''s clean season. Rain still heavy (350-400mm) but daytime 23-30C, humidity 75 percent, full heritage-walk weather between showers. Karthigai Deepam late-month brings Tiruvannamalai cross-traffic.',
  NULL,
  'November in Chennai is the proper start of the high season. The northeast monsoon remains active (350-400mm across 12-14 wet days) but the rain pattern shifts to short evening squalls rather than sustained deluges; mornings often run clean. Daytime 23-30C, nights 22C, humidity 75 percent, sea breeze cool and reliable. Cyclone watch holds — Nivar hit Cuddalore on November 25, 2020 — IMD updates Bay of Bengal lows daily. Karthigai Deepam (full moon of the Karthigai month, Krittika nakshatra) falls in late November or early December — 2026 is December 4, with build-up programming late November. Tiruvannamalai (4 hours southwest) is the main draw but Chennai temple courtyards stage the Karthigai oil-lamp displays. Marina Beach evening rotation 4-9pm at full capacity. Government Museum Egmore Bronze Gallery, Fort St. George, Kapaleeshwarar Temple, San Thome Basilica, DakshinaChitra heritage village all at full hours. Hotel rates climb to 70-80 percent of December peak: ITC Grand Chola ₹12-15k, Taj Coromandel ₹11-14k, mid-tier business hotels ₹3.5-5.5k. Strong call for first-time visitors who want full city programming without the Margazhi music-season crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chennai', 12, 5, 'go',
  'Margazhi music season + NE monsoon tail. 22-29C, 200-250mm rain. Music Academy at peak. Cyclone watch.',
  'December is the Chennai operational peak. Margazhi music season opens December 15 — 1000+ concerts across 30 sabhas. NE monsoon tail still drops 200-250mm. Cyclone watch holds. Lock rooms 4-6 weeks ahead.',
  NULL,
  'December in Chennai is the operational peak — Margazhi music season pulls visitors from across the country and the diaspora returns for the family-and-concert calendar. The Tamil month Margazhi opens December 15 — 1000+ Carnatic concerts across 30 sabhas with Music Academy (TT Krishna Road, season anchor since 1928), Krishna Gana Sabha, Narada Gana Sabha, Mylapore Fine Arts Club holding marquee schedules. Sabha canteens (Music Academy''s Kalyana Bhavan, the Mylapore filter-coffee stops Rayar''s Mess and Karpagambal Mess) become unofficial green-rooms. Most sabha tickets ₹100-1500; season passes ₹3000-8000. Karthigai Deepam (December 4, 2026) brings Tiruvannamalai cross-traffic. NE monsoon tail drops 200-250mm across 8-10 wet days — Marina access closes intermittently on cyclone-watch days. Daytime 22-29C, humidity 75 percent. Hotel rates at year-peak: ITC Grand Chola ₹15-22k, Taj Coromandel ₹14-20k, mid-tier business hotels ₹4-7k. Lock sabha-adjacent accommodation in Mylapore 4-6 weeks ahead. Cyclone watch holds through December 20 historically.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
