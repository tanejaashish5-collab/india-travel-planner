# Freshness Review — 2026-10-21

Batch: 41 destinations (content_reviewed_at in Jun 2026).
Method: 6 Sonnet sub-agents in 2 waves of 3 (chunks of 7), followed by orchestrator judgment.
Validator result: `valid=35 queueable=4 escalated=1 dropped=0 unreviewed=1`

---

## Results table

| id | verdict | key sources | what was checked |
|---|---|---|---|
| astavinayak-circuit | confirmed | maharashtratourism.gov.in, mypunepulse.com | Road/flood disruptions Jul–Oct 2026. Morgaon/Theur/Siddhatek closed May 10–Jun 9 for conservation, reopened. All 8 temples operating Oct 2026. |
| borra-caves | confirmed | incredibleindia.gov.in, businessnewsweek.in | Rayagada-division landslide Oct 13 affected Kirandul line beyond Araku; Visakhapatnam–Araku–Borra section confirmed unaffected. Vistadome trains running. |
| kanheri-caves | confirmed | sanjaygandhinationalpark.com, freepressjournal.in | SGNP closures searched, none found. Shuttle bus fare tripled May 2026 (₹100→₹300) but no stored field to correct. Cave entry fee unchanged. |
| karla-bhaja-caves | confirmed | mypunepulse.com, maharashtratourism.gov.in | Lonavala traffic restrictions Jul 6–Aug 31 affected approach roads; expired Aug 31. Oct access normal. avoid_months covers this period. |
| katra | confirmed | tribuneindia.com, republicworld.com | Vaishno Devi yatra suspended 6 days late July (landslide/floods), resumed Jul 25. Sharad Navratri Oct 11–19 fully operational, 45–47K pilgrims/day. |
| lenyadri | confirmed | maharashtratourism.gov.in, mypunepulse.com | Searched closures and monsoon access Jul–Oct 2026. No disruptions found. Lenyadri (Girijatmaj Temple) fully operational. |
| mahad-raigad | confirmed | ndtv.com, maharashtratourism.gov.in | Jul 2026 Raigad flooding consistent with avoid_months. Raigad fort and Mahad town confirmed accessible Oct 2026. |
| ozar | confirmed | maharashtratourism.gov.in, punemirror.in | Searched closures Jul–Oct 2026. No disruptions found. Vigneshwara Temple fully operational. |
| ranjangaon | confirmed | maharashtratourism.gov.in, punemirror.in | Searched closures Jul–Oct 2026. No disruptions found. Mahaganapati Temple fully operational. |
| siddhatek | confirmed | maharashtratourism.gov.in, mypunepulse.com | Part of the Astavinayak May–Jun closure, reopened. Siriddhi Vinayak Temple confirmed operating. |
| theur | confirmed | maharashtratourism.gov.in, mypunepulse.com | Part of the Astavinayak May–Jun closure, reopened. Chintamani Temple confirmed operating. |
| tiruvannamalai | confirmed | tamilnadutourism.tn.gov.in, thehindu.com | Searched advisories and access issues Jul–Oct 2026. No disruptions. Karthigai Deepam preparations ongoing (Nov). |
| araku-valley | needs_correction (escalated) | airindia.com (press release), en.wikipedia.org | Old Visakhapatnam Airport (INS Dega) ceased commercial ops Aug 16, 2026. New Alluri Sitarama Raju International Airport at Bhogapuram (same IATA VTZ) opened Aug 17, 2026. Distance ~135km. Source airindia.com not in NEWS_HOSTS — escalated for founder manual action. |
| belum-caves | confirmed | aptourism.gov.in, thehindu.com | Searched for access issues Jul–Oct 2026. No closures found. Belum Caves open daily. |
| chidiya-tapu | confirmed | tourism.andamannicobar.gov.in, andamantourism.gov.in | Searched for access and permit issues Jul–Oct 2026. No disruptions. IXZ operating normally. Chidiya Tapu accessible. |
| diamond-triangle | confirmed | aptourism.gov.in, incredibleindia.gov.in | Searched for closures Jul–Oct 2026. Nagarjunasagar/Srisailam accessible. No disruptions found. |
| horsley-hills | confirmed | aptourism.gov.in, horticulture.ap.gov.in | Searched for access Jul–Oct 2026. No closures found. APTDC resort and nature walks operational. |
| little-andaman | confirmed | tourism.andamannicobar.gov.in, go2andaman.com | Ferry access via Rangat confirmed running. RAP situation conflicting: island is on exemption list but eandamantourism.com recommends confirming with DC. Conservative call: existing DB permit text retained. |
| nagarjuna-konda | confirmed | aptourism.gov.in, incredibleindia.gov.in | Ferry boat service confirmed operational. Museum and island site open. No access issues found. |
| pochampally | confirmed | telanganatourism.gov.in, incredibleindia.gov.in | Searched for closures Jul–Oct 2026. No disruptions. Handloom village accessible year-round. |
| rajahmundry | confirmed | aptourism.gov.in, indianrailways.gov.in | Searched access issues Jul–Oct 2026. Godavari Express and river ferries confirmed operational. No disruptions. |
| tirupati | confirmed | tirumala.org, thehindu.com | Darshan system: SSD quota changes confirmed by Tirumala Tirupati Devasthanams. New queue management but no material change to stored fields. |
| agatti | confirmed | lakshadweeptourism.gov.in, iltaf.org | Searched for permit changes and flight status Jul–Oct 2026. AI9615/9616 (Kochi–Agatti) confirmed operating. Permit system unchanged. |
| bangaram | confirmed | lakshadweeptourism.gov.in, iltaf.org | Searched for access issues Jul–Oct 2026. Bangaram Island Resort operational. No permit or access changes. |
| baratang-island | needs_correction (queueable) | tourism.andamannicobar.gov.in, tropicalandamans.com | RAP exemption in force: most foreigners no longer need advance permit. DB says "Foreigners: need additional permit from Deputy Commissioner office" — outdated. |
| bhadrachalam | confirmed | bhadrachalam.ap.gov.in, aptourism.gov.in | Searched access issues Jul–Oct 2026. Godavari flooding within seasonal norms. Temple fully operational. |
| chilika-lake | confirmed | chilika.com, orissatourism.gov.in | Searched for access issues Jul–Oct 2026. Boat services confirmed operating. No disruptions. |
| diglipur | needs_correction (queueable) | tourism.andamannicobar.gov.in, tropicalandamans.com | RAP exemption in force: most foreigners no longer need advance permit. DB says "Foreigners: need permit" — outdated. |
| hyderabad | confirmed | telanganatourism.gov.in, incredibleindia.gov.in | Searched for major closures Jul–Oct 2026. RGIA operating normally. Heritage sites accessible. No material changes. |
| konaseema | confirmed | aptourism.gov.in, ndtv.com | Sep 2026 flooding from northeast monsoon affected low-lying areas. No major tourist-site closures. avoid_months covers Sep–Oct. Confirmed. |
| long-island-andaman | needs_correction (queueable) | tourism.andamannicobar.gov.in, tropicalandamans.com | RAP exemption in force: Long Island is item #9 on 29-island exemption list (valid to Dec 2027). DB says "Foreigners: need permit" — outdated. |
| port-blair | confirmed | tourism.andamannicobar.gov.in, tropicalandamans.com | IXZ operating normally. 5 airlines serving major metros. RAP registration on arrival for foreigners. DB permit text covers typical visitor experience. |
| ramappa-temple | confirmed | telanganatourism.gov.in, incredibleindia.gov.in | UNESCO World Heritage Site. Searched for closures Jul–Oct 2026. No disruptions found. Ramappa Temple operational. |
| simlipal | needs_correction (queueable) | theprint.in, simlipal.org | Closed Jun 29, 2026 for monsoon season. Reopens Nov 1, 2026. notice_text is currently null. Proposed notice queued for founder approval. |
| undavalli-caves | confirmed | aptourism.gov.in, incredibleindia.gov.in | Searched for closures Jul–Oct 2026. No disruptions. Caves near Vijayawada fully operational. |
| ahobilam | confirmed | ahobilamutt.org, aptourism.gov.in | Nagarjunasagar-Srisailam Tiger Reserve (NSTR) closed Sep 30, 2026 — but Ahobilam temples are OUTSIDE the core reserve and confirmed open. No material change to destination facts. |
| bhitarkanika | confirmed | bhitarkanika.org, orissatourism.gov.in | Searched for access issues Jul–Oct 2026. National Park confirmed open for Oct–Jun season. Boat services operational. |
| cuttack | confirmed | orissatourism.gov.in, odisha.gov.in | Searched for access issues Jul–Oct 2026. No major disruptions. Barabati Fort and Dhabaleswar accessible. |
| gahirmatha | confirmed | bhitarkanika.org, orissatourism.gov.in | Searched for access and permit issues Jul–Oct 2026. No disruptions. Marine Sanctuary accessible via Bhitarkanika. |
| kadmat | confirmed | lakshadweeptourism.gov.in, iltaf.org | Searched for access issues Jul–Oct 2026. Ferry services confirmed. Permit system unchanged. |
| **konark** | **skipped** | odishatv.in (not NEWS_HOSTS), orissapost.com (not NEWS_HOSTS) | ASI exit gate closed ~Sep 19, 2026. Found regional sources (odishatv.in Oct 4, orissapost.com Sep 23) but neither is in NEWS_HOSTS. Searched thehindu.com, newindianexpress.com, ndtv.com, timesofindia — no qualifying article found. Destination keeps its honest older date. |

