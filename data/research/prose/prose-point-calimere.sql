-- Point Calimere Wildlife Sanctuary destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: point-calimere | best_months [11,12,1] | avoid [3,4,5,6,7,8] (sanctuary closed Apr-Sep)

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 1, 5, 'go',
  'Peak flamingo window. 22-29C, dry. 30,000 greater flamingos at the Ramsar wetland. Blackbuck herds visible.',
  'January is Point Calimere''s peak. Roughly 30,000 greater flamingos arrived November-December and stay through January. Blackbuck antelope herds visible across the dry-grassland zone. Open 6am-6pm. Entry ₹50.',
  NULL,
  'Point Calimere in January is the year''s peak Ramsar-wetland window. The sanctuary — Ramsar Site #1210 since 2002, total area 24.17 sq km of mudflats, lagoons, dry evergreen forest, and Tamil Nadu''s only remaining patch of indigenous coastal scrub — sits at the southernmost tip of Nagapattinam district where the Coromandel coast turns west toward the Palk Strait. Approximately 30,000 greater flamingos (Phoenicopterus roseus) migrate to the lagoons from October-November and remain through January-March; alongside them are spot-billed pelicans, painted storks, black-headed ibises, lesser sand plovers, curlew sandpipers, Eurasian curlews, and 200+ other species. The dry-grassland zone holds blackbuck antelope herds (Tamil Nadu''s largest outside Vallanadu), chital, wild boar, jackal, feral horses. Daytime 22-29C, nights 19C, humidity 65 percent. Sanctuary opens 6am-6pm; entry ₹50 adult, jeep safari ₹1500-2500 through Forest Department guides at Kodikkarai gate. TN Forest Department Inspection Bungalow Kodikkarai ₹800-1500 (forests.tn.gov.in), Hotel Sangamam Vedaranyam (16km north) ₹1.5-3k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 2, 4, 'go',
  'Flamingo numbers easing. 23-30C, dry. 20-25,000 flamingos still present. Blackbuck rutting season.',
  'February is the strong tail. Flamingo numbers reduce to 20-25,000 as some early departures begin. Blackbuck rutting season — males spar over harem territory. Dawn jeep safari window cleanest.',
  NULL,
  'February in Point Calimere is the strong flamingo tail. Roughly 20-25,000 greater flamingos remain in the lagoons through the month — some early departures begin late February as the migratory cycle turns north. Daytime 23-30C, nights 20C, humidity 65 percent. The blackbuck antelope rutting season runs through February-March — males spar over harem territory in the dry-grassland zone, and the morning safari window (6-9am) catches the peak rutting displays. Dawn jeep safari (6-9am) is the year''s strongest single window — flamingo flight patterns, blackbuck activity, the dry-grassland-to-mangrove ecotone transition all visible. Sanctuary entry ₹50 adult; jeep safari ₹1500-2500 through Forest Department guides at the Kodikkarai gate. Accommodation: TN Forest Department Inspection Bungalow Kodikkarai ₹800-1500 (book 4-6 weeks ahead via forests.tn.gov.in), Hotel Sangamam Vedaranyam (16km north) ₹1.5-3k, Nagapattinam hotels (50km north) ₹2-4k. The sanctuary lies 320km south of Chennai via NH-32, 7-8 hours by road. Access via Vedaranyam-Kodikkarai road (16km, paved). Carry binoculars (300mm+ zoom, the lagoon edges sit 100-300m from accessible bunds), water, sun protection.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 3, 3, 'wait',
  'Flamingo departures accelerate. 25-32C, dry. 10-15,000 flamingos remaining. Heat building.',
  'March sees flamingo numbers drop to 10-15,000 as the migratory return-flight begins. Resident waterbirds and blackbuck still active. Sanctuary closes late March / early April.',
  'March is the late tail. Flamingo numbers down to a third of January peak. Heat building — dawn-only safari practical. Sanctuary closes for the season late month.',
  'March in Point Calimere is the late migratory tail. Greater flamingo numbers drop to 10-15,000 as the return-migration to Rann of Kutch breeding grounds and further west begins. Daytime 25-32C, humidity 70 percent, heat building through the late month. Resident waterbirds (spot-billed pelican, openbill stork, black-headed ibis, herons, egrets) and blackbuck herds remain active. Sanctuary safari window compresses to 6-9am dawn — by 10am the dry-grassland zone heat becomes uncomfortable in the open jeep. TN Forest Department typically winds down visitor access around end of March or first week of April — verify exact 2026 closure date via forests.tn.gov.in. The closure stops jeep-safari operations though basic entry walks at the Kodikkarai gate (₹50) may continue depending on local conditions. The lagoon water levels start dropping toward the April-September dry-season minimums. Accommodation: TN Forest Department Inspection Bungalow Kodikkarai at year-low occupancy. Hotel Sangamam Vedaranyam ₹1.2-2.5k. The sanctuary reopens for the season around early November once monsoon recharge and migratory arrivals confirmed.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 4, 1, 'skip',
  'Sanctuary closed. Lagoons drying. Flamingos departed. No visitor access. Reopens November.',
  NULL,
  'Sanctuary closed April-September. Flamingo migratory population departed for Rann of Kutch and beyond. Lagoon water levels drop through the dry season. No visitor access. Reopens early November.',
  'April in Point Calimere is full closure. The TN Forest Department typically winds down visitor access at the end of March as the migratory waterbird population departs. Flamingos have largely returned to Rann of Kutch breeding grounds; lagoon water levels drop toward the April-September dry-season minimum as evaporation outpaces residual inflow. Daytime 28-37C, humidity 75 percent, sea breeze provides modest relief by 4pm. The dry-grassland zone holds blackbuck antelope and feral horse herds year-round but visitor jeep-safari operations cease. The Forest Department Inspection Bungalow at Kodikkarai remains administratively staffed but visitor lodgings essentially close. Carthrun via Forest Department permission may sometimes be granted for serious research-bound photographers — apply 4-6 weeks ahead via the Wildlife Warden Nagapattinam at forests.tn.gov.in. For Cauvery-delta birders looking for April-September alternatives, Vedanthangal (75km from Chennai, also closed Apr-Oct) and Pulicat Lake (year-round flamingo presence) are the options. The sanctuary reopens early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 5, 1, 'skip',
  'Sanctuary closed. Peak heat. 29-39C. Lagoons at year-low. Reopens November.',
  NULL,
  NULL,
  'May in Point Calimere is full closure at the year''s harshest point. Daytime 29-39C with occasional 41C spikes, humidity 75 percent, sea breeze provides modest relief only after 5pm. The lagoon water levels reach their year-low — the Great Salt Swamp (Vedaranyam Swamp) dries to white-crystallised salt-pan, the Mudbank zone holds residual mudflat patches where blackbuck and chital come for the morning salt-licks, and the dry-grassland holds the year-round resident species. Pre-monsoon thunderstorms hit the last 10 days — short violent squalls that bring temporary respite but no lagoon recharge. The TN Forest Department maintains the closure. For Cauvery-delta birders, Pulicat Lake (year-round flamingo presence) remains the May alternative. The Vedaranyam fishing village (16km north of Kodikkarai) operates through the heat; the famous Vedaranyam salt-pan production hits its annual peak in the May-July dry-season. The sanctuary reopens early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 6, 1, 'skip',
  'Sanctuary closed. SW monsoon weak — TN coast rain shadow. Lagoons still dry. Reopens November.',
  NULL,
  'Sanctuary closed April-September. TN coast in SW monsoon rain shadow — only 40-60mm rain. Lagoons still at year-low. No visitor access. Reopens early November.',
  'June in Point Calimere continues the closure. The TN coast sits in the SW monsoon rain shadow — the Western Ghats absorb most monsoon moisture and only 40-60mm of light rain reaches the Vedaranyam-Kodikkarai region through the month. Lagoon water levels remain at year-low; the Great Salt Swamp continues at its dry-season white-crystallised state. Daytime 28-35C, humidity 78 percent, sea breeze from 3pm onward. Blackbuck antelope and feral horse herds shift toward the remaining mudbank pools for water. The Forest Department maintains visitor closure. The Vedaranyam salt-pan production continues at peak — Tamil Nadu produces approximately 35 percent of India''s salt, and the Vedaranyam-Marakkanam stretch is one of the three major regions. For Cauvery-delta birders, Pulicat Lake remains the strongest year-round alternative. The sanctuary reopens early November once the NE monsoon delivers the 350-500mm of October-December rain that recharges the lagoons and the migratory waterbird arrival commences.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 7, 1, 'skip',
  'Sanctuary closed. SW monsoon residual. 70-100mm rain. Lagoons starting to recover. Reopens November.',
  NULL,
  NULL,
  'July in Point Calimere continues the closure. The SW monsoon delivers 70-100mm to the TN coast through the month — enough to start marginal recovery of the lagoon water levels but not enough to draw the migratory waterbird population. Daytime 27-33C, humidity 80 percent, sea breeze from 2pm. The Great Salt Swamp begins its slow recovery from May''s year-low. The Forest Department maintains visitor closure. Blackbuck antelope and feral horse herds resume more dispersed foraging across the dry-grassland zone as humidity rises. Aadi Perukku (August 3, fixed Cauvery river-bank festival) approaches — the Cauvery delta district where Point Calimere sits sees significant Aadi-month religious traffic at inland temple sites (Mayuram, Tanjore, Srirangam, Kumbakonam, Thiruvarur) but the coastal sanctuary remains closed. For Cauvery-delta birders, Pulicat Lake remains the strongest year-round alternative; Vedanthangal (75km from Chennai) also remains closed April-October. The sanctuary reopens early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 8, 1, 'skip',
  'Sanctuary closed. SW monsoon residue continues. 100-130mm rain. Lagoons filling slowly. Reopens November.',
  NULL,
  NULL,
  'August in Point Calimere continues the closure. The SW monsoon residue adds another 100-130mm across the month — the lagoon water levels rise to roughly 25-35 percent of NE-monsoon peak capacity. Daytime 26-32C, humidity 80 percent, rain across 9-11 wet days. The dry-grassland zone holds blackbuck antelope, feral horse, chital, wild boar, jackal herds at standard year-round densities. The Forest Department maintains visitor closure through the SW-monsoon-residual period. The TN coast cyclone watch begins from October 1 — Cyclone Gaja landed at Vedaranyam (16km north of Kodikkarai) on November 16, 2018 with major destruction across the Point Calimere region: 60+ deaths, 80,000+ trees uprooted, the Forest Department Inspection Bungalow at Kodikkarai damaged. The sanctuary infrastructure has been rebuilt since 2018 but cyclone risk to the immediate region remains the highest along the Tamil Nadu coast. The sanctuary reopens early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 9, 1, 'skip',
  'Sanctuary closed. Pre-NE-monsoon. 100-150mm rain. Lagoons filling. Reopens November.',
  NULL,
  NULL,
  'September in Point Calimere continues the closure. The SW monsoon tail brings 100-150mm; the lagoon water levels rise toward 40-50 percent of NE-monsoon peak capacity. Daytime 26-31C, humidity 78 percent. The dry-grassland zone returns to fully-leafed scrub. The Forest Department conducts pre-reopening surveys late September — lagoon-level checks, jeep-safari road condition assessments, infrastructure inspections. The migratory waterbird population remains at northern breeding grounds. The NE monsoon arrives mid-to-late October; the sanctuary typically reopens for visitors in early November once the migratory flamingo arrival commences and the lagoon water level reaches 70-85 percent capacity. Cyclone watch on the Coromandel coast begins from October 1 — IMD monitors Bay of Bengal lows. For Cauvery-delta birders, Pulicat Lake (year-round flamingo presence) holds its September population. The sanctuary reopens early November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 10, 2, 'wait',
  'Sanctuary mostly closed. NE monsoon arrives. Lagoons filling. Early migratory arrivals late month.',
  'October sees NE monsoon arrival. Lagoons fill rapidly. Early flamingo arrivals late month. Sanctuary typically reopens early November — verify with TN Forest Department.',
  'October is the build-up month. Sanctuary still closed through three weeks. NE monsoon delivers 250-350mm. Early flamingo arrivals late month. Push to mid-November.',
  'October in Point Calimere is the build-up month before the season reopens. The NE monsoon arrives in force from mid-month — 250-350mm of rain across 12-14 wet days recharges the lagoon system rapidly. By the third week of October, lagoon water levels hit 70-90 percent capacity and the Great Salt Swamp returns to its NE-monsoon-fed Ramsar wetland state. The first migratory flamingo arrivals typically come late October as the Rann of Kutch return-migration begins. TN Forest Department conducts pre-reopening surveys mid-October; the sanctuary typically reopens for visitors in the first or second week of November once the flamingo population reaches a threshold (~5,000+ birds) and lagoon levels stabilise. Cyclone watch on the Coromandel coast at peak — Cyclone Thane hit Cuddalore (130km north) on December 30, 2011; Cyclone Gaja landed directly at Vedaranyam (16km north) on November 16, 2018. The Forest Department''s reopening is conditional on cyclone-watch clearance. For birders aiming for first-reopening: monitor TN Forest Department announcements via forests.tn.gov.in. The strong call: mid-November onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 11, 5, 'go',
  'Season opens. 23-29C. Flamingo arrivals build. 20-30,000 birds by month-end. Cyclone watch holds.',
  'November is the season opener and peak migration. Greater flamingos arrive in waves — 20-30,000 by late November. Blackbuck visible in dry-grassland zone. Cyclone watch holds. Entry ₹50, safari ₹1500-2500.',
  NULL,
  'November in Point Calimere is the season opener and one of the year''s two peak windows. The TN Forest Department reopens visitor access in the first or second week of November once lagoon water levels stabilise and the flamingo migratory arrival reaches threshold. Greater flamingos arrive in waves from Rann of Kutch breeding grounds — by late November, the population hits 20-30,000 birds. Alongside flamingos: spot-billed pelicans, painted storks, black-headed ibises, lesser sand plovers, curlew sandpipers, Eurasian curlews, marsh sandpipers. The dry-grassland holds blackbuck antelope, chital, wild boar, jackal, and the feral horse herd. Daytime 23-29C, nights 21C, humidity 75 percent. Cyclone watch holds at year-peak — Cyclone Gaja landed at Vedaranyam (16km north) on November 16, 2018 and destroyed much of the Point Calimere infrastructure (rebuilt 2019-2020); Nivar landed at Cuddalore on November 25, 2020. Sanctuary opens 6am-6pm, entry ₹50, jeep safari ₹1500-2500, dawn 6-9am the strongest window. TN Forest Department Inspection Bungalow Kodikkarai ₹800-1500 (book 4-6 weeks ahead via forests.tn.gov.in). Build 1-2 buffer days for cyclone-watch flexibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('point-calimere', 12, 5, 'go',
  'Peak flamingo. 22-28C. 30,000+ greater flamingos. Blackbuck rutting build. Cyclone watch through Dec 20.',
  'December is full peak. 30,000+ greater flamingos at the lagoons. Blackbuck antelope rutting builds for February. Cyclone watch holds through Dec 20 — Thane Dec 2011 hit Cuddalore. Entry ₹50.',
  NULL,
  'December in Point Calimere is full peak. The greater flamingo population reaches 30,000+ birds across the lagoon system; the Great Salt Swamp at NE-monsoon-fed peak capacity. Alongside flamingos: 200+ migratory and resident waterbird species — Ramsar Site #1210 reflects the consistent biodiversity. The dry-grassland holds blackbuck antelope at peak visibility, males beginning to spar in pre-rutting displays. Daytime 22-28C, nights 19C, humidity 70 percent. Cyclone watch holds through December 20 historically — Thane hit Cuddalore on December 30, 2011 with major destruction; Vardah (Chennai December 12, 2016) brought 200mm+ rain; Michaung (Chennai December 5, 2023) brushed the broader stretch. IMD updates daily. Sanctuary opens 6am-6pm, entry ₹50 adult, jeep safari ₹1500-2500 per jeep through Forest Department guides at the Kodikkarai gate. The Christmas-NYE corridor brings increased weekend traffic — book TN Forest Department Inspection Bungalow Kodikkarai 6-8 weeks ahead; Hotel Sangamam Vedaranyam (16km north) ₹2-3.5k late December. The sanctuary closes April-September annually.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
