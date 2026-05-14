# Cinematic Rollout Tracker

> Living punch-list for the big-bang flip into the cinematic design.
> Update tier counts and tick items off as state-sessions land.
> Authoritative source: `node scripts/cinematic-readiness.mjs` → `qa/cinematic-readiness.md`.

## Snapshot — 2026-05-14 (post-Odisha widget topup)

**505 dests · A=307 · B=198 · C=0**

Last delta: Odisha widget topup — 19 of 22 dests flipped B → A. 3 honest-scarcity B-holds (deomali eats:2/5, nrusinghanath-harishankar eats:4/5, simlipal eats:3/5 — all due to remote/reserve-zone dining scarcity).

Prior: Gujarat full backfill (29 dests all C → A). **Corpus C-tier eliminated** as of 2026-05-13. Remaining work is B → A widget topup on 198 dests.

Gate ([apps/web/src/lib/cinematic-destinations.ts](../apps/web/src/lib/cinematic-destinations.ts), `cinematic-rollout-2026-05-05` branch) currently allowlists **manali only**. Big bang = expand Set to all 505 (or all A + honest-scarcity B).

A-tier thresholds: ≥3 gems · ≥5 eats · ≥3 stays · 12/12 months prose · tagline + why_special.

---

## Phase 1 — Data closeout (state-by-state)

Tick each state when its readiness report shows **0 C-tier remaining** and all reachable B's are A. Honest-scarcity B-holds stay B (documented on `/transparency`).

### A. Finish Maharashtra prose (current focus)

Widgets shipped S24–S28 (41A·5B·0C on widget count) but prose was only written for 11 Ashtavinayak/Buddhist-caves dests in S23. The other 35 MH dests have months_prose:0/12.

**33 prose-only dests** — should flip cleanly to A after 12 months prose:

- [x] Ajanta Caves
- [x] Alibaug
- [x] Amboli
- [x] Aurangabad
- [x] Bhandardara
- [x] Bhimashankar
- [x] Daulatabad Fort
- [x] Ellora Caves
- [x] Ganpatipule
- [x] Harihareshwar
- [x] Igatpuri
- [x] Khandala
- [x] Kolad
- [x] Kolhapur
- [x] Lonar Crater
- [x] Lonavala
- [x] Mahabaleshwar
- [x] Malvan
- [x] Matheran
- [x] Mumbai
- [x] Murud-Janjira
- [x] Nagpur
- [x] Nashik
- [x] Panchgani
- [x] Pench National Park (Maharashtra side)
- [x] Pune
- [x] Raigad Fort
- [x] Ratnagiri
- [x] Satara
- [x] Shirdi
- [x] Tadoba-Andhari Tiger Reserve
- [x] Tarkarli
- [x] Trimbakeshwar

**2 prose + widget-topup dests** — likely honest-scarcity B-locks:

