---
description: Run the Phase 4 opportunity scout — find demand-backed opportunities (SEO striking-distance, data gaps, new surfaces), rank them, and surface a digest. Read-only; proposes nothing without your go.
---

Run the guard-railed autonomous-loop **opportunity scout**. Follow `.loop/OPPORTUNITIES.md`. This is read-only discovery — do NOT edit app code, write the DB, commit, or deploy. Every opportunity must be evidence-backed (real GSC/GA4/DB numbers); no hype.

Steps:
1. Probe sources (read-only): `node --env-file=apps/web/.env.local scripts/_loop/sources.mjs --probe`. If a source fails, note it — that class degrades but the rest run.
2. Run the scout: `node --env-file=apps/web/.env.local scripts/_loop/scout-opportunities.mjs`
3. Read `.loop/opportunities-digest.md`. Summarise the top items per class. Flag which are **propose-ready** (data-coverage gaps, serp-ctr-gap title fixes) vs **digest-only** (near-page-1, new-surface).
4. **Competitive-validation pass (only if asked, budgeted):** for `new-surface` candidates (`needs_competitive_validation: true` in the inbox), run a small WebSearch pass per the cost rules (≤3 Haiku research agents) — does a rival already own the intent? Is the SERP winnable? Write the verdict next to the candidate. NEVER auto-build a surface.
5. If Ashish wants to act: route propose-ready items through `/loop-propose` (verify → diagnose → draft diff → iMessage to approve). Do not apply anything here.
6. STOP. Report the opportunity counts per class + the single highest-ROI item, and ask which (if any) to take forward.

If a class returns nothing, say so honestly (e.g. cro-leak is disabled — GA4 is bot-saturated; see the runbook). Honest scarcity over invented opportunities.
