#!/bin/bash
# privacy-guard.sh — pre-commit check: this repo is PUBLIC, so refuse any commit
# that ADDS a personal address or a secret-shaped string.
#
# Why (2026-09-30): Cowork GSC audits wrote a family member's Gmail, five Veo
# account addresses and the owner's Gmail into committed reports, and a live
# Supabase service_role key sat in env.example history for six months. A rule
# in a prompt is a suggestion; this hook is the control for every commit made
# on this Mac (Claude sessions, LaunchAgents, audit-commit-guard).
# It does NOT see commits made on GitHub Actions or cloud routines.
#
# Checks ADDED lines only, so existing content never blocks unrelated work.
#   1. Every literal in .secrets/never-publish.txt (gitignored; one per line,
#      case-insensitive). The list lives outside the repo on purpose: a guard
#      that hardcodes the addresses it guards publishes them.
#   2. Any email address in gsc-audits/, ga4-audits/ or qa/findings/, except system
#      senders at google.com / nakshiq.com.
#   3. Secret-shaped strings: Supabase secret keys, JWTs.
#
# Install:  ln -sf ../../scripts/privacy-guard.sh .git/hooks/pre-commit
# Bypass (only for a verified false positive): git commit --no-verify

set -uo pipefail
ROOT="$(git rev-parse --show-toplevel)"
LIST="$ROOT/.secrets/never-publish.txt"
EMAIL_RE='[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}'
SECRET_RE='sb_secret_[A-Za-z0-9_-]{10,}|eyJhbGciOi[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}'

# "path<TAB>added line" for every added line in the staged diff.
added() {
  git diff --cached --no-color --unified=0 --diff-filter=ACMR -- "$@" | awk '
    /^\+\+\+ b\// { path = substr($0, 7); next }
    /^\+/ && !/^\+\+\+/ { print path "\t" substr($0, 2) }'
}

HITS=""
if [ -s "$LIST" ]; then
  PATTERNS="$(grep -vE '^\s*(#|$)' "$LIST")"
  if [ -n "$PATTERNS" ]; then
    H="$(added | grep -iF -e "$PATTERNS" | cut -f1 | sort -u)"
    [ -n "$H" ] && HITS="$HITS
  personal address from .secrets/never-publish.txt in:
$(printf '%s\n' "$H" | sed 's/^/    /')"
  fi
fi

# System senders (Google's GSC no-reply, our own nakshiq.com) are not personal.
H="$(added gsc-audits ga4-audits qa/findings | while IFS=$'\t' read -r path line; do
       printf '%s\n' "$line" | grep -oE "$EMAIL_RE" \
         | grep -viqE '@(google\.com|nakshiq\.com|nakshiq\.test)$' && echo "$path"
     done | sort -u)"
[ -n "$H" ] && HITS="$HITS
  email address in an audit/QA report (reports never need one) in:
$(printf '%s\n' "$H" | sed 's/^/    /')"

H="$(added | grep -E "$SECRET_RE" | cut -f1 | sort -u)"
[ -n "$H" ] && HITS="$HITS
  secret-shaped string (Supabase secret key / JWT) in:
$(printf '%s\n' "$H" | sed 's/^/    /')"

if [ -n "$HITS" ]; then
  echo "privacy-guard: REFUSING commit, this repo is public.$HITS" >&2
  echo "Replace the value with a label (e.g. [owner-account]) or an env var, then commit again." >&2
  exit 1
fi
exit 0
