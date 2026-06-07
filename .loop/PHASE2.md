# Phase 2 — diagnose → draft fix → iMessage approve

Phase 2 turns a **confirmed** finding into a **proposed fix you approve from your phone**. It never applies anything on its own — you are the gate (guardrail 2).

Two kinds of step are involved:
- **Deterministic (scripts):** verify findings, build diagnoses + runbooks, render the approval queue + the iMessage text. These run as plain `node` scripts and are fully tested.
- **Orchestrated (Claude + MCP):** draft the concrete code patch, send the iMessage, and apply approved fixes. These need an LLM + the iMessage/git tools, so Claude runs them — either you in a session, or a scheduled headless `claude -p` run (Phase 3).

---

## The propose cycle (run by Claude — e.g. `/loop-propose`)

1. **Refresh findings** — `node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs`
   → writes `.loop/findings-inbox.json` (confirmed / inconclusive).
2. **Build proposals** — `node scripts/_loop/propose-fixes.mjs`
   → writes `.loop/pending-actions.md` (numbered, human-readable), `.loop/proposals.json`, `.loop/outbox.txt` (iMessage text).
3. **Draft the concrete patch (Claude):** for each proposal whose `riskClass` is a code fix, Claude reads the located route file(s), confirms the root cause, and writes the *actual* diff into the proposal's section in `.loop/pending-actions.md` (as a fenced diff). It does **not** edit app files yet.
4. **Notify (Claude → iMessage):** Claude sends the contents of `.loop/outbox.txt` to your iMessage (see "iMessage wiring" below).
5. **STOP.** The loop ends here and waits. No code is touched.

If step 1 finds **0 confirmed** (everything clean or all false positives dismissed), the cycle sends nothing and exits — no noise.

---

## The approve flow (run by Claude — e.g. `/loop-approve "<your reply>"`)

You reply on iMessage with one of: `go` (all) · `go 1 3` (those numbers) · `skip` (none).

Claude then, for each approved proposal **and only those**:
1. `assertSafeBranch()` + checkout `loop/auto-<date>` (guardrail 3 — never main). Set `NAKSHIQ_LOOP=1` so the PreToolUse hook enforces the in-loop hard-list.
2. Apply the drafted patch (the diff already in `pending-actions.md`).
3. `npm run type-check` / `npm run build` (or the relevant test) — must pass.
4. Commit to the `loop/auto-*` branch and **open a PR** (never push to main).
5. Re-run `verify-findings.mjs` to confirm the original finding is now resolved; note the result on the PR.
6. Move the applied item out of `pending-actions.md`; iMessage you the PR link.

Anything you didn't approve stays in `pending-actions.md` untouched. Anything that fails type-check/build is reverted and reported, not merged.

---

## iMessage wiring (your chosen channel)

The iMessage send uses the iMessage MCP `reply` tool, which needs a **chat_id**. To activate:
- **One-time:** text the assistant's iMessage bot once (e.g. "loop status"). That establishes the chat_id; Claude replies on the same thread thereafter. Access is managed by `/imessage:access` (run by you).
- The loop writes the message to `.loop/outbox.txt`; Claude sends that text via `reply(chat_id, …)`.
- For a scheduled (headless) run, the chat_id is passed in the routine config. Note: interactively-authenticated MCP servers may be absent in headless/cron runs — confirm iMessage is reachable in that context before relying on it (Phase 3).

Until the chat_id is established, the loop still produces `.loop/pending-actions.md` + `.loop/outbox.txt` — you just read them directly instead of getting a ping.

---

## What stays out of Phase 2 (Phase 3)

- **Scheduling** the propose cycle (cron / GitHub-event routine, headless `claude -p`).
- **Auto-merge for the safe class only** (e.g. cache-busts, slug-allowlist regen, data backfills that pass adversarial verify). Code edits to `apps/web/src/**` are never auto-merged — they always wait for your PR review.
