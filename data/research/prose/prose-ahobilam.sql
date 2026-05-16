-- Ahobilam destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: ahobilam | best_months [10,11,12,1,2,3] | avoid [5,6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 1, 5, 'go',
  'Peak window. 17-29C. Nava Narasimha 9-temple circuit at year-cleanest. Upper trek workable.',
  'January at Ahobilam is the year-best window. Daytime 27-29C, rainfall sub-20mm. Nava Narasimha 9-temple gorge circuit at year-cleanest comfort. Upper Ahobilam 7km uphill trek to Lakshmi Narasimha viable.',
  NULL,
  'Ahobilam in January is the version every Narasimha-pilgrim and forest-trekker books first. Daytime 27-29C, nights 17-18C, humidity 55 percent, rainfall under 20mm. The Nava Narasimha cluster — nine Narasimha temples scattered through a single Eastern Ghats forest gorge, a configuration that exists nowhere else in India — runs at full ritual tempo. The nine forms (Bhargava, Yogananda, Chatravata, Karanja, Ahobila, Varaha, Malola, Jwala, Pavana) span a 14km gorge from Diguva Ahobilam (Lower Ahobilam) at the base to Eguva Ahobilam (Upper Ahobilam) 7km uphill. Lower Ahobilam (the Prahlada Varada temple, the most accessible of the nine) at full schedule 6am-1pm and 4pm-8pm. The Upper Ahobilam Lakshmi Narasimha temple — at the trail-top reached via a 7km forest path through the gorge from Lower Ahobilam, roughly 3 hours uphill — at year-best trekking weather. The Ugra Stambham (the giant pillar formation from which Narasimha is believed to have emerged) on the gorge approach. Adi Krithikai pilgrim density continues from late December into January at the Sri Ahobila Mutt jeeyar-sanyasi guesthouse complex. Nandyal (75km gateway, the nearest railhead) homestays ₹1,200-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 2, 5, 'go',
  'Driest stretch. 19-31C. Nava Narasimha circuit + Upper trek at year-best.',
  'February is the technical peak. Rainfall under 15mm, daytime 29-31C. Nava Narasimha 9-temple circuit at full output. Upper Ahobilam 7km trek workable. Adi Krithikai International Telugu pilgrim arrivals.',
  NULL,
  'February in Ahobilam is the technical peak month. Rainfall under 15mm, daytime 29-31C, nights 19-20C, humidity 50 percent — the Eastern Ghats Nallamala range rain-shadow at its driest. The Nava Narasimha 9-temple gorge circuit at full ritual tempo. Lower Ahobilam (Diguva Ahobilam, the Prahlada Varada main temple) at 6am-1pm and 4pm-8pm schedule. Upper Ahobilam (Eguva Ahobilam, the Lakshmi Narasimha temple at the trail-top) reached via the 7km forest trek through the gorge — at year-best trekking weather; start the climb 6am, reach summit by 9-10am, return by 1pm. The Ugra Stambham gorge-rock formation visible at full clarity. The intermediate cluster (Bhargava, Yogananda, Chatravata, Karanja, Ahobila, Varaha, Malola, Jwala, Pavana) accessible across full-day jeep-and-walk circuits — local Sri Ahobila Mutt guides run the nine-temple darshan in two days. Sri Ahobila Mutt (the Vaishnavite jeeyar-sanyasi institution, the spiritual head of the Ahobilam tradition) at full pilgrim accommodation occupancy. Nandyal homestays ₹1,300-2,800. Bookings sparse from outside Andhra — Ahobilam runs primarily as a Telugu Vaishnavite circuit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 3, 4, 'go',
  'Last cool month. 21-34C. Upper trek compresses to pre-9am. Hotel rates ease 20 percent.',
  'March is the soft-landing month. Daytime climbs 32-34C through month. Upper Ahobilam 7km trek workable pre-9am only. Lower Ahobilam darshan at full schedule. Hotel rates ease 20 percent.',
  NULL,
  'March in Ahobilam is the transition month. Daytime 32-34C, nights 21-22C, humidity 55 percent, rainfall under 30mm. The Nava Narasimha 9-temple gorge circuit at full ritual tempo. Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at standard 6am-1pm and 4pm-8pm schedule. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha at trail-top) 7km forest trek workable pre-9am only — the rocky gorge trail surface heats quickly after 10am and the partial-canopy forest cover does not provide consistent shade through the climb. Start the trek 5:30am, reach summit by 8:30-9am, descend before the heat peaks. Local Sri Ahobila Mutt guides run an alternative single-day half-circuit (Lower Ahobilam + Ugra Stambham + Bhargava + Yogananda — four-temple morning loop) for travelers who skip the Upper trek. Sri Ahobila Mutt guesthouse and Nandyal homestays (Nandyal is the 75km gateway and the nearest decent stay base) at moderate occupancy. Hotel rates ease 20 percent off February: Sri Ahobila Mutt guest house ₹400-1,200, Nandyal homestays ₹1,000-2,200. Last clean-comfort window before April pushes the Upper Ahobilam trek out of practical viability.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 4, 2, 'wait',
  'Heat ramps. 24-37C. Upper trek impossible past 7am. Lower viable. Push to October.',
  'April pushes Ahobilam past Upper-trek viability. Daytime 35-37C. 7km gorge trek impossible past 7am. Lower temple viable. The 9-temple circuit cannot run. Push to October.',
  'April in Ahobilam pushes the Upper Lakshmi Narasimha trek out of viability. The 7km forest gorge climb cannot run past 7am at 35-37C. Lower Ahobilam still workable but the full Nava Narasimha 9-temple circuit collapses. October opens the proper window.',
  'April in Ahobilam is the pre-monsoon heat ramp. Daytime 35-37C, nights 24-25C, humidity 50 percent, rainfall under 30mm. The Nallamala range elevation provides minimal heat buffer (Ahobilam gorge sits at 400-700m). Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at full ritual tempo — the cool stone interior of the gorge-base temple holds 30-32C through the day. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest trek impossible past 7am — the rocky gorge surface holds 40-42C noon-4pm and the forest canopy is patchy enough that direct sun hits the trail in 60 percent of the climb. The full Nava Narasimha 9-temple circuit cannot run cleanly; only the bottom-half cluster (Bhargava, Yogananda, Chatravata) is workable as a morning loop. Sri Ahobila Mutt guesthouse occupancy drops sharply through April. Nandyal homestays ₹800-1,800 at off-peak. International Telugu-Vaishnavite arrivals thin (the global Sri Vaishnavite community avoids April-July). The trip you came for — the Nava Narasimha gorge circuit and the Upper Lakshmi Narasimha trek — cannot happen. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 5, 1, 'skip',
  'Heat peak. 26-40C. Gorge trail impossible. Lower temple cool interior. Skip strict.',
  NULL,
  'May is heat peak at Ahobilam. Forest gorge trail to Upper Ahobilam impossible at 38-40C. The 9-temple circuit cannot run. Forest fire risk on the Nallamala range. Skip strict. October opens the proper window.',
  'May in Ahobilam is the pre-monsoon heat dome at peak. Daytime 38-40C, nights 26-27C, humidity 45 percent, rainfall under 30mm. Forest-fire risk hits the Nallamala range through April-May; controlled-burn restrictions on the Upper Ahobilam trek route are common (the AP Forest Department closes the trail intermittently for fire-safety on high-risk days). Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at full ritual tempo — the cool stone interior of the gorge-base temple holds 32-34C through the day; the temple itself remains workable. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest gorge trek impossible — the rocky surface holds 45-48C and the heat-stroke risk is real. The full Nava Narasimha 9-temple circuit cannot run cleanly. Sri Ahobila Mutt guesthouse at minimum occupancy. Nandyal (75km gateway) homestays ₹700-1,600 at year-low. International Telugu-Vaishnavite arrivals near-zero. Functional only for pilgrim itineraries locked to specific Adi Krithikai lunar dates; the trip you came for cannot happen. October-March is dramatically better. Push 5 months.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 6, 1, 'skip',
  'SW monsoon hits Nallamala. 24-32C, 150-220mm rain. Gorge trail leech-heavy. Landslide risk. Skip.',
  NULL,
  'June at Ahobilam loses the trek. SW monsoon hits Nallamala range hard (150-220mm). Forest gorge trail leech-heavy. Landslide risk on the 7km trek to Upper Ahobilam. Lower temple workable but the full circuit cannot run. Skip strict.',
  'June in Ahobilam is the southwest monsoon onset. Rainfall climbs to 150-220mm across 11-13 wet days, daytime 30-32C, nights 24-25C, humidity 82 percent. The Nallamala range catches significant orographic rainfall — Ahobilam is one of the wetter pockets of inland Andhra Pradesh in June-August. Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) continues at ritual tempo. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest gorge trek becomes hazardous — the trail surface turns leech-heavy through the monsoon, landslide risk concentrates on the steeper rocky sections, and the dirt trail loses grip after heavy-rain windows. The full Nava Narasimha 9-temple circuit cannot run; the intermediate temples scattered through the gorge (Bhargava, Yogananda, Chatravata, Karanja) become hard to access via the forest roads. Sri Ahobila Mutt guesthouse at minimum occupancy. Nandyal (75km gateway) sees rain-day road-closure risk on the AP Forest Department gorge-access road. Hotel rates at year-low: Mutt guesthouse ₹400-1,200, Nandyal homestays ₹800-1,800. The trip you came for cannot happen safely. Skip strict.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 7, 2, 'wait',
  'SW monsoon peak. 23-30C, 220-300mm rain. Adi Krithikai Narasimha Jayanti — Telugu pilgrim density.',
  NULL,
  'July at Ahobilam carries Adi Krithikai pilgrim density (Narasimha Jayanti) but SW monsoon at peak. Upper trek dangerous. Lower temple at full schedule. October is materially cleaner for the full Nava Narasimha circuit.',
  'July in Ahobilam is southwest monsoon at peak. Rainfall climbs to 220-300mm across 13-15 wet days, daytime 28-30C, nights 23-24C, humidity 85 percent. Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at full ritual tempo. Upper Ahobilam 7km forest gorge trek hazardous — landslide risk concentrates and the AP Forest Department periodically closes the trail. Adi Krithikai falls in July-August in 2026 (depending on the Tamil-Telugu lunar calendar — verify the local Sri Ahobila Mutt festival panchang). Adi Krithikai at Ahobilam is the Narasimha Jayanti festival; the Sri Ahobila Mutt processes the Narasimha utsava-murti through the Nava Narasimha cluster on the festival day. Despite the monsoon, the Adi Krithikai window draws regional Telugu Vaishnavite pilgrim density (10,000-25,000 pilgrim days). The 7km Upper Ahobilam trek closes for festival-day safety; pilgrims access Lakshmi Narasimha via Forest Department jeep on a graded gravel route from the alternative road approach. Sri Ahobila Mutt guesthouse at full Adi Krithikai occupancy. Hotel rates at off-peak otherwise: Mutt guesthouse ₹500-1,400, Nandyal homestays ₹900-2,000. October is materially cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 8, 2, 'wait',
  'Monsoon continues. 23-29C, 180-260mm rain. Adi Krithikai tail. Upper trek unsafe. Push to October.',
  NULL,
  'August at Ahobilam continues SW monsoon. Adi Krithikai tail through first fortnight. Upper Ahobilam trek still leech-heavy. The 9-temple circuit cannot run cleanly. October opens the proper window for the full pilgrim experience.',
  'August in Ahobilam continues the southwest monsoon. Rainfall 180-260mm across 12-14 wet days, daytime 28-29C, nights 23-24C, humidity 85 percent. Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at full ritual tempo. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest gorge trek leech-heavy and landslide-risk; the AP Forest Department maintains intermittent trail closures through the heavy-rain weeks. Adi Krithikai tail runs through the first fortnight (depending on the 2026 Tamil-Telugu lunar calendar — the festival can fall either July-end or first half of August). Sri Ahobila Mutt continues pilgrim accommodation through the festival tail. The full Nava Narasimha 9-temple circuit through the gorge cannot run cleanly. The Sravana-month Vaishnavite observances (Sravana-Sukravara Vishnu-Fridays) bring additional Telugu pilgrim density to Lower Ahobilam through August. Hotel rates at off-peak: Mutt guesthouse ₹500-1,400, Nandyal (75km gateway) homestays ₹900-2,000. October opens the proper window for the trek and the full Nava Narasimha cluster.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 9, 3, 'wait',
  'Monsoon retreats. 23-29C. Upper trek tentatively reopens late-Sep. Last off-peak window.',
  'September is the bridge month. SW monsoon retreats from Nallamala through second half. Upper Ahobilam trek tentatively reopens late September. Last off-peak value window before October peak.',
  'September at Ahobilam is the bridge but Upper trek conditions remain marginal — the trail surface needs 2-3 dry weeks to return to safe grip. October opens the proper trek-window. September works only for the Lower temple visit.',
  'September in Ahobilam is the bridge month before the proper season opens. Rainfall drops to 130-180mm across 10-12 wet days as the southwest monsoon retreats from the Nallamala range (typically IMD declares formal retreat late September). Daytime 28-29C, nights 23-24C, humidity 80 percent. Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at full ritual tempo. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest gorge trek tentatively reopens late September depending on rainfall conditions — the AP Forest Department typically clears the trail by September 25-30; the dirt trail itself needs 2-3 dry weeks to return to safe grip, so first-fortnight September is still marginal. The intermediate Nava Narasimha temples through the gorge become accessible as the access roads dry. Sravana-month tail (Telugu calendar) brings second-fortnight Vaishnavite observances. Sri Ahobila Mutt guesthouse moderate occupancy. Hotel rates at off-peak still: Mutt guesthouse ₹500-1,500, Nandyal homestays ₹1,000-2,200. Last off-peak value window before October ramps up. The post-monsoon green Nallamala forest peaks the second fortnight — the gorge is at its most visually striking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 10, 5, 'go',
  'Peak window opens. 22-29C. Upper trek at year-best grip. 9-temple gorge circuit clean.',
  'October opens the proper season. NE monsoon arrives mid-month as evening showers. Daytime 27-29C. Upper Ahobilam 7km trek at year-best grip on dry trail. 9-temple circuit cleanly accessible.',
  NULL,
  'October in Ahobilam is the proper season open. The southwest monsoon completes its retreat from the Nallamala range; the northeast monsoon arrives mid-month with 100-150mm of rainfall across 7-9 wet days, mostly late-afternoon and evening showers. Daytime 27-29C, nights 22-23C, humidity 75 percent. The Nava Narasimha 9-temple gorge circuit at full operations — Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at full ritual tempo, the intermediate cluster (Bhargava, Yogananda, Chatravata, Karanja, Ahobila, Varaha, Malola, Jwala, Pavana) accessible via the dried-out access roads. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest gorge trek at year-best grip — the dirt trail has dried after the SW monsoon and the trail surface holds 25-28C through the morning climb. Start the trek 5:30-6am, reach summit by 9am, descend by 1pm. The post-monsoon green Nallamala forest at peak — leech population drops sharply after the second dry week of October. Sri Ahobila Mutt guesthouse accommodation climbs through the month. Hotel rates climb 20 percent off September: Mutt guesthouse ₹600-1,800, Nandyal homestays ₹1,200-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 11, 5, 'go',
  'NE monsoon active. 19-27C. Karthika Masam at Nava Narasimha — Telugu Vaishnavite density.',
  'November is the peak-build month. NE monsoon 100-150mm in evening showers. Karthika Masam (full month) brings Telugu Vaishnavite density at Nava Narasimha cluster. Upper trek at year-cleanest.',
  NULL,
  'November in Ahobilam is one of the year''s peak months. Northeast monsoon active with 100-150mm rainfall across 8-10 wet days — late-afternoon and evening showers that rinse the gorge without disrupting morning programmes. Daytime 25-27C, nights 19-20C, humidity 70 percent. The Nava Narasimha 9-temple gorge circuit at full ritual tempo. Lower Ahobilam at full schedule. Upper Ahobilam 7km forest gorge trek at year-cleanest — the cool morning weather (start 6am at 19-20C) and the dry trail surface combine for the year''s best trek window. The intermediate Nava Narasimha cluster accessible via clean gravel forest roads. Karthika Masam (the full Karthika lunar month — late October into late November in 2026) brings month-long Vaishnavite observances at the Nava Narasimha temples; Karthika-Pournami (Karthika full moon, mid-November) draws regional Telugu Vaishnavite pilgrim density at the Prahlada Varada Lower Ahobilam temple. The Sri Ahobila Mutt jeeyar-sanyasi schedule peaks through Karthika — the institution''s annual chaturmasya-yatra (the wandering Vaishnavite sanyasi tradition) often coincides with this window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ahobilam', 12, 5, 'go',
  'Cool peak. 16-26C. Trek at year-best comfort. Christmas-NYE pilgrim density.',
  'December is the peak-cool month. Daytime 25-26C, nights 16-18C. Upper Ahobilam 7km trek at year-best — cool morning + dry trail. Christmas-NYE family pilgrim density.',
  NULL,
  'December in Ahobilam is the peak-cool month. Rainfall drops to 30-60mm as the northeast monsoon tails off through the first half; the second half is the year''s driest stretch. Daytime 25-26C, nights 16-18C, humidity 60 percent. The Nava Narasimha 9-temple gorge circuit at full ritual tempo. Lower Ahobilam (Diguva Ahobilam, Prahlada Varada) at 6am-1pm and 4pm-8pm schedule. Upper Ahobilam (Eguva Ahobilam, Lakshmi Narasimha) 7km forest gorge trek at year-best comfort — start the climb 6am at 16-18C cool morning, reach summit by 9am, descend by noon-1pm. The dry post-monsoon trail surface holds clean grip through the steep rocky sections. The intermediate Nava Narasimha cluster (Bhargava, Yogananda, Chatravata, Karanja, Ahobila, Varaha, Malola, Jwala, Pavana) accessible via clean forest roads — Sri Ahobila Mutt local guides run the full nine-temple darshan as a two-day circuit. The Ugra Stambham gorge-rock formation at year-clearest visibility. Christmas-NYE corridor (Dec 22 to Jan 5) brings Andhra-Telangana family Vaishnavite pilgrim density. Adi Krithikai prep starts late December for the July-August festival.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