---

## Corrections

### 1. araku-valley — nearest_airport (escalated: source not in NEWS_HOSTS)

**Field:** `nearest_airport`
**Current:** `Visakhapatnam Airport (VTZ) — 115km`
**Proposed:** `Alluri Sitarama Raju International Airport (VTZ), Bhogapuram — ~135km`
**Source:** https://www.airindia.com/in/en/newsroom/press-release/Air-India-to-commence-operations-from-Alluri-Sitarama-Raju-International-Airport-at-Bhogapuram-from-17-August.html
**Quote:** "Air India to commence operations from Alluri Sitarama Raju International Airport at Bhogapuram from 17 August"
**Note:** airindia.com is not in OFFICIAL_HOSTS or NEWS_HOSTS — validator escalated this. Founder to verify manually. The change is real: old INS Dega airport closed commercial ops Aug 16, 2026; new airport opened Aug 17.

---

### 2. simlipal — notice_text (queueable → queued for founder approval)

**Field:** `notice_text`
**Current:** `null`
**Proposed:** `Simlipal Tiger Reserve closed for monsoon season since 29 June 2026; reopens 1 November 2026. Book vehicle entry in advance at simlipal.org.`
**Source:** https://theprint.in/india/similipal-tiger-reserve-in-odisha-to-reopen-for-tourists-from-nov-1/3072946/
**Quote:** "Simlipal Tiger Reserve in Odisha will reopen for tourists from November 1 after remaining closed during the monsoon season" (theprint.in, Oct 2026)
**Note:** Oct is in best_months [10,11,12,1,2,3] but the reserve is closed all of October. The best_months value is a separate escalation for manual review (not proposed here per skill rules — best_months changes only on official advisory).

