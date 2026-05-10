-- Ponmudi destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala South Hill batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: ponmudi | best_months 10-5 (hill station tolerates Apr-May better) | avoid 6-9

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 1, 5, 'go',
  'Peak hill window. 12-22C, dry. 22 hairpin road clean. Golden Peak Resort fully operational.',
  'January is when Ponmudi runs at its strongest. Daytime 12-22C, dry, the 22-hairpin road from Trivandrum at clean morning visibility. Golden Peak Resort (KTDC, 2023 expansion) fully operational. Sunrise viewpoint 6:30-7:15am.',
  NULL,
  'Ponmudi in January is the version of Kerala''s "Gold Peak" 1,100m hill station the Agasthyamalai Biosphere Reserve delivers cleanly. Daytime 12-22C, nights 11C, dry. The 22-hairpin road from Trivandrum (60km, 2-hour drive on KSRTC route or private taxi ₹2,500-3,500) is at clean dawn visibility — start by 7am for the cleanest hairpin photography. Golden Peak Resort (KTDC, 2023 expansion brought it back online — book via ktdc.com 2-3 weeks ahead, ₹3,500-5,500) is the only meaningful hill-station accommodation; mid-tier alternatives (Ponmudi Hills Estate Resort, Hilltop Resort) sit at ₹2-3.5k. The 365+ butterfly species recorded across the Agasthyamalai Biosphere Reserve are at their dry-season peak visibility — January-February pulls the strongest photography rotation. Sunrise viewpoint at upper Ponmudi (1.5km walk from Golden Peak Resort) opens at 6am; the cleanest light runs 6:30-7:15am before the haze rises. KSRTC bus from Trivandrum 7am, then 10am, 1pm, 4pm — 4 daily, ₹80-120 fare. Trivandrum International (TRV) 70km via the hairpin road, 2.5-hour taxi.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 2, 5, 'go',
  'Driest hill month. 13-23C. Butterfly photography at peak. Golden Peak Resort books 2-3 weeks ahead.',
  'February is the cleanest weather window. Rainfall under 10mm, dry, butterfly species at peak count. Golden Peak Resort books 2-3 weeks ahead. Walk-in rates ease 15 percent versus December peak.',
  NULL,
  'February in Ponmudi is the technical peak of the south-Kerala hill year. Rainfall under 10mm, daytime 13-23C, nights 12C, humidity at 65 percent. The 365+ butterfly species recorded across the Agasthyamalai Biosphere Reserve hit peak visibility — Malabar Banded Peacock, Travancore Evening Brown, Indian Sunbeam, Common Mormon all at full February count. Photography rotation arrives in regular 3-4 day cycles from Trivandrum and Bangalore. The 22-hairpin road is at year-clean morning visibility. Golden Peak Resort (KTDC, 2023 expansion, ₹3,500-5,500) books 2-3 weeks ahead — book via ktdc.com or directly at the Trivandrum KTDC office. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹2-3.5k. Sunrise viewpoint at upper Ponmudi (1.5km walk from Golden Peak) at 6:30-7:15am. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily, ₹80-120. Trivandrum International (TRV) 70km via the 22-hairpin road, 2.5-hour taxi ₹2,500-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 3, 4, 'go',
  'Hill cool window holds. 14-25C. Daytime hairpin trips comfortable. Hotel rates ease 20 percent.',
  'March extends February''s hill cool. Daytime hairpin trips and butterfly walks hold all day. Walk-in rates ease 20 percent versus February peak. Less touristy than Munnar.',
  NULL,
  'March in Ponmudi continues the hill-cool window with rising plains heat tax. Daytime 15-25C, nights 13C, humidity climbing toward 70 percent in the last fortnight, but the 1,100m elevation keeps the trip workable through full days. The 22-hairpin road from Trivandrum holds clean morning visibility 7-9am. Butterfly photography continues across the 365+ species count — March pulls a different rotation than February (early-summer species emerging). Golden Peak Resort (KTDC, 2023 expansion, ₹3,500-5,500) holds full operation. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹1.5-3k walk-in. Sunrise viewpoint at upper Ponmudi (1.5km walk) cleanest 6-7am. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily, ₹80-120. Trivandrum International (TRV) 70km via the 22-hairpin road, 2.5-hour taxi ₹2,200-3,000. Less touristy than Munnar — mid-week visitors run 30-40 percent of Munnar''s February-March numbers. Strong value window before April pre-monsoon arrives in the plains.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 4, 4, 'go',
  'Hill-station relief from plains heat. 16-27C. Vishu Apr 14 cultural anchor. Plains traveler escape.',
  'April is the plains-traveler escape window. Daytime 16-27C versus Trivandrum''s 35C — the 1,100m elevation is the cool. Vishu (April 14, Malayalam new year) is a quiet hill observance. Walk-in rates 25 percent below February.',
  NULL,
  'April in Ponmudi is when the hill station works as plains-heat relief. Daytime 16-27C, nights 14C — the 1,100m elevation holds 8-12C cooler than Trivandrum (60km below) and 6-10C cooler than the Kerala coast. The 22-hairpin road from Trivandrum is the working transit window 6-10am and 4-7pm; mid-day transits in the plains-heat-trapped lower hairpins past noon are uncomfortable. Golden Peak Resort (KTDC, 2023 expansion, ₹3,000-4,500) walk-in. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹1.2-2.5k. Vishu (April 14, Malayalam new year) is observed across Kerala with the kanikkonna-flower Vishukani household ritual; hill resorts stage Vishu Sadhya thalis at ₹500-1000 per banana-leaf plate. Butterfly count drops slightly versus February-March but the Indian Sunbeam, Common Crow Butterfly, and Tailed Jay all hold peak April visibility. Sunrise viewpoint at upper Ponmudi (1.5km walk) at 6-6:45am. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily, ₹80-120. Trivandrum International (TRV) 70km. Strong call for plains-heat-fleeing south Kerala residents.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 5, 3, 'wait',
  'Pre-monsoon. 17-28C. Pre-monsoon thunderstorms last 10 days. Hairpin road dangerous in wet weather.',
  'May still works for hill-station relief but pre-monsoon thunderstorms in the last 10 days knock the 22-hairpin road into wet-weather danger zone. Mornings 6-10am hold cleanest. Plan for early descent to Trivandrum.',
  'May runs into pre-monsoon thunderstorms in the third and fourth weeks. The 22-hairpin road becomes dangerous in wet weather — landslide risk, slippery hairpins, visibility collapses. Travel only in dry-morning windows.',
  'May in Ponmudi is the last month before the southwest monsoon arrives in Kerala on June 1. Daytime 17-28C, nights 15C, humidity climbing toward 80 percent in the last fortnight as pre-monsoon thunderstorms — 30-90 minute evening squalls — start hitting the hill from the third week. The 22-hairpin road from Trivandrum is the trip''s critical risk: wet-weather hairpins are dangerous, landslide-prone, and visibility collapses in the cloud cover that builds late afternoon. Plan for 6-10am ascent and pre-3pm descent through the last 10 days. Golden Peak Resort (KTDC, 2023 expansion, ₹2,500-4,000) walk-in. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹1-2k. Butterfly photography drops as cloud cover builds — the bigger species (Common Mormon, Indian Sunbeam) still hold dawn visibility. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily but check Kerala Tourism (keralatourism.org) road advisory before booking. Trivandrum International (TRV) 70km. Karkidakam Ayurveda month begins mid-July — different traveler entirely.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 6, 1, 'skip',
  'SW monsoon. 17-22C, 800-1000mm rainfall. 22-hairpin road landslide-prone. Skip.',
  NULL,
  'June is when the southwest monsoon hits Kerala. The 22-hairpin road becomes dangerous — landslide-prone laterite cuts, washouts, visibility under 50m in the upper hairpins. Kerala Forest Department closes road access on heavy-rain days.',
  'June in Ponmudi is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 800-1000mm across 22-25 wet days, often as 4-8 hour sustained downpours. Daytime 17-22C, humidity 95 percent. The 22-hairpin road from Trivandrum is the trip-killer — landslide-prone laterite cuts, washouts in the lower 12 hairpins, visibility under 50m in the upper section under cloud-cover. Kerala Forest Department and PWD road authority close road access on heavy-rain days; the route can be cut for 24-72 hours at a stretch. Golden Peak Resort (KTDC) operates through monsoon at year-low rates ₹2-3.5k but reaching it is the obstacle. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹800-1.5k. Butterfly photography at year-low — most species shelter through the wet stretch. KSRTC bus services suspend on rough-road days. Trivandrum International (TRV) 70km — the trip is closed at the 22-hairpin level. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 7, 1, 'skip',
  'Peak monsoon. 17-22C, 1000-1200mm rainfall. Road frequently closed. Skip.',
  NULL,
  'July is the wettest month at Ponmudi. The 22-hairpin road frequently closed for landslides and washouts. KSRTC bus services suspended on most days. Karkidakam Ayurveda packages are a different trip entirely.',
  'July in Ponmudi is the wettest month of the south-Kerala hill year. Rainfall averages 1000-1200mm over 26-28 wet days. Daytime 17-22C with humidity at 95 percent. The 22-hairpin road from Trivandrum (60km below) is closed by Kerala PWD on landslide-and-washout days — most days qualify. Visibility under 50m in the upper hairpins under sustained cloud-cover. KSRTC bus services suspend on most days. Golden Peak Resort (KTDC, 2023 expansion) operates through monsoon at year-low ₹1.8-3k rates but the road obstacle is the trip-killer. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹700-1.3k. Butterfly photography at year-low. Karkidakam (mid-July to mid-August in the Malayalam calendar) is the traditional Ayurveda month — but Ponmudi is not an Ayurveda-anchored destination; the medicine-tourism segment goes to Kovalam (Somatheeram, Soma Group) and Varkala (Eden Garden, Bethsaida). Standard hill trip closed. Wait for late October when the monsoon retreats and the 22-hairpin road stabilises.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 8, 1, 'skip',
  'Monsoon continues. 17-22C, 700-900mm rain. Road still landslide-prone. Onam Aug-Sep not Ponmudi-anchored.',
  NULL,
  'August holds July rain pattern. 22-hairpin road still closed on most heavy-rain days. Onam (variable Aug-Sep) is not Ponmudi-anchored. Wait for late October.',
  'August in Ponmudi runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 700-900mm across 23-25 wet days. Daytime 17-22C, humidity 95 percent. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration — but Ponmudi is a hill-station-and-butterfly destination, not an Onam-anchored cultural centre. Golden Peak Resort (KTDC) and the mid-tier hill-station hotels stage Onam Sadhya thalis on Thiruvonam day at ₹500-1000 per banana-leaf plate. The 22-hairpin road from Trivandrum is still closed by Kerala PWD on landslide-and-washout days. Walk-in rates run year-low: Golden Peak Resort ₹1.8-3k, mid-tier accommodation ₹700-1.3k. Butterfly photography at low visibility. Karkidakam Ayurveda packages end mid-month. Trivandrum International (TRV) 70km — the trip is still closed at the 22-hairpin level on most days. Wait for late October when the monsoon retreats and the road stabilises.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 9, 1, 'skip',
  'Monsoon retreating. 17-23C, 300-500mm rain. Road stabilising last week. Push to October.',
  NULL,
  'September is recovery month but the 22-hairpin road remains landslide-prone through three weeks. Cloud cover persists. Push to mid-October when the road and butterfly visibility return to safe-and-clean conditions.',
  'September in Ponmudi is the trickle back. Rainfall halves versus August to 300-500mm, mostly first half. Daytime 18-23C, humidity finally easing toward 85 percent in the last fortnight. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). The 22-hairpin road from Trivandrum is still landslide-prone through the first three weeks — Kerala PWD inspects and clears the route through the last 10 days. Cloud cover persists most days; butterfly photography visibility remains low. Golden Peak Resort (KTDC, 2023 expansion) operates with reduced occupancy at ₹2-3.5k walk-in. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹900-1.8k. KSRTC bus services resume on dry-day basis from the third week — 7am, 10am, 1pm, 4pm timetable, ₹80-120 fare. The smart traveler''s call is to wait for the late-October window when the road, butterfly count, and dry-cool weather all align. September is closure-prone hill terrain.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 10, 4, 'go',
  'Season opens. 14-23C, post-monsoon, 100-200mm late rain. 22-hairpin road inspected and cleared.',
  'October is the proper season-opener. The 22-hairpin road inspected and cleared by Kerala PWD, butterfly photography returns by week three, hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Ponmudi is when the south-Kerala hill returns to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and Kerala PWD inspects and clears the 22-hairpin road from Trivandrum through October 1-15. Daytime 15-23C, humidity falling toward 80 percent, the post-monsoon air is cleanest of the season. The 365+ butterfly species recorded across the Agasthyamalai Biosphere Reserve return to good visibility from the third week — late-October pulls the year''s freshest post-monsoon photography rotation. Golden Peak Resort (KTDC, 2023 expansion, ₹3,000-4,500) returns to full operation. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹1.2-2.5k. Sunrise viewpoint at upper Ponmudi (1.5km walk from Golden Peak) at 6:30-7:15am. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily, ₹80-120. Trivandrum International (TRV) 70km via the 22-hairpin road, 2.5-hour taxi ₹2,500-3,500. Pack a poncho rather than an umbrella — late-monsoon hill squalls render umbrellas useless.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 11, 5, 'go',
  'Peak builds. 13-22C, dry. Butterfly count high. 22-hairpin road clear. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, dry, butterfly count climbing, hairpin road clear. Hotel rates 20 percent below December peak.',
  NULL,
  'November in Ponmudi is the year''s second-peak month behind January-February. Rainfall under 50mm, daytime 14-22C, nights 12C, humidity dropping under 70 percent. The 22-hairpin road from Trivandrum (60km below) at clean morning visibility 6:30-9am. The 365+ butterfly species across the Agasthyamalai Biosphere Reserve climbing toward the December-February peak count — late-November onward sees the photography rotation pick up. Golden Peak Resort (KTDC, 2023 expansion, ₹3,500-5,000) walk-in. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) at ₹1.5-3k. Sunrise viewpoint at upper Ponmudi (1.5km walk) at 6:30-7:15am — the November dawn light against the Western Ghats valley below is the year''s cleanest. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily, ₹80-120. Trivandrum International (TRV) 70km via the 22-hairpin road, 2.5-hour taxi ₹2,500-3,500. Less touristy than Munnar — November weekday occupancy stays under 60 percent versus Munnar''s 90 percent. Strong call for first-time south-Kerala hill visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('ponmudi', 12, 5, 'go',
  'Peak season. 12-22C, dry. Christmas-NYE Dec 22-Jan 5 rates climb 50 percent. Golden Peak Resort books out.',
  'December is when Ponmudi runs at full capacity. Christmas-NYE corridor (Dec 22 to Jan 5) sees rates 1.5x normal and Golden Peak Resort books out 4-6 weeks ahead. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Ponmudi is the operational peak — moderated by the relatively-small accommodation footprint versus Munnar or Wayanad. Daytime 12-22C, nights 11C, rainfall under 30mm. The 365+ butterfly species at peak count. The 22-hairpin road from Trivandrum at clean morning visibility 6:30-9am. The Christmas-NYE corridor (December 22 to January 5) sees Golden Peak Resort (KTDC, 2023 expansion) book out 4-6 weeks ahead — rates climb 50 percent to ₹5,500-8,000. Mid-tier accommodation (Ponmudi Hills Estate Resort, Hilltop Resort) climbs from November''s ₹1.5-3k to Christmas-NYE ₹2.5-4.5k. The first three weeks of December (December 1-21) are the better-value window — peak butterfly count, peak weather, rates 30-40 percent below Christmas-NYE numbers: Golden Peak ₹4,000-5,500, mid-tier ₹1.8-3.5k. KSRTC bus from Trivandrum 7am, 10am, 1pm, 4pm — 4 daily, ₹80-120. Trivandrum International (TRV) 70km via the 22-hairpin road, 2.5-hour taxi — book transfers 5 days ahead through Christmas week. Sunrise viewpoint at upper Ponmudi (1.5km walk from Golden Peak) at 6:30-7:15am.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
