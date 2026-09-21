Set up a daily scheduled task for me. Do the setup only: do NOT generate any videos now.

TASK TO CREATE
- Name: nakshiq-veo-daily
- Schedule: every day at 10:00 AM, my Mac's local time
- Description: Daily 10 AM: generate the day's NakshIQ reel clips in Google Flow (Veo 3.1 Lite, 9:16) from ~/Automation/nakshiq-veo/today-tasks.json, saving each .mp4 under its exact save_as name into inbox/. Unattended; drops files only.
- Instructions: use the file /Users/ashishtaneja/Automation/nakshiq-veo/cowork-task.SKILL.md. Copy everything below its front matter (the block between the two --- lines) into the task VERBATIM. Do not summarise, shorten or reword any of it. Every rule in it exists because something went wrong without it.
- Put this line at the very top of the task's instructions, above the copied text:
  "Before anything else, read /Users/ashishtaneja/Automation/nakshiq-veo/cowork-task.SKILL.md. If it differs from the instructions below, the file wins: it is the maintained copy."
  (That lets the brief be improved later without recreating the schedule.)

IF IT ALREADY EXISTS
A folder ~/Documents/Claude/Scheduled/nakshiq-veo-daily/ may already hold a SKILL.md with this content but no schedule attached. Update or attach to that one. Do NOT create a second task with a similar name. Leave every other scheduled task exactly as it is, including chanakya-shots-week, which stays disabled.

ACCESS THE TASK WILL NEED (grant it now, while I am here)
1. Folder: /Users/ashishtaneja/Automation/nakshiq-veo/ with read AND write (it writes into inbox/).
2. Desktop Commander, to reach ~/Downloads, which the sandbox cannot see.
3. The Claude-in-Chrome connection, to drive Google Flow in my signed-in Chrome.
If any of these asks for approval, ask me now rather than letting the unattended run fail at 10 AM.

PRE-FLIGHT CHECK (read-only: no generating, no credits spent)
1. Read today-tasks.json and tell me total_clips and how many storyboards it lists.
2. Confirm you can write to inbox/: create a file named _write-test, then delete it.
3. Confirm Chrome is reachable, and that flow.google.com loads signed in, not on the /about marketing page.
4. List which Google accounts appear in Flow's Switch account menu, and say which of them show "Signed out".
5. Confirm ~/Downloads is reachable through Desktop Commander.

DO NOT, during this setup
- Do not generate, download or save any video.
- Do not run any script.
- Do not edit today-tasks.json, cowork-task.SKILL.md or any code.
- Never enter a password or solve a CAPTCHA. If an account needs one, report it to me.

WHEN YOU ARE DONE, REPORT
- The task name, its schedule, and that it is enabled. Quote its first line back to me.
- Confirmation that the instructions match cowork-task.SKILL.md word for word, apart from the one added first line.
- The results of each of the 5 pre-flight checks.
- Anything that needs me: an approval, a signed-out account, or the Mac needing to stay awake and the Claude app to stay open at 10 AM.
