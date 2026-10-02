# Freshness Review — 2026-10-03

**Batch picked:** 2026-10-02T21:00:06.908Z
**Reviewed by:** Claude (Sonnet 4.6) + 3 Haiku sub-agents
**Batch size:** 41 destinations
**Result:** confirmed=28 corrections=7 skipped=6

---

## Results table

| id | verdict | sources | what was checked |
|---|---|---|---|
| valley-of-flowers | needs_correction | valleyofflower.uk.gov.in · uttarakhandtourism.gov.in | Permit status: mandatory Forest Dept entry permit found (₹200 Indian / ₹800 foreign); current data says permit_type=none. Carryover from 09-26. |
| chakrata | needs_correction | chakrata.cantt.gov.in · uttarakhandtourism.gov.in | Restricted cantonment: foreign nationals require ILP; current data says permit_type=none. Carryover from 09-26. |
| roopkund | needs_correction | discoverwithdheeraj.com · bikatadventures.com | Supreme Court lifted bugyal camping ban Jul 2026; trek reopened with mandatory Forest Dept permit (₹150/day Indian, ₹600/day foreign). Current data says permit_type=none. NEW finding this run. |
| ayodhya | needs_correction | ayodhya.nic.in · aai.aero | Ayodhya AYJ airport fully operational (1.9M pax FY25-26, 4+ airlines); current nearest_airport still labels it '(new)' and lists Lucknow first. Carryover from 09-26. |
| chitrakoot | needs_correction | chitrakoot.nic.in · aai.aero | Allahabad airport renamed Prayagraj (IATA: IXD); current data still says 'Allahabad'. Carryover from 09-26. |
| ratnagiri | needs_correction | maharashtratourism.gov.in · aai.aero | No scheduled commercial flights from Ratnagiri; current data says 'limited flights'. Terminal under construction. Carryover from 09-26. |
| gokarna | needs_correction | karnatakatourism.org · deccanherald.com | Railhead distance 8km → 10km. Carryover from 09-26. |
| agonda | confirmed | goatourism.gov.in · Wikipedia | No access issues, no permit changes, Canacona station operational, Oct re-season underway. |
| anjuna | confirmed | goatourism.gov.in · Wikipedia | No closures. Flea market reopens Oct. Thivim station operational. |
| arambol | confirmed | goatourism.gov.in · Wikipedia | No closures. Pernem station operational. |
| calangute-baga | confirmed | goatourism.gov.in · Wikipedia | No closures. Thivim station operational. |
| chorao-divar | confirmed | goatourism.gov.in · Wikipedia | Ferry operational; minor Oct 6 ramp maintenance (traditional services unaffected). Karmali station operational. |
| colva-benaulim | confirmed | goatourism.gov.in · Wikipedia | No closures. Madgaon Junction operational. |
| margao | confirmed | goatourism.gov.in · Wikipedia | No closures. Road access improved (new underbridge May 2026). |
| mollem | confirmed | goatourism.gov.in · Wikipedia | Park open 9 AM–5 PM daily. Entry fees unchanged. |
| panaji | confirmed | goatourism.gov.in · Wikipedia | No closures. Both airports operational. Karmali station operational. |
| palolem | confirmed | goatourism.gov.in · Wikipedia | No closures. Oct re-season underway. Canacona station operational. |
| reis-magos | confirmed | goatourism.gov.in · Wikipedia | Fort open Tue–Sun. Entry ₹50 unchanged. |
| vagator | confirmed | goatourism.gov.in · Wikipedia | No closures. Thivim station operational. |
| matheran | confirmed | maharashtratourism.gov.in · x.com/Central_Railway | Toy train (Neral–Aman Lodge) suspended 15 Jun–15 Oct 2026 for monsoon. Resumes 15 Oct. Data (nearest_railhead = Neral Junction) accurate; destination accessible by road. |
| pench-maharashtra | confirmed | maharashtratourism.gov.in · Wikipedia | Reopened 1 Oct 2026. Morning/evening safaris active. Nagpur Airport operational. |
| khandala | confirmed | maharashtratourism.gov.in · deccanherald.com | Jul 2026 expressway landslide cleared. Oct access normal. Station operational. |
| ganpatipule | confirmed | maharashtratourism.gov.in · pudhari.news | Beach reopened late August after monsoon closure. Ratnagiri station (32km) operational. |
| murud-janjira | confirmed | maharashtratourism.gov.in · Wikipedia | Fort seasonal closure (monsoon) ended. Boat ferries operational. |
| amboli | confirmed | maharashtratourism.gov.in · thehansindia.com | Jul 2026 ghat landslide (single-lane passable) cleared by October. Sawantwadi station operational. |
| bhandardara | confirmed | maharashtratourism.gov.in · Wikipedia | Seasonal dam release (Sep 2026) — normal operations, no closure. Igatpuri station operational. |
| alibaug | confirmed | maharashtratourism.gov.in · Wikipedia | No access issues. Ferry route and road intact. |
| nashik | confirmed | maharashtratourism.gov.in · Wikipedia | Airport operational (IndiGo + Star Air). 'Limited flights' data still accurate. Kumbh Mela preparations noted — NH access normal. |
| nagpur | confirmed | maharashtratourism.gov.in · Wikipedia | Dr. Babasaheb Ambedkar International Airport operational. No renamings. |
| kolhapur | confirmed | maharashtratourism.gov.in · Wikipedia | Airport operational, limited domestic routes. No suspensions. |
| shirdi | confirmed | maharashtratourism.gov.in · Wikipedia | Temple open 5 AM–10 PM daily. Shirdi Airport (SAG) operational. |
| kashid | confirmed | maharashtratourism.gov.in · Wikipedia | No access issues. Roha station operational. |
| malvan | confirmed | maharashtratourism.gov.in · Wikipedia | Scuba/snorkelling operational. Kudal station operational. |
| daulatabad | confirmed | maharashtratourism.gov.in · Wikipedia | Fort open. Entry fees unchanged. Aurangabad/CSN airport (IXU) rename on hold — current data label still accurate. |
| ajanta-caves | confirmed | maharashtratourism.gov.in · Wikipedia | Caves open Tue–Sun. Jalgaon station operational. Airport rename on hold (current label accurate). |
| nagarhole | skipped | — | No authoritative (.gov.in / named news) source found for Karnataka wildlife parks without search hits on deccanherald.com or nic.in. Keeps prior review date. |
| mysore | skipped | — | No authoritative source found within NEWS_HOSTS or .gov.in / .nic.in for Oct 2026 status. Keeps prior review date. |
| chikmagalur | skipped | — | No authoritative source found. Keeps prior review date. |
| jog-falls | skipped | — | No authoritative source found. Keeps prior review date. |
| shravanabelagola | skipped | — | No authoritative source found. Keeps prior review date. |
| kabini | skipped | — | No authoritative source found for Karnataka Forest Dept Oct 2026 status. Keeps prior review date. |

