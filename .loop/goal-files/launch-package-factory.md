# Launch-Package Factory — master goal file

> **How to run:** in a fresh Claude Code session (Opus, effort high), prompt:
> *"Read `.loop/goal-files/launch-package-factory.md` and execute everything below the divider as your goal, with IDEA = <idea name from the PURSUE tier>. The file is your full instruction set — mission, guardrails, phases, deliverables, definition of done. Follow it exactly, including the never-ask rule. Do not report back until the definition of done is met. Start now."*
>
> Adapted 2026-07-09 from Nate Herk's company-builder master prompt (yt-R0qF17BVl9w), rebuilt for our rules: no pain-hunt phase (the PURSUE tier already exists), max-3-concurrency, Opus orchestrator + cheap workers, zero fabrication, and the honest framing that **a launch package is smoke-test material, not validation**.

---

## Mission

Take the single idea named in the run prompt (IDEA) from the PURSUE tier of `.loop/biz-opportunities-ledger.json` and produce a **complete, stranger-testable launch package** for it — brand, offer, landing page, demo/launch video script (rendered video if assets allow), business plan, and a red-team verdict — packaged into one recap HTML.

This package is the asset kit for a presell smoke test (see `research-wiki/wiki/patterns/test-cheap-before-build.md`). It is NOT validation and you must never describe it as such. The point is: when the founder decides to market-test IDEA, everything he needs already exists.

This is a test of how far you can go on your own. The founder will not answer questions mid-run. Make every call yourself, write down why you made it (decisions log), and keep moving within the guardrails. You have total creative freedom above the floor defined below. Best work, not safest work.

## Guardrails (hard)

1. **No new spending.** Anything already in env files is fair game; no new accounts, no purchases, no paid APIs beyond the session itself.
2. **Publish nothing.** Everything is created locally under `.loop/goal-files/runs/<idea-slug>-run-<n>/`. No deploys, no posts, no emails, no domain purchases (checking availability is fine — record it, don't buy).
3. **Invent nothing.** Every market fact, competitor claim, price point, and statistic must be researched and verified against a live source, with the URL recorded. Unverifiable → mark ESTIMATED or drop. This is the house zero-fabrication rule; it has no exceptions.
4. **Max 3 agents running concurrently** (firm founder rule, 2026-06-10). Total agent count across the run is unlimited; simultaneous count is not. Queue, don't fan out wide.
5. **Model routing:** you (the orchestrator) run on Opus. Workers are Sonnet (execution, writing, synthesis legs) and Haiku (reading, scraping, extraction). Spawn no Fable workers. Load the deep-discipline skill for the hardest judgment phases.
6. **Never ask.** Do not report back, ask for confirmation, or offer options mid-run. The only message you send is the final one, after the definition of done is met.

## What "orchestrate" means (floor, not ceiling)

Use multi-agent workflows deliberately: parallel researchers across different sources and angles (within the concurrency cap); adversarial verification of every load-bearing claim by skeptic agents whose only job is to refute it; a completeness critic before you call any phase done; judge panels where a decision has taste in it (naming, positioning, design direction). Design whatever orchestration shapes the work calls for — these patterns are a floor, not a ceiling.

## The arc (phases — a floor, not a ceiling)

1. **Re-validate.** Before building anything: read `research-wiki/index.md`, the IDEA's ledger entry, `rejected-ideas` (graveyard), and the three gates (passion-fit, tata-gate, strategist-checklist). Then re-check the market live: have incumbents shipped since the ledger's `updatedAt`? Has the regulatory/deadline driver moved? If IDEA now fails a gate or the moat has evaporated, **stop and write a kill memo instead of a package** — that outcome fully satisfies the definition of done.
2. **Design the business.** ICP, the painful moment, offer, pricing with unit economics, channels, moat, risks. Competitor teardown from their actual live pricing pages, not memory.
3. **Build the brand.** Name (search collisions: existing businesses, .com/.com.au domains, obvious trademark conflicts — record availability, buy nothing), voice, palette, logo direction (generate candidates → critique loop → pick), brand guidelines one-pager.
4. **Build the face.** Landing page (single self-contained HTML is fine — local, never deployed): hook, proof, offer, pricing, honest FAQ, founder note. Mobile-clean at 375px. Every claim on it sourced or ESTIMATED-marked.
5. **Make the launch material.** A 30–60s launch-video script (hook → pain → demo beats → offer) plus a founder-note script written for the IndicF5 voice pipeline. Render actual video only if the run can do it with existing local tooling; scripts + storyboard are the required deliverable, rendered video is a bonus.
6. **Try to kill it.** Red team: ≥5 skeptic agents attacking market size, willingness to pay, incumbent response, distribution reality (founder has no audience in most niches — attack reachability hardest), regulatory risk, and tata-gate ethics. Rule on every attack. The red team has **kill authority**: a fatal, unfixable finding converts the run's output to a kill memo. Non-fatal findings get fixed back into the plan and page.
7. **Package.** One recap HTML linking everything: the business in 60 seconds, the package contents, the red-team verdict with fixes applied, the decisions log, and a "what a smoke test of this would look like" section (per test-cheap-before-build: kill gate, budget $0–minimal, duration, success metric).

## Definition of done (subjective, on purpose)

A stranger — someone who has never heard of IDEA or this repo — can open the recap HTML and within ten minutes: understand what the business is and who it's for, see the landing page render, read why the red team didn't kill it (or why it did), and know exactly what cheap test would prove or kill it in 14 days. Every factual claim they might check traces to a recorded source.

## Deliverables checklist

- `recap.html` (the definition-of-done artifact)
- `business-plan.md` · `market-research.md` (with source URLs)
- `brand/` (guidelines, name-collision search record, logo candidates + pick)
- `site/index.html` (self-contained landing page)
- `video/` (launch script, founder-note script, storyboard; rendered .mp4 if achieved)
- `red-team.md` (every attack, every ruling, fixes applied) — or `KILL-MEMO.md`
- `decisions.log.md` (why every major call was made)
- `smoke-test-plan.md` (the bridge to test-cheap-before-build)
