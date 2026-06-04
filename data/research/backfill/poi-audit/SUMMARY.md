# POI + prior-prose adversarial audit — 2026-06-03

Refute-mode audit of **prior-session** backfill data (the P2 POI cohort + existing month-verdict prose), extending the same method used on this session's festivals/prose. Authorised "no caps".

## Part A — Month-prose systematic-error sweep (deterministic + judgement)
Swept all 9,233 non-null `destination_months` why_go/why_not for systematic climate-error classes. **9 fixes applied** (all the TN rain-shadow / NE-monsoon family + the inland-sea-breeze family):

- **Inland "sea breeze" (4)** — `kanchipuram` m7 + m9, `thanjavur` m9, `chidambaram` m9 falsely claimed a beneficial sea breeze (these towns are 15–85 km inland). Most other "sea breeze" mentions were correct (genuinely coastal: Vizag, Chennai, Pondicherry, Rameswaram, Dwarka, Somnath, Tiruchendur…) — two even correctly *negate* it ("sea breeze irrelevant inland"). Left those.
- **TN monsoon mis-claims (5)** — `tiruttani` m7 ("July sees the heaviest monsoon rainfall across Tamil Nadu" — flatly false; TN's heaviest rain is the NE monsoon, Oct–Dec); `chettinad` m8 + m9 and `srirangam` m8 (rain-shadow towns with a *go* verdict but a why_not claiming impassable monsoon rain); `pondicherry` m6 (duplicate sentence + "monsoon rains make beaches unusable" when only 50–70 mm falls — it's heat, not rain).
- **Left deliberately** (nuanced, not assumption-fixed): Cauvery-delta upstream flooding in Jul–Aug (kumbakonam/swamimalai/thanjavur), Coimbatore's genuine SW bump.

## Part B — POI cohort (768 rows created 2026-06-03)
16 Haiku verifiers, refute-mode, ~48 POIs each (whole-destination batches). Each POI checked for existence → attribution → falsifiable claims (dates/heights/areas/superlatives/dynasty) → fee plausibility.

**Result: 47 flags / 768 POIs (~6%). ZERO fabricated or nonexistent POIs** — every place is real and correctly located. All issues were factual details.

| Outcome | Count |
|---|---|
| Confirmed + fixed (EN) | **41** |
| …of which also fixed in Hindi | **31** (10 had no Hindi error / null hi) |
| Rejected as over-flags | **6** |

### Notable confirmed fixes
- **Hard date/century errors**: Durga Temple Aihole 5th→7th–8th c; Badami… (rejected, see below); Sindhudurg "16th c"→17th c (1664–67); Murud-Janjira 15th→16th c; Srirangapatna 16th→15th c; Cabo de Rama 16th c→1763; Sula 2000→1999; Belur UNESCO 2024→2023; Bahubali "installed 1973"→sculpted 1973/installed 1982; Manginapudi lighthouse 1611→1858.
- **Wrong magnitudes**: Borra Caves 150 m→80 m deep + dropped false "second-largest/3,229 m" (that's Belum) + wrong river (Gosthani not Chitravathi); Barehipani 217 m→399 m; St Mary's columns 40 ft→6 m/20 ft; Minicoy lighthouse 300 ft→49.5 m (internal contradiction); Arjuna's Penance 27×90 m→29×13 m; Kodai Lake 60 sq km→24 ha/60 acres; Salim Ali sanctuary 400 ha→178 ha; Vembanad 68→96 km.
- **Wrong attribution / identity**: Hiranyakeshi (Amboli) wrongly tagged Ashtavinayak (it's a Shiva temple); Mahad Ashtavinayak Vighneshwara→Varadvinayak; Pali Ashtavinayak Girijatmaja→Ballaleshwar; Fort Geldria "first European settlement"→first Dutch settlement; Dhyana Buddha "bronze"→concrete; Arthur's Seat "Arthur Stanley"→Sir Arthur Malet; Sawantwadi Palace relocated to Sawantwadi town + "Malwa art"→Ganjifa/lacquerware; Car Museum founder name fixed.
- **Fee clarity**: Elephanta ₹600→"₹40 (Indian/SAARC), ₹600 (foreign)".
- **Softened over-claims**: Kanyakumari "only place sunrise+sunset over sea", Ibrahim Roza "inspired the Taj Mahal", Kailasa "took over 100 years", Padmanabhaswamy "over 3,000 years", Alibaug Kanakeshwar (dropped unverifiable 1764 + geographically-wrong "Hoysala").

### Rejected over-flags (applied judgement, did NOT change)
1. **cave-1-badami** — verifier claimed the text dates it "1st–2nd c BCE"; the actual text says only "Earliest cave temple" (true — it IS Badami's earliest). Verifier hallucinated the error.
2. **kanakakkunnu-palace (trivandrum)** — flagged "misattributed" but the verifier's own note concludes it IS in Trivandrum. No error.
3. **nandankanan-zoo** — "first Indian zoo in WAZA" is TRUE (joined 2009 as India's first). Not an error.
4. **coracle-hogenakkal** — "2,000-year craft" is a defensible description of the coracle tradition.
5. **joranda-falls** — 181 m vs 150 m; sources disagree both ways, verifier admits 181 m is also cited.
6. **athirapally height** — 80 ft vs 81.5 ft; a round number, not worth changing.

### Verifier error caught
Kodai Lake: verifier flagged the (real) "60 sq km" error but proposed "24 sq km" — **also wrong** (it's ~24 *hectares* / 60 acres). Confirmed via TN govt survey + Wikipedia and applied the correct figure, not the verifier's. (Same lesson as the festival/prose audits: verifiers over-flag *and* mis-correct — judge every one.)

## Files
- `chunks/chunk-00..15.json` — 768 POIs in 16 batches (input)
- `flags/flags-00..15.json` + `ALL-FLAGS.json` — raw verifier output (47)
- `CORRECTIONS.json` (41 EN) + `HI-CORRECTIONS.json` (31 HI) — applied corrections w/ per-item reason
- Appliers: `scripts/_poi-audit-dump.mjs`, `_poi-audit-apply.mjs`, `_poi-audit-apply-hi.mjs`
