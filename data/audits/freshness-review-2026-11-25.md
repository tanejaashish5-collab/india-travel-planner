# Freshness review 2026-11-25

Batch: 10 destinations. Wave 1: 3 Sonnet sub-agents (chunks of 3-4). Gap-fill sub-agent for second sources.
Validator: `stamped=0 valid=1 corrections=9 queued=0 queueable=9 escalated=0 dropped=0 unreviewed=0`

## Destination table

| id | verdict | sources | what was checked |
|----|---------|---------|-----------------|
| meghamalai | needs_correction | etvbharat.com (Nov 9 2026), etvbharat.com (Aug 2026) | Notice expires Nov 24. Searched 'Meghamalai Srivilliputhur Tiger Reserve resort closure November 2026'. SC enforcement active; Nov 9 SC order created Gavai committee for traditional forest-rights residents; commercial resort removal ongoing. Only etvbharat.com returned authoritative hits — thehindu.com, thenewsminute.com, ndtv.com returned no specific Nov 2026 Meghamalai results. |
| pushkar | needs_correction | incredibleindia.gov.in | Notice expires Nov 24. Pushkar Camel Fair 2026 ran Nov 17–24 per incredibleindia.gov.in. Today is Nov 25; fair ended. No post-fair access disruptions, flooding or road closures found. Ajmer Junction and Jaipur airport unchanged. Dropping notice. |
| kinnaur | needs_correction | tribuneindia.com (Nov 8 2026), aninews.in (Jul 2026) | Notice expires Nov 24. 4th NH-5 closure occurred Nov 7–8 (from Nov 21 session research); road restored Nov 8. Road open for 17 days. Searched 'NH-5 Kinnaur road status November 2026' — no new closures found. Monsoon over; NH-5 follows Sutlej valley floor, no winter pass closure. Dropping notice. |
| lahaul-valley | needs_correction | hplahaulspiti.nic.in (live), etvbharat.com (Nov 13 2026), tribuneindia.com (Oct 15 2026) | Notice expires Nov 24. Official hplahaulspiti.nic.in road-status page confirms Keylong–Kaza closed for winter. ETV Bharat Nov 13 confirms Darcha–Sarchu suspended, Kunzum Top closed from Losar. Atal Tunnel and Manali–Keylong confirmed open. Renewing with minor update: removing 'early' to reflect late-November date. |
| vagamon | needs_correction | onmanorama.com (Oct 2 2026) | Notice expires Nov 24. Searched 'Vagamon glass bridge November 2026 open closed'. onmanorama.com (Oct 2) confirmed bridge closed for NIT inspection, ~1-month repair from Oct. 1-month window passed but no reopening confirmed. keralatourism.org and mathrubhumi.com returned no specific Nov 2026 glass bridge status. Only 1 authoritative host (Oct 2 source, outside preferred 3-week window — most recent authoritative confirmation available). Renewing notice with updated wording. |
| khajuraho | confirmed | aai.aero (Nov 24 2026 update), etvbharat.com (Oct 31 2026) | Searched for airport status, ASI closures, UNESCO-related shutdowns. aai.aero confirms Khajuraho Airport active. ETV Bharat Oct 31 confirms temple access active (Javari Temple accessible for Kartik Purnima). Air India resumed Delhi–Khajuraho–Varanasi from Oct 25 2026 after maintenance closure. All facts confirmed; no closures found. |
| mon | needs_correction | mon.nic.in (official), aai.aero | Official mon.nic.in 'How to Reach' confirms Jorhat Airport (Assam) is closest at ~161km — not Dimapur 300km. Nearest railhead per official site is Sonari (Assam) ~65km — not Dimapur 300km. aai.aero confirms Dimapur is a Nagaland gateway (alternative), not closest. ILP requirement confirmed correct. No security/curfew in Mon 2026 found. |
| bhaderwah | needs_correction | kashmirobserver.net (Jul 8 2026), deccanherald.com (Jul 2026) | July 3 2026 order under BNSS S.163: mandatory prior written permission from ADC of Bhaderwah for ALL trekking, camping and adventure activities — still in force (no revocation found). Town visits unrestricted. Searched 'Bhaderwah travel 2026 security' and 'road closure November 2026' — no road closures found. Jammu airport operational. |
| pahalgam | needs_correction | kashmirobserver.net (Nov 12 2026), dailyexcelsior.com (Nov 2026) | Searched 'Pahalgam travel advisory November 2026', 'Srinagar airport flights 2026', 'Kashmir railway Anantnag 2026'. Pahalgam open to tourists. Key finding: Vande Bharat Jammu–Srinagar launched Apr 30 2026; Anantnag station has an experimental halt confirmed operational by CM letter Nov 2026. Anantnag ~44km from Pahalgam vs Jammu Tawi ~250km. Distance from yatra.com (not from district .nic.in — founder to verify before approving). |
| parvati-valley | needs_correction | tribuneindia.com (Oct 26 2026), tribuneindia.com (Oct 30 2026) | Searched 'Bhuntar Kullu airport flights November 2026 suspended UDAN'. tribuneindia.com Oct 26 confirms direct Delhi–Kullu flights suspended after Oct 24 (sole operator Alliance Air). Oct 30 article confirms limited 2× weekly service until Nov 8 only; no resumed schedule found beyond that. UDAN scheme flights confirmed suspended by Centre (Rajya Sabha statement — URL returned 404 when fetched directly). Both confirmed sources are tribuneindia.com (single host). Road access to lower Parvati Valley confirmed open. |

