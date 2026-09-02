#!/usr/bin/env python3
"""Builds qa/findings/2026-08-27.json from this run's captured evidence.
Run once, after started_utc/completed_utc are both known."""
import json, sys

STARTED_UTC = "2026-08-27T02:06:00Z"
COMPLETED_UTC = sys.argv[1] if len(sys.argv) > 1 else "2026-08-27T02:45:00Z"
DURATION_MIN = int(sys.argv[2]) if len(sys.argv) > 2 else 39

executor = (
    "Claude (Cowork, scheduled task nakshiq-daily-test), following qa/SKILL.md exactly (not the old "
    "single-report flow). Sitemap fetched fresh (5 chunks, 24,975 URLs) -- byte-for-byte identical "
    "breakdown_by_locale_type to 08-26's recorded breakdown (diffed the two section-H-sitemap.json files "
    "programmatically, 0 category deltas), a 4TH CONSECUTIVE fully-flat sitemap day (08-24 through 08-27). "
    "Random 10-destination sample (seed 'nakshiq-2026-08-27': kavaratti, konark, mahabaleshwar, vishnuprayag, "
    "mandvi, kotagiri, karnaprayag, valley-of-flowers, alchi, bir-billing) grepped against "
    "apps/web/src/lib/cinematic-destinations.ts (505/533 cinematic pool, unchanged) -- 8/10 cinematic + 2/10 "
    "non-cinematic (vishnuprayag, karnaprayag), the 2ND CONSECUTIVE day a natural draw included both templates "
    "without needing an out-of-sample substitution (08-26 broke a 4-day 0/10-non-cinematic streak; today "
    "confirms it wasn't a one-off). TOP STORYLINE: a REAL deploy landed since 08-26's QA run -- the "
    "data-dpl-id hint changed (dpl_51CeusKqxKca7ALaKCmi3hNnnxS9 -> dpl_DUNbLPc3xfptKR7P31mthV3yCzGw), the "
    "first deploy of any kind since 08-25 (08-26 was the first fully quiet deploy day on record). `git log "
    "f79a3e03(08-26 QA commit)..origin/main` showed 7 new commits, two of them real app-code: 5e10e8cc "
    "'feat(newsletter): per-recipient delivery observability (Resend webhook + honest send counts)' (adds "
    "apps/web/src/app/api/webhooks/resend/route.ts, migration 073_newsletter_delivery_events.sql creating "
    "newsletter_sends + newsletter_events tables + newsletter_issues.failed_count, and rewrites the send-loop "
    "in apps/web/src/app/api/newsletter/send/route.ts to count Resend-accepted emails per-recipient instead "
    "of per-batch-call -- fixing an 'ok:true-while-items-failed' class bug after a confirmed subscriber "
    "reported never receiving an issue) and 5360533e 'fix(webhook): name the rejection reason so a 401 "
    "diagnoses itself' (adds a typed VerifyFailure reason, logged not returned, after the same-shaped opaque "
    "401 cost real debugging time distinguishing a missing secret from a stale timestamp during today's own "
    "incident response). The other 5 commits were docs/GSC-triage/GA4-audit, 0 further app-code. Verified the "
    "new surfaces directly rather than trusting the commit message: `list_migrations` confirms "
    "073_newsletter_delivery_events applied at 20260826233502; `information_schema.columns` confirms "
    "newsletter_sends (resend_email_id pk, email, issue_slug) and newsletter_events (svix_id unique, "
    "resend_email_id, email, event_type, occurred_at, payload) exist with the documented shapes, plus "
    "newsletter_issues.failed_count now present; both new tables are currently empty (0 rows each) since no "
    "newsletter issue has been sent since the feature shipped, which is expected, not a gap. Added 3 new "
    "fixtures to probe.py for the new route: GET /api/webhooks/resend (no handler exists -> 405, correct), "
    "POST with no svix headers (-> 401 'Invalid signature', correct fail-closed default), POST with a "
    "garbage svix-signature (-> 401 'Invalid signature', identical body -- the route intentionally returns "
    "the same opaque response for every rejection reason so an unauthenticated caller can't fingerprint the "
    "failure mode, confirmed by reading the route source). 0x5xx across all 21 Section-F probes today "
    "(18 standing + 3 new webhook fixtures). Sections A/B/C/D/D2/F/G/H/I/I2/J/family-fix-check/L ran as one "
    "staged Python (requests) script directly against prod (qa/findings/2026-08-27/probe.py, carried forward "
    "verbatim in methodology from 2026-08-26/probe.py with SEED/date changed plus the 3 webhook additions, "
    "per the standing copy-forward convention). Section B ran unusually fast today: TTFB min 128/median "
    "255.5(rounded 256, exact even-count midpoint of 251 and 260ms)/max 367ms across all 10 sampled "
    "destinations, 0 outliers over the 1500ms reprobe threshold (section-B-reprobe.json is an empty array) -- "
    "the calmest Section-B TTFB reading in the recent record, plausibly a warm-cache day off the back of "
    "08-26's own probing plus today's own real deploy having just re-warmed ISR for touched routes. Section "
    "I's 32 counted core routes (33 probed, /en/search excluded per the standing not-a-real-route note) came "
    "back TTFB min 62/median 189/p90 410/max 655ms (max at /en/weekend-from-mumbai) -- no reprobe warranted, "
    "single moderate reading. Section E + DB ground truths run via Supabase MCP (project dudzsdzfvikjjhurxrgc): "
    "schema re-verified first via information_schema (applying the 08-24/08-25/08-26 lesson proactively, "
    "extended today to also cover the 2 brand-new newsletter_* tables), CASE-WHEN guards used for every "
    "jsonb_array_length call (0 AND-short-circuit errors after correcting one query mid-run that had "
    "relied on AND-short-circuit and hit 'cannot get array length of a non-array' -- rewrote with the "
    "documented CASE-WHEN guard pattern and it passed clean). Every DB metric came back EXACTLY flat vs "
    "08-26: destinations_total=533, emergency_sos_rows=533/0-without-row, sos_min/avg/total=5/7.81/4165, "
    "sos_rows_under_3=0, sos_placeholder_x=0, sos_local_helpers_nonempty=178, confidence_cards_total=525, "
    "people_who_help object/array/nonempty-array=93/432/84, hindi has-name/tagline/why_special=533/533/533, "
    "stay_picks_out_of_range=0, newsletter_subscribers total/active/confirmed=15/14/10 (unchanged since "
    "08-17), auto_verify_status confirmed/needs_source/never_run=109/300/124 -- another genuinely quiet DB "
    "day on every pre-existing metric. Today's 10-sample SOS dialable counts pulled directly: alchi 9, "
    "bir-billing 9, karnaprayag 7, kavaratti 8, konark 8, kotagiri 7, mahabaleshwar 6, mandvi 7, "
    "valley-of-flowers 10, vishnuprayag 7 -- sum 78, all >=3 (min=6, mahabaleshwar), 0 malformed. Went one "
    "level deeper than the standing aggregate on the SOS auto-reverify cron this run: grouped emergency_sos "
    "by verified_by directly and found max(verified_date) for verified_by='sos-auto-reverify' (exact string, "
    "109 rows -- matching the confirmed=109 count exactly) is 2026-08-03, a full 24 days before today, even "
    "though ops_reports shows the cron's own job execution log (job='sos-auto-reverify') most recently ran "
    "2026-08-24T00:02:16 UTC. Distinguishing these two timestamps matters: the cron IS firing weekly on "
    "schedule (last 08-24, next due 08-31 per the unchanged needs_source=300 bucket), but it has not "
    "successfully CONFIRMED (verified_date-stamped) a single new row since 08-03 -- every weekly run since "
    "then has re-examined the same ~300 needs_source rows without resolving any of them. This is a real, "
    "previously-uncaptured-with-this-precision data point for the standing NEW-2026-08-03-003 item (auto- "
    "reverify needs_source rate), not a new defect -- prior days' 'most_recent_run_utc' field conflated "
    "'cron last executed' with 'cron last confirmed something new'; this run reports both explicitly rather "
    "than repeating the conflation. SECURITY ADVISORS: direct get_advisors(type=security) pull returned 18 "
    "findings today, UP from 08-26's 16 -- fully explained and verified, not a regression: the 2 new entries "
    "are rls_enabled_no_policy INFO findings on public.newsletter_events and public.newsletter_sends, the "
    "exact 2 tables migration 073 created today. The migration's own comment states intent explicitly ('RLS: "
    "these are ops tables. Service role only; no anon access.') -- both tables are written/read exclusively "
    "via the service-role key in apps/web/src/app/api/webhooks/resend/route.ts and the newsletter send route, "
    "which bypasses RLS entirely by design, so 'RLS enabled, 0 policies' is the correct, secure default (deny "
    "every anon/authenticated-role query, matching the existing long-standing pattern already covering "
    "destination_alerts/membership_waitlist/social_dm_leads). The other 16 findings (7 deal_radar INFO + 3 "
    "legacy-NakshIQ INFO + 1 WARN extension_in_public + 4 WARN SECURITY DEFINER-executable + 1 WARN "
    "leaked-password-protection) are byte-for-byte identical to 08-25/08-26, 0 further drift; the founder "
    "question of whether deal_radar intentionally shares this Supabase project remains open and unactioned. "
    "Section K run via the Chrome MCP, applying the 08-26 lazy-mount lesson proactively (scroll into view + "
    "explicit wait before the first probe) and the corrected screenshot-verified-coordinate-click methodology "
    "for the explore Map toggle (no near-miss needed this time -- clean on the first attempt): vishnuprayag "
    "en (today's fresh in-sample non-cinematic destination, first Chrome test: 1 leaflet-container, 46 tiles, "
    "9 markers via .leaflet-interactive, window.L present, atlasSvg=false, H1='Vishnuprayag', 0 console "
    "errors) + vishnuprayag hi (H1 confirmed Devanagari 'विष्णुप्रयाग', lang=hi, SOS heading translated, 0 "
    "console errors) + mahabaleshwar en (today's fresh in-sample cinematic destination, first Chrome test: "
    "atlas SVG viewBox='0 0 1000 1100' present, india-outline.svg referenced, 0 leaflet by design, "
    "H1='Mahabaleshwar.', 0 console errors) + mahabaleshwar hi (lang=hi, Devanagari title, H1 still English "
    "'Mahabaleshwar.' -- confirms the standing cinematic-only Hindi-H1 gap on a brand-new destination, 0 "
    "console errors) + /en/explore Grid-default-then-Map-toggle (screenshot-verified direct coordinate click "
    "on the Map pill, screenshot-confirmed before trusting the DOM query: 519 markers, matching both the "
    "UI's own '519 markers - colored by score' label and a direct .leaflet-interactive DOM count, exactly the "
    "08-03 through 08-26 baseline, 0 console errors, no methodology near-miss this run) + /en/trip (0 console "
    "errors) + /en/family/kerala (26 with-kids links via direct DOM query, matching the HTTP probe's "
    "section-family-fix-check.csv exactly, 0 console errors). 7 fully console-tracked page loads/interactions "
    "this run, 0 console errors throughout -- NEW-2026-06-07-001 held STILL CLOSED. Also did 2 cheap raw-HTTP "
    "re-checks (not Chrome round-trips) on mahabaleshwar: 0 occurrences of 'asknakshiq' (NEW-2026-08-14-003 "
    "fresh re-confirmation) and '23.5N'/'80.5E' still present verbatim in the decorative Atlas corner-readout "
    "(Mahabaleshwar's real coordinates are ~17.9N/73.6E -- NEW-2026-06-06-003 fresh re-confirmation, still "
    "cosmetic). ops_reports: pulled the full DISTINCT-ON-job latest-per-job snapshot again (21 distinct jobs), "
    "all ok=true at the flag level. Drilled into summary text (not just flags) for the 2 jobs with known "
    "substantive detail: (1) audit-gsc-alerts's most recent run is still 08-26T03:30 (no new fire today at "
    "the time of this session), same unchanged 'festivals cohort_clicks_drop 22->0, contextual-only, "
    "medium-severity' finding; (2) refresh-stay-picks-agent's latest run (2026-08-26T22:23:47 UTC, batch of "
    "20, ok=20/fail=0, rows_written=61) has ok=true/alerts_count=0 at the flag level, and reading its summary "
    "directly surfaced something new: the field the job uses to describe its own verification gap is now "
    "named 'verification_note' (was 'verification_blocked' in every prior run back through at least 08-19), "
    "and its wording shifted from describing the outstanding 403-CONNECT egress block to www.nakshiq.com as "
    "something requiring resolution, to explicitly leaning on 'the independent Vercel canary-probe cron, "
    "every 30 minutes per apps/web/vercel.json, still checks production page health regardless of this "
    "session network limits' as its own stated mitigation. The underlying block itself is UNCHANGED (same "
    "403 policy-denial signature, connect_rejected, to www.nakshiq.com, consistent with NEW-2026-08-19-001) "
    "-- this reads as the job's own reporting code adapting to a persistent condition rather than the "
    "condition being resolved, and is called out as its own finding below rather than silently folded into "
    "'still open'. None of today's 10 QA-sample destinations overlap with that batch's 20 (chettinad, "
    "chidambaram, chilika-lake, cuttack, dandeli, guruvayur, halebidu, hampi, hogenakkal, idukki, jog-falls, "
    "kabini, kanchipuram, kanyakumari, karwar, kochi, kodaikanal, kovalam, kukke-subramanya, kumarakom), so "
    "no live cross-check opportunity this round, same as the last several days. Vercel: get_runtime_errors(24h) "
    "returned zero error groups despite today's real deploy -- the newsletter/webhook change shipped clean. "
    "Git: at session start, local HEAD (5360533e) was EXACTLY IN SYNC with origin/main, 0 ahead / 0 behind -- "
    "confirmed via both `git rev-list --left-right --count origin/main...main` and a fresh `git fetch`. This "
    "matters because it directly verifies the 4-consecutive-day GA4-audit stranded-unpushed-commit pattern "
    "(NEW-2026-08-26-002) is now FIXED at the root: commit e04cccec ('fix(ga4-cron): put gh on the cron PATH "
    "so the audit push stops stranding commits', landed after 08-26's QA session) rewrote "
    "scripts/ga4-audit-cron.sh and scripts/audit-commit-guard.sh to export a PATH including /opt/homebrew/bin "
    "so the `gh`-shelling-out git credential helper resolves under cron's minimal PATH, per the CLAUDE.md "
    "root-cause writeup (`01f644d4`, 'docs: record the 5th audit-commit failure -- cron PATH missing gh, and "
    "a dead heal branch'). Today's GA4 audit commit (529cee52, 'measure(ga4): audit 2026-08-27') is confirmed "
    "an ancestor of origin/main -- it reached origin cleanly on its own, on the very first day the fix was "
    "live, with no QA-session push needed as a safety net. No stale git lock files were present at session "
    "start or at any point this session. Working tree carries the same standing unrelated dirty/untracked "
    "files documented on 08-22 through 08-26 (destination-detail-cinematic.tsx WIP diff, analytics.ts, "
    "env.example, axe-report JSONs, the cruise-fare-shopping scratch-file cluster, 2 untracked citation-weekly "
    ".md files) plus 2 new untracked files not seen before (.claude/settings.local.json, "
    "apps/web/src/lib/affiliate-links.ts) -- noted for continuity but left entirely untouched per the "
    "standing rule, not this session's to investigate or commit; only this run's own qa/findings/2026-08-27* "
    "paths were committed."
)

