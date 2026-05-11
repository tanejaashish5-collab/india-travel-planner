-- Chettinad destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: chettinad

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 1, 5, 'go',
  'Peak window + Pongal cluster. 20-30C. Karaikudi mansion walks comfortable. Athangudi tile workshops.',
  'January is when Chettinad runs at peak. NE monsoon retreated, daytime 27-30C, dry. Karaikudi-centred mansion walks workable through full afternoon. The Bangala, Saratha Vilas, Visalam at peak occupancy. Pongal cluster brings local Chettiar-Nattukottai community to ancestral mansions.',
  NULL,
  'Chettinad in January is the year''s peak window. The region — 75 villages around Karaikudi in Sivaganga district, 80km north of Madurai and 75km east of Pudukkottai — sits in the dry inland plains. Daytime 27-30C, nights 20-22C, humidity 60 percent, rainfall under 30mm. The Chettiar-Nattukottai community''s palatial mansions (peak count was ~10,000 in the early 20th century when the Chettiars were the Burma-and-Southeast-Asia trading caste; roughly 2,000 substantial mansions survive today across the 75 villages) workable through full afternoon. The Bangala (Karaikudi heritage hotel — opened 1900s as the Meyappa family''s town residence, restored by Meenakshi Meyappan from the 1990s) and Saratha Vilas (Athangudi heritage stay, restored by the Karaikudi-Athangudi joint owners) and Visalam by CGH Earth (Kanadukathan heritage) at peak occupancy. Athangudi tile workshops (the handmade ceramic tile tradition that supplied the mansion floors) workable through full afternoon — ₹400-800 per tile, factory tour free.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 2, 5, 'go',
  'Driest month. 21-32C. Mansion walks year-best comfort. Rates ease 15 percent off Pongal.',
  'February is the technical peak. Rainfall under 20mm, daytime 28-32C, nights 21-22C. Mansion walks across 75 villages at year-best comfort. Athangudi tile workshops + Burma-teak Italian-marble interior tours.',
  NULL,
  'February in Chettinad is the dry-quarter technical peak. Rainfall under 20mm, daytime 28-32C, nights 21-22C, humidity 58 percent. The 75 Chettinad villages around Karaikudi at year-best mansion-walk comfort. The Bangala (Meenakshi Meyappan''s heritage), Saratha Vilas Athangudi, Visalam by CGH Earth Kanadukathan, Chidambara Vilas Kadiapatti at peak occupancy. Burma-teak pillars (some columns are single Burma-teak trunks 8-9m tall), Italian-marble flooring (Carrara, Belgian, French marbles imported in the 1900s-1920s via the Chettiar shipping network from Rangoon ports), Athangudi tile inlay (the handmade ceramic tile pattern — colour layers poured into iron-mould tile-by-tile, then sun-dried; the workshops in Athangudi village continue the practice), hand-cut Belgian glass cabinets, Italian glazed tiles in the central courtyards. The Karaikudi antique-shopping streets — old kitchen utensils, brass vessels, Athangudi tiles, Burma-teak salvage — at year-best browsing weather. Cooking demos at The Bangala kitchen (Karaikudi style — Pepper chicken, Kozhi Varuval, Kavuni Arisi black rice pudding, Idiyappam) book 2-3 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 3, 4, 'go',
  'Last cool month. 23-35C. Mansion walks compress mid-day. Rates ease 25 percent.',
  'March extends February''s pattern. Daytime climbs past 33C the last fortnight. Mansion walks workable 6-11am and 4-9pm. Rates 25 percent below February — strong value window before April heat dome.',
  NULL,
  'March in Chettinad is the soft-landing month. Daytime 32-35C, nights 23-25C, humidity 65 percent, rainfall under 40mm. The 75 Chettinad villages and Karaikudi-centred mansion-walks workable 6:30-11am and 4-9pm. The mansion interiors stay 4-6C below outside ambient — the 1900s Chettiar architectural vocabulary (high-ceilinged courtyards, the central thinnai porch open to cross-breeze, Athangudi-tile floors that hold cool, Burma-teak pillar shadow patterns) was designed for this exact heat. The Bangala, Saratha Vilas, Visalam, Chidambara Vilas at peak heritage-stay value. Athangudi tile workshop tours workable mornings; the tile-pouring process (colour pigment + cement + lime poured into iron moulds, sun-dried 24-48 hours) functions year-round but is best photographed in March''s dry, cool-morning light. Cooking demos at The Bangala kitchen, Saratha Vilas, Chidambara Vilas at quieter mid-month visitor load. Hotel rates ease 25 percent off February: The Bangala ₹7-10k, Visalam ₹12-18k, Saratha Vilas ₹8-13k, mid-bracket ₹2,500-4k. Last clean-value window before April pushes the mid-day walks past comfort. Karaikudi antique-shopping streets at quietest browsing density.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 4, 2, 'wait',
  'Heat dome. 26-38C. Mansion exteriors mid-day unworkable. Push to October.',
  'April pushes Chettinad past mansion-walk comfort. Daytime 36-38C, mansion-exterior photography compresses to dawn and dusk. Heritage interiors still work as AC-equivalent retreat. Wait for October.',
  'April in Chettinad is the inland-plains heat dome. Mansion-village walks (the trip-defining experience) collapse mid-day. Heritage interiors stay workable but the village-to-village circuit fails. Wait for October.',
  'April in Chettinad is the pre-monsoon heat dome. Daytime 36-38C, nights 26-27C, humidity 65 percent, rainfall under 30mm. The 75-village mansion-walk circuit — the Karaikudi-Kanadukathan-Athangudi-Kadiapatti axis — collapses mid-day. Mansion-exterior photography only workable 6-9:30am and 5-7pm. Heritage interiors (The Bangala, Visalam, Saratha Vilas, Chidambara Vilas) stay 6-8C below outside ambient because the 1900s Chettiar design was built for this heat, but the trip-defining village-to-village walks between mansion clusters fail in 38C noon-3pm. Athangudi tile workshops continue operating but the workshop floor with iron-mould pouring runs 42-44C noon-3pm — photography compressed to 9-11am only. Cooking demos at The Bangala kitchen and the heritage properties still take guests but the kitchen heat compounds the ambient. Hotel rates ease 30 percent off February: The Bangala ₹6-9k, Visalam ₹10-15k, Saratha Vilas ₹7-11k, mid-bracket ₹2-3,500. International visitor load thin; domestic Chettiar-diaspora visits drop sharply (Singapore-Malaysia-Burma diaspora returns to ancestral mansions in winter, not April). October opens the proper return window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 5, 2, 'wait',
  'Heat peak. 27-40C. Village-to-village walks impossible. Hotels at year-low.',
  'May is the inland-plains heat dome at its worst. Daytime 38-40C. Mansion-village circuit non-functional mid-day. Cooking-demo + heritage-interior stays still work as AC-equivalent. October opens the proper window.',
  'May in Chettinad pushes past mansion-walk viability. The Karaikudi-Athangudi-Kadiapatti circuit fails — the village-to-village experience that defines the trip cannot happen. Wait for October.',
  'May in Chettinad is the heat dome peak. Daytime 38-40C, nights 27-28C, humidity 65 percent, rainfall under 50mm but mostly as pre-monsoon thunderstorm bursts that don''t cool the village streets. The 75-village mansion-walk circuit is non-functional mid-day. Mansion-exterior photography only workable 5:30-8am and 6:30-9pm — the same constraint as the temple-walk towns inland (Madurai, Trichy, Srirangam). Heritage interiors (The Bangala, Visalam, Saratha Vilas, Chidambara Vilas) stay at AC-equivalent 30-32C internal thanks to 1900s Chettiar passive-cooling design but the trip-defining village-to-village walks between mansion clusters fail. Athangudi tile workshops continue operating; the workshop floor with iron-mould pouring runs 44-46C noon-3pm. Cooking demos at The Bangala kitchen still work but the kitchen heat compounds. Hotel rates at year-low non-festival: The Bangala ₹5-8k, Visalam ₹9-14k, Saratha Vilas ₹6-10k, mid-bracket ₹1,800-3,000. International visitor load near-zero; domestic load thin.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 6, 3, 'wait',
  'SW spillover eases. 26-37C. Mansion walks workable mornings. Hotels recovering.',
  'June sees a 1-2C ease as SW spillover reaches inland Tamil Nadu. Daytime 35-37C, mornings and evenings workable. The Bangala + heritage-stay properties run interior-immersion programmes. Push to October for the proper Chettinad walk.',
  'June in Chettinad is SW-spillover ease but mid-day temperatures still defeat the village circuit. Heritage stays at value pricing. October is dramatically better.',
  'June in Chettinad is the first easing month. Southwest monsoon spillover reaches inland Tamil Nadu — rainfall 60-80mm across 8-10 wet days, daytime 35-37C, nights 26-27C, humidity 75 percent. The 75-village mansion-walk circuit workable 6-10am and 5-9pm; the Karaikudi-Kanadukathan-Athangudi-Kadiapatti axis returns to half-day viability. Heritage interiors at full comfort. Athangudi tile workshops at the year-coolest workshop-floor temperatures since February. Cooking demos at The Bangala kitchen and the heritage properties workable; the lunch sequence (Pepper chicken, Kozhi Varuval, the Karaikudi-style fish curry, Kavuni Arisi black-rice pudding) at year-best preparation conditions. Hotel rates remain at off-season: The Bangala ₹5-8k, Visalam ₹10-15k, Saratha Vilas ₹7-11k, mid-bracket ₹2-3,500. International visitor load thin; domestic Chettiar-diaspora weekend returns from Bangalore-Chennai resume. October-March is dramatically better; June is wait-tier for travelers wanting heritage-interior immersion at value pricing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 7, 3, 'wait',
  'Heat eases further. 25-35C. Aadi-month family rituals at mansion shrines. Walks workable.',
  'July sees a 2-3C ease. Aadi-month (mid-Jul to mid-Aug Tamil calendar) brings Chettiar-family Aadi rituals at ancestral mansion shrines. Walks workable 6-10am and 6-9pm. Hotel rates climb 15 percent.',
  'July at Chettinad is the start of the easing window but daytime still 33-35C. The mansion-walk circuit works at 70 percent. October is dramatically better.',
  'July in Chettinad is the first proper ease month. Rainfall 80-100mm across 10-12 wet days, daytime 33-35C, nights 25-26C, humidity 78 percent. The 75-village mansion-walk circuit workable 6-10am and 6-9pm. Aadi-month (Tamil calendar mid-July to mid-August) brings Chettiar-family Aadi rituals at the ancestral mansion shrines — the Aadi-Velli (Aadi Fridays) and Aadi-Pooram observances run in the family-kitchen-and-puja-room sequence inside the larger mansions. Some Chettiar diaspora families return for Aadi-week observances; The Bangala, Visalam, and Saratha Vilas see 30-40 percent occupancy bumps on Aadi weekends. Heritage interiors at full comfort. Athangudi tile workshops at workable temperatures. Cooking demos at the heritage kitchens at peak demand — Chettinad cuisine (Pepper chicken, Kozhi Varuval, Karaikudi fish curry, Kavuni Arisi) is the strongest meat-heavy cuisine in Tamil Nadu and the Aadi-Friday-then-feast pattern is a Chettiar tradition. Hotel rates climb 15 percent off June: The Bangala ₹6-9k, Visalam ₹11-16k, Saratha Vilas ₹8-12k, mid-bracket ₹2,500-4k. October-March is dramatically better; July works for Aadi-family-locked itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 8, 4, 'go',
  'Aadi tail + early NE monsoon hints. 24-33C. Mansion walks comfortable. Diaspora returns.',
  'August continues the ease. Daytime 32-33C. Aadi tail through mid-month. Chettiar diaspora (Singapore-Malaysia-Burma) returns for Aug-Sep family observances. Hotel rates climb 20 percent.',
  NULL,
  'August in Chettinad continues the easing. Rainfall 100-120mm across 12-14 wet days, daytime 32-33C, nights 24-25C, humidity 80 percent. The 75-village mansion-walk circuit workable 6-11am and 5-9pm. Aadi tail runs through the first fortnight; Aadi-Perukku (Aug 3, the Cauvery-river festival) is centred 90km north at Srirangam, not in Chettinad — but Cauvery-region Chettiars travel via Trichy Junction and many add the Kanadukathan-Karaikudi heritage visit. The Chettiar diaspora (Singapore, Malaysia, Burma — the trading-route descendants) returns for August-September family observances at the ancestral mansions; The Bangala, Visalam, Saratha Vilas, Chidambara Vilas see 50-60 percent occupancy on weekends. Heritage interiors at full comfort. Athangudi tile workshops at peak operation. Cooking demos at The Bangala kitchen, Saratha Vilas Athangudi, Visalam by CGH Earth all at year-strong demand. Burma-teak pillars get their annual oil-polish treatment in August-September in many mansions — visible craft work in the family residences. Hotel rates climb 20 percent off June: The Bangala ₹7-10k, Visalam ₹12-18k, Saratha Vilas ₹9-13k, mid-bracket ₹2,800-4,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 9, 4, 'go',
  'Pre-NE monsoon. 24-32C. Navarathri family observances. Heritage stays in demand.',
  'September is the build-up. Daytime 30-32C. Navarathri (9 nights, last Sep / first Oct) brings Chettiar family-mansion observances. Hotel rates climb 25 percent.',
  NULL,
  'September in Chettinad is the pre-NE-monsoon build-up. Rainfall 100-130mm across 12-14 wet days, daytime 30-32C, nights 24-25C, humidity 80 percent. The 75-village mansion-walk circuit workable 6:30-11am and 5-9pm. Navarathri (the nine-night Devi festival, last week of September into first week of October 2026) is a major Chettiar family occasion at the ancestral mansions — the Golu (the stepped-pyramid arrangement of dolls and figurines representing the Devi-court) is set up in family thinnai porches across the 75 villages, and family-and-neighbour visits to view the Golus run nightly through the nine evenings. The Chettiar diaspora returns for Navarathri-Dussehra observances. The Bangala, Visalam, Saratha Vilas, Chidambara Vilas all run Golu-display programmes for guests. Athangudi tile workshops at peak operation. Cooking demos at the heritage kitchens at year-peak demand. Hotel rates climb 25 percent off June: The Bangala ₹8-11k, Visalam ₹14-20k, Saratha Vilas ₹10-15k, mid-bracket ₹3-5k. International visitor load returns. The Navarathri-Dussehra week is the year''s second-most-significant Chettinad family-mansion week after Pongal. Lock beds 3-4 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 10, 5, 'go',
  'NE monsoon arrives mid-Oct. 22-30C. Mansion walks year-best comfort returns.',
  'October is the season-opener at peak. NE monsoon arrives around Oct 15 as evening showers. Daytime 27-30C. Mansion walks at year-best comfort. Diaspora returns for Diwali + Navarathri tail.',
  NULL,
  'October in Chettinad is the proper return to the peak heritage-stay season. The northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15, dropping 150-200mm across 8-10 wet days through the back half, mostly as late-afternoon and evening showers. Daytime 27-30C, nights 22-23C, humidity 75 percent. The 75-village mansion-walk circuit at year-best comfort, walks workable through full afternoon for the first time since November. Navarathri tail (running into the first week of October 2026) and Dussehra (Vijayadasami) bring family-mansion Golu visits across the 75 villages — the Chettiar-Nattukottai community''s Navarathri-Diwali season runs continuous through October-November. Heritage interiors at full comfort. Athangudi tile workshops at peak operation. Cooking demos at The Bangala kitchen, Visalam, Saratha Vilas Athangudi at peak demand. The Karaikudi antique-shopping streets at year-busy density. Hotel rates climb to 70 percent of January peak: The Bangala ₹9-13k, Visalam ₹15-22k, Saratha Vilas ₹11-16k, Chidambara Vilas ₹8-12k, mid-bracket ₹3,500-5,500. Strong call for first-time heritage-mansion + Chettinad-food immersion visits.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 11, 5, 'go',
  'Peak builds. 21-29C. NE monsoon active 200-250mm. Diwali + Karthigai Deepam.',
  'November is the peak-build month. NE monsoon active in evening showers. Daytime 26-29C. Diwali brings Chettiar-family ancestral-mansion returns. Karthigai Deepam (Dec 4 in 2026) prep starts.',
  NULL,
  'November in Chettinad is the year''s second-peak month behind January-February. Northeast monsoon active with 200-250mm rainfall across 10-12 wet days — mostly late-afternoon and evening showers that rinse the village streets without disrupting morning programmes. Daytime 26-29C, nights 21-22C, humidity 73 percent. The 75-village mansion-walk circuit at year-best comfort, full-day walkable. Diwali (the festival of lights, Karthik-Amavasya in October-November — falls early November 2026) brings significant Chettiar-Nattukottai family-mansion returns; the Karaikudi-Kanadukathan-Athangudi-Kadiapatti axis is at year-busiest for diaspora-family gatherings. Karthigai Deepam (Nov-Dec full moon, 2026 falls Dec 4 — the Tiruvannamalai-centred festival) prep begins late November with families lighting traditional clay lamps along the mansion thinnai porches. Heritage interiors at full comfort. Athangudi tile workshops at peak operation. Cooking demos at the heritage kitchens at year-peak demand. Hotel rates climb to 80-85 percent of January peak: The Bangala ₹10-15k, Visalam ₹18-25k, Saratha Vilas ₹13-18k, Chidambara Vilas ₹9-13k, mid-bracket ₹4-6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('chettinad', 12, 5, 'go',
  'Peak season. 20-28C. NE wraps mid-Dec. Christmas-NYE diaspora returns at year-densest.',
  'December is the operational peak. NE monsoon wraps mid-month. Daytime 25-28C, nights 20-21C. Christmas-NYE sees Singapore-Malaysia-Burma Chettiar diaspora returns at year-densest. Lock 6-8 weeks ahead.',
  NULL,
  'December in Chettinad is the operational peak. Northeast monsoon wraps in the first 15-18 days delivering 100-150mm across 7-9 wet days; from December 20 onward rainfall falls under 30mm. Daytime 25-28C, nights 20-21C, humidity 65 percent. The 75-village mansion-walk circuit at year-cleanest visibility. The Christmas-NYE corridor (December 22 to January 5) sees the Chettiar-Nattukottai diaspora — Singapore, Kuala Lumpur, Rangoon, Saigon, Java descendants — return to ancestral mansions at year-densest density; the Karaikudi-Kanadukathan-Athangudi-Kadiapatti axis runs full family-gathering programmes. Heritage-stay rates spike 2-3x normal: The Bangala ₹15-22k, Visalam ₹25-35k, Saratha Vilas ₹18-25k, Chidambara Vilas ₹14-20k, mid-bracket ₹5-9k. Lock beds 6-8 weeks ahead from October. Cooking demos at the heritage kitchens at year-peak demand; Pepper chicken (Karaikudi-style with 12 pepper varieties), Kozhi Varuval (the spicy chicken roast), Kavuni Arisi (black rice pudding from the Burma-trading-route grain), Idiyappam, Karaikudi fish curry — all at peak preparation. Athangudi tile workshops at peak operation; the colour-pour tile process gets year-best dry weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
