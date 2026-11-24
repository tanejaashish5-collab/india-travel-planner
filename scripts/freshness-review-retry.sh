#!/bin/bash
# freshness-review-retry.sh — second research pass for the ids a weekly freshness
# review left without a verdict.
#
# WHY IT EXISTS (2026-11-24)
# The procedure (.claude/commands/freshness-review.md) tells the session to re-research
# anything its sub-agents could not source before finishing. On 2026-11-14 it did
# (19 dropped in wave 1, 0 left out). On 2026-11-21 it did not: 28 of 41 ids were left
# out ("no qualifying source", "could not find in time"), the session ended after 27
# minutes, and the watchdog emailed a silent failure for three days. Four of the 28
# carried closure notices that lapsed on 11-24. A rule in a prompt is a suggestion; this
# makes the second wave happen. freshness-review-weekly.sh runs the copy pinned to its
# start commit right after the first stamp; it can also be run by hand for a past day.
#
# Usage: bash scripts/freshness-review-retry.sh <YYYY-MM-DD> [<pinned-sha>]
#   Reads   ~/.claude/freshness-review/{batch,entries,apply}-<date>.*
#   Writes  ~/.claude/freshness-review/{batch,entries,run,apply}-<date>-retry.*
#   Appends a "Second pass" section to data/audits/freshness-review-<date>.md (no commit).
#   Last line: RETRY <the validator's RESULT line> | RETRY none (<why>)
#
# CONTROLS (same as the first pass): the session cannot write the DB; the retry batch is
# checksummed before it starts; the stamp runs the validator pinned to <pinned-sha>.
{
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(git -C "$(pwd)" rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT" || { echo "RETRY none (cannot cd to repo)"; exit 1; }

DAY="${1:?usage: freshness-review-retry.sh <YYYY-MM-DD> [pinned-sha]}"
PIN_SHA="${2:-$(git rev-parse HEAD)}"
MIN_LEFT="${FRESHNESS_RETRY_MIN:-5}"
WORK="$HOME/.claude/freshness-review"
BATCH="$WORK/batch-$DAY.json"
APPLY_LOG="$WORK/apply-$DAY.log"
NOTE="data/audits/freshness-review-$DAY.md"
R_BATCH="$WORK/batch-$DAY-retry.json"
R_ENTRIES="$WORK/entries-$DAY-retry.json"
R_NOTE="$WORK/note-$DAY-retry.md"
R_RUN="$WORK/run-$DAY-retry.log"
R_APPLY="$WORK/apply-$DAY-retry.log"
NODE="node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON --env-file=apps/web/.env.local"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] retry: $*"; }

[ -f "$BATCH" ] && [ -f "$APPLY_LOG" ] || { echo "RETRY none (no batch or apply log for $DAY)"; exit 0; }
[ -f "$R_APPLY" ] && grep -q '^RESULT ' "$R_APPLY" && { echo "RETRY none (already ran: $(grep -o '^RESULT .*' "$R_APPLY" | tail -1))"; exit 0; }

# Left out = in the batch, but not stamped, queued or escalated by the first stamp.
# (Escalated ids belong to the settle step; dropped ids had sources the validator
# refused, so they get the second pass too.)
LEFT="$(node -e '
  const fs = require("fs");
  const [batchF, logF, outF] = process.argv.slice(1);
  const b = JSON.parse(fs.readFileSync(batchF, "utf8"));
  const log = fs.readFileSync(logF, "utf8");
  const done = new Set();
  for (const m of log.matchAll(/^stamped \d+: (.*)$/gm)) for (const id of m[1].split(",")) if (id.trim()) done.add(id.trim());
  for (const m of log.matchAll(/^(?:queued|escalated) ([a-z0-9-]+):/gm)) done.add(m[1]);
  const left = b.destinations.filter((d) => !done.has(d.id));
  fs.writeFileSync(outF, JSON.stringify({ ...b, retry_of: batchF, destinations: left }, null, 2));
  console.log(left.length);' "$BATCH" "$APPLY_LOG" "$R_BATCH")" || { echo "RETRY none (could not build retry batch)"; exit 1; }

if [ "${LEFT:-0}" -lt "$MIN_LEFT" ] 2>/dev/null; then
  rm -f "$R_BATCH"
  echo "RETRY none ($LEFT left out, under the $MIN_LEFT threshold)"
  exit 0
fi
say "$LEFT id(s) left out by the first pass — running the second pass"
R_SHA="$(shasum -a 256 "$R_BATCH" | cut -d' ' -f1)"
rm -f "$R_ENTRIES" "$R_NOTE"

PROMPT="Second pass of the NakshIQ weekly destination freshness review for $DAY. The first pass left every destination in this batch without a verdict. Read .claude/commands/freshness-review.md first and follow it exactly; read CLAUDE.md for project rules. Work in this repo.

BATCH=$R_BATCH  (do not modify it)
ENTRIES=$R_ENTRIES  (write your verdicts here)
NOTE=$R_NOTE  (write the run note here; do not commit)

The first pass gave its reason for each one in $NOTE, under the skipped section. Most were 'no qualifying source' because its sub-agents only found travel blogs and aggregators. Do the research the first pass did not: for each id, open the official page that describes the place today yourself (state tourism department, district .nic.in, forest department) or an article from a host in NEWS_HOSTS, and search for recent closures. A quiet place with that official page, a second host, and a search that found nothing IS a confirmation, as the procedure says. A notice_text lapsing now needs a source dated within the last 3 weeks to renew; if the closure is over, say so. Do not leave an id out because time is short: this whole session is for these ids. Leave one out only after you searched and found nothing to go on, and say what you searched.

You are running LOCALLY, so WebSearch, WebFetch and curl reach .gov.in and .nic.in. Those hosts are slow and often need a retry before they answer.

You CANNOT write to the database and must not try: no Supabase MCP, and never run freshness-review.mjs with --commit. The wrapper stamps confirmed destinations after you finish."

claude -p "$PROMPT" --model sonnet \
  --allowedTools "Read,Glob,Grep,Bash,Write,Edit,WebSearch,WebFetch,Task" \
  --permission-mode acceptEdits --add-dir "$WORK" --max-turns 250 \
  > "$R_RUN" 2>&1
say "claude exit=$?; tail:"; tail -2 "$R_RUN"

if [ "$(shasum -a 256 "$R_BATCH" | cut -d' ' -f1)" != "$R_SHA" ]; then
  echo "RETRY none (retry batch changed during the session; nothing stamped)"; exit 1
fi
[ -f "$R_ENTRIES" ] || { echo "RETRY none (second pass wrote no entries)"; exit 1; }

PINNED="scripts/.freshness-review.pinned-retry-$$.mjs"
git show "$PIN_SHA:scripts/freshness-review.mjs" > "$PINNED" \
  || { rm -f "$PINNED"; echo "RETRY none (cannot read pinned validator at $PIN_SHA)"; exit 1; }
$NODE "$PINNED" apply --batch "$R_BATCH" --entries "$R_ENTRIES" --commit > "$R_APPLY" 2>&1
APPLY_RC=$?
rm -f "$PINNED"
cat "$R_APPLY"
R_RESULT="$(grep -o '^RESULT .*' "$R_APPLY" | tail -1)"
[ $APPLY_RC -eq 0 ] && [ -n "$R_RESULT" ] || { echo "RETRY none (second-pass stamp failed, rc=$APPLY_RC)"; exit 1; }

if [ -f "$NOTE" ]; then
  {
    echo; echo "## Second pass ($LEFT ids the first pass left out)"; echo
    [ -f "$R_NOTE" ] && cat "$R_NOTE"
    echo; echo '```'; cat "$R_APPLY"; echo '```'
  } >> "$NOTE"
fi
echo "RETRY $R_RESULT"
exit 0
}
