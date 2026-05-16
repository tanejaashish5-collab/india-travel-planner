-- Colva & Benaulim destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S13 Goa batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: colva-benaulim

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 1, 5, 'go',
  'Peak South Goa luxury belt. 18-31C, dry, sea calm. Margao 7km. Hotel-strip at full capacity.',
  'January is when the Colva-Benaulim luxury-resort belt runs at full tilt. Taj Exotica Benaulim (₹40k+), Radisson Blu Cavelossim, Alila Diwa, Park Hyatt Arossim all sit at peak occupancy. Casa Sarita at Park Hyatt holds its 7-course tasting; Martin''s Corner runs its full 1990s-era live-music programme. Margao Konkan Railway hub is 7km — the trip works as a multi-base.',
  NULL,
  'Colva-Benaulim in January is the South Goa version Goans themselves go to. Daytime 22-31C, nights drop to 18-19C, sea at 25C, humidity below 65 percent. The 24km Salcete-coast beach belt — Colva, Benaulim, Varca, Cavelossim, Mobor, Betalbatim — is the resort circuit South Goa is built on, distinct from the Calangute-Anjuna domestic-tourist crowd up north. Casa Sarita at Park Hyatt Arossim runs its tasting menu (₹4,500-6,500/cover); Martin''s Corner Betalbatim (1992-founded, live music nightly 8pm-11pm) takes 7-day reservations during peak; Zeebop by the Sea Utorda runs Goan-fusion shacks year-round. Kebabs & Kurries at Taj Exotica Benaulim is the resort-belt''s steady kebab call. Stay rates: Taj Exotica from ₹40,000, Radisson Blu Cavelossim ₹15-25k, Alila Diwa Majorda ₹18-30k, Park Hyatt Arossim ₹20-35k. Margao Konkan Railway (KR1) station is 7km from Colva, 9km from Benaulim — Mumbai-Madgaon trains (Mandovi, Konkan Kanya) make the trip the most train-friendly Goa entry point.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 2, 5, 'go',
  'Driest month. 19-31C. Charter-tourist load eases mid-Feb. Hotel rates ease 15 percent.',
  'February is the cleanest of the cool months. Rainfall under 5mm, humidity 60 percent, charter-tourist groups (UK, Russia historically; Israel, Germany now) wind down their winter blocks by mid-month. Casa Sarita reservations free up to 3-day lead.',
  NULL,
  'February in Colva-Benaulim is the cleanest stretch of the year. Rainfall averages under 5mm, daytime 22-31C, sea at 24C, humidity 60 percent. Charter-tourist groups — historically the UK and Russia drove this stretch, now German, Israeli, and Eastern European blocks fill the resort belt — wind down their 14-day winter blocks by February 18-20. Casa Sarita reservations at Park Hyatt drop to 3-4 day lead from January''s 7-day. Hotel rates ease 12-15 percent versus January peak. Martin''s Corner stays packed Friday-Saturday but takes weekday walk-ins. The Salcete fishing-belt landings at Colva Beach (5-7am, behind the Sernabatim church) supply the resort kitchens — pomfret, kingfish, prawns at their year-cleanest. Spice Studio at Alila Diwa runs its modern-Goan tasting menu (₹3,800/cover). Goa Carnival float parades roll through Margao city across 3 days before Ash Wednesday — Colva sees the spillover only in evening shack-traffic. The 3km Benaulim-Cavelossim coast walk is at its best 4-6pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 3, 4, 'go',
  'Last cool window. 21-33C. Charter season ends. Hotel rates drop 25-30 percent.',
  'March extends the February experience minus the dry-air comfort. Charter-tourist season effectively ends by March 20; resort rates drop 25-30 percent versus February. Holi long weekend brings a domestic-tourist bump. Last comfortable month before April humidity sets in.',
  NULL,
  'March in Colva-Benaulim is the soft-landing month. Daytime 23-33C, humidity climbing toward 75 percent in the last fortnight, sea at 26C. Charter-tourist programmes end by March 18-20 as European return-flight schedules wind down; the resort belt drops 25-30 percent off February rates and weekday occupancy thins to 60-70 percent. Taj Exotica walk-in available Tuesday-Thursday; Radisson Blu Cavelossim drops walk-in rates to ₹14,000-16,000 from ₹20,000+. Holi long weekend (variable date, usually mid-March) brings a Goan and Mumbai domestic-tourist bump for 3-4 days; Colva Beach shacks pack 6pm-11pm. The Margao Friday Market off Holy Spirit Church Square is the year-best season-end shopping for Goan kitchen kit. Longuinhos at Margao (1950-founded, the Konkan-railway-station-side institution) is a workable lunch break en route. Last clean stretch before pre-monsoon heat compounds in April.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 4, 3, 'wait',
  'Pre-monsoon. 24-35C, humidity 75 percent. Resort pools take centre stage. Beach 11am-4pm collapses.',
  'April still functions for the AC-resort weekend — Taj/Hyatt/Alila run full pool-and-spa programmes, evenings stay pleasant, hotel rates 35 percent below February. Beach windows narrow to morning and post-5pm.',
  'April pushes the South Goa resort belt into pre-monsoon heat. Beach time collapses 11am-4pm, the 3km Benaulim-Cavelossim walk works only at the day''s edges, Sea at 28-29C is warm enough to remove the cooling-bath value. Better windows return in late October.',
  'April in Colva-Benaulim is the resort-pool-and-spa month. Daytime 25-35C, humidity 75 percent, sea at 28-29C — warm enough that the cooling dip is gone. The trip narrows to AC room, resort pool, evening shack hours, and the indoor restaurant circuit. Casa Sarita and Spice Studio still run full menus; Park Hyatt Arossim and Alila Diwa drop walk-in rates 30-35 percent versus February peak — Taj Exotica from ₹40,000 to ₹26,000-28,000. Power cuts run 2-4 hours afternoons; the resort belt has full inverter backup but the Colva and Benaulim village belt does not. Salcete-coast morning fishing landings ease (the smaller boats start staying ashore by April 25 ahead of monsoon licence cycle). Margao city continues to function fully — Holy Spirit Church (1675), Confraria Heritage Walk via Sat Burnzam Ghor, Largo de Igreja afternoon-cool walks. Tuesday-Thursday at the resorts is half-empty.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 5, 2, 'wait',
  'Peak heat. 26-37C, humidity 80 percent. Shacks dismantle May 31. First squalls late month.',
  'Early May still works for the resort-pool weekend; rates at year-low. Last 10 days bring SW-monsoon squalls and shacks pack up under Forest Department licence cycle. Beach trip dies; resort-only trip functions.',
  'May runs hot and sticky on the Salcete coast. Daytime 27-37C, humidity 80 percent, sea at 30C. Forest Department shack-licence ends May 31 — the 25+ shack kitchens along Colva-Benaulim-Cavelossim dismantle structures the last week of May. Pre-monsoon squalls from May 22 onward knock power 2-4 hours afternoons. Skip to October if comfort matters.',
  'May in Colva-Benaulim is when the trip compresses to its smallest viable shape. Daytime 27-37C, humidity 80 percent, sea at 30C, the Salcete-coast air thick from 9am to 7pm. Goa Forest Department shack-licence cycle ends May 31 — by the third week, the 25+ shack kitchens along Colva, Benaulim, Varca, Cavelossim and Mobor begin dismantling structures. The first SW-monsoon squalls arrive May 22-28: 30-50mm evening downpours, 2-4 hour grid power cuts. Resort rates at year-low — Taj Exotica walk-in at ₹22,000 (versus ₹40,000+ peak), Alila Diwa at ₹14,000-16,000, Radisson Blu Cavelossim at ₹10,000-12,000. The trip works only as a resort-pool, AC-restaurant, indoor-spa weekend; beach walks restricted to pre-9am and post-7pm. Margao city air-conditioning belt — Chef Fernando''s Nostalgia, the Forum Mall — handles mid-day. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 6, 1, 'skip',
  'SW monsoon onset. 25-31C, 600-800mm rain. Shacks shut, sea red-flag, beach dangerous. Skip.',
  NULL,
  'June is the southwest monsoon hitting South Goa at full strength. Shacks dismantled by Forest Department rule, swim restrictions enforced, the resort belt running skeleton operations. The trip you came for cannot happen.',
  'June in Colva-Benaulim is when the South Goa resort belt closes for tourist-purpose. The southwest monsoon arrives around June 10; rainfall jumps to 600-800mm across 18-22 wet days. The 25+ shack kitchens along the 24km Salcete coast are dismantled by Forest Department licence rule until October 1. Coast Guard red-flag swim restriction in force. Sea state hits 3-4m wave heights; rip currents on the Mobor estuary corner are dangerous. The major resorts (Taj Exotica, Park Hyatt Arossim, Alila Diwa, Radisson Blu Cavelossim) stay open but at 25-30 percent occupancy — primarily Indian-domestic monsoon-deal traffic. Rates at year-low — Taj Exotica from ₹15,000, Alila Diwa ₹9,000. Margao Konkan Railway hub continues as the inland-base alternative. Casa Sarita and Spice Studio run weekend-only kitchens. The next clean window is October 1, when the shack cycle reopens.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 7, 1, 'skip',
  'Peak monsoon. 24-29C, 900-1100mm rain. Beach off-limits. Resort belt at 20 percent occupancy. Skip.',
  NULL,
  'July is the wettest month — 900-1100mm rainfall, the Arabian Sea in active monsoon, the Salcete-coast beach economy on shutdown. Resort-pools open but the beach trip cannot happen. Wait for October.',
  'July in Colva-Benaulim is the year''s wettest stretch. Rainfall averages 900-1100mm across 25-27 wet days. Sea state hits 4-5m wave heights and Coast Guard red-flag swim restriction is enforced through Canacona station. The 25+ shacks along the Salcete coast remain dismantled. Resort occupancy drops to 20-25 percent — primarily monsoon-package Indian-domestic visitors and a thin trickle of European long-stay travellers. Taj Exotica walk-in at ₹13,000-15,000, Park Hyatt Arossim ₹11,000-13,000, Radisson Blu Cavelossim ₹7,000-9,000. The beach is genuinely off-limits — Forest Department signage, no shacks, no lifeguards. Daytime 25-29C feels mild but the constant rain and 90 percent humidity make outdoor sustainable activity impossible. Margao city operates fully — Holy Spirit Church mass continues, Longuinhos serves, Chef Fernando''s Nostalgia open Wed-Sun. The trip you came for does not work. October cleanest.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 8, 1, 'skip',
  'Monsoon continues. 24-29C, 700-900mm rain. Beach closed, resort skeleton. Skip.',
  NULL,
  'August holds the July pattern — heavy rain, beach access closed, resort belt at 25 percent occupancy. Independence Day weekend sends Mumbai surge to North Goa; Colva-Benaulim stays muted. Next clean window October 1.',
  'August in Colva-Benaulim holds July''s monsoon pattern with marginally fewer extreme-rain days. Rainfall 700-900mm across 22-25 wet days, daytime 24-29C, humidity at 90 percent. Coast Guard swim-flag stays red. The 25+ shack-zone empty under Forest Department licence cycle. Resort occupancy stays at 25-30 percent. Independence Day long weekend (August 15-17) brings a Mumbai-domestic surge to North Goa''s Calangute-Baga belt, but South Goa stays muted. Bonderam (Divar Island flag festival, 4th Saturday August) draws a Goan domestic day-trip crowd to Divar via the Old Goa ferry — unrelated to Colva-Benaulim trip. Casa Sarita reopens for weekend-only dinner service mid-month at Park Hyatt; Martin''s Corner runs Friday-Saturday only. The Margao base — Hotel Mandovi, Zion Goa — is a more functional inland call than the beach belt. Wait for October 1 shack-cycle reopening.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 9, 2, 'wait',
  'Monsoon retreating. 25-30C, 300-400mm rain. Shacks closed till Oct 1. Resort belt rebuilding.',
  'September is the recovery month with the gating constraint that Forest Department shack licences only reopen October 1. Resorts (Taj, Park Hyatt, Alila, Radisson) rebuild full operations between September 20 and October 1; rates at year-low for the early bookers.',
  'September is on the way back but South Goa''s shack-licence cycle holds shacks shut till October 1. Resort belt rebuilds slowly. Push to October — same weather, full shack tempo, only marginal rate climb.',
  'September in Colva-Benaulim is recovery month. Rainfall drops to 300-400mm, mostly the first fortnight. Coast Guard swim-flag flips to amber by September 20-22; full green takes another week. Daytime 25-30C, humidity easing toward 80 percent, sea state calming through the month. The Forest Department shack-licence cycle means kitchens stay shut till October 1 — there is no workaround. Resort belt rebuilds: Park Hyatt Arossim and Alila Diwa Majorda take walk-in bookings from September 20 at 40-45 percent below peak. Casa Sarita reopens its full tasting menu around September 25-28; Spice Studio matches. Salcete fishing fleet returns to full landings in the last week. Margao city has run full-tempo all monsoon. The Pitru Paksha period (variable, mid-Sept) tempers Indian domestic demand. Workable for an early-bird, low-pressure trip; October dramatically cleaner with two weeks of patience.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 10, 4, 'go',
  'Season opens. Shacks reopen Oct 1. 23-32C, 150-200mm rain. Resort rates 30-35 percent below Dec.',
  'October is the proper season opener. Forest Department shack-licence cycle opens October 1; 25+ shacks along Salcete-coast rebuild. Resort belt at full operational tempo. Rates 30-35 percent below December. Diwali week brings 5-day domestic bump.',
  NULL,
  'October in Colva-Benaulim is when the South Goa luxury belt returns to full-tempo. Goa Forest Department shack-licence cycle opens October 1; the 25+ shacks along Colva-Benaulim-Varca-Cavelossim-Mobor rebuild from monsoon storage and run full dinner service from October 5-8. Daytime 25-32C, rainfall 150-200mm — most in the first 10 days — humidity 75 percent and falling. Coast Guard swim-flag turns full green by October 12-15. Casa Sarita at Park Hyatt and Spice Studio at Alila Diwa reopen full menus from October 1. Martin''s Corner Betalbatim runs Friday-Sunday live music and Tuesday-Thursday weekday lull. Resort rates: Taj Exotica from ₹26,000, Alila Diwa ₹14,000-16,000, Park Hyatt Arossim ₹16,000-19,000, Radisson Blu Cavelossim ₹11,000-13,000 — all 30-35 percent below December peak. Diwali long weekend (variable, usually mid-Oct to early Nov) brings a 5-day domestic-tourist bump and a 25 percent rate climb during the window. The first three weeks of October are the smart traveller''s call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 11, 5, 'go',
  'Peak builds. 20-30C, rainfall under 30mm. Charter blocks arriving. Hotel rates climb 25 percent month-over-month.',
  'November is the proper return to high season. Charter-tourist groups (Israeli, German, UK) start their winter blocks from November 5-10. Hotel rates climb 25 percent across the month as Christmas-week travellers begin booking. Casa Sarita reservations tighten to 5-day lead.',
  NULL,
  'November in Colva-Benaulim is when the South Goa resort belt hits its high-season pattern. Daytime 22-30C, nights drop to 20-21C, rainfall under 30mm and almost all in the first week. Sea at 26C, swim conditions full-green. Charter-tourist blocks — Israeli winter holiday cohorts, German and UK 14-day operators — begin November 5-10 and progressively tighten resort availability. Rates climb 25 percent across the month. Taj Exotica from ₹28,000 (Nov 1) to ₹38,000 (Nov 30); Alila Diwa from ₹15,000 to ₹19,000. Casa Sarita reservation lead lengthens from 3 to 5 days; Spice Studio similar. Martin''s Corner books out Friday-Saturday 7-10 days ahead. Salcete-coast morning fishing landings (5-7am Sernabatim, Colva, Benaulim Vado) supply the resort kitchens with year-best pomfret and snapper. The 24km Salcete-coast walk (Colva to Mobor) is at peak photogenic 4-5:30pm. Strong call for first-time travellers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('colva-benaulim', 12, 5, 'go',
  'Peak season. 18-29C, dry. Christmas-NY drives rates 60-80 percent above November. Book 4 weeks ahead.',
  'December is the year''s most reliable South Goa luxury-belt window. Christmas-NY week (Dec 22 to Jan 5) drives rates 60-80 percent above November and books out the entire resort string 21-30 days ahead. Casa Sarita books 7-10 days ahead through Christmas week.',
  NULL,
  'December in Colva-Benaulim is operational peak. Daytime 22-29C, nights drop to 18-19C, sea at 25C, rainfall under 20mm. Christmas Eve at Holy Spirit Church Margao draws 4,000-6,000 worshippers; the 1675 baroque facade is at peak photogenic. Christmas-NY week (December 22 to January 5) drives resort rates 60-80 percent above November: Taj Exotica from ₹38,000 to ₹70,000+, Alila Diwa from ₹19,000 to ₹35,000, Park Hyatt Arossim from ₹19,000 to ₹38,000, Radisson Blu Cavelossim from ₹13,000 to ₹25,000. The full Salcete-coast resort string books out 21-30 days ahead from December 18 onward. Casa Sarita reservation lead stretches to 7-10 days through Christmas week; Spice Studio matches. Martin''s Corner Betalbatim books out 14 days ahead Friday-Saturday. NH66 South Goa traffic is at year-heaviest December 23-26 and Dec 30-Jan 1. The first three weeks of December run 30 percent cheaper at the same conditions; lock dates pre-December 20 if budget matters.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