---

## Corrections (7)

### 1. valley-of-flowers — permit_required + permit_type (carryover)
- **field:** `permit_required` | current: `null` | proposed: `true`
- **field:** `permit_type` | current: `none` | proposed: `Forest/national park entry permit`
- **source:** https://valleyofflower.uk.gov.in — "Forest Dept entry permit mandatory; fee ₹200 Indian / ₹800 foreign"
- **note:** Also found daily_cost.note still says "entry fee ₹150" (should be ₹200) and "Open Jul-Sep only" (actual: Jun 1–Oct 31). These prose corrections are not in the entries schema but should be patched manually.

### 2. chakrata — permit_required + permit_type (carryover)
- **field:** `permit_required` | current: `null` | proposed: `true`
- **field:** `permit_type` | current: `none` | proposed: `Inner Line Permit (ILP) for foreign nationals`
- **source:** https://chakrata.cantt.gov.in — restricted cantonment zone

### 3. roopkund — permit_required + permit_type (NEW)
- **field:** `permit_required` | current: `null` | proposed: `true`
- **field:** `permit_type` | current: `none` | proposed: `Forest Department entry permit — ₹150/day Indian, ₹600/day foreign`
- **source:** https://discoverwithdheeraj.com/your-trip-to-roopkund-or-dayara-bugyal-could-now-be-in-trouble/ + https://www.bikatadventures.com/Home/Itinerary/Roopkund-Trek
- **⚠ Note:** No official .gov.in source confirmed. Multiple independent trek operators agree. Verify with Chamoli Forest Division (chamoli.nic.in) before applying.

