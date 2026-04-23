import { VIDEO_CACHE_VERSION } from "./video-version";

// Cloudflare R2 public origin — served via r2.dev. The same env var is
// baked into the client bundle because videos load browser-side.
const VIDEO_BASE = process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? "";

/**
 * videoSrc(id) — returns the cache-busted <video src> URL for a destination
 * id or a named hero video. Appends ?v=<version> so that when a video on
 * R2 is re-encoded in place (same filename, different bytes), browsers
 * with the old copy cached re-fetch the new one.
 *
 * The `immutable` Cache-Control directive set by upload-videos.mjs only
 * applies per URL — changing the query string is a different URL, so the
 * browser cache treats it as a fresh object.
 */
export function videoSrc(id: string): string {
  if (!VIDEO_BASE) return "";
  return `${VIDEO_BASE}/${id}.mp4?v=${VIDEO_CACHE_VERSION}`;
}
