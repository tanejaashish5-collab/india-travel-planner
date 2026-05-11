-- Kotagiri destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kotagiri

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 1, 4, 'go',
  'Peak quiet-Nilgiri window. 9-22C at 1850m. Catherine Falls, Kodanad viewpoint, Sullivan Memorial all open.',
  'January is the cleanest weather window at the oldest Nilgiri hill station. Daytime 19-22C, nights 9-12C. Kodanad viewpoint clear, Catherine Falls (shared with Coonoor) at mid-flow, Sullivan Memorial (1819 — first Nilgiri European house) open 9am-5pm Tue-Sun.',
  NULL,
  'Kotagiri in January is the Nilgiri trip for travellers who find Ooty and Coonoor over-touristed. At 1850m and only 28km from Ooty, Kotagiri is the oldest Nilgiri hill station — pre-dating Ooty by 8 years (Kotagiri 1819, Ooty 1827) — settled by John Sullivan, the Collector of Coimbatore, before he moved up to Ooty. Daytime 19-22C, nights 9-12C, rainfall under 20mm. The Sullivan Memorial (Kannerimukku, 5km, ₹20 entry, 9am-5pm closed Mon) is the original 1819 bungalow — restored as a Nilgiris museum by the Nilgiri Documentation Centre, covering Toda tribe culture, early hill-station botany, and the colonial-era survey records. Kodanad Viewpoint (16km, free, 7am-6pm) overlooks the Moyar Gorge and the Tamil Nadu-Karnataka border — the Mysuru plateau and the Nilgiri-Mudumalai-Bandipur tiger landscape stretch out below. Elk Falls (8km, 7am-5pm) and Catherine Falls (28km, ₹15 — shared with Coonoor side) at workable flow. The Toda tribal village walks (the matriarchal pastoralist community, traditional buffalo-herders, embroidery work) operate from the Kotagiri Tribal Welfare Society — book 1-2 days ahead, ₹500-800 per visitor, half-day.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 2, 5, 'go',
  'Driest month. 11-23C. Tea-estate visibility cleanest. Toda village walks at year-best clarity. Rates 15 percent below January.',
  'February is the technical sweet spot — rainfall under 15mm, Kodanad viewpoint cleanest, Sullivan Memorial walkable end-to-end. Toda village visits at best weather. Rates 15 percent below January.',
  NULL,
  'Kotagiri in February is the cleanest weather month at the oldest Nilgiri hill station. Rainfall 10-15mm, daytime 20-23C, nights 11-13C. Kodanad Viewpoint (16km, free, 7am-6pm) at year-clearest sightlines — the Moyar Gorge 300m drop to the Mysuru plateau visible to the north, the Sigur plateau and the Mudumalai-Bandipur forest reserve visible to the northeast. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) — the 1819 bungalow of John Sullivan, run by the Nilgiri Documentation Centre with photographs and survey records, the Toda tribal cultural section, and the rare-books on the hill station''s pre-colonial Badaga and Toda settlements. Elk Falls (8km), Catherine Falls (28km, ₹15), Rangaswamy Pillar (32km — a 400-foot rock formation sacred to the Irula tribe), Longwood Shola (16km, 116-hectare montane evergreen forest, Forest Department permit walk ₹150-300) all at year-clearest underfoot. Toda tribal village visits (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at year-best weather for the open-cell mund settlements and the embroidery craft demonstration.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 3, 5, 'go',
  'Cool-dry holds. 12-25C. Longwood Shola at year-clearest. Last quiet month before April spillover.',
  'March extends February''s clean-weather pattern. Longwood Shola forest walk at year-clearest, tea estates dry, Toda village walks at peak. Last quiet month before April-May summer-migration spillover from Ooty arrives.',
  NULL,
  'Kotagiri in March is the soft-landing month before plains-summer migration spillover from Ooty reaches even this quietest Nilgiri hill station. Daytime 22-25C, nights 12-14C, humidity climbing toward 65 percent in the last fortnight, rainfall under 25mm. Longwood Shola (16km, 116-hectare montane evergreen forest, Forest Department permit walk ₹150-300, 7am-4pm) at year-clearest underfoot — the 2-3 hour walk covers the rarest of Nilgiri shola fragments, with Indian Gaur, Sambar Deer, Nilgiri Marten and 80+ resident bird species. Kodanad Viewpoint (16km, free, 7am-6pm) over the Moyar Gorge at year-clearest sightlines. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) at light visitor load. The Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at best weather; the matriarchal pastoralist community keeps year-round operations but March is the warmest comfortable walking month. Rangaswamy Pillar (32km, the 400-foot Irula-sacred rock) accessible via the Sholurmattam trail. Tea estate walks at full clarity. Holi long weekend brings a 3-day domestic bump from Bengaluru and Chennai.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 4, 4, 'go',
  'Pre-monsoon. 14-27C. Tea estates at year-clearest before haze. Summer-migration spillover from Ooty arrives.',
  'April pushes Kotagiri into mild summer-migration spillover from Ooty. Weekday visits stay quiet; weekends see Bengaluru and Chennai families seeking Nilgiri-cool without Ooty crowds. Pre-monsoon thundershowers last 10 days.',
  NULL,
  'Kotagiri in April runs at pleasant Nilgiri-summer temperatures with mild summer-migration spillover. Daytime 23-27C, nights 14-17C, humidity 60-65 percent, pre-monsoon rainfall 40-70mm in the last 10 days as afternoon thundershowers. Kodanad Viewpoint (16km, free) and the Moyar Gorge sightline workable 7-10am before mid-day haze. Longwood Shola walks (16km, 116-hectare montane evergreen, Forest Department permit ₹150-300, 7am-4pm) workable through the morning. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) at full operations. Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at year-busiest weekday tempo as researchers visit during spring break. Catherine Falls (28km, ₹15) at year-low flow. Elk Falls (8km) as dry-season ribbon. Tea estate walks at the Naduvattam, Tea Estates South India, and the smaller Halgar estate (₹200-400) workable mornings. Weekend traffic from Bengaluru (340km, 7-hour drive via NH75) and Chennai (565km, 10-hour drive) climbs 3x from March; weekday visits stay quiet. Hotel rates climb 25 percent versus March: heritage at ₹3,200-5,500, mid-bracket ₹2,200-3,800, homestays ₹1,400-2,400.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 5, 4, 'go',
  'Summer-migration spillover. 16-27C. First fortnight clean, last 10 days bring SW-monsoon advance squalls.',
  'Early May extends April — viewpoints clear, Longwood Shola walkable, Toda visits at full tempo. Last 10 days bring SW-monsoon advance squalls. Kotagiri stays 30 percent cheaper than Ooty/Coonoor through the summer-migration weeks.',
  NULL,
  'Kotagiri in May splits cleanly in two. The first fortnight extends April: daytime 23-27C, nights 16-18C, humidity 70 percent. Longwood Shola (16km, 116-hectare montane evergreen forest, Forest Department permit ₹150-300, 7am-4pm) workable on dawn walks. Kodanad Viewpoint (16km, free) and Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) at full operations. Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at year-busiest tempo as Bengaluru and Chennai families fill weekday weekend slots. Ooty Flower Show third week (around May 18-22) drives spillover where Kotagiri runs 35-45 percent cheaper than Ooty. By the third week, SW monsoon advance squalls hit the Kerala-Tamil Nadu Nilgiri shoulder — Kotagiri at 1850m receives 100-200mm of advance rain through the back half of May. Kodanad and Catherine Falls (28km, ₹15) sightlines collapse on rainy afternoons. NH181 Mettupalayam-Kotagiri approach becomes landslide-watch from May 22. Hotel rates climb 35 percent first fortnight then drop 25 percent the back half: heritage at ₹4,000-6,500 tapering to ₹2,800-4,500, homestays ₹1,500-2,500. Lock the first 10 days; gamble or skip the back half.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 6, 2, 'wait',
  'SW monsoon onset. 14-22C, 200-300mm rainfall. Kodanad fogged, Longwood Shola access restricted. Skip unless rain-walk acceptable.',
  NULL,
  'June is when the SW monsoon hits the Nilgiri shoulder. 200-300mm rainfall, Kodanad and Catherine Falls sightlines fogged, Longwood Shola Forest Department permits halt on heavy-rain weeks. NH181 Mettupalayam approach landslide-watch. The Kotagiri trip cannot happen this month.',
  'Kotagiri in June is when the SW monsoon arrives on the Nilgiri windward face. Rainfall 200-300mm across 16-20 wet days at the 1850m elevation; the Nilgiri shoulder catches the windward monsoon while the leeward Coimbatore plains stay drier. Daytime 18-22C, nights 14-16C feel mild but constant rain and 90 percent humidity strip outdoor activity. Kodanad Viewpoint (16km, free) and the Moyar Gorge sightline lose visibility past 100m on most days. Longwood Shola (116-hectare montane evergreen) — the Forest Department halts walking permits 3-4 days per week through the heaviest rain weeks under safety protocols. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) stays open at 70 percent visitor drop. The Toda tribal village walks (Kotagiri Tribal Welfare Society) continue but advance booking essential and rain delays expected. Catherine Falls (28km, ₹15) builds rapidly toward post-monsoon peak — accessible if access road clears. NH181 Mettupalayam-Kotagiri 14-hairpin climb closes 1-2 days per week under Kerala-Tamil Nadu PWD clearance schedules. Hotel rates at year-low: heritage at ₹2,500-4,500, mid-bracket ₹1,500-2,800, homestays ₹900-1,600. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 7, 1, 'skip',
  'Peak SW monsoon. 14-20C, 500-800mm rainfall. Longwood Shola closed, viewpoints unusable. Skip.',
  NULL,
  'July is the year''s wettest stretch at Kotagiri — 500-800mm rainfall, Longwood Shola walking permits suspend, Kodanad and Catherine Falls fogged-out for weeks. NH181 closures 2-3 days/week. The Kotagiri trip cannot happen until September. Skip.',
  'Kotagiri in July is the year''s wettest month at the 1850m elevation. Rainfall 500-800mm across 24-27 wet days; the Nilgiri shoulder catches the full SW monsoon force. Daytime 15-20C, nights 14-16C with constant rain and 95 percent humidity. The Longwood Shola (16km, 116-hectare montane evergreen forest) — the Forest Department halts walking permits across most of the month under safety protocols; only confirmed multi-day expedition access continues. Kodanad Viewpoint (16km), Catherine Falls (28km), Elk Falls (8km) all unusable — visibility absent. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) stays open as the indoor rainy-afternoon offering, the 1819 bungalow and the Toda tribal cultural section workable. The Toda tribal village walks (Kotagiri Tribal Welfare Society) suspend during the heaviest rain weeks. NH181 Mettupalayam-Kotagiri 14-hairpin climb closes 2-3 days per week. Tea estate walks suspend during the heaviest plucking weeks at the smaller Halgar and Naduvattam estates. Hotel rates at year-low: heritage at ₹2,500-4,500, mid-bracket ₹1,500-2,800, homestays ₹800-1,500. The trip travellers picture cannot happen this month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 8, 1, 'skip',
  'SW monsoon continues. 14-20C, 400-600mm rainfall. Longwood Shola access erratic, viewpoints fogged. Skip.',
  NULL,
  'August holds the July pattern with marginally fewer extreme-rain days — 400-600mm rainfall, Longwood Shola permits erratic, viewpoints fogged most days. NH181 landslide-watch continues. Wait for September-October return to operations.',
  'Kotagiri in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 400-600mm across 20-23 wet days. Daytime 15-20C, nights 14-16C with 90 percent humidity and consistent overcast. The Longwood Shola Forest Department walking permits remain erratic — only confirmed multi-day expedition access continues, weekend walk-ins blocked. Kodanad Viewpoint (16km, free) and the Moyar Gorge sightline absent. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) the one reliable indoor offering — the 1819 bungalow, the Toda tribal cultural section, and the rare-books collection. Catherine Falls (28km, ₹15) building rapidly toward September peak. The Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) continue but rain delays standard. NH181 Mettupalayam-Kotagiri 14-hairpin climb closes 1-2 days per week. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru and Coimbatore, but rain-impacted sightlines disappoint. Hotel rates at year-low through early August, climbing 15 percent for Aug 15 weekend: heritage at ₹2,500-4,500, mid ₹1,500-2,800, homestays ₹900-1,600. Wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 9, 4, 'go',
  'SW monsoon retreats. 12-22C, 100-200mm rainfall. Catherine Falls at year-peak. Tea estates greenest.',
  'September is the proper season opener. SW monsoon retreats by week three, NH181 stabilises, Longwood Shola permits resume. Catherine Falls at year-peak post-monsoon flow. Tea estates at year-greenest. Hotel rates 25 percent below December peak.',
  NULL,
  'Kotagiri in September is the soft re-opening with the bonus of Catherine Falls hitting year-peak flow. Rainfall drops to 100-200mm across 12-15 wet days, mostly the first fortnight as the SW monsoon retreats. Daytime 19-22C, nights 12-14C, humidity easing toward 75 percent. The tea estates around Kotagiri (Naduvattam, Halgar, Tea Estates South India) are at year-greenest after the four-month monsoon flush. Kodanad Viewpoint (16km, free, 7am-6pm) over the Moyar Gorge clears on retreating afternoons. Catherine Falls (28km, ₹15) hits its annual peak flow — the 250-foot drop in two tiers carries 5-7x dry-season volume; visit dawn or late afternoon for best light. Longwood Shola (116-hectare montane evergreen, Forest Department permit ₹150-300) returns to full daily walks from September 15-20. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) at full operations. The Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at year-best weather for the open-cell mund settlements. NH181 Mettupalayam-Kotagiri 14-hairpin climb stabilises with closure events rare.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 10, 5, 'go',
  'Full operations resume. 11-22C, 100-150mm rainfall residual. Catherine Falls still strong. Tea estates still green.',
  'October is the proper hill-station window. All viewpoints back at high visibility, Longwood Shola walks at full schedule, tea estates still monsoon-green. NE monsoon residual brings evening showers but daytime mostly clear. Rates 20 percent below December.',
  NULL,
  'Kotagiri in October is when the oldest Nilgiri hill station hits full operations with post-monsoon green still holding. Daytime 19-22C, nights 11-13C, rainfall 100-150mm split across the SW retreat (first 10 days) and NE monsoon arrival (last 10 days), humidity dropping toward 70 percent. Longwood Shola (16km, 116-hectare montane evergreen forest, Forest Department permit ₹150-300, 7am-4pm) at year-best walk experience — the 2-3 hour montane forest walk with Indian Gaur, Sambar Deer, Nilgiri Marten and 80+ resident bird species runs at full daily schedule. Kodanad Viewpoint (16km, free, 7am-6pm) over the Moyar Gorge at full afternoon visibility — the Mysuru plateau and the Mudumalai-Bandipur landscape visible to the north. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) at light visitor load. Catherine Falls (28km, ₹15) still carries 4-5x dry-season volume from the September peak. Elk Falls (8km) workable as light cascade. The Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at full operations. Tea estate walks (Naduvattam, Halgar at ₹200-400) workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 11, 5, 'go',
  'Cold-dry. 10-21C. Tea-estate visibility cleanest. Kodanad sightlines at year-best. Rates climb 20 percent through month.',
  'November is the genuine pivot to Kotagiri high season. NE monsoon residual spent by mid-month, rainfall under 50mm, Kodanad sightlines at year-clearest. Hotel rates climb 20 percent as Christmas-week traffic begins booking. Strong window for travellers seeking quiet.',
  NULL,
  'Kotagiri in November is when the oldest Nilgiri hill station turns its quietest corner. Northeast monsoon residual eases to under 50mm across 4-6 wet days, all in the first 10 days. Daytime 18-21C, nights 10-12C, humidity dropping under 70 percent. The tea estate sweep visible from Kodanad Viewpoint (16km, free, 7am-6pm) is at year-clearest — the Moyar Gorge 300m drop, the Mysuru plateau to the north, the Mudumalai-Bandipur tiger landscape to the northeast all visible past 80km. Longwood Shola (16km, 116-hectare montane evergreen, Forest Department permit ₹150-300) at full daily walks, the 2-3 hour montane circuit at year-best wildlife sighting odds (Indian Gaur, Sambar Deer, Nilgiri Marten, 80+ birds). Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) at light visitor load — the 1819 bungalow, the Toda cultural section, and the rare-books collection. The Toda tribal village walks (Kotagiri Tribal Welfare Society, ₹500-800 half-day) at year-best weather. Catherine Falls (28km, ₹15) still carries 3x dry-season volume.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kotagiri', 12, 5, 'go',
  'Peak season. 8-21C. Christmas-NY rates 1.8-2.2x. Still quieter than Ooty/Coonoor. Book 2-3 weeks ahead.',
  'December is Kotagiri''s most reliable window — peak Nilgiri weather, full operations. Christmas-NY week drives rates to 1.8-2.2x base. Kotagiri stays 35 percent cheaper than Ooty and dramatically quieter through the rate-tripling weeks.',
  NULL,
  'Kotagiri in December is the year''s most coherent window with the bonus of staying the cheapest and quietest of the three Nilgiri hill stations. Daytime 18-21C, nights 8-11C with some ground frost mornings in the last fortnight, rainfall under 25mm, humidity 65 percent. Christmas-NY week (December 22 to January 5) is the tight stretch but materially milder than Ooty/Coonoor: heritage stays at ₹6,500-9,500 against ₹3,500-5,800 off-peak (versus Ooty''s ₹22-30k peak); mid-bracket at ₹4,000-6,000; homestays ₹2,800-4,000. The tea estate sweep visible from Kodanad Viewpoint (16km, free, 7am-6pm) over the Moyar Gorge runs at peak photogenicity — the Mudumalai-Bandipur tiger landscape and the Mysuru plateau visible to the north. Sullivan Memorial (5km, ₹20, 9am-5pm closed Mon) — the 1819 bungalow of John Sullivan, the original Nilgiri European house — at peak monthly footfall but never queued like the Ooty Botanical Garden. Longwood Shola (16km, 116-hectare montane evergreen, Forest Department permit ₹150-300, 7am-4pm) at year-clearest walk visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
