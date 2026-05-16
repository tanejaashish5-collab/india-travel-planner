# Agent C — Manipur+Mizoram+Nagaland+Sikkim — Notes 2026-05-15

## Scope tally
- 8 dests assigned
- 6 eats inserted + 5 stays inserted
- **7 HS B-locks declared** (high — NE remote/restricted-zone heavy)

## Per-dest summary

| Dest | Asked | Delivered | HS B-locks | Note |
|---|---|---|---|---|
| tamenglong | 3 eats + 2 stays | 3 eats + 2 stays | 0 | Full delivery. Govt-inventory stays only (PWD IB + Forest Rest House); existing Tourist Lodge `experience` slot already filled. |
| moreh | 0 eats + 2 stays | 0 + 0 | **2 stays** | Tengnoupal District official page lists ONLY Elora Hotel. Tampha = Imphal not Moreh (cross-state contamination caught). Other brief candidates unverifiable. |
| phawngpui-peak | 3 eats + 0 stays | 0 + 0 | **3 eats** | NP-core + Sangau 3-4k fringe. No standalone eateries verifiable. All food = stay-attached. |
| pfutsero | 2 eats + 0 stays | 1 + 0 | **1 eat** | Mini Tourist Lodge canteen delivered. 2nd anchor refused — "rice hotels" category, no named verifiable. |
| gurudongmar-lake | 3 eats + 0 stays | 0 + 0 | **3 eats** | 5,430m ILP zone. Zero village. Day-trip from Lachen. |
| khangchendzonga-np | 3 eats + 3 stays | 1 + 3 | 2 eats (redundant) | Tshoka kitchen anchor + Tshoka/Dzongri/Bakhim trekkers' huts. Did NOT duplicate-list Dzongri+Bakhim kitchens — they run on the same Sikkim Forest Dept model and listing 3 would be ghost-redundant. |
| tsomgo-lake | 1 eat + 3 stays | 1 + 0 | **3 stays** | Cafeteria cluster delivered. Day-trip-only — no overnight permitted per Sikkim STDC + STDC permit rules. |
| zuluk | 1 eat + 0 stays | 0 + 0 | **1 eat** | All eats homestay-attached (Dil Maya + Zuluk Sojourn already in DB). No standalone verifiable. |

## Top 3 factual corrections / catches

1. **Pfutsero population is 10,371 (2011 census)** — NOT "~3k pop" as my brief assumed. Wikipedia confirms; affects HS-risk calibration upward — town has more depth than NP-core villages, hence the Mini Tourist Lodge anchor (rather than full HS).
2. **Tamenglong Orange Festival started 2001** by then-DC Shri K Moses Chalai. 18th edition was December 2024 at Buongpui grounds (confirmed Northeast Today + district govt). Not "annual since the 1990s" as some listicles claim.
3. **Tshoka trekkers' hut accommodates ~24 people** (Darjeeling Tourism + Visit Himalaya Treks 2024 sources). Dzongri = trekkers' hut + tents at ~4,030m. Bakhim = Day-1 lunch stop. All inside KNP UNESCO Mixed Heritage core; all operator-only booking via IMF permit.

## Top 3 fabrications / cross-contamination caught

1. **"Tampha Hotel Moreh" on Trip.com = ACTUALLY Hotel Tampha in Imphal** (North AOC Point, Dimapur Road) — Tripadvisor confirms Imphal location, last review 2016. Trip.com listing appears to be a duplicate/mislabel. Did NOT add to Moreh stays.
2. **"Hotel Imphal by Classic" / "The Classic Hotel" appearing on Moreh Tripadvisor tourism page = ACTUALLY Imphal hotels** (Tripadvisor's Moreh tourism page surfaces nearby-but-not-in-Moreh hotels). The Moreh-specific verified hotel list is essentially Elora only.
3. **"Hotel Soyba Moreh / AR Inn Moreh / Border Trade Inn"** from my brief candidates: all returned zero verifiable evidence on Tengnoupal district official site, Tripadvisor, or MakeMyTrip. Did NOT fabricate — declared HS instead.

## Data debt flags (NOT fixed here — separate cleanup)

1. **phawngpui-peak DB has Far Pak Forest Rest House listed TWICE** (experience + xfactor) — likely a Phase-1 duplicate-slot fabrication. Recommend single-row consolidation in a separate audit pass. Did NOT touch (brief said don't fix here).
2. **zuluk DB has "Temi Tea Estate Homestay (Zuluk affiliate)"** — Temi Tea Estate is in Namchi/Ravangla district 130km+ from Zuluk. Strong cross-dest contamination candidate. Flag for separate audit.
3. **gurudongmar-lake DB shows 4 pre-existing stays per Session 37 memory note** — same data-debt pattern as Umlingla (zero-village reality, fabricated stays). High likelihood of fabrication. Recommend audit + drop pass.

## Sources spot-cited (per WebSearch + WebFetch)

- Tengnoupal District official accommodation page (Elora-only listing)
- Lawngtlai District official accommodation page (16-item list, no Phawngpui-specific entries)
- Sikkim Tourism + STDC pages (Tsomgo no-overnight policy)
- Wikipedia Pfütsero (population, elevation, climate)
- Darjeeling Tourism + Visit Himalaya Treks + Himalaya Trekker (Tshoka/Dzongri/Bakhim hut details)
- FootlooseDev + Travelling Slacker (Pfutsero town dining reality — Mini Tourist Lodge + rice hotels)
- Tamenglong district govt + Northeast Today + Imphal Times (Orange Festival history + Buongpui grounds)
- Better India + Discover Zuluk + Sikkim Silk Route (Zuluk homestay-only dining)
- Tripadvisor Hotel Tampha Imphal (cross-state contamination confirmation)

## Output paths
- SQL: `/Users/ashishtaneja/Desktop/India Travel Planner/data/research/ne-closeout-2026-05-15/agent-c.sql`
- Notes: `/Users/ashishtaneja/Desktop/India Travel Planner/data/research/ne-closeout-2026-05-15/agent-c-notes.md`
