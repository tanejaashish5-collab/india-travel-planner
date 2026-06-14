# GSC email triage — 2026-06-14

**Run:** 2026-06-14 10:34 UTC (automated, twice-daily routine)
**Prior triage:** gsc-audits/gsc-email-triage-2026-06-13.md
**Verdict: No new actionable issues — no code changes, no GSC clicks needed.**

---

## Emails seen (newer_than:2d)

| Time (UTC) | From | Subject | Classification |
|---|---|---|---|
| 2026-06-14 03:30 | ops@nakshiq.com | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | EXPECTED CHURN |
| 2026-06-13 03:30 | ops@nakshiq.com | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | Already triaged 06-13 |

No emails from sc-noreply@google.com in the past 2 days.

---

## Classification

### 06-14 03:30 UTC ops alert — EXPECTED CHURN (false alarm, no action)

**Full content:**
```
[HIGH] indexed_pages_drop
Indexed pages dropped -5.9% vs prior 6-day average (17000 → 16000).
Same shape as the 2026-05-05 ISR regression.
Latest audit: 2026-06-11
```

Identical to the 06-12 and 06-13 alerts — same audit date (2026-06-11), same count (16000), same message. The ops cron is repeating because GSC's indexed-page data hasn't refreshed past the 2026-06-11 snapshot. Already classified in both prior triages:

> "Same false-alarm shape documented in `reference_m2_indexed_drop_alert_frozen_baseline_false_shape.md`: frozen-then-unfrozen baseline + intended /hi noindex consolidation + Google rationing. Core pages verified indexable on 06-11. No action."

The robots.txt fix shipped 06-12 (`39e06b18`) allows Googlebot to fully render JS/CSS chunks — this should improve rendering quality and gradually stabilise the indexed-page count over the coming weeks. No immediate action required.

---

## What the founder should do in GSC

**Nothing new.** Pending clicks from the 06-12 triage remain:
1. **"Not found (404)"** → Start new validation (URLs now 200/301 after `39e06b18`)
2. **"Blocked by robots.txt"** → Start new validation (chunks now crawlable)
3. **Do NOT validate** noindex / redirect / canonical / duplicate — exclusions by design, always "fail"

---

## Ship record

No code changes this run. No deploy triggered.
