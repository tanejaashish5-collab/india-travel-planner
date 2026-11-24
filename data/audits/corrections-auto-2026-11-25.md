# Corrections auto-verify 2026-11-25

4 applied, 1 rejected, 29 held for re-check next run (VERIFIERS FAILED: B5: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B5-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B6: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B6-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B7: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B7-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney)).

## sinthan-top: REJECT (200 Rejected)

notice describes a window that ended 2026-11-14
- notice_text: null -> "NH244 (Kishtwar–Anantnag road via Sinthan Top) closed temporarily by heavy snowfall 13–14 November 2026; reopened 15 November. At 3,800m, the road is prone to sudden winter closures from November. Check status with J&K Traffic Police before travel."
- notice_source_url: null -> "https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712"

## sonamarg: HOLD

notice_text: A HOLD, B APPROVE, quotes 4/9
- notice_text: null -> "Z-Morh Tunnel (opened January 13, 2025) provides year-round road access to Sonamarg town. Thajiwas Glacier and Zero Point close November–April due to heavy snow. The town and winter snowscapes are now accessible in all months."
- notice_source_url: null -> "https://www.etvbharat.com/en/bharat/prime-minister-narendra-modi-inaugurates-z-morh-tunnel-in-sonamarg-kashmir-jan-13-2025-enn25011300754"
- check notice_text: A HOLD (Tunnel inauguration date and year-round town access are supported, but the specific November–April closure window for Thajiwas Glacier and Zero Point is not confirmed by any official or named-news source.); B APPROVE (All five claims supported: tunnel opened 13 January 2025, provides year-round town access, Thajiwas Glacier and Zero Point close November–April, winter town and snowscapes accessible in all months.); quotes confirmed 4/9

## yuksom: HOLD

notice_text: A HOLD, B HOLD, quotes 0/7
- notice_text: null -> "The Rimbi–Yuksom road has been closed by recurring landslides since September 2026. Rimbi village area is severely affected; permanent repairs ongoing. Verify road status locally before travel to Yuksom."
- notice_source_url: null -> "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
- check notice_text: A HOLD (Road closure by landslides since September 2026 is supported, but 'permanent repairs ongoing' has no source backing in the cited article.); B HOLD (Road closure and village impact supported across multiple sources; 'permanent repairs ongoing' is unsupported — sources describe only a temporary Bailey bridge installation, not permanent reconstruction.); quotes confirmed 0/7

## yusmarg: HOLD

notice_text: A APPROVE, B HOLD, quotes 3/10
- notice_text: null -> "Yusmarg allows day visits only since February 2026. Tourist access is confined to the main meadow; overnight stays and movement beyond the tree line are not permitted. Security is heightened following a September 2026 militant encounter in adjacent Budgam forests."
- notice_source_url: null -> "https://m.thewire.in/article/business/jks-yusmarg-resort-reopened-in-february-but-post-pahalgam-attack-restrictions-are-crippling-livelihoods"
- check notice_text: A APPROVE (All five claims are supported: access restrictions and overnight ban from The Wire (2026), and the September 2026 Yusmarg Budgam encounter confirmed by IANS dated 2026-09-03.); B HOLD (Current restrictions (overnight ban, 500 sqm confinement, no tree-line access) and the September 2026 Budgam encounter all confirmed; 'since February 2026' start date for the overnight ban is unsupported — The Wire frames these restrictions as post-Pahalgam attack measures, implying onset after April 22 2026, not February.); quotes confirmed 3/10

## zuluk: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- nearest_airport: "Bagdogra — 170km; Pakyong — 75km" -> "Bagdogra — 170km"
- check nearest_airport: A APPROVE (Ministry of Civil Aviation confirmed no scheduled flights from Pakyong since June 2024 with no pending airline applications, fully supporting removal of Pakyong from the nearest-airport field.); B APPROVE (No scheduled flights at Pakyong since June 2024 confirmed by Ministry of Civil Aviation; no resumption as of late 2026; removing Pakyong from nearest_airport is factually accurate.); quotes confirmed 4/4

