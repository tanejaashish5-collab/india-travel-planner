-- Panaji (Panjim) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa heritage batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: panaji
-- best_months 10-3, avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 1, 5, 'go',
  'Peak window. 19-30C, dry. Fontainhas walks ideal. Mandovi cruises and floating casinos at full capacity.',
  'January is when Panaji runs at its most coherent. Fontainhas Latin Quarter walking tours hold up all day, Confeitaria 31 de Janeiro and Hospedaria Venite both at full hours, Mandovi sunset cruises and floating casinos at capacity. Post-NYE rates ease back from January 5.',
  NULL,
  'Panaji in January is the version Goa''s state capital wears best. Daytime sits at 22-30C, nights drop to 19-20C, humidity finally below 70 percent. Fontainhas — the UNESCO-shortlisted Latin Quarter of azulejo-tiled houses, narrow lanes between 31st January Road and Cunha Rivara Road — walks well from 7am to 6pm. The 6:30am bakery queue at Confeitaria 31 de Janeiro (1930s, the bebinca and serradura authority) usually clears by 8:30. Hospedaria Venite for lunch (Goan-Portuguese, 1st floor balcony seating overlooking the Latin Quarter) takes walk-ins after 1:30pm. Joseph Bar in the lanes behind the Chapel of St. Sebastian is the post-9pm Fontainhas anchor. The Church of Our Lady of Immaculate Conception (1541, baroque white-stair facade above the municipal market) lights up after sunset for Christmas-season carols through January 6, regular hours otherwise. Mandovi sunset cruises (Goa Tourism, ₹300, 6-7pm and 7-8pm departures from the Santa Monica jetty) run at full schedule. Floating casinos (Deltin Royale, Big Daddy) operate 24x7 with ID-required entry; minimum age 18.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 2, 5, 'go',
  'Driest month. 20-31C. Carnival weekend brings float-parade traffic. Goa GAFF tail-end mid-month.',
  'February is when Panaji is at its driest and busiest. Rainfall under 5mm, low humidity, Carnival weekend brings the year''s biggest float parade through 18th June Road. The Goa Arts and Literature Festival (December-January) tail-end programming runs in early February at Sunaparanta and the Kala Academy.',
  NULL,
  'February in Panaji is the year''s driest stretch and the heart of Carnival season. Rainfall averages under 5mm, daytime 22-31C, humidity 60 percent. Carnival (variable date, three days before Ash Wednesday) shuts down 18th June Road and Dayanand Bandodkar Road for the float parade Sunday afternoon — King Momo''s procession kicks off 4pm, ends near Azad Maidan around 7pm. Hotel rates triple Carnival weekend (Friday-Tuesday) and bookings need 6-8 weeks lead. Outside that window: Mum''s Kitchen (Goan thali, lunch 12-3pm, ₹400 set meal) and Viva Panjim (Portuguese-Goan in the Fontainhas lanes, 12:30-3:30pm, 7-10:30pm) run normal service. Black Sheep Bistro (modern Goan, dinner only 7-11pm) takes reservations 2-3 days ahead. Ritz Classic at the bus stand for working-day fish thali. Confeitaria 31 de Janeiro for the morning queue. Joseph Bar at 9pm. The Goa Arts and Literature Festival tail-end programming runs at Sunaparanta Goa Centre and the Kala Academy through the first week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 3, 4, 'go',
  'Last cool window. 22-33C. Shigmo full-moon parade mid-month. Hotel rates ease 20-25 percent.',
  'March extends February''s heritage walking with the Shigmo Hindu spring festival as the month''s anchor. Rainfall stays under 15mm, days warm to 33C but Fontainhas''s tree-shaded lanes hold up longer than open beaches. Hotel rates ease 20-25 percent.',
  NULL,
  'March in Panaji is the soft-landing month. Daytime 24-33C, humidity climbing toward 70 percent in the last fortnight, evenings still in the 22-24C band. Shigmo (variable date, full-moon Phalgun) is the Hindu spring festival — week-long parades through Panaji, Ponda, Vasco, Quepem; the Panaji parade kicks off near Azad Maidan around 4pm and processes via 18th June Road. Outside the parade week, hotel rates drop 20-25 percent: Panjim Pousada at ₹4-7k, The Bungalow Panaji at ₹3-5k, Houseboat Mandovi at ₹3.5-7k. Fontainhas''s tree-shaded lanes (the laburnum and gulmohar canopy on Rua de Ourem) hold up till 11am and from 4pm. Confeitaria 31 de Janeiro''s morning queue thins after February''s peak. Mandovi sunset cruises run normal departures (6pm and 7pm). Joseph Bar shifts dinner crowd 30 minutes earlier as the heat picks up. Last comfortable month for the full Latin Quarter walking experience before April''s humidity tax kicks in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 4, 3, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Fontainhas walks need morning/evening windows. AC restaurants/casinos work all day.',
  'April still functions for travelers who lean on Panaji''s indoor infrastructure. Fontainhas walks compress to 6-9am and after 5pm. Casinos, Black Sheep Bistro, Hospedaria Venite, Joseph Bar all AC-strong. Hotel rates drop 30 percent.',
  'April delivers the first wave of Konkan summer to Panaji. Open-air walks collapse 10am-5pm, riverside Mandovi cruises run only evening departures, 18th June Road afternoons are unwalkable. The trip works only on the indoor-and-evening axis.',
  'April in Panaji is when the Latin Quarter walks compress to morning and evening windows. Daytime 26-34C, humidity 75-80 percent, the laterite-and-azulejo lanes of Fontainhas radiate heat from 11am to 4pm. The trip narrows to AC anchors: Black Sheep Bistro for dinner (7-11pm), Hospedaria Venite for late lunch (1:30-3:30pm), Mum''s Kitchen for the air-conditioned Goan thali (12-3pm), Joseph Bar for the post-9pm circuit. Mandovi sunset cruises drop the 6pm departure on the hottest weeks; the 7pm sailing holds up. Floating casinos (Deltin Royale, Big Daddy) run 24x7 — they''re the year-round AC retreat. Hotel rates drop 30 percent versus February peak: Panjim Pousada at ₹3.5-5.5k, The Bungalow Panaji at ₹2.5-4k, Houseboat Mandovi at ₹3-5k. Pack sunscreen, accept that the Confeitaria 31 de Janeiro morning queue is a 7am affair, and shift the Fontainhas walk to a sunrise window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 5, 2, 'wait',
  'Peak heat. 26-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Power cuts knock evenings.',
  'May is when Panaji becomes a casino-and-AC weekend. Fontainhas walks collapse to a 6-8am window. Mandovi cruises suspend mid-month as river chop picks up. Hotel rates at year-low; useful only if Panaji''s indoor-AC offerings are the actual draw.',
  'May runs hot and humid on the Konkan coast. Pre-monsoon thunderstorms knock grid power 1-3 hours each afternoon, the Latin Quarter is unwalkable from 9am, and the open-deck Mandovi cruises stop mid-month. Indoor-only Panaji works for casinos and hotel pools but not much else.',
  'May in Panaji is when the city compresses to its smallest viable shape. Daytime 27-36C, humidity 80 percent, pre-monsoon thunderstorms hit two-three afternoons a week from May 20 onwards. Grid power knocks for 1-3 hours each storm; budget hotels without inverters go dark and hot. The Latin Quarter walking circuit (Fontainhas, the Church of Our Lady of the Immaculate Conception, the municipal market) collapses past 9am. Mandovi sunset cruises suspend mid-month as river chop picks up; floating casinos (Deltin Royale, Big Daddy) keep their 24x7 AC operations through the storms. The trip works only as a casino-and-AC weekend or a Black Sheep Bistro dinner stop. Hotel rates run at year-low: Panjim Pousada at ₹3-4.5k, The Bungalow Panaji at ₹2-3.5k. Confeitaria 31 de Janeiro shifts to 7am opening; the bebinca counter sells out by 11am. Push to October for a coherent visit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 6, 1, 'skip',
  'SW monsoon arrives ~Jun 10. 24-30C, 700-900mm rain. Mandovi cruises suspended. Skip.',
  NULL,
  'June is when the Konkan monsoon arrives in force. Mandovi cruises suspend, Fontainhas''s narrow lanes flood, restaurant trade thins to long-term locals. Sao Joao (June 24) is a Siolim party not a Panaji one. Wait for October.',
  'June in Panaji is when the southwest monsoon arrives — typically June 10 — and the city''s tourist infrastructure shuts down. Rainfall hits 700-900mm across 22-25 wet days. Daytime 25-30C with humidity at 90 percent. Mandovi sunset cruises suspend operations until October. Floating casinos (Deltin Royale, Big Daddy) continue 24x7 but transfer-boat services from the jetty get cancelled on rough-water days. Restaurant trade thins to long-term locals — Black Sheep Bistro and Hospedaria Venite cut back to weekend service, Mum''s Kitchen and Viva Panjim hold lunch hours but skip dinner. The Sao Joao feast (June 24) is essentially a Siolim village affair; Panaji marks it minimally. Hotel rates at year-low: Panjim Pousada at ₹2.5-4k, The Bungalow Panaji at ₹2-3k. The trip you came for — Fontainhas walks, Mandovi cruises, casino-cruise pairings — does not work in June. October-November is the next coherent window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 800-1100mm rain. Fontainhas lanes flood. Skip.',
  NULL,
  'July is the wettest month at Panaji. The Latin Quarter''s narrow lanes flood, Mandovi cruises suspended, restaurant trade at year-low. The trip cannot happen in July. The next viable window is October.',
  'July in Panaji is the deepest of the Konkan monsoon. Rainfall averages 1,000mm across 26-28 wet days, daytime 24-29C, humidity at 92 percent. Fontainhas''s narrow lanes flood after every storm — drainage in the Latin Quarter is 18th-century Portuguese stone gutter, no match for 60mm-an-hour downpours. Mandovi cruises remain suspended. The municipal market behind Our Lady of the Immaculate Conception runs morning-only on dry windows. Black Sheep Bistro, Joseph Bar, Hospedaria Venite all cut to skeleton hours; Confeitaria 31 de Janeiro stays open but the morning bakery queue thins to neighbourhood regulars. Floating casinos (Deltin Royale, Big Daddy) keep 24x7 service via covered transfer boats from Panaji jetty when sea-state allows. Hotel rates at year-low (50 percent below February peak), but the city you came for is shut. Wait for October at minimum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 8, 1, 'skip',
  'Monsoon continues plus Ganesh Chaturthi shuts Hindu Goa for 11 days. 24-29C, 600-800mm rain. Skip.',
  NULL,
  'August holds July''s pattern with Ganesh Chaturthi (variable date, 11 days) shifting the local rhythm. Fontainhas remains flooded after storms, Mandovi cruises suspended. Bonderam on Divar (4th Saturday) is the one event worth the ferry across.',
  'August in Panaji runs the July pattern with marginally fewer extreme-rain days. Rainfall 600-800mm across 23-25 wet days. Ganesh Chaturthi (variable date, 11-day Hindu festival) shuts Hindu Goa for the duration — Mangueshi and Shantadurga temples in Ponda peak, Panaji business slows. The standout calendar entry is Bonderam (4th Saturday of August), the flag-festival on Divar Island — 1700s origin, miniature flag-floats, traditional Konkani bands; ferry from Old Goa or Panaji jetty to Divar runs 7am-7pm at ₹10. Mandovi cruises remain suspended through August. Hospedaria Venite, Mum''s Kitchen, Viva Panjim run reduced hours. Confeitaria 31 de Janeiro stays open but bebinca production drops to half normal volume. Floating casinos continue 24x7 weather permitting. Hotel rates at year-low: Panjim Pousada at ₹2.5-4k, The Bungalow Panaji at ₹2-3k. The trip works only for Bonderam-day visitors and casino regulars.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 9, 3, 'wait',
  'Monsoon withdrawing. 24-30C, 250-350mm rain. Mandovi cruises return Sep 25-30. Fontainhas walkable last week.',
  'September is the trickle back to walkable. Konkan monsoon withdraws around September 25-30, Mandovi cruises restart for the season, Fontainhas dries out within a week of the last sustained rain. Workable for the last week if dates are flexible.',
  'Early September is still rain-heavy. Mandovi cruises don''t return until late month, Fontainhas walks remain hit-or-miss with afternoon downpours. If your dates are in the first fortnight, push to mid-October.',
  'September in Panaji is the recovery month. Rainfall halves versus August to 250-350mm, mostly first half. By September 25-30 the southwest monsoon withdraws from the Konkan, Mandovi sunset cruises restart their season (Goa Tourism, ₹300, 6pm and 7pm departures from Santa Monica jetty), and Fontainhas''s narrow lanes dry out within a week. Daytime 25-30C, humidity easing to 75 percent. Hotel rates at Panjim Pousada (₹3-5k), The Bungalow Panaji (₹2.5-4k), Houseboat Mandovi (₹3-5k) sit 50 percent below February peak for the first 20 days, climbing 15-20 percent in the last week. Black Sheep Bistro and Hospedaria Venite return to full weekday hours. Confeitaria 31 de Janeiro''s 7am bakery queue rebuilds. Floating casinos (Deltin Royale, Big Daddy) at full transfer-boat schedule. The smart traveler''s call: September 22 to October 5 — Panaji at year-best green, before the October-Diwali rush.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 10, 4, 'go',
  'Season opens. 23-31C, post-monsoon green, 100-150mm light rain. Fontainhas walks back online.',
  'October is the proper season-opener for Panaji. Monsoon retreats, Fontainhas dries out, Mandovi cruises run full schedule. Hotel rates 25-30 percent below January peak. Diwali week brings a 5-day bump.',
  NULL,
  'October in Panaji is when the city returns to full coherence. Rainfall 100-150mm — almost all in the first 10 days as the monsoon retreats — and daytime 24-31C, humidity falling toward 75 percent. Fontainhas walks return to all-day workable, the laburnum and gulmohar canopy on Rua de Ourem deepens into post-monsoon green, and the lanes between Cunha Rivara Road and 31st January Road dry out within a week. Mandovi sunset cruises run full schedule (6pm and 7pm departures from Santa Monica jetty, ₹300). Hospedaria Venite, Mum''s Kitchen, Black Sheep Bistro, Joseph Bar all back at full hours. Confeitaria 31 de Janeiro''s 6:30am bakery queue rebuilds — bebinca production at full volume by mid-month. Hotel rates at Panjim Pousada (₹4-7k), The Bungalow Panaji (₹3-5k), Houseboat Mandovi (₹3.5-7k) sit 25-30 percent below January peak. Diwali week (variable date) brings a 5-day domestic-tourist bump. Floating casinos at full 24x7 capacity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 11, 5, 'go',
  'Peak builds. 21-30C, dry. GAFF arts festival mid-month. International Film Festival of India 9-day run late November.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, days at 30C, walking conditions ideal. The Goa Arts and Literature Festival (GAFF) runs mid-month at Sunaparanta. The International Film Festival of India (IFFI), 9 days late November, takes over Kala Academy and Inox.',
  NULL,
  'November in Panaji is the year''s second-peak month behind January. Rainfall under 50mm with most of it in the first week. Daytime 23-30C, nights 21C, humidity dropping under 70 percent. The Goa Arts and Literature Festival (GAFF, variable mid-November dates) runs 4 days at Sunaparanta Goa Centre — talks, readings, panels with hotel and venue tickets ₹500-2,000. The International Film Festival of India (IFFI) takes over Kala Academy, Inox Panaji, and the Maquinez Palace 9 days late November — Goa Tourism distributes 200-odd press passes; public delegate fees ₹1,000-2,500. Hotel rates climb sharply during IFFI: Panjim Pousada to ₹6-9k, The Bungalow Panaji to ₹5-8k. Outside the festival window, walking-tour conditions are the year''s second-best. Confeitaria 31 de Janeiro at full bakery hours, Black Sheep Bistro fully booked weekends. Floating casinos at saturation Friday-Sunday. Strong call for the first-time traveler outside IFFI dates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('panaji', 12, 5, 'go',
  'Peak peak. 19-30C, dry. Goa Liberation Day Dec 19 parade. Christmas-NY Dec 22-Jan 5 gridlock and 3x rates.',
  'December is the operational peak. Goa Liberation Day (December 19) brings a parade through Panaji. Christmas-NY (December 22-January 5) is gridlock — hotel rates triple, Calangute-Baga road jams reach NH-66, casino transfer-boats book 4-6 weeks ahead. Carol services at the Church of Our Lady of the Immaculate Conception draw thousands.',
  NULL,
  'December in Panaji is the operational peak of the Goa year. Daytime 22-30C, nights 19C, rainfall under 30mm. Goa Liberation Day (December 19, public holiday) brings a parade up 18th June Road and a public address at Azad Maidan. From December 22 to January 5, Christmas-NY congestion sets in: hotel rates triple (Panjim Pousada to ₹15-22k, The Bungalow Panaji to ₹10-15k, Taj Vivanta Panaji to ₹25-40k), Calangute-Baga road jams reach NH-66 and the Mandovi bridge, and floating-casino transfer-boats need 4-6 week lead booking. Carol services at the Church of Our Lady of the Immaculate Conception (December 24 evening, December 25 dawn Mass at 6am) draw 3,000-5,000 worshippers. Black Sheep Bistro and Hospedaria Venite fully booked from December 20. Confeitaria 31 de Janeiro''s bebinca production runs at year-peak — pre-orders close December 20. The smart window: December 8-21, after the Old Goa St. Francis Xavier rush and before Christmas-week rates. Floating casinos at saturation 24x7.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
