-- Kanchipuram destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kanchipuram | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 1, 5, 'go',
  'Peak temple-and-silk window. 21-30C, dry. Ekambareswarar, Kamakshi, Varadharaja, Kailasanathar all walkable.',
  'January is Kanchipuram''s strongest stretch. Daytime 22-30C, low humidity, all four major temples walkable on a single day. Pongal weekend (Jan 14-17) brings Chennai-Bangalore weekend silk shoppers. Kanchipuram silk co-op weavers at full demonstration.',
  NULL,
  'Kanchipuram in January is the version a temple-and-silk trip is built around. Daytime 22-30C, nights 20C, humidity 65 percent. Four anchor temples walk cleanly on a single day: Ekambareswarar (Shiva as Earth — Prithvi Pancha Bhoota Stalam, 16th-century Vijayanagara over Pallava origins, the 1000-pillar mandapam and 3,500-year-old mango tree at the inner sanctum, 5:30am-12:30pm + 4-8:30pm), Kamakshi Amman (Shakti pitha, parikrama route from south gate, 5:30am-12:30pm + 4-9pm), Varadharaja Perumal (Vaishnavite, the wooden Athi Varadar idol brought out for 48-day darshan every 40 years — last 2019, next 2059 — main stone idol permanently darshanable, 6am-12pm + 3:30-8:30pm), and Kailasanathar (Pallava early-8th-century sandstone, the oldest in Kanchipuram and architectural prototype for later Tamil Shiva temples, 6am-12pm + 4-8pm, free entry — the only ASI-maintained). Silk co-op weavers at Kanchipuram Silk Weavers Co-operative Society (Pillaiyarpalayam) and Kanchipuram Saree Manufacturers Co-op run full demonstrations — pure mulberry-with-zari ₹3-15k per saree. ECR/NH-48 from Chennai (72km) 90 minutes. Hotels: GRT Regency ₹4-6k, Hotel Saradharam ₹2.5-4k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 2, 5, 'go',
  'Driest month. 22-31C. Temple walking peak. Thai Pusam (Feb 1, 2026) brings devotee spikes.',
  'February is the technical peak. Rainfall under 10mm, low humidity, full temple-and-silk walking weather. Thai Pusam (February 1, 2026) brings devotee spikes at Kamakshi Amman. Silk co-op weavers at peak demonstration.',
  NULL,
  'February in Kanchipuram is the year''s cleanest weather window for the temple-and-silk circuit. Rainfall under 10mm, daytime 23-31C, humidity 60 percent. Thai Pusam (Pushya nakshatra in Tamil Thai month, February 1 in 2026) is the major Muruga festival — Palani and Marudhamalai are the headline temples, but Kamakshi Amman in Kanchipuram sees significant devotee traffic with the parikrama route from the south gate filling 4-5am pre-dawn. The four anchor temples (Ekambareswarar, Kamakshi, Varadharaja, Kailasanathar) all run standard schedules. The Sthala Vriksha at Ekambareswarar — the 3,500-year-old mango tree with four branches producing four distinct mango varieties — is the year-round photographic anchor. Kanchipuram Silk Weavers Co-operative Society (Pillaiyarpalayam, founded 1942, the most reliable source for pure mulberry-and-zari silk) runs full custom-order demonstrations 9am-1pm + 3-7pm; pure-silk saris ₹4-15k. Hotel rates at peak: GRT Regency ₹5-7k, Hotel Saradharam ₹3-5k, mid-tier hotels ₹2-3.5k. ECR/NH-48 from Chennai 72km, 90 minutes off-peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 3, 4, 'go',
  'Last cool month. 25-33C, humidity climbing. Temple walks pre-11am and post-5pm. Maha Shivaratri.',
  'March extends the February window. Maha Shivaratri (variable, around February 26-March 18, 2026 verify) brings Ekambareswarar all-night abhishekam. Hotel rates ease 20 percent versus February.',
  NULL,
  'March in Kanchipuram is the soft-landing month before the heat dome opens. Daytime 26-33C, humidity climbing from 65 to 75 percent across the month, sea breeze faint inland but pleasant after 4pm. Maha Shivaratri (Phalguna Krishna Chaturdashi, around February 26 to March 18 in 2026 — verify exact date) is the year''s major Shaivite festival — Ekambareswarar Temple stages all-night abhishekam from 6pm to 6am, the Sthala Vriksha mango tree decorated, the 1000-pillar mandapam open through the night. Ekambareswarar at Kanchipuram is the year-round Earth-element Pancha Bhoota Stalam anchor. The four-temple circuit walks 7-11am and 4:30-7pm windows; mid-day rest at GRT Regency or Hotel Saradharam. Silk co-op weavers at Pillaiyarpalayam run full demonstration hours. Hotel rates ease 20 percent: GRT Regency ₹4-6k, Hotel Saradharam ₹2.5-4k, mid-tier hotels ₹1.5-2.5k. Last comfortable temple-walking window before April heat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 4, 2, 'wait',
  'Heat dome opens. 27-38C, humidity 75 percent. Temple walks compress to dawn. Tamil New Year Apr 14.',
  'April still works for early-morning four-temple darshan and AC silk co-op visits. Tamil New Year (April 14) brings temple programming. Mid-day strictly indoors.',
  'April is when Kanchipuram''s heat dome opens. Temple walks past 9am collapse — the temple courtyards and the granite mandapams hold heat. Silk co-op demonstrations work 8-11am only. Push to October-November.',
  'April in Kanchipuram is when the temple-and-silk trip narrows to dawn and after-dark. Daytime 28-38C, humidity 75 percent, sea breeze unreliable until 5pm. Tamil New Year (Puthandu, April 14) is observed across the city — Ekambareswarar, Kamakshi, Varadharaja, Kailasanathar temples run special pre-dawn abhishekam from 5am, traditional sadhya thalis at temple-adjacent restaurants ₹150-400. The four-temple circuit compresses into a 5:30-9am window only. The granite courtyards and the long colonnaded mandapams at Ekambareswarar (1000 pillars) and Varadharaja Perumal (the 100-pillared mandapam with stone-chain link sculpture, one of the finest Vijayanagara stone-carving examples in TN) absorb and re-radiate heat through the day. Silk co-op demonstrations at Pillaiyarpalayam compress to 8-11am and 5-8pm. AC retreats: GRT Regency, Hotel Saradharam, Kanchi Sankara Madam guesthouse (if you have introductions). Hotel rates drop 30 percent versus February: GRT Regency ₹3.5-5k, Hotel Saradharam ₹2-3.5k, mid-tier hotels ₹1.2-2.5k. ECR/NH-48 drive from Chennai 72km — afternoon return drive 4-6pm requires AC. Push to October-November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 5, 2, 'wait',
  'Peak heat. 29-40C, humidity 75 percent. Temple courtyards scorching. Silk shopping AC-only.',
  'May functions only for pre-dawn darshan and AC silk visits. Mid-day temple walks impossible. Pre-monsoon thunderstorms last 10 days.',
  'May is Kanchipuram''s harshest stretch. Temple courtyards and granite mandapams hold heat 11am-6pm. Pre-dawn darshan possible; mid-day strictly AC. Push to October-November.',
  'May in Kanchipuram is the year''s harshest stretch. Daytime 29-40C, humidity 75 percent, sea breeze unreliable. The granite courtyards of the four anchor temples reach 50-55C surface temperature by 11am; the 1000-pillar mandapam at Ekambareswarar (Vijayanagara construction, the granite columns 5-6m tall) absorbs the day''s heat and re-radiates through evening. Pre-dawn darshan windows (5-7am) hold workable; mid-day strictly AC-anchored. Pre-monsoon thunderstorms hit the last 10 days as Mango Showers — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours. Silk co-op demonstrations at Pillaiyarpalayam compress to 7-10am and 6-8pm. Hotel rates at year-low: GRT Regency ₹3-4.5k, Hotel Saradharam ₹1.8-3k, mid-tier hotels ₹1-2k. Cothas Coffee filter-coffee stops and the Saravana Bhavan in town stay AC-cool through the day. Kanchi Sankara Madam (the famed Mutt of the Kanchi Acharya lineage) holds its daily routine including 6am paaduka puja but visitor traffic at year-low. Push to October-November for clean temple-walk weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 6, 2, 'wait',
  'SW monsoon weak. 27-36C, only 50-70mm rain. Heat continues. Temple walks pre-9am only.',
  NULL,
  'June is heat-with-marginal-rain. Inland TN in SW monsoon rain shadow. Temple courtyards still 45-50C mid-day. Push to October.',
  'June in Kanchipuram sits in the SW monsoon rain shadow that defines inland Tamil Nadu — the Western Ghats absorb the SW current moisture and only 50-70mm of light rain reaches the city across 5-7 wet days. Heat dominates: daytime 28-36C, humidity 75 percent, sea breeze faint inland. Temple courtyards at Ekambareswarar, Kamakshi, Varadharaja, Kailasanathar still 45-50C surface mid-day. The four-temple circuit compresses to 6-9am dawn. Hotel rates remain low-season: GRT Regency ₹3-4.5k, Hotel Saradharam ₹1.8-3k, mid-tier hotels ₹1-2k. Silk co-op demonstrations at Pillaiyarpalayam open 8-11am and 6-8pm; Friday-Saturday Chennai-Bangalore silk-shopping weekend traffic continues year-round but moderates in summer. Cothas Coffee, Saravana Bhavan in town stay AC-cool. The clean travel window opens with the NE monsoon retreat in mid-to-late October — inland Tamil Nadu sees temperature relief faster than the immediate coast.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 7, 3, 'wait',
  'SW monsoon residual. 26-34C, 100-130mm rain. Aadi opens. Heat retreating slowly.',
  'July sees first heat retreat — sea breeze stronger, rain showers 7-9 days. Aadi month opens mid-July; Sthala Vriksha at Ekambareswarar at peak veneration. Pre-dawn temple windows clean.',
  NULL,
  'July in Kanchipuram marks the first measurable heat retreat. Daytime 27-34C, humidity 78 percent, sea breeze faint inland but more reliable from 2pm. SW monsoon residual brings 100-130mm across 7-9 wet days — short evening squalls. The Tamil month Aadi opens (mid-July to mid-August) — Aadi Velli (Friday) processions at Kamakshi Amman Temple are a year-round draw but Aadi-month Fridays see significant devotee traffic. The Sthala Vriksha (the 3,500-year-old mango tree at Ekambareswarar) sees full Aadi veneration. The four-temple circuit walks pre-10am and post-5pm. Silk co-op demonstrations at Pillaiyarpalayam resume normal hours. Hotel rates in the low-season window: GRT Regency ₹3-4.5k, Hotel Saradharam ₹1.8-3k. Aadi sale at the silk co-ops brings discounted pure-silk sari ranges across the month — Kanchipuram Silk Weavers Co-operative Society offers 10-15 percent off year-round inventory. October 15 onward delivers a much cleaner travel shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 8, 3, 'wait',
  'Aadi continues. 26-33C, 130-160mm rain. Varalakshmi Vratam late month. Madras Day cross-traffic.',
  'August brings Aadi sale climax, Varalakshmi Vratam (variable, late August), Madras Day (August 22) Chennai weekend cross-traffic. Heat retreating slowly.',
  'August holds July pattern. Aadi sale brings Chennai weekend silk shoppers Friday-Sunday. Temple walks pre-10am and post-5pm. October is the much cleaner call.',
  'August in Kanchipuram extends the slow heat retreat with two cultural anchors. Aadi sale climaxes mid-month at the silk co-ops — Kanchipuram Silk Weavers Co-operative Society (Pillaiyarpalayam), Kanchipuram Saree Manufacturers Co-op, and the smaller weaver clusters along Karukinilkundram Street and Pillaiyarpalayam stage 15-20 percent off year-round inventory and pure-silk-with-zari saris at ₹3.5-12k. Varalakshmi Vratam (variable Shukla Saptami of Shravana month, late August or early September) is a major women''s festival — Kamakshi Amman Temple at peak devotee traffic, with kalasha decoration and 9-thread tying rituals at the temple from 5am. Madras Day (August 22) brings strong Chennai weekend traffic to the temple-and-silk circuit. Daytime 26-33C, humidity 80 percent, rain 130-160mm across 10-12 wet days. The four-temple circuit walks pre-10am and post-5pm. Hotel rates climb 25-30 percent weekends: GRT Regency ₹4-5.5k weekend, Hotel Saradharam ₹2.5-4k weekend. The much cleaner travel window opens October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-32C, 130-180mm rain. Vinayaka Chathurthi Sep 7, 2026. Heat easing.',
  'September is the bridge month. Vinayaka Chathurthi (around September 7, 2026) brings Pillayar idol immersion. Sea breeze reliable. Temple walks lengthen.',
  'September is the gentle approach to clean weather. Temple walks 8-11am and 4-7pm work. Push to mid-October for full season opening.',
  'September in Kanchipuram is the bridge month before the NE monsoon arrives. Daytime 26-32C, humidity 78 percent, sea breeze faint inland but reliably from 2pm. Vinayaka Chathurthi (variable Bhadrapada Shukla Chathurthi — September 7, 2026) brings Pillayar idol immersion processions to the Kanchipuram tank on the eleventh day (Anantha Chaturdashi); the procession through the four-temple core takes 4-5 hours. The temple-and-silk circuit walking shape opens up — pre-11am and post-4pm windows lengthen. Silk co-op demonstrations resume full hours 9am-1pm + 3-7pm. Hotel rates climb 15-20 percent versus August low: GRT Regency ₹4-6k, Hotel Saradharam ₹2.5-4k, mid-tier hotels ₹1.5-3k. Chennai-Bangalore weekend traffic returns to the four-temple-and-silk circuit — Friday-Sunday rates climb another 25 percent. The NE monsoon arrives mid-to-late October — inland Kanchipuram sees temperature relief and only moderate rainfall versus the immediate coast.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 10, 4, 'go',
  'Season opens. 24-30C, 200-280mm rain. Temple walks return mid-month. Navaratri (Oct 11-20, 2026) at Kamakshi.',
  'October is the season opener. Navaratri (October 11-20, 2026 — verify Shukla Pratipad of Ashwin) brings Kamakshi Amman at peak Devi festival. NE monsoon delivers 200-280mm but temple walks viable mid-month. Inland location means rain less heavy than coast.',
  NULL,
  'October in Kanchipuram is the proper season opener. The NE monsoon arrives mid-month — inland Kanchipuram receives 200-280mm of rain across 9-11 wet days (significantly less than the immediate coast at Chennai/Mahabalipuram). The temperature drop is dramatic: daytime falls from late-September''s 31-32C to 24-30C. Granite courtyards at the four anchor temples cool below 35C surface mid-day; the temple-and-silk circuit resumes its full shape from October 15 onward. Navaratri (Sharad Navaratri, Shukla Pratipad of Ashwin month, October 11-20 in 2026) is the year''s major Devi festival — Kamakshi Amman Temple at peak ten-day programming, with Devi alankarams across the nine nights (Durga, Lakshmi, Saraswati rotations), midnight pujas, classical music and dance performances at the temple courtyard. Devotee traffic peaks October 12-15 — book GRT Regency, Hotel Saradharam 3-4 weeks ahead. The other three temples (Ekambareswarar, Varadharaja, Kailasanathar) hold standard schedules. Silk co-op demonstrations at Pillaiyarpalayam at peak pre-Diwali sari demand. Hotel rates climb to 50-60 percent of December peak: GRT Regency ₹5-7k, Hotel Saradharam ₹3-4.5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 11, 5, 'go',
  'High season. 22-29C, 250-330mm rain. Karthigai Deepam late-month. Temple walks at full reach.',
  'November is full high season. Rain still substantial (250-330mm) but mornings clean, full temple-and-silk circuit walking. Karthigai Deepam (December 4, 2026) build-up late November.',
  NULL,
  'November in Kanchipuram is full high-season month. The NE monsoon remains active (250-330mm across 11-13 wet days) but rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Inland Kanchipuram receives less rain than the immediate coast — Chennai sees 350-400mm in November versus Kanchipuram''s 250-330mm. The four-temple circuit (Ekambareswarar, Kamakshi, Varadharaja, Kailasanathar) walks at full reach 6am-12pm + 4-9pm between showers. Karthigai Deepam (full moon of Karthigai month, Krittika nakshatra, December 4 in 2026) builds late November — Tiruvannamalai (4 hours west) is the main draw with the 30-foot ghee cauldron lit at the Arunachala summit, but Kanchipuram temple oil-lamp displays through the four-temple core start late November. Silk co-op demonstrations at Pillaiyarpalayam at peak pre-wedding-season demand. Hotel rates climb to 75-85 percent of December peak: GRT Regency ₹5.5-7.5k, Hotel Saradharam ₹3-5k, mid-tier hotels ₹2-3.5k. ECR/NH-48 from Chennai (72km) 90 minutes off-peak; weekend Friday-Sunday Chennai-Bangalore silk-shopping traffic adds 30 minutes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanchipuram', 12, 5, 'go',
  'Peak season. 21-28C, 100-160mm rain. Christmas-NYE traffic. Karthigai Deepam Dec 4. Lock rooms 4-6 weeks ahead.',
  'December is operational peak. Christmas-NYE traffic strong. Karthigai Deepam (December 4, 2026) brings full temple oil-lamp programming. Lock rooms 4-6 weeks ahead.',
  NULL,
  'December in Kanchipuram is the operational peak. Karthigai Deepam (full moon of Karthigai, Krittika nakshatra, December 4 in 2026) brings full temple programming — Ekambareswarar lights thousands of oil lamps across the 1000-pillar mandapam, Kamakshi Amman holds Karthigai-Shukla-Krittika special darshan, the four-temple core glows for the full month. Tiruvannamalai (4 hours west) is the headline venue with the 30-foot ghee cauldron at Arunachala summit, but Kanchipuram receives strong residual pilgrim traffic. Daytime 22-28C, nights 20C, rain 100-160mm across 6-8 wet days, humidity 70 percent. Cyclone watch holds through December 20 historically — Vardah (Chennai December 12, 2016) and Michaung (Chennai December 5, 2023) brought heavy rain inland with 1-2 day temple closures. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.5-2x the November baseline: GRT Regency ₹7-10k, Hotel Saradharam ₹4-6k, mid-tier hotels ₹2.5-4.5k. Silk co-op at peak wedding-season demand — pure-silk-and-zari saris at ₹4-15k, custom orders 4-5 days. ECR/NH-48 from Chennai (72km) 90 minutes off-peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
