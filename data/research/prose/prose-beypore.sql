-- Beypore destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala North Malabar batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: beypore | best_months 10-3 | avoid 6-8

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 1, 5, 'go',
  'Peak Malabar window. 22-31C, dry. Uru shipyard at full daylight visibility. Calicut beach loop adjacent.',
  'January is when Beypore runs at its strongest. Daytime 22-31C, the boatyard runs full daylight construction, lighthouse open, the 1km wood-yard walk along the Beypore river estuary at its driest. Advance request to Beypore Port Office for boatyard access (free, 10am-4pm).',
  NULL,
  'Beypore in January is when the world''s last continuously-operating Uru (Arabian dhow) shipyard runs at peak craft. Daytime 22-31C, nights 21C, humidity below 70 percent. The 1,000-year-old tradition of building 500-tonne wooden boats by hand using teak and jackwood — exported to UAE, Oman, Qatar — is concentrated along a 1.5km strip of the Beypore river estuary. Master craftsmen (ustads) from the Tachara and Adyodi families lead 50-strong work crews through 18-30 month builds. Beypore Port Office accepts written advance requests for boatyard access (free, 10am-4pm; arrive at the port office 24 hours ahead with passport copy). Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) is the cleanest evening anchor. The 1.5km beach below is quiet — Calicut International (CCJ) 30km handles flights, Kozhikode railway 10km handles trains. Eateries in Calicut (10km north) — Paragon, Sagar Hotel, Rahmaniya — anchor Malabar biriyani. Walk-in rates at Beach Hotel Beypore ₹3-5k, Beypore Heritage Resort ₹4-7k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 2, 5, 'go',
  'Driest month. 23-32C. Boatyard at full visibility. Lighthouse and beach at year-clean.',
  'February is the cleanest weather window. Rainfall under 5mm, low humidity, the Beypore river estuary at its driest. Boatyard advance-request access still applies; Calicut Beach (10km) and Kappad Beach (16km north of Calicut) day-trips work cleanly.',
  NULL,
  'February in Beypore is the technical peak. Rainfall under 5mm, daytime 23-32C, humidity at 65 percent. The Uru shipyard runs at full crew strength — 50-craftsman teams from the Tachara and Adyodi master-ustad families on 18-30 month builds along the 1.5km estuary strip. The proposed UNESCO Intangible Cultural Heritage status (Kerala Tourism nomination, evaluation pending) draws a steady stream of researchers and journalists in February. Beypore Port Office accepts advance written requests for boatyard observation walks (free, 10am-4pm). Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) at its driest. The 1.5km beach below holds clean morning sand. Day-trips to Kappad Beach (16km north of Calicut, where Vasco da Gama landed May 20, 1498) work in ₹400-600 auto round-trip from Beypore. Calicut International (CCJ) 30km, Kozhikode railway 10km. Walk-in rates at Beach Hotel Beypore ₹3-5k, Beypore Heritage Resort ₹4-7k, Hyatt Regency Calicut (10km north) ₹8-12k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 3, 4, 'go',
  'Last comfortable window. 24-33C. Boatyard mid-day collapses but mornings hold. Hotel rates 20 percent below February.',
  'March extends February''s weather minus the rate stress. Boatyard observation works 8-11am cleanly; mid-day open-yard walking past noon is a heat tax. Beypore Lighthouse and beach work fine 5pm-7pm.',
  NULL,
  'March in Beypore is the soft-landing month. Daytime 25-33C, humidity climbing to 75 percent in the last fortnight. The Uru shipyard 50-craftsman teams continue at full intensity — March is one of the steadiest months for visible plank-fitting and rib-bending work along the 1.5km estuary strip. The boatyard observation walk (Beypore Port Office, advance written request, free, 10am-4pm) works cleanly 8am-11am, then mid-day past 12 collapses under the March heat-and-humidity stack. Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) is the natural late-afternoon anchor. The Beypore Heritage Festival (Kerala Tourism, variable date — typically late February or March, check keralatourism.org for current year) brings 3-5 days of urubuilding demonstrations and boat-craft exhibitions. Hotel rates drop 20 percent versus February peak: Beach Hotel Beypore ₹2.5-4k, Beypore Heritage Resort ₹3.5-6k, Hyatt Regency Calicut ₹6-9k. Last comfortable window before April pushes the trip into endurance shape — Calicut International (CCJ) 30km, Kozhikode railway 10km.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 4, 3, 'wait',
  'Pre-monsoon heat. 26-35C, humidity 75 percent. Boatyard mornings only. Vishu Apr 14 stops work 24h.',
  'April still works for travelers willing to time-shift. Boatyard observation works 7am-10am cleanly, then collapses under the heat. Vishu (April 14, Malayalam new year) shuts boatyard work for 24 hours. Most ustads observe the festival as a household day.',
  'April delivers the first wave of Malabar pre-monsoon heat. Boatyard observation past 10am is unworkable, lighthouse climb past 4pm sweltering, beach mid-day unusable. Time-shift trip only — 7-10am yard, AC mid-day, 5-7pm lighthouse and beach.',
  'April in Beypore is when the trip narrows to early mornings and late evenings. Daytime 27-35C, humidity 75-80 percent. The Uru shipyard 50-craftsman teams continue work but pause mid-day shifts for the heat — observation walks (Beypore Port Office, advance written request) are cleanest 7am-10am. Vishu (April 14, Malayalam new year) is observed across the Tachara and Adyodi master-ustad families with the kanikkonna-flower Vishukani household ritual; the boatyard pauses for 24 hours around the festival. Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) holds its 142-step climb but the observation deck is uncomfortable past 4:30pm. The 1.5km Beypore Beach is dawn-only — sand temperatures spike past 50C by 11am. Walk-in hotel rates drop 30 percent versus February: Beach Hotel Beypore ₹2-3k, Beypore Heritage Resort ₹3-4.5k, Hyatt Regency Calicut (10km north) ₹4-7k. Calicut International (CCJ) 30km, Kozhikode railway 10km. The smart traveler''s shape: 7-10am yard, AC mid-day, 5-7pm lighthouse and beach.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 5, 2, 'wait',
  'Peak pre-monsoon. 27-36C, humidity 80 percent. Pre-monsoon thunderstorms last 10 days. Boatyard dawn-only.',
  'May still functions for the dawn boatyard observation if dates are immovable. Last 10 days bring pre-monsoon thunderstorms that knock grid power and slow yard work. Boatyard production continues at reduced shifts but observation needs to compress to 6:30-9am.',
  'May runs hot and sticky on the Malabar coast. Boatyard observation past 9am unworkable, lighthouse climb collapses, beach unusable. Yard production slows for the heat anyway. Wait for October.',
  'May in Beypore is the last month before the southwest monsoon arrives around June 1. Daytime 28-36C, humidity 80 percent, the third week brings pre-monsoon thunderstorms that knock grid power 1-3 hours each afternoon and slow Uru shipyard production by half. The 50-craftsman teams compress shifts to 6am-11am and 5pm-7pm. Boatyard observation walks (Beypore Port Office, advance written request, free) work cleanly 6:30am-9am only. Beypore Lighthouse (1969, ₹25, 4-5:30pm) — the 142-step climb is an endurance test in May. The 1.5km beach is dawn-only. Walk-in hotel rates at year-low: Beach Hotel Beypore ₹2-3k, Beypore Heritage Resort ₹3-4k, Hyatt Regency Calicut (10km north) ₹4-6k. Calicut International (CCJ) 30km flights run normally; Kozhikode railway 10km regular. The trip works only as a single dawn boatyard visit, then AC indoor day. Push to mid-October if dates flex — Karkidakam Ayurveda month begins mid-July at long-stay resorts but this is a different traveler entirely.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 6, 1, 'skip',
  'SW monsoon arrival. 24-30C, 700-900mm rainfall. Boatyard work pauses outdoor sections. Beach forbidden. Skip.',
  NULL,
  'June is when the southwest monsoon hits the Malabar coast. The Uru shipyard pauses the open-yard plank-and-rib work — 18-30 month build cycles slow by 60-70 percent for the wet season. The trip you came for cannot work; outdoor observation walks suspend.',
  'June in Beypore is when the southwest monsoon arrives — Kerala is the first state in India to receive the SW current, on or around June 1. Rainfall hits 700-900mm across 22-25 wet days, often as 4-8 hour sustained downpours. Daytime 25-30C, humidity 90 percent. The Uru shipyard pauses open-yard plank-and-rib work entirely — 18-30 month build cycles slow by 60-70 percent for the wet months as the teak and jackwood timber needs dry conditions for fitting. Beypore Port Office observation walks suspend through monsoon. Beypore Lighthouse (1969) remains technically open at ₹25 but the wet 142-step climb and the rain-blown observation deck collapse the experience. The 1.5km Beypore Beach is unsafe — Kerala Tourism issues a sea-state advisory, lifeguards withdraw. Walk-in hotel rates run at year-low: Beach Hotel Beypore ₹2-3k, Beypore Heritage Resort ₹3-4k. Calicut International (CCJ) 30km flights run normally. The trip is closed in everything but name. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rainfall. Boatyard outdoor work paused. Skip.',
  NULL,
  'July is the wettest month at Beypore. Boatyard outdoor plank-fitting paused, lighthouse climb dangerous, beach forbidden. The Uru-craft trip cannot happen. Wait for October.',
  'July in Beypore is the wettest month of the Malabar year. Rainfall averages 900-1100mm over 26-28 wet days, often as 6-12 hour sustained deluges. Daytime 25-29C with humidity at 90 percent. The Uru shipyard outdoor plank-fitting and rib-bending work remains paused for the season — the teak and jackwood timber needs sustained dry conditions for fitting and the master ustads run interior-shed and design-and-tooling work only. The 1.5km estuary strip is mud and standing water. Beypore Port Office observation walks suspend. Beypore Lighthouse (1969, ₹25 entry) remains technically open but the wet climb is unsafe. The Beypore Beach is unsafe under Kerala Tourism advisory. Walk-in hotel rates at year-low: Beach Hotel Beypore ₹2-3k, Beypore Heritage Resort ₹3-4k. Karkidakam Ayurveda month (mid-July to mid-August in the Malayalam calendar) starts drawing the medicine-tourism segment to long-stay resorts in Calicut and Kappad — a different trip entirely. The Uru shipyard observation visit cannot happen in July. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 600-800mm rain. Boatyard outdoor work still paused. Onam falls Aug-Sep.',
  NULL,
  'August holds the July pattern with marginally fewer extreme-rain days. Boatyard outdoor work still paused, lighthouse and beach unsafe. Onam (Aug-Sep variable) brings cultural events but Beypore is not an Onam-anchored destination. Wait for October.',
  'August in Beypore runs the July monsoon pattern with one cultural overlay. Rainfall eases slightly to 600-800mm across 23-25 wet days. Daytime 25-29C, humidity 90 percent. The Uru shipyard outdoor work remains paused for the season — interior-shed design and tooling continues but the visible 18-30 month build sequence on the estuary strip is suspended. Onam (Atham to Thiruvonam, 10-day Malayalam-calendar festival, variable date August-September) is Kerala''s biggest celebration but Beypore is not an Onam-anchored destination — Trichur, Trivandrum, and the backwater belt anchor the festival programming. Beypore Port Office observation walks suspend. Beypore Lighthouse (1969) and beach unsafe. Walk-in hotel rates at year-low: Beach Hotel Beypore ₹2-3k, Beypore Heritage Resort ₹3-4k, Hyatt Regency Calicut ₹4-6k. Karkidakam Ayurveda month ends mid-month. The standard Uru-craft trip remains closed. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 9, 2, 'wait',
  'Monsoon retreating. 24-31C, 250-400mm rain. Boatyard outdoor work resumes last week. Beach calms.',
  'September is the recovery month. Monsoon withdraws around September 25-30; outdoor boatyard plank-and-rib work resumes in the last week as the timber dries. Push to mid-October if dates flex.',
  'September is rebuild-not-yet-open month. Boatyard outdoor work picks up in the last week only. Beach calms but lifeguard cover thin. Push to October when the full Uru-craft observation cycle returns.',
  'September in Beypore is the trickle back. Rainfall halves versus August to 250-400mm, mostly first half. Daytime 25-31C, humidity finally easing toward 80 percent. The southwest monsoon retreats from the Malabar coast around September 25-30 (IMD declares formal withdrawal). The Uru shipyard outdoor plank-and-rib work resumes in the last week — the master ustads from the Tachara and Adyodi families bring the 50-craftsman teams back to the 1.5km estuary strip as the teak and jackwood timber dries. Beypore Port Office observation walks resume by month-end (advance written request, free, 10am-4pm). Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) and the 1.5km beach return to safe access by the third week. Walk-in hotel rates climb 15-20 percent versus August (Beach Hotel Beypore ₹2.5-4k, Beypore Heritage Resort ₹3.5-5k, Hyatt Regency Calicut ₹5-7k). Calicut International (CCJ) 30km, Kozhikode railway 10km. The Uru-craft observation works cleanly only for the last 5-7 days of September.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 10, 4, 'go',
  'Season opens. 24-31C, post-monsoon green, 100-200mm late rain. Boatyard back at full visibility.',
  'October is the proper season-opener. Boatyard outdoor work resumes full intensity from the second week, lighthouse and beach return to clean conditions, hotel rates 25-30 percent below January peak. Strong value window.',
  NULL,
  'October in Beypore is when the Malabar coast and the Uru shipyard return to coherence. Late-monsoon spillover drops 100-200mm of rain — almost all in the first 10 days — and the 50-craftsman teams from the Tachara and Adyodi master-ustad families resume full outdoor plank-fitting and rib-bending work along the 1.5km estuary strip from October 10-12. Daytime 25-31C, humidity falling toward 78 percent, sea temperature 28C. Beypore Port Office observation walks (advance written request, free, 10am-4pm) resume full programming. Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) reopens its 142-step climb and observation deck. The 1.5km beach lifeguard service returns 9am-5pm. Walk-in hotel rates run 25-30 percent below January peak: Beach Hotel Beypore ₹2.5-4k, Beypore Heritage Resort ₹3.5-5.5k, Hyatt Regency Calicut (10km north) ₹6-9k. Calicut International (CCJ) 30km, Kozhikode railway 10km. Pack a poncho rather than an umbrella — Malabar winds make umbrellas useless against the last monsoon squalls.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 11, 5, 'go',
  'Peak builds. 22-30C, dry. Boatyard at full daylight visibility. Hotel rates 20 percent below December.',
  'November is the genuine pivot to peak season. Rainfall under 50mm, dry, full boatyard daylight observation programming, lighthouse at clearest sky. Beypore Heritage Festival sometimes lands late November (Kerala Tourism — verify current-year dates).',
  NULL,
  'November in Beypore is the year''s second-peak month behind January. Rainfall under 50mm, daytime 23-30C, sea temperature 27C, humidity dropping under 70 percent. The Uru shipyard runs at full daylight observation conditions — the 50-craftsman teams from the Tachara and Adyodi master-ustad families on 18-30 month builds along the 1.5km estuary strip work cleanly through 10am-4pm without the heat-tax of February-March. Beypore Port Office (advance written request, free) accepts walk-up arrangements for late-morning observation slots. The Beypore Heritage Festival (Kerala Tourism / KTDC, variable annual scheduling — sometimes late November, sometimes February-March, check keralatourism.org for current year) brings 3-5 days of urubuilding demonstrations. Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) at the year''s clearest evening sky. Walk-in hotel rates: Beach Hotel Beypore ₹3-4.5k, Beypore Heritage Resort ₹4-6k, Hyatt Regency Calicut (10km north) ₹7-10k. Calicut International (CCJ) 30km, Kozhikode railway 10km. Strong call for first-time Uru-craft visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('beypore', 12, 5, 'go',
  'Peak season. 21-30C, dry. Christmas-NYE Dec 22-Jan 5 rates climb 50-70 percent. Boatyard at full visibility.',
  'December is when Beypore runs at full capacity. Hotel rates climb 50-70 percent for Christmas-NYE (Dec 22 to Jan 5), but Beypore is less pressured than Kovalam-Varkala. The first three weeks (Dec 1-21) are the better-value window.',
  NULL,
  'December in Beypore is the operational peak with a softer rate-climb than the Kovalam-Varkala beach belt. Daytime 22-30C, nights 21C, rainfall under 30mm. The Uru shipyard 50-craftsman teams run at full daylight intensity — December is one of the cleanest observation windows of the year, with crisp dry air and clean afternoon light along the 1.5km estuary strip. Beypore Port Office (advance written request, free, 10am-4pm) accepts walk-up arrangements with 24-hour notice. Beypore Lighthouse (1969, ₹25 entry, 4-5:30pm) at peak attendance — arrive at 4pm to clear the climb. Walk-in hotel rates: Beach Hotel Beypore ₹4-6k base, climbing to ₹6-9k Christmas-NYE; Beypore Heritage Resort ₹5-8k base climbing to ₹8-12k; Hyatt Regency Calicut (10km north) ₹10-15k base climbing to ₹14-22k. The first three weeks (December 1-21) are the better-value window — peak weather, peak craft visibility, rates 30-40 percent below Christmas-NYE numbers. Calicut International (CCJ) 30km via NH-66, Kozhikode railway 10km — book transfers 5 days ahead through Christmas week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
