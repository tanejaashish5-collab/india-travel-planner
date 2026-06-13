/**
 * instagram-graph.ts — thin client over the Instagram Graph API (Instagram Login).
 *
 * Used by /api/instagram/webhook to (a) privately reply to a comment as a DM —
 * the exact mechanic the autoposter captions promise ("Comment X — I'll DM you
 * the plan") — and (b) reply to / answer direct messages.
 *
 * Host + version are env-overridable; defaults target the Instagram Login API
 * (graph.instagram.com). For a Facebook-Login / Page-linked setup, set
 * INSTAGRAM_GRAPH_HOST=https://graph.facebook.com.
 *
 * Docs: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging
 * Every call fails soft: it returns {ok:false,...} instead of throwing, so a
 * Graph hiccup can never crash the webhook (which must always 200 to Meta).
 */

// Public, non-secret defaults (the Instagram Graph host + version). Kept on their
// own lines — they are NOT credentials; the only secret here is the access token,
// which is read below with no default.
const DEFAULT_GRAPH_HOST = "https://graph.instagram.com";
const DEFAULT_GRAPH_VERSION = "v21.0";

const HOST_OVERRIDE = process.env.INSTAGRAM_GRAPH_HOST;
const VERSION_OVERRIDE = process.env.INSTAGRAM_GRAPH_VERSION;
const GRAPH_HOST = HOST_OVERRIDE && HOST_OVERRIDE.length > 0 ? HOST_OVERRIDE : DEFAULT_GRAPH_HOST;
const GRAPH_VERSION = VERSION_OVERRIDE && VERSION_OVERRIDE.length > 0 ? VERSION_OVERRIDE : DEFAULT_GRAPH_VERSION;
const BASE = `${GRAPH_HOST}/${GRAPH_VERSION}`;

export interface GraphResult {
  ok: boolean;
  status: number;
  body: unknown;
  error?: string;
}

function token(): string | null {
  const t = process.env.INSTAGRAM_ACCESS_TOKEN;
  return t && t.trim().length > 0 ? t.trim() : null;
}

async function graphPost(path: string, payload: Record<string, unknown>): Promise<GraphResult> {
  const t = token();
  if (!t) return { ok: false, status: 0, body: null, error: "INSTAGRAM_ACCESS_TOKEN not set" };
  try {
    // Token in the Authorization header, NOT the query string — query params get
    // captured by Vercel/CDN/proxy request logs; a long-lived token is a credential.
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(payload),
    });
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    return { ok: false, status: 0, body: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Send a direct message to a user by their Instagram-scoped ID (IGSID).
 * `igUserId` is the business account's own IG user id (the {ig-user-id} in the path).
 */
export function sendDirectMessage(igUserId: string, recipientIgsid: string, text: string): Promise<GraphResult> {
  return graphPost(`/${igUserId}/messages`, {
    recipient: { id: recipientIgsid },
    message: { text },
  });
}

/**
 * Private-reply to a comment — delivers a DM to the commenter, in-thread with
 * their comment. This is THE mechanism behind "Comment X — I'll DM you …".
 * Must be sent within 7 days of the comment (Meta policy).
 */
export function privateReplyToComment(igUserId: string, commentId: string, text: string): Promise<GraphResult> {
  return graphPost(`/${igUserId}/messages`, {
    recipient: { comment_id: commentId },
    message: { text },
  });
}

/** Public reply under a comment (optional nudge: "Just DM'd you 📩"). */
export function publicReplyToComment(commentId: string, text: string): Promise<GraphResult> {
  return graphPost(`/${commentId}/replies`, { message: text });
}

export const _internal = { BASE, GRAPH_HOST, GRAPH_VERSION };
