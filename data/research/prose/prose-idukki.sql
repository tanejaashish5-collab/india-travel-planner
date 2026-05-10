-- Idukki destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: idukki

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 1, 5, 'go',
  'Peak Cardamom Hills window. 14-28C across the district. Idukki Arch Dam permit (KSEB) at full tempo, WLS open.',
  'January is when Idukki district sits in its post-monsoon peak. The KSEB-issued Idukki Arch Dam permit (one of Asia''s highest arch dams at 168.91m, 365.85m length) runs 9am-12pm at the Cheruthoni office. Idukki Wildlife Sanctuary, Calvary Mount, Painavu town all functional.',
  NULL,
  'Idukki district in January is the version every Western Ghats traveller wants. The 5,061 sq km district encompasses Munnar, Eravikulam, Thekkady, Chinnar, Vagamon and Painavu — but Idukki proper centres on the spectacular Cheruthoni-Painavu basin. Daytime 22-28C at lower elevations, 14-18C in the cardamom hills, nights drop to 12-16C. The Idukki Arch Dam — at 168.91m height and 365.85m length, one of the highest arch dams in Asia, blocking the Periyar river between the Kuravan and Kurathi hills — is permit-only access through the Kerala State Electricity Board: applications process at the KSEB Cheruthoni office, 9am-12pm Monday-Friday only, ₹50 nominal fee, identity proof mandatory. Idukki Wildlife Sanctuary (70 sq km, declared 1976) at the Cheruthoni-Painavu side runs Forest Department escorted treks ₹500-800 — leopard, sambar, gaur, lion-tailed macaque, 200+ bird species. Calvary Mount (3km from Painavu town, panoramic Periyar reservoir view), Hill Produce Marketing Society at Kattappana, the cardamom auctions at Spices Park (every Monday-Wednesday, public viewing) all at full tempo. Stays cluster at Vagamon, Kattappana, Painavu, Thodupuzha — homestays ₹1,200-3,000, mid-bracket resorts ₹3,500-7,000. The 4-hour drive from Kochi airport (NH85 + 130km) is at year-clearest visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 2, 5, 'go',
  'Driest month. 16-30C district-wide. KSEB dam permit at full hours, WLS at year-best visibility.',
  'February is the cleanest weather month for the Idukki district. Rainfall under 25mm, cardamom hills clear, KSEB-issued Idukki Arch Dam permit at full 9am-12pm hours. Wildlife Sanctuary tracks dry. Cardamom and pepper estates pre-flowering.',
  NULL,
  'Idukki in February is the technical sweet spot. Rainfall averages 20-25mm across the 5,061 sq km district, daytime 18-30C depending on elevation (cooler in the cardamom hills), nights 14-18C. The Idukki Arch Dam (168.91m height, 365.85m length, one of Asia''s highest arch dams) permit runs full tempo at the KSEB Cheruthoni office, 9am-12pm Monday-Friday — application ₹50 nominal, identity proof mandatory; the dam viewing platform reached after a 2km escorted walk. Idukki Wildlife Sanctuary (70 sq km, Cheruthoni-Painavu side) Forest Department escorted treks at ₹500-800, advance booking 2-3 days at the Painavu range office. Cardamom estates around Kattappana, Vandanmedu, Vandiperiyar at year-clearest visibility — pre-flowering stage but the aroma walks at the established Kannan Devan Hills Plantation Co (KDHPC) and Cardamom Planters Association estates run on demand (₹500-800). Calvary Mount (3km from Painavu, panoramic Periyar reservoir vista), Painavu town, the Idukki District Tourism Office (Kuyilimala viewpoint, 1450m) all at year-best photogenic. Hotel rates drop 25 percent versus January: homestays ₹1,000-2,500, mid-bracket resorts ₹3,000-6,000. Strong call for first-time district visitors looking to combine 2-3 base-points (Munnar / Thekkady / Painavu) in one week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 3, 4, 'go',
  'Last cool window. 18-32C. KSEB permit available. Cardamom flowering visible at higher elevations.',
  'March extends February''s pattern. KSEB Idukki Arch Dam permit at full hours, Wildlife Sanctuary tracks dry, cardamom flowering at higher elevations (1000-1500m). Hotel rates 30 percent below January. Last comfortable window before April pushes humidity past 75 percent.',
  NULL,
  'Idukki in March is the soft-landing month. Daytime 22-32C in the lower district, 18-24C in the cardamom belt, humidity climbing toward 70 percent in the last fortnight, rainfall under 40mm. The Idukki Arch Dam (168.91m height) KSEB permit at the Cheruthoni office runs full 9am-12pm hours — applications still process within the day. Idukki Wildlife Sanctuary (70 sq km) Forest Department escorted treks at ₹500-800 deliver year-best dry-season trail conditions; bird sighting probability climbs as Western Ghats waterholes shrink. Cardamom flowering becomes visible at higher-elevation estates around Kattappana and Vandanmedu (1000-1500m) — the white-and-pink flowers of Elettaria cardamomum begin appearing, a 3-4 week pre-monsoon window unique to March. Plantation walks at established estates in the Cardamom Planters Association cluster ₹500-800. Calvary Mount, Hill Produce Marketing auctions at Kattappana (Monday-Wednesday), Painavu town all at lighter visitor load. Holi long weekend brings a 3-day domestic bump. Stays in the homestay bracket drop 30 percent: ₹900-2,200; mid-bracket resorts at ₹2,800-5,500. Last clean window before April pushes humidity uncomfortable in the lower district.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 4, 3, 'wait',
  'Pre-monsoon. 20-34C lower district. KSEB permit available. Cardamom flowering peaks. Heat tight outside hills.',
  'April still works for the cardamom-belt agenda — Vandanmedu, Kattappana, Vandiperiyar (1000-1500m) hold 22-26C, flowering peaks, plantation walks deliver. Lower-district 32-34C and humidity 75 percent compress outdoor work to dawn-dusk windows.',
  'April pushes the lower Idukki district into pre-summer heat. The cardamom hills (1000-1500m) hold 22-26C and remain workable for plantation walks, but Painavu and Cheruthoni at 600-800m hit 32-34C with 75 percent humidity by 11am. Wildlife Sanctuary trails compress to dawn windows. Pre-monsoon thunderstorms from April 22-28.',
  'Idukki in April is the heat-stratified month. The cardamom belt (Kattappana, Vandanmedu, Vandiperiyar at 1000-1500m elevation) holds 22-26C daytime and remains workable — cardamom flowering hits visible peak through the month, the white-and-pink Elettaria cardamomum bloom carpets some estates. Cardamom Planters Association estate walks at ₹500-800 deliver year-best aroma and visual interest. Lower Idukki (Painavu, Cheruthoni at 600-800m) hits 24-34C with 75 percent humidity by 11am — Idukki Wildlife Sanctuary trails workable only 6am-10am and post-4pm. The Idukki Arch Dam (168.91m height) KSEB permit at Cheruthoni office (9am-12pm) runs normal hours — but the 2km escorted walk to the viewing platform gets gruelling past 10am. Vishu (April 14, Malayalam new year) brings a 3-4 day domestic bump from plains families escaping coastal heat. Hotel rates drop 35 percent versus January: homestays ₹800-2,000, mid-bracket resorts ₹2,500-5,000. Pre-monsoon thunderstorms from April 22-28 bring 30-50mm overnight rains that knock electric supply 2-4 hours afternoons. Push to October if heat-tolerance is low; stay cardamom-belt if dates immovable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 5, 2, 'wait',
  'Pre-monsoon peak. 22-35C lower district. First fortnight workable, last 10 days bring SW-monsoon advance squalls.',
  'Early May extends April — KSEB dam permit active, cardamom belt cooler, plantation walks workable. Last 10 days bring SW-monsoon advance squalls. Hotel rates at year-low. Push to October unless cardamom-belt residency is the trip.',
  'May runs hot in lower Idukki (24-35C, 80 percent humidity). Wildlife Sanctuary trails workable only at day''s edges. Pre-monsoon squalls from May 22 onward bring 30-50mm overnight downpours and knock NH85 traffic. Hotel rates at year-low but the trip compresses sharply.',
  'Idukki in May splits across the elevation gradient. The cardamom belt (Kattappana, Vandanmedu, Vandiperiyar at 1000-1500m) holds 22-28C daytime and remains workable — cardamom flowering tail continues, plantation walks at ₹500-800 deliver. Lower Idukki (Painavu, Cheruthoni at 600-800m) hits 26-35C with 80 percent humidity, Wildlife Sanctuary trails workable only 6am-9am and post-5pm. The Idukki Arch Dam (168.91m height) KSEB permit at Cheruthoni office runs 9am-12pm but the 2km escorted walk to the viewing platform compresses to early morning. By the third week, southwest monsoon advance squalls hit the district — afternoon downpours, hour-long, then back to muggy sun. Pre-monsoon thunderstorms knock electric supply 2-4 hours daily. NH85 Kochi-Thekkady traffic gets first landslide-prone week from May 22-28 onward. Hotel rates at year-low: homestays ₹700-1,800, mid-bracket resorts ₹2,200-4,500. Lock the first 10 days; gamble or skip the last fortnight.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 6, 1, 'skip',
  'SW monsoon onset. 20-28C, 600-800mm rainfall. NH85 landslide-prone, WLS suspends, dam permit usable but soaked. Skip.',
  NULL,
  'June is when the southwest monsoon hits Idukki with full force. NH85 landslide-prone (Adimali-Munnar-Painavu stretches close 1-2 days/week), Wildlife Sanctuary suspends, KSEB dam permit office still open but the 2km walk through monsoon. Wait for October.',
  'Idukki in June is when the southwest monsoon hits the Western Ghats district with full force. The cardamom belt (1000-1500m) receives 600-800mm rainfall, lower Idukki at 600-800m elevation 500-700mm, all part of the district''s 4,000-6,000mm annual total — among the highest in South India. Daytime 22-28C feels mild but constant rain and 90 percent humidity make outdoor activity miserable. NH85 Kochi-Munnar-Thekkady (190km via Adimali) becomes landslide-watch country: Kerala PWD typically closes Adimali-Munnar 1-2 days per week, Kothamangalam-Painavu stretches see similar closures. Idukki Wildlife Sanctuary (70 sq km) Forest Department suspends visits under safety rules. The Idukki Arch Dam (168.91m height) KSEB permit office at Cheruthoni stays open 9am-12pm but the 2km escorted walk to the dam viewing platform becomes a soaked, leech-prone slog. Cardamom Planters Association estate walks suspend in heavy rain. Hotel rates run year-low: homestays ₹600-1,500, mid-bracket resorts ₹1,800-3,500. Calvary Mount, Painavu town indoor activities (Hill Produce Marketing) the only reliable options. The trip you came for cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 7, 1, 'skip',
  'Peak monsoon. 20-27C, 800-1000mm rainfall. NH85 landslide events, WLS closed, dam access wet. Skip.',
  NULL,
  'July is the wettest month at Idukki — 800-1000mm rainfall, NH85 landslide-prone, Wildlife Sanctuary closed, dam permit usable but the walk soaked. Karkidakam Ayurveda residencies the only reason. Wait for October.',
  'Idukki in July is the year''s wettest stretch. Rainfall hits 800-1000mm at the cardamom belt (1000-1500m) and 700-900mm in lower Idukki across 25-27 wet days. Daytime 22-27C with 95 percent humidity and constant downpour make outdoor sustained activity impossible. NH85 Kochi-Munnar-Thekkady closure events run 2-3 days per week as Kerala PWD clears landslides. Idukki Wildlife Sanctuary (70 sq km, Cheruthoni-Painavu side) Forest Department keeps trails closed under safety rules. The Idukki Arch Dam (168.91m height) KSEB permit office at Cheruthoni still issues 9am-12pm but the 2km escorted walk to the viewing platform turns soaked and leech-heavy. Cardamom flowering window has passed; Cardamom Planters Association estate walks suspend on most days. The single legitimate reason to visit in July is Karkidakam — the Malayalam calendar''s monsoon-Ayurveda month (mid-July to mid-August), when traditional medicine holds that monsoon-open pores absorb medicated oils best. Karkidaka Chikitsa packages (14-21 days) at established Ayurveda residencies across the district discount 30-40 percent for the season-residency trade. For the standard Idukki trip, wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 8, 1, 'skip',
  'Monsoon continues. 20-27C, 700-900mm rainfall. NH85 unreliable, WLS closed. Onam closes town. Skip.',
  NULL,
  'August holds the July pattern — 700-900mm rainfall, NH85 landslide-prone, Wildlife Sanctuary closed, dam permit walk soaked. Onam (variable Aug-Sep) shuts most district town operations 3-4 days. Wait for October.',
  'Idukki in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm across 22-25 wet days at the district''s elevation gradient. Daytime 22-27C, 90 percent humidity. NH85 Kochi-Munnar-Thekkady closure events continue 1-2 days per week. Idukki Wildlife Sanctuary (70 sq km, Cheruthoni-Painavu side) Forest Department continues to keep trails closed. The Idukki Arch Dam (168.91m height) KSEB permit office at Cheruthoni stays 9am-12pm but the 2km escorted walk to the viewing platform turns soaked. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August to early September) — closes most district town shops, restaurants, and resort activities for 3-4 days around Thiruvonam. Cardamom Planters Association estate walks suspend on most days; the September-November cardamom harvest preparation begins. Hill Produce Marketing auctions at Kattappana (normally Monday-Wednesday) shift to skeleton hours through Onam. Karkidakam Ayurveda residencies continue through mid-August at established district centres. Hotel rates at year-low outside the Onam bump: homestays ₹600-1,500, mid-bracket resorts ₹1,800-3,500. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 9, 3, 'wait',
  'Monsoon withdrawing. 20-28C, 400-500mm rainfall easing. WLS reopens late month. Cardamom harvest begins.',
  'September is the recovery month. SW monsoon retreats from the Western Ghats by week three, Wildlife Sanctuary trails reopen progressively, NH85 stabilises. Cardamom harvest begins at established estates (Sep-Nov). October is dramatically cleaner.',
  'September is on the way back but Wildlife Sanctuary trails reopen only progressively from week three, NH85 still landslide-watch country in week one. Cardamom harvest begins but estate walks remain weather-dependent. Push to October — same green-flush at materially cleaner conditions.',
  'Idukki in September is the soft re-opening. Rainfall drops to 400-500mm across 16-18 wet days, mostly the first fortnight. Daytime 22-28C across the district, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25; NH85 Kochi-Munnar-Thekkady (190km) stabilises with closure events dropping to under 1 per week from mid-month. Idukki Wildlife Sanctuary (70 sq km) Forest Department reopens trail permits progressively from September 20-25 — leech-heavy, muddy through the month. The Idukki Arch Dam (168.91m height) KSEB permit office at Cheruthoni continues 9am-12pm; the 2km escorted walk to the viewing platform dries out by week three. Cardamom harvest begins at established Cardamom Planters Association estates around Kattappana and Vandanmedu — September-November is the primary picking window, plantation walks at ₹500-800 deliver year-best activity interest. Hill Produce Marketing auctions at Kattappana (Monday-Wednesday) resume normal schedules. Onam tail keeps town shops at light hours through the first week. Hotel rates at year-low: homestays ₹700-1,800, mid-bracket resorts ₹2,000-4,000. October is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 10, 4, 'go',
  'Season opens. 18-29C, 200-300mm rainfall. NH85 stable, WLS open, cardamom harvest peaks. Hotel rates 30 percent below December.',
  'October is the proper season opener. Wildlife Sanctuary trails fully open, NH85 stable, cardamom harvest at peak — the visit-window for plantation visits. NE monsoon overspill 200-300mm rain mostly evenings. Hotel rates 30 percent below December peak.',
  NULL,
  'Idukki in October is when the district returns to full operations. Daytime 21-29C across the district, nights 18-20C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. NH85 Kochi-Munnar-Thekkady (190km via Adimali) stabilises fully by October 15; landslide closures drop to rare events. The Idukki Arch Dam (168.91m height, 365.85m length) KSEB permit at the Cheruthoni office runs full 9am-12pm hours; the 2km escorted walk through dried trail conditions delivers year-best post-monsoon green backdrop. Idukki Wildlife Sanctuary (70 sq km) Forest Department escorted treks at ₹500-800 reopen fully — leech-residue still common on damper trails through October. Cardamom harvest at peak across established Cardamom Planters Association estates — September to November is the primary picking window, October is at its busiest, plantation visits at ₹500-800 deliver year-best activity interest. Hill Produce Marketing auctions at Kattappana (Monday-Wednesday) at year-busiest. Stays drop 30 percent below December peak: homestays ₹1,000-2,200, mid-bracket resorts ₹2,500-5,500. Pack a poncho and a fleece for cardamom-belt evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 11, 5, 'go',
  'High season builds. 16-27C district-wide. Cardamom harvest tail. Dam permit, WLS at full tempo. Rates climb 25 percent.',
  'November is the genuine pivot to Idukki high season. Northeast monsoon residual eases to under 80mm, cardamom harvest tail at established estates, Wildlife Sanctuary at full tempo, Hill Produce auctions packed. Hotel rates climb 20-25 percent across the month.',
  NULL,
  'Idukki in November is when the Western Ghats district turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 19-27C across the district, nights drop to 16-18C, humidity dropping under 70 percent in the back half. The Idukki Arch Dam (168.91m height) KSEB permit at Cheruthoni at full 9am-12pm hours — the 2km escorted walk to the viewing platform at year-best dry conditions. Idukki Wildlife Sanctuary (70 sq km, Cheruthoni-Painavu side) Forest Department escorted treks at ₹500-800 at full tempo — leeches mostly gone by mid-November. Cardamom harvest tail at established Cardamom Planters Association estates around Kattappana and Vandanmedu — the September-November picking window closes mid-November, plantation visits at ₹500-800 deliver last-call activity interest. Hill Produce Marketing auctions at Kattappana (Monday-Wednesday) at year-busiest as the harvest moves to market. Calvary Mount, Painavu town, Idukki District Tourism Office (Kuyilimala viewpoint, 1450m) at peak photogenic. Hotel rates climb 20-25 percent across the month: homestays ₹1,200-2,800, mid-bracket resorts ₹3,000-6,500. Strong call for first-time visitors who want district variety without Christmas-NY rate-tripling.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('idukki', 12, 5, 'go',
  'Peak season. 14-28C district-wide. Christmas-NY rates 2-2.5x, dam permits tight, NH85 packed.',
  'December is the year''s most reliable Idukki window. Cardamom harvest done, district at full operational tempo. Christmas-NY week (Dec 22-Jan 5) drives 2-2.5x rates, KSEB dam permit applications need 1-2 day buffer, NH85 Kochi-Munnar packed.',
  NULL,
  'Idukki in December is operational peak. Daytime 18-28C across the elevation gradient, nights drop to 14-18C in the cardamom belt, rainfall under 30mm. Christmas-NY week (December 22 to January 5) drives the rate-doubling stretch: homestays climb from ₹1,200 to ₹2,500-3,500, mid-bracket resorts from ₹3,000 to ₹6,000-9,000, the small luxury bracket (Vagamon-side estates, Munnar-side spillover) hits ₹15-22k. The Idukki Arch Dam (168.91m height, 365.85m length, one of Asia''s highest arch dams) KSEB permit at Cheruthoni office (9am-12pm Monday-Friday) gets queue waits — applications still process within the day for individual visitors but tour-operator groups hold most early-morning slots. Idukki Wildlife Sanctuary (70 sq km) Forest Department escorted treks (₹500-800) book 3-5 days ahead through Christmas-NY week. Cardamom harvest done; Cardamom Planters Association estates run dormant-period walks. Hill Produce Marketing auctions at Kattappana on usual Monday-Wednesday schedule. Calvary Mount (3km from Painavu, panoramic Periyar reservoir view), the Idukki District Tourism Office Kuyilimala viewpoint (1450m), all at peak photogenic. NH85 Kochi-Munnar-Thekkady (190km via Adimali) at year-busiest — depart Kochi by 7am or arrive after 5pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
