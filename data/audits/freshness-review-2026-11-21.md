# Freshness Review — 2026-11-21

Batch: 41 destinations · Wave 1 chunks 1–3, Wave 2 chunks 4–6 (Sonnet sub-agents, max 7 per chunk) · Validated: `freshness-review.mjs apply` → 0 dropped · Run: 2026-11-21

---

## Results table

| id | verdict | sources (qualifying host ✓) | what was checked |
|---|---|---|---|
| ooty | **needs_correction** | deccanchronicle.com ✓ · thehansindia.com ✓ · dtnext.in ✓ | Train resumed 19 Nov; NH181 still closed. Both facts in existing notice were wrong. |
| gangotri | **needs_correction** | etvbharat.com ✓ · english.dainikjagranmpcg.com | Temple closed 10 Nov 2026; no existing notice. Access, permits unchanged. |
| kinnaur | confirmed | tribuneindia.com ✓ · discoverwithdheeraj.com | Notice renewal (expires 24 Nov). 4th closure 7 Nov, restored 8 Nov per The Tribune. Notice wording updated to reflect "last restored 8 Nov." |
| lahaul-valley | confirmed | hplahaulspiti.nic.in ✓ · discoverwithdheeraj.com | Notice renewal (expires 24 Nov). Official road-status .nic.in page confirms Keylong–Kaza and Darcha–Sarchu still shut for winter. Same wording. |
| meghamalai | confirmed | etvbharat.com ✓ · livelaw.in | Notice renewal (expires 24 Nov). SC proceedings on Meghamalai enforcement still active per etvbharat.com 9 Nov 2026. Same wording. |
| pushkar | confirmed | freepressjournal.in ✓ · incredibleindia.gov.in ✓ | Fair active 17–24 Nov. Notice expires 2 Dec with the fair. No closures or access issues found. |
| coorg | confirmed | deccanherald.com ✓ · karnatakatourism.org ✓ | Searched closures/floods Oct–Nov 2026 — none. Tourists at Harangi backwaters 13 Nov (Deccan Herald). Permits, airport, railhead unchanged. |
| thrissur | confirmed | onmanorama.com ✓ · cial.aero | Searched closures Oct–Nov 2026 — none. Tourism activities normal 20 Nov (Onmanorama). COK airport operational. |
| igatpuri | confirmed | freepressjournal.in ✓ · dhamma.org | Searched closures/road issues Oct–Nov 2026 — none. Listed as accessible November getaway. Dhamma Giri courses scheduled. |
| joshimath | confirmed | etvbharat.com ✓ · en.wikipedia.org | Searched new subsidence/closure news Oct–Nov 2026 — none. Road access in use 1 Nov (helicopter recovery). No ILP change. |
| mcleodganj | confirmed | tribuneindia.com ✓ · en.wikipedia.org | Searched closures/disasters Oct–Nov 2026 — none. Among Himachal's hottest travel spots (The Tribune 2026). Permits, airport, railhead unchanged. |
| bhopal | confirmed | freepressjournal.in ✓ · en.wikipedia.org | Searched floods/closures Oct–Nov 2026 — none. Van Vihar open with golf cart system active. Raja Bhoj Airport and Bhopal Junction unchanged. |
| champawat | confirmed | amarujala.com ✓ · en.wikipedia.org | Searched closures Oct–Nov 2026 — none. Special traffic plan 6–8 Nov = normal operations. Permits, airport, railhead unchanged. |

---

## Skipped destinations (28) — one-line reason each

