---
type: source
sources: [data/research/youtube-mastersunion-nakshiq-2026-05-11.md, data/research/youtube-mastersunion-nakshiq-2026-05-11-backlog.md]
updated: 2026-08-02
---

# Masters' Union scan (2026-05-11)

88 deduped ideas for NakshIQ. Verification-as-moat (make the audit trail PUBLIC); affiliate-not-ads (CashKaro ₹350cr); NRI-first wedge (MMT started US-India 2000); use-case personalisation (`/destination/[slug]/[use-case]`); kill 9-of-12 widgets. **Many PURSUE items still unshipped.**

Feeds: [[verification-as-moat]], [[nri-diaspora-arbitrage]]

## ⚠️ Coverage audit, 2026-08-02 — the old title ("446-video scan") overstated what we hold

The doc's own header claims *"446 videos scanned · 380 transcripts processed · 272 passed
pre-filter · 210 ideas extracted."* Measured against disk and the live channel today:

| Check | Result |
|---|---|
| Live videos on the `/videos` tab | **459** |
| Video IDs actually **cited** in the two output docs | **84** |
| Transcripts **retained** in `.scrapes/youtube/` | **11** |
| Live videos never cited anywhere | **375** |

**Why the transcripts are gone:** this run predates the scrape-storage convention (established
**2026-05-28**, 17 days later), so the 380 processed transcripts were never written under
`.scrapes/youtube/yt-<id>/`. **Any re-read requires a re-scrape.**

**Honest caveat on the coverage gap:** a video can be read and yield nothing, so 375-uncited is
**not** proof they were never processed — it is proof there is **no audit trail**. Treat "446
scanned" as an unverifiable claim, not a fact, per the standing never-infer rule.

**Staleness:** ~3 months. Of the 22 newest videos, only 4 are cited in the May docs — roughly
15+ are genuinely new, several directly relevant to an India-relocation / real-economy
direction (*"What's the Next Billion-Dollar Business Opportunity in India?"* — Ex-CEO NITI
Aayog; *"The Mental Models Behind a $3 Billion Company"* — [[ashwin-damera]]; an IAS Chief
Principal Secretary to the CM of Haryana, one of the three NCR regulatory jurisdictions).

**Recommendation on record (2026-08-02): do NOT re-scrape the full channel.** The binding
constraint is that the first pass's 88 ideas are still largely unshipped — not missing input.
A full re-scrape is exactly the pattern [[demand-sources-over-commentary-sources]] shows yields
nothing (4 commentary sources → 0 opportunities) and that [[receipts-over-content]] warns
against. If anything is scraped here, scope it to the ~15 new videos and deep-read only those
serving a live question.

Related: [[demand-sources-over-commentary-sources]], [[receipts-over-content]],
[[verification-as-moat]], [[ashwin-damera]].
