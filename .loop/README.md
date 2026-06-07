# `.loop/` — the guard-railed autonomous-loop control room

This folder is the **safety layer** for letting Claude run autonomously on NakshIQ. Built so far: Phases 0–2 (rails, the verify layer, and propose-with-approval) and Phase 4 (the read-only opportunity scout). Everything that writes, commits, or deploys stays gated behind your approval; nothing here acts on its own. Phase 3 (auto-PR/merge for the safe class) is not wired.

**The core promise:** Claude does the work; **you stay the judge** of anything that writes, commits, or deploys. Every disaster in this project's history came from a session running too long without a checkpoint — these rails make that structurally impossible.

---

## The 3 buttons you actually need (non-technical)

Run these from a terminal in the project root. One command each.

| You want to… | Do this |
|---|---|
| **STOP the loop now** | Create an empty file called `STOP` in this folder. From Finder: New File → name it `STOP` (no extension). Or run `node scripts/_loop/loopctl.mjs stop`. The loop halts within one iteration and saves its place. |
| **Pause (resume later)** | `node scripts/_loop/loopctl.mjs pause` — suspends without losing state. `… resume` to continue. |
| **See what it's doing / spent** | `node scripts/_loop/loopctl.mjs status` — shows last run, token + agent spend, and whether anything is waiting for your approval. |

The loop checks for the `STOP` file at the **top of every iteration**, so it can never "run away" — worst case it finishes the current small step and exits.

---

## What's in here

| File | What it is | Edit it? |
|---|---|---|
| `config.json` | All the limits: budget caps, branch rules, egress rules, approval channel, action allowlist. | ✅ safe to edit — just numbers/lists, never executes |
| `README.md` | This file. | — |
| `state.json` | The loop's checkpoint (last run, spend). | auto-written; `loopctl reset` clears it |
| `pending-actions.md` | Anything the loop wants to **write/commit/deploy**, waiting for your `go`. | you approve here |
| `dismissed-findings.md` | Alerts the verifier proved were **false positives** (didn't wake you up). | review weekly |
| `findings-inbox.json` | Confirmed real findings queued for fixing (Phase 2+). | auto-written |
| `STOP` / `PAUSE` | Presence = halt / suspend. Absent by default. | you create/delete |

---

## The 8 guardrails (each maps to a real past incident)

1. **Budget cap** — ≤15 sub-agents, ≤200K tokens, ≤90 min per run. *(→ the 79-agent day that burned 50% of a week)*
2. **Approve gate on all writes/deploys** — nothing writes without your `go`. *(→ prod build crash, egress blowout)*
3. **Never writes to `main`** — works only on `loop/auto-*` branches. *(→ undeployed-branch prod crash)*
4. **Verify-before-fix** — a 2nd independent check must reproduce a finding before it's "real". *(→ 5/5 false positives, 2026-06-04)*
5. **Egress routing** — bulk DB writes (>50 rows) go direct-Postgres, never REST. *(→ Supabase egress freeze)*
6. **Kill-switch** — the `STOP` file halts everything in one iteration.
7. **Action allowlist** — reads/research run free; writes gate; `DROP`/`push main`/`rm -rf` are hard-blocked.
8. **Prompt-injection firewall** — scraped web text is read as data only, never as instructions; injection patterns are flagged + skipped.

These are enforced two ways:
1. **In code** (`scripts/_loop/guard.mjs`) — the primary layer, imported by every loop script. ✅ live.
2. **At the tool layer** (`.claude/hooks/loop-guard.mjs`) — a PreToolUse hook that blocks dangerous shell/git/SQL before it can run. ✅ **live** (wired into `.claude/settings.json` 2026-06-07). It is segment-aware: it only blocks a pattern when it's actually *executed* (start of a command), so writing docs or fixtures that merely *mention* `rm -rf` / force-push is not blocked. Always blocks force-push-to-main, `rm -rf /`, fork bombs; when `NAKSHIQ_LOOP=1` it additionally blocks the full hard-list (push to main, DROP/DELETE/TRUNCATE, vercel domain changes).

---

## What runs autonomously vs never

- **Free (no gate):** reading files, read-only DB queries, lint/type-check, web research, writing scratch files, drafting SQL to a staging file, the verify layer.
- **Gated (needs your `go`):** any DB write, git commit, Vercel deploy, Supabase migration, env change.
- **Never (hard-blocked):** `git push main`, `DROP`/`DELETE`/`TRUNCATE`, Vercel domain changes, force-push, `rm -rf`, payments, secret entry.

---

## Status: Phases 0-2 + 4 built

- ✅ Phase 0 — these rails + `guard.mjs` + `loopctl.mjs` + the PreToolUse hook script (one manual line to activate, see above).
- ✅ Phase 1 — `scripts/_loop/verify-findings.mjs`: independently reproduces every M1–M7 audit finding before it counts. Run it manually: `node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs`.
- ✅ Phase 2 — diagnose + draft fix + iMessage you to approve (`/loop-propose`).
- ✅ **Phase 4 — the OPPORTUNITY SCOUT.** Finds value, not just defects: demand-weighted data gaps, SEO striking-distance, new-surface intent gaps (CRO is built but data-gated/off). Read-only; writes `opportunities-{inbox.json,digest.md}`; applies nothing. Full runbook: **[OPPORTUNITIES.md](OPPORTUNITIES.md)**. Sources probe: `node --env-file=apps/web/.env.local scripts/_loop/sources.mjs --probe`.
- ⏳ Phase 3 (not wired) — auto-open PR → CI green → auto-merge for the safe class only.
