-- Gokarna destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: gokarna | best 10-3 | avoid 6-8 | type beach/temple/trekking/backpacker

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 1, 5, 'go',
  'Peak window. 22-31C dry. All five beaches clear. Cliff-trail walks at year-best, Mahabaleshwar Temple full schedule.',
  'January is when Gokarna runs at its strongest. Daytime 22-31C, sea calm, the 5-beach cliff trail (Gokarna Beach to Kudle to Om to Half-Moon to Paradise) walkable as a single 4-5 hour chain. Mahabaleshwar Atmalinga Temple full schedule. Christmas-NYE rates ease January 5.',
  NULL,
  'Gokarna in January is the version backpacker-circuit regulars return to year after year. Daytime 22-31C, nights 21C, humidity 65 percent, the Arabian Sea calm enough for swimming at all five beaches. The defining geography: five connected coves running 5km south of the temple town along laterite-cliff trails. Gokarna Beach (town pilgrim beach, where cremation ashes are immersed and Hindus perform pind-daan), Kudle Beach (the broad swim-stay-and-yoga-shala bay, 30-min uphill from town then steep descent), Om Beach (the Om-shaped twin coves, the year-iconic shot, accessible by road or cliff-trail), Half-Moon Beach and Paradise Beach (cliff-walk-only, 2-3 hours from Om, no road access — shack-only accommodation, drop in mobile signal). The Mahabaleshwar Atmalinga Temple (one of the seven Mukti Sthalas, per Skanda Purana the site where Ravana set down the Atmalinga that Ganesha tricked into rooting) runs full schedule — 6am-12.30pm and 5-8.30pm, men remove upper garments to enter inner sanctum (dhoti rental ₹50 at outer mandapam). Kotitirtha tank pilgrimage bathing. Mirjan Fort (40km north, 16-17 c Chennabhairadevi pepper-queen capital — ASI-protected, free entry, 9am-5pm).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 2, 5, 'go',
  'Driest month. 23-32C. All five beaches at peak. Hotel rates ease 15 percent versus January.',
  'February is the cleanest coastal Karnataka window. Rainfall under 5mm. Cliff-trail walks at year-best, all five beaches at peak. International backpacker rotation in residency.',
  NULL,
  'Gokarna in February is the technical peak of the cliff-and-temple-town year. Rainfall under 5mm, daytime 23-32C, nights 22C, humidity 60 percent — the lowest of the year. The 5-beach cliff trail (Gokarna Beach to Kudle to Om to Half-Moon to Paradise) walkable as a single 4-5 hour chain at year-cleanest — laterite paths firm, no slip-risk. Kudle and Om are the year-busiest international-backpacker bays; Half-Moon and Paradise remain shack-only with limited solar grid power. Mahabaleshwar Atmalinga Temple — one of the seven Mukti Sthalas per Skanda Purana (the site where Ravana set down the Atmalinga that Ganesha tricked into rooting) — at full schedule (6am-12.30pm/5-8.30pm). The Maha Shivaratri festival (variable date late February or early March, 2026 falls February 15) is the temple''s annual peak — 50,000-plus pilgrims through Gokarna town in 36 hours, all-night chanting, Atmalinga special darshan. Kotitirtha tank ritual bathing at peak. Mirjan Fort (40km north, 16-17 c Chennabhairadevi capital — ASI-protected, free entry, 9am-5pm) at year-cleanest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 3, 4, 'go',
  'Last cool month. 24-33C, humidity 70 percent. Cliff trails workable dawn-and-dusk. Rates 25 percent off February.',
  'March extends February''s pattern with the first humidity creep. Cliff-trail walks workable in dawn-and-dusk windows. Maha Shivaratri overflow first week. Hotel rates 25 percent below February.',
  NULL,
  'Gokarna in March is the soft-landing month before pre-monsoon humidity. Daytime 25-33C, nights 23C, humidity climbing to 70 percent in the last fortnight, rainfall under 20mm. The 5-beach cliff trail compresses to 6-10am and 4-7pm walks; the unshaded laterite paths from Kudle to Om and Om to Half-Moon become brutal mid-day. Maha Shivaratri spillover (if the lunar festival fell late February or early March 2026) keeps the temple town crowded the first week. Mahabaleshwar Atmalinga Temple at full pilgrim schedule. All five beaches still bathable — water 28C, sea calm. The international backpacker rotation thins from mid-March as residency cycles end before April heat. Kudle and Om shack accommodation drops to 60 percent occupancy. Yoga retreats at Kudle, Om, Namaste Cafe close their February-March residencies; new ones begin only in October. Mirjan Fort (40km north, 16-17 c Chennabhairadevi capital — ASI-protected, free entry, 9am-5pm) at year-cleanest weekday visitor load. Hotel rates 25 percent below February: Om Beach Resort ₹4-6k, SwaSwara CGH Earth ₹10-15k, Kudle Beach huts ₹350-1100, Zostel ₹500-1000. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 78 percent. Cliff trails close mid-day. Hotel rates 30 percent off February.',
  'April still works for the dawn-and-dusk traveller. Mahabaleshwar Atmalinga Temple AC inner sanctum holds. Hotel rates 30 percent below February.',
  'April pushes Gokarna into pre-monsoon stress. Cliff-trail walks past 9am unworkable, Kudle-Om-Half-Moon-Paradise chain collapses mid-day, beach sand burns. Wait for late October.',
  'April in Gokarna is when the beach-temple-town narrows to early-morning and late-evening windows. Daytime 28-34C, nights 25C, humidity 78 percent, sea temperature 30C — bathable but no longer cooling. The 5-beach cliff trail (Gokarna to Kudle to Om to Half-Moon to Paradise) compresses to 6-9am and 5-7pm only. The laterite paths and unshaded clifftops become brutal mid-day; the trail is the trip, and the trip closes. Mahabaleshwar Atmalinga Temple (one of the seven Mukti Sthalas, Ravana legend) holds full schedule but pilgrim queues collapse 11am-3pm. The 6am Nirmalya darshan and 7pm Mahapooja are the workable windows. Kotitirtha tank ritual bathing at year-low pilgrim flow. Half-Moon and Paradise shack-only accommodations close one by one through the month as the international backpacker rotation ships out — by April 20 most cliff-only shacks have wound down for the season. The road-accessible Kudle and Om beaches continue. Hotel rates 30 percent below February peak: Om Beach Resort ₹3-5k, SwaSwara CGH Earth ₹8-12k, Kudle Beach huts ₹300-900, Zostel ₹400-800. Vishu (April 14, Kerala spillover) brings a 2-3 day domestic bump. Push to late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 5, 2, 'wait',
  'Peak pre-monsoon. 28-34C humidity 82 percent. Cliff-only beaches close, sea swell builds. Pre-monsoon thunderstorms.',
  'May functions only for the temple-pilgrim trip. Half-Moon and Paradise shack accommodations closed for season. Hotel rates at year-low.',
  'May runs hot, sticky, and the cliff-trail-and-beach trip closes. Pre-monsoon thunderstorms third and fourth weeks, sea swell forces lifeguard withdrawal, Half-Moon and Paradise shacks shut. October-March window is dramatically better.',
  'May in Gokarna is the closing pre-monsoon month before the southwest current arrives around June 1. Daytime 29-34C, nights 26C, humidity 82 percent, sea temperature 30C with growing swell. By May 1 the cliff-only Half-Moon and Paradise beach shack-accommodations have closed for the monsoon season (next reopen October). Kudle and Om beach swim conditions become risky from the third week as pre-monsoon swell builds — Karnataka Tourism advisory warns of strong rip currents. Pre-monsoon thunderstorms hit the third and fourth weeks — afternoon squalls that knock grid power 1-2 hours and raise humidity to 90 percent. The cliff-trail (Gokarna to Kudle to Om — Half-Moon and Paradise inaccessible) workable only 6-9am. Mahabaleshwar Atmalinga Temple holds full schedule but pilgrim flow at year-low. Mahabaleshwar Festival (specific to the temple, separate from Maha Shivaratri — verify date with temple management). Hotel rates at year-low: Om Beach Resort ₹2.5-4k, SwaSwara CGH Earth ₹6-9k, Kudle Beach huts ₹250-700, Zostel ₹350-700. The Karwar-Gokarna 60km NH-66 drive at moderate traffic. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 6, 1, 'skip',
  'SW monsoon onset. 24-29C, 900-1100mm rainfall. Beaches closed, shacks shut, cliff trails dangerous. Skip.',
  NULL,
  'June is when the southwest monsoon hits Gokarna with peak Konkan-coast force. Rainfall 900-1100mm, beaches closed, cliff-trail dangerous on wet laterite, Half-Moon and Paradise shacks closed for season. Skip.',
  'June in Gokarna is the southwest monsoon''s arrival point. The current hits the northern Karnataka coast within 24-48 hours of the IMD Thiruvananthapuram announcement. Rainfall jumps to 900-1100mm across 24-26 wet days; Gokarna registers among India''s wettest June stations alongside Karwar and Mangalore. Daytime 25-29C feels mild but 92 percent humidity and sustained 6-12 hour downpours close down the beach-cliff-trail trip Gokarna is built for. All five beaches under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards withdrawn. The cliff-trail between Kudle, Om, Half-Moon, and Paradise becomes dangerously slippery — local administration advises against cliff-trail attempts through monsoon, deaths from falls reported in past June-July cycles. Half-Moon and Paradise shack-accommodations remain closed for the season. Mahabaleshwar Atmalinga Temple (one of the seven Mukti Sthalas, Ravana legend) continues full darshan operations but pilgrim flow at year-low. Kotitirtha tank pilgrim bathing continues. Mirjan Fort (40km north) closed on rain days. Hotel rates at year-low: Om Beach Resort ₹2-3.5k, town hotels ₹600-1500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 7, 1, 'skip',
  'Peak monsoon. 24-28C, 1000-1200mm rainfall. Beaches closed, cliff-trail dangerous. Skip outright.',
  NULL,
  'July is the wettest month on the Gokarna coast. Rainfall 1000-1200mm across 26-28 wet days. Beaches closed, cliff-trail dangerous on wet laterite. Skip.',
  'July in Gokarna is the year''s wettest stretch. Rainfall averages 1100mm across 26-28 wet days, often as 6-12 hour sustained deluges with cyclonic-cell wind. Daytime 25-28C, humidity 93 percent. All five beaches under Karnataka Tourism red-flag advisory — Gokarna Beach, Kudle, Om, Half-Moon, Paradise — sea bathing prohibited, lifeguards withdrawn for the season. The cliff-trail between coves becomes dangerously slippery on wet laterite; local administration warns against attempts. Half-Moon and Paradise shack-accommodations closed for season. Mahabaleshwar Atmalinga Temple (1300-year-old temple per oral tradition though core sanctum dated later, Atmalinga legend per Skanda Purana — one of seven Mukti Sthalas) continues full daily operations — 6am-12.30pm and 5-8.30pm darshan windows. Kotitirtha tank pilgrim bathing continues. The temple-town circuit (Mahabaleshwar to Maha Ganapati to Bhadrakali to Kotitirtha) is the only viable shape in monsoon. Mirjan Fort (40km north, 16-17 c Chennabhairadevi capital — ASI-protected, free entry, 9am-5pm) closed on rain days. Hotel rates at year-low: Om Beach Resort ₹2-3k, SwaSwara CGH Earth ₹5-7k, town hotels ₹500-1200. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rainfall. Beaches closed, cliff-trail dangerous. Skip.',
  NULL,
  'August holds July''s pattern with marginally easing rainfall. Beaches under advisory, cliff trail dangerous. Mahabaleshwar Temple Karthika cluster builds toward November. Standard trip skip.',
  'August in Gokarna holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 600-800mm across 23-25 wet days. Daytime 25-29C feels mild but constant rain and 91 percent humidity strip outdoor activity. All five beaches (Gokarna, Kudle, Om, Half-Moon, Paradise) remain under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards off-duty. Cliff-trail between coves dangerously slippery; local administration continues to warn against attempts. Half-Moon and Paradise shack-accommodations closed for season. Mahabaleshwar Atmalinga Temple (one of seven Mukti Sthalas per Skanda Purana, Ravana''s Atmalinga legend) continues full daily operations — 6am-12.30pm and 5-8.30pm darshan, men remove upper garments to enter sanctum (dhoti rental ₹50 at outer mandapam). Kotitirtha tank ritual bathing continues. The Mahabaleshwar to Maha Ganapati to Bhadrakali temple-walk inside the town remains the only viable shape. Mirjan Fort (40km north) closed on rain days. Hotel rates remain year-low: Om Beach Resort ₹2-3.5k, SwaSwara CGH Earth ₹6-8k, town hotels ₹600-1400. The next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 9, 2, 'wait',
  'Monsoon retreat. 24-30C, 300-400mm rain. Beach reopening late month. Cliff trail still risky first 3 weeks.',
  'September is the recovery month. SW monsoon retreats around Sep 25, beaches reopen late month, cliff trail safe from October. Late September workable but October 15 onward dramatically cleaner.',
  'September is on the way back but first fortnight remains wet, beach swim still under advisory, cliff trail still slippery first three weeks. Push to mid-October.',
  'September in Gokarna is the trickle back from monsoon. Rainfall drops to 300-400mm across 16-18 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing to 82 percent in the second half. The southwest monsoon retreats from the Konkan-Karnataka coast around September 25-30 (IMD declares formal withdrawal). All five beaches remain under Karnataka Tourism advisory through the first three weeks — coast guard typically lifts the red flag by the last week. Cliff-trail between Kudle, Om, Half-Moon, and Paradise remains slippery on residual-rain days; the trail-safety advisory eases from late month. Half-Moon and Paradise shack-accommodations begin reopening from the last week — but the proper restart is October. Mahabaleshwar Atmalinga Temple at full daily operations — pilgrim flow recovering. Kotitirtha tank ritual bathing returns to normal traffic. Mirjan Fort (40km north, 16-17 c Chennabhairadevi capital, ASI-protected, free entry, 9am-5pm) returns to walkable conditions. Hotel rates climb 15-20 percent versus August lows: Om Beach Resort ₹2.5-4k, SwaSwara CGH Earth ₹7-10k, Kudle Beach huts (early reopens) ₹300-800, town hotels ₹700-1700.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 10, 4, 'go',
  'Season opens. 24-31C, 200-250mm spillover. Cliff trail safe from mid-month. Backpacker rotation returning.',
  'October is the season opener for Gokarna. Late-monsoon residue first 10 days, then full cliff-trail-and-beach mode. Half-Moon and Paradise shacks reopen mid-month. Hotel rates 25 percent below January.',
  NULL,
  'October in Gokarna is the proper return to coherent. Rainfall drops to 200-250mm with the bulk falling in the first ten days; from October 15 onward Gokarna flips into clean cliff-trail-and-beach mode. Daytime 25-31C, humidity falling from 85 to 75 percent. All five beaches (Gokarna town beach, Kudle, Om, Half-Moon, Paradise) reopen to swimming as coast guard lifts the monsoon red-flag — water temperature 28C, sea swell easing. The cliff-trail between coves returns to safe walkable laterite from mid-month. Half-Moon and Paradise shack-accommodations reopen — Namaste Cafe, Sai Cafe, Little Paradise, Sunset Cafe restart their solar-grid shack operations after 5-month monsoon closure. The international backpacker rotation begins returning — Kudle yoga retreats start their October-March residencies. Mahabaleshwar Atmalinga Temple (one of seven Mukti Sthalas, Ravana''s Atmalinga legend per Skanda Purana) at recovering full pilgrim flow. Kotitirtha tank ritual bathing returns to normal. Mirjan Fort (40km north, 16-17 c Chennabhairadevi capital — ASI-protected, free entry, 9am-5pm) at full operations. Karnataka Rajyotsava preparation begins for November 1.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 11, 5, 'go',
  'Peak builds. 23-31C, rainfall under 60mm. Karnataka Rajyotsava Nov 1. Hotel rates climb 20 percent.',
  'November is the proper pivot to peak. Rainfall under 60mm, full cliff-trail-and-beach weather, all five beaches at peak. Karnataka Rajyotsava Nov 1. Hotel rates climb 20 percent as Christmas-week starts booking.',
  NULL,
  'November in Gokarna is the year''s second-peak month behind January. Rainfall drops under 60mm, daytime 24-31C, sea breeze cooling evenings to 22-23C, humidity dropping below 70 percent. All five beaches at full bathable conditions — water 27C, sea-state green flag. The 5-beach cliff trail (Gokarna town beach to Kudle to Om to Half-Moon to Paradise) walkable as a clean 4-5 hour chain. Half-Moon and Paradise shack-accommodations at full Sep-May operations — Namaste Cafe, Sai Cafe, Little Paradise, Sunset Cafe all running. The international backpacker rotation in residency; Kudle yoga retreats at peak October-March cycle. Mahabaleshwar Atmalinga Temple (one of seven Mukti Sthalas per Skanda Purana, Ravana''s Atmalinga set down here per legend) at recovering pilgrim flow. Karthika month (Hindu lunar month, falls Oct-Nov) Karthika Deepotsava brings nightly lamp-lighting at the temple. Karnataka Rajyotsava (November 1, 1956 state formation under States Reorganisation Act) sees cultural programmes. Mirjan Fort at year-cleanest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('gokarna', 12, 5, 'go',
  'Peak season. 22-31C dry. Christmas-NYE rates 2-2.5x. Half-Moon and Paradise shacks book 6 weeks ahead.',
  'December is when Gokarna runs at full capacity. Christmas-NYE rates 2-2.5x normal. Half-Moon and Paradise cliff-only shacks at 100 percent occupancy through New Year. Lock beds 6-8 weeks ahead.',
  NULL,
  'December in Gokarna is the operational peak and the most expensive stretch of the cliff-and-temple-town year. Daytime 23-31C, nights 21C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-2.5x the November baseline: Om Beach Resort ₹7-10k, SwaSwara CGH Earth ₹18-25k (the CGH Earth Ayurveda property), Kudle Beach huts ₹800-2000, Half-Moon and Paradise cliff-only shacks ₹1000-2500 and at 100 percent occupancy through the corridor. The international backpacker rotation in full residency; Israeli-German-Russian seasonal travellers in the cliff-shack network. The 5-beach cliff trail (Gokarna town beach, Kudle, Om, Half-Moon, Paradise) at full walkable operations — book Paradise shacks 6 weeks ahead. Mahabaleshwar Atmalinga Temple (one of seven Mukti Sthalas, Ravana legend per Skanda Purana) at peak December pilgrim flow ahead of Maha Shivaratri (February 2026). Kotitirtha tank ritual bathing at year-busiest. Sunset on Om Beach (the Om-shaped twin coves, the year-iconic photograph) becomes a 200-300 person daily event.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
