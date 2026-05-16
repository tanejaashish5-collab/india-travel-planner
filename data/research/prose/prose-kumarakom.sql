-- Kumarakom destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: kumarakom

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 1, 5, 'go',
  'Peak window. 22-30C, dry. Vembanad Lake calm. Bird sanctuary at peak — Siberian cranes, herons.',
  'January is when Kumarakom runs at its strongest. Vembanad Lake (India''s longest at 96km, Ramsar site) calm and clear. Kumarakom Bird Sanctuary at peak — Siberian cranes, herons, kingfishers, white-bellied sea eagle. Quieter alternative to Alleppey. Premium resorts (Kumarakom Lake Resort CGH, Coconut Lagoon CGH, Taj Kumarakom) at full schedule.',
  NULL,
  'Kumarakom in January is the version of Kerala backwaters that buyers picking quiet over volume should book first. Daytime sits at 24-30C, nights drop to 22C, Vembanad Lake at 25C, humidity below 70 percent. Vembanad — India''s longest lake at 96km, Ramsar wetland site — sits at year-best clarity. The Kumarakom Bird Sanctuary (14 hectares on Vembanad''s eastern shore) runs full hours 6am-6pm, ₹50 entry; January-February is peak migration window for Siberian cranes (the headline draw), herons, egrets, kingfishers, white-bellied sea eagle. Bird-spotting boats from Kumarakom jetty ₹500-1000/2 hours. Premium resorts run at peak: Kumarakom Lake Resort CGH (the heritage anchor — original Kerala-design pitched-roof villas, ₹25-50k/night), Coconut Lagoon CGH (heritage tharavadu houses on Vembanad islets, ₹22-40k), Taj Kumarakom (₹20-35k). 16km west of Kottayam — KSRTC bus ₹40, auto ₹400. Quieter than Alleppey: 5-6 anchor resorts vs 1,000-houseboat operator scale. Houseboat day-cruises from Kumarakom jetty ₹3-5k for 6 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 2, 5, 'go',
  'Driest month. 23-31C. Bird sanctuary at peak. Coracle and kayak through mangroves.',
  'February delivers Kumarakom''s cleanest weather. Rainfall under 5mm, Vembanad Lake at year-best, bird sanctuary peak. Coracle and kayak trips through Kumarakom mangroves run full schedule. Premium resort lead-time tightens.',
  NULL,
  'February in Kumarakom is the year''s cleanest weather window. Rainfall under 5mm, daytime 24-31C, humidity at 60 percent — the lowest of the year. Vembanad Lake (96km, Ramsar) at year-best clarity. The Kumarakom Bird Sanctuary at full migration peak: Siberian cranes (the headline migrant) join herons, egrets, kingfishers, white-bellied sea eagle in 200+ daily species count. ₹50 entry, 6am-6pm. Best birding window 6-8am. Mangrove kayak and coracle trips from Kumarakom jetty ₹500-800/2 hours through 4-5 licensed operators. Premium resort schedules at peak: Kumarakom Lake Resort CGH at ₹30-55k/night (book 6-8 weeks ahead), Coconut Lagoon CGH at ₹25-45k, Taj Kumarakom at ₹22-38k. Mid-tier: Vivanta Kumarakom ₹18-28k, Eastend Lakesong Resort ₹12-20k, Backwater Ripples ₹8-14k. 16km from Kottayam railway station (Kottayam KCVL, 2.5 hours from Kochi by car via NH-66 or 3 hours by train). Houseboat day-cruises ₹3-5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 3, 4, 'go',
  'Last cool month. 24-32C. Bird-watching tail. Resort rates slide 20 percent.',
  'March extends February''s weather minus the peak crunch. Bird-watching season tails through the third week — Siberian cranes start northbound migration end-month. Resort rates drop 20-25 percent.',
  NULL,
  'March in Kumarakom is the soft-landing month. Daytime 25-32C, humidity climbing toward 75 percent in the last week, lake water 28C. Bird-watching season starts winding down — Siberian cranes begin northbound migration around March 20-25; herons, egrets, kingfishers continue. Bird sanctuary entry ₹50, full hours. Mangrove kayak and coracle trips run morning-only schedules from mid-month. Premium resort rates drop 20-25 percent versus February peak: Kumarakom Lake Resort CGH at ₹24-40k, Coconut Lagoon CGH at ₹20-35k, Taj Kumarakom at ₹18-28k. Mid-tier: Vivanta Kumarakom ₹15-22k, Eastend Lakesong Resort ₹10-16k, Backwater Ripples ₹7-12k. Houseboat day-cruises from Kumarakom jetty hold ₹3-5k pricing. Tea-and-spice plantation day-trips to Vagamon (75km, 2 hours by car) become a popular shoulder add-on. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 4, 3, 'wait',
  'Pre-monsoon heat. 26-33C, humidity 80 percent. Bird season over. Vishu Apr 14.',
  'April pushes Kumarakom into pre-monsoon. Bird sanctuary off-peak (most migrants gone). Vishu (Apr 14) brings sadhya at all major resorts. AC-room comfort but outdoor activities compress to dawn-only.',
  'April pushes Kumarakom into pre-monsoon stress. Bird sanctuary off-peak (most migrants left), mangrove kayaks dawn-only, the village walks unbearable mid-day. Wait for late October.',
  'April in Kumarakom is when the sanctuary season ends and the heat sets in. Daytime 27-33C, humidity 80 percent, Vembanad Lake at 30C. Bird sanctuary off-peak — Siberian cranes have left, only resident species remain (herons, egrets, kingfishers). Mangrove kayak and coracle trips workable 6-9am only. Vishu (April 14, Malayalam new year) lands across all major resorts with full Vishukani arrangements (gold, rice, kanikkonna flowers in front of mirrors at dawn) and 26-28 dish sadhya lunches — Kumarakom Lake Resort CGH and Coconut Lagoon CGH run special Vishu packages, ₹4-6k per person beyond room rates. Rates run 30-35 percent below February peak: Kumarakom Lake Resort CGH ₹20-32k, Coconut Lagoon CGH ₹16-28k, Taj Kumarakom ₹15-22k, Vivanta Kumarakom ₹12-18k, Eastend Lakesong ₹8-13k. AC-room comfort holds but outdoor activities compress. Friday-Sunday traffic from Bangalore continues; weekday occupancy under 50 percent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 5, 2, 'wait',
  'Peak heat plus pre-monsoon. 27-33C, humidity 85 percent. Bird sanctuary closed Apr-May.',
  NULL,
  'May runs hot and sticky on Vembanad. Bird sanctuary effectively closed (no migrants, only residents in low numbers). Pre-monsoon thunderstorms knock grid 1-2 hours daily through the third and fourth week. Wait for October.',
  'May in Kumarakom is the closing month before the southwest monsoon. Daytime 28-33C, humidity 85 percent, Vembanad Lake at 30-31C. Bird sanctuary effectively closed for serious birding — the migrants left in April, only resident species remain at low density. Pre-monsoon thunderstorms hit weeks three and four — short violent squalls that drop temperatures briefly but knock grid power 1-2 hours and raise humidity to 90 percent. Resort AC units strain on hottest days. Premium rates at year-low: Kumarakom Lake Resort CGH ₹17-28k, Coconut Lagoon CGH ₹14-25k, Taj Kumarakom ₹13-20k, Vivanta Kumarakom ₹10-16k, Backwater Ripples ₹5-10k. Karkidakam Ayurveda month opens mid-July at Coconut Lagoon CGH (₹2-4 lakh per couple for 14-21 nights). Friday-Sunday occupancy holds at 50-55 percent for monsoon-weekend traffic. Push to mid-October if comfort and birding matter.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 6, 2, 'wait',
  'SW monsoon arrives. 24-29C, 600-700mm rain. Lake views collapse to grey. Karkidakam not yet.',
  'June is when the southwest monsoon arrives. Bird sanctuary in low season, lake views collapse to grey, mangrove kayaks suspended due to current. Karkidakam Ayurveda opens mid-July (next month). Wait for October if bird-and-cruise.',
  'June pushes Kumarakom into monsoon. Cruising in 6-8 hour deluges is uncomfortable, lake views collapse to grey, bird sanctuary at low. Push to October if cruise-and-birding is the goal.',
  'June in Kumarakom is when the southwest monsoon takes Vembanad. The current arrives around June 1 — IMD announces formal Kerala monsoon onset annually from Thiruvananthapuram. Rainfall jumps to 600-700mm across 22-25 wet days, daytime 24-29C, humidity 90 percent. Sustained 6-8 hour deluges with cyclonic-cell wind close down outdoor activities. Bird sanctuary at low (no migrants, residents reduced); mangrove kayak and coracle trips suspend due to channel-current speed. Houseboat cruises run but Vembanad Lake views collapse to grey. Premium resort rates at year-low: Kumarakom Lake Resort CGH at ₹15-25k, Coconut Lagoon CGH at ₹12-22k, Taj Kumarakom at ₹11-17k, Vivanta Kumarakom at ₹9-14k, Backwater Ripples at ₹4-8k. Karkidakam Ayurveda month opens mid-July (next month) — Coconut Lagoon CGH is the standard Karkidakam destination. The trip works for travelers chasing quiet rainy retreats; push to October for the standard Kumarakom shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 7, 2, 'wait',
  'Peak monsoon. 24-29C, 700-800mm rain. Karkidakam Ayurveda opens mid-month at Coconut Lagoon.',
  'July is the wettest month at Kumarakom. Karkidakam (Ayurveda month) opens mid-July — Coconut Lagoon CGH is the headline destination, ₹2-4 lakh for 14-21 night Chikitsa packages. For Ayurveda yes, for cruising or birding no.',
  'July is monsoon-deep at Kumarakom. Cruising in 8-12 hour deluges grim. Bird sanctuary at low. Karkidakam Ayurveda is the only real reason to be at Kumarakom in July.',
  'July in Kumarakom is monsoon at its most stubborn. Rainfall 700-800mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 24-29C, humidity 92 percent. Bird sanctuary at low. Mangrove kayaks and coracle trips suspended through the monsoon (channel-current and lightning-risk). The real Kerala draw of the season is Karkidakam (Ayurveda month — mid-July to mid-August in the Malayalam calendar) where monsoon humidity is held by traditional Ayurveda to enable maximum oil-medicine absorption. Coconut Lagoon CGH (the heritage backwater anchor) is the standard Karkidakam destination — 14-21 night Karkidaka Chikitsa packages, ₹2-4 lakh per couple, with daily synchronized abhyangam massage, kashayam dharas, internal medication, and traditional Karkidaka kanji breakfast. Kumarakom Lake Resort CGH and Vasundhara Sarovar Premiere also run packages. Standard resort rates at year-low: Kumarakom Lake Resort CGH ₹14-22k, Taj Kumarakom ₹10-15k, Vivanta Kumarakom ₹8-12k. The Karkidakam-specific trip works; the standard cruise-and-birding trip waits for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 8, 3, 'wait',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026). Karkidakam tail.',
  'August is rain-heavy with Onam celebrations. All major resorts run sadhya cruises and Vallamkali viewing packages. Karkidakam Ayurveda continues. Bird sanctuary still low but improving. Worth a 2-3 day visit for Onam.',
  'August holds monsoon at Kumarakom. Bird sanctuary still low. Cruise weather grim. Worth visiting only for Onam sadhya or Karkidakam Ayurveda.',
  'August in Kumarakom pairs the southwest monsoon tail with Onam. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org). All major resorts run elaborate Onam sadhya lunches: 26-28 dishes on banana leaf, ₹2-4k per person. Kumarakom Lake Resort CGH and Coconut Lagoon CGH run special Vallamkali (snake-boat) viewing packages — boats from resort jetties to nearby Aranmula or Champakulam venues, all-inclusive ₹40-60k per couple for 3 nights. Karkidakam Ayurveda continues through mid-month. Resort rates climb 20-30 percent through Onam week (lock 6-8 weeks ahead): Kumarakom Lake Resort CGH ₹18-30k versus August baseline ₹14-22k. Bird sanctuary still low but residents start picking up late month. Worth a 2-3 day visit for Onam sadhya or Karkidakam; otherwise wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Onam tail. Bird sanctuary rebuilding.',
  'September is the recovery. SW monsoon retreats through the second half. Onam celebrations linger first week, Aranmula Boat Race on Pampa is the early-month draw. Bird sanctuary residents picking up. Cruise weather still wet but improving.',
  'September is rebuild-not-yet-clean at Kumarakom. Bird sanctuary still low through first three weeks. Push to mid-October for the proper sanctuary-and-cruise shape.',
  'September in Kumarakom is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Onam celebrations linger through the first week with snake-boat traditions; Aranmula Boat Race on the Pampa (a religious vallam kali, part of the Aranmula Parthasarathy Temple festival) lands on Uthrattadi day during Onam — typically early September (verify exact date via Kerala Tourism). Bird sanctuary residents (herons, egrets, kingfishers) pick up through the second half; migrant arrivals not until October-November. Premium rates climb 15-20 percent versus August lows: Kumarakom Lake Resort CGH ₹18-28k, Coconut Lagoon CGH ₹15-25k, Taj Kumarakom ₹13-18k, Vivanta Kumarakom ₹10-15k. Mangrove kayak and coracle trips return last week. The full clean window opens from October 10-15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 10, 4, 'go',
  'Season opens. 24-30C, 200-250mm late-monsoon spillover. Bird sanctuary migrants arriving.',
  'October is the season-opener at Kumarakom. Bird sanctuary migrant arrivals begin (Siberian cranes from late October), full cruise weather second half. Resort rates 30 percent below December peak.',
  NULL,
  'October in Kumarakom is the proper return to coherent. Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean cruise mode. Daytime 25-30C, humidity falling from 85 to 75 percent, Vembanad Lake at 27C. Bird sanctuary opens its peak season from mid-October as migrant arrivals begin — Siberian cranes from late October, herons and kingfishers building. ₹50 entry, 6am-6pm. Mangrove kayak and coracle trips return to full schedule from October 5. Premium resort rates 30-35 percent below December peak: Kumarakom Lake Resort CGH at ₹22-35k versus December''s ₹35-55k, Coconut Lagoon CGH at ₹18-30k, Taj Kumarakom at ₹16-24k, Vivanta Kumarakom at ₹13-20k, Backwater Ripples at ₹5-10k. Houseboat day-cruises from Kumarakom jetty resume ₹3-5k pricing. Pack a poncho rather than an umbrella for the first half — the last monsoon squalls hit on cyclonic-cell winds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Migrant arrivals near complete. Resort rates 20 percent below Dec.',
  'November is the proper pivot to peak. Rainfall under 50mm, full cruise weather, bird sanctuary near peak with most migrants arrived. Resort rates 20-25 percent below December peak.',
  NULL,
  'November in Kumarakom is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent. Bird sanctuary near peak — Siberian cranes mostly arrived by mid-November, herons, egrets, kingfishers, white-bellied sea eagle all in full plumage. Bird sanctuary entry ₹50, peak hours 6-9am. Mangrove kayak and coracle trips full schedule. Premium resort rates climb to 75-80 percent of December peak: Kumarakom Lake Resort CGH ₹26-42k, Coconut Lagoon CGH ₹22-36k, Taj Kumarakom ₹18-28k, Vivanta Kumarakom ₹15-22k, Eastend Lakesong ₹11-17k, Backwater Ripples ₹6-12k. Friday-Sunday traffic from Bangalore-Chennai pushes occupancy to 80 percent. Vembanad Lake water-clarity at year-best. Strong call for first-time visitors who want full sanctuary access minus the Christmas-NYE rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumarakom', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 2-2.5x. Bird sanctuary at peak.',
  'December is when Kumarakom runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2-2.5x normal — Kumarakom Lake Resort CGH hits ₹50-70k. Bird sanctuary at peak. Lock premium resort rooms 5-7 weeks ahead.',
  NULL,
  'December in Kumarakom is the operational peak — premium Kerala backwater at its most expensive. Daytime 23-30C, nights 21-22C, rainfall under 30mm, Vembanad Lake at 25C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-2.5x the November baseline: Kumarakom Lake Resort CGH hits ₹50-70k, Coconut Lagoon CGH ₹40-55k, Taj Kumarakom ₹30-45k, Vivanta Kumarakom ₹22-32k. Bird sanctuary at peak — Siberian cranes, herons, kingfishers, white-bellied sea eagle. ₹50 entry; peak hours 6-9am. Mangrove kayak and coracle trips at peak — book through resort concierge 3-5 days ahead. Houseboat day-cruises from Kumarakom jetty ₹4-6k. The 16km Kumarakom-to-Kottayam route via NH-66 takes 30 minutes; Kottayam railway 30 minutes. Cochin International Airport 90km north (2.5 hours by NH-66). Lock premium resort rooms 5-7 weeks ahead from October. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
