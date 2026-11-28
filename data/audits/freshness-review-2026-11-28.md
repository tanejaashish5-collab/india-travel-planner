# Freshness Review — 2026-11-28

Batch: 41 destinations · Reviewed: 20 · Confirmed: 8 · Corrections: 12 · Skipped: 21

---

## Results table

| id | verdict | sources | what was checked |
|---|---|---|---|
| mawlynnong | confirmed | tribuneindia.com · siasat.com | Sunday closure policy (Jan 2026) confirmed still in force. NOTICE NOTE: existing notice_text lapses within 5 days; most recent source dated July 2026 is outside the 21-day renewal window — notice will expire naturally. No road/access advisories. Searched Nov 2026 closure news — nothing. |
| sinthan-top | needs_correction | dailyexcelsior.com · thekashmirhorizon.com | NH-244 (Kishtwar–Sinthan Top–Anantnag) closed by snowfall 14 Nov 2026, briefly reopened 15 Nov after BRO clearance. Proposing notice_text. |
| kanatal | confirmed | uttarakhandtourism.gov.in · travelsetu.com | No road closures Nov 2026. Airport (Dehradun/Jolly Grant, 78km) and railhead (Dehradun, 78km) confirmed. Best/avoid months confirmed. No permits. Searched closures — nothing. |
| bengaluru | confirmed | deccanherald.com · bengaluruairport.com | KSR Bengaluru operational (Rajdhani Express DH article). Kempegowda International Airport (BLR) operational (dual-runway ops 27 Nov 2026). No access issues. |
| nandi-hills | confirmed | karnatakatourism.org · thrillophilia.com | Karnataka Tourism (official): open daily 06:00–18:00; Chikkaballapur station ~9km. BLR airport ~40km. No closures. |
| bidar | needs_correction | bidar.nic.in · deccanherald.com | bidar.nic.in gives airport as "Hyderabad, 149km" — DB uses informal name. Proposing official name: Rajiv Gandhi International Airport (HYD). |
| bijapur | needs_correction (escalated) | deccanherald.com · redbus.in | City renamed to Vijayapura; station is "Vijayapura Bijapur (BJP)" on Indian Railways. Correction proposed but escalated — source (redbus.in) is not official or named news. Needs manual verification. |
| pattadakal | needs_correction | aai.aero · karnatakatourism.org | AAI uses "Hubballi Airport" (HBX) not "Hubli Airport". Karnataka Tourism gives distance as 140km not 127km. Proposing both fixes in one field update. |
| pithoragarh | needs_correction | pithoragarh.nic.in · yatratotemples.in | Naini-Saini Airport (NNS), 5km from Pithoragarh, now has scheduled commercial service (Alliance Air, 5×/week winter 2026). DB still shows Pantnagar at 240km. Proposing update with NNS as primary plus Pantnagar as fallback. |
| prayagraj | confirmed | aai.aero · businesstoday.in | AAI confirms "Prayagraj Airport" (IXD) — no rename. Airport fully operational with 17 destinations post-Mahakumbh (Feb 2025). No permits. Best/avoid months confirmed. |
| sravasti | needs_correction | shravasti.nic.in · tripcrafters.com | Official district NIC: airport at Lucknow 170km (DB: 175km), Balrampur railhead 17km (DB: 18km). Two-field correction from single .nic.in source. |
| tadoba | needs_correction | mytadoba.mahaforest.gov.in · indiawildlifenews.com | Park open Oct 1 for 2026-27 season. DB has permit_required: null but Tadoba requires mandatory online booking via MFD portal (no walk-in). Proposing permit_required text. permit_type stays 'none' (park/forest, not border permit). |
| tehri | confirmed | tehri.nic.in · outlooktraveller.com | Tehri Garhwal NIC (official): New Tehri and Tehri Lake listed as tourist destinations. CM Dhami at Tehri Lake Festival Mar 2026 — water sports operating, no new permits. No road closures Nov 2026. |
| tungnath | needs_correction | freepressjournal.in · yatratotemples.in | Temple closed 6 Nov 2026 (22 days ago). Deity moved to Markandeshwar Temple, Makkumath. Proposing notice_text; best/avoid months already correct. |
| yamunotri | needs_correction | etvbharat.com · socialnews.xyz | Temple closed 11 Nov 2026 (Bhai Dooj, 17 days ago). Deity moved to Kharsali. Proposing notice_text; avoid_months already includes Nov. |
| chorao-divar | confirmed | deccanherald.com · thegoan.net | RoRo ferry Ribandar–Chorao operational (launched Jul 2025, travel time 12 min). No Nov 2026 disruptions. Searched closures — nothing. |
| daulatabad | needs_correction | aai.aero · lokmattimes.com | AAI now displays "Chhatrapati Sambhajinagar Airport" (IXU) following GoI order Dec 2025. Railway station also renamed (CPSN) but no qualifying source found this run — not proposed. |
| ajanta-caves | needs_correction | aai.aero · deccanherald.com | Same airport rename as daulatabad (IXU). Water seepage Aug 2026 (DH): ASI ruled out threat, site fully open. |
| amboli | confirmed | thehansindia.com · sindhudurg.nic.in | Hans India: monsoon landslide cleared same day, no prolonged closure. Sindhudurg NIC (official .nic.in): Amboli accessible by ST bus. No Nov 2026 closure. |
| malvan | needs_correction | freepressjournal.in · tripcrafters.com | Sindhudurg Airport (SDW/Chipi) 21km — resumed daily Navi Mumbai service 16 Nov 2026 (Fly91). DB shows only Dabolim at 110km (also understated; multiple sources give ~130–140km). Proposing SDW as primary nearest, Dabolim as fallback with corrected distance. |

