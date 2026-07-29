#!/bin/bash
# Skip Vercel rebuilds when the commit only touches files that don't affect
# the deployed web app. Cuts deploy volume ~50-60% during heavy autoposter
# activity. Vercel runs this from the project root; exit 0 = skip, 1 = build.

CHANGED=$(git diff --name-only HEAD^ HEAD 2>/dev/null)

# Initial commit, rebase, or shallow clone — always build to be safe.
if [ -z "$CHANGED" ]; then
  exit 1
fi

# Audit files are an EXCEPTION to the doc/markdown skip below, and must be
# tested BEFORE it. The apps/web prebuild runs scripts/build-audit-snapshot.mjs,
# which reads gsc-audits/gsc-audit-*.md and ga4-audits/ga4-audit-*.md and writes
# apps/web/src/data/audit-snapshots.json from COMMITTED audit files only. Those
# paths also match the generic `.*\.md$` / `gsc-audits/` excludes, so an
# audit-only commit was silently skipped and the GSC/GA4 snapshot froze while
# every signal reported success. Past audits only ever built by riding along on
# an unrelated code commit. Bit us 2026-06-11, 2026-07-13, and 2026-07-29
# (deployment dpl_DwScN69 skipped; snapshot stale two days).
# Cost of this exception: one extra build on days an audit lands. Deliberate —
# a wasted build is cheaper than a silently frozen snapshot.
AUDITS=$(echo "$CHANGED" | grep -E '^(gsc-audits/gsc-audit|ga4-audits/ga4-audit)-[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' || true)

if [ -n "$AUDITS" ]; then
  echo "Building — audit files changed (prebuild must refresh audit-snapshots.json):"
  echo "$AUDITS" | sed 's/^/  /'
  exit 1
fi

NON_TRIVIAL=$(echo "$CHANGED" | grep -vE '^(nakshiq-autoposter/|videos/|images/|\.claude/|\.expo/|\.playwright-mcp/|\.match_ashish\.py$|data/|scripts/|qa/|tests/|\.loop/|\.github/|\.gitignore$|supabase/seed/|gsc-audits/|Web Res reports/|Branding/|.*\.docx$|.*\.md$|MEMORY\.md|[^/]+\.png$|.*\.csv$)' || true)

if [ -z "$NON_TRIVIAL" ]; then
  echo "Skipping build — only autoposter / media / docs changed:"
  echo "$CHANGED" | sed 's/^/  /'
  exit 0
fi

echo "Building — code changes detected:"
echo "$NON_TRIVIAL" | sed 's/^/  /'
exit 1
