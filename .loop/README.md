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

## Status: Phases 0-2 + 4 + 5 + 6 + 7 built

- ✅ Phase 0 — these rails + `guard.mjs` + `loopctl.mjs` + the PreToolUse hook script (one manual line to activate, see above).
- ✅ Phase 1 — `scripts/_loop/verify-findings.mjs`: independently reproduces every M1–M7 audit finding before it counts. Run it manually: `node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs`.
- ✅ Phase 2 — diagnose + draft fix + iMessage you to approve (`/loop-propose`).
- ✅ **Phase 4 — the OPPORTUNITY SCOUT.** Finds value, not just defects: demand-weighted data gaps, SEO striking-distance, new-surface intent gaps (CRO is built but data-gated/off). Read-only; writes `opportunities-{inbox.json,digest.md}`; applies nothing. Full runbook: **[OPPORTUNITIES.md](OPPORTUNITIES.md)**. Sources probe: `node --env-file=apps/web/.env.local scripts/_loop/sources.mjs --probe`.
- ✅ **Phase 5 — the BUSINESS-OPPORTUNITY SCOUT (`/loop-bizscout`).** Different target from Phase 4: finds NEW businesses for Ashish's *portfolio*, not NakshIQ growth. Harvests live demand signals across 19 channels (14 digital + 5 real-economy: physical trade, manufacturing/Made-in-India PLI, markets-trading, franchise/licensing, media ownership — added 2026-06-11 after the founder correction "you are trying to force AI on stuff") → synthesizes NEW businesses → validates + scores each on a 6-factor rubric → **independently fact-checks** the top ideas' load-bearing claims → **dedupes across runs** into a living ledger so the same idea never re-surfaces. Channel "richness" is scored OBJECTIVELY (avg validated score, dup-penalised — never by volume). Agent fan-out: `scripts/_loop/bizscout-workflow.js` (Workflow tool). Deterministic half (dedupe/scoring/ledger, 19 self-tests): `scripts/_loop/bizscout-ledger.mjs`. Human ledger: `data/research/OPPORTUNITIES.md`. **The iMessage digest is gated by `bizOpportunities.autoSend` in config.json (default off).** Light run = 6 core channels (~18 agents, the weekly cadence); `full` = all 19 (~60 agents, manual only).
- ✅ **Phase 6 — the STRATEGIST CHECKLIST / principles layer (`/loop-checklist`).** Phase 5 finds ideas; Phase 6 judges them against what great operators actually demand. Distilled from 20 long-form transcripts (Masters' Union founder masterclasses — Screwvala, MobiKwik, Zepto, Hike, Fixderma… + Tony Robbins business frameworks) plus Basesh Gala's 18 frameworks + Bhavin Shah → **one deduped, consensus-weighted 35-item checklist** (`data/research/strategist-checklist.json` / `STRATEGIST-CHECKLIST.md`). Items are staged: **idea-quality** (the 14 we score on), **execution-playbook**, and **founder-fit** (guidance, not a filter). Every ledger idea is graded item-by-item (one Sonnet agent each), with a hard rule separating **structural fails** (real deal-breakers) from **unproven/unknown** (not yet tested — excluded). The deterministic scorer (`scripts/_loop/strategist-checklist.mjs`, 34 self-tests) turns verdicts into a weighted **idea-quality fit**, blends it with the 6-factor composite into one **conviction** score (0.55·fit + 0.45·composite), caps any idea failing 2+ load-bearing idea-quality tests at **PARK**, and writes the re-ranked `data/research/OPPORTUNITIES-SCORED.md`. Repeatable: `gen-strategist-score-workflow.mjs` rebuilds the scoring workflow from the live ledger (`--new-only` for the cheap incremental path after `/loop-bizscout` adds ideas). The heavier distill→synthesis run that builds the checklist itself: `scripts/_loop/strategist-checklist-workflow.js`.
- ✅ **Phase 7 — the RATAN TATA FINAL GATE (`/loop-checklist` runs it last).** The integrity/ethics veto that sits ABOVE everything. The strategist checklist (Phase 6) asks "will it *win*?"; this asks "*should* it exist — would Ratan Tata be proud to put the Tata name on it?" **It overrides all other layers**: an idea that fails a non-negotiable (weight-3) test is **BLOCKED** no matter how high its conviction; a `conditional` does NOT demote the idea — its fix becomes a mandatory launch precondition (founder 2026-06-11: "be flexible with the gates... there's always a way to be ethically aligned"; the gate FINDS the ethical path, it never breaks a profitable idea for no reason). Built from an exhaustive web sweep (34 agents, 9 angles — bio/trusts, the actual Tata Code of Conduct, the 26/11 Taj response, Nano/Singur, JLR, scholarship, criticism) with an **adversarial quote-verification phase** (fabricated "Ratan Tata quotes" are rampant — e.g. the famous "I take decisions and make them right" is fake, he disowned it; only sourced material is used). The gate (`data/research/ratan-tata-gate.json` / `RATAN-TATA-GATE.md`): 12 tests, 6 non-negotiable vetoes — No-Bribe, Don't-Exploit-the-Weak, Public-Scrutiny, All-or-Nothing-Integrity, Truthful-Claims, Safety-Never-Compromised. Deterministic override lives in `strategist-checklist.mjs` (`finalTierFor`, BLOCKED sorts above all; 46 self-tests). Repeatable: `gen-tata-gate-apply.mjs` rebuilds the gate-apply workflow from the live ledger → run it → `strategist-checklist.mjs --apply-tata <scores> --strategist <scores>` writes the FINAL Tata-gated `OPPORTUNITIES-SCORED.md`. The heavier research run that BUILDS the gate: `ratan-tata-gate-workflow.js`.
- ✅ **Phase 8 — SECOND-BRAIN layer (2026-06-11, from the Nate Herk Four-C's gap analysis).** Three pieces that turn the pipeline into a living brain: (1) **`data/research/OPPORTUNITY-BRAIN.md`** — the router; one file any session loads to understand every layer, rule, and skill of the opportunity system. (2) **`data/research/FOUNDER-PROFILE.md`** — the calibration layer; founder_fit scoring and gate conditionals read the founder from THIS file, never from an agent's guess (grill-me pattern). (3) **TRIPWIRES (`/loop-tripwires` + `.loop/tripwires.json`)** — 37 load-bearing assumptions behind the top-14 ideas (28 kills / 9 upgrades), each with a concrete trigger + monthly check query; a fired "kills" = the verdict is stale, re-score before acting; a fired "upgrades" = a buy-signal (e.g. enforcement begins, threshold notified). Plus the **self-improve rule** baked into `/loop-bizscout` step 10: every run ends by patching whatever misfired — the system gets better, not just wiser. MEMORY.md compacted 126KB→17.5KB (audit #39) so the brain's index actually loads whole.
- ✅ **Phase 9 — the DAILY OPPORTUNITY RADAR (`/loop-radar`, 2026-06-11).** The cadence layer — the brain runs every day at 12:03pm without being asked. Four cheap **Haiku** harvest legs: (a) 2 rotating web channels (the bizscout 19-channel table — full coverage every ~10 days), (b) the Gmail newsletter inbox (TLDR AI + Medium; gracefully skips headless, the manager covers it in-session), (c) the 9-channel pro-YouTube watchlist via RSS (block-proof; transcripts for the top 1-2 new videos), (d) govt sources India + Australia (RBI/SEBI/PIB/TRAI/MeitY + ACCC/ASIC/grants/Treasury/ACMA). Then one **Sonnet** synthesis filter (≤5 ideas, honest scarcity is the norm), Haiku validate + fact-check, ledger merge (same dedupe as Phase 5), strategist + Tata scoring on anything NEW, and the **manager** (the main session) reviews, drops/flags, and presents only high conviction. ≤15 agents/run, ≤3 in flight (firm rule). Pieces: `gen-radar-workflow.mjs` (regenerated daily — embeds state/sources/ledger ban-list), `.loop/radar-sources.json` (editable registry), `.loop/radar-state.json` (incremental since-stamps), `.loop/radar-runs/` (run archive), `dailyRadar` in config.json (autoSend=true → the daily brief iMessages Ashish). Scheduler: `com.nakshiq.loop-radar` launchd job — installer staged at `.loop/radar-install/install.sh` (Claude is hard-blocked from granting itself the unattended permissions; running the installer is the founder's one-time approval).
- ⏳ Phase 3 (not wired) — auto-open PR → CI green → auto-merge for the safe class only.
