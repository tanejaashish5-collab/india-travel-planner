---
type: pattern
sources: [data/research/CLAUDE-CHANNEL-AUDIT-2026-07-13.md, data/research/NATE-HERK-200K-INHOUSE-AI-JOB-2026-07-15.md]
updated: 2026-07-15
---

# Delegation-fails heuristic

**The pattern (from a patent-law talk on the official @claude channel):** app-layer businesses survive the general-agent wave only where the delegation model breaks down. Where a general agent *can* just do the task end-to-end, a Cowork-class tool eats the niche as models improve — there's no moat in being a thin wrapper around something delegable. Value survives where:

- Outputs **can't be cheaply validated** (no fast, cheap check for "is this answer right?").
- Decisions are **entangled** — this choice depends on five other choices, not a single clean input→output.
- The task needs **out-of-distribution reasoning** the base model wasn't trained deeply on.
- The data is **non-text** (needs domain-specific structuring, not just prose in/out).
- **Citations are mandatory** — the user needs to trace *why*, not just receive an answer.

Where none of these hold, delegation works — and a general-purpose agent (today: Cowork; tomorrow: whatever's next) will do it for free or near-free, commoditizing any business built purely on "I did the task for you."

## Why this matters here

NakshIQ sits squarely in the delegation-resistant zone: travel decisions are untestable at the point of choice (you don't find out if "is October safe for Ladakh" was right until you're there), entangled (season × permits × road conditions × altitude × festival calendars all interact), and citation-dependent (a traveller needs to see the source, not just trust a verdict). This independently confirms [[verification-as-moat]] — the moat isn't "we have data," it's "we sit in a domain shape a general agent can't cheaply eat."

## Two new radar-gate questions

Add to the strategist checklist's moat section, asked of any new idea before it's scored:

1. **"Could Cowork do this once models improve?"** — if yes, the business has no defensible floor; it's renting time until the next model release.
2. **"Does the domain resist delegation?"** — untestable outputs / entangled decisions / OOD reasoning / non-text data / mandatory citations. Needs at least one to hold.

The audit's own assessment: this heuristic "would have killed several of our graveyarded SaaS ideas at generation time" — i.e. it's a cheap, free filter that should run *before* the existing [[strategist-checklist]] machinery, not after.

## External-agency corroboration (2026-07-15)

Nate Herk's "$200K AI job" video independently argues the external AI-agency market is the compressing side of this exact trade — clients pulling implementation in-house as tools get accessible ("the exact same thing that made AI agencies a ton of money is about to replace them") — matching [[nick-saraev]]'s own agency (LeftClick) graveyard and the "generic AI consultant/agency" kill already in [[rejected-ideas]] (2026-06-23). Three independent sources — a creator's self-audit, our own channel audit, and now a competing creator's career thesis — now agree on the same direction. See [[src-nate-herk-200k-inhouse-ai-job]].

Related: [[verification-as-moat]], [[strategist-checklist]], [[rejected-ideas]], [[nick-saraev]], [[money-is-services-not-adsense]].
