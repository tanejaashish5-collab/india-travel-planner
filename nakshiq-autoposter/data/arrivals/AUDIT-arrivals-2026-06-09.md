# Arrival-logistics data — fact-check audit (2026-06-09)

Source bank: `data/arrivals/arrivals.json`. Rule (project CLAUDE.md): every claim real + verifiable, honest scarcity (`null`) over fabrication. Transport facts changed a lot in 2023–2025 (new metro lines, new airports), so each rail claim was verified against an **authoritative** source (metro-rail corporation / official airport / Wikipedia-maintained line page) — aggregator blogs were NOT trusted for fares/lines. Anything not confirmed to high confidence was left `null` and the reel falls back to the always-true prepaid-taxi line.

## National constants

| Claim | Verdict | Source |
|---|---|---|
| Most foreign passports need an **e-Visa applied for online before flying**; no general visa-on-arrival (tiny exceptions: Japan/S. Korea/UAE-prior-e-visa) | CONFIRMED | indianvisaonline.gov.in; Bureau of Immigration (boi.gov.in); cgisf.gov.in/page/e-visa |
| Buy a **tourist SIM at airport arrivals** with passport + visa + photo (Airtel/Jio counters; eSIM also common) | CONFIRMED | operator/airport SIM guidance (Airtel/Jio airport counters); standard tourist-SIM KYC |
| **ATM in arrivals beats airport forex** counters; carry small notes (INR is a closed currency) | CONFIRMED (standard travel-finance advice) | bankbazaar currency-exchange-at-airports; travel-finance guidance |
| **Prepaid taxi booth / app cab**, and the **"hotel closed/overbooked" tout scam** | CONFIRMED (well-documented) | Delhi-airport taxi-scam writeups; TripAdvisor airport-transfer threads; common travel-safety advisories |

> Deliberately **excluded** the new "e-Arrival Card (within 72h)" rule surfaced in research — too new to assert from a primary gov source in a video; left out rather than risk a stale/wrong instruction.

## Airport-specific transport (the differentiating beat)

