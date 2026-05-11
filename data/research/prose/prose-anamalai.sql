-- Anamalai Tiger Reserve (Topslip) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: anamalai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 1, 4, 'go',
  'Open year-round. 14-26C at Topslip 800m. Jeep safari ₹2500-4500. Karian Shola trekking ₹1500. Closed Monday mornings.',
  'January is a clean Anamalai window. Topslip (800m) is open year-round; jeep safari ₹2,500-4,500/vehicle, bamboo rafting ₹1,000-1,500, Karian Shola trek ₹1,500. Forest rest houses (₹1,200-2,500) book 30 days ahead at the Wildlife Warden office Pollachi.',
  NULL,
  'Anamalai Tiger Reserve in January is the clean access window to one of South India''s densest tiger-and-elephant landscapes. Topslip — the entry point at 800m elevation, 35km from Pollachi via the Aliyar reservoir — is the only public-access node within the 958 sq km Tiger Reserve (notified 2007, part of the Anamalai-Parambikulam-Indira Gandhi tiger landscape). Daytime 22-26C, nights 14-17C, rainfall under 30mm. Jeep safari operations run from the Topslip Reception Centre, 6:30-9:00am and 3:30-5:30pm batches, ₹2,500-4,500 per vehicle (Indian/foreign rates differ), bookings opened 60 days ahead via the Wildlife Warden Pollachi office. Bamboo rafting on the Parambikulam-end backwaters ₹1,000-1,500 per group, advance 5-7 days. Karian Shola trekking — the 1km montane forest walk with naturalist — ₹1,500 per group, dawn slot only.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 2, 5, 'go',
  'Peak window opens. 15-28C. Wildlife at year-best concentration. Tiger sighting odds climb. Closed Monday mornings.',
  'February is the technical sweet spot at Anamalai. Rainfall under 20mm, water sources shrinking, wildlife concentrating at known waterholes. Tiger sighting odds climb to 1-in-15 safaris (vs 1-in-25 January). Karian Shola trek and bamboo rafting at year-best.',
  NULL,
  'Anamalai Tiger Reserve in February is the technical peak window for wildlife visibility. Rainfall averages 15-20mm, daytime 23-28C, nights 15-18C. Water sources at the 958 sq km Reserve start shrinking, concentrating Asiatic Elephant herds, Bengal Tiger movement and Indian Gaur sightings at known waterholes (Karian Shola stream, Parambikulam catchment, the Anamalai foothill ponds). Tiger sighting odds climb — the Reserve''s camera-trap-confirmed population (~30 tigers) makes Anamalai one of TN''s densest tiger habitats; February safari batches see 1-in-15 sightings on average versus 1-in-25 in cooler months. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) book 60 days ahead via Wildlife Warden Pollachi. Bamboo rafting on the Parambikulam-end backwaters (₹1,000-1,500 per group, dawn slot 6am) at year-clearest water. Karian Shola trekking (₹1,500 per group, dawn slot, 1km montane forest walk with naturalist) at year-best wildlife sighting odds along the trail. Lion-tailed Macaque (LTM, IUCN endangered, central-Anamalai sub-population) at concentrated visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 3, 5, 'go',
  'Peak wildlife. 16-30C. Tiger and elephant sightings at year-best. Karian Shola trek at peak. Closed Monday mornings.',
  'March is the peak Anamalai wildlife window. Water sources at year-low, animals concentrate visibly at known waterholes. Tiger sighting odds climb to 1-in-12 safaris. Karian Shola trek and bamboo rafting at year-best.',
  NULL,
  'Anamalai Tiger Reserve in March is the peak wildlife-concentration month with the heat starting to push midday operations to compressed windows. Daytime 24-30C, nights 16-19C, humidity climbing toward 65 percent, rainfall under 30mm. Water sources at year-low — the Karian Shola stream, Parambikulam catchment edges, and the foothill ponds become the only reliable water across the 958 sq km Reserve. Asiatic Elephant herds (the Anamalai population at year-best concentration), Bengal Tiger movement (~30 camera-trap-confirmed individuals across the Reserve) and Indian Gaur sightings concentrate visibly at the known waterholes. Tiger sighting odds climb to 1-in-12 safaris (versus 1-in-25 in November-December). Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) book 60 days ahead via Wildlife Warden Pollachi — the morning slot more reliable for sightings as afternoon heat builds. Bamboo rafting on the Parambikulam-end backwaters (₹1,000-1,500 per group, dawn 6am slot only, afternoon slots cancelled for animal-water-access protocol) at year-best wildlife encounters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 4, 5, 'go',
  'Peak wildlife continues. 18-32C. Tiger sighting odds at year-best. Pre-monsoon storms last 10 days.',
  'April is when Anamalai tiger sighting odds peak. Water concentration at year-extreme — animals predictable. Pre-monsoon thunderstorms from Apr 22-28 bring afternoon water relief. Closed Monday mornings.',
  NULL,
  'Anamalai Tiger Reserve in April is the year''s peak wildlife visibility window. Daytime 26-32C, nights 18-21C, humidity past 75 percent in the last fortnight, pre-monsoon rainfall 60-100mm in the last 10 days. Water sources at year-extreme low — only the Karian Shola stream, Parambikulam catchment edges, and the deepest foothill ponds hold water; the 958 sq km Reserve''s entire wildlife population concentrates predictably. Bengal Tiger (~30 camera-trap-confirmed individuals) sighting odds at year-best 1-in-10 safaris. Asiatic Elephant herds (the Anamalai population) at concentrated visibility — 5-7 herd encounters per day on jeep safaris. Indian Gaur, Sambar, Sloth Bear, Leopard at peak concentration. Lion-tailed Macaque (LTM, IUCN endangered, central-Anamalai sub-population), Nilgiri Langur on Karian Shola trail at year-best. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) book 60-90 days ahead via Wildlife Warden Pollachi — peak demand month. Bamboo rafting on the Parambikulam backwaters (₹1,000-1,500 per group, dawn 6am slot only) at year-busiest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 5, 4, 'go',
  'Pre-monsoon peak. 19-32C. First fortnight workable, last 10 days SW-monsoon advance. Wildlife dispersing as water returns.',
  'Early May extends April wildlife peak. Last 10 days bring SW-monsoon advance squalls — water returns, animals begin dispersing from concentrated patterns. Some forest zones close in late May. Closed Monday mornings.',
  NULL,
  'Anamalai Tiger Reserve in May splits cleanly in two. The first fortnight extends April: daytime 26-32C, nights 19-22C, humidity 80 percent. Wildlife still concentrated at remaining water — Bengal Tiger sighting odds hold 1-in-12 safaris, Asiatic Elephant herds at concentrated visibility, Indian Gaur, Sloth Bear, Leopard at peak. Lion-tailed Macaque (LTM, IUCN endangered, central-Anamalai sub-population) at Karian Shola trail sighting peak. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) at year-busiest. Bamboo rafting (₹1,000-1,500, dawn 6am slot only) and Karian Shola trekking (₹1,500, dawn slot) at peak demand. **Closed Monday mornings**. By the third week, southwest monsoon advance squalls hit the Anamalai western face — the Reserve catches significant SW monsoon (the western Anamalai face receives 2,500-4,000mm annual rainfall comparable to Valparai). Water returns rapidly to the catchment, wildlife disperses from concentrated patterns. Some safari zones (the Sholayar-end loop, the higher-elevation Karian Shola interior) close from late May under TN PWD trail-condition protocols.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 6, 2, 'wait',
  'SW monsoon onset. 17-25C, 300-500mm rainfall. Some zones close. Wildlife dispersing into forest cover. Skip unless rain-forest tolerant.',
  NULL,
  'June brings the SW monsoon to the Anamalai face. 300-500mm rainfall, some safari zones close, wildlife disperses into forest cover with low visibility, jeep safari batches reduced. Topslip-Pollachi road landslide-watch. Wait for October.',
  'Anamalai Tiger Reserve in June is when the SW monsoon arrives at the Anamalai western face. Rainfall 300-500mm at the 800m Topslip elevation across 18-22 wet days — the western Anamalai face catches significant SW monsoon rain (annual 2,500-4,000mm at higher Valparai elevation, lighter but still substantial at the 800m Topslip base). Daytime 21-25C, nights 17-20C feel mild but constant rain and 95 percent humidity strip visibility. Some safari zones — the Sholayar-end loop, the higher-elevation Karian Shola interior trails — close from early June under TN Forest Department trail-condition protocols. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) continues on the reduced-zone schedule but with sighting odds dropping to 1-in-30 — wildlife disperses into dense forest cover with water everywhere. The Topslip-Pollachi 35km road (via the Aliyar reservoir) becomes landslide-watch country, closures 1-2 days per week. Bamboo rafting on Parambikulam backwaters suspends through heavy-rain weeks. Karian Shola trekking (₹1,500 per group) suspends. **Closed Monday mornings**.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 7, 1, 'skip',
  'Peak SW monsoon. 17-24C, 500-800mm rainfall. Most zones closed. Topslip-Pollachi road erratic. Skip.',
  NULL,
  'July is the year''s wettest stretch at Anamalai — 500-800mm rainfall, most safari zones closed, Topslip-Pollachi road closures frequent, sighting odds at year-low. The Anamalai trip cannot happen until October. Skip.',
  'Anamalai Tiger Reserve in July is the year''s wettest month. Rainfall 500-800mm at the 800m Topslip elevation across 26-28 wet days; the western Anamalai face catches sustained SW monsoon force. Daytime 21-24C, nights 17-20C with constant rain and 95 percent humidity. Most safari zones close under TN Forest Department safety protocols — the Sholayar-end loop, the higher-elevation Karian Shola interior trails, the Parambikulam-side backwaters all suspended. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle) operations reduce to a 1-loop alternate-day schedule on the main Topslip-Anaikatti road only; sighting odds drop to 1-in-50 — Bengal Tiger, Asiatic Elephant, Indian Gaur all disperse into dense forest cover with water everywhere. The Topslip-Pollachi 35km road closes 2-3 days per week under TN PWD landslide-clearance schedules. Bamboo rafting and Karian Shola trekking suspended. Forest rest houses (Ambuli, Mount Stuart, Topslip Lodge) at year-low bookings — only research-permit visitors typically active. **Closed Monday mornings** (in addition to the rain closures). Pollachi hotels (35km, 1 hour) at year-low ₹1,500-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 8, 1, 'skip',
  'SW monsoon continues. 17-24C, 400-600mm rainfall. Most zones still closed. Wait for October.',
  NULL,
  'August holds the July pattern — 400-600mm rainfall, most safari zones still closed under TN Forest Department safety protocols, road closures continue, sighting odds at year-low. Wait for October return to full operations.',
  'Anamalai Tiger Reserve in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 400-600mm across 24-26 wet days at the 800m Topslip elevation. Daytime 21-24C, nights 17-20C with 90 percent humidity and consistent overcast. Most safari zones remain closed — the Sholayar-end loop, the higher-elevation Karian Shola interior trails, the Parambikulam-side backwaters all suspended under TN Forest Department safety protocols. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle) operations remain on the reduced 1-loop alternate-day schedule on the main Topslip-Anaikatti road only; sighting odds 1-in-50. Bengal Tiger, Asiatic Elephant, Indian Gaur all dispersed in dense forest cover. The Topslip-Pollachi 35km road closures 1-2 days per week. Bamboo rafting and Karian Shola trekking suspended. Forest rest houses (Ambuli, Mount Stuart, Topslip Lodge ₹1,200-2,500/night) continue at low bookings. **Closed Monday mornings**. Independence Day (Aug 15) brings some weekend bookings from Coimbatore-Pollachi families but most leave underwhelmed by rain-impacted safari quality. Pollachi hotels (35km, 1 hour) at year-low ₹1,500-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 9, 2, 'wait',
  'SW monsoon retreats slowly. 17-25C, 250-400mm rainfall. Reduced operations. October is the cleaner call.',
  'September is the recovery month but SW monsoon holds the first fortnight. 250-400mm rainfall, reduced safari zones, road still landslide-watch. Wait for October when full operations resume.',
  'September is on the way back at Anamalai but the SW monsoon holds the first fortnight — 250-400mm rainfall, safari zones reopen only late month, the Topslip-Pollachi road still landslide-watch through Sep 20. Wildlife still dispersed in dense forest cover. October is the cleaner call when full operations resume.',
  'Anamalai Tiger Reserve in September is the soft re-opening but with the first fortnight still under SW monsoon influence. Rainfall 250-400mm across 18-22 wet days at the 800m Topslip elevation, most in the first three weeks. Daytime 22-25C, nights 17-19C, humidity dropping toward 85 percent. Safari zones reopen gradually — the Sholayar-end loop and Karian Shola interior trails return to schedule from Sep 20-25 under TN Forest Department clearance. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle) returns to a full 2-zone batch schedule from mid-September. Bengal Tiger, Asiatic Elephant, Indian Gaur, Lion-tailed Macaque (IUCN endangered) sightings remain low through the first fortnight as wildlife stays dispersed. Bamboo rafting on Parambikulam backwaters resumes from Sep 25 on partial schedule. Karian Shola trekking (₹1,500 per group, dawn slot) returns mid-month. **Closed Monday mornings**. The Topslip-Pollachi 35km road stabilises in the third week. Forest rest houses (Ambuli, Mount Stuart, Topslip Lodge ₹1,200-2,500/night) at light bookings. Pollachi hotels (35km, 1 hour) at off-season rates.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 10, 4, 'go',
  'Season opens. 16-25C, 150-250mm rainfall. Full safari operations resume. Wildlife returning to patterns.',
  'October is the proper season opener at Anamalai. All safari zones reopen, wildlife returning to predictable patterns. NE monsoon residual brings evening showers but daytime mostly clear. Closed Monday mornings.',
  NULL,
  'Anamalai Tiger Reserve in October is when the 958 sq km Reserve returns to full operations. Daytime 22-25C, nights 16-19C, rainfall 150-250mm mostly the first 10 days as the SW monsoon retreats from the Anamalai face, humidity dropping toward 75 percent. All safari zones reopen under TN Forest Department schedule — the Sholayar-end loop, the higher-elevation Karian Shola interior trails, the Parambikulam-side backwaters all operational. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) at full daily schedule from Oct 1. Sighting odds returning — Bengal Tiger sightings 1-in-25 safaris (climbing through Nov-Apr to 1-in-10 peak), Asiatic Elephant herds, Indian Gaur, Sambar, Sloth Bear, Leopard returning to predictable patterns as water sources start consolidating. Lion-tailed Macaque (LTM, IUCN endangered, central-Anamalai sub-population) at Karian Shola trail at improving visibility. Bamboo rafting (₹1,000-1,500 per group, dawn 6am slot) at full schedule. Karian Shola trekking (₹1,500 per group, dawn slot) at full schedule. **Closed Monday mornings**.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 11, 4, 'go',
  'High season builds. 14-24C. Wildlife visibility improving. Rates climb 15 percent through month. Closed Monday mornings.',
  'November is the genuine pivot to Anamalai high season. NE monsoon residual under 80mm, wildlife visibility improving, safari batches at full demand. Rates climb 15 percent as Christmas-week traffic begins booking. Closed Monday mornings.',
  NULL,
  'Anamalai Tiger Reserve in November is when the wildlife visibility returns to peak patterns. Northeast monsoon residual eases to under 80mm across 5-7 wet days, almost all in the first 10 days. Daytime 20-24C, nights 14-17C, humidity dropping under 70 percent. Water sources start consolidating but still abundant, Bengal Tiger and Asiatic Elephant sightings still 1-in-20 safaris (climbing to 1-in-12 by March). Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) at full daily schedule with 60-day booking via Wildlife Warden Pollachi getting tighter through the month. Bamboo rafting on Parambikulam backwaters (₹1,000-1,500 per group, dawn 6am slot only) at year-clearest water. Karian Shola trekking (₹1,500 per group, dawn slot only) at year-best forest visibility — Lion-tailed Macaque (LTM, IUCN endangered, central-Anamalai sub-population), Nilgiri Langur sightings frequent. Indian Gaur, Sloth Bear, Leopard returning to predictable patterns. **Closed Monday mornings**. Birdlife 250+ species at full concentration — Great Hornbill, Malabar Trogon, Sri Lanka Frogmouth on the trail.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('anamalai', 12, 4, 'go',
  'Peak Anamalai. 13-24C. Forest rest houses book 6-8 weeks ahead. Christmas-NY rates climb 20 percent. Closed Monday mornings.',
  'December is reliable but Anamalai stays cooler and more accessible than crowded peak months. Christmas-NY rates climb 20 percent at forest rest houses. Wildlife visibility holding strong. Closed Monday mornings.',
  NULL,
  'Anamalai Tiger Reserve in December is the year''s most coherent operational window. Daytime 20-24C, nights 13-16C, rainfall under 30mm, humidity 70 percent. Christmas-NY week (December 22 to January 5) is the tight booking stretch: forest rest houses (Ambuli, Mount Stuart, Topslip Lodge ₹1,200-2,500/night) book 6-8 weeks ahead through the Wildlife Warden Pollachi office; rates hold (TN Forest Department doesn''t price-discriminate seasonally). Pollachi hotels (35km, 1 hour) climb 20 percent: ₹3,000-7,000. Jeep safari (Forest Department, ₹2,500-4,500 per vehicle, 6:30-9am and 3:30-5:30pm batches) at year-busiest — 60-day booking window opens at midnight via the Wildlife Warden, peak weeks sell out in 2-3 days. Bengal Tiger sighting odds 1-in-18 safaris (climbing to 1-in-12 by March-April), Asiatic Elephant herd encounters frequent, Indian Gaur, Sloth Bear, Sambar, Leopard sightings at strong concentration as water sources shrink. Lion-tailed Macaque (LTM, IUCN endangered, central-Anamalai sub-population) on Karian Shola trail at year-best winter visibility. Nilgiri Langur, Great Hornbill, Malabar Trogon, Sri Lanka Frogmouth birdlife.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
