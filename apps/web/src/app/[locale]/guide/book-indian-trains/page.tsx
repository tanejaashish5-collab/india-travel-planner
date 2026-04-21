import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to book Indian trains as a foreigner — IRCTC, FTQ, Tatkal | NakshIQ",
    description:
      "IRCTC account for non-Indian passports, Foreign Tourist Quota (FTQ), RAC / waitlist logic, Tatkal timing, class codes. Step-by-step with official links. Updated 2026.",
    ...localeAlternates(locale, "/guide/book-indian-trains"),
  };
}

export default async function BookIndianTrainsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Method · IRCTC + FTQ + class codes · Reviewed {new Date().toISOString().slice(0, 10)}
          </div>
        </div>

        <header className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            India guide
          </p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            How to book Indian trains — IRCTC, FTQ, and every class code that matters
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Indian Railways runs the fourth-largest network in the world and sells tickets through one website — IRCTC — whose UX was built in a different decade. If you are a foreign national or overseas Indian without a local phone number, the first booking is the hardest. Everything after is pattern recognition. This guide covers the first booking and the patterns.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl mb-3 text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              1. Create an IRCTC account with a non-Indian passport
            </h2>
            <p>
              Go to <a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" className="text-[#E55642] hover:underline">irctc.co.in</a> and click Register. For foreign nationals:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mt-2 text-muted-foreground">
              <li>Select &quot;International&quot; when the country dropdown loads. Confirm the flag changes — if it stays on India, the form will later reject your passport.</li>
              <li>Mobile verification works on international numbers but the OTP SMS sometimes fails. If OTP never arrives, use the email verification fallback — there is one.</li>
              <li>For non-Indian passports without an Aadhaar: skip the Aadhaar KYC step. Your account will work at reduced ticket limits (up to 6 berths per month without KYC, up to 24 with). For a first trip 6 is enough.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl mb-3 text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              2. FTQ — the Foreign Tourist Quota
            </h2>
            <p>
              Indian Railways reserves a small block of berths on popular tourist trains for foreign nationals. This is the Foreign Tourist Quota (FTQ). It is usually the cleanest way to get a confirmed seat on a sold-out train.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mt-2 text-muted-foreground">
              <li><strong className="text-foreground">Who qualifies.</strong> Foreign passport holders and NRIs (with overseas residence proof).</li>
              <li><strong className="text-foreground">How to book.</strong> FTQ tickets are <em>not</em> bookable on the IRCTC website. Visit a major station&apos;s International Tourist Bureau — Delhi Nizamuddin or New Delhi Station have dedicated counters; Mumbai CST, Kolkata, Chennai Central, and Bangalore City do as well. Bring passport + visa + a printed / saved itinerary.</li>
              <li><strong className="text-foreground">Pay in which currency.</strong> Foreign currency (USD, EUR, GBP) or INR with proof of foreign-exchange encashment. Credit cards accepted at most counters.</li>
              <li><strong className="text-foreground">When.</strong> FTQ opens up to 60 days before departure on most trains. Popular sectors — Delhi–Agra, Delhi–Jaisalmer, Mumbai–Goa — benefit from booking the moment the window opens.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl mb-3 text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              3. RAC, waitlist, confirmed — what each status means
            </h2>
            <p>
              After booking, your ticket will show one of three statuses. The difference is material — RAC travels, waitlisted does not.
            </p>
            <dl className="space-y-3 mt-3">
              <div>
                <dt className="font-semibold text-foreground">CNF — Confirmed</dt>
                <dd className="text-muted-foreground ml-4">You have a berth. Ticket shows coach + berth number. Board and sleep.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">RAC — Reservation Against Cancellation</dt>
                <dd className="text-muted-foreground ml-4">You may board the train. You share one side-lower berth with another RAC passenger (usually partitioned). If someone with a confirmed berth no-shows, you may be upgraded to that berth mid-journey. Legal to travel.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">WL — Waitlist</dt>
                <dd className="text-muted-foreground ml-4">You may not board. If someone confirmed cancels before chart preparation (3–4 hours pre-departure), you advance. If the waitlist drops to RAC or CNF, you are notified. If your ticket shows WL at departure, it is auto-cancelled and refunded.</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl mb-3 text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              4. Tatkal — the last-minute quota
            </h2>
            <p>
              Tatkal is the 24-hour-advance booking window. A small block of berths releases each morning for next-day travel. It fills within seconds on popular trains — this is the segment where IRCTC agents race the civilian user.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mt-2 text-muted-foreground">
              <li><strong className="text-foreground">10:00 IST</strong> — Tatkal opens for AC classes (1A, 2A, 3A, CC, EC).</li>
              <li><strong className="text-foreground">11:00 IST</strong> — Tatkal opens for non-AC (SL, 2S).</li>
              <li><strong className="text-foreground">The clock is the constraint.</strong> Log in 5 minutes before, pre-save passenger details, keep your payment method queued. Most Tatkal stock sells in under 120 seconds.</li>
              <li><strong className="text-foreground">Premium Tatkal</strong> charges dynamic pricing — up to 3× base fare — and is usually a bad deal.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl mb-3 text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              5. Class codes — what to actually book
            </h2>
            <dl className="space-y-3 mt-3">
              <div>
                <dt className="font-semibold text-foreground">1A — First AC</dt>
                <dd className="text-muted-foreground ml-4">Private 2- or 4-berth cabin with door, air-conditioned. Most expensive. Best for overnight on flagship trains (Rajdhani, Tejas). ₹4,000–8,000 for typical overnight.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">2A — Second AC</dt>
                <dd className="text-muted-foreground ml-4">Open coach, 2-tier berths, curtains. Quiet. Good for long overnight hauls. ₹2,000–4,000 typical.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">3A — Third AC</dt>
                <dd className="text-muted-foreground ml-4">Open coach, 3-tier berths, no curtains in most rakes. The pragmatic workhorse of Indian overnight travel. ₹1,200–2,500 typical.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">SL — Sleeper</dt>
                <dd className="text-muted-foreground ml-4">Non-AC, windows open, 3-tier berths. The cheapest overnight option and the most social. ₹300–800 typical. Works in winter; avoid in North India summer.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">CC — Chair Car (AC)</dt>
                <dd className="text-muted-foreground ml-4">Airline-style seating, AC. Good for day trains under 8 hours (Shatabdi, Vande Bharat). ₹500–1,200.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">EC — Executive Chair (AC)</dt>
                <dd className="text-muted-foreground ml-4">Wider airline-style seat, meals included on Shatabdi/Vande Bharat. ₹1,200–2,500 typical.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">2S — Second Seating</dt>
                <dd className="text-muted-foreground ml-4">Non-AC seating, short daytime trips only. ₹100–400.</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl mb-3 text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              6. Useful tools
            </h2>
            <ul className="list-disc pl-6 space-y-1.5 mt-2 text-muted-foreground">
              <li><a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" className="text-[#E55642] hover:underline">irctc.co.in</a> — the only official booking portal.</li>
              <li><a href="https://erail.in/" target="_blank" rel="noopener noreferrer" className="text-[#E55642] hover:underline">erail.in</a> — third-party aggregator, better UX for checking availability across multiple trains.</li>
              <li><a href="https://www.confirmtkt.com/" target="_blank" rel="noopener noreferrer" className="text-[#E55642] hover:underline">confirmtkt.com</a> — waitlist prediction (statistical, not guaranteed).</li>
              <li><a href="https://enquiry.indianrail.gov.in/" target="_blank" rel="noopener noreferrer" className="text-[#E55642] hover:underline">enquiry.indianrail.gov.in</a> — official PNR status.</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Related
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/guide/permits`} className="text-[#E55642] hover:underline">
                India permits — ILP, PAP, RAP state by state →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/arrival`} className="text-[#E55642] hover:underline">
                Just landed? Arrival playbook for 9 airports →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/methodology`} className="text-[#E55642] hover:underline">
                How NakshIQ scores destinations →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
