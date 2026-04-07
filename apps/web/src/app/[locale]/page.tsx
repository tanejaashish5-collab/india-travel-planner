import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LanguageToggle } from "@/components/language-toggle";

export default function Home() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");
  const locale = useLocale();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          {t("heroTitle")}
          <span className="block text-muted-foreground">
            {t("heroSubtitle")}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {t("heroDescription")}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href={`/${locale}/explore`}
            className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {tn("explore")} →
          </Link>
          <Link
            href={`/${locale}/explore`}
            className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            {tn("planTrip")}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-sm">
          <Link
            href={`/${locale}/explore`}
            className="rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
          >
            <div className="text-2xl font-mono font-bold">66+</div>
            <div className="text-muted-foreground">{t("stats.places")}</div>
          </Link>
          <Link
            href={`/${locale}/explore`}
            className="rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
          >
            <div className="text-2xl font-mono font-bold">10</div>
            <div className="text-muted-foreground">{t("stats.states")}</div>
          </Link>
          <Link
            href={`/${locale}/explore`}
            className="rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
          >
            <div className="text-2xl font-mono font-bold">14</div>
            <div className="text-muted-foreground">{t("stats.routes")}</div>
          </Link>
          <div className="rounded-lg border border-border p-4">
            <div className="text-2xl font-mono font-bold">SOS</div>
            <div className="text-muted-foreground">{t("stats.sos")}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
