-- Coimbatore destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: coimbatore

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 1, 5, 'go',
  'Peak Coimbatore window. 19-30C. Adiyogi (Isha, 30km) at clearest visibility. Marudhamalai, Perur Pateeswarar, Velliangiri all accessible.',
  'January is the cleanest weather window at Coimbatore. Daytime 27-30C, nights 19-22C. Adiyogi statue (Isha Foundation, Velliangiri foothills, 30km, 6:30am-9:30pm, free) at year-clearest visibility. Marudhamalai Temple (15km), Perur Pateeswarar all at full operations.',
  NULL,
  'Coimbatore in January is the clean window for the Nilgiri gateway and Adiyogi pilgrimage. Population 1.8 million, India''s 17th-largest urban agglomeration, the textile and engineering hub of western Tamil Nadu, but the visitor draw concentrates outside the city core. Daytime 27-30C, nights 19-22C, rainfall under 25mm. The Adiyogi statue — the 112-foot Guinness-record largest bust of Shiva, installed 2017 at the Isha Yoga Center, Velliangiri foothills, 30km west of the city — is the year-best photographed structure in Tamil Nadu outside the temple-tower set, free entry to the public viewing area 6:30am-9:30pm, the Adiyogi Aalayam meditation hall and the Dhyanalinga temple complex add 90 minutes. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m on Marudhamalai Hill, 7am-8pm) — second most visited Murugan temple in TN after Palani. Perur Pateeswarar Temple (10km, the 1000-year-old Chola-era Shiva temple) and the older Perur shrine. VOC Park (city centre, the 1936-built park with toy train), Gass Forest Museum (12km, the 1902-built Tamil Nadu Forest Department museum with 250+ tropical wood specimens, ₹50, closed Sun).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 2, 5, 'go',
  'Cool-dry. 20-32C. Mahashivaratri at Isha (Feb-Mar) — Sadhguru overnight celebration. Adiyogi at peak.',
  'February holds clean Coimbatore weather. Maha Shivaratri week (typically late Feb-early Mar) brings the Isha Foundation overnight celebration — Sadhguru-led, 8 lakh+ attendees, globally livestreamed. Adiyogi statue at peak visitor visibility.',
  NULL,
  'Coimbatore in February holds the clean weather window with the bonus of Maha Shivaratri timing some years. Daytime 28-32C, nights 20-23C, humidity 60-65 percent, rainfall under 20mm. Maha Shivaratri at the Isha Yoga Center (the 12-hour overnight celebration on the eve of Maha Shivaratri, typically late February or early March depending on the Hindu calendar — 2026 falls on Feb 15) — Sadhguru-led, the Adiyogi Aalayam meditation hall and the Mahasamadhi precinct host 8-10 lakh attendees in person plus globally livestreamed audience, traffic from Pollachi via NH948 and from Coimbatore city queues 15-25km on the night. The Velliangiri 7-peak trek peaks at this period as pilgrims combine the trek (year-round, 7-hour up + 5 down, no booking) with the Maha Shivaratri overnight at the Isha Center. Adiyogi statue (112-foot Guinness-record Shiva bust, installed 2017, 6:30am-9:30pm free) at year-busiest visitor visibility. Marudhamalai Temple (15km, the 12th-century Subrahmanya temple at 500m) at light visitor load until Mar 2-day Mahashivaratri overlap.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 3, 4, 'go',
  'Late winter. 21-34C. Adiyogi at year-busiest if Maha Shivaratri falls in March. Heat building.',
  'March holds Coimbatore at the upper edge of comfortable. Maha Shivaratri sometimes falls in early March (depending on lunar calendar). Heat starts building in last fortnight. Last clean month before April-May plains heat dome.',
  NULL,
  'Coimbatore in March is the transition month at the upper edge of comfortable weather. Daytime 30-34C, nights 21-24C, humidity climbing toward 65 percent in the last fortnight, rainfall under 30mm. Some years Maha Shivaratri falls in early March (2027 falls on Mar 7) — the Isha Yoga Center hosts the same 8-10 lakh attendee overnight celebration at the Adiyogi Aalayam meditation hall, traffic congestion from Coimbatore city to the Velliangiri foothills 30km west queues 15-25km on the night. Adiyogi statue (112-foot Guinness-record Shiva bust, installed 2017, 6:30am-9:30pm free) workable mornings before mid-day heat. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m on Marudhamalai Hill, 7am-8pm) workable but the temple-elevation 500m provides 3-4C relief over city. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva), VOC Park, Gass Forest Museum (12km, 1902 Forest Dept, ₹50, closed Sun) at full operations. Velliangiri 7-peak trek (1840m sacred peak, 7-hour up + 5 down) workable but start by 5am to descend before mid-day heat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 4, 2, 'wait',
  'Plains heat dome. 23-38C. Daytime brutal, evening operations only. Use as Nilgiri gateway only.',
  NULL,
  'April brings plains heat to Coimbatore — 23-38C with humidity climbing. Sightseeing outdoors compresses to 6-10am and 6-9pm windows only. Adiyogi and Marudhamalai workable dawn-only. Use city as a 12-hour gateway to Ooty/Coonoor/Valparai if season demands.',
  'Coimbatore in April is when the western Tamil Nadu plains heat dome arrives. Daytime 32-38C, nights 23-26C, humidity climbing past 70 percent, pre-monsoon rainfall 60-100mm in the last 10 days as afternoon thundershowers. Outdoor sightseeing compresses to 6-10am and 6-9pm windows only. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) workable at dawn or after 6pm — the open-air viewing area becomes uncomfortable in mid-day sun. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m — the 500m elevation provides 3-4C relief but still hot). Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva), VOC Park (closed mid-day Apr-May), Gass Forest Museum (12km, 1902 Forest Dept, ₹50, closed Sun) at reduced visitor hours. Velliangiri 7-peak trek (1840m sacred peak, 7-hour up + 5 down) — only attempt with 4am start; sun stroke risk after 10am. Most Coimbatore visitors in April use the city as a 12-hour gateway to Ooty (90km via NH181 Mettupalayam), Coonoor (70km), Valparai (100km via NH183), or Kodaikanal (175km via Pollachi) — the Nilgiri hill stations are at year-best in May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 5, 2, 'wait',
  'Peak heat. 24-39C. Pre-monsoon. Sightseeing compressed to dawn-only.',
  NULL,
  'May is the peak plains-heat dome at Coimbatore — 24-39C with humidity past 75 percent. Outdoor sightseeing compresses to 6-9am window only. Adiyogi and Marudhamalai dawn-only. Use city as gateway to Ooty/Coonoor/Valparai peak summer-migration window.',
  'Coimbatore in May is the peak plains heat dome window. Daytime 33-39C, nights 24-27C, humidity past 75 percent, rainfall climbing to 100-150mm with afternoon thundershowers from May 20 onward. Outdoor sightseeing compresses to 6-9am window only. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) workable at dawn — the open-air viewing area becomes dangerous in mid-day heat. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) workable in early-morning slot only — the 500m elevation provides 3-4C relief but afternoon heat still 35-37C at the temple. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva, 6am-12pm and 4-9pm) close mid-day in summer. VOC Park, Gass Forest Museum (12km, ₹50, closed Sun) at reduced hours. Velliangiri 7-peak trek (1840m sacred peak, 7-hour up + 5 down) — heat stroke risk after 9am, only attempt with 4am start, recovery support required. Most Coimbatore visitors in May use the city as gateway to Ooty (90km, summer-migration peak), Coonoor (70km), Valparai (100km), Kodaikanal (175km).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 6, 3, 'wait',
  'SW monsoon residual. 23-32C, 50-100mm rainfall. Rain-shadow city — relief vs hill stations but still hot.',
  'June brings the SW monsoon to the Western Ghats Nilgiri/Anamalai face but Coimbatore sits in the rain-shadow. 50-100mm rainfall, 23-32C. Better than May plains-heat but still hot. Push to October-March for outdoor itinerary.',
  'June brings the SW monsoon to the Western Ghats but Coimbatore sits in the rain-shadow — 50-100mm rainfall, 23-32C. Still hot for outdoor sightseeing but relief versus April-May. Adiyogi workable in morning and evening windows. Push to October-March for proper Coimbatore visits.',
  'Coimbatore in June brings the SW monsoon arrival to the Western Ghats but Coimbatore at the foothills sits in the partial rain-shadow of the Anamalai western face. Rainfall 50-100mm across 8-12 wet days at the 411m city elevation; the city stays drier than the western hill stations (Valparai 400-600mm at 1193m, Ooty 200-300mm at 2240m) but humidity climbs to 80 percent. Daytime 28-32C, nights 23-26C. Outdoor sightseeing workable in 6-10am and 5-9pm windows. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) at improving visitor experience — the dawn or post-storm late-afternoon visits cleanest. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) workable at improving comfort. Perur Pateeswarar Temple (10km), VOC Park, Gass Forest Museum (12km, ₹50, closed Sun) at near-full hours. Velliangiri 7-peak trek (1840m) — wet trails, leech-prone in monsoon, only attempt with caution. The Nilgiri gateway role compresses: NH181 Coimbatore-Ooty (90km via Mettupalayam, 14 hairpins) closes 1-2 days per week through June for landslide clearance.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 7, 3, 'wait',
  'SW monsoon rain-shadow. 23-31C, 80-150mm rainfall. Better than May but the Nilgiri gateway role compresses (NH181, NH183 closures).',
  'July holds SW monsoon for the Western Ghats hill stations but Coimbatore at 411m stays drier — 80-150mm. City sightseeing workable; Nilgiri-bound traffic disrupted by NH181/NH183 closures. Push to October-March for outdoor itinerary.',
  'July is the SW monsoon peak at the Western Ghats but Coimbatore at 411m stays in the rain-shadow — 80-150mm rainfall vs Valparai 700-1000mm. City sightseeing remains workable in 6-10am and 5-9pm windows. The Nilgiri gateway role compresses badly: NH181 Coimbatore-Ooty closures 2-3 days/week, NH183 Pollachi-Valparai 3-4 days/week. Push to October-March.',
  'Coimbatore in July sits in the rain-shadow of the Western Ghats SW monsoon — 80-150mm rainfall at the 411m city elevation across 12-16 wet days, while the hill stations 90-100km west catch 700-1200mm. Daytime 27-31C, nights 23-26C, humidity 85 percent. City outdoor sightseeing remains workable in 6-10am and 5-9pm windows on dry days. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) workable mornings and post-storm evenings. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) at improving cooler-monsoon comfort. Perur Pateeswarar Temple (10km), VOC Park, Gass Forest Museum (12km, ₹50, closed Sun) at near-full operations. Velliangiri 7-peak trek (1840m) — leech-prone, slippery, only attempt with caution. The Nilgiri gateway role compresses badly: NH181 Coimbatore-Ooty (90km via Mettupalayam, 14 hairpins) closes 2-3 days per week under TN PWD landslide-clearance schedules. NH183 Pollachi-Valparai 40-hairpin closures 3-4 days per week. Pollachi-Kodaikanal (210km via Theni) the most reliable hill-station route from Coimbatore in July.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 8, 3, 'wait',
  'SW monsoon tails. 23-31C, 60-120mm rainfall. City sightseeing workable; Nilgiri gateway role still compressed.',
  NULL,
  'August holds the SW monsoon tail at Coimbatore — 60-120mm rainfall. City sightseeing workable, hill-station-bound traffic still compressed by NH181/NH183 closures. Push to October-March.',
  'Coimbatore in August holds the SW monsoon tail at the rain-shadow city elevation. Rainfall 60-120mm at 411m across 10-14 wet days, while the western hill stations 90-100km west catch 400-700mm. Daytime 27-31C, nights 23-26C, humidity 85 percent. City outdoor sightseeing remains workable. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) at light visitor load. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m) workable. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva), VOC Park, Gass Forest Museum (12km, ₹50, closed Sun) at near-full operations. Velliangiri 7-peak trek (1840m) — wet trails continue. The Nilgiri gateway role still compressed: NH181 Coimbatore-Ooty closures 1-2 days per week, NH183 Pollachi-Valparai 2-3 days per week. Independence Day (Aug 15) brings a 3-day weekend bump in domestic travel. Hotels: business district at ₹4-7k, mid-bracket ₹2,000-3,500. Coimbatore airport (CJB, 12km) at lower Ooty-bound traffic given the road risks. Push to October-March for the city''s actual Adiyogi-Velliangiri itinerary window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 9, 4, 'go',
  'SW monsoon retreats. 22-31C, 80-150mm rainfall. NH181/NH183 stabilising. Outdoor itinerary returns.',
  'September is the recovery month. SW monsoon retreats by week three, NH181 and NH183 stabilise, Nilgiri/Anamalai gateway role returns. Adiyogi at full operations. Outdoor sightseeing returns to full hours.',
  NULL,
  'Coimbatore in September is the soft re-opening for the Nilgiri gateway. Rainfall 80-150mm across 10-13 wet days, mostly the first fortnight as the SW monsoon retreats from the Western Ghats. Daytime 27-31C, nights 22-25C, humidity easing toward 75 percent. NH181 Coimbatore-Ooty (90km via Mettupalayam, 14 hairpins) and NH183 Pollachi-Valparai 40-hairpin both stabilise — closure events drop from 2-3 per week to under 1 per week from Sep 20. The Nilgiri-Anamalai gateway role returns to full demand. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) at full operations and light visitor load. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) at full operations. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva), VOC Park, Gass Forest Museum (12km, 1902 Forest Dept, ₹50, closed Sun) at full visitor hours. Velliangiri 7-peak trek (1840m sacred peak, 7-hour up + 5 down) returns to year-round patterns. Hotels return to normal: business district at ₹4-8k, mid-bracket ₹2,500-4,500. Coimbatore airport (CJB, 12km) at returning Ooty-bound traffic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 10, 5, 'go',
  'Year-best window returns. 21-30C, 100-180mm rainfall residual. Adiyogi clearest. NE monsoon residual evenings.',
  'October is the proper season opener at Coimbatore. Full operations resume, NE monsoon residual brings evening showers but daytime clear. Adiyogi at full operations. Nilgiri gateway role at peak demand.',
  NULL,
  'Coimbatore in October is when the western Tamil Nadu gateway city hits full operations. Daytime 27-30C, nights 21-24C, rainfall 100-180mm split across SW retreat (first 10 days) and NE monsoon arrival (last 10 days), humidity dropping toward 70 percent. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) at full operations — the Dhyanalinga temple complex and Adiyogi Aalayam meditation hall accessible. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) at full visitor pattern. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva), VOC Park, Gass Forest Museum (12km, 1902 Forest Dept, ₹50, closed Sun) at full hours. Velliangiri 7-peak trek (1840m sacred peak, 7-hour up + 5 down) at full operations — the post-monsoon green flush on the trail at year-photogenic. The Nilgiri gateway role at peak demand: NH181 Coimbatore-Ooty (90km via Mettupalayam, 14 hairpins) and NH183 Pollachi-Valparai 40-hairpin both stable. NE monsoon brings 1-2 hour evening downpours typical 4-7pm but daytime mostly clear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 11, 5, 'go',
  'Cool-dry. 20-29C. Adiyogi at year-cleanest. Karthigai Deepam Dec 4. Rates climb 20 percent.',
  'November is the year-best window at Coimbatore. NE monsoon residual under 80mm, Adiyogi visibility cleanest, all sites at full operations. Hotel rates climb 20 percent as Christmas-week traffic begins booking.',
  NULL,
  'Coimbatore in November is when the western TN gateway city hits its cleanest year. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first 10 days. Daytime 26-29C, nights 20-23C, humidity dropping under 70 percent. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) at year-clearest visibility — the open-air viewing area photogenic at year-best. The Dhyanalinga temple complex and Adiyogi Aalayam meditation hall at full visitor operations. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) at full visitor pattern with light-load weekdays. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva) at peak operations. VOC Park, Gass Forest Museum (12km, 1902 Forest Dept, ₹50, closed Sun) at full hours. Velliangiri 7-peak trek (1840m sacred peak) at year-clearest underfoot. The Nilgiri gateway role at sustained demand — NH181 Coimbatore-Ooty (90km), NH183 Pollachi-Valparai 40-hairpin both at year-cleanest. Hotel rates climb 20 percent across the month: business district at ₹6-11k (was ₹5-9k October), mid-bracket ₹3,500-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('coimbatore', 12, 5, 'go',
  'Peak season. 19-29C. Christmas-NY rates climb 25 percent. Nilgiri gateway at year-busiest. Book 3-4 weeks ahead.',
  'December is the year''s most reliable Coimbatore window. Adiyogi at full visibility, Nilgiri gateway at peak. Christmas-NY week (Dec 22-Jan 5) drives rates up 25 percent. Book hotels and Ooty/Mudumalai stays 3-4 weeks ahead.',
  NULL,
  'Coimbatore in December is the year''s most coherent operational window with the bonus of being the Nilgiri Christmas-NY gateway. Daytime 26-29C, nights 19-22C, rainfall under 30mm, humidity 65 percent. Christmas-NY week (December 22 to January 5) is the year''s peak gateway demand: hotels climb 25 percent — business district (Le Meridien, Vivanta, Sheraton) at ₹8-15k against ₹6-11k off-peak, mid-bracket (Residency, Hotel City Tower) at ₹4-7k against ₹3-5k off-peak. Adiyogi statue (112-foot Guinness-record Shiva bust, Isha Yoga Center, Velliangiri foothills, 30km, 6:30am-9:30pm free) at year-busiest — December weekend traffic on the Velliangiri foothills road queues 30-45 minutes. Marudhamalai Hill Temple (15km, the 12th-century Subrahmanya temple at 500m, 7am-8pm) at peak pilgrim visitor pattern. Perur Pateeswarar Temple (10km, 1000-year-old Chola Shiva), VOC Park, Gass Forest Museum (12km, 1902 Forest Dept, ₹50, closed Sun) at peak. Velliangiri 7-peak trek (1840m sacred peak, 7-hour up + 5 down) at year-best pilgrim flow.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
