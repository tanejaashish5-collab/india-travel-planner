import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { OfflineSavedTrips } from "@/components/offline-saved-trips";
import { localeAlternates } from "@/lib/seo-utils";

// Must be statically generated so the service worker can pre-cache it at
// install time. Never gets re-validated — this page only ever displays
// when the user is offline, so freshness is irrelevant.
export const revalidate = false;
export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Offline — NakshIQ",
    description: "You're offline. Your saved trips and previously-viewed destinations remain available.",
    ...localeAlternates(locale, "/offline"),
    robots: { index: false, follow: false },
  };
}

export default async function OfflinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isHindi = locale === "hi";

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="text-xl" aria-hidden>📡</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{isHindi ? "आप ऑफ़लाइन हैं" : "You're offline"}</h1>
            <p className="text-sm text-muted-foreground">
              {isHindi
                ? "चिंता नहीं — आपकी सहेजी गई यात्राएँ और पहले देखे गए पृष्ठ अभी भी उपलब्ध हैं।"
                : "No signal — but your saved trips and previously-viewed pages still work."}
            </p>
          </div>
        </div>

        <OfflineSavedTrips locale={locale} />

        <section className="rounded-2xl border border-border bg-card/40 p-5 mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">
            {isHindi ? "तुरंत पहुंच — ऑफ़लाइन काम करता है" : "Works offline — tap any of these"}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <OfflineLink href={`/${locale}/saved`} label={isHindi ? "सहेजी गई यात्राएँ" : "Saved trips"} hint={isHindi ? "स्थानीय रूप से सहेजा गया" : "Stored on this device"} />
            <OfflineLink href={`/${locale}/sos`} label="SOS" hint={isHindi ? "आपातकालीन संख्याएं" : "Emergency numbers"} />
            <OfflineLink href={`/${locale}/road-conditions`} label={isHindi ? "सड़क की स्थिति" : "Road conditions"} hint={isHindi ? "अंतिम ज्ञात अद्यतन" : "Last known snapshot"} />
            <OfflineLink href={`/${locale}/permits`} label={isHindi ? "परमिट" : "Permits"} hint={isHindi ? "दस्तावेज़ चेकलिस्ट" : "Docs checklist"} />
            <OfflineLink href={`/${locale}/arrival`} label={isHindi ? "आगमन" : "Arrival"} hint={isHindi ? "हवाई अड्डे की जानकारी" : "Airport cheat sheet"} />
            <OfflineLink href={`/${locale}/contact`} label={isHindi ? "संपर्क" : "Contact"} hint={isHindi ? "सहायता विवरण" : "Help details"} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card/40 p-5 mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">
            {isHindi ? "सिग्नल वापस आने पर" : "When signal returns"}
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>{isHindi
                ? "पृष्ठ स्वचालित रूप से नवीनतम अंक के साथ पुनः लोड होंगे — कुछ भी मैन्युअल रूप से करने की आवश्यकता नहीं।"
                : "Pages auto-reload to the latest scores — no manual refresh needed."}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>{isHindi
                ? "आपने ऑफ़लाइन जो भी सहेजा, वह आपकी यात्रा बोर्ड पर बरकरार है।"
                : "Anything saved offline stays on your trip board."}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>{isHindi
                ? "पहाड़ी राज्यों (लद्दाख / स्पीति / किन्नौर) में कवरेज कम है — कृपया महत्वपूर्ण पृष्ठ पहले खोलें।"
                : "Coverage gaps are normal in Ladakh / Spiti / Kinnaur — load essentials before heading up."}</span>
            </li>
          </ul>
        </section>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          {isHindi
            ? "NakshIQ एक प्रगतिशील वेब ऐप है — इंटरनेट के बिना भी काम करता है।"
            : "NakshIQ is a progressive web app — built to work when the signal doesn't."}
        </p>
      </main>
      <Footer />
    </div>
  );
}

function OfflineLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-lg border border-border bg-background/40 px-4 py-3 transition-all hover:border-primary/40 hover:bg-primary/5"
    >
      <div>
        <div className="text-sm font-medium group-hover:text-primary transition-colors">{label}</div>
        <div className="text-[11px] text-muted-foreground">{hint}</div>
      </div>
      <span className="text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
    </Link>
  );
}
