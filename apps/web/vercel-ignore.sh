#!/bin/bash
# Skip Vercel rebuilds when the commit only touches files that don't affect
# the deployed web app. Cuts deploy volume ~50-60% during heavy autoposter
# activity. Vercel runs this from the project root; exit 0 = skip, 1 = build.

# A push can carry several commits but Vercel runs this once, at HEAD.
# Diffing HEAD^..HEAD meant a push whose FINAL commit was trivial silently
# dropped every code commit beneath it: on 2026-08-31 the mobile-layout fix
# (b5c0d187) never deployed because a tests-only commit (e9f344c6) rode on
# top of it in the same push. Vercel exposes the SHA of the last
# successfully deployed commit for exactly this case — diff against it when
# it exists in the (shallow) clone; otherwise fall back to HEAD^, and an
# empty diff still builds-to-be-safe below.
if [ -n "$VERCEL_GIT_PREVIOUS_SHA" ] && git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null; then
  CHANGED=$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" HEAD 2>/dev/null)
else
  CHANGED=$(git diff --name-only HEAD^ HEAD 2>/dev/null)
fi

# Initial commit, rebase, or shallow clone — always build to be safe.
if [ -z "$CHANGED" ]; then
  exit 1
fi

NON_TRIVIAL=$(echo "$CHANGED" | grep -vE '^(nakshiq-autoposter/|ops/|videos/|images/|\.claude/|\.expo/|\.playwright-mcp/|\.match_ashish\.py$|data/|scripts/|qa/|tests/|\.loop/|\.github/|\.gitignore$|supabase/seed/|gsc-audits/|Web Res reports/|Branding/|.*\.docx$|.*\.md$|MEMORY\.md|[^/]+\.png$|.*\.csv$)' || true)

if [ -n "$NON_TRIVIAL" ]; then
  echo "Building — code changes detected:"
  echo "$NON_TRIVIAL" | sed 's/^/  /'
  exit 1
fi

# Audit files are an EXCEPTION to the doc/markdown skip above. The apps/web
# prebuild runs scripts/build-audit-snapshot.mjs, which reads
# gsc-audits/gsc-audit-*.md and ga4-audits/ga4-audit-*.md and writes
# apps/web/src/data/audit-snapshots.json from COMMITTED audit files only. When
# audit-only commits were always skipped, the snapshot froze while every signal
# reported success (2026-06-11, 2026-07-13, 2026-07-29 — dpl_DwScN69 skipped).
#
# But building on EVERY audit commit cost real money: 42 of 85 production builds
# in Aug 24–Sep 23 2026 were audit-only, and every deploy starts with an empty
# ISR cache that crawlers then refill (~6.5K page regenerations/day, the whole
# ISR-writes + origin-transfer line on the Vercel bill). The only consumers of
# the snapshot are the once-daily audit-gsc-alerts / audit-gsc-ga4-correlation
# crons, so ONE audit build per day is enough.
#
# Rule: an audit-only change builds only if the last deployed commit is at
# least AUDIT_BUILD_MIN_HOURS old (or unknown — build to be safe). A skipped
# audit is not lost: VERCEL_GIT_PREVIOUS_SHA stays put, so the next build diffs
# against it and picks up every audit committed since.
AUDIT_BUILD_MIN_HOURS=20
AUDITS=$(echo "$CHANGED" | grep -E '^(gsc-audits/gsc-audit|ga4-audits/ga4-audit)-[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' || true)

if [ -n "$AUDITS" ]; then
  PREV_TS=""
  if [ -n "$VERCEL_GIT_PREVIOUS_SHA" ] && git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null; then
    PREV_TS=$(git show -s --format=%ct "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null)
  fi
  if [ -z "$PREV_TS" ]; then
    echo "Building — audit files changed and last deployed commit is unknown:"
    echo "$AUDITS" | sed 's/^/  /'
    exit 1
  fi
  AGE_H=$(( ($(date +%s) - PREV_TS) / 3600 ))
  if [ "$AGE_H" -ge "$AUDIT_BUILD_MIN_HOURS" ]; then
    echo "Building — audit files changed, last deployed commit is ${AGE_H}h old:"
    echo "$AUDITS" | sed 's/^/  /'
    exit 1
  fi
  echo "Skipping build — audit-only change, last deployed commit is ${AGE_H}h old (< ${AUDIT_BUILD_MIN_HOURS}h); it rides the next build:"
  echo "$AUDITS" | sed 's/^/  /'
  exit 0
fi

echo "Skipping build — only autoposter / media / docs changed:"
echo "$CHANGED" | sed 's/^/  /'
exit 0
