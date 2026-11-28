# Corrections auto-verify 2026-11-28

2 applied, 3 rejected, 42 held for re-check next run (VERIFIERS FAILED: A8: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); A8-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); A9: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); A9-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); A10: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); A10-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B1: exit 1 success You've hit your limit · resets 10am (Australia/Sydney); B1-retry: exit 1 success You've hit your limit · resets 10am (Australia/Sydney)).

## sonamarg: HOLD

notice_text: A APPROVE, B NONE, quotes 2/4
- notice_text: null -> "Z-Morh Tunnel (opened January 13, 2025) provides year-round road access to Sonamarg town. Thajiwas Glacier and Zero Point close November–April due to heavy snow. The town and winter snowscapes are now accessible in all months."
- notice_source_url: null -> "https://www.etvbharat.com/en/bharat/prime-minister-narendra-modi-inaugurates-z-morh-tunnel-in-sonamarg-kashmir-jan-13-2025-enn25011300754"
- check notice_text: A APPROVE (All four claims are supported by primary sources; the tunnel is confirmed operational and the town/attraction distinction is correctly stated.); B NONE (-); quotes confirmed 2/4

## pelling: HOLD

notice_text: A REJECT, B NONE, quotes 0/4
- notice_text: null -> "Road damage on the Geyzing–Pelling–Yuksom route: the Rimbi–Yuksom section is closed due to recurring landslides since September 2026. Pelling town is reachable via Geyzing and Namchi. Verify road status before travel to Yuksom."
- notice_source_url: null -> "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
- check notice_text: A REJECT (The Rimbi–Yuksom road reopened to all vehicular movement on September 27 2026 per NE News; the notice_text claim that the closure has persisted since September 2026 is directly contradicted.); B NONE (-); quotes confirmed 0/4

## yuksom: HOLD

notice_text: A REJECT, B NONE, quotes 0/3
- notice_text: null -> "The Rimbi–Yuksom road has been closed by recurring landslides since September 2026. Rimbi village area is severely affected; permanent repairs ongoing. Verify road status locally before travel to Yuksom."
- notice_source_url: null -> "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
- check notice_text: A REJECT (The Rimbi–Yuksom road reopened September 27 2026 per NE News; the core claim that it remains closed as of late November 2026 is contradicted.); B NONE (-); quotes confirmed 0/3

## yusmarg: HOLD

notice_text: A APPROVE, B NONE, quotes 2/4
- notice_text: null -> "Yusmarg allows day visits only since February 2026. Tourist access is confined to the main meadow; overnight stays and movement beyond the tree line are not permitted. Security is heightened following a September 2026 militant encounter in adjacent Budgam forests."
- notice_source_url: null -> "https://m.thewire.in/article/business/jks-yusmarg-resort-reopened-in-february-but-post-pahalgam-attack-restrictions-are-crippling-livelihoods"
- check notice_text: A APPROVE (All four claims are supported by The Wire and Daily Pioneer; no source found confirming restrictions were lifted before 2026-11-27.); B NONE (-); quotes confirmed 2/4

## kullu: HOLD

notice_text: A HOLD, B NONE, quotes 0/4
- notice_text: null -> "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A HOLD (Three of four claims are supported; the Chandigarh connection claim is unsupported — sources name Jaipur and Dehradun as connecting points, not Chandigarh, and the second cited Tribune URL is from 2013 not 2026.); B NONE (-); quotes confirmed 0/4

## tawang: REJECT (200 Rejected)

both checks rejected: The official eILP portal explicitly states the system is for Indian citizens only; foreigners require a PAP/RAP, not an ILP, so calling ILP 'mandatory for foreigners' is directly contradicted.
- permit_required: "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online via Arunachal Pradesh government portal or get at Guwahati/Tezpur facilitation centers. Process takes 24-48 hours." -> "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online at eilp.arunachal.gov.in (official Government of Arunachal Pradesh portal) or at facilitation centres in Guwahati and Tezpur. Online processing takes 24-72 hours on working days."
- check permit_required: A REJECT (The official eILP portal explicitly states the system is for Indian citizens only; foreigners require a PAP/RAP, not an ILP, so calling ILP 'mandatory for foreigners' is directly contradicted.); B REJECT (The claim that ILP is mandatory for foreigners is directly contradicted by multiple sources: foreigners require a Protected Area Permit (PAP) via e-FRRO, not an ILP; the 24-72 hour processing time is also unsupported on the official portal.); quotes confirmed 0/9

## tirthan-valley: REJECT (200 Rejected)

