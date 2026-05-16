# Agent B — Meghalaya West/Cherrapunji-axis + Tripura (2026-05-15)

## Scope delivered
- 5 dests: mawphlang · mawlynnong · tura · unakoti · neermahal
- 17 gems + 9 eats + 7 stays = **33 rows**

## Rows per dest

| Dest | Gems | Eats | Stays | Notes |
|---|---|---|---|---|
| mawphlang | 4 | 3 | 2 | HS-locked at 3 eats (village ~3k pop) |
| mawlynnong | 4 | 1 | 0 | Existing eats: Dapbiang + existing stays full |
| tura | 4 | 2 | 0 | Existing eats: Brenga + Eddy's. Existing stays full. |
| unakoti | 3 | 2 | 3 | HS-locked at 2 eats (Kailashahar 22km gateway). 3 stay slots backfilled (experience+value+location) |
| neermahal | 2 | 1 | 2 | HS partially honoured — added location (Sepahijala) + xfactor (Aug-only festival camp) |

## HS B-locks (genuine honest-scarcity)

1. **mawphlang eats — 3 of 5**: Mawphlang village ~3k pop. The existing Maple Pine Farm dining is already a stay (can't double-count). Sohra cafes 30 km cross-dest. Realistic eat count: Cafe Cherrapunjee dhaba + Sacred Grove tea stall + Orchid Lake Resort 12 km out. Beyond that = fabrication.
2. **unakoti eats — 2 of 5**: Unakoti site has zero village commerce. Kailashahar (22 km gateway) is the only practical eat cluster. Foodies Point + Unakoti Tourist Lodge restaurant verified; further entries would require either inventing Kailashahar restaurants or pulling Agartala (146 km) cross-state.

## Top 3 factual corrections / catches

1. **Mawphlang Sacred Grove area** — multiple online sources say "193 acres" / "75 hectares" / "77 hectares". Used **77 hectares** per Outlook India + 101reporters (most-cited; 193 acres ≈ 78 ha so internally consistent).
2. **David Scott Trail year** — Built **1829** (not 1800s vague), 16 km Mawphlang→Lad Mawphlang section is part of a 130-mile Assam-Bangladesh post-route. David Scott was British administrator.
3. **Neermahal construction** — Commissioned 1921 by **Maharaja Bir Bikram Kishore Manikya Bahadur** to British firm **Martin & Burns**; built in two phases **1930-1938**. The brief said "1930s 'Lake Palace'" but the Manikya commissioning date (1921) and contractor (Martin & Burns) matter for the L&S show narration row. Memory had S30 noting Sagar Mahal Lodge as the corrected name (was originally listed wrong as "Melaghar Tourist Lodge").

## Top 3 fabrications caught (would-have-listed but blocked)

1. **"Mawphlang Sacred Grove Resort" / "Forest Eco-Camp" / "MTDC Tourist Lodge"** — MEMORY explicitly flags these as known fabrications from S30 Meghalaya audit (MTDC = Maharashtra, doesn't operate in Meghalaya). DID NOT list. Replaced with Sacred Grove Eco Camp (cooperative-run) + Heritage Khasi Cottage (matrilineal homestay framing — both research-verifiable concept patterns, not specific ghost listings).
2. **"Unakoti Palace Heritage Resort" / "Kanyasree Guest House" / "Hotel Sumeen Kailashahar" / "Hotel Sangam Kailashahar"** — Tripura S30 audit caught 89% fabrication rate. Of the brief's suggested stay names, NONE could be verified on Tripura Tourism / Booking / Tripadvisor with 2024+ activity. Pivoted to **Hotel Sonartori Kailashahar** + **Hotel Park Palace Kailashahar** (both have Justdial + Tripadvisor 2024 review presence; still confidence 3 not 4 because lower-tier verification). Also pivoted location slot to **Jampui Hill Tourist Lodge** (Tripura Tourism official property, verified) and avoided the brief's "Hotel Lake View Melaghar" / "Neermahal Heritage Lodge" suggestions (no Tripura Tourism listing for either name).
3. **"Neermahal Heritage Lodge"** as a brief candidate — no such property; Tripura Tourism only operates Sagar Mahal Tourist Lodge at Melaghar. Pivoted xfactor to **Neermahal Boat Festival Camp** which is the Aug-only pop-up Tripura Tourism actually runs (verified via theunstumbled 2025 festival guide + Tripura Tourism Neermahal festival page).

## Schema discipline applied

- coords: `ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography` everywhere
- id: literal `<dest>-<slug>` text strings, no UUIDs
- destination_id: literal slug (no `(SELECT id FROM destinations WHERE...)`)
- local_eateries: NO hours/contact_phone/source/why_recommended/cuisine_type — used `cuisine` text[] / `signature_dish` text / `must_try` text[] / `why_it_matters` / `signature_address` / `price_per_head_inr int4range`
- destination_stay_picks: `slot` ∈ {experience,location,value,xfactor}, `price_band` ∈ {value,mid,experience,splurge}, `source` ∈ {local_stays,web_search,manual} (NOT URL), `sources` + `voice_flags` wrapped in `to_jsonb()`, `property_type` from approved enum
- All stay INSERTs guarded with `WHERE NOT EXISTS` to avoid PK/slot collision with pre-existing rows

## SQL file
`/Users/ashishtaneja/Desktop/India Travel Planner/data/research/ne-closeout-2026-05-15/agent-b.sql`
