# Older POI cohort (pre-backfill) — adversarial audit — 2026-06-03

Same refute-mode method extended to the **831 POIs created before the P2 backfill** (777 on 2026-04-13 + 20 on 2026-04-21 + 34 on 2026-05-27 trek-fill) — the original/curated set. Run as a **find → independent-verify workflow** (ultracode): 18 Haiku finders, then a separate skeptic agent re-checks each flag AND its proposed fix (directly implementing the lesson that verifiers over-flag *and* mis-correct).

## Result
- **831 checked · 52 flags surfaced · 44 confirmed real by the verifier · 8 rejected**
- **ZERO fabricated/nonexistent POIs** — again, every place is real; all issues were factual details (mostly superlatives, elevations, dates).
- After my review: **dropped 1** (manimahesh-lake — 3,950 m within source variance of the official 3,962 m), **softened 4** rank-swaps (gulmarg-golf, bhu-campus, samdruptse, umlingla — kept "one of the…" rather than asserting a new bold rank), **dropped 1 more at apply-time** (nongriat — the verifier targeted the POI *name* not description; ambiguous which bridge). → **42 EN + 39 HI corrections applied** (39 description fixes ×2 locales + 3 shared `entry_fee` fixes).

## The verifier earning its keep (caught its own finder's mistakes)
- **solang-valley-ropeway**: finder proposed 3,200 m; verifier found the real **2,873 m** (Skiresort.info) and used that instead.
- **hanle-observatory**: REJECTED — "the auditor's proposed '2nd highest' fix is WRONG and would introduce a false claim."
- **tosh-village**: REJECTED — finder flagged a copy-paste altitude dup, but the error is actually in a *different* POI (Bijli Mahadev), not Tosh.

## Notable confirmed fixes
- **False superlatives** → softened/corrected: Umaid Bhawan "world's largest private residence" (it's 6th), Nishat Bagh "largest Mughal garden in Kashmir" (2nd, after Shalimar), Birla Planetarium "2nd-largest in Asia" (largest), Bhimtal "India's only freshwater aquarium" (false), bee-falls "highest in MP" (it's Pachmarhi's; Bahuti is MP's), Umananda "smallest river island" (smallest *inhabited*), Korzok "highest monastery in Ladakh", Prag Mahal "tallest tower in Kutch", Champaner mosque "prototype for ALL Mughal mosques".
- **Wrong elevations**: Pangong 14,270→13,862 ft, Gaumukh 12,769→13,200 ft, Gulmarg Gondola 14,000→13,058 ft, Solang 3,780→2,873 m, Pfutsero 7,250→6,998 ft, Betlingchhip 914→930 m.
- **Wrong ages/dates**: Vijay Vilas "400-year-old" (built 1920-29), Neminath temple "2,500-year-old" (rebuilt 1129 CE), Tawang "400-year" (founded 1680-81), Char Dukan "1920s" (1840), Phuktal (cave 2,500 yrs vs monastery 15th c).
- **Fabricated/garbled facts**: Kangra Fort "mentioned in Alexander's war records" (Alexander never reached it), Kasar Devi "NASA-detected Van Allen Belt anomaly" (unverified legend, not NASA), Shanan "Asia's first hydro by Col. Ninon" (India's first MW hydro, Col. B.C. Batty), Ashoka edicts "Sanskrit and Prakrit" (Prakrit/Brahmi only).
- **Misattribution**: Bering Nag temple Batseri→Sangla; Rih Dil "on the Myanmar border"→inside Myanmar; Nathmal "Prime Minister" (of Jaisalmer Kingdom, not India); Morni Fort "highest point in Haryana" (Karoh Peak is).
- **Fees**: Nainital Zoo ₹100→₹150/₹300; Chamera Lake ₹200-500→Free (boating-only); Chandi Devi ₹157→₹439.

## Rejected over-flags (verifier or my judgement)
tosh-village · sivasagar-tank · hanle-observatory · indroda-nature-park · tiger-falls-chakrata · ima-keithel · snow-view-point · prashar-camping · (+ manimahesh, nongriat at review/apply).

## Files
- `chunks/chunk-00..17.json` (831 POIs, input) · `RESULT.json` (raw workflow output) · `CORRECTIONS.json` (42 EN) · `HI-CORRECTIONS.json` (39 HI) · `SUMMARY.md`
- Appliers reused (now `--file`-parameterised): `scripts/_poi-audit-apply.mjs`, `_poi-audit-apply-hi.mjs`; dump: `_poi-older-dump.mjs`
- DB verified post-apply: 0 bad strings remaining (EN + HI).
