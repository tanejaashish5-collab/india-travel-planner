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
import os from "os";

const HERE = dirname(fileURLToPath(import.meta.url));
const QUEUE = process.env.VEO_QUEUE || join(HERE, "veo_queue.json");   // override = dry run against a scratch queue
const ACCOUNTS = join(HERE, "accounts.json");
// Where the session SAVES. Inside ~/Downloads because that is the only place
// its Desktop Commander access reaches; the LaunchAgent collects from here.
const INBOX = join(os.homedir(), "Downloads", "nakshiq-veo-inbox");
// VEO_TASKS_OUT lets a dry run write somewhere else: the real file is what the
// 10:00 Cowork run reads, and it must never be touched between 10:00 and 13:00.
const OUT = process.env.VEO_TASKS_OUT || join(HERE, "today-tasks.json");
// Budget by CREDITS, not by row count (2026-09-26). A stills row (ref or
// keyframe) costs 0 and a video row costs 10, so "5 rows per account" would
// under-fill a keyframe day and could over-fill a video day.
const ACCOUNT_CREDITS = Number(process.env.VEO_ACCOUNT_CREDITS || 50);
const cost = (r) => (typeof r.credits === "number" ? r.credits
  : (r.kind === "ref" || r.kind === "keyframe") ? 0 : 10);

if (!existsSync(QUEUE)) { console.error("[export] no veo_queue.json — run build-queue.py first"); process.exit(1); }
const pending = JSON.parse(readFileSync(QUEUE, "utf-8")).filter((r) => r.status === "pending");
if (!pending.length) { console.log("[export] nothing pending"); process.exit(0); }

// An account marked "rest" sits the day out (the task file says so too, but
// leaving it out of the roster is the restriction; the sentence is a reminder).
const accounts = JSON.parse(readFileSync(ACCOUNTS, "utf-8")).accounts.filter((a) => !a.rest);
// v3 storyboards go first and are never split by the per-account slicing
// below in a way that matters: the task says how to carry stills across accounts.
pending.sort((a, b) => (b.pipeline === "v3") - (a.pipeline === "v3"));
// Fill each account up to its credits, in order; free stills ride along with
// whichever account is being filled, so a storyboard's stills and first shots
// land together.
const groups = accounts.map((a) => ({ a, rows: [], credits: 0 }));
const todo = [];
let gi = 0;
for (const r of pending) {
  const c = cost(r);
  while (gi < groups.length && groups[gi].credits + c > ACCOUNT_CREDITS) gi++;
  if (gi >= groups.length) break;
  groups[gi].rows.push(r); groups[gi].credits += c; todo.push(r);
}

// A reel is cut from a WHOLE storyboard, so a half-finished one renders nothing.
// A 4-beat storyboard against 5 clips per account means beats straddle accounts
// by arithmetic, so the agent has to be told which clips belong together.
// Learned 2026-09-21: a spare 20 credits were spent STARTING a storyboard while
// another sat one beat short, which produced two unusable sets instead of one
// usable one.
const beatCount = new Map();
for (const r of JSON.parse(readFileSync(QUEUE, "utf-8"))) {
  const k = r.storyboard || `${r.slug}__${r.format}`;   // v3 rows carry the storyboard id
  beatCount.set(k, (beatCount.get(k) || 0) + 1);
}
mkdirSync(INBOX, { recursive: true });