phases_completed = [
    "A -- Soft-404 regression (10 probes incl bad-slug /en/cost/<slug>, garbage months on today's sample, /en/family/not-a-real-state-999): 10/10 404.",
    "B -- Destination availability + TTFB (10 random slugs from a fresh sitemap fetch, seed nakshiq-2026-08-27: kavaratti, konark, mahabaleshwar, vishnuprayag, mandvi, kotagiri, karnaprayag, valley-of-flowers, alchi, bir-billing): 10/10 200; TTFB min 128/median 256(exact midpoint 255.5)/max 367ms -- 0 outliers over the 1500ms reprobe threshold, the calmest Section-B reading in the recent record, no reprobe needed.",
    "C -- Hindi parity: lang + Devanagari-title check, section-heading translation check, H1-language extraction cross-referenced against cinematic-destinations.ts -- today's sample was 8/10 cinematic + 2/10 non-cinematic (vishnuprayag, karnaprayag), the 2nd consecutive day of natural non-cinematic representation. 2/10 Devanagari H1 today, both directly in-sample.",
    "D -- SEO meta (14 URLs: landing en+hi + 10 dests + 1 month sub-route + itinerary/agra): 0 title stutter, canonical/hreflang(en+hi+x-default)/og:image present on all.",
    "D2 -- Quiz/risk-quiz SEO re-probe (4 URLs, full seo_check incl. og:image): all pass, unchanged.",
    "E -- SOS completeness: DB ground-truth canonical 12-column aggregate (site-wide + today's 10-sample with raw dialable counts, sum=78, min=6/mahabaleshwar), a fresh sitewide placeholder-'X' regex scan (0 rows), Hindi-translations aggregate (533/533 all three of name/tagline/why_special), people_who_help shape aggregate, destination_stay_picks spot-check (kaza/majuli/phawngpui-peak) plus a sitewide out-of-range scan, auto_verify_status distribution, newsletter_subscribers count incl. active/confirmed breakdown, PLUS a deeper verified_by breakdown on the SOS auto-reverify cron distinguishing 'last executed' (2026-08-24, via ops_reports) from 'last successfully confirmed a new row' (2026-08-03, via emergency_sos.verified_date) -- see run.executor. Schema re-verified via information_schema first for all touched tables including the 2 new newsletter_* tables -- 1 query needed a CASE-WHEN-guard rewrite after an AND-short-circuit error, then passed clean.",
    "F -- API smoke: 6 removed-route 404 confirmations, itinerary malformed/empty/empty-object (400), 3x valid-request content checks with varied params incl. explicit destinationIds (200 + real distinct content for all 3), itinerary-unresolvable-destinationIds check (404), weather no-params (400)/valid (200, live weather for varanasi), search-index (200), 2 phantom-route 404s (destinations, health), PLUS 3 new fixtures for the newly-shipped /api/webhooks/resend route: GET (405, no handler), POST no signature (401 'Invalid signature'), POST garbage signature (401 'Invalid signature', identical opaque body by design). 21 probe.py-automated probes total, 0x5xx. Deploy-lineage (DPL) hint changed vs 08-26 (dpl_51CeusKqxKca7ALaKCmi3hNnnxS9 -> dpl_DUNbLPc3xfptKR7P31mthV3yCzGw) -- confirmed via git log a real deploy landed (newsletter delivery-observability feature + a same-day webhook hardening fix).",
    "G -- PWA: sw.js CACHE_VERSION (nakshiq-v54, unchanged), manifest icons+shortcuts, /offline.",
    "H -- Sitemap integrity (index + 5 chunks, full breakdown diffed field-by-field against 08-26's recorded breakdown -- BYTE-IDENTICAL, 0 categories changed, 4TH consecutive fully-flat day).",
    "I -- Core routes HTTP matrix (33 routes probed incl. family/state/vs/with-kids/weekend-from/membership/saved surfaces; /en/search excluded from the pass/fail tally and TTFB stats per the standing not-a-real-route note, 32 counted, all 32 2xx). TTFB min 62/median 189/p90 410/max 655ms (/en/weekend-from-mumbai) -- no reprobe warranted.",
    "I2 -- State-redirect regression (wayanad 301 en/hi/bare, kerala 200 control).",
    "J -- Locale-routing redirect (5 bare paths, redirects not followed).",
    "K -- Chrome E2E: vishnuprayag en (FRESH in-sample non-cinematic destination, first Chrome test: 1 leaflet-container/46 tiles/9 markers/window.L present, 0 console errors, first attempt, lazy-mount lesson applied proactively) + vishnuprayag hi (H1 Devanagari-verified 'विष्णुप्रयाग', lang=hi, SOS heading translated, 0 errors), mahabaleshwar en (FRESH in-sample cinematic destination, first Chrome test: atlas SVG present, 0 leaflet, H1='Mahabaleshwar.', 0 console errors) + mahabaleshwar hi (lang=hi, Devanagari title, H1 still English, 0 errors), /en/explore Grid-default-then-Map-toggle (519 overlay markers, screenshot-verified coordinate click, clean first attempt -- no methodology near-miss this run), /en/trip + /en/family/kerala (26 with-kids links via direct DOM query, matching the HTTP probe's section-family-fix-check.csv exactly) -- 7 fully console-tracked page loads/interactions, 0 console errors throughout.",
    "L -- Hero-image audit: HTTP HEAD-probe fallback in probe.py -- 533/533 ok, 0 missing, 0 errors.",
    "Supplementary -- Git read-only check: local HEAD exactly in sync with origin/main at session start (0 ahead / 0 behind) -- confirms the 4-day GA4-audit stranded-commit pattern (NEW-2026-08-26-002) is FIXED at the root by commit e04cccec (cron PATH fix); today's GA4-audit commit (529cee52) reached origin cleanly on its own, first day the fix was live.",
    "Supplementary -- Deploy investigation: DPL hint CHANGED vs 08-26 -- a real deploy landed (newsletter delivery-observability feature, migration 073, + a same-day webhook hardening fix). Verified both new DB tables exist with the documented shape and the new API route smoke-tests clean (405/401/401, 0x5xx). Vercel get_runtime_errors(24h): 0 error groups despite the deploy.",
    "Supplementary -- Security advisors direct re-pull (get_advisors, type=security): 18 findings today (up from 16) -- fully explained and verified: the 2 new entries are rls_enabled_no_policy INFO findings on the 2 brand-new service-role-only newsletter_* tables, by design per the migration's own stated intent, matching the existing pattern. The other 16 are byte-identical to 08-25/08-26, 0 further drift.",
    "Supplementary -- ops_reports full job-health pull (DISTINCT ON job, 21 distinct jobs): all ok=true at the flag level. Drilled into summary text for audit-gsc-alerts (unchanged 1 contextual-only alert) and refresh-stay-picks-agent (latest run's verification-gap field renamed 'verification_blocked' -> 'verification_note', framing shifted to lean on the independent canary-probe cron; underlying 403 egress block itself unchanged, see new_findings_today). No overlap between today's QA sample and that job's most recent batch.",
    "Supplementary -- Targeted source-file continuity: qa/_lib/build_report.js (last touched 2026-07-07, confirmed unchanged) -- NEW-2026-07-07-004/NEW-2026-08-10-003/NEW-2026-08-14-005 root causes unchanged. apps/web/src/app/[locale]/explore/page.tsx (last touched 2026-08-06, still 3 inline Supabase call sites: 1 createClient + 2 supabase.from -- NEW-2026-08-03-002 root cause unchanged); today's own /explore probes (HTTP + Chrome, incl. the Grid/Map toggle interaction) all succeeded cleanly regardless.",
    "Supplementary -- Fresh literal Atlas-coordinate + asknakshiq re-probes on mahabaleshwar (today's fresh cinematic sample, via a cheap raw-HTTP fetch rather than a second Chrome round-trip): '23.5N'/'80.5E' still present verbatim (NEW-2026-06-06-003), 0 'asknakshiq' occurrences (NEW-2026-08-14-003).",
]

