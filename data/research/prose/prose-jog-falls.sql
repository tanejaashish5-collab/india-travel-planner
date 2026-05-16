-- Jog Falls destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: jog-falls | best 7-11 (REVERSE PATTERN — peak monsoon) | avoid 2-5 | type waterfall/nature/monsoon

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 1, 3, 'wait',
  'Post-monsoon decline. 18-30C dry. Falls reduced to 30-40 percent of monsoon flow. Linganamakki dam-controlled.',
  'January falls are still photogenic but flow has dropped to 30-40 percent of October-November peak. Weather perfect, viewpoints clear, but the trip works at full impact only Jul-Nov. Photographers prefer the early post-monsoon Oct-Nov window.',
  'January is when the Linganamakki Dam upstream has locked back significant flow after the monsoon spillover. Jog Falls — the 253m four-cascade plunge (Raja, Rani, Roarer, Rocket) — runs at a fraction of August peak. The trip you came for needs July-November.',
  'Jog Falls in January is the post-monsoon decline window. Daytime 18-30C, nights 16C, rainfall under 10mm, weather perfect for outdoor walking. But the Sharavathi River — which feeds the 253m plunge across four distinct cascades (Raja, the steady single column; Rani, the lacy curtain; Roarer, the loud cascade; Rocket, the violent burst-spray) — runs at a fraction of monsoon volume. The upstream Linganamakki Dam (built 1964 across the Sharavathi by Karnataka Power Corporation, the reservoir feeding KPCL hydroelectric stations downstream) controls release; by January, with monsoon spillover ended and irrigation/power priorities taking precedence, daily release drops to 30-40 percent of August peak flow. The waterfall is photogenic — clean visibility, no spray-fog blocking the view — but Roarer and Rocket cascades thin to streams, the cinematic four-column form of monsoon doesn''t hold. Watchtower opposite the falls on the Honnemaradu side at full daily operations (₹15 entry, 6am-6pm). Tunnel viewpoint walkway clear. The 1,400-step descent to the base (open Sep-May only — closed in monsoon peak as the steps become lethal) at full visitor traffic, 2.5-3 hour round trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 2, 2, 'wait',
  'Driest month. 19-31C. Falls at 15-20 percent of monsoon flow. Linganamakki release minimal.',
  'February weather is perfect but the falls have thinned to 15-20 percent of monsoon peak. Linganamakki Dam release minimal. The 1400-step base descent is at year-cleanest but the cascade itself is unimpressive. Wait for July-November.',
  'February at Jog Falls is when the cascade thins to its driest. Linganamakki Dam upstream is at year-low release; the Sharavathi River trickles. The 4-cascade form (Raja, Rani, Roarer, Rocket) collapses to two thin streams. The trip cannot deliver what the name promises in this month.',
  'February at Jog Falls is the technical low point of the river-flow year before the late-pre-monsoon trickle. Daytime 19-31C, nights 17C, rainfall under 5mm, weather flawless. But the trip works only when the Sharavathi River runs full, and February is when the Linganamakki Dam upstream (the 1964 KPCL reservoir) has locked back release to year-minimum for power and irrigation. The 253m four-cascade plunge form — Raja (steady column), Rani (lacy curtain), Roarer (loud cascade), Rocket (violent burst-spray) — collapses to two thin streams. Roarer disappears entirely some weeks. The 1,400-step descent to the falls base (open Sep-May, 2.5-3 hours round trip) reaches the pool at the foot of the gorge, but the pool itself shrinks to half its monsoon footprint. The walkway viewpoints (Tunnel viewpoint, British Bungalow viewpoint, Watchtower opposite on the Honnemaradu side at ₹15 entry, 6am-6pm) hold normal hours. Hotel rates ease 20 percent versus January: Sharavathi Adventure Camp ₹2-3.5k, Jungle Lodges Resort ₹4-6k, Hotel Mayura Gerusoppa KSTDC ₹1.5-2.5k. The Bangalore-Jog 400km drive (NH-206 via Shimoga) at year-cleanest road conditions. Wait for July onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 3, 1, 'skip',
  'Dry season nadir. 21-33C. Falls at 10-15 percent of monsoon flow. Skip.',
  NULL,
  'March is when Jog Falls reaches its driest. Linganamakki release at year-minimum (KPCL Class 4 hydro priority). Cascade collapses to a thin trickle. The 253m plunge is structurally there but the water is not. Skip.',
  'March at Jog Falls is the dry-season nadir. Daytime 22-33C, nights 19C, rainfall under 15mm. The Linganamakki Dam upstream (KPCL 1964 reservoir feeding the Sharavathi hydroelectric station Class 4 downstream — the dam was built specifically to harness the Sharavathi for power, with the waterfall as the casualty) is at year-minimum release. The Sharavathi River''s 253m plunge across the cliff-face — historically the four-cascade form (Raja steady column, Rani lacy curtain, Roarer loud cascade, Rocket violent burst-spray) — collapses to a thin trickle. Only Raja holds some shape. The 1,400-step descent (Sep-May, 2.5-3 hours round trip) reaches the gorge pool but the pool itself thins. Visitor numbers at year-low. The Watchtower viewpoint (Honnemaradu side, ₹15 entry, 6am-6pm) holds normal hours but the photograph is unflattering. KPCL Class 4 hydro priority means tourists cannot expect a March water-release request to be honoured. Pre-1964, before the dam, March Jog Falls would have been at half-monsoon flow; in 2026 the structural waterfall is empty in March.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 4, 1, 'skip',
  'Pre-monsoon dry. 23-35C. Falls at minimum flow. Heat brutal. Skip.',
  NULL,
  'April is the worst Jog Falls month. Falls at minimum flow, Western Ghats foothills heat brutal at 33-35C, no monsoon respite. The 253m plunge is a trickle.',
  'April at Jog Falls is the worst combination of dry-season nadir and pre-monsoon heat. Daytime 24-35C, nights 22C, humidity 70 percent, rainfall under 30mm. The Linganamakki Dam (KPCL 1964 hydroelectric reservoir on the Sharavathi River, the structural cause of Jog Falls'' modern unreliable flow — KPCL Class 4 hydro priority means tourist water-release requests are rare and require advance KPCL Bangalore approval) at year-minimum release ahead of the southwest monsoon spillover that begins in late June. The 253m four-cascade plunge — historically Raja (steady column), Rani (lacy curtain), Roarer (loud cascade), Rocket (violent burst-spray) — runs at the year''s most disappointing visual; Roarer and Rocket vanish entirely, Rani thins to a smear, only Raja holds some shape. The 1,400-step descent (open Sep-May) reaches a thin pool. The Watchtower (Honnemaradu side, ₹15 entry, 6am-6pm) returns photographs that read as cliff-face-with-trickle.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 5, 1, 'skip',
  'Late pre-monsoon. 24-35C. Falls still minimal until June arrival. Skip.',
  NULL,
  'May extends the dry-trickle pattern. Pre-monsoon thunderstorms third week onward give minor lift but full 4-cascade flow only arrives with the SW monsoon. Skip.',
  'May at Jog Falls is the last month of dry-trickle before the southwest monsoon begins delivering the river back to full form. Daytime 25-35C, nights 23C, humidity 75 percent, rainfall 50-100mm — pre-monsoon thunderstorms hit the third and fourth weeks, the first significant rain since November. The third-week storms add minor lift to the Sharavathi River, but the Linganamakki Dam upstream catches most of it (the reservoir is at year-minimum levels before monsoon refill — KPCL Class 4 hydro priority). The 253m four-cascade plunge — Raja, Rani, Roarer, Rocket — still runs at a fraction of monsoon flow. The 1,400-step base descent (open Sep-May until pre-monsoon trail-safety reassessment around May 25-30) sees its final two weeks of clean traffic before Forest Department closure for the wet season. The Watchtower viewpoint (Honnemaradu side, ₹15 entry, 6am-6pm) holds normal hours. Hotel rates year-low: Sharavathi Adventure Camp ₹1.7-3k, Jungle Lodges Resort ₹3.3-5k, KSTDC Hotel Mayura Gerusoppa ₹1.3-2.2k. KPCL water-release requests for the May window are rare. The proper waterfall trip arrives only with the southwest monsoon — July onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 6, 3, 'wait',
  'SW monsoon onset. 22-28C. Falls building back to form. Late month brings first 4-cascade view.',
  'June is when Jog Falls starts coming back to life. Late month brings the first 4-cascade view of the year as the Linganamakki spillover begins. Roads at landslide-watch. Wait 2-3 weeks for the full monsoon flow.',
  'June is in transition — Falls coming back but cloud cover blocks views many days, roads landslide-watch, the full 4-cascade monsoon form arrives only mid-July. Wait 2-3 weeks unless you have flexible dates.',
  'June at Jog Falls is the transition month — the southwest monsoon arrives over the Karnataka coast around June 1 and travels inland to the Sharavathi catchment. Daytime 23-28C, nights 21C, humidity 92 percent, rainfall 600-800mm across the month. The Sharavathi River starts coming back to form as the Linganamakki Dam upstream catches the monsoon spillover. The first half of June sees light flow as the reservoir refills; the second half typically delivers the year''s first proper 4-cascade view as KPCL spillover gates open and the 253m plunge resumes its monsoon form. Raja, Rani, Roarer, Rocket all start running by mid-June. But cloud cover blocks views many days — June visitor experience can read as "I came, I got fogged out." The 1,400-step base descent closes June 1 by Karnataka Forest Department for the wet season (next reopen September-October). The Watchtower viewpoint (Honnemaradu side, ₹15 entry, 6am-6pm) holds normal hours but visibility unreliable. Bangalore-Jog 400km drive (NH-206 via Shimoga) at landslide-watch. Hotel rates climb modestly: Sharavathi Adventure Camp ₹2-3.5k, Jungle Lodges Resort ₹4-5.5k, KSTDC Hotel Mayura Gerusoppa ₹1.5-2.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 7, 5, 'go',
  'Peak monsoon. 22-26C, 1000-1200mm rainfall. Falls at year-best 4-cascade form. Roads improved from June.',
  'July is when Jog Falls runs at peak. The 253m four-cascade plunge — Raja, Rani, Roarer, Rocket — at year-best monsoon form. KPCL spillover gates open, Sharavathi at full flow. Bangalore-Jog road landslide-watch but stabilising. Lock weekend beds 3-4 weeks ahead.',
  NULL,
  'Jog Falls in July is the version every monsoon photographer plans the year around. Daytime 23-26C, nights 21C, humidity 95 percent, rainfall 1000-1200mm across the month — the southwest monsoon at full Western Ghats force. The Linganamakki Dam upstream (KPCL 1964 reservoir on the Sharavathi River) at high spillover levels; KPCL opens the spillway gates as the reservoir reaches capacity, releasing the Sharavathi back to its pre-dam volume across the 253m cliff. The four-cascade form runs at year-best — Raja (the steady single column on the right), Rani (the lacy/curtain cascade beside it), Roarer (the loud violent cascade further left, named for the audible thunder kilometres away), Rocket (the leftmost, where water shoots in violent burst-spray patterns). All four cascades visible simultaneously; the cliff face at peak visual drama. Spray-cloud reaches the Watchtower opposite (Honnemaradu side, ₹15 entry, 6am-6pm) and tourists routinely arrive in raincoats and get soaked anyway. The 1,400-step base descent closed by Karnataka Forest Department for the wet season — base-view inaccessible until September-October reopening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 8, 5, 'go',
  'Peak monsoon continues. 22-26C, 900-1100mm rainfall. Falls at peak. Roads stable from mid-month.',
  'August holds the July peak with marginally easier road conditions. Jog Falls 4-cascade form at peak. Independence Day weekend and Krishna Janmashtami bring 3-day domestic surge. Lock weekend beds 4 weeks ahead.',
  NULL,
  'Jog Falls in August holds the July monsoon peak with marginally easier road conditions. Rainfall 900-1100mm across 26-28 wet days. Daytime 23-26C, nights 21C, humidity 94 percent. The Linganamakki Dam upstream (KPCL 1964 hydroelectric reservoir) at peak spillover levels; the Sharavathi River runs at its full pre-dam volume across the 253m cliff face. The four-cascade form — Raja (steady column), Rani (lacy curtain), Roarer (loud cascade), Rocket (violent burst-spray) — at year-best simultaneous visibility. Spray-cloud reaches viewpoints; raincoats required. The Watchtower opposite (Honnemaradu side, ₹15 entry, 6am-6pm) at peak visitor traffic — domestic weekend traffic from Bangalore, Mangalore, Mysore makes Saturday-Sunday parking lots full from 9am. Independence Day weekend (August 15-17 cluster) and Krishna Janmashtami (variable date late August, 2026 verify against lunar calendar) bring 3-day domestic surge. The 1,400-step base descent remains closed for the wet season. Bangalore-Jog 400km drive (NH-206 via Shimoga) landslide-watch eases in the second half — multiple cleared-and-reopened cycles through the month.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 9, 5, 'go',
  'Monsoon retreat begins. 22-27C, 500-700mm rainfall. Falls still at peak form but visibility improving.',
  'September is when Jog Falls delivers the year-best combination — peak monsoon flow plus retreating cloud cover. SW monsoon retreats around Sep 25, the 4-cascade form holds full but visibility improves dramatically. The smart-traveller window.',
  NULL,
  'Jog Falls in September is the year''s sweetest spot — peak monsoon flow with retreating cloud cover. Daytime 23-27C, nights 21C, humidity easing from 92 to 85 percent in the second half, rainfall 500-700mm across 18-20 wet days mostly the first fortnight. The Linganamakki Dam upstream remains at high spillover levels through September as the reservoir holds capacity — the Sharavathi River continues running at peak volume across the 253m cliff face. The four-cascade form — Raja, Rani, Roarer, Rocket — at full simultaneous visibility, but now with materially better photograph light as the afternoon cloud-thickening of July-August eases through the month. The southwest monsoon retreats from the Karnataka Western Ghats around September 25-30 (IMD declares formal withdrawal). The Watchtower viewpoint (Honnemaradu side, ₹15 entry, 6am-6pm) at recovering weekday traffic. The 1,400-step base descent typically reopens late September or early October once Forest Department completes its trail-safety assessment — the first descent opportunity of the wet-side year. Bangalore-Jog 400km drive (NH-206 via Shimoga) stabilises from mid-month — landslide closures drop to rare.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 10, 5, 'go',
  'Post-monsoon peak. 21-29C, 250-350mm rainfall. Falls still at full form. Base descent reopens.',
  'October is the year-cleanest Jog Falls window. Post-monsoon flow holds, visibility now sharp, the 1400-step base descent reopens. Karnataka Rajyotsava prep Nov 1. Hotel rates ease 15 percent versus August.',
  NULL,
  'Jog Falls in October is the post-monsoon peak window — full waterfall flow plus full visibility. Daytime 22-29C, nights 19C, rainfall 250-350mm with the bulk falling in the first ten days. The Linganamakki Dam upstream remains at high levels through October — KPCL spillover continues into the second half typically, keeping the Sharavathi running at near-monsoon volume across the 253m cliff face. The four-cascade form — Raja (steady column), Rani (lacy curtain), Roarer (loud cascade), Rocket (violent burst-spray) — at full simultaneous visibility with the cleanest light of the year. The 1,400-step base descent typically reopens October 1-15 once Karnataka Forest Department completes its post-monsoon trail-safety assessment (verify same-day at the Jog Range office). The descent — 2.5-3 hour round trip — reaches the pool at the base of the gorge with the four cascades roaring overhead. The Watchtower opposite (Honnemaradu side, ₹15 entry, 6am-6pm) at full operations with crisp afternoon light. The Tunnel viewpoint walkway clear. Karnataka Rajyotsava preparation begins for November 1. Bangalore-Jog 400km drive (NH-206 via Shimoga) returns to clean schedules.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 11, 4, 'go',
  'Late post-monsoon. 19-30C, rainfall under 80mm. Falls at 60-70 percent of August peak. Visibility year-best.',
  'November holds full waterfall flow at slightly reduced volume (60-70 percent of August peak as KPCL gates start closing). Karnataka Rajyotsava Nov 1. Best photograph light of the year. Lock weekend beds 3 weeks ahead.',
  NULL,
  'Jog Falls in November is the late post-monsoon window with year-best photograph light. Daytime 20-30C, nights 17C, humidity dropping below 70 percent in the back half, rainfall under 80mm. The Linganamakki Dam upstream begins closing spillover gates as the monsoon refill cycle ends and KPCL''s Class 4 hydro priority resumes — the Sharavathi River flow across the 253m cliff face drops to 60-70 percent of August peak by the end of the month. But the four-cascade form — Raja (steady column), Rani (lacy curtain), Roarer (loud cascade), Rocket (violent burst-spray) — all four still hold visible form through November. The afternoon light is the year-cleanest; spray-cloud is minimal versus the July-August peak, making the photograph the year-iconic Jog shot. The 1,400-step base descent (2.5-3 hour round trip — open Sep-May) at full visitor traffic. Karnataka Rajyotsava (November 1, 1956 state formation under States Reorganisation Act) sees cultural programmes. The Watchtower viewpoint (Honnemaradu side, ₹15 entry, 6am-6pm) at high weekend traffic but easier than August surge. Bangalore-Jog 400km drive (NH-206 via Shimoga) at year-cleanest road conditions.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('jog-falls', 12, 3, 'wait',
  'Post-monsoon decline. 17-29C dry. Falls at 40-50 percent of August peak. Christmas-NYE rates 1.5x.',
  'December sees the falls drop to 40-50 percent of August peak as Linganamakki gates close. Weather perfect but the cinematic 4-cascade form starts thinning. Acceptable for first-time visits, photographers prefer Oct-Nov window.',
  'December is when Jog Falls flow drops noticeably — Linganamakki Dam closes spillover gates, KPCL hydroelectric priorities resume. The 4-cascade form starts thinning; Roarer and Rocket lose impact. Push to October-November for the cleaner full-flow window.',
  'Jog Falls in December is the post-monsoon decline window with peak Christmas-NYE traffic. Daytime 18-29C, nights 16C, rainfall under 30mm. The Linganamakki Dam upstream (KPCL 1964 hydroelectric reservoir on the Sharavathi River) closes spillover gates progressively through December as the monsoon refill ends and KPCL Class 4 hydro priorities resume. By month-end, the Sharavathi River flow across the 253m cliff face drops to 40-50 percent of August peak. The four-cascade form — Raja (steady column), Rani (lacy curtain), Roarer (loud cascade), Rocket (violent burst-spray) — starts thinning; Raja and Rani hold shape, Roarer and Rocket lose impact, the cinematic side-by-side form begins to break by month-end. Weather perfect for outdoor walking — humidity 65 percent, no afternoon cloud. The 1,400-step base descent (2.5-3 hour round trip) at full visitor traffic. The Watchtower viewpoint (Honnemaradu side, ₹15 entry, 6am-6pm) at peak Christmas-NYE traffic. Christmas-NYE rates 1.5x normal (lower spike than beach destinations): Sharavathi Adventure Camp ₹3.5-5.5k, Jungle Lodges Resort ₹6.5-8.5k, KSTDC Hotel Mayura Gerusoppa ₹2.3-3.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
