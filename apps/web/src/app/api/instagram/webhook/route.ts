/**
 * /api/instagram/webhook — Instagram comment + DM auto-responder.
 *
 * Fulfils the promise the autoposter captions already make ("Comment 'kasauli'
 * — I'll DM you the 48-hour plan"). Two inbound paths, one engine:
 *   • field "comments"  → privately DM the commenter the promised plan
 *   • messaging (DMs)   → answer a direct message (keyword or free-form)
 *
 * Security:
 *   • GET  verifies the webhook with hub.verify_token (constant-time compare).
 *   • POST verifies X-Hub-Signature-256 (HMAC-SHA256 over the RAW body) by
 *     comparing raw digest bytes with timingSafeEqual — fail closed.
 *   • Ignores our own echoes / our own comments → no reply loops.
 *   • Idempotent: a unique index on social_dm_leads(platform,event_id) means a
 *     retried webhook never double-DMs; on a DB hiccup we SKIP (never double-send).
 *   • Anti-relay: only emails an address from a user who already engaged us.
 *   • Always 200s to Meta after a valid signature (so Meta keeps the
 *     subscription); Graph sends fail soft.
 *
 * Setup + go-live steps: nakshiq-autoposter/DM_RESPONDER_SETUP.md
 */
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getCachedDestinationsIndex } from "@/lib/cached-data";
import { currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";
import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";
import {
  sendDirectMessage,
  privateReplyToComment,
  publicReplyToComment,
} from "@/lib/instagram-graph";
import {
  resolveIntent,
  buildDmReply,
  buildGenericReply,
  buildPublicCommentReply,
  extractEmail,
  type DmDestination,
  type DmTheme,
} from "@/lib/social-dm";

export const runtime = "nodejs"; // createHmac + raw body need Node, not Edge
export const dynamic = "force-dynamic";

const MONTHS = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Our own IG business account id (override the webhook entry.id if needed). */
let _warnedNoBusinessId = false;
function businessId(entryId: string | undefined): string {
  const env = process.env.INSTAGRAM_BUSINESS_ID;
  if (env && env.length > 0) return env;
  if (!_warnedNoBusinessId) {
    console.warn("[ig-webhook] INSTAGRAM_BUSINESS_ID unset — using webhook entry.id as self-ID");
    _warnedNoBusinessId = true;
  }
  return entryId || "";
}

// ── GET: webhook verification handshake ───────────────────────────────────────
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const tokenParam = url.searchParams.get("hub.verify_token") || "";
  const challenge = url.searchParams.get("hub.challenge") || "";
  const expected = process.env.INSTAGRAM_VERIFY_TOKEN || "";

  if (!expected) {
    console.warn("[ig-webhook] GET verify: INSTAGRAM_VERIFY_TOKEN not set");
    return new Response("forbidden", { status: 403 });
  }
  if (mode === "subscribe" && constantTimeEqual(tokenParam, expected)) {
    return new Response(challenge, { status: 200, headers: { "content-type": "text/plain" } });
  }
  return new Response("forbidden", { status: 403 });
}

// ── POST: event delivery ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const appSecret = process.env.INSTAGRAM_APP_SECRET;

  // Fail closed when a secret IS configured; ack-without-action when it isn't yet
  // (pre-go-live) so Meta keeps the subscription enabled.
  if (appSecret) {
    const sig = req.headers.get("x-hub-signature-256") || "";
    if (!verifySignature(raw, sig, appSecret)) {
      return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
    }
  } else {
    if (process.env.NODE_ENV === "production") {
      console.warn("[ig-webhook] INSTAGRAM_APP_SECRET unset in production — acking without processing");
    }
    return NextResponse.json({ ok: true, note: "INSTAGRAM_APP_SECRET unset — ack only" });
  }

  let body: IgWebhookBody;
  try {
    body = JSON.parse(raw) as IgWebhookBody;
  } catch {
    return NextResponse.json({ ok: true, note: "unparseable body" });
  }

  // Never block Meta on our processing — do the work but always 200.
  try {
    await handleBody(body);
  } catch (e) {
    console.error("[ig-webhook] processing error:", e instanceof Error ? e.message : e);
  }
  return NextResponse.json({ ok: true });
}

