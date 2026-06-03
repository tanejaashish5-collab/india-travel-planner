// Extract each safari research agent's final JSON array from its task-output
// JSONL transcript, consolidate to one raw.json (20 parks), print a small summary.
// Avoids hand-transcription. Run: node scripts/_safari-seed/extract.mjs
import fs from "node:fs";
import path from "node:path";

const TASK_DIR =
  "/private/tmp/claude-501/-Users-ashishtaneja-Desktop-India-Travel-Planner/329f0796-17dc-4060-aa88-341f93f8ad2b/tasks";
const FILES = [
  "ab3d0cc6377c5cad0.output", // North
  "ab1787b6783ad0f7b.output", // Central
  "a335e0b0344fcb13b.output", // South Karnataka
  "a9365caecce1d39e4.output", // Kerala + Gujarat
  "a3d3617013dc78899.output", // East / NE
];

// Walk any parsed value, collect string leaves.
function collectStrings(v, out) {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

// Pull the JSON array out of a chunk of agent text (fenced ```json ... ``` or bare [ ... ]).
function extractArray(text) {
  let body = text;
  const fence = text.indexOf("```json");
  if (fence !== -1) {
    const start = text.indexOf("\n", fence) + 1;
    const end = text.indexOf("```", start);
    if (end !== -1) body = text.slice(start, end);
  }
  const first = body.indexOf("[");
  const last = body.lastIndexOf("]");
  if (first === -1 || last === -1) return null;
  try {
    return JSON.parse(body.slice(first, last + 1));
  } catch {
    return null;
  }
}

const all = [];
for (const f of FILES) {
  const raw = fs.readFileSync(path.join(TASK_DIR, f), "utf8");
  const strings = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      collectStrings(JSON.parse(line), strings);
    } catch {
      strings.push(line); // not JSONL? keep raw
    }
  }
  // Candidate strings that look like the final answer.
  const candidates = strings
    .filter((s) => s.includes('"destination_id"'))
    .sort((a, b) => b.length - a.length);
  let arr = null;
  for (const c of candidates) {
    arr = extractArray(c);
    if (Array.isArray(arr) && arr.length) break;
  }
  if (!arr) {
    console.error(`!! ${f}: could NOT extract array (candidates=${candidates.length})`);
    continue;
  }
  console.log(`${f}: ${arr.length} parks -> ${arr.map((p) => p.destination_id).join(", ")}`);
  all.push(...arr);
}

const outPath = path.join(process.cwd(), "scripts/_safari-seed/raw.json");
fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
console.log(`\nTOTAL ${all.length} parks written to ${outPath}`);
