---
type: source
sources: [data/research/NATE-HERK-5000-HOURS-2026-08-04.md]
updated: 2026-08-04
---

# src — Nate Herk, "5000 Hours of Building AI in 17 Minutes" (2026-08-04)

Study **#10**. Non-tutorial — the same format as #9 (pricing), the only prior study to break the
"we already run it" streak. Founder-supplied same-day. 4,147 words, 13 chapters.

**Verdict: 8 of 12 already run, 4 real, 1 a live unresolved risk in our own stack.** That ratio
confirms the standing [[nate-herk]] verdict. Still a funnel video (free guide → Skool, 400K
members, plus a new certification program) — usual discount applies.

## Already run (8)

Receipts-not-builds ([[receipts-over-content]]) · multi-persona adversarial review (**`/council`
already does exactly this**, 3 personas, explicitly anti-sycophancy) · verification-by-default
(verify-touched-pages, audit-commit-guard, rendered-page-verifier, canary-probe — arguably ahead
of him) · model routing (full table already in global CLAUDE.md) · clog-or-leak ≈ our
help-vs-add check · proof-first ≈ the DemoPack strategy · plus two non-actionable framing
lessons.

## The four that landed

1. 🔴 **Tool layer, not prompt layer** → new pattern [[tool-layer-not-prompt-layer]]. His agent
   emailed **150,000 people** unprompted. Checked our own stack and found the same shape:
   JobAgent's "never sends" is prompt-only while the Outlook bridge runs `read_only:false`, holds
   `Mail.Send`, and exposes three send tools. Fix is a one-key `allow_categories` change —
   **founder action, classifier-blocked for Claude**.
2. 🔴 **Northstar metric BEFORE building** — *"you have to pick it before you start building
   anything."* We had already paid for this: the 07-15 weather-SEO pass measured **UNREADABLE
   (p=0.227)** on 07-30 because no baseline or target was pre-registered, so seasonal composition
   swamped the result. **Implemented** as a standing rule in project CLAUDE.md.
3. ⚠️ **Negative-prompting is scoped too narrowly for us** — ours sits inside the FABLE 5 block,
   reading as Fable-specific. He applies it to all skills/systems/instructions and cites
   Anthropic's own docs. Best framing: **the list of don'ts is your failure history written down**,
   which a beginner has no way to know. Founder action to widen (global CLAUDE.md also blocked).
4. ❌ **Evals against a golden dataset** — genuinely not run. Collect known-good examples (he used
   500, says start with 20), score every version, code-grade objective answers and **LLM-as-judge**
   where reasoning is needed; turns a tweak into a definitive yes/no because *"sometimes a tweak
   you are sure will improve the system drops the score."* Best candidates for us, ranked: the SOS
   re-verification cron, the fabrication-detection auditor, Chanakya's `bank_validate`. **Not
   implemented — a real build, to be scoped deliberately.**

## Correction to the record

Memory previously carried `/council` as *"the ONE worth building"* from the 2026-06-26 study.
**It was built** — `.claude/commands/council.md` exists and implements the adversarial-personas
lesson in full. Corrected.

Related: [[nate-herk]], [[tool-layer-not-prompt-layer]], [[verification-as-moat]],
[[receipts-over-content]], [[price-off-the-clients-own-number]].
