#!/usr/bin/env node
/**
 * daily-brief.mjs — NakshIQ Instagram seeding brief (2026-09-08)
 *
 * Does every part of the daily seeding routine that a machine may do:
 *   1. rotates through the account pool, least-recently-served first
 *   2. re-verifies each handle against its PUBLIC profile page (no login,
 *      no session, read-only) and drops dead / renamed ones
 *   3. drafts a comment line per starred target from the cached NakshIQ
 *      verdict pack, so the founder pastes a real fact rather than "nice pic"
 *   4. renders a dark-theme PDF and posts a clickable local notification
 *
 * What it deliberately does NOT do: log in, follow, comment, like, or DM.
 * Instagram bans engagement automation and the enforcement lands on the
 * account, not the script. The taps stay human — see
 * "India Travel Planner/docs/instagram-reset-2026-09-08.md".
 *
 * Runs under ~/Automation (never ~/Desktop — launchd is TCC-blocked there)
 * and needs no secrets: the verdict pack is a static JSON refreshed from a
 * Claude session, and profile checks hit public pages only.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = "/Users/ashishtaneja/Automation/nakshiq-ig";
const POOL = path.join(ROOT, "pool.json");
const VERDICTS = path.join(ROOT, "data", "verdicts.json");
const SERVED = path.join(ROOT, "data", "served.json");
// Primary output lives under ~/Automation: launchd cannot write to ~/Desktop
// (TCC blocks it silently). The Reports copy is best-effort for manual runs.
const OUT_DIR = path.join(ROOT, "briefs");
const MIRROR_DIR = "/Users/ashishtaneja/Desktop/Reports";
const LOG = path.join(ROOT, "logs", "daily-brief.log");

const FOLLOW_TARGET = 20; // accounts to serve per day
const COMMENT_TARGET = 10; // of those, how many get a drafted comment

const MONTHS = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

function log(msg) {
  const line = `${new Date().toISOString()}  ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOG, line + "\n"); } catch {}
}

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return fallback; }
}

/** Least-recently-served first, so the pool rotates instead of repeating. */
function pickAccounts(pool, served, n) {
  return [...pool]
    .sort((a, b) => (served[a.handle] || "").localeCompare(served[b.handle] || ""))
    .slice(0, n);
}

