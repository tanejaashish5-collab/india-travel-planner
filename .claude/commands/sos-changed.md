---
description: Monday triage of emergency numbers that vanished from their official source. Finds where each number went and proposes a fix; a pinned script double-checks before anything is written.
---

Triage the rows in `ROWS`: emergency numbers the Monday check could no longer find on their recorded page. Ashish never sees this run unless a row cannot be settled. Do not ask him anything.

Read `.claude/commands/sos-backlog.md`, section "Non-negotiables": they apply here. `auto_verify_note` on each row names the exact numbers at issue. `source_map[<digits>].url` is where each was last seen. Ignore every other number on the row.

## For each flagged number, establish which case it is

Start on the old page, then its own site: NIC sites are templated, so try `/helpline/`, `/en/helpline/`, `/public-utility/`, `/telephone-directory/`, `/disaster-management/`, `/police/`, `/contact-us/`. Then search. Hosts are slow, so retry before calling one dead.

1. **Moved.** The same number is printed on another official page, **against the same facility and place the row states**. Propose `kind: "moved"`.
2. **Replaced.** An official page prints a different number for that same facility or place, and the stored number appears nowhere official against it. Propose `kind: "replaced"` with `new_number` exactly as the page prints it.
3. **Misfiled.** The number is on an official page but against a different facility or place. On 2026-11-02 Silvassa's "DNH Police Control Room: 0260-2220444" turned out to be listed under Daman & Diu, and the DNH control room had its own number. That is case 2: propose the right number. It is never "moved".
4. **Gone or unclear.** Propose nothing. Leave it out and say what you tried in `notes`. This is a fine outcome; the row stays on his email, which is correct.

Do not propose from an aggregator, a blog or news. Hosts must be `.gov.in`, `.nic.in` or `.edu.in`, or listed in `data/sos-source-hosts-allow.json`.

## Output

Write `PROPOSALS`:

`{"proposals":[{"destination_id","digits":"<digits as in the note>","kind":"moved|replaced","url","quote","new_number"}],"notes":"<what you tried for anything left out>"}`

`quote` is copied verbatim from the page and must contain both the label and the number, for example `Police Control Room 91-260-2642130`. A script re-fetches every page, and two independent sessions then re-check that the number belongs to that facility. You cannot write to the database and must not try. Do not commit.

Finish with one line: `RESULT proposed=<n> left=<n>`.
