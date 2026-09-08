# nakshiq-ig — daily Instagram seeding brief

**This is a MIRROR. The live copy runs from `~/Automation/nakshiq-ig/`.**
`~/Automation` is not a git repo, so without this mirror the automation has no
backup at all. After editing the live copy, mirror it back and commit:

```bash
cd "$HOME/Desktop/India Travel Planner"
for f in daily-brief.mjs merge-candidates.mjs run-brief.sh notifier.applescript pool.json; do
  cp ~/Automation/nakshiq-ig/$f ops/nakshiq-ig/$f
done
cp ~/Library/LaunchAgents/com.nakshiq.ig-brief.plist ops/nakshiq-ig/
```

## What runs

`com.nakshiq.ig-brief` fires at 17:30 and 20:10 local (two fire times because a
single daily fire drops the day on network loss). Each run rotates the account
pool least-recently-served first, re-verifies each handle against its public
profile page, drafts a comment line per starred target, renders a dark PDF to
`~/Automation/nakshiq-ig/briefs/` (mirrored to `~/Desktop/Reports/`) and posts a
clickable notification.

**It never logs in, follows, comments, likes or DMs.** Instagram enforces
engagement automation on the account, and @nakshiq is in the fastest-blocked
tier. Those taps are the founder's. Do not "improve" this by adding them.

## Not in this folder

- `data/verdicts.json` — rebuilt by `scripts/refresh-ig-verdict-pack.mjs` (needs
  Supabase env, so it is a session job, never launchd).
- `data/served.json`, `logs/`, `briefs/` — runtime state.
- `NakshIQ-Brief.app` — rebuild with `osacompile -o NakshIQ-Brief.app
  notifier.applescript`, then add the bundle id that osacompile omits:
  `/usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string com.nakshiq.brief" NakshIQ-Brief.app/Contents/Info.plist`
  then `lsregister -f "$PWD/NakshIQ-Brief.app"`. Without that bundle id the
  notification belongs to Script Editor and clicking it opens an empty document
  picker.
- `node_modules/` — `npm install playwright-core`. Chrome is used via
  `channel: "chrome"`, so no browser download and nothing is imported from
  `~/Desktop` (launchd is TCC-blocked there).

## Maintenance

- Expand the pool: scout handles, write a candidates JSON, then
  `node merge-candidates.mjs logs/candidates-X.json`. It verifies every handle
  live and enforces the 800 to 200,000 follower band. Roughly one in five
  scouted handles does not exist, so never merge an unverified list.
- Refresh verdicts before the pack's months run out.
