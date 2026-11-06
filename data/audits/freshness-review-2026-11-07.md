# Freshness Review — 2026-11-07

Batch: 41 destinations (content_reviewed_at 2026-06-09, plus 2 expiring notices)
Run: 6 Sonnet sub-agents in 2 waves (chunks of 7), orchestrator confirms all verdicts.
Validator: `node scripts/freshness-review.mjs apply --batch ... --entries ...` — clean, 0 dropped, 0 escalated.

## Results table

| id | verdict | qualifying source(s) | what was checked |
|---|---|---|---|
| omkareshwar | confirmed | amarujala.com | Notice expires today naturally. Bandh 19-20 Oct 2026 ended after agreement; market reopened 20 Oct. Temple darshan unaffected. No Nov 2026 protests or closures. |
| wayanad | needs_correction (notice renew) | onmanorama.com (Oct 25 2026, within 3 wks), keralatourism.org | Notice expires today. Mundakkai-Chooralmala road still under reconstruction Oct 25; zone not reopened. No reopening announcement found. Renewed with same wording. |
| kargil | confirmed | kargil.nic.in | Road closures, security advisories Oct-Nov 2026. Zoji La closes Nov (correctly in avoid_months). No emergency advisory found. |
| kasol | confirmed | tribuneindia.com | Delhi-Kullu direct flights suspended Oct 24 but Bhuntar operational. No road closures or landslides on Bhuntar-Kasol corridor. |
| khajuraho | needs_correction (railhead update) | etvbharat.com (Sep 25 2026) | Khajuraho (KURJ) station confirmed with Vande Bharat Express to Delhi (6 days/wk). DB listing Mahoba/Jhansi is outdated. Temples open. |
| kokernag | confirmed | dailyexcelsior.com | Jan 2026 trekking ban expired Mar 2026. J&K reopened 14 spots including Kokernag post-security review. No active restriction. |
| kufri | confirmed | tribuneindia.com | No closures. Himalayan Nature Park open. Shimla airport (16km) operational. NH5 winter-cleared. |
| anini | confirmed | eilp.arunachal.gov.in, arunpol.nic.in | eILP portal active. No road closure or disaster advisory on Roing-Mayodia-Anini route. Dibrugarh airport operational. |
| deeg | confirmed | incredibleindia.gov.in | No closures. Deeg Bhawan open (active restoration, not closed). Agra Airport and Bharatpur Junction operational. |
| likir | confirmed | leh.nic.in | Accessible from Leh (52km, no Zoji La crossing). Nov in avoid_months correct. Leh Airport operating. No permit required. |
| loktak-lake | needs_correction (permit URL) | manipurilponline.mn.gov.in | manipurilp.nic.in domain NXDOMAIN confirmed. Active portal is manipurilponline.mn.gov.in. Imphal Airport operational. |
| lolab-valley | confirmed | kupwara.nic.in | kupwara.nic.in confirms Lolab as tourist destination in Kupwara. No closure order. No permit required. Srinagar Airport (100km) operational. |
| bangus-valley | needs_correction (new notice) | greaterkashmir.com, thewire.in | Confirmed CLOSED under J&K LG order since Apr 2025, extended to 31 Dec 2026. Greater Kashmir Sep 2026 reports 3rd year of closure. |
| lunglei | confirmed | champhai.nic.in | Mizoram ILP confirmed required. Lengpui Airport (~240km) operational. Silchar railhead operating. No landslide advisory. |
| kolkata | confirmed | etvbharat.com (Oct 31 2026) | Airport normal operations confirmed Oct 31 (3 days post-Cyclone Arnab). Both railheads (Howrah, Sealdah) unaffected. Cyclone made landfall in AP, not Kolkata. |
| kumbhalgarh | confirmed | incredibleindia.gov.in | Fort open 09:00-18:00. Udaipur airport winter schedule confirmed. Kumbhalgarh Festival 25-26 Nov confirms site accessible. |
| barnawapara | confirmed | etvbharat.com | Sanctuary opened Nov 1 as per annual schedule. Raipur Airport (100km) operational. |
| mawlynnong | needs_correction (new notice) | etvbharat.com | Sunday day-tripper ban from Jan 2026 (Village Dorbar decision) confirmed. Restaurants/shops/toilets shut Sundays; overnight guests exempt. |
| mawphlang | confirmed | etvbharat.com (Feb 2026) | No permit required (mandatory local guide is on-site, not govt permit). No road closures. Umroi airport (25km) operational. ETV Bharat tourism-circuit piece — no restrictions noted. |
| mawsynram | confirmed | etvbharat.com (Feb 2026) | No permit required. No road closures in Nov. Post-monsoon dry season. ETV Bharat confirms active destination. |
| mokokchung | confirmed | ilp.nagaland.gov.in, nagalandpost.com | ILP online since 1 Jan 2025. No security advisory for Mokokchung. Oct NH-202 diversion now lifted. Dimapur airport (160km) operational. |
| mon | needs_correction (permit text) | ilp.nagaland.gov.in | Physical ILP applications at Dimapur/Kohima discontinued Jan 2025. Online-only via ilp.nagaland.gov.in. Dimapur airport (300km) operational. |
| lamayuru | confirmed | tribuneindia.com | Zoji La closes Nov (correctly in avoid_months). Leh-Lamayuru road does not cross Zoji La. Leh Airport operational. |
| morni-hills | confirmed | tribuneindia.com | Chandigarh airport closed Oct 26-Nov 7 (runway resurfacing), 18-hr ops resumed today — temporary, not a data change. No road closures for Morni Hills. Nov is in best_months. |
| mount-abu | confirmed | tourism.rajasthan.gov.in | Dilwara Temples and Nakki Lake open. No conservation closure. Nov peak season. Udaipur airport and Abu Road railhead operational. |
| bhaderwah | needs_correction (new notice) | kashmirobserver.net, deccanherald.com | Section 163 BNSS order (3 Jul 2026): prior written permission required from ADC Bhaderwah for all trekking/hiking/camping. In force until further notice. General tourism unrestricted. |
| bharatpur | confirmed | incredibleindia.gov.in | Keoladeo NP open year-round. Nov is peak migratory season. No conservation closure. Agra airport and Bharatpur Junction operational. |
| nalanda | confirmed | etvbharat.com, tourism.bihar.gov.in | Museum reopened May 2026. Ruins open. Rajgir railhead (12km) and Patna airport (90km) operational. |
| namchi | confirmed | aai.aero (Pakyong), eastmojo.com | Accessible by road Nov 2026. MANUAL FLAG: Pakyong Airport (90km) has no scheduled flights since ~Jun 2024 (AAI page shows zero flights; EastMojo Sep 2025 confirms no airline since SpiceJet exit). Recommend manual correction to nearest_airport (need southsikkim.nic.in distance for Bagdogra). Sikkim RAP online-only since Jan 2026 (ANI article found but 403 to crawler; not queueing). |
| namdapha | confirmed | incredibleindia.gov.in, arunpol.nic.in | Nov is open season (Oct-Feb). No flood or closure advisory. ILP mandatory confirmed. Dibrugarh airport (200km) and Tinsukia railhead (180km) operational. |
| neermahal | confirmed | aninews.in | Palace open with boat rides. Agartala MBB airport operational (Jun 2026 ANI: ~34 daily flight movements). No permit required. Melaghar railhead (2km) operational. |
| netarhat | confirmed | latehar.nic.in | latehar.nic.in confirms adventure tourism destination. No closures. Ranchi airport (IXR) operational. No permits required. |
| nongriat | confirmed | etvbharat.com, aai.aero (Shillong) | Root bridges open post-monsoon. MANUAL FLAG: aai.aero Shillong page loads but flight schedule shows no results — Umroi has no scheduled commercial service. DB nearest_airport "Shillong (80km)" may mislead travelers; Guwahati (~190km) is practical. Recommend manual correction to nearest_airport (need eastkhasihills.nic.in distance). |
| bir-billing | confirmed | tribuneindia.com | Oct-Nov peak paragliding season. Gaggal (Kangra) airport expanded to 7 daily flights (Tribune India). No permit required. |
| bundi | needs_correction (airport update) | aai.aero | Kota Airport (KTU) has had no scheduled commercial flights since 1997 (confirmed aai.aero). DB entry listing "Kota (35km)" implies usable air access that does not exist. Jaipur (210km) is the only functional option. |
| orchha | confirmed | niwari.nic.in | Ram Raja Temple and fort complex open. Jhansi railhead (15km) confirmed by niwari.nic.in. Gwalior distance discrepancy (MP Tourism 142km vs DB 119km) flagged for manual check. |
| osian | confirmed | incredibleindia.gov.in | Sachiya Mata Temple complex open. Incredible India confirms active destination. Jodhpur airport operational. |
| bikaner | confirmed | aai.aero (Bikaner) | Fort open. MANUAL FLAG: Bikaner Nal Airport (BKB, 13km) confirmed in AAI network; IndiGo operates flights (6E7442/7443, Delhi) per IndiGo site, but aai.aero flight schedule is JS-rendered (no HTML quote available). DB lists Jodhpur/Jaipur as nearest airports — significantly outdated. Recommend manual correction to nearest_airport once scheduled service confirmed from aai.aero directly. |
| chamba | confirmed | tribuneindia.com | Post-monsoon landslides cleared. No active Nov closure. MANUAL FLAG: Pathankot Airport (IXP) may have no commercial service since 2025 — sources available do not meet qualification standard; recommend aai.aero verification. |
| pachmarhi | confirmed | forest.mponline.gov.in | Satpura core-zone safaris reopened 1 Oct (closed Jul-Sep). Town accessible without permit. Pipariya railhead (47km) confirmed. |
| pahalgam | needs_correction (new notice) | kashmirobserver.net, etvbharat.com | Baisaran Valley closed per Anantnag admin order Jul 2026, no reopening date. Pahalgam town/Betaab/Aru open with heightened security. Australia/US/UK/Canada Level 4 Do Not Travel advisories for J&K active. |

