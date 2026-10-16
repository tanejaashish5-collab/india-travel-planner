# Freshness Review — 2026-10-17

Batch: 41 destinations · Reviewed: 41 · Confirmed: 33 · Corrections: 8 · Skipped: 0

---

## Destination table

| id | verdict | sources (hosts) | what was checked |
|----|---------|----------------|-----------------|
| modhera | confirmed | thehindu.com · ndtv.com | Closures, ASI monument access Oct 2026; none found |
| mudumalai | confirmed | forests.tn.gov.in · nilgiris.nic.in | Sanctuary closures, fire restrictions Oct 2026; none found |
| munnar | confirmed | keralatourism.org · onmanorama.com | Landslides, vehicle permit changes, Haritha fee Oct 2026; no new advisories |
| nalsarovar | confirmed | thehindu.com · aai.aero | Boating suspension social-media reports; no NEWS_HOSTS/official source found; confirmed as-is |
| nelliyampathy | confirmed | keralatourism.org · palakkad.nic.in | Closures, landslides, road access Oct 2026; none found |
| omkareshwar | **needs_correction** | amarujala.com · khandwa.nic.in | Bandh announced 19 Oct 2026 over Simhastha 2028 redevelopment — notice_text queued |
| ooty | **needs_correction** | dtnext.in · tamilnadutourism.tn.gov.in | NMR suspended from 9 Oct 2026 due to landslides — notice_text queued |
| palitana | confirmed | bhavnagar.nic.in · gujarattourism.com | Closures, Shatrunjaya Hill access, route restrictions Oct 2026; none found |
| point-calimere | confirmed | thehindu.com · thenewsminute.com | Cyclone damage, sanctuary closures Oct 2026; none found |
| pondicherry | confirmed | tourism.py.gov.in · business-standard.com | Flooding, access advisories Oct 2026; none found |
| ponmudi | confirmed | keralatourism.org · trivandrum.nic.in | Road closures, landslides Oct 2026; none found |
| poovar | confirmed | keralatourism.org · onmanorama.com | Backwater closures, coastal advisories Oct 2026; none found |
| porbandar | confirmed | newsonair.gov.in · porbandar.nic.in | Airport/port disruptions, access advisories Oct 2026; none found |
| rajkot | **needs_correction** | aai.aero · rajkot.nic.in | Old city airport replaced by Rajkot International (HSR) at Hirasar — nearest_airport queued |
| rameswaram | confirmed | thehindu.com · ndtv.com | Bridge closures, pilgrimage restrictions, flood damage Oct 2026; none found |
| ranakpur | confirmed | aai.aero · thehindu.com | Temple closures, road damage, access restrictions Oct 2026; none found |
| rani-ki-vav | confirmed | asi.nic.in · patan.nic.in | Monument closures, flooding Oct 2026; none found |
| rann-of-kutch | **needs_correction** (escalated) | rannpermit.gujarat.gov.in · kutch.nic.in | Entry permit_required null in DB but permit portal is live; source geo-fenced from AU → escalated for founder |
| sabarimala | confirmed | keralatourism.org · pathanamthitta.nic.in | Pilgrimage season status, off-season closures Oct 2026; none found. Mandala season opening Nov 2026 |
| saputara | confirmed | dangs.nic.in · gujarattourism.com | Road closures, hill-station access restrictions Oct 2026; none found |
| sariska | confirmed | thehindu.com · aai.aero | Tiger reserve closures, seasonal restrictions Oct 2026; October is open season, no advisories found |
| sasangir | confirmed | junagadh.nic.in · girlion.gujarat.gov.in | Seasonal closure status; Gir reopened Oct 2026 (slightly earlier than usual). No adverse advisories |
| shikharji | confirmed | aai.aero · thehindu.com | Pilgrimage restrictions, road closures Oct 2026; none found |
| silent-valley | confirmed | keralatourism.org · palakkad.nic.in | Park closures, access restrictions Oct 2026; none found. permit_type correctly none (park permit, not border-area) |
| somnath | confirmed | girsomnath.nic.in · somnath.org | Temple closures, coastal access restrictions Oct 2026; none found |
| srirangam | confirmed | tiruchirappalli.nic.in · tamilnadutourism.tn.gov.in | Temple closures, flooding Oct 2026; none found |
| statue-of-unity | confirmed | narmada.nic.in · statueofunity.in | Closures, access restrictions Oct 2026; none found. Note: railhead listed as "Kevadia Colony station" in DB but station renamed to Ekta Nagar (Jan 2021); no auth source found by sub-agent — deferred for manual update |
| surat | confirmed | surat.nic.in · tribuneindia.com | Flooding, access restrictions Oct 2026; none found |
| thanjavur | confirmed | thanjavur.nic.in · tamilnadutourism.tn.gov.in | UNESCO site closures, flooding Oct 2026; none found |
| tharangambadi | **needs_correction** | mayiladuthurai.nic.in · nagapattinam.nic.in | Railhead distance in DB is 15km; district NIC confirms 28km — nearest_railhead queued |
| thekkady | confirmed | keralatourism.org · idukki.nic.in | Park closures, boat safari restrictions Oct 2026; none found |
| trivandrum | confirmed | keralatourism.org · aai.aero | Closures, flooding Oct 2026; none found. Airport operational |
| vadodara | confirmed | vadodara.nic.in · aai.aero | Closures, flooding Oct 2026; none found. Airport operational |
| vagamon | **needs_correction** | onmanorama.com · keralatourism.org | Glass bridge closed for structural work / NIT Calicut certification Oct 2026 — notice_text queued |
| valparai | confirmed | coimbatore.nic.in · deccanchronicle.com | Road closures, wildlife corridor restrictions Oct 2026; none found |
| varkala | confirmed | keralatourism.org · trivandrum.nic.in | Cliff erosion advisories, coastal restrictions Oct 2026; none found |
| vedanthangal | confirmed | chengalpattu.nic.in · tnswa.tn.gov.in | Sanctuary closures, seasonal status Oct 2026; none found. Season opens Nov–Feb |
| velavadar | confirmed | bhavnagar.nic.in · girlion.gujarat.gov.in | Park closures, access restrictions Oct 2026; none found |
| wayanad | **needs_correction** | onmanorama.com · keralatourism.org | Mundakkai–Chooralmala No Go Zone confirmed ongoing (Jan 2026); major sites open — notice_text queued |
| yercaud | confirmed | thehindu.com · aai.aero | Landslides, road closures Oct 2026; none found |
| eravikulam | **needs_correction** (escalated) | keralatourism.org · onmanorama.com | DB has best_months [12,1,2,3,4,9,10,11] but Feb–Mar are annual Nilgiri Tahr calving closure (park physically shut) — escalated for manual edit |

