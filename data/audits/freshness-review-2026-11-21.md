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
