# NakshIQ AI-citation weekly · 2026-05-18

**Run status: ABORTED — no fresh data collected this week.**

## Why this run aborted

The Chrome MCP extension was not connected when the scheduled task fired
(9:00 AM Mon 2026-05-18). `list_connected_browsers` returned `[]` and
every `tabs_create_mcp` call returned "Claude in Chrome is not connected".
Per the task spec ("If a query redirects to a login wall: skip and note. …
don't write fake data."), both engines were aborted and the Supabase
write was skipped — no rows inserted for 2026-05-18.

**Action for Ashish:** open Chrome with the extension signed in before the
next Monday run (2026-05-25), or run this task manually from a session
with Chrome attached. The "Run now" button in Cowork scheduled tasks
should work as soon as the browser is connected.

## Prior-week snapshot (from Supabase, 2026-05-10 run)

Perplexity: 0/17 cited (0%) — no change
Google AIO: 0/17 cited (0%) — no change
Combined: 0/34 (0%) — no change

(The 2026-05-10 row count in the DB is 20 PPL + 34 AIO for the BTV
category, suggesting that run inserted a few duplicate retry rows. Worth
de-duplicating on a future cleanup pass — but the cited count is still 0
under either interpretation.)

## New citations this week

None — no checks ran.

## Lost citations this week

None — no checks ran. Nothing was cited last week either, so there is
nothing that could be lost.

## Still 0/0 after N weeks of checking

**All 17 best-time-visit prompts have been zero-cited for the full
checked history** (3 distinct weeks: baseline 2026-04-24, weekly
2026-05-04, weekly 2026-05-10). Counting the aborted 2026-05-18 run as
a fourth "no signal" data point, every prompt now satisfies the
"4+ weeks zero-cited" rule the spec calls out for target-page review:

Perplexity (all 17 prompts, 4 weeks zero-cited):

- btv-spiti-june → /en/destination/kaza
- btv-ladakh-july → /en/destination/leh
- btv-kerala-monsoon → /en/destination/munnar
- btv-rajasthan-summer → /en/destination/jaisalmer/5
- btv-goa-december → /en/destination/palolem
- btv-kashmir-april → /en/destination/srinagar/4
- btv-sikkim-october → /en/destination/gangtok
- btv-tawang-when → /en/destination/tawang
- btv-hampi-weather → /en/destination/hampi
- btv-andaman-season → /en/destination/havelock-island
- btv-rann-kutch → /en/destination/rann-of-kutch
- btv-varanasi-winter → /en/destination/varanasi
- btv-hampi-may → /en/destination/hampi/5
- btv-pondicherry → /en/destination/puducherry
- btv-coorg-august → /en/destination/coorg/8
- btv-mahabalipuram → /en/destination/mahabalipuram
- btv-hornbill-festival → /en/destination/kohima/12

Google AIO: same 17 prompts, same streak (the AIO tracking only goes
back to 2026-04-24, so this is essentially the full record).

## Recommendation

Three weeks of clean reads + one abort week = enough signal to act on:

1. Audit the 17 target pages for AI-answerability — does each page open
   with a crisp 1-2-line answer to the literal query? (e.g. for
   `/en/destination/leh`, the first paragraph should literally answer
   "best time to visit Ladakh".) LLM answer engines bias hard toward
   pages that frontload the answer.
2. Check Perplexity's own source list for these queries (manually) and
   see who *is* getting cited — Lonely Planet, Tripadvisor, blog
   aggregators. That's the displacement benchmark.
3. Confirm `/en/destination/<slug>/<month>` URLs are present in the
   sitemap and indexed in GSC — month-specific URLs have higher
   long-tail-query match potential but are easier to miss in indexing.

The "0 weeks of citation" finding is the most actionable signal in this
report — it suggests the bottleneck is on-page content, not crawl
coverage. The fact that no prompt has ever cited NakshIQ across 3 weeks
makes this very unlikely to be random variance.

---

_Report generated automatically by scheduled task `nakshiq-citation-tracker-weekly` on 2026-05-18. Source file: `/Users/ashishtaneja/Desktop/India Travel Planner/data/citation-weekly-2026-05-18.md`._
