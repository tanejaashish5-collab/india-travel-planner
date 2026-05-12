-- Karwar destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: karwar | best 10-3 | avoid 6-8 | type beach/navy/island/nature

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 1, 5, 'go',
  'Peak coastal window. 22-31C dry. Devbagh Island ferry running. Tagore Beach quiet versus Gokarna 60km south.',
  'January is when Karwar runs at its strongest. Daytime 22-31C, sea calm, Karwar Beach (Tagore Beach) at year-cleanest. Devbagh Island accessible by ferry, Sadashivgad Fort viewpoint clear. Naval Submarine Museum (INS Chapel) ₹40 entry, 9am-1pm and 2-5pm closed Monday.',
  NULL,
  'Karwar in January is the version coastal Karnataka regulars choose when Gokarna feels overrun. Daytime 22-31C, nights 22C, humidity 65 percent, the Arabian Sea calm enough for swimming at the long Karwar town beach — known locally as Tagore Beach since Rabindranath Tagore stayed at the British circuit house in 1882 at age 21, inspired to write his first play "Prakritir Pratishodh" (Nature''s Revenge) by the bay''s contemplative beauty. The 5km town beachfront stretches from the mouth of the Kali River north to the headland; coconut-palm-shaded promenade plus the Tagore monument near the Rabindranath Tagore Beach end. Devbagh Island (5km offshore — short ferry from Karwar Bay jetty, ₹200-400 return per person depending on operator) at full operations. INS Chapel and Naval Submarine Museum (the decommissioned INS Kursura on permanent display since 2003 — ₹40 entry, 9am-1pm/2-5pm closed Monday) at year-cleanest viewing. Sadashivgad Fort (1715, built by the Sonda king atop the Kali River-mouth headland — climb 20-30 minutes, free entry, Shiva and Kali temples at the summit) views clear.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 2, 5, 'go',
  'Driest month. 23-32C. Devbagh and Sadashivgad at year-cleanest. Hotel rates ease 15 percent versus January.',
  'February is the cleanest coastal Karwar window. Rainfall under 5mm. Devbagh Island ferry full operations, Sadashivgad Fort views year-best. Hotel rates 15 percent below January.',
  NULL,
  'Karwar in February is the technical peak of the Tagore-bay coastal year. Rainfall under 5mm, daytime 23-32C, nights 22C, humidity 62 percent. The 5km Karwar town beach (Tagore Beach) holds full bathable conditions at 27C water; the Kali River-mouth break separates the town beach from the spits at Binaga and Kodibag. Devbagh Island (5km offshore, ₹200-400 return ferry from Karwar Bay) at full operations — the JFC Eco Camp on the island, snorkelling around the rocky outcrops, dolphin-watch boats (₹500-1,000 per person, 90-minute trips from Karwar jetty) all running. Sadashivgad Fort (1715 Sonda king atop the Kali River-mouth headland — Shiva and Kali shrines at summit, 20-30 minute climb) views clear all 360 degrees: ocean, river, town, naval base perimeter. Naval Submarine Museum (INS Kursura on permanent display since 2003 — ₹40 entry, 9am-1pm/2-5pm closed Monday) at quieter weekday visitor load. Kurumgad Island (3km offshore, fishing-camp lighthouse visit possible) at low-tide. Hotel rates ease 15 percent versus January: Forest Eco Cottages Devbagh ₹3.5-6k, Hotel Saaj ₹2.2-3.5k, town hotels ₹1.5-2.5k. Konkan Railway runs full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 3, 4, 'go',
  'Last cool month. 24-33C, humidity 70 percent. Devbagh ferry running. Hotel rates 25 percent off February.',
  'March extends February''s pattern with the first humidity creep. Tagore Beach and Devbagh Island workable in dawn and dusk windows. Sadashivgad Fort climb best at 7am. Hotel rates 25 percent below February.',
  NULL,
  'Karwar in March is the soft-landing month before pre-monsoon humidity. Daytime 25-33C, nights 23C, humidity climbing to 70 percent in the last fortnight, rainfall under 20mm. The 5km Tagore Beach swim conditions still clean before April rip-current advisories set in. Sadashivgad Fort climb (20-30 minutes up, free entry, Shiva-Kali shrines at summit) best at 7am or 5pm; the steep stone staircase becomes hot mid-day. Devbagh Island (5km offshore, ₹200-400 return ferry from Karwar Bay) at full Sep-May operations. Snorkelling and dolphin-watch trips run on demand. Kurumgad Island accessible. Naval Submarine Museum (INS Kursura, ₹40 entry, 9am-1pm/2-5pm closed Monday) holds normal hours. Kali River backwater trips (Anjadiv Island viewpoint, restricted access — naval area, civilian boats keep distance) on demand from local fishermen jetty. The Konkan Railway Karwar station (the spectacular cliffside Karwar-Bhatkal segment with multiple short tunnels) at full operations. Karnataka''s coastal-Konkan transition zone — Goan-Konkani-Kannada cultural blend visible in fish-curry-rice eateries near the harbour.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 78 percent. Beach swim risky mid-day, Sadashivgad climb collapses.',
  'April still works for early-morning beach plus AC museum-and-cafe rotation. Naval Submarine Museum and Sadashivgad climb dawn-only. Hotel rates 30 percent below February.',
  'April pushes Karwar into pre-monsoon stress. Beach swim safer only at dawn, Sadashivgad climb collapses 11am-4pm, Devbagh ferry still runs but island heat past 32C. Wait for late October.',
  'April in Karwar is when the coastal town narrows to dawn and dusk. Daytime 28-34C, nights 25C, humidity 78 percent, sea temperature 30C — bathable but no longer cooling. The 5km Tagore Beach swim windows compress to 6-9am and 5-7pm only. Sadashivgad Fort climb (20-30 minutes up the headland staircase, Shiva-Kali shrines at summit) workable only at 6.30am or 5.30pm — the unshaded stone steps become brutal under noon sun. Devbagh Island (5km offshore, ₹200-400 return ferry from Karwar Bay) at last full Sep-May month — the JFC Eco Camp accommodation runs, but mid-day on the island reaches 33C with no AC. Naval Submarine Museum (INS Kursura, ₹40 entry, 9am-1pm/2-5pm closed Monday) is the prime AC retreat — the submarine interior holds at 28C. Konkan Railway Karwar station inbound traffic at year-low. Hotel rates 30 percent below February peak: Forest Eco Cottages Devbagh ₹2.5-4k, Hotel Saaj ₹1.8-2.8k, town hotels ₹1.2-2k. Local fish-curry-rice meals (Karwari masala, distinct from Mangalorean coastal cuisine — closer to Goan with Konkani roots) at year-cleanest weekday availability. Push to late October for the trip you came for.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 5, 2, 'wait',
  'Peak pre-monsoon. 28-34C humidity 82 percent. Sea swell builds, ferry suspends mid-month. Pre-monsoon thunderstorms.',
  'May functions for the museum-and-AC traveller only. Devbagh ferry suspends mid-month for the monsoon season. Hotel rates at year-low.',
  'May runs hot, sticky, and increasingly grid-unreliable on the Karwar coast. Pre-monsoon thunderstorms third and fourth weeks, sea swell forces ferry suspension. October-March window is dramatically better.',
  'May in Karwar is the closing pre-monsoon month before the southwest current arrives around June 1. Daytime 29-34C, nights 26C, humidity 82 percent, sea temperature 30C with growing swell. The Devbagh Island ferry season closes around mid-May — the JFC Eco Camp accommodation closes for the monsoon (next restart late September). Tagore Beach swimming becomes risky from the third week as pre-monsoon swell builds. Pre-monsoon thunderstorms hit the third and fourth weeks — afternoon squalls that knock grid power 1-2 hours and raise humidity to 90 percent. Sadashivgad Fort climb (20-30 minutes up the staircase, Shiva-Kali shrines at summit, free entry) workable only 6-9am. Naval Submarine Museum (INS Kursura on permanent display, ₹40 entry, 9am-1pm/2-5pm closed Monday) is the primary AC retreat option. The Konkan Railway Karwar segment runs in monsoon-preparation mode by the last week — late-month inbound delays of 30-60 minutes common. Hotel rates at year-low: Forest Eco Cottages (last open week before monsoon closure) ₹2-3.5k, Hotel Saaj ₹1.6-2.5k, town hotels ₹1-1.8k. Karwar Bay sees pre-monsoon cyclone-cell preparation activity from the Indian Navy. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 6, 1, 'skip',
  'SW monsoon onset. 24-29C, 900-1100mm rainfall. Sea forbidden, Devbagh ferry suspended. Skip.',
  NULL,
  'June is when the southwest monsoon hits Karwar with peak Konkan-coast force. Rainfall 900-1100mm, beach closed, ferry suspended. The coastal-bay trip Karwar is built for cannot happen until late October.',
  'June in Karwar is the southwest monsoon''s arrival point on the northern Konkan-Karnataka coast. The current hits within 24-48 hours of the IMD Thiruvananthapuram announcement. Rainfall jumps from May''s 60mm to 900-1100mm across 24-26 wet days — Karwar registers near the top of India''s wettest June stations alongside Mangalore and Honnavar. Daytime 25-29C feels mild but 92 percent humidity and sustained 6-12 hour downpours close down the bay-and-fort trip Karwar is built for. Tagore Beach under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards withdrawn for the season. Devbagh Island ferry suspended for the monsoon (next restart late September-early October). The Konkan Railway between Karwar and Goa runs at peak landslide-watch operating mode — buffer days mandatory on either side of travel. Sadashivgad Fort climb closed to walkers on rain days — the staircase becomes hazardously slippery. Naval Submarine Museum (INS Kursura, ₹40 entry, 9am-1pm/2-5pm closed Monday) holds full hours — the one reliable AC option. Hotel rates at year-low: town hotels ₹1-1.8k, Hotel Saaj ₹1.6-2.5k. Forest Eco Cottages Devbagh closed for season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 7, 1, 'skip',
  'Peak monsoon. 24-28C, 1000-1200mm rainfall. Sea forbidden, ferry suspended, fort closed. Skip outright.',
  NULL,
  'July is the wettest month on the Karwar coast. Rainfall 1000-1200mm across 26-28 wet days. Sea forbidden, Devbagh ferry suspended, Sadashivgad climb closed. Konkan Railway landslide-watch. Skip.',
  'July in Karwar is the year''s wettest stretch. Rainfall averages 1100mm across 26-28 wet days, often as 6-12 hour sustained deluges with cyclonic-cell wind. Daytime 25-28C, humidity 93 percent. Tagore Beach under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards withdrawn. Devbagh Island ferry suspended for the monsoon. Sadashivgad Fort climb closed to walkers on rain days. The Konkan Railway between Karwar and Goa runs at peak landslide-watch operating mode — multiple cancellation events through the month, the Karwar-Goa cliff segment particularly prone. Naval Submarine Museum (INS Kursura on permanent display since 2003, ₹40 entry, 9am-1pm/2-5pm closed Monday) holds normal hours — the one reliable indoor option. Forest Eco Cottages Devbagh closed for season. Hotel rates at year-low: town hotels ₹1-1.8k, Hotel Saaj ₹1.5-2.3k. Karwar Bay sees full naval base monsoon-operations cycle (Project Seabird Phase II construction continues — Indian Navy''s 3rd-largest base buildout). The fishing fleet remains mostly in harbour through July under the Karnataka government''s annual June 1-July 31 mechanised-fishing ban. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rainfall. Sea forbidden, ferry suspended. Skip.',
  NULL,
  'August holds July''s pattern with marginally easing rainfall. Sea forbidden, Devbagh ferry still suspended. Mechanised fishing ban lifts July 31 — local fish-curry-rice eateries get fresh catch from August. Standard trip skip.',
  'August in Karwar holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 600-800mm across 23-25 wet days at the coastal elevation. Daytime 25-29C feels mild but constant rain and 91 percent humidity strip outdoor activity. Tagore Beach remains under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards off-duty. Devbagh Island ferry still suspended (next restart late September-early October). One notable shift: the Karnataka government''s annual June 1-July 31 mechanised-fishing ban lifts on July 31, so from August 1 the local Karwari fishing fleet returns to deeper-water operations and the harbour-front fish-curry-rice eateries get the year''s freshest catch — pomfret, mackerel, kingfish, prawns. Sadashivgad Fort climb closed on rain days but workable on rare clear afternoons. Naval Submarine Museum (INS Kursura, ₹40 entry, 9am-1pm/2-5pm closed Monday) holds normal hours. Hotel rates remain year-low: town hotels ₹1.2-2k, Hotel Saaj ₹1.6-2.5k. Forest Eco Cottages Devbagh closed for season. Konkan Railway still landslide-watch but cancellation events ease in the second half. The next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 9, 2, 'wait',
  'Monsoon retreat. 24-30C, 300-400mm rain. Beach reopening late month. Ferry restarts late September.',
  'September is the recovery month. SW monsoon retreats around Sep 25, beach reopens, Devbagh ferry restarts. Late September workable but October 15 onward dramatically cleaner.',
  'September is on the way back but first fortnight remains wet, sea bathing still under advisory through three weeks, Devbagh ferry not yet restarted. Push to mid-October — same coastal aesthetic at materially cleaner sea conditions.',
  'September in Karwar is the trickle back from monsoon. Rainfall drops to 300-400mm across 16-18 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing to 82 percent in the second half. The southwest monsoon retreats from the Konkan-Karnataka coast around September 25-30 (IMD declares formal withdrawal). Tagore Beach swimming remains under Karnataka Tourism advisory through the first three weeks — coast guard typically lifts the red flag by the last week. Devbagh Island ferry (₹200-400 return) restarts late September weather permitting; the JFC Eco Camp accommodation reopens for the Sep-May season. Sadashivgad Fort climb returns to walkable conditions from mid-month. Naval Submarine Museum (INS Kursura, ₹40 entry, 9am-1pm/2-5pm closed Monday) at full hours. Konkan Railway returns to normal schedules — the Karwar-Goa cliffside stretch landslide-watch easing. Karwar harbour at full post-monsoon fishing fleet activity — fresh pomfret, mackerel, kingfish at the harbour-front eateries. Hotel rates climb 15-20 percent versus August lows: town hotels ₹1.4-2.4k, Hotel Saaj ₹1.8-2.8k, Forest Eco Cottages Devbagh (last week reopening) ₹2.5-4k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 10, 4, 'go',
  'Season opens. 24-31C, 200-250mm spillover. Devbagh ferry running, beach reopens. Karnataka Rajyotsava prep.',
  'October is the season opener. Late-monsoon residue first 10 days, then full coastal trip. Devbagh ferry at full operations, Sadashivgad walkable, Naval Submarine Museum normal hours. Hotel rates 25 percent below January.',
  NULL,
  'October in Karwar is the proper return to coherent. Rainfall drops to 200-250mm with the bulk falling in the first ten days; from October 15 onward Karwar flips into clean beach-fort-ferry mode. Daytime 25-31C, humidity falling from 85 to 75 percent. The 5km Tagore Beach reopens to swimming as coast guard lifts the monsoon red-flag — water temperature 28C, sea swell easing through the month. Devbagh Island ferry (5km offshore, ₹200-400 return from Karwar Bay jetty, 30-min crossing) at full Sep-May operations; the JFC Eco Camp accommodation reopens. Sadashivgad Fort climb (1715 Sonda king, 20-30 minutes up the headland staircase, free entry, Shiva-Kali shrines at summit) workable all day from mid-month. Naval Submarine Museum (INS Kursura decommissioned submarine on permanent display since 2003, ₹40 entry, 9am-1pm/2-5pm closed Monday) at full hours. Karwar harbour fishing fleet at full post-monsoon activity — fresh-catch fish-curry-rice eateries at year-cleanest weekday availability. Karnataka Rajyotsava preparation begins for November 1. Konkan Railway returns to clean schedules.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 11, 5, 'go',
  'Peak builds. 23-31C, rainfall under 60mm. Karnataka Rajyotsava Nov 1. Hotel rates climb 20 percent.',
  'November is the proper pivot to peak. Rainfall under 60mm, full beach-fort-ferry weather. Karnataka Rajyotsava Nov 1. Hotel rates climb 20 percent across the month as Christmas-week starts booking.',
  NULL,
  'November in Karwar is the year''s second-peak month behind January. Rainfall drops under 60mm, daytime 24-31C, sea breeze cooling evenings to 22-23C, humidity dropping below 70 percent. The 5km Tagore Beach at full bathable conditions (water 27C, sea-state green flag). Devbagh Island ferry (₹200-400 return) at full Sep-May operations. The JFC Eco Camp accommodation on Devbagh runs at recovering high-occupancy. Sadashivgad Fort climb (1715 Sonda king atop the Kali River-mouth headland, free entry, 20-30 minute staircase to Shiva-Kali shrines at summit) at year-clearest viewing — the 360-degree bay-river-naval-base panorama at cleanest visibility. Naval Submarine Museum (INS Kursura, ₹40 entry, 9am-1pm/2-5pm closed Monday) at full hours. Karnataka Rajyotsava (November 1, 1956 state formation under the States Reorganisation Act) sees cultural programmes — Tagore Beach hosts a literary reading commemorating Tagore''s 1882 stay. Konkan Railway Karwar station inbound traffic builds toward Christmas-week peak. Hotel rates climb 20 percent across the month: Forest Eco Cottages Devbagh ₹3.5-6k, Hotel Saaj ₹2.3-3.5k, town hotels ₹1.6-2.7k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('karwar', 12, 5, 'go',
  'Peak season. 22-31C dry. Christmas-NYE rates 1.8x. Lock Devbagh ferry day-passes ahead of weekends.',
  'December is when Karwar runs at full capacity. Christmas-NYE rates 1.8x normal (lower spike than Gokarna or Goa). Devbagh and Sadashivgad at full tempo. Lock Devbagh ferry day-passes ahead of weekends.',
  NULL,
  'December in Karwar is the operational peak — quieter than Gokarna 60km south or Goa another 100km north, which is the point of choosing Karwar in the first place. Daytime 23-31C, nights 22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.8x the November baseline — softer than the coastal Karnataka south-of-Mangalore or Goa: Forest Eco Cottages Devbagh ₹5-8k, Hotel Saaj ₹3-4.5k, town hotels ₹2-3.5k. The 5km Tagore Beach at peak swim weather — water 27C, no sea-state advisories. Devbagh Island ferry (₹200-400 return, 30-min crossing) book a day ahead through weekends. Sadashivgad Fort climb (1715 Sonda king, free entry, 20-30 minute staircase up the Kali River-mouth headland) views at year-clearest. Naval Submarine Museum (INS Kursura decommissioned submarine on permanent display since 2003, ₹40 entry, 9am-1pm/2-5pm closed Monday) gets high weekend traffic — go on a weekday morning. Karwar harbour fishing fleet at peak activity — fresh pomfret, mackerel, kingfish, prawn-curry-rice meals at the harbour-front Karwari eateries. The Konkan Railway Karwar station handles year-peak inbound traffic from Goa and Mumbai.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
