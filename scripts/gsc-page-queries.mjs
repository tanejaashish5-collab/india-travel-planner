import { readFileSync } from "node:fs"; import path from "node:path";
const ROOT = process.cwd(); const SITE_URL = process.env.GSC_SITE_URL;
const sd = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const cj = JSON.parse(readFileSync(path.join(sd, "gsc-oauth-client.json"), "utf8")); const cfg = cj.web ?? cj.installed ?? cj.desktop;
const rt = process.env.GSC_OAUTH_REFRESH_TOKEN ?? readFileSync(path.join(sd, "gsc-refresh-token.txt"), "utf8").trim();
const { google } = await import("googleapis"); const o = new google.auth.OAuth2(cfg.client_id, cfg.client_secret); o.setCredentials({ refresh_token: rt });
const gsc = google.searchconsole({ version: "v1", auth: o });
const iso = d => d.toISOString().slice(0,10); const end = new Date(); end.setDate(end.getDate()-2); const start = new Date(end); start.setDate(start.getDate()-28);
for (const pg of ["/hi/cost/jaisalmer","/hi/cost/mussoorie","/hi/cost/manali","/hi/cost/darjeeling","/hi/cost/ayodhya","/en/destination/manali/october"]) {
  const { data } = await gsc.searchanalytics.query({ siteUrl: SITE_URL, requestBody: { startDate: iso(start), endDate: iso(end), dimensions: ["query"], rowLimit: 8,
    dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: pg }] }] } });
  console.log(`\n${pg}`);
  for (const r of data.rows ?? []) console.log(`  pos ${r.position.toFixed(1)}  imp ${String(r.impressions).padStart(5)}  clk ${String(r.clicks).padStart(3)}  ${r.keys[0]}`);
}
