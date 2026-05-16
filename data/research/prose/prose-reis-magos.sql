-- Reis Magos Fort destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa heritage batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: reis-magos
-- best_months 10-5 (BROAD), avoid 7-8 ONLY

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 1, 5, 'go',
  'Peak window. 19-30C, dry. Fort fully open 9:30-17:00, closed Mondays. Mandovi sunset views at the rampart.',
  'January is when Reis Magos Fort runs at its most coherent. The 1551 Portuguese fort — restored 2008-2012 by INTACH and the Helen Hamlyn Trust — opens 9:30am-5pm Tuesday-Sunday, ₹50 entry. The Church of Three Kings on the same hilltop holds the best-preserved Portuguese frescoes in Goa.',
  NULL,
  'Reis Magos Fort in January is the version restoration architects argue is India''s best heritage adaptive-reuse project. Daytime 21-30C, nights 19-20C, humidity finally below 70 percent. The fort opens 9:30am-5pm Tuesday-Sunday (closed Mondays), ₹50 entry, an exhibitions schedule built around Serendipity Arts Festival programming. The 1551 Portuguese build sits on a laterite spur above the Mandovi estuary, looking directly across at Panaji 800m south on the opposite bank. The Helen Hamlyn Trust + INTACH + Goa Government restoration (2008-2012) replaced rotted timber, restabilised laterite walls, and converted the cellblocks into the Mario Miranda permanent gallery. The Church of Three Kings (Reis Magos), 200m east on the same hilltop, holds the best-preserved Portuguese frescoes in Goa — a 16th-17th century cycle that survived the 1812 anti-Jesuit purge intact. Access from Panaji: 5-minute Verem ferry (Goa Tourism, ₹10), or 15-minute drive via the Mandovi bridges. The rampart catches the year''s cleanest 5pm Mandovi sunset.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 2, 5, 'go',
  'Driest stretch. 20-31C. Fort programming runs full slate. Serendipity Arts tail-end early month.',
  'February is when the rampart walks run cleanest. Rainfall under 5mm, low humidity, daytime 22-31C. Serendipity Arts Festival (December) tail-end exhibitions sometimes extend into early February at the fort galleries. Reis Magos Heritage Homestay rates hold at January peak.',
  NULL,
  'February in Reis Magos Fort is technically the cleanest month. Rainfall averages under 5mm, humidity 60 percent, daytime 22-31C. The fort opens 9:30am-5pm Tuesday-Sunday, and the gallery programming — Mario Miranda permanent, plus rotating contemporary exhibits curated by the Helen Hamlyn Trust + Goa Tourism — runs full slate. Serendipity Arts Festival (December) tail-end exhibitions sometimes extend into the first 10 days of February. The rampart walking circuit — 79-cannon original layout, now reduced to 5 mounted reproduction pieces along the seaward wall — takes 90 minutes at a deliberate pace. The Church of Three Kings on the hilltop holds the year''s most photogenic Portuguese fresco light between 3:30pm and 4:45pm. Reis Magos Heritage Homestay (₹2.5-5k, 8 rooms in a 19th-century manor house 200m below the fort entrance) takes 2-3 day lead bookings; Fort Aguada Beach Resort across the Sinquerim bay (₹15-25k) is the upper-tier alternative. Verem ferry from Panaji at 5-minute intervals, ₹10.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 3, 4, 'go',
  'Last cool window. 22-32C. Fort runs full hours. Hotel rates ease 20 percent.',
  'March extends February''s heritage walking with rising humidity. The fort''s laterite ramparts hold up till mid-day; the church frescoes catch warm 4-5pm light. Rates at Reis Magos Heritage Homestay drop 20 percent versus February peak.',
  NULL,
  'March in Reis Magos is the soft-landing month. Daytime 23-32C, humidity climbing toward 70 percent in the last fortnight, evenings still in the 22-24C band. The fort opens 9:30am-5pm Tuesday-Sunday at ₹50 entry; the Church of Three Kings remains free-access on the hilltop. Visitor numbers drop 30 percent versus February peak — guided tours by the Goa Tourism cultural-trail desk (₹400 for 90 minutes covering fort and church) are walk-up bookable. The laterite-stepped path from Verem ferry pier to the fort (1km, 20-minute climb) is comfortable till 11am. Reis Magos Heritage Homestay rates drop to ₹2.2-4k. Panjim Pousada (5-minute ferry across the Mandovi) at ₹4-5.5k. Mandovi sunset views from the rampart catch the year''s best balance of warm light and cool air through to month-end. Last comfortable window for the laterite climb before April pushes the trip into time-shift mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 4, 3, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Fort interior cool but rampart walk hot. Time-shift to morning/evening.',
  'April still works for the heritage traveler willing to time-shift — fort gallery interiors are cool, the church frescoes sit indoors, and the rampart walks compress to 9:30-11am and 4-5pm. Hotel rates drop 30 percent.',
  'April delivers the first wave of Konkan summer. The 1km laterite-stepped climb from Verem ferry to the fort gate becomes brutal past 10am, the open ramparts radiate heat, and the rampart-walk shape of the visit collapses 11am-4pm. Indoor galleries hold up.',
  'April in Reis Magos Fort is when the visit narrows to its early and late windows. Daytime 26-34C, humidity 75-80 percent, the laterite ramparts above the Mandovi turn into heat traps from 11am to 4pm. The fort''s cellblock galleries — the Mario Miranda permanent, the rotating contemporary space — hold cool laterite-walled interiors throughout the day. The Church of Three Kings frescoes sit indoors and catch their best light in the cool 4-5pm window. The 1km stepped climb from Verem ferry pier becomes a sunrise-only proposition. Smart shape: 9:30-11am for fort galleries and rampart walk, then retreat to AC at Reis Magos Heritage Homestay or cross to Panaji for Panjim Pousada (₹3-5k), then 4-5pm for the Church of Three Kings frescoes and rampart sunset. Hotel rates drop 30 percent versus February peak. The fort canteen runs 10am-4:30pm with bottled water at ₹25 and basic vegetarian meals at ₹150-200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 5, 3, 'wait',
  'Peak heat. 27-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Fort galleries remain cool inside.',
  'May still functions for the gallery-and-frescoes traveler willing to skip the rampart walks. Indoor laterite-walled spaces hold cool, the church frescoes are unaffected by heat. Hotel rates at year-low; visit shape compresses to 9:30am-11am only.',
  'May runs hot and sticky. The 1km Verem ferry-to-fort climb is unworkable past 10am, the rampart walks collapse, pre-monsoon thunderstorms knock power 1-3 hours each afternoon. The Mario Miranda gallery and church frescoes are the only viable stops, and even those work only as morning visits.',
  'May in Reis Magos Fort is the year''s hardest month for the rampart-and-laterite-walking part of the visit. Daytime 28-36C, humidity 80 percent, pre-monsoon thunderstorms hit 2-3 afternoons a week from May 20 onwards. The 1km laterite-stepped climb from Verem ferry pier to the fort entrance is unviable past 10am — the laterite radiates heat past 5pm. The fort galleries (Mario Miranda permanent, rotating contemporary) hold their year-round 26-28C laterite-buffered interiors, and the Church of Three Kings frescoes sit indoors with stone temperature buffer. The rampart walk and Mandovi sunset view from the seaward wall — the trip''s defining moments — collapse from 11am to 4pm. Hotel rates run at year-low: Reis Magos Heritage Homestay at ₹2-3.5k, Panjim Pousada at ₹3-4.5k. Visit shape compresses to a single 9:30-11am window. Push to October for the full experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 6, 2, 'wait',
  'SW monsoon arrives ~Jun 10. 24-30C, 700-900mm rain. Rampart walks unviable. Galleries and frescoes hold up.',
  'June trades heat for rain. Fort galleries and Church of Three Kings frescoes remain accessible — laterite walls hold up, roofs were the centerpiece of the 2008-2012 restoration. Rampart walks collapse. Worth it for the indoor-gallery-only traveler willing to plan around rain windows.',
  'June is when the southwest monsoon hits the Konkan in force. The 1km laterite-stepped climb from Verem ferry floods on storm days, ferry services cancel on rough water, and the open rampart walk — the trip''s defining moment — is unviable. Galleries and church remain open but the visit shape breaks.',
  'June in Reis Magos Fort is when the southwest monsoon arrives — typically June 10 — and the rampart-and-walking shape of the visit collapses. Daytime drops to 24-30C, but rainfall hits 700-900mm across 22-25 wet days. The fort galleries (Mario Miranda permanent, rotating contemporary) and Church of Three Kings frescoes remain open and accessible — the 2008-2012 Helen Hamlyn Trust + INTACH restoration centred on roof and gutter waterproofing, and four monsoon seasons in have proven the work. The laterite-stepped climb from Verem ferry pier floods on heavy days, and Goa Tourism cancels Verem ferry on rough-water afternoons (typically 30-40 percent of June afternoons). Hotel rates at year-low: Reis Magos Heritage Homestay at ₹1.8-3k, Fort Aguada Beach Resort at ₹8-15k. Visit shape narrows to a Tuesday-Thursday morning window inside the gallery and church only. Carry a poncho rather than an umbrella; Konkan crosswinds make umbrellas useless on the rampart approach.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 7, 1, 'skip',
  'Heaviest monsoon. 24-29C, 800-1100mm rain. Verem ferry suspended on rough water. Skip.',
  NULL,
  'July is the wettest month at the Konkan coast. The 1km laterite climb floods, Verem ferry cancels 50 percent of afternoons, rampart walks unviable. The fort galleries remain open but the trip you came for cannot happen. Wait for October.',
  'July in Reis Magos Fort is the deepest of the Konkan monsoon. Rainfall averages 1,000mm across 26-28 wet days, daytime 24-29C, humidity at 92 percent. The laterite-stepped climb from Verem ferry pier to the fort entrance — 1km, 20 minutes in dry conditions — turns into a stream of rust-coloured runoff on storm days. Goa Tourism cancels Verem ferry services on roughly half of July afternoons; the alternative is the 15-minute drive via the Mandovi bridges (₹400-500 by auto from Panaji). The fort galleries and Church of Three Kings frescoes remain open Tuesday-Sunday 9:30am-5pm — the Helen Hamlyn Trust restoration roofs and gutters hold up. But the rampart walks, Mandovi-view sunset moments, and full hilltop loop that justify the trip cannot happen. Hotel rates at year-low (50 percent below February peak), but the experience is shut. October-November is the next coherent window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Rampart walks unviable. Skip.',
  NULL,
  'August holds July''s pattern with marginally fewer extreme-rain days. The 1km laterite climb still floods, Verem ferry cancellations continue, rampart walks collapse. The fort galleries remain open but the visit shape breaks. Wait for late September.',
  'August in Reis Magos Fort is more of July with slightly fewer extreme-rain days. Rainfall 600-800mm across 23-25 wet days. Daytime 24-29C, humidity at 90 percent. The laterite-stepped Verem ferry-to-fort climb still floods on storm days, and Verem ferry services run a thinned timetable through the month. Ganesh Chaturthi (variable date, 11-day Hindu festival) shifts local attention to Mangueshi and Shantadurga temples 40km south in Ponda; Reis Magos sees its quietest visitor numbers of the year. The Bonderam flag-festival on Divar Island (4th Saturday of August), 30 minutes by ferry from Verem via the Old Goa jetty, is the one regional draw worth a wet-weather visit. Hotel rates at Reis Magos Heritage Homestay drop to ₹1.8-3k. Fort galleries open Tuesday-Sunday 9:30am-5pm but the rampart-and-frescoes loop the trip is built around does not function. Late September delivers a coherent return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 9, 3, 'wait',
  'Monsoon withdrawing. 24-30C, 250-350mm rain. Verem ferry returns to full schedule by Sep 25. Rampart walks back online last week.',
  'September is the trickle back to walkable. Konkan monsoon withdraws around September 25-30; the laterite climb from Verem ferry dries within a week. Workable for the last week if dates flex.',
  'Early September is still rain-heavy. The 1km laterite ferry-to-fort climb remains slippery, and rampart walks are hit-or-miss with afternoon downpours. If your dates are in the first fortnight, push to mid-October.',
  'September in Reis Magos Fort is the recovery month. Rainfall halves versus August to 250-350mm, mostly first half. By September 25-30 the southwest monsoon withdraws from the Konkan, the Verem ferry returns to its full 5-minute interval schedule from Panaji, and the laterite-stepped climb to the fort entrance dries out within a week. Daytime 25-30C, humidity easing to 75 percent. Visitor numbers in the last week climb to 60 percent of October levels. Reis Magos Heritage Homestay rates at ₹2-3.5k, Panjim Pousada at ₹3.5-5k, Fort Aguada Beach Resort at ₹10-15k — all sit 50 percent below February peak for the first 20 days, climbing 15-20 percent in the last week. Goa Tourism cultural-trail guided tours (₹400 for 90 minutes covering fort and church) restart from September 22. The smart traveler''s window: September 25 to October 5 — fort at year-best green surroundings, before the October-Diwali rush.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 10, 4, 'go',
  'Season opens. 23-31C, post-monsoon green, 100-150mm light rain. Fort fully open. Rampart walks back.',
  'October is the proper season-opener for Reis Magos. Konkan dries out, Verem ferry runs full schedule, laterite climb is firm-footed. Hotel rates 25-30 percent below January peak. Diwali week brings a 5-day domestic-tourist bump.',
  NULL,
  'October in Reis Magos Fort is when the heritage complex returns to full coherence. Rainfall 100-150mm — almost all in the first 10 days as the monsoon retreats — and daytime 24-31C, humidity falling toward 75 percent. The fort opens 9:30am-5pm Tuesday-Sunday at ₹50 entry; the Church of Three Kings on the hilltop remains free-access. Verem ferry runs its full 5-minute interval schedule from Panaji jetty (₹10). The 1km laterite-stepped climb is firm-footed, surrounding scrub at year-deepest green, and the rampart walk catches the year''s cleanest air-quality views across the Mandovi to Panaji. Visitor numbers are 50-60 percent of December peak; Goa Tourism cultural-trail guides (₹400, 90 minutes) are walk-up bookable. Hotel rates at Reis Magos Heritage Homestay (₹2.5-4.5k), Panjim Pousada (₹4-6k), Fort Aguada Beach Resort (₹10-18k) sit 25-30 percent below January peak. Diwali week (variable date) brings a 5-day domestic-tourist bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 11, 5, 'go',
  'Peak builds. 21-30C, dry. Serendipity Arts programming late month. Hotel rates climb steadily.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, days at 30C, walking conditions ideal. Serendipity Arts Festival programming begins late November and turns the fort galleries into a major contemporary-art venue through December.',
  NULL,
  'November in Reis Magos Fort is the year''s second-peak month behind January. Rainfall under 50mm with most of it in the first week. Daytime 23-30C, nights 21C, humidity dropping under 70 percent. Visitor numbers climb steadily — by mid-month the fort sees 600-800 daily visitors versus October''s 300-500. The standout calendar entry: Serendipity Arts Festival, India''s largest multi-disciplinary arts festival, runs in Panaji and Old Goa from mid-December but November is its build-up — installation crews work through the fort galleries, exhibition previews open from November 25, and the rotating contemporary-art programming peaks for the festival proper. Reis Magos Heritage Homestay rates climb to ₹3-5k, Fort Aguada Beach Resort to ₹13-22k. Mandovi-rampart sunset views catch the year''s clearest 5pm air. The Church of Three Kings fresco light is at its best 3:30-4:45pm. Strong call for the traveler who wants peak weather without December''s Christmas-NY congestion.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('reis-magos', 12, 5, 'go',
  'Peak peak. 19-30C, dry. Serendipity Arts festival 9-day run. Christmas-NY rates 3x. Goa Liberation Day Dec 19.',
  'December is the operational peak. Serendipity Arts Festival runs 9 days mid-month and turns the fort into a major contemporary-art venue. Christmas-NY (December 22-January 5) is gridlock — Verem ferry queues stretch, hotel rates triple. Book 4-6 weeks ahead.',
  NULL,
  'December in Reis Magos Fort is shaped by Serendipity Arts Festival — India''s largest multi-disciplinary arts festival, mid-December dates, 9 days of installations, performances, talks across Panaji, Old Goa, and the fort galleries themselves. Daytime 22-30C, nights 19C, rainfall under 30mm. The fort runs extended hours during the festival: 9am-9pm with evening performance ticketing through Goa Tourism. Outside festival days, regular 9:30am-5pm Tuesday-Sunday hours. Goa Liberation Day (December 19, public holiday) brings a parade in Panaji, fort visit numbers thin that day. Christmas-NY (December 22-January 5) is gridlock: Reis Magos Heritage Homestay climbs to ₹6-10k, Fort Aguada Beach Resort to ₹22-35k, Verem ferry queues stretch to 30 minutes at peak hours. The Church of Three Kings hosts a Christmas Eve carol service at 8pm and a December 25 dawn Mass at 6:30am — non-Catholic visitors welcome but hilltop parking is limited to 40 cars. Carry a torch for the post-sunset descent to Verem ferry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