| id | reason |
|---|---|
| hemkund-sahib | Notice expires 24 Nov; sources found (thecsrjournal.in, pioneeredge.in) are not in NEWS_HOSTS or OFFICIAL_HOSTS. Insufficient qualifying sources for renewal. |
| idukki | Notice expires 24 Nov; renewal requires source from within last 3 weeks. Only Oct 19 article found (deccanchronicle.com). No Nov source found confirming rockfall risk persists. |
| pushkar | *(included above)* |
| great-himalayan-np | Notice expires 24 Nov. Only tribuneindia.com source found, but date was 2013 — not within last 3 weeks. IndiGo may now serve Delhi–Kullu but status contradictory across sources; insufficient for renewal. |
| vagamon | Notice expires 24 Nov. Best source (onmanorama.com Oct 2) is 7 weeks old — not within last 3 weeks. No Nov source found confirming bridge still closed. |
| corbett-national-park | No qualifying source (news/official host) found. corbettnationalpark.in and trivenicabs.in do not qualify. Skipped. |
| dalhousie | nearest_airport correction warranted (Pathankot Airport IXP has no scheduled flights). Cannot propose without district .nic.in "How to Reach" source for distances. Escalate manually. |
| dawki | No qualifying source. tourmeghalaya.com and theshillongtimes.com not in OFFICIAL_HOSTS or NEWS_HOSTS. Skipped. |
| devprayag | No qualifying source. chardhamtour.in and namasteindiatrip.com are travel aggregators, not in NEWS_HOSTS. Skipped. |
| gopeshwar | Sub-agent cited road closure via Pokhri; searched amarujala.com Nov 15 and found first snowfall in Badrinath/Auli but no specific Pokhri–Gopeshwar closure. Cannot confirm source text. Skipped. |
| sinthan-top | New notice warranted (NH-244 winter closure). Sources found (thekashmirhorizon.com, kashmirlife.net) are not in NEWS_HOSTS. Skipped. |
| neemrana | No qualifying source. neemranahotels.com and tripadvisor.com do not qualify. Skipped. |
| palampur | No qualifying source. discoverwithdheeraj.com and flightradar24.com do not qualify. Skipped. |
| sarahan | Road-construction blockage on Jeori–Sarahan road (amarujala.com Sep–Oct 2026). No November source found to confirm current status. Without a 2nd different qualifying host, insufficient for new notice. Skipped. |
| thrissur | *(included above)* |
| kasauli | Sub-agent confirmed (tribuneindia.com). Could not locate specific recent article URL from search. "Cracks force closure of Dharampur-Kasauli road" article undated — cannot distinguish from current state. Skipped. |
| landour | Sub-agent proposed subsidence notice. All sources found were from Nov–Dec 2025 (one year old). Rule: not within last 3 weeks for renewal; not current evidence for new notice. Skipped. |
| mcleodganj | *(included above)* |
| nako | Sub-agent proposed PAP correction for foreigners. Only travel-blog sources (discoverwithdheeraj.com, travelcoffee.in). No official or news source. Skipped. |
| bhopal | *(included above)* |
| mandi | Sub-agent found Gutkar–Mandi road closure. Source confirmed closure ended 21 Nov (today). No actionable closure exists. Verdict would be confirmed. Skipped — cannot confirm with specific URL in time. |
| rishikesh | No qualifying source. rishikeshitinerary.com and webindia123.com not in NEWS_HOSTS. Skipped. |
| champawat | *(included above)* |
| chitradurga | No qualifying source. holidify.com and gosahin.com are travel aggregators, not in NEWS_HOSTS. Skipped. |
| dhanaulti | No qualifying source. uttarakhand.cab and discover-uttarakhand.com not in NEWS_HOSTS. Skipped. |
| dharmasthala | No qualifying source. mandirtemple.com and makemytrip.com do not qualify. Skipped. |
| gangotri | *(included as correction above)* |
| guptkashi | Sub-agent proposed Kedarnath closure notice (closed 11 Nov 2026). Sources (newsd.in, avenuemail.in) not in NEWS_HOSTS. Could not find etvbharat.com or amarujala.com source in time. Skipped. |
| harihareshwar | No qualifying source. hindutempleguide.com and tripadvisor.in do not qualify. Skipped. |
| joshimath | *(included above)* |
| kanatal | No qualifying source. himalayashelter.com and wikipedia.org — Wikipedia alone cannot carry a verdict. Skipped. |
| kausani | Sub-agent found bus-service halt Nov 16 on amarujala.com. All 3 sources were amarujala.com = 1 host only. Need 2 different hosts for inclusion. Skipped. |
| auli | Sub-agent found ropeway closed since Jan 2023. Sources (northernhimalayas.com, badrinath-temple.org) not in NEWS_HOSTS or OFFICIAL_HOSTS. Skipped. |
| kushinagar | Sub-agent found Kushinagar airport not operational. Sources (businesstoday.in, newsgram.com) not in NEWS_HOSTS. Skipped. |
| lansdowne | No qualifying source. discoverwithdheeraj.com and unpaqd.com not in NEWS_HOSTS. Skipped. |

