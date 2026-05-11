-- Meghamalai (High Wavy Mountains) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: meghamalai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 1, 5, 'go',
  'Peak Meghamalai window. 10-23C at 1500m. Highwavys and Manalar estate stays open. Advance booking essential.',
  'January is the cleanest weather window at Meghamalai. Daytime 19-23C, nights 10-13C. Highwavys Estate and Manalar Estate stays at full operations. Advance booking 3-4 weeks essential — no walk-in tourism. Tea + cardamom + coffee + pepper estate walks.',
  NULL,
  'Meghamalai in January is when the cloud forest reveals what the Tamil-name "High Wavy Mountains" actually describes. At 1500m in the Theni district of southwestern Tamil Nadu, Meghamalai sits within the Megamalai Wildlife Sanctuary (notified 2018, 269 sq km) — one of TN''s rarest hill destinations with zero commercial tourism infrastructure. The only accommodation is the colonial-era Highwavys Estate guesthouse (Bombay Burmah Trading Corporation-owned, ₹6,000-12,000 per night including meals) and the smaller Manalar Estate stay (₹4,000-8,000 with meals). Both require 3-4 week advance booking; no walk-in stays exist. Daytime 19-23C, nights 10-13C, rainfall under 20mm. The estate landscape combines tea (the dominant crop on the upper slopes), cardamom, coffee and pepper (Periyar river catchment), with cloud-forest pockets at higher elevations. Wildlife: Lion-tailed Macaque (the Anamalai-Meghamalai sub-population, IUCN endangered), Nilgiri Tahr at the highest grasslands, Sloth Bear, Sambar, Indian Gaur, Leopard. Birdlife 230+ species including Black-and-orange Flycatcher and Sri Lanka Frogmouth.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 2, 5, 'go',
  'Driest month. 11-24C. Cloud forest at year-clearest visibility. Wildlife sightings at peak.',
  'February is the technical sweet spot — rainfall under 15mm, cloud forest at year-clearest. Lion-tailed Macaque sightings at peak as water sources concentrate. Highwavys and Manalar estate stays at year-busiest — book 4-6 weeks ahead.',
  NULL,
  'Meghamalai in February is the cleanest weather month at the cloud-forest hill destination. Rainfall averages 10-15mm, daytime 20-24C, nights 11-14C. The cloud-forest pockets at 1400-1600m elevation — typically blanketed in monsoon mist — are at year-clearest visibility. Lion-tailed Macaque (LTM, IUCN endangered, part of the Anamalai-Meghamalai sub-population) sightings at peak concentration along the estate roads — water sources shrinking. Nilgiri Tahr visible at the higher grasslands (rare TN sub-population, distinct from Eravikulam''s Kerala population). Sloth Bear and Sambar sightings on early-morning walks. The Megamalai Wildlife Sanctuary (notified 2018, 269 sq km, no public jeep safari but estate-walks possible) covers the cardamom, coffee, pepper, tea matrix. The estate-walk experience (4-7 hours, ₹500-1,000 with estate-arranged naturalist) covers the Periyar river catchment headwaters, cloud-forest fragments, and the high-grassland tahr habitat. Highwavys Estate guesthouse (Bombay Burmah Trading Corporation-owned, ₹6,000-12,000/night with meals) and Manalar Estate stay (₹4,000-8,000 with meals) at year-busiest — booking 4-6 weeks ahead essential.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 3, 4, 'go',
  'Cool-dry holds. 12-26C. Cardamom flowering visible. Wildlife concentration peaks at water sources.',
  'March extends February''s pattern with cardamom flowering visible at established estates. Wildlife concentration at peak as remaining water sources shrink. Last clean month before April-May heat. Estate stays still book 3-4 weeks ahead.',
  NULL,
  'Meghamalai in March is the soft-landing month with the bonus of cardamom flowering visible at established estates. Daytime 22-26C, nights 12-15C, humidity climbing toward 65 percent in the last fortnight, rainfall under 25mm. The cardamom flowering window — Periyar river catchment estates have cardamom plots at the lower-elevation pepper and coffee matrix; the small white-with-purple flowers appear at ground level, March-April is peak. Lion-tailed Macaque (LTM, IUCN endangered) sightings at year-best concentration — water sources shrinking forces troops to predictable patterns near the estate streams. Nilgiri Tahr at higher grasslands, Sloth Bear at lower forests, Sambar at the cardamom-shola interface. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) is at year-best for sightings though formal jeep safaris don''t exist — estate-walks at ₹500-1,000 with naturalist remain the access mode. Birdlife 230+ species including Black-and-orange Flycatcher, Sri Lanka Frogmouth, Malabar Trogon, White-bellied Treepie at full concentration. Highwavys Estate (BBTC, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) stays still book 3-4 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 4, 3, 'wait',
  'Pre-monsoon. 14-29C. Heat building. Pre-monsoon storms last 10 days. Wait for October.',
  NULL,
  'April pushes Meghamalai into pre-monsoon heat (14-29C) with afternoon thundershowers from Apr 22-28. Cardamom flowering tail, wildlife concentration starts dispersing as monsoon water arrives. Estate stays open but the year-best window has passed. Wait for October-February.',
  'Meghamalai in April is the transition month before SW monsoon arrives. Daytime 24-29C, nights 14-17C, humidity past 70 percent in the last fortnight. Pre-monsoon afternoon thundershowers from Apr 22-28 bring 60-100mm in concentrated events — the 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km becomes 4WD-essential after these storms (regular cars manage in dry mornings). Cardamom flowering tail visible. Lion-tailed Macaque (LTM, IUCN endangered) sightings dispersing as the first water arrives back into the streams. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) estate-walk experience continues but visibility compromised by mid-day haze. Highwavys Estate (BBTC, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) stays remain open but ease of access at risk through the last 10 days. Birdlife concentration starts dispersing. Hotel rates hold — the estates don''t price-discriminate by season since the supply is so limited. The 4-hour Madurai-Meghamalai drive (130km via Theni) workable but pre-monsoon haze cuts late-afternoon visibility. Push to October — the post-monsoon green is far cleaner than the pre-monsoon heat-haze offering.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 5, 2, 'wait',
  'Pre-monsoon. 15-30C. SW-monsoon advance squalls last 10 days. Ghat road 4WD-essential. Wait for October.',
  NULL,
  'May brings pre-monsoon heat (15-30C) and the SW-monsoon advance from May 22. The 18-hairpin ghat road becomes 4WD-essential on rainy afternoons. Estate stays still open but the year-best window has clearly passed. October is the right call.',
  'Meghamalai in May is the awkward window before SW monsoon proper arrives. Daytime 24-30C, nights 15-18C, humidity 75 percent. By the third week, SW monsoon advance squalls hit the Western Ghats face — Meghamalai catches significant rainfall at the cloud-forest 1500m elevation. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km becomes 4WD-essential after the storms; regular cars get stuck on the steeper switchbacks during wet conditions. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) estate-walks workable in dry mornings only. Lion-tailed Macaque (LTM, IUCN endangered) sightings disperse as monsoon water returns to streams. Nilgiri Tahr at high grasslands and Sloth Bear sightings less predictable. Cloud-forest mist starts blanketing the upper slopes by mid-month. Highwavys Estate (BBTC, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) stays continue but advance bookings get harder to lock as roads become uncertain. The 4-hour Madurai-Meghamalai drive (130km via Theni) workable but the last leg risks delays. October is the right call — same cloud-forest aesthetic at cleaner road and water-source conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 6, 1, 'skip',
  'SW monsoon onset. 14-22C, 300-500mm rainfall. Ghat road 4WD-only. Estate stays restricted. Skip.',
  NULL,
  'June is when the SW monsoon hits Meghamalai. 300-500mm rainfall at the cloud-forest elevation. The 18-hairpin Bodinayakanur-Highwavys ghat road becomes 4WD-only with frequent closures. Estate stays restricted to confirmed bookings only. Skip until October.',
  'Meghamalai in June is when the SW monsoon arrives at the Western Ghats cloud-forest face. Rainfall 300-500mm at the 1500m elevation across 18-22 wet days — the Meghamalai-Cardamom-Hills face catches significant SW monsoon, comparable to the Anamalai face though slightly less extreme than Valparai. Daytime 18-22C, nights 14-17C feel mild but constant rain and 95 percent humidity strip outdoor activity. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km becomes 4WD-only — regular cars cannot manage the wet switchbacks; even 4WD vehicles face 1-2 day closures per week on landslide events. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) estate-walks suspend. Lion-tailed Macaque (LTM) troops remain in habitat but visibility absent under cloud and rain. Nilgiri Tahr and other wildlife disperse from concentrated water-source patterns. Highwavys Estate (Bombay Burmah Trading Corporation, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) restrict to confirmed advance bookings only; new walk-up requests declined. Cardamom plucking peaks in the rain. Network coverage drops to near-zero.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 7, 1, 'skip',
  'Peak SW monsoon. 14-21C, 500-800mm rainfall. Ghat road closures frequent. Estate stays closed many days. Skip.',
  NULL,
  'July is the year''s wettest stretch at Meghamalai — 500-800mm rainfall at 1500m. The ghat road closes 3-4 days/week, estate stays cancel many advance bookings. The Meghamalai trip cannot happen until October. Skip.',
  'Meghamalai in July is the year''s wettest month at the cloud-forest elevation. Rainfall 500-800mm across 24-28 wet days at the 1500m elevation; the Western Ghats Meghamalai face catches sustained SW monsoon force, among the wetter July rainfall zones in southern Tamil Nadu. Daytime 18-21C, nights 14-17C with constant rain and 95 percent humidity. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km closes 3-4 days per week under TN PWD landslide-clearance schedules. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) estate-walks impossible. Lion-tailed Macaque (LTM, IUCN endangered) troops remain in habitat but visibility absent — cloud cover, rain, and dense mist make even 100m visibility erratic. Highwavys Estate (Bombay Burmah Trading Corporation, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) cancel many confirmed bookings during the wettest weeks; advance refund processes documented but slow. Cardamom plucking peaks during the rain. Network coverage absent. The 4-hour Madurai-Meghamalai drive workable to Theni but the last 25km a serious 4WD undertaking with high cancellation risk.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 8, 1, 'skip',
  'SW monsoon continues. 14-21C, 400-600mm rainfall. Ghat road erratic, estate stays restricted. Skip.',
  NULL,
  'August holds the July pattern — 400-600mm rainfall, ghat road closures 2-3 days/week, estate stays still cancel advance bookings. Wait for October-November return to operations.',
  'Meghamalai in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 400-600mm across 22-26 wet days. Daytime 18-21C, nights 14-17C with 90 percent humidity and consistent overcast. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km closes 2-3 days per week under TN PWD landslide-clearance schedules; 4WD-only access through the rest. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) estate-walks impossible. Lion-tailed Macaque (LTM, IUCN endangered) troops remain in habitat but visibility absent. Nilgiri Tahr at higher grasslands and Sloth Bear, Sambar wildlife all dispersed and rain-obscured. Highwavys Estate (Bombay Burmah Trading Corporation, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) cancel some confirmed bookings during heavy-rain weeks but operations more reliable than July. Cardamom plucking tail end. Network coverage spotty BSNL only. Independence Day (Aug 15) brings some bookings from Madurai-Theni hill-station enthusiasts but most leave underwhelmed by rain-impacted visibility. Hotel rates unchanged — the estates don''t price-discriminate seasonally given limited supply.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 9, 3, 'wait',
  'SW monsoon retreats slowly. 15-23C, 200-350mm rainfall. Ghat road still 4WD-recommended. Wait for October.',
  'September is the recovery month but SW monsoon holds the first fortnight. 200-350mm rainfall, ghat road still 4WD-recommended through Sep 25. Estate stays resume bookings late month. October is dramatically cleaner.',
  'September is on the way back at Meghamalai but the SW monsoon holds the first fortnight — 200-350mm rainfall, the 18-hairpin Bodinayakanur-Highwavys ghat road still 4WD-recommended through Sep 25, estate stays resume bookings late month only. Push to October — same cloud-forest aesthetic at materially cleaner road conditions.',
  'Meghamalai in September is the soft re-opening but with the first fortnight still under SW monsoon influence. Rainfall 200-350mm across 16-20 wet days at the 1500m elevation, most in the first three weeks. Daytime 20-23C, nights 15-17C, humidity dropping toward 85 percent. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km stabilises in the third week — closures drop from 2-3 per week to under 1 from Sep 25 onward; 4WD-recommended through the month though regular cars manageable from Sep 25. The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) estate-walks resume mid-month on partial schedule. Lion-tailed Macaque (LTM, IUCN endangered) troops become more visible as rain eases. Nilgiri Tahr at higher grasslands return to predictable patterns. Highwavys Estate (Bombay Burmah Trading Corporation, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) resume taking new confirmed advance bookings from mid-September; the late-September window often has open slots not present in October-February. The 4-hour Madurai-Meghamalai drive (130km via Theni) workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 10, 4, 'go',
  'Season opens. 14-24C, 150-250mm rainfall. Cloud forest greenest of year. Estate stays at full operations.',
  'October is the proper season opener. SW monsoon retreats fully by mid-month, ghat road stabilises, estate stays at full operations. Cloud-forest pockets at year-greenest. Wildlife dispersing back to predictable patterns. Book 3-4 weeks ahead.',
  NULL,
  'Meghamalai in October is when the cloud-forest hill destination returns to full operations. Daytime 21-24C, nights 14-17C, rainfall 150-250mm mostly the first 10 days as the SW monsoon retreats, humidity dropping toward 75 percent. The cloud-forest pockets at 1400-1600m elevation are at year-greenest after the four-month monsoon flush — the Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) hosts the Periyar river catchment headwaters at peak post-monsoon flow. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km stabilises fully by mid-October; regular cars manage from Oct 15 onward. Lion-tailed Macaque (LTM, IUCN endangered) sightings at Iyerpadi-Sholayar-equivalent estate boundaries return to visible patterns. Nilgiri Tahr return to higher grasslands. Sloth Bear, Sambar, Indian Gaur, Leopard sightings on estate-walks (₹500-1,000 with naturalist). Birdlife 230+ species returning to post-monsoon territories — Black-and-orange Flycatcher, Sri Lanka Frogmouth, Malabar Trogon. Highwavys Estate (BBTC, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) at full bookings — advance 3-4 weeks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 11, 5, 'go',
  'High season. 12-23C. NE monsoon residual easing. Cloud forest clear, wildlife visible. Book 4-6 weeks ahead.',
  'November is the genuine pivot to Meghamalai high season. NE monsoon residual under 80mm, cloud forest clear, wildlife visible. Estate stays at year-busiest — book 4-6 weeks ahead for the Christmas-NY tail.',
  NULL,
  'Meghamalai in November is when the cloud-forest hill destination turns the corner. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first 10 days. Daytime 19-23C, nights 12-15C, humidity dropping under 70 percent. The cloud-forest pockets at 1400-1600m elevation are at year-clearest post-monsoon visibility — the Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) terrain at peak photogenicity. Lion-tailed Macaque (LTM, IUCN endangered) sightings frequent at the estate-road boundaries — the Anamalai-Meghamalai sub-population active. Nilgiri Tahr at higher grasslands, Sloth Bear, Sambar, Indian Gaur, Leopard all visible. Estate-walks (₹500-1,000 with naturalist) at year-best concentration — 4-7 hour itineraries covering the Periyar river catchment, cloud-forest fragments, high-grassland tahr habitat. Birdlife 230+ species at concentration: Black-and-orange Flycatcher, Sri Lanka Frogmouth, Malabar Trogon, White-bellied Treepie. Highwavys Estate (Bombay Burmah Trading Corporation, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) at year-busiest — book 4-6 weeks ahead for any November-January window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('meghamalai', 12, 5, 'go',
  'Peak season. 10-23C. Christmas-NY estate slots book 6-8 weeks ahead. Wildlife at peak visibility.',
  'December is the year''s most reliable Meghamalai window — peak Western Ghats weather. Highwavys and Manalar estates book 6-8 weeks ahead for the Christmas-NY window. Wildlife concentration at peak.',
  NULL,
  'Meghamalai in December is the year''s most coherent window. Daytime 19-23C, nights 10-13C, rainfall under 25mm, humidity 65 percent. The cloud-forest hill destination — the most exclusive in TN given the zero-tourism-infrastructure model — runs at peak quality but at the most constrained availability. Highwavys Estate (Bombay Burmah Trading Corporation, ₹6,000-12,000 with meals) and Manalar Estate (₹4,000-8,000) book out 6-8 weeks ahead for any Christmas-NY week slot. Rates hold (the estates don''t price-discriminate seasonally given limited supply and small loyal repeat-customer base). The Megamalai Wildlife Sanctuary (2018-notified, 269 sq km) hosts wildlife at year-best winter concentration — Lion-tailed Macaque (LTM, IUCN endangered, Anamalai-Meghamalai sub-population) at estate-road boundaries, Nilgiri Tahr at higher grasslands, Sloth Bear, Sambar, Indian Gaur, Leopard sightings on estate-walks (₹500-1,000 with naturalist). Birdlife 230+ species at year-best concentration. The 18-hairpin Bodinayakanur-Highwavys ghat road''s last 25km at year-driest. Network coverage absent — BSNL spotty only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
