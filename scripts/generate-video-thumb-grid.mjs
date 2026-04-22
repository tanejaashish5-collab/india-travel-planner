#!/usr/bin/env node
/**
 * Extract frame-at-3s from every videos/*.mp4 and build an HTML grid for
 * visual mis-label audit. Output: data/video-audit/index.html + per-slug
 * JPGs in data/video-audit/thumbs/. Open the HTML in a browser, scan for
 * mismatches (e.g. Agartala showing Taj Mahal), flag them.
 */
import { readdirSync, statSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const VIDEO_DIR = 'videos';
const OUT_DIR = 'data/video-audit';
const THUMB_DIR = join(OUT_DIR, 'thumbs');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
if (!existsSync(THUMB_DIR)) mkdirSync(THUMB_DIR, { recursive: true });

const files = readdirSync(VIDEO_DIR)
  .filter(f => f.endsWith('.mp4') && !f.includes(' 2'))
  .sort();

console.log(`Extracting thumbnails from ${files.length} videos…`);

const entries = [];
let ok = 0, failed = 0;
for (const f of files) {
  const slug = f.replace(/^(VIDEO_|ARTICLE_)/, '').replace(/\.mp4$/, '');
  const thumbPath = join(THUMB_DIR, `${slug}.jpg`);
  const srcPath = join(VIDEO_DIR, f);
  const size = statSync(srcPath).size;

  if (!existsSync(thumbPath)) {
    try {
      // -ss 3 = seek to 3s (skips intro frame). -frames:v 1 = one frame.
      // -q:v 4 = reasonable JPG quality. -y = overwrite.
      execSync(`ffmpeg -ss 3 -i "${srcPath}" -frames:v 1 -q:v 4 -y "${thumbPath}" 2>/dev/null`);
      ok++;
    } catch {
      // Some videos may be shorter than 3s — try frame 0
      try {
        execSync(`ffmpeg -i "${srcPath}" -frames:v 1 -q:v 4 -y "${thumbPath}" 2>/dev/null`);
        ok++;
      } catch {
        failed++;
      }
    }
  } else {
    ok++;
  }
  entries.push({ slug, file: f, thumb: `thumbs/${slug}.jpg`, sizeMB: (size / 1024 / 1024).toFixed(1) });
}

console.log(`✓ ${ok} thumbs, ${failed} failed.`);

// Build the HTML grid
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Video Audit — ${entries.length} R2 videos</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, system-ui, sans-serif; background: #111; color: #eee; margin: 0; padding: 24px; }
  h1 { font-size: 18px; font-weight: 600; margin: 0 0 4px; }
  .sub { color: #888; font-size: 13px; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card { background: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #2a2a2a; transition: border-color 0.15s; }
  .card:hover { border-color: #E55642; }
  .card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; background: #000; display: block; }
  .label { padding: 10px 12px; }
  .label .slug { font-size: 13px; font-weight: 600; color: #fff; }
  .label .meta { font-size: 11px; color: #888; margin-top: 2px; }
  .flag { display: inline-block; font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-top: 4px; cursor: pointer; user-select: none; }
  .flag.off { background: #2a2a2a; color: #888; }
  .flag.on { background: #E55642; color: #fff; }
  .summary { position: sticky; top: 0; background: #111; padding: 12px 0; border-bottom: 1px solid #2a2a2a; margin-bottom: 16px; z-index: 10; }
  .copy-btn { background: #E55642; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; margin-left: 8px; }
</style>
</head>
<body>
  <div class="summary">
    <h1>Video Audit — ${entries.length} R2 videos</h1>
    <div class="sub">Click the red flag on any mislabeled video. Then hit Copy to get the deletion command.</div>
    <div id="flagged-count" class="sub" style="margin-top:8px;">Flagged: <span id="count">0</span> <button class="copy-btn" onclick="copyCmd()">Copy delete command</button></div>
  </div>
  <div class="grid">
    ${entries.map(e => `
      <div class="card">
        <img src="${e.thumb}" alt="${e.slug}" loading="lazy">
        <div class="label">
          <div class="slug">${e.slug}</div>
          <div class="meta">${e.sizeMB}MB · ${e.file}</div>
          <span class="flag off" data-slug="${e.slug}" onclick="toggle(this)">FLAG as wrong</span>
        </div>
      </div>
    `).join('\n')}
  </div>
<script>
  const flagged = new Set();
  function toggle(el) {
    const slug = el.dataset.slug;
    if (flagged.has(slug)) { flagged.delete(slug); el.classList.remove('on'); el.classList.add('off'); el.textContent = 'FLAG as wrong'; }
    else { flagged.add(slug); el.classList.remove('off'); el.classList.add('on'); el.textContent = '✗ flagged'; }
    document.getElementById('count').textContent = flagged.size;
  }
  function copyCmd() {
    if (flagged.size === 0) { alert('No videos flagged.'); return; }
    const cmd = 'node scripts/delete-wrong-video.mjs ' + [...flagged].map(s => s + '.mp4').join(' ');
    navigator.clipboard.writeText(cmd);
    alert('Copied:\\n' + cmd);
  }
</script>
</body>
</html>`;

writeFileSync(join(OUT_DIR, 'index.html'), html);
console.log(`\nOpen: file://${process.cwd()}/${OUT_DIR}/index.html`);