## Corrections (9 proposed)

### 1. wayanad — notice_text renewed (same wording)
- **Field:** notice_text
- **Current:** "Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026."
- **Proposed:** same wording (renewing for 21 more days)
- **Source:** https://www.onmanorama.com/news/kerala/2026/10/25/meppadi-chooralmala-road-public-outrage-boils-over-amid-delays-in-reconstruction.html — "sole access route to disaster-hit zones such as Attamala, Mundakkai, Chooralmala" (Oct 25, 2026 — road to the No Go Zone under reconstruction, zone not reopened); No Go Zone basis: Jan 22, 2026 Onmanorama — "No-Go Zone where all forms of human activity are prohibited"

### 2. khajuraho — nearest_railhead correction
- **Field:** nearest_railhead
- **Current:** "Mahoba — 63km; Jhansi — 175km"
- **Proposed:** "Khajuraho (KURJ) — in town (Vande Bharat to Delhi & Varanasi)"
- **Source:** https://www.etvbharat.com/hi/state/vande-bharat-express-new-schedule-khajuraho-vande-bharat-train-daily-with-additional-rake-mps26092501830 — Vande Bharat Express runs between Khajuraho and Delhi (H Nizamuddin), 6 days/week as of Sep 2026; confirms KURJ station has direct rail to Delhi and Varanasi

