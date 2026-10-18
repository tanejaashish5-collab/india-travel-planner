import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { SnowOutlookSection } from "@/components/snow-outlook";
import { SnowHeroVideo } from "@/components/snow-hero-video";
import { videoSrc } from "@/lib/video-url";
import { localeAlternates, faqPageSchema } from "@/lib/seo-utils";
import { ROAD_REGIONS, getRoadUpdates } from "@/lib/road-updates";
import {
  getSnowOutlooks,
  getSnowTrackRecord,
  getSnowWatchList,
  fmtSnowDay,
  fmtSnowTime,
  snowWindowText,
  type SnowOutlookView,
  type SnowPoint,
} from "@/lib/snow-outlook";

// The outlook is written twice a day and the page is revalidated whenever a call
// appears or drops; an hour is the longest a change should wait.
export const revalidate = 3600;

const SITE = "https://www.nakshiq.com";
const SNOW_REGIONS = ["jammu-kashmir", "ladakh", "himachal-pradesh", "uttarakhand", "sikkim", "arunachal-pradesh", "west-bengal"];
const REGION_NAME: Record<string, { en: string; hi: string }> = {
  ...Object.fromEntries(ROAD_REGIONS.map((r) => [r.id, { en: r.en, hi: r.hi }])),
  "west-bengal": { en: "West Bengal (Darjeeling hills)", hi: "पश्चिम बंगाल (दार्जिलिंग की पहाड़ियाँ)" },
};
// Winter footage on R2, one clip per place people look up (frames checked 2026-10-18).
// theme-snow stays first: the page poster is a frame of it.
const HERO_CLIPS = [
  { id: "theme-snow", en: "Himalayan winter lake", hi: "हिमालय की जमी झील" },
  { id: "gulmarg", en: "Gulmarg", hi: "गुलमर्ग" },
  { id: "auli", en: "Auli", hi: "औली" },
  { id: "kufri", en: "Kufri", hi: "कुफरी" },
  { id: "kedarnath", en: "Kedarnath", hi: "केदारनाथ" },
  { id: "khardung-la", en: "Khardung La", hi: "खारदुंग ला" },
  { id: "dhanaulti", en: "Dhanaulti", hi: "धनौल्टी" },
  { id: "patnitop", en: "Patnitop", hi: "पटनीटॉप" },
  { id: "tsomgo-lake", en: "Tsomgo Lake", hi: "सोमगो झील" },
  { id: "badrinath", en: "Badrinath", hi: "बद्रीनाथ" },
];
// Places people actually search "will it snow in ..." for. Kept only if they are on the watch list.
const FAQ_PLACES = ["manali", "gulmarg", "sonamarg", "spiti-valley", "kaza", "shimla", "kedarnath", "gangtok", "rohtang-pass", "lahaul-valley"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const hi = locale === "hi";
  return {
    title: hi
      ? "बर्फ़ का अनुमान: मनाली, गुलमर्ग, स्पीति, अगले 4 दिन"
      : "Snow forecast: Manali, Gulmarg, Spiti, next 4 days",
    description: hi
      ? "अगले चार दिन कहाँ बर्फ़ गिरेगी: छह मौसम मॉडल हर जगह की अपनी ऊँचाई पर, IMD बुलेटिन से मिलाकर। हर अनुमान के बाद जाँच कि बर्फ़ असल में गिरी या नहीं।"
      : "Where snow is forecast in the next four days: six weather models at each place's own altitude, checked against IMD bulletins. After every window we check whether snow actually fell.",
    ...localeAlternates(locale, "/snow"),
  };
}

