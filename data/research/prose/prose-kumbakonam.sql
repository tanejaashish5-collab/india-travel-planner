-- Kumbakonam destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kumbakonam | best_months [11,12,1,2] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 1, 5, 'go',
  'Peak temple-town window. 22-30C, dry. 188 temples + Airavatesvara UNESCO at Darasuram. Coffee at peak.',
  'January is Kumbakonam''s strongest stretch. Daytime 22-30C, dry. The Temple City''s 188 temples walk comfortably; Airavatesvara at Darasuram (UNESCO 2004, 4km away) opens 6am-8:30pm. Cothas filter coffee at peak.',
  NULL,
  'Kumbakonam in January is the version a temple-and-coffee trip is built around. Daytime 22-30C, nights 20C, humidity 65 percent. The city — sitting 280km southwest of Chennai in the Cauvery delta, on the Cauvery-Arasalar river junction — holds approximately 188 temples within a 3km radius, the densest concentration in India. Four anchor on the year-round circuit: Sarangapani Temple (Vaishnavite, one of the 108 Divya Desams, the second-largest Vishnu temple in Tamil Nadu after Srirangam), Adi Kumbeswarar Temple (Shaivite, the city''s name-anchor, with the Mahamaham tank as sacred bathing tank), Nageswaran Temple (Shaivite, Chola-era with finest stone-relief sculptural panels), and Ramaswamy Temple (Vaishnavite, Ramayana-mural mandapam) — all 6am-12pm + 4-9pm. Airavatesvara Temple at Darasuram (4km west, UNESCO 2004 under Great Living Chola Temples, Rajaraja II 12th century, the stone-chariot-with-horse-wheels mandapam, 6am-8:30pm free entry, ASI) is the year-round must-anchor. Hotel rates: Hotel Sara Regency ₹2-3.5k, Mantra Veppathur Resort (12km east) ₹3.5-5.5k, basic lodges ₹600-1200. Kumbakonam degree coffee at the Big Bazaar Street filter-coffee stops is the year-round draw.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 2, 5, 'go',
  'Driest month. 22-31C. Mahamaham 2028 cycle — for 2026 the tank is just a stop. Temple walking peak.',
  'February is the technical peak. Rainfall under 10mm, low humidity, full temple-and-coffee shape. Mahamaham tank quiet (next cycle February 2028 — 12-year cycle). Airavatesvara UNESCO walks cleanly.',
  NULL,
  'February in Kumbakonam is the year''s cleanest weather window. Rainfall under 10mm, daytime 23-31C, humidity 60 percent. The Mahamaham tank — the 20-acre stone-stepped tank at Adi Kumbeswarar Temple, the most sacred Shaivite bathing tank in Tamil Nadu — sees only modest visitor traffic outside its 12-year cycle. The Mahamaham festival (Tamil Maasi month, Pushya nakshatra, when Sun and Jupiter align in specific positions) draws 1-2 million pilgrims for a single mass-bath day, but happens only once every 12 years. Last Mahamaham: February 22, 2016. Next: expected February 2028 — verify with Hindu Religious and Charitable Endowments department. For 2026, the Mahamaham tank is quiet — peaceful sunrise photography across the 16 surrounding mandapams. The four-temple circuit (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) walks cleanly. Airavatesvara at Darasuram (4km west, UNESCO Great Living Chola Temples) at peak — the stone-chariot-with-horse-wheels mandapam catches dawn light 6:30am. Hotel rates at peak: Mantra Veppathur Resort ₹4-6k, Hotel Sara Regency ₹2.5-4k, basic lodges ₹800-1500. Kumbakonam degree coffee at Big Bazaar Street filter-coffee stops at peak character.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 3, 4, 'go',
  'Last cool month. 25-33C, humidity climbing. Temple walks pre-11am and post-5pm.',
  NULL,
  NULL,
  'March in Kumbakonam is the soft-landing month before the heat dome opens. Daytime 26-33C, humidity climbing from 65 to 75 percent across the month, sea breeze faint inland but Pichavaram mangrove cooling (40km east) brings evening relief. The four anchor temples (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) walk pre-11am and 4:30-7pm windows. Airavatesvara at Darasuram (4km west, UNESCO 2004 — the Rajaraja II 12th-century construction, the stone chariot-and-horse-wheels mandapam) holds 6am-8:30pm ASI hours; mid-day visit feasible due to the temple''s lower visitor volume. The Great Living Chola Temples UNESCO ensemble includes Brihadeeswara Temple at Thanjavur (40km west), Airavatesvara at Darasuram, and Gangaikonda Cholapuram Brihadeeswara (35km north of Kumbakonam at Jayankondam) — a one-day three-temple Chola heritage route works as a winter-season anchor. Hotel rates ease 20 percent: Mantra Veppathur Resort ₹3.5-5k, Hotel Sara Regency ₹2-3.5k, basic lodges ₹600-1200. Kumbakonam degree coffee at the original Big Bazaar Street stops, Saravana Bhavan, and the Cauvery-delta unbranded stops at full character. Last comfortable temple-walking window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 4, 2, 'wait',
  'Heat dome opens. 28-39C, humidity 78 percent. Temple walks compress to dawn. Tamil New Year Apr 14.',
  'April still works for pre-dawn temple darshan and coffee-shop AC stays. Tamil New Year (April 14) brings temple programming. Mid-day temple-courtyard walking impossible.',
  'April pushes Kumbakonam into pre-dawn-only temple-walking. Granite courtyards and stone mandapams scorching mid-day. Push to November.',
  'April in Kumbakonam is when the temple trip narrows to dawn-and-night. Daytime 28-39C, humidity 78 percent, sea breeze faint inland. Tamil New Year (Puthandu, April 14) brings city-wide programming — the four anchor temples run special 5am abhishekam, sadhya thalis at Saravana Bhavan and the unbranded Cauvery-delta restaurants ₹150-400. The 188-temple urban core compresses to 5:30-9am and 6-9pm. Airavatesvara at Darasuram (4km west, UNESCO) — the stone-carved courtyards reach 45-50C surface temperature by 11am; visit pre-9am. AC retreats: Mantra Veppathur Resort (12km east), Hotel Sara Regency, the air-conditioned booth at Sarangapani Temple''s temple-shop complex. Hotel rates drop 25-30 percent versus February: Mantra Veppathur Resort ₹3-4.5k, Hotel Sara Regency ₹1.8-3k, basic lodges ₹500-1000. Cothas Coffee and Big Bazaar Street filter-coffee stops stay AC-cool through the heat — the Kumbakonam degree coffee at 6am and 5pm hits hardest. Push to November onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 5, 2, 'wait',
  'Peak heat. 29-40C, humidity 75 percent. Temple courtyards scorching. Pre-monsoon thunderstorms last 10 days.',
  'May functions for pre-dawn temple visits and AC coffee-shop stays. Mid-day temple walking impossible. Pre-monsoon thunderstorms last 10 days.',
  'May is Kumbakonam''s harshest stretch. Temple courtyards hold 50-55C surface heat mid-day. Pre-dawn only. Push to November.',
  'May in Kumbakonam runs the heat dome at full intensity. Daytime 29-40C with the last week occasionally hitting 41C, humidity 75 percent, sea breeze faint inland. The granite courtyards of the four anchor temples (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) and the stone-chariot mandapam at Airavatesvara reach 50-55C surface temperature by 11am. Pre-dawn darshan (5:30-9am) is the workable window; mid-day strictly AC-anchored. Pre-monsoon thunderstorms hit the last 10 days as Mango Showers — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours. Hotel rates at year-low: Mantra Veppathur Resort ₹3-4k, Hotel Sara Regency ₹1.5-2.5k, basic lodges ₹400-800. Mango season — the Cauvery delta is one of Tamil Nadu''s major mango regions, Banganapalli and Imam Pasand at peak. Cothas Coffee and Big Bazaar Street filter-coffee stops stay AC-cool — these are the all-day mid-day anchor. Brihadeeswara Temple at Thanjavur (40km west, UNESCO Great Living Chola Temples) similarly compressed to dawn. Push to November-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 6, 2, 'wait',
  'SW monsoon weak. 28-37C, only 40-60mm rain. Heat continues. Temple darshan pre-9am only.',
  NULL,
  'June is heat-with-marginal-rain. Inland Cauvery delta in SW monsoon rain shadow. Temple courtyards still 45-50C mid-day. Push to November.',
  'June in Kumbakonam sits in the SW monsoon rain shadow that defines inland Tamil Nadu — the Western Ghats absorb most moisture and only 40-60mm of light rain reaches the Cauvery delta through the month. Heat dominates: daytime 28-37C, humidity 75 percent, sea breeze faint inland. The four anchor temples (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) and Airavatesvara at Darasuram (UNESCO) all hold standard hours but visitor traffic at year-low. Hotel rates remain low-season: Mantra Veppathur Resort ₹3-4k, Hotel Sara Regency ₹1.5-2.5k. Cothas Coffee and Big Bazaar Street filter-coffee stops stay AC-cool — the Kumbakonam degree coffee tradition draws year-round even through the heat. Brihadeeswara Temple at Thanjavur (40km west) and Gangaikonda Cholapuram Brihadeeswara (35km north) round out the Great Living Chola Temples UNESCO ensemble — a Chola heritage day-trip works as a winter-only proposition. The clean travel window opens with the NE monsoon retreat in mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 7, 3, 'wait',
  'SW monsoon residual. 27-34C, 80-110mm rain. Aadi opens. Heat retreating slowly.',
  'July sees first heat retreat — evening thunderstorms drop temps. Aadi month opens mid-July; major Aadi-Friday processions at Cauvery-delta temples.',
  NULL,
  'July in Kumbakonam marks the first measurable heat retreat. Daytime 27-34C, humidity 78 percent, evening thunderstorms drop temperatures 4-5 degrees. SW monsoon residual brings 80-110mm across 6-8 wet days. The Tamil month Aadi opens (mid-July to mid-August) — Aadi-month religious traffic across the Cauvery delta district. Aadi Velli (every Friday in Aadi month) brings Shakti-temple visits across Tamil Nadu — Kumbakonam has multiple Shakti temples in the broader 188-temple count. The four anchor temples at full schedules. Hotel rates in the low-season window: Mantra Veppathur Resort ₹3-4.5k, Hotel Sara Regency ₹2-3k. Aadi sale at the Tamil Nadu Co-op Society silk and textile outlets brings discounted pre-festival inventory across the month. Brihadeeswara Temple at Thanjavur (40km west, UNESCO Great Living Chola Temples) — visit pre-9am or post-5pm. Cothas Coffee and Big Bazaar Street filter-coffee stops at standard hours. October 15 onward delivers a much cleaner travel shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 8, 3, 'wait',
  'Aadi Perukku Aug 3. 26-33C, 110-140mm rain. Cauvery delta at peak Aadi traffic. Heat retreating.',
  'August brings Aadi Perukku (Cauvery river-bank festival, August 3 fixed) at peak observance — Kumbakonam sits on the Cauvery-Arasalar junction. October cleaner.',
  'August holds July pattern with Aadi-month religious traffic. Temple darshan pre-10am and post-5pm. October is the cleaner call.',
  'August in Kumbakonam is peak Aadi-month religious traffic for the Cauvery delta. Aadi Perukku (August 3, fixed Cauvery river-bank festival) is the year''s major regional water-festival — Kumbakonam sits at the Cauvery-Arasalar river junction and observance is intense. The Mahamaham tank (20-acre stone-stepped tank at Adi Kumbeswarar Temple south side) sees Aadi-Perukku-day visitors performing river-bank rituals (5,000-8,000 visitors on the day, ordinary local-pilgrim scale outside the 12-year Mahamaham cycle). Sarangapani Temple, Adi Kumbeswarar Temple, Nageswaran Temple all hold Aadi Perukku special pujas. Daytime 26-33C, humidity 80 percent, rain 110-140mm across 9-11 wet days. The four anchor temples walk pre-10am and post-5pm. Hotel rates climb 25-30 percent weekends from Chennai-Trichy weekend traffic: Mantra Veppathur Resort ₹4-5.5k weekend, Hotel Sara Regency ₹2.5-4k weekend. The much cleaner travel window opens October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-32C, 110-150mm rain. Vinayaka Chathurthi Sep 7. Heat easing.',
  'September is the bridge month. Heat retreating. Temple darshan windows lengthen. Push to October for full season opening.',
  NULL,
  'September in Kumbakonam is the bridge month before the NE monsoon arrives. Daytime 26-32C, humidity 78 percent, sea breeze faint inland but evening thunderstorms more reliable. Vinayaka Chathurthi (variable Bhadrapada Shukla Chathurthi — September 7, 2026) brings Pillayar idol immersion at the Cauvery-Arasalar river junction — the procession through Big Bazaar Street to the river takes 3-4 hours. The four anchor temples (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) hold standard six-puja schedules. Airavatesvara at Darasuram opens 6am-8:30pm at full hours. Hotel rates climb 15-20 percent versus August low: Mantra Veppathur Resort ₹4-5.5k, Hotel Sara Regency ₹2.5-4k. The NE monsoon arrives mid-to-late October — Kumbakonam (inland Cauvery delta location) sees moderate rainfall, mostly 200-280mm in November-December. Mid-October onward is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 10, 4, 'go',
  'Season opens. 24-30C, 200-280mm rain. NE monsoon arrives. Temple walks return mid-month.',
  'October is the season opener. NE monsoon delivers 200-280mm but temperature drops dramatically. Full temple-and-coffee shape resumes mid-month. Cyclone watch begins.',
  NULL,
  'October in Kumbakonam is the proper season opener. The NE monsoon arrives in force from mid-month — Kumbakonam (inland Cauvery delta location) receives 200-280mm of rain across 9-11 wet days. The temperature drop is dramatic: daytime falls from late-September''s 31-32C to 24-30C, humidity 80 percent. The four anchor temples (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) and Airavatesvara at Darasuram (4km west, UNESCO 2004) walk comfortably between showers. Cyclone watch begins along the Coromandel coast — Kumbakonam (inland, 100km from the immediate coast at Nagapattinam) is in the secondary cyclone-impact zone. Cyclone Gaja (November 16, 2018 — Vedaranyam landfall) brought 200mm+ rain to Kumbakonam in 24 hours; Cyclone Thane (December 30, 2011) brushed inland Cauvery delta. Track IMD updates via mausam.imd.gov.in. Navaratri (October 11-20 in 2026) brings full nine-night programming at the city''s Shakti temples — Nageswaran Temple, Mahalakshmi Temple, Sri Bhairava Temple. Hotel rates climb to 50-60 percent of December peak: Mantra Veppathur Resort ₹4-5.5k, Hotel Sara Regency ₹2.5-4k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 11, 5, 'go',
  'High season. 22-29C, 250-330mm rain. Karthigai Deepam Dec 4 build. Cyclone watch holds.',
  'November is full high season. Rain still substantial (250-330mm) but mornings clean, full temple-and-coffee walking. Karthigai Deepam build-up late month.',
  NULL,
  'November in Kumbakonam is full high-season. The NE monsoon remains active (250-330mm across 11-13 wet days) but rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Karthigai Deepam (full moon of Karthigai, Krittika nakshatra, December 4 in 2026) builds late November — the four anchor temples stage oil-lamp displays through the mandapams, the temple-tank stone-stepped edges hold rows of oil lamps at dusk. Cyclone watch holds — Gaja landed at Vedaranyam (90km south) on November 16, 2018 and brought 200mm+ rain to Kumbakonam in 24 hours; Nivar landed at Cuddalore on November 25, 2020. The four anchor temples (Sarangapani, Adi Kumbeswarar, Nageswaran, Ramaswamy) at full daytime schedules. Airavatesvara at Darasuram (4km west, UNESCO) at full hours. Hotel rates climb to 75-85 percent of December peak: Mantra Veppathur Resort ₹5-7k, Hotel Sara Regency ₹3-4.5k, basic lodges ₹800-1500. Brihadeeswara at Thanjavur (40km west) and Gangaikonda Cholapuram (35km north) walk cleanly — the three-Chola-temple UNESCO ensemble is the strongest day-out.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbakonam', 12, 5, 'go',
  'Peak season + Karthigai Deepam Dec 4. 21-28C, 130-200mm rain. Vaikunta Ekadasi Dec 30, 2026.',
  'December is operational peak. Karthigai Deepam (December 4, 2026) brings full temple oil-lamp programming. Vaikunta Ekadasi (December 30, 2026 — Margazhi-Sukla-Ekadasi) brings strong Vaishnavite pilgrim traffic to Sarangapani Temple.',
  NULL,
  'December in Kumbakonam is the operational peak. Two major festivals layer on the clean weather. Karthigai Deepam (December 4, 2026 — full moon of Karthigai, Krittika nakshatra) is the year''s major Shiva-light festival; the four anchor temples glow with thousands of oil lamps across the mandapams. Vaikunta Ekadasi (December 30, 2026 — Margazhi-Sukla-Ekadasi) is the major annual Vaishnavite festival — Sarangapani Temple (108 Divya Desams, second-largest Vishnu temple in Tamil Nadu after Srirangam) opens its Paramapada Vasal (Gate to Vaikuntha) for the 21-day Pagal Pathu + Ra Pathu festival. The Sarangapani Paramapada Vasal opens at 4am on Vaikunta Ekadasi day — 50,000-80,000 devotees queue through over 24 hours. Srirangam (90km southwest) holds the headline but Sarangapani draws strong regional traffic. Daytime 22-28C, nights 20C, rain 130-200mm across 7-9 wet days, humidity 70 percent. Cyclone watch holds through December 20 — Thane hit Cuddalore on December 30, 2011 and brushed Kumbakonam. The Christmas-NYE corridor sees rates run 1.5-2x: Mantra Veppathur Resort ₹6-9k, Hotel Sara Regency ₹3.5-5.5k. Lock 6-8 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
