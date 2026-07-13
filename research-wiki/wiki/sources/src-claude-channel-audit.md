---
type: source
sources: [data/research/CLAUDE-CHANNEL-AUDIT-2026-07-13.md]
updated: 2026-07-13
---

# src: The Claude Channel Audit (all 138 videos, youtube.com/@claude)

**Method:** full-channel scrape → 117 full transcripts (100 YouTube captions + 17 conference talks whisper-transcribed locally, no captions available) + 21 caption-less short clips read from official descriptions → 12 Haiku readers (max-3 concurrency) → Fable synthesis. ~266K words of transcript read. 32 videos rated gold-3, 25 gold-2 — the densest channel audited to date. Per-video detail in `claude-channel-catalog-2026-07-13.xlsx`; PDF at `~/Desktop/Reports/Claude-Channel-Audit-2026-07-13.pdf`.

**One-line verdicts:**

- We already run **~75%** of the enterprise-grade patterns shown (Spotify/DoorDash/Lovable/Anthropic-internal) — the audit validates the stack more than it embarrasses it.
- Biggest structural gap: **evals as infrastructure**, not just output verification.
- Biggest immediate win: **Routines (`/schedule`)** — cloud-scheduled agents retire our launchd-TCC / CronCreate-misfire failure class for the monitoring layer.
- One standing rule **contradicted, not yet changed**: our "high = default, xhigh/max overthinks" vs Anthropic's own "xhigh is the Claude Code default and Pareto-optimal" — flagged for a cheap A/B, not resolved here.
- New free radar-gate lens: the **delegation-fails heuristic** from a patent-law talk — independently confirms [[verification-as-moat]] and names NakshIQ's domain shape directly.
- Resolved a standing question: Claude Code/Cowork mobile in Australia is a **plan-tier rollout gap** (Max first, Pro rolling out), not a geo-block.

Full ranked adoption list and what's-coming detail live in [[claude-code-ecosystem]]; the moat confirmation lives in [[verification-as-moat]]; the new pattern page is [[delegation-fails-heuristic]].

**Contrast note:** this is a *practice-dense* creator study — enterprise engineering talks, feature walkthroughs, architecture patterns — versus the funnel-dense shape of every other creator channel in this wiki (see [[nick-saraev]], [[money-is-services-not-adsense]]): official Anthropic content teaches technique with no owned-audience CTA underneath it, the opposite of the Vaibhav/Vyan/Roman/Nate/Nick pattern where content is consistently the lead magnet for a paid community.

Related: [[claude-code-ecosystem]], [[delegation-fails-heuristic]], [[nick-saraev]].
