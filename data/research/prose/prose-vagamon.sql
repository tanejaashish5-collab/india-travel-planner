-- Vagamon destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: vagamon

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 1, 5, 'go',
  'Peak Vagamon window. 12-24C at 1100m. Pine forest dry, paragliding at full tempo, mist till 9am.',
  'January is when Vagamon runs at its post-monsoon peak. The 1100m hill station — pine forest, rolling meadows, mist till 9am — at year-clearest. Paragliding (Indian Paragliding Federation operations) at full tempo, ₹3,500-5,000 per tandem. Kurisumala Ashram, Mooppanpara, Thangal Hill all functional.',
  NULL,
  'Vagamon in January is the version every Western Ghats traveller who wants Munnar-without-the-crowd needs. The 1100m hill station — straddling Idukki and Kottayam districts, 5km from Erattupetta on the Kottayam-Idukki road — sits in pine forest unique to Kerala (Pinus patula plantations from the 1980s) over rolling meadows. Daytime 18-24C, nights drop to 12-14C, mist till 9am most mornings, January is at year-clearest visibility. Paragliding (Indian Paragliding Federation events Jan-Mar) operates from the Kolahalamedu launch point at 1340m — tandem flights ₹3,500-5,000, advance booking 2-3 days through the IPF Vagamon chapter. Kurisumala Ashram (Catholic Cistercian-Trappist monastery established 1958, working dairy farm) at Kurisumala mountain (3km hike from base) at full visitor hours 9am-12pm, 3-5pm; vespers at 5pm open to visitors. Mooppanpara (panoramic 1100m viewpoint), Thangal Hill (Sufi pilgrimage point), Vagamon Lake (KFDC park, ₹30 entry, paddle boats ₹200/30min) all at full tempo. Stays at ₹1,500-4,500 (homestays, plantation cottages); resorts (Vagamon Heights, Misty Meadows, Pine Valley) ₹4-9k. KSEB power cuts run 1-2 hours daily, irregular schedule. Quieter on weekdays — Saturday-Sunday brings a 3-4 hour midday surge from Kochi day-trippers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 2, 5, 'go',
  'Driest month. 14-26C. Paragliding peak (IPF events). Pine forest at year-photogenic.',
  'February is the cleanest weather month at Vagamon — rainfall under 20mm, pine forest dry underfoot, paragliding at peak (Indian Paragliding Federation typically schedules its annual February events here). Hotel rates 25 percent below January. Mid-Feb-March is the smart traveller window.',
  NULL,
  'Vagamon in February is the technical sweet spot. Rainfall averages 15-20mm, daytime 18-26C at the 1100m elevation, nights 14-16C, the pine forest grid (5km of Pinus patula plantations established 1980s) at year-driest underfoot. Paragliding (Indian Paragliding Federation operations from the Kolahalamedu launch at 1340m) hits its peak operational month — IPF typically schedules its annual Vagamon Paragliding Festival in early-to-mid February, drawing 60-80 pilots from across India and 2-3 international teams; tandem rates ₹3,500-5,000, festival-week packages ₹6,000-9,000 including transfers. Kurisumala Ashram (Cistercian-Trappist monastery, 1958, working dairy) at full hours 9am-12pm and 3-5pm. Mooppanpara viewpoint, Thangal Hill, Vagamon Lake (KFDC, ₹30 entry, paddle boats ₹200/30min) all run normal tempo. Hotel rates drop 25 percent versus January peak: homestays at ₹1,200-3,500, mid-bracket resorts (Vagamon Heights, Misty Meadows, Pine Valley) at ₹3,500-7,500, the small luxury bracket (Vagamon Estate, Eastend Vagamon) at ₹7-12k. KSEB power cuts continue 1-2 hours daily. Erattupetta-Vagamon 5km road (the access from KK6, the Kottayam-Idukki state highway) at year-clearest visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 3, 4, 'go',
  'Last cool window. 16-28C. Paragliding tail (IPF). Hotel rates 30 percent below January. Wildflower bloom across meadows.',
  'March extends February''s pattern. Paragliding tail before pre-monsoon convection sets in. Wildflower bloom across the rolling meadows. Hotel rates 30 percent below January. Last comfortable window before April pushes the lower elevations toward 30C.',
  NULL,
  'Vagamon in March is the soft-landing month. Daytime 20-28C at the 1100m elevation, nights 16-18C, humidity climbing toward 70 percent in the last fortnight, rainfall under 30mm. The pine forest grid (5km of Pinus patula plantations from the 1980s) at year-driest underfoot before pre-monsoon humidity returns. Paragliding (Indian Paragliding Federation operations from Kolahalamedu launch at 1340m) at its tail-end month — tandem flights ₹3,500-5,000 still run with 24-hour booking lead, but pre-monsoon convection from late March makes thermals erratic. The annual IPF festival has wound down by week one. Wildflower bloom across the rolling meadows hits visible peak — patches of Strobilanthes, Anaphalis, and Crotalaria run through March-April at the 1100-1400m elevation belt. Kurisumala Ashram (Cistercian-Trappist monastery, 1958), Mooppanpara viewpoint, Thangal Hill (Sufi pilgrimage point), Vagamon Lake (₹30 entry) all at full hours. Hotel rates drop 30 percent versus January peak: homestays at ₹1,000-3,000, mid-bracket resorts at ₹3,000-6,500. KSEB power cuts run 2-3 hours daily as pre-monsoon load increases. Holi long weekend brings a 3-day domestic bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 4, 4, 'go',
  'Pre-monsoon. 18-30C. Wildflower bloom continues. Paragliding erratic. KSEB power cuts 3-4 hours daily.',
  'April still works for Vagamon — the 1100m elevation holds 22-26C in the cardamom-belt zone, wildflower bloom continues, hotel rates 35 percent below January. Paragliding cancels frequently as pre-monsoon convection makes thermals erratic. Vishu April 14 brings a 3-day weekend bump.',
  NULL,
  'Vagamon in April is the pre-monsoon hill-station window. The 1100m elevation holds 22-30C daytime, nights 18-20C, humidity climbing past 75 percent in the last fortnight, rainfall under 50mm with the first pre-monsoon thunderstorms typically hitting April 22-28. The pine forest (5km of Pinus patula plantations from the 1980s) and rolling meadows remain workable — wildflower bloom continues across Strobilanthes, Anaphalis, Crotalaria patches at the 1100-1400m belt. Paragliding (Indian Paragliding Federation operations from Kolahalamedu launch at 1340m) cancels frequently as pre-monsoon convection makes thermal stability erratic — tandem flights ₹3,500-5,000 require same-day weather check. Kurisumala Ashram (Cistercian-Trappist monastery, 1958, working dairy), Mooppanpara viewpoint, Thangal Hill, Vagamon Lake (KFDC, ₹30 entry, paddle boats ₹200/30min) at normal hours. Vishu (April 14, Malayalam new year) brings a 3-4 day domestic bump from plains families escaping coastal heat. Hotel rates drop 35 percent versus January: homestays at ₹900-2,500, mid-bracket resorts at ₹2,500-5,500. KSEB power cuts run 3-4 hours daily as pre-monsoon load peaks; budget homestays without inverters go dark afternoons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 5, 4, 'go',
  'Pre-monsoon. 20-32C. First fortnight workable, last 10 days bring SW-monsoon advance squalls. Wildflower bloom tail.',
  'Early May extends April — Vagamon at 22-26C in the higher zone, wildflower bloom tail, paragliding erratic. Last 10 days bring SW-monsoon advance squalls. Hotel rates at year-low. Vagamon recovers to "monsoon green" faster than other Kerala hill stations.',
  NULL,
  'Vagamon in May is the last reliable hill-station window before the southwest monsoon arrives. The first fortnight extends April: daytime 22-32C at the 1100m elevation, nights 20-22C, humidity 75 percent. Pine forest (5km of Pinus patula plantations) and rolling meadows hold their wildflower-bloom tail. Paragliding (Indian Paragliding Federation operations from Kolahalamedu launch at 1340m) workable but cancels frequently — tandem flights ₹3,500-5,000 require same-day weather check. Kurisumala Ashram, Mooppanpara, Thangal Hill, Vagamon Lake all at normal hours. By the third week, southwest monsoon advance squalls start hitting Kerala — Vagamon at 1100m receives the first of the season''s heavy rainfall typically as 1-2 hour afternoon downpours. Visibility from Mooppanpara viewpoint and Kolahalamedu launch collapses on rainy afternoons; paragliding suspends on stormy days. KSEB power cuts run 3-4 hours daily; budget homestays without inverters go dark afternoons. Hotel rates at year-low: homestays at ₹800-2,200, mid-bracket resorts at ₹2,200-4,800. Lock the first 10 days; the last fortnight is monsoon-arrival territory.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 6, 1, 'skip',
  'SW monsoon onset. 18-26C, 600-800mm rainfall. Paragliding closed, viewpoints fogged, KSEB power unreliable. Skip.',
  NULL,
  'June is when the southwest monsoon hits Vagamon with full force. Indian Paragliding Federation operations suspend completely (mandatory thermal-instability rule), viewpoints permanently fogged. Erattupetta-Vagamon road landslide-prone. Wait for September.',
  'Vagamon in June is when the southwest monsoon hits the 1100m hill station with full Western Ghats force. Rainfall hits 600-800mm at the 1100m elevation across 20-22 wet days. Daytime 20-26C feels mild but constant rain and 90 percent humidity make outdoor activity unworkable. Indian Paragliding Federation operations from Kolahalamedu launch (1340m) suspend completely under mandatory thermal-instability rule for the season. Mooppanpara viewpoint, Thangal Hill, Kolahalamedu — visibility collapses to under 200m on most days. The 5km Erattupetta-Vagamon access road (off the Kottayam-Idukki state highway KK6) becomes landslide-watch country with 1-2 closures per week through Kerala PWD clearance. Pine forest grid (5km of Pinus patula plantations from the 1980s) and rolling meadows turn at peak monsoon green but the trip you came for cannot be walked. Kurisumala Ashram (Cistercian-Trappist monastery, 1958) stays at full visitor hours but the 3km hike from base becomes a soaked, slippery slog. Vagamon Lake (KFDC, ₹30 entry) paddle-boat operations suspend on rough-water days. KSEB power cuts run 4-6 hours daily. Hotels at year-low: homestays ₹600-1,500, mid-bracket ₹1,800-3,500. Skip; Vagamon recovers cleaner than Munnar but September is the next valid window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 7, 1, 'skip',
  'Peak monsoon. 18-25C, 800-1000mm rainfall. Paragliding closed, viewpoints fogged. Karkidakam Ayurveda only. Skip.',
  NULL,
  'July is the wettest month at Vagamon — 800-1000mm rainfall, paragliding suspended, viewpoints fogged, road landslide-prone. Karkidakam Ayurveda residencies the only valid trip-shape. Wait for September.',
  'Vagamon in July is the year''s wettest stretch at the 1100m elevation. Rainfall hits 800-1000mm across 25-27 wet days. Daytime 20-25C with 95 percent humidity and constant downpour make outdoor activity impossible. Indian Paragliding Federation operations from Kolahalamedu launch (1340m) remain suspended under mandatory monsoon-thermal rule. Mooppanpara viewpoint, Thangal Hill — fogged out on most days. The 5km Erattupetta-Vagamon access road (off the Kottayam-Idukki state highway KK6) faces 1-2 landslide closures per week. Pine forest grid (5km of Pinus patula plantations) and rolling meadows at peak monsoon green — the visual aesthetic is at year-best but the trip cannot be walked. Kurisumala Ashram (Cistercian-Trappist monastery, 1958) stays open at visitor hours 9am-12pm, 3-5pm but the 3km hike from base is a soaked slog. Vagamon Lake (KFDC, ₹30 entry) paddle-boat operations suspend. The single legitimate reason to visit in July is Karkidakam — the Malayalam calendar''s monsoon-Ayurveda month (mid-July to mid-August). Karkidaka Chikitsa packages (14-21 days) at established Ayurveda centres in the Vagamon-Erattupetta belt discount 30-40 percent for the season-residency trade. For the standard Vagamon trip, wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 8, 1, 'skip',
  'Monsoon continues. 18-25C, 700-900mm rainfall. Paragliding closed, road landslide-prone. Onam closes town. Skip.',
  NULL,
  'August holds the July pattern — 700-900mm rainfall, paragliding suspended, road landslide-prone. Onam (variable Aug-Sep) shuts most Erattupetta-Vagamon operations 3-4 days. Wait for September.',
  'Vagamon in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm at the 1100m elevation across 22-25 wet days. Daytime 20-25C, 90 percent humidity. Indian Paragliding Federation operations from Kolahalamedu (1340m) remain suspended for the season. Mooppanpara viewpoint, Thangal Hill, Kolahalamedu launch — visibility fogged. The 5km Erattupetta-Vagamon access road (off Kottayam-Idukki state highway KK6) continues landslide-prone with 1-2 closures per week through Kerala PWD clearance. Pine forest grid (5km of Pinus patula plantations) at peak monsoon green. Kurisumala Ashram (Cistercian-Trappist monastery, 1958) at full visitor hours 9am-12pm, 3-5pm. Vagamon Lake (KFDC, ₹30 entry) paddle-boat operations suspend on most days. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August into September) — closes most Erattupetta and Vagamon area shops, restaurants, and resort activities for 3-4 days around Thiruvonam. Karkidakam Ayurveda residencies continue through mid-August. KSEB power cuts run 4-6 hours daily. Hotels at year-low outside the Onam bump: homestays ₹600-1,500, mid-bracket ₹1,800-3,500. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 9, 4, 'go',
  'Recovery. 18-26C, 400-500mm rainfall easing. Paragliding resumes mid-month. Pine forest at year-greenest.',
  'September is when Vagamon returns sharper than other Kerala hill stations — pine forest at year-greenest, paragliding (Indian Paragliding Federation) resumes mid-month, road stabilises. Best Sep-May broader window than Munnar. Hotel rates at year-low.',
  NULL,
  'Vagamon in September is the soft re-opening — and Vagamon recovers cleaner than most Kerala hill stations because the pine forest and rolling meadow aesthetic actually peaks in monsoon-green flush. Rainfall drops to 400-500mm across 16-18 wet days, mostly the first fortnight. Daytime 22-26C at the 1100m elevation, nights 18-20C, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25. Indian Paragliding Federation operations from Kolahalamedu launch (1340m) resume more reliably from mid-month — tandem flights ₹3,500-5,000 with 24-48 hour weather-check booking lead. The 5km Erattupetta-Vagamon access road (off Kottayam-Idukki KK6 state highway) stabilises with closure events dropping to under 1 per week from mid-month. Pine forest grid (5km of Pinus patula plantations from the 1980s) and rolling meadows at year-greenest backdrop — the post-monsoon flush hits its visible peak. Kurisumala Ashram (Cistercian-Trappist monastery, 1958), Mooppanpara viewpoint, Thangal Hill all at full hours. Onam tail keeps Erattupetta-Vagamon shops at light hours through the first week. KSEB power cuts ease to 1-2 hours daily. Hotels at year-low: homestays at ₹800-2,000, mid-bracket resorts at ₹2,200-4,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 10, 4, 'go',
  'Season opens. 16-25C, 200-300mm rainfall. Paragliding at full tempo. Pine forest at year-greenest.',
  'October is the proper season opener at Vagamon. Indian Paragliding Federation operations at full schedule, road stable, pine forest and rolling meadows at year-greenest. NE monsoon overspill 200-300mm rain mostly evenings. Hotel rates 30 percent below January.',
  NULL,
  'Vagamon in October is when the 1100m hill station returns to full operations. Daytime 20-25C, nights 16-18C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. Indian Paragliding Federation operations from Kolahalamedu launch (1340m) at full schedule — tandem flights ₹3,500-5,000, advance booking 24-48 hours through the IPF Vagamon chapter. Pine forest grid (5km of Pinus patula plantations from the 1980s) and rolling meadows at year-greenest — post-monsoon flush at peak photogenic. Kurisumala Ashram (Cistercian-Trappist monastery, 1958, working dairy farm), Mooppanpara viewpoint, Thangal Hill (Sufi pilgrimage point), Vagamon Lake (KFDC, ₹30 entry, paddle boats ₹200/30min) all at full hours. The 5km Erattupetta-Vagamon access road (off Kottayam-Idukki KK6 state highway) stabilises fully by October 15. KSEB power cuts ease to under 1 hour daily. Hotel rates 30 percent below January peak: homestays at ₹1,000-2,500, mid-bracket resorts (Vagamon Heights, Misty Meadows, Pine Valley) at ₹2,800-6,000. Pack a poncho and a fleece for evenings. Strong call for travellers who want a hill station without Munnar''s crowd-and-rate compression.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 11, 5, 'go',
  'High season builds. 14-24C, dry. Paragliding at peak operational tempo. Hotel rates climb 25 percent.',
  'November is when Vagamon turns the corner. Northeast monsoon residual eases to under 80mm, Indian Paragliding Federation operations at peak tempo, pine forest dry. Hotel rates climb 20-25 percent across the month as Christmas-week traffic begins booking.',
  NULL,
  'Vagamon in November is when the 1100m hill station turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 18-24C, nights drop to 14-16C, humidity dropping under 70 percent in the back half. Indian Paragliding Federation operations from Kolahalamedu launch (1340m) at peak operational tempo — tandem flights ₹3,500-5,000, the IPF Vagamon chapter handles 30-50 flights daily through the month, advance booking 2-3 days. Pine forest grid (5km of Pinus patula plantations from the 1980s) at year-clearest visibility. Mooppanpara viewpoint, Kolahalamedu, Thangal Hill at peak photogenic. Kurisumala Ashram (Cistercian-Trappist monastery, 1958), Vagamon Lake (KFDC, ₹30 entry) at full visitor hours. Hotel rates climb 20-25 percent across the month: homestays at ₹1,400-3,200, mid-bracket resorts (Vagamon Heights, Misty Meadows, Pine Valley) at ₹3,500-7,500. Concentration of weekend domestic traffic from November 15 onward — Saturday-Sunday brings 4-6 hour midday surge from Kochi-Kottayam day-trippers. KSEB power supply at year-most-stable. Strong call for first-time visitors who want a hill station with Munnar weather but Vagamon thinness of crowd.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vagamon', 12, 5, 'go',
  'Peak Vagamon season. 12-24C. Christmas-NY rates 2-2.5x. Paragliding bookings tight.',
  'December is the year''s most reliable Vagamon window. Pine forest at peak photogenic, paragliding at full tempo. Christmas-NY week (Dec 22-Jan 5) drives 2-2.5x rates, paragliding bookings tighten to 5-7 day lead, weekend surges intense.',
  NULL,
  'Vagamon in December is operational peak. Daytime 18-24C at the 1100m elevation, nights drop to 12-14C, rainfall under 30mm. Christmas-NY week (December 22 to January 5) drives the rate-doubling stretch: homestays climb from ₹1,400 to ₹3,000-4,000, mid-bracket resorts (Vagamon Heights, Misty Meadows, Pine Valley) from ₹3,500 to ₹7,000-10,000, the small luxury bracket (Vagamon Estate, Eastend Vagamon) at ₹10-15k. Indian Paragliding Federation operations from Kolahalamedu launch (1340m) at year-busiest — tandem flights ₹3,500-5,000, advance booking 5-7 days through the IPF Vagamon chapter (versus 2-3 days off-peak). Pine forest grid (5km of Pinus patula plantations from the 1980s) at year-clearest visibility. Kurisumala Ashram (Cistercian-Trappist monastery, 1958, working dairy), Mooppanpara viewpoint, Thangal Hill (Sufi pilgrimage), Vagamon Lake (KFDC, ₹30 entry, paddle boats ₹200/30min) all at peak season tempo. Weekend domestic surge from December 18 onward — Saturday-Sunday brings 5-7 hour midday traffic on the 5km Erattupetta-Vagamon access road. Mist till 9am most mornings adds to the photogenic appeal. KSEB power supply at year-most-stable. Lock dates and book paragliding slots in the same hour through Christmas-NY.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
