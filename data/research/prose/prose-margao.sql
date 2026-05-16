-- Margao (Madgaon) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: margao

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 1, 5, 'go',
  'Peak South Goa winter. 18-30C. Konkan Railway hub. Holy Spirit Church + Largo de Igreja walks comfortable.',
  'January is when Margao runs at its most coherent. Goa''s commercial capital and Konkan Railway hub stays cool dry, the Holy Spirit Church (1675) interior is at peak photogenic, the Confraria Heritage Walk through Sat Burnzam Ghor (Borges House) and the old Latin Quarter is at year-best comfort.',
  NULL,
  'Margao in January is the South Goa city that gets overlooked — and shouldn''t. Daytime 21-30C, nights drop to 18C, rainfall under 5mm. Goa''s commercial capital is the Konkan Railway hub for the state — the Madgaon Junction (KR1) station handles Mumbai-Madgaon Mandovi Express, Konkan Kanya Express, Mangalore-Madgaon shuttle, and the Goa Express to Vasco. Holy Spirit Church (1675 Portuguese baroque, the year''s second-oldest Goa church after Old Goa Sé Cathedral) on Largo de Igreja is at peak interior photogenic between 4-5:30pm; mass at 6:30am and 6pm Sunday. The Friday Market off Holy Spirit Square is the year-cleanest stretch for Goan kitchen kit (chouriço, recheado masala, balchão paste). Chef Fernando''s Nostalgia (Raia, 9km from city centre) holds tasting menus and books out 5-7 days ahead in January. Longuinhos (1950-founded, opposite Margao Municipal Garden) runs its 12pm-3pm Goan-thali lunch — fish curry rice ₹250-350. Stays: Taj Exotica Benaulim 9km, Hotel Mandovi at the Garden ₹4.5-8k, Zion Goa ₹3.5-6.5k, Nilaya Hermitage Sirdao 30km. Rivona Buddhist Caves (25km southeast) and Three Kings Church Cuelim (5km north) are the under-rated half-day spurs.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 2, 5, 'go',
  'Driest month. 19-31C. Carnival floats arrive 3 days before Ash Wed. Hotel rates ease 12 percent.',
  'February is the cleanest of the cool months. Carnival float parades land in Margao for 3 days before Ash Wednesday — the Largo de Igreja and Praca Dr Jorge Barreto squares are the parade route, draws 8,000-12,000 visitors per day. Hotel rates ease 12 percent versus January.',
  NULL,
  'February in Margao is the cleanest stretch and the year''s best heritage-walk window. Rainfall averages under 5mm, daytime 20-31C, humidity 60 percent. Goa Carnival float parades land in Margao for the 3 days before Ash Wednesday (date varies — check goa-tourism.com calendar) — the parade route runs from Praca Dr Jorge Barreto through Largo de Igreja, draws 8,000-12,000 visitors per day, and tightens the Margao hotel belt (Hotel Mandovi, Zion Goa) for the long weekend. The Holy Spirit Church 1675 facade catches a clean amber 5pm light. Chef Fernando''s Nostalgia at Raia (9km) is at year-best Goan-fusion menus; reservations 5-day lead. Longuinhos serves its full 1950s-era Goan-thali range; the rotating fish-curry plate (₹280) runs Tuesday-Saturday lunch. The Confraria Heritage Walk through the Latin Quarter and Sat Burnzam Ghor (Borges House, ₹100 entry, 10am-1pm Wed/Sat by appointment) is at year-best comfort. Three Kings Church Cuelim and Rivona Buddhist Caves spurs work as half-day add-ons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 4, 3, 'wait',
  'Pre-monsoon heat. 24-35C, humidity 75 percent. AC restaurants and indoor heritage carry the day.',
  'April still functions for the heritage-and-AC trip — Holy Spirit Church and Sat Burnzam Ghor stay cool, Chef Fernando''s and Longuinhos run full programmes, Konkan Railway hub at full operational tempo. Outdoor walks compress to 7-10am and post-5pm.',
  'April pushes Margao into pre-monsoon heat. Daytime 25-35C with humidity past 75 percent makes Largo de Igreja walks and the Latin Quarter heritage circuit unpleasant 11am-5pm. Better window October-March.',
  'April in Margao narrows the trip to indoor-and-AC. Daytime 25-35C, humidity 75 percent, the Latin Quarter heritage walks compress to 7-10am and post-5pm windows. The Holy Spirit Church interior (thick-wall Portuguese baroque) holds a steady 26-28C and is genuinely valuable mid-day. Chef Fernando''s Nostalgia and Longuinhos both run full AC menus. Sat Burnzam Ghor (the Borges House heritage walk, ₹100 entry) is at year-best appointment availability — Wednesday and Saturday 10am-1pm slots walk-in. Hotel rates drop 25-30 percent versus February: Hotel Mandovi from ₹6,500 to ₹4,500, Zion Goa from ₹5,000 to ₹3,500. The Konkan Railway hub continues full operations — Mumbai-Madgaon Mandovi Express westbound arrives 5:55am, eastbound departs 7am; Konkan Kanya overnight sleeper continues. Rivona Buddhist Caves at 25km southeast and Three Kings Cuelim at 5km north hold up as morning spurs only. Avoid 11am-5pm outdoor.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 3, 4, 'go',
  'Last cool window. 21-32C. Shigmo parades full-moon Phalgun. Hotel rates drop 20 percent.',
  'March extends the February experience minus the dry-air comfort. Shigmo (Hindu spring festival, full moon Phalgun) parades run a week through Margao mid-month — Quepem-Cuncolim-Margao route. Hotel rates drop 20 percent. Last clean window before April humidity.',
  NULL,
  'March in Margao is the soft-landing month. Daytime 23-32C, humidity climbing toward 75 percent in the last fortnight, sea-belt 7km out at 26C. Shigmo (Hindu spring festival on the full moon of Phalgun, mid-March variable) runs week-long parades through South Goa: the Quepem-Cuncolim-Margao route is the year''s biggest Hindu-Goa float-and-folk programme, draws 15,000-20,000 spectators across the week, runs evening-only after 6pm. Hotel rates drop 20-25 percent versus February: Hotel Mandovi at ₹5,000, Zion Goa at ₹4,000. Holy Spirit Church and the Latin Quarter heritage walks remain comfortable mornings; Largo de Igreja afternoon sit-and-watch is at year-best 5-6pm light. Chef Fernando''s Nostalgia and Longuinhos run weekday walk-in capacity. The Margao Municipal Market — open 6am-9pm except Sunday after 1pm — is at year-end-of-season vegetable peak (Goan red rice, kokum, jaggery, prawn-balchão jars from the Tuesday wholesale corner). Rivona Buddhist Caves spur is a morning-only call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 5, 2, 'wait',
  'Peak heat. 26-37C, humidity 80 percent. Pre-monsoon squalls late month. Indoor heritage only.',
  'May is when the city becomes an indoor trip. AC restaurants, Holy Spirit interior, Forum Mall carry the day. Konkan Railway hub continues at full operational tempo. Hotel rates at year-low.',
  'May runs hot and humid. Latin Quarter heritage walks unworkable 9am-6pm; pre-monsoon squalls from May 22 onward bring 30-50mm evening downpours and 2-4 hour grid power cuts. Konkan Railway works fine but the trip you came for compresses. Push to October.',
  'May in Margao is when the trip compresses to indoor-and-AC. Daytime 27-37C, humidity 80 percent, the Latin Quarter heritage circuit unwalkable 9am-6pm. Pre-monsoon squalls arrive May 22-28 with 30-50mm evening downpours and 2-4 hour grid power cuts that knock the older non-inverter hotel belt. The Konkan Railway hub continues full operations regardless — Mumbai-Madgaon Mandovi Express, Konkan Kanya, Goa Express to Vasco — making Margao the most weather-resilient base in Goa for an inland-only trip. Holy Spirit Church interior, Sat Burnzam Ghor on Wed/Sat appointment, Chef Fernando''s Nostalgia (closed Mon) and Longuinhos (closed Sun afternoon) all run full menus. Hotel Mandovi walk-in at ₹4,000, Zion Goa at ₹3,000. The Forum Mall and the AC-belt of new shopping centres handle mid-day shopping. The Margao Municipal Market is at year-end of season — most coastal-fish supply has dropped under monsoon trawler ban. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 6, 1, 'skip',
  'SW monsoon onset. 25-31C, 600-800mm rain. Streets flood, indoor only. Skip unless transit.',
  NULL,
  'June is when Margao floods. The southwest monsoon hits the Konkan coast around June 10; rainfall jumps to 600-800mm and the older town drainage cannot cope. Latin Quarter walks impossible. Hotel rates at year-low but the trip is hollow.',
  'June in Margao is the southwest monsoon arriving in force. Rainfall jumps to 600-800mm across 18-22 wet days from June 10 onward; the older town''s narrow drainage cannot cope and Bombay Bazaar, Comba Road, and the Largo de Igreja low corners flood after 60mm-plus events. Daytime 25-31C feels mild but the rain and 90 percent humidity make outdoor activity impossible. Holy Spirit Church (1675) stays open with daily mass; Sat Burnzam Ghor heritage appointments suspend on the wettest days. Chef Fernando''s Nostalgia (closed Mon) and Longuinhos (1950-founded) continue regardless — both have been operating through Goa monsoons for half a century. Konkan Railway hub continues full operations — the only weather-immune transport corridor on the Goa coast. Hotels at year-low — Mandovi at ₹3,500, Zion at ₹2,500. The Sao Joao feast (June 24) is a Catholic-village event up north (Siolim, Calangute) — Margao stays muted. The trip works only as a transit-and-stay, not a heritage walk.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Town floods, 90 percent humidity. Skip.',
  NULL,
  'July is the wettest month — 900-1100mm rain, low-corner flooding routine, 90 percent humidity. Heritage walks impossible. Konkan Railway runs but the trip itself is hollow. Wait for October.',
  'July in Margao is the year''s wettest stretch. Rainfall averages 900-1100mm across 25-27 wet days. The older town centre — Comba Road, Largo de Igreja low corners, Bombay Bazaar — floods after 80mm-plus events; on the worst weeks (3-4 days a month) some lanes are passable only by bicycle-rickshaw. Daytime 24-29C feels mild but humidity at 90-95 percent makes outdoor heritage walks impossible. Holy Spirit Church mass continues; the church itself takes 200-250 worshippers Sunday rather than peak-month 800-1,000. Sat Burnzam Ghor heritage appointments mostly suspend. Chef Fernando''s and Longuinhos run as usual — both establishments have been operating through Goa monsoons for decades and continue regardless. The Konkan Railway hub is unaffected — Mumbai-Madgaon Mandovi Express, Konkan Kanya, Goa Express continue full timetable. Hotels at year-low. The trip you came for cannot work; the train hub is the only useful aspect of Margao in July.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 700-900mm rain. Town wet, heritage walks impossible. Skip.',
  NULL,
  'August holds July''s pattern with marginally fewer extreme-rain days. Town still floods on heaviest 3-4 days; heritage walks impossible. Konkan Railway holds full operations. Independence Day brings a 3-day domestic surge to Goa generally but Margao stays muted. Wait for October.',
  'August in Margao holds July''s monsoon pattern. Rainfall 700-900mm across 22-25 wet days. The Comba Road and Largo de Igreja low corners flood after 80mm-plus events on 3-4 worst days. Daytime 24-29C, humidity 90 percent, outdoor heritage circuit impossible to sustain. Holy Spirit Church mass continues; Sat Burnzam Ghor heritage appointments resume in part the second half. Chef Fernando''s Nostalgia and Longuinhos run regardless — both have been operating through Goa monsoons for decades. Konkan Railway hub continues at full operational tempo. Independence Day weekend (August 15-17) sends a Mumbai-domestic surge to North Goa''s Calangute-Baga and the alcohol-licensed bar belt — Margao itself stays muted. Bonderam (Divar Island flag festival, 4th Saturday August) is a 30km hop north via Old Goa ferry; workable as a single-day spur if August dates are immovable. Wait for October — same heritage walks at full comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 9, 3, 'wait',
  'Recovery month. 25-30C, 300-400mm rain easing. Heritage walks return mid-month.',
  'September is the trickle back. Rainfall halves versus August, the southwest monsoon retreats from the Konkan coast by mid-month, the Latin Quarter heritage walks become workable from week three. Hotel rates at year-low.',
  'Early September is still rain-heavy. Town still floods on the worst days first fortnight. Workable for a low-pressure city-only stay; full reopening of the heritage walk circuit and reliable beach-day-trips is October.',
  'September in Margao is recovery month. Rainfall drops to 300-400mm across 14-16 wet days, mostly the first fortnight. Daytime 26-30C, humidity easing toward 80 percent, the Latin Quarter heritage walk circuit becomes workable from week three. The southwest monsoon retreats from the Konkan coast around September 20-25. Holy Spirit Church mass returns to year-norm crowds in the last 10 days. Sat Burnzam Ghor heritage appointments resume Wed/Sat 10am-1pm. Chef Fernando''s Nostalgia and Longuinhos at full tempo throughout. Hotel rates sit at year-low for the first 20 days of September: Hotel Mandovi at ₹3,500, Zion Goa at ₹2,800, Nilaya Hermitage at ₹6,500. Konkan Railway hub at full operational tempo as always. The Pitru Paksha period (variable, mid-September) tempers Indian-domestic-tourist demand. Workable for a low-pressure heritage and Konkan-railway-base trip; October dramatically cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 10, 4, 'go',
  'Season opens. 23-31C, 100-150mm rain. Heritage walks dry by mid-month. Hotel rates 30 percent below Dec.',
  'October is when Margao returns to coherent. Rainfall drops to 100-150mm, mostly the first 10 days. Heritage walks fully workable by mid-month. Hotel rates 30 percent below December peak. Diwali long weekend brings 3-day domestic bump.',
  NULL,
  'October in Margao is when the South Goa city returns to full heritage-walk tempo. Rainfall 100-150mm — mostly first 10 days — and daytime 24-31C with humidity falling to 75 percent. The Latin Quarter heritage circuit (Sat Burnzam Ghor on Wed/Sat appointment, Confraria Walk via Praca Dr Jorge Barreto, Holy Spirit Church 1675) becomes fully workable by October 12-15. The Margao Municipal Market is back at full vegetable-and-fish supply post-monsoon trawler ban (lifted September 1 for Goa). Chef Fernando''s Nostalgia and Longuinhos run full evening service. Konkan Railway hub is at full operational tempo as always. Hotel rates: Hotel Mandovi at ₹4,500-5,500 (versus ₹6,500-7,500 December), Zion Goa at ₹3,500-4,500, Nilaya Hermitage at ₹6,500-8,000, Taj Exotica Benaulim 9km away at ₹26,000. Diwali long weekend (variable, usually mid-October to early November) brings a 3-5 day domestic bump and a 25 percent rate climb. The first three weeks of October are the smart traveller''s window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 11, 5, 'go',
  'Peak builds. 20-29C, dry. Heritage walks at year-best comfort. Hotel rates climb 20 percent.',
  'November is the proper return to high season. Rainfall under 30mm, daytime 20-29C, the Latin Quarter heritage circuit at year-best comfort. Hotel rates climb 20 percent across the month as Christmas-week travellers begin booking.',
  NULL,
  'November in Margao is the year''s second-cleanest month. Daytime 22-29C, nights drop to 20-21C, rainfall under 30mm and almost all in the first week. The Latin Quarter heritage walks are at year-best comfort: Holy Spirit Church (1675) interior at peak photogenic 4-5:30pm, Sat Burnzam Ghor Wed/Sat 10am-1pm appointments fill 5-7 days ahead, Confraria Heritage Walk Tuesday-Friday morning runs (₹500-800 per person) hold full schedules. Margao Municipal Market is at peak fish-supply with full Salcete-coast trawler returns. Chef Fernando''s Nostalgia at Raia (9km) books out 5-day lead through the month. Longuinhos at full lunch tempo. Konkan Railway hub at full operational tempo. Hotel rates climb 20 percent across the month: Hotel Mandovi from ₹5,500 (Nov 1) to ₹7,000 (Nov 30), Zion Goa from ₹4,000 to ₹5,500. Three Kings Church Cuelim (5km) and Rivona Buddhist Caves (25km) spurs at year-best comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('margao', 12, 5, 'go',
  'Peak season. 18-29C, dry. Christmas Eve mass at Holy Spirit. Hotel rates 35-45 percent above November.',
  'December is operational peak. Christmas Eve mass at Holy Spirit Church draws 4,000-6,000 worshippers. Christmas-NY week (Dec 22-Jan 5) drives hotel rates 35-45 percent above November. Goa Liberation Day (Dec 19) parade in Panaji draws Margao political-tourist mix.',
  NULL,
  'December in Margao is the year''s most reliable city-base window. Daytime 20-29C, nights drop to 18C, rainfall under 20mm. Christmas Eve at Holy Spirit Church (1675) draws 4,000-6,000 worshippers across the midnight mass and the early-morning service; the Largo de Igreja square fills 11pm onward December 24. Christmas-NY week (December 22 to January 5) drives hotel rates 35-45 percent above November: Hotel Mandovi from ₹7,000 to ₹10,000, Zion Goa from ₹5,500 to ₹8,000, Nilaya Hermitage from ₹8,000 to ₹12,000-14,000. Taj Exotica Benaulim 9km away hits ₹65,000+ peak Christmas week. Chef Fernando''s Nostalgia books 7-10 days ahead. Goa Liberation Day (December 19) brings a state-government parade in Panaji that draws political-tourism overflow into Margao for the long weekend. The Konkan Railway hub runs its heaviest annual passenger load December 23-26 and December 30-January 1 — Mandovi Express, Konkan Kanya, Goa Express all sell out 14-21 days ahead. Lock dates pre-December 20 if budget matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
