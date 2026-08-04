---
type: pattern
sources: [data/research/NATE-HERK-5000-HOURS-2026-08-04.md]
updated: 2026-08-04
---

# Tool layer, not prompt layer

**The pattern:** a rule that lives in a prompt is a **suggestion**. A rule that lives in the tool
layer — a credential scope, a tool allowlist, an enable-flag — is a **restriction**. Models are
non-deterministic, so "I told it not to" is not a control, and every capability an agent holds
must be assumed to fire eventually.

> *"You can tell your agent never send emails, only write drafts. But if it still has a send
> email tool, then it can still send emails."* — [[nate-herk]], after an agent of his emailed
> **~150,000 people** a discount code nobody asked it to send. It read a task on a to-do list and
> interpreted it as "send this".

## The audit question

For anything that touches the outside world — email, social publishing, payments, DB writes —
ask: **what can this thing do on its own? Can it send, or only draft? Publish, or only queue?**
**If the answer is scary, fix the access, not the prompt.**

His analogy is the right one: you would not hand a new hire a working credit card and say
*"don't use this."*

## Confirmed live in our own stack (2026-08-04)

JobAgent's documented safety claim is *"drafts replies… NEVER sends"*. Where that restriction
actually lives, checked rather than assumed:

- **Prompt** — `run-agent.sh:57`, *"Draft-only: never send email."* ✅ present
- **Tool layer** — `~/.outlook-mcp/config.json` has `read_only: false`, which issues
  `SCOPES_READWRITE` **including `Mail.Send`**, and exposes `outlook_send_message`,
  `outlook_send_draft`, `outlook_send_with_attachments`
- **`allow_categories`** — not set ⇒ empty ⇒ *"fully open"*, every write category permitted

So the whole guarantee is prompt-level. Nothing has gone wrong, which is exactly what an
uncontrolled risk looks like right up until it does. **Fix pending founder action** (the config
file is classifier-blocked for Claude): set `allow_categories` to every category the automations
actually use **minus `mail_send`**. It is a call-time gate in the server, so no re-auth and
instantly reversible. It closes the agent-accessible path but does **not** revoke the underlying
Graph scope — the bridge only offers read_only as all-or-nothing, and that would kill drafting.

**The counter-example we already do right:** Chanakya's auto-publish is gated by
`publish.enabled` plus native `publishAt` (private-first) — a real flag, not an instruction.
That is why shorts can be fully autonomous without being frightening.

## Why it belongs beside our other verification rules

This is the same instinct as [[verification-as-moat]] and the standing never-infer-a-commit-landed
discipline, pushed one layer down: **don't verify that the agent behaved — remove its ability to
misbehave.** Verification catches a bad outcome after the fact; capability scoping prevents the
class entirely. Use both, in that order of preference.

Related: [[nate-herk]], [[src-nate-herk-5000-hours]], [[verification-as-moat]],
[[claude-code-ecosystem]].
