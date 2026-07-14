---
type: source
sources: [data/research/NICK-SARAEV-AGENT-WORKFLOW-2027-2026-07-14.md]
updated: 2026-07-14
---

# Nick Saraev — "Steal My Actual AI Agent Workflow (2027)"

Video yt-8rVQuZlRaqo (uploaded 2026-07-14, 19:21, 470K subs). Fifth Nick Saraev audit (after screen-watcher, 25-websites, Justin Lob).

## "Nick OS" — his task-management stack

1. **Shared AI+human workspace** — Linear board (Inbox → Next → Doing → Waiting → Done); humans and agents work the same board.
2. **Agent dispatch** — tag "agent-ready" → Linear webhook fires → a server-resident agent (he name-drops **Fable 5**) picks it up with workspace context + a knowledge base of his preferences + credentials (incl. Chrome DevTools sign-ins).
3. **Capture (GTD)** — global hotkey + iPhone **Action-button shortcut** push tasks into the queue from anywhere; double-click = agent task, single = human task; push notification pings him when an agent is "waiting on Nick."
4. **Evals as guardrails** — every output must clear two checklists before reaching him: a *visual-asset eval* (text renders clean, correct dimensions, house style) and a **"done the way Nick thinks" eval** — 5 principles (first-principles reasoning, EV discipline, his-time-minimized, verified-not-plausible, leverage check) scored 0–2 each; total <7 or any single 0 = auto-fail, agent iterates.
5. **His role shift**: "the bottleneck is no longer how much work I can do in a day, it's how quickly and accurately I can scope the work." Checks the board 3-4×/day in batches; tracks token budget as a managerial concern.

## Claims — UNVERIFIED

"$400K this month" across LeftClick/Clervo/Maker School; "worked for Mr. Beast, Anthropic, OpenAI." Marketing self-report, no independent confirmation.

## Business-idea value: ZERO

The workflow is given away free (maker-zero Skool link); paid product is Maker School. **7th confirmed data point** for [[money-is-services-not-adsense]] — content is the funnel, money is the community/agency. Further confirms [[public-premises-are-pre-arbitraged]]: he hands the exact system to 470K people for free, so "sell this workflow" is pre-arbitraged by its own creator.

## System value for our OS — 2 adoptable gaps

Comparison vs. what we already run (07-13 @claude channel audit, ~75% coverage):

- **GAP 1 (real) — persistent task queue.** We have sessions + launchd + cron, nothing event/queue-driven. He drops a task from his phone, an agent picks it up, status persists. We wouldn't need Linear — a `tasks/` queue (or GitHub issues) + a launchd watcher + the existing Telegram channel as capture covers the same shape at $0. Capture itself is a non-gap (we already have iMessage + Telegram + JobAgent pings, arguably richer than his hotkey/Action-button); the gap is the persistent queue + event-driven pickup, not capture.
- **GAP 2 — the "done the way [founder] thinks" scored eval.** We hold the raw material already (feedback rules, No-Bakwaas voice, quote-scores-on-0-10, evidence-before-verdict) but nothing generalized into a 5-question 0-2 scored gate deliverables must clear before reaching Ashish. This is the concrete first implementation of the evals-as-infrastructure item already ranked #2 in the 07-13 channel audit. Cheap (a skill file), immediately reusable across every automation.
- Everything else (knowledge base, credentials layer, visual-asset eval, waiting-on-human push) is a **no-gap** — our equivalents already match or exceed his.

Also banked: his framing "the bottleneck moved from doing the work to scoping the work + QA" — the cleanest articulation yet of the management shift our OS already imposes.

Related: [[nick-saraev]], [[money-is-services-not-adsense]], [[public-premises-are-pre-arbitraged]], [[claude-code-ecosystem]]