| Code | Airport | Claim in bank | Verdict | Source |
|---|---|---|---|---|
| **DEL** | Indira Gandhi Intl | Airport Express metro, ~20 min to city, **~₹60** single | CONFIRMED. Journey ~19–20 min New Delhi↔T3; single fare ₹60 (Haiku draft said ₹75 — **rejected**, ₹60 corroborated). | en.wikipedia.org/wiki/Airport_Express_Line_(Delhi_Metro); newdelhiairport.in/to-and-from-airport/metro; delhiairport.com/metro |
| **BOM** | CSM Intl | Aqua Line 3 metro runs underground straight to **Terminal 2** | CONFIRMED. T2 metro station opened 7 Oct 2024; direct terminal bridge Aug 2025; full Aqua Line operational Oct 2025. | en.wikipedia.org/wiki/Chhatrapati_Shivaji_Maharaj_International_Airport_-_T2_metro_station; mmrcl.com/en/station/CSIA |
| **MAA** | Chennai Intl | Blue Line metro runs from the airport into the city | CONFIRMED. Blue Line terminates at Chennai Intl Airport, interchange at Chennai Central; operational since 2016. | en.wikipedia.org/wiki/Blue_Line_(Chennai_Metro) |
| **CCU** | Netaji Subhas Chandra Bose Intl | Yellow Line metro now links the airport into the city | CONFIRMED. Noapara↔Jai Hind (Biman Bandar / airport) commercial ops began **25 Aug 2025**. | en.wikipedia.org/wiki/Yellow_Line_(Kolkata_Metro); en.wikipedia.org/wiki/Jai_Hind_metro_station |
| **BLR** | Kempegowda Intl | **No rail** (left null) → "~40 km out, allow an hour" | CONFIRMED no operational airport metro as of Jun 2026 (Blue Line airport extension still targeted, not open). Distance ~40 km is standard. | en.wikipedia.org/wiki/Kempegowda_International_Airport; BMRCL airport-line status (under construction) |
| **HYD** | Rajiv Gandhi Intl | **No rail** (null) → "fair way out, longer ride" (kept qualitative) | CONFIRMED no airport metro yet (Airport Express Metro under construction); RGIA ~30 km south. Kept qualitative to avoid a stale number. | hyderabad.aero/to-and-from-airport; HMRL airport-line status |
| **COK** | Cochin Intl (CIAL) | **No rail** (null) → "~30 km north, allow an hour"; fun fact: **world's first fully solar-powered airport** | CONFIRMED. CIAL ~25–30 km NE of city, no metro link. Solar-powered claim is CIAL's own + widely reported. | cial.aero/news-Updates/CIAL-s-green-energy; cial.aero transportation/prepaid-taxi |
| **GOX** | Manohar Intl, Mopa (North Goa) | **No rail** (null) → serves North Goa; ride apps limited, prepaid taxi / **GoaMiles** | CONFIRMED. Mopa (Manohar Intl) opened 2022/23, serves North Goa; Goa restricts Uber/Ola via taxi unions, GoaMiles is the official app. | miagoaairport.com/taxi-service; goamiles.com |
| **TRV** | Thiruvananthapuram Intl | **No rail** (null) → "barely 5 km from the city" | CONFIRMED. TRV ~5–6 km from city centre (one of India's closest-in airports). | adanione.com/thiruvananthapuram-airport |
| **AMD** | Sardar Vallabhbhai Patel Intl | **No rail** (null) → "~9 km north of central Ahmedabad" | CONFIRMED. SVPI ~9 km N of centre. | ahmedabadairport.com |
| **JAI** | Jaipur Intl | **No rail** (null) → "~15 km from the Pink City old town" | CONFIRMED. JAI ~13–15 km from the walled city. | jaipurairport.com / adani jaipur-airport transport |
| **ATQ** | Sri Guru Ram Dass Jee Intl | **No rail** (null) → "~20-min ride from the Golden Temple" | CONFIRMED. ATQ ~11–13 km / ~20–35 min to the Golden Temple. | Amritsar airport transfer guidance; rome2rio ATQ↔Golden Temple |

## Footage provenance (no fabrication of visuals either)

Each airport maps to a **gateway-city** destination clip that already exists in R2 (HEAD 200 verified 2026-06-09): `delhi, mumbai, chennai, kolkata, bengaluru, hyderabad, kochi, panaji, trivandrum, ahmedabad, jaipur, amritsar`. The renderer's `has_clip()` eligibility gate is reused — an airport with no gateway-city clip is simply skipped (no brand-colour "no video" fallback in production).

## City vibe + signature lines (added 2026-06-09 to differentiate the reels)

The reels were near-identical (only the transport line varied), so each airport got a true **vibe** (first impression) + a distinctive **signature** tip. These are qualitative-but-accurate; the two that assert a checkable fact were verified:

| Code | Signature claim | Verdict | Source |
|---|---|---|---|
| **AMD** | Gujarat is a **dry state** — tourists need a permit to drink | CONFIRMED (prohibition since 1949; free temporary tourist permit; public consumption banned) | psrcompliance.com/blog/liquor-license-in-gujarat-2026; indiabaggagerules.com (dry-state rules) |
| **ATQ** | The Golden Temple's free kitchen feeds **~100,000 a day** | CONFIRMED (world's largest free community kitchen / langar, ~100k daily, doubles on holidays) | thenationalnews.com (2023); sbs.com.au/food; yourstory.com (2023) |

Other vibe/signature lines are well-established qualitative facts (Delhi scale + traffic; Mumbai local trains + humidity; Chennai heat/humidity + filter coffee; Kolkata yellow Ambassador taxis "an icon"; Bengaluru mild climate + notorious traffic; Hyderabad biryani; Kochi backwaters + solar airport [verified above]; Goa cash culture + limited ride-apps [verified above]; Thiruvananthapuram laid-back + Kovalam beaches; Jaipur desert heat + bazaar haggling). No fares/contacts/statistics asserted beyond the two confirmed above.

## National tips pool (rotated so the constant advice varies per airport)
visa (verified above) · prepaid-taxi/app-cab (verified above) · "hotel-closed" scam (verified above) · airport SIM (verified above) · ATM>forex (verified above) · **tap water → sealed bottles** (standard travel-health advice) · **MRP is the max price** (CONFIRMED — Legal Metrology / packaged-goods rules make the printed Maximum Retail Price the legal ceiling). One safety tip + one extra are chosen deterministically per airport, so no two reels carry the same four constants.

## Honest-scarcity decisions
- 8 of 12 airports have **no asserted rail beat** (`rail: null`) because no metro link to the airport was authoritatively confirmed operational — they use distance-context + the universal prepaid-taxi line instead of an invented one.
- No fares stated except DEL (₹60, multi-source confirmed). HYD distance kept qualitative.
- "e-Arrival Card 72h" rule excluded pending primary-source confirmation.
