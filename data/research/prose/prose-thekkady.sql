-- Thekkady (Periyar Tiger Reserve) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: thekkady

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 1, 5, 'go',
  'Peak Periyar window. 14-26C at 900m. Boat safari tickets tight at sunrise. Bamboo Rafting + Jungle Patrol open.',
  'January is when Periyar Tiger Reserve runs at its post-monsoon peak. KTDC 90-min boat safari at 7am, 9:30am, 11:30am, 1:30pm and 4pm slots — book 2-3 days ahead at ktdc.com or the Thekkady boat jetty counter. ₹350-500 per person depending on lower/upper deck. Wildlife concentrating at Periyar Lake.',
  NULL,
  'Thekkady in January is the version every Western Ghats wildlife regular wants to see. The 925 sq km Periyar Tiger Reserve sits at 900m elevation centred on the 26 sq km Periyar Lake, the Mullaperiyar Dam reservoir created in 1895. Daytime 18-26C, nights drop to 14-16C, the lake at year-clearest. KTDC boat safari (90 minutes, 5 daily slots: 7am, 9:30am, 11:30am, 1:30pm, 4pm) is the primary access — ₹350 lower deck, ₹500 upper deck, book 2-3 days ahead at ktdc.com or the Thekkady boat jetty counter; the 7am sunrise slot delivers the best wildlife concentration (gaur herds at the water, sambar, wild elephant in 2-3 sightings per cruise from December-March). Jungle Patrol — the 3-hour escorted dawn walk with reformed-poacher guides operating under the Periyar Tiger Conservation Foundation — runs at ₹1,500-2,000, advance booking via the ecotourism office at the Thekkady reserve gate. Bamboo Rafting (₹2,500-3,000, 7-hour day-package including breakfast) and Tribal Heritage Museum trail (₹350) at full tempo. Spice plantation walks (Murikkady, Kumily) at ₹500-800. Evening Kathakali (₹400) and Kalaripayattu (₹300) shows in Kumily town nightly. Stays cluster in Kumily (4km from gate): Spice Village CGH Earth (₹14-22k), Carmelia Haven (₹6-10k), homestays ₹1,500-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 2, 5, 'go',
  'Driest month. 16-28C. Boat safari + Jungle Patrol at full tempo. Wildlife concentration starts building.',
  'February is the cleanest of the cool months — rainfall under 20mm, lake levels visibly dropping, wildlife concentration building toward the March-May peak. Boat safari slots ease versus January as Christmas-NY tail clears. Mid-Feb to mid-March is the smart traveller window.',
  NULL,
  'Thekkady in February is the technical sweet spot for the Periyar trip. Rainfall averages 15-20mm, daytime 19-28C at the 900m elevation, nights 16-18C, the Periyar Lake at its driest-firm shoreline as Mullaperiyar Dam levels begin their seasonal decline. The 925 sq km tiger reserve carries a roughly 35-40 tiger population per the National Tiger Conservation Authority''s 2018 census; tiger sightings remain rare but gaur herds, sambar, wild elephant, lion-tailed macaque, and Nilgiri langur all concentrate visibly along the lake''s 26 sq km perimeter. KTDC 90-min boat safari (5 slots from 7am, ₹350-500, book at ktdc.com 2-3 days ahead) at full tempo. Jungle Patrol (3-hour escorted dawn walk with reformed-poacher guides under the Periyar Tiger Conservation Foundation, ₹1,500-2,000) and Bamboo Rafting (₹2,500-3,000, 7-hour day-package) at high availability. Spice plantation walks at Murikkady and Kumily run on demand (₹500-800). Stays in Kumily (4km from gate) drop 25 percent versus January: Spice Village CGH Earth at ₹11-17k, Carmelia Haven at ₹5-8k, homestays ₹1,200-3,000. Evening Kathakali at Mudra Cultural Centre and Kalaripayattu at Vandiperiyar still nightly.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 3, 5, 'go',
  'Wildlife waterhole peak begins. 19-30C. Lake shrinks, animals concentrate. Boat safari sightings at year-best.',
  'March is when Periyar wildlife sighting odds peak — Mullaperiyar Lake levels visibly drop, animals concentrate at the remaining shoreline. Boat safari delivers the year-best gaur, sambar, elephant odds. Jungle Patrol bookings tight. Hotel rates 30 percent below February.',
  NULL,
  'Thekkady in March is when the Periyar wildlife concentration starts paying off. Daytime 21-30C at the 900m elevation, humidity climbing toward 70 percent in the last fortnight, sanctuary tracks at year-driest. Mullaperiyar Lake water levels visibly drop through the month — gaur, sambar, wild elephant, and lion-tailed macaque concentrate at the receding shoreline at year-best sighting probability. KTDC 90-min boat safari (5 slots, ₹350-500, ktdc.com booking) becomes the wildlife-photographer''s window: the 7am dawn cruise routinely returns with 3-5 elephant sightings, gaur herds in 8-12 individuals, sambar at every grazing meadow. The 4pm evening slot delivers second-best odds. Jungle Patrol (3-hour reformed-poacher escorted walk, ₹1,500-2,000) bookings tighten — advance 5-7 days through the Thekkady ecotourism office. Bamboo Rafting (7-hour day-package, ₹2,500-3,000) and Border Hiking (full-day escorted, ₹2,500) sell out on weekends. Holi long weekend brings a 3-day domestic bump. Stays in Kumily (4km from gate) drop another 25 percent: Spice Village CGH Earth at ₹9-14k, Carmelia Haven at ₹4-7k, homestays ₹1,200-2,500. Last cool window before April pushes humidity past 75 percent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 4, 4, 'go',
  'Peak wildlife concentration. 22-32C. Boat safari delivers year-best sightings. Heat compresses trails to dawn-dusk.',
  'April is when Periyar wildlife sighting odds peak — lake at year-low, animals concentrate visibly. Boat safari at year-best for gaur, elephant, sambar. Heat at 30-32C compresses Jungle Patrol and Bamboo Rafting to dawn windows only. Hotel rates 35 percent below January.',
  NULL,
  'Thekkady in April is the peak wildlife-concentration window with the heat-compromise. Daytime 23-32C at the 900m elevation, humidity past 75 percent, Mullaperiyar Lake at year-low water levels. The 925 sq km Periyar Tiger Reserve compresses its wildlife to remaining shoreline — gaur in 10-15 individual sightings per dawn cruise, wild elephant in 4-6 sightings, sambar everywhere, and the 35-40 estimated tigers in the reserve at their year-best (still rare, but the second sighting of the year statistically falls here per Forest Department records). KTDC 90-min boat safari (5 slots from 7am, ₹350-500, book ktdc.com 5-7 days ahead through April peak — Vishu April 14 brings a 3-4 day domestic bump). The 7am sunrise cruise is the year''s prime wildlife photography slot. Jungle Patrol (3-hour, ₹1,500-2,000) and Border Hiking (full-day, ₹2,500) work only at the day''s edges (6am-10am, post-4pm); mid-day 32C makes 3-hour walks unpleasant. Spice plantations (Murikkady, Kumily) shift to early-morning walks. Stays in Kumily (4km from gate): Spice Village CGH Earth at ₹8-12k (versus ₹14-22k January), Carmelia Haven at ₹4-6k, homestays ₹1,200-2,500. Pack hat, electrolytes, leech-socks for shaded patches.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 5, 4, 'go',
  'Wildlife at year-peak concentration. 23-33C. First fortnight clean, last 10 days bring monsoon advance squalls.',
  'Early May extends April — Periyar wildlife concentration at year-peak, boat safari sightings at year-best, lake at year-low. Last 10 days bring SW-monsoon advance squalls; Jungle Patrol and Bamboo Rafting cancel on heavy days. Hotel rates at year-low outside school-holiday tail.',
  NULL,
  'Thekkady in May is the last reliable wildlife window before the monsoon shuts the trip. The first fortnight extends April: daytime 24-33C at the 900m elevation, humidity 75-80 percent, Mullaperiyar Lake at year-low water levels, wildlife concentration at year-peak. KTDC 90-min boat safari (5 slots from 7am, ₹350-500, book ktdc.com 3-5 days ahead) returns 12-15 gaur sightings per dawn cruise, 4-6 elephant, sambar at every meadow. Jungle Patrol (3-hour reformed-poacher escorted walk, ₹1,500-2,000) and Bamboo Rafting (7-hour day-package, ₹2,500-3,000) workable only 6am-10am. By the third week, southwest monsoon advance squalls hit Kerala — afternoon downpours, hour-long, and Periyar Tiger Conservation Foundation suspends Jungle Patrol and Bamboo Rafting on heavy days. Boat safari runs unless wind exceeds threshold. Pre-monsoon thunderstorms knock electricity supply 2-4 hours daily at the reserve. Stays in Kumily (4km from gate) at year-low: Spice Village CGH Earth at ₹7-11k, Carmelia Haven at ₹3-5k, homestays ₹1,000-2,200. Lock the first 10 days; gamble or skip the last fortnight.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 6, 1, 'skip',
  'SW monsoon onset. 21-28C, 600-800mm rainfall. Boat safari suspends often, walks closed. Skip.',
  NULL,
  'June is when the southwest monsoon hits Periyar with full force. KTDC suspends boat safari on rough-lake days (most days mid-month onwards), Forest Dept closes Jungle Patrol and Bamboo Rafting for safety. Wildlife scatters as the lake refills. Wait for October.',
  'Thekkady in June is when the southwest monsoon hits Periyar Tiger Reserve with full Western Ghats force. Rainfall hits 600-800mm at the 900m elevation across 20-22 wet days. Daytime 22-28C feels mild but constant rain and 90 percent humidity make outdoor activity miserable. KTDC suspends 90-min boat safari operations on rough-lake days — by mid-June this becomes most days. Periyar Tiger Conservation Foundation closes Jungle Patrol (3-hour escorted walks), Bamboo Rafting (7-hour day-package), and Border Hiking under safety rules: dangerous trail conditions, swollen streams crossing the patrol routes, leech swarms. Wildlife scatters as Mullaperiyar Lake refills and water sources spread across the 925 sq km reserve — concentration sightings end. NH85 Kochi-Thekkady (190km via Kothamangalam) becomes landslide-watch country. Stays in Kumily (4km from gate) run year-low rates: Spice Village CGH Earth at ₹5-8k (versus ₹14-22k January), Carmelia Haven at ₹2,500-4k, homestays ₹800-1,500. Spice plantation walks (Murikkady, Kumily) suspend in heavy rain. Tribal Heritage Museum (₹350, 9am-4pm) is the only reliable indoor option. The trip you came for cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 7, 1, 'skip',
  'Peak monsoon. 21-27C, 800-1000mm rainfall. Boat safari mostly cancelled, walks closed. Skip.',
  NULL,
  'July is the wettest month at Periyar — 800-1000mm rainfall, KTDC boat safari mostly cancelled, all escorted walks closed under Forest Dept safety rules. Karkidakam Ayurveda residencies at Kumily are the only valid reason to be here.',
  'Thekkady in July is the year''s wettest stretch at Periyar Tiger Reserve. Rainfall hits 800-1000mm at the 900m elevation across 25-27 wet days. Daytime 22-27C with 95 percent humidity and constant downpour. KTDC 90-min boat safari operations cancel on most days as Mullaperiyar Lake gets choppy under heavy rain — the 5 daily slots run only on rare clear windows, sometimes 2-3 sailings the entire week. Periyar Tiger Conservation Foundation keeps Jungle Patrol, Bamboo Rafting, and Border Hiking closed for the season under safety rules. Forest Department patrol roads gate. Wildlife scatters across the 925 sq km reserve as water sources are everywhere. NH85 Kochi-Thekkady (190km via Kothamangalam) faces 1-2 landslide closures per week through Kerala PWD clearance cycles. The single legitimate reason to visit in July is Karkidakam — the Malayalam calendar''s Ayurveda month (mid-July to mid-August), when traditional medicine holds that monsoon-open pores absorb medicated oils best. Karkidaka Chikitsa packages (14-21 days) at established Ayurveda centres in Kumily (Carmelia Haven, Spice Village CGH Earth, Aranya Niwas) discount 30-40 percent for the season-residency trade. For the standard Periyar trip, wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 8, 1, 'skip',
  'Monsoon continues. 21-27C, 700-900mm rainfall. Boat safari mostly cancelled, walks closed. Onam closes town. Skip.',
  NULL,
  'August holds the July pattern — 700-900mm rainfall, KTDC boat safari erratic, walks closed. Onam (variable Aug-Sep) shuts most Kumily town operations 3-4 days. Karkidakam Ayurveda continues mid-Aug. Wait for October.',
  'Thekkady in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm across 22-25 wet days. Daytime 22-27C under near-constant downpour, 90 percent humidity. KTDC 90-min boat safari operations remain erratic — booking ktdc.com shows availability but most slots cancel day-of when Mullaperiyar Lake roughens. Periyar Tiger Conservation Foundation keeps Jungle Patrol, Bamboo Rafting, and Border Hiking closed. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable late August to early September) — closes most Kumily town shops, restaurants, and resort activities for 3-4 days around Thiruvonam, eliminating even spice-plantation walks and Tribal Heritage Museum visits. Karkidakam Ayurveda month continues through mid-August at the established Kumily centres (Carmelia Haven, Spice Village CGH Earth) — 14-21 day Karkidaka Chikitsa residencies the only valid trip-shape. Stays at year-low rates outside the Onam bump: Spice Village at ₹5-7k, Carmelia Haven at ₹2,500-3,500, homestays ₹800-1,500. NH85 Kochi-Thekkady (190km via Kothamangalam) closure events continue 1-2 per week. The standard Periyar trip cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 9, 3, 'wait',
  'Monsoon withdrawing. 21-28C, 400-500mm rainfall easing. Boat safari resumes mid-month. Walks reopen late.',
  'September is the recovery month. SW monsoon retreats from the Western Ghats by week three, KTDC boat safari resumes more reliably from mid-month, Jungle Patrol and Bamboo Rafting reopen late month. October is dramatically cleaner.',
  'September is on the way back but boat safari cancellations remain frequent in the first fortnight, Periyar Tiger Conservation Foundation walks reopen only at month-end. NH85 still landslide-watch country in week one. Push to October — same green-flush forest at materially cleaner conditions.',
  'Thekkady in September is the soft re-opening. Rainfall drops to 400-500mm across 16-18 wet days, mostly the first fortnight. Daytime 23-28C at the 900m elevation, nights 21-22C, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25; KTDC 90-min boat safari operations resume more reliably from mid-month (5 slots from 7am, ₹350-500, book ktdc.com 24-48 hours ahead). Periyar Tiger Conservation Foundation reopens Jungle Patrol (3-hour escorted walks, ₹1,500-2,000) and Bamboo Rafting (7-hour day-package, ₹2,500-3,000) progressively from week three. Trail conditions remain leech-heavy through September — full-coverage leech-socks and salt are essential. Tribal Heritage Museum (₹350, 9am-4pm) at full hours. Wildlife in the 925 sq km reserve at year-greenest backdrop but dispersed across abundant post-monsoon water sources — sighting probability lower than the March-May concentration peak. Onam tail keeps Kumily shops at light hours through the first week. Stays at year-low rates: Spice Village CGH Earth at ₹6-9k, Carmelia Haven at ₹3-5k, homestays ₹1,000-2,200. October is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 10, 4, 'go',
  'Season opens. 18-28C, 200-300mm rainfall. Boat safari + walks at full tempo. Forest at year-greenest.',
  'October is the proper season opener. KTDC boat safari at full schedule from October 1, Periyar Tiger Conservation Foundation walks all reopen, forest at year-greenest. NE monsoon overspill 200-300mm rain mostly evenings. Hotel rates 30 percent below December.',
  NULL,
  'Thekkady in October is when Periyar Tiger Reserve returns to full operations. Daytime 21-28C at the 900m elevation, nights 18-20C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. KTDC 90-min boat safari runs the full 5-slot daily schedule (7am, 9:30am, 11:30am, 1:30pm, 4pm) at ₹350-500, book ktdc.com 2-3 days ahead. Periyar Tiger Conservation Foundation reopens Jungle Patrol (3-hour reformed-poacher escorted walk, ₹1,500-2,000), Bamboo Rafting (7-hour day-package, ₹2,500-3,000), and Border Hiking (full-day escorted, ₹2,500) — advance booking through the Thekkady ecotourism office. The 925 sq km reserve at year-greenest after the southwest monsoon flush; wildlife dispersed across abundant water sources but the forest aesthetic is at year-best. Spice plantation walks (Murikkady, Kumily) at ₹500-800 resume. Tribal Heritage Museum (₹350, 9am-4pm) and evening Kathakali (₹400) plus Kalaripayattu (₹300) shows in Kumily town all return. Stays in Kumily (4km from gate): Spice Village CGH Earth at ₹8-12k (versus ₹14-22k December peak), Carmelia Haven at ₹4-6k, homestays ₹1,200-2,500. Leeches still common on damp trails — full-coverage socks essential.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 11, 5, 'go',
  'High season builds. 16-26C, dry, NE monsoon spent. Boat safari + walks at full tempo. Hotel rates climb 25 percent.',
  'November is the genuine pivot to Periyar high season. Northeast monsoon residual eases to under 80mm across 5-7 days. Boat safari + Jungle Patrol + Bamboo Rafting at full tempo, leeches gone by mid-month. Hotel rates climb 20-25 percent across the month.',
  NULL,
  'Thekkady in November is when Periyar Tiger Reserve turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 19-26C at the 900m elevation, nights drop to 16-17C, humidity dropping under 70 percent in the back half. The 925 sq km reserve at year-clearest visibility post-monsoon. KTDC 90-min boat safari (5 slots from 7am, ₹350-500, book ktdc.com 2-3 days ahead) at full tempo. Periyar Tiger Conservation Foundation runs Jungle Patrol (3-hour, ₹1,500-2,000), Bamboo Rafting (7-hour day-package, ₹2,500-3,000), and Border Hiking (full-day, ₹2,500) at full schedule — leeches mostly gone by mid-November. Mullaperiyar Lake water levels at post-monsoon high but dropping; wildlife waterhole concentration begins building in the last 10 days. Bird-call activity peaks (Malabar trogon, Sri Lanka frogmouth, Heart-spotted woodpecker post-monsoon territorial). Stays in Kumily (4km from gate) climb 20-25 percent across the month: Spice Village CGH Earth at ₹10-15k (was ₹8-12k October), Carmelia Haven at ₹5-8k, homestays ₹1,500-3,000. Concentration of weekend domestic traffic from November 15 onward. Strong call for first-time visitors who want the season without Christmas-NY rate-tripling.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('thekkady', 12, 5, 'go',
  'Peak season. 14-26C, dry. Christmas-NY rates 2.5x. Boat safari slots tight (5-7 day lead). Kumily packed.',
  'December is the year''s most reliable Thekkady window. Boat safari + walks at full tempo. Christmas-NY week (Dec 22-Jan 5) drives ktdc.com booking lead to 5-7 days, Spice Village CGH Earth to ₹16-22k from ₹8-12k October. Kumily town packed.',
  NULL,
  'Thekkady in December is operational peak — peak Western Ghats weather, full Periyar Tiger Reserve operational tempo, Kumily town at peak season cross-section. Daytime 18-26C at the 900m elevation, nights drop to 14-16C in the last fortnight, rainfall under 30mm. Christmas-NY week (December 22 to January 5) drives the brutally tight stretch: KTDC 90-min boat safari ktdc.com booking lead extends from 2-3 days to 5-7 days, the 7am sunrise slot books out 7-10 days ahead through the Christmas tail. Periyar Tiger Conservation Foundation Jungle Patrol (3-hour, ₹1,500-2,000) and Bamboo Rafting (7-hour day-package, ₹2,500-3,000) run at full schedule — bookings tighten to 5-7 day lead through Christmas-NY. Stays in Kumily (4km from gate) hit Christmas-NY peak: Spice Village CGH Earth at ₹16-22k (versus ₹8-12k October), Carmelia Haven at ₹8-12k, homestays ₹2,500-4,500. Mullaperiyar Lake levels begin dropping; wildlife waterhole concentration starts building. Evening Kathakali at Mudra Cultural Centre (₹400) and Kalaripayattu at Vandiperiyar (₹300) book out same-day through holiday week. NH85 Kochi-Thekkady (190km via Kothamangalam) at year-busiest. Lock dates and book the 7am boat safari slot in the same hour.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
