# Re-measures — 2026-07-30

Two overdue re-measures, run together. **Both verdicts are negative or unreadable. Neither supports doing more of the same work.**

---

## 1. Weather-SEO pass (deployed 2026-07-15) — UNREADABLE, no effect provable

23 dest×month title/meta overrides + the MonthWeather body section. Matched 12-day windows (PRE 07-03..07-14, POST 07-16..07-27), `scripts/_gsc-weather-remeasure-2026-07-29.mjs`, read-only `searchanalytics.query`.

| Group | PRE CTR | POST CTR | clicks | 2-proportion test |
|---|---|---|---|---|
| **Treated** (23 overridden pages) | 0.464% | 0.559% | 75 → 98 | z=1.21, **p=0.227 — not significant** |
| **Control** (every other dest×month) | 0.583% | 0.624% | 411 → 403 | z=0.97, p=0.331 — not significant |
| **Trek pages** (km-led titles, same deploy) | 0.799% | 0.545% | 34 → 23 | z=−1.44, p=0.151 — not significant |

Difference-in-differences: **+0.053pp** in favour of treated (treated +0.094pp, control +0.041pp).

**Why this does not count as a win**, despite the treated group's clicks rising 31% while control fell 2%:

- **Nothing clears significance.** p=0.227 on the treated group. At 98 post-period clicks the window cannot resolve a change this small — this is the same "hard-seasonal, too-thin-to-read" wall the Apr-27 snippet rewrite hit for 5 of 6 queries.
- **The aggregate is composition, not conversion.** Two pages moved ~36% of the treated group's pre-period impressions: `darjeeling/august` 591→3033 (+2442) and `wayanad/july` 4567→1148 (−3419). That is seasonal demand rotating between months, not titles working. Tellingly, darjeeling gained 5× the impressions and its **CTR fell** 0.7%→0.4% — the opposite of the intended effect on the single biggest impression gainer.
- **Treated pages still convert WORSE than control in absolute terms** post-period: 0.56% vs 0.62%. At best the gap narrowed slightly; the overrides did not lift these pages above the untouched baseline.
- **`kukke-subramanya/july` regressed hard**: CTR 1.5%→0.4%, position 4.4→8.7. Position loss explains it, so this is not a title failure — but it is the largest single CTR move in the set and it is negative.
- **Positions drifted equally in both arms** (treated 7.9→8.1, control 8.1→8.3), so ranking is not the confound — but it also means there is no ranking gain to bank.
- **The trek half of the same deploy looks actively negative** (0.80%→0.55%, clicks 34→23) on flat impressions. Also not significant, but it is the only directional signal that is consistent rather than mix-driven, and it points down.

**Caveat that cuts the other way, stated for fairness:** a 12-day post window understates title changes Google has not re-crawled on every page yet, so a real effect could still be arriving. That is exactly why this is filed as *unreadable*, not as *failed*.

**Action: none. Do not commission another title/meta tranche on weather pages.** Re-test the same windows in ~6 weeks (mid-Sep 2026) when propagation is complete and the seasonal mix has settled; treat trek titles as the priority to re-examine if any tranche is revisited.

---

## 2. `save_destination` — the 06-10 gate fix WORKED, but the hook does not convert

Measured via `scripts/_audit-key-events.mjs`, GA4, last 28 days.

- **`save_destination`: 9 events / 9 users.** Previously **0**. The 2026-06-10 fix (PR #25, `eca3a294` — dropping the `peakMonth && score >= 4` mount gate in `destination-month.tsx`) is confirmed live and working: the CTA now renders and fires on off-month pages.
- **But the funnel is nearly flat:** `destination_alert_view` 1,992 → `save_destination` 9 = **0.45% conversion**.
- Separate prompt funnel is worse: `save_prompt_view` 9 → `save_prompt_attempt` 2 → `save_prompt_success` 2.

**Read:** the diagnosis was right and the fix is verified — this is no longer a bug, and it should stop being tracked as one. What it revealed is a demand answer, not a bug: with the CTA now visible on every high-traffic off-month page, 1,992 people saw the alert and 9 saved. **The hook itself is the weak part, not its placement.**

**Action: close the peak-alert item permanently.** Do not iterate the copy or the placement chasing the remaining 99.5% — the help-vs-add gate applies, and at 0.45% this feature is not on the path to 100K MUV. If saves matter later, the question to answer first is *why someone would want a saved destination at all*, not where to put the button.

---

## Evidence notes

- Significance: 2-proportion z-tests on raw click/impression counts, not on rounded CTA percentages.
- GSC figures are `searchanalytics.query` totals for the stated windows; GA4 figures are a 28-day rolling window and so overlap both GSC windows — the two sections are **not** a matched comparison and must not be read as one.
- `newsletter_error` is listed as a wanted key event but **has never fired** — unresolved, unrelated to either re-measure, noted so it is not lost.
