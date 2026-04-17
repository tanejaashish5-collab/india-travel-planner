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
export const REPLY_TO = "hello@nakshiq.com";
export const SITE_URL = "https://www.nakshiq.com";
