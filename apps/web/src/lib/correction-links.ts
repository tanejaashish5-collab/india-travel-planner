import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "@/lib/resend";

/**
 * Signed one-click links for the destination-correction approval queue
 * (migration 077, scripts/freshness-review.mjs). The link is the only thing in
 * the founder's email; whoever holds it can approve or reject that ONE queued
 * correction, nothing else. Signed with NEWSLETTER_SEND_SECRET, the same
 * secret the admin revalidate endpoint already trusts.
 */
function key(): string | null {
  return process.env.NEWSLETTER_SEND_SECRET || null;
}

export function signCorrection(id: string): string | null {
  const k = key();
  if (!k) return null;
  return createHmac("sha256", k).update(`destination-correction:${id}`).digest("hex").slice(0, 40);
}

export function verifyCorrection(id: string, sig: string | null | undefined): boolean {
  const want = signCorrection(id);
  if (!want || !sig || sig.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

export function correctionUrl(id: string): string | null {
  const sig = signCorrection(id);
  return sig ? `${SITE_URL}/api/admin/corrections/${id}?sig=${sig}` : null;
}

export type CorrectionChange = { field: string; expected: unknown; value: unknown; source?: string | null };

export function esc(v: unknown): string {
  const s = v === null || v === undefined ? "(empty)" : typeof v === "string" ? v : JSON.stringify(v);
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Old → new table, shared by the email and the approval page. */
export function changesHtml(changes: CorrectionChange[]): string {
  return changes
    .map(
      (c) => `<div style="margin:0 0 14px;padding:12px 14px;border:1px solid #e5e5e5;border-radius:6px">
  <div style="font:600 12px ui-monospace,monospace;color:#525252;margin-bottom:6px">${esc(c.field)}</div>
  <div style="color:#b91c1c;text-decoration:line-through;margin-bottom:4px">${esc(c.expected)}</div>
  <div style="color:#15803d;font-weight:600">${esc(c.value)}</div>
  ${c.source ? `<div style="font-size:12px;color:#525252;margin-top:6px">Source: ${esc(c.source)}</div>` : ""}
</div>`,
    )
    .join("");
}
