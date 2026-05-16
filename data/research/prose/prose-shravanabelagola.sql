-- Shravanabelagola destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: shravanabelagola | best_months [10,11,12,1,2,3,7,8,9] | avoid [4,5]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 1, 5, 'go',
  'Peak Bahubali window. 16-29C, dry. Vindhyagiri 614 steps walkable before 10am. Chandragiri base accessible.',
  'January is when Shravanabelagola runs at its strongest. Daytime 25-29C, nights 16-18C. The 614-step Vindhyagiri climb (barefoot, sun-exposed steep) works comfortably 6-10am. Bahubali 57ft monolith (981 CE Chavundaraya), Chandragiri Bhadrabahu cave, Bhandara Basadi temple complex on full schedule.',
  NULL,
  'Shravanabelagola in January is the version every Jain heritage traveller books first. The 57-foot (17.4m) Bahubali Gomateshwara monolith — carved 981 CE by Chavundaraya, minister to the Western Ganga King Rachamalla — is the world''s largest free-standing monolithic statue, sitting atop Vindhyagiri hill (3347ft / 1020m above sea level). The 614 granite steps from the base of the hill to the statue are walked barefoot (shoe deposit at the base, ₹10) — sun-exposed, steep, no shade — and work comfortably 6-10am and 4-6pm in January temperatures. Daytime 25-29C, nights 16-18C, humidity 60 percent. The statue stands in the open courtyard at the summit; abhisheka rituals at 9.30am and 5.30pm daily, ₹free. Chandragiri hill adjacent (175 steps, lower, holds the Bhadrabahu cave where Chandragupta Maurya, by Jain tradition, ended his life as an ascetic in 297 BCE under his teacher Bhadrabahu''s guidance — the last documented Maurya act, marking the end of the dynasty) at clean access. Bhandara Basadi Jain temple complex (12th-century Hoysala) at the base.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 2, 5, 'go',
  'Driest month. 18-31C, humidity 55 percent. Vindhyagiri climb at year-best. Day-trip from Bengaluru-Mysore at peak ease.',
  'February is Shravanabelagola''s cleanest weather window — rainfall under 5mm. 614-step Vindhyagiri climb (barefoot, sun-exposed) at year-best workability mornings before 10am. Chandragiri Bhadrabahu cave, Bhandara Basadi at clean access.',
  NULL,
  'Shravanabelagola in February is the technical peak. Rainfall under 5mm, daytime 27-31C, nights 18-20C, humidity at year-low 55 percent. The 614-step Vindhyagiri climb (barefoot, sun-exposed, steep — the climb that defines the Shravanabelagola visit) at year-best workability — go 6-9am for cool stone underfoot. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue) holds full visitor access through the day; abhisheka rituals 9.30am and 5.30pm. Chandragiri hill adjacent (175 steps, Bhadrabahu cave — the Maurya-era Jain tradition that Chandragupta Maurya died here in 297 BCE as an ascetic under teacher Bhadrabahu, ending the Maurya dynasty by abdication; the cave holds the final fast unto death tradition of sallekhana) at clean access. Bhandara Basadi (12th-century Hoysala Jain temple complex) at base. Mahamastakabhisheka — the 12-yearly anointment of the statue with 3148kg of sugar/ghee/turmeric/sandalwood/8 sacred metals — last held February 17-25, 2018; next 2030. Day-trip from Bengaluru (160km, 3hr via NH-75) and Mysore (85km, 2hr via NH-275) at peak ease.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 3, 4, 'go',
  'Warming. 20-33C, humidity 60 percent. Vindhyagiri climb compresses to dawn. Last clean window.',
  'March extends February''s pattern with rising mid-day heat. The 614-step barefoot climb works 6-9am only — by 10am the granite stones become punishing on bare feet. Last clean window before April pushes ascent to dawn-only.',
  NULL,
  'Shravanabelagola in March is the soft-landing month. Daytime 28-33C, nights 20-22C, humidity climbing toward 65 percent in the last fortnight, rainfall under 20mm. The 614-step Vindhyagiri climb (barefoot, sun-exposed, steep) compresses to 6-9am — by mid-morning the granite step temperature rises and the bare-feet rule makes the climb punishing. Drinking-water carriers on the route (₹20/bottle) and the ASI shade stations at landings every 100 steps help but most visitors choose 6.30am start. The 17.4m Bahubali Gomateshwara (981 CE, world''s largest free-standing monolith) holds full visitor access throughout the day; abhisheka rituals 9.30am and 5.30pm. Chandragiri hill (175 steps, Bhadrabahu cave — Chandragupta Maurya''s 297 BCE final-fast tradition, the act that ended the Maurya dynasty) at clean access. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base. Holi long weekend (variable mid-March, 2026) brings 3-day domestic bump. Hotel rates ease 10 percent versus February: Inchara Hotel ₹2,000-3,500, Jain Heritage Bunglows ₹2,500-4,000. Most visitors day-trip from Bengaluru (160km, 3hr on NH-75) or Mysore (85km, 2hr on NH-275).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 4, 3, 'wait',
  'Pre-monsoon heat. 23-35C, humidity 70 percent. 614-step barefoot climb unviable mid-day. Dawn-only.',
  'April pushes the Vindhyagiri 614-step climb into dawn-only operation. Mid-day granite stones (35C+ surface temperature) make the barefoot ascent dangerous. Dawn 5.45-7.30am only. Hotel rates 25 percent below February peak.',
  'April pushes Shravanabelagola into endurance mode. The 614-step barefoot climb up sun-exposed granite at 35C surface temperature is dangerous mid-day. Dawn-only operation. Wait for October-November for the clean climb.',
  'Shravanabelagola in April is when the Vindhyagiri climb narrows to dawn-only. Daytime 30-35C, nights 23-25C, humidity 70 percent, granite step surface temperatures hit 38-42C through mid-day. The 614-step barefoot ascent — the climb that defines the Shravanabelagola visit — becomes dangerous 9am-5pm; barefoot on granite at 40C causes burns within minutes. Dawn 5.45-7.30am only — the entry-deposit shoe stand at the base opens 5.30am for the pre-dawn climb. The Bahubali Gomateshwara monolith (981 CE Chavundaraya, 17.4m world''s largest free-standing monolith) holds visitor access through the day but the climb to reach it is the obstacle. The abhisheka rituals continue 9.30am and 5.30pm — most April visitors attend the evening ritual after the heat drops. Chandragiri hill (175 steps, shorter and partially shaded) at slightly more workable access — but the Maurya-era Bhadrabahu cave still requires the barefoot climb. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base — AC retreat. Hotels at lower load: Inchara Hotel ₹1,800-3,200, Jain Heritage Bunglows ₹2,200-3,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 5, 3, 'wait',
  'Pre-monsoon peak. 23-35C, humidity 75 percent. Barefoot climb impossible mid-day.',
  'May extends April endurance shape. 614-step Vindhyagiri ascent dawn-only (5.45-7.30am). Pre-monsoon thunderstorms cancel afternoon visits 3-5 days per week. Hotel rates at year-low. Wait for October.',
  'May at Shravanabelagola is when the barefoot 614-step climb becomes the trip-breaking obstacle. Granite surface 40C+ mid-day, pre-monsoon thunderstorms cancel afternoons 3-5 times per week, dawn-only operation works for the dedicated. Wait for October.',
  'Shravanabelagola in May is the pre-monsoon endurance month. Daytime 30-35C, nights 23-25C, humidity climbing past 75 percent, rainfall 80-130mm with pre-monsoon thunderstorms hitting 3-5 evenings per week. The 614-step barefoot Vindhyagiri ascent (sun-exposed granite, no shade, dangerous when wet from afternoon storms — the post-rain granite stays slippery 2-3 hours) works dawn-only 5.45-7.30am. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue) holds visitor access throughout the day but the climb is the constraint. Abhisheka rituals 9.30am and 5.30pm continue but only the dedicated make the climb at those hours. Chandragiri hill (175 steps to the Bhadrabahu cave — Maurya tradition that Chandragupta Maurya died here in 297 BCE as a Jain ascetic, the act that ended the Maurya dynasty) similarly compressed to dawn. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base — AC retreat through the heat. Power cuts run 1-2 hours daily through the last 10 days. Hotel rates at year-low: Inchara Hotel ₹1,500-2,800, Jain Heritage Bunglows ₹2,000-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 6, 4, 'go',
  'SW monsoon arrives. 22-29C, 70-100mm rainfall. Vindhyagiri walkable on dry mornings.',
  'June is when the SW monsoon hits but Shravanabelagola sits in partial rain-shadow at 750m. 70-100mm rainfall, the 614-step barefoot climb works on dry mornings 7-10am. Granite slippery 2-3hr after storms.',
  NULL,
  'Shravanabelagola in June is the year''s most comfortable stretch by temperature — the southwest monsoon arrives in the first fortnight (Karnataka inland onset June 5-10), bringing 70-100mm rainfall across 12-15 wet days, almost all as 2-3 hour afternoon downpours. Daytime 24-29C, nights 22-24C, humidity 80 percent. Shravanabelagola sits at 750m elevation in the partial rain-shadow of the Western Ghats — far lighter than coastal Karnataka (Mangalore 1000mm in June) or Coorg/Chikmagalur (600-800mm). The 614-step Vindhyagiri climb (barefoot, sun-exposed, dangerous when wet — the post-rain granite stays slippery 2-3 hours) works on dry mornings 7-10am — significantly better than May''s heat constraint though afternoon storm cancellations still hit 30-40 percent of days. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolith) holds full visitor access; abhisheka rituals 9.30am and 5.30pm. Chandragiri hill (175 steps, the Bhadrabahu cave — Chandragupta Maurya''s 297 BCE final-fast tradition that ended the Maurya dynasty) accessible. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 7, 4, 'go',
  'SW monsoon. 22-27C, 80-110mm rainfall. Dry-morning climbs viable. Hill at year-greenest.',
  'July holds the June pattern — 80-110mm rainfall, light versus coastal Karnataka. Vindhyagiri climb works dry mornings. Hill at peak monsoon green. Combined Hassan-Belur-Halebidu circuit at clean access.',
  NULL,
  'Shravanabelagola in July is the second comfortable monsoon month — 80-110mm rainfall across 15-18 wet days, materially lighter than coastal Karnataka (Mangalore 800-1000mm) or the Western Ghats (Coorg 800-1000mm). Daytime 24-27C, nights 22-24C, humidity 85 percent. The 614-step Vindhyagiri climb (barefoot, sun-exposed but cool granite in monsoon weather, dangerous when wet) works dry mornings 7-10am — afternoon storm cancellations hit 35-45 percent of days. Vindhyagiri at peak monsoon green from the summit viewline. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue) holds visitor access throughout — the abhisheka rituals 9.30am and 5.30pm continue. Chandragiri hill (175 steps to the Bhadrabahu cave — the Maurya-era Jain tradition that Chandragupta Maurya died here in 297 BCE under his teacher Bhadrabahu) at peak post-rain visibility. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base — covered indoor walkthrough through the heat. Hotel rates: Inchara Hotel ₹1,800-3,200, Jain Heritage Bunglows ₹2,200-3,800.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 8, 4, 'go',
  'SW monsoon continues. 22-28C, 90-120mm rainfall. Independence Day weekend bump.',
  'August holds the July pattern with marginal pickup in rain days. Independence Day (Aug 15) brings 3-day domestic bump from Bengaluru-Mysore. Vindhyagiri climb works dry mornings. Hassan-Belur-Halebidu circuit at clean access.',
  NULL,
  'Shravanabelagola in August holds the July monsoon pattern with marginally more rain days. 90-120mm rainfall across 17-20 wet days, daytime 24-28C, nights 22-24C, humidity 85 percent. The 614-step Vindhyagiri climb (barefoot, sun-exposed but cool granite, slippery 2-3 hours after storms) works dry mornings 7-10am — afternoon storm cancellations hit 35-45 percent of days. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolith) holds full visitor access throughout the day; abhisheka rituals 9.30am and 5.30pm. Chandragiri hill (175 steps, the Bhadrabahu cave — Chandragupta Maurya''s 297 BCE final-fast tradition under teacher Bhadrabahu, the act that ended the Maurya dynasty) at peak monsoon green. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru, Mysore, Mangalore — Shravanabelagola sees the heritage-tourist wave from Bengaluru-Belur circuit travelers. Hotel rates: Inchara Hotel ₹2,000-3,500 around Aug 15, otherwise ₹1,800-3,200; Jain Heritage Bunglows ₹2,500-4,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 9, 4, 'go',
  'SW monsoon retreating. 21-29C. Vindhyagiri climb at full reliability from week 3.',
  'September is the recovery month. SW monsoon retreats by Sep 20-25, Vindhyagiri 614-step climb returns to full-day reliability. Mahavir Jayanti or other Jain calendar dates may bring small bumps.',
  NULL,
  'Shravanabelagola in September is the soft re-opening. Rainfall drops to 90-130mm across 14-17 wet days. Daytime 25-29C, nights 21-23C, humidity easing toward 75 percent. The southwest monsoon retreats from interior Karnataka by September 20-25; the 614-step Vindhyagiri climb (barefoot, sun-exposed) returns to full-day reliability from week three. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue) and the abhisheka rituals 9.30am and 5.30pm at full schedule. Chandragiri hill (175 steps, the Bhadrabahu cave — Chandragupta Maurya''s 297 BCE final-fast tradition that ended the Maurya dynasty by abdication and sallekhana under teacher Bhadrabahu) at peak post-monsoon green. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base. Paryushana (the 8-day Shvetambara Jain holy period, variable Aug-Sep; Digambara Das Lakshana 10 days, also variable) calendar dates can bring religious-pilgrimage bumps — verify against 2026 lunar calendar. Hotel rates climb 5-8 percent from August levels: Inchara Hotel ₹2,000-3,500, Jain Heritage Bunglows ₹2,500-4,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 10, 5, 'go',
  'Season opens. 20-29C. Vindhyagiri 614-step climb at full reliability. Post-monsoon clean.',
  'October is the proper season opener. NE monsoon overspill light, 614-step Vindhyagiri climb at clean post-monsoon conditions. Hassan-Belur-Halebidu UNESCO Hoysala circuit at full access. Hotel rates 15-20 percent below December peak.',
  NULL,
  'Shravanabelagola in October is when the heritage site returns to full operations. Daytime 24-29C, nights 20-22C, humidity dropping toward 70 percent, rainfall 100-140mm — northeast monsoon overspill from Tamil Nadu hits mostly as 1-2 hour evening showers in the first fortnight. The 614-step Vindhyagiri climb (barefoot, sun-exposed but cool October temperatures, granite dry from week two onward) at full-day reliability. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue, the inscribed Western Ganga commission marking the high water mark of South Indian Jain architecture) at full visitor access; abhisheka rituals 9.30am and 5.30pm at clean schedule. Chandragiri hill (175 steps, the Bhadrabahu cave — Chandragupta Maurya''s 297 BCE death tradition under teacher Bhadrabahu, the act that closed the Maurya dynasty by abdication) at clean access. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base. Hotel rates: Inchara Hotel ₹2,200-3,800, Jain Heritage Bunglows ₹2,800-4,500. Most visitors day-trip from Bengaluru (160km, 3hr on NH-75) or Mysore (85km, 2hr on NH-275).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 11, 5, 'go',
  'High season builds. 18-28C, dry. 614-step climb at year-best. Hassan-Belur-Halebidu circuit peak.',
  'November is the genuine pivot to Shravanabelagola high season. Rainfall under 50mm, humidity 60 percent. 614-step Vindhyagiri climb at year-best workability. Hassan-Belur-Halebidu UNESCO Hoysala combined circuit at peak.',
  NULL,
  'Shravanabelagola in November is when the heritage site turns to its strongest stretch. Northeast monsoon overspill spent by mid-month, rainfall under 50mm across 4-6 wet days. Daytime 25-28C, nights 18-20C, humidity 60 percent. The 614-step Vindhyagiri climb (barefoot, sun-exposed, cool granite in November temperatures) at year-best workability — the climb works 6am-5pm without heat constraint. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue) at full visitor access; abhisheka rituals 9.30am and 5.30pm. Karnataka Rajyotsava (November 1) brings a 1-day state-celebration bump. Chandragiri hill (175 steps, the Bhadrabahu cave — Chandragupta Maurya''s 297 BCE final-fast tradition under teacher Bhadrabahu, the act that ended the Maurya dynasty by abdication and sallekhana) at clean access. Bhandara Basadi Jain temple complex (12th-century Hoysala) at base. Hotel rates climb 15-20 percent across the month: Inchara Hotel ₹2,800-4,200, Jain Heritage Bunglows ₹3,500-5,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('shravanabelagola', 12, 5, 'go',
  'Peak season. 17-27C, dry. 614-step climb at year-best. Christmas-NYE Hassan hotel rates climb 25 percent.',
  'December is the year''s most reliable Shravanabelagola window — peak weather, dry, full operational tempo. 614-step Vindhyagiri climb at year-best. Hassan-Belur-Halebidu UNESCO Hoysala circuit at peak. Christmas-NYE Hassan hotel rates climb.',
  NULL,
  'Shravanabelagola in December is the year''s most coherent window — peak weather, full operational tempo, the heritage site at year-cleanest. Daytime 23-27C, nights 17-19C (some mornings drop to 15C), humidity 55 percent, rainfall under 10mm. The 614-step Vindhyagiri climb (barefoot, sun-exposed, cool granite in December temperatures) at year-best workability — the climb works 6am-5pm without heat constraint, dawn mornings hold cold-stone underfoot conditions ideal for the ascent. The 17.4m Bahubali Gomateshwara monolith (981 CE Chavundaraya, world''s largest free-standing monolithic statue — the inscribed Western Ganga Dynasty commission completed during the reign of King Rachamalla IV, the high water mark of South Indian Jain monolithic architecture) at peak visitor access. Abhisheka rituals 9.30am and 5.30pm at year-busiest crowds. The Mahamastakabhisheka (the 12-yearly anointment of the 17m statue with 3148kg of sugar, ghee, turmeric, sandalwood paste, and 8 sacred metals) was last held February 17-25, 2018; next 2030 — do NOT plan for 2026.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
