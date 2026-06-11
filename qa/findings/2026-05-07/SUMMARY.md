# NakshIQ daily QA — 2026-05-07

**Run:** `nakshiq-daily-test-2026-05-07` · 25 min · curl + Python HTTP probes from sandbox
**Target:** https://www.nakshiq.com/
**Findings file:** [`qa/findings/2026-05-07.json`](../2026-05-07.json) (real verification, no fabricated numbers)

---

## TL;DR

- **Site is healthy.** 20/21 core routes 2xx, 1× 301 (the `/` → `/en` redirect — expected). 0× 4xx or 5xx on core routes.
- **All four prior closures still hold.** NEW-004, NEW-006, DEEP-Phase7-A1, DEEP-Phase7-A2, DEEP-Phase2-D1 all verified live.
- **Service worker `nakshiq-v32` live.** Manifest spec-compliant (3 icons, 5 shortcuts).
- **0 new defects today.** Two info-level observations only (3-letter month abbreviations are 404 by design; cold-edge TTFB tail of ~5s on long-tail destinations — already tracked).

## Blocker — root cause + fix (resolved this session)

**Diagnosis:** Yesterday's session built `SKILL.md`, the schema, and the three generator scripts inside its own session sandbox (`local_ea47c60e/outputs/`), produced the 3 `.docx` files and `findings/2026-05-06.json` there too, then posted `computer://` links pointing at the desktop folder — but never actually persisted any of it to the workspace. When that session was garbage-collected, the entire sandbox (infrastructure + outputs) was wiped. Every prior daily run was rebuilding throwaway infra each time. `git log --all -- qa/` shows none of those files were ever committed.

**Fix shipped this session:**

| File | Status |
|---|---|
| `qa/SKILL.md` | ✓ authored — full A-K test matrix, cost-aware rules, non-negotiables, failure modes |
| `qa/findings.schema.json` | ✓ authored — JSON Schema draft-07 over the de-facto shape |
| `qa/_lib/build_report.js` | ✓ authored — shared docx builder using `docx` npm package |
| `qa/_lib/node_modules/docx` | ✓ installed locally (qa/_lib/node_modules ignored in `.gitignore`) |
| `qa/generate_developer_report.js` | ✓ thin wrapper, persona='developer' |
| `qa/generate_qa_report.js` | ✓ thin wrapper, persona='qa' |
| `qa/generate_business_report.js` | ✓ thin wrapper, persona='business' |

**Verification:** all three generators now run cleanly against `qa/findings/2026-05-07.json`:

| File | Size | XML sanity | Text runs |
|---|---|---|---|
| `NakshIQ_Developer_Report.docx` | 16,061 bytes | ✓ valid OOXML | 183 |
| `NakshIQ_QA_Report.docx` | 14,670 bytes | ✓ valid OOXML | 104 |
| `NakshIQ_Business_Report.docx` | 12,241 bytes | ✓ valid OOXML | 43 |

All three exceed the 10 KB threshold. Step 4 + step 5 of the scheduled task now pass end-to-end.

**Recommended commit:** these files are currently untracked on `cinematic-rollout-2026-05-05`. The right home is `main` (per the "Never use cinematic-rollout branch" memory rule for non-UI work). Suggested action when you're ready:

```bash
git checkout main
git checkout cinematic-rollout-2026-05-05 -- qa/SKILL.md qa/findings.schema.json qa/_lib/build_report.js qa/_lib/package.json qa/_lib/package-lock.json qa/generate_developer_report.js qa/generate_qa_report.js qa/generate_business_report.js .gitignore
git add qa/ .gitignore
git commit -m "docs(qa): persist daily-test infrastructure (SKILL.md, schema, 3 generators)"
git push
```

Once committed on `main`, tomorrow's scheduled run will find the files on the workspace folder and execute steps 1-6 cleanly.

## What was actually checked today (real probes)