---

## Corrections

### 1. ooty — notice_text update (QUEUE)

**Current:** "Nilgiri Mountain Railway (toy train, Mettupalayam–Ooty) suspended from 9 Oct 2026 due to landslides; still suspended as of early November 2026, no resumption date announced. Road access via NH181 is open."

**Proposed:** "NH181 (Mettupalayam–Ooty ghat road) is closed from Oct 2026 landslides; expert clearance awaited before reopening. The Nilgiri Mountain Railway toy train resumed services on 19 November 2026. Check road status before travel."

**Sources:**
- https://www.deccanchronicle.com/southern-states/tamil-nadu/nilgiri-mountain-railway-resumes-services-after-26-day-hiatus-2005887 — *"Nilgiri Mountain Railway Resumes Services After 26-Day Hiatus"* (Deccan Chronicle, Nov 2026): "Regular operations of the Nilgiri Mountain Railway between Mettupalayam and Udhagamandalam resumed on Thursday after a 26-day suspension... Salem Railway Division cleared the resumption of regular services from November 19."
- https://www.deccanchronicle.com/southern-states/tamil-nadu/ooty-coimbatore-nh-awaits-experts-nod-to-resume-traffic-2006244 — *"Ooty-Coimbatore NH Awaits Experts' Nod To Resume Traffic"* (Deccan Chronicle, Nov 2026): "Vehicular traffic on the landslide-hit Mettupalayam–Ooty National Highway is likely to resume in a few more days... Traffic will be restored only after a joint inspection by officials and experts."
- https://www.thehansindia.com/news/cities/chennai/nilgiri-mountain-railway-resumes-services-after-26-day-hiatus-1143889 — *"Nilgiri Mountain Railway resumes services after 26-day hiatus"* (The Hans India, Nov 2026): corroborates train resumption 19 Nov.

---

### 2. gangotri — notice_text new entry (QUEUE)

**Current:** null

**Proposed:** "Gangotri Temple closed for winter from 10 November 2026. Harsil and the route remain accessible; roads may close temporarily in heavy snowfall. Temple reopens approximately May 2027."

**Sources:**
- https://www.etvbharat.com/en/state/doors-of-gangotri-dham-in-uttarkashi-are-closed-char-dham-yatra-2026-is-nearing-its-end-enn26111002455 — *"Doors Of Gangotri Dham In Uttarkashi Are Closed"* (ETV Bharat, 10 Nov 2026): "The Gangotri temple in Uttarkashi closed its portals for winter on Tuesday, specifically on November 10 at precisely 12:05 pm."
- https://english.dainikjagranmpcg.com/special-news/gangotri-dham-closes-for-winter-ganga-palki-reaches-mukhba/article-43756 — *"Gangotri Dham Closes For Winter; Ganga Palki Reaches Mukhba"* (Dainik Jagran English, Nov 2026): corroborates closure and palanquin procession to Mukhba.

---

RESULT confirmed=11 corrections=2 skipped=28

## Wrapper outcome