- [x] Elephanta Caves — prose done (B-locked honest scarcity: eats (Gharapuri UNESCO island ~1500 pop, no commerce; likely stays B)
- [x] Kashid — prose done (B-locked honest scarcity: 1 eat (small beach village ~2000 pop; likely stays B)

**Existing honest-scarcity B-holds (no action needed):**
Astavinayak Circuit (eats:4/5 + stays:2/3) · Morgaon (eats:4/5) · Siddhatek (stays:2/3).

**Cadence:** 3 prose sessions at 2-3 parallel agents (5-8 dests each) = MH closeout in ~3 sessions.

---

### B. Gujarat (full state, biggest single block — 29 dests, all C)

Entire state untouched: prose 0/12, gems 0-1/3, eats 0/5, stays partial.

- [x] **Eateries** — 147 new across 29 dests (S30 bucket A 52, B 50, C 45)
- [x] **Stays** — 63 new + 24 upserted via ON CONFLICT (some pre-existing slots replaced)
- [x] **Hidden gems** — 87 new across 29 dests (3 per dest)
- [x] **Prose** — 348 month UPDATEs (29 × 12), all 12/12 with prose_lead

Dests: Ahmedabad · Ambaji · Bhavnagar · Champaner-Pavagadh · Dakor · Dholavira · Dwarka · Gandhinagar · Gir National Park · Mount Girnar · Junagadh · Kutch (Bhuj) · Lothal · Mandvi · Marine National Park · Modhera · Nalsarovar · Palitana · Porbandar · Rajkot · Rani ki Vav · Rann of Kutch · Saputara · Sasan Gir · Somnath · Statue of Unity · Surat · Vadodara · Velavadar.

---

### C. Other B-tier widget topup (after MH + GJ close)

In rough load order — biggest gaps first. Tick state when 0 C + all reachable B → A.

- [x] Odisha (S32: 19 B → A; 3 HS B-holds — deomali, nrusinghanath-harishankar, simlipal — all reserve/remote-zone dining scarcity)
- [ ] Telangana (15 B, eats blocker)
- [ ] Madhya Pradesh (13 B, gems + eats)
- [ ] Andaman & Nicobar (12 B, eats blocker — many uninhabited islands, will hit HS caps)
- [ ] Kerala (12 B, eats top-up)
- [ ] Andhra Pradesh (12 B, eats top-up after S22)
- [ ] Jammu & Kashmir (14 B, mixed)
- [ ] Himachal Pradesh (11 B)
- [ ] Ladakh (10 B)
- [ ] Uttarakhand (10 B)
- [ ] Arunachal Pradesh (9 B)
- [ ] Assam (8 B, never started widget sweep)
- [ ] Meghalaya (7 B)
- [ ] Uttar Pradesh (7 B)
- [ ] Tamil Nadu (5 B residual)
- [ ] Sikkim (4 B)
- [ ] Nagaland (4 B)
- [ ] Bihar (3 B) · Goa (3 B) · Karnataka (3 B) · Lakshadweep (3 B)
- [ ] Manipur (2 B) · Tripura (2 B)
- [ ] Mizoram (1 B) · Haryana (1 B) · Punjab (1 B)

**Target end state:** ~475 A · ~30 B (honest scarcity) · 0 C.

---

### D. Honest-scarcity locked-B catalog (final review before cutover)

Confirm each remaining B has a `/transparency` justification. Currently identified:

- [ ] Maharashtra: Elephanta Caves · Kashid · Astavinayak Circuit · Morgaon · Siddhatek
- [ ] Odisha: Deomali (1672m peak no plated dining) · Nrusinghanath-Harishankar (remote pilgrim trust meals only) · Simlipal (tiger reserve closed Jun-Oct, no core dining)
- [ ] Track new additions as B-tier topup sessions surface them

---

## Phase 2 — Cinematic UI tooling (branch `cinematic-rollout-2026-05-05`)

- [ ] Build [scripts/cinematic-batch-qa.mjs](../scripts/cinematic-batch-qa.mjs) — Playwright captures 1440 + 375 for each dest into `qa/cinematic/{slug}-{viewport}.png`
- [ ] Build [apps/web/src/lib/cinematic-destinations.generated.ts](../apps/web/src/lib/cinematic-destinations.generated.ts) — slug list derived from DB
- [ ] Update [apps/web/src/lib/cinematic-destinations.ts](../apps/web/src/lib/cinematic-destinations.ts) to import the generated Set
- [ ] Run batch QA on cinematic worktree at localhost:3001 → ~1,008 screenshots
- [ ] Compile `qa/cinematic-punchlist.md` from screenshot triage

---

## Phase 3 — Punch-list iteration (branch only)

- [ ] Fix scoped-CSS leaks for reused widgets that don't read as dark editorial
- [ ] Component-level "skip if empty" guards where data is genuinely sparse
- [ ] Mobile-only layout regressions
- [ ] Optional component polish (`variant="cinematic"` for review-form / question-form / KBYG / trap-intervention)
- [ ] Re-run batch QA until punch-list clears or remaining issues are explicitly accepted

---

## Phase 4 — Cutover (~½ day)

- [ ] Final readiness scan → 0 C, all expected B's match HS catalog
- [ ] Rebase `cinematic-rollout-2026-05-05` on `main` (diff should be UI/CSS only — data already on main)
- [ ] Single PR cinematic → main
- [ ] Force Vercel prod deploy
- [ ] Smoke test 10 random dests on prod (mix of A and HS-B)
- [ ] 24h watch: GA4 sessions/CTR · Vercel error logs · GSC crawl errors
- [ ] Rollback path locked: revert merge SHA if regression (data stays, only UI reverts)

---

## Non-blocking (parallel tracks)

- [ ] IMD/CPCB env keys → unlocks live-data hero strip (gracefully degrades meanwhile)
- [ ] Kaza video upload to R2 (single dest)
- [ ] GA4 `aio_referral` custom dimension registration (User scope)
- [ ] Photographer brief budget approval (Cowork covers Phase 1)
- [ ] `coll-rajasthan-fort-circuit` cover (last collection-cover gap)

---

## Update protocol

After every state-session:
1. Re-run `node scripts/cinematic-readiness.mjs` → refreshes `qa/cinematic-readiness.md`
2. Update the **Snapshot** numbers at the top of this file
3. Tick off the state's box(es) below
4. Commit + push (per `feedback_save_commit_push_after_each_state.md`)