---

### 3. long-island-andaman — permit_required (queueable → queued for founder approval)

**Field:** `permit_required`
**Current:** `Indian nationals: none. Foreigners: need permit`
**Proposed:** `Indian nationals: none. Most foreigners: no RAP required (exemption to Dec 2027). Exception: Afghanistan, China (incl. HK/Macau), Pakistan nationals require advance MHA approval.`
**Source:** https://tourism.andamannicobar.gov.in/userpages/admin/whatsnewfile/2026030570Restricted%20Area%20Permit.pdf
**Quote:** Official Andaman Tourism RAP exemption order (March 2026): Long Island listed as item #9 of 29 de-notified islands; exemption valid through 31 December 2027.

---

### 4. diglipur — permit_required (queueable → queued for founder approval)

**Field:** `permit_required`
**Current:** `Indian nationals: none. Foreigners: need permit`
**Proposed:** `Indian nationals: none. Most foreigners: no RAP required (exemption to Dec 2027). Exceptions: Myanmar, Afghanistan, China, Pakistan nationals require advance MHA approval.`
**Source:** https://tourism.andamannicobar.gov.in/userpages/admin/whatsnewfile/2026030570Restricted%20Area%20Permit.pdf
**Quote:** Official Andaman Tourism RAP exemption order (March 2026); Diglipur included in the de-notified island list with exemption to Dec 31, 2027.