### 3. loktak-lake — permit_required URL correction
- **Field:** permit_required
- **Current:** "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilp.nic.in — free."
- **Proposed:** "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilponline.mn.gov.in — free."
- **Source:** https://manipurilponline.mn.gov.in/ — official Manipur ILP portal confirmed active; manipurilp.nic.in domain does not resolve (DNS NXDOMAIN)

### 4. bangus-valley — new notice_text
- **Field:** notice_text (null → new notice)
- **Proposed:** "Bangus Valley is closed to tourists under a J&K LG Administration order in force since April 2025, extended to 31 December 2026. No tourist access is permitted regardless of season."
- **Source:** https://www.greaterkashmir.com/kashmir/2-years-on-kupwaras-bangus-valley-stays-shut-tourism-economy-suffers-12494255 — "2 years on, Kupwara's Bangus Valley stays shut; tourism economy suffers"; closure order end date 31 Dec 2026

### 5. mawlynnong — new notice_text
- **Field:** notice_text (null → new notice)
- **Proposed:** "Mawlynnong village is closed to day-trippers every Sunday from January 2026 (Village Dorbar decision). Restaurants, shops, and public toilets are shut on Sundays. Overnight guests are exempt."
- **Source:** https://www.etvbharat.com/en/state/asia-cleanest-village-in-meghalaya-to-be-closed-to-tourists-on-sundays-enn26012903986 — "The village will remain closed to one-day tourists every Sunday starting January 2026...all tourist-related activities and services, including restaurants, shops and stalls, and public toilets, will remain closed"

