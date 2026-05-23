#!/usr/bin/env node
/* eslint-disable no-console */
// Find every translated Hindi string that still carries a lowercase Latin
// word (a code-mixing leak, ignoring URLs/domains) and emit it alongside its
// English source, so a single polish agent can re-translate just those.
//
// Usage:  node scripts/_extract-leaks.mjs
// Output: data/research/translations/_leaks-to-fix.json

import path from "node:path";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const DIR = path.resolve(import.meta.dirname, "..", "data", "research", "translations");
const ALLOW = new Set(["am", "pm", "km", "kg", "wi", "fi", "ac", "kmph", "sq", "ml"]);
const keyOf = (r) =>
  r.table === "destination_stay_picks" ? `pick:${r.destination_id}:${r.slot}` : `${r.table}:${r.id}`;

function hasRealLeak(v) {
  const stripped = v
    .replace(/(https?:\/\/)?[A-Za-z0-9.-]+\.(com|org|gov|net|in|nic|co|info)\b\S*/gi, " ")
    .replace(/\S+@\S+/g, " ");
  for (const w of stripped.match(/[A-Za-z][A-Za-z'’-]*/g) ?? []) {
    const bare = w.replace(/[^A-Za-z]/g, "");
    if (bare.length >= 3 && bare[0] === bare[0].toLowerCase() && !ALLOW.has(bare.toLowerCase())) return true;
  }
  return false;
}

const out = [];
for (const hf of readdirSync(DIR).filter((f) => /^all-hi-c\d+\.json$/.test(f)).sort()) {
  const cNum = hf.match(/c\d+/)[0];
  const en = JSON.parse(readFileSync(path.join(DIR, `_all-en-${cNum}.json`), "utf8"));
  const enByKey = new Map(en.map((r) => [keyOf(r), r]));
  const hi = JSON.parse(readFileSync(path.join(DIR, hf), "utf8"));
  for (const e of hi) {
    const src = enByKey.get(keyOf(e));
    if (!src) continue;
    for (const [field, v] of Object.entries(e.hi ?? {})) {
      if (typeof v === "string" && hasRealLeak(v)) {
        out.push({
          chunk: cNum,
          table: e.table,
          ...(e.table === "destination_stay_picks"
            ? { destination_id: e.destination_id, slot: e.slot }
            : { id: e.id }),
          field,
          en: src.fields[field],
          hi_current: v,
        });
      }
    }
  }
}

writeFileSync(path.join(DIR, "_leaks-to-fix.json"), JSON.stringify(out, null, 2));
console.log(`${out.length} leaky strings → data/research/translations/_leaks-to-fix.json`);
