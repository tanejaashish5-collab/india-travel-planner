-- Old Goa destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa heritage batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: old-goa
-- Note: best_months 10-5 (BROAD), avoid 7-8 ONLY — heritage tolerates pre-monsoon better than beaches

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 1, 5, 'go',
  'Peak heritage walking weather. 19-31C, dry. Basilica and Se Cathedral at full capacity. Christmas-week traffic eases by Jan 5.',
  'January is when the UNESCO Old Goa complex runs cleanest. Basilica of Bom Jesus and Se Cathedral both open 9am-6:30pm, the Archaeological Museum 10am-5pm (closed Friday), and the laterite-paved walking circuit between churches is comfortable all day.',
  NULL,
  'Old Goa in January is the version the UNESCO citation describes. Daytime sits at 21-31C, nights drop to 19C, humidity finally below 70 percent. The Basilica of Bom Jesus (1605, the silver casket of St. Francis Xavier behind glass at the south transept) opens 9am-6:30pm, and the Se Cathedral across the road — Asia''s largest church, 5 bells including the 2,250kg Golden Bell — runs the same hours. Mass at the Basilica Sunday 8am and 9:30am draws regulars; weekday entry is walk-in. The Church of St. Cajetan (1661, Roman dome modeled on St. Peter''s) is 200m east. Archaeological Museum 10am-5pm, closed Friday, ₹25 entry. Christmas-week traffic from Calangute and Panaji thins out from January 5; rented car parking on the Basilica grounds runs ₹50, autos from Panaji (10km, 25 minutes) charge ₹350-400 metered. Carry water — the laterite paving radiates heat by 11am even in January.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 2, 5, 'go',
  'Driest stretch. 20-32C. Heritage walks comfortable. Carnival weekend brings spillover from Panaji.',
  'February delivers Konkan-coast clean: rainfall under 5mm, low humidity, 21-32C. The full church-circuit walk (Basilica, Se, St. Cajetan, St. Augustine ruins, Lady of the Mount viewpoint) takes 4-5 hours on foot and pairs well with a Panaji lunch. Carnival float-parade traffic crowds NH-66 the Sunday-Tuesday before Ash Wednesday.',
  NULL,
  'February in Old Goa is technically the cleanest of the cool months. Rainfall averages under 5mm, humidity at 60 percent, daytime 22-32C. The full walking circuit — Basilica of Bom Jesus, Se Cathedral, St. Cajetan, the laterite ruins of St. Augustine''s tower, then a 1km uphill to Our Lady of the Mount for the Mandovi viewpoint — runs 4-5 hours and fits a single morning. The Archaeological Museum (₹25, closed Friday) houses a complete set of Goan-Portuguese viceroy portraits and the original 1543 Bom Jesus pulpit. Carnival weekend (variable date, three days before Ash Wednesday) draws Panaji float-parade traffic across the Mandovi bridges to and from Old Goa, congesting NH-66 from Saturday afternoon to Tuesday morning. Otherwise the complex sits at 30-40 percent of December peak — guides at the Basilica steps charge ₹300 for a 45-minute tour, ₹500 for a full hour with the museum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 3, 4, 'go',
  'Last comfortable window. 22-33C. Shigmo parade traffic mid-month. Hotel rates ease 20 percent versus February.',
  'March extends February''s heritage walking with a rising heat tax. Mornings before 10am and evenings after 4pm hold up; the church interiors stay cool throughout. Shigmo (Hindu spring festival, full-moon Phalgun) brings Panaji and Ponda parade traffic across NH-66 for a week.',
  NULL,
  'March in Old Goa is the soft-landing month. Daytime 24-33C, humidity climbing to 70 percent in the last fortnight, evenings still in the 23-25C band. The Basilica and Se Cathedral interiors hold 26-28C year-round — the laterite walls work as a passive thermal sink — so the church-by-church walk is a sequence of cool-and-bake moments. Shigmo (variable date, full-moon Phalgun) draws Panaji and Ponda parade traffic across NH-66 from the second week; Wednesday-Friday is the cleanest stretch. The St. Augustine tower ruins (Vivanta Goa''s archaeological neighbour) sit at the western edge of the complex and catch good 5pm light. Hotel rates at Vivanta Panaji and Pousada Tauma drop 20 percent versus February peak. Carry a hat for the laterite sun-traps between churches; bottled water is ₹20 at the Basilica entrance, ₹40 at the Bom Jesus shop.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 4, 3, 'wait',
  'Pre-monsoon heat. 25-35C, humidity 75 percent. Church interiors stay cool but mid-day walking collapses.',
  'April still works for travelers willing to time-shift — 6-9am and after 5pm walks hold up, and Basilica/Se Cathedral interiors remain 26-28C. The trip needs to compress into morning and evening windows; afternoons are for the AC of Vivanta Panaji or a Mandovi cruise.',
  'April delivers the first wave of Konkan summer. The 4-church laterite walking circuit collapses past 11am — humidity 75 percent, sun on bare laterite radiates heat past 5pm. The trip works only if the day splits cleanly into 6-9am and 5-7pm walking windows.',
  'April in Old Goa is when the heritage trip narrows to its early mornings and late evenings. Daytime 26-35C, humidity 75-80 percent, the laterite walking circuit between the Basilica, Se Cathedral and St. Cajetan turns into a heat trap from 10am to 4pm. The interiors save the day — the Basilica holds 26-28C regardless of season, and the Bom Jesus silver casket viewing-window stays accessible. The smart traveler''s shape: 6-9am for the full church-and-ruins circuit, then retreat to AC at Vivanta Panaji (₹8-14k) or Pousada Tauma (₹3-6k), then a 5-7pm walk back to Our Lady of the Mount viewpoint for the Mandovi sunset. Hotel rates drop 30 percent versus February. The Archaeological Museum (10am-5pm, closed Friday) is the trip''s air-conditioned anchor. Avoid the Sunday 9:30am Mass crowd in April — air circulation in the Basilica nave thins past 200 worshippers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 5, 3, 'wait',
  'Peak pre-monsoon. 27-37C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Indoor only past 10am.',
  'May still functions for travelers committed to the time-shift trick — 6-9am for the laterite circuit, then AC indoors, then 5-7pm Mandovi cruise. The Basilica and Se Cathedral interiors are the actual destination; the walks between them are the price.',
  'May is when the Konkan coast hits its hottest stretch and pre-monsoon thunderstorms knock grid power across Old Goa village 1-3 hours each afternoon. The 4-church walking circuit collapses to a 3-hour dawn window. Hotel pool-and-AC days dominate.',
  'May in Old Goa is the hottest month and the laterite walking-circuit''s least friendly. Daytime 28-37C, humidity 80 percent, pre-monsoon thunderstorms hit the last 10 days knocking grid power 1-3 hours each afternoon. The Basilica and Se Cathedral remain open 9am-6:30pm with their year-round 26-28C interiors, but everything between the buildings — the open laterite plaza, the walk to St. Augustine''s tower, the climb to Lady of the Mount — is unworkable from 10am to 5pm. Hotel rates run at year-low: Vivanta Panaji at ₹6-9k, Pousada Tauma at ₹2-3.5k, Ahilya by the Sea at ₹8-12k. The Sunday 9:30am Mass becomes a marathon in the muggy nave; opt for Saturday vigil 5pm if you want a service. Mandovi sunset cruises (Goa Tourism, ₹300, 6-7pm and 7-8pm departures from Panaji jetty) are the best evening anchor — 8km river frontage with Old Goa''s church spires picked out on the south bank.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 6, 2, 'wait',
  'SW monsoon arrives ~Jun 10. 24-30C, 700-900mm rain. Goa Liberation period traffic eases. Atmospheric grey-stone monsoon mood.',
  'June trades the heat for steady rain and emptied-out heritage. The Basilica and Se Cathedral roofs hold up, the laterite walls deepen in colour, and the Mandovi at full flow is its own attraction. Worth it for the monsoon-photography traveler willing to plan around rain windows.',
  'June is when the southwest monsoon hits the Konkan coast. Most of June 10 onwards is heavy rain — laterite paths flood, the open church-circuit walks collapse, Sunday Mass attendance drops 60 percent. The trip works only inside individual buildings and from a sheltered courtyard.',
  'June in Old Goa is when the southwest monsoon arrives — typically June 10 — and the complex shifts from heritage walk to atmospheric retreat. Daytime drops to 24-30C, but rainfall hits 700-900mm across 22-25 wet days. The Basilica of Bom Jesus and Se Cathedral both stay open 9am-6:30pm, their roofs and gutters tested across four centuries. The laterite walls turn from rust-brown to deep oxblood in the wet, and the Mandovi at full flow runs visible from the Lady of the Mount path on dry afternoons. The walking circuit between churches collapses on heavy-rain days — flooded paving, no shelter between buildings. Hotel rates at Vivanta Panaji, Pousada Tauma, Ahilya by the Sea sit at year-low (40-50 percent off February peak). Goa Tourism ferry services across Mandovi continue weather-permitting; Panaji-Old Goa share-autos run normally on NH-66. Carry a poncho rather than an umbrella — Konkan crosswinds make umbrellas useless.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 7, 1, 'skip',
  'Heaviest monsoon. 24-29C, 800-1100mm rain. Laterite paths flood. Exterior viewing washed out. Skip.',
  NULL,
  'July is the wettest month of the Konkan year. The heritage circuit needs dry footing — laterite paving floods, Lady of the Mount path turns to mud, the church-to-church walk is unviable. Interiors stay open but the walking-tour shape of the trip breaks completely.',
  'July in Old Goa is when the southwest monsoon delivers its deepest dump on the Konkan coast — rainfall averages 1,000mm across 26-28 wet days. Daytime 24-29C with humidity at 90 percent. The Basilica and Se Cathedral remain open with reduced visitor numbers, but the entire trip-shape that justifies a visit — walking the 4-church circuit, climbing to Lady of the Mount, visiting the St. Augustine tower ruins — collapses. The laterite paving between churches floods every storm; the open St. Augustine ruins receive their full annual rain on the unprotected stones. Bus services from Panaji via NH-66 hold up, share-autos thin out, ferry services to Divar (5 minutes from Old Goa) suspend on rough-water days. Hotel rates run at year-low but the trip you came for cannot happen in July. The next coherent window is mid-September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 8, 1, 'skip',
  'Monsoon continues plus Ganesh Chaturthi shutdown. 24-29C, 600-800mm rain. Laterite paths still flooded.',
  NULL,
  'August holds July''s pattern with marginally fewer extreme-rain days. Ganesh Chaturthi (variable date, 11-day Hindu festival) shifts the local rhythm — Hindu Goa peaks while Christian Goa goes quiet. Old Goa stays open but the walking circuit remains unviable. Wait for late September.',
  'August in Old Goa runs the July pattern with two new wrinkles. Rainfall eases slightly to 600-800mm across 23-25 wet days but still locks out the church-to-church walking circuit. The standout calendar entry is Ganesh Chaturthi (variable date, usually August-September) — 11 days when Hindu Goa peaks at Mangueshi and Shantadurga temples (40km south in Ponda) and Christian Goa goes notably quiet. The Bonderam flag festival on Divar Island (4th Saturday of August, 5 minutes by ferry from Old Goa) is the one bright spot — a 1700s-origin festival with miniature flag-floats and traditional Konkani music; ferry to Divar runs from the Old Goa jetty 7am-7pm, ₹10 per person. Hotel rates at Vivanta Panaji and Pousada Tauma still at year-low. The Basilica and Se Cathedral remain open but visitor numbers are 70-80 percent below February.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 9, 3, 'wait',
  'Monsoon withdrawing. 23-30C, 250-350mm rain. Laterite drying out late in month. Walking circuit returns by Sep 25.',
  'September is the trickle back to walkable. Monsoon retreats from the Konkan around September 25-30; the Basilica-to-Se Cathedral laterite paving dries within a week of the last sustained rain. Worth the wait if dates are flexible to the last week.',
  'Early September is still rain-heavy. The 4-church walking circuit doesn''t come back online until the last week. If your dates are in the first fortnight, push to mid-October or wait for late November.',
  'September in Old Goa is the recovery month. Rainfall halves versus August to 250-350mm, mostly first half. By September 25-30 the southwest monsoon withdraws from the Konkan coast, and the laterite plaza between the Basilica and Se Cathedral dries within a week. The full walking circuit — Basilica, Se Cathedral, St. Cajetan, St. Augustine tower ruins, Lady of the Mount — comes back online for the last 5-7 days of the month. Daytime 25-30C, humidity finally easing toward 75 percent. Hotel rates at Vivanta Panaji (₹6-10k), Pousada Tauma (₹2.5-4.5k), Ahilya by the Sea (₹8-14k) sit at 50 percent below February peak for the first 20 days, then climb 15-20 percent in the last week as October bookings begin. The Archaeological Museum (10am-5pm, closed Friday) is the safest indoor anchor through the wet days. Sunday 9:30am Mass attendance returns to normal by month-end.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 10, 4, 'go',
  'Season opens. 22-31C, post-monsoon green, 100-150mm light rain. Heritage circuit fully walkable.',
  'October is the proper season-opener for Old Goa. The Konkan dries out, the laterite plaza is firm, and the church complex is at its post-monsoon best — walls deep oxblood, surrounding fields green, fewer visitors than November-January. Hotel rates 25-30 percent below peak.',
  NULL,
  'October in Old Goa is when the heritage complex returns to full coherence. Rainfall drops to 100-150mm — almost all in the first 10 days as the monsoon retreats — and daytime 23-31C, humidity falling toward 75 percent. The Basilica of Bom Jesus, Se Cathedral, St. Cajetan all run their full 9am-6:30pm hours. The walking circuit is firm-footed, Lady of the Mount viewpoint catches its cleanest Mandovi views of the year, and the surrounding rice fields below the church platform sit at peak post-monsoon green. Visitor numbers are 50-60 percent of December peak; guide rates at the Basilica steps drop to ₹250 for 45 minutes. Vivanta Panaji at ₹7-10k, Pousada Tauma at ₹2.5-4.5k, Ahilya by the Sea at ₹8-12k sit 25-30 percent below January peak. The Archaeological Museum (10am-5pm, closed Friday) reopens its full collection. Diwali week (variable date) brings a 5-day domestic-tourist bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 11, 5, 'go',
  'Peak builds. 20-30C, dry. St. Francis Xavier novena Nov 24-Dec 8 tightens Basilica access in the last week.',
  'November is the genuine pivot to peak season. Konkan rainfall under 50mm, days at 30C, walking conditions ideal. Watch the last week — the 9-day Novena leading to the Feast of St. Francis Xavier (Dec 3) starts November 24 and tightens Basilica access for non-pilgrims.',
  NULL,
  'November in Old Goa is the year''s second-peak month behind January. Rainfall under 50mm with most of it in the first week. Daytime 22-30C, nights 20C, humidity dropping under 70 percent. Visitor numbers climb steadily — by mid-month, Basilica and Se Cathedral see 1,500-2,000 daily visitors versus October''s 800-1,000. The standout calendar entry is November 24, when the 9-day novena leading to the Feast of St. Francis Xavier (December 3) begins. From November 24 to December 8, the Basilica of Bom Jesus tightens visitor access — non-pilgrim entry restricted to specific windows (typically 9-11am and 3-5pm), the silver casket viewing window holds longer queues, and the Old Goa-Panaji NH-66 stretch sees pilgrim-bus convoy traffic. Hotel rates at Vivanta Panaji climb to ₹9-13k, Ahilya by the Sea ₹10-15k. The Archaeological Museum unaffected. Strong call for first-time visitors who plan to be done before November 24.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('old-goa', 12, 4, 'go',
  'Peak peak with St. Francis Xavier surge Dec 1-8. 19-30C, dry. Christmas-NY traffic Dec 22-Jan 5.',
  'December is operationally peak but split by the Feast of St. Francis Xavier on December 3. The first 8 days see hundreds of thousands of pilgrims pass through the Basilica — non-pilgrim access tightens substantially. December 9-21 is the cleanest stretch; December 22-January 5 is Christmas-NY congestion across all of Goa.',
  NULL,
  'December in Old Goa is shaped by two surges — the Feast of St. Francis Xavier on December 3, and Christmas-New Year from December 22. Daytime 22-30C, nights 19C, rainfall under 30mm. From December 1-8, the Feast week, the Basilica of Bom Jesus runs at saturation: hundreds of thousands of pilgrims, road closures on the Old Goa-Panaji stretch, parking unavailable within 1km of the church grounds. Non-pilgrim visitors are funnelled to specific windows (typically 6-9am and 7-9pm) and the silver-casket queue stretches 90 minutes. Decennial Public Exposition years are exceptions — next is 2034. December 9-21 is the cleanest 12-day window of December: Basilica and Se Cathedral at full hours, walking circuit firm, hotels still 20 percent below Christmas peak. December 22-January 5 sees Christmas-NY congestion: rates at Vivanta Panaji climb to ₹15-22k, Ahilya by the Sea ₹16-22k. Carol services at Se Cathedral December 24 and 31, midnight Mass at the Basilica December 24. Book accommodations 4-6 weeks ahead for Christmas week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
