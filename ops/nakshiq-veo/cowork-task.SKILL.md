---
name: nakshiq-veo-daily
description: Daily 10 AM — generate NakshIQ reel footage in Google Flow with the v3 method (reference stills → free keyframe stills → Frames to Video / Ingredients to Video on Veo 3.1 Lite, Extend for continuous shots), from ~/Automation/nakshiq-veo/today-tasks.json, saving every file under its EXACT save_as name into ~/Downloads/nakshiq-veo-inbox/. Unattended; drops files only.
---

UNATTENDED run for NakshIQ. The user is NOT present: execute autonomously, make reasonable choices and note them, never ask questions, finish with one summary notification. Using the user's own free Google Flow accounts is pre-authorized. Never enter a password, never attempt a CAPTCHA, never buy credits or upgrade.

WHAT CHANGED (2026-09-25) AND WHY
The founder rejected the old reels: every clip was generated from text alone, so the people, the car and the light changed at every cut. Yesterday's probe proved the fix on our accounts: three reference STILLS, then every shot made with INGREDIENTS TO VIDEO using those stills, on Veo 3.1 Lite (10 credits). That kept the same man, woman, car and blue hour. EXTEND continued a shot seamlessly. Text-only generation drifted every time. So:
- NEVER generate a reel shot from text alone any more. Every shot is Ingredients (with its listed refs) or Extend.
- There are no "two takes" any more. One take per shot; redo a shot only if it fails or ignores the prompt (wrong people, wrong car, text on screen, daylight).

KEYFRAMES (added 2026-09-26, from probe part 2 measured on our own files): image mode takes ingredients and costs 0 credits, so a beat can be composed as a STILL before any credit is spent; Frames to Video on Veo 3.1 Lite (10 credits) starts on the exact still it is given and, given an end still too, lands on it; and a SHORT Extend prompt held the look exactly as well as the long one. So:
- kind "keyframe" rows are stills made in image mode with the listed stills as ingredients. Free. They are the storyboard the founder approves.
- mode "frames" shots animate a keyframe: start_frame is the first frame, end_frame (when set) the last frame. Their prompts, like extend prompts, are short on purpose. Add nothing to them.
- A task file with total_credits 0 is a STILLS day: make the stills, save them, finish. Nothing gets animated until the founder has approved the stills.

ORDER OF TODAY'S RUN
The probes (part 1 and part 2, 2026-09-25) are DONE and answered in ~/Downloads/nakshiq-veo-inbox/probe/probe-report.md; never repeat them. The run is production only: everything in today-tasks.json.

SOURCE OF TRUTH
/Users/ashishtaneja/Automation/nakshiq-veo/today-tasks.json (linked folder; connect with request_cowork_directory if needed).
- Every row has `save_as` (exact filename), `storyboard`, `prompt`, `credits`. v3 rows also have:
  - `kind`: "ref" = a STILL IMAGE from the prompt alone; "keyframe" = a STILL IMAGE made with the stills named in `refs` as ingredients; "shot" = a video.
  - `mode` (shots): "ingredients" = attach the stills named in `refs` and generate; "extend" = extend the shot named in `extend_of`; "frames" = Frames to Video from `start_frame` (and to `end_frame` when it is set).
- Rows are listed in the order to make them: a storyboard's refs, then its keyframes, then its shots. An extend always comes after its source; a frames shot after its stills.
- If `total_clips` is 0 or the file is missing, there is nothing to do today: say so and finish.