/** Public profile read. No login, no cookies, no writes. */
async function verify(page, handle) {
  try {
    await page.goto(`https://www.instagram.com/${handle}/`, {
      waitUntil: "domcontentloaded", timeout: 30000,
    });
    await page.waitForTimeout(2200 + Math.random() * 1200);
    const desc = await page.evaluate(() =>
      document.querySelector('meta[name="description"]')?.content || document.title);
    // Instagram serves at least two description variants and swaps between
    // them without notice: "18 Followers, 21 Following, 675 Posts - Name" and
    // "8,079 followers, 259 following, 446 posts – Name". The first version of
    // this matcher only accepted the capitalised one, so on 2026-09-08 every
    // handle read as "unreadable" and the job still reported success. Match
    // case-insensitively and accept either dash.
    const m = desc.match(/([\d.,]+[KM]?)\s+followers?,\s*([\d.,]+[KM]?)\s+following,\s*([\d.,]+[KM]?)\s+posts/i);
    if (!m) return { ok: false, reason: /isn't available|page not found/i.test(desc) ? "profile gone" : "unreadable" };
    return { ok: true, followers: m[1], posts: m[3] };
  } catch (e) {
    return { ok: false, reason: String(e.message).slice(0, 60) };
  }
}

/** One real, checkable sentence built from our own verified data. */
function draftComment(acct, verdicts, month, used) {
  const pool = verdicts.filter(
    (v) => acct.states.includes(v.state_id) && v.month === month && v.sentence && !used.has(v.id));
  if (!pool.length) return null;
  // Prefer a decisive verdict — a "skip" or a high "go" reads as expertise,
  // a middling score reads as filler.
  pool.sort((a, b) => Math.abs((b.score ?? 3) - 3) - Math.abs((a.score ?? 3) - 3));
  const v = pool[Math.floor(Math.random() * Math.min(4, pool.length))];
  used.add(v.id);

  // Turn the site's verdict sentence into something a person would type.
  let s = String(v.sentence);
  // 1. No em/en dashes — house rule for anything posted under his name.
  s = s.replace(/\s*[—–]\s*/g, ", ");
  // 2. Drop the "Go in September," / "Skip," verdict opener. Ten comments all
  //    starting "Go in September" reads as a bot advertising a scoring site.
  s = s.replace(new RegExp(`^\\s*(go|skip|wait|avoid)\\b[^,.]*?(in\\s+${MONTHS[month - 1]})?[,.]?\\s*`, "i"), "");
  // 3. Keep the first one or two real clauses, capped so it stays a comment.
  const parts = s.split(/(?<=[.!?])\s+/).filter(Boolean);
  let line = parts[0] || s;
  if (line.length < 90 && parts[1]) line += " " + parts[1];
  line = line.trim().replace(/\s{2,}/g, " ").replace(/^,\s*/, "");
  if (line.length > 220) line = line.slice(0, 217).replace(/[\s,]+\S*$/, "") + ".";
  line = line.charAt(0).toUpperCase() + line.slice(1);

  return {
    dest: v.name,
    score: v.score,
    label: v.label,
    line: `${v.name}, ${MONTHS[month - 1]}: ${line}`,
  };
}

function renderMarkdown(rows, drafts, month, dead) {
  const today = new Date().toISOString().slice(0, 10);
  const L = [];
  L.push(`# NakshIQ Instagram — seeding brief for ${today}`);
  L.push("");
  L.push(`**Your 15 minutes: ${rows.length} follows, ${drafts.length} comments.**`);
  L.push("");
  L.push("## How to do it (comments are PUBLIC, never a DM)");
  L.push("");
  L.push("1. Open Instagram as @nakshiq. Search the handle, open the profile, tap **Follow**. Do that for every row in the table.");
  L.push("2. For the rows marked ★, tap their **most recent post**, tap the speech-bubble icon, paste the matching line from Comment drafts below, and post it. That is a normal public comment under their photo.");
  L.push("3. **Do not send DMs.** An unsolicited DM from an account someone does not follow reads as spam and usually goes to a request folder nobody opens.");
  L.push("4. Read the post before you paste. If the draft does not fit what you are looking at, change it or skip it. A comment that ignores the photo reads worse than no comment.");
  L.push("5. Best window is 7-9 pm IST, when Indian travel accounts are active. Doing it at a time you will actually do it beats a perfect time you skip.");
  L.push("");
  L.push("## Follow list (all verified live today)");
  L.push("");
  L.push("| Handle | Niche | Followers | Comment |");
  L.push("|---|---|---|---|");
  for (const r of rows) {
    L.push(`| @${r.handle} | ${r.niche} | ${r.followers} | ${r.draft ? "★" : ""} |`);
  }
  L.push("");
  L.push("## Comment drafts");
  L.push("");
  L.push(`Post these as public comments under each account's newest post. Not DMs. Each line is built from our own verified ${MONTHS[month - 1]} data, so it is checkable if someone replies.`);
  L.push("");
  for (const d of drafts) {
    L.push(`**@${d.handle}** · ${d.dest} scores ${d.score}/5 (${d.label})`);
    L.push("");
    L.push(`> ${d.line}`);
    L.push("");
  }
  if (dead.length) {
    L.push("## Dropped today");
    L.push("");
    L.push(dead.map((d) => `- @${d.handle} — ${d.reason}`).join("\n"));
    L.push("");
  }
  L.push("## Rules that keep the account alive");
  L.push("");
  L.push("- No follow/unfollow churn, no growth apps, no bought followers. Any of these gets an action block and resets the test.");
  L.push("- If Instagram shows an \"action blocked\" or \"try again later\" notice, stop for 48 hours and tell me.");
  L.push("- Reply to every comment and DM that lands ON @nakshiq the same day. Replying to inbound is fine and it is the half that compounds. Sending cold DMs out is not.");
  L.push("");
  L.push(`Decision date 2026-10-20: 100 real followers and median reel reach 500, or we stop Instagram and keep YouTube.`);
  return L.join("\n");
}

function toPdf(md, outPdf) {
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split("\n");
  const html = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        i++;
      }
      i--;
      const body = rows.filter((r) => !r.every((c) => /^[-: ]*$/.test(c)));
      html.push("<table><tr>" + body[0].map((c) => `<th>${esc(c)}</th>`).join("") + "</tr>" +
        body.slice(1).map((r) => "<tr>" + r.map((c) => `<td>${esc(c)}</td>`).join("") + "</tr>").join("") + "</table>");
      continue;
    }
    const h = l.match(/^(#+) (.*)/);
    if (h) { html.push(`<h${h[1].length}>${esc(h[2])}</h${h[1].length}>`); continue; }
    const bold = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    if (l.startsWith("> ")) { html.push(`<blockquote>${bold(l.slice(2))}</blockquote>`); continue; }
    // Numbered steps must render as an ordered list: the "how to do it" block
    // is the part the founder was confused by, so it has to look like steps.
    const num = l.match(/^\d+\.\s+(.*)/);
    if (num) {
      const items = [];
      while (i < lines.length) {
        const mm = lines[i].match(/^\d+\.\s+(.*)/);
        if (!mm) break;
        items.push(mm[1]); i++;
      }
      i--;
      html.push("<ol>" + items.map((x) => `<li>${bold(x)}</li>`).join("") + "</ol>");
      continue;
    }
    if (l.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      i--;
      html.push("<ul>" + items.map((x) => `<li>${bold(x)}</li>`).join("") + "</ul>");
      continue;
    }
    if (l.trim()) html.push(`<p>${bold(l)}</p>`);
  }
  const css = `body{background:#111418;color:#e6e6e6;font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:820px;margin:40px auto;padding:0 32px;line-height:1.55;font-size:15px}
h1{color:#fff;font-size:25px;border-bottom:1px solid #333;padding-bottom:8px}h2{color:#f5c26b;font-size:18px;margin-top:28px}
table{border-collapse:collapse;margin:14px 0;width:100%}th,td{border:1px solid #333;padding:6px 10px;text-align:left}th{background:#1c2128;color:#fff}
blockquote{margin:8px 0 14px;padding:9px 14px;border-left:3px solid #f5c26b;background:#171b21;color:#dfe6ee}
ul{margin:4px 0}li{margin:5px 0}strong{color:#fff}`;
  const tmp = path.join(ROOT, "logs", "brief.html");
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html.join("")}</body></html>`);
  execFileSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ["--headless=new", "--disable-gpu", "--no-pdf-header-footer",
     `--print-to-pdf=${outPdf}`, `file://${tmp}`], { stdio: "ignore" });
}

