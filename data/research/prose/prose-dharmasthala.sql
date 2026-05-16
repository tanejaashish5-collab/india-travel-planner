-- Dharmasthala destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: dharmasthala | best 10-3 + 7-9 (monsoon pilgrimage continues) | avoid 4-5 | type pilgrimage/temple/Jain

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 1, 5, 'go',
  'Peak pilgrimage window. 18-30C dry. Annadana at full 50k-daily meal flow. Manjusha Museum at year-cleanest.',
  'January is when Dharmasthala runs at full operational tempo. Manjunatha Swamy darshan at 6.30am-2pm and 5-8.30pm, annadana free meals at 30,000-50,000 daily, Manjusha Museum 10,000+ artifacts open 9am-1pm/3-5.30pm. Heggade family administers — currently Veerendra Heggade (Padma Vibhushan 2015).',
  NULL,
  'Dharmasthala in January is the version coastal-Karnataka pilgrim regulars choose for the cool-temple-town aesthetic. Daytime 18-30C, nights 17C, humidity 65 percent. The town is built around the Manjunatha Swamy Temple — a Shiva shrine governed by a Jain family of administrators (the Heggades, currently Dr Veerendra Heggade as the 21st Dharmadhikari, serving since 1968, conferred the Padma Vibhushan in 2015) running an estimated 30,000-50,000 free meals daily through the annadana tradition (the temple-administered communal-meal halls — three primary kitchens, all-caste seating on the floor, banana-leaf service of rice/sambar/rasam/buttermilk/curd). Manjunatha Swamy darshan: 6.30am-2pm and 5-8.30pm, men remove upper garments to enter (dhoti rental ₹50 at outer mandapam), women in saree or salwar-kameez. The 39ft Bahubali statue (1973, smaller Sravanabelagola sibling, sculpted by Ranjala Gopalakrishna Shenoy in Karkala) on Ratnagiri hill 6km out. Manjusha Museum (10,000-plus artifacts — bronzes, coins, textiles, manuscripts, Heggade-family collection donated to public) 9am-1pm/3-5.30pm closed Monday, ₹15 entry.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 2, 5, 'go',
  'Driest month. 19-31C. Pilgrim flow lighter than Jan/Dec peaks. Maha Shivaratri brings 100k+ pilgrims.',
  'February is the cleanest weather window with the Maha Shivaratri (Feb 15, 2026) pilgrim surge. 100,000-plus pilgrims through 36 hours. Hotel beds book 6-8 weeks ahead for Shivaratri. Annadana scales to 80,000-plus that day.',
  NULL,
  'Dharmasthala in February is the technical peak window with the Maha Shivaratri pilgrim surge. Rainfall under 5mm, daytime 19-31C, nights 18C, humidity 60 percent — the lowest of the year. Manjunatha Swamy Temple (the Heggade family''s Jain administration of the Shiva shrine, current Dharmadhikari Dr Veerendra Heggade serving since 1968, Padma Vibhushan 2015) at full daily schedule. The defining event is Maha Shivaratri — February 15, 2026 (verify against lunar calendar; the festival falls on Phalguna Krishna Chaturdashi) — when 100,000-plus pilgrims pass through the temple in a 36-hour window. The annadana — the temple''s centuries-old free-meal tradition, daily 30,000-50,000 meals on regular days — scales to 80,000-plus on Shivaratri day. Special all-night darshan from 6pm Feb 15 through 6am Feb 16. Book hotel beds 6-8 weeks ahead for Shivaratri week — temple-trust guesthouses (₹500-1500) book first, private hotels Sri Sai Krupa, Hotel Soubhagya, Hotel Karnataka (₹2-4k Shivaratri-week rates) book 4-6 weeks out. Outside Shivaratri week the pilgrim flow is lighter than January/December peaks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 3, 4, 'go',
  'Last cool month. 21-32C, humidity 70 percent. Pilgrim flow normal. Maha Shivaratri spillover first week.',
  'March extends February''s pattern with the first humidity creep. Pilgrim flow at normal daily rhythm. Maha Shivaratri spillover first week. Hotel rates 20 percent below February peak.',
  NULL,
  'Dharmasthala in March is the soft-landing month before pre-monsoon humidity takes the trip into endurance mode. Daytime 22-32C, nights 20C, humidity climbing to 70 percent in the last fortnight, rainfall under 20mm. Manjunatha Swamy Temple (Heggade family Jain administration of the Shiva shrine — a syncretic-governance arrangement unique to Indian temple traditions) holds full darshan schedule (6.30am-2pm/5-8.30pm). Maha Shivaratri spillover (if the lunar festival fell late February or early March 2026) keeps the town crowded the first week. The annadana free-meal tradition (30,000-50,000 daily meals through the temple kitchens, three primary halls with banana-leaf rice-sambar-rasam-buttermilk service) at full daily tempo. Manjusha Museum (10,000-plus artifacts — bronzes, coins, textiles, manuscripts) 9am-1pm/3-5.30pm closed Monday, ₹15 entry. The 39ft Bahubali statue (1973, sculpted by Ranjala Gopalakrishna Shenoy of Karkala — smaller sibling to the 57ft 981 CE Sravanabelagola Bahubali) on Ratnagiri hill 6km out — best at dawn before heat. Car Museum (Heggade family vintage collection) and Sri Manjunatha Cancer Research Centre.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 4, 3, 'wait',
  'Pre-monsoon heat. 24-33C, humidity 78 percent. Pilgrim queues collapse mid-day. Hotel rates 30 percent off February.',
  'April still works for dawn-and-evening darshan and AC museum visits. The annadana hall is indoor AC-shade. Hotel rates 30 percent below February.',
  'April pushes Dharmasthala into pre-monsoon stress. Pilgrim queues outdoors collapse 11am-3pm, the 39ft Bahubali statue climb 6km out becomes brutal mid-day. Wait for monsoon (annadana continues regardless) or October.',
  'April in Dharmasthala is when the pilgrim town narrows to dawn-darshan and evening-aarti windows. Daytime 25-33C, nights 23C, humidity 78 percent. Manjunatha Swamy Temple (Heggade Jain-administered Shiva shrine, current Dharmadhikari Dr Veerendra Heggade) holds full darshan schedules but Car Street pilgrim queues collapse 11am-3pm. The 6.30am Nirmalya darshan and 7pm Mahapooja are the workable windows. The annadana free-meal halls run extended hours (30,000-50,000 daily meals continue regardless of weather — the centuries-old tradition holds through every season) and are AC-shade retreat for pilgrims through the hot mid-day. Manjusha Museum (10,000-plus artifacts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) is the prime AC retreat. The 39ft Bahubali statue on Ratnagiri hill 6km out at 6.30-8.30am only. Vishu (Kerala spillover April 14) brings a 2-3 day domestic pilgrim bump. Hotel rates 30 percent below February peak: temple-trust guesthouses ₹400-1100, Sri Sai Krupa ₹1100-2000, Hotel Soubhagya ₹1300-2200. The Mangalore-Dharmasthala 75km drive on NH-275 at year-cleanest road conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 5, 2, 'wait',
  'Peak pre-monsoon. 25-34C humidity 82 percent. Pre-monsoon thunderstorms. Pilgrim queues brutal mid-day.',
  'May functions only for darshan-anchored pilgrims willing to time the day. Annadana indoor halls hold up. Hotel rates at year-low.',
  'May runs hot and sticky at Dharmasthala. Pilgrim queues collapse mid-day, pre-monsoon thunderstorms knock grid 1-2 hours daily. Push to monsoon (annadana continues) or October.',
  'May in Dharmasthala is the closing pre-monsoon month. Daytime 26-34C, nights 25C, humidity 82 percent. Manjunatha Swamy Temple (the Heggade family''s syncretic-governance Shiva shrine — Jain administrators of a Hindu temple, a unique arrangement that has continued for centuries) holds full daily schedule but pilgrim queues compress to 6.30-9am and 5.30-8.30pm. Pre-monsoon thunderstorms hit the third and fourth weeks — afternoon squalls that knock grid power 1-2 hours and raise humidity to 90 percent. The annadana free-meal tradition (30,000-50,000 daily meals through three primary halls — banana-leaf rice-sambar-rasam-buttermilk-curd) continues at full daily volume regardless of weather. The communal-meal halls are AC-shade retreat. Manjusha Museum (10,000-plus Heggade-collection artifacts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) is the prime non-temple AC option. The 39ft Bahubali statue (1973, Ranjala Gopalakrishna Shenoy of Karkala — smaller sibling to Sravanabelagola''s 981 CE 57ft Gomateshwara) on Ratnagiri hill 6km out workable only 6.30-8am. Hotel rates at year-low: temple-trust guesthouses ₹400-1000, Sri Sai Krupa ₹1000-1800, Hotel Soubhagya ₹1200-2000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 6, 3, 'wait',
  'SW monsoon onset. 22-28C, 700-900mm rainfall. Temple operations continue. Annadana free meals daily.',
  'June brings monsoon. Temple darshan, annadana, and Manjusha Museum continue normal operations. Outdoor Bahubali climb on rain days closed. The annadana tradition holds through every season — a defining pilgrim draw.',
  'June is full monsoon at Dharmasthala. NH-275 Mangalore-Dharmasthala 75km drive landslide-watch, outdoor Bahubali climb closed on rain days. Outside the AC temple-and-meal-hall shape, monsoon stress holds. October-March is cleaner.',
  'June in Dharmasthala is the southwest monsoon''s arrival point on the coastal Karnataka inland belt. Rainfall jumps to 700-900mm across 22-24 wet days. Daytime 23-28C feels mild but constant rain and 92 percent humidity strip outdoor activity. The defining feature of Dharmasthala — and the reason the temple is on this travel itinerary even in monsoon — is the annadana tradition. Manjunatha Swamy Temple''s three primary free-meal halls continue serving an estimated 30,000-50,000 daily meals through every monsoon day — banana-leaf rice-sambar-rasam-buttermilk-curd, all-caste floor-seating, no payment, no donor-tier hierarchy. The Heggade family (current Dharmadhikari Dr Veerendra Heggade, Padma Vibhushan 2015) administers this regardless of weather. Temple darshan 6.30am-2pm/5-8.30pm continues. Manjusha Museum (10,000-plus artifacts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) holds full hours. The 39ft Bahubali statue (1973 Ranjala Gopalakrishna Shenoy) on Ratnagiri hill 6km out — climb closed on heavy-rain days. NH-275 Mangalore-Dharmasthala (75km) at landslide-watch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 7, 3, 'go',
  'Peak monsoon. 22-27C, 800-1000mm rainfall. Pilgrim flow continues. Annadana runs daily through every season.',
  'July is full monsoon but Dharmasthala temple operations continue at full tempo. Annadana 30k-50k daily meals through every monsoon day. Temple darshan plus museum plus meal-hall is a viable monsoon-pilgrim shape. Bahubali climb closed.',
  NULL,
  'July in Dharmasthala is the wettest month of the year but the temple operations continue regardless. Rainfall 800-1000mm across 25-27 wet days, daytime 23-27C, humidity 93 percent. This is the operational paradox of Dharmasthala — the trip is built around an indoor pilgrim experience (darshan, annadana free-meal hall, Manjusha Museum) that holds full operations through every monsoon day. Manjunatha Swamy Temple (the Heggade family Jain-administered Shiva shrine, current Dharmadhikari Dr Veerendra Heggade serving since 1968) holds 6.30am-2pm and 5-8.30pm darshan. The annadana tradition — three primary free-meal halls serving an estimated 30,000-50,000 daily meals (banana-leaf rice-sambar-rasam-buttermilk-curd, all-caste floor-seating, no payment, no donor hierarchy) — runs at full daily volume. The communal meal halls are warm-dry retreat from monsoon downpours. Manjusha Museum (10,000-plus Heggade-collection artifacts — bronzes, coins, textiles, manuscripts, palm-leaf documents) 9am-1pm/3-5.30pm closed Monday, ₹15 entry, the AC interior is the dry-weather anchor.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 8, 3, 'go',
  'Monsoon continues. 22-28C, 500-700mm rainfall. Temple operations full tempo. Krishna Janmashtami minor.',
  'August holds the monsoon pattern with eased rainfall. Temple darshan plus annadana plus museum full operations. Krishna Janmashtami (variable Aug 25 2026 — verify) is minor at Shiva-anchored Dharmasthala. Pilgrim-only trip works.',
  NULL,
  'August in Dharmasthala holds the July monsoon pattern with marginally eased rainfall. 500-700mm across 22-24 wet days, daytime 23-28C, humidity 91 percent. Manjunatha Swamy Temple (the centuries-old Heggade Jain-administered Shiva shrine) continues full daily operations — 6.30am-2pm/5-8.30pm darshan. The annadana tradition (30,000-50,000 daily free meals through three primary halls, banana-leaf rice-sambar-rasam-buttermilk-curd, all-caste floor-seating, no payment, no donor hierarchy) runs at full daily volume regardless of monsoon — the communal-meal halls are dry-warm retreat. Manjusha Museum (10,000-plus artifacts — Heggade-family collection donated to public, bronzes/coins/textiles/manuscripts/palm-leaf documents — ₹15 entry, 9am-1pm/3-5.30pm closed Monday) at full hours. Krishna Janmashtami (variable late-August date, 2026 verify against lunar calendar — typically 4-5 days before the new moon of Bhadrapada) is minor at Shiva-anchored Dharmasthala; the Janmashtami pilgrim draw is at Udupi 130km west.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 9, 4, 'go',
  'Monsoon retreat. 22-29C, 250-350mm rain. Bahubali climb reopens late month. Pilgrim flow returning.',
  'September is the recovery month. SW monsoon retreats around Sep 25, Bahubali climb reopens, NH-275 stabilises. Pilgrim flow returning. Annadana continues at full daily volume.',
  NULL,
  'September in Dharmasthala is the trickle back from monsoon. Rainfall drops to 250-350mm across 16-18 wet days, mostly the first fortnight. Daytime 23-29C, humidity easing to 82 percent in the second half. The southwest monsoon retreats from coastal-Karnataka around September 25-30 (IMD declares formal withdrawal). NH-275 Mangalore-Dharmasthala 75km stabilises — landslide cancellation events drop to rare. Manjunatha Swamy Temple (Heggade Jain-administered Shiva shrine, current Dharmadhikari Dr Veerendra Heggade serving since 1968, Padma Vibhushan 2015) at full daily operations — pilgrim flow recovering after monsoon. Annadana free-meal tradition (30,000-50,000 daily through three halls — the year-defining draw) continues at full daily volume. Manjusha Museum (10,000-plus Heggade-collection artifacts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) at full hours. The 39ft Bahubali statue (1973, Ranjala Gopalakrishna Shenoy of Karkala) on Ratnagiri hill 6km out — climb returns to walkable conditions from mid-month. Car Museum (Heggade family vintage collection) at returning weekday traffic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 10, 5, 'go',
  'Season opens. 20-30C, 200-250mm spillover. Pilgrim flow building. Bahubali climb clean from mid-month.',
  'October is the proper season opener. Pilgrim flow building toward December-January peak. Annadana, Manjusha Museum, Bahubali climb all clean from mid-month. Karnataka Rajyotsava prep Nov 1.',
  NULL,
  'October in Dharmasthala is the proper return to clean post-monsoon weather. Rainfall drops to 200-250mm with the bulk falling in the first ten days; from October 15 onward Dharmasthala flips into clean post-monsoon pilgrim mode. Daytime 21-30C, nights 19C, humidity falling from 85 to 75 percent. Manjunatha Swamy Temple (the Heggade family''s syncretic-governance Shiva shrine — Jain administrators of a Hindu temple, a centuries-old arrangement unique to Indian temple traditions) at recovering full pilgrim flow toward the December-January peak. The annadana free-meal tradition (30,000-50,000 daily meals through three primary halls — banana-leaf rice-sambar-rasam-buttermilk-curd, all-caste floor-seating, no payment, no donor hierarchy) at full daily volume — pilgrim flow building means meal-hall queues lengthen in the second half. Manjusha Museum (10,000-plus Heggade-family collection — bronzes, coins, textiles, palm-leaf manuscripts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) at full hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 11, 5, 'go',
  'Peak builds. 19-30C, rainfall under 50mm. Karnataka Rajyotsava Nov 1. Lakshadeepotsava prep mid-month.',
  'November is the proper pivot to peak. Lakshadeepotsava (mid-Nov, Kartika Purnima — temple''s 5-day light festival, 100,000-plus pilgrims) builds toward year''s second-biggest event after Maha Shivaratri. Hotel rates climb 20 percent.',
  NULL,
  'November in Dharmasthala is the year''s second-peak window with the Lakshadeepotsava festival. Rainfall under 50mm, daytime 20-30C, nights 18C, humidity dropping below 70 percent. The defining event is Lakshadeepotsava — the 5-day Karthika-month light festival at Manjunatha Swamy Temple, falling around Karthika Purnima (the full moon of Karthika month, late November typically — 2026 verify against lunar calendar). 100,000-plus pilgrims attend the 5-day festival; the temple grounds are lit with thousands of oil lamps each evening, the procession through the Heggade-temple complex on the festival''s penultimate day brings the year''s second-largest crowd after Maha Shivaratri (February). The annadana free-meal tradition (30,000-50,000 daily on regular days) scales to 80,000-plus on Lakshadeepotsava days. Karnataka Rajyotsava (November 1, 1956 state formation under States Reorganisation Act) sees city-wide cultural programmes. Manjusha Museum (10,000-plus Heggade-collection artifacts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) at peak weekend traffic. The 39ft Bahubali statue (1973, Ranjala Gopalakrishna Shenoy) on Ratnagiri hill 6km out at year-cleanest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('dharmasthala', 12, 5, 'go',
  'Peak season. 18-29C dry. Christmas-NYE rates 1.5x. Pilgrim flow at year-busiest. Annadana queues longest.',
  'December is when Dharmasthala runs at full capacity. Christmas-NYE rates 1.5x (lower spike than beach destinations — the pilgrim base is steady year-round). Annadana meal-hall queues at year-longest. Lock beds 4-6 weeks ahead.',
  NULL,
  'December in Dharmasthala is the operational peak for the pilgrim-trip year. Daytime 19-29C, nights 17C, rainfall under 20mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.5x the November baseline — a softer spike than beach destinations because the Dharmasthala pilgrim base is steady year-round rather than holiday-driven: temple-trust guesthouses ₹600-1500, Sri Sai Krupa ₹1800-2800, Hotel Soubhagya ₹2-3k. Manjunatha Swamy Temple (the Heggade family''s 800-year-plus syncretic-governance Shiva shrine — Jain administrators of a Hindu temple) at year-busiest pilgrim flow ahead of Maha Shivaratri (February 2026). 6.30am-2pm and 5-8.30pm darshan windows; men remove upper garments to enter sanctum (dhoti rental ₹50 at outer mandapam). The annadana free-meal tradition (30,000-50,000 daily on regular days through three primary halls — banana-leaf rice-sambar-rasam-buttermilk-curd, all-caste floor-seating, no payment, no donor hierarchy) at year-longest queues. Manjusha Museum (10,000-plus Heggade-collection artifacts, ₹15 entry, 9am-1pm/3-5.30pm closed Monday) at peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
