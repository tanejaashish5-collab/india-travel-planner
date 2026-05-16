-- Anjuna destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register (AN pilot + auroville pilot gold reference)
-- destination_id: anjuna

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 1, 5, 'go',
  'Peak Konkan winter. 21-31C, dry, post-NYE rates ease. Wednesday Flea Market in full swing.',
  'January is when Anjuna runs at its strongest. Daytime 21-31C, sea at 26C, all shacks open and rate cards normalise after January 5 once Christmas-NYE traffic clears. Wednesday Flea Market (since the 1970s) runs 9am-6pm — arrive before 11am for parking on Anjuna Beach Road.',
  NULL,
  'Anjuna in January is the version Goa veterans book first. Daytime 22-31C, nights drop to 19-21C, the Arabian Sea sits at 26C — full swim conditions all month. Wednesday Flea Market runs 9am-6pm on the south end of Anjuna Beach (since the 1970s, originally hippie-driven, now a 600-stall mix of textiles, brassware, and Manali-Lamayuru traders). Curlies and Shiva Valley anchor the south-end shack scene; Curlies'' main stage runs psy-trance Friday-Sunday from 9pm. Chapora Fort headland (Dil Chahta Hai shoot location, 1717 Portuguese rebuild) is a 2km walk north — sunset crowd thins to under 50 people on a weekday. Christmas-NYE rate spike eases by January 5; La Marama Villa (₹15-40k) and Surya Beach Anjuna (₹5-15k) drop to listed rates from the second week. Eateries run full hours: Artjuna 8am-10:30pm, Baba Au Rhum 8:30am-10:30pm, German Bakery 9am-11pm, Bomra''s dinner-only 7-11pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 2, 5, 'go',
  'Driest month. 22-32C. Flea market peaks. Carnival float parade falls in Feb-Mar window.',
  'February is the cleanest stretch. Rainfall under 5mm, sea calm, Goa Carnival float parade most years lands in the second-half (King Momo procession through Panaji-Margao-Mapusa-Vasco). Wednesday Flea attendance peaks at 8,000-10,000 visitors.',
  NULL,
  'February in Anjuna is the technical peak. Rainfall under 5mm, daytime 22-32C, humidity at 60 percent — the lowest of the year. Wednesday Flea Market hits 8,000-10,000 daily attendance; arrive before 10am to park within 500m of the market gate or take a scooter. The Goa Carnival (Goa Tourism organises) typically falls in February — King Momo''s float parade runs through Panaji on the opening Saturday, then Margao Sunday, Mapusa Monday, Vasco Tuesday — exact dates published 4-6 weeks ahead at goa-tourism.com. Anjuna is closer to Mapusa''s Monday parade (8km, 15 minutes by scooter) than Panaji. Chapora Fort headland delivers the cleanest sunset views of the year; bring water — the climb takes 15 minutes from Chapora village. Edible Archives (Oasis Hotel, Anjuna) runs its modern-Indian tasting menu nightly except Tuesday — book 3-4 days ahead. Sunburn diaspora afterparties continue at Curlies and Shiva Valley.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 3, 4, 'go',
  'Last cool window. 23-33C. Shigmo parade week mid-month. Hotel rates slide 20-25 percent.',
  'March extends February''s weather minus the carnival rush. Shigmo (Hindu spring festival, Phalgun full moon — typically mid-March) runs week-long parades through Panaji, Ponda, Vasco. Anjuna shacks open, Wednesday Flea steady, hotel rates 20-25 percent below February peak.',
  NULL,
  'March in Anjuna is the soft-landing month before pre-monsoon humidity. Daytime 24-33C, humidity climbing to 70 percent in the last week, sea still at 28C. Shigmo (the Hindu spring festival, Phalgun full moon — exact date varies by lunar calendar) runs week-long parades through Panaji, Ponda, Vasco, and Quepem in the middle of the month. Anjuna Wednesday Flea Market still draws 5,000-6,000 — Russian and Israeli stall-holders begin packing up by month-end before the May humidity arrives. La Marama Villa drops walk-in rates 25 percent versus February; Assagao Boutique Villa (Anjuna''s xfactor pick) does the same. Curlies and Shiva Valley wind down their international DJ rotations — local Goa Trance acts take over. Cafe Diogo serves Goan-Portuguese breakfast 8am-noon, fish thali lunch from 12:30. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 4, 3, 'wait',
  'Pre-monsoon heat. 25-35C, humidity 75 percent. Shacks open till May 31 but mid-day collapses.',
  'April still functions for evening-and-pool weekenders. Shacks remain open till the May 31 forest-dept deadline, hotel rates drop 30 percent, but mid-day beach activity (10am-5pm) collapses under heat and humidity.',
  'April pushes Anjuna into pre-monsoon stress. Sea still bathable but the 1km Wednesday Flea walk and Chapora Fort climb both collapse mid-day. International DJs gone, season-long lessees packing up. Wait for late October if comfort matters.',
  'April in Anjuna is when the trip narrows to its thinnest viable shape. Daytime 26-35C, humidity at 75 percent and rising, sea temperature 29C — bathable but not cooling. Wednesday Flea Market scales down to 200-300 stalls (from 600 February peak); the Israeli, Russian, and seasonal-residence vendors have largely shipped out. Curlies and Shiva Valley hold weekend DJ slots but international tours have wrapped. The trip works as an early-morning, evening, and AC-day-room shape: beach 6-9am, pool 11am-4pm, Anjuna shack rounds 5-9pm. Hotel rates drop 30 percent versus February — Surya Beach Anjuna walk-in falls from ₹12k peak to ₹8k. Bomra''s and Edible Archives run full hours; Cafe Diogo and Baba Au Rhum hold morning service. Friday-Sunday traffic from Mumbai-Bangalore continues; weekday occupancy under 40 percent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 5, 2, 'wait',
  'Peak heat. 26-36C, humidity 80 percent. Shacks dismantle May 31. Pre-monsoon thunder weeks 3-4.',
  'May is the closing month before the SW monsoon. Shacks dismantle by May 31 forest-dept rule. Pre-monsoon thunderstorms hit weeks three and four — short violent squalls that knock power 1-2 hours.',
  'May runs hot and sticky on the Konkan coast. Sea bathing collapses past 9am, shacks dismantle May 31 (Forest Dept rule). Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Anjuna is the last chapter before the southwest monsoon arrives around June 10. Daytime 27-36C, sea at 30C, humidity 80 percent. The forest-department deadline closes all 350-odd shacks across the Anjuna-Vagator-Chapora belt by midnight May 31 — bamboo-and-thatch structures dismantled, plastic furniture stored inland. Wednesday Flea Market runs at year-low (under 100 stalls) and shifts to a lighter Saturday market from late May. Pre-monsoon thunderstorms — the first SW current arrivals — hit the third and fourth week as 30-90 minute evening squalls; 2-4 hour grid power cuts follow each storm. La Marama Villa, Surya Beach Anjuna, and the Assagao Boutique Villa all run 40-50 percent below February peak; they are the only weekend hotels hitting 60 percent occupancy. Bomra''s closes May 25 to June 30 for monsoon; Edible Archives and Cafe Diogo hold lighter hours. Push to mid-October if you can.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 6, 1, 'skip',
  'SW monsoon arrives June 10. 24-30C, 700-800mm rainfall. Shacks closed, sea dangerous. Skip.',
  NULL,
  'June is when the southwest monsoon arrives and the Anjuna trip stops working. All shacks closed since May 31, beach access limited (sea undertow makes swimming dangerous), Wednesday Flea Market suspended through monsoon. Hotel rates at year-low but the trip you came for is gone.',
  'June in Anjuna is the start of the southwest monsoon proper. The current hits the Konkan coast around June 10 and dumps 700-800mm of rain across the month, mostly as 4-8 hour sustained downpours with 30-50km/h winds. All beach shacks have been dismantled since May 31 (forest-dept rule). Anjuna Beach itself is unwalkable for most of the month — sand churns into rough texture, undertow becomes dangerous, lifeguards withdraw to base. Wednesday Flea Market is suspended; many vendors have shipped to Manali-Pushkar-Goa-cycle alternates. Curlies, Shiva Valley, and most Anjuna nightlife shut for the season. Hotel rates fall to year-low — La Marama drops to ₹8k from ₹35k peak — but only Friday-Sunday occupancy holds at 40 percent for Mumbai-Bangalore monsoon-weekend traffic. The trip you came for is closed; next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Beach unsafe, shacks closed. Skip.',
  NULL,
  'July is the wettest month at Anjuna. Rainfall hits 900-1100mm across 26-28 wet days. The trip Anjuna sells — beach shacks, flea market, Curlies sunset, Chapora climb — runs at zero capacity. The next clean window is mid-October.',
  'July in Anjuna is the wettest month of the Konkan year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Goa Tourism issues a sea-state advisory for the entire coast — swimming is prohibited, not just discouraged, and lifeguards stay off-duty. Anjuna Beach loses 30-50m of sand width to the heavy surf each year; recovery happens in October. Chapora Fort headland is technically open but the 1km approach road floods 2-3 times a week. The Wednesday Flea Market site sits empty under 4-foot grass. Hotel rates at year-low: La Marama Villa ₹6-9k, Surya Beach Anjuna ₹4-5k, both at 30 percent occupancy. The few visitors are usually long-stay residents or domestic families on cheap-monsoon weekend packages who keep to indoor pools and Old Goa church day-trips. The trip Anjuna sells is closed in July. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 500-700mm rain. Bonderam Aug 22-ish (Divar). Skip Anjuna proper.',
  NULL,
  'August holds July''s pattern with marginally fewer wet days. Beach inaccessible, shacks closed, Wednesday Flea suspended. Bonderam (Divar Island, 4th Saturday) is a draw but base in Panaji, not Anjuna. Wait for late September.',
  'August in Anjuna is more of July with a slightly thinner downpour. Rainfall 500-700mm across 22-25 wet days; the worst of the SW current eases in the last week. Anjuna Beach remains closed for swimming under Goa Tourism advisory. The Bonderam flag-festival (4th Saturday) on Divar Island is one of the few real draws in monsoon Goa — but Divar is reached from Old Goa ferry (1.5 hours from Anjuna), and base hotels are in Panaji-Old Goa, not the Anjuna belt. Ganesh Chaturthi (variable date, late August or early September) shuts down a fair bit of Hindu Goa for 5-11 days; spice-plantation and Ponda day-trips work even in monsoon, but the coast does not. Hotel rates remain at year-low. La Marama and Surya Beach Anjuna both run sub-30 percent occupancy on weekdays. The Anjuna trip — flea market, shack DJs, Chapora sunset — runs at zero in August. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 9, 2, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Shacks rebuild for Oct 1 reopen. Beach still rough.',
  'September is the recovery month. SW monsoon retreats through the second half, shack frames go up for the October 1 opening, but rainfall still 250-300mm and beach conditions don''t fully stabilise until early October.',
  'September is rebuild-not-yet-open month at Anjuna. Beach still rough, shacks under construction, Wednesday Flea Market suspended through month. Push to mid-October when the shack belt fully opens.',
  'September in Anjuna is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from Goa around September 25-30 (IMD declares formal withdrawal). Shack-building crews from Karnataka and inland Goa start arriving September 15 to rebuild Anjuna and Vagator''s 350-odd structures for the October 1 statutory opening. Beach itself is still rough through the first three weeks; sand width recovering, but undertow remains. Wednesday Flea Market still suspended through the month. Curlies'' framework comes back up in the last week. Hotel rates climb 15-20 percent versus August lows but still 50 percent below January peak. Bomra''s reopens around September 25 after monsoon shutdown. The smart traveler''s call is to wait for the October 5-15 window — full shacks, calm sea, off-peak rates. September is a 3-day sample at best.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 10, 4, 'go',
  'Season opens Oct 1. 24-32C, 100-150mm late-monsoon spillover. Shacks rebuilt, Wednesday Flea returns.',
  'October is the season-opener at Anjuna. All shacks open from October 1 (forest-dept statutory date), Wednesday Flea Market resumes mid-month, sea calms by week two. Pre-Christmas rates 30-35 percent below December peak — strong value window.',
  NULL,
  'October in Anjuna is the proper return to coherent. The October 1 statutory date opens all 350-odd Anjuna-Vagator-Chapora shacks; Curlies and Shiva Valley relight their main stages by the second week. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days) but sea state stabilises by October 10-12. Daytime 25-32C, humidity falling from 80 to 70 percent, sea at 28C. Wednesday Flea Market relaunches around October 15 — first 4-6 weeks see only 200-300 stalls, full 600-stall capacity returns mid-November as international vendors fly in. Bomra''s, Edible Archives, Cafe Diogo, Baba Au Rhum, German Bakery, Artjuna all run full hours from October 5. Hotel rates run 30-35 percent below December peak: La Marama walks-in at ₹18-22k versus December''s ₹35-40k. Pack a poncho rather than an umbrella — Konkan winds make umbrellas useless against the last monsoon squalls.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 11, 5, 'go',
  'Peak builds. 22-31C, rainfall under 30mm. International DJs return, Wednesday Flea at full capacity.',
  'November is the proper pivot to peak season. Rainfall under 30mm, full shack belt running, Wednesday Flea hits 600-stall full capacity, international DJ tours return to Curlies-Shiva Valley. Hotel rates 20-25 percent below December peak.',
  NULL,
  'November in Anjuna is the year''s second-peak month behind January. Rainfall under 30mm, daytime 23-31C, sea at 27C, humidity dropping below 70 percent. Wednesday Flea Market hits full 600-stall capacity by November 15 as Israeli, Russian, and seasonal-cycle vendors return from Manali and Pushkar. Curlies and Shiva Valley relight their international DJ rotations — Friday-Sunday lineups feature Goa Trance, psy-trance, and minimal-techno acts. Sunburn early-bird tickets sell from November (festival is Vagator-based unless Pune hosts that year). Chapora Fort sunset queues thin compared to December. Hotel rates climb to 75-80 percent of peak — La Marama Villa at ₹25-30k, Surya Beach Anjuna at ₹10-12k, Assagao Boutique Villa at ₹25-30k — but still meaningfully below the December 22-January 5 spike. Bomra''s and Edible Archives both want 4-5 day reservation lead by month-end. Strong call for first-time Anjuna visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anjuna', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE rates triple Dec 22-Jan 5. Sunburn diaspora at Curlies.',
  'December is when Anjuna runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2-3x normal, beach access constrained by traffic gridlock from Calangute-Baga spillover. Sunburn (Dec 28-30) at Vagator pulls 80,000+ — Anjuna Curlies/Shiva Valley host afterparty diaspora.',
  NULL,
  'December in Anjuna is the operational peak and the most expensive stretch of the Konkan year. Daytime 22-30C, nights 19-21C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates run 2-3x the November baseline: La Marama Villa hits ₹40k+, Surya Beach Anjuna ₹15k from a ₹6k October walk-in. Wednesday Flea Market at full 600-stall capacity but the 1km Anjuna Beach Road approach gridlocks from 11am — arrive 9am or take a scooter. Sunburn (December 28-30 in Vagator most years; rotates to Pune some) draws 80,000+; Anjuna Curlies and Shiva Valley host the afterparty diaspora and accommodation 5km north sells out 6 weeks ahead. Bomra''s, Edible Archives, Cafe Diogo, Baba Au Rhum, German Bakery, Artjuna want bookings 5-7 days out. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