// ── Core dispatch ─────────────────────────────────────────────────────────────
async function handleBody(body: IgWebhookBody): Promise<void> {
  if (!body || body.object !== "instagram" || !Array.isArray(body.entry)) return;
  const supabase = getSupabase();
  const { knownSlugs, slugByName } = await loadCatalog();

  for (const entry of body.entry) {
    const selfId = businessId(entry.id);

    // 1) Comment events
    for (const change of entry.changes || []) {
      if (change.field !== "comments") continue;
      const v = change.value || {};
      const fromId = v.from?.id || "";
      if (!v.id || !v.text) continue;
      if (fromId && selfId && fromId === selfId) continue; // our own comment/reply
      await handleComment({
        supabase, selfId,
        commentId: v.id,
        text: v.text,
        fromId,
        fromUsername: v.from?.username || null,
        mediaId: v.media?.id || null,
        knownSlugs, slugByName,
      });
    }

    // 2) Direct-message events
    for (const m of entry.messaging || []) {
      const senderId = m.sender?.id || "";
      const text = m.message?.text || "";
      if (!senderId || !text) continue;
      if (m.message?.is_echo) continue;                // our own outbound copy
      if (selfId && senderId === selfId) continue;     // defensive
      await handleDirectMessage({
        supabase, selfId,
        mid: m.message?.mid || `${senderId}:${m.timestamp || ""}`,
        senderId,
        text,
        knownSlugs, slugByName,
      });
    }
  }
}

// ── Comment → private DM ──────────────────────────────────────────────────────
interface CommentCtx {
  supabase: SupabaseClient | null;
  selfId: string;
  commentId: string;
  text: string;
  fromId: string;
  fromUsername: string | null;
  mediaId: string | null;
  knownSlugs: Set<string>;
  slugByName: Map<string, string>;
}

async function handleComment(c: CommentCtx): Promise<void> {
  if (await alreadyHandled(c.supabase, c.commentId)) return;

  const intent = resolveIntent(c.text, {
    knownSlugs: c.knownSlugs,
    slugByName: c.slugByName,
    defaultTheme: "score",
  });
  // No resolvable keyword → leave the comment alone (don't spam every comment).
  if (!intent) return;
  if (onCooldown(c.fromId)) return; // loop / flood guard

  const dest = await fetchDestination(c.supabase, intent.destinationId);
  const reply = buildDmReply(intent.theme, dest, ctx());

  // The DM is the deliverable; the public reply is a light nudge.
  const dm = c.selfId
    ? await privateReplyToComment(c.selfId, c.commentId, reply.text)
    : { ok: false, status: 0, body: null };
  if (dm.ok) {
    await publicReplyToComment(c.commentId, buildPublicCommentReply()).catch(() => {});
  } else {
    // Don't claim "Just DM'd you" when the DM failed — and surface the Meta error.
    console.warn("[ig-webhook] private reply failed:", dm.status, JSON.stringify(dm.body));
  }

  await logLead(c.supabase, {
    ig_user_id: c.fromId || null,
    ig_username: c.fromUsername,
    destination_id: intent.destinationId,
    theme: intent.theme,
    raw_message: intent.matchedKeyword || c.text.slice(0, 80),
    source: "comment_webhook",
    event_id: c.commentId,
    replied: dm.ok,
  });
}

// ── Direct message → answer ───────────────────────────────────────────────────
interface DmCtx {
  supabase: SupabaseClient | null;
  selfId: string;
  mid: string;
  senderId: string;
  text: string;
  knownSlugs: Set<string>;
  slugByName: Map<string, string>;
}

