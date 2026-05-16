-- Ooty (Udagamandalam) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: ooty

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 1, 4, 'go',
  'Coolest month. 5-21C at 2240m. Post-NYE rates ease from Jan 6. Botanical Garden, Doddabetta, Lake at full tempo.',
  'January is the year''s coldest stretch — 5-9C nights, 18-21C days, occasional ground frost on the Botanical Garden lawns. Nilgiri Mountain Railway runs both rakes; book the Mettupalayam-Ooty ticket 60 days ahead via IRCTC. Christmas-NY rate tail eases from Jan 6.',
  NULL,
  'Ooty in January is the version travellers picture when someone says hill station. The 2240m elevation pushes day temperatures to 18-21C and nights to 5-9C, with ground frost some mornings on the Government Botanical Garden lawns (1848, 22 hectares, ₹50 entry, 7am-6pm). The Nilgiri Mountain Railway — UNESCO World Heritage 2005, the only steam-rack-and-pinion mountain railway in India — runs both rakes between Mettupalayam and Ooty (46km, 5 hours up, 3.5 down); the Mettupalayam-Coonoor steam section needs IRCTC booking 60 days ahead, especially Jan 1-15. Ooty Lake (1824 artificial reservoir under John Sullivan) at full boat-house tempo, pedal boats ₹250/30min, motorboats ₹350. Doddabetta Peak (2637m, highest in the Nilgiris, 10km from town) opens 7am-6pm, ₹15 entry, two telescopes ₹15/look — visibility cleanest in the first hour. Christmas-NY rate tripling eases from January 6: luxury (Savoy, Fern Hill, King''s Cliff) drops from ₹22-30k to ₹10-14k, mid-bracket (Glyngarth, La Maison) holds ₹6-9k, homestays under ₹3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 2, 4, 'go',
  'Cold-dry. 6-22C. Tea estate visibility cleanest. Rates 30 percent below January.',
  'February is the technical sweet spot — rainfall under 15mm, tea estate visibility at year-cleanest, ground-frost mornings ease. Nilgiri Mountain Railway runs full timetable. Hotel rates drop 30 percent versus January peak.',
  NULL,
  'Ooty in February is the cleanest weather month of the year. Rainfall averages 10-15mm, daytime 19-22C, nights 6-10C. The Nilgiri tea estate sweep visible from Doddabetta Peak (2637m, 10km out) and the Coonoor-Ooty road runs at year-photogenic visibility, sky-blue background, the 7km Lovedale viewline at peak clarity. Government Botanical Garden (1848, 22 hectares, ₹50, 7am-6pm) gets its quietest visitor month — the Italian Garden tier, the fossil tree, the 20-million-year-old fossilised conifer log on display. Rose Garden at the Vijayanagaram tier (10 hectares, ₹50, 8am-6pm) holds 20,000+ bushes across 2,800 varieties; peak bloom is May but Feb visibility makes the garden walkable end-to-end. Nilgiri Mountain Railway runs full timetable; the Mettupalayam-Coonoor steam-rack section is at year-best chimney-smoke photography. Ooty Lake boat house full hours. Doddabetta Peak telescope viewing cleanest first hour after 7am opening. Hotel rates drop 30 percent versus January peak: luxury at ₹7-10k, mid-bracket ₹4-6k, homestays ₹1,800-3,000. The 3.5-hour drive from Coimbatore airport (90km via Mettupalayam and 14 hairpins on NH181) at year-clearest visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 3, 5, 'go',
  'Year-best window opens. 8-24C. Tea estates dry, Rose Garden building, Mountain Railway runs full.',
  'March is when Ooty hits the textbook hill-station window. Temperatures mild (8-24C), rainfall under 30mm, Rose Garden building toward peak bloom, Nilgiri tea estates at year-driest. Hotel rates ease further before April-May summer-migration push begins.',
  NULL,
  'Ooty in March is the soft-landing month before the summer-migration crowds arrive. Daytime 21-24C, nights 8-12C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. Government Botanical Garden (1848, 22 hectares, ₹50, 7am-6pm) at the front edge of its spring flush — the perennial borders begin proper colour, the Italian Garden tier at peak. Rose Garden (₹50, 8am-6pm) building toward April-May peak bloom but already 60 percent of varieties showing flower. Nilgiri Mountain Railway (UNESCO 2005) runs full timetable; the Mettupalayam-Coonoor steam-rack section workable through the day before April afternoon heat compresses windows. Ooty Lake boat house at light-load visitor numbers. Doddabetta Peak (2637m, 10km, ₹15, two telescopes ₹15/look) opens 7am-6pm at year-clearest visibility — the Mysuru plateau visible to the north on cleanest days. Tea Museum at Doddabetta plus Nilgiri Tea Factory tours (Highfield estate Coonoor 20km, ₹100-150) at full tempo. Pykara Falls (20km, ₹40, peak-flow March-October from upstream KSEB Pykara Dam), Pykara Lake boating ₹400/30min.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 4, 5, 'go',
  'Year-best. 10-26C. Rose Garden peak bloom. Summer-migration crowds arrive, rates climb 30 percent.',
  'April is when Ooty runs at its prettiest. Rose Garden at peak bloom across 2800 varieties, Botanical Garden in full flush, tea-estate visibility holding. Plains heat drives summer-migration crowds — rates climb 30 percent, weekend lodgings book 2-3 weeks ahead.',
  NULL,
  'Ooty in April is when the hill station looks the way the colonial-era postcards promised. Daytime 22-26C, nights 10-14C, humidity 60-65 percent, pre-monsoon rainfall 50-80mm in the last 10 days as afternoon showers. Government Botanical Garden (1848, 22 hectares, ₹50, 7am-6pm) at full perennial-border flush; the Italian Garden tier, the 20-million-year-old fossil log, the Toda tribal mund replica. Rose Garden (₹50, 8am-6pm) hits year-peak bloom — 20,000+ bushes across 2,800 varieties, the climbing-rose pergolas and the Hybrid Tea beds at maximum colour, last week of April through first 10 days of May the peak window. Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Ooty 46km) runs full schedule with steam-rack section workable mornings before afternoon heat builds. Doddabetta Peak (2637m, 10km, ₹15) at light morning visibility. Pykara Falls (20km, peak flow), Pykara Lake (boating ₹400/30min, jeep-and-boat KTDC package ₹1,200). Summer-migration crowds from Tamil Nadu and Kerala plains arrive Apr 10 onward — Doddabetta and Pykara see 5-7x weekday traffic, weekend lodging needs 2-3 week advance booking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 5, 5, 'go',
  'Summer-migration peak. 12-26C. Flower Show third week. Rates 2-3x normal. Book 3-4 weeks ahead.',
  'May is when Ooty hits its annual summer-migration peak. Annual Flower Show in the Botanical Garden third week (around May 18-22) draws 50,000+ daily. Hotel rates 2-3x normal, weekend traffic gridlocks Charing Cross. Book 3-4 weeks ahead.',
  NULL,
  'Ooty in May is when the hill station hosts its loudest week. Daytime 22-26C, nights 12-16C, humidity 70 percent, rainfall climbing to 100-150mm with afternoon thundershowers from May 20 onward. The Annual Flower Show at the Government Botanical Garden — typically the third week of May (around May 18-22, organised by the Horticultural Department under the Nilgiris District Collector since 1896) — draws 50,000-80,000 daily over 4 days. Rose Garden (20,000 bushes, 2,800 varieties) still holds peak bloom through the first 10 days. Nilgiri Mountain Railway (UNESCO 2005) runs at year-busiest — Mettupalayam-Ooty tickets sell out 60 days ahead via IRCTC. Doddabetta (2637m, ₹15, two telescopes) and Pykara Falls (20km) at peak visitor concentration. Ooty Lake boat house, Charing Cross commercial spine and the road to the Botanical Garden gridlock 10am-5pm. Hotel rates 2-2.5x normal: luxury (Savoy, Fern Hill, King''s Cliff) at ₹15-22k, mid-bracket (Glyngarth, La Maison) ₹8-12k, homestays ₹3,500-5,500. The 14-hairpin NH181 Mettupalayam-Ooty climb queues 30-90 minutes at the bottleneck mid-elevation switchbacks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 6, 2, 'wait',
  'SW monsoon onset. 12-22C, 200-300mm rainfall. Doddabetta fogged, Mountain Railway sections suspend. Skip unless Karkidakam alternative.',
  NULL,
  'June is when the southwest monsoon hits the Nilgiri western face. 200-300mm rainfall, Doddabetta and Pykara permanently fogged, Mountain Railway Mettupalayam-Coonoor section runs landslide-affected schedules. Hotel rates drop 50 percent but the trip you came for cannot happen.',
  'Ooty in June is when the southwest monsoon arrives on the Nilgiri western face. Rainfall 200-300mm across 18-22 wet days at the 2240m elevation; the Nilgiri western face (Ooty, Coonoor and the descent to Mettupalayam) catches the windward monsoon shoulder while the leeward Coimbatore plains stay dry. Daytime 18-22C, nights 12-14C feel mild but constant rain and 90 percent humidity strip outdoor activity. Doddabetta Peak (2637m, 10km) loses visibility past 100m on most days — telescope viewing pointless. Pykara Falls runs at peak flow but the 20km drive and the lake operations suspend on landslide-watch days. Nilgiri Mountain Railway (UNESCO 2005) runs reduced timetable; the Mettupalayam-Coonoor steam-rack section closes 2-3 days per week through the month under Southern Railway safety rule whenever heavy rain events trigger landslide risk on the 4 tunnels. NH181 Mettupalayam-Ooty 14-hairpin climb closes 1-2 days per week. Government Botanical Garden (₹50, 7am-6pm) and Rose Garden stay open but visitors drop 80 percent. Hotel rates drop 50 percent versus May: luxury at ₹5-8k, mid-bracket ₹3-4k, homestays ₹1,200-2,000. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 7, 1, 'skip',
  'Peak SW monsoon. 12-20C, 800-1200mm rainfall. Mountain Railway suspends regularly, viewpoints unusable. Skip.',
  NULL,
  'July is the year''s wettest stretch at Ooty — 800-1200mm rainfall, Mountain Railway Mettupalayam-Coonoor section suspends frequently, Doddabetta and Pykara fogged-out for weeks. NH181 closures 2-3 days/week. The Ooty trip cannot happen until September. Skip.',
  'Ooty in July is the year''s wettest month at the 2240m elevation. Rainfall 800-1200mm across 25-28 wet days — the Nilgiri western face catches the full force of the SW monsoon, among the heaviest July rainfall in Tamil Nadu alongside Valparai and Anamalai. Daytime 15-20C, nights 12-14C with constant rain and 95 percent humidity. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam section suspends 3-4 days per week through the month under Southern Railway safety protocols; the 4 tunnels and the rack-pinion section are landslide-vulnerable. NH181 Mettupalayam-Ooty (14 hairpins, 36km) closes 2-3 days per week. Doddabetta Peak (2637m), Pykara Falls (20km) and Lake, Avalanche-Emerald Lakes (28km, off-grid reservoir-zone access) all unusable. Government Botanical Garden (₹50) and Rose Garden stay open but visitors drop 90 percent; the rain-walk experience without sightlines is the only available offering. Hotel rates at year-low: luxury at ₹4-7k, mid-bracket ₹2,500-4k, homestays ₹1,000-1,800. The trip most travellers come to Ooty for cannot happen this month. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 8, 1, 'skip',
  'SW monsoon continues. 12-20C, 500-700mm rainfall. Mountain Railway runs reduced schedule, viewpoints fogged. Skip.',
  NULL,
  'August holds the July pattern with marginally fewer extreme-rain days — 500-700mm rainfall, Mountain Railway sections suspend regularly, viewpoints fogged most days. NH181 landslide-watch continues. Wait for September-October return to operations.',
  'Ooty in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 500-700mm across 20-24 wet days. Daytime 15-20C, nights 12-14C with 90 percent humidity and consistent overcast — most outdoor sightlines unusable through the month. The Nilgiri Mountain Railway (UNESCO 2005) Mettupalayam-Coonoor steam-rack section continues 2-3 day weekly suspensions under Southern Railway monsoon protocols; the Ooty-Coonoor leg runs more reliably but Doddabetta and Pykara visibility absent. NH181 Mettupalayam-Ooty 14-hairpin closures 1-2 days per week. Government Botanical Garden and Rose Garden remain open at 90 percent visitor drop — the rain-walk-with-umbrella experience is the offering. Avalanche and Emerald Lakes (28km, KSEB reservoir-zone) require Forest Department permit, operations suspend on heavy-rain days. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru and Coimbatore but most visitors leave underwhelmed by rain-impacted itineraries. Hotel rates at year-low through early August, climbing 20 percent for the Aug 15 weekend: luxury at ₹4-7k, mid ₹2,500-4k, homestays ₹1,000-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 9, 4, 'go',
  'SW monsoon retreats. 10-22C, 100-200mm rainfall easing. Tea estates greenest of year.',
  'September is the proper season opener. SW monsoon retreats from the Nilgiris by week three, NH181 stabilises, Mountain Railway returns to full timetable. Tea estates at year-greenest after the monsoon flush. Hotel rates 40 percent below May peak.',
  NULL,
  'Ooty in September is the soft re-opening. Rainfall drops to 100-200mm across 12-15 wet days, mostly the first fortnight as the SW monsoon retreats from the Nilgiri western face. Daytime 18-22C, nights 10-12C, humidity easing toward 75 percent. The Nilgiri tea estates around Coonoor (Highfield, Glendale, Singara), Lovedale and the Pykara catchment are at year-greenest after the four-month monsoon flush — the sweep visible from Doddabetta Peak (2637m, 10km out, ₹15, two telescopes) is cinematic on clearing afternoons. The Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Ooty 46km) returns to full daily timetable from September 15-20; the Mettupalayam-Coonoor steam-rack section back at year-best chimney-smoke photography against monsoon-green ridges. NH181 Mettupalayam-Ooty 14-hairpin climb stabilises with closure events dropping to rare. Government Botanical Garden (1848, 22 hectares, ₹50, 7am-6pm) and Rose Garden return to full visitor hours. Ooty Lake boat house resumes full operations. Pykara Falls runs at strong post-monsoon flow (drops to dry-season trickle by January).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 10, 4, 'go',
  'Full operations resume. 10-22C, 100-150mm rainfall residual. NE monsoon evening showers.',
  'October is the proper hill-station window. Mountain Railway runs full timetable, tea estates at year-greenest, all viewpoints back at high visibility. NE monsoon residual brings evening showers but daytime mostly clear. Hotel rates 40 percent below December peak.',
  NULL,
  'Ooty in October is when the hill station hits full operations. Daytime 18-22C, nights 10-12C, rainfall 100-150mm split across the SW retreat (first 10 days) and NE monsoon arrival (last 10 days), humidity dropping toward 70 percent. The Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Ooty 46km, 5 hours up) runs full daily timetable; the Mettupalayam-Coonoor steam-rack section at year-best photography. Doddabetta Peak (2637m, 10km, ₹15, two telescopes) at full afternoon visibility with first-hour-after-opening clearest. Government Botanical Garden (1848, 22 hectares, ₹50, 7am-6pm) at light visitor load; the Italian Garden tier and the 20-million-year-old fossil tree at full access. Rose Garden (20,000 bushes, 2,800 varieties) building toward second-flush bloom (November-December). Pykara Falls and Lake at high post-monsoon flow. Avalanche-Emerald Lakes (28km, KSEB reservoir-zone, Forest Department permit ₹400-600) reopen for daytime jeep visits. NE monsoon evening downpours typical 4-7pm but daytime mostly clear. Hotel rates climb 15-20 percent from September: luxury at ₹7-10k, mid-bracket ₹4-6k, homestays ₹1,800-2,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 11, 5, 'go',
  'Cold-dry. 8-21C. Rose Garden second flush, tea-estate visibility cleanest. Rates climb 25 percent through month.',
  'November is the genuine pivot to Ooty high season. NE monsoon residual spent by mid-month, rainfall under 60mm, tea-estate visibility at year-clearest. Hotel rates climb 25 percent as Christmas-week traffic begins booking. Strong window for first-time visitors.',
  NULL,
  'Ooty in November is when the Nilgiris turn the corner. Northeast monsoon residual eases to under 60mm across 4-6 wet days, all in the first 10 days. Daytime 18-21C, nights 8-11C, humidity dropping under 70 percent. The Nilgiri tea estate sweep visible from Doddabetta Peak (2637m, 10km, ₹15) and the Coonoor-Ooty road is at year-clearest visibility — the Lovedale viewline and the Singara estate spread at peak photogenic. Government Botanical Garden (1848, 22 hectares, ₹50, 7am-6pm) at full perennial-border tempo, the chrysanthemum show typically the last week of November (organised by the Horticultural Department). Rose Garden (20,000 bushes, 2,800 varieties) hits second-flush bloom — November-December is the secondary peak after the April-May primary flush. Nilgiri Mountain Railway (UNESCO 2005) runs at year-best photogenic — chimney smoke against clear ridges on the Mettupalayam-Coonoor steam section. Doddabetta telescope viewing cleanest 7-9am. Pykara Falls flow strong, Lake boat operations full hours. Hotel rates climb 25 percent across the month: luxury at ₹8-12k (was ₹7-10k October), mid-bracket ₹5-7k, homestays ₹2,200-3,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ooty', 12, 5, 'go',
  'Peak season. 5-20C. Christmas-NY rates 2.5-3x. Doddabetta visibility cleanest. Book everything 4-6 weeks ahead.',
  'December is the year''s most reliable Ooty window — coldest temperatures, full operational tempo. Christmas-NY week (Dec 22-Jan 5) drives rates to 2.5-3x base, Charing Cross gridlocks 10am-5pm, NMR tickets sell out 60 days ahead at IRCTC.',
  NULL,
  'Ooty in December is the year''s most coherent window. Daytime 17-20C, nights 5-9C with ground frost some mornings in the last fortnight, rainfall under 30mm, humidity 65 percent. Christmas-NY week (December 22 to January 5) is the year''s brutally tight stretch: luxury (Savoy, Fern Hill, King''s Cliff, Sherlock) climbs to ₹22-30k against ₹7-10k off-peak; mid-bracket (Glyngarth, La Maison, Hotel Lakeview) hits ₹12-16k against ₹5-7k off-peak; homestays double to ₹4,000-5,500. The Nilgiri Mountain Railway (UNESCO 2005, Mettupalayam-Ooty 46km, 5 hours up) runs full daily timetable but Mettupalayam-Ooty ticket sells out 60 days ahead via IRCTC for the entire Christmas-NY window — book the day the booking window opens. Government Botanical Garden (₹50, 7am-6pm) gets its peak monthly footfall. Rose Garden (20,000 bushes, 2,800 varieties) at second-flush bloom. Doddabetta Peak (2637m, ₹15, two telescopes) at year-clearest visibility but tickets queue 30-45 minutes 11am-3pm. Charing Cross commercial spine and the road to the Botanical Garden gridlock 10am-5pm through the Christmas-NY week. The 14-hairpin NH181 Mettupalayam-Ooty climb queues 60-90 minutes evening returns.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
