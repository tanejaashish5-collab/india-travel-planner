---
type: idea
sources: [data/research/OPPORTUNITY-BRAIN.md]
updated: 2026-08-02
---

# Radar loop (the opportunity pipeline system)

> ⚠️ **RETIRED 2026-07-13 — NOT RUNNING.** The daily launchd job is disabled (commit `c4b248687`,
> archived at `.loop/archive/2026-07-13-opportunity-pipeline-retired/`). This page is kept as a
> description of how the pipeline worked, not as a statement that it is live. The ledger
> (`.loop/biz-opportunities-ledger.json`, 101 ideas, last written 2026-06-26) is frozen at its
> final state. **Do not assume a radar brief is arriving; nothing is harvesting.**
> Re-enable-or-formally-retire is an open founder decision as of 2026-08-02.

The 6-layer system that found, judged, vetoed, and tracked every business idea — documented in `data/research/OPPORTUNITY-BRAIN.md`. Ran daily 2026-06-11 → 2026-07-13.

## The layers

0. **FOUNDER-PROFILE.md** — calibration source (fit is read from here, never improvised)
1. **Scout** (`/loop-bizscout`) — harvests demand signals, synthesizes ideas, dedupes into the ledger
2. **Strategist** — [[strategist-checklist]] scoring (55 self-tests, dual cash/venture lens)
3. **Tata gate** — [[tata-gate]] ethics veto, the final word
4. **Board ranking** — [[ledger-overview]]
5. **Tripwires** — rot-checks on aging assumptions
6. **Daily radar** (`/loop-radar`) — *was* 12:03pm launchd daily: 4 Haiku legs (web/Gmail/YouTube/govt) → Sonnet filter → fact-check → merge → brief emailed to founder. **Job disabled 2026-07-13; no brief has been generated since.**

## Hard rules it encodes

Dedupe before excite · honest scarcity (a zero-new-ideas day is a valid result) · fail=structurally-impossible ≠ unknown=unproven · AI is HOW not WHAT · self-improve the system after every run · no sector bias.

## Relationship to this wiki

The ledger stays the **scoring system of record**; this wiki is the **connective memory** over the qualitative research the radar can't hold (creator studies, patterns, rejections). The radar's known blind spot as of 2026-07: it surfaces evidence-strong ideas that keep failing [[passion-fit-gate]] — the unresolved tension logged in [[india-australia-corridor]].