// v3 has its own rules; the v2 lines below (two takes, text-only character
// descriptions) would contradict them, so a v3 day ships only these.
const HOW_V3 = [
  "v3 METHOD (2026-09-25, keyframes added 2026-09-26): never generate a reel shot from text alone. kind 'ref' and kind 'keyframe' rows are STILL IMAGES (Nano Banana, 9:16, 0 credits); a keyframe attaches the stills named in refs as ingredients. kind 'shot' rows are videos on Veo 3.1 Lite (10 credits): mode 'ingredients' = attach exactly the stills named in refs; mode 'extend' = Extend the shot named in extend_of, in the SAME Flow project; mode 'frames' = Frames to Video with start_frame as the first frame and, when end_frame is set, that still as the last frame.",
  "Choosing Frames can switch the model to Fast (20 credits): reselect Veo 3.1 Lite and confirm the composer quotes 10 before submitting. Never submit at 20.",
  "Extend and frames prompts are SHORT on purpose (the motion, the sound, the negatives): the source frames carry the look. Paste them as they are; add nothing.",
  "Make rows in the order listed: a storyboard's refs, then its keyframes, then its shots. One take per shot; redo only a failed shot.",
  "A day whose total_credits is 0 is a STILLS day: make every still, save it, finish. There is nothing to animate until the founder has approved the stills.",
  "Save every file under EXACTLY its save_as name in save_to. Matching downstream is by filename only.",
  "Use ONLY the @gmail.com accounts in accounts[]; read the signed-in email before generating. Account assignment is advisory: carry the saved stills to another account by uploading them.",
  "Ingredients prompts are long and verbatim, one line: they carry the fixed look and soundscape that make the shots match.",
];
const doc = {
  date: new Date().toISOString().slice(0, 10),
  generated_by: "export-tasks.mjs",
  how: todo.some((r) => r.pipeline === "v3") ? HOW_V3 : [
    "Open flow.google.com in a REAL signed-in Chrome. Automation-controlled browsers cannot sign in and their launch invalidates an existing session.",
    "In EVERY project, pick model 'Veo 3.1 Lite' (10 credits). Flow defaults to Omni 1.1 Flash at 12 credits, which is 20% more and yields 4 clips per account instead of 5. If the Lite option cannot be selected, STOP rather than generate on the default.",
    "The account assignment is a SUGGESTION, not a constraint: this file is written without knowing any account's remaining balance. Matching downstream is by filename only, so any account with credits can produce any clip. If an account is out of credits or signed out, move the clip to one that has them.",
    "Never enter a password. If an account shows 'Signed out', skip it and report which clips that stranded.",
    "ACCOUNTS: use ONLY the emails listed under accounts[]. Chrome's first Google account is a cancelled Workspace where Flow shows 'Service Not Allowed', so the in-app switcher is not reachable from there. Open Flow per account at https://flow.google.com/u/N/ and READ the signed-in email before doing anything; if it is not one of ours, try the next N. Never use any account that is not in accounts[], and never any account that is not a Gmail address.",
    "Generate each prompt, download the clip, and save it into save_to using EXACTLY the save_as filename.",
    "Nothing is verified by order: matching is by filename, so a clip saved under the wrong name is the only way to get wrong footage on a beat.",
    "CHARACTER CONSISTENCY: every prompt already describes each person IN FULL, identically across all beats of one storyboard, because Veo has no memory between clips. Do NOT use Flow's character field and do not add descriptions of your own; a second description can conflict and produce different people. The character value is for reference only.",
    "A reel is cut from a WHOLE storyboard. Clips sharing a 'storyboard' value belong together, and 'clips_in_storyboard' says how many it needs. A storyboard missing even one beat renders nothing.",
    "TWO TAKES PER BEAT, ON PURPOSE. Each beat appears TWICE with the SAME prompt: once as <beat>.mp4 and once as <beat>alt.mp4 ('take': 1 and 2). Generate both and save both. They are not duplicates to be skipped or copied: Veo renders the same prompt differently each time, and the second take is what saves a beat when the first one ignores part of the prompt. Copying one file to the other name would silently produce a reel cut from the same shot twice.",
    "So: if you cannot finish a storyboard, prefer to skip it entirely rather than produce some of its beats. Half a storyboard is wasted credits.",
    "And if you have spare credits, spend them COMPLETING a partial storyboard before starting a new one. Beats straddle accounts because a 12-clip storyboard does not divide into 5 clips per account.",
    "If credits run short, a storyboard's take-1 clips (save_as WITHOUT 'alt') are the ones that matter. Finish every take 1 first, then go back for the alt takes.",
  ],
  model: "Veo 3.1 Lite",
  credits_per_clip: 10,
  aspect: "9:16 vertical",
  save_to: INBOX,
  ingest: "Automatic. The 14:20 LaunchAgent collects save_to, names each clip to its beat, uploads it and checks it plays. Do NOT run anything.",
  total_clips: todo.length,
  total_videos: todo.filter((r) => cost(r) > 0).length,
  total_stills: todo.filter((r) => cost(r) === 0).length,
  total_credits: todo.reduce((n, r) => n + cost(r), 0),
  accounts: groups.map(({ a, rows, credits }) => ({
    email: a.email,
    owner: a.owner,
    credits,
    clips: rows.map((r) => ({
      save_as: r.clip,
      credits: cost(r),
      storyboard: r.storyboard || `${r.slug}__${r.format}`,
      character: r.character || "",
      clips_in_storyboard: beatCount.get(r.storyboard || `${r.slug}__${r.format}`) || null,
      take: r.take || 1,
      seconds: r.seconds,
      beat_role: r.role,
      prompt: r.prompt,
      // v3 (2026-09-25): reference stills, Ingredients to Video, Extend.
      ...(r.pipeline === "v3" ? {
        pipeline: "v3",
        kind: r.kind,                       // "ref" | "keyframe" (images) or "shot" (a video)
        mode: r.mode || null,               // "ingredients" | "extend" | "frames"
        refs: r.refs || null,               // stills to attach as ingredients, by their save_as names
        extend_of: r.extend_of || null,     // the shot this one continues, same Flow project
        start_frame: r.start_frame || null, // frames: the still that is the first frame
        end_frame: r.end_frame || null,     // frames: the still that is the last frame (optional)
      } : {}),
    })),
  })).filter((g) => g.clips.length),
};

writeFileSync(OUT, JSON.stringify(doc, null, 2));
console.log(`[export] ${todo.length} rows (${doc.total_videos} videos, ${doc.total_stills} stills, ${doc.total_credits} credits) across ${doc.accounts.length} accounts`);
console.log(`[export] ${OUT}`);
console.log(`[export] save clips into ${INBOX}`);
