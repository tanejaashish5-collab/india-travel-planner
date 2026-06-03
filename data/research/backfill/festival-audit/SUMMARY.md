# Festival fabrication audit — 2026-06-03

Adversarial re-verification of all 174 festivals inserted this session (the P3 backfill).
13 independent Haiku fact-checkers, each told to **refute** every festival — verify
existence, correct venue, and correct month against credible sources only (Wikipedia,
.gov.in/.nic.in, official temple/tourism, major news; aggregators/blogs excluded).

## Outcome (174 verified)
- **CONFIRMED: 157 (90%)**
- WRONG_MONTH: 11 (most were ±1 lunar drift / agent over-flags — only 6 acted on)
- UNVERIFIABLE: 5
- MISATTRIBUTED: 1

## Actions applied (DB + CLEANED-festivals.json)
**Dropped (4)** — festival no longer in DB:
- `dalhousie` / Minjar Fair — MISATTRIBUTED: held at Chamba (~55 km), not Dalhousie.
- `manas-national-park` / Assam Spring Festival — UNVERIFIABLE: a one-off 2018 event, not an annual festival.
- `dzukou-valley` / Dzukou Valley Festival — UNVERIFIABLE: only a 2018 inaugural edition found, no established recurrence.
- `nandaprayag` / Baisakhi and Janmashtami Fair — UNVERIFIABLE: Baisakhi observance real but the "Janmashtami fair" is unsourced (that's Mathura/Vrindavan); weak generic entry.

**Month corrected (6):**
- `katra` Navratri (Vaishno Devi) 9→10; `alampur` Sharan Navaratri (Jogulamba) 9→10 — Sharad Navratri (Ashwin) falls early–mid October.
- `kukke-subramanya` Nagara Panchami 7→8 — Shravana Shukla Panchami (usually August).
- `sundarbans` Bonbibi Mela 4→1 — the flagship Bonbibi puja is in Bengali Magh (Jan–Feb), not April.
- `sariska` Hanuman Jayanti 3→4 — Pandupol fair on Chaitra Purnima (April).
- `pfutsero` Tsükhenye 5→4 — Chakhesang festival, late April.

**Month nulled (1):**
- `shikharji` Sammed Shikhar Festival — the annual fair is real (Wikipedia) but the October timing could not be confirmed; month set NULL rather than assert an unverified date.

## Deliberately NOT changed (verifier over-flags / acceptable lunar range)
- `ukhrul` Shirui Lily (m5) — the festival IS in May; the flag's "→April" confused bloom-start with festival date.
- `gulbarga` Khwaja Bande Nawaz Urs — a major, well-documented dargah Urs; flagged only because the lunar month is hard to pin (month already NULL).
- `ozar`/`ujjain`/`dakor`/`kalimpong` — ±1 lunar drift within the real range; `approximate_date` carries the nuance.

Net: 174 → **170 festivals**; dests-with-festivals 381 → **377** (4 reverted to honest `[]`).
Per-festival verdicts + sources: `result-00.json` … `result-12.json` in this folder.
