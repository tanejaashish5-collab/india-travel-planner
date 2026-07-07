# research-wiki — Ashish's business-research brain

An LLM wiki (Karpathy pattern) over all business-idea / creator / opportunity research. Built 2026-07-07. The goal: research compounds instead of evaporating — every new "what should we build" session reasons over everything already learned.

## What lives here vs elsewhere

- **This wiki**: distilled, cross-linked knowledge — ideas, people studied, tools, recurring patterns, source summaries.
- **NOT here**: NakshIQ site ops (GA4/GSC audits → `gsc-audits/`, `ga4-audits/`), raw scrapes (→ `.scrapes/`), session memories (→ project memory), the live idea ledger (→ `.loop/biz-opportunities-ledger.json` — the wiki holds analysis pages, the ledger stays the scoring system of record).

## Structure

```
research-wiki/
  CLAUDE.md      ← this file (schema + routing rules)
  index.md       ← table of contents; ALWAYS read this first
  log.md         ← append-only ingest log
  raw/           ← drop-folder for sources not yet ingested (usually empty; most raw stays in .scrapes/)
  wiki/
    ideas/       ← business opportunities & idea-lane analysis
    people/      ← creators/operators studied (one page per person)
    tools/       ← AI tools & stacks (grouped pages, not one per tool)
    patterns/    ← recurring lessons & decision frameworks (the most valuable folder)
    sources/     ← one terse page per ingested research doc
```

Folders stay FLAT inside — no deeper nesting until a folder exceeds ~40 pages and a natural split is obvious.

## Routing rules (read in this order)

1. `index.md` — find the page you need; don't crawl the tree blind.
2. For "have we seen X before / what do we know about X" → check `patterns/` first, then `people/` and `tools/`.
3. For "is idea X worth doing" → `ideas/ledger-overview.md` + `patterns/` gates (passion-fit, tata-gate, strategist-checklist) before any new research.
4. `sources/` pages link back to the original doc in `data/research/` — go there only when the wiki page isn't enough.

## Page conventions

- Filename: kebab-case, no dates in concept pages (dates live in frontmatter + source pages).
- Frontmatter: `type` (idea|person|tool|pattern|source), `sources` (paths of origin docs), `updated` (YYYY-MM-DD).
- Cross-links: Obsidian-style `[[page-name]]` (bare name, no folder prefix — names are globally unique).
- **Zero fabrication**: every claim traces to a source doc or a dated session. Numbers keep their as-of date. If a claim is unverified, mark it (ESTIMATED / UNVERIFIED).
- Verdicts are dated snapshots, not eternal truths — a REJECTED idea page keeps its rejection reasoning so we don't re-litigate, but note the date.

## Ingest protocol (for any session adding to this wiki)

1. Read `index.md` + skim related existing pages first (link, don't duplicate).
2. Split the source into concept pages: new entities get pages; existing entities get updated sections.
3. Every new page links to ≥2 existing pages where genuinely related (no forced links).
4. Add a `sources/` page for the doc; update `index.md`; append one line to `log.md`.
5. Ingest with Sonnet/Opus — never burn Fable on ingestion (Nate Herk's own advice; matches our cost rules).

## Standing convention

Any research/scrape session that produces a findings doc in `data/research/` ends by ingesting that doc here — same muscle as writing session memory.
