-- Kumbalangi destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: kumbalangi

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 1, 5, 'go',
  'Peak window. 23-31C, dry. India''s first model ecotourism village runs full programme — crab walks, mangrove kayaks.',
  'January is when Kumbalangi runs at its strongest. India''s first certified model ecotourism village (2006, Kerala Tourism + UNDP) operates full schedule — pokkali crab-farm walks (₹500/person), mangrove kayak trips (₹400/2 hours), Chinese fishing-net demos and stilt-house homestay sadhya. 10 minutes from Kochi via NH-66 + Kumbalangi bridge.',
  NULL,
  'Kumbalangi in January is the version of community ecotourism that actually works. Daytime 24-31C, humidity below 70 percent, dry weather makes the village circuit walkable end-to-end. India''s first certified model ecotourism village (2006, Kerala Tourism and UNDP joint designation) sits 14km from Kochi via NH-66 and the Kumbalangi bridge — 25 minutes by auto, 35 by KSRTC bus. The community runs four anchor activities: pokkali crab-farm walk and demonstration (₹500/person, 90 minutes, run by Kumbalangi Tourism Society), mangrove kayak trip through Kallumkadavu backwater channels (₹400-600 for 2 hours, single or double kayak), Chinese fishing-net demo at Kannamali Lake (smaller than Fort Kochi nets but functional), and stilt-house homestay sadhya lunch (₹350-500 per person at homes like Coconut Lagoon Heritage Homestay or Krish-Naa Homestay). Coir-rope making, prawn-rearing, toddy-tapping all on the menu. Christmas-NYE rate spike eases by January 5; homestays hold steady at ₹2-4k/night. This is community-tourism not resort-tourism — that''s the point.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 2, 5, 'go',
  'Driest month. 24-32C. Pokkali fields drying down post-harvest. Crab demos at peak.',
  'February delivers Kumbalangi''s cleanest weather. Rainfall under 5mm, mangrove-kayak channels at year-best clarity, pokkali crab and prawn farming demos at peak. Long-stay rates negotiable from mid-month.',
  NULL,
  'February in Kumbalangi is the year''s cleanest weather window. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent. The Kumbalangi Tourism Society runs all four anchor activities at peak schedule: pokkali crab-farm walk 8am and 3pm slots (₹500), mangrove kayak through Kallumkadavu channels 6am-10am and 3-5pm (₹400-600), Chinese fishing-net demo at Kannamali Lake (₹100 entry), stilt-house sadhya lunches across 12 registered homestays (₹350-500). The pokkali rice harvest finishes in November-December; February shows post-harvest fields drying down with crab and prawn populations at year-peak (the saline-water alternation between rice and crab seasons is the village''s defining ecology). Coconut Lagoon Heritage Homestay, Krish-Naa Homestay, and Kallumkadavu Backwaters Homestay run 80 percent occupancy weekdays. Long-stay (5+ night) rates negotiable from mid-month. NH-66 from Kochi takes 25 minutes by auto (₹400-500), 35 minutes by KSRTC bus (₹40 from Ernakulam KSRTC). The 1.5km community-walk between mangroves, fishing nets, and pokkali fields is comfortable through afternoon.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 3, 4, 'go',
  'Last cool month. 25-33C. Rates slide 20 percent. Mangrove kayaks limit to early morning.',
  'March extends February''s weather minus the peak-season crunch. Mangrove kayaks shift to early-morning only, crab demos and homestay sadhya hold full schedule. Hotel rates 20-25 percent below February peak.',
  NULL,
  'March in Kumbalangi is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week. Mangrove kayak trips compress to 6-9am only (mid-day humidity in tree-shaded channels is heavier than the open beach). Pokkali crab-farm walks shift to 7am and 4:30pm slots. Stilt-house sadhya lunches hold full 12-30 booking schedule across the 12 registered homestays. Hotel and homestay rates drop 20-25 percent versus February peak: Coconut Lagoon Heritage Homestay ₹2-3k, Krish-Naa Homestay ₹1.5-2.5k. Friday-Sunday Bangalore-Chennai weekenders still drive 70 percent occupancy. Kumbalangi Tourism Society maintains the village circuit — coir-rope making, prawn rearing, toddy tapping — through the month. NH-66 + Kumbalangi bridge route from Kochi takes 25 minutes. Last comfortable window before April pushes the trip into early-morning-only mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. Vishu Apr 14. Activities compress to dawn-only.',
  'April pushes Kumbalangi into early-morning-only mode. Vishu (April 14) brings full village sadhya celebrations across registered homestays. Crab walks and kayak trips workable 6-8:30am only.',
  'April pushes Kumbalangi into pre-monsoon stress. Mangrove kayak channels become unbearable past 8am, the village circuit compresses to early morning and evening only. Vishu sadhya is a draw, but the broader ecotourism programme narrows.',
  'April in Kumbalangi is when the village circuit compresses to dawn and dusk. Daytime 28-34C, humidity 80 percent, mangrove channels unbearable past 8am. Vishu (April 14, Malayalam new year) lands across the 12 registered Kumbalangi homestays with full Vishukani arrangements (gold, rice, kanikkonna flowers in front of mirrors at dawn) and ₹500-800 sadhya lunches — book 3-4 days ahead through Kerala Tourism. Pokkali crab-farm walks workable 6-8:30am only; mangrove kayaks 6-9am window. Chinese fishing-net demo at Kannamali Lake holds 4-6pm slots. Stilt-house homestay rates run 30-35 percent below February peak: Coconut Lagoon Heritage at ₹1.5-2.5k, Krish-Naa Homestay at ₹1-1.8k, Kallumkadavu Backwaters at ₹1.2-2k. Friday-Sunday traffic from Bangalore continues; weekday occupancy under 50 percent. Pool-equipped homestays (only 3 of 12) hold demand better. The trip works for travelers willing to anchor on early-morning programmes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 5, 2, 'wait',
  'Pre-monsoon plus arriving squalls. 28-34C, humidity 85 percent. Activities run sub-50 percent.',
  NULL,
  'May runs hot and sticky on Vembanad lake fringe. Pre-monsoon thunderstorms hit weeks three and four. Activities run sub-50 percent schedule, homestays 40 percent occupancy. Wait for late October.',
  'May in Kumbalangi is the closing month before the southwest monsoon. Daytime 29-34C, humidity 85 percent, sustained heat through the village circuit. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls that knock grid power 1-2 hours and raise humidity for 24 hours after each event. Mangrove kayak trips run only 6-8am; afternoon kayaks suspended due to thunderstorm risk. Pokkali crab demos hold morning slots. Stilt-house homestay rates at year-low: Coconut Lagoon Heritage at ₹1.2-2k, Krish-Naa Homestay at ₹900-1.5k, Kallumkadavu Backwaters at ₹1-1.8k. Friday-Sunday occupancy holds at 50 percent for Mumbai-Bangalore monsoon-weekend traffic. Karkidakam Ayurveda month opens mid-July at inland resorts but Kumbalangi itself is not an Ayurveda destination — push to October-March for the proper village programme.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 6, 2, 'wait',
  'SW monsoon. 25-30C, 600-700mm rain. Pokkali fields flood; village shifts to mode-2.',
  'June is when the southwest monsoon arrives. Pokkali fields flood as the saline-water phase begins — crab and prawn populations build in the next 4-5 months. Village ecotourism shifts to limited indoor programmes. Homestay rates at year-low.',
  'June pushes Kumbalangi into monsoon-village mode. Mangrove kayak trips suspended, pokkali field walks impossible (flooded), Chinese fishing-net demos run only on dry intervals. Wait for October.',
  'June in Kumbalangi is when the village shifts from rice-mode to crab-mode. The southwest monsoon arrives around June 1 (announced annually from Thiruvananthapuram by IMD); rainfall 600-700mm across 22-25 wet days. The pokkali fields flood as the saline-water phase begins — crab, prawn, and shrimp populations build through the next 4-5 months on monsoon-driven brackish-water flow. Mangrove kayak trips suspend (channel flow becomes unsafe), pokkali walks impossible (fields underwater), Chinese fishing-net demos hold only on dry intervals (1-2 days a week). The Kumbalangi Tourism Society shifts to indoor programming: coir-rope making, traditional fish-curry cooking demos, sari-and-mundu weaving at registered homestays. Stilt-house homestays don''t shut for monsoon — they shift mode (homes are built for the monsoon ecosystem). Coconut Lagoon Heritage at ₹1.2-1.8k, Krish-Naa Homestay at ₹900-1.5k. The trip works for travelers chasing village-life immersion rather than the active ecotourism programme — push to October if the active circuit is the goal.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 7, 1, 'skip',
  'Peak monsoon. 25-29C, 700-800mm rain. Active ecotourism circuit closed. Homestays in indoor mode.',
  NULL,
  'July is the wettest month. Active ecotourism programme — kayaks, crab walks, fishing-net demos — runs at zero. Homestays operate but in indoor-only mode. Skip for the active village circuit; wait for October.',
  'July in Kumbalangi is monsoon at its most stubborn. Rainfall averages 750mm across 25-27 wet days, often as 6-12 hour sustained deluges. Pokkali fields are fully flooded; mangrove kayak channels run dangerously fast; crab-farm walks impossible. The Kumbalangi Tourism Society closes its active circuit through July-August. Stilt-house homestays operate in survival mode — the houses are designed for monsoon, raised on poles, with raised walkways and covered patios — but the visitor programme is essentially indoor coir, weaving, and cooking demonstrations only. Coconut Lagoon Heritage Homestay at ₹1k-1.5k, Krish-Naa Homestay at ₹800-1.3k, sub-30 percent occupancy. The trip Kumbalangi sells — first model ecotourism village in India, the active community circuit — runs at zero in July. Wait for October when the cycle flips back.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 8, 2, 'wait',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026). Sadhya at homestays.',
  'August holds July''s rain pattern with Onam (Thiruvonam Aug 25, 2026 — verify) layered on. Stilt-house homestay sadhya lunches are a draw. Active circuit still closed. Worth a 1-2 day visit for Onam if you''re already in Kerala.',
  'August in Kumbalangi runs Onam-tilted but otherwise still in monsoon-shutdown. Active ecotourism circuit closed, kayaks and crab walks suspended. Onam sadhya lunches are the only real draw.',
  'August in Kumbalangi pairs the southwest monsoon with the Onam state holiday cluster. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact date via Kerala Tourism keralatourism.org). The 12 registered Kumbalangi homestays run elaborate Onam sadhya lunches: 26-28 dishes on banana leaf, ₹600-1000 per person, book 4-6 weeks ahead through Kerala Tourism. Coconut Lagoon Heritage Homestay and Krish-Naa Homestay run special pookalam (flower-carpet) competitions and Vallamkali (snake-boat) viewing arrangements at the Kallumkadavu backwater. The active ecotourism circuit — kayaks, crab walks, fishing-net demos — still runs at sub-20 percent schedule. Stilt-house homestay rates climb 30-40 percent through the Onam week (₹1.5-2.5k versus ₹1-1.8k earlier in August). Worth a 1-2 day Kumbalangi visit specifically for Onam sadhya — push the broader trip to October when the village circuit re-opens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Active circuit rebuilds late month. Crab populations peaking.',
  'September is the rebuild. SW monsoon retreats through the second half, mangrove kayaks return last week, crab walks resume October 1 as fields drain. Pokkali fields drying down through October — peak crab season.',
  'September is rebuild-not-yet-open at Kumbalangi. Active ecotourism circuit returns last week of the month; mangrove kayak channels still running too fast for safe trips through the first three weeks. Push to mid-October for the full circuit.',
  'September in Kumbalangi is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Pokkali fields begin draining through the second half — by October the saline-water cycle reverses and the rice-pokkali phase resumes. Crab and prawn populations are at year-peak from monsoon brackish-water build-up — but harvesting won''t formally start until October-November. Mangrove kayak trips return in the last week of September as channel flow stabilises. Pokkali crab-farm walks resume October 1. Chinese fishing-net demo at Kannamali Lake holds light schedule. Stilt-house homestays at 50 percent occupancy: Coconut Lagoon Heritage Homestay ₹1.2-2k, Krish-Naa Homestay ₹1-1.8k, Kallumkadavu Backwaters ₹1.2-2k. The full circuit opens cleanly only from October 5-15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 10, 4, 'go',
  'Active circuit resumes. 24-31C, 200-250mm late-monsoon spillover. Crab populations at peak.',
  'October is the season-opener at Kumbalangi. Active ecotourism circuit resumes — mangrove kayaks, pokkali crab walks, fishing-net demos. Crab and prawn populations at year-peak after monsoon build-up. Hotel rates 25-30 percent below December.',
  NULL,
  'October in Kumbalangi is the proper return to coherent. Active ecotourism circuit resumes from October 1 — mangrove kayak trips through Kallumkadavu channels (₹400-600/2 hours), pokkali crab-farm walks (₹500/90 minutes), Chinese fishing-net demo at Kannamali Lake. Late-monsoon residue still drops 200-250mm in the first ten days but the back half is clean. Daytime 25-31C, humidity falling from 85 to 75 percent. Crab and prawn populations at year-peak (the monsoon brackish-water build-up has fattened populations); pokkali rice planting also begins this month, so the village runs both rice and crab visibility together. Stilt-house homestay rates 25-30 percent below December: Coconut Lagoon Heritage Homestay ₹1.5-2.5k, Krish-Naa Homestay ₹1.2-2k, Kallumkadavu Backwaters ₹1.5-2.5k. Pack a poncho for the first half — afternoon thunderstorms hit half the days through October 15. Strong value window for first-time Kumbalangi visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Crab harvest season. Active circuit at full schedule.',
  'November is the proper pivot to peak. Rainfall under 50mm, full active ecotourism circuit, pokkali rice planting + crab harvesting overlap, homestays at 75 percent occupancy. Hotel rates 20-25 percent below December peak.',
  NULL,
  'November in Kumbalangi is the year''s second-peak month. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent. Pokkali rice planting completes in the first half, crab harvest peaks through the month — the village shows both phases of its dual-cycle ecology simultaneously. The Kumbalangi Tourism Society runs full active circuit: mangrove kayak trips 6am, 8am, 4pm slots, pokkali crab-farm walks 7am and 4:30pm, Chinese fishing-net demo at Kannamali Lake 4-6pm. Stilt-house homestay rates climb to 75-80 percent of December peak: Coconut Lagoon Heritage Homestay ₹2-3k, Krish-Naa Homestay ₹1.5-2.5k, Kallumkadavu Backwaters ₹1.8-2.8k. Friday-Sunday traffic from Bangalore-Chennai pushes occupancy to 75 percent. NH-66 + Kumbalangi bridge from Kochi takes 25 minutes. Strong call for first-time Kumbalangi visitors who want the full village shape without the Christmas-NYE rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kumbalangi', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 1.8-2.5x. Crab harvest at peak.',
  'December is when Kumbalangi runs at full capacity. Christmas-NYE rates 1.8-2.5x normal (lower spike than coastal Kochi). Active ecotourism circuit at peak. Pokkali rice harvest begins, crab populations at peak. Lock homestays 5-6 weeks ahead.',
  NULL,
  'December in Kumbalangi is the operational peak — the first model ecotourism village at its most coherent. Daytime 23-30C, nights 21-22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.8-2.5x the November baseline (lower spike than the coastal hotels at Cherai or Fort Kochi): Coconut Lagoon Heritage Homestay hits ₹3.5-5k, Krish-Naa Homestay ₹2.5-3.5k, Kallumkadavu Backwaters ₹3-4k. Pokkali rice harvest begins in late December, running through January-February. Crab and prawn populations at peak. The Kumbalangi Tourism Society runs full active circuit: mangrove kayaks at 4 daily slots, crab walks at 3 slots, Chinese fishing-net demos sunset-only. Stilt-house homestay sadhya lunches book 2-3 weeks ahead through the Christmas week. NH-66 + Kumbalangi bridge from Kochi takes 25-30 minutes (longer with Christmas traffic). Cochin International Airport at peak capacity. The first three weeks of December (before December 22) are the better-value window — peak village conditions minus peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
