# Freshness Review — 2026-10-14

Batch: 41 destinations · Review window: July–October 2026
Result: confirmed=34, corrections=7, skipped=0

---

## Destination Review Table

| id | verdict | sources | what was checked |
|---|---|---|---|
| kolad | confirmed | maharashtratourism.gov.in · wikipedia | Access/permit/road issues Jul-Oct 2026. None found. Year-round rafting destination. |
| dudhwa-national-park | confirmed | uptourism.gov.in · wikipedia | Standard Jun-Oct closure; reopens Nov 15. No permit or route changes. |
| anamalai | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Permit requirement check (travel blogs hint at one; no official source confirmed change to null). Keeping as-is. |
| bandhavgarh | confirmed | mpforest.gov.in · wikipedia | Reopened Oct 1 per standard schedule. No road/permit changes. |
| chandratal | confirmed | himachaltourism.gov.in · wikipedia | Searched for 2026 access orders. None official. Oct is shoulder season; batch avoid_months already captures Nov+. |
| chidambaram | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Temple access, floods, permits Jul-Oct 2026. None. |
| dakor | confirmed | gujarat.gov.in · wikipedia | Gujarat floods effect on Dakor, temple permits. None. |
| daman | needs_correction | pib.gov.in · traveltradejournal.com | NAMO Airport Daman opened for commercial flights 16 July 2026. nearest_airport field is now out of date. |
| dhanushkodi | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Road access, Pamban bridge. No closure. |
| gagron-fort | confirmed | timesofindia.indiatimes.com · wikipedia | Jhalawar district Aug 2026 flooding — no fort closure confirmed. Oct is in best_months. |
| gandhinagar | confirmed | gujarat.gov.in · wikipedia | Dholera airport not yet commercial; AMD unchanged. No issues. |
| gir-national-park | confirmed | forests.gujarat.gov.in · wikipedia | Reopened Oct 9 (one week early vs usual Oct 16). No permit changes. |
| girnar | confirmed | gujarat.gov.in · wikipedia | Ropeway operational. No access disruption. |
| great-himalayan-np | needs_correction | tribuneindia.com · himachaltourism.gov.in | Park accessible. Alliance Air suspending direct Delhi-Bhuntar flights from 24 Oct 2026. Notice_text issued. |
| guruvayur | confirmed | keralatourism.org · wikipedia | Temple access normal. CCJ vs COK distance question — no official source to flip; keeping COK. |
| hemkund-sahib | needs_correction | etvbharat.com · uttarakhandtourism.gov.in | Shrine closed 10 Oct 2026 for winter season. Reopens ~May 2027. Notice_text issued. |
| hogenakkal | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Falls access, TN-KA border. No issues. |
| idukki | needs_correction | onmanorama.com · thenewsminute.com | Vattavada mudslide 20 Sep 2026, 2 dead; NH probe ordered. Routes open but check conditions. Notice_text issued. |
| jabalpur | confirmed | mp.gov.in · wikipedia | Airport rename, Dhuandhar access. No rename confirmed; batch field unchanged. |
| junagadh | confirmed | gujarat.gov.in · wikipedia | Fort access, Gir nearby reopened Oct 9. No issues. |
| kanchipuram | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Temple closures, Parandur airport. Parandur cancelled; MAA unchanged. |
| kanha | confirmed | mpforest.gov.in · wikipedia | Reopened Oct 1 per standard schedule. No changes. |
| kanyakumari | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Bay of Bengal low-pressure Oct 13-14 caused temporary ferry disruption — passing weather event. No material change. |
| khangchendzonga-np | needs_correction | eastmojo.com · wikipedia | Rimbi-Khecheopalri and Rimbi-Yuksom roads blocked by landslides 25 Sep 2026. Repair unconfirmed. Notice_text issued. |
| kochi | confirmed | keralatourism.org · wikipedia | Oct 10-12 flood alert resolved. Airport unchanged. |
| kodaikanal | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Road closures, wildlife sanctuary, permits. None. |
| kollam | confirmed | keralatourism.org · wikipedia | Flooding Jul-Oct 2026. District spared from major Kerala floods. |
| kovalam | confirmed | keralatourism.org · wikipedia | Beach closures, hotel access. None. |
| kozhikode | confirmed | keralatourism.org · wikipedia | CCJ airport, permits, flooding. None. |
| kumarakom | confirmed | keralatourism.org · wikipedia | Aug 2026 road flooding (District Collector advisory). Monsoon event — October post-monsoon, conditions normal. Oct is in best_months. |
| kumbakonam | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Station redevelopment ongoing but not closed. No material change. |
| kumbalangi | confirmed | keralatourism.org · wikipedia | Heritage village closures. None. |
| kutch | confirmed | gujarat.gov.in · wikipedia | Rann Utsav permits, Mundra airport, BHJ unchanged. No material change. |
| kuttanad | needs_correction | onmanorama.com · aninews.in | AC Road submerged Aug 2026, 11 panchayats affected. Oct improving but variable. Notice_text issued. |
| lothal | confirmed | asi.nic.in · wikipedia | NMHC construction ongoing; no official museum closure found. ASI site accessible. |
| madurai | confirmed | tamilnadutourism.tn.gov.in · wikipedia | Airport changes, temple closures. None. IXM operational. |
| mahabalipuram | confirmed | asi.nic.in · wikipedia | ASI site closures, storm damage. None. Shore Temple accessible. |
| mandvi | confirmed | incredibleindia.gov.in · wikipedia | Monsoon beach damage cleared by Oct. No material changes. |
| marari | confirmed | keralatourism.org · wikipedia | Beach/resort access. None. |
| marine-national-park | confirmed | forests.gujarat.gov.in · wikipedia | All Gujarat parks reopened Oct 9 (week early). Park open. Avoid_months batch still accurate for future seasons. |
| meghamalai | needs_correction | etvbharat.com · livelaw.in | SC May 2026 order for illegal resort closures in Srivilliputhur-Megamalai TR; some sealed Aug 2026. Notice_text issued. |

