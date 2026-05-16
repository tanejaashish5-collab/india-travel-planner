-- Agonda destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: agonda

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 1, 5, 'go',
  'Peak South Goa stretch. 18-31C, dry, sea calm. Olive ridley nesting peak. Yoga retreats run full.',
  'January is when Agonda runs at its quietest peak. The 3km crescent stays the calm-by-design alternative to Palolem 8km north — no jet skis, no banana boats, no loudspeakers under Forest Department rules tied to the olive ridley nesting beach. Coconut Lagoon Treehouse and Agonda Beach Homestay sit at peak occupancy from December 24 onward; Elsewhere (Cabo de Rama tip, ₹12-18k) holds month-long stays.',
  NULL,
  'Agonda in January is the South Goa beach the regulars protect. Daytime 21-31C, nights drop to 18C, sea at 25C, humidity below 65 percent. Olive ridley turtles nest along the 3km arc from October to March — Goa Forest Department''s Olive Ridley Census records 50-150 nests per season across Agonda, Galgibaga and Morjim, and the beach''s no-water-sports rule (no jet skis, no banana boats, no loud sound systems) is enforced by the Forest Department guards from the Agonda Beach checkpost at the south end. Yoga retreats — H2O Agonda, Yoga Magic, Sanskruti — run their full 7 to 21-day programmes. Stays cluster at four levels: Elsewhere on the Cabo de Rama promontory (₹12-18k, 4 cottages, December books out by August), Agonda Garden Cottages (₹4-7k, beachfront), Coconut Lagoon Treehouse (₹5.5-9k, palm-canopy), and Agonda Beach Homestay (₹2.5-4.5k, family-run). Margao to Agonda is 35km — taxi ₹1,200, KTC bus ₹40 to Chaudi then ₹80 auto.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 2, 5, 'go',
  'Driest month. 19-31C. Turtle nesting active. Hotel rates ease 15 percent post-NYE.',
  'February is the tightest of the South Goa cool months. Rainfall under 3mm, humidity 60 percent, sea at its calmest. Yoga retreat 21-day blocks book out 6-8 weeks ahead. Carnival float spillover from Margao (3 days before Ash Wednesday) brings a 2-day weekend bump but doesn''t reach Agonda properly.',
  NULL,
  'February in Agonda is the year''s cleanest stretch. Rainfall averages under 3mm, daytime 21-31C, sea at 24-25C, humidity 60 percent. Olive ridley nesting continues — late-Feb is when the Forest Department''s incubation pens at the south-end checkpost see hatchlings released back to sea, dawn-only viewing on a guard-led basis (no fixed schedule, ask at the Cabo de Rama Range office). The Agonda shack-line runs 30+ kitchens between Coconut Lagoon and Tashi Resorts at the north end; most do mid-strength Goan-thali plus Israeli-traveller-driven menus (shakshuka, hummus). Hotel rates on Coconut Lagoon Treehouse and Agonda Garden Cottages slide 12-15 percent versus January peak. Goa Carnival float parades run in Margao city across 3 days before Ash Wednesday; Agonda itself stays quiet. Cabo de Rama Fort is 12km north — the 1763 Portuguese ramparts are best at 5-5:30pm light. Pack a fleece for late-evening beach walks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 3, 4, 'go',
  'Last cool window. 21-33C. Turtle nesting tail-off. Yoga retreats wrap by mid-month. Rates 25 percent below Jan.',
  'March extends the February experience minus the dry-air comfort. Yoga retreats wrap their winter programmes by March 15, hotel rates drop 25 percent versus January, the beach sits empty most weekday mornings. Last comfortable window before April humidity sets in.',
  NULL,
  'March in Agonda is the soft-landing month. Daytime 23-33C, humidity climbing toward 75 percent in the last fortnight, sea at 26C. Olive ridley nesting season closes around March 31 — Forest Department releases the last of the season''s incubation pens by mid-month. Yoga retreats wind down their winter programmes by March 15-20; H2O Agonda and Yoga Magic switch to drop-in classes only. Shacks stay open till May 31 (forest-rule cutoff). Agonda Beach Homestay drops walk-in rates from ₹4,500 to ₹3,000; Coconut Lagoon Treehouse holds ₹6,000-7,000. Cabo de Rama Fort at 12km north is at its best mid-day before haze settles. Holi long weekend (variable date) brings a Goan-domestic-tourist bump for 3-4 days; Agonda stays calmer than Palolem under the no-loud-music rule. Last clean stretch before pre-monsoon heat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 4, 3, 'wait',
  'Pre-monsoon heat. 24-35C, humidity 75 percent. Beach windows narrow. Shacks open but visitor load thin.',
  'April still works for the swim-and-shack trip with managed expectations — sea is warm (28-29C), shacks operational, hotel rates 35 percent below January. Mid-day heat collapses outdoor walks 11am-4pm.',
  'April pushes Agonda into pre-monsoon heat. The 3km beach walk that defines the trip works only before 10am or after 5pm. Sea-bathing remains workable but humidity at 75 percent makes shade-time non-negotiable. Better windows return in late October.',
  'April in Agonda is when the South Goa coast tips toward summer. Daytime 25-35C, humidity 75 percent, sea at 28-29C — warm enough to take the cooling dip off the table. The 3km beach walk and the Cabo de Rama loop both compress to morning and evening windows. Shacks (Madhu, Fatima''s, Simrose) run shorter mid-day kitchens; the Forest Department turtle hatchery at the south checkpost stands down until October. Coconut Lagoon Treehouse drops walk-in rates 35 percent versus January; Agonda Garden Cottages walk-in available even at weekends. Air conditioning becomes the rate driver — the older homestays without AC are uncomfortable from 11am to 4pm. Power cuts run 2-4 hours afternoons; budget rooms without inverters go dark and hot. Pack a power bank, lock AC rooms, plan beach-and-fort time around the 5pm light.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 5, 2, 'wait',
  'Peak pre-monsoon. 26-37C, humidity 80 percent. Shacks dismantling end-month. First squalls late.',
  'Early May still functions for the rate-conscious traveller — shacks open till May 31 by Goa Forest Department rule, sea workable, hotel rates at year-low. Last 10 days bring the first SW-monsoon squalls and shacks start packing up.',
  'May is the year''s heat-and-humidity peak. Beach walks unworkable mid-day, sea at 30C takes the cooling-bath element away, and the last week brings the first SW-monsoon squalls that knock power 2-4 hours daily. Shacks dismantle by May 31. Skip to October if comfort matters.',
  'May in Agonda compresses the trip to its smallest viable shape. Daytime 27-37C, humidity 80 percent, sea at 30C. Goa Forest Department''s shack-licence cycle ends May 31 — by the third week, beach kitchens (Madhu, Simrose, Fatima''s, Tashi) start dismantling structures, packing furniture into the woodlots behind the dunes ahead of monsoon. The first southwest monsoon squalls arrive in the last 10 days, knocking grid power 2-4 hours afternoons and dropping 30-50mm in evening downpours. Hotel rates at year-low — Coconut Lagoon Treehouse walk-in at ₹4,000, Agonda Beach Homestay at ₹2,200. Sea-bathing runs only 6-8am or post-7pm. The trip narrows to AC room, pool (those that have one), beach walks at the day''s edges. Cabo de Rama Fort still walkable but 11am-5pm is gruelling. October cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 6, 1, 'skip',
  'SW monsoon onset. 25-31C, 600-800mm rain. Shacks shut, sea red-flag, beach access dangerous. Skip.',
  NULL,
  'June is the southwest monsoon hitting South Goa at full strength. Shacks dismantled by Forest Department rule, swim restrictions enforced (red-flag), beach access dangerous on rough-tide days. The trip you came for cannot happen.',
  'June in Agonda is when the South Goa coast closes for tourist purpose. The southwest monsoon arrives around June 10; rainfall jumps to 600-800mm across 18-22 wet days. Goa Forest Department licence cycle dismantles all 30+ shack structures along the 3km arc by May 31 — the beach is kitchen-free until October 1. Coast Guard red-flag swim restriction is enforced from June 1; rip currents on the Agonda-Cabo de Rama corner turn dangerous. Sea state hits 3-4m wave heights. Olive ridley nesting season is over. Most homestays and resorts (Coconut Lagoon Treehouse, Agonda Garden Cottages, Agonda Beach Homestay) close fully or run skeleton operations for staff-and-property maintenance. Elsewhere on Cabo de Rama remains open (the only year-round option) but rates reflect the monsoon-stay niche. The next viable window is October 1, when shacks reopen under the new licence cycle.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach off-limits, shacks shut, most stays closed. Skip.',
  NULL,
  'July is the wettest month of the year — 900-1100mm rainfall, the Arabian Sea in active monsoon, the entire South Goa beach economy on shutdown. Almost all Agonda stays close. The next viable window is October 1.',
  'July in Agonda is South Goa''s wettest month. Rainfall averages 900-1100mm across 25-27 wet days. The Arabian Sea sits at 27-28C but with 3-5m wave heights and rip-current advisories enforced by the Coast Guard at Canacona station. The beach is genuinely off-limits — Forest Department signage, no shacks, no lifeguards. Daytime 25-29C feels mild but the constant rain and 90 percent humidity make outdoor activity impossible to sustain. Almost all Agonda accommodations (Coconut Lagoon Treehouse, Agonda Beach Homestay, the homestay clusters along Agonda Beach Road) close fully — the few that remain (Elsewhere on Cabo de Rama, a handful of guesthouses on the inland side) sit at 50 percent below February rates but draw only Goan-domestic visitors and long-term backpackers. Cabo de Rama Fort gets dramatic monsoon light but the access road from Agonda is muddy. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 700-900mm rain. Beach closed, most stays shut. Skip.',
  NULL,
  'August holds July''s pattern — heavy rain, beach access closed, Forest Department shack-zone empty. Independence Day brings a Goan-domestic surge to Goa generally but Agonda specifically stays muted. Next clean window October 1.',
  'August in Agonda holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm across 22-25 wet days, daytime 24-29C, humidity at 90 percent. The southwest monsoon does begin to ease in the last week — second-half August is when domestic Goan visitors return for monsoon-green-Goa drives, but South Goa beaches stay coast-guard red-flag and Forest Department shack-zone empty. Independence Day weekend (August 15-17) brings a noticeable hotel-bump in North Goa (Calangute, Anjuna) — South Goa stays muted. Agonda accommodations sit closed or skeleton-staffed; Cabo de Rama Fort road washes out in pockets. Bonderam (Divar Island flag festival, 4th Saturday August) is a Goan day-trip draw but unrelated to Agonda. Wait for the October 1 shack-cycle reopening for the proper trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 9, 2, 'wait',
  'Monsoon retreating. 25-30C, 300-400mm rain. Shacks still closed (reopen Oct 1). Beach reopening late month.',
  'September is the recovery month with the gating constraint that Goa shacks (under Forest Department licence) only reopen October 1. Beach itself reopens to walking by mid-month, but shack kitchens, the alcohol-licensed circuit, and most homestays wait for October.',
  'September is on the way back but the South Goa shack-licence cycle holds shacks shut till October 1. Beach is walkable by mid-month but kitchen-free; most homestays and resorts (Coconut Lagoon Treehouse, Agonda Garden Cottages) reopen between September 25 and October 5. Push to October.',
  'September in Agonda is the recovery month with a Goa-specific catch. Rainfall drops to 300-400mm, mostly the first fortnight. Coast Guard swim-flag flips to amber by September 20-22. Daytime 25-30C, humidity easing toward 80 percent. The constraint: under Goa Forest Department''s 2010 shack-licence rules, beach shacks are licensed only for October 1 to May 31 — there is no shack-cycle reopening until October. Most Agonda accommodations stagger reopening between September 25 and October 5; Coconut Lagoon Treehouse and Agonda Garden Cottages take walk-ins from September 28 onward at 35-40 percent below January rates. The beach itself is walkable by mid-September but kitchen-free, lifeguard-thin, and quieter than at any point in the visiting year. Elsewhere on Cabo de Rama is the only operator running unbroken. October is dramatically cleaner with two weeks of patience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 10, 4, 'go',
  'Season opens. Shacks reopen Oct 1. 23-32C, 150-200mm rain. Olive ridley nesting begins.',
  'October is the proper season opener. Forest Department shack-licence cycle opens October 1 — 30+ shack kitchens reopen along the 3km arc, swim-flag turns green, olive ridley nesting begins. Hotel rates run 30-35 percent below December peak.',
  NULL,
  'October in Agonda is the season-opener that other Goan beaches don''t quite match — the no-water-sports rule means October opens cleaner here than at Palolem or Anjuna. Goa Forest Department shack-licence cycle starts October 1; 30+ kitchens (Madhu, Simrose, Tashi, Fatima''s) rebuild from off-season storage and run dinner service from October 5-8. Daytime 25-32C, rainfall 150-200mm — most in the first 10 days as the southwest monsoon retreats — humidity 75 percent and falling. Coast Guard swim-flag turns full green by October 12-15. Olive ridley nesting begins — the first nests of the season are usually logged at the south-end Forest checkpost between October 15-25. Coconut Lagoon Treehouse, Agonda Garden Cottages, Agonda Beach Homestay all take full-occupancy bookings from October 1 at 30-35 percent below December peak. Yoga retreats begin their winter cycle in the last 10 days. The smart traveller''s window is October 15 to November 30 — full season, pre-Christmas rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 11, 5, 'go',
  'Peak builds. 20-30C, rainfall under 30mm. Olive ridley nesting peak. Yoga retreats fill.',
  'November is when the South Goa quiet-beach circuit returns to peak form. Rainfall under 30mm, olive ridley nesting at month-of-month peak, yoga retreats hit their winter occupancy. Rates climb 20 percent across the month as Christmas-week travellers begin booking.',
  NULL,
  'November in Agonda is the year''s second-cleanest month behind January. Daytime 22-30C, nights drop to 20-21C, rainfall under 30mm and almost all in the first week. Olive ridley nesting peaks — Goa Forest Department''s seasonal census typically logs 30-50 percent of the year''s nests in November alone, with dawn beach patrols by Forest Department guards along the 3km arc. The 30+ shack-kitchens are at full operational tempo; the 7-day yoga retreats at H2O Agonda and Yoga Magic fill 4-6 weeks ahead. Hotel rates climb 20 percent across the month; Christmas-week (December 22 to January 2) bookings tighten the homestay belt by November 25. Cabo de Rama Fort at 12km north is at its best 5-5:30pm light. Agonda Beach Homestay walk-in available Tuesday-Thursday; weekend rates climb 30 percent. Strong call for first-time travellers and turtle-watch agendas.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('agonda', 12, 5, 'go',
  'Peak season. 18-29C, dry. Christmas-NY rates 50-70 percent above November. Book 3 weeks ahead.',
  'December is when Agonda runs its operational peak. Cool dry weather, full shack tempo, olive ridley active, yoga retreats at year-high occupancy. Christmas-NY week (Dec 22 to Jan 2) drives rates 50-70 percent above November and books out the homestay belt 21-30 days ahead.',
  NULL,
  'December in Agonda is operational peak. Daytime 22-29C, nights drop to 18-19C, sea at 25C, rainfall under 20mm. Olive ridley nesting is in full month-by-month peak — the Forest Department dawn patrols along the 3km arc are the quietest free spectacle on the South Goa coast. The 30+ shacks run their year-best dinner service (lobster catch is at peak, snapper and kingfish too). Christmas Eve and New Year''s Eve drive hotel rates 50-70 percent above November: Coconut Lagoon Treehouse climbs from ₹6,500 to ₹11,000, Agonda Garden Cottages from ₹5,000 to ₹8,500, Elsewhere holds firm at ₹15-18k for week-long stays only. The homestay belt books out 21-30 days ahead from December 18 onward. Yoga retreats are at year-high occupancy. The South Goa highway (NH66) sees its heaviest traffic of the year on December 23-26 and December 30-January 1; Margao to Agonda stretches from 45 minutes to 90.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
