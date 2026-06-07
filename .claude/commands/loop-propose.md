---
description: Run the Phase 2 propose cycle — verify findings, diagnose, draft fixes, iMessage Ashish for approval (never applies anything)
---

Run the guard-railed autonomous-loop **propose cycle**. Follow `.loop/PHASE2.md` exactly. Do NOT edit app code, commit, or deploy — this is propose-only; Ashish is the gate.

Steps:
1. Refresh findings (read-only): `node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs`
2. Build proposals: `node scripts/_loop/propose-fixes.mjs`
3. Read `.loop/proposals.json`. For each proposal that is a code fix, open the located route file(s), confirm the root cause, and write the **concrete diff** into that proposal's section in `.loop/pending-actions.md` as a fenced ```diff block. Do not touch the actual app files.
4. If `.loop/outbox.txt` has proposals, send its contents to Ashish via the iMessage `reply` tool (use the established chat_id; if none, tell Ashish to text the bot once per `.loop/PHASE2.md`).
5. STOP. Report the proposal count + the iMessage status. Wait for Ashish's `go`/`skip` reply (processed by `/loop-approve`).

If 0 confirmed findings: send nothing, report "clean — nothing to propose."
