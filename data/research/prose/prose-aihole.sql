-- Aihole destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: aihole | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 1, 5, 'go',
  'Peak architecture-laboratory window. 15-29C, dry. Lad Khan and Durga at year-cleanest light.',
  'January is the best stretch for the Cradle of Indian temple architecture. 120-plus Chalukya experimental temples across the village; Lad Khan (5-6c CE), Durga Temple (apsidal-plan), Meguti Jain (634 CE inscription) all walk cleanly. 28-29C daytime, 15-16C nights.',
  NULL,
  'Aihole in January is the proper start to the Chalukya circuit. Daytime 27-29C, nights 15-16C, humidity 50 percent, rainfall under 10mm. The village holds 120-plus Chalukya temples across roughly 5 sq km — the experimental laboratory where 5-8th century architects developed the vocabulary later codified at Pattadakal and Belur-Halebidu. Lad Khan Temple (the cluster anchor, 5-6c CE, the earliest — a square-plan structure originally derived from village panchayat halls) opens 9am-5pm, free entry. Durga Temple (apsidal-plan modeled on Buddhist chaityas — the name comes from durg meaning fort, not the goddess) holds the most photographed exterior — the colonnaded pradakshina with carved deities (Mahishasura Mardini, Narasimha, Shiva-as-Tripurari, Harihara) on outer wall pillars. Meguti Jain Temple (the 634 CE Pulakeshi II inscription on the eastern wall by court poet Ravikirti — dates Aihole''s Chalukya golden age and references the Mahabharata battle in 3102 BCE) on the hilltop south. Ravan Phadi cave (5-6c CE rock-cut Shiva cave with dancing Shiva and Saptamatrika panels) opens 9am-5pm. Day-trip from Badami 35km northwest; village homestays ₹1,200-2,500, basic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 2, 5, 'go',
  'Driest month. 17-32C. Stone-detail photography year-best. Day-trip from Badami at peak comfort.',
  'February holds the technical peak with rainfall under 5mm and humidity at 45 percent. The carved exterior detail at Durga Temple (the deity panels in the colonnaded pradakshina) and the Lad Khan relief work shows year-cleanest light. Badami day-trip axis runs comfortably.',
  NULL,
  'February in Aihole is the year''s cleanest photography window for the experimental Chalukya forms. Rainfall under 5mm, daytime 30-32C, nights 17-18C, humidity 45 percent. The village holds the cluster organized into ASI groups: Lad Khan group, Durga group (with the smaller Hucchimalli adjacent), Meguti hilltop group, and Ravan Phadi cave cluster. The Durga Temple''s outer pillar deity panels — Mahishasura Mardini, Narasimha tearing Hiranyakashipu, Shiva-as-Tripurari, Harihara — hold detail in 9-11am oblique morning sun. Lad Khan (the square-plan earliest, derived from village panchayat hall architecture) shows the foundational Chalukya form before the shikhara vocabulary developed. The Meguti Jain Temple inscription (634 CE, Pulakeshi II, by court poet Ravikirti — references the Mahabharata battle to 3102 BCE) is best viewed at 10am with the eastern wall in clean light. The Ravan Phadi dancing Shiva and Saptamatrika panel walk cleanly. Day-trip from Badami 35km northwest with Pattadakal 13km southwest as combined day-2 of the standard three-day Chalukya itinerary. Village homestays ₹1,500-2,500. Badami hotels: Krishna Heritage ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 3, 4, 'go',
  'Last cool month. 19-35C. Open-air walks compress past 11am. Rates ease 25 percent.',
  'March extends the February window with the last fortnight pushing past 34C daytime. The 120-temple village has limited shade between clusters; walking compresses to 6:30-10am and 4-6pm windows. Hotel rates at Badami ease 25 percent.',
  NULL,
  'March in Aihole is the soft-landing month before the heat dome opens. Daytime 32-35C, nights 19-21C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The 120-temple village layout — Lad Khan group near the bus stand, Durga group 200m west, Meguti hilltop 800m south-southwest, Ravan Phadi cave 1.5km southwest — involves significant open-air walking with limited shade between clusters. The standard 3-4 hour visit compresses to 6:30am-10am and 4-6pm windows; the Meguti hilltop climb (90 steps to the Jain temple) holds direct overhead sun mid-day. Cave-interior temperatures at Ravan Phadi remain pleasant (24-26C inside, even when outside is 34C). The Durga Temple''s colonnaded pradakshina walk holds shade on the outer wall side; the inner sanctum cool through afternoon. The Pulakeshi II inscription at Meguti best viewed before 10am. Aihole village homestays at ₹1,200-2,000; Badami base (35km northwest) Krishna Heritage at ₹3-4.5k, Mookambika ₹2-3k, KSTDC Mayura Chalukya ₹1,500-2,500. Last clean-value window for the Chalukya-three-site axis before April closes the trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 4, 1, 'skip',
  'Heat dome opens. 23-41C. Open-air 120-temple walk unworkable mid-day. Skip strict.',
  NULL,
  'April pushes Aihole into the strict-skip stretch. Northern Karnataka plateau hits 40-41C daytime; the 120-temple village has minimal shade between Durga, Lad Khan, Meguti, and Ravan Phadi clusters. Cluster-to-cluster walks heat-stroke territory noon-5pm. Push to October.',
  'April in Aihole is the start of the strict-skip stretch. Daytime 39-41C, nights 23-25C, humidity 35 percent, rainfall under 10mm — Northern Karnataka plateau (Bayaluseeme rain-shadow) at its harshest annual character. The 120-temple village layout demands extended open-air walking between clusters (Lad Khan to Durga 200m, Durga to Meguti 800m hilltop climb, Meguti to Ravan Phadi cave 1.5km) — there is no continuous shade canopy, the village trees are scattered tamarind and neem with limited cover. The Meguti hilltop climb (90 steps, full sun-exposed) is heat-stroke territory after 9am. Cave-interior coolness at Ravan Phadi provides AC-style refuge but the route in defeats the trip. Stone-surface temperatures at the Durga Temple pradakshina reach 48-50C by 1pm. The Aihole village water grid runs reduced-pressure through April-May; homestay options thin out. Hotel base at Badami (35km northwest) at year-low rates but the Aihole leg of the standard Chalukya axis is unworkable. The Pulakeshi II inscription at Meguti, the Durga apsidal walk, the Lad Khan square-plan study — all defer to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 5, 1, 'skip',
  'Heat peak. 25-43C. 120-temple walk closed by physics. Pre-monsoon dust knocks visibility. Skip.',
  NULL,
  'May is harshest month for Aihole. Daytime 41-43C, stone surface 50-52C. Pre-monsoon dust knocks photography routes. Village homestays under 20 percent occupancy. Push to October.',
  'May in Aihole is the heat dome at peak intensity. Daytime 41-43C, nights 25-27C, humidity 35 percent, rainfall under 25mm. The Bagalkot district plateau records its annual heat peak in the third and fourth week — the same Bayaluseeme rain-shadow belt that locks Hampi, Badami, and Bijapur in the same furnace window. The 120-temple village walks unworkable between 8:30am and 6pm — stone-surface temperatures at the Durga Temple, Lad Khan, and Meguti hilltop reach 50-52C by 1pm. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand across the open-air temple clusters and knocking visibility on the cluster-to-cluster photography routes. The Pulakeshi II inscription at Meguti (the eastern wall, 634 CE, the foundational Chalukya date marker) becomes hard to read in the dust haze. Ravan Phadi cave interior holds 28-30C cool but the route in is brutal. Village homestays drop to year-low ₹800-1,500; Badami base similarly ₹1,800-3k. Aihole is the most heat-vulnerable of the three Chalukya sites — Pattadakal and Badami have small canopies and cliff-shadow respectively, Aihole has neither. Skip. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 6, 2, 'wait',
  'SW monsoon light. 24-36C, 50-70mm rain. Heat eases but cluster walks still compressed. Push to Oct.',
  NULL,
  'June brings 4-5C ease as SW monsoon spillover reaches Malaprabha basin. Daytime 35-36C; the 120-temple cluster-walk still compressed to 6-10am and 5-7pm. Surrounding fields turn green from monsoon recharge. October is materially better.',
  'June in Aihole is the first ease month. Southwest monsoon spillover reaches the Malaprabha river basin (50-70mm across 5-7 wet days) — short late-afternoon thunderstorms drop daytime temperatures 4-5C from May''s peak. Daytime 35-36C, nights 24-25C, humidity climbing past 65 percent. The 120-temple village stops re-radiating to lethal stone temperatures but the cluster-to-cluster walking (Lad Khan to Durga to Meguti to Ravan Phadi) still compresses to 6-10am and 5-7pm. The surrounding wheat-and-jowar belt around Bagalkot district turns green from the monsoon recharge — the visual character of the open-air temple village changes materially from the dry-season ochre of February. Cave-interior coolness at Ravan Phadi at peak comfort. The Meguti hilltop climb 6:30-9am only. The Durga Temple pradakshina walk viable through evening. Village homestays remain off-peak ₹1,000-1,800; Badami base Krishna Heritage ₹2,500-3,500. The post-monsoon green that defines September-October Aihole has begun. Functional only for travelers with no flexibility. October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 7, 2, 'wait',
  'SW monsoon active. 23-32C, 80-110mm rain. Stone-surface walks slick. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon — 80-110mm across 9-11 wet days. Daytime 31-32C. Stone surfaces slick; wear grip footwear. Cluster walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Aihole is the SW monsoon at moderate intensity over the Malaprabha basin. Rainfall 80-110mm across 9-11 wet days — short violent afternoon thunderstorms. Daytime 31-32C, nights 23-24C, humidity 75 percent. The 120-temple village stones darken in the wet — the Chalukya sandstone shifts from dry-season ochre to a deeper iron-oxide red in monsoon. The Meguti hilltop climb (90 steps to the Jain temple) is slippery in heavy rain — better avoided on wet days. The Durga Temple apsidal walk holds shade in the pradakshina. Ravan Phadi cave interior cool and dry. The Pulakeshi II inscription readable through the wet though the moss patches that the monsoon brings can obscure parts of the wall — ASI cleans the inscription wall annually post-monsoon in October. Cluster-to-cluster walks (Lad Khan to Durga to Meguti to Ravan Phadi) viable 6:30-11am and 4-7pm between showers. Village homestays climb 15 percent off June lows ₹1,200-2,000; Badami base Krishna Heritage ₹2,800-4k. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 8, 3, 'wait',
  'Monsoon continues. 22-30C, 70-100mm rain. Green-field landscape. Stone walks AM/PM.',
  'August holds July''s rain pattern (70-100mm). Daytime 29-30C. Surrounding fields at year-greenest; the village-and-temple landscape at its post-monsoon visual character. Walks viable mornings and evenings.',
  'August works at 70 percent capacity. Daytime 29-30C, monsoon residue makes exterior walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner Chalukya-heritage shape.',
  'August in Aihole is the gradual climb-down from the monsoon. Rainfall 70-100mm across 9-11 wet days, daytime 29-30C, nights 22-23C, humidity 80 percent. The Malaprabha river runs at its annual maximum; the surrounding agricultural belt around the temple village turns green from monsoon recharge — the contrast between Chalukya sandstone temples and the green fields shows the year-best visual character before October-November dryness returns the ochre. Cluster walks viable 6:30am-11am and 4-7pm between showers. The Durga Temple apsidal walk in the colonnaded pradakshina holds shade; the Meguti hilltop climb manageable in dry windows. Ravan Phadi cave interior and inscription wall at standard accessibility. ASI cleans the Pulakeshi II Meguti inscription wall in October-November after the monsoon residue. Village homestays 30 percent below January peak ₹1,000-1,800; Badami base Krishna Heritage at ₹3-4k. The cleaner October window is the call if flexibility exists.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 9, 3, 'wait',
  'Monsoon retreating. 21-29C, 50-70mm rain. Green fields peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 50-70mm. Post-monsoon green peaks late month. Last off-peak window before the proper season opens.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 28-29C; afternoon thunderstorms still break cluster walks. Push to mid-October for the proper clean weather window.',
  'September in Aihole is the bridge month before the proper season opens. Rainfall drops to 50-70mm across 7-9 wet days — second-half is materially drier. Daytime 28-29C, nights 21-22C, humidity easing from 80 to 70 percent. The post-monsoon green peaks in the last 10 days; the Bagalkot agricultural belt around the 120-temple village shows year-greenest fields against the Chalukya sandstone, a visual contrast that dries to ochre by November. Cluster walks at improving comfort — Lad Khan, Durga, Meguti, Ravan Phadi. The Pulakeshi II inscription at Meguti benefits from the ASI annual post-monsoon clean (typically done late September). Ravan Phadi cave dancing Shiva and Saptamatrika panel walk clean. The Hucchimalligudi cluster (the smaller temples adjacent to Durga) at peak photography light. Village homestays 25 percent below January peak ₹1,200-2,000; Badami base Krishna Heritage at ₹3-4.5k. The October 15 window is the proper clean call; September offers value pricing and greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 10, 4, 'go',
  'Season opens. 19-30C, 30-50mm rain. Green-field landscape. Cluster walks return mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean Chalukya-experimental-architecture walking. Green fields around temples still hold.',
  NULL,
  'October in Aihole is the proper return to the Chalukya circuit. Southwest monsoon withdraws from interior Karnataka around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean weather. Daytime 29-30C, nights 19-21C, humidity falling from 70 to 60 percent. The post-monsoon green fields around the 120-temple village still hold through October — visual sweet spot for the Chalukya-sandstone-and-green-field landscape. Lad Khan (the square-plan earliest, 5-6c CE) at 9am morning light. Durga Temple apsidal-plan with outer wall deity panels (Mahishasura Mardini, Narasimha, Shiva-Tripurari, Harihara) at year-best detail. Meguti hilltop climb to the Jain temple at year-best traction; the 634 CE Pulakeshi II inscription on the eastern wall at clean readability. Ravan Phadi cave dancing Shiva and Saptamatrika panel at standard schedule. Day-trip from Badami 35km northwest + Pattadakal 13km southwest as the Chalukya three-site axis. Village homestays 25-30 percent below January peak ₹1,300-2,200; Badami base Krishna Heritage ₹3.5-5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Stone-detail photography year-best air.',
  'November is the pivot to peak. Rainfall under 20mm, daytime 26-28C, full Chalukya-experimental-architecture walking. Karnataka Rajyotsava Nov 1 brings Bagalkot district programming.',
  NULL,
  'November in Aihole is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 26-28C, nights 17-19C, humidity dropping below 60 percent. Air visibility at its annual cleanest. The 120-temple village walks cleanly through the afternoon — Lad Khan, Durga, Meguti, Hucchimalli, Suryanarayana, Galaganatha, Ravan Phadi cave — all at year-best photographic light. The Durga Temple apsidal-plan structure with the colonnaded outer wall (Mahishasura Mardini in mid-strike, Narasimha tearing Hiranyakashipu, Shiva-as-Tripurari, Harihara) holds detail in 9-11am oblique light. The Meguti Jain Temple hilltop (90 steps, 10-15 min climb) at year-best comfort; the 634 CE Pulakeshi II inscription on the eastern wall clean readability after ASI''s September-October post-monsoon clean. Ravan Phadi cave dancing Shiva and the Saptamatrika panel at clear visibility. Karnataka Rajyotsava (November 1, state formation day) brings cultural programming at the Bagalkot district headquarters 35km southwest. Village homestays climb to 75 percent of January peak ₹1,500-2,500; Badami base Krishna Heritage ₹4-5.5k, Mookambika ₹2,500-4k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aihole', 12, 5, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE moderate spike. Stone-detail at year-cleanest air.',
  'December is operational peak. Daytime 25-27C, nights 14-15C, year-cleanest air visibility. The 120-temple cluster walks at year-best. Christmas-NYE 1.5-2x rates at Badami base.',
  NULL,
  'December in Aihole is the operational peak. Daytime 25-27C, nights drop to 14-15C, humidity 50 percent, rainfall under 10mm. Air visibility at annual best — the Chalukya sandstone of Lad Khan, Durga, Meguti, and the smaller clusters shows year-cleanest contrast against the dry-season clear blue sky. The 120-temple village walks comfortably from sunrise through 5pm close — the Meguti hilltop climb, the Durga pradakshina, the Lad Khan square-plan study, the Ravan Phadi cave dancing Shiva, the Suryanarayana cluster — all at year-cleanest photographic light. The Pulakeshi II 634 CE inscription on the Meguti eastern wall at peak readability after the post-monsoon clean. Stone-surface temperatures comfortable through the day. The standard three-day Chalukya axis (Badami day 1, Aihole day 2, Pattadakal day 3) runs at peak comfort. Christmas-NYE corridor (December 22 to January 5) sees moderate rate lift at Badami base (1.5-2x normal): Krishna Heritage at ₹5-7k Christmas-NYE, Mookambika ₹3-4.5k, KSTDC Mayura Chalukya ₹2,500-3,500, Badami Court ₹3-4.5k. Aihole village homestays ₹1,800-2,800. Lock 4-6 weeks ahead from October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