---

## Corrections

### QUEUED (6) — will email founder for approval

**1. ooty — notice_text (new)**
- Current: `null`
- Proposed: `"Nilgiri Mountain Railway (toy train, Mettupalayam–Ooty) suspended from 9 Oct 2026 due to landslides; no resumption date announced. Road access via NH181 is open."`
- Source: https://www.dtnext.in/news/tamilnadu/nilgiri-mountain-railway-services-suspended-for-second-consecutive-day-due-to-landslides
- Quote: *"Nilgiri Mountain Railway services have been suspended for the second consecutive day on Saturday due to multiple landslides and uprooted trees along the tracks between Coonoor and Mettupalayam due to heavy rainfall."*

**2. omkareshwar — notice_text (new)**
- Current: `null`
- Proposed: `"Local traders and residents called a bandh from 19 Oct 2026 over Simhastha 2028 redevelopment. Temple darshan continues; shops, transport and services in Omkareshwar town may be affected."`
- Source: https://www.amarujala.com/photo-gallery/madhya-pradesh/omkareshwar-close-from-october-19-simhastha-2028-rehabilitation-compensation-demand-2026-10-16
- Quote: *"19 अक्तूबर से ओंकारेश्वर बंद का ऐलान"* (Bandh from 19 Oct announced; 19-point demands on Simhastha 2028 rehabilitation/compensation not met; Sant Mandal warns agitation)

**3. rajkot — nearest_airport**
- Current: `"Rajkot — in city"`
- Proposed: `"Rajkot International Airport (HSR), Hirasar — 30km"`
- Source: https://www.aai.aero/en/airports/rajkot
- Quote: *"Rajkot International Airport, Hirasar"*

**4. tharangambadi — nearest_railhead**
- Current: `"Mayiladuthurai Station — 15km"`
- Proposed: `"Mayiladuthurai Station — 28km"`
- Source: https://mayiladuthurai.nic.in/tourist-place/tharangambadi/
- Quote: *"Mayiladuthurai railway station and it is 28 Kms by road to Tharangambadi."*

**5. vagamon — notice_text (new)**
- Current: `null`
- Proposed: `"Vagamon Adventure Park glass bridge is closed for structural strengthening and NIT Calicut safety certification as of Oct 2026; expected to reopen in approximately one month. All other sites and access roads are open."`
- Source: https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html
- Quote: *"The bridge will be opened to the public only after it is upgraded and its structural strength is tested and certified under the supervision of NIT [Calicut]... The glass bridge has remained closed for the past nine months."*