### 4. ayodhya — nearest_airport (carryover)
- **field:** `nearest_airport` | current: `Lucknow (135km) / Ayodhya (new)` | proposed: `Maryada Purushottam Shri Ram Airport, Ayodhya — 15km (operational; 4+ airlines, 1.9M pax FY2025-26) / Lucknow — 135km`
- **source:** https://ayodhya.nic.in + AAI data (1.9M pax FY2025-26, AYJ operational since Jan 2024)

### 5. chitrakoot — nearest_airport (carryover)
- **field:** `nearest_airport` | current: `Allahabad/Khajuraho — 130km` | proposed: `Prayagraj (formerly Allahabad, IATA: IXD) — 130km / Khajuraho — 130km`
- **source:** https://www.aai.aero/en/airports/prayagraj

### 6. ratnagiri — nearest_airport (carryover)
- **field:** `nearest_airport` | current: `Ratnagiri Airport (limited flights)` | proposed: `No scheduled commercial flights. Nearest: Goa (Manohar International) ~130km or Pune ~330km.`
- **source:** maharashtratourism.gov.in + DGCA FDIMS — no scheduled ops; terminal ~35% complete

### 7. gokarna — nearest_railhead (carryover)
- **field:** `nearest_railhead` | current: `Gokarna Road Railway Station — 8km` | proposed: `Gokarna Road Railway Station — 10km`
- **source:** https://karnatakatourism.org/en/destination/gokarna

---

## Advisory notes (no data change required)

- **matheran:** Toy train (Neral–Aman Lodge) suspended until 15 Oct 2026 (monsoon safety). Resumes in 12 days. Data field is correct; worth noting in a "current conditions" block if the site has one.
- **valley-of-flowers:** daily_cost.note contains two stale facts not captured in the schema corrections: (a) "entry fee ₹150" should be ₹200; (b) "Open Jul-Sep only" should be Jun–Oct. Needs a manual note/patch.
- **pench-maharashtra:** Safari permit fee increase proposed by Maharashtra Forest Dept but not yet approved; no change to data needed now.
- **nashik:** Simhastha Kumbh Mela prep 2026-2027 may increase pressure on NH access to Nashik. No current disruption.
- **daulatabad / ajanta-caves:** Aurangabad airport rename to Chhatrapati Sambhajinagar on hold per AAI as of Dec 2025. Current 'Aurangabad Airport (IXU)' label remains correct; no action needed until AAI formalises.

---

## Skipped destinations (Karnataka — 6)

nagarhole, mysore, chikmagalur, jog-falls, shravanabelagola, kabini

These destinations could not be confirmed because no source matching `*.gov.in`, `*.nic.in`, or the `NEWS_HOSTS` list (as defined in freshness-review.mjs) was found in searches for Karnataka wildlife/tourism status in Jul–Oct 2026. karnatakatourism.org is the official body but its .org domain fails the `isAuthoritative` check. Recommended fix: add `karnatakatourism.org` to `NEWS_HOSTS` in the script, or check for a corresponding `.kar.nic.in` or `aranya.gov.in` source.

All 6 are expected to be fully operational (Kabini/Nagarhole open year-round; Oct is peak season; no closures reported). They keep their April 2026 review dates until a proper authoritative source can be cited.

## Wrapper outcome

```
correction valley-of-flowers: permit_required, permit_type
correction chakrata: permit_required, permit_type
correction roopkund: permit_required, permit_type
correction ayodhya: nearest_airport
correction chitrakoot: nearest_airport
correction ratnagiri: nearest_airport
correction gokarna: nearest_railhead
stamped 28: agonda, anjuna, arambol, calangute-baga, chorao-divar, colva-benaulim, margao, mollem, panaji, palolem, reis-magos, vagator, matheran, pench-maharashtra, khandala, ganpatipule, murud-janjira, amboli, bhandardara, alibaug, nashik, nagpur, kolhapur, shirdi, kashid, malvan, daulatabad, ajanta-caves
RESULT stamped=28 valid=28 corrections=7 dropped=0 unreviewed=6
```
