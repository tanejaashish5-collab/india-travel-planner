-- Kannur destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala North Malabar batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kannur | best_months 11-5 (Theyyam season Oct-May) | avoid 6-10

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 1, 5, 'go',
  'Peak Theyyam season. 22-31C, dry. Village calendars run nightly across Kannur district. Parassinikkadavu twice daily.',
  'January is when Kannur Theyyam runs at its widest. Village-temple calendars (a different shrine each night across the 100-village circuit) plus Parassinikkadavu Muthappan Temple''s daily 5am and 5:30pm performances. Kerala Tourism Theyyam calendar (keralatourism.org) lists current dates.',
  NULL,
  'Kannur in January is the heart of the Theyyam circuit. Daytime 22-31C, nights drop to 21C, humidity below 70 percent — comfortable for the all-night village-temple performances that define the Kannur experience. Parassinikkadavu Muthappan Temple (18km north of Kannur city) runs Theyyam daily at 5am and 5:30pm, the only daily venue in Kerala — free entry, donation box, no advance booking. The wider 100-village circuit runs nightly across Kannur district from October through May; Kerala Tourism (keralatourism.org) maintains a current Theyyam calendar that the local DTPC office updates weekly. The 1,000-year-old ritual art form runs ~400 distinct theyyams; arrive at the host shrine by 6pm for the make-up application. St. Angelo Fort (1505 CE Portuguese, taken Dutch then British) opens 8am-6pm, ₹25. Muzhappilangad Drive-in Beach (4km, India''s longest drive-in) runs all day. Kalpaka Restaurant in Kannur city anchors Malabar biriyani; Mappila Square (heritage Mappila eatery, near city centre) serves Kuzhi Mandi 12-3pm and 7-10pm. Kannur Airport (CNN) 25km, NH-66 connects to Bekal 90km north.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 2, 5, 'go',
  'Driest month. 23-32C. Theyyam village circuit at peak intensity. Drive-in Beach traffic moderate.',
  'February is the cleanest weather window of the Theyyam season. Rainfall under 10mm, low humidity, full village-temple calendar across the district. Parassinikkadavu Muthappan twice-daily performances at full attendance.',
  NULL,
  'February in Kannur is the technical peak of Theyyam season. Rainfall under 10mm, daytime 23-32C, humidity at 65 percent. The 100-village Theyyam circuit runs at maximum intensity — a different temple''s annual celebration each night somewhere in Kannur or adjacent Kasaragod district. Kerala Tourism (keralatourism.org) and the Kannur DTPC publish the live performance calendar weekly. Parassinikkadavu Muthappan Temple at 18km north of Kannur city runs daily 5am and 5:30pm performances — free entry, no booking. St. Angelo Fort (1505 Portuguese, then Dutch 1663, then British 1790, ASI-protected) opens 8am-6pm at ₹25 entry, the laterite-and-sea views run cleanest at 4pm. Muzhappilangad Drive-in Beach (4km, India''s longest drive-in) runs all year but February is its driest month — entry by car ₹100. Mascot Beach Resort, Kairali Heritage and Theyyam-village homestays (Vembanad-ranged Tharavad-style) run ₹4-12k walk-in. Kalpaka Restaurant breakfast 7am, Mappila Square evening Mandi 7-10pm. Kannur Airport (CNN) 25km via NH-66.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 3, 4, 'go',
  'Theyyam continues. 24-33C, humidity climbing. Village-circuit nights still cool but daytime sightseeing thins.',
  'March extends February''s Theyyam programme with rising daytime heat. Village-temple performances run cool 5pm-5am — heat is irrelevant to the night ritual. Daytime fort-and-beach circuit collapses past 11am. Hotel rates drop 25 percent versus February peak.',
  NULL,
  'March in Kannur is when the Theyyam season runs into the hot-month wall on the daytime side. Daytime 25-33C, humidity climbing toward 75 percent, but the village-temple Theyyam performances run from 5pm through dawn in the cool of the laterite courtyards — the heat is irrelevant to the ritual. The Kannur DTPC and Kerala Tourism (keralatourism.org) Theyyam calendar holds full programming through March. Parassinikkadavu Muthappan Temple continues twice-daily 5am and 5:30pm performances — no advance booking, free entry. St. Angelo Fort interior works 7am-10am and 4pm-6pm; the open laterite walking circuit collapses past 11am. Muzhappilangad Drive-in Beach (4km) is best 6am-9am or 5pm-7pm; mid-day sand temperatures spike past 50C. Walk-in rates at Mascot Beach Resort drop 25 percent versus February (₹4-7k), Kairali Heritage and Tharavad-style homestays ₹3-6k. Kalpaka and Mappila Square hold full hours. Kannur Airport (CNN) 25km. Plan day trips to Bekal (90km north) or Wayanad (130km southeast) only after 4pm cooling.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 4, 4, 'go',
  'Late-Theyyam window. 26-35C, humidity 75 percent. Vishu Apr 14 stops Theyyam circuits 24h. Heat-tolerant only.',
  'April is the late-Theyyam window — village calendars thin out in the second fortnight, but Parassinikkadavu Muthappan continues daily. Vishu (April 14, Malayalam new year) shuts village-temple Theyyam circuits for 24-48 hours. Heat-tolerant travelers only.',
  NULL,
  'April in Kannur is the late-season Theyyam window — performances run lighter through the month and the daytime trip falls to dawn-and-dusk only. Daytime 27-35C, humidity 75-80 percent. The village-temple Theyyam calendar (Kerala Tourism / keralatourism.org) thins from the second fortnight as Vishu (April 14, Malayalam new year) creates a ritual pause — most circuits suspend programming for 24-48 hours around the festival. Parassinikkadavu Muthappan Temple continues its daily 5am and 5:30pm performances throughout — the only Kerala venue with no Vishu pause. The 5am show is the cooler of the two and far less crowded; the 5:30pm summer show runs in the courtyard of the temple''s laterite walls which hold their thermal-sink coolness. St. Angelo Fort interior holds 26-28C against 35C outside, but the open laterite walks are unworkable past 10am. Muzhappilangad Drive-in Beach is dawn-only April. Walk-in rates at Mascot Beach Resort drop 30 percent versus February (₹3-6k), Theyyam-village Tharavad homestays ₹2-5k. Kannur Airport (CNN) 25km, Kalpaka and Mappila Square hold full hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 5, 4, 'go',
  'Last Theyyam window. 27-36C, humidity 80 percent. Most village calendars wind down. Parassinikkadavu daily continues.',
  'May is the closing month for village Theyyam — most temple-festival circuits wind down by mid-May before the SW monsoon. Parassinikkadavu Muthappan Temple''s daily 5am and 5:30pm performances continue right through monsoon. Last working Theyyam-and-beach window of the year.',
  NULL,
  'May in Kannur is the closing chapter of the Theyyam season on the village-temple side. Daytime 28-36C, humidity 80 percent, sea temperature 30C, the third week brings pre-monsoon thunderstorms that knock grid power 1-3 hours each afternoon. The Kerala Tourism Theyyam calendar (keralatourism.org) shows the village-circuit programming winding down through the first 15 days; by month-end most temple-festival schedules are paused for the monsoon-resume in October-November. Parassinikkadavu Muthappan Temple is the singular exception — the 5am and 5:30pm daily performances continue right through May, June, July, monsoon and all. St. Angelo Fort interior runs 7am-10am and 5pm-6pm only — daytime laterite walking is unworkable. Muzhappilangad Drive-in Beach (4km, India''s longest drive-in) is dawn-only at this temperature; mid-day sand reaches 55C. Walk-in rates at Mascot Beach Resort run year-low (₹3-5k), Kairali Heritage and Tharavad homestays ₹2-4k. Kannur Airport (CNN) 25km. The last working window of the season — push to October-November if Theyyam isn''t the trip''s anchor.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 6, 1, 'skip',
  'SW monsoon. 24-30C, 700-900mm rain. Theyyam village circuit closed for season. Beach forbidden. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Malabar coast. Village-temple Theyyam circuits closed for the season. Muzhappilangad Drive-in Beach unsafe (sand churns, sea forbidden), St. Angelo Fort exterior shut on heavy-rain days. Only Parassinikkadavu Muthappan continues twice daily.',
  'June in Kannur is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days. Daytime 25-30C, humidity 90 percent. The 100-village Theyyam temple-festival circuit closes for the monsoon — the next village programming resumes around mid-October. Parassinikkadavu Muthappan Temple is the only continuous Theyyam venue: daily 5am and 5:30pm performances run through monsoon, donation box, free entry. Muzhappilangad Drive-in Beach (4km) is unsafe — Kerala Tourism issues a sea-state advisory, lifeguards withdraw, sand width loses 20-30m to surf. St. Angelo Fort interior remains open at ₹25 but exterior laterite walking shuts on heavy-rain days. Kannur Airport (CNN) 25km flights run normally. Walk-in rates at Mascot Beach Resort run year-low (₹3-5k); Karkidakam Ayurveda packages (mid-July to mid-August) start drawing the medicine-tourism segment to a few resorts. The Theyyam-and-beach trip is closed in June. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Karkidakam Ayurveda window starts mid-July. Skip standard trip.',
  NULL,
  'July is the wettest month of the Malabar year. The Theyyam-and-beach trip is closed; only Parassinikkadavu Muthappan Temple twice-daily continues. Karkidakam Ayurveda month (mid-July to mid-August) is the one specialised draw — but for a different traveler.',
  'July in Kannur is the wettest stretch of the Malabar year. Rainfall averages 900-1100mm over 26-28 wet days. Daytime 25-29C with humidity at 90 percent. The village-temple Theyyam circuit remains closed for monsoon. Parassinikkadavu Muthappan Temple continues its daily 5am and 5:30pm performances — the laterite courtyard holds despite the rain — and a wet July visit to the temple is one of the more atmospheric versions of the Theyyam experience. Muzhappilangad Drive-in Beach unsafe — Kerala Tourism advisory holds, lifeguards stay off, sea bathing prohibited. St. Angelo Fort interior at ₹25 entry remains technically open; exterior walking shuts on heavy-rain days. Karkidakam (mid-July to mid-August in the Malayalam calendar) is the traditional Ayurveda month — a different traveler with 14-21-day Karkidaka Chikitsa packages at long-stay resorts (Kairali, certain Tharavad-converted homestays). Walk-in rates at Mascot Beach Resort and Kairali Heritage run year-low (₹3-5k). The standard Theyyam-and-fort-and-beach trip is closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 8, 2, 'wait',
  'Monsoon continues. 24-29C, 600-800mm rain. Onam Aug-Sep brings cultural events. Theyyam still off-season.',
  'August holds July''s rain pattern with marginally fewer extreme-rain days. Onam (Atham→Thiruvonam, variable date Aug-Sep) brings 10 days of pookalam, sadhya, snake-boat-race programming statewide. Theyyam village circuit still closed; Parassinikkadavu daily continues.',
  'August is monsoon-thick at Kannur. The Theyyam village circuit doesn''t resume until mid-October. Sea bathing forbidden, fort exterior closed slippery on most days. Onam programming is real but is a Kerala-wide event, not specifically Kannur-anchored. Push to late October.',
  'August in Kannur runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — pookalam flower carpets in homes and public courtyards, sadhya feasts, the Nehru Trophy snake-boat race in Alleppey on the second Saturday. Kannur observes Onam with home-and-temple programming but is not a snake-boat-race centre. The village-temple Theyyam circuit remains closed for monsoon — next programming resumes around mid-October. Parassinikkadavu Muthappan Temple continues twice-daily performances. Muzhappilangad Drive-in Beach unsafe under Kerala Tourism advisory. Walk-in rates at Mascot Beach Resort and Kairali Heritage run year-low (₹3-5k). Karkidakam Ayurveda packages (mid-July to mid-August) end mid-month. Kannur Airport (CNN) 25km, full schedules. The standard Theyyam-and-fort trip remains closed in August. Push to late October when programming resumes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 9, 2, 'wait',
  'Monsoon retreating. 24-31C, 250-400mm rain. Theyyam still off-season. Beach rough through most of month.',
  'September is recovery month. Monsoon withdraws around September 25-30, but the Theyyam village circuit doesn''t resume until mid-October. Beach calms in last week. Push to late October.',
  'September is rebuild-not-yet-open month. Theyyam village programming resumes mid-October, not before. Sea remains rough through three weeks. Push to late October when the full Theyyam-and-beach trip comes back online.',
  'September in Kannur is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-31C, humidity finally easing toward 80 percent. The southwest monsoon retreats from the Malabar coast around September 25-30 (IMD declares formal withdrawal). The village-temple Theyyam circuit, however, doesn''t resume programming until mid-October — most temple-festival calendars start their new season at the post-monsoon point of dryness. Parassinikkadavu Muthappan Temple continues its daily 5am and 5:30pm performances throughout. St. Angelo Fort interior remains open at ₹25; exterior laterite walking comes back online by the third week. Muzhappilangad Drive-in Beach lifeguard service returns in the last fortnight. Walk-in rates at Mascot Beach Resort climb 15-20 percent versus August (₹4-6k), Kairali Heritage and Tharavad homestays ₹3-6k. Kannur Airport (CNN) 25km. The smart traveler''s call is to wait for the October 20-31 window — full Theyyam programming, calm sea, off-peak rates. September is a Parassinikkadavu-only sample.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 10, 4, 'go',
  'Theyyam season opens. 24-31C, 100-200mm late rain. Village circuit resumes mid-month. Hotel rates 25-30 percent below peak.',
  'October is the proper season-opener for Kannur Theyyam. Village-temple circuits resume programming from mid-month as post-monsoon dryness sets in. Kerala Tourism (keralatourism.org) calendar fills out by October 25. Parassinikkadavu daily continues throughout.',
  NULL,
  'October in Kannur is when the Theyyam season returns to coherent. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the Kerala Tourism (keralatourism.org) Theyyam calendar starts populating from mid-month as post-monsoon dryness sets in across the Kannur 100-village circuit. By October 25, the village-temple programming is at meaningful density. Parassinikkadavu Muthappan Temple continues its daily 5am and 5:30pm performances throughout — uninterrupted across the year. St. Angelo Fort (1505 Portuguese, ASI-protected) returns to full 8am-6pm operation at ₹25 entry, exterior laterite walking firm by mid-month. Muzhappilangad Drive-in Beach (4km) returns to lifeguard cover 9am-5pm. Daytime 25-31C, humidity falling toward 78 percent, sea temperature 28C. Walk-in hotel rates run 25-30 percent below January peak: Mascot Beach Resort ₹6-9k, Kairali Heritage ₹5-8k, Tharavad homestays ₹3-6k. Kalpaka and Mappila Square hold full hours. Kannur Airport (CNN) 25km via NH-66.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Theyyam at full village density. Parassinikkadavu twice daily. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak Theyyam. Rainfall under 50mm, full village-circuit programming, and the daytime fort-and-beach trip works alongside the night ritual. Kerala Tourism (keralatourism.org) Theyyam calendar at full density.',
  NULL,
  'November in Kannur is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, sea temperature 27C, humidity dropping under 70 percent. The 100-village Theyyam circuit runs at full programming density — Kerala Tourism (keralatourism.org) and Kannur DTPC publish the daily calendar a week ahead. Parassinikkadavu Muthappan Temple holds twice-daily 5am and 5:30pm performances. The village-temple sequence pulls long-stay travelers and Theyyam-circuit photographers; lock 2-3 nights at a Tharavad homestay or Kairali Heritage to walk into 3-4 different shrines per stay. St. Angelo Fort (1505 Portuguese, ASI-protected, ₹25 entry, 8am-6pm) is at its photographic best — laterite stone deep against the post-monsoon-rinsed sky. Muzhappilangad Drive-in Beach (4km, ₹100 car entry, lifeguards 9am-5pm) is at year''s clearest sand. Walk-in rates at Mascot Beach Resort climb to ₹7-11k, Kairali Heritage ₹6-10k, Theyyam-village Tharavad homestays ₹4-7k — still meaningfully below December 22-January 5 peak. Kalpaka opens 7am, Mappila Square Mandi 12-3 and 7-10pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kannur', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE Dec 22-Jan 5 doubles rates. Theyyam at full village density.',
  'December is when Kannur runs at full capacity — Theyyam plus Christmas-NYE traffic. Hotel rates 2-2.5x normal Dec 22-Jan 5; the first three weeks (Dec 1-21) are the better-value window. Village-circuit programming at full density.',
  NULL,
  'December in Kannur is the operational peak. Daytime 22-30C, nights 21C, rainfall under 30mm. The 100-village Theyyam circuit runs at full programming density — Kerala Tourism (keralatourism.org) calendar publishes a fresh weekly listing of which temples stage which Theyyam on which night. Parassinikkadavu Muthappan Temple holds its daily 5am and 5:30pm shows. Mascot Beach Resort, Kairali Heritage, and Tharavad-converted homestays in Pazhayangadi and Kunnathurmedu hit peak rates from December 22: Mascot ₹14-20k, Kairali ₹12-18k, Tharavad ₹8-13k — versus November''s ₹7-11k and ₹6-10k. The first three weeks (December 1-21) are the better-value window — peak Theyyam, peak weather, rates 30-40 percent below Christmas-NYE numbers. St. Angelo Fort (1505 Portuguese, ₹25 entry, 8am-6pm) at its photographic best. Muzhappilangad Drive-in Beach (4km, ₹100 car entry, lifeguards 9am-5pm) at year''s most popular — arrive before 10am. Kalpaka and Mappila Square want 1-2 day reservation lead from December 18. Kannur Airport (CNN) 25km — book transfers 5 days ahead through Christmas week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
