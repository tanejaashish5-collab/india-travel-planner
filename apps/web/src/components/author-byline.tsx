import Link from "next/link";

export type AuthorRecord = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio?: string | null;
  short_bio?: string | null;
  photo_url?: string | null;
  email?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  muck_rack_url?: string | null;
  wikidata_qid?: string | null;
  same_as?: string[] | null;
  knows_about?: string[] | null;
  home_location?: string | null;
};

type Props = {
  author: AuthorRecord;
  locale: string;
  /** Compact = single-line byline (for article headers); full = boxed card */
  variant?: "compact" | "full";
  /** When known, show dateModified next to byline */
  reviewedAt?: string | null;
};

const ROLE_LABEL: Record<string, string> = {
  editor: "Editor",
  contributor: "Contributor",
  expert: "Expert",
  family: "Family",
};

export function personJsonLd(author: AuthorRecord) {
  const sameAsBuilt: string[] = [];
  if (author.linkedin_url) sameAsBuilt.push(author.linkedin_url);
  if (author.twitter_url) sameAsBuilt.push(author.twitter_url);
  if (author.muck_rack_url) sameAsBuilt.push(author.muck_rack_url);
  if (author.wikidata_qid) sameAsBuilt.push(`https://www.wikidata.org/wiki/${author.wikidata_qid}`);
  const sameAs = Array.from(new Set([...(author.same_as ?? []), ...sameAsBuilt]));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://www.nakshiq.com/about/team#${author.slug}`,
    name: author.name,
    url: `https://www.nakshiq.com/about/team#${author.slug}`,
    jobTitle: ROLE_LABEL[author.role] ?? author.role,
    description: author.bio ?? author.short_bio ?? undefined,
    ...(author.photo_url && { image: author.photo_url }),
    ...(author.email && { email: `mailto:${author.email}` }),
    ...(author.knows_about && author.knows_about.length > 0 && { knowsAbout: author.knows_about }),
    ...(author.home_location && {
      homeLocation: { "@type": "Place", name: author.home_location },
    }),
    ...(sameAs.length > 0 && { sameAs }),
    worksFor: { "@id": "https://www.nakshiq.com#organization" },
  };
}

function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return null;
  }
}

export function AuthorByline({ author, locale, variant = "compact", reviewedAt }: Props) {
  const reviewed = formatDate(reviewedAt);
  const teamHref = `/${locale}/about/team#${author.slug}`;

  if (variant === "compact") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(author)) }}
        />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {author.photo_url ? (
            <img
              src={author.photo_url}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover border border-border"
              loading="lazy"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-border flex items-center justify-center text-[10px] font-semibold text-primary">
              {author.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </div>
          )}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-foreground">
              By{" "}
              <Link href={teamHref} className="font-medium hover:text-primary transition-colors">
                {author.name}
              </Link>
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>{ROLE_LABEL[author.role] ?? author.role}, NakshIQ</span>
            {reviewed && (
              <>
                <span className="text-muted-foreground/60">·</span>
                <span className="tabular-nums">Reviewed {reviewed}</span>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(author)) }}
      />
      <div className="rounded-2xl border border-border bg-card/40 p-6 flex gap-5 items-start">
        {author.photo_url ? (
          <img
            src={author.photo_url}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover border border-border shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-border flex items-center justify-center text-xl font-semibold text-primary shrink-0">
            {author.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <Link href={teamHref} className="text-lg font-semibold hover:text-primary transition-colors">
              {author.name}
            </Link>
            <span className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground">
              {ROLE_LABEL[author.role] ?? author.role}
            </span>
          </div>
          {author.short_bio && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{author.short_bio}</p>
          )}
          {author.knows_about && author.knows_about.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {author.knows_about.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
          {(author.linkedin_url || author.twitter_url || author.muck_rack_url) && (
            <div className="mt-3 flex gap-3 text-xs">
              {author.linkedin_url && (
                <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer me" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn ↗
                </a>
              )}
              {author.twitter_url && (
                <a href={author.twitter_url} target="_blank" rel="noopener noreferrer me" className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter/X ↗
                </a>
              )}
              {author.muck_rack_url && (
                <a href={author.muck_rack_url} target="_blank" rel="noopener noreferrer me" className="text-muted-foreground hover:text-primary transition-colors">
                  Muck Rack ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