/** One honest sentence per place, built from the same outlook the page shows. */
function answerFor(view: SnowOutlookView, p: SnowPoint, locale: string) {
  const hi = locale === "hi";
  const name = (hi && p.name_hi) || p.name;
  const q = hi ? `क्या ${name} में बर्फ़ गिरेगी?` : `Is it going to snow in ${name}?`;
  if (view.stale || !view.lastRun) {
    return { question: q, answer: hi ? "अभी हम यह नहीं बता सकते: हमारा बर्फ़ अनुमान हाल में अपडेट नहीं हुआ, और हम पुराना अनुमान आज का बताकर नहीं दिखाते।" : "We cannot say right now: our snow outlook has not updated recently, and we do not show an old forecast as current." };
  }
  const o = view.outlooks.find((x) => x.point_id === p.id);
  const checked = fmtSnowTime(view.lastRun.run_at, locale);
  if (o) {
    const w = snowWindowText(o, locale);
    return {
      question: q,
      answer: hi
        ? `${w}: बर्फ़ ${o.confidence === "likely" ? "संभावित" : "मुमकिन"}। ${o.models_total} में से ${o.models_agree} मौसम मॉडल ${name} (${p.elevation_m} मी) पर बर्फ़ दिखा रहे हैं। यह पूर्वानुमान है, ख़बर नहीं। आख़िरी जाँच ${checked} IST।`
        : `Snow is ${o.confidence} ${w}. ${o.models_agree} of ${o.models_total} weather models show snow at ${name} (${p.elevation_m} m). This is a forecast, not a report. Last checked ${checked} IST.`,
    };
  }
  return {
    question: q,
    answer: hi
      ? `अगले चार दिन नहीं: ${name} (${p.elevation_m} मी) पर आधे मॉडल भी बर्फ़ नहीं दिखा रहे। आख़िरी जाँच ${checked} IST। ऊँचे दर्रों पर हल्की बर्फ़ मॉडल नहीं पकड़ पाते।`
      : `Not in the next four days: not even half of our six models show snow at ${name} (${p.elevation_m} m). Last checked ${checked} IST. Light snow on high passes is something the models can miss.`,
  };
}

