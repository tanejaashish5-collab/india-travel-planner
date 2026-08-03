---
type: source
sources: [data/research/OUTSKILL-WORKSHOP-SOURCES-2026-08-02.md]
updated: 2026-08-02
---

# src — Outskill "How to Start an AI Business in 2026" (2026-08-02)

Post-workshop email to `tanejashish@hotmail.com` (2026-08-01, `hi@outskill.com`) chased to
source. **0 business opportunities — fails [[passion-fit-gate]] outright** (no India, travel,
wisdom or self-mastery angle). Third consecutive commentary source to yield none →
[[demand-sources-over-commentary-sources]]. **3 reusable instruments extracted, none
requiring purchase.**

## The funnel, and what was actually behind it

The two emailed PDFs are **deliberately truncated bait**: *"The 2026 AI Business Roadmap"*
announces *"The full system… Nine steps"* and delivers **Step One only**; *"The 7-Day
First-Dollar Sprint"* has Days 01–06 and **no Day 07**. The missing steps are the reason to
book the Calendly *"interview with an AI practitioner"* → a paid **AI Catalyst Program**.
**No price is stated anywhere.**

The real asset is the linked Drive folder — *"AI Product – Zero-to-Launch"*, 12 Google Docs
(79 KB text) + a **134-page** printable handbook, reconstructing one worked example (Orbit
CRM) from research to live waitlist. Unusually honest for a funnel: it carries an explicit
*"Important honesty boundary"* admitting one bundled tool was **not** part of the original
build.

## Access notes (load-bearing)

The Google Drive connector **cannot see third-party link-shared folders** (`search_files` and
`get_file_metadata` both return not-found). Playwright reads the folder listing, but **Google
Docs render to canvas**, so `innerText` yields only the outline. **What works:** anonymous
`curl` on `docs.google.com/document/d/<ID>/export?format=txt` and
`drive.google.com/uc?export=download&id=<ID>`. In-page `fetch()` is **CSP-blocked** on both
domains. 15 files archived to `.scrapes/web/outskill-ai-business-2026-08/`.

## The three things worth taking

**(a) The Product Hunt research schema — the one genuinely new instrument.** Per-competitor
capture: *Product · Positioning (exact headline) · Audience · Core job · Workflow · Pricing ·
Traction signal (upvotes/comments/launch date) · Praise · Complaints · Gap*, with *"do not
copy a competitor's feature list — look for repeated unmet jobs"* and the caveat that
*"Product Hunt is a discovery surface, not complete market proof."*
**Used for real in [[src-travel-trust-gate-2026-08-02]]**; the Complaints column is
demand-shaped rather than commentary-shaped and did most of the work.

**(b) The strong-vs-weak signal decision rule** — the missing kill-gate vocabulary for cheap
tests. Strong: visitors understand the promise unaided; targets **voluntarily** join; several
describe **the same painful incident**; users ask for access or offer data/integrations; one
narrow integration repeatedly matters. Weak: compliments without signup; friends liking the
design; PH upvotes without target-user conversations; feature requests from outside the
audience. Paired with *"do not ask only 'would you use this?' — **ask for past behavior and
concrete commitments**."* → feeds [[test-cheap-before-build]].

**(c) Two prompt templates** — a read-only-first framing (*"review the attached competitive
analysis completely. **Do not build or edit anything yet.**… what remains an assumption"*) and
a media-review prompt demanding objective facts and *"the smallest next iteration."* Every
build prompt in the pack ends *"Do not deploy or publish without explicit instruction"* — the
confirm-first gate, independently arrived at.

Its own honesty rules restate ours almost verbatim, which is the notable part:
> *"Separate evidence from assumptions. **'No competitor does this' requires proof.** 'I have
> not found a competitor that does this well' is more honest."*
> *"Deployment does not equal product readiness."* · *"Do not call it complete merely because
> a video file exists."*

## What to ignore

The entire build curriculum (Next.js + Tailwind + Vercel + Resend) — **already our production
stack**, stages 6–12 are below our level. Orbit CRM itself is a teaching demo. Higgsfield MCP
is marginal against the existing Veo/R2 pipeline. **On the evidence, the build layer is behind
us and the research layer duplicates rules already in CLAUDE.md — the PH schema is a
worksheet, not a course.**

Related: [[demand-sources-over-commentary-sources]], [[test-cheap-before-build]],
[[passion-fit-gate]], [[verification-as-moat]].
