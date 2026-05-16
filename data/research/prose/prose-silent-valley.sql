-- Silent Valley National Park destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: silent-valley

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 1, 5, 'go',
  'Peak Silent Valley window. 14-26C. Mukkali permits at full tempo. Lion-tailed Macaque sightings, river crossings dry.',
  'January is when Silent Valley NP runs at its post-monsoon peak. Restricted-access — advance permit only via Mukkali range office (Kerala Forest Dept), 4-hour escorted trail with armed guard ₹1,500-2,500. Permit lead 7-15 days. No accommodation inside; stay at Mukkali (KFD log-house) or Anaikatti.',
  NULL,
  'Silent Valley in January is the version every conservation-minded traveller chasing India''s last virgin tropical rainforest needs to experience. The 89 sq km national park in Palakkad''s Mannarkkad taluk preserves the Kunthipuzha river catchment that famously survived the 1970s-80s hydroelectric dam proposal — saved through the Kerala Sastra Sahitya Parishad-led conservation battle, dam scrapped 1983, declared National Park 1984. The park''s flagship is the endangered Lion-tailed Macaque (Macaca silenus) — population 200-300 here, one of India''s densest concentrations. Daytime 22-26C in the valley, nights 14-16C, rainfall under 30mm, Kunthipuzha river crossings at year-firmest dry conditions. Access is strictly restricted: advance permit only via the Mukkali range office of Kerala Forest Department, 7-15 day permit lead, ₹1,500-2,500 per group includes the mandatory armed guard escort. The 4-hour escorted trail begins at Mukkali range gate (24km from Mannarkkad), proceeds to Sairandhri viewpoint via watchtower 1; private vehicles prohibited beyond the range office. There is no accommodation inside the park. Stays cluster at Mukkali (1 KFD log-house ₹2,000 with permit-bundle, advance booking essential, plus 4-5 small homestays ₹1,200-2,500) and Anaikatti (15km, 4-5 homestays ₹1,500-3,500) on the Tamil Nadu border. The 5-hour drive from Kozhikode airport (NH544 + NH213, 110km via Palakkad and Mannarkkad) at year-clearest visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 2, 5, 'go',
  'Driest month. 16-28C. Trail conditions at year-firmest. River crossings clear.',
  'February is the cleanest of the cool months — rainfall under 15mm, Kunthipuzha river crossings at year-firmest, Lion-tailed Macaque sightings consistent. Mukkali permits at full tempo. Mid-Feb-March is the smart traveller window for the 4-hour escorted trail.',
  NULL,
  'Silent Valley in February is the technical sweet spot for the trail experience. Rainfall averages 10-15mm, daytime 19-28C in the valley, nights 16-18C. The 89 sq km national park sits at peak photographic state — Kunthipuzha river crossings at year-firmest, the dense canopy at clearest visibility, the famous "silence" of the valley (a misleading colonial name; the park is rich in cicada-call and bird-call activity, but the absence of cicadas in the moist primary forest gave the early surveys their impression) at year-best ambient quality. Lion-tailed Macaque (Macaca silenus) — Silent Valley''s flagship endangered species, population 200-300, one of India''s densest concentrations — gives consistent troop-encounters on the 4-hour escorted trail. Other primates: Nilgiri langur, bonnet macaque. Mammals include Tiger, Leopard, Sloth Bear (rare sightings), Indian Giant Squirrel, Nilgiri tahr (in upper reaches). Forest Department permit operations from the Mukkali range office at full tempo — advance permit lead 7-15 days, ₹1,500-2,500 per group, mandatory armed guard escort, 4-hour escorted trail from Mukkali gate to Sairandhri viewpoint via watchtower 1. KFD log-house at Mukkali ₹2,000 with permit-bundle (advance booking essential); Mukkali homestays ₹1,000-2,200; Anaikatti homestays ₹1,200-3,000. Hotel rates 25 percent below January peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 3, 2, 'wait',
  'Heat begins in valley. 20-32C. Trail still operational but mid-day collapses past 11am.',
  'March pushes Silent Valley into pre-summer heat. The 4-hour escorted trail compresses to dawn windows; Mukkali permits available but mid-day temperatures past 30C make the canopy walk uncomfortable. Hotel rates 30 percent below January.',
  'March is the start of the dry-down. Daytime 22-32C in the valley, the 4-hour escorted trail compresses to dawn departures. Lion-tailed Macaque encounters remain consistent but mid-day heat past 30C past 11am makes the canopy walk uncomfortable. Push to October-February.',
  'Silent Valley in March is the heat-stratified month. Daytime 24-32C in the valley, nights 20-22C, humidity climbing toward 70 percent in the last fortnight, rainfall under 30mm. The 4-hour Mukkali-Sairandhri escorted trail compresses to dawn departures — Forest Department issues morning permits with mandatory return by 11am-noon to clear mid-day heat. Lion-tailed Macaque (Macaca silenus, population 200-300, one of India''s densest concentrations) encounters remain consistent, especially at the watchtower 1 viewpoint where troops feed in fig trees through the morning hours. Other primates and mammals all visible but the visit window collapses to the 4-hour escorted block versus year-best 5-6 hour February timing. Forest Department permit operations from the Mukkali range office continue at full tempo — advance permit lead 7-10 days (eased from 7-15 days February peak), ₹1,500-2,500 per group, mandatory armed guard escort. KFD log-house at Mukkali ₹1,800 with permit-bundle; Mukkali homestays ₹900-2,000; Anaikatti homestays ₹1,000-2,500. Hotel rates 30 percent below January. Holi long weekend brings a 3-day domestic bump. The 5-hour Kozhikode-Mannarkkad drive (110km via NH544 + NH213) at clearest visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 4, 1, 'skip',
  'Pre-monsoon heat. 24-34C. Trail dangerous past 9am. Forest Department restricts to dawn slots only. Skip.',
  NULL,
  'April pushes Silent Valley into dangerous pre-monsoon heat. Forest Department restricts trail permits to dawn-only slots — 6am gate, return mandatory by 10am. Lion-tailed Macaque encounters remain but the visit window collapses. Wait for October.',
  'Silent Valley in April is when the valley hits dangerous pre-monsoon heat. Daytime 26-34C, nights 24-26C, humidity past 75 percent in the last fortnight. Forest Department restricts the 4-hour Mukkali-Sairandhri escorted trail to dawn-only slots — 6am gate departures, return mandatory by 10am — under safety rules; the published permit window narrows. Lion-tailed Macaque (Macaca silenus, population 200-300) encounters remain at watchtower 1 fig trees but the daylight working block is at 4 hours flat. Pre-monsoon thunderstorms from April 22-28 bring 30-50mm overnight rains and afternoon trail-suspension events. Forest Department permit operations from the Mukkali range office continue but with restricted timing — advance permit lead 5-7 days, ₹1,500-2,500 per group, armed guard escort. Vishu (April 14, Malayalam new year) brings a 3-day domestic bump. KFD log-house at Mukkali ₹1,500 with permit-bundle; Mukkali homestays ₹800-1,800; Anaikatti homestays ₹900-2,200. Hotel rates 35 percent below January. KSEB power cuts 3-4 hours daily. Push to October — same primate concentration at materially safer trail conditions and cooler weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 5, 1, 'skip',
  'Pre-monsoon. 26-35C. First fortnight dawn-only, last 10 days monsoon-advance. Trail suspends often. Skip.',
  NULL,
  'May continues the April pattern with monsoon advance. Forest Department suspends trail permits on storm days; the 4-hour escorted experience cannot reliably happen. Wait for October.',
  'Silent Valley in May is the year''s harshest pre-monsoon month. Daytime 28-35C, nights 26-28C, humidity 80 percent. Forest Department continues to restrict the 4-hour Mukkali-Sairandhri escorted trail to dawn-only slots — 6am gate, return by 9-10am. By the third week, southwest monsoon advance squalls hit Kerala — Silent Valley sits in the heavy-monsoon belt and trail permits suspend frequently on storm days. Lion-tailed Macaque (Macaca silenus, population 200-300) encounters continue but the reliable visit-window collapses. Forest Department permit operations from the Mukkali range office reduce — advance permit lead 3-5 days, with last-minute cancellations on weather grounds common. KFD log-house at Mukkali at year-low ₹1,400 with permit-bundle; Mukkali homestays ₹700-1,500; Anaikatti homestays ₹800-2,000. KSEB power cuts run 3-4 hours daily. The Mannarkkad approach (NH213 from Palakkad, 24km) becomes landslide-watch country from May 22 onward. Push to October — the next clean window when post-monsoon trail conditions and Forest Department permit issuance both return to full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 6, 1, 'skip',
  'SW monsoon onset. 22-28C, 600-800mm rainfall. NP CLOSES under Forest Dept rule. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Western Ghats — Silent Valley NP closes for the season under Kerala Forest Department safety rule. Kunthipuzha river crossings flood, trails dangerous. Wait for October.',
  'Silent Valley in June is when the southwest monsoon hits the Western Ghats with full force — and the national park closes for the season under Kerala Forest Department safety rule. Rainfall hits 600-800mm at the valley elevation across 20-22 wet days, part of the area''s 2,500-3,500mm annual total. Daytime 24-28C with constant downpour and 95 percent humidity. The Mukkali range office suspends all trail permits from June 1 — Kunthipuzha river crossings flood and become impassable; the 4-hour escorted trail to Sairandhri viewpoint is technically dangerous (rockfall, swollen stream crossings, leech swarms); the armed guard escort is suspended; visitor permit applications mark the period unavailable. Lion-tailed Macaque (Macaca silenus, population 200-300) continue occupying their fig-tree territories in the interior but unviewable. The Mannarkkad approach (NH213 from Palakkad, 24km) becomes landslide-watch country with 1-2 closures per week through Kerala PWD clearance. Mukkali settlement and Anaikatti operations at year-low — KFD log-house at ₹1,200 with permit-bundle suspended; Mukkali homestays ₹600-1,200, Anaikatti ₹700-1,800. The trip cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 7, 1, 'skip',
  'Peak monsoon. 22-27C, 800-1000mm rainfall. NP CLOSED. Karkidakam Ayurveda only. Skip.',
  NULL,
  'July is the wettest month — Silent Valley NP closed under Forest Dept rule. Karkidakam Ayurveda residencies in the Palakkad belt the only valid trip-shape. Wait for October.',
  'Silent Valley in July is the year''s wettest stretch and the park remains closed under Kerala Forest Department seasonal safety rule. Rainfall hits 800-1000mm at the valley elevation across 25-27 wet days. Daytime 24-27C with 95 percent humidity and constant downpour. The Mukkali range office continues to suspend all trail permits — Kunthipuzha river at peak flood, the 4-hour Mukkali-Sairandhri trail dangerous, armed guard escort suspended. Lion-tailed Macaque (Macaca silenus, population 200-300) continue in their interior fig-tree territories but completely unviewable. The Mannarkkad approach (NH213 from Palakkad, 24km) faces 2-3 landslide closures per week through Kerala PWD clearance. Mukkali settlement and Anaikatti operations at year-low. The single legitimate reason to be in the Palakkad-Mannarkkad belt during July is Karkidakam — the Malayalam calendar''s monsoon-Ayurveda month (mid-July to mid-August). Karkidaka Chikitsa packages (14-21 days) at established Ayurveda centres in Palakkad town and Mannarkkad discount 30-40 percent for the season-residency trade. For the standard Silent Valley primate-watching trip, wait for October — trail permits reissue then under the Forest Department''s standard October 1 reopening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 8, 1, 'skip',
  'Monsoon continues. 22-27C, 700-900mm rainfall. NP CLOSED. Onam closes Mukkali. Skip.',
  NULL,
  'August holds the July pattern — NP closed, 700-900mm rainfall. Onam (variable Aug-Sep) shuts most Palakkad-side operations 3-4 days. Wait for October.',
  'Silent Valley in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm at the valley elevation across 22-25 wet days. Daytime 24-27C, 90 percent humidity. The national park remains closed under Kerala Forest Department''s seasonal safety rule — the Mukkali range office continues to suspend all trail permits, the Kunthipuzha river at flood levels, the 4-hour Mukkali-Sairandhri escorted trail dangerous. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August into September) — closes most Palakkad-side and Mannarkkad operations including the few Mukkali homestays and the KFD log-house, restaurants and transit services for 3-4 days around Thiruvonam. Karkidakam Ayurveda residencies continue through mid-August at established Palakkad-Mannarkkad centres. The Mannarkkad approach (NH213 from Palakkad, 24km) closure events continue 1-2 per week. Lion-tailed Macaque (Macaca silenus, population 200-300) continue in their interior territories but unviewable. KFD log-house at Mukkali at year-low rates outside Onam ₹1,200 with permit-bundle, Mukkali homestays ₹600-1,200, Anaikatti homestays ₹700-1,800. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 9, 2, 'wait',
  'Monsoon withdrawing. 22-27C, 400-500mm rainfall easing. NP still closed. Reopens October 1.',
  'September is the recovery month but the park remains closed till October 1 under standard Forest Dept reopening cycle. Permit applications restart late month for October trips. Wait the extra 2-3 weeks.',
  'September is on the way back but Silent Valley NP remains closed till October 1 under the Forest Department''s standard reopening cycle. The 4-hour escorted trail experience cannot happen this month. Permit applications restart late month for October-departure trips.',
  'Silent Valley in September is the recovery month with the gating constraint that the national park remains closed till October 1 under the Kerala Forest Department''s standard seasonal reopening cycle. Rainfall drops to 400-500mm across 16-18 wet days, mostly the first fortnight. Daytime 24-27C, nights 22-23C, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25. The Mannarkkad approach (NH213 from Palakkad, 24km) stabilises with closure events dropping to under 1 per week from mid-month. The Mukkali range office begins accepting permit applications for October-departure trips from late month — 7-15 day advance lead applies, with most permit-issuances dated October 5 onward. The Kunthipuzha river settles into post-monsoon flow. Lion-tailed Macaque (Macaca silenus, population 200-300) and other primates begin redistributing toward post-monsoon foraging patterns — fig-tree concentration not yet at dry-season peak. Onam tail keeps Palakkad-side shops at light hours through the first week. KFD log-house at Mukkali ₹1,500 with permit-bundle from late month, Mukkali homestays ₹800-1,500, Anaikatti homestays ₹900-2,000. October is the next valid trip-window — book the Mukkali permit slot in the same hour as the Mukkali stay.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 10, 4, 'go',
  'NP REOPENS OCTOBER 1. 20-27C, 200-300mm rainfall. Trail at year-greenest. Permit lead 5-7 days.',
  'October 1 is the official seasonal reopening of Silent Valley NP under Kerala Forest Department rule. Trail at year-greenest after SW monsoon, Lion-tailed Macaque encounters resume. NE monsoon overspill 200-300mm rain mostly evenings. Permit lead 5-7 days.',
  NULL,
  'Silent Valley in October is when the national park returns to operations after the seasonal closure. The Kerala Forest Department''s standard reopening date is October 1; the Mukkali range office resumes permit issuance at full tempo (₹1,500-2,500 per group, mandatory armed guard escort, 4-hour escorted trail from Mukkali gate to Sairandhri viewpoint via watchtower 1, advance permit lead 5-7 days through October before climbing to 7-15 days at peak). Daytime 22-27C in the valley, nights 20-22C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. The 89 sq km park at year-greenest after the southwest monsoon flush — dense canopy at peak photogenic, Kunthipuzha river settling into post-monsoon flow. Lion-tailed Macaque (Macaca silenus, population 200-300) encounters resume — fig-tree concentration at watchtower 1 builds through the month as dry-season foraging patterns return. Trail conditions remain leech-heavy through October — full-coverage leech-socks and salt are essential. The Mannarkkad approach (NH213 from Palakkad, 24km) stabilises fully by October 15. Stays: KFD log-house at Mukkali ₹1,800 with permit-bundle (advance booking essential), Mukkali homestays ₹900-2,000, Anaikatti homestays ₹1,000-2,500. Pack a poncho rather than an umbrella, fleece for evenings, leech-socks always.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 11, 5, 'go',
  'High season builds. 18-26C. Trail leech-free by mid-month. Permit lead extends to 7-10 days.',
  'November is when Silent Valley turns the corner. Northeast monsoon residual eases to under 80mm, leeches mostly gone by mid-month, trail at year-clearest visibility. Lion-tailed Macaque concentration builds. Permit lead extends 7-10 days.',
  NULL,
  'Silent Valley in November is when the national park turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first ten days. Daytime 19-26C in the valley, nights drop to 18-20C, humidity dropping under 70 percent in the back half. The 89 sq km park at year-clearest visibility post-monsoon. Forest Department operations from the Mukkali range office at full tempo (₹1,500-2,500 per group, mandatory armed guard escort, 4-hour escorted trail from Mukkali gate to Sairandhri viewpoint via watchtower 1) — advance permit lead extends from 5-7 days October to 7-10 days November as Christmas-week families begin booking. Lion-tailed Macaque (Macaca silenus, population 200-300, one of India''s densest concentrations) encounters at building concentration — fig-tree foraging at watchtower 1 reaches dry-season patterns. Other primates (Nilgiri langur, bonnet macaque) and mammals (Indian Giant Squirrel, sloth bear rare-sightings) at high detection. Leeches mostly gone by mid-November. Stays: KFD log-house at Mukkali ₹1,900 with permit-bundle, Mukkali homestays ₹1,000-2,200, Anaikatti homestays ₹1,200-2,800. Concentration of weekend domestic traffic from November 15 onward; Mukkali''s very thin accommodation (1 KFD log-house + 4-5 homestays) means weekends lock 7-10 days ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('silent-valley', 12, 5, 'go',
  'Peak season. 14-26C. Christmas-NY drives Mukkali stay bookings 21-30 day lead. Permit lead 7-15 days.',
  'December is the year''s most reliable Silent Valley window. Lion-tailed Macaque encounters at peak. Christmas-NY week (Dec 22-Jan 5) drives KFD log-house and Mukkali homestay bookings 21-30 days ahead given thin accommodation. Permit lead 7-15 days.',
  NULL,
  'Silent Valley in December is operational peak. Daytime 18-26C in the valley, nights drop to 14-16C, rainfall under 30mm. Christmas-NY week (December 22 to January 5) drives the brutally tight stretch — given Mukkali''s very thin accommodation (1 KFD log-house, 4-5 homestays, plus 4-5 small Anaikatti homestays 15km away), bookings extend to 21-30 days lead versus 5-7 days off-peak. Forest Department permit lead at the Mukkali range office extends from 7-10 days November to 7-15 days through Christmas-NY (₹1,500-2,500 per group, mandatory armed guard escort, 4-hour escorted trail from Mukkali gate to Sairandhri viewpoint via watchtower 1). Lion-tailed Macaque (Macaca silenus, population 200-300, one of India''s densest concentrations) encounters at peak — fig-tree foraging concentration at watchtower 1 at year-best. Other primates (Nilgiri langur, bonnet macaque) and mammals at high detection. Trail conditions at year-firmest. Stays at peak rates: KFD log-house at Mukkali ₹2,200-2,500 with permit-bundle (was ₹1,500-1,800 October), Mukkali homestays ₹1,500-3,000, Anaikatti homestays ₹1,800-3,500. The 5-hour Kozhikode-Mannarkkad-Mukkali drive (110km via NH544 + NH213, then the 24km Mannarkkad-Mukkali stretch) at year-busiest weekends — depart Kozhikode by 7am or arrive after 5pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
