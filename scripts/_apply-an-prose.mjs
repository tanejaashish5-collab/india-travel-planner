#!/usr/bin/env node
/**
 * Apply session 2 AN remainder prose. Reads two SQL files (cluster A + B),
 * splits on INSERT statements, executes each via the supabase REST API
 * raw-SQL extension is unavailable so we parse + upsert via the JS client.
 *
 * Approach: parse each VALUES tuple back into a row object, .upsert() in
 * batches of 25.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

function parseSqlFile(path) {
  const sql = readFileSync(path, "utf8");
  const rows = [];
  let from = 0;
  while (true) {
    const v = sql.indexOf("VALUES (", from);
    if (v < 0) break;
    const open = v + "VALUES ".length;
    const { vals, end } = parseTuple(sql, open);
    if (vals.length !== 8) throw new Error(`bad tuple length ${vals.length}`);
    const [dest, month, score, verdict, note, why_go, why_not, prose_lead] = vals;
    rows.push({
      destination_id: dest,
      month,
      score,
      verdict,
      note,
      why_go,
      why_not,
      prose_lead,
    });
    from = end;
  }
  return rows;
}

function parseTuple(text, startIdx) {
  let i = startIdx + 1;
  const vals = [];
  while (i < text.length) {
    while (text[i] === " " || text[i] === "\n" || text[i] === "\t") i++;
    if (text[i] === ")") return { vals, end: i + 1 };
    if (text[i] === "'") {
      i++;
      let s = "";
      while (i < text.length) {
        if (text[i] === "'" && text[i + 1] === "'") {
          s += "'";
          i += 2;
        } else if (text[i] === "'") {
          i++;
          break;
        } else {
          s += text[i];
          i++;
        }
      }
      vals.push(s);
    } else if (text.slice(i, i + 4) === "NULL") {
      vals.push(null);
      i += 4;
    } else if (/[0-9-]/.test(text[i])) {
      let n = "";
      while (/[0-9.-]/.test(text[i])) {
        n += text[i];
        i++;
      }
      vals.push(Number(n));
    } else {
      throw new Error(`parse fail at idx ${i}: '${text.slice(i, i + 40)}'`);
    }
    while (text[i] === " " || text[i] === "\n" || text[i] === "\t") i++;
    if (text[i] === ",") i++;
  }
  throw new Error("EOF inside tuple");
}

const files = [
  "data/research/eateries/an-cluster-a-2026-05-08.sql",
  "data/research/eateries/an-cluster-b-2026-05-08.sql",
];

let total = 0;
for (const f of files) {
  const rows = parseSqlFile(f);
  console.log(`${f}: parsed ${rows.length} rows`);
  const BATCH = 25;
  for (let i = 0; i < rows.length; i += BATCH) {
    const slice = rows.slice(i, i + BATCH);
    const { error } = await supabase
      .from("destination_months")
      .upsert(slice, { onConflict: "destination_id,month" });
    if (error) {
      console.error(`  batch ${i} error: ${error.message}`);
      process.exit(1);
    }
    total += slice.length;
    console.log(`  upserted ${i + slice.length}/${rows.length}`);
  }
}

console.log(`\ntotal upserted: ${total} rows`);