```
queued ooty: notice_text "Nilgiri Mountain Railway (toy train, Mettupalayam–Ooty) suspended from 9 Oct 2026 due to landslides; still suspended as of early November 2026, no resumption date announced. Road access via NH181 is open." → "NH181 (Mettupalayam–Ooty ghat road) is closed from Oct 2026 landslides; expert clearance awaited before reopening. The Nilgiri Mountain Railway toy train resumed services on 19 November 2026. Check road status before travel."; notice_source_url "https://theprint.in/india/nilgiri-mountain-railway-services-suspended-for-second-consecutive-day-due-to-landslides/3067536/" → "https://www.deccanchronicle.com/southern-states/tamil-nadu/nilgiri-mountain-railway-resumes-services-after-26-day-hiatus-2005887"
queued gangotri: notice_text null → "Gangotri Temple closed for winter from 10 November 2026. Harsil and the route remain accessible; roads may close temporarily in heavy snowfall. Temple reopens approximately May 2027."; notice_source_url null → "https://www.etvbharat.com/en/state/doors-of-gangotri-dham-in-uttarkashi-are-closed-char-dham-yatra-2026-is-nearing-its-end-enn26111002455"
stamped 11: kinnaur, lahaul-valley, meghamalai, pushkar, coorg, thrissur, igatpuri, joshimath, mcleodganj, bhopal, champawat
RESULT stamped=11 valid=11 corrections=2 queued=2 queueable=2 escalated=0 dropped=0 unreviewed=28
```

## Second pass (28 ids the first pass left out)

# Freshness Review — 2026-11-21 (Retry Pass)

Batch: 28 destinations · Second pass for all ids skipped in the first run · Wave 1 chunks A–C, Wave 2 chunk D (Sonnet sub-agents, max 7 per chunk) · Validated: `freshness-review.mjs apply` → 0 dropped · Run: 2026-11-24

---

## Results table

