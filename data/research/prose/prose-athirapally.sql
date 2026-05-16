-- Athirapally Falls destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: athirapally
-- REVERSE PATTERN: best months 6-11 (monsoon to post-monsoon flow), avoid 3-5 (trickle, hot)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 1, 4, 'go',
  'Post-monsoon flow strong. 20-32C. Falls at 60 percent of peak monsoon discharge. ₹50 entry, 8am-6pm.',
  'January is when Athirapally runs at its post-monsoon viable window — flow at roughly 60 percent of the August-September peak. Daytime 22-32C, the 80-feet falls (India''s largest by volume flow) still photogenic. ₹50 entry plus ₹50 parking, 8am-6pm. Less crowded than Christmas-NY week.',
  NULL,
  'Athirapally Falls in January is the version most travellers see — strong post-monsoon flow at roughly 60 percent of the August-September monsoon peak. The 80-feet Niagara of India sits on the Chalakudy river, the largest waterfall in Kerala by volume flow during peak season. Daytime 24-32C, nights 20-22C, rainfall under 30mm. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) is at year-firmest dry conditions — the 1.5km descending walk to the base viewing platform is safely walkable. The famous Bahubali-shoot location and dozens of other film references (Raavan, Iruvar, the climactic Bahubali waterfall scene) draws domestic tourist traffic from Kochi and Coimbatore — weekend crowds 4,000-6,000 visitors, weekday 1,500-2,500. The Vazhachal falls (5km upstream, smaller cascading falls, no entry fee) and Charpa falls (10km upstream, 80-feet drop) make a 3-falls day-circuit. Sholayar Forest landscape across the drive offers Lion-tailed Macaque sightings near Vazhachal. Access: 30km from Chalakudy railway station (Kochi-Trivandrum mainline), 70km from Cochin International Airport on NH544 + Athirapally road. Stays cluster at Chalakudy (homestays ₹1,500-2,500), Athirapally village (Rainforest Resort ₹6-10k, Plantation Stay ₹2,500-4,500), no in-park accommodation.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 2, 3, 'wait',
  'Flow weakening. 22-33C. Falls at 40 percent of monsoon peak. Trail dry, weekday quiet.',
  'February is when Athirapally flow visibly drops — 40 percent of August-September peak. Falls still photogenic for non-monsoon-purist travellers. Trail dry, weekday quiet. Hotel rates 25 percent below January.',
  'February is the start of the dry-down. Falls reduce visibly each week — 40 percent of August-September peak by month-end. The 80-feet drop still photogenic but the volume that defines the "Niagara of India" comparison is gone. If the falls are the entire reason for the trip, push to June-November.',
  'Athirapally in February is the technical sweet spot for trail conditions but the start of falls dry-down. Rainfall averages under 15mm, daytime 24-33C, nights 22-24C. The Chalakudy river flow at the falls reduces visibly each week — 40 percent of the August-September monsoon peak by month-end. The 80-feet drop still photogenic but the spray and roar that defined Athirapally''s "Niagara of India" reputation are absent. Trail conditions at year-firmest underfoot — the 1.5km descending walk from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) at clean visibility, weekday visitor load 1,000-2,000 versus weekends 3,000-5,000. Vazhachal (5km upstream) and Charpa (10km upstream) falls also at reduced flow. Sholayar Forest drive at clearest visibility for Lion-tailed Macaque sightings. The 30km Chalakudy-Athirapally road and the 70km Kochi airport drive (NH544 + Athirapally road) at year-clearest. Stays drop 25 percent versus January: Chalakudy homestays at ₹1,200-2,000, Athirapally village stays at ₹2,200-4,000, the small luxury bracket (Rainforest Resort) at ₹5-9k. Strong call only if trail-walk and forest-drive matter more than falls volume.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 3, 1, 'skip',
  'Falls trickle. 24-35C. Flow at 20 percent of monsoon peak. Skip.',
  NULL,
  'March is when Athirapally falls reduce to a trickle. Flow at 20 percent of monsoon peak — the 80-feet structure remains visible but the cascade and spray that define the trip are gone. Wait for June-November.',
  'Athirapally in March is when the falls effectively become a non-trip. Daytime 26-35C, nights 24-26C, humidity climbing toward 70 percent in the last fortnight, rainfall under 25mm. The Chalakudy river flow at Athirapally drops to 20 percent of the August-September monsoon peak by month-end — the 80-feet drop is structurally visible but the cascade reduces to thin sheets over rock. Photographs that worked in August-September look like an empty waterfall. The reason a typical domestic-tourist visit happens here despite the conditions is the location anchor — the 30km drive from Chalakudy railway station, 70km from Cochin International Airport (NH544 + Athirapally road), is built into Kerala-itineraries from Kochi. Trail conditions remain firm but the payoff is hollow. Vazhachal (5km upstream) and Charpa (10km upstream) falls also at year-low. Sholayar Forest drive still delivers Lion-tailed Macaque sighting odds near Vazhachal. Hotel rates 30 percent below January peak: Chalakudy homestays at ₹1,000-1,800, Athirapally village stays at ₹2,000-3,500, Rainforest Resort at ₹4-7k. Holi long weekend brings a 3-day domestic bump but the falls don''t deliver. Wait for June.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 4, 1, 'skip',
  'Falls almost dry. 26-36C. Flow at 10 percent of monsoon peak. Heat compounds. Skip.',
  NULL,
  'April is the year''s low point for Athirapally flow — the 80-feet structure visible but waterless. Heat at 32-36C makes the descending trail walk unpleasant. Wait for June.',
  'Athirapally in April is the year''s low point for falls flow. Daytime 28-36C, nights 26-28C, humidity 70-75 percent. The Chalakudy river catchment is at year-driest ahead of the southwest monsoon arrival; flow at the falls reduces to 10 percent of the August-September peak — the 80-feet drop is visible as sheet-water over rock or stops on the lower tiers. Heat compounds the trail experience: the 1.5km descending walk from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) reads as a hot dusty hike with empty payoff. Vazhachal (5km upstream) and Charpa (10km upstream) also at trickle flow. Sholayar Forest drive remains valuable — Lion-tailed Macaque sightings near Vazhachal continue, though the heat stress on primates makes morning encounters more reliable. Vishu (April 14, Malayalam new year) brings a 3-day domestic bump but the falls don''t deliver. Pre-monsoon thunderstorms from April 22-28 bring 30-50mm overnight rains but no day-flow recovery. Hotel rates at year-low: Chalakudy homestays ₹800-1,500, Athirapally village stays ₹1,800-3,200, Rainforest Resort at ₹3,500-6,500. Wait for June — the same logistics with five times the flow.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 5, 1, 'skip',
  'Falls dry to trickle. 27-37C. Flow at 5-10 percent of peak. Skip.',
  NULL,
  NULL,
  'Athirapally in May is the year''s harshest pre-monsoon month. Daytime 30-37C, nights 27-28C, humidity climbing past 75 percent in the last fortnight. The Chalakudy river flow at the falls reduces to 5-10 percent of the August-September monsoon peak — the 80-feet structure is structurally visible but the cascade is sheet-water over rock or non-flow on the lower tiers. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) becomes a hot, dusty 1.5km descending walk with no meaningful payoff. Pre-monsoon thunderstorms from May 22 onward bring 30-50mm overnight rains and start nudging the catchment but daytime flow remains at year-low. Vazhachal (5km upstream) and Charpa (10km upstream) at year-driest. Sholayar Forest drive remains the higher-value half — Lion-tailed Macaque sightings near Vazhachal hold, especially in early morning before heat stress reduces primate activity. Hotel rates at year-low: Chalakudy homestays at ₹700-1,400, Athirapally village stays at ₹1,500-3,000, Rainforest Resort at ₹3,000-6,000. KSEB power cuts run 3-4 hours daily. June 1 — the official IMD-announced southwest monsoon arrival date for Kerala — is the next valid window. Wait the 2-3 weeks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 6, 4, 'go',
  'SW MONSOON BEGINS. 23-30C, 600-800mm rainfall. Falls rebuild to 60-80 percent of peak. Trail safety closures on heaviest days.',
  'June is when Athirapally flips from non-trip to peak-trip. SW monsoon hits Kerala (IMD declares arrival ~Jun 1), the Chalakudy river catchment refills, falls rebuild from 5-10 percent to 60-80 percent of monsoon peak by month-end. Trail safety closures on heaviest rain days — check Forest Dept same-day.',
  NULL,
  'Athirapally in June is when the falls flip from non-trip to peak-trip — the reverse pattern unique to this destination. The southwest monsoon hits Kerala (IMD-announced official arrival around June 1, verified annually), the Chalakudy river catchment refills, falls flow rebuilds from 5-10 percent of peak in late May to 60-80 percent by month-end. Daytime 24-30C, nights 23-25C, rainfall 600-800mm across 18-22 wet days. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) operates with same-day safety check — Forest Department closes the descending 1.5km walk to the base viewing platform on the heaviest-rain days when slipping risk on the laterite path is too high. The viewing-platform-only experience (no descent) remains accessible most days. The full 80-feet drop runs at peak roar by month''s end. Vazhachal (5km upstream) and Charpa (10km upstream) at strong flow. Sholayar Forest drive offers Lion-tailed Macaque sightings near Vazhachal in clear-windows. Hotel rates climb modestly versus May low — monsoon-photography travellers begin booking: Chalakudy homestays ₹900-1,800, Athirapally village stays at ₹2,000-3,800, Rainforest Resort at ₹4,000-7,500. Pack a poncho rather than an umbrella, leech-socks for any forest walks. NH544 Kochi-Athirapally (70km) at clear visibility most days outside heaviest-rain afternoons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 7, 4, 'go',
  'Peak monsoon. 23-29C, 800-1000mm rainfall. Falls at 90-100 percent of annual peak. Trail closures on heaviest days.',
  'July is when Athirapally hits annual peak flow — 90-100 percent of full monsoon discharge, the falls run at year-best Niagara-of-India volume. Trail closures on heaviest rain days. Karkidakam Ayurveda residencies in the Chalakudy belt also peak.',
  NULL,
  'Athirapally in July is when the falls hit annual peak flow — 90-100 percent of full monsoon discharge, the 80-feet drop runs at year-best Niagara-of-India volume, the spray reaches the viewing platform 50m from the falls edge. Daytime 24-29C, nights 23-25C, rainfall 800-1000mm across 25-27 wet days. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) operates with mandatory same-day safety check — Forest Department closes the descending 1.5km walk to the base viewing platform on the heaviest-rain days. The viewing-platform-only experience (no descent) remains accessible on most days; the spray-and-roar payoff at the upper viewing area is at year-best. Vazhachal (5km upstream) and Charpa (10km upstream) at peak monsoon strength. Sholayar Forest drive accessibility patchy on heavy days. Karkidakam — the Malayalam calendar''s monsoon-Ayurveda month (mid-July to mid-August) — peaks in the Chalakudy belt; Karkidaka Chikitsa packages (14-21 days) at established Ayurveda centres in Chalakudy and Kochi discount 30-40 percent for the season-residency trade. Hotel rates climb meaningfully: Chalakudy homestays ₹1,200-2,500, Athirapally village stays at ₹2,500-4,500, Rainforest Resort at ₹5,000-9,000. NH544 Kochi-Athirapally (70km) faces 1-2 closure events per week through Kerala PWD clearance — depart Kochi by 8am.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 8, 4, 'go',
  'Monsoon continues. 23-29C, 700-900mm rainfall. Falls at 90-95 percent of peak. Onam closes town 3-4 days mid-month.',
  'August holds the July peak — 90-95 percent of annual flow, falls running at year-best volume. Onam (variable Aug-Sep) closes most operations 3-4 days. Trail closures on heaviest rain days continue.',
  NULL,
  'Athirapally in August holds the July monsoon peak with marginally fewer extreme-rain days. Rainfall 700-900mm across 22-25 wet days. Daytime 24-29C, nights 23-25C, 90 percent humidity. The Chalakudy river flow at the falls remains at 90-95 percent of annual peak — the 80-feet drop continues to run at year-best Niagara-of-India volume, the spray reaches the upper viewing area at peak intensity. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) continues with same-day safety check — descending 1.5km walk to the base viewing platform closes on heaviest-rain days. Viewing-platform-only experience accessible on most days. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August to early September) — closes most Chalakudy-Athirapally area shops, restaurants, and resort activities for 3-4 days around Thiruvonam; the falls trail itself stays open. Karkidakam Ayurveda residencies continue through mid-August. Vazhachal (5km upstream) and Charpa (10km upstream) at peak monsoon strength. NH544 Kochi-Athirapally (70km) faces 1-2 closure events per week. Hotel rates outside Onam: Chalakudy homestays ₹1,100-2,300, Athirapally village stays at ₹2,400-4,200, Rainforest Resort at ₹4,500-8,500. Pack waterproof gear, leech-socks, change of footwear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 9, 4, 'go',
  'Monsoon withdrawing. 23-30C, 400-500mm rainfall easing. Falls at 80-90 percent of peak. Trail more reliable.',
  'September is the Athirapally sweet spot — falls still at 80-90 percent of monsoon peak but trail closures rare from week three. Hotel rates ease as Onam tail clears. Strong flow plus reliable access.',
  NULL,
  'Athirapally in September is the under-rated optimal window. Rainfall drops to 400-500mm across 16-18 wet days, mostly the first fortnight. Daytime 24-30C, nights 23-25C, humidity easing toward 80 percent. The Chalakudy river flow at the falls remains at 80-90 percent of August peak — the 80-feet drop continues to deliver year-best Niagara-of-India volume but the trail closures that ran 3-5 days per week through July-August drop to 1-2 per week in September. The southwest monsoon retreats from the Western Ghats by September 20-25; from week three the trail to the base viewing platform (1.5km descending walk from the Athirapally gate, ₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) operates almost daily. The combination of strong flow plus reliable access makes September the Athirapally specialist window. Vazhachal (5km upstream) and Charpa (10km upstream) at strong post-monsoon flow. Sholayar Forest drive at year-greenest backdrop — Lion-tailed Macaque sightings near Vazhachal at year-best photographic state. NH544 Kochi-Athirapally (70km) stabilises with closure events dropping to under 1 per week from mid-month. Onam tail keeps Chalakudy-Athirapally shops at light hours through the first week. Hotel rates ease: Chalakudy homestays at ₹1,000-2,000, Athirapally village stays at ₹2,200-4,000, Rainforest Resort at ₹4,000-7,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 10, 5, 'go',
  'Optimal Athirapally window. 22-30C, 200-300mm rainfall. Falls at 80 percent of peak, trail fully open, weather settled.',
  'October is the year''s best balance of flow and access. Falls at 80 percent of monsoon peak, NE monsoon overspill 200-300mm rain mostly evenings, trail fully open at full Forest Dept schedule. Lush green forest backdrop. Hotel rates 30 percent below December.',
  NULL,
  'Athirapally in October is the year''s best balance of flow and access. Daytime 24-30C, nights 22-24C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. The Chalakudy river flow at the falls holds at roughly 80 percent of August peak — the 80-feet drop continues to deliver near-Niagara-of-India volume. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) operates at full schedule — closures rare, descending 1.5km walk to the base viewing platform reliable daily. The combination of strong post-monsoon flow plus full trail access makes October the optimal Athirapally window. Vazhachal (5km upstream) and Charpa (10km upstream) at strong post-monsoon flow. Sholayar Forest drive at year-greenest backdrop — Lion-tailed Macaque sightings near Vazhachal at year-best photographic state. NH544 Kochi-Athirapally (70km) stabilises fully by October 15; landslide closures drop to rare events. Hotel rates 30 percent below December peak: Chalakudy homestays at ₹1,200-2,200, Athirapally village stays at ₹2,500-4,500, Rainforest Resort at ₹4,500-8,500. Pack a poncho, leech-socks for forest walks. Strong call for first-time visitors who want flow plus access.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 11, 5, 'go',
  'High balance window. 21-30C, dry. Falls at 70 percent of peak, trail fully open. Hotel rates climb 25 percent.',
  'November is when Athirapally settles into the high-balance window. Northeast monsoon residual eases to under 80mm, falls still at 70 percent of monsoon peak, trail fully open. Hotel rates climb 20-25 percent across the month as Christmas-week traffic begins booking.',
  NULL,
  'Athirapally in November is the high-balance window. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 23-30C, nights 21-23C, humidity dropping under 70 percent in the back half. The Chalakudy river flow at the falls holds at roughly 70 percent of August monsoon peak — the 80-feet drop still delivering meaningful volume and spray. The trail from the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) operates at full schedule. Vazhachal (5km upstream) and Charpa (10km upstream) at strong flow. Sholayar Forest drive at year-clearest visibility — Lion-tailed Macaque sightings near Vazhachal at high consistency. NH544 Kochi-Athirapally (70km) at year-clearest. Hotel rates climb 20-25 percent across the month: Chalakudy homestays at ₹1,400-2,500, Athirapally village stays at ₹2,800-5,000, Rainforest Resort at ₹5,000-9,500. Concentration of weekend domestic traffic from November 15 onward as Christmas-week families begin booking. Strong call for travellers who want the falls plus the broader Sholayar Forest experience without the May trickle or July trail-closure compromise.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('athirapally', 12, 4, 'go',
  'Peak Kerala season. 20-31C. Falls at 65 percent of monsoon peak. Christmas-NY drives 2x rates and weekend gridlock.',
  'December is peak Kerala domestic-tourist season at Athirapally — Christmas-NY week (Dec 22-Jan 5) drives 2x rates, falls trail visitor counts to 6,000-8,000 per weekend day. Falls at 65 percent of monsoon peak. Weekday Tuesday-Thursday is the smart traveller call.',
  NULL,
  'Athirapally in December is operational peak for Kerala domestic tourism alongside lower-than-monsoon falls flow. Daytime 22-31C, nights 20-22C, rainfall under 30mm. The Chalakudy river flow at the falls drops to 65 percent of August monsoon peak — the 80-feet drop still photogenic with meaningful spray but the year-best Niagara-of-India volume is gone until June. Christmas-NY week (December 22 to January 5) drives the Kerala-itinerary peak: trail visitor counts at the Athirapally gate (₹50 entry plus ₹50 parking, Forest Department-managed, 8am-6pm) hit 6,000-8,000 per weekend day from December 24-31, weekday Tuesday-Thursday holds at 2,000-3,000. The 1.5km descending walk to the base viewing platform sees 60-90 minute queue waits on Saturday-Sunday through holiday week. Hotel rates climb meaningfully: Chalakudy homestays from ₹1,400 to ₹2,500-3,500, Athirapally village stays (Plantation Stay, plus the small luxury bracket Rainforest Resort) from ₹2,800-5,000 to ₹6,000-12,000. Vazhachal (5km upstream) and Charpa (10km upstream) at moderate flow. Sholayar Forest drive at year-clearest visibility but heavy holiday-week traffic. NH544 Kochi-Athirapally (70km) at year-busiest weekends — depart Kochi by 7am or arrive after 5pm. Weekday December 1-20 remains the smart-traveller window before Christmas crowd takes over.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
