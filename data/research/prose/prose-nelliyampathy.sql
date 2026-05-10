-- Nelliyampathy destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: nelliyampathy

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 1, 5, 'go',
  'Peak Nelliyampathy window. 14-26C. Tea+coffee+orange estates dry. Seetharkundu falls, viewpoint at full visibility.',
  'January is when Nelliyampathy runs at its post-monsoon peak. The 467-1572m elevation district — Palakkad''s "Munnar" — is at year-clearest. Seetharkundu waterfalls at full flow. Plantation walks at established estates around Pothundi and Kaikatty. 12 hairpin bends climb to the plateau.',
  NULL,
  'Nelliyampathy in January is the version every Western Ghats traveller chasing Munnar without the crowd needs. The plateau — 467-1572m elevation in Palakkad district, the southern wing of the Western Ghats Anaimalai sub-range — is reached via the famous 12 hairpin bend climb from Nemmara (45km from Palakkad town). Daytime 18-26C, nights 14-16C, rainfall under 50mm, 200+ recorded bird species and 90+ butterfly species per Forest Department surveys. Seetharkundu waterfalls — the plateau''s primary day-spur, viewpoint and 7-tier cascade reached after a 200m walk from the Nelliyampathy-Kaikatty road — at year-clearest visibility and post-monsoon strength flow. Tea, coffee and orange plantations stretch across the plateau (the orange variety is unique to Nelliyampathy''s 1100-1500m elevation belt) — plantation walks at established estates run on demand at ₹500-800. Mampara, Pothundi (lake + dam at 1100m elevation), Padagiri viewpoint, Karappara estates all functional. Crucially, Nelliyampathy has no resort cluster — accommodation runs through plantation bungalows (Pothundi, Kaikatty, Mampara, Karappara) and homestays only. Plantation bungalows ₹3,500-7,500, homestays ₹1,500-3,500. Bookings via Kerala Tourism (keralatourism.org) or direct estate offices. The 4-hour drive from Kochi airport (NH544 + NH213, 130km via Palakkad and Nemmara) at year-clearest visibility. Pack layers; mornings at 14C feel sharp.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 2, 5, 'go',
  'Driest month. 16-28C. Plantation walks at year-photogenic. Bird detection peaks in clear weather.',
  'February is the cleanest weather month at Nelliyampathy — rainfall under 20mm, plantation walks at year-photogenic, 200+ bird species at peak detection. Hotel rates 25 percent below January. Mid-Feb-March is the smart traveller window.',
  NULL,
  'Nelliyampathy in February is the technical sweet spot. Rainfall averages 15-20mm, daytime 19-28C across the elevation range, nights 16-18C. The plateau (467-1572m) at year-clearest visibility — the famous 12 hairpin bend climb from Nemmara (45km from Palakkad town) gives spectacular pre-arrival vistas. Tea, coffee and orange plantations across Pothundi, Kaikatty, Mampara, Karappara at year-driest underfoot — plantation walks at established estates ₹500-800, advance booking via Kerala Tourism (keralatourism.org) or direct estate offices. The unique orange variety (cultivated only in Nelliyampathy''s 1100-1500m elevation belt across Kerala) hits visible harvest tail. Seetharkundu waterfalls and viewpoint (200m walk from the Nelliyampathy-Kaikatty road) at year-best photographic state. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full visitor hours; KSEB does not run boat operations here. 200+ bird species at year-best detection — Nilgiri laughingthrush, Malabar trogon, Sri Lanka frogmouth all calling. 90+ butterfly species visible. Plantation bungalows ₹3,000-6,500, homestays ₹1,200-3,000. Bookings 2-3 days ahead — Nelliyampathy''s thin accommodation infrastructure (no resorts, plantation cottages only) means weekends fill 7-10 days ahead. The 12 hairpin bend road at year-clearest visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 3, 4, 'go',
  'Last cool window. 18-30C. Coffee flowering visible at higher elevations. Hotel rates 30 percent below January.',
  'March extends February''s pattern. Coffee flowering hits visible peak at higher-elevation estates. Hotel rates drop 30 percent below January. Last comfortable window before April pushes lower elevations toward 32C.',
  NULL,
  'Nelliyampathy in March is the soft-landing month. Daytime 21-30C across the 467-1572m elevation range (cooler at the higher belts), nights 18-20C, humidity climbing toward 70 percent in the last fortnight, rainfall under 30mm. Coffee flowering hits visible peak at higher-elevation estates around Mampara and Karappara — Robusta variety, 3-4 week pre-monsoon flowering window unique to March. Plantation walks at established estates ₹500-800, advance booking via Kerala Tourism (keralatourism.org) or direct estate offices. Seetharkundu waterfalls and viewpoint (200m walk from Nelliyampathy-Kaikatty road) at last-strong post-monsoon flow — visibly weakening through the month. Pothundi Lake + Dam (1100m elevation, KSEB-managed), Padagiri viewpoint, the 12 hairpin bends climb from Nemmara (45km from Palakkad town) all run normally. 200+ bird species at high detection. The plateau''s thin accommodation — plantation bungalows only at Pothundi, Kaikatty, Mampara, Karappara, plus homestays in the Nemmara approach — hits 30 percent below January peak: bungalows at ₹2,800-6,000, homestays at ₹1,000-2,500. Bookings 2-3 days ahead remain advisable for weekends. Holi long weekend brings a 3-day domestic bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 4, 3, 'wait',
  'Pre-monsoon. 20-32C lower elevations. Higher belts hold 22-26C. Plantation walks workable in mornings.',
  'April still works at Nelliyampathy — the 1100-1500m higher belts hold 22-26C, plantation walks workable mornings, but Pothundi-Kaikatty-Mampara estates feel humid past 11am. Hotel rates 35 percent below January. Vishu April 14 brings 3-day weekend bump.',
  'April pushes Nelliyampathy''s lower elevations into pre-summer heat. The 467m foothills (Nemmara approach) hit 30-32C, the 1100-1500m plateau holds 22-28C. Plantation walks workable mornings only. Pre-monsoon thunderstorms from April 22-28 bring 30-50mm overnight rains.',
  'Nelliyampathy in April is the heat-stratified month. The plateau''s 467m foothills (Nemmara approach, 12 hairpin bends start here) hit 24-32C, the 1100-1500m higher belts (Mampara, Karappara, Padagiri) hold 22-28C and remain workable for plantation walks. Coffee flowering tail continues at established estates — Robusta variety, the 3-4 week window closes by mid-April. Plantation walks at ₹500-800 deliver year-best visual interest, especially at higher-elevation estates around Mampara. Seetharkundu waterfalls (200m walk from Nelliyampathy-Kaikatty road) flow weakens visibly each week. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full visitor hours but late-afternoon visits feel humid. Pre-monsoon thunderstorms from April 22-28 bring 30-50mm overnight rains; KSEB power-cut frequency rises 2-3 hours daily. Vishu (April 14, Malayalam new year) brings a 3-4 day domestic bump from Palakkad-side families. Hotel rates drop 35 percent versus January peak: plantation bungalows at ₹2,500-5,500, homestays at ₹900-2,200. The 12 hairpin bend road at clearest morning visibility. Push to October if heat-tolerance is low; stay higher-elevation belts if dates immovable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 5, 2, 'wait',
  'Pre-monsoon. 22-33C lower elevations. First fortnight workable, last 10 days bring SW-monsoon advance squalls.',
  'Early May extends April — plateau still workable in mornings, plantation walks at year-low rates. Last 10 days bring SW-monsoon advance squalls. The 12 hairpin bend road becomes landslide-watch from May 22. Push to October.',
  'May runs hot at Nelliyampathy''s lower elevations (24-33C, 75 percent humidity). The 1100-1500m higher belts hold 22-28C but pre-monsoon convection from late May makes plantation walks erratic. The 12 hairpin bend road becomes landslide-watch from May 22. Hotel rates at year-low.',
  'Nelliyampathy in May splits cleanly across the elevation gradient. The first fortnight extends April: lower elevations (Nemmara approach, 467m) hit 24-33C, the 1100-1500m higher belts (Mampara, Karappara, Padagiri) hold 22-28C and remain workable for morning plantation walks. By the third week, southwest monsoon advance squalls hit Kerala — the plateau receives the first of the season''s heavy rainfall typically as 1-2 hour afternoon downpours. Plantation walks suspend on heavy days. Seetharkundu waterfalls (200m walk from Nelliyampathy-Kaikatty road) flow returns from May 22 onwards but visibility from the viewpoint fogs. The 12 hairpin bend road from Nemmara (45km from Palakkad town) becomes landslide-watch country from May 22 — Kerala PWD reports clearance daily but afternoon arrivals risk being held at the foothill checkpoint. KSEB power cuts run 3-4 hours daily; the plateau''s thin power-grid struggles in pre-monsoon load. Hotel rates at year-low: plantation bungalows at ₹2,200-5,000, homestays at ₹800-2,000. Lock the first 10 days; the last fortnight is monsoon-arrival territory. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 6, 1, 'skip',
  'SW monsoon onset. 20-28C, 600-800mm rainfall. 12 hairpin road landslide-prone, viewpoints fogged. Skip.',
  NULL,
  'June is when the southwest monsoon hits Nelliyampathy with full force. 12 hairpin bend road landslide-prone (Kerala PWD closures 1-2 days/week), viewpoints permanently fogged, plantation walks suspend. Wait for October.',
  'Nelliyampathy in June is when the southwest monsoon hits the plateau with full Western Ghats force. Rainfall hits 600-800mm at the 467-1572m elevation range across 20-22 wet days. Daytime 22-28C feels mild but constant rain and 90 percent humidity make outdoor activity miserable. The 12 hairpin bend road from Nemmara (45km from Palakkad town) becomes landslide-watch country: Kerala PWD typically closes the climb 1-2 days per week through the month for clearance, with delays of 3-6 hours common otherwise. Plantation walks at Pothundi, Kaikatty, Mampara, Karappara estates suspend on heavy days. Seetharkundu waterfalls flow returns to full strength but the viewpoint (200m walk from Nelliyampathy-Kaikatty road) gets fogged out. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full overflow but visitor walks compress. The plateau''s 200+ bird species and 90+ butterfly species are all present but unviewable in the constant downpour. KSEB power cuts run 4-6 hours daily as the plateau''s thin grid struggles with monsoon storms. Plantation bungalows at year-low ₹2,000-4,500, homestays at ₹700-1,500. The trip you came for cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 7, 1, 'skip',
  'Peak monsoon. 20-26C, 800-1000mm rainfall. 12 hairpin road frequent closures. Skip.',
  NULL,
  'July is the wettest month at Nelliyampathy — 800-1000mm rainfall, 12 hairpin road landslide-prone, viewpoints fogged. Karkidakam Ayurveda residencies the only valid trip-shape. Wait for October.',
  'Nelliyampathy in July is the year''s wettest stretch at the plateau. Rainfall hits 800-1000mm at the 467-1572m elevation range across 25-27 wet days. Daytime 22-26C with 95 percent humidity and constant downpour. The 12 hairpin bend road from Nemmara (45km from Palakkad town) faces 2-3 landslide closures per week through Kerala PWD clearance. Plantation walks at Pothundi, Kaikatty, Mampara, Karappara estates suspend on most days; the orange estates (1100-1500m belt, unique to Nelliyampathy in Kerala) at peak monsoon green but unviewable. Seetharkundu waterfalls reaches its monsoon peak flow but the viewpoint (200m walk from Nelliyampathy-Kaikatty road) gets fogged out daily. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full overflow. KSEB power supply unreliable — 4-6 hour cuts daily, the plateau''s thin grid takes monsoon hits hard. The single legitimate reason to visit in July is Karkidakam — the Malayalam calendar''s monsoon-Ayurveda month (mid-July to mid-August). Karkidaka Chikitsa packages (14-21 days) at established Ayurveda residencies in the Palakkad-Nemmara belt discount 30-40 percent for the season-residency trade. For the standard Nelliyampathy plantation-walk trip, wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 8, 1, 'skip',
  'Monsoon continues. 20-26C, 700-900mm rainfall. 12 hairpin road unreliable. Onam closes Palakkad. Skip.',
  NULL,
  'August holds the July pattern — 700-900mm rainfall, 12 hairpin road landslide-prone, plantation walks suspend. Onam (variable Aug-Sep) shuts most operations 3-4 days. Wait for October.',
  'Nelliyampathy in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm at the 467-1572m elevation range across 22-25 wet days. Daytime 22-26C, 90 percent humidity. The 12 hairpin bend road from Nemmara (45km from Palakkad town) continues landslide-prone with 1-2 closures per week through Kerala PWD clearance. Plantation walks at Pothundi, Kaikatty, Mampara, Karappara estates suspend on most days. Seetharkundu waterfalls at strong monsoon flow but the viewpoint (200m walk from Nelliyampathy-Kaikatty road) gets fogged out daily. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August into September) — closes most Palakkad-side operations including plantation bungalows that primarily run as estate-employee residences during the festival, restaurants and the few homestays for 3-4 days around Thiruvonam. Karkidakam Ayurveda residencies continue through mid-August at established Palakkad-Nemmara centres. KSEB power cuts run 4-5 hours daily. Plantation bungalow rates at year-low outside Onam: ₹2,000-4,500, homestays at ₹700-1,500. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 9, 3, 'wait',
  'Monsoon withdrawing. 20-26C, 400-500mm rainfall easing. 12 hairpin road stabilises. Plantation walks resume late.',
  'September is the recovery month. SW monsoon retreats from the Western Ghats by week three, 12 hairpin road stabilises, plantation walks resume mid-month. October is dramatically cleaner with two extra weeks of patience.',
  'September is on the way back but plantation walk operations resume only mid-month, viewpoints stay patchy in residual mist, the 12 hairpin road still gets landslide-watch in week one. Push to October — same monsoon-green plateau at materially cleaner conditions.',
  'Nelliyampathy in September is the soft re-opening. Rainfall drops to 400-500mm across 16-18 wet days, mostly the first fortnight. Daytime 22-26C across the elevation range, nights 20-22C, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25; the 12 hairpin bend road from Nemmara (45km from Palakkad town) stabilises with closure events dropping to under 1 per week from mid-month. Plantation walks at Pothundi, Kaikatty, Mampara, Karappara estates resume more reliably from mid-month — the plateau at year-greenest after the southwest monsoon flush, especially the unique orange estates (1100-1500m belt). Seetharkundu waterfalls and viewpoint (200m walk from Nelliyampathy-Kaikatty road) reopen as visibility improves. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full visitor hours from week three. KSEB power supply stabilises to 1-2 hour cuts daily. Onam tail keeps Palakkad-side shops at light hours through the first week. Plantation bungalows at year-low rates: ₹2,200-5,000, homestays at ₹800-2,000. October is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 10, 4, 'go',
  'Season opens fully. 18-26C, 200-300mm rainfall. Plantation walks at year-greenest. 12 hairpin road stable.',
  'October is the proper season opener. Plantation walks at full tempo, plateau at year-greenest after SW monsoon, 12 hairpin road stable. NE monsoon overspill 200-300mm rain mostly evenings. Hotel rates 30 percent below December.',
  NULL,
  'Nelliyampathy in October is when the plateau returns to full operations. Daytime 21-26C across the 467-1572m elevation range, nights 18-20C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. The 12 hairpin bend road from Nemmara (45km from Palakkad town) stabilises fully by October 15; landslide closures drop to rare events. Plantation walks at established estates around Pothundi, Kaikatty, Mampara, Karappara at full schedule (₹500-800, advance booking via Kerala Tourism keralatourism.org or direct estate offices). The plateau at year-greenest after the southwest monsoon flush — tea, coffee, and especially the unique-to-Nelliyampathy orange estates (1100-1500m belt) at peak photogenic. Seetharkundu waterfalls and viewpoint (200m walk from Nelliyampathy-Kaikatty road) at strong post-monsoon flow. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full visitor hours. 200+ bird species and 90+ butterfly species at high detection in the post-monsoon flush. KSEB power supply stable, 1-hour cuts daily at most. Plantation bungalows at ₹2,500-5,500 (versus ₹3,500-7,500 December peak), homestays at ₹1,000-2,200. Pack a poncho rather than an umbrella, fleece for evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 11, 5, 'go',
  'High season builds. 16-25C, dry. Plantation walks at peak. Hotel rates climb 25 percent.',
  'November is when Nelliyampathy turns the corner. Northeast monsoon residual eases to under 80mm, plantation walks at peak, plateau at year-clearest visibility. Hotel rates climb 20-25 percent across the month as Christmas-week traffic begins booking.',
  NULL,
  'Nelliyampathy in November is when the plateau turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 19-25C across the 467-1572m elevation range, nights drop to 16-18C, humidity dropping under 70 percent in the back half. Plantation walks at established estates around Pothundi, Kaikatty, Mampara, Karappara at peak operational tempo (₹500-800, advance booking via Kerala Tourism keralatourism.org or direct estate offices) — the unique-to-Nelliyampathy orange estates (1100-1500m belt) at year-clearest visibility. Seetharkundu waterfalls and viewpoint (200m walk from Nelliyampathy-Kaikatty road) at peak photogenic. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at full visitor hours. Padagiri viewpoint, Mampara plateau views at year-clearest. 200+ bird species and 90+ butterfly species at peak detection in dry-flush conditions — Nilgiri laughingthrush, Malabar trogon, Sri Lanka frogmouth all calling. The 12 hairpin bend road from Nemmara (45km from Palakkad town) at year-clearest visibility. Plantation bungalows climb 20-25 percent across the month: ₹3,000-6,500, homestays at ₹1,200-2,800. Concentration of weekend domestic traffic from November 15 onward; bookings tighten to 5-7 day lead given the plateau''s thin accommodation infrastructure.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('nelliyampathy', 12, 5, 'go',
  'Peak season. 14-26C. Christmas-NY rates 2-2.5x. Bungalow bookings 14-21 day lead.',
  'December is the year''s most reliable Nelliyampathy window. Christmas-NY week (Dec 22-Jan 5) drives 2-2.5x rates, plantation bungalow bookings 14-21 day lead given thin accommodation infrastructure. 12 hairpin road at year-busiest weekends.',
  NULL,
  'Nelliyampathy in December is operational peak. Daytime 18-26C across the 467-1572m elevation range, nights drop to 14-16C, rainfall under 30mm. Christmas-NY week (December 22 to January 5) drives the rate-doubling stretch and — given the plateau''s thin accommodation infrastructure (no resorts, plantation bungalows and homestays only) — booking lead extends to 14-21 days versus 3-5 days off-peak: plantation bungalows from ₹3,000-6,500 to ₹6,000-13,000, homestays from ₹1,200-2,800 to ₹2,500-5,500. Plantation walks at established estates around Pothundi, Kaikatty, Mampara, Karappara at full schedule (₹500-800) — bookings tighten through Christmas-NY week. Seetharkundu waterfalls and viewpoint (200m walk from Nelliyampathy-Kaikatty road) at peak photogenic. Pothundi Lake + Dam (1100m elevation, KSEB-managed) at peak visitor load. 200+ bird species and 90+ butterfly species at peak detection. The 12 hairpin bend road from Nemmara (45km from Palakkad town) sees year-busiest weekends from December 18 onward — depart Palakkad by 8am or arrive after 5pm to avoid hairpin queues. KSEB power supply at year-most-stable. The plateau remains comparatively quieter than Munnar through Christmas-NY despite peak rates — Nelliyampathy''s thin accommodation cap limits the peak-load surge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
