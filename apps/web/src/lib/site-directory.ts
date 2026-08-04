/* ============================================================
   Site directory — single source of truth for the cinematic footer
   sitemap + the cinematic MORE overlay. Both render the same 4
   columns + a Tools column so the IA stays consistent across the
   top-of-page (MORE overlay) and bottom-of-page (footer) surfaces.

   Adding a new route? Add it to ONE group here and it appears in
   both surfaces. Labels are i18n keys under `footer.link.*` so
   bilingual parity is enforced automatically.
   ============================================================ */

export type DirectoryLink = {
  href: (locale: string) => string;
  /** i18n key under `footer.link.*` (and `footer.section.*` for headers). */
  labelKey: string;
};

export type DirectoryGroup = {
  /** i18n key under `footer.section.*` */
  titleKey: string;
  links: DirectoryLink[];
};

/* The 4 footer columns. Order matters — Plan first (active intent),
   Discover second (browsing), Read third (content), About last
   (brand + legal). */
export const FOOTER_GROUPS: DirectoryGroup[] = [
  {
    titleKey: "plan",
    links: [
      { href: (l) => `/${l}/plan`, labelKey: "plan" },
      { href: (l) => `/${l}/build-route`, labelKey: "buildRoute" },
      { href: (l) => `/${l}/trip`, labelKey: "myTrip" },
      { href: (l) => `/${l}/cost-index`, labelKey: "costIndex" },
      { href: (l) => `/${l}/permits`, labelKey: "permits" },
      { href: (l) => `/${l}/road-conditions`, labelKey: "roadConditions" },
      { href: (l) => `/${l}/where-to-go`, labelKey: "whereToGo" },
      { href: (l) => `/${l}/weekend-from`, labelKey: "weekendFrom" },
    ],
  },
  {
    titleKey: "discover",
    links: [
      { href: (l) => `/${l}/explore`, labelKey: "destinations" },
      { href: (l) => `/${l}/collections`, labelKey: "collections" },
      { href: (l) => `/${l}/routes`, labelKey: "routes" },
      { href: (l) => `/${l}/treks`, labelKey: "treks" },
      { href: (l) => `/${l}/festivals`, labelKey: "festivals" },
      { href: (l) => `/${l}/luxury`, labelKey: "luxury" },
      { href: (l) => `/${l}/camping`, labelKey: "camping" },
      { href: (l) => `/${l}/stays`, labelKey: "stays" },
      { href: (l) => `/${l}/states`, labelKey: "states" },
      { href: (l) => `/${l}/superlatives`, labelKey: "superlatives" },
    ],
  },
  {
    titleKey: "read",
    links: [
      { href: (l) => `/${l}/blog`, labelKey: "blog" },
      { href: (l) => `/${l}/guide`, labelKey: "guides" },
      { href: (l) => `/${l}/the-window`, labelKey: "theWindow" },
      { href: (l) => `/${l}/tourist-traps`, labelKey: "skipList" },
      { href: (l) => `/${l}/nakshiq-100`, labelKey: "nakshiq100" },
      { href: (l) => `/${l}/india-travel`, labelKey: "firstTrip" },
      { href: (l) => `/${l}/press`, labelKey: "press" },
    ],
  },
  {
    titleKey: "about",
    links: [
      { href: (l) => `/${l}/about`, labelKey: "about" },
      { href: (l) => `/${l}/methodology`, labelKey: "methodology" },
      { href: (l) => `/${l}/contact`, labelKey: "contact" },
      { href: (l) => `/${l}/newsletter`, labelKey: "newsletter" },
      { href: (l) => `/${l}/editorial-policy`, labelKey: "editorialPolicy" },
      { href: (l) => `/${l}/corrections`, labelKey: "corrections" },
      { href: (l) => `/${l}/sos`, labelKey: "sos" },
    ],
  },
];

/* The MORE overlay renders FOOTER_GROUPS plus a 5th "Tools" column
   for active-discovery surfaces that aren't content/category routes
   (compare, ask, quizzes, comparisons). These are powerful enough
   to belong in the top-of-page surface but would clutter the bottom
   sitemap. */
export const OVERLAY_TOOLS_GROUP: DirectoryGroup = {
  titleKey: "tools",
  links: [
    { href: (l) => `/${l}/compare`, labelKey: "compare" },
    { href: (l) => `/${l}/risk-quiz`, labelKey: "riskQuiz" },
    { href: (l) => `/${l}/explore-by-persona`, labelKey: "byPersona" },
    { href: (l) => `/${l}/arrival`, labelKey: "arrival" },
    { href: (l) => `/${l}/india-vs`, labelKey: "indiaVs" },
    { href: (l) => `/${l}/vs`, labelKey: "vs" },
    { href: (l) => `/${l}/saved`, labelKey: "saved" },
  ],
};

/* Bottom-strip legal + privacy links (rendered separately from the
   columns, mono font, faded). */
export const FOOTER_LEGAL_LINKS: DirectoryLink[] = [
  { href: (l) => `/${l}/privacy`, labelKey: "privacy" },
  { href: (l) => `/${l}/terms`, labelKey: "terms" },
  { href: (l) => `/${l}/cookies`, labelKey: "cookies" },
];