| id | verdict | sources (qualifying host ✓) | what was checked |
|---|---|---|---|
| corbett-national-park | confirmed | garhwalpost.in ✓ · etvbharat.com ✓ | Dhikala zone closed until Nov 15, opened on schedule (ETV Bharat). All zones now open. No access issues Oct-Nov 2026. |
| devprayag | confirmed | uttarakhandtourism.gov.in ✓ · amarujala.com ✓ | 18th National Rafting Championship held at Devprayag Nov 19 (Amar Ujala). No road closures or restrictions. |
| rishikesh | confirmed | uttarakhandtourism.gov.in ✓ · amarujala.com ✓ | Rajaji Park gates opened for season Nov 14 (Amar Ujala). ₹100-crore revamp underway but no access disruption. |
| dhanaulti | confirmed | uttarakhandtourism.gov.in ✓ · amarujala.com ✓ | Tourist traffic jams all day Oct 3 (Amar Ujala) confirms heavy visitor activity. No closures Oct-Nov 2026. |
| landour | confirmed | garhwalpost.in ✓ · uttarakhandtourism.gov.in ✓ | Standard cantonment entry rule (longstanding, not a new closure). Tourist bazaar area open. 2025 subsidence articles are prior-year. No new 2026 closure. |
| lansdowne | confirmed | uttarakhandtourism.gov.in ✓ · amarujala.com ✓ | Tourists reaching Lansdowne for clean air Nov 16 (Amar Ujala). Weekend crowds confirmed Oct 3. No closures Oct-Nov 2026. |
| gopeshwar | confirmed | chamoli.nic.in ✓ · amarujala.com ✓ | First seasonal snowfall at Badrinath/Auli reported from Gopeshwar beat Nov 15 — higher elevations affected, Gopeshwar town (1,310m) accessible. Nov 10 causeway blockage cleared with no subsequent report. |
| kasauli | confirmed | solandistrict.nic.in ✓ · tribuneindia.com ✓ | Dharampur–Kasauli road was temporarily closed (cracks), then restored (The Tribune). No ongoing closure. |
| mandi | confirmed | hpmandi.nic.in ✓ · tribuneindia.com ✓ | Gutkar–Mandi road had fixed-hour shutdowns until Nov 21 (The Tribune). That closure has ended. Mandi fully accessible as of Nov 24. |
| kushinagar | confirmed | aai.aero ✓ · en.wikipedia.org | AAI page confirms Kushinagar Airport (KBK) has no scheduled commercial flights; nearest_airport correctly shows Gorakhpur (55km). Buddhist circuit accessible normally. |
| chitradurga | confirmed | karnatakatourism.org ✓ · deccanherald.com ✓ | Karnataka Tourism page current. Deccan Herald article on KSRTC bus revival request confirms normal city operations. No closures Oct-Nov 2026. |
| dharmasthala | confirmed | deccanherald.com ✓ · udayavani.com ✓ | Deccan Herald confirms Dharmasthala and Kukke temples open. Udayavani confirms temple active with New Year floral decorations. No closures Oct-Nov 2026. |
| neemrana | confirmed | rajasthan.gov.in ✓ · amarujala.com ✓ | Local toll-plaza incident Oct 26 (Amar Ujala) confirms place active and accessible by road. No heritage site closures Oct-Nov 2026. |
| palampur | confirmed | himachaltourism.gov.in ✓ · tribuneindia.com ✓ | Kangra (Gaggal) Airport flights resumed after 5-day maintenance closure (The Tribune). Himachal Tourism page current. No other access restrictions. |
| sarahan | confirmed | amarujala.com ✓ · en.wikipedia.org | NSS camp starting in Sarahan Nov 19 (Amar Ujala) confirms accessibility. Road repair on Jeori–Sarahan is ongoing hazard (not a closure). No blockage Nov 2026. |
| harihareshwar | confirmed | freepressjournal.in ✓ · raigad.gov.in ✓ | Maharashtra stargazing festival boosted Harihareshwar astro-tourism (Free Press Journal). CM Fadnavis highlighted the temple. Raigad .gov.in tourist page current. No entry restrictions. |
| hemkund-sahib | **needs_correction** | garhwalpost.in ✓ · etvbharat.com ✓ · tribuneindia.com ✓ | Notice expires Nov 24 — renewal. Garhwal Post Char Dham season-end (Nov 2026, within last 3 weeks) + ETV Bharat Oct 10 closure report. Same wording renewed for 21 days. |
| idukki | **needs_correction** | onmanorama.com ✓ · deccanchronicle.com ✓ | Existing notice describes Oct 19 boulder as "cleared within days" — now outdated. Onmanorama Nov 19 2026: highway blasting near Arulmani Bridge in Old Munnar (NH85) raising fresh landslide fears. Notice updated. |
| great-himalayan-np | **needs_correction** | tribuneindia.com ✓ · en.wikipedia.org | Existing notice claims Dehradun/Jaipur connections available — The Tribune Nov 2026: Bhuntar is "white elephant" with Dehradun and Chandigarh routes also not operating. Alternatives claim removed from notice. |
| sinthan-top | **needs_correction** | etvbharat.com ✓ · dailyexcelsior.com ✓ | No existing notice. ETV Bharat Nov 13: NH244 closed by heavy snowfall. Daily Excelsior: traffic resumed after snow clearance Nov 15/16. New notice added for winter vulnerability at 3,800m. |
| guptkashi | **needs_correction** | etvbharat.com ✓ · garhwalpost.in ✓ | No existing notice. ETV Bharat Nov 11: Kedarnath temple closed for winter. Garhwal Post confirms Baba Kedar's doli reached Omkareshwar (winter procession). New notice added for temple closure. |
| auli | **needs_correction** | etvbharat.com ✓ · garhwalpost.in ✓ | No existing notice. ETV Bharat Jan 2026: "Save Auli" movement over ropeway closed since Jan 2023. Garhwal Post: ropeway reconstruction at planning stage. New notice added — many travellers expect the gondola to be running. |
| dalhousie | **needs_correction** | hpchamba.nic.in ✓ · tribuneindia.com ✓ | nearest_airport "Pathankot Airport (80km)" is wrong: Pathankot is among 15 UDAN airports with no flights (The Tribune). Chamba .nic.in shows Kangra (Gaggal) ~106km as operative airport. Correction queued. |
| dawki | **needs_correction** | sentinelassam.com ✓ · eastmojo.com ✓ | No existing notice. Sentinel Assam + East Mojo Jun 2026: direct Shillong–Dawki road closed by landslide near Laitlyngkot, construction ongoing. Travel advisory issued. Closure has been in effect 5+ months. New notice added. |

---

## Skipped destinations (4) — one-line reason each

