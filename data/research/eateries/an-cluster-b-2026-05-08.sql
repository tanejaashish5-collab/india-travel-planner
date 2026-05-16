-- Andaman cluster B (sea-distant remote) - 48 rows across 4 dests x 12 months
-- Generated 2026-05-08
-- Voice gate: NakshIQ FT Weekend register, factual, banned-word-clean
-- Dests: barren-island, little-andaman, long-island-andaman, rangat

-- =========================================================
-- BARREN ISLAND - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 1, 5, 'go',
  'Peak dive-cruise window. 24-29C, calm Andaman Sea. Live-aboard charters running Havelock + PB.',
  'January is Barren Island at its operational peak. Dive cruise live-aboards run from Havelock and Port Blair, the volcano cone shows steam plumes most days, and sea state is glass-flat for the 135km crossing.',
  NULL,
  'Barren Island in January is the dive-cruise window at full reliability. Air 24-29C, sea state calm, the 135km crossing northeast from Havelock or Port Blair runs in 8-10 hours of motoring through deep water. There is no landing - the volcano is a Forest Department exclusion zone and the only legal access is from the boat. Live-aboards from Lacadives, Barefoot Dive, and Dive India run 3-night charters in this window for 70,000 to 1,20,000 rupees per head, advanced-divers only at the four named dive sites surrounding the cone. The volcano vent is visible from the deck; periodic minor steam activity has continued since the 2017 eruption. Special Forest Department permit required, applied through the operator.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 2, 5, 'go',
  'Driest month. 24-30C, sea calm. Dive operators running peak schedules. Best month for the volcano charter.',
  'February is Barren Island at its cleanest. Lowest rainfall on the cruise route, calmest Andaman Sea, all four operators running. The dive sites at Manta Point and Volcano Wall are at year-best visibility.',
  NULL,
  'Barren Island in February is the cleanest version of the volcano dive cruise. Rainfall on the crossing route is under 15mm for the month, the Andaman Sea is at year-low swell, and underwater visibility at the four named sites runs 30-40 metres. Air 24-30C, water 27-28C. Live-aboards from Havelock and Port Blair run weekly slots; Lacadives and Barefoot Dive sell out 3-4 weeks ahead at peak rates of 90,000 to 1,30,000 rupees per head for a 3-night charter. The volcano cone steam-plumes most days. Advanced open-water certification minimum; nitrox endorsement standard. There is no landing permitted - all activity is boat-based. Forest Department permits are bundled with the operator booking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 3, 4, 'go',
  'Late peak. 26-31C. Sea still calm, all operators running. Charter rates dip 20% off February.',
  'March keeps February operating conditions and trims the prices. Live-aboard charters drop to 70,000 to 1,10,000 rupees. Sea calm, visibility holds at 30m+. The dive-cruise traveler with date flex picks this month.',
  NULL,
  'Barren Island in March holds February''s sea state while the rates ease. Rainfall 35-50mm, daytime 26-31C, surface water at 28C. Live-aboards run their full schedules from Havelock and Port Blair - Lacadives, Barefoot Dive, Dive India and one or two seasonal operators. Charter rates drop to 70,000 to 1,10,000 rupees per head for the standard 3-night package. Underwater visibility at Volcano Wall and Manta Point holds at 30 metres. The cone shows steam activity. The crossing is still 8-10 hours each way through deep water. Advanced open-water minimum; some operators require nitrox. No landing, boat-based viewing only, Forest Department permit through the operator.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 4, 3, 'wait',
  'Hot 28-32C. Sea still workable but pre-monsoon swell builds. Operators thin schedules late month.',
  'April still functions for Barren Island charters in the first half. Live-aboards run, sea calm enough, rates at year-low 60,000 to 90,000. After April 20 swell builds and operator schedules thin out.',
  'Barren Island works only with calm Andaman Sea conditions. April-end starts losing that. November-March deliver the same dive-cruise experience without weather risk on the 135km crossing.',
  'Barren Island in April is the dive-cruise season starting to wind down. Daytime 28-32C, surface water 29C, and the first half of the month still runs full schedules. Live-aboards from Havelock and Port Blair drop to year-low rates - 60,000 to 90,000 rupees per head for the 3-night charter. Sea state is still workable through April 20; after that pre-monsoon swell starts to build and a few operators move to optional cancellation rules. Underwater visibility holds at 25-30 metres. Dive India and Barefoot Dive close their Barren schedule by April 28-30. If your dates flex, March or November-February delivers the same crossing without risk of last-week weather cancellation.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 5, 1, 'skip',
  'Pre-monsoon. Sea state turns. All dive operators end Barren charters by May 5-10. No reliable access.',
  NULL,
  'May closes the Barren Island dive-cruise season. All operators shut their charters by the second week. Sea state on the 135km crossing turns and the volcano dive sites become unworkable. Wait for November.',
  'Barren Island in May is the volcano-cruise season ending. Live-aboard operators - Lacadives, Barefoot Dive, Dive India - all close their Barren schedules by May 5-10. Pre-monsoon squalls move into the Andaman Sea, the 135km open-water crossing becomes a 12-hour rolling slog instead of an 8-hour motor, and the dive sites at Volcano Wall and Manta Point lose visibility as upwelling kicks in. Forest Department permits for tourism use through the volcano exclusion zone are not issued from May 15 to October 30. There are no charter alternatives - the cruise model is the only legal way to view the cone. Reschedule to November-March.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 6, 1, 'skip',
  'Monsoon. All dive cruises shut. Andaman Sea at peak swell. Volcano permit window closed.',
  NULL,
  'June shuts Barren Island completely. No operator runs charters in monsoon. The crossing is dangerous, the dive sites unworkable, the Forest Department permit window closed. Reschedule to November.',
  'Barren Island in June is closed entirely. The southwest monsoon delivers 4-6 metre swell across the 135km crossing route, every live-aboard operator has shut Barren charters since early May, and the Forest Department''s tourism permit window is closed from May 15 to October 30. There is no legal or safe way to reach the volcano this month - the cone exclusion zone is enforced by the Coast Guard. The dive sites at Volcano Wall and Manta Point have zero visibility through the monsoon as the upwelling kicks in. Even research vessels avoid the route except for emergencies. The next functional Barren window is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 7, 1, 'skip',
  'Peak monsoon. No charters, no permits, no access. Skip.',
  NULL,
  'July is the worst month for Barren Island. No operator running, Forest Department permit window shut, sea unworkable. Cannot recommend. Wait for November.',
  'Barren Island in July is the volcano-cruise impossibility. Andaman Sea swell averages 4-5 metres on the route from Havelock and Port Blair, the southwest monsoon is at full strength, and no live-aboard operator has run a Barren charter in the month since the route opened to commercial diving. The Forest Department tourism permit window remains shut. Coast Guard advisories restrict private vessel movement near the cone exclusion zone. Underwater visibility at the named dive sites collapses to under 5 metres as the volcanic plume disperses through the water column. There is no workaround - the dive-cruise model is the only legal access and the model does not run in July.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 8, 1, 'skip',
  'Monsoon continues. Sea closed to charters. Skip entirely.',
  NULL,
  'August is more of July - sea state hostile, no operators running, permit window closed. The volcano viewing trip cannot happen. Move to November-March.',
  'Barren Island in August is July with marginally lower swell and the same complete shutdown. Andaman Sea swell on the route is 3-5 metres, no live-aboard operator runs Barren charters, and the Forest Department''s tourism permit window remains closed until October 30. Coast Guard advisories continue to restrict private vessel movement near the cone. The underwater visibility at Volcano Wall and Manta Point is under 8 metres, well below safe diving thresholds. The cone itself remains active with periodic steam plumes but observation is impossible from any legal position. Operators in Havelock and Port Blair quote "not before late November" to all enquiries. Wait three months for clean conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 9, 1, 'skip',
  'Late monsoon. Sea still rough. Permit window closed until October 30. No operators.',
  NULL,
  'September is too early for Barren Island. Forest Department permits do not reopen until October 30, sea state still poor, no operator selling charters. Wait two months.',
  'Barren Island in September is the late tail of monsoon and the volcano cruise is still impossible. Rainfall on the crossing route is 280-320mm and Andaman Sea swell is 2-3 metres. The Forest Department''s tourism permit window does not reopen until October 30. None of the live-aboard operators - Lacadives, Barefoot Dive, Dive India - sell Barren charters in September. Underwater visibility at the volcano dive sites is recovering but still under 15 metres. The cone is showing steam activity but observation requires the boat platform that is not running. The first viable Barren month after the monsoon is November. Wait six weeks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 10, 2, 'wait',
  'Recovery. Permit window reopens October 30. First charters Nov 1-3 only. Last 2 days of October work for booking lead time.',
  'October is permit-window reopening. Forest Department clears charters from October 30. No operator actually sails in October itself. Useful only for booking November dates ahead.',
  'Barren Island charters do not start running until November 1-3 even after the late-October permit reopening. Sea state needs another 2 weeks settling. November adds the actual functional window for the same logistical effort.',
  'Barren Island in October is the slow re-open. Rainfall drops to 130-180mm in the first two weeks, Andaman Sea swell settles to 1.5-2 metres late in the month. The Forest Department reopens its tourism permit window on October 30. None of the live-aboard operators run charters within October itself - Lacadives, Barefoot Dive, and Dive India schedule their first sailings for November 1-3, taking the lead time to clear permits and crew. Underwater visibility at the volcano sites recovers through the month from 15 to 25 metres. October is therefore useful only as the booking window for November charters; for an actual dive-cruise visit, the next workable month is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 11, 4, 'go',
  'Season opens. 25-30C, sea calm. First charters from Nov 1-3. Visibility 25-30m. Rates 25% below Dec.',
  'November is Barren Island reopening. Live-aboards from Havelock and Port Blair start sailing Nov 1-3, sea calm, visibility 25-30m, charters at 60,000 to 90,000 rupees - 25 percent below December peak.',
  NULL,
  'November is Barren Island returning to the dive-cruise schedule. Forest Department permits open from October 30, the first live-aboards sail November 1-3, and the Andaman Sea settles into its winter state of 1-2 metre swell. Air 25-30C, water 28C, underwater visibility recovers from 25 to 30 metres through the month. Charter rates run 60,000 to 90,000 rupees per head for the standard 3-night package, around 25 percent below December peak. The cone shows steam plumes most days. Lacadives, Barefoot Dive, and Dive India run 1-2 weekly slots; bookings have a 2-3 week lead time. Advanced open-water minimum, no landing permitted, viewing is boat-based only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('barren-island', 12, 5, 'go',
  'Peak. 24-29C, sea glass-flat. Christmas-NY 40% premium. Visibility 30-40m. Book 4 weeks ahead.',
  'December is Barren Island at the postcard peak. Sea glass-flat, visibility 30-40m, all four operators sailing weekly. Christmas-NY week drives a 40 percent premium and 4-week booking lead times.',
  NULL,
  'December at Barren Island is the version of the trip the live-aboard brochures sell. Andaman Sea swell at year-low 1-1.5 metres, surface water 28C, underwater visibility at Volcano Wall and Manta Point running 30-40 metres. Air 24-29C with cool dry nights on the deck. Operators run weekly schedules - Lacadives, Barefoot Dive, Dive India, plus 1-2 seasonal players - at 90,000 to 1,30,000 rupees per head for a 3-night charter. The Christmas-NY week (December 22 to January 2) drives a 35-45 percent premium and 4-week booking lead times. The cone shows steam plumes nearly every day. No landing permitted, Forest Department permits bundled through the operator, advanced open-water certification minimum, often nitrox required.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- LITTLE ANDAMAN - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 1, 5, 'go',
  'Peak. 24-30C, dry. Hut Bay ferry daily. Surf at Kumari + Butler Bay clean. Whisper Wave walk dry.',
  'January is Little Andaman at full operations. Daily DSS ferry from Phoenix Bay to Hut Bay, surf at Kumari and Butler Bay clean, White Surf and Whisper Wave waterfall walks dry. The remote-island traveler''s month.',
  NULL,
  'Little Andaman in January is the southernmost legal Andaman destination at full operations. Air 24-30C, surface water 28C, the directorate of shipping ferry from Phoenix Bay to Hut Bay runs daily on the 6-8 hour open-deck crossing at 950 rupees in deck class. Surf at Kumari and Butler Bay is clean - 1.5 to 2 metre swell, offshore winds, suitable for intermediates. White Surf Waterfall (2km forest walk) and Whisper Wave (5km harder trail) both run easily. Onge Tribal Reserve restrictions cover Dugong Creek and inland zones - tribal welfare permit needed for those. Hut Bay has BSNL only and no working ATM; carry 15,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 2, 5, 'go',
  'Driest. 24-30C. Daily ferry, surf clean, all waterfalls accessible. Best month for Little Andaman.',
  'February is the cleanest Little Andaman month. Driest week, calmest ferry crossing, surf at Butler Bay at year-best consistency. White Surf and Whisper Wave walks both dry-foot.',
  NULL,
  'Little Andaman in February is the cleanest version of the trip. Rainfall under 25mm for the month, Hut Bay ferry runs daily on the 6-8 hour crossing, sea state at year-low. Air 24-30C, humidity 73 percent. Surf at Kumari and Butler Bay is at year-best consistency - 1.5-2 metre swell, offshore mornings, small Hut Bay surf community running informal lessons at 1,500-2,000 rupees per session. White Surf Waterfall is a dry 2km walk; Whisper Wave is the harder 5km trail with rope-assist on steep sections. The two elephant farms are off-limits - Onge Tribal Reserve, requires tribal welfare permits. Hut Bay accommodation is basic - 4-5 guesthouses at 800-1,500 rupees per night.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 3, 4, 'go',
  'Late peak. 26-31C. Ferry daily, surf still firing, waterfall walks dry. Rates 25% off Feb.',
  'March keeps February''s working conditions as Hut Bay tourist load eases. Daily DSS ferry, surf clean, waterfall walks accessible. Guesthouses drop to 800-1,200. The value-traveler''s call.',
  NULL,
  'Little Andaman in March holds February''s operations and trims the prices. Daytime 26-31C, humidity 78 percent, rainfall 40-60mm in evening squalls. The directorate of shipping ferry runs daily through the first three weeks; some sailings cut to 5 weekly in the last week as Hut Bay tourist load thins. Surf at Kumari and Butler Bay is still 1.5 metre swell with offshore winds. White Surf Waterfall walk remains dry; Whisper Wave needs slightly more care on the rope-assist sections after evening rain. Guesthouses drop to 800-1,200 rupees per night. The Onge Tribal Reserve rules around Dugong Creek and South Bay are unchanged. BSNL signal only at Hut Bay; no working ATM.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 4, 3, 'wait',
  'Hot 28-32C. Ferry cuts to 5 weekly. Surf still firing. Waterfall walks need 5am starts. Heat is the constraint.',
  'April still works at Little Andaman. Surf at Butler Bay holds, ferry runs 5 weekly, rates at year-low 700-1,000. The trade-off is the 5am start for waterfall walks and 32C afternoons.',
  'Hut Bay has limited shade and no air-conditioned cafes worth mentioning. April afternoons get punishing. December-February deliver the same surf and walks without the heat penalty.',
  'Little Andaman in April is when the surf still fires but the heat starts hitting. Daytime 28-32C, humidity 81 percent, rainfall 80-110mm in evening squalls. The directorate of shipping ferry from Phoenix Bay drops to 5 weekly sailings - check the schedule before booking the Port Blair leg. Surf at Kumari and Butler Bay is still on - 1.5-2 metre swell, water 30C. The waterfall walks (White Surf 2km, Whisper Wave 5km) need 5am starts to get back before midday heat. Guesthouses at year-low rates of 700-1,000 rupees per night. The Onge Tribal Reserve permit rules are unchanged. Hut Bay has no functional ATM; bring 15,000 rupees minimum.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 5, 2, 'wait',
  'Pre-monsoon. First 18 days workable. Ferry cuts to 3 weekly. Surf bigger but rougher. Squalls cancel after May 20.',
  'Early May extends April for the Little Andaman surf trip. Bigger swell, rougher surface, ferry on 3 weekly. Lock dates by May 18. After that monsoon advance arrives and ferry cancellations begin.',
  'Little Andaman is a 6-8 hour open-deck ferry away. May''s weather window narrows fast and a late-month visit risks ferry cancellation in both directions. November-March deliver the trip cleanly.',
  'Little Andaman in early May is the surf season changing register. The first 18 days run on schedule - ferry from Phoenix Bay 3 weekly, surf at Butler Bay bigger and rougher at 2-2.5 metres, water 30C. Daytime 28-33C, humidity 84 percent. After May 20 the southwest monsoon advance arrives in the Andaman Sea. Ferries cancel on rough-sea days; ferry returns in particular get held for weather. The waterfall walks become slippery after evening rain - White Surf is fine, Whisper Wave gets risky. Guesthouses at year-low 600-900 rupees per night. The next clean Little Andaman month is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 6, 1, 'skip',
  'Monsoon. Ferry cancels routinely. Hut Bay cut off for stretches. Surf dangerous. Waterfalls flooded.',
  NULL,
  'June shuts Little Andaman down. Ferry cancellations near total, surf dangerous, waterfall trails flooded. Hut Bay gets cut off from Port Blair for stretches. Reschedule to November.',
  'Little Andaman in June is the southernmost Andaman outpost cut off from the mainland. The directorate of shipping ferry from Phoenix Bay to Hut Bay cancels on most days - the 6-8 hour open-deck crossing through 3-metre swell becomes genuinely unsafe. Surf at Kumari and Butler Bay turns from rideable to dangerous as monsoon storm swell delivers irregular 3-4 metre sets. The White Surf and Whisper Wave waterfall trails flood and become impassable in the steep sections. Hut Bay gets cut off from Port Blair for 5-10 days at a stretch. Power cuts run 8 hours daily. Mobile network is BSNL-only and intermittent. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 7, 1, 'skip',
  'Peak monsoon. Ferry runs 1-2 sailings the whole month. Skip.',
  NULL,
  'July is the worst month for Little Andaman. Ferry runs 1-2 times the whole month, surf is dangerous, trails flooded. The headline experiences are unavailable. Reschedule to November-February.',
  'Little Andaman in July is the trip impossible. Rainfall on the island hits 540-600mm, the directorate of shipping ferry from Phoenix Bay to Hut Bay runs only 1-2 sailings across the full month, and Andaman Sea swell on the 100km southbound crossing averages 3-4 metres. Surf at Butler Bay is stormwater-sized and dangerous. White Surf and Whisper Wave waterfall trails are impassable - the ground is saturated mud and the rope-assist sections are washed out. Hut Bay operates on backup generators with 8-hour daily power cuts. Mobile network beyond Hut Bay is non-existent and BSNL signal in town is patchy. Medical evacuation logistics in July make the trip risky on every front.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 8, 1, 'skip',
  'Monsoon continues. 480mm rain. Ferry near-total cancellation. Skip entirely.',
  NULL,
  'August is more of July - ferry barely running, surf dangerous, trails closed. The headline experiences (surf, waterfalls) are unavailable. Move to December-February.',
  'Little Andaman in August is July with marginally less rain and the same broken access. Rainfall settles at 460-510mm, the directorate of shipping ferry runs 2-3 sailings across the full month at most, and cancellation rates above 70 percent. Surf at Butler Bay remains storm-sized and unsafe. White Surf and Whisper Wave trails are still impassable - the steep sections washed out by the heavy July rain. Hut Bay operates at minimum services - 8-hour power cuts, 4 of the 5 small guesthouses shut for the season, basic food only. The Onge Tribal Reserve permit office in Port Blair stops processing applications in August. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 9, 2, 'wait',
  'Late monsoon. 320mm rain. Ferry resumes 2 weekly mid-month. Trails not yet certified. Operators shut.',
  'Late September is technical re-open at Little Andaman but most of the trip is still off. Ferry returns 2 weekly mid-month, but trails not cleared, surf still rough, guesthouses thin. Wait two months.',
  'Little Andaman''s headline activities (surf, waterfall walks) need infrastructure that does not stabilise until late October. September is travel time and risk for a trip that mostly cannot happen. Wait six weeks.',
  'Little Andaman in September is the slow tail of monsoon and the southernmost legal Andaman is mostly still inaccessible. Rainfall drops to 290-340mm, mostly in the first half. The directorate of shipping ferry from Phoenix Bay restarts 2 weekly sailings from the third week. Surf at Butler Bay is still storm-sized and irregular - not yet rideable. White Surf Waterfall trail is partly cleared by Forest Department; Whisper Wave is not certified open until late October. Of the 5 Hut Bay guesthouses, 2 reopen mid-month; the rest wait for November. Onge Tribal Reserve permit applications restart from September 20. Mobile network unchanged: BSNL only, often intermittent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 10, 3, 'wait',
  'Recovery. 180mm rain. Ferry 3 weekly. Whisper Wave reopens late month. Surf cleaner. Last week works.',
  'October is partial Little Andaman. Ferry 3 weekly, Whisper Wave reopens last week, surf cleaning up. The last 5 days of October work - first three weeks do not.',
  'Little Andaman''s draw needs both ferry reliability and trail certification, and that combination is not green until late October. November adds two weeks for substantially cleaner conditions across the board.',
  'Little Andaman in October is the slow re-open. Rainfall drops to 150-200mm, mostly in the first ten days. The directorate of shipping ferry from Phoenix Bay returns to 3 weekly sailings through the month. Surf at Butler Bay cleans up through October - 2-2.5 metre swell at first, dropping to a more rideable 1.5-2 metres in the last week. White Surf Waterfall trail is open by October 10; Whisper Wave gets its Forest Department clearance between October 22 and 28. The 5 Hut Bay guesthouses are mostly back open by October 25. The Onge Tribal Reserve permit office processes applications normally. The last 5 days of October work; the first 3 weeks do not.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 11, 4, 'go',
  'Properly open. 70mm rain, 25-30C. Ferry daily, surf clean, all waterfalls accessible. Rates 25% below Dec.',
  'November is Little Andaman properly back. Daily ferry from Phoenix Bay, surf at Butler Bay rideable, both waterfall walks open. Guesthouses 800-1,200 - 25 percent below December peak.',
  NULL,
  'November is Little Andaman fully re-open. Rainfall drops to 60-90mm as evening showers, the directorate of shipping ferry from Phoenix Bay runs daily on the 6-8 hour Hut Bay crossing, surf at Kumari and Butler Bay settles into 1.5-2 metre rideable swell. Air 25-30C, water 28C. White Surf Waterfall walk is dry by November 1; Whisper Wave certified open from late October. The Onge Tribal Reserve permit window is fully active. Of the 5 Hut Bay guesthouses, all are back open at 800-1,200 rupees per night - around 25 percent below December peak. Mobile network unchanged - BSNL only, no working ATM. Bring 15,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('little-andaman', 12, 5, 'go',
  'Peak. 24-29C, dry. Ferry daily, surf glass-clean, both waterfalls dry. Christmas-NY 35% premium.',
  'December at Little Andaman is the surf-island year''s height. Ferry daily, Butler Bay rideable, walks dry, guesthouses booked 2 weeks ahead. Christmas-NY week 35 percent premium and 7-day booking lead.',
  NULL,
  'December at Little Andaman is the version of the surf-island that earns the 6-8 hour ferry. Air 24-29C, water 28C, the directorate of shipping ferry from Phoenix Bay running daily on the Hut Bay crossing. Surf at Kumari and Butler Bay is at year-best consistency - 1.5-2 metre clean swell, offshore mornings, water glass-flat. White Surf and Whisper Wave waterfall trails are dry-foot. The 5 Hut Bay guesthouses run at 1,200-1,800 rupees per night, with Christmas-NY week (December 22 to January 2) carrying a 35 percent premium and 7-day booking lead. The Onge Tribal Reserve permit rules are unchanged. Mobile network: BSNL only, no working ATM. Carry 18,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- LONG ISLAND (ANDAMAN) - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 1, 5, 'go',
  'Peak. 23-29C, sea glass-flat. Yerrata ferry 3-4 weekly. Lalaji Bay reef-break clean. Two homestays open.',
  'January is Long Island at full operations. Yerrata jetty ferry running, Lalaji Bay reef glass-flat, both homestays open. The repeat-Andaman traveler''s offbeat alternative to Havelock.',
  NULL,
  'Long Island in January is the calm-water hub at full reliability. Air 23-29C, sea state glass-flat, the directorate of shipping ferry from Yerrata jetty (north of Port Blair by road, then ferry) runs 3-4 weekly sailings on the 2-hour crossing. Lalaji Bay - the headline beach, ranked 7th from Lonely Beach - is at year-best with reef-break diving in 5-8 metres of clear water. The two small accommodations (Pristine Beach Resort, Blue Planet Backpackers) run at 1,500-2,500 rupees per night. There is no ATM, no Jio or Airtel, and BSNL signal only at the jetty. Most travelers come for 2-3 nights as a quieter alternative to Havelock - daily life is dinghy rides, walks, hammock reading.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 2, 5, 'go',
  'Driest, calmest. 23-30C. Ferry on schedule. Lalaji Bay snorkeling at year-best visibility 25-30m.',
  'February is Long Island at its cleanest. Lowest rainfall, calmest sea state, Lalaji Bay reef-break visibility 25-30m. The repeat-traveler''s month - book 2 weeks ahead at Pristine Beach Resort.',
  NULL,
  'Long Island in February is the cleanest version of the calm-water trip. Rainfall under 15mm for the month, sea state at year-low, the directorate of shipping ferry from Yerrata jetty running 3-4 weekly slots on the 2-hour crossing. Air 23-30C, water 28C, underwater visibility at the Lalaji Bay reef-break a year-best 25-30 metres. The two homestays - Pristine Beach Resort and Blue Planet Backpackers - run at 1,800-2,800 rupees per night with 2-3 week advance booking. Daily activity is the 30-minute dinghy ride to Lalaji Bay, snorkeling, walking the beach, reading. There is no ATM and no Jio/Airtel signal. BSNL works at the jetty, fades 200m inland. Carry 12,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 3, 4, 'go',
  'Late peak. 25-31C. Ferry on schedule, Lalaji Bay clean, homestay rates 25% off Feb.',
  'March keeps February''s working conditions and trims the rates. Yerrata ferry on schedule, Lalaji Bay reef visibility holds, homestays drop to 1,200-1,800. Quieter month for the offbeat traveler.',
  NULL,
  'Long Island in March holds February''s sea state while the rates ease. Daytime 25-31C, humidity 78 percent, rainfall 35-50mm in evening squalls. The directorate of shipping ferry from Yerrata jetty runs 3 weekly slots reliably. Underwater visibility at the Lalaji Bay reef-break holds at 25-30 metres for the first three weeks; some haze comes in late month. The two homestays drop to 1,200-1,800 rupees per night as the Port Blair tourism load eases - bookings are 1 week lead time instead of 2-3. Daily life is the 30-minute dinghy hop to Lalaji Bay, snorkeling, beach walks. The route from Diglipur side via Aerial Bay is also active for travelers stitching the far north into the trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 4, 3, 'wait',
  'Hot 27-32C. Yerrata ferry on schedule. Lalaji Bay clean. Heat is the planning constraint.',
  'April still works at Long Island. Sea calm, ferry on schedule, Lalaji Bay reef holds. Year-low rates 1,000-1,500. Heat is the trade-off - Long Island has minimal shade and basic fans.',
  'Long Island accommodations are basic - cottages with fans and limited cross-ventilation. April mid-day heat traps inside. November-February deliver the same beach trip in much more comfortable conditions.',
  'Long Island in April is when the calm sea still holds but the heat starts hitting. Daytime 27-32C, humidity 81 percent, rainfall 70-100mm in evening squalls. The directorate of shipping ferry from Yerrata runs 3 weekly slots. Lalaji Bay reef visibility holds at 22-28 metres. The two homestays drop to year-low 1,000-1,500 rupees per night, but the basic cottages have fans only - no air conditioning - and afternoon heat traps in the rooms. Daily activity gets pushed to dawn and late afternoon: dinghy to Lalaji Bay at 6am, back by 10am, second swim at 4pm. BSNL signal at the jetty only. The Diglipur-side route via Aerial Bay is still active for stitched itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 5, 2, 'wait',
  'Pre-monsoon. First 18 days workable. Ferry cuts to 2 weekly. Squalls cancel after May 20.',
  'Early May extends April for Long Island. First 18 days run. Yerrata ferry 2 weekly, Lalaji Bay still clean. Lock dates by May 18. After that southwest monsoon advance arrives and ferries cancel.',
  'Long Island depends on a single ferry route from Yerrata. Late May sees that route cancel intermittently. November-March deliver the same offbeat-Havelock alternative without ferry-cancellation risk.',
  'Long Island in early May runs much like April with a tighter deadline. The first 18 days are functional - the directorate of shipping ferry from Yerrata jetty runs 2 weekly slots, Lalaji Bay reef visibility holds at 20-25 metres, daytime 28-33C, humidity 83 percent. From around May 20, the southwest monsoon advance arrives in the Andaman Sea. Ferries cancel on rough-sea days; a stranded return from Long Island to Yerrata can take 2-3 days to recover. The two homestays at Long Island shut for the season around May 25-28. Daily heat is significant inside the basic cottages. The next clean Long Island month is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 6, 1, 'skip',
  'Monsoon. Ferry from Yerrata cancels routinely. Both homestays shut. Lalaji Bay dinghy off. Skip.',
  NULL,
  'June shuts Long Island down. Yerrata ferry cancels, both homestays shut for the season, Lalaji Bay dinghy off the water. Cannot recommend. Reschedule to November.',
  'Long Island in June is the calm-water hub completely closed. The directorate of shipping ferry from Yerrata jetty cancels on most days as the 2-hour crossing through 2-3 metre swell becomes too rough. The two homestays - Pristine Beach Resort and Blue Planet Backpackers - shut for the season at the end of May and stay closed through October. Lalaji Bay is unreachable - the 30-minute dinghy hop is suspended for the monsoon, and even if it ran, the reef-break visibility collapses below 5 metres. There is no village hotel as a fallback; once the homestays shut there is no traveler accommodation on the island. BSNL signal weakens further during storms.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 7, 1, 'skip',
  'Peak monsoon. Ferry suspended. Both homestays shut. Skip.',
  NULL,
  'July is the worst month for Long Island. Ferry from Yerrata suspended, both island homestays shut for the season, Lalaji Bay dinghy off the water, reef-break visibility under 3 metres. Cannot recommend. Wait for November.',
  'Long Island in July is the trip impossible. Rainfall on the island hits 510-560mm, the directorate of shipping ferry from Yerrata jetty is suspended for stretches as the 2-hour crossing becomes unsafe through 2-4 metre swell. Both homestays remain shut for the season. The Lalaji Bay dinghy hop is off the water. Underwater visibility at the reef-break collapses to under 3 metres as monsoon runoff carries silt across the eastern Middle Andaman. There is no fallback accommodation on the island and no functioning visitor infrastructure. Mobile network beyond the jetty is non-existent. The medical evacuation logistics in July make a clear-day visit risky.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 8, 1, 'skip',
  'Monsoon continues. 460mm rain. Ferry off, homestays shut, Lalaji Bay inaccessible. Skip.',
  NULL,
  'August is more of July - ferry suspended, homestays closed, Lalaji Bay unreachable. The headline experiences (reef-break, calm-sea swims, Lalaji walks) are unavailable. Move to November-February.',
  'Long Island in August is July with marginally less rain and the same broken access. Rainfall settles at 440-490mm, the directorate of shipping ferry from Yerrata is mostly suspended through the month - perhaps 1-2 sailings if a weather window opens. Both homestays remain shut for the season; staff have moved to mainland family stays. The Lalaji Bay dinghy hop is off, reef-break visibility under 5 metres. The Diglipur-side route via Aerial Bay also runs unreliably. There is no functional traveler infrastructure on the island. BSNL signal is weak even at the jetty in storm weather. Wait for November - the homestays plan reopening dates for November 1-5.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 9, 2, 'wait',
  'Late monsoon. 320mm rain. Ferry resumes mid-month. Homestays still shut until October.',
  'September is technical re-open at Long Island but most of the trip is still off. Yerrata ferry returns mid-month but both homestays stay shut until October. Wait two months.',
  'Long Island has only two homestays - both stay shut for the season until October. Even if the ferry runs, there is no traveler accommodation. November is the first fully workable month.',
  'Long Island in September is the slow tail of monsoon and the trip is mostly still impossible because the accommodations are not yet open. Rainfall drops to 290-340mm, mostly in the first half. The directorate of shipping ferry from Yerrata jetty restarts 1-2 weekly sailings from the third week. But both Pristine Beach Resort and Blue Planet Backpackers stay shut for the entire month - their reopening is targeted at October 5-12. The Lalaji Bay dinghy hop restarts in early October. There is no fallback accommodation; once you reach the island, sleeping is the problem. Mobile network unchanged - BSNL only at the jetty. Wait six weeks for November''s clean opening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 10, 3, 'wait',
  'Recovery. 180mm rain. Ferry 2 weekly. Homestays reopen Oct 5-12. Last 3 weeks workable.',
  'October is partial Long Island. Ferry 2 weekly, both homestays reopen Oct 5-12, Lalaji Bay dinghy back. Last 3 weeks of October work; first week does not.',
  'Long Island''s reopening sequence (ferry, homestays, dinghy) takes the first 10-12 days of October to settle. November adds full reliability with the same effort. If dates flex, push them to November.',
  'Long Island in October is the slow re-open. Rainfall drops to 150-200mm, mostly in the first week. The directorate of shipping ferry from Yerrata jetty returns to 2 weekly sailings from October 5-7. Both homestays - Pristine Beach Resort and Blue Planet Backpackers - reopen between October 5 and October 12 once staff travel back from mainland breaks. The Lalaji Bay dinghy hop restarts at full schedule by October 10. Underwater visibility at the reef-break recovers from 12 to 22 metres through the month. The last 3 weeks of October work cleanly. Rates run 1,200-1,800 rupees per night - around 30 percent below December peak. BSNL signal at the jetty unchanged.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 11, 4, 'go',
  'Properly open. 70mm rain, 24-30C. Ferry 3 weekly, Lalaji Bay reef clean, homestays at 1,500-2,200.',
  'November is Long Island fully back. Yerrata ferry 3 weekly, Lalaji Bay snorkeling clean, both homestays open at 1,500-2,200 rupees - 25 percent below December peak. The offbeat traveler''s month.',
  NULL,
  'November is Long Island fully reopened. Rainfall drops to 60-90mm as evening showers, the directorate of shipping ferry from Yerrata runs 3 weekly slots reliably, sea state at the 2-hour crossing settles into glass-flat conditions. Air 24-30C, water 28C, underwater visibility at the Lalaji Bay reef-break running 22-28 metres. Both homestays operate at 1,500-2,200 rupees per night - around 25 percent below December peak. The Lalaji Bay dinghy hop is at full schedule, with extra slots for snorkeling groups. There is no ATM, no Jio or Airtel; BSNL signal at the jetty only. Bring 12,000-15,000 rupees from Port Blair. Bookings are 7-10 day lead time, not the 2-3 weeks December demands.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('long-island-andaman', 12, 5, 'go',
  'Peak. 23-29C, sea glass-flat. Lalaji Bay reef visibility 30m. Christmas-NY 35% premium, 2-week lead.',
  'December is Long Island at its postcard peak. Yerrata ferry on schedule, Lalaji Bay reef-break clean, both homestays running. Christmas-NY week 35 percent premium and 2-week booking lead.',
  NULL,
  'December at Long Island is the version of the offbeat trip that earns the ferry effort. Air 23-29C, water 28C, the directorate of shipping ferry from Yerrata jetty running 3-4 weekly slots through the month. Sea state glass-flat, underwater visibility at Lalaji Bay reef-break a year-best 28-32 metres. Both homestays - Pristine Beach Resort and Blue Planet Backpackers - run at 2,000-3,000 rupees per night, with the Christmas-NY week (December 22 to January 2) carrying a 35 percent premium and 2-week booking lead. The Lalaji Bay dinghy hop runs 6-7 daily slots. No ATM, no Jio/Airtel - BSNL at the jetty only. Carry 18,000 rupees from Port Blair. Daily life: dinghies, reef snorkeling, hammocks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