both checks rejected: The Tribune India sources name Jaipur and Dehradun as the indirect connection alternatives, directly contradicting the claim that travellers must connect via Chandigarh.
- notice_text: null -> "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A REJECT (The Tribune India sources name Jaipur and Dehradun as the indirect connection alternatives, directly contradicting the claim that travellers must connect via Chandigarh.); B REJECT (The specific alternative 'connect via Chandigarh' is contradicted by both Tribune India 2026 articles, which name Jaipur and Dehradun as the actual connection options; driving from Delhi is also unsupported.); quotes confirmed 0/8

## manali: REJECT (200 Rejected)

both checks rejected: Same Bhuntar suspension facts are sourced, but the claim that travellers connect via Chandigarh is contradicted — cited articles name Jaipur and Dehradun as the documented indirect routes.
- notice_text: null -> "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A REJECT (Same Bhuntar suspension facts are sourced, but the claim that travellers connect via Chandigarh is contradicted — cited articles name Jaipur and Dehradun as the documented indirect routes.); B REJECT (Same flight suspension data as item7; 'connect via Chandigarh' is contradicted by both Tribune India 2026 articles, which identify Jaipur and Dehradun as the actual connection alternatives.); quotes confirmed 0/8

## machilipatnam: HOLD

notice_text: A HOLD, B HOLD, quotes 0/8
- notice_text: null -> "Cyclone Murasu (3 Nov 2026) damaged roads and caused power outages across coastal Andhra Pradesh. Vijayawada airport resumed normal operations from 10 Nov. Some local roads may still be affected; check conditions before travel."
- notice_source_url: null -> "https://www.thehansindia.com/news/cities/amaravati/cyclone-murasu-batters-coastal-ap-1138993"
- check notice_text: A HOLD (Vijayawada airport resumption date of 10 Nov has no sourced support; without it the notice makes a specific claim it cannot back, and the cyclone is now 25 days old with no source confirming roads near Machilipatnam remain affected.); B HOLD (Cyclone event, road damage figure, and IndiGo cancellations are well-sourced, but the specific claim that Vijayawada airport resumed normal operations from 10 Nov is unsupported — no source states that date explicitly.); quotes confirmed 0/8

## jaisalmer: HOLD

notice_text: A APPROVE, B HOLD, quotes 2/8
- notice_text: null -> "Forest Dept ban from 13 Oct 2026: no entry to Sam and Kanoi sand dunes after sunset (no night camel safaris or jeep runs; daytime and desert camps unaffected). Night movement in the 5-km India-Pakistan border belt restricted 6 PM–7 AM until 30 Nov 2026."
- notice_source_url: null -> "https://www.freepressjournal.in/india/jaisalmers-sam-sand-dunes-face-night-tourism-ban-as-forest-department-restricts-entry-camel-safaris-after-sunset"
- check notice_text: A APPROVE (All three restrictions are confirmed by named official and press sources, events are current as of 2026-11-27, and the border-belt order (until 30 Nov) is still within its stated window.); B HOLD (Sam dunes ban, camel-safari prohibition, and border belt restrictions are all sourced verbatim, but 'Kanoi' dunes and the '13 Oct 2026' start date do not appear in any primary-source verbatim quote.); quotes confirmed 2/8

## tamenglong: HOLD

notice_text: A APPROVE, B HOLD, quotes 1/7
- notice_text: null -> "Manipur is under active ethnic conflict (2023-ongoing). The Imphal-Tamenglong road passes through conflict-affected territory; the US and UK governments advise against travel to Manipur. Contact Tamenglong district police before attempting this route."
- notice_source_url: null -> "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
- check notice_text: A APPROVE (All three claims are independently supported by current primary sources: UK FCDO and US State Dept both issue Level 4/against-all-but-essential-travel warnings for Manipur, and a November 2026 highway ambush confirms routes remain conflict-affected.); B HOLD (Manipur conflict and both government advisories are supported, but the specific claim that the Imphal–Tamenglong road passes through conflict-affected territory is unsupported (the only 2026 road-incident source covers NH-202, the Imphal–Ukhrul highway, not the Imphal–Tamenglong route); additionally the Tribune curfew source was published in November 2024, not 2026.); quotes confirmed 1/7

## gangotri: HOLD

notice_text: A APPROVE, B HOLD, quotes 4/8
- notice_text: null -> "Gangotri Temple closed for winter from 10 November 2026. Harsil and the route remain accessible; roads may close temporarily in heavy snowfall. Temple reopens approximately May 2027."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/doors-of-gangotri-dham-in-uttarkashi-are-closed-char-dham-yatra-2026-is-nearing-its-end-enn26111002455"
- check notice_text: A APPROVE (All four claims are supported: ETV Bharat confirms the 10 November 2026 closure with an exact timestamp, Harsil accessibility and snowfall road risk are corroborated by independent travel sources, and May 2027 reopening is consistent with the Akshaya Tritiya date.); B HOLD (The 10 November 2026 closure date is supported, but Harsil accessibility, temporary road-closure risk, and the approximate May 2027 reopening date are all absent from the cited source and no alternative source was verified.); quotes confirmed 4/8

