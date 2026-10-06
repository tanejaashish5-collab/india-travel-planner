# Freshness Review — 2026-10-07

Batch: 41 destinations (Karnataka 15, Maharashtra 13, Goa 7, Tamil Nadu 3, Kerala 2, UP 1, Uttarakhand 1)
All reviewed April–May 2026 (~5 months stale).
Method: 3 parallel Sonnet sub-agents researched all destinations; orchestrator decided verdicts; gap-fill searches for qualifying sources.

---

## Results table

| id | verdict | sources | what was checked |
|----|---------|---------|-----------------|
| kedarnath | confirmed | [ANI — 2025 closing Oct 23](https://www.aninews.in/news/national/general-news/portals-of-kedarnath-dham-to-close-on-oct-23-badrinath-dham-to-close-on-nov-25-for-winter-season20251002131429/) · [newsonair.gov.in — 2026 opening Apr 22](https://www.newsonair.gov.in/uttarakhand-kedarnath-temple-will-be-opened-on-april-22) | Temple opened Apr 22, 2026; currently open Oct 7. 2026 closing tentatively Nov 11 (Bhai Dooj), not officially announced yet. Nearest airport Dehradun (Jolly Grant) and railhead Rishikesh/Haridwar unchanged. Permit null unchanged. |
| bandipur | confirmed | [Deccan Herald — safaris resume Feb 22](https://www.deccanherald.com/india/karnataka/mysuru/safari-resumes-at-bandipur-tiger-reserve-after-three-months-3908019) · [Wikipedia](https://en.wikipedia.org/wiki/Bandipur_National_Park_and_Tiger_Reserve) | Safaris reopened Feb 22, 2026 after 3-month extraordinary ban (Nov 7, 2025 – Feb 22; tiger-human conflict, 3 farmer deaths). 31 regulated trips/day. Park fully operational in Oct peak season. avoid_months [6,7,8,9] correct. Airport/railhead unchanged. |
| mysore | confirmed | [Deccan Herald — 700 KSRTC buses Oct 15–26 for Dasara](https://www.deccanherald.com/india/karnataka/mysuru/ksrtc-to-deploy-700-special-buses-from-october-15-to-26-as-mysuru-gears-up-for-dasara-4172130) · [Wikipedia](https://en.wikipedia.org/wiki/Mysore) | Mysore Dasara 2026 Oct 11–21; city fully operational. Airport MYQ (limited) / BLR 170km and railhead Mysore Junction unchanged. No access changes. |
| gulbarga | confirmed | [Deccan Herald — Kalaburagi–BLR flights resume Jun 10](https://www.deccanherald.com/india/karnataka/kalaburagi-bengaluru-flight-service-to-resume-from-june-10-4032054) · [Wikipedia Kalaburagi Airport](https://en.wikipedia.org/wiki/Kalaburagi_Airport) | Star Air daily E175 resumed Jun 10, 2026 after 8-month gap. DB field "Kalaburagi Airport (GBI) — limited flights" remains accurate (one route). Railhead unchanged. |
| mahabaleshwar | confirmed | [Maharashtra Tourism official](https://maharashtratourism.gov.in/nature/mahabaleshwar/) · [Wikipedia](https://en.wikipedia.org/wiki/Mahabaleshwar) | Accessible post-monsoon; avoid_months [6,7,8] correct. No closures or state advisories found. Airport Pune PNQ 120km and railhead Wathar 60km unchanged. |
| mumbai | confirmed | [ANI — T1 phased redevelopment, 91% traffic unaffected](https://www.aninews.in/news/business/mumbai-airport-t1-set-for-phased160redevelopment-91-passenger-traffic-unaffected-sources20261003180240/) · [Wikipedia CSMIA](https://en.wikipedia.org/wiki/Chhatrapati_Shivaji_Maharaj_International_Airport) | CSMIA (BOM) fully operational. T1 closing Oct 25, 2026 for ~4-year redevelopment; airlines (IndiGo/SpiceJet/Akasa) moving to T2. nearest_airport BOM field unchanged and correct. No DB field is wrong; T1 closure warrants manual local_logistics note. |

---

## Skipped destinations (35)

Qualifying sources (NEWS_HOSTS or .gov.in/.nic.in + a second host) could not be found within research scope for the following destinations. They retain their existing `content_reviewed_at` dates.

nagarhole, kabini, jog-falls, shravanabelagola, udupi, murudeshwar, karwar, srirangapatna, sakleshpur, kukke-subramanya, aihole, badami, aurangabad, ellora-caves, bhimashankar, lonar-crater, raigad-fort, panchgani, pune, mandrem, morjim, siolim, lonavala, coonoor, kotagiri, bekal, vrindavan, and remaining Goa/TN/KL destinations in batch.

---

## Corrections

No corrections proposed this run.

### Flagged for manual follow-up (not DB corrections)

**aurangabad + ellora-caves — nearest_railhead stale**
Aurangabad Railway Station was renamed **Chhatrapati Sambhajinagar Railway Station** (code CPSN) on Oct 25, 2025 (South Central Railway gazette). Batch still shows "Aurangabad Railway Station". A qualifying source specifically confirming the station rename (aninews.in, ndtv.com, newsonair.gov.in) was not found during this run despite multiple searches — sources found were constructionworld.in, Muslim Mirror, X/@TheStatesmanLtd (none in NEWS_HOSTS). Recommend: next sprint researcher should check `aninews.in` or `newsonair.gov.in` for a station-rename story and queue the correction then.
Same applies to ellora-caves which shares the same railhead.

**aurangabad — nearest_airport: uncertain**
Airport rename to "Chhatrapati Sambhajinagar Airport" was ordered Dec 2025 but put on hold by AAI. Current official IATA/AAI name may still be "Aurangabad Airport (IXU)". Batch value may be correct. Monitor AAI for official rename confirmation.

**raigad-fort — ropeway closed through Nov 15, 2026**
Ropeway closed Sept 21 – Nov 15, 2026 for maintenance (sources: pudhari.news, freepressjournal.in — neither in NEWS_HOSTS). Visitors must use stairs. local_logistics.shop_hours "Ropeway 7am-6pm." is currently wrong. A qualifying source was not found. Flag for manual update.

**mumbai — T1 closure Oct 25, 2026**
Terminal 1 at CSMIA closing Oct 25 for 4-year redevelopment. 91% of traffic unaffected; airlines moving to T2. No DB field change needed (BOM/CSMIA is still correct) but local_logistics would benefit from a note. Flag for manual update at next sprint.

---

## Validator output

```
would stamp 6: kedarnath, bandipur, mysore, gulbarga, mahabaleshwar, mumbai
RESULT stamped=0 valid=6 corrections=0 queued=0 queueable=0 escalated=0 dropped=0 unreviewed=35
```

## Wrapper outcome

```
stamped 6: kedarnath, bandipur, mysore, gulbarga, mahabaleshwar, mumbai
RESULT stamped=6 valid=6 corrections=0 queued=0 queueable=0 escalated=0 dropped=0 unreviewed=35
```
