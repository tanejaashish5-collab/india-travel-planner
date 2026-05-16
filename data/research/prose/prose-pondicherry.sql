-- Pondicherry (Puducherry) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: pondicherry | best_months [10,11,12,1,2,3] | avoid [6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 1, 5, 'go',
  'Peak French Quarter window. 22-29C, dry. Promenade Beach evening rotation. New Year tail crowds ease Jan 5.',
  'January is Pondicherry''s strongest stretch. Daytime 22-29C, dry, Promenade Beach evening rotation at full capacity. French Quarter walking weather is the year''s cleanest. Post-NYE rates ease by January 5; mid-month is the sweet spot.',
  NULL,
  'Pondicherry in January is the version the French Quarter trip is built around. Daytime 22-29C, nights 20C, humidity 65 percent, sea breeze cool through the Promenade evening. The 1.5km seaside Promenade (Goubert Avenue) runs traffic-free 6pm-7:30am — the only seaside walk of its kind in Tamil Nadu. The Manakula Vinayagar Temple (Ganesh, 500-year-old origins, the Sthala Vriksha tree at the entrance the village''s pre-French anchor) opens 5:45am-12:30pm + 4-9:30pm. Sri Aurobindo Ashram (main building on Rue de la Marine, the samadhi of Sri Aurobindo and the Mother is the central courtyard pilgrimage point) opens 8am-12pm + 2-6pm free entry, dress code modest. Auroville Matrimandir (12km north, inner-chamber meditation requires advance booking via aurovilleinfo.com, 4-7 days lead time, free) outer viewing daily 9am-5:30pm ₹50. New Year tail (December 28 to January 5) keeps White Town homestays at 90 percent occupancy — Maison Perumal CGH ₹14-18k, Palais De Mahe ₹10-13k, La Maison Radha ₹6-9k, mid-tier guesthouses ₹3-5k. ECR drive from Chennai (160km) 3 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 2, 5, 'go',
  'Driest month. 22-30C. Aurobindo Ashram Darshan Day Feb 21. Promenade and Auroville at peak.',
  'February is the technical peak. Rainfall under 10mm, low humidity, Promenade at full evening capacity. Aurobindo Ashram Darshan Day (February 21, the Mother''s birthday) is one of four annual pilgrim spikes — book accommodation 6 weeks ahead.',
  NULL,
  'February in Pondicherry is the year''s cleanest weather window. Rainfall under 10mm, daytime 23-30C, humidity 60 percent, sea breeze starting 11am. Aurobindo Ashram Darshan Day (February 21, the Mother''s birthday — Mirra Alfassa, born 1878) is one of four annual Darshan Days (others: April 24, the Mother''s 1920 final arrival; August 15, Sri Aurobindo''s 1872 birthday; November 24, the 1926 Day of Siddhi). The Ashram main building courtyard fills with disciples from 4am for early-morning Darshan; the samadhi opens to floral offerings through the day. Accommodation at the four Ashram-affiliated guesthouses (Park Guest House, International Guest House, Sea Side Guest House, Auro House) books 6-8 weeks ahead — ₹600-2000. White Town heritage hotels at peak: Maison Perumal CGH ₹15-20k, Palais De Mahe ₹11-14k, La Maison Radha ₹7-10k, mid-tier guesthouses ₹3.5-5.5k. Auroville Matrimandir concentration-room visits at the year''s highest demand — book 7-10 days ahead through aurovilleinfo.com. The Promenade evening walk 6-8pm, Cafe des Arts, Baker Street, Cafe Xtasi at year-best.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 3, 4, 'go',
  'Last cool month. 24-32C, humidity climbing. French Quarter walking pre-11am and post-5pm.',
  'March extends the February window with rising heat. French Quarter walks comfortable 7-11am and 4:30-7pm. Hotel rates ease 20-25 percent versus February peak. Last clean walking window before April heat dome.',
  NULL,
  'March in Pondicherry is the soft-landing month. Daytime 25-32C, humidity climbing from 65 to 75 percent across the month, sea breeze starting later (1-2pm) and dropping off earlier (6:30pm). The French Quarter walking shape (Rue Romain Rolland, Rue Dumas, Rue Suffren, Rue Suresh Compound — the original colonial grid) compresses into 7-11am and 4:30-7pm windows. Sri Aurobindo Ashram, Manakula Vinayagar Temple, Notre Dame des Anges (the white-and-pink Catholic basilica on Rue Dumas, 1855 construction), Eglise de Notre Dame de la Conception (Immaculate Conception Cathedral, the older 1791 Tamil Town anchor) all run normal hours. Auroville Matrimandir outer viewing 9am-5:30pm; concentration-room visits ease in availability versus February peak — 3-5 days lead time sufficient. Hotel rates ease 20-25 percent: Maison Perumal CGH ₹12-15k, Palais De Mahe ₹9-12k, La Maison Radha ₹5-8k, mid-tier guesthouses ₹2.5-4k. The Promenade evening 5:30-8pm reliable. Cafe des Arts breakfast 8-11am, Baker Street pastries, Cafe Xtasi pizza, Le Cafe (the Promenade-side state-government cafe, 24-hour) all hold full hours. Last comfortable walking window before April pushes the city into endurance shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 4, 3, 'wait',
  'Pre-monsoon heat. 27-36C, humidity 75 percent. Darshan Day Apr 24. French Quarter walks 6-9am only.',
  'April still works for early-morning French Quarter walks plus Aurobindo Ashram pilgrimage. Darshan Day (April 24, the Mother''s arrival in Pondicherry) brings ashram-affiliated visitors. Walks compress to dawn.',
  'April is when Pondicherry''s heat dome opens. French Quarter walks past 9am collapse — the unshaded yellow-and-ochre colonial facades hold heat. Push to October-November for full cool-weather French Quarter shape.',
  'April in Pondicherry is when the French Quarter trip narrows to early morning and after-dark. Daytime 28-36C, humidity 75 percent, sea breeze starting only after 4pm. Aurobindo Ashram Darshan Day (April 24, commemorating the Mother''s 1920 final arrival to meet Sri Aurobindo) is one of the four annual Darshan Days — ashram-affiliated visitors book accommodation 4-6 weeks ahead, Park Guest House and International Guest House at 100 percent capacity. French Quarter walks (Rue Romain Rolland, Rue Dumas, Rue Suffren) compress to 6-9am and 6-9pm only. AC retreats: Aurobindo Ashram main building courtyard, Promenade-side Le Cafe, Baker Street, Cafe Xtasi, Cafe des Arts. Notre Dame des Anges and the Cathedral hold their cool interiors. Hotel rates drop 30 percent versus February: Maison Perumal CGH ₹10-13k, Palais De Mahe ₹7-10k, La Maison Radha ₹4-6k, mid-tier guesthouses ₹2-3.5k. The Promenade evening from 5pm becomes the day''s anchor. Auroville Matrimandir outer viewing best 8-10am; concentration room visits 9am-1pm. Push to October-November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 5, 2, 'wait',
  'Peak heat. 28-38C, humidity 80 percent. French Quarter mid-day functionally closed. Hotel rates at year-low.',
  'May functions only for early-morning walks plus AC-pool stays. French Quarter mid-day collapses. Pre-monsoon thunderstorms hit the last 10 days.',
  'May is Pondicherry''s harshest stretch. French Quarter pre-10am walks possible; mid-day strictly indoors. Pre-monsoon thunderstorms last 10 days. Push to October-November.',
  'May in Pondicherry is the last month before the SW monsoon residue arrives. Daytime 29-38C with last-fortnight spikes to 40C, humidity 80 percent, sea breeze unreliable till 5pm. The yellow-and-ochre colonial facades absorb and re-radiate heat through the afternoon — the iconic French Quarter walking trip is essentially closed 10am-5pm. Pre-monsoon thunderstorms hit the last 10 days — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours and raise humidity to 88 percent. Aurobindo Ashram main building, Manakula Vinayagar Temple, Notre Dame des Anges all hold full hours but visitor traffic at low. Auroville Matrimandir outer-circle visits compress to 8-10am dawn. Hotel rates at year-low: Maison Perumal CGH ₹8-11k, Palais De Mahe ₹6-9k, La Maison Radha ₹3-5k, mid-tier guesthouses ₹1.5-3k. Beach-resort options on the Cuddalore Road (Le Pondy Resort, the Promenade Beach Pondy resort cluster) run "summer pool stays" at ₹4-7k including pool, breakfast. Cafe des Arts, Baker Street, Le Cafe Promenade-side stay open through the heat. Push to October-November for full French Quarter walking weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 6, 2, 'wait',
  'SW monsoon weak on TN coast. 27-35C, only 50-70mm rain. Heat continues. French Quarter morning-only.',
  'June continues the heat — Pondicherry sits in SW monsoon rain shadow. French Quarter walks 6-9am only. Sea breeze evening relief 5pm onward.',
  'June is heat-with-marginal-rain. TN coast in SW monsoon rain shadow. Only 50-70mm. French Quarter walking pre-9am only. Push to October.',
  'June in Pondicherry sits in the TN coast''s SW-monsoon rain shadow — the Western Ghats absorb most of the moisture and only 50-70mm of light rain reaches Pondicherry across 5-7 wet days. Heat dominates: daytime 27-35C, humidity 78 percent, sea breeze starting after 4pm and reliable only by 6pm. French Quarter walks (Rue Romain Rolland, Rue Dumas, Rue Suffren, Rue Suresh Compound) compress to 6-9am dawn. Aurobindo Ashram, Manakula Vinayagar, Notre Dame des Anges all hold full hours but visitor traffic at low. Auroville Matrimandir outer viewing best 8-10am. Hotel rates remain low-season: Maison Perumal CGH ₹8-11k, Palais De Mahe ₹6-9k, La Maison Radha ₹3-5k. The Promenade evening 5:30-8pm reliable — the running club, cyclists, and families fill the Goubert Avenue traffic-free stretch from 5:30pm onward. Beach-resort pool day still the standard mid-day shape. The clean travel window opens with the NE monsoon retreat in mid-to-late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 7, 3, 'wait',
  'Bastille Day Jul 14 anchors month. 26-33C, 100-130mm rain. Sea breeze stronger. Mid-day still demanding.',
  'July brings Bastille Day (July 14) — French-heritage cultural anchor in the monsoon trough. Pondicherry French Consulate, Lycée Français de Pondichéry, and several restaurants stage Bastille Day programming. Heat retreats marginally.',
  'July is monsoon-shadow with light rain and easing heat. Outdoor walking still compressed to dawn-and-evening windows. Push to October.',
  'July in Pondicherry layers Bastille Day on the slow heat retreat. Daytime 26-33C, humidity 80 percent, sea breeze stronger from 2pm. SW monsoon residual brings 100-130mm across 7-9 wet days — short evening squalls rather than sustained deluges. Bastille Day (July 14) is the year''s major French-heritage cultural anchor — Pondicherry retains French citizenship eligibility for residents whose families had French passports at the 1962 reunification (de facto a unique passport-rights status across India). The French Consulate (Rue Marine), the Lycée Français de Pondichéry (the only French-language K-12 in India, founded 1826), the Institut Français de Pondichéry, and several French Quarter restaurants (Cafe des Arts, Villa Shanti, Le Dupleix) stage Bastille Day dinners and events. Aurobindo Ashram main building, Manakula Vinayagar Temple at full hours. Hotel rates remain low-season: Maison Perumal CGH ₹9-12k, Palais De Mahe ₹7-10k, La Maison Radha ₹3.5-5.5k, mid-tier guesthouses ₹2-3.5k. Auroville Matrimandir outer viewing reliable through the day. October 15 onward delivers a dramatically cleaner travel shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 8, 3, 'wait',
  'Darshan Day Aug 15. 26-33C, 130-160mm rain. Sea breeze evening relief.',
  'August brings Aurobindo Ashram Darshan Day (August 15 — Sri Aurobindo''s 1872 birthday, India Independence Day overlap). Heat retreating slowly. Sea breeze evening relief.',
  'August holds July pattern — moderate rain, persistent humidity. Heritage walks limited to dawn and post-7pm. October is the much cleaner call.',
  'August in Pondicherry layers an Aurobindo Ashram Darshan Day on the slow heat retreat. Darshan Day (August 15 — Sri Aurobindo''s 1872 birthday, deliberately overlapping with India''s 1947 Independence Day, which Aurobindo took as a sign) is one of four annual Darshan Days. The Ashram main building courtyard fills with disciples and visitors from 4am for early-morning Darshan; the samadhi receives floral offerings through the day. Ashram-affiliated guesthouses (Park Guest House, International Guest House, Sea Side Guest House, Auro House) book 4-6 weeks ahead despite the monsoon-shadow weather. Daytime 26-33C, humidity 80 percent, rain 130-160mm across 10-12 wet days. The Promenade evening 5:30-8pm reliable. Hotel rates remain low-season weekdays but climb 25-30 percent weekends: Maison Perumal CGH ₹9-12k weekday, ₹12-15k weekend; Palais De Mahe ₹7-10k weekday, ₹9-12k weekend. Cafe des Arts, Baker Street, Le Cafe Promenade-side stay open through the heat. The dramatically cleaner travel window opens October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 9, 3, 'wait',
  'Pre-NE-monsoon. 25-32C, 130-180mm rain. Heat easing. French Quarter walks lengthen.',
  'September is the bridge month. Heat retreating, sea breeze reliable, French Quarter walks lengthen pre-NE-monsoon. Mid-month onward viable for first-time visitors who can tolerate occasional rain.',
  'September is the gentle approach to clean weather. Outdoor walking 8-11am and 4-7pm works. Push to mid-October for full season opening.',
  'September in Pondicherry is the bridge month before the NE monsoon arrives. Daytime 26-32C, humidity 78 percent, sea breeze reliably from 1pm. The French Quarter walking trip (Rue Romain Rolland, Rue Dumas, Rue Suffren, Rue Suresh Compound) opens up — pre-11am and post-4pm windows lengthen as humidity eases. Aurobindo Ashram main building 8am-12pm + 2-6pm, samadhi visit window steady through the day. Auroville Matrimandir outer viewing 9am-5:30pm; concentration-room visit slots open up versus the February/April peak — 3-5 days lead time sufficient through aurovilleinfo.com. Manakula Vinayagar Temple, Notre Dame des Anges, the Cathedral all run full hours. Hotel rates climb 15-20 percent versus August low: Maison Perumal CGH ₹10-13k, Palais De Mahe ₹8-11k, La Maison Radha ₹4-6k, mid-tier guesthouses ₹2.5-4k. Chennai-Bangalore weekend traffic returns to ECR — Friday-Sunday rates climb another 25-30 percent versus weekday. The NE monsoon arrives mid-to-late October — temperature relief is the bigger story than rainfall. Mid-October onward is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 10, 4, 'go',
  'Season opens. 24-30C, 250-350mm rain. NE monsoon arrives. French Quarter walks return mid-month.',
  'October is the season opener at Pondicherry. NE monsoon delivers 250-350mm but daytime drops to 24-30C — French Quarter walking weather returns mid-month. Cyclone watch begins.',
  NULL,
  'October in Pondicherry is the proper season opener. The northeast monsoon arrives in force from mid-month — rainfall jumps to 250-350mm across 11-13 wet days, but the temperature drop is dramatic. Daytime falls from late-September''s 31-32C to 24-30C, humidity 78 percent, sea breeze cool and reliable from noon. The French Quarter walking trip resumes its full shape from October 15 onward. Cyclone watch begins along the Coromandel coast — IMD monitors Bay of Bengal lows from October 1; Pondicherry has been on the path of several cyclones (Thane November 2011, Nivar November 2020 — Nivar landed at Cuddalore 30km south and brushed Pondicherry with heavy wind and rain). Diwali (variable Hindu calendar, around October 21, 2026) brings Chennai-Bangalore weekend traffic. The Promenade evening rotation returns to full capacity. Aurobindo Ashram, Manakula Vinayagar Temple, Auroville Matrimandir all at full hours. Hotel rates climb to 50-60 percent of December peak: Maison Perumal CGH ₹11-14k, Palais De Mahe ₹9-12k, La Maison Radha ₹5-7k, mid-tier guesthouses ₹3-4.5k. Strong call for first-time visitors who can tolerate occasional rain.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 11, 5, 'go',
  'High season. 22-29C, 300-400mm rain. Darshan Day Nov 24. Cyclone watch holds — Nivar hit Cuddalore Nov 25, 2020.',
  'November is full high season at Pondicherry. Rain still substantial (300-400mm) but mornings clean, French Quarter walks at full reach. Darshan Day (November 24 — Day of Siddhi 1926) cultural anchor.',
  NULL,
  'November in Pondicherry is the proper high-season month. The NE monsoon remains active (300-400mm across 12-14 wet days) but rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Aurobindo Ashram Darshan Day (November 24 — the 1926 Day of Siddhi, when Sri Aurobindo retired from public activity to focus on Integral Yoga) is one of four annual Darshan Days. The Ashram main building courtyard fills with disciples; the samadhi attracts steady floral offerings. Ashram-affiliated guesthouses book 6-8 weeks ahead. Cyclone watch holds — Cyclone Nivar landed at Cuddalore (30km south) on November 25, 2020, brushing Pondicherry with heavy wind and rain. IMD updates daily via mausam.imd.gov.in. French Quarter walks (Rue Romain Rolland, Rue Dumas, Rue Suffren) work at full reach 7am-6pm between showers. Hotel rates climb to 75-85 percent of December peak: Maison Perumal CGH ₹13-17k, Palais De Mahe ₹10-13k, La Maison Radha ₹6-9k. Auroville Matrimandir concentration-room visits 4-6 day lead time. Cafe des Arts, Baker Street, Le Cafe at full hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pondicherry', 12, 5, 'go',
  'Peak season. 21-28C, 150-200mm rain. Christmas-NYE rates 2-3x. Cyclone watch through Dec 20 historically.',
  'December is Pondicherry''s operational peak. Christmas-NYE (Dec 22-Jan 5) is the year''s major spike — rates run 2-3x normal. Cyclone watch holds through Dec 20. Lock French Quarter heritage hotels 8-10 weeks ahead.',
  NULL,
  'December in Pondicherry is the operational peak — the Christmas-NYE corridor is the city''s major annual spike, French Quarter heritage hotels at 100 percent occupancy and the Promenade evening a wall-to-wall slow-walk crowd. Daytime 22-28C, nights 20C, rain 150-200mm across 7-9 wet days, humidity 70 percent. Cyclone watch holds through December 20 — Vardah hit Chennai December 12, 2016; Michaung December 5, 2023. IMD updates daily. The Christmas-NYE corridor (Dec 22 to Jan 5) sees rates run 2-3x the November baseline: Maison Perumal CGH ₹18-25k, Palais De Mahe ₹14-18k, La Maison Radha ₹9-12k, mid-tier guesthouses ₹5-7k. Notre Dame des Anges and the Cathedral hold midnight mass on December 24; Sri Aurobindo Ashram remains open 8am-12pm + 2-6pm. The Promenade fireworks on December 31 fill Goubert Avenue from 6pm; the city issues road-closure advisories for White Town 6pm-2am. Pondicherry alcohol prices (state subsidy) draw Chennai-Bangalore weekend traffic year-round but the December surge is the year''s most intense. Lock heritage hotels 8-10 weeks ahead. The first three weeks (before Dec 22) are the better-value window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
