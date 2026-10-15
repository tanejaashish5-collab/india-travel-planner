import Link from "next/link";
import {
  fmtSnowDay,
  fmtSnowTime,
  imdLine,
  snowAmountText,
  snowWindowText,
  type SnowOutlook,
  type SnowOutlookView,
  type SnowPoint,
  type SnowTrackRecord,
} from "@/lib/snow-outlook-format";

const ICE = "#7dd3fc";
const ICE_DIM = "#38bdf8";

const runTime = (iso: string, locale: string) => fmtSnowTime(iso, locale);

function OutlookCard({ o, locale }: { o: SnowOutlook & { point: SnowPoint | null }; locale: string }) {
  const hi = locale === "hi";
  const likely = o.confidence === "likely";
  const name = (hi && o.point?.name_hi) || o.point?.name || o.point_id;
  const amount = snowAmountText(o, locale);
  const imd = imdLine(o, locale);
  const isDest = o.point_kind === "destination";
  return (
    <li style={{ background: "var(--paper)", padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, letterSpacing: "0.08em", color: likely ? ICE : "var(--bone-dim)" }}>
        <span style={{ fontWeight: 600 }}>{likely ? (hi ? "संभावित" : "Likely") : (hi ? "मुमकिन" : "Possible")}</span>
        {" · "}
        <time dateTime={o.window_start}>{snowWindowText(o, locale)}</time>
      </p>
      <h3 style={{ margin: 0, fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: 22, color: "var(--bone)", lineHeight: 1.15 }}>
        {isDest ? (
          <Link href={`/${locale}/destination/${o.point_id}`} style={{ color: "inherit", textDecoration: "none" }}>{name} →</Link>
        ) : name}
      </h3>
      <p style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-dim)", lineHeight: 1.5 }}>
        {o.point?.elevation_m ? `${o.point.elevation_m.toLocaleString("en-IN")} m` : ""}
        {o.point?.road ? (hi ? ` · ${o.point.road} सड़क` : ` · on the ${o.point.road} road`) : ""}
      </p>
      <p style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 14, color: "var(--bone)", lineHeight: 1.55 }}>
        {hi
          ? `${o.models_total} में से ${o.models_agree} मौसम मॉडल यहाँ बर्फ़ दिखा रहे हैं${amount ? `, ${amount}` : ""}।`
          : `${o.models_agree} of ${o.models_total} weather models show snow here${amount ? `, ${amount}` : ""}.`}
      </p>
      {imd && (
        <p style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-dim)", lineHeight: 1.55 }}>
          {imd.text}
          {imd.quote && <> <q style={{ color: "var(--bone)" }}>{imd.quote}</q></>}
          {imd.url && (
            <>
              {" "}
              <a href={imd.url} target="_blank" rel="noopener noreferrer nofollow" style={{ color: ICE_DIM, textDecoration: "underline", textUnderlineOffset: 2 }}>
                {hi ? "बुलेटिन" : "Bulletin"}
              </a>
            </>
          )}
        </p>
      )}
    </li>
  );
}

