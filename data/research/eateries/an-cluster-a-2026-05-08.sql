-- Andaman cluster A - 36 rows across 3 PB day-trip dests x 12 months
-- Generated 2026-05-08
-- Voice gate: NakshIQ FT Weekend register, factual, banned-word-clean
-- Cluster: chidiya-tapu (road, 25km from PB), north-bay-island (boat, Phoenix Bay), ross-island (boat, Aberdeen Jetty)

-- =========================================================
-- CHIDIYA TAPU (Bird Island) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 1, 5, 'go',
  'Peak birding window. 23-29C, dry, calm sea. Sunset point packed 4:30-6pm.',
  'January is when Chidiya Tapu pays back the 25km drive from Port Blair. Migratory raptors are still in residence, the Mundapahad trail is dry, and the sunset point delivers its best skies of the year.',
  NULL,
  'Chidiya Tapu in January is the cleanest version of the half-day trip. Air 23-29C, humidity below 72 percent, and the Bay of Bengal flat enough that the southern viewpoint photographs without haze. Migratory species - Brahminy kite, white-bellied sea eagle, the resident Andaman woodpecker - hold steady through the month. The 25km drive from Aberdeen Bazaar takes 50-60 minutes; auto-rickshaw round-trip with 2-hour wait runs 1,200-1,500 rupees, taxi 1,800-2,200. The Mundapahad trek (3km loop, 90 minutes) is dry underfoot and the canopy buzzes with mixed-species flocks 7-9am. Sunset point fills 4:30pm onward - arrive by 4 for a usable spot on the rocks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 2, 5, 'go',
  'Driest month. 24-30C. Dawn birding crisp, mangrove walk dry. Quiet post-Valentines weekday.',
  'February is the month dedicated birders pick. Lowest rainfall (15-20mm), still-cool dawns, dry mangrove boardwalks, and the trail buzzing with both residents and the last of the winter migrants.',
  NULL,
  'February at Chidiya Tapu runs at the year''s lowest rainfall (15-20mm) and the calmest dawns. Air 24-30C, sea glass-flat through the back half of the month. Biological Park gates open 8am - on a weekday you will share the trail with two or three parties at most. The Mundapahad loop is at its driest; the mangrove boardwalk is solid, no slip risk. Migrants remain through the third week before drifting out. Sunset crowds thin from February 20 onward - couples head home, plains tourists move to Havelock. Buses from Port Blair STA stand run every 90 minutes, 50 rupees one way; last bus back 6:30pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 3, 4, 'go',
  'Late peak. 25-32C. Trail dry, sunset clear. Hotel rates back in PB drop 25 percent.',
  'March keeps February''s clarity at notably lower hotel costs back in Port Blair. Birding still solid for resident species. Heat starts to register on the trek but mornings hold at 25C.',
  NULL,
  'March at Chidiya Tapu is when peak conditions soften slightly and travel costs ease. Daytime climbs to 26-32C with humidity creeping toward 76 percent by month-end. Migrants have largely left, but the resident list - Andaman serpent eagle, racket-tailed drongo, the woodpeckers - is still strong. The road from Port Blair (about 25km, NH-223 South) is in dry-season condition; cycling it as a day-ride is genuinely feasible for fit travelers leaving Aberdeen Bazaar by 6am. The Biological Park sees lighter traffic; entry 50 rupees, kids under five free. Sunset point heat off the rocks is real - bring water, a hat, and budget 30 minutes pre-sunset for the spot you want. Last bus back at 6:30pm still applies.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 4, 4, 'go',
  'Hot, humid 27-33C. Trail dry, sunset clear. Quiet weekday afternoons. Off-peak prices in PB.',
  'April delivers full Chidiya Tapu access at proper off-peak prices in Port Blair. Heat is real on the Mundapahad trek - shift it to 6-8am - but the sunset window remains the best part of the day.',
  NULL,
  'April at Chidiya Tapu is a heat-shifted version of the same trip. Air touches 28-33C with humidity at 78-82 percent; the Mundapahad loop is uncomfortable after 9am, comfortable before 8am. Birding density drops from the migrant peak but the resident list is intact. The Biological Park stays open 8am-5pm; bring 1.5 litres of water minimum. NH-223 South to Chidiya Tapu is fully open; pre-monsoon road repair work runs the last week of the month and can add 15-20 minutes to the drive. Hotel rates back in Port Blair are 35-40 percent below January peak. Sunset point breeze picks up from 4pm and makes the 90-minute wait genuinely pleasant after the heat of the trek. Last bus 6:30pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 5, 4, 'go',
  'Last clean window. 27-33C. First half dry. Last 10 days squally. Trail safe through May 20.',
  'Early May is the last reliable Chidiya Tapu window before the southwest monsoon. First two weeks run clean. Lock the visit by May 18 - after that, afternoon squalls hit the sunset point.',
  NULL,
  'May at Chidiya Tapu splits the same way South Andaman does. The first fortnight is April extended - hot, dry, sunset point clear. From around the 18th, the southwest monsoon advance arrives as 4pm squalls; the sunset point becomes a coin-flip. Air 28-33C, humidity hits 84 percent in the last week. NH-223 South holds in dry-season form until the first heavy rain, usually the third or fourth week, and can flood at Manglutan within an hour of a downpour. Mundapahad surface stays passable but the canopy gets dripping after every shower. Plan trips for the first 18 days of the month or accept the gamble.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 6, 1, 'skip',
  'Southwest monsoon. 420mm rain. NH-223 floods. Trail leech-thick. Sunset point unusable.',
  NULL,
  'June is full southwest monsoon. NH-223 South floods on a near-daily basis, the Mundapahad trail is leech-infested mud, and the sunset point is locked in cloud. There is no version of this trip that works.',
  'June at Chidiya Tapu is closed in everything but name. Rainfall hits 400-450mm with daily downpours. NH-223 South - the only road to the village - floods at the Manglutan low point within an hour of any heavy rain, and authorities sometimes barricade it. The Mundapahad trail is unwalkable: ankle-deep mud, leeches in concentration, and several stretches with active rockfall under saturated soil. The Biological Park stays technically open but visitor numbers drop to zero. The sunset point is permanently in cloud; visibility through the cover is rarely beyond 200m. Mobile (already patchy here) deteriorates further as towers take rain damage. Wait for October at the earliest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 7, 1, 'skip',
  'Peak monsoon. 480mm rain. Road washouts on NH-223. Trail closed by Forest Dept some weeks.',
  NULL,
  'July is the wettest month of the Andaman calendar. NH-223 South sees confirmed washouts every year, the Mundapahad trail is intermittently closed by the Forest Department, and the sunset point has zero visibility.',
  'July at Chidiya Tapu is the worst month of the year. Rainfall averages 470-510mm across 26-28 wet days. NH-223 South sees confirmed washouts at Manglutan and Wandoor most years - the Public Works Department typically loses the road for 24-48 hours at a stretch in mid-July. The Forest Department closes the Mundapahad trail in any week with confirmed leech-borne illness reporting. The Biological Park stays open with 50-rupee entry but only the sheltered enclosures are usable. Air 25-29C is mild but the persistent rain, 92 percent humidity, and zero useful sun mean the trip experience does not exist. Pick October-March instead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 8, 1, 'skip',
  'Monsoon continues. 410mm rain. Road patchy, trail muddy, sunset point clouded. Skip.',
  NULL,
  'August is more of July at slightly fewer wet days. NH-223 South still floods, the Mundapahad trek is mud and leeches, and the sunset point loses its purpose. The trip does not work this month. Rebook for November.',
  'August at Chidiya Tapu is July with marginally fewer wet days. Rainfall settles to 390-430mm across 22-24 wet days. NH-223 South gets minor reprieves between rains - the road is sometimes drivable - but the surface is broken in stretches and the drive that takes 50 minutes in January takes 2 hours when it works at all. The Mundapahad trail remains muddy and leech-thick; the Forest Department reopens it intermittently between major rain events. The sunset point is cloudbound 28 days out of 31. Birding is technically interesting (resident species are active in the rain) but hidden beneath the canopy and the trip becomes an exercise in patience without payoff. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 9, 2, 'wait',
  'Late monsoon. 270mm rain. Road usable from mid-month. Trail reopens last week. Sunset still clouded.',
  'Late September starts the slow re-open. NH-223 South dries out from mid-month, the Mundapahad trail reopens around September 25-28. Acceptable only if October dates do not work.',
  'Most of September is still firmly in monsoon. The Mundapahad trail is closed for the first three weeks; the sunset point is cloudbound through nearly all of it. October arrives with substantially cleaner conditions and an extra two weeks of patience.',
  'September at Chidiya Tapu is the slow climb out of monsoon. Rainfall drops to 240-290mm with most landing in the first half. NH-223 South dries out by the second fortnight; the drive from Port Blair becomes reliably under 90 minutes by September 20. The Mundapahad trail typically reopens between September 25 and 28 once Forest Department staff have cleared windfall and confirmed no active rockfall. The sunset point still clouds over more often than it clears - perhaps eight usable evenings in the month. Birding is decent in the recovering forest. Hotel rates in Port Blair are at year-low. The trip works on the back end of the month for travelers with rigid dates; everyone else should wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 10, 4, 'go',
  'Season opens. 130mm rain mostly first week. 24-30C. Trail dry by mid-month. Sunset clearing.',
  'October is the season opener for Chidiya Tapu. Trail certified open by mid-month, sunset point usable from October 10. Rates 30-40 percent below December peak.',
  NULL,
  'October at Chidiya Tapu is when the half-day trip becomes a half-day trip again. Rainfall drops to 100-150mm, most of it in the first week. NH-223 South is back to full peak-season form by October 12 once Public Works finishes monsoon repairs. The Mundapahad trail has its Forest Department clearance from October 1 in dry years, October 7-10 in wetter ones. Air 24-30C, humidity easing through 78 percent. Sunset point usable from October 10 onward; visibility good but not yet at January standard. Migratory birds start returning in the last fortnight - the first sea eagles and harriers on territory. Bay of Bengal cyclone risk is present but most October systems track north toward Andhra Pradesh.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 11, 4, 'go',
  'Strong shoulder. 60mm rain. 23-30C. Trail dry, migrants returning. Diwali week busier.',
  'November is Chidiya Tapu properly back. Migratory raptors arriving, trail dry, sunset point clear. Diwali week brings PB-side crowds; outside that window, one of the cleanest months for value.',
  NULL,
  'November at Chidiya Tapu is genuine peak conditions before peak prices. Rainfall drops to 50-80mm as evening showers, NH-223 South is fully repaired, and the Mundapahad trail is dry and leech-free. Air 23-30C, humidity 76 percent. Migrant raptors and waders are arriving steadily through the month - by the last week the bird list matches January at maybe 80 percent capacity. Sunset point delivers usable skies most evenings; light is at its softest. Diwali week (variable date, usually first half of November) drives a 5-7 day spike in PB-side traffic and ferry crowding from the mainland - day-trippers from cruise visits add to the sunset crowd. Outside Diwali, one of the better-value months on the calendar.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chidiya-tapu', 12, 5, 'go',
  'Peak. 23-29C, dry, sea calm. Sunset point packed Christmas-NY week. Birds at full strength.',
  'December delivers the postcard Chidiya Tapu. Migratory raptors at full strength, sunset point clear, trail dry. Christmas-NY drives PB-side hotel premiums of 50 percent and packed sunset crowds.',
  NULL,
  'December at Chidiya Tapu runs at full strength. Air 23-29C, humidity 70 percent, sea state calm enough that the sunset point photographs without haze most evenings. Rainfall 25-40mm across 4-6 days. Migratory species are fully on territory; the Andaman wood pigeon is more visible at the forest edge in dry-cool conditions. Mundapahad trail surface is at its annual best. Sunset point fills hard during Christmas-NY week (December 22 to January 2) - 200-300 people on the rocks most evenings, vehicles parked back to the village junction. PB-side hotel rates jump 50-60 percent in that window. The first 18 days offer the same weather at 35-40 percent lower hotel costs.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- NORTH BAY ISLAND (snorkel + sea-walk + scuba) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 1, 5, 'go',
  'Peak. 24-29C, vis 25-30m. Glass-bottom and sea-walk daily. Boats fill 8-10am.',
  'January is when North Bay runs at its best - 25-30m underwater clarity, calm seas, full operator menu. Sea-walk and beginner-scuba slots book out a day ahead. Glass-bottom boats hit capacity by 9am.',
  NULL,
  'North Bay in January is the cleanest version of the half-day reef trip. Underwater visibility holds at 25-30m through the month - glass-bottom hulls deliver postcard coral views, sea-walk helmets get you 6m down on living reef without needing a dive license. Sea state is glass-flat through most days. Air 24-29C, water 26-29C. Boats from Phoenix Bay run 8am-3pm; combined Ross-North Bay-Viper packages from 1,250-1,800 rupees, sea-walk add-on 3,500, beginner scuba 4,000-5,000. Operators run six-day weeks with Sunday sometimes thinner. Slots fill fast - book the previous evening at Phoenix Bay or your Port Blair hotel desk. Last return boat 4pm sharp.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 2, 5, 'go',
  'Driest month. 25-30C. Vis 30m. Sea-walk visibility maxes. Quieter post-Valentines weekday.',
  'February is the cleanest month at North Bay. Lowest rainfall (15mm), calmest seas, vis touches 30m. Sea-walk experience peaks because sediment stays put. Mid-month thinner crowds.',
  NULL,
  'February at North Bay is the operational peak of the year. Rainfall sits at 12-18mm for the entire month, the Bay of Bengal is at its calmest, and underwater visibility consistently delivers 28-30m at the reef. Sea-walk experience is at its best - sediment stays settled, helmet windows are clear, you can see fish 8-10m off in any direction. Air 25-30C, water 27-29C. Glass-bottom boats run continuously 8am-2pm; sea-walk slots run two an hour from 8:30am, beginner scuba on demand. From February 15 onward the school-holiday crowd thins and queues at the operator counter at Phoenix Bay drop from 30 minutes to 5. The 20-minute crossing is unaffected by anything except weather, and weather is at its least disruptive.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 3, 4, 'go',
  'Late peak. 26-32C, vis 25-28m. Boats on schedule. PB hotel rates back 25 percent below January.',
  'March keeps most of February''s underwater clarity at 25-30 percent lower travel costs back in Port Blair. Sea-walk and scuba slots open up to walk-in by mid-month. The value-aware month.',
  NULL,
  'March at North Bay holds most of February''s underwater clarity at lower travel costs. Visibility eases from 30m to 25-28m - the difference is barely registering on a glass-bottom hull. Air 27-32C, water 28-29C, humidity climbing toward 78 percent. Glass-bottom boats run their full timetable; sea-walk and beginner scuba slots that book out solid in February become walk-in available by March 15. The 20-minute crossing from Phoenix Bay is uninterrupted. PB-side hotel rates drop 25-30 percent versus January. Heat is real on the open boat - sunblock, hat, water bottle become non-optional. The reef has its first plankton-bloom days in the last week, which can drop visibility to 18-22m for 24-48 hours at a stretch but rarely longer.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 4, 4, 'go',
  'Hot 28-33C. Vis 22-25m. Boats on schedule, hotel rates 35 percent off January. Off-peak with full operations.',
  'April is the genuine off-peak window where the half-day reef trip still works at full menu. Vis at 22-25m, boats on time, sea-walk slots walk-in. Trade-off is the heat on the open crossing.',
  NULL,
  'April at North Bay runs the same itinerary at three-quarter prices and full heat. Air touches 28-33C with humidity 78-82 percent; the open boat across to the island registers every degree. Underwater visibility eases to 22-25m as plankton blooms intensify - still excellent for glass-bottom and sea-walk, only marginal for keen scuba. Boats run the full Phoenix Bay timetable. Sea-walk slots are walk-in. Beginner scuba runs maximum two clients per instructor. Operators trim a sailing or two on the slowest weekdays of the month - call ahead from your hotel. Glass-bottom boat tours stay reliable. PB-side hotel rates 30-40 percent below January peak. Hydration on the boat and at the island matters - operators sell water at island prices.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 5, 4, 'go',
  'Last clean window. 28-33C. Vis 18-22m. Boats run first 18 days reliably. Squalls in last week.',
  'May is the last clean fortnight before the southwest monsoon shuts the crossing. First 18 days run normally - vis drops slightly, boats on time. Lock travel by May 20.',
  NULL,
  'May at North Bay is the last clean window before the southwest monsoon arrives. Underwater visibility starts dropping from 25m to 18-22m as currents shift and plankton density rises. Boats from Phoenix Bay still run on schedule for the first three weeks. Air 28-33C, water 29C. The 20-minute crossing is exposed - on calm days the trip runs as ever, on squally days that build from May 15 onward, sailings cancel with 6 hours notice. Sea-walk is the most weather-sensitive activity; a cancellation pushes you a day later. Glass-bottom can usually run choppier seas. Hotel rates at their cheapest of the open season. Plan for early May or accept the late-month gamble.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 6, 1, 'skip',
  'Southwest monsoon. 450mm rain, rough seas. Phoenix Bay sailings cancel daily. Skip.',
  NULL,
  'June is full southwest monsoon. The North Bay crossing is among the first to cancel because the route is short, exposed, and sea-state-sensitive. Sailings happen perhaps two days a week. Do not book.',
  'June at North Bay is closed in everything but name. The 20-minute Phoenix Bay crossing is among the first sailings to cancel in any sea state because the route is exposed and the boats used are smaller than the inter-island ferries. Operators run perhaps two days in the week, often cancelling within an hour of departure. Rainfall hits 400-450mm. Underwater visibility on the rare day a boat reaches the reef collapses to 5-8m. Sea-walk operations suspend entirely - the helmets and the surface umbilical lines cannot be deployed in chop. Beginner scuba is also off. Air 25-29C is mild but it does not matter. The next clean window starts in October. Picking it up here is a refunds-and-rebookings exercise.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 7, 1, 'skip',
  'Peak monsoon. 500mm rain. All operators closed. Sailings suspended most weeks. Skip.',
  NULL,
  'July is the wettest month of the year. North Bay sea-walk and glass-bottom operators are all closed for the season. The crossing is unsafe in monsoon swell. Pick October-March instead.',
  'July at North Bay is the worst month of the year. Rainfall hits 470-510mm, and the southwest monsoon delivers it as 12-hour deluges separated by squally hours. All sea-walk and beginner-scuba operators close down for the season - their fleets sit dry-docked at Phoenix Bay or the Marine Wing yard. Glass-bottom boats are also off. The few combined Phoenix Bay tour packages that stay listed are run on the rare clear day, perhaps four times in the month, and they go Ross-only. Underwater visibility - on a hypothetical sailing day - collapses to 5-8m. The headline experience here (calm-water reef views, sea-walk on living coral) cannot exist in monsoon swell. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 8, 1, 'skip',
  'Monsoon continues. 420mm rain. All operators still closed. Crossings unsafe. Skip.',
  NULL,
  'August is more of July. Sea-walk and beginner-scuba operators stay closed, the crossing is unsafe in monsoon swell, and the reef visibility is collapsed. The trip does not work. Rebook for November.',
  'August at North Bay is July with marginally fewer wet days. Rainfall settles to 410-440mm, but the operator picture is unchanged: sea-walk, scuba, glass-bottom are all closed for the season. The Phoenix Bay sailings that exist are inter-island ferry traffic to Havelock and Neil running on rough-sea curtailed timetables - none stop at North Bay. Even on the calm days that occur three or four times in the month, the reef has visibility of 6-10m and operators have sent staff home for the season. The 20-minute crossing is genuinely dangerous in monsoon swell - smaller boats with low gunnels do not handle it. The next reliable open window is November. August is a non-trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 9, 2, 'wait',
  'Late monsoon. 270mm rain. Operators reopen last week. Vis 12-15m. Sailings still 30 percent cancellation rate.',
  'Late September starts the slow re-open. Glass-bottom operators bring boats back September 25-30. Sea-walk reopens by October 1 in most years. Acceptable only on hardest dates.',
  'Most of September is firmly in monsoon. Sea-walk and beginner-scuba operators are still closed for the first three weeks; glass-bottom restarts on a thin schedule from around September 25. October arrives with dramatically cleaner conditions and three more weeks of patience.',
  'September at North Bay is the cautious re-opening. Rainfall drops to 240-290mm, mostly in the first half. Glass-bottom operators bring boats back from dry-dock between September 25 and 30; sea-walk operators typically start on October 1 once the sea state confirms. Cancellation rate on running days is 25-30 percent - sometimes mid-trip. Underwater visibility recovers through 12-15m, well below winter standard. The 20-minute Phoenix Bay crossing is still exposed and weather-cancellable. PB hotel rates are at year-low. Refund policies are tight. The trip works on the back end of the month for travelers who cannot move dates; for everyone else, October is a substantially better proposition.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 10, 4, 'go',
  'Season opens. 130mm rain mostly first week. Vis recovers to 20-25m. Operators full menu by mid-month.',
  'October is North Bay back online. Sea-walk, glass-bottom, beginner scuba all operating by October 10. Vis 20-25m, sailings reliable. Rates 30-40 percent below December peak.',
  NULL,
  'October at North Bay is the season opener. Rainfall drops to 100-150mm, mostly in the first week. By October 10 sea-walk, glass-bottom, and beginner-scuba operators are back at full operating capacity with returning crews and freshly serviced kit. Underwater visibility recovers through 20-25m by mid-month. Air 24-30C, water 28-29C. Phoenix Bay sailings to North Bay run their full peak timetable from October 15. Bay of Bengal cyclone risk is real this month and a single named system can suspend the crossing for 36-72 hours, but most October systems track north toward Andhra Pradesh and Odisha. Combined Ross-North Bay-Viper packages return to standard pricing of 1,250-1,800 rupees. Rates 30-40 percent below December peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 11, 4, 'go',
  'Strong shoulder. 60mm rain. 23-30C. Vis 25m. Diwali week packed. Otherwise smooth.',
  'November is North Bay properly back. Vis 25m, sea calm, sea-walk slots walk-in outside Diwali week. Strong choice for travelers who want December conditions at lower prices.',
  NULL,
  'November at North Bay is genuine peak conditions before peak prices. Rainfall drops to 50-80mm as evening showers, sea state is calm through almost the entire month, and underwater visibility holds at 25m at the reef. Air 23-30C, water 28C. All operators are at full capacity - sea-walk slots run two an hour, beginner-scuba on demand, glass-bottom continuously 8am-3pm. The 20-minute crossing is reliable. Diwali week (variable date, usually first half) drives a 5-7 day spike: combined-tour bookings sell out a day ahead, sea-walk slots fill by 9am. Outside Diwali, slots are walk-in. Cyclone watch active to late November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('north-bay-island', 12, 5, 'go',
  'Peak. 23-29C. Vis 28-30m. Christmas-NY 50 percent premium. Sea-walk slots gone by 8:30am.',
  'December delivers postcard North Bay. Vis 28-30m, sea-walk and scuba slots maxed daily, glass-bottom packed. Christmas-NY week books out 10 days ahead. The first 18 days are the smart move.',
  NULL,
  'December at North Bay is when the half-day reef trip runs at full strength. Underwater visibility at the main reef holds 28-30m. Air 23-29C, water 28C, humidity 70 percent. Sea state is calm enough that the 20-minute Phoenix Bay crossing feels like a flat-water cruise. Sea-walk slots run two an hour from 8:30am and are gone by mid-morning - book the previous evening at any Port Blair hotel desk. Beginner-scuba runs all instructor slots; capacity holds at maybe 30 clients a day. Christmas-NY week (December 22 to January 2) drives 10-day-ahead bookouts and 50-60 percent premium on combined packages. The first 18 days offer the same conditions at 35-40 percent lower hotel costs.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- ROSS ISLAND (Netaji Subhas Chandra Bose Dweep) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 1, 5, 'go',
  'Peak. 23-29C, calm sea. Aberdeen Jetty ferries 8:30am-2pm. Light-and-sound 5:30pm. Mon closed.',
  'January is Ross Island at full strength. Calm sea, 20-minute Aberdeen Jetty ferries running 8:30am-2pm, light-and-sound show at full attendance. Best month for the heritage half-day.',
  NULL,
  'Ross Island in January is the cleanest version of the heritage half-day. Air 23-29C, humidity 72 percent, sea state flat enough that the 20-minute ferry from Aberdeen Jetty stays smooth. Tickets 50 rupees Indian, 200 foreign, plus the boat fare of 250-350 round-trip. Sailings run roughly half-hourly 8:30am-2pm; the last return boat is 4:30pm and the island does not stay open after that. The light-and-sound show is at 5:30pm Tuesday to Sunday (Monday closed) - book the same morning at the jetty counter. Spotted deer, peacocks, and the resident Andaman koel are everywhere through the ruins. The Cellular Jail itself in Port Blair runs its own evening show that pairs naturally as a same-day double-bill.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 2, 5, 'go',
  'Driest month. 24-30C. Calm sea. Light-and-sound show clear-night perfect. Quieter post-Valentines.',
  'February is the cleanest month at Ross Island. Lowest rainfall, glass-flat ferry crossing, perfect dry-air evenings for the 5:30pm show. Mid-month thinner crowd through the ruins.',
  NULL,
  'February at Ross Island runs at the year''s lowest rainfall (12-18mm) and the calmest dawns. Air 24-30C, sea glass-flat, dry trade-wind nights. The 20-minute ferry from Aberdeen Jetty runs every 30-40 minutes 8:30am-2pm; last return at 4:30pm. The light-and-sound show at 5:30pm Tuesday to Sunday is at its best in February - clear air carries the audio across the open lawn, the ruins photograph clean against the night sky. Mondays are still closed. From February 15 onward the school-holiday families thin and the queues at the jetty counter drop from 20 minutes to 5. The deer come close on the central lawn just before 9am - that is the photograph window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 3, 4, 'go',
  'Late peak. 26-32C. Ferries on schedule. Show running. PB hotel rates 25 percent off January.',
  'March keeps February''s clear weather at lower travel costs back in Port Blair. Show seats walk-in by mid-month. Ruins heat up by midday - go on the 8:30am sailing.',
  NULL,
  'March at Ross Island is a heat-shifted version of the same trip. Air climbs to 27-32C with humidity creeping toward 76 percent. The 20-minute ferry from Aberdeen Jetty is unaffected. The ruins at midday are genuinely hot - the colonial buildings have no roofs, the banyans give shade in patches, and visitors who delay until 11am end up cutting the visit short. Take the 8:30am sailing, do the loop in 90 minutes, be back at the jetty by 11. The light-and-sound show at 5:30pm runs as ever, Tuesday to Sunday; seats are walk-in available from March 10 onward. PB-side hotel rates drop 25-30 percent versus January. The deer are most active in the cooler 7-9am window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 4, 4, 'go',
  'Hot, humid 27-33C. Ferries on schedule. Hotel rates 35 percent off January. Heat heavy on roofless ruins.',
  'April is the genuine off-peak window at Ross Island. Ferry on schedule, show running, PB hotel rates at year-low. Heat is real - early sailing only, and water on the boat.',
  NULL,
  'April at Ross Island runs the same itinerary at three-quarter prices and full heat. Air touches 28-33C with humidity 78-82 percent; the open ruins register every degree because there is no functioning roof anywhere on the island. Take the 8:30am sailing, walk the loop fast, and be on the 11am return. The deer hide in shade after 9:30. The 20-minute Aberdeen Jetty crossing is uninterrupted; sailings every 40 minutes 8:30am-2pm. The 5:30pm light-and-sound show is at its most pleasant - air cools to 27C by then and the breeze off the bay becomes the reason to stay for the second sailing. Last return 4:30pm. PB-side hotel rates 30-40 percent below January peak. Bring 1.5 litres of water minimum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 5, 4, 'go',
  'Last clean window. 28-33C. Ferries on schedule first 18 days. Late-month squalls suspend show.',
  'Early May is the last reliable Ross Island window before the southwest monsoon. First fortnight runs as April. From May 18 the evening show suspends on squally evenings.',
  NULL,
  'May at Ross Island splits cleanly in two. The first fortnight extends April - 28-33C, ferries on time, the heritage walk and 5:30pm show on full schedule. From May 18, the southwest monsoon advance arrives as 4-6pm squalls, and the open-air show is first to suspend on rough evenings. Day-time access continues unaffected most of the month - Aberdeen Jetty cancels only on the worst sea-state days, still rare in May. PB hotel rates 35-40 percent below January peak. The show is the catch: half of late-May evenings cancel or run abbreviated. Plan for the first 18 days or accept the show is a coin-flip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 6, 1, 'skip',
  'Southwest monsoon. 430mm rain. Aberdeen Jetty crossings cancel. Show suspended. Skip.',
  NULL,
  'June is full southwest monsoon. The Aberdeen Jetty crossing cancels on most days, the open-air light-and-sound show is suspended for the season, and the roofless ruins hold no shelter from rain.',
  'June at Ross Island is closed in everything but name. Aberdeen Jetty sailings are among the first to cancel in any sea state - the crossing is short but completely exposed. Operators run perhaps two days in the week, often cancelling within an hour of departure. Rainfall hits 400-450mm. The light-and-sound show suspends for the entire monsoon season - the lighting rigs and audio cabling cannot stay in service through rain. The roofless ruins offer no shelter on the rare day a boat reaches the island; ticketed visitors bunch at the small museum block waiting for the return sailing. The deer move into dense canopy. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 7, 1, 'skip',
  'Peak monsoon. 500mm rain. Crossings suspended. Show off for the season. Skip entirely.',
  NULL,
  'July is the wettest month of the year. The Aberdeen Jetty crossing to Ross is suspended on most days, the light-and-sound show is dark for the season, and the open ruins are unwalkable. Pick October-March instead.',
  'July at Ross Island is the worst month of the year. Rainfall hits 470-510mm, and the Aberdeen Jetty crossing is suspended on most days - even on rare clear days, small operator boats sit at the jetty because sea-state advisory boards are red. The light-and-sound show is dark for the season. Open ruins are unwalkable mud, and colonial paths under canopy turn slippery with biofilm. The deer move deep into the interior. The Cellular Jail in Port Blair stays open with its own evening show, which most travelers shift to in this month. The Ross half-day does not work in July. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 8, 1, 'skip',
  'Monsoon continues. 420mm rain. Crossings still suspended. Show still off. Skip.',
  NULL,
  'August is more of July. Aberdeen Jetty crossings to Ross stay suspended on most days, the light-and-sound show is still dark, and the ruins are unwalkable. The trip does not work. Rebook for November.',
  'August at Ross Island is July with marginally fewer wet days. Rainfall settles to 410-440mm. Aberdeen Jetty crossings to Ross run perhaps two days in the week, and even on running days the small boats often turn back partway. The light-and-sound show remains dark for the season - lighting rigs and audio kit are stored under tarpaulin in the operator yard. The open ruins are wet underfoot, the lawns are flooded in patches, and the deer remain in canopy. The Cellular Jail show in Port Blair continues to be the substitute most travelers fall back on. There is no version of the Ross half-day that delivers value in August. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 9, 2, 'wait',
  'Late monsoon. 270mm rain. Crossings restart mid-month. Show reopens last week. Cancellation risk 25 percent.',
  'Late September starts the slow re-open. Crossings restart on a thin schedule from mid-month. The light-and-sound show typically reopens September 25-28. Acceptable only on rigid dates.',
  'Most of September is firmly in monsoon. The Aberdeen Jetty crossing runs on a thin schedule with a 25-30 percent cancellation rate, and the light-and-sound show stays dark until at least the last week. October arrives with substantially cleaner conditions and an extra two weeks of patience.',
  'September at Ross Island is the slow climb out of monsoon. Rainfall drops to 240-290mm, mostly in the first half. Aberdeen Jetty operators bring boats back on a six-day timetable from around September 15 with a cancellation rate of 25-30 percent on running days. The open-air light-and-sound show typically reopens between September 25 and 28 once Forest Department electrical staff have certified the rigs after the monsoon. The ruins themselves are still wet underfoot, lawns flooded in stretches, deer keeping to canopy. Hotel rates back in Port Blair are at year-low. The trip works on the back end of the month for travelers with rigid dates; everyone else should wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 10, 4, 'go',
  'Season opens. 130mm rain mostly first week. Crossings full schedule by mid-month. Show certified open.',
  'October is Ross Island back online. Aberdeen Jetty sailings run their full peak timetable from October 15. The light-and-sound show is certified open. Rates 30-40 percent below December peak.',
  NULL,
  'October at Ross Island is the season opener. Rainfall drops to 100-150mm, mostly in the first week. The Aberdeen Jetty crossing runs its full peak-season timetable from October 15; sailings every 40 minutes 8:30am-2pm. The 5:30pm light-and-sound show has Forest Department electrical certification by October 1 in dry years, October 7-10 in wetter ones, and runs Tuesday to Sunday from then on. Air 24-30C, humidity easing through 78 percent. The ruins dry out fast in the back half of the month. Bay of Bengal cyclone risk is real but most October systems track north toward Andhra Pradesh. PB-side hotel rates 30-40 percent below December peak. Tickets 50 Indian, 200 foreign, plus 250-350 round-trip ferry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 11, 4, 'go',
  'Strong shoulder. 60mm rain. 23-30C. Show running clear nights. Diwali week packed.',
  'November is Ross Island properly back. Crossings reliable, show running, ruins dry. Diwali week brings short crowds; outside that window, one of the cleanest months for value.',
  NULL,
  'November at Ross Island is genuine peak conditions before peak prices. Rainfall drops to 50-80mm as evening showers, sea state is calm through almost the entire month, and the Aberdeen Jetty crossing runs its full peak timetable. Air 23-30C, dry trade-wind evenings. The 5:30pm light-and-sound show runs every Tuesday-Sunday with clear-air audio carrying across the open lawn. The ruins are dry underfoot, the deer back on the central grass through the cooler 7-9am window, peacocks visible from the path. Diwali week (variable date, usually first half) drives a 5-7 day spike: ticket queues at Aberdeen Jetty run 25-30 minutes, show seats fill 90 minutes ahead. Outside Diwali, the visit is unhurried. Cyclone watch active to late November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ross-island', 12, 5, 'go',
  'Peak. 23-29C, dry, calm sea. Christmas-NY 50 percent premium. Show seats gone 90 min ahead.',
  'December delivers postcard Ross Island. Calm crossings, dry ruins, clear-air evenings for the show. Christmas-NY week packed. The first 18 days run identically at lower prices.',
  NULL,
  'December at Ross Island is when the heritage half-day runs at full strength. Air 23-29C, humidity at 70 percent, and the 20-minute Aberdeen Jetty crossing is glass-flat through almost every day of the month. Rainfall is 25-40mm scattered across 4-6 days. The 5:30pm light-and-sound show is at its absolute best - dry trade-wind air carries the audio cleanly, the ruins photograph against a star-clear sky, and the seats fill 90 minutes ahead through Christmas-NY week. Daytime visits are quiet 8:30-10am, packed 11am-1pm. Spotted deer come close on the central lawn. Christmas-NY week (December 22 to January 2) drives 50-60 percent premium on PB hotels. The first 18 days of December offer the same conditions at 35-40 percent lower hotel costs.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