## Corrections

### meghamalai — notice_text updated (SC Gavai committee, Nov 9 2026)
- **Field:** notice_text
- **Current:** "Supreme Court May 2026 order directed closure of illegal resorts in Srivilliputhur-Megamalai Tiger Reserve; properties sealed, enforcement proceedings ongoing with court monitoring from Sep 2026. Verify accommodation's legal status before booking."
- **Proposed:** "Supreme Court May 2026 order closing illegal resorts in Srivilliputhur-Megamalai Tiger Reserve remains in force. Nov 9 2026 court order protects traditional forest-rights residents via a Gavai committee; commercial resort removal ongoing. Verify accommodation's legal status before booking."
- **Source:** https://www.etvbharat.com/en/state/supreme-court-order-brings-relief-to-8000-families-facing-eviction-in-tamil-nadu-meghamalai-enn26110905985 — 'commercial encroachers would remain subject to eviction... committee to submit interim report by February 1 2027' (ETV Bharat Nov 9 2026)

### pushkar — notice_text dropped (fair ended Nov 24)
- **Field:** notice_text
- **Current:** "Pushkar Camel Fair 2026 runs from 17 to 24 November."
- **Proposed:** null
- **Source:** https://www.incredibleindia.gov.in/en/festivals-and-events/pushkar-camel-fair — 'Mark your calendars for November 17th to 24th, 2026' — fair ran Nov 17–24; concluded Nov 24, today is Nov 25

### kinnaur — notice_text dropped (road open, monsoon-season hazard period ended)
- **Field:** notice_text
- **Current:** "NH-5 (the only road into Kinnaur) is in an active landslide zone and suffered three closures of 6–12 days each between late Sep and 2 Nov 2026; it reopened 2 Nov. Carry extra days and verify road status before travel."
- **Proposed:** null
- **Source:** https://www.tribuneindia.com/news/himachal/tibet-road-opens-to-traffic-after-six-days-558935 — road reopened Nov 2 (3rd closure); 4th closure Nov 7–8 cleared Nov 8; monsoon-season closure pattern ended; no new closures found in Nov 2026

### lahaul-valley — notice_text renewed (remove 'early', late-November date)
- **Field:** notice_text
- **Current:** "Roads beyond Keylong are closed by snowfall as of early November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel."
- **Proposed:** "Roads beyond Keylong are closed by snowfall as of November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel."
- **Source:** https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712 — 'Vehicular movement towards Shinku La Top and Baralacha La Top from Darcha police post has been suspended... route from Gramphu towards Kunzum Top also closed' (ETV Bharat Nov 13 2026)

### vagamon — notice_text renewed (updated wording: late Nov, NIT certification)
- **Field:** notice_text
- **Current:** "Vagamon Adventure Park glass bridge is closed for structural strengthening; a contractor dispute has further delayed reopening beyond the initial one-month estimate from Oct 2026. No confirmed reopening date as of early Nov 2026. All other sites and access roads are open."
- **Proposed:** "Vagamon Adventure Park glass bridge is closed pending NIT structural certification and resolution of a contractor dispute. No confirmed reopening date as of late Nov 2026. All other sites and access roads are open."
- **Source:** https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html — 'The bridge will be opened to the public only after structural strength is tested and certified under the supervision of NIT Calicut' (Onmanorama Oct 2 2026)

### mon — nearest_airport corrected (Jorhat ~161km, not Dimapur 300km)
- **Field:** nearest_airport
- **Current:** "Dimapur 300km"
- **Proposed:** "Jorhat (JRH) — ~161km"
- **Source:** https://mon.nic.in/how-to-reach/ — 'The closest airport is Jorhat in Assam, situated approximately 161 km away by bus. Alternatively, travelers can access Dimapur or Dibrugarh airports.'

### mon — nearest_railhead corrected (Sonari ~65km, not Dimapur 300km)
- **Field:** nearest_railhead
- **Current:** "Dimapur 300km"
- **Proposed:** "Sonari — ~65km"
- **Source:** https://mon.nic.in/how-to-reach/ — 'nearest railhead is Bhojo/Sonari station in Assam approximately 65 km from Mon'

