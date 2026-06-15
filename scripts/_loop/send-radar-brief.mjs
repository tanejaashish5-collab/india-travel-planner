#!/usr/bin/env node
/**
 * send-radar-brief.mjs — email the daily radar brief to the founder's Gmail via Resend.
 * Born 2026-06-11: the founder asked for the daily brief by EMAIL ("I did not receive
 * any email. It should be sent to me at a Gmail account") — email is now the PRIMARY
 * delivery channel for /loop-radar; iMessage is best-effort secondary.
 *
 *   node --env-file=apps/web/.env.local scripts/_loop/send-radar-brief.mjs \
 *     --file .loop/radar-briefs/2026-06-12.md [--subject "..."] [--to a@b.com]
 *
 * Uses the same Resend account + ops sender as the canary-probe / weekly ops emails.
 */
import fs from 'node:fs';

const argv = process.argv.slice(2);
const val = (f, d = null) => { const i = argv.indexOf(f); return i > -1 ? argv[i + 1] : d; };

const file = val('--file');
if (!file || !fs.existsSync(file)) { console.error('usage: send-radar-brief.mjs --file <brief.md> [--subject s] [--to email]'); process.exit(1); }
const md = fs.readFileSync(file, 'utf8');
const to = val('--to', 'taneja.ashish5@gmail.com');
const subject = val('--subject', `NakshIQ Opportunity Radar — ${new Date().toISOString().slice(0, 10)}`);
const FROM = 'NakshIQ Ops <ops@nakshiq.com>'; // mirrors OPS_FROM_ADDRESS in apps/web/src/lib/resend.ts
const KEY = process.env.RESEND_API_KEY;
if (!KEY) { console.error('RESEND_API_KEY missing — run with node --env-file=apps/web/.env.local'); process.exit(1); }

// minimal, dependency-free markdown -> email HTML (headers, bold, bullets, hr, tables kept monospace)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function mdToHtml(src) {
  const lines = src.split('\n');
  const out = [];
  let inList = false, inTable = false;
  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
  const closeTable = () => { if (inTable) { out.push('</pre>'); inTable = false; } };
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (/^\|/.test(line)) { closeList(); if (!inTable) { out.push('<pre style="font-size:12px;overflow-x:auto">'); inTable = true; } out.push(esc(line)); continue; }
    closeTable();
    let l = esc(line);
    l = l.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
    if (/^### /.test(l)) { closeList(); out.push(`<h3 style="margin:14px 0 6px">${l.slice(4)}</h3>`); }
    else if (/^## /.test(l)) { closeList(); out.push(`<h2 style="margin:18px 0 8px">${l.slice(3)}</h2>`); }
    else if (/^# /.test(l)) { closeList(); out.push(`<h1 style="margin:18px 0 8px;font-size:20px">${l.slice(2)}</h1>`); }
    else if (/^---+$/.test(l)) { closeList(); out.push('<hr>'); }
    else if (/^[-*] /.test(l)) { if (!inList) { out.push('<ul style="margin:6px 0;padding-left:20px">'); inList = true; } out.push(`<li>${l.slice(2)}</li>`); }
    else if (l.trim() === '') { closeList(); out.push('<br>'); }
    else { closeList(); out.push(`<p style="margin:4px 0">${l}</p>`); }
  }
  closeList(); closeTable();
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.45;color:#111;max-width:680px">${out.join('\n')}</div>`;
}

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ from: FROM, to: [to], subject, text: md, html: mdToHtml(md) }),
});
const body = await res.json().catch(() => ({}));
if (!res.ok) { console.error(`Resend ${res.status}: ${JSON.stringify(body)}`); process.exit(1); }
console.log(`sent: "${subject}" -> ${to} (id ${body.id || '?'})`);
