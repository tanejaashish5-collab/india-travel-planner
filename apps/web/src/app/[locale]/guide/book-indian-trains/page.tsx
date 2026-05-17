import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-utils";
import { CinematicGuide } from "@/components/cinematic-guide";
import {
  guideProse,
  guideInlineLink,
  GuideBullets,
  GuideCardRow,
} from "@/components/cinematic-guide-helpers";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to book Indian trains as a foreigner — IRCTC, FTQ, Tatkal",
    description:
      "IRCTC account for non-Indian passports, Foreign Tourist Quota (FTQ), RAC / waitlist logic, Tatkal timing, class codes. Step-by-step with official links. Updated 2026.",
    ...localeAlternates(locale, "/guide/book-indian-trains"),
  };
}

export default async function BookIndianTrainsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sections = [
    {
      id: "irctc-account",
      title: "1 — Create an IRCTC account with a non-Indian passport",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={guideProse}>
            Go to{" "}
            <a
              href="https://www.irctc.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={guideInlineLink}
            >
              irctc.co.in
            </a>{" "}
            and click Register. For foreign nationals:
          </p>
          <GuideBullets
            items={[
              "Select 'International' when the country dropdown loads. Confirm the flag changes — if it stays on India, the form will later reject your passport.",
              "Mobile verification works on international numbers but the OTP SMS sometimes fails. If OTP never arrives, use the email verification fallback — there is one.",
              "For non-Indian passports without an Aadhaar: skip the Aadhaar KYC step. Your account will work at reduced ticket limits (up to 6 berths per month without KYC, up to 24 with). For a first trip 6 is enough.",
            ]}
          />
        </div>
      ),
    },
    {
      id: "ftq",
      title: "2 — FTQ, the Foreign Tourist Quota",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={guideProse}>
            Indian Railways reserves a small block of berths on popular tourist
            trains for foreign nationals. This is the Foreign Tourist Quota
            (FTQ). It is usually the cleanest way to get a confirmed seat on a
            sold-out train.
          </p>
          <GuideBullets
            items={[
              <><strong style={{ color: "var(--bone)" }}>Who qualifies.</strong> Foreign passport holders and NRIs (with overseas residence proof).</>,
              <><strong style={{ color: "var(--bone)" }}>How to book.</strong> FTQ tickets are <em>not</em> bookable on the IRCTC website. Visit a major station&apos;s International Tourist Bureau — Delhi Nizamuddin or New Delhi Station have dedicated counters; Mumbai CST, Kolkata, Chennai Central, and Bangalore City do as well. Bring passport + visa + a printed / saved itinerary.</>,
              <><strong style={{ color: "var(--bone)" }}>Pay in which currency.</strong> Foreign currency (USD, EUR, GBP) or INR with proof of foreign-exchange encashment. Credit cards accepted at most counters.</>,
              <><strong style={{ color: "var(--bone)" }}>When.</strong> FTQ opens up to 60 days before departure on most trains. Popular sectors — Delhi–Agra, Delhi–Jaisalmer, Mumbai–Goa — benefit from booking the moment the window opens.</>,
            ]}
          />
        </div>
      ),
    },
    {
      id: "status-codes",
      title: "3 — RAC, waitlist, confirmed",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={guideProse}>
            After booking, your ticket will show one of three statuses. The
            difference is material — RAC travels, waitlisted does not.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <GuideCardRow title="CNF — Confirmed">
              You have a berth. Ticket shows coach + berth number. Board and sleep.
            </GuideCardRow>
            <GuideCardRow title="RAC — Reservation Against Cancellation">
              You may board the train. You share one side-lower berth with
              another RAC passenger (usually partitioned). If someone with a
              confirmed berth no-shows, you may be upgraded to that berth
              mid-journey. Legal to travel.
            </GuideCardRow>
            <GuideCardRow title="WL — Waitlist">
              You may not board. If someone confirmed cancels before chart
              preparation (3–4 hours pre-departure), you advance. If the
              waitlist drops to RAC or CNF, you are notified. If your ticket
              shows WL at departure, it is auto-cancelled and refunded.
            </GuideCardRow>
          </ul>
        </div>
      ),
    },
    {
      id: "tatkal",
      title: "4 — Tatkal, the last-minute quota",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={guideProse}>
            Tatkal is the 24-hour-advance booking window. A small block of
            berths releases each morning for next-day travel. It fills within
            seconds on popular trains — this is the segment where IRCTC agents
            race the civilian user.
          </p>
          <GuideBullets
            items={[
              <><strong style={{ color: "var(--bone)" }}>10:00 IST</strong> — Tatkal opens for AC classes (1A, 2A, 3A, CC, EC).</>,
              <><strong style={{ color: "var(--bone)" }}>11:00 IST</strong> — Tatkal opens for non-AC (SL, 2S).</>,
              <><strong style={{ color: "var(--bone)" }}>The clock is the constraint.</strong> Log in 5 minutes before, pre-save passenger details, keep your payment method queued. Most Tatkal stock sells in under 120 seconds.</>,
              <><strong style={{ color: "var(--bone)" }}>Premium Tatkal</strong> charges dynamic pricing — up to 3× base fare — and is usually a bad deal.</>,
            ]}
          />
        </div>
      ),
    },
    {
      id: "class-codes",
      title: "5 — Class codes — what to actually book",
      body: (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <GuideCardRow title="1A — First AC">
            Private 2- or 4-berth cabin with door, air-conditioned. Most
            expensive. Best for overnight on flagship trains (Rajdhani, Tejas).
            ₹4,000–8,000 for typical overnight.
          </GuideCardRow>
          <GuideCardRow title="2A — Second AC">
            Open coach, 2-tier berths, curtains. Quiet. Good for long overnight
            hauls. ₹2,000–4,000 typical.
          </GuideCardRow>
          <GuideCardRow title="3A — Third AC">
            Open coach, 3-tier berths, no curtains in most rakes. The pragmatic
            workhorse of Indian overnight travel. ₹1,200–2,500 typical.
          </GuideCardRow>
          <GuideCardRow title="SL — Sleeper">
            Non-AC, windows open, 3-tier berths. The cheapest overnight option
            and the most social. ₹300–800 typical. Works in winter; avoid in
            North India summer.
          </GuideCardRow>
          <GuideCardRow title="CC — Chair Car (AC)">
            Airline-style seating, AC. Good for day trains under 8 hours
            (Shatabdi, Vande Bharat). ₹500–1,200.
          </GuideCardRow>
          <GuideCardRow title="EC — Executive Chair (AC)">
            Wider airline-style seat, meals included on Shatabdi/Vande Bharat.
            ₹1,200–2,500 typical.
          </GuideCardRow>
          <GuideCardRow title="2S — Second Seating">
            Non-AC seating, short daytime trips only. ₹100–400.
          </GuideCardRow>
        </ul>
      ),
    },
    {
      id: "useful-tools",
      title: "6 — Useful tools",
      body: (
        <GuideBullets
          items={[
            <><a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" style={guideInlineLink}>irctc.co.in</a> — the only official booking portal.</>,
            <><a href="https://erail.in/" target="_blank" rel="noopener noreferrer" style={guideInlineLink}>erail.in</a> — third-party aggregator, better UX for checking availability across multiple trains.</>,
            <><a href="https://www.confirmtkt.com/" target="_blank" rel="noopener noreferrer" style={guideInlineLink}>confirmtkt.com</a> — waitlist prediction (statistical, not guaranteed).</>,
            <><a href="https://enquiry.indianrail.gov.in/" target="_blank" rel="noopener noreferrer" style={guideInlineLink}>enquiry.indianrail.gov.in</a> — official PNR status.</>,
          ]}
        />
      ),
    },
  ];

  return (
    <CinematicGuide
      kicker={`GUIDES · TRAINS · REVIEWED ${new Date().toISOString().slice(0, 10)}`}
      title="How to book Indian trains — IRCTC, FTQ, and every class code that matters."
      dek="Indian Railways runs the fourth-largest network in the world and sells tickets through one website — IRCTC — whose UX was built in a different decade. If you are a foreign national or overseas Indian without a local phone number, the first booking is the hardest. Everything after is pattern recognition. This guide covers the first booking and the patterns."
      sections={sections}
      nextGuide={{
        href: `/${locale}/guide/permits`,
        title: "Inner Line Permit + Protected Area Permit, state by state.",
      }}
    />
  );
}