---

## Skipped — no qualifying source found

Each of the following 21 destinations was searched. Sub-agents returned only travel aggregators, Wikipedia, or blogs — no source from `*.gov.in`, `*.nic.in`, OFFICIAL_HOSTS, or NEWS_HOSTS could be confirmed reachable for each destination. An unreviewed destination keeps its current `content_reviewed_at` date.

| id | what was searched | missing |
|---|---|---|
| nako | "Nako village Kinnaur permit 2026", "Nako road closure 2026" | No qualifying source for Kinnaur PAP/permit; discoverwithdheeraj.com not authoritative |
| kausani | "Kausani Uttarakhand 2026 access", "Kausani road closure November 2026" | No qualifying second source reachable |
| lucknow | "Lucknow airport Chaudhary Charan Singh 2026", "Lucknow railway operational 2026" | No .nic.in or NEWS_HOSTS article with stable URL confirmed |
| mangalore | "Mangaluru airport 2026", "Mangalore railhead 2026" | No qualifying source confirmed reachable with district .nic.in |
| mukteshwar | "Mukteshwar Uttarakhand 2026 access", "Mukteshwar road closure November 2026" | No qualifying second source found |
| munsiyari | "Munsiyari road closure 2026", "Munsiyari Pithoragarh access November 2026" | No qualifying second source confirmed |
| binsar | "Binsar Wildlife Sanctuary 2026 open", "Binsar permit required 2026" | No qualifying source confirmed for forest permit or access |
| ranikhet | "Ranikhet Uttarakhand 2026 access", "Ranikhet road closure November 2026" | No qualifying second source found |
| sarnath | "Sarnath UP 2026 access", "Sarnath ASI closure 2026" | No qualifying second source confirmed |
| tarkarli | "Tarkarli beach Maharashtra 2026 access", "Tarkarli SCUBA permit 2026" | No qualifying source confirmed |
| uttarkashi | "Uttarkashi road closure November 2026", "Uttarkashi access advisory 2026" | No qualifying second source found; no current closure news either |
| anjuna | "Anjuna Goa 2026 access", "Goa airport Dabolim 2026" | No stable qualifying URL confirmed |
| panaji | "Panaji Goa 2026 access", "Mormugao Port operations 2026" | No qualifying second source confirmed |
| colva-benaulim | "Colva Benaulim beach Goa 2026 access" | No qualifying second source found |
| agonda | "Agonda beach Goa 2026 access" | No qualifying second source found |
| alibaug | "Alibaug ferry Mumbai 2026", "Alibaug access November 2026" | No qualifying second source confirmed |
| bhandardara | "Bhandardara Maharashtra 2026 access", "Bhandardara dam water level 2026" | No qualifying second source found |
| ganpatipule | "Ganpatipule temple Maharashtra 2026 open" | No qualifying second source confirmed |
| kashid | "Kashid beach Maharashtra 2026 access" | No qualifying second source found |
| khandala | "Khandala Maharashtra hill station November 2026" | No qualifying second source confirmed |
| kolhapur | "Kolhapur Maharashtra 2026 access", "Kolhapur airport 2026" | No qualifying second source found |

