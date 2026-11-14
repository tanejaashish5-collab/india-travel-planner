# SOS backlog run: 15 sourced, 234 unconfirmed

**Date:** 2026-11-15
**Trigger:** scheduled sos-backlog run (local — `.gov.in`/`.nic.in` reachable)
**Outcome:** 15 numbers sourced across 32 rows (34 number-row pairs). `source_map` written via `sos-source-map-insert.mjs`. `verified_date` NOT touched — Monday cron owns that stamp.

Status counts going in: 10 `source_unreachable`, 179 `needs_source`, 109 `confirmed`, 0 `number_changed`.

## Numbers sourced

| Number | Field | Source page | Destinations cleared |
|---|---|---|---|
| 1554 | rescue_contact | pib.gov.in/PressReleseDetailm.aspx?PRID=2118702 | 21 (coastal/island) |
| 03192232694 | tourist_helpline | tourism.andamannicobar.gov.in/travel-care.php | port-blair cluster |
| 03192238881 | rescue_contact | southandaman.nic.in/disaster-management/ | port-blair cluster |
| 03595250634 | rescue_contact | gyalshing.nic.in/public-utility/district-hospital-gyalshing/ | khangchendzonga-np |
| 04896263100 | rescue_contact | ldma.utl.gov.in/en-in/emergency/contacts.html | Lakshadweep islands |
| 04894242263 | rescue_contact | ldma.utl.gov.in/en-in/emergency/contacts.html | Lakshadweep islands |
| 9447822714 | rescue_contact | ldma.utl.gov.in/en-in/emergency/contacts.html | Lakshadweep islands |
| 03192262960 | rescue_contact | northmiddle.andaman.nic.in/ddm-control-room/ | North/Middle Andaman |
| 02362228844 | rescue_contact | sindhudurg.nic.in/en/contact-us/ | malvan, tarkarli |
| 04862233111 | rescue_contact | idukki.nic.in/en/helpline/ | Munnar cluster |
| 01374222722 | rescue_contact | uttarkashi.nic.in/disaster-management/ | Gangotri, Yamunotri, Uttarkashi |
| 7310913129 | mountain_rescue | uttarkashi.nic.in/disaster-management/ | Gangotri, Yamunotri, Uttarkashi |
| 03592234242 | rescue_contact | mangan.nic.in/directory/ | North Sikkim |
| 03592234856 | rescue_contact | mangan.nic.in/directory/ | North Sikkim |
| 03794222221 | rescue_contact | tawang.nic.in/contact-us/ | Tawang |

**Notable finds:**
- `ldma.utl.gov.in` (Lakshadweep Disaster Management Authority) is a live alternative to `lakshadweep.gov.in` which returned 000 all run. Cleared Kavaratti (police control) and Agatti (deputy collector + mobile) in one page.
- `1554` (Indian Coast Guard toll-free) confirmed on PIB press release. Cleared 21 coastal/island destinations that had it in `rescue_contact` without a source.
- `southandaman.nic.in` and `gyalshing.nic.in` both came back live — these were the two `source_unreachable` rows where the source page was reachable but the number wasn't previously mapped; both confirmed and sourced this run.

## Numbers dropped from candidates (30 candidates, 15 dropped)

| Number | Reason |
|---|---|
| 03782222136, 03782222021, 03782222036 | arunpol.nic.in returned empty (000 status); westkameng.nic.in geo-fenced from local |
| 01374222126 | On uttarkashi.nic.in as `01374 – 222126` (en-dash U+2013); `extractPageTokens` gap regex only matches ASCII hyphen so adjacent join fails; would have failed insert script re-verification |
| 01792223836 | Only source found was solanpolice.com (.com domain); not `.gov.in`/`.nic.in` and not in allow-list |
| 03592276955 | Not on mangan.nic.in — number not present on any reachable .nic.in page |
| 03192239247 | police.andamannicobar.gov.in geo-fenced; returned 000 |
| 06742391983, 04865231587, 8547603199 | Odisha state domains (balasore, kendrapara, capitalhospital.nic.in) all returned 000 |
| 06752224554, 06782262011, 06782262289, 06729242460, 06727232803 | Odisha district sites all 000 from local |

Known permanent dead ends excluded up front (per standing instruction): `03803-222253` (District Hospital Roing), `04545-240581` (Government Hospital Palani), `04172-232538` (Govt HQ Hospital Walajah).

## Source-unreachable rows that remain unreachable

| Destination | URL that failed | Status |
|---|---|---|
| agartala | westtripura.gov.in | 000 — domain unreachable from local |
| charaideo, haflong (Dima Hasao), jorhat, majuli | Assam district .gov.in subdomains | All 000 |
| lakshadweep (non-Kavaratti/Agatti rows) | lakshadweep.gov.in | 000 — but ldma.utl.gov.in now sourced these numbers, so their `source_map` updated |
| ranthambore, sariska | forest.rajasthan.gov.in | 000 |

## Edge cases found

- **en-dash vs ASCII hyphen:** `01374 – 222126` on uttarkashi.nic.in is printed with en-dash (U+2013), which does not match the gap regex `/^[\s\-().]{0,3}$/` (only ASCII U+002D). The join never fires, so the token `222126` or `1374222126` is never emitted, and `numberMatchesPage` correctly rejects it. The number `01374222722` (same page, ASCII hyphen format) passed fine. This is the correct cron behaviour; the page-print format for `222126` is ambiguous enough that forcing a source map entry that would fail every Monday is worse than leaving it in backlog.
- **03192232694 en-dash on tourism page:** Page prints `03192–232694` (en-dash) but ALSO prints `+91-3192-232694` (ASCII). The `+91` gets stripped by `normalisePhone` → `3192232694` (10 digits). `extractPageTokens` emits `3192232694`. `numberMatchesPage` matches `03192232694` via 8-digit tail (`92232694 === 92232694`). Confirmed correct.
- **04894242263 spacing:** Page prints `04894 - 242 263`. Tokens extracted: `04894`, `242`, `263`; joined pairs: `04894242` (gap `-`), `242263` (gap ` `). Number `04894242263` matches via 8-digit tail against `04894242` (8 chars, `4894242` tail 7 ≠ match) — actually confirmed via the full adjacent join: `04894` + ` - ` gap → `242` + ` ` gap → `263`; pairwise: (`04894`,`242`) → `04894242`, (`242`,`263`) → `242263`; also STD `04894` is on the page from an earlier table entry giving `04894242263` a 6-digit match path. Script re-verified live and confirmed.

## Remaining backlog

~234 distinct numbers still without confirmed sources. Primary blockers:
- Odisha state/district sites: all return 000 from AU local; likely geo-fenced (consistent with Indian gov portal geo-fencing pattern noted in MEMORY).
- Assam district sites: same.
- westtripura.gov.in: 000.
- forest.rajasthan.gov.in: 000 (Ranthambore, Sariska numbers).

No stored number was found wrong on a live page. No escalation required.
