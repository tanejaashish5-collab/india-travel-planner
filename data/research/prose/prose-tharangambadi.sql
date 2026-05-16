-- Tharangambadi (Tranquebar) destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: tharangambadi | best_months [10,11,12,1,2,3] | avoid [6,7,8]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 1, 5, 'go',
  'Peak Danish-quarter window. 22-29C, dry. Fort Dansborg + New Jerusalem Church + Masilamani Nathar walkable.',
  'January is the strongest stretch. Daytime 22-29C, dry, sea breeze cool. The Danish quarter walking trip — Fort Dansborg, New Jerusalem Church, Masilamani Nathar Temple — works full hours. Pongal weekend (Jan 14-17) brings weekend traffic.',
  NULL,
  'Tharangambadi in January is the version a Danish-colonial trip is built around. Daytime 22-29C, nights 20C, humidity 65 percent. The town — Tranquebar in the original Danish, the only Danish colony on the Indian subcontinent, established 1620 by Admiral Ove Gjedde under a trade lease with the Thanjavur Nayak — sits 280km south of Chennai. Fort Dansborg (1620, earliest European fort in India, now a Government Museum 10am-5pm Wed-Mon ₹15) is the year-round anchor — Danish governor''s artefacts, the Tamil-Danish printing-press history (first printing press in India arrived 1712 with the Tranquebar Mission), tsunami-recovery exhibits. New Jerusalem Church (1718, India''s oldest Protestant church, founded by German Lutheran Bartholomew Ziegenbalg who translated the New Testament into Tamil) opens 9am-1pm + 3-6pm Mon-Sat. Masilamani Nathar Temple (1305 CE, half-collapsed from the 2004 tsunami). The 2004 Tsunami Memorial sits on the Danish Quarter beach. Bungalow on the Beach (Neemrana, ₹8-12k) and The Gate House at Tranquebar (Neemrana, ₹6-9k) anchor heritage-stay options.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 2, 5, 'go',
  'Driest month. 22-30C. Danish Quarter walking peak. Heritage-fort photography window cleanest.',
  'February is the technical peak. Rainfall under 10mm, low humidity, Fort Dansborg sea-side facade catches dawn light cleanly. Bungalow on the Beach at peak.',
  NULL,
  'February in Tharangambadi is the year''s cleanest weather window. Rainfall under 10mm, daytime 23-30C, humidity 60 percent, sea breeze from 10am. Fort Dansborg (1620, the earliest European fort in India) at peak photography — the sea-side white-and-yellow facade catches dawn light 6:10am, the Goldsmith Street approach holds afternoon light 4-5:30pm. Danish Quarter walking (King Street, Queen Street, Goldsmith Street — original Danish-grid names preserved by ASI heritage status) works full hours. New Jerusalem Church (1718, India''s oldest Protestant church) opens 9am-1pm + 3-6pm Mon-Sat; the inner-courtyard cemetery holds Bartholomew Ziegenbalg''s 1719 grave. Masilamani Nathar Temple (1305 CE) — the half-collapsed mukhamandapam since the 2004 tsunami is the year-round bitter-sweet anchor; surviving sanctum runs 6am-12pm + 4-8pm darshan. The 2004 Tsunami Memorial holds the names of 7,983 victims from the Nagapattinam-Tranquebar-Karaikal coastal stretch. Bungalow on the Beach (Neemrana) at peak ₹10-14k. The Gate House at Tranquebar (Neemrana, ₹7-10k) and Nayak House (Neemrana, ₹6-9k). Day-trip from Pondicherry 110km, 2.5 hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 3, 4, 'go',
  'Last cool month. 24-31C, humidity climbing. Danish Quarter walks pre-11am and post-5pm.',
  'March extends the February window. Heritage walks comfortable mornings and evenings. Hotel rates ease 20 percent versus February peak. Last clean window before April heat.',
  NULL,
  'March in Tharangambadi is the soft-landing month before the heat dome opens. Daytime 25-31C, humidity climbing from 65 to 75 percent across the month, sea breeze starting later (1pm) and weakening by 6pm. Fort Dansborg, New Jerusalem Church, Masilamani Nathar Temple, the 2004 Tsunami Memorial — the Danish Quarter walking circuit works pre-11am and 4:30-6:30pm windows. The Danish Quarter heritage status (declared by ASI and the National Museum of Denmark in 2001 under a Danish-Indian cultural cooperation) preserves the 17th and 18th-century street grid; the King Street, Queen Street, Goldsmith Street, and Admiral Street alignments remain unchanged from the Danish governor''s 17th-century town plan. The Tranquebar Mission (founded 1706 by Bartholomew Ziegenbalg and Heinrich Plütschau — the first Protestant missionaries to India) is the cultural anchor that the New Jerusalem Church preserves. Hotel rates ease 20 percent: Bungalow on the Beach ₹8-12k, The Gate House at Tranquebar ₹6-8k, Nayak House ₹5-7k, basic homestays in the Tamil quarter ₹1.5-3k. Last comfortable Danish-Quarter walking window before April pre-monsoon heat sets in.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 4, 3, 'wait',
  'Pre-monsoon heat. 27-35C, humidity 78 percent. Danish Quarter walks compress. Tamil New Year Apr 14.',
  'April still works for early-morning Danish Quarter walks and AC heritage-bungalow stays. Tamil New Year (April 14) brings minor Hindu programming at Masilamani Nathar. Mid-day pool-and-AC.',
  'April is when the heat opens on the Coromandel coast. Danish Quarter walking past 10am collapses. Push to October-November for full clean shape.',
  'April in Tharangambadi is when the Danish Quarter trip narrows to dawn-and-dusk. Daytime 28-35C, humidity 78 percent, sea breeze unreliable till 4pm. Tamil New Year (Puthandu, April 14) is observed at Masilamani Nathar Temple — the surviving sanctum holds 5am pre-dawn abhishekam — but the Danish heritage core is not Hindu-festival anchored. The walking circuit compresses to 6-9am and 6-8pm windows. Fort Dansborg (10am-5pm Wed-Mon) opening hour is 30C; by noon the fort courtyard hits 35C+ and the museum interior gets warm despite ceiling-fan ventilation. New Jerusalem Church holds full hours. Bungalow on the Beach (Neemrana, the Danish governor''s 17th-century bungalow) pool and the sea-side stone terrace become the mid-day anchor — Neemrana Hotels run a "summer beach stay" at Bungalow on the Beach at ₹7-10k including breakfast, pool. Hotel rates drop 25-30 percent versus February: Bungalow on the Beach ₹7-10k, The Gate House ₹5-7k, Nayak House ₹4-6k, basic homestays ₹1-2.5k. Push to October 15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 5, 2, 'wait',
  'Peak heat. 28-37C, humidity 80 percent. Danish Quarter mid-day functionally closed. Hotel rates year-low.',
  'May functions for pool-and-AC heritage-bungalow stays. Danish Quarter walks 6-9am only. Pre-monsoon thunderstorms last 10 days.',
  'May is the harshest stretch on the Coromandel coast. Fort Dansborg and Danish Quarter walking compress to dawn. Push to October-November.',
  'May in Tharangambadi runs the heat dome at full strength. Daytime 29-37C with the last week occasionally hitting 39C, humidity 80 percent, sea breeze starting only after 5pm. Fort Dansborg courtyard and the Goldsmith Street / King Street walking core become uncomfortable by 9:30am. New Jerusalem Church holds its cool interior all day. Pre-monsoon thunderstorms hit the last 10 days as Mango Showers — 30-90 minute evening squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours. The Bungalow on the Beach pool and the sea-side stone terrace are the mid-day anchor. Hotel rates at year-low: Bungalow on the Beach ₹6-9k, The Gate House ₹4-6k, Nayak House ₹3-5k, basic homestays ₹800-2k. Masilamani Nathar Temple holds reduced 5-8am + 5-8pm hours through the heat. The Karaikal-Nagapattinam-Tranquebar coastal stretch sees pre-monsoon humidity reach 90 percent some afternoons. October 15 onward is the next clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 6, 2, 'wait',
  'SW monsoon weak on TN coast. 27-34C, only 50-70mm rain. Heat continues. Danish Quarter walks pre-9am only.',
  NULL,
  NULL,
  'June in Tharangambadi sits in the SW monsoon rain shadow — the Western Ghats absorb most moisture and only 50-70mm of light rain reaches the Coromandel coast through the month. Heat dominates: daytime 27-34C, humidity 78 percent. Fort Dansborg courtyard and Danish Quarter walking compress to 6-9am dawn. Sea breeze starting after 4pm; the Bungalow on the Beach pool and sea-side stone terrace work post-4pm. Hotel rates remain low-season: Bungalow on the Beach ₹6-9k, The Gate House ₹4-6k, Nayak House ₹3-5k. New Jerusalem Church holds full hours through the SW monsoon residue. Masilamani Nathar Temple reduced hours 5-8am + 5-8pm. For travelers anchoring in the broader Tamil Nadu Bay coast, Velankanni (40km south, the Roman Catholic Marian basilica — Our Lady of Good Health Velankanni, founded in 1771, the Lourdes of the East) is a year-round Catholic-pilgrimage anchor. Nagapattinam (28km south, the Aadi Tamil hub) and Karaikal (35km north, French-colonial enclave of Puducherry UT) round out the cluster. The clean travel window opens with the NE monsoon retreat in mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 7, 2, 'wait',
  'SW monsoon residual. 26-32C, 100-130mm rain. Sea breeze stronger. Mid-day still demanding.',
  'July sees first heat retreat — sea breeze stronger, rain showers 7-9 days. Danish Quarter walks pre-10am and post-5pm. Push to October.',
  NULL,
  'July in Tharangambadi marks the first measurable heat retreat. Daytime 26-32C, humidity 80 percent, sea breeze stronger from 2pm. SW monsoon residual brings 100-130mm across 7-9 wet days — short evening squalls. The Danish Quarter walking circuit opens pre-10am and post-5pm windows. Fort Dansborg interior is comfortable through the day with sea-side cross-ventilation; New Jerusalem Church holds its cool interior. Masilamani Nathar Temple at standard hours. Bungalow on the Beach (Neemrana) and The Gate House run regular schedules. Hotel rates remain low-season: Bungalow on the Beach ₹6-9k, The Gate House ₹4-6k, Nayak House ₹3-5k, basic homestays ₹1-2.5k. Aadi Perukku (August 3, fixed Cauvery river-bank festival) approaches — the Cauvery delta district where Tharangambadi sits sees significant Aadi-month religious traffic. October 15 onward delivers a much cleaner travel shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 8, 2, 'wait',
  'Aadi Perukku Aug 3. 26-32C, 130-160mm rain. Velankanni festival Aug 29-Sep 8 nearby. Heat retreating.',
  'August brings Aadi Perukku (Cauvery river-bank festival, August 3 fixed) and the Velankanni Marian Feast (August 29 - September 8) just 40km south. Heat retreating slowly. October is the cleaner call.',
  'August holds the July pattern. Aadi Perukku brings Cauvery-delta religious traffic. Outdoor walks limited to dawn and post-7pm. October is dramatically cleaner.',
  'August in Tharangambadi layers two regional cultural anchors. Aadi Perukku (August 3, fixed Cauvery river-bank festival) is observed across the Cauvery delta district — Mayuram, Tanjore, Srirangam, Trichy are the headline venues but Tharangambadi-Nagapattinam-Karaikal coastal communities stage parallel water rituals at the sea. The Velankanni Marian Feast (August 29 to September 8, ten days, climaxing on the September 8 Feast of the Nativity of Mary at the Our Lady of Good Health Basilica, Velankanni, 40km south) is the year''s biggest Catholic pilgrim event on the Tamil coast — 4-5 million pilgrims across the ten days from Tamil Nadu, Andhra, Karnataka, Kerala, Sri Lanka, Goa. Tharangambadi accommodation books out from late August. Daytime 26-32C, humidity 80 percent, rain 130-160mm across 10-12 wet days. Bungalow on the Beach (Neemrana) and The Gate House at peak Velankanni-feast pricing late month — Bungalow on the Beach ₹10-14k late August. Push to mid-October for cleaner non-festival window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 9, 3, 'wait',
  'Velankanni feast Sep 8 tail. 25-31C, 130-180mm rain. Heat easing. Heritage walks lengthen.',
  'September has the Velankanni feast climax (Sep 8) 40km south. Heat retreating, sea breeze reliable. Danish Quarter walks lengthen pre-NE-monsoon.',
  NULL,
  'September in Tharangambadi is the bridge month before the NE monsoon arrives. Daytime 26-31C, humidity 78 percent, sea breeze reliable from 1pm. The Velankanni Marian Feast climaxes September 8 (Feast of the Nativity of Mary) — Tharangambadi accommodation holds late-August peak pricing through September 8, then drops to standard September rates. The Danish Quarter walking circuit (Fort Dansborg, New Jerusalem Church, Masilamani Nathar Temple, Tsunami Memorial, Goldsmith Street / King Street heritage core) opens up — pre-11am and post-4pm windows lengthen. Hotel rates Sep 9 onward climb 15-20 percent versus low-season: Bungalow on the Beach ₹8-12k, The Gate House ₹5-7k, Nayak House ₹4-6k, basic homestays ₹1.5-3k. Vinayaka Chathurthi (around September 7, 2026) brings minor Pillayar processions at Tharangambadi but the Cauvery-delta district is more Vaishnavite-oriented. The NE monsoon arrives mid-to-late October — temperature relief is dramatic. Mid-October onward is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 10, 4, 'go',
  'Season opens. 24-30C, 280-380mm rain. NE monsoon arrives. Cyclone watch begins — Gaja Nov 2018 hit Vedaranyam.',
  'October is the season opener. NE monsoon delivers 280-380mm but temperature drops dramatically. Danish Quarter walks return mid-month. Cyclone watch begins — Gaja (November 2018) hit Vedaranyam 60km south.',
  NULL,
  'October in Tharangambadi is the proper season opener. The NE monsoon arrives in force from mid-month — rainfall jumps to 280-380mm across 12-14 wet days, but the temperature drop is dramatic. Daytime falls from late-September''s 31C to 24-30C, granite of Fort Dansborg cools below 35C surface mid-day, sea breeze cool and reliable. The Danish Quarter walking circuit resumes its full shape from October 15 onward. Cyclone watch begins along the Coromandel coast — IMD monitors Bay of Bengal lows from October 1; Tharangambadi sits in the high-risk cyclone path. Cyclone Thane (December 2011) hit Cuddalore 90km north; Cyclone Gaja (November 16, 2018) hit Vedaranyam 60km south and devastated the Nagapattinam-Tranquebar coastal stretch — 60+ deaths, 80,000+ trees uprooted. The fort and church survived; Masilamani Nathar Temple had already lost its mukhamandapam to the 2004 tsunami. Track IMD updates via mausam.imd.gov.in. Hotel rates climb to 50-60 percent of December peak: Bungalow on the Beach ₹8-12k, The Gate House ₹5-8k, Nayak House ₹4-6k, basic homestays ₹2-3.5k. Strong call for first-time visitors who can tolerate occasional cyclone-watch days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 11, 5, 'go',
  'High season. 22-29C, 350-450mm rain. Cyclone watch holds — Gaja Nov 2018 + Nivar Nov 2020 both November landfalls.',
  'November is full high season. Rain still substantial (350-450mm) but mornings clean, full Danish Quarter walking. Cyclone watch holds — Gaja and Nivar both November landfalls on this coast.',
  NULL,
  'November in Tharangambadi is the proper high-season month with active cyclone-watch caveat. The NE monsoon remains active (350-450mm across 13-15 wet days) but rain shifts to short evening squalls — mornings often run clean. Daytime 23-29C, nights 22C, humidity 75 percent. Cyclone watch holds at year-peak intensity — Cyclone Nivar landed at Cuddalore 90km north on November 25, 2020; Cyclone Gaja landed at Vedaranyam 60km south on November 16, 2018; Cyclone Thane hit December 2011. The Nagapattinam-Tranquebar-Karaikal coastal stretch is one of the most cyclone-prone in India. IMD monitors Bay of Bengal lows daily; mausam.imd.gov.in. Most cyclone-warning closures last 1-3 days. The Danish Quarter walking circuit works at full reach 7am-6pm between weather events. Fort Dansborg, New Jerusalem Church, Masilamani Nathar Temple, the 2004 Tsunami Memorial all walkable. Hotel rates climb to 75-85 percent of December peak: Bungalow on the Beach ₹10-14k, The Gate House ₹7-10k, Nayak House ₹5-8k, basic homestays ₹2.5-4k. Build 1-2 buffer days for cyclone-watch flexibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tharangambadi', 12, 5, 'go',
  'Peak season. 21-28C, 180-250mm rain. Cyclone watch through Dec 20 — Thane Dec 2011 hit Cuddalore. Christmas-NYE 2x.',
  'December is operational peak. Cyclone watch holds through Dec 20 historically — Thane (December 2011) hit Cuddalore. Christmas-NYE rates 1.5-2x. Lock heritage-bungalow rooms 6-8 weeks ahead.',
  NULL,
  'December in Tharangambadi is the operational peak. Daytime 22-28C, nights 20C, rain 180-250mm across 8-10 wet days (NE monsoon tail), humidity 70 percent. Cyclone watch holds through December 20 historically — Cyclone Thane hit Cuddalore (90km north) on December 30, 2011, with major destruction along the Pondicherry-Cuddalore-Tranquebar stretch. IMD updates daily via mausam.imd.gov.in. The Christmas-NYE corridor (December 22 to January 5) sees Tharangambadi rates run 1.5-2x the November baseline — strong demand from Pondicherry-Chennai weekenders extending New Year onto the Tranquebar heritage coast: Bungalow on the Beach hits ₹14-18k, The Gate House ₹9-12k, Nayak House ₹7-10k, basic homestays ₹3-5k. Fort Dansborg (10am-5pm Wed-Mon ₹15 entry), New Jerusalem Church (9am-1pm + 3-6pm Mon-Sat), Masilamani Nathar Temple all open through the festive corridor. The 2004 Indian Ocean Tsunami Memorial (December 26, 2004 — Tharangambadi lost most of its sea-facing structures including the mukhamandapam of the Masilamani Nathar Temple) holds quiet commemorative gathering each December 26. Lock Neemrana heritage rooms 6-8 weeks ahead from October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
