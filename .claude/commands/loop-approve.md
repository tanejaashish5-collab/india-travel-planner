---
description: Process Ashish's approval reply (go / go N / skip) — apply ONLY approved Phase 2 fixes on a loop branch, build, open PR. Never main.
argument-hint: "go" | "go 1 3" | "skip"
---

Process the approval reply: **$ARGUMENTS**

Follow `.loop/PHASE2.md` "approve flow" exactly. Read `.loop/proposals.json` for the proposals.

Rules (hard):
- Apply ONLY the approved proposal numbers. `skip` = apply nothing, clear `.loop/pending-actions.md`.
- Work on a `loop/auto-<today>` branch — run `git rev-parse --abbrev-ref HEAD` and if it's `main`/`master`, `git checkout -b loop/auto-<date>` first. Export `NAKSHIQ_LOOP=1` for the session so the PreToolUse hook enforces the in-loop hard-list.
- NEVER push to main, NEVER force-push, NEVER run DROP/DELETE/TRUNCATE.

For each approved proposal:
1. Apply the drafted diff from `.loop/pending-actions.md`.
2. Run `npm run type-check` (and `npm run build` if the change is non-trivial). If it fails → revert that proposal, log it, continue.
3. Commit to the `loop/auto-*` branch with a clear message.
4. After all approved fixes: open a PR (base main) with `gh pr create`, summarizing what was applied + the original findings.
5. Re-run `node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs` and note on the PR whether the findings are now resolved.
6. Remove applied items from `.loop/pending-actions.md`; iMessage Ashish the PR link via the `reply` tool.

Report: what was applied, what failed (if anything), and the PR URL.
