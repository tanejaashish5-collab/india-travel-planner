# SOS provenance backlog — run blocked by network policy, zero writes

**Date:** 2026-08-09
**Trigger:** scheduled `sos-backlog` routine, one hour before `sos-auto-reverify` (Monday cron)
**Outcome:** **0 numbers sourced, 0 rows changed.** This environment's network egress
policy blocks all outbound web access to non-allowlisted hosts, so no candidate source
page could be fetched and personally verified. Per the non-negotiable rule ("never write
a number you have not seen on a live official page"), that means no writes — not "best
effort partial sourcing," a clean stop.

## What happened

Pulled the backlog first (still useful — see Numbers below), then began sourcing the
highest-impact shared numbers: Indian Coast Guard `1554` (23 rows), Gujarat Tourism
`1800-203-1111` (31 rows), Maharashtra Tourism `1800-267-1975` (15 rows). `WebSearch`
returned plausible official candidate URLs for all three
(`indiancoastguard.gov.in/contact-us`, `gujarattourism.com/contact-us.html`,
`maharashtratourism.gov.in/contact/`).

Every attempt to actually fetch and read one of those pages failed the same way:

```
EGRESS_BLOCKED — indiancoastguard.gov.in is blocked by the network egress proxy
EGRESS_BLOCKED — gujarattourism.com is blocked by the network egress proxy
EGRESS_BLOCKED — maharashtratourism.gov.in is blocked by the network egress proxy
```

Ruled out "one bad domain" before concluding it was systemic:

- Raw `curl` to the same three hosts: `CONNECT tunnel failed, response 403` (bypasses
  nothing — same proxy).
- Raw `curl` to `google.com`, not a `.gov.in` site at all: same `403`.
- A separate Haiku sub-agent (own process, own WebFetch call) hit the identical
  `EGRESS_BLOCKED` on `indiancoastguard.gov.in` — so this isn't specific to my session's
  client, sub-agents share the same policy.
- `$HTTPS_PROXY/__agentproxy/status` confirms it structurally: `recentRelayFailures`
  shows `connect_rejected` / "gateway answered 403 to CONNECT (policy denial or upstream
  failure)" for both hosts tried. The proxy's own README is explicit: *"403/407 from the
  proxy: the destination host is not allowed by your organization's egress policy for
  this session. Do not retry or route around it — report the blocked host."*

`WebSearch` itself still works (it returns snippets/URLs through a separate hosted
search backend, not the egress-gated fetch path) — so I could find candidate pages, just
never read one to confirm what's printed on it. Per the skill's own rule ("an agent's
claim is not evidence... every URL gets re-fetched and re-matched by you"), a snippet
plus a plausible URL is exactly the kind of unverified claim this backlog process exists
to reject. I did not attempt to route around the block (headless browser, alternate
fetch path, etc.) — the proxy README explicitly says not to, and doing so would also
defeat the point of a policy-scoped session.

**No `emergency_sos` row was touched.** Leaving the data alone is the correct outcome
here, not a fallback — writing on an unverified snippet would be exactly the fabrication
risk this process is built to prevent.

## Numbers (backlog state as pulled, before this run attempted anything)

| | |
|---|---|
| Rows `auto_verify_status = needs_source` | 300 |
| Rows `number_changed` | 0 |
| Rows `source_unreachable` | 0 |
| Distinct un-sourced numbers | ~230 |
| Rows clearable by the top 7 shared numbers alone | ~99 (1554×23, 1800-203-1111×31, 1800-267-1975×15, 03192232694×12, 1364×8, 01902255313×18 HP/Manali, 1800-233-7777×5) |

Known dead ends from the 2026-07-27 run — not re-attempted, per the brief:
`03803-222253` (District Hospital Roing), `04545-240581` (Government Hospital Palani),
`04172-232538` (Govt HQ Hospital Walajah).

## What would let this run actually do its job

The routine needs outbound HTTPS to `*.nic.in`, `*.gov.in`, and state tourism/health/
police domains from whatever environment runs it. Concretely, one of:

1. Run `sos-backlog` from a session/environment whose network policy allows those
   domains (a local session, or a cloud session created with a broader egress policy),
   rather than this container's current allowlist (effectively npm/pypi/crates/
   Anthropic-only, per `$HTTPS_PROXY/__agentproxy/status`'s `noProxy` list).
2. Or widen this environment's egress policy to include `.nic.in` / `.gov.in` and the
   handful of state tourism domains this backlog repeatedly needs (gujarattourism.com,
   maharashtratourism.gov.in, mptourism.com, indiancoastguard.gov.in, etc.) — a founder/
   admin-level change, not something fixable from inside the session.

Until one of those changes, this routine will keep landing here: it can enumerate and
prioritize the backlog (that part only needs Supabase, which worked fine), but it cannot
source a single number, because sourcing requires reading a live page and that path is
closed for this session.

## Not escalated to a human as a data-safety issue

No stored number was found to be wrong — none was checked at all. This is an
infrastructure/access blocker, not a "genuinely wrong number" finding, so it doesn't meet
the skill's bar for escalating about data. It's still worth a heads-up, separately, that
the routine could not run.
