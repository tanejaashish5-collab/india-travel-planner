-- Poovar destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala South Coast batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: poovar | best_months 10-3 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 1, 5, 'go',
  'Peak boat-access window. 22-30C, dry. Estuary calm. Poovar Island Resort and Estuary Island Resort full operations.',
  'January is when Poovar runs at its strongest. Daytime 22-30C, dry, Neyyar-Arabian Sea estuary calm. Poovar Island Resort and Estuary Island Resort boat shuttles 6am-10pm from Poovar jetty. Quiet alternative to Kovalam (11km north).',
  NULL,
  'Poovar in January is the version Kerala''s boat-access estuary delivers cleanly. Daytime 22-30C, nights 21C, the Neyyar River meets the Arabian Sea creating a 3km golden-sand-dune-and-mangrove pocket — almost unknown to mass tourists. The two main resorts (Poovar Island Resort, Estuary Island Resort) are boat-access only — shuttle from Poovar jetty operated by the resorts plus Kerala Tourism Development Corporation (KTDC) backwater boat services. 27km from Trivandrum (TRV airport 25km via NH-66, 45-minute taxi ₹800-1,200), 11km from Kovalam. The estuary at golden hour (5:30-6:30pm) runs cleanly visible coconut groves on one bank, mangroves on the other, calm water between. Poovar Island Resort floating cottages from ₹14-22k peak season; Estuary Island Resort from ₹12-18k. Mainland mid-tier hotels in Poovar village from ₹2-4k. The trip is most often paired with a single Trivandrum or Kovalam day-trip; a 2-3 night base here is the typical shape. Trivandrum International (TRV) 25km, taxi 45 minutes ₹800-1,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 2, 5, 'go',
  'Driest month. 23-31C. Estuary at year-calm. Resort boat shuttles full operation.',
  'February is the cleanest weather window. Rainfall under 5mm, humidity 65 percent, estuary at year-calm. Poovar Island Resort and Estuary Island Resort book 6-8 weeks ahead. Resort boat shuttles 6am-10pm from Poovar jetty.',
  NULL,
  'February in Poovar is the technical peak of the boat-access estuary year. Rainfall under 5mm, daytime 23-31C, humidity at 65 percent. The Neyyar River-Arabian Sea estuary runs at year-calm — golden sand dunes in the 3km mangrove-and-coconut-grove pocket are at clearest dry-month definition. Poovar Island Resort floating cottages and Estuary Island Resort''s lake-view rooms book 6-8 weeks ahead through February — walk-in rates: Poovar Island Resort ₹13-22k, Estuary Island Resort ₹11-18k, mainland mid-tier hotels in Poovar village ₹2-4k. Resort boat shuttles run 6am-10pm from Poovar jetty (operated by the resorts plus KTDC backwater services); arrival timing matters for the boat schedule. Backwater cruise day-trips (90-minute KTDC-licensed loops through the estuary mangroves at ₹400-600 per person) are best 7-9am or 4-6pm. The estuary stays 25-30 percent quieter than Kovalam''s Lighthouse Beach circuit — meditative rather than party-anchored. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi ₹800-1,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 3, 4, 'go',
  'Last cool window. 24-32C. Estuary calm. Hotel rates ease 25 percent versus February.',
  NULL,
  NULL,
  'March in Poovar is the soft-landing month before pre-monsoon humidity. Daytime 25-32C, humidity climbing to 75 percent in the last fortnight. The Neyyar-Arabian Sea estuary remains calm — late-March pre-monsoon currents start nudging the sand dunes but the 3km pocket holds shape through the month. Poovar Island Resort and Estuary Island Resort boat shuttles run 6am-10pm. Walk-in rates: Poovar Island Resort ₹10-16k, Estuary Island Resort ₹9-13k, mainland mid-tier hotels ₹1.5-3k. KTDC backwater cruise day-trips (90-minute loops through estuary mangroves at ₹400-600 per person) hold 7-9am and 4-6pm windows clean. The international long-stay rotation thins from mid-March as residency cycles end before the May heat. Last comfortable window before April pushes the trip into endurance shape — boat-access still works because the resorts run climate-controlled accommodation, but the open-deck shuttle ride past 11am collapses under the sun. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi ₹700-1,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 4, 3, 'wait',
  'Pre-monsoon heat. 26-34C, humidity 75 percent. Boat-access works but open-deck shuttle past 10am collapses.',
  'April still works for resort-pool-and-AC weekenders. Boat shuttles compress to dawn-and-dusk only. Vishu (April 14) is the only cultural anchor.',
  'April delivers the first wave of pre-monsoon humidity. Open-deck boat shuttles past 10am collapse, mangrove cruises mid-day uncomfortable, the open-water golden-hour window narrows.',
  'April in Poovar is when the boat-access trip narrows to early mornings, AC mid-days, and late evenings. Daytime 27-34C, humidity 75-80 percent. Resort boat shuttles compress to dawn-and-dusk schedules: Poovar Island Resort and Estuary Island Resort run 6-9am and 5-9pm without the open-deck heat-tax. KTDC backwater cruises hold 7-9am and 4-6pm windows. The estuary stays calm but the open-water glare past 11am is brutal — pool-and-AC mid-days dominate. Vishu (April 14, Malayalam new year) is observed across Kerala with the kanikkonna-flower Vishukani household ritual; resort restaurants stage Vishu Sadhya thalis at ₹600-1200 per banana-leaf plate. Walk-in rates drop 30 percent versus February peak: Poovar Island Resort ₹8-14k, Estuary Island Resort ₹7-11k, mainland mid-tier hotels ₹1.2-2.5k. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi ₹700-1,000. Kovalam (11km north) and Trivandrum (27km north) day-trips work in dawn-and-dusk shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 5, 2, 'wait',
  'Peak pre-monsoon. 27-35C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Boat-access compromised.',
  'May still functions for resort pool-and-AC weekenders. Last 10 days bring evening thunderstorms that rough up the estuary. Walk-in rates at year-low.',
  'May runs hot and sticky on the Kerala coast. Boat shuttle dawn-only, estuary thunderstorm-roughened from week three, mangrove cruises suspend on rough-water days. Wait for late October.',
  'May in Poovar is the last month before the southwest monsoon arrives around June 1. Daytime 28-35C, humidity 80 percent, the third week brings pre-monsoon thunderstorms — 30-90 minute evening squalls that knock grid power 1-3 hours and rough up the estuary water. Resort boat shuttles compress to dawn-only operation through the last fortnight. KTDC backwater cruises suspend on rough-water days. Poovar Island Resort floating cottages and Estuary Island Resort''s lake-view rooms continue full bookings but the open-deck experience narrows to indoor-and-pool shape. Walk-in rates run year-low: Poovar Island Resort ₹6-10k, Estuary Island Resort ₹5-8k, mainland mid-tier hotels ₹900-1.8k. Karkidakam Ayurveda month begins mid-July — both resorts run Ayurveda packages at monsoon-discount rates. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi. Push to mid-October if dates flex — the standard boat-access estuary trip is closed by month-end.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 6, 1, 'skip',
  'SW monsoon. 24-29C, 700-900mm rainfall. Estuary rough, boat shuttles suspended on heavy-rain days. Skip.',
  NULL,
  'June is when the southwest monsoon hits Kerala. The Neyyar-Arabian Sea estuary roughens dangerously, boat shuttles suspend on heavy-rain days, sea bathing forbidden. Resort access becomes unreliable.',
  'June in Poovar is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days. Daytime 25-29C, humidity 90 percent. The Neyyar River-Arabian Sea estuary roughens dangerously — the SW current pushes the river-mouth sandbar around, the golden-sand-dune pocket loses 20-30m of width to the surf, and the calm-water visual that defines Poovar disappears for the season. Resort boat shuttles from Poovar jetty (Poovar Island Resort, Estuary Island Resort, KTDC services) suspend on heavy-rain days — most days qualify. KTDC backwater cruises shut for the season. Sea bathing is forbidden under Kerala Tourism advisory. Walk-in rates run year-low: Poovar Island Resort ₹6-10k, Estuary Island Resort ₹5-8k, mainland mid-tier hotels ₹900-1.8k. Karkidakam Ayurveda packages start drawing the medicine-tourism segment. Trivandrum International (TRV) 25km flights run normal. The standard boat-access trip is closed in June. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Boat shuttles suspended. Karkidakam Ayurveda for different traveler.',
  NULL,
  'July is the wettest month at Poovar. Boat shuttles suspended on most days, estuary rough, sea forbidden. Karkidakam (mid-July to mid-August) Ayurveda month is peak medicine-tourism — different trip entirely. Standard estuary trip skip.',
  'July in Poovar is the wettest month of the Kerala year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. The Neyyar River-Arabian Sea estuary at peak roughness — boat shuttles from Poovar jetty (Poovar Island Resort, Estuary Island Resort, KTDC) suspend on most days. Sea bathing forbidden under Kerala Tourism advisory. Resort access becomes unreliable through the month. Karkidakam (mid-July to mid-August in the Malayalam calendar) is the traditional Ayurveda month — open pores absorb medicated oils best in monsoon humidity. Both Poovar Island Resort and Estuary Island Resort run 14-21 day Karkidaka Chikitsa packages with monsoon-season discounts: ₹40-80k inclusive (treatment + accommodation + diet) versus ₹70-150k peak-season. A different traveler entirely. Standard boat-access estuary trip closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Boat shuttles still suspended. Onam not Poovar-anchored.',
  NULL,
  'August holds July rain pattern. Boat shuttles suspended, estuary rough, sea forbidden. Onam (variable Aug-Sep) brings programming but Poovar is a boat-access destination, not Onam-anchored. Wait for late October.',
  'August in Poovar runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — but Poovar is a boat-access estuary destination, not an Onam-anchored cultural centre. Poovar Island Resort and Estuary Island Resort stage Onam Sadhya thalis on Thiruvonam day at ₹800-1500 per banana-leaf plate. The Neyyar-Arabian Sea estuary still rough; resort boat shuttles suspended on most days. Sea bathing forbidden under Kerala Tourism advisory. Walk-in rates run year-low: Poovar Island Resort ₹6-10k, Estuary Island Resort ₹5-8k, mainland mid-tier hotels ₹900-1.8k. Karkidakam Ayurveda packages end mid-month. Trivandrum International (TRV) 25km. The standard boat-access trip is closed. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 9, 2, 'wait',
  'Monsoon retreating. 24-30C, 250-400mm rain. Estuary calms last week. Boat shuttles resume by week 3.',
  'September is the recovery month. Monsoon withdraws around September 25-30, estuary calms, boat shuttles resume third week. Push to mid-October if dates flex.',
  'September is rebuild-not-yet-open month at Poovar. Boat shuttles resume only third week, estuary still rough. Push to mid-October when full operations return.',
  'September in Poovar is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). The Neyyar-Arabian Sea estuary calms in the last fortnight as the SW current weakens; the golden-sand-dune pocket starts re-forming. Resort boat shuttles from Poovar jetty (Poovar Island Resort, Estuary Island Resort, KTDC) resume on dry-day basis from the third week. KTDC backwater cruises (90-minute loops at ₹400-600 per person) restart by month-end. Walk-in rates climb 15-20 percent versus August: Poovar Island Resort ₹8-12k, Estuary Island Resort ₹6-10k, mainland mid-tier hotels ₹1.2-2.5k. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi ₹700-1,000. The smart traveler''s call is to wait for October 15-31 — full boat operations, calm estuary, off-peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 10, 4, 'go',
  'Season opens. 24-31C, post-monsoon, 100-200mm late rain. Estuary calms by mid-month. Boat shuttles full ops.',
  'October is the proper season-opener. Boat shuttles return to full ops by mid-month, estuary calms by week two. Walk-in rates 25-30 percent below January peak.',
  NULL,
  'October in Poovar is when the boat-access estuary returns to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the Neyyar-Arabian Sea estuary calms by October 12-15 as the SW current fully retreats. The golden-sand-dune pocket re-forms cleanly through the month. Daytime 25-31C, humidity falling toward 78 percent. Resort boat shuttles from Poovar jetty (Poovar Island Resort, Estuary Island Resort, KTDC services) return to full 6am-10pm operation. KTDC backwater cruises (90-minute loops through estuary mangroves at ₹400-600 per person) at full schedule from October 15. Walk-in hotel rates run 25-30 percent below January peak: Poovar Island Resort ₹9-14k, Estuary Island Resort ₹8-12k, mainland mid-tier hotels in Poovar village ₹1.5-3k. The post-monsoon estuary is at its photographically cleanest — the freshly-rinsed mangroves and coconut groves run deep green against the calm water. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi ₹800-1,200. Kovalam (11km north) and Trivandrum (27km north) day-trips work cleanly.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Estuary calm. Resort boat shuttles full ops. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, estuary at year-calm, boat shuttles full operation. Hotel rates 20 percent below December peak.',
  NULL,
  'November in Poovar is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, humidity dropping under 70 percent. The Neyyar River-Arabian Sea estuary at year-calm — golden-sand-dune pocket at clearest definition, mangrove-and-coconut-grove banks at deepest green against the post-monsoon sky. Resort boat shuttles from Poovar jetty (Poovar Island Resort, Estuary Island Resort, KTDC services) at full 6am-10pm operation. KTDC backwater cruises (90-minute loops at ₹400-600 per person) at peak schedule. Walk-in rates: Poovar Island Resort ₹11-16k, Estuary Island Resort ₹9-13k, mainland mid-tier hotels ₹1.8-3.5k — still meaningfully below December 22-January 5 peak. The trip works as a 2-3 night base with single Trivandrum (27km north) or Kovalam (11km north) day-trips. Almost unknown to mass tourists — Poovar runs 25-30 percent quieter than Kovalam''s Lighthouse Beach circuit even at peak. Trivandrum International (TRV) 25km via NH-66, 45-minute taxi ₹800-1,200. Strong call for first-time boat-access estuary visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('poovar', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE Dec 22-Jan 5 rates climb 60-80 percent. Resort boat slots tighten.',
  'December is when Poovar runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees rates 1.6-1.8x normal and resort boat shuttles tighten. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Poovar is the operational peak. Daytime 22-30C, nights 21C, rainfall under 30mm. The Neyyar-Arabian Sea estuary at year-calm — golden hour 5:30-6:30pm runs at clearest visual definition. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.6-1.8x the November baseline: Poovar Island Resort hits ₹18-26k versus November''s ₹11-16k, Estuary Island Resort ₹14-22k, mainland mid-tier hotels ₹3-5k. Resort boat shuttles from Poovar jetty want booking 5-7 days ahead through Christmas — Poovar Island Resort and Estuary Island Resort run their own boats every 30 minutes 6am-10pm but Christmas-week pressure pushes the slots full. KTDC backwater cruises book out 2-3 days ahead. The first three weeks of December (December 1-21) are the better-value window — peak weather, peak estuary calm, rates 30-40 percent below Christmas-NYE numbers: Poovar Island Resort ₹13-18k, Estuary Island Resort ₹10-15k. Trivandrum International (TRV) 25km via NH-66 — book transfers 5 days ahead through Christmas week. Kovalam (11km) and Trivandrum (27km) day-trips work cleanly.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