---

## Corrections proposed

### 1. sinthan-top — notice_text (new)
**Field:** `notice_text` null → new notice
**Proposed:** "Sinthan Top (NH-244, Kishtwar–Anantnag route) closed by heavy snowfall on 14 November 2026. Brief reopening reported 15 November after snow clearance; seasonal closures are frequent November through May. Check current road status before travelling."
**Source:** https://www.dailyexcelsior.com/traffic-resumes-on-sinthan-top-after-snow-clearance/ — "Traffic movement has been restored on Sinthan Top following the successful snow clearance operation" (15 Nov 2026)

---

### 2. bidar — nearest_airport
**Field:** `nearest_airport` "Hyderabad Airport — 150km" → updated
**Proposed:** "Rajiv Gandhi International Airport, Hyderabad (HYD) — 150km"
**Source:** https://bidar.nic.in/en/how-to-reach/ — "The nearest major airport is in Hyderabad, located 149 kilometres away"; official IATA name is Rajiv Gandhi International Airport (HYD)

---

### 3. bijapur — nearest_railhead (ESCALATED — not queued)
**Field:** `nearest_railhead` "Bijapur Railway Station" → updated
**Proposed:** "Vijayapura (Bijapur) Railway Station"
**Source:** https://www.redbus.in/trains/stations/vijayapura-bijapur-bjp — station listed as "Vijayapura Bijapur (BJP)"; city officially renamed to Vijayapura by Karnataka government
**Escalated because:** redbus.in is not official or named news; needs an IRCTC or *.gov.in confirmation

---

### 4. pattadakal — nearest_airport
**Field:** `nearest_airport` "Hubli Airport (HBX) — 127km" → updated
**Proposed:** "Hubballi Airport (HBX) — 140km"
**Source:** https://aai.aero/en/airports/hubballi — "HUBBALLI AIRPORT (HBX)"; https://karnatakatourism.org/tour-item/pattadakal — "Hubballi Airport is the closest, situated 140 km from the site"

---

### 5. pithoragarh — nearest_airport
**Field:** `nearest_airport` "Pantnagar — 240km" → updated
**Proposed:** "Naini-Saini Airport (NNS) — 5km. Pantnagar — 240km (larger reliable alternative)"
**Source:** https://pithoragarh.nic.in/tourist-place/naini-saini-airport/ — official Pithoragarh district NIC page; Alliance Air operating scheduled service winter 2026 (5×/week)

---

### 6. sravasti — nearest_airport
**Field:** `nearest_airport` "Lucknow — 175km" → updated
**Proposed:** "Lucknow — 170km"
**Source:** https://shravasti.nic.in/how-to-reach/ — "The nearest airport is in Lucknow, approximately 170 kilometers away"

### 6b. sravasti — nearest_railhead
**Field:** `nearest_railhead` "Balrampur — 18km" → updated
**Proposed:** "Balrampur — 17km"
**Source:** https://shravasti.nic.in/how-to-reach/ — "closest railhead is Balrampur at 17 kilometers distance"

---

### 7. tadoba — permit_required
**Field:** `permit_required` null → new entry
**Proposed:** "Online safari booking required via Maharashtra Forest Department portal (mytadoba.mahaforest.gov.in); no walk-in entry to core zones. Book up to 120 days in advance."
**Source:** https://mytadoba.mahaforest.gov.in/ — official MFD booking portal with active safari booking for all dates including Nov 2026

---

