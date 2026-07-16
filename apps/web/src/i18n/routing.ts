import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  // Force /en/ + /hi/ prefixes on every path. Default is also "always" in
  // next-intl 4.x, but pin it explicitly so a future upgrade can't silently
  // flip it to "as-needed" and reintroduce duplicate-content URLs.
  localePrefix: "always",
  // Secure + SameSite on the NEXT_LOCALE cookie (2026-07-15 audit). No
  // httpOnly — next-intl's client navigation syncs this cookie via
  // document.cookie by design, so httpOnly would break locale switching.
  localeCookie: { secure: true, sameSite: "lax" },
  // Disable next-intl's auto-emitted hreflang `Link` HTTP header. Its
  // `x-default` entry incorrectly points at the unprefixed path (e.g.
  // /destination/x/may) even when localePrefix is "always" — that loop kept
  // 403 stale non-prefixed URLs alive in Google's index (GSC audit
  // 2026-05-03). We emit canonical + hreflang via Next.js metadata
  // (`alternates`) per page; that path correctly points x-default at the
  // /en/ canonical. See apps/web/src/lib/seo-utils.ts.
  alternateLinks: false,
});
