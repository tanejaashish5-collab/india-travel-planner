-- Chidambaram destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: chidambaram | best_months [11,12,1,2] | avoid [5,6,7]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 1, 5, 'go',
  'Peak Nataraja temple window. 22-29C, dry. Pradosham nights, dawn abhishekam. Margazhi tail.',
  'January is Chidambaram''s strongest stretch. Daytime 22-29C, low humidity, full Nataraja temple darshan windows. The dawn abhishekam (4-7am) and the four-times-daily aarti runs cleanly. Margazhi music tail brings classical-dance pilgrims through Jan 15.',
  NULL,
  'Chidambaram in January is the version a Shaivite pilgrimage trip is built around. Daytime 22-29C, nights 20C, humidity 65 percent. The Thillai Nataraja Temple — Pancha Bhoota Stalam of Space (Akasha) among the five Shiva elemental temples, alongside Kanchipuram (Earth), Tiruvanaikaval (Water), Thiruvannamalai (Fire), Kalahasti (Wind) — is the year-round draw. The 40-acre complex holds the Chit Sabha (the small gold-roofed sanctum where Shiva is worshipped as the cosmic dancer Nataraja), the Kanaka Sabha (the gold-leafed mandapam beside it), and the Chidambara Rahasyam — the empty space behind the curtain representing Space/Akasha as formless divinity, revealed through curtain-parting at peak aartis. Inner-sanctum priesthood is held by the Dikshitars — about 350 endogamous priestly families, the only Shaivite community holding complete temple-administration rights independent of state HRCE control. Temple opens 6am-12pm + 4:30-10pm with six daily pujas. Hotel rates: Hotel Saradharam ₹2-3.5k, Hotel Akshaya ₹1.5-2.5k, dharmashalas ₹500-1000. Chidambaram is 230km south of Chennai via NH-32; 6 hours by road.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 2, 5, 'go',
  'Driest month + Natyanjali in Maha Shivaratri week. 22-30C. 5 days of classical dance at Nataraja temple.',
  'February is full peak. Natyanjali Dance Festival (Maha Shivaratri week, late Feb or early Mar 2026 — verify Phalguna Krishna Chaturdashi) brings Bharatanatyam dancers from across India for 5 days at the Nataraja temple. Free entry. Book Chidambaram accommodation 6-8 weeks ahead.',
  NULL,
  'February in Chidambaram is the year''s cultural peak — Natyanjali Dance Festival is the defining event. Held during Maha Shivaratri week (variable Phalguna Krishna Chaturdashi, late February or early-to-mid March 2026 — verify via Tamil Nadu Tourism), the festival stages 5 days of classical Bharatanatyam, Kathak, Odissi, Kuchipudi, Mohiniyattam, Manipuri performances at the Nataraja Temple courtyard. Began 1980 as a homage to Shiva as Nataraja; today draws 800-1200 dancers from across India. Free entry for most evening performances. The 1000-pillar mandapam becomes the open-air stage with the gold-roofed Chit Sabha as backdrop. Daytime 23-30C, humidity 60 percent. The temple''s six daily pujas (Palli Eluchi 6am, Sirukala Sandhi 9am, Kala Sandhi 11:30am, Uchikkala 12pm, Sayaraksha 6pm, Ardha Jamam 10pm) all open through the festival. Hotel rates climb to 1.5-2x normal during Natyanjali: Hotel Saradharam ₹3.5-5k, Hotel Akshaya ₹2.5-4k, basic dharmashalas ₹800-1500. The Maha Shivaratri all-night vigil sees the temple courtyard fill with 30,000-40,000 devotees. Book 6-8 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 3, 5, 'go',
  'Natyanjali tail + heat building. 25-32C. Maha Shivaratri week may fall in March 2026 — verify.',
  'March extends the February peak when Maha Shivaratri falls in early March (variable — Phalguna Krishna Chaturdashi). Heat builds late month. Hotel rates ease 20 percent post-festival.',
  NULL,
  'March in Chidambaram is festival-month-or-soft-landing depending on the Hindu calendar position of Maha Shivaratri. Maha Shivaratri (Phalguna Krishna Chaturdashi, the moonless night of Phalguna month, variable February 26 to March 18 in 2026 — verify via panchang or drikpanchang.com) typically falls between late February and mid-March. When the date lands in March, the Natyanjali Dance Festival (5 days of classical Bharatanatyam, Kathak, Odissi at the Nataraja Temple courtyard, free entry) anchors the early-to-mid month and the temple''s overnight Shivaratri vigil pulls 30,000-40,000 devotees. When the festival has already passed in February, March settles into temple-pilgrimage standard. Daytime 26-32C, humidity climbing to 75 percent by end of month, sea breeze faint inland but Pichavaram mangrove estuary (15km east, the second-largest mangrove forest in India after Sundarbans) brings cooling 4-7pm. Temple six-puja schedule holds. Hotel rates ease 20 percent post-Natyanjali if festival was early: Hotel Saradharam ₹2.5-4k, Hotel Akshaya ₹1.8-3k. Last comfortable pilgrimage window before April pre-monsoon heat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 4, 3, 'wait',
  'Pre-monsoon heat. 27-36C, humidity 78 percent. Tamil New Year Apr 14. Temple windows compress.',
  'April still works for pre-dawn and night-puja darshan. Tamil New Year (April 14) brings temple programming. Mid-day temple-courtyard walking impossible.',
  'April pushes Chidambaram into pre-dawn-and-night windows only. Temple courtyards and the 1000-pillar mandapam scorching mid-day. Push to November.',
  'April in Chidambaram narrows the pilgrimage shape to dawn-and-night. Daytime 28-36C, humidity 78 percent, sea breeze faint inland. The Nataraja Temple''s 40-acre complex — granite courtyards, the gold-roofed Chit Sabha, the 1000-pillar mandapam, the four gopurams (East 134-foot, West 135-foot, the East gopuram covered in dance-relief sculpture across all 108 classical Bharatanatyam karanas — the only complete sculptural record of Bharatanatyam in India) — heats through mid-day. Tamil New Year (Puthandu, April 14) brings traditional Tamil-month festivities including the temple''s Chithirai Thiruvizha procession. The dawn Palli Eluchi puja (6am) and the night Ardha Jamam puja (10pm) hold their pilgrimage rhythms; mid-day darshan compresses. AC retreats: Hotel Saradharam, Hotel Akshaya. Hotel rates drop 25-30 percent versus February: Hotel Saradharam ₹2-3.5k, Hotel Akshaya ₹1.5-2.5k, basic dharmashalas ₹400-800. Pichavaram mangrove estuary (15km east) boat-ride window 8-10am only. Push to November onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 5, 2, 'wait',
  'Peak heat. 29-39C, humidity 78 percent. Temple courtyards scorching. Pre-monsoon thunderstorms last 10 days.',
  'May functions only for pre-dawn and night pujas. Mid-day temple-courtyard walking dangerous. Pre-monsoon thunderstorms last 10 days.',
  'May is Chidambaram''s harshest stretch. Temple courtyards and granite mandapams hold 50-55C surface heat mid-day. Pre-dawn and night-puja windows only. Push to November.',
  'May in Chidambaram runs the heat dome at full intensity. Daytime 29-39C, humidity 78 percent, sea breeze faint inland. The Nataraja Temple''s granite courtyards and the 1000-pillar mandapam reach 50-55C surface temperature by 11am; walking the four-gopuram circuit mid-day is genuinely uncomfortable. Pre-dawn Palli Eluchi puja (6am) and night Ardha Jamam puja (10pm) hold workable; mid-day strictly AC-anchored. Pre-monsoon thunderstorms hit the last 10 days as Mango Showers — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours. Hotel rates at year-low: Hotel Saradharam ₹1.8-3k, Hotel Akshaya ₹1.3-2.2k, basic dharmashalas ₹350-700. The Dikshitar community (the priestly families holding Nataraja temple administration) maintain reduced visitor-facing engagement through May. Pichavaram mangrove estuary 15km east — boat rides 6-9am only. Push to November-December for clean pilgrimage weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 6, 2, 'wait',
  'SW monsoon weak. 27-35C, only 50-70mm rain. Heat continues. Temple pre-dawn only.',
  NULL,
  'June is heat-with-marginal-rain. Inland TN in SW monsoon rain shadow. Temple courtyards still 45-50C mid-day. Push to November.',
  'June in Chidambaram sits in the SW monsoon rain shadow that defines inland Tamil Nadu — the Western Ghats absorb most moisture and only 50-70mm of light rain reaches the city through the month. Heat dominates: daytime 28-35C, humidity 75 percent. The Nataraja Temple courtyards still 45-50C surface mid-day; pre-dawn Palli Eluchi (6am) and night Ardha Jamam (10pm) the workable darshan windows. Pichavaram mangrove estuary (15km east, the second-largest mangrove forest in India after Sundarbans, accessible via Boat House at Pichavaram, Tamil Nadu Tourism Development Corporation guide-rowboat rides ₹150-400/hour) opens 8am-5pm — boat rides 6-9am only through June heat. Hotel rates remain low-season: Hotel Saradharam ₹1.8-3k, Hotel Akshaya ₹1.3-2.2k. Pre-monsoon Aadi-month religious traffic begins building mid-June for the major July-August Aadi observance. The clean travel window opens with the NE monsoon retreat in mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 7, 2, 'wait',
  'SW monsoon residual. 26-33C, 100-130mm rain. Aadi opens. Heat retreating slowly.',
  'July sees first heat retreat — sea breeze faint but evening thunderstorms drop temps. Aadi month opens; minor Aadi-month temple programming.',
  NULL,
  'July in Chidambaram marks the first measurable heat retreat. Daytime 27-33C, humidity 78 percent, occasional evening thunderstorms drop temperatures 4-5 degrees. SW monsoon residual brings 100-130mm across 7-9 wet days. The Tamil month Aadi opens (mid-July to mid-August) — Aadi-month religious traffic across the Cauvery delta district where Chidambaram sits. The Nataraja Temple''s six daily pujas hold normal schedules. Pichavaram mangrove estuary boat rides 7am-11am and 4-5pm windows. Hotel rates in the low-season window: Hotel Saradharam ₹2-3.5k, Hotel Akshaya ₹1.5-2.5k. Aadi Velli (every Friday in Aadi month) brings Kamakshi-type temple visits across Tamil Nadu — the temple''s Tillai Kali shrine (the older Shakti temple at Chidambaram, 2km from the Nataraja temple, the dance-contest legend between Shiva-as-Nataraja and Tillai Kali is the origin of the Nataraja iconography) sees additional Aadi-Friday traffic. October 15 onward delivers a much cleaner travel shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 8, 3, 'wait',
  'Aadi Perukku Aug 3. 26-32C, 130-160mm rain. Cauvery delta district at peak Aadi traffic.',
  'August brings Aadi Perukku (Cauvery river-bank festival, August 3 fixed) and the year''s peak Aadi-month religious traffic. Heat retreating slowly. October cleaner.',
  'August holds July pattern. Aadi religious traffic strong. Temple darshan pre-10am and post-5pm. October is the cleaner call.',
  'August in Chidambaram is peak Aadi-month religious traffic for the Cauvery delta district. Aadi Perukku (August 3, fixed Cauvery river-bank festival) is the year''s major regional water-festival — Mayuram, Tanjore, Srirangam, Trichy are the headline venues, but Chidambaram (lying 15km from Pichavaram mangrove estuary and the Bay of Bengal coast) sees significant Cauvery-tradition observance. The Nataraja Temple holds Aadi Perukku special pujas; the Tillai Kali shrine 2km from the Nataraja temple at Aadi-month peak. Aadi-month Friday processions through the four-gopuram core temple-circuit. Daytime 26-32C, humidity 80 percent, rain 130-160mm across 10-12 wet days. Hotel rates climb 25-30 percent weekends from Chennai weekend traffic: Hotel Saradharam ₹2.5-4k weekend, Hotel Akshaya ₹2-3.5k weekend. Pichavaram mangrove estuary at full visitor traffic 8am-5pm. The much cleaner travel window opens October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-31C, 130-180mm rain. Vinayaka Chathurthi Sep 7. Heat easing.',
  'September is the bridge month. Heat retreating, sea breeze reliable. Temple darshan windows lengthen. Push to October for full season opening.',
  NULL,
  'September in Chidambaram is the bridge month before the NE monsoon arrives. Daytime 26-31C, humidity 78 percent, sea breeze faint inland but evening thunderstorms more reliable. Vinayaka Chathurthi (variable Bhadrapada Shukla Chathurthi — September 7, 2026) brings Pillayar idol immersion processions; the Chidambaram temple-precinct organises a 4-5 hour procession ending at the temple tank. The Nataraja Temple''s six daily pujas at standard schedule. The Dikshitar priestly community resumes higher-engagement programming as the festival season approaches. Hotel rates climb 15-20 percent versus August low: Hotel Saradharam ₹2.5-4k, Hotel Akshaya ₹2-3.5k. Pichavaram mangrove estuary boat rides 8am-5pm at full hours. The NE monsoon arrives mid-to-late October — Chidambaram (lying inland 15km from Pichavaram coast) sees moderate rainfall versus the immediate coast. Mid-October onward is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 10, 4, 'go',
  'Season opens. 24-30C, 250-330mm rain. NE monsoon arrives. Cyclone watch begins.',
  'October is the season opener. NE monsoon delivers 250-330mm but temperature drops dramatically. Temple darshan returns to full daytime windows. Cyclone watch begins on the Coromandel coast.',
  NULL,
  'October in Chidambaram is the proper season opener. The NE monsoon arrives in force from mid-month — Chidambaram (inland Cauvery delta location) receives 250-330mm of rain across 11-13 wet days (significantly less than Nagapattinam-Tranquebar coast at 280-380mm). The temperature drop is dramatic: daytime falls from late-September''s 31C to 24-30C, humidity 80 percent. The Nataraja Temple''s 40-acre complex walks comfortably between showers; the four-gopuram circuit, the 1000-pillar mandapam, the Chit Sabha all at full daytime darshan. Cyclone watch begins along the Coromandel coast — Chidambaram is south of the cyclone-path peak (which lies Nagapattinam-Vedaranyam-Karaikal) but still receives heavy rain and wind from major systems. Cyclone Thane (December 2011 — Cuddalore, 70km north), Cyclone Gaja (November 2018 — Vedaranyam, 50km south) both brushed Chidambaram with major rain events. Track IMD updates via mausam.imd.gov.in. Pichavaram mangrove estuary (15km east) boat rides at full hours. Hotel rates climb to 50-60 percent of December peak: Hotel Saradharam ₹3-4.5k, Hotel Akshaya ₹2.2-3.5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 11, 5, 'go',
  'High season. 22-29C, 300-380mm rain. Karthigai Deepam late-month. Cyclone watch holds.',
  'November is full high season. Karthigai Deepam (December 4, 2026) build-up late month — full temple oil-lamp programming. Cyclone watch holds — Gaja (Nov 2018) brushed inland.',
  NULL,
  'November in Chidambaram is full high-season. The NE monsoon remains active (300-380mm across 12-14 wet days) but rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Karthigai Deepam (full moon of Karthigai month, Krittika nakshatra, December 4 in 2026) builds late November — Tiruvannamalai (5 hours west) is the headline festival venue with the 30-foot ghee cauldron lit at Arunachala summit, but Chidambaram''s Nataraja Temple stages full Karthigai oil-lamp programming through late November and early December. Cyclone watch holds — Cyclone Gaja landed at Vedaranyam (50km south) on November 16, 2018, and brushed Chidambaram with major wind and rain events; Cyclone Nivar landed at Cuddalore (70km north) on November 25, 2020. IMD updates daily. The Nataraja Temple''s six daily pujas at full schedule. Hotel rates climb to 75-85 percent of December peak: Hotel Saradharam ₹4-5.5k, Hotel Akshaya ₹3-4.5k, basic dharmashalas ₹800-1500. Build 1-2 buffer days for cyclone-watch flexibility. Pichavaram mangrove estuary at full visitor traffic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidambaram', 12, 5, 'go',
  'Peak season + Karthigai Deepam Dec 4 + Marghazhi tail. 21-28C, 150-220mm rain. Cyclone watch through Dec 20.',
  'December is operational peak. Karthigai Deepam (December 4, 2026) brings full temple oil-lamp programming. Margazhi music season builds. Cyclone watch holds — Thane Dec 2011 hit Cuddalore.',
  NULL,
  'December in Chidambaram is the operational peak. Karthigai Deepam (full moon of Karthigai month, Krittika nakshatra, December 4 in 2026) is the year''s major Shiva-light festival — the Nataraja Temple lights thousands of oil lamps across the 1000-pillar mandapam, the four-gopuram circuit glows for the full month, and devotees observe the 11-day Krittika-cycle lights at home. Tiruvannamalai (5 hours west) holds the headline 30-foot ghee cauldron at Arunachala summit, but Chidambaram''s Nataraja Temple is the Pancha Bhoota Stalam of Space and draws strong pilgrim traffic. Margazhi music season (December 15 - January 15) brings Carnatic concerts to the Nataraja Temple courtyard — Chidambaram is one of the year-round Margazhi-circuit venues alongside Chennai sabhas. Daytime 22-28C, nights 20C, rain 150-220mm across 7-9 wet days (NE monsoon tail), humidity 70 percent. Cyclone watch holds through December 20 — Cyclone Thane hit Cuddalore (70km north) on December 30, 2011 with major destruction along the broader stretch. The Christmas-NYE corridor sees Hotel Saradharam at ₹5-7k, Hotel Akshaya ₹3.5-5k, basic dharmashalas ₹1000-1800. Lock 6-8 weeks ahead for Karthigai Deepam.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
