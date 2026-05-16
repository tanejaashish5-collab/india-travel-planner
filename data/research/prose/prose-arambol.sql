-- Arambol destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: arambol

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 1, 5, 'go',
  'Peak Konkan winter. 21-31C, dry. Drum circles at Sweet Lake nightly. Last hippie holdout running.',
  'January is Arambol''s strongest stretch. Daytime 21-31C, sea calm, Sweet Lake (the freshwater pond 800m north of the main beach) hosts drum circles at sunset every night. Paragliding off the headland operates 9am-5pm, ₹3,000-3,500 per tandem flight.',
  NULL,
  'Arambol in January runs as the trip the holdouts still come for. Daytime 22-31C, nights drop to 19-21C, the sea sits at 26C and the curving cliff bay is at its calmest of the year. Sweet Lake — the freshwater pond fed by underground springs, 800m north of the main beach across a rocky headland trail — hosts a 50-80 person drum circle every evening from 5pm; mud bath in the lake itself runs all afternoon. Kalacha Beach further north is a 25-minute scramble. Paragliding off the Arambol headland operates 9am-5pm weather permitting (₹3,000-3,500 tandem, 8-12 minute flight) — Goa Aero Club is the licensed operator, book at the cliff-edge desk same morning. Otherworld Arambol (₹8-15k, the boutique anchor) and Arambol Beach Homestay (₹2-4k) hold listed rates from January 5 once Christmas-NYE pricing eases. Susegad Rooms (₹2.5-4.5k) and Banyan Retreat (₹4-8k) walk-in mid-week. Beach yoga sessions on the sand 7-9am are a 40-year fixture; check the chalkboards near Beach Road.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 2, 5, 'go',
  'Driest month. 22-32C. Long-stay yoga residencies peak. Beach traffic still under Anjuna-Vagator levels.',
  'February is Arambol''s cleanest weather window. Rainfall under 5mm, low humidity, beach uncrowded by north-Goa standards. Yoga residencies (Himalaya Yoga Valley, Surya School) run their full February-March cohorts; trapeze and slackline workshops on the sand most evenings.',
  NULL,
  'February in Arambol is the trip''s cleanest stretch. Rainfall averages under 5mm, daytime 22-32C, humidity at 60 percent. The 2km curving beach holds 1,000-1,500 visitors at peak (versus 5,000+ at Calangute-Baga the same hour) — Arambol stays the calmer end of north Goa. Sweet Lake drum circles run nightly; the cliff trail north to Kalacha Beach is dry and walkable in flip-flops, allow 25 minutes one-way. Long-stay yoga residencies — Himalaya Yoga Valley, Surya School of Yoga — run their February-March cohorts at ₹40k-80k all-inclusive for 200 hours over four weeks. Slackline and trapeze workshops run on the sand 4-7pm most weekdays. Otherworld Arambol holds peak walk-in at ₹14-15k; Banyan Retreat and Susegad Rooms cover the ₹3-7k slot. Sunset paragliding has firm bookings 1-2 days ahead. Carnival float parade reaches Mapusa (10km, 20 minutes by scooter) on the Monday — closer than Panaji.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 3, 4, 'go',
  'Last cool window. 23-33C. Long-stay residencies wind down. Hotel rates slide 20 percent.',
  'March extends February''s weather minus the residency crush. Hotel rates slide 20 percent, drum circle attendance halves to 30-40 people. Last comfortable month before April pre-monsoon humidity arrives.',
  NULL,
  'March in Arambol is the soft-landing month. Daytime 24-33C, humidity climbing toward 70 percent in the last week, sea still at 28C. Long-stay yoga residencies finish their final cohorts of the season — Himalaya Yoga Valley''s last 200-hour intake closes mid-March, then the school shuts till October. Drum circle attendance at Sweet Lake halves to 30-40 people; the through-traveler scene gives way to long-stay returnees and last-week packers. Otherworld Arambol drops walk-in to ₹10-12k from February''s ₹14-15k. Susegad Rooms (₹2.5-4.5k) and Arambol Beach Homestay (₹2-4k) sit at half-occupancy on weekdays. Paragliding still operates but afternoon thermal conditions get patchy from week three. Cliff-trail walk to Kalacha Beach remains dry and clean. Last comfortable beach-and-yoga window before pre-monsoon humidity collapses the trip in April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 4, 2, 'wait',
  'Pre-monsoon heat. 25-35C, humidity 75 percent. Yoga schools closed. Beach time narrows to 6-9am, 5-9pm.',
  'April still works for travelers prioritising solitude over comfort. Yoga schools closed, drum circle thinned to under 20 people. Hotel rates 30-35 percent below February peak.',
  'April pushes Arambol into pre-monsoon stress. Yoga schools closed, drum circles thinned, beach time collapses past 10am. Cliff-trail walk to Kalacha gets uncomfortable. Wait for late October.',
  'April in Arambol is when the trip narrows to a sliver. Daytime 26-35C, humidity at 75 percent and rising, sea temperature 29C and not cooling. Yoga schools — Himalaya Yoga Valley, Surya School, Brahmani Yoga — all closed since March 25. Drum circle at Sweet Lake thins to under 20 people, mostly long-stay residents. The cliff-trail walk to Kalacha Beach gets uncomfortable past 10am — the rocky headland radiates heat. Beach time compresses to 6-9am and 5-9pm. Otherworld Arambol drops walk-in to ₹7-9k; Banyan Retreat (₹3-5k) and Susegad Rooms (₹2-3k) are the better-value options. Paragliding still runs morning slots but afternoon thermals shut by 1pm. Beach shacks remain open till May 31 forest-dept deadline. Friday-Sunday Mumbai-Pune-Bangalore traffic still flows; weekday Arambol is at year-low energy.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 5, 2, 'wait',
  'Peak heat. 26-36C, humidity 80 percent. Shacks dismantle May 31. Pre-monsoon thunder weeks 3-4.',
  'May is the closing month. Shacks dismantle May 31 forest-dept rule, pre-monsoon thunder hits last 10 days. Hotel rates at year-low but the trip you came for is winding down.',
  'May runs hot and sticky. Sea bathing collapses past 9am, shacks dismantle May 31. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the last fortnight. Wait for October.',
  'May in Arambol is the last chapter before the southwest monsoon. Daytime 27-36C, humidity 80 percent, sea at 30C. The forest-department deadline closes all 50-odd Arambol-Mandrem-Morjim shacks by midnight May 31. Drum circle at Sweet Lake stops by mid-month — the regular drummers ship to Manali, McLeod Ganj, or onward. Pre-monsoon thunderstorms hit weeks three and four as 30-90 minute evening squalls; grid power cuts run 2-4 hours after each storm at the smaller guesthouses without inverters. Otherworld Arambol holds at ₹7-8k; Susegad Rooms drops to ₹1.8-2.5k. Arambol Beach Homestay closes for the monsoon by May 25 most years. Cliff-trail to Kalacha closed in heavy weather — loose laterite gets dangerous. Paragliding suspended after May 20. The trip Arambol sells — drum circles, yoga, calm-bay sea, paragliding — is winding down to nothing through May. Wait for mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 6, 1, 'skip',
  'SW monsoon arrives June 10. 24-30C, 700-800mm rainfall. Beach unusable. Skip.',
  NULL,
  'June is when the southwest monsoon arrives and the Arambol trip stops working. Shacks closed since May 31, drum circles ended, yoga schools shut, paragliding suspended. Beach unsafe for swimming, cliff trails closed.',
  'June in Arambol is when the southwest monsoon takes over. The current arrives around June 10 and dumps 700-800mm of rain across 22-25 wet days. All shacks dismantled since May 31. Beach itself becomes unusable — the calm horseshoe bay turns into rough surf with 30-50km/h onshore winds, and the Goa Tourism advisory prohibits swimming. Sweet Lake drum circle ended in mid-May; yoga schools shuttered since March. Paragliding suspended for the season. Otherworld Arambol stays open year-round (₹6-8k monsoon walk-in versus ₹14k peak); the boutique-resort end of the village runs at 30 percent occupancy on cheap weekend Mumbai traffic. Banyan Retreat shuts entirely June through September. Cliff trail to Kalacha closed by Goa Forest Dept — the laterite gets unstable. The trip Arambol sells — yoga, drum circle, paragliding, calm-bay swim — runs at zero. Next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Beach closed, shacks closed. Skip.',
  NULL,
  'July is the wettest month at Arambol. Rainfall hits 900-1100mm. The cliff-bay sand width loses 30-40m to surf erosion. Trip you came for runs at zero capacity. Wait for October.',
  'July in Arambol is monsoon at full strength. Rainfall averages 900-1100mm over 26-28 wet days. The horseshoe bay loses 30-40m of sand width to heavy surf erosion — recovery happens slowly through October. Sea swimming is prohibited under Goa Tourism advisory; lifeguards stay off-duty for the season. The cliff trail to Kalacha Beach is officially closed by Goa Forest Department — laterite slope instability has caused two rescue incidents in past Julys. Sweet Lake itself is fine but reaching it requires a 1km wade through knee-deep mud. Drum circles, yoga schools, paragliding all closed. Otherworld Arambol the only stay running near full capacity (around 50-60 percent on cheap-monsoon weekend traffic from Mumbai-Pune); Susegad Rooms holds 30 percent. Banyan Retreat closed through monsoon. The trip Arambol sells is closed in July. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 500-700mm rain. Beach closed. Skip.',
  NULL,
  NULL,
  'August in Arambol is more of July with the worst of the southwest current beginning to ease in the final week. Rainfall 500-700mm across 22-25 wet days. Beach swimming still prohibited under advisory. Cliff trail to Kalacha still closed. Sweet Lake remains accessible only on dry windows but drum circle culture is dormant — the regular drummers won''t return until October. Goa-wide monsoon-season offerings (Bonderam on Divar Island, Ganesh Chaturthi spice-plantation tours) are real but they''re not Arambol trips — base in Panaji or Old Goa for those. Otherworld Arambol around 40-50 percent occupancy on Friday-Sunday weekend traffic; Banyan Retreat and Arambol Beach Homestay closed entirely. The trip you came for is closed in August. Push to October when the cliff-bay sand rebuilds and the drum circle culture returns.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 9, 2, 'wait',
  'Monsoon retreat. 24-31C, 250-300mm rain. Shacks rebuild for Oct 1. Yoga schools still closed.',
  'September is the recovery month. SW monsoon retreats through the second half, shack frames go up. Yoga schools and paragliding still closed. Push to mid-October for full opening.',
  'September is rebuild-not-yet-open month. Beach still rough, shacks under construction, drum circle silent. Yoga schools reopen only October-November. Wait two-three weeks.',
  'September in Arambol is the trickle back. Rainfall drops to 250-300mm across 14-16 wet days, mostly first half. The southwest monsoon retreats from the Konkan coast around September 25-30. Shack-building crews from inland Goa and Karnataka start rebuilding the 50-odd Arambol-Mandrem-Morjim structures from September 15 onwards for the October 1 statutory opening. Beach itself is still rough through the first three weeks; sand width slowly rebuilding. Cliff trail to Kalacha reopens unofficially in the last week. Drum circle at Sweet Lake won''t return until October. Yoga schools won''t reopen until late October-early November. Otherworld Arambol walks-in at ₹6-8k; Susegad Rooms at ₹2-2.5k. The smart traveler''s call is to wait for the October 5-15 window — full shacks, calm sea, off-peak rates, drum circle returning. September gives a 3-day sample at best.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 10, 4, 'go',
  'Season opens Oct 1. 24-32C, 100-150mm late-monsoon spillover. Shacks rebuilt, drum circle returns mid-month.',
  'October is the season-opener at Arambol. All shacks open from October 1, drum circle at Sweet Lake returns mid-month, paragliding restarts week three. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Arambol is the proper return. The October 1 statutory date opens all shacks; drum circle at Sweet Lake returns by October 15 once the regular drummers fly back from Manali and McLeod Ganj. Late-monsoon spillover still drops 100-150mm of rain (mostly first 10 days) but sea state stabilises by October 10-12. Daytime 25-32C, humidity falling from 80 to 70 percent, sea at 28C. Cliff trail to Kalacha Beach reopens. Paragliding restarts in the third week as thermal conditions normalise. Yoga schools — Himalaya Yoga Valley, Surya School — open their first 200-hour cohorts of the season from late October-early November (book 4-6 weeks ahead at himalayayogavalley.com or surya-yoga.com). Otherworld Arambol walks-in at ₹8-10k; Banyan Retreat at ₹4-5k from a December peak of ₹7-8k. Strong value window — peak weather coming online, peak prices still 6 weeks away.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 11, 5, 'go',
  'Peak builds. 22-31C, rainfall under 30mm. Yoga residencies start, paragliding at full thermal.',
  'November is the proper pivot to peak season. Rainfall under 30mm, yoga schools (Himalaya Yoga Valley, Surya, Brahmani) running their first cohorts, paragliding at full thermal-window operation, drum circle at full attendance.',
  NULL,
  'November in Arambol is the year''s second-peak month behind January. Rainfall under 30mm, daytime 23-31C, sea at 27C, humidity dropping below 70 percent. Yoga schools — Himalaya Yoga Valley, Surya School of Yoga, Brahmani Yoga — run their first 200-hour cohorts of the season; mixed-residential pricing ₹40-80k for four weeks. Drum circle at Sweet Lake hits 60-100 attendees nightly from November 15 once Israeli, Russian, and seasonal-cycle drummers return. Paragliding operates 9am-5pm at full thermal capacity (₹3,000-3,500 tandem). Cliff trail to Kalacha at peak walking conditions. Otherworld Arambol climbs to ₹11-13k; Banyan Retreat at ₹6-7k; Susegad Rooms at ₹3-4k; Arambol Beach Homestay holds at ₹2.5-3.5k. Christmas-week rates kick in around November 25. Strong call for first-time Arambol visitors — peak weather, full programme, prices still 25-30 percent below late-December.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('arambol', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE rates 2x. Drum circle at full capacity, yoga schools full.',
  'December is when Arambol runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2x normal, drum circle at year-peak attendance (150-200 people), all yoga schools at full residential capacity. NYE party at Sweet Lake pulls 500+.',
  NULL,
  'December in Arambol is the operational peak. Daytime 22-30C, nights 19-21C, rainfall under 20mm, sea calm and bathable all month. The Christmas-NYE corridor (December 22 to January 5) sees hotel rates climb to 2x the November baseline: Otherworld Arambol hits ₹14-15k peak from a November ₹11-13k; Susegad Rooms ₹4-4.5k; Arambol Beach Homestay ₹3.5-4k. Drum circle at Sweet Lake hits year-peak 150-200 attendees nightly through Christmas week; the December 31 NYE gathering pulls 500+ to the lake-and-beach intersection. Yoga schools run at full residential capacity — Himalaya Yoga Valley''s December intake books out 6-8 weeks ahead. Paragliding at full operating window 9am-5pm; afternoon slots tighten to 2-3 day booking lead. Cliff trail to Kalacha walks at year-peak with 200-300 traffic. The first three weeks of December (before December 22) are the better-value window — full Arambol minus the NYE rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
