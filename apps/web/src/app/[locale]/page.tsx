import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/language-toggle";

export default function Home() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

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
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            {tc("comingSoon")}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-sm">
          <div className="rounded-lg border border-border p-4">
            <div className="text-2xl font-mono font-bold">400+</div>
            <div className="text-muted-foreground">{t("stats.places")}</div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="text-2xl font-mono font-bold">9</div>
            <div className="text-muted-foreground">{t("stats.states")}</div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="text-2xl font-mono font-bold">15</div>
            <div className="text-muted-foreground">{t("stats.routes")}</div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="text-2xl font-mono font-bold">SOS</div>
            <div className="text-muted-foreground">{t("stats.sos")}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