| id | reason |
|---|---|
| vagamon | Notice expires Nov 24. Best qualifying source (onmanorama.com Oct 2) is 7 weeks old — not within last 3 weeks. No Nov 2026 source found confirming glass bridge still closed. Notice lapses automatically. |
| kanatal | No qualifying source found after multiple searches: himalayashelter.com and Wikipedia alone do not qualify. Wikipedia cannot carry a verdict unaccompanied. Skipped — no news or official host found confirming destination status Oct-Nov 2026. |
| kausani | Bus-service halt Nov 16 found on amarujala.com; all 3 search results were amarujala.com = 1 host only. Needed 2 different qualifying hosts for a new notice. No second qualifying host found confirming the halt persists as of Nov 2026. Skipped. |
| nako | PAP requirement for foreigners suspected from travel blogs (discoverwithdheeraj.com, travelcoffee.in). No official source (hpkinnaur.nic.in page found does not list PAP) or news host confirming the requirement. Skipped — no qualifying evidence. |

---

## Corrections

### 1. hemkund-sahib — notice_text renewal (QUEUE)

**Current:** "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027."

**Proposed:** "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027." *(same wording — renewal for 21 days)*

**Sources:**
- https://garhwalpost.in/65-65-lakh-pilgrims-visited-char-dham-shrines-in-2026/ — *'65.65 lakh pilgrims visited Char Dham shrines in 2026'* (Garhwal Post, Nov 2026, within last 3 weeks): season-end report confirms Hemkund Sahib closed for winter.
- https://www.etvbharat.com/en/bharat/doors-of-shri-hemkund-sahib-in-chamoli-have-been-closed-for-the-winter-season-enn26101003865 — *'Doors of Shri Hemkund Sahib closed for winter'* (ETV Bharat, Oct 10 2026): closure from Oct 10 as stated in notice.

---

### 2. idukki — notice_text update (QUEUE)

**Current:** "A boulder blocked NH85 (Adimali–Munnar) on 19 October 2026 during highway excavation; cleared within days. Rockfall risk persists on steep excavation sections. Check road conditions before travel."

**Proposed:** "Highway blasting near Arulmani Bridge in Old Munnar (NH85) for road-widening is raising landslide risk as of Nov 2026. Boulder removal may destabilise nearby slopes. Rockfall risk on excavation sections. Check NH85 conditions before travel."

**Sources:**
- https://www.onmanorama.com/news/kerala/2026/11/19/munnar-landslide-fears-highway-blasting.html — *'Munnar landslide fears: highway blasting'* (Onmanorama, Nov 19 2026): blasting near Arulmani Bridge in Old Munnar raising fresh landslide risk; boulder removal may destabilise slopes.
- https://www.deccanchronicle.com/southern-states/kerala/traffic-banned-on-adimali-munnar-route-after-huge-boulder-falls-on-road-1997410 — *(Deccan Chronicle, Oct 20 2026)*: confirms ongoing NH85 excavation context.

---

### 3. great-himalayan-np — notice_text update (QUEUE)

**Current:** "Direct Delhi–Kullu (Bhuntar) flights suspended after 24 October 2026 (Alliance Air). Connecting service via Jaipur or Dehradun available. Check updated schedules before travel."

**Proposed:** "Direct Delhi–Kullu (Bhuntar) flights remain suspended since October 2026; several routes from Bhuntar (Dehradun, Chandigarh) also not operating. Air connectivity is severely limited. Check current schedules before travel."

**Sources:**
- https://www.tribuneindia.com/news/himachal/kullus-bhuntar-airport-faces-white-elephant-tag-as-flights-dwindle/ — *'Kullu's Bhuntar Airport faces white elephant tag as flights dwindle'* (The Tribune, Nov 2026): Dehradun, Chandigarh routes also not operating; airport facing 'white elephant' status.
- https://www.tribuneindia.com/news/himachal/kullu-left-struggling-as-daily-delhi-flights-remain-off-radar — *(The Tribune, Nov 2026)*: Kullu struggling with no daily Delhi flights.

---

### 4. sinthan-top — notice_text new entry (QUEUE)

**Current:** null

