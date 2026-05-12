-- Rajahmundry destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: rajahmundry

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 1, 5, 'go',
  'Peak Godavari window. 19-29C, dry. Sankranti Jan 14-16. Papikondalu boat trip at year-best clarity.',
  'January is when Rajahmundry runs at year-best. Daytime 27-29C, nights 19-21C, sub-30mm rain. Sankranti cluster (Jan 14-16). Papikondalu boat trip (60km upstream Godavari gorge) clear-weather day-cruise at full schedule. Pootharekulu GI sweet at peak production.',
  NULL,
  'Rajahmundry in January is the version Andhra-Godavari veterans book first. Daytime 27-29C, nights 19-21C, rainfall under 30mm, humidity at 65 percent. The Papikondalu boat trip (60km upstream Godavari gorge — the river narrows between 200-300m basalt cliffs through the Polavaram-Papikondalu Eastern Ghats stretch) runs at clear-weather full schedule: AP Tourism and private operators (₹500-800 per head full-day, departure 7am from Pattiseema or Rajahmundry, return 6pm) cruise upstream through Pattiseema, Polavaram, Papikondalu and Perantapalli villages with stops at the Buddhist-era ruins and tribal-koya hamlets. Sankranti (January 14-16, Andhra harvest cluster) brings the festive overlay. The Atreyapuram village 30km away (the GI-protected origin of Pootharekulu — paper-thin rice-paper sweet folded around sugar, ghee and nuts, made by skilled women on hot inverted earthen pots) at year-peak production for the wedding-season cycle. Markandeya Swamy Temple and ISKCON Rajahmundry both at full ritual hours. Hotel rates at peak: Anand Regency ₹3.5-5k, Asoka Hotel ₹2.5-3.8k, Hotel Taj Inn ₹2-3k, family lodges ₹1.2-2k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 2, 5, 'go',
  'Driest stretch. 20-31C. Papikondalu boat at peak clarity. Godavari sandbar walks. Pootharekulu wedding season.',
  'February holds January cleanliness. Rainfall under 15mm. Papikondalu day-cruise at year-peak clarity (water clear, weather smooth). Pootharekulu wedding-season output at peak. Hotel rates ease 15 percent off January.',
  NULL,
  'February in Rajahmundry is the technical peak. Rainfall under 15mm, daytime 29-31C, nights 20-22C, humidity at 60 percent — the lowest of the year. The Papikondalu boat trip (60km upstream Godavari gorge) at year-peak clarity — water visibility through the gorge stretch is best in February before the upstream silt patterns shift. AP Tourism and private operators run 4-6 boats daily through the month; book 4-7 days ahead, ₹500-800 per head full-day. The cruise route — Pattiseema, Polavaram, Papikondalu, Perantapalli — gets the cinematic Eastern Ghats cliff-gorge approach in the morning light. The Atreyapuram village 30km away holds the Pootharekulu GI cluster at peak wedding-season output (Pootharekulu — the paper-thin rice-paper sweet folded around sugar/jaggery/ghee/nuts, GI-tagged 2021 — is made by women across 60+ family units in Atreyapuram alone). Markandeya Swamy Temple, ISKCON Rajahmundry, Annavaram Sri Veera Venkata Satyanarayana Swamy (45km north) all at full ritual hours. Hotel rates ease 15 percent off January: Anand Regency ₹3-4.5k, Asoka ₹2.2-3.5k, Hotel Taj Inn ₹1.8-2.6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 3, 4, 'go',
  'Last cool month. 23-33C. Papikondalu water clear but heat builds. Hotel rates 20 percent below February.',
  'March is the soft-landing month. Daytime climbs past 32C the last fortnight. Papikondalu boat trip still at clear-water clarity but dawn departure recommended. Pootharekulu production continues. Last clean window before April heat.',
  NULL,
  'March in Rajahmundry is the transition month. Daytime 31-33C, nights 23-24C, humidity climbing to 70 percent, rainfall under 30mm. The Papikondalu boat trip continues to run at clear-water visibility but the cruise comfort window compresses — dawn departure (6:30-7am) becomes mandatory for the cool-water cruise back by 5pm before the peak heat hour. The Eastern Ghats cliff-gorge stretch through Papikondalu and Perantapalli holds 3-4C cooler air than open downstream — the upside of the cruise design. Pootharekulu production at Atreyapuram continues through March. ISKCON Rajahmundry and Markandeya Swamy Temple morning darshan 5-11am the only viable slot. Annavaram (45km, hilltop temple) walkable dawn-and-dusk. Godavari river bridge walks compress to 6-9am and 6-9pm. Hotel rates ease 20 percent off February: Anand Regency ₹2.5-4k, Asoka ₹2-3k, Hotel Taj Inn ₹1.5-2.2k. The last clean-value window before April-May humidity stress forces the trip into AC retreat. ISKCON Rajahmundry, Annavaram darshan and the Pootharekulu village visit work as a 3-day trip with Papikondalu day cruise as the anchor.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 4, 3, 'wait',
  'Pre-monsoon. 26-36C, humidity 78 percent. Papikondalu cruise dawn-only. Sri Rama Navami nearby Bhadrachalam.',
  'April pushes the trip narrow. Papikondalu cruise works dawn only. Sri Rama Navami at Bhadrachalam (90km north on the Godavari, the festival anchor for Andhra-Telangana Rama pilgrimage) draws regional pilgrims. AC retreats handle mid-day.',
  'April pushes Rajahmundry into pre-monsoon stress. Papikondalu cruise comfortable only dawn-noon. Outdoor walks unsafe through midday. Wait for October.',
  'April in Rajahmundry is when the Godavari-gorge trip narrows to early morning. Daytime 33-36C, nights 26-27C, humidity 78 percent, sea breeze unavailable inland. Pre-monsoon thunderstorms hit the last fortnight — short squalls drop temperatures 3-4 degrees temporarily but raise humidity to 90 percent. The Papikondalu boat trip works only as 6:30am departure, 1pm return — operators continue running but with reduced passenger load and AC car return logistics on the Pattiseema-to-Rajahmundry leg. The Eastern Ghats gorge stretch (the upper cruise leg through Papikondalu and Perantapalli) holds 3-4C cooler air than Rajahmundry city; the cruise itself is the AC retreat. Sri Rama Navami (chaitra-shukla-navami, typically falls in April) at Bhadrachalam upstream — Sita-Rama-Lakshmana temple on the Godavari, 90km from Rajahmundry, the largest Rama-pilgrimage temple in Andhra-Telangana — draws regional pilgrims; ferry-and-darshan slots tighten through the festival week. Pootharekulu production continues at Atreyapuram. Outdoor temple walks (ISKCON, Markandeya Swamy, Pushkar Ghat) collapse to 6-9am and 6-8pm. October-March is the proper window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 5, 2, 'wait',
  'Peak heat. 27-37C, humidity 80 percent. Pre-monsoon Asani-class cyclone risk. Outdoor trip closed.',
  'May functions only for AC-anchor tolerance. Pre-monsoon thunderstorms third week. East-coast cyclone risk window opens. Papikondalu cruise dawn-only. Push to October.',
  'May in Rajahmundry pairs peak heat with pre-monsoon cyclone-cell risk on the Godavari coast. Outdoor walks unsafe except dawn. Papikondalu cruise dawn-only. October is dramatically better.',
  'May in Rajahmundry is the closing month before the southwest monsoon arrives in early June. Daytime 35-37C, humidity 80 percent, sea breeze unreliable inland. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls drop temperatures 4-5 degrees temporarily but raise humidity to 90 percent. The early-cyclone risk window (Bay of Bengal pre-monsoon cyclogenesis) is small but present — Asani made landfall on the AP-Odisha coast May 11, 2022. IMD watch via mausam.imd.gov.in is standard practice. The Papikondalu boat trip works only dawn-departure with reduced passenger load. The Eastern Ghats gorge stretch still gives 4-5C cooler air than downstream but the journey to-and-from the cruise points heats up by 9am. Outdoor temple walks (ISKCON, Markandeya, Pushkar Ghat) functional only 5-7am and 7-9pm. The Atreyapuram village Pootharekulu production runs through but workshop visits become uncomfortable. Hotel rates at year-low: Anand Regency ₹1.8-3k, Asoka ₹1.5-2.5k, Hotel Taj Inn ₹1.2-2k. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 6, 2, 'wait',
  'SW monsoon arrives. 26-32C, 200-250mm. Godavari volume builds. Papikondalu cruise interrupted by rain.',
  'June is monsoon arrival on the Godavari basin. Rainfall 200-250mm. Papikondalu cruise works intermittently in clear windows. Godavari volume builds through July — cruise water level climbing back. Wait for October.',
  'June is the SW monsoon arrival. Cruise schedule interrupted. Outdoor walks rain-blocked. October delivers a cleaner Godavari trip.',
  'June in Rajahmundry is the SW monsoon arrival on the Godavari basin. The southwest current hits the AP coast around June 1-5 — IMD declares formal monsoon onset annually. Rainfall jumps from May''s 60mm to 200-250mm across 14-16 wet days; the Godavari river volume builds through June into July-August as upper-catchment rains across Maharashtra and Karnataka feed downstream through Polavaram. Daytime 28-32C feels cooler against May but 86 percent humidity and intermittent sustained downpours close down the open-water Papikondalu cruise. Operators run reduced schedules in clear windows. The upstream gorge stretch through Papikondalu and Perantapalli stays accessible by clear-weather mid-week trips. ISKCON Rajahmundry and Markandeya Swamy Temple darshan continue. Outdoor walks (river bridges, Pushkar Ghat) rain-interrupted. Pootharekulu production at Atreyapuram pauses for the rice-paper drying step (the sweet needs dry humidity for the paper to hold; the production cycle slows June-Sep). Hotel rates at year-low: Anand Regency ₹1.8-2.8k, Asoka ₹1.5-2.3k. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 7, 1, 'skip',
  'Peak SW monsoon. 26-31C, 250-300mm. Godavari at flood-watch. Papikondalu cruise suspended. Pootharekulu paused.',
  NULL,
  'July is the wettest stretch. Rainfall 250-300mm. Godavari river at flood-watch. Papikondalu cruise suspended. Pootharekulu production paused. The trip is closed. Skip.',
  'July in Rajahmundry is monsoon at its operational worst. Rainfall averages 270mm across 20-23 wet days, often as sustained 6-12 hour downpours. The Godavari river runs at flood-watch level through the month — upper-catchment storms across Maharashtra and Karnataka send sediment-heavy water through the Polavaram-Pattiseema diversion and into the lower Godavari basin. AP Tourism and private Papikondalu cruise operations suspended through July for safety — high water-level and submerged cliff-formations through the gorge stretch make navigation unsafe. ISKCON Rajahmundry and Markandeya Swamy Temple darshan continue (indoor sanctums roofed). Outdoor walks impossible. Pootharekulu production at Atreyapuram pauses (the rice-paper drying step needs dry-air conditions). Hotel rates at year-low: Anand Regency ₹1.5-2.5k, Asoka ₹1.3-2k, Hotel Taj Inn ₹1-1.7k. The Godavari river bridge walks and Pushkar Ghat both rain-flooded. The trip you came for — Godavari gorge cruise, Pootharekulu village, temple-and-ghat circuit — is functionally closed. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 8, 1, 'skip',
  'Monsoon continues. 26-31C, 200-250mm. Godavari high. Cruise suspended. Pootharekulu paused.',
  NULL,
  'August holds July''s pattern. 200-250mm rain. Godavari at flood-watch. Cruise suspended. Pootharekulu production paused. Skip. Hotel rates at year-low but the trip shape collapses.',
  'August in Rajahmundry stays in monsoon mode across the Godavari basin. Rainfall 200-250mm across 18-22 wet days, daytime 28-31C, humidity 87 percent. Upper-catchment rains continue to feed the Godavari at flood-watch level. Papikondalu cruise operations remain suspended. ISKCON Rajahmundry and Markandeya Swamy Temple darshan continue. Outdoor walks rain-interrupted. Pootharekulu production at Atreyapuram remains paused through monsoon. Annavaram (45km north) hilltop temple darshan continues but rain-affected. Hotel rates at year-low: Anand Regency ₹1.5-2.5k, Asoka ₹1.3-2k. The next clean window opens in mid-October. Cyclone-track watch via mausam.imd.gov.in continues — September-October is the peak Bay of Bengal cyclone window for the east coast. The Godavari Pushkaralu (every 12 years at Rajahmundry, last July 2015 — 12-day mass-bath, next July 2027) is the city''s defining event; 2026 is not a Pushkaralu year and the city runs as a normal Godavari-trade hub.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 9, 4, 'go',
  'SW monsoon retreat. 25-31C, 150-200mm. Godavari volume peaks. Papikondalu cruise at year-best water clarity.',
  'September is the late-monsoon transition with one specific upside — Godavari runs at year-peak volume. Papikondalu cruise resumes second half at best-water-level. AP Tourism boats return. Cyclone-watch active. This is the cruise-specific peak month.',
  NULL,
  'September in Rajahmundry is the late-monsoon transition with the Papikondalu cruise specific upside — the Godavari river runs at year-peak volume through the second half, making the upstream gorge cruise (60km upstream into the Eastern Ghats narrows through Papikondalu and Perantapalli) genuinely cinematic. The water level peaks in September-October before the Polavaram-Pattiseema lift-irrigation diversions reduce downstream flow in winter. AP Tourism and private operators (₹500-800 per head full-day, departure 7am from Pattiseema or Rajahmundry, return 6pm) return through the second half once water-level and weather stabilise. Daytime 28-31C, humidity 80 percent dropping to 75 by month-end, rainfall 150-200mm across 13-15 wet days. The southwest monsoon retreats from the AP coast around September 25-30. ISKCON Rajahmundry and Markandeya Swamy Temple darshan continue. Pootharekulu production at Atreyapuram resumes mid-month. Sep-Oct is also the peak Bay of Bengal cyclone window — IMD watch via mausam.imd.gov.in mandatory. Specific edge — cruise-focused travelers should consider September even over the December-January peak window for water-volume alone.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 10, 4, 'go',
  'Season opens. 23-31C. Cyclone-watch first fortnight. Papikondalu cruise at full schedule. Dussehra.',
  'October is the season opener. First 10-15 days carry cyclone-watch (Hudhud anniversary Oct 12). Beyond that, Papikondalu cruise full schedule, Pootharekulu production back, Dussehra temple-festival cluster. Rates 25 percent below January.',
  NULL,
  'October in Rajahmundry is the proper return to coherent. Rainfall drops to 100-150mm with the bulk falling in the first ten days; from October 15 onward the city flips into clean Godavari-cruise-and-heritage mode. Daytime 28-31C, humidity falling from 80 to 73 percent. The first fortnight carries the Bay of Bengal cyclone risk (Hudhud landed Vizag Oct 12, 2014; Phailin hit Odisha-AP coast Oct 12, 2013) — IMD watch mandatory October 5-20. Beyond that, Papikondalu cruise at full schedule with water-level still at high-volume peak before winter low-flow. Pootharekulu production at Atreyapuram returns to wedding-season tempo. ISKCON Rajahmundry, Markandeya Swamy Temple, Annavaram (45km) at full ritual hours. Dussehra / Sharadiya Navratri (9 nights, typically late September to mid-October on Telugu lunar calendar) — Rajahmundry''s smaller-scale Dussehra processions through the Patnam-Mara and Godavari ghat areas. Godavari river bridge walks and Pushkar Ghat return to walkability. Strong call for first-time visitors who want full Papikondalu cruise hours minus December-January crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 11, 5, 'go',
  'Peak window opens. 21-30C, sub-50mm rain. Papikondalu at full clarity. Karthika Masam. Pootharekulu wedding peak.',
  'November is the year''s second-peak month. Rainfall under 50mm, full Papikondalu cruise, Pootharekulu wedding-season production at peak. Karthika Pournami brings deepam lighting at temples. Hotel rates 25 percent below December-January.',
  NULL,
  'November in Rajahmundry is the year''s second-peak month behind January. Rainfall under 50mm, daytime 27-30C, sea breeze cooling evenings to 21-22C, humidity dropping below 70 percent. The Bay of Bengal cyclone risk falls sharply after October 25. The Papikondalu boat trip at near-peak conditions — water clarity excellent through the Eastern Ghats gorge, water-level still close to high-volume mark before December winter low-flow begins. AP Tourism and private operators run 4-6 boats daily; book 3-5 days ahead. The Pootharekulu village at Atreyapuram (30km, GI-tag rice-paper sweet) at peak wedding-season production — collectors and the family-run units run 7-day weeks through November-January for the December wedding cluster. Karthika Masam (mid-November to mid-December) brings mass deepam (oil-lamp) lighting at the Godavari-basin Shiva temples; Karthika Pournami (full moon, mid-month) the peak night. ISKCON Rajahmundry, Markandeya Swamy, Annavaram all at full ritual hours. Godavari river bridge walks and Pushkar Ghat at full walkability. Hotel rates climb to 80 percent of January peak: Anand Regency ₹3-4.2k, Asoka ₹2.3-3.3k, Hotel Taj Inn ₹1.7-2.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'rajahmundry', 12, 5, 'go',
  'Peak season. 20-29C, dry. Christmas-NYE rates 1.5-2x. Papikondalu winter-low water level. Late-Dec cyclone outliers.',
  'December is when Rajahmundry runs at full capacity. Rates 1.5-2x in Christmas-NYE corridor. Papikondalu cruise still runs but water-level drops to winter-low. Pootharekulu at year-peak. Late-season cyclones possible (Michaung Dec 2023).',
  NULL,
  'December in Rajahmundry is the operational peak for the Godavari-and-Pootharekulu trip. Daytime 27-29C, nights 20-21C, rainfall under 25mm. The Papikondalu boat trip continues at full schedule but Godavari water-level transitions to winter-low through the month as upstream Polavaram-Pattiseema diversions reduce downstream flow — September-October were the water-volume peaks; December water clarity remains good but cruise time through the gorge can shorten as some shallow stretches require slower passage. AP Tourism and private operators continue daily departures from Pattiseema and Rajahmundry. The Pootharekulu village at Atreyapuram (30km, GI-tag, paper-thin rice-paper sweet) at year-peak production for the December wedding cluster — every active family unit running 7-day weeks. ISKCON Rajahmundry, Markandeya Swamy, Annavaram all at peak ritual hours. Recent late-season cyclones — Mandous (December 2022); Michaung (December 5-6, 2023, made landfall near Nellore, brushed the Godavari delta with heavy rain) — are reminders that Bay of Bengal cyclogenesis extends into December. First three weeks of December are the better-value window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
