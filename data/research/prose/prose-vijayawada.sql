-- Vijayawada destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: vijayawada

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 1, 5, 'go',
  'Peak Krishna river window. 19-29C. Sankranti kite-flying takes over the city. Kanaka Durga darshan at full tempo.',
  'January is when Vijayawada runs at year-best. Daytime 27-29C, nights 19-21C, sub-30mm rain. Sankranti (Jan 14-16) brings kite-flying takeover of the city — rooftops across Patamata, Benz Circle and Krishna Lanka. Kanaka Durga Temple darshan smooth. Bhavani Island boats running cleanly.',
  NULL,
  'Vijayawada in January is the version Andhra commercial-capital veterans book first. Daytime 27-29C, nights 19-21C, rainfall under 30mm, humidity at 65 percent. The Kanaka Durga Temple on Indrakeeladri hill (the goddess Durga in her Kanaka form, said to have been worshipped here from Mahabharata-era references — the temple''s current structure is medieval-Vijayanagara-era) runs full ritual hours 4am-1pm and 4pm-9pm; the 530-step climb from the foothills and the parallel ropeway (₹100 return) both operate; Saturday-Sunday darshan queues run 2-3 hours via free line, ₹100 quick darshan trims to 30-45 minutes. Sankranti (January 14-16, Andhra harvest cluster — Bhogi bonfires Jan 14, Pongal/Sankranti Jan 15, Kanuma cattle-worship Jan 16, Mukkanuma family-day Jan 17) brings the rooftop kite-flying takeover of the city — every patamata, Benz Circle and Krishna Lanka neighbourhood rooftop runs kites dawn to dusk through the 3-day cluster. Hotel rates at peak: Novotel ₹8-11k, The Gateway ₹9-12k, mid-bracket ₹3-5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 2, 5, 'go',
  'Driest stretch. 21-31C. Maha Shivaratri occasional. Temple-and-river walks at year-peak comfort.',
  'February holds January cleanliness. Rainfall under 15mm, daytime 29-31C. Maha Shivaratri (Feb 14, 2026) draws temple crowds. Hotel rates ease 15 percent off January. Krishna Pushkaralu next 2028 — not 2026.',
  NULL,
  'February in Vijayawada is the technical peak. Rainfall under 15mm, daytime 29-31C, nights 21-22C, humidity at 60 percent — the lowest of the year. Maha Shivaratri (February 14, 2026 — verify Telugu panchang for exact date) draws regional pilgrim traffic to the Shiva temples across the city; the bigger draws are Srisailam (165km west, the Mallikarjuna Jyotirlinga) and Srikalahasti (340km south, the Vayu Pancha Bhoota Stalam), with Vijayawada functioning as the rail/road base. Kanaka Durga Temple darshan at smooth tempo through the month; the Indrakeeladri hill ropeway runs clean weather right through. Bhavani Island boats and the Prakasam Barrage walkway both at year-peak access. Undavalli Caves (8km southwest, 4th-century rock-cut Hindu-Buddhist-Jain syncretism, 5m Anantha Padmanabha Swamy reclining Vishnu monolith — the largest single-stone idol in India) at full walkability. The Krishna Pushkaralu (every 12 years at Vijayawada, last Aug 2016, next 2028 — not 2026) is the city''s defining mass-bath event but February 2026 sits in a normal Krishna-river year. Aksharam, Ulavacharu, RR Restaurant (Andhra meals) at full tempo.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 3, 4, 'go',
  'Last cool month. 23-34C. Temple walks compress to mornings. Hotel rates 20 percent below February.',
  'March is the soft-landing month. Kanaka Durga ropeway works full day, but hill-climb 530 steps compress to dawn/dusk. Bhavani Island and Undavalli Caves work mornings. Last clean window before April humidity.',
  NULL,
  'March in Vijayawada is the transition month. Daytime 32-34C, nights 23-24C, humidity climbing to 68 percent, rainfall under 25mm. The Kanaka Durga Temple 530-step climb compresses to 5-9am and 5-8pm; the ropeway (₹100 return, 8am-8pm) handles the noon-and-afternoon traffic in AC cabin. Indrakeeladri hilltop darshan and the temple precincts walkable through the day for the last time of the year. Bhavani Island boats run 8am-6pm but the comfortable boat-time and island-walking slots compress to 9am-noon and 4-6pm. Undavalli Caves (8km southwest) work pre-11am and post-5pm — the rock-cut chambers stay cool but the outdoor stair climb to the 4-level cliff face heats up by noon. Prakasam Barrage walkway functional 6-9am and 6-9pm. Hotel rates ease 20 percent off February: Novotel ₹6-8k, The Gateway ₹7-9k, mid-bracket ₹2.5-3.5k. The last clean-value window before the April-May humidity dome forces the trip into AC retreat mode. Babai biryani at peak, Aksharam for the Chettinad shift, Ulavacharu still the signature curry-with-pickle anchor. The Vijayawada-as-base play for Amaravati (35km), Undavalli, Pedana Kalamkari (70km) and Konaseema delta still works.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 4, 2, 'wait',
  'Pre-monsoon dome. 26-37C, humidity 75 percent. Kanaka Durga ropeway only. Outdoor walks impossible mid-day.',
  'April pushes the trip narrow. Hill-climb impossible. Ropeway cabin only viable temple-route. AC car retreat for Undavalli/Bhavani Island day trips. October is dramatically better.',
  'April pushes Vijayawada into pre-monsoon dome. Outdoor walks impossible 10am-5pm under 35-37C. Kanaka Durga 530-step climb unsafe. Temple-and-river trip works only at dawn/dusk. October-March is the proper window.',
  'April in Vijayawada is when the trip narrows to early morning, evening, and AC venues. Daytime 35-37C, nights 26-27C, humidity 75 percent, sea breeze unavailable inland. The Kanaka Durga 530-step climb becomes unsafe 10am-5pm; the ropeway (AC cabin) handles temple access. Bhavani Island boats run but the island walking is dawn-and-dusk only. Undavalli Caves (8km) and Amaravati (35km, the Buddhist heritage and new-capital city) work only at AC-car day-trip pattern with cave-and-museum interior as anchors. Prakasam Barrage walkway functional 6-8am and 7-9pm only. Pre-monsoon thunderstorms hit the last fortnight — short squalls that drop temperatures 3-4 degrees temporarily but raise humidity to 88 percent. Hotel rates run 30-35 percent below January: Novotel ₹5-7k, The Gateway ₹6-8k, mid-bracket ₹2-3k. Weekday occupancy under 50 percent. AC retreat options: Novotel and Gateway lobby lounges, mall complexes (Trendset, PVP Square), the Indo-Saracenic Pranavalaya museum, Andhra Pradesh State Museum. October-March is the proper window for the temple-and-river-walks trip Vijayawada is built for.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 5, 2, 'wait',
  'Peak heat. 27-39C, humidity 78 percent. Hottest city in Andhra. Outdoor trip closed.',
  'May functions only for AC-anchor business travelers. Vijayawada hits 39-40C — Andhra''s hottest non-Rayalaseema major city. Pre-monsoon thunderstorms third week. Wait for October.',
  'May in Vijayawada pushes to year-extreme heat. Daytime 37-39C, humidity 78 percent. Andhra''s hottest non-Rayalaseema major city. Outdoor temple-and-river walks unsafe except dawn. October is dramatically better.',
  'May in Vijayawada is the closing month before the southwest monsoon arrives in early June. Daytime 37-39C, occasional 40-42C peaks the second-third week, nights 28-29C, humidity 78 percent — Vijayawada is Andhra''s hottest non-Rayalaseema major city (the Krishna river basin and Indrakeeladri hill mass amplify heat retention). Sea breeze inland is essentially unavailable through midday. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls drop temperatures 4-5 degrees temporarily but raise humidity to 90 percent. The Kanaka Durga 530-step climb closed in practice except 5-7am. Ropeway cabin runs but mid-day cabin temperature climbs. Bhavani Island boats run with reduced passenger load. Undavalli Caves dawn-only. Prakasam Barrage walkway functional only 5-7am and 7:30-9pm. Hotel rates at year-low: Novotel ₹4-6k, The Gateway ₹5-7k, mid-bracket ₹1.5-2.5k. The Vijayawada-as-base play for nearby heritage (Amaravati, Undavalli, Pedana, Lepakshi) collapses — AC car retreats are the only viable shape and the destinations themselves shrink. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 6, 2, 'wait',
  'SW monsoon arrives. 26-34C, 150-200mm. Krishna river volume builds. Heritage works in rain windows.',
  'June is monsoon arrival on the Krishna basin. 150-200mm rainfall. Krishna river volume builds through July. Heritage works intermittently between rain. Temple walks rain-interrupted. October is materially cleaner.',
  'June is monsoon arrival without the cleanup yet. Krishna river volume builds, river-walks slow, heritage-cave damp. October is materially cleaner for the temple-and-river trip Vijayawada is built for.',
  'June in Vijayawada is the southwest monsoon arrival on the Krishna basin. The SW current hits the AP coast around June 1-5 — IMD declares formal monsoon onset annually. Rainfall jumps from May''s 50mm to 150-200mm across 14-16 wet days; the Krishna river volume builds through June into July as upper-catchment rains across Karnataka and Maharashtra feed downstream. Daytime 30-34C feels cooler against May but 86 percent humidity and intermittent sustained downpours close down the outdoor circuit. Kanaka Durga Temple darshan continues at full hours (the inner-sanctum and main shrine are roofed); the 530-step climb impossible. Ropeway runs through but closes in heavy wind. Bhavani Island boats run reduced schedule; the island walking gets rain-interrupted. Prakasam Barrage walkway functional in clear windows. Undavalli Caves run year-round (rock-cut, naturally cool interior). Amaravati museum (ASI Amaravati Museum, indoor) viable. Hotel rates at year-low: Novotel ₹4-6k, The Gateway ₹5-7k, mid-bracket ₹1.5-2.5k. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 7, 2, 'wait',
  'Peak SW monsoon. 26-31C, 200-250mm. Krishna at flood-watch. Bhavani Island boats suspended. Indoor heritage only.',
  'July is the wettest stretch. Krishna river runs at flood-watch level. Bhavani Island boats and the 530-step climb both off. AC indoor heritage (Undavalli, museums) the only viable shape. October is the next clean window.',
  'July is monsoon peak. Krishna river floods, island closed, hill climb dangerous, river-walks impossible. Indoor-only heritage works (Undavalli, museums) but the trip is essentially closed. October is materially cleaner.',
  'July in Vijayawada is the wettest stretch. Rainfall 200-250mm across 18-20 wet days, daytime 28-31C, humidity 88 percent. The Krishna river runs at flood-watch level through the month as upper-catchment rains release through Almatti, Narayanpur and Srisailam dams downstream into the Vijayawada barrage section. Prakasam Barrage gates open through high-flow weeks. Bhavani Island boats suspended through July-Aug. Kanaka Durga ropeway closes intermittently in high wind. The 530-step hill climb closed. Outdoor walks (Krishna river ghats, Prakasam Barrage walkway, Punnami Ghat) rain-interrupted. Indoor heritage works — Undavalli Caves rock-cut interior (year-round), ASI Amaravati Museum (35km west), AP State Museum, Mary Matha Major Shrine, the various malls and Novotel/Gateway lobby work as AC anchors. Hotel rates at year-low: Novotel ₹4-6k, The Gateway ₹5-7k, mid-bracket ₹1.5-2.5k. The trip shape Vijayawada is built for — temple-river-Bhavani circuit — is largely closed. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 8, 2, 'wait',
  'Monsoon continues. 26-31C, 150-200mm. Krishna Janmashtami draws temple crowds. Island boats suspended.',
  'August holds July''s wet pattern. 150-200mm rain. Krishna Janmashtami brings pilgrim crowds to temples but doesn''t flip the broader trip. Bhavani Island boats suspended. AC indoor heritage works.',
  'August is monsoon continuation with festival overlay. Bhavani Island boats off, hill climb dangerous, river-walks rain-interrupted. Indoor heritage available. October is materially cleaner.',
  'August in Vijayawada stays in monsoon mode across the Krishna basin. Rainfall 150-200mm across 16-18 wet days, daytime 28-31C, humidity 87 percent. The Krishna river continues to run at flood-watch level through August — upper-catchment rains across Karnataka feed downstream. Krishna Janmashtami (typically mid-to-late August, the birth festival of Krishna — Vijayawada''s namesake) brings overnight crowds to the city''s Krishna temples and the major Hindu temple cluster, but doesn''t flip the broader visitor trip given the rain pattern. Kanaka Durga Temple darshan runs full hours. The 530-step climb impossible. Ropeway closes intermittently in high wind. Bhavani Island boats remain suspended. Outdoor walks rain-interrupted. Indoor heritage works — Undavalli Caves, ASI Amaravati Museum, AP State Museum, malls and AC anchor hotels. The Krishna Pushkaralu (every 12 years, last August 2016 — 2016 was the major year, next is 2028, NOT 2026) is the city''s defining mass-bath event. Hotel rates at year-low: Novotel ₹4-6k, The Gateway ₹5-7k, mid-bracket ₹1.5-2.5k. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 9, 3, 'wait',
  'SW monsoon retreat. 25-31C, 100-150mm. Ganesh Chaturthi. Krishna river volume drops. Boats return.',
  'September is the recovery month. SW monsoon retreats through the second half. Ganesh Chaturthi (early Sep) brings the city''s biggest urban festival — 10-day immersion processions to the Krishna river. Bhavani Island boats return second half. Cyclone-watch active.',
  NULL,
  'September in Vijayawada is the recovery month with Ganesh Chaturthi (typically early September, 10-day festival — chaturthi to anantha-chaturdashi) as the city''s biggest urban event. Vijayawada Ganesh idols are among Andhra''s most elaborate — Pandal cluster across Patamata, Krishna Lanka, Benz Circle and Governorpet host 10-50 foot idols, and the visarjan (idol immersion) processions to the Krishna river ghats on the 11th day run all night into dawn. Daytime 28-31C, humidity 80 percent dropping to 75 by month-end, rainfall 100-150mm across 11-13 wet days. The southwest monsoon retreats from the AP coast around September 25-30. Bhavani Island boats return through the second half. Kanaka Durga Temple ropeway runs full schedule; the 530-step climb returns to viability dawn-and-dusk. Undavalli Caves and Amaravati at full access. September-October is the peak Bay of Bengal cyclone window — IMD watch via mausam.imd.gov.in standard. Hotel rates climb 15-20 percent versus August lows but remain 40 percent below January peak: Novotel ₹5-7k, The Gateway ₹6-8k, mid-bracket ₹2-3k. Cycle call: a 3-day visit timed to Ganesh visarjan (the 10-11th day) works for festival-tolerant travelers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 10, 4, 'go',
  'Season opens. 23-31C. Cyclone-watch first fortnight. Dussehra at Kanaka Durga = year-peak temple festival.',
  'October is the season opener. First 10-15 days carry cyclone-watch (Hudhud anniversary Oct 12). Dussehra (Sharadiya Navratri, 9 nights) at Kanaka Durga is the year-peak temple festival — Indrakeeladri hilltop packs 200k+ daily through the 9 nights.',
  NULL,
  'October in Vijayawada is the proper return to coherent and the year-peak temple festival window. Dussehra / Sharadiya Navratri — 9 nights celebrating the goddess Durga''s 9 manifestations — at Kanaka Durga Temple is the year''s biggest temple festival in Vijayawada. Indrakeeladri hilltop packs 200,000+ daily through the 9 nights (typically falls late September to mid-October on Telugu lunar calendar; 2026 cycle verify panchang). Special darshan tickets ₹300-1,000, free line waits 4-8 hours. The 530-step climb runs through the night with full illumination. Daytime 27-31C, humidity falling from 80 to 73 percent. Rainfall drops to 100-150mm with the bulk falling in the first ten days. The first fortnight carries the Bay of Bengal cyclone risk (Hudhud landed Vizag Oct 12, 2014; Phailin hit Odisha-AP coast Oct 12, 2013) — IMD watch via mausam.imd.gov.in mandatory October 5-20. Beyond that, Bhavani Island boats, Prakasam Barrage walkway, Undavalli Caves, Amaravati all return to full access. Hotel rates run 25-30 percent below January peak in non-Navratri week and 1.5-2x peak during the 9 Navratri nights: Novotel ₹6-9k normal / ₹12-16k Navratri, The Gateway ₹7-10k / ₹14-18k Navratri.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 11, 5, 'go',
  'Peak window opens. 21-30C, sub-50mm rain. Karthika Masam. Diwali in early Nov. Hotel rates 25 percent below Dec-Jan.',
  'November is the year''s second-peak month. Rainfall under 50mm, full temple-and-river walks, Diwali early November draws regional travelers, Karthika Masam brings deepam lighting at Kanaka Durga.',
  NULL,
  'November in Vijayawada is the year''s second-peak month behind January. Rainfall under 50mm, daytime 27-30C, nights 21-22C, humidity dropping below 70 percent. The Bay of Bengal cyclone risk falls sharply after October 25. Diwali falls in early November in most years (verify panchang for 2026 — typically late October to mid-November) — Vijayawada lights up with the Andhra-style Diwali aesthetic (rangoli, oil-lamps, family gatherings) but the city''s Diwali isn''t a tourist headline. Karthika Masam (mid-November to mid-December) brings mass deepam (oil-lamp) lighting at the Krishna-basin Shiva and Durga temples; Karthika Pournami (full moon, mid-month) the peak night with the Kanaka Durga precincts lit by thousands of lamps. The 530-step climb works dawn to dusk; ropeway clean. Bhavani Island boats and the Prakasam Barrage walkway at full schedule. Undavalli Caves and Amaravati at peak access. Hotel rates climb to 80 percent of January peak: Novotel ₹7-10k, The Gateway ₹8-11k, mid-bracket ₹2.5-4k. Babai biryani at peak tempo, Aksharam, Ulavacharu, RR Restaurant all running full.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'vijayawada', 12, 5, 'go',
  'Peak season. 20-29C, dry. Christmas-NYE rates 1.5-2x. Late-Dec cyclone outliers possible.',
  'December is when Vijayawada runs at full capacity. Daytime 27-29C, sub-25mm rain. Christmas-NYE corridor rates 1.5-2x. Late-season cyclones possible — Michaung Dec 2023 made landfall near Nellore, brushed Vijayawada with strong winds.',
  NULL,
  'December in Vijayawada is the operational peak and the most expensive stretch of the year. Daytime 27-29C, nights 20-21C, rainfall under 25mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 1.5-2x the November baseline: Novotel hits ₹12-15k, The Gateway ₹13-16k, mid-bracket ₹4.5-6k. Recent late-season cyclones — Mandous (December 9-10, 2022); Michaung (December 5-6, 2023, made landfall near Nellore as severe cyclonic storm, brushed Vijayawada with heavy rain and strong winds) — are reminders that Bay of Bengal cyclogenesis extends into December. IMD watch via mausam.imd.gov.in through the second week is standard practice. Beyond that, Kanaka Durga Temple ropeway and 530-step climb at peak access; Bhavani Island boats at full schedule; Prakasam Barrage walkway clean; Undavalli Caves and Amaravati at peak. Karthika Masam tail through the first half brings continued deepam lighting at temples. The Christmas-Eve services at the Vijayawada Cathedral (St. The first three weeks of December are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