---

## Corrections (7 proposed — queued for founder approval)

### 1. daman — nearest_airport
- **Current:** `Mumbai — 170km / Surat — 130km`
- **Proposed:** `NAMO Airport Daman — in city / Mumbai — 170km / Surat — 130km`
- **Source:** https://www.pib.gov.in/PressReleasePage.aspx?PRID=2285563
- **Quote:** Commercial flights to NAMO Airport Daman commenced 16 July 2026 via Alliance Air; airport inaugurated by PM Modi on 5 June 2026.

### 2. great-himalayan-np — notice_text
- **Current:** null
- **Proposed:** `Direct Delhi–Kullu (Bhuntar) flights suspended from 24 October 2026 (Alliance Air). Alternative connections via other hubs available. Check flight schedules before travel.`
- **Source:** https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/amp
- **Quote:** Alliance Air suspended direct Delhi-Kullu flights after 24 October 2026; article dated 2 October 2026.

### 3. hemkund-sahib — notice_text
- **Current:** null
- **Proposed:** `Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027.`
- **Source:** https://www.etvbharat.com/en/bharat/doors-of-shri-hemkund-sahib-in-chamoli-have-been-closed-for-the-winter-season-enn26101003865
- **Quote:** Portals closed for winter season, 10 October 2026; final Ardas at 12:30 PM, portals closed at 1:00 PM. 3,84,573 devotees visited the 2026 season.

### 4. idukki — notice_text
- **Current:** null
- **Proposed:** `Mudslide at Vattavada, Idukki in September 2026 killed two people; government probe ordered into NH slope excavation. Routes to Munnar and highland areas open; check road conditions before travel.`
- **Source:** https://www.onmanorama.com/news/kerala/2026/09/20/idukki-mudslide-death-injury-heavy-rain-live.html
- **Quote:** Heavy rain triggers mudslide in Idukki's Vattavada; 2 dead, 1 injured, 20 September 2026.

### 5. khangchendzonga-np — notice_text
- **Current:** null
- **Proposed:** `Roads from Rimbi to Khecheopalri and Yuksom (West Sikkim) blocked by landslides on 25 September 2026. Repair status unconfirmed. Verify current access with your registered tour operator before departure.`
- **Source:** https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/
- **Quote:** The two roads, Rimbi-Yuksam and Rimbi-Khecheopalri remain closed as flooding and landslides continue to affect the area; 25 September 2026.

