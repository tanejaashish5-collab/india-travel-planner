# GSC email triage — 2026-06-13

**Run:** 2026-06-13 22:34 UTC (automated, twice-daily routine)
**Prior triage:** gsc-audits/gsc-failures-triage-2026-06-12.md (commit `39e06b18`)
**Verdict: No new actionable issues — no code changes, no GSC clicks needed.**

---

## Emails seen (newer_than:2d)

| Time (UTC) | From | Subject | Count |
|---|---|---|---|
| 2026-06-12 08:27 | sc-noreply@google.com | New reasons prevent pages from being indexed on site https://www.nakshiq.com/ | 1 |
| 2026-06-12 09:09–09:11 | sc-noreply@google.com | Some fixes failed for Page indexing issues on site nakshiq.com | 7 |
| 2026-06-12 03:30 | ops@nakshiq.com | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | 1 |
| 2026-06-13 03:30 | ops@nakshiq.com | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | 1 |

---

## Classification

### 06-12 emails (all 9) — ALREADY TRIAGED, no re-action needed

These are the exact emails analysed in the 06-12 playbook session.
Both real bugs were fixed in commit `39e06b18` (middleware `share` allowlist + robots.txt `Allow: /_next/static/` + `X-Robots-Tag: noindex` + `/with-kids/ziro` redirect), verified live 2026-06-12 ~09:45 UTC, Vercel deploy `dpl_JC6kkZKdpeo6ttZRHbvfYosdQrhY` READY.

The 7 "Some fixes failed" emails cover exclusion categories that can never validate:
- **Excluded by 'noindex'** — share pages are intentionally noindexed. Validation always fails. Correct behavior.
- **Page with redirect / Alternate page with proper canonical / Duplicate** — intentional 301s and canonical signals. Correct behavior.
- **Blocked by robots.txt** — `/_next/static/` chunks are now crawlable; `13 × /api/og` remain blocked intentionally. The chunk portion of this category empties on Google's next recrawl.

The "New reason preventing indexing: Indexed, though blocked by robots.txt" email (robots.txt blocking JS chunks) was the trigger for the robots.txt fix. Already shipped.

### 06-13 03:30 UTC ops alert — EXPECTED CHURN (false alarm, no action)

**Content:** `indexed_pages_drop` — "Indexed pages dropped -5.9% vs prior 6-day average (17000 → 16000). Same shape as the 2026-05-05 ISR regression."

This is the same alert as the 06-12 03:30 UTC ops email — the cron is repeating because GSC's indexed-page count hasn't updated past its 2026-06-11 audit data. Already classified in the 06-12 playbook:

> "Same false-alarm shape documented in `reference_m2_indexed_drop_alert_frozen_baseline_false_shape.md`: frozen-then-unfrozen baseline + intended /hi noindex consolidation + Google rationing. Core pages verified indexable on 06-11. No action."

The robots.txt fix shipped 06-12 may improve Google's rendering quality and reduce the 'Crawled - currently not indexed' pile over the coming weeks, which should stabilise this metric. No immediate action required.

---

## What the founder should do in GSC

**Nothing new.** The only pending GSC clicks are the ones from the 06-12 triage:
1. **"Not found (404)"** → Start new validation (URLs now 200/301 after `39e06b18`)
2. **"Blocked by robots.txt"** → Start new validation (chunks now crawlable)
3. **Do NOT validate** noindex / redirect / canonical / duplicate — they are exclusions by design and always "fail"

---

## Ship record

No code changes this run. No deploy triggered.