// ── run ───────────────────────────────────────────────────────────────────
const pool = readJson(POOL, { accounts: [] }).accounts;
const verdicts = readJson(VERDICTS, []);
const served = readJson(SERVED, {});
if (!pool.length) { log("FATAL: pool.json empty"); process.exit(1); }
if (!verdicts.length) log("WARNING: verdict pack empty — brief will have no comment drafts");

const month = new Date().getMonth() + 1;
const today = new Date().toISOString().slice(0, 10);

// channel:"chrome" uses the installed Google Chrome, so no browser download
// and nothing under ~/Desktop is imported (launchd is TCC-blocked there).
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36",
});
const page = await ctx.newPage();

const live = [], dead = [];
for (const acct of pickAccounts(pool, served, FOLLOW_TARGET + 6)) {
  if (live.length >= FOLLOW_TARGET) break;
  let r = await verify(page, acct.handle);
  // One retry: a single nav timeout should not permanently drop an account
  // from a pool the founder curated by hand.
  if (!r.ok && r.reason !== "profile gone") {
    await page.waitForTimeout(4000 + Math.random() * 3000);
    r = await verify(page, acct.handle);
  }
  if (r.ok) { live.push({ ...acct, followers: r.followers }); served[acct.handle] = today; }
  else { dead.push({ handle: acct.handle, reason: r.reason }); log(`dropped @${acct.handle} — ${r.reason}`); }
}
await browser.close();