## auli: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- notice_text: null -> "The Joshimath–Auli gondola ropeway has been out of service since January 2023 following land subsidence near Joshimath. Auli is accessible by road via Joshimath (approx. 14km). No reopening date confirmed; reconstruction at planning stage."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/save-auli-movement-launched-in-uttarakhand-to-restore-glory-of-the-hill-station-enn26011602480"
- check notice_text: A APPROVE (All four claims are supported by independent 2026 sources: ropeway closed since 5 January 2023 due to land subsidence, road distance via Joshimath is confirmed at 14–16km, and the replacement is confirmed still at DPR planning stage with no reopen date.); B APPROVE (All four factual claims—ropeway closed since January 2023 due to Joshimath land subsidence, road access via Joshimath at approximately 14 km, no confirmed reopening date, and reconstruction at DPR stage—are supported by a named-news source with consistent corroboration across multiple 2026 search results; the original cited ETV Bharat article covers only the ski-machine, not the ropeway, but alternative sources fully cover the claims.); quotes confirmed 4/8

## great-himalayan-np: HOLD

notice_text: A HOLD, B REJECT, quotes 0/7
- notice_text: "Direct Delhi–Kullu (Bhuntar) flights suspended after 24 October 2026 (Alliance Air). Connecting service via Jaipur or Dehradun available. Check updated schedules before travel." -> "Direct Delhi–Kullu (Bhuntar) flights remain suspended since October 2026; several routes from Bhuntar (Dehradun, Chandigarh) also not operating. Air connectivity is severely limited. Check current schedules before travel."
- notice_source_url: "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24" -> "https://www.tribuneindia.com/news/himachal/kullus-bhuntar-airport-faces-white-elephant-tag-as-flights-dwindle/"
- check notice_text: A HOLD (Delhi–Kullu suspension and 'severely limited' characterisation are supported, but the NEW notice's Chandigarh route claim is UNSUPPORTED by the cited source (Tribune only confirms Dehradun and Amritsar suspensions; Chandigarh service resumed November 2025 and its current 2026 status is unconfirmed), and 'since October 2026' conflicts with the Tribune's stated November 3 date.); B REJECT (The claim that Chandigarh routes are not operating is contradicted: Chandigarh–Bhuntar flights resumed November 2025 after a two-year hiatus, and the November 2026 Tribune article listing suspended routes names Dehradun and Amritsar but not Chandigarh.); quotes confirmed 0/7

## guptkashi: HOLD

notice_text: A REJECT, B HOLD, quotes 0/10
- notice_text: null -> "Kedarnath temple (28km from Guptkashi) closed for winter from 11 November 2026. Road to Guptkashi remains open; Kedarnath trek route is seasonal and currently closed. Temple expected to reopen approximately May 2027."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008"
- check notice_text: A REJECT (The '28km from Guptkashi' claim is contradicted: verified distance is approximately 46km (road to Gaurikund plus a mandatory 16km trek), and the notice as written would cause a reader to severely underestimate the journey.); B HOLD (The 11 November 2026 closure date is supported, but the 28 km distance from Guptkashi, Guptkashi road remaining open, trek route currently closed, and May 2027 reopening are all absent from the cited source and no alternative source was verified for them.); quotes confirmed 0/10

## hemkund-sahib: HOLD

notice_text: A HOLD, B HOLD, quotes 0/6
- notice_text: "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027." -> "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027."
- notice_source_url: "https://www.etvbharat.com/en/bharat/doors-of-shri-hemkund-sahib-in-chamoli-have-been-closed-for-the-winter-season-enn26101003865" -> "https://garhwalpost.in/65-65-lakh-pilgrims-visited-char-dham-shrines-in-2026/"
- check notice_text: A HOLD (Closure on 10 Oct 2026 for both shrines is verbatim-supported; the 'approximately May 2027' reopening claim has no verbatim primary source.); B HOLD (Closure on 10 Oct 2026 and Lokpal Temple closure are confirmed by ETV Bharat, but 'approximately May 2027' has no official source; the 2027 kapat date is announced by the Trust typically in March–April and has not yet been declared.); quotes confirmed 0/6

## dawki: HOLD

