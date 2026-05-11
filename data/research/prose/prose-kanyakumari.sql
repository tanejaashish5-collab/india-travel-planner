-- Kanyakumari destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kanyakumari

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 1, 5, 'go',
  'Peak window. 22-29C. Vivekananda Jayanthi Jan 12. Sunrise viewing at year-cleanest.',
  'January is when Kanyakumari runs at its strongest. NE monsoon retreated, daytime 26-29C, sea breeze constant from three oceans. Vivekananda Jayanthi (Jan 12) brings focus to the Rock Memorial. Sunrise from Sunrise View Point at year-cleanest visibility — sub-15km haze.',
  NULL,
  'Kanyakumari in January is the version Tamil Nadu travellers wait for. Daytime sits at 26-29C, nights drop to 22-23C, rainfall under 40mm, the trade winds bring a near-constant sea breeze off the triveni sangam — the only point on the Indian mainland where the Bay of Bengal, the Arabian Sea, and the Indian Ocean meet. Vivekananda Jayanthi (January 12) anchors the month at the Vivekananda Rock Memorial — the 1970 memorial commemorates Swami Vivekananda''s 1892 meditation on the offshore rock just before he sailed to the 1893 Parliament of World Religions in Chicago. Ferry to the rock runs every 30 minutes from 8am to 4pm, ₹75 per head; the parallel ferry to the Thiruvalluvar Statue (133ft, completed year 2000, representing the 133 chapters of the Thirukkural) operates on the same ticket. Sunrise from the Sunrise View Point at year-cleanest visibility (sub-15km haze versus 25-40km in Apr-Jun). The Kanyakumari Amman Temple (the Kumari Amman shrine for which the town is named) at full ritual tempo; the Bay-side cove Triveni Sangam ghat sees pre-dawn ritual bathers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 2, 5, 'go',
  'Driest month. 22-30C. Trade-wind constant. Sunrise + ferry at peak comfort.',
  'February is the technical peak. Rainfall under 20mm, daytime 27-30C, nights 22-23C, trade winds near-constant. The Vivekananda Rock + Thiruvalluvar Statue ferry runs unimpeded. Padmanabhapuram Palace half-day trip at year-cleanest visibility.',
  NULL,
  'February in Kanyakumari is the dry-quarter technical peak. Rainfall under 20mm, daytime 27-30C, nights 22-23C, humidity at 65 percent — the lowest of the year for the southern tip. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs every 30 minutes from 8am to 4pm at ₹75 per head; queues at the Vavathurai jetty stay under 20 minutes through midday. Sunrise from the Sunrise View Point and the parallel Sunset View Point both at year-best clarity — visibility 12-18km out to sea on most days. **A correction on the tagline:** the sunrise-AND-sunset over the sea from the SAME point only happens Apr-Sep when the sun''s declination allows; in February, sunrise rises over the Bay of Bengal at the east-facing view point but sunset drops behind the coastal ridge at Kovalam (an angle that depends on month) — both visible if you walk 800m between the two viewing platforms. Kanyakumari Amman Temple at full ritual tempo. Padmanabhapuram Palace (35km west, the Travancore wooden palace) at year-cleanest visibility. Suchindram Temple (12km north, the Sthanumalayan deity unique to this temple) opens the half-day extension.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 3, 4, 'go',
  'Last cool month. 24-32C. Sea breeze still active. Rates 25 percent below February.',
  'March extends February''s pattern. Daytime 30-32C, trade winds active 10am-7pm. Sunrise still spectacular though haze begins. Hotel rates drop 25 percent versus February — strong value window before April heat lift.',
  NULL,
  'March in Kanyakumari is the soft-landing month. Daytime climbs to 30-32C, nights 24-25C, humidity 70 percent, rainfall under 30mm. The trade winds still arrive 10am through 7pm; the southern-tip geography keeps Kanyakumari 4-6C cooler than inland Madurai 250km north. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs unchanged from February — ticket ₹75, 8am to 4pm. Sunrise photography still strong though pre-monsoon haze begins entering the Bay around mid-month; visibility drops to 10-12km versus February''s 15-18km. Sunset View Point still clean. The Kanyakumari Amman Temple at full ritual tempo. Padmanabhapuram Palace (35km west — the wooden Travancore palace, ₹100 entry, closed Monday) half-day extension at quieter mid-month visitor load. Suchindram Temple (12km north) for the Sthanumalayan trinity-deity darshan. Hotel rates ease 25 percent off February: Sparsa Resort ₹2,800-4,500, Singaar ₹2,500-4k, beach homestays ₹700-1,200. The triveni sangam ritual ghat at year-quietest pilgrim density. Last clean-value window before April begins lifting daytime past comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 4, 4, 'go',
  'Pre-monsoon. 26-34C. Trade winds easing. Sunrise + sunset from same point becomes possible.',
  'April is when the sun''s declination shifts enough for sunrise AND sunset to be visible from the same Kanyakumari headland — the tagline''s defining claim. Daytime 32-34C, AC retreat needed mid-day. Hotel rates at year-low.',
  NULL,
  'April in Kanyakumari is the geometric sweet-spot month for the town''s defining claim. The sun''s declination (apparent latitude) shifts north of the equator from late March; by April both sunrise (over the Bay of Bengal to the east) and sunset (over the Arabian Sea to the west) become visible from the same headland viewing platform — the only stretch of mainland coast in India where this works through summer. Daytime 32-34C, nights 26-27C, humidity climbing past 75 percent, rainfall under 50mm. Trade winds become irregular — some afternoons calm by 2pm. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs full schedule at ₹75 (the Vavathurai jetty queue stays short outside school holidays). The pre-monsoon thunderstorms hit the last fortnight as short violent squalls that drop temperatures 4-5C temporarily but raise humidity for the rest of the day. Padmanabhapuram Palace (35km west) and Suchindram Temple (12km north) workable as morning-and-evening trips with AC mid-day breaks. Hotel rates at year-low ahead of the southwest monsoon: Sparsa Resort ₹2,200-3,800, Singaar ₹2-3,500, beach homestays ₹500-1,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 5, 3, 'wait',
  'Heat peak. 27-35C. SW monsoon advance squalls last fortnight. Trade winds irregular.',
  'May splits in two — first fortnight extends April (sunrise+sunset from same point, hotels at year-low) — last 10 days bring SW monsoon advance squalls. Daytime 33-35C, sea breeze irregular. Push to October if comfort matters.',
  'May at Kanyakumari pushes past comfort despite the coastal geography. Daytime 33-35C, trade winds fail some afternoons, ferry to the Vivekananda Rock runs but sea state increases. The Oct-Mar window is dramatically better.',
  'May in Kanyakumari splits cleanly in two. The first fortnight extends April: daytime 33-35C, trade winds irregular, both sunrise and sunset still visible from the same headland (the geometric window stays open through August). The Vivekananda Rock Memorial ferry (₹75, 8am-4pm) runs unchanged; the Thiruvalluvar Statue extension at full access. By the third week, southwest monsoon advance squalls start hitting the Kerala-Tamil Nadu southern tip — Kanyakumari at sea level receives the first 80-120mm of the season as short late-afternoon thunderstorms. Sea state climbs through the last 10 days and the ferry suspends on heavy-swell days (check the Mandapam coast guard advisory before booking). Padmanabhapuram Palace (35km west, the wooden Travancore palace) and Suchindram Temple (12km north) workable mornings. Hotel rates remain at year-low through the first fortnight, climbing 10-15 percent the last week on monsoon-tourism interest: Sparsa Resort ₹2,500-4k, Singaar ₹2,200-3,800, beach homestays ₹600-1,000. Kanyakumari Amman Temple at full ritual tempo; the triveni sangam ghat sees moderate pre-monsoon pilgrim density.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 6, 2, 'wait',
  'SW monsoon active 250-300mm. 25-30C. Ferry suspends on heavy-swell days. Tagline avoid-window.',
  'June is when the SW monsoon hits the southern tip directly. Rainfall 250-300mm, daytime 28-30C, sea state high. Ferry to Vivekananda Rock suspends 3-5 days a week. The trip you came for — Rock + sunrise + sunset — collapses. Push to October.',
  'June in Kanyakumari is the SW monsoon arrival point on the southern tip. Daily rainfall 250-300mm, ferry suspensions, sea state hostile, sunrise viewing rare. The trip-defining Vivekananda Rock visit becomes a gamble. Wait for October.',
  'June in Kanyakumari is the southwest monsoon at arrival. Kerala''s monsoon current crosses the southern tip on its way up the Western Ghats — Kanyakumari, while it sits in the Tamil Nadu rain-shadow for the inland SW monsoon, sits directly in the path of the current at sea level. Rainfall jumps to 250-300mm across 18-22 wet days; daytime 28-30C feels mild but humidity at 88 percent and Bay-and-Arabian-Sea swell combine to grim weather. The Vivekananda Rock Memorial ferry (₹75) suspends 3-5 days a week — the Vavathurai jetty operations team posts daily go/no-go calls at 7am, and the Thiruvalluvar Statue ferry stops on the same trigger. Sunrise viewing from the eastern platform requires clear weather; through June the count of dawn-clear days drops to 8-10 versus February''s 25-28. The triveni sangam ritual ghat sees the SW monsoon swell directly. The Kanyakumari Amman Temple at full ritual tempo (indoor). Padmanabhapuram Palace (35km west) and Suchindram Temple (12km north) workable on rain-break mornings. Hotel rates at year-low: Sparsa Resort ₹2-3,500, Singaar ₹1,800-3k, beach homestays ₹500-900.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 7, 2, 'wait',
  'Continued SW monsoon. 25-29C, 300-350mm rainfall. Ferry irregular. Sunrise rare.',
  'July is the wettest month at Kanyakumari. Ferry to Vivekananda Rock suspends 4-6 days a week. Sunrise viewing rare (10-12 clear-dawn days). Hotels at year-low. Push to mid-Oct.',
  'July in Kanyakumari is the rainiest stretch of the year. The trip-defining ferry to Vivekananda Rock runs 40 percent of days. Sunrise viewing rare. The October-March window delivers a materially better experience.',
  'July in Kanyakumari is the wettest month. Rainfall climbs to 300-350mm across 22-24 wet days, daytime 28-29C, nights 25C, humidity 90 percent. Southwest monsoon at full strength on the southern tip. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs only on rain-break mornings — typical operational count is 12-15 days out of 31 versus February''s near-full schedule. Sea state hostile most days; the Vavathurai jetty operations team posts go/no-go at 7am and suspends services without notice mid-day if the swell builds. Sunrise viewing from the eastern Sunrise View Point platform happens on 10-12 dawns at best. The Kanyakumari Amman Temple at full ritual tempo (interior); the triveni sangam ritual ghat sees swell, ritual bathing relocates to the cove. Padmanabhapuram Palace (35km west, ₹100 entry, closed Monday) and Suchindram Temple (12km north) workable on rain-break mornings. Hotel rates at year-low: Sparsa Resort ₹2-3,500, Singaar ₹1,800-3k, beach homestays ₹500-900. Aadi-month Tamil pilgrim load thin. The Oct-Mar window is dramatically better — wait.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 8, 2, 'wait',
  'SW monsoon eases. 25-30C, 200-250mm. Ferry slightly more reliable. Still skip-tier.',
  'August begins easing — rainfall drops to 200-250mm, ferry runs 18-20 days out of 31. Onam tail (Aug 25, verify) brings Kerala-side traffic 80km west. Hotels still at year-low. Mid-Oct opens the proper window.',
  'August at Kanyakumari sees the first SW monsoon easing but the ferry suspensions and limited sunrise count still keep the trip working at 60 percent. The Oct-Mar window is materially better.',
  'August in Kanyakumari is the first easing month of the SW monsoon. Rainfall drops to 200-250mm across 18-20 wet days, daytime 28-30C, nights 25C, humidity 88 percent. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs roughly 18-22 days out of 31 — the Vavathurai jetty operations team becomes more permissive as the SW monsoon swell moderates. Sunrise viewing on roughly 14-16 dawns versus July''s 10-12. Onam (Thiruvonam Aug 25, 2026 — verify on keralatourism.org) brings Kerala-side pilgrimage traffic — Kanyakumari sits 90km southeast of Trivandrum, the Tamil-Malayalee mix in town is at year-densest through the Onam week. Sadhya lunches at Sparsa Resort and Singaar Hotel (Kerala-side influence) run ₹500-800 for 26-dish banana-leaf service. The Kanyakumari Amman Temple at full ritual tempo. Padmanabhapuram Palace (35km west) and Suchindram Temple (12km north) workable. Hotel rates at year-low: Sparsa Resort ₹2-3,500, Singaar ₹1,800-3k, beach homestays ₹500-900. Aurobindo Darshan day August 15 brings minor Pondicherry-route pilgrims; Kanyakumari sees the tail. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 9, 2, 'wait',
  'SW retreat. 25-31C, 150-200mm rain. Ferry reliability climbs to 22-25 days.',
  'September sees the SW monsoon retreat. Rainfall 150-200mm, ferry runs 22-25 days, sunrise count climbs to 18-20 dawns. Hotel rates climb 15 percent off August lows. Last month before the clean October window.',
  'September at Kanyakumari is the run-in to the clean window. SW retreat improves ferry reliability but sunrise haze and 150-200mm rainfall still keep it below October. Push 4 weeks.',
  'September in Kanyakumari is the southwest monsoon''s retreat month. Rainfall drops to 150-200mm across 15-18 wet days; the SW monsoon officially withdraws from the southern tip around September 25-30 (IMD declares formal withdrawal from Kerala first). Daytime 29-31C, nights 25C, humidity 82 percent. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs 22-25 days out of 30 — the Vavathurai jetty operations team approves services on increasing morning windows. Sunrise viewing on roughly 18-20 dawns. The Kanyakumari Amman Temple at full ritual tempo, the triveni sangam ritual ghat returns to safer swell. Navarathri (the nine-night Devi festival, last week of September into first week of October in 2026) brings the Amman shrine pilgrim density; the Aigiri Nandini-set processions run nine consecutive nights. Padmanabhapuram Palace (35km west, ₹100 entry) and Suchindram Temple (12km north) workable. Hotel rates climb 15 percent off August lows: Sparsa Resort ₹2,500-4k, Singaar ₹2-3,500, beach homestays ₹600-1,000. The October 15 onward window — full ferry reliability, sunrise haze cleared, NE monsoon as evening showers not all-day storms — is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 10, 5, 'go',
  'NE monsoon arrives mid-Oct. 24-30C. Ferry at full reliability. Sunrise viewing returns.',
  'October is the season-opener. NE monsoon arrives around Oct 15 as evening showers (not storms). Daytime 27-30C, trade winds stable, ferry at full reliability through both shifts. Hotel rates 25 percent below January peak.',
  NULL,
  'October in Kanyakumari is the proper return to the southern-tip pilgrimage trip. The southwest monsoon withdraws around October 1; the northeast monsoon — Tamil Nadu''s actual rain season — arrives around October 15 as evening showers, not the all-day storms of Jun-Sep. Rainfall 200-280mm across 10-13 wet days, mostly late-afternoon. Daytime 27-30C, nights 24-25C, humidity 78 percent, trade winds stable. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry returns to full reliability — 8am to 4pm every 30 minutes, ₹75 ticket. Sunrise viewing from the Sunrise View Point at year-best post-rain clarity — visibility 12-15km out to sea on most dawns. The Kanyakumari Amman Temple at full ritual tempo; the triveni sangam ritual ghat at clean swell. Navarathri tail (the nine-night Devi festival running into early October in 2026) and Dussehra (the tenth day) bring temple precinct density. Padmanabhapuram Palace (35km west, ₹100 entry, closed Monday) and Suchindram Temple (12km north) workable through full afternoons. Hotel rates run 25 percent below January peak: Sparsa Resort ₹3-4,500, Singaar ₹2,800-4k, beach homestays ₹800-1,300.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 11, 4, 'go',
  'NE monsoon active. 23-29C, 250-300mm rain. Cyclone watch peak. Ferry mostly reliable.',
  'November is NE monsoon active — rainfall 250-300mm in evening showers. Daytime 27-29C, trade winds constant. Ferry runs 26-28 days. Cyclone watch peak (Gaja Nov 2018 hit Nagapattinam) — check IMD.',
  NULL,
  'November in Kanyakumari is the second-peak month of the southern-tip year. Northeast monsoon active with 250-300mm rainfall across 12-15 wet days, mostly late-afternoon and evening showers that rinse the headland without disrupting morning programmes. Daytime 27-29C, nights 23-24C, humidity 76 percent, trade winds constant. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry runs 26-28 days out of 30 at ₹75 ticket. Sunrise viewing from the Sunrise View Point at year-cleanest post-monsoon clarity. The Kanyakumari Amman Temple at full ritual tempo; the triveni sangam ritual ghat at moderate swell, ritual bathing returns to year-busy density. Padmanabhapuram Palace (35km west) and Suchindram Temple (12km north) workable. Hotel rates climb to 65-70 percent of January peak: Sparsa Resort ₹3,500-5k, Singaar ₹3-4,500, beach homestays ₹900-1,400. **Cyclone watch peak:** the Bay generates 60 percent of its annual cyclones in November (Gaja Nov 2018 hit Nagapattinam 350km north; Nivar Nov 2020 hit Cuddalore further north — Kanyakumari typically sees the weakening tail of these systems but landfall closer than Nagapattinam will bring 60-80kmph wind and ferry suspensions).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kanyakumari', 12, 5, 'go',
  'Peak season. 22-29C. NE monsoon wraps mid-month. Christmas-NYE rate spike.',
  'December is when Kanyakumari runs at full peak. NE monsoon wraps mid-month, rainfall easing to 150-180mm. Christmas-NYE (Dec 22-Jan 5) sees rates 2-3x normal. Lock heritage beds 4-6 weeks ahead.',
  NULL,
  'December in Kanyakumari is the operational peak alongside January. Northeast monsoon wraps in the first 12-15 days delivering 150-180mm across 7-9 wet days; from mid-month rainfall falls under 30mm and the southern tip flips to clean dry weather. Daytime 26-29C, nights 22-23C, humidity 70 percent, trade winds constant from 9am through 8pm. The Vivekananda Rock Memorial and Thiruvalluvar Statue ferry at full reliability — 8am to 4pm every 30 minutes, ₹75 ticket. Sunrise viewing from the Sunrise View Point at year-cleanest visibility post-monsoon wash. The Kanyakumari Amman Temple at full ritual tempo; the triveni sangam ritual ghat at year-busy pilgrim density through Christmas-NYE corridor. Christmas-NYE rates (December 22 to January 5) run 2-3x the November baseline: Sparsa Resort ₹6-9k, Singaar Hotel ₹5-8k, beach homestays ₹1,800-3k. Padmanabhapuram Palace (35km west, ₹100 entry, closed Monday) at peak visitor load. Suchindram Temple (12km north) for the Sthanumalayan deity. **Cyclone watch active until Dec 20:** Vardah hit Chennai December 2016, Michaung hit Chennai December 2023 — check IMD 72 hours ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
