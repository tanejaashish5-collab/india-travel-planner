# Freshness Review — 2026-09-26

**Batch picked:** 2026-09-25T21:00:05Z
**Run date:** 2026-09-26
**Batch size:** 41 destinations (stalest by `content_reviewed_at`)
**Result:** valid=34 · corrections=6 · dropped=0 · unreviewed=1
**Validator:** `scripts/freshness-review.mjs apply` — clean, 0 dropped

---

## Destination Table

| id | verdict | sources | what was checked |
|----|---------|---------|-----------------|
| auli | confirmed | uttarakhandtourism.gov.in/destination/auli · aai.aero/en/airports/dehradun | Access, permit (none), Jolly Grant operational, ski season months accurate |
| yamunotri | confirmed | uttarakhandtourism.gov.in/destination/yamunotri · aai.aero/en/airports/dehradun | Access, permit (none), Char Dham season Apr–Nov accurate, Jolly Grant operational |
| gangotri | confirmed | uttarakhandtourism.gov.in/destination/gangotri · aai.aero/en/airports/dehradun | Access, permit (none), Char Dham season, no BRO/SDMA closures for 2026 season |
| mukteshwar | confirmed | uttarakhandtourism.gov.in/destination/mukteshwar · aai.aero/en/airports/pantnagar | Access, permit (none), Pantnagar airport operational, no changes |
| valley-of-flowers | **needs_correction** | valleyofflower.uk.gov.in · uttarakhandtourism.gov.in | Permit check: Forest Dept permit IS mandatory (₹200/₹800), currently null/none — see Corrections |
| lansdowne | confirmed | uttarakhandtourism.gov.in/destination/lansdowne · aai.aero/en/airports/dehradun | Access, permit (none for Indian nationals), Jolly Grant operational |
| munsiyari | confirmed | uttarakhandtourism.gov.in/destination/munsiyari · aai.aero/en/airports/pantnagar | Access, permit (none), Pantnagar 150km confirmed operational |
| kanatal | confirmed | uttarakhandtourism.gov.in/destination/kanatal · aai.aero/en/airports/dehradun | Access, permit (none), no road closures, Jolly Grant operational |
| binsar | confirmed | uttarakhandtourism.gov.in/destination/binsar · aai.aero/en/airports/pantnagar | Access, sanctuary entry fee (standard, not ILP), Pantnagar operational |
| ranikhet | confirmed | uttarakhandtourism.gov.in/destination/ranikhet · aai.aero/en/airports/pantnagar | Access, permit (none for Indian nationals), Pantnagar operational |
| kausani | confirmed | uttarakhandtourism.gov.in/destination/kausani · aai.aero/en/airports/pantnagar | Access, permit (none), Pantnagar operational, season data accurate |
| chakrata | **needs_correction** | chakrata.cantt.gov.in · uttarakhandtourism.gov.in | Permit check: cantonment restricted zone confirmed; foreign nationals require ILP — see Corrections |
| champawat | confirmed | uttarakhandtourism.gov.in/destination/champawat · aai.aero/en/airports/pantnagar | Access, permit (none), Pantnagar operational |
| roopkund | *skipped* | — | Insufficient official sources for permit correction; travel blogs only; keeping honest older date |
| tehri | confirmed | uttarakhandtourism.gov.in/destination/tehri · aai.aero/en/airports/dehradun | Access, permit (none), Jolly Grant operational, avoid_months [7,8] covers monsoon |
| guptkashi | confirmed | uttarakhandtourism.gov.in/destination/guptkashi · aai.aero/en/airports/dehradun | Access, permit (none), Jolly Grant operational, avoid_months accurate |
| dhanaulti | confirmed | uttarakhandtourism.gov.in/destination/dhanaulti · aai.aero/en/airports/dehradun | Access, permit (none), Eco Park open, no advisories |
| joshimath | confirmed | uttarakhandtourism.gov.in/destination/joshimath · aai.aero/en/airports/dehradun | Access: subsidence monitoring ongoing but no tourist closure in force Sep 2026; permit (none); Jolly Grant operational |
| pithoragarh | confirmed | uttarakhandtourism.gov.in/destination/pithoragarh · aai.aero/en/airports/pantnagar | Access, permit (none for Pithoragarh town itself), Pantnagar operational |
| uttarkashi | confirmed | uttarakhandtourism.gov.in/destination/uttarkashi · aai.aero/en/airports/dehradun | Access, permit (none), Jolly Grant operational, no road closures beyond seasonal |
| tungnath | confirmed | uttarakhandtourism.gov.in/destination/tungnath · aai.aero/en/airports/dehradun | Access, permit (none), temple seasonal May–Nov, Jolly Grant operational |
| sarnath | confirmed | varanasi.nic.in · aai.aero/en/airports/varanasi | Access, permit (none), LBS Airport operational, heritage site open year-round |
| ayodhya | **needs_correction** | ayodhya.nic.in · aai.aero/en/airports/ayodhya | Airport check: Ayodhya airport now primary gateway (1.9M pax FY2025-26); '(new)' label outdated — see Corrections |
| lucknow | confirmed | lucknow.nic.in · aai.aero/en/airports/lucknow | Access, permit (none), CCS Airport operational |
| prayagraj | confirmed | prayagraj.nic.in · aai.aero/en/airports/prayagraj | Access, permit (none), Prayagraj airport operational, Mahakumbh 2025 concluded |
| sravasti | confirmed | balrampur.nic.in · aai.aero/en/airports/gorakhpur | Access, permit (none), Gorakhpur airport operational (~140km), Buddhist circuit accessible |
| kushinagar | confirmed | kushinagar.nic.in · aai.aero/en/airports/gorakhpur | Access, permit (none), Gorakhpur operational, Kushinagar International also confirmed for charters |
| chitrakoot | **needs_correction** | chitrakoot.nic.in · aai.aero/en/airports/prayagraj | Airport name check: 'Allahabad' is old name, now officially Prayagraj — see Corrections |
| tarkarli | confirmed | maharashtratourism.gov.in · aai.aero/en/airports/pune | Access, permit (none), Sindhudurg destination open, Pune airport verified |
| tadoba | confirmed | maharashtratourism.gov.in · aai.aero/en/airports/pune | Access, standard safari booking (not ILP), reserve open, permit_type='none' accurate |
| harihareshwar | confirmed | maharashtratourism.gov.in · aai.aero/en/airports/pune | Access, permit (none), coastal/temple site open, Pune airport verified |
| ratnagiri | **needs_correction** | maharashtratourism.gov.in · aai.aero/en/airports/pune | Airport check: DGCA confirms no scheduled commercial ops at Ratnagiri; current 'limited flights' is incorrect — see Corrections |
| bidar | confirmed | bidar.nic.in · karnatakatourism.org/en/destination/bidar | Access, permit (none), Hyderabad airport nearest operational, heritage site open |
| dharmasthala | confirmed | deccanherald.com · karnatakatourism.org/en/destination/dharmasthala | Access, permit (none), Mangaluru airport operational, temple open year-round |
| pattadakal | confirmed | bagalkot.nic.in · karnatakatourism.org/en/destination/pattadakal | Access, permit (none), UNESCO site open, Hubballi airport nearest |
| gokarna | **needs_correction** | karnatakatourism.org/en/destination/gokarna · deccanherald.com | Railhead distance check: Gokarna Road station is 10km not 8km — see Corrections |
| nandi-hills | confirmed | chikkaballapur.nic.in · karnatakatourism.org/en/destination/nandi-hills | Access (6am–6pm), permit (none), KIA Bengaluru operational, no changes |
| mangalore | confirmed | deccanherald.com/india/karnataka/mangaluru · karnatakatourism.org/en/destination/mangalore | Access, permit (none), Mangaluru International Airport operational |
| bijapur | confirmed | vijayapura.nic.in · karnatakatourism.org/en/destination/vijayapura | Access, permit (none), Gol Gumbaz open, Hubballi airport nearest |
| bengaluru | confirmed | bengaluruurban.nic.in · karnatakatourism.org/en/destination/bengaluru | Access, permit (none), KIA operational, major metro all facilities confirmed |
| chitradurga | confirmed | chitradurga.nic.in · karnatakatourism.org/en/destination/chitradurga | Access, permit (none), Chitradurga Fort open, no closures |

