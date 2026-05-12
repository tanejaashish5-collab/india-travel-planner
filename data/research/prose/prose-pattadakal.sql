-- Pattadakal destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: pattadakal | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 1, 5, 'go',
  'Peak UNESCO Chalukya window. 15-29C, dry. Virupaksha 740 CE and 10 temples at year-cleanest light.',
  'January is the best stretch for the UNESCO Chalukya royal-coronation complex. 10 temples 7-8c CE — Virupaksha (740 CE, Queen Lokamahadevi''s Pallava-victory commemoration), Mallikarjuna, Sangameshwara, Kashi Vishwanatha — at peak photography light. Pattadakal Dance Festival mid-Jan to mid-Feb.',
  NULL,
  'Pattadakal in January is the proper UNESCO Chalukya stretch. Daytime 27-29C, nights 15-16C, humidity 50 percent, rainfall under 10mm. The Group of Monuments at Pattadakal (UNESCO 1987) holds 10 major temples built 7-8th c CE on the Malaprabha river — the royal coronation site for the Western Chalukyas. Virupaksha Temple (740 CE — built by Queen Lokamahadevi to celebrate Vikramaditya II''s victory over the Pallavas at Kanchipuram 731 CE, design directly modeled on Kailasanatha Kanchipuram) — the four-faced shikhara, the 16-foot monolithic Nandi, carved entrance jambs with Ramayana-Mahabharata frieze panels. Mallikarjuna (744 CE, Queen Trailokyamahadevi, identical plan slightly smaller). Sangameshwara (Vijayaditya 696-733 CE — the oldest, austere Dravida). Kashi Vishwanatha (Nagara curvilinear shikhara — Pattadakal is the only Chalukya site where Dravida and Nagara stand side by side). Papanatha (Nagara, 8th c CE — Ramayana panels). ASI ticket ₹40, 9am-5:30pm. Pattadakal Dance Festival (Karnataka Tourism classical-dance event, mid-January to mid-February) runs typically late January. Aihole 13km northeast, Badami 22km northwest — standard three-day axis.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 2, 5, 'go',
  'Driest month. 17-32C. Pattadakal Dance Festival typically peaks early Feb. Virupaksha photography year-best.',
  'February holds the technical peak with rainfall under 5mm. The Pattadakal Dance Festival (Karnataka Tourism classical-dance event at the Virupaksha temple precinct) typically runs late January to early February. Standard 3-day Chalukya axis at peak comfort.',
  NULL,
  'February in Pattadakal is the year''s cleanest photography window for the UNESCO Chalukya complex. Rainfall under 5mm, daytime 30-32C, nights 17-18C, humidity 45 percent. The 10-temple complex on the Malaprabha river — Virupaksha (740 CE), Mallikarjuna, Sangameshwara, Kashi Vishwanatha, Galaganatha, Papanatha — shows year-best stone-detail clarity. The Pattadakal Dance Festival (typically last week of January to second week of February) brings Bharatanatyam, Kathak, Odissi, Kuchipudi performances to a stage in front of the Virupaksha precinct. Performances 6:30-9:30pm; entry free, VIP tickets ₹500-1,500. The Virupaksha shikhara (Dravida four-faced, the Kanchipuram Pallava influence in receding tiers), the 16-foot monolithic Nandi, the carved Ramayana-Mahabharata entrance friezes — all at year-best 9-11am morning light. The Papanatha Nagara shikhara (100m from the Dravida Virupaksha) makes Pattadakal the only Chalukya site to display both traditions side by side. ASI ticket ₹40 covers all 10 temples plus the Pattadakal Museum. Base at Badami 22km northwest: Krishna Heritage ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 3, 4, 'go',
  'Last cool month. 19-35C. Open-air complex walks compress past 11am. Rates ease 25 percent.',
  'March extends the February window with heat building late month. The 10-temple complex sits on open ground with limited shade; walking compresses to 6:30-10am and 4-6pm. Hotel rates at Badami base ease 25 percent.',
  NULL,
  'March in Pattadakal is the soft-landing month before the heat dome opens. Daytime 32-35C, nights 19-21C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The 10-temple UNESCO complex sits on an open Malaprabha river-bank plain with limited shade — temples spread across approximately 8 hectares with no canopy between Virupaksha, Mallikarjuna, Sangameshwara, and Papanatha clusters. Walking compresses to 6:30am-10am and 4-6pm. The Virupaksha Dravida four-faced shikhara casts west-side shadow till 9am — 7-9am is the photography peak. The Papanatha Ramayana frieze panels (the standout narrative carving on the Nagara-style 8th c CE temple) at 8-10am clean light. Stone-surface temperatures rise from 35C dawn to 42C by noon. The Pattadakal Museum (small ASI gallery near the entrance, AC-cool) functions as mid-day refuge. Aihole 13km northeast + Badami 22km northwest day-trip axis viable as full-day with mid-day museum break. Hotels at Badami ease 25 percent: Krishna Heritage ₹3-4.5k, Mookambika ₹2-3k, KSTDC ₹1,500-2,500. Last clean-value window before April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 4, 1, 'skip',
  'Heat dome opens. 23-41C. Open-air 10-temple complex unworkable mid-day. Skip strict.',
  NULL,
  'April pushes Pattadakal into the strict-skip stretch. Northern Karnataka plateau hits 40-41C; the 10-temple complex sits on open ground with no shade. Stone-surface 48-50C by 1pm. Inter-temple walks heat-stroke territory noon-5pm. Push to October.',
  'April in Pattadakal is the start of the strict-skip stretch. Daytime 39-41C, nights 23-25C, humidity 35 percent — Northern Karnataka plateau at peak heat. The UNESCO 10-temple complex sits on the Malaprabha river-bank open plain with no continuous shade — inter-temple walks (Virupaksha to Mallikarjuna 50m, then 400m east to Papanatha and Galaganatha) are heat-stroke territory 10am-5pm. Stone-surface at the Virupaksha shikhara, the 16-foot Nandi, the Papanatha Ramayana frieze reach 48-50C by 1pm. Temple-interior coolness at Virupaksha and Mallikarjuna mandapas provides refuge but the route between defeats the trip. The Malaprabha river at annual low. Pattadakal Museum AC-cool but small. Hotel base at Badami at year-low rates but the Pattadakal leg unworkable. The standard three-day Chalukya axis — Badami with cliff-shadow refuge, Aihole heat-locked, Pattadakal with no shade at all — Pattadakal is the most heat-vulnerable of the three. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 5, 1, 'skip',
  'Heat peak. 25-43C. Stone surface 52C. Pre-monsoon dust knocks photography routes. Skip strict.',
  NULL,
  'May is harshest month at Pattadakal. Daytime 41-43C, stone surface 50-52C. Pre-monsoon dust storms hit last fortnight blowing fine red sand across the open temple complex. Hotel occupancy under 20 percent. Push to October.',
  'May in Pattadakal is the heat dome at peak intensity. Daytime 41-43C, nights 25-27C, humidity 35 percent, rainfall under 25mm. The Bagalkot district plateau records its annual heat peak in the third and fourth week — the Bayaluseeme rain-shadow belt that locks Hampi, Badami, Aihole, and Bijapur in the same furnace window. The UNESCO 10-temple complex on the open Malaprabha river-bank plain has zero shade — stone-surface at Virupaksha, Mallikarjuna, Papanatha reach 50-52C by 1pm. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand and knocking visibility on the dome photography routes. The Malaprabha river at annual low. Temple-interior coolness at Virupaksha mandapa holds 32-34C but the route between defeats the day. The 6:30-8:30am window is the only workable stretch. Pattadakal Museum AC-cool. Hotels at Badami base year-low: Krishna Heritage ₹1,800-3k. Pattadakal is the most heat-vulnerable of the three Chalukya UNESCO sites. Skip. October-February dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 6, 2, 'wait',
  'SW monsoon light. 24-36C, 50-70mm rain. Heat eases but inter-temple walks still compressed. Push to Oct.',
  NULL,
  'June brings 4-5C ease as SW monsoon spillover reaches Malaprabha basin (50-70mm). Daytime 35-36C; inter-temple walks 6-10am and 5-7pm only. Surrounding fields turn green. October materially better.',
  'June in Pattadakal is the first ease month. Southwest monsoon spillover reaches the Malaprabha river basin (50-70mm across 5-7 wet days) — short late-afternoon thunderstorms drop daytime temperatures 4-5C from May. Daytime 35-36C, nights 24-25C, humidity 65 percent. The stone-surface temperatures at the 10-temple complex stop reaching lethal levels but the open-plain inter-temple walks (Virupaksha to Mallikarjuna to Sangameshwara to Papanatha to Galaganatha) still compress to 6-10am and 5-7pm. The Malaprabha river starts to refill from monsoon recharge. The surrounding wheat-and-jowar belt around the temple complex turns green — the visual character of the UNESCO site changes materially from the dry-season ochre of February. Temple-interior coolness at Virupaksha and Mallikarjuna mandapas at peak comfort. The Papanatha Ramayana frieze panels best viewed 7-9am. Hotel base at Badami remains off-peak: Krishna Heritage ₹2,500-3,500, Mookambika ₹1,500-2,500, KSTDC ₹1,200-2,000. The post-monsoon green that defines September-October Pattadakal has begun. Functional only for travelers with no flexibility. October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 7, 2, 'wait',
  'SW monsoon active. 23-32C, 80-110mm rain. Open plain rain-interrupted. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon — 80-110mm across 9-11 wet days. Daytime 31-32C. The open 10-temple plain rain-interrupted afternoons. Cluster walks workable mornings and evenings between showers. October-February still dramatically cleaner.',
  'July in Pattadakal is the SW monsoon at moderate intensity. Rainfall 80-110mm across 9-11 wet days — short violent afternoon thunderstorms drop daytime temperatures to 31-32C, nights 23-24C, humidity 75 percent. The 10-temple complex stones darken in the wet; the Chalukya sandstone shifts from dry-season ochre to deeper iron-oxide red. The Malaprabha river runs at strong monsoon flow; the river-bank lower walk (the long ghat south of Virupaksha) becomes scenic. The open-plain inter-temple walks rain-interrupted in afternoons — viable 6:30am-11am and 4-7pm between showers. Stone-surface mid-day walks slippery — wear grip footwear. The Virupaksha mandapa, Mallikarjuna entrance jambs, Papanatha Ramayana panels all viable through morning. The Pattadakal Museum AC-cool refuge for monsoon-interrupted mid-days. Hotels at Badami base climb 15 percent off June lows but remain off-peak: Krishna Heritage ₹2,800-4k, Mookambika ₹1,500-2,500, KSTDC ₹1,500-2,500. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 8, 3, 'wait',
  'Monsoon continues. 22-30C, 70-100mm rain. Green-plain landscape. Stone walks AM/PM.',
  'August holds July''s rain pattern (70-100mm). Daytime 29-30C. Malaprabha river and surrounding fields at peak green; the UNESCO complex landscape at year-best post-monsoon visual character. Walks viable mornings and evenings.',
  'August works at 70 percent capacity. Daytime 29-30C, monsoon residue makes exterior walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner UNESCO-heritage shape.',
  'August in Pattadakal is the gradual climb-down from the monsoon. Rainfall 70-100mm across 9-11 wet days, daytime 29-30C, nights 22-23C, humidity 80 percent. The Malaprabha river runs at peak monsoon flow; the river-bank lower walk south of Virupaksha at scenic year-best. The surrounding agricultural belt at year-greenest fields against the Chalukya sandstone temples — the contrast between the 10-temple UNESCO complex and green fields shows the best visual character of the year, lost by November as fields dry to ochre. Inter-temple walks viable 6:30am-11am and 4-7pm between showers. The Papanatha Ramayana frieze panels (the standout narrative carving on the Nagara-style 8th c CE temple, the panels depict Rama-Lakshmana-Sita scenes and Hanuman crossing-the-sea) at clean morning light. Stone-surface slippery in wet — grip footwear recommended. Hotel base at Badami 30 percent below January peak: Krishna Heritage ₹3-4k, Mookambika ₹1,500-2,500, KSTDC ₹1,500-2,500, Badami Court ₹1,800-3k. The cleaner October window is the call if flexibility exists.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 9, 3, 'wait',
  'Monsoon retreating. 21-29C, 50-70mm rain. Green-field landscape peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 50-70mm. Post-monsoon green at year-peak late month. Last off-peak window before season opens.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 28-29C; afternoon thunderstorms still break inter-temple walks. Push to mid-October for proper clean weather window.',
  'September in Pattadakal is the bridge month before the proper season opens. Rainfall drops to 50-70mm across 7-9 wet days — second-half is materially drier. Daytime 28-29C, nights 21-22C, humidity easing from 80 to 70 percent. The post-monsoon green peaks in the last 10 days; the open Malaprabha river-bank plain around the 10-temple complex shows year-greenest fields against the Chalukya sandstone, a visual contrast that dries to ochre by November. The Virupaksha morning shadow, the Papanatha Ramayana frieze panels, the Mallikarjuna entrance jambs walk cleanly. The Sangameshwara austere Dravida walk (the oldest of the 10, Vijayaditya 696-733 CE) at peak comfort. The Kashi Vishwanatha Nagara shikhara (the curvilinear north-Indian style adjacent to Mallikarjuna — Pattadakal''s unique side-by-side Dravida-Nagara expression) at clean morning light. The Pattadakal Museum reopens at standard hours. Hotels at Badami base 25 percent below January peak: Krishna Heritage at ₹3-4.5k, Mookambika ₹2-3k. October 15 window is the proper clean call; September offers value pricing and greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 10, 4, 'go',
  'Season opens. 19-30C, 30-50mm rain. Green-plain landscape. UNESCO walks return mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean UNESCO Chalukya walking. Green plain around the complex still holds. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Pattadakal is the proper return to the UNESCO Chalukya circuit. Southwest monsoon withdraws from interior Karnataka around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean weather. Daytime 29-30C, nights 19-21C, humidity falling from 70 to 60 percent. The post-monsoon green plain around the 10-temple complex still holds through October before drying to winter ochre — visual sweet spot for the Chalukya-sandstone-and-green-plain landscape. Virupaksha (740 CE, the Vikramaditya II Pallava-victory commemoration, modeled on Kanchipuram''s Kailasanatha) at 9am morning light. Mallikarjuna (Queen Trailokyamahadevi, 744 CE, identical plan slightly smaller). Sangameshwara (Vijayaditya 696-733 CE, the austere oldest of the 10). Kashi Vishwanatha Nagara shikhara and Papanatha Ramayana panels — all walk comfortably through the afternoon. The 16-foot monolithic Nandi in the Virupaksha mandapa at year-best photographic comfort. The standard three-day Chalukya axis (Badami day 1, Aihole day 2, Pattadakal day 3) runs cleanly. Hotels at Badami 25-30 percent below January peak: Krishna Heritage ₹3.5-5k, Mookambika ₹2-3k, KSTDC ₹1,500-2,500. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. UNESCO-photography year-best air visibility.',
  'November is the proper pivot to peak. Rainfall under 20mm, full UNESCO Chalukya walking, Karnataka Rajyotsava Nov 1 brings Bagalkot district programming. Air visibility at year-best for the sandstone-and-sky photography.',
  NULL,
  'November in Pattadakal is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 26-28C, nights 17-19C, humidity dropping below 60 percent. Air visibility at its annual cleanest. The 10-temple UNESCO complex on the Malaprabha river-bank plain — Virupaksha, Mallikarjuna, Sangameshwara, Kashi Vishwanatha, Galaganatha, Kadasiddheswara, Jambulingeswara, Papanatha, Chandrashekhara, and the Jain Narayana — walks cleanly through the afternoon. The Dravida-Nagara side-by-side architectural expression (Virupaksha Dravida four-faced shikhara next to Kashi Vishwanatha Nagara curvilinear shikhara) shows year-best stone-detail contrast. The Papanatha Ramayana frieze panels at year-cleanest readability. The 16-foot monolithic Nandi in the Virupaksha mandapa, the carved entrance jambs (Ramayana-Mahabharata friezes), the lion-pillar bracket figures — all at year-best 9-11am oblique morning light. Karnataka Rajyotsava (November 1, state formation day) cultural programming at Bagalkot district HQ 35km southwest. Hotels at Badami base climb to 75 percent of January peak: Krishna Heritage ₹4-5.5k, Mookambika ₹2,500-4k, KSTDC ₹1,800-3k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('pattadakal', 12, 5, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE moderate rate spike. UNESCO at year-cleanest air.',
  'December is operational peak. Daytime 25-27C, nights 14-15C, year-cleanest air visibility. UNESCO Chalukya 10-temple complex at year-best. Christmas-NYE 1.5-2x rates at Badami base.',
  NULL,
  'December in Pattadakal is the operational peak. Daytime 25-27C, nights drop to 14-15C, humidity 50 percent, rainfall under 10mm. Air visibility at annual best — the Chalukya sandstone of the 10-temple UNESCO complex shows year-cleanest contrast against the dry-season clear blue sky. The complex walks comfortably from 9am opening through 5:30pm close. Virupaksha (740 CE, Queen Lokamahadevi''s Pallava-victory commemoration with the Kanchipuram Kailasanatha design model) at full clean photographic light. The 16-foot monolithic Nandi catches dawn glow first in the open mandapa. Mallikarjuna (Queen Trailokyamahadevi 744 CE) adjacent. The Papanatha Ramayana frieze panels — Rama-Lakshmana-Sita scenes, Hanuman crossing the sea — at year-best 8-10am readability. Sangameshwara (Vijayaditya 696-733 CE, the oldest austere Dravida) walks. Kashi Vishwanatha Nagara shikhara — Pattadakal''s defining side-by-side Dravida-Nagara expression. The standard three-day Chalukya axis runs at peak comfort. Christmas-NYE corridor (December 22 to January 5) sees moderate rate lift at Badami base: Krishna Heritage ₹5-7k, Mookambika ₹3-4.5k, KSTDC ₹2,500-3,500. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
