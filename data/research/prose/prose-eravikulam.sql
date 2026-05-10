-- Eravikulam National Park destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: eravikulam

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 1, 5, 'go',
  'Peak window. 8-22C at Rajamala. Tahr on grasslands, Anamudi permits open. Online slots fill 5-7 days out at NY tail.',
  'January is when Eravikulam runs at its post-monsoon peak. Rajamala gate at 7am-4pm, online booking on eravikulam.kerala.gov.in is mandatory (₹125 adult), bus shuttle from gate to viewing point ₹30. Nilgiri Tahr on the shola grasslands at year-best visibility. Anamudi (2695m) permit climbs reissued.',
  NULL,
  'Eravikulam in January is the version every Western Ghats wildlife regular wants to see. The 97 sq km national park sits between 1900 and 2695m elevation — Anamudi at the apex, South India''s highest peak. Daytime at the Rajamala viewing zone runs 14-22C, mornings drop to 8-10C, the shola-grassland mosaic at year-clearest visibility. The Nilgiri Tahr — endangered mountain goats so habituated to the bus-shuttle pattern that they walk up to the marked viewing platform — number around 750 individuals here, the world''s largest viable population. Online booking on eravikulam.kerala.gov.in is mandatory now (₹125 adult, ₹95 child); same-day window slots release at 7am India time but get held by tour operators within 30 minutes — book 48-72 hours ahead through Christmas-NY week, slots stretch to 5-7 days during Dec 22-Jan 5. The Kerala Forest Department-run bus shuttle from gate to Rajamala viewing zone runs at ₹30, departures every 15 minutes; the 1.5km walking trail beyond the bus stop is the photographer-prime stretch. Anamudi (2695m) permit climbs reissue from October — the escorted-only ascent is 6-8 hours via Eravikulam range office at Rajamala. Nearest stays in Munnar town (15km, ₹3-25k full bracket). Wear layers; mornings genuinely cold.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 2, 1, 'skip',
  'CLOSED for Nilgiri Tahr calving. Kerala Forest Dept mandatory closure runs Feb 1 to end-March. Reopens April 1.',
  NULL,
  'February is the start of the Kerala Forest Department''s mandatory annual closure of Eravikulam NP for Nilgiri Tahr calving — non-negotiable rule, no entry to Rajamala viewing zone, no Anamudi permits. Closure runs February 1 through end-March, NP reopens April 1. Plan around it.',
  'Eravikulam in February is closed. The Kerala Forest Department''s mandatory Nilgiri Tahr calving closure runs February 1 through end-March every year — non-negotiable rule, no entry permits issued to Rajamala viewing zone, Anamudi permits suspended, online booking system at eravikulam.kerala.gov.in marks the period unavailable. The calving period protects Tahr ewes (around 200 typically calving each season across the 750-strong Rajamala-Anamudi population) from human disturbance during the most vulnerable weeks of the year. The closure is published annually on the Kerala Forest Department website and the eravikulam.kerala.gov.in booking portal — verify exact dates per year as the period sometimes extends to mid-April depending on calving progress reports. If the trip is built around tahr viewing, Anamudi climb, or shola-grassland walks, push to October-January (peak) or April-May (post-reopen, calves visible alongside herd). Nearest options that month: tea estate walks in the Kanan Devan Hills around Munnar (KDHP estates, Tea Museum at Nallathanni ₹100), Lockhart Gap viewline, Top Station (32km, 1880m, Tamil Nadu border view), Mattupetty Dam, Kundala Lake — all run normal hours. The wildlife-led trip cannot happen in February.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 3, 1, 'skip',
  'CLOSED through end-March for tahr calving. Reopens April 1. Same Kerala Forest Dept rule as February.',
  NULL,
  'March remains closed under the Kerala Forest Department''s mandatory tahr calving rule. Reopens April 1 — verify exact date on eravikulam.kerala.gov.in as occasionally the period extends. Plan the trip around April onwards or push to October-January.',
  'Eravikulam in March remains closed under the Kerala Forest Department''s mandatory Nilgiri Tahr calving rule. The closure runs February 1 through end-March every year — entry to Rajamala viewing zone is suspended, Anamudi permits are not issued, and the online booking system at eravikulam.kerala.gov.in marks the period unavailable. The calving period protects Tahr ewes during the most vulnerable weeks of the herd''s annual cycle; calves born February-March are typically just visible alongside adult animals from the April 1 reopening. Verify exact reopen date annually on the Forest Department portal — the period occasionally extends a week or two depending on calving progress reports issued by the Eravikulam range office. If the trip is wildlife-led — tahr viewing, Anamudi summit (2695m, escorted-only), shola-grassland walks — push to either October-January (peak post-monsoon visibility) or April-May (post-reopen, mild weather, calves alongside herd, lower visitor load than the December tail). The Munnar tea estate side runs normally through March: KDHP-owned Kanan Devan Hills sweep at year-clearest, Tea Museum at the Nallathanni estate (₹100, 9am-4pm, closed Mon), Top Station (32km, 1880m), Mattupetty Dam, Kundala Lake — all open. The Eravikulam-led wildlife trip cannot happen.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 4, 5, 'go',
  'NP REOPENS APRIL 1. 12-26C. Tahr calves visible alongside herd. Anamudi permits reissue. Pre-monsoon flow.',
  'April 1 is the official reopening after the Feb-Mar tahr calving closure. Calves are now visible alongside the adult herd at year-best — late-winter coats still in, kids 6-8 weeks old. Anamudi (2695m) permits reissue. Online booking at eravikulam.kerala.gov.in returns to active.',
  NULL,
  'Eravikulam in April is the under-rated wildlife window. The Kerala Forest Department reopens the park on April 1 (verify exact reopening date annually on eravikulam.kerala.gov.in — the calving closure occasionally extends a week or two) — and the Nilgiri Tahr on the Rajamala shola grasslands are at year-best photographic state, calves now 6-8 weeks old visible alongside the adult herd, the famous tameness of the Eravikulam population on full display. The 7am-4pm gate runs full tempo, online booking ₹125 adult / ₹95 child, the Kerala Forest Department-run bus shuttle from gate to Rajamala viewing zone runs at ₹30, departures every 15 minutes. Daytime 18-26C at the 2000m elevation, nights 12-14C, humidity climbing past 75 percent in the last fortnight, rainfall under 50mm with the first pre-monsoon thunderstorms typically arriving April 22-28. Anamudi peak (2695m, South India''s highest, escorted-only) permit climbs reissue from the Rajamala range office — 6-8 hour ascent, advance booking 7-15 days. Visitor load through April runs at roughly 40 percent of the December peak — the slot competition that defines Christmas-week is gone. Vishu (April 14, Malayalam new year) brings a 3-4 day domestic bump but slots remain bookable 24-48 hours ahead. Stay in Munnar town (15km, full hotel bracket ₹2,000-12,000).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 5, 3, 'wait',
  'Pre-monsoon. 14-26C. First fortnight workable, last 10 days bring SW-monsoon advance squalls. Tahr on grasslands.',
  'Early May extends April — Eravikulam open at 7am-4pm, tahr calves now 10-12 weeks old, Anamudi permits running. Last 10 days bring SW-monsoon advance squalls; trail visibility collapses on rainy afternoons.',
  'May splits cleanly in two — first fortnight workable (Eravikulam open, tahr at peak grassland visibility, Anamudi permits running), last 10 days bring SW-monsoon advance squalls and afternoon trail-closure events. Visibility from the Rajamala viewing platform fogs out on rainy days.',
  'Eravikulam in May splits cleanly in two. The first fortnight extends April: daytime 18-26C at the 2000m elevation, nights 14-16C, humidity 75 percent, the Rajamala 7am-4pm gate at full tempo (online booking eravikulam.kerala.gov.in, ₹125 adult). Nilgiri Tahr calves now 10-12 weeks old, herd composition at year-best photographic interest. By the third week, southwest monsoon advance squalls start hitting Kerala — the Munnar high range receives the first of the year''s 4,000-6,000mm annual rainfall, typically as 1-2 hour afternoon downpours. The shola grasslands fog out from 1pm onwards on rainy afternoons; visibility from the Rajamala viewing platform can collapse to under 200m. Kerala Forest Department suspends visits on the worst days — check eravikulam.kerala.gov.in same-day. Anamudi (2695m) permit climbs are workable through the first half but the 6-8 hour escorted ascent gets gambled by week three. Visitor load is at year-low alongside hotel rates in Munnar town (15km, the full ₹1,500-9,000 bracket). Lock the first 10 days; gamble the last fortnight.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 6, 1, 'skip',
  'SW monsoon onset. 12-20C, 800-1000mm rainfall. NP suspends visits on most days. Trails dangerous. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Munnar high range — Eravikulam suspends visits on most days under Forest Department safety rules. Shola-grassland trails fog permanently, the 1.5km Rajamala walk gets gated, NH85 to Munnar landslide-prone. Wait for October.',
  'Eravikulam in June is when the southwest monsoon hits the Munnar high range with peak Western Ghats force. The 2000m elevation receives 800-1000mm of rainfall through the month — the area''s extraordinary 4,000-6,000mm annual total ranks among the highest in South India. Daytime 14-20C feels cold under constant downpour, nights 12-14C with 95 percent humidity. Kerala Forest Department suspends Rajamala visits on most days under safety rules — landslide risk on the access road, dangerous shola-grassland trail conditions, and zero visibility from the viewing platform. Online booking at eravikulam.kerala.gov.in marks most June dates unavailable. Anamudi (2695m) escorted climbs are completely suspended for the season. NH85 Kochi-Munnar (130km via Adimali) becomes landslide-watch country: Kerala PWD typically closes the Adimali-Munnar stretch 1-2 days per week through the month for clearance. Munnar-side hotels run year-low rates (luxury ₹4-7k, mid-bracket ₹2,500-4k, homestays ₹1,200-1,800). Tahr remain on the grasslands but unviewable. The trip you came for cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 7, 1, 'skip',
  'Peak monsoon. 12-20C, 1200-1500mm rainfall. NP suspends on most days. Anamudi closed. Skip.',
  NULL,
  'July is the wettest month at the Munnar high range — 1200-1500mm rainfall, Eravikulam suspends visits on most days, Anamudi season closed, viewing platform fogged. The trip cannot happen. Wait for October.',
  'Eravikulam in July is the year''s wettest stretch at the Munnar high range. Rainfall hits 1200-1500mm at the 2000m elevation across 25-27 wet days. Daytime 14-20C with 95 percent humidity and constant downpour make visit attempts pointless. Kerala Forest Department suspends Rajamala viewing zone visits on most days under safety rules — the 1.5km grassland trail is dangerous, the bus-shuttle from gate-to-platform stops, and visibility from the Rajamala platform collapses to under 50m on most afternoons. Online booking at eravikulam.kerala.gov.in marks most July dates unavailable. Anamudi (2695m, South India''s highest) escorted climbs remain suspended for the monsoon season. NH85 Kochi-Munnar (130km via Adimali) closure events run 2-3 days per week as Kerala PWD clears landslides — even reaching the Rajamala gate becomes uncertain. Nilgiri Tahr remain on the high grasslands but unviewable through monsoon mist. The Kanan Devan Hills tea estates around Munnar are at peak monsoon green but estate walks are equally suspended on rainy days. The trip cannot happen until October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 8, 1, 'skip',
  'Monsoon continues. 12-20C, 1000-1200mm rainfall. NP suspends often. Onam closes adjacent operations. Skip.',
  NULL,
  'August holds the July pattern — 1000-1200mm rainfall at the 2000m elevation, Eravikulam suspends frequently, Anamudi closed. Onam (variable Aug-Sep) shuts most adjacent Munnar operations 3-4 days. Wait for October.',
  'Eravikulam in August holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 1000-1200mm at the 2000m elevation across 22-25 wet days. Daytime 14-20C under constant downpour, nights 12-14C, 90 percent humidity. Kerala Forest Department continues to suspend Rajamala viewing zone visits on most days under safety rules — landslide risk on the access road from Munnar (15km), dangerous shola-grassland trail conditions, near-zero visibility from the viewing platform. Online booking at eravikulam.kerala.gov.in marks most August dates unavailable. Anamudi (2695m) escorted-climb season remains closed. Onam — Kerala''s 10-day cultural festival running Atham to Thiruvonam (variable date late August into September) — closes most Munnar town shops, restaurants, and resort activities for 3-4 days around Thiruvonam, eliminating even the back-up tea-estate-walk option. NH85 Kochi-Munnar (130km via Adimali) closure events continue 1-2 days per week. Nilgiri Tahr remain on the grasslands but unviewable. The trip cannot happen until October — wait the eight weeks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 9, 3, 'wait',
  'Monsoon withdrawing. 12-22C, 400-600mm rainfall easing. NP suspensions ease late month. Onam tail.',
  'September is the recovery month. SW monsoon withdraws from the Western Ghats by week three, Eravikulam suspensions drop sharply, Anamudi permits reissue late month. October is dramatically cleaner with two extra weeks of patience.',
  'September is on the way back but Kerala Forest Department suspensions remain frequent in the first fortnight, Anamudi remains closed until late month, viewing platform visibility patchy on residual-rain days. Push to October — same monsoon-green grasslands at materially cleaner trail conditions.',
  'Eravikulam in September is the soft re-opening. Rainfall drops to 400-600mm across 16-18 wet days, mostly the first fortnight. Daytime 18-22C at the 2000m elevation, nights 12-14C, humidity easing toward 80 percent. The southwest monsoon retreats from the Western Ghats by September 20-25; Kerala Forest Department resumes regular Rajamala viewing zone operations from week three (online booking eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate, bus shuttle ₹30). Trail conditions on the shola grasslands remain muddy through the month — leech encounters possible alongside the bus-shuttle path. Anamudi (2695m) escorted climb permits begin reissuing from late September after the Rajamala range office certifies trail safety. The Kanan Devan Hills tea estates at peak monsoon green flush. Nilgiri Tahr on the grasslands at year-greenest backdrop. NH85 Kochi-Munnar (130km via Adimali) stabilises with closure events dropping to under 1 per week from mid-month. Onam tail keeps Munnar town shops at light hours through the first week. Stays in Munnar town (15km) at year-low rates: luxury ₹5-8k, mid-bracket ₹3-5k, homestays ₹1,500-2,500. October is the cleaner call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 10, 4, 'go',
  'Season opens fully. 12-23C, 200-300mm rainfall. NP at full tempo, Anamudi reissues, NE monsoon overspill mostly evenings.',
  'October is the proper season opener. Eravikulam back at full tempo from October 1 — Rajamala 7am-4pm gate, online booking eravikulam.kerala.gov.in active, Anamudi permits reissued. Tahr on monsoon-green grasslands. NE monsoon overspill 200-300mm rain mostly evenings.',
  NULL,
  'Eravikulam in October is when the park returns to full tempo. The Kerala Forest Department''s seasonal closure for safety lifts by October 1; Rajamala viewing zone operations restart at full schedule (online booking eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate, bus shuttle ₹30). The Nilgiri Tahr on the shola grasslands sit against the year-greenest post-monsoon backdrop — visitor load runs at roughly 50 percent of the December peak, slot competition on the booking portal opens up substantially. Daytime 18-23C at the 2000m elevation, nights 12-14C, rainfall 200-300mm — most in the first 10 days, easing through the month — humidity dropping toward 75 percent. Anamudi (2695m, South India''s highest) escorted climb permits reissue from the Rajamala range office for the post-monsoon season; advance booking 7-15 days, 6-8 hour ascent, escorted-only. Northeast monsoon overspill brings 1-2 hour evening downpours mostly weeks two and three. NH85 Kochi-Munnar (130km via Adimali) stabilises fully by October 15. Stays in Munnar town (15km): luxury at ₹6-9k (versus ₹14-22k December peak), mid-bracket ₹4-6k, homestays ₹1,800-2,800. Pack a poncho rather than an umbrella, fleece for evenings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 11, 5, 'go',
  'High season builds. 10-22C, dry. Tahr at peak grassland visibility. Online booking lead extends to 48-72 hours.',
  'November is when Eravikulam returns to its high-season pattern. Rainfall under 80mm and almost all in the first 10 days, tahr-on-grasslands at year-best visibility, Anamudi climb in clear weather. Online booking lead extends from same-day to 48-72 hours through the month.',
  NULL,
  'Eravikulam in November is the year''s second-cleanest window. Daytime 16-22C at the 2000m elevation, nights drop to 10-12C, rainfall under 80mm across 5-7 wet days, almost all in the first ten days. The shola grasslands are at year-clearest visibility post the northeast monsoon residuals. Kerala Forest Department runs Rajamala at full tempo (online booking eravikulam.kerala.gov.in, ₹125 adult, 7am-4pm gate, bus shuttle ₹30) — the Nilgiri Tahr at peak grassland visibility, the famous tameness on full display, photographers lined along the 1.5km walking trail beyond the bus stop from 7am. Anamudi (2695m) escorted climb permits at peak issuance from the Rajamala range office — 6-8 hour ascent, advance booking 7-15 days. Visitor load picks up sharply from November 15 onward as Christmas-week families begin booking. Online booking lead extends from same-day in week one to 48-72 hours by month-end. Stays in Munnar town (15km) climb 20-25 percent across the month: luxury at ₹8-13k (was ₹6-9k October), mid-bracket ₹4-7k, homestays ₹2,000-3,200. Strong call for first-time visitors who want the season without Christmas-NY rate-tripling.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('eravikulam', 12, 5, 'go',
  'Peak season. 8-22C, dry. Christmas-NY tightens slots to 5-7 day lead. Munnar town gridlocks, NH85 packed.',
  'December is the year''s most reliable Eravikulam window. Tahr at year-best, Anamudi climbs running, weather dry. Christmas-NY week (Dec 22-Jan 5) extends online booking lead to 5-7 days; Rajamala bus shuttle queues run 60-90 minutes. Last NP-open month before Feb-Mar tahr calving closure.',
  NULL,
  'Eravikulam in December is operational peak — the last clean window before the mandatory Feb-Mar tahr calving closure shuts the park for two months. Daytime 18-22C at the 2000m elevation, nights drop to 8-10C in the last fortnight, rainfall under 30mm. Christmas-NY week (December 22 to January 5) drives online booking lead at eravikulam.kerala.gov.in from same-day in early December to 5-7 days through the holiday tail. Bus-shuttle queues at the Rajamala gate stretch to 60-90 minute waits Saturday and Sunday through the holiday week — weekday Tuesday-Thursday holds at 30-45 minutes. Online slots open at 7am India time daily; tour operators hold most by 7:30am during Christmas-NY. Nilgiri Tahr at year-best photographic visibility, the famous habituated approach to the bus-shuttle viewing platform on full display. Anamudi (2695m) escorted climb permits continue at full issuance from the Rajamala range office — advance booking 7-15 days, 6-8 hour ascent. Stays in Munnar town (15km) hit Christmas-NY peak: luxury at ₹18-25k (versus ₹6-9k October), mid-bracket ₹9-13k, homestays ₹3,500-5,000. NH85 Kochi-Munnar (130km via Adimali) at year-busiest. Lock dates and book the Eravikulam slot in the same hour; the park then closes February 1 till April 1.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
