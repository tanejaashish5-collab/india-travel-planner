# Corrections auto-verify 2026-11-11

2 applied, 2 rejected, 18 held for re-check next run.

## loktak-lake: REJECT (200 Rejected)

both checks rejected: The new portal URL is official and live, but the page charges a fee (Temporary Permit for tourists is ₹100) and has a payment step, so 'free' is contradicted.
- permit_required: "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilp.nic.in — free." -> "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilponline.mn.gov.in — free."
- check permit_required: A REJECT (The new portal URL is official and live, but the page charges a fee (Temporary Permit for tourists is ₹100) and has a payment step, so 'free' is contradicted.); B REJECT (The official portal lists the tourist Temporary Permit at ₹100, so the claim that the ILP is free is contradicted. The new URL is correct, but the OLD text carried the same wrong fee and NEW does not fix it.); quotes confirmed 0/5

## bangus-valley: HOLD

notice_text: A HOLD, B HOLD, quotes 0/9
- notice_text: null -> "Bangus Valley is closed to tourists under a J&K LG Administration order in force since April 2025, extended to 31 December 2026. No tourist access is permitted regardless of season."
- notice_source_url: null -> "https://www.greaterkashmir.com/kashmir/2-years-on-kupwaras-bangus-valley-stays-shut-tourism-economy-suffers-12494255"
- check notice_text: A HOLD (A closure order running to 31-12-2026 is supported, but only by a news report (which spells it 'Bungus'), and the 'in force since April 2025', 'extended' and 'regardless of season' wording is unsupported. A February 2026 LG reopening order also complicates the history.); B HOLD (The Wire supports a closure order ending 31-12-2026 that lists Bungus Valley. The cited Greater Kashmir article contains no order or end date. 'In force since April 2025', 'extended' and 'regardless of season' are not supported, and the article's 'over two years' wording is inconsistent with an April 2025 start.); quotes confirmed 0/9

## mawlynnong: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- notice_text: null -> "Mawlynnong village is closed to day-trippers every Sunday from January 2026 (Village Dorbar decision). Restaurants, shops, and public toilets are shut on Sundays. Overnight guests are exempt."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/asia-cleanest-village-in-meghalaya-to-be-closed-to-tourists-on-sundays-enn26012903986"
- check notice_text: A APPROVE (Every claim matches the PTI/ETV Bharat report (29 Jan 2026), and search results from October 2026 say the Sunday closure is still enforced.); B APPROVE (Every claim matches the ETV Bharat report of the Dorbar statement. A November 2026 search found no reversal, and the rule has run since January 2026 with no end date.); quotes confirmed 7/7

## mon: HOLD

permit_required: A REJECT, B APPROVE, quotes 5/8
- permit_required: "Inner Line Permit (ILP) required for all Indian citizens. Apply at Dimapur/Kohima." -> "Inner Line Permit (ILP) required for all Indian citizens. Apply online at ilp.nagaland.gov.in (physical office applications discontinued from January 2025)."
- check permit_required: A REJECT (The online portal is supported, but 'physical office applications discontinued' is contradicted: an official Nagaland IPR release says Dimapur counters issue offline Tourist ILPs. The new text is therefore worse than the old 'Apply at Dimapur/Kohima'.); B APPROVE (The portal URL and the online-only switch are confirmed by the official portal, India Today NE and the Dimapur notification, so NEW is better than OLD. One caveat: sources say the ILP is required of non-residents, so 'all Indian citizens' is loose wording carried over from OLD. A narrow Dimapur exception for daily-wage labourers does not affect tourists.); quotes confirmed 5/8

## bhaderwah: HOLD

notice_text: A HOLD, B HOLD, quotes 0/11
- notice_text: null -> "Since July 2026, all trekking, hiking, and camping in Bhaderwah subdivision requires prior written permission from the Additional Deputy Commissioner. Order under Section 163 BNSS, effective 3 July 2026, until further notice. General tourism unrestricted."
- notice_source_url: null -> "https://kashmirobserver.net/2026/07/08/govt-makes-permission-mandatory-for-trekking-camping-in-bhadarwah/"
- check notice_text: A HOLD (The Section 163 BNSS order of 3 July 2026 and the written-permission requirement are supported. The article does not name the Additional Deputy Commissioner as the permission-granting authority (it says 'competent authority') and says nothing about general tourism being unrestricted.); B HOLD (The July 3 order exists and requires prior written permission. The source names only a 'competent authority', not the Additional Deputy Commissioner, and 'general tourism unrestricted' is not stated. A Section 163 BNSS order normally lapses after two months unless extended, and no extension was found, so 'until further notice' may be stale by 11 Nov 2026.); quotes confirmed 0/11

## bundi: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- nearest_airport: "Jaipur (210km) / Kota (35km)" -> "Jaipur — 210km"
- check nearest_airport: A APPROVE (Jaipur at 210 km is on a cited page, and Kota airport has had no scheduled service since 1997, so dropping it is accurate. The only caveat is that 'nearest' is not tested against Kishangarh, which one site lists at a similar distance.); B APPROVE (Kota airport has had no scheduled passenger flights since the late 1990s (AAI lists only non-scheduled VIP/medical flights), and Jaipur at 210 km is supported, so dropping Kota and keeping Jaipur is not worse than OLD.); quotes confirmed 6/6

## pahalgam: HOLD

notice_text: A HOLD, B APPROVE, quotes 8/17
- notice_text: null -> "Baisaran Valley within Pahalgam is closed to tourists under Anantnag district administration order (July 2026, no reopening date as of Oct 2026). Pahalgam town, Betaab Valley and Aru Valley are open with heightened security. Australia, US, UK and Canada maintain 'Do Not Travel' advisories for J&K."
- notice_source_url: null -> "https://kashmirobserver.net/2026/04/21/pahalgam-attack-one-year-on-memory-holds-tourists-return/"
- check notice_text: A HOLD (The Baisaran closure is backed by the official Anantnag notice, but the Betaab and Aru 'open' claim rests only on a travel blog, and I could not load the US or Australian advisory pages (403 and timeout). The UK and Canada pages say 'against all travel' and 'Avoid all travel', not the wording 'Do Not Travel' that NEW attributes to all four countries.); B APPROVE (Baisaran is on the Anantnag closed-destinations list dated 07-07-2026 with no reopening announced, Betaab and Aru are reported open with intensified security, and all four governments' J&K advisories are confirmed on their own pages; the only soft spot is that Aru/no-reopening rest on a travel-guide page rather than an official one.); quotes confirmed 8/17

## wayanad: HOLD

notice_text: A HOLD, B HOLD, quotes 0/6
- notice_text: "Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026." -> "Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026."
- notice_source_url: "https://www.onmanorama.com/news/kerala/2026/01/22/mundakkai-chooralmala-landslide-compensation-no-go-zone-land.html" -> "https://www.onmanorama.com/news/kerala/2026/10/25/meppadi-chooralmala-road-public-outrage-boils-over-amid-delays-in-reconstruction.html"
- check notice_text: A HOLD (NEW is identical to OLD. The No-Go Zone is supported, but nothing I read says it is closed to tourists, and I found no 2026 source saying Edakkal, Banasura Sagar and Chembra are open (only 2024 reopening reports and travel blogs).); B HOLD (NEW is identical to OLD, but neither cited Onmanorama page says the zone is closed to tourists, and I found no current official source that Chembra Peak is open (2026 sources conflict), so the 'open as of Aug 2026' claim is unsupported.); quotes confirmed 0/6

## khajuraho: HOLD

nearest_railhead: A HOLD, B HOLD, quotes 0/6
- nearest_railhead: "Mahoba — 63km; Jhansi — 175km" -> "Khajuraho (KURJ) — in town (Vande Bharat to Delhi & Varanasi)"
- check nearest_railhead: A HOLD (Khajuraho has its own station with Vande Bharat service to Delhi and Varanasi, which beats 'Mahoba 63 km', but 'in town' is not supported because the station is about 6.5 to 10 km from the town and temples (informal Tripadvisor posts, not official).); B HOLD (Vande Bharat services from Khajuraho to Nizamuddin and Varanasi are supported, but 'in town' is not backed by any source I could read (Wikipedia says only 'entry point' and gives no distance to town).); quotes confirmed 0/6

## shnongpdeng: HOLD

notice_text: A HOLD, B REJECT, quotes 0/8
- notice_text: null -> "The direct Shillong–Pynursla–Dawki road (NH-206) is under an indefinite advisory — avoid until further notice (ongoing construction, landslide risk; DC East Khasi Hills advisory, June 2026). Use alternate route: Shillong–Jowai–Amlarem–Dawki (adds ~1.5 hrs)."
- notice_source_url: null -> "https://www.sentinelassam.com/north-east-india-news/meghalaya-news/meghalaya-advises-travellers-to-avoid-shillong-pynursla-dawki-route"
- check notice_text: A HOLD (The June 2026 East Khasi Hills advisory is supported, but '~1.5 hrs' extra and 'NH-206' appear in no source I read. A newer order on 21 June 2026 closed the Shillong–Dawki road beyond Laitlyngkot to all vehicles, which makes this notice stale or understated.); B REJECT (The June 'avoid until further notice' advisory has been superseded: the Shillong–Dawki road (NH-206) stretch reopened to all vehicles on 10 Aug 2026 (night closures only), and the NEW text's DC attribution and '~1.5 hrs' extra time are not in the cited source.); quotes confirmed 0/8

## solan: REJECT (200 Rejected)

both checks rejected: The cited Deccan Herald article is from June 2025 and does not support the notice. The claimed 45 km is Solan's distance from Shimla; Chandigarh to Solan by road is about 67 km. Dharampur–Shimla (through Solan) still runs, so 'Kalka to Solan and beyond cancelled' overstates the closure.
- notice_text: null -> "Kalka–Shimla toy train: trains from Kalka to Solan (and beyond) are cancelled until December 31, 2026 for track and bridge repairs (Indian Railways order, October 18, 2026). Road access from Chandigarh via NH-5 (45km) is unaffected."
- notice_source_url: null -> "https://www.deccanherald.com/india/himachal-pradesh/himachal-pradesh-downpour-landslide-in-solan-shimla-kalka-rail-line-shut-traffic-disrupted-on-nh-3607708"
- check notice_text: A REJECT (The cited Deccan Herald article is from June 2025 and does not support the notice. The claimed 45 km is Solan's distance from Shimla; Chandigarh to Solan by road is about 67 km. Dharampur–Shimla (through Solan) still runs, so 'Kalka to Solan and beyond cancelled' overstates the closure.); B REJECT (The NH-5 distance from Chandigarh is about 65-68 km, not 45 km. The blanket 'Kalka to Solan (and beyond)' wording is also wrong, since the Tribune says some trains still run to Shimla from Dharampur, and the 'road unaffected' claim has no source.); quotes confirmed 0/8

## sonamarg: HOLD

notice_text: A HOLD, B HOLD, quotes 0/8
- notice_text: null -> "Z-Morh Tunnel (opened January 13, 2025) provides year-round road access to Sonamarg town. Thajiwas Glacier and Zero Point close November–April due to heavy snow. The town and winter snowscapes are now accessible in all months."
- notice_source_url: null -> "https://www.etvbharat.com/en/bharat/prime-minister-narendra-modi-inaugurates-z-morh-tunnel-in-sonamarg-kashmir-jan-13-2025-enn25011300754"
- check notice_text: A HOLD (The Z-Morh opening and year-round access are supported. The Thajiwas/Zero Point closure rests only on an approximate-window travel guide, other guides conflict with it, and no official source was found. 'Snowscapes accessible in all months' is a judgement call.); B HOLD (The Z-Morh tunnel and year-round town access are supported, but the Thajiwas Glacier and Zero Point closure months are unsupported or disputed. Official pages did not confirm them, and the Zero Point closure comes from a travel guide only.); quotes confirmed 0/8

## sinthan-top: HOLD

notice_text: A HOLD, B HOLD, quotes 0/8
- notice_text: null -> "Sinthan Top pass road is approaching or past its seasonal winter closure. Snow is forecast for November 12–13, 2026 (Western Disturbance). The pass typically closes by mid-November and remains closed until May. Travel to this pass is not recommended in November."
- notice_source_url: null -> "https://www.greaterkashmir.com/gk-top-news/kishtwar-sinthan-top-closed-for-traffic/"
- check notice_text: A HOLD (The Nov 12–13 snow forecast is supported, but 'typically closes by mid-November, closed until May' has no official source, and the cited Greater Kashmir article is from 2023. 'Approaching or past' closure is vague and not an actual closure event.); B HOLD (The Nov 12-13 snow forecast and the Sinthan Top disruption risk are supported. The 'closes by mid-November, closed until May' pattern has no official source, and the cited article is from Nov 2023, so there is no confirmation of the current road status.); quotes confirmed 0/8

## yuksom: HOLD

notice_text: A HOLD, B HOLD, quotes 0/6
- notice_text: null -> "The Rimbi–Yuksom road has been closed by recurring landslides since September 2026. Rimbi village area is severely affected; permanent repairs ongoing. Verify road status locally before travel to Yuksom."
- notice_source_url: null -> "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
- check notice_text: A HOLD (The Rimbi–Yuksom closure is supported only as of Sept 25, 2026. No source found on the current status in November, or on permanent repairs being ongoing; the article states no repair status.); B HOLD (The Sept 25 closure is supported, but a Sept 27 report says the Rimbi road reopened to vehicles, and its endpoints are not named. I found no November status, so the present-tense 'has been closed since September' claim is unverified and probably stale.); quotes confirmed 0/6

## yusmarg: HOLD

notice_text: A HOLD, B HOLD, quotes 0/9
- notice_text: null -> "Yusmarg allows day visits only since February 2026. Tourist access is confined to the main meadow; overnight stays and movement beyond the tree line are not permitted. Security is heightened following a September 2026 militant encounter in adjacent Budgam forests."
- notice_source_url: null -> "https://m.thewire.in/article/business/jks-yusmarg-resort-reopened-in-february-but-post-pahalgam-attack-restrictions-are-crippling-livelihoods"
- check notice_text: A HOLD (The overnight ban and the main-bowl/tree-line limits are supported by The Wire (May 2026). 'Day visits only since February 2026' is a paraphrase of that report. The Wire has no September 2026 encounter and no heightened-security claim, and the search-found encounter reports mention no tourist security measures.); B HOLD (The February reopening, the overnight-stay ban and the tree-line limit are supported by The Wire (May 2026). The September Budgam encounter is real, but the 'main meadow only' and 'security heightened' wording is unsupported, and the police officer quoted by The Wire says night stays could be permitted.); quotes confirmed 0/9

## zuluk: HOLD

nearest_airport: A HOLD, B HOLD, quotes 0/6
- nearest_airport: "Bagdogra — 170km; Pakyong — 75km" -> "Bagdogra — 170km"
- check nearest_airport: A HOLD (The cited article (23 Jul 2025) only shows no scheduled flights at Pakyong then; a Sept 2026 report has the state in talks with SpiceJet/IndiGo to restart them, so I can't confirm the airport is still dead today, and the Bagdogra 170km figure was not checked at all.); B HOLD (The source supports that no scheduled flights have run from Pakyong since June 2024, but it is a July 2025 article, a 2026 UDAN restart proposal exists, and the 170km Bagdogra distance is unverified.); quotes confirmed 0/6

## parvati-valley: HOLD

notice_text: A HOLD, B HOLD, quotes 0/8
- notice_text: null -> "Overnight camping at Kheerganga is banned by order of the Himachal Pradesh Forest Department (upheld by HP High Court). Day trekking from Barshaini to Kheerganga and return before dark is permitted. No overnight stays allowed."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/camping-prohibited-in-kullus-kheerganga-area-638633/"
- check notice_text: A HOLD (The Forest Department ban and the 10am/2pm day-trek rule are supported, but the Tribune piece (July 2024) never mentions the High Court (the only High Court links I found were blogs and an earlier 2018 ban), and it describes the ban as 'for the time being'.); B HOLD (The Tribune article (July 2024) confirms a Forest Department camping ban but does not mention the High Court, says visitors must leave by 2pm (not 'before dark'), and says overnight stays are possible at nearby villages.); quotes confirmed 0/8

## pelling: HOLD

notice_text: A HOLD, B HOLD, quotes 0/6
- notice_text: null -> "Road damage on the Geyzing–Pelling–Yuksom route: the Rimbi–Yuksom section is closed due to recurring landslides since September 2026. Pelling town is reachable via Geyzing and Namchi. Verify road status before travel to Yuksom."
- notice_source_url: null -> "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
- check notice_text: A HOLD (The source (25 Sep 2026) supports the Rimbi–Yuksam closure at that date, but it says nothing on Pelling, Geyzing or Namchi as the route, and I found no November report on whether the road has reopened. The Sept 2 landslide on the Pelling–Yuksom road itself is not in the NEW text.); B HOLD (The Sept 25, 2026 source reports Rimbi-Yuksam closed, but a Sept 27 report says the Rimbi road reopened, the source never mentions Pelling or the Geyzing/Namchi route, and 'closed since September' is unverified as of Nov 11.); quotes confirmed 0/6

## pushkar: HOLD

notice_text: A HOLD, B HOLD, quotes 0/7
- notice_text: null -> "Pushkar Camel Fair 2026 runs November 17–24. The town, ghats and fairgrounds are open but extremely crowded. Advance accommodation booking is essential. This is considered the best time to experience Pushkar."
- notice_source_url: null -> "https://www.incredibleindia.gov.in/en/festivals-and-events/pushkar-camel-fair"
- check notice_text: A HOLD (The 17–24 Nov 2026 dates are supported by Incredible India and the fair is upcoming, but the page does not support the 'extremely crowded', 'advance booking is essential' or 'best time to experience Pushkar' claims.); B HOLD (The 17-24 Nov 2026 dates are supported by the official Incredible India page and the fair is still upcoming, but 'extremely crowded', 'advance booking essential', 'town and ghats open' and 'best time' are not supported by any source I read.); quotes confirmed 0/7

## ravangla: HOLD

nearest_airport: A HOLD, B HOLD, quotes 0/6
- nearest_airport: "Bagdogra — 120km; Pakyong — 75km" -> "Bagdogra — 120km"
- check nearest_airport: A HOLD (Same evidence gap as item16: the July 2025 article doesn't prove Pakyong is still without service in Nov 2026 (restart talks reported Sept 2026), and the 120km Bagdogra distance was not verified.); B HOLD (The source supports that no scheduled flights have run from Pakyong since June 2024, but it is a July 2025 article, a 2026 restart proposal exists, and the 120km Bagdogra distance is unverified.); quotes confirmed 0/6

## shimla: HOLD

notice_text: A HOLD, B HOLD, quotes 0/11
- notice_text: null -> "The Kalka–Shimla toy train (UNESCO route) is running partial service only. Through trains Kalka–Shimla are suspended until December 31, 2026 for bridge repairs (Indian Railways order, October 18, 2026). Road access from Chandigarh is unaffected."
- notice_source_url: null -> "https://www.deccanherald.com/india/himachal-pradesh/himachal-pradesh-downpour-landslide-in-solan-shimla-kalka-rail-line-shut-traffic-disrupted-on-nh-3607708"
- check notice_text: A HOLD (The train suspension to 31 Dec 2026 and the partial service are supported by the Tribune and HelloRail, but 'Road access from Chandigarh is unaffected' has no current source and the cited Deccan Herald page returned 403; the sources also disagree on whether Kalka–Dharampur is suspended to 30 Nov or 31 Dec.); B HOLD (The train suspension and partial service are confirmed by The Tribune and HelloRail, but I found no source for 'road access from Chandigarh is unaffected'. The only road source was a three-month-old, unofficial travel blog. The cited Deccan Herald page returned HTTP 403.); quotes confirmed 0/11

## sundarbans: HOLD

permit_required: A HOLD, B HOLD, quotes 0/10
- permit_required: "false" -> "Forest Department entry permit required; obtain at Sajnekhali, Canning, Sonakhali or Bagna on arrival. ₹180 Indian, ₹1,000 foreign."
- check permit_required: A HOLD (The permit requirement and the four issuing offices are supported by the official Sundarban Tiger Reserve page, but the ₹180 and ₹1,000 fees appear only on tour-operator pages. The official site lists no amounts and I found no official notification. NakshIQ's own safari page gives conflicting figures.); B HOLD (A permit or permission is required, and the Sajnekhali, Canning, Sonakhali and Bagna offices are confirmed, but no official page prints the ₹180 or ₹1,000 fees. Those come only from tour-operator sites, and NakshIQ's own safari page says ₹20/day for Indians. The official site also contradicts itself on whether foreigners need a special permit.); quotes confirmed 0/10
