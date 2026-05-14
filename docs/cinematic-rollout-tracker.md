# Cinematic Rollout Tracker

> Living punch-list for the big-bang flip into the cinematic design.
> Update tier counts and tick items off as state-sessions land.
> Authoritative source: `node scripts/cinematic-readiness.mjs` → `qa/cinematic-readiness.md`.

## Snapshot — 2026-05-14 (post-Arunachal widget topup)

**505 dests · A=365 · B=140 · C=0**

Last delta: **Arunachal Pradesh widget topup (S39) — 4 of 8 dests flipped B → A**. 4 HS B-locks all pre-flagged remote isolation: anini (Dibang Valley HQ 5k pop, eats 1/5) · bhalukpong (border-village 3k pop, eats 2/5) · mechuka (Indo-China LAC 2.5k pop, eats 2/5) · namdapha (UNESCO tiger reserve no in-park commerce, eats 1/5). **2 new schema gotchas surfaced** — `hidden_gems.coords` is `geography` not `point` + `hidden_gems.id` is text NOT NULL with no default — both now baked into feedback memory for next brief.

Prior: Uttarakhand S38 (10 of 10 — FIRST 100% conversion; base-village-anchor strategy validated). Ladakh S37 (8 of 10; 2 HS hanle/umlingla). HP S36 (9 of 11; 2 HS chandratal/prashar-lake). J&K S35 (8 of 14; 6 HS). MP S34 (8 of 13; 5 HS).

**Region-sweep cumulative: 47/66 dests flipped (71%), 19 HS B-locks.**

Prior: MP widget topup (S34) — 8 of 13 dests flipped B → A. 5 genuine HS B-locks: bandhavgarh/kanha (NP lodge-cluster dining 4/5 eats) · pachmarhi (small hill town 4/5) · bhimbetka (UNESCO no-commerce 2/5) · sanchi (UNESCO village 6k pop 3/5).

Prior: Rajasthan S33 (11 of 18 B→A; 7 B-holds — 3 HS + 4 dupe-collision). Odisha S32 (19 of 22). Gujarat S31 full backfill (29 C→A). **Corpus C-tier eliminated** as of 2026-05-13. Remaining work is B → A widget topup on 179 dests.

**Region-sweep sequence locked (N+NE+Central before south):** MP ✓ → J&K ✓ → HP ✓ → Ladakh ✓ → UK ✓ → Arunachal ✓ → Assam (8 B) → Meghalaya (7 B) → UP (7 B) → Sikkim 4 · Nagaland 4 · Manipur 2 · Tripura 2 · Mizoram 1 · Bihar 3 · Haryana 1 · Punjab 1 (mop-up). ~38 B-tier dests remaining across ~7 sessions.

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
- [x] Rajasthan (S33: 11 of 18 B → A; 7 B-holds — 3 genuine HS deeg/gagron-fort/dungarpur, 4 dupe-collision HS barmer/chittorgarh/kumbhalgarh/ranakpur)
- [x] Madhya Pradesh (S34: 8 of 13 B → A; 5 genuine HS B-locks — bandhavgarh/kanha lodge-cluster NPs · pachmarhi small hill town · bhimbetka UNESCO no-commerce · sanchi UNESCO village 6k pop)
- [x] Jammu & Kashmir (S35: 8 of 14 B → A; 6 genuine HS B-locks — bangus/doodhpathri/gurez/lolab alpine meadows · sinthan-top 3748m pass · tosamaidan 52yr firing range)
- [x] Himachal Pradesh (S36: 9 of 11 B → A; 2 HS B-locks — chandratal 4250m alpine lake eats 4/5, prashar-lake 2730m temple-lake eats 3/5)
- [x] Ladakh (S37: 8 of 10 B → A; 2 HS B-locks — hanle 4500m village eats 4/5, umlingla 5798m world's-highest pass eats 0/5 hard-lock)
- [x] Uttarakhand (S38: 10 of 10 B → A — **FIRST 100% CONVERSION**; zero HS B-locks; base-village-anchor strategy flipped all expected-HS-risk dests including roopkund/valley-of-flowers/tungnath/har-ki-doon)
- [x] Arunachal Pradesh (S39: 4 of 8 B → A; 4 genuine HS B-locks — anini Dibang Valley HQ 5k pop eats 1/5 · bhalukpong border-village 3k pop eats 2/5 · mechuka Indo-China LAC 2.5k pop eats 2/5 · namdapha UNESCO tiger reserve no in-park commerce eats 1/5)
- [ ] Assam (8 B, never started widget sweep) — NEXT (region-sweep)
- [ ] Meghalaya (7 B)
- [ ] Uttar Pradesh (7 B)
- [ ] Telangana (15 B, eats blocker) — DEFERRED (south)
- [ ] Andaman & Nicobar (12 B, eats blocker — many uninhabited islands, will hit HS caps) — DEFERRED (south/islands)
- [ ] Kerala (12 B) — DEFERRED (south)
- [ ] Andhra Pradesh (12 B) — DEFERRED (south)
- [ ] Tamil Nadu (5 B residual) — DEFERRED
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
- [ ] Rajasthan: Deeg (small palace town, no commerce near ASI palace) · Gagron Fort (remote island fort, no on-site dining) · Dungarpur (small Mewar town, only 3 verifiable eateries)
- [ ] Rajasthan dupe-collision HS (could re-flip with +1 verified eat each): Barmer · Chittorgarh · Kumbhalgarh · Ranakpur
- [ ] Madhya Pradesh: Bandhavgarh + Kanha (tiger NPs — lodge-cluster dining, no standalone village eateries) · Pachmarhi (small Satpura hill town) · Bhimbetka (UNESCO rock-shelter site, zero on-site commerce — eats 2/5) · Sanchi (UNESCO Buddhist village ~6,000 pop — only 3 verifiable eateries)
- [ ] Jammu & Kashmir: Bangus Valley + Doodhpathri + Gurez Valley + Lolab Valley (alpine meadows / LOC border — thin commerce) · Sinthan Top (3748m pass, no village/accommodation — hard-lock) · Tosamaidan (Indian Army artillery firing range 1962-2014, no village despite 2014 civilian reopening — hard-lock)
- [ ] Himachal Pradesh: Chandratal (4250m alpine lake Spiti, no village; Batal+Losar corridor only 3-4 dhabas — eats 4/5) · Prashar Lake (2730m temple-lake Mandi, thin commerce — eats 3/5)
- [ ] Ladakh: Hanle (4500m Changthang village ~1000 pop + dark-sky reserve, only 4 verifiable village kitchens — eats 4/5) · Umlingla (5798m world's-highest motorable pass per Guinness 9 Nov 2021, NO village + NO commerce + NO oxygen — hard-lock eats 0/5; pre-existing 4 stays in DB are likely fabricated, needs separate cleanup audit)
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
