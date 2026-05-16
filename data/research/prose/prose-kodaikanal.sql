-- Kodaikanal destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kodaikanal

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 1, 4, 'go',
  'Coldest month. 5-19C at 2100m. Kodai Lake, Coaker''s Walk, Pillar Rocks at full tempo. Post-NYE rates ease from Jan 6.',
  'January is the year''s coldest stretch at Kodaikanal — 5-9C nights can drop below 0C in the last fortnight, fog from 9pm to 9am common. Kodai Lake (24-hectare star-shaped, ₹30 boat) at full tempo. Coaker''s Walk (1872, ₹15 entry) at year-clearest sightlines.',
  NULL,
  'Kodaikanal in January is the version every Western Ghats hill-station traveller wants to see. The 2100m elevation in the Palani Hills pushes daytime to 17-19C and nights to 5-9C, with single-digit cold and overnight fog in the last fortnight — frost on the Bryant Park lawns some mornings. Kodaikanal Lake — the 24-hectare star-shaped artificial reservoir built by the American missionary Sir Vere Henry Levinge in 1863 — runs full boat-house tempo with pedal boats ₹250/30min and motorboats ₹400. Coaker''s Walk (1872, the 1km cliff promenade overlooking the southern Palani slopes and the plains 1500m below, ₹15 entry) at year-clearest sightlines; arrive at the 6am opening for the Madurai plains visibility before mid-morning haze. Bryant Park (12 hectares, ₹30, 9am-6pm) at full perennial-border tempo. Pillar Rocks (8km, ₹15) — the three vertical granite columns rising 122m from the valley floor — visible past fog windows. Silver Cascade (5km, year-low flow), Bear Shola Falls (3km, dry-season trickle), Green Valley View (5km, the cliff over the southern plains) round the viewpoint set.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 2, 4, 'go',
  'Cold-dry. 6-20C. Bryant Park at year-cleanest. Rates 25 percent below January.',
  'February is the technical sweet spot — rainfall under 20mm, Coaker''s Walk sightlines cleanest, Pillar Rocks visibility uninterrupted. Hotel rates 25 percent below January peak.',
  NULL,
  'Kodaikanal in February is the cleanest weather month at the 2100m Palani Hills hill station. Rainfall averages 15-20mm, daytime 18-20C, nights 6-10C. Coaker''s Walk (1872, the 1km cliff promenade, ₹15 entry) at year-clearest sightlines — the Madurai plains visible to the south, Mannavanur cliff views to the southwest. Kodaikanal Lake (24-hectare star-shaped, 1863 American missionary build by Sir Vere Henry Levinge) at light visitor load; pedal boats ₹250/30min, motorboats ₹400, the 4km cycle-track around the lake walkable in 60-75 minutes. Bryant Park (12 hectares, ₹30, 9am-6pm) at year-cleanest pruning; the Italian Garden tier, the 1908-built greenhouse, the perennial borders. Pillar Rocks (8km, ₹15) — the three 122m granite columns — at year-clearest visibility before the morning fog usually clearing by 9am. Silver Cascade (5km, year-low flow), Bear Shola Falls (3km, dry-season trickle), Green Valley View (5km), Dolphin''s Nose (8km), Berijam Lake (22km, Forest Department permit ₹100-200, daily quota 75 vehicles) all workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 3, 5, 'go',
  'Cool-dry holds. 8-22C. Bryant Park building, Berijam Lake at year-clearest. Last quiet month before April crowds.',
  'March is when Kodaikanal hits its softest sweet spot. Bryant Park spring flush building, Berijam Lake permit slots at light load, Pillar Rocks visibility holding. Last quiet month before April-May summer-migration crowds arrive. Rates 30 percent below January.',
  NULL,
  'Kodaikanal in March is the soft-landing month before plains-summer migration crowds arrive in force. Daytime 20-22C, nights 8-12C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. Bryant Park (12 hectares, ₹30, 9am-6pm) building toward April-May peak bloom but already 60 percent of borders showing colour. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) at year-clearest sightlines — the Madurai plains visible to the south. Kodaikanal Lake (24-hectare star-shaped, 1863 build) at light load with full boat-house operations. Berijam Lake (22km, Forest Department permit ₹100-200, daily quota 75 vehicles, advance booking via Kodai Wildlife Warden office) at year-clearest — the 7km drive through the Shola forest corridor with 80+ resident bird species, Indian Gaur and Nilgiri Marten sightings. Pillar Rocks (8km, ₹15), Silver Cascade (5km, year-low flow), Bear Shola Falls (3km, dry-season trickle), Green Valley View (5km) all workable. The Astrophysical Observatory (1899-built, IIA, Friday-only public visits 10am-12pm, ₹50) at light load.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 4, 5, 'go',
  'Year-best. 10-24C. Bryant Park peak bloom. Summer-migration crowds arrive, rates climb 25 percent.',
  'April is when Kodaikanal runs at its prettiest. Bryant Park at peak bloom, perennial borders in full flush. Plains heat drives summer-migration crowds from Madurai and Coimbatore — rates climb 25 percent, weekend lodgings book 2-3 weeks ahead.',
  NULL,
  'Kodaikanal in April is when the hill station looks the way the colonial-era postcards promised. Daytime 22-24C, nights 10-14C, humidity 60-65 percent, pre-monsoon rainfall 60-100mm in the last 10 days as afternoon thundershowers. Bryant Park (12 hectares, ₹30, 9am-6pm) at full perennial-border flush — the Italian Garden tier and the 1908 greenhouse on display. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) workable through morning visibility windows before afternoon pre-monsoon haze. Kodaikanal Lake (24-hectare star-shaped, 1863 American missionary build) at full boat-house tempo; pedal boats ₹250/30min, motorboats ₹400. Pillar Rocks (8km, ₹15), Silver Cascade (5km, year-low flow until July), Bear Shola Falls (3km, dry-season trickle), Green Valley View (5km), Dolphin''s Nose (8km) at peak visitor load. Berijam Lake (22km, Forest Department permit ₹100-200, daily quota 75 vehicles) at year-busiest — book 3-5 days ahead through the Wildlife Warden office. The Astrophysical Observatory (Friday-only public visits 10am-12pm, ₹50) at busiest with school spring-break families.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 5, 5, 'go',
  'Summer-migration peak. 12-24C. Bryant Park peak bloom. Rates 2-2.5x normal. Book 4-6 weeks ahead.',
  'May is when Kodaikanal hits its annual summer-migration peak. Bryant Park at year-peak bloom across perennial borders, Pillar Rocks accessible, Berijam Lake at full booking pressure. Hotel rates 2-2.5x normal, weekend traffic gridlocks Coaker''s Walk and the Lake.',
  NULL,
  'Kodaikanal in May is when the hill station hosts its loudest stretch. Daytime 22-24C, nights 12-16C, humidity 70 percent, rainfall climbing to 100-150mm with afternoon thundershowers from May 20 onward. Bryant Park (12 hectares, ₹30, 9am-6pm) at peak perennial-border bloom — the Italian Garden tier and the 1908 greenhouse at full colour. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) workable in the morning visibility windows; the Madurai plains visible to the south on clearest days. Kodaikanal Lake (24-hectare star-shaped, 1863 build) at year-busiest boat-house tempo — pedal-boat queues 20-30 minutes; ride at dawn or 6pm-onwards. Berijam Lake (22km, Forest Department permit ₹100-200, daily quota 75 vehicles) — the 75-vehicle daily slot sells out 5-7 days ahead through the Wildlife Warden office, advance booking essential. Pillar Rocks (8km, ₹15), Green Valley View (5km), Dolphin''s Nose (8km), Silver Cascade (5km, building flow), Bear Shola Falls (3km) at peak visitor concentration. Hotel rates 2-2.5x normal: luxury (Carlton, Sterling Lake View, Le Poshe) at ₹15-22k, mid-bracket (Hilltop, Hill Country) ₹8-12k, homestays ₹3,500-5,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 6, 2, 'wait',
  'SW monsoon onset. 12-21C, 150-250mm rainfall. Coaker''s Walk fogged, Berijam access erratic. Skip unless rain-walk acceptable.',
  NULL,
  'June is when the SW monsoon hits the Palani Hills. 150-250mm rainfall, Coaker''s Walk and Pillar Rocks permanently fogged, Berijam Lake permits halt on heavy-rain weeks. NH238 climb landslide-watch. The Kodai trip cannot happen this month.',
  'Kodaikanal in June is when the SW monsoon arrives on the Palani Hills western face. Rainfall 150-250mm across 16-20 wet days at the 2100m elevation; the Palanis catch significant SW monsoon though lighter than the Nilgiris (Ooty/Coonoor) and Anamalai face. Daytime 16-21C, nights 12-14C feel mild but constant rain and 90 percent humidity strip outdoor activity. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) loses visibility past 100m on most days. Pillar Rocks (8km, ₹15), Green Valley View, Dolphin''s Nose all unusable. Berijam Lake (22km, Forest Department permit ₹100-200) — the Wildlife Warden halts the 75-vehicle daily slot 3-4 days per week through the heaviest rain. NH238 Madurai-Kodaikanal 40-hairpin climb closes 1-2 days per week on landslide events. Bryant Park (₹30, 9am-6pm) stays open at 80 percent visitor drop. Kodaikanal Lake boat operations suspend on heavy-water days. Silver Cascade (5km) and Bear Shola Falls (3km) build rapidly toward post-monsoon peak. Hotel rates drop 50 percent from May: luxury at ₹4-7k, mid-bracket ₹2,500-4k, homestays ₹1,200-2,000. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 7, 1, 'skip',
  'Peak SW monsoon. 12-20C, 250-400mm rainfall. Coaker''s Walk and Pillar Rocks fogged-out. Berijam closed. Skip.',
  NULL,
  'July is the year''s wettest stretch at Kodaikanal — 250-400mm rainfall, Coaker''s Walk and Pillar Rocks fogged-out for weeks, Berijam Lake suspends most weeks. NH238 closures 2-3 days/week. The Kodai trip cannot happen until September. Skip.',
  'Kodaikanal in July is the wettest month of the year at the 2100m Palani Hills elevation. Rainfall 250-400mm across 22-25 wet days; the Palanis western face catches sustained SW monsoon rain through the month, lighter than the Nilgiris but enough to strip the hill station''s sightline-dependent itinerary. Daytime 16-20C, nights 12-14C with 95 percent humidity and constant rain. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) unusable — the Madurai plains sightline absent. Pillar Rocks (8km, ₹15), Green Valley View, Dolphin''s Nose, Silver Cascade and Bear Shola Falls all visibility-absent. Berijam Lake (22km, Forest Department permit) — the Wildlife Warden suspends the 75-vehicle daily slot 4-5 days per week. NH238 Madurai-Kodaikanal 40-hairpin climb closes 2-3 days per week under PWD landslide-clearance schedules. Bryant Park (₹30, 9am-6pm) stays open at 90 percent visitor drop. Kodaikanal Lake boat operations suspend most days under rough-water rules. The Astrophysical Observatory Friday public visits continue but most travellers cancel. Hotel rates at year-low: luxury at ₹3-6k, mid-bracket ₹2-3.5k, homestays ₹1,000-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 8, 1, 'skip',
  'SW monsoon continues. 12-20C, 200-300mm rainfall. Coaker''s Walk and Pillar Rocks fogged. Berijam erratic. Skip.',
  NULL,
  'August holds the July pattern — 200-300mm rainfall, Coaker''s Walk and Pillar Rocks fogged most days, Berijam permits erratic. NH238 landslide-watch continues. Wait for September-October return to operations.',
  'Kodaikanal in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 200-300mm across 20-22 wet days at the 2100m Palani Hills elevation. Daytime 16-20C, nights 12-14C with 90 percent humidity and consistent overcast. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) unusable on most afternoons. Pillar Rocks (8km, ₹15) and Green Valley View visibility absent. Berijam Lake (22km, Forest Department permit ₹100-200) — the Wildlife Warden 75-vehicle daily quota remains erratic; only confirmed advance bookings cleared, walk-up applications declined. NH238 Madurai-Kodaikanal 40-hairpin climb closures 1-2 days per week. Bryant Park (₹30, 9am-6pm) and the Kodaikanal Lake area stay open at 85 percent visitor drop. Silver Cascade (5km) and Bear Shola Falls (3km) at building post-monsoon flow. The Astrophysical Observatory Friday public visits run but advance booking essential. Independence Day (Aug 15) brings a 3-day weekend bump from Madurai and Coimbatore but rain-impacted sightlines disappoint. Hotel rates at year-low through early August, climbing 15 percent for Aug 15 weekend: luxury at ₹4-7k, mid ₹2,500-4k, homestays ₹1,100-1,900.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 9, 4, 'go',
  'SW monsoon retreats. 11-22C, 80-150mm rainfall. Silver Cascade at year-peak. Coaker''s Walk sightlines return.',
  'September is the proper season opener. SW monsoon retreats from the Palani Hills by week three, NH238 stabilises, Berijam permits resume. Silver Cascade and Bear Shola Falls at year-peak post-monsoon flow. Hotel rates 30 percent below December peak.',
  NULL,
  'Kodaikanal in September is the soft re-opening with the bonus of Silver Cascade hitting peak flow. Rainfall drops to 80-150mm across 12-15 wet days, mostly the first fortnight as the SW monsoon retreats from the Palani Hills. Daytime 19-22C, nights 11-13C, humidity easing toward 75 percent. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) sightlines return — the Madurai plains visible to the south on clearing afternoons. Silver Cascade (5km, ₹15) and Bear Shola Falls (3km, ₹15) hit their year-peak post-monsoon flow — 5-7x dry-season volume. Pillar Rocks (8km, ₹15) at clearing-afternoon visibility. Berijam Lake (22km, Forest Department permit ₹100-200, 75-vehicle daily quota) returns to full daily operations from September 15-20 via the Wildlife Warden office. Kodaikanal Lake boat house at full operations. Bryant Park (12 hectares, ₹30, 9am-6pm) returns to full visitor hours. The Astrophysical Observatory (1899-built, IIA, Friday-only 10am-12pm, ₹50) at light load. NH238 Madurai-Kodaikanal 40-hairpin climb stabilises with closure events rare. Hotel rates 30 percent below December peak: luxury at ₹5-8k, mid-bracket ₹3-5k, homestays ₹1,400-2,300.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 10, 5, 'go',
  'Full operations resume. 10-22C, 100-180mm rainfall residual. Silver Cascade still strong, sightlines clearing.',
  'October is the proper hill-station window. All viewpoints back at high visibility, Berijam at full schedule, Silver Cascade still strong. NE monsoon residual brings evening showers but daytime mostly clear. Rates 25 percent below December peak.',
  NULL,
  'Kodaikanal in October is when the Palani Hills hill station hits full operations with post-monsoon green still holding. Daytime 19-22C, nights 10-13C, rainfall 100-180mm split across the SW retreat (first 10 days) and NE monsoon arrival (last 10 days), humidity dropping toward 70 percent. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) at full afternoon visibility — the Madurai plains visible to the south, the cliff drop to the lower Palanis on the southern face. Kodaikanal Lake (24-hectare star-shaped, 1863 American missionary build by Sir Vere Henry Levinge) at full boat-house tempo. Bryant Park (12 hectares, ₹30, 9am-6pm) at light visitor load with autumn perennial-border tempo. Pillar Rocks (8km, ₹15) at year-clear visibility. Silver Cascade (5km) still carries 4-5x dry-season volume from September peak. Bear Shola Falls (3km) workable. Berijam Lake (22km, Forest Department permit ₹100-200, 75-vehicle daily quota) at full operations. The Astrophysical Observatory Friday public visits at full schedule. NE monsoon brings 1-2 hour evening downpours typical 4-7pm but daytime mostly clear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 11, 5, 'go',
  'Cold-dry. 8-20C. Coaker''s Walk cleanest. Bryant Park second flush. Rates climb 25 percent through month.',
  'November is the genuine pivot to Kodaikanal high season. NE monsoon residual spent by mid-month, rainfall under 60mm, Coaker''s Walk sightlines at year-clearest. Hotel rates climb 25 percent as Christmas-week traffic begins booking.',
  NULL,
  'Kodaikanal in November is when the Palani Hills hill station turns the corner. Northeast monsoon residual eases to under 60mm across 4-6 wet days, all in the first 10 days. Daytime 18-20C, nights 8-11C, humidity dropping under 70 percent. Coaker''s Walk (1872, the 1km cliff promenade, ₹15 entry) at year-clearest sightlines — the Madurai plains visible to the south past 100km, the southern Palani cliff face at peak photogenic. Bryant Park (12 hectares, ₹30, 9am-6pm) at second-flush bloom; the chrysanthemum show typically the last week of November, organised by the Horticulture Department. Kodaikanal Lake (24-hectare star-shaped, 1863 build) at full boat-house tempo with light visitor load. Pillar Rocks (8km, ₹15) at year-clear visibility — the three 122m granite columns. Berijam Lake (22km, Forest Department permit ₹100-200, 75-vehicle daily quota) at full operations; advance booking 2-3 days through the Wildlife Warden office. Silver Cascade (5km) and Bear Shola Falls (3km) still carry 2-3x dry-season volume. The Astrophysical Observatory (1899-built, IIA, Friday-only 10am-12pm, ₹50).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kodaikanal', 12, 5, 'go',
  'Peak season. 5-19C. Christmas-NY rates 2-2.5x. Coaker''s Walk and Lake queue. Book 4-6 weeks ahead.',
  'December is the year''s most reliable Kodaikanal window — peak Palani weather, full operational tempo. Christmas-NY week (Dec 22-Jan 5) drives rates to 2-2.5x base. Coaker''s Walk and Lake gridlock 10am-4pm. Book everything 4-6 weeks ahead.',
  NULL,
  'Kodaikanal in December is the year''s most coherent window. Daytime 17-19C, nights 5-9C with overnight fog 9pm-9am common, rainfall under 30mm, humidity 65 percent. Christmas-NY week (December 22 to January 5) is the brutally tight stretch: luxury (Carlton, Sterling Lake View, Le Poshe) climbs to ₹18-25k against ₹6-9k off-peak; mid-bracket (Hilltop, Hill Country) hits ₹10-14k against ₹4-6k off-peak; homestays double to ₹3,000-4,500. Coaker''s Walk (1872, the 1km cliff promenade, ₹15) at year-clearest sightlines but queues 20-30 minutes 11am-3pm. Kodaikanal Lake (24-hectare star-shaped, 1863 American missionary build) at peak monthly boat-house footfall — pedal-boat queues 30-45 minutes through the Christmas-NY weeks. Bryant Park (12 hectares, ₹30, 9am-6pm) at peak monthly visitor load. Pillar Rocks (8km, ₹15), Green Valley View (5km), Dolphin''s Nose (8km) at peak queues. Berijam Lake (22km, Forest Department 75-vehicle daily quota) sells out 5-7 days ahead through the Wildlife Warden office. The Astrophysical Observatory Friday public visits (10am-12pm, ₹50) at year-busiest. The 40-hairpin NH238 Madurai-Kodaikanal final 25km climb queues 60-90 minutes 11am-3pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