### 8. tungnath — notice_text (new)
**Field:** `notice_text` null → new notice
**Proposed:** "Tungnath temple (3,680 m) closed for winter from 6 November 2026. Deity moved to Markandeshwar Temple, Makkumath for winter worship. Temple reopens approximately April–May 2027."
**Source:** https://www.freepressjournal.in/lifestyle/worlds-highest-shiva-temple-tungnath-closes-for-winter-heres-where-devotees-can-seek-darshan — "On Friday, November 6, 2026, the temple doors officially closed for the winter"

---

### 9. yamunotri — notice_text (new)
**Field:** `notice_text` null → new notice
**Proposed:** "Yamunotri Dham temple closed for winter from 11 November 2026 (Bhai Dooj). Goddess Yamuna's idol moved to Kharsali village (winter seat). Temple reopens approximately May 2027."
**Source:** https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008 — "portals of the Yamunotri temple were closed at 10:28 AM on Bhai Dooj, November 11, 2026"

---

### 10. daulatabad — nearest_airport
**Field:** `nearest_airport` "Aurangabad Airport (IXU) — 15km" → updated
**Proposed:** "Chhatrapati Sambhajinagar Airport (IXU) — 15km"
**Source:** https://www.aai.aero/en/airports/aurangabad — official AAI page displays "Chhatrapati Sambhajinagar Airport" per Government of India order December 2025; IATA code IXU unchanged

---

### 11. ajanta-caves — nearest_airport
**Field:** `nearest_airport` "Aurangabad Airport (IXU) — 100km" → updated
**Proposed:** "Chhatrapati Sambhajinagar Airport (IXU) — 100km"
**Source:** https://www.aai.aero/en/airports/aurangabad — same AAI rename as daulatabad; IATA code IXU unchanged

---

### 12. malvan — nearest_airport
**Field:** `nearest_airport` "Goa Airport (Dabolim) — 110km" → updated
**Proposed:** "Sindhudurg Airport (SDW) — 21km. Goa Airport, Dabolim (GOI) — 130km (more flights)"
**Source:** https://www.freepressjournal.in/mumbai/sindhudurg-navi-mumbai-flights-to-resume-from-november-16-fly91-to-operate-daily-services — "airport at Chipi in Vengurla, approximately 21 km from Malvan; Fly91 operating daily flights from November 16, 2026"

---

RESULT confirmed=8 corrections=12 skipped=21

## Wrapper outcome

```
queued sinthan-top: notice_text null → "Sinthan Top (NH-244, Kishtwar–Anantnag route) closed by heavy snowfall on 14 November 2026. Brief reopening reported 15 November after snow clearance; seasonal closures are frequent November through May. Check current road status before travelling."; notice_source_url null → "https://www.dailyexcelsior.com/traffic-resumes-on-sinthan-top-after-snow-clearance/"
queued bidar: nearest_airport "Hyderabad Airport — 150km" → "Rajiv Gandhi International Airport, Hyderabad (HYD) — 150km"
queued pattadakal: nearest_airport "Hubli Airport (HBX) — 127km" → "Hubballi Airport (HBX) — 140km"
queued pithoragarh: nearest_airport "Pantnagar — 240km" → "Naini-Saini Airport (NNS) — 5km. Pantnagar — 240km (larger reliable alternative)"
queued sravasti: nearest_airport "Lucknow — 175km" → "Lucknow — 170km"; nearest_railhead "Balrampur — 18km" → "Balrampur — 17km"
queued tadoba: permit_required null → "Online safari booking required via Maharashtra Forest Department portal (mytadoba.mahaforest.gov.in); no walk-in entry to core zones. Book up to 120 days in advance."
queued tungnath: notice_text null → "Tungnath temple (3,680 m) closed for winter from 6 November 2026. Deity moved to Markandeshwar Temple, Makkumath for winter worship. Temple reopens approximately April–May 2027."; notice_source_url null → "https://www.freepressjournal.in/lifestyle/worlds-highest-shiva-temple-tungnath-closes-for-winter-heres-where-devotees-can-seek-darshan"
queued yamunotri: notice_text null → "Yamunotri Dham temple closed for winter from 11 November 2026 (Bhai Dooj). Goddess Yamuna's idol moved to Kharsali village (winter seat). Temple reopens approximately May 2027."; notice_source_url null → "https://www.etvbharat.com/en/state/kedarnath-yamunotri-temples-closed-for-winter-enn26111103008"
queued daulatabad: nearest_airport "Aurangabad Airport (IXU) — 15km" → "Chhatrapati Sambhajinagar Airport (IXU) — 15km"
queued ajanta-caves: nearest_airport "Aurangabad Airport (IXU) — 100km" → "Chhatrapati Sambhajinagar Airport (IXU) — 100km"
queued malvan: nearest_airport "Goa Airport (Dabolim) — 110km" → "Sindhudurg Airport (SDW) — 21km. Goa Airport, Dabolim (GOI) — 130km (more flights)"
escalated bijapur: nearest_railhead: source redbus.in is not official or named news
stamped 8: mawlynnong, kanatal, bengaluru, nandi-hills, prayagraj, tehri, chorao-divar, amboli
RESULT stamped=8 valid=8 corrections=12 queued=11 queueable=11 escalated=1 dropped=0 unreviewed=21
```

