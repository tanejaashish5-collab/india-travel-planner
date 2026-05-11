-- Coonoor destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: coonoor

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 1, 5, 'go',
  'Peak post-NYE window. 8-22C at 1850m. Tea estates dry, Sim''s Park clear, NMR steam-rack section at year-best photography.',
  'January is when Coonoor runs at its quieter post-monsoon peak. 8-12C nights, 19-22C days. Sim''s Park (1874, ₹30 entry, 8am-6pm) at full tempo. Highfield, Glendale, Singara tea estates visible from Dolphin''s Nose viewpoint. NMR steam section to Mettupalayam at year-busiest — book IRCTC 60 days ahead.',
  NULL,
  'Coonoor in January is the Nilgiri trip that the over-touristed Ooty 20km north no longer delivers. At 1850m the elevation drops 400m below Ooty, so daytime 19-22C runs a notch warmer, nights 8-12C, rainfall under 20mm. Sim''s Park (1874, 12 hectares, ₹30 entry, 8am-6pm) — the Horticulture Department''s lesser-known cousin to the Ooty Botanical Garden — at full perennial-border display, light visitor load. Lamb''s Rock (9km, ₹15) and Dolphin''s Nose (12km, ₹15) viewpoints overlook the Hulikal Ravine and the Mettupalayam plains — visibility cleanest in the first two hours after 7am opening. Tiger Hill (1km from town centre) and Catherine Falls (28km, peak monsoon flow, dry-season trickle) round out the day-trip set. The Nilgiri tea estate spread — Highfield, Glendale, Singara — covers the slopes around Coonoor; estate-walk visits (Highfield ₹150-300 with tour, Singara walk-in at the estate gate) are at year-driest. The Nilgiri Mountain Railway (UNESCO 2005) steam-rack section runs Coonoor-Mettupalayam through January — the famous chimney-smoke-against-Hulikal-Ravine photography window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 2, 5, 'go',
  'Driest month. 10-23C. Tea-estate visibility cleanest of year. Rates 20 percent below January.',
  'February is the technical sweet spot — rainfall under 15mm, tea-estate visibility at year-cleanest, Sim''s Park building toward March flush. Hotel rates 20 percent below January peak.',
  NULL,
  'Coonoor in February is the cleanest weather month of the year at the 1850m elevation. Rainfall averages 10-15mm, daytime 20-23C, nights 10-13C. The Highfield-Glendale-Singara tea estate spread visible from Dolphin''s Nose (12km, ₹15 entry) and Lamb''s Rock (9km, ₹15) at year-photogenic clarity. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) building toward the spring flush — the Italian Garden tier, the Cosmos and Salvia borders at perennial-border tempo. Catherine Falls (28km, ₹15 entry) at year-low water flow (peak is post-monsoon September-November); the 250-foot drop visible as a thin ribbon. Tiger Hill view (1km from town) at year-clearest. The Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Coonoor steam-rack section, 12km from Coonoor to the Hillgrove halt) runs full timetable, IRCTC booking 60 days ahead. Y''s Tearoom (Bedford, since the 1960s) at light load. Acres Wild (Mansoor Khan''s 22-acre artisan cheesemaking farm) advance-book tours ₹500-800; the tour covers cheese-making, farm-stay rooms, vegetarian Italian on-farm dinners.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 3, 5, 'go',
  'Cool-dry holds. 11-25C. Sim''s Park spring flush, tea-estate visibility holding. Last quiet month before April crowds.',
  'March extends February''s clean-weather pattern with Sim''s Park entering proper spring flush. Last quiet month before April-May summer-migration crowds arrive. Hotel rates ease another 10 percent.',
  NULL,
  'Coonoor in March is the soft-landing month before the plains-summer migration crowds arrive. Daytime 22-25C, nights 11-14C, humidity climbing toward 65 percent in the last fortnight, rainfall under 25mm. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) enters proper spring flush — the perennial borders at peak colour. Lamb''s Rock (9km, ₹15) and Dolphin''s Nose (12km, ₹15) viewpoints over the Hulikal Ravine and Mettupalayam plains at year-clearest sightlines before pre-monsoon haze arrives in April. The Highfield, Glendale, Singara tea estate slopes are at year-driest; the Glendale Tea Estate factory tour (₹250-400, 9am-4pm with advance booking) covers picking, withering, fermentation, drying. Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section workable through the day. Catherine Falls at low dry-season flow. Acres Wild (Mansoor Khan''s 22-acre cheesemaking farm) at light visitor load; the artisan cheese platter is the year''s best food experience in the Nilgiris if booked ahead. Y''s Tearoom at the Bedford end of town. Hotel rates ease 10 percent versus February: heritage at ₹4-7k, mid-bracket ₹2,000-3,500, homestays ₹1,200-2,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 4, 5, 'go',
  'Pre-monsoon. 14-27C. Sim''s Park in full flush. Summer-migration spillover from Ooty arrives, but Coonoor stays quieter.',
  'April is when Sim''s Park hits its spring peak. Tea estate slopes at year-clearest before pre-monsoon haze. Summer-migration spillover from Ooty pushes Coonoor weekend traffic up 2-3x but weekday visits stay quiet.',
  NULL,
  'Coonoor in April runs at its prettiest. Daytime 23-27C, nights 14-17C, humidity 60-65 percent, pre-monsoon rainfall 40-70mm in the last 10 days as afternoon thundershowers. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) at full spring flush — the Italian Garden tier, the perennial borders at maximum colour, the 1000-variety rose section in second-flush bloom. The Highfield, Glendale, Singara tea estate slopes visible from Dolphin''s Nose (12km, ₹15) and Lamb''s Rock (9km, ₹15) at year-prettiest before pre-monsoon haze descends — visibility cleanest 7-10am. Catherine Falls (28km, ₹15) at year-low flow. Tiger Hill (1km), Hidden Valley viewline, Law''s Falls (5km, dry-season ribbon) round out the viewpoint set. Nilgiri Mountain Railway Mettupalayam-Coonoor steam-rack section runs full schedule with the rack-pinion descent at peak chimney-smoke photogenicity. Y''s Tearoom (Bedford) at full afternoon-tea pace. Acres Wild (Mansoor Khan''s cheesemaking farm) tours ₹500-800 with cheese platter and Italian dinner — book 1-2 weeks ahead in April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 5, 4, 'go',
  'Summer-migration spillover. 16-27C. First fortnight clean, last 10 days bring SW-monsoon advance squalls.',
  'Early May extends April — Sim''s Park in flush, viewpoints clear, tea estates accessible. Last 10 days bring SW-monsoon advance squalls. Hotel rates climb with Ooty spillover but Coonoor stays cheaper. Push to October if landslide-risk awareness matters.',
  NULL,
  'Coonoor in May splits cleanly in two. The first fortnight extends April: daytime 23-27C, nights 16-18C, humidity 70 percent. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) at the tail of spring flush. Lamb''s Rock (9km, ₹15) and Dolphin''s Nose (12km, ₹15) viewpoints over the Hulikal Ravine at workable morning visibility before afternoon haze and squalls. The Highfield, Glendale, Singara tea estates host factory tours through the first 15 days at ₹250-400. Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section at year-busiest — IRCTC tickets sell out 60 days ahead. The Ooty Flower Show third week (around May 18-22) drives a 4-day spillover wave to Coonoor where rates run 30-40 percent below Ooty. By the third week, southwest monsoon advance squalls hit Kerala-Tamil Nadu border — Coonoor at 1850m on the Nilgiri western shoulder receives 100-200mm of advance rain through the back half of May. Lamb''s Rock and Dolphin''s Nose visibility collapses on rainy afternoons. NMR steam-rack section runs reduced schedule from May 25 onward under Southern Railway safety protocols.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 6, 2, 'wait',
  'SW monsoon onset. 14-22C, 200-300mm rainfall. Viewpoints fogged, NMR steam section landslide-affected. Skip unless rain-walk acceptable.',
  NULL,
  'June is when the SW monsoon hits the Nilgiri western face. 200-300mm rainfall, Lamb''s Rock and Dolphin''s Nose permanently fogged, NMR steam-rack Mettupalayam-Coonoor section runs landslide-affected reduced schedule. The hill-station trip cannot happen this month.',
  'Coonoor in June is when the SW monsoon arrives on the Nilgiri windward face. Rainfall 200-300mm across 18-22 wet days at the 1850m elevation; the Nilgiri western shoulder (Ooty, Coonoor, the descent to Mettupalayam) catches the windward monsoon while the leeward Coimbatore plains stay dry. Daytime 18-22C, nights 14-16C feel mild but constant rain and 90 percent humidity strip outdoor activity. Lamb''s Rock (9km, ₹15) and Dolphin''s Nose (12km, ₹15) viewpoints lose visibility past 100m on most days. Catherine Falls (28km, ₹15) builds rapidly toward post-monsoon peak — accessible if road clears. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section closes 3-4 days per week through the month under Southern Railway safety protocols; the 4 tunnels and the rack-pinion section are landslide-vulnerable. NH181 Mettupalayam-Coonoor 9-hairpin climb closes 1-2 days per week. Sim''s Park (1874, ₹30, 8am-6pm) stays open at 80 percent visitor drop. Y''s Tearoom and Acres Wild operate but advance booking essential. Hotel rates at year-low: heritage at ₹3-6k, mid-bracket ₹2-3.5k, homestays ₹1,000-1,800. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 7, 1, 'skip',
  'Peak SW monsoon. 14-20C, 600-900mm rainfall. NMR suspends regularly, viewpoints unusable. Skip.',
  NULL,
  'July is the year''s wettest stretch at Coonoor — 600-900mm rainfall, NMR Mettupalayam-Coonoor section suspends frequently, viewpoints fogged-out for weeks. NH181 closures 2-3 days/week. The Coonoor trip cannot happen until September. Skip.',
  'Coonoor in July is the year''s wettest stretch. Rainfall 600-900mm across 24-27 wet days at the 1850m elevation; the Nilgiri western face catches the full SW monsoon force, among the heaviest July rainfall in Tamil Nadu alongside Valparai and Anamalai. Daytime 15-20C, nights 14-16C with constant rain and 95 percent humidity. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section suspends 4-5 days per week under Southern Railway safety protocols. NH181 Mettupalayam-Coonoor 9-hairpin descent closes 2-3 days per week. Lamb''s Rock, Dolphin''s Nose, Tiger Hill, Catherine Falls all unusable — visibility absent. Sim''s Park (₹30, 8am-6pm) stays open but visitors drop 90 percent. Y''s Tearoom (Bedford) and the heritage cafés stay open as the indoor rainy-afternoon offering. The Highfield-Glendale-Singara tea estate factory tours suspend during the heaviest plucking weeks. Acres Wild (Mansoor Khan cheesemaking) shuts to walk-ins; only confirmed multi-day stays continue. Hotel rates at year-low: heritage at ₹3-6k, mid-bracket ₹1,800-3,200, homestays ₹900-1,600. The trip travellers picture cannot happen this month — wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 8, 1, 'skip',
  'SW monsoon continues. 14-20C, 400-600mm rainfall. NMR runs reduced schedule, viewpoints fogged. Skip.',
  NULL,
  'August holds the July pattern with marginally fewer extreme-rain days — 400-600mm rainfall, NMR sections suspend regularly, viewpoints fogged most days. NH181 landslide-watch continues. Wait for September-October return to operations.',
  'Coonoor in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 400-600mm across 20-23 wet days. Daytime 15-20C, nights 14-16C with 90 percent humidity and consistent overcast — most outdoor sightlines unusable through the month. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section continues 2-3 day weekly suspensions; the Coonoor-Ooty leg runs more reliably (12km, 90 minutes) but Dolphin''s Nose and Lamb''s Rock visibility absent. NH181 Mettupalayam-Coonoor 9-hairpin descent closures 1-2 days per week. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) stays open at 85 percent visitor drop. Catherine Falls building rapidly toward September peak. Y''s Tearoom, Velan Ritz lobby tea-rooms and the heritage cafés run as the rainy-afternoon indoor offering. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru and Coimbatore but most travellers leave underwhelmed by rain-impacted sightlines. Hotel rates at year-low through early August, climbing 20 percent for Aug 15 weekend: heritage at ₹3-6k, mid ₹2-3.5k, homestays ₹1,000-1,800. The Coonoor trip travellers picture cannot happen this month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 9, 4, 'go',
  'SW monsoon retreats. 12-22C, 100-200mm rainfall. Catherine Falls at year-peak flow. Tea estates greenest of year.',
  'September is the proper season opener. SW monsoon retreats by week three, NH181 stabilises, NMR returns to full timetable. Catherine Falls at year-peak post-monsoon flow. Tea estates at year-greenest. Hotel rates 30 percent below December peak.',
  NULL,
  'Coonoor in September is the soft re-opening with the bonus of Catherine Falls hitting peak flow. Rainfall drops to 100-200mm across 12-15 wet days, mostly the first fortnight as the SW monsoon retreats from the Nilgiri shoulder. Daytime 19-22C, nights 12-14C, humidity easing toward 75 percent. The Highfield, Glendale, Singara tea estate slopes around Coonoor are at year-greenest after the four-month monsoon flush — the sweep visible from Dolphin''s Nose (12km, ₹15) and Lamb''s Rock (9km, ₹15) is at year-prettiest on clearing afternoons. Catherine Falls (28km from Coonoor, ₹15) hits its annual peak flow — the 250-foot drop in two tiers carries 5-7x dry-season volume; visit dawn or late afternoon for best light. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section returns to full daily schedule from September 15-20; chimney-smoke photography at year-best against monsoon-green ridges. NH181 Mettupalayam-Coonoor 9-hairpin climb stabilises with closure events dropping to rare. Sim''s Park (1874, ₹30, 8am-6pm) returns to full perennial-border tempo. Y''s Tearoom and Acres Wild (Mansoor Khan''s cheesemaking) resume full operations.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 10, 5, 'go',
  'Full operations resume. 11-22C, 100-150mm rainfall residual. Catherine Falls still strong, tea estates green.',
  'October is the proper hill-station window. NMR runs full timetable, all viewpoints back at high visibility, tea estates still monsoon-green. NE monsoon residual brings evening showers but daytime mostly clear. Hotel rates 25 percent below December peak.',
  NULL,
  'Coonoor in October is when the hill station hits full operations with the bonus of post-monsoon green still holding. Daytime 19-22C, nights 11-13C, rainfall 100-150mm split across the SW retreat (first 10 days) and NE monsoon arrival (last 10 days), humidity dropping toward 70 percent. The Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Coonoor steam-rack section) runs full daily schedule; chimney-smoke photography against still-green Hulikal Ravine ridges at peak photogenicity. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) at light visitor load with autumn perennial-border tempo. Lamb''s Rock (9km, ₹15) and Dolphin''s Nose (12km, ₹15) viewpoints at full afternoon visibility, the Mettupalayam plains visible past 80km on clearest days. Catherine Falls (28km, ₹15) still carries 4-5x dry-season volume from the September peak. The Highfield, Glendale, Singara tea estate factory tours resume full schedule ₹250-400 with advance booking. Y''s Tearoom (Bedford), Acres Wild (Mansoor Khan''s cheesemaking) at full operations. NE monsoon brings 1-2 hour evening downpours typical 4-7pm but daytime mostly clear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 11, 5, 'go',
  'Cold-dry. 9-21C. Tea-estate visibility cleanest. Sim''s Park second flush. Rates climb 25 percent through month.',
  'November is the genuine pivot to Coonoor high season. NE monsoon residual spent by mid-month, rainfall under 50mm, tea-estate visibility at year-clearest. Hotel rates climb 25 percent as Christmas-week traffic begins booking.',
  NULL,
  'Coonoor in November is when the Nilgiri shoulder turns the corner. Northeast monsoon residual eases to under 50mm across 4-6 wet days, all in the first 10 days. Daytime 18-21C, nights 9-12C, humidity dropping under 70 percent. The Highfield-Glendale-Singara tea estate sweep visible from Dolphin''s Nose (12km, ₹15) and Lamb''s Rock (9km, ₹15) at year-clearest — sightlines extend past the Mettupalayam plains to the Anaikatti foothills 100km away. Sim''s Park (1874, 12 hectares, ₹30, 8am-6pm) at second-flush bloom — the chrysanthemum show typically the last week of November, organised by the Horticulture Department. Catherine Falls (28km, ₹15) still carries 3x dry-season volume. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section at year-best photography — chimney smoke against clear ridges. Y''s Tearoom (Bedford, since the 1960s), Acres Wild (Mansoor Khan''s 22-acre cheesemaking farm, tour ₹500-800 with cheese platter and Italian dinner) at full tempo. The Glendale Tea Estate factory tour ₹250-400 with 9am-4pm advance booking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coonoor', 12, 5, 'go',
  'Peak season. 7-21C. Christmas-NY rates 2-2.5x. Sim''s Park busiest. Book 3-4 weeks ahead.',
  'December is the year''s most reliable Coonoor window — peak Nilgiri weather, full operational tempo. Christmas-NY week (Dec 22-Jan 5) drives rates to 2-2.5x base. Coonoor stays 30 percent cheaper than Ooty and quieter through the rate-tripling weeks.',
  NULL,
  'Coonoor in December is the year''s most coherent window with the bonus of staying 30-40 percent cheaper and 3-5x quieter than Ooty 20km north. Daytime 18-21C, nights 7-10C with some ground frost mornings in the last fortnight, rainfall under 25mm, humidity 65 percent. Christmas-NY week (December 22 to January 5) is the year''s tightest stretch: heritage (Acres Wild stay, Velan Ritz, La Belle Vie) climbs to ₹12-18k against ₹4-7k off-peak; mid-bracket hits ₹6-9k against ₹2,500-4k off-peak; homestays double to ₹3,000-4,500. The Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Coonoor steam-rack section, 12km from Coonoor to the Hillgrove halt) runs full daily timetable — IRCTC bookings for the Mettupalayam-Ooty full run sell out 60 days ahead through Christmas-NY but the Coonoor-Ooty toy-train segment available walk-up. Sim''s Park (₹30, 8am-6pm) gets its peak monthly footfall. Dolphin''s Nose (12km) and Lamb''s Rock (9km) viewpoints at year-clearest but queue 20-30 minutes 11am-3pm. Y''s Tearoom (Bedford) at full afternoon-tea pace; Acres Wild needs 2-3 week advance for the tour-and-cheese platter.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
