-- Trichy (Tiruchirappalli) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: trichy

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 1, 5, 'go',
  'Peak window + Pongal cluster. 21-30C. Rock Fort 437-step climb at year-cleanest air.',
  'January is when Trichy runs at peak. NE monsoon retreated, rainfall under 30mm, daytime 27-30C. Rock Fort Ucchi Pillayar (437 steps, 83m monolithic rock summit) climb at year-cleanest air. Pongal Jan 14-17 adds temple-circuit density.',
  NULL,
  'Trichy (Tiruchirappalli) in January is the peak window. Daytime 27-30C, nights 21-22C, humidity 60 percent, rainfall under 30mm. The Rockfort — the 83m monolithic gneiss outcrop that defines Trichy''s skyline — carries the Ucchi Pillayar Temple (the summit Ganesha shrine) and the Thayumanavar Swamy Temple (Shiva shrine) at the midway level. The 437-step climb up the rock-cut stairway from the bazaar at its base takes 25-40 minutes; the summit gives a 360-degree view to Srirangam''s temple island 7km north, the Cauvery and Kollidam channels, and the city plain to the south. The temple-island combination (Srirangam Ranganathaswamy Temple, world''s largest functioning Hindu temple; Jambukeswarar Temple — the water-element Pancha Bhoota Stalam, a Shiva temple with a continuously water-fed inner sanctum) sits 7-12km from central Trichy. Trichy Junction railway station is the regional hub for the Madurai-Trichy-Tanjore corridor; Tiruchirapalli International Airport handles Gulf flights. Pongal cluster (Jan 14-17) brings additional pilgrim density on the wider Cauvery-circuit (Tanjore, Kumbakonam, Chidambaram).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 2, 5, 'go',
  'Driest month. 22-32C. Rock-Fort climb comfortable through afternoon. Rates ease 15 percent.',
  'February is the technical peak. Rainfall under 20mm, daytime 28-32C, nights 22-23C. Rock-Fort 437-step climb workable through full afternoon. Srirangam + Jambukeswarar day-trips at year-cleanest visibility.',
  NULL,
  'February in Trichy is the dry-quarter technical peak. Rainfall under 20mm, daytime 28-32C, nights 22-23C, humidity 58 percent. The Rockfort 437-step climb workable through full afternoon for the first time since November — the cut-stone stairway is partially shaded, and the Thayumanavar midway-temple offers a 15-minute rest in cool stone interior. The summit Ucchi Pillayar Ganesha shrine and the panoramic 360-degree view (Srirangam temple-island 7km north, the Cauvery-Kollidam channels, the south-side urban plain) at year-cleanest visibility — 15-20km haze versus 8-12km in Apr-Jun. The day-trip combination: Rockfort morning, Srirangam Ranganathaswamy Temple (world''s largest functioning Hindu temple, 12km north) afternoon, Jambukeswarar Temple (the water-element Pancha Bhoota Stalam, 7km north, the inner sanctum holds a perpetual water-filled spring around the Shivalingam) early evening. Hotel rates ease 15 percent off January: Sangam ₹3-4,500, Femina ₹2,500-4k, Breeze Residency ₹2,200-3,500, homestays ₹900-1,500. The Trichy Junction-area Cauvery-circuit traffic (Trichy is the regional hub for Tanjore and Kumbakonam day-trips) at year-cleanest comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 3, 4, 'go',
  'Last cool month. 25-35C. Climb compresses mid-day. Rates ease 25 percent.',
  'March extends February''s pattern but daytime climbs past 33C the last fortnight. Rock-Fort climb works through 11am and resumes 4pm. Rates 25 percent below February — last clean value window.',
  NULL,
  'March in Trichy is the soft-landing month. Daytime 32-35C, nights 25-26C, humidity 65 percent, rainfall under 40mm. The Rockfort 437-step climb works comfortably 6:30-11am and resumes 4pm onward; the cut-stone stairway holds direct afternoon sun on the upper third (the bazaar-level approach is shaded by neighbouring buildings). The Ucchi Pillayar summit Ganesha shrine still walkable through afternoon for the first ten days; the last fortnight pushes the summit visit into dawn-and-dusk windows. The Thayumanavar midway-temple stays cool. The temple-circuit day-trip: Srirangam Ranganathaswamy Temple (12km north) and Jambukeswarar Temple (the water-element Pancha Bhoota Stalam, 7km north) at quieter mid-month visitor load. Trichy Junction (the regional rail hub) connects to Tanjore (60km east) and Kumbakonam (90km east) for the wider Cauvery-circuit day-trips. Hotel rates ease 25 percent off February: Sangam Hotel ₹2,500-4k, Femina ₹2,200-3,500, Breeze Residency ₹2-3,200, homestays ₹800-1,300. Last clean-value window before April pushes the Rockfort climb past comfort. Tiruchirapalli International Airport sees the Gulf-NRI inbound traffic begin its summer-vacation ramp.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 4, 3, 'wait',
  'Pre-monsoon heat. 27-38C. Rock-Fort dawn-only. Hotel rates 30 percent off.',
  'April pushes Trichy into the inland-plains heat dome. Daytime 36-38C, Rock-Fort climb workable only as a 6-9am sprint. AC retreat in central Trichy noon-4pm. Wait for October.',
  'April in Trichy is the start of the inland-plains heat dome. The Rock-Fort 437-step climb in 36-38C with summit-direct sun is endurance-only. Temple-circuit day-trips work mornings only. October opens the proper window.',
  'April in Trichy is the pre-monsoon endurance month. Daytime 36-38C, nights 27-28C, humidity 65 percent, rainfall under 30mm. The Rockfort 437-step climb compresses to a 6-9am sprint; the stone stairway holds 38-40C surface heat noon-4pm, and the summit Ucchi Pillayar shrine has minimal shade. The Thayumanavar midway-temple stays cool but is one stop on a 437-step climb that''s the trip''s defining experience. The temple-circuit day-trips (Srirangam Ranganathaswamy, Jambukeswarar) workable 6-10am and 5-9pm only; the Sri Ranganathaswamy''s 7-prakaram inner-walk granite hits 42-44C noon-4pm. The Trichy-Tanjore-Kumbakonam Cauvery-circuit (60-90km east) becomes a series of dawn-and-dusk sprints with AC car midday transit. Stay central — Sangam Hotel ₹2,000-3,500, Femina ₹1,800-3k, Breeze Residency ₹1,500-2,500, homestays ₹600-1,000. International visitor load thin; domestic Cauvery-circuit pilgrim load thin (April pilgrim flow goes to Madurai for Chithirai). The Gulf-NRI summer-vacation inbound runs the Tiruchirapalli Airport at moderate load. October opens the proper return window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 5, 2, 'wait',
  'Heat dome peak. 28-40C. Rock-Fort climb unworkable mid-day. Push to October.',
  'May is the inland-plains heat dome at its worst. Daytime 38-40C, Rock-Fort steps hit 44-46C noon-4pm. The trip-defining 437-step climb to Ucchi Pillayar runs at 30 percent. October is dramatically better.',
  'May in Trichy is the heat dome peak. The Rock-Fort climb that defines the trip becomes barefoot-impossible noon-4pm. Temple-circuit at 50 percent. Wait for October.',
  'May in Trichy is the inland-plains heat peak. Daytime 38-40C, nights 28-29C, humidity 65 percent, rainfall under 50mm — mostly as short pre-monsoon thunderstorm bursts that don''t cool the granite or the Rockfort steps. The 437-step climb to the summit Ucchi Pillayar Ganesha shrine becomes barefoot-impossible 11am-4pm; the cut-stone stairway surface hits 44-46C. The Thayumanavar midway-temple stays cool but the climb to it requires the lower 200 steps. Workable only as a 5:30-8am sprint and a 7-9pm dusk attempt. The temple-circuit (Srirangam Ranganathaswamy, Jambukeswarar) at the same constraint — granite inner-prakaram heats up. Trichy-Tanjore-Kumbakonam Cauvery-circuit day-trips reduced to dawn-departure-AC-car-return sprints. Stay central — Sangam Hotel ₹1,800-3k, Femina ₹1,500-2,500, Breeze Residency ₹1,200-2,200, homestays ₹500-900. International visitor load near-zero; domestic Cauvery-circuit pilgrim load near-zero. Tiruchirapalli International Airport handles Gulf-NRI summer-holiday inbound at moderate load. Domestic-air load through to Bangalore and Chennai thin. October opens the proper return window after the NE monsoon arrives.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 6, 2, 'wait',
  'SW spillover eases heat. 27-37C. Rock-Fort still endurance. Push to October.',
  'June sees a 1-2C ease as SW monsoon spillover reaches the eastern Western Ghats. Daytime 35-37C. Rock-Fort climb still endurance-only mid-day. Hotels at year-low. October opens the proper window.',
  'June at Trichy is SW spillover ease but daytime still 35-37C. The Rock-Fort 437-step climb works at 60 percent. October is dramatically better.',
  'June in Trichy is the first easing month. The southwest monsoon hits the Kerala side of the Western Ghats but Trichy sits in the eastern rain-shadow — rainfall stays at 60-80mm across 8-10 wet days, mostly late-afternoon thunderstorms. Daytime 35-37C, nights 27-28C, humidity 75 percent. The Cauvery and Kollidam (which surround Srirangam''s temple island 12km north) still run low — proper river-fill comes later with NE-monsoon catchment runoff in October. The Rockfort 437-step climb workable 6-10am and 5-9pm. The Ucchi Pillayar summit and Thayumanavar midway-temple at full access but viewer comfort marginal mid-day. The temple-circuit day-trips (Srirangam Ranganathaswamy, Jambukeswarar) at full ritual tempo. Trichy-Tanjore-Kumbakonam Cauvery-circuit day-trips workable as morning sprints. Stay central — Sangam Hotel ₹2,000-3,500, Femina ₹1,800-3k, Breeze Residency ₹1,500-2,500, homestays ₹700-1,200. Aadi-Perukku build-up: the August 3 Cauvery festival is six weeks away. Tiruchirapalli International Airport at moderate Gulf-NRI load. October-March is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 7, 3, 'wait',
  'Heat eases. 26-35C. Aadi-month Tamil pilgrim density. Rock-Fort + Srirangam mornings.',
  'July sees a 2-3C ease. Aadi-month (mid-Jul to mid-Aug Tamil calendar) brings Aadi-Velli Friday pilgrim density at Srirangam. Rock-Fort climb workable mornings. Hotel rates climb 20 percent.',
  'July at Trichy is the start of ease but daytime still 33-35C. Rock-Fort + Srirangam combo works at 70 percent. October opens the proper window.',
  'July in Trichy is the first proper ease month. The SW monsoon spillover reaches inland Tamil Nadu more substantially — rainfall 80-100mm across 10-12 wet days, daytime 33-35C, nights 26-27C, humidity 78 percent. Aadi-month (Tamil calendar mid-July to mid-August) brings Aadi-Velli Friday pilgrim density at Srirangam''s Ranganathaswamy Temple 12km north — 20,000-40,000 day-pilgrims arrive at Trichy Junction every Aadi-Velli for the Srirangam day-circuit. Trichy hotels see corresponding occupancy bumps; bookings recommended 1-2 weeks ahead for Aadi-Velli weekends. The Rockfort 437-step climb workable 6-10am and 6-9pm; the Ucchi Pillayar summit and Thayumanavar midway-temple at full access. The Cauvery and Kollidam start filling as SW-monsoon catchment runoff arrives — the temple island geography becomes properly visible from the Mukkombu and Aaaduthurai bridge crossings. Stay central — Sangam Hotel ₹2,500-4k, Femina ₹2-3,500, Breeze Residency ₹1,800-2,800, homestays ₹800-1,300. Tiruchirapalli International Airport at peak Gulf-NRI Aadi-pilgrimage inbound. October-March is dramatically better; July works for Aadi-locked itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 8, 4, 'go',
  'Aadi Perukku Aug 3 + Aadi Pooram. 25-33C. Cauvery festival hub.',
  'August is the Cauvery-festival month. Aadi Perukku (Aug 3 — Cauvery river-bank festival) is centred on the Trichy-Srirangam-Tanjore-Kumbakonam axis. Aadi Pooram (Andal-Ranganatha festival) mid-August. Hotel rates climb 25 percent.',
  NULL,
  'August in Trichy is the Cauvery-festival hub of the year. Rainfall 100-130mm across 12-14 wet days, daytime 32-33C, nights 25-26C, humidity 82 percent. **Aadi Perukku (Tamil Aadi-18, fixed at August 3)** — the river-flood festival that marks the Cauvery''s annual peak — is centred on the Trichy-Srirangam-Tanjore-Kumbakonam axis. The Trichy ghats (the Cauvery and Kollidam riverbanks on the city''s northern edge) and the Srirangam ghats 12km north both see 50,000+ day-pilgrims for raksha-bandhan-style ritual thread offerings to the Cauvery. The Andal-Ranganatha "Aadi Pooram" festival (mid-August in the Tamil calendar) brings additional density at Srirangam Ranganathaswamy. The Rockfort 437-step climb workable 6-10am and 6-9pm; the summit Ucchi Pillayar shrine sees moderate visitor load. The temple-circuit (Srirangam Ranganathaswamy world''s-largest, Jambukeswarar water-element Pancha Bhoota Stalam) at peak festival tempo. Stay central — Sangam Hotel ₹3-4,500, Femina ₹2,500-4k, Breeze Residency ₹2,200-3,500, homestays ₹900-1,500. Lock beds 2-3 weeks ahead for Aadi Perukku day and the Aadi Pooram week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 9, 3, 'wait',
  'Pre-NE monsoon. 25-33C. Navarathri week. Pre-peak rate window.',
  'September is the build-up to peak. Daytime eases to 31-33C. Navarathri week (last Sep / first Oct, 9 nights) brings temple density at Srirangam. Last sub-October pricing window.',
  'September at Trichy still sits below the October-March window. Daytime 31-33C; the Rock-Fort + temple combo works but at 75 percent. October opens the clean window.',
  'September in Trichy is the pre-NE-monsoon run-in. Rainfall 100-130mm across 12-14 wet days, daytime 31-33C, nights 25-26C, humidity 80 percent. The Cauvery still runs high from August''s Aadi-Perukku flow. The southwest monsoon retreats around September 25-30; the northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15. Navarathri (the nine-night Devi festival, Sukla-Pratipada to Mahanavami of Ashwin month — late September into early October 2026) brings additional temple-circuit density at Srirangam Ranganathaswamy and at the Devi shrines within the Rockfort precinct. Hotel rates remain at off-season through mid-month: Sangam Hotel ₹2,500-4k, Femina ₹2-3,500, Breeze Residency ₹1,800-2,800, homestays ₹800-1,300 — Navarathri week sees 20 percent bump. The Rockfort 437-step climb workable 6:30-10:30am and 5:30-9pm. The temple-circuit (Srirangam, Jambukeswarar) at full ritual tempo. Trichy-Tanjore-Kumbakonam Cauvery-circuit day-trips return to comfortable. October 15 onward is the clean window — September is the value side for travelers wanting pre-peak pricing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 10, 5, 'go',
  'NE monsoon arrives mid-Oct. 23-31C. Rock-Fort climb returns full-day. Cauvery at high flow.',
  'October is the season-opener. NE monsoon arrives around Oct 15 as evening showers. Daytime 28-31C. Rock-Fort + Srirangam + Jambukeswarar all return to full-day access. Hotel rates 30 percent below January peak.',
  NULL,
  'October in Trichy is the proper return to peak. The northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15, dropping 150-200mm across 8-10 wet days through the back half, mostly as late-afternoon and evening showers. Daytime 28-31C, nights 23-24C, humidity 76 percent. The Cauvery and Kollidam at high-channel flow — Srirangam''s temple-island geography at year-best visual context. The Rockfort 437-step climb workable through full afternoon for the first time since November; the summit Ucchi Pillayar Ganesha shrine and the Thayumanavar midway-temple at peak visitor density. The temple-circuit (Srirangam Ranganathaswamy world''s-largest functioning temple, Jambukeswarar water-element Pancha Bhoota Stalam) at full ritual tempo. Navarathri tail and Dussehra (Vijayadasami, the tenth day, falls in early-to-mid October 2026) bring weapon-worship rituals and Devi processions. Trichy-Tanjore-Kumbakonam Cauvery-circuit day-trips return to year-best comfort. Stay central — Sangam Hotel ₹3-4,500, Femina ₹2,500-4k, Breeze Residency ₹2,200-3,500, homestays ₹900-1,500. Tiruchirapalli International Airport at peak Diwali-NRI inbound traffic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 11, 5, 'go',
  'Peak builds. 22-30C. NE monsoon active. Walks year-best comfort.',
  'November is the peak-build month. NE monsoon active 200-250mm in evening showers. Daytime 27-30C, walks at year-best comfort. Trichy-Tanjore-Kumbakonam Cauvery-circuit at peak.',
  NULL,
  'November in Trichy is the year''s second-peak month behind January. Northeast monsoon active with 200-250mm rainfall across 10-12 wet days — mostly late-afternoon and evening showers that rinse the city and the temple precincts without disrupting morning programmes. Daytime 27-30C, nights 22-23C, humidity 73 percent. The Rockfort 437-step climb at year-best comfort, the Ucchi Pillayar summit Ganesha shrine and the Thayumanavar midway-temple at full visitor density. The temple-circuit (Srirangam Ranganathaswamy world''s-largest functioning temple, Jambukeswarar water-element Pancha Bhoota Stalam) at full ritual tempo. The Cauvery and Kollidam at full channel flow — Srirangam''s temple-island geography visible from the Mukkombu bridge 7km upstream and from the new Aaaduthurai crossing. Trichy is the regional rail and air hub for Tanjore (60km east — Brihadeeswara Temple) and Kumbakonam (90km east — Adi Kumbeswarar Temple, Sarangapani Temple, the Mahamaham tank); the wider Cauvery-Delta day-trips at year-best comfort. Hotel rates climb to 75 percent of January peak: Sangam ₹3,500-5k, Femina ₹3-4,500, Breeze Residency ₹2,500-4k, homestays ₹1,000-1,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('trichy', 12, 5, 'go',
  'Peak + Vaikunta Ekadasi prep. 21-29C. NE monsoon wraps. Srirangam-circuit at peak.',
  'December is the operational peak. NE monsoon wraps mid-month. Daytime 26-29C, nights 21-22C. Vaikunta Ekadasi Dec 30 at Srirangam pulls regional traffic. Christmas-NYE modest rate lift.',
  NULL,
  'December in Trichy is the operational peak alongside January. Northeast monsoon wraps in the first 15-18 days delivering 100-150mm across 7-9 wet days; from December 20 onward rainfall falls under 30mm. Daytime 26-29C, nights 21-22C, humidity 68 percent. The Rockfort 437-step climb at year-cleanest visibility — the summit Ucchi Pillayar Ganesha view to Srirangam''s temple-island 7km north sharpest post-rain. The temple-circuit (Srirangam Ranganathaswamy world''s-largest functioning temple, Jambukeswarar water-element Pancha Bhoota Stalam) at full ritual tempo. **Srirangam''s Vaikunta Ekadasi falls December 30 in 2026** — Trichy hotels see significant overflow demand for the Ekadasi week as the 5-10 lakh pilgrim crowd at Srirangam books Trichy beds. The Pagal Pathu festival runs Dec 21-30 at Srirangam, adding pre-Ekadasi day-pilgrim density. Tanjore and Kumbakonam day-trips at year-cleanest visibility. Hotel rates at Christmas-NYE lift (1.5-2x normal, with Ekadasi week running another spike Dec 26-30): Sangam ₹5-7k, Femina ₹4-6k, Breeze Residency ₹3,500-5,500, homestays ₹1,500-2,500. Tiruchirapalli International Airport at peak Christmas-NYE-Ekadasi traffic.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
