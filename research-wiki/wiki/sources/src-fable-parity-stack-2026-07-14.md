---
type: source
sources: [data/research/FABLE-PARITY-STACK-2026-07-14.md]
updated: 2026-07-14
---

# Fable-parity stack — locked in before the free window closes (2026-07-14)

Verification session against fresh material: 2 new YouTube videos (yt-9JBZzZSO3hA "Do This Before Fable 5 Goes API Only", yt-noWZ8AyD8kI "How I Make Claude Opus Think Like Fable 5", both ~07-10/07-12), 5 official Anthropic pages, 6 practitioner write-ups (DEV.to, HuggingFace, AlphaSignal, HoriaMC, Digital Applied) — checked against what [[src-nate-herk-fable-mode]] (2026-07-08) already banked. Headline: **we'd already built most of it**; this session closed the remaining gaps and fixed two stale facts in our own CLAUDE.md.

## Corrected facts

- **Free window ends 2026-07-19 11:59 PM PT** — the 3rd extension (Jul 7 → 12 → 19), not "ended 2026-07-07" as our global CLAUDE.md wrongly said. Post-window Fable stays reachable via prepaid credits ($10/M in, $50/M out); Anthropic states no subscription-restoration timeline. **Any Fable call after 07-19 becomes a paid action → confirm-gated**, same as any other metered spend.
- **"Fable-low ≈ Opus-high" was a misattribution — corrected.** Anthropic's actual claim: Fable-low "often exceeds xhigh performance on **prior** models" — i.e. ≈ Opus 4.7-xhigh, not our current Opus 4.8. No official Fable↔Opus-4.8 equivalence exists anywhere in Anthropic's docs.
- **The xhigh-vs-high contradiction [[src-claude-channel-audit]] flagged PENDING A/B (2026-07-13) is now RESOLVED — by official docs, not by running the A/B.** Anthropic: "On Claude Opus 4.8, the xhigh effort level… is the best setting for most coding and agentic use cases" (needs max_tokens ≥ 64k). Nate Herk's 2026-07-08 overthink warning is real, but the fix is a prompting line ("act once you have enough information to act"), not a blanket lower effort setting. **New standing rule: xhigh for coding/agentic work + the act-when-ready line; high for judgment/synthesis/writing; drop to high only if a session still second-guesses after the line is added.**

## Shipped this session

- **`~/.claude/skills/deep-discipline/SKILL.md` v2** (global, hot-reloaded): VERIFIED / REASONED / ASSUMED claim labels on gates 4–5; a pre-write repo-read gate (grep configs/lockfiles/neighbor patterns before writing code); a separate fresh-context verifier subagent for high-stakes conclusions (official Anthropic pattern — never self-critique alone; our banked false-positive caution attached); an 8-row FAILURE-PATTERN MAP generalized from real incidents (confidence-cards NULL crash, with-kids typeof-null, Vercel bot-tax bill, GSC frozen snapshot ×2, agent false-positive verdicts, launchd TCC silent failures, rendered-frame-not-caption, validate-before-recommending) — the map IS the learning loop, every new incident adds a row; long-run habits (progress-note file, one-feature-at-a-time, checkpoint-without-being-asked, bank durable artifacts); outcome-framed delegation (goal + done-condition + why + what-NOT-to-do, never step-scripts, never "show your reasoning").
- **Global `~/.claude/CLAUDE.md`**: corrected the two stale facts above, added the post-07-19 confirm-gate, rewrote the effort rule to the calibrated split, and named a **FABLE-PARITY STACK** recipe in the model/effort routing table: Opus 4.8 @ xhigh (coding/agentic) or high (judgment/synthesis) + deep-discipline + separate verifier subagent + eval-gate before delivery.
- **Automation sweep**: zero `model: fable` references across ~/Automation, launchd plists, and project scripts — confirmed nothing breaks when the free window closes on the 19th.

## What we already had (re-confirmed, no action needed)

Verification/accuracy (deep-discipline gates 2–4, eval-gate, verify-touched-pages, canary probes, adversarial workflows), memory (file-based + MEMORY.md + research-wiki + weekly dreaming — model-agnostic), long-horizon autonomy (task queue + watchdog + launchd, chunked to fit Opus's shorter efficient runs), judgment/anti-sycophancy (/council + eval-gate), cost discipline (orchestrator + cheap workers, ~3× cheaper at equal quality) — all were already LIVE per the 2026-07-08 audit; this session re-verified each against the fresh sources rather than finding new gaps.

## Honest residual gap (no bakwaas)

A process stack cannot fully clone a bigger model. Not replicated by any of the above: frontier single-pass correctness, hours-long autonomous runs (Opus efficient ~10–30 min per stretch vs. Fable's longer leash), more proactive tool-calling, dense-vision accuracy. Consensus across every source reviewed: roughly 75%+ of observed Fable quality is architectural — verification loops, evidence gating, work packaging, memory — and that part IS replicated ("the model isn't the moat; the process is"). The rest isn't a rounding error; it's the reason a confirm-gated paid Fable swing stays on the table for the rare task that genuinely needs it.

## Not adopted (and why)

15-word quote/copyright rules (safety plumbing, not quality — our citation discipline is already stronger for data integrity); refusal-as-metadata / fallback routing params (API-app-builder concern, we don't ship Claude-API products today); 30% tokenizer inflation adjustment (Fable-API-budgeting only, not a rule for us); an Obsidian vault (we already run the equivalent — this wiki + atomic memory files; switching tools is motion, not progress); the "Head Chef" pattern where Fable orchestrates and Opus executes (tested 16 min vs. 23 min baseline vs. 43 min pure-Fable; adopted only as a free-window tactic below, not a standing pattern — post-07-19 it's a paid action, and our existing Opus-orchestrates-Sonnet/Haiku pattern is the same shape at sustainable cost).

## Time-sensitive, founder-gated

5 free days left as of 2026-07-14. The one live play: spend them on Fable-authored **durable assets** that cheaper models execute for months, not throughput work (posts/translations/routine builds — Opus/Sonnet already handle those at parity). Two candidates banked, both need founder go: Chanakya scripts 0108/0109 (real gap — next week's queue is empty, assets in intake, unscripted); a Fable "consultant audit" of the NakshIQ 90-day 10–25K-MUV push. Idea-SEARCH itself stays closed per the founder's 2026-07-14 order — the audit candidate is an ops review of an existing business, not idea generation, so it doesn't reopen that door.

Feeds: [[claude-code-ecosystem]], [[nate-herk]]