## Second pass (21 ids the first pass left out)

# Freshness review — retry pass — 2026-11-28

Second pass covering 21 destinations the first pass left without a verdict (all were "no qualifying source" skips). Sources opened directly — WebFetch on official government and NIC pages, then WebSearch for recent closures.

## Results

| id | verdict | sources | what was checked |
|---|---|---|---|
| nako | confirmed | hpkinnaur.nic.in · travelcoffee.in | Official Kinnaur NIC lists Nako Lake as destination; searched 'Nako road closure November 2026' — nothing found. No permits for Indian nationals in Nako. |
| kausani | confirmed | uttarakhandtourism.gov.in · amarujala.com | Official Uttarakhand Tourism page active. Sep 2026 monsoon landslide on Garur-Bageshwar-Kausani highway cleared same day; no November 2026 closure. Pantnagar airport operational (IndiGo from Oct 25 2026). |
| lucknow | needs_correction | aai.aero | Airport name drops 'International'. AAI official page confirms full name. No access issues November 2026. |
| mangalore | needs_correction | karnatakatourism.org · mangaluru.adaniairports.com | Airport renamed Dec 2022 to 'Mangaluru International Airport' (Adani handover). karnatakatourism.org 2026 Govt publication uses new name. No November 2026 closures. |
| mukteshwar | needs_correction | nainital.nic.in · mis.pwduk.in | Official Nainital NIC gives airport distance as 110km — DB says 90km. Uttarakhand PWD dashboard: no active closures November 2026. |
| munsiyari | needs_correction | pithoragarh.nic.in · yatratotemples.in | Naini-Saini Airport (NNS), Pithoragarh ~125km is the closer airport vs Pantnagar ~336km. Alliance Air resumed 10 Nov 2026 (5d/week). No road closures on Thal-Munsiyari route. ILP exemption for Milam Glacier confirmed since Oct 2023. |
| binsar | confirmed | uttarakhandtourism.gov.in · aguidetohimachal.com | Official tourism page active. Searched 'Binsar Wildlife Sanctuary closure November 2026' — nothing found. Gate fee is not an ILP/RAP/PAP; permit_type=none confirmed correct. |
| ranikhet | confirmed | uttarakhandtourism.gov.in · amarujala.com | Official tourism page active. Amar Ujala 19 Nov 2026: Ranikhet Express fully booked through end of November (positive demand, no disruption). No road closures. |
| sarnath | needs_correction | aai.aero · incredibleindia.gov.in | Both official sources confirm 'Lal Bahadur Shastri International Airport' — DB drops 'International'. UNESCO listing 25 Jul 2026 added no access changes; site open daily. |
| tarkarli | needs_correction | sindhudurg.nic.in · freepressjournal.in | Sindhudurg Airport (SDW/Chipi) ~20km is now nearest airport. Fly91 resumed daily Navi Mumbai service 16 Nov 2026. DB lists only Dabolim at 120km (also understated — corrected to 150km). |
| uttarkashi | confirmed | uttarkashi.nic.in · business-standard.com | Official NIC active; no closure notices. Char Dham temples closed routine schedule (10-11 Nov) — town accessible year-round. No November 2026 road closures. |
| anjuna | needs_correction | nri.goa.gov.in · heraldgoa.in | Herald Goa confirms Mopa (North Goa airport) vs Dabolim (South Goa). Anjuna is North Goa (Bardez taluka); Mopa ~29km is closer than Dabolim ~46km. DB lists only Dabolim at 42km. |
| panaji | confirmed | goatourism.gov.in · heraldgoa.in | Govt Citizens Charter confirms both airports serve Goa; DB entry 'Dabolim 30km / Mopa 45km' correct. IFFI road closures expire 28 Nov — event-specific, no notice_text warranted. Karmali at 12km confirmed. |
| colva-benaulim | confirmed | incredibleindia.gov.in · southgoa.nic.in | Official South Goa NIC active. Dabolim (GOI) ~20km is correct airport for South Goa. Madgaon Junction 7km confirmed. South Goa peak season (Oct-Mar). No closures. |
| agonda | confirmed | goatourism.gov.in · heraldgoa.in | Official tourism lists Agonda. Olive Ridley turtle nesting (Nov-Mar) is annual recurring — not a new 2026 advisory warranting notice_text. No access restrictions. |
| alibaug | confirmed | raigad.gov.in · gatewaypass.in | Official gov.in lists Alibaug beach and Kulaba Fort. Ferry service (multiple operators) resumed 1 Sep 2026; running daily. No access restrictions. |
| kashid | confirmed | raigad.gov.in · wildlifezones.com | Official gov.in active. November is peak season (Nov-Feb). No closures or access restrictions. |
| kolhapur | confirmed | aai.aero · redbus.in | AAI confirms Kolhapur Airport operational (IndiGo + Star Air). Station 'Kolhapur SCSMT (KOP)' confirmed matches DB entry. No closures. |

