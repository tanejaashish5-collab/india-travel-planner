#!/usr/bin/env node
/**
 * export-tasks.mjs — write today's work as ONE machine-readable file for a
 * Cowork (or any other) agent that can drive a real, signed-in browser.
 *
 * This exists because browser automation of Flow from here is closed (see
 * README: Google invalidates the session the moment Playwright touches the
 * profile). An agent operating the founder's own browser has a real session and
 * is not subject to that. What it needs from us is not a script — it is an
 * unambiguous contract: which prompt, which account, and EXACTLY what to call
 * the file.
 *
 * THE FILENAME IS THE WHOLE POINT. `save_as` is the beat name the renderer
 * fetches from R2 (`<slug>__<format>__b<N>.mp4`). If the agent saves under that
 * name, intake matches by NAME and order stops mattering — which removes the
 * one way this pipeline could silently put the wrong footage on a beat.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const HERE = dirname(fileURLToPath(import.meta.url));
const QUEUE = join(HERE, "veo_queue.json");
const ACCOUNTS = join(HERE, "accounts.json");
const INBOX = join(HERE, "inbox");
const OUT = join(HERE, "today-tasks.json");
const PER_ACCOUNT = Number(process.env.VEO_PER_ACCOUNT || 5);

if (!existsSync(QUEUE)) { console.error("[export] no veo_queue.json — run build-queue.py first"); process.exit(1); }
const pending = JSON.parse(readFileSync(QUEUE, "utf-8")).filter((r) => r.status === "pending");
if (!pending.length) { console.log("[export] nothing pending"); process.exit(0); }

const accounts = JSON.parse(readFileSync(ACCOUNTS, "utf-8")).accounts;
const todo = pending.slice(0, accounts.length * PER_ACCOUNT);

// A reel is cut from a WHOLE storyboard, so a half-finished one renders nothing.
// A 4-beat storyboard against 5 clips per account means beats straddle accounts
// by arithmetic, so the agent has to be told which clips belong together.
// Learned 2026-09-21: a spare 20 credits were spent STARTING a storyboard while
// another sat one beat short, which produced two unusable sets instead of one
// usable one.
const beatCount = new Map();
for (const r of JSON.parse(readFileSync(QUEUE, "utf-8"))) {
  const k = `${r.slug}__${r.format}`;
  beatCount.set(k, (beatCount.get(k) || 0) + 1);
}
mkdirSync(INBOX, { recursive: true });

const doc = {
  date: new Date().toISOString().slice(0, 10),
  generated_by: "export-tasks.mjs",
  how: [
    "Open flow.google.com in a REAL signed-in Chrome. Automation-controlled browsers cannot sign in and their launch invalidates an existing session.",
    "In EVERY project, pick model 'Veo 3.1 Lite' (10 credits). Flow defaults to Omni 1.1 Flash at 12 credits, which is 20% more and yields 4 clips per account instead of 5. If the Lite option cannot be selected, STOP rather than generate on the default.",
    "The account assignment is a SUGGESTION, not a constraint: this file is written without knowing any account's remaining balance. Matching downstream is by filename only, so any account with credits can produce any clip. If an account is out of credits or signed out, move the clip to one that has them.",
    "Never enter a password. If an account shows 'Signed out', skip it and report which clips that stranded.",
    "Switch accounts in-app: avatar -> 'Switch account'. flow.google.com/?authuser=N does NOT switch accounts, it redirects to the marketing page.",
    "Generate each prompt, download the clip, and save it into save_to using EXACTLY the save_as filename.",
    "Nothing is verified by order: matching is by filename, so a clip saved under the wrong name is the only way to get wrong footage on a beat.",
    "A reel is cut from a WHOLE storyboard. Clips sharing a 'storyboard' value belong together, and 'beats_in_storyboard' says how many it needs. A storyboard missing even one beat renders nothing.",
    "So: if you cannot finish a storyboard, prefer to skip it entirely rather than produce some of its beats. Half a storyboard is wasted credits.",
    "And if you have spare credits, spend them COMPLETING a partial storyboard before starting a new one. Beats straddle accounts because 4-beat storyboards do not divide into 5 clips per account.",
    "When finished, run then_run.",
  ],
  model: "Veo 3.1 Lite",
  credits_per_clip: 10,
  aspect: "9:16 vertical",
  save_to: INBOX,
  then_run: `bash ${join(HERE, "intake.sh")} --named`,
  total_clips: todo.length,
  total_credits: todo.length * 10,
  accounts: accounts.map((a, i) => ({
    email: a.email,
    owner: a.owner,
    clips: todo.slice(i * PER_ACCOUNT, (i + 1) * PER_ACCOUNT).map((r) => ({
      save_as: r.clip,
      storyboard: `${r.slug}__${r.format}`,
      beats_in_storyboard: beatCount.get(`${r.slug}__${r.format}`) || null,
      seconds: r.seconds,
      beat_role: r.role,
      prompt: r.prompt,
    })),
  })).filter((g) => g.clips.length),
};

writeFileSync(OUT, JSON.stringify(doc, null, 2));
console.log(`[export] ${todo.length} clips across ${doc.accounts.length} accounts`);
console.log(`[export] ${OUT}`);
console.log(`[export] save clips into ${INBOX}`);
