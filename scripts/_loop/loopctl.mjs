#!/usr/bin/env node
/**
 * loopctl.mjs — one-command control panel for the autonomous loop.
 *
 *   node scripts/_loop/loopctl.mjs status     # what it's doing + spend + pending approvals
 *   node scripts/_loop/loopctl.mjs stop       # halt now (creates .loop/STOP)
 *   node scripts/_loop/loopctl.mjs pause      # suspend, keep state (creates .loop/PAUSE)
 *   node scripts/_loop/loopctl.mjs resume     # clear STOP + PAUSE
 *   node scripts/_loop/loopctl.mjs reset      # clear state.json back to idle
 *   node scripts/_loop/loopctl.mjs budget     # show the configured caps
 *
 * Built for a non-technical operator: plain-English output, no flags to remember.
 */

import { existsSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LOOP_DIR, loadConfig, loadState, saveState, getCurrentBranch, checkKillSwitch } from "./guard.mjs";

const STOP = join(LOOP_DIR, "STOP");
const PAUSE = join(LOOP_DIR, "PAUSE");
const cmd = (process.argv[2] || "status").toLowerCase();

function touch(p, note) {
  writeFileSync(p, `${note}\ncreated: ${new Date().toISOString()}\n`);
}
function rm(p) {
  if (existsSync(p)) rmSync(p);
}

function countPending() {
  const p = join(LOOP_DIR, "pending-actions.md");
  if (!existsSync(p)) return 0;
  const body = readFileSync(p, "utf8");
  // crude but honest: lines that look like a numbered pending action
  return (body.match(/^\s*\d+\.\s+\[/gm) || []).length;
}

function status() {
  const cfg = loadConfig();
  const st = loadState();
  const k = checkKillSwitch();
  const branch = getCurrentBranch();
  const pending = countPending();

  const flag = k.halted ? "🛑 STOPPED" : k.paused ? "⏸  PAUSED" : "🟢 ready";
  console.log(`\nNakshIQ autonomous loop — ${flag}\n`);
  console.log(`  Approval channel : ${cfg.approval.channel}`);
  console.log(`  Current branch   : ${branch || "(unknown)"}`);
  console.log(`  Loop status      : ${st.status || "idle"}`);
  console.log(`  Last run         : ${st.lastRunAt || "never"}`);
  console.log(`  Spend (last run) : ${st.subagentsThisRun || 0} sub-agents, ${st.tokensSpentThisRun || 0} tokens`);
  console.log(`  Caps             : ≤${cfg.budget.maxSubagentsPerRun} agents · ≤${cfg.budget.maxTokensPerRun} tokens · ≤${cfg.budget.maxWallClockMinutesPerRun} min/run`);
  console.log(`  Pending approval : ${pending} action(s)${pending ? "  → see .loop/pending-actions.md" : ""}`);
  if (k.reason) console.log(`\n  ${k.reason}`);
  console.log("");
  if (pending > 0) console.log(`  ⚠  ${pending} action(s) waiting for your "go". Open .loop/pending-actions.md\n`);
}

switch (cmd) {
  case "stop":
    touch(STOP, "Operator STOP — loop halts within one iteration.");
    console.log("🛑 STOP set. The loop will halt at its next safety check (top of the next iteration).");
    console.log("   Resume later with:  node scripts/_loop/loopctl.mjs resume");
    break;
  case "pause":
    touch(PAUSE, "Operator PAUSE — loop suspends, state preserved.");
    console.log("⏸  PAUSE set. The loop will suspend without losing its place.");
    console.log("   Resume with:  node scripts/_loop/loopctl.mjs resume");
    break;
  case "resume":
    rm(STOP);
    rm(PAUSE);
    console.log("🟢 Cleared STOP/PAUSE. The loop may proceed on its next scheduled trigger.");
    break;
  case "reset": {
    const st = loadState();
    saveState({
      _comment: st._comment,
      lastRunAt: null,
      lastRunId: null,
      status: "idle",
      currentBranch: null,
      tokensSpentThisRun: 0,
      subagentsThisRun: 0,
      history: [],
    });
    console.log("↺ state.json reset to idle. (STOP/PAUSE flags untouched — clear them with resume.)");
    break;
  }
  case "budget": {
    const cfg = loadConfig();
    console.log(JSON.stringify(cfg.budget, null, 2));
    break;
  }
  case "status":
  default:
    status();
}
