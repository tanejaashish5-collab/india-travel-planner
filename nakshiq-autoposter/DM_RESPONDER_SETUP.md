# Instagram Auto-DM Responder — Setup & Go-Live (2026-06-13; updated 2026-07-21)

> **2026-07-21 STATUS:** Founder rejected the paid ManyChat path — **Path A (self-hosted, $0) is THE plan.**
> Already true today: migration 071 APPLIED (social_dm_leads exists in prod), webhook route + engine
> deployed and safely no-op'ing until the Meta secrets land. NEW: keyword `MONSOON`/`month` →
> current-month go/wait/skip page (month_edit theme); editorial-carousel captions carry the comment-gate
> CTA only when `NAKSHIQ_COMMENT_GATE=1` is set on the autoposter (flip it ONLY after Meta go-live, so
> captions never promise a DM nothing delivers). Remaining work = the founder Meta steps below (dev-mode
> works on our own account with no App Review).

**Why this exists:** the autoposter captions already promise an auto-DM
(`comment_cta()` in `autoposter.py`: *"Comment 'kasauli' — I'll DM the 48-hour
plan I'd actually do."*). Until now **nothing delivered that DM** — every
commenter got ghosted. This system fulfils the promise: it listens for the
keyword comment (or a direct DM), privately DMs the promised NakshIQ read, logs
the lead, and captures an email when they reply with one.

```
Reel caption: "Comment 'kasauli' — I'll DM the 48-hour plan"
      │
      ▼  (someone comments "kasauli")
Instagram webhook ──► /api/instagram/webhook  (apps/web)
      │                     │ resolves "kasauli" → destination
      │                     │ builds the promised reply (best month, real costs, link)
      ▼                     ▼
  privateReplyToComment ─► DM lands in their inbox  ──►  logs social_dm_leads
                                                            │ they reply with email
                                                            ▼
                                              email captured + welcome email (Resend)
```

It also answers **direct DMs** ("if a DM ever drops") — keyword or free-form;
unknown messages get a friendly "which place are you weighing up?" reply.

---

## What was built (in this repo, ready)

| Piece | File | Status |
|---|---|---|
| Lead table | `supabase/migrations/071_social_dm_leads.sql` | ✅ written — **run on go-live** |
| Webhook + responder | `apps/web/src/app/api/instagram/webhook/route.ts` | ✅ written, type-checks |
| Funnel engine (pure) | `apps/web/src/lib/social-dm.ts` | ✅ unit-tested |
| Graph API client | `apps/web/src/lib/instagram-graph.ts` | ✅ written |
| Reel forward-trigger end-frame (Move 1) | `nakshiq-autoposter/reel_gen.py` | ✅ added to `score_reveal` |

Security baked in: HMAC `X-Hub-Signature-256` verification (constant-time),
fail-closed, ignores our own echoes (no reply loops), idempotent (unique
`event_id` index → a retried webhook never double-DMs), Graph sends fail soft so
the webhook always 200s to Meta.

---

## Two ways to go live

### ⚡ Path B — ManyChat (fastest, no Meta App Review, ~15 min) — RECOMMENDED FIRST
Use this to be live **this week** while Path A's App Review processes.
ManyChat owns the Meta plumbing; you just OAuth the account.

1. Create a free ManyChat account → connect Instagram **@nakshiq** (Instagram
   Business account must be linked to a Facebook Page — one-time).
2. Build one **Comment Reply** automation per keyword theme below. ManyChat's
   "Instagram Comments" trigger → "Send DM" action.
3. Free to 1,000 contacts; upgrade to Pro ($15/mo) at the cap.

**Flow spec (paste these):**

| Trigger keyword(s) in a comment | DM to send |
|---|---|
| any **destination name** (kasauli, spiti, coorg…) or `plan` | *"Here's the honest read on **{name}** 👇 best month, the 48-hour plan I'd do, and the months to avoid: nakshiq.com/destination/{slug} — want it emailed as a printable? Reply with your email ✉️"* |
| `where` | *"Skip the tourist trap — here's where I'd send my own family instead 👇 nakshiq.com/explore"* |
| `safety` | *"Your printable safety + emergency-contact card (verified numbers, save it offline) 👇 nakshiq.com/destination/{slug}"* |
| `stays` | *"The 3 stays I'd actually book with honest price bands 👇 …"* |
| `eat` / `food` | *"5 places to eat no listicle bothers with 👇 …"* |

> Because the captions trigger on the **destination's own name**, set the comment
> automation to "contains any keyword" with your top ~50 destination slugs, OR
> use ManyChat's default-reply + a keyword group. The self-hosted route (Path A)
> resolves *any* of the 525 destinations automatically — that's its advantage.

Default-DM (anyone who DMs cold): *"Hey! 👋 Tell me which place you're weighing up
(just send the name) and I'll send the honest NakshIQ read."*

### 🏠 Path A — Self-hosted route (owned, $0, richer) — the endgame
The route is already built and deployed with the web app. It resolves **all 525
destinations** dynamically and writes leads to your own DB. It needs a Meta app +
messaging permissions (App Review — a few days). Steps:

1. **Deploy + migrate:** push the web app, then run migration `071`
   (`npm run db:migrate` or apply `071_social_dm_leads.sql`).
2. **Meta app:** developers.facebook.com → create app → add **Instagram** product.
   Link @nakshiq (IG Business) to a Facebook Page.
3. **Tokens & secrets** → set these env vars in Vercel (Production **and**
   Preview):

   | Env var | What |
   |---|---|
   | `INSTAGRAM_APP_SECRET` | Meta app secret (for HMAC signature check) |
   | `INSTAGRAM_ACCESS_TOKEN` | long-lived IG access token (messaging + comments) |
   | `INSTAGRAM_VERIFY_TOKEN` | any random string you choose (echo it in step 4) |
   | `INSTAGRAM_BUSINESS_ID` | @nakshiq IG user id *(optional — webhook entry.id used otherwise)* |
   | `NAKSHIQ_AFFILIATE_ACTIVITIES_URL` | *(optional)* GetYourGuide/Klook deeplink, appended to DMs |
   | `INSTAGRAM_GRAPH_HOST` | *(optional)* set to `https://graph.facebook.com` for a Page-linked setup |

4. **Subscribe the webhook:** callback URL
   `https://www.nakshiq.com/api/instagram/webhook`, verify token = your
   `INSTAGRAM_VERIFY_TOKEN`; subscribe fields **`comments`** and **`messages`**.
5. **App Review:** request `instagram_manage_messages` + `instagram_manage_comments`
   (+ `instagram_basic`). For testing before approval, add yourself as a role on
   the app — it works on your own account in dev mode.

> Until `INSTAGRAM_APP_SECRET` is set, the route safely **acks without acting**
> (so Meta keeps the subscription enabled) — no risk to deploy ahead of go-live.

---

## The owned asset: 5-email welcome drip (Resend)

The DM captures the email; **email is the only channel no algorithm gates.** The
webhook already sends a one-shot welcome on capture. Wire this 5-touch drip next
(covers the 2–4 week India-trip decision window; one job, one link per email):

1. **Day 0 — Your NakshIQ read:** deliver the destination's best-month + 48-hour
   plan link. *(already sent by the webhook; expand to the drip)*
2. **Day 2 — "Did you know":** one surprising stat about their destination + the
   #1 activity to book (GetYourGuide/Klook deeplink).
3. **Day 5 — "The mistake most people make in {dest}":** wrong-month / overpay
   trap → the fix → link.
4. **Day 10 — "Book it smart":** Travelpayouts hotel/flight widget + honest cost
   breakdown.
5. **Day 14 — "Your next score":** a different destination recommendation →
   nakshiq.com/explore. Loop them back in.

Implementation home: `apps/web/src/emails/` (React Email) + a scheduled send,
same pattern as the newsletter cron. Lead source = `social_dm_leads.email`.

---

## Founder one-time steps (the only things I can't do)

1. **ManyChat** (Path B): create account, OAuth @nakshiq → live this week.
2. **Travelpayouts**: sign up as a **website** publisher (nakshiq.com — no
   follower minimum) → paste the GetYourGuide/Klook deeplink into
   `NAKSHIQ_AFFILIATE_ACTIVITIES_URL`.
3. **Path A go-live** (when ready): approve the web deploy + migration `071`, and
   do the Meta app + env-var steps above (I'll walk you through each).

Everything else — the responder, funnel logic, lead capture, email, the reel
end-frame — is built and staged. Nothing is deployed/migrated yet (founder-gated).
