// Splits each prose SQL file by destination, writes one file per dest.
// Output: /tmp/prose-<dest_id>.sql for each dest.
import { readFileSync, writeFileSync } from "fs";

const files = [
  "data/research/prose/lakshadweep-batch-2026-05-10.sql",
  "data/research/prose/south-uts-batch-2026-05-10.sql",
  "data/research/prose/mountain-batch-2026-05-10.sql",
];

for (const path of files) {
  const sql = readFileSync(path, "utf8");
  // Each statement = INSERT INTO ... ON CONFLICT ... ;
  // Match groups: capture the INSERT (with VALUES) + the ON CONFLICT clause + ;
  const stmtRe = /INSERT INTO destination_months[\s\S]*?ON CONFLICT[\s\S]*?;\s*\n/g;
  const stmts = sql.match(stmtRe) || [];

  // Group by dest_id (extract from VALUES ('<dest_id>', ...
  const byDest = {};
  for (const s of stmts) {
    const m = s.match(/VALUES \('([^']+)'/);
    if (!m) continue;
    const destId = m[1];
    (byDest[destId] ||= []).push(s);
  }

  for (const [destId, list] of Object.entries(byDest)) {
    if (list.length !== 12) {
      console.error(`WARNING: ${destId} has ${list.length} months (expected 12)`);
    }
    writeFileSync(`/tmp/prose-${destId}.sql`, list.join("\n"));
    console.log(`${destId}: ${list.length} months → /tmp/prose-${destId}.sql (${(list.join("\n").length/1024).toFixed(1)}KB)`);
  }
}
