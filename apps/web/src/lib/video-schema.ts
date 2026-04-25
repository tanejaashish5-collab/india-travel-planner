// Sprint 20 / R4 §10 #4 — VideoObject JSON-LD for hero MP4s.
// schema.org VideoObject helps LLM answer engines surface our hero shots
// alongside text content. Mandatory fields per Google's rich-results spec:
// name, description, thumbnailUrl, uploadDate, contentUrl.

import { VIDEO_CACHE_VERSION } from "./video-version";

export type VideoObjectInput = {
  // R2 video id (e.g., "spiti-valley", "hero", "manali-snow"). Used in URL.
  id: string;
  name: string;
  description: string;
  // Absolute URL to the poster image (next/image src or destinationImage()).
  thumbnailUrl: string;
  // Optional ISO duration ("PT15S", "PT1M30S"). Skipped if unknown.
  duration?: string;
  // Optional canonical embed URL (the page hosting the video).
  embedUrl?: string;
};

const VIDEO_BASE = process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? "";

// Convert "20260425" cache stamp → "2026-04-25T00:00:00Z" so VideoObject
// uploadDate is valid ISO 8601. Falls back to a fixed early-2026 date for
// videos that don't have a per-id timestamp.
function uploadDateFromCacheStamp(stamp: string): string {
  if (/^\d{8}$/.test(stamp)) {
    return `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}T00:00:00Z`;
  }
  return "2026-04-01T00:00:00Z";
}

export function videoObjectJsonLd({
  id,
  name,
  description,
  thumbnailUrl,
  duration,
  embedUrl,
}: VideoObjectInput) {
  if (!VIDEO_BASE) return null;

  const contentUrl = `${VIDEO_BASE}/${id}.mp4?v=${VIDEO_CACHE_VERSION}`;
  const uploadDate = uploadDateFromCacheStamp(VIDEO_CACHE_VERSION);

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${contentUrl}#video`,
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    isFamilyFriendly: true,
    publisher: { "@id": "https://www.nakshiq.com#organization" },
  };
  if (duration) ld.duration = duration;
  if (embedUrl) ld.embedUrl = embedUrl;

  return ld;
}
