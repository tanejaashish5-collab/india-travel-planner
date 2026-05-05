# PWA hardening pass — 2026-05-05

Follow-up to `qa/findings/2026-05-04-deep/` (deep-QA pass) and the 2026-04-27 PWA sweep memory.

## Shipped today

| Commit | What | File(s) |
|---|---|---|
| `beb53b31` | SW **v32** — precache `/en/trip`, `/en/tourist-traps`, `/en/ask` (+ HI counterparts) | `apps/web/public/sw.js` |
| `e2c127a7` | Hindi parity in install prompt — `pwaInstall` namespace + `useTranslations` wiring | `apps/web/src/components/pwa-install-prompt.tsx`, `apps/web/src/messages/{en,hi}.json` |

## Lighthouse audit (mobile, 4G CPU 4×, https://www.nakshiq.com/en)

```
performance     61%
accessibility   98%
best-practices  100%
seo             100%
viewport        PASS
is-on-https     PASS
```

**Note on PWA category:** Lighthouse 12.6.1 has retired the dedicated PWA category. The `installable-manifest`, `splash-screen`, `themed-omnibox`, `maskable-icon`, `apple-touch-icon`, `service-worker`, `works-offline` audits are no longer emitted. Manual verification covers the same surface (see below).

Performance 61% is a known carry-forward from `qa/findings/2026-05-04-deep/phase-04-lh.json` — image responsiveness + offscreen images + modern formats. Tracked separately, not a PWA-specific issue.

Full Lighthouse JSON: `qa/findings/2026-05-05-pwa/lh-pwa-en.json` (610 KB)

## Manual verification (replaces retired Lighthouse PWA audits)

| Check | Status | Source |
|---|---|---|
| Manifest required fields | ✅ id, name, short_name, description, start_url, scope, display, theme_color, background_color, icons, lang, dir all present | `apps/web/public/manifest.json` |
| Manifest 192 + 512 icons | ✅ Both present, 512 also has `purpose: maskable` | `apps/web/public/manifest.json:13-17` |
| Manifest shortcuts | ✅ 5 (Saved · SOS · Roads · Cost Index · India vs) | `apps/web/public/manifest.json:21-56` |
| Service worker registered | ✅ v32 live | `curl /sw.js \| grep CACHE_VERSION` → `nakshiq-v32` |
| HTTPS | ✅ | Lighthouse `is-on-https` PASS |
| Apple iOS PWA tags | ✅ `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-touch-icon` all present | `apps/web/src/app/[locale]/layout.tsx:167-170` |
| viewport-fit=cover | ✅ Notched-phone safe area handled | `apps/web/src/app/[locale]/layout.tsx:50` |
| Offline page | ✅ Hindi parity complete, links 6 cached routes, signal-loss messaging | `apps/web/src/app/[locale]/offline/page.tsx` |
| Install prompt — Android `beforeinstallprompt` | ✅ Captured + gated (3+ visits AND 20+ s) | `apps/web/src/components/pwa-install-prompt.tsx:31` |
| Install prompt — iOS manual instructions | ✅ Share→Add to Home Screen | `apps/web/src/components/pwa-install-prompt.tsx:78-81` |
| Install prompt — Hindi parity | ✅ **Fixed today** in `e2c127a7` (was English-only) | `apps/web/src/messages/{en,hi}.json` `pwaInstall` namespace |

## Deferred (worth a follow-up session, not blocking)

1. **Manifest screenshots** — currently `[]`. Adding 1-2 captures would enrich the install banner in Chromium browsers. ~15 min if Playwright captures are scripted.
2. **192×192 maskable icon** — `icon-192.png` may not have the ~80% safe-zone padding required for adaptive icon launchers. Adding it as `purpose: maskable` without verifying could clip the artwork. Asset regen needed. ~30 min for an icon designer; or accept the current 512 maskable as sufficient (browsers downscale).
3. **theme-color light/dark variants** — site is dark-only (0 `dark:` classes in `globals.css`, 0 `prefers-color-scheme` queries). Skipped — would lie about a light mode that doesn't exist.
4. **`apple-touch-startup-image`** — splash-screen UX largely superseded by manifest icons in modern iOS. Low ROI.
5. **`share_target` manifest field** — would let users share to NakshIQ from iOS/Android share sheet. Nice-to-have, no measured demand.

## Status

**PWA is healthy.** v32 SW is live; manifest spec-compliant; Hindi parity restored on the install prompt; offline UX rich and bilingual. No defects open.

If the user later picks **Option D** (true Background Sync for offline form posts), the codebase has no `web-push` package or `pushManager.subscribe` calls today — that would be greenfield work, ~1-2 hr.
