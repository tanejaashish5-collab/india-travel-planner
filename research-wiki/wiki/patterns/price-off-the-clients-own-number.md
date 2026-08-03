---
type: pattern
sources: [data/research/NATE-HERK-PRICING-AI-2026-08-02.md, data/research/MONEY-PLAN-2026-07-22.md]
updated: 2026-08-02
---

# Price off the client's own number

**The rule:** before you say any number, get the client to state what the problem is costing
them **in their own words**. Your price is then a fraction of a number *they* put on the table
— not a number you invented and must defend from scratch.

Extracted 2026-08-02 from [[src-nate-herk-pricing-ai]] (his 9th study). This is the piece
[[retainer-is-the-business]] was missing: that pattern says the retainer *is* the business, but
never said how to derive any of the numbers.

**Provenance, stated honestly:** this is largely standard value-based-pricing doctrine, and
Herk credits the anti-hourly half to **Jonathan Stark** by name. Novelty low, specificity high
— the value is the AI-specific calibration, not the theory.

## The formula

**Price = 10–20% of the client's first-year annualised value.** Target being able to show a
**10× return in year one** — *"that math makes it really hard to say no to."*

His worked example: 20 leads/week × ~1 hr × $40/hr loaded = $800/wk × 52 = **$41,600/yr** →
priced at 13% = **$5,500** → ~7.5× for the client. He argued the missing 2.5× from baseline
growth, and is explicit that projections must **never be guaranteed** or tied to specific
revenue outcomes.

**Cost is your floor, their value is the ceiling, price is anything between.**
> **"Cost doesn't justify price. Price justifies cost."**
(The landscaper who charges $200 instead of $100 because he bought a nicer truck.)

## Hours saved is the beginner metric

The best example in the source saved only **45 min/day** but avoided ~**$12,000/month in
scheduling errors** — hard dollars lost to human inconsistency, not freed hours. He indicts his
own appointment-setter pricing for counting only hours saved when he could have counted what a
converted appointment was worth. **Graduate from hours-saved to bottom-line impact.**

## Getting the number when they won't share salaries

Three sizing questions — *"they measure the ceiling, not the build"*: **How long does this take
you today? How many people touch it? What happens when it goes wrong?** Then stack proxies
(locations, busiest-day volume). Self-check: **if you can't land on a number, you're not ready
to write the proposal.**

## The mechanics worth copying

- **Three tiers, never one price** — 10% / 25% / 50% of first-year value, middle designed to
  win. One number asks *"should we work with this person?"*; three numbers ask *"**how** should
  we work with this person?"*
- **Proposal opens with three paragraphs about THEM**, in their words with their numbers —
  none about you.
- **Milestones ~30 days apart, payment at each, and objectively verifiable.** ✅ *"the owner
  sends a question, the agent pulls from the database and responds within a minute"* ·
  ❌ *"working as expected"* (you will argue for weeks and not get paid).
- **Pushback → cut scope, never price.** *"That's how you avoid teaching them that your price
  has moved down every time that they frown."*
- **Scope creep is a buy signal** — "great idea, backlog it for v2," never a flat no.
- **Maintenance retainer covers keeping it working, NOT new features** — breakage, API changes,
  model releases, edge cases. New functionality is a separate conversation. (Sharpens
  [[retainer-is-the-business]], which had the shape but not the scope boundary.)
- **Tokens go on the client's card** — *"a utility bill, and utility bills go in the client's
  name."* Put an expected monthly run cost + volume assumption in the proposal. Exception worth
  keeping: **you** pay during testing, swap to their keys at production, because spending their
  money before showing a POC starts the relationship badly. Absorb eval/QA testing cost by
  bumping the quote $1–3K.
- **Ask "why me" deliberately** — *"couldn't you vibe code this? couldn't you hand it to an
  intern?"* — so the objection surfaces on the call rather than killing the deal in a proposal
  review. **We hold a first-party answer he doesn't:** Anthropic's own Project Vend agent
  fabricated a contract when unsupervised → [[verification-as-moat]].
- **Walk away** from a prospect who only wants a number to compare vendors.

## 🔴 The limit — do NOT apply the anti-hourly rule to a contract lane

Herk's "quit billing hourly" argument (hourly pays you more to be slow; getting faster cuts
your income) is **correct for productized services sold direct to SMBs** and **wrong for
labour-hire contracting**. Per [[src-money-plan-2026-07-22]], the rent-payer track is a cleared
Senior BA contract at **$130/hr ≈ $1,050/day ≈ $240–250K/yr-equivalent**, sold through brokers
against a rate card, in a market where hourly-rate contract ads are **more than half of all
local recruitment advertising and the only growing segment**. There is no client whose
annualised savings you take 10–20% of. **Apply this pattern to the services side bet only.**

Second limit: his $400/mo maintenance and $20K/mo minimum are **his** cost structure at agency
scale. Canberra has a government-subsidised substitute (ACT Digital Solutions: 5 hrs 1-on-1 AI
mentoring, $1,995 value, for **$110**) and 16 named suppliers. The definitions transfer; the
numbers must be re-derived locally.

Related: [[retainer-is-the-business]], [[nate-herk]], [[money-is-services-not-adsense]],
[[test-cheap-before-build]], [[verification-as-moat]], [[src-nate-b-jones-selling-ai]].
