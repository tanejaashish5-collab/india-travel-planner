// Sprint 19 / R4 §9 #10 — sameAs graph for Organization JSON-LD + footer
// social handles. Only renders/emits a handle when the env var is set, so
// nothing fake is ever published. When user claims an external account,
// add the URL to Vercel env vars and redeploy — no code change needed.

export type SocialHandle = {
  platform: "instagram" | "x" | "linkedin" | "youtube" | "pinterest" | "github";
  url: string;
  label: string;
};

export function getSocialHandles(): SocialHandle[] {
  const handles: SocialHandle[] = [];
  if (process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) {
    handles.push({ platform: "instagram", url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM, label: "Instagram" });
  }
  if (process.env.NEXT_PUBLIC_SOCIAL_X) {
    handles.push({ platform: "x", url: process.env.NEXT_PUBLIC_SOCIAL_X, label: "X" });
  }
  if (process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) {
    handles.push({ platform: "linkedin", url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN, label: "LinkedIn" });
  }
  if (process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) {
    handles.push({ platform: "youtube", url: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE, label: "YouTube" });
  }
  if (process.env.NEXT_PUBLIC_SOCIAL_PINTEREST) {
    handles.push({ platform: "pinterest", url: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST, label: "Pinterest" });
  }
  if (process.env.NEXT_PUBLIC_SOCIAL_GITHUB) {
    handles.push({ platform: "github", url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB, label: "GitHub" });
  }
  return handles;
}

export function getSameAsUrls(): string[] {
  const urls = ["https://www.wikidata.org/wiki/Q139549464"];
  for (const h of getSocialHandles()) urls.push(h.url);
  return urls;
}