-- =========================================================
-- RANGAT - 12 months
-- =========================================================

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 1, 5, 'go',
  'Peak. 22-29C, dry. ATR convoy reliable. Cuthbert Bay turtle nesting at peak. Amkunj boardwalk dry.',
  'January is Rangat at full operations. ATR convoy on schedule, Cuthbert Bay olive ridley nesting at peak, Amkunj Beach mangrove boardwalk dry. The Middle Andaman transit stop with reasons of its own.',
  NULL,
  'Rangat in January is the Middle Andaman district headquarters at full operations. Air 22-29C, dry, the Andaman Trunk Road convoy from Jirkatang gate runs all three slots - 5:30am, 8:30am, 12:30pm - through the Jarawa Tribal Reserve on the 170km, 8-hour drive from Port Blair. Cuthbert Bay olive ridley nesting is at the December-February peak; Forest Department patrols at 7-9pm guide visitors with strict no-flash rules. Amkunj Beach mangrove boardwalk (1km, eco-tourism trail) is dry-foot through the month. Dhani Nallah waterfall is a 20-minute forest walk for a small swim. Most travelers use Rangat as the overnight stop on the Port Blair-Diglipur road haul. BSNL signal patchy. No working ATM.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 2, 5, 'go',
  'Driest. 23-30C. ATR on schedule, Cuthbert Bay nesting tail end, Amkunj boardwalk dry. Best month.',
  'February is Rangat at its cleanest. Lowest rainfall, ATR convoy reliable, Cuthbert Bay nesting tail end with last 200-300 nests laid. Amkunj boardwalk and Dhani Nallah dry. Best transit-dest month.',
  NULL,
  'Rangat in February is the cleanest version of the Middle Andaman stopover. Rainfall under 20mm for the month, the Andaman Trunk Road convoy from Jirkatang runs all three daily slots through the Jarawa Tribal Reserve, and Cuthbert Bay olive ridley nesting wraps in the first fortnight - the last 200-300 nests of the season laid before the females depart. Air 23-30C, humidity 73 percent. Amkunj Beach mangrove boardwalk (1km eco-trail) is dry-foot. Dhani Nallah waterfall walk is a 20-minute forest path. The Forest Lodge and 2-3 small hotels at Rangat town run at 1,200-1,800 rupees per night. The Jarawa Reserve rules on the convoy are absolute: no photography, no stops, no rolling windows. BSNL signal patchy.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 3, 4, 'go',
  'Late peak. 25-31C. ATR on schedule, boardwalk dry, Dhani Nallah running. Hotel rates 25% off Feb.',
  'March keeps February conditions and trims the prices. ATR convoy reliable, Amkunj boardwalk and Dhani Nallah accessible. Hotel rates drop to 900-1,400. The Diglipur-route stopover at quieter prices.',
  NULL,
  'Rangat in March holds February''s working conditions while the rates ease. Daytime 25-31C, humidity 78 percent, rainfall 30-45mm in evening squalls. The Andaman Trunk Road convoy from Jirkatang runs all three slots reliably. Cuthbert Bay nesting is over - the beach is empty - but the Amkunj Beach mangrove boardwalk is still dry-foot, and the Dhani Nallah waterfall walk is at its post-peak quiet. Hotels at Rangat town drop to 900-1,400 rupees per night. The 170km drive from Port Blair runs in 7-8 hours with dry roads. Most travelers split the haul to Diglipur with an overnight here. BSNL signal patchy at best, no Jio or Airtel. No working ATM in town.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 4, 4, 'go',
  'Hot 27-32C. ATR on schedule, boardwalk dry. Year-low hotel rates 800-1,200. Heat is the trade-off.',
  'April is Rangat at off-peak rates with full operations. ATR convoy on schedule, Amkunj boardwalk dry, Forest Lodge and small hotels at 800-1,200. The transit-stop traveler''s value month.',
  NULL,
  'Rangat in April is when the convoy mechanics still work but the heat starts hitting. Daytime 27-32C, humidity 80 percent, rainfall 60-90mm in evening squalls. The Andaman Trunk Road convoy from Jirkatang runs all three slots; the 5:30am slot is genuinely the only comfortable time to be on the 170km haul. Amkunj Beach mangrove boardwalk is still dry-foot but the late-morning walk is sweaty. Dhani Nallah waterfall walk works as the cool relief in the trip. Cuthbert Bay is empty - turtle nesting is over. Forest Lodge and small hotels at Rangat town drop to 800-1,200 rupees per night - year-low rates. The Jarawa Reserve rules unchanged. BSNL signal patchy. Carry 8,000-10,000 rupees from Port Blair.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 5, 3, 'wait',
  'Pre-monsoon. First half holds. After May 18 ATR closes for landslides and boardwalk gets slippery.',
  'Early May at Rangat extends April. First 18 days run on schedule. ATR convoy on schedule, hotels at 700-1,000. Lock dates by mid-month. After May 20 ATR landslide closures begin.',
  'Rangat depends on the ATR convoy through the Jarawa Reserve to be running. Late May sees that route close intermittently. November-March deliver the same Middle Andaman stopover without monsoon-advance risk.',
  'Rangat in early May is April with a clearer deadline. The first 18 days run as expected - 5:30am ATR convoy on schedule, Amkunj Beach mangrove boardwalk still dry-foot, Dhani Nallah accessible. Daytime 28-32C, humidity 82 percent, rainfall 110-140mm in evening squalls. From around May 20, the southwest monsoon advance arrives. The Andaman Trunk Road has 2-3 chronic landslide stretches in the Jarawa Reserve section that close for 6-12 hours at a time. The Amkunj boardwalk gets slippery underfoot when squalls move through. Hotels drop to 700-1,000 rupees per night. The next clean Rangat month is November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 6, 1, 'skip',
  'Monsoon. ATR closes for landslides routinely. Boardwalk flooded. Rangat town cut off in stretches.',
  NULL,
  'June shuts the Rangat stopover down. ATR landslide closures, Amkunj boardwalk flooded, Dhani Nallah trail impassable. The convoy itself runs unreliably for residents only. Reschedule to November.',
  'Rangat in June is the Middle Andaman stopover broken by infrastructure. The Andaman Trunk Road through the Jarawa Reserve has 3-4 chronic landslide stretches that close repeatedly - the route is shut for 6-24 hours at a time, with same-day cancellation rates above 60 percent. Amkunj Beach mangrove boardwalk floods at high tide combined with heavy rain. Dhani Nallah waterfall trail is impassable - the 20-minute walk turns into a slip-and-fall hazard. Rangat town gets cut off from Port Blair when the road closes for multiple days at once. Hotels drop to 600-900 rupees but most operate on minimum staff. BSNL signal weakens further during storms. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 7, 1, 'skip',
  'Peak monsoon. ATR closed routinely. Skip.',
  NULL,
  'July is the worst month at Rangat. ATR shut for landslides on roughly half the days, Amkunj boardwalk and Dhani Nallah trail impassable, Rangat town cut off in stretches. Cannot recommend. Wait for November.',
  'Rangat in July is the trip impossible. Rainfall in the Middle Andaman ranges hits 510-560mm, the Andaman Trunk Road through the Jarawa Reserve is closed for landslides on roughly half the days of the month, and the convoy itself runs only for resident traffic with frequent same-day cancellations. The Amkunj Beach mangrove boardwalk and Dhani Nallah waterfall trail are both impassable. Rangat town operates on backup generators with 6-8 hour daily power cuts. Forest Lodge and most small hotels run on minimum staff. BSNL signal in town is patchy and beyond town non-existent. The medical evacuation logistics in July, given the road condition, make a clear-day visit risky.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 8, 1, 'skip',
  'Monsoon continues. 460mm rain. ATR broken, trails closed. Skip entirely.',
  NULL,
  'August is more of July - ATR shut intermittently, trails impassable, town services minimal. The headline experiences (boardwalk, Dhani Nallah, the ATR transit itself) are unavailable. Move to November-March.',
  'Rangat in August is July without much improvement. Rainfall settles at 440-490mm, the Andaman Trunk Road has 3-4 chronic problem stretches in the Jarawa Reserve that close intermittently as new August landslides feed off saturated ground. The Amkunj Beach mangrove boardwalk floods at high tide. The Dhani Nallah waterfall trail remains impassable. The ATR convoy from Jirkatang runs for resident traffic only with same-day cancellation rates above 50 percent. Rangat town hotels operate at minimum staff - 2-3 rooms per property at most. BSNL signal weak in town and absent beyond. The Diglipur ferry from Aerial Bay is also patchy. Wait three months for clean conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 9, 2, 'wait',
  'Late monsoon. 320mm rain. ATR repairs ongoing. Boardwalk not yet certified. Trail closed.',
  'September is technical re-open at Rangat but most of the trip is still off. ATR has unrepaired landslides, Amkunj boardwalk not yet recertified, Dhani Nallah trail still closed. Wait two months.',
  'Rangat depends on a working ATR + open trails, and neither is fully back together until October at the earliest. November adds substantially cleaner conditions for the same logistical effort.',
  'Rangat in September is the slow tail of monsoon and the Middle Andaman stopover is mostly still impossible. Rainfall drops to 290-340mm, mostly in the first half. The Andaman Trunk Road has 2-3 unrepaired landslide stretches that the Andaman Public Works Department clears through October; the 170km drive from Port Blair takes 11-13 hours instead of 7-8. The ATR convoy returns to a 2-slot daily schedule mid-month. Amkunj Beach mangrove boardwalk is not certified open by Forest Department until October. Dhani Nallah waterfall trail stays closed. Rangat town hotels start reopening from mid-month at 700-1,000 rupees per night. Wait six weeks for November''s clean opening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 10, 3, 'wait',
  'Recovery. 180mm rain. ATR fully open mid-month, boardwalk reopens late. Last week works cleanly.',
  'October is partial Rangat. ATR fully open mid-month, Amkunj boardwalk recertified Oct 22-28, Cuthbert Bay nesting starts in last week. The last 5 days of October work; first three weeks do not.',
  'Rangat''s draw needs the ATR + boardwalk + Cuthbert Bay turtle nesting all working. October has the first two from mid-month and the third only from the last week. November adds clean reliability for all three.',
  'Rangat in October is the slow re-open. Rainfall 150-200mm, mostly in the first ten days. The Andaman Trunk Road through the Jarawa Reserve has its full-length opening certified by mid-October; the 170km drive from Port Blair returns to 8-9 hours. Amkunj Beach mangrove boardwalk gets its Forest Department recertification between October 22 and 28. Dhani Nallah waterfall trail reopens around the same time. Cuthbert Bay olive ridley turtle nesting begins in the last week of October - Forest Department night patrols start then. Hotels return to full staffing from October 15. The last 5 days of October work cleanly; the first 3 weeks do not.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 11, 4, 'go',
  'Properly open. 60mm rain, 23-30C. ATR convoy reliable, boardwalk dry, Cuthbert Bay nesting begins.',
  'November is Rangat back on the Middle Andaman menu. ATR convoy reliable, Amkunj boardwalk dry, Cuthbert Bay olive ridley nesting picks up. Hotels 1,000-1,500 - 25 percent below December peak.',
  NULL,
  'November is Rangat properly back on the Middle Andaman map. Rainfall drops to 50-80mm as evening showers, the Andaman Trunk Road convoy through the Jarawa Reserve runs all three slots reliably, and the 170km drive from Port Blair is back to 7-8 hours. Air 23-30C, humidity 75 percent. Amkunj Beach mangrove boardwalk is dry-foot through the month. Cuthbert Bay olive ridley turtle nesting picks up, with Forest Department patrols at 7-9pm guiding small groups under no-flash rules. Dhani Nallah waterfall is at the post-monsoon flow peak. Hotels at Rangat town run 1,000-1,500 rupees per night - around 25 percent below December peak. BSNL signal patchy. No working ATM; carry 8,000-10,000 rupees.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('rangat', 12, 5, 'go',
  'Peak. 22-29C, dry. ATR on schedule, Cuthbert Bay nesting at full intensity, boardwalk dry. NY 30% premium.',
  'December is Rangat at full height. ATR convoy reliable, Cuthbert Bay turtle nesting at peak, Amkunj boardwalk dry, Dhani Nallah running. Christmas-NY week 30 percent premium.',
  NULL,
  'December at Rangat is the Middle Andaman stopover at full reliability. Air 22-29C with cool nights, rainfall 25-40mm. The Andaman Trunk Road convoy from Jirkatang runs all three slots without delay; the 170km drive from Port Blair takes a clean 7-8 hours. Cuthbert Bay olive ridley nesting is at full intensity - Forest Department patrols at 7-9pm guide visitors to nests being laid in real time, no flash, hushed approach. Amkunj Beach mangrove boardwalk dry through to the back. Dhani Nallah waterfall walk is at peak flow. Hotels run 1,300-1,800 rupees per night with Christmas-NY week (December 22 to January 2) carrying a 30 percent premium and 5-7 day booking lead. BSNL patchy, no ATM.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
