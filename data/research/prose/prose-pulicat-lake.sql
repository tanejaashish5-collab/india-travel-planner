-- Pulicat Lake destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: pulicat-lake

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 1, 5, 'go',
  'Peak flamingo window. 19-29C. 30,000-50,000 greater + lesser flamingos on the AP-TN lagoon.',
  'January is the flamingo-counting month at Pulicat. Greater + lesser flamingos arrive in October-November, build through December, peak January. APFD boat trips from Sullurupeta and Vakadu run dawn. Sub-30mm rain, no humidity stress. Sriharikota visible across the barrier island.',
  NULL,
  'Pulicat Lake in January is the version migratory-bird counters book first. Daytime 27-29C, nights 19-21C, rainfall under 30mm, humidity at 65 percent. The 759 sq km brackish lagoon — India''s second-largest after Chilika, larger half in AP (Nellore district), narrower TN side reaching Pulicat town — holds 30,000-50,000 flamingos through January: greater flamingos (Phoenicopterus roseus, the larger pink-and-grey species) plus lesser flamingos (Phoeniconaias minor, the smaller intensely-pink species), with the densest concentrations along the Vakadu-Sullurupeta and Atakanitippa-Irukkam stretches on the AP side. AP Forest Department guided boat trips from Sullurupeta (₹500-800 per head shared, ₹2,500-4,000 private) run dawn 6-9am — flamingos feed in shallows at low tide. Northern shoveler, painted stork, spot-billed pelican, grey heron round out the 100+ migratory species count. The Pulicat Lake Bird Sanctuary (153 sq km, established 1976) on the AP side has the larger viable boat zones. Hotel options thin — most travelers day-trip from Chennai (60km), Nellore (45km), or stay basic at Sullurupeta family lodges ₹800-1,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 2, 5, 'go',
  'Flamingo peak holds. 20-31C. 30,000-40,000 birds through mid-month. Cleanest weather, lowest humidity.',
  'February holds the January flamingo peak. Counts taper to 30,000-40,000 through mid-month, drop sharply in March as departures begin. Boat trips dawn, sub-20mm rain. Lowest humidity of the year. Sriharikota launches occasional.',
  NULL,
  'February in Pulicat Lake is the technical peak for the bird trip. Rainfall under 20mm, daytime 29-31C, nights 20-22C, humidity at 60 percent — the lowest of the year. Flamingo counts hold at 30,000-40,000 through mid-month before tapering — by the last week of February some greater flamingos begin the northward departure for breeding-ground migration toward Kutch, Sambhar Lake and central Asian summer grounds. The lesser flamingos hold through to mid-March. AP Forest Department dawn boat trips from Sullurupeta and Vakadu (6-9am, ₹500-800 per head shared) run at peak access. Painted storks, spot-billed pelicans, northern shoveler, garganey, common teal and grey heron round out the count — the ebird checklist for Pulicat AP runs 100+ species in February. ISRO Satish Dhawan Space Centre at Sriharikota typically has 4-8 PSLV/GSLV launches scheduled annually; February launches occasional. Hotel options remain thin — day-trip from Chennai (60km, 90 minutes) or Nellore (45km, 75 minutes) is the standard pattern. Sullurupeta family lodges and Nellore highway hotels (Sai Sadan, ITC-affiliate options ₹2,000-3,500) the closest options.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 3, 3, 'wait',
  'Flamingo departures. 23-33C. Counts drop 30,000 → 5,000. Heat builds. Bird trip ends mid-month.',
  'March is the flamingo-departure month. Counts drop from 30,000 mid-month to 5,000 end-of-month as greater flamingos head north. Lesser flamingos hold longer. Lagoon recedes, mosquito load climbs. Bird trip effectively ends by month-end.',
  'March is when the flamingo bird trip ends. Counts collapse mid-month onward. Lagoon water recedes through April-October. Heat (33-35C) and humidity (75 percent) make boat trips uncomfortable. Wait for November.',
  'March in Pulicat is when the flamingo trip ends. Counts drop from 30,000 in the first week to 5,000 by the last — greater flamingos depart for breeding grounds across Kutch, Sambhar Lake and central Asian summer wetlands. Lesser flamingos hold longer but disperse to smaller feeding waters. Daytime 31-33C, nights 23-24C, humidity climbing to 70 percent, rainfall under 30mm. AP Forest Department boat trips still run dawn 6-9am but the species density falls sharply. The lagoon water level begins receding through April-October as the northeast-monsoon water (Oct-Dec) gets drawn down by evaporation and barrier-island sandbar shifts close the lake-sea inlets. Mosquito load climbs through March-October — repellent and long-sleeves mandatory at dawn. Hotel rates ease 20 percent off February: Sullurupeta lodges ₹600-1,200, Nellore highway hotels ₹1,500-2,500. The next viable flamingo window is November onward. Lagoon visits in April-October work only for completionists — most of the lagoon is closed-water sandflat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 4, 1, 'skip',
  'Off-season. 26-36C. Flamingos gone. Lagoon receding. Boat trips closed. Bird trip impossible.',
  NULL,
  'April is full off-season at Pulicat. Flamingos have departed. The lagoon water recedes sharply through summer — large stretches become sandflat. Mosquito load high. Boat trips closed. The bird-watching trip Pulicat is built for is functionally impossible.',
  'April in Pulicat is full off-season. Flamingos have departed for their breeding-ground migration; only resident birds (painted storks, herons, kingfishers) remain. Daytime 33-36C, nights 26-27C, humidity 75 percent, sea breeze unreliable. The lagoon water recedes through April-October — barrier-island sandbar dynamics close the Bay of Bengal inlets, evaporation drops lake levels, large stretches turn to sandflat and salt-pan. Mosquito load high through dawn-and-dusk windows. AP Forest Department boat trips suspended for the season — the operational shape requires water-level above a threshold that off-season summer doesn''t hold. The Pulicat Lake Bird Sanctuary main entry stays open for academic and APFD-research access but tourist tour-boats don''t run. ISRO Satish Dhawan Space Centre at Sriharikota continues year-round launches but visitor-gallery access is launch-day-only with 4-6 week advance booking. Hotel rates near year-low: Sullurupeta family lodges ₹500-900. The trip you came for — flamingo counts, migratory waterbirds, the cinematic dawn-boat over the lagoon — is functionally closed. Wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 5, 1, 'skip',
  'Off-season peak heat. 27-37C. Flamingos absent. Lagoon at year-low. Cyclone-cell pre-monsoon risk.',
  NULL,
  'May is full off-season. Flamingos absent. Lagoon at year-low water. Pre-monsoon cyclone-cell risk (Asani May 2022). Boat trips closed. Bird trip impossible.',
  'May in Pulicat stays in off-season mode. Flamingos and migratory waterbirds entirely absent. Daytime 34-37C, humidity 78 percent, sea breeze unreliable. The lagoon water level at year-low — barrier-island sandbar formation closes Bay of Bengal inlets through summer; the lake becomes a hypersaline sandflat-and-mudpan landscape with isolated water pockets that hold only resident herons, kingfishers, white-bellied sea eagles. Pre-monsoon thunderstorms hit the third and fourth week. Asani Cyclone made landfall on the AP-Odisha coast May 11, 2022, pulling some moisture to the Pulicat-Sriharikota corridor. IMD watch via mausam.imd.gov.in is standard practice. AP Forest Department boat trips remain suspended. ISRO Sriharikota visitor-gallery access launch-day-only with advance booking; broader Sriharikota Range tours not publicly accessible. The trip you came for — flamingos, migratory waterbird density, dawn boat-counts — is functionally closed. Wait for November onward. Day trips from Chennai or Nellore exist for the salt-pan landscape interest but the bird-watching purpose Pulicat was visited for is absent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 6, 1, 'skip',
  'Off-season monsoon. 27-34C. Lagoon refilling. Birds absent. Boat trips closed.',
  NULL,
  'June is off-season transitioning. SW monsoon edges to AP coast (200-250mm) refilling the lagoon. Flamingos absent — they''re at breeding grounds. Boat trips closed. Skip.',
  'June in Pulicat is the transition month from sandflat-summer to monsoon-refill. The southwest monsoon arrives on the AP coast around June 1-5; over June-July the lagoon starts to refill through both rainfall (200-250mm) and the seasonal reopening of barrier-island inlets as the sea state changes. Daytime 30-34C, humidity 80 percent. Migratory waterbirds entirely absent — flamingos at their summer breeding grounds across Kutch, Sambhar, and central Asia. AP Forest Department boat trips closed through monsoon. The Pulicat Lake Bird Sanctuary main entry stays open for academic and APFD-research access but tour boats don''t run. ISRO Sriharikota continues year-round launches with visitor-gallery access launch-day-only. Hotel options remain thin: Sullurupeta family lodges ₹500-900, Nellore highway hotels ₹1,300-2,000. The Pulicat trip is fundamentally a November-February bird-window trip — June through October sits as the lagoon-refill-and-pre-flamingo lead-up. Wait for late November when flamingo counts cross 10,000 and the dawn-boat trip turns back on.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 7, 1, 'skip',
  'Monsoon. 26-32C, 150-200mm. Lagoon refilling. Birds absent. Boat trips closed.',
  NULL,
  'July is monsoon. 150-200mm rain refills the lagoon. Birds absent. Boat trips closed. Skip. Hotel rates at year-low but the trip shape collapses. The October-March window is dramatically better.',
  'July in Pulicat continues the monsoon-refill phase. Rainfall 150-200mm across 14-16 wet days, daytime 28-32C, humidity 85 percent. Lagoon water level rising steadily through July-September as both rainfall and seasonal Bay of Bengal inlet reopenings refill the 759 sq km lagoon basin. Migratory waterbirds entirely absent — flamingos remain at summer breeding grounds, monsoon migration to Pulicat doesn''t begin until late October. AP Forest Department boat trips remain closed through monsoon. The Pulicat Lake Bird Sanctuary main entry stays open for academic and research access. Resident species (painted storks, herons, kingfishers, sea eagles) remain visible from shore-walks at Pulicat town (TN side) and Sullurupeta (AP side) but the dawn-boat density that makes the trip cinematic is absent. ISRO Sriharikota continues launches year-round with visitor-gallery access launch-day-only by advance booking. Hotel options thin: Sullurupeta family lodges ₹500-900, Nellore highway hotels ₹1,300-2,000. Skip — wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 8, 1, 'skip',
  'Monsoon. 26-32C, 150-200mm. Lagoon refilling. Birds absent. Boat trips closed.',
  NULL,
  'August holds July''s pattern. Rain refills the lagoon. Birds absent. Boat trips closed. Skip. Hotel rates at year-low but the trip shape collapses. The October-March window is dramatically better.',
  'August in Pulicat continues the southwest monsoon refill phase. Rainfall 150-200mm across 14-16 wet days, daytime 28-32C, humidity 85 percent. Lagoon water level continues to rise — the 759 sq km basin spans through Nellore district (AP) and Tiruvallur district (TN) with the larger AP portion holding most of the migratory-bird habitat. Migratory waterbirds remain entirely absent — flamingos are at summer breeding grounds. AP Forest Department boat trips remain closed. The Pulicat Lake Bird Sanctuary main entry stays open for academic access. Resident species visible from shore but the cinematic dawn-boat count Pulicat is built for is absent. ISRO Sriharikota launches continue year-round with visitor-gallery access launch-day-only. Hotel options thin: Sullurupeta family lodges ₹500-900, Nellore highway hotels ₹1,300-2,000. The NE monsoon (Pulicat''s primary rain source) hits October-December, not August — the lagoon refill is more from the weaker SW arm right now. Skip — wait for November when flamingo counts cross 10,000.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 9, 1, 'skip',
  'Late SW monsoon. 26-32C, 100-150mm. Lagoon near full. Birds absent. Cyclone-watch begins.',
  NULL,
  'September is late SW monsoon. Lagoon near full. Migratory birds still absent — they arrive late October-November. Cyclone watch active. Skip. Hotel rates at year-low but the trip shape collapses.',
  'September in Pulicat is the late-monsoon transition. Rainfall 100-150mm across 11-13 wet days, daytime 28-32C, humidity 80 percent. Lagoon water level near full as combined SW monsoon-and-inlet-refill cycle completes. The southwest monsoon retreats from the AP coast around September 25-30. Migratory waterbirds remain absent — the first flamingo flights to Pulicat typically arrive late October as northward-bound flocks begin to settle into the lagoon. AP Forest Department boat trips remain suspended pending water-level safety review for the season opening. The Pulicat Lake Bird Sanctuary main entry stays open for academic and research access. September-October is the peak Bay of Bengal cyclone window — Hudhud-class storms (Hudhud landed Vizag Oct 12, 2014; Phailin hit Odisha-AP coast Oct 12, 2013) can form starting mid-September. IMD watch via mausam.imd.gov.in standard. Hotel options thin: Sullurupeta family lodges ₹500-900. Skip — wait for November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 10, 2, 'wait',
  'NE monsoon arrives. 24-31C, 200-300mm. Lagoon full. First flamingos late month. Boat trips return.',
  'October is the NE monsoon arrival. 200-300mm rain through the month. Lagoon at full level. First flamingo flights arrive late October — counts under 1,000. Cyclone watch active (Hudhud Oct 12, 2014). Boat trips return cautiously last week. Wait for November.',
  'October is when the lagoon refills but the flamingo numbers haven''t arrived. First flights begin late month — counts under 1,000. Cyclone watch through first three weeks (Hudhud Oct 12, 2014). November delivers materially better counts and weather.',
  'October in Pulicat is the NE monsoon arrival and the lagoon-refill peak. Rainfall 200-300mm — the Pulicat region catches the NE monsoon (the eastern peninsular monsoon system, Oct-Dec, which is Pulicat''s primary rain source, not the SW). Lagoon water level fills to the year-high mark by mid-month. First flamingo flights arrive late October — counts typically remain under 1,000 through the month, with the major build-up in November. Daytime 27-31C, humidity 80 percent, intermittent heavy rainfall and Bay of Bengal cyclone-cell risk through October 5-25 (Hudhud landed Vizag Oct 12, 2014; Phailin hit Odisha-AP coast Oct 12, 2013). AP Forest Department boat trips return cautiously the last week as water-level and cyclone-watch stabilise. The Pulicat Lake Bird Sanctuary main entry runs full hours for research and academic access. Hotel options thin: Sullurupeta family lodges ₹600-1,200, Nellore highway hotels ₹1,500-2,500. Strong call to wait for November — counts climb 5x through the month transition.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 11, 5, 'go',
  'Peak flamingo arrival window. 22-30C. 10,000-20,000 flamingos by mid-month. Boat trips at full schedule.',
  'November is when the flamingo trip turns on. Counts climb from 1,000 first week to 15,000-20,000 mid-month and 20,000-30,000 by end. NE monsoon residue first half. Boat trips full schedule. Best month for first-time visitors — counts good, crowds thin.',
  NULL,
  'November in Pulicat is when the flamingo trip turns properly on. Counts climb from under 1,000 in the first week to 15,000-20,000 by mid-month and 20,000-30,000 by month-end as the major northward-stop flocks settle into the lagoon. Daytime 27-30C, nights 22-23C, humidity falling from 80 to 72 percent. NE monsoon residue continues in the first fortnight (100-150mm rainfall, mostly concentrated wet days), then easing sharply through the second half. The Bay of Bengal cyclone risk falls after October 25. AP Forest Department dawn boat trips from Sullurupeta and Vakadu return to full schedule (6-9am, ₹500-800 per head shared, ₹2,500-4,000 private). The Pulicat Lake Bird Sanctuary access full. Painted storks, spot-billed pelicans, northern shoveler, garganey, common teal, grey heron and the flamingo species mix all increasing through the month. ISRO Sriharikota launches scheduled — November-December typically sees 2-4 PSLV launches; visitor-gallery access by advance booking. Hotel options: Sullurupeta lodges ₹700-1,400, Nellore highway hotels ₹1,800-3,000. Strong call for first-time visitors — counts good, weather peak, crowds thin.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'pulicat-lake', 12, 5, 'go',
  'Flamingo peak builds. 20-29C. 25,000-40,000 birds by end-month. Late-Dec cyclone outliers possible.',
  'December is when the flamingo count rises to year-peak — 25,000 first week to 40,000 by end-month. Christmas-NYE boat-trip bookings tighten. Watch late-Dec cyclone outliers (Michaung Dec 2023 made landfall near Nellore).',
  NULL,
  'December in Pulicat is when the flamingo count builds to year-peak. Counts climb from 25,000-30,000 in the first week to 35,000-45,000 by month-end as the migration wave completes. Daytime 27-29C, nights 20-21C, humidity 70 percent, rainfall under 50mm. The Bay of Bengal cyclone risk drops sharply but late-season outliers exist — Mandous (December 9-10, 2022, hit Mahabalipuram and brushed Chennai); Michaung (December 5-6, 2023, made landfall near Nellore as severe cyclonic storm, directly affecting the Pulicat-Sriharikota corridor) — are reminders that December cyclogenesis happens. IMD watch via mausam.imd.gov.in through the second week is standard practice. AP Forest Department dawn boat trips at full tempo. The Pulicat Lake Bird Sanctuary at peak access. ISRO Sriharikota launches scheduled through the month with visitor-gallery access launch-day-only by advance booking. Christmas-NYE corridor (Dec 22-Jan 5) sees boat-trip bookings tighten — book 2-3 weeks ahead via Sullurupeta APFD office. The Chennai day-trip option (60km, 90 minutes, AC car ₹2,500-3,500 return) is the standard pattern for first-timers.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
