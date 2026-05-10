-- Alleppey (Alappuzha) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: alleppey

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 1, 5, 'go',
  'Peak backwater season. 23-31C, dry. Houseboat rates ease post-NYE. Punnamada Lake calm.',
  'January is when Alleppey runs at its strongest. Houseboat cruises Alleppey-Kumarakom (12-hour overnight or 22-hour two-night) operate at full capacity — non-AC ₹8-15k/night, AC ₹15-25k, luxury ₹25-50k. Marari Beach 12km north for beach-and-backwater combos. KTDC-licensed boats only, max 3 nights per boat.',
  NULL,
  'Alleppey in January is the version Kerala backwater veterans book first. Daytime sits at 24-31C, nights drop to 22C, the Vembanad Lake-Punnamada Lake system is calm with humidity below 70 percent. Houseboat rates ease from the Christmas-NYE peak after January 5: non-AC boats run ₹8-15k/night, AC ₹15-25k, luxury ₹25-50k (a Premium Star Cruise from Lakes & Lagoons or Spice Coast Cruises holds 4-6 cabins). Standard route is Alleppey jetty (Finishing Point or Punnamada Jetty) to Kumarakom via Vembanad Lake — 12-hour overnight cruise. Two-night cruises shift from Champakulam to Kumarakom via Pamba River and back. KTDC licensing is enforced — solar-only after sunset (2024 rule), max 3 nights per boat. Marari Beach (12km north, 25 minutes by car) is the standard beach-stay add-on; Marari Beach Resort (CGH Earth, 1999) is the anchor. Alleppey jetty traffic peaks 9-11am for boat boarding. Cafe Catamaran on Punnamada and Harbour Restaurant near the jetty handle pre-boarding meals.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 2, 5, 'go',
  'Driest month. 24-32C. Houseboat availability tightens late month for shoulder operators.',
  'February is Alleppey''s driest stretch. Rainfall under 5mm, Punnamada Lake at year-best clarity, houseboat cruises run full schedule. Long-stay (3-night) bookings need 2-3 week lead. Kumarakom-end of Vembanad Lake at year-best for bird sanctuary day-trips.',
  NULL,
  'February in Alleppey is the technical peak. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent — the lowest of the year. Houseboat cruises run at full capacity across 1,000+ KTDC-licensed boats: non-AC ₹9-16k/night, AC ₹16-26k, luxury ₹25-50k. Lakes & Lagoons, Spice Coast Cruises, Soma Houseboats, and KTDC-Alleppey are the 4 anchor operators. Standard 12-hour overnight cruise: board 12-1pm at Punnamada Jetty, dinner-on-board, anchor in Vembanad Lake village (Champakulam or Pulinkunnu), wake at sunrise, breakfast cruise, disembark 9am the next day. Three-night cruises (the kettuvalam-traditional shape) need 3-week booking lead in February. Marari Beach Resort (CGH Earth, 12km north) at ₹18-28k/night, Coir Village Lake Resort at ₹6-12k. Alleppey town''s Mullakkal Street market and Punnamada Lake walking promenade (1.2km) hold afternoon strollers. The Kumarakom Bird Sanctuary 25km east is at year-peak — Siberian cranes and herons in full plumage.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 3, 4, 'go',
  'Last cool month. 25-33C. Houseboat rates slide 20 percent. Lake water temperature climbing.',
  'March extends February''s weather minus the peak crunch. Houseboat cruises hold full schedule. Rates drop 20-25 percent. AC houseboats become the recommended call from mid-month as overnight cabin temperatures hit 28C without aircon.',
  NULL,
  'March in Alleppey is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week, lake water at 28C. Non-AC houseboats become uncomfortable from mid-month — overnight cabin temperatures hit 28-29C without airflow, even on Vembanad Lake. AC houseboats (₹14-22k/night) are the recommended call from March 15 onward. Operator schedules hold full capacity: Lakes & Lagoons, Spice Coast Cruises, KTDC-Alleppey all run twice-daily boarding. Cabin sleep on AC boats works fine; on non-AC, mosquito nets become non-optional. Alleppey jetty traffic still 70-80 percent of February peak. Marari Beach Resort at ₹15-22k, Coir Village Lake Resort at ₹5-9k, Akkarakalam Memoirs Heritage Homestay at ₹3-4k. The Kumarakom Bird Sanctuary still strong through March 20; Siberian cranes begin their northbound migration end of month. Last comfortable window before April pushes the trip into AC-houseboat-only mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. AC houseboat-only. Vishu Apr 14.',
  'April pushes Alleppey into AC-houseboat-only mode. Non-AC boats deeply uncomfortable. Vishu (April 14) brings sadhya on luxury boats. Cruise schedules hold but rates 30 percent below February peak.',
  'April pushes Alleppey into pre-monsoon stress. Non-AC houseboats unworkable, day-cruises uncomfortable past 11am, the Punnamada walk and town circuit collapse mid-day. Wait for late October.',
  'April in Alleppey is when the houseboat trip narrows to AC boats only. Daytime 28-34C, humidity 80 percent, lake water at 30C. Non-AC boats deeply uncomfortable through the night — cabin temperatures hit 31-32C. AC boats (₹13-20k) and luxury cruisers (₹22-35k) are the only viable choice. Vishu (April 14, Malayalam new year) lands across the major operators with elaborate sadhya lunches on luxury boats — Lakes & Lagoons and Spice Coast Cruises run special Vishu cruises with kanikkonna decor and 28-dish meals. Standard 12-hour cruises hold but day portions compress: dinner-on-board, sleep, sunrise breakfast. Marari Beach Resort at ₹13-18k, Coir Village Lake Resort at ₹4-8k. Alleppey town''s Mullakkal Street and the lakefront walk work 6-9am and 6-8pm only. The trip works for travelers willing to spend AC-boat money and accept compressed daytime touring.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 5, 2, 'wait',
  'Peak heat plus pre-monsoon. 28-34C, humidity 85 percent. Cruise schedules thin late month.',
  NULL,
  'May runs hot and sticky on the Kerala backwaters. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the third and fourth week. Houseboat AC strained on hottest days. Wait for October when comfort returns.',
  'May in Alleppey is the closing month before the southwest monsoon. Daytime 29-34C, humidity 85 percent, lake water 30-31C. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls that drop temperatures briefly but knock grid power 1-2 hours and raise humidity to 90 percent. Houseboat AC units strain on hottest days, especially mid-tier boats running on inverter-plus-grid combinations. Major operators (Lakes & Lagoons, Spice Coast Cruises, Soma Houseboats) hold full schedules but cabin-class downgrades become common as grid pressure increases. Hotel rates at year-low: AC houseboats ₹11-17k versus February peak ₹16-26k, luxury cruisers ₹18-30k versus ₹35-50k. Marari Beach Resort at ₹11-15k. Mid-tier non-AC houseboats (₹6-10k) operate but only short-stay (single-night) bookings. Friday-Sunday occupancy holds at 50-55 percent for Mumbai-Bangalore monsoon-weekend traffic. Push to mid-October if comfort matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 6, 2, 'wait',
  'SW monsoon arrives. 25-30C, 600-700mm rain. Champakulam Boat Race in June Moolam.',
  'June is when the southwest monsoon hits Kerala. Backwaters take heavy rain but houseboats keep running. Champakulam Moolam Boat Race (oldest in Kerala, since 1545) lands on Moolam day in June — backwater outlier worth visiting in monsoon. Karkidakam Ayurveda starts mid-July.',
  'June pushes Alleppey into monsoon. Cruising during heavy rain is uncomfortable; lake views collapse to grey. Champakulam Boat Race is a real cultural draw but the broader trip narrows. Push to October if comfort matters.',
  'June in Alleppey is when the Kerala monsoon takes the backwaters. Rainfall 600-700mm across 22-25 wet days, daytime 25-30C, lake water 28C. Houseboats keep running — cruising in monsoon is technically fine, just uncomfortable in 6-8 hour deluges. The cultural anchor is Champakulam Moolam Boat Race (oldest in Kerala, since 1545) on Moolam day in the Malayalam Mithunam month — typically late June (verify exact 2026 date via Kerala Tourism keralatourism.org). 9 snake boats, religious origin (commemorating the bringing of the Krishna idol from Kurichi to Ambalappuzha), draws 10,000-15,000 spectators to the Pampa River banks at Champakulam village (15km from Alleppey). Houseboat rates at year-low: AC boats ₹8-13k, luxury ₹15-22k. Marari Beach Resort at ₹9-13k. Karkidakam Ayurveda month opens mid-July at backwater resorts (Coconut Lagoon CGH Kumarakom is the standard Ayurveda destination). The trip works for monsoon-Ayurveda or Champakulam-specific travelers; push to October for the broader cruise.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 7, 2, 'wait',
  'Peak monsoon. 25-29C, 700-800mm rain. Karkidakam Ayurveda mid-month. Houseboat for therapy only.',
  'July is the wettest month at Alleppey. Houseboats still run but cruising in 8-12 hour rain is grim. Karkidakam Ayurveda month opens mid-July — standard 14-21 day stays at Coconut Lagoon CGH Kumarakom, Marari Beach Resort, Vasundhara Sarovar Premiere. For Ayurveda yes, for cruising no.',
  'July is monsoon-deep at Alleppey. Cruising in 8-12 hour deluges is uncomfortable; lake views collapse to grey; backwater banks flood. Karkidakam Ayurveda is the only real reason to be here in July.',
  'July in Alleppey is monsoon at its most stubborn. Rainfall 700-800mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 25-29C, humidity 90 percent. Houseboats technically run — cruising is mechanically fine — but the experience is gloomy: grey lake, banks flooded, cabin condensation, AC running near-constant. The real Kerala draw of the season is Karkidakam (Ayurveda month) — mid-July to mid-August in the Malayalam calendar — where monsoon humidity is held by traditional Ayurveda to enable maximum oil-medicine absorption. Standard 14-21 day Karkidaka Chikitsa packages: Coconut Lagoon CGH Kumarakom (across Vembanad Lake) ₹2-4 lakh per couple for 14 nights, Marari Beach Resort CGH ₹1.5-3 lakh, Vasundhara Sarovar Premiere ₹1.5-2.5 lakh, Punnamada Resort ₹80k-1.5 lakh. Houseboat rates at year-low: AC ₹7-12k, luxury ₹13-20k, Marari Beach Resort ₹8-12k. The trip works specifically for Karkidakam Ayurveda; the standard cruise trip waits for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 8, 3, 'wait',
  'Monsoon plus Onam plus Nehru Trophy. 25-29C, 500-600mm rain. Nehru Trophy 2nd Saturday August.',
  'August is rain-heavy but culturally peak. Nehru Trophy Boat Race lands 2nd Saturday in August (officially since 1952) at Punnamada Lake — 100-foot snake boats, 100 rowers, India''s premier vallam kali. Alleppey jetty closed ~10 days for Nehru Trophy preparations. Onam Aug 25 (verify 2026).',
  'August pushes Alleppey deep into monsoon. Houseboats run but cruising remains rain-locked. Nehru Trophy is the cultural draw, but lock dates 6 months ahead — accommodation triple-priced for the week.',
  'August in Alleppey is rain-heavy but culturally the year''s peak. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. The Nehru Trophy Boat Race (officially since 1952) lands on the 2nd Saturday of August at Punnamada Lake — 100-foot chundan vallam (snake boats) with 100-110 rowers, 4 helmsmen, 25 singers chanting vanchipattu, racing 1.4km. India''s premier vallam kali. Tickets ₹500-3,000 (Kerala Tourism KTDC sells via online portal); spectator galleries at Punnamada Beach. Alleppey jetty closes for ~10 days during Nehru Trophy preparations and event week. Houseboat shuffling tightens cruise rates by 50-80 percent for the week. Onam''s Thiruvonam falls August 25, 2026 (verify) — luxury cruisers run special Onam sadhya cruises (₹35-50k all-inclusive). Aranmula Boat Race on the Pampa (early September) is the religious vallam kali. Karkidakam Ayurveda continues. The trip works for Nehru Trophy or Onam specifically; lock 6+ months ahead. Otherwise wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Onam tail. Aranmula Boat Race early month.',
  'September is the recovery month. SW monsoon retreats through the second half. Onam celebrations linger first week, Aranmula Boat Race on Pampa (Onam-linked, oldest religious snake-boat race) is the early-month draw. Cruising still wet but improving.',
  'September is rebuild-not-yet-clean at Alleppey. Cruising still rain-interrupted through the first three weeks. Push to mid-October for the proper backwater shape.',
  'September in Alleppey is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Onam celebrations linger through the first week with snake-boat traditions; Aranmula Boat Race on the Pampa (a religious vallam kali, part of the Aranmula Parthasarathy Temple festival) lands on Uthrattadi day during Onam — typically early September (verify exact date via Kerala Tourism keralatourism.org). Houseboat operators (Lakes & Lagoons, Spice Coast Cruises, Soma Houseboats, KTDC) rebuild full schedules from mid-month. Cruise rates climb 20-25 percent versus August lows: AC houseboats ₹10-15k, luxury ₹18-28k, Marari Beach Resort ₹11-16k. Coconut Lagoon CGH Kumarakom holds full Karkidakam-tail Ayurveda packages through the second week. The full clean cruising window opens from October 10-15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 10, 4, 'go',
  'Season opens. 24-31C, 200-250mm late-monsoon spillover. Houseboat schedules return.',
  'October is the season-opener at Alleppey. Late-monsoon residue still 200-250mm but the back half delivers full cruise weather. Houseboat rates 30-35 percent below December peak. Strong value window.',
  NULL,
  'October in Alleppey is the proper return to coherent. Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean cruise mode. Daytime 25-31C, humidity falling from 85 to 75 percent, lake water 27C. Houseboat operators (Lakes & Lagoons, Spice Coast Cruises, Soma Houseboats, KTDC-Alleppey) all return to full twice-daily boarding schedules. Cruise rates run 30-35 percent below December peak: non-AC ₹6-11k, AC ₹11-17k, luxury ₹18-30k. Marari Beach Resort CGH at ₹13-18k versus December''s ₹25-35k. Coir Village Lake Resort at ₹4-8k. Punnamada Lake walking promenade returns to full afternoon use; Mullakkal Street market open. The Kumarakom Bird Sanctuary opens its peak season from mid-October as Siberian crane and heron arrivals begin. Pack a poncho rather than an umbrella for the first half — Konkan-style coastal winds make umbrellas useless. Strong value window for first-time backwater visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Houseboat schedules at full capacity. Bird sanctuary peak.',
  'November is the proper pivot to peak season. Rainfall under 50mm, full cruise weather, Kumarakom Bird Sanctuary at peak (Siberian cranes, herons, kingfishers). Hotel rates 20-25 percent below December peak.',
  NULL,
  'November in Alleppey is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent, lake water 26C. Houseboat schedules at full capacity across all operators. Cruise rates climb to 75-80 percent of December peak: non-AC ₹8-13k, AC ₹14-20k, luxury ₹22-35k. Marari Beach Resort CGH at ₹17-23k, Coir Village Lake Resort at ₹5-10k. The Kumarakom Bird Sanctuary (across Vembanad Lake, 25km east) hits peak season — Siberian cranes, herons, white-bellied sea eagle, kingfisher all in full plumage; ₹50 entry fee, 6am-6pm. Bird-spotting boats from Kumarakom jetty ₹500-1000/2 hours. Friday-Sunday traffic from Bangalore-Chennai pushes occupancy to 80 percent. Punnamada Lake water-clarity at year-best. Mullakkal Street and the Punnamada walking promenade hold full afternoon strollers. Strong call for first-time backwater visitors who want full cruise minus the Christmas-NYE rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('alleppey', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 2.5-3x. Houseboat lead time 4-6 weeks.',
  'December is when Alleppey runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2.5-3x normal — luxury houseboats hit ₹50-80k/night, AC boats ₹35-50k. Lock cruise dates 4-6 weeks ahead; Christmas week needs 6-8 weeks.',
  NULL,
  'December in Alleppey is the operational peak — the year''s most expensive backwater stretch. Daytime 23-30C, nights 21-22C, rainfall under 30mm, lake water 25C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2.5-3x the November baseline: non-AC houseboats hit ₹20-30k/night, AC boats ₹30-50k, luxury cruisers ₹50-80k. Marari Beach Resort CGH at ₹25-35k versus November''s ₹17-23k. The Kumarakom Bird Sanctuary at peak (Siberian cranes, herons, kingfishers visible from boats). Operators (Lakes & Lagoons, Spice Coast Cruises, Soma Houseboats, KTDC-Alleppey) require 4-6 week booking lead through the month, 6-8 weeks for Christmas week. Punnamada Lake walking promenade gridlocks mornings. Mullakkal Street market and the Alleppey jetty area run on heavy domestic traffic. Cochin International Airport (75km north, 90 minutes by NH-66) at peak capacity. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak rates and gridlock.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
