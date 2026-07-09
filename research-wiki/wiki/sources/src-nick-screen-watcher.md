---
type: source
sources: [data/research/NICK-SARAEV-SCREEN-WATCHER-2026-07-09.md]
updated: 2026-07-09
---

# Nick Saraev screen-watcher audit

Video yt-aPUvTP5NIUI (2026-07-09): screenshot every 5s → cheap text metadata (~8.6K lines/day) + ~20 sampled vision frames → observations ledger (pattern seen 3+ times = confirmed) → daily "economize my workflow" ask run on session limits (not metered API) → fixes **built, not described** (morning digest replacing 8 polling checks, hotkey capture, a Chrome extension it wrote, a voice-tool swap).

Audit verdict: we already run this shape on BUSINESS telemetry (GA4/GSC/canary/radar), but founder-behaviour telemetry was a genuinely new surface — nothing we run watches how Ashish spends screen time. **Built** at `~/Desktop/ScreenWatcher/`, deliberate deltas from Nick's version: private-app blocklist, idle skip, 48h frame purge, fixes staged for approval not auto-installed; Haiku-tier aggregation + judgement-only-in-the-brief per our model table — no Fable needed.

As a business idea: graveyard entry. Rewind→Limitless, RescueTime, ActivityWatch, Microsoft Recall (OS-level) already own screen-telemetry productivity. Free personal system: yes. Product: no.

Feeds: [[nick-saraev]], [[self-hosted-agents]], [[claude-code-ecosystem]], [[money-is-services-not-adsense]]
