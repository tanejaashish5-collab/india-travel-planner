---
type: tool
sources: [data/research/VAIBHAV-SISINTY-TOOLS-INVENTORY-2026-07-01.md]
updated: 2026-07-07
---

# Self-hosted / always-on agents

The "standing agent independent of a chat session" category, as of 2026-07.

## Hermes Agent (Nous Research, open-source) — the category leader

- Self-hosted on a VPS (**Hostinger one-click template, KVM 2 ~₹799/mo**), reachable via Telegram/WhatsApp/Slack/Discord/email
- **Self-improving**: writes its own skill files after every task; persistent memory across sessions forever
- 200+ LLM backends (can run Claude as its brain), parallel subagents, built-in cron scheduler, browser automation, sandboxed Docker code execution
- [[vaibhav-sisinty]]'s framing: replaces a "₹2 lakh/month competitive-intelligence job"
- Competitor: OpenClaw (lacks the self-improving skill files)

## Claude's own equivalents (verified 2026-07-01)

- **Claude Cowork** (GA April 2026): autonomous desktop agent, scheduled tasks, connectors — the Cowork value is largely what Claude Code + cron already gives us
- **Claude Dispatch** (preview March 2026): phone→desktop remote control; ~50% reliability on complex tasks — not dependable yet

## Our position

We already run the always-on pattern natively: Claude Code crons (radar loop 12pm daily, canary probes, GSC/GA4 audits, autoposter via launchd/GHA). A Hermes VPS would add: survives-Mac-being-off + WhatsApp/Telegram reachability. Current constraint that makes this interesting: the Chanakya autoposter **requires the Mac stay on and plugged in** — a ₹799/mo VPS is the standing fix if that ever becomes unreliable. Not urgent; noted.

Related: [[claude-code-ecosystem]], [[google-free-ai-stack]] (Gemini Spark is Google's hosted version).
