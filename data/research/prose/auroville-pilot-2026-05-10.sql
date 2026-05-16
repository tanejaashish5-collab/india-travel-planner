-- Auroville editor-gate prose pilot — 12 month-rows
-- Generated 2026-05-10
-- Voice: locked NakshIQ FT Weekend register (AN pilot gold reference)
-- destination_id: auroville

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 1, 5, 'go',
  'Peak Coromandel window. 20-30C, dry, NE monsoon spent. Matrimandir slots book 2-3 days out.',
  'January is when Auroville runs at its most coherent. Northeast monsoon has cleared, red-earth paths are firm enough to cycle, the Visitor Centre runs full hours and the international pavilions are all open. Lock Matrimandir concentration passes via aurovilleguestservice.in 48-72 hours ahead — January slots fill the same week.',
  NULL,
  'January in Auroville is the version of the township the founders put on paper. Daytime sits at 24-30C, nights drop to 20-22C, humidity finally below 70 percent. The Visitor Centre runs 9am-5:30pm Monday to Saturday, half day Sunday. Matrimandir inner-chamber concentration passes are the rate-limiter — book on aurovilleguestservice.in two to three days ahead, slots release at 10am India time. Cycle rentals at the Solar Kitchen run ₹100 per day, scooters ₹400 with a passport-copy deposit. Share-autos from Pondicherry bus stand to Auroville Visitor Centre: ₹150-200, the 10km drive takes 25 minutes. ATMs at the Visitor Centre and Pour Tous community store both work; carry a 2,000-rupee buffer for the cafes that stay cash-only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 2, 5, 'go',
  'Driest month plus Auroville Marathon mid-Feb. 21-31C. Township beds tight around marathon weekend.',
  'February is Auroville''s cleanest weather window — rainfall under 15mm, low humidity, cycling-friendly mornings. The Auroville Marathon (around 3,000 runners across 5km/10km/half/full distances) takes the second Sunday and tightens accommodation for a week either side. Avoid Feb 21 darshan day if you wanted broader community access — most pavilions and kitchens close to non-residents.',
  NULL,
  'February in Auroville is the tightest of the cool months. Rainfall averages 8-15mm, daytime 23-31C, the Coromandel coast is at its most stable. The Auroville Marathon runs the second Sunday — check aurovillemarathon.com for the exact date; entries close roughly six weeks out and township guesthouses (Centre Guest House, Afsanah, Mitra) are fully held from Friday to Tuesday. Two operational dates to plan around: February 21 is The Mother''s birthday darshan — Matrimandir, the Park of Unity, and most community kitchens close to day visitors that day, residents only. Solar Kitchen lunch (₹150 donation, 12-2pm) runs everyday otherwise. Bread and Chocolate at the Visitor Centre serves from 9am; the queue settles after 11.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 3, 4, 'go',
  'Last cool window. 24-33C, dry. Matrimandir slots open up, township room rates start sliding.',
  'March extends February''s weather minus the marathon crush. Concentration passes that took 3 days to surface in January now release with 24-hour notice. Township guesthouses discount 15-20 percent versus February, and the international pavilions still run their full programme before the heat sets in.',
  NULL,
  'March in Auroville is the soft landing month. Daytime 25-33C, humidity climbing toward 75 percent in the last week, but mornings before 10am and evenings after 5pm still hold. Matrimandir concentration passes loosen — 24-hour booking lead instead of 48-72 — and the Park of Unity outer viewing platform stays walk-in. Township guesthouses (Afsanah, Mitra Hostel, Inspiration) drop room rates 15-20 percent versus February peak. Cycle rental remains the right call: ₹100/day at the Solar Kitchen rack, ₹150 for an electric assist, deposit ₹500. Sadhana Forest Friday programme (4pm tour, 7pm vegan dinner, free) runs all month. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 4, 2, 'wait',
  'Tamil Nadu plains heat. 28-38C, humidity 75 percent. Apr 24 darshan day closes the township to visitors.',
  'April still works for travelers with a clear meditation-only agenda — Matrimandir interior is climate-controlled, the inner chamber is the cool-temperature still point. But the broader community experience, cycling between zones and outdoor pavilions, breaks down by 11am.',
  'April delivers the first wave of Tamil Nadu summer. Outdoor cycling, organic-farm walks, the international-pavilions loop all collapse before noon. April 24 darshan day (anniversary of The Mother''s final return to Pondicherry) closes Matrimandir and most kitchens to non-residents.',
  'April in Auroville is when the township lesson narrows. Daytime touches 28-38C with humidity at 75-80 percent, the red-earth paths radiate heat from 10am, and the Banyan tree at the Park of Unity is the only patch of useful afternoon shade. The Matrimandir inner chamber holds 25C year-round — the sit itself remains pristine — but everything that gets you there (the 1km walk from the gate, the gardens loop, the queue) is gruelling. April 24 is the third of Auroville''s four darshan days; expect Matrimandir, Solar Kitchen, the Pour Tous store and most community workspaces to be residents-only that day. Township guesthouse rates drop 30 percent versus peak. Worth it only if the trip is a single-purpose meditation retreat rather than a community-immersion stay.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 5, 1, 'skip',
  'Peak heat. 30-40C, humidity 80 percent. Outdoor township access collapses. Wait for October.',
  NULL,
  'May is the hottest stretch of the Coromandel year. 30-40C, humidity above 80 percent, the red-earth grid radiates heat past sunset. Cycling is unworkable, organic farms suspend visitor walks, and even the indoor pavilions struggle without the mid-day power cuts.',
  'May in Auroville is the month the township effectively stops being a walkable community. Daytime 30-40C, humidity at 80 percent, the Coromandel coast at its most hostile. Cycling between the Visitor Centre, Solar Kitchen, and Matrimandir grounds (the loop you came for) is genuinely dangerous before 6am or after 6pm. Pre-monsoon power cuts run 2-4 hours each afternoon — budget guesthouses without inverters go dark and hot. Matrimandir concentration passes are widely available, prices on the longer-stay guesthouses are at year-low (40-50 percent off January), but neither makes the trip work. Pondicherry's French Quarter has marginally better tree cover, salt breeze, and air-conditioned cafes — if dates are immovable, base in White Town and day-trip Auroville mornings only. Better still: wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 6, 1, 'skip',
  'Pre-monsoon plus first SW monsoon overspill. 28-37C, humid, occasional squalls. Skip.',
  NULL,
  'June is heat plus humidity plus the first arriving squalls — the worst combination of the year. The Coromandel coast doesn''t get the SW monsoon proper (that''s a Kerala phenomenon) but the residual moisture pushes humidity past 85 percent. Township function deteriorates further from May.',
  'June in Auroville is the year''s most unpleasant month. The southwest monsoon hits Kerala on June 1 and most of the rain stays west of the Western Ghats — the Coromandel coast gets the moisture without the cooling rain. Daytime 28-37C, humidity 85 percent, intermittent afternoon thunderstorms that knock power for 3-5 hours but barely move the needle on heat. Auroville Bakery and Bread and Chocolate run shorter hours; the Solar Kitchen serves but cycle traffic between zones is at year-low. Matrimandir gardens close mid-day for safety on the hottest days. The few visitors in town are usually long-term volunteers or Newcomers in process. There is no version of the day-visitor or short-stay trip that works in June. The next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 7, 1, 'skip',
  'Mid-summer Coromandel humidity. 27-35C, occasional storms, township at its most somnolent. Skip.',
  NULL,
  'July is when the Coromandel coast sits in a humid lull — west-coast monsoon at full strength, east-coast rainfall still 10 weeks away. Townshipside, this is the deepest off-season: many shops on shorter hours, fewer pavilion programmes, hotel rates at year-low but the trip itself is hollow.',
  'July in Auroville is technically open but functionally muted. The southwest monsoon dumps on Kerala and Karnataka; the Coromandel coast gets cloudy haze, occasional thunderstorms, and 80-85 percent humidity without meaningful rain — total monthly rainfall around 80-100mm versus Kerala''s 800mm. Daytime 27-35C. Matrimandir concentration is bookable with same-day notice, the Solar Kitchen runs lighter-attended lunches, and many of the small-batch craft workshops (Auroville Papers, Boutique d''Auroville, the Earth Institute open day) shift to skeleton hours. Township guesthouses sit 50 percent below peak rates but the trip you came for — the conscious-living theatre, the international-pavilions walks, the Friday Sadhana Forest gathering — runs in low gear. A long-term residency makes sense in July; a five-day visit doesn''t.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 8, 1, 'skip',
  'Hot and sticky. 27-35C, humidity 85 percent. Aug 15 darshan plus Independence Day shut access. Skip.',
  NULL,
  'August stays hot and humid with the added closure of the August 15 darshan day (Sri Aurobindo''s birthday — the year''s most significant residents-only day). Combined with Independence Day, the township effectively closes to non-residents for 24-48 hours mid-month.',
  'August in Auroville reads more like an extension of July than a recovery. Daytime 27-35C, humidity 85 percent, occasional cyclonic squalls from the Bay of Bengal but no real cooling. The standout date is August 15 — Sri Aurobindo''s birthday darshan, the most-observed of the four annual darshan days. Matrimandir, the Visitor Centre, all community kitchens, and most pavilions close to non-residents on the 15th and run reduced operations on the 14th and 16th. Independence Day overlaps the same window, drawing domestic weekend traffic into Pondicherry that spills toward Auroville Beach. Township guesthouses sit at year-low rates but the practical visiting window is 25 of 31 days, and even those days run on monsoon-light schedules. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 9, 2, 'wait',
  'Recovery month. 26-34C, humidity easing. Township still on light schedules. NE monsoon arrives mid-Oct.',
  'September is the trickle back. The southwest monsoon retreats from inland India, humidity drops 5-10 points versus August, township programmes start rebuilding their winter calendars. Workable for a quiet, low-pressure visit if dates are completely fixed.',
  'September is on the way back to coherent but still in the run-up to it. The northeast monsoon — the rain pattern that actually defines the Coromandel year — is still 4-6 weeks away. October delivers materially better weather, Matrimandir access, and pavilion programming.',
  'September in Auroville is the soft re-opening. Daytime 26-34C, humidity finally easing toward 75-80 percent, evening winds turning from south to north as the southwest monsoon collapses inland. The Visitor Centre rebuilds full 9am-5:30pm hours from mid-month. Sadhana Forest Friday programme returns to its full 4pm tour-screening-dinner format. Matrimandir concentration is bookable with 12-24 hours notice. Solar Kitchen lunch hits 200-250 covers from 150 in August. Domestic flight loads to Chennai and Pondicherry pick up but rates are still 40-50 percent below December peak. The catch: occasional pre-monsoon squalls in the last week, and the township calendar (international film evenings, pavilion talks, language exchanges) doesn''t fully restart until mid-October. Workable, but October is dramatically cleaner with two extra weeks of patience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 10, 3, 'go',
  'Season opens but NE monsoon arrives. 24-31C, 200-250mm rainfall. Matrimandir cycles slow on wet paths.',
  'October is the season-opener with a caveat — the northeast monsoon hits the Coromandel coast mid-month, dumping 200-250mm over 10-12 wet days. Township fully re-staffed, programmes resume, but red-earth cycle paths turn muddy after each downpour and outdoor pavilion programmes shuffle indoors.',
  'October isn''t quite the clean window the rest of India gets. Tamil Nadu and Pondicherry catch the northeast monsoon while Kerala and Karnataka are at their post-monsoon best. Cycling and outdoor farm visits get interrupted; if conditions dominate the trip, push to late November.',
  'October in Auroville is the start of the season but nothing like the dry crisp version Tamil Nadu''s interior gets. The northeast monsoon arrives around October 15, and 200-250mm of rain falls across 10-12 days, often as 1-2 hour evening downpours. Daytime 25-31C, humidity 80 percent. The township re-opens fully — Visitor Centre, Solar Kitchen, all four major guesthouses, the bakery network — and Matrimandir concentration runs with the cleanest air-quality of the year. Cycle paths between the gardens and Solar Kitchen turn muddy after each rain; the 1km walk to the Matrimandir inner gate from the Park of Unity carpark gets tactical. Township rates sit 30-35 percent below December peak. Pack a poncho rather than an umbrella — the rains are usually short and the wind makes umbrellas useless.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 11, 4, 'go',
  'NE monsoon tapering. 23-30C. Nov 24 darshan day mid-month. Township fully active, December rates kick in late.',
  'November is the genuine pivot to high season. Northeast monsoon drops to 100-120mm over 5-7 wet days, mostly first fortnight. Matrimandir slots return to 48-72 hour booking lead. November 24 darshan day (Auroville''s founding) closes the township to non-residents that day — plan around it.',
  NULL,
  'November in Auroville is when the Coromandel turns the corner. Northeast monsoon eases to 100-120mm across 5-7 wet days, almost all in the first ten days. Daytime 24-30C, humidity dropping under 75 percent in the back half. The township calendar is fully restored — Pavilion of Tibetan Culture talks resume, Savitri Bhavan readings run twice weekly, Sadhana Forest Friday programmes pull 60-80 visitors. The standout date is November 24 — Mother''s Final Day, Auroville''s founding anniversary, the fourth darshan day. Matrimandir, the gardens, the Visitor Centre and most kitchens close to non-residents that day; plan a Pondicherry French-Quarter day instead. Concentration pass demand picks up sharply from November 20 onward as Christmas-week travelers begin arriving. Township guesthouse rates start climbing 15 percent in the last week. Strong call for first-time visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('auroville', 12, 5, 'go',
  'Peak Coromandel month. 20-30C, dry, township at full capacity. Matrimandir slots tight Christmas week.',
  'December is the year''s most reliable Auroville window. Daytime 24-30C, nights drop to 20-22C, monsoon spent. Christmas-week (Dec 23 to Jan 2) tightens guesthouse availability and Matrimandir slots considerably — book 5-7 days ahead. The community runs its full international-pavilions calendar.',
  NULL,
  'December in Auroville is the year''s most coherent window — peak Coromandel weather, full township function, the international community at its widest cross-section. Daytime 24-30C, nights 20-22C, rainfall under 50mm and almost all of it before December 10. The Visitor Centre runs full 9am-5:30pm hours. Matrimandir concentration passes go fast: standard 48-72 hour booking lead lengthens to 5-7 days from December 22 to January 2 as Christmas-week travelers arrive — book the moment dates lock. Township guesthouses (Centre Guest House, Afsanah, Mitra, Inspiration) hit peak rates and full occupancy from December 24. Solar Kitchen dinner buffet runs 6:30-8:30pm; arrive by 6:45 to avoid running out of the day''s thali. Cycle traffic on the red-earth grid is at year-high after 7am — quiet rides happen 5:30-6:30am only. Pondicherry French Quarter is a 10km hop, but Auroville rewards a full base here.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