### 6. kuttanad — notice_text
- **Current:** null
- **Proposed:** `Severe monsoon flooding in August 2026 submerged the Alappuzha–Changanassery road and affected 11 panchayats in Kuttanad. October conditions improving; confirm road access locally before travel.`
- **Source:** https://www.onmanorama.com/news/kerala/2026/08/06/ac-road-waterlogging-alappuzha0.html
- **Quote:** Alappuzha-Changanassery road submerged again despite Rs 671 crore flood-mitigation revamp; several sections deeply waterlogged, 6 August 2026.

### 7. meghamalai — notice_text
- **Current:** null
- **Proposed:** `Supreme Court May 2026 order directed closure of illegal resorts in Srivilliputhur-Megamalai Tiger Reserve; some properties sealed by August 2026. Verify your accommodation's legal status before booking.`
- **Source:** https://www.etvbharat.com/en/state/supreme-court-order-puts-meghamalai-residents-on-edge-as-encroachment-drive-intensifies-enn26082106047
- **Quote:** Officials subsequently sealed some lodges and other structures following Supreme Court directive; August 2026.

---

## Skipped destinations

None. All 41 destinations in the batch are accounted for.

## Wrapper outcome

```
queued daman: nearest_airport "Mumbai — 170km / Surat — 130km" → "NAMO Airport Daman — in city / Mumbai — 170km / Surat — 130km"
queued great-himalayan-np: notice_text null → "Direct Delhi–Kullu (Bhuntar) flights suspended from 24 October 2026 (Alliance Air). Alternative connections via other hubs available. Check flight schedules before travel."; notice_source_url null → "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/amp"
queued hemkund-sahib: notice_text null → "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027."; notice_source_url null → "https://www.etvbharat.com/en/bharat/doors-of-shri-hemkund-sahib-in-chamoli-have-been-closed-for-the-winter-season-enn26101003865"
queued idukki: notice_text null → "Mudslide at Vattavada, Idukki in September 2026 killed two people; government probe ordered into NH slope excavation. Routes to Munnar and highland areas open; check road conditions before travel."; notice_source_url null → "https://www.onmanorama.com/news/kerala/2026/09/20/idukki-mudslide-death-injury-heavy-rain-live.html"
queued khangchendzonga-np: notice_text null → "Roads from Rimbi to Khecheopalri and Yuksom (West Sikkim) blocked by landslides on 25 September 2026. Repair status unconfirmed. Verify current access with your registered tour operator before departure."; notice_source_url null → "https://eastmojo.com/sikkim/2026/09/25/sikkim-32-houses-in-rimbi-face-landslide-flash-flood-threat/"
queued kuttanad: notice_text null → "Severe monsoon flooding in August 2026 submerged the Alappuzha–Changanassery road and affected 11 panchayats in Kuttanad. October conditions improving; confirm road access locally before travel."; notice_source_url null → "https://www.onmanorama.com/news/kerala/2026/08/06/ac-road-waterlogging-alappuzha0.html"
queued meghamalai: notice_text null → "Supreme Court May 2026 order directed closure of illegal resorts in Srivilliputhur-Megamalai Tiger Reserve; some properties sealed by August 2026. Verify your accommodation's legal status before booking."; notice_source_url null → "https://www.etvbharat.com/en/state/supreme-court-order-puts-meghamalai-residents-on-edge-as-encroachment-drive-intensifies-enn26082106047"
stamped 34: kolad, dudhwa-national-park, anamalai, bandhavgarh, chandratal, chidambaram, dakor, dhanushkodi, gagron-fort, gandhinagar, gir-national-park, girnar, guruvayur, hogenakkal, jabalpur, junagadh, kanchipuram, kanha, kanyakumari, kochi, kodaikanal, kollam, kovalam, kozhikode, kumarakom, kumbakonam, kumbalangi, kutch, lothal, madurai, mahabalipuram, mandvi, marari, marine-national-park
RESULT stamped=34 valid=34 corrections=7 queued=7 queueable=7 escalated=0 dropped=0 unreviewed=0
```