export default async function SnowPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hi = locale === "hi";
  const [view, record, watch, updates] = await Promise.all([getSnowOutlooks(), getSnowTrackRecord(), getSnowWatchList(), getRoadUpdates({ days: 30 })]);

  const byRegion = new Map<string, SnowPoint[]>();
  for (const p of watch) byRegion.set(p.region_id, [...(byRegion.get(p.region_id) ?? []), p]);
  const regions = SNOW_REGIONS.filter((r) => byRegion.has(r));

  // Dated, sourced snow reports from the road feed: what HAS fallen, shown beside what is forecast.
  const reports = updates.filter((u) => /snow/i.test(u.headline)).slice(0, 12);
  const regionLabel = (id: string) => (hi ? REGION_NAME[id]?.hi : REGION_NAME[id]?.en) ?? id;

  const faqPoints = FAQ_PLACES.map((id) => watch.find((p) => p.id === id)).filter((p): p is SnowPoint => !!p);
  const faq = [
    ...faqPoints.map((p) => answerFor(view, p, locale)),
    {
      question: hi ? "बर्फ़ का अनुमान कैसे बनता है?" : "How is the snow forecast made?",
      answer: hi
        ? "हर जगह की अपनी ऊँचाई पर छह वैश्विक मॉडल (ECMWF, NOAA GFS, DWD ICON, कनाडा GEM, UK Met Office, Météo-France) देखे जाते हैं। 1°C या उससे कम तापमान पर गिरा पानी बर्फ़ गिना जाता है। कम से कम आधे मॉडल सहमत हों तो \"मुमकिन\", दो-तिहाई सहमत हों तो \"संभावित\"। फिर IMD का बुलेटिन देखा जाता है, और वह तभी \"सहमत\" गिना जाता है जब उसमें उसी ज़िले और उसी तारीख़ का नाम हो।"
        : "Six global models (ECMWF, NOAA GFS, DWD ICON, Canada GEM, UK Met Office, Météo-France) are read at each place's own altitude. Precipitation at 1°C or below counts as snow. \"Possible\" means at least half the models agree, \"likely\" means at least two-thirds. We then check IMD's bulletin, and count it as agreeing only if it names the same district and a date inside the window.",
    },
    {
      question: hi ? "यह अनुमान कितना सही है?" : "How accurate is it?",
      answer: hi
        ? "10 सितंबर से 16 अक्टूबर 2026 के पुराने पूर्वानुमान दोबारा चलाने पर, दो दिन पहले इसने दर्ज हुई 9 बर्फ़बारियों में से 6 पकड़ीं। दर्रों पर यह तीन दिन पहले चेतावनी देता है। यह 0°C के आसपास वाले गाँवों (जैसे सिस्सू) और ऊँचाई पर हल्की बर्फ़ में चूका। आधे \"संभावित\" अनुमानों के लिए कोई ख़बर नहीं मिली, इसलिए इसे पक्का वादा नहीं, पूर्वानुमान समझें।"
        : "Replaying the models' archived forecasts for 10 Sep to 16 Oct 2026, it called 6 of the 9 reported snowfalls two days ahead. It warns about passes up to three days ahead. It missed villages sitting near 0°C (Sissu, for one) and light snow high up. About half of its \"likely\" calls had no report found, so treat it as a forecast, never a promise.",
    },
    {
      question: hi ? "क्या यह पेज रोज़ अपडेट होता है?" : "How often does this page update?",
      answer: hi
        ? "दिन में तीन बार। अगर अनुमान 36 घंटे से पुराना हो जाए तो पेज उसे दिखाना बंद कर देता है।"
        : "Three times a day. If the forecast is ever more than 36 hours old, the page stops showing it rather than present it as current.",
    },
  ];

  const faqLd = JSON.stringify(faqPageSchema({ locale, path: "/snow", qa: faq })).replace(/</g, "\\u003c");
  const breadcrumbLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: hi ? "बर्फ़ का अनुमान" : "Snow forecast", item: `${SITE}/${locale}/snow` },
    ],
  }).replace(/</g, "\\u003c");

  const h2 = { fontFamily: "var(--cinema-display)", fontStyle: "italic" as const, fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", color: "var(--bone)", margin: "0 0 8px" };
  const small = { fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-dim)", lineHeight: 1.6 };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <Nav />

      <main id="main-content" className="nq-grain" style={{ position: "relative" }}>
        {/* Landing view: snow footage behind the title. The clip is illustrative, and says so. */}
        <section
          style={{ position: "relative", minHeight: "min(84vh, 780px)", display: "flex", alignItems: "flex-end", padding: "140px 24px 56px", marginBottom: 40 }}
        >
          <SnowHeroVideo clips={HERO_CLIPS.map((c) => ({ src: videoSrc(c.id), label: hi ? c.hi : c.en }))} poster="/snow-hero-poster.jpg" />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--paper, #0a0a0a) 2%, rgba(8,12,20,0.78) 38%, rgba(8,12,20,0.5) 100%)" }} />
          <header style={{ position: "relative", maxWidth: 1100, width: "100%", margin: "0 auto" }}>
            <p className="nq-kicker" style={{ color: "#7dd3fc", marginBottom: 20, letterSpacing: "0.22em" }}>
              {hi ? "बर्फ़ रडार" : "SNOW WATCH"}
              {view.lastRun && !view.stale ? ` · ${hi ? "आख़िरी जाँच" : "LAST CHECKED"} ${fmtSnowTime(view.lastRun.run_at, locale).toUpperCase()} IST` : ""}
            </p>
            <Title
              as="h1"
              className="nq-display"
              style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px, 7vw, 92px)", lineHeight: 1.0, letterSpacing: "-0.022em", margin: 0, textWrap: "balance" }}
            >
              {hi ? "कहाँ बर्फ़ का अनुमान है, अगले चार दिन." : "Where snow is forecast, next four days."}
            </Title>
            <p style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.4, color: "rgba(245,240,230,0.82)", marginTop: 24, maxWidth: 760 }}>
              {hi
                ? `${view.lastRun?.points ?? 122} जगहें और दर्रे, हर एक की अपनी ऊँचाई पर छह मौसम मॉडल, IMD बुलेटिन से मिलाकर। पूर्वानुमान, ख़बर नहीं।`
                : `${view.lastRun?.points ?? 122} places and passes, six weather models at each one's own altitude, checked against IMD bulletins. A forecast, not a report.`}
            </p>
            <p style={{ position: "absolute", right: 0, bottom: -36, margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 11, color: "rgba(245,240,230,0.55)" }}>
              {hi ? "फ़ुटेज: AI से बना, केवल चित्रण के लिए" : "Footage: AI-generated, illustrative"}
            </p>
          </header>
        </section>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px 64px" }}>
          <SnowOutlookSection view={view} record={record} locale={locale} />

          {/* What has actually fallen: dated, sourced, from the road feed. */}
          <section aria-labelledby="fallen-h" style={{ margin: "0 0 48px" }}>
            <h2 id="fallen-h" style={h2}>{hi ? "पिछले 30 दिन: दर्ज हुई बर्फ़बारी" : "Last 30 days: snow that was reported"}</h2>
            <p style={{ ...small, margin: "0 0 14px", maxWidth: 780 }}>
              {hi ? "हर पंक्ति किसी दिनांकित ख़बर या सरकारी सूचना से आती है, स्रोत के साथ।" : "Each line comes from a dated news report or official notice, with its source."}
            </p>
            {reports.length === 0 ? (
              <p style={{ ...small, border: "1px solid var(--hair)", padding: 20, margin: 0 }}>
                {hi ? "पिछले 30 दिन में बर्फ़ की कोई दर्ज ख़बर नहीं।" : "No snow report logged in the last 30 days."}
              </p>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, border: "1px solid var(--hair)" }}>
                {reports.map((u) => (
                  <li key={u.id} style={{ padding: "12px 16px", borderBottom: "1px solid var(--hair)", background: "var(--paper)" }}>
                    <p style={{ margin: 0, fontFamily: "var(--cinema-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--bone-dim)" }}>
                      {fmtSnowDay(u.update_date, locale)} · {regionLabel(u.region_id)}
                    </p>
                    <p style={{ margin: "4px 0 0", fontFamily: "var(--cinema-ui)", fontSize: 14, color: "var(--bone)", lineHeight: 1.5 }}>
                      {u.headline}{" "}
                      <a href={u.source_url} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#38bdf8", textDecoration: "underline", textUnderlineOffset: 2 }}>
                        {u.source_label}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <p style={{ ...small, margin: "12px 0 0" }}>
              <Link href={`/${locale}/road-conditions`} style={{ color: "#38bdf8", textDecoration: "underline", textUnderlineOffset: 2 }}>
                {hi ? "सभी सड़क बंद और खुलने की प्रविष्टियाँ →" : "Every road closure and reopening, by date →"}
              </Link>
            </p>
          </section>

          {/* Questions: answers are generated from the live outlook above, so they never disagree with it. */}
          <section aria-labelledby="faq-h" style={{ margin: "0 0 48px" }}>
            <h2 id="faq-h" style={h2}>{hi ? "सवाल-जवाब" : "Questions"}</h2>
            <div style={{ border: "1px solid var(--hair)" }}>
              {faq.map((f) => (
                <details key={f.question} style={{ padding: "14px 16px", borderBottom: "1px solid var(--hair)", background: "var(--paper)" }}>
                  <summary style={{ cursor: "pointer", fontFamily: "var(--cinema-ui)", fontSize: 15, color: "var(--bone)" }}>{f.question}</summary>
                  <p style={{ ...small, margin: "10px 0 0", maxWidth: 780 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Everything we watch, so a reader can see their place is covered. */}
          <section aria-labelledby="watch-h" style={{ margin: "0 0 48px" }}>
            <h2 id="watch-h" style={h2}>{hi ? `हम किन ${watch.length} जगहों पर नज़र रखते हैं` : `The ${watch.length} places and passes we watch`}</h2>
            <p style={{ ...small, margin: "0 0 14px", maxWidth: 780 }}>
              {hi
                ? "1,500 मीटर से ऊपर की हर मंज़िल, साथ में प्रमुख दर्रे। ऊँचाई के हिसाब से, सबसे ऊँची पहले।"
                : "Every destination above 1,500 m in the snow states, plus the main passes. Highest first."}
            </p>
            <div style={{ border: "1px solid var(--hair)" }}>
              {regions.map((rid) => {
                const pts = byRegion.get(rid)!;
                return (
                  <details key={rid} style={{ padding: "14px 16px", borderBottom: "1px solid var(--hair)", background: "var(--paper)" }}>
                    <summary style={{ cursor: "pointer", fontFamily: "var(--cinema-ui)", fontSize: 15, color: "var(--bone)" }}>
                      {regionLabel(rid)} · {pts.length}
                    </summary>
                    <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 230px), 1fr))", gap: "6px 20px" }}>
                      {pts.map((p) => {
                        const nm = (hi && p.name_hi) || p.name;
                        return (
                          <li key={p.id} style={{ ...small, fontSize: 13 }}>
                            {p.kind === "destination" ? (
                              <Link href={`/${locale}/destination/${p.id}`} style={{ color: "var(--bone)", textDecoration: "none" }}>{nm}</Link>
                            ) : (
                              <span style={{ color: "var(--bone)" }}>{nm}</span>
                            )}
                            <span style={{ color: "var(--bone-faint)" }}> · {p.elevation_m.toLocaleString("en-IN")} m</span>
                          </li>
                        );
                      })}
                    </ul>
                    {["himachal-pradesh", "ladakh", "jammu-kashmir", "uttarakhand", "sikkim", "arunachal-pradesh"].includes(rid) && (
                      <p style={{ ...small, margin: "12px 0 0" }}>
                        <Link href={`/${locale}/road-conditions/${rid}`} style={{ color: "#38bdf8", textDecoration: "underline", textUnderlineOffset: 2 }}>
                          {hi ? `${regionLabel(rid)}: सड़कों की ताज़ा रिपोर्ट →` : `${regionLabel(rid)}: latest road reports →`}
                        </Link>
                      </p>
                    )}
                  </details>
                );
              })}
            </div>
          </section>

          <section style={{ margin: "40px 0 0" }}>
            <NewsletterSignup
              source="snow"
              headline={hi ? "बर्फ़ और सड़क बंद होने की खबर पहले चाहिए? रविवार की एक ईमेल।" : "Want snow and closure news before you drive? One email, Sundays."}
              subhead={hi ? "एक स्कोर, एक स्किप, एक सड़क अपडेट। मुफ़्त।" : "One score, one skip, one road update. Free."}
            />
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
