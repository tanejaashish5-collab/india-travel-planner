#!/usr/bin/env python3
"""merge_jsonl.py — race-safe merge for post_log + theme_usage JSONL files.

Used by .github/workflows/autoposter.yml to union the local snapshot
(/tmp/autoposter-snap/*.jsonl) with whatever the remote autoposter-state
branch already has, so concurrent runs preserve each other's appended
entries instead of last-write-wins clobbering them.

Dedupe keys per file:
  - post_log.jsonl    → (post_id, platform, timestamp)
  - theme_usage.jsonl → (dimension, item_id, ts[:10])  (one stamp per day)

Idempotent — safe to run multiple times.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path


def _merge_one(remote: Path, local: Path, key_fn, sort_fn) -> int:
    """Union `remote` + `local` into `remote`. Returns merged-line count."""
    seen: set = set()
    merged: list[dict] = []
    for src in (remote, local):
        if not src.exists():
            continue
        try:
            with open(src, encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        entry = json.loads(line)
                    except json.JSONDecodeError:
                        continue
                    k = key_fn(entry)
                    if k in seen:
                        continue
                    seen.add(k)
                    merged.append(entry)
        except OSError:
            continue
    if not merged:
        return 0
    merged.sort(key=sort_fn)
    remote.parent.mkdir(parents=True, exist_ok=True)
    with open(remote, "w", encoding="utf-8") as f:
        for e in merged:
            f.write(json.dumps(e, ensure_ascii=False, default=str) + "\n")
    return len(merged)


def main() -> int:
    worktree = Path("/tmp/autoposter-state-worktree/nakshiq-autoposter/data")
    snap = Path("/tmp/autoposter-snap")
    if len(sys.argv) > 1:
        # Allow override for local smoke-testing
        worktree = Path(sys.argv[1])
    if len(sys.argv) > 2:
        snap = Path(sys.argv[2])

    plans = [
        {
            "name": "post_log.jsonl",
            "remote": worktree / "post_log.jsonl",
            "local":  snap / "post_log.jsonl",
            "key":    lambda e: (e.get("post_id"), e.get("platform"), e.get("timestamp")),
            "sort":   lambda e: e.get("timestamp") or "",
        },
        {
            "name": "theme_usage.jsonl",
            "remote": worktree / "theme_usage.jsonl",
            "local":  snap / "theme_usage.jsonl",
            "key":    lambda e: (e.get("dimension"), e.get("item_id"), (e.get("ts") or "")[:10]),
            "sort":   lambda e: e.get("ts") or "",
        },
        # 2026-05-26 (Phase C): posted_today.jsonl — durable mirror of the
        # per-account same-day gate. Key is (account_key, date) so each
        # account's "already posted today" stamp survives concurrent runs
        # without one overwriting the other's entry.
        {
            "name": "posted_today.jsonl",
            "remote": worktree / "posted_today.jsonl",
            "local":  snap / "posted_today.jsonl",
            "key":    lambda e: (e.get("key") or e.get("account_id"),
                                 e.get("date") or (e.get("ts") or "")[:10]),
            "sort":   lambda e: e.get("ts") or "",
        },
    ]

    for p in plans:
        n = _merge_one(p["remote"], p["local"], p["key"], p["sort"])
        print(f"merged {p['name']}: {n} unique entries")

    return 0


if __name__ == "__main__":
    sys.exit(main())
