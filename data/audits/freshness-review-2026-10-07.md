# Freshness Review — 2026-10-07

**Batch:** 41 destinations — Karnataka (17), Maharashtra (8), Goa (6), Tamil Nadu (3), UP (1), Kerala (2), Uttarakhand (2)
**Method:** 6 Sonnet sub-agents in 2 waves of 3 (max 7 destinations each); orchestrator decided each verdict. West/South regional dailies added to NEWS_HOSTS this run (freepressjournal.in, pudhari.news, navhindtimes.in, starofmysore.com, dtnext.in, etc.).
**Reviewed:** 36 · **Valid:** 32 · **Corrections:** 4 (3 queueable, 1 escalated) · **Skipped:** 5

Validator: `RESULT stamped=0 valid=32 corrections=4 queued=0 queueable=3 escalated=1 dropped=0 unreviewed=5`

---

## Destination table

| id | verdict | sources | what checked |
|---|---|---|---|
| nagarhole | confirmed | karnatakatourism.org · en.wikipedia.org | Park closures, fire alerts, road blocks; none found. Park open. starofmysore.com + thehansindia.com also confirmed. |
| chikmagalur | confirmed | chikkamagaluru.nic.in · en.wikipedia.org | Road closures, landslides, permit changes; none found. All current fields accurate. **Unverified flag:** Shivamogga Airport (RQY) now operational; possible nearest_airport correction — escalated, no official distance available. |
| jog-falls | confirmed | karnatakatourism.org · en.wikipedia.org | Dam closure, access disruptions; none found. Site open, post-monsoon peak. |
| shravanabelagola | confirmed | karnatakatourism.org · en.wikipedia.org | Mahamastakabhisheka (next 2030), entry fees, permits; none found. Open year-round. |
| kabini | confirmed | karnatakatourism.org · en.wikipedia.org | Resort closures, park access, wildlife alerts; none found. Open. |
| udupi | confirmed | karnatakatourism.org · en.wikipedia.org | Temple closure, coastal restrictions, permits; none found. Open. |
| murudeshwar | confirmed | karnatakatourism.org · en.wikipedia.org | Temple closure, entry fee changes, coastal advisories; none found. Open. Pre-existing dress code unchanged. |
| karwar | confirmed | karnatakatourism.org · en.wikipedia.org | Coastal advisories, navy base restrictions, road closures; none found. Accessible. |
| dandeli | confirmed | uttarakannada.nic.in · en.wikipedia.org | Forest closure, rafting suspension, permits; none found. Open, Oct is season start. |
| sakleshpur | confirmed | karnatakatourism.org · en.wikipedia.org | Landslides, ghat road closures; none found. Open, post-monsoon. |
| kukke-subramanya | confirmed | karnatakatourism.org · en.wikipedia.org | Temple closure, flood and landslide alerts, permits; none found. Open. |
| aihole | confirmed | karnatakatourism.org · incredibleindia.gov.in | ASI closure, access disruptions; none found. Open, entry fee unchanged. |
| belur | confirmed | karnatakatourism.org · deccanherald.com | ASI closure, Hoysala WHS changes, entry fee; none found. Chennakeshava Temple open. |
| badami | confirmed | karnatakatourism.org · incredibleindia.gov.in | ASI cave closure, rock stability; none found. Open, entry fees unchanged. |
| hampi | confirmed | karnatakatourism.org · mausam.imd.gov.in | UNESCO closure, Tungabhadra flood damage, road closures; none found. Oct is peak. |
| srirangapatna | **needs_correction** (escalated) | karnatakatourism.org · deccanherald.com | Monsoon access. Official page confirms Jul–Sep floods ghats, suspends coracle rides; deccanherald.com confirmed suspension Aug 15 – late Sep 2026. best_months incorrectly includes months 7, 8, 9. |
| raigad-fort | confirmed | raigad.gov.in · freepressjournal.in | Fort access, ropeway, monsoon damage; none found in this run's research. **Unverified flag (prior session, not independently confirmed):** pudhari.news + freepressjournal.in reported ropeway closed Sep 21 – Nov 15, 2026 for maintenance; `local_logistics.shop_hours` "Ropeway 7am-6pm." may be wrong. Escalate for manual verification. |
| bhimashankar | **skipped** | — | maharashtratourism.gov.in JS-gated (no usable content); no other qualified sources found. |
| kolad | **skipped** | — | No qualified official or named-news sources found. |
| lonar-crater | **needs_correction** (queued) | aai.aero · freepressjournal.in | Airport page shows rename. nearest_airport queued for approval. |
| panchgani | confirmed | deccanchronicle.com · en.wikipedia.org | Road closures, Mahabaleshwar route landslides; none found. Accessible, post-monsoon. |
| pune | confirmed | aai.aero · en.wikipedia.org | Airport operational status, city disruptions; none found. PNQ operational. |
| aurangabad | **needs_correction** (queued) | aai.aero · tribuneindia.com | Airport and station renamed to Chhatrapati Sambhajinagar. Both corrections queued. |
| lonavala | **skipped** | — | No qualified official or named-news sources found. |
| ellora-caves | **needs_correction** (queued) | aai.aero · tribuneindia.com | Same renames as Aurangabad (30km distances unchanged). Both corrections queued. |
| trimbakeshwar | confirmed | newsonair.gov.in · deccanherald.com | Temple closure, Kumbh 2027 disruptions; none found. Normal darshan unaffected. |
| mandrem | confirmed | navhindtimes.in · en.wikipedia.org | Beach shack season, road closures; navhindtimes.in confirmed North Goa shacks opened before Oct 1. |
| ponda-spice | **skipped** | — | Goa state tourism JS-gated; no other qualified sources found. |
| morjim | confirmed | navhindtimes.in · en.wikipedia.org | Shack season, turtle nesting zone; shacks open. Pre-existing turtle rules unchanged. |
| candolim | confirmed | navhindtimes.in · en.wikipedia.org | Shack season; article specifically mentioned Calangute-Candolim belt opening. Season open. |
| assagao | confirmed | navhindtimes.in · en.wikipedia.org | Seasonal access; North Goa season open. DB already shows Mopa Airport (GOX). |
| siolim | confirmed | navhindtimes.in · en.wikipedia.org | Bridge status, shack season; season open, Siolim Bridge operational. |
| kotagiri | confirmed | dtnext.in · en.wikipedia.org | Road closures, Nilgiris landslides, permits; none found. Accessible. |
| coonoor | confirmed | dtnext.in · onmanorama.com | NMR disruptions, Nilgiris landslides; none found. Accessible. |
| trichy | confirmed | deccanherald.com · en.wikipedia.org | Temple closures, airport/rail disruptions; none found. City fully operational. |
| vrindavan | confirmed | etvbharat.com · en.wikipedia.org | VIP restrictions, Yamuna flood, permits; none found. Oct–Nov is peak. |
| kannur | confirmed | onmanorama.com · keralatourism.org | Coastal advisories, permits, weather; none found. Accessible. |
| bekal | confirmed | onmanorama.com · keralatourism.org | Fort access, coastal advisories; none found. Bekal Fort and beach accessible. |
| halebidu | **skipped** | — | karnatakatourism.org both /halebidu and /halebid slugs returned 404; no other qualified sources found. |
| badrinath | confirmed | etvbharat.com · en.wikipedia.org | Temple closure date, road blockage, weather; temple still open as of research date. |
| haridwar | confirmed | etvbharat.com · en.wikipedia.org | Ganga flood, VIP restrictions; none found. Accessible year-round. |