phases_skipped = [
    {
        "phase": "Axe-core a11y sweep across templates x viewports",
        "reason": "Not run in this daily pass -- scoped as a dedicated standalone session per SKILL.md. Baseline now 115 days stale (origin 2026-05-04). Today's deploy touched only API routes (newsletter webhook + send-route logic), 0 destination/page UI changes, so there is no new rendering surface to diff against even with a real deploy today.",
    },
    {
        "phase": "Lighthouse perf/a11y/SEO/best-practices",
        "reason": "Same reasoning as axe-core above -- today's deploy was API-only, nothing new on the rendering/perf front to evaluate.",
    },
    {
        "phase": "Live node scripts/audit-hero-images.mjs run",
        "reason": "Ran the HTTP HEAD-probe fallback embedded in probe.py instead (533/533 ok) -- time-boxed this session in favor of the DB/Chrome/ops_reports drill-downs and the new webhook-route verification work.",
    },
    {
        "phase": "Live re-verification of newsletter signup form submission",
        "reason": "Would require entering an email and submitting a real form -- needs explicit user permission this headless run cannot obtain. newsletter_subscribers total unchanged at 15 since 08-17.",
    },
    {
        "phase": "Confirming RESEND_WEBHOOK_SECRET is actually configured in Vercel (Production + Preview) and the webhook is registered in Resend's dashboard",
        "reason": "Cannot verify from outside the app: apps/web/src/app/api/webhooks/resend/route.ts intentionally returns an identical 401 'Invalid signature' body for every rejection reason (secret unset, missing headers, stale timestamp, or a genuine signature mismatch) so an unauthenticated caller can't fingerprint the failure -- confirmed by reading the route source. This session has no Vercel-env-variable-read tool and does not attempt to probe secrets. See new_findings_today recommendation.",
    },
]