---

## Corrections (6 proposed — apply in a human session with sources)

### 1. valley-of-flowers — permit_required + permit_type

**Current:**
- `permit_required`: `null`
- `permit_type`: `"none"`

**Proposed:**
- `permit_required`: `true`
- `permit_type`: `"Forest/national park entry permit"`

**Source:** https://valleyofflower.uk.gov.in (official Uttarakhand Govt site for Valley of Flowers NP)

**Evidence:** Valley of Flowers National Park requires a mandatory Forest Department entry permit obtained at the check-post at Ghangaria. Fee: ₹200 for Indian nationals, ₹800 for foreign nationals. Permit valid for 3 days. The park does not admit visitors without this ticket. Neither field currently reflects this requirement.

---

### 2. chakrata — permit_required + permit_type

**Current:**
- `permit_required`: `null`
- `permit_type`: `"none"`

**Proposed:**
- `permit_required`: `true`
- `permit_type`: `"Inner Line Permit (ILP) for foreign nationals — Chakrata is a restricted cantonment zone"`

**Source:** https://chakrata.cantt.gov.in (official Chakrata Cantonment Board)

**Evidence:** Chakrata is a restricted cantonment town. Foreign nationals require an Inner Line Permit / Restricted Area Permit before visiting. Indian nationals may visit freely. The current `null`/`none` values are accurate for Indian nationals but create a dangerous information gap for foreign visitors, who will be turned back at the entry checkpoint without a permit.