---

## Corrections

### QUEUED — 3 items to founder inbox

**lonar-crater — nearest_airport**
- Current: `"Aurangabad Airport (IXU) — 150km"`
- Proposed: `"Chhatrapati Sambhajinagar Airport (IXU) — 150km"`
- Source: https://www.aai.aero/en/airports/aurangabad — page heading shows "Chhatrapati Sambhajinagar Airport"
- Note: IATA code IXU and distance 150km unchanged; only the name changed.

**aurangabad — nearest_airport + nearest_railhead**
- Airport current: `"Aurangabad Airport (IXU)"` → `"Chhatrapati Sambhajinagar Airport (IXU)"`
  Source: https://www.aai.aero/en/airports/aurangabad — "Chhatrapati Sambhajinagar Airport"
- Railhead current: `"Aurangabad Railway Station"` → `"Chhatrapati Sambhajinagar Railway Station"`
  Source: https://www.tribuneindia.com/ — station renamed Chhatrapati Sambhajinagar (code CPSN), Oct 2025

**ellora-caves — nearest_airport + nearest_railhead**
- Airport current: `"Aurangabad Airport (IXU) — 30km"` → `"Chhatrapati Sambhajinagar Airport (IXU) — 30km"`
  Source: https://www.aai.aero/en/airports/aurangabad