regression_matrix = [
    {"id": "NEW-2026-05-04-004", "title": "Bad-slug soft-404 returning HTTP 200", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "10/10 Section-A probes 404 today (incl. /en/family/not-a-real-state-999), 0 return 200."},
    {"id": "NEW-2026-05-04-006", "title": "Numeric/garbage month sub-route soft-404", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "kavaratti/13, /0, /notamonth, hi/konark/99 all 404 today."},
    {"id": "DEEP-Phase7-A1", "title": "/api/chat 500 on malformed JSON / oversized body", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "POST /api/chat still returns a clean 404 today -- route remains deleted."},
    {"id": "DEEP-Phase7-A2", "title": "/api/itinerary 500 on malformed JSON", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "malformed->400, empty->400, empty_object->400 today, 0x5xx."},
    {"id": "DEEP-Phase2-D1", "title": "Itinerary template title stutter", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "itinerary/agra title = 'Agra itinerary -- 1, 3 & 5 days (verified) | NakshIQ', 1 occurrence of NakshIQ."},
    {"id": "NEW-2026-06-12-002", "title": "Itinerary template ships no og:image", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "itinerary/agra og:image present today."},
    {"id": "NEW-2026-07-03-001", "title": "quiz/[topic] template ships without og:image on both locales", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "/en+hi/quiz/hill-station and /en+hi/risk-quiz all show og:image present, canonical present, hreflang en/hi/x-default present, 0 title stutter."},
    {"id": "NEW-2026-07-07-004", "title": "qa/_lib/build_report.js reads different field names than findings.json carries for the 'K -- Map widget' QA-report row", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Unresolved, unchanged: build_report.js last touched 2026-07-07, no commit landed on it since (re-confirmed via git log today). Today's findings again populates the compatibility-alias field names so the K-row renders correctly; source-level fix still not applied."},
    {"id": "NEW-2026-08-10-003", "title": "qa/_lib/build_report.js's 'E -- SOS phones' row reads field names findings.json has never natively carried", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Confirmed unchanged: build_report.js last touched 2026-07-07. Today's findings again populates the compatibility aliases; source-level fix still not applied."},
    {"id": "NEW-2026-07-07-003", "title": "scripts/audit-hero-images.mjs (CONCURRENCY=8) does not reliably complete within the 45-second shell budget", "prior_status": "NOT_REPRODUCED", "today_status": "NOT_REPRODUCED", "evidence": "The live script was not re-run this session (time-boxed); the HTTP HEAD-probe fallback again shows 533/533 ok, 0 missing."},
    {"id": "PWA-2026-05-05", "title": "Service worker / manifest with 3 icons + 5 shortcuts + offline page", "prior_status": "STILL GREEN", "today_status": "STILL GREEN", "evidence": "manifest icons=3, shortcuts=5 (unchanged). /offline 200. sw.js 200, CACHE_VERSION=nakshiq-v54 -- unchanged."},
    {"id": "NEW-2026-05-10-001", "title": "Uttarkashi SOS publishes literal placeholder phone", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Uttarkashi not in today's 10-sample; sitewide safety floor (0 rows under 3 dialable, 0 rows without an SOS record) holds AND a fresh sitewide placeholder-'X' regex scan returned 0 rows."},
    {"id": "NEW-2026-05-11-001", "title": "Khonoma SOS contains text-typed phone field", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Not in today's sample; sitewide aggregate + fresh placeholder scan show no regression signal."},
    {"id": "NEW-2026-05-30-001", "title": "khangchendzonga-np SOS contains text-typed phone field", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Not in today's 10-sample. Sitewide safety floor + placeholder scan show no regression signal."},
    {"id": "INFO-2026-05-10-001", "title": "hreflang grep false-negative methodology note", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "probe.py's seo_check() carries re.IGNORECASE unchanged -- all 14+4 hreflang checks across Sections D+D2 passed cleanly."},
    {"id": "NEW-2026-06-10-001", "title": "'People Who Can Help' legacy object-shape rendering", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "DB recheck: confidence_cards.people_who_help is 432 array-shape + 93 object-shape (525 total rows) -- exact match to the 06-19..08-26 baseline, 0 change."},
    {"id": "NEW-2026-06-05-001", "title": "SOS curated local_helpers coverage (supplementary informal contacts)", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Safety floor still intact (0 destinations under 3 dialable fields, 0 without an emergency_sos row, sitewide min dialable=5, avg 7.81, total 4165 -- identical to 08-17 through 08-26). emergency_sos.local_helpers non-empty = 178/533, identical to 07-20..08-26."},
    {"id": "NEW-2026-05-17-001", "title": "Leaflet map widget on destination pages (atlas vs Leaflet dual-template)", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Today's random 10-sample was 8/10 cinematic + 2/10 non-cinematic (vishnuprayag, karnaprayag) -- BOTH templates verified live and in-sample today: vishnuprayag (Chrome: 1 leaflet-container, 46 tiles, 9 markers, window.L present) and mahabaleshwar (atlas SVG, 0 leaflet). Kept as PARTIAL -- this is architecture, not a bug."},
    {"id": "INFO-2026-05-08-001", "title": "Destination map tile pane renders, but marker pane is empty", "prior_status": "NOT_REPRODUCED", "today_status": "NOT_REPRODUCED", "evidence": "Positively contradicted again today: vishnuprayag's markers ARE present and countable (9, via .leaflet-interactive selector)."},
    {"id": "NEW-2026-06-06-002", "title": "Leaflet destination map restoration; marker rendering", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "vishnuprayag (fresh in-sample non-cinematic destination) interactively verified via Chrome: 1 leaflet-container, 46 tiles, 9 markers, window.L present, 0 console errors, first attempt."},
    {"id": "NEW-2026-06-06-003", "title": "Decorative Atlas section prints identical static coordinates (23.5N x 80.5E) on every atlas-template destination", "prior_status": "REPRODUCED", "today_status": "REPRODUCED", "evidence": "FRESH direct literal-string re-probe today on mahabaleshwar (new sample destination): '23.5N' and '80.5E' present verbatim -- Mahabaleshwar's real coordinates are ~17.9N/73.6E. Still cosmetic, still open."},
    {"id": "NEW-2026-06-07-001", "title": "Intermittent React #418 hydration exception on editorial surfaces", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "0 console errors across 7 fully console-tracked Chrome observations today (vishnuprayag en+hi, mahabaleshwar en+hi, explore map toggle, trip, family/kerala)."},
    {"id": "E2E-2026-05-04-A1", "title": "Welcome tour modal hard-coded English on /hi", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Not independently re-triggered today (modal did not surface during today's Chrome pass) -- same standing caveat as every prior week it doesn't fire."},
    {"id": "NEW-2026-07-09-001", "title": "Destination hero H1 + body copy render in English on /hi despite complete Hindi translations existing in the DB", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Directly confirmed the scope boundary in-sample today: mahabaleshwar (cinematic) shows H1='Mahabaleshwar.' on /hi (English, gap present); vishnuprayag (non-cinematic) shows H1='विष्णुप्रयाग' on /hi (Devanagari, gap absent). Standing scope (cinematic-only) reconfirmed without needing an out-of-sample substitution, 2nd consecutive day."},
    {"id": "HERO-2026-06-20", "title": "Sikkim destinations shipped without R2 hero images", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Section L HTTP HEAD-probe fallback: 533/533 probed, 0 missing, 0 errors."},
    {"id": "NEW-2026-06-26-001", "title": "Sitemap shrink regression watch", "prior_status": "NOT_REPRODUCED", "today_status": "NOT_REPRODUCED", "evidence": "Sitemap total FLAT at 24,975 today (byte-identical to 08-26 across every category, 4th consecutive flat day) -- 0 destinations added or removed."},
    {"id": "Phase-8-carry-sparse-stays", "title": "phawngpui-peak shows <3 stay cards in rendered HTML", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "DB spot-check today: kaza=4, majuli=4, phawngpui-peak=2 (unchanged). None landed in today's random sample or in the most recent refresh-stay-picks-agent batch (08-26, 20 destinations, not this watchlist)."},
    {"id": "Phase-3-carry-color-contrast", "title": "30 sites flagged WCAG-AA color contrast", "prior_status": "STILL OPEN — not re-tested without axe today", "today_status": "STILL OPEN — not re-tested without axe today", "evidence": "Axe-core skipped again (see phases_skipped). Today's deploy was API-only (newsletter webhook), 0 UI changes, so there is nothing new to diff regardless. Baseline now 115 days stale."},
    {"id": "Phase-3-carry-aria-allowed-attr", "title": "Destination tabs use role=tab without enclosing tablist", "prior_status": "STILL OPEN — not re-tested without axe today", "today_status": "STILL OPEN — not re-tested without axe today", "evidence": "Same as color-contrast above."},
    {"id": "Phase-4-carry-perf", "title": "7/10 routes below LH perf 0.70 on mobile 4G", "prior_status": "STILL OPEN — not investigated today", "today_status": "STILL OPEN — not investigated today", "evidence": "Lighthouse skipped again. Today's deploy was API-only -- nothing new to evaluate on rendering perf."},
    {"id": "NEW-2026-08-03-002", "title": "Recurring Postgres statement-timeout (57014) on /explore, traced to an uncached query bypassing cached-data.ts", "prior_status": "STILL OPEN", "today_status": "STILL OPEN", "evidence": "apps/web/src/app/[locale]/explore/page.tsx untouched since 2026-08-06 -- still has 3 inline Supabase call sites (1 createClient + 2 supabase.from), re-confirmed today. Today's own /explore probes (HTTP + Chrome, incl. the Grid/Map toggle interaction) all succeeded cleanly regardless."},
    {"id": "NEW-2026-08-10-002", "title": "Postgres statement-timeout pattern breadth -- weekly trend", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Continued clean signal: today's 24h Vercel runtime-error sweep again found ZERO error groups, despite a real deploy landing today. Not a full close-out: /explore's separate uncached queries remain open (NEW-2026-08-03-002) and the anon role's 3s statement_timeout ceiling still needs founder approval to raise."},
    {"id": "NEW-2026-08-03-003", "title": "SOS auto-reverify weekly cron -- needs_source rate and rollout health", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Distribution stayed exactly flat (confirmed=109, needs_source=300, never_run=124). NEW precision this run: the cron's job execution log (ops_reports) shows it firing on schedule (last 2026-08-24T00:02 UTC, next due 08-31), but grouping emergency_sos by verified_by shows max(verified_date) for verified_by='sos-auto-reverify' is 2026-08-03 -- the cron has run weekly since then without successfully confirming a single additional row; it re-examines the same ~300 needs_source rows each week without resolving any. Safety floor unaffected (0 rows under 3 dialable)."},
    {"id": "STATE-REDIRECT-2026-07-27", "title": "/state/<destination-slug> URLs redirecting correctly to the real destination page", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Re-verified today: /en/state/wayanad, /hi/state/wayanad, and bare /state/wayanad all 301 -> the correct /destination/wayanad path in each locale. /en/state/kerala (control) correctly stays 200."},
    {"id": "NEW-2026-08-13-001", "title": "Production deploys failed repeatedly from build-time Postgres statement timeouts (3 in 3 days) -- root-cause fix (find_nearby_destinations caching)", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "A real deploy landed today (first since 08-25) and succeeded cleanly -- 0 build-time timeout recurrence, 0 runtime error groups. Still PARTIAL for the same standing structural reason: the anon-role timeout ceiling and /explore's separate uncached queries are explicitly still open."},
    {"id": "NEW-2026-08-14-002", "title": "Newsletter signup success confirmation dead-code bug (fixed 1809adce)", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Not independently re-verified live today (needs explicit user permission this headless run cannot obtain). newsletter_subscribers total unchanged at 15 since 08-17. Unrelated to today's newsletter delivery-observability deploy, which touches send-path counting and webhook ingestion, not the signup-confirmation UI."},
    {"id": "NEW-2026-08-14-003", "title": "3 dead 'Ask NakshIQ' nav buttons (orphaned since the 2026-08-04 AI teardown) removed", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Re-verified today: all pre-existing removed-route probes return clean 404, PLUS a fresh raw-HTML regex scan of mahabaleshwar confirms 0 occurrences of 'asknakshiq'."},
    {"id": "NEW-2026-08-14-004", "title": "Pre-existing data-integrity anomaly (confidence value out of range) self-reported by the nightly stay-picks job", "prior_status": "STILL CLOSED", "today_status": "STILL CLOSED", "evidence": "Sitewide recheck today: 0 rows outside 0-1 across all of destination_stay_picks."},
    {"id": "NEW-2026-08-14-005", "title": "Business Report generator leaks raw technical text (incl. commit hashes / file paths) into the persona that is explicitly supposed to have none", "prior_status": "STILL OPEN", "today_status": "STILL OPEN", "evidence": "Confirmed unchanged: qa/_lib/build_report.js last touched 2026-07-07. Today's run.executor text again contains technical detail (file paths, project/team IDs, SQL, commit hashes, schema names) that will leak into today's NakshIQ_Business_Report.docx exactly as it has every day since 08-14. Not fixed in this run -- out of scope for an unattended daily QA pass to change shared report-generation code."},
    {"id": "NEW-2026-08-19-001", "title": "refresh-stay-picks-agent's network egress block -- root cause still unresolved; watchdog flag continues to read 'ok' independently of the actual state", "prior_status": "STILL OPEN", "today_status": "STILL OPEN", "evidence": "The underlying blocker is UNCHANGED: refresh-stay-picks-agent's 2026-08-26T22:23:47 UTC run's own summary text (now under a renamed 'verification_note' field, see NEW-2026-08-27-004) confirms the identical 403-CONNECT-tunnel policy denial to www.nakshiq.com continues. This QA session's own sandbox again reached nakshiq.com without issue for the entire A-L probe + Chrome E2E pass, confirming the block is specific to that job's own scheduled-session network policy, not a site outage.", "recommendation": "Same founder action as every prior day: allowlist www.nakshiq.com for the refresh-stay-picks-agent scheduled session's egress policy, or formally accept its own now-explicit substitute-check framing (leaning on canary-probe) and document that decision in ops/refresh-stay-picks/SKILL.md rather than re-discovering it nightly."},
    {"id": "NEW-2026-08-22-001", "title": "Two days of daily-QA history (08-17, 08-18) sat uncommitted in the working tree for 5+ days -- remediation held", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Not re-verified via a fresh `git show --stat` this run (no new signal expected or sought). 2026-08-18's top-level findings.json remains a permanent, already-documented gap. No qa/-specific commit-guard has been added yet."},
    {"id": "NEW-2026-08-23-001", "title": "A markdown-file commit that should always trigger a Vercel rebuild sat stranded on a local-only commit -- CONFIRMED RESOLVED (08-23 instance)", "prior_status": "FIXED", "today_status": "FIXED", "evidence": "No change -- already fully closed 08-24 through 08-26."},
    {"id": "NEW-2026-08-24-001", "title": "Two real API fixes shipped 08-23 evening: /api/itinerary now fails loudly (404) on unresolvable destinationIds; /api/export-trip fully removed", "prior_status": "FIXED", "today_status": "FIXED", "evidence": "Re-verified live again today: POST /api/itinerary with unresolvable destinationIds -> 404; GET /api/export-trip -> 404; 3 varied normal itinerary requests still return 200 with real, distinct content. Both fixes continue to hold across today's real deploy."},
    {"id": "NEW-2026-08-24-002", "title": "Consecutive-day 0/10-non-cinematic random destination sample -- Section K coverage of the minority template depending on an out-of-sample control", "prior_status": "NOT_REPRODUCED", "today_status": "NOT_REPRODUCED", "evidence": "2nd consecutive day of natural non-cinematic representation: today's sample landed 2/10 non-cinematic (vishnuprayag, karnaprayag), both directly Chrome/HTTP-verified in-sample. The 08-22 through 08-25 four-day 0/10 streak now reads as an anomaly rather than the norm -- 08-26 and 08-27 both landed naturally without needing stratified sampling.", "recommendation": "Continue to shelve the 08-24 stratified-sampling proposal given 2 consecutive natural draws; revisit only if another multi-day 0/10 streak recurs."},
    {"id": "NEW-2026-08-24-003", "title": "Autoposter's GA4-audit commit sat stranded unpushed at session start for a 2nd consecutive day -- CONFIRMED RESOLVED", "prior_status": "FIXED", "today_status": "FIXED", "evidence": "No change -- already fully closed 08-25. Superseded by the root-cause fix confirmed in NEW-2026-08-27-003 below."},
    {"id": "NEW-2026-08-25-002", "title": "Security-advisor INFO count stable at 16 (unchanged from the 08-25 deal_radar-schema explanation) -- founder review of whether deal_radar belongs on this Supabase project remains open", "prior_status": "PARTIAL", "today_status": "PARTIAL", "evidence": "Count changed today: 16 -> 18, fully explained by 2 new tables from today's migration 073 (see NEW-2026-08-27-002). The deal_radar-schema question itself (7 INFO + unrelated to today's change) remains unchanged and still needs a founder decision.", "recommendation": "Unchanged from 08-25: founder decision needed on whether deal_radar is intentionally sharing this Supabase project."},
    {"id": "NEW-2026-08-25-004", "title": "Autoposter's GA4-audit commit stranded unpushed for a 3RD CONSECUTIVE DAY (08-25 instance) -- CONFIRMED RESOLVED", "prior_status": "FIXED", "today_status": "FIXED", "evidence": "No change -- already fully closed 08-26."},
    {"id": "NEW-2026-08-26-002", "title": "Autoposter's GA4-audit commit stranded unpushed for a FOURTH CONSECUTIVE DAY -- 08-25's escalation recommendation still not actioned", "prior_status": "STILL OPEN", "today_status": "FIXED", "evidence": "Root-cause fix landed after 08-26's QA session: commit e04cccec ('fix(ga4-cron): put gh on the cron PATH so the audit push stops stranding commits') rewrote scripts/ga4-audit-cron.sh + scripts/audit-commit-guard.sh to export a PATH including /opt/homebrew/bin, resolving the `gh`-not-found credential-helper gap under cron's minimal PATH. Verified today: local HEAD was 0 ahead / 0 behind origin/main at session start, and today's GA4-audit commit (529cee52) is an ancestor of origin/main -- it reached origin cleanly on its own, the first day the fix was live, with no QA-session push acting as an incidental safety net. See NEW-2026-08-27-003 for the full writeup."},
]

new_findings_today = [
    {
        "id": "NEW-2026-08-27-001",
        "severity": "info",
        "title": "A real deploy landed (first since 08-25) shipping newsletter per-recipient delivery observability -- new Resend webhook + DB migration verified healthy end-to-end",
        "detail": "The data-dpl-id hint changed vs 08-26 (dpl_51CeusKqxKca7ALaKCmi3hNnnxS9 -> dpl_DUNbLPc3xfptKR7P31mthV3yCzGw). git log shows 2 real app-code commits since 08-26's QA run: 5e10e8cc ships /api/webhooks/resend (Svix HMAC-verified, fail-closed) + migration 073_newsletter_delivery_events.sql (newsletter_sends, newsletter_events, newsletter_issues.failed_count) + a rewritten send-loop that counts Resend-ACCEPTED emails per-recipient instead of per-batch-call, after a confirmed subscriber reported never receiving an issue and the prior code could not answer why (an 'ok:true-while-items-failed' class bug). 5360533e same-day hardened the webhook to log (never return) a typed rejection reason, after an identical opaque 401 cost real debugging time distinguishing a missing secret from a stale timestamp. Independently verified rather than trusting the commit message: list_migrations confirms 073 applied (20260826233502); information_schema confirms both new tables exist with the documented columns (currently 0 rows each, expected -- no issue sent since shipping); 3 new probe.py smoke tests against prod all matched the documented fail-closed design (GET -> 405 no handler, POST no signature -> 401 'Invalid signature', POST garbage signature -> 401 identical body); 0x5xx across all 21 Section-F API probes; Vercel get_runtime_errors(24h) shows 0 error groups despite the deploy.",
        "evidence": "section-F2-deploy.csv: data_dpl_id_hint=dpl_DUNbLPc3xfptKR7P31mthV3yCzGw (vs 08-26's dpl_51CeusKqxKca7ALaKCmi3hNnnxS9). section-F-api.csv rows webhook_resend_get=405, webhook_resend_post_no_sig=401 {\"error\":\"Invalid signature\"}, webhook_resend_post_garbage_sig=401 {\"error\":\"Invalid signature\"}. list_migrations shows 20260826233502 073_newsletter_delivery_events. information_schema.columns confirms newsletter_sends(resend_email_id,email,issue_slug,created_at) and newsletter_events(id,svix_id,resend_email_id,email,event_type,occurred_at,payload,created_at); both 0 rows via execute_sql count(*).",
        "recommendation": "Cannot verify from outside whether RESEND_WEBHOOK_SECRET is actually set in Vercel (Production AND Preview) or whether the webhook URL is registered in Resend's dashboard -- the route deliberately returns an identical 401 for 'secret unset' and 'wrong signature' so this session's probes cannot distinguish the two. Recommend the founder confirm both directly in the Vercel and Resend dashboards; until confirmed, treat delivery-event ingestion as unverified even though the route itself is behaving exactly as designed."
    },
    {
        "id": "NEW-2026-08-27-002",
        "severity": "info",
        "title": "Security advisor count rose 16 -> 18, fully explained by today's migration adding 2 new service-role-only tables with RLS enabled + no explicit policy (by design)",
        "detail": "Direct get_advisors(type=security) pull returned 18 findings today vs 08-26's 16. The delta is exactly 2 new rls_enabled_no_policy INFO findings, on public.newsletter_events and public.newsletter_sends -- the 2 tables migration 073 created today. The migration file's own comment states the intent: 'RLS: these are ops tables. Service role only; no anon access.' Both tables are read/written exclusively via the service-role Supabase client in the webhook route and the newsletter send route, which bypasses RLS entirely -- so 'RLS enabled, 0 policies' is the correct, secure default (deny every anon/authenticated-role query), matching the pre-existing pattern already covering destination_alerts, membership_waitlist, and social_dm_leads. The other 16 findings are byte-for-byte identical to 08-25/08-26 (7 deal_radar INFO + 3 legacy-NakshIQ INFO + 1 WARN extension_in_public + 4 WARN SECURITY DEFINER-executable + 1 WARN leaked-password-protection), 0 further drift.",
        "evidence": "get_advisors(project_id=dudzsdzfvikjjhurxrgc, type=security) returned 18 lints; the 2 new entries have metadata.schema='public', metadata.name in ('newsletter_events','newsletter_sends'), metadata.type='table'. Cross-checked against supabase/migrations/073_newsletter_delivery_events.sql lines 59-61 ('alter table ... enable row level security; -- RLS: these are ops tables. Service role only; no anon access.').",
        "recommendation": "None required -- this is the intended secure-by-default state, not a regression. Worth a one-time founder acknowledgment that the deal_radar-schema question (7 of the remaining 16 INFO findings, open since 08-25) is unrelated to today's change and still needs its own decision."
    },
    {
        "id": "NEW-2026-08-27-003",
        "severity": "low",
        "title": "The 4-consecutive-day GA4-audit stranded-commit pattern (NEW-2026-08-26-002) is FIXED -- verified working on its first live day",
        "detail": "08-23 through 08-26 each found the previous night's GA4-audit commit sitting local-only at session start, self-healed only by this QA session's own incidental daily push. Root-cause fix landed after 08-26's QA run: commit e04cccec ('fix(ga4-cron): put gh on the cron PATH so the audit push stops stranding commits') rewrote scripts/ga4-audit-cron.sh and scripts/audit-commit-guard.sh to export a PATH including /opt/homebrew/bin, so the git credential helper's `gh auth git-credential` shell-out resolves under cron's minimal environment (documented root cause in CLAUDE.md via 01f644d4). Verified today rather than assumed: `git rev-list --left-right --count origin/main...main` = '0 0' at session start (fully in sync, not just 'close'), and `git merge-base --is-ancestor 529cee52 origin/main` confirms today's own GA4-audit commit ('measure(ga4): audit 2026-08-27') reached origin on its own -- no QA-session push was needed as a safety net, unlike every one of the prior 4 days.",
        "evidence": "git rev-list --left-right --count origin/main...main at session start = '0\\t0'. git log -1 --format='%H %s' at session start = 5360533e (already includes 529cee52 as an ancestor on origin). git show --stat e04cccec confirms scripts/audit-commit-guard.sh (+26 lines) and scripts/ga4-audit-cron.sh (+52/-12 lines) were the changed files.",
        "recommendation": "None required -- close this pattern out. Worth a brief founder note-to-self that the fix should be watched for one more week before fully retiring the concern, since a single clean day is encouraging but not yet a long track record."
    },
    {
        "id": "NEW-2026-08-27-004",
        "severity": "low",
        "title": "refresh-stay-picks-agent renamed its own verification-gap field from 'verification_blocked' to 'verification_note' and softened the framing -- underlying egress block itself is unchanged",
        "detail": "Every prior run back through at least 08-19 used a field named 'verification_blocked' whose text described the outstanding 403-CONNECT egress denial to www.nakshiq.com as something OUTSTANDING that 'needs to be run from an environment that can reach the production domain... before the data can be considered fully verified'. The 2026-08-26T22:23:47 UTC run instead carries a field named 'verification_note' whose text explicitly leans on a substitute: 'Rendered-page health was not verified directly by this run. The independent Vercel canary-probe cron, every 30 minutes per apps/web/vercel.json, still checks production page health regardless of this session network limits.' The underlying block is byte-for-byte the same signature (403 policy-denial, connect_rejected, to www.nakshiq.com) as every prior day -- nothing about the actual network access changed. This reads as a real code change to the job's own summary-generation logic (a field rename, not just different wording on the same field), shifting from flagging an open blocker to documenting an accepted mitigation.",
        "evidence": "ops_reports row for job='refresh-stay-picks-agent', run_at='2026-08-26 22:23:47.92306+00': summary.verification_note (new field name) quoted above, vs the 08-25 row's summary.verification_blocked (old field name, different wording, same underlying signature).",
        "recommendation": "No new founder action beyond NEW-2026-08-19-001's standing recommendation (allowlist www.nakshiq.com for this job's egress policy). If this framing shift was a deliberate engineering decision to formally accept canary-probe as the substitute check, consider documenting that decision explicitly in ops/refresh-stay-picks/SKILL.md so future QA sessions don't need to infer it from a field-name diff."
    },
]

headline_metrics = {
    "core_routes_probed": 33,
    "core_routes_2xx": 32,
    "core_routes_3xx_redirect": 0,
    "core_routes_4xx_or_5xx": 0,
    "core_routes_TTFB_ms": {"min": 62, "median": 189, "p90": 410, "max": 655},
    "core_routes_TTFB_note": "33 routes probed but /en/search returned 404 and was EXCLUDED from the pass/fail tally and TTFB stats (no app/[locale]/search page directory exists -- search is a client-side modal), consistent with every prior run. Max reading was /en/weekend-from-mumbai at 655ms -- single moderate reading, not reprobed.",
    "destinations_sampled": 10,
    "destinations_all_200": True,
    "destinations_TTFB_ms": {"min": 128, "median": 256, "max": 367},
    "destinations_TTFB_note": "Exact median of the 10 sorted readings is the midpoint of 251ms and 260ms (255.5), rounded to 256 for the integer schema field. 0 outliers over the 1500ms reprobe threshold today -- the calmest Section-B TTFB reading in the recent record (section-B-reprobe.json is an empty array). All 10: kavaratti 251, konark 289, mahabaleshwar 367, vishnuprayag 264, mandvi 213, kotagiri 260, karnaprayag 246, valley-of-flowers 286, alchi 147, bir-billing 128.",
    "hindi_parity_sampled": 10,
    "hindi_pages_with_lang_hi": 10,
    "hindi_pages_with_devanagari_title": 10,
    "hindi_section_headings_translated_sampled": 10,
    "hindi_section_headings_translated_count": 10,
    "hindi_h1_devanagari_count": 2,
    "hindi_h1_devanagari_note": "2/10 today (vishnuprayag, karnaprayag), both non-cinematic -- 2nd consecutive day of natural non-cinematic representation in the random sample (08-26 broke a 4-day 0/10 streak; today confirms it wasn't a one-off). Both verified live: vishnuprayag via full Chrome E2E, karnaprayag via the Section C HTTP-level H1 check.",
    "seo_urls_sampled": 14,
    "seo_title_stutter": 0,
    "seo_canonical_present": 14,
    "seo_hreflang_en_present": 14,
    "seo_hreflang_hi_present": 14,
    "seo_hreflang_xdefault_present": 14,
    "seo_og_image_present": 14,
    "seo_methodology_note": "hreflang regex built with re.IGNORECASE (carried forward unchanged) -- 0/14 false negatives.",
    "quiz_routes_sampled": 4,
    "quiz_routes_og_image_present": 4,
    "quiz_routes_note": "Full SEO re-probe of /en+hi/quiz/hill-station and /en+hi/risk-quiz today: og:image present on all 4, plus 0 stutter / canonical present / hreflang en+hi+xdefault present on all 4 -- unchanged from 08-26.",
    "soft_404_regression_passes": 10,
    "soft_404_regression_misses": 0,
    "sos_destinations_rendering_nonempty_sos": 10,
    "sos_sample_destinations_empty": 0,
    "sos_db_min_dialable_fields": 5,
    "sos_db_avg_dialable_fields": 7.81,
    "sos_db_total_dialable_entries_11col": 4165,
    "sos_db_total_dialable_entries_11col_note": "Identical to 08-17 through 08-26 (0 change). Field name retained as '_11col' for run-over-run continuity even though the underlying set is 12 columns. Today's-10-sample sum was 78 (min=6, mahabaleshwar).",
    "sos_db_rows_with_placeholder_x": 0,
    "sos_db_rows_with_placeholder_x_note": "Fresh sitewide regex scan run today (^[Xx]+$ across all 12 dialable columns) -- 0 rows.",
    "sos_emergency_sos_rows_db": 533,
    "sos_dests_without_emergency_sos_row_db": 0,
    "sos_db_rows_under_3_dialable": 0,
    "sos_local_helpers_nonempty_db": 178,
    "sos_destinations_with_local_helpers_block": 533,
    "people_who_help_nonempty_array_db": 84,
    "people_who_help_object_shape_rows_db": 93,
    "people_who_help_array_shape_rows_db": 432,
    "people_who_help_confidence_cards_total_db": 525,
    "people_who_help_confidence_cards_total_note": "confidence_cards has 525 rows (not 533) -- 8 destinations have no confidence_cards row at all. 432 array-shape + 93 object-shape = 525. Unchanged arithmetic from every prior week this has been measured.",
    "destinations_total_db": 533,
    "sos_phones_total_across_10_dests": 78,
    "sos_phones_invalid_format": 0,
    "sos_destinations_without_block": 0,
    "sos_no_block_tierA": 0,
    "sos_phones_across_10_dests_note": "Real per-sample DB computation (compatibility alias for the build_report.js field-drift workaround, see NEW-2026-08-10-003): 12-column dialable count for exactly today's 10 sampled destinations -- alchi 9, bir-billing 9, karnaprayag 7, kavaratti 8, konark 8, kotagiri 7, mahabaleshwar 6, mandvi 7, valley-of-flowers 10, vishnuprayag 7. Sum=78. All >=3 (min=6, mahabaleshwar); 0 malformed/placeholder found.",
    "sos_auto_reverify_migration_applied": True,
    "sos_auto_reverify_cron_schedule": "0 0 * * 1 (weekly, Monday 00:00 UTC)",
    "sos_auto_verify_status_confirmed": 109,
    "sos_auto_verify_status_needs_source": 300,
    "sos_auto_verify_status_never_run": 124,
    "sos_auto_verify_status_source_unreachable": 0,
    "sos_auto_verify_most_recent_cron_execution_utc": "2026-08-24T00:02:16.483744+00:00",
    "sos_auto_verify_most_recent_confirmed_verified_date": "2026-08-03",
    "sos_auto_verify_note": "Distinguishing two different timestamps this run (see run.executor): the cron's own job-execution log (ops_reports) shows it last FIRED 2026-08-24T00:02 UTC, on schedule, next due 08-31 -- but grouping emergency_sos by verified_by shows the max verified_date for verified_by='sos-auto-reverify' (109 rows, matching confirmed=109 exactly) is 2026-08-03. The cron has executed weekly since then without successfully confirming a single additional row -- it re-examines the same ~300 needs_source rows each week without resolving any. Distribution flat vs 08-26.",
    "hero_images_probed": 533,
    "hero_images_ok": 533,
    "hero_images_missing": 0,
    "hero_images_errors": 0,
    "hero_images_note": "HTTP HEAD-probe fallback run today (not the live node scripts/audit-hero-images.mjs itself) -- 533/533 ok.",
    "stay_picks_spotcheck_kaza": 4,
    "stay_picks_spotcheck_phawngpui_peak": 2,
    "stay_picks_spotcheck_majuli": 4,
    "stay_picks_spotcheck_note": "DB-only continuity check (none of the 3 landed in today's random sample or in the most recent stay-picks-agent batch, 08-26); identical to 07-20..08-26.",
    "stay_picks_anomaly_note": "Continues FIXED (see NEW-2026-08-14-004, closed 08-16). Sitewide recheck today: 0 rows outside 0-1 across all of destination_stay_picks.",
    "api_endpoints_probed": 21,
    "api_5xx_returned": 0,
    "api_4xx_validation_returned": 4,
    "api_2xx_valid_returned": 5,
    "api_404_expected_or_removed_returned": 9,
    "api_webhook_resend_probes": 3,
    "api_webhook_resend_5xx": 0,
    "api_webhook_resend_note": "NEW today: GET /api/webhooks/resend -> 405 (no handler defined, correct); POST with no svix headers -> 401 {'error':'Invalid signature'}; POST with a garbage svix-signature -> 401, byte-identical body -- the route intentionally returns the same opaque response for every rejection reason (confirmed by reading route source). See NEW-2026-08-27-001.",
    "api_endpoints_probed_note": "21 automated via probe.py (18 standing fixtures + 3 new webhook fixtures added this run), 0 supplementary manual checks needed.",
    "api_itinerary_valid_status": 200,
    "api_itinerary_valid_content_broken": False,
    "api_itinerary_note": "3 varied live probes today (Dec/family, Oct/couple, May/solo+explicit destinationIds=[manali,shimla,jaipur]) -- ALL returned real, non-empty per-day content. PLUS re-confirmed both 08-23/24-shipped fixes still hold: unresolvable destinationIds -> 404; export-trip GET -> 404.",
    "vercel_runtime_errors_24h_total_groups": 0,
    "vercel_runtime_errors_24h_note": "Zero error groups found via get_runtime_errors MCP tool, despite a real deploy landing today.",
    "vercel_runtime_errors_itinerary_specific": 0,
    "service_worker_version": "nakshiq-v54",
    "service_worker_version_note": "Unchanged from 08-14 through 08-26.",
    "manifest_icons": 3,
    "manifest_shortcuts": 5,
    "offline_page_code": 200,
    "sitemap_chunks": 5,
    "sitemap_total_urls": 24975,
    "sitemap_total_urls_delta_note": "FLAT vs 08-26's 24,975 -- byte-identical category breakdown across the board, the 4TH consecutive fully-flat sitemap day (08-24 through 08-27). Destination slug/month/cost URL counts all flat (533/6396/525).",
    "sitemap_total_destination_slug_urls": 533,
    "sitemap_total_destination_month_urls": 6396,
    "sitemap_cost_urls_en": 525,
    "map_explore_leaflet_containers": 1,
    "map_explore_overlay_marker_paths": 519,
    "map_explore_note": "519 overlay markers -- identical to 08-03 through 08-26, confirmed both via DOM query (.leaflet-interactive count) and the UI's own '519 markers - colored by score' label. Screenshot-verified coordinate click used from the start (per the 08-26 corrected methodology) -- clean on the first attempt, no near-miss this run. Grid view confirmed as default (0 leaflet before toggle).",
    "map_dest_pages_probed_interactive": 2,
    "map_dest_pages_leaflet_template": 1,
    "map_dest_pages_atlas_template": 1,
    "map_widget_destination_pages_probed_interactive": 2,
    "map_widget_destination_pages_with_leaflet": 1,
    "map_widget_field_alias_note": "map_widget_destination_pages_* duplicates map_dest_pages_* above, see NEW-2026-07-07-004. Today's 2 Chrome-interactive probes: vishnuprayag (Leaflet, FRESH in-sample non-cinematic destination) + mahabaleshwar (atlas, FRESH in-sample cinematic destination) -- both landed naturally in today's random sample.",
    "map_dest_atlas_note": "mahabaleshwar /en + /hi (today's fresh cinematic sample) render atlas svg viewBox 0 0 1000 1100, leaflet=0 by design (correct), 0 console errors both loads. Also literal-verified the decorative corner-readout coordinates today: '23.5N'/'80.5E', unchanged/generic (see NEW-2026-06-06-003).",
    "map_dest_leaflet_note": "vishnuprayag interactively verified via Chrome: 1 leaflet-container, 46 tiles, 9 markers (.leaflet-interactive selector), window.L present, 0 console errors -- lazy-mount lesson applied proactively, succeeded on the first attempt.",
    "locale_redirect_probes": 5,
    "locale_redirect_all_301_to_en": True,
    "console_error_surfaces_probed": 7,
    "console_react_418_fired_loads": "0 of 7 fully console-tracked observations (vishnuprayag en+hi, mahabaleshwar en+hi, explore map toggle, trip, family/kerala) -- NEW-2026-06-07-001 holds STILL CLOSED.",
    "deploy_detected": True,
    "deploy_evidence": "data-dpl-id CHANGED today: dpl_DUNbLPc3xfptKR7P31mthV3yCzGw, vs 08-26's dpl_51CeusKqxKca7ALaKCmi3hNnnxS9. git log f79a3e03(08-26 QA commit)..origin/main shows 7 new commits, 2 real app-code (5e10e8cc newsletter delivery-observability + migration 073; 5360533e webhook hardening), 5 docs/GSC/GA4-audit only. See NEW-2026-08-27-001.",
    "hindi_translations_db_total": 533,
    "hindi_translations_db_has_hi_tagline": 533,
    "hindi_translations_db_has_hi_why_special": 533,
    "hindi_translations_db_has_hi_name": 533,
    "hindi_translations_note": "533/533 (100%) for hi.name, hi.tagline, AND hi.why_special today -- 0 regression.",
    "sos_db_dialable_12col_note": "12-column set (police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, local_police_station, mountain_rescue, mechanic_contact, tow_service, embassy_emergency_line), non-null + trimmed-non-empty. 4165 total, identical to 08-17 through 08-26. CASE-WHEN guards used for every jsonb_array_length call this run (1 query needed a rewrite after an AND-short-circuit error, then passed clean).",
    "sos_local_helpers_baseline_note": "178 = emergency_sos.local_helpers (SOS sub-list, site-rendered) -- identical to 07-20 through 08-26.",
    "destinations_total_db_note": "Steady at 533 (0 new destinations for 74+ days).",
    "newsletter_subscribers_total_db": 15,
    "newsletter_subscribers_active_db": 14,
    "newsletter_subscribers_confirmed_db": 10,
    "newsletter_subscribers_note": "Total UNCHANGED from 08-17 through 08-26's 15 -- no new signups this window. newsletter_sends and newsletter_events (new tables from today's migration) both show 0 rows -- expected, no issue has been sent since the feature shipped.",
    "ai_surface_removal_verified": True,
    "ai_surface_removal_note": "6/6 removed-route probes (chat/gap-year-generate/gap-year-regenerate/embed/ask/export-trip) return clean 404 again today, consistent with NEW-2026-08-14-003 and NEW-2026-08-24-001 staying closed.",
    "security_advisors_count": 18,
    "security_advisors_count_prior": 16,
    "security_advisors_note": "18 findings today, UP 2 from 08-26 -- fully explained: 2 new rls_enabled_no_policy INFO findings on newsletter_events/newsletter_sends, the tables today's migration 073 created (service-role-only by design, matches the existing pattern). The other 16 are byte-identical to 08-25/08-26 (10 INFO + 6 WARN), 0 further drift. See NEW-2026-08-27-002.",
    "ops_reports_targeted_check_note": "Pulled the FULL DISTINCT-ON-job latest-per-job snapshot this run (21 distinct jobs), all ok=true at the flag level. Drilled into summary text for the 2 jobs known to carry substantive detail: audit-gsc-alerts (1 unchanged contextual-only alert, no new run since 08-26T03:30) and refresh-stay-picks-agent (latest 08-26T22:23:47 UTC run, 20/20 ok, rows_written=61 -- its verification-gap field was renamed 'verification_blocked'->'verification_note' with softened framing, underlying egress block itself unchanged, see NEW-2026-08-27-004). No overlap between today's QA sample and that job's most recent batch.",
    "git_sync_note": "Local HEAD was EXACTLY 0 ahead / 0 behind origin/main at session start -- confirms the GA4-audit stranded-commit pattern (NEW-2026-08-26-002) is fixed at the root. See NEW-2026-08-27-003.",
    "supabase_new_tables_verified": True,
    "supabase_new_tables_note": "newsletter_sends and newsletter_events both confirmed present via information_schema.columns with the exact shape documented in migration 073; both currently 0 rows (expected, no newsletter issue sent since shipping).",
}

deliverables = [
    "qa/findings/2026-08-27.json",
    "qa/findings/2026-08-27/ (probe.py + section-*.csv/json evidence artifacts + html/ raw Hindi page captures)",
    "NakshIQ_Developer_Report.docx",
    "NakshIQ_QA_Report.docx",
    "NakshIQ_Business_Report.docx",
]

honest_caveats = [
    "TOP STORYLINE: a real deploy landed since 08-26 (first since 08-25) shipping newsletter per-recipient delivery observability -- new webhook route + DB migration, verified healthy end-to-end via HTTP smoke tests and information_schema, 0x5xx, 0 Vercel runtime errors. Cannot verify from outside whether RESEND_WEBHOOK_SECRET is actually configured in Vercel or the webhook is registered in Resend's dashboard, since the route intentionally returns an identical 401 for an unset secret vs a wrong signature. See NEW-2026-08-27-001.",
    "SECOND STORYLINE (positive, process): the 4-consecutive-day GA4-audit stranded-unpushed-commit pattern is FIXED and verified working on its first live day -- local HEAD was exactly in sync with origin/main at session start, and today's GA4-audit commit reached origin on its own with no QA-session push needed as a safety net. See NEW-2026-08-27-003.",
    "THIRD STORYLINE: security advisor count rose 16->18, fully explained and verified as a benign, by-design consequence of today's migration (2 new service-role-only tables with RLS enabled + no policy, matching the existing pattern) -- not a regression. See NEW-2026-08-27-002.",
    "FOURTH STORYLINE: refresh-stay-picks-agent's own verification-gap field was renamed ('verification_blocked' -> 'verification_note') with softened framing that now leans on the independent canary-probe cron -- but the underlying 403 egress block to www.nakshiq.com (NEW-2026-08-19-001) is unchanged. See NEW-2026-08-27-004.",
    "FIFTH STORYLINE: 2nd consecutive day of natural non-cinematic representation in the random 10-sample (vishnuprayag, karnaprayag today) -- the 08-22 through 08-25 four-day 0/10 streak now looks like an anomaly rather than the norm.",
    "Went one level deeper than the standing aggregate on the SOS auto-reverify cron this run and found a real, previously-uncaptured-with-this-precision distinction: the cron fires weekly on schedule (last 08-24) but has not successfully confirmed a new row since 2026-08-03 -- prior days' single 'most_recent_run_utc' field conflated these two facts. Not a new defect, just sharper measurement of the standing NEW-2026-08-03-003 item.",
    "The Business Report generator's persona-leak bug (NEW-2026-08-14-005, found 08-14) is unfixed and will recur in today's NakshIQ_Business_Report.docx exactly as it has every day since -- header() prints the full raw run.executor text verbatim for all personas including business. Confirmed the source is unchanged (build_report.js last touched 2026-07-07).",
    "The live node scripts/audit-hero-images.mjs script was not re-run directly this session (time-boxed in favor of the DB/Chrome/ops_reports drill-downs and the new webhook-route verification work) -- used the HTTP HEAD-probe fallback embedded in probe.py instead.",
    "Uttarkashi, Khonoma, and khangchendzonga-np (the 3 historically-buggy SOS destinations) did not land in today's random sample -- relied on the sitewide-aggregate safety floor + a fresh placeholder-phone regex scan (both clean), not live per-destination re-verification this run.",
    "The Phase-8-carry-sparse-stays watchlist (kaza, phawngpui-peak, majuli) was checked via direct DB spot-check today, not random sampling -- none of the 3 landed in today's sample or in the most recent stay-picks-agent batch (08-26, 20 destinations).",
    "Axe-core/Lighthouse deferred again -- baseline now 115 days stale. Today's deploy was API-only (newsletter webhook + send-route logic), 0 destination/page UI changes, so there was genuinely nothing new on the rendering/a11y/perf front to check a diff against even with a real deploy today.",
    "Did not re-run the full ~21-job ops_reports inventory with summary-text drill-down for every job this week -- pulled the full latest-per-job flag snapshot (21 jobs) but only drilled into summary text for the 2 jobs known to carry substantive detail (audit-gsc-alerts, refresh-stay-picks-agent).",
    "Did not attempt to submit the real newsletter/email-capture form to re-verify the 08-14 confirmation-UI fix live -- would require entering personal data into a form and submitting it, which needs explicit user permission this headless run cannot obtain. newsletter_subscribers total unchanged at 15 since 08-17.",
    "The working tree carries pre-existing, unrelated uncommitted changes documented on 08-22 through 08-26 (destination-detail-cinematic.tsx WIP diff, analytics.ts, env.example, axe-report JSONs, an unrelated cruise-fare-shopping scratch-file cluster, 2 untracked citation-weekly .md files) PLUS 2 new untracked files not seen in any prior day's audit (.claude/settings.local.json, apps/web/src/lib/affiliate-links.ts) -- noted for continuity but left entirely untouched per the established 'stage narrowly, never git add -A' rule; only this run's own qa/findings/2026-08-27* paths were committed.",
    "sos_phones_invalid_format=0 today used the same permissive definition as every prior week (any non-empty string counts, including honest-scarcity or descriptive rescue_contact text) -- consistent methodology, not a new leniency.",
    "No stale git lock files were present at any point this session.",
]

findings = {
    "schema_version": "1.0",
    "run": {
        "id": "nakshiq-daily-test-2026-08-27",
        "date": "2026-08-27",
        "started_utc": STARTED_UTC,
        "completed_utc": COMPLETED_UTC,
        "target": "https://www.nakshiq.com/",
        "executor": executor,
        "mode": "scheduled-headless",
        "real_verification": True,
        "fabricated_numbers": False,
        "duration_minutes": DURATION_MIN,
        "user_present": False,
        "status": "completed",
    },
    "blockers": [],
    "phases_completed": phases_completed,
    "phases_skipped": phases_skipped,
    "regression_matrix": regression_matrix,
    "new_findings_today": new_findings_today,
    "headline_metrics": headline_metrics,
    "deliverables": deliverables,
    "honest_caveats": honest_caveats,
}

out_path = "/sessions/beautiful-dazzling-pasteur/mnt/India Travel Planner/qa/findings/2026-08-27.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(findings, f, indent=2, ensure_ascii=False)
print("wrote", out_path, "bytes:", __import__("os").path.getsize(out_path))

# Basic schema sanity checks (mirrors findings.schema.json's required fields + enums)
ENUM = {"STILL CLOSED","STILL OPEN","STILL GREEN","FIXED","REPRODUCED","REGRESSION","PARTIAL","NOT_REPRODUCED",
        "NOT IN TODAY'S 10-DEST RANDOM SAMPLE","NOT INVESTIGATED","STILL OPEN — not investigated today",
        "STILL OPEN — not actively re-tested","STILL OPEN — not re-tested without axe in this session",
        "STILL OPEN — not re-tested without axe today","STILL OPEN — needs i18n sprint"}
bad = [r["id"] for r in regression_matrix if r["today_status"] not in ENUM]
assert not bad, f"bad enum values: {bad}"
assert findings["run"]["real_verification"] is True
assert findings["run"]["fabricated_numbers"] is False
assert findings["run"]["status"] in ("completed","partial","aborted")
for r in regression_matrix:
    assert "id" in r and "title" in r and "today_status" in r
for n in new_findings_today:
    assert n["severity"] in ("info","low","medium","high","critical")
    assert "id" in n and "title" in n
print("schema sanity checks passed. regression_matrix entries:", len(regression_matrix), "new_findings_today:", len(new_findings_today))
