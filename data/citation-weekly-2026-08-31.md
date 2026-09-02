# NakshIQ AI-citation weekly · 2026-08-31

Perplexity: 1/10 checked cited (7 skipped — throttle hit at query #11 again). The 1 citation is a **held repeat**, not new.
Google AIO: 0/17 cited (0% — Δ0 vs last week's 0/17)
Combined: 1/27 checks executed cited this week

## Headline: btv-hampi-may citation HELD for a 2nd consecutive week (Perplexity)

Last week's report flagged this as "one data point, not a trend — confirm it holds next Monday." It held. Verified the same way as before, not just the regex match: the citation pill's `data-pplx-citation-url` resolves to `www.nakshiq.com/en/destination/hampi/may`, an exact match to the prompt's target URL. This is the first Perplexity citation to survive a second week anywhere in the tracker's history (the only other ever-cited prompt, btv-coorg-august on Google AIO, lasted exactly one week before reverting on 08-17 and remains reverted — checked again this week, still 0).

## New citations this week

(none — hampi-may is a hold, not a new citation)

## Lost citations this week

(none)

## Coverage note — Perplexity throttle + a deliberate order deviation

The ~10-query account-level Perplexity throttle returned (it was absent for one clean week on 08-17, present again 08-24 and again this week). Confirmed via the standard +8s recheck: stalled at `/search/new`, textLen 933, on the 11th query submitted.

This week's base order was forward (1→17) per the alternating rotation rule, but **btv-hampi-may was deliberately checked first**, ahead of its normal position (13th), to make sure the 2nd-week reconfirmation happened before the throttle wall hit rather than after — forward order alone would have put it at position 13, past where the wall has landed for the last several weeks. This is a one-time, noted deviation, not a change to the standing rule.

Checked (10): btv-hampi-may, btv-spiti-june, btv-ladakh-july, btv-kerala-monsoon, btv-rajasthan-summer, btv-goa-december, btv-kashmir-april, btv-sikkim-october, btv-tawang-when, btv-hampi-weather.

Skipped, no rows written (7): btv-andaman-season, btv-rann-kutch, btv-varanasi-winter, btv-pondicherry, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival.

**Recommend reversed order (17→1) for next Monday, 2026-09-07.** It naturally hits all 7 skipped prompts first (positions 17→11), and will re-check btv-hampi-may (position 13) within its first 5 queries — giving a 3rd data point on the hold without needing another manual deviation.

## Still 0 after many weeks of checking

15 of the 17 best-time-visit prompts have never been cited by either engine across the tracker's full history (since April 2026). The only two exceptions are the ones already covered above: btv-hampi-may (Perplexity, 2 weeks running) and btv-coorg-august (Google AIO, one week only, reverted). This is a long-standing pattern — prior weekly reports already recommend deliberate target-page work over continued passive monitoring for the rest.

## Data quality note

Supabase `ran_at` timestamps for last week's run are dated 2026-08-23, one day behind its "Monday 08-24" report label — the row count (27) and content (10 Perplexity + 17 AIO, matching the reversed-order run described in the 08-24 report) confirm this is the same run, just timestamped a day earlier (likely a timezone artifact, not a missed write). Used that dataset for this week's comparison. This week's own write was verified clean: 27 rows inserted, 27 present in today's date window, 0 duplicates.

---

## SCOPE CHANGE effective 2026-09-07 (founder-approved 2026-09-02)

In addition to the 17 btv-* prompts, check the 5 new `inbound-foreigner` prompts — fgn-safe-solo-female, fgn-first-trip, fgn-evisa-time, fgn-worth-visiting, fgn-india-vs-vietnam (queries + target URLs in `data/citation-prompts.json`) — on **Google AIO ONLY**. Never check fgn-* on Perplexity: the ~10-query account throttle means they would displace existing btv-* coverage. Perplexity scope is unchanged (btv-* only; reversed order 17→1 next Monday per the recommendation above). AIO total becomes 22 checks/week. Context: the 2026-09-02 inbound-tourism gate (research wiki `src-inbound-tourism-gate-2026-09-02`) — a zero-cost measurement hedge on foreigner-intent citations, not a strategy change. Note the registry's April-era target URLs `/en/for-solo-female` were corrected to the real route `/en/for/solo-female` in the same commit.
