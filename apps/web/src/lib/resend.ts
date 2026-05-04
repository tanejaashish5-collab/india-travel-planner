import { Resend } from "resend";

let _client: Resend | null = null;

export function getResend(): Resend | null {
  if (_client) return _client;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _client = new Resend(key);
  return _client;
}

export const FROM_ADDRESS = "The Window <newsletter@nakshiq.com>";
// Internal ops alerts (cron failures, SOS staleness, road-conditions sweeps).
// Goes only to ADMIN_EMAIL; never to subscribers. Keeps consumer newsletter
// brand separate from admin noise. Requires ops@nakshiq.com to be a verified
// sender in Resend before it'll deliver — if not, swap to FROM_ADDRESS.
export const OPS_FROM_ADDRESS = "NakshIQ Ops <ops@nakshiq.com>";
export const REPLY_TO = "hello@nakshiq.com";
export const SITE_URL = "https://www.nakshiq.com";
