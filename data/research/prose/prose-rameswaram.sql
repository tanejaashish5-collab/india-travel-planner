-- Rameswaram destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: rameswaram

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 1, 5, 'go',
  'Peak window. 23-29C, NE monsoon retreated. Pongal cluster + temple corridor walkable through afternoon.',
  'January is when Rameswaram runs at its strongest. NE monsoon has retreated, rainfall under 40mm, daytime 26-29C with consistent sea breeze. The 200m+ third corridor — the longest temple corridor in the world — walkable barefoot through full afternoon. 22 theerthams bath ₹25.',
  NULL,
  'Rameswaram in January is the Char Dham version Tamil Nadu travellers wait all year for. The northeast monsoon has retreated from the Coromandel coast, daytime sits at 26-29C with consistent Bay of Bengal sea breeze, nights drop to 22-23C, humidity at 68 percent. The Ramanathaswamy Temple — one of the twelve Jyotirlingas of Shiva and one of the Char Dham — runs at full ritual tempo, with the 22 theerthams (the sacred wells inside the temple, each named for a separate sacred geography) bath ticket at ₹25 covering the full circuit. The third corridor — the temple''s third prakaram, 197m east-west and the longest temple corridor in the world — is walkable barefoot through the afternoon for the first time since November. Agni Theertham (the sea-bathing beach right in front of the temple''s eastern gate) draws pre-temple-entry pilgrims at dawn; pandits charge ₹100-500 for the abbreviated ritual. The new Pamban Bridge (operational April 2024 — India''s first sea bridge with a vertical lift, replacing the 1914 cantilever) carries Pamban Boat Mail train traffic; the parallel road bridge is the 2.3km Annai Indira Gandhi Road Bridge. Dhanushkodi day trips (18km drive) workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 2, 5, 'go',
  'Driest month. 23-30C. Sea breeze year-best. Temple + Agni Theertham + Dhanushkodi all at peak.',
  'February holds January''s pattern with the year''s lowest rainfall (sub-20mm). Daytime 27-30C, sea breeze near-constant. Temple ritual at full tempo, Dhanushkodi day-trip at peak comfort, Pamban Bridge sunset photography clearest of the year.',
  NULL,
  'February in Rameswaram is the technical peak. Rainfall under 20mm, daytime 27-30C, humidity 65 percent, the Bay of Bengal sea breeze near-constant from 9am to 8pm. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo — 5am opening, the 22-theerthams bath sequence (₹25 ticket, takes 90-120 minutes to complete), midday closure 1pm-3pm, evening shift 3pm-9pm. Agni Theertham sea-bath at dawn or before sunset. The third corridor walkable through full afternoon. Dhanushkodi (18km drive south) at peak comfort — tarmac road to Arichalmunai, 4WD jeep aggregator ₹150-250 per seat for the final 8km to the absolute tip where the Bay of Bengal meets the Indian Ocean. The Kothandaramaswamy Temple at the halfway mark (the only structure to survive the 1964 cyclone) takes 20-30 minutes. Pamban Bridge sunset photography at year-best clarity; the new vertical-lift bridge''s span opens for shipping roughly once a fortnight (no public schedule — ask station staff at Mandapam). Hotel rates ease 15 percent off January: Daiwik ₹3,000-4,500, Hyatt Place ₹4,000-5,500, beach homestays ₹1,000-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 3, 4, 'go',
  'Last cool month. 25-32C. Sea breeze still active. Temple walks compress mid-month.',
  'March extends February''s pattern. Daytime 30-32C, sea breeze still active 10am-7pm. Third-corridor walk works through afternoon for the first half; last fortnight needs the 11am-3pm AC retreat. Rates 20 percent below February.',
  NULL,
  'March in Rameswaram is the transition month. Daytime climbs to 30-32C, nights 25-26C, humidity 70 percent, rainfall under 40mm. The Bay of Bengal sea breeze still arrives from 10am and pushes through to 7pm, keeping the inner-temple courtyards comfortable for the first half of the month. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo, the 22-theertham bath at ₹25, third-corridor circumambulation workable but slow-pace recommended for the last fortnight. Agni Theertham dawn bath still draws full pilgrim numbers. Dhanushkodi day-trip workable through the first three weeks; the last week pushes the 8km Arichalmunai-tip 4WD-jeep ride into 38-40C territory — start by 7am. Pamban Bridge photography at year-cleanest visibility before the haze. Kothandaramaswamy Temple (the lone 1964 cyclone survivor) and the abandoned-town ghost ruins at Dhanushkodi all at full access. Hotel rates ease 20 percent off February: Daiwik Hotels ₹2,500-4k, Hyatt Place ₹3,500-5k, beach homestays ₹800-1,500. Sea Shore Restaurant, Hotel Mathura at the bus stand, temple-street vegetarian thalis. Last clean-value window before April pushes the pilgrimage into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 4, 3, 'wait',
  'Pre-monsoon heat. 27-35C. Temple walks compress to dawn + dusk. Hotel rates 30 percent off.',
  'April pushes Rameswaram past comfort. Daytime 33-35C, sea breeze unreliable. The third-corridor barefoot walk works only 6-9am and 6-9pm. Dhanushkodi day-trip endurance-mode. Wait for October if the trip is more than the basic darshan.',
  'April in Rameswaram is the pre-northeast-monsoon contraction. Daytime 33-35C, the temple''s granite floors hold 40-42C surface heat noon-4pm — barefoot circumambulation unworkable through mid-day. Push to October-March for the proper Char Dham trip.',
  'April in Rameswaram is the pre-monsoon contraction. Daytime 33-35C, nights 27-28C, humidity 75 percent, rainfall under 30mm. The Bay of Bengal sea breeze becomes unreliable — some days it arrives at 11am, some days not until 3pm. The Ramanathaswamy Temple''s third-corridor granite floor holds 40-42C surface heat through 11am-4pm — barefoot circumambulation impossible during those hours even with shoes-off discipline. The 22-theertham bath sequence is doable inside the temple''s shaded prakarams (the bath water is drawn from each well at year-coolest 24-25C). Agni Theertham dawn bath workable; sunset bath crowds thin. Dhanushkodi day-trip becomes endurance: the 4WD-jeep ride across the 8km Arichalmunai-tip sand track exposes passengers to 38C heat with no shade. Pamban Bridge photography requires dawn or last-light slot. Hotel rates run 30 percent off January: Daiwik ₹2,000-3,500, Hyatt Place ₹3,000-4,500, beach homestays ₹700-1,200. The April pilgrim load is the lowest of the dry quarter. AC retreat through Hotel Mathura, Daiwik''s lobby cafe, and the Vivekananda Memorial museum at the temple''s edge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 5, 2, 'wait',
  'Heat peak. 28-37C. Temple barefoot walk impossible mid-day. Hotel rates at year-low.',
  'May is Rameswaram at peak heat. Daytime 35-37C, sea breeze irregular, the temple''s granite floors hit 44-46C surface noon-4pm. Pilgrimage compressed to 5-8am and 6-9pm. October-February is dramatically better.',
  'May pushes Rameswaram fully into endurance-mode pilgrimage. The third corridor — the whole reason to come — has barefoot floor temperatures at 44-46C noon-4pm. Char Dham pilgrims still come but the experience is fractional. Wait for October.',
  'May in Rameswaram is the heat peak. Daytime 35-37C, nights 28-29C, humidity 75 percent, rainfall under 40mm. The Bay of Bengal sea breeze becomes irregular and afternoon hours feel inland-hot despite the island geography. The Ramanathaswamy Temple''s third-corridor granite hits 44-46C surface temperature noon-4pm — barefoot circumambulation impossible. The 22-theertham bath sequence (₹25) remains workable inside the shaded prakarams; the water in each well stays at 25-26C. Pilgrimage compresses to 5-8am and 6-9pm windows. Agni Theertham dawn bath still draws full pilgrim numbers but evening bath collapses after 5pm if the sea breeze fails. Dhanushkodi day-trip not advisable — the sand-track 4WD-jeep across to Arichalmunai exposes passengers to 38-40C with zero shade, no infra past the new bridge. Pamban Bridge photography only at first-light and last-light slots. Hotel rates at year-low: Daiwik ₹1,800-3k, Hyatt Place ₹2,500-4k, beach homestays ₹600-1,000. Cochin-based Char Dham circuit operators skip Rameswaram entirely in May. Wait for October when the northeast monsoon returns and the island re-enters its pilgrim-comfortable window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 6, 3, 'wait',
  'SW monsoon spillover eases heat. 27-34C. Sea breeze returns. Temple at full ritual tempo.',
  'June brings a 2-3C ease as SW monsoon spillover reaches the Coromandel coast. Daytime 32-34C, sea breeze returns to its 9am-7pm shape. Temple walks workable mornings and evenings. Hotel rates remain at off-season levels.',
  'June still sits below the proper Oct-Mar window. SW monsoon is a Kerala-side event; Rameswaram (eastern coast) gets only the spillover. The Char Dham trip works but at 75 percent of peak capacity. October opens the clean window.',
  'June in Rameswaram is the first ease month. The southwest monsoon hits the Kerala side of the Western Ghats around June 1 — Rameswaram sits on the eastern coast 250km east of the ghats, so the spillover delivers only 60-80mm rainfall across 8-10 wet days, mostly late-afternoon thunderstorms. Daytime 32-34C, nights 27-28C, humidity climbs to 80 percent. The Bay of Bengal sea breeze returns to its standard 9am-7pm shape, making the temple''s third-corridor walkable through mid-afternoon again. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo; the 22-theertham bath sequence at ₹25 sees thin pilgrim queues. Agni Theertham dawn bath workable. Dhanushkodi day-trip workable but the 4WD-jeep across the 8km sand-track gets bogged on wet days — call ahead to the operator aggregator at Arichalmunai. Pamban Bridge photography returns to clean. Kothandaramaswamy Temple at full access. Hotel rates remain at off-season levels: Daiwik ₹2,000-3,500, Hyatt Place ₹3,000-4,500, beach homestays ₹700-1,200. International pilgrim load thin; domestic Char Dham parties trickle back.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 7, 1, 'skip',
  'Cyclonic wind season. 27-33C. Bay storm risk + Dhanushkodi closures. Tagline avoid-window.',
  NULL,
  'July is when the Bay of Bengal cyclonic-cell pattern starts disrupting the Rameswaram-Dhanushkodi axis. The 4WD-jeep service to Arichalmunai-tip suspends on stormy days. Adam''s Bridge boat-trip operators (when running) suspend entirely. Skip — the tagline avoid-window starts here.',
  'July in Rameswaram is the start of the Bay of Bengal stormy season. Rainfall climbs to 100-130mm across 12-14 wet days, daytime 31-33C, nights 27-28C, humidity 85 percent. The Bay-side wind picks up from the second week — afternoon squall lines hit the Pamban-Dhanushkodi axis with sustained 40-60kmph gusts that suspend the 4WD-jeep service to Arichalmunai-tip and shut down the proposed Adam''s Bridge boat-trips entirely. The Ramanathaswamy Temple keeps its full ritual schedule; the 22-theertham bath stays workable inside the prakarams. Agni Theertham sea-bath unsafe on stormy days. The new Pamban Bridge handles vehicle traffic continuously but the road bridge gets closed periodically when Bay wind exceeds 65kmph — Mandapam to Pamban delays of 1-3 hours common. Hotel rates at year-low: Daiwik ₹1,800-3k, Hyatt Place ₹2,500-4k, beach homestays ₹500-900. Aadi-month Tamil pilgrim load thin. The brief explicitly flags Jul-Sep as the avoid window. Push to October when the Bay calms and the northeast monsoon stays as evening showers, not all-day storms.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 8, 1, 'skip',
  'Continued storm risk. 27-33C. Bay wind. Dhanushkodi 4WD suspends frequently. Skip.',
  NULL,
  'August continues July''s Bay-storm pattern. Rainfall 100-130mm, sustained 40-60kmph wind on the Pamban-Dhanushkodi axis. The 4WD-jeep to Arichalmunai-tip suspends 2-4 days a week. The Char Dham trip — designed around the third corridor + 22 theerthams + Dhanushkodi triad — runs at 40 percent. Skip.',
  'August in Rameswaram is the second skip month of the Bay-storm window. Rainfall 100-130mm across 13-15 wet days, daytime 31-33C, nights 27-28C, humidity 85 percent. The Bay-side wind sustains through most afternoons; the new Pamban Bridge handles vehicular traffic but the parallel road bridge sees periodic closures when sustained wind crosses 65kmph. The 4WD-jeep service from Arichalmunai to the Dhanushkodi-tip suspends 2-4 days a week — operators wait out the storm rather than risk getting stuck on the sand track. Adam''s Bridge (the chain of limestone shoals stretching toward Talaimannar Sri Lanka, ~30km, ferry service operationally non-existent for tourists since 2024 cyclone disruptions) entirely off the table. The Ramanathaswamy Temple at full ritual tempo; the 22-theertham bath sequence and inner-corridor circumambulation workable inside the shaded prakarams. Agni Theertham sea-bath unsafe most days. Hotel rates at year-low: Daiwik ₹1,800-3k, Hyatt Place ₹2,500-4k, beach homestays ₹500-900.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 9, 1, 'skip',
  'Pre-NE monsoon storm tail. 27-32C. Bay still volatile. Push to mid-Oct.',
  NULL,
  'September is the tail of the Bay-storm window and the pre-NE-monsoon build. Bay wind eases through the third week but the 4WD axis to Dhanushkodi remains unreliable. Daytime 30-32C. Hotel rates remain at off-season. Push to mid-Oct for the clean Char Dham window.',
  'September in Rameswaram is the storm-tail month. Rainfall remains at 90-110mm across 11-13 wet days, daytime 30-32C, nights 27C, humidity 82 percent. Bay-side wind eases through the third week as the southwest monsoon retreats from the wider sub-continent (formal withdrawal around September 25-30). The 4WD-jeep to Arichalmunai-tip remains unreliable — operators run conditional services depending on the morning wind reading at the Mandapam coast guard station. The northeast monsoon — Tamil Nadu''s actual rain season — is still 3-4 weeks away. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo; the 22-theertham bath sequence and the third-corridor circumambulation workable. Agni Theertham dawn bath safe through the back half of the month. Pamban Bridge photography returns to consistent clarity by late September. Hotel rates remain at off-season levels: Daiwik ₹2,000-3,500, Hyatt Place ₹3,000-4,500, beach homestays ₹600-1,000. Domestic Char Dham parties begin pre-booking for October arrival. International pilgrim load near-zero. The October 15 onward window — Bay calmed, sea breeze stable, full Dhanushkodi access — is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 10, 5, 'go',
  'NE monsoon arrives. 25-31C. First fortnight still volatile, mid-Oct opens clean window.',
  'October is the season-opener. NE monsoon arrives around Oct 15 as evening showers (not storms). Daytime 28-31C, sea breeze stable, full Dhanushkodi access returns mid-month. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Rameswaram is the proper return to the Char Dham circuit. The northeast monsoon — Tamil Nadu''s genuine rain season — arrives around October 15, dropping 200-250mm across 10-12 wet days through the back half, mostly as late-afternoon and evening showers (not the all-day Bay storms of July-September). Daytime 28-31C, nights 25-26C, humidity 78 percent, sea breeze stable from 9am through 7pm. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo; the 22-theertham bath sequence (₹25) and the third-corridor circumambulation workable through mid-afternoon for the first time since March. Agni Theertham sea-bath at dawn and sunset both safe. Dhanushkodi day-trip returns to full operation — 4WD-jeep service across the 8km Arichalmunai-tip sand track at ₹150-250 per seat, the Kothandaramaswamy Temple (the 1964 cyclone survivor) at the halfway mark, the ghost-town ruins at the absolute tip walkable through afternoon. Pamban Bridge photography at year-cleanest visibility post-rain wash. Hotel rates run 25-30 percent below January peak: Daiwik ₹2,800-4k, Hyatt Place ₹3,500-5k, beach homestays ₹900-1,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 11, 5, 'go',
  'NE monsoon active 250-300mm. 24-30C. Char Dham peak builds. Cyclone watch.',
  'November is the proper peak build. NE monsoon active with 250-300mm rainfall, evening showers. Daytime 27-30C, sea breeze constant. Hotel rates climb to 70 percent of January peak. Watch IMD for Bay-cell formation — Gaja Nov 2018 hit Nagapattinam 150km north.',
  NULL,
  'November in Rameswaram is the year''s second-peak month behind January. Northeast monsoon active with 250-300mm rainfall across 12-14 wet days, mostly late-afternoon and evening showers that rinse the temple and sea without disrupting morning programmes. Daytime 27-30C, nights 24-25C, humidity 75 percent, Bay sea breeze constant from 9am through 8pm. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo; the 22-theertham bath at ₹25 walkable through all shaded hours, third-corridor circumambulation at year-best comfort. Agni Theertham sea-bath at dawn and sunset both safe (sea state moderates after the SW-monsoon storm season ends). Dhanushkodi day-trip at full operation — 4WD-jeep service to Arichalmunai-tip, the Kothandaramaswamy Temple, the ghost-town ruins all accessible. Pamban Bridge photography at year-cleanest visibility. **Cyclone watch active:** Gaja (Nov 2018) hit Nagapattinam 150km north; Nivar (Nov 2020) hit Cuddalore further north; the Bay of Bengal generates 60 percent of its annual cyclones in November. Check IMD bulletins 48-72 hours ahead — local advisories suspend the 4WD service on warning days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rameswaram', 12, 5, 'go',
  'Peak season. 23-29C. NE monsoon wraps mid-month. Cyclone watch active until Dec 22.',
  'December is when Rameswaram runs at full peak. NE monsoon wraps mid-month, rainfall easing to 150-200mm. 1964 Rameswaram cyclone anniversary Dec 22-23 — Bay-cell still possible until then. Vardah Dec 2016 + Michaung Dec 2023 prior precedents.',
  NULL,
  'December in Rameswaram is the operational peak alongside January. Northeast monsoon wraps in the first 15-18 days delivering 150-200mm across 7-9 wet days; from December 20 onward rainfall falls under 30mm. Daytime 26-29C, nights 22-23C, humidity 70 percent, Bay sea breeze constant. The Ramanathaswamy Temple at full Jyotirlinga ritual tempo, the 22-theertham bath at ₹25 walkable through full afternoon for the first time since November, the third-corridor circumambulation at year-best comfort. Agni Theertham dawn-and-sunset baths at year-best sea state. Dhanushkodi day-trip at peak operation. **Cyclone watch remains active through the third week:** the 1964 Rameswaram cyclone (which wiped out Dhanushkodi town overnight on December 22-23, 1964, taking the Pamban Boat Mail train with it and ~150 lives) sits as the most consequential Bay-cell of the December calendar; Vardah hit Chennai December 2016, Michaung hit Chennai December 2023. Check IMD 72 hours ahead. Christmas-NYE rate spike is modest in Rameswaram (less Goa-style demand): Daiwik ₹4-6k, Hyatt Place ₹5-7k, beach homestays ₹1,200-2,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
