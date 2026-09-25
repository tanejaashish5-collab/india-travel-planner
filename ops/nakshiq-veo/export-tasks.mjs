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
const QUEUE = join(HERE, "veo_queue.json");
const ACCOUNTS = join(HERE, "accounts.json");
// Where the session SAVES. Inside ~/Downloads because that is the only place
// its Desktop Commander access reaches; the LaunchAgent collects from here.
const INBOX = join(os.homedir(), "Downloads", "nakshiq-veo-inbox");
const OUT = join(HERE, "today-tasks.json");
const PER_ACCOUNT = Number(process.env.VEO_PER_ACCOUNT || 5);

if (!existsSync(QUEUE)) { console.error("[export] no veo_queue.json — run build-queue.py first"); process.exit(1); }
const pending = JSON.parse(readFileSync(QUEUE, "utf-8")).filter((r) => r.status === "pending");
if (!pending.length) { console.log("[export] nothing pending"); process.exit(0); }

const accounts = JSON.parse(readFileSync(ACCOUNTS, "utf-8")).accounts;
// v3 storyboards go first and are never split by the per-account slicing
// below in a way that matters: the task says how to carry refs across accounts.
pending.sort((a, b) => (b.pipeline === "v3") - (a.pipeline === "v3"));
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

// v3 has its own rules; the v2 lines below (two takes, text-only character
// descriptions) would contradict them, so a v3 day ships only these.
const HOW_V3 = [
  "v3 METHOD (2026-09-25): never generate a reel shot from text alone. kind 'ref' rows are STILL IMAGES (Nano Banana, 9:16). kind 'shot' rows are videos on Veo 3.1 Lite: mode 'ingredients' = attach exactly the stills named in refs; mode 'extend' = Extend the shot named in extend_of, in the SAME Flow project.",
  "Make rows in the order listed: a storyboard's refs, then its shots. One take per shot; redo only a failed shot.",
  "Save every file under EXACTLY its save_as name in save_to. Matching downstream is by filename only.",
  "Use ONLY the @gmail.com accounts in accounts[]; read the signed-in email before generating. Account assignment is advisory: carry the saved stills to another account by uploading them as ingredients.",
  "Prompts verbatim, one line. They carry the fixed look and soundscape that make the shots match.",
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
  total_credits: todo.length * 10,
  accounts: accounts.map((a, i) => ({
    email: a.email,
    owner: a.owner,
    clips: todo.slice(i * PER_ACCOUNT, (i + 1) * PER_ACCOUNT).map((r) => ({
      save_as: r.clip,
      storyboard: `${r.slug}__${r.format}`,
      character: r.character || "",
      clips_in_storyboard: beatCount.get(`${r.slug}__${r.format}`) || null,
      take: r.take || 1,
      seconds: r.seconds,
      beat_role: r.role,
      prompt: r.prompt,
      // v3 (2026-09-25): reference stills, Ingredients to Video, Extend.
      ...(r.pipeline === "v3" ? {
        pipeline: "v3",
        kind: r.kind,                       // "ref" (an image) or "shot" (a video)
        mode: r.mode || null,               // "ingredients" | "extend"
        refs: r.refs || null,               // stills to attach, by their save_as names
        extend_of: r.extend_of || null,     // the shot this one continues, same Flow project
      } : {}),
    })),
  })).filter((g) => g.clips.length),
};

writeFileSync(OUT, JSON.stringify(doc, null, 2));
console.log(`[export] ${todo.length} clips across ${doc.accounts.length} accounts`);
console.log(`[export] ${OUT}`);
console.log(`[export] save clips into ${INBOX}`);
