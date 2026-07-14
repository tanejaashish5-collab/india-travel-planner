---
type: tool
sources: [data/research/VAIBHAV-SISINTY-TOOLS-INVENTORY-2026-07-01.md, data/research/CLAUDE-CODE-FOR-MONEY-GOLD-2026-06-26.md, data/research/FABLE5-YT-OPPORTUNITY-SCAN-2026-07-02.md, data/research/KARPATHY-LLM-WIKI-ASSESSMENT-2026-07-07.md, data/research/CLAUDE-CHANNEL-AUDIT-2026-07-13.md, data/research/FABLE-PARITY-STACK-2026-07-14.md]
updated: 2026-07-14
---

# Claude Code ecosystem (our stack — status honest as of 2026-07-07)

## Feature surface

| Feature | Status for us |
|---|---|
| **Claude Code** | The core of everything — all 15 businesses run through it |
| **Claude Cowork** (GA Apr 2026) | Not needed — Claude Code + cron already covers its value for us |
| **Claude Dispatch** (preview Mar 2026) | Skip — ~50% reliability on complex tasks per Anthropic's own reporting |
| **Connectors** | Active: Canva, Gmail (read-only), Drive, Notion, Supabase, Vercel, Playwright, Telegram, iMessage. Not authorized: Slack, Google Calendar, Figma, Stripe, monday.com, Apollo, Clay, HuggingFace |
| **Skills** | Large built-in library + our custom ones (/loop-radar, /council, /wrap, /handoff…) |

## Fable 5 rules (banked 2026-07-02, global CLAUDE.md; effort nuances added 2026-07-08; dates + effort rule corrected 2026-07-14)

$10/M in / $50/M out (2× Opus); long-horizon autonomy 91/100 vs Opus 63 (Every's benchmark); **"Opus plans, Fable executes"**; never ask Fable to show reasoning (silent reroute to Opus); reserve for the hardest 5–15% of tasks. **Fable is overkill for wiki/data ingestion — use Opus/Sonnet** ([[nate-herk]]).

**Free window: ends 2026-07-19 11:59 PM PT (3rd extension, Jul 7→12→19) — corrected 2026-07-14** ([[src-fable-parity-stack-2026-07-14]]); our own CLAUDE.md previously and wrongly recorded "ended 07-07." Post-window Fable stays reachable via prepaid credits ($10/M in, $50/M out), no subscription-restoration timeline announced. Any Fable call after 07-19 is a paid action → confirm-gated, same as any other metered spend.

**Effort routing — corrected 2026-07-14:** the 2026-07-08 "Fable-on-low ≈ Opus-on-high" claim was a misattribution of Anthropic's actual wording (Fable-low "often exceeds xhigh performance on **prior**-gen models," i.e. ≈ Opus 4.7-xhigh, not our current Opus 4.8 — no official Fable↔4.8 equivalence exists anywhere). **New rule: xhigh for coding/agentic work (Anthropic's own stated default for Opus 4.8, needs max_tokens ≥ 64k) plus an explicit "act once you have enough information" line to kill the overthink failure mode; high for judgment/synthesis/writing; drop to high only if a session still second-guesses after the line is added.** Post-free-window play unchanged: smart-orchestrator + cheap workers (Opus/Sonnet orchestrating Haiku scouts tested 3× cheaper at identical quality — our standing rule since 2026-04-27).

## Community layers (evaluated, not installed)

- **gstack** (Garry Tan/YC, 89.7K stars): 23 skills + 8 power tools — CEO/Designer/Security-OWASP/QA-browser/Release personas. Verdict 2026-07: structurally the same as our global 6-Agent Quality Pipeline; **founder chose SKIP on install** (untrusted third-party code into `~/.claude/skills/` + binary compile + session hooks). Reference, not dependency.
- **/council skill** ([[nate-herk]] gold finding): 6-persona anti-sycophancy panel → green-light/reshape/kill verdict + cheapest 48h test. `.claude/commands/council.md` exists locally (untracked) — operationalizes [[test-cheap-before-build]].
- **deep-discipline skill** (BUILT 2026-07-08 from the Opus-as-Fable audit; **v2 shipped 2026-07-14**, [[src-fable-parity-stack-2026-07-14]]): global `~/.claude/skills/deep-discipline/` — 5 gates (scope→evidence→attack→verify→report) + leaked-prompt habits, loadable by any Opus/Sonnet session for hard tasks. v2 adds: VERIFIED/REASONED/ASSUMED claim labels on gates 4–5, a pre-write repo-read gate, a separate fresh-context verifier subagent for high-stakes conclusions, an 8-row FAILURE-PATTERN MAP that grows with every new incident, long-run habits (progress-note file, checkpoint-without-being-asked), outcome-framed delegation. Companion: the MODEL + EFFORT ROUTING table in global CLAUDE.md, now naming a **FABLE-PARITY STACK** recipe (Opus 4.8 @ xhigh/high + deep-discipline + verifier subagent + eval-gate).
- **This research-wiki** (Karpathy LLM-wiki pattern): the memory system was already ~70% of it; this vault closes the research-corpus gap.