notice_text: A REJECT, B HOLD, quotes 0/8
- notice_text: null -> "The direct Shillong–Dawki road (via Pynursla) has been closed since June 2026 due to a landslide and ongoing highway construction. Use the alternate route via Jowai–Amlarem. Check road conditions with Meghalaya PWD before travel."
- notice_source_url: null -> "https://www.sentinelassam.com/north-east-india-news/meghalaya-news/shillongdawki-road-closed-after-major-landslide-near-laitlyngkot"
- check notice_text: A REJECT (The Shillong–Dawki road reopened to all traffic on 10 August 2026; the notice's claim it 'has been closed since June 2026' is directly contradicted by an official reopening notice.); B HOLD (June 2026 landslide and Jowai–Amlarem alternate route are confirmed, but the June articles stated repairs would take 'a few days' and no November 2026 source confirms the road remains closed; 'ongoing highway construction' as a stated closure cause is not in any cited article.); quotes confirmed 0/8

## dalhousie: HOLD

nearest_airport: A HOLD, B APPROVE, quotes 3/6
- nearest_airport: "Pathankot Airport (80km)" -> "Kangra (Gaggal) — ~106km / Pathankot — ~90km (no scheduled flights)"
- check nearest_airport: A HOLD (Pathankot distance (~90km) and no-scheduled-flights status are verbatim-confirmed; Kangra (Gaggal) ~106km could not be verified with a verbatim quote from an official source.); B APPROVE (Both distances are verbatim-confirmed by the official hpchamba.nic.in page; Pathankot's absence of scheduled operations is confirmed by Tribune India's list of 15 non-operational UDAN airports.); quotes confirmed 3/6

## imphal: HOLD

notice_text: A APPROVE, B APPROVE, quotes 2/5
- notice_text: null -> "Four civilians were killed in an ambush on the Imphal-Ukhrul highway (NH-202) on 13 Nov 2026. Check the security situation before travel."
- notice_source_url: null -> "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
- check notice_text: A APPROVE (All factual claims confirmed by multiple independently fetched news sources; event is current (14 days prior) and notice is not worse than the null OLD.); B APPROVE (East Mojo (13 Nov 2026) confirms four civilians killed on NH-202 on that date; the Tribune source cited is from 2024 and unrelated, but the East Mojo article alone fully supports every factual claim in the notice.); quotes confirmed 2/5

## vagamon: HOLD

notice_text: A HOLD, B HOLD, quotes 0/8
- notice_text: "Vagamon Adventure Park glass bridge is closed for structural strengthening; a contractor dispute has further delayed reopening beyond the initial one-month estimate from Oct 2026. No confirmed reopening date as of early Nov 2026. All other sites and access roads are open." -> "Vagamon Adventure Park glass bridge is closed pending NIT structural certification and resolution of a contractor dispute. No confirmed reopening date as of late Nov 2026. All other sites and access roads are open."
- notice_source_url: "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html" -> "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html"
- check notice_text: A HOLD (NIT certification requirement and absence of a confirmed reopening date are verbatim-supported; contractor dispute confirmed only by an aggregator without a primary news source; 'all other sites and access roads open' has no supporting source.); B HOLD (NIT Calicut certification requirement is confirmed by Onmanorama; however, the contractor dispute is not mentioned in any accessible source, and Onmanorama's Oct 2 article said work would take 'about a month'—no post-October source confirms the bridge remains closed in late November 2026.); quotes confirmed 0/8

## meghamalai: APPROVE (409 Not applied)

both checks approved every claim; every claim quote found on its source
- notice_text: "Supreme Court May 2026 order directed closure of illegal resorts in Srivilliputhur-Megamalai Tiger Reserve; properties sealed, enforcement proceedings ongoing with court monitoring from Sep 2026. Verify accommodation's legal status before booking." -> "Supreme Court May 2026 order closing illegal resorts in Srivilliputhur-Megamalai Tiger Reserve remains in force. Nov 9 2026 court order protects traditional forest-rights residents via a Gavai committee; commercial resort removal ongoing. Verify accommodation's legal status before booking."
- notice_source_url: "https://www.etvbharat.com/en/state/supreme-court-order-puts-meghamalai-residents-on-edge-as-encroachment-drive-intensifies-enn26082106047" -> "https://www.etvbharat.com/en/state/supreme-court-order-brings-relief-to-8000-families-facing-eviction-in-tamil-nadu-meghamalai-enn26110905985"
- check notice_text: A APPROVE (ETV Bharat Nov 9 2026 confirms the Gavai committee appointment, Feb 1 2027 interim report deadline, and ongoing commercial encroacher eviction; all material claims in NEW are supported.); B APPROVE (All three claims in NEW are confirmed by the ETV Bharat Nov 9 2026 article: May 2026 order in force, Gavai committee examining Forest Rights Act claims, commercial encroachers subject to removal with interim report due Feb 1 2027.); quotes confirmed 6/7

## pushkar: HOLD

notice_text: A APPROVE, B APPROVE, quotes 2/3
- notice_text: "Pushkar Camel Fair 2026 runs from 17 to 24 November." -> null
- check notice_text: A APPROVE (Fair dates confirmed as Nov 17-24 2026 by incredibleindia.gov.in; the event has concluded as of Nov 27, so clearing the stale notice is correct.); B APPROVE (Incredible India confirms the fair ran Nov 17-24 2026; it concluded three days before today (Nov 27), so removing the notice is correct.); quotes confirmed 2/3

## kinnaur: HOLD

notice_text: A HOLD, B HOLD, quotes 0/3
- notice_text: "NH-5 (the only road into Kinnaur) is in an active landslide zone and suffered three closures of 6–12 days each between late Sep and 2 Nov 2026; it reopened 2 Nov. Carry extra days and verify road status before travel." -> null
- check notice_text: A HOLD (The cited Tribune India article is from November 2023, not 2026; no 2026 source confirms NH-5 is currently clear or that the monsoon-season closure pattern has ended.); B HOLD (NH-5 reopening Nov 2 is confirmed, but a Tribune article (ID 560828, higher than the Nov-2 article ID 558935) reports a fresh landslide closing the Kinnaur-Kaza road (NH-505) on Nov 7-8, showing Kinnaur roads remained in active closure phase after Nov 2; removing the safety notice entirely is a judgment call.); quotes confirmed 0/3

## lahaul-valley: HOLD

notice_text: A HOLD, B APPROVE, quotes 3/7
- notice_text: "Roads beyond Keylong are closed by snowfall as of early November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel." -> "Roads beyond Keylong are closed by snowfall as of November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel."
- notice_source_url: "https://hplahaulspiti.nic.in/road-status/" -> "https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712"
- check notice_text: A HOLD (ETV Bharat Nov 13 2026 supports Darcha-Sarchu and Keylong-Kaza (Kunzum) closures but does not explicitly confirm Atal Tunnel or Manali-Keylong remain open.); B APPROVE (ETV Bharat Nov 13 2026 confirms Keylong-Kaza (Kunzum Top) and Darcha-Sarchu (Baralacha La/Shinku La) closures; Atal Tunnel confirmed open year-round with no November 2026 closure reported; removing 'early' is more accurate given the Nov 13 source date.); quotes confirmed 3/7

## mon: HOLD

nearest_airport: A APPROVE, B APPROVE, quotes 2/3; nearest_railhead: A HOLD, B HOLD, quotes 0/4
- nearest_airport: "Dimapur 300km" -> "Jorhat (JRH) — ~161km"
- nearest_railhead: "Dimapur 300km" -> "Sonari — ~65km"
- check nearest_airport: A APPROVE (mon.nic.in explicitly names Jorhat as the nearest airport at approximately 161 km, directly supporting NEW and superseding the OLD Dimapur 300km entry.); B APPROVE (Official Mon district NIC page confirms Jorhat is the nearest airport at ~161km; Dimapur listed only as an alternative, so OLD was wrong to cite it as the primary reference.); quotes confirmed 2/3
- check nearest_railhead: A HOLD (The station name (Bhojo/Sonari, Assam) is confirmed on the official Mon district page, but the specific '~65km from Mon' distance does not appear anywhere on that page; only the 7km Bhojo-to-Sonari local segment is stated.); B HOLD (The page names Bhojo as the railway station, not Sonari; Sonari is a town 7km beyond Bhojo; the 65km figure is from Sonari to Mon, making the actual railhead-to-Mon distance ~72km — the field value misidentifies the railhead and understates the distance from it.); quotes confirmed 0/4

## bhaderwah: APPROVE (200 Published)

both checks approved every claim; every claim quote found on its source
- permit_required: null -> "Prior written permission from the Additional Deputy Commissioner of Bhaderwah required for all trekking, camping and adventure activities (order Jul 2026, no stated expiry). Town visits need no permit."
- check permit_required: A APPROVE (All material claims are confirmed by the Kashmir Observer article: ADC Bhadarwah as issuing authority, July 3 2026 order, 'will remain in force until further orders' (no stated expiry), and written prior permission required for all trekking/camping/adventure activities; 'town visits need no permit' follows correctly from the order's restricted scope to adventure activities only.); B APPROVE (All claims confirmed: ADC Bhaderwah order dated Jul 3 2026, written permission mandatory for all adventure activities, no stated expiry (until further orders), and the order covers adventure activities only leaving town visits unrestricted.); quotes confirmed 7/7

## pahalgam: HOLD

nearest_railhead: A HOLD, B HOLD, quotes 0/6
- nearest_railhead: "Jammu Tawi" -> "Anantnag — ~44km (Vande Bharat experimental halt, Oct 2026)"
- check nearest_railhead: A HOLD (The Vande Bharat experimental halt at Anantnag is confirmed, but the '~44km from Pahalgam' distance and 'Oct 2026' start date for the halt are not stated in the source; the CM's November 2 letter requesting permanence shows the halt pre-dates November but does not pin it to October.); B HOLD (Vande Bharat experimental halt at Anantnag is confirmed but is explicitly experimental and revocable; the ~44km distance is unsupported (road distance is 46km per Yatra.com); and 'Oct 2026' start date does not appear in the cited article.); quotes confirmed 0/6

## parvati-valley: HOLD

notice_text: A HOLD, B HOLD, quotes 0/6
- notice_text: null -> "Bhuntar (Kullu-Manali) Airport has no scheduled direct flights from Delhi since late Oct 2026. UDAN scheme suspended; Chandigarh (~280km) is the effective air gateway until services resume."
- notice_source_url: null -> "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
- check notice_text: A HOLD ('UDAN scheme suspended' is not supported by the source, which attributes suspension to Alliance Air's own decision (and notes indirect service via Jaipur and Dehradun still operates); 'Chandigarh is the effective air gateway' is not stated in the source and may be contradicted by the continuing indirect Bhuntar service.); B HOLD (Direct Delhi-Kullu suspension after Oct 24 2026 confirmed; however 'UDAN scheme suspended' is unsupported (only Alliance Air's route was suspended, not the UDAN scheme), and Chandigarh as the effective air gateway is unsupported (Tribune article shows Jaipur/Dehradun connecting routes, not Chandigarh).); quotes confirmed 0/6

## sinthan-top: HOLD

notice_text: A HOLD, B HOLD, quotes 0/8
- notice_text: null -> "Sinthan Top (NH-244, Kishtwar–Anantnag route) closed by heavy snowfall on 14 November 2026. Brief reopening reported 15 November after snow clearance; seasonal closures are frequent November through May. Check current road status before travelling."
- notice_source_url: null -> "https://www.dailyexcelsior.com/traffic-resumes-on-sinthan-top-after-snow-clearance/"
- check notice_text: A HOLD (The source confirms a Sinthan Top snow clearance event but provides no specific dates, no NH-244 designation, and no seasonal pattern; with the described closure already over as of 27 November (road reopened ~15 November), unconfirmed specifics in the notice text prevent approval.); B HOLD (NH-244 Kishtwar-Anantnag closure and Nov 15 reopening are confirmed by multiple sources; however the snowfall/closure event was on Friday 13 Nov (not 14 Nov as stated), making the closure date claim contradicted by the primary source; additionally the seasonal closures Nov-May claim has no verbatim source, and the specific event is already 12 days past.); quotes confirmed 0/8

## daulatabad: HOLD

nearest_airport: A APPROVE, B APPROVE, quotes 2/5
- nearest_airport: "Aurangabad Airport (IXU) — 15km" -> "Chhatrapati Sambhajinagar Airport (IXU) — 15km"
- check nearest_airport: A APPROVE (The official AAI contact address on the airport page confirms the new name; IATA code IXU is documented unchanged by multiple sources following the December 2025 Government of India rename order.); B APPROVE (AAI page confirms the airport is now named Chhatrapati Sambhajinagar Airport per December 2025 Government of India order; IATA code IXU confirmed unchanged by aviation sources; distance 15km is unaltered from OLD.); quotes confirmed 2/5

## yamunotri: HOLD

notice_text: A APPROVE, B APPROVE, quotes 4/6
- notice_text: null -> "Yamunotri Dham temple closed for winter from 11 November 2026 (Bhai Dooj). Goddess Yamuna's idol moved to Kharsali village (winter seat). Temple reopens approximately May 2027."
- notice_source_url: null -> "https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008"
- check notice_text: A APPROVE (ETV Bharat confirms the temple closed at 10:28 AM on 11 November 2026 with the idol taken to Kharsali village; sacredyatra.com puts the tentative 2027 reopening on Akshaya Tritiya, consistent with 'approximately May 2027'.); B APPROVE (ETV Bharat confirms temple closed 10:28 AM on Bhai Dooj 11 November 2026 and idol moved to Kharsali; May 2027 reopening is consistent with Akshaya Tritiya 2027 (tentatively 9 May) confirmed by multiple Char Dham yatra sources.); quotes confirmed 4/6

## tungnath: HOLD

notice_text: A APPROVE, B APPROVE, quotes 5/8
- notice_text: null -> "Tungnath temple (3,680 m) closed for winter from 6 November 2026. Deity moved to Markandeshwar Temple, Makkumath for winter worship. Temple reopens approximately April–May 2027."
- notice_source_url: null -> "https://www.freepressjournal.in/lifestyle/worlds-highest-shiva-temple-tungnath-closes-for-winter-heres-where-devotees-can-seek-darshan"
- check notice_text: A APPROVE (FreePressJournal confirms closure on 6 November 2026 and idol moved to Markandeshwar Temple Makkumath; altitude 3,680 m confirmed by chopta.in; 'next six months' in the same article implies approximately May 2027 reopening, consistent with the annual pattern documented across multiple sources.); B APPROVE (FreePressJournal confirms temple closed 6 November 2026 and deity moved to Markandeshwar Temple, Makkumath; altitude 3,680m confirmed; April–May 2027 reopening consistent with historical pattern confirmed by yatra sites.); quotes confirmed 5/8

## tadoba: HOLD

permit_required: A APPROVE, B HOLD, quotes 3/6
- permit_required: null -> "Online safari booking required via Maharashtra Forest Department portal (mytadoba.mahaforest.gov.in); no walk-in entry to core zones. Book up to 120 days in advance."
- check permit_required: A APPROVE (The official MFD portal confirms exclusive online booking for gypsy safaris; waghobaecolodge.com confirms the 120-day advance window and walk-in exclusion for core zones.); B HOLD (Official portal and 120-day advance booking window are confirmed by mytadoba.mahaforest.gov.in; however 'no walk-in entry to core zones' was not stated on the official portal or FAQs and remains unsupported from an official source.); quotes confirmed 3/6

## sravasti: HOLD

nearest_airport: A APPROVE, B APPROVE, quotes 3/3; nearest_railhead: A NONE, B APPROVE, quotes 1/1
- nearest_airport: "Lucknow — 175km" -> "Lucknow — 170km"
- nearest_railhead: "Balrampur — 18km" -> "Balrampur — 17km"
- check nearest_airport: A APPROVE (The official Shravasti NIC district page confirms the nearest airport is Lucknow at approximately 170 kilometres, directly supporting the correction from 175 km.); B APPROVE (Official NIC page for Shravasti district confirms the nearest airport is Lucknow at 170km, supporting the correction from OLD 175km.); quotes confirmed 3/3
- check nearest_railhead: A NONE (-); B APPROVE (Official district NIC site confirms '17 Kilometers' verbatim; multiple independent sources corroborate 17km; no source confirms the old 18km figure.); quotes confirmed 1/1

## pithoragarh: HOLD

nearest_airport: A NONE, B HOLD, quotes 0/4
- nearest_airport: "Pantnagar — 240km" -> "Naini-Saini Airport (NNS) — 5km. Pantnagar — 240km (larger reliable alternative)"
- check nearest_airport: A NONE (-); B HOLD (Airport existence and Alliance Air winter 2026 service are confirmed, but the ~5km city distance could not be verified from any loaded authoritative page (NIC page states no distance; Wikipedia returned 403).); quotes confirmed 0/4

## pattadakal: HOLD

nearest_airport: A NONE, B APPROVE, quotes 1/2
- nearest_airport: "Hubli Airport (HBX) — 127km" -> "Hubballi Airport (HBX) — 140km"
- check nearest_airport: A NONE (-); B APPROVE (AAI confirms the name 'HUBBALLI AIRPORT (HBX)'; Karnataka Tourism's official page quotes 140km verbatim, the stronger primary source for the distance correction from 127km.); quotes confirmed 1/2

## bidar: HOLD

nearest_airport: A NONE, B APPROVE, quotes 2/3
- nearest_airport: "Hyderabad Airport — 150km" -> "Rajiv Gandhi International Airport, Hyderabad (HYD) — 150km"
- check nearest_airport: A NONE (-); B APPROVE (Official airport site confirms full name 'Rajiv Gandhi International Airport'; bidar.nic.in confirms 149km distance; Wikipedia confirms IATA HYD; 'major' qualifier correctly accounts for Bidar Airport's own single-route limited service.); quotes confirmed 2/3

## malvan: HOLD

nearest_airport: A NONE, B HOLD, quotes 0/4
- nearest_airport: "Goa Airport (Dabolim) — 110km" -> "Sindhudurg Airport (SDW) — 21km. Goa Airport, Dabolim (GOI) — 130km (more flights)"
- check nearest_airport: A NONE (-); B HOLD (Fly91 daily service from Nov 16 2026 and Dabolim 130km are confirmed, but sources give conflicting road distances from Malvan to Sindhudurg Airport (21km per imadtravel.com vs 30km per kupi.com) and the 21km claim cannot be resolved from an authoritative source.); quotes confirmed 0/4

## ajanta-caves: HOLD

nearest_airport: A NONE, B APPROVE, quotes 0/2
- nearest_airport: "Aurangabad Airport (IXU) — 100km" -> "Chhatrapati Sambhajinagar Airport (IXU) — 100km"
- check nearest_airport: A NONE (-); B APPROVE (AAI's own airport page displays 'Chhatrapati Sambhajinagar Airport' as the current name and IATA code IXU is confirmed unchanged.); quotes confirmed 0/2

## mukteshwar: HOLD

nearest_airport: A NONE, B HOLD, quotes 0/2
- nearest_airport: "Pantnagar — 90km" -> "Pantnagar — 110km"
- check nearest_airport: A NONE (-); B HOLD (The cited NIC page says 110km, but independent routing tools (Yatra 87km, Rome2rio ~95km) contradict it; NIC distance text is static tourism copy, not a road measurement.); quotes confirmed 0/2

## sarnath: HOLD

nearest_airport: A NONE, B APPROVE, quotes 0/1
- nearest_airport: "Lal Bahadur Shastri Airport, Varanasi — 25km" -> "Lal Bahadur Shastri International Airport, Varanasi — 25km"
- check nearest_airport: A NONE (-); B APPROVE (AAI's official Varanasi airport page heading confirms the full name includes 'International'.); quotes confirmed 0/1

## tarkarli: HOLD

nearest_airport: A NONE, B REJECT, quotes 0/4
- nearest_airport: "Goa Airport (Dabolim) — 120km. Kolhapur Airport — 140km" -> "Sindhudurg Airport (SDW/Chipi) — 20km · Goa Airport (Dabolim) — 150km · Kolhapur Airport — 140km"
- check nearest_airport: A NONE (-); B REJECT (Two distance figures are contradicted by routing sources: Chipi airport is 17km from Tarkarli (not ~20km), and Dabolim is ~137km from Tarkarli (not 150km).); quotes confirmed 0/4

## anjuna: HOLD

nearest_airport: A NONE, B APPROVE, quotes 1/5
- nearest_airport: "Goa International Airport (GOI) — 42km" -> "Manohar International Airport, Mopa (GOX) — 29km · Goa International Airport (GOI/Dabolim) — 46km"
- check nearest_airport: A NONE (-); B APPROVE (All claims supported: GOX confirmed by IATA databases, Anjuna in Bardez/North Goa confirmed by Wikipedia, ~29km and ~46km within routing-tool range, Herald Goa verbatim quote verified.); quotes confirmed 1/5

## mangalore: HOLD

nearest_airport: A NONE, B APPROVE, quotes 1/1
- nearest_airport: "Mangalore International Airport (IXE)" -> "Mangaluru International Airport (IXE)"
- check nearest_airport: A NONE (-); B APPROVE (Official AAI procurement and Karnataka Tourism both use 'Mangaluru International Airport' verbatim; the rename from Mangalore Bajpe Airport took effect Dec 2022.); quotes confirmed 1/1

## lucknow: HOLD

nearest_airport: A NONE, B APPROVE, quotes 1/1
- nearest_airport: "Chaudhary Charan Singh (Lucknow)" -> "Chaudhary Charan Singh International Airport, Lucknow"
- check nearest_airport: A NONE (-); B APPROVE (AAI official airports page states the full name verbatim, matching the NEW value exactly.); quotes confirmed 1/1

## munsiyari: HOLD

nearest_airport: A NONE, B HOLD, quotes 0/4
- nearest_airport: "Pantnagar" -> "Naini-Saini Airport, Pithoragarh (NNS) — 125km (Alliance Air; seasonal). Pantnagar — 336km"
- check nearest_airport: A NONE (-); B HOLD (IATA code NNS is confirmed, but '125 km' is not stated in the cited source (cross-sources give 120–145 km), 'Alliance Air; seasonal' is inaccurate (year-round 5-days/week schedule as of Oct 2026), and '336 km' for Pantnagar is unconfirmed by any source (cross-source range 249–363 km).); quotes confirmed 0/4

## bijapur: HOLD

nearest_railhead: A NONE, B APPROVE, quotes 2/2
- nearest_railhead: "Bijapur Railway Station" -> "Vijayapura Railway Station"
- check nearest_railhead: A NONE (-); B APPROVE (Karnataka Tourism official page uses 'Vijayapura Railway Station' verbatim and confirms Mumbai–Hyderabad connectivity, matching both claims in NEW.); quotes confirmed 2/2
