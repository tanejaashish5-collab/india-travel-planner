-- Vedanthangal Bird Sanctuary destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: vedanthangal | best_months [11,12,1,2,3] | avoid [4,5,6,7,8,9,10] (sanctuary closed Apr-Oct)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 1, 5, 'go',
  'Peak nesting + dawn flights. 21-29C, dry. Watchtower at full daybreak rotation. 75km daytrip from Chennai.',
  'January is the sanctuary''s technical peak. 40,000+ waterbirds (cormorants, ibises, painted storks, pelicans, herons) nest in the Barringtonia trees over the 30-hectare tank. Dawn flights 6-7am. Daytrip from Chennai 75km, 2 hours. Entry ₹35 adult / ₹10 child / ₹50 camera.',
  NULL,
  'Vedanthangal in January is the year''s technical peak. The sanctuary — India''s oldest bird sanctuary, protected since 1798 by a Chengalpattu Collector order making it the world''s second-oldest protected wildlife area after Yellowstone (1872) — holds roughly 30 hectares of mangrove-edged tank water surrounded by Barringtonia acutangula trees that waterbirds use for nesting platforms. Peak season brings 40,000+ birds across 20+ species: little and large cormorant, oriental darter, black-headed ibis, painted stork (marquee species, breeding plumage at January peak), Asian openbill, Eurasian spoonbill, grey and purple heron, night heron, intermediate egret, garganey, northern shoveler. Daytime 22-29C, low humidity. The 1km bund walk has a 30-foot watchtower at the east end — dawn (6-7am) and dusk (5-6:30pm) are the two flight windows. Entry ₹35 adult, ₹10 child, ₹50 camera. Day-trip from Chennai 75km via NH-32, 2 hours off-peak. No accommodation onsite — basic homestays at Madurantakam (12km) ₹800-1500. Pongal weekend (January 14-17) is the year''s most crowded — book Saturday-Sunday early.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 2, 5, 'go',
  'Painted stork chicks fledging. 22-30C, dry. Watchtower at peak photography window. 75km from Chennai.',
  'February is the chick-fledging window. Painted stork chicks visible on tree-top platforms. 40,000+ waterbirds active. Dawn flights 6-7am, dusk flights 5-6:30pm. Entry ₹35.',
  NULL,
  'February in Vedanthangal is the chick-fledging window — painted stork, openbill, ibis, and cormorant chicks visible on tree-top platforms across the Barringtonia stands. Daytime 23-30C, humidity 65 percent, dawn cool enough for the 6am watchtower start. The 30-hectare tank sits at peak NE-monsoon-fed level; the bund walk runs 1km along the south and east edges. The 30-foot watchtower at the east end gives the year''s best aerial photographs — birds rising for dawn flights pass at watchtower level 6:10-6:45am. Carry zoom lenses (300-600mm); closest nesting platforms 80-120m from the bund and 40-60m from the watchtower. Bring water — no shaded benches on the bund. Entry ₹35 adult, ₹10 child, ₹50 camera. Day-trip from Chennai 75km via NH-32, 2 hours. No accommodation onsite — basic homestays at Madurantakam (12km) ₹800-1500, or anchor in Mahabalipuram (60km east) for a coast-and-sanctuary 2-day trip. Migration peak fortnight typically falls in February — verify with TN Forest Department.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 3, 4, 'go',
  'Late nesting. 25-32C. Migration tail. Watchtower dawn-only as heat builds. Sanctuary still open.',
  'March is the late-nesting tail. Bird counts dropping from peak but still substantial (15-25,000). Heat building — dawn flight 6-6:45am, then exit. Sanctuary closes for the season at end of March / start of April.',
  NULL,
  'March in Vedanthangal is the late-nesting tail. The painted-stork and ibis populations begin migrating north toward Bharatpur and the Gangetic plain; the cormorant and openbill numbers remain substantial (15-25,000) but flight density drops 40-50 percent from January peak. Daytime 26-32C, humidity 70 percent, dawn temperatures 22C. Dawn flight window 6-6:45am — bird departures concentrated in the first 30 minutes of light, then the open-water heat reduces visible activity. The 30-foot watchtower remains the best vantage but mid-morning visits past 8am yield diminishing returns. Forest Department typically winds down sanctuary access by late March or early April as the tank level drops and the migratory population departs — verify exact 2026 closure date with TN Forest Department (forests.tn.gov.in). The Barringtonia acutangula trees shed their nesting platforms after fledglings depart. Entry ₹35 still applies through whatever week the sanctuary remains open. Day-trip from Chennai 75km via NH-32, 2 hours off-peak. Last clean weekday windows for serious birders before the April-October closure.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 4, 1, 'skip',
  'Sanctuary closed. Tank dry. Birds migrated north. No visitor access. Reopens November.',
  NULL,
  'Sanctuary closed April-October. The migratory waterbird population departs for Bharatpur, Mongolia, and Russian breeding grounds. Tank level drops to mud through April-June heat. No visitor access. The sanctuary reopens for the season around early November.',
  'April in Vedanthangal is full closure. The TN Forest Department typically winds down visitor access at the end of March as the migratory waterbird population departs for their summer breeding grounds — painted storks fly north to Bharatpur, ibises and openbills to the Gangetic plain, cormorants and herons disperse across the broader Tamil Nadu wetland network. The 30-hectare tank, fed by the NE monsoon Oct-Dec, drops to mud through the pre-monsoon heat dome of April-June; the Barringtonia acutangula trees shed their tree-top platforms and the bird traffic that defines the sanctuary essentially ends. Forest Department signage at the Vedanthangal gate from early April: "Sanctuary closed for the off-season — reopens for visitors with the arrival of migratory species in November." There is no point in driving the 75km from Chennai. For Chennai birders looking for a April-October stand-in: Pulicat Lake (60km north of Chennai, year-round flamingo migration through Pulicat Bird Sanctuary in TN/AP), Kelambakkam Backwaters (40km south, sandpipers and lapwings), Adyar Estuary in the city. The sanctuary reopens around early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 5, 1, 'skip',
  'Sanctuary closed. Tank dry. Peak heat 31-39C. No visitor access. Reopens November.',
  NULL,
  'Sanctuary closed April-October. Tank dry, migratory species departed. No visitor access. Peak pre-monsoon heat. The sanctuary reopens for the season around early November.',
  'May in Vedanthangal is full closure with the tank at year-low. Daytime 31-39C, humidity 75 percent, the 30-hectare tank reduced to cracked mud and a small central pool that holds residual local species (a handful of pond herons, an occasional spot-billed pelican, breeding plovers and lapwings on the dry margins). The TN Forest Department maintains the gate-shut status — no visitor access. The Barringtonia acutangula trees survive the heat dome through the deep groundwater table that the colonial-era bund engineering protected (the 1798 protection order recognised this); the trees will re-leaf and prepare nesting platforms ahead of the November migratory arrival. Madurantakam Lake (12km north, larger tank, accessible) sees occasional flamingo presence in May-June if water level holds. For Chennai birders: Pulicat Lake, Pallikaranai Marsh (Chennai south, Ramsar-classified urban wetland, year-round access), or the Adyar Estuary in the city. The sanctuary reopens around early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 6, 1, 'skip',
  'Sanctuary closed. Tank dry through monsoon shadow. No visitor access. Reopens November.',
  NULL,
  'Sanctuary closed April-October. Tank still dry — TN coast in SW monsoon rain shadow. No visitor access. Reopens with the NE monsoon arrival in November.',
  'June in Vedanthangal continues the closure. The TN coast sits in the SW monsoon rain shadow — only 50-70mm of light rain reaches the region across June and the tank level rises marginally to roughly 5-10 percent capacity. Daytime 28-36C, humidity 78 percent. The 30-hectare tank remains essentially dry; the Barringtonia trees re-leaf as the humidity rises but the migratory waterbird population stays at northern breeding grounds. TN Forest Department gate-shut. Madurantakam Lake (12km north) and Pulicat Lake (90km north) hold their resident waterbird populations through the SW monsoon residue. For Chennai birders, Pulicat is the strongest June alternative — flamingos in stable numbers, sandpipers and curlews, low visitor traffic. The sanctuary reopens around early November once the NE monsoon recharges the tank and the painted-stork migratory pulse arrives.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 7, 1, 'skip',
  'Sanctuary closed. SW monsoon weak. Tank still mostly dry. No visitor access. Reopens November.',
  NULL,
  'Sanctuary closed April-October. SW monsoon weak on TN coast — only 100mm rain through July, tank level marginal. No visitor access. Reopens with the NE monsoon in November.',
  'July in Vedanthangal continues the off-season closure. The SW monsoon delivers only 100-130mm to the TN coast through the month — enough to start recharging the 30-hectare tank but not enough to draw the migratory waterbird population. Daytime 27-33C, humidity 80 percent. The Barringtonia acutangula trees stand re-leafed and ready, the bund walk dry, but TN Forest Department signage maintains the off-season status. For Chennai birders looking for July alternatives: Pulicat Lake (90km north, year-round flamingo population stable, sandpipers and curlews active), Pallikaranai Marsh (Ramsar wetland in south Chennai, urban-edge access free, year-round resident species), Adyar Estuary in the city, Karikili Bird Sanctuary (close to Vedanthangal but smaller, often runs lower-key year-round access — verify status before driving). The sanctuary reopens around early November once the NE monsoon delivers the 250-400mm that recharges the tank and the painted-stork migratory wave arrives from Bharatpur.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 8, 1, 'skip',
  'Sanctuary closed. SW monsoon weak continues. Tank filling slowly. No visitor access. Reopens November.',
  NULL,
  NULL,
  'August in Vedanthangal continues the closure. The SW monsoon residue adds another 130-160mm across the month — the 30-hectare tank fills to roughly 30-40 percent capacity, the Barringtonia stands stand fully leafed and ready, but the migratory waterbird population remains at northern breeding grounds. Daytime 26-32C, humidity 80 percent. TN Forest Department gate-shut. Madurai Aadi Perukku (August 3, Cauvery river-bank festival) is observed across Tamil Nadu; the Vaishnavite community at the nearby Madurantakam temple stages traditional water-related rituals on the day. For Chennai birders, Pulicat Lake remains the strongest year-round alternative — 90km north on NH-16, day-trip viable from Chennai. The sanctuary reopens around early November once the NE monsoon delivers the tank-filling rains and the migratory waterbird arrival commences.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 9, 1, 'skip',
  'Sanctuary closed. Pre-NE-monsoon. Tank filling. No visitor access. Reopens November.',
  NULL,
  'Sanctuary closed April-October. Pre-NE-monsoon. Tank filling toward 50 percent capacity. No visitor access. Reopens November with the migratory waterbird arrival.',
  'September in Vedanthangal continues the off-season. The SW monsoon tail adds 130-180mm; the tank fills toward 50-60 percent capacity, the bund walk dries and stabilises, the Barringtonia acutangula trees stand fully leafed. Daytime 26-32C, humidity 78 percent. The migratory waterbird population remains at northern breeding grounds — painted storks, ibises, openbills departure from Bharatpur typically starts late October. TN Forest Department signage holds the off-season status, with a notice indicating the early-November reopening once tank levels and early migratory arrivals are confirmed. The Forest Department''s pre-reopening tank-level survey usually happens in the last week of September or first week of October. For Chennai birders, Pulicat Lake holds its standard September population with the first flamingo migratory arrivals. The Vedanthangal sanctuary reopens around early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 10, 2, 'wait',
  'Sanctuary still closed. NE monsoon arrives mid-month. Tank fills. Early migratory arrivals.',
  'October sees the NE monsoon arrive and the tank fill rapidly. First migratory waterbird arrivals late month. Sanctuary typically reopens early November — verify exact date with TN Forest Department.',
  'October is the build-up month — sanctuary still typically closed through three weeks. NE monsoon delivers 250-350mm rain mid-month onward, tank fills, early migrants arrive. Push to mid-November for reliable peak.',
  'October in Vedanthangal is the build-up month before the season reopens. The NE monsoon arrives in force from mid-month — 250-350mm of rain across 11-13 wet days recharges the 30-hectare tank rapidly. By the third week of October, tank level hits 70-90 percent capacity and the Barringtonia acutangula stands stand at the year''s most lush. The first migratory waterbird arrivals typically come late October — painted storks beginning to depart Bharatpur and the Gangetic plain, ibises and openbills following. TN Forest Department conducts pre-reopening surveys mid-October; the sanctuary typically reopens for visitors in the first or second week of November once the resident-and-migratory population reaches a critical breeding-population threshold (~15,000 birds). Daytime 25-31C, humidity 80 percent. The Cyclone watch on the Coromandel coast begins from October 1 — IMD monitors Bay of Bengal lows. For birders looking to arrive at first-reopening: monitor TN Forest Department announcements via forests.tn.gov.in. The strong call: aim for mid-November onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 11, 5, 'go',
  'Season opens. 22-29C. Migratory waterbirds arrive. Tank at peak capacity. Watchtower at full window.',
  'November is the season opener. Painted storks, ibises, openbills, pelicans arrive from Bharatpur. Tank at NE-monsoon-fed peak. Dawn flights 6:15am. Entry ₹35. 75km daytrip from Chennai.',
  NULL,
  'November in Vedanthangal is the season opener and the second-best month of the year. The TN Forest Department reopens visitor access in the first or second week of November once the migratory waterbird population reaches breeding density. Painted storks (marquee species, breeding plumage developing), oriental darters, black-headed ibises, openbills, Eurasian spoonbills, cormorants, grey and purple herons, night herons, intermediate egrets arriving from Bharatpur and the Gangetic plain. By late November, the bird count hits 25,000-35,000. Daytime 23-29C, humidity 75 percent. Dawn flight 6:15-7am, dusk flight 5:15-6:30pm — the year''s best two photography slots after January-February. Entry ₹35 adult, ₹10 child, ₹50 camera. Forest Department guide service ₹150-300 for the 1km bund walk. Day-trip from Chennai 75km via NH-32, 2 hours off-peak. Basic homestays at Madurantakam (12km north) ₹800-1500 for back-to-back dawn-and-dusk windows. Cyclone watch holds — Nivar (Cuddalore November 25, 2020) brought heavy rain inland to Vedanthangal but no sanctuary damage. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('vedanthangal', 12, 5, 'go',
  'Peak nesting build. 21-28C, dry. 35,000+ waterbirds. Watchtower at year-second-best photography.',
  'December is full peak. Painted storks in full breeding plumage. 35,000+ waterbirds. Dawn flight window 6:30am. NE monsoon tail wet days 5-7 across the month. Entry ₹35.',
  NULL,
  'December in Vedanthangal is full peak. The migratory waterbird population reaches 30,000-35,000 birds across 20+ species; painted storks in full breeding plumage on the tree-top nesting platforms across the Barringtonia acutangula stands. The 30-hectare tank holds NE-monsoon-fed water at peak capacity. Daytime 22-28C, nights 20C, humidity 70 percent. Dawn flight window 6:30-7:15am — birds rising for foraging flights pass at watchtower level in waves of 40-80 birds; dusk flight window 5-6:15pm. Cyclone watch holds through December 20 historically — Vardah (Chennai December 12, 2016) and Michaung (Chennai December 5, 2023) both brought heavy rain inland to Vedanthangal; the sanctuary closes for 1-2 days during cyclone events. IMD updates daily. Entry ₹35 adult, ₹10 child, ₹50 camera, ₹100 video. Forest Department guide service ₹150-300. Day-trip from Chennai 75km via NH-32, 2 hours off-peak — weekend Friday-Sunday Chennai-Bangalore traffic adds 30-45 minutes. Basic homestays at Madurantakam (12km north) at full December capacity — ₹1000-2000 weekend rates. The 30-foot watchtower at the east end is the year''s strongest single vantage point.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
