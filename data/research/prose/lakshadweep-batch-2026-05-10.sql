-- Lakshadweep prose batch — 60 rows (5 dests × 12 months)
-- Generated 2026-05-10
-- Voice: locked NakshIQ FT Weekend register (AN pilot + auroville gold reference)
-- destinations: agatti, bangaram, kadmat, kavaratti, minicoy

-- =========================================================
-- AGATTI - 12 months (permit hub, only airstrip in the chain)
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 1, 5, 'go',
  'Peak window. 24-30C, dive viz 30-35m, calm seas, full inter-island boats. Permits tight 30-45 days out.',
  'January is when Agatti runs as designed. Twice-weekly Kochi-Agatti flights operate near full capacity, lagoon viz holds at 30-35m, the Agatti Island Beach Resort is at peak occupancy. The 4 sq-km island is reef-walkable at low tide. Lakshadweep Tourism permit applications need to be in 30-45 days ahead.',
  NULL,
  'Agatti in January is the lagoon at its most photogenic. Daytime 25-30C, water 26-28C, dive visibility 30-35m on the eastern reef wall. Alliance Air''s Kochi-Agatti ATR (twice weekly, schedule expands during peak) lands on the 1.2km airstrip that takes most of the island''s usable width. The Entry Permit issued by Lakshadweep Tourism needs 30-45 days — apply via lakshadweeptourism.com the moment dates lock. Agatti Island Beach Resort holds the bulk of tourist beds; SPORTS-affiliated huts pick up the overflow. Inter-island speedboats to Bangaram (30 minutes, ~₹2,500) and ferries to Kavaratti (4-5 hours, infrequent) run on weather-dependent timetables — the boatmen call it 24 hours ahead. The single ATM near the jetty stays usable but goes dry by Sunday. BSNL 2G is the only network. Carry ₹20,000 cash from Kochi. The island is dry; alcohol stays at Bangaram only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 2, 5, 'go',
  'Driest month. 24-31C, sea state minimal, school-holiday demand thins mid-month. Permit lead still 30-45 days.',
  'February is the cleanest weather window of the year on Agatti — under 10mm rainfall, lagoon mirror-flat, sun-and-shadow contrast at its sharpest. Reef walks at the southern lagoon are stable from 6am low tide. Direct flight load eases from the second week as January family travelers head home.',
  NULL,
  'February in Agatti reads like January with cheaper margins. Rainfall under 10mm for the month, daytime 24-31C, the Arabian Sea so flat the southern lagoon mirrors the sky from 6am. The Alliance Air ATR runs its full peak winter timetable — two weekly flights from Kochi plus a third on demand during school holidays. Inter-island speedboats run to Bangaram and Thinnakara on a stable schedule by mid-month. Snorkel-only day trips to the uninhabited Kalpitti islet (15 minutes by dhoni, ₹500-800 per head with a SPORTS booking) are on. Permit processing still takes 30-45 days; the SAMUDRAM cruise-package route (Kochi → Agatti via 4-5 day ship) is the fallback if individual permits stall. Carry the printed permit, photo ID, and the original sponsor letter — the Agatti airport check-in and the jetty police both inspect at arrival. Bangaram alcohol is the only legal option in the cluster; everything else is dry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 3, 4, 'go',
  'Last clean month before pre-monsoon humidity. 26-32C. Dive ops at full capacity, permit lead unchanged.',
  'March hands you most of February''s sea conditions with quieter resort floors. Pre-bookings ease — Agatti Island Beach Resort offers shoulder-rate packages, SPORTS huts go on standby. Dive viz holds at 30m. The trade-off is creeping humidity, evident by the third week.',
  NULL,
  'March in Agatti starts cool and ends sticky. Daytime 26-32C, humidity climbing from 70 to 78 percent across the month, water still at 27-28C. The Alliance Air twice-weekly schedule holds. Agatti Island Beach Resort lists shoulder-rate packages from the second week — typically 20-25 percent off January peak. The dive school operates at full capacity; the eastern reef wall and Boulder Point both run as standard day-dives. SPORTS-administered huts (the public-sector option, bookable via lakshadweeptourism.com) often have last-minute availability that vanishes in January-February. Permit lead time stays at 30-45 days, but applications submitted in early March for late-March travel sometimes clear faster as the flow eases. The 4 sq-km island is fully cycle-able — borrow a cycle from the resort or hire from the village near the jetty for ₹150 per day. Bangaram day-boat still runs daily.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 4, 3, 'go',
  'Pre-monsoon. 28-33C, humidity 80 percent. Sea state still calm but heat starts to bite. Resorts off-peak.',
  'April is when Agatti shifts to value-mode. The lagoon stays calm and dive viz holds at 25-28m, but humidity makes mid-day uncomfortable. Resort rates drop 30-35 percent versus January. Worth it if you book a beachfront hut and structure dives early-morning and late-afternoon.',
  NULL,
  'April in Agatti is operationally clean but physically warmer. Air 28-33C, water 28-29C, humidity at 80 percent — the kind of warmth that pushes you off the white sand by 11am and back into the lagoon. Alliance Air still runs both weekly slots through April. The Agatti Island Beach Resort and the SPORTS huts both publish off-peak rates 30-35 percent below January; air-conditioning becomes non-negotiable here, factor it into the room budget. Power cuts get more frequent pre-monsoon — 2-3 hour daytime outages aren''t unusual, and budget huts without inverters go dark. The reef wall dive at 18m holds 25-28m visibility; the Boulder Point shallow site is clearer. The 30-minute speedboat to Bangaram still runs daily but afternoon legs sometimes get cancelled if the wind picks up. Carry electrolyte sachets — the village shop near the jetty stocks ORS but not the rehydration mix divers need.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 5, 2, 'wait',
  'Late pre-monsoon. 28-33C, first squalls late month. SW monsoon advance closes most of the chain by Jun 1.',
  'Early May is the last reliable Lakshadweep window. First fortnight extends April — calm seas, dive ops running, hottest of the year. Last fortnight catches arriving SW monsoon squalls; sea state turns rough, Alliance Air starts trimming frequencies, inter-island boats unreliable.',
  'May 15 onward the Arabian Sea begins shifting — first SW monsoon squalls arrive, Alliance Air drops to one weekly flight, inter-island boats cancel on rough days. The dive school takes its first closed weeks. By June 1 the chain effectively shuts.',
  'May in Agatti splits in two. The first fortnight runs like late April — 28-33C, humidity 80 percent, lagoon flat, dive viz still 22-25m. The second fortnight is when the SW monsoon makes its presence felt: afternoon squalls of 30-45 minutes, then back to muggy sun, but enough rough sea to start cancelling Bangaram day-trips. Alliance Air drops from two weekly flights to one from around May 20; dive operators close for the season in the last week. Resort rates run year-low (often 50 percent off January) but the conditions you came for — calm lagoon, viz, day-boat to Bangaram — are no longer guaranteed. Lock the first 10 days or wait for October. The chain is operationally shut from June 1 to mid-September; resort and SPORTS bookings pause for the same window. There is no version of the trip that works after May 25.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 6, 1, 'skip',
  'SW monsoon. 25-29C, 300-400mm rain, sea state too rough. Alliance Air suspends. Resorts shut.',
  NULL,
  'June is full SW monsoon on Agatti. The Arabian Sea is dangerously rough — Alliance Air suspends scheduled flights, the dive school is closed, inter-island boats don''t sail. Agatti Island Beach Resort and the SPORTS huts are shut for the season. There is no functioning visitor trip.',
  'June in Agatti is the chain at full lockdown. The southwest monsoon pounds the Arabian Sea with 300-400mm of rainfall across the month, often as 12-hour deluges with sustained 40-knot winds. Alliance Air suspends all Kochi-Agatti scheduled flights from June 1; the runway floods regularly and crosswinds make landing unsafe. Inter-island speedboats are dry-docked; the bigger SPORTS ferries from Kochi (MV Kavaratti, MV Lakshadweep Sea) are also paused. Agatti Island Beach Resort closes from end-May to mid-September for refurbishment and staff break. The few residents in the village wait it out; Lakshadweep Tourism stops issuing tourist permits for June-August dates. The next permit applications open for late-September arrivals. There is no version of the Agatti trip that works in June.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 7, 1, 'skip',
  'Peak monsoon. 25-28C, 350-450mm rain, chain closed. Permits not issued for July dates. Skip.',
  NULL,
  'July is the wettest month at Agatti. Alliance Air hasn''t flown since June 1, dive operators are shut, all resorts closed. Lakshadweep Tourism doesn''t issue permits for July arrivals. Pick October-November or December-March instead.',
  'July is monsoon at its most stubborn on Agatti. Rainfall averages 380-450mm across 26-28 wet days, sustained westerly winds pump 4-6 metre swells onto the western reef, and the lagoon-edge breakers run all day. Alliance Air remains suspended, the SPORTS ferry network is paused, and the entire visitor stack — resorts, dive school, inter-island boats — is offline. The Lakshadweep Tourism permit office stops accepting applications for July arrivals; even research and emergency travel takes special permission via the Administrator''s office. Air temperature 25-28C is deceptively mild but constant rain and 90-plus percent humidity mean clothes don''t dry, the BSNL tower goes intermittent on storm days, and even the supply boats from Kochi run irregular schedules. The trip you came for cannot happen. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 8, 1, 'skip',
  'Monsoon continues. 300-400mm rain. Independence Day brings security tightening but no functional access.',
  NULL,
  'August is the second-wettest month. The chain remains closed. Permits suspended, resorts shut, Alliance Air not flying. Aug 15 also brings a security tightening — no tourist landings on Agatti Island regardless. Wait for October.',
  'August in Agatti is more of July with marginally fewer wet days. Rainfall sits at 300-400mm, sea state remains rough, and the resort-and-dive infrastructure stays closed. The standout date is August 15 — Independence Day — when no tourist landings happen on any inhabited Lakshadweep island regardless of weather, a routine security tightening across the Coast Guard-administered chain. Alliance Air''s scheduled service stays suspended through August 31. Lakshadweep Tourism permit applications for August dates aren''t accepted; the office begins processing September-onward applications mid-month, with priority for September arrivals going to long-lead travelers who applied in May-June. The first viable arrival window is the third week of September, and even those bookings are conditional on weather. The cleanest planning move from August is to lock October dates and submit the permit application now.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 9, 2, 'wait',
  'Monsoon retreating. 200-250mm rain mostly first half. Permits open for late-month arrivals only.',
  'September is the slow recovery on Agatti. Rainfall drops to 200-250mm with most falling in the first fortnight. Alliance Air resumes scheduled flights from around the third week. Dive school re-opens with reduced staff. Workable only if dates are absolutely fixed and arrival is post-Sep 20.',
  'September is half-monsoon, half-recovery. The full season starts October 1 with cleaner conditions and a wider operator base. Two weeks of patience converts a tentative trip into a clean one.',
  'September in Agatti is the slow turn back to functional. Rainfall drops to 200-250mm with most falling in the first fortnight; the second half sees increasingly stable weather windows. Alliance Air''s Kochi-Agatti ATR resumes around the third week — one weekly flight, scaled to two by month-end. Agatti Island Beach Resort begins phased re-opening from September 15-20 with a soft-launch operating capacity of 60 percent. The dive school re-opens with reduced staff; viz is recovering through 15-22m. Lakshadweep Tourism issues permits for late-September arrivals from August 15 onward — apply 30-45 days in advance for September 25 to October 5 dates. SPORTS huts re-open with the ferries. Inter-island boats to Bangaram restart by September 25 on weather-dependent days. Workable only if your dates are post-Sep 20 and you can absorb a possible weather-driven cancellation. October is dramatically cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 10, 4, 'go',
  'Season opens. 100-150mm rain mostly first week. 24-31C. Alliance Air full schedule, dive viz back to 25m+.',
  'October is the proper season opener on Agatti. Alliance Air normalises to two weekly flights, dive viz climbs to 25-28m by mid-month, the lagoon settles. Resort rates 30-35 percent below December peak. The smart traveler''s month — calm conditions, soft pricing, fewer permits to compete for.',
  NULL,
  'October in Agatti is when the chain visibly turns the corner. Rainfall drops to 100-150mm, mostly in the first week, then most of the back half is dry. Air 24-31C, humidity 78-82 percent and falling. Alliance Air normalises to its full twice-weekly Kochi-Agatti schedule by October 5; the third holiday-season flight starts adding from late-month. Dive viz climbs from 18-20m at month-start to 25-28m by month-end. Agatti Island Beach Resort runs at 70-80 percent occupancy; SPORTS huts have walk-in availability some weeks. Bay of Bengal cyclone season runs through October-November but most systems track north-east toward Odisha and miss the Lakshadweep chain entirely. The permit lead drops from 30-45 days back toward 20-30 days as the application flow normalises. Hotel rates sit 30-35 percent below December peak. The eastern reef-wall dive holds 25m viz again from October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 11, 5, 'go',
  'Peak builds. 50-80mm rain. 23-30C. NE monsoon largely misses Lakshadweep. Permit lead returns to 30-45 days.',
  'November is Agatti at full operational form. The NE monsoon hits the east coast but largely misses the Lakshadweep chain — rainfall stays under 80mm, lagoon flat, dive viz at 28m. Permit lead-times return to 30-45 days as Christmas-week applications start landing. Strong call for first-time visitors.',
  NULL,
  'November in Agatti is properly back in business. The northeast monsoon hammers the Coromandel coast but largely sidesteps the Lakshadweep chain — rainfall stays under 80mm, the Arabian Sea flattens out, dive visibility at the eastern reef wall and Boulder Point holds 28-30m. Air 23-30C, water 27-28C. Alliance Air runs its full peak winter timetable, including a third weekly flight on demand. Agatti Island Beach Resort sits at 90 percent occupancy; SPORTS huts book out 3-4 weeks ahead. Permit lead times return to 30-45 days as Christmas-and-New Year applications start landing — submit now for December dates. The dive school operates at full capacity, including the deeper sites at the southern reef. Inter-island speedboats to Bangaram and Thinnakara run daily. The single ATM near the jetty processes more cash but still goes dry by Sunday afternoon. Carry ₹25,000 from Kochi for a 5-day trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agatti', 12, 5, 'go',
  'Peak season. 22-29C, dry, dive viz 30-35m. Christmas-NY 50% premium. Alliance Air sold out 60 days out.',
  'December is when Agatti delivers the version of Lakshadweep the brochures promise. Stable seas, 30m+ underwater visibility, full operator capacity. Christmas-NY week is genuine peak — Alliance Air seats sell out 60 days ahead, permit applications need to be in 45-50 days early.',
  NULL,
  'December in Agatti is the peak Lakshadweep window. Air 22-29C, water 26-28C, dive viz 30-35m, rainfall under 25mm scattered across the month. Alliance Air''s twice-weekly Kochi-Agatti ATR runs full plus the holiday-season third flight; seats sell out 60 days ahead for Christmas-NY week. Permit applications for December 20 to January 2 arrivals need to be in 45-50 days early — December walk-up applications get rejected routinely. Agatti Island Beach Resort hits 100 percent occupancy from December 22 to January 5 and runs a 50-60 percent premium on published rates. SPORTS huts release final tranches 2-3 weeks out but those go inside 24 hours. Inter-island speedboats to Bangaram (₹2,500-3,000 round-trip) run multiple legs daily. Dive school is at capacity — book the four-day open-water course before arrival. ATM goes dry by Saturday from Christmas onward. Carry ₹30,000 cash.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- BANGARAM - 12 months (uninhabited resort island, alcohol legal)
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 1, 5, 'go',
  'Peak window. 24-29C, lagoon flat, viz 35m. Bangaram Island Resort full. The chain''s only legal-alcohol island.',
  'January is the version of Bangaram every honeymoon brochure draws. The 30-minute speedboat from Agatti runs daily, the resort''s 50-odd thatched cottages sit at full occupancy, and lagoon viz hits 35m. Bangaram is the only legal-alcohol island in the chain — pack expectations accordingly elsewhere.',
  NULL,
  'Bangaram in January is the closest the Indian archipelago gets to the Maldives template. Daytime 24-29C, water 27-28C, lagoon viz 32-35m, the western reef wall running 35m verticals at 18m depth. The CGH Earth-managed Bangaram Island Resort (50-odd thatched-roof cottages, no televisions, restored 2024 after long closure) holds the entire visitor capacity — there are no homestays, no SPORTS huts, no alternatives, the island is uninhabited beyond the resort. Access is the 30-minute speedboat from Agatti jetty (₹2,500-3,000 round-trip, scheduled around the Alliance Air arrivals). Bangaram is the only Lakshadweep island where alcohol is legal — the resort bar opens 11am to 11pm, and guests cannot bring liquor onto Agatti or any other inhabited island in the chain on day-trips. The dive centre at the resort runs the Bangaram drop-off, Manta Point (turtle and ray encounters likely December-March), and night-dive options. Cash needs are minimal — the resort bills to the room.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 2, 5, 'go',
  'Driest month. 24-30C. Manta Point sightings peak. Resort books 60 days out for valentine through-March.',
  'February is the rate-card month at Bangaram — manta-ray sightings at their most predictable, lagoon glassed-over, resort dining nights running uninterrupted. Valentine''s through end-month books out 60 days ahead. Pack the permit, the resort booking confirmation, and the original sponsor letter for jetty inspection.',
  NULL,
  'February in Bangaram is the year''s most photogenic stretch. Rainfall under 8mm, daytime 24-30C, the lagoon mirror-flat from 6am to noon. Manta-ray sightings at the eponymous Manta Point (12-18m depth, 25-minute boat from the resort jetty) are at their seasonal peak — December through March is prime, but February delivers the most consistent encounters. Bangaram Island Resort runs at full capacity from Valentine''s through end-month; bookings need to be in 60 days ahead. The 30-minute speedboat from Agatti runs to a fixed twice-daily schedule (10:30am inbound, 4:30pm outbound). The resort''s dive centre is fully staffed — book the open-water course, drift dive, or night dive at check-in. The only alcohol pour in the chain stays here; guests who plan day-trips back to Agatti or onward to Kavaratti need to dry up before the boat. Permit must be the same Lakshadweep Tourism document used for Agatti entry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 3, 4, 'go',
  'Last cool window. 26-32C, dive viz 30m. Resort lists shoulder packages, 20-25% off February peak.',
  'March extends February''s sea conditions with quieter resort floors. CGH Earth lists shoulder-rate packages from week two — typically 20-25 percent off the February rack. Manta sightings start tapering after March 15 as water warms. Last comfortable window before April pushes humidity past comfort.',
  NULL,
  'March in Bangaram is the soft-landing month. Daytime 26-32C, water 28-29C, lagoon viz holds at 28-30m through most of the month. CGH Earth publishes shoulder-rate packages from the second week — 20-25 percent off February rack rates, often bundled with a complimentary night dive. Manta Point encounters start tapering after March 15 as the water warms past 29C and the rays move deeper; turtle sightings on the eastern reef pick up in compensation. The 30-minute speedboat from Agatti runs the standard twice-daily schedule. Resort occupancy drops to 70-80 percent, which means the lagoon-fronting cottages (the ones with the direct sunset view) become bookable inside the window. The dive school runs full programme. The resort bar — the chain''s only legal pour — stays open 11am to 11pm. Power on Bangaram is solar-plus-genset; there are no public outages but cottage AC runs only 6pm to 10am at the resort''s standard policy.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 4, 3, 'go',
  'Pre-monsoon. 28-33C, humidity 80%. Lagoon still calm but heat dictates the schedule. Resort discounted 30%.',
  'April still works on Bangaram if the trip is structured around early-morning and late-afternoon water time. Resort rates run 30 percent off January peak. The lagoon stays calm through mid-month, dive viz holds at 25m, and the resort''s indoor dining keeps the AC pour-bar going. April 15 onward sea state begins shifting.',
  NULL,
  'April in Bangaram is operationally clean but humid. Air 28-33C, water 28-29C, humidity at 80 percent — water time becomes the only bearable mid-day option. The lagoon stays calm through the first three weeks; dive viz holds at 23-26m. The 30-minute Agatti speedboat keeps its scheduled twice-daily slots until April 20-22, after which the afternoon leg starts getting cancelled on the windier days. Resort rates run 30 percent off the January peak. CGH Earth''s standard April schedule keeps the dive centre, kayak rack, and snorkel-gear hire fully staffed. The bar — the chain''s only legal pour — runs full hours. Power cuts don''t affect the resort (independent solar-plus-genset) but Agatti, the gateway, sees 2-3 hour daytime outages, and the airstrip operations get tight in afternoon thermals. Lock the first two weeks; the last week is a coin-flip on the speedboat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 5, 2, 'wait',
  'Late pre-monsoon. 28-33C. Resort closes for season around May 10-15. Speedboat unreliable last fortnight.',
  'Early May is the last narrow Bangaram window. Bangaram Island Resort typically closes for the season around May 10-15 ahead of the SW monsoon and reopens late September. The 30-minute Agatti speedboat becomes weather-dependent through the first week and is paused entirely once the resort shuts.',
  'May 10-15 onward Bangaram Island Resort closes for the season — the only accommodation on the island. The Agatti speedboat stops, the dive school shuts, the bar pulls down. The next reliable arrival window is October.',
  'May in Bangaram is the closing-down month. Bangaram Island Resort — the entire visitor stack on this uninhabited island — closes for the season around May 10-15. The exact date varies year to year with the SW monsoon onset, but CGH Earth confirms the closure two weeks ahead via email to all confirmed bookings. Until that date, conditions hold from late April: 28-33C, humidity 80 percent, lagoon calm in the morning with afternoon chop after May 5-7. Dive viz drops from 25m at month-start to 18-20m at closure. Speedboat from Agatti runs morning leg only after May 8. The resort''s seasonal-closure rate (offered for the last 5 nights pre-shutdown) goes 50-55 percent below January peak — but the experience is partial: dive school operating at half capacity, evening activities curtailed, bar early-closing. The next reliable Bangaram window is October. Lock the first 7 days of May or wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 6, 1, 'skip',
  'SW monsoon. Resort closed. No access. 25-28C, sustained 40-knot winds, lagoon dangerous. Skip.',
  NULL,
  'June is full SW monsoon. Bangaram Island Resort is closed, no speedboats run from Agatti, the lagoon is dangerously rough. The island is technically uninhabited and unreachable. There is no version of the trip that works.',
  'June on Bangaram is the island returning to its baseline state — uninhabited, unreachable, untouristed. Bangaram Island Resort has been closed since around May 15 and stays shuttered until late September. The 30-minute Agatti-Bangaram speedboat is dry-docked. Sustained 30-40 knot SW monsoon winds whip the lagoon into 2-3 metre chop, the western reef wall takes the full force of the swell, and even the supply boats from Kochi avoid the cluster. Air 25-28C, rainfall 350-450mm across the month, often as 12-hour deluges. Lakshadweep Tourism doesn''t issue tourist permits for June arrivals to any island in the chain, including a non-existent Bangaram visit. The dive school is shut, the bar is shut, the entire visitor stack is offline. The next viable arrival is the resort''s September re-opening, typically around September 25-30.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 7, 1, 'skip',
  'Peak monsoon. Resort closed since May 15. No access. 350-450mm rain. Skip.',
  NULL,
  'July is the peak SW monsoon. Bangaram Island Resort remains closed, no boats run, the island is unreachable. Permits aren''t issued. Pick October-November or December-March instead.',
  'July on Bangaram is monsoon at its fullest. Bangaram Island Resort has been closed since May 15 and remains shut until late September. Rainfall sits at 380-450mm across 26-28 wet days, sustained 35-knot winds churn the lagoon, and even Coast Guard supply boats reach the cluster on a thin schedule. Lakshadweep Tourism issues no tourist permits for July arrivals to any island. The dive school, the bar, the speedboat operator — every commercial element of the Bangaram visitor experience — is offline. The island reverts to its uninhabited baseline; the only humans on it are occasional Coast Guard patrols and resort caretaking staff weather-permitting. The first viable arrival window is the resort''s September re-opening, typically September 25-30, contingent on the monsoon retreating on schedule. Submit the October-onward Lakshadweep Tourism permit application now if locking dates from July.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 8, 1, 'skip',
  'Monsoon continues. Resort closed. 300-400mm rain. Aug 15 brings security tightening. Skip.',
  NULL,
  'August is the second-wettest month. Bangaram Island Resort remains closed; no access regardless of weather. Aug 15 brings a chain-wide security tightening on Independence Day. Wait for late September re-opening.',
  'August on Bangaram is more of July with marginally fewer wet days. Rainfall stays at 300-400mm, the resort remains closed, the speedboat from Agatti is dry-docked. The standout calendar item is August 15 — Independence Day — when no tourist landings happen on any inhabited Lakshadweep island regardless of weather. Bangaram itself is uninhabited, but access requires Agatti as a transit point and Agatti shuts to all tourist arrivals on August 15 as part of the chain-wide security routine. Bangaram Island Resort''s September re-opening date typically gets confirmed in the second week of August once the monsoon retreat trajectory becomes clear; CGH Earth emails confirmed bookings the moment the date locks. The cleanest planning move from August is to hold late-October dates for the post-re-opening shoulder window when rates run 25-30 percent below the December peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 9, 2, 'wait',
  'Resort re-opens around Sep 25-30. Last week only. 200-250mm rain mostly first half. Conditional on weather.',
  'September is the closing edge of monsoon. Bangaram Island Resort re-opens around September 25-30, contingent on the SW monsoon retreating on schedule. Last-week arrivals possible but always conditional on weather and final go from CGH Earth. October is materially safer.',
  'September is on the way out of monsoon but Bangaram Island Resort doesn''t re-open until the last week. October offers a far cleaner window with two extra weeks of certainty — same shoulder-season rates and dramatically more reliable conditions.',
  'September on Bangaram is the closing edge of the off-season. Bangaram Island Resort re-opens around September 25-30, contingent on the SW monsoon retreating on schedule and the lagoon settling. CGH Earth confirms the exact re-opening date 10-14 days ahead — September arrivals always carry a possible push by 5-7 days. Rainfall in the second fortnight drops to 60-80mm, daytime 26-30C, water 28-29C, lagoon viz recovering through 15-20m. The Agatti-Bangaram speedboat resumes with the resort opening; dive school operates with a soft-launch crew at 60 percent capacity. The bar opens with the resort. Lakshadweep Tourism starts issuing permits for late-September arrivals from August 15 — apply 30-45 days ahead. Workable only if dates are absolute and you can absorb a 5-7 day re-opening delay. October 5 onward is far cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 10, 4, 'go',
  'Season opens. 100-150mm rain mostly first week. 25-31C. Resort at 70% capacity, dive viz back to 25m+.',
  'October is the proper Bangaram season opener. Resort runs at 70-80 percent capacity, dive viz climbs to 25-28m by mid-month, the speedboat schedule normalises. CGH Earth''s shoulder-season rates run 25-30 percent below December peak. The smart traveler''s window.',
  NULL,
  'October on Bangaram is the post-monsoon clean window. Rainfall drops to 100-150mm, mostly in the first week, then most of the back half is dry. Air 25-31C, water 28-29C, humidity 78-82 percent and falling. Bangaram Island Resort runs at 70-80 percent occupancy from October 5; dive viz climbs from 18-20m at month-start to 25-28m by month-end. CGH Earth''s shoulder-season rates run 25-30 percent below the December peak. The 30-minute Agatti-Bangaram speedboat normalises to its twice-daily schedule. The dive school re-opens its full programme — Manta Point sightings start picking up from late October as the water cools below 29C. Resort bar runs full hours; the chain''s only legal pour is back online. Bay of Bengal cyclones occasionally form this month but track north-east toward Odisha and rarely affect the Lakshadweep cluster.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 11, 5, 'go',
  'Peak builds. 50-80mm rain. 23-30C. Manta sightings restart. Resort at 90% occupancy, books 45 days out.',
  'November is Bangaram at full operational form. NE monsoon largely misses the chain — rainfall under 80mm, lagoon flat, dive viz at 30m. Manta Point sightings restart mid-month. Resort hits 90 percent occupancy, bookings need to be in 45 days ahead.',
  NULL,
  'November on Bangaram is properly back in business. The northeast monsoon hammers the Coromandel coast but largely sidesteps the Lakshadweep chain — rainfall stays under 80mm, the Arabian Sea flattens out, dive visibility at the western reef wall holds 28-32m. Air 23-30C, water 27-28C. Bangaram Island Resort sits at 90 percent occupancy; bookings need to be in 45 days ahead. Manta-ray sightings at Manta Point restart from around November 15 as the water cools below 29C — peak season runs December to March. The 30-minute Agatti speedboat keeps its full twice-daily schedule. The dive school operates at full capacity. The bar — the chain''s only legal pour — runs full hours. CGH Earth''s rate card lifts from shoulder to peak around November 20, with the Christmas-NY surcharge layering on from December 22. Strong call for first-time visitors who can absorb the resort tariff and want the chain''s flagship experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bangaram', 12, 5, 'go',
  'Peak. 22-28C, dry, viz 32-35m. Christmas-NY 50-60% premium, resort 100% full. Manta sightings reliable.',
  'December is when Bangaram delivers the rate-card experience the entire CGH Earth catalogue is built around. Stable seas, 32-35m viz, manta sightings predictable. Christmas-NY week drives a 50-60 percent premium and complete sell-out — book 60-75 days out.',
  NULL,
  'December on Bangaram is the year''s most coherent window. Air 22-28C, water 26-28C, lagoon viz 32-35m, rainfall under 25mm scattered across the month. Bangaram Island Resort hits 100 percent occupancy from December 22 to January 5; CGH Earth''s Christmas-NY surcharge runs 50-60 percent above the standard peak rack rate. Bookings for the December 20 to January 2 window need to be in 60-75 days early. The 30-minute Agatti speedboat runs the full peak twice-daily schedule. Manta Point sightings are at their most reliable — December through March is the predictable encounter window, with February delivering the highest hit rate. Dive school is at capacity; book the open-water course or the night-dive package at the time of resort booking, not at check-in. The bar — the chain''s only legal pour, no exceptions — runs full hours. Permit applications for December arrivals need to be in 45-50 days early via lakshadweeptourism.com.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- KADMAT - 12 months (mid-island, public-sector dive school, SAMUDRAM cruise stop)
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 1, 5, 'go',
  'Peak window. 24-29C, dive viz 30m. Kadmat Beach Resort full. SAMUDRAM cruise lands here weekly.',
  'January is when Kadmat runs at full form. The Kadmat Beach Resort (60-odd cottages, the chain''s mid-budget standard) is at peak occupancy, the public-sector dive school operates daily, and the SAMUDRAM cruise from Kochi includes Kadmat as a standard stop. The 8km-long lagoon is the chain''s longest snorkel water.',
  NULL,
  'Kadmat in January is the chain''s most accessible diving island. Daytime 24-29C, water 26-28C, dive viz 28-32m, the 8km lagoon (the longest in the cluster) running flat from 6am. Kadmat Beach Resort — 60-odd thatched cottages, mid-budget by chain standards — sits at peak occupancy through the month. The Lacadives dive school (the chain''s public-sector dive operation, also the longest-running) operates daily; the open-water four-day course runs continuously. Access is via the SAMUDRAM cruise from Kochi (4-5 day ship-based package, MV Kavaratti or MV Lakshadweep Sea, Kadmat is a standard 1-2 day stop) or by speedboat from Agatti (longer route, 4-5 hours, weather-dependent, only possible Oct-May). There''s no airstrip on Kadmat. Permit lead is 30-45 days via lakshadweeptourism.com or bundled with the SAMUDRAM package booking. The single ATM near the jetty stays usable but goes dry by Sunday. BSNL 2G only. Carry ₹15,000-20,000 cash. Dry island; no alcohol on Kadmat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 2, 5, 'go',
  'Driest month. 24-30C. SAMUDRAM cruise full. Lacadives dive school running open-water courses continuously.',
  'February is the most operationally clean Kadmat window. Lagoon viz at 30m, dive school at full capacity, SAMUDRAM cruises from Kochi running near-full. Kadmat Beach Resort books out 30-45 days ahead. The 8km lagoon means the snorkel zone never feels crowded.',
  NULL,
  'February in Kadmat is the chain''s most reliable diving month. Rainfall under 8mm, daytime 24-30C, water 27-28C, lagoon viz at 30m through most of the month. The Lacadives dive school runs its full programme — open-water courses (four days, ₹35,000-40,000 all-in), advanced specialty courses, and the deeper Bird Reef wall site at 22m. Kadmat Beach Resort books out 30-45 days ahead through February; SPORTS-administered cottages clear faster (the budget option, around 60 percent of resort rates). The SAMUDRAM cruise from Kochi runs near-full capacity — bundled-package travelers form the bulk of February visitors and the 1-2 day Kadmat anchorage gets a rotating set of 200-300 cruise passengers. The 8km lagoon means the resort and cruise zones don''t meaningfully overlap. Reef-walk access from the resort beach starts at 6am low tide. Dry island; alcohol available only on Bangaram in the chain.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 3, 4, 'go',
  'Last cool window. 26-32C. Resort 20% off February peak. Dive school continues at full capacity.',
  'March extends February''s sea conditions with quieter floors. Kadmat Beach Resort lists shoulder-rate packages from week two — 20-25 percent off February peak. SPORTS huts have walk-in availability some weeks. SAMUDRAM cruise loads ease but still run weekly.',
  NULL,
  'March in Kadmat is the soft-landing month. Daytime 26-32C, water 28-29C, lagoon viz holds at 28-30m, humidity climbing from 70 to 78 percent across the month. Kadmat Beach Resort lists shoulder-rate packages from week two — 20-25 percent off February peak, often bundled with two free dives. SPORTS-administered cottages have walk-in availability inside the 7-day window. The Lacadives dive school continues at full capacity; specialty courses (deep, drift, navigation) remain on offer. The SAMUDRAM cruise from Kochi runs near-full but its off-peak loading from late March means resort-only travelers get a quieter island. The 8km lagoon stays flat from 6am to noon; afternoon onshore breeze picks up in the last week. Permit lead drops slightly to 25-35 days as the application flow eases. Snorkel hire from the resort or village shop near the jetty: ₹150-200 per day, deposit ₹500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 4, 3, 'go',
  'Pre-monsoon. 28-33C, humidity 80%. Lagoon still calm but heat dictates schedule. Resort 30% off January peak.',
  'April still works on Kadmat for divers willing to structure water-time around the heat. Resort rates run 30 percent off peak. Dive viz holds at 25m. SAMUDRAM cruise reduces frequency from mid-month. The trade-off is mid-day humidity that pushes you off the 8km beach.',
  NULL,
  'April in Kadmat is operationally clean but warmer than the comfort zone. Air 28-33C, water 28-29C, humidity at 80 percent — the 8km beach radiates heat from 11am, and the only viable mid-day plan is the lagoon itself. Kadmat Beach Resort rates run 30 percent off January peak; SPORTS huts go to year-low. The Lacadives dive school runs full programme — early-morning two-tank dives become the standard schedule. Power cuts get more frequent pre-monsoon — 2-3 hour daytime outages aren''t unusual at the resort, and the budget SPORTS huts without inverters go dark. The SAMUDRAM cruise reduces frequency from mid-month as Kochi-departure loads fall. Inter-island speedboats to Agatti or Kavaratti run on weather-dependent schedules. Permit applications from April for May arrivals get processed faster (15-25 days) as flow drops, but the May window itself becomes the constraint. Lock the first three weeks; the last week starts losing reliability.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 5, 2, 'wait',
  'Late pre-monsoon. 28-33C. Resort closes around May 15. SAMUDRAM cruise paused. Lock the first 10 days only.',
  'Early May is the last narrow Kadmat window. Kadmat Beach Resort typically closes around May 15 ahead of the SW monsoon. SAMUDRAM cruise pauses around the same date. Inter-island speedboat to Agatti unreliable from second week.',
  'May 15 onward Kadmat Beach Resort closes for the season — accommodation drops to a few SPORTS huts on a thin operating schedule. SAMUDRAM cruise paused. Dive school shut. The next reliable window is October.',
  'May in Kadmat is the closing-down month. Kadmat Beach Resort typically closes around May 15 ahead of the SW monsoon onset. The Lacadives dive school takes its first closed weeks. SAMUDRAM cruise pauses — MV Kavaratti and MV Lakshadweep Sea both go in for monsoon refit. Until those dates, conditions hold from late April: 28-33C, humidity 80 percent, lagoon calm in the morning with afternoon chop after May 5-7. Dive viz drops from 25m at month-start to 18-20m at closure. The resort''s seasonal-closure rate (offered for the last 5 nights pre-shutdown) goes 50-55 percent below January peak. Permit applications for May 15 onward dates get rejected outright. The next reliable Kadmat window is October. Lock the first 10 days or wait. SPORTS huts technically stay open longer but the dive infrastructure isn''t there to support a worthwhile trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 6, 1, 'skip',
  'SW monsoon. Resort closed. SAMUDRAM paused. 350-400mm rain. Skip.',
  NULL,
  'June is full SW monsoon. Kadmat Beach Resort is closed, SAMUDRAM cruise paused, no dive operations. Permits not issued for June arrivals. Wait for late September re-opening or October.',
  'June on Kadmat is the chain at full lockdown. Kadmat Beach Resort has been closed since around May 15 and stays shuttered until late September. The SAMUDRAM cruise from Kochi is paused for the season — both MV Kavaratti and MV Lakshadweep Sea are in for refit. The Lacadives dive school is shut. Inter-island speedboats are dry-docked. Air 25-28C, rainfall 350-400mm across the month, sustained 35-knot winds, sea state too rough for any commercial sailing. Lakshadweep Tourism doesn''t issue tourist permits for June arrivals to any island; the office begins processing September-onward applications mid-month. The few residents in Kadmat village wait it out. The next viable arrival window is the resort''s September re-opening, typically September 25-30. The cleanest planning move from June is to lock October dates and submit the permit application now via lakshadweeptourism.com.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 7, 1, 'skip',
  'Peak monsoon. Resort closed. 380-450mm rain. No permits issued. Skip.',
  NULL,
  'July is the wettest month at Kadmat. Resort closed, dive school shut, SAMUDRAM cruise paused, no permits issued for July arrivals. The trip cannot happen. Pick October-November or December-March.',
  'July on Kadmat is monsoon at its most stubborn. Rainfall averages 380-450mm across 26-28 wet days, sustained westerly winds pump 4-6 metre swells onto the western reef wall, and even Coast Guard supply boats reach the cluster on a thin schedule. Kadmat Beach Resort remains closed. The Lacadives dive school is offline. SAMUDRAM cruise paused. Lakshadweep Tourism issues no tourist permits for July arrivals. Air 25-28C, humidity above 90 percent, BSNL tower goes intermittent on storm days. The visitor stack — accommodation, diving, transport — is wholly offline. The first viable arrival window is the third week of September, contingent on the SW monsoon retreating on schedule, and even those bookings are conditional on weather. The cleanest planning move from July is to lock October-November dates and submit the permit application now.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 8, 1, 'skip',
  'Monsoon continues. Resort closed. 300-400mm rain. Aug 15 brings security tightening. Skip.',
  NULL,
  'August is the second-wettest month. Kadmat Beach Resort still closed; SAMUDRAM still paused. Aug 15 brings chain-wide security tightening. The trip does not work. Wait for late September or October.',
  'August on Kadmat is more of July with marginally fewer wet days. Rainfall sits at 300-400mm, the resort remains closed, the dive school is offline. Inter-island boats are dry-docked. The SAMUDRAM cruise from Kochi is paused. The standout calendar item is August 15 — Independence Day — when no tourist landings happen on any inhabited Lakshadweep island regardless of weather. Kadmat Beach Resort''s September re-opening date typically gets confirmed in the second week of August once the monsoon retreat trajectory becomes clear. SAMUDRAM cruise schedules for the Sep-onward season also get released around then. The cleanest planning move from August is to hold late-October dates for the post-re-opening shoulder window, when rates run 25-30 percent below the December peak and conditions are dramatically more reliable than September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 9, 2, 'wait',
  'Resort re-opens around Sep 25-30. Last week only. 200-250mm rain mostly first half. Conditional on weather.',
  'September is the closing edge of monsoon. Kadmat Beach Resort re-opens around September 25-30, contingent on SW monsoon retreating on schedule. Last-week arrivals possible but conditional. SAMUDRAM cruise resumes from end-September. October is far cleaner.',
  'September is half-monsoon, half-recovery. Kadmat Beach Resort doesn''t re-open until the last week. Two extra weeks of patience converts a tentative trip into a clean October one with the same shoulder-season rates.',
  'September on Kadmat is the closing edge of the off-season. Kadmat Beach Resort re-opens around September 25-30, contingent on the SW monsoon retreating on schedule. SAMUDRAM cruise from Kochi resumes from end-September. The Lacadives dive school re-opens with reduced staff at 60 percent capacity. Rainfall in the second fortnight drops to 60-80mm, daytime 26-30C, water 28-29C, lagoon viz recovering through 15-20m. The 8km beach is at its emptiest. Lakshadweep Tourism starts issuing permits for late-September arrivals from August 15 — apply 30-45 days ahead. The single ATM near the jetty resumes service with the resort. Workable only if dates are absolute, you can absorb a 5-7 day re-opening delay, and you''re comfortable with the soft-launch operating capacity. October 5 onward delivers materially better conditions for the same money.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 10, 4, 'go',
  'Season opens. 100-150mm rain mostly first week. 25-31C. Resort 70% capacity, dive viz back to 25m+.',
  'October is the proper Kadmat season opener. Resort runs at 70-80 percent capacity, dive viz climbs to 25-28m by mid-month, SAMUDRAM cruise resumes weekly. Shoulder-season rates run 25-30 percent below December peak. The smart traveler''s window.',
  NULL,
  'October on Kadmat is the post-monsoon clean window. Rainfall drops to 100-150mm, mostly in the first week, then most of the back half is dry. Air 25-31C, water 28-29C, humidity 78-82 percent and falling. Kadmat Beach Resort runs at 70-80 percent occupancy from October 5; dive viz climbs from 18-20m at month-start to 25-28m by month-end. SAMUDRAM cruise from Kochi resumes its weekly schedule with Kadmat as a standard 1-2 day stop. The Lacadives dive school re-opens its full programme — open-water and specialty courses both available. Inter-island speedboats to Agatti and Kavaratti run on weather-dependent schedules through the first fortnight, normalising by month-end. Shoulder-season rates run 25-30 percent below the December peak. Permit lead drops back toward 20-30 days as the application flow normalises. Bay of Bengal cyclones occasionally form but track north-east toward Odisha and rarely reach Lakshadweep.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 11, 5, 'go',
  'Peak builds. 50-80mm rain. 23-30C. Resort at 90% occupancy. SAMUDRAM cruise full. Dive school at capacity.',
  'November is Kadmat at full operational form. NE monsoon largely misses the chain — rainfall under 80mm, lagoon flat, dive viz at 30m. Resort hits 90 percent occupancy, SAMUDRAM cruise sells out 30-45 days ahead. Strong call for divers and first-time visitors.',
  NULL,
  'November on Kadmat is properly back in business. The northeast monsoon hammers the Coromandel coast but largely sidesteps the Lakshadweep chain — rainfall stays under 80mm, the Arabian Sea flattens out, dive visibility at the deeper Bird Reef site holds 28-32m. Air 23-30C, water 27-28C. Kadmat Beach Resort sits at 90 percent occupancy; bookings need to be in 30-45 days ahead. SAMUDRAM cruise from Kochi sells out 30-45 days ahead — bundled-package travelers get permit, transport, and accommodation in a single booking which makes November one of the easier months to enter the chain. The Lacadives dive school operates at full capacity; the four-day open-water course runs continuously. Permit applications for late-November and December dates need to be in 35-45 days early. The 8km lagoon stays flat from 6am to noon. ATM near the jetty processes more cash but still goes dry by Sunday. Carry ₹20,000-25,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kadmat', 12, 5, 'go',
  'Peak. 22-29C, dry, viz 30-35m. Christmas-NY 50% premium. Resort sold out. SAMUDRAM books 60 days out.',
  'December is when Kadmat delivers the peak chain experience. Stable seas, 30-35m viz, full operator capacity. Christmas-NY drives a 50 percent premium and complete sell-out — SAMUDRAM cruise books out 60 days ahead, resort 45-50 days ahead.',
  NULL,
  'December on Kadmat is the year''s most reliable diving window. Air 22-29C, water 26-28C, lagoon viz 30-35m, rainfall under 25mm scattered across the month. Kadmat Beach Resort hits 100 percent occupancy from December 22 to January 5 with a 50 percent premium on the standard peak rate. SAMUDRAM cruise from Kochi sells out 60 days ahead for Christmas-NY week — the bundled package is often the only practical entry route for December dates. Permit applications for December 20 to January 2 arrivals need to be in 45-50 days early. The Lacadives dive school is at capacity — book the open-water course at the time of resort or cruise booking, not at check-in. Inter-island speedboats to Agatti and Kavaratti run multiple legs daily but seats are tight. ATM near the jetty goes dry by Saturday from Christmas onward. Carry ₹25,000-30,000 cash. Dry island; no alcohol stock anywhere on Kadmat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- KAVARATTI - 12 months (UT capital, mosques, museum, ferry hub)
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 1, 5, 'go',
  'Peak window. 24-30C, lagoon flat, ferry hub fully active. Capital admin offices hand out permits for onward.',
  'January is Kavaratti at full administrative-and-tourist function. The UT capital handles permit-stamping for arrivals, the Marine Aquarium and Ujra Mosque are fully open, and the Marine Museum is staffed. SPORTS huts and Kavaratti Beach Resort book out 30-45 days ahead.',
  NULL,
  'Kavaratti in January is the chain''s administrative hub at its most active. Daytime 24-30C, water 26-28C, lagoon viz 25-30m, the 4.2km island running the chain''s densest civic infrastructure — UT Administrator''s office, Lakshadweep Tourism HQ, the high court, and the Ujra Jamia Mosque (the chain''s largest, 17th-century coral-stone construction). Kavaratti Beach Resort and the SPORTS-administered cottages handle most of the tourist accommodation; both book out 30-45 days ahead. The Marine Aquarium (open 9am-5pm Tuesday to Sunday) and Marine Museum are fully staffed. Access is via the SAMUDRAM cruise from Kochi (4-5 day package, MV Kavaratti or MV Lakshadweep Sea, Kavaratti is the chain''s primary stop) or by inter-island ferry from Agatti (4-5 hours, weather-dependent). No airstrip on Kavaratti — flights land at Agatti only. The single ATM works but goes dry by Sunday. BSNL 2G; no Jio or Airtel. Carry ₹20,000 cash. Dry island; alcohol on Bangaram only. Friday 12-2pm: mosques close to non-Muslim visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 2, 5, 'go',
  'Driest month. 24-31C. Kavaratti Beach Resort and SPORTS huts both full. Marine Museum and Aquarium open.',
  'February is Kavaratti''s most stable weather window. Lagoon glassed-over, viz at 30m, scuba ops running daily. Friday-noon mosque closures and the Republic Day calendar (Jan 26 carries over into early Feb on island) are the only operational frictions.',
  NULL,
  'February in Kavaratti is the cleanest civic-and-water month of the year. Rainfall under 8mm, daytime 24-31C, water 27-28C, lagoon viz at 28-30m. Kavaratti Beach Resort and SPORTS huts both run at full occupancy. The Marine Aquarium runs full hours Tuesday to Sunday; the Marine Museum 9am-5pm. Ujra Jamia Mosque opens to non-Muslim visitors outside of prayer times — Friday noon to 2pm closure is strict. The chain''s scuba operation runs daily dives at the Kavaratti reef wall (12-18m, viz 28-32m) and the eastern slope. SAMUDRAM cruise from Kochi includes Kavaratti as the chain''s primary anchorage; cruise loads run near-full but the 4.2km island absorbs the foot traffic well. Inter-island ferries to Agatti, Kadmat, and Minicoy run weekly slots — the schedule is published 7-10 days ahead and shifts on weather. Permit applications need to be in 30-45 days early. Carry the original sponsor letter; the jetty police and the UT admin office both inspect at arrival.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 3, 4, 'go',
  'Last cool window. 26-32C. Resort lists shoulder packages 20-25% off. Watch for Eid date — mosques close.',
  'March extends February conditions with quieter floors. Resort and SPORTS rates discount 20-25 percent. Eid (date varies; check Hijri calendar) closes the mosques and most government offices to outsiders for 1-2 days. Friday afternoon mosque closures continue.',
  NULL,
  'March in Kavaratti is the soft-landing month with one variable Eid date to watch. Daytime 26-32C, water 28-29C, lagoon viz holds at 25-28m, humidity climbing from 70 to 78 percent. Kavaratti Beach Resort lists shoulder-rate packages from week two — 20-25 percent off February peak. SPORTS-administered cottages have walk-in availability. The chain''s scuba operation runs full programme. Eid dates shift annually with the Hijri calendar — check the date before booking, as the Ujra Jamia Mosque, Marine Aquarium and Marine Museum all close to outside visitors for 1-2 days around Eid, and the ferry schedule sometimes adjusts. Friday 12-2pm mosque closures are routine year-round. The SAMUDRAM cruise from Kochi runs near-full capacity but March anchorages are quieter than February — the 4.2km island is at its most walkable. Permit lead drops slightly to 25-35 days. The single ATM still goes dry by Sunday afternoon.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 4, 3, 'go',
  'Pre-monsoon. 28-33C, humidity 80%. Lagoon calm but heat dictates. Resort 30% off. Watch Ramzan/Eid dates.',
  'April still works on Kavaratti for early-morning water-time and indoor admin-and-museum afternoons. Resort rates 30 percent off January. Power cuts run 2-3 hours afternoons. Ramzan/Eid-ul-Fitr dates shift annually — confirm before booking; mosque and govt closures common.',
  NULL,
  'April in Kavaratti is operationally clean but warmer than the comfort zone. Air 28-33C, water 28-29C, humidity at 80 percent. Kavaratti Beach Resort runs 30 percent off January rates; SPORTS huts at year-low. The chain''s scuba operation runs early-morning two-tank dives as the standard schedule. Power cuts run 2-3 hours daytime — the resort has inverters, SPORTS huts mostly don''t. The Ramzan/Eid-ul-Fitr window shifts annually with the Hijri calendar — Eid often falls in April or early May. Around the Eid window, the Ujra Jamia Mosque, Marine Aquarium, Marine Museum, UT admin office and most public services close for 2-3 days, and ferry schedules adjust. Friday 12-2pm mosque closures continue. Inter-island ferries to Agatti, Kadmat, and Minicoy run on a thinning weather-dependent schedule. The SAMUDRAM cruise reduces frequency from mid-month. Lock the first three weeks; check Eid dates before booking the last week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 5, 2, 'wait',
  'Late pre-monsoon. 28-33C. Resort closes around May 15. SAMUDRAM paused. Eid-ul-Fitr often this month.',
  'Early May is the last narrow Kavaratti window. Kavaratti Beach Resort typically closes around May 15. SAMUDRAM cruise pauses. Eid-ul-Fitr (variable date) often falls in early May, closing mosques and govt offices for 2-3 days.',
  'May 15 onward Kavaratti Beach Resort closes; SAMUDRAM paused; ferries unreliable. Eid-ul-Fitr this month frequently shuts the chain''s administrative core for 2-3 days. The next reliable window is October.',
  'May in Kavaratti is the closing-down month with one variable Eid window. Kavaratti Beach Resort typically closes around May 15 ahead of the SW monsoon. SAMUDRAM cruise pauses around the same date. Eid-ul-Fitr (variable Hijri date, often in early May) closes the Ujra Jamia Mosque, Marine Aquarium, Marine Museum, and most government offices for 2-3 days; the day-of-Eid is the most observed and ferry schedules adjust. Until the resort closure, conditions hold from late April: 28-33C, humidity 80 percent, lagoon calm in the morning with afternoon chop after May 5-7. Dive viz drops from 25m at month-start to 18-20m at closure. The resort''s seasonal-closure rate runs 50-55 percent below January peak. Permit applications for May 15 onward dates get rejected outright. SPORTS huts technically stay open longer but the dive school and ferry connections break down. The next reliable Kavaratti window is October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 6, 1, 'skip',
  'SW monsoon. Resort closed. SAMUDRAM paused. 350-400mm rain. Skip.',
  NULL,
  'June is full SW monsoon. Kavaratti Beach Resort closed, SAMUDRAM paused, no scuba operations. Permits not issued for June. Even the local administrative offices run on skeleton schedules. Wait for October.',
  'June on Kavaratti is the chain at full lockdown. Kavaratti Beach Resort has been closed since around May 15 and stays shuttered until late September. SAMUDRAM cruise paused — both MV Kavaratti and MV Lakshadweep Sea are in for refit. The chain''s scuba operation is shut. Inter-island ferries are dry-docked. The UT administrative offices technically function but on monsoon-light schedules; even the public Marine Aquarium and Marine Museum reduce hours through July-August. Air 25-28C, rainfall 350-400mm, sustained 35-knot winds. Lakshadweep Tourism doesn''t issue tourist permits for June arrivals to any island. The 11,000-strong residential population of Kavaratti waits the season out — the supply boats from Kochi run weekly at best. The next viable arrival window is the resort''s September re-opening, typically September 25-30, contingent on the SW monsoon retreating on schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 7, 1, 'skip',
  'Peak monsoon. Resort closed. 380-450mm rain. No permits. Bakri Eid sometimes this month — local closures.',
  NULL,
  'July is the wettest month at Kavaratti. Resort closed, SAMUDRAM paused, no permits issued. Bakri Eid often falls this month (variable Hijri date) — additional 2-3 day closure of mosques and govt offices for residents. Wait for October.',
  'July on Kavaratti is monsoon at its most stubborn. Rainfall averages 380-450mm across 26-28 wet days. Kavaratti Beach Resort remains closed; SAMUDRAM cruise paused; the chain''s scuba operation is offline. Lakshadweep Tourism issues no tourist permits for July arrivals. Bakri Eid (Eid-ul-Adha, variable Hijri date, often falls in July or August) brings an additional 2-3 day closure of the Ujra Jamia Mosque, Marine Aquarium, Marine Museum, and UT admin offices — for the resident population only, since no tourists are on the island. Air 25-28C, humidity above 90 percent, BSNL tower goes intermittent on storm days. The 4.2km island reverts almost entirely to its resident community. The next viable arrival window is the third week of September, contingent on the SW monsoon retreating on schedule. The cleanest planning move from July is to lock October-November dates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 8, 1, 'skip',
  'Monsoon continues. Resort closed. 300-400mm rain. Aug 15 chain-wide security tightening. Skip.',
  NULL,
  'August is the second-wettest month. Kavaratti Beach Resort still closed; SAMUDRAM still paused. Aug 15 brings chain-wide security tightening. Bakri Eid sometimes falls this month, adding mosque and admin closures. Wait for late September or October.',
  'August on Kavaratti is more of July with marginally fewer wet days. Rainfall sits at 300-400mm, the resort remains closed, the scuba operation is offline. Inter-island ferries are dry-docked. SAMUDRAM cruise paused. The standout calendar item is August 15 — Independence Day — when no tourist landings happen on any inhabited Lakshadweep island regardless of weather, and the UT administrative core in Kavaratti runs a security-tightened schedule. Bakri Eid (variable Hijri date) sometimes falls in August, adding 2-3 days of mosque and admin office closures for residents. Kavaratti Beach Resort''s September re-opening date typically gets confirmed in the second week of August. SAMUDRAM cruise schedules for the Sep-onward season also get released around then. The cleanest planning move from August is to hold late-October dates for the post-re-opening shoulder window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 9, 2, 'wait',
  'Resort re-opens around Sep 25-30. Last week only. 200-250mm rain mostly first half. Conditional on weather.',
  'September is the closing edge of monsoon. Kavaratti Beach Resort re-opens around Sep 25-30, contingent on monsoon retreating on schedule. SAMUDRAM cruise resumes from end-September. October is far cleaner.',
  'September is half-monsoon, half-recovery. Kavaratti Beach Resort doesn''t re-open until the last week. Two extra weeks of patience converts a tentative trip into a reliable October one with same shoulder-season rates.',
  'September on Kavaratti is the closing edge of the off-season. Kavaratti Beach Resort re-opens around September 25-30, contingent on the SW monsoon retreating on schedule. SAMUDRAM cruise from Kochi resumes from end-September. The chain''s scuba operation re-opens with reduced staff at 60 percent capacity. Rainfall in the second fortnight drops to 60-80mm, daytime 26-30C, water 28-29C, lagoon viz recovering through 15-20m. The Marine Aquarium and Marine Museum return to full hours from October 1; through September they run on shorter monsoon schedules. Lakshadweep Tourism starts issuing permits for late-September arrivals from August 15 — apply 30-45 days ahead. The single ATM resumes service with the resort. Inter-island ferries to Agatti, Kadmat, and Minicoy restart on a thin weather-dependent schedule. Workable only if dates are absolute and you can absorb a 5-7 day re-opening delay.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 10, 4, 'go',
  'Season opens. 100-150mm rain mostly first week. 25-31C. Resort 70% capacity, dive viz back to 25m+.',
  'October is the proper Kavaratti season opener. Resort runs at 70-80 percent capacity, scuba viz climbs to 25-28m by mid-month, SAMUDRAM cruise resumes weekly. Marine Aquarium and Museum back to full hours. Shoulder-season rates run 25-30 percent below December peak.',
  NULL,
  'October on Kavaratti is the post-monsoon clean window. Rainfall drops to 100-150mm, mostly in the first week, then most of the back half is dry. Air 25-31C, water 28-29C, humidity 78-82 percent and falling. Kavaratti Beach Resort runs at 70-80 percent occupancy from October 5; scuba viz climbs from 18-20m at month-start to 25-28m by month-end. The Marine Aquarium and Marine Museum return to full Tuesday-to-Sunday hours from October 1. SAMUDRAM cruise from Kochi resumes its weekly schedule with Kavaratti as the chain''s primary anchorage. The chain''s scuba operation re-opens its full programme. Inter-island ferries to Agatti, Kadmat, and Minicoy run weekly but on weather-dependent days through the first fortnight, normalising by month-end. Shoulder-season rates run 25-30 percent below the December peak. The 4.2km island is at its most walkable — capital lanes plus the beach plus the Ujra Mosque all within 30-45 minutes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 11, 5, 'go',
  'Peak builds. 50-80mm rain. 23-30C. Resort 90% occupancy, SAMUDRAM full. Civic infra at full function.',
  'November is Kavaratti at full operational form. NE monsoon largely misses the chain — rainfall under 80mm, lagoon flat, scuba viz at 30m. Resort hits 90 percent occupancy, SAMUDRAM cruise sells out 30-45 days ahead, Marine Aquarium and Museum at full programme.',
  NULL,
  'November on Kavaratti is properly back in business. The northeast monsoon hammers the Coromandel coast but largely sidesteps the Lakshadweep chain — rainfall stays under 80mm, the Arabian Sea flattens out, scuba visibility at the Kavaratti reef wall holds 28-32m. Air 23-30C, water 27-28C. Kavaratti Beach Resort sits at 90 percent occupancy; bookings need to be in 30-45 days ahead. SAMUDRAM cruise from Kochi sells out 30-45 days ahead. The chain''s scuba operation operates at full capacity. The Marine Aquarium and Marine Museum run their full Tuesday-to-Sunday hours; the Ujra Jamia Mosque opens to non-Muslim visitors outside prayer times (Friday noon-2pm closure stays). Permit applications for late-November and December dates need to be in 35-45 days early. Inter-island ferries to Agatti, Kadmat, and Minicoy run weekly stable schedules. ATM goes dry by Sunday. Carry ₹20,000-25,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kavaratti', 12, 5, 'go',
  'Peak. 22-29C, dry, viz 30-35m. Christmas-NY 50% premium. Resort sold out. Republic Day calendar shifts.',
  'December is when Kavaratti delivers the peak chain experience plus full civic-tour function. Stable seas, 30-35m viz, museums at full hours, mosque access reliable. Christmas-NY drives a 50 percent premium and complete sell-out — book 60 days ahead minimum.',
  NULL,
  'December on Kavaratti is the year''s most reliable hub-island window. Air 22-29C, water 26-28C, lagoon viz 30-35m, rainfall under 25mm. Kavaratti Beach Resort hits 100 percent occupancy from December 22 to January 5 with a 50 percent premium. SAMUDRAM cruise from Kochi sells out 60 days ahead. Permit applications for December 20 to January 2 arrivals need to be in 45-50 days early. The chain''s scuba operation is at capacity. Marine Aquarium and Marine Museum run their full peak hours. The Ujra Jamia Mosque sees the year''s highest non-Muslim visitor flow — go outside Friday 12-2pm and outside the five daily prayer windows. Inter-island ferries to Agatti, Kadmat, and Minicoy run multiple legs weekly but seats are tight. Republic Day (Jan 26) load builds from late December — government delegations and domestic-tourism programmes start arriving. ATM goes dry by Saturday from Christmas onward. Carry ₹25,000-30,000 cash.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- MINICOY - 12 months (southernmost, Mahl-speaking, lighthouse, distinct culture)
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 1, 5, 'go',
  'Peak window. 24-29C, lagoon flat, ferry from Kavaratti runs 12-14 hours. Mahl-speaking community, distinct culture.',
  'January is Minicoy at full form. The 200km-south-of-Kavaratti island runs on Mahl (Maldivian Dhivehi-related language) rather than Malayalam — the cultural break is real. Minicoy Lighthouse (1885 British-built) is climbable on weekday mornings. Tuna-pole-fishing boats run from the southern jetty.',
  NULL,
  'Minicoy in January is the chain''s most culturally distinct island at peak conditions. Daytime 24-29C, water 26-28C, lagoon viz 25-30m, the 4.4km crescent island sitting 200km south of the main Lakshadweep cluster — closer to the Maldives than to Kavaratti. Minicoy''s 10,000-strong population speaks Mahl (a Maldivian Dhivehi-related language), not Malayalam; women dance the Lava on festival days; village ovwa (huts) and ata (athali) social structures hold. Access is via SAMUDRAM cruise from Kochi (4-5 day package, Minicoy is the southernmost stop) or by inter-island ferry from Kavaratti (12-14 hours, weekly slot, weather-dependent). No airstrip on Minicoy. The Minicoy Lighthouse — 1885 British-built, 60m granite tower — is climbable on weekday mornings 10-11am with a small fee at the lighthouse keeper''s gate. Tuna-pole-fishing boats run from the southern jetty 4-7am. Single ATM in the village goes dry by Sunday. BSNL 2G, intermittent. Carry ₹15,000 cash. Dry island; alcohol on Bangaram only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 2, 5, 'go',
  'Driest month. 24-30C. SAMUDRAM cruise runs near-full. Lighthouse + tuna fleet + southern lagoon all in play.',
  'February is Minicoy''s most operationally stable window. Lagoon viz at 30m, Minicoy Tourist Lodge fully open, SAMUDRAM cruise anchorage running near-full. The 200km southern detour from the main chain takes a full day each way — plan minimum 4-5 nights to make sense.',
  NULL,
  'February in Minicoy is the year''s most stable weather window on the chain''s southernmost outlier. Rainfall under 8mm, daytime 24-30C, water 27-28C, lagoon viz at 28-30m. The Minicoy Tourist Lodge (the SPORTS-administered budget option, 20-odd rooms) and the small private guesthouses run at near-full occupancy. SAMUDRAM cruise from Kochi includes Minicoy as the southernmost anchorage on the 4-5 day route — the cruise typically lays over 1-2 days here. Inter-island ferry from Kavaratti runs weekly (12-14 hours each way, weather-dependent); the 200km southern detour means a Minicoy add-on to a Kavaratti trip costs at least 3 full days of transit. The Minicoy Lighthouse is open 10-11am weekday mornings — climb it for the chain''s widest 360-degree view. Tuna-pole-fishing fleet leaves the southern jetty 4-7am; visitors can ride out on a SPORTS-arranged boat (₹2,000-3,000 per head, advance request). Mahl-speaking community; English and Malayalam work in admin contexts but villager interactions need patience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 3, 4, 'go',
  'Last cool window. 26-32C. SAMUDRAM still weekly. Watch Eid date — local closures, ferry schedule shifts.',
  'March extends February conditions on Minicoy. Tourist Lodge has walk-in rooms most weeks. SAMUDRAM cruise still weekly. Eid (variable Hijri date) closes the Mahl-speaking community for 2-3 days; ferry schedule from Kavaratti adjusts.',
  NULL,
  'March in Minicoy is the soft-landing month on the chain''s southernmost island. Daytime 26-32C, water 28-29C, lagoon viz holds at 25-28m, humidity climbing from 70 to 78 percent. Minicoy Tourist Lodge has walk-in rooms most weeks — the SPORTS rate (₹3,500-5,000 per night) sits well below the chain''s resort norms. SAMUDRAM cruise from Kochi runs weekly through March, with Minicoy as the southernmost 1-2 day anchorage. Inter-island ferry from Kavaratti remains weekly (12-14 hours each way, weather-dependent). Eid-ul-Fitr dates shift annually with the Hijri calendar — check before booking, as the Mahl-speaking community runs a 2-3 day social shutdown around Eid (more tightly observed than on Kavaratti or Agatti), and the ferry schedule from Kavaratti adjusts. Friday noon-to-2pm mosque closures continue. The Minicoy Lighthouse climb stays open weekday mornings. Tuna-pole-fishing boats run earlier as water warms — fleet typically leaves by 4am.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 4, 3, 'go',
  'Pre-monsoon. 28-33C, humidity 80%. Tourist Lodge 30% off. SAMUDRAM trims frequency. Eid often this month.',
  'April still works on Minicoy for travelers comfortable with heat and Mahl-speaking village rhythms. Tourist Lodge rates 30 percent off. SAMUDRAM cruise reduces frequency from mid-month. Eid often falls in April — confirm date before booking ferry-dependent dates.',
  NULL,
  'April in Minicoy is operationally clean but warmer. Air 28-33C, water 28-29C, humidity at 80 percent — the 4.4km crescent island radiates heat from 11am, and the southern lagoon becomes the only viable mid-day option. Minicoy Tourist Lodge rates run 30 percent off January peak. SAMUDRAM cruise from Kochi reduces frequency from mid-month as Kochi-departure loads fall. Inter-island ferry from Kavaratti runs on a thinning weather-dependent schedule. Power cuts run 2-3 hours daytime — the Tourist Lodge has inverters, smaller homestays mostly don''t. Eid-ul-Fitr (variable Hijri date) often falls in April, closing the Mahl-speaking community and most public services for 2-3 days; ferry schedules adjust. The Minicoy Lighthouse climb stays open weekday mornings outside the Eid window. Tuna fleet still leaves 4am. Lock the first three weeks; check Eid dates and ferry sailings before booking the last week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 5, 2, 'wait',
  'Late pre-monsoon. 28-33C. Tourist Lodge season-end mid-May. SAMUDRAM paused. Ferry from Kavaratti unreliable.',
  'Early May is the last narrow Minicoy window. Tourist Lodge typically reduces capacity around May 10-15. SAMUDRAM cruise pauses mid-month. The 12-14 hour ferry from Kavaratti runs on a thin schedule. Eid-ul-Fitr often this month.',
  'May 15 onward Minicoy''s tourist infrastructure winds down — Tourist Lodge reduces, SAMUDRAM paused, Kavaratti ferry unreliable, fishing fleet shifts to monsoon mode. Eid-ul-Fitr often shuts the community for 2-3 days. The next reliable window is October.',
  'May in Minicoy is the closing-down month on the chain''s southernmost island. Minicoy Tourist Lodge typically reduces capacity around May 10-15 ahead of the SW monsoon. SAMUDRAM cruise pauses around the same date. Inter-island ferry from Kavaratti drops to one final sailing per fortnight, weather-dependent. Tuna-pole-fishing fleet shifts to monsoon mode — fewer boats out, smaller catches. Until those dates, conditions hold from late April: 28-33C, humidity 80 percent, lagoon calm in the morning with afternoon chop after May 5-7. Dive viz drops from 25m at month-start to 18-20m at season-end. Eid-ul-Fitr (variable Hijri date) often falls in May, shutting the Mahl-speaking community for 2-3 days. Permit applications for May 15 onward dates get rejected outright. The next reliable Minicoy window is October. The 200km southern detour from the main chain becomes a no-go from mid-May until early October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 6, 1, 'skip',
  'SW monsoon. Tourist Lodge closed. SAMUDRAM paused. 350-400mm rain. 200km southern transit too rough. Skip.',
  NULL,
  'June is full SW monsoon. Minicoy Tourist Lodge closed. SAMUDRAM paused. Inter-island ferry from Kavaratti suspended — the 200km southern transit is dangerously rough. Permits not issued. Wait for October.',
  'June on Minicoy is full lockdown. Minicoy Tourist Lodge has been closed since around May 15 and stays shuttered until late September. SAMUDRAM cruise paused. Inter-island ferry from Kavaratti is suspended — the 200km southern transit through open Arabian Sea is too rough for the smaller weather-windowed sailings. Air 25-28C, rainfall 350-400mm, sustained 35-knot winds. The tuna-pole-fishing fleet shifts entirely to its monsoon storm-anchored pattern; commercial fishing collapses to 20 percent of December-March volumes. Lakshadweep Tourism doesn''t issue tourist permits for June arrivals to any island, and Minicoy specifically becomes unreachable from any mainland or chain port. The 10,000-strong Mahl-speaking community runs on supply boats from Kochi that maintain a roughly fortnightly schedule. The next viable arrival window is the Tourist Lodge re-opening, typically late September, contingent on the SW monsoon retreating on schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 7, 1, 'skip',
  'Peak monsoon. Tourist Lodge closed. 380-450mm rain. No permits. Bakri Eid sometimes this month. Skip.',
  NULL,
  'July is the wettest month at Minicoy. Tourist Lodge closed, SAMUDRAM paused, no permits issued. Bakri Eid often falls this month, adding community closures (relevant for residents only). Wait for October.',
  'July on Minicoy is monsoon at its most stubborn. Rainfall averages 380-450mm across 26-28 wet days, the open Arabian Sea between Minicoy and Kavaratti runs 4-6 metre swells, and even Coast Guard supply boats reach the island on a thin fortnightly schedule. Minicoy Tourist Lodge remains closed. SAMUDRAM cruise paused. Inter-island ferry suspended. Lakshadweep Tourism issues no tourist permits for July arrivals. Bakri Eid (Eid-ul-Adha, variable Hijri date) often falls in July or August — observed by the Mahl-speaking community with a 2-3 day social shutdown, but with no tourists on the island it''s a residents-only matter. Air 25-28C, humidity above 90 percent, BSNL tower goes intermittent on storm days. The tuna fleet stays storm-anchored. The next viable arrival window is the Tourist Lodge re-opening, typically late September. The cleanest planning move from July is to lock October-November dates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 8, 1, 'skip',
  'Monsoon continues. Tourist Lodge closed. 300-400mm rain. Aug 15 chain-wide security tightening. Skip.',
  NULL,
  'August is the second-wettest month. Minicoy Tourist Lodge still closed; SAMUDRAM paused; ferry suspended. Aug 15 chain-wide security tightening. Bakri Eid sometimes this month. Wait for late September or October.',
  'August on Minicoy is more of July with marginally fewer wet days. Rainfall sits at 300-400mm, the Tourist Lodge remains closed, the inter-island ferry stays suspended, SAMUDRAM cruise paused. The standout calendar item is August 15 — Independence Day — when no tourist landings happen on any inhabited Lakshadweep island regardless of weather, and Minicoy specifically observes a security-tightened schedule for residents. Bakri Eid (variable Hijri date) sometimes falls in August, adding 2-3 days of community closures for residents only. Minicoy Tourist Lodge''s late-September re-opening date typically gets confirmed in the second week of August; SAMUDRAM cruise schedules for the Sep-onward season also get released around then. The cleanest planning move from August is to hold late-October dates for the post-re-opening shoulder window when the 200km southern transit becomes reliable again.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 9, 2, 'wait',
  'Tourist Lodge re-opens late Sep. Last week only. 200-250mm rain mostly first half. Conditional on weather.',
  'September is the closing edge of monsoon. Minicoy Tourist Lodge re-opens late September, contingent on monsoon retreating. SAMUDRAM cruise resumes from end-September. The 200km Kavaratti-Minicoy ferry restart is conditional. October is far cleaner.',
  'September is half-monsoon, half-recovery. Minicoy Tourist Lodge doesn''t re-open until the last week and the 200km southern ferry restart is conditional on weather. October offers a far cleaner window with two extra weeks of certainty and the same shoulder-season rates.',
  'September on Minicoy is the closing edge of the off-season on the chain''s southernmost outlier. Minicoy Tourist Lodge re-opens late September (typically September 28-30), contingent on the SW monsoon retreating on schedule. SAMUDRAM cruise from Kochi resumes from end-September with Minicoy added back into the southernmost anchorage by early October. Inter-island ferry from Kavaratti restarts on a thin weather-dependent schedule — the 200km southern transit needs settled sea state, which the first sailings test. Rainfall in the second fortnight drops to 60-80mm, daytime 26-30C, water 28-29C, lagoon viz recovering through 15-20m. The Minicoy Lighthouse climb resumes weekday mornings from October 1. Tuna-pole-fishing fleet rebuilds — full pattern returns by mid-October. Lakshadweep Tourism starts issuing permits for late-September arrivals from August 15. Workable only if dates are absolute and you can absorb a 7-day re-opening or ferry delay.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 10, 4, 'go',
  'Season opens. 100-150mm rain mostly first week. 25-31C. Tourist Lodge 70% capacity. Ferry restart stable mid-month.',
  'October is the proper Minicoy season opener. Tourist Lodge runs at 70 percent capacity, SAMUDRAM cruise resumes weekly with the southern anchorage added back, Kavaratti ferry stabilises by mid-month. Shoulder-season rates run 25-30 percent below December peak. Lighthouse climb back to weekday mornings.',
  NULL,
  'October on Minicoy is the post-monsoon clean window on the chain''s southernmost island. Rainfall drops to 100-150mm, mostly in the first week, then most of the back half is dry. Air 25-31C, water 28-29C, humidity 78-82 percent and falling. Minicoy Tourist Lodge runs at 70 percent occupancy from October 5; lagoon viz climbs from 18-20m at month-start to 25-28m by month-end. SAMUDRAM cruise from Kochi resumes its weekly schedule with Minicoy as the southernmost 1-2 day anchorage. Inter-island ferry from Kavaratti stabilises to its weekly slot by mid-month — the 200km southern transit becomes reliable as Arabian Sea swells settle. The Minicoy Lighthouse climb runs weekday mornings 10-11am. Tuna-pole-fishing fleet returns to its full pre-monsoon pattern by mid-October. Shoulder-season rates run 25-30 percent below the December peak. The 200km southern detour from the main chain costs at least 3 full days of transit either way — plan minimum 4-5 nights to make the overhead worthwhile.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 11, 5, 'go',
  'Peak builds. 50-80mm rain. 23-30C. Tourist Lodge 90% occupancy. SAMUDRAM full. Ferry from Kavaratti stable.',
  'November is Minicoy at full operational form. NE monsoon largely misses the chain — rainfall under 80mm, lagoon flat, dive viz at 30m. Tourist Lodge hits 90 percent occupancy, SAMUDRAM cruise sells out 30-45 days ahead, ferry from Kavaratti runs reliable weekly slots.',
  NULL,
  'November on Minicoy is properly back in business on the chain''s southernmost island. The northeast monsoon largely sidesteps the Lakshadweep chain — rainfall stays under 80mm, the Arabian Sea flattens out, lagoon visibility holds 28-32m. Air 23-30C, water 27-28C. Minicoy Tourist Lodge sits at 90 percent occupancy; bookings need to be in 30-45 days ahead. Private guesthouses (10-12 rooms total across the village) clear faster but require Mahl-language patience and direct phone bookings via Lakshadweep Tourism contacts. SAMUDRAM cruise from Kochi sells out 30-45 days ahead with Minicoy as the southernmost 1-2 day anchorage. Inter-island ferry from Kavaratti runs its full weekly schedule (12-14 hours each way). The Minicoy Lighthouse climb runs weekday mornings; the tuna-pole-fishing fleet leaves the southern jetty 4am sharp — visitors can ride out via SPORTS arrangement (₹2,000-3,000 per head). Permit lead times return to 30-45 days as Christmas-week applications start landing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('minicoy', 12, 5, 'go',
  'Peak. 22-29C, dry, viz 30-35m. Christmas-NY 50% premium. Tourist Lodge sold out. SAMUDRAM books 60 days out.',
  'December is when Minicoy delivers the southernmost peak experience. Stable seas, 30-35m viz, full operator capacity, lighthouse and tuna fleet at full schedule. Christmas-NY drives a 50 percent premium and complete sell-out — SAMUDRAM books out 60 days ahead.',
  NULL,
  'December on Minicoy is the year''s most reliable southern-outlier window. Air 22-29C, water 26-28C, lagoon viz 30-35m, rainfall under 25mm. Minicoy Tourist Lodge hits 100 percent occupancy from December 22 to January 5 with a 50 percent premium on standard peak rates. SAMUDRAM cruise from Kochi sells out 60 days ahead — the bundled package is often the only practical entry route for December dates given the 200km ferry transit overhead. Permit applications for December 20 to January 2 arrivals need to be in 45-50 days early. Inter-island ferry from Kavaratti runs its full weekly schedule but seats sell 10-14 days ahead. The Minicoy Lighthouse climb runs weekday mornings; the tuna-pole-fishing fleet hits its annual peak as cooler water raises catch volumes. The Mahl-speaking community is at its most accessible — January-February observances aside, December lacks any major Hijri-calendar closures most years. Single ATM goes dry by Saturday from Christmas onward. Carry ₹20,000-25,000 cash. Dry island; alcohol on Bangaram only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
