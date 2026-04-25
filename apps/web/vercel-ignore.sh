#!/bin/bash
# Skip Vercel rebuilds when the commit only touches files that don't affect
# the deployed web app. Cuts deploy volume ~50-60% during heavy autoposter
# activity. Vercel runs this from the project root; exit 0 = skip, 1 = build.

CHANGED=$(git diff --name-only HEAD^ HEAD 2>/dev/null)

# Initial commit, rebase, or shallow clone — always build to be safe.
if [ -z "$CHANGED" ]; then
  exit 1
fi

NON_TRIVIAL=$(echo "$CHANGED" | grep -vE '^(nakshiq-autoposter/|videos/|images/|\.claude/|\.expo/|.*\.docx$|.*\.md$|MEMORY\.md)' || true)

if [ -z "$NON_TRIVIAL" ]; then
  echo "Skipping build — only autoposter / media / docs changed:"
  echo "$CHANGED" | sed 's/^/  /'
  exit 0
fi

echo "Building — code changes detected:"
echo "$NON_TRIVIAL" | sed 's/^/  /'
exit 1