---

### 3. ayodhya — nearest_airport

**Current:** `"Lucknow (135km) / Ayodhya (new)"`

**Proposed:** `"Maryada Purushottam Shri Ram Airport, Ayodhya — 15km (operational; 4+ airlines, 1.9M pax FY2025-26) / Lucknow — 135km (alternate for wider connectivity)"`

**Source:** AAI airport data for AYJ (Ayodhya) + https://ayodhya.nic.in

**Evidence:** Ayodhya airport (IATA: AYJ) was inaugurated January 2024 and is now fully operational with scheduled services to Delhi, Mumbai, Bengaluru, Ahmedabad, and more. It served 1.9 million passengers in FY 2025-26. Distance from Ayodhya city centre: ~15km. Labelling it "(new)" and placing Lucknow first is misleading for current travelers — Ayodhya is now the primary gateway.

---

### 4. chitrakoot — nearest_airport

**Current:** `"Allahabad/Khajuraho — 130km"`

**Proposed:** `"Prayagraj (formerly Allahabad, IATA: IXD) — 130km / Khajuraho — 130km"`

**Source:** https://www.aai.aero/en/airports/prayagraj

**Evidence:** Allahabad city was officially renamed Prayagraj in 2018; the airport (Bamrauli Airport, IATA: IXD) was correspondingly renamed to Prayagraj Airport. AAI's official listing uses "Prayagraj". Using the old name "Allahabad" is factually incorrect per current official naming. The distance (130km) remains accurate.

---

### 5. ratnagiri — nearest_airport

**Current:** `"Ratnagiri Airport (limited flights)"`

**Proposed:** `"No scheduled commercial flights from Ratnagiri. Nearest: Goa (Manohar International Airport) ~130km or Pune ~330km. Ratnagiri civil terminal under construction; commercial ops not yet started."`

**Source:** https://www.maharashtratourism.gov.in + DGCA FDIMS (no scheduled services at Ratnagiri)

**Evidence:** Ratnagiri's airstrip is an Indian Coast Guard air station with no civilian scheduled operations. DGCA's Flight Departure Information Management System (FDIMS) confirms zero scheduled airlines serving Ratnagiri. A Maharashtra government MoU signed in July 2026 allows civil operations from the Coast Guard strip, but the civilian terminal was only ~35% complete as of late 2025 and commercial services have not commenced. The current "limited flights" claim is factually incorrect and will mislead travelers into not booking flights via Goa or Pune.

---

### 6. gokarna — nearest_railhead

**Current:** `"Gokarna Road Railway Station — 8km"`

**Proposed:** `"Gokarna Road Railway Station — 10km"`

**Source:** https://karnatakatourism.org/en/destination/gokarna

**Evidence:** Gokarna Road station (on the Konkan Railway line) is consistently cited as approximately 10km from Gokarna town across Karnataka Tourism and railway reference data. The 8km figure in the current field understates the distance. Minor but factually incorrect.

---

## Skipped

| id | reason |
|----|--------|
| roopkund | Trekking agents proposed a permit correction but all sources were travel blogs (himalayanhikers.in, trekthehimalayas.com). No official source (.gov.in/.nic.in or named news outlet) found to confirm the permit requirement. Keeping the honest older `content_reviewed_at` date. |

---

*Do not commit this file — wrapper commits it after stamping.*

## Wrapper outcome

```
correction valley-of-flowers: permit_required, permit_type
correction chakrata: permit_required, permit_type
correction ayodhya: nearest_airport
correction chitrakoot: nearest_airport
correction ratnagiri: nearest_airport
correction gokarna: nearest_railhead
stamped 34: auli, yamunotri, gangotri, mukteshwar, lansdowne, munsiyari, kanatal, binsar, ranikhet, kausani, champawat, tehri, guptkashi, dhanaulti, joshimath, pithoragarh, uttarkashi, tungnath, sarnath, lucknow, prayagraj, sravasti, kushinagar, tarkarli, tadoba, harihareshwar, bidar, dharmasthala, pattadakal, nandi-hills, mangalore, bijapur, bengaluru, chitradurga
RESULT stamped=34 valid=34 corrections=6 dropped=0 unreviewed=1
```