export function SnowOutlookSection({
  view,
  record,
  locale,
  regionName,
}: {
  view: SnowOutlookView;
  record: SnowTrackRecord | null;
  locale: string;
  regionName?: string;
}) {
  const hi = locale === "hi";
  const { lastRun, stale, outlooks } = view;
  return (
    <section aria-labelledby="snow-h" style={{ margin: "0 0 48px" }}>
      <h2 id="snow-h" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", color: "var(--bone)", margin: "0 0 8px" }}>
        {hi
          ? regionName ? `${regionName}: अगले चार दिन बर्फ़ का अनुमान` : "अगले चार दिन: बर्फ़ का अनुमान"
          : regionName ? `Snow outlook for ${regionName}, next four days` : "Snow outlook, next four days"}
      </h2>
      <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-dim)", margin: "0 0 16px", lineHeight: 1.6, maxWidth: 780 }}>
        {hi
          ? "जहाँ छह वैश्विक मौसम मॉडलों में से कम से कम आधे उस जगह की अपनी ऊँचाई पर बर्फ़ दिखा रहे हैं, उसे IMD के बुलेटिन से मिलाकर यहाँ लिखते हैं। यह पूर्वानुमान है, ख़बर नहीं। हर अवधि बीतने के बाद हम जाँचते हैं कि असल में बर्फ़ गिरी या नहीं।"
          : "Where at least half of six global weather models forecast snow at the place's own altitude, checked against IMD's bulletin. This is a forecast, not a report. After each window passes we check whether snow actually fell, and the tally is below."}
      </p>

      {stale || !lastRun ? (
        <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, color: "var(--bone-dim)", border: "1px solid var(--hair)", padding: 20, margin: 0 }}>
          {lastRun
            ? hi ? `बर्फ़ का अनुमान ${runTime(lastRun.run_at, locale)} के बाद अपडेट नहीं हुआ, इसलिए हम पुराना अनुमान आज का बताकर नहीं दिखा रहे।` : `The snow outlook has not updated since ${runTime(lastRun.run_at, locale)} IST, so we are not showing an old forecast as current.`
            : hi ? "बर्फ़ का पहला अनुमान जल्द।" : "The first snow outlook is on its way."}
        </p>
      ) : outlooks.length === 0 ? (
        <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, color: "var(--bone-dim)", border: "1px solid var(--hair)", padding: 20, margin: 0 }}>
          {hi
            ? `${regionName ? `${regionName} में ` : ""}हमारी निगरानी वाली किसी भी जगह पर अगले चार दिन आधे मॉडल भी बर्फ़ नहीं दिखा रहे। आख़िरी जाँच: ${runTime(lastRun.run_at, locale)}।`
            : `None of the ${regionName ? `places we watch in ${regionName}` : `${lastRun.points} places and passes we watch`} has snow forecast by even half the models for the next four days. Last checked ${runTime(lastRun.run_at, locale)} IST.`}
        </p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 1, background: "var(--hair)", border: "1px solid var(--hair)" }}>
          {outlooks.map((o) => <OutlookCard key={o.id} o={o} locale={locale} />)}
        </ul>
      )}

      <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone-faint)", margin: "14px 0 0", lineHeight: 1.7, maxWidth: 780 }}>
        {record && record.events > 0 && (
          <>
            {hi
              ? `${fmtSnowDay(record.since!, locale)} से: ${record.events} बार "संभावित" कहा। ${record.confirmed} की पुष्टि किसी दिनांकित ख़बर या IMD माप से हुई, ${record.unconfirmed} की कोई ख़बर नहीं मिली (इसका मतलब यह नहीं कि बर्फ़ नहीं गिरी), ${record.pending} अभी खुले हैं। `
              : `Since ${fmtSnowDay(record.since!, locale)}: ${record.events} "likely" calls. ${record.confirmed} confirmed by a dated report or an IMD measurement, ${record.unconfirmed} with no report found (not proof it stayed dry), ${record.pending} still open. `}
          </>
        )}
        {hi
          ? "शुरू करने से पहले हमने 10 सितंबर से 16 अक्टूबर तक के मॉडलों के पुराने पूर्वानुमान दोबारा चलाए: दो दिन पहले उन्होंने दर्ज हुई 9 बर्फ़बारियों में से 6 पकड़ीं। पूर्वानुमान: Open-Meteo (ECMWF, NOAA, DWD, कनाडा, UK Met Office, Météo-France), CC BY 4.0। बुलेटिन: भारत मौसम विज्ञान विभाग।"
          : "Before launch we replayed the models' archived forecasts for 10 Sep to 16 Oct: two days ahead they called 6 of the 9 snowfalls that were reported. Forecasts: Open-Meteo (ECMWF, NOAA, DWD, Environment Canada, UK Met Office, Météo-France), CC BY 4.0. Bulletins: India Meteorological Department."}
      </p>
    </section>
  );
}
