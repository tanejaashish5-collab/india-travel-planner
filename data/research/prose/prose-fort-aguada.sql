-- Fort Aguada destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa heritage batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: fort-aguada
-- best_months 10-3, avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 1, 5, 'go',
  'Peak window. 19-30C, dry. Fort runs 9:30-17:30. Lighthouse climb. Sinquerim water sports at full operation.',
  'January is when Fort Aguada walks at its best. The 1612 Portuguese fortification opens 9:30am-5:30pm via Goa Tourism, ₹50 entry, the 1864 lighthouse climb available with ranger access. Sinquerim Beach water-sports operators run full schedule.',
  NULL,
  'Fort Aguada in January is the version Konkan-coast regulars wait the year for. Daytime sits at 22-30C, nights drop to 19-20C, humidity finally below 70 percent. The fort opens 9:30am-5:30pm via Goa Tourism (₹50 entry) — laterite walls, 79 cannons originally (now 5 mounted reproductions), the Holy Stream cistern that gave the fort its name (Aguada = watering point for Portuguese ships). The 1864 lighthouse, one of the oldest in Asia, climbs to a 23m vantage with rangers admitting small groups for short windows during fort hours. Taj Fort Aguada Resort occupies the heritage block on the seaward side — guests get private rampart access; non-guests see the public sections only. Sinquerim Beach below the fort runs water-sports at full schedule (parasailing ₹1,500, jet-ski ₹500-700 for 10 minutes, banana-boat ₹400). Drive from Panaji: 18km via NH-66, 35-40 minutes off-peak. ATMs at Sinquerim (Bank of India, Bank of Baroda) work; Calangute is 4km north for cash.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 2, 5, 'go',
  'Driest stretch. 20-31C. Lighthouse climbs at year-best visibility. Carnival traffic spillover from Panaji.',
  'February delivers Konkan-coast clean: rainfall under 5mm, low humidity, 22-31C. The lighthouse climb sees year-best visibility (40-60km on clear days). Sinquerim Beach water sports at peak quality. Carnival weekend (variable date) brings spillover traffic from Panaji.',
  NULL,
  'February in Fort Aguada is technically the cleanest of the cool months. Rainfall averages under 5mm, humidity at 60 percent, daytime 22-31C. The 1864 lighthouse climb catches the year''s best visibility — clear days reach 40-60km of Arabian Sea horizon. The fort''s laterite ramparts and the Holy Stream cistern walk run 90 minutes at deliberate pace; the public-access section of the fort connects directly to Taj Fort Aguada Resort''s heritage block on the seaward side. Sinquerim Beach water-sports run at peak quality — clean waves, calm afternoons, full operator capacity. Carnival weekend (variable date, three days before Ash Wednesday) brings Panaji float-parade spillover traffic on NH-66 from Saturday afternoon to Tuesday morning. The Taj Fort Aguada Resort holds its peak January rates through to mid-February; non-Taj options nearby are limited (this dest_id is intentionally thin in the database — Sinquerim/Candolim 4km north is the alternative base). Wednesday-Friday is the cleanest mid-month visit window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 3, 4, 'go',
  'Last cool window. 22-32C. Fort and lighthouse fully open. Sinquerim crowd thins versus February.',
  'March extends February''s heritage walking with mild humidity tax. The fort runs full hours, lighthouse climb stays accessible, Sinquerim water-sports operators discount 15-20 percent. Last comfortable month before pre-monsoon heat.',
  NULL,
  'March in Fort Aguada is the soft-landing month. Daytime 24-32C, humidity climbing toward 70 percent in the last fortnight, evenings still in the 22-24C band. The fort opens 9:30am-5:30pm at ₹50 entry; lighthouse access continues with ranger discretion. The laterite rampart walk holds up till 11am and from 4pm; the 1km loop including the Holy Stream cistern is shaded for 60 percent of its length. Sinquerim Beach water-sports operators discount 15-20 percent versus February peak — parasailing drops to ₹1,200, jet-ski to ₹400 for 10 minutes. Visitor numbers in the public fort section drop 30 percent versus February. Taj Fort Aguada Resort rates ease 15 percent versus peak. The lighthouse climb visibility window narrows slightly (30-40km horizon on average) as humidity builds. Last comfortable month for the fort-and-lighthouse pairing before April pushes the trip into time-shift mode. Drive from Panaji 18km holds at 35-40 minutes; Calangute 4km north sees Holi-week traffic surge mid-month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 4, 3, 'wait',
  'Pre-monsoon heat. 25-34C, humidity 75 percent. Rampart walks hot stone. Sinquerim sea at 28C.',
  'April still works for the early-morning fort visit. The 9:30am opening is the cleanest window; ramparts get unwalkable past 11am. Sinquerim Beach water-sports continue but mid-day heat collapses the sand walks. Hotel rates at Taj Fort Aguada drop 30 percent.',
  'April delivers the first wave of Konkan summer. The laterite rampart walks collapse past 11am — open stone radiates heat past 5pm — and the 1864 lighthouse climb becomes a sunrise-only proposition. Sinquerim Beach water-sports continue but sand walks collapse mid-day.',
  'April in Fort Aguada is when the trip narrows to its early morning. Daytime 26-34C, humidity 75-80 percent, the laterite ramparts and open courtyard radiate heat from 11am to 4pm. The fort opens 9:30am-5:30pm but the practical visit window is 9:30am to 11am, then a long AC retreat, then 5pm to closing. The 1864 lighthouse climb requires the cool of opening hour — past 11am the iron stairs and roof platform are unworkable. Sinquerim Beach water-sports continue at near-full schedule (sea temperature 28C, gentle morning surf, parasailing/jet-ski/banana-boat operations until 5pm), but the sand-walk approach to the fort collapses. Taj Fort Aguada Resort drops walk-in rates 30 percent versus February peak — the 4-acre property includes pools and AC restaurants for the mid-day retreat. The water sports are arguably better in April than peak season because the morning Sinquerim crowd is 40 percent thinner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 5, 2, 'wait',
  'Peak heat. 27-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Beach shacks close end of month.',
  'May runs hot and sticky on the Konkan coast. Fort visit shape compresses to a single 9:30-10:30am window. Sinquerim Beach shacks close per Forest Department rule end May. Hotel rates at year-low; visit only worth the early-bird traveler.',
  'May is the hottest month at the Konkan coast. The fort''s laterite ramparts and open courtyard collapse 10am-5pm. Pre-monsoon thunderstorms knock grid power 1-3 hours each afternoon. Sinquerim Beach shacks close per Forest Department rule end May. Push to October.',
  'May in Fort Aguada is when the heritage trip compresses to its smallest viable shape. Daytime 28-36C, humidity 80 percent, sea at 30C, pre-monsoon thunderstorms hit 2-3 afternoons a week from May 20 onwards. The fort opens 9:30am-5:30pm but the practical visit window is 9:30-10:30am only. The 1864 lighthouse climb needs to happen in the first hour. Sinquerim Beach water-sports operators thin to skeleton crew through the month, and beach shacks close per Forest Department rule on May 31 — the dismantled-and-rebuilt-for-monsoon cycle that defines coastal Goa''s shack economy. Taj Fort Aguada Resort drops walk-in rates 40 percent versus February peak; the property pools and AC restaurants become the mid-day refuge. The 18km drive from Panaji holds at 35-40 minutes off peak. Worth the visit only if Sinquerim water-sports and AC-resort time are the actual draw, not the heritage walk.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 6, 1, 'skip',
  'SW monsoon arrives ~Jun 10. 24-30C, 700-900mm rain. Beach closed, ramparts slippery, lighthouse closed in storms. Skip.',
  NULL,
  'June is when the Konkan monsoon arrives in force. Sinquerim Beach is dangerous (rip currents, no lifeguard cover June-September), beach shacks dismantled, the laterite ramparts run slippery, and the lighthouse closes during storms. Skip.',
  'June in Fort Aguada is when the southwest monsoon arrives — typically June 10 — and the fort-and-beach shape of the visit collapses entirely. Daytime drops to 24-30C, but rainfall hits 700-900mm across 22-25 wet days. Sinquerim Beach is genuinely dangerous through monsoon — Goa Tourism withdraws lifeguard cover June-September, rip currents intensify, and red-flag advisories run continuous. The fort itself opens nominally but the laterite rampart walk runs slippery and the open seaward sections are wind-and-rain blown. The 1864 lighthouse closes during storm advisories from the Indian Coast Guard. Beach shacks remain dismantled until October 1. Taj Fort Aguada Resort drops walk-in rates 50 percent versus February peak but most guests are domestic-monsoon-honeymoon traffic, not heritage visitors. Hotel pool and AC indoor amenities become the entire trip. October is the next coherent window for the actual fort-and-lighthouse experience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 7, 1, 'skip',
  'Heaviest monsoon. 24-29C, 800-1100mm rain. Beach closed, lighthouse closed, ramparts unviable. Skip.',
  NULL,
  'July is the wettest month at Sinquerim. Beach closed, lighthouse closed in advisories, ramparts unsafe. The fort opens nominally but the visit shape cannot work. Wait for October.',
  'July in Fort Aguada is the deepest of the Konkan monsoon. Rainfall averages 1,000mm across 26-28 wet days, daytime 24-29C, humidity at 92 percent. Sinquerim Beach remains closed for water entry — Goa Tourism red-flag advisories run continuous, lifeguard cover withdrawn, rip currents at year-strongest. The fort opens nominally 9:30am-5:30pm but the laterite ramparts are slippery, the 1864 lighthouse closes on Coast Guard storm advisories (covering 50-60 percent of July days), and the open seaward sections see wind-driven rain that makes camera-and-walking nearly unworkable. Taj Fort Aguada Resort holds year-low rates (45-50 percent below February peak), but the trip is reduced entirely to indoor hotel time. Beach shacks remain dismantled until October 1. The 18km drive from Panaji holds but NH-66 sees occasional waterlogging at the Mandovi bridge approach. October is the next coherent window for the heritage-and-beach pairing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Beach closed. Lighthouse closed. Skip.',
  NULL,
  'August holds July''s pattern with marginally fewer extreme-rain days. Sinquerim Beach remains closed, lighthouse advisories continue, ramparts unviable. The fort opens but the visit shape breaks. Wait for late September.',
  'August in Fort Aguada is more of July with slightly fewer extreme-rain days. Rainfall 600-800mm across 23-25 wet days. Daytime 24-29C, humidity 90 percent. Sinquerim Beach remains closed for water entry under Goa Tourism red-flag advisories; lifeguard cover stays withdrawn. The fort opens nominally 9:30am-5:30pm but the laterite ramparts run slippery and the 1864 lighthouse closes on Coast Guard storm advisories covering 40-50 percent of August days. Beach shacks remain dismantled. Ganesh Chaturthi (variable date, 11-day Hindu festival) shifts local attention to Mangueshi and Shantadurga temples 40km south in Ponda; Sinquerim sees its quietest tourist numbers of the year. Taj Fort Aguada Resort rates at year-low (45-50 percent below February peak); the trip works only as a poolside-and-pampering domestic-monsoon-honeymoon stay. The actual heritage-fort-and-lighthouse experience does not function. Late September delivers a coherent return.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 9, 3, 'wait',
  'Monsoon withdrawing. 24-30C, 250-350mm rain. Beach reopens late month. Lighthouse climbs return last week.',
  'September is the trickle back. Konkan monsoon withdraws around September 25-30; beach reopens, ramparts dry, lighthouse climbs resume. Workable for the last week if dates are flexible.',
  'Early September is still rain-heavy. Beach remains closed, lighthouse advisories continue, ramparts slippery. If dates fall in the first fortnight, push to mid-October.',
  'September in Fort Aguada is the recovery month. Rainfall halves versus August to 250-350mm, mostly first half. By September 25-30 the southwest monsoon withdraws from the Konkan coast, Goa Tourism lifts beach red-flag advisories at Sinquerim, lifeguard cover returns, and the laterite ramparts dry within a week. The 1864 lighthouse climb resumes by month-end. Daytime 25-30C, humidity easing to 75 percent. Visitor numbers in the last week climb to 60 percent of October levels. Beach shacks rebuild for October 1 reopening — operators stage materials from September 20. Taj Fort Aguada Resort at ₹10-15k for the first 20 days, climbing to ₹13-18k by month-end. The smart traveler''s window: September 25 to October 5 — fort and beach at year-best green and air-quality, before the October-Diwali rush. Drive from Panaji 18km holds at 35-40 minutes off peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 10, 4, 'go',
  'Season opens. 23-31C, post-monsoon green, 100-150mm light rain. Beach shacks reopen Oct 1. Water sports return.',
  'October is the proper season-opener. Fort runs full hours, lighthouse fully accessible, beach shacks reopen October 1 per Forest Department rule, water sports operators back at full schedule. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Fort Aguada is when the heritage-and-beach pairing returns to full coherence. Rainfall 100-150mm — almost all in the first 10 days as the monsoon retreats — and daytime 24-31C, humidity falling toward 75 percent. The fort runs full 9:30am-5:30pm hours; the 1864 lighthouse climb resumes regular access. Beach shacks at Sinquerim reopen October 1 per Forest Department rule (the same rule that closes them May 31), and water-sports operators return at full schedule from the first week — parasailing ₹1,300, jet-ski ₹450 for 10 minutes, banana-boat ₹400. Visitor numbers are 50-60 percent of December peak. Taj Fort Aguada Resort at ₹13-18k, the only stay in NakshIQ''s database for this dest — Sinquerim/Candolim 4km north has Hyatt Centric Candolim and Pousada Tauma as alternatives. Drive from Panaji 18km holds at 35-40 minutes. Diwali week (variable date) brings a 5-day domestic-tourist bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 11, 5, 'go',
  'Peak builds. 21-30C, dry. Lighthouse visibility cleanest of the year. Sinquerim water sports at peak quality.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, days at 30C, walking conditions ideal. The 1864 lighthouse catches year-cleanest air-quality views (40-60km Arabian Sea horizon). Sinquerim water sports at peak quality.',
  NULL,
  'November in Fort Aguada is the year''s second-peak month behind January. Rainfall under 50mm with most of it in the first week. Daytime 23-30C, nights 21C, humidity dropping under 70 percent. The 1864 lighthouse catches the year''s cleanest air-quality views — clear days reach 40-60km of Arabian Sea horizon, and the post-monsoon clean atmosphere outperforms even January for visibility. The fort runs full 9:30am-5:30pm hours; the laterite rampart walk and Holy Stream cistern circuit hold up all day. Sinquerim Beach water-sports at peak quality — 1.2-1.5m wave conditions, full operator capacity, parasailing ₹1,400, jet-ski ₹500. Taj Fort Aguada Resort climbs to ₹16-22k by month-end as Christmas-week travelers begin booking. The 18km drive from Panaji on NH-66 holds at 35-40 minutes off peak. Strong call for the traveler who wants peak weather and sea conditions before December''s Christmas-NY 3x rate surge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('fort-aguada', 12, 5, 'go',
  'Peak peak. 19-30C, dry. Christmas-NY rates 3x. Sunburn Vagator Dec 28-30 brings traffic spillover to Sinquerim.',
  'December is the operational peak. Christmas-NY (December 22-January 5) is gridlock — Taj Fort Aguada rates triple, Calangute-Baga road jams reach NH-66. Sunburn Festival at Vagator (Dec 28-30) brings traffic spillover to Sinquerim.',
  NULL,
  'December in Fort Aguada is the operational peak of the Goa year. Daytime 22-30C, nights 19C, rainfall under 30mm. From December 22 to January 5, Christmas-NY congestion sets in: Taj Fort Aguada Resort rates triple to ₹35-50k, Calangute-Baga road jams reach NH-66 and the Sinquerim turn, and beach-shack reservations (Lazy Lounger, St. Jacques, Souza Lobo if grouped with Calangute) need 2-3 week lead. Sunburn Festival at Vagator (December 28-30, electronic music festival running since 2007) brings 30,000-50,000 daily attendees and traffic spillover to Sinquerim parking. The fort opens 9:30am-5:30pm with peak visitor density 10am-3pm; the smart visit window is 9:30-10:30am or 4-5:30pm. Lighthouse climbs continue with ranger discretion. Goa Liberation Day (December 19, public holiday) is mostly a Panaji event, minimal Sinquerim impact. Carol services at the Holy Cross Chapel inside the Taj Fort Aguada heritage block December 24. Christmas dawn Mass at the chapel 6:30am. December 8-21 is the cleanest window — peak weather without Christmas surge.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
