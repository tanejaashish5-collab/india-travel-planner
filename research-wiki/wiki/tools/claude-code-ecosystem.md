---
type: tool
sources: [data/research/VAIBHAV-SISINTY-TOOLS-INVENTORY-2026-07-01.md, data/research/CLAUDE-CODE-FOR-MONEY-GOLD-2026-06-26.md, data/research/FABLE5-YT-OPPORTUNITY-SCAN-2026-07-02.md, data/research/KARPATHY-LLM-WIKI-ASSESSMENT-2026-07-07.md]
updated: 2026-07-07
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

## Fable 5 rules (banked 2026-07-02, global CLAUDE.md; effort nuances added 2026-07-08)

$10/M in / $50/M out (2× Opus); long-horizon autonomy 91/100 vs Opus 63 (Every's benchmark); **"Opus plans, Fable executes"**; never ask Fable to show reasoning (silent reroute to Opus); reserve for the hardest 5–15% of tasks; free window ended 2026-07-07. **Fable is overkill for wiki/data ingestion — use Opus/Sonnet** ([[nate-herk]]).

**Effort routing (from Anthropic's release chart + Nate's testing, 2026-07-08):** Fable-on-low ≈ Opus-on-high in score at similar cost; **xhigh/max often OVERTHINKS** — runs long, second-guesses, degrades output vs high. Effort is a per-task dial, not a quality slider. Post-free-window play: smart-orchestrator + cheap workers (Opus/Sonnet orchestrating Haiku scouts tested 3× cheaper at identical quality — our standing rule since 2026-04-27).

## Community layers (evaluated, not installed)

- **gstack** (Garry Tan/YC, 89.7K stars): 23 skills + 8 power tools — CEO/Designer/Security-OWASP/QA-browser/Release personas. Verdict 2026-07: structurally the same as our global 6-Agent Quality Pipeline; **founder chose SKIP on install** (untrusted third-party code into `~/.claude/skills/` + binary compile + session hooks). Reference, not dependency.
- **/council skill** ([[nate-herk]] gold finding): 6-persona anti-sycophancy panel → green-light/reshape/kill verdict + cheapest 48h test. `.claude/commands/council.md` exists locally (untracked) — operationalizes [[test-cheap-before-build]].
- **This research-wiki** (Karpathy LLM-wiki pattern): the memory system was already ~70% of it; this vault closes the research-corpus gap.

Related: [[self-hosted-agents]], [[google-free-ai-stack]] (Antigravity is the competitor).