## pelling: HOLD

notice_text: A HOLD, B HOLD, quotes 0/7
- notice_text: null -> "Road damage on the Geyzing–Pelling–Yuksom route: the Rimbi–Yuksom section is closed due to recurring landslides since September 2026. Pelling town is reachable via Geyzing and Namchi. Verify road status before travel to Yuksom."
- notice_source_url: null -> "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
- check notice_text: A HOLD (Rimbi–Yuksom closure is supported, but 'Pelling reachable via Geyzing and Namchi' and 'permanent repairs ongoing' have no source backing in the cited or any checked article.); B HOLD (Rimbi–Yuksom closure and Geyzing–Pelling–Yuksom corridor damage are supported, but 'Pelling reachable via Geyzing and Namchi' is unsupported and one source frames the Geyzing–Pelling leg itself as disrupted during the same period.); quotes confirmed 0/7

## ravangla: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- nearest_airport: "Bagdogra — 120km; Pakyong — 75km" -> "Bagdogra — 120km"
- check nearest_airport: A APPROVE (Pakyong has had no scheduled commercial flights since June 2024, confirmed by Ministry of Civil Aviation and still current as of July 2025 search results; removing it from nearest_airport is accurate.); B APPROVE (Ministry of Civil Aviation confirmed in a July 2025 parliamentary response that no scheduled commercial flights have operated from Pakyong since June 2024, with no restart confirmed; removing Pakyong is accurate.); quotes confirmed 2/2

## kullu: HOLD

notice_text: A HOLD, B APPROVE, quotes 0/6
- notice_text: null -> "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A HOLD (The suspension fact is supported but the routing advice (Chandigarh) is not in either cited source, which instead mentions Jaipur/Dehradun connections; the two Tribune articles also give conflicting suspension dates (Oct 24 vs Nov 3) and conflicting information about remaining routes.); B APPROVE (Tribune India (2 Oct 2026) confirms Alliance Air suspended direct Delhi-Kullu service after 24 Oct 2026 and a follow-up confirms only thin inter-state connections (Jaipur/Dehradun) remain through winter; the notice is factually current.); quotes confirmed 0/6

## khonoma: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- permit_required: "ILP (Inner Line Permit) required for Nagaland — apply online at ilp.nagaland.gov.in or at Dimapur/Kohima checkpost." -> "ILP (Inner Line Permit) required for Indian citizens — apply online at ilp.nagaland.gov.in (offline applications no longer accepted since Jan 2025). Foreign nationals require a Protected Area Permit (PAP) reinstated by MHA from December 2024."
- check permit_required: A APPROVE (All three claims supported: online-only ILP from 1 Jan 2025 confirmed by EastMojo; PAP for foreigners reinstated December 2024 confirmed by Northeast Live TV and newsonair.gov.in.); B APPROVE (Official Nagaland ILP portal (updated Aug 2025) confirms online-only availability; East Mojo (Jun 2025) confirms offline discontinued from 1 Jan 2025; NewsonAir.gov.in (Feb 2026) and the ILP portal apply-page (Jul 2026) confirm PAP is currently mandatory for all foreign nationals.); quotes confirmed 7/7

## tawang: HOLD

permit_required: A HOLD, B REJECT, quotes 0/5
- permit_required: "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online via Arunachal Pradesh government portal or get at Guwahati/Tezpur facilitation centers. Process takes 24-48 hours." -> "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online at eilp.arunachal.gov.in (official Government of Arunachal Pradesh portal) or at facilitation centres in Guwahati and Tezpur. Online processing takes 24-72 hours on working days."
- check permit_required: A HOLD (Portal URL eilp.arunachal.gov.in is confirmed correct, but the stated 24-72 hour processing time is absent from the official portal and conflicts with one travel guide citing 2-24 hours; no official source states a processing time.); B REJECT (The claim that foreigners apply for ILP at eilp.arunachal.gov.in is contradicted: the portal has a separate 'Apply Protected Area Permit' link redirecting foreigners to indianfrro.gov.in (FRRO), confirming foreign nationals require PAP not ILP; additionally, the portal states no processing time, so '24-72 hours on working days' is unsupported.); quotes confirmed 0/5

