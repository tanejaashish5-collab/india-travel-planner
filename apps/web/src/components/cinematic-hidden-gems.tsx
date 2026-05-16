import type { HiddenGem } from "@itp/shared";

// Editorial Hidden Gems — Lead + Stack rhythm. Replaces the uniform 7-card
// grid in ACT VI Atlas with a magazine-cover lead (gem 0) + numbered
// editorial list (gems 1..N). Surfaces two unused data fields (★ from
// confidence_score, italic tease quote from social_proof) for editorial
// texture; both fall back gracefully when null.
export function CinematicHiddenGems({
  gems,
  destinationName,
}: {
  gems: HiddenGem[];
  destinationName: string;
}) {
  if (gems.length === 0) return null;

  const lead = gems[0];
  const rest = gems.slice(1);
  const fromLabel = destinationName.toUpperCase();
  const mapsHref = (gemName: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${gemName} near ${destinationName}`)}`;

  return (
    <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
      <p
        className="nq-kicker"
        style={{ color: "var(--vermillion)", marginBottom: 24 }}
      >
        HIDDEN GEMS · {gems.length} NEAR {fromLabel}
      </p>

      {/* ── LEAD ───────────────────────────────────────────────────── */}
      <article className="nq-gem-lead">
        <header className="nq-gem-lead__head">
          <span className="nq-gem-numeral">Nº 01</span>
          <span
            className="nq-mono"
            style={{
              fontSize: 11,
              color: "var(--bone-faint)",
              letterSpacing: "0.18em",
            }}
          >
            {lead.distance_km}KM
            {lead.drive_time && ` · ${lead.drive_time.toUpperCase()}`}
          </span>
        </header>

        <h3 className="nq-gem-lead__title nq-balance">
          <a
            className="nq-gem-lead__link"
            href={mapsHref(lead.name)}
            target="_blank"
            rel="noopener noreferrer"
            title={`Find ${lead.name} on Google Maps`}
          >
            {lead.name}.
            <span className="nq-gem-lead__arrow" aria-hidden="true">
              {" "}↗
            </span>
          </a>
        </h3>

        {lead.why_unknown && (
          <blockquote className="nq-gem-pullquote">
            <span className="nq-gem-pullquote__text">{lead.why_unknown}</span>
            <span className="nq-gem-pullquote__attr">WHY NOBODY KNOWS</span>
          </blockquote>
        )}

        {lead.why_go && (
          <p className="nq-gem-lead__body nq-prose">{lead.why_go}</p>
        )}

        <footer className="nq-gem-lead__foot">
          {lead.confidence_score > 0 && (
            <span
              className="nq-gem-stars"
              aria-label={`Confidence ${lead.confidence_score} of 5`}
              title={`Confidence ${lead.confidence_score}/5`}
            >
              {"★".repeat(lead.confidence_score)}
              <span className="nq-gem-stars__dim">
                {"★".repeat(Math.max(0, 5 - lead.confidence_score))}
              </span>
            </span>
          )}
          {lead.social_proof && (
            <span className="nq-gem-tease">{lead.social_proof}</span>
          )}
        </footer>
      </article>

      {rest.length > 0 && (
        <>
          <div className="nq-gem-divider" aria-hidden="true">
            <span>REMAINING {rest.length}</span>
          </div>

          {/* ── STACK ────────────────────────────────────────────────── */}
          <ol className="nq-gem-stack">
            {rest.map((gem, i) => {
              const n = i + 2;
              const numeral = `Nº ${String(n).padStart(2, "0")}`;
              return (
                <li key={gem.id ?? gem.name} className="nq-gem-row">
                  <div className="nq-gem-row__head">
                    <span className="nq-gem-numeral nq-gem-numeral--sm">
                      {numeral}
                    </span>
                    <h4 className="nq-gem-row__title">
                      <a
                        className="nq-gem-row__link"
                        href={mapsHref(gem.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Find ${gem.name} on Google Maps`}
                      >
                        {gem.name}
                        <span className="nq-gem-row__arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </h4>
                    <span className="nq-gem-row__lockup nq-mono">
                      {gem.distance_km}KM
                      {gem.drive_time && ` · ${gem.drive_time.toUpperCase()}`}
                    </span>
                  </div>

                  {gem.why_go && (
                    <p className="nq-gem-row__body">{gem.why_go}</p>
                  )}

                  <div className="nq-gem-row__meta">
                    {gem.confidence_score > 0 && (
                      <span
                        className="nq-gem-stars nq-gem-stars--sm"
                        aria-label={`Confidence ${gem.confidence_score} of 5`}
                        title={`Confidence ${gem.confidence_score}/5`}
                      >
                        {"★".repeat(gem.confidence_score)}
                        <span className="nq-gem-stars__dim">
                          {"★".repeat(Math.max(0, 5 - gem.confidence_score))}
                        </span>
                      </span>
                    )}
                    {gem.why_unknown && (
                      <span className="nq-gem-row__chip">
                        <span className="nq-gem-row__chip-dot">◦</span>
                        {gem.why_unknown}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