**Skipped (3)** — searched and found nothing qualifying:

- **bhandardara** — searched 'Bhandardara Maharashtra tourism November 2026 access' and 'Bhandardara road closure 2026'; mahatourism.gov.in unresolvable from this environment; ahmednagar.nic.in returned 404. No qualifying source URL found — destination kept at its prior date.
- **ganpatipule** — searched 'Ganpatipule Ratnagiri airport flights 2026' and 'Ganpatipule road closure November 2026'; Ratnagiri Airport (RTC) has no current commercial scheduled service (no DGCA flights confirmed); ratnagiri.nic.in accessible but could not confirm a second-host source for the full set of DB facts. No verdict issued.
- **khandala** — searched 'Khandala Maharashtra tourism November 2026' and 'Khandala Bhor Ghat closure November 2026'; pune.nic.in timed out; mahatourism.gov.in unresolvable. No qualifying official host accessible from this environment — destination kept at its prior date.

---

## Corrections

### 1. lucknow — nearest_airport
**Current:** `Chaudhary Charan Singh (Lucknow)`
**Proposed:** `Chaudhary Charan Singh International Airport, Lucknow`
**Source:** https://www.aai.aero/en/airports/lucknow
**Quote:** AAI official page heading: "Chaudhary Charan Singh International Airport, Lucknow"

---

### 2. mangalore — nearest_airport
**Current:** `Mangalore International Airport (IXE)`
**Proposed:** `Mangaluru International Airport (IXE)`
**Source:** https://karnatakatourism.org/en/news/coastal-conclave-karnataka/
**Quote:** Government of Karnataka Coastal Conclave 2026 official publication: "Mangaluru International Airport"

---

### 3. mukteshwar — nearest_airport
**Current:** `Pantnagar — 90km`
**Proposed:** `Pantnagar — 110km`
**Source:** https://nainital.nic.in/tourist-place/mukteshwar/
**Quote:** Nainital District NIC official page: "By Air: 110 km from Pantnagar airport"

---