---

### 5. baratang-island — permit_required (queueable → queued for founder approval)

**Field:** `permit_required`
**Current:** `Indian nationals: none. Foreigners: need additional permit from Deputy Commissioner office`
**Proposed:** `Indian nationals: none. Most foreigners: no permit required (RAP exemption to Dec 2027). Exceptions: Afghanistan, China, Pakistan nationals require advance MHA approval.`
**Source:** https://tourism.andamannicobar.gov.in/islands_details.php?id=baratang
**Quote:** Andaman Tourism official page: Baratang Island access; RAP relaxation in force to Dec 2027 per exemption order.

---

## Skipped destinations

| id | reason |
|---|---|
| konark | ASI closed the Sun Temple exit gate ~Sep 19, 2026 (odishatv.in Oct 4, orissapost.com Sep 23 found). Searched thehindu.com, newindianexpress.com, ndtv.com, timesofindia.indiatimes.com — no qualifying NEWS_HOSTS article found. notice_text correction withheld; destination keeps older date. |

---

## Additional escalations for manual follow-up

- **simlipal best_months**: Reserve closed all of October but best_months includes [10]. A best_months change requires an official advisory in force — the closure IS official, but per skill rules this is a separate escalation for manual edit (not auto-queued). Founder should review whether October should be removed from best_months.
- **kanheri-caves**: SGNP shuttle fee tripled May 2026 (₹100→₹300, per freepressjournal.in). No stored `local_logistics` field to correct. Note for manual follow-up.
- **gahirmatha permit_required**: DB value is null (no permit text stored) but a forest permit IS required for entry. This is a data gap (not a wrong value), so no correction proposed. Manual backfill recommended.

---

RESULT confirmed=35 corrections=5 skipped=1

## Wrapper outcome

```
queued diglipur: permit_required "Indian nationals: none. Foreigners: need permit" → "Indian nationals: none. Most foreigners: no RAP required (exemption to Dec 2027). Exceptions: Myanmar, Afghanistan, China, Pakistan nationals require advance MHA approval."
queued long-island-andaman: permit_required "Indian nationals: none. Foreigners: need permit" → "Indian nationals: none. Most foreigners: no RAP required (exemption to Dec 2027). Exception: Afghanistan, China (incl. HK/Macau), Pakistan nationals require advance MHA approval."
queued simlipal: notice_text null → "Simlipal Tiger Reserve closed for monsoon season since 29 June 2026; reopens 1 November 2026. Book vehicle entry in advance at simlipal.org."; notice_source_url null → "https://theprint.in/india/similipal-tiger-reserve-in-odisha-to-reopen-for-tourists-from-nov-1/3072946/"
queued baratang-island: permit_required "Indian nationals: none. Foreigners: need additional permit from Deputy Commissioner office" → "Indian nationals: none. Most foreigners: no permit required (RAP exemption to Dec 2027). Exceptions: Afghanistan, China, Pakistan nationals require advance MHA approval."
escalated araku-valley: nearest_airport: source airindia.com is not official or named news
stamped 35: astavinayak-circuit, borra-caves, kanheri-caves, karla-bhaja-caves, katra, lenyadri, mahad-raigad, ozar, ranjangaon, siddhatek, theur, tiruvannamalai, belum-caves, chidiya-tapu, diamond-triangle, horsley-hills, little-andaman, nagarjuna-konda, pochampally, rajahmundry, tirupati, agatti, bangaram, bhadrachalam, chilika-lake, hyderabad, konaseema, port-blair, ramappa-temple, undavalli-caves, ahobilam, bhitarkanika, cuttack, gahirmatha, kadmat
RESULT stamped=35 valid=35 corrections=5 queued=4 queueable=4 escalated=1 dropped=0 unreviewed=1
```
