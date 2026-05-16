-- Chorao & Divar Islands destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa heritage batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: chorao-divar
-- best_months 10-3, avoid 6-8 — Mandovi River islands, Salim Ali bird sanctuary, Bonderam Aug

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 1, 5, 'go',
  'Peak migrant-bird window. 19-30C, dry. Free 24-hr Ribandar-Chorao car ferry. Salim Ali sanctuary at peak.',
  'January is when the Dr. Salim Ali Bird Sanctuary on Chorao runs at peak migrant density. Lesser whistling teal, white-bellied sea eagle, kingfishers active 6-9am and 4-6pm. Ferry from Ribandar (free, 24-hour) takes 10 minutes; Old Goa-Divar ferry runs 7am-11pm at 5 minutes.',
  NULL,
  'Chorao and Divar Islands in January are the version Mandovi-river regulars wait the year for. Daytime 22-30C, nights 19C, humidity finally below 70 percent. The Dr. Salim Ali Bird Sanctuary on Chorao''s mangrove fringe is at peak migrant density — lesser whistling teal in flocks of 200-400, white-bellied sea eagle pairs nesting, three kingfisher species (white-throated, common, pied) active 6-9am and 4-6pm. Forest Department guided walks (₹100, 90 minutes, 7am and 4pm departures) take 8-12 visitors per slot. Free 24-hour Goa Government car ferry from Ribandar to Chorao runs every 15 minutes (10-minute crossing). The Old Goa-Divar ferry runs 7am-11pm at 5-minute intervals (5-minute crossing). Divar''s Three Kings Chapel hilltop and Our Lady of Compassion Church (1700) sit a 25-minute walk apart and catch the year''s cleanest 4-5pm Mandovi light. Stays: Nowhere Else But Here ₹12-18k, Island Riviera ₹5-8k, Casa Fiesta ₹2.5-4.5k, Coconut Grove Ayurveda ₹4-7k. No restaurants in NakshIQ''s database for this dest — Panaji is 4km via ferry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 2, 5, 'go',
  'Driest month. 20-31C. Migrant peak holds through mid-Feb. Carnival traffic in Panaji thins ferry queues briefly.',
  'February holds January''s Salim Ali sanctuary peak through mid-month. Rainfall under 5mm, low humidity, daytime 22-31C. Carnival weekend in Panaji draws crowds away from the ferry routes — quietest island moment of the year is Carnival Sunday afternoon.',
  NULL,
  'February in Chorao and Divar is technically the cleanest of the cool months. Rainfall averages under 5mm, humidity 60 percent, daytime 22-31C. The Salim Ali Bird Sanctuary holds January''s migrant density through mid-month — lesser whistling teal flocks remain at 150-300 birds, white-bellied sea eagles still on nest, redshank and curlew on the mud-flats at low tide. Forest Department walks (₹100, 90 minutes, 7am and 4pm) at peak quality. Divar Island sees its quietest tourist numbers of the year on Carnival Sunday afternoon (variable date, three days before Ash Wednesday) when Panaji''s float parade draws ferry crowds away. The Three Kings Chapel hilltop walk on Divar — 25 minutes from the Old Goa ferry pier — runs through abandoned Portuguese mansions in various stages of collapse, the island''s defining visual texture. Stays at Nowhere Else But Here (₹12-18k), Casa Fiesta (₹2.5-4.5k), Coconut Grove Ayurveda (₹4-7k) hold January peak rates. Free Ribandar-Chorao car ferry runs 24-hour at 15-minute intervals.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 3, 4, 'go',
  'Last cool window. 22-32C. Migrant numbers dropping. Hotel rates ease 20 percent.',
  'March extends February''s walking and birdwatching with rising humidity. Salim Ali sanctuary still active but migrant numbers drop versus January-February peak. Stays at Casa Fiesta and Island Riviera drop 20 percent versus February peak.',
  NULL,
  'March in Chorao and Divar is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last fortnight, evenings still in the 22-24C band. The Salim Ali Bird Sanctuary holds activity through the month but lesser whistling teal flocks drop to 80-150 birds as some species begin northward migration; resident kingfishers and herons remain at year-round density. Forest Department walks continue at ₹100, 7am and 4pm departures, with 60-70 percent of February''s booking pressure. The Three Kings Chapel hilltop walk on Divar runs through the year''s last comfortable window — humidity rises sharply from late March. Our Lady of Compassion Church (1700) catches good 4-5pm light on the central Divar plateau. Stays drop to off-peak rates: Casa Fiesta ₹2-3.5k, Island Riviera ₹4-6k, Coconut Grove Ayurveda ₹3.5-6k. Nowhere Else But Here holds rates closer to peak (₹10-15k) but with weekday-night discounts. Free Ribandar-Chorao car ferry continues 24-hour. Old Goa-Divar ferry continues 7am-11pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 4, 2, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Mangrove walks possible early morning only. Migrants gone.',
  'April still works for the early-morning mangrove walker. Salim Ali sanctuary 6-9am window holds; afternoons collapse. The migrant density that defines Chorao is gone — resident species only. Hotel rates drop 30 percent.',
  'April delivers the first wave of Konkan summer. Salim Ali sanctuary becomes a sunrise-only proposition; the mid-day mangrove wood-walks are unwalkable. Migrant species mostly gone. Three Kings Chapel hilltop walk on Divar collapses past 10am.',
  'April in Chorao and Divar is when the islands narrow to their early-morning windows. Daytime 26-34C, humidity 75-80 percent, mangrove humidity inside the Salim Ali sanctuary climbs past 85 percent under canopy. The 6-9am Forest Department walk (₹100, 90 minutes) is the only viable visit; the 4pm slot collapses to a hot-and-still affair barely worth the boat-ride. Migrant species — the lesser whistling teal flocks, the curlew, the visiting raptors — have moved on by mid-April; resident species (kingfishers, herons, white-bellied sea eagle pair on nest) remain. Divar Island''s Three Kings Chapel hilltop walk and Our Lady of Compassion Church visit work only before 10am. Hotel rates drop 30 percent versus February peak: Casa Fiesta ₹1.8-3k, Island Riviera ₹3.5-5k, Nowhere Else But Here ₹8-12k. Free Ribandar-Chorao car ferry continues 24-hour but Old Goa-Divar ferry sees thinner traffic on hot afternoons.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 5, 2, 'wait',
  'Peak heat. 27-36C, humidity 80 percent. Sanctuary collapses. Pre-monsoon storms last 10 days. Hotel rates year-low.',
  'May is the year''s most uncomfortable island stretch. Salim Ali sanctuary collapses except for the first hour of daylight. Migrants gone. Pre-monsoon thunderstorms knock power 1-3 hours each afternoon. Push to October.',
  'May runs hot and sticky. The mangrove canopy holds 85-90 percent humidity all day; even the Forest Department''s 7am walk is uncomfortable past 30 minutes. Pre-monsoon thunderstorms knock power 1-3 hours afternoons. The trip you came for cannot work.',
  'May in Chorao and Divar is the year''s least pleasant window for the islands. Daytime 28-36C, humidity 80 percent, mangrove canopy humidity climbs past 90 percent under shade. Pre-monsoon thunderstorms hit 2-3 afternoons a week from May 20 onwards, knocking grid power 1-3 hours. The Salim Ali Bird Sanctuary opens nominally but Forest Department walks reduce to 6-7am only — the mid-morning slot is unsafe (heat exhaustion concerns), and afternoon heat plus storm risk closes the 4pm walk for the rest of the season. Resident species (kingfishers, herons) remain visible but observation conditions collapse. Divar''s Three Kings Chapel and Our Lady of Compassion walks are unworkable past 9am. Hotel rates at year-low: Casa Fiesta ₹1.6-2.8k, Island Riviera ₹3-4.5k, Nowhere Else But Here ₹7-11k. Free Ribandar-Chorao car ferry continues 24-hour; Old Goa-Divar ferry runs reduced afternoon frequencies on storm days. October brings a coherent return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 6, 1, 'skip',
  'SW monsoon arrives ~Jun 10. 24-30C, 700-900mm rain. Sanctuary closes during heavy rain. Ferry delays. Skip.',
  NULL,
  'June is when the Konkan monsoon arrives in force. Salim Ali sanctuary closes on heavy-rain days, mangrove walks unsafe in flood, ferry services delay on rough water. Skip.',
  'June in Chorao and Divar is when the southwest monsoon arrives — typically June 10 — and island access collapses. Daytime 24-30C, but rainfall hits 700-900mm across 22-25 wet days. The Dr. Salim Ali Bird Sanctuary closes for heavy-rain days at Forest Department discretion (covering 30-40 percent of June afternoons); mangrove boardwalks flood and become unsafe. Free Ribandar-Chorao car ferry continues 24-hour but sees 30-60 minute delays on rough-water days when the Mandovi current spikes. Old Goa-Divar ferry suspends 1-2 days a month on extreme weather. Divar''s Three Kings Chapel hilltop walk runs through laterite paths that turn slick; Our Lady of Compassion Church remains accessible but with thinned visitor numbers. Hotel rates at year-low: Casa Fiesta ₹1.5-2.5k, Island Riviera ₹2.8-4k, Nowhere Else But Here ₹6-10k. October is the next coherent window for the bird-and-walk experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 7, 1, 'skip',
  'Heaviest monsoon. 24-29C, 800-1100mm rain. Sanctuary largely closed. Ferries delayed. Skip.',
  NULL,
  'July is the wettest month at the Mandovi delta. Salim Ali sanctuary closes most days, mangrove walks unsafe in flood, ferry services unreliable. The trip cannot happen. Wait for October.',
  'July in Chorao and Divar is the deepest of the Konkan monsoon. Rainfall averages 1,000mm across 26-28 wet days, daytime 24-29C, humidity at 92 percent. The Dr. Salim Ali Bird Sanctuary closes 60-70 percent of days at Forest Department discretion; mangrove boardwalks flood under high tide and storm-runoff combinations. Free Ribandar-Chorao car ferry continues 24-hour but sees 60-90 minute delays on rough-water days. Old Goa-Divar ferry suspends 2-3 days a month on the heaviest weather. Divar''s laterite-stepped paths turn dangerous; Three Kings Chapel hilltop walks unviable. Our Lady of Compassion Church remains open but the trip-shape that justifies a visit (mangrove birding, Portuguese-mansion architecture walks, Mandovi-river views from the church plateau) does not function. Hotel rates at year-low (45-50 percent below February peak), but the experience is shut. October-November is the next viable window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 8, 2, 'wait',
  'Monsoon continues but Bonderam (4th Saturday) on Divar is the year''s outlier draw. 24-29C, 600-800mm rain.',
  'August is monsoon-shut except for one day — Bonderam (4th Saturday of August), Divar''s flag-festival, with origins in 1700s village boundary disputes. Miniature flag-floats, traditional Konkani bands, the year''s busiest single-day Divar visit despite the rain.',
  'Outside Bonderam day, August holds July''s pattern. Salim Ali sanctuary largely closed, mangrove walks unviable, ferry services unreliable on rough water. The trip works only as a Bonderam-Saturday visit if dates align.',
  'August in Chorao and Divar is monsoon at full force with one calendar-defining outlier — Bonderam, the 4th Saturday flag festival on Divar. Origins in 1700s Portuguese-era village boundary disputes (banderas being the boundary flags), the festival is now a parade of miniature flag-floats through Divar village, traditional Konkani brass bands, fancy-dress competitions, and a kopel (palm-frond) drink stall culture that draws 4,000-6,000 same-day visitors despite the rain. Old Goa-Divar ferry runs extra services Bonderam Saturday from 9am to midnight; queues stretch to 30-60 minutes between 11am and 2pm. Outside that single day, August in the islands holds July''s pattern — Salim Ali sanctuary closed 50-60 percent of days, mangrove boardwalks flooded, free Ribandar-Chorao ferry delayed on rough water. Rainfall 600-800mm across 23-25 wet days. Daytime 24-29C, humidity 90 percent. Hotel rates at year-low: Casa Fiesta ₹1.6-2.6k, Island Riviera ₹3-4.2k, Nowhere Else But Here ₹6.5-10k. Bonderam booking pressure spikes 3-4 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 9, 2, 'wait',
  'Monsoon withdrawing. 24-30C, 250-350mm rain. Sanctuary reopens late month. Migrants haven''t arrived yet.',
  'September is the trickle back. Konkan monsoon withdraws around September 25-30; Salim Ali sanctuary reopens, mangrove boardwalks dry within a week. Migrants haven''t returned yet — January-February remains the bird-density peak.',
  'Early September is still rain-heavy. Sanctuary closures continue, ferry delays persist, migrants are still 4-6 weeks away. Push to mid-October if birds are the actual draw.',
  'September in Chorao and Divar is the recovery month. Rainfall halves versus August to 250-350mm, mostly first half. By September 25-30 the southwest monsoon withdraws from the Konkan, the Dr. Salim Ali Bird Sanctuary returns to full Forest Department walk schedule (₹100, 7am and 4pm departures), and the mangrove boardwalks dry within a week of the last sustained rain. Daytime 25-30C, humidity easing to 75 percent. Migrant species — the lesser whistling teal flocks, curlew, redshank — haven''t arrived yet (they peak January-February); resident kingfishers, herons, and the white-bellied sea eagle pair are visible. Divar''s Three Kings Chapel and Our Lady of Compassion walks return to viable. Hotel rates at year-low for the first 20 days: Casa Fiesta ₹1.8-3k, Island Riviera ₹3.5-5k, Nowhere Else But Here ₹7-11k. The Three Kings Chapel hilltop catches its first clean Mandovi sunset views of the season by month-end. Free Ribandar-Chorao car ferry returns to 24-hour reliability.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 10, 4, 'go',
  'Season opens. 23-31C, post-monsoon green, 100-150mm light rain. First migrants arrive mid-month.',
  'October is the proper season-opener for the islands. Sanctuary at full schedule, mangroves at year-deepest green, first migrant arrivals mid-month. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Chorao and Divar is when the islands return to full coherence. Rainfall 100-150mm — almost all in the first 10 days as the monsoon retreats — and daytime 24-31C, humidity falling toward 75 percent. The Dr. Salim Ali Bird Sanctuary runs full Forest Department walk schedule (₹100, 90 minutes, 7am and 4pm departures); mangroves at year-deepest green, boardwalks dry. First migrant arrivals from mid-month: northern shoveler, garganey, lesser whistling teal in growing flocks (50-150 by month-end versus January peak of 300-500). White-bellied sea eagle pair active. Divar''s Three Kings Chapel hilltop and Our Lady of Compassion (1700) church walks at viable. Hotel rates at Casa Fiesta (₹2-3.5k), Island Riviera (₹4-6k), Nowhere Else But Here (₹9-13k), Coconut Grove Ayurveda (₹3.5-5.5k) sit 25-30 percent below January peak. Free Ribandar-Chorao car ferry at 15-minute intervals. Diwali week (variable date) brings a 5-day domestic-tourist bump on Divar (Hindu festivities centred on Three Kings Chapel area).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 11, 5, 'go',
  'Peak builds. 21-30C, dry. Migrant numbers building toward December peak. Hotel rates climb steadily.',
  'November is the genuine pivot to peak migrant season. Rainfall under 50mm, days at 30C, walking conditions ideal. Migrant flocks build through the month — by November 25, lesser whistling teal flocks reach 200-300 birds.',
  NULL,
  'November in Chorao and Divar is the year''s second-peak month behind January. Rainfall under 50mm with most of it in the first week. Daytime 23-30C, nights 21C, humidity dropping under 70 percent. Migrant numbers build steadily through the month — lesser whistling teal flocks reach 200-300 by November 25, redshank and curlew on the mud-flats at peak winter density, garganey arriving in the third week. White-bellied sea eagle pair active on the Salim Ali sanctuary nest, kingfisher activity at year-best on cool mornings. Forest Department walks (₹100, 90 minutes, 7am and 4pm) book 1-2 days ahead. Divar''s Three Kings Chapel hilltop walk catches the year''s second-best 4-5pm Mandovi sunset light. Hotel rates climb through the month: Casa Fiesta to ₹2.2-4k, Island Riviera to ₹4.5-7k, Nowhere Else But Here to ₹10-15k. Free Ribandar-Chorao car ferry 24-hour at 15-minute intervals. Old Goa-Divar ferry full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chorao-divar', 12, 5, 'go',
  'Peak peak. 19-30C, dry. Migrant density at January-rivalling levels. Christmas-NY rates 2x.',
  'December is the operational peak. Migrant density at January-rivalling levels by mid-month. Christmas-NY (Dec 22-Jan 5) doubles hotel rates and brings ferry queue surges. Christmas Mass at Our Lady of Compassion Church on Divar.',
  NULL,
  'December in Chorao and Divar is the operational peak of the bird-and-island year. Daytime 22-30C, nights 19C, rainfall under 30mm. By mid-month, migrant density at the Dr. Salim Ali Bird Sanctuary rivals January peak — lesser whistling teal flocks of 250-450 birds, redshank and curlew at saturation on mud-flats, white-bellied sea eagle pair feeding chicks (December-February nesting cycle). Forest Department walks (₹100, 7am and 4pm) book 3-5 days ahead from December 15 onwards. Divar''s Three Kings Chapel hilltop catches year-best Mandovi sunset views. Christmas Eve Mass at Our Lady of Compassion Church (1700) on Divar starts 9pm and runs to midnight; the church draws 800-1,200 worshippers from across Divar village. Old Goa-Divar ferry runs extra Christmas services. Hotel rates double from December 22: Nowhere Else But Here climbs to ₹18-25k, Casa Fiesta to ₹4-7k, Island Riviera to ₹8-12k. Free Ribandar-Chorao car ferry continues 24-hour but sees 20-40 minute queues on Christmas weekend.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
