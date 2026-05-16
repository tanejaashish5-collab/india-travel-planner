-- Mountain prose batch — 108 rows (9 dests × 12 months)
-- Generated 2026-05-10
-- Voice: locked NakshIQ FT Weekend register
-- destinations: aalo, dambuk, chandratal, kaza, katra, khardung-la, turtuk, har-ki-doon, hemkund-sahib

-- =========================================================
-- AALO (West Siang, Arunachal Pradesh) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 1, 5, 'go',
  'Peak window plus Yomgo River Festival 3-day run. 7-22C, dry. ILP processing 24-48 hours.',
  'January is when Aalo holds its calendar event of the year — the Yomgo River Festival (3 days, riverside ground at Karbak, dates announced in early December). Skies are clear, the Yomgo and Siang rivers run at rafting-grade Class III-IV flow, ILP processing through eilp.arunachal.gov.in is fast. The drive from Pasighat (190km, 7-8 hours) is at its most reliable.',
  NULL,
  'January in Aalo is the cleanest month of the West Siang year. Daytime 18-22C, nights drop to 7-10C, rainfall under 30mm, mornings begin with low river-mist that lifts by 9am. The Yomgo River Festival runs three days mid-month at the Karbak ground — folk performances from the Galo community, makeshift floating restaurants, paragliding and white-water rafting demonstrations on the Yomgo. Apply for the Inner Line Permit on eilp.arunachal.gov.in 3-4 days before travel; the e-ILP arrives by email and is checked at the Likabali entry gate. The Pasighat-Aalo road (NH-13) is solid, but the 190km drive still takes 7-8 hours via Likabali. Petrol pumps at Likabali, Bagra and Aalo only — fuel up at each. Accommodation runs through Circuit House (₹1,200, book via DC office), Donyi Hango Hotel (₹2,500), and a small homestay grid in Hege village.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 2, 5, 'go',
  'Driest month. 9-24C, clear skies. Rafting season at full strength. Mechuka run-on possible.',
  'February is the West Siang peak — rainfall under 25mm, daytime 22-24C, the Siang and Yomgo at their cleanest rafting flows. The Aalo-Mechuka onward run (180km, 7-10 hours, road condition fair) is feasible without monsoon-landslide risk. Donyi Hango and Circuit House available walk-in.',
  NULL,
  'February in Aalo is when the Galo highlands run at their most travel-coherent. Daytime 22-24C, nights 9-12C, monthly rainfall around 20mm — the Siang and Yomgo rivers run clear, dive-grade visibility through the rafting reaches between Komkar and Pasighat. Class III-IV runs from the Yomgo confluence are the regional draw. February also opens the onward Aalo-Mechuka run: 180km, 7-10 hours by Tata Sumo (the only sensible vehicle for the unpaved last 110km), gates close on landslide-prone stretches in monsoon but February is the cleanest passage of the year. Inner Line Permit covers Aalo-Mechuka-Tato-Tuting circuit; apply 5-7 days ahead through your tour operator. Petrol stops at Likabali, Bagra, Aalo, Tato. Cellular 4G (Jio, Airtel) holds in Aalo town only — beyond Bagra it goes BSNL-only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 3, 4, 'go',
  'Last dry window. 12-27C. Pre-monsoon humidity climbs late month. Rafting at its tail end.',
  'March extends February''s weather minus the festival crowding. Last reliable rafting fortnight before the Yomgo and Siang turn brown with snowmelt and pre-monsoon runoff. Hotel rates settle 15-20 percent below January peak. Mopin Festival (Galo new year) falls early April but pre-festival village preparations are visible from late March.',
  NULL,
  'March in Aalo holds February''s clear skies through the first three weeks before the pre-monsoon haze sets in. Daytime climbs to 24-27C, nights 12-15C, monthly rainfall around 60-80mm with most of it after the 20th. The Yomgo turns from clear winter blue toward the brown of snowmelt by month-end — rafting season effectively closes around March 25. Mopin (the Galo agricultural new year and the state''s biggest indigenous festival) falls in early April; pre-festival rice-beer brewing and bamboo work are visible across Hege and Karbak villages from the third week. The Aalo-Mechuka and Aalo-Tuting onward circuits remain motorable but landslide risk picks up after the first March showers. Apply ILP 4-5 days ahead through eilp.arunachal.gov.in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 4, 3, 'go',
  'Mopin festival peak. 15-30C, pre-monsoon showers. Galo new year mid-month. Onward roads still passable.',
  'April is Mopin month — the Galo new year, celebrated across West Siang villages with chants, white-rice powder paste applied to faces, free rice beer (Apong) and the popona dance. The festival is visitor-welcoming and a defining cultural window. Pre-monsoon humidity climbs but the road network still functions before the May-June rains break it.',
  NULL,
  'April in Aalo is dominated by Mopin — the five-day Galo agricultural new year, peak day usually April 5 but festivities run a week either side. Mopin Putu (community ground), the Bogum Bokang ceremonial pole installations, Popir dance circles, and free Apong (fermented rice beer) at most household courtyards define the village calendar. Daytime 26-30C, nights 15-18C, monthly rainfall 150-200mm in scattered afternoon showers. The Aalo-Mechuka road remains motorable but slip-prone in the last week — check landslide updates before driving onward. The rafting season has closed (Yomgo runs full-monsoon brown by mid-month) but the cultural calendar more than compensates. Donyi Hango and most homestays are full during festival week — book 3 weeks ahead through Aalo Tourism office or the DC.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 5, 2, 'wait',
  'Monsoon arrives early. 18-30C, 350-450mm rainfall, landslide windows open. Roads patchy.',
  'May is when the southwest monsoon hits the Eastern Himalaya advance line. Aalo gets 350-450mm of rain, the Siang and Yomgo run brown and dangerous, the Aalo-Mechuka road shuts for stretches every 3-5 days. Workable for travelers already in-state on a flexible itinerary; not the month for a dedicated Aalo trip.',
  'May in Aalo is when the wider Siang valley starts shedding road infrastructure to the rains. The Yomgo and Siang are no longer rafting rivers; they are silt-loaded torrents. The Aalo-Mechuka onward circuit develops landslide-prone breakages every few days, often clearing within 24-48 hours but unpredictable.',
  'May in Aalo is the pivot from spring to monsoon and the calendar turns rough fast. The southwest monsoon advance reaches West Siang around May 10; daily afternoon storms become the rule by mid-month. Daytime 24-30C, nights 18-21C, humidity climbs past 85 percent, monthly rainfall 350-450mm. The rafting window has closed. The Aalo-Mechuka road faces 2-4 closure events through the month, usually 24-48 hours each — Tato-Mechuka stretch worst hit. Inner Line Permit processing slows as office systems get hit by power cuts. Domestic flights to Pasighat (the nearest airport, 190km) operate but get weather-cancelled on heavy days. The Aalo Circuit House and Donyi Hango Hotel run lighter-staffed schedules. If dates are immovable and the trip is Aalo-only (no onward Mechuka), the visit works in fits. October is dramatically cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 6, 1, 'skip',
  'Full monsoon. 600-800mm rainfall. Roads break, rivers flood, Aalo-Mechuka unusable. Skip.',
  NULL,
  'June is full Eastern Himalaya monsoon. Aalo registers 600-800mm of rain, the Siang and Yomgo flood Class V at the lowest reaches, the Aalo-Mechuka road develops multi-day closures. Pasighat flights cancel on heavy days. There is no functioning travel itinerary in Aalo this month.',
  'June in Aalo is the wettest stretch of the West Siang year. Monthly rainfall sits at 600-800mm, often delivered as 12-hour deluges that knock landslides across NH-13 and the Aalo-Tato-Mechuka stretch alike. Daytime 23-29C, nights 19-22C, but the wet-bulb temperature makes outdoor walking unpleasant. The Yomgo runs at flood-stage. Most homestays in surrounding villages (Hege, Karbak, Bagra) close to non-resident guests as families focus on rice transplantation and home-roof repairs. Aalo town''s grid takes power-cut hits 4-6 hours daily. The Pasighat-Aalo bus runs but cancellations are common; the road from Likabali develops gully-washouts every 15-20 days. There is no version of the trip that works in June. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 7, 1, 'skip',
  'Peak monsoon. 700-900mm rainfall. Landslide closures every 5-7 days. Functionally closed.',
  NULL,
  'July is the wettest month at Aalo. 700-900mm rainfall, landslide closures every 5-7 days on the Likabali-Aalo and Aalo-Mechuka stretches, Pasighat flights cancelled half the days of the month. Rivers run at peak flood. Domestic visitors are essentially zero. Skip the month.',
  'July in Aalo runs the wettest stretch of the entire Eastern Himalayan calendar. Monthly rainfall lands at 700-900mm — the highest of any month — and the Aalo-Mechuka road closes for 4-6 multi-day stretches across the month. The Likabali-Aalo NH-13 itself takes 2-3 closure events as the Brahmaputra-side feeders flood. Daytime 24-29C with 88-92 percent humidity makes drying clothes nearly impossible. The Yomgo and Siang are dangerously flooded — locals avoid the riverbanks. Power cuts run 5-8 hours daily. Aalo town functions for residents but tourism infrastructure (hotels, taxis, Donyi Hango Hotel restaurant) operates skeleton hours. There is no day-visitor trip that works in July. The next functional window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 8, 1, 'skip',
  'Monsoon continues. 600-800mm rainfall. Aug 15 Independence Day local programmes. Roads still patchy.',
  NULL,
  'August stays in monsoon. 600-800mm rainfall, multi-day road breaks, Pasighat flight cancellations every other day. Aug 15 brings local Independence Day programmes at the Aalo District HQ ground but the trip itself does not work. Skip.',
  'August in Aalo is more of July with marginally fewer wet days. Monthly rainfall 600-800mm spread across 25-27 wet days. The Aalo-Mechuka road continues to break and reopen on weekly cycles. The Pasighat-Aalo NH-13 takes 2-3 multi-day closures across the month. Daytime 24-30C, humidity 85-90 percent. The August 15 Independence Day flag-hoisting at the Aalo District HQ ground is the month''s sole organised event — a strictly local affair. Rafting remains impossible (rivers in flood). The Donyi Hango and Circuit House operate but on monsoon-light staffing. The few visitors in town are usually government officials on duty postings. There is no holiday version of the Aalo trip that runs in August. The next clean window starts late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 9, 2, 'wait',
  'Monsoon retreating. 350-450mm rainfall. Roads stabilising late month. Rafting still 6 weeks away.',
  'September is the slow recovery. Rainfall drops to 350-450mm, mostly first fortnight. Aalo-Mechuka road becomes reliable again from the third week. Rafting still off — rivers won''t clear until early November. Workable for the rare hardy traveler, but October is materially cleaner.',
  'September is on the way out of monsoon but still firmly in it for the first ten days. Aalo-Mechuka road remains landslide-prone until mid-month. Rafting season is still six weeks away. October delivers a cleaner trip with no real downside.',
  'September in Aalo is the slow recovery from July-August battering. Monthly rainfall drops to 350-450mm with most of it falling in the first ten days. By the third week, the Likabali-Aalo NH-13 stabilises and Pasighat flights run their full schedule. Daytime 24-29C, nights 17-20C, humidity easing toward 80 percent. The Aalo-Mechuka road becomes reliable again from around September 20. Rivers (Yomgo, Siang) start dropping but remain too silty for rafting — that recovery comes in November. The Galo villages around Aalo (Hege, Karbak, Bagra) are deep in autumn rice-harvest, which is its own visual reward but means homestays are reduced-capacity through harvest week. The Donyi Hango Hotel and Aalo Circuit House return to full hours. Workable for travelers with a flexible itinerary; not as clean as October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 10, 5, 'go',
  'Season opens. 100-150mm rainfall mostly first week. 14-26C. Roads fully restored, rafting returning.',
  'October is the season-opener. Rainfall collapses to 100-150mm, daytime 24-26C, nights 14-17C. Aalo-Mechuka road back at full reliability. Rafting season starts late month as the Yomgo and Siang clear. Hotel rates 25-30 percent below January-February peak.',
  NULL,
  'October in Aalo is when the West Siang year visibly turns. Monthly rainfall drops to 100-150mm, mostly in the first 7-10 days, then most of the back half is clear. Daytime 24-26C, nights cool to 14-17C, humidity falls below 75 percent. The Aalo-Mechuka onward stretch is fully restored by October 15 — book your circuit through one of the Aalo-based operators (Donyi Hango Travels, Mopin Tours) for the road and ILP combination. The Yomgo and Siang clear up by the last week of October — rafting operators based in Pasighat and Aalo restart Class III-IV runs on the Yomgo from October 25. The Galo villages settle into post-harvest calm, the granaries (the lokho-pakho) fill, and homestays return to full capacity. Domestic flights to Pasighat run their full schedule. Hotel rates are still 25-30 percent below January-February peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 11, 5, 'go',
  'Peak. 11-24C, dry. Rafting at full strength, road network reliable. Pre-Yomgo Festival quiet.',
  'November is one of the better months at Aalo. Rainfall under 50mm, daytime 22-24C, nights 11-14C. The Yomgo and Siang are at peak rafting flow. ILP processing fast. The Aalo-Mechuka onward run is at its most reliable.',
  NULL,
  'November in Aalo is peak West Siang. Monthly rainfall sits under 50mm, daytime 22-24C, nights 11-14C, humidity at 70 percent. The Yomgo and Siang have cleared post-monsoon silt — Class III-IV rafting runs on the Yomgo (operators based out of Donyi Hango Travels and a handful of Pasighat-based outfits) hit their seasonal flow. The Aalo-Mechuka onward circuit is reliable; landslides are almost zero through to February. ILP processing through eilp.arunachal.gov.in returns to 24-48 hour windows. The Galo villages run a full post-harvest calendar; Hege and Karbak homestays operate at full capacity. The Yomgo River Festival itself falls in January but the run-up months are when Aalo runs at its most coherent — you get the same weather minus the festival crowds. Domestic flights to Pasighat at 90 percent of capacity. Hotel rates begin climbing about 15-20 percent from mid-month as January festival travellers book early.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('aalo', 12, 5, 'go',
  'Driest dryness. 8-22C. Rafting at peak, roads fully solid. Christmas-NY light tourist bump.',
  'December is the year''s driest stretch in Aalo. Rainfall under 20mm, daytime 20-22C, nights drop to 8-10C, skies clear at altitudes above 600m. Rafting at peak. ILP processing fast. Christmas-NY brings a small domestic tourist bump but well below Yomgo Festival levels.',
  NULL,
  'December in Aalo is the year''s driest stretch. Monthly rainfall lands under 20mm, daytime 20-22C, nights drop to 8-10C, skies are largely cloudless above 600m altitude. The Yomgo and Siang run at the cleanest visibility of the year — Class III-IV rafting through the Yomgo confluence is at peak conditions. The Aalo-Mechuka and Aalo-Tato onward circuits are at maximum reliability through the cold-but-dry month. The Galo villages turn into post-harvest gathering season — community kitchens, ceremonial Apong, communal pork roasts. Inner Line Permit applications through eilp.arunachal.gov.in process in 24-48 hours; the e-permit arrives by email. Christmas-New Year sees a small bump in domestic tourists, mostly out of Assam and Meghalaya, but Aalo remains uncrowded compared to the Yomgo Festival peak in January. Donyi Hango Hotel rates run 15-20 percent below January peak. Cellular: BSNL stable in town, Jio/Airtel in patches.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- DAMBUK (Lower Dibang Valley, Arunachal Pradesh) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 1, 5, 'go',
  'Post-festival quiet. 7-22C, dry. Bhupen Hazarika Setu route from Dibrugarh at its smoothest.',
  'January is Dambuk at its most operationally clean. Orange Festival crowds have cleared by January 5, but the orange harvest carries through and the road via the 9.2km Bhupen Hazarika Setu (Dhola-Sadiya bridge) from Dibrugarh — 4-5 hours — is at its driest. Inner Line Permit processing 48 hours.',
  NULL,
  'January in Dambuk is the post-festival recovery month and arguably the smartest time to visit. The Orange Festival of Adventure and Music (mid-December) is over, the riverside ground at Dambuk has cleared, but the orange harvest itself runs through January — orchards on the way to Roing are still loaded with fruit. Daytime 18-22C, nights 7-10C, monthly rainfall under 30mm. The drive from Dibrugarh airport via the 9.2km Bhupen Hazarika Setu (the Dhola-Sadiya bridge, India''s longest river bridge) takes 4-5 hours through Roing — a 35km onward leg from Roing to Dambuk that includes one or two seasonal river crossings. Inner Line Permit applications process in 48 hours through eilp.arunachal.gov.in. The Mishmi homestay grid (which expands for the festival) keeps a smaller permanent capacity through January — book through a Dibrugarh or Roing operator. Domestic flights to Dibrugarh at 80 percent of capacity.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 2, 5, 'go',
  'Driest month. 9-25C. Mishmi homestays at full capacity. Roing-Mayodia onward circuit reliable.',
  'February is the cleanest stretch of the Lower Dibang year. Rainfall under 25mm, dry trail conditions, the Roing-Mayodia Pass-Anini onward circuit fully motorable. Orange harvest tail. Mishmi cultural villages around Anini and Mayodia accessible. Quiet after January.',
  NULL,
  'February in Dambuk runs February-clean across Lower Dibang Valley. Daytime 22-25C, nights 9-12C, monthly rainfall around 20mm. The Roing-Mayodia Pass-Anini onward circuit (170km, 6-7 hours via the Mayodia Pass at 2,655m) is at its most reliable through the dry months. Mishmi village clusters near Anini run small seasonal homestay operations. The Bhupen Hazarika Setu route from Dibrugarh holds smooth — the 4-5 hour drive is the year''s most pleasant stretch. The Sally Lake and Mehao Lake near Roing are at clearest visibility. Inner Line Permit applications through eilp.arunachal.gov.in process in 48-72 hours; physical ILP collection at the Roing entry gate. Cellular: BSNL stable, Jio/Airtel in Roing town only. Petrol pumps at Tinsukia, Sadiya, Roing — fuel before each leg. Hotels run small (Hotel Mishmi Hills, Roing) but Mishmi homestays in Anini and Mayodia are the real call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 3, 4, 'go',
  'Last dry window. 13-28C, 80-120mm rainfall late month. Pre-monsoon humidity climbs.',
  'March holds February''s weather through the first three weeks before the pre-monsoon haze rolls in. Roing-Mayodia onward circuit still reliable through mid-month. Last clean window before April-May rains break the road network.',
  NULL,
  'March in Dambuk is the soft-landing month before the rains. Daytime 25-28C, nights 13-16C, monthly rainfall 80-120mm with most of it after the 20th. The Roing-Mayodia onward circuit holds through the first three weeks but starts taking landslide breaks from late March. The Bhupen Hazarika Setu route from Dibrugarh remains smooth — most of the rain stays on the Lohit side of the bridge. Pre-monsoon humidity climbs from 70 percent toward 80 percent in the last week, which makes the Dibang riverside walks at Dambuk noticeably stickier. Mishmi villages near Anini and Mayodia start their pre-festival farm-clearing rituals. Hotel rates remain at January-February levels but the Mishmi homestay grid begins shrinking by month-end as families turn to monsoon preparations. ILP processing remains 48-72 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 4, 2, 'wait',
  'Pre-monsoon. 17-31C, 200-300mm rainfall, road network deteriorating. Reh festival mid-month.',
  'April is when the southwest monsoon advance reaches Lower Dibang. Rainfall jumps to 200-300mm, the Dibang River starts running brown, road conditions deteriorate. Reh Festival (Idu Mishmi) falls February 1 — by April the festival cycle has passed. Workable for travelers already in-state.',
  'April in Dambuk is when the year visibly tilts toward monsoon. Pre-monsoon thunderstorms become afternoon-daily by mid-month, the Roing-Mayodia onward stretch sees landslide breaks, and the Mishmi homestay grid is winding down. The trip from Dibrugarh still works (the Bhupen Hazarika Setu remains usable) but the broader circuit is on borrowed time.',
  'April in Dambuk is the early-monsoon pivot month. The southwest monsoon advance lands on the Lower Dibang Valley around April 10; afternoon thunderstorms become almost daily by month-end. Daytime 27-31C, nights 17-20C, humidity climbs past 85 percent, monthly rainfall 200-300mm. The Roing-Mayodia onward circuit takes its first landslide closures (typically 24-48 hour clears). The Dibang River, fed by snowmelt off the Mishmi Hills plus rain, swells from clear to silt-loaded brown. The Bhupen Hazarika Setu route from Dibrugarh holds reliably but the onward Roing-Dambuk leg requires checking road status with local taxi operators before driving. Mishmi villages near Anini close their homestay operations through monsoon. The trip works in fits, but October is materially cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 5, 1, 'skip',
  'Monsoon arrives. 21-31C, 400-500mm rainfall. Road network breaks. Skip.',
  NULL,
  'May is when the Lower Dibang Valley enters proper monsoon. Rainfall 400-500mm, the Dibang in full flood, the Roing-Dambuk road regularly blocked. The Mishmi homestay grid is closed. There is no functional travel itinerary in Dambuk through May.',
  'May in Dambuk is monsoon at full strength. Monthly rainfall lands at 400-500mm, the Dibang River runs at near-flood stage, and the 35km Roing-Dambuk road develops impassable stretches as small streams feed into seasonal washouts. Daytime 27-31C, nights 21-24C, humidity 90 percent. The Bhupen Hazarika Setu remains motorable (it is built for floods) but the onward Roing-Dambuk leg is unreliable for stretches of 3-7 days. The Mishmi homestay grid in Dambuk village is closed for monsoon — orange orchard owners turn to harvest preparation. Power cuts run 5-7 hours daily. Domestic flights to Dibrugarh continue but cancellations rise. The Orange Festival ground is under monsoon water through to October. There is no version of the trip that works in May; wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 6, 1, 'skip',
  'Peak monsoon. 600-900mm rainfall. Roing-Dambuk only by elephant on the worst weeks. Skip.',
  NULL,
  'June is the wettest month at Dambuk. 600-900mm rainfall, the Dibang at flood stage, the Roing-Dambuk road impassable for vehicles on heavy days — historically isolated, with elephant crossings as the local fallback. Power cuts daily, no homestays open. Skip.',
  'June in Dambuk is when the Lower Dibang Valley''s historic isolation reasserts. Monthly rainfall lands at 600-900mm. The 35km Roing-Dambuk road is functionally impassable for 4-6 multi-day stretches; on the worst weeks the village becomes accessible only by elephant crossing through the swollen feeder streams. The Dibang River runs at peak flood. Daytime 26-30C, nights 22-24C, humidity 92 percent. Mishmi homestay grid fully closed. The Orange Festival riverside ground sits under monsoon water. The Bhupen Hazarika Setu route from Dibrugarh remains usable but the onward leg is unreliable. Power cuts run 6-8 hours daily. Local life carries on (rice transplantation, orange orchard care) but there is no travel itinerary in Dambuk this month. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 7, 1, 'skip',
  'Monsoon at full strength. 700-1000mm rainfall. Village inaccessible by road most of the month. Skip.',
  NULL,
  'July is Dambuk''s most isolated month. 700-1000mm rainfall, the Roing-Dambuk road impassable for vehicles most of the month. Even the Bhupen Hazarika Setu approach takes weather hits. The trip fundamentally cannot happen.',
  'July in Dambuk is when the Lower Dibang Valley sits under near-continuous Eastern Himalayan monsoon. Monthly rainfall lands at 700-1000mm — among the highest in India. The Roing-Dambuk road is impassable to vehicles for stretches of 7-15 days; the village becomes road-accessible only on intermittent dry windows. The Dibang River is at peak flood and the multiple seasonal streams between Roing and Dambuk run at chest-deep crossings on bad days. Daytime 25-29C, nights 22-24C, humidity at 92-95 percent. The Mishmi homestay grid is fully closed. The Bhupen Hazarika Setu approach from Dibrugarh remains operational but flights to Dibrugarh take weather cancellations on heavy days. Power cuts 6-9 hours daily. There is no version of the Dambuk trip that runs in July; the next clean window starts in late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 8, 1, 'skip',
  'Monsoon continues. 600-800mm rainfall. Independence Day local programmes. Roads still patchy. Skip.',
  NULL,
  'August stays in monsoon. 600-800mm rainfall, the Roing-Dambuk road continues to break and clear on weekly cycles. Aug 15 brings local Independence Day programmes at Roing District HQ but the Dambuk village trip itself does not work. Skip.',
  'August in Dambuk is the second-wettest month and runs much like July. Monthly rainfall 600-800mm. The Roing-Dambuk road remains in cyclical break-and-clear mode; multi-day closures continue. The Dibang River is still at flood stage. Daytime 26-30C, nights 21-23C, humidity 90 percent. Mishmi homestays remain closed. The August 15 flag-hoisting at Roing District HQ ground is the month''s sole organised event but it doesn''t justify the trip. The Bhupen Hazarika Setu route from Dibrugarh holds, but the onward Roing-Dambuk leg is unreliable. Domestic flights to Dibrugarh take weather cancellations 30-40 percent of days. Power cuts continue at 5-7 hours daily. There is no holiday version of the trip in August; the next functional window arrives in late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 9, 2, 'wait',
  'Monsoon retreating. 350-500mm rainfall, road network stabilising late month. Still patchy.',
  'September is the slow recovery from monsoon. Rainfall drops to 350-500mm, mostly first fortnight. Roing-Dambuk road becomes reliable again from the third week. Mishmi homestays start prepping for October re-opening. October is materially cleaner with one extra month of patience.',
  'September is on the way back to road-coherent but still firmly in monsoon for the first fortnight. The Roing-Dambuk road remains in break-and-clear mode through the first three weeks. Mishmi homestay grid is in re-opening prep, not yet operational. October delivers a meaningfully cleaner trip with no real downside.',
  'September in Dambuk is the slow re-opening. Monthly rainfall drops to 350-500mm with most of it falling in the first ten days. By the third week, the Roing-Dambuk road returns to reliable single-day clears (no multi-day closures), and the Bhupen Hazarika Setu route from Dibrugarh runs at full speed. Daytime 24-29C, nights 18-21C, humidity easing toward 85 percent. The Dibang River is dropping but still runs silt-loaded. The Mishmi homestay grid in Dambuk village starts pre-season prep — orchards are being cleared, homestay rooms are being readied for October-onwards visitors. The Roing-Mayodia-Anini onward circuit becomes motorable again from September 20. Domestic flights to Dibrugarh return to full schedule. Hotel rates in Roing remain off-peak (40-50 percent below January-February). The trip works for travelers with flexible plans; October is meaningfully cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 10, 4, 'go',
  'Season opens. 100-180mm rainfall mostly first week. 16-27C. Mishmi homestays re-opening.',
  'October is the re-opening month. Roing-Dambuk road reliably clear, Mishmi homestays returning to full operation, the Dibang River clearing rapidly. Pre-Orange Festival quiet — December''s rates and crowds are still 6-8 weeks out.',
  NULL,
  'October in Dambuk is when the Lower Dibang Valley starts running properly again. Monthly rainfall drops to 100-180mm with most of it in the first 7-10 days. Daytime 24-27C, nights 16-19C, humidity falls to 75 percent. The Roing-Dambuk road runs at full reliability from October 15. Mishmi homestays in Dambuk village (small grid: typically 8-12 family-run rooms) re-open through the first three weeks. The Roing-Mayodia-Anini onward circuit is back at full speed by mid-month. The Bhupen Hazarika Setu approach from Dibrugarh runs smoothly. The orange orchards are mid-cycle — fruit not yet ready for harvest, but the visual character of the Dambuk approach is back. Hotel rates run 25-30 percent below the December-festival peak. Inner Line Permit applications process in 48 hours. The Pasighat-Roing road also fully reliable. Strong call for travelers wanting Dambuk without the December-festival crowding.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 11, 5, 'go',
  'Pre-festival peak. 11-25C, dry. Orange orchards ripening, homestays at full grid. Festival rates kick in late.',
  'November is one of the cleanest months at Dambuk. Rainfall under 50mm, daytime 22-25C, nights 11-14C. Orange orchards ripening for the December harvest peak. Mishmi homestay grid at full strength. Festival rates kick in from November 25 onwards as Orange Festival travellers begin arriving.',
  NULL,
  'November in Dambuk is the year''s pre-festival peak. Monthly rainfall under 50mm, daytime 22-25C, nights 11-14C, humidity at 70 percent. The Dibang River runs clear, the Roing-Dambuk road at full reliability, the Mishmi homestay grid (typically 12-15 family rooms across the village) at full operational strength. Orange orchards on the Roing-Dambuk and Anini approaches are ripening for the December harvest peak. The Roing-Mayodia-Anini onward circuit is at maximum reliability. Inner Line Permit applications process in 24-48 hours. Festival pricing kicks in from November 25 onward as Orange Festival of Adventure and Music travellers begin arriving — Mishmi homestay rates jump 40-60 percent for the December 15-25 window. Hotels in Roing (Hotel Mishmi Hills, Hotel Sally Lake View) run at 80-90 percent of capacity. The Bhupen Hazarika Setu route from Dibrugarh is at its smoothest. Strong call for travellers wanting the orange harvest without festival crowding.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dambuk', 12, 5, 'go',
  'Orange Festival peak mid-month. 8-22C, dry. Homestays book out 2 months ahead. Music+adventure+oranges.',
  'December is Dambuk''s defining month — the Orange Festival of Adventure and Music runs 4 days mid-month (typically Dec 15-19, dates announced in October at orangefestivaldambuk.in). Mishmi homestays book 2 months ahead. Music acts, river rafting, parasailing, ATV runs at the riverside ground. Oranges everywhere.',
  NULL,
  'December in Dambuk is the year''s defining month. The Orange Festival of Adventure and Music — running since 2015 — falls mid-month (typically December 15-19, exact dates announced in October at orangefestivaldambuk.in). The festival combines a music line-up (rock, folk, EDM acts on a riverside stage), adventure programming (river rafting, parasailing, paramotoring, dirt cycling, zip-lining, ATV, scuba in the Dibang), and the orange harvest itself — orchards on the Roing-Dambuk approach are at peak fruit. Mishmi homestays in Dambuk village book out 2 months ahead at festival rates 50-80 percent above November; festival camping at the Orange Festival ground is the primary alternative. Daytime 20-22C, nights drop to 8-10C, monthly rainfall under 25mm. The Bhupen Hazarika Setu route from Dibrugarh is at its smoothest. Inner Line Permit applications backed up — apply 7-10 days ahead through your festival operator. Christmas-NY week (post-festival) settles into orange-harvest quiet at festival-discounted rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- CHANDRATAL (Spiti, Himachal Pradesh) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 1, 1, 'skip',
  'Frozen and inaccessible. -25 to -10C. Kunzum Pass under 6+ feet of snow. No road, no camps, no visit.',
  NULL,
  'January at Chandratal is a non-event for travellers. The lake is frozen solid, Kunzum Pass on either approach (Manali side and Kaza side) sits under 6-10 feet of snow, no road, no camps, no human access. The next viable window starts mid-June.',
  'January at 4,300m on the Spiti plateau is one of the most hostile environments in the Indian Himalaya. Chandratal — the Moon Lake — sits frozen, snow piled 6-10 feet on the surrounding bowl, both approach roads (Manali via Rohtang/Atal Tunnel/Gramphu/Batal/Kunzum, and Kaza via Losar/Kunzum) impassable. Daytime temperatures in the lake basin peak at -10C; night drops to -25C. Atal Tunnel keeps Manali-Sissu-Koksar open year-round, but the onward Gramphu-Batal stretch closes from late October. Adventure-camp operators (the seasonal tent grids beyond Batal) shut down by the second week of October and don''t return until late June. There is no version of the Chandratal trip that runs in January. The plateau is for the Border Roads Organisation crews and a handful of wintering yak herders only. The first viable visitor window is around June 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 2, 1, 'skip',
  'Year''s coldest. -28 to -12C. Lake frozen, no road access, no camps. Skip.',
  NULL,
  'February is the year''s coldest stretch at Chandratal. -28C nights, no road access, lake frozen 1.5m thick. There is no visit available. Wait for late June.',
  'February at Chandratal runs the year''s coldest window. Daytime peaks at -12C, nights drop to -28C, the lake ice is at its thickest (around 1.5m). Both approach roads remain firmly closed: the Manali-Gramphu-Batal-Kunzum stretch sits under deep snow, and the Kaza-Losar-Kunzum approach does the same. Even the Spiti Valley winter circuit (which runs from Shimla via Reckong Peo to Kaza) cannot reach Chandratal — Kunzum Pass is the gating geography and it does not clear in February. Tent operators are months away from re-deploying. The closest reachable point in February is Kaza itself (year-round via the Shimla-Kinnaur side), and from Kaza, Chandratal remains 100km of unreachable snow-buried road. There is no version of the trip in February.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 3, 1, 'skip',
  'Still snowbound. -22 to -5C. BRO snow-clearance starting on Manali approach. Lake still frozen.',
  NULL,
  'March is when BRO begins snow-clearance on the Manali side, but the Gramphu-Batal-Kunzum stretch is months from re-opening. Lake still frozen, no camps, no road. Skip.',
  'March at Chandratal extends the deep-winter shutdown. Daytime peaks at -5C, nights -22C, the lake ice still solid. The Border Roads Organisation begins its snow-clearance operation on the Manali-Atal Tunnel-Gramphu approach in mid-March, but the actual Gramphu-Batal-Kunzum-Chandratal stretch sees clearing only from late May at the earliest. The Kaza side via Losar-Kunzum is similarly months away. Tent camps are not operational. There is no road access. The full plateau remains in winter shutdown. Local Spiti operators based in Kaza (reachable year-round via the Shimla-Reckong Peo route) start their season-prep in March but have no Chandratal product to sell until mid-June. Wait.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 4, 1, 'skip',
  'BRO clearance underway. -15 to 2C. Lake melt starting. Roads still 6-8 weeks from opening.',
  NULL,
  'April is when BRO clearance picks up on the Atal Tunnel side, but Kunzum Pass and the Chandratal access road are 6-8 weeks from opening. Lake ice begins melting late month. No camps, no road, no visit.',
  'April at Chandratal is when the BRO clearance operation reaches Atal Tunnel on the Manali side and starts pushing into Sissu and Koksar, but the Gramphu-Batal-Kunzum stretch — which is the gating geography — remains weeks away. Daytime in the lake basin peaks at 2C, nights -15C. Lake ice begins thinning by month-end but the surface remains frozen. Tent operators based in Manali start their season-prep (sourcing diesel for genset, hiring kitchen staff) but cannot deploy until the road reaches Batal. Kaza-side operators face the same gating: Kunzum Pass is impassable until late May, often early June. The earliest viable Chandratal window in any year is approximately June 15-20. April is firmly off-season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 5, 1, 'skip',
  'BRO close to Kunzum. -8 to 8C. Late-month: Kaza side may open with 4×4 only. Camps not yet up.',
  NULL,
  'May is when the BRO clearance reaches Kunzum Pass. Historical pattern: pass opens last week of May for 4×4 vehicles only, day-trips from Kaza side. Manali side typically a week behind. Tent camps not yet deployed; no overnight stays.',
  'May at Chandratal is the slow re-opening month for the road network, but functionally still off-limits to most travellers. The BRO clearance operation reaches Kunzum Pass in the last week of May (4×4 access only initially); the historical pattern shows around 24-26 May as the typical opening date for the Kaza-side day-trip. The Manali-Gramphu-Batal-Kunzum stretch typically opens 5-10 days behind the Kaza side. Even when the pass becomes crossable, the side-road branching off toward Chandratal Lake is often still uncleared, blocked, or too rough for vehicles. Daytime in the basin peaks at 8C, nights -8C. The lake ice starts breaking up in the last week of May. Tent operators (the eco-camps between Batal and the Chandratal trailhead) typically deploy from mid-June; May is too early for overnight stays. Acclimatisation gating: anyone reaching the lake in May must have already spent 48+ hours at Kaza or Manali altitude.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 6, 4, 'go',
  'Season opens. 0-15C. Camps deploying mid-month. Manali approach opens late-May/early-June.',
  'June is when Chandratal opens for business. Tent camps deploy mid-month, both road approaches reliable from June 15-20, lake ice is fully melted by month-end. AMS risk is real — the lake sits at 4,300m and you must acclimatise at Kaza or Manali for 48+ hours first.',
  NULL,
  'June at Chandratal is when the Spiti plateau finally opens for visitors. Daytime in the lake basin reaches 12-15C, nights 0-3C, snow patches still visible on the rim peaks but the lake itself fully melted by June 20. Tent camps (the seasonal grid of 6-8 operators between Batal and the Chandratal trailhead — Parasol Camps, Spiti Adventure Camp and similar) deploy from June 10-15 and run through late September only. Both road approaches are reliable from June 15: Manali via Atal Tunnel-Gramphu-Batal-Kunzum (90km, 6-7 hours including Atal Tunnel), and Kaza via Losar-Kunzum (60km, 3-4 hours). The lake itself sits 1.5km from the Batal-side road; the motorable approach ends 1.5km before the lake (a 3km no-camping buffer applies, set by the Koksar Panchayat to protect water quality). AMS is the dominant risk — sleeping at Chandratal at 4,300m is recommended only after 48+ hours acclimatisation at Kaza (3,800m) or Sarchu (4,250m). Carry diamox; oxygen rental at HP Tourism Kaza office covers emergencies.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 7, 4, 'go',
  'Peak summer. 3-17C. Both road approaches reliable. Camps at full capacity. Manali side cloud-buildup risk.',
  'July is peak Chandratal season. Lake at full melt, tent camps fully deployed, both approach roads at maximum reliability. The Manali side picks up monsoon-edge cloud buildup but the Spiti plateau itself is rain-shadowed and stays dry.',
  NULL,
  'July at Chandratal is peak season. Daytime in the basin reaches 14-17C, nights 3-5C, the lake at full melt and reflecting the surrounding 6,000m peaks at their cleanest. Tent camp grid is at full capacity (6-8 operators, total ~120 tent beds across the Batal-trailhead corridor). Both approach roads at maximum reliability: Manali-Atal Tunnel-Gramphu-Batal-Kunzum and Kaza-Losar-Kunzum. The Spiti plateau itself is rain-shadowed (Kunzum is the rain barrier) and receives under 30mm of rainfall in July despite the monsoon at full strength on the Manali side. Manali-Gramphu approach can develop landslide breaks on heavy monsoon days — typically clearing within 24 hours. Camp bookings should be locked 2-3 weeks ahead through operators. Acclimatisation at Kaza (3,800m) for 48 hours before sleeping at Chandratal remains non-negotiable. Carry cash — Batal has no ATM, no ATM exists between Manali/Kaza and Chandratal.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 8, 4, 'go',
  'Peak summer continues. 3-17C. Manali side landslide risk peaks. Kaza side reliable.',
  'August continues the peak window. Manali-Gramphu approach takes more frequent landslide breaks on heavy days — Kaza side stays reliable. Camps at full capacity. The single best month for Spiti circuits including Chandratal.',
  NULL,
  'August at Chandratal is the second peak month and one of the cleanest windows of the year for the broader Spiti circuit. Daytime in the lake basin 14-17C, nights 3-5C, the lake at maximum reflectivity. Tent camps at full capacity. The Spiti plateau remains rain-shadowed — under 35mm of rainfall — but the Manali-Atal Tunnel-Gramphu approach absorbs the monsoon at full strength, and August sees the year''s most frequent landslide breaks on the Manali side (typically 2-4 events, each clearing within 24-48 hours). The Kaza-Losar-Kunzum approach via the Shimla-Kinnaur winter route stays reliable. Smart August itineraries enter via Manali and exit via Shimla (or vice versa) to hedge against landslide closures. Acclimatisation at Kaza or Sarchu for 48 hours before sleeping at the lake remains essential. Camps run through late September only; the booking window is tightest in August at Independence Day weekend (book 3-4 weeks ahead).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 9, 5, 'go',
  'Best month. 0-15C, dry, monsoon retreating. Camps still deployed. Cleanest air-quality of the year.',
  'September is arguably Chandratal''s best month. Monsoon retreating from the Manali side, the Spiti plateau dry as ever, daytime 12-15C, nights drop close to freezing in the last week. Camps still operational till late month. Cleanest reflective lake of the year.',
  NULL,
  'September at Chandratal is the year''s most coherent window. Monsoon retreats from the Manali approach in the first fortnight; landslide risk on the Manali-Gramphu stretch drops sharply. Daytime in the basin reaches 12-15C, nights 0-3C in the early month and dropping to -5C in the last week. The lake reflects at its cleanest of the year. Tent camps remain operational through to September 25-30 (the last camps wind down before the October cold sets in). Both approach roads at maximum reliability: Manali via Atal Tunnel-Gramphu-Batal-Kunzum, Kaza via Losar-Kunzum. The September air quality on the Spiti plateau is the cleanest of any month — combination of low humidity, post-monsoon clarity and zero summer haze. Camp bookings still need 2-3 weeks lead time. AMS protocols (48+ hours at Kaza or Sarchu before sleeping at 4,300m) remain essential. Last clean window before the October-May shutdown.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 10, 2, 'wait',
  'Season closes. -8 to 10C. Camps wind down first week. First snowfall on Kunzum mid-month.',
  'October is the season-closer. Tent camps wind down by Oct 5-10. Kunzum Pass takes its first snowfall mid-month. By Oct 25 the Manali-Gramphu approach starts closing for winter. Workable for the very first 7-10 days of the month if camps are pre-booked.',
  'October at Chandratal is when the lake basin shuts down for winter. Tent camps are gone after the first 10 days. The Manali-Gramphu approach takes its first snowfall around October 15-20 and closes for winter by October 25-30. Day-trips from Kaza are possible until the Kunzum Pass closes (typically late October).',
  'October at Chandratal is the wind-down month. Tent camps (Parasol, Spiti Adventure, et al) remove their tent infrastructure between October 5-10; after that there is no overnight stay available at the lake. Daytime in the basin 5-10C, nights -8 to -3C. Kunzum Pass takes its first significant snowfall around October 15-20 and the BRO begins flagging the Manali-Gramphu stretch for winter closure (full closure typically October 25-30). The Kaza side remains accessible for day-trips a week or two longer (Kaza itself stays open year-round via the Shimla-Reckong Peo winter route). The first 7-10 days of October are workable if camps are pre-booked, but waiting for next June is the cleaner play. Acclimatisation requirements unchanged: 48+ hours at Kaza (3,800m) before going to 4,300m.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 11, 1, 'skip',
  'Closed for winter. -15 to 2C. Both approaches snow-blocked. No road, no camps. Skip.',
  NULL,
  'November is when Chandratal enters full winter shutdown. Both Manali and Kaza approaches snow-blocked, no tent camps, no road access. The lake begins re-freezing late month. Wait for next June.',
  'November at Chandratal is the early-winter shutdown. Daytime peaks at 2C, nights drop to -15C, snow begins accumulating on the rim and the lake surface starts re-freezing in the last week. Both approach roads — Manali-Atal Tunnel-Gramphu-Batal-Kunzum and Kaza-Losar-Kunzum — sit firmly closed by mid-November. The BRO completes its winter-stop checks on Kunzum by November 20. Tent operators have removed all infrastructure; no overnight stay anywhere in the lake basin. Kaza remains accessible year-round via the Shimla-Reckong Peo road but Chandratal itself is unreachable from there. The plateau enters the seven-month shutdown that runs through to mid-June. There is no version of the trip in November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chandratal', 12, 1, 'skip',
  'Frozen and inaccessible. -22 to -5C. Lake re-frozen. No road, no camps, no visit. Skip.',
  NULL,
  'December at Chandratal is full winter. -22C nights, lake fully re-frozen, both road approaches under 4-6 feet of snow. There is no visit available. Wait for late June.',
  'December at Chandratal is full winter again. The lake is fully re-frozen by the first week of December. Daytime in the basin peaks at -5C, nights drop to -22C. Both road approaches sit under 4-6 feet of accumulated snow. No tent camps, no operators, no road access. The Spiti plateau as a whole is in deep-winter mode — Kaza itself is reachable via the Shimla-Reckong Peo year-round route but Chandratal is firmly out of bounds. Local Spiti winter tourism (the small Kaza-based experience targeting snow leopards in Kibber and the frozen-monastery loop at Tabo) does not extend to Chandratal at all. The next viable Chandratal window starts approximately June 15. Skip the month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- KAZA (Spiti, Himachal Pradesh) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 1, 2, 'wait',
  'Deep winter. -25 to -2C. Shimla-Kinnaur road only. HRTC bus running, most homestays closed.',
  'January at Kaza is for hardened winter travellers. Shimla-Reckong Peo-Kaza road stays open year-round but takes 1-7 day weather closures. Daytime -2 to -8C, nights -20 to -25C. Most homestays closed; 4-5 hotels open (Hotel Sakya, Deyzor, Spiti Sarai). Snow leopard winter trips peak this month from Kibber.',
  'January is genuinely cold (-25C nights) and the Manali-Spiti route is shut. Only the Shimla-Reckong Peo-Kaza road operates and it sees frequent multi-day closures. Most homestays closed, no public transport beyond the daily HRTC Shimla-Kaza bus. Workable only for travellers chasing snow leopards or the deep-winter aesthetic.',
  'January at Kaza is when the Spiti plateau runs at its hostile best. Daytime -2 to -8C, nights drop to -20 to -25C. Manali-Spiti route is closed (Kunzum Pass snowbound from late October to late May). Only the Shimla-Reckong Peo-Kaza road stays open year-round, with 1-7 day closures common between Nako and Kaza after heavy snow (the Shichilling stretch below Dhankar is the worst-hit zone). HRTC runs a daily Shimla-Reckong Peo-Kaza bus (~14 hours, ₹500-650, weather permitting). Hotel Sakya, Hotel Deyzor and Spiti Sarai stay open through winter; most village homestays close from November to April. The serious winter draw is the Kibber snow-leopard tracking circuit (run by operators like Spiti Ecosphere, ₹120k-180k for 8-10 day expeditions). BSNL is the only reliable cellular carrier; ATM at SBI Kaza is unreliable — carry cash from Reckong Peo. Carry sub-zero gear; even hotel rooms struggle to hold above 5C without bukhari.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 2, 2, 'wait',
  'Coldest stretch. -28 to -3C. Shimla road still gating. Snow leopard expeditions at peak.',
  'February is the coldest stretch at Kaza. -28C nights, -3C peak daytime, the Shimla-Kaza road takes 2-3 multi-day closures during the heaviest snowfall window. Snow leopard expeditions from Kibber at peak booking. Most homestays closed.',
  'February is colder than January and the Shimla-Reckong Peo-Kaza road takes its highest-frequency winter closures. Three of every ten travellers experience a multi-day road delay. Most homestays closed; only 4-5 hotels open in Kaza town. Workable only for snow-leopard expedition clients or hard-core winter travellers.',
  'February at Kaza is the coldest single month. Nights drop to -25 to -28C, daytime peaks at -3 to -5C, the air is dry enough to make breathing painful at 3,800m. The Shimla-Reckong Peo-Kaza road remains the only access; 2-3 multi-day closures across the month are normal (the Nako-Kaza stretch is the chokepoint). HRTC bus runs when the road is clear. Hotel Sakya and Hotel Deyzor are the two reliably-open winter hotels. The Kibber snow-leopard tracking season is at peak — operators (Spiti Ecosphere, Snow Leopard Trust India partners) run 8-10 day expeditions from Kibber village, success rate around 70-80 percent on sightings. Key Monastery (12km from Kaza) is open but the road is icy. BSNL holds for cellular; Jio works only intermittently. SBI ATM frequently empty — carry cash from Reckong Peo. Bukhari heating in hotel rooms is non-negotiable. Acclimatisation matters even at 3,800m: take a slow first day, drink butter tea.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 3, 3, 'go',
  'Late winter. -18 to 5C. Shimla road clearer, fewer closures. Snow leopard window winding down.',
  'March is when the deep-winter shutdown starts to ease. Shimla-Reckong Peo-Kaza road remains the only access (Manali-Kunzum side stays closed), but heavy-snow closure events drop to 0-1 across the month. Snow leopard expeditions wind down by mid-month. Hotel Sakya and Deyzor running.',
  NULL,
  'March at Kaza is the late-winter ease. Daytime climbs to 0-5C, nights moderate to -15 to -18C, snowfall drops sharply across the month. The Shimla-Reckong Peo-Kaza road stabilises; multi-day closures become rare. Manali side remains shut (Kunzum Pass impassable until late May). Snow leopard tracking from Kibber winds down by mid-March as the cats move higher. Hotel Sakya and Deyzor continue running; village homestays start reopening from the last week. Key Monastery 12km is accessible. The Komic, Hikkim and Langza high-villages (the photographable trio above Kaza) are still snowbound but reachable on day-trips from Kaza in cleared windows. SBI ATM still unreliable; cash from Reckong Peo. BSNL signal stable, Jio in Kaza town. HRTC bus to Reckong Peo runs daily.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 4, 3, 'go',
  'Spring approaching. -10 to 12C. Apricot blossoms in Tabo and Sumdo. Shimla road reliable.',
  'April brings spring to the lower Spiti villages. Apricot blossoms peak in Tabo and Sumdo around April 10-20 (cooler than Ladakh, slightly later). Daytime climbs to 12C, nights still drop to -8C. Shimla-Kaza road reliable. Manali side still 4-6 weeks from opening. Most homestays reopen.',
  NULL,
  'April at Kaza is when spring quietly arrives at the lower Spiti villages while the high country remains in winter. Daytime peaks at 10-12C in Kaza, nights still -8 to -10C. Apricot blossoms in Tabo (3,280m) and Sumdo peak around April 10-20 — cooler and 2-3 weeks behind the Ladakh blossom timing. The Shimla-Reckong Peo-Kaza road is reliable; closures are rare. Manali-Spiti via Kunzum Pass remains closed (BRO clearance just starting). Most village homestays reopen through April for the season. The high-altitude trio of Komic (4,587m, claims World''s Highest Village), Hikkim (4,400m, world''s highest post office), and Langza (4,400m, the Buddha statue village) become reachable on day-trips though some patches still hold snow. Key Monastery (12km, 4,166m) at full reopen. SBI ATM unreliable; carry cash from Reckong Peo. The lower Spiti circuit (Tabo, Dhankar, Lhalung) runs cleanly through April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 5, 4, 'go',
  'Pre-peak. -3 to 18C, dry. Manali side opens last week (4×4 only). Most circuits restored.',
  'May is when Kaza shifts from spring to summer access. Manali-Kaza road via Kunzum Pass typically opens last week of May (4×4 only initially); Manali side becomes the dominant approach from June. The full Spiti circuit (Tabo, Dhankar, Komic, Langza, Hikkim, Pin Valley) is at full operation.',
  NULL,
  'May at Kaza is the pivot from winter access to summer access. Daytime climbs to 15-18C, nights still drop to -3 to 0C. The Manali-Spiti road via Atal Tunnel-Gramphu-Batal-Kunzum opens in the last week of May (the historical pattern: Kunzum Pass declared 4×4-only around May 24-26 in most recent years). The Shimla-Reckong Peo-Kaza road remains the more reliable approach until early June. Apricot fruit forms on the trees in Tabo and Sumdo. The full Spiti circuit — Tabo (Tabo Monastery, founded 996 CE, India''s oldest continuously-functioning Buddhist monastery), Dhankar Monastery, Pin Valley with Mudh village, Key Monastery, Komic, Hikkim (the world''s highest post office at 4,400m), Langza — all running. Acclimatisation matters: Kaza sits at 3,800m and the high villages run 4,400-4,600m. Carry diamox; oxygen rental at HP Tourism Kaza office costs around ₹500/day for serious AMS cases. Most homestays reopened. SBI ATM still unreliable; cash from Reckong Peo or Manali.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 6, 5, 'go',
  'Peak season. 4-22C, dry. Both approaches reliable. Chandratal opens. Tabo Monastery ceremonies.',
  'June is the start of the proper Kaza peak. Both Manali and Shimla approaches reliable, Chandratal opens for camping mid-month, Tabo Monastery runs its summer ceremony cycle. Hotel Sakya, Deyzor, Spiti Sarai at 80 percent capacity; book 2 weeks ahead.',
  NULL,
  'June at Kaza is the proper start of the Spiti peak season. Daytime 18-22C, nights 4-8C, monthly rainfall under 30mm — the Spiti plateau is rain-shadowed even when the Manali side is in full monsoon. Both road approaches at full reliability: Manali-Atal Tunnel-Gramphu-Batal-Kunzum (~210km, 9-10 hours) and Shimla-Reckong Peo-Kaza (~410km, 2 days with overnight at Reckong Peo). Chandratal opens for tent-camp visits from June 15. Key Monastery, Tabo, Dhankar, Komic, Hikkim, Langza, Pin Valley all at full season. Hotel Sakya (₹3,500-5,000), Deyzor (₹3,000), Spiti Sarai (₹4,500), Norling Guest House and Sakya Abode all running; book 2 weeks ahead minimum. Sol Café, Yak Café and Himalayan Café are the year''s active food scene. SBI ATM still unreliable — carry minimum ₹15,000 cash from Manali or Reckong Peo. Dry-day pattern (1st and 15th of each month at the local liquor vend) applies. BSNL/Jio stable in Kaza. Acclimatise overnight at Manali (2,050m) or Reckong Peo (2,290m) before driving up.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 7, 5, 'go',
  'Peak summer. 7-25C, dry. Manali side landslide risk picks up. Kaza side clean.',
  'July is the first peak month. Manali-Gramphu approach takes occasional landslide breaks (1-3 events, usually clearing within 24-48 hours); Kaza/Shimla side stays reliable. Hotels at full capacity; book 3-4 weeks ahead. Pin Valley NP at peak.',
  NULL,
  'July at Kaza is peak summer at the cold-desert plateau. Daytime 22-25C, nights 7-10C, monthly rainfall under 40mm — the rain shadow holds. Manali-Spiti via Kunzum Pass develops occasional landslide breaks (1-3 events typically, each clearing within 24-48 hours, the Pagal Nala stretch on the Gramphu-Batal road being the recurrent troublespot). Shimla side stays reliable. Both approaches feed full hotel capacity in Kaza. Pin Valley NP is at peak biodiversity — snow leopard tracking, ibex, blue sheep, Himalayan wolf in the upper reaches. Mudh village is the gateway. Tabo Monastery runs summer chant cycles. Spiti Sarai, Hotel Sakya, Hotel Deyzor at 95+ percent occupancy. Book 3-4 weeks out. Yak Café and Sol Café are at full operation. SBI ATM still unreliable — carry ₹15-20k cash. The Kibber, Komic, Hikkim, Langza high-villages are at full activity. Acclimatisation matters even at this season: AMS cases at Komic (4,587m) are not rare for travellers who skipped a Kaza overnight.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 8, 5, 'go',
  'Peak. 7-25C. Independence Day weekend tightens beds. Manali side landslide risk peaks.',
  'August continues the peak. Independence Day long weekend (Aug 15) is the year''s tightest hotel bed window — book 4-6 weeks out. Manali-Kunzum approach takes its highest landslide-frequency. Shimla side hedges the risk. Pin Valley still at peak.',
  NULL,
  'August at Kaza is the second peak month and is materially the same as July with the addition of Independence Day weekend pressure on hotel beds. Daytime 22-25C, nights 7-10C, monthly rainfall 30-50mm. The Manali-Atal Tunnel-Gramphu-Batal-Kunzum approach takes the year''s highest landslide-event frequency (2-4 events typical, Pagal Nala the chokepoint, each clearing within 24-48 hours but unpredictable). Smart August itineraries enter via Manali and exit via Shimla (or vice versa) for landslide hedging. Independence Day long weekend tightens hotel beds: book 4-6 weeks ahead for August 14-17. Hotel Sakya, Deyzor, Spiti Sarai, Sakya Abode, and the village homestays in Kibber, Mudh, Komic, Langza all hit 95-100 percent occupancy. Pin Valley NP, Chandratal, Komic, Hikkim, Langza, Tabo, Dhankar all at full season. SBI ATM unreliable; carry cash. Apricot harvest in Tabo and Sumdo runs late August into early September. AMS protocols matter for the high-village circuit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 9, 5, 'go',
  'Year''s cleanest window. 5-22C, dry. Apricot harvest. Monsoon retreating from Manali side.',
  'September is arguably Kaza''s best month. Apricot harvest in Tabo and Sumdo through the first half. Manali-Gramphu landslide risk drops from mid-month. Air quality cleanest of the year. Hotels still at near-peak but bookings settle 1-2 weeks out.',
  NULL,
  'September at Kaza is the year''s most coherent window. Daytime 18-22C, nights 5-8C, monthly rainfall under 25mm. The Manali-Spiti monsoon hangover clears from the Manali-Atal Tunnel-Gramphu approach in the first fortnight; landslide risk drops to near-zero. Apricot harvest in Tabo and Sumdo runs through the first 15 days. Air quality on the plateau is at year-best — combination of post-monsoon clarity, low humidity, and clean skies allows visibility of 80-100km on clear days. Hotel Sakya, Deyzor, Spiti Sarai still at near-peak occupancy; bookings settle to 1-2 weeks lead time. Chandratal still open through to late month. Pin Valley NP, Komic, Hikkim, Langza, Key Monastery, Tabo, Dhankar all at full operation. The high-altitude blue-sky photography is best in September. SBI ATM unreliable; carry ₹15k cash. AMS protocols unchanged. Last clean window before the October-November shutdown of the Manali approach.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 10, 4, 'go',
  'Late season. -2 to 18C. Manali side closes mid-late month. Chandratal camps wind down.',
  'October is the year''s closing window for the Manali approach. Atal Tunnel-Gramphu-Kunzum closes for winter typically October 25-30. Chandratal tent camps wind down by Oct 5-10. Kaza itself stays open year-round. Apricot harvest tail. Hotels discount 25-30 percent late month.',
  NULL,
  'October at Kaza is the year''s closing peak window. Daytime 12-18C in the first half, dropping to 5-12C in the second; nights drop to -2 to 5C. The Manali-Atal Tunnel-Gramphu-Batal-Kunzum approach takes its first winter snow around October 15-20 and closes for the season typically October 25-30. Chandratal tent camps wind down between October 5-10. Kaza itself stays open year-round (Shimla-Reckong Peo-Kaza road continues to function). Apricot harvest finishing in Tabo. The high-village circuit (Komic, Hikkim, Langza) starts feeling the cold but stays accessible through the month. Hotel Sakya, Deyzor and Spiti Sarai discount 25-30 percent versus August peak from October 15 onward. Most homestays still open. Pin Valley NP at full season but trekking access narrowing. SBI ATM unreliable; carry cash. The cleanest air-quality month after September. Final viable Manali-side circuit window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 11, 3, 'go',
  'Early winter. -10 to 8C. Manali side closed. Shimla road begins taking weather closures.',
  'November is when Kaza shifts to winter mode. Manali-Kunzum closed. Shimla-Reckong Peo-Kaza road takes its first weather closures (1-2 events typical, 1-3 days each). Most village homestays close. Hotel Sakya, Deyzor, Spiti Sarai stay open. First snow leopard expeditions arrive late month.',
  NULL,
  'November at Kaza is the early-winter pivot. Daytime 5-8C, nights drop to -8 to -10C, snow begins falling on the high passes (Kunzum, Pin-Parvati, Tara Pass) but Kaza town itself stays clear in the first half. The Manali-Spiti road is fully closed by November 5. Shimla-Reckong Peo-Kaza takes its first weather closures (1-2 events across the month, 1-3 days each). HRTC bus runs when the road is clear. Most village homestays in Kibber, Mudh, Komic, Langza close from early November. Hotel Sakya, Hotel Deyzor, Spiti Sarai stay open through winter; the Norling Guest House also runs. Sol Café and Yak Café shift to shorter hours. Key Monastery and Tabo Monastery continue but visitor numbers drop sharply. The Kibber snow leopard tracking expeditions begin arriving in the last week of November. SBI ATM unreliable; carry cash. Hotel rates discounted 30-40 percent versus August. Bukhari heating in rooms. BSNL stable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kaza', 12, 2, 'wait',
  'Deep winter sets. -22 to 0C. Shimla road weather-gated. Snow leopard expeditions running.',
  'December is when Kaza enters proper winter. Daytime 0C peak, nights drop to -22C. Shimla-Reckong Peo-Kaza road takes 1-3 multi-day closures across the month. Snow leopard expeditions from Kibber at peak booking. Hotel Sakya, Deyzor running. Most homestays closed.',
  'December is genuinely cold (-22C nights) and the road experiences multi-day closures during snowfall. Most village homestays closed. The trip works only for serious winter travellers — snow-leopard expedition clients, photographers chasing frozen-monastery aesthetics, off-season researchers. The mainstream Spiti circuit (Komic, Pin Valley, Chandratal day-trips) does not run in December.',
  'December at Kaza is when the Spiti winter shutdown begins in earnest. Daytime peaks at -1 to 0C, nights drop to -18 to -22C. The Manali approach is firmly closed (and remains so until late May). The Shimla-Reckong Peo-Kaza road takes 1-3 multi-day closures across the month, the Nako-Kaza stretch (Shichilling below Dhankar) being the chokepoint. HRTC bus runs the Shimla-Kaza route when the road is clear. Hotel Sakya, Hotel Deyzor and Spiti Sarai stay open through winter. Most village homestays closed. The Kibber snow leopard tracking season is at peak booking; operators (Spiti Ecosphere, Snow Leopard Trust India partners) run 8-10 day expeditions, success rate 70-80 percent on sightings. Key Monastery and Tabo Monastery open but the road around Tabo gets icy. BSNL holds; Jio works only intermittently. SBI ATM unreliable — cash from Reckong Peo essential. Bukhari heating in hotel rooms is non-negotiable; even mid-day room temperatures struggle to hold above 8C without it.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- KATRA (Jammu & Kashmir, Vaishno Devi base) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 1, 3, 'go',
  'Cold, crowd-light. 4-15C, snowfall possible. Bhairon trail icy. Helicopter weather-gated.',
  'January is Katra at its coldest and quietest. Daytime 12-15C, nights 4-7C. Snowfall possible at the Bhairon Mandir extension (2km uphill from the Bhawan). Helicopter Katra-Sanjichhat runs but takes 30-40 percent weather cancellations. Pilgrim flow drops to 8-12k/day vs Navratri''s 60-80k. Off-peak hotel rates.',
  NULL,
  'January at Katra is the year''s coldest month and also the lightest pilgrim window. Daytime 12-15C, nights 4-7C. The Bhawan complex sits at 5,200 feet; the Bhairon Mandir extension (2km uphill from the Bhawan) sits at 6,700 feet and is the section most affected by January snowfall — when heavy snow falls (typically 2-4 events across the month), the Bhairon trail closes for 24-72 hours. The Katra-Sanjichhat helicopter (Pawan Hans, ₹2,320 one-way / ₹4,640 round-trip per the Shrine Board pricing, book at maavaishnodevi.org) runs but takes 30-40 percent weather cancellations across January. Daily pilgrim flow drops to 8-12k versus Navratri''s 60-80k peak — RFID Yatra Parchi available walk-in at the Yatra Registration Counter (Niharika complex, free, RFID card, ID-checked). Battery car for the last 2km from Adkuwari to Bhawan and back operates ₹95-120 each way. Hotel rates 30-40 percent below October-November peak. Carry warm layers and gloves; the wind on the Sanjichhat ridge cuts hard.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 2, 3, 'go',
  'Late winter. 5-17C. Snow risk on Bhairon section easing late month. Pilgrim flow still light.',
  'February is the late-winter ease at Katra. Daytime 15-17C, nights 5-8C. Bhairon Mandir extension closure events drop to 0-1 across the month. Helicopter weather cancellations drop to 15-20 percent. Pilgrim flow remains light at 10-15k/day. Hotel rates still 25-30 percent below peak.',
  NULL,
  'February at Katra is the gentle ease out of winter. Daytime 15-17C, nights 5-8C, snowfall risk on the Bhairon Mandir extension (the 2km uphill from the Bhawan) drops to 0-1 events across the month. The Katra-Sanjichhat helicopter takes 15-20 percent weather cancellations. Daily pilgrim flow runs at 10-15k — RFID Yatra Parchi at the Niharika counter is walk-in. Battery car (Adkuwari-Bhawan last 2km) and pony service running normally. The Bhawan Aarti — 6:15am morning, 7:00pm evening — is at its most accessible because of the lower crowd density. Hotel rates run 25-30 percent below October-November peak. Trek route via Banganga, Charan Paduka, Adkuwari, Sanjichhat to Bhawan (13.5km, 6-8 hours) is fully open and at its quietest. Helicopter Katra to Sanjichhat is the time-saver: 8 minutes versus 2-3 hours uphill trek. Books open 60 days ahead at iaffire.gov.in (the Shrine Board portal).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 3, 4, 'go',
  'Spring. 9-22C. Chaitra Navratri end-month brings a surge. Helicopter and trail at full operation.',
  'March is Katra''s spring window. Daytime 19-22C, nights 9-12C. Chaitra Navratri (typically March-end into early April, dates announced on Vikram Samvat calendar) brings a 9-day flow surge to 50-70k pilgrims/day. Outside the Navratri window, conditions are clean and crowds reasonable.',
  NULL,
  'March at Katra is the spring opening. Daytime 19-22C, nights 9-12C, the Bhairon trail fully clear of snow, helicopter operations at full reliability. The big calendar event is Chaitra Navratri — nine days falling in late March or early April depending on the Vikram Samvat calendar (the 2026 dates land March 18-26). During Navratri, daily pilgrim flow surges to 50-70k versus the off-Navratri 18-25k. RFID Yatra Parchi pre-registration at maavaishnodevi.org or shrineboardyatraregistration.in becomes essential during the Navratri window — walk-in slots tighten sharply. Battery car, pony service, helicopter all run at peak through the period. Outside Navratri, March runs cleanly. Hotel rates climb 25-30 percent during Navratri week, otherwise hold at January-February levels. The Bhawan Aarti experience benefits from arriving 90 minutes early in non-Navratri stretches (much earlier in Navratri). Trek route at the most photogenic — wildflowers along the Adkuwari-Sanjichhat stretch. Helicopter from Katra-Sanjichhat: 8 minutes, ₹2,320 one-way.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 4, 4, 'go',
  'Spring peak. 13-27C. Pilgrim flow at year-high before summer arrives. School holidays brings family rush.',
  'April is the year''s spring peak. Daytime 24-27C, nights 13-16C, the trail at its most pleasant. Pilgrim flow at 35-45k/day baseline with Navratri-end overlap if the calendar leans late March. School holidays drive a family-rush in the second half. Helicopter at full operation.',
  NULL,
  'April at Katra is the year''s spring peak window. Daytime 24-27C, nights 13-16C, the trail at its most pleasant for the 13.5km Banganga-Bhawan trek. Daily pilgrim flow runs at 35-45k baseline (90 percent above winter levels). If Chaitra Navratri stretches into the first week of April, the early-month flow tops 60-70k. School holidays in the second fortnight drive a family rush. Helicopter at full reliability — book 30-45 days ahead through iaffire.gov.in for the second half of April. RFID Yatra Parchi registration online is strongly recommended. Battery car and pony at full operation. Hotel rates climb 30-35 percent above January-February. The Bhawan Aarti at 6:15am morning and 7pm evening sees long queues; arrive 2 hours early. Bhairon Mandir extension trail is fully clear. The 1.62km cave passage at the Bhawan continues to operate the standard ID-checked queue system. Sanjichhat dharamshala accommodation books 7-10 days ahead. Carry one extra light layer for Bhawan-temperature drop after sundown.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 5, 4, 'go',
  'Summer arrives. 18-32C. Pilgrim flow at peak. School-holiday rush. Trek hot in midday.',
  'May is one of Katra''s peak months. Pilgrim flow 40-55k/day on weekdays, 60-70k on weekends. Daytime climbs to 30-32C — trek is hot from 11am to 4pm, recommend night-trek or pre-dawn start. Helicopter heavily booked. Hotels at 90+ percent occupancy.',
  NULL,
  'May at Katra is peak summer pilgrim season. Daytime 30-32C, nights 18-22C, the 13.5km uphill trek becomes physically demanding from 11am to 4pm — most veteran pilgrims start at 4am from Banganga or trek overnight. Daily pilgrim flow runs 40-55k weekdays, 60-70k weekends. School holidays drive heavy family traffic through the entire month. Helicopter from Katra-Sanjichhat (Pawan Hans, ₹2,320 one-way / ₹4,640 round-trip, books at iaffire.gov.in 60 days ahead) sells out 30-45 days in advance. RFID Yatra Parchi registration is required and best done online. Battery car for the Adkuwari-Bhawan last 2km runs at full capacity; queues at Adkuwari can hit 90 minutes. Pony service ₹600-1,000 each way (rates Shrine Board-fixed but vary by stretch). Hotels in Katra (Hotel Asia, Country Inn, Hotel Subash, KC Residency) at 90+ percent occupancy with rates 50-60 percent above January. The Bhawan Aarti queue runs 3-4 hours during peak weekends. Carry water (refill stations every 1-2km on the trail), ORS, sunscreen.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 6, 3, 'go',
  'Hot, humid, monsoon arrives. 22-34C. Heavy rain risk on trail. Helicopter weather cancellations rise.',
  'June is when monsoon advance reaches Katra. Daytime 32-34C, nights 22-25C. Late-month rains can make the trail slippery and trigger landslide-induced trail closures (typically 1-3 events). Helicopter weather cancellations climb to 20-25 percent. Pilgrim flow remains heavy at 35-45k/day.',
  'June is hot, humid, and the trail develops sections that become genuinely slippery in monsoon. Late-month landslide-induced closures on the Sanjichhat-Bhawan stretch are not rare. Helicopter cancellation risk climbs.',
  'June at Katra is hot-humid plus the start of the monsoon advance. Daytime 32-34C, nights 22-25C. Pilgrim flow remains heavy at 35-45k/day weekdays, more on weekends. The southwest monsoon arrives in the Trikuta Hills in the last 10 days of June; rainfall jumps from 50mm in the first half to 150-200mm across the month. Trail conditions on the steeper Adkuwari-Sanjichhat stretch become slippery on rainy days. Landslide-induced trail closures on the Sanjichhat-Bhawan stretch occur 1-3 times across the month (each clearing within 12-24 hours). Helicopter weather cancellations run 20-25 percent. RFID Yatra Parchi registration, battery car, pony service all running. Hotels at 80-85 percent occupancy. The Bhairon Mandir extension trail (2km uphill from Bhawan) is fully open. Carry rain protection, non-slip footwear, ORS. Most pilgrims overnight at the Sanjichhat dharamshala when caught in evening rain.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 7, 2, 'wait',
  'Peak monsoon. 22-31C. 250-350mm rainfall. Trail slippery. Landslide closures peak.',
  'July is monsoon at strength. Heavy rains, slippery trail, helicopter weather cancellations 30-40 percent. Trail closures (Adkuwari-Sanjichhat-Bhawan stretches) at year-high. Pilgrim flow drops to 25-30k/day. Workable but conditions degrade.',
  'July is the wettest month at Katra. Trail conditions are at their most slippery, landslide-induced closures the most frequent, and helicopter cancellations run 30-40 percent. Pilgrim flow drops to 25-30k/day from May''s peak. The trip is functional but the experience is degraded versus dry months.',
  'July at Katra runs full monsoon. Monthly rainfall lands at 250-350mm across 18-22 wet days. Daytime 28-31C, nights 22-24C, humidity at 90 percent. The 13.5km uphill trail becomes significantly more slippery — non-slip footwear is essential, and pony rides become safer than walking on rainy days. Landslide-induced closures on the Sanjichhat-Bhawan and Adkuwari-Sanjichhat stretches peak in July (3-5 events typical, each clearing within 12-36 hours). Helicopter Katra-Sanjichhat takes 30-40 percent weather cancellations; refunds processed within 7 days. Daily pilgrim flow drops to 25-30k weekdays, 35-40k weekends. RFID Yatra Parchi available walk-in. Hotels discount 25-30 percent versus May peak. The Bhawan Aarti operates normally but the trek up is gruelling in heavy rain. Bhairon Mandir extension trail open but exposed; lightning risk on the Sanjichhat ridge. Most repeat pilgrims wait for September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 8, 3, 'go',
  'Monsoon continues. 21-30C. 200-300mm rainfall. Vaishno Devi annual fair (Shradh Paksha varies).',
  'August is mid-monsoon. Rainfall 200-300mm, trail slippery but conditions improve from July. Helicopter cancellations drop to 25-30 percent. Pilgrim flow back to 30-40k/day. Independence Day weekend brings short surge.',
  NULL,
  'August at Katra is mid-monsoon with marginally fewer wet days than July. Monthly rainfall 200-300mm. Daytime 28-30C, nights 21-23C, humidity 88 percent. Trail conditions improve from July but remain slippery on heavy days. Landslide closures drop to 1-3 events across the month. Helicopter weather cancellations drop to 25-30 percent. Daily pilgrim flow runs at 30-40k weekdays, 40-50k weekends. Independence Day long weekend (Aug 14-17) brings a 3-4 day surge. RFID Yatra Parchi registration recommended for the long-weekend window. The Bhawan Aarti at peak attendance Aug 15. Hotel rates run 15-20 percent below May peak. Battery car and pony service at full operation. The Vaishno Devi annual fair (Shradh Paksha, dates vary by Hindu calendar — 2026 falls early September) is just outside the August window. Most domestic pilgrims who can wait shift to September-October for the cleaner trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 9, 4, 'go',
  'Monsoon retreating. 19-30C. Trail clean post-rains. Sharad Navratri may end-month or early Oct.',
  'September is the recovery to clean. Rainfall drops to 100-150mm, mostly first fortnight. Trail dries out by mid-month. Helicopter back to 90 percent reliability. Sharad Navratri may fall end-month (Hindu calendar dependent — 2026 dates Oct 11-19).',
  NULL,
  'September at Katra is the monsoon recovery month. Rainfall drops to 100-150mm with most of it in the first fortnight. Daytime 27-30C, nights 19-22C, humidity easing toward 80 percent. The 13.5km trek dries out by mid-month — the cleanest trail conditions since April. Helicopter weather cancellations drop to 8-10 percent. Daily pilgrim flow climbs to 35-45k as the post-monsoon traveller wave arrives. Sharad Navratri dates depend on the Hindu calendar — 2026 falls October 11-19, so September stays mostly outside the Navratri window. RFID Yatra Parchi registration walk-in possible but online preferred. Battery car, pony service, helicopter at full operation. Hotels run 70-80 percent occupancy with rates climbing toward October-November peak. The Bhawan Aarti queue runs 90 minutes off-peak hours. Bhairon Mandir extension trail at full operation. Strong call for repeat pilgrims wanting cleaner conditions before the Sharad Navratri surge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 10, 5, 'go',
  'Year peak. 14-26C. Sharad Navratri (Oct 11-19, 2026). Pilgrim flow 60-80k/day during Navratri.',
  'October is the year''s peak Katra month. Sharad Navratri (the 9 days of Durga, October 11-19 in 2026) drives pilgrim flow to 60-80k/day; pre-Navratri and post-Navratri stretches still run 40-55k/day. Helicopter sold out for the Navratri window 60 days ahead. Hotels at 100 percent.',
  NULL,
  'October at Katra is the year''s defining month. Daytime 24-26C, nights 14-17C, the post-monsoon trail at its cleanest, weather perfect for the trek. Sharad Navratri (the 9 days of Maa Durga, October 11-19 in 2026 — confirm against the Hindu calendar each year) drives the year''s biggest pilgrim flow: 60-80k/day across the nine days, with 600,000-800,000 cumulative pilgrims through the Bhawan. Outside Navratri, October still runs 40-55k/day. RFID Yatra Parchi pre-registration at maavaishnodevi.org becomes mandatory in practice; walk-in slots fill 6am for the same day''s yatra. Helicopter Katra-Sanjichhat books 60 days ahead at iaffire.gov.in and sells out for the Navratri window within hours of release. Hotels in Katra at 100 percent occupancy through Navratri; rates climb 80-100 percent above January. Battery car, pony service, dharamshala accommodation at full strain. The Bhawan Aarti queue runs 5-7 hours during Navratri. Bhairon Mandir extension trail at full operation. Maha Ashtami and Maha Navami (the two peak Navratri days) see helicopter and trail at maximum capacity. Off-Navratri stretches in October are still strong but considerably more peaceful.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 11, 4, 'go',
  'Post-Navratri peak. 9-21C. Diwali week brings short surge. Trail clean. Helicopter at full reliability.',
  'November is the year''s second-peak month. Post-Navratri pilgrim flow normalises to 30-40k/day. Diwali (early Nov, Hindu calendar) brings a 5-7 day surge. Trail at its driest, helicopter at full reliability, weather mild.',
  NULL,
  'November at Katra is the post-Navratri peak window. Daytime 19-21C, nights 9-12C, trail conditions at their driest of the year. Daily pilgrim flow normalises to 30-40k weekdays, 45-55k weekends. Diwali (early-November in 2026, the dates depend on the Hindu calendar — 2026 falls early November) brings a 5-7 day surge of family-trip pilgrims; flow climbs to 45-55k for the Diwali window. RFID Yatra Parchi registration recommended for the Diwali window. Helicopter at full reliability — weather cancellations under 5 percent. Battery car, pony service at peak operation. Hotels in Katra at 80-90 percent occupancy with rates 25-30 percent below October-Navratri peak but still above off-season. The Bhawan Aarti queue runs 90 minutes off-peak, 3-4 hours on Diwali weekend. Bhairon Mandir extension trail fully open. Sanjichhat ridge winds become noticeably colder; carry layers for the Bhawan side. Strong call for pilgrims wanting peak conditions without Navratri-Diwali crowds — the third week of November is the sweet spot.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('katra', 12, 4, 'go',
  'Cool, year-end family pilgrimage rush. 5-17C. Christmas-NY week is heavy. Snowfall risk on Bhairon trail.',
  'December is the cool-weather pilgrim window. Daytime 15-17C, nights 5-8C, weather generally clear. Christmas-NY week (Dec 23-Jan 2) brings a year-end family rush — flow climbs to 50-60k/day. Snowfall risk on Bhairon Mandir extension begins late month.',
  NULL,
  'December at Katra is the cool-weather pilgrim window. Daytime 15-17C, nights 5-8C, weather generally clear and trail conditions excellent. Daily pilgrim flow runs at 25-35k for most of the month. The big surge is Christmas-NY week (December 23 to January 2): family trips drive flow to 50-60k/day. RFID Yatra Parchi registration recommended for the year-end window; walk-in still possible. Helicopter Katra-Sanjichhat at full reliability through the first three weeks; weather cancellations begin from December 25 onwards as the first winter snow arrives. The Bhairon Mandir extension trail (2km uphill from the Bhawan, 6,700 feet) starts seeing first snowfall around December 20-25 — closure events possible from late month. Hotels in Katra at 90-100 percent occupancy for the year-end rush; rates 50-60 percent above off-season. Battery car and pony at full operation. The Bhawan Aarti queue runs 2-3 hours through the year-end window. Carry warm layers; the Bhawan side temperature drops below 5C after sundown.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- KHARDUNG LA (Ladakh, 5,359m pass) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 1, 1, 'skip',
  'Closed. Pass under deep snow. -30C nights. Civilian access nil. Skip.',
  NULL,
  'January at Khardung La sits firmly out of bounds for civilian travellers. Pass closed, road buried under 8-12 feet of snow, civilian convoys do not run. The Indian Army keeps a logistics window for Siachen sustainment but tourist access is zero. Wait for late May.',
  'January at Khardung La is one of the most hostile points on the Indian road network. The pass at 5,359m sits under 8-12 feet of accumulated snow, the road from South Pulu (the army post on the Leh side) to North Pulu (Nubra side) is closed to civilian traffic, and daytime temperatures at the top peak at -22C with night drops to -32C. The Indian Army maintains a year-round logistics line for Siachen Glacier sustainment, and BRO crews keep skeleton clearance going on the worst storm days, but tourist access is nil. Leh itself remains accessible by air (daily flights from Delhi when weather permits) but the Leh-Khardung La-Nubra circuit does not run. The first viable visitor window each year is approximately May 25 — when BRO completes summer-season clearance and the LAHDC (Leh Autonomous Hill Development Council) issues the Inner Line Permit notification.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 2, 1, 'skip',
  'Closed. Year''s coldest. -33C nights. No civilian access. Skip.',
  NULL,
  'February is the year''s coldest stretch at the pass. -33C nights, road firmly closed, BRO not yet started serious clearance. Civilian access zero. Skip.',
  'February at Khardung La is the deep-winter dead point. Daytime at the pass peaks at -25C, nights drop to -33C, the road from South Pulu to North Pulu remains under deep accumulated snow. BRO crews focus on Leh-Manali highway clearance prep on the lower altitudes; serious work on Khardung La does not begin until March. The Indian Army maintains its essential logistics line through helicopter-served operations. Leh-Nubra travel does not happen in February. The few winter travellers in Leh focus on the Chadar trek on the Zanskar river — Khardung La is not on any February itinerary. Domestic flights to Leh continue when weather permits but the pass-and-Nubra circuit is firmly closed until late May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 3, 1, 'skip',
  'BRO starting clearance. -25C nights. Pass still closed to civilian traffic. Skip.',
  NULL,
  'March is when BRO begins serious snow-clearance on the Khardung La road. The pass remains closed to civilian traffic — 6-8 weeks from any tourist access. Skip.',
  'March at Khardung La is when BRO begins its summer-season snow-clearance operation. Crews from the 753 Border Roads Task Force start working from South Pulu (15km below the pass on the Leh side) and Khalsar (40km below on the Nubra side) and push toward the top through the month. Daytime at the pass climbs to -15C, nights still -25C. The road remains firmly closed to civilian traffic. Tourist access stays zero. Leh itself is just starting to thaw, with daily air-temperature highs at 5-8C. The Inner Line Permit office at the LAHDC complex in Leh will not issue Khardung La permits until BRO declares the road safe — typically late May. Wait.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 4, 1, 'skip',
  'BRO clearance underway. -18C nights. Apricot blossoms in lower Nubra. Pass still closed. Skip.',
  NULL,
  'April is when BRO clearance reaches mid-section. Apricot blossoms peak in the lower Nubra Valley (early-mid April) but Khardung La itself is 4-6 weeks from open. Pass closed. Skip.',
  'April at Khardung La is when BRO clearance pushes toward the top but the pass remains closed to civilian traffic. Daytime at the pass climbs to -8C, nights -18C. The famous apricot blossom bloom in the lower Nubra Valley villages — Sumur, Tirit, Hunder — peaks April 8-16, but reaching them from Leh requires Khardung La (closed) or the longer Manali-Leh-Nubra route via Pangong (also still closed in April due to Leh-Manali highway being weeks from opening). Effectively the Nubra Valley remains accessible only via local Ladakh travellers based in Leh year-round (the Sham Valley loop, day-trips to Magnetic Hill). The first real Khardung La opening of the year is consistently late May. Apricot blossom travellers should plan for the very last week of April or first week of May, which catches the tail of blossom and the start of road-open access via Khardung La.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 5, 4, 'go',
  'Pass opens late month. -10 to 5C. ILP-required. Acclimatise 48 hours in Leh first. Apricot blossom tail.',
  'May is the year''s opening month. Khardung La typically opens to civilian traffic May 25-30 (BRO declaration). ILP from LAHDC Leh required (₹400 environment fee + ₹100 Wildlife fee, online at lahdclehpermit.in). The Sumur-Hunder apricot blossom tail catches the first travellers across.',
  NULL,
  'May at Khardung La is the year''s opening window. The pass typically declares open to civilian traffic between May 25 and May 30 — the date depends on BRO snow-clearance completion and the LAHDC notification. Daytime at the pass touches 5C, nights -10C. The Inner Line Permit (ILP) from the LAHDC Leh permit office is required for Khardung La and the onward Nubra Valley loop — apply online at lahdclehpermit.in (the official Leh District Permit Tracking System) the day before; permit fee ₹400 environment fee plus ₹100 Wildlife Conservation Fee for Indian travellers (foreigners pay slightly different rates). Acclimatisation in Leh (3,500m) for 48-72 hours before driving up to the pass (5,359m) is non-negotiable — AMS at Khardung La is the most common medical incident in Leh tourism. The South Pulu and North Pulu army cafés at the foot of the pass run free oxygen-administration for serious AMS cases. The Khardung La cafe at the top runs from late May; staff rotate weekly because of altitude exposure. Visitor stay-time at the pass is recommended at 20-30 minutes maximum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 6, 5, 'go',
  'Peak season. -5 to 10C. ILP fast-tracked. Nubra circuit at full operation. Apricot fruit on trees.',
  'June is peak Khardung La. Pass at full operation, ILP processing fast (24 hours via lahdclehpermit.in), Nubra circuit (Diskit, Hunder, Sumur, Turtuk) at full swing. Apricot fruit forming on trees. Hotels in Leh at peak.',
  NULL,
  'June at Khardung La is full peak season. Daytime at the pass 8-10C, nights -5 to -2C, the road in its smoothest condition of the year. The Inner Line Permit (₹400+₹100 for Indians) processes through lahdclehpermit.in in 24 hours. The Nubra Valley circuit beyond the pass — Diskit (the Diskit Monastery and the 32m Maitreya statue), Hunder (the double-humped Bactrian camel safaris on the white sand dunes), Sumur (apricot blossom-fruit transition village), Panamik (the hot springs), and the onward Turtuk run to the LoC — is at full operation. Diskit hotels (Hotel Lchang Nang, Mystique Meadows) at 85-90 percent occupancy. The Ladakh Festival in early September is months away but June already has the biking community at full strength: Royal Enfield rentals from Leh start at ₹1,500/day with deposit. Acclimatisation gating: spend at least 48 hours at Leh (3,500m) before driving up. The South Pulu and North Pulu army cafes provide oxygen for AMS cases. Visitor stay at the pass: 20-30 minutes max recommended.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 7, 5, 'go',
  'Peak. -3 to 12C. Apricot harvest in lower Nubra. ILP processing fast. Nubra hotels tight.',
  'July is peak season at Khardung La. Apricot harvest in lower Nubra (Sumur, Tirit, Hunder, Turtuk) runs through the month — fresh apricots straight off the tree. ILP processing fast. Nubra hotels at 90+ percent occupancy. Manali-Leh highway also fully open, feeding the circuit.',
  NULL,
  'July at Khardung La is peak summer with the added draw of apricot harvest in lower Nubra. Daytime at the pass 10-12C, nights -3 to 0C. The Manali-Leh highway is fully open, feeding inward traffic on top of the year-round Srinagar-Leh approach. The apricot harvest in Sumur, Tirit, Hunder and Turtuk runs through July — fresh fruit at orchard prices (₹100-150/kg vs ₹500/kg in Leh markets). The Khardung La crossing is at year-busiest; expect 200-400 vehicles per day at the top during the peak afternoon window. ILP from lahdclehpermit.in processes in 24 hours. Nubra hotels (Hotel Lchang Nang Diskit, Mystique Meadows, Lchang Nang Retreat in Sumur) at 90+ percent occupancy; book 2-3 weeks ahead. Acclimatisation at Leh (3,500m) for 48 hours before crossing the pass remains essential. Carry oxygen if travelling with seniors or children. The South Pulu and North Pulu army cafes are stocked with oxygen for AMS emergencies. The Khardung La summit cafe runs at peak — chai, packaged snacks, basic souvenirs.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 8, 5, 'go',
  'Peak continues. -3 to 12C. Independence Day weekend tightens beds. Apricot harvest tail.',
  'August is the second peak month. Independence Day long weekend tightens hotel beds in Leh and Diskit (book 4-6 weeks ahead). Apricot harvest tail. Manali-Leh highway can take landslide breaks on heavy days but the Srinagar route hedges the risk.',
  NULL,
  'August at Khardung La is the second peak month with Independence Day pressure on hotel beds. Daytime at the pass 10-12C, nights -3C, road conditions stable. Apricot harvest in Sumur, Tirit, Hunder and Turtuk continues through the first three weeks. The Manali-Leh highway can take landslide breaks on heavy monsoon days (the Pang-Tanglang La stretch is the recurrent troublespot, typically clearing within 24-48 hours); the Srinagar-Leh route hedges the risk. Independence Day long weekend (Aug 14-17) tightens hotel beds — Leh hotels (The Grand Dragon, Ladakh Sarai, Stok Palace Heritage Hotel, Saboo Resorts) at 95+ percent occupancy with 50-60 percent rate jumps. Diskit hotels (Lchang Nang, Mystique Meadows, Sten-Del) at full occupancy. ILP processing remains fast. Acclimatisation at Leh for 48 hours before pass crossing remains essential. Visitor stay-time at the pass 20-30 minutes max. AMS protocols same as June-July: descend immediately if symptoms develop. The North Pulu side (Nubra approach) feels marginally warmer than South Pulu (Leh approach).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 9, 5, 'go',
  'Year-best. -7 to 10C, dry, clean. Ladakh Festival early Sep. Last solid month before October cold.',
  'September is arguably Khardung La''s best month. Ladakh Festival (Sept 1-7) animates Leh; clear skies and crisp air across the Nubra circuit; ILP fast. Manali-Leh highway monsoon risk drops sharply post-mid-September. Hotels still at peak.',
  NULL,
  'September at Khardung La is the year''s most coherent window. Daytime at the pass 8-10C, nights -7 to -3C, monthly precipitation under 10mm, the air at its driest and clearest. The Ladakh Festival (September 1-7, organised by Ladakh Tourism Department) animates Leh with cultural performances, archery, polo, and traditional cuisine — most travellers visiting Khardung La in early September time it for this. The Manali-Leh highway monsoon-landslide risk drops sharply from September 15 onward. Apricot harvest is over but Nubra orchards still beautiful in early-autumn colour. ILP from lahdclehpermit.in processes in 24 hours. Hotel occupancy at peak through the first three weeks; rates settle 10-15 percent below August by the last week. Acclimatisation at Leh for 48 hours remains essential. AMS protocols unchanged. The South Pulu and North Pulu army cafes are at full operation. Visitor stay at the summit 20-30 minutes max. Last clean window before the October cold and the eventual late-October pass closure.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 10, 3, 'go',
  'Late season. -15 to 5C. Pass closes mid-late month. Manali-Leh highway shuts. Nubra circuit narrows.',
  'October is the year''s closing window. Pass typically closes for winter October 25-30 (BRO declaration). Manali-Leh highway closes around October 15. The Srinagar-Leh approach hedges through to early November. First week of October is the cleanest closing window.',
  'October is when Khardung La winds down. Pass closure events become more frequent through the month and full winter closure typically falls October 25-30. Manali-Leh highway closes around October 15 — only the Srinagar-Leh approach remains open through to early November. Hotels in Diskit and Hunder start winding down their season operation.',
  'October at Khardung La is the year''s closing window. Daytime at the pass 0-5C in the first half, dropping to -5 to 0C in the second; nights drop to -10 to -15C. Pass closure events become more frequent through the month — first significant snow typically falls October 15-20, and full winter closure usually lands October 25-30 (the date depends on BRO declaration). The Manali-Leh highway closes for winter around October 15. The Srinagar-Leh approach hedges the risk and remains open through to early November. The first week of October is the cleanest closing window — clear weather, manageable cold, full Nubra circuit operational. Diskit, Hunder, Sumur hotels start winding down through the month; the Lchang Nang properties typically close by October 25-30. ILP processing remains fast. Apricot orchards in autumn colour. Acclimatisation at Leh for 48 hours remains essential. The Khardung La summit cafe runs through to closure declaration. Carry winter layers; the wind at the pass cuts hard.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 11, 1, 'skip',
  'Closed for winter. -20C nights. Pass under deep snow. Civilian access nil. Skip.',
  NULL,
  'November is when Khardung La shuts for winter. Both approach roads buried under accumulating snow, civilian access zero, the Nubra Valley loop reachable only by army-operated convoys for residents. Wait for late May.',
  'November at Khardung La is the early-winter shutdown. Daytime at the pass peaks at -8C, nights drop to -20C, and the road sees its first major accumulating snowfall around the second week of the month. Pass closes for winter on the BRO declaration that typically lands in the last week of October but November cements it. The Manali-Leh highway is closed (since mid-October) and the Srinagar-Leh approach takes its first weather closures through November. The Nubra Valley becomes reachable only by army-operated convoys for residents. Tourist access is zero through November. Diskit, Hunder, Sumur hotels are closed for winter. Leh itself remains accessible by air (daily flights from Delhi when weather permits), but the Khardung La-Nubra circuit does not run.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('khardung-la', 12, 1, 'skip',
  'Closed. -28C nights. Deep winter. No civilian access. Skip.',
  NULL,
  'December is full winter shutdown. -28C nights, road firmly closed under 6-10 feet of accumulated snow. No civilian access. Wait for late May.',
  'December at Khardung La is full winter. Daytime at the pass peaks at -16C, nights drop to -28C, the road under 6-10 feet of accumulated snow. Civilian access is zero through December. The Indian Army''s logistics line for Siachen Glacier sustainment continues through helicopter operations and limited convoy windows when weather permits. Leh-Nubra travel does not happen. Leh itself remains accessible by air (daily flights from Delhi when weather permits — 30-40 percent winter cancellations are common). The few winter travellers in Leh focus on the Chadar trek on the frozen Zanskar river (December-late February); Khardung La is not on any December itinerary. Wait for late May, when BRO completes the summer-season clearance and the LAHDC issues the next ILP cycle.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- TURTUK (Ladakh, Balti border village, Nubra-LoC) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 1, 1, 'skip',
  'Closed. Khardung La pass shut, road from Diskit unreachable. -15 to -2C. Skip.',
  NULL,
  'January at Turtuk is unreachable for civilian travel. Khardung La is closed and there is no alternative road into Nubra. The village functions normally for residents but tourism is at zero. Wait for late May.',
  'January at Turtuk is when the village functions on its own internal logic, cut off from Leh by the closed Khardung La pass. Daytime in the village (at 2,900m, lower than most of Ladakh) reaches -2 to 5C, nights -10 to -15C — milder than Leh because of the lower altitude and the warmer microclimate of the Shyok valley. The road from Diskit (which is the gateway after Khardung La) is closed, and there is no alternative route into the Nubra Valley. The village runs on stored apricot and walnut crops, dried meat, and the local economy that has functioned this way for centuries. Tourist access is zero. The handful of family homestays (Ahmad Family Homestay, Maha Guesthouse, the Polo Guesthouse-style operations) close for winter. The first viable visitor window of any year is approximately late May, after Khardung La opens and the Diskit-Turtuk road clears.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 2, 1, 'skip',
  'Closed. -18C nights. Khardung La shut. Apricot blossom buds forming but no road access. Skip.',
  NULL,
  'February is the coldest stretch at Turtuk. Khardung La shut. Apricot blossom buds form on trees but the village remains unreachable. Skip.',
  'February at Turtuk is the year''s coldest stretch. Daytime peaks at 0-3C, nights -12 to -18C. Apricot trees in the village courtyards begin forming the buds that will become the famous late-March/early-April blossom — but the village remains unreachable from Leh because Khardung La is firmly closed. The Diskit-Turtuk road is impassable; even the army convoys in February run on the Skardu-side logistics line that connects Turtuk to the rest of Ladakh through limited military movements only. Homestays closed. The 350-odd village residents (mostly Balti, Muslim, descended from the Yagbo dynasty) carry on village life — Friday namaaz at the Mosque, courtyard storytelling, dried-apricot inventory checks. The first visitor window remains late May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 3, 1, 'skip',
  'Khardung La still closed. -10C nights. Apricot blossom early in the village but no road access. Skip.',
  NULL,
  'March is when Turtuk apricot trees prepare for blossom but Khardung La pass remains closed. The village is unreachable. Skip — wait for early-May approach via the late opening window.',
  'March at Turtuk has the village awakening to early spring while remaining unreachable from Leh. Daytime climbs to 5-8C, nights -7 to -10C. Apricot tree buds open in the last week of March; full bloom typically falls April 8-16. But Khardung La pass remains firmly closed (BRO clearance is only just beginning). The Diskit-Turtuk road is impassable. Homestays not yet operational. The village is in pre-tourist-season mode — household repairs, courtyard cleaning, irrigation channel preparation for the orchards. Foreign trekkers occasionally reach Turtuk via the Hunder-Skuru-Bogdang route in the very last week of March on guided expeditions, but this is a niche operation, not visitor tourism. The mainstream visitor window opens late May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 4, 1, 'skip',
  'Apricot blossom peak but Khardung La closed. -5 to 12C. Photographers'' loss. Skip.',
  NULL,
  'April is when Turtuk apricot blossoms peak (April 8-16) but Khardung La remains closed for civilian travel. The village is photogenically beautiful but practically unreachable. Wait for May.',
  'April at Turtuk is the cruel month for travel photographers. Apricot blossoms peak April 8-16 in the village courtyards — pale pink and white flowers covering the orchards that line every pathway. Daytime at 2,900m climbs to 10-12C, nights drop to -5 to 0C. The village is at its most photogenic. But Khardung La pass remains firmly closed for civilian traffic — BRO clearance reaches the mid-section but the road does not declare open until late May. The Diskit-Turtuk approach is impassable. Homestays not yet operational. The 350-odd Balti residents carry on village life around the blossom — wedding season for many families. The Apricot Blossom Festival in 2026 runs April 8-16 across the lower Nubra (Sumur, Tirit, Hunder, Turtuk), but reaching Turtuk for it requires special army-arranged access through tour operators specifically organising for the festival window — a small handful of expedition operators do this each year on direct contracts with Ladakh Tourism. Mainstream travellers wait for May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 5, 4, 'go',
  'Late-month opening. -2 to 18C. Khardung La opens 25-30. Homestays reopen. Apricot blossom tail.',
  'May is the year''s opening month. Khardung La typically opens May 25-30; once open, the Diskit-Turtuk road (2.5 hours, 90km) becomes accessible. Homestays reopen. Apricot blossom tail catches the very first travellers across.',
  NULL,
  'May at Turtuk is the year''s opening window for visitors. Khardung La typically declares open between May 25 and May 30; once the pass clears, the Diskit-Turtuk road (90km, 2.5-3 hours via Hunder, Skuru, Bogdang) is typically usable within the same week. Daytime in the village 15-18C, nights drop to -2 to 2C. Homestays — Ahmad Family Homestay, Maha Guesthouse, Lhakhang Polo Guesthouse, Turtuk Holiday Resort and a small handful of family-run rooms (typically 15-20 rooms total in the village) — reopen. The Apricot Blossom Festival window has just closed (April 8-16) but green orchards are beautiful in their own right. Visiting protocols: Turtuk is a conservative Muslim village; dress modestly (covered shoulders, long pants), no public alcohol, no smoking in public. Friday namaaz hour (12:30-1:30pm typically) limits all-village access during prayer; plan walks for after 2pm Fridays. The Inner Line Permit (₹400+₹100 for Indians, lahdclehpermit.in) covers Khardung La-Diskit-Hunder-Turtuk in a single permit. Stay 2 nights minimum; the village rewards a slow visit.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 6, 5, 'go',
  'Peak. 4-23C, dry. Apricot fruit on trees. Homestays at full grid. ILP and road both reliable.',
  'June is peak Turtuk. Apricot fruit forms and starts ripening late month; the village orchards are at their lushest. Homestays at full operation. Khardung La and the Diskit-Turtuk road both reliable. Visit length recommended at 2-3 nights minimum.',
  NULL,
  'June at Turtuk is the village at full summer operation. Daytime 20-23C, nights 4-7C, monthly rainfall under 15mm. Apricot fruit forms on trees through the first three weeks; first ripe fruit available from the last week of June. The orchards that line every village pathway are at their lushest green. Khardung La pass is fully open with reliable conditions. The Diskit-Turtuk road (90km, 2.5-3 hours via Hunder, Skuru, Bogdang) is at its smoothest. Homestays — Ahmad Family, Maha Guesthouse, Lhakhang Polo Guesthouse, Turtuk Holiday Resort, plus small family-run rooms — at 80 percent occupancy. Book 2 weeks ahead. The Yagbo Royal Palace (the small museum-residence of the former royal family of Yagbo, kept by the descendants), the Polo Ground, the Mosque, the village ecology walks (irrigation channels are ingenious and beautiful), the cross-river walk to the abandoned Pakistani-side Turtuk before 1971 — all in full season. Friday namaaz limits 12:30-1:30pm village access. ILP from lahdclehpermit.in 24-hour processing. 2-3 nights stay strongly recommended.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 7, 5, 'go',
  'Apricot harvest peak. 7-26C, dry. Homestays book 2-3 months ahead. The defining month.',
  'July is Turtuk''s defining month — apricot harvest peak. Fresh apricots straight off the tree (₹100-150/kg vs ₹500/kg in Leh markets), apricot kernels, dried apricots, jam, oil. Homestays book 2-3 months ahead. The single best month at Turtuk.',
  NULL,
  'July at Turtuk is the defining month — fresh apricot harvest. Daytime 22-26C, nights 7-10C, monthly rainfall under 25mm. The village orchards are at peak fruit; trees laden with the apricots Turtuk is famous for (the Halman variety is particularly prized). Fresh apricots sell at orchard prices ₹100-150/kg versus ₹500/kg in Leh markets; dried apricots, apricot kernels (the seed inside the pit, eaten as a delicacy), apricot jam, and apricot oil are all locally produced and significantly higher quality and lower priced than anywhere else in Ladakh. Homestays — Ahmad Family, Maha, Lhakhang Polo, Turtuk Holiday Resort and the small family-run rooms — book out 2-3 months ahead through tour operators based in Leh (most homestays do not have online booking). Khardung La and the Diskit-Turtuk road at full reliability. ILP processing fast. The full Nubra-Turtuk circuit (Diskit Monastery, Hunder dunes, Sumur hot springs, Panamik, Turtuk village stay) at peak operation. Friday namaaz hour limits village access 12:30-1:30pm. Conservative dress and no-alcohol-in-public norms apply. Stay 3 nights to fully experience the harvest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 8, 5, 'go',
  'Apricot harvest tail. 6-25C. Independence Day weekend tightens beds. Homestays still 90 percent occupied.',
  'August is the second peak month at Turtuk. Apricot harvest tail through the first 10-15 days. Independence Day weekend (Aug 14-17) tightens homestay beds further. Manali-Leh highway monsoon-landslide risk hedges via Srinagar approach.',
  NULL,
  'August at Turtuk is the second peak month. Daytime 22-25C, nights 6-10C, monthly rainfall 25-40mm. Apricot harvest tail runs through the first 10-15 days; by August 20 most fruit is dried and stored. Homestays at 85-95 percent occupancy through the month. Independence Day long weekend (Aug 14-17) tightens beds further. The Manali-Leh highway can take landslide breaks on heavy monsoon days (the Pang-Tanglang La stretch is the recurrent troublespot, typically clearing within 24-48 hours); the Srinagar-Leh route hedges the risk. Khardung La and the Diskit-Turtuk road at full operation. The Yagbo Royal Palace, Polo Ground, Mosque, ecology walks all running. Friday namaaz hour limits 12:30-1:30pm village access. Conservative dress norms apply. ILP from lahdclehpermit.in 24-hour processing. Local cuisine highlight: Balti chai (pink butter tea variant, salty, distinct from Ladakhi Gur Gur), apricot stew, walnut bread, mutton with apricot kernels.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 9, 5, 'go',
  'Best month for atmosphere. 2-22C, dry. Walnut and apple harvest. Cleanest air-quality of the year.',
  'September is arguably Turtuk''s best month for atmosphere. Walnut and apple harvest (Halman apples are a Turtuk specialty), cleanest air-quality of the year, daytime perfect weather. Homestays settle to 1-2 weeks lead time. Last clean window before October cold sets in.',
  NULL,
  'September at Turtuk is arguably the year''s best month for atmosphere — minus the apricot harvest urgency. Daytime 18-22C, nights 2-6C, monthly rainfall under 10mm. Walnut harvest runs through the first three weeks; apple harvest (Halman variety, distinct from the more common red apples in Kashmir) overlaps the second half. The air at 2,900m is at its driest and clearest — visibility allows you to see the Karakoram peaks across the LoC on clear days. Homestays at 75-85 percent occupancy; bookings settle to 1-2 weeks lead time. The Yagbo Royal Palace, Polo Ground, the cross-village ecology walks, the Mosque visits all running. Khardung La and the Diskit-Turtuk road at full reliability through the month. The Manali-Leh highway monsoon-landslide risk drops sharply post-mid-September. Friday namaaz limits village walking 12:30-1:30pm. Conservative dress and no-alcohol-public norms apply. ILP processing 24 hours. Last clean window before the October cold. Strong call for travellers wanting full Turtuk without peak crowds.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 10, 3, 'go',
  'Late season. -8 to 16C. Khardung La closing late month. Homestays winding down. First-week call.',
  'October is the year''s closing window. Khardung La typically closes Oct 25-30; Diskit-Turtuk road becomes inaccessible to civilians once the pass shuts. First week of October catches the cleanest closing window. Homestays start winding down by mid-month.',
  'October is the late-season window. Khardung La closes typically October 25-30; once the pass shuts, the Diskit-Turtuk road becomes inaccessible to civilian travel. Homestays in Turtuk start winding down through mid-October as families turn to winter preparation.',
  'October at Turtuk is the year''s closing window. Daytime in the village 12-16C in the first half, dropping to 5-12C in the second; nights drop to -3 to -8C. Khardung La pass closure events become more frequent through the month and full winter closure typically falls October 25-30. Once the pass shuts, the Diskit-Turtuk road becomes inaccessible to civilian travel. The first week of October is the cleanest closing window — the village still in autumn colour, walnut and apple harvest tail, weather workable. Homestays start winding down through mid-October — Ahmad Family, Maha Guesthouse and most family-run rooms close by October 20-25. Lhakhang Polo Guesthouse and Turtuk Holiday Resort sometimes hold one extra week. ILP processing remains fast. Acclimatisation at Leh for 48 hours before crossing Khardung La remains essential. Friday namaaz hour and conservative dress norms unchanged. Stay short (1-2 nights); take the apricot kernels and dried apricots home — the village will not be visitable again until late May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 11, 1, 'skip',
  'Closed for winter. -12C nights. Khardung La shut. Village unreachable. Skip.',
  NULL,
  'November is when Turtuk closes for winter. Khardung La closed, road from Diskit unreachable. Homestays closed. The village functions internally but tourism is at zero. Wait for late May.',
  'November at Turtuk is the early-winter shutdown. Daytime peaks at 5-8C, nights drop to -8 to -12C, snow begins falling on the surrounding Karakoram and Trans-Himalaya. Khardung La pass is closed (since late October) and there is no alternative road into Nubra. Homestays — Ahmad Family, Maha Guesthouse, Lhakhang Polo, Turtuk Holiday Resort and the small family-run rooms — are all closed. The 350-odd village residents transition to winter mode: walnut and apricot inventories sealed, livestock barns insulated, Friday namaaz at the Mosque continues at the standard 12:30 hour. Tourist access is zero through November. The first viable visitor window of next year is approximately May 25-30.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('turtuk', 12, 1, 'skip',
  'Closed. -16C nights. Pass shut, road buried. No civilian access. Skip.',
  NULL,
  'December at Turtuk is full winter. Pass closed, Diskit-Turtuk road buried under accumulating snow. No civilian access. Wait for late May.',
  'December at Turtuk is full winter. Daytime peaks at 0-3C, nights drop to -10 to -16C, the surrounding Karakoram peaks dusted in snow. Khardung La pass remains firmly closed (and stays so until late May). The Diskit-Turtuk road is buried under accumulating snow. Civilian access is zero. The village runs on stored apricots, walnuts, dried meat, and the centuries-old village economy. Homestays closed. The Mosque continues Friday namaaz, the Polo Ground sits under snow, the orchards are bare. The Yagbo descendants run their winter routines. Visitor tourism does not reach Turtuk in December. The first viable window of next year is approximately May 25-30.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- HAR-KI-DOON (Garhwal, Uttarakhand, Govind NP) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 1, 1, 'skip',
  'Snowbound. Sankri base camp accessible but trek itself impossible. -10 to 5C. Skip for trekking.',
  NULL,
  'January at Har-Ki-Doon is full winter shutdown. Sankri base camp is reachable from Dehradun (210km, 9-10 hours, 4×4 needed for the last 30km in heavy snow), but the 25km trek from Taluka to Har-Ki-Doon is impossible — 4-6 feet of accumulated snow, sub-zero campsite temps. Only experienced winter trekkers with full mountaineering setup attempt it.',
  'January at Har-Ki-Doon is the deep-winter shutdown for casual trekkers. Sankri (the base camp at 1,950m, 210km from Dehradun, 9-10 hours via Mussoorie-Kempty-Naugaon, 4×4 needed for the last 30km in heavy snow) is reachable but the trek itself is firmly closed for general visitors. The 25km route — Sankri to Taluka by vehicle (12km) then trek through Osla and the Govind National Park check post to Har-Ki-Doon valley (3,566m) — is buried under 4-6 feet of accumulated snow. Sub-zero temperatures (-10C nights at Sankri, -25C at the Har-Ki-Doon campground) make it inhospitable to all but full-mountaineering winter trek operations. Most operators do not run January departures. The handful of GMVN-affiliated guides will run guided winter expeditions on private requests but these are 8-10 day expeditions with full snow-camping kit, not weekend trips. The mainstream Har-Ki-Doon trek season opens in late March and runs through to mid-November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 2, 1, 'skip',
  'Coldest month. -12 to 4C. Trek route deep snow. Sankri reachable but trek closed. Skip.',
  NULL,
  'February is the year''s coldest stretch in the Govind NP region. Trek route under heavy snow, Sankri reachable but cold and quiet. No commercial operators running the full Har-Ki-Doon trek. Skip — wait for April.',
  'February at Har-Ki-Doon remains in deep winter. Daytime at Sankri 4-7C, nights -8 to -12C; at the Har-Ki-Doon campground (3,566m) daytime peaks at -3C and nights drop to -25C. The 25km trek from Taluka through Osla to Har-Ki-Doon valley is buried under heavy snow — operators rate February as the most difficult month for the route. Sankri itself is reachable from Dehradun (210km, 9-10 hours via Mussoorie-Kempty-Naugaon, 4×4 needed for the last 30km in heavy snow). The handful of GMVN-affiliated winter expedition operators run February departures on private requests only — full mountaineering setup, 10-12 day timelines. Mainstream visitors do not attempt February. The trek opens commercially in late March / early April, weather-dependent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 3, 2, 'wait',
  'Late winter. Trek opens last week. -8 to 10C. Snow ice on trail past Osla until late month.',
  'March is the trek''s opening month — late March is when the route reopens commercially. The first 10-15 km from Taluka through Osla clear by mid-month; the upper Har-Ki-Doon meadow holds snow into the first week of April. Cold but workable for hardy trekkers in the last week.',
  'March is the late-winter cusp at Har-Ki-Doon. Trekkers may find it difficult to navigate the trail because of the ice layer that stays up until the last week of April. The valley itself is still snowbound. April is when commercial operators take their first solid departures.',
  'March at Har-Ki-Doon is the cusp month — winter handing over to trek season. Daytime at Sankri climbs to 8-10C, nights -3 to -8C. At Har-Ki-Doon valley (3,566m) daytime peaks at 0C and nights still drop to -15C. The trek route reopens commercially in the very last week of March on weather-dependent declarations. The first 10-15km from Taluka through Osla clear by mid-March; the upper Har-Ki-Doon meadow holds snow and ice on the trail through to the last week of April. Govind National Park entry fee ₹150 + ₹100 camera fee for Indian trekkers, paid at the Govind Vanya Jeev Vihar check post after Netwar. Sankri base GMVN guesthouse runs at ₹1,200/night (book through gmvn.in 2-3 weeks ahead). Most operators sell their first March departures in the last 7 days only. The standard itinerary is 4 days minimum: Day 1 Dehradun-Sankri, Day 2 Sankri-Taluka-Osla campsite, Day 3 Osla-Har-Ki-Doon and overnight at the meadow campsite, Day 4 return to Sankri. Carry full winter kit, non-slip footwear, microspikes for the upper sections.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 4, 5, 'go',
  'Trek season opens in earnest. -2 to 18C. Rhododendron bloom on the trail. Cleanest spring window.',
  'April is when the Har-Ki-Doon trek hits proper season. Daytime at Sankri 15-18C, nights drop to 4-7C; the trek route through Osla shows rhododendron in bloom (deep red and pink), wildflowers along the meadow, snow patches on the upper sections. The cleanest spring window of the year.',
  NULL,
  'April at Har-Ki-Doon is when the trek hits proper season. Daytime at Sankri (1,950m) reaches 15-18C, nights 4-7C; at the Har-Ki-Doon meadow campsite (3,566m) daytime touches 12-15C, nights still drop to -8 to -2C. The 25km route through Taluka, Osla and Govind NP is fully clear by mid-month. Rhododendron blooms (deep red and pink) line the trail through the Osla-Kalkattiyadhar stretch in the second and third weeks. Wildflowers in the meadow start showing from the last week. Snow patches remain at the upper sections until late April. Govind National Park entry fee ₹150 + ₹100 camera fee. Sankri GMVN guesthouse ₹1,200/night plus a private lodge grid (typically 8-12 lodges, ₹1,500-3,500/night). The standard 4-day itinerary works in April. Most operators (Indiahikes, Trekup India, Bikat Adventures, Himalayan Hikers, Trek The Himalayas) run weekly departures from Dehradun. Carry warm layers (5C night gear), trekking poles, microspikes for upper sections. Cellular signal weak past Sankri; download offline maps. Plan for moderate trek difficulty — daily distances 9-12km with steady gradient.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 5, 5, 'go',
  'Peak spring. 5-22C. Wildflowers across the meadow. Long daylight, clear skies. School-holiday rush.',
  'May is one of Har-Ki-Doon''s peak months. Daytime at Sankri 18-22C, nights 5-9C. Wildflowers across the meadow campsite, clear views of Swargarohini and Black Peak, long daylight (5:30am to 7pm). School holidays drive heavy operator booking — book 4-6 weeks ahead.',
  NULL,
  'May at Har-Ki-Doon is the year''s spring peak. Daytime at Sankri 18-22C, nights 5-9C; at the Har-Ki-Doon meadow campsite daytime 15-18C, nights 0-5C. Wildflowers carpet the meadow campsite — primulas, edelweiss-relatives, alpine meadow species. Skies clear, daylight 5:30am to 7pm. Views of Swargarohini I-IV (6,252m to 6,096m), Black Peak (6,387m), and Hata Peak from the upper meadow at peak visibility. School holidays in May drive heavy bookings — operators (Indiahikes, Bikat, Himalayan Hikers, India Trekking) sell out weekend departures 4-6 weeks ahead. Sankri GMVN guesthouse and the private lodge grid both at full occupancy on weekends. Govind NP entry ₹150+₹100. The standard 4-day itinerary holds; many operators offer a 5-6 day version with an extra day at the Maninda Tal lake or the Jaundhar glacier extension. Cellular signal weak; offline maps essential. Carry warm layers for nights, hot water bottle, trekking poles. Daily distances 9-12km. The trek is rated moderate in May — ideal for first-timers with reasonable fitness.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 6, 4, 'go',
  'Pre-monsoon peak. 8-25C. Last clean window before monsoon. Peak operator departures.',
  'June is the last clean window before monsoon arrives. Daytime at Sankri 22-25C, nights 8-12C; meadows at peak bloom, glacier views still clean. Operators run peak departure frequency through to June 15-20 before monsoon advance forces shut down for July-August.',
  NULL,
  'June at Har-Ki-Doon is the last clean trekking window before monsoon. Daytime at Sankri 22-25C, nights 8-12C; at the meadow daytime 18-22C, nights 5-8C. Meadows still in flower — late primulas, alpine asters, the small wild iris of the upper Bhyundar. Glacier views of Swargarohini and Black Peak at maximum clarity through to June 15-20. Operators run peak departure frequency through the first half. After June 20, the southwest monsoon advance begins reaching the Govind NP region, and operators (Indiahikes, Bikat, Himalayan Hikers and others) start scaling back departures for the July-August monsoon shutdown. The Tons river (which feeds the Har-Ki-Doon valley) starts running silt-loaded brown by month-end. Govind NP fee ₹150+₹100. Sankri GMVN ₹1,200; private lodge grid ₹1,500-3,500. Standard 4-day itinerary works. Carry rain gear in the second fortnight — pre-monsoon thunderstorms become more frequent. Daily distances 9-12km, moderate difficulty. The Tons river crossing at Taluka is at full snowmelt flow — pony assistance recommended for first-time trekkers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 7, 1, 'skip',
  'Monsoon. 200-300mm rainfall. Trail leeches, slippery. Operators shut. Skip.',
  NULL,
  'July is monsoon at strength in the Govind NP region. Heavy rains, leeches on the lower trail (Taluka-Osla), slippery rocks, landslide risk. Most operators shut their Har-Ki-Doon departures for the month. Skip — wait for September.',
  'July at Har-Ki-Doon is monsoon shutdown. Monthly rainfall lands at 200-300mm across the Govind National Park region, the Tons river runs at flood, and the trail through Taluka-Osla becomes a leech haven (dense undergrowth on the lower 8-10km is the worst-affected stretch). Daytime at Sankri 18-22C, nights 12-15C, humidity 90 percent. At the meadow campsite, daytime 14-17C with heavy clouds blocking glacier views entirely. Operators (Indiahikes, Bikat, Himalayan Hikers, Trek The Himalayas) all close their Har-Ki-Doon departures for July and August. The Govind NP gate stays operational but visitor numbers drop to near-zero. Sankri GMVN guesthouse runs but only for the few non-trekker travellers. The Sankri-Dehradun road takes 1-2 landslide events through the month. There is no version of the trek that works in July; the next clean window opens mid-September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 8, 1, 'skip',
  'Monsoon continues. 250-350mm rainfall. Trail conditions worst of the year. Skip.',
  NULL,
  'August is the wettest stretch at Har-Ki-Doon. 250-350mm rainfall, trail conditions at year-worst, landslides on the Sankri approach, leeches dominant. Operators closed. Skip.',
  'August at Har-Ki-Doon is the wettest month and trail conditions are at year-worst. Monthly rainfall 250-350mm across the Govind NP region. The Tons river is at peak flood. The Taluka-Osla trail is at maximum leech density and slipperiness. Daytime at Sankri 18-22C, nights 12-15C, humidity 92 percent. At the upper meadow, days are completely cloud-covered — glacier views are zero. The Sankri-Dehradun road takes 2-3 landslide events through the month, often clearing within 24 hours but with cumulative travel-time impacts. All major operators (Indiahikes, Bikat, Himalayan Hikers, Trek The Himalayas, Trekup India) keep August closed for Har-Ki-Doon. Sankri GMVN guesthouse runs at minimum capacity. Independence Day weekend brings a few hardy trekkers but the trip experience is degraded. The next clean window opens mid-September. Skip the month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 9, 4, 'go',
  'Trek season reopens. 100-150mm rainfall. Cleanest post-monsoon clarity arrives mid-month.',
  'September is when Har-Ki-Doon reopens. Operators run their first post-monsoon departures from the third week. Trail dries out from mid-month, glacier views return, autumn colour starts on the Birch and Maple stretches. Strong call for September 20 onwards.',
  NULL,
  'September at Har-Ki-Doon is the post-monsoon recovery window. Rainfall drops to 100-150mm, mostly in the first 10-12 days. Daytime at Sankri 18-22C, nights 8-12C; at the Har-Ki-Doon meadow campsite daytime 14-18C, nights 2-6C. Operators (Indiahikes, Bikat, Himalayan Hikers, Trek The Himalayas, Trekup India) restart Har-Ki-Doon departures from approximately September 15-20. The trail dries out from mid-month, leeches gone by September 25. Glacier views of Swargarohini and Black Peak return to clarity. Birch and Maple stretches on the trail begin showing autumn colour in the last week. Govind NP fee ₹150+₹100. Sankri GMVN ₹1,200, private lodge grid ₹1,500-3,500. Standard 4-day itinerary holds. Cellular weak past Sankri. Daily distances 9-12km, moderate difficulty. The September 20-30 window is the post-monsoon sweet spot — clean trail, autumn colour starting, low operator-departure frequency means smaller groups (typically 6-8 trekkers/group versus 12-16 in May).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 10, 5, 'go',
  'Year-best month. 4-20C, dry, autumn colour peak. Glacier views at maximum clarity. Operators at peak.',
  'October is arguably Har-Ki-Doon''s best month. Autumn colour peaks across Birch, Maple and the upper meadow grasses; glacier views at year-best clarity; weather perfect for trekking; long daylight still. Operators run peak departure frequency. Book 3-4 weeks ahead.',
  NULL,
  'October at Har-Ki-Doon is the year''s most coherent window for the trek. Daytime at Sankri 16-20C, nights 4-8C; at the meadow campsite daytime 13-17C, nights -2 to 3C. Monthly rainfall under 25mm. Autumn colour peaks across the trail — Birch, Maple, the alpine meadow grasses — through the first three weeks. Glacier views of Swargarohini I-IV, Black Peak, Hata Peak at maximum clarity (post-monsoon clean air, no haze). Operators (Indiahikes, Bikat, Himalayan Hikers, Trek The Himalayas, Trekup India) run peak October departures; book 3-4 weeks ahead. Sankri GMVN guesthouse and private lodge grid at 80-90 percent occupancy. The standard 4-day itinerary is at its most rewarding in October. Govind NP fee ₹150+₹100. Carry warm layers (3-5C night gear), trekking poles. Daily distances 9-12km, moderate difficulty. The trail through Osla and the Govind NP check post is at its driest of any post-summer month. Strong call for first-time trekkers wanting the cleanest experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 11, 4, 'go',
  'Late season. -2 to 14C. First snow on upper sections mid-month. Trek season closes mid-late month.',
  'November is the year''s closing window. First snowfall on the upper Har-Ki-Doon meadow typically lands mid-month. Operators run their last departures through the first three weeks; most close commercial operations by November 25. Cold but spectacular — snow-on-meadow images.',
  NULL,
  'November at Har-Ki-Doon is the year''s closing window for the trek. Daytime at Sankri 12-14C, nights drop to -2 to 2C; at the Har-Ki-Doon meadow daytime 8-12C, nights -8 to -3C. First significant snowfall on the upper meadow typically lands November 10-15; most operators run their last commercial departures through the first three weeks. By November 25 the upper trail accumulates enough snow that mainstream operations shut down for winter. Glacier views at year-best clarity in the first half. The trek experience is at its most atmospheric — fewer trekkers, stark winter light, snow-dusted meadows in the second half. Govind NP fee ₹150+₹100. Sankri GMVN guesthouse open through to early December. Carry full winter kit (down jacket, sub-zero sleeping bag, microspikes for the upper section, four-season tent if going independent). Daily distances 9-12km, moderate-difficult in second half. Cellular weak. The third week of November is the photographer''s sweet spot — snow on meadow, clear skies, low traveller density.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('har-ki-doon', 12, 1, 'skip',
  'Snowbound. -10 to 8C. Sankri reachable but trek closed. Skip for trekking.',
  NULL,
  'December is winter shutdown. Trek route under accumulating snow, operators closed, only experienced winter trekkers with full mountaineering kit attempt the route. Sankri reachable but cold and quiet. Skip for trekking.',
  'December at Har-Ki-Doon is the early-winter shutdown. Daytime at Sankri 6-8C, nights -5 to -10C; at the Har-Ki-Doon meadow daytime 0-5C, nights -15 to -22C. The trail is under accumulating snow from early December — the upper meadow campsite holds 2-4 feet of snow by month-end. Mainstream operators (Indiahikes, Bikat, Himalayan Hikers, Trek The Himalayas, Trekup India) all closed for December. The handful of GMVN-affiliated guides will run guided winter expeditions on private requests only — full mountaineering kit, 8-10 day expedition timeline. Sankri GMVN guesthouse (₹1,200/night) remains open through December for the few non-trekker travellers but the trek itself is closed. The Govind NP gate continues to operate but visitor numbers approach zero. The mainstream Har-Ki-Doon trek season reopens in late March.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- HEMKUND-SAHIB (Garhwal, Uttarakhand, Sikh shrine + glacier lake) — 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 1, 1, 'skip',
  'Closed for winter. Shrine snowbound. Ghangaria buried. -25C nights at Hemkund. Skip.',
  NULL,
  'January at Hemkund Sahib is full winter closure. Shrine kapaat closed since mid-October, Ghangaria base camp (3,049m) under deep snow, the trek from Govindghat impossible. The yatra reopens late May. Skip.',
  'January at Hemkund Sahib is the deep-winter closure. The shrine kapaat (the Gurdwara doors at 4,329m) are closed since mid-October — the Hemkund Sahib Trust does not operate the shrine through winter. Ghangaria base camp (3,049m, the village 6km below the shrine) is buried under accumulating snow with all gurdwara dharamshala beds, GMVN tents and private lodges closed. The 14km trek from Govindghat (1,828m) to Ghangaria via Pulna and Bhyundar Village is impossible. Daytime at Hemkund peaks at -10C, nights -25C. At Govindghat, daytime 5-8C, nights -2 to -5C — the village functions for residents but the yatra infrastructure is shut. The 2026 yatra opens May 25 and closes October 10 (announced by the Gurdwara Shri Hemkund Sahib Management Trust); January falls firmly outside the season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 2, 1, 'skip',
  'Closed. -28C nights at the shrine. Pre-yatra. Snow clearance not yet started. Skip.',
  NULL,
  'February is the year''s coldest stretch at Hemkund. -28C nights, no army snow-clearance yet (typically starts in March), shrine kapaat closed. Yatra opens late May. Skip.',
  'February at Hemkund Sahib is the year''s coldest stretch. Daytime at the shrine peaks at -15C, nights -28C, snow accumulation at the lake basin runs 4-7m. The trek from Govindghat through Pulna, Bhyundar Village and Ghangaria is buried. Snow clearance by the Indian Army''s Sashastra Seema Bal and the Gurdwara Trust crews has not yet started — the yatra opening preparation begins in March. Govindghat itself remains reachable from Joshimath (14km, 30 minutes) but the shrine and the entire yatra route are closed. The 2026 yatra opens May 25 (announced by the Gurdwara Sri Hemkund Sahib Management Trust); February falls firmly outside the season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 3, 1, 'skip',
  'Snow clearance starting. -22C nights. Yatra still 8-10 weeks from open. Skip.',
  NULL,
  'March is when the Indian Army and Gurdwara Trust crews start snow-clearance prep on the upper trek route. Yatra still 8-10 weeks from open (May 25, 2026). Shrine closed, Ghangaria still snowbound. Skip.',
  'March at Hemkund Sahib is the pre-yatra preparation month. The Indian Army crews and the Gurdwara Sri Hemkund Sahib Management Trust begin snow-clearance prep on the upper Ghangaria-to-Hemkund 6km stretch — the steeper section that holds the deepest snow. Daytime at the shrine peaks at -8C, nights -22C. Ghangaria base camp still under 2-3m of snow; the gurdwara dharamshala, GMVN tents and private lodges are closed. The 14km Govindghat-Ghangaria trek route remains impassable to civilian travellers. Helicopter operations from Govindghat helibase to Ghangaria (Pawan Hans, ₹3,500-4,000 one-way) do not run in March. The 2026 yatra opens May 25 (announced by the Trust); March falls firmly outside. Govindghat is reachable from Joshimath but the village functions in pre-season mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 4, 1, 'skip',
  'Snow clearance underway. -15C nights at shrine. Yatra opens late May, helicopter bookings open Apr 15. Skip.',
  NULL,
  'April is when the Indian Army crews push hard on snow clearance from Govindghat to Hemkund. Helicopter bookings open April 15 at heliyatra.irctc.co.in for the May 22-June 15 window. Yatra still 4-6 weeks from open. Skip for travel; book ahead.',
  'April at Hemkund Sahib is the pre-season preparation month with key booking dates. Daytime at the shrine peaks at -3C, nights -15C; at Ghangaria base camp daytime 5-8C, nights -5 to -8C. The Indian Army Sashastra Seema Bal and Gurdwara Trust snow-clearance crews push hard on the Govindghat-Pulna-Ghangaria-Hemkund stretch through April; the trail is typically declared safe for civilian travel by mid-late May. The defining April date for yatris: helicopter ticket bookings open April 15 at 6pm at heliyatra.irctc.co.in (the IRCTC HeliYatra portal). The Pawan Hans helicopter from Govindghat helibase to Ghangaria runs at ₹10,080 per person round-trip (2026 declared rate); a convenience fee of ₹300 + 18 percent GST per round-trip is added by IRCTC. Bookings cover the May 22-June 15 window first, with rolling release through to the season''s close on October 10. Chardham + Hemkund Sahib Yatra Registration is mandatory at registrationandtouristcare.uk.gov.in before booking helicopter or making the trek. April travellers cannot reach the shrine.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 5, 4, 'go',
  'Yatra opens May 25, 2026. -2 to 12C at shrine. Helicopter operating from helibase. First-week pilgrim surge.',
  'May is the year''s opening month. The 2026 yatra opens May 25 at 12:00 noon (Gurdwara Trust declaration). Helicopter from Govindghat to Ghangaria operating at ₹10,080 round-trip. Trek from Govindghat 14km, demanding even with helicopter shortcut. First-week pilgrim surge.',
  NULL,
  'May at Hemkund Sahib is the year''s opening month. The 2026 yatra opens May 25 at 12:00 noon — the kapaat-opening ceremony with the chief Granthi''s ardas (announced by the Gurdwara Sri Hemkund Sahib Management Trust President Narendrajit Singh Bindra to Uttarakhand Chief Secretary Radha Raturi). Daytime at the shrine 8-12C, nights -2 to 2C; at Ghangaria daytime 12-15C, nights 0-4C. The 14km trek from Govindghat (1,828m) through Pulna, Bhyundar Village, and Ghangaria (3,049m) plus the additional 6km steep climb to Hemkund (4,329m) is genuinely demanding even for fit pilgrims. Helicopter from Govindghat helibase to Ghangaria runs at ₹10,080 round-trip (Pawan Hans, book at heliyatra.irctc.co.in with mandatory Chardham + Hemkund Yatra Registration). Pony service from Pulna village (an alternative trek start, 4km past Govindghat) costs ₹2,500-3,500 each way. Ghangaria accommodation: gurdwara dharamshala (free, langar included, 200+ beds), GMVN tents (₹400-800/person), private lodges and tents (₹1,500-3,500). Overnight stay at Hemkund itself is not allowed — pilgrims trek up from Ghangaria, dip in the holy lake, do darshan, and return same day.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 6, 5, 'go',
  'Peak. 0-15C at shrine, dry. Pilgrim flow steady. Valley of Flowers opens, sister-trek combo.',
  'June is peak Hemkund Sahib. Yatra at full operation, helicopter at peak frequency, Ghangaria at full capacity. Valley of Flowers National Park (4km lateral trek from Ghangaria) opens June 1 — most pilgrims combine both treks across 2 days at Ghangaria.',
  NULL,
  'June at Hemkund Sahib is peak yatra season. Daytime at the shrine 12-15C, nights 0-3C; at Ghangaria daytime 16-20C, nights 6-10C. Monthly rainfall 100-150mm, mostly second half. Helicopter from Govindghat-Ghangaria at peak frequency (every 8-10 minutes when weather permits). Ghangaria gurdwara dharamshala at full capacity (200+ beds, free, langar at 12pm and 7pm). GMVN tents and private lodges at 90 percent occupancy. The Valley of Flowers National Park (the UNESCO-listed alpine meadow, 4km lateral trek from Ghangaria) opens June 1 — most pilgrims combine both: Day 1 Govindghat-Ghangaria, Day 2 Hemkund and back to Ghangaria, Day 3 Valley of Flowers and back to Ghangaria, Day 4 Ghangaria-Govindghat. The Valley of Flowers entry fee ₹150 + ₹100 camera. Pony service from Pulna ₹2,500-3,500. Helicopter ₹10,080 round-trip Govindghat-Ghangaria. Carry rain protection from mid-month onwards. The Hemkund star-shaped sarovar (the holy lake at the shrine) is at clearest visibility in June.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 7, 4, 'go',
  'Monsoon arrives. 4-18C. Heavy rain risk. Helicopter weather cancellations 30-40 percent. Valley of Flowers in bloom.',
  'July is when monsoon hits the Bhyundar valley. Helicopter weather cancellations climb to 30-40 percent, the trek route becomes slippery, landslide risk on Govindghat-Joshimath stretch peaks. Valley of Flowers (the sister-trek) is in peak bloom. Pilgrim flow holds despite rain.',
  'July is monsoon at strength on the Hemkund route. Helicopter cancellations 30-40 percent, slippery trail, landslide risk on the Govindghat-Joshimath approach road. The trek experience is degraded versus dry-month operations. Valley of Flowers in peak bloom partly compensates.',
  'July at Hemkund Sahib runs full monsoon. Monthly rainfall 350-450mm across the Bhyundar valley region. Daytime at the shrine 14-18C, nights 4-7C; at Ghangaria daytime 18-22C, nights 8-12C, humidity 88 percent. The 14km Govindghat-Ghangaria trail becomes slippery, especially the Bhyundar Village-Ghangaria stretch through dense undergrowth where leeches show up after the first major rains. The 6km Ghangaria-Hemkund steep climb is at year-most-demanding because of wet rock conditions. Helicopter from Govindghat to Ghangaria takes 30-40 percent weather cancellations through July (refunds processed within 7 days). Landslide risk on the Govindghat-Joshimath approach is at its highest — 1-3 events typical, often clearing within 12-24 hours. The Valley of Flowers (the sister UNESCO trek 4km from Ghangaria) is at peak bloom — over 600 flower species in alpine carpet — and many pilgrims rate the combined Hemkund + VoF trip as worth the rain. Pilgrim flow holds at 25-35 percent below June peak. Carry rain gear, non-slip footwear, leech socks, ORS.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 8, 4, 'go',
  'Monsoon continues. 4-18C. Independence Day pilgrim surge. Valley of Flowers tail.',
  'August is mid-monsoon. Helicopter weather cancellations stay at 25-35 percent. Independence Day weekend brings a 4-day pilgrim surge. Valley of Flowers bloom tail. Yatra continues but conditions are wet.',
  NULL,
  'August at Hemkund Sahib is mid-monsoon. Monthly rainfall 300-400mm, daytime at the shrine 14-18C, nights 4-7C. Helicopter weather cancellations sit at 25-35 percent through the month. Trail conditions remain slippery. Landslide risk on the Govindghat-Joshimath approach drops slightly versus July (1-2 events typical). Independence Day weekend (August 14-17) brings a 4-day pilgrim surge — Ghangaria gurdwara dharamshala overflows with sangat, GMVN tents and private lodges at 100 percent occupancy. Helicopter sells out for the long weekend 30-45 days ahead. The Valley of Flowers bloom is past peak but still strong through the first three weeks. The Hemkund Sahib star-shaped sarovar takes occasional cloud cover but remains accessible. Pony service from Pulna ₹2,500-3,500. Helicopter ₹10,080 round-trip Govindghat-Ghangaria. Carry rain gear, non-slip footwear, leech socks. Yatra Registration mandatory at registrationandtouristcare.uk.gov.in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 9, 5, 'go',
  'Monsoon retreating. 2-15C at shrine, dry late month. Cleanest post-monsoon clarity. Helicopter reliable.',
  'September is arguably Hemkund''s best month. Monsoon retreats from mid-September, helicopter back to 90+ percent reliability, trail dries out, the sarovar shows its cleanest reflection of Saptarishi peaks. Pilgrim flow heavy through the first three weeks.',
  NULL,
  'September at Hemkund Sahib is the post-monsoon recovery and arguably the year''s best window. Monthly rainfall drops to 100-150mm, mostly first fortnight. Daytime at the shrine 10-15C, nights 2-5C; at Ghangaria daytime 14-18C, nights 4-7C. Helicopter weather cancellations drop to 5-10 percent from mid-September onwards. Trail dries out by September 20; leeches gone. The Hemkund star-shaped sarovar shows its cleanest reflection of the Saptarishi peaks (the seven-peak ring around the lake basin) in late September. Pilgrim flow heavy through the first three weeks (40-50k cumulative), tapering in the last week. Ghangaria gurdwara dharamshala, GMVN tents, private lodges at 80-90 percent occupancy through mid-September. Valley of Flowers still in late bloom through the first 10 days. Helicopter ₹10,080 round-trip Govindghat-Ghangaria. Pony service ₹2,500-3,500. Yatra Registration mandatory. Strong call for pilgrims wanting peak conditions before the season''s October 10 close.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 10, 4, 'go',
  'Yatra closes Oct 10, 2026. -5 to 12C. Final 10 days, autumn colour. Cold but clear.',
  'October is the year''s closing window. The 2026 yatra closes October 10 — kapaat-closing ceremony at the shrine with final ardas. First 10 days only. Cold but clear; autumn colour on the trek. Helicopter at full reliability through the final week.',
  'October is genuinely cold (-5C nights at shrine, 0-3C nights at Ghangaria) and the yatra closes on October 10. The window is narrow — only the first 10 days of October are operational. Helicopter still reliable. Trek demanding in the cold but spectacular.',
  'October at Hemkund Sahib is the year''s closing 10 days. The 2026 yatra closes October 10 with the kapaat-closing ardas at the shrine. Daytime at the shrine peaks at 8-12C, nights drop to -5 to -2C; at Ghangaria daytime 10-14C, nights 0-3C. Monthly rainfall first 10 days under 30mm. Helicopter from Govindghat-Ghangaria at full reliability through the final 10-day window. Trek conditions clean — autumn colour on the Bhyundar Valley birch and oak stretches. Pilgrim flow heavy through the first 7 days as the kapaat-closing date approaches; many pilgrims plan their darshan for the final week. Ghangaria gurdwara dharamshala, GMVN tents, private lodges at 80-100 percent occupancy through October 10. After October 10, the shrine is closed (the kapaat shut for 7+ months until next May), Ghangaria infrastructure winds down through the second and third weeks. Valley of Flowers closed (since end-September). Pony service ₹2,500-3,500 through October 10. Helicopter ₹10,080 round-trip. Yatra Registration mandatory.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 11, 1, 'skip',
  'Closed. Shrine kapaat shut since Oct 10. Ghangaria empty. -15C nights at shrine. Skip.',
  NULL,
  'November is winter shutdown. Shrine kapaat closed since Oct 10, Ghangaria infrastructure empty, helicopter operations suspended. Skip — wait for May 25, 2027.',
  'November at Hemkund Sahib is the winter shutdown. The shrine kapaat have been closed since October 10 and stay closed until next May. Daytime at the shrine peaks at 0C, nights -15C, snow accumulating on the lake basin and the upper trek. Ghangaria gurdwara dharamshala, GMVN tents, and private lodges are all closed for the season. Helicopter operations from Govindghat-Ghangaria suspended. The 14km Govindghat-Ghangaria trek route is impassable to civilian travel from mid-November onwards. Govindghat itself remains reachable from Joshimath but the village functions in post-season mode. The next yatra opens late May (the 2027 dates will be announced by the Gurdwara Sri Hemkund Sahib Management Trust in early March 2027).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hemkund-sahib', 12, 1, 'skip',
  'Deep winter. -22C nights at shrine. Snowbound. Skip.',
  NULL,
  'December is full winter at Hemkund. -22C nights, shrine and trek route under heavy snow, no access. Wait for late May 2027.',
  'December at Hemkund Sahib is the deep-winter dead point. Daytime at the shrine peaks at -8C, nights drop to -22C, the lake basin (4,329m) under accumulating snow that will reach 4-7m depth by January. The 6km Ghangaria-Hemkund steep stretch and the 14km Govindghat-Ghangaria trail are both impassable. The Gurdwara is closed since October 10. Ghangaria base camp infrastructure (gurdwara dharamshala, GMVN tents, private lodges) all closed. Helicopter operations from Govindghat suspended. Govindghat itself remains reachable from Joshimath but the broader yatra infrastructure is shut. Winter visitors to the wider Garhwal region (Auli skiing, Joshimath) do not reach Hemkund — the shrine is firmly off-limits. The next yatra opens late May 2027, dates announced by the Gurdwara Sri Hemkund Sahib Management Trust.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

