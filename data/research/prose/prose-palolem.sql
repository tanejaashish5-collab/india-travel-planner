-- Palolem destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: palolem

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 1, 5, 'go',
  'Peak South Goa beach window. 18-31C, dry, sea calm. Silent disco runs nightly. Kayaks rented all day.',
  'January is when Palolem runs at full operational tempo. Crescent-bay shacks (Cuba, Ourem, Cocktails & Dreams) at year-best, kayak rentals to Butterfly Beach 3km north (no road access), dolphin-spotting boats at sunrise. Silent disco at Neptune Point and Leopard Valley runs nightly under the post-2014 noise-control rule.',
  NULL,
  'Palolem in January is the South Goa version most travellers actually want. Daytime 21-31C, nights drop to 18C, sea at 25C, humidity below 65 percent. The 1.5km crescent bay is a pre-1990s fishing-village beach turned backpacker-and-charter favourite — Goa''s 2014 night-noise rule (10pm cut-off, 6am restart for amplified sound) is what created Palolem''s silent-disco economy: Neptune Point and Leopard Valley run wireless-headphone parties three to four nights a week through peak season. Kayak rentals (Cuba Beach Cafe corner, ₹300/hour or ₹800/day) take you 3km north around the headland to Butterfly Beach (no road access — boat-or-kayak only). Dolphin-spotting boats run from the south end 6:30-7:30am at ₹400-600 per person. Cafe Inn (the only legendary kitchen in Palolem''s in-DB belt) holds the year''s best brunch line — 9am to 1pm, espresso and full plates. Stays: Leela Goa at Cavelossim 25km (₹25-50k), Palolem Beach Resort (₹5-12k, in-village), Bhakti Kutir (₹2.5-6k, eco-cottages on the south headland), Cozy Nooks Treehouse (₹4-8k). Margao to Palolem 36km, taxi ₹1,300, KTC bus ₹40 to Chaudi then ₹50 auto. Cabo de Rama Fort (15km north) is the morning spur worth taking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 2, 5, 'go',
  'Driest month. 19-31C. Charter-tourist load eases mid-Feb. Hotel rates ease 15 percent.',
  'February is the cleanest of the cool months. Rainfall under 5mm, charter blocks (UK, Israel, Germany historically) wind down by mid-month. Hotel rates ease 15 percent versus January. Silent disco at Neptune Point still nightly.',
  NULL,
  'February in Palolem is the year''s cleanest stretch. Rainfall averages under 5mm, daytime 21-31C, sea at 24C, humidity 60 percent. Charter-tourist blocks — historically UK and Russia, now Israeli, German, and Eastern European 14-day operators — wind down by February 18-20. Hotel rates ease 12-15 percent versus January peak. Cafe Inn drops queue waits from 30-40 minutes to 15 minutes. The 1.5km crescent supports 40+ shack kitchens (Cuba, Cocktails & Dreams, Ourem, Magic Italy, Banyan Tree) — most run Goan-thali plus the Israeli/European backpacker menu (shakshuka, hummus, falafel, banana pancakes). Butterfly Beach 3km kayak run is at year-best calm-sea conditions; sunrise dolphin boats at year-clearest 6:30-8am. Silent disco at Neptune Point on Goa Forest beach-zone runs Tuesday/Thursday/Saturday nights through peak season. Bhakti Kutir at the south headland holds 14-day yoga retreat blocks. Cabo de Rama Fort 15km is at year-best 5-5:30pm light. The Goa Forest Department''s no-loud-music rule (post-2014) makes Palolem the de-facto night-quiet South Goa beach.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 3, 4, 'go',
  'Last cool window. 21-33C. Charter season ends. Hotel rates drop 25-30 percent.',
  'March extends the February experience minus the dry-air comfort. Charter-tourist season effectively ends by March 20; hotel rates drop 25-30 percent. Holi long weekend brings a 3-day domestic-tourist bump. Last comfortable month before April humidity sets in.',
  NULL,
  'March in Palolem is the soft-landing month. Daytime 23-33C, humidity climbing toward 75 percent in the last fortnight, sea at 26C. Charter-tourist programmes wind down by March 18-20 as European return-flights end; the shack belt drops 25-30 percent off February rates and weekday occupancy thins to 60-70 percent. Palolem Beach Resort drops walk-in rates from ₹9,000 to ₹6,500-7,000; Bhakti Kutir holds at ₹3,500-4,500 (the eco-cottages on the south headland are at year-best with cool-evening sea breeze). Holi long weekend (variable date, usually mid-March) brings a Goan and Mumbai domestic-tourist bump for 3-4 days; Palolem stays calmer than the Calangute-Anjuna belt under the no-loud-music rule. The Butterfly Beach 3km kayak run remains at year-best conditions. Silent disco shifts to Friday-Saturday only by month-end as charter audiences depart. Cabo de Rama Fort spur is at year-best mid-day before April haze.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 4, 3, 'wait',
  'Pre-monsoon. 24-35C, humidity 75 percent. Beach time narrows. Shacks open till May 31.',
  'April still functions for the swim-and-shack trip — sea is warm (28-29C), 40+ shacks operational, hotel rates 35 percent below January. Mid-day heat collapses outdoor walks 11am-4pm.',
  'April pushes Palolem into pre-monsoon heat. The 1.5km beach walk works only before 10am or after 5pm. Sea-bathing remains workable but humidity at 75 percent makes shade-time non-negotiable. Better windows return in late October.',
  'April in Palolem is when the South Goa coast tips toward summer. Daytime 25-35C, humidity 75 percent, sea at 28-29C — warm enough that the cooling-bath value is gone. The 1.5km crescent walk and the Butterfly Beach kayak run both compress to morning and evening windows. Shacks (40+ kitchens including Cuba, Cocktails & Dreams, Ourem) run shorter mid-day kitchens; the Forest Department shack-licence cycle holds till May 31. Cafe Inn brunch line drops to 5-10 minute waits. Silent disco runs Saturday-only. Palolem Beach Resort drops walk-in rates to ₹5,500; Bhakti Kutir at ₹3,000-3,500. AC becomes the rate-driver — the older village rooms without AC are uncomfortable from 11am to 4pm. Power cuts run 2-4 hours afternoons; budget rooms without inverters go dark and hot. Pack a power bank, lock AC rooms, plan beach-and-fort time around the 5pm light. Cabo de Rama Fort 15km is morning-only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 5, 2, 'wait',
  'Peak heat. 26-37C, humidity 80 percent. Shacks dismantle May 31. First squalls late month.',
  'Early May still functions for the budget-conscious traveller — shacks open till May 31, sea workable, rates at year-low. Last 10 days bring SW-monsoon squalls and shacks pack up under Forest Department licence cycle.',
  'May runs hot and humid. Beach walks unworkable mid-day, sea at 30C takes the cooling element away, and the last week brings the first SW-monsoon squalls. Forest Department shack-licence cycle ends May 31; shacks dismantle. Skip to October if comfort matters.',
  'May in Palolem compresses the trip to its smallest viable shape. Daytime 27-37C, humidity 80 percent, sea at 30C. Goa Forest Department shack-licence cycle ends May 31 — by the third week, the 40+ shack kitchens along the 1.5km crescent start dismantling structures, packing furniture into the woodlots behind the dunes ahead of monsoon. The first southwest monsoon squalls arrive in the last 10 days, knocking grid power 2-4 hours afternoons and dropping 30-50mm in evening downpours. Hotel rates at year-low — Palolem Beach Resort walk-in at ₹5,000, Bhakti Kutir at ₹2,500-3,000, Cozy Nooks Treehouse at ₹3,500. Sea-bathing runs only 6-8am or post-7pm. Silent disco closes for the season around May 15. Butterfly Beach kayak run suspends end of month under rough-sea pre-monsoon conditions. The trip narrows to AC room, pool (those that have one), beach walks at the day''s edges. October cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 6, 1, 'skip',
  'SW monsoon onset. 25-31C, 600-800mm rain. Shacks shut, sea red-flag. Skip.',
  NULL,
  'June is the southwest monsoon hitting South Goa at full strength. Shacks dismantled by Forest Department rule, swim restrictions enforced (red-flag), beach access dangerous on rough-tide days. The trip you came for cannot happen.',
  'June in Palolem is when the South Goa coast closes for tourist purpose. The southwest monsoon arrives around June 10; rainfall jumps to 600-800mm across 18-22 wet days. Goa Forest Department licence cycle dismantles all 40+ shack structures along the 1.5km crescent by May 31 — the beach is kitchen-free until October 1. Coast Guard red-flag swim restriction is enforced from June 1; rip currents on the Palolem-Patnem corner turn dangerous. Sea state hits 3-4m wave heights. Most accommodations (Palolem Beach Resort, the homestay clusters along Palolem Beach Road and Ourem Road) close fully or run skeleton operations for staff-and-property maintenance. Bhakti Kutir continues at the south headland (year-round eco-stay) at ₹3,000-3,500. Cabo de Rama Fort road washes out in pockets. Silent disco closed for the season. The next viable window is October 1, when shacks reopen under the new Forest Department licence cycle.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach off-limits, almost all stays closed. Skip.',
  NULL,
  'July is the wettest month — 900-1100mm rainfall, the Arabian Sea in active monsoon, the South Goa beach economy on shutdown. Almost all Palolem stays close. The next viable window is October 1.',
  'July in Palolem is South Goa''s wettest month. Rainfall averages 900-1100mm across 25-27 wet days. The Arabian Sea sits at 27-28C but with 4-5m wave heights and rip-current advisories enforced by the Coast Guard at Canacona station 5km east. The beach is genuinely off-limits — Forest Department signage, no shacks, no lifeguards. Daytime 25-29C feels mild but the constant rain and 90 percent humidity make outdoor activity impossible to sustain. Almost all Palolem accommodations (Palolem Beach Resort, Cozy Nooks Treehouse, the homestay clusters along Palolem and Ourem) close fully — Bhakti Kutir on the south headland continues at ₹2,800-3,200 as one of the few year-round operators. Cafe Inn closes through monsoon. Cabo de Rama Fort gets dramatic monsoon light but the access road from Palolem is muddy and partially flooded. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 700-900mm rain. Beach closed. Most stays shut. Skip.',
  NULL,
  'August holds July''s pattern — heavy rain, beach access closed, Forest Department shack-zone empty. Independence Day brings a Goan-domestic surge to Goa generally but Palolem specifically stays muted. Next clean window October 1.',
  'August in Palolem holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm across 22-25 wet days, daytime 24-29C, humidity at 90 percent. The southwest monsoon does begin to ease in the last week — second-half August is when domestic Goan visitors return for monsoon-green-Goa drives, but South Goa beaches stay coast-guard red-flag and Forest Department shack-zone empty. Independence Day weekend (August 15-17) brings a noticeable hotel-bump in North Goa (Calangute, Anjuna) — South Goa stays muted. Palolem accommodations sit closed or skeleton-staffed; Bhakti Kutir continues. Cabo de Rama Fort road washes out in pockets. Bonderam (Divar Island flag festival, 4th Saturday August) is a Goan domestic day-trip draw 60km north — unrelated to Palolem trip. Wait for the October 1 shack-cycle reopening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 9, 2, 'wait',
  'Recovery. 25-30C, 300-400mm rain. Shacks closed till Oct 1. Beach reopens late month.',
  'September is the recovery month with the gating constraint that Goa shacks (under Forest Department licence) only reopen October 1. Beach reopens to walking by mid-month, but shack kitchens, kayak rentals, dolphin boats wait for October.',
  'September is on the way back but the South Goa shack-licence cycle holds shacks shut till October 1. Beach is walkable by mid-month but kitchen-free; most stays reopen between September 25 and October 5. Push to October — same weather, full operational tempo, only marginal rate climb.',
  'September in Palolem is recovery month. Rainfall drops to 300-400mm, mostly the first fortnight. Coast Guard swim-flag flips to amber by September 20-22; full green takes another week. Daytime 25-30C, humidity easing toward 80 percent. The constraint: under Goa Forest Department''s 2010 shack-licence rules, beach shacks are licensed only October 1 to May 31 — there is no shack-cycle reopening until October 1. Most Palolem accommodations stagger reopening between September 25 and October 5; Palolem Beach Resort takes walk-ins from September 28 at 35-40 percent below January peak. Bhakti Kutir continues unbroken. Cafe Inn reopens around October 1. Kayak rentals to Butterfly Beach restart with shack reopening; dolphin-spotting boats from the south end resume from October 5-10. Silent disco at Neptune Point and Leopard Valley restarts October 10-15. October is dramatically cleaner with two weeks of patience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 10, 4, 'go',
  'Season opens. Shacks reopen Oct 1. 23-32C, 150-200mm rain. Hotel rates 30 percent below Dec.',
  'October is the proper season opener. Forest Department shack-licence cycle opens October 1; 40+ shacks rebuild along the crescent. Kayaks return, dolphin boats resume. Hotel rates 30-35 percent below December peak.',
  NULL,
  'October in Palolem is when the South Goa beach belt returns to full tempo. Goa Forest Department shack-licence cycle starts October 1; 40+ kitchens (Cuba, Cocktails & Dreams, Ourem, Magic Italy, Banyan Tree) rebuild from off-season storage and run dinner service from October 5-8. Daytime 25-32C, rainfall 150-200mm — most in the first 10 days as the southwest monsoon retreats — humidity 75 percent and falling. Coast Guard swim-flag turns full green by October 12-15. Kayak rentals to Butterfly Beach 3km north resume October 5-8 (₹300/hour from Cuba Beach Cafe corner). Dolphin-spotting boats from the south end restart October 5-10 (₹400-600/person, 6:30-7:30am). Silent disco at Neptune Point and Leopard Valley restarts October 10-15 — Tuesday/Thursday/Saturday nights through season. Stays: Palolem Beach Resort at ₹6,500-8,000 (versus ₹10,000-12,000 December), Bhakti Kutir ₹3,500-4,500, Cozy Nooks Treehouse ₹4,500-6,500, Leela Goa Cavelossim 25km ₹28,000-35,000. The first three weeks of October are the smart traveller''s window — full season, pre-Christmas rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 11, 5, 'go',
  'Peak builds. 20-30C, dry. Charter blocks arriving. Hotel rates climb 25 percent month-over-month.',
  'November is when Palolem hits its high-season pattern. Charter blocks (Israeli, German, UK) start their winter from November 5-10. Silent disco nightly. Hotel rates climb 25 percent across the month.',
  NULL,
  'November in Palolem is when the South Goa crescent hits high season. Daytime 22-30C, nights drop to 20-21C, rainfall under 30mm and almost all in the first week. Sea at 26C, swim conditions full-green. Charter-tourist blocks — Israeli winter holiday cohorts, German and UK 14-day operators — begin November 5-10 and progressively tighten beach-side stay availability. The 40+ shack kitchens are at full evening tempo by week two; silent disco at Neptune Point and Leopard Valley runs Tuesday/Thursday/Saturday nights minimum. Kayak rentals to Butterfly Beach run all day; dolphin boats sell out the 6:30am sunrise slot 1-2 days ahead. Cafe Inn brunch line stretches to 30-45 minutes by month-end. Hotel rates climb 25 percent across the month: Palolem Beach Resort from ₹7,500 (Nov 1) to ₹10,000 (Nov 30), Bhakti Kutir from ₹4,000 to ₹5,500. Cabo de Rama Fort 15km is at year-best 5-5:30pm light. Strong call for first-time travellers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('palolem', 12, 5, 'go',
  'Peak season. 18-29C, dry. Christmas-NY drives rates 50-70 percent above November. Book 3 weeks ahead.',
  'December is when Palolem runs its operational peak. Cool dry weather, full shack tempo, silent disco nightly, charter blocks at year-high. Christmas-NY week (Dec 22 to Jan 5) drives rates 50-70 percent above November and books out the village belt 21-30 days ahead.',
  NULL,
  'December in Palolem is operational peak. Daytime 22-29C, nights drop to 18-19C, sea at 25C, rainfall under 20mm. The 40+ shacks run their year-best dinner service (lobster catch is at peak, snapper and kingfish too). Christmas Eve and New Year''s Eve drive hotel rates 50-70 percent above November: Palolem Beach Resort climbs from ₹10,000 to ₹15,000-17,000, Bhakti Kutir from ₹5,500 to ₹8,500, Cozy Nooks Treehouse from ₹6,000 to ₹9,500. Leela Goa Cavelossim 25km hits ₹50,000+ for Christmas week. The village belt (Ourem Road, Palolem Beach Road) books out 21-30 days ahead from December 18 onward. Silent disco at Neptune Point and Leopard Valley runs nightly through the holiday week. Kayak rentals to Butterfly Beach 3km north and dolphin-spotting boats at sunrise are at year-best operational tempo. Cafe Inn brunch line stretches to 45-60 minutes Christmas week. NH66 South Goa traffic is at year-heaviest December 23-26 and December 30-January 1.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
