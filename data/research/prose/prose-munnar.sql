-- Munnar destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: munnar

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 1, 5, 'go',
  'Peak Western Ghats window. 8-22C at 1600m. Tea estates dry, Eravikulam open, post-NYE rates ease.',
  'January is when Munnar runs at its post-monsoon peak. Daytime 18-22C, nights drop to 8-10C, the Kanan Devan Hills tea estates are at year-cleanest. Tea Museum (₹100, 9am-4pm, closed Mondays) at full tempo. Eravikulam NP open at 7am-4pm — book online at eravikulam.kerala.gov.in 48-72 hours ahead.',
  NULL,
  'Munnar in January is the version every Western Ghats traveller wants to see. The 1600m hill station sits at 18-22C daytime, 8-10C nights, the Kanan Devan Hills Plantations tea sweep is at year-cleanest visibility. Christmas-NYE rates (which run 2.5-3x peak Dec 22-Jan 5) ease from January 6 — luxury bracket (Windermere, Tea Sanctuary, SpiceTree) drops from ₹18-25k to ₹10-14k, mid-bracket (Issacs Residency, Misty Mountains) holds ₹6-9k, homestays under ₹3,500. Tea Museum at the KDHP Nallathanni estate runs 9am-4pm, closed Mondays — ₹100 entry, the live-leaf processing demonstration runs hourly. Mattupetty Dam (13km, ₹50/person speedboat) and Kundala Lake (20km, pedal boats ₹400/30min) clear weather pulls full daily traffic. Top Station (32km, 1880m) gives the Tamil Nadu border viewline; the drive via Kundala goes via 6-8 hairpins. Eravikulam NP gate at Rajamala (15km from Munnar town) opens 7am, last bus 4pm — online booking at eravikulam.kerala.gov.in is mandatory now (₹125 adult), the bus shuttle from gate to viewing point runs at ₹30. Munnar town gridlocks 11am-3pm; cabs take 45-60 minutes for the 9km Munnar-Mattupetty stretch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 2, 4, 'go',
  'Driest month. 10-24C. Eravikulam closes for tahr calving. Other estates run normally, rates 30 percent off January.',
  'February is the cleanest weather month at Munnar — rainfall under 20mm, tea estates at year-photogenic. Eravikulam NP shuts mid-month for the mandatory tahr calving closure (Feb-Mar) — plan around it. Tea Museum, Top Station, Mattupetty all run normally.',
  NULL,
  'February in Munnar is the technical sweet spot for tea-estate photography. Rainfall averages 15-20mm, daytime 19-24C, nights 10-12C. The Kanan Devan Hills tea sweep — KDHP owns roughly 24,000 hectares across the Munnar high range, the largest single tea estate in South India — is at year-best visibility, especially the Lockhart Gap viewline 12km out on the Top Station road. The catch: Eravikulam NP closes February 1 for the mandatory Nilgiri Tahr calving period under Kerala Forest Department rule (closure runs through end-March; published annually on eravikulam.kerala.gov.in). If the trip is built around the tahr-on-grasslands experience, push to mid-November or April-May. Tea Museum at the Nallathanni estate, Mattupetty Dam, Kundala Lake, Top Station all run unchanged. Hotel rates drop 25-30 percent versus January (the Christmas-NY tail is fully gone): luxury at ₹8-12k, mid-bracket ₹5-7k, homestays ₹2,500-3,500. Anamudi peak (2695m, South India''s highest) is permit-only via the Eravikulam authority — closed alongside the NP this month. The 4-hour drive from Kochi airport (NH85, 130km) is at year-clearest visibility. Light woollens for evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 3, 4, 'go',
  'Last cool month. 12-26C. Eravikulam still closed (calving). Tea estates dry, hotel rates 30-35 percent off January.',
  'March extends February''s pattern minus the tahr access — Eravikulam NP remains closed through end-March under the Kerala Forest Dept calving rule. Tea estates, viewpoints, plantation walks all functional. Last comfortable window before April heat starts pushing into the hill station.',
  NULL,
  'March in Munnar is the soft-landing month before the pre-monsoon push. Daytime 21-26C, nights 12-14C, humidity climbing toward 70 percent in the last fortnight, rainfall under 30mm. The Kanan Devan Hills tea estate walks (Letchmi, Kanniamallay, Devikulam) are at year-driest underfoot. Eravikulam NP at Rajamala remains closed — the Kerala Forest Department''s mandatory tahr calving closure runs February through end-March, reopening April 1 (verify exact date on eravikulam.kerala.gov.in). Anamudi permit access also gated until the NP reopens. Tea Museum at Nallathanni estate (₹100, 9am-4pm, closed Mon) at quieter mid-month visitor load. Mattupetty Dam (13km, KSEB-managed reservoir at 1700m), Kundala Lake (20km), Top Station (32km, on the Tamil Nadu border at 1880m) all run normal hours. Hotel rates drop 30-35 percent versus January peak: luxury at ₹7-11k, mid-bracket ₹4-6k, homestays ₹2,000-3,000. Holi long weekend brings a 3-day domestic bump. The 4-hour Kochi-Munnar drive (NH85 via Adimali) is at year-best visibility before pre-monsoon haze sets in. Last clean window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 4, 4, 'go',
  'Pre-monsoon. 14-28C. Eravikulam reopens April 1 — tahr at peak grassland visibility. Hotel rates lowest non-monsoon.',
  'April is when Eravikulam NP returns to operation after the Feb-Mar calving closure. Tahr on the shola grasslands at year-best visibility — calves now safely grazing alongside adults. Pre-monsoon thunderstorms from April 22-28 but otherwise dry. Hotel rates drop 35-40 percent versus January.',
  NULL,
  'April in Munnar is the under-rated wildlife window. Eravikulam NP reopens April 1 after the mandatory Feb-Mar tahr calving closure (verify exact reopen date on eravikulam.kerala.gov.in) — and the Nilgiri Tahr on the Rajamala shola grasslands are at year-best visibility, calves now alongside the herd, the famous tameness on full display. The 7am-4pm gate runs full tempo, online booking ₹125 adult, the bus shuttle from gate to viewing point runs at ₹30. Daytime 22-28C, nights 14-16C, humidity climbing past 75 percent the last fortnight, rainfall under 50mm with the first pre-monsoon thunderstorms typically hitting April 22-28 (afternoon squalls, hour-long, then back to muggy sun). Tea Museum, Mattupetty Dam, Top Station, Kundala Lake all run normal hours. Vishu (April 14, Malayalam new year) brings a 3-4 day domestic bump from Kerala plains families escaping plains heat. Anamudi (2695m) permit window also reopens — Forest Department issues the climbing permit at the Rajamala office, escorted-only ascent. Hotel rates drop 35-40 percent versus January: luxury at ₹6-10k, mid-bracket ₹4-5k, homestays ₹1,800-2,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 5, 3, 'wait',
  'Pre-monsoon. 16-28C. First fortnight workable, last 10 days bring SW monsoon advance squalls. Hotel rates at year-low.',
  'Early May is the last dry-tea window before the SW monsoon arrives. First fortnight extends April — Eravikulam open, estates walkable. Last 10 days bring monsoon-advance squalls. Hotels at year-low rates outside the May Day weekend bump.',
  'May splits cleanly in two — first fortnight workable (Eravikulam NP open, tea estates dry, hotel rates 40 percent off January), last 10 days bring SW-monsoon advance squalls. Visibility from viewpoints collapses on rainy afternoons.',
  'May in Munnar splits cleanly in two. The first fortnight extends April: daytime 22-28C, humidity 75 percent, Eravikulam NP at Rajamala open at full tempo, tea estate walks workable till noon. Hotel rates at year-low ahead of the monsoon (luxury ₹5-9k, mid-bracket ₹3-5k, homestays ₹1,500-2,500). By the third week, southwest monsoon advance squalls start hitting Kerala — Munnar at 1600m receives the first of the season''s 4,000-6,000mm annual rainfall, typically as 1-2 hour afternoon downpours. Visibility from Top Station (32km) and Lockhart Gap viewline collapses to under 200m on rainy afternoons. Mattupetty Dam pedal-boat operations suspend on heavy days. Eravikulam NP suspends visits when trail conditions become unsafe — check eravikulam.kerala.gov.in same-day. Tea Museum at the Nallathanni estate stays open 9am-4pm. The Kochi-Munnar 130km NH85 drive becomes landslide-watch country from May 22 onward — KSEB reports clearance daily but afternoon arrivals risk being held at Adimali for 1-3 hours. Lock the first 10 days, gamble or skip the last fortnight.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 6, 1, 'skip',
  'SW monsoon onset. 14-22C, 800-1000mm rainfall. Landslides on NH85, viewpoints fogged-out. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Munnar high range with full force. Rainfall 800-1000mm, NH85 landslide-prone (Adimali-Munnar stretch closes 1-2 days/week), Eravikulam suspends visits frequently, viewpoints permanently fogged. The trip you came for cannot happen until October.',
  'June in Munnar is when the southwest monsoon arrives with peak Western Ghats force. The 1600m hill station receives 800-1000mm of rainfall through the month — part of Munnar''s extraordinary 4,000-6,000mm annual total, among the highest in South India. Daytime 16-22C feels mild but constant rain and 95 percent humidity make outdoor activity miserable. The NH85 Kochi-Munnar drive (130km via Adimali) becomes landslide-watch country: the Kerala State Electricity Board and Kerala PWD typically close the Adimali-Munnar stretch 1-2 days per week through the month for clearance, with delays of 3-6 hours common otherwise. Eravikulam NP at Rajamala suspends visits whenever the shola trails turn dangerous — check eravikulam.kerala.gov.in same-day, but plan for cancellation. Viewpoints (Top Station, Lockhart Gap, Mattupetty) lose visibility past 200m on most days. Tea Museum at the Nallathanni estate stays open 9am-4pm, closed Monday — the one reliable indoor option. Hotels run year-low rates (luxury ₹4-7k, mid ₹2,500-4k, homestays ₹1,200-1,800). Kerala''s Karkidakam Ayurveda residencies start mid-July; if a 14-21 day Ayurveda stay is the trip, push to mid-July onward. For the Munnar most travellers come for, wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 7, 1, 'skip',
  'Peak monsoon. 14-22C, 1200-1500mm rainfall. NH85 landslide-prone, Eravikulam suspended often, viewpoints unusable. Skip.',
  NULL,
  'July is the wettest month at Munnar — 1200-1500mm rainfall, NH85 closures frequent, Eravikulam suspends visits regularly, viewpoints fogged. Karkidakam Ayurveda residencies (mid-Jul to mid-Aug) are the only valid reason to visit. Wait for October.',
  'July in Munnar is the year''s wettest stretch. Rainfall hits 1200-1500mm at the 1600m elevation across 25-27 wet days, Munnar receives some of the heaviest July rainfall in South India alongside Wayanad. Daytime 16-22C with 95 percent humidity and constant downpour make outdoor sustained activity impossible. NH85 Kochi-Munnar (130km via Adimali) closure events run 2-3 days per week as Kerala PWD clears landslides. Eravikulam NP at Rajamala suspends visits on most days — published same-day at eravikulam.kerala.gov.in. Mattupetty Dam, Kundala Lake, Top Station, Kundala viewpoints all lose visibility past 100m. Tea Museum at Nallathanni estate is the single reliable indoor activity, 9am-4pm, closed Monday. The single legitimate reason to visit in July is Karkidakam — the Malayalam calendar''s Ayurveda month (mid-July to mid-August), when traditional medicine holds that the body''s open monsoon-pores absorb medicated oils best. Karkidaka Chikitsa packages (14-21 days) at established Ayurveda residencies (Tea County, SpiceTree, Camp Noel) discount 30-40 percent for the season-residency trade. For the standard Munnar trip, wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 8, 1, 'skip',
  'Monsoon continues. 14-22C, 1000-1200mm rainfall. NH85 closures frequent, viewpoints unusable. Onam closes town further. Skip.',
  NULL,
  'August holds the July pattern — 1000-1200mm rainfall, NH85 landslide-prone, Eravikulam suspended frequently. Onam (variable Aug-Sep) closes town shops 3-4 days. Karkidakam Ayurveda residencies the only reason to be here. Wait for October.',
  'August in Munnar holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 1000-1200mm across 22-25 wet days at the 1600m elevation. Daytime 16-22C feels mild but the constant rain and 90 percent humidity strip outdoor activity. NH85 Kochi-Munnar (130km via Adimali) closure events continue 1-2 days per week, Kerala PWD clearance schedules unpredictable. Eravikulam NP at Rajamala suspends visits frequently — same-day check at eravikulam.kerala.gov.in is mandatory. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August into September) — closes most Munnar town shops, restaurants, and resort activities for 3-4 days around Thiruvonam. Tea estates suspend pickings during the Onam break. Tea Museum at Nallathanni estate stays open. Karkidakam Ayurveda residencies continue through mid-August — the Malayalam calendar''s monsoon-Ayurveda month is the one valid reason to be in Munnar (Karkidaka Chikitsa packages, 14-21 days, 30-40 percent discounts). Hotels at year-low rates outside the Onam bump. For the Munnar most travellers come for, wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 9, 3, 'wait',
  'Monsoon withdrawing. 14-23C, 400-600mm rainfall easing. Eravikulam more reliable late month. Onam tail.',
  'September is the recovery month. SW monsoon withdraws from the Western Ghats by the third week, Eravikulam NP suspensions ease, NH85 stabilises. Tea estates at year-greenest. October is dramatically cleaner with two extra weeks of patience.',
  'September is on the way back but Eravikulam NP suspensions remain frequent in the first fortnight, NH85 still landslide-watch country, viewpoints fogged on residual-rain days. Push to October — same monsoon-green tea-estate aesthetic at materially cleaner trail and road conditions.',
  'September in Munnar is the soft re-opening. Rainfall drops to 400-600mm across 16-18 wet days, mostly the first fortnight. Daytime 18-23C, nights 14-16C, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25; NH85 Kochi-Munnar (130km via Adimali) stabilises with closure events dropping to under 1 per week from mid-month. Eravikulam NP at Rajamala (online booking eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate) returns to reliable operations from week three. Tea estates are at year-greenest after the monsoon — the Kanan Devan Hills sweep is in cinematic flush. Mattupetty Dam, Kundala Lake, Top Station all gradually return to normal hours. Onam tail-effect (the festival often spills into early September depending on lunar dates) keeps shops at light hours through the first week. Hotel rates climb 15 percent across the month from year-low August levels: luxury at ₹5-8k, mid-bracket ₹3-5k, homestays ₹1,500-2,500. The Karkidakam Ayurveda residency window has closed by mid-September. October is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 10, 4, 'go',
  'Season opens. 14-24C, 200-300mm rainfall. NE monsoon residual, but tea estates greenest of year.',
  'October is the proper season opener. Eravikulam NP at full tempo from October 1, NH85 stable, tea estates at year-greenest after the SW monsoon. NE monsoon overspill brings 200-300mm rain mostly evenings. Hotel rates 30 percent below December peak.',
  NULL,
  'October in Munnar is when the hill station returns to full operations. Daytime 19-24C, nights 14-16C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. The Kanan Devan Hills tea estates are at year-greenest after the southwest monsoon flush; the sweep across Munnar-Top Station-Devikulam is cinematic. Eravikulam NP at Rajamala (online booking eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate) runs full tempo — Nilgiri Tahr on the shola grasslands at high visibility before peak winter brings the larger January-February visitor load. Anamudi peak permits (2695m, South India''s highest, escorted-only) reissued by the Rajamala range office. Tea Museum at Nallathanni estate (₹100, 9am-4pm, closed Mon) at light visitor load. NH85 Kochi-Munnar (130km via Adimali) stabilises fully by October 15; landslide closures drop to rare events. Northeast monsoon overspill brings 1-2 hour evening downpours mostly weeks two and three. Hotels: luxury at ₹6-9k (versus ₹14-22k December peak), mid-bracket ₹4-6k, homestays ₹1,800-2,800. Pack a poncho rather than an umbrella and a fleece for evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 11, 5, 'go',
  'High season builds. 12-22C, dry, NE monsoon spent. Eravikulam at peak, tea estates clear, hotel rates climb 25 percent.',
  'November is the genuine pivot to Munnar high season. Northeast monsoon spent by mid-month, rainfall under 80mm, tea estates dry and clear. Eravikulam NP at full tempo. Hotel rates climb 20-25 percent across the month as Christmas-week traffic begins booking.',
  NULL,
  'November in Munnar is when the Western Ghats turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 18-22C, nights 12-14C, humidity dropping under 70 percent in the back half. The Kanan Devan Hills tea estate sweep is at year-clearest visibility — the Lockhart Gap viewline (12km out on the Top Station road) and the Devikulam vista at peak photogenic. Eravikulam NP at Rajamala runs at full tempo (online booking eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate) — Nilgiri Tahr on the shola grasslands, Anamudi (2695m) permit climbs reissued. Tea Museum at Nallathanni estate (₹100, 9am-4pm, closed Mon), Mattupetty Dam (₹50/person speedboat), Kundala Lake (pedal boats ₹400/30min), Top Station (32km, 1880m) all at full operational tempo. Concentration of weekend domestic traffic from November 15 onward as Christmas-week families begin booking. Hotel rates climb 20-25 percent across the month: luxury at ₹8-13k (was ₹6-9k October), mid-bracket ₹4-7k, homestays ₹2,000-3,200. Strong call for first-time visitors who want the season without the Christmas-NY rate-tripling.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('munnar', 12, 5, 'go',
  'Peak season. 8-22C, dry. Christmas-NY rates 2.5-3x. Munnar town gridlock 11am-3pm. Eravikulam slots tight.',
  'December is the year''s most reliable Munnar window — peak Western Ghats weather, full operational tempo. Christmas-NY week (Dec 22-Jan 5) drives rates to 2.5-3x base, Munnar town gridlocks 11am-3pm, Eravikulam NP slots book 7-10 days ahead at eravikulam.kerala.gov.in.',
  NULL,
  'December in Munnar is the year''s most coherent window — peak Western Ghats weather, full estate-and-park operational tempo, the hill station at its widest cross-section. Daytime 18-22C, nights 8-10C (some homestays drop to single digits in the last fortnight), rainfall under 30mm. Christmas-NY week (December 22 to January 5) is the brutally tight stretch: luxury hotels (Windermere, Tea Sanctuary, SpiceTree, Tea County) climb to ₹18-25k against ₹6-9k off-peak; mid-bracket (Issacs Residency, Misty Mountains) hits ₹9-13k against ₹4-7k off-peak; homestays double to ₹3,500-5,000. Munnar town gridlocks 11am-3pm; the 9km Munnar-Mattupetty stretch takes 45-60 minutes by cab; the 32km drive to Top Station (1880m, Tamil Nadu border view) becomes a 3-hour event including hairpin queues. Eravikulam NP slots at Rajamala (online eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate) book 7-10 days ahead through Christmas-NY — book the moment dates lock. Tea Museum at Nallathanni estate (₹100, 9am-4pm, closed Mon) sees its peak month. Anamudi (2695m) permit climbs continue. NH85 Kochi-Munnar (130km via Adimali) is at year-busiest — depart Kochi by 7am or arrive after 5pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