## tirthan-valley: HOLD

notice_text: A HOLD, B APPROVE, quotes 2/4
- notice_text: null -> "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A HOLD (Same source as item7; the core suspension claim is supported but the routing advice (Chandigarh) does not appear in the cited sources, which mention Jaipur/Dehradun connecting flights and do not confirm Chandigarh as the recommended alternative.); B APPROVE (Notice is identical to item7 and is supported by the same Tribune India (2 Oct 2026) article confirming Alliance Air suspended direct Delhi-Kullu service after 24 Oct 2026; the notice is factually current for Tirthan Valley travellers who route through Bhuntar.); quotes confirmed 2/4

## jaisalmer: HOLD

notice_text: A APPROVE, B REJECT, quotes 4/8
- notice_text: null -> "Forest Dept ban from 13 Oct 2026: no entry to Sam and Kanoi sand dunes after sunset (no night camel safaris or jeep runs; daytime and desert camps unaffected). Night movement in the 5-km India-Pakistan border belt restricted 6 PM–7 AM until 30 Nov 2026."
- notice_source_url: null -> "https://www.freepressjournal.in/india/jaisalmers-sam-sand-dunes-face-night-tourism-ban-as-forest-department-restricts-entry-camel-safaris-after-sunset"
- check notice_text: A APPROVE (All five sub-claims (13 Oct start date, Sam and Kanoi dunes named, post-sunset camel/jeep ban, daytime and camps outside DNP unaffected, border belt 6 PM–7 AM until 30 Nov) independently supported by fetched sources.); B REJECT (The ban date '13 Oct 2026' is contradicted by the cited source which places the Forest Department announcement on 16 October 2026, not 13 October; additionally 'Kanoi' sand dunes appear in no cited source — the ban covers only the Desert National Park boundary near Sam.); quotes confirmed 4/8

## tamenglong: HOLD

notice_text: A HOLD, B APPROVE, quotes 2/8
- notice_text: null -> "Manipur is under active ethnic conflict (2023-ongoing). The Imphal-Tamenglong road passes through conflict-affected territory; the US and UK governments advise against travel to Manipur. Contact Tamenglong district police before attempting this route."
- notice_source_url: null -> "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
- check notice_text: A HOLD (The cited ambush source covers the Imphal-Ukhrul highway (NH-202), not the Imphal-Tamenglong road; the US travel advisory page returned HTTP 403 and could not be verified.); B APPROVE (All factual claims are supported: an ambush killing four civilians on NH-202 in Manipur on 13 Nov 2026 confirms active conflict, the US State Department rates all of Manipur Level 4 Do Not Travel, and the UK FCDO advises against all but essential travel to Manipur.); quotes confirmed 2/8

## manali: HOLD

notice_text: A HOLD, B HOLD, quotes 0/6
- notice_text: null -> "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A HOLD (Chandigarh as a connection hub is unsupported — both Tribune articles name only Jaipur and Dehradun as via-connection options; the temporary weekly schedule ran only until 8 Nov so current Nov-24 status of Delhi-Kullu connectivity is unknown.); B HOLD (The Delhi–Bhuntar suspension after 24 Oct 2026 is supported, but the cited source names Jaipur and Dehradun as the actual connecting hubs, not Chandigarh, leaving the 'connect via Chandigarh' guidance unsupported.); quotes confirmed 0/6

## machilipatnam: HOLD