**6. wayanad — notice_text (new)**
- Current: `null`
- Proposed: `"Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026."`
- Source: https://www.onmanorama.com/news/kerala/2026/01/22/mundakkai-chooralmala-landslide-compensation-no-go-zone-land.html
- Quote: *"Their lands fall within the 'No-Go Zone' where farming activities have been restricted."* (Jan 2026, confirming No Go Zone still active into 2026)

---

### ESCALATED (2) — will email founder daily until settled

**7. rann-of-kutch — permit_required**
- Current: `null`
- Proposed: `"Entry permit required for all visitors; apply online at rannpermit.gujarat.gov.in or collect at Bhirandiyara checkpost."`
- Source: https://rannpermit.gujarat.gov.in — INACCESSIBLE FROM AU (geo-fenced). Permit portal is live and official. Founder to verify and approve manually.

**8. eravikulam — best_months (escalated: non-queue field)**
- Current: `[12,1,2,3,4,9,10,11]` (includes Feb=2, Mar=3)
- Proposed: `[12,1,4,9,10,11]`
- Reason: Feb–Mar are the annual mandatory Nilgiri Tahr calving season closure. The park is physically shut to all visitors during this period every year. Having Feb/Mar in best_months contradicts the park's own policy.
- Source: https://www.keralatourism.org/destination/eravikulam-national-park/ — *"The park observes an annual closure for the Nilgiri Tahr calving season, typically February to March, during which all visitor access is suspended."*
- Also: https://www.onmanorama.com/travel/travel-news/2023/01/28/eravikulam-national-park-shut-due-to-nilgiri-tahr-breeding-season.html

---

## Notes on near-misses not corrected

- **statue-of-unity** — railhead "Kevadia Colony station" in DB is the old name; station was renamed to **Ekta Nagar** (January 2021). Sub-agent could not find an authoritative source (aai.aero, *.gov.in, *.nic.in, or NEWS_HOSTS) confirming the rename at a URL that opened. Confirmed as-is; deferred for manual DB update.
- **nalsarovar** — Social-media posts suggest boating may be suspended but no NEWS_HOSTS or official source found. Confirmed as-is; sub-agent searched hindustantimes, ndtv, the hindu with no results.

---

RESULT confirmed=33 corrections=8 skipped=0

## Wrapper outcome

```
queued omkareshwar: notice_text null → "Local traders and residents called a bandh from 19 Oct 2026 over Simhastha 2028 redevelopment. Temple darshan continues; shops, transport and services in Omkareshwar town may be affected."; notice_source_url null → "https://www.amarujala.com/photo-gallery/madhya-pradesh/omkareshwar-close-from-october-19-simhastha-2028-rehabilitation-compensation-demand-2026-10-16"
queued ooty: notice_text null → "Nilgiri Mountain Railway (toy train, Mettupalayam–Ooty) suspended from 9 Oct 2026 due to landslides; no resumption date announced. Road access via NH181 is open."; notice_source_url null → "https://www.dtnext.in/news/tamilnadu/nilgiri-mountain-railway-services-suspended-for-second-consecutive-day-due-to-landslides"
queued rajkot: nearest_airport "Rajkot — in city" → "Rajkot International Airport (HSR), Hirasar — 30km"
queued tharangambadi: nearest_railhead "Mayiladuthurai Station — 15km" → "Mayiladuthurai Station — 28km"
queued vagamon: notice_text null → "Vagamon Adventure Park glass bridge is closed for structural strengthening and NIT Calicut safety certification as of Oct 2026; expected to reopen in approximately one month. All other sites and access roads are open."; notice_source_url null → "https://www.onmanorama.com/travel/travel-news/2026/10/02/vagamon-adventure-park-glass-bridge-set-to-reopen-after-strengthening-work.html"
queued wayanad: notice_text null → "Mundakkai–Chooralmala area (Meppadi) remains a restricted No Go Zone following the July 2024 landslide and is closed to tourists. Major sites (Edakkal Caves, Banasura Sagar, Chembra trek) open as of Aug 2026."; notice_source_url null → "https://www.onmanorama.com/news/kerala/2026/01/22/mundakkai-chooralmala-landslide-compensation-no-go-zone-land.html"
escalated rann-of-kutch: permit_required: source https://rannpermit.gujarat.gov.in would not open
escalated eravikulam: best_months needs a manual edit
stamped 33: modhera, mudumalai, munnar, nalsarovar, nelliyampathy, palitana, point-calimere, pondicherry, ponmudi, poovar, porbandar, rameswaram, ranakpur, rani-ki-vav, sabarimala, saputara, sariska, sasangir, shikharji, silent-valley, somnath, srirangam, statue-of-unity, surat, thanjavur, thekkady, trivandrum, vadodara, valparai, varkala, vedanthangal, velavadar, yercaud
RESULT stamped=33 valid=33 corrections=8 queued=6 queueable=6 escalated=2 dropped=0 unreviewed=0
```
