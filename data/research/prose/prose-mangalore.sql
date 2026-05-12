-- Mangalore destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: mangalore | best 10-3 | avoid 6-8 | type city/beach/food/port

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 1, 5, 'go',
  'Peak coastal Karnataka window. 22-32C, dry, sea bathable. Tulu-Konkani heritage walks at year-cleanest.',
  'January is when Mangalore runs at its strongest. Daytime 22-32C, nights 22C, humidity 65 percent, sea calm. St Aloysius Chapel (1885) open 9am-12.30pm and 2-6pm, closed Friday — frescoes by Antonio Moscheni at year-cleanest viewing.',
  NULL,
  'Mangalore in January is the version coastal Karnataka regulars book first. Daytime sits at 24-32C, nights drop to 22C, humidity holds at 65 percent, the Arabian Sea calm enough for swimming at Tannirbhavi, Panambur, and Someshwar beaches. St Aloysius Chapel at Light House Hill (1885, Italian Renaissance interior frescoes by Antonio Moscheni covering every wall and ceiling surface — free entry, 9am-12.30pm and 2-6pm, closed Friday) at year-clearest viewing light. Kadri Manjunatha Temple (10th century, bronze Lokeshwara among India''s oldest cast bronzes) opens 6am-1pm and 4-8pm. Kateel Durga Parameshwari Temple (25km north on the Nandini river island) holds full daily schedule. Pilikula Nisarga Dhama (450-acre nature park, 12km out — zoo, biological park, manmade lake, science centre) ₹40 entry, 9am-5.30pm closed Monday. The food anchors run at full tempo: Pabba''s Ideal Ice Cream (Falnir, gadbad invention 1932 — the layered fruit-nut-jelly-ice-cream parlour-glass that defines Mangalore dessert), New Taj Mahal Cafe Hampankatta (since 1947 — biryani plus gadbad), Janatha Deluxe (Hampankatta — ghee roast), Hotel Narayana (Bunder — kori rotti, neer dosa).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 2, 5, 'go',
  'Driest coastal month. 23-33C. Heritage walks plus beach at year-best. Kambala buffalo races still running.',
  'February is the cleanest coastal Karnataka window. Rainfall under 5mm, humidity easing toward 60 percent. Kambala buffalo races (slushy paddy field racing, Nov-Mar season) still running at Moodbidri-Karkala-Venoor circuits weekend events. Hotel rates ease 15 percent versus January.',
  NULL,
  'Mangalore in February is the technical peak of the coastal Karnataka year. Rainfall under 5mm, daytime 24-33C, nights 22C, humidity 60 percent — the lowest of the year. St Aloysius Chapel interior frescoes (Antonio Moscheni, 1899-1901) at year-cleanest viewing light through the long-side windows; Kadri Manjunatha Temple morning aarti at 6am; Kateel Durga Parameshwari at 25km out works as a half-day trip. Kambala buffalo racing — the slush-paddy field tradition unique to coastal Karnataka, two pairs of buffaloes race through 130-140m water-filled tracks — runs the November-March season; February weekends typically host events at Moodbidri, Karkala, Venoor, Pilikula circuits (verify schedule on kambala.in or local newspaper listings). Tannirbhavi, Panambur, Someshwar beaches at year-cleanest swim conditions. Pabba''s gadbad (₹150-200) at full availability; New Taj Mahal Cafe biryani lunch service 12.30-3pm; Janatha Deluxe ghee roast queue lighter on weekdays. Hotel rates ease 15 percent versus January: Goldfinch ₹3.5-5.5k, Hotel Deepa Comforts ₹2.8-3.8k, Tannirbhavi-front rooms ₹4-7k. Mangalore International (IXE) at 50 percent weekday inbound load.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 3, 4, 'go',
  'Last cool month. 24-34C, humidity climbing to 70 percent. Heritage works dawn and dusk. Rates 25 percent off February.',
  'March extends February''s pattern with the first humidity creep. Heritage walks (St Aloysius, Kadri, Mahatma Gandhi Park) workable 7-11am and after 5pm. Beach swimming clean. Hotel rates 25 percent below February peak.',
  NULL,
  'Mangalore in March is the soft-landing month before pre-monsoon humidity takes the trip into endurance mode. Daytime 25-34C, nights 23-24C, humidity climbing to 70 percent in the last fortnight, rainfall under 20mm. Heritage walks compress to 7-11am and 5-8pm windows. St Aloysius Chapel (1885, free entry 9am-12.30pm/2-6pm closed Friday — Antonio Moscheni frescoes covering every interior surface) holds full hours. Kadri Manjunatha Temple (10c bronze Lokeshwara), Kateel Durga Parameshwari, Mangaladevi Temple (the city''s namesake shrine), Sultan Bathery watchtower (1784 Tipu Sultan coastal lookout, 6km out) all run normal hours. Pilikula Nisarga Dhama 9am-5.30pm closed Monday. Beach swim conditions still clean at Tannirbhavi, Panambur, Someshwar — the rip-current alerts that mark April-May haven''t yet set in. Pabba''s Ideal Ice Cream (Falnir), New Taj Mahal Cafe Hampankatta, Hotel Narayana Bunder all at full availability. Hotel rates drop 25 percent versus February: Goldfinch ₹3-4.5k, Hotel Deepa Comforts ₹2.3-3.2k, Summer Sands Beach Resort at Ullal ₹4-6k. Last comfortable window before April pushes the trip into early-morning-only shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 4, 3, 'wait',
  'Pre-monsoon heat. 27-35C, humidity 78 percent. Heritage walks collapse mid-day. Beach swim only with rip-current advisory.',
  'April still works for AC-museum-and-food travellers willing to time the city. St Aloysius interior, Pabba''s, Hotel Narayana hold up. Hotel rates 30 percent below February.',
  'April pushes Mangalore into pre-monsoon stress. Heritage walks collapse 11am-4pm, Panambur and Tannirbhavi rip-current advisories appear, humidity 78 percent makes the spice-and-port walk in old Bunder unpleasant. Wait for late October.',
  'April in Mangalore is when the coastal city narrows to early-morning and late-evening windows. Daytime 28-35C, nights 25C, humidity 78 percent, sea temperature 30C — bathable but no longer cooling. The 1.5km Mahatma Gandhi Park to St Aloysius Chapel to Light House Hill heritage walk collapses 11am-4pm. AC retreat options: St Aloysius Chapel interior (Antonio Moscheni frescoes, free entry 9am-12.30pm/2-6pm closed Friday), Kadri Manjunatha Temple inner mandapam, Pilikula Biological Park air-conditioned aquarium, Mangalore City Centre Mall. Beach swimming at Tannirbhavi, Panambur, Someshwar gets rip-current advisories from coast guard — lifeguards withdraw on stronger swell days. Pabba''s Ideal Ice Cream (gadbad at year-peak demand — ₹150-200), New Taj Mahal Cafe biryani lunch service, Janatha Deluxe ghee roast, Hotel Narayana kori rotti all run full hours. Hotel rates 30 percent below February peak: Goldfinch ₹2.5-4k, Hotel Deepa Comforts ₹2-3k, Summer Sands Beach Resort Ullal ₹3.5-5k. Mangalore International (IXE) weekday inbound load drops. Push to late October for the trip you came for.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 5, 2, 'wait',
  'Peak pre-monsoon. 28-35C, humidity 82 percent. Pre-monsoon thunderstorms last 10 days. Sea rough.',
  'May functions only for heritage-and-food travellers willing to anchor in AC venues. Mid-month thunderstorms knock grid 1-2 hours daily. Hotel rates at year-low.',
  'May runs hot, sticky, and increasingly grid-unreliable on the Mangalore coast. Pre-monsoon thunderstorms third and fourth weeks, sea swell makes swimming forbidden, the spice-warehouse old town becomes unbearable. October-March window is dramatically better.',
  'May in Mangalore is the closing pre-monsoon month before the southwest current arrives around June 1. Daytime 29-35C, nights 26C, humidity 82 percent, sea temperature 30C with growing swell that closes Tannirbhavi and Panambur to swimming from the third week. Pre-monsoon thunderstorms — short violent squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours and raise humidity to 90 percent for the rest of the day — hit the third and fourth weeks. Heritage walks compress into 6-9am and 6-8pm windows. AC anchors hold: St Aloysius Chapel interior (Antonio Moscheni frescoes, 9am-12.30pm/2-6pm closed Friday), Kadri Manjunatha Temple, Pilikula Nisarga Dhama biological park aquarium. Food anchors run full hours — Pabba''s Ideal Ice Cream (gadbad ₹150-200), New Taj Mahal Cafe Hampankatta biryani and gadbad, Hotel Narayana Bunder kori rotti and neer dosa, Janatha Deluxe Hampankatta ghee roast. Hotel rates at year-low: Goldfinch ₹2-3.5k, Hotel Deepa Comforts ₹1.7-2.7k, Summer Sands Beach Resort ₹3-4.5k. Mangalore Port (New Mangalore Port Trust) sees cyclonic-cell diversions occasionally — build buffer days on coastal travel. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 6, 1, 'skip',
  'SW monsoon onset. 24-29C, 900-1100mm rainfall. Beaches closed, sea bathing prohibited, heritage walking collapses.',
  NULL,
  'June is when the southwest monsoon hits Mangalore with peak coastal Karnataka force. Rainfall 900-1100mm, sea bathing prohibited, heritage walking impossible. Coastal Karnataka coast among the wettest June stations in India. Skip.',
  'June in Mangalore is the southwest monsoon''s arrival point on the coastal Karnataka coast. The current hits the Karnataka coast within 24-48 hours of the Kerala arrival announcement from IMD Thiruvananthapuram. Rainfall jumps from May''s 80mm to 900-1100mm across 24-26 wet days; Mangalore registers as one of the wettest June stations on the Indian west coast alongside Karwar and Honnavar. Daytime 25-29C feels mild but 92 percent humidity and sustained 6-12 hour downpours close down the heritage walk that defines the city. Tannirbhavi, Panambur, Someshwar beaches under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards withdrawn. The cantilever Sultan Bathery watchtower (1784) at Boloor is wet-grass slippery. St Aloysius Chapel, Kadri Manjunatha Temple, Mangaladevi Temple, Indo-Portuguese era churches all hold their hours — the AC-and-museum day works. Hotel rates at year-low: Goldfinch ₹1.8-3k, Hotel Deepa Comforts ₹1.5-2.5k, Tannirbhavi-front rooms ₹2.5-4k. The Konkan Railway between Mangalore and Goa runs at peak landslide-watch operating mode — buffer days on either side mandatory. The trip Mangalore is built for cannot happen until late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 7, 1, 'skip',
  'Peak monsoon. 24-28C, 1000-1200mm rainfall. Sea bathing prohibited, heritage walks impossible. Skip.',
  NULL,
  'July is the wettest month on the Mangalore coast. Rainfall 1000-1200mm across 26-28 wet days, sea forbidden, heritage walks fully rain-locked. Konkan Railway landslide-watch territory. Skip outright.',
  'July in Mangalore is monsoon at its most stubborn. Rainfall averages 1100mm across 26-28 wet days, often as 6-12 hour sustained deluges with cyclonic-cell wind. Daytime 25-28C, humidity 93 percent, the southwest current at full force. Karnataka Tourism red-flag advisory holds for Tannirbhavi, Panambur, Someshwar — sea bathing prohibited, lifeguards withdrawn for the season. St Aloysius Chapel (Antonio Moscheni frescoes, free entry 9am-12.30pm/2-6pm closed Friday) holds its hours but visitor traffic at single digits per session. Kadri Manjunatha Temple, Mangaladevi Temple, Indo-Portuguese chapels run full Mass and aarti schedules — the AC-museum-and-food day is the only viable shape. Pilikula Biological Park runs partial hours, the open-air zoo cages suspended on heavy-rain days. The food anchors are the trip''s salvage: Pabba''s Ideal Ice Cream Falnir (gadbad — the year-around classic), New Taj Mahal Cafe Hampankatta (biryani and gadbad lunch service), Hotel Narayana Bunder (kori rotti, neer dosa, anjal curry), Janatha Deluxe Hampankatta (ghee roast). Hotel rates at year-low: Goldfinch ₹1.8-3k, Hotel Deepa Comforts ₹1.5-2.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rainfall. Krishna Janmashtami pull at Udupi (60km) the only coastal draw. Skip.',
  NULL,
  'August holds July''s pattern with marginally easing rainfall. Sea forbidden, heritage walks rain-locked. Krishna Janmashtami at Udupi Sri Krishna Matha (60km north) the only coastal-pilgrimage cultural anchor of the month. Skip Mangalore proper.',
  'August in Mangalore holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 600-800mm across 23-25 wet days at the coastal elevation. Daytime 25-29C feels mild but constant rain and 91 percent humidity strip outdoor activity. Sea bathing under Karnataka Tourism red-flag advisory — Tannirbhavi, Panambur, Someshwar closed to swimmers, lifeguards off-duty. The Krishna Janmashtami festival cluster (variable date late August into early September) at Udupi Sri Krishna Matha 60km north pulls Hindu pilgrims and Kannada cultural traffic — but that is a Udupi-specific draw, not a Mangalore one. Within Mangalore: St Aloysius Chapel (1885, Antonio Moscheni frescoes) holds its hours, Kadri Manjunatha Temple full schedule, Mangaladevi Temple aarti routine. Food anchors run through — Pabba''s Ideal Ice Cream Falnir (gadbad), New Taj Mahal Cafe Hampankatta (since 1947, biryani plus gadbad), Hotel Narayana Bunder (kori rotti, anjal curry, sukka), Janatha Deluxe (ghee roast). Hotel rates remain year-low: Goldfinch ₹2-3k, Hotel Deepa Comforts ₹1.6-2.6k, Summer Sands ₹2.8-4k. Konkan Railway still landslide-watch. The next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 9, 2, 'wait',
  'Monsoon retreat. 24-30C, 300-400mm rain. Sea still rough through mid-month. Heritage walks resume late.',
  'September is the recovery month. SW monsoon retreats from Karnataka coast around September 25, rainfall halves through the second fortnight, beach reopening from October 1. Late September workable for monsoon-tolerant travellers but October is dramatically cleaner.',
  'September is on the way back but the first fortnight remains heavily wet, sea bathing still under advisory, heritage walks still rain-interrupted 3-4 days per week. Push to mid-October — same coastal aesthetic at materially cleaner sea and road conditions.',
  'September in Mangalore is the trickle back from monsoon. Rainfall drops to 300-400mm across 16-18 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing to 82 percent in the second half. The southwest monsoon retreats from the Karnataka coast around September 25-30 (IMD announces formal withdrawal). Tannirbhavi, Panambur, Someshwar beach swimming remains under Karnataka Tourism advisory through the first three weeks — coast guard lifts the red flag by the last week typically, though strong swell days can extend the closure. St Aloysius Chapel (1885, Antonio Moscheni frescoes) and Kadri Manjunatha Temple at full operational hours; Mangaladevi Temple, Kateel Durga Parameshwari (25km out) and the spice-and-port old Bunder walk resume normal traffic from mid-month. Krishna Janmashtami tail effect at nearby Udupi (60km) extends domestic traffic through the first week. Pilikula Nisarga Dhama 9am-5.30pm closed Monday returns to full attendance. Hotel rates climb 15-20 percent versus August lows: Goldfinch ₹2.5-3.8k, Hotel Deepa Comforts ₹2-3k, Summer Sands Ullal ₹3.5-5k. The October 15 onward window is dramatically cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 10, 4, 'go',
  'Season opens. 24-32C, 200-250mm late-monsoon spillover. Heritage walks return mid-month. Mangaluru Dasara light shows.',
  'October is the season opener for coastal Karnataka. Late-monsoon residue lingers through the first 10 days but the back half delivers full heritage-walk and beach weather.',
  NULL,
  'October in Mangalore is the proper return to coherent. Rainfall drops to 200-250mm with the bulk falling in the first ten days; from October 15 onward Mangalore flips into clean heritage-walk and beach mode. Daytime 25-32C, humidity falling from 85 to 75 percent. St Aloysius Chapel (1885, Antonio Moscheni frescoes — 9am-12.30pm and 2-6pm, closed Friday), Kadri Manjunatha Temple (10c bronze Lokeshwara), Mangaladevi Temple, Kateel Durga Parameshwari (25km out), Sultan Bathery watchtower (1784 Tipu Sultan) all run full schedules. Tannirbhavi, Panambur, Someshwar beaches reopen to swimming as the coast guard lifts the monsoon red-flag — water temperature 28C, sea swell easing through the month. Mangaluru Dasara — the coastal Karnataka''s 10-day Navaratri cluster, distinct from the Mysore palace tradition — runs with cultural light-and-sound events at Sharavu Mahaganapathi Temple and other city shrines. Karnataka Rajyotsava preparation begins for November 1. Hotel rates 25 percent below January peak: Goldfinch ₹3-4.5k, Hotel Deepa Comforts ₹2.3-3.3k, Summer Sands Beach Resort Ullal ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 11, 5, 'go',
  'Peak builds. 23-31C, rainfall under 60mm. Karnataka Rajyotsava Nov 1. Kambala season opens. Rates climb 20 percent.',
  'November is the proper pivot to peak. Rainfall under 60mm, full heritage-walk and beach weather. Karnataka Rajyotsava (Nov 1, state formation day 1956) brings city-wide cultural programmes. Kambala buffalo races open the Nov-Mar season. Hotel rates climb 20 percent across the month.',
  NULL,
  'November in Mangalore is the year''s second-peak month behind January. Rainfall drops under 60mm, daytime 24-31C, sea breeze cooling evenings to 22-23C, humidity dropping below 70 percent. The Arabian Sea returns to full bathable calm at Tannirbhavi, Panambur, Someshwar (water 27C, sea-state green flag). Karnataka Rajyotsava (November 1, marking the 1956 state formation under the States Reorganisation Act) sees city-wide cultural programmes — Kannada language events at Town Hall, cultural processions through Hampankatta, special schedules at Kadri Manjunatha and Mangaladevi temples. Kambala buffalo race season opens — coastal Karnataka''s 600-year tradition of slush-paddy field racing (two buffalo pairs through 130-140m water tracks) opens its November-March circuit. Weekend events at Moodbidri, Karkala, Venoor, Pilikula (verify schedule on kambala.in or local Kannada press). Hotel rates climb 20 percent across the month as Christmas-week starts booking: Goldfinch ₹3.5-5k, Hotel Deepa Comforts ₹2.7-3.7k, Summer Sands Ullal ₹4.5-7k. Pabba''s Ideal Ice Cream and New Taj Mahal Cafe at full tempo.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mangalore', 12, 5, 'go',
  'Peak season. 22-31C, dry. Christmas-NYE rates 2x. Mangalorean Catholic Christmas at year-grandest.',
  'December is when Mangalore runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2x normal. Mangalorean Catholic Christmas — the city is among India''s largest Konkani-Catholic centres — at Rosario Cathedral, Milagres, Holy Cross at year-grandest. Kambala weekends.',
  NULL,
  'December in Mangalore is the operational peak and the most expensive stretch of the coastal Karnataka year. Daytime 23-31C, nights 22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2x the November baseline: Goldfinch hits ₹6-8k, Hotel Deepa Comforts ₹4.5-5.5k, Summer Sands Beach Resort Ullal ₹6-9k, Tannirbhavi sea-front properties ₹7-10k. Mangalorean Catholic Christmas runs at year-grandest — the city is among India''s largest Konkani-Catholic centres (Mangalorean Catholics, the diaspora descended from Goan migrants who settled coastal Karnataka in the 17-18 centuries, hold the Konkani language and Latin-rite Mass distinct from Goan Catholicism). Midnight Mass at Rosario Cathedral, Milagres Church Hampankatta, Holy Cross Church Cordel runs from 10pm Dec 24. St Aloysius Chapel (1885, Antonio Moscheni frescoes) Christmas Day Mass at 6am. Kadri Manjunatha Temple year-end aarti schedule. Kambala buffalo races at Pilikula and Moodbidri (verify dates kambala.in). Tannirbhavi, Panambur, Someshwar beaches at peak swim weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
