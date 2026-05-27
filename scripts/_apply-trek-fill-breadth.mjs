/**
 * Apply trek-fill-breadth SQL files (B2, B3, B4, B5) via Supabase Management API.
 * B1 was applied partially via MCP earlier; rerunning is safe (ON CONFLICT).
 *
 * Each file is sent as a separate request, so one failure doesn't kill the batch.
 * All INSERTs are idempotent via ON CONFLICT (id) DO NOTHING.
 *
 * Run: node --env-file=apps/web/.env.local scripts/_apply-trek-fill-breadth.mjs
 */
import { readFileSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!token || !projectUrl) {
  console.error("Need SUPABASE_ACCESS_TOKEN + NEXT_PUBLIC_SUPABASE_URL in env.");
  process.exit(1);
}
const projectRef = new URL(projectUrl).hostname.split(".")[0];
const queryUrl = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;
console.log(`Project ref: ${projectRef}\n`);

const BREADTH_DIR = resolve(__dirname, "_trek-fill-breadth");
const files = readdirSync(BREADTH_DIR)
  .filter((f) => f.startsWith("agent-b") && f.endsWith(".sql"))
  .sort();
console.log(`Found ${files.length} breadth files:\n${files.map((f) => `  - ${f}`).join("\n")}\n`);

async function runSql(sql, label) {
  const res = await fetch(queryUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${label} failed [${res.status}]: ${body.slice(0, 1200)}`);
  }
  return res.json();
}

let okCount = 0;
let failCount = 0;
const results = [];

for (const f of files) {
  const sql = readFileSync(join(BREADTH_DIR, f), "utf-8");
  const trekCount = (sql.match(/INSERT INTO treks/g) || []).length;
  process.stdout.write(`  ${f} (${(sql.length / 1024).toFixed(1)} KB, ${trekCount} INSERT statements) … `);
  try {
    const result = await runSql(sql, f);
    console.log("✓");
    okCount += 1;
    results.push({ file: f, status: "✓", trekCount });
  } catch (err) {
    console.log("✗");
    console.error(`    ${err.message}`);
    failCount += 1;
    results.push({ file: f, status: "✗", trekCount, error: err.message });
  }
}

console.log(`\n=== Trek-fill-breadth apply summary ===`);
console.log(`Applied ${okCount}/${files.length} files (${failCount} failures)\n`);
console.table(results);

// Verify coverage across all trek IDs
const verifySql = `
  SELECT
    COUNT(*) AS total_treks,
    COUNT(*) FILTER (WHERE description IS NOT NULL) AS with_description,
    COUNT(*) FILTER (WHERE campsites::text != '{}') AS with_campsites,
    COUNT(*) FILTER (WHERE day_by_day::text != '[]') AS with_day_by_day,
    COUNT(*) FILTER (WHERE cost_estimate::text != '{}') AS with_cost,
    COUNT(*) FILTER (WHERE source_url IS NOT NULL) AS with_source
  FROM treks;
`;

console.log("=== Verification Query (all treks in DB) ===\n");
try {
  const verify = await runSql(verifySql, "verify");
  console.table(verify);
} catch (err) {
  console.error("Verification query failed:", err.message);
}

if (failCount > 0) process.exit(1);
console.log("\n✓ Trek-fill-breadth apply complete!");