// A run where everything failed must FAIL, not quietly ship an empty brief.
// Scar, same day this was written: a description-format change made all 22
// handles "unreadable" and the job still logged "brief ready" and wrote a PDF
// with zero accounts in it. Total item failure has to set a non-zero exit and
// leave the served dates alone so tomorrow retries the same accounts.
if (live.length === 0) {
  log(`FATAL: 0 of ${dead.length} handles verified — not writing a brief. ` +
      `Reasons: ${[...new Set(dead.map((d) => d.reason))].join(", ")}`);
  try {
    fs.mkdirSync(path.join(ROOT, "logs"), { recursive: true });
    fs.writeFileSync(path.join(ROOT, "logs", "latest-brief.txt"), LOG);
    fs.writeFileSync(path.join(ROOT, "logs", "notify-pending.txt"),
      "0 accounts verified, brief NOT written. Click for the log.");
    execFileSync("/usr/bin/open", ["-n", "-a", path.join(ROOT, "NakshIQ-Brief.app")],
      { stdio: "ignore", timeout: 20000 });
  } catch {}
  process.exit(1);
}
if (live.length < FOLLOW_TARGET / 2) {
  log(`WARNING: only ${live.length}/${FOLLOW_TARGET} handles verified — brief is thin.`);
}

const used = new Set();
const drafts = [];
for (const acct of live) {
  if (drafts.length >= COMMENT_TARGET) break;
  const d = draftComment(acct, verdicts, month, used);
  if (d) { acct.draft = true; drafts.push({ handle: acct.handle, ...d }); }
}

fs.mkdirSync(path.dirname(SERVED), { recursive: true });
fs.writeFileSync(SERVED, JSON.stringify(served, null, 1));

const md = renderMarkdown(live, drafts, month, dead);
fs.mkdirSync(OUT_DIR, { recursive: true });
const outPdf = path.join(OUT_DIR, `NakshIQ-IG-Brief-${today}.pdf`);
fs.writeFileSync(path.join(ROOT, "logs", `brief-${today}.md`), md);
toPdf(md, outPdf);
let shown = outPdf;
try {
  fs.mkdirSync(MIRROR_DIR, { recursive: true });
  const mirror = path.join(MIRROR_DIR, path.basename(outPdf));
  fs.copyFileSync(outPdf, mirror);
  shown = mirror;
} catch (e) { log(`Desktop mirror skipped (TCC under launchd is expected): ${String(e.message).slice(0, 60)}`); }
log(`brief ready: ${live.length} accounts, ${drafts.length} drafts, ${dead.length} dropped → ${shown}`);

// Local macOS notification. Deliberately NOT an iMessage/email send: this job
// runs unattended every day and an outward send loop is the kind of thing that
// should never be armed by a background script.
//
// Posted BY NakshIQ-Brief.app, not by bare `osascript`. A bare osascript
// notification is owned by Script Editor, so clicking it opens an empty Script
// Editor document picker (seen 2026-09-08). Telling the applet over Apple
// events needs TCC consent (-1743), so the job drops a marker file and just
// LAUNCHES the applet: marker present means "post the notification", marker
// absent (i.e. the user clicked it) means "open the brief".
try {
  fs.writeFileSync(path.join(ROOT, "logs", "latest-brief.txt"), shown);
  fs.writeFileSync(path.join(ROOT, "logs", "notify-pending.txt"),
    `${live.length} to follow, ${drafts.length} comment drafts. Click to open.`);
  execFileSync("/usr/bin/open", ["-n", "-a", path.join(ROOT, "NakshIQ-Brief.app")],
    { stdio: "ignore", timeout: 20000 });
} catch (e) { log(`notification skipped: ${String(e.message).slice(0, 80)}`); }
