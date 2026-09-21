# nakshiq-veo — daily Veo clip generation

Built 2026-09-20. This is the half of the Veo pipeline that **never existed**.

## What was actually broken

Nothing. There was no job.

Audited 2026-09-20 across the whole machine and repo:

| Checked | Result |
|---|---|
| LaunchAgents mentioning veo/flow | none |
| crontab | none |
| GitHub Actions workflows | none mention veo |
| Any code that submits a prompt to `flow.google.com` | **none anywhere** |

`scripts/veo-harvest.mjs` — the one file with "veo" in its name — only *collects*
`.mp4`/`download.zip` files that a human had already downloaded by hand. It was
never a generator.

So the 30 clips of **2026-09-15, 18:59–19:13** were one manual browser session,
and every day since produced nothing, because nothing was scheduled to. The daily
allowance (6 accounts x 50 credits = 30 clips at 10 credits each on Veo 3.1 Lite)
went unused by default, not by failure. Same class as a plist that is written but
never loaded: a capability nothing triggers.

## 🔴 Generation CANNOT be automated — settled 2026-09-21

`flow-run.mjs` does not work and cannot be made to work. This is a finding, not
a backlog item, and it is written down here so nobody rebuilds it.

Four routes were tried, in order, and every one is closed:

| Route | What happened |
|---|---|
| Playwright signs in | Google refuses: **"Couldn't sign you in / This browser or app may not be secure"**. It detects `--enable-automation` and `navigator.webdriver` on the sign-in flow. |
| Sign in with a normal Chrome, then let Playwright drive the profile | The founder signed in successfully; the **first Playwright launch against that profile invalidated the session**. Observed in sequence: plain Chrome signed in (`flow.google.com/?pli=1`) → Playwright signed out (`/about`) → plain Chrome signed out too. Google binds the session to the browser. |
| CDP into the founder's own Chrome | Chrome has **blocked `--remote-debugging-port` on a real profile since v136**; this machine runs **153**. |
| Copy cookies from his main profile | Credential material. **Deliberately not done.** |

Stripping the automation flags would be bot-detection evasion, so it was not done
either.

Two related things were also wrong and are worth keeping straight from the
selector work, because they made the failure look like a selector bug:

- **`flow.google.com/?authuser=N` is not account switching.** It redirects to
  `/about`, the marketing page. That is the real reason every account reported
  *"could not select Veo 3.1 Lite"* — the script was reading a landing page that
  has no model picker. Accounts switch **in-app**: avatar → **Switch account**.
- **Flow has no deep link.** `labs.google/fx/tools/flow` now redirects to
  `flow.google.com`, and `/tools/flow` is a 404. The app is plain
  `flow.google.com/`, which serves `/about` signed out and the workspace signed
  in. There is no URL that skips auth.

### What the job does instead

Generation is a human step; everything either side of it stays automatic.

```
verdicts.json ─► build-queue.py ─► veo_queue.json
                  (storyboard.py)        │
                                         ▼
                              make-paste-pack.mjs
                                         │
                    ~/Desktop/Reports/NakshIQ-Veo-Paste-Pack-<date>.html
                                         │
                            ░░ human pastes into Flow ░░
                                         │
                                         ▼
                              intake.sh ──► intake-manual.mjs
                                            collect-clips.mjs   name by beat
                                            upload-clips.mjs  ─► R2
```

`accounts.json` sets the roster and the order. **It is never mirrored to the
repo** — `india-travel-planner` is PUBLIC and that file names real Google
accounts. It lives only here, under `~/Automation/nakshiq-veo/`.

Each entry carries an `owner`. Some accounts belong to the Chanakya project, and
credits spent here are credits that project cannot spend; the pack labels those
rows so the cost is visible at the moment of spending. Remove a row to stop
using that account. Account addresses must not appear in this file either — it
IS mirrored, and on 2026-09-21 four of them reached the public repo exactly that
way.

**Order is load-bearing.** Downloads pair to beats by order, so the pack is
numbered and must be worked top to bottom. `bash intake.sh --dry` prints the
mapping and writes nothing — use it before committing to a batch.

## The loop

```
verdicts.json ─► build-queue.py ─► veo_queue.json
                  (storyboard.py)        │
                                         ▼
                                   flow-run.mjs      6 accounts x 5 clips
                                         │
                                         ▼
                                  collect-clips.mjs  name by beat
                                         │
                                         ▼
                                  upload-clips.mjs   ─► R2 nakshiq-videos
                                         │
                                         ▼
                       yt_shorts_v2.py fetches <slug>__<format>__b3.mp4
                       and cuts the reel in BEAT order
```

## Files

| File | Does |
|---|---|
| `build-queue.py` | Picks destinations least-recently-generated, storyboards them, queues prompts. One format per destination per run so the library broadens. |
| `flow-run.mjs` | Drives Flow across 6 accounts. `--login`, `--probe`, `--headful`. |
| `collect-clips.mjs` | Unpacks Flow's zips, renames downloads to beat names **by order**, refusing entirely on a count mismatch. |
| `upload-clips.mjs` | Pushes to the `nakshiq-videos` R2 bucket. Idempotent on byte size. |
| `run-veo.sh` | The wrapper the LaunchAgent runs. |
| `com.nakshiq.veo-daily.plist` | 09:20 and 14:20 daily. |

## The one thing a human must do every day

Open the pack, paste 28-30 prompts into Flow in a normal Chrome, download, then
run `bash ~/Automation/nakshiq-veo/intake.sh`. Roughly ten minutes.

`flow-run.mjs --login` is retired: it cannot sign in (see the table above), and
the session it would create is destroyed the moment Playwright touches it.

## Rules baked in as code, not comments

- **Veo 3.1 Lite or nothing.** Flow defaults to Omni 1.1 Flash at 12 credits vs
  Lite's 10 — 20% more per clip and 4 clips per account instead of 5. If the
  model control cannot be found, the account is **refused**, never generated on
  the default.
- **Zero clips generated exits non-zero.** A job reporting success while
  producing nothing is how the last gap stayed invisible.
- **Count mismatch collects nothing.** Downloads pair with beats by order, so a
  mismatch would mislabel footage. A beat with no clip merely shortens a shot; a
  beat with the *wrong* clip is a lie.
- **Two fire times.** A single daily fire drops the day if the Mac is asleep.
- **`/bin/bash` via LaunchAgent.** It holds Full Disk Access here, so the job can
  read the storyboard code in the repo under `~/Desktop`; cron could not unlock
  the keychain and a non-FDA interpreter could not read `~/Desktop`.
- **Queue tops up to the budget, not by it.** Generation is the bottleneck, so
  queueing a fresh 27 on every fire would build a backlog that 30/day can never
  clear (observed: 27 to 54 in two runs).

## Mirror rule

`~/Automation` is **not** a git repo. This directory is mirrored to
`ops/nakshiq-veo/` in the India Travel Planner repo. **After editing the live
copy, re-copy and commit** — same rule, and same failure mode, as
`ops/nakshiq-ig/`.

## Logs

`~/.claude/veo-daily.log`. A 0-byte log mid-run is normal: output buffers until
exit. Judge liveness by `ps` and by the queue's status counts, never by log size.
