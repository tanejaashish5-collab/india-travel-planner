-- Assagao destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: assagao (INLAND — Portuguese-villa restaurant village, 3km to Anjuna beach)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 1, 5, 'go',
  'Peak Konkan winter. 20-30C, dry. Restaurant village at full capacity. Gunpowder, Bomras, Vinayak fish thali all booked 3-5 days out.',
  'January is when Assagao runs at its tightest. The restaurant-led village (Gunpowder, Bomras, Vinayak, Sublime, Mojigao) has booking lead times of 3-5 days for prime tables. Inland location keeps temperatures 1-2C cooler than Anjuna and less wind-buffeted; restored Portuguese villas are the hospitality form here.',
  NULL,
  'Assagao in January is when the restored-Portuguese-villa village runs at its most coherent. Daytime 20-30C, nights drop to 18-20C — 1-2C cooler than the coastal belt 3km west. Gunpowder (the Andhra-coastal kitchen on St Cajetan Road, since 2010) wants 3-5 day booking lead for dinner; same goes for Bomras (Burmese-modern, since 2007), Sublime, and Mojigao. Vinayak Family Restaurant (the Goan fish thali institution near Anjuna-Assagao crossroads) takes no bookings — arrive by 12:30pm or 7:30pm before the 2-hour wait kicks in. Avo''s Kitchen and Ciao Bella round out the choice. Nilaya Hermitage (₹25-45k, the boutique anchor since 1998) holds peak rates from the third week of December through January 5, then eases. Assagao Brewing Company Rooms (₹5-9k), Pousada Tauma (₹3.5-7k) and Naka Cove Tree House (₹8-14k) are the under-₹15k slots. NomadGao coliving runs its full January cohort. Anjuna beach is a 3km scooter ride; the village stays calm and tree-shaded.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 2, 5, 'go',
  'Driest month. 21-31C. Restaurant village at peak. Carnival reaches Mapusa (5km) on the Monday parade.',
  'February is Assagao''s cleanest weather window. Rainfall under 5mm, low humidity, restaurant village at peak booking demand. Carnival float parade reaches Mapusa (5km, 10 minutes by scooter) on the Monday — closer than Panaji.',
  NULL,
  'February in Assagao runs as the year''s most tightly-booked stretch. Rainfall under 5mm, daytime 21-31C, humidity at 60 percent. Gunpowder, Bomras, and Sublime push booking lead to 5-7 days for prime weekend tables; Vinayak fish thali stays walk-in but the queue at peak hours hits 90 minutes. Carnival float parade (Goa Tourism organises) reaches Mapusa on the festival Monday — 5km from Assagao, 10 minutes by scooter, the closest of the four parade towns. Nilaya Hermitage holds at ₹35-45k peak; Naka Cove Tree House at ₹12-14k; Assagao Brewing Co Rooms at ₹8-9k. NomadGao coliving runs at full capacity — long-stay digital workers from Mumbai-Bangalore-Berlin form the off-restaurant scene. Saturday Night Market at Arpora (4km, 10 minutes by scooter) runs 6pm-late November-April. The St Cajetan Road restaurant strip stays the village''s axis; Sublime''s wood-fired patio fills 7-10pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 3, 4, 'go',
  'Last cool window. 22-32C. Booking lead times relax to 2-3 days. Hotel rates slide 15-20 percent.',
  'March extends February''s weather. Restaurant booking lead times relax to 2-3 days, hotel rates slide 15-20 percent versus February peak. Last comfortable month before April humidity arrives.',
  NULL,
  'March in Assagao is the soft-landing month. Daytime 23-32C, humidity climbing toward 70 percent in the last week, but the inland tree canopy keeps the village 1-2C cooler than Anjuna. Restaurant booking lead times relax to 2-3 days at Gunpowder, Bomras, and Sublime; Vinayak fish thali queue drops to 30-45 minutes. Nilaya Hermitage drops walk-in rate from ₹40k+ February peak to ₹28-32k; Naka Cove Tree House from ₹13k to ₹10k; Assagao Brewing Co Rooms from ₹8.5k to ₹6.5k. Saturday Night Market at Arpora runs through April 30. NomadGao coliving has rolling occupancy through March; first cohort departures mid-month free up rooms. The Anjuna Wednesday Flea Market (3km, 8-minute scooter) still draws 4,000-5,000 visitors. Last comfortable window before pre-monsoon humidity collapses outdoor evening dining in April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 4, 3, 'wait',
  'Pre-monsoon heat. 24-34C, humidity 75 percent. Restaurants hold but evening AC required.',
  'April still works for restaurant-led trips with strong AC accommodation. The village''s tree canopy and inland position help versus coastal heat. Hotel rates drop 25-30 percent. Indoor dining at Gunpowder/Bomras stays comfortable; outdoor patios less so.',
  'April pushes Assagao into pre-monsoon heat. Outdoor dining patios uncomfortable past 7pm, daytime walks collapse mid-day. Anjuna shacks running till May 31 but flea market scaled-down. Wait for late October if comfort matters.',
  'April in Assagao narrows to indoor restaurant evenings and AC accommodation. Daytime 25-34C, humidity 75 percent; the village''s tree canopy and inland position run 1-2C cooler than Anjuna-Vagator but the broader trip — Saturday Night Market patio, outdoor villa dinners, mid-day walks — collapses. Restaurants stay open: Gunpowder, Bomras, Sublime, Mojigao all hold full hours but indoor AC tables are the only comfortable option past 7pm. Vinayak fish thali queue drops to 15-20 minutes. Nilaya Hermitage walks-in at ₹22-28k; Pousada Tauma (₹3-5k) and Assagao Brewing Co Rooms (₹5-6k) become the better value plays. NomadGao coliving runs at 60-70 percent occupancy; long-stay residents start shipping out before May. Anjuna shacks open till May 31 but flea market down to under 200 stalls. Saturday Night Market at Arpora still operates through April. Strong AC, strong booking discipline — the trip works.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 5, 2, 'wait',
  'Peak heat. 26-35C, humidity 80 percent. Many restaurants on shorter hours. Pre-monsoon thunder weeks 3-4.',
  'May is when the Assagao restaurant village runs lighter. Many kitchens trim hours or close mid-month for monsoon prep. Pre-monsoon thunder hits last 10 days. Hotel rates at year-low.',
  'May runs hot and humid. Several Assagao restaurants close late-May for monsoon (Bomras till August, Edible Archives at Anjuna closes May 25). Saturday Night Market closes April 30. The dining-led trip thins out.',
  'May in Assagao is the closing month before monsoon shutters parts of the restaurant village. Daytime 27-35C, humidity 80 percent. Bomras closes May 25 to mid-August every year; Edible Archives (Anjuna, 3km) closes May 25 too. Sublime, Gunpowder, Mojigao, Avo''s Kitchen, Ciao Bella stay open year-round but trim service hours. Vinayak fish thali holds full hours. Saturday Night Market at Arpora closed since April 30. Pre-monsoon thunderstorms hit weeks three and four — 30-90 minute squalls, 2-4 hour grid power cuts. Nilaya Hermitage at ₹15-20k; Naka Cove Tree House at ₹8-9k; Assagao Brewing Co Rooms at ₹4.5-5k. NomadGao coliving runs at 30-40 percent. Anjuna shacks dismantle May 31. The village stays open and the inland canopy moderates the heat versus the coast, but the dining-led trip you came for is winding down. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 6, 2, 'wait',
  'SW monsoon arrives. 24-30C, 700-800mm rain. Bomras + 2-3 others closed. Inland resilience — village still functions.',
  'June is monsoon proper but Assagao''s inland village position holds up better than coastal Anjuna. Some restaurants closed (Bomras till August), but Gunpowder, Sublime, Mojigao, Vinayak run year-round. Trip works as a rainy-restaurant-villa weekend.',
  'June dumps 700-800mm of rain on the Konkan coast. Bomras closed May 25 to mid-August. Anjuna beach 3km away unusable, shacks all closed. The dining-villa trip works as a rainy-restaurant-villa weekend but the broader Goa experience (beach, flea market, sunset) is closed.',
  'June in Assagao runs lighter than the Anjuna coastal trip but more functional than most of beach Goa. The southwest monsoon arrives around June 10 and dumps 700-800mm across 22-25 wet days, but the inland villa-canopy village is sheltered from the worst onshore winds and the dining axis (Gunpowder, Sublime, Mojigao, Avo''s Kitchen, Ciao Bella, Vinayak) runs year-round. Bomras stays closed May 25 to mid-August; Edible Archives at Anjuna stays closed for the season. Daytime 24-30C, humidity 90 percent, the air is cool and wet rather than oppressive. Nilaya Hermitage at ₹10-15k from a peak of ₹40k+; Naka Cove Tree House at ₹6-8k. NomadGao coliving holds long-stay residents through monsoon at 25-30 percent occupancy. Anjuna beach 3km west is unusable, shacks all closed. Trip works as a rainy-restaurant-villa weekend if Goa-coast access isn''t the priority.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Most restaurant traffic dead. Skip.',
  NULL,
  'July is the wettest month at Assagao. Bomras still closed, Anjuna beach unusable, Saturday Night Market suspended. Restaurant village functions but at 20-25 percent normal traffic. Wait for October.',
  'July in Assagao is the deepest off-season for the restaurant village. Rainfall hits 900-1100mm across 26-28 wet days. Bomras closed May 25 to mid-August. Edible Archives closed for the season. Gunpowder, Sublime, Mojigao, Avo''s Kitchen, Ciao Bella stay open but run at 20-25 percent of January traffic — service is languid, kitchens are working through monsoon-supply quirks (Goan fish supply restricts during the spawning ban June 1 to July 31). Vinayak fish thali switches to fewer fish varieties and drops 1-2 dishes from the menu. Nilaya Hermitage at ₹8-12k; Pousada Tauma at ₹2-3k. NomadGao coliving at 20-25 percent. Anjuna beach 3km west is closed for swimming, all shacks dismantled, flea market suspended. The trip works only for digital workers on long-stay rotation; short-stay restaurant pilgrims should wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 8, 2, 'wait',
  'Monsoon eases late-month. 24-29C, 500-700mm rain. Bomras reopens mid-August. Restaurant village rebuilds.',
  'August sees the Assagao restaurant village start to rebuild. Bomras reopens around August 15. Goan fish supply returns August 1 (spawning ban ends). Hotel rates 60 percent below peak.',
  'August still drops 500-700mm of rain. Anjuna beach 3km west still closed for swimming. Bomras reopen but full village rhythm doesn''t return until October. Inland-only trip if you can''t wait.',
  'August in Assagao is when the restaurant village starts coming back to life. Bomras reopens around August 15 after its 80-day monsoon shutdown. The Goan fish-spawning ban ends August 1, restoring the supply mainstay for Vinayak, Sublime, and the village''s seafood kitchens. Rainfall still 500-700mm across 22-24 wet days; daytime 24-29C, humidity 85 percent. Saturday Night Market remains closed. Anjuna beach 3km west still under swimming advisory. Ganesh Chaturthi (variable date, late August or early September) shuts the village for 2-3 days. NomadGao coliving picks up to 35-40 percent occupancy as the new long-stay quarter opens. Nilaya Hermitage at ₹10-14k; Naka Cove Tree House at ₹7-8k; Assagao Brewing Co Rooms at ₹4.5-5.5k. Hotel rates run 55-60 percent below January peak. The trip works if you''re Assagao-restaurant-led and don''t need beach Goa.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 9, 3, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Restaurant village fully open by mid-Sep. Beach Goa still rebuilding.',
  'September is the recovery month. SW monsoon retreats through second half, restaurant village fully open by mid-month, Saturday Night Market still suspended till November. Hotel rates 40-50 percent below peak.',
  'September is recovery month. Anjuna shacks rebuilding for Oct 1 reopen, Saturday Night Market still closed, beach still rough through first three weeks. Inland-only Assagao trip works.',
  'September in Assagao is the trickle back to coherent. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats around September 25-30. Restaurant village fully open by mid-month — Bomras, Edible Archives (Anjuna), Sublime, Gunpowder all running normal evening rhythm. Vinayak fish thali queue rebuilds to 20-30 minutes. Saturday Night Market at Arpora still suspended till early November. Anjuna beach 3km west still rough through the first three weeks. NomadGao coliving rebuilds to 50-60 percent occupancy. Nilaya Hermitage at ₹15-22k; Pousada Tauma at ₹3-4k; Naka Cove Tree House at ₹8-9k. The smart traveler''s call is to wait for the late-September to mid-October window — restaurant village reopened, hotel rates still 40-50 percent below peak, beaches rebuilding. Decent inland-only trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 10, 4, 'go',
  'Season opens. 23-31C, 100-150mm late spillover. Restaurant village at full rhythm. Anjuna shacks reopen Oct 1.',
  'October is the season-opener. Restaurant village at full rhythm, Anjuna shacks reopen October 1 (3km away), Saturday Night Market resumes around November 1. Hotel rates 30-35 percent below December peak. Strong value.',
  NULL,
  'October in Assagao runs as the season opener. Restaurant village at full rhythm — Bomras, Gunpowder, Sublime, Mojigao, Edible Archives (Anjuna), Vinayak, Avo''s Kitchen, Ciao Bella all in normal hours. Anjuna shacks reopen October 1 (3km west, 8-minute scooter); Wednesday Flea Market relaunches around October 15 with 200-300 stalls (full 600-stall capacity by mid-November). Saturday Night Market at Arpora resumes around November 1. Late-monsoon spillover still drops 100-150mm of rain (first 10 days mostly). Daytime 24-31C, humidity falling 80 to 70 percent. NomadGao coliving rebuilds to full capacity for the new long-stay quarter. Nilaya Hermitage walks-in at ₹22-28k from a December peak of ₹40k+; Naka Cove Tree House at ₹10-11k from ₹14k; Assagao Brewing Co Rooms at ₹6-7k. Strong-value window — full village minus the December rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 11, 5, 'go',
  'Peak builds. 21-30C, rainfall under 30mm. Saturday Night Market resumes. Restaurant booking lead 2-4 days.',
  'November is the proper pivot to peak season. Rainfall under 30mm, restaurant village at peak demand (booking lead 2-4 days), Saturday Night Market at Arpora running, Wednesday Flea at full capacity 3km west.',
  NULL,
  'November in Assagao is the year''s second-peak month behind January. Rainfall under 30mm, daytime 22-30C, humidity dropping below 70 percent. Saturday Night Market at Arpora resumes around November 1 (4km from Assagao, 10 minutes by scooter); Wednesday Flea at Anjuna hits 600-stall full capacity by November 15. Restaurant booking lead climbs to 2-4 days at Gunpowder, Bomras, Sublime, Mojigao; Vinayak fish thali queue rebuilds to 45-60 minutes. Nilaya Hermitage walks-in at ₹28-35k; Naka Cove Tree House at ₹12-13k; Assagao Brewing Co Rooms at ₹7.5-8.5k. Christmas-week rates kick in around November 25 — book accommodation before then. NomadGao coliving runs at full capacity. Strong call for first-time Assagao visitors — peak weather, full restaurant programme, prices still 25-30 percent below late-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('assagao', 12, 5, 'go',
  'Peak season. 20-30C, dry. Christmas-NYE rates 2x. Restaurant booking lead 7-10 days.',
  'December is when Assagao runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2x, restaurant booking lead 7-10 days at Gunpowder/Bomras/Sublime. Vinayak fish thali queue stretches to 90-120 minutes peak hours.',
  NULL,
  'December in Assagao is the operational peak. Daytime 21-30C, nights 18-20C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb to 2x the November baseline: Nilaya Hermitage at ₹40-45k from a November ₹30k; Naka Cove Tree House at ₹13-14k; Assagao Brewing Co Rooms at ₹8.5-9k. Restaurant booking lead at Gunpowder, Bomras, Sublime, Mojigao stretches to 7-10 days for prime tables — book before December 15 if Christmas-week dates are locked. Vinayak fish thali queue at peak hours hits 90-120 minutes. Saturday Night Market at Arpora at year-peak attendance; Wednesday Flea at Anjuna in full December rhythm. Sunburn diaspora — the festival is at Vagator December 28-30 most years — pulls accommodation 10km radius into full lockout. NomadGao coliving sells the full December quarter 3-4 months ahead. The first three weeks of December (before December 22) are the better-value Assagao window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
