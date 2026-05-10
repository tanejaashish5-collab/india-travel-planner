-- Kuttanad destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: kuttanad

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 1, 5, 'go',
  'Peak window. 23-31C, dry. Below-sea-level paddy fields drying down post-November harvest.',
  'January is when Kuttanad runs at its strongest. Below-sea-level rice paddies (1-2m below sea, surrounded by canals — UN-FAO Globally Important Agricultural Heritage System since 2013) drying down post-November harvest. Canoe rides through Champakulam village ₹500/2 hours. Reach via Alleppey or Changanassery, no houseboats home-base here.',
  NULL,
  'Kuttanad in January is the version Kerala agricultural-heritage travelers should book. Daytime sits at 24-31C, humidity below 70 percent. The standout: below-sea-level rice paddies — 1-2m below mean sea level, surrounded by 100-year-old canal-dyke systems — designated by UN-FAO as a Globally Important Agricultural Heritage System (GIAHS) in 2013. Only one of 4 GIAHS sites in India. Pokkali rice + duck farms + Champakulam village deliver the headline village circuit. Canoe rides through Champakulam village waterways ₹500-800 for 2 hours; pre-book through Champakulam Tourism Society or Kuttanad Tourism Office (Alappuzha). Pulinkunnu, Kavalam, and Kainakary are the other anchor villages. Reach via Alleppey jetty (15km, 30-min ferry) or Changanassery railway (12km, 25-min auto). No houseboats home-base in Kuttanad — the 100+ KTDC-licensed boats route through here as part of Alleppey-Kumarakom cruises. Day-trippers stay at homestays: Kuttanad Heritage Homestay ₹2-3k/night, Pranavam Homestay ₹2.5-3.5k, Vembanad Heritage Inn ₹3-4k. Sadhya at Champakulam village restaurants ₹250-400.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 2, 5, 'go',
  'Driest month. 24-32C. Pokkali fields fully dried. Paddy stubble walks possible.',
  'February delivers Kuttanad''s driest weather. Rainfall under 5mm. Pokkali fields fully dried; paddy stubble walks across the dyke embankments are the standout activity. Duck farms at peak. Homestays at peak schedule.',
  NULL,
  'February in Kuttanad is the year''s cleanest weather window. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent. The pokkali fields are fully dried after the November-December rice harvest; the dyke embankments around the 1-2m-below-sea-level paddies are walkable end-to-end. The Vembanad Lake-Pampa River-Kayamkulam Lake system delivers the canal network. Standard activities: dyke-embankment walks (free, self-guided through Champakulam-Pulinkunnu-Kavalam villages), canoe rides ₹500-800/2 hours, duck-farm visits at Kainakary (₹200-400 per group, includes egg collection), pokkali rice mill visits at Champakulam. Homestays at peak: Kuttanad Heritage Homestay ₹2.5-3.5k, Pranavam Homestay ₹2.5-4k, Vembanad Heritage Inn ₹3-4.5k. Reach via Alleppey ferry (15km, 30 minutes from Punnamada Jetty) or Changanassery railway (12km, 25-min auto). Day-trip option: Kumarakom Bird Sanctuary 25km north combines well. Champakulam Boat Race in June Moolam (oldest in Kerala, since 1545) is the seasonal anchor — but in June, not February.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 3, 4, 'go',
  'Last cool month. 25-33C. Field walks early morning. Homestay rates slide 20 percent.',
  'March extends February''s weather minus the peak crunch. Field walks compress to early-morning. Homestays drop 20 percent versus February. Heat picks up in the last week.',
  NULL,
  'March in Kuttanad is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week. Pokkali field walks across dyke embankments work 6-9am only; afternoons pivot to canoe rides through shaded canals. Duck-farm visits hold morning slots. Pokkali rice mill visits run weekday mornings. Homestay rates drop 20-25 percent versus February peak: Kuttanad Heritage Homestay ₹2-3k, Pranavam Homestay ₹2-3.5k, Vembanad Heritage Inn ₹2.5-4k. Reach via Alleppey ferry (15km from Punnamada Jetty, 30 minutes) or Changanassery railway (12km, 25-min auto). Champakulam village restaurants serve sadhya at ₹250-400. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. Pre-monsoon rice planting begins. Vishu Apr 14.',
  'April pushes Kuttanad into pre-monsoon. Rice planting begins late month for the next cycle (the dual-crop pattern). Vishu (April 14) brings sadhya at all major homestays. Field walks dawn-only.',
  'April pushes Kuttanad into pre-monsoon stress. Field walks unbearable past 8am, mid-day humidity in shaded canals heavier than open fields. Wait for late October.',
  'April in Kuttanad is when the village circuit narrows to early morning and evening. Daytime 28-34C, humidity 80 percent. Pre-monsoon rice planting begins late month for the next cycle (Kuttanad''s dual-crop pattern: November-December harvest then a second crop planted Apr-May for July-August harvest). Field walks workable 6-8am only. Canoe rides through shaded canals workable 6-10am and 4-6pm. Vishu (April 14, Malayalam new year) lands across all major homestays with full Vishukani arrangements (gold, rice, kanikkonna flowers in front of mirrors at dawn) and ₹400-700 sadhya lunches — book 3-5 days ahead. Homestay rates run 30-35 percent below February peak: Kuttanad Heritage Homestay ₹1.5-2.5k, Pranavam Homestay ₹1.5-3k, Vembanad Heritage Inn ₹2-3k. Friday-Sunday Bangalore weekend traffic continues; weekday occupancy under 50 percent. Pokkali rice mill visits hold morning slots. The trip works for travelers willing to anchor on early-morning programmes.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 5, 2, 'wait',
  'Pre-monsoon plus arriving squalls. 28-34C, humidity 85 percent. Rice planting in second crop.',
  NULL,
  'May runs hot and sticky on Kuttanad. Pre-monsoon thunderstorms hit weeks three and four. Rice planting in second crop, fields flooding with irrigation water. Field walks impossible past 7am. Wait for October.',
  'May in Kuttanad is the closing month before the southwest monsoon. Daytime 29-34C, humidity 85 percent. Rice planting in the second crop is in full swing through the month — fields are flooded with irrigation water from the Pampa River and Vembanad Lake, the dyke walks become impossible (water is over the embankments at peak irrigation). Pre-monsoon thunderstorms hit weeks three and four — short violent squalls that knock grid power 1-2 hours and raise humidity to 90 percent. Canoe rides through canals workable 6-9am only; mid-day call is homestay porch with electric fans. Homestay rates at year-low: Kuttanad Heritage Homestay ₹1.2-2k, Pranavam Homestay ₹1.2-2.5k, Vembanad Heritage Inn ₹1.5-2.5k. Friday-Sunday occupancy holds at 50 percent for Mumbai-Bangalore monsoon-weekend traffic. Push to mid-October if comfort and walking matter.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 6, 3, 'wait',
  'SW monsoon plus Champakulam Boat Race. 25-30C, 600-700mm rain. Race in June Moolam.',
  'June is when the southwest monsoon hits Kerala. Champakulam Moolam Boat Race (oldest in Kerala, since 1545) lands on Moolam day in June — backwater outlier worth visiting in monsoon. Standard village walks impossible (fields flooded), canoe rides through canals workable in dry intervals.',
  'June pushes Kuttanad into monsoon. Standard village walks impossible (flooded), canoe rides only in dry intervals. Champakulam Boat Race is a real cultural draw but the broader trip narrows.',
  'June in Kuttanad is when monsoon takes the below-sea-level paddies. The southwest monsoon arrives around June 1 (announced annually from Thiruvananthapuram by IMD); rainfall 600-700mm across 22-25 wet days. Fields are fully flooded — second-crop paddy is now in mid-growth, dyke embankments mostly underwater. The cultural anchor is Champakulam Moolam Boat Race (oldest in Kerala, since 1545) — typically on Moolam day in the Malayalam Mithunam month, late June (verify exact 2026 date via Kerala Tourism keralatourism.org). 9 snake boats, religious origin (commemorating the bringing of the Krishna idol from Kurichi to Ambalappuzha), 10,000-15,000 spectators on Pampa River banks at Champakulam village. Tickets ₹500-2000, book through Kerala Tourism KTDC. Homestay rates at year-low through pre-race week, then climb 50-100 percent for the race week (lock 6-8 weeks ahead): Kuttanad Heritage Homestay ₹1.5-2.5k baseline, ₹3-4k race week. Standard village walks impossible; canoe rides through canals workable in dry intervals only. Worth visiting specifically for the Champakulam race.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 7, 1, 'skip',
  'Peak monsoon. 25-29C, 700-800mm rain. Fields fully flooded. Active circuit closed.',
  NULL,
  'July is the wettest month at Kuttanad. Fields fully underwater, dyke walks impossible, canoe rides suspended (channel currents unsafe). Active village circuit closed. Skip; wait for October.',
  'July in Kuttanad is monsoon at its most stubborn. Rainfall 700-800mm across 25-27 wet days, often as 8-12 hour sustained deluges. Daytime 25-29C, humidity 92 percent. Fields fully flooded, dyke embankments underwater (often by 30-50cm), the village walking circuit closed. Canoe rides through canals suspended due to channel current speed and lightning risk. Homestays operate at sub-30 percent occupancy: Kuttanad Heritage Homestay ₹1-1.5k, Pranavam Homestay ₹1-2k, Vembanad Heritage Inn ₹1.5-2.5k. The active village circuit — pokkali field walks, duck farms, canoe rides — runs at zero through July. Karkidakam Ayurveda month opens mid-July at backwater resorts (Coconut Lagoon CGH Kumarakom, 25km north) — Kuttanad itself is not an Ayurveda destination. Wait for October when the cycle flips back to walking-mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 8, 3, 'wait',
  'Monsoon plus Onam plus Nehru Trophy. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026).',
  'August is rain-heavy with Onam plus Nehru Trophy on Punnamada (15km north). Sadhya at Kuttanad homestays. Vallamkali viewing trips. Worth a 2-day visit for Onam, otherwise wait for October.',
  'August holds monsoon at Kuttanad. Field walks impossible. Worth visiting only for Onam sadhya at homestays or Nehru Trophy spectator day-trip to Punnamada.',
  'August in Kuttanad pairs the southwest monsoon with the Onam state holiday cluster and the Nehru Trophy. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify via Kerala Tourism keralatourism.org). Homestays run elaborate sadhya lunches (₹500-900 per person, 26-28 dishes on banana leaf). Nehru Trophy Boat Race lands 2nd Saturday August at Punnamada Lake (15km north) — 100-foot snake boats, India''s premier vallam kali; tickets ₹500-3,000 via KTDC. Aranmula Boat Race on Pampa (early September during Onam tail) is the religious vallam kali. Field walks remain impossible (paddies underwater). Homestay rates climb 30-50 percent through Onam-Nehru week: Kuttanad Heritage Homestay ₹2-3k baseline, ₹3-4.5k peak. Worth a 2-day visit specifically for Onam sadhya plus Nehru Trophy spectator; otherwise wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 9, 3, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Onam tail. Aranmula Boat Race early month.',
  'September is the recovery. SW monsoon retreats through the second half. Onam celebrations linger first week, Aranmula Boat Race on Pampa is the early-month draw. Fields draining late month.',
  'September is rebuild-not-yet-clean at Kuttanad. Field walks return only in the last week as paddies drain. Push to mid-October for the proper village shape.',
  'September in Kuttanad is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Onam celebrations linger through the first week with snake-boat traditions; Aranmula Boat Race on the Pampa River (a religious vallam kali, Aranmula Parthasarathy Temple festival) lands on Uthrattadi day during Onam — typically early September (verify via Kerala Tourism). Pokkali fields begin draining through the second half — by October the second-crop pre-harvest phase begins. Field walks return only in the last week as embankments dry. Canoe rides through canals resume mid-month. Homestay rates climb 15-20 percent versus August lows: Kuttanad Heritage Homestay ₹1.5-2.5k, Pranavam Homestay ₹1.5-2.8k, Vembanad Heritage Inn ₹2-3k. The full clean village circuit opens from October 10-15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 10, 4, 'go',
  'Season opens. 24-30C, 200-250mm late-monsoon spillover. Fields draining, pre-harvest phase.',
  'October is the season-opener at Kuttanad. Fields draining through the month, second-crop rice in pre-harvest phase. Field walks return mid-month. Hotel rates 25 percent below December.',
  NULL,
  'October in Kuttanad is the proper return to coherent. Late-monsoon residue still drops 200-250mm in the first ten days but the back half flips into clean village mode. Daytime 25-30C, humidity falling from 85 to 75 percent. Pokkali fields drain through the month; second-crop rice in pre-harvest phase (harvest hits late October-November). Field walks across dyke embankments return from October 15. Canoe rides through canals at full schedule from October 5: ₹500-800/2 hours. Duck-farm visits at Kainakary resume morning slots. Pokkali rice mill visits run weekday mornings. Homestay rates 25 percent below December peak: Kuttanad Heritage Homestay ₹1.8-3k, Pranavam Homestay ₹2-3.5k, Vembanad Heritage Inn ₹2.5-4k. Reach via Alleppey ferry from Punnamada Jetty (15km, 30 minutes) or Changanassery railway (12km, 25-min auto). The agricultural-heritage village walks are at their cleanest October-March.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Rice harvest in full swing. Walks at year-best.',
  'November is the proper pivot to peak. Rainfall under 50mm. Pokkali rice harvest peaks through the month — village circuit runs at year-best with paddy-cutting demonstrations and rice-mill visits. Hotel rates 20 percent below December.',
  NULL,
  'November in Kuttanad is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, humidity dropping below 70 percent. Pokkali rice harvest peaks through the month — village circuit runs at year-best with paddy-cutting demonstrations across Champakulam, Pulinkunnu, Kavalam, and Kainakary villages. Field walks across dyke embankments at year-best. Canoe rides ₹500-800/2 hours; pokkali rice mill visits with grain-shelling demos at Champakulam ₹150-300 per group. Duck-farm visits at peak. Homestay rates climb to 75-80 percent of December peak: Kuttanad Heritage Homestay ₹2.5-3.5k, Pranavam Homestay ₹2.5-4k, Vembanad Heritage Inn ₹3-4.5k. Friday-Sunday Bangalore-Chennai weekend traffic pushes occupancy to 70 percent. Reach via Alleppey ferry or Changanassery railway. Strong call for first-time agricultural-heritage visitors who want full village circuit minus the Christmas-NYE rate spike.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kuttanad', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 1.8-2.2x. Harvest tail.',
  'December is when Kuttanad runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 1.8-2.2x normal (lower spike than Alleppey-Kumarakom). Harvest tails through first half. Lock homestays 4-5 weeks ahead.',
  NULL,
  'December in Kuttanad is the operational peak — agricultural heritage at its most coherent. Daytime 23-30C, nights 21-22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.8-2.2x the November baseline (lower spike than coastal Alleppey or premium Kumarakom): Kuttanad Heritage Homestay hits ₹4-5k, Pranavam Homestay ₹4-6k, Vembanad Heritage Inn ₹5-7k. Pokkali rice harvest tails through the first half — village paddies show post-harvest stubble walks. Pokkali rice mill visits at Champakulam, duck-farm visits at Kainakary, canoe rides through Pulinkunnu and Kavalam canals all at peak schedule. Reach via Alleppey ferry from Punnamada Jetty (15km, 30 min) or Changanassery railway (12km, 25-min auto). The 100+ KTDC-licensed houseboats route through Kuttanad as part of Alleppey-Kumarakom cruises — day-cruise from Alleppey jetty stops at Champakulam village ₹3-5k. Lock homestays 4-5 weeks ahead from October. The first three weeks of December (before December 22) are the better-value window — peak village conditions minus peak rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
