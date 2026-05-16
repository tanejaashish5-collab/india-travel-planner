-- Spice Plantations (Ponda) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: ponda-spice

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 1, 5, 'go',
  'Peak Goa hinterland. 16-30C. Sahakari, Tropical, Savoi all run 9am-5pm. Hindu temple cluster at year-best.',
  'January is when Ponda runs at its most coherent. Sahakari Spice Farm (largest, 130-acre, Curti village), Tropical Spice Plantation (Keri village), and Savoi Plantation (Savoi-Verem, 200+ years old, organic certified) all run 9am-5pm tours at ₹400-600 including welcome feni and Goan thali. Shri Mangeshi, Shri Mahalasa, Shri Shantadurga temples at year-best comfort.',
  NULL,
  'Ponda in January is the version of inland Goa most coastal travellers miss. Daytime 19-30C, nights drop to 16C, the spice-plantation belt sits 28-35km inland from Panaji and Margao at 50-100m elevation. Three plantations carry the day: Sahakari Spice Farm (Curti village, 130 acres, the largest, established 1995, ₹500/person tour with Goan thali lunch and welcome feni shot), Tropical Spice Plantation (Keri village, 7km from Ponda town, ₹450), Savoi Plantation (Savoi-Verem, 13km from Ponda, 200+ years old, organic-certified, ₹600 with elephant-bath option). Tours run 9am-5pm with the canopy walks taking 60-90 minutes. The Hindu temple cluster — Shri Mangeshi at Mangueshi (Konkani Saraswat patron, golden-domed, 1560 founding when devotees fled Portuguese destructions), Shri Mahalasa at Mardol, Shri Shantadurga at Kavalem — sits 8-12km from the plantation belt and runs 6am-9pm darshan with no entry fee. The temple-cluster is the year-best most-visited Hindu temple set in Goa. Stays: Panaji 28km (Taj Vivanta, Panjim Pousada), Margao 35km (Hotel Mandovi, Zion Goa), or basic Ponda-town homestays for budget. Pack a fleece for evenings; plantations get cool by 6pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 2, 5, 'go',
  'Driest month. 17-31C. Plantation tours at year-best comfort. Temple festivals quiet between Diwali-Shigmo.',
  'February is the cleanest of the cool months. Rainfall under 5mm, plantation canopy walks at year-best comfort. Temple festivals quiet between Diwali (October-November) and Shigmo (March). Carnival float spillover from Margao 35km doesn''t reach Ponda properly.',
  NULL,
  'February in Ponda is the technical sweet-spot. Rainfall averages under 5mm, daytime 19-31C, the spice-plantation canopy walks at year-best comfort. Sahakari Spice Farm tours run at full 9am-5pm capacity with weekday occupancy at 50-70 percent (versus 90+ percent on Saturday-Sunday); the lunch thali at Sahakari runs 12:30-2:30pm and is the year-best Goan inland-style spread (kokum solkadhi, prawn caldine, beef vindaloo or alternative, sannas). Tropical Spice Plantation 7km away is shorter (60-min walk) and lighter on the lunch but better on the cardamom-vanilla canopy. Savoi Plantation''s 200-year heritage and organic certification draws the smaller-group traveller. The Hindu temple cluster — Shri Mangeshi at Mangueshi, Shri Mahalasa at Mardol, Shri Shantadurga at Kavalem — sits in its quietest annual stretch between Diwali (Oct-Nov) and Shigmo (March). Goa Carnival runs in Margao city across 3 days before Ash Wednesday but doesn''t reach Ponda. The plantation belt is 30km from Mangueshi temple by NH4A; auto ₹600 round-trip from Ponda Bus Stand.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 3, 4, 'go',
  'Last cool window. 20-32C. Shigmo at temple cluster mid-month. Plantation tours full tempo.',
  'March extends the February experience minus the dry-air comfort. Shigmo (Hindu spring festival on the full moon of Phalgun) brings week-long temple processions to the Mangueshi-Mardol-Kavalem cluster; week-long pilgrimage uplift. Plantation tours at full tempo throughout.',
  NULL,
  'March in Ponda is the soft-landing month. Daytime 22-32C, humidity climbing toward 70 percent in the last fortnight. Shigmo (Hindu spring festival on the full moon of Phalgun, mid-March variable) is the year''s biggest pilgrimage event at the Mangueshi-Mardol-Kavalem temple cluster — 5-7 day processions at each temple, draws 10,000-15,000 worshippers per day, especially at Shri Mangeshi where the rath (chariot) procession at the full moon evening is the spectacle. Plantation tours at Sahakari, Tropical, and Savoi run at full 9am-5pm capacity throughout — Shigmo doesn''t affect them since they sit 8-12km from the temples. Hotel rates in Panaji and Margao bases drop 20-25 percent versus February. The Western Ghats hinterland air is at year-end-of-cool — last clean window before April humidity. Plantation-day combined with Shigmo evening at one of the three temples is the year''s best Ponda combo. Pack hat, water, modest-dress for the temple visits.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 4, 2, 'wait',
  'Pre-monsoon heat. 23-37C, humidity 75 percent. Plantation walks compress to 9-11am and post-4pm.',
  'April is when Ponda-Spice tips toward summer. Sahakari, Tropical, Savoi tours still run 9am-5pm but the 60-90 min canopy walks are gruelling 11am-4pm. Hotel rates 30 percent below February. Push to October if comfort matters.',
  'April pushes Ponda into pre-monsoon heat. Plantation walks workable only 9-11am and post-4pm; the mid-day 11am-4pm window collapses under 32-37C heat. Temples remain comfortable but the plantation half of the trip — the actual reason to come to Ponda — compresses badly.',
  'April in Ponda is when the inland-Goa hinterland tips toward summer. Daytime 24-37C, humidity 75 percent, the spice-plantation canopy walks compress to 9-11am and post-4pm windows. Sahakari Spice Farm, Tropical Spice Plantation, and Savoi Plantation all continue 9am-5pm tours but the mid-day 11am-4pm window is genuinely unpleasant — 32-37C with humidity climbing past 75 percent makes the 60-90 min canopy walks gruelling. The Goan-thali lunch at Sahakari runs 12:30-2:30 and the AC-restaurant section becomes the day''s relief; book the indoor side. Temples (Shri Mangeshi, Shri Mahalasa, Shri Shantadurga) remain comfortable thanks to thick-wall stone construction and the 6am-9pm darshan timing means cool-edge visits work. Hotel rates in Panaji and Margao bases drop 30-35 percent versus February. Power cuts run 2-4 hours afternoons; budget homestays without inverters go dark. Push to October if heat-tolerance is low; spice plantations work in monsoon (next month onward).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 5, 2, 'wait',
  'Peak heat. 25-38C, humidity 80 percent. Plantation walks dawn-and-dusk only. Pre-monsoon squalls late.',
  'Early May still works for the early-bird plantation traveller — 9-11am tours functional. Last 10 days bring SW-monsoon squalls and start of the monsoon-friendly plantation season. Skip to October-March for cool-air comfort.',
  'May is the year''s hottest stretch in inland Goa. Plantation walks workable only 9-11am; mid-day collapses under 32-38C heat. Pre-monsoon squalls from May 22 onward bring 30-50mm overnight downpours and 2-4 hour grid power cuts. Push to October.',
  'May in Ponda is when the inland-Goa heat peaks. Daytime 26-38C, humidity 80 percent, plantation walks workable only 9-11am with the rest of the day collapsing under heat. Sahakari, Tropical, Savoi continue 9am-5pm tours but afternoon visitors are mostly seeking the AC-restaurant lunch break rather than canopy walks. Pre-monsoon squalls arrive May 22-28 with 30-50mm overnight downpours; the Western Ghats are the catchment for these and inland Goa gets them properly. The plantations themselves welcome the rain (it kickstarts the spice-growing year), but visitor experience deteriorates with grid-power cuts of 2-4 hours afternoons. Temples (Shri Mangeshi, Shri Mahalasa, Shri Shantadurga) at the temple-cluster 8-12km away continue normally with full darshan. Hotel rates in Panaji and Margao at year-low. Push to October-March for the cool-air-and-canopy-comfort version of the trip; June-September is the monsoon-canopy version (different but valid).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 6, 3, 'wait',
  'SW monsoon. 23-30C, 600-800mm rain. Canopy at year-greenest. Plantations RUN — this is when crops grow.',
  'June is the rare Goa window where plantations work better than coast. Spice-plantation canopy is at year-greenest, vegetation lush, all three plantations run regular tours. Trails muddy but covered; Goan-thali lunch becomes a comfort meal in monsoon green. Few tourists.',
  'Early-to-mid June brings the heaviest single rain bursts of the season. Travel days within Goa are unpredictable — coast-to-Ponda 30km road can flood at low corners. Plantation experience is genuinely good but logistics flag. Wait for late October-March if comfort matters.',
  'June in Ponda is the rare inland-Goa window where the plantation trip works better than the coast. Daytime 24-30C, humidity at 90 percent, rainfall jumps to 600-800mm across 18-22 wet days. The Western Ghats catchment makes this the wettest stretch the spice plantations themselves welcome — Sahakari, Tropical, Savoi all continue 9am-5pm tours throughout monsoon, the canopy is at year-greenest, vegetation is visibly growing, and the 60-90 min walks are sheltered enough that umbrellas aren''t strictly needed (most visitors get wet anyway). Visitor numbers drop to year-low — 30-40 percent of January peak — and walk-in tours work all weekdays. Goan-thali lunch at Sahakari (12:30-2:30) becomes a comfort meal in monsoon green. The catch: coast-to-Ponda 30km road floods in low corners after heavy events, adding 1 hour to drive times. Sao Joao (June 24) is a Catholic-village event in North Goa (Siolim) — Ponda stays muted on the day. Temples continue with reduced visitor load.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 7, 3, 'wait',
  'Peak monsoon. 23-29C, 800-1000mm rain. Canopy lush, plantations open, but rain is constant.',
  'July is when Ponda plantations work best as a monsoon-Goa trip. Sahakari, Tropical, Savoi all run, canopy at year-cinematic, visitor numbers thin, lunch at year-comfort. Constant rain means plan around it; bring a poncho.',
  'July is the year''s wettest month. Even with monsoon-friendly plantation operations, the experience is wet from start to finish. If you can accept that, the canopy walks and Goan-thali lunch are at year-best ambience. If you cannot, push to October.',
  'July in Ponda holds June''s monsoon-friendly pattern. Daytime 23-29C, rainfall 800-1000mm across 25-27 wet days, humidity at 95 percent. Sahakari Spice Farm, Tropical Spice Plantation, and Savoi Plantation all continue 9am-5pm tours throughout — this is genuinely when the spice-plantation experience reaches year-cinematic peak (cardamom, vanilla, cloves, nutmeg all in active growth). Visitor numbers drop to 25 percent of January peak; the lunch thalis run with year-most attentive service. The catch: rain is essentially constant, often as 6-12 hour deluges. Coast-to-Ponda 30km drive (NH4A) waterlogs at 4-5 known corners after 80mm-plus events. Power cuts run 3-5 hours daily across Ponda taluka. Temples (Shri Mangeshi, Shri Mahalasa, Shri Shantadurga) continue darshan; Mangueshi''s tank fills to year-best 7m depth. Hotel rates in Panaji and Margao at year-low — Hotel Mandovi from ₹6,500 to ₹3,500. The trip works for monsoon-loving travellers; cool-air seekers wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 8, 4, 'go',
  'Monsoon eases. Ganesh Chaturthi at temple cluster — biggest annual festival. 23-30C, 500-700mm rain.',
  'August is when Ponda-Spice hits a different peak. Ganesh Chaturthi (variable date August-September) is the year''s biggest Hindu festival in Goa — Mangeshi, Mahalasa, Shantadurga at peak pilgrim load. Plantations continue. Different agenda but valid.',
  NULL,
  'August in Ponda is when the temple half of the trip hits its annual peak. Ganesh Chaturthi (Hindu festival, variable date in August or September depending on lunar calendar) is the year''s most significant Hindu observance in Goa — 5 to 11 days of household and community Ganesh installations across the state, with the Mangueshi-Mardol-Kavalem temple cluster the geographic centre. Shri Mangeshi sees 20,000-30,000 daily pilgrims through the festival; Shri Shantadurga and Shri Mahalasa similar; immersion processions head from each temple to the Cumbarjua canal or the Mandovi at the festival close. Plantations (Sahakari, Tropical, Savoi) continue 9am-5pm tours throughout; canopy is at year-greenest. Daytime 23-30C, rainfall 500-700mm across 22-25 wet days — easing slightly versus July. Hotel rates in Panaji climb 25-30 percent during the Ganesh Chaturthi window; Margao slightly less. Independence Day weekend (August 15-17) overlaps in some years and brings additional Mumbai-domestic tourists. Different agenda from January''s plantation-and-cool-air trip but valid as a Goan-cultural deep-dive.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 9, 4, 'go',
  'Monsoon retreating. 23-30C, 300-400mm rain. Ganesh Chaturthi sometimes still running. Plantations and temples both at high tempo.',
  'September is the recovery month with the cultural-tail. Ganesh Chaturthi sometimes runs into early September; plantations continue at full canopy tempo. Hotel rates start climbing late month as October peak approaches.',
  NULL,
  'September in Ponda is the recovery month with cultural tail. Daytime 24-30C, rainfall drops to 300-400mm across 14-16 wet days, mostly the first fortnight. The southwest monsoon retreats from inland Goa around September 20-25. Ganesh Chaturthi (variable date) sometimes runs from late August into early September depending on lunar calendar; the Mangueshi-Mardol-Kavalem temple cluster sees the festival tail and immersion processions if so. Plantation tours at Sahakari, Tropical, and Savoi run at full 9am-5pm tempo throughout — visitor numbers begin climbing back from August low. Hotel rates in Panaji and Margao bases sit at year-low for the first 20 days of September: Hotel Mandovi at ₹3,500-4,000, Zion Goa at ₹2,800-3,500. The Pitru Paksha period (variable, mid-September) is religiously significant for ancestral observances at the temple cluster — quiet but well-attended. Plantation canopy is at year-best post-monsoon green. Strong call for travellers who want the cultural plus plantation combination.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 10, 5, 'go',
  'Season rebuilds. 22-31C, 100-150mm rain. Plantations at year-best green. Hotel rates 30 percent below Dec.',
  'October is the proper return to coherent. Rainfall drops to 100-150mm, plantations dry by mid-month, canopy retains year-best monsoon green. Diwali long weekend (variable) brings 5-day domestic bump. Hotel rates 30 percent below December peak.',
  NULL,
  'October in Ponda is the year''s best balance of plantation green and cool air. Rainfall 100-150mm — most in the first 10 days — daytime 23-31C with humidity falling to 75 percent. Plantation canopy at Sahakari, Tropical, and Savoi retains year-best monsoon green while becoming fully walkable. Hotel rates in Panaji and Margao 30-35 percent below December peak: Hotel Mandovi at ₹4,500-5,500, Zion Goa at ₹3,500-4,500, Taj Vivanta Panaji at ₹13,000-15,000. Diwali long weekend (variable, usually mid-October to early November) brings a 5-day Hindu-domestic tourist bump and a 25 percent rate climb during the window — the Mangueshi-Mardol-Kavalem temple cluster sees a 3-day pilgrim wave. Plantation walks at year-best comfort throughout — cool air, full green canopy, dry trails by week three. The combined plantation-and-temple-cluster trip works at year-best feasibility in October; the smart traveller''s window is October 12-November 15.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 11, 5, 'go',
  'Peak builds. 19-30C, dry. Plantation canopy retaining green from monsoon. Hotel rates climb 20 percent month-over-month.',
  'November is when Ponda hits its high-season pattern. Rainfall under 30mm, plantation canopy dries firm, temple cluster at year-best comfort. Hotel rates climb 20 percent across the month as Christmas-week travellers book.',
  NULL,
  'November in Ponda is the year''s second-cleanest month after January. Daytime 21-30C, nights drop to 19C, rainfall under 30mm and almost all in the first week. Plantation canopy at Sahakari, Tropical, Savoi has retained good post-monsoon green and is now firm-walking. Sahakari''s 130-acre operation runs at year-best with 60-70 percent weekday occupancy and 90 percent weekend. The Mangueshi-Mardol-Kavalem temple cluster is at year-best comfort — clear sky, dry stone, no Shigmo or Ganesh festival load. Hotel rates climb 20 percent across the month: Hotel Mandovi from ₹5,500 (Nov 1) to ₹7,000 (Nov 30), Taj Vivanta Panaji from ₹15,000 to ₹18,000-22,000. Plantation tours hit a 3-5 day booking lead from November 20 onward. The first three weeks of November are the smart traveller''s window — full season conditions, pre-Christmas rates, light visitor load.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponda-spice', 12, 5, 'go',
  'Peak season. 16-29C, dry, plantation tours full tempo. Christmas week temple cluster at year-quiet (Hindu).',
  'December is operational peak for the cool-air plantation trip. Sahakari, Tropical, Savoi at full 9am-5pm capacity. Christmas-NY week sees Panaji hotel rates 40-50 percent above November but the Hindu temple cluster stays year-quiet (Christmas isn''t a Hindu observance).',
  NULL,
  'December in Ponda is operational peak for the cool-air plantation-and-temple trip. Daytime 19-29C, nights drop to 16-17C, rainfall under 20mm. Plantation tours at Sahakari (130-acre, ₹500), Tropical (60-min canopy walk, ₹450), and Savoi (200-year heritage, ₹600) run at full 9am-5pm capacity. Christmas-NY week (December 22 to January 5) drives Panaji hotel rates 40-50 percent above November: Taj Vivanta from ₹18,000 to ₹28,000-32,000, Hotel Mandovi Margao from ₹7,000 to ₹10,000. Plantation tours hit a 5-7 day booking lead through Christmas week. The Mangueshi-Mardol-Kavalem temple cluster, being Hindu, stays at year-quiet conditions through Christmas-NY (Christmas isn''t observed at these temples) — the smart traveller''s callable advantage. Plantation canopy walks are at year-firmest dry conditions. The first three weeks of December run 25-30 percent cheaper at the same conditions; lock dates pre-December 20 if budget matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