### 6. mon — permit_required text update
- **Field:** permit_required
- **Current:** "Inner Line Permit (ILP) required for all Indian citizens. Apply at Dimapur/Kohima."
- **Proposed:** "Inner Line Permit (ILP) required for all Indian citizens. Apply online at ilp.nagaland.gov.in (physical office applications discontinued from January 2025)."
- **Source:** https://ilp.nagaland.gov.in/ — official portal; https://www.indiatodayne.in/nagaland/story/nagaland-makes-inner-line-permit-application-completely-online-mode-1213673-2025-05-14 — "all individuals seeking to apply for an Inner Line Permit will now be required to submit their applications digitally; applications at Dimapur/Kohima offices discontinued"

### 7. bhaderwah — new notice_text
- **Field:** notice_text (null → new notice)
- **Proposed:** "Since July 2026, all trekking, hiking, and camping in Bhaderwah subdivision requires prior written permission from the Additional Deputy Commissioner. Order under Section 163 BNSS, effective 3 July 2026, until further notice. General tourism unrestricted."
- **Source:** https://kashmirobserver.net/2026/07/08/govt-makes-permission-mandatory-for-trekking-camping-in-bhadarwah/ — "no individual, group, trekking agency, tour operator, guide, institution or organisation shall undertake, organise or facilitate any adventure activity in the territorial jurisdiction of Bhadarwah without obtaining prior written permission from the competent authority"

### 8. bundi — nearest_airport correction
- **Field:** nearest_airport
- **Current:** "Jaipur (210km) / Kota (35km)"
- **Proposed:** "Jaipur — 210km"
- **Source:** https://www.aai.aero/en/airports/kota — AAI page exists for Kota but confirms no current scheduled service; https://kotaguide.com/kota-airport/ — "Since 1997, there have been no scheduled operations at the existing Kota Airport"

### 9. pahalgam — new notice_text
- **Field:** notice_text (null → new notice)
- **Proposed:** "Baisaran Valley within Pahalgam is closed to tourists under Anantnag district administration order (July 2026, no reopening date as of Oct 2026). Pahalgam town, Betaab Valley and Aru Valley are open with heightened security. Australia, US, UK and Canada maintain 'Do Not Travel' advisories for J&K."
- **Source:** https://kashmirobserver.net/2026/04/21/pahalgam-attack-one-year-on-memory-holds-tourists-return/ — Baisaran Valley closed; tourists returning cautiously; heightened security; https://travel.state.gov/en/international-travel/travel-advisories/india.html — Level 4 Do Not Travel for J&K

## Manual escalations (not queueable this run — need additional research)

1. **namchi nearest_airport** — Pakyong Airport (PYG, 90km) has no scheduled commercial flights since ~Jun 2024, confirmed by aai.aero (zero results on schedule page) and EastMojo Sep 2025. Bagdogra (~95km) is the only functional option. Cannot queue until Bagdogra exact distance confirmed from southsikkim.nic.in or equivalent official source.

2. **nongriat nearest_airport** — Shillong/Umroi Airport AAI page shows no scheduled flights. DB lists "Shillong (80km)" which misleads travelers; Guwahati (~190km) is the practical arrival airport. Cannot queue until Guwahati distance confirmed from eastkhasihills.nic.in.

3. **bikaner nearest_airport** — Bikaner Nal Airport (BKB, 13km) confirmed in AAI network; IndiGo operates scheduled flights but aai.aero flight schedule is JS-rendered (no HTML quote). DB lists Jodhpur/Jaipur — outdated. Queue after confirming scheduled service from aai.aero directly or civilaviation.gov.in.