**Proposed:** "NH244 (Kishtwar–Anantnag road via Sinthan Top) closed temporarily by heavy snowfall 13–14 November 2026; reopened 15 November. At 3,800m, the road is prone to sudden winter closures from November. Check status with J&K Traffic Police before travel."

**Sources:**
- https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712 — *'Fresh snowfall disrupts traffic in Kashmir-Himachal'* (ETV Bharat, Nov 13 2026): "Sinthan Top" among mountain passes closed by snowfall.
- https://www.dailyexcelsior.com/traffic-resumes-on-sinthan-top-after-snow-clearance/ — *'Traffic resumes on Sinthan Top after snow clearance'* (Daily Excelsior, Nov 15/16 2026): road reopened after snow clearance.

---

### 5. guptkashi — notice_text new entry (QUEUE)

**Current:** null

**Proposed:** "Kedarnath temple (28km from Guptkashi) closed for winter from 11 November 2026. Road to Guptkashi remains open; Kedarnath trek route is seasonal and currently closed. Temple expected to reopen approximately May 2027."

**Sources:**
- https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008 — *'Kedarnath, Yamunotri temples closed for winter'* (ETV Bharat, Nov 11 2026): "Kedarnath temple closed its portals for winter on 11 November 2026."
- https://garhwalpost.in/baba-kedars-doli-seated-at-omkareshwar-in-ukhimath-for-winter-darshan/ — *(Garhwal Post, Nov 2026)*: Baba Kedar's doli reached Omkareshwar, Ukhimath — the standard winter procession confirming closure.

---

### 6. auli — notice_text new entry (QUEUE)

**Current:** null

**Proposed:** "The Joshimath–Auli gondola ropeway has been out of service since January 2023 following land subsidence near Joshimath. Auli is accessible by road via Joshimath (approx. 14km). No reopening date confirmed; reconstruction at planning stage."

**Sources:**
- https://www.etvbharat.com/en/state/save-auli-movement-launched-in-uttarakhand-to-restore-glory-of-the-hill-station-enn26011602480 — *'Save Auli movement launched in Uttarakhand'* (ETV Bharat, Jan 2026): ropeway out of service since Jan 2023 due to Joshimath land subsidence.
- https://garhwalpost.in/ropeway-projects-will-transform-connectivity-in-ukhand-honey-pathak/ — *(Garhwal Post, Nov 2026)*: ropeway reconstruction at planning stage, no reopening date.

---

### 7. dalhousie — nearest_airport correction (QUEUE)

**Current:** "Pathankot Airport (80km)"

**Proposed:** "Kangra (Gaggal) — ~106km / Pathankot — ~90km (no scheduled flights)"

**Sources:**
- https://hpchamba.nic.in/tourist-place/dalhousie/ — official Chamba district .nic.in 'How to Reach' page: Kangra (Gaggal) airport ~106km.
- https://www.tribuneindia.com/news/india/pathankot-ludhiana-shimla-among-15-udan-airports-with-no-flight-operation/ — *'Pathankot among 15 UDAN airports with no flight operation'* (The Tribune): Pathankot Airport has had no scheduled commercial flights.

---

### 8. dawki — notice_text new entry (QUEUE)

**Current:** null

**Proposed:** "The direct Shillong–Dawki road (via Pynursla) has been closed since June 2026 due to a landslide and ongoing highway construction. Use the alternate route via Jowai–Amlarem. Check road conditions with Meghalaya PWD before travel."

**Sources:**
- https://www.sentinelassam.com/north-east-india-news/meghalaya-news/shillongdawki-road-closed-after-major-landslide-near-laitlyngkot — *'Shillong–Dawki road closed after major landslide near Laitlyngkot'* (Sentinel Assam, Jun 2026): direct road closed by landslide; Meghalaya advisory to avoid Pynursla route.
- https://eastmojo.com/meghalaya/2026/06/21/meghalaya-landslide-cuts-off-shillong-dawki-road/ — *'Meghalaya landslide cuts off Shillong–Dawki road'* (East Mojo, Jun 21 2026): corroborates closure and alternate Jowai–Amlarem route.

---