### bhaderwah — permit_required added (ADC trekking/camping order Jul 2026)
- **Field:** permit_required
- **Current:** null
- **Proposed:** "Prior written permission from the Additional Deputy Commissioner of Bhaderwah required for all trekking, camping and adventure activities (order Jul 2026, no stated expiry). Town visits need no permit."
- **Source:** https://kashmirobserver.net/2026/07/08/govt-makes-permission-mandatory-for-trekking-camping-in-bhadarwah/ — 'No individual, group, trekking agency, tour operator, guide, institution or organisation shall undertake any adventure activity without obtaining prior written permission from the competent authority' (Jul 3 2026)

### pahalgam — nearest_railhead updated (Anantnag Vande Bharat experimental halt)
- **Field:** nearest_railhead
- **Current:** "Jammu Tawi"
- **Proposed:** "Anantnag — ~44km (Vande Bharat experimental halt, Oct 2026)"
- **Source:** https://kashmirobserver.net/2026/11/12/cm-omar-seeks-permanent-halt-for-vande-bharat-at-anantnag-railway-station/ — 'CM Omar said people of J&K have welcomed the experimental halt at Anantnag Railway Station... requested the experimental halt be made permanent' (Kashmir Observer Nov 12 2026)
- **Note:** Distance ~44km from yatra.com, not from pahalgam.nic.in — founder to verify before approving.

### parvati-valley — notice_text added (Bhuntar Airport flights suspended)
- **Field:** notice_text
- **Current:** null
- **Proposed:** "Bhuntar (Kullu-Manali) Airport has no scheduled direct flights from Delhi since late Oct 2026. UDAN scheme suspended; Chandigarh (~280km) is the effective air gateway until services resume."
- **Source:** https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/ — 'Alliance Air suspended direct Delhi-Kullu flights after October 24' (Tribune India Oct 26 2026)
- **Note:** Both confirmed sources from tribuneindia.com (single host).

RESULT confirmed=1 corrections=9 skipped=0

## Wrapper outcome

```
queued meghamalai: notice_text "Supreme Court May 2026 order directed closure of illegal resorts in Srivilliputhur-Megamalai Tiger Reserve; properties sealed, enforcement proceedings ongoing with court monitoring from Sep 2026. Verify accommodation's legal status before booking." → "Supreme Court May 2026 order closing illegal resorts in Srivilliputhur-Megamalai Tiger Reserve remains in force. Nov 9 2026 court order protects traditional forest-rights residents via a Gavai committee; commercial resort removal ongoing. Verify accommodation's legal status before booking."; notice_source_url "https://www.etvbharat.com/en/state/supreme-court-order-puts-meghamalai-residents-on-edge-as-encroachment-drive-intensifies-enn26082106047" → "https://www.etvbharat.com/en/state/supreme-court-order-brings-relief-to-8000-families-facing-eviction-in-tamil-nadu-meghamalai-enn26110905985"
queued pushkar: notice_text "Pushkar Camel Fair 2026 runs from 17 to 24 November." → null
queued kinnaur: notice_text "NH-5 (the only road into Kinnaur) is in an active landslide zone and suffered three closures of 6–12 days each between late Sep and 2 Nov 2026; it reopened 2 Nov. Carry extra days and verify road status before travel." → null
queued lahaul-valley: notice_text "Roads beyond Keylong are closed by snowfall as of early November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel." → "Roads beyond Keylong are closed by snowfall as of November 2026: Keylong–Kaza and Darcha–Sarchu are shut. Atal Tunnel and Manali–Keylong remain open. Check hplahaulspiti.nic.in/road-status before travel."; notice_source_url "https://hplahaulspiti.nic.in/road-status/" → "https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712"
queued vagamon: notice_text "Vagamon Adventure Park glass bridge is closed for structural strengthening; a contractor dispute has further delayed reopening beyond the initial one-month estimate from Oct 2026. No confirmed reopening date as of early Nov 2026. All other sites and access roads are open." → "Vagamon Adventure Park glass bridge is closed pending NIT structural certification and resolution of a contractor dispute. No confirmed reopening date as of late Nov 2026. All other sites and access roads are open."; notice_source_url "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html" → "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html"
queued mon: nearest_airport "Dimapur 300km" → "Jorhat (JRH) — ~161km"; nearest_railhead "Dimapur 300km" → "Sonari — ~65km"
queued bhaderwah: permit_required null → "Prior written permission from the Additional Deputy Commissioner of Bhaderwah required for all trekking, camping and adventure activities (order Jul 2026, no stated expiry). Town visits need no permit."
queued pahalgam: nearest_railhead "Jammu Tawi" → "Anantnag — ~44km (Vande Bharat experimental halt, Oct 2026)"
queued parvati-valley: notice_text null → "Bhuntar (Kullu-Manali) Airport has no scheduled direct flights from Delhi since late Oct 2026. UDAN scheme suspended; Chandigarh (~280km) is the effective air gateway until services resume."; notice_source_url null → "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
stamped 1: khajuraho
RESULT stamped=1 valid=1 corrections=9 queued=9 queueable=9 escalated=0 dropped=0 unreviewed=0
```
