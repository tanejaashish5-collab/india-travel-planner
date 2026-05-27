/**
 * Apply Phase A depth-backfill SQL files (96 sparse legacy treks)
 * via the Supabase Management API. Run after all `scripts/_trek-fill-depth/agent-a*.sql`
 * files exist.
 *
 * Each file is sent as its own request (so one bad file doesn't kill the batch).
 * All UPDATEs are idempotent via COALESCE — re-running is safe and only fills NULLs.
 *
 * Run: node --env-file=apps/web/.env.local scripts/_apply-trek-fill-depth.mjs
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
console.log(`Project ref: ${projectRef}`);

const DEPTH_DIR = resolve(__dirname, "_trek-fill-depth");
const files = readdirSync(DEPTH_DIR)
  .filter((f) => f.startsWith("agent-a") && f.endsWith(".sql"))
  .sort();
console.log(`Found ${files.length} depth files: ${files.join(", ")}`);

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
for (const f of files) {
  const sql = readFileSync(join(DEPTH_DIR, f), "utf-8");
  process.stdout.write(`  ${f} (${(sql.length / 1024).toFixed(1)} KB) … `);
  try {
    await runSql(sql, f);
    console.log("✓");
    okCount += 1;
  } catch (err) {
    console.log("✗");
    console.error(`    ${err.message}`);
    failCount += 1;
  }
}
console.log(`\nApplied ${okCount}/${files.length} files (${failCount} failures)`);

// Verify Phase A coverage
const verifySql = `
  SELECT
    COUNT(*) AS total,
    COUNT(day_by_day) FILTER (WHERE jsonb_array_length(COALESCE(day_by_day,'[]'::jsonb)) > 0) AS day_by_day,
    COUNT(trail_points) FILTER (WHERE jsonb_array_length(COALESCE(trail_points,'[]'::jsonb)) > 0) AS trail_points,
    COUNT(how_to_reach) AS how_to_reach,
    COUNT(permit_details) AS permit_details,
    COUNT(cost_estimate) AS cost_estimate,
    COUNT(water_sources) AS water_sources,
    COUNT(network_coverage) AS network_coverage,
    COUNT(emergency_contacts) AS emergency_contacts,
    COUNT(nearest_hospital) AS nearest_hospital,
    COUNT(source_url) AS source_url,
    COUNT(last_reviewed_at) AS last_reviewed_at
  FROM treks;
`;
const verify = await runSql(verifySql, "verify");
console.log("\n=== Phase A population audit (post-apply) ===");
console.table(verify);

if (failCount > 0) process.exit(1);
