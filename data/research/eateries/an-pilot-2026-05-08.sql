-- Andaman editor-gate pilot - 60 rows across 5 dests x 12 months
-- Generated 2026-05-08
-- Voice gate: NakshIQ FT Weekend register, factual, banned-word-clean

-- =========================================================
-- PORT BLAIR (Sri Vijaya Puram) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 1, 5, 'go',
  'Peak archipelago season. 22-29C, dry, ferries reliable. Cellular Jail show seats book out.',
  'January is when Port Blair runs to schedule. Ferry counters open, Cellular Jail sound-and-light is the 6pm fixture worth doing, seafood at Aberdeen Bazaar is at its freshest. Ideal pre-Havelock acclimatisation stop.',
  NULL,
  'Port Blair in January is the version every traveler hopes the Andamans will be. Daytime sits at 24-29C, nights drop to 22C, humidity manageable. The Cellular Jail light-and-sound show runs both 6pm and 7:15pm slots Tuesday to Sunday - book the same morning at the gate, the 6pm Hindi show fills first. Government and private ferries (Makruzz, ITT Majestic) leave Phoenix Bay 6am-2pm; reserve 3-4 days ahead during this peak. ATMs and 4G all work. Aberdeen Bazaar fish market opens 6am - Havelock-bound divers should pick up cash buffer here beyond what island ATMs can produce.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 2, 5, 'go',
  'Driest month. 23-30C, ferry timetables hold. Indian-tourist load eases mid-month.',
  'February is the cleanest month at the gateway - low rainfall (around 20mm), stable seas, school-holiday rush thins out from the second week. Cellular Jail, Corbyn''s Cove, Chidiya Tappu sunset all in play.',
  NULL,
  'February in Port Blair is the month seasoned Andaman regulars book first. Rainfall averages 15-25mm, the lowest of the year, and the Bay of Bengal is at its calmest. Daytime 24-30C, water 27C, humidity below 70 percent. Domestic flights from Chennai and Kolkata run at 90 percent capacity but ferry seats free up after the first week as January-holiday families head home. Chidiya Tappu sunset point is a 25km drive south - go Tuesday or Wednesday for an empty viewpoint. Auto fares Aberdeen Bazaar to airport: 250 rupees by meter, 400 if you do not insist. Carry small notes; change is genuinely scarce.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 3, 4, 'go',
  'Last clean month before pre-monsoon humidity. 25-32C. Ferries on time, prices off-peak.',
  'March hands you most of February''s weather with about 30 percent fewer travelers and noticeable hotel discounting. Diving day-trips to North Bay still run at full visibility. Pre-bookings drop to 7-10 day lead time.',
  NULL,
  'March in Port Blair is the month rates start sliding while conditions are still solid. Daytime 26-32C with humidity creeping toward 75 percent by month-end - heat starts to register but the rains are still six weeks out. Ferries to Havelock and Neil run their full winter timetable. North Bay glass-bottom boat tours and Ross Island day-trips are uninterrupted. Hotels in the 3,500-6,000 rupee bracket discount 25-30 percent versus February. The trade-off: school holidays in some states bring a mid-March bump for 7-10 days. A weekday arrival lands cleaner queues at Cellular Jail and the Anthropological Museum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 4, 4, 'go',
  'Hot and humid 27-33C but still pre-monsoon. Ferries and dive trips running normally.',
  'April is genuine off-peak in Port Blair - heat rises but the seas hold and the gateway functions at full capacity. Hotels 35-40 percent below January rates. Strong call for travelers chasing value over comfort.',
  NULL,
  'April is when Port Blair gets uncomfortably warm but operationally clean. Air temperatures touch 28-33C with humidity at 75-80 percent, sticky enough that AC moves from luxury to non-negotiable - factor that into your room budget. Sea temperature is 28-29C, North Bay snorkeling visibility still 18-22m. Ferries run full timetables. Tourist load drops to roughly half of January peak - Cellular Jail Hindi show no longer requires advance booking, queues at Sagarika emporium are walk-in. Power cuts get more frequent pre-monsoon; budget hotels without inverters can go dark for 2-3 hours afternoons. Pack a power bank and accept that.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 5, 4, 'go',
  'Pre-monsoon. 27-33C. First half clean, last week often sees first squalls. Ferries on schedule.',
  'Early May is the last reliable window before the southwest monsoon. First fortnight runs like April - dry, hot, ferries normal. Lock the first 10 days; the last 10 are a gamble against arriving squalls.',
  NULL,
  'May in Port Blair splits cleanly in two. The first fortnight extends April - 28-33C, humidity 80 percent, ferries on time, dive shops at Havelock running their full menu. By the third week the southwest monsoon advance starts arriving as afternoon squalls: hour-long rain, then back to muggy sun. Sea state remains workable until the very end of the month. Domestic airlines start trimming Port Blair frequencies after May 20 - that is a useful tell. Hotels run their cheapest published rates of the year, often 50 percent off January. The Andamans Coast Guard issues sea-state advisories from late May; check before booking inter-island legs.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 6, 1, 'skip',
  'Southwest monsoon full strength. 400-500mm rainfall, ferry cancellations, rough seas. Avoid.',
  NULL,
  'June is full southwest monsoon. Inter-island ferries cancel with 6 hours notice, rainfall touches 450mm, and the trip you came for - Havelock, Neil, North Bay - becomes a dice roll. Skip the month.',
  'June in Port Blair is when the archipelago closes for business in everything but name. The southwest monsoon delivers 400-500mm of rain across the month, often as 12-hour deluges. Inter-island ferry services suspend on rough-sea days, which by mid-June means most days. Phoenix Bay terminal runs a curtailed timetable and even those sailings get cancelled at short notice. Air temperatures stay mild at 25-29C but the rain and 90 percent humidity make walks unpleasant. Cellular Jail and the museums stay open but the broader trip - which is fundamentally about getting on a boat - does not work. The next clean window starts in October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 7, 1, 'skip',
  'Peak monsoon. 450-500mm rainfall. Ferry network broken. Do not plan an Andaman trip in July.',
  NULL,
  'July is the wettest month at Port Blair. Ferries cancel, dive operators shut, sea state is dangerous. The trip you came for cannot happen. Pick October-November or December-March instead.',
  'July in Port Blair is monsoon at its most stubborn. Rainfall averages 480mm across 25-27 wet days. Phoenix Bay ferries run sporadically when at all; the high-speed Makruzz pulls boats off route entirely on the worst weeks. Dive visibility collapses to 5-8m at every site, dive operators on Havelock shut for the season. Air temperature 25-29C is deceptively mild, but 90+ percent humidity and constant downpour make clothing impossible to dry. Power cuts run 4-6 hours daily as the grid takes hits. Domestic flights still operate but on a thinner timetable. There is no version of the Andamans trip that works in July. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 8, 1, 'skip',
  'Monsoon continues. 400-450mm rain. Ferries unreliable, dive operators closed. Skip.',
  NULL,
  'August is the second-wettest month. Ferry network functions at maybe 40 percent of capacity; dive shops are closed. Beach time is non-existent. The Andaman trip does not work this month. Wait for October.',
  'August in Port Blair is more of July with marginally fewer wet days. Rainfall sits at 410-440mm, ferries to Havelock run perhaps three days a week instead of seven, and even on running days last-minute cancellations are common. Dive operators on Havelock and Neil remain shut. The few activities that function - Cellular Jail, the Anthropological Museum - are urban indoor experiences that do not justify flying to an island chain. If you have an unbreakable reason to be in Port Blair in August - work, family - the city functions; if you came for the islands, the islands are not open. Plan for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 9, 2, 'wait',
  'Recovery month. Rainfall easing to 250-300mm. Ferries returning by mid-month. Still patchy.',
  'September is the trickle back to normal. Ferries restart, dive shops re-open in the last 10 days, rainfall halves versus August. Acceptable if dates are completely fixed and the trip is Port Blair-only.',
  'September is on the way out of monsoon but still firmly in it for the first half. Ferry timetables are tentative, dive visibility is 10-15m at best. October is dramatically cleaner with two extra weeks of patience.',
  'September in Port Blair is a slow recovery from the monsoon hammering. Rainfall drops to 250-300mm with most of it falling in the first fortnight. By the third week, ferry services to Havelock resume on a six-day timetable, dive operators re-open with reduced staff, and skies start showing usable sun. Air 25-30C and humidity finally drops below 85 percent. The trip works - just barely. Dive visibility is recovering through 12-18m, hotel rates are at their year-low (often 60 percent off peak), and the islands are emptier than any other open month. Better suited to repeat travelers than first-timers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 10, 4, 'go',
  'Season opens. 100-150mm rainfall mostly first week. 24-31C. Ferries fully restored by mid-month.',
  'October is the season opener. Ferries normalise, dive vis recovers to 20-25m, the entire archipelago is back online. Rates are still 30-40 percent below December peak. The smart traveler''s month.',
  NULL,
  'October in Port Blair is when the islands clearly turn the corner. Rainfall drops to 100-150mm, mostly in the first week, then most of the back half is dry. Air 24-30C, humidity 78-82 percent and falling. By October 15 the Directorate of Shipping Services is running its full Phoenix Bay timetable; by October 25 dive operators on Havelock are at full capacity. Bay of Bengal cyclone risk is real this month - one or two named systems typically form - but most miss the Andamans by skirting north toward Odisha. Hotel rates are still 30-40 percent below December peak. Cellular Jail evening shows resume their full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 11, 4, 'go',
  'Peak builds. 50-80mm rainfall, 23-30C. NE monsoon residual but ferries reliable. Diwali rush.',
  'November is the proper return to form - low rain, stable seas, dive vis at 25m. Diwali week brings a 5-7 day spike in rates and ferry crowding. Outside that window, one of the better-value months.',
  NULL,
  'November is Port Blair properly back in business. The northeast monsoon delivers some residual rain (50-80mm for the month) but as evening showers rather than sustained downpours. Air 23-30C, water 28C, dive visibility back to 25m at North Bay and the Havelock sites. Ferries run their full peak timetable. Diwali week (variable date, usually first half of November) brings a sharp 5-7 day spike: ferry seats sell out 10 days ahead and hotel rates jump 40 percent. Outside that window, the month runs smoothly. Cyclone watch remains active until late November - the last named storm of the season usually forms in the second week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('port-blair', 12, 5, 'go',
  'Peak season. 23-29C, dry, dive vis 28-30m. Christmas-NY 50% premium and ferries sold out.',
  'December delivers the version of the Andamans that drives the entire annual trade. Stable seas, 30m underwater visibility, full operator capacity. Christmas-NY week is genuine peak - book 45 days out.',
  NULL,
  'December is when Port Blair operates at full archipelago strength. Air temperature settles at 23-29C, the lowest of the year, with humidity dropping to 70 percent. Rainfall is 25-40mm scattered through the month. Ferry counters at Phoenix Bay are at their busiest - book Havelock sailings 30 days ahead minimum, 45 for the December 20-31 window. Christmas and New Year drive a 50-60 percent premium on hotel rates and complete sell-outs at the better Havelock resorts. Cellular Jail evening shows fill both slots; arrive 45 minutes early for tickets. The first two weeks of December offer the same conditions as Christmas week at 35-40 percent lower prices.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- HAVELOCK ISLAND (Swaraj Dweep) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 1, 5, 'go',
  'Peak diving. 24-29C, 30m vis, ferries reliable. Book stays 30 days out.',
  'January is the month every dive shop on Havelock has been waiting for. 30m underwater visibility, 26-29C water, no wetsuit needed. Radhanagar empties pre-9am. Cinque and Johnny''s Gorge running daily.',
  NULL,
  'Havelock in January is the version every dive shop wants you to see. Underwater visibility holds at 28-30m through the month - peak conditions for Cinque Island, Johnny''s Gorge, and the Wall sites. Air 24-30C, water 26-29C, no wetsuit required for most divers. Government and private ferries from Port Blair run 4-5 daily slots; Makruzz and ITT Majestic sell out 30 days ahead during peak. Beach 7 (Radhanagar) is busy 4-6pm for sunset - go pre-9am for an empty stretch. The two ATMs both go dry by Sunday afternoon. Carry 15,000 rupees from Port Blair; resorts mostly take card, but local shacks, scooter rentals, dive shops often cash-only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 2, 5, 'go',
  'Driest month. 25-30C, vis 30m+. Quieter than Jan once school holidays end mid-month.',
  'February is the dive nerd''s month - lowest rainfall, calmest seas, water clarity at its annual peak. Manta sightings cluster around Inglis Island in the first fortnight. Hotel rates ease 10-15 percent versus January.',
  NULL,
  'February is Havelock at its operational best. Rainfall sits at 12-20mm for the month, sea state is the year''s calmest, and underwater visibility consistently delivers 30m at the major dive sites. Air 25-30C, water 27-29C. Manta ray sightings cluster around Inglis Island in the first fortnight - dive shops at Beach 1 chase them on dedicated trips, around 6,500-7,500 rupees for a two-tank day. Mid-month, the school-holiday families thin out and the island hands itself back to divers and snorkelers. Radhanagar at sunset still pulls 200-300 people most evenings; the rest of the time it sleeps. Scooter rentals run 400-500 rupees a day.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 3, 4, 'go',
  'Late peak. 26-32C. Vis 25-28m. Ferry timetables hold. Hotel rates 25% below January.',
  'March keeps most of February''s underwater clarity (25-28m vis) at three-quarter prices. Open-water dive course slots open up. Best month for the value-aware traveler willing to handle 32C heat.',
  NULL,
  'March on Havelock is when the peak crowd unwinds and the island starts breathing again. Underwater visibility holds at 25-28m - the slow drop from February''s 30m is barely noticeable on most sites. Air 27-32C, humidity 78 percent, and the breeze off Beach 5 stops being enough by 11am. Ferry timetables are unchanged. Open-water dive course slots, which are sold out solid in December-February, open up to 3-5 day lead time. Dive shops drop rates 15 percent versus peak. Scooter petrol gets harder to find on Sundays - the one fuel pump near Beach 2 takes a day off. Plan around it.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 4, 4, 'go',
  'Hot 28-33C, vis 22-25m. Ferries on schedule, hotel rates 35% off January. Off-peak with full operations.',
  'April is the genuine off-peak window where everything still works - ferries, dive shops, ATMs, restaurants - at substantially lower prices. Trade-off is heat and humidity. Strong call for budget-conscious divers.',
  NULL,
  'April is Havelock running at three-quarter speed for two-thirds the price. Daytime hits 28-33C, water sits at 29C, humidity climbs to 80 percent. Underwater visibility eases from 28m to 22-25m as plankton blooms start. Cinque Island and Johnny''s Gorge dive trips run as scheduled. Ferries from Port Blair maintain peak-season frequency; sea state is calm through almost all of the month. Hotel rates drop 30-40 percent below January peak - the same 4,500 rupee Radhanagar room goes for 2,800. The trade-off is real - air conditioning becomes essential rather than optional, and afternoon humidity makes 90-minute dives genuinely sweaty before the giant stride.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 5, 4, 'go',
  'Last clean month. 28-33C. Vis dropping to 18-22m. Ferries on schedule first 3 weeks.',
  'May is the last fortnight of clean Havelock before the southwest monsoon arrives. First two weeks run like April - dive trips full menu, ferries on time. Lock travel dates by May 18 to be safe.',
  NULL,
  'Havelock in May is the last clean month before the southwest monsoon arrives. Water visibility starts dropping from 25m to around 18m as currents shift. Air 28-33C with humidity climbing - fans and sea breeze, not air conditioning, do most of the work in budget rooms. Ferries still run on schedule but check forecasts daily after the 15th - squalls cancel sailings with 6 hours notice. Diving still on but Cinque Island trips get patchy in the last week. Radhanagar Beach is empty by Indian-domestic standards - most plains travelers have gone home for school exams. Hotel rates 30-40 percent off peak. The version of Havelock locals actually live in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 6, 1, 'skip',
  'Monsoon. 450mm rain, ferries cancelled often, dive shops closed. Do not plan a Havelock trip.',
  NULL,
  'June shuts Havelock down. Dive operators are closed, ferries cancel on rough-sea days, and the trip you came for cannot happen. Beach time is rain-soaked. Reschedule to October or December.',
  'June on Havelock is the island closed. The southwest monsoon delivers 420-470mm of rain across the month with sea state too rough for even the high-speed ferries on most days. Dive operators have shuttered for the season - Barefoot, Dive India, Lacadives all wait until late September to reopen. Radhanagar Beach is technically accessible by scooter but the rain is constant and swimming dangerous. Resorts that stay open run on backup generators through extended power cuts. The Andaman Public Works Department closes single-lane forest sections after heavy rain. There is no version of Havelock that works in June. The next reliable month is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 7, 1, 'skip',
  'Peak monsoon. 500mm rain. Dive operators closed. Ferries cancel routinely. Skip entirely.',
  NULL,
  'July is the worst month at Havelock. Rainfall peaks, sea state hazardous, all dive shops closed, ferry network broken. Cannot recommend even for budget travelers. Wait for late October.',
  'July on Havelock is the worst month of the year. Rainfall hits 480-510mm, the southwest monsoon is at peak intensity, and ferry cancellation rates run above 50 percent. All major dive operators are closed for the season. Underwater visibility - on the rare day a boat could reach a dive site - collapses to 5-8m. Air 25-29C is mild, but the constant rain, 92 percent humidity, and minimal sun mean clothes do not dry, books grow mould, and even short walks soak you through. The handful of resorts that stay open run on staff-leave routines. Pick October-March instead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 8, 1, 'skip',
  'Monsoon continues. 420mm rain, dive shops still closed, ferries unreliable. Skip.',
  NULL,
  'August is more of July - dive shops shut, ferries patchy, beaches unswimmable. The headline experience of Havelock (diving, snorkeling, beach time) is unavailable. Rebook for November.',
  'August on Havelock is July without much improvement. Rainfall settles to 410-440mm, ferries from Port Blair run perhaps three days a week and even those depart late. Dive operators remain closed. The few open resorts function with skeleton crews on monsoon discounts that are not really discounts because there is nothing to do. Radhanagar Beach is unsafe for swimming - the rip-current advisory boards have been up since June. Beach 7 looks dramatic in heavy weather; if your trip is photography rather than swimming or diving, you might extract value, but for most travelers August Havelock is a non-trip. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 9, 2, 'wait',
  'Late monsoon. 280mm rain. Dive shops reopen last week of month. Ferries patchy, vis 12-15m.',
  'Late September starts the slow re-open. Dive shops bring divemasters back in the last 7-10 days, vis recovers to 12-15m. Acceptable only for budget travelers who cannot wait for October.',
  'Only the last week of September is functional. Ferries cancel often, dive trips run skeleton schedules, vis is half what October delivers. October arrives with dramatically better odds - and it is just two weeks away.',
  'September on Havelock is the cautious end of monsoon. Rainfall drops to 240-290mm, most landing in the first half. By the third week, dive operators start bringing staff back from leave - Dive India and Barefoot typically reopen September 25-28, others by October 1. Ferry services from Port Blair restart a six-day timetable in mid-September but cancellations remain a 20 percent risk. Underwater visibility is recovering through 12-15m, well below winter standard. Hotel rates are at year-low. Refund policies are tight. This is a month for the dive-certified traveler who has been before and wants quiet over conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 10, 4, 'go',
  'Season opens. 130mm rain mostly first week. Vis recovers 20-25m. Hotel rates 35% below December.',
  'October is when Havelock comes back fully online. Dive shops at full capacity by October 10, vis at 20-25m, ferries normal. Rates 30-40 percent below December peak. The smart-money month for divers.',
  NULL,
  'October on Havelock is the season opener. Rainfall is 100-150mm, mostly in the first week, then stretches of dry weather. Air 24-30C, water 28-29C, humidity easing through 78 percent. By October 10 the major dive operators (Barefoot, Dive India, Ocean Tribe) are at full capacity with returning divemasters and freshly serviced kit. Underwater visibility recovers to 20-25m at Cinque Island and Pilot Reef. Ferries from Port Blair run their full peak timetable from October 15. The Bay of Bengal cyclone watch is real but most October systems track north toward Andhra Pradesh and Odisha rather than the Andamans. Hotel rates 30-40 percent below December peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 11, 4, 'go',
  'Strong shoulder. 60mm rain, 24-30C, vis 25m. Diwali week books out, otherwise great value.',
  'November is properly back in form. Dive vis 25m, sea calm, rates still 25 percent below December peak outside Diwali week. Strong choice for first-timers who want December conditions at lower prices.',
  NULL,
  'November on Havelock is genuine peak conditions before peak prices arrive. Rainfall drops to 50-80mm as evening showers, sea state is calm through almost the entire month, and underwater visibility holds at 25m at the major dive sites. Air 23-30C, water 28C. Ferries run their full timetable; Makruzz and ITT Majestic have seats at 5-7 day lead time. Dive operators are at full capacity - all the divemasters back from leave, kit serviced, boats running daily Cinque trips. Diwali week (variable date) drives a 5-7 day spike: ferry seats sell out, Radhanagar resorts go to peak rates. Outside that window, the month is the savvy returning diver''s pick.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('havelock-island', 12, 5, 'go',
  'Peak. 23-29C, vis 28-30m. Christmas-NY 50% premium. Book Radhanagar resorts 45 days out.',
  'December delivers the postcard Havelock - 30m visibility, manta encounters, glass-flat seas. The trade-off is full peak pricing and 45-day booking lead times for the better Radhanagar resorts.',
  NULL,
  'December on Havelock is the version that drives the brochures. Underwater visibility at Cinque Island and Johnny''s Gorge holds 28-30m through the month. Air 23-29C, water 28C, humidity 70 percent. Manta ray sightings around Inglis pick up in the second fortnight. Ferries from Port Blair run their maximum frequency but seats are fully booked 30 days out, longer for the December 20-31 window. Radhanagar resorts hit annual peak rates - rooms that go for 4,500 rupees in October sell at 9,000-12,000. The two ATMs cannot feed weekend demand; carry minimum 20,000 rupees from Port Blair. The first 18 days offer the same conditions as Christmas week at 35-40 percent lower prices.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- NEIL ISLAND (Shaheed Dweep) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 1, 5, 'go',
  'Peak. 24-29C, sea calm. Natural Bridge low tide windows daily. Cycle weather perfect.',
  'January is Neil at its finest - calm seas, perfect cycling temperatures, low tide aligns mid-morning for the Natural Bridge. Quieter than Havelock by design. Book stays 21 days out minimum.',
  NULL,
  'Neil in January is the slow, cycling-shaped version of the Andamans. Air 23-29C, sea calm, humidity at the year''s low of 70 percent - the conditions that make 14 sq km of palm-shaded back-roads enjoyable to ride for hours. The Natural Bridge at Howrah Bridge Beach has its low-tide window 9-11am most days through January; check the Fishery Department tide chart at the jetty. Bicycle rentals from Bharatpur Bazaar are 100-150 rupees a day, scooter 400. The single ATM is the bottleneck - empty by 10am some days. Carry minimum 10,000 rupees from Port Blair and assume the ATM will fail.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 2, 5, 'go',
  'Driest. 24-30C. Sitapur sunrise on glass-flat sea. Quieter post-Valentines.',
  'February gives Neil its calmest seas and lowest rainfall. Sitapur sunrise (Beach 5) walks deliver windless mornings for two weeks straight. Couples-heavy first half, quieter second half.',
  NULL,
  'Neil in February is the calmest month of its calmest island. Rainfall sits at 10-15mm for the entire month, sea state is glass-flat through most days, and air temperature 24-30C. Sitapur Beach (Beach 5) is the 5am alarm worth setting - sunrise over the Bay of Bengal with no wind and zero crowd from a 30-minute cycle east of the jetty. Lakshmanpur (Beach 1) handles the sunset shift. The Natural Bridge has its best low-tide alignment 9:30-11am the first fortnight. Couples weight the first half post-Valentine''s. From February 20 onward the island settles back into its slower pace; that is the planner''s window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 3, 4, 'go',
  'Late peak. 26-31C. Snorkel vis 18-22m. Hotel rates 25% off January. Cycling pleasant pre-noon.',
  'March is value Neil. Same beaches, same Natural Bridge, same Sitapur sunrise - 25-30 percent off January rates. Heat builds afternoons, so plan rides 6-10am and 4-6pm. Strong call for second-time visitors.',
  NULL,
  'Neil in March is when the island sheds its peak crowd while keeping most of its weather. Daytime climbs to 26-31C, humidity 76-80 percent. Cycling stays pleasant 6-10am and 4-6pm but the middle of the day moves to a hammock under a casuarina rather than the road. The Natural Bridge tide windows shift - by mid-March the best low tides are 7-8:30am, an early start. Snorkeling visibility at Bharatpur reef holds at 18-22m. Homestays drop 25 percent versus January peak; the popular ones around Lakshmanpur have 5-7 day lead times instead of three weeks. The single ATM is more reliable in March.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 4, 4, 'go',
  'Hot 28-32C. Snorkel vis 18-20m. Sea calm, ferries on schedule. Off-peak with full operations.',
  'April delivers Neil''s slowest pace at the year''s second-lowest prices. The cycling traveler who can handle 32C heat gets near-private beaches and 35 percent off peak rates. Pack rehydration salts; the heat is real.',
  NULL,
  'April on Neil is the off-peak month where the island runs at quarter speed. Daytime hits 28-32C, humidity climbs to 80 percent, and afternoon cycling becomes genuinely difficult. Mornings 5:30-9am and evenings 5-7pm are when the rides happen. Snorkeling at Bharatpur is still good - water 28-29C, visibility 18-20m. Ferries from Port Blair and Havelock run normal schedules. Homestays drop 35 percent from peak; the popular Lakshmanpur ones have walk-in availability. The trade-off is heat management - the island has fewer AC rooms than Havelock proportionally. Power cuts of 1-2 hours afternoons are common. Bring cash. April is for the second-time visitor.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 5, 4, 'go',
  'Last clean window. 28-32C. First 18 days reliable. Late May squalls start.',
  'Early May extends April - clean conditions, very low crowd, big discounts. Lock dates by May 18; after that, ferries from Port Blair and Havelock start cancelling on rough-sea days.',
  NULL,
  'Neil in early May runs much like April with a sharper deadline. The first 18 days are clean - 28-32C, sea calm, snorkel vis 18m, ferries on schedule. Hotel rates are at the year''s second-lowest level (40 percent off January peak) and homestay availability is wide open. From around May 20, the southwest monsoon advance arrives as afternoon squalls and choppier crossings. Ferries from Port Blair and Havelock start posting cancellations on the worst days; the Natural Bridge becomes inaccessible at high tide as swells rise. The Sitapur sunrise walk still happens but the morning sky is increasingly overcast. If you have May dates, push them as early as possible.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 6, 1, 'skip',
  'Monsoon. 400mm rain. Ferries cancel. Beaches dangerous, snorkel impossible. Skip.',
  NULL,
  'June shuts Neil. Ferries cancel half the days, snorkeling impossible, Natural Bridge inaccessible at high swell, beaches unsafe. The trip cannot work. Reschedule to October or November.',
  'June is Neil closed. The southwest monsoon delivers 400-450mm of rain across the month, sea state is too rough for the high-speed ferries on most days, and the inter-island services from Havelock cancel routinely. Snorkeling visibility collapses to 5m. The Natural Bridge - the literal headline of the island - is inaccessible most low tides because the swells make the rocky approach dangerous. Beaches at Lakshmanpur and Sitapur have safety advisories. The handful of homestays that stay open run on staff-leave timetables; restaurants reduce menus to whatever the local fishing boats can land, which in storm weather is very little.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 7, 1, 'skip',
  'Peak monsoon. 480mm rain. Ferry network broken. Skip.',
  NULL,
  'July is the wettest month in Neil. Ferries cancel routinely, snorkeling impossible, Natural Bridge inaccessible. Even getting to the island is unreliable. Wait until late October at minimum.',
  'July on Neil is the worst month of the year. Rainfall touches 470-510mm, the southwest monsoon is at full strength, and ferry connections from Port Blair and Havelock are broken on most days. Even when boats run, the crossing is unpleasant - swells of 3-4m make the 1.5 hour ride genuinely uncomfortable. Snorkeling visibility is 5m or less. The Natural Bridge is a no-go. Cycling - the island''s defining experience - is impossible in the constant rain. Most homestays are closed for staff leave. Air 25-29C is mild but persistent damp makes everything feel colder than the thermometer suggests. The next functional opening is October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 8, 1, 'skip',
  'Monsoon continues. 410mm rain. Most homestays closed. Ferry network broken. Skip.',
  NULL,
  'August is more of July - ferries patchy, beaches unsafe, snorkeling impossible, most homestays shut. The cycling-and-coral version of Neil cannot exist this month. Move dates to November.',
  'August on Neil is July with marginally fewer wet days. Rainfall settles at 380-420mm, ferries from Port Blair and Havelock run perhaps three days a week, and all the headline activities (cycling, snorkeling, Natural Bridge) are unavailable. Most homestays are closed - both because of monsoon damage and because there is simply no demand. The handful that stay open offer monsoon discounts that are not really discounts because nothing is functional. Sitapur sunrise walks happen in driving rain; Lakshmanpur sunsets are obscured by storm cloud. Air 24-29C, humidity above 90 percent. The single ATM works inconsistently - mainland banking deliveries get held up by ferry cancellations.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 9, 2, 'wait',
  'Late monsoon. 270mm rain. Homestays reopening last week. Ferries patchy. Snorkel vis 12m.',
  'Late September on Neil is the cautious re-open. A few homestays reopen the last week, ferries from Port Blair restart a partial timetable, and snorkel vis recovers to 12m. Acceptable for repeat visitors only.',
  'Only the last week of September is functional and even then ferry cancellations are real. Natural Bridge access is patchy as swells stay elevated. Two extra weeks of patience buys October''s clean opening.',
  'September on Neil is the slow, cautious re-open. Rainfall drops to 240-290mm with most landing in the first half. By the third week, homestays start unboarding their windows and rebooting power - around 40 percent of normal capacity by month-end. Ferry services from Port Blair resume a five-day timetable in mid-September; cancellation risk runs at 25 percent. Snorkeling visibility recovers through 12-15m, well below winter standards. The Natural Bridge tide alignment returns to usable but swells make the approach slippery. This is a month for the experienced Andamans visitor who wants Neil at its emptiest. First-timers should wait two more weeks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 10, 4, 'go',
  'Season opens. 110mm rain mostly first week. Vis recovers 18-22m. Cycling weather returning.',
  'October is Neil clearly back. By October 10, ferries normal, homestays at full capacity, snorkel vis 18-22m. Rates are 30-40 percent below December peak. Natural Bridge tide windows back to mid-morning.',
  NULL,
  'October on Neil is the clean season opener. Rainfall is 90-130mm, mostly first week, then long stretches of dry weather. Air 24-30C, water 28-29C, humidity easing through 80 percent. By October 10, all major homestays are open and ferries from Port Blair and Havelock run their full peak timetable. Snorkeling visibility at Bharatpur recovers to 18-22m. Cycling is comfortable again from October 15 onward as humidity drops. The Natural Bridge low-tide windows realign to 9-11am. Hotel rates are 30-40 percent below December peak. Bay of Bengal cyclone watch is real but most October systems track north toward the mainland coast. Bring cash from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 11, 4, 'go',
  'Strong shoulder. 60mm rain, 23-30C. Diwali week busy, otherwise excellent.',
  'November is December conditions at November prices. Sea calm, snorkel vis 22-25m, cycling temperature ideal. Diwali week (variable) is the one busy spike; the rest of the month is the planner''s pick.',
  NULL,
  'November on Neil is genuine peak conditions before peak crowds and prices arrive. Rainfall drops to 50-80mm as evening showers, sea state calm through almost the entire month, snorkeling vis 22-25m. Air 23-30C, water 28C, humidity at a comfortable 75 percent. Cycling weather is back to its prime - 6am to 11am rides feel breezy, evening rides cool. Ferries from Port Blair and Havelock at full timetables. Diwali week (variable date) drives a 5-7 day spike where homestay availability collapses; outside that window, walk-in arrivals can find rooms even in the popular Lakshmanpur belt. Bay of Bengal cyclone risk is fading by mid-month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('neil-island', 12, 5, 'go',
  'Peak. 23-29C, sea calm, snorkel vis 25m. Christmas-NY 50% premium and homestays sold out.',
  'December is Neil at its postcard best. Calm seas, ideal cycling weather, Sitapur sunrise glass-flat. Trade-off is full peak pricing and 30-day booking lead times for the better Lakshmanpur homestays.',
  NULL,
  'December on Neil is the version that earns its reputation. Air 23-29C, sea state glass-calm through most of the month, snorkeling visibility at Bharatpur 25m. The Natural Bridge has clean low-tide windows 9:30-11:30am for most of the month. Cycling weather is at its annual best - a four-hour loop of the entire island feels effortless rather than punishing. Ferries from Port Blair and Havelock run their maximum frequency but seats book out 20-30 days ahead. Lakshmanpur homestays hit peak rates - rooms that go for 2,500 rupees in October sell at 5,500-7,000. The single ATM cannot meet weekend demand; carry minimum 15,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- DIGLIPUR - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 1, 5, 'go',
  'Peak turtle nesting at Kalipur. 22-28C, dry. Saddle Peak trekkable. Ross & Smith ferry running.',
  'January is Diglipur at its operational peak - olive ridley nesting at full intensity, Saddle Peak trail is dry, and the Ross & Smith dinghy crossings run every clear morning. The remote-island experience.',
  NULL,
  'Diglipur in January requires the most logistics and rewards the most. Air 21-28C, dry, humidity at the year''s low. Olive ridley turtles nest at Kalipur Beach through January peak - nightly Forest Department patrols at 7-8pm guide visitors to active nests with strict no-flash, no-loud-talk rules. The Saddle Peak trail (5km, 3 hours, 732m gain) is dry and walkable - register at the checkpoint near Lamiya Bay, start by 6am, carry 2L water minimum. Ross & Smith twin islands sandbar opens at low tide; the dinghy from Aerial Bay runs morning slots only, around 1,200 rupees per head. No mobile network beyond the township. ATMs do not work; carry cash from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 2, 5, 'go',
  'Peak conditions. 22-29C, lowest rainfall. Turtle nesting tail end. Saddle Peak ideal.',
  'February is Diglipur''s cleanest month. Saddle Peak trail trafficable in shorts. Turtle nesting wraps up first fortnight. Ross & Smith dinghy crossings run almost daily. Best month for the full far-north traveler.',
  NULL,
  'Diglipur in February is the cleanest month at the Andamans'' northernmost outpost. Rainfall under 20mm for the month, sea state calm, air 22-29C and dropping below 20C some nights. Olive ridley nesting tails off in the first fortnight - the last 100-200 nests laid before the season ends. Saddle Peak (732m, 5km from the trailhead) is trafficable in shorts and approach shoes; Forest Department permits cost 250 rupees, register at Diglipur ranger office. Ross & Smith dinghy crossings from Aerial Bay run nearly every morning - the sandbar between the two islands fully exposes at low tide for around 2 hours, 9-11am. No mobile network, no ATMs that work; carry 15,000 rupees cash.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 3, 4, 'go',
  'Late peak. 24-30C. Saddle Peak still walkable in mornings. Ferries from Port Blair on schedule.',
  'March is Diglipur with most of February''s weather and sharply fewer visitors. Saddle Peak trail trafficable 5am-9am before heat sets in. Ross & Smith dinghy still daily. For travelers who want quiet over comfort.',
  NULL,
  'Diglipur in March is the quiet end of peak season. Daytime climbs to 25-31C, humidity 76 percent and rising. Saddle Peak trail is still walkable but the heat moves the start time earlier - in the field by 5:30am, off the summit by 10am. The trail itself is dry but the third hour through evergreen forest gets airless. Ross & Smith dinghy crossings still run every clear morning. The 8-10 hour ferry from Port Blair (operates 2-3 times a week, government-only, around 1,200 rupees in deck class) maintains its winter schedule. Road access by NH-223 (290km, 8-9 hours) is reliable. Homestays drop 25 percent. No mobile beyond the township.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 4, 3, 'wait',
  'Hot 28-32C. Saddle Peak only feasible 5-9am. Ross & Smith still running. Heat is the constraint.',
  'April still works at Diglipur but the heat is the headline. Saddle Peak trekkers must be on the trail by 5am. Ross & Smith dinghy still runs. Best for visitors with fixed off-season dates.',
  'Saddle Peak is the centerpiece of the Diglipur trip and April afternoons make it impractical. November-February deliver the same trail without the heat penalty. Move dates if possible.',
  'Diglipur in April is when the heat becomes the planning constraint. Daytime touches 28-32C, humidity 80 percent, and the dense evergreen on the Saddle Peak trail traps it - the trek only realistically works if you are on the trail by 5am and back at the trailhead by 10am. Ross & Smith dinghy crossings still run every clear morning. The ferry from Port Blair maintains its 2-3 sailings per week. Road conditions on NH-223 are still solid pre-monsoon. Kalipur Beach is empty - turtle nesting is over. Homestays drop 35 percent. Mobile-network situation is unchanged - no signal beyond Diglipur town. Pack rehydration salts, accept early starts.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 5, 3, 'wait',
  'Hot 28-33C. First half holds; squalls after the 18th cancel ferries. Saddle Peak only at dawn.',
  'Early May extends April - dawn-only Saddle Peak, dinghy still running, low rates. Lock dates by May 18. After that, the Port Blair ferry starts cancelling and the road washes out in spots.',
  'Diglipur is hard to reach even in good weather. May''s weather window is closing fast and a late-month visit risks being stranded. November-March deliver the trip cleanly.',
  'Diglipur in early May runs much like April with a sharp deadline. The first 18 days are functional - dawn Saddle Peak walks, mid-morning Ross & Smith dinghy crossings, ferry from Port Blair on its winter schedule. Daytime 28-33C, humidity 82 percent, mornings still walkable. From around May 20, the southwest monsoon advance arrives. Ferries to Aerial Bay start cancelling on rough-sea days. NH-223 has 4-5 stretches that wash out under heavy rain - getting back can take 12-18 hours instead of 8-9. Homestays at year-low rates (45 percent off peak) but availability is wide open because no one is here. The next clean Diglipur month is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 6, 1, 'skip',
  'Monsoon. 500mm+ rain. Saddle Peak trail closed, Ross & Smith dinghy off, NH-223 washes out.',
  NULL,
  'June shuts Diglipur completely. Trail closed, dinghy off, road washes out, ferry cancellations near total. Even the township gets cut off for stretches. Cannot recommend. Wait until November.',
  'June at Diglipur is the islands at their most isolated. The southwest monsoon delivers 480-540mm of rain across the month - the heaviest at any inhabited Andaman point. Saddle Peak trail closes by Forest Department order; the path becomes a stream and leeches make it miserable. Ross & Smith dinghy crossings stop entirely as the strait is too rough. The ferry from Port Blair to Aerial Bay cancels on most days; even when it runs, the 8-10 hour open-deck crossing in monsoon is genuinely unpleasant. NH-223 has 4-5 chronic landslide and washout points; entire stretches close for 24-48 hours at a time. Diglipur township operates on backup generators.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 7, 1, 'skip',
  'Peak monsoon. 550mm rain. Township routinely cut off. All headline activities shut. Skip.',
  NULL,
  'July is the worst month at Diglipur. Trail closed, dinghy off, road impassable for days, ferry cancellations near total. The town gets cut off. Reschedule to November-February.',
  'July at Diglipur is the wettest month at the Andamans'' wettest inhabited point. Rainfall touches 530-580mm, the southwest monsoon is at full strength, and the township is repeatedly cut off as NH-223 closes for landslides and washouts. The Saddle Peak trail is shut by the Forest Department. Ross & Smith dinghy services are suspended for the season. The ferry from Port Blair runs perhaps once every ten days. Power cuts run 6-8 hours daily; satellite phone is the only reliable contact for emergencies. Mobile network is non-existent beyond the township and unreliable even there. The medical evacuation logistics alone make July inadvisable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 8, 1, 'skip',
  'Monsoon continues. 460mm rain. Trail closed, dinghy off, road broken. Skip entirely.',
  NULL,
  'August is more of July - trail shut, dinghy off, road broken, ferries patchy. The headline experiences (Saddle Peak, Ross & Smith, turtle beaches) are unavailable. Move to December-February.',
  'August at Diglipur is July with marginally fewer wet days but the same broken infrastructure. Rainfall settles at 440-490mm. The Saddle Peak trail remains closed by Forest Department order. Ross & Smith dinghy crossings are still suspended. NH-223 has 3-4 chronic problem stretches that close intermittently as new landslides feed off August rain. The Port Blair ferry runs 1-2 times across the entire month, and cancellation rates are above 60 percent. The handful of homestays around the township operate at minimum staff. Mobile network beyond town is non-existent and unreliable in town. Wait for late November or December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 9, 2, 'wait',
  'Late monsoon. 320mm rain. Trail still closed. Road repairs ongoing. Ferry resumes mid-month.',
  'Late September is technical re-open but most of Diglipur is still closed. Trail not yet certified, dinghy not running, road has unrepaired washouts. Acceptable only for very flexible plans.',
  'Diglipur''s headline experiences need infrastructure that Forest Department clears November-onward. September is the tease - travel time and risk for a trip that mostly cannot happen. Wait two months.',
  'Diglipur in September is the cautious tail of monsoon and most of the trip remains unavailable. Rainfall drops to 290-340mm, mostly in the first half. The Port Blair ferry restarts 1-2 sailings per week from the third week. NH-223 reopens stretch by stretch as the Andaman Public Works Department clears washouts; the 290km drive is still 12-14 hours. The Saddle Peak trail does not get its Forest Department clearance until late October. Ross & Smith dinghy crossings restart in early October. So September is reaching Diglipur for very little - the township and Kalipur Beach are visitable but the trail and sandbar are not.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 10, 3, 'wait',
  'Recovery. 180mm rain. Trail reopens late month, dinghy resumes early Oct. Road still patchy.',
  'October is partial Diglipur. Ross & Smith dinghy back from Oct 1-7, Saddle Peak reopens last week. Road still has unrepaired stretches. Acceptable from Oct 25 onward.',
  'Most of Diglipur''s draw needs the Forest Department clearance that lands late October at the earliest. November adds two weeks of patience for a substantially cleaner trip. If dates flex, move them.',
  'Diglipur in October is the slow re-open. Rainfall drops to 150-200mm, mostly first 10 days. The Ross & Smith dinghy crossings restart October 1-7 as soon as sea state allows. The Saddle Peak trail typically reopens between October 22 and October 28 - exact date is at the Forest Department''s discretion. Until then, the headline trek is unavailable. The road from Port Blair (NH-223) is back in service but with 2-3 single-lane stretches under repair; expect 10-12 hours rather than the dry-season 8-9. The Port Blair ferry runs 2 sailings a week. Hotel rates 35-40 percent below December peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 11, 4, 'go',
  'Trail open, dinghy running, ferry on schedule. Turtle nesting starts late month. 70mm rain.',
  'November is Diglipur properly open again. Saddle Peak trail certified, Ross & Smith dinghy daily, road repaired. Olive ridley nesting begins last week. The remote-island traveler''s month before December prices.',
  NULL,
  'November is Diglipur back in business. Rainfall drops to 60-90mm as evening showers, sea state calm, road from Port Blair fully repaired by mid-month. The Saddle Peak trail has its Forest Department clearance from November 1; weather is at its best for the trek - 22-28C daytime, low humidity, dry forest underfoot. Ross & Smith dinghy runs every clear morning. Port Blair ferries restored to 2-3 weekly sailings. Olive ridley turtles begin nesting at Kalipur in the last week of November - night patrols start then. Hotel rates 25-30 percent below December peak. No mobile beyond the township. Bring cash, offline maps, headlamps.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('diglipur', 12, 5, 'go',
  'Peak. 21-28C, dry. Olive ridley nesting at full intensity. Saddle Peak ideal. Ross & Smith glass-calm.',
  'December is Diglipur at full height - turtle nests laying nightly, perfect Saddle Peak weather, dinghy crossings clean, road repaired. Christmas-NY premium and bookings 30-day minimum lead time.',
  NULL,
  'December at Diglipur is the version that earns the 8-10 hour ferry ride. Air 21-28C, the lowest of the year, with dry trade-wind nights. Olive ridley nesting at Kalipur is at full intensity - Forest Department patrols every 7-9pm guide groups to nests being laid in real time, no flash, hushed approaches only. Saddle Peak trail is at its annual best - cool, dry, leech-free. Ross & Smith dinghy runs every morning for the 9-11am low-tide window. Christmas-NY week drives a 40-50 percent premium on the few homestays - book 30 days minimum. Mobile network unchanged: nothing beyond town, no working ATMs. Carry 20,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- BARATANG ISLAND - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 1, 5, 'go',
  'Peak. 22-29C, dry. Convoy reliable, mud volcano + caves running. 4am Port Blair start required.',
  'January is when the Baratang day-trip works cleanly. ATR convoy through Jarawa reserve runs on time, limestone caves boat ride is calm, mud volcano viewing dry. Strict no-photo, no-stop rules in convoy.',
  NULL,
  'Baratang in January is the day-trip working at full reliability. The Andaman Trunk Road convoy from Jirkatang gate departs 5:30am, 8:30am, and 12:30pm with a strict no-stop, no-photography pass through the Jarawa Tribal Reserve. From Port Blair this means a 4am wake-up. The mangrove creek boat ride from Nilambur jetty to the limestone cave entrance runs 90 minutes each way - dinghies are 8-10 person, 1,200 rupees per head, calm water through January. The mud volcano viewing platform 7km from the jetty is dry and stable. There is no mobile network on Baratang. Most travelers do this as a 14-hour single-day return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 2, 5, 'go',
  'Driest, calmest. 23-30C. Cave boat ride glass-flat. Convoy on schedule. Best month for Baratang.',
  'February is Baratang at its operational best - lowest rainfall, calmest creeks, convoy timings reliable, mud volcano dry. The day-trip the Port Blair tour operators organise sells out 3-4 days ahead.',
  NULL,
  'Baratang in February is the cleanest version of the day-trip. Rainfall under 15mm for the month, the Lohabarrack mangrove creeks are glass-flat, and the limestone cave is dry-floor right through to the back chamber. Air 23-30C, humidity 72 percent. The ATR convoy runs all three slots reliably. Tour operators in Port Blair sell the full day-trip package - jeep, ferry, boat, mud volcano, lunch, return - for 1,800-2,500 rupees per head with 3-4 day advance bookings required. The Jarawa Reserve rules are absolute: no photography of tribal members, no stopping, no rolling down windows. Forest checkpoint staff are strict; ignoring rules can mean immediate convoy expulsion.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 3, 4, 'go',
  'Late peak. 25-31C. Cave dry, mud volcano stable, creek boat calm. Day-trip prices 20% off Feb.',
  'March keeps February''s working conditions and drops most of the prices. Tour package dips to 1,500-2,000 rupees. ATR convoy still on schedule. Strong call for value-conscious travelers.',
  NULL,
  'Baratang in March holds February''s functional conditions while the prices ease. Rainfall 30-40mm across the month, daytime 25-31C, humidity climbing to 78 percent but mornings still pleasant for the 5:30am convoy. The limestone cave is dry, the mud volcano viewing platform stable, creek boats running on time. Tour operator packages drop to 1,500-2,000 rupees per head as Port Blair tourist load eases. The Jarawa Reserve rules are unchanged. Lunch at Baratang jetty is basic - rice, dal, fish curry, around 200-250 rupees per plate. Some travelers split the 14-hour day with an overnight at Sundri Resort, but accommodation is basic and single-day return is the norm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 4, 4, 'go',
  'Hot 27-32C. Cave still dry, creek boat calm. ATR convoy on schedule. Big heat at the mud volcano.',
  'April is Baratang at off-peak prices with full operations. Tour packages drop to 1,400-1,800 rupees. The trade-off is the 4am start in 27C pre-dawn and 32C mud volcano stops. Bring 3L water per person.',
  NULL,
  'Baratang in April is when the day-trip mechanics keep working but the heat starts hitting hard. Daytime 27-32C, humidity 80 percent, and the mud volcano viewing platform - exposed, treeless, 7km from the jetty - is genuinely unpleasant after 11am. The 5:30am ATR convoy is the planner''s slot; the 12:30pm gets you back to the volcano in midday sun. The limestone cave is still dry-floor, the creek boat ride still calm, the convoy still on schedule. Rainfall is 60-90mm, mostly evening squalls. Tour operators drop packages to 1,400-1,800 rupees per head. Carry 3L water per person, electrolytes, sun cap. Confirm the 4am wake-up plan with the hotel night desk before sleeping.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 5, 3, 'wait',
  'Pre-monsoon. First half OK. After May 18 squalls cancel creek boats and ATR closes for landslides.',
  'Early May at Baratang extends April. First 18 days run on schedule. After the 20th, ATR landslide closures start and creek boats cancel on rough days. Lock dates by mid-month.',
  'Baratang''s creek boat and ATR convoy both depend on stable weather. Late May sees both fail intermittently. October-March are dramatically more reliable for the same trip.',
  'Baratang in early May is April with a clearer deadline. The first 18 days run as expected - 5:30am convoy on schedule, creek boats calm, mud volcano dry, cave accessible. Daytime 28-32C, humidity 82 percent, mornings still functional. From around May 20, the southwest monsoon advance arrives. The ATR has 2-3 chronic landslide points where heavy rain triggers closures of 6-12 hours. Creek boats from Nilambur cancel when squalls move through - and squalls become daily after May 22. Mud volcano viewing in driving rain is a non-event. Tour operators thin out their offerings; many shut for the season after May 25.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 6, 1, 'skip',
  'Monsoon. ATR closes for landslides routinely. Creek boats off, cave access flooded. Skip.',
  NULL,
  'June shuts the Baratang day-trip down. ATR landslide closures, creek boats grounded, limestone cave floor flooded. The full chain of dependencies fails. Reschedule to November.',
  'Baratang in June is the day-trip closed by infrastructure. The Andaman Trunk Road through the Jarawa Reserve has 3-4 chronic landslide stretches that close repeatedly through the monsoon - the route is shut for 6-24 hours at a time. Creek boats from Nilambur are off the water on most days as the creeks run brown and fast with mangrove runoff. The limestone cave floor floods to ankle depth in heavy rain, making the back chamber inaccessible. The mud volcano viewing platform is fine in the rare break of weather but the road in is broken. Tour operators in Port Blair stop selling Baratang packages from June 1 to October 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 7, 1, 'skip',
  'Peak monsoon. ATR closed routinely. All headline activities off. Skip.',
  NULL,
  'July is the worst month for Baratang. ATR shut frequently, creek boats off, cave flooded, no operators selling the package. Cannot recommend. Wait for November.',
  'Baratang in July is the trip impossible. Rainfall in the Middle Andaman ranges hits 500-560mm, the ATR is closed for landslides on roughly half the days of the month, and the creeks at Nilambur run too high and fast for dinghy operations. The limestone cave back chamber is fully flooded; the mud volcano is reachable in theory but the road is the bottleneck. No Port Blair operator sells Baratang packages this month - phone enquiries are met with "not before October 20." Even if road and creeks cooperated for a single day, medical evacuation logistics from Baratang in July make a clear-day trip risky.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 8, 1, 'skip',
  'Monsoon continues. 460mm rain. ATR broken, boats off, cave flooded. Skip entirely.',
  NULL,
  'August is more of July - infrastructure broken, no operators, no functional access. The headline experiences (caves, mud volcano, mangrove boats) are unavailable. Move to November-March.',
  'Baratang in August is July without much improvement. Rainfall 440-490mm, the ATR has chronic problem stretches that close intermittently, and the Nilambur creek boat operations remain suspended. The limestone cave is flooded, the mud volcano road is broken at 2 spots, and Port Blair operators refuse Baratang bookings. The Forest Department is not running ATR convoys reliably for tourism use - the convoy itself runs for resident traffic but with frequent same-day cancellations. There is a small subset of bird-photography travelers who go monsoon Baratang on charter, but for the standard caves-and-mud-volcano day-trip, the month does not work.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 9, 2, 'wait',
  'Late monsoon. 320mm rain. ATR repairs ongoing. Creek boats not yet running. Operators shut.',
  'September is technical re-open but Baratang itself is still closed. ATR has unrepaired landslides, creek boats not yet running, no operators selling tours. Wait two months.',
  'Baratang depends on a chain of working infrastructure (road, convoy, boats, cave access) and that chain is not back together until October at the earliest. November is dramatically cleaner.',
  'Baratang in September is the slow tail of monsoon and the day-trip is mostly still impossible. Rainfall drops to 290-340mm, mostly first half. The ATR has 2-3 unrepaired landslide stretches that the Andaman Public Works Department clears through October. Creek boat operators at Nilambur are mostly still shut - the first ones return mid-October. Port Blair tour operators do not start selling Baratang packages until October 20-25, and even then on a tentative basis. The limestone cave back chamber is still flooded; the mud volcano road is still partly broken. Wait six weeks for November''s clean opening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 10, 3, 'wait',
  'Recovery. 180mm rain. ATR reopens mid-month, creek boats restart late. Last week works.',
  'October is partial Baratang. ATR fully open mid-month, creek boats from Oct 20-25, operators selling packages from Oct 25 onward. Last week of October works; first three weeks do not.',
  'Baratang''s chain of dependencies (road, boat, cave) is not all green until late October. November adds 2 weeks of patience for a fully operational trip at lower booking risk.',
  'Baratang in October is the slow re-open. Rainfall 150-200mm, mostly in the first ten days. The ATR through the Jarawa Reserve has its full-length opening certified by mid-October. Creek boats at Nilambur jetty restart between October 20 and 25; the limestone cave back chamber drains by then. Port Blair tour operators reopen Baratang sales in the last week, with full packages running from around October 25-28. Daytime is 25-30C, mornings comfortable for the 5:30am convoy. The mud volcano viewing platform is dry from mid-month. If your trip dates fall in the last 5 days of October, the day-trip works.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 11, 4, 'go',
  'Properly open. 60mm rain, 23-30C. Convoy on schedule, creek boats daily, cave dry, mud volcano firm.',
  'November is Baratang back on the day-trip menu. ATR convoy on schedule, creek boats daily, cave back chamber dry, mud volcano stable. Tour packages 1,500-2,000 rupees, 25 percent below December.',
  NULL,
  'November is Baratang properly back on the day-trip menu. Rainfall drops to 50-80mm as evening showers, the ATR convoy through the Jarawa Reserve runs reliably, and creek boats from Nilambur jetty are at full capacity. Daytime 23-30C, humidity 75 percent, the morning convoy genuinely pleasant. The limestone cave back chamber is dry-floor through to the deepest point. The mud volcano viewing platform is firm and stable. Port Blair tour operators sell the full Baratang package for 1,500-2,000 rupees per head, 25 percent below December peak. Bookings are 3-4 day lead time. Diwali week brings a 5-7 day spike. Outside that, this is the planner''s month for Baratang.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('baratang-island', 12, 5, 'go',
  'Peak. 22-29C, dry. Convoy reliable, cave dry, creek glass-flat. Christmas-NY 40% premium.',
  'December is the postcard Baratang day-trip - early-morning convoy through ancient forest, mangrove creek calm, cave fully dry, mud volcano firm. Christmas-NY week 40 percent premium and tours sell 5-7 days out.',
  NULL,
  'December at Baratang is the day-trip at its full reliability. Rainfall 25-40mm, daytime 22-29C, humidity 70 percent. The ATR convoy runs all three daily slots without delay. Mangrove creek boats from Nilambur are glass-flat. The limestone cave is dry-floor through to the back chamber - bring a torch, the lighting is minimal. Mud volcano viewing platform is firm. Port Blair tour operators sell the day-package at peak rates - 2,000-2,800 rupees per head - and the Christmas-NY week (December 22 to January 2) drives a 35-40 percent premium plus 5-7 day booking lead times. The Jarawa Reserve rules are unchanged: no photography, no stops, no rolling windows.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