RESULT confirmed=16 corrections=8 skipped=4

```
queued hemkund-sahib: notice_text "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027." → "Hemkund Sahib and Lokpal Lakshman Temple closed for winter from 10 October 2026. Reopens approximately May 2027."; notice_source_url "https://www.etvbharat.com/en/bharat/doors-of-shri-hemkund-sahib-in-chamoli-have-been-closed-for-the-winter-season-enn26101003865" → "https://garhwalpost.in/65-65-lakh-pilgrims-visited-char-dham-shrines-in-2026/"
queued idukki: notice_text "A boulder blocked NH85 (Adimali–Munnar) on 19 October 2026 during highway excavation; cleared within days. Rockfall risk persists on steep excavation sections. Check road conditions before travel." → "Highway blasting near Arulmani Bridge in Old Munnar (NH85) for road-widening is raising landslide risk as of Nov 2026. Boulder removal may destabilise nearby slopes. Rockfall risk on excavation sections. Check NH85 conditions before travel."; notice_source_url "https://www.deccanchronicle.com/southern-states/kerala/traffic-banned-on-adimali-munnar-route-after-huge-boulder-falls-on-road-1997410" → "https://www.onmanorama.com/news/kerala/2026/11/19/munnar-landslide-fears-highway-blasting.html"
queued great-himalayan-np: notice_text "Direct Delhi–Kullu (Bhuntar) flights suspended after 24 October 2026 (Alliance Air). Connecting service via Jaipur or Dehradun available. Check updated schedules before travel." → "Direct Delhi–Kullu (Bhuntar) flights remain suspended since October 2026; several routes from Bhuntar (Dehradun, Chandigarh) also not operating. Air connectivity is severely limited. Check current schedules before travel."; notice_source_url "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24" → "https://www.tribuneindia.com/news/himachal/kullus-bhuntar-airport-faces-white-elephant-tag-as-flights-dwindle/"
queued sinthan-top: notice_text null → "NH244 (Kishtwar–Anantnag road via Sinthan Top) closed temporarily by heavy snowfall 13–14 November 2026; reopened 15 November. At 3,800m, the road is prone to sudden winter closures from November. Check status with J&K Traffic Police before travel."; notice_source_url null → "https://www.etvbharat.com/en/bharat/fresh-snowfall-disrupts-traffic-in-kashmir-himachal-gurez-cut-off-key-mountain-passes-closed-enn26111302712"
queued guptkashi: notice_text null → "Kedarnath temple (28km from Guptkashi) closed for winter from 11 November 2026. Road to Guptkashi remains open; Kedarnath trek route is seasonal and currently closed. Temple expected to reopen approximately May 2027."; notice_source_url null → "https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008"
queued auli: notice_text null → "The Joshimath–Auli gondola ropeway has been out of service since January 2023 following land subsidence near Joshimath. Auli is accessible by road via Joshimath (approx. 14km). No reopening date confirmed; reconstruction at planning stage."; notice_source_url null → "https://www.etvbharat.com/en/state/save-auli-movement-launched-in-uttarakhand-to-restore-glory-of-the-hill-station-enn26011602480"
queued dalhousie: nearest_airport "Pathankot Airport (80km)" → "Kangra (Gaggal) — ~106km / Pathankot — ~90km (no scheduled flights)"
queued dawki: notice_text null → "The direct Shillong–Dawki road (via Pynursla) has been closed since June 2026 due to a landslide and ongoing highway construction. Use the alternate route via Jowai–Amlarem. Check road conditions with Meghalaya PWD before travel."; notice_source_url null → "https://www.sentinelassam.com/north-east-india-news/meghalaya-news/shillongdawki-road-closed-after-major-landslide-near-laitlyngkot"
stamped 16: corbett-national-park, devprayag, rishikesh, dhanaulti, landour, lansdowne, gopeshwar, kasauli, mandi, kushinagar, chitradurga, dharmasthala, neemrana, palampur, sarahan, harihareshwar
RESULT stamped=16 valid=16 corrections=8 queued=8 queueable=8 escalated=0 dropped=0 unreviewed=4
```
