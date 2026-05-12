-- Udupi destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: udupi | best 10-3 | avoid 6-8 | type temple/food/beach/pilgrimage

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 1, 5, 'go',
  'Peak window plus Paryaya 2026. 22-31C dry. Sri Krishna Matha succession Jan 18 — once-in-2-years.',
  'January is the peak Udupi pilgrimage and cuisine window. Sri Krishna Matha at full schedule. Paryaya 2026 (Jan 18 — the biennial transfer of Krishna Matha administration between the 8 Madhva ashta-mathas, Sri Adamaru Matha handing to Sri Krishnapura Matha) draws 50,000-plus pilgrims.',
  NULL,
  'Udupi in January is the version pilgrims, food regulars, and Konkan-coast travellers book first. Daytime 22-31C, nights 22C, rainfall under 5mm. Sri Krishna Matha (founded by the dvaita philosopher Madhvacharya in 1238 CE, the Krishna idol traditionally believed brought from Dwarka in a ship that ran aground at Malpe) runs at full daily schedule — darshan windows 4.30am-1.30pm and 3-9pm, the famous Kanakana Kindi window (the small slit in the western wall through which the saint Kanakadasa, denied entry on caste grounds, is said to have received Krishna''s darshan when the idol turned) accessible all day. The defining event of January 2026 is Paryaya — the biennial January 18 transfer of Sri Krishna Matha administration between the eight Madhva ashta-mathas (this year Sri Adamaru Matha hands over to Sri Krishnapura Matha; next Paryaya 2028, Sri Pejavara Matha taking over). The processional Paryaya jatre brings 50,000-plus pilgrims through Car Street; Hotel Diana, Mahalaxmi, Mitra Samaj (the original Udupi vegetarian Brahmin canteens) queue from 7am.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 2, 5, 'go',
  'Driest month. 23-32C. Kambala buffalo races at year-peak. Hotel rates ease 20 percent versus January.',
  'February is the cleanest coastal Karnataka window. Rainfall under 5mm. Kambala season at year-peak — slush-paddy buffalo races at Moodbidri-Karkala-Venoor circuits weekend events. Hotel rates ease 20 percent versus January Paryaya peak.',
  NULL,
  'Udupi in February is the technical peak of the coastal Karnataka pilgrimage year minus the Paryaya crowd. Rainfall under 5mm, daytime 23-32C, nights 22C, humidity 62 percent. Sri Krishna Matha (the 1238 CE Madhvacharya foundation, eight ashta-matha rotation, current 2026 Paryaya tenure with Sri Krishnapura Matha) at full pilgrim flow but materially lighter than January peak. The Kanakana Kindi small-window darshan, the morning aarti at 6am, and the evening offerings all run at year-cleanest visibility. Kambala buffalo races — the coastal Karnataka tradition of two buffalo pairs racing through 130-140m water-filled paddy tracks — hits year-peak weekends in February: Moodbidri, Karkala, Venoor, Pilikula host major events. Verify the weekly schedule on kambala.in or Kannada press. Malpe Beach plus St Mary''s Island ferry at full Sep-May operations (₹450 return, 30-min crossing, last return 4pm) — the basaltic columnar joints (declared National Geological Monument by GSI) are at year-cleanest dry-rock access.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 3, 4, 'go',
  'Last cool month. 24-33C, humidity 70 percent. Pilgrimage and food at full tempo. Rates 25 percent off February.',
  'March extends February''s pattern with the first humidity creep. Sri Krishna Matha darshan and Udupi cuisine canteens at full tempo. Malpe Beach plus St Mary''s Island ferry still running. Hotel rates 25 percent below February peak.',
  NULL,
  'Udupi in March is the soft-landing month before pre-monsoon humidity. Daytime 25-33C, nights 23C, humidity climbing to 70 percent in the last fortnight, rainfall under 25mm. Sri Krishna Matha (1238 CE Madhvacharya foundation) holds full pilgrim flow — Car Street darshan windows 4.30am-1.30pm and 3-9pm. The Kanakana Kindi window, the eight surrounding ashta-matha buildings (Pejavara, Palimaru, Adamaru, Putige, Sodhe, Kaniyooru, Shirur, Krishnapura — each operating its own pilgrimage offerings and free-meal schedule), and the morning aarti procession all run normal hours. Malpe Beach (6km, ₹50 parking) at year-cleanest swim conditions before April humidity sets in. St Mary''s Island ferry (Sep-May season, ₹450 return, last return 4pm) at full Saturday-Sunday demand. Mitra Samaj (Car Street since 1920), Diana Hotel, Mahalaxmi, Woodlands Restaurant — the Udupi pure-veg Brahmin cuisine origin canteens (no onion, no garlic in the strict tradition) — at full breakfast-and-thali service. Kambala buffalo race season tail-end: last weekends at Moodbidri, Karkala. Hotel rates 25 percent below February: Paradise Isle Malpe ₹4-6k, Karavali ₹3-4.5k, town hotels ₹1.8-3k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 78 percent. Pilgrim flow holds, beach and ferry collapse mid-day.',
  'April still works for darshan-and-food travellers willing to time the day. Sri Krishna Matha cool early-morning and evening windows. Hotel rates 30 percent below February.',
  'April pushes Udupi into pre-monsoon stress. Malpe Beach and St Mary''s Island ferry collapse 11am-4pm, Car Street pilgrim queue mid-day brutal, Kambala season closes. Wait for late October.',
  'April in Udupi is when the pilgrimage city narrows to dawn-darshan and evening-aarti windows. Daytime 28-34C, nights 25C, humidity 78 percent, sea temperature 30C. Sri Krishna Matha (1238 CE Madhvacharya foundation, Sri Krishnapura Matha currently in Paryaya tenure) holds full darshan schedules but the Car Street procession queues collapse 11am-3pm. The 6am Nirmalya darshan and the 7pm Mahapooja are the workable windows. The Kanakana Kindi small-window darshan accessible all day. Malpe Beach (6km, ₹50 parking) swim conditions still acceptable 6-9am and 5-7pm only. St Mary''s Island ferry (Sep-May season ending late April) at last full-month operations — ₹450 return, 30-min crossing, last return 4pm. Mitra Samaj, Diana Hotel, Mahalaxmi all run full breakfast-and-thali service — the pure-veg Brahmin cuisine canteens are AC retreat options in their own right. Saraswathi Hotel (the masala dosa origin claimant) on Car Street. Hotel rates 30 percent below February peak: Paradise Isle Malpe ₹3-5k, Karavali ₹2.5-3.5k, town hotels ₹1.5-2.5k. Kambala buffalo race season has closed by April 1.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 5, 2, 'wait',
  'Peak pre-monsoon. 28-34C humidity 82 percent. Sea swell builds, ferry closes mid-month. Pre-monsoon thunderstorms.',
  'May functions only for pilgrimage-only travellers willing to anchor in temple AC darshan halls. St Mary''s Island ferry closes mid-month for monsoon. Hotel rates at year-low.',
  'May runs hot and sticky on the Udupi coast. Beach swim closes from mid-month, St Mary''s Island ferry suspends for the monsoon season (Sep restart), pre-monsoon thunderstorms knock grid 1-2 hours daily. October-March window is dramatically better.',
  'May in Udupi is the closing pre-monsoon month before the southwest current arrives around June 1. Daytime 29-34C, nights 26C, humidity 82 percent, sea temperature 30C with growing swell. The St Mary''s Island ferry season closes around mid-May — the basaltic columnar joints island remains inaccessible until September restart. Malpe Beach swimming becomes risky from the third week as the pre-monsoon swell builds. Pre-monsoon thunderstorms hit the third and fourth weeks — afternoon squalls that knock grid power 1-2 hours and raise humidity to 90 percent. Sri Krishna Matha holds full schedule — the Madhvacharya 1238 CE foundation, the Kanakana Kindi window darshan, the morning aarti at 6am, the ashta-matha pilgrim free-meal services — all at lighter pilgrim flow than peak season. AC anchors: temple darshan halls, Manipal Hotel restaurants (Manipal University campus 5km from Udupi town), Mitra Samaj and Diana indoor seating. Hotel rates at year-low: Paradise Isle Malpe ₹2.5-4k, Karavali ₹2.2-3.2k, town hotels ₹1.3-2.2k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 6, 1, 'skip',
  'SW monsoon onset. 24-29C, 900-1100mm rainfall. Beach closed, ferry suspended. Pilgrimage continues but standard trip collapses.',
  NULL,
  'June is when the southwest monsoon hits the Udupi coast with peak Karnataka force. Rainfall 900-1100mm, beach closed, ferry season ended. Sri Krishna Matha continues but the standard pilgrimage-plus-beach trip cannot happen. Skip unless darshan-only.',
  'June in Udupi is the southwest monsoon''s arrival point. The current hits the Karnataka coast within 24-48 hours of the IMD Thiruvananthapuram announcement. Rainfall jumps from May''s 80mm to 900-1100mm across 24-26 wet days — Udupi sits near Mangalore-Karwar on the list of India''s wettest June stations. Daytime 25-29C feels mild but 92 percent humidity and sustained 6-12 hour downpours close down the coastal-temple-plus-beach trip Udupi is built for. Malpe Beach under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards withdrawn for the season. St Mary''s Island ferry suspended (next restart late September-early October). Sri Krishna Matha (1238 CE Madhvacharya foundation, current Paryaya tenure with Sri Krishnapura Matha) continues full darshan operations but Car Street pilgrim queues drop to a fifth of January Paryaya peak. The ashta-matha free-meal services (annadana) continue daily — Mitra Samaj, Diana Hotel, Mahalaxmi all run normal hours. Hotel rates at year-low: Paradise Isle Malpe ₹2.5-4k, Karavali ₹2-3k, town hotels ₹1.3-2.2k. Konkan Railway between Udupi and Goa runs at peak landslide-watch — buffer days on either side mandatory.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 7, 1, 'skip',
  'Peak monsoon. 24-28C, 1000-1200mm rainfall. Sea forbidden, ferry suspended, pilgrim flow at year-low. Skip.',
  NULL,
  'July is the wettest month on the Udupi coast. Rainfall 1000-1200mm across 26-28 wet days, sea bathing prohibited, St Mary''s Island ferry suspended. Sri Krishna Matha continues but pilgrim flow at year-low. Skip outright.',
  'July in Udupi is the year''s wettest stretch. Rainfall averages 1100mm across 26-28 wet days, often as 6-12 hour sustained deluges with cyclonic-cell wind. Daytime 25-28C, humidity 93 percent. Malpe Beach under Karnataka Tourism red-flag advisory — sea bathing prohibited, lifeguards withdrawn. St Mary''s Island ferry suspended for the monsoon season. Sri Krishna Matha (the 1238 CE Madhvacharya foundation that anchors Udupi''s identity, the eight ashta-matha rotation currently in Sri Krishnapura Matha tenure) continues full darshan operations — 4.30am-1.30pm and 3-9pm windows, the Kanakana Kindi small-window darshan, the morning Nirmalya at 6am, the evening Mahapooja at 7pm — but pilgrim flow at year-low. The ashta-matha annadana free-meal services continue daily. Mitra Samaj (Car Street, 1920 founding), Diana Hotel, Mahalaxmi, Saraswathi Hotel all hold normal hours; Woodlands Restaurant; Manipal Hotel restaurants at Manipal University campus 5km out. Hotel rates at year-low: Paradise Isle Malpe ₹2.5-4k, Karavali ₹2-3k, town hotels ₹1.3-2.2k. The Konkan Railway stretch between Mangalore and Udupi runs at peak landslide-watch operating mode. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 8, 3, 'wait',
  'Monsoon plus Krishna Janmashtami. 24-29C, 600-800mm rain. Janmashtami the year''s biggest temple event.',
  'August holds July''s rain but Krishna Janmashtami at Sri Krishna Matha (variable late-Aug date — verify against lunar calendar) is the year''s biggest pilgrimage event after Paryaya. 50,000-100,000 pilgrims through Car Street. Hotel beds book 4-6 weeks ahead for Janmashtami week.',
  'August outside the Janmashtami window is monsoon-locked — sea forbidden, ferry suspended, standard pilgrimage flow at year-low. The festival pulls 50,000-100,000 pilgrims for 24-48 hours then the city returns to monsoon. Plan around the event or skip the month.',
  'August in Udupi is the monsoon month with one major cultural exception. Rainfall 600-800mm across 22-24 wet days, daytime 25-29C, humidity 91 percent. Sea bathing remains prohibited at Malpe; St Mary''s Island ferry suspended. The exception is Krishna Janmashtami — the lunar festival celebrating Krishna''s birth, which falls in August in most years (variable, typically the krishna-paksha ashtami of Sravana, verify exact 2026 date on Sri Krishna Matha calendar). Sri Krishna Matha (the 1238 CE Madhvacharya foundation) runs its year-biggest pilgrim event after Paryaya — 50,000 to 100,000 pilgrims through Car Street over 24-48 hours, special darshan windows extended through the night of Janmashtami, the Krishna idol decorated in special vesha, the procession through Old Udupi at midnight. Hotel beds book 4-6 weeks ahead for the Janmashtami week — Paradise Isle Malpe ₹4-6k (versus ₹2.5-4k normal August), Karavali ₹3-4.5k, town hotels ₹1.8-3k. Outside the festival, monsoon conditions hold: Mitra Samaj, Diana Hotel, Mahalaxmi annadana service continues; the AC darshan halls remain the only viable shape. The next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 9, 2, 'wait',
  'Monsoon retreat. 24-30C, 300-400mm rain. Ferry restart late month. Pilgrim flow returning.',
  'September is the recovery month. SW monsoon retreats around Sep 25, beach reopening late month, St Mary''s Island ferry restarts. Late September workable but October 15 onward dramatically cleaner.',
  'September is on the way back but first fortnight remains heavily wet, sea bathing still under advisory, ferry not yet restarted. Push to mid-October — same coastal-temple aesthetic at materially cleaner sea and trail conditions.',
  'September in Udupi is the trickle back from monsoon. Rainfall drops to 300-400mm across 16-18 wet days, mostly the first fortnight. Daytime 25-30C, humidity easing to 82 percent in the second half. The southwest monsoon retreats from the Karnataka coast around September 25-30 (IMD declares formal withdrawal). Malpe Beach swimming remains under Karnataka Tourism advisory through the first three weeks; coast guard typically lifts the red flag by the last week. St Mary''s Island ferry (the basaltic columnar joints crossing — Geological Survey-protected National Monument, ~88M-year-old volcanic basalt) restarts late September or early October weather permitting (₹450 return, last return 4pm). Sri Krishna Matha (1238 CE Madhvacharya foundation, current Sri Krishnapura Matha Paryaya tenure) at full daily darshan; pilgrim flow recovering as monsoon-fearful pilgrims return. The ashta-matha free-meal services continue. Mitra Samaj, Diana Hotel, Mahalaxmi at full breakfast-and-thali service. Krishna Janmashtami spillover from August keeps domestic traffic elevated through the first week.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 10, 4, 'go',
  'Season opens. 24-31C, 200-250mm spillover. Ferry restarts, beach reopens, pilgrim flow returns.',
  'October is the season opener. Late-monsoon residue first 10 days, then full pilgrimage-plus-beach mode. St Mary''s Island ferry restarts. Karnataka Rajyotsava prep for Nov 1. Hotel rates 25 percent below January Paryaya peak.',
  NULL,
  'October in Udupi is the proper return to coherent. Rainfall drops to 200-250mm with the bulk falling in the first ten days; from October 15 onward Udupi flips into clean pilgrimage-plus-beach mode. Daytime 25-31C, humidity falling from 85 to 75 percent. Sri Krishna Matha (1238 CE Madhvacharya foundation, current Paryaya tenure with Sri Krishnapura Matha) runs at recovering pilgrim flow. Malpe Beach reopens to swimming as coast guard lifts the monsoon red-flag — water temperature 28C, sea swell easing through the month. St Mary''s Island ferry (Sep-May season, ₹450 return, 30-min crossing, last return 4pm) restarts at full schedule by mid-month — the basaltic columnar joints island accessible after a 5-month closure. Karnataka Rajyotsava preparation begins for November 1 across the coastal belt. Mitra Samaj, Diana Hotel, Mahalaxmi, Saraswathi Hotel, Woodlands Restaurant all return to full weekday-and-weekend service — the pure-veg Brahmin Udupi cuisine canteens at year-cleanest mid-month visitor load. Hotel rates 25 percent below January Paryaya peak: Paradise Isle Malpe ₹3.5-5.5k, Karavali ₹3-4.5k, town hotels ₹1.8-2.8k. Manipal University term in full swing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 11, 5, 'go',
  'Peak builds. 23-31C, rainfall under 60mm. Karnataka Rajyotsava Nov 1. Kambala season opens. Rates climb 20 percent.',
  'November is the proper pivot to peak. Rainfall under 60mm, full pilgrimage-plus-beach weather. Karnataka Rajyotsava Nov 1, Kambala buffalo races open the Nov-Mar season. Hotel rates climb 20 percent across the month.',
  NULL,
  'November in Udupi is the year''s second-peak month behind January. Rainfall drops under 60mm, daytime 24-31C, sea breeze cooling evenings to 22-23C, humidity dropping below 70 percent. The Arabian Sea returns to full bathable calm at Malpe (water 27C, sea-state green flag). Sri Krishna Matha (1238 CE Madhvacharya foundation, current Sri Krishnapura Matha Paryaya tenure) at recovering full pilgrim flow — the Car Street darshan windows, Kanakana Kindi small-window, ashta-matha free-meal services all at clean operational tempo. Karnataka Rajyotsava (November 1, marking the 1956 state formation under the States Reorganisation Act) sees city-wide cultural programmes — Kannada language events, special schedules at Krishna Matha. Kambala buffalo race season opens — the coastal Karnataka tradition of slush-paddy field racing (two buffalo pairs through 130-140m water tracks) opens its Nov-Mar circuit. Weekend events at Moodbidri, Karkala, Venoor (verify schedule on kambala.in). St Mary''s Island ferry at full operations (₹450 return, last return 4pm).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('udupi', 12, 5, 'go',
  'Peak season. 22-31C dry. Christmas-NYE rates 2x. Kambala weekends. Lock beds 6-8 weeks ahead.',
  'December is when Udupi runs at full capacity. Christmas-NYE rates 2x normal. Krishna Matha at peak December pilgrim flow ahead of January Paryaya bookings opening. Kambala buffalo races at Moodbidri-Karkala weekend events. Lock heritage beds 6-8 weeks ahead.',
  NULL,
  'December in Udupi is the operational peak heading into the January Paryaya pilgrimage. Daytime 23-31C, nights 22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2x the November baseline: Paradise Isle Malpe ₹6-9k, Karavali ₹5-7k, town hotels ₹3.5-5k. Sri Krishna Matha (1238 CE Madhvacharya foundation, current Sri Krishnapura Matha Paryaya tenure handing over to Sri Adamaru Matha on January 18, 2026 — verify against the official Krishna Matha calendar) at year-peak December pilgrim flow as the January Paryaya bookings open. Car Street pre-Paryaya processions begin from the last week. Kambala buffalo races weekend events at Moodbidri, Karkala, Venoor, Pilikula. Malpe Beach at peak swim weather — water 27C, no sea-state advisories. St Mary''s Island ferry (₹450 return, last return 4pm) book a day ahead through the weekend. Mitra Samaj (Car Street, 1920), Diana Hotel, Mahalaxmi, Saraswathi Hotel (the masala dosa origin claimant) all queue out at lunch and dinner. The eight ashta-matha annadana free-meal services run extended hours. Lock pilgrimage hotel beds 6-8 weeks ahead from October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
