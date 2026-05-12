-- Machilipatnam destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: machilipatnam

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 1, 5, 'go',
  'Peak Kalamkari-craft window. 19-29C, dry. Sankranti Jan 14-16. Pedana workshops at full tempo.',
  'January is when the Kalamkari-textile trip runs at year-best. Daytime 27-29C, nights 19-21C, sub-30mm rain. Pedana village (11km west — the workshop heartland, GI-tag block-printed Kalamkari) at peak production. Bandar Fort ruin walks comfortable.',
  NULL,
  'Machilipatnam in January is the version Kalamkari-textile collectors book first. Daytime 27-29C, nights 19-21C, rainfall under 30mm, humidity at 65 percent. The Pedana village workshops (11km west of central Machilipatnam — the GI-protected origin of block-printed, Persian-influenced Kalamkari) run at peak production through the wedding season; family-run units like Pedana Pithapuram Kalamkari and the GI Co-operative Society members welcome walk-in visitors 9am-5pm with 30-60 minute demonstrations of the block-print + natural-dye process (cotton soaked in buffalo-milk, hand-blocked with carved teak, dyed in pomegranate/madder/indigo over 14-21 days per piece). Sankranti (January 14-16, the Andhra harvest cluster — Bhogi, Sankranti, Kanuma, Mukkanuma) layers wedding demand on top of normal output. Bandar Fort (Dutch 1605, captured by the British East India Company in 1611 — the foundation of the Madras Presidency''s trade footprint) survives as ruin walks along the coast, walkable cleanly in January. Hotel inventory is thin — most travelers day-trip from Vijayawada (70km, 90-minute drive) or Vadarevu/Manginapudi Beach Resort (₹2,500-4,000).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 2, 5, 'go',
  'Driest stretch. 20-31C. Kalamkari workshop tours at peak. Manginapudi Beach walkable through afternoon.',
  'February holds January''s cleanliness. Rainfall under 15mm, daytime 29-31C, Pedana workshops still in wedding-season output. Vijayawada day-trip routing (70km via NH216) at full ease. Bandar Fort and Manginapudi Beach walkable through afternoon for the first/last comfortable time.',
  NULL,
  'February in Machilipatnam is the technical peak. Rainfall under 15mm, daytime 29-31C, nights 20-22C, humidity at 60 percent — the lowest of the year. Pedana Kalamkari workshops (11km west — the village holds 50+ active block-print units, GI tag awarded 2008) at full production tempo through the late-wedding-season window; collectors and dealers from Hyderabad, Bangalore and Delhi visit Tuesday through Saturday. Walk-in tour timing: 9-11am for the block-cutting and stamping phase, 2-4pm for the dye-vat and washing phase. Bandar Fort ruin walks (the Dutch-era 1605 footprint along the central coast) comfortable through the full day. Manginapudi Beach (10km east, the black-sand expanse where the British East India Company landed in 1611) walkable end-to-end. The 1864 Coringa Cyclone history — when a 40-foot storm surge killed 40,000+ along the coast — is the dark anchor that local museums and the Bandar Fort signage reference, a reminder of east-coast cyclone vulnerability. Hotel options remain thin: Vadarevu Beach Resort ₹2,500-3,500, Hotel Trishul (central) ₹1,800-2,500. Andhra meals: family-run Murali Cafe and Subbayya Gari Hotel for fish curry-rice ₹120-180.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 3, 4, 'go',
  'Last cool month. 23-33C. Kalamkari tours work mornings. Beach walks compress to dawn/dusk.',
  'March is the soft-landing month. Daytime climbs past 32C the last fortnight but Pedana workshop visits still work pre-11am cleanly. Manginapudi Beach walks compress to 6-9am and 5-8pm. Hotel rates ease 15 percent off February — last clean window before April.',
  NULL,
  'March in Machilipatnam is the transition month. Daytime 31-33C, nights 23-24C, humidity climbing to 70 percent, rainfall under 25mm. The Kalamkari workshop visits work cleanly 8am-noon — the dye-vat and washing phase moves to indoor shaded yards in the afternoon to protect the natural pigments from sun-bleach. Bandar Fort ruin walks compress to 6-10am and 5-8pm. Manginapudi Beach walking works 6-9am and 5-8pm only; the black sand absorbs heat heavily through afternoon. Sri Panduranga Swamy Temple morning darshan 5-11am is the cool-hour shape. The Vijayawada day-trip routing (70km NH216) holds at full ease — AC car retreat for the return leg. Hotel rates ease 15-20 percent off February: Vadarevu Beach Resort ₹2,000-3,000, Hotel Trishul ₹1,500-2,200. The Vijayawada hotel base (Novotel ₹6-8k, The Gateway ₹7-9k) ramps down to March mid-season rates too. The last clean-value window before the April-May heat-and-humidity dome forces the trip into endurance mode. Andhra fish-curry season at peak — coastal jeera-tamarind-chili curry against river-water rice.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 4, 3, 'wait',
  'Pre-monsoon heat. 26-36C, humidity 75 percent. Kalamkari workshop tours work 7-10am only.',
  'April pushes the trip narrow. Daytime 34-36C, humidity climbing to 78 percent. Pedana workshops still produce but tours collapse after 10am. Manginapudi Beach walks impossible 10am-5pm. October is dramatically cleaner — push the trip.',
  'April pushes Machilipatnam into pre-monsoon stress. Daytime 34-36C, humidity 75-78 percent, sea breeze unreliable until 5pm. Kalamkari workshop tours compress to 7-10am only. Manginapudi Beach walks unsafe under midday sun. October-March is dramatically better.',
  'April in Machilipatnam is when the Kalamkari-textile trip narrows to early morning and evening. Daytime 34-36C, nights 26-27C, humidity 75-78 percent, sea breeze starts only after 5pm. Pre-monsoon thunderstorms hit the last fortnight — short violent squalls that drop temperatures 4-5 degrees temporarily but raise humidity to 88 percent. Pedana workshop visits work as 7-10am windows only — the dye-vat work continues through afternoon but stays indoor. Bandar Fort ruin walks impossible 10am-5pm. Manginapudi Beach walks compress to 6-9am and 6-8pm; the black sand surface temperature exceeds 50C through midday. AC retreat options are thin — Hotel Trishul lobby, family cafes, the air-conditioned Co-operative Kalamkari showroom in Pedana. Hotel rates run 25-30 percent below February: Vadarevu Beach Resort ₹1,500-2,500, Hotel Trishul ₹1,200-1,800. Weekday occupancy under 50 percent. The Vijayawada-Pedana day-trip routing in AC car is the only viable shape — 8am Vijayawada departure, 9:30am Pedana, 12:30pm return. October-March is the proper window for this craft trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 5, 2, 'wait',
  'Peak heat. 27-37C, humidity 82 percent. Pre-monsoon cyclone-cell risk on the Krishna delta coast.',
  'May functions only for craft buyers visiting Pedana on a single-day AC-car routing. Pre-monsoon thunderstorms third week onward. Asani Cyclone hit AP coast May 2022 — IMD watch mandatory. Beach trip impossible.',
  'May in Machilipatnam pairs peak humidity with the pre-monsoon cyclone-cell risk window on the Krishna delta. Pedana workshop tours work only 7-9am. Manginapudi Beach walks unsafe. October is dramatically better — push the trip.',
  'May in Machilipatnam is the closing month before the southwest monsoon arrives early June. Daytime 35-37C, humidity 82 percent, sea breeze unreliable. Pre-monsoon thunderstorms hit the third and fourth week — short squalls that drop temperatures 4-5 degrees temporarily but raise humidity to 90 percent. The pre-monsoon cyclone risk window (Bay of Bengal early cyclogenesis) is small but present — Asani made landfall along the AP-Odisha coast on May 11, 2022, brushing the Krishna delta. IMD watch via mausam.imd.gov.in is standard practice. Pedana workshop tours work only 7-9am — collectors who must visit do a single AC-car day from Vijayawada with the Co-operative showroom (air-conditioned) as the anchor and 1-2 family unit visits before 10am. Manginapudi Beach unusable through midday. Hotel rates at year-low: Vadarevu Beach Resort ₹1,200-1,800, Hotel Trishul ₹900-1,400. The trip you came for — craft visits at production tempo, fort-and-beach walking — is essentially closed except in the dawn-window. Push to late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 6, 2, 'wait',
  'SW monsoon arrives. 26-33C, 150-200mm. Krishna delta wets out. Kalamkari natural-dye work pauses.',
  'June is monsoon arrival on the AP east coast — Krishna delta catches the SW monsoon''s weaker northward arm (150-200mm vs Kerala''s 600+). Pedana workshops continue dry-process work (block-cutting, finishing) but the dye-vat and outdoor sun-bleach steps pause through July-Aug.',
  'June is the SW monsoon arrival without the upside — the natural-dye Kalamkari work pauses through monsoon (sun-bleach and washing phases need dry weather). October delivers a cleaner craft trip.',
  'June in Machilipatnam is the SW monsoon arrival point on the Krishna delta. The southwest current hits the AP coast around June 1-5 — IMD declares formal monsoon onset annually. Rainfall jumps from May''s 60mm to 150-200mm across 14-16 wet days; the Krishna delta sits on the SW monsoon''s weaker northward arm. Daytime 30-33C feels mild against May but 88 percent humidity and intermittent sustained downpours close down the beach trip and pause the outdoor dye-vat phase of Kalamkari production. Pedana workshops continue dry-process work — block-cutting, stamping, and finishing — through the indoor sheds, but the multi-day natural-dye fixation and sun-bleaching steps that give Pedana Kalamkari its colour-saturation pause through mid-June to early September. Workshop visits still possible 9am-noon in monsoon windows. Bandar Fort walks rain-interrupted. Manginapudi Beach near-empty. Hotel rates at year-low: Vadarevu Beach Resort ₹1,200-1,800, Hotel Trishul ₹900-1,400. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 7, 1, 'skip',
  'Peak SW monsoon. 26-31C, 200-250mm. Beach trip closed. Kalamkari dye-work paused. Workshop tours minimal.',
  NULL,
  'July is the wettest stretch on the Krishna delta coast. Rainfall 200-250mm across 17-20 wet days. Kalamkari outdoor dye-and-bleach work paused. Beach walks impossible. The craft trip and the heritage walks both fail. Skip.',
  'July in Machilipatnam is monsoon at its operational worst. Rainfall averages 220mm across 17-20 wet days, often as sustained 6-12 hour downpours. The Krishna delta floods seasonally — agricultural fields hold water, the canal network runs high, road access to Pedana from the city centre slows to 1.5x normal travel time. Kalamkari workshops continue indoor-only operations but the dye-vat and sun-bleach steps that define the multi-day natural-pigment Kalamkari process are paused. Workshop tours minimal — most family units run reduced staff. Bandar Fort ruin walks impossible. Manginapudi Beach unusable. Hotel rates at year-low: Vadarevu Beach Resort ₹1,000-1,500, Hotel Trishul ₹800-1,200. The trip you came for — Pedana production tempo, Manginapudi beach walks, the British East India Company history along the coast — is functionally closed. Cyclone-track watch via mausam.imd.gov.in continues. Wait for late October. The next clean window is October 15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 8, 1, 'skip',
  'Monsoon continues. 26-31C, 200-250mm. Krishna delta floods. Workshop tours and beach trip closed.',
  NULL,
  'August holds July''s pattern. 200-250mm rain across 17-20 wet days. The trip stays closed. Kalamkari dye-work paused through the month. Wait for October. Hotel rates at year-low but the trip shape collapses.',
  'August in Machilipatnam stays in monsoon mode with the southwest current still active across the Krishna delta. Rainfall 200-250mm across 17-20 wet days, daytime 28-31C, humidity 87 percent. The delta-flood pattern continues — agricultural fields, canal network and the Pedana road continue running high. Kalamkari outdoor work remains paused; workshop tours minimal. Beach walks at Manginapudi unsafe. Bandar Fort rain-interrupted. Hotel rates at year-low: Vadarevu ₹1,000-1,500, Hotel Trishul ₹800-1,200. Most travelers planning this craft trip wait until mid-October. The 1864 Coringa Cyclone history — a 40-foot storm surge that killed 40,000+ along the AP coast — sits as a permanent reminder of east-coast cyclone vulnerability and informs why Andhra coastal towns retain low-rise construction relative to Vizag or Vijayawada. Cyclone-track watch via mausam.imd.gov.in continues — September-October is the peak Bay of Bengal cyclone window. The next clean window is October 15 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 9, 2, 'wait',
  'SW monsoon retreat starts. 25-31C, 150-200mm. Kalamkari outdoor work resumes second half. Cyclone watch.',
  'September is the recovery month. SW monsoon retreats through the second half (around Sep 25-30 east-coast withdrawal). Kalamkari outdoor dye-and-bleach work resumes by late September. But Sep-Oct is the peak Bay of Bengal cyclone window — IMD watch mandatory.',
  'September is on the trickle back but caught in the monsoon-retreat overlap with peak Bay of Bengal cyclone formation. Hudhud-class risk is the historic baseline (October-class storms can form mid-September). October 15 onward is dramatically cleaner.',
  'September in Machilipatnam is the trickle back without full safety yet. Rainfall drops to 150-200mm across 13-15 wet days, mostly first half. The southwest monsoon retreats from the AP coast around September 25-30 (IMD declares formal withdrawal). But September-October is the peak Bay of Bengal cyclone season — historic east-coast storms have formed mid-September in modern record. The Pedana Kalamkari outdoor dye-and-bleach work resumes through the second half — Tuesday-Saturday workshop tours return to 9am-noon viability. Bandar Fort ruin walks rain-interrupted in the first half. Manginapudi Beach returns to walkability second half. Hotel rates climb 15 percent versus August lows but remain 40-45 percent below January peak: Vadarevu ₹1,400-2,000, Hotel Trishul ₹1,000-1,500. Cycle call: a 2-day Pedana-and-Bandar visit late September works for monsoon-tolerant craft buyers, but the October 15 onward window is materially cleaner and brings the production tempo back to wedding-season output.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 10, 4, 'go',
  'Season opens. 22-30C. Cyclone-watch first fortnight. Kalamkari production returns to wedding-season tempo.',
  'October is the season opener. First 10-15 days carry the Bay of Bengal cyclone risk (Hudhud anniversary Oct 12); from October 15 onward, Pedana workshops back to full production for the December-January wedding peak. Hotel rates 30 percent below January.',
  NULL,
  'October in Machilipatnam is the proper return to coherent. Rainfall drops to 100-150mm with the bulk falling in the first ten days; from October 15 onward Machilipatnam flips into clean Kalamkari-and-coast mode. Daytime 28-30C, humidity falling from 80 to 72 percent. The first fortnight carries the Bay of Bengal cyclone risk — Hudhud landed on the AP coast at Vizag on October 12, 2014; Phailin hit Odisha-AP coast October 12, 2013 — so IMD watch via mausam.imd.gov.in is mandatory through October 5-20. Beyond that, Pedana workshops return to full wedding-season production tempo through November-January cycle. The natural-dye outdoor processes — sun-bleach, multi-day pomegranate/madder fixation, river-water washing — resume at full pace. Workshop tour timing 9-11am and 2-4pm both productive. Bandar Fort ruin walks return to walkability. Manginapudi Beach walks resume. Hotel rates run 25-30 percent below January peak: Vadarevu ₹1,800-2,500, Hotel Trishul ₹1,400-1,800. Strong call for craft buyers and first-time visitors who want production-tempo Pedana minus the December-January wedding-week crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 11, 5, 'go',
  'Peak window opens. 20-29C, sub-50mm rain. Karthika Masam. Wedding-season Kalamkari at full tempo.',
  'November is the year''s second-peak month. Rainfall under 50mm, full Kalamkari production at Pedana, beach-and-fort walking weather. Karthika Pournami brings deepam lighting at Sri Panduranga Swamy. Hotel rates 25 percent below December-January.',
  NULL,
  'November in Machilipatnam is the year''s second-peak month behind January. Rainfall under 50mm, daytime 27-29C, sea breeze cooling evenings to 21-22C, humidity dropping below 70 percent. The Bay of Bengal cyclone risk falls sharply after October 25. Pedana Kalamkari workshops at full wedding-season production tempo — November-January is when the multi-day natural-dye Kalamkari saris and dupattas are produced for the December wedding cluster. Workshop visits cleanest mid-week (Tuesday-Thursday); weekend visits collide with collector and dealer rounds from Hyderabad and Bangalore. Bandar Fort ruin walks comfortable through the full day. Manginapudi Beach (10km east, black-sand crescent) walkable end-to-end. Karthika Masam (mid-November to mid-December) brings mass deepam lighting at Sri Panduranga Swamy Temple; Karthika Pournami (full moon, falls mid-month) the peak night. Hotel rates climb to 80 percent of January peak: Vadarevu ₹2,000-3,000, Hotel Trishul ₹1,500-2,200. The Vijayawada base option remains strong — Novotel ₹6-8k, The Gateway ₹7-9k — with 90-minute drive both ways for a Pedana day trip.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'machilipatnam', 12, 5, 'go',
  'Peak season. 19-28C, dry. Christmas-NYE rates 1.5-2x. Kalamkari production at year-peak for wedding-season.',
  'December is when Machilipatnam-via-Pedana runs at full capacity. Kalamkari production at year-peak for the wedding season. Rainfall under 25mm. Christmas-NYE rates lift 1.5-2x at Vadarevu and Vijayawada base hotels. Watch late-Dec cyclone outliers (Michaung 2023).',
  NULL,
  'December in Machilipatnam is the operational peak for the Kalamkari craft trip. Daytime 26-28C, nights 19-20C, rainfall under 25mm. Pedana workshops at year-peak production for the December-January wedding cluster — every active block-print unit running 7-day weeks through the month. Workshop tour density highest Tuesday-Friday 9-11am and 2-4pm; Saturdays heavy with Hyderabad-Bangalore dealer rounds. Recent late-season cyclones — Mandous (December 9-10, 2022, hit Mahabalipuram and brushed Chennai); Michaung (December 5-6, 2023, made landfall near Nellore as severe cyclonic storm) — are reminders that Bay of Bengal cyclogenesis extends into early December. IMD watch via mausam.imd.gov.in through the second week is standard practice. Beyond that, Bandar Fort ruin walks, Manginapudi Beach (with the British East India Company landing-history signage along the dunes), Sri Panduranga Swamy Temple morning darshan all at peak. The first three weeks of December are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
