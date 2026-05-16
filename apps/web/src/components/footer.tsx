import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

/* ============================================================
   Footer — slim single-row strip used on every non-landing page.
   Landing renders nothing here — ACT IX Coda absorbs the footer line
   (locked plan, ~/.claude/plans/considering-changing-the-landing-replicated-origami.md).

   Replaces the previous 197-line footer with: logo + 3 main links
   (Editorial / About / Contact) + © · Issue Nº · privacy · terms +
   italic "Go with confidence." sign-off. Drops the Discover/Plan/
   Community grid (mega-menus already cover that), stats block (Hero
   already covers that), social row (move to /about), and the 7%-opacity
   Pangong Lake background (visual noise).

   Stats prop is preserved as optional — older callers may still pass it
   while their pages get refactored, but we don't render it any more.
   ============================================================ */

// Same launch-date derivation as helpers.ts and nav.tsx.
function getIssueNumber(now: Date = new Date()): number {
  const launch = new Date("2022-07-01T00:00:00Z");
  const months =
    (now.getUTCFullYear() - launch.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - launch.getUTCMonth());
  return Math.max(1, months + 1);
}

export function Footer({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stats: _stats,
}: {
  stats?: {
    destinations: number;
    places: number;
    festivals: number;
    traps: number;
    collections: number;
  };
} = {}) {
  const locale = useLocale();
  const tf = useTranslations("footer");
  const issueNum = getIssueNumber();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-border/40 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left — logo + 3 links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/${locale}`} className="font-fraunces italic text-xl text-foreground">
              Naksh<span className="text-[#E55642]">.</span>iq
            </Link>
            <Link
              href={`/${locale}/methodology`}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Editorial
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right — © · Issue Nº · italic sign-off */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground/70 tracking-[0.06em]">
            <span>
              © {year} NakshIQ · Issue Nº {issueNum}
            </span>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-foreground transition-colors"
            >
              {tf("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-foreground transition-colors"
            >
              {tf("terms")}
            </Link>
            <Link
              href={`/${locale}/cookies`}
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
            <span className="font-fraunces italic text-base text-foreground">
              Go with confidence.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
