-- Cherai (Vypeen Island) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- destination_id: cherai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 1, 5, 'go',
  'Peak Kerala coast. 23-31C, dry, sea calm. Spinner dolphin sightings near-daily off Cherai shore.',
  'January is when Cherai Beach runs at its strongest. The 15km Vypeen-Munambam stretch is at its calmest, spinner dolphins are sighted near-daily on Kerala Tourism dolphin-spotting boats (₹500-1000, 2-hour run). Family-friendly alternative to Kovalam — quieter, paddy fields and Periyar estuary at the back, Chinese Fishing Nets at sunset.',
  NULL,
  'Cherai in January is the version Kochi day-trippers underrate. Daytime sits at 24-31C, sea at 26C, humidity below 70 percent. The 15km Vypeen-Munambam beach stretch is the longest unbroken sand on the Kerala mainland coast and at its calmest in January. Spinner dolphin pods cruise 1-2km offshore; Kerala Tourism-licensed boats run dolphin-spotting trips at ₹500-1000/person for a 2-hour window from Cherai jetty, departures 6:30am and 4pm. Vypeen ferry from Customs Jetty Fort Kochi runs every 30 minutes ₹5/passenger; the Goshree bridge route by car or auto from Kochi takes 50 minutes via NH-66. Periyar river-sea estuary creates brackish lagoons behind the beach — paddy fields and toddy-shop circuit (chitenis) within 2km. Cherai Beach Resort, Les 3 Elephants, Casino Beach Resort run at peak (₹6-15k). Christmas-NYE rate spike eases by January 5. Family-friendly, less built-up than Kovalam — beach shacks here are limited; food via resort restaurants or Cherai village toddy shops.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 2, 5, 'go',
  'Driest month. 24-32C. Dolphin sightings peak. Long-stay rate negotiations open mid-month.',
  'February is Cherai''s driest stretch — rainfall under 5mm, full sea bathing, dolphin sightings at year-peak. Hotel rates negotiable for 5+ night stays. Chinese Fishing Nets at Cherai shore work morning and evening tides reliably.',
  NULL,
  'February in Cherai is the year''s cleanest weather window. Rainfall under 5mm, daytime 25-32C, humidity at 60 percent. The 15km Vypeen-Munambam beach is at its widest — winter erosion has cleared, summer accretion not yet started. Spinner dolphin sightings hit year-peak with pods of 30-100 animals visible from shore; Kerala Tourism dolphin-spotting boats run twice daily at ₹500-1000. Chinese Fishing Nets at Cherai (smaller scale than Fort Kochi but operational) work both tides. Cherai Beach Resort at ₹7-15k, Les 3 Elephants at ₹6-12k, Casino Beach Resort at ₹5-10k — long-stay (5+ night) rates negotiable from mid-month as the family-tourism rush thins post-school holidays. Vypeen ferry every 30 minutes from Fort Kochi Customs Jetty; the Goshree bridge route from MG Road Kochi takes 45-50 minutes. Periyar estuary kayak trips (₹300-500/2 hours) open at Munambam end of beach. Walk the chitenis (toddy shops) at sunset in Cherai village for Kerala-fresh karimeen pollichathu.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 3, 4, 'go',
  'Last cool month. 25-33C. Dolphin sightings still strong. Hotel rates slide 20 percent.',
  'March extends February''s weather minus the peak-season crunch. Sea bathing still works, dolphin tours still run, hotel rates 20-25 percent below February. Hot mid-day means resort-pool pivot 11am-4pm.',
  NULL,
  'March in Cherai is the soft-landing month before pre-monsoon humidity. Daytime 26-33C, sea at 28C, humidity climbing toward 75 percent in the last week. Sea bathing 6-10am and 4-7pm holds; mid-day call is the resort pool. Cherai Beach Resort drops to ₹5-12k, Les 3 Elephants to ₹4-9k, Casino Beach Resort to ₹4-8k. Spinner dolphin sightings still strong but spotting boats run lighter schedules — 6:30am only on weekdays. Kerala Tourism Wildlife Department licenses 8 boats from Cherai jetty. Chinese Fishing Nets at Cherai shore work both tides. Vypeen ferry full frequency. Munambam fish market — Wednesday and Saturday auctions 5:30-7am, walk-in for fresh catch (karimeen, prawns, mussels). Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. Sea bathing collapses past 9am. Vishu Apr 14.',
  'April pushes Cherai into pre-monsoon. Beach access early morning and evening only. Vishu (April 14) brings homestays-with-sadhya draws, but beach-and-dolphin trip narrows. Hotel rates 30-35 percent below February peak.',
  'April pushes Cherai into pre-monsoon stress. Sea bathing collapses past 9am, the long beach walks and Chinese Fishing Nets stand both unbearable mid-day. Wait for late October if a beach trip is the goal.',
  'April in Cherai is when the beach trip narrows to dawn and dusk. Daytime 28-34C, sea at 29C, humidity 80 percent. Sea bathing works 5:30-9am and 5-7pm; mid-day belongs to resort pools and AC rooms. Vishu (April 14, Malayalam new year) lands in Cherai homestays with Vishukani arrangements and family sadhya — small-batch homestays (Cherai Beach Houses, Cherai Heritage Homestay) run kanikkonna-flower decor and traditional 26-dish lunches. Spinner dolphin sightings continue but the early-morning boats are the only viable window. Hotel rates run 30-35 percent below February: Cherai Beach Resort ₹4-9k, Les 3 Elephants ₹3-7k, Casino Beach Resort ₹3-6k. Friday-Sunday weekend traffic from Bangalore continues; weekday occupancy under 45 percent. Kerala State Water Transport ferries from Vypeen run normal schedules. The trip works if pool-and-AC time is acceptable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 5, 2, 'wait',
  'Peak heat plus pre-monsoon. 28-34C, humidity 85 percent. Sea state weakens. Skip if comfort matters.',
  NULL,
  'May runs hot and sticky on Vypeen Island. Sea state weakens through the third week as pre-monsoon swells arrive. Beach access early morning and evening only, dolphin spotting trips run lighter, hotel rates at year-low. Wait for October.',
  'May in Cherai is the closing month before the southwest monsoon. Daytime 29-34C, humidity 85 percent, sea temperature 30C — bathable but not cooling. Pre-monsoon swells start arriving the third week; sea state turns choppier and dolphin-spotting boats cancel run-days due to wind. Hotel rates at year-low: Cherai Beach Resort ₹3-7k, Les 3 Elephants ₹3-5k, Casino Beach Resort ₹2.5-5k. Pre-monsoon thunderstorms hit weeks three and four — short violent squalls that raise humidity for 24 hours after each event. Karimeen pollichathu at Cherai chitenis still anchors evening eating; Munambam Wednesday-Saturday auctions hold through the month. Munambam-end of the beach (where the Periyar estuary meets the sea) is the last viable swimming patch — calmer than the Cherai jetty end. The trip works only as a 2-day weekender from Kochi at this stage.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 6, 1, 'skip',
  'SW monsoon arrives June 1. 25-30C, 700-800mm rainfall. Beach unsafe, dolphin tours suspended.',
  NULL,
  'June is when the southwest monsoon hits the Kerala coast. Sea bathing is prohibited, dolphin-spotting boats suspend operations, hotel infrastructure in Cherai (largely beach-front) takes a battering. Beach erosion claims 30-40m of sand width through the month. Skip.',
  'June in Cherai is the southwest monsoon at full strength. The current arrives around June 1 (Kerala receives monsoon onset first in India — IMD announces formal date annually from Thiruvananthapuram). Rainfall jumps to 700-800mm across 22-25 wet days; sustained downpours of 6-12 hours with cyclonic-cell wind close down beach access entirely. Kerala Tourism issues a sea-state advisory through the season — swimming is prohibited, lifeguards withdraw to base. Spinner dolphin spotting boats suspend operations from June 1 to October 1. Cherai Beach Resort and Les 3 Elephants run at sub-30 percent occupancy with rates at year-low (₹3-5k). Beach erosion claims 30-40m of sand width through the month — recovery begins in October. The Munambam fish market still runs Wednesday-Saturday auctions but with reduced volumes as small-boat fishing suspends. The trip you came for — beach, dolphins, sunset Chinese Fishing Nets — runs at zero. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 7, 1, 'skip',
  'Peak monsoon. 25-29C, 800-900mm rainfall. Beach closed. Karkidakam Ayurveda inland only.',
  NULL,
  'July is the wettest month at Cherai. Rainfall 800-900mm. Beach closed under sea-state advisory, dolphin tours suspended through October. Karkidakam Ayurveda month opens mid-July but treatments are at inland resorts (Kumarakom, Vagamon) — not beach Cherai. Skip.',
  'July in Cherai is monsoon at its most stubborn. Rainfall averages 800-900mm across 25-27 wet days, often as 8-12 hour deluges with sustained 30-40km/h coastal winds. Cochin International Airport (15km away) handles diversions and weather-cell delays through the month. Cherai Beach Resort, Les 3 Elephants, and Casino Beach Resort all run sub-30 percent occupancy with rates at year-low (₹2.5-5k). Some resorts shut maintenance windows the last two weeks of July. Karkidakam (Ayurveda month) opens mid-July in the Malayalam calendar — but Karkidakam Ayurveda happens at inland resorts (Kumarakom, Vagamon, Athirapally) where humidity discipline and oil-massage spaces work better than beach-front. The dolphin-spotting season is closed; sea bathing prohibited; the Chinese Fishing Nets at Cherai stand soaked and unmanned. Vypeen ferry runs but with reduced frequency. The trip Cherai sells closed in May. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 8, 1, 'skip',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Beach still closed. Onam Aug 25 (verify 2026).',
  NULL,
  'August holds July''s rain pattern with Onam (Thiruvonam Aug 25, 2026 — verify) layered on. Beach remains closed under sea-state advisory. Resort sadhya lunches at Cherai Beach Resort and Casino Beach Resort are a draw, but the broader beach trip remains shut. Skip Cherai unless Onam sadhya is the specific reason.',
  'August in Cherai pairs the southwest monsoon with the Onam state holiday cluster. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Sea state advisory still in force — swimming prohibited. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org). Cherai Beach Resort, Les 3 Elephants, and Casino Beach Resort run elaborate sadhya lunches (₹1500-2500 per person, 26-28 dishes on banana leaf) — these book out 4-6 weeks ahead. Pulikali (tiger dance) processions through Thrissur are 75km north, the year''s standout cultural draw — base in Thrissur, not Cherai, for that. Snake-boat races in nearby backwater villages (Aranmula, Champakulam) are 2-hour drives south. The Cherai-specific draws — beach, dolphins, sunset — remain rain-locked. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 9, 2, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Sea state still rough. Onam tail.',
  'September is the recovery month. SW monsoon retreats through the second half but sea state takes till October to fully calm. Beaches still rough, dolphin tours still suspended. Worth a 1-2 day visit only if dates are completely fixed.',
  'September is rebuild-not-yet-open month at Cherai. Sea state rough through the first three weeks, dolphin spotting suspended till October 1, beach width still recovering. Push to mid-October when the full beach-and-dolphin trip resumes.',
  'September in Cherai is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. Daytime 25-30C, humidity easing toward 80 percent. Southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Sea state advisory begins easing in the last week — swimming prohibition lifts when wave-height drops below 1.5m, typically the last 2-3 days of September. Spinner dolphin spotting boats remain off-duty until October 1 (Kerala Tourism Wildlife rule for full season). Beach width still recovering from monsoon erosion — narrow, with debris that local crews clear through October. Cherai Beach Resort, Les 3 Elephants, Casino Beach Resort run 50 percent below January peak: ₹4-7k bracket. The dolphin-and-beach shape that defines a Cherai trip doesn''t fully open until October 5-15. A 2-day September visit is workable for monsoon-tolerant travelers; first-time visitors push to mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 10, 4, 'go',
  'Beach reopens Oct 1. 24-31C, 200-250mm late-monsoon spillover. Dolphin tours resume.',
  'October is the season-opener at Cherai. Spinner dolphin spotting tours resume October 1, sea state advisory lifts, beach width recovers through the month. Late-monsoon residue still 200-250mm but the back half is clean. Hotel rates 30 percent below December peak.',
  NULL,
  'October in Cherai is the proper return to coherent. Spinner dolphin spotting boats resume October 1 (Kerala Tourism Wildlife season opener); the Munambam fish market returns to full Wednesday-Saturday auctions; sea state advisory lifts. Late-monsoon residue still drops 200-250mm in the first ten days — afternoon thunderstorms hit half the days through October 15 — but the back half flips into clean beach mode. Daytime 25-31C, sea at 28C, humidity falling from 85 to 75 percent. Beach width recovers from monsoon erosion through the month; Cherai Beach Resort, Les 3 Elephants, and Casino Beach Resort all run full hours. Hotel rates 30-35 percent below December peak: Cherai Beach Resort ₹5-9k versus December''s ₹12-15k. Vypeen ferry returns to 30-minute frequency. Pack a poncho rather than an umbrella for the first half — Konkan-style coastal winds make umbrellas useless against the last monsoon squalls. Strong value window for first-time Cherai visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Dolphin sightings near-daily. Hotel rates 20 percent below Dec peak.',
  'November is the proper pivot to peak season at Cherai. Rainfall under 50mm, beach width fully recovered, spinner dolphin sightings near-daily, sea state at year-best. Hotel rates 20-25 percent below December peak.',
  NULL,
  'November in Cherai is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, sea at 27C, humidity dropping below 70 percent. Spinner dolphin pods (typical sighting 30-100 animals) cruise 1-2km offshore; Kerala Tourism dolphin-spotting boats run twice daily at ₹500-1000. Beach width fully recovered from monsoon erosion. The Munambam fish market hits its annual peak with karimeen, prawns, mussels at peak quality. Cherai Beach Resort at ₹6-12k, Les 3 Elephants at ₹5-10k, Casino Beach Resort at ₹4-9k — Diwali week and end-of-November traffic from Bangalore-Chennai weekenders pushes occupancy to 75 percent. Munambam-end of the beach (Periyar river-sea estuary) at sunset is the most uncrowded patch. Vypeen ferry full frequency from Customs Jetty Fort Kochi. Strong call for first-time Cherai visitors who want full beach-and-dolphin shape minus the Christmas-NYE crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('cherai', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 2-3x. Dolphin sightings at year-best.',
  'December is when Cherai runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2-3x normal, beach access constrained 11am-5pm by family traffic. Spinner dolphins still at peak. Lock beach-front rooms 6 weeks ahead.',
  NULL,
  'December in Cherai is the operational peak and the most expensive stretch of the Kerala beach year. Daytime 23-30C, nights 21-22C, rainfall under 30mm, sea at 26-27C. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-3x the November baseline: Cherai Beach Resort hits ₹12-18k versus November''s ₹6-12k, Les 3 Elephants ₹10-15k, Casino Beach Resort ₹8-12k. Spinner dolphin sightings at year-best — 30-100 animal pods near-daily, Kerala Tourism boats run thrice daily December 25-31 (₹500-1000/person). Beach access constrained 11am-5pm by domestic family traffic; the long walks work 6-9am and 4:30-6pm. Vypeen ferry from Customs Jetty Fort Kochi runs every 30 minutes (longer queues during peak week). Munambam fish market Wednesday-Saturday auctions at peak quality and prices. Cochin International Airport runs at peak capacity. Book beach-front rooms 6-8 weeks ahead from October. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