Related: [[self-hosted-agents]], [[google-free-ai-stack]] (Antigravity is the competitor).

## 2026-07-13 — Official @claude channel audit (all 138 videos)

**Verdict: we already run ~75% of enterprise-grade Claude Code patterns** (Spotify/DoorDash/Lovable/Anthropic-internal): verification-after-write, canary crons, multi-agent workflows, model routing, kill-gates, file-based memory, skills, hooks. Ranked adoption list, compressed:

1. **Routines (`/schedule`, cloud-scheduled agents)** — time/webhook/GitHub triggers, runs on Anthropic infra. Retires the CronCreate-misfire + launchd-TCC failure classes for the *monitoring* layer (radar harvest, GSC/GA4 audit drafting, PR babysitting). Local renders/local files/interactive-auth MCP stay local.
2. **Evals as infrastructure, not vibes** — the one theme every enterprise talk repeats ("evals are unit tests for AI"). Our biggest structural gap: we verify outputs well, barely eval pipelines. Concretes: grade the radar scorer's 68 self-tests, build a 20-case autoposter eval, a Playwright user-simulator eval on NakshIQ's 3 critical flows pre-deploy, re-run all evals on every model release.
3. **Self-improving skills** — skills that encode their own blockers/solutions and get updated by the agent (Warp/Cursor/Lovable pattern). Make `qa/SKILL.md` + autoposter runbooks self-editing via a weekly "what broke/confused you" pass.
4. **Memory "dreaming"** — nightly/weekly batch job across recent sessions: dedupe, consolidate, mark stale, extract cross-session patterns → PR against MEMORY.md/CLAUDE.md. We do this by hand (`/capture-session`); the pattern says automate it out-of-band (~95% cache-hit in Anthropic's implementation).
5. Repo-level hooks hardening (post-edit format, pre-tool-use blocks on dangerous classes — global credential hooks exist, the repo itself is thin).
6. Context economics habits (`/context` regularly, MCP servers off unless in use, stable-content-first prompt layout, target 80%+ cache-hit).
7. New orchestration surfaces (Agent View, desktop session groups, native worktrees, `/ultra review` = confirmed our real `/code-review ultra`, phone remote-control).
8. Advisor strategy — cheap model executes, expensive model is advisor-when-stuck (frontier quality at a fraction of cost); pairs with our existing `/council`.

**Contradiction flagged PENDING A/B (2026-07-13) — RESOLVED 2026-07-14, by official docs rather than by running the A/B** ([[src-fable-parity-stack-2026-07-14]]): Anthropic's Opus 4.8 model-config docs confirm xhigh as "the best setting for most coding and agentic use cases" (needs max_tokens ≥ 64k) — the two Anthropic talks on this channel were right for coding/agentic work. Nate Herk's overthink warning is also real, but the fix is an explicit act-when-ready prompting line, not a blanket drop to high. Current rule: xhigh for coding/agentic + the act-when-ready line, high for judgment/synthesis/writing. Full correction in the Fable 5 rules section above.

**What's coming:** Routines GA (currently research preview; GitHub-webhook triggers already live) · Managed Agents maturation — memory stores, *dreaming* (research preview), self-hosted sandboxes, agent identity/permission layer · proactive always-on agents (agents that wake unprompted on detected patterns; METR 16h autonomy today) · Claude Tag expanding beyond Slack to Microsoft Teams · effectively-infinite context (1M flat pricing, server-side compaction).

Also resolved: Claude Code/Cowork on mobile is plan-tier gated (Max first, Pro rolling out "over the coming weeks" from Jul 7 launch), **not** an Australia geo-block.

Source: [[src-claude-channel-audit]].
