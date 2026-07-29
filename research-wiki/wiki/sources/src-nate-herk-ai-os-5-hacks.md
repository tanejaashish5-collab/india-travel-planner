---
type: source
origin: .scrapes/youtube/yt-Ek1NBfnnTH0/ (triage — no findings doc written)
date: 2026-07-23
---

# Source: Nate Herk — "5 Hacks to Instantly Level Up Your AI OS"

25-min video (yt Ek1NBfnnTH0, 929 views, up 2026-07-23), full 6K-word transcript read. **TRIAGE verdict: ~85–90% banked** — his 7th study on the [[nate-herk]] page. No findings doc / no PDF (low-yield, mirrors [[src-sowmay-jain-trs]] treatment).

## The 5 hacks (all already ours, more mature)
1. **CLAUDE.md as a router** — top-level CLAUDE.md = master routing table (where data lives), project-level CLAUDE.mds = system prompts. = our exact 3-layer boot (global identity → dashboard index → project).
2. **Have AI audit its own OS** — periodic read-only audit of routing integrity / index-truth / freshness, reports fixes, awaits approval. = our dreaming job + capability-watcher + daily-QA harness. *(the one idea worth re-applying — see below.)*
3. **Crons to update data** — auto-pull recurring feeds (weekly Q&A, meeting transcripts) so the wiki self-updates. = our launchd/CronCreate fleet.
4. **Segment knowledge** — split growing knowledge nodes into separate wikis so the agent searches narrower context; client work = internal-context-by-client + external deliverables in a separate repo. = research-wiki folders + per-project memory.
5. **Backtrack** — when the agent fails to find data that exists, make it retrace + diagnose WHY (then fix the routing), instead of "don't make mistakes." **The one genuinely new micro-tactic** — a prompting habit worth adopting.

Context vocabulary (clean, not new capability): 4 failure modes **poisoning / bloat / confusion / clash**; 2 context types **expertise** (always-loaded rulebook) vs **situational** (just-in-time lookup) — principal-vs-teacher analogy. Maps 1:1 onto rules we already enforce (no-fabrication=anti-poison, MEMORY 17KB cap=anti-bloat, verify-before-verdict=anti-confusion, freshness-drift cron + content_reviewed_at=anti-clash).

## The actual take: ran his hack #2 on Ashish's real OS
Read-only routing-integrity audit (2026-07-24):
- **research-wiki: CLEAN** — 0 real dangling wiki-links across 94 pages (proof the ingest discipline holds).
- **memory index: DRIFTED** — 0 broken pointers, but **48 orphan files** on disk in no index. ~40 are safely-dead April session logs (superseded by docs/sprint-history.md); ~5 are feedback/reference rules that fell out of the index (invisible to future sessions); **1 is the unactioned `DREAM-PROPOSAL-2026-07-19.md`** whose item #10 (07-17 quiz kill-gate + ranking re-measure) is now a week past due.

Lesson banked: even an ~85% dedup video earns its slot if you *apply* its one idea to your own system rather than just grading the content. See [[nate-herk]] standing lesson.

Related: [[nate-herk]], [[claude-code-ecosystem]], [[src-karpathy-llm-wiki]], [[receipts-over-content]], [[src-sowmay-jain-trs]].
