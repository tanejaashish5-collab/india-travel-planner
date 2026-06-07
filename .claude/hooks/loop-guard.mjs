#!/usr/bin/env node
/**
 * loop-guard.mjs — PreToolUse hook. Tool-layer defense-in-depth for the
 * autonomous loop (the primary enforcement is scripts/_loop/guard.mjs).
 *
 * Wired in .claude/settings.json as a PreToolUse hook on the Bash tool.
 *
 * Behaviour:
 *   - ALWAYS blocks universally-catastrophic commands (rm -rf /, fork bomb,
 *     force-push to main/master) — these are never intentional.
 *   - When env NAKSHIQ_LOOP=1 (set only by the loop orchestrator), additionally
 *     enforces the full hard-block list: push to main, DROP/DELETE/TRUNCATE,
 *     vercel domain changes. This keeps normal interactive sessions friction-free
 *     while fencing the autonomous loop hard.
 *
 * Contract: read hook JSON on stdin. To BLOCK -> print reason to stderr, exit 2.
 * To ALLOW -> exit 0. Fails OPEN on internal error (a broken guard must never
 * block all of the operator's normal work).
 */

import { readFileSync } from "node:fs";

function allow() {
  process.exit(0);
}
function block(reason) {
  process.stderr.write(`[loop-guard] BLOCKED: ${reason}\n`);
  process.exit(2);
}

let input = "";
try {
  input = readFileSync(0, "utf8");
} catch {
  allow(); // can't read stdin -> don't block normal work
}

let payload;
try {
  payload = JSON.parse(input || "{}");
} catch {
  allow();
}

const toolName = payload.tool_name || payload.toolName || "";
if (toolName !== "Bash") allow();

const cmd = (payload.tool_input?.command || payload.toolInput?.command || "").toString();
if (!cmd) allow();

const inLoop = process.env.NAKSHIQ_LOOP === "1";
const snip = cmd.slice(0, 120);

// Split into command SEGMENTS so a dangerous pattern only fires when it's
// actually executed (start of a segment) — not when it's merely quoted/echoed
// inside an argument (e.g. writing docs or fixtures that mention it). Break on
// shell separators: && || ; | newline and command-substitution openers.
const segs = cmd.split(/&&|\|\||[;\n|]|\$\(|`/).map((s) => s.trim()).filter(Boolean);
const atCmd = (re) => segs.some((s) => re.test(s));

// git-push facts, per EXECUTED segment (order-independent). `-f` must be a
// standalone flag; `--force` covers --force/--force-with-lease. `\b(main|master)\b`
// won't match "maintenance".
const forceRe = /(--force(?:-with-lease)?\b|(?<=\s)-f(?=\s|$))/;
const pushSegs = segs.filter((s) => /^(sudo\s+)?git\s+push\b/.test(s));
const isForceMain = pushSegs.some((s) => forceRe.test(s) && (/\b(main|master)\b/.test(s) || /\bpush\s*$/.test(s)));

// --- ALWAYS-blocked: catastrophic, only when actually executed ------------
if (atCmd(/^(sudo\s+)?rm\s+-[a-z]*[rf][a-z]*\s+.*(\/(\s|$)|~|\$HOME)/)) block(`rm -rf on / or home directory. (${snip})`);
if (atCmd(/^(sudo\s+)?rm\s+-[a-z]*[rf][a-z]*\s+["']?\/(Users|System|Library|bin|etc|usr|var)\b/)) block(`rm -rf on a system path. (${snip})`);
if (/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/.test(cmd)) block(`fork bomb. (${snip})`);
if (atCmd(/^(sudo\s+)?(mkfs\b|dd\s+if=.*of=\/dev\/)/)) block(`disk-destroying command. (${snip})`);
if (isForceMain) block(`force-push to main/master. (${snip})`);

// --- LOOP-only hard-blocks: full hardBlocked class, matched ANYWHERE ------
// In loop context, over-blocking is desired — the loop should never be writing
// docs/fixtures that merely mention these.
if (inLoop) {
  const hasPush = segs.some((s) => /^(sudo\s+)?git\s+push\b/.test(s));
  if (hasPush && (/\b(main|master)\b/.test(cmd) || segs.some((s) => /^(sudo\s+)?git\s+push\s*$/.test(s))))
    block(`[in-loop] push to main/master (loop works on loop/auto-* branches only). (${snip})`);
  if (hasPush && forceRe.test(cmd)) block(`[in-loop] force-push (loop must not rewrite history). (${snip})`);
  if (/\bdrop\s+(table|database|schema)\b/i.test(cmd)) block(`[in-loop] DROP statement. (${snip})`);
  if (/\btruncate\s+(table\s+)?\w/i.test(cmd)) block(`[in-loop] TRUNCATE statement. (${snip})`);
  if (/\bdelete\s+from\b/i.test(cmd)) block(`[in-loop] DELETE FROM (use a reviewed migration). (${snip})`);
  if (/vercel\s+(domains|alias)\b/i.test(cmd)) block(`[in-loop] Vercel domain/alias change. (${snip})`);
  if (/\brm\s+-rf?\b/.test(cmd)) block(`[in-loop] rm -rf (stage for approval instead). (${snip})`);
}

allow();
