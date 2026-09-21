#!/usr/bin/env node
/**
 * make-paste-pack.mjs — turn today's veo_queue.json into ONE dark HTML page the
 * founder pastes from, grouped by Flow account.
 *
 * WHY THIS EXISTS, and why flow-run.mjs is not the answer. Proven 2026-09-21:
 *
 *   1. Google refuses to COMPLETE A SIGN-IN in an automation-controlled browser
 *      ("Couldn't sign you in / This browser or app may not be secure").
 *   2. Signing in via a normal Chrome on the same profile works — but the FIRST
 *      Playwright launch against that profile INVALIDATES the session. Verified
 *      in sequence: plain Chrome signed in -> Playwright signed out -> plain
 *      Chrome signed out again. Google binds the session to the browser.
 *   3. Chrome has blocked --remote-debugging-port on a real profile since 136
 *      (this machine runs 153), so driving the founder's own Chrome over CDP is
 *      closed too.
 *   4. Copying cookies out of his main profile is credential material and was
 *      deliberately NOT done.
 *
 * So the generation step cannot be automated, and pretending otherwise is how
 * the last five days produced nothing. Everything either side of it still is:
 * build-queue.py picks and storyboards, intake-manual.mjs + collect-clips.mjs +
 * upload-clips.mjs name and ship the footage. This page is the ten minutes in
 * the middle that a human has to do, made as short as possible.
 *
 * ORDER IS LOAD-BEARING. intake-manual.mjs pairs downloads to beats BY ORDER,
 * so the pack is numbered and must be worked top to bottom.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import os from "os";

const HERE = dirname(fileURLToPath(import.meta.url));
const QUEUE = join(HERE, "veo_queue.json");
const ACCOUNTS = join(HERE, "accounts.json");
const PER_ACCOUNT = Number(process.env.VEO_PER_ACCOUNT || 5);
const OUTDIR = join(os.homedir(), "Desktop", "Reports");
const INBOX = join(HERE, "inbox");
const TASKS = join(HERE, "today-tasks.json");

// The brief a Cowork agent gets. It points at today-tasks.json rather than
// inlining 28 prompts, so the agent reads one authoritative file and the brief
// stays short enough to check by eye. Every rule in it is something that was
// actually observed going wrong on 2026-09-21, not a precaution.
// ONE brief, maintained in one place. This page used to carry its own copy of
// the Cowork brief, which went stale the same day (it still said to save into
// inbox/ and run intake). The scheduled task reads cowork-task.SKILL.md on every
// run; this page just points at it.
const BRIEF = `This runs automatically. The Cowork scheduled task "nakshiq-veo-daily"
generates today's clips at 10:00 from ${TASKS}
and saves them into ~/Downloads/nakshiq-veo-inbox/. The 14:20 LaunchAgent
collects, names, uploads and checks them.

The brief it follows is the single maintained copy:
${join(HERE, "cowork-task.SKILL.md")}

Only use the manual route below if the scheduled task did not run.`;

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

if (!existsSync(QUEUE)) { console.error("[pack] no veo_queue.json — run build-queue.py first"); process.exit(1); }
const rows = JSON.parse(readFileSync(QUEUE, "utf-8")).filter((r) => r.status === "pending");
if (!rows.length) { console.log("[pack] nothing pending — no pack written"); process.exit(0); }

const accounts = JSON.parse(readFileSync(ACCOUNTS, "utf-8")).accounts;
const capacity = accounts.length * PER_ACCOUNT;
const todo = rows.slice(0, capacity);

// Group by account, keeping global order so intake pairing stays valid.
const groups = accounts.map((a, i) => ({
  ...a, clips: todo.slice(i * PER_ACCOUNT, (i + 1) * PER_ACCOUNT),
})).filter((g) => g.clips.length);

const today = new Date().toISOString().slice(0, 10);
let n = 0;

const cards = groups.map((g) => {
  const items = g.clips.map((r) => {
    n += 1;
    return `<li class="clip" data-i="${n}">
      <div class="chead">
        <label class="tick"><input type="checkbox" data-k="${esc(r.clip)}"><span></span></label>
        <span class="num">${n}</span>
        <code class="name">${esc(r.clip)}</code>
        <span class="meta">${esc(r.role || "")} · ${esc(r.seconds || "?")}s</span>
        <button class="copy" data-p="${esc(r.prompt)}">Copy prompt</button>
      </div>
      <pre class="prompt">${esc(r.prompt)}</pre>
    </li>`;
  }).join("\n");
  const tag = g.owner === "chanakya"
    ? `<span class="warn" title="Chanakya's live Veo account — credits spent here are credits Chanakya cannot use">chanakya</span>` : "";
  return `<section class="acct">
    <h2>${esc(g.email)} ${tag}<span class="cnt">${g.clips.length} clips · ${g.clips.length * 10} credits</span></h2>
    <ol class="clips">${items}</ol>
  </section>`;
}).join("\n");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Veo Paste Pack</title>
<style>
:root{--bg:#0b0d10;--card:#14181d;--line:#232a32;--fg:#e8edf2;--dim:#8b97a5;--acc:#5ec2a0;--warn:#e0a458;--mono:ui-monospace,SFMono-Regular,Menlo,monospace}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;padding:24px 16px 80px}
.wrap{max-width:900px;margin:0 auto}
h1{font-size:22px;margin:0 0 4px}
.sub{color:var(--dim);font-size:13px;margin-bottom:18px}
.how{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:20px}
.how ol{margin:8px 0 0;padding-left:20px}.how li{margin:5px 0}
.how code{font-family:var(--mono);background:#0b0d10;padding:2px 6px;border-radius:5px;font-size:12.5px;word-break:break-all}
.bar{position:sticky;top:0;background:rgba(11,13,16,.94);backdrop-filter:blur(8px);padding:10px 0 12px;margin-bottom:8px;z-index:5;border-bottom:1px solid var(--line)}
.track{height:6px;background:var(--line);border-radius:4px;overflow:hidden}
.fill{height:100%;width:0;background:var(--acc);transition:width .2s}
.stat{font-size:12.5px;color:var(--dim);margin-top:6px;display:flex;gap:12px;flex-wrap:wrap}
.acct{margin:22px 0}
.acct h2{font-size:14px;font-family:var(--mono);color:var(--acc);margin:0 0 10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;word-break:break-all}
.cnt{margin-left:auto;color:var(--dim);font-size:12px;font-family:inherit}
.warn{background:rgba(224,164,88,.15);color:var(--warn);border:1px solid rgba(224,164,88,.35);border-radius:999px;padding:1px 8px;font-size:11px}
.clips{list-style:none;margin:0;padding:0}
.clip{background:var(--card);border:1px solid var(--line);border-radius:12px;margin-bottom:10px;overflow:hidden}
.clip.done{opacity:.45}
.chead{display:flex;align-items:center;gap:10px;padding:10px 12px;flex-wrap:wrap}
.num{font-family:var(--mono);color:var(--dim);font-size:12px;min-width:22px}
.name{font-family:var(--mono);font-size:12.5px;word-break:break-all;flex:1 1 180px}
.meta{color:var(--dim);font-size:11.5px}
.copy{background:#1d242c;color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:6px 12px;font-size:12.5px;cursor:pointer}
.copy:hover{border-color:var(--acc)}.copy.ok{background:var(--acc);color:#04120d;border-color:var(--acc)}
.prompt{margin:0;padding:12px;border-top:1px solid var(--line);background:#0e1216;font-family:var(--mono);font-size:12px;white-space:pre-wrap;word-break:break-word;color:#b9c5d1;max-height:150px;overflow:auto}
.cw{border-color:rgba(94,194,160,.4)}
.cwhead{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px}
.cwhead .big{margin-left:auto;padding:8px 16px}
.cwp{color:var(--dim);font-size:12.5px;margin:6px 0 10px}
.brief{margin:0;padding:12px;border:1px solid var(--line);border-radius:8px;background:#0e1216;font-family:var(--mono);font-size:11.5px;white-space:pre-wrap;word-break:break-word;color:#b9c5d1;max-height:200px;overflow:auto}
details.how summary{cursor:pointer;list-style:none}
details.how summary::-webkit-details-marker{display:none}
details.how summary::before{content:"▸  ";color:var(--dim)}
details.how[open] summary::before{content:"▾  "}
.tick input{display:none}
.tick span{display:block;width:18px;height:18px;border:1.5px solid var(--line);border-radius:5px;cursor:pointer}
.tick input:checked+span{background:var(--acc);border-color:var(--acc)}
@media(max-width:420px){.copy{width:100%}.cnt{margin-left:0;width:100%}}
</style></head><body><div class="wrap">
<h1>Veo paste pack &middot; ${today}</h1>
<div class="sub">${todo.length} clips &middot; ${todo.length * 10} credits &middot; ${groups.length} accounts</div>

<div class="how cw"><div class="cwhead"><strong>Automated daily by Claude Cowork</strong>
<button class="copy big" id="brief">Copy brief</button></div>
<p class="cwp">Nothing to do here on a normal day. This page is the fallback if the 10:00 task did not run.</p>
<pre class="brief" id="brieftext">${esc(BRIEF)}</pre></div>

<details class="how"><summary><strong>Or paste them yourself</strong> &mdash; the manual fallback</summary>
<ol>
<li>Open <code>flow.google.com</code> in your <strong>normal Chrome</strong>. Automation cannot sign in, so this part is manual by necessity, not by choice.</li>
<li>Pick <strong>Veo 3.1 Lite (10 credits)</strong>. Flow defaults to Omni 1.1 Flash at 12, which is 20% more and gives 4 clips per account instead of 5.</li>
<li>Work <strong>top to bottom</strong>. Copy, paste, generate, download. Order matters: clips are paired to beats by order.</li>
<li>Switch account by opening <code>flow.google.com/u/N/</code> (N = 0, 1, 2&hellip;) and checking the email shown. Chrome's first account is a cancelled Workspace where Flow does not load, and <code>?authuser=N</code> does not switch accounts.</li>
<li>When done, run <code>bash ~/Automation/nakshiq-veo/intake.sh</code> &mdash; it pairs clips to beats <strong>by order</strong> and ships them to R2. Add <code>--dry</code> first to see the mapping without writing anything.</li>
</ol>
<p class="cwp">This path pairs by order because Flow names its downloads after prompt content. The Cowork path above matches by filename instead, which is safer &mdash; order stops mattering entirely.</p>
</details>

<div class="bar"><div class="track"><div class="fill" id="fill"></div></div>
<div class="stat"><span id="pct">0 of ${todo.length} done</span><span id="cred">${todo.length * 10} credits left to spend</span></div></div>

${cards}
</div>
<script>
const KEY = "veo-pack-${today}";
let done = {};
try { done = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { done = {}; }
const boxes = [...document.querySelectorAll('.tick input')];
function save(){ try { localStorage.setItem(KEY, JSON.stringify(done)); } catch(e){} }
function paint(){
  let d = 0;
  boxes.forEach(b => {
    const on = !!done[b.dataset.k];
    b.checked = on; b.closest('.clip').classList.toggle('done', on); if (on) d++;
  });
  const total = boxes.length;
  document.getElementById('fill').style.width = total ? (d/total*100)+'%' : '0';
  document.getElementById('pct').textContent = d + ' of ' + total + ' done';
  document.getElementById('cred').textContent = ((total-d)*10) + ' credits left to spend';
}
boxes.forEach(b => b.addEventListener('change', () => { done[b.dataset.k] = b.checked; save(); paint(); }));
document.querySelectorAll('.copy').forEach(btn => btn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(btn.dataset.p); }
  catch (e) {
    const t = document.createElement('textarea'); t.value = btn.dataset.p;
    document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  const was = btn.textContent; btn.textContent = 'Copied'; btn.classList.add('ok');
  const box = btn.closest('.chead').querySelector('.tick input');
  if (!box.checked) { box.checked = true; done[box.dataset.k] = true; save(); paint(); }
  setTimeout(() => { btn.textContent = was; btn.classList.remove('ok'); }, 1200);
}));
const briefBtn = document.getElementById('brief');
briefBtn.addEventListener('click', async () => {
  const txt = document.getElementById('brieftext').textContent;
  try { await navigator.clipboard.writeText(txt); }
  catch (e) {
    const t = document.createElement('textarea'); t.value = txt;
    document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  briefBtn.textContent = 'Copied'; briefBtn.classList.add('ok');
  setTimeout(() => { briefBtn.textContent = 'Copy brief'; briefBtn.classList.remove('ok'); }, 1400);
});
paint();
</script></body></html>`;

mkdirSync(OUTDIR, { recursive: true });
const out = join(OUTDIR, `NakshIQ-Veo-Paste-Pack-${today}.html`);
writeFileSync(out, html);
console.log(`[pack] ${todo.length} clips across ${groups.length} accounts`);
console.log(`[pack] ${out}`);