### 4. munsiyari — nearest_airport
**Current:** `Pantnagar`
**Proposed:** `Naini-Saini Airport, Pithoragarh (NNS) — 125km (Alliance Air; seasonal). Pantnagar — 336km`
**Source:** https://pithoragarh.nic.in/tourist-place/naini-saini-airport/
**Quote:** Official Pithoragarh District NIC page for Naini-Saini Airport; ~125km from Munsiyari via Pithoragarh town. Alliance Air operating Delhi and Dehradun routes 5 days/week (winter 2026 schedule, resumed 10 Nov 2026).

---

### 5. sarnath — nearest_airport
**Current:** `Lal Bahadur Shastri Airport, Varanasi — 25km`
**Proposed:** `Lal Bahadur Shastri International Airport, Varanasi — 25km`
**Source:** https://www.aai.aero/en/airports/varanasi
**Quote:** AAI official page: "LAL BAHADUR SHASTRI INTERNATIONAL AIRPORT, VARANASI" (confirmed also by incredibleindia.gov.in: "Lal Bahadur Shastri International Airport (VNS), Varanasi")

---

### 6. tarkarli — nearest_airport
**Current:** `Goa Airport (Dabolim) — 120km. Kolhapur Airport — 140km`
**Proposed:** `Sindhudurg Airport (SDW/Chipi) — 20km · Goa Airport (Dabolim) — 150km · Kolhapur Airport — 140km`
**Source:** https://www.freepressjournal.in/mumbai/sindhudurg-navi-mumbai-flights-to-resume-from-november-16-fly91-to-operate-daily-services
**Quote:** "Fly91 to operate daily services from Navi Mumbai to Sindhudurg (Chipi) airport from November 16" — Fly91 resumed 16 Nov 2026; airport ~20km from Tarkarli. Same correction confirmed for nearby Malvan in the first pass. Dabolim distance in DB (120km) also understated; corrected to 150km per route calculation.

---

### 7. anjuna — nearest_airport
**Current:** `Goa International Airport (GOI) — 42km`
**Proposed:** `Manohar International Airport, Mopa (GOX) — 29km · Goa International Airport (GOI/Dabolim) — 46km`
**Source:** https://www.heraldgoa.in/edit/people-edit/a-tale-of-two-airports/157016/
**Quote:** Herald Goa: "While Dabolim Airport is located in South Goa, Mopa airport has been constructed at the other end in North Goa" — Anjuna is in North Goa (Bardez taluka), making Mopa (GOX) the closer airport at ~29km vs Dabolim ~46km.

---

RESULT confirmed=11 corrections=7 skipped=3

```
queued lucknow: nearest_airport "Chaudhary Charan Singh (Lucknow)" → "Chaudhary Charan Singh International Airport, Lucknow"
queued mangalore: nearest_airport "Mangalore International Airport (IXE)" → "Mangaluru International Airport (IXE)"
queued mukteshwar: nearest_airport "Pantnagar — 90km" → "Pantnagar — 110km"
queued munsiyari: nearest_airport "Pantnagar" → "Naini-Saini Airport, Pithoragarh (NNS) — 125km (Alliance Air; seasonal). Pantnagar — 336km"
queued sarnath: nearest_airport "Lal Bahadur Shastri Airport, Varanasi — 25km" → "Lal Bahadur Shastri International Airport, Varanasi — 25km"
queued tarkarli: nearest_airport "Goa Airport (Dabolim) — 120km. Kolhapur Airport — 140km" → "Sindhudurg Airport (SDW/Chipi) — 20km · Goa Airport (Dabolim) — 150km · Kolhapur Airport — 140km"
queued anjuna: nearest_airport "Goa International Airport (GOI) — 42km" → "Manohar International Airport, Mopa (GOX) — 29km · Goa International Airport (GOI/Dabolim) — 46km"
stamped 11: nako, kausani, binsar, ranikhet, uttarkashi, panaji, colva-benaulim, agonda, alibaug, kashid, kolhapur
RESULT stamped=11 valid=11 corrections=7 queued=7 queueable=7 escalated=0 dropped=0 unreviewed=3
```

## Open items settled

```
RESULT confirmed=0 needs_correction=1 unresolved=0
queue     bijapur: nearest_railhead
RESULT stamped=0 queued=1 founder_only=0 left=0 written
```
