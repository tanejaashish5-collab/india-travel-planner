#!/usr/bin/env node
/**
 * Run one or more .sql files against the linked Supabase project through the Management API
 * (the same endpoint the Supabase MCP tool uses), so a reviewed SQL file is applied byte-for-byte.
 *
 *   node --env-file=apps/web/.env.local scripts/run-sql-file.mjs <file.sql> [more.sql ...]
 *   DRY=1 node --env-file=apps/web/.env.local scripts/run-sql-file.mjs <file.sql>   # final COMMIT -> ROLLBACK
 *
 * Why: SUPABASE_DB_URL is not in the env, `supabase db push` does not match how this project's
 * migrations are recorded (timestamp versions written by the MCP), and retyping a 400 KB migration
 * into a tool call is how transcription errors happen. Needs SUPABASE_ACCESS_TOKEN and
 * NEXT_PUBLIC_SUPABASE_URL (for the project ref). Does NOT record anything in schema_migrations.
 * Files run in order; each file is one request. Stops at the first failure.
 */
import fs from "node:fs";

const token = process.env.SUPABASE_ACCESS_TOKEN;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!token || !url) {
  console.error("Need SUPABASE_ACCESS_TOKEN and NEXT_PUBLIC_SUPABASE_URL: run with node --env-file=apps/web/.env.local");
  process.exit(1);
}
const ref = new URL(url).hostname.split(".")[0];
const files = process.argv.slice(2);
if (!files.length) { console.error("usage: run-sql-file.mjs <file.sql> [...]"); process.exit(1); }

for (const file of files) {
  let sql = fs.readFileSync(file, "utf8");
  if (process.env.DRY === "1") {
    const i = sql.lastIndexOf("COMMIT;");
    if (i === -1) { console.error(`${file}: DRY=1 needs a final COMMIT; to turn into ROLLBACK;`); process.exit(1); }
    sql = sql.slice(0, i) + "ROLLBACK;" + sql.slice(i + "COMMIT;".length);
  }
  const t0 = Date.now();
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  const ms = Date.now() - t0;
  console.log(`${file}: HTTP ${res.status} in ${ms} ms (${sql.length} bytes${process.env.DRY === "1" ? ", DRY, rolled back" : ""})`);
  console.log(text.length > 2000 ? text.slice(0, 2000) + " …" : text);
  if (!res.ok) { console.error("Stopped at first failure."); process.exit(1); }
}
