-- Guruvayur destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: guruvayur

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 1, 4, 'go',
  'Peak window. 23-31C, dry. Sri Krishna Temple full darshan hours. Punnathur Kotta elephant camp open.',
  'January is when Guruvayur runs at its strongest — the Sri Krishna Temple (Bhuloka Vaikunta) at full darshan hours, Punnathur Kotta (largest captive elephant colony in the world, 60+ Devaswom elephants, 4km from temple) walkable. Non-Hindus not permitted in sanctum — temple complex outside the sanctum is open. Strict dress code: men dhoti, women saree.',
  NULL,
  'Guruvayur in January is the version pilgrims of Krishna devotion book first. Daytime sits at 24-31C, nights drop to 22C, humidity below 70 percent. The Sri Krishna Temple — Bhuloka Vaikunta by Hindu tradition, one of Hinduism''s most sacred Krishna temples — runs full darshan hours: 3am Nirmalya Darshan, continuous through 12:30pm, then 4pm-9:30pm. Non-Hindus strictly not permitted inside the sanctum (only Hindu by birth or formally converted with a Devaswom-issued certificate). Dress code: men in dhoti or mundu, women in saree, set-mundu, or salwar-kurta. Free anna-prasad daily 11am-1pm at Devaswom dining hall. Photography and mobile phones banned inside temple — deposit lockers at entrance ₹5. Punnathur Kotta — the largest captive Asian-elephant colony in the world (60+ Devaswom elephants), 4km north of the temple — open 8am-6pm, ₹10 entry. Hotels: Hotel Sopanam Heritage ₹3-5k, Krishna Inn ₹2.5-4k, Mayura Residency ₹1.5-2.5k. Reach via Thrissur railway 30km south (45 min by car/bus, KSRTC ₹40).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 2, 4, 'go',
  'Driest month. 24-32C. Pilgrim load steady. Punnathur Kotta walkable.',
  'February delivers Guruvayur''s cleanest weather. Rainfall under 5mm. Pilgrim load steady — Ekadashi peak is November-December, February is shoulder. Hotel rates negotiable.',
  NULL,
  'February in Guruvayur is the year''s cleanest weather window outside the Ekadashi spike. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent — the lowest of the year. The Sri Krishna Temple runs full darshan hours: 3am Nirmalya Darshan, continuous through 12:30pm, 4pm-9:30pm. Non-Hindus not permitted in sanctum (strict). Dress code enforced (men dhoti, women saree). Punnathur Kotta — 60+ Devaswom elephants in the world''s largest captive colony — open 8am-6pm, ₹10 entry. Mammankam-Kavu Bhagavathy Temple and Manjulal-the sacred banyan are within 1km of the main temple. Pilgrim load steady through February — major festival peaks are Ekadashi (Vrishchikam, Nov-Dec) and Vishu Apr 14. Hotels at off-Ekadashi rates: Hotel Sopanam Heritage ₹3-5k, Krishna Inn ₹2-4k, Mayura Residency ₹1.5-2.5k. Long-stay rates negotiable from mid-month. Reach via Thrissur railway 30km south (45 min by car/bus, KSRTC ₹40), Kozhikode 100km north (2 hours), Cochin International Airport 80km south (90 minutes by NH-66 + Guruvayur road).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 3, 4, 'go',
  'Last cool month. 25-33C. Punnathur walks early-morning. Hotel rates slide 15-20 percent.',
  'March extends February''s weather minus the heat. Heritage walks compress to early-morning. Hotel rates 15-20 percent below February. Last comfortable window before April heat.',
  NULL,
  'March in Guruvayur is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week. Sri Krishna Temple darshan hours unchanged (3am Nirmalya through 9:30pm with mid-day break). Punnathur Kotta walks workable 7-9am and 4:30-6pm — mid-day visit to elephant pens uncomfortable in heat. Mammankam-Kavu Bhagavathy and Manjulal banyan visits hold morning slots. Hotel rates drop 15-20 percent versus February: Hotel Sopanam Heritage ₹2.5-4k, Krishna Inn ₹2-3.5k, Mayura Residency ₹1.2-2k. Free anna-prasad at Devaswom dining hall 11am-1pm. Reach via Thrissur railway 30km south (45 min by car/bus, KSRTC ₹40), Kozhikode 100km north, Cochin International Airport 80km south. Last comfortable window before April pushes the trip into morning-only mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 4, 3, 'wait',
  'Heat. 27-34C, humidity 80 percent. Vishu Apr 14 brings major pilgrim spike.',
  'April pushes Guruvayur into pre-monsoon heat. Vishu (April 14, Malayalam new year, Vishukani at temple at 3am) brings massive pilgrim spike — accommodation triple-priced for 3 days. Outside Vishu week, normal pilgrimage continues with morning-only outdoor walks.',
  NULL,
  'April in Guruvayur is the pre-monsoon heat month — the temple is the year-round draw, but outdoor walking compresses sharply. Daytime 28-34C, humidity 80 percent. The Sri Krishna Temple runs full darshan hours; Vishu (April 14, Malayalam new year) is one of Guruvayur''s major draws — Vishukani Darshan at 3am sees hundreds of thousands of pilgrims with kanikkonna flowers and gold for the auspicious first sight. Accommodation triple-priced for the 3-day Vishu window (lock hotels 6-8 weeks ahead): Hotel Sopanam Heritage ₹6-10k versus April baseline ₹2-4k, Krishna Inn ₹4-7k versus ₹1.8-3k. Outside Vishu, normal pilgrim flow continues with rooms easily found. Punnathur Kotta workable 7-9am only — mid-day at the elephant pens unbearable in heat. Pilgrims still come — temple devotion overrides weather discomfort — but casual heritage visitors should anchor on early-morning Punnathur and use AC hotel rooms 11am-4pm. Reach via Thrissur railway 30km south, KSRTC ₹40, 45 minutes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 5, 3, 'wait',
  'Peak heat plus pre-monsoon. 28-34C, humidity 85 percent. Thiruvonam-related pilgrim flow steady.',
  'May runs hot but pilgrimage continues. Pre-monsoon thunderstorms hit weeks three and four. Hotel rates at year-low for non-Vishu weeks. Punnathur dawn-only.',
  NULL,
  'May in Guruvayur is pilgrim-tolerant but weather-discouraging for casual visitors. Daytime 29-34C, humidity 85 percent. Sri Krishna Temple darshan hours unchanged — pilgrims arrive year-round, devotion overrides season. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls that knock grid power 1-2 hours and raise humidity to 90 percent. Punnathur Kotta workable 7-8:30am only. Hotels at year-low: Hotel Sopanam Heritage ₹2-3.5k, Krishna Inn ₹1.5-2.8k, Mayura Residency ₹1-1.8k. Free anna-prasad continues 11am-1pm. Karkidakam Ayurveda month opens mid-July at backwater resorts inland — Guruvayur itself is not an Ayurveda destination. The pilgrimage trip works through the heat for devout visitors; casual heritage visitors push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 6, 2, 'wait',
  'SW monsoon. 25-30C, 600-700mm rain. Temple open, Punnathur reduces hours.',
  NULL,
  'June pushes Guruvayur into monsoon. Temple darshan continues year-round but Punnathur Kotta reduces hours and the outdoor approach floods. Pilgrims still arrive but casual heritage visitors should push to October.',
  'June in Guruvayur is when the southwest monsoon arrives. The current hits Kerala on or around June 1 (IMD announces formal Kerala monsoon onset annually from Thiruvananthapuram). Rainfall jumps to 600-700mm across 22-25 wet days, daytime 25-30C, humidity 90 percent. Sri Krishna Temple darshan continues full hours — pilgrim devotion is year-round and the temple complex is mostly covered (sanctum, inner praharam, outer praharam, and the dining hall are all sheltered). Punnathur Kotta reduces hours through monsoon (12-noon to 4pm only on rough-weather days); outdoor elephant viewing is uncomfortable. Hotel rates at year-low: Hotel Sopanam Heritage ₹1.8-3k, Krishna Inn ₹1.4-2.5k, Mayura Residency ₹900-1.5k. Free anna-prasad continues. Pilgrims come year-round; casual heritage visitors push to October when Punnathur reopens to full hours and the temple complex walks dry out.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 7, 2, 'wait',
  'Peak monsoon. 25-29C, 700-800mm rain. Temple year-round, but discomfort high.',
  NULL,
  'July is the wettest month at Guruvayur. Temple darshan year-round, but Punnathur Kotta closed half the days, outdoor approaches flood, casual heritage trip uncomfortable. Pilgrims continue. Wait for October.',
  'July in Guruvayur is monsoon at its most stubborn. Rainfall averages 750mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 25-29C, humidity 92 percent. Sri Krishna Temple darshan continues year-round — pilgrim devotion is unbroken — and the temple''s covered praharams and dining hall keep visitors mostly dry. Punnathur Kotta closes half the days through July on lightning-and-flooding advisories. Mammankam-Kavu Bhagavathy and Manjulal banyan walks impossible. Hotel rates at year-low: Hotel Sopanam Heritage ₹1.5-2.8k, Krishna Inn ₹1.2-2.2k, Mayura Residency ₹800-1.4k. Free anna-prasad continues 11am-1pm at Devaswom dining hall. Pilgrim arrivals continue year-round but casual heritage visitors should wait for October. Karkidakam Ayurveda is at backwater resorts inland; Guruvayur is not an Ayurveda destination.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 8, 2, 'wait',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026). Temple year-round.',
  NULL,
  'August holds monsoon at Guruvayur with Onam celebrations layered on. Temple darshan year-round; Onam draws additional pilgrim flow but Punnathur outdoor approaches still wet. For Onam darshan yes, for general heritage no.',
  'August in Guruvayur pairs the southwest monsoon with the Onam state holiday cluster. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org). Sri Krishna Temple runs special Onam programmes — Atha Pookalam (flower carpet) at temple courtyard, Thiruvonam Sadhya at Devaswom dining hall (free for darshan-takers, ₹50-100 donation suggested), continuous darshan through Onam week. Hotels run elaborate Onam sadhya lunches: 26-28 dishes on banana leaf, ₹500-1500 per person — Hotel Sopanam Heritage and Krishna Inn anchor. Hotel rates climb 30-50 percent through Onam week (lock 4-6 weeks ahead): Hotel Sopanam Heritage ₹3-5.5k versus August baseline ₹1.8-3k. Punnathur Kotta still rain-challenged. Worth a 2-day visit specifically for Thiruvonam darshan and sadhya; otherwise wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Temple year-round. Punnathur rebuilding hours.',
  'September is the recovery. SW monsoon retreats through second half. Temple year-round, Punnathur returns to full hours late month. Worth a 2-3 day visit for shoulder-season quiet.',
  'September is rebuild-not-yet-clean at Guruvayur. Punnathur Kotta still on reduced hours through first three weeks. Push to mid-October for the full pilgrim-and-elephant shape.',
  'September in Guruvayur is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Sri Krishna Temple darshan continues year-round. Punnathur Kotta rebuilds full hours from mid-month. Hotel rates climb 15-20 percent versus August lows: Hotel Sopanam Heritage ₹2-3.5k, Krishna Inn ₹1.5-2.8k, Mayura Residency ₹1-1.7k. Free anna-prasad at Devaswom dining hall continues 11am-1pm. Friday-Sunday Bangalore weekend pilgrim traffic resumes. The full clean window opens from October 5-15 onward — with Ekadashi peak (Nov-Dec) only 6-8 weeks away, September is the last month before the year''s biggest pilgrim spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 10, 4, 'go',
  'Season opens. 24-30C, 200-250mm late-monsoon spillover. Punnathur full hours mid-month.',
  'October is the season-opener at Guruvayur. Punnathur Kotta full hours mid-month, temple year-round, late-monsoon spillover still 200-250mm. Hotel rates 25-30 percent below December peak (pre-Ekadashi).',
  NULL,
  'October in Guruvayur is the proper return to coherent. Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean walking weather. Daytime 25-30C, humidity falling from 85 to 75 percent. Sri Krishna Temple darshan continues year-round; Punnathur Kotta returns to full 8am-6pm hours from mid-October. Mammankam-Kavu Bhagavathy and Manjulal banyan walks return to morning use. Hotel rates 25-30 percent below November-December Ekadashi peak: Hotel Sopanam Heritage ₹2.5-4k, Krishna Inn ₹2-3.5k, Mayura Residency ₹1.2-2k. Free anna-prasad continues 11am-1pm. Pre-Ekadashi run-up — the year''s biggest pilgrim spike (November-December Vrishchikam Ekadashi) is 6-8 weeks away. October is the calm before that peak. Reach via Thrissur railway 30km south (45 min by car/bus, KSRTC ₹40), Kozhikode 100km north, Cochin International Airport 80km south. Strong value window for first-time pilgrimage visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 11, 5, 'go',
  'Peak builds plus Ekadashi. 23-30C, rainfall under 50mm. Guruvayur Ekadashi in Vrishchikam.',
  'November delivers full peak. Rainfall under 50mm. Guruvayur Ekadashi in Vrishchikam (Nov-Dec lunar — verify 2026 date) draws hundreds of thousands. Lock hotels 8-12 weeks ahead for Ekadashi week.',
  NULL,
  'November in Guruvayur is the year''s spiritual peak. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent. Guruvayur Ekadashi — the most significant temple festival, marking Lord Krishna''s appearance to Pundarikan — falls in the Malayalam Vrishchikam month, Nov-Dec lunar (verify exact 2026 date via Guruvayur Devaswom or Kerala Tourism keralatourism.org). 100,000s of pilgrims, 24-hour continuous darshan during Ekadashi day, free anna-prasad served continuously. Sri Krishna Temple corridors fill from 3am Nirmalya darshan; pilgrim queues stretch 1-2km. Punnathur Kotta runs special Ekadashi hours with all 60+ Devaswom elephants on display. Hotel rates climb 100-200 percent through Ekadashi week (lock 8-12 weeks ahead): Hotel Sopanam Heritage ₹6-10k versus November baseline ₹3-5k, Krishna Inn ₹4-7k, Mayura Residency ₹3-5k. Outside Ekadashi week, normal November rates apply: Hotel Sopanam Heritage ₹3-5k, Krishna Inn ₹2.5-4k. Reach via Thrissur railway 30km south, KSRTC ₹40, 45 minutes. Strong call for pilgrims and devotees.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('guruvayur', 12, 5, 'go',
  'Peak season plus possible Ekadashi tail. 22-30C, dry. Christmas-NYE rates 2x.',
  'December delivers peak weather plus possible Ekadashi tail (some years Ekadashi lands early Dec). Christmas-NYE rates 2x normal. Lock hotels 4-6 weeks ahead for Christmas; 8-12 weeks for Ekadashi if December-dated.',
  NULL,
  'December in Guruvayur is peak weather plus the possible tail of Vrishchikam Ekadashi. Daytime 23-30C, nights 21-22C, rainfall under 30mm. Vrishchikam Ekadashi lunar timing means about 30-40 percent of years see Ekadashi in early December rather than November — verify 2026 date via Guruvayur Devaswom. If Ekadashi is December-dated, the festival commands 100,000s of pilgrims and accommodation 100-200 percent above baseline (lock 8-12 weeks ahead). Sri Krishna Temple darshan at 3am Nirmalya through 12:30pm and 4pm-9:30pm. Punnathur Kotta full hours 8am-6pm. The Christmas-NYE corridor (Dec 22 to Jan 5) sees rates run 1.8-2x the November baseline: Hotel Sopanam Heritage hits ₹5-8k, Krishna Inn ₹4-6.5k, Mayura Residency ₹3-4.5k. Free anna-prasad continues. Reach via Thrissur railway 30km south (45 min, KSRTC ₹40), Cochin Airport 80km south (90 min). Lock hotels 4-6 weeks ahead; 8-12 weeks if Ekadashi is December-dated.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