notice_text: A HOLD, B HOLD, quotes 0/7
- notice_text: null -> "Cyclone Murasu (3 Nov 2026) damaged roads and caused power outages across coastal Andhra Pradesh. Vijayawada airport resumed normal operations from 10 Nov. Some local roads may still be affected; check conditions before travel."
- notice_source_url: null -> "https://www.thehansindia.com/news/cities/amaravati/cyclone-murasu-batters-coastal-ap-1138993"
- check notice_text: A HOLD (The '1,302 km of roads damaged' figure was not found in the fetched Hans India article; the specific Nov 10 Vijayawada airport resumption date has no source support; roads-still-affected 21 days post-cyclone is unverified.); B HOLD (Cyclone Murasu's 3 Nov 2026 landfall, road damage, and power outages are supported, but no source found confirms the specific claim that Vijayawada airport resumed normal operations on 10 November.); quotes confirmed 0/7

## basara: APPROVE (409 Not applied)

both checks approved every claim; every claim quote found on its source
- notice_text: "The main sanctum (garbhagriha) of Gnana Saraswati Temple has been closed since 5 July 2026 for a Rs 354-crore redevelopment expected to take about two years. Darshan continues at the temporary Balalayam on site." -> "The main sanctum (garbhagriha) of Gnana Saraswati Temple has been closed since 5 July 2026 for a Rs 354-crore redevelopment expected to take about two years. Darshan continues at the temporary Balalayam on site."
- notice_source_url: "https://www.deccanchronicle.com/southern-states/telangana/basar-temple-shifts-darshan-to-balalayam-for-redevelopment-works-1968593" -> "https://www.thehansindia.com/news/cities/adilabad/ritual-marks-beginning-of-gnana-saraswati-temple-reconstruction-at-basara-1138003"
- check notice_text: A APPROVE (All four claims (5 July 2026 closure and Balalayam opening, Rs 354 crore cost, two-year expected duration, darshan continuing at Balalayam) confirmed by named sources; reconstruction actively underway as of 1 Nov 2026 with no reopening announced; OLD equals NEW so no degradation.); B APPROVE (All claims are supported by multiple sources: closure from 5 July 2026, Rs 354-crore budget, two-year timeline, and Balalayam darshan are each confirmed, with the Hans India November 2026 article showing reconstruction actively underway and no reopening announced.); quotes confirmed 8/9

## gangotri: HOLD

notice_text: A HOLD, B APPROVE, quotes 4/8
- notice_text: null -> "Gangotri Temple closed for winter from 10 November 2026. Harsil and the route remain accessible; roads may close temporarily in heavy snowfall. Temple reopens approximately May 2027."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/doors-of-gangotri-dham-in-uttarkashi-are-closed-char-dham-yatra-2026-is-nearing-its-end-enn26111002455"
- check notice_text: A HOLD (Closure date and source are supported, but Harsil-accessibility and road-condition claims are absent from any cited source, and 'approximately May 2027' is unsupported — the source gives Akshaya Tritiya (typically late April) as the reopening trigger, not May.); B APPROVE (All four claims supported: closure date 10 Nov 2026 confirmed by ETV Bharat, Harsil accessibility by tourism sources, snowfall road risk by multiple sources, May 2027 reopen by sacredyatra.com.); quotes confirmed 4/8

## dawki: HOLD

notice_text: A HOLD, B REJECT, quotes 0/9
- notice_text: null -> "The direct Shillong–Dawki road (via Pynursla) has been closed since June 2026 due to a landslide and ongoing highway construction. Use the alternate route via Jowai–Amlarem. Check road conditions with Meghalaya PWD before travel."
- notice_source_url: null -> "https://www.sentinelassam.com/north-east-india-news/meghalaya-news/shillongdawki-road-closed-after-major-landslide-near-laitlyngkot"
- check notice_text: A HOLD (Landslide and Jowai–Amlarem alternate route are supported, but the road being still closed in November 2026 is unverified (the June 2026 source said repairs would take 'a few days'), 'via Pynursla' route designation is absent from all cited sources, and 'ongoing highway construction' as a cause is unsupported.); B REJECT (The road reopened to daytime traffic on 10 August 2026; the notice states it has been closed 'since June 2026' which is contradicted by multiple sources confirming the reopening.); quotes confirmed 0/9

## guptkashi: HOLD

notice_text: A HOLD, B REJECT, quotes 0/9
- notice_text: null -> "Kedarnath temple (28km from Guptkashi) closed for winter from 11 November 2026. Road to Guptkashi remains open; Kedarnath trek route is seasonal and currently closed. Temple expected to reopen approximately May 2027."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008"
- check notice_text: A HOLD (Kedarnath closure on 11 November 2026 is supported, but '28km from Guptkashi', 'road to Guptkashi remains open', and trek-route closure are absent from any cited source; 'approximately May 2027' is contradicted by the source's own data showing an April opening.); B REJECT (The '28km from Guptkashi' distance is contradicted by multiple sources which place Guptkashi to Gaurikund (road trailhead alone) at 30–32km, plus a 16km trek; no source supports 28km.); quotes confirmed 0/9

## hemkund-sahib: HOLD

notice_text: A HOLD, B HOLD, quotes 0/5
- notice_text: "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027." -> "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027."
- notice_source_url: "https://www.etvbharat.com/en/bharat/doors-of-shri-hemkund-sahib-in-chamoli-have-been-closed-for-the-winter-season-enn26101003865" -> "https://garhwalpost.in/65-65-lakh-pilgrims-visited-char-dham-shrines-in-2026/"
- check notice_text: A HOLD (Closure date and both temples are supported, but 'reopens approximately May 2027' is unsupported — no cited source gives a reopening date for 2027, and historically Hemkund Sahib opens in late May to early June (ETV Bharat article provides no next-year date).); B HOLD (Closure date and both temples confirmed by ETV Bharat; 'reopens approximately May 2027' has no direct verbatim source—the 2026 May opening provides pattern support only.); quotes confirmed 0/5

## idukki: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- notice_text: "A boulder blocked NH85 (Adimali–Munnar) on 19 October 2026 during highway excavation; cleared within days. Rockfall risk persists on steep excavation sections. Check road conditions before travel." -> "Highway blasting near Arulmani Bridge in Old Munnar (NH85) for road-widening is raising landslide risk as of Nov 2026. Boulder removal may destabilise nearby slopes. Rockfall risk on excavation sections. Check NH85 conditions before travel."
- notice_source_url: "https://www.deccanchronicle.com/southern-states/kerala/traffic-banned-on-adimali-munnar-route-after-huge-boulder-falls-on-road-1997410" -> "https://www.onmanorama.com/news/kerala/2026/11/19/munnar-landslide-fears-highway-blasting.html"
- check notice_text: A APPROVE (All claims — Arulmani Bridge location, NH85 designation, highway-widening works, landslide risk as of November 2026, and slope-destabilisation concern — are supported by the Onmanorama article dated 19 November 2026; the NEW notice is current, not over, and replaces a superseded notice about a cleared boulder.); B APPROVE (All material claims supported by Onmanorama 19 Nov 2026: blasting confirmed at Arulmani Bridge Old Munnar, landslide risk raised, slope destabilisation documented; NH85 identity confirmed by Oct 2026 article on same highway.); quotes confirmed 9/9

## great-himalayan-np: HOLD

notice_text: A REJECT, B NONE, quotes 0/4
- notice_text: "Direct Delhi–Kullu (Bhuntar) flights suspended after 24 October 2026 (Alliance Air). Connecting service via Jaipur or Dehradun available. Check updated schedules before travel." -> "Direct Delhi–Kullu (Bhuntar) flights remain suspended since October 2026; several routes from Bhuntar (Dehradun, Chandigarh) also not operating. Air connectivity is severely limited. Check current schedules before travel."
- notice_source_url: "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24" -> "https://www.tribuneindia.com/news/himachal/kullus-bhuntar-airport-faces-white-elephant-tag-as-flights-dwindle/"
- check notice_text: A REJECT (The cited Nov 2026 Tribune source names Dehradun and Amritsar as suspended routes, not Chandigarh; listing Chandigarh as not operating is contradicted by the same source, which also indicates Chandigarh service was resumed by Alliance Air in a separate Nov 2025 report.); B NONE (-); quotes confirmed 0/4

## auli: HOLD

notice_text: A HOLD, B NONE, quotes 0/3
- notice_text: null -> "The Joshimath–Auli gondola ropeway has been out of service since January 2023 following land subsidence near Joshimath. Auli is accessible by road via Joshimath (approx. 14km). No reopening date confirmed; reconstruction at planning stage."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/save-auli-movement-launched-in-uttarakhand-to-restore-glory-of-the-hill-station-enn26011602480"
- check notice_text: A HOLD (Core facts (ropeway closed since January 2023, no reopening date, reconstruction planned) are supported by named sources, but the stated road distance of approx. 14km is unsupported — sources consistently report 10–13km; the cited ETV Bharat source does not specifically address the gondola ropeway closure.); B NONE (-); quotes confirmed 0/3

## dalhousie: HOLD

nearest_airport: A APPROVE, B NONE, quotes 3/3
- nearest_airport: "Pathankot Airport (80km)" -> "Kangra (Gaggal) — ~106km / Pathankot — ~90km (no scheduled flights)"
- check nearest_airport: A APPROVE (Official Chamba district NIC page confirms Kangra 106km and Pathankot 90km; Tribune India confirms Pathankot is among 15 UDAN airports with no active scheduled service.); B NONE (-); quotes confirmed 3/3

## imphal: HOLD

notice_text: A APPROVE, B NONE, quotes 1/2
- notice_text: null -> "Four civilians were killed in an ambush on the Imphal-Ukhrul highway (NH-202) on 13 Nov 2026. Check the security situation before travel."
- notice_source_url: null -> "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
- check notice_text: A APPROVE (Four civilians killed in an ambush on the Imphal-Ukhrul road (NH-202) on 13 Nov 2026 is confirmed by multiple named news sources; the security situation in Manipur is ongoing, not concluded.); B NONE (-); quotes confirmed 1/2

## pushkar: HOLD

notice_text: A APPROVE, B NONE, quotes 1/1
- notice_text: "Pushkar Camel Fair 2026 runs from 17 to 24 November." -> null
- check notice_text: A APPROVE (Incredible India confirms the fair ran 17–24 November 2026; today is 25 November so the event has concluded and removing the now-stale notice is correct.); B NONE (-); quotes confirmed 1/1

## meghamalai: HOLD

notice_text: A APPROVE, B NONE, quotes 4/4
- notice_text: "Supreme Court May 2026 order directed closure of illegal resorts in Srivilliputhur-Megamalai Tiger Reserve; properties sealed, enforcement proceedings ongoing with court monitoring from Sep 2026. Verify accommodation's legal status before booking." -> "Supreme Court May 2026 order closing illegal resorts in Srivilliputhur-Megamalai Tiger Reserve remains in force. Nov 9 2026 court order protects traditional forest-rights residents via a Gavai committee; commercial resort removal ongoing. Verify accommodation's legal status before booking."
- notice_source_url: "https://www.etvbharat.com/en/state/supreme-court-order-puts-meghamalai-residents-on-edge-as-encroachment-drive-intensifies-enn26082106047" -> "https://www.etvbharat.com/en/state/supreme-court-order-brings-relief-to-8000-families-facing-eviction-in-tamil-nadu-meghamalai-enn26110905985"
- check notice_text: A APPROVE (All three core claims (May 2026 SC order, Nov 9 Gavai committee protecting forest-rights residents, commercial removal ongoing) are verbatim-confirmed; the Feb 2027 committee deadline establishes the matter is still active.); B NONE (-); quotes confirmed 4/4

## parvati-valley: HOLD

notice_text: A HOLD, B NONE, quotes 0/3
- notice_text: null -> "Bhuntar (Kullu-Manali) Airport has no scheduled direct flights from Delhi since late Oct 2026. UDAN scheme suspended; Chandigarh (~280km) is the effective air gateway until services resume."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A HOLD (Delhi-Kullu suspension by Alliance Air is confirmed, but 'UDAN scheme suspended' is unsupported (source names the airline only, not the scheme), and the Chandigarh ~280km gateway claim has no source citation.); B NONE (-); quotes confirmed 0/3

## pahalgam: HOLD

nearest_railhead: A HOLD, B NONE, quotes 0/2
- nearest_railhead: "Jammu Tawi" -> "Anantnag — ~44km (Vande Bharat experimental halt, Oct 2026)"
- check nearest_railhead: A HOLD (Vande Bharat experimental halt at Anantnag is confirmed, but the ~44km Pahalgam distance does not appear in the cited source and cannot be verified from it.); B NONE (-); quotes confirmed 0/2

## bhaderwah: HOLD

permit_required: A HOLD, B NONE, quotes 0/3
- permit_required: null -> "Prior written permission from the Additional Deputy Commissioner of Bhaderwah required for all trekking, camping and adventure activities (order Jul 2026, no stated expiry). Town visits need no permit."
- check permit_required: A HOLD (ADC permit requirement for trekking/camping/adventure is well-supported and dated, but 'Town visits need no permit' is absent from the cited source.); B NONE (-); quotes confirmed 0/3

## mon: HOLD

nearest_airport: A APPROVE, B NONE, quotes 1/1; nearest_railhead: A REJECT, B NONE, quotes 0/2
- nearest_airport: "Dimapur 300km" -> "Jorhat (JRH) — ~161km"
- nearest_railhead: "Dimapur 300km" -> "Sonari — ~65km"
- check nearest_airport: A APPROVE (The official mon.nic.in page verbatim confirms Jorhat is the nearest airport at ~161km, directly supporting the field change from Dimapur.); B NONE (-); quotes confirmed 1/1
- check nearest_railhead: A REJECT (The official Mon NIC page names Bhojo (Bhuju) railway station as the nearest railhead — not Sonari; Sonari is a road town 7 km beyond the station, and the 65 km distance figure does not appear in the cited source.); B NONE (-); quotes confirmed 0/2

## vagamon: HOLD

notice_text: A REJECT, B NONE, quotes 0/4
- notice_text: "Vagamon Adventure Park glass bridge is closed for structural strengthening; a contractor dispute has further delayed reopening beyond the initial one-month estimate from Oct 2026. No confirmed reopening date as of early Nov 2026. All other sites and access roads are open." -> "Vagamon Adventure Park glass bridge is closed pending NIT structural certification and resolution of a contractor dispute. No confirmed reopening date as of late Nov 2026. All other sites and access roads are open."
- notice_source_url: "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html" -> "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html"
- check notice_text: A REJECT (The bridge reopened mid-October 2026 after NIT safety work was completed and 600 tourists visited on day one — the NEW notice incorrectly states it remains closed pending certification and contractor dispute resolution.); B NONE (-); quotes confirmed 0/4

## kinnaur: HOLD

notice_text: A REJECT, B NONE, quotes 0/2
- notice_text: "NH-5 (the only road into Kinnaur) is in an active landslide zone and suffered three closures of 6–12 days each between late Sep and 2 Nov 2026; it reopened 2 Nov. Carry extra days and verify road status before travel." -> null
- check notice_text: A REJECT (The cited Tribune India article is dated November 3 2023, not 2026 — it describes a 2023 closure and cannot serve as evidence to remove a notice about 2026 closures; no 2026 source confirms NH-5 has remained clear since Nov 2.); B NONE (-); quotes confirmed 0/2

## lahaul-valley: HOLD

notice_text: A HOLD, B NONE, quotes 0/4
- notice_text: "Roads beyond Keylong are closed by snowfall as of early November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel." -> "Roads beyond Keylong are closed by snowfall as of November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel."
- notice_source_url: "https://hplahaulspiti.nic.in/road-status/" -> "https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712"
- check notice_text: A HOLD (Keylong–Kaza closure and Manali–Keylong open are confirmed; Darcha stoppage is confirmed but Sarchu is not named in any source; Atal Tunnel status has no citation in either the ETV Bharat article or the official road-status page.); B NONE (-); quotes confirmed 0/4
