#!/usr/bin/env node
/**
 * md-to-dark-pdf.mjs — render a markdown file to the house dark-theme PDF
 *
 *   node scripts/md-to-dark-pdf.mjs <input.md> <output.pdf>
 *
 * The founder cannot read raw markdown comfortably; every report also ships as
 * a dark PDF (global rule, 2026-06-22). This is the one reusable renderer for
 * the converter that had been re-inlined in three separate scripts. Headless
 * Chrome does the layout; no npm dependency.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";

const [input, output] = process.argv.slice(2);
if (!input || !output) { console.error("usage: md-to-dark-pdf.mjs <input.md> <output.pdf>"); process.exit(2); }

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (t) => esc(t)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');

const lines = readFileSync(input, "utf8").split("\n");
const out = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.startsWith("|")) {
    const rows = [];
    while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i].replace(/^\||\|$/g, "").split("|").map((c) => c.trim())); i++; }
    i--;
    const body = rows.filter((r) => !r.every((c) => /^[-: ]*$/.test(c)));
    if (body.length) out.push("<table><tr>" + body[0].map((c) => `<th>${inline(c)}</th>`).join("") + "</tr>" +
      body.slice(1).map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</table>");
    continue;
  }
  const h = l.match(/^(#{1,4}) (.*)/);
  if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
  if (l.startsWith("> ")) {
    const q = [];
    while (i < lines.length && lines[i].startsWith("> ")) { q.push(lines[i].slice(2)); i++; }
    i--; out.push(`<blockquote>${inline(q.join(" "))}</blockquote>`); continue;
  }
  if (/^\d+\. /.test(l)) {
    const items = [];
    while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
    i--; out.push("<ol>" + items.map((x) => `<li>${inline(x)}</li>`).join("") + "</ol>"); continue;
  }
  if (l.startsWith("- ")) {
    const items = [];
    while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
    i--; out.push("<ul>" + items.map((x) => `<li>${inline(x)}</li>`).join("") + "</ul>"); continue;
  }
  if (l.trim()) out.push(`<p>${inline(l)}</p>`);
}

const css = `body{background:#0f1216;color:#e4e8ec;font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:860px;margin:36px auto;padding:0 34px;line-height:1.6;font-size:15px}
h1{color:#fff;font-size:26px;line-height:1.25;border-bottom:2px solid #2a3138;padding-bottom:10px}
h2{color:#f5c26b;font-size:19px;margin-top:32px;border-bottom:1px solid #232a31;padding-bottom:5px}h3{color:#fff;font-size:16px;margin-top:22px}
table{border-collapse:collapse;margin:16px 0;width:100%;font-size:14px}th,td{border:1px solid #2a3138;padding:7px 11px;text-align:left;vertical-align:top}
th{background:#1a2028;color:#fff}tr:nth-child(even) td{background:#141920}
blockquote{margin:12px 0;padding:11px 16px;border-left:3px solid #f5c26b;background:#161b22;color:#dbe3ea;font-style:italic}
code{background:#1a2028;color:#9cdcfe;padding:1px 5px;border-radius:3px;font-size:13px;font-style:normal}
a{color:#7cc4ff}strong{color:#fff}li{margin:6px 0}p{margin:10px 0}ol,ul{padding-left:22px}`;
const tmp = path.join(os.tmpdir(), `md-dark-${process.pid}.html`);
writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${out.join("")}</body></html>`);
mkdirSync(path.dirname(output), { recursive: true });
execFileSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${output}`, `file://${tmp}`], { stdio: "ignore" });
console.log(`wrote ${output}`);
