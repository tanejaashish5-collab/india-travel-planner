-- Bengaluru destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: bengaluru | best_months [10,11,12,1,2,3,9] | avoid [4,5]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 1, 5, 'go',
  'Peak garden-city window. 15-28C, dry. Republic Day parade, low humidity, post-NYE rates ease mid-month.',
  'January is when Bengaluru runs at its strongest. Daytime 24-28C, nights drop to 15-17C, humidity under 55 percent. Lalbagh (1760 Hyder Ali, 240-acre, 6am-7pm, ₹40) and Cubbon Park (1870, 300-acre, 6am-6pm, free) at peak walking weather.',
  NULL,
  'Bengaluru in January is the version every Karnataka regular books first. At 920m elevation the city sits at 24-28C daytime, 15-17C nights, humidity at 55 percent — among the cleanest urban weather in India. Lalbagh Botanical Garden (commissioned 1760 by Hyder Ali, expanded under Tipu Sultan, the 240-acre walking circuit holds 1,800+ plant species and the Glass House modelled on Crystal Palace 1889) runs 6am-7pm, ₹40 — the morning walking crowd thins by 9am. Cubbon Park (1870, 300 acres, named after Sir Mark Cubbon) holds free walking access 6am-6pm; Karnataka High Court (1864 Athara Kacheri red building) and Vidhana Soudha (1956 Neo-Dravidian) anchor the central viewline. Bangalore Palace (Tudor-style 1887, modelled on Windsor Castle) 10am-5.30pm ₹230 Indian. Vidyarthi Bhavan (since 1943, Basavanagudi) opens 6.30am for masala dosa — the queue forms by 8am. MTR Lalbagh (1924 Mavalli Tiffin Room, the ravi idli originator) holds breakfast 7.30-11am. Craft-beer trio Toit Indiranagar, Arbor Whitefield, Windmills Craftworks (Whitefield) at full operational tempo.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 2, 5, 'go',
  'Driest month. 16-30C, humidity 50 percent. Lalbagh Flower Show last weekend. Heritage walking peak.',
  'February is Bengaluru''s cleanest weather window — rainfall under 10mm, humidity at year-low 50 percent. Lalbagh Republic Day Flower Show runs Jan 26 - Feb 4, then a quieter heritage-walk month. Bangalore Palace, Tipu''s Summer Palace, Bull Temple Basavanagudi all on full schedule.',
  NULL,
  'February in Bengaluru is the technical peak. Rainfall under 10mm, daytime 25-30C, humidity at 50 percent — the year-low. The Lalbagh Republic Day Flower Show (twice annually, Republic Day and Independence Day) runs Jan 26 to Feb 4 inside the Glass House — Karnataka Horticulture Department theme builds rotate annually, ₹80 entry, 30,000-50,000 visitors on the closing weekend. Cubbon Park (300 acres, free 6am-6pm) at year-clean walking conditions. Bangalore Palace (Tudor 1887, ₹230 Indian) 10am-5.30pm. Tipu''s Summer Palace (1791, Indo-Islamic teak-pillared, off KR Market) 8.30am-5.30pm ₹15. Bull Temple Basavanagudi (1537 Kempe Gowda, 4.6m monolithic Nandi) 6am-12.30pm + 5-9pm. Brahmins Coffee Bar (1965 Shankarpuram, idli-vada-coffee, ₹40-80 plates, closes 12.30pm) and CTR Malleshwaram (1920s, benne dosa) hold breakfast peak. Airlines Hotel (1959 Lavelle Road) parathas + filter coffee from 6am. Empire Restaurant (Mughlai chain) and Truffles (burger institution) hold dinner traffic. Hotel rates climb 10-15 percent versus January as MICE conference season peaks: Leela Palace ₹13-16k, Taj West End ₹12-15k, ITC Gardenia ₹11-14k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 3, 4, 'go',
  'Warming. 18-33C, humidity 55 percent. Last clean walking month. Holi long weekend bump. Lalbagh at year-greenest.',
  'March extends February''s pattern minus the Flower Show. Daytime 28-33C, mornings before 11am still comfortable for Lalbagh-Cubbon walks. Holi long weekend brings 3-day domestic bump. Hotel rates ease 10 percent versus February peak.',
  NULL,
  'March in Bengaluru is the soft-landing month before the pre-monsoon push. Daytime 28-33C, nights 18-20C, humidity climbing toward 60 percent in the last fortnight, rainfall under 20mm. Lalbagh (1760, 240 acres, ₹40, 6am-7pm) holds its post-Flower-Show calm — gulmohar and copperpod start flowering across Cubbon Park (300 acres, free). Bangalore Palace, Tipu''s Summer Palace, Bull Temple all on full schedule. Heritage walking compresses to 7-11am and 5-9pm windows from week three onward. Holi (variable mid-March, 3-day long weekend in 2026) brings a domestic weekend bump from Hyderabad, Pune, Mumbai. Cricket follows: Chinnaswamy Stadium (1969, RCB home ground, IPL season Mar-May) hits its first home fixtures end-March, tickets ₹800-12,000 via BookMyShow when released. Vidyarthi Bhavan (1943) and MTR Lalbagh (1924) hold breakfast hours unchanged. Koshy''s Parade Café (1940, MG Road) is the canonical AC mid-day refuge. Craft beer at Toit, Arbor, Windmills holds full evening rotation — outdoor seating still viable till 8pm. Hotel rates ease 10 percent versus February peak: Leela Palace ₹11-14k, Taj West End ₹10-13k, ITC Gardenia ₹10-12k, mid-bracket ₹4.5-7k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 4, 3, 'wait',
  'Pre-monsoon peak heat. 21-35C, humidity 65 percent. Bangalore Karaga (Apr 1, 2026). AC pivot.',
  'April is the year''s warmest stretch but Bengaluru''s 920m altitude keeps it mild by Indian standards (35C peak, not 42C). Bangalore Karaga (April 1, 2026, Chaitra Poornima) is the historic 9-day Tigala-community festival — 14-hour all-night karaga jatre from Dharmaraya Swamy Temple Thigalarpet.',
  'April puts Bengaluru into mid-day endurance shape. 28-35C, humidity 65 percent, sea breeze irrelevant inland. Outdoor walking collapses 11am-5pm. Hotel rates near year-low. Push to October-November for clean walking weather and the same heritage shape without endurance penalties.',
  'April in Bengaluru is when the trip narrows to early morning and post-sunset. Daytime 28-35C, nights 21-23C, humidity 65 percent — mild for India but the year''s warmest stretch at this altitude. Pre-monsoon thunderstorms hit week three onward, short 1-hour squalls that drop temperatures temporarily but raise humidity. The headline date is the Bangalore Karaga — the 9-day Tigala (Hindu Tamil washerman community) festival that has run from Dharmaraya Swamy Temple in Thigalarpet since the 1500s, peaking with the all-night Karaga Jatre on Chaitra Poornima (April 1 in 2026) — a priest dressed as the goddess Draupadi carries a flower-pot karaga on his head through a 14-hour walking procession across the Old Pete, KR Market, Cubbon Pete, and 60+ temples; the procession draws 200,000+ spectators across the night. The route stays closed to vehicles 10pm-12pm next day. Lalbagh (₹40, 6am-7pm) and Cubbon Park (free) work 6-10am and 5.30-7pm only. AC retreats: Government Museum Kasturba Road (1865, fifth-oldest museum in India), Visvesvaraya Industrial & Technological Museum (1965), Bangalore Palace interior.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 5, 3, 'wait',
  'Pre-monsoon plus thunderstorms. 22-34C. IPL playoffs at Chinnaswamy. Power-cut risk.',
  'May still functions for AC-heavy itineraries plus the IPL playoff finish. Pre-monsoon thunderstorms knock power 1-2 hours daily through last fortnight. Chinnaswamy Stadium hosts playoffs if RCB qualifies. Hotel rates at year-low.',
  'May is when pre-monsoon thunderstorms hit Bengaluru consistently. Daytime 27-34C, nights 22-24C, humidity 75 percent. Power cuts run 1-2 hours daily through the last fortnight as the grid struggles with peak demand and storm damage. Outdoor walking compresses to dawn and post-7pm. Wait for October.',
  'May in Bengaluru is the pre-monsoon transition month. Daytime 27-34C, nights 22-24C, humidity climbing past 75 percent in the last fortnight. Pre-monsoon thunderstorms hit harder than April — violent 1-2 hour evening squalls knock BESCOM (Bangalore Electricity Supply Company) grid 1-2 hours daily across the last 10 days, restaurants and cafes run on backup generators. Daytime temperatures peak earlier in the day and the post-storm humidity stays at 85 percent through the evening. Lalbagh (₹40, 6am-7pm) and Cubbon Park (free 6am-6pm) work 6-9am only — the post-shower greenery does look cinematic but mid-day walking is unworkable. IPL playoffs run last week of May — if RCB qualifies, Chinnaswamy Stadium (1969 capacity 40,000) hosts knockouts; tickets ₹3,000-25,000 secondary market. AC retreats: malls (Phoenix Marketcity Whitefield, Orion Mall Rajajinagar, UB City Vittal Mallya Road), Visvesvaraya Technological Museum, Government Museum. Koshy''s, MTR Lalbagh, Vidyarthi Bhavan run normal hours. Hotel rates at near year-low: Leela Palace ₹8-11k, Taj West End ₹7-10k, ITC Gardenia ₹7-9k, mid-bracket ₹3.5-5.5k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 6, 4, 'go',
  'SW monsoon arrives. 20-29C, 100-150mm rainfall. Mild relief from heat. Indoor city runs at full tempo.',
  'June is when the SW monsoon hits Bengaluru. 100-150mm rainfall, 2-3 hour daily afternoon downpours, but temperatures ease to 20-29C — among the most comfortable Indian cities monsoon-wise. Heritage venues, malls, breweries, restaurants all on full schedule.',
  NULL,
  'Bengaluru in June is the year''s mildest stretch by temperature — the southwest monsoon arrives in the first fortnight (Karnataka typically receives onset around June 5-10 inland), bringing 100-150mm of rainfall across 14-18 wet days, almost all as 2-3 hour afternoon downpours. Daytime 24-29C, nights 20-22C, humidity 80 percent. Bengaluru handles the SW monsoon better than coastal Karnataka (Mangalore receives 1000mm in June) or the Western Ghats (Chikmagalur/Coorg 600-800mm) — at 920m the city catches a moderate version. Lalbagh (₹40, 6am-7pm) at year-greenest after weeks of rain; Cubbon Park (free 6am-6pm) similarly. Bangalore Palace, Tipu''s Summer Palace, Bull Temple Basavanagudi all on full schedule. The city''s indoor side runs unaffected — UB City restaurants, Toit-Arbor-Windmills breweries (covered seating), Phoenix Marketcity, Orion Mall, Garuda Mall traffic at normal levels. Koshy''s Parade Café (1940), Empire Restaurant, MTR Lalbagh (1924), Vidyarthi Bhavan (1943), Brahmins Coffee Bar (1965), CTR Malleshwaram (1920s) all hold standard hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 7, 3, 'wait',
  'SW monsoon peak. 20-27C, 110-160mm rainfall. Cool but wet. Outdoor walking compromised.',
  'July is wet across 20-22 days but rarely punishing — Bengaluru averages 110-160mm rainfall versus 900mm at Mangalore. Indoor city runs at full tempo. Sep-Feb is better for outdoor heritage walking.',
  'July at Bengaluru is wet — 110-160mm rainfall across 20-22 days. Daytime 23-27C, the year''s coolest stretch, but Lalbagh and Cubbon walks routinely cancelled by afternoon storms.',
  'Bengaluru in July is the wettest month of the year — 110-160mm rainfall across 20-22 wet days at the 920m elevation. Daytime 23-27C, nights 20-22C, humidity 85 percent. This is materially lighter than coastal Karnataka (Mangalore averages 900mm in July) and the Malnad Western Ghats (Coorg/Chikmagalur 800-1000mm) but it does dominate the outdoor schedule. Storms hit predictably 3-6pm; mornings before noon hold reasonable walking conditions but the city''s broken footpaths and surface flooding (BBMP storm-drain capacity at limits across Indiranagar, Whitefield, HSR) compress the walking trip. Lalbagh (₹40, 6am-7pm) post-monsoon-flush is photographically the year''s best — book a 7am gate slot. Cubbon Park (free 6am-6pm) at year-greenest. The city''s indoor side runs unaffected: malls, breweries (Toit, Arbor, Windmills, Big Brewsky), Visvesvaraya Industrial & Technological Museum, HAL Aerospace Museum (10am-5pm closed Mon, ₹50), Government Museum Kasturba Road all at normal traffic. MTR Lalbagh, Vidyarthi Bhavan, Brahmins, CTR, Airlines Hotel, Koshy''s, Empire all hold normal hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 8, 3, 'wait',
  'SW monsoon continues. 20-27C, 130-180mm rainfall. Lalbagh Independence Day Flower Show. Indoor city normal.',
  'August holds the July pattern. Lalbagh Independence Day Flower Show (Aug 8-17 indicative) runs the year''s second show edition. Indoor city at normal tempo. October is dramatically cleaner for outdoor heritage walking.',
  'August at Bengaluru is wet — 130-180mm rainfall across 22-25 days, the year''s second-wettest month after July. Lalbagh Flower Show (Aug 8-17 indicative) brings 30,000-50,000 visitors on the closing weekend but otherwise the outdoor shape stays compressed. Indoor city normal. Wait for October.',
  'Bengaluru in August holds the July monsoon pattern with marginally more wet days — 130-180mm rainfall across 22-25 days. Daytime 23-27C, nights 20-22C, humidity 85 percent. The headline event: the Lalbagh Independence Day Flower Show (the second of two annual Karnataka Horticulture Department flower shows; runs roughly Aug 8-17, exact dates announced annually) — themed display inside the Glass House (1889, modelled on Crystal Palace), 1.5-2 lakh visitors across the 10 days, peak crowds Aug 14-15 weekend. ₹80 entry, gates 9am-6pm. Independence Day (Aug 15) brings a 3-day weekend bump from Chennai, Hyderabad, Mumbai. Lalbagh aside, Cubbon Park stays at year-greenest. The city''s indoor side runs unaffected: malls (Phoenix Marketcity, Orion, UB City), breweries (Toit Indiranagar, Arbor Whitefield, Windmills Craftworks, Big Brewsky Sarjapur), museums (Government Museum Kasturba Road, HAL Aerospace, Visvesvaraya Technological), MG Road shopping, Chickpet silk wholesale. MTR Lalbagh, Vidyarthi Bhavan, Brahmins, CTR Malleshwaram, Koshy''s, Empire, Truffles all hold normal hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 9, 4, 'go',
  'SW monsoon withdraws. 19-28C, 130-180mm rainfall easing. Outdoor walking returns. Ganesh Chaturthi.',
  'September is the recovery month — SW monsoon retreats from Karnataka by week three, rainfall easing through the month. Daytime 23-28C, nights 19-21C. Ganesh Chaturthi (variable Sep, 2026 Sep 14) brings 11-day pandal traffic across Basavanagudi, Malleshwaram, Jayanagar.',
  NULL,
  'Bengaluru in September is the soft re-opening. Rainfall drops to 130-180mm across 16-18 wet days, mostly the first fortnight. Daytime 23-28C, nights 19-21C, humidity easing toward 75 percent. The southwest monsoon retreats from interior Karnataka by September 20-25; Bengaluru gets dramatically cleaner afternoon weather from the third week. Lalbagh (₹40, 6am-7pm) and Cubbon Park (free 6am-6pm) return to reliable full-day walking. Bangalore Palace (Tudor 1887, ₹230 Indian), Tipu''s Summer Palace, Bull Temple Basavanagudi all on full schedule. Ganesh Chaturthi (variable Sep, in 2026 Sep 14, 11-day Bhadrapada festival) brings dramatic pandal activity across Basavanagudi (the Bull Temple Big Ganesha tradition since 1916), Malleshwaram, Jayanagar, Gandhi Bazaar; immersion processions on Anant Chaturdashi block roads from KR Market to Ulsoor Lake — plan around it. Cricket at Chinnaswamy resumes for ODI/T20 internationals if scheduled. Hotel rates climb 10 percent across the month: Leela Palace ₹9-12k, Taj West End ₹8-11k, ITC Gardenia ₹8-10k, mid-bracket ₹4-6k. MTR Lalbagh, Vidyarthi Bhavan, Brahmins, CTR, Airlines Hotel, Koshy''s, Empire all on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 10, 5, 'go',
  'Season opens. 18-29C, 130-170mm rainfall. NE monsoon overspill mostly evening. Cricket season, Dasara tail.',
  'October is the proper season opener. NH-275 Bengaluru-Mysore at full tempo for Dasara visitors (festival peaks Sep 22-Oct 1, 2026). Tea shop weather. Heritage walks return. Hotel rates 15-25 percent below December peak.',
  NULL,
  'Bengaluru in October is when the garden city returns to walking-season operations. Daytime 24-29C, nights 18-20C, humidity dropping toward 70 percent, rainfall 130-170mm — northeast monsoon overspill from Tamil Nadu hitting mostly as 1-2 hour evening showers in the first fortnight. Lalbagh (1760, 240 acres, ₹40, 6am-7pm) at year-second-greenest after the SW monsoon flush; Cubbon Park (300 acres, free 6am-6pm) similarly. Heritage walking compresses to mornings before noon and post-4pm. Mysore Dasara (Sep 22 - Oct 1, 2026) tail-effect spills into the first week of October — the NH-275 Bengaluru-Mysore corridor at peak traffic for the Vijayadashami weekend (Sep 30, 2026), Bengaluru hotels see a 2-3 day surge from international Dasara tourists transiting through. Bangalore Palace, Tipu''s Summer Palace, Bull Temple all on full schedule. Cricket: T20 international season starts at Chinnaswamy if scheduled. Karnataka Rajyotsava (Nov 1) preparations begin late month — Vidhana Soudha and Cubbon Park frontage stage state celebration logistics. Hotel rates climb across the month: Leela Palace ₹10-13k, Taj West End ₹9-12k, ITC Gardenia ₹9-11k, mid-bracket ₹4.5-7k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 11, 5, 'go',
  'High season builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Cricket season, full Chinnaswamy fixtures.',
  'November is the genuine pivot to Bengaluru high season. Northeast monsoon overspill spent by mid-month, rainfall under 70mm, humidity 60 percent. Karnataka Rajyotsava (Nov 1, State Formation Day 1956) brings state-wide celebration. Hotel rates climb 20-25 percent as Christmas-week books out.',
  NULL,
  'Bengaluru in November is when the city turns the corner. Northeast monsoon overspill eases to under 70mm across 5-7 wet days, almost all in the first week. Daytime 25-28C, nights 17-19C, humidity dropping toward 60 percent — among the cleanest urban weather in India. The headline date: Karnataka Rajyotsava (November 1, State Formation Day 1956 — the linguistic reorganisation that created Mysore State, renamed Karnataka 1973) — state-wide celebration, government buildings draped in red-and-yellow Karnataka flags, free entry to Vidhana Soudha public viewing (otherwise restricted to Sunday 3.30-5.30pm), state-cultural programmes at Ravindra Kalakshetra and Town Hall. Lalbagh (₹40, 6am-7pm) and Cubbon Park (free 6am-6pm) at full operational tempo. Bangalore Palace (₹230 Indian), Tipu''s Summer Palace, Bull Temple Basavanagudi all on full schedule. Cricket: Chinnaswamy hosts full schedule of domestic Ranji, Vijay Hazare, Syed Mushtaq Ali plus international fixtures if scheduled. Concentration of weekend traffic from Nov 15 onward as Christmas-week families begin booking.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bengaluru', 12, 5, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE rates 2x. MG Road decorated. Brigade Road street party Dec 31.',
  'December is the year''s most reliable Bengaluru window — peak weather, dry, full operational tempo. Christmas-NYE week drives rates to 1.8-2.2x base. Brigade Road and MG Road run NYE street parties; Phoenix Marketcity and Orion Mall stage curated programming.',
  NULL,
  'Bengaluru in December is the year''s most coherent window — peak weather, full operational tempo, the garden city at year-cleanest visibility. Daytime 23-27C, nights 14-16C (some city outskirts drop to 12C late month), humidity 55 percent, rainfall under 15mm. Christmas-NYE week (Dec 22-Jan 5) is the brutally tight stretch: luxury hotels (Leela Palace, Taj West End, ITC Gardenia, JW Marriott UB City, Ritz-Carlton) climb to ₹18-25k against ₹9-12k off-peak; mid-bracket (The Park, Royal Orchid, Lemon Tree) hits ₹8-12k against ₹4-6k off-peak; homestays double to ₹3,500-5,500. Brigade Road (the pedestrian-only December 31 NYE street party tradition — 100,000+ people across the 1.2km strip, road closes 6pm Dec 31 to 4am Jan 1), MG Road, Church Street, Indiranagar 100ft Road all decorated. Phoenix Marketcity Whitefield, Orion Mall Rajajinagar, UB City Vittal Mallya, Mantri Square Malleshwaram stage curated December programming. Lalbagh (₹40, 6am-7pm) and Cubbon Park (free 6am-6pm) at peak Christmas-week traffic. Bangalore Palace, Tipu''s Summer Palace, Bull Temple Basavanagudi all on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
