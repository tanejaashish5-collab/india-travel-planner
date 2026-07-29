---
type: pattern
sources: [data/research/LENNY-LEMKIN-CASEL-DEEP-SCRAPE-2026-07-16.md]
updated: 2026-07-16
---

# AEO: citations over rankings

**The pattern:** LLM visibility runs on citation frequency across sources (Reddit threads, YouTube explainers, tier-1 publications), not SERP rank. A page can be cited by an LLM tomorrow with zero domain-authority lag — different mechanics from organic search compounding.

## The mechanics (Ethan Smith, Graphite; ex-MasterClass/Webflow)

**AEO ≠ ranking — it's citation frequency across sources.** Claimed 6x higher conversion from LLM-referral traffic vs Google at Webflow (his claim, **UNVERIFIED**, single-speaker). Citation overlap between ChatGPT and Google is only ~35% — ranking #1 on Google does not mean being cited by an LLM, they're separate games on separate evidence. Pure AI-generated content ranks/cites *worse* — a model-collapse penalty measured across a 100K-URL study (Smith). Reproducible experiment design worth copying: 100 control vs 100 test pages, test gets 1 YouTube video + 2 authentic Reddit answers each, measure LLM-mention delta over 2 weeks — "reproducible-or-nothing."

## The tail moved to chat

Zero-search-volume long-tail questions ("trek X in monsoon with a 6-year-old?") now get asked directly inside LLMs instead of typed into Google — FAQ/community answers become the citation source for queries that never showed up in keyword tools. This favors verified, granular, per-question content over broad landing pages — see [[verification-as-moat]].

## Bot posture: indexing/answer bots vs training bots

Actionable regardless of the citation-conversion debate: **split indexing/answer-retrieval bots (OAI-SearchBot, ClaudeBot-style RAG fetchers) from training-data bots (GPTBot-training, CCBot, Bytespider) in robots.txt** — a site can be citable without donating training data. Brian Balfour's framing: "there is no opting out — unilateral blocking just concedes the channel to competitors." This sits against our own verified counterweight (2026-06-25): AI bots out-crawled Googlebot ~3:1 and drove the ~$42/mo Vercel bot-tax overage; blanket-blocking saved $18–27/mo with ~zero referral value at NakshIQ's traffic at the time. **DECIDED 2026-07-30 — NOT DOING IT. Founder call: the OAI-SearchBot unblock is declined, not deferred.** The proposal was to unblock answer/RAG fetchers while keeping training crawlers blocked and watch the Firewall counter + invoice + referral lines for 30 days. It stays declined because the only *measured* evidence we hold points the other way: AI bots out-crawled Googlebot ~3:1 and drove the ~$42/mo Vercel bot-tax overage, and blocking them saved $18–27/mo at ~zero referral value (2026-06-25, verified). Balfour's "no opting out" is a reasoned argument, not a measurement, and it does not outweigh our own invoice. Do not re-raise this as an open item in audits or briefs; re-open only if a *new measurement* appears — e.g. AI referral sessions showing up in GA4 despite the block, or the bot-tax line falling to where the experiment is close to free.

## Measurement: share-of-voice, not rank

Track ~20 flagship queries ("best hill stations June monsoon" class) monthly across ChatGPT/Claude/Gemini/Perplexity, count citation share. Buildable as a monthly agent cron, no founder identity needed — proposed, not yet built.

## Full playbook (source doc, condensed)

1. Citations over rankings — authentic Reddit answers, YouTube explainers, tier-1 travel publications; one good mention can surface in LLM answers within a day.
2. Answer the follow-up questions on-page (reach/budget/safety/season/permits per destination) — largely NakshIQ's existing structure; audit for gaps.
3. The tail moved to chat (above).
4. Measure share-of-voice (above).
5. Smith's control/test experiment design (above).
6. Model-collapse penalty on pure-AI content — NakshIQ's hand-verified-data + AI-assist pipeline is on the right side of this by construction.

Full extraction: [[src-lenny-deep-scrape]].

Related: [[src-lenny-deep-scrape]], [[verification-as-moat]], [[receipts-over-content]]