async function handleDirectMessage(d: DmCtx): Promise<void> {
  if (await alreadyHandled(d.supabase, d.mid)) return;

  // If they replied with an email, capture it — but ONLY if they already engaged
  // us (a prior lead row). Anti-relay: a stranger could DM "email victim@x.com"
  // and otherwise make us send an unsolicited email.
  const email = extractEmail(d.text);
  if (email) {
    const captured = await captureEmail(d.supabase, d.senderId, email);
    if (captured) {
      if (d.selfId) {
        await sendDirectMessage(
          d.selfId,
          d.senderId,
          "Got it ✅ — sending it to your inbox now. Check spam if it hides. Happy planning! 🏔️",
        );
      }
      await logLead(d.supabase, {
        ig_user_id: d.senderId,
        ig_username: null,
        destination_id: null,
        theme: null,
        raw_message: "[email captured]",
        source: "dm_webhook",
        event_id: d.mid,
        replied: true,
      });
      return;
    }
    // Not a known lead → ignore the email; answer the message normally below.
  }

  if (onCooldown(d.senderId)) return; // loop / flood guard

  const intent = resolveIntent(d.text, {
    knownSlugs: d.knownSlugs,
    slugByName: d.slugByName,
    defaultTheme: "score",
  });
  const dest = intent ? await fetchDestination(d.supabase, intent.destinationId) : null;
  const reply = intent ? buildDmReply(intent.theme, dest, ctx()) : buildGenericReply(ctx());

  const sent = d.selfId
    ? await sendDirectMessage(d.selfId, d.senderId, reply.text)
    : { ok: false, status: 0, body: null };
  if (!sent.ok) {
    console.warn("[ig-webhook] DM send failed:", sent.status, JSON.stringify(sent.body));
  }

  await logLead(d.supabase, {
    ig_user_id: d.senderId,
    ig_username: null,
    destination_id: intent?.destinationId ?? null,
    theme: intent?.theme ?? null,
    raw_message: intent?.matchedKeyword || d.text.slice(0, 80),
    source: "dm_webhook",
    event_id: d.mid,
    replied: sent.ok,
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function ctx() {
  return {
    siteUrl: SITE_URL,
    locale: "en" as const,
    affiliate: affiliateLink(),
    monthSlug: currentMonthSlugIST(),
    monthName: currentMonthLongIST(),
  };
}

/** Optional activity-affiliate deeplink, off until env is set (no fabrication). */
function affiliateLink(): { label: string; url: string } | null {
  const url = process.env.NAKSHIQ_AFFILIATE_ACTIVITIES_URL;
  if (!url || url.length === 0) return null;
  return { label: "Book tickets & day-trips", url };
}

// Per-sender cooldown — cheap loop/flood guard (per serverless instance, tunable).
const _lastActed = new Map<string, number>();
const ACTOR_COOLDOWN_MS = 10 * 1000;
function onCooldown(actorId: string): boolean {
  if (!actorId) return false;
  const now = Date.now();
  const last = _lastActed.get(actorId) || 0;
  if (now - last < ACTOR_COOLDOWN_MS) return true;
  _lastActed.set(actorId, now);
  if (_lastActed.size > 5000) {
    for (const [k, v] of _lastActed) if (now - v > ACTOR_COOLDOWN_MS) _lastActed.delete(k);
  }
  return false;
}

let _catalog: { at: number; knownSlugs: Set<string>; slugByName: Map<string, string> } | null = null;
async function loadCatalog(): Promise<{ knownSlugs: Set<string>; slugByName: Map<string, string> }> {
  // In-process memo (the underlying index is already unstable_cache'd 24h).
  if (_catalog && Date.now() - _catalog.at < 10 * 60 * 1000) {
    return { knownSlugs: _catalog.knownSlugs, slugByName: _catalog.slugByName };
  }
  const knownSlugs = new Set<string>();
  const slugByName = new Map<string, string>();
  try {
    const idx = await getCachedDestinationsIndex();
    for (const d of idx as Array<{ id?: string; name?: string }>) {
      if (!d?.id) continue;
      const slug = d.id.toLowerCase();
      const spaced = slug.replace(/-/g, " ");
      knownSlugs.add(slug);
      knownSlugs.add(spaced); // so the single-token fallback can match hyphenated slugs
      slugByName.set(spaced, slug);
      if (d.name) slugByName.set(d.name.toLowerCase().split(",")[0].trim(), slug);
    }
  } catch (e) {
    console.error("[ig-webhook] catalog load failed:", e instanceof Error ? e.message : e);
  }
  // Only memoise a NON-EMPTY catalog — caching an empty one after a transient
  // Supabase error would blind the resolver for the whole TTL.
  if (knownSlugs.size > 0) {
    _catalog = { at: Date.now(), knownSlugs, slugByName };
  }
  return { knownSlugs, slugByName };
}

async function fetchDestination(
  supabase: SupabaseClient | null,
  id: string | null,
): Promise<DmDestination | null> {
  if (!supabase || !id) return null;
  try {
    const { data } = await supabase
      .from("destinations")
      .select("id, name, best_months, translations")
      .eq("id", id)
      .maybeSingle();
    if (!data) return null;
    const months = Array.isArray(data.best_months) ? (data.best_months as number[]) : [];
    const bestMonth = months.length && months[0] >= 1 && months[0] <= 12 ? MONTHS[months[0]] : null;
    const tr = (data.translations || {}) as { hi?: { name?: string } };
    return {
      id: data.id as string,
      name: (data.name as string) || (data.id as string),
      nameHi: tr.hi?.name ?? null,
      bestMonth,
    };
  } catch {
    return null;
  }
}

async function alreadyHandled(supabase: SupabaseClient | null, eventId: string): Promise<boolean> {
  if (!supabase || !eventId) return false;
  try {
    const { data } = await supabase
      .from("social_dm_leads")
      .select("id")
      .eq("platform", "instagram")
      .eq("event_id", eventId)
      .maybeSingle();
    return !!data;
  } catch {
    // On a DB hiccup, prefer SKIPPING — a missed DM beats spamming a user with
    // duplicates across Meta's webhook retries.
    console.warn("[ig-webhook] idempotency check failed — skipping this event to be safe");
    return true;
  }
}

interface LeadRow {
  ig_user_id: string | null;
  ig_username: string | null;
  destination_id: string | null;
  theme: DmTheme | null;
  raw_message: string;
  source: string;
  event_id: string;
  replied: boolean;
}

async function logLead(supabase: SupabaseClient | null, row: LeadRow): Promise<void> {
  if (!supabase) return;
  try {
    await supabase.from("social_dm_leads").insert({
      platform: "instagram",
      ig_user_id: row.ig_user_id,
      ig_username: row.ig_username,
      destination_id: row.destination_id,
      theme: row.theme,
      raw_message: row.raw_message,
      source: row.source,
      event_id: row.event_id,
      replied_at: row.replied ? new Date().toISOString() : null,
    });
  } catch (e) {
    // Unique-violation = already logged (idempotency) → fine.
    const msg = e instanceof Error ? e.message : String(e);
    if (!/duplicate key|unique/i.test(msg)) {
      console.error("[ig-webhook] logLead failed:", msg);
    }
  }
}

/**
 * Capture an email handed over in a DM reply. Returns true only when the sender
 * already had a lead row (proof they engaged us first) — anti spam-relay.
 */
async function captureEmail(
  supabase: SupabaseClient | null,
  igUserId: string,
  email: string,
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data } = await supabase
      .from("social_dm_leads")
      .select("id, destination_id")
      .eq("ig_user_id", igUserId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data?.id) return false; // never engaged us → don't email a stranger's address

    await supabase
      .from("social_dm_leads")
      .update({ email, confirmed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", data.id);

    const dest = await fetchDestination(supabase, (data.destination_id as string) || null);
    await sendCaptureEmail(email, dest);
    return true;
  } catch (e) {
    console.error("[ig-webhook] captureEmail failed:", e instanceof Error ? e.message : e);
    return false;
  }
}

async function sendCaptureEmail(email: string, dest: DmDestination | null): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const utm = "utm_source=ig&utm_medium=email&utm_campaign=dm_capture";
  const link = dest ? `${SITE_URL}/en/destination/${dest.id}?${utm}` : `${SITE_URL}/en/explore?${utm}`;
  const subject = dest ? `Your ${dest.name} read — NakshIQ 🏔️` : "Your NakshIQ travel read 🏔️";
  const intro = dest
    ? `Here's the honest read on ${dest.name} — best month, real costs, and what to skip.`
    : `NakshIQ is the honest read on every India destination — best month, real costs, and what to skip.`;
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    replyTo: REPLY_TO,
    subject,
    text: `Thanks for the DM!\n\n${intro}\n\nRead it here: ${link}\n\n— NakshIQ`,
    html:
      `<p>Thanks for the DM!</p><p>${intro}</p>` +
      `<p><a href="${link}">Read it here →</a></p><p>— NakshIQ</p>`,
  });
}

function verifySignature(raw: string, header: string, secret: string): boolean {
  if (!header.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw, "utf8").digest(); // 32 raw bytes
  let supplied: Buffer;
  try {
    supplied = Buffer.from(header.slice(7), "hex");
  } catch {
    return false;
  }
  if (supplied.length !== expected.length) return false;
  return timingSafeEqual(expected, supplied);
}

function constantTimeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  try {
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

// ── Webhook payload shapes (partial) ──────────────────────────────────────────
interface IgWebhookBody {
  object?: string;
  entry?: Array<{
    id?: string;
    time?: number;
    changes?: Array<{
      field?: string;
      value?: {
        id?: string;
        text?: string;
        from?: { id?: string; username?: string };
        media?: { id?: string };
      };
    }>;
    messaging?: Array<{
      sender?: { id?: string };
      recipient?: { id?: string };
      timestamp?: number;
      message?: { mid?: string; text?: string; is_echo?: boolean };
    }>;
  }>;
}