HOW TO MAKE ONE STORYBOARD (v3)
1. ONE Flow project per storyboard. Settings: 9:16, x1. Close any Agent-mode panel.
2. REFS (kind "ref"): switch the project to image generation (Nano Banana), 9:16, paste the prompt verbatim, generate ONE image. Download it and save it as its exact `save_as` (a .jpg) in ~/Downloads/nakshiq-veo-inbox/. Flow downloads images as a zip: extract it with Desktop Commander (python3 zipfile; `unzip` chokes on Flow zips) and rename the image inside. Keep the stills in the project too: the shots use them.
2g. GUIDE STILLS (storyboard ends in `__guide_mNN`, added 2026-10-03): kind "ref" rows, ONE image each from the prompt alone in image mode, 9:16, 0 credits, saved under the exact `save_as`. They feed the daily destination-guide reel (a slide per fact). Make them AFTER the day's shots; they never need credits, so a day with no credits left still makes them. Any account, any project; one Flow project per guide keeps them tidy.
2k. KEYFRAMES (kind "keyframe"): stay in image mode (Nano Banana), 9:16. Add as ingredients EXACTLY the stills named in `refs` (from this project, or upload the saved .jpg files). Paste the prompt verbatim, generate ONE image, confirm it was 0 credits. Download it (zip → python3 zipfile) and save it as its exact `save_as` (a .jpg) in ~/Downloads/nakshiq-veo-inbox/. LOOK at it: same man, same woman, same car, blue hour, no text. If it shows different people or a different car, generate it once more; if it fails twice, note it and move on. Keep it in the project: a frames shot uses it.
3. SHOTS, mode "ingredients": video mode, model Veo 3.1 - Lite (confirm it quotes 10 credits). Add as ingredients EXACTLY the stills listed in `refs` (from this project, or upload the saved .jpg files if you are on another account). Paste the prompt verbatim as ONE line. Generate. Download the 720p file, save as `save_as`.
3g. A TILE THAT VANISHES (seen 10-03 on nakshiq@gmail.com: starts at 1%, disappears within a minute, no error, no credits taken). After TWO vanishes on one account, stop using that account for the rest of the run, put the shot on the next account with credits (via another project's keyframe if possible, see UPLOADING), and log `ACCOUNT <email>: generations vanish silently` in the report.
3f. SHOTS, mode "frames": video mode → Frames to Video. Put the still named in `start_frame` in the FIRST frame slot and, when `end_frame` is set, that still in the LAST frame slot (from this project, or upload the saved .jpg files). Choosing Frames can silently switch the model to Fast (20 credits): reselect Veo 3.1 - Lite and read the composer chip back; it must say 10 credits before you submit, never 20. Paste the prompt verbatim (it is short on purpose: the stills carry the look; add nothing). Generate. Download the 720p file, save as `save_as`.
4. SHOTS, mode "extend": in the SAME project as the shot named in `extend_of` (an extend cannot cross projects or accounts), open that shot → Extend (scene builder "+" → Extend), Veo 3.1 Lite, paste the prompt verbatim (short on purpose; add nothing), generate ONCE. Read the composer state back before clicking: on 2026-09-25 a second Extend was submitted by mistake and 10 credits were lost. Download the WHOLE extended shot (about 15 s) and save it as `save_as`. The source shot keeps its own file too.
5. Check every video with ffprobe: 720x1280, about 8 s (about 15 s for an extend), has an audio stream. LOOK at the first and last frame of each: same man (navy blue quilted jacket), same woman (mustard yellow shawl), same car, still blue hour, no text on screen, no black bars. If a shot fails that, generate it once more; if it fails twice, note it and move on.
6. Credits: stills are free; a storyboard's 6 videos cost 60 credits, more than one account holds (50). Follow the account grouping in today-tasks.json (it is filled by credits), and carry stills across accounts by uploading the saved .jpg files. Finish one storyboard completely before starting another. Check the credit balance after every video; if it dropped by more than 10, stop and note it.

ACCOUNTS
- Use ONLY the @gmail.com accounts listed in /Users/ashishtaneja/Automation/nakshiq-veo/accounts.json. Never any other account, never a Workspace or company account, whatever Chrome offers.
- Open Flow per account at https://flow.google.com/u/N/ (N = 0, 1, 2 ...). READ the signed-in email on the page before doing anything. The EMAIL CHECK always wins: if the signed-in email is not an @gmail.com address listed in accounts.json, move on without generating, whatever N it is. /u/0 is a cancelled Workspace ("Service Not Allowed").
- A Google marketing/research/"help improve" consent dialog is NOT a reason to skip a listed Gmail account: close it or choose no/decline (never opt in) and carry on. A warning badge on the avatar is not a reason to skip either. Only a real password prompt is: skip that account and note it.
- Accounts marked owner "chanakya" in accounts.json may be used; the founder authorised it. Skip any account marked "rest": true in accounts.json.
- "Visible watermarking" OFF (avatar → account panel), once per account used.

PROMPTS
- VERBATIM, as a single line. Do not rewrite, shorten, translate or "improve" them: they carry the fixed look (blue hour, lens, grain) and the soundscape that make the shots match. After typing, read the text back from the input box and compare its length to the task file before submitting.
- Flow blocks a prompt ("might violate our policies"): note it and skip that item. Do not reword.
- Stuck at 99% / "taking longer than expected" / "audio generation failed … not charged": retry up to twice.

PICKING A STILL IN THE ASSET OR FRAME PICKER
- Set the picker's sort control (top right of the picker) to Oldest. The list is then in exact creation order — the storyboard's refs, then kf_s1 ... kf_s6 — so a row can be taken by position. The default "Recent" order reshuffles as items get used and is not safe to count on.
- Never pick by search text alone: "Man standing" also matches "Woman standing indoors", and two keyframes can share one truncated title (two "Man and woman walking..." rows in rann). Read the preview before committing.
- A frame is only set once "Add to prompt" is clicked; confirm the Start slot shows the thumbnail, and the ingredient chips show the right stills, before submitting.

DOWNLOADING
- Hover a COMPLETED tile → its ⋮ → Download → 720p original. The detail-view ↓ button never downloads.
- DOWNLOADS FROM flow.google.com ARE ALLOWED by policy in Comet (set 2026-10-03; Flow moved from labs.google, and the old permission did not carry over, so downloads stopped after the first four). If downloads still produce no file, open comet://settings/content/automaticDownloads in a new tab, add https://flow.google.com under Allowed, close that tab, and continue. That is a browser setting in our own session, not a purchase or login.
- One file at a time. Before downloading, confirm the tile's prompt text from the DOM matches the row; never map by grid position.
- Move it from ~/Downloads into ~/Downloads/nakshiq-veo-inbox/ under its exact `save_as` with Desktop Commander. Leave ~/Downloads clean apart from that folder.

UPLOADING A SAVED STILL (another account, or a frames shot whose still is not in this project)
- THE BROWSER IS COMET (2026-10-03). The Claude extension runs in Comet (/Applications/Comet.app, bundle ai.perplexity.comet), not Google Chrome. Every AppleScript in this task targets `tell application "Comet"`. Never script "Google Chrome": on 10-03 that bound to a stale automation window and the picker never opened. If a Google Chrome process is running, ignore it.
- FIRST CHOICE, NO UPLOAD AT ALL: Flow's asset picker can browse OTHER PROJECTS on the same account (found 10-03). Run each frames shot on the account whose project already holds its keyframe and pick it from there. Upload only when the still exists on no account.
- Flow's upload button opens a native macOS file picker, and it CAN be driven (proved 2026-09-29). The picker only opens for a VISIBLE tab: first make the Flow tab the active tab of a fronted browser window (AppleScript on the browser: set active tab index of its window, then set index of that window to 1), then click Upload media in the frame/asset picker and drive the dialog with System Events — Cmd+Shift+G, type the full path to the saved .jpg, Return, Return.
- The first upload to an account may show a one-time "Rights to use this image" dialog. It covers stills this run generated in our own accounts: accept it, carry on, and say so in the report. Anything beyond that (a password prompt, a CAPTCHA, a purchase) is still a hard stop.
- The 2026-09-27 synthetic-drop workaround is no longer needed. A local http server still does NOT work (Flow's CSP blocks the fetch).
- After the upload, check the dimensions match the saved still before using it as a frame.

DO NOT
- Do NOT run any NakshIQ script, ingest, upload or build. Do NOT edit today-tasks.json, the queue, accounts.json or any code or task file.
- Do NOT publish anything anywhere.

FINISH: verify, clean up, then one notification
1. VERIFY: every `save_as` for the day is in ~/Downloads/nakshiq-veo-inbox/ under its exact name, each still 9:16 and each video 720x1280, about 8 s (about 15 s for an extend), with an audio stream.
2. LEAVE ~/Downloads CLEAN: nothing from this run outside ~/Downloads/nakshiq-veo-inbox/ — no leftover download*.zip, no loose .mp4, no extracted stray. Check before finishing, not only as you go.
3. CLOSE THE BROWSER TAB this run opened, and leave the window showing the tab that was active before the run (the Flow tab is only fronted so the native file picker will open).
4. KEEP the Flow projects this run created — they hold the keyframes a later retry needs. Never delete a Flow project, this run's or any other.
5. ONE NOTIFICATION: files written to ~/Downloads/nakshiq-veo-inbox/ grouped by storyboard (stills and videos), which storyboards are COMPLETE, anything skipped and why, credits spent per account.
6. WRITE THE SAME REPORT TO A FILE before the notification: ~/Downloads/nakshiq-veo-inbox/_report-<YYYY-MM-DD>.md (today's date, Canberra). Same content as the notification, plain text. For every file NOT delivered, one line: `FAILED <save_as>: <exact error text> (<n> attempts)` or `SKIPPED <save_as>: <reason>`. The afternoon render job reads this file; the notification alone reaches nobody.