4. **chamba nearest_airport** — Pathankot Airport (IXP) may have no commercial service since 2025. Sources (Change.org, FlightRadar24) do not meet qualification standard. Verify via aai.aero/en/airports/pathankot.

5. **loktak-lake notice_text (Manipur conflict)** — Manipur ethnic conflict remains active; The Diplomat and EurasiaReview articles found but neither is in NEWS_HOSTS. Manual research needed with a qualifying news source (thehindu.com, ndtv.com) for a formal notice.

6. **namchi permit_required (Sikkim RAP e-FRRO)** — Physical RAP/PAP issuance discontinued Jan 2026 (ANI article in search index but returns 403 to crawler; cannot confirm reachability). Once ANI URL confirmed reachable, queue permit_required correction for namchi.

RESULT confirmed=32 corrections=9 skipped=0

## Wrapper outcome

```
queued wayanad: notice_text "Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026." → "Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026."; notice_source_url "https://www.onmanorama.com/news/kerala/2026/01/22/mundakkai-chooralmala-landslide-compensation-no-go-zone-land.html" → "https://www.onmanorama.com/news/kerala/2026/10/25/meppadi-chooralmala-road-public-outrage-boils-over-amid-delays-in-reconstruction.html"
queued khajuraho: nearest_railhead "Mahoba — 63km; Jhansi — 175km" → "Khajuraho (KURJ) — in town (Vande Bharat to Delhi & Varanasi)"
queued loktak-lake: permit_required "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilp.nic.in — free." → "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilponline.mn.gov.in — free."
queued bangus-valley: notice_text null → "Bangus Valley is closed to tourists under a J&K LG Administration order in force since April 2025, extended to 31 December 2026. No tourist access is permitted regardless of season."; notice_source_url null → "https://www.greaterkashmir.com/kashmir/2-years-on-kupwaras-bangus-valley-stays-shut-tourism-economy-suffers-12494255"
queued mawlynnong: notice_text null → "Mawlynnong village is closed to day-trippers every Sunday from January 2026 (Village Dorbar decision). Restaurants, shops, and public toilets are shut on Sundays. Overnight guests are exempt."; notice_source_url null → "https://www.etvbharat.com/en/state/asia-cleanest-village-in-meghalaya-to-be-closed-to-tourists-on-sundays-enn26012903986"
queued mon: permit_required "Inner Line Permit (ILP) required for all Indian citizens. Apply at Dimapur/Kohima." → "Inner Line Permit (ILP) required for all Indian citizens. Apply online at ilp.nagaland.gov.in (physical office applications discontinued from January 2025)."
queued bhaderwah: notice_text null → "Since July 2026, all trekking, hiking, and camping in Bhaderwah subdivision requires prior written permission from the Additional Deputy Commissioner. Order under Section 163 BNSS, effective 3 July 2026, until further notice. General tourism unrestricted."; notice_source_url null → "https://kashmirobserver.net/2026/07/08/govt-makes-permission-mandatory-for-trekking-camping-in-bhadarwah/"
queued bundi: nearest_airport "Jaipur (210km) / Kota (35km)" → "Jaipur — 210km"
queued pahalgam: notice_text null → "Baisaran Valley within Pahalgam is closed to tourists under Anantnag district administration order (July 2026, no reopening date as of Oct 2026). Pahalgam town, Betaab Valley and Aru Valley are open with heightened security. Australia, US, UK and Canada maintain 'Do Not Travel' advisories for J&K."; notice_source_url null → "https://kashmirobserver.net/2026/04/21/pahalgam-attack-one-year-on-memory-holds-tourists-return/"
stamped 32: omkareshwar, kargil, kasol, kokernag, kufri, anini, deeg, likir, lolab-valley, lunglei, kolkata, kumbhalgarh, barnawapara, mawphlang, mawsynram, mokokchung, lamayuru, morni-hills, mount-abu, bharatpur, nalanda, namchi, namdapha, neermahal, netarhat, nongriat, bir-billing, orchha, osian, bikaner, chamba, pachmarhi
RESULT stamped=32 valid=32 corrections=9 queued=9 queueable=9 escalated=0 dropped=0 unreviewed=0
```
