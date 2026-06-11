#!/usr/bin/env bash
# vs-expand.sh — re-run the /vs/ comparison-page expansion pipeline end to end.
#
# The /vs/ pages convert at 2.8–10.3% CTR vs the 0.4% site average — the
# highest-ROI traffic surface. This wrapper re-runs the four-stage pipeline
# that grows the curated set. All four stages are idempotent and additive:
# a re-run only ever appends NEW pairs, never removes shipped ones.
#
#   1. _mine-vs-queries.mjs   GSC comparison-intent queries -> demand-proven pairs
#   2. _gen-vs-clusters.mjs   region/type cluster fill, GSC-popularity ranked
#   3. _validate-vs-pairs.mjs render-health gate (no pair ships a 404)
#   4. _emit-vs-pairs-block.mjs  writes apps/web/src/lib/vs-pairs.generated.ts
#
# Usage:   bash scripts/vs-expand.sh [gscWindowDays] [clusterTarget]
#          (defaults: 90-day GSC window, 320 cluster pairs)
#
# Cadence: low-yield to re-run monthly at current traffic (~1.1K MUV surfaced
# only 2 new demand pairs). Re-run quarterly, or sooner once traffic grows and
# GSC shows more "X vs Y" searches. Needs .secrets/gsc-* + apps/web/.env.local.
#
# After it finishes:
#   - review the apps/web/src/lib/vs-pairs.generated.ts diff
#   - (optional) cd apps/web && SKIP_ENV_CHECK=1 npm run build   # Vercel is authoritative
#   - commit vs-pairs.generated.ts + data/cro/vs-*.json, push, deploy

set -euo pipefail
cd "$(dirname "$0")/.."

WINDOW="${1:-90}"
TARGET="${2:-320}"

echo "▶ 1/4  mining GSC comparison queries (${WINDOW}d window)"
node scripts/_mine-vs-queries.mjs "$WINDOW"

echo "▶ 2/4  generating region/type cluster fill (target ${TARGET})"
node scripts/_gen-vs-clusters.mjs "$TARGET"

echo "▶ 3/4  validating render-health of every candidate"
node scripts/_validate-vs-pairs.mjs

echo "▶ 4/4  emitting apps/web/src/lib/vs-pairs.generated.ts"
node scripts/_emit-vs-pairs-block.mjs

echo
echo "✓ pipeline done — review the vs-pairs.generated.ts diff, then commit + deploy."