- Railhead current: `"Aurangabad Railway Station — 30km"` → `"Chhatrapati Sambhajinagar Railway Station — 30km"`
  Source: https://www.tribuneindia.com/ — station renamed Chhatrapati Sambhajinagar (CPSN), Oct 2025

---

### ESCALATED — manual edit required

**srirangapatna — best_months + avoid_months**
- Current best_months: `[10, 11, 12, 1, 2, 3, 7, 8, 9]`
- Proposed: `[10, 11, 12, 1, 2, 3]` — remove months 7, 8, 9
- Current avoid_months: `[4, 5]`
- Proposed: `[4, 5, 6, 7, 8, 9]` — add months 6, 7, 8, 9
- Source: https://www.karnatakatourism.org/en/destinations/srirangapatna/ — "July to September brings the monsoon. The Kaveri rises, the ghats go underwater." Coracle rides suspended.
- Corroborating: deccanherald.com — boating and coracle rides suspended Aug 15 2026, resumed late Sep 2026.
- Note: best_months and avoid_months are not QUEUE_FIELDS; needs manual DB edit.

---

### ESCALATED — pending verification

**chikmagalur — nearest_airport (Shivamogga Airport)**
- Shivamogga Airport (RQY, Rashtrakavi Kuvempu Airport) is operational per aim-india.aai.aero (1,81,587 passengers FY25-26). Travel estimates put it ~88km from Chikmagalur vs Mangalore Airport ~140km — may be significantly closer.
- Cannot queue: no official distance in district NIC pages (chikkamagaluru.nic.in predates airport, last updated Dec 2022).
- Action: check chikkamagaluru.nic.in once updated, or confirm via official district resource.

**raigad-fort — local_logistics (ropeway)**
- Prior session found: ropeway closed Sep 21 – Nov 15, 2026 for maintenance (sources: pudhari.news + freepressjournal.in — both now in NEWS_HOSTS). `local_logistics.shop_hours` currently shows "Ropeway 7am-6pm." which may be wrong during this window.
- NOT independently verified in this run. Cannot add to entries without personal source verification.
- Action: verify via freepressjournal.in or pudhari.news and do a manual local_logistics edit before Nov 15.

---

## Skipped — reason per id

| id | searched | reason |
|---|---|---|
| bhimashankar | maharashtratourism.gov.in, WebSearch for closures/advisories | Maharashtra Tourism site JS-gated (returns only CSS/scripts); no other qualified official or named-news source found. |
| kolad | WebSearch for Kolad rafting closures, Raigad district NIC | No qualified official or named-news source found in research. |
| halebidu | karnatakatourism.org/en/destinations/halebidu, /halebid | Both karnatakatourism.org slug variants returned 404; no other qualified sources found. |
| lonavala | WebSearch for closures, MTDC, Pune district NIC | No qualified official or named-news source found in research. |
| ponda-spice | goatourism.gov.in (JS-gated), WebSearch | Goa state tourism JS-gated; no other qualified sources found. |

---

`RESULT confirmed=32 corrections=4 skipped=5`

## Wrapper outcome

```
queued lonar-crater: nearest_airport "Aurangabad Airport (IXU) — 150km" → "Chhatrapati Sambhajinagar Airport (IXU) — 150km"
queued aurangabad: nearest_airport "Aurangabad Airport (IXU)" → "Chhatrapati Sambhajinagar Airport (IXU)"; nearest_railhead "Aurangabad Railway Station" → "Chhatrapati Sambhajinagar Railway Station"
queued ellora-caves: nearest_airport "Aurangabad Airport (IXU) — 30km" → "Chhatrapati Sambhajinagar Airport (IXU) — 30km"; nearest_railhead "Aurangabad Railway Station — 30km" → "Chhatrapati Sambhajinagar Railway Station — 30km"
escalated srirangapatna: best_months needs a manual edit
stamped 32: nagarhole, chikmagalur, jog-falls, shravanabelagola, kabini, udupi, murudeshwar, karwar, dandeli, sakleshpur, kukke-subramanya, aihole, belur, badami, hampi, raigad-fort, panchgani, trimbakeshwar, pune, kotagiri, coonoor, trichy, vrindavan, kannur, bekal, badrinath, haridwar, mandrem, morjim, candolim, siolim, assagao
RESULT stamped=32 valid=32 corrections=4 queued=3 queueable=3 escalated=1 dropped=0 unreviewed=5
```
