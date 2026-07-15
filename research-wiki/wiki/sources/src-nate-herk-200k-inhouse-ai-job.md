---
type: source
sources: [data/research/NATE-HERK-200K-INHOUSE-AI-JOB-2026-07-15.md]
updated: 2026-07-15
---

# Nate Herk — "The $200K AI Job That Didn't Exist Last Year"

Video yt-eFOTQpbGcy8 (uploaded 2026-07-14, 10:14 min, 21.3K views/781 likes day one). Sixth Nate Herk study (after next-step-business, Claude-Code-money-gold, Karpathy-wiki, Opus-as-Fable, one-prompt-company — see [[nate-herk]]).

## Thesis: value shifts from external AI agencies to the in-house AI consultant seat

Chegg-collapse framing (stock −~50% in a day, 2023) → AI agencies boomed (~$130B market, his figure) because companies knew their problems but not the solutions → **that gap is closing from the inside**: "the exact same thing that made AI agencies a ton of money is about to replace them," as tools get accessible enough that companies pull the fix in-house instead of paying outsiders. Value shifts from BUILDING (the pharmacist — hands you what you asked for) to JUDGMENT (the doctor — figures out what you actually need): what to point AI at, what not to, adoption, change management.

## His 4-step roadmap (the actual teachable content)

1. **Audit your own job** — list weekly tasks; pick ones that eat real hours AND are low-blast-radius if AI errs (status reports, meeting notes, inbox triage, data cleanup, basic research). Not "whatever annoys you most."
2. **Automate + prove with numbers** — "2 hours/week → 10 minutes." Saved hours are the proof, stated as a stack.
3. **Make proof visible** — demo in team meetings, fix a coworker's task, write the internal workflow doc with your name on it. Language: "saved us 8 hours before the quarterly report," never "I used ChatGPT."
4. **Graduate from annoyances to constraints, then formalize** — new audit question: "if we doubled customers tomorrow, what breaks first?" Convert every win to one number ("across 5 automations I return a full-time hire per year"), propose the role and title. "You're not asking for the job — you've already built it."

## Claims — UNVERIFIED

IBM survey of 2,000 CEOs: 76% now have a chief-AI-officer seat vs 26% a year ago. AI-skilled workers paid ~56% more than same-role peers. ~$130B AI-agency market figure. All his own sourcing, not independently confirmed — treat as directional, not fact.

## Business-idea value: ZERO — 8th lead-magnet data point

Free-community lead magnet (content → free Skool community → paid layer), same shape as every prior creator study in this wiki — see [[money-is-services-not-adsense]]. The entire 4-step roadmap is handed to his full audience on camera, the same self-arbitraging shape [[public-premises-are-pre-arbitraged]] already named in Nick Saraev's system reveal: a public teaching can't be "the business," only the funnel.

## What's actually new here: independent corroboration of banked agency-squeeze evidence

The video does not cover any mechanics of deploying a system on someone else's computer — it's a career-positioning piece. But its central claim (in-house pull is compressing the external-agency market) lines up with two things already on record from completely different angles: [[nick-saraev]]'s own agency (LeftClick) graveyarded per the 2026-07-13 Justin Lob audit, and the [[delegation-fails-heuristic]] finding that Cowork-class tools eat any business built purely on "I did the delegable task for you." A creator's own admission, our own channel audit, and now a *competing* creator's independent career thesis all now agree on the direction — sharper than the general "the agency market is crowded" reason [[rejected-ideas]] used to kill generic AI-agency in 2026-06-23.

## Part 2 — the research session's own answer: how our system would get implemented for someone else

The video doesn't answer "how would Ashish's own OS actually get delivered to a client" — the research session that produced this doc built that answer directly, reasoning from what's already banked (TaskQueue, JobAgent, ScreenWatcher, the macOS-TCC gotchas). Three separable layers, only one precious:

| Layer | What it is | Portability |
|---|---|---|
| Judgment | CLAUDE.md rules, skills, eval-gate, failure-pattern map | Pure markdown — 100% portable, the actual IP |
| Runtime | Claude Code/Cowork + launchd jobs + scripts | Machine-specific — needs a computer, theirs or a cloud box |
| Access | MCP/OAuth to the client's own accounts | Always per-client, their consent, their credentials — never shared |

**4 delivery models, cheapest-proof-first:**

1. **Service bureau** (zero-install) — client forwards email to an inbox the system watches; this is literally the TaskQueue pattern already built (email → headless agent → result + phone ping). Proof-of-value in days, not weeks. See [[test-cheap-before-build]].
2. **On their machine** (Cowork) — tailored CLAUDE.md + skills + an empty memory scaffold on the client's own Claude plan and MCPs; our launchd/TCC/keychain-under-launchd gotchas ARE the install manual nobody else has. Honest limit: non-technical users break local automations, their machine must stay on, support burden is real and recurring.
3. **Hosted runtime** — n8n or a Claude Agent SDK worker on Railway/VPS, client's own OAuth + API key so their usage bills to them, never run on our own key. See [[self-hosted-agents]] — the same Hostinger-VPS pattern already scoped as the standing fix for the Chanakya autoposter's own "Mac must stay on and plugged in" constraint.
4. **Be the in-house AI person** (the video's own answer, not a delivery model for others) — maps directly onto Ashish's live job hunt: walk into the next BA contract already returning "a full-time hire per year" in automations, with receipts most candidates can't show.

## Honest downside (banked evidence, not vibes)

- Models 2–3 are recurring ops businesses (uptime, breakage, hand-holding) — price retainers accordingly or don't enter; the same on-ground/support-heavy shape [[rejected-ideas]] already flags elsewhere in the ledger.
- Generic invoices/receipts-for-random-SMBs delivery sits outside the four [[passion-fit-gate]] lanes (India wisdom · travel · self-mastery · business edu) — a delivery mechanism doesn't fix a demand/fit question.
- Where the leverage genuinely is per this evidence: Model 4 (career/rate premium with receipts) and narrow Model 1 pilots strictly inside Ashish's own lanes, if external delivery is ever tested at all.

Related: [[nate-herk]], [[money-is-services-not-adsense]], [[delegation-fails-heuristic]], [[nick-saraev]], [[rejected-ideas]], [[test-cheap-before-build]], [[self-hosted-agents]], [[public-premises-are-pre-arbitraged]].