| Section | Coverage | Result |
|---|---|---|
| A — Soft-404 regression | 8 routes | 7/8 match expected (the 8th — `/en/destination/shimla/jan` returning 404 — is by design, not a regression; full month names only) |
| B — Destination availability | 10 random slugs | 10/10 → HTTP 200 |
| B — Destination TTFB | 10 destinations | min 184 ms · median 1773 ms · max 5228 ms (curl from sandbox) |
| C — Hindi parity | same 10 in `/hi` | 10/10 → 200, lang="hi", Devanagari title |
| D — SEO meta | 12 URLs | 0 title-stutter · 12/12 canonical · 12/12 hreflang en/hi/x-default · 12/12 og:image |
| E — SOS phone format | 10 destinations | 120 phones, 120 valid format, 0 malformed |
| F — API smoke | 8 endpoints | 0 × 5xx · `/api/chat` and `/api/itinerary` correctly return 400 on malformed/empty/oversized (Phase7-A1/A2 closures still hold) |
| G — PWA / SW / manifest | static checks | `nakshiq-v32` SW · 3 icons (192+512+512-maskable) · 5 shortcuts |
| H — Sitemap integrity | 5 chunks | 1010 destination slug URLs · 12120 destination/<month> URLs |

## What was deferred (and why)

- **axe-core a11y** — Chrome MCP not connected for this scheduled run. Last full pass 2026-05-04 fixed 16 critical/serious; carry-forward (color-contrast on 30 sites, aria-allowed-attr on tablist) still open.
- **Lighthouse perf/SEO/BP/A11y** — last run 2026-05-05: perf 61, a11y 98, BP 100, SEO 100. No commits since 37974575 that warrant an immediate re-run.
- **Persona round-trip / form matrix / dedicated security probes** — carry-forward from 2026-05-04 deep pass, each warrants its own ~45-min session.
- **Full Playwright E2E** — sandboxed run requires a connected Chrome and BASE_URL=production, neither set up automatically in this scheduled context.

## New defects today

**None.** Two info-level observations:

1. `INFO-2026-05-07-001` — 3-letter month abbreviations (jan/feb/mar/apr) 404 on destination sub-routes. By design (sitemap only advertises full month names, slug-validator allowlists full forms). Optional: add aliases if external citations use abbreviated forms.
2. `INFO-2026-05-07-002` — Cold-edge TTFB tail of ~5s on long-tail destinations (pfutsero, chandratal). Already tracked under Phase-4-carry-perf — no new action.

## Status of prior open defects

| ID | Status today |
|---|---|
| E2E-2026-05-04-A1 — welcome tour modal English on /hi | OPEN — needs i18n sprint (not investigated today; client-side modal, requires headless browser) |
| E2E-2026-05-04-B1 — `/hi/destination/<slug>/<month>` H1+labels English | OPEN — needs i18n sprint |
| Phase-3-carry — color-contrast (30 sites) | OPEN — token sweep needed (not re-tested without axe today) |
| Phase-3-carry — aria-allowed-attr on destination tabs | OPEN — ARIA pattern conversion needed |
| Phase-4-carry — 7/10 routes <0.70 LH perf on 4G mobile | OPEN — image responsiveness/offscreen/format levers catalogued |
| Phase-8-carry — kaza/phawngpui-peak/majuli sparse stays | NOT IN TODAY'S 10-DEST RANDOM SAMPLE — worth a targeted re-probe next session |

## Deliverables on disk

- `qa/findings/2026-05-07.json` — full structured findings (12.6 KB)
- `qa/findings/2026-05-07/http-matrix.csv` — 21 core routes, status + TTFB + size
- `qa/findings/2026-05-07/section-A-soft404.csv` + `section-A-month-routes.csv`
- `qa/findings/2026-05-07/section-B-destinations.csv` — 10-dest sample
- `qa/findings/2026-05-07/section-C-hindi-parity.csv`
- `qa/findings/2026-05-07/section-D-seo.csv`
- `qa/findings/2026-05-07/section-E-sos-v2.csv`
- `qa/findings/2026-05-07/section-F-api.csv`
- `qa/findings/2026-05-07/sitemap-{0..4}.xml` — sitemap snapshots for record

## What was delivered (after the fix)

- ✓ `NakshIQ_Developer_Report.docx` (16.1 KB)
- ✓ `NakshIQ_QA_Report.docx` (14.7 KB)
- ✓ `NakshIQ_Business_Report.docx` (12.2 KB)
- ✓ Step-5 `.docx >10 KB + unzip + XML sanity` — all 3 pass
- ✓ `qa/SKILL.md`, `qa/findings.schema.json`, three `generate_*_report.js` + `qa/_lib/` — persist on disk now

This SUMMARY.md serves as the human-consumable end-of-run document for today; the structured `findings.json` is the machine-consumable counterpart.
